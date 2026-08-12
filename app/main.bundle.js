var ec=Object.create;var fs=Object.defineProperty;var tc=Object.getOwnPropertyDescriptor;var rc=Object.getOwnPropertyNames;var nc=Object.getPrototypeOf,sc=Object.prototype.hasOwnProperty;var oc=(e,t,r)=>t in e?fs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var _s=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ac=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of rc(t))!sc.call(e,s)&&s!==r&&fs(e,s,{get:()=>t[s],enumerable:!(n=tc(t,s))||n.enumerable});return e};var ic=(e,t,r)=>(r=e!=null?ec(nc(e)):{},ac(t||!e||!e.__esModule?fs(r,"default",{value:e,enumerable:!0}):r,e));var Xe=(e,t,r)=>oc(e,typeof t!="symbol"?t+"":t,r);var sa=_s((xf,na)=>{var Lr=1e3,Or=Lr*60,Dr=Or*60,xr=Dr*24,pc=xr*7,fc=xr*365.25;na.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return _c(e);if(r==="number"&&isFinite(e))return t.long?gc(e):mc(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function _c(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*fc;case"weeks":case"week":case"w":return r*pc;case"days":case"day":case"d":return r*xr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Dr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Or;case"seconds":case"second":case"secs":case"sec":case"s":return r*Lr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function mc(e){var t=Math.abs(e);return t>=xr?Math.round(e/xr)+"d":t>=Dr?Math.round(e/Dr)+"h":t>=Or?Math.round(e/Or)+"m":t>=Lr?Math.round(e/Lr)+"s":e+"ms"}function gc(e){var t=Math.abs(e);return t>=xr?Tn(e,t,xr,"day"):t>=Dr?Tn(e,t,Dr,"hour"):t>=Or?Tn(e,t,Or,"minute"):t>=Lr?Tn(e,t,Lr,"second"):e+" ms"}function Tn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var aa=_s((Sf,oa)=>{function hc(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=i,r.humanize=sa(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let h=0;h<f.length;h++)_=(_<<5)-_+f.charCodeAt(h),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,h=null,E,T;function R(...U){if(!R.enabled)return;let $=R,Y=Number(new Date),Q=Y-(_||Y);$.diff=Q,$.prev=_,$.curr=Y,_=Y,U[0]=r.coerce(U[0]),typeof U[0]!="string"&&U.unshift("%O");let j=0;U[0]=U[0].replace(/%([a-zA-Z%])/g,(x,N)=>{if(x==="%%")return"%";j++;let I=r.formatters[N];if(typeof I=="function"){let ie=U[j];x=I.call($,ie),U.splice(j,1),j--}return x}),r.formatArgs.call($,U),($.log||r.log).apply($,U)}return R.namespace=f,R.useColors=r.useColors(),R.color=r.selectColor(f),R.extend=n,R.destroy=r.destroy,Object.defineProperty(R,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(E!==r.namespaces&&(E=r.namespaces,T=r.enabled(f)),T),set:U=>{h=U}}),typeof r.init=="function"&&r.init(R),R}function n(f,_){let h=r(this.namespace+(typeof _>"u"?":":_)+f);return h.log=this.log,h}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of _)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(f,_){let h=0,E=0,T=-1,R=0;for(;h<f.length;)if(E<_.length&&(_[E]===f[h]||_[E]==="*"))_[E]==="*"?(T=E,R=h,E++):(h++,E++);else if(T!==-1)E=T+1,R++,h=R;else return!1;for(;E<_.length&&_[E]==="*";)E++;return E===_.length}function a(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function i(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function l(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}oa.exports=hc});var ia=_s((At,En)=>{At.formatArgs=yc;At.save=vc;At.load=wc;At.useColors=bc;At.storage=kc();At.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();At.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function bc(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function yc(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+En.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}At.log=console.debug||console.log||(()=>{});function vc(e){try{e?At.storage.setItem("debug",e):At.storage.removeItem("debug")}catch{}}function wc(){let e;try{e=At.storage.getItem("debug")||At.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function kc(){try{return localStorage}catch{}}En.exports=aa()(At);var{formatters:$c}=En.exports;$c.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Yr=globalThis,An=Yr.trustedTypes,zo=An?An.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ko="$lit$",ir=`lit$${Math.random().toFixed(9).slice(2)}$`,Zo="?"+ir,lc=`<${Zo}>`,wr=document,Vr=()=>wr.createComment(""),Kr=e=>e===null||typeof e!="object"&&typeof e!="function",ws=Array.isArray,cc=e=>ws(e)||typeof e?.[Symbol.iterator]=="function",ms=`[ 	
\f\r]`,Gr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ho=/-->/g,Wo=/>/g,yr=RegExp(`>|${ms}(?:([^\\s"'>=/]+)(${ms}*=${ms}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Go=/'/g,Yo=/"/g,Xo=/^(?:script|style|textarea|title)$/i,ks=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=ks(1),Zt=ks(2),hf=ks(3),kr=Symbol.for("lit-noChange"),ct=Symbol.for("lit-nothing"),Vo=new WeakMap,vr=wr.createTreeWalker(wr,129);function Qo(e,t){if(!ws(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return zo!==void 0?zo.createHTML(t):t}var dc=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Gr;for(let i=0;i<r;i++){let l=e[i],u,f,_=-1,h=0;for(;h<l.length&&(a.lastIndex=h,f=a.exec(l),f!==null);)h=a.lastIndex,a===Gr?f[1]==="!--"?a=Ho:f[1]!==void 0?a=Wo:f[2]!==void 0?(Xo.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=yr):f[3]!==void 0&&(a=yr):a===yr?f[0]===">"?(a=s??Gr,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?yr:f[3]==='"'?Yo:Go):a===Yo||a===Go?a=yr:a===Ho||a===Wo?a=Gr:(a=yr,s=void 0);let E=a===yr&&e[i+1].startsWith("/>")?" ":"";o+=a===Gr?l+lc:_>=0?(n.push(u),l.slice(0,_)+Ko+l.slice(_)+ir+E):l+ir+(_===-2?i:E)}return[Qo(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Zr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,f]=dc(t,r);if(this.el=e.createElement(u,n),vr.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=vr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(Ko)){let h=f[a++],E=s.getAttribute(_).split(ir),T=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:T[2],strings:E,ctor:T[1]==="."?hs:T[1]==="?"?bs:T[1]==="@"?ys:Ir}),s.removeAttribute(_)}else _.startsWith(ir)&&(l.push({type:6,index:o}),s.removeAttribute(_));if(Xo.test(s.tagName)){let _=s.textContent.split(ir),h=_.length-1;if(h>0){s.textContent=An?An.emptyScript:"";for(let E=0;E<h;E++)s.append(_[E],Vr()),vr.nextNode(),l.push({type:2,index:++o});s.append(_[h],Vr())}}}else if(s.nodeType===8)if(s.data===Zo)l.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(ir,_+1))!==-1;)l.push({type:7,index:o}),_+=ir.length-1}o++}}static createElement(t,r){let n=wr.createElement("template");return n.innerHTML=t,n}};function Rr(e,t,r=e,n){if(t===kr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Kr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Rr(e,s._$AS(e,t.values),s,n)),t}var gs=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??wr).importNode(r,!0);vr.currentNode=s;let o=vr.nextNode(),a=0,i=0,l=n[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new Xr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new vs(o,this,t)),this._$AV.push(u),l=n[++i]}a!==l?.index&&(o=vr.nextNode(),a++)}return vr.currentNode=wr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Xr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=ct,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Rr(this,t,r),Kr(t)?t===ct||t==null||t===""?(this._$AH!==ct&&this._$AR(),this._$AH=ct):t!==this._$AH&&t!==kr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):cc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ct&&Kr(this._$AH)?this._$AA.nextSibling.data=t:this.T(wr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Zr.createElement(Qo(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new gs(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Vo.get(t.strings);return r===void 0&&Vo.set(t.strings,r=new Zr(t)),r}k(t){ws(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Vr()),this.O(Vr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ir=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=ct,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ct}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Rr(this,t,r,0),a=!Kr(t)||t!==this._$AH&&t!==kr,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=Rr(this,i[n+l],r,l),u===kr&&(u=this._$AH[l]),a||(a=!Kr(u)||u!==this._$AH[l]),u===ct?t=ct:t!==ct&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===ct?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},hs=class extends Ir{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ct?void 0:t}},bs=class extends Ir{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ct)}},ys=class extends Ir{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Rr(this,t,r,0)??ct)===kr)return;let n=this._$AH,s=t===ct&&n!==ct||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==ct&&(n===ct||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},vs=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Rr(this,t)}};var uc=Yr.litHtmlPolyfillSupport;uc?.(Zr,Xr),(Yr.litHtmlVersions??(Yr.litHtmlVersions=[])).push("3.3.1");var Fe=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Xr(t.insertBefore(Vr(),o),o,void 0,r??{})}return s._$AI(e),s};var Et="today",Ht=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ot(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function $r(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Jo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ea(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ta(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ra(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var la=ic(ia(),1);function ot(e){return(0,la.default)(`beads-ui:${e}`)}function Ft(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Sr(e,t){let r=Ft(e.created_at),n=Ft(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ua(e,t){let r=Ft(e.created_at),n=Ft(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function pa(e,t){let r=Ft(e.updated_at),n=Ft(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function fa(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Ft(e.created_at),o=Ft(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function _a(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var xc=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ca(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function da(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=xc.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ma(e,t){let r=ca(e),n=ca(t);if(r!==n)return r<n?-1:1;let s=da(e),o=da(t);if(s!==o)return s<o?-1:1;let a=Ft(e&&e.created_at),i=Ft(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var $s=2**20;function Mr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Ft(e&&e.created_at)}function Cn(e){return(t,r)=>{let n=Mr(t,e),s=Mr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function xs(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Mr(i,r)-$s};if(!i)return{rank:Mr(a,r)+$s};let l=Mr(a,r),u=Mr(i,r),f=(l+u)/2;return l<f&&f<u?{rank:f}:{renormalize:n.map((_,h)=>({bead_id:_.id,rank:h*$s}))}}function Ss(e,t={}){let r=ot(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||Sr;function u(){for(let h of Array.from(a))try{h()}catch{}}function f(){s=Array.from(n.values()).sort(l)}function _(h){if(i||!h||h.id!==e)return;let E=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,E),!(E<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(E<=o)return;n.clear();let T=Array.isArray(h.issues)?h.issues:[];for(let R of T)R&&typeof R.id=="string"&&R.id.length>0&&n.set(R.id,R);f(),o=E,u();return}if(h.type==="upsert"){let T=h.issue;if(T&&typeof T.id=="string"&&T.id.length>0){let R=n.get(T.id);if(!R)n.set(T.id,T);else{let U=Number.isFinite(R.updated_at)?R.updated_at:0,$=Number.isFinite(T.updated_at)?T.updated_at:0;if(U<=$){for(let Y of Object.keys(R))Y in T||delete R[Y];for(let[Y,Q]of Object.entries(T))R[Y]=Q}}f()}o=E,u()}else if(h.type==="delete"){let T=String(h.issue_id||"");T&&(n.delete(T),f()),o=E,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function Rn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function ga(e){let t=ot("subs"),r=new Map,n=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let f=Array.isArray(l.added)?l.added:[],_=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let E of Array.from(u)){let T=r.get(E);if(!T)continue;let R=T.itemsById;for(let U of f)typeof U=="string"&&U.length>0&&R.set(U,!0);for(let U of _)typeof U=="string"&&U.length>0&&R.set(U,!0);for(let U of h)typeof U=="string"&&U.length>0&&R.delete(U)}}async function o(i,l){let u=Rn(l);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let _=r.get(i);if(_&&_.key!==u){let h=n.get(_.key);h&&(h.delete(i),h.size===0&&n.delete(_.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(_){let h=r.get(i)||null;if(h){let E=n.get(h.key);E&&(E.delete(i),E.size===0&&n.delete(h.key))}throw r.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let _=r.get(i)||null;if(_){let h=n.get(_.key);h&&(h.delete(i),h.size===0&&n.delete(_.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Rn,selectors:{getIds(i){let l=r.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=r.get(i);return u?u.itemsById.has(l):!1},count(i){let l=r.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=r.get(i),u={};if(!l)return u;for(let f of l.itemsById.keys())u[f]=!0;return u}}}}function ha(){let e=ot("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,u,f){let _=u?Rn(u):"",h=r.get(l)||"",E=t.has(l);if(e("register %s key=%s (prev=%s)",l,_,h),E&&h&&_&&h!==_){let T=t.get(l);if(T)try{T.dispose()}catch{}let R=s.get(l);if(R){try{R()}catch{}s.delete(l)}let U=Ss(l,f);t.set(l,U);let $=U.subscribe(()=>o());s.set(l,$)}else if(!E){let T=Ss(l,f);t.set(l,T);let R=T.subscribe(()=>o());s.set(l,R)}return r.set(l,_),()=>i(l)}function i(l){e("unregister %s",l),r.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let f=s.get(l);if(f){try{f()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function ba(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ya(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function As(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Sc(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Ac(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function va(e){let t=ot("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Sc(n),a=Ac(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=As(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?As(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Tc=Object.freeze({workspace_config:{default_workspace:null}});function wa(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Tc.workspace_config.default_workspace}}}function ka(e={}){let t=ot("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:wa(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?wa(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!i&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function $a(e){let t=ot("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function l(u){return async(_,h)=>{let E=s++,T=Date.now();n.set(E,{type:_,start_ts:T}),t("request start id=%d type=%s count=%d",E,_,r+1),a();let R=!1,U=()=>{R||(R=!0,n.delete(E),i())},$=setTimeout(()=>{R||(t("request TIMEOUT id=%d type=%s elapsed=%dms",E,_,Date.now()-T),U())},3e4);try{let Y=await u(_,h),Q=Date.now()-T;return t("request done id=%d type=%s elapsed=%dms",E,_,Q),Y}catch(Y){let Q=Date.now()-T;throw t("request error id=%d type=%s elapsed=%dms err=%o",E,_,Q,Y),Y}finally{clearTimeout($),U()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:u-_.start_ts}))}}}function Z(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function In(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(_a),l;switch(i){case"created_desc":return l.sort(Sr),l;case"created_asc":return l.sort(ua),l;case"updated_desc":return l.sort(pa),l;case"priority":return l.sort(fa),l;case"manual":default:{let u=r();return u?l.sort(Cn(u)):l.sort(Sr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Xt(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Tt(e){let t=Xt(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Ct(e,t){let r=Xt(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Ln(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Xt(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function On(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(xs(i,l,u.order),a);s(u,f);let _=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(_&&_.conflict){let h={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(h);let E=n(xs(i,l,h.order),a);s(h,E);let T=await t("ui-order-set",{expected_revision:h.revision,entries:E});T&&T.applied&&r.set({revision:typeof T.revision=="number"?T.revision:0,order:T.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function Dn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ts(e,t){return!t||typeof e!="string"||e.length===0||Dn(t.visible_labels).includes(e)?!0:Dn(t.hidden_labels).includes(e)?!1:!Dn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Mn(e,t){return Dn(e).filter(r=>Ts(r,t))}function lr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Ec={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Sa={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},xa={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Cc={review:"\u2713",skip:"\u2298"},cr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Rc(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Aa(e){let t=e&&e.fill||"none";return t==="none"?cr.none:e&&e.stale===!0?cr.stale:t==="dim"?cr.dim:e&&e.glyph==="review"?cr.review:e&&e.glyph==="skip"?cr.skip:cr.done}function Ic(e){if(!e||e.fill==="none"||!e.approval_state)return Aa(e);let t=[];return e.glyph==="review"?t.push(cr.review):e.glyph==="skip"&&t.push(cr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Lc(e,t,r){let n=Ec[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Cc[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${l}>
        ${Sa[e]||e}
      </div>
    </div>
  `}function Pn(e,t){if(!e||!e.stages)return"";let r=xa[e.route]||xa.spec_backed,n=e.stages,s=Rc(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Sa[a]||a} ${a==="plan"?Ic(n[a]||{}):Aa(n[a]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Lc(a,n[a]||{},a===s))}
    </div>
  `}function Oc(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ta=2;function Dc(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Ta).join(", "),s=r.length-Ta,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Mc(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&lr(r,"route")){let a=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&lr(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&lr(r,"pr")){let a=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}for(let a of Mn(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&lr(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),lr(r,"blocked")&&s.push(...Dc(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&lr(r,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 실패</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function Pc(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Nc(e){let t=Ct(e.created_at),r=Ct(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Tt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Tt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Fc(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(ma):r.children;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?c`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:c`<span class="board-card__roll-none">children 없음</span>`}
        ${Nc(e)}
      </div>
      ${n>0&&r.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?c`<div class="board-card__roll-list">
            ${o.map((a,i)=>c`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${l=>t.onChildClick&&t.onChildClick(l,a.id)}
                >
                  <span class=${Pc(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Nn(e,t){let r=Oc(e.priority);return c`
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
        ${r?c`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Mc(e,t)}
      ${e.workflow&&lr(t.policy||null,"stepper")?Pn(e.workflow,e.status):""}
      ${Fc(e,t)}
    </article>
  `}function Pr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
        ${n?c`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${Ht.map(o=>c`<option
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
        ${e.items.map(o=>Nn(o,t))}
      </div>
    </section>
  `}function Ea(e,t,r){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Nn(n,t))}
        </div>
      </div>
    </dialog>
  `}var qc=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Bc=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Uc=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function jc(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
      ${r.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?c`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Ca(e,t,r){return c`
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
        ${qc.map(n=>c`<option
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
        ${Bc.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${jc(e,t,r)}
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
        ${Uc.map(n=>c`<option
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
  `}var zc=200,Hc={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Wc=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ra="beads-ui.board.sort",Ia=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Gc(){try{let e=window.localStorage.getItem(Ra);if(e&&Ia.has(e))return e}catch{}return"created_desc"}function La(e,t){let r=ot("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,_=t.closedRange||Et,h=s?In(s,a):null,E=On({transport:o,uiOrderStore:a}),T=[],R=[],U=[],$=[],Y=[],Q=[],j=!1,O=0,x=Gc(),N=new Map,I=new Map,ie=new Map,ye=new Set,oe={search:"",priority:"",type:"",labels:[]},me=!1,Oe=null;function Je(F){return String(F.status||"open")==="open"}function et(F){let V=String(F.status||"open");return V==="open"||V==="blocked"}function Ie(F){let V=oe.search.trim().toLowerCase(),ae=oe.priority,fe=oe.type,we=oe.labels;return F.filter(Ee=>{if(V){let je=String(Ee.id||"").toLowerCase(),rt=String(Ee.title||"").toLowerCase();if(!je.includes(V)&&!rt.includes(V))return!1}if(ae!==""&&String(Ee.priority)!==ae||fe!==""&&String(Ee.issue_type||"")!==fe)return!1;if(we.length>0){let je=Array.isArray(Ee.labels)?Ee.labels:[];if(!we.some(rt=>je.includes(rt)))return!1}return!0})}function Ve(){let F=new Set;for(let V of[T,R,U,$,Y,Q])for(let ae of V){let fe=Array.isArray(ae.labels)?ae.labels:[];for(let we of fe)typeof we=="string"&&we.length>0&&F.add(we)}return Array.from(F).sort()}function Se(){return oe.search.trim()!==""||oe.priority!==""||oe.type!==""||oe.labels.length>0}function de(){try{if(h){let F=h.selectBoardColumn("tab:board:in-progress","in_progress",x),V=h.selectBoardColumn("tab:board:blocked","blocked",x).filter(et),ae=new Set(F.map(ke=>ke.id)),fe=h.selectBoardColumn("tab:board:ready","ready",x).filter(ke=>Je(ke)&&!ae.has(ke.id)),we=h.selectBoardColumn("tab:board:resolved","resolved",x),Ee=h.selectBoardColumn("tab:board:deferred","deferred",x),je=h.selectBoardColumn("tab:board:closed","closed").slice(0,zc),rt=[...V,...fe,...F,...we,...je];ve(rt);let xe=new Set;for(let ke of rt)ke&&ke.id&&!Es(ke)&&xe.add(ke.id);let ze=!Se();T=ze?Qr(V,xe):V,R=ze?Qr(fe,xe):fe,U=ze?Qr(F,xe):F,$=ze?Qr(we,xe):we,Y=Ee,O=Ee.length,Q=ze?Qr(je,xe):je,N=new Map;for(let ke of T)N.set(ke.id,"open");for(let ke of R)N.set(ke.id,"open");for(let ke of U)N.set(ke.id,"in_progress");for(let ke of $)N.set(ke.id,"resolved");for(let ke of Y)N.set(ke.id,"deferred");for(let ke of Q)N.set(ke.id,"closed");I=new Map;for(let ke of T)I.set(ke.id,"blocked-col");for(let ke of R)I.set(ke.id,"ready-col");for(let ke of U)I.set(ke.id,"in-progress-col");for(let ke of $)I.set(ke.id,"resolved-col");for(let ke of Q)I.set(ke.id,"closed-col")}Ye()}catch{T=[],R=[],U=[],$=[],Y=[],Q=[],ie=new Map,Ye()}}function ve(F){let V=new Map;for(let fe of F)fe&&fe.id&&!V.has(fe.id)&&V.set(fe.id,fe);let ae=new Map;for(let fe of V.values()){let we=Es(fe);if(!we)continue;let Ee=ae.get(we);Ee||(Ee=[],ae.set(we,Ee)),Ee.push({id:fe.id,title:fe.title,status:fe.status,metadata:fe.metadata,created_at:fe.created_at,updated_at:fe.updated_at})}ie=ae}function _e(F){let V=ie.get(F)||[],ae=0;for(let we of V)(we.status==="resolved"||we.status==="closed")&&(ae+=1);let fe=Ln(V);return{total:V.length,count:ae,current:fe,children:V}}function H(F){return!ye.has(F)}function G(F,V){F.preventDefault(),F.stopPropagation(),ye.has(V)?ye.delete(V):ye.add(V),Ye()}function ge(F,V){F.preventDefault(),F.stopPropagation(),n(V)}function K(F,V){F.preventDefault(),F.stopPropagation(),n(V)}function Ae(F,V){Oe||n(V)}function B(F,V){F.preventDefault(),F.stopPropagation(),Yc(V).then(ae=>{ae&&Z("\uBCF5\uC0AC\uB428","success",1200)})}function D(F,V){Oe=V,F.dataTransfer&&(F.dataTransfer.setData("text/plain",V),F.dataTransfer.effectAllowed="move"),F.target.classList.add("board-card--dragging")}function te(F){F.target.classList.remove("board-card--dragging"),It(),setTimeout(()=>{Oe=null},0)}function De(F){let V=String(F.target.value||"");!V||V===_||(_=V,u&&u(V),Ye())}function Ce(){return i?i.get():null}function Ne(F){let V=l?l.get():null,ae=V?V.cleanup_failed:null;if(!ae||typeof ae!="object"||Array.isArray(ae))return null;let fe=ae[F];return!fe||typeof fe!="object"||Array.isArray(fe)?null:fe}let Te={onCardClick:Ae,onCopyId:B,onDragStart:D,onDragEnd:te,onClosedRangeChange:De,rollupFor:_e,isExpanded:H,onRollupToggle:G,onChildClick:ge,onFromChipClick:K,cleanupFailureFor:Ne,get policy(){return Ce()}};function We(F,V){Oe||(le(),n(V))}function Pe(F,V){F.preventDefault(),F.stopPropagation(),le(),n(V)}let C={...Te,onCardClick:We,onChildClick:Pe,onFromChipClick:Pe,get policy(){return Ce()}};function S(F){let V=F.target,ae=e.querySelector(".board-filter__labels");V&&ae&&ae.contains(V)||P()}function k(F){F.key==="Escape"&&P()}function A(){me||(me=!0,document.addEventListener("mousedown",S),document.addEventListener("keydown",k),Ye())}function P(){me&&(me=!1,document.removeEventListener("mousedown",S),document.removeEventListener("keydown",k),Ye())}function re(F){F.key==="Escape"&&le()}function X(){j||(j=!0,document.addEventListener("keydown",re),Ye())}function le(){j&&(j=!1,document.removeEventListener("keydown",re),Ye())}let Le={onClose:le,onOverlayClick(F){F.target===F.currentTarget&&le()}},tt={onSearchInput(F){oe.search=String(F.target.value||""),de()},onPriorityChange(F){oe.priority=String(F.target.value||""),de()},onTypeChange(F){oe.type=String(F.target.value||""),de()},onSortChange(F){let V=String(F.target.value||"");if(!(!Ia.has(V)||V===x)){x=V;try{window.localStorage.setItem(Ra,V)}catch{}de()}},onDeferredToggle(){j?le():X()},onLabelMenuToggle(){me?P():A()},onLabelToggle(F){let V=oe.labels.indexOf(F);V===-1?oe.labels.push(F):oe.labels.splice(V,1),de()},onLabelClear(){oe.labels.length!==0&&(oe.labels=[],de())},onNewIssue(){f&&f()}};function at(){return c`
      <div class="board-view">
        ${Ca(oe,tt,{sort_mode:x,deferred_popup_open:j,deferred_count:O,label_options:Ve(),label_menu_open:me})}
        <div class="board-root">
          ${Pr({title:"Blocked",id:"blocked-col",items:Ie(T)},Te)}
          ${Pr({title:"Ready",id:"ready-col",items:Ie(R)},Te)}
          ${Pr({title:"In progress",id:"in-progress-col",items:Ie(U)},Te)}
          ${Pr({title:"Resolved",id:"resolved-col",items:Ie($)},Te)}
          ${Pr({title:"Closed",id:"closed-col",items:Ie(Q),is_closed:!0,closed_range:_},Te)}
        </div>
        ${j?Ea({items:Ie(Y),count:O},C,Le):""}
      </div>
    `}function Ye(){Fe(at(),e),bt()}function bt(){try{let F=e.querySelector("#deferred-popup");F&&!F.open&&(typeof F.showModal=="function"?F.showModal():F.setAttribute("open",""));let V=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ae of V)Array.from(ae.querySelectorAll(".board-card")).forEach((we,Ee)=>{we.tabIndex=Ee===0?0:-1})}catch{}}async function dt(F,V){if(!o){Z("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:F,status:V}),Z("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ae){r("update-status failed: %o",ae),Z("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function it(F){switch(F){case"blocked-col":return T;case"ready-col":return R;case"in-progress-col":return U;case"resolved-col":return $;default:return[]}}function yt(F,V,ae){if(!o||!a)return;let fe=it(F),we=fe.find(ze=>ze.id===V);if(!we)return;let Ee=fe.filter(ze=>ze.id!==V),je=ae.closest?ae.closest(".board-card"):null,rt=Ee.length;if(je){let ze=je.getAttribute("data-issue-id");if(ze===V)return;let ke=Ee.findIndex(pt=>pt.id===ze);ke>=0&&(rt=ke)}let xe=Ee.slice();xe.splice(rt,0,we),E.applyReorder(V,xe,rt)}function It(){for(let F of Array.from(e.querySelectorAll(".board-column--drag-over")))F.classList.remove("board-column--drag-over")}let st=null;e.addEventListener("dragover",F=>{F.preventDefault(),F.dataTransfer&&(F.dataTransfer.dropEffect="move");let ae=F.target.closest(".board-column");ae&&ae!==st&&(st&&st.classList.remove("board-column--drag-over"),ae.classList.add("board-column--drag-over"),st=ae)}),e.addEventListener("dragleave",F=>{let V=F.relatedTarget;(!V||!e.contains(V))&&st&&(st.classList.remove("board-column--drag-over"),st=null)}),e.addEventListener("drop",F=>{F.preventDefault(),st&&(st.classList.remove("board-column--drag-over"),st=null);let V=F.target,ae=V.closest(".board-column");if(!ae)return;let fe=F.dataTransfer?.getData("text/plain")||"";if(!fe)return;let we=ae.id,Ee=I.get(fe);if(Ee&&Ee===we){if(Wc.has(we)){if(x!=="manual"){Z("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}yt(we,fe,V)}return}let je=Hc[we];if(!je){Z("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}N.get(fe)!==je&&dt(fe,je)}),e.addEventListener("keydown",F=>{let V=F.target;if(!(V instanceof HTMLElement))return;let ae=String(V.tagName||"").toLowerCase();if(ae==="input"||ae==="textarea"||ae==="select"||ae==="button"||ae==="a"||V.isContentEditable===!0)return;let fe=V.closest(".board-card");if(!fe)return;let we=String(F.key||"");if(we==="Enter"||we===" "){F.preventDefault();let xe=fe.getAttribute("data-issue-id");xe&&n(xe);return}if(we!=="ArrowUp"&&we!=="ArrowDown"&&we!=="ArrowLeft"&&we!=="ArrowRight")return;F.preventDefault();let Ee=fe.closest(".board-column");if(!Ee)return;let je=Array.from(Ee.querySelectorAll(".board-card")),rt=je.indexOf(fe);if(we==="ArrowDown"&&rt<je.length-1){lt(fe,je[rt+1]);return}if(we==="ArrowUp"&&rt>0){lt(fe,je[rt-1]);return}if(we==="ArrowLeft"||we==="ArrowRight"){let xe=Array.from(e.querySelectorAll(".board-column")),ze=xe.indexOf(Ee),ke=we==="ArrowRight"?1:-1,pt=ze+ke;for(;pt>=0&&pt<xe.length;){let vt=xe[pt].querySelector(".board-card");if(vt){lt(fe,vt);return}pt+=ke}}});function lt(F,V){try{F.tabIndex=-1,V.tabIndex=0,V.focus()}catch{}}let nt=null;h&&h.subscribe&&(nt=h.subscribe(()=>{try{de()}catch{}}));let Re=null;i&&i.subscribe&&(Re=i.subscribe(()=>{try{de()}catch{}}));let gt=null;return l&&l.subscribe&&(gt=l.subscribe(()=>{Ye()})),{async load(){r("load"),de()},clear(){P(),le(),nt&&(nt(),nt=null),Re&&(Re(),Re=null),gt&&(gt(),gt=null),e.replaceChildren(),T=[],R=[],U=[],$=[],Y=[],Q=[],N=new Map,I=new Map}}}function Es(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Qr(e,t){return e.filter(r=>{let n=Es(r);return!(n&&t.has(n))})}async function Yc(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Ar(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Wt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function dr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Vc(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${Wt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Wt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(l=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),l(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function Qt(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Vc(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Na="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function _t(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Jt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Jr=[...Jt,"reasoning_output_tokens"],Kc=["implementation","review-consult"];function Cs(e){let t=0;for(let r of Jt)t+=_t(e?.[r]);return t}function Zc(e){return!e||typeof e!="object"?!1:Jt.some(t=>Number.isFinite(e[t]))}function Oa(e){return!e||typeof e!="object"?!1:Jr.some(t=>Number.isFinite(e[t]))}function Xc(e){let t={};for(let r of Jr)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Da(e){let t={};for(let r of Jr)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Ma(e,t){return e==="codex"?_t(t.input_tokens)+_t(t.output_tokens):Cs(t)}function Qc(e){return e==="claude"?"Claude":"Codex"}function Jc(e){return`\u03C4 ${Fa(e)}`}function ed(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${_t(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${_t(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${_t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${_t(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${_t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${_t(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${_t(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Na),o.join(`
`)}function mt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Qc(r)} ${Jc(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:ed(r,n)})}return t}function qn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let l of Jr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=_t(i.breakdown[l])+_t(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Rs(e){return!e||typeof e!="object"?null:Dt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function td(e){return e==="codex"?"codex":"claude"}function ur(){return{subtotal:0,breakdown:Xc(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Fn(e,t,r){e.subtotal+=t.subtotal;for(let n of Jr)Number.isFinite(t.usage[n])&&(e.breakdown[n]=_t(e.breakdown[n])+_t(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Pa(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Fa(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Nr(e){return Zc(e)?`\u03C4 ${Fa(Cs(e))}`:null}function qt(e){let t=Nr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Fr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${_t(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${_t(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${_t(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${_t(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Cs(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Na),r.join(`
`)}function Dt(e,t){let r={claude:ur(),codex:ur()},n={orchestrator:{claude:ur(),codex:ur()},implementation:{claude:ur(),codex:ur()},"review-consult":{claude:ur(),codex:ur()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(Oa(l)){let f=td(i.runner),_=Da(l),h={provider:f,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:Ma(f,_)};_.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),Fn(r[f],h,!0),Fn(n.orchestrator[f],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!Kc.includes(f.role)||!Oa(f.usage))continue;let _=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let h=Da(f.usage),E={provider:"codex",role:f.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:Ma("codex",h)};E.receipt_id=_,typeof f.model=="string"&&(E.model=f.model),typeof f.session_id=="string"?E.session_id=f.session_id:typeof f.thread_id=="string"&&(E.session_id=f.thread_id),typeof f.turn_id=="string"&&(E.turn_id=f.turn_id),typeof f.completed_at=="string"&&(E.completed_at=f.completed_at),h.replayed===!0&&(E.replayed=!0),Fn(r.codex,E,!1),Fn(n[E.role].codex,E,!1)}}let o={};for(let i of["claude","codex"]){let l=r[i];if(l.legs.length===0)continue;let u=Pa(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let l={};for(let u of["claude","codex"]){let f=n[i][u];f.legs.length>0&&(l[u]={...Pa(f,!0),legs:f.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:Ya,setPrototypeOf:qa,isFrozen:rd,getPrototypeOf:nd,getOwnPropertyDescriptor:sd}=Object,{freeze:$t,seal:Mt,create:Ns}=Object,{apply:Fs,construct:qs}=typeof Reflect<"u"&&Reflect;$t||($t=function(t){return t});Mt||(Mt=function(t){return t});Fs||(Fs=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});qs||(qs=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Bn=xt(Array.prototype.forEach),od=xt(Array.prototype.lastIndexOf),Ba=xt(Array.prototype.pop),en=xt(Array.prototype.push),ad=xt(Array.prototype.splice),jn=xt(String.prototype.toLowerCase),Is=xt(String.prototype.toString),Ls=xt(String.prototype.match),tn=xt(String.prototype.replace),id=xt(String.prototype.indexOf),ld=xt(String.prototype.trim),Bt=xt(Object.prototype.hasOwnProperty),kt=xt(RegExp.prototype.test),rn=cd(TypeError);function xt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Fs(e,t,n)}}function cd(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return qs(e,r)}}function Me(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:jn;qa&&qa(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(rd(t)||(t[n]=o),s=o)}e[s]=!0}return e}function dd(e){for(let t=0;t<e.length;t++)Bt(e,t)||(e[t]=null);return e}function er(e){let t=Ns(null);for(let[r,n]of Ya(e))Bt(e,r)&&(Array.isArray(n)?t[r]=dd(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=er(n):t[r]=n);return t}function nn(e,t){for(;e!==null;){let n=sd(e,t);if(n){if(n.get)return xt(n.get);if(typeof n.value=="function")return xt(n.value)}e=nd(e)}function r(){return null}return r}var Ua=$t(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Os=$t(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ds=$t(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ud=$t(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ms=$t(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),pd=$t(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ja=$t(["#text"]),za=$t(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ps=$t(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ha=$t(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Un=$t(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),fd=Mt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),_d=Mt(/<%[\w\W]*|[\w\W]*%>/gm),md=Mt(/\$\{[\w\W]*/gm),gd=Mt(/^data-[\-\w.\u00B7-\uFFFF]+$/),hd=Mt(/^aria-[\-\w]+$/),Va=Mt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),bd=Mt(/^(?:\w+script|data):/i),yd=Mt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ka=Mt(/^html$/i),vd=Mt(/^[a-z][.\w]*(-[.\w]+)+$/i),Wa=Object.freeze({__proto__:null,ARIA_ATTR:hd,ATTR_WHITESPACE:yd,CUSTOM_ELEMENT:vd,DATA_ATTR:gd,DOCTYPE_NAME:Ka,ERB_EXPR:_d,IS_ALLOWED_URI:Va,IS_SCRIPT_OR_DATA:bd,MUSTACHE_EXPR:fd,TMPLIT_EXPR:md}),sn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},wd=function(){return typeof window>"u"?null:window},kd=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ga=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Za(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:wd(),t=pe=>Za(pe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==sn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:h,trustedTypes:E}=e,T=l.prototype,R=nn(T,"cloneNode"),U=nn(T,"remove"),$=nn(T,"nextSibling"),Y=nn(T,"childNodes"),Q=nn(T,"parentNode");if(typeof a=="function"){let pe=r.createElement("template");pe.content&&pe.content.ownerDocument&&(r=pe.content.ownerDocument)}let j,O="",{implementation:x,createNodeIterator:N,createDocumentFragment:I,getElementsByTagName:ie}=r,{importNode:ye}=n,oe=Ga();t.isSupported=typeof Ya=="function"&&typeof Q=="function"&&x&&x.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:me,ERB_EXPR:Oe,TMPLIT_EXPR:Je,DATA_ATTR:et,ARIA_ATTR:Ie,IS_SCRIPT_OR_DATA:Ve,ATTR_WHITESPACE:Se,CUSTOM_ELEMENT:de}=Wa,{IS_ALLOWED_URI:ve}=Wa,_e=null,H=Me({},[...Ua,...Os,...Ds,...Ms,...ja]),G=null,ge=Me({},[...za,...Ps,...Ha,...Un]),K=Object.seal(Ns(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ae=null,B=null,D=Object.seal(Ns(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),te=!0,De=!0,Ce=!1,Ne=!0,Te=!1,We=!0,Pe=!1,C=!1,S=!1,k=!1,A=!1,P=!1,re=!0,X=!1,le="user-content-",Le=!0,tt=!1,at={},Ye=null,bt=Me({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),dt=null,it=Me({},["audio","video","img","source","image","track"]),yt=null,It=Me({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),st="http://www.w3.org/1998/Math/MathML",lt="http://www.w3.org/2000/svg",nt="http://www.w3.org/1999/xhtml",Re=nt,gt=!1,F=null,V=Me({},[st,lt,nt],Is),ae=Me({},["mi","mo","mn","ms","mtext"]),fe=Me({},["annotation-xml"]),we=Me({},["title","style","font","a","script"]),Ee=null,je=["application/xhtml+xml","text/html"],rt="text/html",xe=null,ze=null,ke=r.createElement("form"),pt=function(b){return b instanceof RegExp||b instanceof Function},vt=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ze&&ze===b)){if((!b||typeof b!="object")&&(b={}),b=er(b),Ee=je.indexOf(b.PARSER_MEDIA_TYPE)===-1?rt:b.PARSER_MEDIA_TYPE,xe=Ee==="application/xhtml+xml"?Is:jn,_e=Bt(b,"ALLOWED_TAGS")?Me({},b.ALLOWED_TAGS,xe):H,G=Bt(b,"ALLOWED_ATTR")?Me({},b.ALLOWED_ATTR,xe):ge,F=Bt(b,"ALLOWED_NAMESPACES")?Me({},b.ALLOWED_NAMESPACES,Is):V,yt=Bt(b,"ADD_URI_SAFE_ATTR")?Me(er(It),b.ADD_URI_SAFE_ATTR,xe):It,dt=Bt(b,"ADD_DATA_URI_TAGS")?Me(er(it),b.ADD_DATA_URI_TAGS,xe):it,Ye=Bt(b,"FORBID_CONTENTS")?Me({},b.FORBID_CONTENTS,xe):bt,Ae=Bt(b,"FORBID_TAGS")?Me({},b.FORBID_TAGS,xe):er({}),B=Bt(b,"FORBID_ATTR")?Me({},b.FORBID_ATTR,xe):er({}),at=Bt(b,"USE_PROFILES")?b.USE_PROFILES:!1,te=b.ALLOW_ARIA_ATTR!==!1,De=b.ALLOW_DATA_ATTR!==!1,Ce=b.ALLOW_UNKNOWN_PROTOCOLS||!1,Ne=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Te=b.SAFE_FOR_TEMPLATES||!1,We=b.SAFE_FOR_XML!==!1,Pe=b.WHOLE_DOCUMENT||!1,k=b.RETURN_DOM||!1,A=b.RETURN_DOM_FRAGMENT||!1,P=b.RETURN_TRUSTED_TYPE||!1,S=b.FORCE_BODY||!1,re=b.SANITIZE_DOM!==!1,X=b.SANITIZE_NAMED_PROPS||!1,Le=b.KEEP_CONTENT!==!1,tt=b.IN_PLACE||!1,ve=b.ALLOWED_URI_REGEXP||Va,Re=b.NAMESPACE||nt,ae=b.MATHML_TEXT_INTEGRATION_POINTS||ae,fe=b.HTML_INTEGRATION_POINTS||fe,K=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&pt(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(K.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&pt(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(K.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(K.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Te&&(De=!1),A&&(k=!0),at&&(_e=Me({},ja),G=[],at.html===!0&&(Me(_e,Ua),Me(G,za)),at.svg===!0&&(Me(_e,Os),Me(G,Ps),Me(G,Un)),at.svgFilters===!0&&(Me(_e,Ds),Me(G,Ps),Me(G,Un)),at.mathMl===!0&&(Me(_e,Ms),Me(G,Ha),Me(G,Un))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?D.tagCheck=b.ADD_TAGS:(_e===H&&(_e=er(_e)),Me(_e,b.ADD_TAGS,xe))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?D.attributeCheck=b.ADD_ATTR:(G===ge&&(G=er(G)),Me(G,b.ADD_ATTR,xe))),b.ADD_URI_SAFE_ATTR&&Me(yt,b.ADD_URI_SAFE_ATTR,xe),b.FORBID_CONTENTS&&(Ye===bt&&(Ye=er(Ye)),Me(Ye,b.FORBID_CONTENTS,xe)),Le&&(_e["#text"]=!0),Pe&&Me(_e,["html","head","body"]),_e.table&&(Me(_e,["tbody"]),delete Ae.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw rn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw rn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');j=b.TRUSTED_TYPES_POLICY,O=j.createHTML("")}else j===void 0&&(j=kd(E,s)),j!==null&&typeof O=="string"&&(O=j.createHTML(""));$t&&$t(b),ze=b}},Vt=Me({},[...Os,...Ds,...ud]),p=Me({},[...Ms,...pd]),v=function(b){let W=Q(b);(!W||!W.tagName)&&(W={namespaceURI:Re,tagName:"template"});let z=jn(b.tagName),he=jn(W.tagName);return F[b.namespaceURI]?b.namespaceURI===lt?W.namespaceURI===nt?z==="svg":W.namespaceURI===st?z==="svg"&&(he==="annotation-xml"||ae[he]):!!Vt[z]:b.namespaceURI===st?W.namespaceURI===nt?z==="math":W.namespaceURI===lt?z==="math"&&fe[he]:!!p[z]:b.namespaceURI===nt?W.namespaceURI===lt&&!fe[he]||W.namespaceURI===st&&!ae[he]?!1:!p[z]&&(we[z]||!Vt[z]):!!(Ee==="application/xhtml+xml"&&F[b.namespaceURI]):!1},L=function(b){en(t.removed,{element:b});try{Q(b).removeChild(b)}catch{U(b)}},ee=function(b,W){try{en(t.removed,{attribute:W.getAttributeNode(b),from:W})}catch{en(t.removed,{attribute:null,from:W})}if(W.removeAttribute(b),b==="is")if(k||A)try{L(W)}catch{}else try{W.setAttribute(b,"")}catch{}},ue=function(b){let W=null,z=null;if(S)b="<remove></remove>"+b;else{let Qe=Ls(b,/^[\r\n\t ]+/);z=Qe&&Qe[0]}Ee==="application/xhtml+xml"&&Re===nt&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let he=j?j.createHTML(b):b;if(Re===nt)try{W=new h().parseFromString(he,Ee)}catch{}if(!W||!W.documentElement){W=x.createDocument(Re,"template",null);try{W.documentElement.innerHTML=gt?O:he}catch{}}let Ze=W.body||W.documentElement;return b&&z&&Ze.insertBefore(r.createTextNode(z),Ze.childNodes[0]||null),Re===nt?ie.call(W,Pe?"html":"body")[0]:Pe?W.documentElement:Ze},be=function(b){return N.call(b.ownerDocument||b,b,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},ce=function(b){return b instanceof _&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof f)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},qe=function(b){return typeof i=="function"&&b instanceof i};function se(pe,b,W){Bn(pe,z=>{z.call(t,b,W,ze)})}let Ke=function(b){let W=null;if(se(oe.beforeSanitizeElements,b,null),ce(b))return L(b),!0;let z=xe(b.nodeName);if(se(oe.uponSanitizeElement,b,{tagName:z,allowedTags:_e}),We&&b.hasChildNodes()&&!qe(b.firstElementChild)&&kt(/<[/\w!]/g,b.innerHTML)&&kt(/<[/\w!]/g,b.textContent)||b.nodeType===sn.progressingInstruction||We&&b.nodeType===sn.comment&&kt(/<[/\w]/g,b.data))return L(b),!0;if(!(D.tagCheck instanceof Function&&D.tagCheck(z))&&(!_e[z]||Ae[z])){if(!Ae[z]&&ht(z)&&(K.tagNameCheck instanceof RegExp&&kt(K.tagNameCheck,z)||K.tagNameCheck instanceof Function&&K.tagNameCheck(z)))return!1;if(Le&&!Ye[z]){let he=Q(b)||b.parentNode,Ze=Y(b)||b.childNodes;if(Ze&&he){let Qe=Ze.length;for(let m=Qe-1;m>=0;--m){let d=R(Ze[m],!0);d.__removalCount=(b.__removalCount||0)+1,he.insertBefore(d,$(b))}}}return L(b),!0}return b instanceof l&&!v(b)||(z==="noscript"||z==="noembed"||z==="noframes")&&kt(/<\/no(script|embed|frames)/i,b.innerHTML)?(L(b),!0):(Te&&b.nodeType===sn.text&&(W=b.textContent,Bn([me,Oe,Je],he=>{W=tn(W,he," ")}),b.textContent!==W&&(en(t.removed,{element:b.cloneNode()}),b.textContent=W)),se(oe.afterSanitizeElements,b,null),!1)},Pt=function(b,W,z){if(re&&(W==="id"||W==="name")&&(z in r||z in ke))return!1;if(!(De&&!B[W]&&kt(et,W))){if(!(te&&kt(Ie,W))){if(!(D.attributeCheck instanceof Function&&D.attributeCheck(W,b))){if(!G[W]||B[W]){if(!(ht(b)&&(K.tagNameCheck instanceof RegExp&&kt(K.tagNameCheck,b)||K.tagNameCheck instanceof Function&&K.tagNameCheck(b))&&(K.attributeNameCheck instanceof RegExp&&kt(K.attributeNameCheck,W)||K.attributeNameCheck instanceof Function&&K.attributeNameCheck(W,b))||W==="is"&&K.allowCustomizedBuiltInElements&&(K.tagNameCheck instanceof RegExp&&kt(K.tagNameCheck,z)||K.tagNameCheck instanceof Function&&K.tagNameCheck(z))))return!1}else if(!yt[W]){if(!kt(ve,tn(z,Se,""))){if(!((W==="src"||W==="xlink:href"||W==="href")&&b!=="script"&&id(z,"data:")===0&&dt[b])){if(!(Ce&&!kt(Ve,tn(z,Se,"")))){if(z)return!1}}}}}}}return!0},ht=function(b){return b!=="annotation-xml"&&Ls(b,de)},ft=function(b){se(oe.beforeSanitizeAttributes,b,null);let{attributes:W}=b;if(!W||ce(b))return;let z={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:G,forceKeepAttr:void 0},he=W.length;for(;he--;){let Ze=W[he],{name:Qe,namespaceURI:m,value:d}=Ze,w=xe(Qe),y=d,M=Qe==="value"?y:ld(y);if(z.attrName=w,z.attrValue=M,z.keepAttr=!0,z.forceKeepAttr=void 0,se(oe.uponSanitizeAttribute,b,z),M=z.attrValue,X&&(w==="id"||w==="name")&&(ee(Qe,b),M=le+M),We&&kt(/((--!?|])>)|<\/(style|title|textarea)/i,M)){ee(Qe,b);continue}if(w==="attributename"&&Ls(M,"href")){ee(Qe,b);continue}if(z.forceKeepAttr)continue;if(!z.keepAttr){ee(Qe,b);continue}if(!Ne&&kt(/\/>/i,M)){ee(Qe,b);continue}Te&&Bn([me,Oe,Je],$e=>{M=tn(M,$e," ")});let J=xe(b.nodeName);if(!Pt(J,w,M)){ee(Qe,b);continue}if(j&&typeof E=="object"&&typeof E.getAttributeType=="function"&&!m)switch(E.getAttributeType(J,w)){case"TrustedHTML":{M=j.createHTML(M);break}case"TrustedScriptURL":{M=j.createScriptURL(M);break}}if(M!==y)try{m?b.setAttributeNS(m,Qe,M):b.setAttribute(Qe,M),ce(b)?L(b):Ba(t.removed)}catch{ee(Qe,b)}}se(oe.afterSanitizeAttributes,b,null)},wt=function pe(b){let W=null,z=be(b);for(se(oe.beforeSanitizeShadowDOM,b,null);W=z.nextNode();)se(oe.uponSanitizeShadowNode,W,null),Ke(W),ft(W),W.content instanceof o&&pe(W.content);se(oe.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(pe){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},W=null,z=null,he=null,Ze=null;if(gt=!pe,gt&&(pe="<!-->"),typeof pe!="string"&&!qe(pe))if(typeof pe.toString=="function"){if(pe=pe.toString(),typeof pe!="string")throw rn("dirty is not a string, aborting")}else throw rn("toString is not a function");if(!t.isSupported)return pe;if(C||vt(b),t.removed=[],typeof pe=="string"&&(tt=!1),tt){if(pe.nodeName){let d=xe(pe.nodeName);if(!_e[d]||Ae[d])throw rn("root node is forbidden and cannot be sanitized in-place")}}else if(pe instanceof i)W=ue("<!---->"),z=W.ownerDocument.importNode(pe,!0),z.nodeType===sn.element&&z.nodeName==="BODY"||z.nodeName==="HTML"?W=z:W.appendChild(z);else{if(!k&&!Te&&!Pe&&pe.indexOf("<")===-1)return j&&P?j.createHTML(pe):pe;if(W=ue(pe),!W)return k?null:P?O:""}W&&S&&L(W.firstChild);let Qe=be(tt?pe:W);for(;he=Qe.nextNode();)Ke(he),ft(he),he.content instanceof o&&wt(he.content);if(tt)return pe;if(k){if(A)for(Ze=I.call(W.ownerDocument);W.firstChild;)Ze.appendChild(W.firstChild);else Ze=W;return(G.shadowroot||G.shadowrootmode)&&(Ze=ye.call(n,Ze,!0)),Ze}let m=Pe?W.outerHTML:W.innerHTML;return Pe&&_e["!doctype"]&&W.ownerDocument&&W.ownerDocument.doctype&&W.ownerDocument.doctype.name&&kt(Ka,W.ownerDocument.doctype.name)&&(m="<!DOCTYPE "+W.ownerDocument.doctype.name+`>
`+m),Te&&Bn([me,Oe,Je],d=>{m=tn(m,d," ")}),j&&P?j.createHTML(m):m},t.setConfig=function(){let pe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};vt(pe),C=!0},t.clearConfig=function(){ze=null,C=!1},t.isValidAttribute=function(pe,b,W){ze||vt({});let z=xe(pe),he=xe(b);return Pt(z,he,W)},t.addHook=function(pe,b){typeof b=="function"&&en(oe[pe],b)},t.removeHook=function(pe,b){if(b!==void 0){let W=od(oe[pe],b);return W===-1?void 0:ad(oe[pe],W,1)[0]}return Ba(oe[pe])},t.removeHooks=function(pe){oe[pe]=[]},t.removeAllHooks=function(){oe=Ga()},t}var Xa=Za();var Qa={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ja=e=>(...t)=>({_$litDirective$:e,values:t}),zn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var on=class extends zn{constructor(t){if(super(t),this.it=ct,t.type!==Qa.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ct||t==null)return this._t=void 0,this.it=t;if(t===kr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};on.directiveName="unsafeHTML",on.resultType=1;var ei=Ja(on);function zs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Er=zs();function ii(e){Er=e}var dn={exec:()=>null};function Ue(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(St.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var $d=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),St={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},xd=/^(?:[ \t]*(?:\n|$))+/,Sd=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ad=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,un=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Td=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Hs=/(?:[*+-]|\d{1,9}[.)])/,li=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ci=Ue(li).replace(/bull/g,Hs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ed=Ue(li).replace(/bull/g,Hs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ws=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Cd=/^[^\n]+/,Gs=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Rd=Ue(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Gs).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Id=Ue(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Hs).getRegex(),Kn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ys=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ld=Ue("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ys).replace("tag",Kn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),di=Ue(Ws).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kn).getRegex(),Od=Ue(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",di).getRegex(),Vs={blockquote:Od,code:Sd,def:Rd,fences:Ad,heading:Td,hr:un,html:Ld,lheading:ci,list:Id,newline:xd,paragraph:di,table:dn,text:Cd},ti=Ue("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kn).getRegex(),Dd={...Vs,lheading:Ed,table:ti,paragraph:Ue(Ws).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ti).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kn).getRegex()},Md={...Vs,html:Ue(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ys).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:dn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ue(Ws).replace("hr",un).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ci).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Pd=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Nd=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ui=/^( {2,}|\\)\n(?!\s*$)/,Fd=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Zn=/[\p{P}\p{S}]/u,Ks=/[\s\p{P}\p{S}]/u,pi=/[^\s\p{P}\p{S}]/u,qd=Ue(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ks).getRegex(),fi=/(?!~)[\p{P}\p{S}]/u,Bd=/(?!~)[\s\p{P}\p{S}]/u,Ud=/(?:[^\s\p{P}\p{S}]|~)/u,jd=Ue(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",$d?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),_i=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,zd=Ue(_i,"u").replace(/punct/g,Zn).getRegex(),Hd=Ue(_i,"u").replace(/punct/g,fi).getRegex(),mi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Wd=Ue(mi,"gu").replace(/notPunctSpace/g,pi).replace(/punctSpace/g,Ks).replace(/punct/g,Zn).getRegex(),Gd=Ue(mi,"gu").replace(/notPunctSpace/g,Ud).replace(/punctSpace/g,Bd).replace(/punct/g,fi).getRegex(),Yd=Ue("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,pi).replace(/punctSpace/g,Ks).replace(/punct/g,Zn).getRegex(),Vd=Ue(/\\(punct)/,"gu").replace(/punct/g,Zn).getRegex(),Kd=Ue(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Zd=Ue(Ys).replace("(?:-->|$)","-->").getRegex(),Xd=Ue("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Zd).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Gn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Qd=Ue(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Gn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),gi=Ue(/^!?\[(label)\]\[(ref)\]/).replace("label",Gn).replace("ref",Gs).getRegex(),hi=Ue(/^!?\[(ref)\](?:\[\])?/).replace("ref",Gs).getRegex(),Jd=Ue("reflink|nolink(?!\\()","g").replace("reflink",gi).replace("nolink",hi).getRegex(),ri=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Zs={_backpedal:dn,anyPunctuation:Vd,autolink:Kd,blockSkip:jd,br:ui,code:Nd,del:dn,emStrongLDelim:zd,emStrongRDelimAst:Wd,emStrongRDelimUnd:Yd,escape:Pd,link:Qd,nolink:hi,punctuation:qd,reflink:gi,reflinkSearch:Jd,tag:Xd,text:Fd,url:dn},eu={...Zs,link:Ue(/^!?\[(label)\]\((.*?)\)/).replace("label",Gn).getRegex(),reflink:Ue(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Gn).getRegex()},Bs={...Zs,emStrongRDelimAst:Gd,emStrongLDelim:Hd,url:Ue(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ri).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ue(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ri).getRegex()},tu={...Bs,br:Ue(ui).replace("{2,}","*").getRegex(),text:Ue(Bs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Hn={normal:Vs,gfm:Dd,pedantic:Md},an={normal:Zs,gfm:Bs,breaks:tu,pedantic:eu},ru={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ni=e=>ru[e];function tr(e,t){if(t){if(St.escapeTest.test(e))return e.replace(St.escapeReplace,ni)}else if(St.escapeTestNoEncode.test(e))return e.replace(St.escapeReplaceNoEncode,ni);return e}function si(e){try{e=encodeURI(e).replace(St.percentDecode,"%")}catch{return null}return e}function oi(e,t){let r=e.replace(St.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),n=r.split(St.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(St.slashPipe,"|");return n}function ln(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function nu(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function ai(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,l}function su(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Yn=class{constructor(e){Xe(this,"options");Xe(this,"rules");Xe(this,"lexer");this.options=e||Er}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:ln(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=su(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=ln(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ln(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=ln(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))i.push(r[l]),a=!0;else if(!a)i.push(r[l]);else break;r=r.slice(l);let u=i.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let E=h,T=E.raw+`
`+r.join(`
`),R=this.blockquote(T);o[o.length-1]=R,n=n.substring(0,n.length-E.raw.length)+R.raw,s=s.substring(0,s.length-E.text.length)+R.text;break}else if(h?.type==="list"){let E=h,T=E.raw+`
`+r.join(`
`),R=this.list(T);o[o.length-1]=R,n=n.substring(0,n.length-h.raw.length)+R.raw,s=s.substring(0,s.length-E.raw.length)+R.raw,r=T.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,R=>" ".repeat(3*R.length)),h=e.split(`
`,1)[0],E=!_.trim(),T=0;if(this.options.pedantic?(T=2,f=_.trimStart()):E?T=t[1].length+1:(T=t[2].search(this.rules.other.nonSpaceChar),T=T>4?1:T,f=_.slice(T),T+=t[1].length),E&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let R=this.rules.other.nextBulletRegex(T),U=this.rules.other.hrRegex(T),$=this.rules.other.fencesBeginRegex(T),Y=this.rules.other.headingBeginRegex(T),Q=this.rules.other.htmlBeginRegex(T);for(;e;){let j=e.split(`
`,1)[0],O;if(h=j,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),O=h):O=h.replace(this.rules.other.tabCharGlobal,"    "),$.test(h)||Y.test(h)||Q.test(h)||R.test(h)||U.test(h))break;if(O.search(this.rules.other.nonSpaceChar)>=T||!h.trim())f+=`
`+O.slice(T);else{if(E||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||$.test(_)||Y.test(_)||U.test(_))break;f+=`
`+h}!E&&!h.trim()&&(E=!0),u+=j+`
`,e=e.substring(j.length+1),_=O.slice(T)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=f.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=f.raw+l.tokens[0].raw,l.tokens[0].text=f.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(f)):l.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):l.tokens.unshift(f)}}if(!s.loose){let u=l.tokens.filter(_=>_.type==="space"),f=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=oi(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(oi(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=ln(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=nu(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),ai(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return ai(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,l=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let E=_.slice(1,-1);return{type:"em",raw:_,text:E,tokens:this.lexer.inlineTokens(E)}}let h=_.slice(2,-2);return{type:"strong",raw:_,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ut=class Us{constructor(t){Xe(this,"tokens");Xe(this,"options");Xe(this,"state");Xe(this,"inlineQueue");Xe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Er,this.options.tokenizer=this.options.tokenizer||new Yn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:St,block:Hn.normal,inline:an.normal};this.options.pedantic?(r.block=Hn.pedantic,r.inline=an.pedantic):this.options.gfm&&(r.block=Hn.gfm,this.options.breaks?r.inline=an.breaks:r.inline=an.gfm),this.tokenizer.rules=r}static get rules(){return{block:Hn,inline:an}}static lex(t,r){return new Us(r).lex(t)}static lexInline(t,r){return new Us(r).inlineTokens(t)}lex(t){t=t.replace(St.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(St.tabCharGlobal,"    ").replace(St.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},i),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(f=>(l=f.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let f=r.at(-1);l.type==="text"&&f?.type==="text"?(f.raw+=l.raw,f.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,i)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),h;this.options.extensions.startInline.forEach(E=>{h=E.call({lexer:this},_),typeof h=="number"&&h>=0&&(f=Math.min(f,h))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=l.raw,f.text+=l.text):r.push(l);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Vn=class{constructor(e){Xe(this,"options");Xe(this,"parser");this.options=e||Er}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(St.notSpaceStart)?.[0],s=e.replace(St.endingNewline,"")+`
`;return n?'<pre><code class="language-'+tr(n)+'">'+(r?s:tr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:tr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${tr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=si(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+tr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=si(e);if(s===null)return tr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${tr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:tr(e.text)}},Xs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},jt=class js{constructor(t){Xe(this,"options");Xe(this,"renderer");Xe(this,"textRenderer");this.options=t||Er,this.options.renderer=this.options.renderer||new Vn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Xs}static parse(t,r){return new js(r).parse(t)}static parseInline(t,r){return new js(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Wn,cn=(Wn=class{constructor(e){Xe(this,"options");Xe(this,"block");this.options=e||Er}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ut.lex:Ut.lexInline}provideParser(){return this.block?jt.parse:jt.parseInline}},Xe(Wn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Xe(Wn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Wn),ou=class{constructor(...e){Xe(this,"defaults",zs());Xe(this,"options",this.setOptions);Xe(this,"parse",this.parseMarkdown(!0));Xe(this,"parseInline",this.parseMarkdown(!1));Xe(this,"Parser",jt);Xe(this,"Renderer",Vn);Xe(this,"TextRenderer",Xs);Xe(this,"Lexer",Ut);Xe(this,"Tokenizer",Yn);Xe(this,"Hooks",cn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Vn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],l=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=l.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Yn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],l=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=l.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new cn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],l=s[a];cn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&cn.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,u);return l.call(s,_)})();let f=i.call(s,u);return l.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,u);return _===!1&&(_=await l.apply(s,u)),_})();let f=i.apply(s,u);return f===!1&&(f=l.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ut.lex(e,t??this.defaults)}parser(e,t){return jt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Ut.lex:Ut.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?jt.parse:jt.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ut.lex:Ut.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?jt.parse:jt.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+tr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Tr=new ou;function Ge(e,t){return Tr.parse(e,t)}Ge.options=Ge.setOptions=function(e){return Tr.setOptions(e),Ge.defaults=Tr.defaults,ii(Ge.defaults),Ge};Ge.getDefaults=zs;Ge.defaults=Er;Ge.use=function(...e){return Tr.use(...e),Ge.defaults=Tr.defaults,ii(Ge.defaults),Ge};Ge.walkTokens=function(e,t){return Tr.walkTokens(e,t)};Ge.parseInline=Tr.parseInline;Ge.Parser=jt;Ge.parser=jt.parse;Ge.Renderer=Vn;Ge.TextRenderer=Xs;Ge.Lexer=Ut;Ge.lexer=Ut.lex;Ge.Tokenizer=Yn;Ge.Hooks=cn;Ge.parse=Ge;var B_=Ge.options,U_=Ge.setOptions,j_=Ge.use,z_=Ge.walkTokens,H_=Ge.parseInline;var W_=jt.parse,G_=Ut.lex;function pr(e){let t=Ge.parse(e),r=Xa.sanitize(t);return ei(r)}function rr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function qr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Xn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var au={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},iu=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,lu=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function fr(e){return!!e&&typeof e=="object"}function Qs(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function bi(e,t){let r=Qs(e),n=Qs(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function cu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>fr(s)&&typeof s.text=="string"?s.text:"").join(""):fr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function du(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:au[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Qs(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=bi(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let l=bi(fr(i)?i.old_string:"",fr(i)?i.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function yi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function vi(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=iu.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:lu.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function uu(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(fr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(vi(o.text));else if(o.type==="thinking"){let a=yi(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=du(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(fr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=cu(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function pu(e){if(e.type==="item.completed"&&fr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[vi(t.text)];if(t.type==="reasoning"){let r=yi(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function fu(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function wi(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!fr(o))continue;let a=fu(o)?pu(o):uu(o,r);for(let i of a)t.push(i)}return t}var _u=5,mu=10,gu=/Task\s+#(\d+)/,hu=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,bu=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Qn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function yu(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function vu(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function wu(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=gu.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function ku(e){if(e.tool==="Bash"){let t=e.command||"";return hu.test(t)?"~ PR/\uAC8C\uC2DC \uC911":bu.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function $u(e){let t=e.filter(s=>s.kind==="tool").slice(-mu),r=new Map;t.forEach((s,o)=>{let a=ku(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function xu(e){let t=vu(e);if(t)return{text:t,guess:!1};let r=wu(e);if(r)return{text:r,guess:!1};let n=$u(e);return n?{text:n,guess:!0}:null}function Su(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Ct(e,t)}function Jn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},i=!0,l=new Set,u=new Set,f=null,_=null,h=!1,E=!1,T=!1,R=null,U=null;function $(){h=!1,E=!1,T=!1,R=null,U=null}async function Y(B){if(r){E=!0,T=!1,Se();try{let D=await Promise.resolve(r("get-attempt-prompt",{attempt_id:B}));if(o!==B)return;!D||typeof D!="object"||Array.isArray(D)?T=!0:(R=D,U=B)}catch{o===B&&(T=!0)}finally{o===B&&(E=!1,Se())}}}function Q(){if(h=!h,h&&o&&U!==o){Y(o);return}Se()}function j(){if(!h)return"";let B=qr({loading:E,error:T});if(B)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${B}
      </div>`;if(!R)return"";if(R.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let D=Xn(R.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${D?c`<div class="prompt-block__meta">${D} 발송</div>`:""}
      ${typeof R.task_prompt=="string"?rr("\uACFC\uC5C5 (user)",R.task_prompt):""}
      ${typeof R.system_prompt=="string"?rr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",R.system_prompt):""}
    </div>`}function O(){if(!o||!n)return[];let B=n.get(o);return wi(B?B.lines:[])}function x(){if(!o||!n)return null;let B=n.get(o),D=B?B.last_event_at:null;return typeof D=="number"?D:null}function N(){return a.status==="running"}function I(){if(N()&&o){_||(_=setInterval(()=>Se(),1e3));return}ie()}function ie(){_&&(clearInterval(_),_=null)}function ye(B){let D=[],te=0;for(;te<B.length;){let De=B[te];if(De.kind==="tool"){let Ce=te;for(;Ce<B.length&&B[Ce].kind==="tool"&&B[Ce].tool===De.tool;)Ce+=1;if(Ce-te>=_u&&!u.has(te)){D.push({kind:"group",idx:te,tool:De.tool||"",lines:B.slice(te,Ce).map((Ne,Te)=>({idx:te+Te,line:Ne}))}),te=Ce;continue}}D.push({kind:"line",idx:te,line:De}),te+=1}return D}function oe(B){for(let D=B.length-1;D>=0;D-=1){let te=B[D];if(te.kind==="result"||te.kind==="error")return null;if(te.kind==="tool"&&!Object.hasOwn(te,"result"))return te}return null}function me(B){for(let D=B.length-1;D>=0;D-=1)if(B[D].kind==="thinking")return B[D];return null}function Oe(B,D){if(D.kind==="gate")return c`<div class="sv__gate">${D.text}</div>`;if(D.kind==="phase")return c`<div class="sv__phase">${D.text}</div>`;if(D.kind==="result")return c`<div
        class="sv__result${D.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${D.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${pr(D.text||(D.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(D.kind==="thinking"){let te=l.has(B);return c`<div
        class="sv__think${te?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ve(B)}
      >
        <span class="sv__think-line">💭 ${Qn(D.text)}</span>
        ${te?c`<pre class="sv__think-expand">${D.text}</pre>`:""}
      </div>`}if(D.kind==="error")return c`<div class="sv__error">⛔ ${D.text}</div>`;if(D.kind==="blocker")return c`<div class="sv__error">⛔ ${D.text}</div>`;if(D.kind==="tool"){let te=l.has(B),De=D.tool==="Bash"?yu(D.command):0,Ce=D.tool==="Bash"?De>1?Qn(D.command):D.command:D.path||D.command||"";return c`<div
        class="sv__tool${te?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ve(B)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${D.icon}</span>
          <span class="sv__tool-name">${D.tool}</span>
          ${Ce?c`<span class="sv__tool-detail">${Ce}</span>`:""}
          ${De>1?c`<span class="sv__tool-more">⋯ ${De}줄</span>`:""}
          ${typeof D.added=="number"?c`<span class="sv__diff-add">+${D.added}</span>`:""}
          ${typeof D.removed=="number"?c`<span class="sv__diff-del">−${D.removed}</span>`:""}
          ${D.result?c`<span class="sv__tool-ok">→ ${D.result}</span>`:""}
        </span>
        ${te?c`<pre class="sv__tool-expand">${Je(D)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${pr(D.text||"")}</div>`}function Je(B){let D=[];if(B.tool==="Bash"&&typeof B.command=="string"&&B.command.length>0)D.push(B.command);else if(B.input!==void 0)try{D.push(`input: ${JSON.stringify(B.input,null,2)}`)}catch{}return typeof B.output=="string"&&B.output.length>0&&D.push(`output:
${B.output}`),D.join(`

`)}function et(){if(!o)return c``;let B=O(),D=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),te=a.session_id||"",De=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${i?"ON":"OFF"}`,Ce=N(),Ne=Ce?Su(x(),Date.now()):"",Te=Ce?oe(B):null,We=Ce?me(B):null,Pe=xu(B);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${Pe?c`<span
              class="sv__stage${Pe.guess?" sv__stage--guess":""}"
              title=${Pe.text}
              >${Pe.text}</span
            >`:""}
        ${Ce?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ne?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ne}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ne?c`<span class="sv__live-ago">${Ne}</span>`:""}</span
            >`:""}
        ${te?c`<button
              type="button"
              class="sv__session"
              title=${te}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${te}`}
              @click=${()=>H(te)}
            >
              ⧉ ${te.slice(0,8)}
            </button>`:""}
        ${D?c`<span class="sv__meta">${D}</span>`:""}
        ${a.worktree?c`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${h?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${h?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${Q}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${i?" sv__follow--on":""}"
          aria-pressed=${i?"true":"false"}
          aria-label=${De}
          @click=${_e}
        >
          <span class="sv__follow-full">⇣ ${De}</span>
          <span class="sv__follow-short">⇣ ${i?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Ae()}
        >
          ✕
        </button>
      </div>
      ${j()}
      <div class="sv__body">
        ${B.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ye(B).map(C=>C.kind==="group"?Ie(C):Oe(C.idx,C.line))}
      </div>
      ${Te||We?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Te?c`<span class="sv__now-icon">${Te.icon}</span>
                  <span class="sv__now-name">${Te.tool}</span>
                  <span class="sv__now-detail"
                    >${Te.tool==="Bash"?Qn(Te.command):Te.path||Te.command||""}</span
                  >`:""}
            ${We?c`<span class="sv__now-think"
                  >💭 ${Qn(We.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ie(B){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Ve(B.idx)}
    >
      <span class="sv__group-icon">${B.lines[0].line.icon}</span>
      <span class="sv__group-name">${B.tool}</span>
      <span class="sv__group-count">${B.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ve(B){u.add(B),Se()}function Se(){Fe(et(),e),I(),i&&de()}function de(){let B=e.querySelector(".sv__body");B&&(B.scrollTop=B.scrollHeight)}function ve(B){l.has(B)?l.delete(B):l.add(B),Se()}function _e(){i=!i,Se()}function H(B){Ar(B).then(D=>{D?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function G(B){!o||!B||(a={...a,...B},Se())}function ge(B){let D=B.target;if(!D||!D.classList||!D.classList.contains("sv__body"))return;!(D.scrollHeight-D.scrollTop-D.clientHeight<=4)&&i&&(i=!1,Se())}e.addEventListener("scroll",ge,!0);function K(B){let D=B&&B.attempt_id;D&&(o=D,a=B.meta||{},i=!0,l.clear(),u.clear(),$(),!f&&n&&(f=n.subscribe(Se)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),Se())}function Ae(){let B=o;o=null,l.clear(),u.clear(),$(),ie(),r&&B&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${B}`})).catch(()=>{}),Fe(c``,e),s&&s()}return{open:K,updateMeta:G,close:Ae,isOpen(){return o!==null},destroy(){ie(),f&&(f(),f=null),e.removeEventListener("scroll",ge,!0),o=null,Fe(c``,e)}}}function pn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=ki(t.spec_id),s=ki(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function ki(e){return typeof e=="string"?e.trim():""}function Au(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Tu(e){let t=e&&e.metadata||{},r=pn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Au(t)?null:"plan_pending"}),n}function $i(e,t){let r=Tu(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${r.map(n=>c`<div class="detail-art">
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
  `}var Eu="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Cu=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Ru=/^\*\*결론\*\* — (.+)$/;function es(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Eu)return null;let r=Cu.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Ru.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var xi=20;function Si(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Iu(e){return e.length>xi?`${e.slice(0,xi)}\u2026`:e}function Lu(e,t,r,n){let s=`${t.lane} ${Iu(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Si(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${pr(t.body)}
        </div>`:""}
  </div>`}function Ou(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Si(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${pr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ai(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let u=es(typeof l.text=="string"?l.text:"");return u?Lu(l,u,t,s.has(l.id)):Ou(l)})}
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
  `}var Du=["codex","opus","fable","self","skip"],Mu=["codex","fable","skip"],Pu=["low","medium","high","xhigh"],Nu=["standard","fast_track"],Ur=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],eo={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},Ti={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},Fu=["self","skip"],qu="opus",to={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function ro(e){let t=eo[e]||{title:e};return c`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?c`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function Bu(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:to[e]||"(\uAE30\uBCF8)"}function Br(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Cr(e){if(!Br(e)||!Br(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Br(r)&&Br(r.models));return t.length>0?t:null}function Js(e){return{value:e,label:e}}function no(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Ei(e,t,r=null){let n=Cr(e);if(!n)return t?[{label:null,options:[Js(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,i])=>({label:a,options:Object.keys(i.models).map(Js)})),o=s.some(a=>a.options.some(i=>i.value===t));return t&&!o?[no(t),...s]:s}function _r(e,t){let r={label:null,options:e.map(Js)};return t&&!e.includes(t)?[no(t),r]:[r]}function nr(e,t){let r=Cr(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function so(e,t){return Br(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Uu(e,t){return Br(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():so(e,t)}function ju(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Uu(n,n.models[t]);return[]}function zu(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function oo(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return so(n,n.models[t]);return[]}function Ii(e){let t=Cr(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of so(n,s))r.includes(o)||r.push(o);return r}function Li(e,t){if(!t)return Ii(e);let n=Cr(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of oo(e,o))s.includes(a)||s.push(a);return s}function rs(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=nr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?oo(t,n.impl_model):Li(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function jr(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||qu,a=r("impl_model"),i=r("impl_runtime"),l=i==="claude"||i==="codex"?i:i==="inherit"?s===void 0?nr(n,o):s:null;return Ur.map(u=>{let f=t(u),_,h=!1;return u==="orchestration_model"?_=Ei(n,f):u==="impl_runtime"?_=_r(["inherit","claude","codex"],f):u==="impl_model"?(_=l?Ei(n,f,l):f?[no(f)]:[],h=i==="inherit"&&l===null):u==="orchestration_effort"?_=_r(ju(n,o),f):u==="orchestration_speed"?_=Hu(zu(n,o),f):u==="impl_effort"?(_=_r(a?oo(n,a):l?Li(n,l):Ii(n),f),h=i==="inherit"&&l===null):u==="plan_review_model"?_=_r(Mu,f):Object.hasOwn(Ti,u)?(_=_r(Pu,f),h=Fu.includes(r(Ti[u]))):_=_r(Du,f),{key:u,groups:_,selected:f,disabled:h,runner:u==="orchestration_model"?nr(n,o):null}})}function ts(e,t,r){return c`
    ${typeof r=="string"?c`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Ci(s,t)):c`<optgroup label=${n.label}>
            ${n.options.map(s=>Ci(s,t))}
          </optgroup>`)}
  `}function Hu(e,t){return _r(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function Ci(e,t){return c`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Ri(e,t,r,n,s,o,a){return c`
    <div class="detail-kv">
      <span class="detail-kv__k">${ro(e)}</span>
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
        ${o?c`<span class="detail-kv__note" data-runner-for=${e}
              >${o}</span
            >`:""}
      </span>
    </div>
  `}function Oi(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},i=_=>typeof o[_]=="string"?o[_]:"",u=jr({selectedOf:i,effectiveOf:_=>{let h=i(_);return h||(typeof a[_]=="string"?a[_]:"")},runner_catalog:n}),f=o.workflow_mode==="fast_track"?"fast_track":"standard";return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${u.map(_=>Ri(_.key,ts(_.groups,_.selected,Bu(_.key,a,s)),_.selected,!1,_.disabled,_.runner,t))}
    ${Ri("workflow_mode",ts(_r(Nu,f),f),f,o.workflow_mode==="fast_track",!1,null,t)}
  `}function Wu(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Di(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function l(T){T.key==="Escape"&&s&&(T.preventDefault(),h())}document.addEventListener("keydown",l);function u(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Wu(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${i}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:pr(a)}
          </div>
        </div>
      </div>
    `:c``}function f(){Fe(u(),e)}async function _(T,R={}){s=T,o="loading",a="",i="",f();let U=r?r():"";if(!U){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let $="/api/doc?workspace="+encodeURIComponent(U)+"&path="+encodeURIComponent(T);try{let Y=await n($),Q=await Y.json().catch(()=>({}));if(!Y.ok||!Q||Q.ok!==!0){if(Q?.error==="not_found"&&R.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(Q&&Q.error||Y.status)+")",f();return}a=String(Q.content||""),o="ready",f()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function h(){s=null,Fe(c``,e)}function E(){document.removeEventListener("keydown",l),h()}return{open:_,close:h,destroy:E}}var Gu=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Ni="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Yu(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Vu(e){let t=mt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Nr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Ni}
          >부분 집계</span
        >`:""}`}function Mi(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Pi(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Fi(t):""}function Ku(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=mt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
        <span class="detail-session__leg-role detail-session__usage-label"
          >${r}</span
        >
        <span class="detail-session__leg-meta detail-session__usage-value"
          >${[s.provider,s.model].filter(Boolean).join(" \xB7 ")}</span
        >
        ${s.session_id?c`<span
              class="detail-session__leg-sid detail-session__sid"
              title=${s.session_id}
              >${s.session_id.slice(0,8)}</span
            >`:""}
        ${Pi(s.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
              >${Pi(s.completed_at)}</span
            >`:""}
        ${a?c`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function Zu(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Gu,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${n.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Yu(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Ni}</span>`:""}
  </div>`}var Xu={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Fi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Qu(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function qi(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let _=typeof u.session_id=="string"&&u.session_id.length>0,h=o.has(u.attempt_id),E=_&&!h,T=_?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!E}
      title=${T}
      @click=${R=>{R.stopPropagation(),E&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let _=u.cause_detail,h=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:u.cause;return c`<div class="detail-session__cause" title=${h}>
      ${u.cause}
    </div>`},l=u=>{let f=Mi(Rs(u));if(mt(f).length===0&&!Nr(u.usage))return"";let _=s.has(u.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Vu(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=Rs(u),_=Mi(f),h=mt(_);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Xu[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${dr(u)?c`<span
                  class="detail-session__resumed"
                  title=${dr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Wt(u)}</span>
            ${h.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?c`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(E=>c`<span
                      class="detail-session__usage"
                      title=${E.tooltip}
                      >${E.label}</span
                    >`):Nr(u.usage)?c`<span class="detail-session__usage"
                    >${Nr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Fi(u.started_at)}</span>
          </button>
          ${l(u)} ${a(u)} ${i(u)} ${Qu(u)}
          ${s.has(u.attempt_id)&&u.usage?Zu(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Ku(f)}
        </div>`})}
    </div>
  `}function Bi(e,t={}){return c`
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
          ${Ju(e)}
        </div>`:""}
  `}function Ju(e){let t=qr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?rr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Xn(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?rr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?rr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var ep=["open","in_progress","deferred","resolved","closed"],tp=[0,1,2,3,4];function Ui(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,f=null,_={},h="",E=!1,T=!1,R=!1,U="",$="",Y="";function Q(){T=!1,R=!1,U="",$="",Y=""}let j=[],O=null,x=null,N=!1,I="",ie=!1,ye=0,oe=new Set;function me(){j=[],O=null,x=null,N=!1,I="",ie=!1,ye+=1,oe.clear()}async function Oe(d){if(!s)return;let w=++ye;try{let y=await Promise.resolve(s("get-comments",{id:d}));if(w!==ye||d!==u)return;j=Array.isArray(y)?y:[],N=!1}catch{if(w!==ye||d!==u)return;N=!0}m()}function Je(){if(!s||!u)return;let d=f&&typeof f.comment_count=="number"?f.comment_count:null;if(O!==u){O=u,x=d,Oe(u);return}d!==null&&d!==x&&(x=d,Oe(u))}function et(d){oe.has(d)?oe.delete(d):oe.add(d),m()}function Ie(d){let w=I.trim().length===0;I=d,w!==(d.trim().length===0)&&m()}async function Ve(){let d=I.trim();if(!s||!u||d.length===0||ie)return;let w=u;ie=!0,m();let y=!1;try{let M=await Promise.resolve(s("add-comment",{id:w,text:d}));Array.isArray(M)&&M.length>0&&(y=!0,w===u&&(j=M,N=!1,I="",x=M.length))}catch{y=!1}y||Z("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),w===u&&(ie=!1),m()}let Se={onToggle:et,onDraftInput:Ie,onSubmit:Ve},de=document.createElement("div");de.className="md-viewer-root",document.body.appendChild(de);let ve=Di(de,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),_e=document.createElement("div");_e.className="session-log-root",document.body.appendChild(_e);let H=Jn(_e,{transport:s?(d,w)=>Promise.resolve(s(d,w)):void 0,sessionLogStore:l}),G=!1,ge=!1,K=!1,Ae=null,B=null,D=0;function te(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function De(){G=!1,ge=!1,K=!1,Ae=null,B=null,D+=1}async function Ce(d){if(!s)return;let w=++D;ge=!0,K=!1,m();try{let y=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if(w!==D)return;!y||typeof y!="object"||Array.isArray(y)?K=!0:(Ae=y,B=te(d))}catch{w===D&&(K=!0)}finally{w===D&&(ge=!1,m())}}function Ne(){if(G=!G,G&&u&&B!==te(u)){Ae=null,Ce(u);return}m()}function Te(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(y=>y&&y.bead_id===u).sort((y,M)=>(M.started_at||0)-(y.started_at||0)).map(y=>({attempt_id:y.attempt_id,bead_id:y.bead_id,status:y.status,started_at:typeof y.started_at=="number"?y.started_at:null,runner:y.runner||null,model:y.model||null,effort:y.effort||null,speed:y.speed||null,session_id:y.session_id||null,resumed_from:y.resumed_from||null,continuation_mode:y.continuation_mode||null,dismissed_at:typeof y.dismissed_at=="number"?y.dismissed_at:null,cause:typeof y.cause=="string"?y.cause:null,cause_detail:y.cause_detail||null,exec_default_preset_id:typeof y.exec_default_preset_id=="string"?y.exec_default_preset_id:null,exec_default_preset_revision:typeof y.exec_default_preset_revision=="number"?y.exec_default_preset_revision:null,exec_values:y.exec_values&&typeof y.exec_values=="object"?y.exec_values:null,usage:y.usage||null,usage_legs:Array.isArray(y.usage_legs)?y.usage_legs:[]}))}function We(){if(!a||!u)return null;let d=a.get();return Dt(d&&d.attempts||{},u)}let Pe=new Set;function C(d){Pe.has(d)?Pe.delete(d):Pe.add(d),m()}function S(d){let w=a?a.get():null,y=w&&w.attempts?w.attempts[d]:null;H.open({attempt_id:d,meta:y?{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.status||void 0,session_id:y.session_id||void 0}:{}})}async function k(d){if(!s||!d)return;let w=()=>{let $e=a?a.get():null;return $e&&typeof $e.revision=="number"?$e.revision:0},y=async($e={})=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:w(),...$e}),M=$e=>{$e?.queue&&a?.set&&a.set($e.queue)},J=await y();if(M(J),J&&J.conflict){let $e=J.queue&&typeof J.queue.revision=="number"?J.queue.revision:w();J=await s("worker-attempt-resume",{attempt_id:d,expected_revision:$e}),M(J)}J=await Qt(J,($e,ut)=>y({continuation:$e,decision_token:ut}),{onResult:M,refresh:()=>y()}),J&&J.resumed===!1&&!J.conflict&&J.reason&&Z(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${J.reason}`,"error",2400)}let A={onOpen:S,onResume:k,onToggleUsage:C};function P(){let d=a?a.get():null,w=d&&d.default_exec_preset_id,y=typeof w=="string"?Le()?.presets.find(M=>M.id===w):null;return y&&y.compatible!==!1&&y.settings?y.settings:{}}function re(){let d=a?a.get():null,w=d&&d.default_exec_preset_id,y=typeof w=="string"?Le()?.presets.find(M=>M.id===w):null;return y&&y.compatible!==!1&&typeof y.name=="string"?y.name:""}function X(){let d=a?a.get():null;return d&&d.runner_catalog||null}function le(){let d=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},y=(Object.hasOwn(_,"orchestration_model")?_.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof P().orchestration_model=="string"?P().orchestration_model:"")||"opus";return nr(X(),y)}function Le(){let d=i?i.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function tt(d){let w=d&&d.settings&&typeof d.settings=="object"?d.settings:{},y=M=>typeof w[M]=="string"?w[M]:M==="impl_runtime"&&typeof w.impl_model=="string"&&nr(X(),w.impl_model)||"";return jr({selectedOf:y,effectiveOf:y,runner_catalog:X()}).some(M=>M.groups.some(J=>J.options.some($e=>$e.value===M.selected&&$e.label.endsWith("(\uBE44\uD638\uD658)"))))}function at(d){i&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&i.set({revision:d.revision,presets:d.presets})}async function Ye(){let d=Le(),w=d?.presets.find(y=>y.id===h);if(!(!s||!u||!d||!w||tt(w)||E)){E=!0,m();try{let y=await Promise.resolve(s("apply-exec-preset",{id:u,preset_id:w.id,expected_revision:d.revision}));if(y&&y.conflict){at(y),Z("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let M=y&&Array.isArray(y.issue)?y.issue[0]:y?.issue;if(y&&y.applied&&M&&typeof M=="object"){f=M;for(let J of Ur)delete _[J];Z("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}y&&y.error==="bd_readback_failed"?Z("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):Z("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(y){y&&typeof y=="object"&&y.code==="bd_readback_failed"?Z("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):Z("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{E=!1,m()}}}function bt(){let d=Le();if(d&&d.presets.length===0)return c`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let w=d?d.presets:[],y=w.find(J=>J.id===h),M=y?tt(y):!1;return c`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${d===null||E}
          @change=${J=>{h=J.target.value,m()}}
        >
          <option value="" ?selected=${h===""}>
            ${d===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${w.map(J=>{let $e=tt(J);return c`<option
              value=${J.id}
              ?selected=${J.id===h}
            >
              ${J.name}${$e?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${d===null||!y||M||E}
          @click=${()=>{Ye()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let dt=null;r&&r.subscribe&&(dt=r.subscribe(()=>st()));let it=null;a&&typeof a.subscribe=="function"&&(it=a.subscribe(()=>{u&&m()}));let yt=null;i&&typeof i.subscribe=="function"&&(yt=i.subscribe(()=>{u&&m()}));function It(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",It);function st(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];f=d.find(y=>y&&y.id===u)||d[0]||f}Je(),m()}}function lt(d){Ar(d).then(w=>{w?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function nt(d){d.preventDefault(),d.stopPropagation(),u&&lt(u)}function Re(d,w){d.preventDefault(),d.stopPropagation(),lt(w)}function gt(d,w,y){d.preventDefault(),d.stopPropagation(),ve.open(w,{missing_state:y})}function F(d,w){_[d]=w,m(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",{id:u,key:d,value:w})).catch(()=>{Z("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function V(d,w){let y=f||{},M=y.metadata&&typeof y.metadata=="object"?y.metadata:{},J={};for(let Be of["impl_runtime","impl_model","impl_effort"])J[Be]=Object.hasOwn(_,Be)?_[Be]:typeof M[Be]=="string"?M[Be]:"";J[d]=w;let $e=rs(J,X(),le()),ut={};for(let Be of["impl_runtime","impl_model","impl_effort"])ut[Be]=_[Be],_[Be]=$e[Be]||"";m(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...$e,orchestration_runtime:le()})).then(Be=>{let or=Array.isArray(Be)?Be[0]:Be;if(!or||typeof or!="object"||!or.id)throw new Error("implementation target readback failed");f=or;for(let br of["impl_runtime","impl_model","impl_effort"])delete _[br];m()}).catch(()=>{for(let Be of["impl_runtime","impl_model","impl_effort"])ut[Be]===void 0?delete _[Be]:_[Be]=ut[Be];m(),Z("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function ae(d,w,y){if(!s||!u)return!1;try{let M=await Promise.resolve(s(d,w)),J=Array.isArray(M)?M[0]:M;return J&&typeof J=="object"&&J.id?(f=J,!0):(Z(y,"error"),!1)}catch{return Z(y,"error"),!1}}function fe(d){setTimeout(()=>{try{let w=e.querySelector(d);w&&typeof w.focus=="function"&&w.focus()}catch{}},0)}function we(){T=!0,U=f&&f.title||"",m(),fe('.detail-edit__input[data-edit="title"]')}function Ee(d){U=d.target.value}function je(){T=!1,U="",m()}function rt(){ae("edit-text",{id:u,field:"title",value:U},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(w=>{w&&(T=!1,U=""),m()})}function xe(){R=!0,$=f&&f.description||"",m(),fe('.detail-edit__textarea[data-edit="description"]')}function ze(d){$=d.target.value}function ke(){R=!1,$="",m()}function pt(){ae("edit-text",{id:u,field:"description",value:$},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(w=>{w&&(R=!1,$=""),m()})}function vt(d,w,y,M){if(d.key==="Escape"){d.stopPropagation(),y();return}d.key==="Enter"&&(!M||d.ctrlKey||d.metaKey)&&(d.preventDefault(),w())}function Vt(d){let w=d.target.value;ae("update-status",{id:u,status:w},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function p(d){let w=Number(d.target.value);ae("update-priority",{id:u,priority:w},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function v(d){Y=d.target.value}function L(){let d=Y.trim();d.length!==0&&ae("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(w=>{w&&(Y=""),m()})}function ee(d){if(d.key==="Escape"){d.stopPropagation(),Y="",m();return}d.key==="Enter"&&(d.preventDefault(),L())}function ue(d){ae("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>m())}let be={onCopyPath:Re,onOpenDoc:gt},ce={onChange:F,onImplTargetChange:V};function qe(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function se(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ke(d){let y=(Array.isArray(d.dependencies)?d.dependencies:[]).map(M=>({id:qe(M),icon:se(M)})).filter(M=>M.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${y.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${y.map(M=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(M.id)}
                  >
                    ${M.icon?`${M.icon} `:""}${M.id}
                  </button>`:c`<span class="detail-dep"
                    >${M.icon?`${M.icon} `:""}${M.id}</span
                  >`)}
          </div>`}
    `}function Pt(d){let w=d.metadata||{},y=d.workflow||{},M=y.stages||{},J=M.spec&&M.spec.stale,$e=M.impl&&M.impl.stale,ut=M.plan||null,Be=y.route_source==="derived",or=y.route||w.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Be?" detail-kv__v--derived":""}"
          title=${Be?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Be?"unset":or}</span
        >
      </div>
      ${y.route!=="quick_fix"||Object.hasOwn(w,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${w.spec_review||"\uC5C6\uC74C"}${J?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${y.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${ut?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${ut?.approval_receipt||"\uC5C6\uC74C"}${ut?.approval_state==="stale"?" \xB7 stale":ut?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${y.route!=="quick_fix"||Object.hasOwn(w,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${w.impl_review||"\uC5C6\uC74C"}${$e?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${w.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${w.pr_url}</span>
          </div>`:""}
    `}let ht={route:["quick_fix","spec_backed","full_plan"]};async function ft(d,w){let y=w.target.value;if(d==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&y!=="full_plan"&&!window.confirm(`full_plan \u2192 ${y||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){m();return}await ae("update-workflow-meta",{id:u,key:d,value:y},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),m()}function wt(d){let w=d.metadata||{};return c` ${((M,J)=>{let $e=ht[M],ut=typeof w[M]=="string"?w[M]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${M}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${M}
          data-edit=${`wfmeta-${M}`}
          @change=${Be=>ft(M,Be)}
        >
          <option value="" ?selected=${!$e.includes(ut)}>
            ${J}
          </option>
          ${$e.map(Be=>c`<option value=${Be} ?selected=${ut===Be}>${Be}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function pe(d,w){return T?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${U}
            @input=${Ee}
            @keydown=${y=>vt(y,rt,je,!1)}
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
              @click=${je}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${d}</h2>
        ${mt(w).map(y=>c`<span class="detail-usage-total" title=${y.tooltip}
              >${y.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${we}
        >
          ✎
        </button>
      </div>
    `}function b(d){let w=Tt(d.created_at),y=Tt(d.updated_at);return!w&&!y?c``:c`
      ${w?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${w}</span>
          </div>`:""}
      ${y?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${y}</span>
          </div>`:""}
    `}function W(d,w){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Vt}
        >
          ${ep.map(y=>c`<option value=${y} ?selected=${y===d}>${y}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${p}
        >
          ${tp.map(y=>c`<option value=${String(y)} ?selected=${y===w}>
                P${y}
              </option>`)}
        </select>
      </div>
    `}function z(d){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${R?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${xe}
            >
              ✎
            </button>`}
      </div>
      ${R?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${$}
              @input=${ze}
              @keydown=${w=>vt(w,pt,ke,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${pt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${ke}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${d||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function he(d){let w=typeof d.notes=="string"?d.notes:"";return w.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${w}</div>
    `}function Ze(d){let w=Array.isArray(d.labels)?d.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${w.map(y=>c`<span class="detail-label-chip"
              >${y}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${y}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+y}
                @click=${()=>ue(y)}
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
            @input=${v}
            @keydown=${ee}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${L}
          >
            추가
          </button>
        </span>
      </div>
    `}function Qe(){if(!u)return c``;let d=f||{},w=String(d.id||u),y=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",M=We(),J=d.status||"open",$e=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",ut=d.description||"",Be={...d,metadata:{...d.metadata||{},..._}};return c`
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
            ${w}
          </button>
          ${pe(y,M)}
          ${W(J,$e)} ${b(d)}
          ${z(ut)}
          ${Ai(j,Se,{expanded:oe,draft:I,sending:ie,error:N})}
          ${he(d)} ${Ze(d)} ${Ke(d)}
          ${Pt(d)} ${wt(d)}
          ${$i(d,be)}
          ${bt()}
          ${Oi(Be,ce,P(),X(),re())}
          ${Bi({expanded:G,loading:ge,error:K,data:Ae},{onToggle:Ne})}
          ${qi(Te(),A,{total:M,expanded:Pe})}
        </div>
      </div>
    `}function m(){Fe(Qe(),e)}return{load(d){d!==u&&(_={},h="",Q(),me(),De()),u=d,f=null,st()},clear(){u=null,f=null,_={},h="",E=!1,Q(),me(),De(),ve.close(),H.close(),Fe(c``,e)},destroy(){dt&&(dt(),dt=null),it&&(it(),it=null),yt&&(yt(),yt=null),document.removeEventListener("keydown",It),ve.destroy(),de.parentNode&&de.parentNode.removeChild(de),H.destroy(),_e.parentNode&&_e.parentNode.removeChild(_e),u=null,f=null,h="",E=!1,me(),De(),Fe(c``,e)}}}var rp=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ji(e,t){return Ts(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function np(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function zi(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function i(x){let N=r.get();if(N)try{let I=await n("display-policy-set",{expected_revision:N.revision,policy:x(N)});l(I),I&&I.conflict&&I.policy&&(I=await n("display-policy-set",{expected_revision:I.policy.revision,policy:x(I.policy)}),l(I)),I&&I.conflict&&Z("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Z("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function l(x){x&&x.policy&&typeof x.policy=="object"&&r.set(x.policy)}function u(x){let N=r.get();if(!N)return;let I=ji(x,N)!=="shown";i(ie=>np(x,ie,I))}function f(){let x=a.trim();x.length!==0&&(a="",i(N=>N.hidden_prefixes.includes(x)?{hidden_prefixes:N.hidden_prefixes}:{hidden_prefixes:[...N.hidden_prefixes,x]}),U())}function _(x){i(N=>({hidden_prefixes:N.hidden_prefixes.filter(I=>I!==x)}))}function h(x){let N=r.get();if(!N)return;let I=N.chips[x]===!1;i(()=>({chips:{[x]:I}}))}function E(x){let N=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${N.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${N.map(I=>{let ie=ji(I,x);return c`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${ie}`}
                  data-label=${I}
                  data-state=${ie}
                  @click=${()=>u(I)}
                >
                  ${I}
                </button>`})}
            </div>`}
      </section>
    `}function T(x){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${x.hidden_prefixes.map(N=>c`<span class="display-settings__prefix">
                ${N}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${N} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>_(N)}
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
            @input=${N=>{a=String(N.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function R(x){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${rp.map(([N,I])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${N}
                  .checked=${x.chips[N]!==!1}
                  @change=${()=>h(N)}
                />
                <span>${I}</span>
              </label>`)}
        </div>
      </section>
    `}function U(){let x=r.get();Fe(c`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${O}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${x?c`${E(x)} ${T(x)}
                ${R(x)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let $=!1,Y=()=>{$=!1};o.addEventListener("close",Y),o.addEventListener("cancel",Y);let Q=null;r.subscribe&&(Q=r.subscribe(()=>{$&&U()}));function j(){$||(a="",$=!0,U(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function O(){$&&($=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:j,close:O,destroy(){$=!1,o.removeEventListener("close",Y),o.removeEventListener("cancel",Y),Q&&(Q(),Q=null),o.remove()}}}function Hi(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,f,_="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let h=typeof _=="string"?_.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function Wi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Gi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}function ns(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let i=null,l=!1;function u(){return r&&r.get()||{revision:0,exec_defaults:{}}}function f(){let C=u();return typeof C.revision=="number"?C.revision:0}function _(){let C=n?n.get():null;return!C||typeof C.revision!="number"?null:{revision:C.revision,presets:Array.isArray(C.presets)?C.presets:[]}}function h(C){n&&C&&typeof C.revision=="number"&&Array.isArray(C.presets)&&n.set({revision:C.revision,presets:C.presets})}function E(C){C&&C.queue&&r&&r.set(C.queue)}function T(){return u().runner_catalog??null}let R=null;function U(){if(R!==null)return R;let C=u().default_exec_preset_id;return typeof C=="string"&&C.length>0?C:null}async function $(C){if(!s)return;let S=_();if(!S)return;R=C||"";let k=O(C);if(D(),!k.viable){Z(k.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3);return}try{let A=await s("worker-queue-set-default-exec-preset",{preset_id:C||null,expected_queue_revision:f(),expected_preset_revision:S.revision});if(E(A),A&&A.presets&&n&&n.set(A.presets),A&&A.conflict){Z("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3);return}if(A&&A.applied){R=null,D();return}Z("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{Z("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function Y(C){i={id:C.id,name:C.name,settings:{...C.settings||{}}},N(),l=!1,D()}function Q(){i={id:null,name:"",settings:{}},l=!1,D()}function j(C){let S=C&&C.settings&&typeof C.settings=="object"?C.settings:{},k=A=>typeof S[A]=="string"?S[A]:A==="impl_runtime"&&typeof S.impl_model=="string"&&nr(T(),S.impl_model)||"";return jr({selectedOf:k,effectiveOf:k,runner_catalog:T()}).some(A=>A.groups.some(P=>P.options.some(re=>re.value===A.selected&&re.label.endsWith("(\uBE44\uD638\uD658)"))))}function O(C){if(!C)return{viable:!0,missing:!1,incompatible:!1,preset:null};let k=_()?.presets.find(P=>P.id===C);if(!k||k.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let A=k.compatible===!1||j(k);return{viable:!A,missing:!1,incompatible:A,preset:k}}function x(){let C=i?.settings.orchestration_model;return typeof C!="string"?null:nr(T(),C)}function N(){if(!i)return;let C=rs({impl_runtime:i.settings.impl_runtime||"",impl_model:i.settings.impl_model||"",impl_effort:i.settings.impl_effort||""},T(),x());for(let S of["impl_runtime","impl_model","impl_effort"])C[S]?i.settings[S]=C[S]:delete i.settings[S]}function I(C){let S=C&&C.settings&&typeof C.settings=="object"?C.settings:{},k=Ur.filter(P=>typeof S[P]=="string").length,A=Ur.filter(P=>typeof S[P]=="string").map(P=>`${eo[P]?.title||P}: ${S[P]}`);return{count:`${k}/12 \uC9C0\uC815`,choices:A.length>0?A.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function ie(C){if(!s||!window.confirm(`\u201C${C.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let S=_();if(S)try{let k=await s("exec-preset-delete",{expected_revision:S.revision,id:C.id});h(k),k&&k.conflict&&Z("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{Z("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function ye(C=!1){if(!s||!i)return;let S=_();if(!S)return;let k=C||i.id===null,A={expected_revision:S.revision,...k?{}:{id:i.id},name:i.name,settings:{...i.settings}};try{let P=await s(k?"exec-preset-create":"exec-preset-update",A);if(h(P),P&&P.conflict){l=!0,D();return}if(P&&P.applied){i=null,l=!1,D();return}Z("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{Z("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function oe(C){return c`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${ro(C.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${C.key}
        ?disabled=${C.disabled}
        @change=${S=>{if(!i)return;let k=S.target.value;k?i.settings[C.key]=k:delete i.settings[C.key],(C.key==="impl_runtime"||C.key==="impl_model"||C.key==="impl_effort"||C.key==="orchestration_model")&&N(),l=!1,D()}}
      >
        ${ts(C.groups,C.selected,to[C.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function me(){if(!i)return"";let C=P=>typeof i?.settings[P]=="string"?i.settings[P]:"",S=jr({selectedOf:C,effectiveOf:C,runner_catalog:T(),controller_runtime:x()}),k=_(),A=i.id!==null&&k!==null&&!k.presets.some(P=>P.id===i?.id);return c`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${i.name}
          data-preset-name
          @input=${P=>{i&&(i.name=P.target.value,l=!1)}}
        />
      </label>
      ${l?c`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${A?c`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      ${S.map(oe)}
      <div class="exec-preset-editor__actions">
        ${A?c`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{ye(!0)}}
            >
              새 프리셋으로 저장
            </button>`:c`<button
              type="button"
              data-preset-save
              @click=${()=>{ye(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{i=null,l=!1,D()}}
        >
          취소
        </button>
      </div>
    </div>`}function Oe(){let C=_(),S=C?C.presets.filter(k=>k?.migration_pending!==!0):[];return c`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${Q}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${C===null?c`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:S.length===0?c`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:S.map(k=>{let A=I(k),P=typeof k.reference_count=="number",re=P?k.reference_count:null,X=Array.isArray(k.reference_summary)?k.reference_summary.map(le=>le?.display_name||le?.workspace_key).filter(Boolean).join(", "):"";return c`<article
                class="exec-preset-card"
                data-preset-id=${k.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${k.name}</strong>
                  <span>${A.count}</span>
                  <span data-preset-references=${k.id}
                    >${P?`\uCC38\uC870 ${re}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${j(k)?c`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${A.choices}</small>
                  ${X?c`<small data-preset-impact=${k.id}
                        >업데이트 영향: ${X}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  <button
                    type="button"
                    data-preset-edit=${k.id}
                    @click=${()=>Y(k)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${k.id}
                    ?disabled=${re===null||re>0||k.reference_scan_complete===!1}
                    title=${re===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":re>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":k.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{ie(k)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${me()}
    </section>`}function Je(){let C=_(),S=C?C.presets.filter(X=>X?.migration_pending!==!0):[],k=U()||"",A=O(k),P=A.preset,re=P?I(P):null;return c`<section class="exec-defaults__workspace" data-workspace-preset>
      <h3>현재 워크스페이스 기본 프리셋</h3>
      <p class="exec-defaults__hint">
        이 워크스페이스는 프리셋 하나를 참조합니다. 없음은 harness 기본값을
        사용합니다.
      </p>
      <select
        class="exec-defaults__sel"
        data-workspace-preset-select
        aria-label="워크스페이스 기본 프리셋"
        .value=${k}
        ?disabled=${C===null}
        @change=${X=>{$(X.target.value)}}
      >
        <option value="" ?selected=${k===""}>
          없음 — harness 기본값
        </option>
        ${k&&A.missing?c`<option value=${k} ?selected=${!0}>
              ${k} (선택한 프리셋 없음)
            </option>`:""}
        ${S.map(X=>c`<option
              value=${X.id}
              ?selected=${X.id===k}
              ?disabled=${X.compatible===!1}
            >
              ${X.name}${X.compatible===!1?" (\uBE44\uD638\uD658)":""}
            </option>`)}
      </select>
      ${P?c`<p data-workspace-preset-summary>
            ${re?.count} · ${re?.choices}
            ${A.incompatible?" \xB7 \uBE44\uD638\uD658":""}
          </p>`:""}
      ${A.missing?c`<p data-workspace-preset-missing>
            선택한 프리셋을 찾을 수 없습니다. 실행이 차단됩니다.
          </p>`:A.incompatible?c`<p data-workspace-preset-incompatible>
              선택한 프리셋이 비호환입니다. 실행이 차단됩니다.
            </p>`:""}
    </section>`}function et(){let C=u().workspace_info;return C&&typeof C=="object"?C:{}}function Ie(C,S){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${C}"
      >${S}</span
    >`}function Ve(C){let S=C?Gi(C.cmd):"",k=C?Wi(C.timeout_ms):"",A=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${S?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${S}</span>
            ${Ie("config","config")}
            ${k?c`<span class="exec-defaults__vd-meta"
                  >timeout ${k}</span
                >`:""}
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${A}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function Se(C){let S=C?Gi(C.cmd):"",k=C?Wi(C.timeout_ms):"",A=k?`timeout ${k} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",P=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${S?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${S}</span>
            ${Ie("config","config")}
            ${C.detached===!0?Ie("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${A}</span>
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${P}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}let de=!1,ve=!1,_e=!1,H=null;async function G(){if(s){ve=!0,_e=!1,D();try{let C=await Promise.resolve(s("get-worker-system-prompt",{}));!C||typeof C!="object"||Array.isArray(C)?_e=!0:H=C}catch{_e=!0}finally{ve=!1,D()}}}function ge(){if(de=!de,de&&!H){G();return}D()}function K(){return c`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${de?"true":"false"}
          @click=${ge}
        >
          ${de?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${de?Ae():""}
    </section>`}function Ae(){let C=qr({loading:ve,error:_e});if(C)return C;if(!H)return"";let S=Array.isArray(H.variants)?H.variants:[];return c`<div class="exec-defaults__sp-body">
      ${H.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${H.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${S.map(k=>c`<div class="exec-defaults__sp-variant" data-variant=${k.key}>
            <div class="exec-defaults__sp-cond">${k.condition}</div>
            ${rr(k.label,k.system_prompt)}
          </div>`)}
    </div>`}function B(C){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${Ve(C.verify_cmd)} ${Se(C.deploy_cmd)}
    </section>`}function D(){if(Fe(c`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${Pe}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${Oe()} ${Je()}
            ${B(et())}
            ${K()}
          </div>
        </div>
      `,a),R!==null){let C=a.querySelector("[data-workspace-preset-select]");C&&(C.value=R)}}let te=!1,De=()=>{te=!1},Ce=C=>{C.target===C.currentTarget&&Pe()};a.addEventListener("close",De),a.addEventListener("cancel",De),a.addEventListener("click",Ce);let Ne=null;r&&r.subscribe&&(Ne=r.subscribe(()=>{te&&D()}));let Te=null;n&&n.subscribe&&(Te=n.subscribe(()=>{te&&D()}));function We(){te||(te=!0,D(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function Pe(){te&&(te=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:We,close:Pe,destroy(){te=!1,a.removeEventListener("close",De),a.removeEventListener("cancel",De),a.removeEventListener("click",Ce),Ne&&(Ne(),Ne=null),Te&&(Te(),Te=null),a.remove()}}}function zr(e){let t=Ct(e.created_at),r=Ct(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Tt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${Tt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function sp(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function fn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ss(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Gt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,_)=>(f.requested_at||0)-(_.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?sp(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:u}}function sr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?c`<code>백업: ${n}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}function ao(e){let t=e.draggable&&!e.done,r=t&&e.lane==="queue",n=Array.isArray(e.badges)?e.badges:[],s=mt(e.usage),o=qt(e.usage),a=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action,l=e.lane==="done"&&!i,u=l?Ct(e.done_at):"",f=e.selectable?c`<input
        class="worker-mini__select"
        type="checkbox"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC120\uD0DD`}
        .checked=${e.selected===!0}
      />`:"",_=r?c`<button
        type="button"
        class="worker-mini__grip"
        draggable="true"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC21C\uC11C \uBCC0\uACBD`}
        title="순서 변경"
      >
        ⠿
      </button>`:t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",h=e.worker_serial===!0?c`<span class="worker-mini__serial">머지까지 단독</span>`:e.worker_serial===null?c`<span class="worker-mini__serial worker-mini__serial--unknown"
            >실행 방식 확인 중</span
          >`:"",E=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",T=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,R=c`<span class="worker-mini__title">${e.title}</span>`,U=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",$=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",Y=n.map(me=>me===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${me}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${me===e.completion_badge&&e.completion_title||""}
          >${me}</span
        >`),Q=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",j=s.length>0?s.map(me=>c`<span class="worker-usage" title=${me.tooltip}
              >${me.label}</span
            >`):o?c`<span class="worker-usage" title=${Fr(e.usage)}
            >${o}</span
          >`:"",O=a?c`<span class="merge-step"
        >${a.label}<span class="merge-step__n"
          >${a.index}/${a.total}</span
        ></span
      >`:"",x=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",N=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",I=e.discard,ie=I?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${I?.attempt_id||""}
          data-operation-id=${I?.operation?.operation_id||""}
          data-discard-mode=${I?.confirmation||"unmerged"}
          ?disabled=${I?!I.enabled:e.discard_enabled===!1}
          title=${I?I.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${I?.label||"\uD3D0\uAE30"}
        </button>`:"",ye=e.revise_action?c`<button
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
        </button>`:"",oe=!!(o||a||e.merge_action||e.cancel_action||e.discard_action||I?.operation||e.revise_action);return c`<div
    class="worker-mini${i?" worker-mini--card":""}${e.selected?" worker-mini--selected":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${a?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${a?`--progress: ${a.percent}%`:""}
    draggable=${t&&!r?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?c`<div class="worker-mini__row1">${E}${T}${R}</div>
          <div class="worker-mini__row2">
            ${j}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Tt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${Y}${O}
            <span class="worker-mini__actions"
              >${x}${N}${ie}</span
            >
            ${zr(e)}
          </div>`:i?c`<div class="worker-mini__head">
              ${f}${_}${E}${T}${U}${$}${Y}${h}${Q}
            </div>
            <div class="worker-mini__body">${R}</div>
            ${oe?c`<div class="worker-mini__foot">
                  ${j}${O}
                  <span class="worker-mini__actions"
                    >${x}${N}${ie}${ye}</span
                  >
                  ${sr(e)}
                </div>`:""}
            ${zr(e)}`:c`<div class="worker-mini__line">
              ${f}${_}${E}${T}${R}${U}${$}${Y}${h}${Q}${j}${O}${x}${N}${ie}
            </div>
            ${sr(e)} ${zr(e)}`}
  </div>`}function op(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
    class="worker-card${t?"":" worker-card--static"}"
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${t?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r&&s?c`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${o?"unset":s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?Pn(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?c`<span
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
  </div>`}function Yt(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?c`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:c`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?op(n):ao(n))}
          </div>`}
  </section>`}var Yi=160;function Vi(e){return e.length>Yi?`${e.slice(0,Yi)}\u2026`:e}function ap(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${Vi(e.command)}</code>`:""}
  </div>`}function ip(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function lp(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function cp(e){if(!e||typeof e!="object")return"";let r={pending:"\uBC30\uD3EC \uB300\uAE30",running:"\uBC30\uD3EC \uC911",succeeded:"\uBC30\uD3EC \uC644\uB8CC",failed:"\uBC30\uD3EC \uC2E4\uD328"}[e.state],n=typeof e.target_sha=="string"&&/^[0-9a-f]{40}$/i.test(e.target_sha)?e.target_sha.slice(0,8):null;if(!r||!n)return"";let s=Array.isArray(e.covered_pr_numbers)?e.covered_pr_numbers.filter(Number.isInteger):[],o=e.state==="failed",a=typeof e.log_path=="string"?e.log_path:null;return c`<section
    class="worker-deployment-strip${o?" worker-deployment-strip--failed":""}"
    aria-label="레포 배포 상태"
  >
    <span class="worker-deployment-strip__sha">${n}</span>
    <b>${r}</b>
    ${s.length>0?c`<span class="worker-deployment-strip__prs"
          >${s.map(i=>`#${i}`).join(", ")}</span
        >`:""}
    ${o&&typeof e.error_code=="string"?c`<span class="worker-deployment-strip__error"
          >${e.error_code}</span
        >`:""}
    ${a?c`<a
          href=${`file://${a}`}
          class="worker-deployment-strip__log"
          >로그</a
        >`:""}
    ${o?c`<button type="button" class="worker-deployment-retry">
          배포 재시도
        </button>`:""}
  </section>`}function io(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Ki(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
    ${cp(e.deployment)}
    ${e.failure?c`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${e.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
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
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${ap(e.failure.cause_detail)}
          ${sr({discard:e.failure.discard})}
        </div>`:""}
    ${t.map(r=>c`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}).
          ${typeof r.retry_count=="number"&&Number.isInteger(r.retry_count)&&r.retry_count>0?c`${r.retry_count}회 자동 재시도 후에도 실패했습니다 — `:""}정리를
          사람이 마무리하세요.
          ${r.detail?c`<div class="worker-banner__detail">
                <code>${Vi(r.detail)}</code>
              </div>`:""}
          ${lp(r.log_path)} ${ip(r.output_tail)}
        </div>`)}
  </div>`}function dp(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?io(t-e.started_at):"\u2014",a=Wt(e),i=dr(e),l=mt(e.usage),u=qt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,h=e.attempt_id&&e.attempt_id===r,E=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${h?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${i?c`<span class="rtile__resumed" title=${i}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?c`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${E}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 기록 닫기"
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
            ${s?c`<button
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
            ${E}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?c`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||l.length>0||u||f||_?c`<div class="rtile__meta">
          ${f?c`<span class="worker-mini__badge">${f}</span>`:""}
          ${_?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${_}</span
              >`:""}
          ${a?c`<span class="rtile__runner">${a}</span>`:""}
          ${l.length>0?l.map(T=>c`<span class="worker-usage" title=${T.tooltip}
                    >${T.label}</span
                  >`):u?c`<span
                  class="worker-usage"
                  title=${Fr(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${zr(e)} ${sr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function lo(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>dp(s,t,r))}
  </div>`}function mr(e){return c`<svg
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
  </svg>`}function co(){return mr(Zt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function uo(){return mr(Zt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Zi(){return mr(Zt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Xi(){return mr(Zt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Qi(){return mr(Zt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Ji(){return mr(Zt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function el(){return mr(Zt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function tl(){return mr(Zt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var _n=1,up=6e4,pp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},fp=new Set(["auto_merge","merged","merge","done"]),rl={running:3,paused:2,failed:1};function _p(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function mp(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),h=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let _=rl[u.run_state],h=rl[i];if(_>h||_===h&&(u.started_at??0)>(l??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Dt(e,a.bead_id),can_pause:i==="running"&&f,can_resume:i!=="running"&&f&&!n.has(a.attempt_id)})}return o}function nl(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Rt(e){return e&&typeof e=="object"?e:{}}function po(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let $ of s)$&&typeof $.root_dir=="string"&&a.set($.root_dir,$);let i=[],l=[],u=[],f=[],_=[],h=new Map;for(let $ of n){if(!$||typeof $.root_dir!="string")continue;let Y=$.root_dir,Q=$.name||Y,j=a.get(Y),O=j&&typeof j.revision=="number"?j.revision:typeof $.revision=="number"?$.revision:0,x=Rt($.attempts),N=Rt($.bead_titles),I=Rt($.pr_observations),ie=Rt($.admission),ye=Rt($.revise_parked),oe=Rt($.merge_queue_state),me=Rt($.cleanup_failed),Oe=Rt($.discard_operations),Je=Array.isArray($.merge_queue)?$.merge_queue:[],et=new Set(Je.filter(H=>H&&typeof H.bead_id=="string").map(H=>H.bead_id)),Ie=new Map(Je.filter(H=>H&&typeof H.bead_id=="string").map(H=>[H.bead_id,H])),Ve=Array.isArray($.queue)?$.queue:[],Se=Array.isArray($.done)?$.done:[],de=new Map;for(let H of Se)H&&typeof H.bead_id=="string"&&typeof H.added_at=="number"&&de.set(H.bead_id,H.added_at);let ve=H=>({id:H,title:N[H]||H,root_dir:Y,workspace_name:Q,expected_revision:O,draggable:!1}),_e=new Set;for(let[H,G]of mp(x,de))_e.add(H),l.push({...ve(H),lane:"running",attempt_id:G.attempt_id,run_state:G.run_state,can_pause:G.can_pause,can_resume:G.can_resume,started_at:G.started_at,last_event_at:G.last_event_at,runner:G.runner,model:G.model,effort:G.effort,speed:G.speed,resumed_from:G.resumed_from,continuation_mode:G.continuation_mode,usage:G.usage,discard:Gt(Oe,H,{attempt_id:G.attempt_id}),badges:G.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:G.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:G.run_state==="failed"});for(let H of Array.isArray($.pr_wait)?$.pr_wait:[]){let G=H&&H.bead_id;if(typeof G!="string"||_e.has(G))continue;_e.add(G);let ge=Rt(I[G]),K=Rt(ge.pr),Ae=ge.gate?Rt(ge.gate):null,B=et.has(G),D=Ie.get(G)?.continuation_action||null,te=!!D&&D.continuation===null,De=oe.active===G,Ce=H.external===!0,Ne=me[G]||null,Te=!!Ae&&Ae.base_badge==="\uCDA9\uB3CC",We=!!Ne&&["child_sweep","branch_cleanup","parent_close"].includes(Ne.step)&&!!Ae&&Ae.tier==="merged",Pe=Ce&&!!Ae&&Ae.tier==="merged",C=Gt(Oe,G,{external:Ce,merge_active:De,merge_queued:B,merged:!!Ne||Ae?.tier==="merged"}),S=!!C.operation;u.push({...ve(G),lane:"pr_wait",pr_number:typeof K.number=="number"?K.number:null,pr_url:typeof K.url=="string"?K.url:void 0,external:Ce,usage:Dt(x,G),badges:te?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ne?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!Ne,reason:Ne?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!B||te,merge_enabled:!S&&(te||Ae?.enabled===!0||Te||We||Pe),merge_label:te?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Pe||We?"\uC815\uB9AC":Te&&!We?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:te?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":S?C.error?`\uD3D0\uAE30 \uC2E4\uD328: ${C.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${C.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Pe?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":We?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":Te?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Ae?.enabled===!0?`\uBA38\uC9C0 (${Ae.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${Ae?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:B&&!te,cancel_enabled:!De,continuation_mismatch:D?.mismatch||null,discard:C,discard_action:C.action,discard_enabled:C.enabled,discard_title:C.title})}for(let H=0;H<Ve.length;H++){let G=Ve[H],ge=G&&G.bead_id;if(typeof ge!="string"||_e.has(ge))continue;_e.add(ge);let K=ye[ge],Ae=Gt(Oe,ge),B=Ae.operation?Ae:null,D={...ve(ge),lane:"queue",draggable:!B,discard:B||void 0,reason:nl(ie,ge),queue_position:H+1,queue_index:H,queue_length:Ve.length,badges:K?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!K,revise_action:!!K,revise_enabled:!!K&&!B,revise_title:K?K.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${K.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(D);let te=h.get(Y);te?te.push(D):h.set(Y,[D])}for(let H of Array.isArray($.runnable)?$.runnable:[]){let G=H&&H.bead_id;typeof G!="string"||_e.has(G)||(_e.add(G),i.push({...ve(G),title:H.title||N[G]||G,lane:"runnable",draggable:!0,reason:nl(ie,G),created_at:H.created_at??void 0,updated_at:H.updated_at??void 0,labels:Array.isArray(H.labels)?H.labels:[],spec_reviewer:typeof H.spec_reviewer=="string"?H.spec_reviewer:void 0,plan_state:H.plan_state==="approved"||H.plan_state==="authored"?H.plan_state:"none",workflow:H.route?{route:H.route,chips:{route:H.route}}:null,place_index:Ve.length}))}for(let H of Se){let G=H&&H.bead_id;if(typeof G!="string"||_e.has(G)||(_e.add(G),o!==void 0&&typeof H.added_at=="number"&&H.added_at<o))continue;let ge=_p(x,G);_.push({...ve(G),lane:"done",done:!0,usage:Dt(x,G),done_at:typeof H.added_at=="number"?H.added_at:void 0,done_kind:ge&&typeof ge.done_kind=="string"?ge.done_kind:null})}}let E=new Map;s.forEach(($,Y)=>{$&&typeof $.root_dir=="string"&&E.set($.root_dir,Y)});let T=r&&r.running_sort==="repo"?"repo":"started";l.sort(($,Y)=>{if(T==="repo"){let O=E.get($.root_dir)??Number.MAX_SAFE_INTEGER,x=E.get(Y.root_dir)??Number.MAX_SAFE_INTEGER;if(O!==x)return O-x}let Q=typeof $.started_at=="number"&&Number.isFinite($.started_at)?$.started_at:null,j=typeof Y.started_at=="number"&&Number.isFinite(Y.started_at)?Y.started_at:null;return Q!==null&&j!==null&&Q!==j?Q-j:Q===null&&j!==null?1:Q!==null&&j===null?-1:$.id.localeCompare(Y.id)}),_.sort(($,Y)=>(Y.done_at??0)-($.done_at??0));let R=s.length>0?s:n.map($=>({root_dir:$&&$.root_dir,name:$&&$.name,auto_advance:$&&$.auto_advance,auto_merge:$&&$.auto_merge,slots:$&&$.slots,revision:$&&$.revision,exec_defaults:$&&$.exec_defaults,default_exec_preset_id:$&&$.default_exec_preset_id,runner_catalog:$&&$.runner_catalog})),U=[];for(let $ of R)!$||typeof $.root_dir!="string"||U.push({root_dir:$.root_dir,name:$.name||$.root_dir,auto_advance:$.auto_advance===!0,auto_merge:$.auto_merge===!0,slots:typeof $.slots=="number"&&$.slots>=_n?$.slots:_n,revision:typeof $.revision=="number"?$.revision:0,exec_defaults:Rt($.exec_defaults),default_exec_preset_id:typeof $.default_exec_preset_id=="string"?$.default_exec_preset_id:null,runner_catalog:Rt($.runner_catalog),items:h.get($.root_dir)||[]});return{runnable:i,queue:f,queue_groups:U,running:l,pr_wait:u,done:_,automation:{total:U.length,both_on:U.filter($=>$.auto_advance&&$.auto_merge).length}}}function gp(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<up;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Tt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${Ct(e,t)}</span
        >`}</span
  >`}function mn(e){return c`<div class="mon-c__title">${e.title}</div>`}function gn(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function os(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function fo(e){let t=mt(e.usage),r=qt(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${Fr(e.usage)}
        >${r}</span
      >`:""}function _o(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function hp(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${uo()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${co()}
        </button>`}
    ${e.discard?.action?c`<button
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
    ${e.run_state==="failed"?c`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${Xi()}
        </button>`:""}
  </span>`}function bp(e,t){let r=typeof e.started_at=="number"?io(t-e.started_at):"";return c`${mn(e)}
    <div class="mon-c__meta">
      ${_o(e)}${gp(e.last_event_at,t)}${gn(e)}${os(e)}
      ${Wt(e)?c`<span class="mon-c__model">${Wt(e)}</span>`:""}
      ${dr(e)?c`<span
            class="rtile__resumed"
            title=${dr(e)}
            >↻</span
          >`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${fo(e)}${hp(e)}${sr(e)}
    </div>`}function yp(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Ct(e.updated_at);return c`${mn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${gn(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?c`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?c`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Mn(e.labels,null).map(l=>c`<span class="ctl-chip ctl-chip--label">${l}</span>`)}
      ${os(e)}
      ${i?c`<span title=${`\uC218\uC815 ${Tt(e.updated_at)}`}
            >수정 ${i}</span
          >`:""}
      ${e.reason?c`<span
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
    </div>`}function vp(e){let t=!!e.discard?.operation;return c`${mn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${gn(e)}
      ${_o(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
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
        ${t?c`<button
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
    ${sr(e)}
    ${e.revise_action?c`<div class="mon-c__tail">
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
        </div>`:""}`}function wp(e){let t=!!(qt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${mn(e)}
    <div class="mon-c__meta">
      ${gn(e)}${os(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${_o(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?c`<div class="mon-c__tail">
          ${fo(e)}
          ${e.merge_action?c`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?c`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?c`<button
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
          ${sr(e)}
        </div>`:""}`}function kp(e,t){let r=e.done_kind||"",n=r?pp[r]||r:"",s=Ct(e.done_at,t);return c`${mn(e)}
    <div class="mon-c__meta">
      ${gn(e)}${os(e)}
      ${n?c`<span
            class="mon-live__kind${fp.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${fo(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${Tt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function sl(e,t){return e.lane==="running"?bp(e,t):e.lane==="runnable"?yp(e):e.lane==="queue"?vp(e):e.lane==="pr_wait"?wp(e):kp(e,t)}function ol(e){let t=String(e.revision);return c`<header
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
        title=${e.auto_advance?"\uC790\uB3D9 \uC9C4\uD589 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA48\uCDA5\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uB300\uAE30 \uD050\uB97C \uB514\uC2A4\uD328\uCE58\uD569\uB2C8\uB2E4"}
      >
        ${e.auto_advance?uo():co()}
        <span class="mon-ctl__label">진행</span>
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
        ${Qi()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Ji()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${_n}
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
        ${el()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function al(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Ht.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Zi():tl()}
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
        ${Ht.map(i=>c`<option
              value=${i.value}
              ?selected=${e.done_range===i.value}
            >
              ${i.label}
            </option>`)}
      </select>
      ${a.map(i=>c`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${i.tooltip}
            >${o} 완료 · 누적 ${i.label}</span
          >`)}
    </div>
  </div>`}function il(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function ll(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return mt(qn(t));let r={};for(let i of Jt)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let f of Jt){let _=l[f];typeof _=="number"&&Number.isFinite(_)&&(r[f]+=_,n=!0,u=!0)}if(u){o+=1;let f=l.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?qt(r):null}var dl="bdui.monitor.done-range",ul="bdui.monitor.running_sort";function $p(){try{let e=window.localStorage.getItem(dl);return Ot(e)?e:Et}catch{return Et}}function xp(e){try{window.localStorage.setItem(dl,e)}catch{}}function Sp(){try{return window.localStorage.getItem(ul)==="repo"?"repo":"started"}catch{return"started"}}function Ap(e){try{window.localStorage.setItem(ul,e)}catch{}}var pl="tab:monitor:pipeline",Tp=1e3,Ep=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function cl(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return c`<div
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
    ${sl(e,t)}
  </div>`}function fl(e,t){let r=ot("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,i=t.getWorkspacePath,l=t.switchWorkspace,u=t.now||(()=>Date.now()),f=t.confirm||(S=>typeof globalThis.confirm!="function"||globalThis.confirm(S)),_=$p(),h=Sp();function E(){let S=Ht.find(k=>k.value===_);return S?S.label:""}let T=document.createElement("div");T.className="mon",e.appendChild(T);let R=po(null,null),U=null,$=new Map,Y=new Set;function Q(S){return R.queue_groups.find(k=>k.root_dir===S)||null}let O=ns(e,{queueStore:{get(){if(!U)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let S=$.get(U);if(S)return S;let k=Q(U),A=s&&s.get?s.get():null,P=(Array.isArray(A)?A:[]).find(re=>re&&re.root_dir===U);return{revision:k?k.revision:0,exec_defaults:k?k.exec_defaults:{},default_exec_preset_id:k?k.default_exec_preset_id:null,runner_catalog:k?k.runner_catalog:null,workspace_info:P?P.workspace_info:void 0}},set(S){U&&$.set(U,S);for(let k of Array.from(Y))k()},subscribe(S){return Y.add(S),()=>Y.delete(S)}},presetStore:a,transport:o?(S,k)=>o(S,S==="worker-queue-set-default-exec-preset"||S==="get-worker-system-prompt"?{...k||{},root_dir:U}:k):void 0,getWorkspacePath:()=>U||void 0}),x=null,N=null;async function I(S,k,A,P,re=!0){if(!o||!A)return null;let X=await o(S,{...k,root_dir:A,expected_revision:P});if(X&&X.conflict&&re){X.queue&&$.set(A,X.queue);let le=X.queue&&typeof X.queue.revision=="number"?X.queue.revision:P;X=await o(S,{...k,root_dir:A,expected_revision:le})}return X&&X.queue&&A&&$.set(A,X.queue),X}function ie(S,k){let A=$.get(S),P=s&&s.get?s.get():null,re=(Array.isArray(P)?P:[]).find(le=>le?.root_dir===S);return(A||re)?.merge_queue?.find(le=>le.bead_id===k)?.continuation_action}async function ye(S,k,A,P){let re=await I(S,k,A,P),X=$.get(A)?.revision??re?.queue?.revision??P;return Qt(re,(le,Le)=>I(S,{...k,continuation:le,decision_token:Le},A,X,!1),{refresh:le=>I(S,k,A,le?.queue?.revision??$.get(A)?.revision??X,!1)})}async function oe(S,k,A,P){let re=await Qt({continuation_mismatch:P},(le,Le)=>I("worker-merge-queue-add",{bead_id:k,continuation:le,decision_token:Le},S,A,!1)),X=re?.queue?.merge_queue?.find(le=>le.bead_id===k)?.continuation_action;re?.applied!==!0&&X?.continuation===null&&X.mismatch&&await oe(S,k,re.queue.revision,X.mismatch)}async function me(S,k,A){let P=await I("worker-discard",S,k,A);if(P&&P.discarded===!0){Z(ss(P),"success",5e3);return}if(P&&P.reason){Z(`\uD3D0\uAE30 \uC2E4\uD328: ${P.reason}`,"error");return}if(P&&P.accepted&&P.pending==="merged_revert"){Z("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(P&&P.accepted){Z(`\uD3D0\uAE30 \uC9C4\uD589: ${P.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}P&&!P.conflict&&Z("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Oe(S,k,A){return!o||!A?null:await o(S,{...k,root_dir:A})}async function Je(S){if(!o||!S&&!f("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let k=await o("monitor-auto-toggle",{on:S}),A=k&&Array.isArray(k.failed)?k.failed:[];A.length>0&&Z(`\uC790\uB3D9\uD654 ${S?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${A.map(P=>P.root_dir).join(", ")}`,"error",3200)}async function et(){let S=new Map;for(let k of R.pr_wait)S.has(k.root_dir)||S.set(k.root_dir,k.expected_revision);for(let[k,A]of S)await I("worker-merge-queue-add-all",{},k,A)}let Ie=null,Ve=!1,Se=null;function de(){Se!==null&&clearTimeout(Se),Se=setTimeout(()=>{Se=null,Ve=!1},0)}function ve(S){let k=S.target;return typeof k?.closest=="function"?k.closest(".mon-group"):null}function _e(S){let k=ve(S);return!k||!Ie?null:(k.getAttribute("data-root-dir")||"")===Ie.root_dir?k:null}function H(){for(let S of Array.from(T.querySelectorAll(".mon-group--drag-over")))S.classList.remove("mon-group--drag-over")}function G(S){let k=S.target,A=typeof k?.closest=="function"?k.closest('.mon-card[draggable="true"]'):null;if(A){Ie={bead_id:A.getAttribute("data-issue-id")||"",lane:A.getAttribute("data-lane")||"",root_dir:A.getAttribute("data-root-dir")||"",revision:Number(A.getAttribute("data-revision")||0)||0,queue_index:Number(A.getAttribute("data-queue-index")),queue_length:Number(A.getAttribute("data-queue-length")),place_index:Number(A.getAttribute("data-place-index"))},Ve=!0;try{S.dataTransfer?.setData("text/plain",Ie.bead_id),S.dataTransfer&&(S.dataTransfer.effectAllowed="move")}catch{}}}function ge(S){let k=_e(S);k&&(S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect="move"),k.classList.add("mon-group--drag-over"))}function K(S){ve(S)?.classList.remove("mon-group--drag-over")}function Ae(){Ie=null,H(),de()}function B(S){let k=_e(S),A=Ie;if(Ie=null,H(),!k||!A||!A.bead_id)return;S.preventDefault();let P=S.target,re=typeof P?.closest=="function"?P.closest('.mon-card[data-lane="queue"]'):null,X=re&&k.contains(re)?Number(re.getAttribute("data-queue-index")):NaN;if(A.lane==="runnable"){let tt=Number.isFinite(X)?X:A.place_index;if(!Number.isFinite(tt))return;I("worker-queue-place",{bead_id:A.bead_id,index:tt},A.root_dir,A.revision);return}if(A.lane!=="queue"||re&&re.getAttribute("data-issue-id")===A.bead_id)return;let le=A.queue_index,Le=Number.isFinite(X)?le>X?X:X-1:A.queue_length-1;!Number.isFinite(Le)||Le<0||Le===le||I("worker-queue-reorder",{bead_id:A.bead_id,to_index:Le},A.root_dir,A.revision)}function D(S){let k={runnable:R.runnable,queue:R.queue,running:R.running,pr_wait:R.pr_wait,done:R.done};return c`${al({automation:R.automation,counts:{running:R.running.length,queue:R.queue.length,pr_wait:R.pr_wait.length},running_sort:h,done_range:_,token_total:ll(R.done),token_tooltip:il(E())})}
      <div class="worker-lanes mon-lanes">
        ${Ep.map(A=>{let P=k[A.lane],re=A.lane==="queue"?R.queue_groups.length>0?c`${R.queue_groups.map(X=>c`<div
                        class="mon-group"
                        data-root-dir=${X.root_dir}
                      >
                        ${ol(X)}
                        <div class="mon-group__list">
                          ${X.items.map(le=>cl(le,S))}
                        </div>
                      </div>`)}`:void 0:P.length>0?c`${P.map(X=>cl(X,S))}`:void 0;return Yt({id:`monitor-${A.lane}`,lane:A.pane,title:A.lane==="done"?`\uC644\uB8CC\xB7${E()}`:A.title,items:P,empty:A.empty,body:re,live:A.lane==="running"&&P.length>0,header_control:A.lane==="pr_wait"&&P.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function te(){let S=s&&s.get?s.get():null,k=s&&s.getWorkspacesState?s.getWorkspacesState():[],A=u();R=po(S,k,{done_since:$r(_,A),running_sort:h}),Fe(D(A),T)}function De(S,k){let A=i?i():void 0;if(!k||!A||k===A||!l){n(S);return}l(k).then(()=>{n(S)}).catch(P=>{r("workspace switch for %s failed: %o",k,P)})}function Ce(S){return{root_dir:S.getAttribute("data-root-dir")||"",revision:Number(S.getAttribute("data-revision")||0)||0}}function Ne(S,k){let{root_dir:A,revision:P}=Ce(S),re=S.getAttribute("data-issue-id")||"",X=k.dataset.attemptId||S.getAttribute("data-attempt-id")||"",le=k.classList;if(le.contains("worker-card__place")){I("worker-queue-place",{bead_id:re,index:Number(S.getAttribute("data-place-index")||0)||0},A,P);return}if(le.contains("mon-op--up")||le.contains("mon-op--down")){let Le=Number(S.getAttribute("data-queue-index")||0)||0,tt=le.contains("mon-op--up")?Le-1:Le+1;if(tt<0)return;I("worker-queue-reorder",{bead_id:re,to_index:tt},A,P);return}if(le.contains("mon-op--remove")){I("worker-queue-remove",{bead_id:re},A,P);return}if(le.contains("mon-op--pause")){Oe("worker-attempt-pause",{attempt_id:X},A);return}if(le.contains("mon-op--discard")){if(!f(fn(re,"unmerged")))return;me({bead_id:re,...X?{attempt_id:X}:{},...k.dataset.operationId?{operation_id:k.dataset.operationId}:{}},A,P);return}if(le.contains("mon-op--resume")){ye("worker-attempt-resume",{attempt_id:X},A,P);return}if(le.contains("mon-op--dismiss")){I("worker-attempt-dismiss",{attempt_id:X},A,P);return}if(le.contains("worker-mini__merge")){let Le=ie(A,re);Le?.mismatch&&Le.continuation===null?oe(A,re,P,Le.mismatch):I("worker-merge-queue-add",{bead_id:re},A,P);return}if(le.contains("worker-mini__merge-cancel")){I("worker-merge-queue-remove",{bead_id:re},A,P);return}if(le.contains("worker-mini__discard")){let Le=k.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(fn(re,Le)))return;me({bead_id:re,...X?{attempt_id:X}:{},...k.dataset.operationId?{operation_id:k.dataset.operationId}:{}},A,P);return}if(le.contains("worker-mini__revise-fix")){ye("worker-revise-fix",{bead_id:re},A,P);return}le.contains("worker-mini__revise-approve")&&I("worker-revise-approve",{bead_id:re},A,P)}function Te(S){let k=Ve;Ve=!1;let A=S.target;if(!A||typeof A.closest!="function"||A.closest("dialog")||A.closest("a"))return;let P=A.closest(".mon-running-sort");if(P){S.preventDefault(),h=P.getAttribute("data-sort")==="repo"?"repo":"started",Ap(h),te();return}let re=A.closest(".mon-auto-all");if(re){S.preventDefault(),Je(re.getAttribute("data-on")==="true");return}if(A.closest(".mon-merge-all")){S.preventDefault(),et();return}let le=A.closest(".mon-ctl--advance");if(le){S.preventDefault();let{root_dir:dt,revision:it}=Ce(le);I("worker-queue-toggle",{on:le.getAttribute("data-on")==="true"},dt,it);return}let Le=A.closest(".mon-ctl--merge-auto");if(Le){S.preventDefault();let{root_dir:dt,revision:it}=Ce(Le);I("worker-merge-auto-toggle",{on:Le.getAttribute("data-on")==="true"},dt,it);return}let tt=A.closest(".mon-ctl--exec");if(tt){S.preventDefault(),U=tt.getAttribute("data-root-dir")||null,$.delete(U||""),O.open();return}let at=A.closest(".mon-card");if(!at)return;let Ye=A.closest("button");if(Ye){S.preventDefault(),Ne(at,Ye);return}let bt=at.getAttribute("data-issue-id");bt&&!k&&(S.preventDefault(),De(bt,at.getAttribute("data-root-dir")||""))}function We(S){let k=S.target;if(!k||typeof k.closest!="function")return;let A=k.closest(".mon-done-range");if(A){_=Ot(A.value)?A.value:Et,xp(_),te();return}let P=k.closest(".mon-slots__input");if(!P)return;let{root_dir:re,revision:X}=Ce(P),le=Number(P.value);if(!Number.isFinite(le))return;let Le=Math.max(_n,Math.floor(le));I("worker-queue-set-slots",{slots:Le},re,X)}e.addEventListener("click",Te),e.addEventListener("change",We),e.addEventListener("dragstart",G),e.addEventListener("dragover",ge),e.addEventListener("dragleave",K),e.addEventListener("drop",B),e.addEventListener("dragend",Ae),s&&typeof s.subscribe=="function"&&(x=s.subscribe(()=>{try{$.clear(),te();for(let S of Array.from(Y))S()}catch{}}));function Pe(){N!==null&&(clearInterval(N),N=null)}function C(){Se!==null&&(clearTimeout(Se),Se=null)}return{load(){r("load"),te(),N===null&&(N=setInterval(()=>{try{te()}catch{}},Tp))},pause(){Pe()},clear(){Pe(),C(),x&&(x(),x=null),e.removeEventListener("click",Te),e.removeEventListener("change",We),e.removeEventListener("dragstart",G),e.removeEventListener("dragover",ge),e.removeEventListener("dragleave",K),e.removeEventListener("drop",B),e.removeEventListener("dragend",Ae),O.destroy(),Y.clear(),e.replaceChildren()}}}function _l(e,t,r){let n=ot("views:nav"),s=null;function o(l){return u=>{u.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),u=l.view==="worker"||l.view==="monitor"?l.view:"board";return c`
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
    `}function i(){Fe(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Fe(c``,e)}}}var ml=["bug","feature","task","epic","chore"];function gl(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var hl=["Critical","High","Medium","Low","Backlog"];function bl(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function E(){o.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",o.appendChild(O);for(let x of ml){let N=document.createElement("option");N.value=x,N.textContent=gl(x),o.appendChild(N)}a.replaceChildren();for(let x=0;x<=4;x+=1){let N=document.createElement("option");N.value=String(x);let I=hl[x]||"Medium";N.textContent=`${x} \u2013 ${I}`,a.appendChild(N)}}E();function T(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function R(O){s.disabled=O,o.disabled=O,a.disabled=O,i.disabled=O,l.disabled=O,f.disabled=O,_.disabled=O,_.textContent=O?"Creating\u2026":"Create"}function U(){u.textContent=""}function $(O){u.textContent=O}function Y(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?o.value=O:o.value="";let x=window.localStorage.getItem("beads-ui.new.priority");x&&/^\d$/.test(x)?a.value=x:a.value="2"}catch{o.value="",a.value="2"}}function Q(){let O=o.value||"",x=a.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),x.length>0&&window.localStorage.setItem("beads-ui.new.priority",x)}async function j(){U();let O=String(s.value||"").trim();if(O.length===0){$("Title is required"),s.focus();return}let x=Number(a.value||"2");if(!(x>=0&&x<=4)){$("Priority must be 0..4"),a.focus();return}let N=String(o.value||""),I=String(l.value||""),ie={title:O};N.length>0&&(ie.type=N),String(x).length>0&&(ie.priority=x),I.length>0&&(ie.description=I),R(!0);try{await t("create-issue",ie)}catch{R(!1),$("Failed to create issue");return}Q(),R(!1),T()}return r.addEventListener("cancel",O=>{O.preventDefault(),T()}),h.addEventListener("click",()=>T()),f.addEventListener("click",()=>T()),r.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),j())}),n.addEventListener("submit",O=>{O.preventDefault(),j()}),{open(){n.reset(),U(),Y();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){T()}}}var Cp=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function yl(e){return String(e).padStart(2,"0")}function Rp(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Ip(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${yl(n.getHours())}:${yl(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Cp[n.getMonth()]} ${n.getDate()} ${o}`;return`${Rp(r,t)} \xB7 ${i}`}function Lp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var vl=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function wl(e){let t=!1,r=null,n=new Map;function s(){Fe(c``,e),e.hidden=!0}function o(){let l=vl.filter(f=>n.has(f.key));if(l.length===0){s();return}let u=Date.now();Fe(c`<div class="usage-meter" aria-label="Usage">
        ${l.map(f=>{let _=n.get(f.key),h=typeof _.ageSeconds=="number"&&_.ageSeconds>600,E=h?`${Math.floor(_.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${_.windows.map(T=>{let R=typeof T.pct=="number"&&Number.isFinite(T.pct)?T.pct:0,U=Math.min(100,Math.max(0,R)),Y=`resets ${Ip(T.resetsAt,u)}${h?` \xB7 ${E}`:""}`;return c`<span
                class="usage-meter__window ${Lp(U)}"
                style=${`--progress: ${U}%`}
                title=${Y}
              >
                <span class="usage-meter__label">${T.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${U}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let u=await fetch(l.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function i(){let l=await Promise.all(vl.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of l)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var Op="worker-ineligible";function mo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function kl(e){return mo(e).includes(Op)}var go="worker-serial";function hn(e){return mo(e).includes(go)}var Dp="tab:worker:ready",Mp="tab:worker:blocked",Pp="tab:worker:in-progress",Np="tab:worker:closed",bn=1,Fp=new Set(["done","failed","orphaned","stopped","discarded"]);function $l(e){return pn(e).path.length>0}var Al="beads-ui.worker.candidate-filter",ho={show_blocked:!1,spec:"all"};function qp(){try{let e=window.localStorage.getItem(Al);if(!e)return{...ho};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ho};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ho}}}function Bp(e){try{window.localStorage.setItem(Al,JSON.stringify(e))}catch{}}function Up(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=r(i),u=n(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var jp=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Tl="bdui.worker.candidate_sort",zp=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],as="spec";function Hp(){try{let e=window.localStorage.getItem(Tl);return e==="board"||e==="created"||e==="spec"?e:as}catch{return as}}function Wp(e){try{window.localStorage.setItem(Tl,e)}catch{}}var El="bdui.worker.done-range";function Gp(){try{let e=window.localStorage.getItem(El);return Ot(e)?e:Et}catch{return Et}}function Yp(e){try{window.localStorage.setItem(El,e)}catch{}}var Vp="(max-width: 640px)",Cl="beads-ui.worker.lane-collapsed",yn={queue:!0,done:!0};function Kp(){try{let e=window.localStorage.getItem(Cl);if(!e)return{...yn};let t=JSON.parse(e);return!t||typeof t!="object"?{...yn}:{queue:typeof t.queue=="boolean"?t.queue:yn.queue,done:typeof t.done=="boolean"?t.done:yn.done}}catch{return{...yn}}}function Zp(e){try{window.localStorage.setItem(Cl,JSON.stringify(e))}catch{}}function xl(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Xp(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Sr):(n.sort(Cn(r)),t==="board"?n:[...n.filter($l),...n.filter(s=>!$l(s))])}function Qp(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Jp(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function ef(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var tf=["closed_unmerged","undecidable"],rf=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function nf(e,t){for(let r of rf)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var sf=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_sync",label:"base \uB3D9\uAE30\uD654",index:2},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}],of=new Set(["deploy","reconcile_queued","candidate_pinned","reconcile_verify","reconcile_deploy","reconcile_restart","reconcile_readback"]);function af(e){if(typeof e!="string"||e.length===0||of.has(e))return null;let t=6,r=sf.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function Sl(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function lf(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function bo(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function cf(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function df(e,t,r,n,s=null,o=null,a=null,i=!1,l=null,u=!0,f=null,_=null,h=null,E={},T=!1,R=null,U=null){let $=!!l&&l.position>0,Y=!!l?.continuation_action&&l.continuation_action.continuation===null,Q=!!l&&l.active===!0,j=l&&l.failure||null,O=r[e]||null,x=O&&O.gate?O.gate:null,N=O&&O.pr?O.pr:null,I=cf(h),ie=lf(l?l.resolution:null),ye=[];i&&ye.push("\uC138\uC158");let oe=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ie?ie.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,me=nf(i&&x&&x.tier==="closed_unmerged"?"\uB2EB\uD798":x&&x.gate_badge||"",oe?null:o&&o.activity||null);oe&&ye.push(oe),me.label&&ye.push(me.label),x&&x.base_badge&&x.base_badge!==x.gate_badge&&ye.push(x.base_badge),_&&ye.push(_),n&&ye.push("\uC815\uB9AC \uC2E4\uD328"),I&&ye.push(I.badge),$&&!Q&&ye.push(`\uBA38\uC9C0 \uB300\uAE30 #${l.position}`),j&&ye.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Sl(j)}`),Y&&ye.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),f&&ye.push(`\uC790\uB3D9 \uC81C\uC678: ${Sl(f)}`);let Oe=!!x&&x.base_badge==="\uCDA9\uB3CC",Je=!!x&&x.enabled===!0,et=af(o&&o.merge_progress?o.merge_progress.step:null),Ie=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!x&&x.tier==="merged",Ve=i&&!!x&&x.tier==="merged",Se=i&&Oe&&u===!1,de=Gt(E,e,{external:i,merge_active:Q||!!et,merge_queued:$,conflict_active:!!a,cleanup_active:!1,merged:!!n||x?.tier==="merged"}),ve=!!de.operation,_e=R==="pending"||R==="failed"?"\uBA38\uC9C0\uB428 \xB7 \uBC30\uD3EC \uB300\uAE30":R==="running"&&typeof U=="string"?`\uBA38\uC9C0\uB428 \xB7 ${U.slice(0,8)} \uBC30\uD3EC\uC5D0 \uD3EC\uD568\uB428`:R==="succeeded"?"\uBA38\uC9C0\uB428 \xB7 \uBC30\uD3EC \uC644\uB8CC":null,H=!!n&&["deployment_request","deploy"].includes(n.step),G=_e!==null||H;return{id:e,title:t,reason:_e||(n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30"),draggable:!1,done:!0,lane:"pr_wait",worker_serial:T,external:i,pr_number:N&&typeof N.number=="number"?N.number:null,pr_url:N&&typeof N.url=="string"?N.url:"",completion_badge:I?I.badge:null,completion_title:I?I.title:"",completion_repair_pr_url:I?I.repair_pr_url:"",completion_repair_pr_number:I?I.repair_pr_number:null,badges:ye,live_badge:a==="paused"?null:ie?.live||a==="running"?oe:me.live?me.label:null,usage:s,alert:!!x&&tf.includes(x.tier)||!!n||!!j||!!(I&&I.alert),merge_action:G?!1:!$||Y,cancel_action:$&&!Y,cancel_enabled:!Q&&!(I&&I.lock_actions),cancel_title:I&&I.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":Q?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:de,discard_action:de.action,merge_step:et,discard_enabled:de.enabled,discard_title:de.title,merge_enabled:!et&&!a&&!ve&&!(I&&I.lock_actions)&&!Se&&!G&&(Je||Oe||Ie||Ve),merge_label:Y?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ie||Ve?"\uC815\uB9AC":Oe&&!et&&!Ie?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ve?de.error?`\uD3D0\uAE30 \uC2E4\uD328: ${de.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${de.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Y?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":et?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${et.label}`:Ve?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":Se?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Ie?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":Oe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Je?`\uBA38\uC9C0 (${x.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:x&&x.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${x&&x.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function yo(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u,doneRange:f,onDoneRangeChange:_}=t,h=n?In(n,i):null,E=On({transport:r,uiOrderStore:i}),T=null,R=[],U=qp(),$=Hp(),Y=Ot(f)?f:Gp(),Q=new Map;function j(){let p=Ht.find(v=>v.value===Y);return p?p.label:"\uC624\uB298"}let O=Kp(),x=!1,N=new Set,I=new Set,ie=new Set,ye="ordinary",oe=!1,me=new Map,Oe=[],Je=document.createElement("div");Je.className="worker-console";let et=document.createElement("div");et.className="worker-top";let Ie=document.createElement("div");Ie.className="worker-drawer-overlay",Ie.hidden=!0;let Ve=document.createElement("div");Ve.className="worker-drawer-overlay__backdrop";let Se=document.createElement("div");Se.className="worker-drawer-host",Ie.append(Ve,Se);let de=document.createElement("div");de.className="worker-lanes-host",Je.append(et,Ie,de),e.appendChild(Je);let ve=null,_e=Jn(Se,{transport:r,sessionLogStore:a,onClose:()=>{ve=null,Ie.hidden=!0,Re()}}),H=ns(Je,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:u});function G(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:bn,queue:[],pr_wait:[],done:[]}}function ge(){let p=G();return typeof p.revision=="number"?p.revision:0}function K(p){p&&p.queue&&s&&s.set(p.queue)}function Ae(){let p=G().queue;return Array.isArray(p)?p.length:0}async function B(p,v){if(!r)return;let L=await r("worker-queue-place",{bead_id:p,index:v,expected_revision:ge()});K(L),L&&L.conflict&&await r("worker-queue-place",{bead_id:p,index:v,expected_revision:ge()}).then(K)}async function D(p,v){if(!r)return;let L=await r("worker-queue-reorder",{bead_id:p,to_index:v,expected_revision:ge()});K(L),L&&L.conflict&&await r("worker-queue-reorder",{bead_id:p,to_index:v,expected_revision:ge()}).then(K)}async function te(p){if(!r)return;let v=await r("worker-queue-remove",{bead_id:p,expected_revision:ge()});K(v),v&&v.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:ge()}).then(K)}async function De(){if(!r||oe)return;let v=(Array.isArray(G().queue)?G().queue:[]).map(ce=>ce.bead_id).filter(ce=>ie.has(ce));if(v.length===0)return;if(v.some(ce=>{let qe=me.get(ce);return qe!==!0&&qe!==!1})){Z("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let L=ye==="serial",ee=v.filter(ce=>me.get(ce)!==L);if(ee.length===0){ie.clear(),Re(),Z("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}oe=!0,Re();let ue=[],be=0;try{for(let ce of ee){let qe=await Promise.resolve(r(L?"label-add":"label-remove",{id:ce,label:go})).catch(()=>[]),se=Array.isArray(qe)?qe[0]:qe,Ke=se&&typeof se=="object"?se.labels:null;se&&typeof se=="object"&&se.id===ce&&Array.isArray(Ke)&&hn(Ke)===L?be+=1:ue.push(ce)}if(ue.length===0){ie.clear(),Z(`${be}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}ie.clear();for(let ce of ue)ie.add(ce);Z(`${ee.length}\uAC1C \uC911 ${be}\uAC1C \uBCC0\uACBD \xB7 ${ue.length}\uAC1C \uC2E4\uD328 (${ue.join(", ")})`,"error")}finally{oe=!1,Re()}}async function Ce(p){if(!r||!p)return;let v=await r("worker-attempt-pause",{attempt_id:p});v&&v.paused===!1&&v.reason&&Z(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Ne(p){if(!r||!p)return;let v=async(ee={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:ge(),...ee}),L=await v();K(L),L&&L.conflict&&(L=await r("worker-attempt-resume",{attempt_id:p,expected_revision:ge()}),K(L)),L=await Qt(L,(ee,ue)=>v({continuation:ee,decision_token:ue}),{onResult:K,refresh:()=>v()}),L&&L.resumed===!1&&!L.conflict&&L.reason&&Z(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${L.reason}`,"error",2400)}async function Te(p){if(!r||!p)return;let v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:ge()});K(v),v&&v.conflict&&(v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:ge()}),K(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&Z(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function We(p,v,L=!0){if(!r)return null;let ee=r,ue=await ee(p,{...v,expected_revision:ge()});return K(ue),ue&&ue.conflict&&L&&(ue=await ee(p,{...v,expected_revision:ge()}),K(ue)),ue}async function Pe(p){if(!r||!p)return;let v=G().merge_queue?.find(ee=>ee.bead_id===p)?.continuation_action;if(v?.mismatch&&v.continuation===null){await C(p,v.mismatch);return}N.add(p),Re();let L;try{L=await We("worker-merge-queue-add",{bead_id:p})}finally{N.delete(p),Re()}!L||L.conflict||L.applied||Z("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function C(p,v){let L=await Qt({continuation_mismatch:v},(ue,be)=>We("worker-merge-queue-add",{bead_id:p,continuation:ue,decision_token:be},!1)),ee=L?.queue?.merge_queue?.find(ue=>ue.bead_id===p)?.continuation_action;if(L?.applied!==!0&&ee?.continuation===null&&ee.mismatch){await C(p,ee.mismatch);return}L&&L.applied===!1&&!L.conflict&&Z("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function S(p){if(!r)return;let v=await We("worker-merge-auto-toggle",{on:p});!v||v.conflict||Z(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function k(p){if(!r||!p)return;let v=await We("worker-merge-queue-remove",{bead_id:p});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&Z("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function A(){await We("worker-merge-queue-remove",{all:!0})}async function P(p,v=null,L="unmerged",ee=null){if(!r||!p)return;let ue=fn(p,L);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(ue)))return;let ce=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...ee?{operation_id:ee}:{},expected_revision:ge()});if(K(ce),ce&&ce.conflict&&(ce=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...ee?{operation_id:ee}:{},expected_revision:ge()}),K(ce)),ce&&ce.discarded===!0){Z(ss(ce),"success",5e3);return}if(ce&&ce.reason){Z(`\uD3D0\uAE30 \uC2E4\uD328: ${ce.reason}`,"error",2800);return}if(ce&&ce.accepted&&ce.pending==="merged_revert"){Z("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ce&&ce.accepted&&!ce.discarded){Z(`\uD3D0\uAE30 \uC9C4\uD589: ${ce.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ce&&!ce.conflict&&Z("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function re(p,v){if(!r||!v||I.has(v))return;I.add(v),Re();let L;try{let ee=async(ue={})=>await r(p,{bead_id:v,expected_revision:ge(),...ue});L=await ee(),K(L),L&&L.conflict&&(L=await r(p,{bead_id:v,expected_revision:ge()}),K(L)),p==="worker-revise-fix"&&(L=await Qt(L,(ue,be)=>ee({continuation:ue,decision_token:be}),{onResult:K,refresh:()=>ee()}))}finally{I.delete(v),Re()}if(!(!L||L.conflict)){if(L.ok){Z(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}Z(`\uCC98\uBD84 \uAC70\uBD80: ${L.reason||""}`,"error",3e3)}}async function X(p){if(!r)return;let v=await r("worker-queue-toggle",{on:p,expected_revision:ge()});K(v),v&&v.conflict&&await r("worker-queue-toggle",{on:p,expected_revision:ge()}).then(K)}async function le(p){if(!r||!Number.isFinite(p))return;let v=Math.max(bn,Math.floor(p)),L=await r("worker-queue-set-slots",{slots:v,expected_revision:ge()});K(L),L&&L.conflict&&await r("worker-queue-set-slots",{slots:v,expected_revision:ge()}).then(K)}async function Le(p){if(!r)return;let v=await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:ge()});K(v),v&&v.conflict&&await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:ge()}).then(K)}function tt(){let p=G(),v=h?h.selectBoardColumn(Dp,"ready"):[],L=h?h.selectBoardColumn(Mp,"blocked"):[],ee=h?h.selectBoardColumn(Np,"closed"):[],ue=h?h.selectBoardColumn(Pp,"in_progress"):[],be=new Map;for(let g of ue){let q=Jp(g);if(!q)continue;let ne=be.get(q);ne?ne.push(g):be.set(q,[g])}let ce=g=>{let q=Ln(be.get(g)||[]);return q?q.title||q.id:null},qe=p.bead_titles||{},se=new Map;for(let[g,q]of Object.entries(qe))typeof q=="string"&&q.length>0&&se.set(g,q);for(let g of[...v,...L])se.set(g.id,g.title||g.id);me.clear();let Ke=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},Pt=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{};for(let[g,q]of Object.entries(Pt))Array.isArray(q)&&me.set(g,hn(q));for(let g of[...v,...L]){let q=g.labels;if(!Array.isArray(q))continue;if(!me.has(g.id)){me.set(g.id,hn(q));continue}let ne=Ke[g.id],He=Xt(ne&&typeof ne=="object"?ne.updated_at:null),zt=Xt(g.updated_at);zt!==null&&He!==null&&zt>He&&me.set(g.id,hn(q))}let ht=new Map;for(let[g,q]of Object.entries(Ke))q&&typeof q=="object"&&ht.set(g,q);for(let g of[...v,...L])ht.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let ft=g=>ht.get(g)||{},wt=p.pr_wait||[],pe=p.pr_observations||{},b=p.pr_activity||{},W=p.cleanup_failed||{},z=Object.entries(W).map(([g,q])=>({bead_id:g,step:q&&q.step?q.step:"",reason:q&&q.reason?q.reason:"",detail:q&&typeof q.detail=="string"?q.detail:null,output_tail:q&&typeof q.output_tail=="string"&&q.output_tail?q.output_tail:void 0,log_path:q&&typeof q.log_path=="string"&&q.log_path?q.log_path:void 0,retry_count:q&&typeof q.retry_count=="number"&&Number.isInteger(q.retry_count)&&q.retry_count>0?q.retry_count:0})),he=p.queue||[],Ze=new Set(he.map(g=>g.bead_id));for(let g of ie)Ze.has(g)||ie.delete(g);let Qe=new Set([...he.map(g=>g.bead_id),...wt.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),m=new Set(L.map(g=>g.id)),d=i?i.get()?.order||{}:{},w=new Set,y=[];for(let g of[...v,...L])Qe.has(g.id)||w.has(g.id)||Qp(g)||kl(g.labels)||(w.add(g.id),y.push(g));R=Xp(y,$,d);let M=p.admission||{},J=g=>{let q=M[g];if(!q)return"";if(q.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ne=typeof q.reason=="string"?q.reason:"",He=ne.indexOf(":");return He>0&&He<ne.length-1?`\u26D4 ${ne.slice(0,He)} (${ne.slice(He+1)})`:`\u26D4 ${ne}`},$e=R.map(g=>{let q=pn(g),ne=q.path.length>0,He=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",zt=!He&&ne&&!q.conflict,ar=m.has(g.id),Lt=[];ar&&Lt.push(ef(g)),He?Lt.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):q.conflict?Lt.push("spec_id_conflict"):ne||Lt.push("spec \uC5C6\uC74C");let Sn=J(g.id);return Sn&&Lt.push(Sn),{id:g.id,title:g.title||g.id,reason:Lt.join(" \xB7 "),draggable:zt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:He,status:g.status,blocked:ar,has_spec:ne}}),ut=Up($e,U),Be=ut.visible,or=p.revise_parked||{},br=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},$o=(g,q)=>g.map(ne=>{let He=q==="queue"?or[ne.bead_id]:null,zt=q==="queue"?Gt(br,ne.bead_id):null,ar=zt?.operation?zt:null,Lt=q==="queue"?me.has(ne.bead_id)?me.get(ne.bead_id)||!1:null:!1,Sn=Lt===!0&&(Object.values(p.attempts||{}).some(Kt=>Kt&&Kt.bead_id!==ne.bead_id&&!Fp.has(Kt.status))||wt.some(Kt=>Kt.bead_id!==ne.bead_id)||Object.values(br).some(Kt=>Kt&&Kt.bead_id!==ne.bead_id&&Kt.phase!=="done")),jo=q==="done"?[]:[J(ne.bead_id)];return Sn&&jo.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:ne.bead_id,title:se.get(ne.bead_id)||ne.bead_id,reason:jo.filter(Boolean).join(" \xB7 "),draggable:q!=="done"&&!ar,done:q==="done",lane:q,selectable:q==="queue",selected:q==="queue"&&ie.has(ne.bead_id),worker_serial:Lt,discard:ar,badges:He?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!He,revise_action:!!He,revise_enabled:!!He&&!ar&&!I.has(ne.bead_id),revise_title:He?He.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${He.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:q==="done"?Dt(p.attempts||{},ne.bead_id):null,done_at:q==="done"&&typeof ne.added_at=="number"?ne.added_at:void 0,...ft(ne.bead_id)}}),xo=new Map;for(let g of p.done)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&xo.set(g.bead_id,g.added_at);let Hr=p.attempts?Object.values(p.attempts):[],is=new Set;for(let g of Hr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&is.add(g.resumed_from);let ls=new Map;for(let g of Hr)ls.set(g.bead_id,g.attempt_id);let cs=new Map;for(let g of Hr)cs.set(g.attempt_id,g);function ds(g){let q=new Set,ne=g;for(;ne&&!q.has(ne.attempt_id);){if(ne.conflict_resolution===!0)return!0;q.add(ne.attempt_id),ne=typeof ne.resumed_from=="string"&&ne.resumed_from.length>0&&cs.get(ne.resumed_from)||null}return!1}let vn=typeof p.declared_base=="string"?p.declared_base:null;function Ul(g){let q=null;for(let ne of Hr)!ne||ne.bead_id!==g||ds(ne)||(q===null||(typeof ne.started_at=="number"?ne.started_at:0)>=(typeof q.started_at=="number"?q.started_at:0))&&(q=ne);return q&&typeof q.target_base=="string"?q.target_base:null}let So=[],Ao=[],jl=g=>{let q=ls.get(g.bead_id)!==g.attempt_id,ne=xo.get(g.bead_id),He=typeof ne=="number"&&ne>0&&typeof g.finished_at=="number"&&ne>=g.finished_at;return!q&&!He&&typeof g.dismissed_at!="number"},To=g=>{let q=typeof g.session_id=="string"&&g.session_id.length>0,ne=is.has(g.attempt_id);return{eligible:q&&!ne,reason:q?ne?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Nt=null;for(let g of Hr){let q=g.status==="paused"&&!is.has(g.attempt_id);if(g.status==="running"||q)Ao.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:se.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:q,conflict_resolution:ds(g),base_exception:bo(vn,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:Gt(br,g.bead_id,{attempt_id:g.attempt_id}),usage:Dt(p.attempts||{},g.bead_id),current_child:ce(g.bead_id),...ft(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&jl(g)){let ne=To(g);So.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:se.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Gt(br,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:ne.eligible,resume_reason:ne.reason,conflict_resolution:ds(g),base_exception:bo(vn,g.target_base),usage:Dt(p.attempts||{},g.bead_id),current_child:ce(g.bead_id),...ft(g.bead_id)}),Nt=g}}let wn=[...So,...Ao],Eo=null;if(Nt){let g=To(Nt),q=Nt.cause_detail;Eo={bead_id:Nt.bead_id,repo:Nt.repo||"",reason:Nt.cause||Nt.status,cause_detail:q&&typeof q.reason=="string"?{reason:q.reason,command:typeof q.command=="string"?q.command:null}:null,resume_attempt_id:Nt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:Gt(br,Nt.bead_id,{attempt_id:Nt.attempt_id})}}let zl=new Set(wn.map(g=>g.bead_id)),us=Array.isArray(p.merge_queue)?p.merge_queue:[],Co=new Map,Ro=new Map,Io=new Map;us.forEach((g,q)=>{g&&typeof g.bead_id=="string"&&(Co.set(g.bead_id,q+1),Ro.set(g.bead_id,g.resolution),Io.set(g.bead_id,g.continuation_action||null))});let Lo=p.merge_queue_state||{active:null,failures:{}},Hl=Lo.failures||{},Wl=p.deployment_coverage&&typeof p.deployment_coverage=="object"&&!Array.isArray(p.deployment_coverage)?p.deployment_coverage:{},Gl=p.deployment&&typeof p.deployment.target_sha=="string"?p.deployment.target_sha:null,Yl=p.auto_merge_skips||{},Oo=g=>{let q=Yl[g];if(!q)return null;let ne=pe[g],He=ne&&ne.pr?ne.pr.head_sha:null;return He&&He===q.head_sha?q.reason||"":null},kn=new Map;for(let g of wn)g.failed!==!0&&g.conflict_resolution&&(g.paused?kn.has(g.bead_id)||kn.set(g.bead_id,"paused"):kn.set(g.bead_id,"running"));let Do=wn.filter(g=>!g.paused&&g.failed!==!0).length,Mo=(p.workspace_info||{}).slots,Vl=typeof Mo=="number"?Mo:typeof p.slots=="number"?p.slots:bn,Po=p.pr_wait_holds_slot===!0?bn:Vl,Kl=Do>Po,$n=$r(Y),Zl=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>$n===void 0||typeof g.added_at!="number"||g.added_at>=$n).sort((g,q)=>(q.added_at||0)-(g.added_at||0)),Wr=$o(Zl,"done"),Xl=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),No=[],Ql=u?.()||"";for(let g of ee){let q=Xt(g.closed_at);if(typeof g.id!="string"||Xl.has(g.id)||q===null||$n!==void 0&&q<$n||typeof g.comment_count!="number"||g.comment_count<=0)continue;let ne=`${Ql}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,He=Q.get(ne);He===void 0&&r&&(Q.set(ne,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(zt=>{let ar=Array.isArray(zt)&&zt.some(Lt=>es(typeof Lt?.text=="string"?Lt.text:"")?.lane==="session");Q.set(ne,ar?"session":"not-session"),Re()}).catch(()=>{Q.set(ne,"failed"),Re()})),He==="session"&&No.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:q,created_at:g.created_at,updated_at:g.updated_at})}Wr.push(...No),Wr.sort((g,q)=>(q.done_at||0)-(g.done_at||0));let xn={};for(let g of Jt)xn[g]=0;let Fo=!1,qo=0,ps=0,Bo=0;for(let g of Wr){let q=g.usage;if(q&&typeof q=="object"){let ne=!1;for(let He of Jt)Number.isFinite(q[He])&&(xn[He]+=q[He],Fo=!0,ne=!0);ne&&(ps+=1,Number.isFinite(q.total_cost_usd)&&(qo+=q.total_cost_usd,Bo+=1))}}ps>0&&Bo===ps&&(xn.total_cost_usd=qo);let Uo=Wr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),Jl=Uo.length>0?mt(qn(Uo)):Fo?qt(xn):null;return{queue:p,idToTitle:se,candidates:Be,candidate_hidden:{blocked:ut.hidden_blocked,spec:ut.hidden_spec},running:wn,live_count:Do,slots:Po,over_cap:Kl,failure:Eo,waiting:$o(he.filter(g=>!zl.has(g.bead_id)),"queue"),pr_wait:wt.map(g=>df(g.bead_id,se.get(g.bead_id)||g.bead_id,pe,W[g.bead_id]||null,Dt(p.attempts||{},g.bead_id),b[g.bead_id]||(N.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),kn.get(g.bead_id)||null,g.external===!0,{position:Co.get(g.bead_id)||0,active:Lo.active===g.bead_id,failure:Hl[g.bead_id]||null,resolution:Ro.get(g.bead_id),continuation_action:Io.get(g.bead_id)},g.wt_present!==!1,p.auto_merge===!0?Oo(g.bead_id):null,bo(vn,Ul(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},cs.get(ls.get(g.bead_id)||"")?.worker_serial===!0,Wl[g.bead_id]||null,Gl)).map(g=>({...g,...ft(g.id)})),merge_queue_length:us.length,merge_queue_running:us.length>0,auto_excluded:wt.map(g=>g.bead_id).filter(g=>Oo(g)!==null),verify_cmd_present:!!(p.workspace_info||{}).verify_cmd,declared_base:vn,done:Wr,token_total:Jl,cleanup_failures:z,deployment:p.deployment||null}}function at(p){let v=p.waiting.length>0?p.waiting[0].id:"\u2014",L=c`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,ee=st(p),ue=p.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",be=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${j()} 완료 <b>${p.done.length}</b></span
      >`,ce=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,qe=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${bn}
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
      </button>`,se=Ki({failure:p.failure,cleanupFailures:p.cleanup_failures,deployment:p.deployment});return x?c`<div class="worker-ribbon">
          ${L} ${ee}
          <div class="worker-kpi worker-kpi--ribbon">${ue}${be}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${qe}</div>
          <div class="worker-kpi">${ce}</div>
        </div>
        ${se}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${L}${ee}${qe}</div>
        <div class="worker-kpi">
          ${ue}${be}${ce}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${j()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Ke=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Ke.tooltip}
                >${j()} 완료 · 누적 ${Ke.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${se}`}function Ye(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let v=p.running.some(L=>!L.paused&&L.failed!==!0);return c`<section
      class="worker-now${v?" worker-pane--live":""}"
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
      ${p.running.length>0?lo(p.running,Date.now(),ve):""}
      ${p.pr_wait.map(L=>ao(L))}
    </section>`}function bt(p){let v=p.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${U.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${jp.map(L=>c`<button
              type="button"
              class="worker-filter__chip${U.spec===L.value?" is-active":""}"
              data-spec=${L.value}
              aria-pressed=${U.spec===L.value?"true":"false"}
            >
              ${L.label}
            </button>`)}
        ${v.spec>0?c`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function dt(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${zp.map(p=>c`<option value=${p.value} ?selected=${$===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function it(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${Y}
      >
        ${Ht.map(p=>c`<option value=${p.value} ?selected=${Y===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function yt(){if(ie.size===0)return"";let p=Array.from(ie),v=p.some(L=>{let ee=me.get(L);return ee!==!0&&ee!==!1});return c`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${p.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${ye}
        ?disabled=${oe}
      >
        <option value="ordinary">일반 병렬</option>
        <option value="serial">🔒 머지까지 단독</option>
      </select>
      <button
        type="button"
        class="worker-bulk__apply"
        ?disabled=${v||oe}
        title=${v?"\uC120\uD0DD\uD55C \uC791\uC5C5\uC758 \uC2E4\uD589 \uBC29\uC2DD\uC744 \uD655\uC778\uD558\uB294 \uC911\uC785\uB2C8\uB2E4":oe?"\uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD \uC911\uC785\uB2C8\uB2E4":"\uC120\uD0DD\uD55C \uC791\uC5C5\uC5D0 \uC801\uC6A9"}
      >
        적용
      </button>
      <span class="worker-bulk__hint">선택한 대기 작업에만 적용됩니다</span>
    </div>`}function It(p){let v=(p.queue.pr_wait||[]).filter(be=>be&&be.external!==!0&&typeof be.bead_id=="string"),L=new Set(p.running.filter(be=>!be.paused&&be.failed!==!0).map(be=>be.bead_id));for(let be of v)L.add(be.bead_id);let ee=!(p.queue.pr_wait_holds_slot!==!0||p.queue.auto_advance!==!0||p.queue.auto_merge===!0||v.length===0||p.waiting.length===0||L.size<p.slots),ue=p.pr_wait.some(be=>be.worker_serial===!0);if(!(!ee&&!(ue&&p.queue.auto_merge!==!0)))return c`${ee?c`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${ue&&p.queue.auto_merge!==!0?c`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`:""}`}function st(p){let v=p.queue.auto_merge===!0;if(p.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${v?" is-active":""}"
        title=${v?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${v?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(v)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let L=new Set(p.auto_excluded),ee=p.pr_wait.filter(ue=>ue.merge_action&&ue.merge_enabled&&!L.has(ue.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${p.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${ee>0?` ${ee}`:""}
    </button>`}function lt(p){let v=Yt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:dt(),controls:bt(p)});return x?c`<div class="worker-lanes worker-lanes--mobile">
        ${Ye(p)}
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:c`${yt()}${It(p)}`,collapsible:!0,collapsed:O.queue,preview:xl(p.waiting)})}
        ${v}
        ${Yt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${j()} \uC644\uB8CC \uC5C6\uC74C`,controls:it(),collapsible:!0,collapsed:O.done,preview:Array.isArray(p.token_total)?p.token_total.map(L=>L.label).join(" \xB7 "):p.token_total||xl(p.done)})}
      </div>`:c`<div class="worker-lanes">
      ${v}
      ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:c`${yt()}${It(p)}`})}
      ${Yt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(L=>!L.paused&&L.failed!==!0),body:lo(p.running,Date.now(),ve)})}
      ${Yt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Yt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${j()} ${p.done.length}`,items:p.done,empty:`${j()} \uC644\uB8CC \uC5C6\uC74C`,controls:it()})}
    </div>`}function nt(p){O={...O,[p]:!O[p]},Zp(O),Re()}function Re(){let p=tt();Fe(at(p),et),Fe(lt(p),de)}function gt(){let p=document.querySelector(".app-header");if(!p)return;let v=()=>{let L=Math.round(p.getBoundingClientRect().height);Je.style.setProperty("--worker-ribbon-top",`${L}px`)};if(v(),typeof ResizeObserver=="function"){let L=new ResizeObserver(v);L.observe(p),Oe.push(()=>L.disconnect())}else window.addEventListener("resize",v),Oe.push(()=>window.removeEventListener("resize",v))}function F(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(Vp);x=!!p.matches;let v=L=>{let ee=!!(L&&typeof L.matches=="boolean"?L.matches:p.matches);ee!==x&&(x=ee,Re())};typeof p.addEventListener=="function"?(p.addEventListener("change",v),Oe.push(()=>p.removeEventListener("change",v))):typeof p.addListener=="function"&&(p.addListener(v),Oe.push(()=>p.removeListener(v)))}function V(p){let v=p.target,L=v?.closest?.(".worker-mini__grip"),ee=L?L.closest('.worker-mini[data-lane="queue"]'):v?.closest?.('.worker-card[draggable="true"]');if(!ee)return;let ue=ee.dataset.beadId||"",be=ee.dataset.lane||"";T={bead_id:ue,from_lane:be};try{p.dataTransfer?.setData("text/plain",ue),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function ae(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;let L=v.dataset.lane||"";L!=="candidate"&&L!=="queue"||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function fe(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function we(p,v){let L=R.find(ce=>ce.id===p);if(!L)return;let ee=R.filter(ce=>ce.id!==p),ue=ee.length;if(v){let ce=v.dataset.beadId;if(ce===p)return;let qe=ee.findIndex(se=>se.id===ce);qe>=0&&(ue=qe)}let be=ee.slice();be.splice(ue,0,L),E.applyReorder(p,be,ue)}function Ee(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;p.preventDefault(),v.classList.remove("worker-pane--drag-over");let L=v.dataset.lane||"",ee=T?.bead_id||p.dataTransfer?.getData("text/plain")||"",ue=T?.from_lane||"";if(T=null,!ee)return;let be=p.target?.closest?.(".worker-mini, .worker-card"),ce=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),qe=ce.length;if(be){let se=ce.indexOf(be);se>=0&&(qe=se)}if(v.classList.contains("worker-pane--collapsed")&&(qe=Ae()),L==="candidate"){if(ue==="candidate"){we(ee,be);return}ue==="queue"&&te(ee);return}L==="queue"&&(ue==="queue"?D(ee,qe):B(ee,qe))}function je(p){U=p,Bp(p),Re()}function rt(p){$=p==="board"||p==="created"||p==="spec"?p:as,Wp($),Re()}function xe(p){Y=Ot(p)?p:Et,Yp(Y),_?.(Y),Re()}function ze(p){let v=p.target?.closest?.(".worker-mini__select");if(v){let Ke=v.dataset.beadId||"";Ke&&(v.checked?ie.add(Ke):ie.delete(Ke),Re());return}let L=p.target?.closest?.(".worker-bulk__mode");if(L){ye=L.value==="serial"?"serial":"ordinary";return}let ee=p.target?.closest?.(".worker-filter__blocked");if(ee){je({...U,show_blocked:ee.checked});return}let ue=p.target?.closest?.(".worker-done-range");if(ue){xe(ue.value);return}let be=p.target?.closest?.(".worker-sort");if(be){rt(be.value||as);return}let ce=p.target?.closest?.(".worker-pr-wait-hold");if(ce){Le(ce.checked);return}let qe=p.target?.closest?.(".worker-slots__input");if(!qe)return;let se=Number.parseInt(qe.value,10);if(!Number.isFinite(se)){Re();return}le(se).then(Re)}function ke(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function pt(p){let v=G(),L=v.attempts?v.attempts[p]:null;ve=p,Ie.hidden=!1,_e.open({attempt_id:p,meta:ke(L)}),Re()}function vt(){if(!ve)return;let p=G(),v=p.attempts?p.attempts[ve]:null;if(v){_e.updateMeta(ke(v));return}_e.close()}function Vt(p){let v=p.target,L=v?.closest?.(".worker-bulk__apply");if(L){L.disabled||De();return}if(v?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip")||v?.closest?.("#worker-exec-defaults-dialog"))return;if(v?.closest?.(".worker-exec-defaults-btn")){H.open();return}if(v?.closest?.(".worker-deployment-retry")){r&&Promise.resolve(r("worker-deployment-retry",{})).then(K);return}let ee=v?.closest?.(".worker-banner__resume");if(ee){let z=ee.dataset.attemptId;z&&Ne(z);return}let ue=v?.closest?.(".worker-banner__discard");if(ue){let z=ue.dataset.confirmation==="merged"?"merged":"unmerged";P(ue.dataset.beadId||"",ue.dataset.attemptId||null,z,ue.dataset.operationId||null);return}let be=v?.closest?.(".worker-banner__dismiss");if(be){let z=be.dataset.attemptId;z&&Te(z);return}if(v?.closest?.(".worker-play")){X(!G().auto_advance);return}let ce=v?.closest?.(".worker-merge-all");if(ce){ce.classList.contains("worker-merge-all--stop")?G().auto_merge===!0?S(!1):A():S(!0);return}let qe=v?.closest?.(".worker-pane__hd--toggle");if(qe){let z=qe.dataset.lane;(z==="queue"||z==="done")&&nt(z);return}let se=v?.closest?.(".worker-card__place");if(se){let z=se.dataset.beadId;z&&!se.disabled&&B(z,Ae());return}let Ke=v?.closest?.(".worker-filter__chip");if(Ke){let z=Ke.dataset.spec;(z==="all"||z==="with"||z==="without")&&je({...U,spec:z});return}let Pt=v?.closest?.(".worker-mini__merge");if(Pt){Pe(Pt.dataset.beadId||"");return}let ht=v?.closest?.(".worker-mini__merge-cancel");if(ht){k(ht.dataset.beadId||"");return}let ft=v?.closest?.(".worker-mini__discard");if(ft){P(ft.dataset.beadId||"",ft.dataset.attemptId||null,ft.dataset.discardMode==="merged"?"merged":"unmerged",ft.dataset.operationId||null);return}let wt=v?.closest?.(".worker-mini__revise-fix");if(wt){re("worker-revise-fix",wt.dataset.beadId||"");return}let pe=v?.closest?.(".worker-mini__revise-approve");if(pe){re("worker-revise-approve",pe.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let z=v?.closest?.(".rtile"),he=z?.dataset?.beadId,Ze=z?.dataset?.attemptId;he&&P(he,Ze||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let he=v?.closest?.(".rtile")?.dataset?.attemptId;he&&Te(he);return}if(v?.closest?.(".rtile__pause")){let he=v?.closest?.(".rtile")?.dataset?.attemptId;he&&Ce(he);return}if(v?.closest?.(".rtile__resume")){let he=v?.closest?.(".rtile")?.dataset?.attemptId;he&&Ne(he);return}if(v?.closest?.(".rtile__session")){let he=v?.closest?.(".rtile")?.dataset?.attemptId;he&&pt(he);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){_e.close();return}if(v?.closest?.(".worker-drawer-host"))return;let b=v?.closest?.(".rtile");if(b){if(v?.closest?.(".rtile__id")){let he=b.dataset.beadId;he&&Ar(he).then(Ze=>{Ze?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let z=b.dataset.beadId;z&&l&&l(z);return}let W=v?.closest?.(".worker-mini, .worker-card");if(W){let z=W.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){z&&Ar(z).then(he=>{he?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}z&&l&&l(z)}}return e.addEventListener("dragstart",V),e.addEventListener("dragover",ae),e.addEventListener("dragleave",fe),e.addEventListener("drop",Ee),e.addEventListener("click",Vt),e.addEventListener("change",ze),F(),gt(),h&&Oe.push(h.subscribe(()=>{for(let[p,v]of Q)v==="failed"&&Q.delete(p);Re()})),s&&Oe.push(s.subscribe(()=>{Re(),vt()})),Re(),{load(){Re()},openExecDefaults(){H.open()},destroy(){for(let p of Oe.splice(0))try{p()}catch{}e.removeEventListener("dragstart",V),e.removeEventListener("dragover",ae),e.removeEventListener("dragleave",fe),e.removeEventListener("drop",Ee),e.removeEventListener("click",Vt),e.removeEventListener("change",ze);try{_e.destroy()}catch{}Ie.hidden=!0;try{H.destroy()}catch{}Fe(c``,e)}}}function vo(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Rl(e,t,r,n=async()=>{},s=async()=>{}){let o=ot("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function f(x){let I=x.target.value,ye=t.getState().workspace?.current?.path||"";if(I&&I!==ye){o("switching workspace to %s",I),i=!0,O();try{await r(I)}catch(oe){o("workspace switch failed: %o",oe)}finally{i=!1,O()}}}async function _(){let x=t.getState(),N=x.workspace?.current?.path||x.workspace?.available?.[0]?.path||"";if(!(!N||l)){o("git-pulling workspace %s",N),l=!0,O();try{await n(N)}catch(I){o("workspace git pull failed: %o",I)}finally{l=!1,O()}}}function h(x){let N=x.target;N&&e.contains(N)||R()}function E(x){x.key==="Escape"&&R()}function T(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",E),O())}function R(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",E),O())}function U(){u?R():T()}async function $(x){let N=x.target,I=N.value,ie=N.checked;o("toggling visibility %s \u2192 %s",I,String(ie));try{await s(I,ie)}catch(ye){o("workspace visibility toggle failed: %o",ye)}}function Y(x){return x?c`
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
    `:c``}function Q(x,N){return c`
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
        ${u?c`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${x.map(I=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${I.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${I.path}"
                        .checked=${!N.has(I.path)}
                        @change=${$}
                      />
                      <span class="workspace-picker__manage-name"
                        >${vo(I.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function j(){let x=t.getState(),N=x.workspace?.current,I=x.workspace?.available||[],ie=new Set(x.workspace?.hidden||[]),ye=N?.path||I[0]?.path||"";if(I.length===0)return c``;let oe=I.filter(me=>!ie.has(me.path)||me.path===ye);if(oe.length<=1){let me=oe[0]||I[0],Oe=vo(me.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${me.path}"
            >${Oe}</span
          >
          ${Q(I,ie)}
          ${Y(ye)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${oe.map(me=>c`
              <option
                value="${me.path}"
                ?selected=${me.path===ye}
                title="${me.path}"
              >
                ${vo(me.path)}
              </option>
            `)}
        </select>
        ${Q(I,ie)}
        ${Y(ye)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){Fe(j(),e)}return O(),a=t.subscribe(()=>O()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",E),Fe(c``,e)}}}var Il=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-deployment-retry","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function wo(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Ll(e,t,r=wo()){return{id:r,type:e,payload:t}}function Ol(e={}){let t=ot("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,f=[],_=new Map,h=new Set;function E(j){for(let O of Array.from(h))try{O(j)}catch{}}function T(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),E(o);let j=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),O=(r.jitterRatio||0)*j,x=Math.max(0,Math.round(j+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",x,a+1),i=setTimeout(()=>{i=null,Q()},x)}function R(j){try{s?.send(JSON.stringify(j))}catch(O){t("ws send failed",O)}}function U(){for(o="open",t("ws open"),E(o),a=0;f.length;){let j=f.shift();j&&R(j)}}function $(j){let O;try{O=JSON.parse(String(j.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let N=u.get(O.id);u.delete(O.id),O.ok?N?.resolve(O.payload):N?.reject(O.error||new Error("ws error"));return}let x=_.get(O.type);if(x&&x.size>0)for(let N of Array.from(x))try{N(O.payload)}catch(I){t("ws event handler error",I)}else t("ws received unhandled message type: %s",O.type)}function Y(){o="closed",t("ws closed"),E(o);for(let[j,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(j);a+=1,T()}function Q(){if(!l)return;let j=n();try{s=new WebSocket(j),t("ws connecting %s",j),o="connecting",E(o),s.addEventListener("open",U),s.addEventListener("message",$),s.addEventListener("error",()=>{}),s.addEventListener("close",Y)}catch(O){t("ws connect failed %o",O),T()}}return Q(),{send(j,O){if(!Il.includes(j))return Promise.reject(new Error(`unknown message type: ${j}`));let x=wo(),N=Ll(j,O,x);return t("send %s id=%s",j,x),new Promise((I,ie)=>{u.set(x,{resolve:I,reject:ie,type:j}),s&&s.readyState===s.OPEN?R(N):(t("queue %s id=%s (state=%s)",j,x,o),f.push(N))})},on(j,O){_.has(j)||_.set(j,new Set);let x=_.get(j);return x?.add(O),()=>{x?.delete(O)}},onConnection(j){return h.add(j),()=>{h.delete(j)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,Q()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function uf(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function pf(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var ko=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Dl=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],gr="tab:worker:closed",ff="bdui.worker.done-range",Ml=pl,Pl="worker:queue",Nl="ui:order",Fl="ui:display-policy",ql="exec:presets",hr="tab:board:closed",Bl="beads-ui.board.closed-range";function _f(e){let t=ot("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Fe(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&wl(s),o&&a&&i&&l){let Se=function(m,d){let w="Request failed",y="";if(m&&typeof m=="object"){let J=m;if(typeof J.message=="string"&&J.message.length>0&&(w=J.message),typeof J.details=="string")y=J.details;else if(J.details&&typeof J.details=="object")try{y=JSON.stringify(J.details,null,2)}catch{y=""}}else typeof m=="string"&&m.length>0&&(w=m);let M=d&&d.length>0?`Failed to load ${d}`:"Request failed";Ve.open(M,w,y)},S=function(m){return`${se.getState().workspace.current?.path||""}\0${m}`},k=function(){te&&(te().catch(()=>{}),te=null),De=null,Ce=null},P=function(m){Ne=m;let d=()=>{Ne!==m||se.getState().selected_id!==m||(Ne=null,A(m))};if(!Pe){We.then(d);return}d()},Le=function(m,d,w,y,M){return w!==le[d]?(M().catch(()=>{}),!1):(m.set(y,M),!0)},tt=function(){let m=se.getState();it(m.view==="board"),Re(m.view==="worker"),fe(m.view==="monitor"),F(m.view==="board"||m.view==="worker"||!!m.selected_id)},bt=function(){let m=$r(at);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},dt=function(){let m=$r(Ye);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},it=function(m){if(m)for(let[d,w]of ko){if(re.has(d)||X.has(d))continue;let y=d===hr?bt():{type:w};try{H.register(d,y)}catch($e){t("register %s store failed: %o",d,$e)}X.add(d);let M=le.board,J=!1;_e.subscribeList(d,y).then($e=>{J=!Le(re,"board",M,d,$e)}).catch($e=>{t("subscribe %s failed: %o",d,$e),Se($e,"board")}).finally(()=>{X.delete(d),J&&tt()})}else st()},st=function(){le.board+=1;for(let[m]of ko){let d=re.get(m);d&&(d().catch(()=>{}),re.delete(m));try{H.unregister(m)}catch(w){t("unregister %s failed: %o",m,w)}}},Re=function(m){if(!m){gt();return}for(let[d,w]of Dl){if(lt.has(d)||X.has(d))continue;let y=d===gr?dt():{type:w};try{H.register(d,y)}catch($e){t("register %s store failed: %o",d,$e)}X.add(d);let M=le.worker,J=!1;_e.subscribeList(d,y).then($e=>{J=!Le(lt,"worker",M,d,$e)}).catch($e=>{t("subscribe %s failed: %o",d,$e),Se($e,"worker")}).finally(()=>{X.delete(d),J&&tt()})}},gt=function(){le.worker+=1;for(let[m]of Dl){let d=lt.get(m);d&&(d().catch(()=>{}),lt.delete(m));try{H.unregister(m)}catch(w){t("unregister %s failed: %o",m,w)}}},F=function(m){if(!m){V();return}nt||(ve("subscribe-worker-queue",{id:Pl}).catch(d=>{t("subscribe-worker-queue failed: %o",d)}),nt=()=>ve("unsubscribe-worker-queue",{id:Pl}))},V=function(){nt&&(nt().catch(()=>{}),nt=null)},fe=function(m){if(!m){we();return}ae||(ve("subscribe-monitor-pipeline",{id:Ml}).catch(d=>{t("subscribe-monitor-pipeline failed: %o",d)}),ae=()=>ve("unsubscribe-monitor-pipeline",{id:Ml}))},we=function(){ae&&(ae().catch(()=>{}),ae=null)},je=function(){Ee||(ve("subscribe-ui-order",{id:Nl}).catch(m=>{t("subscribe-ui-order failed: %o",m)}),Ee=()=>ve("unsubscribe-ui-order",{id:Nl}))},rt=function(){Ee&&(Ee().catch(()=>{}),Ee=null),K.clear()},ze=function(){xe||(ve("subscribe-display-policy",{id:Fl}).catch(m=>{t("subscribe-display-policy failed: %o",m)}),xe=()=>ve("unsubscribe-display-policy",{id:Fl}))},ke=function(){xe&&(xe().catch(()=>{}),xe=null),Ae.clear()},vt=function(){pt||(ve("subscribe-exec-presets",{id:ql}).catch(m=>{t("subscribe-exec-presets failed: %o",m)}),pt=()=>ve("unsubscribe-exec-presets",{id:ql}))},ue=function(m){if(!m)return"Unknown";let d=m.split("/").filter(Boolean);return d.length>0?d[d.length-1]:"Unknown"};var u=Se,f=S,_=k,h=P,E=Le,T=tt,R=bt,U=dt,$=it,Y=st,Q=Re,j=gt,O=F,x=V,N=fe,I=we,ie=je,ye=rt,oe=ze,me=ke,Oe=vt,Je=ue;let et=document.getElementById("header-loading"),Ie=$a(et),Ve=Hi(e),de=Ol(),ve=Ie.wrapSend((m,d)=>de.send(m,d)),_e=ga(ve),H=ha(),G=ya(),ge=ta(),K=ba(),Ae=Jo(),B=ea(),D=ra();de.on("exec-presets-snapshot",m=>{let d=m;d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&B.set({revision:d.revision,presets:d.presets})}),de.on("monitor-pipeline-snapshot",m=>{let d=m;if(!(!d||!Array.isArray(d.workspaces)))try{ge.set(d.workspaces,d.workspaces_state)}catch{}}),de.on("ui-order-snapshot",m=>{let d=m;if(d&&typeof d.revision=="number")try{K.set({revision:d.revision,order:d.order&&typeof d.order=="object"?d.order:{}})}catch{}}),de.on("display-policy-snapshot",m=>{let d=m;if(d&&d.policy&&typeof d.policy=="object")try{Ae.set(d.policy)}catch{}}),de.on("session-log-snapshot",m=>{let d=m;if(d&&typeof d.attempt_id=="string")try{D.set(d.attempt_id,Array.isArray(d.lines)?d.lines:[],typeof d.last_event_at=="number"?d.last_event_at:null)}catch{}}),de.on("session-log-append",m=>{let d=m;if(d&&typeof d.attempt_id=="string")try{D.append(d.attempt_id,d.event)}catch{}}),de.on("snapshot",m=>{let d=m,w=d&&typeof d.id=="string"?d.id:"",y=w?H.getStore(w):null;if(y&&d&&d.type==="snapshot")try{y.applyPush(d)}catch{}}),de.on("upsert",m=>{let d=m,w=d&&typeof d.id=="string"?d.id:"",y=w?H.getStore(w):null;if(y&&d&&d.type==="upsert")try{y.applyPush(d)}catch{}}),de.on("delete",m=>{let d=m,w=d&&typeof d.id=="string"?d.id:"",y=w?H.getStore(w):null;if(y&&d&&d.type==="delete")try{y.applyPush(d)}catch{}});let te=null,De=null,Ce=null,Ne=null,Te=()=>{},We=new Promise(m=>{Te=()=>m(void 0)}),Pe=!1,C=!1;async function A(m){let d=S(m);if(d===De||d===Ce)return;Ce=d;let w=`detail:${m}`,y={type:"issue-detail",params:{id:m}};try{H.register(w,y)}catch(M){t("register detail store failed: %o",M)}try{let M=await _e.subscribeList(w,y);if(se.getState().selected_id!==m||S(m)!==d){await M().catch(()=>{});return}te&&await te().catch(()=>{}),te=M,De=d}catch(M){t("detail subscribe failed: %o",M),Se(M,"issue details")}finally{Ce===d&&(Ce=null)}}let re=new Map,X=new Set,le={board:0,worker:0},at=Et;try{let m=window.localStorage.getItem(Bl);Ot(m)&&(at=m)}catch{}let Ye=Et;try{let m=window.localStorage.getItem(ff);Ot(m)&&(Ye=m)}catch{}async function yt(m){if(!Ot(m)||m===at)return;at=m;try{window.localStorage.setItem(Bl,m)}catch{}let d=re.get(hr);if(!d)return;re.delete(hr),await d().catch(()=>{});let w=bt();try{H.register(hr,w)}catch(y){t("register %s store failed: %o",hr,y)}try{let y=await _e.subscribeList(hr,w);re.set(hr,y)}catch(y){t("re-subscribe %s failed: %o",hr,y),Se(y,"board")}}async function It(m){if(!Ot(m)||m===Ye)return;Ye=m;let d=lt.get(gr);if(!d)return;lt.delete(gr),await d().catch(()=>{});let w=dt();try{H.register(gr,w)}catch(y){t("register %s store failed: %o",gr,y)}try{let y=await _e.subscribeList(gr,w);lt.set(gr,y)}catch(y){t("re-subscribe %s failed: %o",gr,y),Se(y,"worker")}}let lt=new Map,nt=null,ae=null,Ee=null,xe=null,pt=null;async function Vt(){xe=null,Ae.clear(),pt=null,B.clear(),nt=null,ae=null,re.clear(),lt.clear(),le.board+=1,le.worker+=1,vt();let m=se.getState().workspace.current?.path;if(m)try{await de.send("set-workspace",{path:m})}catch(w){t("workspace restore after reconnect failed: %o",w);return}ze();let d=se.getState();it(d.view==="board"),Re(d.view==="worker"),fe(d.view==="monitor"),F(d.view==="board"||d.view==="worker"||!!d.selected_id)}async function p(){t("clearing all subscriptions for workspace switch"),st(),gt(),V(),G.clear(),rt(),je(),ke(),ze(),k();let m=se.getState();if(m.selected_id)try{H.unregister(`detail:${m.selected_id}`)}catch{}let d=se.getState();it(d.view==="board"),Re(d.view==="worker"),fe(d.view==="monitor"),F(d.view==="board"||d.view==="worker"||!!d.selected_id),d.selected_id&&P(d.selected_id)}async function v(m){t("requesting workspace switch to %s",m),C=!0;try{let d=await de.send("set-workspace",{path:m});t("workspace switch result: %o",d),d&&d.workspace&&(se.setState({workspace:{current:{path:d.workspace.root_dir,database:d.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),d.changed&&(await p(),Z("Switched to "+ue(m),"success",2e3)))}catch(d){throw t("workspace switch failed: %o",d),Z("Failed to switch workspace","error",3e3),d}finally{C=!1}}async function L(m){t("requesting workspace git pull for %s",m);try{let d=await de.send("git-pull-workspace",{});t("workspace git pull result: %o",d);let w=d?.status;if(w==="up_to_date"){Z("Already up to date","success",2e3);return}if(w==="stash_pop_conflict"){Z("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Z("Git pulled "+ue(m),"success",2e3)}catch(d){t("workspace git pull failed: %o",d);let w=d?.code,y=d?.message;if(w==="rebase_conflict"){Z("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(w==="rebase_conflict_abort_failed"){Z("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(w==="busy"){Z("Git pull skipped: another operation is running","warning",3e3);return}let M=y?`: ${y}`:"";throw Z(`Git pull failed${M}`,"error",3e3),d}}async function ee(m,d){t("setting workspace visibility %s \u2192 %s",m,String(d));try{await de.send("set-workspace-visibility",{path:m,visible:d}),await be()}catch(w){t("workspace visibility update failed: %o",w),Z("Failed to update project visibility","error",3e3)}}async function be(){try{let m=await de.send("list-workspaces",{});if(t("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let d=m.workspaces.map(J=>({path:J.path,database:J.database,pid:J.pid,version:J.version})),w=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,y=Array.isArray(m.hidden)?m.hidden.filter(J=>typeof J=="string"):[];se.setState({workspace:{current:w,available:d,hidden:y}});let M=window.localStorage.getItem("beads-ui.workspace");M&&(!d.some($e=>$e.path===M)||y.includes(M)?window.localStorage.removeItem("beads-ui.workspace"):w&&M!==w.path&&(t("restoring saved workspace preference: %s",M),await v(M)))}}catch(m){t("failed to load workspaces: %o",m)}}de.on("workspace-changed",m=>{t("workspace-changed event: %o",m),m&&m.root_dir&&(se.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),be(),p())});let ce=!1;if(typeof de.onConnection=="function"){let m=d=>{t("ws state %s",d),d==="reconnecting"||d==="closed"?(ce=!0,Z("Connection lost. Reconnecting\u2026","error",4e3)):d==="open"&&ce&&(ce=!1,Z("Reconnected","success",2200),pf(se,(w,y)=>{t(`${w}: %o`,y)}),Vt())};de.onConnection(m)}let qe="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker"||m==="monitor")&&(qe=m)}catch(m){t("view parse error: %o",m)}let se=ka({config:uf(),view:qe});de.on("worker-queue-snapshot",m=>{let d=m;if(!d||!d.queue)return;let w=se.getState().workspace.current?.path;if(typeof w=="string"&&w.length>0&&d.root_dir!==w){t("dropping worker-queue snapshot for %s",String(d.root_dir));return}try{G.set(d.queue)}catch{}});let Ke=va(se);Ke.start();let Pt=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),ht=async(m,d)=>{try{return await ve(m,d)}catch(w){if(Pt.has(m))throw w;return[]}};n&&_l(n,se,Ke);let ft=document.getElementById("workspace-picker");ft&&Rl(ft,se,v,L,ee);let wt=bl(e,(m,d)=>ve(m,d));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>wt.open())}catch{}let pe=zi(e,{policyStore:Ae,transport:(m,d)=>ve(m,d),labelOptions:()=>{let m=new Set;for(let[d]of ko)for(let w of H.snapshotFor(d)||[]){let y=w.labels;if(Array.isArray(y))for(let M of y)typeof M=="string"&&M.length>0&&m.add(M)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&m.addEventListener("click",()=>pe.open())}catch{}let b=La(o,{gotoIssue:m=>Ke.gotoIssue(m),issueStores:H,transport:ht,workerQueueStore:G,uiOrderStore:K,displayPolicyStore:Ae,closedRange:at,onClosedRangeChange:m=>{yt(m)},onNewIssue:()=>wt.open()}),W=yo(a,{transport:ht,issueStores:H,queueStore:G,execPresetStore:B,sessionLogStore:D,uiOrderStore:K,gotoIssue:m=>se.setState({selected_id:m}),getWorkspacePath:()=>se.getState().workspace.current?.path,doneRange:Ye,onDoneRangeChange:m=>{It(m)}}),z=fl(i,{transport:ht,pipelineStore:ge,execPresetStore:B,gotoIssue:m=>Ke.gotoIssue(m),getWorkspacePath:()=>se.getState().workspace.current?.path,switchWorkspace:m=>v(m)}),he=Ui(l,{issueStores:H,transport:ht,queueStore:G,execPresetStore:B,sessionLogStore:D,getWorkspacePath:()=>se.getState().workspace.current?.path,onNavigate:m=>{se.getState().view==="worker"?se.setState({selected_id:m}):Ke.gotoIssue(m)},onClose:()=>{let m=se.getState();se.setState({selected_id:null});try{Ke.gotoView(m.view==="worker"||m.view==="monitor"?m.view:"board")}catch{}},onOpenExecPresets:()=>{se.setState({selected_id:null}),Ke.gotoView("worker"),W.openExecDefaults()}}),Ze=se.getState().selected_id;Ze&&(l.hidden=!1,he.load(Ze),P(Ze)),se.subscribe(m=>{let d=m.selected_id;d?(l.hidden=!1,he.load(d),C||P(d)):(he.clear(),l.hidden=!0,k())});let Qe=m=>{o.hidden=m.view!=="board",a.hidden=m.view!=="worker",i.hidden=m.view!=="monitor",it(m.view==="board"),Re(m.view==="worker"),fe(m.view==="monitor"),F(m.view==="board"||m.view==="worker"||!!m.selected_id),!m.selected_id&&m.view==="board"&&b.load(),m.view==="worker"&&W.load(),m.view==="monitor"?z.load():z.pause(),window.localStorage.setItem("beads-ui.view",m.view)};se.subscribe(Qe),Qe(se.getState()),je(),ze(),vt(),be().finally(()=>{Pe=!0,Te()}),window.addEventListener("keydown",m=>{let d=m.ctrlKey||m.metaKey,w=String(m.key||"").toLowerCase(),y=m.target,M=y&&y.tagName?String(y.tagName).toLowerCase():"",J=M==="input"||M==="textarea"||M==="select"||y&&typeof y.isContentEditable=="boolean"&&y.isContentEditable;d&&w==="n"&&(J||(m.preventDefault(),wt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&_f(t)});export{_f as bootstrap,uf as readBootstrapConfig,pf as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
