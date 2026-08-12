var ec=Object.create;var _s=Object.defineProperty;var tc=Object.getOwnPropertyDescriptor;var rc=Object.getOwnPropertyNames;var nc=Object.getPrototypeOf,sc=Object.prototype.hasOwnProperty;var oc=(e,t,r)=>t in e?_s(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var ms=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ac=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of rc(t))!sc.call(e,s)&&s!==r&&_s(e,s,{get:()=>t[s],enumerable:!(n=tc(t,s))||n.enumerable});return e};var ic=(e,t,r)=>(r=e!=null?ec(nc(e)):{},ac(t||!e||!e.__esModule?_s(r,"default",{value:e,enumerable:!0}):r,e));var Qe=(e,t,r)=>oc(e,typeof t!="symbol"?t+"":t,r);var oa=ms((Sf,sa)=>{var Ir=1e3,Lr=Ir*60,Or=Lr*60,$r=Or*24,pc=$r*7,fc=$r*365.25;sa.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return _c(e);if(r==="number"&&isFinite(e))return t.long?gc(e):mc(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function _c(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*fc;case"weeks":case"week":case"w":return r*pc;case"days":case"day":case"d":return r*$r;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Or;case"minutes":case"minute":case"mins":case"min":case"m":return r*Lr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Ir;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function mc(e){var t=Math.abs(e);return t>=$r?Math.round(e/$r)+"d":t>=Or?Math.round(e/Or)+"h":t>=Lr?Math.round(e/Lr)+"m":t>=Ir?Math.round(e/Ir)+"s":e+"ms"}function gc(e){var t=Math.abs(e);return t>=$r?Tn(e,t,$r,"day"):t>=Or?Tn(e,t,Or,"hour"):t>=Lr?Tn(e,t,Lr,"minute"):t>=Ir?Tn(e,t,Ir,"second"):e+" ms"}function Tn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var ia=ms((Af,aa)=>{function hc(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=i,r.humanize=oa(),r.destroy=u,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let _=0;for(let b=0;b<p.length;b++)_=(_<<5)-_+p.charCodeAt(b),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(p){let _,b=null,E,T;function C(...B){if(!C.enabled)return;let x=C,Y=Number(new Date),Q=Y-(_||Y);x.diff=Q,x.prev=_,x.curr=Y,_=Y,B[0]=r.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let O=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(S,j)=>{if(S==="%%")return"%";O++;let I=r.formatters[j];if(typeof I=="function"){let ie=B[O];S=I.call(x,ie),B.splice(O,1),O--}return S}),r.formatArgs.call(x,B),(x.log||r.log).apply(x,B)}return C.namespace=p,C.useColors=r.useColors(),C.color=r.selectColor(p),C.extend=n,C.destroy=r.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(E!==r.namespaces&&(E=r.namespaces,T=r.enabled(p)),T),set:B=>{b=B}}),typeof r.init=="function"&&r.init(C),C}function n(p,_){let b=r(this.namespace+(typeof _>"u"?":":_)+p);return b.log=this.log,b}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let _=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of _)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(p,_){let b=0,E=0,T=-1,C=0;for(;b<p.length;)if(E<_.length&&(_[E]===p[b]||_[E]==="*"))_[E]==="*"?(T=E,C=b,E++):(b++,E++);else if(T!==-1)E=T+1,C++,b=C;else return!1;for(;E<_.length&&_[E]==="*";)E++;return E===_.length}function a(){let p=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),p}function i(p){for(let _ of r.skips)if(o(p,_))return!1;for(let _ of r.names)if(o(p,_))return!0;return!1}function l(p){return p instanceof Error?p.stack||p.message:p}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}aa.exports=hc});var la=ms((Et,En)=>{Et.formatArgs=vc;Et.save=yc;Et.load=wc;Et.useColors=bc;Et.storage=kc();Et.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Et.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function bc(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function vc(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+En.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Et.log=console.debug||console.log||(()=>{});function yc(e){try{e?Et.storage.setItem("debug",e):Et.storage.removeItem("debug")}catch{}}function wc(){let e;try{e=Et.storage.getItem("debug")||Et.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function kc(){try{return localStorage}catch{}}En.exports=ia()(Et);var{formatters:$c}=En.exports;$c.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Yr=globalThis,An=Yr.trustedTypes,Ho=An?An.createPolicy("lit-html",{createHTML:e=>e}):void 0,Zo="$lit$",ir=`lit$${Math.random().toFixed(9).slice(2)}$`,Xo="?"+ir,lc=`<${Xo}>`,yr=document,Vr=()=>yr.createComment(""),Kr=e=>e===null||typeof e!="object"&&typeof e!="function",ks=Array.isArray,cc=e=>ks(e)||typeof e?.[Symbol.iterator]=="function",gs=`[ 	
\f\r]`,Gr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Wo=/-->/g,Go=/>/g,br=RegExp(`>|${gs}(?:([^\\s"'>=/]+)(${gs}*=${gs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Yo=/'/g,Vo=/"/g,Qo=/^(?:script|style|textarea|title)$/i,$s=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=$s(1),Zt=$s(2),bf=$s(3),wr=Symbol.for("lit-noChange"),ct=Symbol.for("lit-nothing"),Ko=new WeakMap,vr=yr.createTreeWalker(yr,129);function Jo(e,t){if(!ks(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ho!==void 0?Ho.createHTML(t):t}var dc=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Gr;for(let i=0;i<r;i++){let l=e[i],u,p,_=-1,b=0;for(;b<l.length&&(a.lastIndex=b,p=a.exec(l),p!==null);)b=a.lastIndex,a===Gr?p[1]==="!--"?a=Wo:p[1]!==void 0?a=Go:p[2]!==void 0?(Qo.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=br):p[3]!==void 0&&(a=br):a===br?p[0]===">"?(a=s??Gr,_=-1):p[1]===void 0?_=-2:(_=a.lastIndex-p[2].length,u=p[1],a=p[3]===void 0?br:p[3]==='"'?Vo:Yo):a===Vo||a===Yo?a=br:a===Wo||a===Go?a=Gr:(a=br,s=void 0);let E=a===br&&e[i+1].startsWith("/>")?" ":"";o+=a===Gr?l+lc:_>=0?(n.push(u),l.slice(0,_)+Zo+l.slice(_)+ir+E):l+ir+(_===-2?i:E)}return[Jo(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Zr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,p]=dc(t,r);if(this.el=e.createElement(u,n),vr.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=vr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(Zo)){let b=p[a++],E=s.getAttribute(_).split(ir),T=/([.?@])?(.*)/.exec(b);l.push({type:1,index:o,name:T[2],strings:E,ctor:T[1]==="."?bs:T[1]==="?"?vs:T[1]==="@"?ys:Rr}),s.removeAttribute(_)}else _.startsWith(ir)&&(l.push({type:6,index:o}),s.removeAttribute(_));if(Qo.test(s.tagName)){let _=s.textContent.split(ir),b=_.length-1;if(b>0){s.textContent=An?An.emptyScript:"";for(let E=0;E<b;E++)s.append(_[E],Vr()),vr.nextNode(),l.push({type:2,index:++o});s.append(_[b],Vr())}}}else if(s.nodeType===8)if(s.data===Xo)l.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(ir,_+1))!==-1;)l.push({type:7,index:o}),_+=ir.length-1}o++}}static createElement(t,r){let n=yr.createElement("template");return n.innerHTML=t,n}};function Cr(e,t,r=e,n){if(t===wr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Kr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Cr(e,s._$AS(e,t.values),s,n)),t}var hs=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??yr).importNode(r,!0);vr.currentNode=s;let o=vr.nextNode(),a=0,i=0,l=n[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new Xr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new ws(o,this,t)),this._$AV.push(u),l=n[++i]}a!==l?.index&&(o=vr.nextNode(),a++)}return vr.currentNode=yr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Xr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=ct,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Cr(this,t,r),Kr(t)?t===ct||t==null||t===""?(this._$AH!==ct&&this._$AR(),this._$AH=ct):t!==this._$AH&&t!==wr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):cc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ct&&Kr(this._$AH)?this._$AA.nextSibling.data=t:this.T(yr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Zr.createElement(Jo(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new hs(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Ko.get(t.strings);return r===void 0&&Ko.set(t.strings,r=new Zr(t)),r}k(t){ks(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Vr()),this.O(Vr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Rr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=ct,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ct}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Cr(this,t,r,0),a=!Kr(t)||t!==this._$AH&&t!==wr,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=Cr(this,i[n+l],r,l),u===wr&&(u=this._$AH[l]),a||(a=!Kr(u)||u!==this._$AH[l]),u===ct?t=ct:t!==ct&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===ct?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},bs=class extends Rr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ct?void 0:t}},vs=class extends Rr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ct)}},ys=class extends Rr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Cr(this,t,r,0)??ct)===wr)return;let n=this._$AH,s=t===ct&&n!==ct||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==ct&&(n===ct||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ws=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Cr(this,t)}};var uc=Yr.litHtmlPolyfillSupport;uc?.(Zr,Xr),(Yr.litHtmlVersions??(Yr.litHtmlVersions=[])).push("3.3.1");var Pe=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Xr(t.insertBefore(Vr(),o),o,void 0,r??{})}return s._$AI(e),s};var Ct="today",Ht=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ot(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function kr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ea(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ta(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ra(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function na(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var ca=ic(la(),1);function ot(e){return(0,ca.default)(`beads-ui:${e}`)}function qt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function xr(e,t){let r=qt(e.created_at),n=qt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function pa(e,t){let r=qt(e.created_at),n=qt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function fa(e,t){let r=qt(e.updated_at),n=qt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function _a(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=qt(e.created_at),o=qt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ma(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var xc=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function da(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ua(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=xc.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ga(e,t){let r=da(e),n=da(t);if(r!==n)return r<n?-1:1;let s=ua(e),o=ua(t);if(s!==o)return s<o?-1:1;let a=qt(e&&e.created_at),i=qt(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var xs=2**20;function Dr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-qt(e&&e.created_at)}function Cn(e){return(t,r)=>{let n=Dr(t,e),s=Dr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Ss(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Dr(i,r)-xs};if(!i)return{rank:Dr(a,r)+xs};let l=Dr(a,r),u=Dr(i,r),p=(l+u)/2;return l<p&&p<u?{rank:p}:{renormalize:n.map((_,b)=>({bead_id:_.id,rank:b*xs}))}}function As(e,t={}){let r=ot(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||xr;function u(){for(let b of Array.from(a))try{b()}catch{}}function p(){s=Array.from(n.values()).sort(l)}function _(b){if(i||!b||b.id!==e)return;let E=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,E),!(E<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(E<=o)return;n.clear();let T=Array.isArray(b.issues)?b.issues:[];for(let C of T)C&&typeof C.id=="string"&&C.id.length>0&&n.set(C.id,C);p(),o=E,u();return}if(b.type==="upsert"){let T=b.issue;if(T&&typeof T.id=="string"&&T.id.length>0){let C=n.get(T.id);if(!C)n.set(T.id,T);else{let B=Number.isFinite(C.updated_at)?C.updated_at:0,x=Number.isFinite(T.updated_at)?T.updated_at:0;if(B<=x){for(let Y of Object.keys(C))Y in T||delete C[Y];for(let[Y,Q]of Object.entries(T))C[Y]=Q}}p()}o=E,u()}else if(b.type==="delete"){let T=String(b.issue_id||"");T&&(n.delete(T),p()),o=E,u()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function Rn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function ha(e){let t=ot("subs"),r=new Map,n=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let p=Array.isArray(l.added)?l.added:[],_=Array.isArray(l.updated)?l.updated:[],b=Array.isArray(l.removed)?l.removed:[];for(let E of Array.from(u)){let T=r.get(E);if(!T)continue;let C=T.itemsById;for(let B of p)typeof B=="string"&&B.length>0&&C.set(B,!0);for(let B of _)typeof B=="string"&&B.length>0&&C.set(B,!0);for(let B of b)typeof B=="string"&&B.length>0&&C.delete(B)}}async function o(i,l){let u=Rn(l);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let _=r.get(i);if(_&&_.key!==u){let b=n.get(_.key);b&&(b.delete(i),b.size===0&&n.delete(_.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let p=n.get(u);p&&p.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(_){let b=r.get(i)||null;if(b){let E=n.get(b.key);E&&(E.delete(i),E.size===0&&n.delete(b.key))}throw r.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let _=r.get(i)||null;if(_){let b=n.get(_.key);b&&(b.delete(i),b.size===0&&n.delete(_.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Rn,selectors:{getIds(i){let l=r.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=r.get(i);return u?u.itemsById.has(l):!1},count(i){let l=r.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=r.get(i),u={};if(!l)return u;for(let p of l.itemsById.keys())u[p]=!0;return u}}}}function ba(){let e=ot("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,u,p){let _=u?Rn(u):"",b=r.get(l)||"",E=t.has(l);if(e("register %s key=%s (prev=%s)",l,_,b),E&&b&&_&&b!==_){let T=t.get(l);if(T)try{T.dispose()}catch{}let C=s.get(l);if(C){try{C()}catch{}s.delete(l)}let B=As(l,p);t.set(l,B);let x=B.subscribe(()=>o());s.set(l,x)}else if(!E){let T=As(l,p);t.set(l,T);let C=T.subscribe(()=>o());s.set(l,C)}return r.set(l,_),()=>i(l)}function i(l){e("unregister %s",l),r.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let p=s.get(l);if(p){try{p()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function va(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ya(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ts(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Sc(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Ac(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function wa(e){let t=ot("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Sc(n),a=Ac(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ts(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ts(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Tc=Object.freeze({workspace_config:{default_workspace:null}});function ka(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Tc.workspace_config.default_workspace}}}function $a(e={}){let t=ot("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:ka(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?ka(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,p)=>u!==r.workspace.hidden[p]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,p)=>u===r.worker.show_closed_children[p])&&!i&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function xa(e){let t=ot("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function l(u){return async(_,b)=>{let E=s++,T=Date.now();n.set(E,{type:_,start_ts:T}),t("request start id=%d type=%s count=%d",E,_,r+1),a();let C=!1,B=()=>{C||(C=!0,n.delete(E),i())},x=setTimeout(()=>{C||(t("request TIMEOUT id=%d type=%s elapsed=%dms",E,_,Date.now()-T),B())},3e4);try{let Y=await u(_,b),Q=Date.now()-T;return t("request done id=%d type=%s elapsed=%dms",E,_,Q),Y}catch(Y){let Q=Date.now()-T;throw t("request error id=%d type=%s elapsed=%dms err=%o",E,_,Q,Y),Y}finally{clearTimeout(x),B()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([p,_])=>({id:p,type:_.type,elapsed_ms:u-_.start_ts}))}}}function Z(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function In(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(ma),l;switch(i){case"created_desc":return l.sort(xr),l;case"created_asc":return l.sort(pa),l;case"updated_desc":return l.sort(fa),l;case"priority":return l.sort(_a),l;case"manual":default:{let u=r();return u?l.sort(Cn(u)):l.sort(xr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Xt(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function bt(e){let t=Xt(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Rt(e,t){let r=Xt(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Ln(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Xt(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function On(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},p=n(Ss(i,l,u.order),a);s(u,p);let _=await t("ui-order-set",{expected_revision:u.revision,entries:p});if(_&&_.conflict){let b={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(b);let E=n(Ss(i,l,b.order),a);s(b,E);let T=await t("ui-order-set",{expected_revision:b.revision,entries:E});T&&T.applied&&r.set({revision:typeof T.revision=="number"?T.revision:0,order:T.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function Dn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Es(e,t){return!t||typeof e!="string"||e.length===0||Dn(t.visible_labels).includes(e)?!0:Dn(t.hidden_labels).includes(e)?!1:!Dn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Mn(e,t){return Dn(e).filter(r=>Es(r,t))}function lr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Ec={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Aa={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Sa={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Cc={review:"\u2713",skip:"\u2298"},cr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Rc(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ta(e){let t=e&&e.fill||"none";return t==="none"?cr.none:e&&e.stale===!0?cr.stale:t==="dim"?cr.dim:e&&e.glyph==="review"?cr.review:e&&e.glyph==="skip"?cr.skip:cr.done}function Ic(e){if(!e||e.fill==="none"||!e.approval_state)return Ta(e);let t=[];return e.glyph==="review"?t.push(cr.review):e.glyph==="skip"&&t.push(cr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Lc(e,t,r){let n=Ec[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Cc[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${l}>
        ${Aa[e]||e}
      </div>
    </div>
  `}function Pn(e,t){if(!e||!e.stages)return"";let r=Sa[e.route]||Sa.spec_backed,n=e.stages,s=Rc(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Aa[a]||a} ${a==="plan"?Ic(n[a]||{}):Ta(n[a]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Lc(a,n[a]||{},a===s))}
    </div>
  `}function Oc(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ea=2;function Dc(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Ea).join(", "),s=r.length-Ea,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Mc(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&lr(r,"route")){let a=n.route_source==="derived";s.push(c`<span
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
      </button>`),lr(r,"blocked")&&s.push(...Dc(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&lr(r,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 실패</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function Pc(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Nc(e){let t=Rt(e.created_at),r=Rt(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${bt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${bt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function qc(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(ga):r.children;return c`
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
      ${qc(e,t)}
    </article>
  `}function Mr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
  `}function Ca(e,t,r){return c`
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
  `}var Fc=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Bc=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Uc=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function jc(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
  `}function Ra(e,t,r){return c`
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
        ${Fc.map(n=>c`<option
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
  `}var zc=200,Hc={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Wc=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ia="beads-ui.board.sort",La=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Gc(){try{let e=window.localStorage.getItem(Ia);if(e&&La.has(e))return e}catch{}return"created_desc"}function Oa(e,t){let r=ot("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,p=t.onNewIssue,_=t.closedRange||Ct,b=s?In(s,a):null,E=On({transport:o,uiOrderStore:a}),T=[],C=[],B=[],x=[],Y=[],Q=[],O=!1,D=0,S=Gc(),j=new Map,I=new Map,ie=new Map,Re=new Set,oe={search:"",priority:"",type:"",labels:[]},pe=!1,Oe=null;function Ye(F){return String(F.status||"open")==="open"}function nt(F){let G=String(F.status||"open");return G==="open"||G==="blocked"}function Le(F){let G=oe.search.trim().toLowerCase(),ae=oe.priority,ue=oe.type,ye=oe.labels;return F.filter(Te=>{if(G){let Ue=String(Te.id||"").toLowerCase(),tt=String(Te.title||"").toLowerCase();if(!Ue.includes(G)&&!tt.includes(G))return!1}if(ae!==""&&String(Te.priority)!==ae||ue!==""&&String(Te.issue_type||"")!==ue)return!1;if(ye.length>0){let Ue=Array.isArray(Te.labels)?Te.labels:[];if(!ye.some(tt=>Ue.includes(tt)))return!1}return!0})}function He(){let F=new Set;for(let G of[T,C,B,x,Y,Q])for(let ae of G){let ue=Array.isArray(ae.labels)?ae.labels:[];for(let ye of ue)typeof ye=="string"&&ye.length>0&&F.add(ye)}return Array.from(F).sort()}function ke(){return oe.search.trim()!==""||oe.priority!==""||oe.type!==""||oe.labels.length>0}function ge(){try{if(b){let F=b.selectBoardColumn("tab:board:in-progress","in_progress",S),G=b.selectBoardColumn("tab:board:blocked","blocked",S).filter(nt),ae=new Set(F.map(we=>we.id)),ue=b.selectBoardColumn("tab:board:ready","ready",S).filter(we=>Ye(we)&&!ae.has(we.id)),ye=b.selectBoardColumn("tab:board:resolved","resolved",S),Te=b.selectBoardColumn("tab:board:deferred","deferred",S),Ue=b.selectBoardColumn("tab:board:closed","closed").slice(0,zc),tt=[...G,...ue,...F,...ye,...Ue];xe(tt);let Se=new Set;for(let we of tt)we&&we.id&&!Cs(we)&&Se.add(we.id);let je=!ke();T=je?Qr(G,Se):G,C=je?Qr(ue,Se):ue,B=je?Qr(F,Se):F,x=je?Qr(ye,Se):ye,Y=Te,D=Te.length,Q=je?Qr(Ue,Se):Ue,j=new Map;for(let we of T)j.set(we.id,"open");for(let we of C)j.set(we.id,"open");for(let we of B)j.set(we.id,"in_progress");for(let we of x)j.set(we.id,"resolved");for(let we of Y)j.set(we.id,"deferred");for(let we of Q)j.set(we.id,"closed");I=new Map;for(let we of T)I.set(we.id,"blocked-col");for(let we of C)I.set(we.id,"ready-col");for(let we of B)I.set(we.id,"in-progress-col");for(let we of x)I.set(we.id,"resolved-col");for(let we of Q)I.set(we.id,"closed-col")}Ze()}catch{T=[],C=[],B=[],x=[],Y=[],Q=[],ie=new Map,Ze()}}function xe(F){let G=new Map;for(let ue of F)ue&&ue.id&&!G.has(ue.id)&&G.set(ue.id,ue);let ae=new Map;for(let ue of G.values()){let ye=Cs(ue);if(!ye)continue;let Te=ae.get(ye);Te||(Te=[],ae.set(ye,Te)),Te.push({id:ue.id,title:ue.title,status:ue.status,metadata:ue.metadata,created_at:ue.created_at,updated_at:ue.updated_at})}ie=ae}function fe(F){let G=ie.get(F)||[],ae=0;for(let ye of G)(ye.status==="resolved"||ye.status==="closed")&&(ae+=1);let ue=Ln(G);return{total:G.length,count:ae,current:ue,children:G}}function be(F){return!Re.has(F)}function q(F,G){F.preventDefault(),F.stopPropagation(),Re.has(G)?Re.delete(G):Re.add(G),Ze()}function V(F,G){F.preventDefault(),F.stopPropagation(),n(G)}function K(F,G){F.preventDefault(),F.stopPropagation(),n(G)}function Ie(F,G){Oe||n(G)}function P(F,G){F.preventDefault(),F.stopPropagation(),Yc(G).then(ae=>{ae&&Z("\uBCF5\uC0AC\uB428","success",1200)})}function U(F,G){Oe=G,F.dataTransfer&&(F.dataTransfer.setData("text/plain",G),F.dataTransfer.effectAllowed="move"),F.target.classList.add("board-card--dragging")}function ee(F){F.target.classList.remove("board-card--dragging"),It(),setTimeout(()=>{Oe=null},0)}function ve(F){let G=String(F.target.value||"");!G||G===_||(_=G,u&&u(G),Ze())}function Ae(){return i?i.get():null}function Ve(F){let G=l?l.get():null,ae=G?G.cleanup_failed:null;if(!ae||typeof ae!="object"||Array.isArray(ae))return null;let ue=ae[F];return!ue||typeof ue!="object"||Array.isArray(ue)?null:ue}let $e={onCardClick:Ie,onCopyId:P,onDragStart:U,onDragEnd:ee,onClosedRangeChange:ve,rollupFor:fe,isExpanded:be,onRollupToggle:q,onChildClick:V,onFromChipClick:K,cleanupFailureFor:Ve,get policy(){return Ae()}};function Be(F,G){Oe||(J(),n(G))}function Ne(F,G){F.preventDefault(),F.stopPropagation(),J(),n(G)}let Ke={...$e,onCardClick:Be,onChildClick:Ne,onFromChipClick:Ne,get policy(){return Ae()}};function g(F){let G=F.target,ae=e.querySelector(".board-filter__labels");G&&ae&&ae.contains(G)||L()}function A(F){F.key==="Escape"&&L()}function w(){pe||(pe=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",A),Ze())}function L(){pe&&(pe=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",A),Ze())}function W(F){F.key==="Escape"&&J()}function X(){O||(O=!0,document.addEventListener("keydown",W),Ze())}function J(){O&&(O=!1,document.removeEventListener("keydown",W),Ze())}let Ee={onClose:J,onOverlayClick(F){F.target===F.currentTarget&&J()}},et={onSearchInput(F){oe.search=String(F.target.value||""),ge()},onPriorityChange(F){oe.priority=String(F.target.value||""),ge()},onTypeChange(F){oe.type=String(F.target.value||""),ge()},onSortChange(F){let G=String(F.target.value||"");if(!(!La.has(G)||G===S)){S=G;try{window.localStorage.setItem(Ia,G)}catch{}ge()}},onDeferredToggle(){O?J():X()},onLabelMenuToggle(){pe?L():w()},onLabelToggle(F){let G=oe.labels.indexOf(F);G===-1?oe.labels.push(F):oe.labels.splice(G,1),ge()},onLabelClear(){oe.labels.length!==0&&(oe.labels=[],ge())},onNewIssue(){p&&p()}};function at(){return c`
      <div class="board-view">
        ${Ra(oe,et,{sort_mode:S,deferred_popup_open:O,deferred_count:D,label_options:He(),label_menu_open:pe})}
        <div class="board-root">
          ${Mr({title:"Blocked",id:"blocked-col",items:Le(T)},$e)}
          ${Mr({title:"Ready",id:"ready-col",items:Le(C)},$e)}
          ${Mr({title:"In progress",id:"in-progress-col",items:Le(B)},$e)}
          ${Mr({title:"Resolved",id:"resolved-col",items:Le(x)},$e)}
          ${Mr({title:"Closed",id:"closed-col",items:Le(Q),is_closed:!0,closed_range:_},$e)}
        </div>
        ${O?Ca({items:Le(Y),count:D},Ke,Ee):""}
      </div>
    `}function Ze(){Pe(at(),e),vt()}function vt(){try{let F=e.querySelector("#deferred-popup");F&&!F.open&&(typeof F.showModal=="function"?F.showModal():F.setAttribute("open",""));let G=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ae of G)Array.from(ae.querySelectorAll(".board-card")).forEach((ye,Te)=>{ye.tabIndex=Te===0?0:-1})}catch{}}async function dt(F,G){if(!o){Z("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:F,status:G}),Z("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ae){r("update-status failed: %o",ae),Z("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function it(F){switch(F){case"blocked-col":return T;case"ready-col":return C;case"in-progress-col":return B;case"resolved-col":return x;default:return[]}}function yt(F,G,ae){if(!o||!a)return;let ue=it(F),ye=ue.find(je=>je.id===G);if(!ye)return;let Te=ue.filter(je=>je.id!==G),Ue=ae.closest?ae.closest(".board-card"):null,tt=Te.length;if(Ue){let je=Ue.getAttribute("data-issue-id");if(je===G)return;let we=Te.findIndex(ut=>ut.id===je);we>=0&&(tt=we)}let Se=Te.slice();Se.splice(tt,0,ye),E.applyReorder(G,Se,tt)}function It(){for(let F of Array.from(e.querySelectorAll(".board-column--drag-over")))F.classList.remove("board-column--drag-over")}let st=null;e.addEventListener("dragover",F=>{F.preventDefault(),F.dataTransfer&&(F.dataTransfer.dropEffect="move");let ae=F.target.closest(".board-column");ae&&ae!==st&&(st&&st.classList.remove("board-column--drag-over"),ae.classList.add("board-column--drag-over"),st=ae)}),e.addEventListener("dragleave",F=>{let G=F.relatedTarget;(!G||!e.contains(G))&&st&&(st.classList.remove("board-column--drag-over"),st=null)}),e.addEventListener("drop",F=>{F.preventDefault(),st&&(st.classList.remove("board-column--drag-over"),st=null);let G=F.target,ae=G.closest(".board-column");if(!ae)return;let ue=F.dataTransfer?.getData("text/plain")||"";if(!ue)return;let ye=ae.id,Te=I.get(ue);if(Te&&Te===ye){if(Wc.has(ye)){if(S!=="manual"){Z("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}yt(ye,ue,G)}return}let Ue=Hc[ye];if(!Ue){Z("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}j.get(ue)!==Ue&&dt(ue,Ue)}),e.addEventListener("keydown",F=>{let G=F.target;if(!(G instanceof HTMLElement))return;let ae=String(G.tagName||"").toLowerCase();if(ae==="input"||ae==="textarea"||ae==="select"||ae==="button"||ae==="a"||G.isContentEditable===!0)return;let ue=G.closest(".board-card");if(!ue)return;let ye=String(F.key||"");if(ye==="Enter"||ye===" "){F.preventDefault();let Se=ue.getAttribute("data-issue-id");Se&&n(Se);return}if(ye!=="ArrowUp"&&ye!=="ArrowDown"&&ye!=="ArrowLeft"&&ye!=="ArrowRight")return;F.preventDefault();let Te=ue.closest(".board-column");if(!Te)return;let Ue=Array.from(Te.querySelectorAll(".board-card")),tt=Ue.indexOf(ue);if(ye==="ArrowDown"&&tt<Ue.length-1){lt(ue,Ue[tt+1]);return}if(ye==="ArrowUp"&&tt>0){lt(ue,Ue[tt-1]);return}if(ye==="ArrowLeft"||ye==="ArrowRight"){let Se=Array.from(e.querySelectorAll(".board-column")),je=Se.indexOf(Te),we=ye==="ArrowRight"?1:-1,ut=je+we;for(;ut>=0&&ut<Se.length;){let wt=Se[ut].querySelector(".board-card");if(wt){lt(ue,wt);return}ut+=we}}});function lt(F,G){try{F.tabIndex=-1,G.tabIndex=0,G.focus()}catch{}}let rt=null;b&&b.subscribe&&(rt=b.subscribe(()=>{try{ge()}catch{}}));let Ce=null;i&&i.subscribe&&(Ce=i.subscribe(()=>{try{ge()}catch{}}));let gt=null;return l&&l.subscribe&&(gt=l.subscribe(()=>{Ze()})),{async load(){r("load"),ge()},clear(){L(),J(),rt&&(rt(),rt=null),Ce&&(Ce(),Ce=null),gt&&(gt(),gt=null),e.replaceChildren(),T=[],C=[],B=[],x=[],Y=[],Q=[],j=new Map,I=new Map}}}function Cs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Qr(e,t){return e.filter(r=>{let n=Cs(r);return!(n&&t.has(n))})}async function Yc(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Sr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Wt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function dr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Vc(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${Wt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Wt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(l=>{let u=p=>{typeof r.close=="function"&&r.close(),r.remove(),l(p)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function Qt(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Vc(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var qa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Jt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Jr=[...Jt,"reasoning_output_tokens"],Kc=["implementation","review-consult"];function Rs(e){let t=0;for(let r of Jt)t+=ft(e?.[r]);return t}function Zc(e){return!e||typeof e!="object"?!1:Jt.some(t=>Number.isFinite(e[t]))}function Da(e){return!e||typeof e!="object"?!1:Jr.some(t=>Number.isFinite(e[t]))}function Xc(e){let t={};for(let r of Jr)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Ma(e){let t={};for(let r of Jr)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Pa(e,t){return e==="codex"?ft(t.input_tokens)+ft(t.output_tokens):Rs(t)}function Qc(e){return e==="claude"?"Claude":"Codex"}function Jc(e){return`\u03C4 ${Fa(e)}`}function ed(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${ft(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${ft(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(qa),o.join(`
`)}function mt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Qc(r)} ${Jc(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:ed(r,n)})}return t}function Fn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let l of Jr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=ft(i.breakdown[l])+ft(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Is(e){return!e||typeof e!="object"?null:Dt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function td(e){return e==="codex"?"codex":"claude"}function ur(){return{subtotal:0,breakdown:Xc(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function qn(e,t,r){e.subtotal+=t.subtotal;for(let n of Jr)Number.isFinite(t.usage[n])&&(e.breakdown[n]=ft(e.breakdown[n])+ft(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Na(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Fa(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Pr(e){return Zc(e)?`\u03C4 ${Fa(Rs(e))}`:null}function Ft(e){let t=Pr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Nr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Rs(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(qa),r.join(`
`)}function Dt(e,t){let r={claude:ur(),codex:ur()},n={orchestrator:{claude:ur(),codex:ur()},implementation:{claude:ur(),codex:ur()},"review-consult":{claude:ur(),codex:ur()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(Da(l)){let p=td(i.runner),_=Ma(l),b={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:Pa(p,_)};_.replayed===!0&&(b.replayed=!0),typeof i.model=="string"&&(b.model=i.model),typeof i.session_id=="string"&&(b.session_id=i.session_id),qn(r[p],b,!0),qn(n.orchestrator[p],b,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of u){if(!p||p.provider!=="codex"||!Kc.includes(p.role)||!Da(p.usage))continue;let _=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let b=Ma(p.usage),E={provider:"codex",role:p.role,attempt_id:String(i.attempt_id||""),usage:b,subtotal:Pa("codex",b)};E.receipt_id=_,typeof p.model=="string"&&(E.model=p.model),typeof p.session_id=="string"?E.session_id=p.session_id:typeof p.thread_id=="string"&&(E.session_id=p.thread_id),typeof p.turn_id=="string"&&(E.turn_id=p.turn_id),typeof p.completed_at=="string"&&(E.completed_at=p.completed_at),b.replayed===!0&&(E.replayed=!0),qn(r.codex,E,!1),qn(n[E.role].codex,E,!1)}}let o={};for(let i of["claude","codex"]){let l=r[i];if(l.legs.length===0)continue;let u=Na(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let l={};for(let u of["claude","codex"]){let p=n[i][u];p.legs.length>0&&(l[u]={...Na(p,!0),legs:p.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:Va,setPrototypeOf:Ba,isFrozen:rd,getPrototypeOf:nd,getOwnPropertyDescriptor:sd}=Object,{freeze:xt,seal:Mt,create:qs}=Object,{apply:Fs,construct:Bs}=typeof Reflect<"u"&&Reflect;xt||(xt=function(t){return t});Mt||(Mt=function(t){return t});Fs||(Fs=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Bs||(Bs=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Bn=St(Array.prototype.forEach),od=St(Array.prototype.lastIndexOf),Ua=St(Array.prototype.pop),en=St(Array.prototype.push),ad=St(Array.prototype.splice),jn=St(String.prototype.toLowerCase),Ls=St(String.prototype.toString),Os=St(String.prototype.match),tn=St(String.prototype.replace),id=St(String.prototype.indexOf),ld=St(String.prototype.trim),Bt=St(Object.prototype.hasOwnProperty),$t=St(RegExp.prototype.test),rn=cd(TypeError);function St(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Fs(e,t,n)}}function cd(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Bs(e,r)}}function De(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:jn;Ba&&Ba(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(rd(t)||(t[n]=o),s=o)}e[s]=!0}return e}function dd(e){for(let t=0;t<e.length;t++)Bt(e,t)||(e[t]=null);return e}function er(e){let t=qs(null);for(let[r,n]of Va(e))Bt(e,r)&&(Array.isArray(n)?t[r]=dd(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=er(n):t[r]=n);return t}function nn(e,t){for(;e!==null;){let n=sd(e,t);if(n){if(n.get)return St(n.get);if(typeof n.value=="function")return St(n.value)}e=nd(e)}function r(){return null}return r}var ja=xt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ds=xt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ms=xt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ud=xt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ps=xt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),pd=xt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),za=xt(["#text"]),Ha=xt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ns=xt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Wa=xt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Un=xt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),fd=Mt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),_d=Mt(/<%[\w\W]*|[\w\W]*%>/gm),md=Mt(/\$\{[\w\W]*/gm),gd=Mt(/^data-[\-\w.\u00B7-\uFFFF]+$/),hd=Mt(/^aria-[\-\w]+$/),Ka=Mt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),bd=Mt(/^(?:\w+script|data):/i),vd=Mt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Za=Mt(/^html$/i),yd=Mt(/^[a-z][.\w]*(-[.\w]+)+$/i),Ga=Object.freeze({__proto__:null,ARIA_ATTR:hd,ATTR_WHITESPACE:vd,CUSTOM_ELEMENT:yd,DATA_ATTR:gd,DOCTYPE_NAME:Za,ERB_EXPR:_d,IS_ALLOWED_URI:Ka,IS_SCRIPT_OR_DATA:bd,MUSTACHE_EXPR:fd,TMPLIT_EXPR:md}),sn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},wd=function(){return typeof window>"u"?null:window},kd=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ya=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Xa(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:wd(),t=de=>Xa(de);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==sn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:b,trustedTypes:E}=e,T=l.prototype,C=nn(T,"cloneNode"),B=nn(T,"remove"),x=nn(T,"nextSibling"),Y=nn(T,"childNodes"),Q=nn(T,"parentNode");if(typeof a=="function"){let de=r.createElement("template");de.content&&de.content.ownerDocument&&(r=de.content.ownerDocument)}let O,D="",{implementation:S,createNodeIterator:j,createDocumentFragment:I,getElementsByTagName:ie}=r,{importNode:Re}=n,oe=Ya();t.isSupported=typeof Va=="function"&&typeof Q=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:pe,ERB_EXPR:Oe,TMPLIT_EXPR:Ye,DATA_ATTR:nt,ARIA_ATTR:Le,IS_SCRIPT_OR_DATA:He,ATTR_WHITESPACE:ke,CUSTOM_ELEMENT:ge}=Ga,{IS_ALLOWED_URI:xe}=Ga,fe=null,be=De({},[...ja,...Ds,...Ms,...Ps,...za]),q=null,V=De({},[...Ha,...Ns,...Wa,...Un]),K=Object.seal(qs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ie=null,P=null,U=Object.seal(qs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ee=!0,ve=!0,Ae=!1,Ve=!0,$e=!1,Be=!0,Ne=!1,Ke=!1,g=!1,A=!1,w=!1,L=!1,W=!0,X=!1,J="user-content-",Ee=!0,et=!1,at={},Ze=null,vt=De({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),dt=null,it=De({},["audio","video","img","source","image","track"]),yt=null,It=De({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),st="http://www.w3.org/1998/Math/MathML",lt="http://www.w3.org/2000/svg",rt="http://www.w3.org/1999/xhtml",Ce=rt,gt=!1,F=null,G=De({},[st,lt,rt],Ls),ae=De({},["mi","mo","mn","ms","mtext"]),ue=De({},["annotation-xml"]),ye=De({},["title","style","font","a","script"]),Te=null,Ue=["application/xhtml+xml","text/html"],tt="text/html",Se=null,je=null,we=r.createElement("form"),ut=function(v){return v instanceof RegExp||v instanceof Function},wt=function(){let v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(je&&je===v)){if((!v||typeof v!="object")&&(v={}),v=er(v),Te=Ue.indexOf(v.PARSER_MEDIA_TYPE)===-1?tt:v.PARSER_MEDIA_TYPE,Se=Te==="application/xhtml+xml"?Ls:jn,fe=Bt(v,"ALLOWED_TAGS")?De({},v.ALLOWED_TAGS,Se):be,q=Bt(v,"ALLOWED_ATTR")?De({},v.ALLOWED_ATTR,Se):V,F=Bt(v,"ALLOWED_NAMESPACES")?De({},v.ALLOWED_NAMESPACES,Ls):G,yt=Bt(v,"ADD_URI_SAFE_ATTR")?De(er(It),v.ADD_URI_SAFE_ATTR,Se):It,dt=Bt(v,"ADD_DATA_URI_TAGS")?De(er(it),v.ADD_DATA_URI_TAGS,Se):it,Ze=Bt(v,"FORBID_CONTENTS")?De({},v.FORBID_CONTENTS,Se):vt,Ie=Bt(v,"FORBID_TAGS")?De({},v.FORBID_TAGS,Se):er({}),P=Bt(v,"FORBID_ATTR")?De({},v.FORBID_ATTR,Se):er({}),at=Bt(v,"USE_PROFILES")?v.USE_PROFILES:!1,ee=v.ALLOW_ARIA_ATTR!==!1,ve=v.ALLOW_DATA_ATTR!==!1,Ae=v.ALLOW_UNKNOWN_PROTOCOLS||!1,Ve=v.ALLOW_SELF_CLOSE_IN_ATTR!==!1,$e=v.SAFE_FOR_TEMPLATES||!1,Be=v.SAFE_FOR_XML!==!1,Ne=v.WHOLE_DOCUMENT||!1,A=v.RETURN_DOM||!1,w=v.RETURN_DOM_FRAGMENT||!1,L=v.RETURN_TRUSTED_TYPE||!1,g=v.FORCE_BODY||!1,W=v.SANITIZE_DOM!==!1,X=v.SANITIZE_NAMED_PROPS||!1,Ee=v.KEEP_CONTENT!==!1,et=v.IN_PLACE||!1,xe=v.ALLOWED_URI_REGEXP||Ka,Ce=v.NAMESPACE||rt,ae=v.MATHML_TEXT_INTEGRATION_POINTS||ae,ue=v.HTML_INTEGRATION_POINTS||ue,K=v.CUSTOM_ELEMENT_HANDLING||{},v.CUSTOM_ELEMENT_HANDLING&&ut(v.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(K.tagNameCheck=v.CUSTOM_ELEMENT_HANDLING.tagNameCheck),v.CUSTOM_ELEMENT_HANDLING&&ut(v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(K.attributeNameCheck=v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),v.CUSTOM_ELEMENT_HANDLING&&typeof v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(K.allowCustomizedBuiltInElements=v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),$e&&(ve=!1),w&&(A=!0),at&&(fe=De({},za),q=[],at.html===!0&&(De(fe,ja),De(q,Ha)),at.svg===!0&&(De(fe,Ds),De(q,Ns),De(q,Un)),at.svgFilters===!0&&(De(fe,Ms),De(q,Ns),De(q,Un)),at.mathMl===!0&&(De(fe,Ps),De(q,Wa),De(q,Un))),v.ADD_TAGS&&(typeof v.ADD_TAGS=="function"?U.tagCheck=v.ADD_TAGS:(fe===be&&(fe=er(fe)),De(fe,v.ADD_TAGS,Se))),v.ADD_ATTR&&(typeof v.ADD_ATTR=="function"?U.attributeCheck=v.ADD_ATTR:(q===V&&(q=er(q)),De(q,v.ADD_ATTR,Se))),v.ADD_URI_SAFE_ATTR&&De(yt,v.ADD_URI_SAFE_ATTR,Se),v.FORBID_CONTENTS&&(Ze===vt&&(Ze=er(Ze)),De(Ze,v.FORBID_CONTENTS,Se)),Ee&&(fe["#text"]=!0),Ne&&De(fe,["html","head","body"]),fe.table&&(De(fe,["tbody"]),delete Ie.tbody),v.TRUSTED_TYPES_POLICY){if(typeof v.TRUSTED_TYPES_POLICY.createHTML!="function")throw rn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof v.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw rn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');O=v.TRUSTED_TYPES_POLICY,D=O.createHTML("")}else O===void 0&&(O=kd(E,s)),O!==null&&typeof D=="string"&&(D=O.createHTML(""));xt&&xt(v),je=v}},Vt=De({},[...Ds,...Ms,...ud]),f=De({},[...Ps,...pd]),k=function(v){let H=Q(v);(!H||!H.tagName)&&(H={namespaceURI:Ce,tagName:"template"});let z=jn(v.tagName),me=jn(H.tagName);return F[v.namespaceURI]?v.namespaceURI===lt?H.namespaceURI===rt?z==="svg":H.namespaceURI===st?z==="svg"&&(me==="annotation-xml"||ae[me]):!!Vt[z]:v.namespaceURI===st?H.namespaceURI===rt?z==="math":H.namespaceURI===lt?z==="math"&&ue[me]:!!f[z]:v.namespaceURI===rt?H.namespaceURI===lt&&!ue[me]||H.namespaceURI===st&&!ae[me]?!1:!f[z]&&(ye[z]||!Vt[z]):!!(Te==="application/xhtml+xml"&&F[v.namespaceURI]):!1},R=function(v){en(t.removed,{element:v});try{Q(v).removeChild(v)}catch{B(v)}},te=function(v,H){try{en(t.removed,{attribute:H.getAttributeNode(v),from:H})}catch{en(t.removed,{attribute:null,from:H})}if(H.removeAttribute(v),v==="is")if(A||w)try{R(H)}catch{}else try{H.setAttribute(v,"")}catch{}},ce=function(v){let H=null,z=null;if(g)v="<remove></remove>"+v;else{let Je=Os(v,/^[\r\n\t ]+/);z=Je&&Je[0]}Te==="application/xhtml+xml"&&Ce===rt&&(v='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+v+"</body></html>");let me=O?O.createHTML(v):v;if(Ce===rt)try{H=new b().parseFromString(me,Te)}catch{}if(!H||!H.documentElement){H=S.createDocument(Ce,"template",null);try{H.documentElement.innerHTML=gt?D:me}catch{}}let We=H.body||H.documentElement;return v&&z&&We.insertBefore(r.createTextNode(z),We.childNodes[0]||null),Ce===rt?ie.call(H,Ne?"html":"body")[0]:Ne?H.documentElement:We},_e=function(v){return j.call(v.ownerDocument||v,v,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},le=function(v){return v instanceof _&&(typeof v.nodeName!="string"||typeof v.textContent!="string"||typeof v.removeChild!="function"||!(v.attributes instanceof p)||typeof v.removeAttribute!="function"||typeof v.setAttribute!="function"||typeof v.namespaceURI!="string"||typeof v.insertBefore!="function"||typeof v.hasChildNodes!="function")},qe=function(v){return typeof i=="function"&&v instanceof i};function se(de,v,H){Bn(de,z=>{z.call(t,v,H,je)})}let Xe=function(v){let H=null;if(se(oe.beforeSanitizeElements,v,null),le(v))return R(v),!0;let z=Se(v.nodeName);if(se(oe.uponSanitizeElement,v,{tagName:z,allowedTags:fe}),Be&&v.hasChildNodes()&&!qe(v.firstElementChild)&&$t(/<[/\w!]/g,v.innerHTML)&&$t(/<[/\w!]/g,v.textContent)||v.nodeType===sn.progressingInstruction||Be&&v.nodeType===sn.comment&&$t(/<[/\w]/g,v.data))return R(v),!0;if(!(U.tagCheck instanceof Function&&U.tagCheck(z))&&(!fe[z]||Ie[z])){if(!Ie[z]&&ht(z)&&(K.tagNameCheck instanceof RegExp&&$t(K.tagNameCheck,z)||K.tagNameCheck instanceof Function&&K.tagNameCheck(z)))return!1;if(Ee&&!Ze[z]){let me=Q(v)||v.parentNode,We=Y(v)||v.childNodes;if(We&&me){let Je=We.length;for(let m=Je-1;m>=0;--m){let d=C(We[m],!0);d.__removalCount=(v.__removalCount||0)+1,me.insertBefore(d,x(v))}}}return R(v),!0}return v instanceof l&&!k(v)||(z==="noscript"||z==="noembed"||z==="noframes")&&$t(/<\/no(script|embed|frames)/i,v.innerHTML)?(R(v),!0):($e&&v.nodeType===sn.text&&(H=v.textContent,Bn([pe,Oe,Ye],me=>{H=tn(H,me," ")}),v.textContent!==H&&(en(t.removed,{element:v.cloneNode()}),v.textContent=H)),se(oe.afterSanitizeElements,v,null),!1)},Pt=function(v,H,z){if(W&&(H==="id"||H==="name")&&(z in r||z in we))return!1;if(!(ve&&!P[H]&&$t(nt,H))){if(!(ee&&$t(Le,H))){if(!(U.attributeCheck instanceof Function&&U.attributeCheck(H,v))){if(!q[H]||P[H]){if(!(ht(v)&&(K.tagNameCheck instanceof RegExp&&$t(K.tagNameCheck,v)||K.tagNameCheck instanceof Function&&K.tagNameCheck(v))&&(K.attributeNameCheck instanceof RegExp&&$t(K.attributeNameCheck,H)||K.attributeNameCheck instanceof Function&&K.attributeNameCheck(H,v))||H==="is"&&K.allowCustomizedBuiltInElements&&(K.tagNameCheck instanceof RegExp&&$t(K.tagNameCheck,z)||K.tagNameCheck instanceof Function&&K.tagNameCheck(z))))return!1}else if(!yt[H]){if(!$t(xe,tn(z,ke,""))){if(!((H==="src"||H==="xlink:href"||H==="href")&&v!=="script"&&id(z,"data:")===0&&dt[v])){if(!(Ae&&!$t(He,tn(z,ke,"")))){if(z)return!1}}}}}}}return!0},ht=function(v){return v!=="annotation-xml"&&Os(v,ge)},pt=function(v){se(oe.beforeSanitizeAttributes,v,null);let{attributes:H}=v;if(!H||le(v))return;let z={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:q,forceKeepAttr:void 0},me=H.length;for(;me--;){let We=H[me],{name:Je,namespaceURI:m,value:d}=We,$=Se(Je),y=d,M=Je==="value"?y:ld(y);if(z.attrName=$,z.attrValue=M,z.keepAttr=!0,z.forceKeepAttr=void 0,se(oe.uponSanitizeAttribute,v,z),M=z.attrValue,X&&($==="id"||$==="name")&&(te(Je,v),M=J+M),Be&&$t(/((--!?|])>)|<\/(style|title|textarea)/i,M)){te(Je,v);continue}if($==="attributename"&&Os(M,"href")){te(Je,v);continue}if(z.forceKeepAttr)continue;if(!z.keepAttr){te(Je,v);continue}if(!Ve&&$t(/\/>/i,M)){te(Je,v);continue}$e&&Bn([pe,Oe,Ye],he=>{M=tn(M,he," ")});let re=Se(v.nodeName);if(!Pt(re,$,M)){te(Je,v);continue}if(O&&typeof E=="object"&&typeof E.getAttributeType=="function"&&!m)switch(E.getAttributeType(re,$)){case"TrustedHTML":{M=O.createHTML(M);break}case"TrustedScriptURL":{M=O.createScriptURL(M);break}}if(M!==y)try{m?v.setAttributeNS(m,Je,M):v.setAttribute(Je,M),le(v)?R(v):Ua(t.removed)}catch{te(Je,v)}}se(oe.afterSanitizeAttributes,v,null)},kt=function de(v){let H=null,z=_e(v);for(se(oe.beforeSanitizeShadowDOM,v,null);H=z.nextNode();)se(oe.uponSanitizeShadowNode,H,null),Xe(H),pt(H),H.content instanceof o&&de(H.content);se(oe.afterSanitizeShadowDOM,v,null)};return t.sanitize=function(de){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},H=null,z=null,me=null,We=null;if(gt=!de,gt&&(de="<!-->"),typeof de!="string"&&!qe(de))if(typeof de.toString=="function"){if(de=de.toString(),typeof de!="string")throw rn("dirty is not a string, aborting")}else throw rn("toString is not a function");if(!t.isSupported)return de;if(Ke||wt(v),t.removed=[],typeof de=="string"&&(et=!1),et){if(de.nodeName){let d=Se(de.nodeName);if(!fe[d]||Ie[d])throw rn("root node is forbidden and cannot be sanitized in-place")}}else if(de instanceof i)H=ce("<!---->"),z=H.ownerDocument.importNode(de,!0),z.nodeType===sn.element&&z.nodeName==="BODY"||z.nodeName==="HTML"?H=z:H.appendChild(z);else{if(!A&&!$e&&!Ne&&de.indexOf("<")===-1)return O&&L?O.createHTML(de):de;if(H=ce(de),!H)return A?null:L?D:""}H&&g&&R(H.firstChild);let Je=_e(et?de:H);for(;me=Je.nextNode();)Xe(me),pt(me),me.content instanceof o&&kt(me.content);if(et)return de;if(A){if(w)for(We=I.call(H.ownerDocument);H.firstChild;)We.appendChild(H.firstChild);else We=H;return(q.shadowroot||q.shadowrootmode)&&(We=Re.call(n,We,!0)),We}let m=Ne?H.outerHTML:H.innerHTML;return Ne&&fe["!doctype"]&&H.ownerDocument&&H.ownerDocument.doctype&&H.ownerDocument.doctype.name&&$t(Za,H.ownerDocument.doctype.name)&&(m="<!DOCTYPE "+H.ownerDocument.doctype.name+`>
`+m),$e&&Bn([pe,Oe,Ye],d=>{m=tn(m,d," ")}),O&&L?O.createHTML(m):m},t.setConfig=function(){let de=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};wt(de),Ke=!0},t.clearConfig=function(){je=null,Ke=!1},t.isValidAttribute=function(de,v,H){je||wt({});let z=Se(de),me=Se(v);return Pt(z,me,H)},t.addHook=function(de,v){typeof v=="function"&&en(oe[de],v)},t.removeHook=function(de,v){if(v!==void 0){let H=od(oe[de],v);return H===-1?void 0:ad(oe[de],H,1)[0]}return Ua(oe[de])},t.removeHooks=function(de){oe[de]=[]},t.removeAllHooks=function(){oe=Ya()},t}var Qa=Xa();var Ja={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ei=e=>(...t)=>({_$litDirective$:e,values:t}),zn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var on=class extends zn{constructor(t){if(super(t),this.it=ct,t.type!==Ja.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ct||t==null)return this._t=void 0,this.it=t;if(t===wr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};on.directiveName="unsafeHTML",on.resultType=1;var ti=ei(on);function Hs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Tr=Hs();function li(e){Tr=e}var dn={exec:()=>null};function Fe(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(At.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var $d=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),At={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},xd=/^(?:[ \t]*(?:\n|$))+/,Sd=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ad=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,un=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Td=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ws=/(?:[*+-]|\d{1,9}[.)])/,ci=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,di=Fe(ci).replace(/bull/g,Ws).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ed=Fe(ci).replace(/bull/g,Ws).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Gs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Cd=/^[^\n]+/,Ys=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Rd=Fe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ys).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Id=Fe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ws).getRegex(),Kn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Vs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ld=Fe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Vs).replace("tag",Kn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ui=Fe(Gs).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kn).getRegex(),Od=Fe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ui).getRegex(),Ks={blockquote:Od,code:Sd,def:Rd,fences:Ad,heading:Td,hr:un,html:Ld,lheading:di,list:Id,newline:xd,paragraph:ui,table:dn,text:Cd},ri=Fe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kn).getRegex(),Dd={...Ks,lheading:Ed,table:ri,paragraph:Fe(Gs).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ri).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kn).getRegex()},Md={...Ks,html:Fe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Vs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:dn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Fe(Gs).replace("hr",un).replace("heading",` *#{1,6} *[^
]`).replace("lheading",di).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Pd=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Nd=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,pi=/^( {2,}|\\)\n(?!\s*$)/,qd=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Zn=/[\p{P}\p{S}]/u,Zs=/[\s\p{P}\p{S}]/u,fi=/[^\s\p{P}\p{S}]/u,Fd=Fe(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Zs).getRegex(),_i=/(?!~)[\p{P}\p{S}]/u,Bd=/(?!~)[\s\p{P}\p{S}]/u,Ud=/(?:[^\s\p{P}\p{S}]|~)/u,jd=Fe(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",$d?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),mi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,zd=Fe(mi,"u").replace(/punct/g,Zn).getRegex(),Hd=Fe(mi,"u").replace(/punct/g,_i).getRegex(),gi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Wd=Fe(gi,"gu").replace(/notPunctSpace/g,fi).replace(/punctSpace/g,Zs).replace(/punct/g,Zn).getRegex(),Gd=Fe(gi,"gu").replace(/notPunctSpace/g,Ud).replace(/punctSpace/g,Bd).replace(/punct/g,_i).getRegex(),Yd=Fe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,fi).replace(/punctSpace/g,Zs).replace(/punct/g,Zn).getRegex(),Vd=Fe(/\\(punct)/,"gu").replace(/punct/g,Zn).getRegex(),Kd=Fe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Zd=Fe(Vs).replace("(?:-->|$)","-->").getRegex(),Xd=Fe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Zd).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Gn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Qd=Fe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Gn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),hi=Fe(/^!?\[(label)\]\[(ref)\]/).replace("label",Gn).replace("ref",Ys).getRegex(),bi=Fe(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ys).getRegex(),Jd=Fe("reflink|nolink(?!\\()","g").replace("reflink",hi).replace("nolink",bi).getRegex(),ni=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Xs={_backpedal:dn,anyPunctuation:Vd,autolink:Kd,blockSkip:jd,br:pi,code:Nd,del:dn,emStrongLDelim:zd,emStrongRDelimAst:Wd,emStrongRDelimUnd:Yd,escape:Pd,link:Qd,nolink:bi,punctuation:Fd,reflink:hi,reflinkSearch:Jd,tag:Xd,text:qd,url:dn},eu={...Xs,link:Fe(/^!?\[(label)\]\((.*?)\)/).replace("label",Gn).getRegex(),reflink:Fe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Gn).getRegex()},Us={...Xs,emStrongRDelimAst:Gd,emStrongLDelim:Hd,url:Fe(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ni).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Fe(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ni).getRegex()},tu={...Us,br:Fe(pi).replace("{2,}","*").getRegex(),text:Fe(Us.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Hn={normal:Ks,gfm:Dd,pedantic:Md},an={normal:Xs,gfm:Us,breaks:tu,pedantic:eu},ru={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},si=e=>ru[e];function tr(e,t){if(t){if(At.escapeTest.test(e))return e.replace(At.escapeReplace,si)}else if(At.escapeTestNoEncode.test(e))return e.replace(At.escapeReplaceNoEncode,si);return e}function oi(e){try{e=encodeURI(e).replace(At.percentDecode,"%")}catch{return null}return e}function ai(e,t){let r=e.replace(At.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),n=r.split(At.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(At.slashPipe,"|");return n}function ln(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function nu(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function ii(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,l}function su(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Yn=class{constructor(e){Qe(this,"options");Qe(this,"rules");Qe(this,"lexer");this.options=e||Tr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:ln(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=su(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=ln(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ln(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=ln(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))i.push(r[l]),a=!0;else if(!a)i.push(r[l]);else break;r=r.slice(l);let u=i.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${p}`:p;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=_,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let E=b,T=E.raw+`
`+r.join(`
`),C=this.blockquote(T);o[o.length-1]=C,n=n.substring(0,n.length-E.raw.length)+C.raw,s=s.substring(0,s.length-E.text.length)+C.text;break}else if(b?.type==="list"){let E=b,T=E.raw+`
`+r.join(`
`),C=this.list(T);o[o.length-1]=C,n=n.substring(0,n.length-b.raw.length)+C.raw,s=s.substring(0,s.length-E.raw.length)+C.raw,r=T.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,u="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),b=e.split(`
`,1)[0],E=!_.trim(),T=0;if(this.options.pedantic?(T=2,p=_.trimStart()):E?T=t[1].length+1:(T=t[2].search(this.rules.other.nonSpaceChar),T=T>4?1:T,p=_.slice(T),T+=t[1].length),E&&this.rules.other.blankLine.test(b)&&(u+=b+`
`,e=e.substring(b.length+1),l=!0),!l){let C=this.rules.other.nextBulletRegex(T),B=this.rules.other.hrRegex(T),x=this.rules.other.fencesBeginRegex(T),Y=this.rules.other.headingBeginRegex(T),Q=this.rules.other.htmlBeginRegex(T);for(;e;){let O=e.split(`
`,1)[0],D;if(b=O,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),D=b):D=b.replace(this.rules.other.tabCharGlobal,"    "),x.test(b)||Y.test(b)||Q.test(b)||C.test(b)||B.test(b))break;if(D.search(this.rules.other.nonSpaceChar)>=T||!b.trim())p+=`
`+D.slice(T);else{if(E||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||x.test(_)||Y.test(_)||B.test(_))break;p+=`
`+b}!E&&!b.trim()&&(E=!0),u+=O+`
`,e=e.substring(O.length+1),_=D.slice(T)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=p.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}if(!s.loose){let u=l.tokens.filter(_=>_.type==="space"),p=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=p}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=ai(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(ai(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=ln(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=nu(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),ii(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return ii(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,l=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let p=[...n[0]][0].length,_=e.slice(0,s+n.index+p+a);if(Math.min(s,a)%2){let E=_.slice(1,-1);return{type:"em",raw:_,text:E,tokens:this.lexer.inlineTokens(E)}}let b=_.slice(2,-2);return{type:"strong",raw:_,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ut=class js{constructor(t){Qe(this,"tokens");Qe(this,"options");Qe(this,"state");Qe(this,"inlineQueue");Qe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Tr,this.options.tokenizer=this.options.tokenizer||new Yn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:At,block:Hn.normal,inline:an.normal};this.options.pedantic?(r.block=Hn.pedantic,r.inline=an.pedantic):this.options.gfm&&(r.block=Hn.gfm,this.options.breaks?r.inline=an.breaks:r.inline=an.gfm),this.tokenizer.rules=r}static get rules(){return{block:Hn,inline:an}}static lex(t,r){return new js(r).lex(t)}static lexInline(t,r){return new js(r).inlineTokens(t)}lex(t){t=t.replace(At.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(At.tabCharGlobal,"    ").replace(At.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(p=>(l=p.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let p=r.at(-1);l.type==="text"&&p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,i)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let u=t;if(this.options.extensions?.startInline){let p=1/0,_=t.slice(1),b;this.options.extensions.startInline.forEach(E=>{b=E.call({lexer:this},_),typeof b=="number"&&b>=0&&(p=Math.min(p,b))}),p<1/0&&p>=0&&(u=t.substring(0,p+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Vn=class{constructor(e){Qe(this,"options");Qe(this,"parser");this.options=e||Tr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(At.notSpaceStart)?.[0],s=e.replace(At.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${tr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=oi(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+tr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=oi(e);if(s===null)return tr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${tr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:tr(e.text)}},Qs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},jt=class zs{constructor(t){Qe(this,"options");Qe(this,"renderer");Qe(this,"textRenderer");this.options=t||Tr,this.options.renderer=this.options.renderer||new Vn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Qs}static parse(t,r){return new zs(r).parse(t)}static parseInline(t,r){return new zs(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Wn,cn=(Wn=class{constructor(e){Qe(this,"options");Qe(this,"block");this.options=e||Tr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ut.lex:Ut.lexInline}provideParser(){return this.block?jt.parse:jt.parseInline}},Qe(Wn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Qe(Wn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Wn),ou=class{constructor(...e){Qe(this,"defaults",Hs());Qe(this,"options",this.setOptions);Qe(this,"parse",this.parseMarkdown(!0));Qe(this,"parseInline",this.parseMarkdown(!1));Qe(this,"Parser",jt);Qe(this,"Renderer",Vn);Qe(this,"TextRenderer",Qs);Qe(this,"Lexer",Ut);Qe(this,"Tokenizer",Yn);Qe(this,"Hooks",cn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Vn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],l=s[a];s[a]=(...u)=>{let p=i.apply(s,u);return p===!1&&(p=l.apply(s,u)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Yn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],l=s[a];s[a]=(...u)=>{let p=i.apply(s,u);return p===!1&&(p=l.apply(s,u)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new cn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],l=s[a];cn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&cn.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,u);return l.call(s,_)})();let p=i.call(s,u);return l.call(s,p)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,u);return _===!1&&(_=await l.apply(s,u)),_})();let p=i.apply(s,u);return p===!1&&(p=l.apply(s,u)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ut.lex(e,t??this.defaults)}parser(e,t){return jt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Ut.lex:Ut.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?jt.parse:jt.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ut.lex:Ut.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?jt.parse:jt.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+tr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ar=new ou;function Ge(e,t){return Ar.parse(e,t)}Ge.options=Ge.setOptions=function(e){return Ar.setOptions(e),Ge.defaults=Ar.defaults,li(Ge.defaults),Ge};Ge.getDefaults=Hs;Ge.defaults=Tr;Ge.use=function(...e){return Ar.use(...e),Ge.defaults=Ar.defaults,li(Ge.defaults),Ge};Ge.walkTokens=function(e,t){return Ar.walkTokens(e,t)};Ge.parseInline=Ar.parseInline;Ge.Parser=jt;Ge.parser=jt.parse;Ge.Renderer=Vn;Ge.TextRenderer=Qs;Ge.Lexer=Ut;Ge.lexer=Ut.lex;Ge.Tokenizer=Yn;Ge.Hooks=cn;Ge.parse=Ge;var U_=Ge.options,j_=Ge.setOptions,z_=Ge.use,H_=Ge.walkTokens,W_=Ge.parseInline;var G_=jt.parse,Y_=Ut.lex;function pr(e){let t=Ge.parse(e),r=Qa.sanitize(t);return ti(r)}function rr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function qr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Xn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var au={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},iu=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,lu=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function fr(e){return!!e&&typeof e=="object"}function Js(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function vi(e,t){let r=Js(e),n=Js(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function cu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>fr(s)&&typeof s.text=="string"?s.text:"").join(""):fr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function du(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:au[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Js(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=vi(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let l=vi(fr(i)?i.old_string:"",fr(i)?i.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function yi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function wi(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=iu.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:lu.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function uu(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(fr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(wi(o.text));else if(o.type==="thinking"){let a=yi(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=du(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(fr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=cu(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function pu(e){if(e.type==="item.completed"&&fr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[wi(t.text)];if(t.type==="reasoning"){let r=yi(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function fu(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function ki(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!fr(o))continue;let a=fu(o)?pu(o):uu(o,r);for(let i of a)t.push(i)}return t}var _u=5,mu=10,gu=/Task\s+#(\d+)/,hu=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,bu=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Qn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function vu(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function yu(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function wu(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=gu.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function ku(e){if(e.tool==="Bash"){let t=e.command||"";return hu.test(t)?"~ PR/\uAC8C\uC2DC \uC911":bu.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function $u(e){let t=e.filter(s=>s.kind==="tool").slice(-mu),r=new Map;t.forEach((s,o)=>{let a=ku(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function xu(e){let t=yu(e);if(t)return{text:t,guess:!1};let r=wu(e);if(r)return{text:r,guess:!1};let n=$u(e);return n?{text:n,guess:!0}:null}function Su(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Rt(e,t)}function Jn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},i=!0,l=new Set,u=new Set,p=null,_=null,b=!1,E=!1,T=!1,C=null,B=null;function x(){b=!1,E=!1,T=!1,C=null,B=null}async function Y(P){if(r){E=!0,T=!1,ke();try{let U=await Promise.resolve(r("get-attempt-prompt",{attempt_id:P}));if(o!==P)return;!U||typeof U!="object"||Array.isArray(U)?T=!0:(C=U,B=P)}catch{o===P&&(T=!0)}finally{o===P&&(E=!1,ke())}}}function Q(){if(b=!b,b&&o&&B!==o){Y(o);return}ke()}function O(){if(!b)return"";let P=qr({loading:E,error:T});if(P)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${P}
      </div>`;if(!C)return"";if(C.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let U=Xn(C.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${U?c`<div class="prompt-block__meta">${U} 발송</div>`:""}
      ${typeof C.task_prompt=="string"?rr("\uACFC\uC5C5 (user)",C.task_prompt):""}
      ${typeof C.system_prompt=="string"?rr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",C.system_prompt):""}
    </div>`}function D(){if(!o||!n)return[];let P=n.get(o);return ki(P?P.lines:[])}function S(){if(!o||!n)return null;let P=n.get(o),U=P?P.last_event_at:null;return typeof U=="number"?U:null}function j(){return a.status==="running"}function I(){if(j()&&o){_||(_=setInterval(()=>ke(),1e3));return}ie()}function ie(){_&&(clearInterval(_),_=null)}function Re(P){let U=[],ee=0;for(;ee<P.length;){let ve=P[ee];if(ve.kind==="tool"){let Ae=ee;for(;Ae<P.length&&P[Ae].kind==="tool"&&P[Ae].tool===ve.tool;)Ae+=1;if(Ae-ee>=_u&&!u.has(ee)){U.push({kind:"group",idx:ee,tool:ve.tool||"",lines:P.slice(ee,Ae).map((Ve,$e)=>({idx:ee+$e,line:Ve}))}),ee=Ae;continue}}U.push({kind:"line",idx:ee,line:ve}),ee+=1}return U}function oe(P){for(let U=P.length-1;U>=0;U-=1){let ee=P[U];if(ee.kind==="result"||ee.kind==="error")return null;if(ee.kind==="tool"&&!Object.hasOwn(ee,"result"))return ee}return null}function pe(P){for(let U=P.length-1;U>=0;U-=1)if(P[U].kind==="thinking")return P[U];return null}function Oe(P,U){if(U.kind==="gate")return c`<div class="sv__gate">${U.text}</div>`;if(U.kind==="phase")return c`<div class="sv__phase">${U.text}</div>`;if(U.kind==="result")return c`<div
        class="sv__result${U.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${U.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${pr(U.text||(U.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(U.kind==="thinking"){let ee=l.has(P);return c`<div
        class="sv__think${ee?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>xe(P)}
      >
        <span class="sv__think-line">💭 ${Qn(U.text)}</span>
        ${ee?c`<pre class="sv__think-expand">${U.text}</pre>`:""}
      </div>`}if(U.kind==="error")return c`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="blocker")return c`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="tool"){let ee=l.has(P),ve=U.tool==="Bash"?vu(U.command):0,Ae=U.tool==="Bash"?ve>1?Qn(U.command):U.command:U.path||U.command||"";return c`<div
        class="sv__tool${ee?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>xe(P)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${U.icon}</span>
          <span class="sv__tool-name">${U.tool}</span>
          ${Ae?c`<span class="sv__tool-detail">${Ae}</span>`:""}
          ${ve>1?c`<span class="sv__tool-more">⋯ ${ve}줄</span>`:""}
          ${typeof U.added=="number"?c`<span class="sv__diff-add">+${U.added}</span>`:""}
          ${typeof U.removed=="number"?c`<span class="sv__diff-del">−${U.removed}</span>`:""}
          ${U.result?c`<span class="sv__tool-ok">→ ${U.result}</span>`:""}
        </span>
        ${ee?c`<pre class="sv__tool-expand">${Ye(U)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${pr(U.text||"")}</div>`}function Ye(P){let U=[];if(P.tool==="Bash"&&typeof P.command=="string"&&P.command.length>0)U.push(P.command);else if(P.input!==void 0)try{U.push(`input: ${JSON.stringify(P.input,null,2)}`)}catch{}return typeof P.output=="string"&&P.output.length>0&&U.push(`output:
${P.output}`),U.join(`

`)}function nt(){if(!o)return c``;let P=D(),U=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ee=a.session_id||"",ve=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${i?"ON":"OFF"}`,Ae=j(),Ve=Ae?Su(S(),Date.now()):"",$e=Ae?oe(P):null,Be=Ae?pe(P):null,Ne=xu(P);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${Ne?c`<span
              class="sv__stage${Ne.guess?" sv__stage--guess":""}"
              title=${Ne.text}
              >${Ne.text}</span
            >`:""}
        ${Ae?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ve?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ve}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ve?c`<span class="sv__live-ago">${Ve}</span>`:""}</span
            >`:""}
        ${ee?c`<button
              type="button"
              class="sv__session"
              title=${ee}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ee}`}
              @click=${()=>be(ee)}
            >
              ⧉ ${ee.slice(0,8)}
            </button>`:""}
        ${U?c`<span class="sv__meta">${U}</span>`:""}
        ${a.worktree?c`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${b?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${b?"true":"false"}
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
          aria-label=${ve}
          @click=${fe}
        >
          <span class="sv__follow-full">⇣ ${ve}</span>
          <span class="sv__follow-short">⇣ ${i?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Ie()}
        >
          ✕
        </button>
      </div>
      ${O()}
      <div class="sv__body">
        ${P.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:Re(P).map(Ke=>Ke.kind==="group"?Le(Ke):Oe(Ke.idx,Ke.line))}
      </div>
      ${$e||Be?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${$e?c`<span class="sv__now-icon">${$e.icon}</span>
                  <span class="sv__now-name">${$e.tool}</span>
                  <span class="sv__now-detail"
                    >${$e.tool==="Bash"?Qn($e.command):$e.path||$e.command||""}</span
                  >`:""}
            ${Be?c`<span class="sv__now-think"
                  >💭 ${Qn(Be.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Le(P){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>He(P.idx)}
    >
      <span class="sv__group-icon">${P.lines[0].line.icon}</span>
      <span class="sv__group-name">${P.tool}</span>
      <span class="sv__group-count">${P.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function He(P){u.add(P),ke()}function ke(){Pe(nt(),e),I(),i&&ge()}function ge(){let P=e.querySelector(".sv__body");P&&(P.scrollTop=P.scrollHeight)}function xe(P){l.has(P)?l.delete(P):l.add(P),ke()}function fe(){i=!i,ke()}function be(P){Sr(P).then(U=>{U?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function q(P){!o||!P||(a={...a,...P},ke())}function V(P){let U=P.target;if(!U||!U.classList||!U.classList.contains("sv__body"))return;!(U.scrollHeight-U.scrollTop-U.clientHeight<=4)&&i&&(i=!1,ke())}e.addEventListener("scroll",V,!0);function K(P){let U=P&&P.attempt_id;U&&(o=U,a=P.meta||{},i=!0,l.clear(),u.clear(),x(),!p&&n&&(p=n.subscribe(ke)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),ke())}function Ie(){let P=o;o=null,l.clear(),u.clear(),x(),ie(),r&&P&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${P}`})).catch(()=>{}),Pe(c``,e),s&&s()}return{open:K,updateMeta:q,close:Ie,isOpen(){return o!==null},destroy(){ie(),p&&(p(),p=null),e.removeEventListener("scroll",V,!0),o=null,Pe(c``,e)}}}function pn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=$i(t.spec_id),s=$i(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function $i(e){return typeof e=="string"?e.trim():""}function Au(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Tu(e){let t=e&&e.metadata||{},r=pn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Au(t)?null:"plan_pending"}),n}function xi(e,t){let r=Tu(e);return c`
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
`).trim()}}var Si=20;function Ai(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Iu(e){return e.length>Si?`${e.slice(0,Si)}\u2026`:e}function Lu(e,t,r,n){let s=`${t.lane} ${Iu(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Ai(t.timestamp)}</span>
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
        >${Ai(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${pr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ti(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
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
  `}var Du=["codex","opus","fable","self","skip"],Mu=["codex","fable","skip"],Pu=["low","medium","high","xhigh"],Nu=["standard","fast_track"],Br=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],to={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},Ei={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},qu=["self","skip"],Fu="opus",ro={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function no(e){let t=to[e]||{title:e};return c`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?c`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function Bu(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:ro[e]||"(\uAE30\uBCF8)"}function Fr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Er(e){if(!Fr(e)||!Fr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Fr(r)&&Fr(r.models));return t.length>0?t:null}function eo(e){return{value:e,label:e}}function so(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Ci(e,t,r=null){let n=Er(e);if(!n)return t?[{label:null,options:[eo(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,i])=>({label:a,options:Object.keys(i.models).map(eo)})),o=s.some(a=>a.options.some(i=>i.value===t));return t&&!o?[so(t),...s]:s}function _r(e,t){let r={label:null,options:e.map(eo)};return t&&!e.includes(t)?[so(t),r]:[r]}function nr(e,t){let r=Er(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function oo(e,t){return Fr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Uu(e,t){return Fr(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():oo(e,t)}function ju(e,t){let r=Er(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Uu(n,n.models[t]);return[]}function zu(e,t){let r=Er(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function ao(e,t){let r=Er(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return oo(n,n.models[t]);return[]}function Li(e){let t=Er(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of oo(n,s))r.includes(o)||r.push(o);return r}function Oi(e,t){if(!t)return Li(e);let n=Er(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of ao(e,o))s.includes(a)||s.push(a);return s}function rs(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=nr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?ao(t,n.impl_model):Oi(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Ur(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||Fu,a=r("impl_model"),i=r("impl_runtime"),l=i==="claude"||i==="codex"?i:i==="inherit"?s===void 0?nr(n,o):s:null;return Br.map(u=>{let p=t(u),_,b=!1;return u==="orchestration_model"?_=Ci(n,p):u==="impl_runtime"?_=_r(["inherit","claude","codex"],p):u==="impl_model"?(_=l?Ci(n,p,l):p?[so(p)]:[],b=i==="inherit"&&l===null):u==="orchestration_effort"?_=_r(ju(n,o),p):u==="orchestration_speed"?_=Hu(zu(n,o),p):u==="impl_effort"?(_=_r(a?ao(n,a):l?Oi(n,l):Li(n),p),b=i==="inherit"&&l===null):u==="plan_review_model"?_=_r(Mu,p):Object.hasOwn(Ei,u)?(_=_r(Pu,p),b=qu.includes(r(Ei[u]))):_=_r(Du,p),{key:u,groups:_,selected:p,disabled:b,runner:u==="orchestration_model"?nr(n,o):null}})}function ts(e,t,r){return c`
    ${typeof r=="string"?c`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Ri(s,t)):c`<optgroup label=${n.label}>
            ${n.options.map(s=>Ri(s,t))}
          </optgroup>`)}
  `}function Hu(e,t){return _r(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function Ri(e,t){return c`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Ii(e,t,r,n,s,o,a){return c`
    <div class="detail-kv">
      <span class="detail-kv__k">${no(e)}</span>
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
  `}function Di(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},i=_=>typeof o[_]=="string"?o[_]:"",u=Ur({selectedOf:i,effectiveOf:_=>{let b=i(_);return b||(typeof a[_]=="string"?a[_]:"")},runner_catalog:n}),p=o.workflow_mode==="fast_track"?"fast_track":"standard";return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${u.map(_=>Ii(_.key,ts(_.groups,_.selected,Bu(_.key,a,s)),_.selected,!1,_.disabled,_.runner,t))}
    ${Ii("workflow_mode",ts(_r(Nu,p),p),p,o.workflow_mode==="fast_track",!1,null,t)}
  `}function Wu(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Mi(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function l(T){T.key==="Escape"&&s&&(T.preventDefault(),b())}document.addEventListener("keydown",l);function u(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Wu(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${i}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:pr(a)}
          </div>
        </div>
      </div>
    `:c``}function p(){Pe(u(),e)}async function _(T,C={}){s=T,o="loading",a="",i="",p();let B=r?r():"";if(!B){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let x="/api/doc?workspace="+encodeURIComponent(B)+"&path="+encodeURIComponent(T);try{let Y=await n(x),Q=await Y.json().catch(()=>({}));if(!Y.ok||!Q||Q.ok!==!0){if(Q?.error==="not_found"&&C.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(Q&&Q.error||Y.status)+")",p();return}a=String(Q.content||""),o="ready",p()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function b(){s=null,Pe(c``,e)}function E(){document.removeEventListener("keydown",l),b()}return{open:_,close:b,destroy:E}}var Gu=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],qi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Yu(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Vu(e){let t=mt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Pr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${qi}
          >부분 집계</span
        >`:""}`}function Pi(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ni(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Fi(t):""}function Ku(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=mt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
        ${Ni(s.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
              >${Ni(s.completed_at)}</span
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
    ${e.replayed?c`<span class="detail-session__usage-note">${qi}</span>`:""}
  </div>`}var Xu={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Fi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Qu(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Bi(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let _=typeof u.session_id=="string"&&u.session_id.length>0,b=o.has(u.attempt_id),E=_&&!b,T=_?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!E}
      title=${T}
      @click=${C=>{C.stopPropagation(),E&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let _=u.cause_detail,b=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:u.cause;return c`<div class="detail-session__cause" title=${b}>
      ${u.cause}
    </div>`},l=u=>{let p=Pi(Is(u));if(mt(p).length===0&&!Pr(u.usage))return"";let _=s.has(u.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${b=>{b.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Vu(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let p=Is(u),_=Pi(p),b=mt(_);return c`<div class="detail-session-row">
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
            ${b.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?c`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${b.length>0?b.map(E=>c`<span
                      class="detail-session__usage"
                      title=${E.tooltip}
                      >${E.label}</span
                    >`):Pr(u.usage)?c`<span class="detail-session__usage"
                    >${Pr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Fi(u.started_at)}</span>
          </button>
          ${l(u)} ${a(u)} ${i(u)} ${Qu(u)}
          ${s.has(u.attempt_id)&&u.usage?Zu(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Ku(p)}
        </div>`})}
    </div>
  `}function Ui(e,t={}){return c`
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
    ${typeof r.system_prompt=="string"?rr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var ep=["open","in_progress","deferred","resolved","closed"],tp=[0,1,2,3,4];function ji(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,p=null,_={},b="",E=!1,T=!1,C=!1,B="",x="",Y="";function Q(){T=!1,C=!1,B="",x="",Y=""}let O=[],D=null,S=null,j=!1,I="",ie=!1,Re=0,oe=new Set;function pe(){O=[],D=null,S=null,j=!1,I="",ie=!1,Re+=1,oe.clear()}async function Oe(d){if(!s)return;let $=++Re;try{let y=await Promise.resolve(s("get-comments",{id:d}));if($!==Re||d!==u)return;O=Array.isArray(y)?y:[],j=!1}catch{if($!==Re||d!==u)return;j=!0}m()}function Ye(){if(!s||!u)return;let d=p&&typeof p.comment_count=="number"?p.comment_count:null;if(D!==u){D=u,S=d,Oe(u);return}d!==null&&d!==S&&(S=d,Oe(u))}function nt(d){oe.has(d)?oe.delete(d):oe.add(d),m()}function Le(d){let $=I.trim().length===0;I=d,$!==(d.trim().length===0)&&m()}async function He(){let d=I.trim();if(!s||!u||d.length===0||ie)return;let $=u;ie=!0,m();let y=!1;try{let M=await Promise.resolve(s("add-comment",{id:$,text:d}));Array.isArray(M)&&M.length>0&&(y=!0,$===u&&(O=M,j=!1,I="",S=M.length))}catch{y=!1}y||Z("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),$===u&&(ie=!1),m()}let ke={onToggle:nt,onDraftInput:Le,onSubmit:He},ge=document.createElement("div");ge.className="md-viewer-root",document.body.appendChild(ge);let xe=Mi(ge,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),fe=document.createElement("div");fe.className="session-log-root",document.body.appendChild(fe);let be=Jn(fe,{transport:s?(d,$)=>Promise.resolve(s(d,$)):void 0,sessionLogStore:l}),q=!1,V=!1,K=!1,Ie=null,P=null,U=0;function ee(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function ve(){q=!1,V=!1,K=!1,Ie=null,P=null,U+=1}async function Ae(d){if(!s)return;let $=++U;V=!0,K=!1,m();try{let y=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if($!==U)return;!y||typeof y!="object"||Array.isArray(y)?K=!0:(Ie=y,P=ee(d))}catch{$===U&&(K=!0)}finally{$===U&&(V=!1,m())}}function Ve(){if(q=!q,q&&u&&P!==ee(u)){Ie=null,Ae(u);return}m()}function $e(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(y=>y&&y.bead_id===u).sort((y,M)=>(M.started_at||0)-(y.started_at||0)).map(y=>({attempt_id:y.attempt_id,bead_id:y.bead_id,status:y.status,started_at:typeof y.started_at=="number"?y.started_at:null,runner:y.runner||null,model:y.model||null,effort:y.effort||null,speed:y.speed||null,session_id:y.session_id||null,resumed_from:y.resumed_from||null,continuation_mode:y.continuation_mode||null,dismissed_at:typeof y.dismissed_at=="number"?y.dismissed_at:null,cause:typeof y.cause=="string"?y.cause:null,cause_detail:y.cause_detail||null,exec_default_preset_id:typeof y.exec_default_preset_id=="string"?y.exec_default_preset_id:null,exec_default_preset_revision:typeof y.exec_default_preset_revision=="number"?y.exec_default_preset_revision:null,exec_values:y.exec_values&&typeof y.exec_values=="object"?y.exec_values:null,usage:y.usage||null,usage_legs:Array.isArray(y.usage_legs)?y.usage_legs:[]}))}function Be(){if(!a||!u)return null;let d=a.get();return Dt(d&&d.attempts||{},u)}let Ne=new Set;function Ke(d){Ne.has(d)?Ne.delete(d):Ne.add(d),m()}function g(d){let $=a?a.get():null,y=$&&$.attempts?$.attempts[d]:null;be.open({attempt_id:d,meta:y?{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.status||void 0,session_id:y.session_id||void 0}:{}})}async function A(d){if(!s||!d)return;let $=()=>{let he=a?a.get():null;return he&&typeof he.revision=="number"?he.revision:0},y=async(he={})=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:$(),...he}),M=he=>{he?.queue&&a?.set&&a.set(he.queue)},re=await y();if(M(re),re&&re.conflict){let he=re.queue&&typeof re.queue.revision=="number"?re.queue.revision:$();re=await s("worker-attempt-resume",{attempt_id:d,expected_revision:he}),M(re)}re=await Qt(re,(he,_t)=>y({continuation:he,decision_token:_t}),{onResult:M,refresh:()=>y()}),re&&re.resumed===!1&&!re.conflict&&re.reason&&Z(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${re.reason}`,"error",2400)}let w={onOpen:g,onResume:A,onToggleUsage:Ke};function L(){let d=a?a.get():null,$=d&&d.default_exec_preset_id,y=typeof $=="string"?Ee()?.presets.find(M=>M.id===$):null;return y&&y.compatible!==!1&&y.settings?y.settings:{}}function W(){let d=a?a.get():null,$=d&&d.default_exec_preset_id,y=typeof $=="string"?Ee()?.presets.find(M=>M.id===$):null;return y&&y.compatible!==!1&&typeof y.name=="string"?y.name:""}function X(){let d=a?a.get():null;return d&&d.runner_catalog||null}function J(){let d=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},y=(Object.hasOwn(_,"orchestration_model")?_.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof L().orchestration_model=="string"?L().orchestration_model:"")||"opus";return nr(X(),y)}function Ee(){let d=i?i.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function et(d){let $=d&&d.settings&&typeof d.settings=="object"?d.settings:{},y=M=>typeof $[M]=="string"?$[M]:M==="impl_runtime"&&typeof $.impl_model=="string"&&nr(X(),$.impl_model)||"";return Ur({selectedOf:y,effectiveOf:y,runner_catalog:X()}).some(M=>M.groups.some(re=>re.options.some(he=>he.value===M.selected&&he.label.endsWith("(\uBE44\uD638\uD658)"))))}function at(d){i&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&i.set({revision:d.revision,presets:d.presets})}async function Ze(){let d=Ee(),$=d?.presets.find(y=>y.id===b);if(!(!s||!u||!d||!$||et($)||E)){E=!0,m();try{let y=await Promise.resolve(s("apply-exec-preset",{id:u,preset_id:$.id,expected_revision:d.revision}));if(y&&y.conflict){at(y),Z("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let M=y&&Array.isArray(y.issue)?y.issue[0]:y?.issue;if(y&&y.applied&&M&&typeof M=="object"){p=M;for(let re of Br)delete _[re];Z("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}y&&y.error==="bd_readback_failed"?Z("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):Z("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(y){y&&typeof y=="object"&&y.code==="bd_readback_failed"?Z("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):Z("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{E=!1,m()}}}function vt(){let d=Ee();if(d&&d.presets.length===0)return c`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let $=d?d.presets:[],y=$.find(re=>re.id===b),M=y?et(y):!1;return c`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${d===null||E}
          @change=${re=>{b=re.target.value,m()}}
        >
          <option value="" ?selected=${b===""}>
            ${d===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${$.map(re=>{let he=et(re);return c`<option
              value=${re.id}
              ?selected=${re.id===b}
            >
              ${re.name}${he?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${d===null||!y||M||E}
          @click=${()=>{Ze()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let dt=null;r&&r.subscribe&&(dt=r.subscribe(()=>st()));let it=null;a&&typeof a.subscribe=="function"&&(it=a.subscribe(()=>{u&&m()}));let yt=null;i&&typeof i.subscribe=="function"&&(yt=i.subscribe(()=>{u&&m()}));function It(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",It);function st(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];p=d.find(y=>y&&y.id===u)||d[0]||p}Ye(),m()}}function lt(d){Sr(d).then($=>{$?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function rt(d){d.preventDefault(),d.stopPropagation(),u&&lt(u)}function Ce(d,$){d.preventDefault(),d.stopPropagation(),lt($)}function gt(d,$,y){d.preventDefault(),d.stopPropagation(),xe.open($,{missing_state:y})}function F(d,$){_[d]=$,m(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",{id:u,key:d,value:$})).catch(()=>{Z("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function G(d,$){let y=p||{},M=y.metadata&&typeof y.metadata=="object"?y.metadata:{},re={};for(let Me of["impl_runtime","impl_model","impl_effort"])re[Me]=Object.hasOwn(_,Me)?_[Me]:typeof M[Me]=="string"?M[Me]:"";re[d]=$;let he=rs(re,X(),J()),_t={};for(let Me of["impl_runtime","impl_model","impl_effort"])_t[Me]=_[Me],_[Me]=he[Me]||"";m(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...he,orchestration_runtime:J()})).then(Me=>{let or=Array.isArray(Me)?Me[0]:Me;if(!or||typeof or!="object"||!or.id)throw new Error("implementation target readback failed");p=or;for(let is of["impl_runtime","impl_model","impl_effort"])delete _[is];m()}).catch(()=>{for(let Me of["impl_runtime","impl_model","impl_effort"])_t[Me]===void 0?delete _[Me]:_[Me]=_t[Me];m(),Z("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function ae(d,$,y){if(!s||!u)return!1;try{let M=await Promise.resolve(s(d,$)),re=Array.isArray(M)?M[0]:M;return re&&typeof re=="object"&&re.id?(p=re,!0):(Z(y,"error"),!1)}catch{return Z(y,"error"),!1}}function ue(d){setTimeout(()=>{try{let $=e.querySelector(d);$&&typeof $.focus=="function"&&$.focus()}catch{}},0)}function ye(){T=!0,B=p&&p.title||"",m(),ue('.detail-edit__input[data-edit="title"]')}function Te(d){B=d.target.value}function Ue(){T=!1,B="",m()}function tt(){ae("edit-text",{id:u,field:"title",value:B},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then($=>{$&&(T=!1,B=""),m()})}function Se(){C=!0,x=p&&p.description||"",m(),ue('.detail-edit__textarea[data-edit="description"]')}function je(d){x=d.target.value}function we(){C=!1,x="",m()}function ut(){ae("edit-text",{id:u,field:"description",value:x},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then($=>{$&&(C=!1,x=""),m()})}function wt(d,$,y,M){if(d.key==="Escape"){d.stopPropagation(),y();return}d.key==="Enter"&&(!M||d.ctrlKey||d.metaKey)&&(d.preventDefault(),$())}function Vt(d){let $=d.target.value;ae("update-status",{id:u,status:$},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function f(d){let $=Number(d.target.value);ae("update-priority",{id:u,priority:$},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function k(d){Y=d.target.value}function R(){let d=Y.trim();d.length!==0&&ae("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then($=>{$&&(Y=""),m()})}function te(d){if(d.key==="Escape"){d.stopPropagation(),Y="",m();return}d.key==="Enter"&&(d.preventDefault(),R())}function ce(d){ae("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>m())}let _e={onCopyPath:Ce,onOpenDoc:gt},le={onChange:F,onImplTargetChange:G};function qe(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function se(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Xe(d){let y=(Array.isArray(d.dependencies)?d.dependencies:[]).map(M=>({id:qe(M),icon:se(M)})).filter(M=>M.id.length>0);return c`
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
    `}function Pt(d){let $=d.metadata||{},y=d.workflow||{},M=y.stages||{},re=M.spec&&M.spec.stale,he=M.impl&&M.impl.stale,_t=M.plan||null,Me=y.route_source==="derived",or=y.route||$.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Me?" detail-kv__v--derived":""}"
          title=${Me?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Me?"unset":or}</span
        >
      </div>
      ${y.route!=="quick_fix"||Object.hasOwn($,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${$.spec_review||"\uC5C6\uC74C"}${re?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${y.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${_t?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${_t?.approval_receipt||"\uC5C6\uC74C"}${_t?.approval_state==="stale"?" \xB7 stale":_t?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${y.route!=="quick_fix"||Object.hasOwn($,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${$.impl_review||"\uC5C6\uC74C"}${he?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${$.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${$.pr_url}</span>
          </div>`:""}
    `}let ht={route:["quick_fix","spec_backed","full_plan"]};async function pt(d,$){let y=$.target.value;if(d==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&y!=="full_plan"&&!window.confirm(`full_plan \u2192 ${y||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){m();return}await ae("update-workflow-meta",{id:u,key:d,value:y},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),m()}function kt(d){let $=d.metadata||{};return c` ${((M,re)=>{let he=ht[M],_t=typeof $[M]=="string"?$[M]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${M}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${M}
          data-edit=${`wfmeta-${M}`}
          @change=${Me=>pt(M,Me)}
        >
          <option value="" ?selected=${!he.includes(_t)}>
            ${re}
          </option>
          ${he.map(Me=>c`<option value=${Me} ?selected=${_t===Me}>${Me}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function de(d,$){return T?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${B}
            @input=${Te}
            @keydown=${y=>wt(y,tt,Ue,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${tt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ue}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${d}</h2>
        ${mt($).map(y=>c`<span class="detail-usage-total" title=${y.tooltip}
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
    `}function v(d){let $=bt(d.created_at),y=bt(d.updated_at);return!$&&!y?c``:c`
      ${$?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${$}</span>
          </div>`:""}
      ${y?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${y}</span>
          </div>`:""}
    `}function H(d,$){return c`
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
          @change=${f}
        >
          ${tp.map(y=>c`<option value=${String(y)} ?selected=${y===$}>
                P${y}
              </option>`)}
        </select>
      </div>
    `}function z(d){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${C?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Se}
            >
              ✎
            </button>`}
      </div>
      ${C?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${x}
              @input=${je}
              @keydown=${$=>wt($,ut,we,!0)}
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
          </div>`:c`<div class="detail-overlay__desc">
            ${d||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function me(d){let $=typeof d.notes=="string"?d.notes:"";return $.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${$}</div>
    `}function We(d){let $=Array.isArray(d.labels)?d.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${$.map(y=>c`<span class="detail-label-chip"
              >${y}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${y}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+y}
                @click=${()=>ce(y)}
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
            @input=${k}
            @keydown=${te}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${R}
          >
            추가
          </button>
        </span>
      </div>
    `}function Je(){if(!u)return c``;let d=p||{},$=String(d.id||u),y=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",M=Be(),re=d.status||"open",he=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",_t=d.description||"",Me={...d,metadata:{...d.metadata||{},..._}};return c`
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
            @click=${rt}
          >
            ${$}
          </button>
          ${de(y,M)}
          ${H(re,he)} ${v(d)}
          ${z(_t)}
          ${Ti(O,ke,{expanded:oe,draft:I,sending:ie,error:j})}
          ${me(d)} ${We(d)} ${Xe(d)}
          ${Pt(d)} ${kt(d)}
          ${xi(d,_e)}
          ${vt()}
          ${Di(Me,le,L(),X(),W())}
          ${Ui({expanded:q,loading:V,error:K,data:Ie},{onToggle:Ve})}
          ${Bi($e(),w,{total:M,expanded:Ne})}
        </div>
      </div>
    `}function m(){Pe(Je(),e)}return{load(d){d!==u&&(_={},b="",Q(),pe(),ve()),u=d,p=null,st()},clear(){u=null,p=null,_={},b="",E=!1,Q(),pe(),ve(),xe.close(),be.close(),Pe(c``,e)},destroy(){dt&&(dt(),dt=null),it&&(it(),it=null),yt&&(yt(),yt=null),document.removeEventListener("keydown",It),xe.destroy(),ge.parentNode&&ge.parentNode.removeChild(ge),be.destroy(),fe.parentNode&&fe.parentNode.removeChild(fe),u=null,p=null,b="",E=!1,pe(),ve(),Pe(c``,e)}}}var rp=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function zi(e,t){return Es(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function np(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function Hi(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function i(S){let j=r.get();if(j)try{let I=await n("display-policy-set",{expected_revision:j.revision,policy:S(j)});l(I),I&&I.conflict&&I.policy&&(I=await n("display-policy-set",{expected_revision:I.policy.revision,policy:S(I.policy)}),l(I)),I&&I.conflict&&Z("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Z("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function l(S){S&&S.policy&&typeof S.policy=="object"&&r.set(S.policy)}function u(S){let j=r.get();if(!j)return;let I=zi(S,j)!=="shown";i(ie=>np(S,ie,I))}function p(){let S=a.trim();S.length!==0&&(a="",i(j=>j.hidden_prefixes.includes(S)?{hidden_prefixes:j.hidden_prefixes}:{hidden_prefixes:[...j.hidden_prefixes,S]}),B())}function _(S){i(j=>({hidden_prefixes:j.hidden_prefixes.filter(I=>I!==S)}))}function b(S){let j=r.get();if(!j)return;let I=j.chips[S]===!1;i(()=>({chips:{[S]:I}}))}function E(S){let j=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${j.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${j.map(I=>{let ie=zi(I,S);return c`<button
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
    `}function T(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(j=>c`<span class="display-settings__prefix">
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
          <button type="button" @click=${p}>추가</button>
        </div>
      </section>
    `}function C(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${rp.map(([j,I])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${j}
                  .checked=${S.chips[j]!==!1}
                  @change=${()=>b(j)}
                />
                <span>${I}</span>
              </label>`)}
        </div>
      </section>
    `}function B(){let S=r.get();Pe(c`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${D}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${S?c`${E(S)} ${T(S)}
                ${C(S)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let x=!1,Y=()=>{x=!1};o.addEventListener("close",Y),o.addEventListener("cancel",Y);let Q=null;r.subscribe&&(Q=r.subscribe(()=>{x&&B()}));function O(){x||(a="",x=!0,B(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function D(){x&&(x=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:O,close:D,destroy(){x=!1,o.removeEventListener("close",Y),o.removeEventListener("cancel",Y),Q&&(Q(),Q=null),o.remove()}}}function Wi(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,p,_="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let b=typeof _=="string"?_.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function Gi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Yi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var sp={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},Vi=160;function op(e){return e.length>Vi?`${e.slice(0,Vi)}\u2026`:e}function ns(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let i=null,l=!1;function u(){return r&&r.get()||{revision:0,exec_defaults:{}}}function p(){let g=u();return typeof g.revision=="number"?g.revision:0}function _(){let g=n?n.get():null;return!g||typeof g.revision!="number"?null:{revision:g.revision,presets:Array.isArray(g.presets)?g.presets:[]}}function b(g){n&&g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&n.set({revision:g.revision,presets:g.presets})}function E(g){g&&g.queue&&r&&r.set(g.queue)}function T(){return u().runner_catalog??null}let C=null;function B(){if(C!==null)return C;let g=u().default_exec_preset_id;return typeof g=="string"&&g.length>0?g:null}async function x(g){if(!s)return;let A=_();if(!A)return;C=g||"";let w=D(g);if(ee(),!w.viable){Z(w.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3);return}try{let L=await s("worker-queue-set-default-exec-preset",{preset_id:g||null,expected_queue_revision:p(),expected_preset_revision:A.revision});if(E(L),L&&L.presets&&n&&n.set(L.presets),L&&L.conflict){Z("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3);return}if(L&&L.applied){C=null,ee();return}Z("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{Z("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function Y(g){i={id:g.id,name:g.name,settings:{...g.settings||{}}},j(),l=!1,ee()}function Q(){i={id:null,name:"",settings:{}},l=!1,ee()}function O(g){let A=g&&g.settings&&typeof g.settings=="object"?g.settings:{},w=L=>typeof A[L]=="string"?A[L]:L==="impl_runtime"&&typeof A.impl_model=="string"&&nr(T(),A.impl_model)||"";return Ur({selectedOf:w,effectiveOf:w,runner_catalog:T()}).some(L=>L.groups.some(W=>W.options.some(X=>X.value===L.selected&&X.label.endsWith("(\uBE44\uD638\uD658)"))))}function D(g){if(!g)return{viable:!0,missing:!1,incompatible:!1,preset:null};let w=_()?.presets.find(W=>W.id===g);if(!w||w.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let L=w.compatible===!1||O(w);return{viable:!L,missing:!1,incompatible:L,preset:w}}function S(){let g=i?.settings.orchestration_model;return typeof g!="string"?null:nr(T(),g)}function j(){if(!i)return;let g=rs({impl_runtime:i.settings.impl_runtime||"",impl_model:i.settings.impl_model||"",impl_effort:i.settings.impl_effort||""},T(),S());for(let A of["impl_runtime","impl_model","impl_effort"])g[A]?i.settings[A]=g[A]:delete i.settings[A]}function I(g){let A=g&&g.settings&&typeof g.settings=="object"?g.settings:{},w=Br.filter(W=>typeof A[W]=="string").length,L=Br.filter(W=>typeof A[W]=="string").map(W=>`${to[W]?.title||W}: ${A[W]}`);return{count:`${w}/12 \uC9C0\uC815`,choices:L.length>0?L.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function ie(g){if(!s||!window.confirm(`\u201C${g.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let A=_();if(A)try{let w=await s("exec-preset-delete",{expected_revision:A.revision,id:g.id});b(w),w&&w.conflict&&Z("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{Z("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function Re(g=!1){if(!s||!i)return;let A=_();if(!A)return;let w=g||i.id===null,L={expected_revision:A.revision,...w?{}:{id:i.id},name:i.name,settings:{...i.settings}};try{let W=await s(w?"exec-preset-create":"exec-preset-update",L);if(b(W),W&&W.conflict){l=!0,ee();return}if(W&&W.applied){i=null,l=!1,ee();return}Z("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{Z("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function oe(g){return c`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${no(g.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${g.key}
        ?disabled=${g.disabled}
        @change=${A=>{if(!i)return;let w=A.target.value;w?i.settings[g.key]=w:delete i.settings[g.key],(g.key==="impl_runtime"||g.key==="impl_model"||g.key==="impl_effort"||g.key==="orchestration_model")&&j(),l=!1,ee()}}
      >
        ${ts(g.groups,g.selected,ro[g.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function pe(){if(!i)return"";let g=W=>typeof i?.settings[W]=="string"?i.settings[W]:"",A=Ur({selectedOf:g,effectiveOf:g,runner_catalog:T(),controller_runtime:S()}),w=_(),L=i.id!==null&&w!==null&&!w.presets.some(W=>W.id===i?.id);return c`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${i.name}
          data-preset-name
          @input=${W=>{i&&(i.name=W.target.value,l=!1)}}
        />
      </label>
      ${l?c`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${L?c`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      ${A.map(oe)}
      <div class="exec-preset-editor__actions">
        ${L?c`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{Re(!0)}}
            >
              새 프리셋으로 저장
            </button>`:c`<button
              type="button"
              data-preset-save
              @click=${()=>{Re(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{i=null,l=!1,ee()}}
        >
          취소
        </button>
      </div>
    </div>`}function Oe(){let g=_(),A=g?g.presets.filter(w=>w?.migration_pending!==!0):[];return c`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${Q}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${g===null?c`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:A.length===0?c`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:A.map(w=>{let L=I(w),W=typeof w.reference_count=="number",X=W?w.reference_count:null,J=Array.isArray(w.reference_summary)?w.reference_summary.map(Ee=>Ee?.display_name||Ee?.workspace_key).filter(Boolean).join(", "):"";return c`<article
                class="exec-preset-card"
                data-preset-id=${w.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${w.name}</strong>
                  <span>${L.count}</span>
                  <span data-preset-references=${w.id}
                    >${W?`\uCC38\uC870 ${X}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${O(w)?c`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${L.choices}</small>
                  ${J?c`<small data-preset-impact=${w.id}
                        >업데이트 영향: ${J}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  <button
                    type="button"
                    data-preset-edit=${w.id}
                    @click=${()=>Y(w)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${w.id}
                    ?disabled=${X===null||X>0||w.reference_scan_complete===!1}
                    title=${X===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":X>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":w.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{ie(w)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${pe()}
    </section>`}function Ye(){let g=_(),A=g?g.presets.filter(J=>J?.migration_pending!==!0):[],w=B()||"",L=D(w),W=L.preset,X=W?I(W):null;return c`<section class="exec-defaults__workspace" data-workspace-preset>
      <h3>현재 워크스페이스 기본 프리셋</h3>
      <p class="exec-defaults__hint">
        이 워크스페이스는 프리셋 하나를 참조합니다. 없음은 harness 기본값을
        사용합니다.
      </p>
      <select
        class="exec-defaults__sel"
        data-workspace-preset-select
        aria-label="워크스페이스 기본 프리셋"
        .value=${w}
        ?disabled=${g===null}
        @change=${J=>{x(J.target.value)}}
      >
        <option value="" ?selected=${w===""}>
          없음 — harness 기본값
        </option>
        ${w&&L.missing?c`<option value=${w} ?selected=${!0}>
              ${w} (선택한 프리셋 없음)
            </option>`:""}
        ${A.map(J=>c`<option
              value=${J.id}
              ?selected=${J.id===w}
              ?disabled=${J.compatible===!1}
            >
              ${J.name}${J.compatible===!1?" (\uBE44\uD638\uD658)":""}
            </option>`)}
      </select>
      ${W?c`<p data-workspace-preset-summary>
            ${X?.count} · ${X?.choices}
            ${L.incompatible?" \xB7 \uBE44\uD638\uD658":""}
          </p>`:""}
      ${L.missing?c`<p data-workspace-preset-missing>
            선택한 프리셋을 찾을 수 없습니다. 실행이 차단됩니다.
          </p>`:L.incompatible?c`<p data-workspace-preset-incompatible>
              선택한 프리셋이 비호환입니다. 실행이 차단됩니다.
            </p>`:""}
    </section>`}function nt(){let g=u().workspace_info;return g&&typeof g=="object"?g:{}}function Le(g,A){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${g}"
      >${A}</span
    >`}function He(g){let A=g?Yi(g.cmd):"",w=g?Gi(g.timeout_ms):"",L=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${A?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${A}</span>
            ${Le("config","config")}
            ${w?c`<span class="exec-defaults__vd-meta"
                  >timeout ${w}</span
                >`:""}
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${L}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function ke(g){let A=g?Yi(g.cmd):"",w=g?Gi(g.timeout_ms):"",L=w?`timeout ${w} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",W=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${A?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${A}</span>
            ${Le("config","config")}
            ${g.detached===!0?Le("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${L}</span>
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${W}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function ge(g){if(!g||typeof g!="object")return"";let A=sp[String(g.outcome)];if(!A)return"";let w=g.outcome==="failed"&&g.reason?`${A.label} \xB7 ${g.reason}`:A.label,L=[bt(g.at),typeof g.bead_id=="string"?g.bead_id:"",typeof g.base_sha=="string"?g.base_sha.slice(0,7):""].filter(J=>J.length>0).join(" \xB7 "),W=typeof g.detail=="string"&&g.detail.length>0?op(g.detail):"",X=typeof g.log_path=="string"&&g.log_path.length>0?g.log_path:"";return c`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${Le(A.modifier,w)}
        ${L?c`<span class="exec-defaults__vd-meta">${L}</span>`:""}
      </div>
      ${W?c`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${W}</code>
          </div>`:""}
      ${X?c`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${X}</code>
          </div>`:""}
    </div>`}let xe=!1,fe=!1,be=!1,q=null;async function V(){if(s){fe=!0,be=!1,ee();try{let g=await Promise.resolve(s("get-worker-system-prompt",{}));!g||typeof g!="object"||Array.isArray(g)?be=!0:q=g}catch{be=!0}finally{fe=!1,ee()}}}function K(){if(xe=!xe,xe&&!q){V();return}ee()}function Ie(){return c`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${xe?"true":"false"}
          @click=${K}
        >
          ${xe?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${xe?P():""}
    </section>`}function P(){let g=qr({loading:fe,error:be});if(g)return g;if(!q)return"";let A=Array.isArray(q.variants)?q.variants:[];return c`<div class="exec-defaults__sp-body">
      ${q.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${q.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${A.map(w=>c`<div class="exec-defaults__sp-variant" data-variant=${w.key}>
            <div class="exec-defaults__sp-cond">${w.condition}</div>
            ${rr(w.label,w.system_prompt)}
          </div>`)}
    </div>`}function U(g){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${He(g.verify_cmd)} ${ke(g.deploy_cmd)}
      ${ge(g.last_deploy)}
    </section>`}function ee(){if(Pe(c`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${Ke}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${Oe()} ${Ye()}
            ${U(nt())}
            ${Ie()}
          </div>
        </div>
      `,a),C!==null){let g=a.querySelector("[data-workspace-preset-select]");g&&(g.value=C)}}let ve=!1,Ae=()=>{ve=!1},Ve=g=>{g.target===g.currentTarget&&Ke()};a.addEventListener("close",Ae),a.addEventListener("cancel",Ae),a.addEventListener("click",Ve);let $e=null;r&&r.subscribe&&($e=r.subscribe(()=>{ve&&ee()}));let Be=null;n&&n.subscribe&&(Be=n.subscribe(()=>{ve&&ee()}));function Ne(){ve||(ve=!0,ee(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function Ke(){ve&&(ve=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Ne,close:Ke,destroy(){ve=!1,a.removeEventListener("close",Ae),a.removeEventListener("cancel",Ae),a.removeEventListener("click",Ve),$e&&($e(),$e=null),Be&&(Be(),Be=null),a.remove()}}}function jr(e){let t=Rt(e.created_at),r=Rt(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${bt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${bt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function ap(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function fn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ss(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Gt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,_)=>(p.requested_at||0)-(_.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?ap(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:u}}function sr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return c`<div
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
  </div>`}function io(e){let t=e.draggable&&!e.done,r=t&&e.lane==="queue",n=Array.isArray(e.badges)?e.badges:[],s=mt(e.usage),o=Ft(e.usage),a=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action,l=e.lane==="done"&&!i,u=l?Rt(e.done_at):"",p=e.selectable?c`<input
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
      </button>`:t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",b=e.worker_serial===!0?c`<span class="worker-mini__serial">머지까지 단독</span>`:e.worker_serial===null?c`<span class="worker-mini__serial worker-mini__serial--unknown"
            >실행 방식 확인 중</span
          >`:"",E=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",T=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,C=c`<span class="worker-mini__title">${e.title}</span>`,B=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",x=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",Y=n.map(pe=>pe===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${pe}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${pe===e.completion_badge&&e.completion_title||""}
          >${pe}</span
        >`),Q=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",O=s.length>0?s.map(pe=>c`<span class="worker-usage" title=${pe.tooltip}
              >${pe.label}</span
            >`):o?c`<span class="worker-usage" title=${Nr(e.usage)}
            >${o}</span
          >`:"",D=a?c`<span class="merge-step"
        >${a.label}<span class="merge-step__n"
          >${a.index}/${a.total}</span
        ></span
      >`:"",S=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",j=e.cancel_action?c`<button
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
        </button>`:"",Re=e.revise_action?c`<button
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
    ${l?c`<div class="worker-mini__row1">${E}${T}${C}</div>
          <div class="worker-mini__row2">
            ${O}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${bt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${Y}${D}
            <span class="worker-mini__actions"
              >${S}${j}${ie}</span
            >
            ${jr(e)}
          </div>`:i?c`<div class="worker-mini__head">
              ${p}${_}${E}${T}${B}${x}${Y}${b}${Q}
            </div>
            <div class="worker-mini__body">${C}</div>
            ${oe?c`<div class="worker-mini__foot">
                  ${O}${D}
                  <span class="worker-mini__actions"
                    >${S}${j}${ie}${Re}</span
                  >
                  ${sr(e)}
                </div>`:""}
            ${jr(e)}`:c`<div class="worker-mini__line">
              ${p}${_}${E}${T}${C}${B}${x}${Y}${b}${Q}${O}${D}${S}${j}${ie}
            </div>
            ${sr(e)} ${jr(e)}`}
  </div>`}function ip(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
    ${jr(e)}
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?ip(n):io(n))}
          </div>`}
  </section>`}var Ki=160;function Zi(e){return e.length>Ki?`${e.slice(0,Ki)}\u2026`:e}function lp(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${Zi(e.command)}</code>`:""}
  </div>`}function cp(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function dp(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function lo(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Xi(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
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
          ${lp(e.failure.cause_detail)}
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
                <code>${Zi(r.detail)}</code>
              </div>`:""}
          ${dp(r.log_path)} ${cp(r.output_tail)}
        </div>`)}
  </div>`}function up(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?lo(t-e.started_at):"\u2014",a=Wt(e),i=dr(e),l=mt(e.usage),u=Ft(e.usage),p=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,b=e.attempt_id&&e.attempt_id===r,E=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${b?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
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
    ${a||l.length>0||u||p||_?c`<div class="rtile__meta">
          ${p?c`<span class="worker-mini__badge">${p}</span>`:""}
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
                  title=${Nr(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${jr(e)} ${sr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function co(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>up(s,t,r))}
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
  </svg>`}function uo(){return mr(Zt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function po(){return mr(Zt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Qi(){return mr(Zt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Ji(){return mr(Zt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function el(){return mr(Zt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function tl(){return mr(Zt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function rl(){return mr(Zt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function nl(){return mr(Zt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var _n=1,pp=6e4,fp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},_p=new Set(["auto_merge","merged","merge","done"]),sl={running:3,paused:2,failed:1};function mp(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function gp(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),b=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let _=sl[u.run_state],b=sl[i];if(_>b||_===b&&(u.started_at??0)>(l??0))continue}let p=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Dt(e,a.bead_id),can_pause:i==="running"&&p,can_resume:i!=="running"&&p&&!n.has(a.attempt_id)})}return o}function ol(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Tt(e){return e&&typeof e=="object"?e:{}}function fo(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let x of s)x&&typeof x.root_dir=="string"&&a.set(x.root_dir,x);let i=[],l=[],u=[],p=[],_=[],b=new Map;for(let x of n){if(!x||typeof x.root_dir!="string")continue;let Y=x.root_dir,Q=x.name||Y,O=a.get(Y),D=O&&typeof O.revision=="number"?O.revision:typeof x.revision=="number"?x.revision:0,S=Tt(x.attempts),j=Tt(x.bead_titles),I=Tt(x.pr_observations),ie=Tt(x.admission),Re=Tt(x.revise_parked),oe=Tt(x.merge_queue_state),pe=Tt(x.cleanup_failed),Oe=Tt(x.deployment_reconcile||x.reconcile),Ye=Tt(x.discard_operations),nt=Array.isArray(x.merge_queue)?x.merge_queue:[],Le=new Set(nt.filter(q=>q&&typeof q.bead_id=="string").map(q=>q.bead_id)),He=new Map(nt.filter(q=>q&&typeof q.bead_id=="string").map(q=>[q.bead_id,q])),ke=Array.isArray(x.queue)?x.queue:[],ge=Array.isArray(x.done)?x.done:[],xe=new Map;for(let q of ge)q&&typeof q.bead_id=="string"&&typeof q.added_at=="number"&&xe.set(q.bead_id,q.added_at);let fe=q=>({id:q,title:j[q]||q,root_dir:Y,workspace_name:Q,expected_revision:D,draggable:!1}),be=new Set;for(let[q,V]of gp(S,xe))be.add(q),l.push({...fe(q),lane:"running",attempt_id:V.attempt_id,run_state:V.run_state,can_pause:V.can_pause,can_resume:V.can_resume,started_at:V.started_at,last_event_at:V.last_event_at,runner:V.runner,model:V.model,effort:V.effort,speed:V.speed,resumed_from:V.resumed_from,continuation_mode:V.continuation_mode,usage:V.usage,discard:Gt(Ye,q,{attempt_id:V.attempt_id}),badges:V.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:V.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:V.run_state==="failed"});for(let q of Array.isArray(x.pr_wait)?x.pr_wait:[]){let V=q&&q.bead_id;if(typeof V!="string"||be.has(V))continue;be.add(V);let K=Tt(I[V]),Ie=Tt(K.pr),P=K.gate?Tt(K.gate):null,U=Le.has(V),ee=He.get(V)?.continuation_action||null,ve=!!ee&&ee.continuation===null,Ae=oe.active===V,Ve=q.external===!0,$e=pe[V]||null,Be=Tt(Oe[V]),Ne=!$e&&Be.adapter==="managed"&&Be.stage==="restarting",Ke=!!P&&P.base_badge==="\uCDA9\uB3CC",g=!!$e&&!!P&&P.tier==="merged",A=Ve&&!!P&&P.tier==="merged",w=Gt(Ye,V,{external:Ve,merge_active:Ae,merge_queued:U,merged:!!$e||P?.tier==="merged"}),L=!!w.operation;u.push({...fe(V),lane:"pr_wait",pr_number:typeof Ie.number=="number"?Ie.number:null,pr_url:typeof Ie.url=="string"?Ie.url:void 0,external:Ve,usage:Dt(S,V),badges:ve?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:$e?["\uC815\uB9AC \uC2E4\uD328"]:Ne?["\uC815\uB9AC \uC911 \xB7 \uC7AC\uC2DC\uC791"]:[],alert:!!$e,reason:$e?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":Ne?"\uC815\uB9AC \uC911 \xB7 \uC7AC\uC2DC\uC791":"PR \uB300\uAE30",merge_action:!U||ve,merge_enabled:!L&&(ve||P?.enabled===!0||Ke||g||A),merge_label:ve?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":A||g?"\uC815\uB9AC":Ke&&!g?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ve?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":L?w.error?`\uD3D0\uAE30 \uC2E4\uD328: ${w.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${w.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:A?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":g?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":Ke?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":P?.enabled===!0?`\uBA38\uC9C0 (${P.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${P?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:U&&!ve,cancel_enabled:!Ae,continuation_mismatch:ee?.mismatch||null,discard:w,discard_action:w.action,discard_enabled:w.enabled,discard_title:w.title})}for(let q=0;q<ke.length;q++){let V=ke[q],K=V&&V.bead_id;if(typeof K!="string"||be.has(K))continue;be.add(K);let Ie=Re[K],P=Gt(Ye,K),U=P.operation?P:null,ee={...fe(K),lane:"queue",draggable:!U,discard:U||void 0,reason:ol(ie,K),queue_position:q+1,queue_index:q,queue_length:ke.length,badges:Ie?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ie,revise_action:!!Ie,revise_enabled:!!Ie&&!U,revise_title:Ie?Ie.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ie.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};p.push(ee);let ve=b.get(Y);ve?ve.push(ee):b.set(Y,[ee])}for(let q of Array.isArray(x.runnable)?x.runnable:[]){let V=q&&q.bead_id;typeof V!="string"||be.has(V)||(be.add(V),i.push({...fe(V),title:q.title||j[V]||V,lane:"runnable",draggable:!0,reason:ol(ie,V),created_at:q.created_at??void 0,updated_at:q.updated_at??void 0,labels:Array.isArray(q.labels)?q.labels:[],spec_reviewer:typeof q.spec_reviewer=="string"?q.spec_reviewer:void 0,plan_state:q.plan_state==="approved"||q.plan_state==="authored"?q.plan_state:"none",workflow:q.route?{route:q.route,chips:{route:q.route}}:null,place_index:ke.length}))}for(let q of ge){let V=q&&q.bead_id;if(typeof V!="string"||be.has(V)||(be.add(V),o!==void 0&&typeof q.added_at=="number"&&q.added_at<o))continue;let K=mp(S,V);_.push({...fe(V),lane:"done",done:!0,usage:Dt(S,V),done_at:typeof q.added_at=="number"?q.added_at:void 0,done_kind:K&&typeof K.done_kind=="string"?K.done_kind:null})}}let E=new Map;s.forEach((x,Y)=>{x&&typeof x.root_dir=="string"&&E.set(x.root_dir,Y)});let T=r&&r.running_sort==="repo"?"repo":"started";l.sort((x,Y)=>{if(T==="repo"){let D=E.get(x.root_dir)??Number.MAX_SAFE_INTEGER,S=E.get(Y.root_dir)??Number.MAX_SAFE_INTEGER;if(D!==S)return D-S}let Q=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,O=typeof Y.started_at=="number"&&Number.isFinite(Y.started_at)?Y.started_at:null;return Q!==null&&O!==null&&Q!==O?Q-O:Q===null&&O!==null?1:Q!==null&&O===null?-1:x.id.localeCompare(Y.id)}),_.sort((x,Y)=>(Y.done_at??0)-(x.done_at??0));let C=s.length>0?s:n.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,exec_defaults:x&&x.exec_defaults,default_exec_preset_id:x&&x.default_exec_preset_id,runner_catalog:x&&x.runner_catalog})),B=[];for(let x of C)!x||typeof x.root_dir!="string"||B.push({root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:typeof x.slots=="number"&&x.slots>=_n?x.slots:_n,revision:typeof x.revision=="number"?x.revision:0,exec_defaults:Tt(x.exec_defaults),default_exec_preset_id:typeof x.default_exec_preset_id=="string"?x.default_exec_preset_id:null,runner_catalog:Tt(x.runner_catalog),items:b.get(x.root_dir)||[]});return{runnable:i,queue:p,queue_groups:B,running:l,pr_wait:u,done:_,automation:{total:B.length,both_on:B.filter(x=>x.auto_advance&&x.auto_merge).length}}}function hp(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<pp;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${bt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${Rt(e,t)}</span
        >`}</span
  >`}function mn(e){return c`<div class="mon-c__title">${e.title}</div>`}function gn(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function os(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function _o(e){let t=mt(e.usage),r=Ft(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${Nr(e.usage)}
        >${r}</span
      >`:""}function mo(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function bp(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${po()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${uo()}
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
          ${Ji()}
        </button>`:""}
  </span>`}function vp(e,t){let r=typeof e.started_at=="number"?lo(t-e.started_at):"";return c`${mn(e)}
    <div class="mon-c__meta">
      ${mo(e)}${hp(e.last_event_at,t)}${gn(e)}${os(e)}
      ${Wt(e)?c`<span class="mon-c__model">${Wt(e)}</span>`:""}
      ${dr(e)?c`<span
            class="rtile__resumed"
            title=${dr(e)}
            >↻</span
          >`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${_o(e)}${bp(e)}${sr(e)}
    </div>`}function yp(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Rt(e.updated_at);return c`${mn(e)}
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
      ${i?c`<span title=${`\uC218\uC815 ${bt(e.updated_at)}`}
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
    </div>`}function wp(e){let t=!!e.discard?.operation;return c`${mn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${gn(e)}
      ${mo(e)}
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
        </div>`:""}`}function kp(e){let t=!!(Ft(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${mn(e)}
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
      ${mo(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?c`<div class="mon-c__tail">
          ${_o(e)}
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
        </div>`:""}`}function $p(e,t){let r=e.done_kind||"",n=r?fp[r]||r:"",s=Rt(e.done_at,t);return c`${mn(e)}
    <div class="mon-c__meta">
      ${gn(e)}${os(e)}
      ${n?c`<span
            class="mon-live__kind${_p.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${_o(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${bt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function al(e,t){return e.lane==="running"?vp(e,t):e.lane==="runnable"?yp(e):e.lane==="queue"?wp(e):e.lane==="pr_wait"?kp(e):$p(e,t)}function il(e){let t=String(e.revision);return c`<header
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
        ${e.auto_advance?po():uo()}
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
        ${el()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${tl()}
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
        ${rl()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function ll(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Ht.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Qi():nl()}
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
  </div>`}function cl(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function dl(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return mt(Fn(t));let r={};for(let i of Jt)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let p of Jt){let _=l[p];typeof _=="number"&&Number.isFinite(_)&&(r[p]+=_,n=!0,u=!0)}if(u){o+=1;let p=l.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Ft(r):null}var pl="bdui.monitor.done-range",fl="bdui.monitor.running_sort";function xp(){try{let e=window.localStorage.getItem(pl);return Ot(e)?e:Ct}catch{return Ct}}function Sp(e){try{window.localStorage.setItem(pl,e)}catch{}}function Ap(){try{return window.localStorage.getItem(fl)==="repo"?"repo":"started"}catch{return"started"}}function Tp(e){try{window.localStorage.setItem(fl,e)}catch{}}var _l="tab:monitor:pipeline",Ep=1e3,Cp=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function ul(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return c`<div
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
    ${al(e,t)}
  </div>`}function ml(e,t){let r=ot("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,i=t.getWorkspacePath,l=t.switchWorkspace,u=t.now||(()=>Date.now()),p=t.confirm||(g=>typeof globalThis.confirm!="function"||globalThis.confirm(g)),_=xp(),b=Ap();function E(){let g=Ht.find(A=>A.value===_);return g?g.label:""}let T=document.createElement("div");T.className="mon",e.appendChild(T);let C=fo(null,null),B=null,x=new Map,Y=new Set;function Q(g){return C.queue_groups.find(A=>A.root_dir===g)||null}let D=ns(e,{queueStore:{get(){if(!B)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let g=x.get(B);if(g)return g;let A=Q(B),w=s&&s.get?s.get():null,L=(Array.isArray(w)?w:[]).find(W=>W&&W.root_dir===B);return{revision:A?A.revision:0,exec_defaults:A?A.exec_defaults:{},default_exec_preset_id:A?A.default_exec_preset_id:null,runner_catalog:A?A.runner_catalog:null,workspace_info:L?L.workspace_info:void 0}},set(g){B&&x.set(B,g);for(let A of Array.from(Y))A()},subscribe(g){return Y.add(g),()=>Y.delete(g)}},presetStore:a,transport:o?(g,A)=>o(g,g==="worker-queue-set-default-exec-preset"||g==="get-worker-system-prompt"?{...A||{},root_dir:B}:A):void 0,getWorkspacePath:()=>B||void 0}),S=null,j=null;async function I(g,A,w,L,W=!0){if(!o||!w)return null;let X=await o(g,{...A,root_dir:w,expected_revision:L});if(X&&X.conflict&&W){X.queue&&x.set(w,X.queue);let J=X.queue&&typeof X.queue.revision=="number"?X.queue.revision:L;X=await o(g,{...A,root_dir:w,expected_revision:J})}return X&&X.queue&&w&&x.set(w,X.queue),X}function ie(g,A){let w=x.get(g),L=s&&s.get?s.get():null,W=(Array.isArray(L)?L:[]).find(J=>J?.root_dir===g);return(w||W)?.merge_queue?.find(J=>J.bead_id===A)?.continuation_action}async function Re(g,A,w,L){let W=await I(g,A,w,L),X=x.get(w)?.revision??W?.queue?.revision??L;return Qt(W,(J,Ee)=>I(g,{...A,continuation:J,decision_token:Ee},w,X,!1),{refresh:J=>I(g,A,w,J?.queue?.revision??x.get(w)?.revision??X,!1)})}async function oe(g,A,w,L){let W=await Qt({continuation_mismatch:L},(J,Ee)=>I("worker-merge-queue-add",{bead_id:A,continuation:J,decision_token:Ee},g,w,!1)),X=W?.queue?.merge_queue?.find(J=>J.bead_id===A)?.continuation_action;W?.applied!==!0&&X?.continuation===null&&X.mismatch&&await oe(g,A,W.queue.revision,X.mismatch)}async function pe(g,A,w){let L=await I("worker-discard",g,A,w);if(L&&L.discarded===!0){Z(ss(L),"success",5e3);return}if(L&&L.reason){Z(`\uD3D0\uAE30 \uC2E4\uD328: ${L.reason}`,"error");return}if(L&&L.accepted&&L.pending==="merged_revert"){Z("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(L&&L.accepted){Z(`\uD3D0\uAE30 \uC9C4\uD589: ${L.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}L&&!L.conflict&&Z("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Oe(g,A,w){return!o||!w?null:await o(g,{...A,root_dir:w})}async function Ye(g){if(!o||!g&&!p("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let A=await o("monitor-auto-toggle",{on:g}),w=A&&Array.isArray(A.failed)?A.failed:[];w.length>0&&Z(`\uC790\uB3D9\uD654 ${g?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${w.map(L=>L.root_dir).join(", ")}`,"error",3200)}async function nt(){let g=new Map;for(let A of C.pr_wait)g.has(A.root_dir)||g.set(A.root_dir,A.expected_revision);for(let[A,w]of g)await I("worker-merge-queue-add-all",{},A,w)}let Le=null,He=!1,ke=null;function ge(){ke!==null&&clearTimeout(ke),ke=setTimeout(()=>{ke=null,He=!1},0)}function xe(g){let A=g.target;return typeof A?.closest=="function"?A.closest(".mon-group"):null}function fe(g){let A=xe(g);return!A||!Le?null:(A.getAttribute("data-root-dir")||"")===Le.root_dir?A:null}function be(){for(let g of Array.from(T.querySelectorAll(".mon-group--drag-over")))g.classList.remove("mon-group--drag-over")}function q(g){let A=g.target,w=typeof A?.closest=="function"?A.closest('.mon-card[draggable="true"]'):null;if(w){Le={bead_id:w.getAttribute("data-issue-id")||"",lane:w.getAttribute("data-lane")||"",root_dir:w.getAttribute("data-root-dir")||"",revision:Number(w.getAttribute("data-revision")||0)||0,queue_index:Number(w.getAttribute("data-queue-index")),queue_length:Number(w.getAttribute("data-queue-length")),place_index:Number(w.getAttribute("data-place-index"))},He=!0;try{g.dataTransfer?.setData("text/plain",Le.bead_id),g.dataTransfer&&(g.dataTransfer.effectAllowed="move")}catch{}}}function V(g){let A=fe(g);A&&(g.preventDefault(),g.dataTransfer&&(g.dataTransfer.dropEffect="move"),A.classList.add("mon-group--drag-over"))}function K(g){xe(g)?.classList.remove("mon-group--drag-over")}function Ie(){Le=null,be(),ge()}function P(g){let A=fe(g),w=Le;if(Le=null,be(),!A||!w||!w.bead_id)return;g.preventDefault();let L=g.target,W=typeof L?.closest=="function"?L.closest('.mon-card[data-lane="queue"]'):null,X=W&&A.contains(W)?Number(W.getAttribute("data-queue-index")):NaN;if(w.lane==="runnable"){let et=Number.isFinite(X)?X:w.place_index;if(!Number.isFinite(et))return;I("worker-queue-place",{bead_id:w.bead_id,index:et},w.root_dir,w.revision);return}if(w.lane!=="queue"||W&&W.getAttribute("data-issue-id")===w.bead_id)return;let J=w.queue_index,Ee=Number.isFinite(X)?J>X?X:X-1:w.queue_length-1;!Number.isFinite(Ee)||Ee<0||Ee===J||I("worker-queue-reorder",{bead_id:w.bead_id,to_index:Ee},w.root_dir,w.revision)}function U(g){let A={runnable:C.runnable,queue:C.queue,running:C.running,pr_wait:C.pr_wait,done:C.done};return c`${ll({automation:C.automation,counts:{running:C.running.length,queue:C.queue.length,pr_wait:C.pr_wait.length},running_sort:b,done_range:_,token_total:dl(C.done),token_tooltip:cl(E())})}
      <div class="worker-lanes mon-lanes">
        ${Cp.map(w=>{let L=A[w.lane],W=w.lane==="queue"?C.queue_groups.length>0?c`${C.queue_groups.map(X=>c`<div
                        class="mon-group"
                        data-root-dir=${X.root_dir}
                      >
                        ${il(X)}
                        <div class="mon-group__list">
                          ${X.items.map(J=>ul(J,g))}
                        </div>
                      </div>`)}`:void 0:L.length>0?c`${L.map(X=>ul(X,g))}`:void 0;return Yt({id:`monitor-${w.lane}`,lane:w.pane,title:w.lane==="done"?`\uC644\uB8CC\xB7${E()}`:w.title,items:L,empty:w.empty,body:W,live:w.lane==="running"&&L.length>0,header_control:w.lane==="pr_wait"&&L.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function ee(){let g=s&&s.get?s.get():null,A=s&&s.getWorkspacesState?s.getWorkspacesState():[],w=u();C=fo(g,A,{done_since:kr(_,w),running_sort:b}),Pe(U(w),T)}function ve(g,A){let w=i?i():void 0;if(!A||!w||A===w||!l){n(g);return}l(A).then(()=>{n(g)}).catch(L=>{r("workspace switch for %s failed: %o",A,L)})}function Ae(g){return{root_dir:g.getAttribute("data-root-dir")||"",revision:Number(g.getAttribute("data-revision")||0)||0}}function Ve(g,A){let{root_dir:w,revision:L}=Ae(g),W=g.getAttribute("data-issue-id")||"",X=A.dataset.attemptId||g.getAttribute("data-attempt-id")||"",J=A.classList;if(J.contains("worker-card__place")){I("worker-queue-place",{bead_id:W,index:Number(g.getAttribute("data-place-index")||0)||0},w,L);return}if(J.contains("mon-op--up")||J.contains("mon-op--down")){let Ee=Number(g.getAttribute("data-queue-index")||0)||0,et=J.contains("mon-op--up")?Ee-1:Ee+1;if(et<0)return;I("worker-queue-reorder",{bead_id:W,to_index:et},w,L);return}if(J.contains("mon-op--remove")){I("worker-queue-remove",{bead_id:W},w,L);return}if(J.contains("mon-op--pause")){Oe("worker-attempt-pause",{attempt_id:X},w);return}if(J.contains("mon-op--discard")){if(!p(fn(W,"unmerged")))return;pe({bead_id:W,...X?{attempt_id:X}:{},...A.dataset.operationId?{operation_id:A.dataset.operationId}:{}},w,L);return}if(J.contains("mon-op--resume")){Re("worker-attempt-resume",{attempt_id:X},w,L);return}if(J.contains("mon-op--dismiss")){I("worker-attempt-dismiss",{attempt_id:X},w,L);return}if(J.contains("worker-mini__merge")){let Ee=ie(w,W);Ee?.mismatch&&Ee.continuation===null?oe(w,W,L,Ee.mismatch):I("worker-merge-queue-add",{bead_id:W},w,L);return}if(J.contains("worker-mini__merge-cancel")){I("worker-merge-queue-remove",{bead_id:W},w,L);return}if(J.contains("worker-mini__discard")){let Ee=A.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(fn(W,Ee)))return;pe({bead_id:W,...X?{attempt_id:X}:{},...A.dataset.operationId?{operation_id:A.dataset.operationId}:{}},w,L);return}if(J.contains("worker-mini__revise-fix")){Re("worker-revise-fix",{bead_id:W},w,L);return}J.contains("worker-mini__revise-approve")&&I("worker-revise-approve",{bead_id:W},w,L)}function $e(g){let A=He;He=!1;let w=g.target;if(!w||typeof w.closest!="function"||w.closest("dialog")||w.closest("a"))return;let L=w.closest(".mon-running-sort");if(L){g.preventDefault(),b=L.getAttribute("data-sort")==="repo"?"repo":"started",Tp(b),ee();return}let W=w.closest(".mon-auto-all");if(W){g.preventDefault(),Ye(W.getAttribute("data-on")==="true");return}if(w.closest(".mon-merge-all")){g.preventDefault(),nt();return}let J=w.closest(".mon-ctl--advance");if(J){g.preventDefault();let{root_dir:dt,revision:it}=Ae(J);I("worker-queue-toggle",{on:J.getAttribute("data-on")==="true"},dt,it);return}let Ee=w.closest(".mon-ctl--merge-auto");if(Ee){g.preventDefault();let{root_dir:dt,revision:it}=Ae(Ee);I("worker-merge-auto-toggle",{on:Ee.getAttribute("data-on")==="true"},dt,it);return}let et=w.closest(".mon-ctl--exec");if(et){g.preventDefault(),B=et.getAttribute("data-root-dir")||null,x.delete(B||""),D.open();return}let at=w.closest(".mon-card");if(!at)return;let Ze=w.closest("button");if(Ze){g.preventDefault(),Ve(at,Ze);return}let vt=at.getAttribute("data-issue-id");vt&&!A&&(g.preventDefault(),ve(vt,at.getAttribute("data-root-dir")||""))}function Be(g){let A=g.target;if(!A||typeof A.closest!="function")return;let w=A.closest(".mon-done-range");if(w){_=Ot(w.value)?w.value:Ct,Sp(_),ee();return}let L=A.closest(".mon-slots__input");if(!L)return;let{root_dir:W,revision:X}=Ae(L),J=Number(L.value);if(!Number.isFinite(J))return;let Ee=Math.max(_n,Math.floor(J));I("worker-queue-set-slots",{slots:Ee},W,X)}e.addEventListener("click",$e),e.addEventListener("change",Be),e.addEventListener("dragstart",q),e.addEventListener("dragover",V),e.addEventListener("dragleave",K),e.addEventListener("drop",P),e.addEventListener("dragend",Ie),s&&typeof s.subscribe=="function"&&(S=s.subscribe(()=>{try{x.clear(),ee();for(let g of Array.from(Y))g()}catch{}}));function Ne(){j!==null&&(clearInterval(j),j=null)}function Ke(){ke!==null&&(clearTimeout(ke),ke=null)}return{load(){r("load"),ee(),j===null&&(j=setInterval(()=>{try{ee()}catch{}},Ep))},pause(){Ne()},clear(){Ne(),Ke(),S&&(S(),S=null),e.removeEventListener("click",$e),e.removeEventListener("change",Be),e.removeEventListener("dragstart",q),e.removeEventListener("dragover",V),e.removeEventListener("dragleave",K),e.removeEventListener("drop",P),e.removeEventListener("dragend",Ie),D.destroy(),Y.clear(),e.replaceChildren()}}}function gl(e,t,r){let n=ot("views:nav"),s=null;function o(l){return u=>{u.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),u=l.view==="worker"||l.view==="monitor"?l.view:"board";return c`
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
    `}function i(){Pe(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Pe(c``,e)}}}var hl=["bug","feature","task","epic","chore"];function bl(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var vl=["Critical","High","Medium","Low","Backlog"];function yl(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function E(){o.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",o.appendChild(D);for(let S of hl){let j=document.createElement("option");j.value=S,j.textContent=bl(S),o.appendChild(j)}a.replaceChildren();for(let S=0;S<=4;S+=1){let j=document.createElement("option");j.value=String(S);let I=vl[S]||"Medium";j.textContent=`${S} \u2013 ${I}`,a.appendChild(j)}}E();function T(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function C(D){s.disabled=D,o.disabled=D,a.disabled=D,i.disabled=D,l.disabled=D,p.disabled=D,_.disabled=D,_.textContent=D?"Creating\u2026":"Create"}function B(){u.textContent=""}function x(D){u.textContent=D}function Y(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?o.value=D:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?a.value=S:a.value="2"}catch{o.value="",a.value="2"}}function Q(){let D=o.value||"",S=a.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function O(){B();let D=String(s.value||"").trim();if(D.length===0){x("Title is required"),s.focus();return}let S=Number(a.value||"2");if(!(S>=0&&S<=4)){x("Priority must be 0..4"),a.focus();return}let j=String(o.value||""),I=String(l.value||""),ie={title:D};j.length>0&&(ie.type=j),String(S).length>0&&(ie.priority=S),I.length>0&&(ie.description=I),C(!0);try{await t("create-issue",ie)}catch{C(!1),x("Failed to create issue");return}Q(),C(!1),T()}return r.addEventListener("cancel",D=>{D.preventDefault(),T()}),b.addEventListener("click",()=>T()),p.addEventListener("click",()=>T()),r.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),O())}),n.addEventListener("submit",D=>{D.preventDefault(),O()}),{open(){n.reset(),B(),Y();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){T()}}}var Rp=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function wl(e){return String(e).padStart(2,"0")}function Ip(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Lp(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${wl(n.getHours())}:${wl(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Rp[n.getMonth()]} ${n.getDate()} ${o}`;return`${Ip(r,t)} \xB7 ${i}`}function Op(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var kl=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function $l(e){let t=!1,r=null,n=new Map;function s(){Pe(c``,e),e.hidden=!0}function o(){let l=kl.filter(p=>n.has(p.key));if(l.length===0){s();return}let u=Date.now();Pe(c`<div class="usage-meter" aria-label="Usage">
        ${l.map(p=>{let _=n.get(p.key),b=typeof _.ageSeconds=="number"&&_.ageSeconds>600,E=b?`${Math.floor(_.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${b?" usage-meter__group--stale":""}"
            aria-label=${`${p.label} usage`}
          >
            <span class="usage-meter__provider">${p.label}</span>
            ${_.windows.map(T=>{let C=typeof T.pct=="number"&&Number.isFinite(T.pct)?T.pct:0,B=Math.min(100,Math.max(0,C)),Y=`resets ${Lp(T.resetsAt,u)}${b?` \xB7 ${E}`:""}`;return c`<span
                class="usage-meter__window ${Op(B)}"
                style=${`--progress: ${B}%`}
                title=${Y}
              >
                <span class="usage-meter__label">${T.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${B}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let u=await fetch(l.endpoint);if(!u.ok)return null;let p=await u.json();return!p||p.available!==!0||!Array.isArray(p.windows)?null:p}catch{return null}}async function i(){let l=await Promise.all(kl.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of l)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var Dp="worker-ineligible";function go(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function xl(e){return go(e).includes(Dp)}var ho="worker-serial";function hn(e){return go(e).includes(ho)}var Mp="tab:worker:ready",Pp="tab:worker:blocked",Np="tab:worker:in-progress",qp="tab:worker:closed",bn=1,Fp=new Set(["done","failed","orphaned","stopped","discarded"]);function Sl(e){return pn(e).path.length>0}var El="beads-ui.worker.candidate-filter",bo={show_blocked:!1,spec:"all"};function Bp(){try{let e=window.localStorage.getItem(El);if(!e)return{...bo};let t=JSON.parse(e);if(!t||typeof t!="object")return{...bo};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...bo}}}function Up(e){try{window.localStorage.setItem(El,JSON.stringify(e))}catch{}}function jp(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=r(i),u=n(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var zp=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Cl="bdui.worker.candidate_sort",Hp=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],as="spec";function Wp(){try{let e=window.localStorage.getItem(Cl);return e==="board"||e==="created"||e==="spec"?e:as}catch{return as}}function Gp(e){try{window.localStorage.setItem(Cl,e)}catch{}}var Rl="bdui.worker.done-range";function Yp(){try{let e=window.localStorage.getItem(Rl);return Ot(e)?e:Ct}catch{return Ct}}function Vp(e){try{window.localStorage.setItem(Rl,e)}catch{}}var Kp="(max-width: 640px)",Il="beads-ui.worker.lane-collapsed",vn={queue:!0,done:!0};function Zp(){try{let e=window.localStorage.getItem(Il);if(!e)return{...vn};let t=JSON.parse(e);return!t||typeof t!="object"?{...vn}:{queue:typeof t.queue=="boolean"?t.queue:vn.queue,done:typeof t.done=="boolean"?t.done:vn.done}}catch{return{...vn}}}function Xp(e){try{window.localStorage.setItem(Il,JSON.stringify(e))}catch{}}function Al(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Qp(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(xr):(n.sort(Cn(r)),t==="board"?n:[...n.filter(Sl),...n.filter(s=>!Sl(s))])}function Jp(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function ef(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function tf(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var rf=["closed_unmerged","undecidable"],nf=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function sf(e,t){for(let r of nf)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var of=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_sync",label:"base \uB3D9\uAE30\uD654",index:2},{step:"reconcile_queued",label:"\uC815\uB9AC \uC900\uBE44",index:2},{step:"candidate_pinned",label:"\uBC30\uD3EC \uD6C4\uBCF4 \uACE0\uC815",index:3},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D",index:4},{step:"reconcile_verify",label:"\uC815\uB9AC \uC911 \xB7 \uAC80\uC99D",index:4},{step:"deploy",label:"\uBC30\uD3EC",index:5},{step:"reconcile_deploy",label:"\uC815\uB9AC \uC911 \xB7 \uBC30\uD3EC",index:5},{step:"reconcile_restart",label:"\uC815\uB9AC \uC911 \xB7 \uC7AC\uC2DC\uC791",index:6},{step:"reconcile_readback",label:"\uC815\uB9AC \uC911 \xB7 readback",index:6},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:7},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:8},{step:"parent_close",label:"\uBD80\uBAA8 close",index:9}];function af(e){if(typeof e!="string"||e.length===0)return null;let t=9,r=of.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function lf(e){if(!e||e.adapter!=="managed"&&e.stage!=="queued")return null;let t=e.stage==="queued"?"reconcile_queued":e.stage==="pinned"?"candidate_pinned":e.stage==="verifying"?"reconcile_verify":e.stage==="deploying"?"reconcile_deploy":e.stage==="restarting"?"reconcile_restart":e.stage==="readback"?"reconcile_readback":null;return t?{activity:null,merge_progress:{step:t,started_at:typeof e.updated_at=="number"?e.updated_at:0}}:null}function Tl(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function cf(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function vo(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function df(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function uf(e,t,r,n,s=null,o=null,a=null,i=!1,l=null,u=!0,p=null,_=null,b=null,E={},T=!1){let C=!!l&&l.position>0,B=!!l?.continuation_action&&l.continuation_action.continuation===null,x=!!l&&l.active===!0,Y=l&&l.failure||null,Q=r[e]||null,O=Q&&Q.gate?Q.gate:null,D=Q&&Q.pr?Q.pr:null,S=df(b),j=cf(l?l.resolution:null),I=[];i&&I.push("\uC138\uC158");let ie=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":j?j.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,Re=sf(i&&O&&O.tier==="closed_unmerged"?"\uB2EB\uD798":O&&O.gate_badge||"",ie?null:o&&o.activity||null);ie&&I.push(ie),Re.label&&I.push(Re.label),O&&O.base_badge&&O.base_badge!==O.gate_badge&&I.push(O.base_badge),_&&I.push(_),n&&I.push("\uC815\uB9AC \uC2E4\uD328"),S&&I.push(S.badge),C&&!x&&I.push(`\uBA38\uC9C0 \uB300\uAE30 #${l.position}`),Y&&I.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Tl(Y)}`),B&&I.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),p&&I.push(`\uC790\uB3D9 \uC81C\uC678: ${Tl(p)}`);let oe=!!O&&O.base_badge==="\uCDA9\uB3CC",pe=!!O&&O.enabled===!0,Oe=af(o&&o.merge_progress?o.merge_progress.step:null),Ye=!!n&&!!O&&O.tier==="merged",nt=i&&!!O&&O.tier==="merged",Le=i&&oe&&u===!1,He=Gt(E,e,{external:i,merge_active:x||!!Oe,merge_queued:C,conflict_active:!!a,cleanup_active:!1,merged:!!n||O?.tier==="merged"}),ke=!!He.operation;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:T,external:i,pr_number:D&&typeof D.number=="number"?D.number:null,pr_url:D&&typeof D.url=="string"?D.url:"",completion_badge:S?S.badge:null,completion_title:S?S.title:"",completion_repair_pr_url:S?S.repair_pr_url:"",completion_repair_pr_number:S?S.repair_pr_number:null,badges:I,live_badge:a==="paused"?null:j?.live||a==="running"?ie:Re.live?Re.label:null,usage:s,alert:!!O&&rf.includes(O.tier)||!!n||!!Y||!!(S&&S.alert),merge_action:!C||B,cancel_action:C&&!B,cancel_enabled:!x&&!(S&&S.lock_actions),cancel_title:S&&S.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":x?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:He,discard_action:He.action,merge_step:Oe,discard_enabled:He.enabled,discard_title:He.title,merge_enabled:!Oe&&!a&&!ke&&!(S&&S.lock_actions)&&!Le&&(pe||oe||Ye||nt),merge_label:B?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ye||nt?"\uC815\uB9AC":oe&&!Oe&&!Ye?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ke?He.error?`\uD3D0\uAE30 \uC2E4\uD328: ${He.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${He.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:B?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Oe?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Oe.label}`:nt?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":Le?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Ye?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":oe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":pe?`\uBA38\uC9C0 (${O.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:O&&O.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${O&&O.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function yo(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u,doneRange:p,onDoneRangeChange:_}=t,b=n?In(n,i):null,E=On({transport:r,uiOrderStore:i}),T=null,C=[],B=Bp(),x=Wp(),Y=Ot(p)?p:Yp(),Q=new Map;function O(){let f=Ht.find(k=>k.value===Y);return f?f.label:"\uC624\uB298"}let D=Zp(),S=!1,j=new Set,I=new Set,ie=new Set,Re="ordinary",oe=!1,pe=new Map,Oe=[],Ye=document.createElement("div");Ye.className="worker-console";let nt=document.createElement("div");nt.className="worker-top";let Le=document.createElement("div");Le.className="worker-drawer-overlay",Le.hidden=!0;let He=document.createElement("div");He.className="worker-drawer-overlay__backdrop";let ke=document.createElement("div");ke.className="worker-drawer-host",Le.append(He,ke);let ge=document.createElement("div");ge.className="worker-lanes-host",Ye.append(nt,Le,ge),e.appendChild(Ye);let xe=null,fe=Jn(ke,{transport:r,sessionLogStore:a,onClose:()=>{xe=null,Le.hidden=!0,Ce()}}),be=ns(Ye,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:u});function q(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:bn,queue:[],pr_wait:[],done:[]}}function V(){let f=q();return typeof f.revision=="number"?f.revision:0}function K(f){f&&f.queue&&s&&s.set(f.queue)}function Ie(){let f=q().queue;return Array.isArray(f)?f.length:0}async function P(f,k){if(!r)return;let R=await r("worker-queue-place",{bead_id:f,index:k,expected_revision:V()});K(R),R&&R.conflict&&await r("worker-queue-place",{bead_id:f,index:k,expected_revision:V()}).then(K)}async function U(f,k){if(!r)return;let R=await r("worker-queue-reorder",{bead_id:f,to_index:k,expected_revision:V()});K(R),R&&R.conflict&&await r("worker-queue-reorder",{bead_id:f,to_index:k,expected_revision:V()}).then(K)}async function ee(f){if(!r)return;let k=await r("worker-queue-remove",{bead_id:f,expected_revision:V()});K(k),k&&k.conflict&&await r("worker-queue-remove",{bead_id:f,expected_revision:V()}).then(K)}async function ve(){if(!r||oe)return;let k=(Array.isArray(q().queue)?q().queue:[]).map(le=>le.bead_id).filter(le=>ie.has(le));if(k.length===0)return;if(k.some(le=>{let qe=pe.get(le);return qe!==!0&&qe!==!1})){Z("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let R=Re==="serial",te=k.filter(le=>pe.get(le)!==R);if(te.length===0){ie.clear(),Ce(),Z("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}oe=!0,Ce();let ce=[],_e=0;try{for(let le of te){let qe=await Promise.resolve(r(R?"label-add":"label-remove",{id:le,label:ho})).catch(()=>[]),se=Array.isArray(qe)?qe[0]:qe,Xe=se&&typeof se=="object"?se.labels:null;se&&typeof se=="object"&&se.id===le&&Array.isArray(Xe)&&hn(Xe)===R?_e+=1:ce.push(le)}if(ce.length===0){ie.clear(),Z(`${_e}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}ie.clear();for(let le of ce)ie.add(le);Z(`${te.length}\uAC1C \uC911 ${_e}\uAC1C \uBCC0\uACBD \xB7 ${ce.length}\uAC1C \uC2E4\uD328 (${ce.join(", ")})`,"error")}finally{oe=!1,Ce()}}async function Ae(f){if(!r||!f)return;let k=await r("worker-attempt-pause",{attempt_id:f});k&&k.paused===!1&&k.reason&&Z(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function Ve(f){if(!r||!f)return;let k=async(te={})=>await r("worker-attempt-resume",{attempt_id:f,expected_revision:V(),...te}),R=await k();K(R),R&&R.conflict&&(R=await r("worker-attempt-resume",{attempt_id:f,expected_revision:V()}),K(R)),R=await Qt(R,(te,ce)=>k({continuation:te,decision_token:ce}),{onResult:K,refresh:()=>k()}),R&&R.resumed===!1&&!R.conflict&&R.reason&&Z(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${R.reason}`,"error",2400)}async function $e(f){if(!r||!f)return;let k=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:V()});K(k),k&&k.conflict&&(k=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:V()}),K(k)),k&&k.dismissed===!1&&!k.conflict&&k.reason&&Z(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function Be(f,k,R=!0){if(!r)return null;let te=r,ce=await te(f,{...k,expected_revision:V()});return K(ce),ce&&ce.conflict&&R&&(ce=await te(f,{...k,expected_revision:V()}),K(ce)),ce}async function Ne(f){if(!r||!f)return;let k=q().merge_queue?.find(te=>te.bead_id===f)?.continuation_action;if(k?.mismatch&&k.continuation===null){await Ke(f,k.mismatch);return}j.add(f),Ce();let R;try{R=await Be("worker-merge-queue-add",{bead_id:f})}finally{j.delete(f),Ce()}!R||R.conflict||R.applied||Z("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Ke(f,k){let R=await Qt({continuation_mismatch:k},(ce,_e)=>Be("worker-merge-queue-add",{bead_id:f,continuation:ce,decision_token:_e},!1)),te=R?.queue?.merge_queue?.find(ce=>ce.bead_id===f)?.continuation_action;if(R?.applied!==!0&&te?.continuation===null&&te.mismatch){await Ke(f,te.mismatch);return}R&&R.applied===!1&&!R.conflict&&Z("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function g(f){if(!r)return;let k=await Be("worker-merge-auto-toggle",{on:f});!k||k.conflict||Z(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function A(f){if(!r||!f)return;let k=await Be("worker-merge-queue-remove",{bead_id:f});k&&!k.conflict&&!k.applied&&k.reason==="merge_active"&&Z("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function w(){await Be("worker-merge-queue-remove",{all:!0})}async function L(f,k=null,R="unmerged",te=null){if(!r||!f)return;let ce=fn(f,R);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(ce)))return;let le=await r("worker-discard",{bead_id:f,...k?{attempt_id:k}:{},...te?{operation_id:te}:{},expected_revision:V()});if(K(le),le&&le.conflict&&(le=await r("worker-discard",{bead_id:f,...k?{attempt_id:k}:{},...te?{operation_id:te}:{},expected_revision:V()}),K(le)),le&&le.discarded===!0){Z(ss(le),"success",5e3);return}if(le&&le.reason){Z(`\uD3D0\uAE30 \uC2E4\uD328: ${le.reason}`,"error",2800);return}if(le&&le.accepted&&le.pending==="merged_revert"){Z("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(le&&le.accepted&&!le.discarded){Z(`\uD3D0\uAE30 \uC9C4\uD589: ${le.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}le&&!le.conflict&&Z("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function W(f,k){if(!r||!k||I.has(k))return;I.add(k),Ce();let R;try{let te=async(ce={})=>await r(f,{bead_id:k,expected_revision:V(),...ce});R=await te(),K(R),R&&R.conflict&&(R=await r(f,{bead_id:k,expected_revision:V()}),K(R)),f==="worker-revise-fix"&&(R=await Qt(R,(ce,_e)=>te({continuation:ce,decision_token:_e}),{onResult:K,refresh:()=>te()}))}finally{I.delete(k),Ce()}if(!(!R||R.conflict)){if(R.ok){Z(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}Z(`\uCC98\uBD84 \uAC70\uBD80: ${R.reason||""}`,"error",3e3)}}async function X(f){if(!r)return;let k=await r("worker-queue-toggle",{on:f,expected_revision:V()});K(k),k&&k.conflict&&await r("worker-queue-toggle",{on:f,expected_revision:V()}).then(K)}async function J(f){if(!r||!Number.isFinite(f))return;let k=Math.max(bn,Math.floor(f)),R=await r("worker-queue-set-slots",{slots:k,expected_revision:V()});K(R),R&&R.conflict&&await r("worker-queue-set-slots",{slots:k,expected_revision:V()}).then(K)}async function Ee(f){if(!r)return;let k=await r("worker-queue-set-pr-wait-hold",{on:f,expected_revision:V()});K(k),k&&k.conflict&&await r("worker-queue-set-pr-wait-hold",{on:f,expected_revision:V()}).then(K)}function et(){let f=q(),k=b?b.selectBoardColumn(Mp,"ready"):[],R=b?b.selectBoardColumn(Pp,"blocked"):[],te=b?b.selectBoardColumn(qp,"closed"):[],ce=b?b.selectBoardColumn(Np,"in_progress"):[],_e=new Map;for(let h of ce){let N=ef(h);if(!N)continue;let ne=_e.get(N);ne?ne.push(h):_e.set(N,[h])}let le=h=>{let N=Ln(_e.get(h)||[]);return N?N.title||N.id:null},qe=f.bead_titles||{},se=new Map;for(let[h,N]of Object.entries(qe))typeof N=="string"&&N.length>0&&se.set(h,N);for(let h of[...k,...R])se.set(h.id,h.title||h.id);pe.clear();let Xe=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},Pt=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{};for(let[h,N]of Object.entries(Pt))Array.isArray(N)&&pe.set(h,hn(N));for(let h of[...k,...R]){let N=h.labels;if(!Array.isArray(N))continue;if(!pe.has(h.id)){pe.set(h.id,hn(N));continue}let ne=Xe[h.id],ze=Xt(ne&&typeof ne=="object"?ne.updated_at:null),zt=Xt(h.updated_at);zt!==null&&ze!==null&&zt>ze&&pe.set(h.id,hn(N))}let ht=new Map;for(let[h,N]of Object.entries(Xe))N&&typeof N=="object"&&ht.set(h,N);for(let h of[...k,...R])ht.set(h.id,{created_at:h.created_at,updated_at:h.updated_at});let pt=h=>ht.get(h)||{},kt=f.pr_wait||[],de=f.pr_observations||{},v=f.pr_activity||{},H=f.deployment_reconcile||f.reconcile||{},z=f.cleanup_failed||{},me=Object.entries(z).map(([h,N])=>({bead_id:h,step:N&&N.step?N.step:"",reason:N&&N.reason?N.reason:"",detail:H[h]?.adapter==="managed"&&(N?.detail==="checkout_dirty"||N?.detail==="checkout_not_on_base"||N?.detail==="head_not_base_sha")?null:N&&typeof N.detail=="string"?N.detail:null,output_tail:N&&typeof N.output_tail=="string"&&N.output_tail?N.output_tail:void 0,log_path:N&&typeof N.log_path=="string"&&N.log_path?N.log_path:void 0,retry_count:N&&typeof N.retry_count=="number"&&Number.isInteger(N.retry_count)&&N.retry_count>0?N.retry_count:0})),We=f.queue||[],Je=new Set(We.map(h=>h.bead_id));for(let h of ie)Je.has(h)||ie.delete(h);let m=new Set([...We.map(h=>h.bead_id),...kt.map(h=>h.bead_id),...f.done.map(h=>h.bead_id)]),d=new Set(R.map(h=>h.id)),$=i?i.get()?.order||{}:{},y=new Set,M=[];for(let h of[...k,...R])m.has(h.id)||y.has(h.id)||Jp(h)||xl(h.labels)||(y.add(h.id),M.push(h));C=Qp(M,x,$);let re=f.admission||{},he=h=>{let N=re[h];if(!N)return"";if(N.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ne=typeof N.reason=="string"?N.reason:"",ze=ne.indexOf(":");return ze>0&&ze<ne.length-1?`\u26D4 ${ne.slice(0,ze)} (${ne.slice(ze+1)})`:`\u26D4 ${ne}`},_t=C.map(h=>{let N=pn(h),ne=N.path.length>0,ze=h.workflow?.route==="quick_fix"||h.metadata&&h.metadata.route==="quick_fix",zt=!ze&&ne&&!N.conflict,ar=d.has(h.id),Lt=[];ar&&Lt.push(tf(h)),ze?Lt.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):N.conflict?Lt.push("spec_id_conflict"):ne||Lt.push("spec \uC5C6\uC74C");let Sn=he(h.id);return Sn&&Lt.push(Sn),{id:h.id,title:h.title||h.id,reason:Lt.join(" \xB7 "),draggable:zt,lane:"candidate",created_at:h.created_at,updated_at:h.updated_at,workflow:h.workflow,is_quick_fix:ze,status:h.status,blocked:ar,has_spec:ne}}),Me=jp(_t,B),or=Me.visible,is=f.revise_parked||{},zr=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},xo=(h,N)=>h.map(ne=>{let ze=N==="queue"?is[ne.bead_id]:null,zt=N==="queue"?Gt(zr,ne.bead_id):null,ar=zt?.operation?zt:null,Lt=N==="queue"?pe.has(ne.bead_id)?pe.get(ne.bead_id)||!1:null:!1,Sn=Lt===!0&&(Object.values(f.attempts||{}).some(Kt=>Kt&&Kt.bead_id!==ne.bead_id&&!Fp.has(Kt.status))||kt.some(Kt=>Kt.bead_id!==ne.bead_id)||Object.values(zr).some(Kt=>Kt&&Kt.bead_id!==ne.bead_id&&Kt.phase!=="done")),zo=N==="done"?[]:[he(ne.bead_id)];return Sn&&zo.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:ne.bead_id,title:se.get(ne.bead_id)||ne.bead_id,reason:zo.filter(Boolean).join(" \xB7 "),draggable:N!=="done"&&!ar,done:N==="done",lane:N,selectable:N==="queue",selected:N==="queue"&&ie.has(ne.bead_id),worker_serial:Lt,discard:ar,badges:ze?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ze,revise_action:!!ze,revise_enabled:!!ze&&!ar&&!I.has(ne.bead_id),revise_title:ze?ze.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ze.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:N==="done"?Dt(f.attempts||{},ne.bead_id):null,done_at:N==="done"&&typeof ne.added_at=="number"?ne.added_at:void 0,...pt(ne.bead_id)}}),So=new Map;for(let h of f.done)h&&typeof h.bead_id=="string"&&typeof h.added_at=="number"&&So.set(h.bead_id,h.added_at);let Hr=f.attempts?Object.values(f.attempts):[],ls=new Set;for(let h of Hr)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&ls.add(h.resumed_from);let cs=new Map;for(let h of Hr)cs.set(h.bead_id,h.attempt_id);let ds=new Map;for(let h of Hr)ds.set(h.attempt_id,h);function us(h){let N=new Set,ne=h;for(;ne&&!N.has(ne.attempt_id);){if(ne.conflict_resolution===!0)return!0;N.add(ne.attempt_id),ne=typeof ne.resumed_from=="string"&&ne.resumed_from.length>0&&ds.get(ne.resumed_from)||null}return!1}let yn=typeof f.declared_base=="string"?f.declared_base:null;function zl(h){let N=null;for(let ne of Hr)!ne||ne.bead_id!==h||us(ne)||(N===null||(typeof ne.started_at=="number"?ne.started_at:0)>=(typeof N.started_at=="number"?N.started_at:0))&&(N=ne);return N&&typeof N.target_base=="string"?N.target_base:null}let Ao=[],To=[],Hl=h=>{let N=cs.get(h.bead_id)!==h.attempt_id,ne=So.get(h.bead_id),ze=typeof ne=="number"&&ne>0&&typeof h.finished_at=="number"&&ne>=h.finished_at;return!N&&!ze&&typeof h.dismissed_at!="number"},Eo=h=>{let N=typeof h.session_id=="string"&&h.session_id.length>0,ne=ls.has(h.attempt_id);return{eligible:N&&!ne,reason:N?ne?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Nt=null;for(let h of Hr){let N=h.status==="paused"&&!ls.has(h.attempt_id);if(h.status==="running"||N)To.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:se.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,paused:N,conflict_resolution:us(h),base_exception:vo(yn,h.target_base),can_pause:typeof h.session_id=="string"&&h.session_id.length>0,discard:Gt(zr,h.bead_id,{attempt_id:h.attempt_id}),usage:Dt(f.attempts||{},h.bead_id),current_child:le(h.bead_id),...pt(h.bead_id)});else if((h.status==="failed"||h.status==="orphaned")&&Hl(h)){let ne=Eo(h);Ao.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:se.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,failed:!0,status:h.status,status_label:h.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Gt(zr,h.bead_id,{attempt_id:h.attempt_id}),resume_eligible:ne.eligible,resume_reason:ne.reason,conflict_resolution:us(h),base_exception:vo(yn,h.target_base),usage:Dt(f.attempts||{},h.bead_id),current_child:le(h.bead_id),...pt(h.bead_id)}),Nt=h}}let wn=[...Ao,...To],Co=null;if(Nt){let h=Eo(Nt),N=Nt.cause_detail;Co={bead_id:Nt.bead_id,repo:Nt.repo||"",reason:Nt.cause||Nt.status,cause_detail:N&&typeof N.reason=="string"?{reason:N.reason,command:typeof N.command=="string"?N.command:null}:null,resume_attempt_id:Nt.attempt_id,resume_eligible:h.eligible,resume_reason:h.reason,discard:Gt(zr,Nt.bead_id,{attempt_id:Nt.attempt_id})}}let Wl=new Set(wn.map(h=>h.bead_id)),ps=Array.isArray(f.merge_queue)?f.merge_queue:[],Ro=new Map,Io=new Map,Lo=new Map;ps.forEach((h,N)=>{h&&typeof h.bead_id=="string"&&(Ro.set(h.bead_id,N+1),Io.set(h.bead_id,h.resolution),Lo.set(h.bead_id,h.continuation_action||null))});let Oo=f.merge_queue_state||{active:null,failures:{}},Gl=Oo.failures||{},Yl=f.auto_merge_skips||{},Do=h=>{let N=Yl[h];if(!N)return null;let ne=de[h],ze=ne&&ne.pr?ne.pr.head_sha:null;return ze&&ze===N.head_sha?N.reason||"":null},kn=new Map;for(let h of wn)h.failed!==!0&&h.conflict_resolution&&(h.paused?kn.has(h.bead_id)||kn.set(h.bead_id,"paused"):kn.set(h.bead_id,"running"));let Mo=wn.filter(h=>!h.paused&&h.failed!==!0).length,Po=(f.workspace_info||{}).slots,Vl=typeof Po=="number"?Po:typeof f.slots=="number"?f.slots:bn,No=f.pr_wait_holds_slot===!0?bn:Vl,Kl=Mo>No,$n=kr(Y),Zl=(Array.isArray(f.done)?f.done.slice():[]).filter(h=>$n===void 0||typeof h.added_at!="number"||h.added_at>=$n).sort((h,N)=>(N.added_at||0)-(h.added_at||0)),Wr=xo(Zl,"done"),Xl=new Set((Array.isArray(f.done)?f.done:[]).map(h=>h?.bead_id).filter(h=>typeof h=="string")),qo=[],Ql=u?.()||"";for(let h of te){let N=Xt(h.closed_at);if(typeof h.id!="string"||Xl.has(h.id)||N===null||$n!==void 0&&N<$n||typeof h.comment_count!="number"||h.comment_count<=0)continue;let ne=`${Ql}\0${h.id}\0${String(h.updated_at)}\0${h.comment_count}`,ze=Q.get(ne);ze===void 0&&r&&(Q.set(ne,"pending"),Promise.resolve(r("get-comments",{id:h.id})).then(zt=>{let ar=Array.isArray(zt)&&zt.some(Lt=>es(typeof Lt?.text=="string"?Lt.text:"")?.lane==="session");Q.set(ne,ar?"session":"not-session"),Ce()}).catch(()=>{Q.set(ne,"failed"),Ce()})),ze==="session"&&qo.push({id:h.id,title:h.title||h.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:N,created_at:h.created_at,updated_at:h.updated_at})}Wr.push(...qo),Wr.sort((h,N)=>(N.done_at||0)-(h.done_at||0));let xn={};for(let h of Jt)xn[h]=0;let Fo=!1,Bo=0,fs=0,Uo=0;for(let h of Wr){let N=h.usage;if(N&&typeof N=="object"){let ne=!1;for(let ze of Jt)Number.isFinite(N[ze])&&(xn[ze]+=N[ze],Fo=!0,ne=!0);ne&&(fs+=1,Number.isFinite(N.total_cost_usd)&&(Bo+=N.total_cost_usd,Uo+=1))}}fs>0&&Uo===fs&&(xn.total_cost_usd=Bo);let jo=Wr.map(h=>h.usage).filter(h=>h&&typeof h=="object"&&h.providers),Jl=jo.length>0?mt(Fn(jo)):Fo?Ft(xn):null;return{queue:f,idToTitle:se,candidates:or,candidate_hidden:{blocked:Me.hidden_blocked,spec:Me.hidden_spec},running:wn,live_count:Mo,slots:No,over_cap:Kl,failure:Co,waiting:xo(We.filter(h=>!Wl.has(h.bead_id)),"queue"),pr_wait:kt.map(h=>uf(h.bead_id,se.get(h.bead_id)||h.bead_id,de,z[h.bead_id]||null,Dt(f.attempts||{},h.bead_id),lf(H[h.bead_id])||v[h.bead_id]||(j.has(h.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),kn.get(h.bead_id)||null,h.external===!0,{position:Ro.get(h.bead_id)||0,active:Oo.active===h.bead_id,failure:Gl[h.bead_id]||null,resolution:Io.get(h.bead_id),continuation_action:Lo.get(h.bead_id)},h.wt_present!==!1,f.auto_merge===!0?Do(h.bead_id):null,vo(yn,zl(h.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[h.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},ds.get(cs.get(h.bead_id)||"")?.worker_serial===!0)).map(h=>({...h,...pt(h.id)})),merge_queue_length:ps.length,merge_queue_running:ps.length>0,auto_excluded:kt.map(h=>h.bead_id).filter(h=>Do(h)!==null),verify_cmd_present:!!(f.workspace_info||{}).verify_cmd,declared_base:yn,done:Wr,token_total:Jl,cleanup_failures:me}}function at(f){let k=f.waiting.length>0?f.waiting[0].id:"\u2014",R=c`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,te=st(f),ce=f.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",_e=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${O()} 완료 <b>${f.done.length}</b></span
      >`,le=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${f.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${f.declared_base||"?"}</span
    >`,qe=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${bn}
          step="1"
          .value=${String(f.slots)}
          ?disabled=${f.queue.pr_wait_holds_slot===!0}
          title=${f.queue.pr_wait_holds_slot===!0?"\uBA38\uC9C0\uAE4C\uC9C0 \uC21C\uCC28 \uC2E4\uD589 \uC911 \u2014 \uD574\uC81C\uD558\uBA74 \uC800\uC7A5\uB41C \uB3D9\uC2DC \uC2E4\uD589 \uC218\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4":"\uB3D9\uC2DC\uC5D0 \uC2E4\uD589\uD560 \uC138\uC158 \uC218 (\uCD5C\uC18C 1 = \uC21C\uCC28 \uC2E4\uD589)"}
      /></label>
      <label
        class="worker-tgl"
        title="각 이슈가 PR 머지·정리를 마칠 때까지 다음 이슈를 시작하지 않습니다"
      >
        <input
          type="checkbox"
          class="worker-pr-wait-hold"
          .checked=${f.queue.pr_wait_holds_slot===!0}
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
      </button>`,se=Xi({failure:f.failure,cleanupFailures:f.cleanup_failures});return S?c`<div class="worker-ribbon">
          ${R} ${te}
          <div class="worker-kpi worker-kpi--ribbon">${ce}${_e}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${qe}</div>
          <div class="worker-kpi">${le}</div>
        </div>
        ${se}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${R}${te}${qe}</div>
        <div class="worker-kpi">
          ${ce}${_e}${le}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${O()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Xe=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Xe.tooltip}
                >${O()} 완료 · 누적 ${Xe.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${k}</b></span
          >
        </div>
      </div>
      ${se}`}function Ze(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let k=f.running.some(R=>!R.paused&&R.failed!==!0);return c`<section
      class="worker-now${k?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${f.running.length+f.pr_wait.length}</span
        >
      </header>
      ${f.running.length>0?co(f.running,Date.now(),xe):""}
      ${f.pr_wait.map(R=>io(R))}
    </section>`}function vt(f){let k=f.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${B.show_blocked}
        />
        🔒 blocked${k.blocked>0?` ${k.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${zp.map(R=>c`<button
              type="button"
              class="worker-filter__chip${B.spec===R.value?" is-active":""}"
              data-spec=${R.value}
              aria-pressed=${B.spec===R.value?"true":"false"}
            >
              ${R.label}
            </button>`)}
        ${k.spec>0?c`<span class="worker-filter__hidden">숨김 ${k.spec}</span>`:""}
      </div>
    </div>`}function dt(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${x}
    >
      ${Hp.map(f=>c`<option value=${f.value} ?selected=${x===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function it(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${Y}
      >
        ${Ht.map(f=>c`<option value=${f.value} ?selected=${Y===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function yt(){if(ie.size===0)return"";let f=Array.from(ie),k=f.some(R=>{let te=pe.get(R);return te!==!0&&te!==!1});return c`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${f.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${Re}
        ?disabled=${oe}
      >
        <option value="ordinary">일반 병렬</option>
        <option value="serial">🔒 머지까지 단독</option>
      </select>
      <button
        type="button"
        class="worker-bulk__apply"
        ?disabled=${k||oe}
        title=${k?"\uC120\uD0DD\uD55C \uC791\uC5C5\uC758 \uC2E4\uD589 \uBC29\uC2DD\uC744 \uD655\uC778\uD558\uB294 \uC911\uC785\uB2C8\uB2E4":oe?"\uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD \uC911\uC785\uB2C8\uB2E4":"\uC120\uD0DD\uD55C \uC791\uC5C5\uC5D0 \uC801\uC6A9"}
      >
        적용
      </button>
      <span class="worker-bulk__hint">선택한 대기 작업에만 적용됩니다</span>
    </div>`}function It(f){let k=(f.queue.pr_wait||[]).filter(_e=>_e&&_e.external!==!0&&typeof _e.bead_id=="string"),R=new Set(f.running.filter(_e=>!_e.paused&&_e.failed!==!0).map(_e=>_e.bead_id));for(let _e of k)R.add(_e.bead_id);let te=!(f.queue.pr_wait_holds_slot!==!0||f.queue.auto_advance!==!0||f.queue.auto_merge===!0||k.length===0||f.waiting.length===0||R.size<f.slots),ce=f.pr_wait.some(_e=>_e.worker_serial===!0);if(!(!te&&!(ce&&f.queue.auto_merge!==!0)))return c`${te?c`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${ce&&f.queue.auto_merge!==!0?c`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`:""}`}function st(f){let k=f.queue.auto_merge===!0;if(f.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${k?" is-active":""}"
        title=${k?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${k?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${f.merge_queue_length}
      </button>`;if(k)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let R=new Set(f.auto_excluded),te=f.pr_wait.filter(ce=>ce.merge_action&&ce.merge_enabled&&!R.has(ce.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${f.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${te>0?` ${te}`:""}
    </button>`}function lt(f){let k=Yt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:dt(),controls:vt(f)});return S?c`<div class="worker-lanes worker-lanes--mobile">
        ${Ze(f)}
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:c`${yt()}${It(f)}`,collapsible:!0,collapsed:D.queue,preview:Al(f.waiting)})}
        ${k}
        ${Yt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${O()} \uC644\uB8CC \uC5C6\uC74C`,controls:it(),collapsible:!0,collapsed:D.done,preview:Array.isArray(f.token_total)?f.token_total.map(R=>R.label).join(" \xB7 "):f.token_total||Al(f.done)})}
      </div>`:c`<div class="worker-lanes">
      ${k}
      ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:c`${yt()}${It(f)}`})}
      ${Yt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(R=>!R.paused&&R.failed!==!0),body:co(f.running,Date.now(),xe)})}
      ${Yt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Yt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${O()} ${f.done.length}`,items:f.done,empty:`${O()} \uC644\uB8CC \uC5C6\uC74C`,controls:it()})}
    </div>`}function rt(f){D={...D,[f]:!D[f]},Xp(D),Ce()}function Ce(){let f=et();Pe(at(f),nt),Pe(lt(f),ge)}function gt(){let f=document.querySelector(".app-header");if(!f)return;let k=()=>{let R=Math.round(f.getBoundingClientRect().height);Ye.style.setProperty("--worker-ribbon-top",`${R}px`)};if(k(),typeof ResizeObserver=="function"){let R=new ResizeObserver(k);R.observe(f),Oe.push(()=>R.disconnect())}else window.addEventListener("resize",k),Oe.push(()=>window.removeEventListener("resize",k))}function F(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(Kp);S=!!f.matches;let k=R=>{let te=!!(R&&typeof R.matches=="boolean"?R.matches:f.matches);te!==S&&(S=te,Ce())};typeof f.addEventListener=="function"?(f.addEventListener("change",k),Oe.push(()=>f.removeEventListener("change",k))):typeof f.addListener=="function"&&(f.addListener(k),Oe.push(()=>f.removeListener(k)))}function G(f){let k=f.target,R=k?.closest?.(".worker-mini__grip"),te=R?R.closest('.worker-mini[data-lane="queue"]'):k?.closest?.('.worker-card[draggable="true"]');if(!te)return;let ce=te.dataset.beadId||"",_e=te.dataset.lane||"";T={bead_id:ce,from_lane:_e};try{f.dataTransfer?.setData("text/plain",ce),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function ae(f){let k=f.target?.closest?.(".worker-pane");if(!k)return;let R=k.dataset.lane||"";R!=="candidate"&&R!=="queue"||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),k.classList.add("worker-pane--drag-over"))}function ue(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function ye(f,k){let R=C.find(le=>le.id===f);if(!R)return;let te=C.filter(le=>le.id!==f),ce=te.length;if(k){let le=k.dataset.beadId;if(le===f)return;let qe=te.findIndex(se=>se.id===le);qe>=0&&(ce=qe)}let _e=te.slice();_e.splice(ce,0,R),E.applyReorder(f,_e,ce)}function Te(f){let k=f.target?.closest?.(".worker-pane");if(!k)return;f.preventDefault(),k.classList.remove("worker-pane--drag-over");let R=k.dataset.lane||"",te=T?.bead_id||f.dataTransfer?.getData("text/plain")||"",ce=T?.from_lane||"";if(T=null,!te)return;let _e=f.target?.closest?.(".worker-mini, .worker-card"),le=Array.from(k.querySelectorAll(".worker-mini, .worker-card")),qe=le.length;if(_e){let se=le.indexOf(_e);se>=0&&(qe=se)}if(k.classList.contains("worker-pane--collapsed")&&(qe=Ie()),R==="candidate"){if(ce==="candidate"){ye(te,_e);return}ce==="queue"&&ee(te);return}R==="queue"&&(ce==="queue"?U(te,qe):P(te,qe))}function Ue(f){B=f,Up(f),Ce()}function tt(f){x=f==="board"||f==="created"||f==="spec"?f:as,Gp(x),Ce()}function Se(f){Y=Ot(f)?f:Ct,Vp(Y),_?.(Y),Ce()}function je(f){let k=f.target?.closest?.(".worker-mini__select");if(k){let Xe=k.dataset.beadId||"";Xe&&(k.checked?ie.add(Xe):ie.delete(Xe),Ce());return}let R=f.target?.closest?.(".worker-bulk__mode");if(R){Re=R.value==="serial"?"serial":"ordinary";return}let te=f.target?.closest?.(".worker-filter__blocked");if(te){Ue({...B,show_blocked:te.checked});return}let ce=f.target?.closest?.(".worker-done-range");if(ce){Se(ce.value);return}let _e=f.target?.closest?.(".worker-sort");if(_e){tt(_e.value||as);return}let le=f.target?.closest?.(".worker-pr-wait-hold");if(le){Ee(le.checked);return}let qe=f.target?.closest?.(".worker-slots__input");if(!qe)return;let se=Number.parseInt(qe.value,10);if(!Number.isFinite(se)){Ce();return}J(se).then(Ce)}function we(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function ut(f){let k=q(),R=k.attempts?k.attempts[f]:null;xe=f,Le.hidden=!1,fe.open({attempt_id:f,meta:we(R)}),Ce()}function wt(){if(!xe)return;let f=q(),k=f.attempts?f.attempts[xe]:null;if(k){fe.updateMeta(we(k));return}fe.close()}function Vt(f){let k=f.target,R=k?.closest?.(".worker-bulk__apply");if(R){R.disabled||ve();return}if(k?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip")||k?.closest?.("#worker-exec-defaults-dialog"))return;if(k?.closest?.(".worker-exec-defaults-btn")){be.open();return}let te=k?.closest?.(".worker-banner__resume");if(te){let z=te.dataset.attemptId;z&&Ve(z);return}let ce=k?.closest?.(".worker-banner__discard");if(ce){let z=ce.dataset.confirmation==="merged"?"merged":"unmerged";L(ce.dataset.beadId||"",ce.dataset.attemptId||null,z,ce.dataset.operationId||null);return}let _e=k?.closest?.(".worker-banner__dismiss");if(_e){let z=_e.dataset.attemptId;z&&$e(z);return}if(k?.closest?.(".worker-play")){X(!q().auto_advance);return}let le=k?.closest?.(".worker-merge-all");if(le){le.classList.contains("worker-merge-all--stop")?q().auto_merge===!0?g(!1):w():g(!0);return}let qe=k?.closest?.(".worker-pane__hd--toggle");if(qe){let z=qe.dataset.lane;(z==="queue"||z==="done")&&rt(z);return}let se=k?.closest?.(".worker-card__place");if(se){let z=se.dataset.beadId;z&&!se.disabled&&P(z,Ie());return}let Xe=k?.closest?.(".worker-filter__chip");if(Xe){let z=Xe.dataset.spec;(z==="all"||z==="with"||z==="without")&&Ue({...B,spec:z});return}let Pt=k?.closest?.(".worker-mini__merge");if(Pt){Ne(Pt.dataset.beadId||"");return}let ht=k?.closest?.(".worker-mini__merge-cancel");if(ht){A(ht.dataset.beadId||"");return}let pt=k?.closest?.(".worker-mini__discard");if(pt){L(pt.dataset.beadId||"",pt.dataset.attemptId||null,pt.dataset.discardMode==="merged"?"merged":"unmerged",pt.dataset.operationId||null);return}let kt=k?.closest?.(".worker-mini__revise-fix");if(kt){W("worker-revise-fix",kt.dataset.beadId||"");return}let de=k?.closest?.(".worker-mini__revise-approve");if(de){W("worker-revise-approve",de.dataset.beadId||"");return}if(k?.closest?.(".worker-mini__pr"))return;if(k?.closest?.(".rtile__discard")){let z=k?.closest?.(".rtile"),me=z?.dataset?.beadId,We=z?.dataset?.attemptId;me&&L(me,We||null,"unmerged",k?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(k?.closest?.(".rtile__dismiss")){let me=k?.closest?.(".rtile")?.dataset?.attemptId;me&&$e(me);return}if(k?.closest?.(".rtile__pause")){let me=k?.closest?.(".rtile")?.dataset?.attemptId;me&&Ae(me);return}if(k?.closest?.(".rtile__resume")){let me=k?.closest?.(".rtile")?.dataset?.attemptId;me&&Ve(me);return}if(k?.closest?.(".rtile__session")){let me=k?.closest?.(".rtile")?.dataset?.attemptId;me&&ut(me);return}if(k?.closest?.(".worker-drawer-overlay__backdrop")){fe.close();return}if(k?.closest?.(".worker-drawer-host"))return;let v=k?.closest?.(".rtile");if(v){if(k?.closest?.(".rtile__id")){let me=v.dataset.beadId;me&&Sr(me).then(We=>{We?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let z=v.dataset.beadId;z&&l&&l(z);return}let H=k?.closest?.(".worker-mini, .worker-card");if(H){let z=H.dataset.beadId;if(k?.closest?.(".worker-mini__id, .worker-card__id")){z&&Sr(z).then(me=>{me?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}z&&l&&l(z)}}return e.addEventListener("dragstart",G),e.addEventListener("dragover",ae),e.addEventListener("dragleave",ue),e.addEventListener("drop",Te),e.addEventListener("click",Vt),e.addEventListener("change",je),F(),gt(),b&&Oe.push(b.subscribe(()=>{for(let[f,k]of Q)k==="failed"&&Q.delete(f);Ce()})),s&&Oe.push(s.subscribe(()=>{Ce(),wt()})),Ce(),{load(){Ce()},openExecDefaults(){be.open()},destroy(){for(let f of Oe.splice(0))try{f()}catch{}e.removeEventListener("dragstart",G),e.removeEventListener("dragover",ae),e.removeEventListener("dragleave",ue),e.removeEventListener("drop",Te),e.removeEventListener("click",Vt),e.removeEventListener("change",je);try{fe.destroy()}catch{}Le.hidden=!0;try{be.destroy()}catch{}Pe(c``,e)}}}function wo(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Ll(e,t,r,n=async()=>{},s=async()=>{}){let o=ot("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function p(S){let I=S.target.value,Re=t.getState().workspace?.current?.path||"";if(I&&I!==Re){o("switching workspace to %s",I),i=!0,D();try{await r(I)}catch(oe){o("workspace switch failed: %o",oe)}finally{i=!1,D()}}}async function _(){let S=t.getState(),j=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!j||l)){o("git-pulling workspace %s",j),l=!0,D();try{await n(j)}catch(I){o("workspace git pull failed: %o",I)}finally{l=!1,D()}}}function b(S){let j=S.target;j&&e.contains(j)||C()}function E(S){S.key==="Escape"&&C()}function T(){u||(u=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",E),D())}function C(){u&&(u=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",E),D())}function B(){u?C():T()}async function x(S){let j=S.target,I=j.value,ie=j.checked;o("toggling visibility %s \u2192 %s",I,String(ie));try{await s(I,ie)}catch(Re){o("workspace visibility toggle failed: %o",Re)}}function Y(S){return S?c`
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
    `:c``}function Q(S,j){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${B}
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
                ${S.map(I=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${I.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${I.path}"
                        .checked=${!j.has(I.path)}
                        @change=${x}
                      />
                      <span class="workspace-picker__manage-name"
                        >${wo(I.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function O(){let S=t.getState(),j=S.workspace?.current,I=S.workspace?.available||[],ie=new Set(S.workspace?.hidden||[]),Re=j?.path||I[0]?.path||"";if(I.length===0)return c``;let oe=I.filter(pe=>!ie.has(pe.path)||pe.path===Re);if(oe.length<=1){let pe=oe[0]||I[0],Oe=wo(pe.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${pe.path}"
            >${Oe}</span
          >
          ${Q(I,ie)}
          ${Y(Re)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${oe.map(pe=>c`
              <option
                value="${pe.path}"
                ?selected=${pe.path===Re}
                title="${pe.path}"
              >
                ${wo(pe.path)}
              </option>
            `)}
        </select>
        ${Q(I,ie)}
        ${Y(Re)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){Pe(O(),e)}return D(),a=t.subscribe(()=>D()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",E),Pe(c``,e)}}}var Ol=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function ko(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Dl(e,t,r=ko()){return{id:r,type:e,payload:t}}function Ml(e={}){let t=ot("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,p=[],_=new Map,b=new Set;function E(O){for(let D of Array.from(b))try{D(O)}catch{}}function T(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),E(o);let O=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),D=(r.jitterRatio||0)*O,S=Math.max(0,Math.round(O+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",S,a+1),i=setTimeout(()=>{i=null,Q()},S)}function C(O){try{s?.send(JSON.stringify(O))}catch(D){t("ws send failed",D)}}function B(){for(o="open",t("ws open"),E(o),a=0;p.length;){let O=p.shift();O&&C(O)}}function x(O){let D;try{D=JSON.parse(String(O.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(u.has(D.id)){let j=u.get(D.id);u.delete(D.id),D.ok?j?.resolve(D.payload):j?.reject(D.error||new Error("ws error"));return}let S=_.get(D.type);if(S&&S.size>0)for(let j of Array.from(S))try{j(D.payload)}catch(I){t("ws event handler error",I)}else t("ws received unhandled message type: %s",D.type)}function Y(){o="closed",t("ws closed"),E(o);for(let[O,D]of u.entries())D.reject(new Error("ws disconnected")),u.delete(O);a+=1,T()}function Q(){if(!l)return;let O=n();try{s=new WebSocket(O),t("ws connecting %s",O),o="connecting",E(o),s.addEventListener("open",B),s.addEventListener("message",x),s.addEventListener("error",()=>{}),s.addEventListener("close",Y)}catch(D){t("ws connect failed %o",D),T()}}return Q(),{send(O,D){if(!Ol.includes(O))return Promise.reject(new Error(`unknown message type: ${O}`));let S=ko(),j=Dl(O,D,S);return t("send %s id=%s",O,S),new Promise((I,ie)=>{u.set(S,{resolve:I,reject:ie,type:O}),s&&s.readyState===s.OPEN?C(j):(t("queue %s id=%s (state=%s)",O,S,o),p.push(j))})},on(O,D){_.has(O)||_.set(O,new Set);let S=_.get(O);return S?.add(D),()=>{S?.delete(D)}},onConnection(O){return b.add(O),()=>{b.delete(O)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,Q()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function pf(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function ff(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var $o=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Pl=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],gr="tab:worker:closed",_f="bdui.worker.done-range",Nl=_l,ql="worker:queue",Fl="ui:order",Bl="ui:display-policy",Ul="exec:presets",hr="tab:board:closed",jl="beads-ui.board.closed-range";function mf(e){let t=ot("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Pe(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&$l(s),o&&a&&i&&l){let ke=function(m,d){let $="Request failed",y="";if(m&&typeof m=="object"){let re=m;if(typeof re.message=="string"&&re.message.length>0&&($=re.message),typeof re.details=="string")y=re.details;else if(re.details&&typeof re.details=="object")try{y=JSON.stringify(re.details,null,2)}catch{y=""}}else typeof m=="string"&&m.length>0&&($=m);let M=d&&d.length>0?`Failed to load ${d}`:"Request failed";He.open(M,$,y)},g=function(m){return`${se.getState().workspace.current?.path||""}\0${m}`},A=function(){ee&&(ee().catch(()=>{}),ee=null),ve=null,Ae=null},L=function(m){Ve=m;let d=()=>{Ve!==m||se.getState().selected_id!==m||(Ve=null,w(m))};if(!Ne){Be.then(d);return}d()},Ee=function(m,d,$,y,M){return $!==J[d]?(M().catch(()=>{}),!1):(m.set(y,M),!0)},et=function(){let m=se.getState();it(m.view==="board"),Ce(m.view==="worker"),ue(m.view==="monitor"),F(m.view==="board"||m.view==="worker"||!!m.selected_id)},vt=function(){let m=kr(at);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},dt=function(){let m=kr(Ze);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},it=function(m){if(m)for(let[d,$]of $o){if(W.has(d)||X.has(d))continue;let y=d===hr?vt():{type:$};try{be.register(d,y)}catch(he){t("register %s store failed: %o",d,he)}X.add(d);let M=J.board,re=!1;fe.subscribeList(d,y).then(he=>{re=!Ee(W,"board",M,d,he)}).catch(he=>{t("subscribe %s failed: %o",d,he),ke(he,"board")}).finally(()=>{X.delete(d),re&&et()})}else st()},st=function(){J.board+=1;for(let[m]of $o){let d=W.get(m);d&&(d().catch(()=>{}),W.delete(m));try{be.unregister(m)}catch($){t("unregister %s failed: %o",m,$)}}},Ce=function(m){if(!m){gt();return}for(let[d,$]of Pl){if(lt.has(d)||X.has(d))continue;let y=d===gr?dt():{type:$};try{be.register(d,y)}catch(he){t("register %s store failed: %o",d,he)}X.add(d);let M=J.worker,re=!1;fe.subscribeList(d,y).then(he=>{re=!Ee(lt,"worker",M,d,he)}).catch(he=>{t("subscribe %s failed: %o",d,he),ke(he,"worker")}).finally(()=>{X.delete(d),re&&et()})}},gt=function(){J.worker+=1;for(let[m]of Pl){let d=lt.get(m);d&&(d().catch(()=>{}),lt.delete(m));try{be.unregister(m)}catch($){t("unregister %s failed: %o",m,$)}}},F=function(m){if(!m){G();return}rt||(xe("subscribe-worker-queue",{id:ql}).catch(d=>{t("subscribe-worker-queue failed: %o",d)}),rt=()=>xe("unsubscribe-worker-queue",{id:ql}))},G=function(){rt&&(rt().catch(()=>{}),rt=null)},ue=function(m){if(!m){ye();return}ae||(xe("subscribe-monitor-pipeline",{id:Nl}).catch(d=>{t("subscribe-monitor-pipeline failed: %o",d)}),ae=()=>xe("unsubscribe-monitor-pipeline",{id:Nl}))},ye=function(){ae&&(ae().catch(()=>{}),ae=null)},Ue=function(){Te||(xe("subscribe-ui-order",{id:Fl}).catch(m=>{t("subscribe-ui-order failed: %o",m)}),Te=()=>xe("unsubscribe-ui-order",{id:Fl}))},tt=function(){Te&&(Te().catch(()=>{}),Te=null),K.clear()},je=function(){Se||(xe("subscribe-display-policy",{id:Bl}).catch(m=>{t("subscribe-display-policy failed: %o",m)}),Se=()=>xe("unsubscribe-display-policy",{id:Bl}))},we=function(){Se&&(Se().catch(()=>{}),Se=null),Ie.clear()},wt=function(){ut||(xe("subscribe-exec-presets",{id:Ul}).catch(m=>{t("subscribe-exec-presets failed: %o",m)}),ut=()=>xe("unsubscribe-exec-presets",{id:Ul}))},ce=function(m){if(!m)return"Unknown";let d=m.split("/").filter(Boolean);return d.length>0?d[d.length-1]:"Unknown"};var u=ke,p=g,_=A,b=L,E=Ee,T=et,C=vt,B=dt,x=it,Y=st,Q=Ce,O=gt,D=F,S=G,j=ue,I=ye,ie=Ue,Re=tt,oe=je,pe=we,Oe=wt,Ye=ce;let nt=document.getElementById("header-loading"),Le=xa(nt),He=Wi(e),ge=Ml(),xe=Le.wrapSend((m,d)=>ge.send(m,d)),fe=ha(xe),be=ba(),q=ya(),V=ra(),K=va(),Ie=ea(),P=ta(),U=na();ge.on("exec-presets-snapshot",m=>{let d=m;d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&P.set({revision:d.revision,presets:d.presets})}),ge.on("monitor-pipeline-snapshot",m=>{let d=m;if(!(!d||!Array.isArray(d.workspaces)))try{V.set(d.workspaces,d.workspaces_state)}catch{}}),ge.on("ui-order-snapshot",m=>{let d=m;if(d&&typeof d.revision=="number")try{K.set({revision:d.revision,order:d.order&&typeof d.order=="object"?d.order:{}})}catch{}}),ge.on("display-policy-snapshot",m=>{let d=m;if(d&&d.policy&&typeof d.policy=="object")try{Ie.set(d.policy)}catch{}}),ge.on("session-log-snapshot",m=>{let d=m;if(d&&typeof d.attempt_id=="string")try{U.set(d.attempt_id,Array.isArray(d.lines)?d.lines:[],typeof d.last_event_at=="number"?d.last_event_at:null)}catch{}}),ge.on("session-log-append",m=>{let d=m;if(d&&typeof d.attempt_id=="string")try{U.append(d.attempt_id,d.event)}catch{}}),ge.on("snapshot",m=>{let d=m,$=d&&typeof d.id=="string"?d.id:"",y=$?be.getStore($):null;if(y&&d&&d.type==="snapshot")try{y.applyPush(d)}catch{}}),ge.on("upsert",m=>{let d=m,$=d&&typeof d.id=="string"?d.id:"",y=$?be.getStore($):null;if(y&&d&&d.type==="upsert")try{y.applyPush(d)}catch{}}),ge.on("delete",m=>{let d=m,$=d&&typeof d.id=="string"?d.id:"",y=$?be.getStore($):null;if(y&&d&&d.type==="delete")try{y.applyPush(d)}catch{}});let ee=null,ve=null,Ae=null,Ve=null,$e=()=>{},Be=new Promise(m=>{$e=()=>m(void 0)}),Ne=!1,Ke=!1;async function w(m){let d=g(m);if(d===ve||d===Ae)return;Ae=d;let $=`detail:${m}`,y={type:"issue-detail",params:{id:m}};try{be.register($,y)}catch(M){t("register detail store failed: %o",M)}try{let M=await fe.subscribeList($,y);if(se.getState().selected_id!==m||g(m)!==d){await M().catch(()=>{});return}ee&&await ee().catch(()=>{}),ee=M,ve=d}catch(M){t("detail subscribe failed: %o",M),ke(M,"issue details")}finally{Ae===d&&(Ae=null)}}let W=new Map,X=new Set,J={board:0,worker:0},at=Ct;try{let m=window.localStorage.getItem(jl);Ot(m)&&(at=m)}catch{}let Ze=Ct;try{let m=window.localStorage.getItem(_f);Ot(m)&&(Ze=m)}catch{}async function yt(m){if(!Ot(m)||m===at)return;at=m;try{window.localStorage.setItem(jl,m)}catch{}let d=W.get(hr);if(!d)return;W.delete(hr),await d().catch(()=>{});let $=vt();try{be.register(hr,$)}catch(y){t("register %s store failed: %o",hr,y)}try{let y=await fe.subscribeList(hr,$);W.set(hr,y)}catch(y){t("re-subscribe %s failed: %o",hr,y),ke(y,"board")}}async function It(m){if(!Ot(m)||m===Ze)return;Ze=m;let d=lt.get(gr);if(!d)return;lt.delete(gr),await d().catch(()=>{});let $=dt();try{be.register(gr,$)}catch(y){t("register %s store failed: %o",gr,y)}try{let y=await fe.subscribeList(gr,$);lt.set(gr,y)}catch(y){t("re-subscribe %s failed: %o",gr,y),ke(y,"worker")}}let lt=new Map,rt=null,ae=null,Te=null,Se=null,ut=null;async function Vt(){Se=null,Ie.clear(),ut=null,P.clear(),rt=null,ae=null,W.clear(),lt.clear(),J.board+=1,J.worker+=1,wt();let m=se.getState().workspace.current?.path;if(m)try{await ge.send("set-workspace",{path:m})}catch($){t("workspace restore after reconnect failed: %o",$);return}je();let d=se.getState();it(d.view==="board"),Ce(d.view==="worker"),ue(d.view==="monitor"),F(d.view==="board"||d.view==="worker"||!!d.selected_id)}async function f(){t("clearing all subscriptions for workspace switch"),st(),gt(),G(),q.clear(),tt(),Ue(),we(),je(),A();let m=se.getState();if(m.selected_id)try{be.unregister(`detail:${m.selected_id}`)}catch{}let d=se.getState();it(d.view==="board"),Ce(d.view==="worker"),ue(d.view==="monitor"),F(d.view==="board"||d.view==="worker"||!!d.selected_id),d.selected_id&&L(d.selected_id)}async function k(m){t("requesting workspace switch to %s",m),Ke=!0;try{let d=await ge.send("set-workspace",{path:m});t("workspace switch result: %o",d),d&&d.workspace&&(se.setState({workspace:{current:{path:d.workspace.root_dir,database:d.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),d.changed&&(await f(),Z("Switched to "+ce(m),"success",2e3)))}catch(d){throw t("workspace switch failed: %o",d),Z("Failed to switch workspace","error",3e3),d}finally{Ke=!1}}async function R(m){t("requesting workspace git pull for %s",m);try{let d=await ge.send("git-pull-workspace",{});t("workspace git pull result: %o",d);let $=d?.status;if($==="up_to_date"){Z("Already up to date","success",2e3);return}if($==="stash_pop_conflict"){Z("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Z("Git pulled "+ce(m),"success",2e3)}catch(d){t("workspace git pull failed: %o",d);let $=d?.code,y=d?.message;if($==="rebase_conflict"){Z("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if($==="rebase_conflict_abort_failed"){Z("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if($==="busy"){Z("Git pull skipped: another operation is running","warning",3e3);return}let M=y?`: ${y}`:"";throw Z(`Git pull failed${M}`,"error",3e3),d}}async function te(m,d){t("setting workspace visibility %s \u2192 %s",m,String(d));try{await ge.send("set-workspace-visibility",{path:m,visible:d}),await _e()}catch($){t("workspace visibility update failed: %o",$),Z("Failed to update project visibility","error",3e3)}}async function _e(){try{let m=await ge.send("list-workspaces",{});if(t("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let d=m.workspaces.map(re=>({path:re.path,database:re.database,pid:re.pid,version:re.version})),$=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,y=Array.isArray(m.hidden)?m.hidden.filter(re=>typeof re=="string"):[];se.setState({workspace:{current:$,available:d,hidden:y}});let M=window.localStorage.getItem("beads-ui.workspace");M&&(!d.some(he=>he.path===M)||y.includes(M)?window.localStorage.removeItem("beads-ui.workspace"):$&&M!==$.path&&(t("restoring saved workspace preference: %s",M),await k(M)))}}catch(m){t("failed to load workspaces: %o",m)}}ge.on("workspace-changed",m=>{t("workspace-changed event: %o",m),m&&m.root_dir&&(se.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),_e(),f())});let le=!1;if(typeof ge.onConnection=="function"){let m=d=>{t("ws state %s",d),d==="reconnecting"||d==="closed"?(le=!0,Z("Connection lost. Reconnecting\u2026","error",4e3)):d==="open"&&le&&(le=!1,Z("Reconnected","success",2200),ff(se,($,y)=>{t(`${$}: %o`,y)}),Vt())};ge.onConnection(m)}let qe="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker"||m==="monitor")&&(qe=m)}catch(m){t("view parse error: %o",m)}let se=$a({config:pf(),view:qe});ge.on("worker-queue-snapshot",m=>{let d=m;if(!d||!d.queue)return;let $=se.getState().workspace.current?.path;if(typeof $=="string"&&$.length>0&&d.root_dir!==$){t("dropping worker-queue snapshot for %s",String(d.root_dir));return}try{q.set(d.queue)}catch{}});let Xe=wa(se);Xe.start();let Pt=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),ht=async(m,d)=>{try{return await xe(m,d)}catch($){if(Pt.has(m))throw $;return[]}};n&&gl(n,se,Xe);let pt=document.getElementById("workspace-picker");pt&&Ll(pt,se,k,R,te);let kt=yl(e,(m,d)=>xe(m,d));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>kt.open())}catch{}let de=Hi(e,{policyStore:Ie,transport:(m,d)=>xe(m,d),labelOptions:()=>{let m=new Set;for(let[d]of $o)for(let $ of be.snapshotFor(d)||[]){let y=$.labels;if(Array.isArray(y))for(let M of y)typeof M=="string"&&M.length>0&&m.add(M)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&m.addEventListener("click",()=>de.open())}catch{}let v=Oa(o,{gotoIssue:m=>Xe.gotoIssue(m),issueStores:be,transport:ht,workerQueueStore:q,uiOrderStore:K,displayPolicyStore:Ie,closedRange:at,onClosedRangeChange:m=>{yt(m)},onNewIssue:()=>kt.open()}),H=yo(a,{transport:ht,issueStores:be,queueStore:q,execPresetStore:P,sessionLogStore:U,uiOrderStore:K,gotoIssue:m=>se.setState({selected_id:m}),getWorkspacePath:()=>se.getState().workspace.current?.path,doneRange:Ze,onDoneRangeChange:m=>{It(m)}}),z=ml(i,{transport:ht,pipelineStore:V,execPresetStore:P,gotoIssue:m=>Xe.gotoIssue(m),getWorkspacePath:()=>se.getState().workspace.current?.path,switchWorkspace:m=>k(m)}),me=ji(l,{issueStores:be,transport:ht,queueStore:q,execPresetStore:P,sessionLogStore:U,getWorkspacePath:()=>se.getState().workspace.current?.path,onNavigate:m=>{se.getState().view==="worker"?se.setState({selected_id:m}):Xe.gotoIssue(m)},onClose:()=>{let m=se.getState();se.setState({selected_id:null});try{Xe.gotoView(m.view==="worker"||m.view==="monitor"?m.view:"board")}catch{}},onOpenExecPresets:()=>{se.setState({selected_id:null}),Xe.gotoView("worker"),H.openExecDefaults()}}),We=se.getState().selected_id;We&&(l.hidden=!1,me.load(We),L(We)),se.subscribe(m=>{let d=m.selected_id;d?(l.hidden=!1,me.load(d),Ke||L(d)):(me.clear(),l.hidden=!0,A())});let Je=m=>{o.hidden=m.view!=="board",a.hidden=m.view!=="worker",i.hidden=m.view!=="monitor",it(m.view==="board"),Ce(m.view==="worker"),ue(m.view==="monitor"),F(m.view==="board"||m.view==="worker"||!!m.selected_id),!m.selected_id&&m.view==="board"&&v.load(),m.view==="worker"&&H.load(),m.view==="monitor"?z.load():z.pause(),window.localStorage.setItem("beads-ui.view",m.view)};se.subscribe(Je),Je(se.getState()),Ue(),je(),wt(),_e().finally(()=>{Ne=!0,$e()}),window.addEventListener("keydown",m=>{let d=m.ctrlKey||m.metaKey,$=String(m.key||"").toLowerCase(),y=m.target,M=y&&y.tagName?String(y.tagName).toLowerCase():"",re=M==="input"||M==="textarea"||M==="select"||y&&typeof y.isContentEditable=="boolean"&&y.isContentEditable;d&&$==="n"&&(re||(m.preventDefault(),kt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&mf(t)});export{mf as bootstrap,pf as readBootstrapConfig,ff as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
