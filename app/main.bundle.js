var ac=Object.create;var ms=Object.defineProperty;var ic=Object.getOwnPropertyDescriptor;var lc=Object.getOwnPropertyNames;var cc=Object.getPrototypeOf,dc=Object.prototype.hasOwnProperty;var uc=(e,t,r)=>t in e?ms(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var gs=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var pc=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of lc(t))!dc.call(e,s)&&s!==r&&ms(e,s,{get:()=>t[s],enumerable:!(n=ic(t,s))||n.enumerable});return e};var fc=(e,t,r)=>(r=e!=null?ac(cc(e)):{},pc(t||!e||!e.__esModule?ms(r,"default",{value:e,enumerable:!0}):r,e));var Qe=(e,t,r)=>uc(e,typeof t!="symbol"?t+"":t,r);var la=gs((If,ia)=>{var Lr=1e3,Dr=Lr*60,Or=Dr*60,$r=Or*24,bc=$r*7,yc=$r*365.25;ia.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return vc(e);if(r==="number"&&isFinite(e))return t.long?kc(e):wc(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function vc(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*yc;case"weeks":case"week":case"w":return r*bc;case"days":case"day":case"d":return r*$r;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Or;case"minutes":case"minute":case"mins":case"min":case"m":return r*Dr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Lr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function wc(e){var t=Math.abs(e);return t>=$r?Math.round(e/$r)+"d":t>=Or?Math.round(e/Or)+"h":t>=Dr?Math.round(e/Dr)+"m":t>=Lr?Math.round(e/Lr)+"s":e+"ms"}function kc(e){var t=Math.abs(e);return t>=$r?En(e,t,$r,"day"):t>=Or?En(e,t,Or,"hour"):t>=Dr?En(e,t,Dr,"minute"):t>=Lr?En(e,t,Lr,"second"):e+" ms"}function En(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var da=gs((Lf,ca)=>{function $c(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=i,r.humanize=la(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let m=0;for(let h=0;h<f.length;h++)m=(m<<5)-m+f.charCodeAt(h),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(f){let m,h=null,E,k;function T(...B){if(!T.enabled)return;let $=T,H=Number(new Date),X=H-(m||H);$.diff=X,$.prev=m,$.curr=H,m=H,B[0]=r.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let U=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(x,N)=>{if(x==="%%")return"%";U++;let I=r.formatters[N];if(typeof I=="function"){let pe=B[U];x=I.call($,pe),B.splice(U,1),U--}return x}),r.formatArgs.call($,B),($.log||r.log).apply($,B)}return T.namespace=f,T.useColors=r.useColors(),T.color=r.selectColor(f),T.extend=n,T.destroy=r.destroy,Object.defineProperty(T,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(E!==r.namespaces&&(E=r.namespaces,k=r.enabled(f)),k),set:B=>{h=B}}),typeof r.init=="function"&&r.init(T),T}function n(f,m){let h=r(this.namespace+(typeof m>"u"?":":m)+f);return h.log=this.log,h}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let m=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of m)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(f,m){let h=0,E=0,k=-1,T=0;for(;h<f.length;)if(E<m.length&&(m[E]===f[h]||m[E]==="*"))m[E]==="*"?(k=E,T=h,E++):(h++,E++);else if(k!==-1)E=k+1,T++,h=T;else return!1;for(;E<m.length&&m[E]==="*";)E++;return E===m.length}function a(){let f=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),f}function i(f){for(let m of r.skips)if(o(f,m))return!1;for(let m of r.names)if(o(f,m))return!0;return!1}function c(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}ca.exports=$c});var ua=gs((At,Cn)=>{At.formatArgs=Sc;At.save=Ac;At.load=Tc;At.useColors=xc;At.storage=Ec();At.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();At.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function xc(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Sc(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Cn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}At.log=console.debug||console.log||(()=>{});function Ac(e){try{e?At.storage.setItem("debug",e):At.storage.removeItem("debug")}catch{}}function Tc(){let e;try{e=At.storage.getItem("debug")||At.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Ec(){try{return localStorage}catch{}}Cn.exports=da()(At);var{formatters:Cc}=Cn.exports;Cc.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Yr=globalThis,Tn=Yr.trustedTypes,Yo=Tn?Tn.createPolicy("lit-html",{createHTML:e=>e}):void 0,Jo="$lit$",ir=`lit$${Math.random().toFixed(9).slice(2)}$`,ea="?"+ir,_c=`<${ea}>`,vr=document,Vr=()=>vr.createComment(""),Kr=e=>e===null||typeof e!="object"&&typeof e!="function",$s=Array.isArray,mc=e=>$s(e)||typeof e?.[Symbol.iterator]=="function",hs=`[ 	
\f\r]`,Gr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Vo=/-->/g,Ko=/>/g,br=RegExp(`>|${hs}(?:([^\\s"'>=/]+)(${hs}*=${hs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Zo=/'/g,Xo=/"/g,ta=/^(?:script|style|textarea|title)$/i,xs=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=xs(1),Zt=xs(2),xf=xs(3),wr=Symbol.for("lit-noChange"),dt=Symbol.for("lit-nothing"),Qo=new WeakMap,yr=vr.createTreeWalker(vr,129);function ra(e,t){if(!$s(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Yo!==void 0?Yo.createHTML(t):t}var gc=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Gr;for(let i=0;i<r;i++){let c=e[i],u,f,m=-1,h=0;for(;h<c.length&&(a.lastIndex=h,f=a.exec(c),f!==null);)h=a.lastIndex,a===Gr?f[1]==="!--"?a=Vo:f[1]!==void 0?a=Ko:f[2]!==void 0?(ta.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=br):f[3]!==void 0&&(a=br):a===br?f[0]===">"?(a=s??Gr,m=-1):f[1]===void 0?m=-2:(m=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?br:f[3]==='"'?Xo:Zo):a===Xo||a===Zo?a=br:a===Vo||a===Ko?a=Gr:(a=br,s=void 0);let E=a===br&&e[i+1].startsWith("/>")?" ":"";o+=a===Gr?c+_c:m>=0?(n.push(u),c.slice(0,m)+Jo+c.slice(m)+ir+E):c+ir+(m===-2?i:E)}return[ra(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Zr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,f]=gc(t,r);if(this.el=e.createElement(u,n),yr.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=yr.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(Jo)){let h=f[a++],E=s.getAttribute(m).split(ir),k=/([.?@])?(.*)/.exec(h);c.push({type:1,index:o,name:k[2],strings:E,ctor:k[1]==="."?ys:k[1]==="?"?vs:k[1]==="@"?ws:Ir}),s.removeAttribute(m)}else m.startsWith(ir)&&(c.push({type:6,index:o}),s.removeAttribute(m));if(ta.test(s.tagName)){let m=s.textContent.split(ir),h=m.length-1;if(h>0){s.textContent=Tn?Tn.emptyScript:"";for(let E=0;E<h;E++)s.append(m[E],Vr()),yr.nextNode(),c.push({type:2,index:++o});s.append(m[h],Vr())}}}else if(s.nodeType===8)if(s.data===ea)c.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(ir,m+1))!==-1;)c.push({type:7,index:o}),m+=ir.length-1}o++}}static createElement(t,r){let n=vr.createElement("template");return n.innerHTML=t,n}};function Rr(e,t,r=e,n){if(t===wr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Kr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Rr(e,s._$AS(e,t.values),s,n)),t}var bs=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??vr).importNode(r,!0);yr.currentNode=s;let o=yr.nextNode(),a=0,i=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Xr(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new ks(o,this,t)),this._$AV.push(u),c=n[++i]}a!==c?.index&&(o=yr.nextNode(),a++)}return yr.currentNode=vr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Xr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=dt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Rr(this,t,r),Kr(t)?t===dt||t==null||t===""?(this._$AH!==dt&&this._$AR(),this._$AH=dt):t!==this._$AH&&t!==wr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):mc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==dt&&Kr(this._$AH)?this._$AA.nextSibling.data=t:this.T(vr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Zr.createElement(ra(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new bs(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Qo.get(t.strings);return r===void 0&&Qo.set(t.strings,r=new Zr(t)),r}k(t){$s(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Vr()),this.O(Vr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ir=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=dt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=dt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Rr(this,t,r,0),a=!Kr(t)||t!==this._$AH&&t!==wr,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Rr(this,i[n+c],r,c),u===wr&&(u=this._$AH[c]),a||(a=!Kr(u)||u!==this._$AH[c]),u===dt?t=dt:t!==dt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===dt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ys=class extends Ir{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===dt?void 0:t}},vs=class extends Ir{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==dt)}},ws=class extends Ir{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Rr(this,t,r,0)??dt)===wr)return;let n=this._$AH,s=t===dt&&n!==dt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==dt&&(n===dt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ks=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Rr(this,t)}};var hc=Yr.litHtmlPolyfillSupport;hc?.(Zr,Xr),(Yr.litHtmlVersions??(Yr.litHtmlVersions=[])).push("3.3.1");var Ue=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Xr(t.insertBefore(Vr(),o),o,void 0,r??{})}return s._$AI(e),s};var Et="today",Ht=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Dt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function kr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function na(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function sa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function oa(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function aa(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var pa=fc(ua(),1);function ot(e){return(0,pa.default)(`beads-ui:${e}`)}function Nt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function xr(e,t){let r=Nt(e.created_at),n=Nt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ma(e,t){let r=Nt(e.created_at),n=Nt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ga(e,t){let r=Nt(e.updated_at),n=Nt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function ha(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Nt(e.created_at),o=Nt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ba(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Rc=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function fa(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function _a(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Rc.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ya(e,t){let r=fa(e),n=fa(t);if(r!==n)return r<n?-1:1;let s=_a(e),o=_a(t);if(s!==o)return s<o?-1:1;let a=Nt(e&&e.created_at),i=Nt(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Ss=2**20;function Mr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Nt(e&&e.created_at)}function Rn(e){return(t,r)=>{let n=Mr(t,e),s=Mr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function As(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Mr(i,r)-Ss};if(!i)return{rank:Mr(a,r)+Ss};let c=Mr(a,r),u=Mr(i,r),f=(c+u)/2;return c<f&&f<u?{rank:f}:{renormalize:n.map((m,h)=>({bead_id:m.id,rank:h*Ss}))}}function Ts(e,t={}){let r=ot(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||xr;function u(){for(let h of Array.from(a))try{h()}catch{}}function f(){s=Array.from(n.values()).sort(c)}function m(h){if(i||!h||h.id!==e)return;let E=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,E),!(E<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(E<=o)return;n.clear();let k=Array.isArray(h.issues)?h.issues:[];for(let T of k)T&&typeof T.id=="string"&&T.id.length>0&&n.set(T.id,T);f(),o=E,u();return}if(h.type==="upsert"){let k=h.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let T=n.get(k.id);if(!T)n.set(k.id,k);else{let B=Number.isFinite(T.updated_at)?T.updated_at:0,$=Number.isFinite(k.updated_at)?k.updated_at:0;if(B<=$){for(let H of Object.keys(T))H in k||delete T[H];for(let[H,X]of Object.entries(k))T[H]=X}}f()}o=E,u()}else if(h.type==="delete"){let k=String(h.issue_id||"");k&&(n.delete(k),f()),o=E,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function In(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function va(e){let t=ot("subs"),r=new Map,n=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let f=Array.isArray(c.added)?c.added:[],m=Array.isArray(c.updated)?c.updated:[],h=Array.isArray(c.removed)?c.removed:[];for(let E of Array.from(u)){let k=r.get(E);if(!k)continue;let T=k.itemsById;for(let B of f)typeof B=="string"&&B.length>0&&T.set(B,!0);for(let B of m)typeof B=="string"&&B.length>0&&T.set(B,!0);for(let B of h)typeof B=="string"&&B.length>0&&T.delete(B)}}async function o(i,c){let u=In(c);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let m=r.get(i);if(m&&m.key!==u){let h=n.get(m.key);h&&(h.delete(i),h.size===0&&n.delete(m.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(m){let h=r.get(i)||null;if(h){let E=n.get(h.key);E&&(E.delete(i),E.size===0&&n.delete(h.key))}throw r.delete(i),m}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let m=r.get(i)||null;if(m){let h=n.get(m.key);h&&(h.delete(i),h.size===0&&n.delete(m.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:In,selectors:{getIds(i){let c=r.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=r.get(i);return u?u.itemsById.has(c):!1},count(i){let c=r.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=r.get(i),u={};if(!c)return u;for(let f of c.itemsById.keys())u[f]=!0;return u}}}}function wa(){let e=ot("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,f){let m=u?In(u):"",h=r.get(c)||"",E=t.has(c);if(e("register %s key=%s (prev=%s)",c,m,h),E&&h&&m&&h!==m){let k=t.get(c);if(k)try{k.dispose()}catch{}let T=s.get(c);if(T){try{T()}catch{}s.delete(c)}let B=Ts(c,f);t.set(c,B);let $=B.subscribe(()=>o());s.set(c,$)}else if(!E){let k=Ts(c,f);t.set(c,k);let T=k.subscribe(()=>o());s.set(c,T)}return r.set(c,m),()=>i(c)}function i(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let f=s.get(c);if(f){try{f()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function ka(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function $a(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Es(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Ic(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Lc(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function xa(e){let t=ot("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Ic(n),a=Lc(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Es(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Es(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Dc=Object.freeze({workspace_config:{default_workspace:null}});function Sa(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Dc.workspace_config.default_workspace}}}function Aa(e={}){let t=ot("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Sa(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Sa(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!i&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Ta(e){let t=ot("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(m,h)=>{let E=s++,k=Date.now();n.set(E,{type:m,start_ts:k}),t("request start id=%d type=%s count=%d",E,m,r+1),a();let T=!1,B=()=>{T||(T=!0,n.delete(E),i())},$=setTimeout(()=>{T||(t("request TIMEOUT id=%d type=%s elapsed=%dms",E,m,Date.now()-k),B())},3e4);try{let H=await u(m,h),X=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",E,m,X),H}catch(H){let X=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",E,m,X,H),H}finally{clearTimeout($),B()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,m])=>({id:f,type:m.type,elapsed_ms:u-m.start_ts}))}}}function Z(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}var Cs=new Set;function Ea(e,t,r="info",n=2800){if(typeof e!="string"||e.length===0)return!1;let s=`beads-ui.toast.${e}`;if(Cs.has(s))return!1;try{if(window.sessionStorage.getItem(s)==="1")return Cs.add(s),!1;window.sessionStorage.setItem(s,"1")}catch{}return Cs.add(s),Z(t,r,n),!0}function Ln(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(ba),c;switch(i){case"created_desc":return c.sort(xr),c;case"created_asc":return c.sort(ma),c;case"updated_desc":return c.sort(ga),c;case"priority":return c.sort(ha),c;case"manual":default:{let u=r();return u?c.sort(Rn(u)):c.sort(xr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Xt(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Tt(e){let t=Xt(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Ct(e,t){let r=Xt(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Dn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Xt(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function On(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(As(i,c,u.order),a);s(u,f);let m=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(m&&m.conflict){let h={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(h);let E=n(As(i,c,h.order),a);s(h,E);let k=await t("ui-order-set",{expected_revision:h.revision,entries:E});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Mn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Rs(e,t){return!t||typeof e!="string"||e.length===0||Mn(t.visible_labels).includes(e)?!0:Mn(t.hidden_labels).includes(e)?!1:!Mn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Pn(e,t){return Mn(e).filter(r=>Rs(r,t))}function lr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Oc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ra={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ca={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Mc={review:"\u2713",skip:"\u2298"},cr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Pc(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ia(e){let t=e&&e.fill||"none";return t==="none"?cr.none:e&&e.stale===!0?cr.stale:t==="dim"?cr.dim:e&&e.glyph==="review"?cr.review:e&&e.glyph==="skip"?cr.skip:cr.done}function Nc(e){if(!e||e.fill==="none"||!e.approval_state)return Ia(e);let t=[];return e.glyph==="review"?t.push(cr.review):e.glyph==="skip"&&t.push(cr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Fc(e,t,r){let n=Oc[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Mc[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${c}>
        ${Ra[e]||e}
      </div>
    </div>
  `}function Nn(e,t){if(!e||!e.stages)return"";let r=Ca[e.route]||Ca.spec_backed,n=e.stages,s=Pc(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Ra[a]||a} ${a==="plan"?Nc(n[a]||{}):Ia(n[a]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Fc(a,n[a]||{},a===s))}
    </div>
  `}function qc(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var La=2;function Bc(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,La).join(", "),s=r.length-La,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Uc(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&lr(r,"route")){let a=n.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&lr(r,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&lr(r,"pr")){let a=n.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}for(let a of Pn(e.labels,r))s.push(l`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&lr(r,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),lr(r,"blocked")&&s.push(...Bc(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&lr(r,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 실패</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function jc(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function zc(e){let t=Ct(e.created_at),r=Ct(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Tt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?l`<span class="board-card__time-sep">·</span>`:""}
    ${r?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Tt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Hc(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(ya):r.children;return l`
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
        ${zc(e)}
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
                  <span class=${jc(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Fn(e,t){let r=qc(e.priority);return l`
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
      ${Uc(e,t)}
      ${e.workflow&&lr(t.policy||null,"stepper")?Nn(e.workflow,e.status):""}
      ${Hc(e,t)}
    </article>
  `}function Pr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return l`
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
        ${e.items.map(o=>Fn(o,t))}
      </div>
    </section>
  `}function Da(e,t,r){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Fn(n,t))}
        </div>
      </div>
    </dialog>
  `}var Wc=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Gc=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Yc=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Vc(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
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
  `}function Oa(e,t,r){return l`
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
        ${Wc.map(n=>l`<option
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
        ${Gc.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Vc(e,t,r)}
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
        ${Yc.map(n=>l`<option
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
  `}var Kc=200,Zc={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Xc=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ma="beads-ui.board.sort",Pa=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Qc(){try{let e=window.localStorage.getItem(Ma);if(e&&Pa.has(e))return e}catch{}return"created_desc"}function Na(e,t){let r=ot("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,m=t.closedRange||Et,h=s?Ln(s,a):null,E=On({transport:o,uiOrderStore:a}),k=[],T=[],B=[],$=[],H=[],X=[],U=!1,O=0,x=Qc(),N=new Map,I=new Map,pe=new Map,ve=new Set,se={search:"",priority:"",type:"",labels:[]},be=!1,Me=null;function tt(F){return String(F.status||"open")==="open"}function Je(F){let G=String(F.status||"open");return G==="open"||G==="blocked"}function Ie(F){let G=se.search.trim().toLowerCase(),oe=se.priority,_e=se.type,$e=se.labels;return F.filter(Re=>{if(G){let We=String(Re.id||"").toLowerCase(),et=String(Re.title||"").toLowerCase();if(!We.includes(G)&&!et.includes(G))return!1}if(oe!==""&&String(Re.priority)!==oe||_e!==""&&String(Re.issue_type||"")!==_e)return!1;if($e.length>0){let We=Array.isArray(Re.labels)?Re.labels:[];if(!$e.some(et=>We.includes(et)))return!1}return!0})}function Xe(){let F=new Set;for(let G of[k,T,B,$,H,X])for(let oe of G){let _e=Array.isArray(oe.labels)?oe.labels:[];for(let $e of _e)typeof $e=="string"&&$e.length>0&&F.add($e)}return Array.from(F).sort()}function we(){return se.search.trim()!==""||se.priority!==""||se.type!==""||se.labels.length>0}function ge(){try{if(h){let F=h.selectBoardColumn("tab:board:in-progress","in_progress",x),G=h.selectBoardColumn("tab:board:blocked","blocked",x).filter(Je),oe=new Set(F.map(Se=>Se.id)),_e=h.selectBoardColumn("tab:board:ready","ready",x).filter(Se=>tt(Se)&&!oe.has(Se.id)),$e=h.selectBoardColumn("tab:board:resolved","resolved",x),Re=h.selectBoardColumn("tab:board:deferred","deferred",x),We=h.selectBoardColumn("tab:board:closed","closed").slice(0,Kc),et=[...G,..._e,...F,...$e,...We];ke(et);let Ae=new Set;for(let Se of et)Se&&Se.id&&!Is(Se)&&Ae.add(Se.id);let Ye=!we();k=Ye?Qr(G,Ae):G,T=Ye?Qr(_e,Ae):_e,B=Ye?Qr(F,Ae):F,$=Ye?Qr($e,Ae):$e,H=Re,O=Re.length,X=Ye?Qr(We,Ae):We,N=new Map;for(let Se of k)N.set(Se.id,"open");for(let Se of T)N.set(Se.id,"open");for(let Se of B)N.set(Se.id,"in_progress");for(let Se of $)N.set(Se.id,"resolved");for(let Se of H)N.set(Se.id,"deferred");for(let Se of X)N.set(Se.id,"closed");I=new Map;for(let Se of k)I.set(Se.id,"blocked-col");for(let Se of T)I.set(Se.id,"ready-col");for(let Se of B)I.set(Se.id,"in-progress-col");for(let Se of $)I.set(Se.id,"resolved-col");for(let Se of X)I.set(Se.id,"closed-col")}ze()}catch{k=[],T=[],B=[],$=[],H=[],X=[],pe=new Map,ze()}}function ke(F){let G=new Map;for(let _e of F)_e&&_e.id&&!G.has(_e.id)&&G.set(_e.id,_e);let oe=new Map;for(let _e of G.values()){let $e=Is(_e);if(!$e)continue;let Re=oe.get($e);Re||(Re=[],oe.set($e,Re)),Re.push({id:_e.id,title:_e.title,status:_e.status,metadata:_e.metadata,created_at:_e.created_at,updated_at:_e.updated_at})}pe=oe}function fe(F){let G=pe.get(F)||[],oe=0;for(let $e of G)($e.status==="resolved"||$e.status==="closed")&&(oe+=1);let _e=Dn(G);return{total:G.length,count:oe,current:_e,children:G}}function W(F){return!ve.has(F)}function j(F,G){F.preventDefault(),F.stopPropagation(),ve.has(G)?ve.delete(G):ve.add(G),ze()}function he(F,G){F.preventDefault(),F.stopPropagation(),n(G)}function V(F,G){F.preventDefault(),F.stopPropagation(),n(G)}function Ee(F,G){Me||n(G)}function M(F,G){F.preventDefault(),F.stopPropagation(),Jc(G).then(oe=>{oe&&Z("\uBCF5\uC0AC\uB428","success",1200)})}function P(F,G){Me=G,F.dataTransfer&&(F.dataTransfer.setData("text/plain",G),F.dataTransfer.effectAllowed="move"),F.target.classList.add("board-card--dragging")}function ae(F){F.target.classList.remove("board-card--dragging"),It(),setTimeout(()=>{Me=null},0)}function Fe(F){let G=String(F.target.value||"");!G||G===m||(m=G,u&&u(G),ze())}function Te(){return i?i.get():null}function Be(F){let G=c?c.get():null,oe=G?G.cleanup_failed:null;if(!oe||typeof oe!="object"||Array.isArray(oe))return null;let _e=oe[F];return!_e||typeof _e!="object"||Array.isArray(_e)?null:_e}let De={onCardClick:Ee,onCopyId:M,onDragStart:P,onDragEnd:ae,onClosedRangeChange:Fe,rollupFor:fe,isExpanded:W,onRollupToggle:j,onChildClick:he,onFromChipClick:V,cleanupFailureFor:Be,get policy(){return Te()}};function Ke(F,G){Me||(le(),n(G))}function C(F,G){F.preventDefault(),F.stopPropagation(),le(),n(G)}let ne={...De,onCardClick:Ke,onChildClick:C,onFromChipClick:C,get policy(){return Te()}};function A(F){let G=F.target,oe=e.querySelector(".board-filter__labels");G&&oe&&oe.contains(G)||Y()}function L(F){F.key==="Escape"&&Y()}function S(){be||(be=!0,document.addEventListener("mousedown",A),document.addEventListener("keydown",L),ze())}function Y(){be&&(be=!1,document.removeEventListener("mousedown",A),document.removeEventListener("keydown",L),ze())}function K(F){F.key==="Escape"&&le()}function re(){U||(U=!0,document.addEventListener("keydown",K),ze())}function le(){U&&(U=!1,document.removeEventListener("keydown",K),ze())}let Ce={onClose:le,onOverlayClick(F){F.target===F.currentTarget&&le()}},je={onSearchInput(F){se.search=String(F.target.value||""),ge()},onPriorityChange(F){se.priority=String(F.target.value||""),ge()},onTypeChange(F){se.type=String(F.target.value||""),ge()},onSortChange(F){let G=String(F.target.value||"");if(!(!Pa.has(G)||G===x)){x=G;try{window.localStorage.setItem(Ma,G)}catch{}ge()}},onDeferredToggle(){U?le():re()},onLabelMenuToggle(){be?Y():S()},onLabelToggle(F){let G=se.labels.indexOf(F);G===-1?se.labels.push(F):se.labels.splice(G,1),ge()},onLabelClear(){se.labels.length!==0&&(se.labels=[],ge())},onNewIssue(){f&&f()}};function rt(){return l`
      <div class="board-view">
        ${Oa(se,je,{sort_mode:x,deferred_popup_open:U,deferred_count:O,label_options:Xe(),label_menu_open:be})}
        <div class="board-root">
          ${Pr({title:"Blocked",id:"blocked-col",items:Ie(k)},De)}
          ${Pr({title:"Ready",id:"ready-col",items:Ie(T)},De)}
          ${Pr({title:"In progress",id:"in-progress-col",items:Ie(B)},De)}
          ${Pr({title:"Resolved",id:"resolved-col",items:Ie($)},De)}
          ${Pr({title:"Closed",id:"closed-col",items:Ie(X),is_closed:!0,closed_range:m},De)}
        </div>
        ${U?Da({items:Ie(H),count:O},ne,Ce):""}
      </div>
    `}function ze(){Ue(rt(),e),bt()}function bt(){try{let F=e.querySelector("#deferred-popup");F&&!F.open&&(typeof F.showModal=="function"?F.showModal():F.setAttribute("open",""));let G=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let oe of G)Array.from(oe.querySelectorAll(".board-card")).forEach(($e,Re)=>{$e.tabIndex=Re===0?0:-1})}catch{}}async function ut(F,G){if(!o){Z("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:F,status:G}),Z("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(oe){r("update-status failed: %o",oe),Z("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function lt(F){switch(F){case"blocked-col":return k;case"ready-col":return T;case"in-progress-col":return B;case"resolved-col":return $;default:return[]}}function yt(F,G,oe){if(!o||!a)return;let _e=lt(F),$e=_e.find(Ye=>Ye.id===G);if(!$e)return;let Re=_e.filter(Ye=>Ye.id!==G),We=oe.closest?oe.closest(".board-card"):null,et=Re.length;if(We){let Ye=We.getAttribute("data-issue-id");if(Ye===G)return;let Se=Re.findIndex(pt=>pt.id===Ye);Se>=0&&(et=Se)}let Ae=Re.slice();Ae.splice(et,0,$e),E.applyReorder(G,Ae,et)}function It(){for(let F of Array.from(e.querySelectorAll(".board-column--drag-over")))F.classList.remove("board-column--drag-over")}let nt=null;e.addEventListener("dragover",F=>{F.preventDefault(),F.dataTransfer&&(F.dataTransfer.dropEffect="move");let oe=F.target.closest(".board-column");oe&&oe!==nt&&(nt&&nt.classList.remove("board-column--drag-over"),oe.classList.add("board-column--drag-over"),nt=oe)}),e.addEventListener("dragleave",F=>{let G=F.relatedTarget;(!G||!e.contains(G))&&nt&&(nt.classList.remove("board-column--drag-over"),nt=null)}),e.addEventListener("drop",F=>{F.preventDefault(),nt&&(nt.classList.remove("board-column--drag-over"),nt=null);let G=F.target,oe=G.closest(".board-column");if(!oe)return;let _e=F.dataTransfer?.getData("text/plain")||"";if(!_e)return;let $e=oe.id,Re=I.get(_e);if(Re&&Re===$e){if(Xc.has($e)){if(x!=="manual"){Z("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}yt($e,_e,G)}return}let We=Zc[$e];if(!We){Z("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}N.get(_e)!==We&&ut(_e,We)}),e.addEventListener("keydown",F=>{let G=F.target;if(!(G instanceof HTMLElement))return;let oe=String(G.tagName||"").toLowerCase();if(oe==="input"||oe==="textarea"||oe==="select"||oe==="button"||oe==="a"||G.isContentEditable===!0)return;let _e=G.closest(".board-card");if(!_e)return;let $e=String(F.key||"");if($e==="Enter"||$e===" "){F.preventDefault();let Ae=_e.getAttribute("data-issue-id");Ae&&n(Ae);return}if($e!=="ArrowUp"&&$e!=="ArrowDown"&&$e!=="ArrowLeft"&&$e!=="ArrowRight")return;F.preventDefault();let Re=_e.closest(".board-column");if(!Re)return;let We=Array.from(Re.querySelectorAll(".board-card")),et=We.indexOf(_e);if($e==="ArrowDown"&&et<We.length-1){at(_e,We[et+1]);return}if($e==="ArrowUp"&&et>0){at(_e,We[et-1]);return}if($e==="ArrowLeft"||$e==="ArrowRight"){let Ae=Array.from(e.querySelectorAll(".board-column")),Ye=Ae.indexOf(Re),Se=$e==="ArrowRight"?1:-1,pt=Ye+Se;for(;pt>=0&&pt<Ae.length;){let ht=Ae[pt].querySelector(".board-card");if(ht){at(_e,ht);return}pt+=Se}}});function at(F,G){try{F.tabIndex=-1,G.tabIndex=0,G.focus()}catch{}}let st=null;h&&h.subscribe&&(st=h.subscribe(()=>{try{ge()}catch{}}));let ct=null;i&&i.subscribe&&(ct=i.subscribe(()=>{try{ge()}catch{}}));let Oe=null;return c&&c.subscribe&&(Oe=c.subscribe(()=>{ze()})),{async load(){r("load"),ge()},clear(){Y(),le(),st&&(st(),st=null),ct&&(ct(),ct=null),Oe&&(Oe(),Oe=null),e.replaceChildren(),k=[],T=[],B=[],$=[],H=[],X=[],N=new Map,I=new Map}}}function Is(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Qr(e,t){return e.filter(r=>{let n=Is(r);return!(n&&t.has(n))})}async function Jc(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Sr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Wt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function dr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function ed(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${Wt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Wt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(c=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),c(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function Gt(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await ed(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var ja="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function _t(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Qt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Jr=[...Qt,"reasoning_output_tokens"],td=["implementation","review-consult"];function Ls(e){let t=0;for(let r of Qt)t+=_t(e?.[r]);return t}function rd(e){return!e||typeof e!="object"?!1:Qt.some(t=>Number.isFinite(e[t]))}function Fa(e){return!e||typeof e!="object"?!1:Jr.some(t=>Number.isFinite(e[t]))}function nd(e){let t={};for(let r of Jr)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function qa(e){let t={};for(let r of Jr)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Ba(e,t){return e==="codex"?_t(t.input_tokens)+_t(t.output_tokens):Ls(t)}function sd(e){return e==="claude"?"Claude":"Codex"}function od(e){return`\u03C4 ${za(e)}`}function ad(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${_t(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${_t(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${_t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${_t(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${_t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${_t(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${_t(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(ja),o.join(`
`)}function gt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${sd(r)} ${od(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:ad(r,n)})}return t}function Bn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of Jr)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=_t(i.breakdown[c])+_t(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ds(e){return!e||typeof e!="object"?null:Ot({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function id(e){return e==="codex"?"codex":"claude"}function ur(){return{subtotal:0,breakdown:nd(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function qn(e,t,r){e.subtotal+=t.subtotal;for(let n of Jr)Number.isFinite(t.usage[n])&&(e.breakdown[n]=_t(e.breakdown[n])+_t(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Ua(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function za(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Nr(e){return rd(e)?`\u03C4 ${za(Ls(e))}`:null}function Ft(e){let t=Nr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Fr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${_t(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${_t(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${_t(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${_t(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Ls(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(ja),r.join(`
`)}function Ot(e,t){let r={claude:ur(),codex:ur()},n={orchestrator:{claude:ur(),codex:ur()},implementation:{claude:ur(),codex:ur()},"review-consult":{claude:ur(),codex:ur()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(Fa(c)){let f=id(i.runner),m=qa(c),h={provider:f,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:m,subtotal:Ba(f,m)};m.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),qn(r[f],h,!0),qn(n.orchestrator[f],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!td.includes(f.role)||!Fa(f.usage))continue;let m=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!m||s.has(m))continue;s.add(m);let h=qa(f.usage),E={provider:"codex",role:f.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:Ba("codex",h)};E.receipt_id=m,typeof f.model=="string"&&(E.model=f.model),typeof f.session_id=="string"?E.session_id=f.session_id:typeof f.thread_id=="string"&&(E.session_id=f.thread_id),typeof f.turn_id=="string"&&(E.turn_id=f.turn_id),typeof f.completed_at=="string"&&(E.completed_at=f.completed_at),h.replayed===!0&&(E.replayed=!0),qn(r.codex,E,!1),qn(n[E.role].codex,E,!1)}}let o={};for(let i of["claude","codex"]){let c=r[i];if(c.legs.length===0)continue;let u=Ua(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let f=n[i][u];f.legs.length>0&&(c[u]={...Ua(f,!0),legs:f.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:Qa,setPrototypeOf:Ha,isFrozen:ld,getPrototypeOf:cd,getOwnPropertyDescriptor:dd}=Object,{freeze:kt,seal:Mt,create:Bs}=Object,{apply:Us,construct:js}=typeof Reflect<"u"&&Reflect;kt||(kt=function(t){return t});Mt||(Mt=function(t){return t});Us||(Us=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});js||(js=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Un=$t(Array.prototype.forEach),ud=$t(Array.prototype.lastIndexOf),Wa=$t(Array.prototype.pop),en=$t(Array.prototype.push),pd=$t(Array.prototype.splice),zn=$t(String.prototype.toLowerCase),Os=$t(String.prototype.toString),Ms=$t(String.prototype.match),tn=$t(String.prototype.replace),fd=$t(String.prototype.indexOf),_d=$t(String.prototype.trim),qt=$t(Object.prototype.hasOwnProperty),wt=$t(RegExp.prototype.test),rn=md(TypeError);function $t(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Us(e,t,n)}}function md(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return js(e,r)}}function Pe(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:zn;Ha&&Ha(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(ld(t)||(t[n]=o),s=o)}e[s]=!0}return e}function gd(e){for(let t=0;t<e.length;t++)qt(e,t)||(e[t]=null);return e}function Jt(e){let t=Bs(null);for(let[r,n]of Qa(e))qt(e,r)&&(Array.isArray(n)?t[r]=gd(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Jt(n):t[r]=n);return t}function nn(e,t){for(;e!==null;){let n=dd(e,t);if(n){if(n.get)return $t(n.get);if(typeof n.value=="function")return $t(n.value)}e=cd(e)}function r(){return null}return r}var Ga=kt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ps=kt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ns=kt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),hd=kt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Fs=kt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),bd=kt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ya=kt(["#text"]),Va=kt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),qs=kt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ka=kt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),jn=kt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),yd=Mt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),vd=Mt(/<%[\w\W]*|[\w\W]*%>/gm),wd=Mt(/\$\{[\w\W]*/gm),kd=Mt(/^data-[\-\w.\u00B7-\uFFFF]+$/),$d=Mt(/^aria-[\-\w]+$/),Ja=Mt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),xd=Mt(/^(?:\w+script|data):/i),Sd=Mt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ei=Mt(/^html$/i),Ad=Mt(/^[a-z][.\w]*(-[.\w]+)+$/i),Za=Object.freeze({__proto__:null,ARIA_ATTR:$d,ATTR_WHITESPACE:Sd,CUSTOM_ELEMENT:Ad,DATA_ATTR:kd,DOCTYPE_NAME:ei,ERB_EXPR:vd,IS_ALLOWED_URI:Ja,IS_SCRIPT_OR_DATA:xd,MUSTACHE_EXPR:yd,TMPLIT_EXPR:wd}),sn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Td=function(){return typeof window>"u"?null:window},Ed=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Xa=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ti(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Td(),t=ue=>ti(ue);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==sn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:h,trustedTypes:E}=e,k=c.prototype,T=nn(k,"cloneNode"),B=nn(k,"remove"),$=nn(k,"nextSibling"),H=nn(k,"childNodes"),X=nn(k,"parentNode");if(typeof a=="function"){let ue=r.createElement("template");ue.content&&ue.content.ownerDocument&&(r=ue.content.ownerDocument)}let U,O="",{implementation:x,createNodeIterator:N,createDocumentFragment:I,getElementsByTagName:pe}=r,{importNode:ve}=n,se=Xa();t.isSupported=typeof Qa=="function"&&typeof X=="function"&&x&&x.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:be,ERB_EXPR:Me,TMPLIT_EXPR:tt,DATA_ATTR:Je,ARIA_ATTR:Ie,IS_SCRIPT_OR_DATA:Xe,ATTR_WHITESPACE:we,CUSTOM_ELEMENT:ge}=Za,{IS_ALLOWED_URI:ke}=Za,fe=null,W=Pe({},[...Ga,...Ps,...Ns,...Fs,...Ya]),j=null,he=Pe({},[...Va,...qs,...Ka,...jn]),V=Object.seal(Bs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ee=null,M=null,P=Object.seal(Bs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ae=!0,Fe=!0,Te=!1,Be=!0,De=!1,Ke=!0,C=!1,ne=!1,A=!1,L=!1,S=!1,Y=!1,K=!0,re=!1,le="user-content-",Ce=!0,je=!1,rt={},ze=null,bt=Pe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ut=null,lt=Pe({},["audio","video","img","source","image","track"]),yt=null,It=Pe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),nt="http://www.w3.org/1998/Math/MathML",at="http://www.w3.org/2000/svg",st="http://www.w3.org/1999/xhtml",ct=st,Oe=!1,F=null,G=Pe({},[nt,at,st],Os),oe=Pe({},["mi","mo","mn","ms","mtext"]),_e=Pe({},["annotation-xml"]),$e=Pe({},["title","style","font","a","script"]),Re=null,We=["application/xhtml+xml","text/html"],et="text/html",Ae=null,Ye=null,Se=r.createElement("form"),pt=function(b){return b instanceof RegExp||b instanceof Function},ht=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ye&&Ye===b)){if((!b||typeof b!="object")&&(b={}),b=Jt(b),Re=We.indexOf(b.PARSER_MEDIA_TYPE)===-1?et:b.PARSER_MEDIA_TYPE,Ae=Re==="application/xhtml+xml"?Os:zn,fe=qt(b,"ALLOWED_TAGS")?Pe({},b.ALLOWED_TAGS,Ae):W,j=qt(b,"ALLOWED_ATTR")?Pe({},b.ALLOWED_ATTR,Ae):he,F=qt(b,"ALLOWED_NAMESPACES")?Pe({},b.ALLOWED_NAMESPACES,Os):G,yt=qt(b,"ADD_URI_SAFE_ATTR")?Pe(Jt(It),b.ADD_URI_SAFE_ATTR,Ae):It,ut=qt(b,"ADD_DATA_URI_TAGS")?Pe(Jt(lt),b.ADD_DATA_URI_TAGS,Ae):lt,ze=qt(b,"FORBID_CONTENTS")?Pe({},b.FORBID_CONTENTS,Ae):bt,Ee=qt(b,"FORBID_TAGS")?Pe({},b.FORBID_TAGS,Ae):Jt({}),M=qt(b,"FORBID_ATTR")?Pe({},b.FORBID_ATTR,Ae):Jt({}),rt=qt(b,"USE_PROFILES")?b.USE_PROFILES:!1,ae=b.ALLOW_ARIA_ATTR!==!1,Fe=b.ALLOW_DATA_ATTR!==!1,Te=b.ALLOW_UNKNOWN_PROTOCOLS||!1,Be=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,De=b.SAFE_FOR_TEMPLATES||!1,Ke=b.SAFE_FOR_XML!==!1,C=b.WHOLE_DOCUMENT||!1,L=b.RETURN_DOM||!1,S=b.RETURN_DOM_FRAGMENT||!1,Y=b.RETURN_TRUSTED_TYPE||!1,A=b.FORCE_BODY||!1,K=b.SANITIZE_DOM!==!1,re=b.SANITIZE_NAMED_PROPS||!1,Ce=b.KEEP_CONTENT!==!1,je=b.IN_PLACE||!1,ke=b.ALLOWED_URI_REGEXP||Ja,ct=b.NAMESPACE||st,oe=b.MATHML_TEXT_INTEGRATION_POINTS||oe,_e=b.HTML_INTEGRATION_POINTS||_e,V=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&pt(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(V.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&pt(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(V.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(V.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),De&&(Fe=!1),S&&(L=!0),rt&&(fe=Pe({},Ya),j=[],rt.html===!0&&(Pe(fe,Ga),Pe(j,Va)),rt.svg===!0&&(Pe(fe,Ps),Pe(j,qs),Pe(j,jn)),rt.svgFilters===!0&&(Pe(fe,Ns),Pe(j,qs),Pe(j,jn)),rt.mathMl===!0&&(Pe(fe,Fs),Pe(j,Ka),Pe(j,jn))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?P.tagCheck=b.ADD_TAGS:(fe===W&&(fe=Jt(fe)),Pe(fe,b.ADD_TAGS,Ae))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?P.attributeCheck=b.ADD_ATTR:(j===he&&(j=Jt(j)),Pe(j,b.ADD_ATTR,Ae))),b.ADD_URI_SAFE_ATTR&&Pe(yt,b.ADD_URI_SAFE_ATTR,Ae),b.FORBID_CONTENTS&&(ze===bt&&(ze=Jt(ze)),Pe(ze,b.FORBID_CONTENTS,Ae)),Ce&&(fe["#text"]=!0),C&&Pe(fe,["html","head","body"]),fe.table&&(Pe(fe,["tbody"]),delete Ee.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw rn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw rn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');U=b.TRUSTED_TYPES_POLICY,O=U.createHTML("")}else U===void 0&&(U=Ed(E,s)),U!==null&&typeof O=="string"&&(O=U.createHTML(""));kt&&kt(b),Ye=b}},sr=Pe({},[...Ps,...Ns,...hd]),jt=Pe({},[...Fs,...bd]),p=function(b){let z=X(b);(!z||!z.tagName)&&(z={namespaceURI:ct,tagName:"template"});let ee=zn(b.tagName),Ne=zn(z.tagName);return F[b.namespaceURI]?b.namespaceURI===at?z.namespaceURI===st?ee==="svg":z.namespaceURI===nt?ee==="svg"&&(Ne==="annotation-xml"||oe[Ne]):!!sr[ee]:b.namespaceURI===nt?z.namespaceURI===st?ee==="math":z.namespaceURI===at?ee==="math"&&_e[Ne]:!!jt[ee]:b.namespaceURI===st?z.namespaceURI===at&&!_e[Ne]||z.namespaceURI===nt&&!oe[Ne]?!1:!jt[ee]&&($e[ee]||!sr[ee]):!!(Re==="application/xhtml+xml"&&F[b.namespaceURI]):!1},v=function(b){en(t.removed,{element:b});try{X(b).removeChild(b)}catch{B(b)}},R=function(b,z){try{en(t.removed,{attribute:z.getAttributeNode(b),from:z})}catch{en(t.removed,{attribute:null,from:z})}if(z.removeAttribute(b),b==="is")if(L||S)try{v(z)}catch{}else try{z.setAttribute(b,"")}catch{}},Q=function(b){let z=null,ee=null;if(A)b="<remove></remove>"+b;else{let ie=Ms(b,/^[\r\n\t ]+/);ee=ie&&ie[0]}Re==="application/xhtml+xml"&&ct===st&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let Ne=U?U.createHTML(b):b;if(ct===st)try{z=new h().parseFromString(Ne,Re)}catch{}if(!z||!z.documentElement){z=x.createDocument(ct,"template",null);try{z.documentElement.innerHTML=Oe?O:Ne}catch{}}let Ze=z.body||z.documentElement;return b&&ee&&Ze.insertBefore(r.createTextNode(ee),Ze.childNodes[0]||null),ct===st?pe.call(z,C?"html":"body")[0]:C?z.documentElement:Ze},me=function(b){return N.call(b.ownerDocument||b,b,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},ye=function(b){return b instanceof m&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof f)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},ce=function(b){return typeof i=="function"&&b instanceof i};function de(ue,b,z){Un(ue,ee=>{ee.call(t,b,z,Ye)})}let Le=function(b){let z=null;if(de(se.beforeSanitizeElements,b,null),ye(b))return v(b),!0;let ee=Ae(b.nodeName);if(de(se.uponSanitizeElement,b,{tagName:ee,allowedTags:fe}),Ke&&b.hasChildNodes()&&!ce(b.firstElementChild)&&wt(/<[/\w!]/g,b.innerHTML)&&wt(/<[/\w!]/g,b.textContent)||b.nodeType===sn.progressingInstruction||Ke&&b.nodeType===sn.comment&&wt(/<[/\w]/g,b.data))return v(b),!0;if(!(P.tagCheck instanceof Function&&P.tagCheck(ee))&&(!fe[ee]||Ee[ee])){if(!Ee[ee]&&ft(ee)&&(V.tagNameCheck instanceof RegExp&&wt(V.tagNameCheck,ee)||V.tagNameCheck instanceof Function&&V.tagNameCheck(ee)))return!1;if(Ce&&!ze[ee]){let Ne=X(b)||b.parentNode,Ze=H(b)||b.childNodes;if(Ze&&Ne){let ie=Ze.length;for(let _=ie-1;_>=0;--_){let d=T(Ze[_],!0);d.__removalCount=(b.__removalCount||0)+1,Ne.insertBefore(d,$(b))}}}return v(b),!0}return b instanceof c&&!p(b)||(ee==="noscript"||ee==="noembed"||ee==="noframes")&&wt(/<\/no(script|embed|frames)/i,b.innerHTML)?(v(b),!0):(De&&b.nodeType===sn.text&&(z=b.textContent,Un([be,Me,tt],Ne=>{z=tn(z,Ne," ")}),b.textContent!==z&&(en(t.removed,{element:b.cloneNode()}),b.textContent=z)),de(se.afterSanitizeElements,b,null),!1)},it=function(b,z,ee){if(K&&(z==="id"||z==="name")&&(ee in r||ee in Se))return!1;if(!(Fe&&!M[z]&&wt(Je,z))){if(!(ae&&wt(Ie,z))){if(!(P.attributeCheck instanceof Function&&P.attributeCheck(z,b))){if(!j[z]||M[z]){if(!(ft(b)&&(V.tagNameCheck instanceof RegExp&&wt(V.tagNameCheck,b)||V.tagNameCheck instanceof Function&&V.tagNameCheck(b))&&(V.attributeNameCheck instanceof RegExp&&wt(V.attributeNameCheck,z)||V.attributeNameCheck instanceof Function&&V.attributeNameCheck(z,b))||z==="is"&&V.allowCustomizedBuiltInElements&&(V.tagNameCheck instanceof RegExp&&wt(V.tagNameCheck,ee)||V.tagNameCheck instanceof Function&&V.tagNameCheck(ee))))return!1}else if(!yt[z]){if(!wt(ke,tn(ee,we,""))){if(!((z==="src"||z==="xlink:href"||z==="href")&&b!=="script"&&fd(ee,"data:")===0&&ut[b])){if(!(Te&&!wt(Xe,tn(ee,we,"")))){if(ee)return!1}}}}}}}return!0},ft=function(b){return b!=="annotation-xml"&&Ms(b,ge)},St=function(b){de(se.beforeSanitizeAttributes,b,null);let{attributes:z}=b;if(!z||ye(b))return;let ee={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:j,forceKeepAttr:void 0},Ne=z.length;for(;Ne--;){let Ze=z[Ne],{name:ie,namespaceURI:_,value:d}=Ze,w=Ae(ie),y=d,D=ie==="value"?y:_d(y);if(ee.attrName=w,ee.attrValue=D,ee.keepAttr=!0,ee.forceKeepAttr=void 0,de(se.uponSanitizeAttribute,b,ee),D=ee.attrValue,re&&(w==="id"||w==="name")&&(R(ie,b),D=le+D),Ke&&wt(/((--!?|])>)|<\/(style|title|textarea)/i,D)){R(ie,b);continue}if(w==="attributename"&&Ms(D,"href")){R(ie,b);continue}if(ee.forceKeepAttr)continue;if(!ee.keepAttr){R(ie,b);continue}if(!Be&&wt(/\/>/i,D)){R(ie,b);continue}De&&Un([be,Me,tt],xe=>{D=tn(D,xe," ")});let J=Ae(b.nodeName);if(!it(J,w,D)){R(ie,b);continue}if(U&&typeof E=="object"&&typeof E.getAttributeType=="function"&&!_)switch(E.getAttributeType(J,w)){case"TrustedHTML":{D=U.createHTML(D);break}case"TrustedScriptURL":{D=U.createScriptURL(D);break}}if(D!==y)try{_?b.setAttributeNS(_,ie,D):b.setAttribute(ie,D),ye(b)?v(b):Wa(t.removed)}catch{R(ie,b)}}de(se.afterSanitizeAttributes,b,null)},vt=function ue(b){let z=null,ee=me(b);for(de(se.beforeSanitizeShadowDOM,b,null);z=ee.nextNode();)de(se.uponSanitizeShadowNode,z,null),Le(z),St(z),z.content instanceof o&&ue(z.content);de(se.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(ue){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},z=null,ee=null,Ne=null,Ze=null;if(Oe=!ue,Oe&&(ue="<!-->"),typeof ue!="string"&&!ce(ue))if(typeof ue.toString=="function"){if(ue=ue.toString(),typeof ue!="string")throw rn("dirty is not a string, aborting")}else throw rn("toString is not a function");if(!t.isSupported)return ue;if(ne||ht(b),t.removed=[],typeof ue=="string"&&(je=!1),je){if(ue.nodeName){let d=Ae(ue.nodeName);if(!fe[d]||Ee[d])throw rn("root node is forbidden and cannot be sanitized in-place")}}else if(ue instanceof i)z=Q("<!---->"),ee=z.ownerDocument.importNode(ue,!0),ee.nodeType===sn.element&&ee.nodeName==="BODY"||ee.nodeName==="HTML"?z=ee:z.appendChild(ee);else{if(!L&&!De&&!C&&ue.indexOf("<")===-1)return U&&Y?U.createHTML(ue):ue;if(z=Q(ue),!z)return L?null:Y?O:""}z&&A&&v(z.firstChild);let ie=me(je?ue:z);for(;Ne=ie.nextNode();)Le(Ne),St(Ne),Ne.content instanceof o&&vt(Ne.content);if(je)return ue;if(L){if(S)for(Ze=I.call(z.ownerDocument);z.firstChild;)Ze.appendChild(z.firstChild);else Ze=z;return(j.shadowroot||j.shadowrootmode)&&(Ze=ve.call(n,Ze,!0)),Ze}let _=C?z.outerHTML:z.innerHTML;return C&&fe["!doctype"]&&z.ownerDocument&&z.ownerDocument.doctype&&z.ownerDocument.doctype.name&&wt(ei,z.ownerDocument.doctype.name)&&(_="<!DOCTYPE "+z.ownerDocument.doctype.name+`>
`+_),De&&Un([be,Me,tt],d=>{_=tn(_,d," ")}),U&&Y?U.createHTML(_):_},t.setConfig=function(){let ue=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ht(ue),ne=!0},t.clearConfig=function(){Ye=null,ne=!1},t.isValidAttribute=function(ue,b,z){Ye||ht({});let ee=Ae(ue),Ne=Ae(b);return it(ee,Ne,z)},t.addHook=function(ue,b){typeof b=="function"&&en(se[ue],b)},t.removeHook=function(ue,b){if(b!==void 0){let z=ud(se[ue],b);return z===-1?void 0:pd(se[ue],z,1)[0]}return Wa(se[ue])},t.removeHooks=function(ue){se[ue]=[]},t.removeAllHooks=function(){se=Xa()},t}var ri=ti();var ni={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},si=e=>(...t)=>({_$litDirective$:e,values:t}),Hn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var on=class extends Hn{constructor(t){if(super(t),this.it=dt,t.type!==ni.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===dt||t==null)return this._t=void 0,this.it=t;if(t===wr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};on.directiveName="unsafeHTML",on.resultType=1;var oi=si(on);function Gs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Tr=Gs();function pi(e){Tr=e}var dn={exec:()=>null};function He(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(xt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Cd=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),xt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Rd=/^(?:[ \t]*(?:\n|$))+/,Id=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ld=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,un=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Dd=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ys=/(?:[*+-]|\d{1,9}[.)])/,fi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_i=He(fi).replace(/bull/g,Ys).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Od=He(fi).replace(/bull/g,Ys).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Vs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Md=/^[^\n]+/,Ks=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Pd=He(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ks).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Nd=He(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ys).getRegex(),Zn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Zs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Fd=He("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Zs).replace("tag",Zn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),mi=He(Vs).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zn).getRegex(),qd=He(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",mi).getRegex(),Xs={blockquote:qd,code:Id,def:Pd,fences:Ld,heading:Dd,hr:un,html:Fd,lheading:_i,list:Nd,newline:Rd,paragraph:mi,table:dn,text:Md},ai=He("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zn).getRegex(),Bd={...Xs,lheading:Od,table:ai,paragraph:He(Vs).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ai).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zn).getRegex()},Ud={...Xs,html:He(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Zs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:dn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:He(Vs).replace("hr",un).replace("heading",` *#{1,6} *[^
]`).replace("lheading",_i).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},jd=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,zd=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,gi=/^( {2,}|\\)\n(?!\s*$)/,Hd=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Xn=/[\p{P}\p{S}]/u,Qs=/[\s\p{P}\p{S}]/u,hi=/[^\s\p{P}\p{S}]/u,Wd=He(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Qs).getRegex(),bi=/(?!~)[\p{P}\p{S}]/u,Gd=/(?!~)[\s\p{P}\p{S}]/u,Yd=/(?:[^\s\p{P}\p{S}]|~)/u,Vd=He(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Cd?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),yi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Kd=He(yi,"u").replace(/punct/g,Xn).getRegex(),Zd=He(yi,"u").replace(/punct/g,bi).getRegex(),vi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Xd=He(vi,"gu").replace(/notPunctSpace/g,hi).replace(/punctSpace/g,Qs).replace(/punct/g,Xn).getRegex(),Qd=He(vi,"gu").replace(/notPunctSpace/g,Yd).replace(/punctSpace/g,Gd).replace(/punct/g,bi).getRegex(),Jd=He("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,hi).replace(/punctSpace/g,Qs).replace(/punct/g,Xn).getRegex(),eu=He(/\\(punct)/,"gu").replace(/punct/g,Xn).getRegex(),tu=He(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ru=He(Zs).replace("(?:-->|$)","-->").getRegex(),nu=He("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ru).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Yn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,su=He(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Yn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),wi=He(/^!?\[(label)\]\[(ref)\]/).replace("label",Yn).replace("ref",Ks).getRegex(),ki=He(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ks).getRegex(),ou=He("reflink|nolink(?!\\()","g").replace("reflink",wi).replace("nolink",ki).getRegex(),ii=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Js={_backpedal:dn,anyPunctuation:eu,autolink:tu,blockSkip:Vd,br:gi,code:zd,del:dn,emStrongLDelim:Kd,emStrongRDelimAst:Xd,emStrongRDelimUnd:Jd,escape:jd,link:su,nolink:ki,punctuation:Wd,reflink:wi,reflinkSearch:ou,tag:nu,text:Hd,url:dn},au={...Js,link:He(/^!?\[(label)\]\((.*?)\)/).replace("label",Yn).getRegex(),reflink:He(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Yn).getRegex()},zs={...Js,emStrongRDelimAst:Qd,emStrongLDelim:Zd,url:He(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ii).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:He(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ii).getRegex()},iu={...zs,br:He(gi).replace("{2,}","*").getRegex(),text:He(zs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Wn={normal:Xs,gfm:Bd,pedantic:Ud},an={normal:Js,gfm:zs,breaks:iu,pedantic:au},lu={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},li=e=>lu[e];function er(e,t){if(t){if(xt.escapeTest.test(e))return e.replace(xt.escapeReplace,li)}else if(xt.escapeTestNoEncode.test(e))return e.replace(xt.escapeReplaceNoEncode,li);return e}function ci(e){try{e=encodeURI(e).replace(xt.percentDecode,"%")}catch{return null}return e}function di(e,t){let r=e.replace(xt.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(xt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(xt.slashPipe,"|");return n}function ln(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function cu(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function ui(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,c}function du(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Vn=class{constructor(e){Qe(this,"options");Qe(this,"rules");Qe(this,"lexer");this.options=e||Tr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:ln(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=du(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=ln(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ln(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=ln(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))i.push(r[c]),a=!0;else if(!a)i.push(r[c]);else break;r=r.slice(c);let u=i.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=m,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let E=h,k=E.raw+`
`+r.join(`
`),T=this.blockquote(k);o[o.length-1]=T,n=n.substring(0,n.length-E.raw.length)+T.raw,s=s.substring(0,s.length-E.text.length)+T.text;break}else if(h?.type==="list"){let E=h,k=E.raw+`
`+r.join(`
`),T=this.list(k);o[o.length-1]=T,n=n.substring(0,n.length-h.raw.length)+T.raw,s=s.substring(0,s.length-E.raw.length)+T.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),h=e.split(`
`,1)[0],E=!m.trim(),k=0;if(this.options.pedantic?(k=2,f=m.trimStart()):E?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,f=m.slice(k),k+=t[1].length),E&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),c=!0),!c){let T=this.rules.other.nextBulletRegex(k),B=this.rules.other.hrRegex(k),$=this.rules.other.fencesBeginRegex(k),H=this.rules.other.headingBeginRegex(k),X=this.rules.other.htmlBeginRegex(k);for(;e;){let U=e.split(`
`,1)[0],O;if(h=U,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),O=h):O=h.replace(this.rules.other.tabCharGlobal,"    "),$.test(h)||H.test(h)||X.test(h)||T.test(h)||B.test(h))break;if(O.search(this.rules.other.nonSpaceChar)>=k||!h.trim())f+=`
`+O.slice(k);else{if(E||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||$.test(m)||H.test(m)||B.test(m))break;f+=`
`+h}!E&&!h.trim()&&(E=!0),u+=U+`
`,e=e.substring(U.length+1),m=O.slice(k)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=f.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!s.loose){let u=c.tokens.filter(m=>m.type==="space"),f=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=f}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=di(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(di(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=ln(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=cu(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),ui(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return ui(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let f=[...n[0]][0].length,m=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let E=m.slice(1,-1);return{type:"em",raw:m,text:E,tokens:this.lexer.inlineTokens(E)}}let h=m.slice(2,-2);return{type:"strong",raw:m,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Bt=class Hs{constructor(t){Qe(this,"tokens");Qe(this,"options");Qe(this,"state");Qe(this,"inlineQueue");Qe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Tr,this.options.tokenizer=this.options.tokenizer||new Vn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:xt,block:Wn.normal,inline:an.normal};this.options.pedantic?(r.block=Wn.pedantic,r.inline=an.pedantic):this.options.gfm&&(r.block=Wn.gfm,this.options.breaks?r.inline=an.breaks:r.inline=an.gfm),this.tokenizer.rules=r}static get rules(){return{block:Wn,inline:an}}static lex(t,r){return new Hs(r).lex(t)}static lexInline(t,r){return new Hs(r).inlineTokens(t)}lex(t){t=t.replace(xt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(xt.tabCharGlobal,"    ").replace(xt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=r.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,i)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,m=t.slice(1),h;this.options.extensions.startInline.forEach(E=>{h=E.call({lexer:this},m),typeof h=="number"&&h>=0&&(f=Math.min(f,h))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Kn=class{constructor(e){Qe(this,"options");Qe(this,"parser");this.options=e||Tr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(xt.notSpaceStart)?.[0],s=e.replace(xt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+er(n)+'">'+(r?s:er(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:er(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${er(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=ci(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+er(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=ci(e);if(s===null)return er(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${er(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:er(e.text)}},eo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Ut=class Ws{constructor(t){Qe(this,"options");Qe(this,"renderer");Qe(this,"textRenderer");this.options=t||Tr,this.options.renderer=this.options.renderer||new Kn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new eo}static parse(t,r){return new Ws(r).parse(t)}static parseInline(t,r){return new Ws(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Gn,cn=(Gn=class{constructor(e){Qe(this,"options");Qe(this,"block");this.options=e||Tr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Bt.lex:Bt.lexInline}provideParser(){return this.block?Ut.parse:Ut.parseInline}},Qe(Gn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Qe(Gn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Gn),uu=class{constructor(...e){Qe(this,"defaults",Gs());Qe(this,"options",this.setOptions);Qe(this,"parse",this.parseMarkdown(!0));Qe(this,"parseInline",this.parseMarkdown(!1));Qe(this,"Parser",Ut);Qe(this,"Renderer",Kn);Qe(this,"TextRenderer",eo);Qe(this,"Lexer",Bt);Qe(this,"Tokenizer",Vn);Qe(this,"Hooks",cn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Kn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Vn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new cn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],c=s[a];cn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&cn.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await i.call(s,u);return c.call(s,m)})();let f=i.call(s,u);return c.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await i.apply(s,u);return m===!1&&(m=await c.apply(s,u)),m})();let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Bt.lex(e,t??this.defaults)}parser(e,t){return Ut.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Bt.lex:Bt.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Ut.parse:Ut.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Bt.lex:Bt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?Ut.parse:Ut.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+er(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ar=new uu;function Ve(e,t){return Ar.parse(e,t)}Ve.options=Ve.setOptions=function(e){return Ar.setOptions(e),Ve.defaults=Ar.defaults,pi(Ve.defaults),Ve};Ve.getDefaults=Gs;Ve.defaults=Tr;Ve.use=function(...e){return Ar.use(...e),Ve.defaults=Ar.defaults,pi(Ve.defaults),Ve};Ve.walkTokens=function(e,t){return Ar.walkTokens(e,t)};Ve.parseInline=Ar.parseInline;Ve.Parser=Ut;Ve.parser=Ut.parse;Ve.Renderer=Kn;Ve.TextRenderer=eo;Ve.Lexer=Bt;Ve.lexer=Bt.lex;Ve.Tokenizer=Vn;Ve.Hooks=cn;Ve.parse=Ve;var Y_=Ve.options,V_=Ve.setOptions,K_=Ve.use,Z_=Ve.walkTokens,X_=Ve.parseInline;var Q_=Ut.parse,J_=Bt.lex;function pr(e){let t=Ve.parse(e),r=ri.sanitize(t);return oi(r)}function tr(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function qr(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Qn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var pu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},fu=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,_u=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function fr(e){return!!e&&typeof e=="object"}function to(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function $i(e,t){let r=to(e),n=to(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function mu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>fr(s)&&typeof s.text=="string"?s.text:"").join(""):fr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function gu(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:pu[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=to(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=$i(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let c=$i(fr(i)?i.old_string:"",fr(i)?i.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function xi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Si(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=fu.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:_u.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function hu(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(fr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Si(o.text));else if(o.type==="thinking"){let a=xi(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=gu(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(fr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=mu(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function bu(e){if(e.type==="item.completed"&&fr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Si(t.text)];if(t.type==="reasoning"){let r=xi(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function yu(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Ai(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!fr(o))continue;let a=yu(o)?bu(o):hu(o,r);for(let i of a)t.push(i)}return t}var vu=5,wu=10,ku=/Task\s+#(\d+)/,$u=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,xu=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Jn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Su(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Au(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Tu(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=ku.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Eu(e){if(e.tool==="Bash"){let t=e.command||"";return $u.test(t)?"~ PR/\uAC8C\uC2DC \uC911":xu.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Cu(e){let t=e.filter(s=>s.kind==="tool").slice(-wu),r=new Map;t.forEach((s,o)=>{let a=Eu(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Ru(e){let t=Au(e);if(t)return{text:t,guess:!1};let r=Tu(e);if(r)return{text:r,guess:!1};let n=Cu(e);return n?{text:n,guess:!0}:null}function Iu(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Ct(e,t)}function es(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},i=!0,c=new Set,u=new Set,f=null,m=null,h=!1,E=!1,k=!1,T=null,B=null;function $(){h=!1,E=!1,k=!1,T=null,B=null}async function H(M){if(r){E=!0,k=!1,we();try{let P=await Promise.resolve(r("get-attempt-prompt",{attempt_id:M}));if(o!==M)return;!P||typeof P!="object"||Array.isArray(P)?k=!0:(T=P,B=M)}catch{o===M&&(k=!0)}finally{o===M&&(E=!1,we())}}}function X(){if(h=!h,h&&o&&B!==o){H(o);return}we()}function U(){if(!h)return"";let M=qr({loading:E,error:k});if(M)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${M}
      </div>`;if(!T)return"";if(T.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let P=Qn(T.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${P?l`<div class="prompt-block__meta">${P} 발송</div>`:""}
      ${typeof T.task_prompt=="string"?tr("\uACFC\uC5C5 (user)",T.task_prompt):""}
      ${typeof T.system_prompt=="string"?tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",T.system_prompt):""}
    </div>`}function O(){if(!o||!n)return[];let M=n.get(o);return Ai(M?M.lines:[])}function x(){if(!o||!n)return null;let M=n.get(o),P=M?M.last_event_at:null;return typeof P=="number"?P:null}function N(){return a.status==="running"}function I(){if(N()&&o){m||(m=setInterval(()=>we(),1e3));return}pe()}function pe(){m&&(clearInterval(m),m=null)}function ve(M){let P=[],ae=0;for(;ae<M.length;){let Fe=M[ae];if(Fe.kind==="tool"){let Te=ae;for(;Te<M.length&&M[Te].kind==="tool"&&M[Te].tool===Fe.tool;)Te+=1;if(Te-ae>=vu&&!u.has(ae)){P.push({kind:"group",idx:ae,tool:Fe.tool||"",lines:M.slice(ae,Te).map((Be,De)=>({idx:ae+De,line:Be}))}),ae=Te;continue}}P.push({kind:"line",idx:ae,line:Fe}),ae+=1}return P}function se(M){for(let P=M.length-1;P>=0;P-=1){let ae=M[P];if(ae.kind==="result"||ae.kind==="error")return null;if(ae.kind==="tool"&&!Object.hasOwn(ae,"result"))return ae}return null}function be(M){for(let P=M.length-1;P>=0;P-=1)if(M[P].kind==="thinking")return M[P];return null}function Me(M,P){if(P.kind==="gate")return l`<div class="sv__gate">${P.text}</div>`;if(P.kind==="phase")return l`<div class="sv__phase">${P.text}</div>`;if(P.kind==="result")return l`<div
        class="sv__result${P.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${P.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${pr(P.text||(P.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(P.kind==="thinking"){let ae=c.has(M);return l`<div
        class="sv__think${ae?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ke(M)}
      >
        <span class="sv__think-line">💭 ${Jn(P.text)}</span>
        ${ae?l`<pre class="sv__think-expand">${P.text}</pre>`:""}
      </div>`}if(P.kind==="error")return l`<div class="sv__error">⛔ ${P.text}</div>`;if(P.kind==="blocker")return l`<div class="sv__error">⛔ ${P.text}</div>`;if(P.kind==="tool"){let ae=c.has(M),Fe=P.tool==="Bash"?Su(P.command):0,Te=P.tool==="Bash"?Fe>1?Jn(P.command):P.command:P.path||P.command||"";return l`<div
        class="sv__tool${ae?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ke(M)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${P.icon}</span>
          <span class="sv__tool-name">${P.tool}</span>
          ${Te?l`<span class="sv__tool-detail">${Te}</span>`:""}
          ${Fe>1?l`<span class="sv__tool-more">⋯ ${Fe}줄</span>`:""}
          ${typeof P.added=="number"?l`<span class="sv__diff-add">+${P.added}</span>`:""}
          ${typeof P.removed=="number"?l`<span class="sv__diff-del">−${P.removed}</span>`:""}
          ${P.result?l`<span class="sv__tool-ok">→ ${P.result}</span>`:""}
        </span>
        ${ae?l`<pre class="sv__tool-expand">${tt(P)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${pr(P.text||"")}</div>`}function tt(M){let P=[];if(M.tool==="Bash"&&typeof M.command=="string"&&M.command.length>0)P.push(M.command);else if(M.input!==void 0)try{P.push(`input: ${JSON.stringify(M.input,null,2)}`)}catch{}return typeof M.output=="string"&&M.output.length>0&&P.push(`output:
${M.output}`),P.join(`

`)}function Je(){if(!o)return l``;let M=O(),P=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ae=a.session_id||"",Fe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${i?"ON":"OFF"}`,Te=N(),Be=Te?Iu(x(),Date.now()):"",De=Te?se(M):null,Ke=Te?be(M):null,C=Ru(M);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${C?l`<span
              class="sv__stage${C.guess?" sv__stage--guess":""}"
              title=${C.text}
              >${C.text}</span
            >`:""}
        ${Te?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Be?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Be}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Be?l`<span class="sv__live-ago">${Be}</span>`:""}</span
            >`:""}
        ${ae?l`<button
              type="button"
              class="sv__session"
              title=${ae}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ae}`}
              @click=${()=>W(ae)}
            >
              ⧉ ${ae.slice(0,8)}
            </button>`:""}
        ${P?l`<span class="sv__meta">${P}</span>`:""}
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
          @click=${X}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${i?" sv__follow--on":""}"
          aria-pressed=${i?"true":"false"}
          aria-label=${Fe}
          @click=${fe}
        >
          <span class="sv__follow-full">⇣ ${Fe}</span>
          <span class="sv__follow-short">⇣ ${i?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Ee()}
        >
          ✕
        </button>
      </div>
      ${U()}
      <div class="sv__body">
        ${M.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:ve(M).map(ne=>ne.kind==="group"?Ie(ne):Me(ne.idx,ne.line))}
      </div>
      ${De||Ke?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${De?l`<span class="sv__now-icon">${De.icon}</span>
                  <span class="sv__now-name">${De.tool}</span>
                  <span class="sv__now-detail"
                    >${De.tool==="Bash"?Jn(De.command):De.path||De.command||""}</span
                  >`:""}
            ${Ke?l`<span class="sv__now-think"
                  >💭 ${Jn(Ke.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ie(M){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Xe(M.idx)}
    >
      <span class="sv__group-icon">${M.lines[0].line.icon}</span>
      <span class="sv__group-name">${M.tool}</span>
      <span class="sv__group-count">${M.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Xe(M){u.add(M),we()}function we(){Ue(Je(),e),I(),i&&ge()}function ge(){let M=e.querySelector(".sv__body");M&&(M.scrollTop=M.scrollHeight)}function ke(M){c.has(M)?c.delete(M):c.add(M),we()}function fe(){i=!i,we()}function W(M){Sr(M).then(P=>{P?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function j(M){!o||!M||(a={...a,...M},we())}function he(M){let P=M.target;if(!P||!P.classList||!P.classList.contains("sv__body"))return;!(P.scrollHeight-P.scrollTop-P.clientHeight<=4)&&i&&(i=!1,we())}e.addEventListener("scroll",he,!0);function V(M){let P=M&&M.attempt_id;P&&(o=P,a=M.meta||{},i=!0,c.clear(),u.clear(),$(),!f&&n&&(f=n.subscribe(we)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),we())}function Ee(){let M=o;o=null,c.clear(),u.clear(),$(),pe(),r&&M&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${M}`})).catch(()=>{}),Ue(l``,e),s&&s()}return{open:V,updateMeta:j,close:Ee,isOpen(){return o!==null},destroy(){pe(),f&&(f(),f=null),e.removeEventListener("scroll",he,!0),o=null,Ue(l``,e)}}}function pn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Ti(t.spec_id),s=Ti(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ti(e){return typeof e=="string"?e.trim():""}function Lu(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Du(e){let t=e&&e.metadata||{},r=pn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Lu(t)?null:"plan_pending"}),n}function Ei(e,t){let r=Du(e);return l`
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
  `}var Ou="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Mu=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Pu=/^\*\*결론\*\* — (.+)$/;function ts(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Ou)return null;let r=Mu.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Pu.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Ci=20;function Ri(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Nu(e){return e.length>Ci?`${e.slice(0,Ci)}\u2026`:e}function Fu(e,t,r,n){let s=`${t.lane} ${Nu(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Ri(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${pr(t.body)}
        </div>`:""}
  </div>`}function qu(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Ri(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${pr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ii(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=ts(typeof c.text=="string"?c.text:"");return u?Fu(c,u,t,s.has(c.id)):qu(c)})}
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
  `}var Bu=["codex","opus","fable","self","skip"],Uu=["codex","fable","skip"],ju=["low","medium","high","xhigh"],zu=["standard","fast_track"],Er=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],no=["impl_runtime","orchestration_model"],fn=[{id:"worker-detail",label:"\uC6CC\uCEE4 \uC0C1\uC138",keys:["orchestration_effort","orchestration_speed"]},{id:"implementation-detail",label:"\uAD6C\uD604 \uC0C1\uC138",keys:["impl_model","impl_effort"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]}],so={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},Li={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},Hu=["self","skip"],Wu="opus",oo={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function ao(e){let t=so[e]||{title:e};return l`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?l`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function Gu(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:oo[e]||"(\uAE30\uBCF8)"}function Br(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Cr(e){if(!Br(e)||!Br(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Br(r)&&Br(r.models));return t.length>0?t:null}function ro(e){return{value:e,label:e}}function io(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Di(e,t,r=null){let n=Cr(e);if(!n)return t?[{label:null,options:[ro(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,i])=>({label:a,options:Object.keys(i.models).map(ro)})),o=s.some(a=>a.options.some(i=>i.value===t));return t&&!o?[io(t),...s]:s}function _r(e,t){let r={label:null,options:e.map(ro)};return t&&!e.includes(t)?[io(t),r]:[r]}function rr(e,t){let r=Cr(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function lo(e,t){return Br(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Yu(e,t){return Br(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():lo(e,t)}function Vu(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Yu(n,n.models[t]);return[]}function Ku(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function co(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return lo(n,n.models[t]);return[]}function Pi(e){let t=Cr(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of lo(n,s))r.includes(o)||r.push(o);return r}function Ni(e,t){if(!t)return Pi(e);let n=Cr(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of co(e,o))s.includes(a)||s.push(a);return s}function ns(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=rr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?co(t,n.impl_model):Ni(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Ur(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||Wu,a=r("impl_model"),i=r("impl_runtime"),c=i==="claude"||i==="codex"?i:i==="inherit"?s===void 0?rr(n,o):s:null;return Er.map(u=>{let f=t(u),m,h=!1;return u==="orchestration_model"?m=Di(n,f):u==="impl_runtime"?m=_r(["inherit","claude","codex"],f):u==="impl_model"?(m=c?Di(n,f,c):f?[io(f)]:[],h=i==="inherit"&&c===null):u==="orchestration_effort"?m=_r(Vu(n,o),f):u==="orchestration_speed"?m=Zu(Ku(n,o),f):u==="impl_effort"?(m=_r(a?co(n,a):c?Ni(n,c):Pi(n),f),h=i==="inherit"&&c===null):u==="plan_review_model"?m=_r(Uu,f):Object.hasOwn(Li,u)?(m=_r(ju,f),h=Hu.includes(r(Li[u]))):m=_r(Bu,f),{key:u,groups:m,selected:f,disabled:h,runner:u==="orchestration_model"?rr(n,o):null}})}function rs(e,t,r){return l`
    ${typeof r=="string"?l`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Oi(s,t)):l`<optgroup label=${n.label}>
            ${n.options.map(s=>Oi(s,t))}
          </optgroup>`)}
  `}function Zu(e,t){return _r(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function Oi(e,t){return l`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Mi(e,t,r,n,s,o,a){return l`
    <div class="detail-kv">
      <span class="detail-kv__k">${ao(e)}</span>
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
  `}function Xu(e,t,r,n){return e.some(s=>t(s))?"\uC774\uC288 \uD540":e.some(s=>r(s))?`\uD504\uB9AC\uC14B \u300C${n||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"}\u300D`:"\uAE30\uBCF8"}function Qu(e,t,r){let n=[t("orchestration_model")||"opus"],s=t("orchestration_effort"),o=t("orchestration_speed");s&&n.push(`effort ${s}`),o&&o!=="default"&&n.push(`speed ${o==="fast"?"Fast":o}`);let a=`${t("impl_runtime")||"inherit"} \xB7 ${t("impl_model")||"auto"}`,i=[["\uC2A4\uD399","spec_review_model","spec_review_effort"],["\uACC4\uD68D","plan_review_model","plan_review_effort"],["\uAD6C\uD604","impl_review_model","impl_review_effort"]].map(([u,f,m])=>{let h=t(f)||"codex",E=t(m);return`${u} ${h}${E?`/${E}`:""}`}),c=[{id:"worker",label:"\uC6CC\uCEE4",keys:Er.slice(0,3),value:n.join(" \xB7 ")},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_runtime","impl_model","impl_effort"],value:a},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"],value:i.join(" \xB7 ")}];return l`<section
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
              >${Xu(u.keys,e,t,r)}</span
            >
          </span>
        </div>`)}
  </section>`}function Fi(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},i=k=>typeof o[k]=="string"?o[k]:"",c=k=>{let T=i(k);return T||(typeof a[k]=="string"?a[k]:"")},u=Ur({selectedOf:i,effectiveOf:c,runner_catalog:n}),f=o.workflow_mode==="fast_track"?"fast_track":"standard",m=new Map(u.map(k=>[k.key,k])),h=fn.flatMap(k=>k.keys).filter(k=>i(k)).length,E=k=>{let T=m.get(k);return T?Mi(T.key,rs(T.groups,T.selected,Gu(T.key,a,s)),T.selected,!!T.selected,T.disabled,T.runner,t):""};return l`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${Qu(i,c,s)}
    <section class="exec-settings-core" data-exec-settings-core>
      ${Mi("workflow_mode",rs(_r(zu,f),f),f,o.workflow_mode==="fast_track",!1,null,t)}
      ${no.map(E)}
    </section>
    <details
      class="detail-exec-presets exec-settings-advanced"
      data-exec-settings-advanced
    >
      <summary>고급 설정 — ${h}개 변경됨</summary>
      ${fn.map(k=>l`<section
            class="exec-settings-advanced__group"
            data-exec-settings-group=${k.id}
          >
            <h4>${k.label}</h4>
            ${k.keys.map(E)}
          </section>`)}
    </details>
  `}function Ju(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function qi(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function c(k){k.key==="Escape"&&s&&(k.preventDefault(),h())}document.addEventListener("keydown",c);function u(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ju(s)}</span
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
    `:l``}function f(){Ue(u(),e)}async function m(k,T={}){s=k,o="loading",a="",i="",f();let B=r?r():"";if(!B){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let $="/api/doc?workspace="+encodeURIComponent(B)+"&path="+encodeURIComponent(k);try{let H=await n($),X=await H.json().catch(()=>({}));if(!H.ok||!X||X.ok!==!0){if(X?.error==="not_found"&&T.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(X&&X.error||H.status)+")",f();return}a=String(X.content||""),o="ready",f()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function h(){s=null,Ue(l``,e)}function E(){document.removeEventListener("keydown",c),h()}return{open:m,close:h,destroy:E}}var ep=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],ji="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function tp(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function rp(e){let t=gt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Nr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${ji}
          >부분 집계</span
        >`:""}`}function Bi(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ui(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?zi(t):""}function np(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=gt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
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
        ${Ui(s.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
              >${Ui(s.completed_at)}</span
            >`:""}
        ${a?l`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function sp(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...ep,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${n.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${tp(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${ji}</span>`:""}
  </div>`}var op={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function zi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function ap(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Hi(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let m=typeof u.session_id=="string"&&u.session_id.length>0,h=o.has(u.attempt_id),E=m&&!h,k=m?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!E}
      title=${k}
      @click=${T=>{T.stopPropagation(),E&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let m=u.cause_detail,h=m&&typeof m.reason=="string"&&m.reason.length>0?typeof m.command=="string"&&m.command.length>0?`${m.reason} \xB7 ${m.command}`:m.reason:u.cause;return l`<div class="detail-session__cause" title=${h}>
      ${u.cause}
    </div>`},c=u=>{let f=Bi(Ds(u));if(gt(f).length===0&&!Nr(u.usage))return"";let m=s.has(u.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${m?"true":"false"}
      title=${m?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${rp(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=Ds(u),m=Bi(f),h=gt(m);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${op[u.status||""]||"\xB7"}</span
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
            ${h.length>0?h.map(E=>l`<span
                      class="detail-session__usage"
                      title=${E.tooltip}
                      >${E.label}</span
                    >`):Nr(u.usage)?l`<span class="detail-session__usage"
                    >${Nr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${zi(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${i(u)} ${ap(u)}
          ${s.has(u.attempt_id)&&u.usage?sp(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${np(f)}
        </div>`})}
    </div>
  `}function Wi(e,t={}){return l`
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
          ${ip(e)}
        </div>`:""}
  `}function ip(e){let t=qr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?tr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Qn(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?tr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var lp=["open","in_progress","deferred","resolved","closed"],cp=[0,1,2,3,4];function Gi(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,f=null,m={},h="",E=!1,k=!1,T=!1,B="",$="",H="";function X(){k=!1,T=!1,B="",$="",H=""}let U=[],O=null,x=null,N=!1,I="",pe=!1,ve=0,se=new Set;function be(){U=[],O=null,x=null,N=!1,I="",pe=!1,ve+=1,se.clear()}async function Me(d){if(!s)return;let w=++ve;try{let y=await Promise.resolve(s("get-comments",{id:d}));if(w!==ve||d!==u)return;U=Array.isArray(y)?y:[],N=!1}catch{if(w!==ve||d!==u)return;N=!0}_()}function tt(){if(!s||!u)return;let d=f&&typeof f.comment_count=="number"?f.comment_count:null;if(O!==u){O=u,x=d,Me(u);return}d!==null&&d!==x&&(x=d,Me(u))}function Je(d){se.has(d)?se.delete(d):se.add(d),_()}function Ie(d){let w=I.trim().length===0;I=d,w!==(d.trim().length===0)&&_()}async function Xe(){let d=I.trim();if(!s||!u||d.length===0||pe)return;let w=u;pe=!0,_();let y=!1;try{let D=await Promise.resolve(s("add-comment",{id:w,text:d}));Array.isArray(D)&&D.length>0&&(y=!0,w===u&&(U=D,N=!1,I="",x=D.length))}catch{y=!1}y||Z("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),w===u&&(pe=!1),_()}let we={onToggle:Je,onDraftInput:Ie,onSubmit:Xe},ge=document.createElement("div");ge.className="md-viewer-root",document.body.appendChild(ge);let ke=qi(ge,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),fe=document.createElement("div");fe.className="session-log-root",document.body.appendChild(fe);let W=es(fe,{transport:s?(d,w)=>Promise.resolve(s(d,w)):void 0,sessionLogStore:c}),j=!1,he=!1,V=!1,Ee=null,M=null,P=0;function ae(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function Fe(){j=!1,he=!1,V=!1,Ee=null,M=null,P+=1}async function Te(d){if(!s)return;let w=++P;he=!0,V=!1,_();try{let y=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if(w!==P)return;!y||typeof y!="object"||Array.isArray(y)?V=!0:(Ee=y,M=ae(d))}catch{w===P&&(V=!0)}finally{w===P&&(he=!1,_())}}function Be(){if(j=!j,j&&u&&M!==ae(u)){Ee=null,Te(u);return}_()}function De(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(y=>y&&y.bead_id===u).sort((y,D)=>(D.started_at||0)-(y.started_at||0)).map(y=>({attempt_id:y.attempt_id,bead_id:y.bead_id,status:y.status,started_at:typeof y.started_at=="number"?y.started_at:null,runner:y.runner||null,model:y.model||null,effort:y.effort||null,speed:y.speed||null,session_id:y.session_id||null,resumed_from:y.resumed_from||null,continuation_mode:y.continuation_mode||null,dismissed_at:typeof y.dismissed_at=="number"?y.dismissed_at:null,cause:typeof y.cause=="string"?y.cause:null,cause_detail:y.cause_detail||null,exec_default_preset_id:typeof y.exec_default_preset_id=="string"?y.exec_default_preset_id:null,exec_default_preset_revision:typeof y.exec_default_preset_revision=="number"?y.exec_default_preset_revision:null,exec_values:y.exec_values&&typeof y.exec_values=="object"?y.exec_values:null,usage:y.usage||null,usage_legs:Array.isArray(y.usage_legs)?y.usage_legs:[]}))}function Ke(){if(!a||!u)return null;let d=a.get();return Ot(d&&d.attempts||{},u)}let C=new Set;function ne(d){C.has(d)?C.delete(d):C.add(d),_()}function A(d){let w=a?a.get():null,y=w&&w.attempts?w.attempts[d]:null;W.open({attempt_id:d,meta:y?{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.status||void 0,session_id:y.session_id||void 0}:{}})}async function L(d){if(!s||!d)return;let w=()=>{let xe=a?a.get():null;return xe&&typeof xe.revision=="number"?xe.revision:0},y=async(xe={})=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:w(),...xe}),D=xe=>{xe?.queue&&a?.set&&a.set(xe.queue)},J=await y();if(D(J),J&&J.conflict){let xe=J.queue&&typeof J.queue.revision=="number"?J.queue.revision:w();J=await s("worker-attempt-resume",{attempt_id:d,expected_revision:xe}),D(J)}J=await Gt(J,(xe,mt)=>y({continuation:xe,decision_token:mt}),{onResult:D,refresh:()=>y()}),J&&J.resumed===!1&&!J.conflict&&J.reason&&Z(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${J.reason}`,"error",2400)}let S={onOpen:A,onResume:L,onToggleUsage:ne};function Y(){let d=a?a.get():null,w=d&&d.default_exec_preset_id,y=typeof w=="string"?Ce()?.presets.find(D=>D.id===w):null;return y&&y.compatible!==!1&&y.settings?y.settings:{}}function K(){let d=a?a.get():null,w=d&&d.default_exec_preset_id,y=typeof w=="string"?Ce()?.presets.find(D=>D.id===w):null;return y&&y.compatible!==!1&&typeof y.name=="string"?y.name:""}function re(){let d=a?a.get():null;return d&&d.runner_catalog||null}function le(){let d=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},y=(Object.hasOwn(m,"orchestration_model")?m.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof Y().orchestration_model=="string"?Y().orchestration_model:"")||"opus";return rr(re(),y)}function Ce(){let d=i?i.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function je(d){let w=d&&d.settings&&typeof d.settings=="object"?d.settings:{},y=D=>typeof w[D]=="string"?w[D]:D==="impl_runtime"&&typeof w.impl_model=="string"&&rr(re(),w.impl_model)||"";return Ur({selectedOf:y,effectiveOf:y,runner_catalog:re()}).some(D=>D.groups.some(J=>J.options.some(xe=>xe.value===D.selected&&xe.label.endsWith("(\uBE44\uD638\uD658)"))))}function rt(d){i&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&i.set({revision:d.revision,presets:d.presets})}async function ze(){let d=Ce(),w=d?.presets.find(y=>y.id===h);if(!(!s||!u||!d||!w||je(w)||E)){E=!0,_();try{let y=await Promise.resolve(s("apply-exec-preset",{id:u,preset_id:w.id,expected_revision:d.revision}));if(y&&y.conflict){rt(y),Z("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let D=y&&Array.isArray(y.issue)?y.issue[0]:y?.issue;if(y&&y.applied&&D&&typeof D=="object"){f=D;for(let J of Er)delete m[J];Z("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}y&&y.error==="bd_readback_failed"?Z("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):Z("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(y){y&&typeof y=="object"&&y.code==="bd_readback_failed"?Z("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):Z("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{E=!1,_()}}}function bt(){let d=Ce();if(d&&d.presets.length===0)return l`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let w=d?d.presets:[],y=w.find(J=>J.id===h),D=y?je(y):!1;return l`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${d===null||E}
          @change=${J=>{h=J.target.value,_()}}
        >
          <option value="" ?selected=${h===""}>
            ${d===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${w.map(J=>{let xe=je(J);return l`<option
              value=${J.id}
              ?selected=${J.id===h}
            >
              ${J.name}${xe?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${d===null||!y||D||E}
          @click=${()=>{ze()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let ut=null;r&&r.subscribe&&(ut=r.subscribe(()=>nt()));let lt=null;a&&typeof a.subscribe=="function"&&(lt=a.subscribe(()=>{u&&_()}));let yt=null;i&&typeof i.subscribe=="function"&&(yt=i.subscribe(()=>{u&&_()}));function It(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",It);function nt(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];f=d.find(y=>y&&y.id===u)||d[0]||f}tt(),_()}}function at(d){Sr(d).then(w=>{w?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function st(d){d.preventDefault(),d.stopPropagation(),u&&at(u)}function ct(d,w){d.preventDefault(),d.stopPropagation(),at(w)}function Oe(d,w,y){d.preventDefault(),d.stopPropagation(),ke.open(w,{missing_state:y})}function F(d,w){m[d]=w,_(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",{id:u,key:d,value:w})).catch(()=>{Z("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function G(d,w){let y=f||{},D=y.metadata&&typeof y.metadata=="object"?y.metadata:{},J={};for(let qe of["impl_runtime","impl_model","impl_effort"])J[qe]=Object.hasOwn(m,qe)?m[qe]:typeof D[qe]=="string"?D[qe]:"";J[d]=w;let xe=ns(J,re(),le()),mt={};for(let qe of["impl_runtime","impl_model","impl_effort"])mt[qe]=m[qe],m[qe]=xe[qe]||"";_(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...xe,orchestration_runtime:le()})).then(qe=>{let or=Array.isArray(qe)?qe[0]:qe;if(!or||typeof or!="object"||!or.id)throw new Error("implementation target readback failed");f=or;for(let ls of["impl_runtime","impl_model","impl_effort"])delete m[ls];_()}).catch(()=>{for(let qe of["impl_runtime","impl_model","impl_effort"])mt[qe]===void 0?delete m[qe]:m[qe]=mt[qe];_(),Z("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function oe(d,w,y){if(!s||!u)return!1;try{let D=await Promise.resolve(s(d,w)),J=Array.isArray(D)?D[0]:D;return J&&typeof J=="object"&&J.id?(f=J,!0):(Z(y,"error"),!1)}catch{return Z(y,"error"),!1}}function _e(d){setTimeout(()=>{try{let w=e.querySelector(d);w&&typeof w.focus=="function"&&w.focus()}catch{}},0)}function $e(){k=!0,B=f&&f.title||"",_(),_e('.detail-edit__input[data-edit="title"]')}function Re(d){B=d.target.value}function We(){k=!1,B="",_()}function et(){oe("edit-text",{id:u,field:"title",value:B},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(w=>{w&&(k=!1,B=""),_()})}function Ae(){T=!0,$=f&&f.description||"",_(),_e('.detail-edit__textarea[data-edit="description"]')}function Ye(d){$=d.target.value}function Se(){T=!1,$="",_()}function pt(){oe("edit-text",{id:u,field:"description",value:$},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(w=>{w&&(T=!1,$=""),_()})}function ht(d,w,y,D){if(d.key==="Escape"){d.stopPropagation(),y();return}d.key==="Enter"&&(!D||d.ctrlKey||d.metaKey)&&(d.preventDefault(),w())}function sr(d){let w=d.target.value;oe("update-status",{id:u,status:w},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>_())}function jt(d){let w=Number(d.target.value);oe("update-priority",{id:u,priority:w},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>_())}function p(d){H=d.target.value}function v(){let d=H.trim();d.length!==0&&oe("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(w=>{w&&(H=""),_()})}function R(d){if(d.key==="Escape"){d.stopPropagation(),H="",_();return}d.key==="Enter"&&(d.preventDefault(),v())}function Q(d){oe("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>_())}let me={onCopyPath:ct,onOpenDoc:Oe},ye={onChange:F,onImplTargetChange:G};function ce(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function de(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Le(d){let y=(Array.isArray(d.dependencies)?d.dependencies:[]).map(D=>({id:ce(D),icon:de(D)})).filter(D=>D.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${y.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${y.map(D=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(D.id)}
                  >
                    ${D.icon?`${D.icon} `:""}${D.id}
                  </button>`:l`<span class="detail-dep"
                    >${D.icon?`${D.icon} `:""}${D.id}</span
                  >`)}
          </div>`}
    `}function it(d){let w=d.metadata||{},y=d.workflow||{},D=y.stages||{},J=D.spec&&D.spec.stale,xe=D.impl&&D.impl.stale,mt=D.plan||null,qe=y.route_source==="derived",or=y.route||w.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${qe?" detail-kv__v--derived":""}"
          title=${qe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${qe?"unset":or}</span
        >
      </div>
      ${y.route!=="quick_fix"||Object.hasOwn(w,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${w.spec_review||"\uC5C6\uC74C"}${J?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${y.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${mt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${mt?.approval_receipt||"\uC5C6\uC74C"}${mt?.approval_state==="stale"?" \xB7 stale":mt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${y.route!=="quick_fix"||Object.hasOwn(w,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${w.impl_review||"\uC5C6\uC74C"}${xe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${w.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${w.pr_url}</span>
          </div>`:""}
    `}let ft={route:["quick_fix","spec_backed","full_plan"]};async function St(d,w){let y=w.target.value;if(d==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&y!=="full_plan"&&!window.confirm(`full_plan \u2192 ${y||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){_();return}await oe("update-workflow-meta",{id:u,key:d,value:y},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),_()}function vt(d){let w=d.metadata||{};return l` ${((D,J)=>{let xe=ft[D],mt=typeof w[D]=="string"?w[D]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${D}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${D}
          data-edit=${`wfmeta-${D}`}
          @change=${qe=>St(D,qe)}
        >
          <option value="" ?selected=${!xe.includes(mt)}>
            ${J}
          </option>
          ${xe.map(qe=>l`<option value=${qe} ?selected=${mt===qe}>${qe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function ue(d,w){return k?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${B}
            @input=${Re}
            @keydown=${y=>ht(y,et,We,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${et}
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
        ${gt(w).map(y=>l`<span class="detail-usage-total" title=${y.tooltip}
              >${y.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${$e}
        >
          ✎
        </button>
      </div>
    `}function b(d){let w=Tt(d.created_at),y=Tt(d.updated_at);return!w&&!y?l``:l`
      ${w?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${w}</span>
          </div>`:""}
      ${y?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${y}</span>
          </div>`:""}
    `}function z(d,w){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${sr}
        >
          ${lp.map(y=>l`<option value=${y} ?selected=${y===d}>${y}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${jt}
        >
          ${cp.map(y=>l`<option value=${String(y)} ?selected=${y===w}>
                P${y}
              </option>`)}
        </select>
      </div>
    `}function ee(d){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${T?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ae}
            >
              ✎
            </button>`}
      </div>
      ${T?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${$}
              @input=${Ye}
              @keydown=${w=>ht(w,pt,Se,!0)}
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
                @click=${Se}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${d||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Ne(d){let w=typeof d.notes=="string"?d.notes:"";return w.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${w}</div>
    `}function Ze(d){let w=Array.isArray(d.labels)?d.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${w.map(y=>l`<span class="detail-label-chip"
              >${y}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${y}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+y}
                @click=${()=>Q(y)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${H}
            @input=${p}
            @keydown=${R}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${v}
          >
            추가
          </button>
        </span>
      </div>
    `}function ie(){if(!u)return l``;let d=f||{},w=String(d.id||u),y=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",D=Ke(),J=d.status||"open",xe=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",mt=d.description||"",qe={...d,metadata:{...d.metadata||{},...m}};return l`
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
            @click=${st}
          >
            ${w}
          </button>
          ${ue(y,D)}
          ${z(J,xe)} ${b(d)}
          ${ee(mt)}
          ${Ii(U,we,{expanded:se,draft:I,sending:pe,error:N})}
          ${Ne(d)} ${Ze(d)} ${Le(d)}
          ${it(d)} ${vt(d)}
          ${Ei(d,me)}
          ${bt()}
          ${Fi(qe,ye,Y(),re(),K())}
          ${Wi({expanded:j,loading:he,error:V,data:Ee},{onToggle:Be})}
          ${Hi(De(),S,{total:D,expanded:C})}
        </div>
      </div>
    `}function _(){Ue(ie(),e)}return{load(d){d!==u&&(m={},h="",X(),be(),Fe()),u=d,f=null,nt()},clear(){u=null,f=null,m={},h="",E=!1,X(),be(),Fe(),ke.close(),W.close(),Ue(l``,e)},destroy(){ut&&(ut(),ut=null),lt&&(lt(),lt=null),yt&&(yt(),yt=null),document.removeEventListener("keydown",It),ke.destroy(),ge.parentNode&&ge.parentNode.removeChild(ge),W.destroy(),fe.parentNode&&fe.parentNode.removeChild(fe),u=null,f=null,h="",E=!1,be(),Fe(),Ue(l``,e)}}}var dp=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Yi(e,t){return Rs(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function up(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function Vi(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function i(x){let N=r.get();if(N)try{let I=await n("display-policy-set",{expected_revision:N.revision,policy:x(N)});c(I),I&&I.conflict&&I.policy&&(I=await n("display-policy-set",{expected_revision:I.policy.revision,policy:x(I.policy)}),c(I)),I&&I.conflict&&Z("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Z("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function c(x){x&&x.policy&&typeof x.policy=="object"&&r.set(x.policy)}function u(x){let N=r.get();if(!N)return;let I=Yi(x,N)!=="shown";i(pe=>up(x,pe,I))}function f(){let x=a.trim();x.length!==0&&(a="",i(N=>N.hidden_prefixes.includes(x)?{hidden_prefixes:N.hidden_prefixes}:{hidden_prefixes:[...N.hidden_prefixes,x]}),B())}function m(x){i(N=>({hidden_prefixes:N.hidden_prefixes.filter(I=>I!==x)}))}function h(x){let N=r.get();if(!N)return;let I=N.chips[x]===!1;i(()=>({chips:{[x]:I}}))}function E(x){let N=s();return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${N.length===0?l`<div class="display-settings__empty">라벨 없음</div>`:l`<div class="display-settings__pills">
              ${N.map(I=>{let pe=Yi(I,x);return l`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${pe}`}
                  data-label=${I}
                  data-state=${pe}
                  @click=${()=>u(I)}
                >
                  ${I}
                </button>`})}
            </div>`}
      </section>
    `}function k(x){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${x.hidden_prefixes.map(N=>l`<span class="display-settings__prefix">
                ${N}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${N} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>m(N)}
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
    `}function T(x){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${dp.map(([N,I])=>l`<label class="display-settings__toggle">
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
    `}function B(){let x=r.get();Ue(l`
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
            ${x?l`${E(x)} ${k(x)}
                ${T(x)}`:l`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let $=!1,H=()=>{$=!1};o.addEventListener("close",H),o.addEventListener("cancel",H);let X=null;r.subscribe&&(X=r.subscribe(()=>{$&&B()}));function U(){$||(a="",$=!0,B(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function O(){$&&($=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:U,close:O,destroy(){$=!1,o.removeEventListener("close",H),o.removeEventListener("cancel",H),X&&(X(),X=null),o.remove()}}}function Ki(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,f,m="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let h=typeof m=="string"?m.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function Zi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Xi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}function ss(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let i=null,c=!1;function u(){return r&&r.get()||{revision:0,exec_defaults:{}}}function f(){let C=u();return typeof C.revision=="number"?C.revision:0}function m(){let C=n?n.get():null;return!C||typeof C.revision!="number"?null:{revision:C.revision,presets:Array.isArray(C.presets)?C.presets:[]}}function h(C){n&&C&&typeof C.revision=="number"&&Array.isArray(C.presets)&&n.set({revision:C.revision,presets:C.presets})}function E(C){C&&C.queue&&r&&r.set(C.queue)}function k(){return u().runner_catalog??null}let T=null;function B(){if(T!==null)return T;let C=u().default_exec_preset_id;return typeof C=="string"&&C.length>0?C:null}async function $(C){if(!s)return;let ne=m();if(!ne)return;T=C||"";let A=O(C);if(M(),!A.viable){Z(A.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3),T=null,M();return}try{let L=await s("worker-queue-set-default-exec-preset",{preset_id:C||null,expected_queue_revision:f(),expected_preset_revision:ne.revision});E(L),L&&L.presets&&n&&n.set(L.presets),L&&L.conflict?Z("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3):L&&L.applied||Z("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{Z("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}T=null,M()}function H(C){i={id:C.id,name:C.name,settings:{...C.settings||{}}},N(),c=!1,M()}function X(){i={id:null,name:"",settings:{}},c=!1,M()}function U(C){let ne=C&&C.settings&&typeof C.settings=="object"?C.settings:{},A=L=>typeof ne[L]=="string"?ne[L]:L==="impl_runtime"&&typeof ne.impl_model=="string"&&rr(k(),ne.impl_model)||"";return Ur({selectedOf:A,effectiveOf:A,runner_catalog:k()}).some(L=>L.groups.some(S=>S.options.some(Y=>Y.value===L.selected&&Y.label.endsWith("(\uBE44\uD638\uD658)"))))}function O(C){if(!C)return{viable:!0,missing:!1,incompatible:!1,preset:null};let A=m()?.presets.find(S=>S.id===C);if(!A||A.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let L=A.compatible===!1||U(A);return{viable:!L,missing:!1,incompatible:L,preset:A}}function x(){let C=i?.settings.orchestration_model;return typeof C!="string"?null:rr(k(),C)}function N(){if(!i)return;let C=ns({impl_runtime:i.settings.impl_runtime||"",impl_model:i.settings.impl_model||"",impl_effort:i.settings.impl_effort||""},k(),x());for(let ne of["impl_runtime","impl_model","impl_effort"])C[ne]?i.settings[ne]=C[ne]:delete i.settings[ne]}function I(C){let ne=C&&C.settings&&typeof C.settings=="object"?C.settings:{},A=Er.filter(S=>typeof ne[S]=="string").length,L=Er.filter(S=>typeof ne[S]=="string").map(S=>`${so[S]?.title||S}: ${ne[S]}`);return{count:`${A}/12 \uC9C0\uC815`,choices:L.length>0?L.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function pe(C){if(!s||!window.confirm(`\u201C${C.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let ne=m();if(ne)try{let A=await s("exec-preset-delete",{expected_revision:ne.revision,id:C.id});h(A),A&&A.conflict&&Z("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{Z("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function ve(C=!1){if(!s||!i)return;let ne=m();if(!ne)return;let A=C||i.id===null,L={expected_revision:ne.revision,...A?{}:{id:i.id},name:i.name,settings:{...i.settings}};try{let S=await s(A?"exec-preset-create":"exec-preset-update",L);if(h(S),S&&S.conflict){c=!0,M();return}if(S&&S.applied){i=null,c=!1,M();return}Z("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{Z("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function se(C){return l`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${ao(C.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${C.key}
        ?disabled=${C.disabled}
        @change=${ne=>{if(!i)return;let A=ne.target.value;A?i.settings[C.key]=A:delete i.settings[C.key],(C.key==="impl_runtime"||C.key==="impl_model"||C.key==="impl_effort"||C.key==="orchestration_model")&&N(),c=!1,M()}}
      >
        ${rs(C.groups,C.selected,oo[C.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function be(){if(!i)return"";let C=K=>typeof i?.settings[K]=="string"?i.settings[K]:"",ne=Ur({selectedOf:C,effectiveOf:C,runner_catalog:k(),controller_runtime:x()}),A=fn.flatMap(K=>K.keys).filter(K=>typeof i?.settings[K]=="string").length,L=K=>{let re=ne.find(le=>le.key===K);return re?se(re):""},S=m(),Y=i.id!==null&&S!==null&&!S.presets.some(K=>K.id===i?.id);return l`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${i.name}
          data-preset-name
          @input=${K=>{i&&(i.name=K.target.value,c=!1)}}
        />
      </label>
      ${c?l`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${Y?l`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      <section class="exec-preset-editor__core" data-preset-core>
        ${no.map(L)}
      </section>
      <details class="exec-preset-editor__advanced" data-preset-advanced>
        <summary>고급 설정 — ${A}개 변경됨</summary>
        ${fn.map(K=>l`<section
              class="exec-preset-editor__group"
              data-preset-group=${K.id}
            >
              <h4>${K.label}</h4>
              ${K.keys.map(L)}
            </section>`)}
      </details>
      <div class="exec-preset-editor__actions">
        ${Y?l`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{ve(!0)}}
            >
              새 프리셋으로 저장
            </button>`:l`<button
              type="button"
              data-preset-save
              @click=${()=>{ve(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{i=null,c=!1,M()}}
        >
          취소
        </button>
      </div>
    </div>`}function Me(){let C=m(),ne=C?C.presets.filter(S=>S?.migration_pending!==!0):[],A=B()||"",L=O(A);return l`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${X}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${C===null?l`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:ne.length===0?l`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:ne.map(S=>{let Y=I(S),K=O(S.id),re=S.id===A,le=K.missing?"\uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":K.incompatible?"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"",Ce=typeof S.reference_count=="number",je=Ce?S.reference_count:null,rt=Array.isArray(S.reference_summary)?S.reference_summary.map(ze=>ze?.display_name||ze?.workspace_key).filter(Boolean).join(", "):"";return l`<article
                class="exec-preset-card"
                data-preset-id=${S.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${S.name}</strong>
                  ${re?l`<span
                        class="exec-defaults__vd-badge"
                        data-workspace-default-badge
                        >워크스페이스 기본</span
                      >`:""}
                  <span>${Y.count}</span>
                  <span data-preset-references=${S.id}
                    >${Ce?`\uCC38\uC870 ${je}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${K.incompatible?l`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${Y.choices}</small>
                  ${rt?l`<small data-preset-impact=${S.id}
                        >업데이트 영향: ${rt}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  ${re?l`<button
                        type="button"
                        data-workspace-preset-release=${S.id}
                        @click=${()=>{$("")}}
                      >
                        기본 해제
                      </button>`:l`<button
                        type="button"
                        data-workspace-preset-assign=${S.id}
                        ?disabled=${!K.viable}
                        title=${le}
                        @click=${()=>{$(S.id)}}
                      >
                        기본으로
                      </button>`}
                  <button
                    type="button"
                    data-preset-edit=${S.id}
                    @click=${()=>H(S)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${S.id}
                    ?disabled=${je===null||je>0||S.reference_scan_complete===!1}
                    title=${je===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":je>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":S.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{pe(S)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${C!==null&&A&&L.missing?l`<article class="exec-preset-card" data-workspace-preset-missing>
            <div class="exec-preset-card__main">
              <strong>워크스페이스 기본 프리셋을 찾을 수 없습니다</strong>
              <span class="exec-defaults__vd-badge" data-workspace-default-badge
                >워크스페이스 기본</span
              >
              <small>
                참조 ${A} · 실행이 차단됩니다. 기본을 해제하거나 다른
                프리셋을 지정하세요.
              </small>
            </div>
            <div class="exec-preset-card__actions">
              <button
                type="button"
                data-workspace-preset-release=${A}
                @click=${()=>{$("")}}
              >
                기본 해제
              </button>
            </div>
          </article>`:""}
      ${be()}
    </section>`}function tt(){let C=u().workspace_info;return C&&typeof C=="object"?C:{}}function Je(C,ne){return l`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${C}"
      >${ne}</span
    >`}function Ie(C){let ne=C?Xi(C.cmd):"",A=C?Zi(C.timeout_ms):"",L=o&&o()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${ne?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${ne}</span>
            ${Je("config","config")}
            ${A?l`<span class="exec-defaults__vd-meta"
                  >timeout ${A}</span
                >`:""}
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${L}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function Xe(C){let ne=C?Xi(C.cmd):"",A=C?Zi(C.timeout_ms):"",L=A?`timeout ${A} \xB7 external deployer \uC2E4\uD589`:"external deployer \uC2E4\uD589";return l`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${ne?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${ne}</span>
            ${Je("deployer","external")}
            <span class="exec-defaults__vd-meta">${L}</span>
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >docs/agents/repo-ops.toml [deploy]</span
            >
            선언으로 정의
          </div>`}
    </div>`}let we=!1,ge=!1,ke=!1,fe=null;async function W(){if(s){ge=!0,ke=!1,M();try{let C=await Promise.resolve(s("get-worker-system-prompt",{}));!C||typeof C!="object"||Array.isArray(C)?ke=!0:fe=C}catch{ke=!0}finally{ge=!1,M()}}}function j(){if(we=!we,we&&!fe){W();return}M()}function he(){return l`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${we?"true":"false"}
          @click=${j}
        >
          ${we?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${we?V():""}
    </section>`}function V(){let C=qr({loading:ge,error:ke});if(C)return C;if(!fe)return"";let ne=Array.isArray(fe.variants)?fe.variants:[];return l`<div class="exec-defaults__sp-body">
      ${fe.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${fe.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${ne.map(A=>l`<div class="exec-defaults__sp-variant" data-variant=${A.key}>
            <div class="exec-defaults__sp-cond">${A.condition}</div>
            ${tr(A.label,A.system_prompt)}
          </div>`)}
    </div>`}function Ee(C){return l`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — repo 선언/config에서 정의</span
        >
      </p>
      ${Ie(C.verify_cmd)} ${Xe(C.deploy_cmd)}
    </section>`}function M(){Ue(l`
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
            ${Me()} ${Ee(tt())}
            ${he()}
          </div>
        </div>
      `,a)}let P=!1,ae=()=>{P=!1},Fe=C=>{C.target===C.currentTarget&&Ke()};a.addEventListener("close",ae),a.addEventListener("cancel",ae),a.addEventListener("click",Fe);let Te=null;r&&r.subscribe&&(Te=r.subscribe(()=>{P&&M()}));let Be=null;n&&n.subscribe&&(Be=n.subscribe(()=>{P&&M()}));function De(){P||(P=!0,M(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function Ke(){P&&(P=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:De,close:Ke,destroy(){P=!1,a.removeEventListener("close",ae),a.removeEventListener("cancel",ae),a.removeEventListener("click",Fe),Te&&(Te(),Te=null),Be&&(Be(),Be=null),a.remove()}}}function pp(e){return{deployment_requested:"\uBC30\uD3EC \uC694\uCCAD",provider_attempt:"\uC678\uBD80 \uBC30\uD3EC \uD655\uC778",automatic_retry:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4",recovery_prepared:"\uBCF5\uAD6C \uC900\uBE44",recovery_session:"\uBCF5\uAD6C \uC138\uC158",confirmation_required:"\uC2B9\uC778 \uB300\uAE30",deployment_succeeded:"\uC131\uACF5 \uAD00\uCE21"}[e]||"\uBC30\uD3EC \uAC31\uC2E0"}function Qi(e){if(!e||typeof e!="object"||typeof e.state!="string"||typeof e.repo!="string"||typeof e.desired_sha!="string")return"";let t=Array.isArray(e.timeline)?e.timeline.slice(0,5):[],r=e.recovery&&typeof e.recovery=="object"?e.recovery:null,n=Array.isArray(e.actions)?e.actions:[],s=n.find(a=>a?.kind==="view_session"&&typeof a.attempt_id=="string"),o=n.find(a=>a?.kind==="continue_recovery"&&typeof a.attempt_id=="string");return l`<details
    class="worker-deployment-strip"
    aria-label="레포 배포 상태"
    data-deployment-state=${e.state}
  >
    <summary class="worker-deployment-strip__summary">
      <span class="worker-deployment-strip__dot" aria-hidden="true"></span>
      <b>${e.state}</b>
      <span class="worker-deployment-strip__repo">${e.repo}</span>
      <code class="worker-deployment-strip__sha"
        >${e.desired_sha}</code
      >
      <span class="worker-deployment-strip__description"
        >${e.description||""}</span
      >
      <span class="worker-deployment-strip__count"
        >merge
        ${Number.isInteger(e.included_merge_count)?e.included_merge_count:0}</span
      >
      <span class="worker-deployment-strip__caret" aria-hidden="true">›</span>
    </summary>
    <div class="worker-deployment-strip__detail">
      ${t.length>0?l`<ol class="worker-deployment-strip__timeline">
            ${t.map(a=>l`<li>
                  ${pp(String(a?.kind||""))}
                </li>`)}
          </ol>`:""}
      ${r?l`<div class="worker-deployment-strip__recovery">
            ${r.bead_id?l`<code>${r.bead_id}</code>`:""}
            ${r.session_id?l`<code>${r.session_id}</code>`:""}
            ${r.attempt_id?l`<code>${r.attempt_id}</code>`:""}
            ${r.runner||r.model||r.effort?l`<span
                  >${[r.runner,r.model,r.effort].filter(Boolean).join(" \xB7 ")}</span
                >`:""}
            ${r.recent_update?l`<span class="worker-deployment-strip__update"
                  >${r.recent_update}</span
                >`:""}
            ${r.confirmation_reason?l`<details class="worker-deployment-strip__confirmation">
                  <summary>확인 내용 보기</summary>
                  <code>${r.confirmation_reason}</code>
                </details>`:""}
          </div>`:""}
      ${e.log?l`<details class="worker-deployment-strip__log">
            <summary>배포 로그 보기</summary>
            <code>${e.log.reference}</code>
          </details>`:""}
      ${n.some(a=>a?.kind==="retry")?l`<button type="button" class="worker-deployment-retry">
            지금 재시도
          </button>`:""}
      ${s?l`<button
            type="button"
            class="worker-deployment-session"
            data-attempt-id=${s.attempt_id}
          >
            세션 보기
          </button>`:""}
      ${o?l`<button
            type="button"
            class="worker-deployment-continue"
            data-attempt-id=${o.attempt_id}
          >
            복구 이어가기
          </button>`:""}
    </div>
  </details>`}function jr(e){let t=Ct(e.created_at),r=Ct(e.updated_at);return!t&&!r?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${Tt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?l`<span>·</span>`:""}${r?l`<span title=${`\uC218\uC815 ${Tt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function fp(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function _n(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function os(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Yt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,m)=>(f.requested_at||0)-(m.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?fp(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:u}}function nr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return l`<div
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
  </div>`}function uo(e){let t=e.draggable&&!e.done,r=t&&e.lane==="queue",n=Array.isArray(e.badges)?e.badges:[],s=gt(e.usage),o=Ft(e.usage),a=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action,c=e.lane==="done"&&!i,u=c?Ct(e.done_at):"",f=e.selectable?l`<input
        class="worker-mini__select"
        type="checkbox"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC120\uD0DD`}
        .checked=${e.selected===!0}
      />`:"",m=r?l`<button
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
          >`:"",E=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,T=l`<span class="worker-mini__title">${e.title}</span>`,B=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",$=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",H=n.map(be=>be===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${be}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${be===e.completion_badge&&e.completion_title||""}
          >${be}</span
        >`),X=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",U=s.length>0?s.map(be=>l`<span class="worker-usage" title=${be.tooltip}
              >${be.label}</span
            >`):o?l`<span class="worker-usage" title=${Fr(e.usage)}
            >${o}</span
          >`:"",O=a?l`<span class="merge-step"
        >${a.label}<span class="merge-step__n"
          >${a.index}/${a.total}</span
        ></span
      >`:"",x=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",N=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",I=e.discard,pe=I?.action||e.discard_action?l`<button
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
        </button>`:"",ve=e.revise_action?l`<button
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
        </button>`:"",se=!!(o||a||e.merge_action||e.cancel_action||e.discard_action||I?.operation||e.revise_action);return l`<div
    class="worker-mini${i?" worker-mini--card":""}${e.selected?" worker-mini--selected":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${a?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${a?`--progress: ${a.percent}%`:""}
    draggable=${t&&!r?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${c?l`<div class="worker-mini__row1">${E}${k}${T}</div>
          <div class="worker-mini__row2">
            ${U}${u?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Tt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${H}${O}
            <span class="worker-mini__actions"
              >${x}${N}${pe}</span
            >
            ${jr(e)}
          </div>`:i?l`<div class="worker-mini__head">
              ${f}${m}${E}${k}${B}${$}${H}${h}${X}
            </div>
            <div class="worker-mini__body">${T}</div>
            ${se?l`<div class="worker-mini__foot">
                  ${U}${O}
                  <span class="worker-mini__actions"
                    >${x}${N}${pe}${ve}</span
                  >
                  ${nr(e)}
                </div>`:""}
            ${jr(e)}`:l`<div class="worker-mini__line">
              ${f}${m}${E}${k}${T}${B}${$}${H}${h}${X}${U}${O}${x}${N}${pe}
            </div>
            ${nr(e)} ${jr(e)}`}
  </div>`}function _p(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return l`<div
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
    ${r?Nn(r,e.status):""}
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
    ${jr(e)}
  </div>`}function Vt(e){let t=!!e.collapsible&&!!e.collapsed,r=l`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?_p(n):uo(n))}
          </div>`}
  </section>`}var Ji=160;function el(e){return e.length>Ji?`${e.slice(0,Ji)}\u2026`:e}function mp(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${el(e.command)}</code>`:""}
  </div>`}function gp(e){return e?l`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function hp(e){return e?l`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function po(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function tl(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return l`<div class="worker-banners">
    ${e.failure?l`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${e.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
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
          ${mp(e.failure.cause_detail)}
          ${nr({discard:e.failure.discard})}
        </div>`:""}
    ${t.map(r=>l`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}).
          ${typeof r.retry_count=="number"&&Number.isInteger(r.retry_count)&&r.retry_count>0?l`${r.retry_count}회 자동 재시도 후에도 실패했습니다 — `:""}정리를
          사람이 마무리하세요.
          ${r.detail?l`<div class="worker-banner__detail">
                <code>${el(r.detail)}</code>
              </div>`:""}
          ${hp(r.log_path)} ${gp(r.output_tail)}
        </div>`)}
  </div>`}function bp(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?po(t-e.started_at):"\u2014",a=Wt(e),i=dr(e),c=gt(e.usage),u=Ft(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,h=e.attempt_id&&e.attempt_id===r,E=e.discard?.action?l`<button
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
            ${E}
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
            ${E}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?l`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||c.length>0||u||f||m?l`<div class="rtile__meta">
          ${f?l`<span class="worker-mini__badge">${f}</span>`:""}
          ${m?l`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${m}</span
              >`:""}
          ${a?l`<span class="rtile__runner">${a}</span>`:""}
          ${c.length>0?c.map(k=>l`<span class="worker-usage" title=${k.tooltip}
                    >${k.label}</span
                  >`):u?l`<span
                  class="worker-usage"
                  title=${Fr(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${jr(e)} ${nr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function fo(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>bp(s,t,r))}
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
  </svg>`}function _o(){return mr(Zt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function mo(){return mr(Zt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function rl(){return mr(Zt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function nl(){return mr(Zt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function sl(){return mr(Zt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function ol(){return mr(Zt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function al(){return mr(Zt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function il(){return mr(Zt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var mn=1,yp=6e4,vp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},wp=new Set(["auto_merge","merged","merge","done"]),ll={running:3,paused:2,failed:1};function kp(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function $p(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),h=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let m=ll[u.run_state],h=ll[i];if(m>h||m===h&&(u.started_at??0)>(c??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Ot(e,a.bead_id),can_pause:i==="running"&&f,can_resume:i!=="running"&&f&&!n.has(a.attempt_id)})}return o}function cl(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Rt(e){return e&&typeof e=="object"?e:{}}function go(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let $ of s)$&&typeof $.root_dir=="string"&&a.set($.root_dir,$);let i=[],c=[],u=[],f=[],m=[],h=new Map;for(let $ of n){if(!$||typeof $.root_dir!="string")continue;let H=$.root_dir,X=$.name||H,U=a.get(H),O=U&&typeof U.revision=="number"?U.revision:typeof $.revision=="number"?$.revision:0,x=Rt($.attempts),N=Rt($.bead_titles),I=Rt($.pr_observations),pe=Rt($.admission),ve=Rt($.revise_parked),se=Rt($.merge_queue_state),be=Rt($.cleanup_failed),Me=Rt($.discard_operations),tt=Array.isArray($.merge_queue)?$.merge_queue:[],Je=new Set(tt.filter(W=>W&&typeof W.bead_id=="string").map(W=>W.bead_id)),Ie=new Map(tt.filter(W=>W&&typeof W.bead_id=="string").map(W=>[W.bead_id,W])),Xe=Array.isArray($.queue)?$.queue:[],we=Array.isArray($.done)?$.done:[],ge=new Map;for(let W of we)W&&typeof W.bead_id=="string"&&typeof W.added_at=="number"&&ge.set(W.bead_id,W.added_at);let ke=W=>({id:W,title:N[W]||W,root_dir:H,workspace_name:X,expected_revision:O,draggable:!1}),fe=new Set;for(let[W,j]of $p(x,ge))fe.add(W),c.push({...ke(W),lane:"running",attempt_id:j.attempt_id,run_state:j.run_state,can_pause:j.can_pause,can_resume:j.can_resume,started_at:j.started_at,last_event_at:j.last_event_at,runner:j.runner,model:j.model,effort:j.effort,speed:j.speed,resumed_from:j.resumed_from,continuation_mode:j.continuation_mode,usage:j.usage,discard:Yt(Me,W,{attempt_id:j.attempt_id}),badges:j.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:j.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:j.run_state==="failed"});for(let W of Array.isArray($.pr_wait)?$.pr_wait:[]){let j=W&&W.bead_id;if(typeof j!="string"||fe.has(j))continue;fe.add(j);let he=Rt(I[j]),V=Rt(he.pr),Ee=he.gate?Rt(he.gate):null,M=Je.has(j),P=Ie.get(j)?.continuation_action||null,ae=!!P&&P.continuation===null,Fe=se.active===j,Te=W.external===!0,Be=be[j]||null,De=!!Ee&&Ee.base_badge==="\uCDA9\uB3CC",Ke=!!Be&&["child_sweep","branch_cleanup","parent_close"].includes(Be.step)&&!!Ee&&Ee.tier==="merged",C=Te&&!!Ee&&Ee.tier==="merged",ne=Yt(Me,j,{external:Te,merge_active:Fe,merge_queued:M,merged:!!Be||Ee?.tier==="merged"}),A=!!ne.operation;u.push({...ke(j),lane:"pr_wait",pr_number:typeof V.number=="number"?V.number:null,pr_url:typeof V.url=="string"?V.url:void 0,external:Te,usage:Ot(x,j),badges:ae?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Be?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!Be,reason:Be?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!M||ae,merge_enabled:!A&&(ae||Ee?.enabled===!0||De||Ke||C),merge_label:ae?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":C||Ke?"\uC815\uB9AC":De&&!Ke?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ae?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":A?ne.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ne.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ne.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:C?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":Ke?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":De?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Ee?.enabled===!0?`\uBA38\uC9C0 (${Ee.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${Ee?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:M&&!ae,cancel_enabled:!Fe,continuation_mismatch:P?.mismatch||null,discard:ne,discard_action:ne.action,discard_enabled:ne.enabled,discard_title:ne.title})}for(let W=0;W<Xe.length;W++){let j=Xe[W],he=j&&j.bead_id;if(typeof he!="string"||fe.has(he))continue;fe.add(he);let V=ve[he],Ee=Yt(Me,he),M=Ee.operation?Ee:null,P={...ke(he),lane:"queue",draggable:!M,discard:M||void 0,reason:cl(pe,he),queue_position:W+1,queue_index:W,queue_length:Xe.length,badges:V?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!V,revise_action:!!V,revise_enabled:!!V&&!M,revise_title:V?V.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${V.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(P);let ae=h.get(H);ae?ae.push(P):h.set(H,[P])}for(let W of Array.isArray($.runnable)?$.runnable:[]){let j=W&&W.bead_id;typeof j!="string"||fe.has(j)||(fe.add(j),i.push({...ke(j),title:W.title||N[j]||j,lane:"runnable",draggable:!0,reason:cl(pe,j),created_at:W.created_at??void 0,updated_at:W.updated_at??void 0,labels:Array.isArray(W.labels)?W.labels:[],spec_reviewer:typeof W.spec_reviewer=="string"?W.spec_reviewer:void 0,plan_state:W.plan_state==="approved"||W.plan_state==="authored"?W.plan_state:"none",workflow:W.route?{route:W.route,chips:{route:W.route}}:null,place_index:Xe.length}))}for(let W of we){let j=W&&W.bead_id;if(typeof j!="string"||fe.has(j)||(fe.add(j),o!==void 0&&typeof W.added_at=="number"&&W.added_at<o))continue;let he=kp(x,j);m.push({...ke(j),lane:"done",done:!0,usage:Ot(x,j),done_at:typeof W.added_at=="number"?W.added_at:void 0,done_kind:he&&typeof he.done_kind=="string"?he.done_kind:null})}}let E=new Map;s.forEach(($,H)=>{$&&typeof $.root_dir=="string"&&E.set($.root_dir,H)});let k=r&&r.running_sort==="repo"?"repo":"started";c.sort(($,H)=>{if(k==="repo"){let O=E.get($.root_dir)??Number.MAX_SAFE_INTEGER,x=E.get(H.root_dir)??Number.MAX_SAFE_INTEGER;if(O!==x)return O-x}let X=typeof $.started_at=="number"&&Number.isFinite($.started_at)?$.started_at:null,U=typeof H.started_at=="number"&&Number.isFinite(H.started_at)?H.started_at:null;return X!==null&&U!==null&&X!==U?X-U:X===null&&U!==null?1:X!==null&&U===null?-1:$.id.localeCompare(H.id)}),m.sort(($,H)=>(H.done_at??0)-($.done_at??0));let T=s.length>0?s:n.map($=>({root_dir:$&&$.root_dir,name:$&&$.name,auto_advance:$&&$.auto_advance,auto_merge:$&&$.auto_merge,slots:$&&$.slots,revision:$&&$.revision,exec_defaults:$&&$.exec_defaults,default_exec_preset_id:$&&$.default_exec_preset_id,runner_catalog:$&&$.runner_catalog})),B=[];for(let $ of T)!$||typeof $.root_dir!="string"||B.push({root_dir:$.root_dir,name:$.name||$.root_dir,auto_advance:$.auto_advance===!0,auto_merge:$.auto_merge===!0,slots:typeof $.slots=="number"&&$.slots>=mn?$.slots:mn,revision:typeof $.revision=="number"?$.revision:0,exec_defaults:Rt($.exec_defaults),default_exec_preset_id:typeof $.default_exec_preset_id=="string"?$.default_exec_preset_id:null,runner_catalog:Rt($.runner_catalog),items:h.get($.root_dir)||[]});return{runnable:i,queue:f,queue_groups:B,running:c,pr_wait:u,done:m,automation:{total:B.length,both_on:B.filter($=>$.auto_advance&&$.auto_merge).length}}}function xp(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<yp;return l`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Tt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":l`<span class="mon-beat__age"
          >${Ct(e,t)}</span
        >`}</span
  >`}function gn(e){return l`<div class="mon-c__title">${e.title}</div>`}function hn(e){return l`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function as(e){return e.workspace_name?l`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function ho(e){let t=gt(e.usage),r=Ft(e.usage);return t.length>0?t.map(n=>l`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?l`<span class="mon-c__usage" title=${Fr(e.usage)}
        >${r}</span
      >`:""}function bo(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>l`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Sp(e){return l`<span class="mon-c__ops">
    ${e.run_state==="running"?l`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${mo()}
        </button>`:l`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${_o()}
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
          ${nl()}
        </button>`:""}
  </span>`}function Ap(e,t){let r=typeof e.started_at=="number"?po(t-e.started_at):"";return l`${gn(e)}
    <div class="mon-c__meta">
      ${bo(e)}${xp(e.last_event_at,t)}${hn(e)}${as(e)}
      ${Wt(e)?l`<span class="mon-c__model">${Wt(e)}</span>`:""}
      ${dr(e)?l`<span
            class="rtile__resumed"
            title=${dr(e)}
            >↻</span
          >`:""}
      ${r?l`<span class="mon-live__elapsed">${r}</span>`:""}
      ${ho(e)}${Sp(e)}${nr(e)}
    </div>`}function Tp(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Ct(e.updated_at);return l`${gn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${hn(e)}
      ${n?l`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?l`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?l`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Pn(e.labels,null).map(c=>l`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${as(e)}
      ${i?l`<span title=${`\uC218\uC815 ${Tt(e.updated_at)}`}
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
    </div>`}function Ep(e){let t=!!e.discard?.operation;return l`${gn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${hn(e)}
      ${bo(e)}
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
    ${nr(e)}
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
        </div>`:""}`}function Cp(e){let t=!!(Ft(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return l`${gn(e)}
    <div class="mon-c__meta">
      ${hn(e)}${as(e)}
      ${e.pr_url&&e.pr_number?l`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${bo(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?l`<div class="mon-c__tail">
          ${ho(e)}
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
          ${nr(e)}
        </div>`:""}`}function Rp(e,t){let r=e.done_kind||"",n=r?vp[r]||r:"",s=Ct(e.done_at,t);return l`${gn(e)}
    <div class="mon-c__meta">
      ${hn(e)}${as(e)}
      ${n?l`<span
            class="mon-live__kind${wp.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${ho(e)}
      ${s?l`<span title=${`\uC644\uB8CC ${Tt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function dl(e,t){return e.lane==="running"?Ap(e,t):e.lane==="runnable"?Tp(e):e.lane==="queue"?Ep(e):e.lane==="pr_wait"?Cp(e):Rp(e,t)}function ul(e){let t=String(e.revision);return l`<header
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
        ${e.auto_advance?mo():_o()}
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
        ${sl()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${ol()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${mn}
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
        ${al()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function pl(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Ht.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return l`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?rl():il()}
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
  </div>`}function fl(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function _l(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return gt(Bn(t));let r={};for(let i of Qt)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let f of Qt){let m=c[f];typeof m=="number"&&Number.isFinite(m)&&(r[f]+=m,n=!0,u=!0)}if(u){o+=1;let f=c.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Ft(r):null}var gl="bdui.monitor.done-range",hl="bdui.monitor.running_sort";function Ip(){try{let e=window.localStorage.getItem(gl);return Dt(e)?e:Et}catch{return Et}}function Lp(e){try{window.localStorage.setItem(gl,e)}catch{}}function Dp(){try{return window.localStorage.getItem(hl)==="repo"?"repo":"started"}catch{return"started"}}function Op(e){try{window.localStorage.setItem(hl,e)}catch{}}var bl="tab:monitor:pipeline",Mp=1e3,Pp=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function ml(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return l`<div
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
    ${dl(e,t)}
  </div>`}function yl(e,t){let r=ot("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,i=t.getWorkspacePath,c=t.switchWorkspace,u=t.now||(()=>Date.now()),f=t.confirm||(A=>typeof globalThis.confirm!="function"||globalThis.confirm(A)),m=Ip(),h=Dp();function E(){let A=Ht.find(L=>L.value===m);return A?A.label:""}let k=document.createElement("div");k.className="mon",e.appendChild(k);let T=go(null,null),B=null,$=new Map,H=new Set;function X(A){return T.queue_groups.find(L=>L.root_dir===A)||null}let O=ss(e,{queueStore:{get(){if(!B)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let A=$.get(B);if(A)return A;let L=X(B),S=s&&s.get?s.get():null,Y=(Array.isArray(S)?S:[]).find(K=>K&&K.root_dir===B);return{revision:L?L.revision:0,exec_defaults:L?L.exec_defaults:{},default_exec_preset_id:L?L.default_exec_preset_id:null,runner_catalog:L?L.runner_catalog:null,workspace_info:Y?Y.workspace_info:void 0}},set(A){B&&$.set(B,A);for(let L of Array.from(H))L()},subscribe(A){return H.add(A),()=>H.delete(A)}},presetStore:a,transport:o?(A,L)=>o(A,A==="worker-queue-set-default-exec-preset"||A==="get-worker-system-prompt"?{...L||{},root_dir:B}:L):void 0,getWorkspacePath:()=>B||void 0}),x=null,N=null;async function I(A,L,S,Y,K=!0){if(!o||!S)return null;let re=await o(A,{...L,root_dir:S,expected_revision:Y});if(re&&re.conflict&&K){re.queue&&$.set(S,re.queue);let le=re.queue&&typeof re.queue.revision=="number"?re.queue.revision:Y;re=await o(A,{...L,root_dir:S,expected_revision:le})}return re&&re.queue&&S&&$.set(S,re.queue),re}function pe(A,L){let S=$.get(A),Y=s&&s.get?s.get():null,K=(Array.isArray(Y)?Y:[]).find(le=>le?.root_dir===A);return(S||K)?.merge_queue?.find(le=>le.bead_id===L)?.continuation_action}async function ve(A,L,S,Y){let K=await I(A,L,S,Y),re=$.get(S)?.revision??K?.queue?.revision??Y;return Gt(K,(le,Ce)=>I(A,{...L,continuation:le,decision_token:Ce},S,re,!1),{refresh:le=>I(A,L,S,le?.queue?.revision??$.get(S)?.revision??re,!1)})}async function se(A,L,S,Y){let K=await Gt({continuation_mismatch:Y},(le,Ce)=>I("worker-merge-queue-add",{bead_id:L,continuation:le,decision_token:Ce},A,S,!1)),re=K?.queue?.merge_queue?.find(le=>le.bead_id===L)?.continuation_action;K?.applied!==!0&&re?.continuation===null&&re.mismatch&&await se(A,L,K.queue.revision,re.mismatch)}async function be(A,L,S){let Y=await I("worker-discard",A,L,S);if(Y&&Y.discarded===!0){Z(os(Y),"success",5e3);return}if(Y&&Y.reason){Z(`\uD3D0\uAE30 \uC2E4\uD328: ${Y.reason}`,"error");return}if(Y&&Y.accepted&&Y.pending==="merged_revert"){Z("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(Y&&Y.accepted){Z(`\uD3D0\uAE30 \uC9C4\uD589: ${Y.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}Y&&!Y.conflict&&Z("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Me(A,L,S){return!o||!S?null:await o(A,{...L,root_dir:S})}async function tt(A){if(!o||!A&&!f("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let L=await o("monitor-auto-toggle",{on:A}),S=L&&Array.isArray(L.failed)?L.failed:[];S.length>0&&Z(`\uC790\uB3D9\uD654 ${A?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${S.map(Y=>Y.root_dir).join(", ")}`,"error",3200)}async function Je(){let A=new Map;for(let L of T.pr_wait)A.has(L.root_dir)||A.set(L.root_dir,L.expected_revision);for(let[L,S]of A)await I("worker-merge-queue-add-all",{},L,S)}let Ie=null,Xe=!1,we=null;function ge(){we!==null&&clearTimeout(we),we=setTimeout(()=>{we=null,Xe=!1},0)}function ke(A){let L=A.target;return typeof L?.closest=="function"?L.closest(".mon-group"):null}function fe(A){let L=ke(A);return!L||!Ie?null:(L.getAttribute("data-root-dir")||"")===Ie.root_dir?L:null}function W(){for(let A of Array.from(k.querySelectorAll(".mon-group--drag-over")))A.classList.remove("mon-group--drag-over")}function j(A){let L=A.target,S=typeof L?.closest=="function"?L.closest('.mon-card[draggable="true"]'):null;if(S){Ie={bead_id:S.getAttribute("data-issue-id")||"",lane:S.getAttribute("data-lane")||"",root_dir:S.getAttribute("data-root-dir")||"",revision:Number(S.getAttribute("data-revision")||0)||0,queue_index:Number(S.getAttribute("data-queue-index")),queue_length:Number(S.getAttribute("data-queue-length")),place_index:Number(S.getAttribute("data-place-index"))},Xe=!0;try{A.dataTransfer?.setData("text/plain",Ie.bead_id),A.dataTransfer&&(A.dataTransfer.effectAllowed="move")}catch{}}}function he(A){let L=fe(A);L&&(A.preventDefault(),A.dataTransfer&&(A.dataTransfer.dropEffect="move"),L.classList.add("mon-group--drag-over"))}function V(A){ke(A)?.classList.remove("mon-group--drag-over")}function Ee(){Ie=null,W(),ge()}function M(A){let L=fe(A),S=Ie;if(Ie=null,W(),!L||!S||!S.bead_id)return;A.preventDefault();let Y=A.target,K=typeof Y?.closest=="function"?Y.closest('.mon-card[data-lane="queue"]'):null,re=K&&L.contains(K)?Number(K.getAttribute("data-queue-index")):NaN;if(S.lane==="runnable"){let je=Number.isFinite(re)?re:S.place_index;if(!Number.isFinite(je))return;I("worker-queue-place",{bead_id:S.bead_id,index:je},S.root_dir,S.revision);return}if(S.lane!=="queue"||K&&K.getAttribute("data-issue-id")===S.bead_id)return;let le=S.queue_index,Ce=Number.isFinite(re)?le>re?re:re-1:S.queue_length-1;!Number.isFinite(Ce)||Ce<0||Ce===le||I("worker-queue-reorder",{bead_id:S.bead_id,to_index:Ce},S.root_dir,S.revision)}function P(A){let L={runnable:T.runnable,queue:T.queue,running:T.running,pr_wait:T.pr_wait,done:T.done};return l`${pl({automation:T.automation,counts:{running:T.running.length,queue:T.queue.length,pr_wait:T.pr_wait.length},running_sort:h,done_range:m,token_total:_l(T.done),token_tooltip:fl(E())})}
      <div class="worker-lanes mon-lanes">
        ${Pp.map(S=>{let Y=L[S.lane],K=S.lane==="queue"?T.queue_groups.length>0?l`${T.queue_groups.map(re=>l`<div
                        class="mon-group"
                        data-root-dir=${re.root_dir}
                      >
                        ${ul(re)}
                        <div class="mon-group__list">
                          ${re.items.map(le=>ml(le,A))}
                        </div>
                      </div>`)}`:void 0:Y.length>0?l`${Y.map(re=>ml(re,A))}`:void 0;return Vt({id:`monitor-${S.lane}`,lane:S.pane,title:S.lane==="done"?`\uC644\uB8CC\xB7${E()}`:S.title,items:Y,empty:S.empty,body:K,live:S.lane==="running"&&Y.length>0,header_control:S.lane==="pr_wait"&&Y.length>0?l`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function ae(){let A=s&&s.get?s.get():null,L=s&&s.getWorkspacesState?s.getWorkspacesState():[],S=u();T=go(A,L,{done_since:kr(m,S),running_sort:h}),Ue(P(S),k)}function Fe(A,L){let S=i?i():void 0;if(!L||!S||L===S||!c){n(A);return}c(L).then(()=>{n(A)}).catch(Y=>{r("workspace switch for %s failed: %o",L,Y)})}function Te(A){return{root_dir:A.getAttribute("data-root-dir")||"",revision:Number(A.getAttribute("data-revision")||0)||0}}function Be(A,L){let{root_dir:S,revision:Y}=Te(A),K=A.getAttribute("data-issue-id")||"",re=L.dataset.attemptId||A.getAttribute("data-attempt-id")||"",le=L.classList;if(le.contains("worker-card__place")){I("worker-queue-place",{bead_id:K,index:Number(A.getAttribute("data-place-index")||0)||0},S,Y);return}if(le.contains("mon-op--up")||le.contains("mon-op--down")){let Ce=Number(A.getAttribute("data-queue-index")||0)||0,je=le.contains("mon-op--up")?Ce-1:Ce+1;if(je<0)return;I("worker-queue-reorder",{bead_id:K,to_index:je},S,Y);return}if(le.contains("mon-op--remove")){I("worker-queue-remove",{bead_id:K},S,Y);return}if(le.contains("mon-op--pause")){Me("worker-attempt-pause",{attempt_id:re},S);return}if(le.contains("mon-op--discard")){if(!f(_n(K,"unmerged")))return;be({bead_id:K,...re?{attempt_id:re}:{},...L.dataset.operationId?{operation_id:L.dataset.operationId}:{}},S,Y);return}if(le.contains("mon-op--resume")){ve("worker-attempt-resume",{attempt_id:re},S,Y);return}if(le.contains("mon-op--dismiss")){I("worker-attempt-dismiss",{attempt_id:re},S,Y);return}if(le.contains("worker-mini__merge")){let Ce=pe(S,K);Ce?.mismatch&&Ce.continuation===null?se(S,K,Y,Ce.mismatch):I("worker-merge-queue-add",{bead_id:K},S,Y);return}if(le.contains("worker-mini__merge-cancel")){I("worker-merge-queue-remove",{bead_id:K},S,Y);return}if(le.contains("worker-mini__discard")){let Ce=L.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(_n(K,Ce)))return;be({bead_id:K,...re?{attempt_id:re}:{},...L.dataset.operationId?{operation_id:L.dataset.operationId}:{}},S,Y);return}if(le.contains("worker-mini__revise-fix")){ve("worker-revise-fix",{bead_id:K},S,Y);return}le.contains("worker-mini__revise-approve")&&I("worker-revise-approve",{bead_id:K},S,Y)}function De(A){let L=Xe;Xe=!1;let S=A.target;if(!S||typeof S.closest!="function"||S.closest("dialog")||S.closest("a"))return;let Y=S.closest(".mon-running-sort");if(Y){A.preventDefault(),h=Y.getAttribute("data-sort")==="repo"?"repo":"started",Op(h),ae();return}let K=S.closest(".mon-auto-all");if(K){A.preventDefault(),tt(K.getAttribute("data-on")==="true");return}if(S.closest(".mon-merge-all")){A.preventDefault(),Je();return}let le=S.closest(".mon-ctl--advance");if(le){A.preventDefault();let{root_dir:ut,revision:lt}=Te(le);I("worker-automation-toggle",{on:le.getAttribute("data-on")==="true"},ut,lt);return}let Ce=S.closest(".mon-ctl--merge-auto");if(Ce){A.preventDefault();let{root_dir:ut,revision:lt}=Te(Ce);I("worker-merge-auto-toggle",{on:Ce.getAttribute("data-on")==="true"},ut,lt);return}let je=S.closest(".mon-ctl--exec");if(je){A.preventDefault(),B=je.getAttribute("data-root-dir")||null,$.delete(B||""),O.open();return}let rt=S.closest(".mon-card");if(!rt)return;let ze=S.closest("button");if(ze){A.preventDefault(),Be(rt,ze);return}let bt=rt.getAttribute("data-issue-id");bt&&!L&&(A.preventDefault(),Fe(bt,rt.getAttribute("data-root-dir")||""))}function Ke(A){let L=A.target;if(!L||typeof L.closest!="function")return;let S=L.closest(".mon-done-range");if(S){m=Dt(S.value)?S.value:Et,Lp(m),ae();return}let Y=L.closest(".mon-slots__input");if(!Y)return;let{root_dir:K,revision:re}=Te(Y),le=Number(Y.value);if(!Number.isFinite(le))return;let Ce=Math.max(mn,Math.floor(le));I("worker-queue-set-slots",{slots:Ce},K,re)}e.addEventListener("click",De),e.addEventListener("change",Ke),e.addEventListener("dragstart",j),e.addEventListener("dragover",he),e.addEventListener("dragleave",V),e.addEventListener("drop",M),e.addEventListener("dragend",Ee),s&&typeof s.subscribe=="function"&&(x=s.subscribe(()=>{try{$.clear(),ae();for(let A of Array.from(H))A()}catch{}}));function C(){N!==null&&(clearInterval(N),N=null)}function ne(){we!==null&&(clearTimeout(we),we=null)}return{load(){r("load"),ae(),N===null&&(N=setInterval(()=>{try{ae()}catch{}},Mp))},pause(){C()},clear(){C(),ne(),x&&(x(),x=null),e.removeEventListener("click",De),e.removeEventListener("change",Ke),e.removeEventListener("dragstart",j),e.removeEventListener("dragover",he),e.removeEventListener("dragleave",V),e.removeEventListener("drop",M),e.removeEventListener("dragend",Ee),O.destroy(),H.clear(),e.replaceChildren()}}}function vl(e,t,r){let n=ot("views:nav"),s=null;function o(c){return u=>{u.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),u=c.view==="worker"||c.view==="monitor"?c.view:"board";return l`
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
    `}function i(){Ue(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Ue(l``,e)}}}var wl=["bug","feature","task","epic","chore"];function kl(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var $l=["Critical","High","Medium","Low","Backlog"];function xl(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function E(){o.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",o.appendChild(O);for(let x of wl){let N=document.createElement("option");N.value=x,N.textContent=kl(x),o.appendChild(N)}a.replaceChildren();for(let x=0;x<=4;x+=1){let N=document.createElement("option");N.value=String(x);let I=$l[x]||"Medium";N.textContent=`${x} \u2013 ${I}`,a.appendChild(N)}}E();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function T(O){s.disabled=O,o.disabled=O,a.disabled=O,i.disabled=O,c.disabled=O,f.disabled=O,m.disabled=O,m.textContent=O?"Creating\u2026":"Create"}function B(){u.textContent=""}function $(O){u.textContent=O}function H(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?o.value=O:o.value="";let x=window.localStorage.getItem("beads-ui.new.priority");x&&/^\d$/.test(x)?a.value=x:a.value="2"}catch{o.value="",a.value="2"}}function X(){let O=o.value||"",x=a.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),x.length>0&&window.localStorage.setItem("beads-ui.new.priority",x)}async function U(){B();let O=String(s.value||"").trim();if(O.length===0){$("Title is required"),s.focus();return}let x=Number(a.value||"2");if(!(x>=0&&x<=4)){$("Priority must be 0..4"),a.focus();return}let N=String(o.value||""),I=String(c.value||""),pe={title:O};N.length>0&&(pe.type=N),String(x).length>0&&(pe.priority=x),I.length>0&&(pe.description=I),T(!0);try{await t("create-issue",pe)}catch{T(!1),$("Failed to create issue");return}X(),T(!1),k()}return r.addEventListener("cancel",O=>{O.preventDefault(),k()}),h.addEventListener("click",()=>k()),f.addEventListener("click",()=>k()),r.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),U())}),n.addEventListener("submit",O=>{O.preventDefault(),U()}),{open(){n.reset(),B(),H();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var Np=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Sl(e){return String(e).padStart(2,"0")}function Fp(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function qp(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Sl(n.getHours())}:${Sl(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Np[n.getMonth()]} ${n.getDate()} ${o}`;return`${Fp(r,t)} \xB7 ${i}`}function Bp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Al=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Tl(e){let t=!1,r=null,n=new Map;function s(){Ue(l``,e),e.hidden=!0}function o(){let c=Al.filter(f=>n.has(f.key));if(c.length===0){s();return}let u=Date.now();Ue(l`<div class="usage-meter" aria-label="Usage">
        ${c.map(f=>{let m=n.get(f.key),h=typeof m.ageSeconds=="number"&&m.ageSeconds>600,E=h?`${Math.floor(m.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return l`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${m.windows.map(k=>{let T=typeof k.pct=="number"&&Number.isFinite(k.pct)?k.pct:0,B=Math.min(100,Math.max(0,T)),H=`resets ${qp(k.resetsAt,u)}${h?` \xB7 ${E}`:""}`;return l`<span
                class="usage-meter__window ${Bp(B)}"
                style=${`--progress: ${B}%`}
                title=${H}
              >
                <span class="usage-meter__label">${k.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${B}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let u=await fetch(c.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function i(){let c=await Promise.all(Al.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of c)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var Up="worker-ineligible";function yo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function El(e){return yo(e).includes(Up)}var vo="worker-serial";function bn(e){return yo(e).includes(vo)}var jp="tab:worker:ready",zp="tab:worker:blocked",Hp="tab:worker:in-progress",Wp="tab:worker:closed",yn=1,Gp=new Set(["done","failed","orphaned","stopped","discarded"]);function Cl(e){return pn(e).path.length>0}var Ll="beads-ui.worker.candidate-filter",wo={show_blocked:!1,spec:"all"};function Yp(){try{let e=window.localStorage.getItem(Ll);if(!e)return{...wo};let t=JSON.parse(e);if(!t||typeof t!="object")return{...wo};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...wo}}}function Vp(e){try{window.localStorage.setItem(Ll,JSON.stringify(e))}catch{}}function Kp(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=r(i),u=n(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Zp=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Dl="bdui.worker.candidate_sort",Xp=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],is="spec";function Qp(){try{let e=window.localStorage.getItem(Dl);return e==="board"||e==="created"||e==="spec"?e:is}catch{return is}}function Jp(e){try{window.localStorage.setItem(Dl,e)}catch{}}var Ol="bdui.worker.done-range";function ef(){try{let e=window.localStorage.getItem(Ol);return Dt(e)?e:Et}catch{return Et}}function tf(e){try{window.localStorage.setItem(Ol,e)}catch{}}var rf="(max-width: 640px)",Ml="beads-ui.worker.lane-collapsed",vn={queue:!0,done:!0};function nf(){try{let e=window.localStorage.getItem(Ml);if(!e)return{...vn};let t=JSON.parse(e);return!t||typeof t!="object"?{...vn}:{queue:typeof t.queue=="boolean"?t.queue:vn.queue,done:typeof t.done=="boolean"?t.done:vn.done}}catch{return{...vn}}}function sf(e){try{window.localStorage.setItem(Ml,JSON.stringify(e))}catch{}}function Rl(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function of(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(xr):(n.sort(Rn(r)),t==="board"?n:[...n.filter(Cl),...n.filter(s=>!Cl(s))])}function af(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function lf(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function cf(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var df=["closed_unmerged","undecidable"],uf=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function pf(e,t){for(let r of uf)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var ff=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_sync",label:"base \uB3D9\uAE30\uD654",index:2},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}];function _f(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=ff.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function Il(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function mf(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function ko(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function gf(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function hf(e,t,r,n,s=null,o=null,a=null,i=!1,c=null,u=!0,f=null,m=null,h=null,E={},k=!1,T=null,B=null){let $=!!c&&c.position>0,H=!!c?.continuation_action&&c.continuation_action.continuation===null,X=!!c&&c.active===!0,U=c&&c.failure||null,O=r[e]||null,x=O&&O.gate?O.gate:null,N=O&&O.pr?O.pr:null,I=gf(h),pe=mf(c?c.resolution:null),ve=[];i&&ve.push("\uC138\uC158");let se=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":pe?pe.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,be=pf(i&&x&&x.tier==="closed_unmerged"?"\uB2EB\uD798":x&&x.gate_badge||"",se?null:o&&o.activity||null);se&&ve.push(se),be.label&&ve.push(be.label),x&&x.base_badge&&x.base_badge!==x.gate_badge&&ve.push(x.base_badge),m&&ve.push(m),n&&ve.push("\uC815\uB9AC \uC2E4\uD328"),I&&ve.push(I.badge),$&&!X&&ve.push(`\uBA38\uC9C0 \uB300\uAE30 #${c.position}`),U&&ve.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Il(U)}`),H&&ve.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),f&&ve.push(`\uC790\uB3D9 \uC81C\uC678: ${Il(f)}`);let Me=!!x&&x.base_badge==="\uCDA9\uB3CC",tt=!!x&&x.enabled===!0,Je=_f(o&&o.merge_progress?o.merge_progress.step:null),Ie=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!x&&x.tier==="merged",Xe=i&&!!x&&x.tier==="merged",we=i&&Me&&u===!1,ge=Yt(E,e,{external:i,merge_active:X||!!Je,merge_queued:$,conflict_active:!!a,cleanup_active:!1,merged:!!n||x?.tier==="merged"}),ke=!!ge.operation,fe=T==="pending"||T==="failed"?"\uBA38\uC9C0\uB428 \xB7 \uBC30\uD3EC \uB300\uAE30":T==="running"&&typeof B=="string"?`\uBA38\uC9C0\uB428 \xB7 ${B.slice(0,8)} \uBC30\uD3EC\uC5D0 \uD3EC\uD568\uB428`:T==="succeeded"?"\uBA38\uC9C0\uB428 \xB7 \uBC30\uD3EC \uC644\uB8CC":null,W=!!n&&["deployment_request","deploy"].includes(n.step),j=!Ie&&(fe!==null||W);return{id:e,title:t,reason:Ie?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":fe||(n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30"),draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,external:i,pr_number:N&&typeof N.number=="number"?N.number:null,pr_url:N&&typeof N.url=="string"?N.url:"",completion_badge:I?I.badge:null,completion_title:I?I.title:"",completion_repair_pr_url:I?I.repair_pr_url:"",completion_repair_pr_number:I?I.repair_pr_number:null,badges:ve,live_badge:a==="paused"?null:pe?.live||a==="running"?se:be.live?be.label:null,usage:s,alert:!!x&&df.includes(x.tier)||!!n||!!U||!!(I&&I.alert),merge_action:j?!1:!$||H,cancel_action:$&&!H,cancel_enabled:!X&&!(I&&I.lock_actions),cancel_title:I&&I.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":X?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ge,discard_action:ge.action,merge_step:Je,discard_enabled:ge.enabled,discard_title:ge.title,merge_enabled:!Je&&!a&&!ke&&!(I&&I.lock_actions)&&!we&&!j&&(tt||Me||Ie||Xe),merge_label:H?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ie||Xe?"\uC815\uB9AC":Me&&!Je&&!Ie?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ke?ge.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ge.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ge.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:H?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Je?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Je.label}`:Xe?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":we?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Ie?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Me?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":tt?`\uBA38\uC9C0 (${x.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:x&&x.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${x&&x.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function $o(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,doneRange:f,onDoneRangeChange:m}=t,h=n?Ln(n,i):null,E=On({transport:r,uiOrderStore:i}),k=null,T=[],B=Yp(),$=Qp(),H=Dt(f)?f:ef(),X=new Map;function U(){let p=Ht.find(v=>v.value===H);return p?p.label:"\uC624\uB298"}let O=nf(),x=!1,N=new Set,I=new Set,pe=new Set,ve="ordinary",se=!1,be=new Map,Me=[],tt=document.createElement("div");tt.className="worker-console";let Je=document.createElement("div");Je.className="worker-top";let Ie=document.createElement("div");Ie.className="worker-drawer-overlay",Ie.hidden=!0;let Xe=document.createElement("div");Xe.className="worker-drawer-overlay__backdrop";let we=document.createElement("div");we.className="worker-drawer-host",Ie.append(Xe,we);let ge=document.createElement("div");ge.className="worker-lanes-host",tt.append(Je,Ie,ge),e.appendChild(tt);let ke=null,fe=es(we,{transport:r,sessionLogStore:a,onClose:()=>{ke=null,Ie.hidden=!0,Oe()}}),W=ss(tt,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:u});function j(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:yn,queue:[],pr_wait:[],done:[]}}function he(){let p=j();return typeof p.revision=="number"?p.revision:0}function V(p){p&&p.queue&&s&&s.set(p.queue)}function Ee(){let p=j().queue;return Array.isArray(p)?p.length:0}async function M(p,v){if(!r)return;let R=await r("worker-queue-place",{bead_id:p,index:v,expected_revision:he()});V(R),R&&R.conflict&&await r("worker-queue-place",{bead_id:p,index:v,expected_revision:he()}).then(V)}async function P(p,v){if(!r)return;let R=await r("worker-queue-reorder",{bead_id:p,to_index:v,expected_revision:he()});V(R),R&&R.conflict&&await r("worker-queue-reorder",{bead_id:p,to_index:v,expected_revision:he()}).then(V)}async function ae(p){if(!r)return;let v=await r("worker-queue-remove",{bead_id:p,expected_revision:he()});V(v),v&&v.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:he()}).then(V)}async function Fe(){if(!r||se)return;let v=(Array.isArray(j().queue)?j().queue:[]).map(ce=>ce.bead_id).filter(ce=>pe.has(ce));if(v.length===0)return;if(v.some(ce=>{let de=be.get(ce);return de!==!0&&de!==!1})){Z("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let R=ve==="serial",Q=v.filter(ce=>be.get(ce)!==R);if(Q.length===0){pe.clear(),Oe(),Z("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}se=!0,Oe();let me=[],ye=0;try{for(let ce of Q){let de=await Promise.resolve(r(R?"label-add":"label-remove",{id:ce,label:vo})).catch(()=>[]),Le=Array.isArray(de)?de[0]:de,it=Le&&typeof Le=="object"?Le.labels:null;Le&&typeof Le=="object"&&Le.id===ce&&Array.isArray(it)&&bn(it)===R?ye+=1:me.push(ce)}if(me.length===0){pe.clear(),Z(`${ye}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}pe.clear();for(let ce of me)pe.add(ce);Z(`${Q.length}\uAC1C \uC911 ${ye}\uAC1C \uBCC0\uACBD \xB7 ${me.length}\uAC1C \uC2E4\uD328 (${me.join(", ")})`,"error")}finally{se=!1,Oe()}}async function Te(p){if(!r||!p)return;let v=await r("worker-attempt-pause",{attempt_id:p});v&&v.paused===!1&&v.reason&&Z(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Be(p){if(!r||!p)return;let v=async(Q={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:he(),...Q}),R=await v();V(R),R&&R.conflict&&(R=await r("worker-attempt-resume",{attempt_id:p,expected_revision:he()}),V(R)),R=await Gt(R,(Q,me)=>v({continuation:Q,decision_token:me}),{onResult:V,refresh:()=>v()}),R&&R.resumed===!1&&!R.conflict&&R.reason&&Z(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${R.reason}`,"error",2400)}async function De(p){if(!r||!p)return;let v=async(Q={})=>await r("worker-deployment-recovery-continue",{attempt_id:p,expected_revision:he(),...Q}),R=await v();V(R),R&&R.conflict&&(R=await v(),V(R)),R=await Gt(R,(Q,me)=>v({continuation:Q,decision_token:me}),{onResult:V,refresh:()=>v()}),R&&R.resumed===!1&&!R.conflict&&R.reason&&Z(`\uBCF5\uAD6C \uC774\uC5B4\uAC00\uAE30 \uAC70\uBD80: ${R.reason}`,"error",2400)}async function Ke(p){if(!r||!p)return;let v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:he()});V(v),v&&v.conflict&&(v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:he()}),V(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&Z(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function C(p,v,R=!0){if(!r)return null;let Q=r,me=await Q(p,{...v,expected_revision:he()});return V(me),me&&me.conflict&&R&&(me=await Q(p,{...v,expected_revision:he()}),V(me)),me}async function ne(p){if(!r||!p)return;let v=j().merge_queue?.find(Q=>Q.bead_id===p)?.continuation_action;if(v?.mismatch&&v.continuation===null){await A(p,v.mismatch);return}N.add(p),Oe();let R;try{R=await C("worker-merge-queue-add",{bead_id:p})}finally{N.delete(p),Oe()}!R||R.conflict||R.applied||Z("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function A(p,v){let R=await Gt({continuation_mismatch:v},(me,ye)=>C("worker-merge-queue-add",{bead_id:p,continuation:me,decision_token:ye},!1)),Q=R?.queue?.merge_queue?.find(me=>me.bead_id===p)?.continuation_action;if(R?.applied!==!0&&Q?.continuation===null&&Q.mismatch){await A(p,Q.mismatch);return}R&&R.applied===!1&&!R.conflict&&Z("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function L(p){if(!r)return;let v=await C("worker-merge-auto-toggle",{on:p});!v||v.conflict||Z(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function S(p){if(!r||!p)return;let v=await C("worker-merge-queue-remove",{bead_id:p});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&Z("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Y(){await C("worker-merge-queue-remove",{all:!0})}async function K(p,v=null,R="unmerged",Q=null){if(!r||!p)return;let me=_n(p,R);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(me)))return;let ce=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...Q?{operation_id:Q}:{},expected_revision:he()});if(V(ce),ce&&ce.conflict&&(ce=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...Q?{operation_id:Q}:{},expected_revision:he()}),V(ce)),ce&&ce.discarded===!0){Z(os(ce),"success",5e3);return}if(ce&&ce.reason){Z(`\uD3D0\uAE30 \uC2E4\uD328: ${ce.reason}`,"error",2800);return}if(ce&&ce.accepted&&ce.pending==="merged_revert"){Z("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ce&&ce.accepted&&!ce.discarded){Z(`\uD3D0\uAE30 \uC9C4\uD589: ${ce.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ce&&!ce.conflict&&Z("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function re(p,v){if(!r||!v||I.has(v))return;I.add(v),Oe();let R;try{let Q=async(me={})=>await r(p,{bead_id:v,expected_revision:he(),...me});R=await Q(),V(R),R&&R.conflict&&(R=await r(p,{bead_id:v,expected_revision:he()}),V(R)),p==="worker-revise-fix"&&(R=await Gt(R,(me,ye)=>Q({continuation:me,decision_token:ye}),{onResult:V,refresh:()=>Q()}))}finally{I.delete(v),Oe()}if(!(!R||R.conflict)){if(R.ok){Z(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}Z(`\uCC98\uBD84 \uAC70\uBD80: ${R.reason||""}`,"error",3e3)}}async function le(p){if(!r)return;let v=await r("worker-automation-toggle",{on:p,expected_revision:he()});V(v),v&&v.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:he()}).then(V)}async function Ce(p){if(!r||!Number.isFinite(p))return;let v=Math.max(yn,Math.floor(p)),R=await r("worker-queue-set-slots",{slots:v,expected_revision:he()});V(R),R&&R.conflict&&await r("worker-queue-set-slots",{slots:v,expected_revision:he()}).then(V)}async function je(p){if(!r)return;let v=await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:he()});V(v),v&&v.conflict&&await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:he()}).then(V)}function rt(){let p=j(),v=h?h.selectBoardColumn(jp,"ready"):[],R=h?h.selectBoardColumn(zp,"blocked"):[],Q=h?h.selectBoardColumn(Wp,"closed"):[],me=h?h.selectBoardColumn(Hp,"in_progress"):[],ye=new Map;for(let g of me){let q=lf(g);if(!q)continue;let te=ye.get(q);te?te.push(g):ye.set(q,[g])}let ce=g=>{let q=Dn(ye.get(g)||[]);return q?q.title||q.id:null},de=p.bead_titles||{},Le=new Map;for(let[g,q]of Object.entries(de))typeof q=="string"&&q.length>0&&Le.set(g,q);for(let g of[...v,...R])Le.set(g.id,g.title||g.id);be.clear();let it=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},ft=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{};for(let[g,q]of Object.entries(ft))Array.isArray(q)&&be.set(g,bn(q));for(let g of[...v,...R]){let q=g.labels;if(!Array.isArray(q))continue;if(!be.has(g.id)){be.set(g.id,bn(q));continue}let te=it[g.id],Ge=Xt(te&&typeof te=="object"?te.updated_at:null),zt=Xt(g.updated_at);zt!==null&&Ge!==null&&zt>Ge&&be.set(g.id,bn(q))}let St=new Map;for(let[g,q]of Object.entries(it))q&&typeof q=="object"&&St.set(g,q);for(let g of[...v,...R])St.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let vt=g=>St.get(g)||{},ue=p.pr_wait||[],b=p.pr_observations||{},z=p.pr_activity||{},ee=p.cleanup_failed||{},Ne=Object.entries(ee).map(([g,q])=>({bead_id:g,step:q&&q.step?q.step:"",reason:q&&q.reason?q.reason:"",detail:q&&typeof q.detail=="string"?q.detail:null,output_tail:q&&typeof q.output_tail=="string"&&q.output_tail?q.output_tail:void 0,log_path:q&&typeof q.log_path=="string"&&q.log_path?q.log_path:void 0,retry_count:q&&typeof q.retry_count=="number"&&Number.isInteger(q.retry_count)&&q.retry_count>0?q.retry_count:0})),Ze=p.queue||[],ie=new Set(Ze.map(g=>g.bead_id));for(let g of pe)ie.has(g)||pe.delete(g);let _=new Set([...Ze.map(g=>g.bead_id),...ue.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),d=new Set(R.map(g=>g.id)),w=i?i.get()?.order||{}:{},y=new Set,D=[];for(let g of[...v,...R])_.has(g.id)||y.has(g.id)||af(g)||El(g.labels)||(y.add(g.id),D.push(g));T=of(D,$,w);let J=p.admission||{},xe=g=>{let q=J[g];if(!q)return"";if(q.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let te=typeof q.reason=="string"?q.reason:"",Ge=te.indexOf(":");return Ge>0&&Ge<te.length-1?`\u26D4 ${te.slice(0,Ge)} (${te.slice(Ge+1)})`:`\u26D4 ${te}`},mt=T.map(g=>{let q=pn(g),te=q.path.length>0,Ge=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",zt=!Ge&&te&&!q.conflict,ar=d.has(g.id),Lt=[];ar&&Lt.push(cf(g)),Ge?Lt.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):q.conflict?Lt.push("spec_id_conflict"):te||Lt.push("spec \uC5C6\uC74C");let An=xe(g.id);return An&&Lt.push(An),{id:g.id,title:g.title||g.id,reason:Lt.join(" \xB7 "),draggable:zt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Ge,status:g.status,blocked:ar,has_spec:te}}),qe=Kp(mt,B),or=qe.visible,ls=p.revise_parked||{},zr=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},To=(g,q)=>g.map(te=>{let Ge=q==="queue"?ls[te.bead_id]:null,zt=q==="queue"?Yt(zr,te.bead_id):null,ar=zt?.operation?zt:null,Lt=q==="queue"?be.has(te.bead_id)?be.get(te.bead_id)||!1:null:!1,An=Lt===!0&&(Object.values(p.attempts||{}).some(Kt=>Kt&&Kt.bead_id!==te.bead_id&&!Gp.has(Kt.status))||ue.some(Kt=>Kt.bead_id!==te.bead_id)||Object.values(zr).some(Kt=>Kt&&Kt.bead_id!==te.bead_id&&Kt.phase!=="done")),Go=q==="done"?[]:[xe(te.bead_id)];return An&&Go.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:te.bead_id,title:Le.get(te.bead_id)||te.bead_id,reason:Go.filter(Boolean).join(" \xB7 "),draggable:q!=="done"&&!ar,done:q==="done",lane:q,selectable:q==="queue",selected:q==="queue"&&pe.has(te.bead_id),worker_serial:Lt,discard:ar,badges:Ge?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ge,revise_action:!!Ge,revise_enabled:!!Ge&&!ar&&!I.has(te.bead_id),revise_title:Ge?Ge.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ge.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:q==="done"?Ot(p.attempts||{},te.bead_id):null,done_at:q==="done"&&typeof te.added_at=="number"?te.added_at:void 0,...vt(te.bead_id)}}),Eo=new Map;for(let g of p.done)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&Eo.set(g.bead_id,g.added_at);let Hr=p.attempts?Object.values(p.attempts):[],cs=new Set;for(let g of Hr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&cs.add(g.resumed_from);let ds=new Map;for(let g of Hr)ds.set(g.bead_id,g.attempt_id);let us=new Map;for(let g of Hr)us.set(g.attempt_id,g);function ps(g){let q=new Set,te=g;for(;te&&!q.has(te.attempt_id);){if(te.conflict_resolution===!0)return!0;q.add(te.attempt_id),te=typeof te.resumed_from=="string"&&te.resumed_from.length>0&&us.get(te.resumed_from)||null}return!1}let wn=typeof p.declared_base=="string"?p.declared_base:null;function Yl(g){let q=null;for(let te of Hr)!te||te.bead_id!==g||ps(te)||(q===null||(typeof te.started_at=="number"?te.started_at:0)>=(typeof q.started_at=="number"?q.started_at:0))&&(q=te);return q&&typeof q.target_base=="string"?q.target_base:null}let Co=[],Ro=[],Vl=g=>{let q=ds.get(g.bead_id)!==g.attempt_id,te=Eo.get(g.bead_id),Ge=typeof te=="number"&&te>0&&typeof g.finished_at=="number"&&te>=g.finished_at;return!q&&!Ge&&typeof g.dismissed_at!="number"},Io=g=>{let q=typeof g.session_id=="string"&&g.session_id.length>0,te=cs.has(g.attempt_id);return{eligible:q&&!te,reason:q?te?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Pt=null;for(let g of Hr){let q=g.status==="paused"&&!cs.has(g.attempt_id);if(g.status==="running"||q)Ro.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Le.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:q,conflict_resolution:ps(g),base_exception:ko(wn,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:Yt(zr,g.bead_id,{attempt_id:g.attempt_id}),usage:Ot(p.attempts||{},g.bead_id),current_child:ce(g.bead_id),...vt(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&Vl(g)){let te=Io(g);Co.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Le.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Yt(zr,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:te.eligible,resume_reason:te.reason,conflict_resolution:ps(g),base_exception:ko(wn,g.target_base),usage:Ot(p.attempts||{},g.bead_id),current_child:ce(g.bead_id),...vt(g.bead_id)}),Pt=g}}let kn=[...Co,...Ro],Lo=null;if(Pt){let g=Io(Pt),q=Pt.cause_detail;Lo={bead_id:Pt.bead_id,repo:Pt.repo||"",reason:Pt.cause||Pt.status,cause_detail:q&&typeof q.reason=="string"?{reason:q.reason,command:typeof q.command=="string"?q.command:null}:null,resume_attempt_id:Pt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:Yt(zr,Pt.bead_id,{attempt_id:Pt.attempt_id})}}let Kl=new Set(kn.map(g=>g.bead_id)),fs=Array.isArray(p.merge_queue)?p.merge_queue:[],Do=new Map,Oo=new Map,Mo=new Map;fs.forEach((g,q)=>{g&&typeof g.bead_id=="string"&&(Do.set(g.bead_id,q+1),Oo.set(g.bead_id,g.resolution),Mo.set(g.bead_id,g.continuation_action||null))});let Po=p.merge_queue_state||{active:null,failures:{}},Zl=Po.failures||{},Xl=p.deployment_coverage&&typeof p.deployment_coverage=="object"&&!Array.isArray(p.deployment_coverage)?p.deployment_coverage:{},Ql=p.deployment&&typeof p.deployment.desired_sha=="string"?p.deployment.desired_sha:null,Jl=p.auto_merge_skips||{},No=g=>{let q=Jl[g];if(!q)return null;let te=b[g],Ge=te&&te.pr?te.pr.head_sha:null;return Ge&&Ge===q.head_sha?q.reason||"":null},$n=new Map;for(let g of kn)g.failed!==!0&&g.conflict_resolution&&(g.paused?$n.has(g.bead_id)||$n.set(g.bead_id,"paused"):$n.set(g.bead_id,"running"));let Fo=kn.filter(g=>!g.paused&&g.failed!==!0).length,qo=(p.workspace_info||{}).slots,ec=typeof qo=="number"?qo:typeof p.slots=="number"?p.slots:yn,Bo=p.pr_wait_holds_slot===!0?yn:ec,tc=Fo>Bo,xn=kr(H),rc=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>xn===void 0||typeof g.added_at!="number"||g.added_at>=xn).sort((g,q)=>(q.added_at||0)-(g.added_at||0)),Wr=To(rc,"done"),nc=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Uo=[],sc=u?.()||"";for(let g of Q){let q=Xt(g.closed_at);if(typeof g.id!="string"||nc.has(g.id)||q===null||xn!==void 0&&q<xn||typeof g.comment_count!="number"||g.comment_count<=0)continue;let te=`${sc}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Ge=X.get(te);Ge===void 0&&r&&(X.set(te,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(zt=>{let ar=Array.isArray(zt)&&zt.some(Lt=>ts(typeof Lt?.text=="string"?Lt.text:"")?.lane==="session");X.set(te,ar?"session":"not-session"),Oe()}).catch(()=>{X.set(te,"failed"),Oe()})),Ge==="session"&&Uo.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:q,created_at:g.created_at,updated_at:g.updated_at})}Wr.push(...Uo),Wr.sort((g,q)=>(q.done_at||0)-(g.done_at||0));let Sn={};for(let g of Qt)Sn[g]=0;let jo=!1,zo=0,_s=0,Ho=0;for(let g of Wr){let q=g.usage;if(q&&typeof q=="object"){let te=!1;for(let Ge of Qt)Number.isFinite(q[Ge])&&(Sn[Ge]+=q[Ge],jo=!0,te=!0);te&&(_s+=1,Number.isFinite(q.total_cost_usd)&&(zo+=q.total_cost_usd,Ho+=1))}}_s>0&&Ho===_s&&(Sn.total_cost_usd=zo);let Wo=Wr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),oc=Wo.length>0?gt(Bn(Wo)):jo?Ft(Sn):null;return{queue:p,idToTitle:Le,candidates:or,candidate_hidden:{blocked:qe.hidden_blocked,spec:qe.hidden_spec},running:kn,live_count:Fo,slots:Bo,over_cap:tc,failure:Lo,waiting:To(Ze.filter(g=>!Kl.has(g.bead_id)),"queue"),pr_wait:ue.map(g=>hf(g.bead_id,Le.get(g.bead_id)||g.bead_id,b,ee[g.bead_id]||null,Ot(p.attempts||{},g.bead_id),z[g.bead_id]||(N.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),$n.get(g.bead_id)||null,g.external===!0,{position:Do.get(g.bead_id)||0,active:Po.active===g.bead_id,failure:Zl[g.bead_id]||null,resolution:Oo.get(g.bead_id),continuation_action:Mo.get(g.bead_id)},g.wt_present!==!1,p.auto_merge===!0?No(g.bead_id):null,ko(wn,Yl(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},us.get(ds.get(g.bead_id)||"")?.worker_serial===!0,Xl[g.bead_id]||null,Ql)).map(g=>({...g,...vt(g.id)})),merge_queue_length:fs.length,merge_queue_running:fs.length>0,auto_excluded:ue.map(g=>g.bead_id).filter(g=>No(g)!==null),verify_cmd_present:!!(p.workspace_info||{}).verify_cmd,declared_base:wn,done:Wr,token_total:oc,cleanup_failures:Ne,deployment:p.deployment||null}}function ze(p){let v=p.waiting.length>0?p.waiting[0].id:"\u2014",R=l`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Q=at(p),me=p.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ye=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${U()} 완료 <b>${p.done.length}</b></span
      >`,ce=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,de=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${yn}
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
      </button>`,Le=tl({failure:p.failure,cleanupFailures:p.cleanup_failures}),it=Qi(p.deployment);return x?l`<div class="worker-ribbon">
          ${R} ${Q}
          <div class="worker-kpi worker-kpi--ribbon">${me}${ye}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${de}</div>
          <div class="worker-kpi">${ce}</div>
        </div>
        ${it}${Le}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${R}${Q}${de}</div>
        <div class="worker-kpi">
          ${me}${ye}${ce}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${U()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(ft=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${ft.tooltip}
                >${U()} 완료 · 누적 ${ft.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${it}${Le}`}function bt(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let v=p.running.some(R=>!R.paused&&R.failed!==!0);return l`<section
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
      ${p.running.length>0?fo(p.running,Date.now(),ke):""}
      ${p.pr_wait.map(R=>uo(R))}
    </section>`}function ut(p){let v=p.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${B.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Zp.map(R=>l`<button
              type="button"
              class="worker-filter__chip${B.spec===R.value?" is-active":""}"
              data-spec=${R.value}
              aria-pressed=${B.spec===R.value?"true":"false"}
            >
              ${R.label}
            </button>`)}
        ${v.spec>0?l`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function lt(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${Xp.map(p=>l`<option value=${p.value} ?selected=${$===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function yt(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${H}
      >
        ${Ht.map(p=>l`<option value=${p.value} ?selected=${H===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function It(){if(pe.size===0)return"";let p=Array.from(pe),v=p.some(R=>{let Q=be.get(R);return Q!==!0&&Q!==!1});return l`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${p.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${ve}
        ?disabled=${se}
      >
        <option value="ordinary">일반 병렬</option>
        <option value="serial">🔒 머지까지 단독</option>
      </select>
      <button
        type="button"
        class="worker-bulk__apply"
        ?disabled=${v||se}
        title=${v?"\uC120\uD0DD\uD55C \uC791\uC5C5\uC758 \uC2E4\uD589 \uBC29\uC2DD\uC744 \uD655\uC778\uD558\uB294 \uC911\uC785\uB2C8\uB2E4":se?"\uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD \uC911\uC785\uB2C8\uB2E4":"\uC120\uD0DD\uD55C \uC791\uC5C5\uC5D0 \uC801\uC6A9"}
      >
        적용
      </button>
      <span class="worker-bulk__hint">선택한 대기 작업에만 적용됩니다</span>
    </div>`}function nt(p){let v=(p.queue.pr_wait||[]).filter(ye=>ye&&ye.external!==!0&&typeof ye.bead_id=="string"),R=new Set(p.running.filter(ye=>!ye.paused&&ye.failed!==!0).map(ye=>ye.bead_id));for(let ye of v)R.add(ye.bead_id);let Q=!(p.queue.pr_wait_holds_slot!==!0||p.queue.auto_advance!==!0||p.queue.auto_merge===!0||v.length===0||p.waiting.length===0||R.size<p.slots),me=p.pr_wait.some(ye=>ye.worker_serial===!0);if(!(!Q&&!(me&&p.queue.auto_merge!==!0)))return l`${Q?l`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${me&&p.queue.auto_merge!==!0?l`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`:""}`}function at(p){let v=p.queue.auto_merge===!0;if(p.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${v?" is-active":""}"
        title=${v?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${v?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(v)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let R=new Set(p.auto_excluded),Q=p.pr_wait.filter(me=>me.merge_action&&me.merge_enabled&&!R.has(me.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title=${p.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${Q>0?` ${Q}`:""}
    </button>`}function st(p){let v=Vt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:lt(),controls:ut(p)});return x?l`<div class="worker-lanes worker-lanes--mobile">
        ${bt(p)}
        ${Vt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:l`${It()}${nt(p)}`,collapsible:!0,collapsed:O.queue,preview:Rl(p.waiting)})}
        ${v}
        ${Vt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${U()} \uC644\uB8CC \uC5C6\uC74C`,controls:yt(),collapsible:!0,collapsed:O.done,preview:Array.isArray(p.token_total)?p.token_total.map(R=>R.label).join(" \xB7 "):p.token_total||Rl(p.done)})}
      </div>`:l`<div class="worker-lanes">
      ${v}
      ${Vt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:l`${It()}${nt(p)}`})}
      ${Vt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(R=>!R.paused&&R.failed!==!0),body:fo(p.running,Date.now(),ke)})}
      ${Vt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Vt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${U()} ${p.done.length}`,items:p.done,empty:`${U()} \uC644\uB8CC \uC5C6\uC74C`,controls:yt()})}
    </div>`}function ct(p){O={...O,[p]:!O[p]},sf(O),Oe()}function Oe(){let p=rt();Ue(ze(p),Je),Ue(st(p),ge)}function F(){let p=document.querySelector(".app-header");if(!p)return;let v=()=>{let R=Math.round(p.getBoundingClientRect().height);tt.style.setProperty("--worker-ribbon-top",`${R}px`)};if(v(),typeof ResizeObserver=="function"){let R=new ResizeObserver(v);R.observe(p),Me.push(()=>R.disconnect())}else window.addEventListener("resize",v),Me.push(()=>window.removeEventListener("resize",v))}function G(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(rf);x=!!p.matches;let v=R=>{let Q=!!(R&&typeof R.matches=="boolean"?R.matches:p.matches);Q!==x&&(x=Q,Oe())};typeof p.addEventListener=="function"?(p.addEventListener("change",v),Me.push(()=>p.removeEventListener("change",v))):typeof p.addListener=="function"&&(p.addListener(v),Me.push(()=>p.removeListener(v)))}function oe(p){let v=p.target,R=v?.closest?.(".worker-mini__grip"),Q=R?R.closest('.worker-mini[data-lane="queue"]'):v?.closest?.('.worker-card[draggable="true"]');if(!Q)return;let me=Q.dataset.beadId||"",ye=Q.dataset.lane||"";k={bead_id:me,from_lane:ye};try{p.dataTransfer?.setData("text/plain",me),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function _e(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;let R=v.dataset.lane||"";R!=="candidate"&&R!=="queue"||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function $e(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Re(p,v){let R=T.find(ce=>ce.id===p);if(!R)return;let Q=T.filter(ce=>ce.id!==p),me=Q.length;if(v){let ce=v.dataset.beadId;if(ce===p)return;let de=Q.findIndex(Le=>Le.id===ce);de>=0&&(me=de)}let ye=Q.slice();ye.splice(me,0,R),E.applyReorder(p,ye,me)}function We(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;p.preventDefault(),v.classList.remove("worker-pane--drag-over");let R=v.dataset.lane||"",Q=k?.bead_id||p.dataTransfer?.getData("text/plain")||"",me=k?.from_lane||"";if(k=null,!Q)return;let ye=p.target?.closest?.(".worker-mini, .worker-card"),ce=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),de=ce.length;if(ye){let Le=ce.indexOf(ye);Le>=0&&(de=Le)}if(v.classList.contains("worker-pane--collapsed")&&(de=Ee()),R==="candidate"){if(me==="candidate"){Re(Q,ye);return}me==="queue"&&ae(Q);return}R==="queue"&&(me==="queue"?P(Q,de):M(Q,de))}function et(p){B=p,Vp(p),Oe()}function Ae(p){$=p==="board"||p==="created"||p==="spec"?p:is,Jp($),Oe()}function Ye(p){H=Dt(p)?p:Et,tf(H),m?.(H),Oe()}function Se(p){let v=p.target?.closest?.(".worker-mini__select");if(v){let it=v.dataset.beadId||"";it&&(v.checked?pe.add(it):pe.delete(it),Oe());return}let R=p.target?.closest?.(".worker-bulk__mode");if(R){ve=R.value==="serial"?"serial":"ordinary";return}let Q=p.target?.closest?.(".worker-filter__blocked");if(Q){et({...B,show_blocked:Q.checked});return}let me=p.target?.closest?.(".worker-done-range");if(me){Ye(me.value);return}let ye=p.target?.closest?.(".worker-sort");if(ye){Ae(ye.value||is);return}let ce=p.target?.closest?.(".worker-pr-wait-hold");if(ce){je(ce.checked);return}let de=p.target?.closest?.(".worker-slots__input");if(!de)return;let Le=Number.parseInt(de.value,10);if(!Number.isFinite(Le)){Oe();return}Ce(Le).then(Oe)}function pt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function ht(p){let v=j(),R=v.attempts?v.attempts[p]:null;ke=p,Ie.hidden=!1,fe.open({attempt_id:p,meta:pt(R)}),Oe()}function sr(){if(!ke)return;let p=j(),v=p.attempts?p.attempts[ke]:null;if(v){fe.updateMeta(pt(v));return}fe.close()}function jt(p){let v=p.target,R=v?.closest?.(".worker-bulk__apply");if(R){R.disabled||Fe();return}if(v?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip")||v?.closest?.("#worker-exec-defaults-dialog"))return;if(v?.closest?.(".worker-exec-defaults-btn")){W.open();return}if(v?.closest?.(".worker-deployment-retry")){r&&Promise.resolve(r("worker-deployment-retry",{})).then(V);return}let Q=v?.closest?.(".worker-deployment-session");if(Q){let ie=Q.dataset.attemptId;ie&&ht(ie);return}let me=v?.closest?.(".worker-deployment-continue");if(me){let ie=me.dataset.attemptId;ie&&De(ie);return}let ye=v?.closest?.(".worker-banner__resume");if(ye){let ie=ye.dataset.attemptId;ie&&Be(ie);return}let ce=v?.closest?.(".worker-banner__discard");if(ce){let ie=ce.dataset.confirmation==="merged"?"merged":"unmerged";K(ce.dataset.beadId||"",ce.dataset.attemptId||null,ie,ce.dataset.operationId||null);return}let de=v?.closest?.(".worker-banner__dismiss");if(de){let ie=de.dataset.attemptId;ie&&Ke(ie);return}if(v?.closest?.(".worker-play")){le(!j().auto_advance);return}let Le=v?.closest?.(".worker-merge-all");if(Le){Le.classList.contains("worker-merge-all--stop")?j().auto_merge===!0?L(!1):Y():L(!0);return}let it=v?.closest?.(".worker-pane__hd--toggle");if(it){let ie=it.dataset.lane;(ie==="queue"||ie==="done")&&ct(ie);return}let ft=v?.closest?.(".worker-card__place");if(ft){let ie=ft.dataset.beadId;ie&&!ft.disabled&&M(ie,Ee());return}let St=v?.closest?.(".worker-filter__chip");if(St){let ie=St.dataset.spec;(ie==="all"||ie==="with"||ie==="without")&&et({...B,spec:ie});return}let vt=v?.closest?.(".worker-mini__merge");if(vt){ne(vt.dataset.beadId||"");return}let ue=v?.closest?.(".worker-mini__merge-cancel");if(ue){S(ue.dataset.beadId||"");return}let b=v?.closest?.(".worker-mini__discard");if(b){K(b.dataset.beadId||"",b.dataset.attemptId||null,b.dataset.discardMode==="merged"?"merged":"unmerged",b.dataset.operationId||null);return}let z=v?.closest?.(".worker-mini__revise-fix");if(z){re("worker-revise-fix",z.dataset.beadId||"");return}let ee=v?.closest?.(".worker-mini__revise-approve");if(ee){re("worker-revise-approve",ee.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let ie=v?.closest?.(".rtile"),_=ie?.dataset?.beadId,d=ie?.dataset?.attemptId;_&&K(_,d||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let _=v?.closest?.(".rtile")?.dataset?.attemptId;_&&Ke(_);return}if(v?.closest?.(".rtile__pause")){let _=v?.closest?.(".rtile")?.dataset?.attemptId;_&&Te(_);return}if(v?.closest?.(".rtile__resume")){let _=v?.closest?.(".rtile")?.dataset?.attemptId;_&&Be(_);return}if(v?.closest?.(".rtile__session")){let _=v?.closest?.(".rtile")?.dataset?.attemptId;_&&ht(_);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){fe.close();return}if(v?.closest?.(".worker-drawer-host"))return;let Ne=v?.closest?.(".rtile");if(Ne){if(v?.closest?.(".rtile__id")){let _=Ne.dataset.beadId;_&&Sr(_).then(d=>{d?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ie=Ne.dataset.beadId;ie&&c&&c(ie);return}let Ze=v?.closest?.(".worker-mini, .worker-card");if(Ze){let ie=Ze.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){ie&&Sr(ie).then(_=>{_?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ie&&c&&c(ie)}}return e.addEventListener("dragstart",oe),e.addEventListener("dragover",_e),e.addEventListener("dragleave",$e),e.addEventListener("drop",We),e.addEventListener("click",jt),e.addEventListener("change",Se),G(),F(),h&&Me.push(h.subscribe(()=>{for(let[p,v]of X)v==="failed"&&X.delete(p);Oe()})),s&&Me.push(s.subscribe(()=>{Oe(),sr()})),Oe(),{load(){Oe()},openExecDefaults(){W.open()},destroy(){for(let p of Me.splice(0))try{p()}catch{}e.removeEventListener("dragstart",oe),e.removeEventListener("dragover",_e),e.removeEventListener("dragleave",$e),e.removeEventListener("drop",We),e.removeEventListener("click",jt),e.removeEventListener("change",Se);try{fe.destroy()}catch{}Ie.hidden=!0;try{W.destroy()}catch{}Ue(l``,e)}}}function xo(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Pl(e,t,r,n=async()=>{},s=async()=>{}){let o=ot("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function f(x){let I=x.target.value,ve=t.getState().workspace?.current?.path||"";if(I&&I!==ve){o("switching workspace to %s",I),i=!0,O();try{await r(I)}catch(se){o("workspace switch failed: %o",se)}finally{i=!1,O()}}}async function m(){let x=t.getState(),N=x.workspace?.current?.path||x.workspace?.available?.[0]?.path||"";if(!(!N||c)){o("git-pulling workspace %s",N),c=!0,O();try{await n(N)}catch(I){o("workspace git pull failed: %o",I)}finally{c=!1,O()}}}function h(x){let N=x.target;N&&e.contains(N)||T()}function E(x){x.key==="Escape"&&T()}function k(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",E),O())}function T(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",E),O())}function B(){u?T():k()}async function $(x){let N=x.target,I=N.value,pe=N.checked;o("toggling visibility %s \u2192 %s",I,String(pe));try{await s(I,pe)}catch(ve){o("workspace visibility toggle failed: %o",ve)}}function H(x){return x?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${i||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function X(x,N){return l`
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
        ${u?l`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${x.map(I=>l`
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
                        >${xo(I.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function U(){let x=t.getState(),N=x.workspace?.current,I=x.workspace?.available||[],pe=new Set(x.workspace?.hidden||[]),ve=N?.path||I[0]?.path||"";if(I.length===0)return l``;let se=I.filter(be=>!pe.has(be.path)||be.path===ve);if(se.length<=1){let be=se[0]||I[0],Me=xo(be.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${be.path}"
            >${Me}</span
          >
          ${X(I,pe)}
          ${H(ve)}
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
          ${se.map(be=>l`
              <option
                value="${be.path}"
                ?selected=${be.path===ve}
                title="${be.path}"
              >
                ${xo(be.path)}
              </option>
            `)}
        </select>
        ${X(I,pe)}
        ${H(ve)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){Ue(U(),e)}return O(),a=t.subscribe(()=>O()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",E),Ue(l``,e)}}}var Nl=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-queue-set-slots","worker-deployment-retry","worker-deployment-recovery-continue","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function So(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Fl(e,t,r=So()){return{id:r,type:e,payload:t}}function ql(e={}){let t=ot("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,f=[],m=new Map,h=new Set;function E(U){for(let O of Array.from(h))try{O(U)}catch{}}function k(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),E(o);let U=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),O=(r.jitterRatio||0)*U,x=Math.max(0,Math.round(U+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",x,a+1),i=setTimeout(()=>{i=null,X()},x)}function T(U){try{s?.send(JSON.stringify(U))}catch(O){t("ws send failed",O)}}function B(){for(o="open",t("ws open"),E(o),a=0;f.length;){let U=f.shift();U&&T(U)}}function $(U){let O;try{O=JSON.parse(String(U.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let N=u.get(O.id);u.delete(O.id),O.ok?N?.resolve(O.payload):N?.reject(O.error||new Error("ws error"));return}let x=m.get(O.type);if(x&&x.size>0)for(let N of Array.from(x))try{N(O.payload)}catch(I){t("ws event handler error",I)}else t("ws received unhandled message type: %s",O.type)}function H(){o="closed",t("ws closed"),E(o);for(let[U,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(U);a+=1,k()}function X(){if(!c)return;let U=n();try{s=new WebSocket(U),t("ws connecting %s",U),o="connecting",E(o),s.addEventListener("open",B),s.addEventListener("message",$),s.addEventListener("error",()=>{}),s.addEventListener("close",H)}catch(O){t("ws connect failed %o",O),k()}}return X(),{send(U,O){if(!Nl.includes(U))return Promise.reject(new Error(`unknown message type: ${U}`));let x=So(),N=Fl(U,O,x);return t("send %s id=%s",U,x),new Promise((I,pe)=>{u.set(x,{resolve:I,reject:pe,type:U}),s&&s.readyState===s.OPEN?T(N):(t("queue %s id=%s (state=%s)",U,x,o),f.push(N))})},on(U,O){m.has(U)||m.set(U,new Set);let x=m.get(U);return x?.add(O),()=>{x?.delete(O)}},onConnection(U){return h.add(U),()=>{h.delete(U)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,X()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function bf(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function yf(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Ao=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Bl=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],gr="tab:worker:closed",vf="bdui.worker.done-range",Ul=bl,jl="worker:queue",zl="ui:order",Hl="ui:display-policy",Wl="exec:presets",hr="tab:board:closed",Gl="beads-ui.board.closed-range";function wf(e){let t=ot("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ue(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&Tl(s),o&&a&&i&&c){let we=function(_,d){let w="Request failed",y="";if(_&&typeof _=="object"){let J=_;if(typeof J.message=="string"&&J.message.length>0&&(w=J.message),typeof J.details=="string")y=J.details;else if(J.details&&typeof J.details=="object")try{y=JSON.stringify(J.details,null,2)}catch{y=""}}else typeof _=="string"&&_.length>0&&(w=_);let D=d&&d.length>0?`Failed to load ${d}`:"Request failed";Xe.open(D,w,y)},A=function(_){return`${de.getState().workspace.current?.path||""}\0${_}`},L=function(){ae&&(ae().catch(()=>{}),ae=null),Fe=null,Te=null},Y=function(_){Be=_;let d=()=>{Be!==_||de.getState().selected_id!==_||(Be=null,S(_))};if(!C){Ke.then(d);return}d()},Ce=function(_,d,w,y,D){return w!==le[d]?(D().catch(()=>{}),!1):(_.set(y,D),!0)},je=function(){let _=de.getState();lt(_.view==="board"),ct(_.view==="worker"),_e(_.view==="monitor"),F(_.view==="board"||_.view==="worker"||!!_.selected_id)},bt=function(){let _=kr(rt);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},ut=function(){let _=kr(ze);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},lt=function(_){if(_)for(let[d,w]of Ao){if(K.has(d)||re.has(d))continue;let y=d===hr?bt():{type:w};try{W.register(d,y)}catch(xe){t("register %s store failed: %o",d,xe)}re.add(d);let D=le.board,J=!1;fe.subscribeList(d,y).then(xe=>{J=!Ce(K,"board",D,d,xe)}).catch(xe=>{t("subscribe %s failed: %o",d,xe),we(xe,"board")}).finally(()=>{re.delete(d),J&&je()})}else nt()},nt=function(){le.board+=1;for(let[_]of Ao){let d=K.get(_);d&&(d().catch(()=>{}),K.delete(_));try{W.unregister(_)}catch(w){t("unregister %s failed: %o",_,w)}}},ct=function(_){if(!_){Oe();return}for(let[d,w]of Bl){if(at.has(d)||re.has(d))continue;let y=d===gr?ut():{type:w};try{W.register(d,y)}catch(xe){t("register %s store failed: %o",d,xe)}re.add(d);let D=le.worker,J=!1;fe.subscribeList(d,y).then(xe=>{J=!Ce(at,"worker",D,d,xe)}).catch(xe=>{t("subscribe %s failed: %o",d,xe),we(xe,"worker")}).finally(()=>{re.delete(d),J&&je()})}},Oe=function(){le.worker+=1;for(let[_]of Bl){let d=at.get(_);d&&(d().catch(()=>{}),at.delete(_));try{W.unregister(_)}catch(w){t("unregister %s failed: %o",_,w)}}},F=function(_){if(!_){G();return}st||(ke("subscribe-worker-queue",{id:jl}).catch(d=>{t("subscribe-worker-queue failed: %o",d)}),st=()=>ke("unsubscribe-worker-queue",{id:jl}))},G=function(){st&&(st().catch(()=>{}),st=null)},_e=function(_){if(!_){$e();return}oe||(ke("subscribe-monitor-pipeline",{id:Ul}).catch(d=>{t("subscribe-monitor-pipeline failed: %o",d)}),oe=()=>ke("unsubscribe-monitor-pipeline",{id:Ul}))},$e=function(){oe&&(oe().catch(()=>{}),oe=null)},We=function(){Re||(ke("subscribe-ui-order",{id:zl}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),Re=()=>ke("unsubscribe-ui-order",{id:zl}))},et=function(){Re&&(Re().catch(()=>{}),Re=null),V.clear()},Ye=function(){Ae||(ke("subscribe-display-policy",{id:Hl}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),Ae=()=>ke("unsubscribe-display-policy",{id:Hl}))},Se=function(){Ae&&(Ae().catch(()=>{}),Ae=null),Ee.clear()},ht=function(){pt||(ke("subscribe-exec-presets",{id:Wl}).catch(_=>{t("subscribe-exec-presets failed: %o",_)}),pt=()=>ke("unsubscribe-exec-presets",{id:Wl}))},Q=function(_){if(!_)return"Unknown";let d=_.split("/").filter(Boolean);return d.length>0?d[d.length-1]:"Unknown"};var u=we,f=A,m=L,h=Y,E=Ce,k=je,T=bt,B=ut,$=lt,H=nt,X=ct,U=Oe,O=F,x=G,N=_e,I=$e,pe=We,ve=et,se=Ye,be=Se,Me=ht,tt=Q;let Je=document.getElementById("header-loading"),Ie=Ta(Je),Xe=Ki(e),ge=ql(),ke=Ie.wrapSend((_,d)=>ge.send(_,d)),fe=va(ke),W=wa(),j=$a(),he=oa(),V=ka(),Ee=na(),M=sa(),P=aa();ge.on("exec-presets-snapshot",_=>{let d=_;d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&M.set({revision:d.revision,presets:d.presets})}),ge.on("monitor-pipeline-snapshot",_=>{let d=_;if(!(!d||!Array.isArray(d.workspaces)))try{he.set(d.workspaces,d.workspaces_state)}catch{}}),ge.on("ui-order-snapshot",_=>{let d=_;if(d&&typeof d.revision=="number")try{V.set({revision:d.revision,order:d.order&&typeof d.order=="object"?d.order:{}})}catch{}}),ge.on("display-policy-snapshot",_=>{let d=_;if(d&&d.policy&&typeof d.policy=="object")try{Ee.set(d.policy)}catch{}}),ge.on("session-log-snapshot",_=>{let d=_;if(d&&typeof d.attempt_id=="string")try{P.set(d.attempt_id,Array.isArray(d.lines)?d.lines:[],typeof d.last_event_at=="number"?d.last_event_at:null)}catch{}}),ge.on("session-log-append",_=>{let d=_;if(d&&typeof d.attempt_id=="string")try{P.append(d.attempt_id,d.event)}catch{}}),ge.on("snapshot",_=>{let d=_,w=d&&typeof d.id=="string"?d.id:"",y=w?W.getStore(w):null;if(y&&d&&d.type==="snapshot")try{y.applyPush(d)}catch{}}),ge.on("upsert",_=>{let d=_,w=d&&typeof d.id=="string"?d.id:"",y=w?W.getStore(w):null;if(y&&d&&d.type==="upsert")try{y.applyPush(d)}catch{}}),ge.on("delete",_=>{let d=_,w=d&&typeof d.id=="string"?d.id:"",y=w?W.getStore(w):null;if(y&&d&&d.type==="delete")try{y.applyPush(d)}catch{}});let ae=null,Fe=null,Te=null,Be=null,De=()=>{},Ke=new Promise(_=>{De=()=>_(void 0)}),C=!1,ne=!1;async function S(_){let d=A(_);if(d===Fe||d===Te)return;Te=d;let w=`detail:${_}`,y={type:"issue-detail",params:{id:_}};try{W.register(w,y)}catch(D){t("register detail store failed: %o",D)}try{let D=await fe.subscribeList(w,y);if(de.getState().selected_id!==_||A(_)!==d){await D().catch(()=>{});return}ae&&await ae().catch(()=>{}),ae=D,Fe=d}catch(D){t("detail subscribe failed: %o",D),we(D,"issue details")}finally{Te===d&&(Te=null)}}let K=new Map,re=new Set,le={board:0,worker:0},rt=Et;try{let _=window.localStorage.getItem(Gl);Dt(_)&&(rt=_)}catch{}let ze=Et;try{let _=window.localStorage.getItem(vf);Dt(_)&&(ze=_)}catch{}async function yt(_){if(!Dt(_)||_===rt)return;rt=_;try{window.localStorage.setItem(Gl,_)}catch{}let d=K.get(hr);if(!d)return;K.delete(hr),await d().catch(()=>{});let w=bt();try{W.register(hr,w)}catch(y){t("register %s store failed: %o",hr,y)}try{let y=await fe.subscribeList(hr,w);K.set(hr,y)}catch(y){t("re-subscribe %s failed: %o",hr,y),we(y,"board")}}async function It(_){if(!Dt(_)||_===ze)return;ze=_;let d=at.get(gr);if(!d)return;at.delete(gr),await d().catch(()=>{});let w=ut();try{W.register(gr,w)}catch(y){t("register %s store failed: %o",gr,y)}try{let y=await fe.subscribeList(gr,w);at.set(gr,y)}catch(y){t("re-subscribe %s failed: %o",gr,y),we(y,"worker")}}let at=new Map,st=null,oe=null,Re=null,Ae=null,pt=null;async function sr(){Ae=null,Ee.clear(),pt=null,M.clear(),st=null,oe=null,K.clear(),at.clear(),le.board+=1,le.worker+=1,ht();let _=de.getState().workspace.current?.path;if(_)try{await ge.send("set-workspace",{path:_})}catch(w){t("workspace restore after reconnect failed: %o",w);return}Ye();let d=de.getState();lt(d.view==="board"),ct(d.view==="worker"),_e(d.view==="monitor"),F(d.view==="board"||d.view==="worker"||!!d.selected_id)}async function jt(){t("clearing all subscriptions for workspace switch"),nt(),Oe(),G(),j.clear(),et(),We(),Se(),Ye(),L();let _=de.getState();if(_.selected_id)try{W.unregister(`detail:${_.selected_id}`)}catch{}let d=de.getState();lt(d.view==="board"),ct(d.view==="worker"),_e(d.view==="monitor"),F(d.view==="board"||d.view==="worker"||!!d.selected_id),d.selected_id&&Y(d.selected_id)}async function p(_){t("requesting workspace switch to %s",_),ne=!0;try{let d=await ge.send("set-workspace",{path:_});t("workspace switch result: %o",d),d&&d.workspace&&(de.setState({workspace:{current:{path:d.workspace.root_dir,database:d.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),d.changed&&(await jt(),Z("Switched to "+Q(_),"success",2e3)))}catch(d){throw t("workspace switch failed: %o",d),Z("Failed to switch workspace","error",3e3),d}finally{ne=!1}}async function v(_){t("requesting workspace git pull for %s",_);try{let d=await ge.send("git-pull-workspace",{});t("workspace git pull result: %o",d);let w=d?.status;if(w==="up_to_date"){Z("Already up to date","success",2e3);return}if(w==="stash_pop_conflict"){Z("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Z("Git pulled "+Q(_),"success",2e3)}catch(d){t("workspace git pull failed: %o",d);let w=d?.code,y=d?.message;if(w==="rebase_conflict"){Z("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(w==="rebase_conflict_abort_failed"){Z("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(w==="busy"){Z("Git pull skipped: another operation is running","warning",3e3);return}let D=y?`: ${y}`:"";throw Z(`Git pull failed${D}`,"error",3e3),d}}async function R(_,d){t("setting workspace visibility %s \u2192 %s",_,String(d));try{await ge.send("set-workspace-visibility",{path:_,visible:d}),await me()}catch(w){t("workspace visibility update failed: %o",w),Z("Failed to update project visibility","error",3e3)}}async function me(){try{let _=await ge.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let d=_.workspaces.map(J=>({path:J.path,database:J.database,pid:J.pid,version:J.version})),w=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,y=Array.isArray(_.hidden)?_.hidden.filter(J=>typeof J=="string"):[];de.setState({workspace:{current:w,available:d,hidden:y}});let D=window.localStorage.getItem("beads-ui.workspace");D&&(!d.some(xe=>xe.path===D)||y.includes(D)?window.localStorage.removeItem("beads-ui.workspace"):w&&D!==w.path&&(t("restoring saved workspace preference: %s",D),await p(D)))}}catch(_){t("failed to load workspaces: %o",_)}}ge.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(de.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),me(),jt())});let ye=!1;if(typeof ge.onConnection=="function"){let _=d=>{t("ws state %s",d),d==="reconnecting"||d==="closed"?(ye=!0,Z("Connection lost. Reconnecting\u2026","error",4e3)):d==="open"&&ye&&(ye=!1,Z("Reconnected","success",2200),yf(de,(w,y)=>{t(`${w}: %o`,y)}),sr())};ge.onConnection(_)}let ce="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(ce=_)}catch(_){t("view parse error: %o",_)}let de=Aa({config:bf(),view:ce});ge.on("worker-queue-snapshot",_=>{let d=_;if(!d||!d.queue)return;let w=de.getState().workspace.current?.path;if(typeof w=="string"&&w.length>0&&d.root_dir!==w){t("dropping worker-queue snapshot for %s",String(d.root_dir));return}try{let y=d.queue?.deployment?.notifications;if(Array.isArray(y))for(let D of y)D&&typeof D.key=="string"&&typeof D.text=="string"&&(D.variant==="success"||D.variant==="warning"||D.variant==="info")&&Ea(D.key,D.text,D.variant);j.set(d.queue)}catch{}});let Le=xa(de);Le.start();let it=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),ft=async(_,d)=>{try{return await ke(_,d)}catch(w){if(it.has(_))throw w;return[]}};n&&vl(n,de,Le);let St=document.getElementById("workspace-picker");St&&Pl(St,de,p,v,R);let vt=xl(e,(_,d)=>ke(_,d));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>vt.open())}catch{}let ue=Vi(e,{policyStore:Ee,transport:(_,d)=>ke(_,d),labelOptions:()=>{let _=new Set;for(let[d]of Ao)for(let w of W.snapshotFor(d)||[]){let y=w.labels;if(Array.isArray(y))for(let D of y)typeof D=="string"&&D.length>0&&_.add(D)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>ue.open())}catch{}let b=Na(o,{gotoIssue:_=>Le.gotoIssue(_),issueStores:W,transport:ft,workerQueueStore:j,uiOrderStore:V,displayPolicyStore:Ee,closedRange:rt,onClosedRangeChange:_=>{yt(_)},onNewIssue:()=>vt.open()}),z=$o(a,{transport:ft,issueStores:W,queueStore:j,execPresetStore:M,sessionLogStore:P,uiOrderStore:V,gotoIssue:_=>de.setState({selected_id:_}),getWorkspacePath:()=>de.getState().workspace.current?.path,doneRange:ze,onDoneRangeChange:_=>{It(_)}}),ee=yl(i,{transport:ft,pipelineStore:he,execPresetStore:M,gotoIssue:_=>Le.gotoIssue(_),getWorkspacePath:()=>de.getState().workspace.current?.path,switchWorkspace:_=>p(_)}),Ne=Gi(c,{issueStores:W,transport:ft,queueStore:j,execPresetStore:M,sessionLogStore:P,getWorkspacePath:()=>de.getState().workspace.current?.path,onNavigate:_=>{de.getState().view==="worker"?de.setState({selected_id:_}):Le.gotoIssue(_)},onClose:()=>{let _=de.getState();de.setState({selected_id:null});try{Le.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{de.setState({selected_id:null}),Le.gotoView("worker"),z.openExecDefaults()}}),Ze=de.getState().selected_id;Ze&&(c.hidden=!1,Ne.load(Ze),Y(Ze)),de.subscribe(_=>{let d=_.selected_id;d?(c.hidden=!1,Ne.load(d),ne||Y(d)):(Ne.clear(),c.hidden=!0,L())});let ie=_=>{o.hidden=_.view!=="board",a.hidden=_.view!=="worker",i.hidden=_.view!=="monitor",lt(_.view==="board"),ct(_.view==="worker"),_e(_.view==="monitor"),F(_.view==="board"||_.view==="worker"||!!_.selected_id),!_.selected_id&&_.view==="board"&&b.load(),_.view==="worker"&&z.load(),_.view==="monitor"?ee.load():ee.pause(),window.localStorage.setItem("beads-ui.view",_.view)};de.subscribe(ie),ie(de.getState()),We(),Ye(),ht(),me().finally(()=>{C=!0,De()}),window.addEventListener("keydown",_=>{let d=_.ctrlKey||_.metaKey,w=String(_.key||"").toLowerCase(),y=_.target,D=y&&y.tagName?String(y.tagName).toLowerCase():"",J=D==="input"||D==="textarea"||D==="select"||y&&typeof y.isContentEditable=="boolean"&&y.isContentEditable;d&&w==="n"&&(J||(_.preventDefault(),vt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&wf(t)});export{wf as bootstrap,bf as readBootstrapConfig,yf as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
