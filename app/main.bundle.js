var sc=Object.create;var _s=Object.defineProperty;var oc=Object.getOwnPropertyDescriptor;var ac=Object.getOwnPropertyNames;var ic=Object.getPrototypeOf,lc=Object.prototype.hasOwnProperty;var cc=(e,t,r)=>t in e?_s(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var ms=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var dc=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of ac(t))!lc.call(e,s)&&s!==r&&_s(e,s,{get:()=>t[s],enumerable:!(n=oc(t,s))||n.enumerable});return e};var uc=(e,t,r)=>(r=e!=null?sc(ic(e)):{},dc(t||!e||!e.__esModule?_s(r,"default",{value:e,enumerable:!0}):r,e));var Ze=(e,t,r)=>cc(e,typeof t!="symbol"?t+"":t,r);var aa=ms((Tf,oa)=>{var Ir=1e3,Lr=Ir*60,Or=Lr*60,$r=Or*24,gc=$r*7,hc=$r*365.25;oa.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return bc(e);if(r==="number"&&isFinite(e))return t.long?vc(e):yc(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function bc(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*hc;case"weeks":case"week":case"w":return r*gc;case"days":case"day":case"d":return r*$r;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Or;case"minutes":case"minute":case"mins":case"min":case"m":return r*Lr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Ir;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function yc(e){var t=Math.abs(e);return t>=$r?Math.round(e/$r)+"d":t>=Or?Math.round(e/Or)+"h":t>=Lr?Math.round(e/Lr)+"m":t>=Ir?Math.round(e/Ir)+"s":e+"ms"}function vc(e){var t=Math.abs(e);return t>=$r?Tn(e,t,$r,"day"):t>=Or?Tn(e,t,Or,"hour"):t>=Lr?Tn(e,t,Lr,"minute"):t>=Ir?Tn(e,t,Ir,"second"):e+" ms"}function Tn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var la=ms((Ef,ia)=>{function wc(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=i,r.humanize=aa(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let m=0;for(let h=0;h<f.length;h++)m=(m<<5)-m+f.charCodeAt(h),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(f){let m,h=null,E,T;function R(...U){if(!R.enabled)return;let $=R,G=Number(new Date),X=G-(m||G);$.diff=X,$.prev=m,$.curr=G,m=G,U[0]=r.coerce(U[0]),typeof U[0]!="string"&&U.unshift("%O");let j=0;U[0]=U[0].replace(/%([a-zA-Z%])/g,(x,N)=>{if(x==="%%")return"%";j++;let I=r.formatters[N];if(typeof I=="function"){let de=U[j];x=I.call($,de),U.splice(j,1),j--}return x}),r.formatArgs.call($,U),($.log||r.log).apply($,U)}return R.namespace=f,R.useColors=r.useColors(),R.color=r.selectColor(f),R.extend=n,R.destroy=r.destroy,Object.defineProperty(R,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(E!==r.namespaces&&(E=r.namespaces,T=r.enabled(f)),T),set:U=>{h=U}}),typeof r.init=="function"&&r.init(R),R}function n(f,m){let h=r(this.namespace+(typeof m>"u"?":":m)+f);return h.log=this.log,h}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let m=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of m)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(f,m){let h=0,E=0,T=-1,R=0;for(;h<f.length;)if(E<m.length&&(m[E]===f[h]||m[E]==="*"))m[E]==="*"?(T=E,R=h,E++):(h++,E++);else if(T!==-1)E=T+1,R++,h=R;else return!1;for(;E<m.length&&m[E]==="*";)E++;return E===m.length}function a(){let f=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),f}function i(f){for(let m of r.skips)if(o(f,m))return!1;for(let m of r.names)if(o(f,m))return!0;return!1}function c(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}ia.exports=wc});var ca=ms((At,En)=>{At.formatArgs=$c;At.save=xc;At.load=Sc;At.useColors=kc;At.storage=Ac();At.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();At.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function kc(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function $c(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+En.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}At.log=console.debug||console.log||(()=>{});function xc(e){try{e?At.storage.setItem("debug",e):At.storage.removeItem("debug")}catch{}}function Sc(){let e;try{e=At.storage.getItem("debug")||At.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Ac(){try{return localStorage}catch{}}En.exports=la()(At);var{formatters:Tc}=En.exports;Tc.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Yr=globalThis,An=Yr.trustedTypes,Wo=An?An.createPolicy("lit-html",{createHTML:e=>e}):void 0,Xo="$lit$",ir=`lit$${Math.random().toFixed(9).slice(2)}$`,Qo="?"+ir,pc=`<${Qo}>`,vr=document,Vr=()=>vr.createComment(""),Kr=e=>e===null||typeof e!="object"&&typeof e!="function",ks=Array.isArray,fc=e=>ks(e)||typeof e?.[Symbol.iterator]=="function",gs=`[ 	
\f\r]`,Gr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Go=/-->/g,Yo=/>/g,br=RegExp(`>|${gs}(?:([^\\s"'>=/]+)(${gs}*=${gs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Vo=/'/g,Ko=/"/g,Jo=/^(?:script|style|textarea|title)$/i,$s=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=$s(1),Zt=$s(2),vf=$s(3),wr=Symbol.for("lit-noChange"),dt=Symbol.for("lit-nothing"),Zo=new WeakMap,yr=vr.createTreeWalker(vr,129);function ea(e,t){if(!ks(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Wo!==void 0?Wo.createHTML(t):t}var _c=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Gr;for(let i=0;i<r;i++){let c=e[i],u,f,m=-1,h=0;for(;h<c.length&&(a.lastIndex=h,f=a.exec(c),f!==null);)h=a.lastIndex,a===Gr?f[1]==="!--"?a=Go:f[1]!==void 0?a=Yo:f[2]!==void 0?(Jo.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=br):f[3]!==void 0&&(a=br):a===br?f[0]===">"?(a=s??Gr,m=-1):f[1]===void 0?m=-2:(m=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?br:f[3]==='"'?Ko:Vo):a===Ko||a===Vo?a=br:a===Go||a===Yo?a=Gr:(a=br,s=void 0);let E=a===br&&e[i+1].startsWith("/>")?" ":"";o+=a===Gr?c+pc:m>=0?(n.push(u),c.slice(0,m)+Xo+c.slice(m)+ir+E):c+ir+(m===-2?i:E)}return[ea(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Zr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,f]=_c(t,r);if(this.el=e.createElement(u,n),yr.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=yr.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(Xo)){let h=f[a++],E=s.getAttribute(m).split(ir),T=/([.?@])?(.*)/.exec(h);c.push({type:1,index:o,name:T[2],strings:E,ctor:T[1]==="."?bs:T[1]==="?"?ys:T[1]==="@"?vs:Rr}),s.removeAttribute(m)}else m.startsWith(ir)&&(c.push({type:6,index:o}),s.removeAttribute(m));if(Jo.test(s.tagName)){let m=s.textContent.split(ir),h=m.length-1;if(h>0){s.textContent=An?An.emptyScript:"";for(let E=0;E<h;E++)s.append(m[E],Vr()),yr.nextNode(),c.push({type:2,index:++o});s.append(m[h],Vr())}}}else if(s.nodeType===8)if(s.data===Qo)c.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(ir,m+1))!==-1;)c.push({type:7,index:o}),m+=ir.length-1}o++}}static createElement(t,r){let n=vr.createElement("template");return n.innerHTML=t,n}};function Cr(e,t,r=e,n){if(t===wr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Kr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Cr(e,s._$AS(e,t.values),s,n)),t}var hs=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??vr).importNode(r,!0);yr.currentNode=s;let o=yr.nextNode(),a=0,i=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Xr(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new ws(o,this,t)),this._$AV.push(u),c=n[++i]}a!==c?.index&&(o=yr.nextNode(),a++)}return yr.currentNode=vr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Xr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=dt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Cr(this,t,r),Kr(t)?t===dt||t==null||t===""?(this._$AH!==dt&&this._$AR(),this._$AH=dt):t!==this._$AH&&t!==wr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):fc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==dt&&Kr(this._$AH)?this._$AA.nextSibling.data=t:this.T(vr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Zr.createElement(ea(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new hs(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Zo.get(t.strings);return r===void 0&&Zo.set(t.strings,r=new Zr(t)),r}k(t){ks(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Vr()),this.O(Vr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Rr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=dt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=dt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Cr(this,t,r,0),a=!Kr(t)||t!==this._$AH&&t!==wr,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Cr(this,i[n+c],r,c),u===wr&&(u=this._$AH[c]),a||(a=!Kr(u)||u!==this._$AH[c]),u===dt?t=dt:t!==dt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===dt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},bs=class extends Rr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===dt?void 0:t}},ys=class extends Rr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==dt)}},vs=class extends Rr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Cr(this,t,r,0)??dt)===wr)return;let n=this._$AH,s=t===dt&&n!==dt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==dt&&(n===dt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ws=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Cr(this,t)}};var mc=Yr.litHtmlPolyfillSupport;mc?.(Zr,Xr),(Yr.litHtmlVersions??(Yr.litHtmlVersions=[])).push("3.3.1");var Ue=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Xr(t.insertBefore(Vr(),o),o,void 0,r??{})}return s._$AI(e),s};var Et="today",Ht=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ot(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function kr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ta(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ra(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function na(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function sa(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var da=uc(ca(),1);function st(e){return(0,da.default)(`beads-ui:${e}`)}function Nt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function xr(e,t){let r=Nt(e.created_at),n=Nt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function fa(e,t){let r=Nt(e.created_at),n=Nt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function _a(e,t){let r=Nt(e.updated_at),n=Nt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function ma(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Nt(e.created_at),o=Nt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ga(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Ec=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ua(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function pa(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Ec.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ha(e,t){let r=ua(e),n=ua(t);if(r!==n)return r<n?-1:1;let s=pa(e),o=pa(t);if(s!==o)return s<o?-1:1;let a=Nt(e&&e.created_at),i=Nt(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var xs=2**20;function Dr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Nt(e&&e.created_at)}function Cn(e){return(t,r)=>{let n=Dr(t,e),s=Dr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Ss(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Dr(i,r)-xs};if(!i)return{rank:Dr(a,r)+xs};let c=Dr(a,r),u=Dr(i,r),f=(c+u)/2;return c<f&&f<u?{rank:f}:{renormalize:n.map((m,h)=>({bead_id:m.id,rank:h*xs}))}}function As(e,t={}){let r=st(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||xr;function u(){for(let h of Array.from(a))try{h()}catch{}}function f(){s=Array.from(n.values()).sort(c)}function m(h){if(i||!h||h.id!==e)return;let E=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,E),!(E<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(E<=o)return;n.clear();let T=Array.isArray(h.issues)?h.issues:[];for(let R of T)R&&typeof R.id=="string"&&R.id.length>0&&n.set(R.id,R);f(),o=E,u();return}if(h.type==="upsert"){let T=h.issue;if(T&&typeof T.id=="string"&&T.id.length>0){let R=n.get(T.id);if(!R)n.set(T.id,T);else{let U=Number.isFinite(R.updated_at)?R.updated_at:0,$=Number.isFinite(T.updated_at)?T.updated_at:0;if(U<=$){for(let G of Object.keys(R))G in T||delete R[G];for(let[G,X]of Object.entries(T))R[G]=X}}f()}o=E,u()}else if(h.type==="delete"){let T=String(h.issue_id||"");T&&(n.delete(T),f()),o=E,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function Rn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function ba(e){let t=st("subs"),r=new Map,n=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let f=Array.isArray(c.added)?c.added:[],m=Array.isArray(c.updated)?c.updated:[],h=Array.isArray(c.removed)?c.removed:[];for(let E of Array.from(u)){let T=r.get(E);if(!T)continue;let R=T.itemsById;for(let U of f)typeof U=="string"&&U.length>0&&R.set(U,!0);for(let U of m)typeof U=="string"&&U.length>0&&R.set(U,!0);for(let U of h)typeof U=="string"&&U.length>0&&R.delete(U)}}async function o(i,c){let u=Rn(c);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let m=r.get(i);if(m&&m.key!==u){let h=n.get(m.key);h&&(h.delete(i),h.size===0&&n.delete(m.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(m){let h=r.get(i)||null;if(h){let E=n.get(h.key);E&&(E.delete(i),E.size===0&&n.delete(h.key))}throw r.delete(i),m}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let m=r.get(i)||null;if(m){let h=n.get(m.key);h&&(h.delete(i),h.size===0&&n.delete(m.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Rn,selectors:{getIds(i){let c=r.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=r.get(i);return u?u.itemsById.has(c):!1},count(i){let c=r.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=r.get(i),u={};if(!c)return u;for(let f of c.itemsById.keys())u[f]=!0;return u}}}}function ya(){let e=st("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,f){let m=u?Rn(u):"",h=r.get(c)||"",E=t.has(c);if(e("register %s key=%s (prev=%s)",c,m,h),E&&h&&m&&h!==m){let T=t.get(c);if(T)try{T.dispose()}catch{}let R=s.get(c);if(R){try{R()}catch{}s.delete(c)}let U=As(c,f);t.set(c,U);let $=U.subscribe(()=>o());s.set(c,$)}else if(!E){let T=As(c,f);t.set(c,T);let R=T.subscribe(()=>o());s.set(c,R)}return r.set(c,m),()=>i(c)}function i(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let f=s.get(c);if(f){try{f()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function va(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function wa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ts(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Cc(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Rc(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function ka(e){let t=st("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Cc(n),a=Rc(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ts(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ts(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Ic=Object.freeze({workspace_config:{default_workspace:null}});function $a(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Ic.workspace_config.default_workspace}}}function xa(e={}){let t=st("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:$a(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?$a(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!i&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Sa(e){let t=st("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(m,h)=>{let E=s++,T=Date.now();n.set(E,{type:m,start_ts:T}),t("request start id=%d type=%s count=%d",E,m,r+1),a();let R=!1,U=()=>{R||(R=!0,n.delete(E),i())},$=setTimeout(()=>{R||(t("request TIMEOUT id=%d type=%s elapsed=%dms",E,m,Date.now()-T),U())},3e4);try{let G=await u(m,h),X=Date.now()-T;return t("request done id=%d type=%s elapsed=%dms",E,m,X),G}catch(G){let X=Date.now()-T;throw t("request error id=%d type=%s elapsed=%dms err=%o",E,m,X,G),G}finally{clearTimeout($),U()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,m])=>({id:f,type:m.type,elapsed_ms:u-m.start_ts}))}}}function K(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}var Es=new Set;function Aa(e,t,r="info",n=2800){if(typeof e!="string"||e.length===0)return!1;let s=`beads-ui.toast.${e}`;if(Es.has(s))return!1;try{if(window.sessionStorage.getItem(s)==="1")return Es.add(s),!1;window.sessionStorage.setItem(s,"1")}catch{}return Es.add(s),K(t,r,n),!0}function In(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(ga),c;switch(i){case"created_desc":return c.sort(xr),c;case"created_asc":return c.sort(fa),c;case"updated_desc":return c.sort(_a),c;case"priority":return c.sort(ma),c;case"manual":default:{let u=r();return u?c.sort(Cn(u)):c.sort(xr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Xt(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Tt(e){let t=Xt(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Ct(e,t){let r=Xt(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Ln(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Xt(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function On(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(Ss(i,c,u.order),a);s(u,f);let m=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(m&&m.conflict){let h={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(h);let E=n(Ss(i,c,h.order),a);s(h,E);let T=await t("ui-order-set",{expected_revision:h.revision,entries:E});T&&T.applied&&r.set({revision:typeof T.revision=="number"?T.revision:0,order:T.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Dn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Cs(e,t){return!t||typeof e!="string"||e.length===0||Dn(t.visible_labels).includes(e)?!0:Dn(t.hidden_labels).includes(e)?!1:!Dn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Mn(e,t){return Dn(e).filter(r=>Cs(r,t))}function lr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Lc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ea={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ta={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Oc={review:"\u2713",skip:"\u2298"},cr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Dc(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ca(e){let t=e&&e.fill||"none";return t==="none"?cr.none:e&&e.stale===!0?cr.stale:t==="dim"?cr.dim:e&&e.glyph==="review"?cr.review:e&&e.glyph==="skip"?cr.skip:cr.done}function Mc(e){if(!e||e.fill==="none"||!e.approval_state)return Ca(e);let t=[];return e.glyph==="review"?t.push(cr.review):e.glyph==="skip"&&t.push(cr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Pc(e,t,r){let n=Lc[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Oc[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${c}>
        ${Ea[e]||e}
      </div>
    </div>
  `}function Pn(e,t){if(!e||!e.stages)return"";let r=Ta[e.route]||Ta.spec_backed,n=e.stages,s=Dc(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Ea[a]||a} ${a==="plan"?Mc(n[a]||{}):Ca(n[a]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Pc(a,n[a]||{},a===s))}
    </div>
  `}function Nc(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ra=2;function Fc(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Ra).join(", "),s=r.length-Ra,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function qc(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&lr(r,"route")){let a=n.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&lr(r,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&lr(r,"pr")){let a=n.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}for(let a of Mn(e.labels,r))s.push(l`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&lr(r,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),lr(r,"blocked")&&s.push(...Fc(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&lr(r,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 실패</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function Bc(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Uc(e){let t=Ct(e.created_at),r=Ct(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
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
  </span>`}function jc(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(ha):r.children;return l`
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
        ${Uc(e)}
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
                  <span class=${Bc(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Nn(e,t){let r=Nc(e.priority);return l`
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
      ${qc(e,t)}
      ${e.workflow&&lr(t.policy||null,"stepper")?Pn(e.workflow,e.status):""}
      ${jc(e,t)}
    </article>
  `}function Mr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return l`
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
        ${e.items.map(o=>Nn(o,t))}
      </div>
    </section>
  `}function Ia(e,t,r){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Nn(n,t))}
        </div>
      </div>
    </dialog>
  `}var zc=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Hc=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Wc=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Gc(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
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
  `}function La(e,t,r){return l`
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
        ${zc.map(n=>l`<option
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
        ${Hc.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Gc(e,t,r)}
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
        ${Wc.map(n=>l`<option
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
  `}var Yc=200,Vc={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Kc=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Oa="beads-ui.board.sort",Da=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Zc(){try{let e=window.localStorage.getItem(Oa);if(e&&Da.has(e))return e}catch{}return"created_desc"}function Ma(e,t){let r=st("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,m=t.closedRange||Et,h=s?In(s,a):null,E=On({transport:o,uiOrderStore:a}),T=[],R=[],U=[],$=[],G=[],X=[],j=!1,D=0,x=Zc(),N=new Map,I=new Map,de=new Map,ye=new Set,se={search:"",priority:"",type:"",labels:[]},he=!1,Me=null;function Je(F){return String(F.status||"open")==="open"}function et(F){let Y=String(F.status||"open");return Y==="open"||Y==="blocked"}function Re(F){let Y=se.search.trim().toLowerCase(),oe=se.priority,fe=se.type,ke=se.labels;return F.filter(Ce=>{if(Y){let ze=String(Ce.id||"").toLowerCase(),Qe=String(Ce.title||"").toLowerCase();if(!ze.includes(Y)&&!Qe.includes(Y))return!1}if(oe!==""&&String(Ce.priority)!==oe||fe!==""&&String(Ce.issue_type||"")!==fe)return!1;if(ke.length>0){let ze=Array.isArray(Ce.labels)?Ce.labels:[];if(!ke.some(Qe=>ze.includes(Qe)))return!1}return!0})}function Ke(){let F=new Set;for(let Y of[T,R,U,$,G,X])for(let oe of Y){let fe=Array.isArray(oe.labels)?oe.labels:[];for(let ke of fe)typeof ke=="string"&&ke.length>0&&F.add(ke)}return Array.from(F).sort()}function Ae(){return se.search.trim()!==""||se.priority!==""||se.type!==""||se.labels.length>0}function pe(){try{if(h){let F=h.selectBoardColumn("tab:board:in-progress","in_progress",x),Y=h.selectBoardColumn("tab:board:blocked","blocked",x).filter(et),oe=new Set(F.map(xe=>xe.id)),fe=h.selectBoardColumn("tab:board:ready","ready",x).filter(xe=>Je(xe)&&!oe.has(xe.id)),ke=h.selectBoardColumn("tab:board:resolved","resolved",x),Ce=h.selectBoardColumn("tab:board:deferred","deferred",x),ze=h.selectBoardColumn("tab:board:closed","closed").slice(0,Yc),Qe=[...Y,...fe,...F,...ke,...ze];ve(Qe);let Se=new Set;for(let xe of Qe)xe&&xe.id&&!Rs(xe)&&Se.add(xe.id);let We=!Ae();T=We?Qr(Y,Se):Y,R=We?Qr(fe,Se):fe,U=We?Qr(F,Se):F,$=We?Qr(ke,Se):ke,G=Ce,D=Ce.length,X=We?Qr(ze,Se):ze,N=new Map;for(let xe of T)N.set(xe.id,"open");for(let xe of R)N.set(xe.id,"open");for(let xe of U)N.set(xe.id,"in_progress");for(let xe of $)N.set(xe.id,"resolved");for(let xe of G)N.set(xe.id,"deferred");for(let xe of X)N.set(xe.id,"closed");I=new Map;for(let xe of T)I.set(xe.id,"blocked-col");for(let xe of R)I.set(xe.id,"ready-col");for(let xe of U)I.set(xe.id,"in-progress-col");for(let xe of $)I.set(xe.id,"resolved-col");for(let xe of X)I.set(xe.id,"closed-col")}Ye()}catch{T=[],R=[],U=[],$=[],G=[],X=[],de=new Map,Ye()}}function ve(F){let Y=new Map;for(let fe of F)fe&&fe.id&&!Y.has(fe.id)&&Y.set(fe.id,fe);let oe=new Map;for(let fe of Y.values()){let ke=Rs(fe);if(!ke)continue;let Ce=oe.get(ke);Ce||(Ce=[],oe.set(ke,Ce)),Ce.push({id:fe.id,title:fe.title,status:fe.status,metadata:fe.metadata,created_at:fe.created_at,updated_at:fe.updated_at})}de=oe}function me(F){let Y=de.get(F)||[],oe=0;for(let ke of Y)(ke.status==="resolved"||ke.status==="closed")&&(oe+=1);let fe=Ln(Y);return{total:Y.length,count:oe,current:fe,children:Y}}function z(F){return!ye.has(F)}function H(F,Y){F.preventDefault(),F.stopPropagation(),ye.has(Y)?ye.delete(Y):ye.add(Y),Ye()}function ge(F,Y){F.preventDefault(),F.stopPropagation(),n(Y)}function V(F,Y){F.preventDefault(),F.stopPropagation(),n(Y)}function we(F,Y){Me||n(Y)}function B(F,Y){F.preventDefault(),F.stopPropagation(),Xc(Y).then(oe=>{oe&&K("\uBCF5\uC0AC\uB428","success",1200)})}function M(F,Y){Me=Y,F.dataTransfer&&(F.dataTransfer.setData("text/plain",Y),F.dataTransfer.effectAllowed="move"),F.target.classList.add("board-card--dragging")}function te(F){F.target.classList.remove("board-card--dragging"),It(),setTimeout(()=>{Me=null},0)}function Pe(F){let Y=String(F.target.value||"");!Y||Y===m||(m=Y,u&&u(Y),Ye())}function Te(){return i?i.get():null}function Be(F){let Y=c?c.get():null,oe=Y?Y.cleanup_failed:null;if(!oe||typeof oe!="object"||Array.isArray(oe))return null;let fe=oe[F];return!fe||typeof fe!="object"||Array.isArray(fe)?null:fe}let Ee={onCardClick:we,onCopyId:B,onDragStart:M,onDragEnd:te,onClosedRangeChange:Pe,rollupFor:me,isExpanded:z,onRollupToggle:H,onChildClick:ge,onFromChipClick:V,cleanupFailureFor:Be,get policy(){return Te()}};function Xe(F,Y){Me||(ue(),n(Y))}function Le(F,Y){F.preventDefault(),F.stopPropagation(),ue(),n(Y)}let L={...Ee,onCardClick:Xe,onChildClick:Le,onFromChipClick:Le,get policy(){return Te()}};function S(F){let Y=F.target,oe=e.querySelector(".board-filter__labels");Y&&oe&&oe.contains(Y)||P()}function k(F){F.key==="Escape"&&P()}function A(){he||(he=!0,document.addEventListener("mousedown",S),document.addEventListener("keydown",k),Ye())}function P(){he&&(he=!1,document.removeEventListener("mousedown",S),document.removeEventListener("keydown",k),Ye())}function ee(F){F.key==="Escape"&&ue()}function Z(){j||(j=!0,document.addEventListener("keydown",ee),Ye())}function ue(){j&&(j=!1,document.removeEventListener("keydown",ee),Ye())}let Oe={onClose:ue,onOverlayClick(F){F.target===F.currentTarget&&ue()}},tt={onSearchInput(F){se.search=String(F.target.value||""),pe()},onPriorityChange(F){se.priority=String(F.target.value||""),pe()},onTypeChange(F){se.type=String(F.target.value||""),pe()},onSortChange(F){let Y=String(F.target.value||"");if(!(!Da.has(Y)||Y===x)){x=Y;try{window.localStorage.setItem(Oa,Y)}catch{}pe()}},onDeferredToggle(){j?ue():Z()},onLabelMenuToggle(){he?P():A()},onLabelToggle(F){let Y=se.labels.indexOf(F);Y===-1?se.labels.push(F):se.labels.splice(Y,1),pe()},onLabelClear(){se.labels.length!==0&&(se.labels=[],pe())},onNewIssue(){f&&f()}};function ot(){return l`
      <div class="board-view">
        ${La(se,tt,{sort_mode:x,deferred_popup_open:j,deferred_count:D,label_options:Ke(),label_menu_open:he})}
        <div class="board-root">
          ${Mr({title:"Blocked",id:"blocked-col",items:Re(T)},Ee)}
          ${Mr({title:"Ready",id:"ready-col",items:Re(R)},Ee)}
          ${Mr({title:"In progress",id:"in-progress-col",items:Re(U)},Ee)}
          ${Mr({title:"Resolved",id:"resolved-col",items:Re($)},Ee)}
          ${Mr({title:"Closed",id:"closed-col",items:Re(X),is_closed:!0,closed_range:m},Ee)}
        </div>
        ${j?Ia({items:Re(G),count:D},L,Oe):""}
      </div>
    `}function Ye(){Ue(ot(),e),bt()}function bt(){try{let F=e.querySelector("#deferred-popup");F&&!F.open&&(typeof F.showModal=="function"?F.showModal():F.setAttribute("open",""));let Y=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let oe of Y)Array.from(oe.querySelectorAll(".board-card")).forEach((ke,Ce)=>{ke.tabIndex=Ce===0?0:-1})}catch{}}async function ut(F,Y){if(!o){K("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:F,status:Y}),K("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(oe){r("update-status failed: %o",oe),K("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function lt(F){switch(F){case"blocked-col":return T;case"ready-col":return R;case"in-progress-col":return U;case"resolved-col":return $;default:return[]}}function yt(F,Y,oe){if(!o||!a)return;let fe=lt(F),ke=fe.find(We=>We.id===Y);if(!ke)return;let Ce=fe.filter(We=>We.id!==Y),ze=oe.closest?oe.closest(".board-card"):null,Qe=Ce.length;if(ze){let We=ze.getAttribute("data-issue-id");if(We===Y)return;let xe=Ce.findIndex(pt=>pt.id===We);xe>=0&&(Qe=xe)}let Se=Ce.slice();Se.splice(Qe,0,ke),E.applyReorder(Y,Se,Qe)}function It(){for(let F of Array.from(e.querySelectorAll(".board-column--drag-over")))F.classList.remove("board-column--drag-over")}let rt=null;e.addEventListener("dragover",F=>{F.preventDefault(),F.dataTransfer&&(F.dataTransfer.dropEffect="move");let oe=F.target.closest(".board-column");oe&&oe!==rt&&(rt&&rt.classList.remove("board-column--drag-over"),oe.classList.add("board-column--drag-over"),rt=oe)}),e.addEventListener("dragleave",F=>{let Y=F.relatedTarget;(!Y||!e.contains(Y))&&rt&&(rt.classList.remove("board-column--drag-over"),rt=null)}),e.addEventListener("drop",F=>{F.preventDefault(),rt&&(rt.classList.remove("board-column--drag-over"),rt=null);let Y=F.target,oe=Y.closest(".board-column");if(!oe)return;let fe=F.dataTransfer?.getData("text/plain")||"";if(!fe)return;let ke=oe.id,Ce=I.get(fe);if(Ce&&Ce===ke){if(Kc.has(ke)){if(x!=="manual"){K("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}yt(ke,fe,Y)}return}let ze=Vc[ke];if(!ze){K("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}N.get(fe)!==ze&&ut(fe,ze)}),e.addEventListener("keydown",F=>{let Y=F.target;if(!(Y instanceof HTMLElement))return;let oe=String(Y.tagName||"").toLowerCase();if(oe==="input"||oe==="textarea"||oe==="select"||oe==="button"||oe==="a"||Y.isContentEditable===!0)return;let fe=Y.closest(".board-card");if(!fe)return;let ke=String(F.key||"");if(ke==="Enter"||ke===" "){F.preventDefault();let Se=fe.getAttribute("data-issue-id");Se&&n(Se);return}if(ke!=="ArrowUp"&&ke!=="ArrowDown"&&ke!=="ArrowLeft"&&ke!=="ArrowRight")return;F.preventDefault();let Ce=fe.closest(".board-column");if(!Ce)return;let ze=Array.from(Ce.querySelectorAll(".board-card")),Qe=ze.indexOf(fe);if(ke==="ArrowDown"&&Qe<ze.length-1){at(fe,ze[Qe+1]);return}if(ke==="ArrowUp"&&Qe>0){at(fe,ze[Qe-1]);return}if(ke==="ArrowLeft"||ke==="ArrowRight"){let Se=Array.from(e.querySelectorAll(".board-column")),We=Se.indexOf(Ce),xe=ke==="ArrowRight"?1:-1,pt=We+xe;for(;pt>=0&&pt<Se.length;){let ht=Se[pt].querySelector(".board-card");if(ht){at(fe,ht);return}pt+=xe}}});function at(F,Y){try{F.tabIndex=-1,Y.tabIndex=0,Y.focus()}catch{}}let nt=null;h&&h.subscribe&&(nt=h.subscribe(()=>{try{pe()}catch{}}));let ct=null;i&&i.subscribe&&(ct=i.subscribe(()=>{try{pe()}catch{}}));let De=null;return c&&c.subscribe&&(De=c.subscribe(()=>{Ye()})),{async load(){r("load"),pe()},clear(){P(),ue(),nt&&(nt(),nt=null),ct&&(ct(),ct=null),De&&(De(),De=null),e.replaceChildren(),T=[],R=[],U=[],$=[],G=[],X=[],N=new Map,I=new Map}}}function Rs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Qr(e,t){return e.filter(r=>{let n=Rs(r);return!(n&&t.has(n))})}async function Xc(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Sr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Wt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function dr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Qc(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${Wt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Wt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(c=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),c(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function Gt(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Qc(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Ba="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function _t(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Qt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Jr=[...Qt,"reasoning_output_tokens"],Jc=["implementation","review-consult"];function Is(e){let t=0;for(let r of Qt)t+=_t(e?.[r]);return t}function ed(e){return!e||typeof e!="object"?!1:Qt.some(t=>Number.isFinite(e[t]))}function Pa(e){return!e||typeof e!="object"?!1:Jr.some(t=>Number.isFinite(e[t]))}function td(e){let t={};for(let r of Jr)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Na(e){let t={};for(let r of Jr)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Fa(e,t){return e==="codex"?_t(t.input_tokens)+_t(t.output_tokens):Is(t)}function rd(e){return e==="claude"?"Claude":"Codex"}function nd(e){return`\u03C4 ${Ua(e)}`}function sd(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${_t(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${_t(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${_t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${_t(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${_t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${_t(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${_t(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Ba),o.join(`
`)}function gt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${rd(r)} ${nd(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:sd(r,n)})}return t}function qn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of Jr)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=_t(i.breakdown[c])+_t(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ls(e){return!e||typeof e!="object"?null:Dt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function od(e){return e==="codex"?"codex":"claude"}function ur(){return{subtotal:0,breakdown:td(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Fn(e,t,r){e.subtotal+=t.subtotal;for(let n of Jr)Number.isFinite(t.usage[n])&&(e.breakdown[n]=_t(e.breakdown[n])+_t(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function qa(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Ua(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Pr(e){return ed(e)?`\u03C4 ${Ua(Is(e))}`:null}function Ft(e){let t=Pr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Nr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${_t(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${_t(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${_t(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${_t(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Is(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Ba),r.join(`
`)}function Dt(e,t){let r={claude:ur(),codex:ur()},n={orchestrator:{claude:ur(),codex:ur()},implementation:{claude:ur(),codex:ur()},"review-consult":{claude:ur(),codex:ur()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(Pa(c)){let f=od(i.runner),m=Na(c),h={provider:f,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:m,subtotal:Fa(f,m)};m.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),Fn(r[f],h,!0),Fn(n.orchestrator[f],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!Jc.includes(f.role)||!Pa(f.usage))continue;let m=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!m||s.has(m))continue;s.add(m);let h=Na(f.usage),E={provider:"codex",role:f.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:Fa("codex",h)};E.receipt_id=m,typeof f.model=="string"&&(E.model=f.model),typeof f.session_id=="string"?E.session_id=f.session_id:typeof f.thread_id=="string"&&(E.session_id=f.thread_id),typeof f.turn_id=="string"&&(E.turn_id=f.turn_id),typeof f.completed_at=="string"&&(E.completed_at=f.completed_at),h.replayed===!0&&(E.replayed=!0),Fn(r.codex,E,!1),Fn(n[E.role].codex,E,!1)}}let o={};for(let i of["claude","codex"]){let c=r[i];if(c.legs.length===0)continue;let u=qa(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let f=n[i][u];f.legs.length>0&&(c[u]={...qa(f,!0),legs:f.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:Za,setPrototypeOf:ja,isFrozen:ad,getPrototypeOf:id,getOwnPropertyDescriptor:ld}=Object,{freeze:kt,seal:Mt,create:qs}=Object,{apply:Bs,construct:Us}=typeof Reflect<"u"&&Reflect;kt||(kt=function(t){return t});Mt||(Mt=function(t){return t});Bs||(Bs=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Us||(Us=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Bn=$t(Array.prototype.forEach),cd=$t(Array.prototype.lastIndexOf),za=$t(Array.prototype.pop),en=$t(Array.prototype.push),dd=$t(Array.prototype.splice),jn=$t(String.prototype.toLowerCase),Os=$t(String.prototype.toString),Ds=$t(String.prototype.match),tn=$t(String.prototype.replace),ud=$t(String.prototype.indexOf),pd=$t(String.prototype.trim),qt=$t(Object.prototype.hasOwnProperty),wt=$t(RegExp.prototype.test),rn=fd(TypeError);function $t(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Bs(e,t,n)}}function fd(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Us(e,r)}}function Ne(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:jn;ja&&ja(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(ad(t)||(t[n]=o),s=o)}e[s]=!0}return e}function _d(e){for(let t=0;t<e.length;t++)qt(e,t)||(e[t]=null);return e}function Jt(e){let t=qs(null);for(let[r,n]of Za(e))qt(e,r)&&(Array.isArray(n)?t[r]=_d(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Jt(n):t[r]=n);return t}function nn(e,t){for(;e!==null;){let n=ld(e,t);if(n){if(n.get)return $t(n.get);if(typeof n.value=="function")return $t(n.value)}e=id(e)}function r(){return null}return r}var Ha=kt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ms=kt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ps=kt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),md=kt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ns=kt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),gd=kt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Wa=kt(["#text"]),Ga=kt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Fs=kt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ya=kt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Un=kt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),hd=Mt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),bd=Mt(/<%[\w\W]*|[\w\W]*%>/gm),yd=Mt(/\$\{[\w\W]*/gm),vd=Mt(/^data-[\-\w.\u00B7-\uFFFF]+$/),wd=Mt(/^aria-[\-\w]+$/),Xa=Mt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),kd=Mt(/^(?:\w+script|data):/i),$d=Mt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Qa=Mt(/^html$/i),xd=Mt(/^[a-z][.\w]*(-[.\w]+)+$/i),Va=Object.freeze({__proto__:null,ARIA_ATTR:wd,ATTR_WHITESPACE:$d,CUSTOM_ELEMENT:xd,DATA_ATTR:vd,DOCTYPE_NAME:Qa,ERB_EXPR:bd,IS_ALLOWED_URI:Xa,IS_SCRIPT_OR_DATA:kd,MUSTACHE_EXPR:hd,TMPLIT_EXPR:yd}),sn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Sd=function(){return typeof window>"u"?null:window},Ad=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ka=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ja(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Sd(),t=ce=>Ja(ce);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==sn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:h,trustedTypes:E}=e,T=c.prototype,R=nn(T,"cloneNode"),U=nn(T,"remove"),$=nn(T,"nextSibling"),G=nn(T,"childNodes"),X=nn(T,"parentNode");if(typeof a=="function"){let ce=r.createElement("template");ce.content&&ce.content.ownerDocument&&(r=ce.content.ownerDocument)}let j,D="",{implementation:x,createNodeIterator:N,createDocumentFragment:I,getElementsByTagName:de}=r,{importNode:ye}=n,se=Ka();t.isSupported=typeof Za=="function"&&typeof X=="function"&&x&&x.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:he,ERB_EXPR:Me,TMPLIT_EXPR:Je,DATA_ATTR:et,ARIA_ATTR:Re,IS_SCRIPT_OR_DATA:Ke,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:pe}=Va,{IS_ALLOWED_URI:ve}=Va,me=null,z=Ne({},[...Ha,...Ms,...Ps,...Ns,...Wa]),H=null,ge=Ne({},[...Ga,...Fs,...Ya,...Un]),V=Object.seal(qs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),we=null,B=null,M=Object.seal(qs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),te=!0,Pe=!0,Te=!1,Be=!0,Ee=!1,Xe=!0,Le=!1,L=!1,S=!1,k=!1,A=!1,P=!1,ee=!0,Z=!1,ue="user-content-",Oe=!0,tt=!1,ot={},Ye=null,bt=Ne({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ut=null,lt=Ne({},["audio","video","img","source","image","track"]),yt=null,It=Ne({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),rt="http://www.w3.org/1998/Math/MathML",at="http://www.w3.org/2000/svg",nt="http://www.w3.org/1999/xhtml",ct=nt,De=!1,F=null,Y=Ne({},[rt,at,nt],Os),oe=Ne({},["mi","mo","mn","ms","mtext"]),fe=Ne({},["annotation-xml"]),ke=Ne({},["title","style","font","a","script"]),Ce=null,ze=["application/xhtml+xml","text/html"],Qe="text/html",Se=null,We=null,xe=r.createElement("form"),pt=function(b){return b instanceof RegExp||b instanceof Function},ht=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(We&&We===b)){if((!b||typeof b!="object")&&(b={}),b=Jt(b),Ce=ze.indexOf(b.PARSER_MEDIA_TYPE)===-1?Qe:b.PARSER_MEDIA_TYPE,Se=Ce==="application/xhtml+xml"?Os:jn,me=qt(b,"ALLOWED_TAGS")?Ne({},b.ALLOWED_TAGS,Se):z,H=qt(b,"ALLOWED_ATTR")?Ne({},b.ALLOWED_ATTR,Se):ge,F=qt(b,"ALLOWED_NAMESPACES")?Ne({},b.ALLOWED_NAMESPACES,Os):Y,yt=qt(b,"ADD_URI_SAFE_ATTR")?Ne(Jt(It),b.ADD_URI_SAFE_ATTR,Se):It,ut=qt(b,"ADD_DATA_URI_TAGS")?Ne(Jt(lt),b.ADD_DATA_URI_TAGS,Se):lt,Ye=qt(b,"FORBID_CONTENTS")?Ne({},b.FORBID_CONTENTS,Se):bt,we=qt(b,"FORBID_TAGS")?Ne({},b.FORBID_TAGS,Se):Jt({}),B=qt(b,"FORBID_ATTR")?Ne({},b.FORBID_ATTR,Se):Jt({}),ot=qt(b,"USE_PROFILES")?b.USE_PROFILES:!1,te=b.ALLOW_ARIA_ATTR!==!1,Pe=b.ALLOW_DATA_ATTR!==!1,Te=b.ALLOW_UNKNOWN_PROTOCOLS||!1,Be=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ee=b.SAFE_FOR_TEMPLATES||!1,Xe=b.SAFE_FOR_XML!==!1,Le=b.WHOLE_DOCUMENT||!1,k=b.RETURN_DOM||!1,A=b.RETURN_DOM_FRAGMENT||!1,P=b.RETURN_TRUSTED_TYPE||!1,S=b.FORCE_BODY||!1,ee=b.SANITIZE_DOM!==!1,Z=b.SANITIZE_NAMED_PROPS||!1,Oe=b.KEEP_CONTENT!==!1,tt=b.IN_PLACE||!1,ve=b.ALLOWED_URI_REGEXP||Xa,ct=b.NAMESPACE||nt,oe=b.MATHML_TEXT_INTEGRATION_POINTS||oe,fe=b.HTML_INTEGRATION_POINTS||fe,V=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&pt(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(V.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&pt(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(V.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(V.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ee&&(Pe=!1),A&&(k=!0),ot&&(me=Ne({},Wa),H=[],ot.html===!0&&(Ne(me,Ha),Ne(H,Ga)),ot.svg===!0&&(Ne(me,Ms),Ne(H,Fs),Ne(H,Un)),ot.svgFilters===!0&&(Ne(me,Ps),Ne(H,Fs),Ne(H,Un)),ot.mathMl===!0&&(Ne(me,Ns),Ne(H,Ya),Ne(H,Un))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?M.tagCheck=b.ADD_TAGS:(me===z&&(me=Jt(me)),Ne(me,b.ADD_TAGS,Se))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?M.attributeCheck=b.ADD_ATTR:(H===ge&&(H=Jt(H)),Ne(H,b.ADD_ATTR,Se))),b.ADD_URI_SAFE_ATTR&&Ne(yt,b.ADD_URI_SAFE_ATTR,Se),b.FORBID_CONTENTS&&(Ye===bt&&(Ye=Jt(Ye)),Ne(Ye,b.FORBID_CONTENTS,Se)),Oe&&(me["#text"]=!0),Le&&Ne(me,["html","head","body"]),me.table&&(Ne(me,["tbody"]),delete we.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw rn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw rn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');j=b.TRUSTED_TYPES_POLICY,D=j.createHTML("")}else j===void 0&&(j=Ad(E,s)),j!==null&&typeof D=="string"&&(D=j.createHTML(""));kt&&kt(b),We=b}},sr=Ne({},[...Ms,...Ps,...md]),jt=Ne({},[...Ns,...gd]),p=function(b){let W=X(b);(!W||!W.tagName)&&(W={namespaceURI:ct,tagName:"template"});let re=jn(b.tagName),Fe=jn(W.tagName);return F[b.namespaceURI]?b.namespaceURI===at?W.namespaceURI===nt?re==="svg":W.namespaceURI===rt?re==="svg"&&(Fe==="annotation-xml"||oe[Fe]):!!sr[re]:b.namespaceURI===rt?W.namespaceURI===nt?re==="math":W.namespaceURI===at?re==="math"&&fe[Fe]:!!jt[re]:b.namespaceURI===nt?W.namespaceURI===at&&!fe[Fe]||W.namespaceURI===rt&&!oe[Fe]?!1:!jt[re]&&(ke[re]||!sr[re]):!!(Ce==="application/xhtml+xml"&&F[b.namespaceURI]):!1},v=function(b){en(t.removed,{element:b});try{X(b).removeChild(b)}catch{U(b)}},C=function(b,W){try{en(t.removed,{attribute:W.getAttributeNode(b),from:W})}catch{en(t.removed,{attribute:null,from:W})}if(W.removeAttribute(b),b==="is")if(k||A)try{v(W)}catch{}else try{W.setAttribute(b,"")}catch{}},Q=function(b){let W=null,re=null;if(S)b="<remove></remove>"+b;else{let ae=Ds(b,/^[\r\n\t ]+/);re=ae&&ae[0]}Ce==="application/xhtml+xml"&&ct===nt&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let Fe=j?j.createHTML(b):b;if(ct===nt)try{W=new h().parseFromString(Fe,Ce)}catch{}if(!W||!W.documentElement){W=x.createDocument(ct,"template",null);try{W.documentElement.innerHTML=De?D:Fe}catch{}}let Ve=W.body||W.documentElement;return b&&re&&Ve.insertBefore(r.createTextNode(re),Ve.childNodes[0]||null),ct===nt?de.call(W,Le?"html":"body")[0]:Le?W.documentElement:Ve},_e=function(b){return N.call(b.ownerDocument||b,b,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},be=function(b){return b instanceof m&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof f)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},ie=function(b){return typeof i=="function"&&b instanceof i};function le(ce,b,W){Bn(ce,re=>{re.call(t,b,W,We)})}let Ie=function(b){let W=null;if(le(se.beforeSanitizeElements,b,null),be(b))return v(b),!0;let re=Se(b.nodeName);if(le(se.uponSanitizeElement,b,{tagName:re,allowedTags:me}),Xe&&b.hasChildNodes()&&!ie(b.firstElementChild)&&wt(/<[/\w!]/g,b.innerHTML)&&wt(/<[/\w!]/g,b.textContent)||b.nodeType===sn.progressingInstruction||Xe&&b.nodeType===sn.comment&&wt(/<[/\w]/g,b.data))return v(b),!0;if(!(M.tagCheck instanceof Function&&M.tagCheck(re))&&(!me[re]||we[re])){if(!we[re]&&ft(re)&&(V.tagNameCheck instanceof RegExp&&wt(V.tagNameCheck,re)||V.tagNameCheck instanceof Function&&V.tagNameCheck(re)))return!1;if(Oe&&!Ye[re]){let Fe=X(b)||b.parentNode,Ve=G(b)||b.childNodes;if(Ve&&Fe){let ae=Ve.length;for(let _=ae-1;_>=0;--_){let d=R(Ve[_],!0);d.__removalCount=(b.__removalCount||0)+1,Fe.insertBefore(d,$(b))}}}return v(b),!0}return b instanceof c&&!p(b)||(re==="noscript"||re==="noembed"||re==="noframes")&&wt(/<\/no(script|embed|frames)/i,b.innerHTML)?(v(b),!0):(Ee&&b.nodeType===sn.text&&(W=b.textContent,Bn([he,Me,Je],Fe=>{W=tn(W,Fe," ")}),b.textContent!==W&&(en(t.removed,{element:b.cloneNode()}),b.textContent=W)),le(se.afterSanitizeElements,b,null),!1)},it=function(b,W,re){if(ee&&(W==="id"||W==="name")&&(re in r||re in xe))return!1;if(!(Pe&&!B[W]&&wt(et,W))){if(!(te&&wt(Re,W))){if(!(M.attributeCheck instanceof Function&&M.attributeCheck(W,b))){if(!H[W]||B[W]){if(!(ft(b)&&(V.tagNameCheck instanceof RegExp&&wt(V.tagNameCheck,b)||V.tagNameCheck instanceof Function&&V.tagNameCheck(b))&&(V.attributeNameCheck instanceof RegExp&&wt(V.attributeNameCheck,W)||V.attributeNameCheck instanceof Function&&V.attributeNameCheck(W,b))||W==="is"&&V.allowCustomizedBuiltInElements&&(V.tagNameCheck instanceof RegExp&&wt(V.tagNameCheck,re)||V.tagNameCheck instanceof Function&&V.tagNameCheck(re))))return!1}else if(!yt[W]){if(!wt(ve,tn(re,Ae,""))){if(!((W==="src"||W==="xlink:href"||W==="href")&&b!=="script"&&ud(re,"data:")===0&&ut[b])){if(!(Te&&!wt(Ke,tn(re,Ae,"")))){if(re)return!1}}}}}}}return!0},ft=function(b){return b!=="annotation-xml"&&Ds(b,pe)},St=function(b){le(se.beforeSanitizeAttributes,b,null);let{attributes:W}=b;if(!W||be(b))return;let re={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:H,forceKeepAttr:void 0},Fe=W.length;for(;Fe--;){let Ve=W[Fe],{name:ae,namespaceURI:_,value:d}=Ve,w=Se(ae),y=d,O=ae==="value"?y:pd(y);if(re.attrName=w,re.attrValue=O,re.keepAttr=!0,re.forceKeepAttr=void 0,le(se.uponSanitizeAttribute,b,re),O=re.attrValue,Z&&(w==="id"||w==="name")&&(C(ae,b),O=ue+O),Xe&&wt(/((--!?|])>)|<\/(style|title|textarea)/i,O)){C(ae,b);continue}if(w==="attributename"&&Ds(O,"href")){C(ae,b);continue}if(re.forceKeepAttr)continue;if(!re.keepAttr){C(ae,b);continue}if(!Be&&wt(/\/>/i,O)){C(ae,b);continue}Ee&&Bn([he,Me,Je],$e=>{O=tn(O,$e," ")});let J=Se(b.nodeName);if(!it(J,w,O)){C(ae,b);continue}if(j&&typeof E=="object"&&typeof E.getAttributeType=="function"&&!_)switch(E.getAttributeType(J,w)){case"TrustedHTML":{O=j.createHTML(O);break}case"TrustedScriptURL":{O=j.createScriptURL(O);break}}if(O!==y)try{_?b.setAttributeNS(_,ae,O):b.setAttribute(ae,O),be(b)?v(b):za(t.removed)}catch{C(ae,b)}}le(se.afterSanitizeAttributes,b,null)},vt=function ce(b){let W=null,re=_e(b);for(le(se.beforeSanitizeShadowDOM,b,null);W=re.nextNode();)le(se.uponSanitizeShadowNode,W,null),Ie(W),St(W),W.content instanceof o&&ce(W.content);le(se.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(ce){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},W=null,re=null,Fe=null,Ve=null;if(De=!ce,De&&(ce="<!-->"),typeof ce!="string"&&!ie(ce))if(typeof ce.toString=="function"){if(ce=ce.toString(),typeof ce!="string")throw rn("dirty is not a string, aborting")}else throw rn("toString is not a function");if(!t.isSupported)return ce;if(L||ht(b),t.removed=[],typeof ce=="string"&&(tt=!1),tt){if(ce.nodeName){let d=Se(ce.nodeName);if(!me[d]||we[d])throw rn("root node is forbidden and cannot be sanitized in-place")}}else if(ce instanceof i)W=Q("<!---->"),re=W.ownerDocument.importNode(ce,!0),re.nodeType===sn.element&&re.nodeName==="BODY"||re.nodeName==="HTML"?W=re:W.appendChild(re);else{if(!k&&!Ee&&!Le&&ce.indexOf("<")===-1)return j&&P?j.createHTML(ce):ce;if(W=Q(ce),!W)return k?null:P?D:""}W&&S&&v(W.firstChild);let ae=_e(tt?ce:W);for(;Fe=ae.nextNode();)Ie(Fe),St(Fe),Fe.content instanceof o&&vt(Fe.content);if(tt)return ce;if(k){if(A)for(Ve=I.call(W.ownerDocument);W.firstChild;)Ve.appendChild(W.firstChild);else Ve=W;return(H.shadowroot||H.shadowrootmode)&&(Ve=ye.call(n,Ve,!0)),Ve}let _=Le?W.outerHTML:W.innerHTML;return Le&&me["!doctype"]&&W.ownerDocument&&W.ownerDocument.doctype&&W.ownerDocument.doctype.name&&wt(Qa,W.ownerDocument.doctype.name)&&(_="<!DOCTYPE "+W.ownerDocument.doctype.name+`>
`+_),Ee&&Bn([he,Me,Je],d=>{_=tn(_,d," ")}),j&&P?j.createHTML(_):_},t.setConfig=function(){let ce=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ht(ce),L=!0},t.clearConfig=function(){We=null,L=!1},t.isValidAttribute=function(ce,b,W){We||ht({});let re=Se(ce),Fe=Se(b);return it(re,Fe,W)},t.addHook=function(ce,b){typeof b=="function"&&en(se[ce],b)},t.removeHook=function(ce,b){if(b!==void 0){let W=cd(se[ce],b);return W===-1?void 0:dd(se[ce],W,1)[0]}return za(se[ce])},t.removeHooks=function(ce){se[ce]=[]},t.removeAllHooks=function(){se=Ka()},t}var ei=Ja();var ti={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ri=e=>(...t)=>({_$litDirective$:e,values:t}),zn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var on=class extends zn{constructor(t){if(super(t),this.it=dt,t.type!==ti.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===dt||t==null)return this._t=void 0,this.it=t;if(t===wr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};on.directiveName="unsafeHTML",on.resultType=1;var ni=ri(on);function Ws(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Tr=Ws();function di(e){Tr=e}var dn={exec:()=>null};function je(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(xt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Td=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),xt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Ed=/^(?:[ \t]*(?:\n|$))+/,Cd=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Rd=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,un=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Id=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Gs=/(?:[*+-]|\d{1,9}[.)])/,ui=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,pi=je(ui).replace(/bull/g,Gs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ld=je(ui).replace(/bull/g,Gs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ys=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Od=/^[^\n]+/,Vs=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Dd=je(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Vs).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Md=je(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Gs).getRegex(),Kn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ks=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Pd=je("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ks).replace("tag",Kn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),fi=je(Ys).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kn).getRegex(),Nd=je(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",fi).getRegex(),Zs={blockquote:Nd,code:Cd,def:Dd,fences:Rd,heading:Id,hr:un,html:Pd,lheading:pi,list:Md,newline:Ed,paragraph:fi,table:dn,text:Od},si=je("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kn).getRegex(),Fd={...Zs,lheading:Ld,table:si,paragraph:je(Ys).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",si).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kn).getRegex()},qd={...Zs,html:je(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ks).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:dn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:je(Ys).replace("hr",un).replace("heading",` *#{1,6} *[^
]`).replace("lheading",pi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Bd=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ud=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,_i=/^( {2,}|\\)\n(?!\s*$)/,jd=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Zn=/[\p{P}\p{S}]/u,Xs=/[\s\p{P}\p{S}]/u,mi=/[^\s\p{P}\p{S}]/u,zd=je(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Xs).getRegex(),gi=/(?!~)[\p{P}\p{S}]/u,Hd=/(?!~)[\s\p{P}\p{S}]/u,Wd=/(?:[^\s\p{P}\p{S}]|~)/u,Gd=je(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Td?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),hi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Yd=je(hi,"u").replace(/punct/g,Zn).getRegex(),Vd=je(hi,"u").replace(/punct/g,gi).getRegex(),bi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Kd=je(bi,"gu").replace(/notPunctSpace/g,mi).replace(/punctSpace/g,Xs).replace(/punct/g,Zn).getRegex(),Zd=je(bi,"gu").replace(/notPunctSpace/g,Wd).replace(/punctSpace/g,Hd).replace(/punct/g,gi).getRegex(),Xd=je("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,mi).replace(/punctSpace/g,Xs).replace(/punct/g,Zn).getRegex(),Qd=je(/\\(punct)/,"gu").replace(/punct/g,Zn).getRegex(),Jd=je(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),eu=je(Ks).replace("(?:-->|$)","-->").getRegex(),tu=je("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",eu).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Gn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,ru=je(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Gn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),yi=je(/^!?\[(label)\]\[(ref)\]/).replace("label",Gn).replace("ref",Vs).getRegex(),vi=je(/^!?\[(ref)\](?:\[\])?/).replace("ref",Vs).getRegex(),nu=je("reflink|nolink(?!\\()","g").replace("reflink",yi).replace("nolink",vi).getRegex(),oi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Qs={_backpedal:dn,anyPunctuation:Qd,autolink:Jd,blockSkip:Gd,br:_i,code:Ud,del:dn,emStrongLDelim:Yd,emStrongRDelimAst:Kd,emStrongRDelimUnd:Xd,escape:Bd,link:ru,nolink:vi,punctuation:zd,reflink:yi,reflinkSearch:nu,tag:tu,text:jd,url:dn},su={...Qs,link:je(/^!?\[(label)\]\((.*?)\)/).replace("label",Gn).getRegex(),reflink:je(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Gn).getRegex()},js={...Qs,emStrongRDelimAst:Zd,emStrongLDelim:Vd,url:je(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",oi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:je(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",oi).getRegex()},ou={...js,br:je(_i).replace("{2,}","*").getRegex(),text:je(js.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Hn={normal:Zs,gfm:Fd,pedantic:qd},an={normal:Qs,gfm:js,breaks:ou,pedantic:su},au={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ai=e=>au[e];function er(e,t){if(t){if(xt.escapeTest.test(e))return e.replace(xt.escapeReplace,ai)}else if(xt.escapeTestNoEncode.test(e))return e.replace(xt.escapeReplaceNoEncode,ai);return e}function ii(e){try{e=encodeURI(e).replace(xt.percentDecode,"%")}catch{return null}return e}function li(e,t){let r=e.replace(xt.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(xt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(xt.slashPipe,"|");return n}function ln(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function iu(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function ci(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,c}function lu(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Yn=class{constructor(e){Ze(this,"options");Ze(this,"rules");Ze(this,"lexer");this.options=e||Tr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:ln(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=lu(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=ln(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ln(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=ln(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))i.push(r[c]),a=!0;else if(!a)i.push(r[c]);else break;r=r.slice(c);let u=i.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=m,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let E=h,T=E.raw+`
`+r.join(`
`),R=this.blockquote(T);o[o.length-1]=R,n=n.substring(0,n.length-E.raw.length)+R.raw,s=s.substring(0,s.length-E.text.length)+R.text;break}else if(h?.type==="list"){let E=h,T=E.raw+`
`+r.join(`
`),R=this.list(T);o[o.length-1]=R,n=n.substring(0,n.length-h.raw.length)+R.raw,s=s.substring(0,s.length-E.raw.length)+R.raw,r=T.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,R=>" ".repeat(3*R.length)),h=e.split(`
`,1)[0],E=!m.trim(),T=0;if(this.options.pedantic?(T=2,f=m.trimStart()):E?T=t[1].length+1:(T=t[2].search(this.rules.other.nonSpaceChar),T=T>4?1:T,f=m.slice(T),T+=t[1].length),E&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),c=!0),!c){let R=this.rules.other.nextBulletRegex(T),U=this.rules.other.hrRegex(T),$=this.rules.other.fencesBeginRegex(T),G=this.rules.other.headingBeginRegex(T),X=this.rules.other.htmlBeginRegex(T);for(;e;){let j=e.split(`
`,1)[0],D;if(h=j,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),D=h):D=h.replace(this.rules.other.tabCharGlobal,"    "),$.test(h)||G.test(h)||X.test(h)||R.test(h)||U.test(h))break;if(D.search(this.rules.other.nonSpaceChar)>=T||!h.trim())f+=`
`+D.slice(T);else{if(E||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||$.test(m)||G.test(m)||U.test(m))break;f+=`
`+h}!E&&!h.trim()&&(E=!0),u+=j+`
`,e=e.substring(j.length+1),m=D.slice(T)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=f.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!s.loose){let u=c.tokens.filter(m=>m.type==="space"),f=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=f}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=li(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(li(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=ln(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=iu(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),ci(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return ci(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let f=[...n[0]][0].length,m=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let E=m.slice(1,-1);return{type:"em",raw:m,text:E,tokens:this.lexer.inlineTokens(E)}}let h=m.slice(2,-2);return{type:"strong",raw:m,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Bt=class zs{constructor(t){Ze(this,"tokens");Ze(this,"options");Ze(this,"state");Ze(this,"inlineQueue");Ze(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Tr,this.options.tokenizer=this.options.tokenizer||new Yn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:xt,block:Hn.normal,inline:an.normal};this.options.pedantic?(r.block=Hn.pedantic,r.inline=an.pedantic):this.options.gfm&&(r.block=Hn.gfm,this.options.breaks?r.inline=an.breaks:r.inline=an.gfm),this.tokenizer.rules=r}static get rules(){return{block:Hn,inline:an}}static lex(t,r){return new zs(r).lex(t)}static lexInline(t,r){return new zs(r).inlineTokens(t)}lex(t){t=t.replace(xt.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=r.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,i)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,m=t.slice(1),h;this.options.extensions.startInline.forEach(E=>{h=E.call({lexer:this},m),typeof h=="number"&&h>=0&&(f=Math.min(f,h))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Vn=class{constructor(e){Ze(this,"options");Ze(this,"parser");this.options=e||Tr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(xt.notSpaceStart)?.[0],s=e.replace(xt.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${er(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=ii(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+er(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=ii(e);if(s===null)return er(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${er(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:er(e.text)}},Js=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Ut=class Hs{constructor(t){Ze(this,"options");Ze(this,"renderer");Ze(this,"textRenderer");this.options=t||Tr,this.options.renderer=this.options.renderer||new Vn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Js}static parse(t,r){return new Hs(r).parse(t)}static parseInline(t,r){return new Hs(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Wn,cn=(Wn=class{constructor(e){Ze(this,"options");Ze(this,"block");this.options=e||Tr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Bt.lex:Bt.lexInline}provideParser(){return this.block?Ut.parse:Ut.parseInline}},Ze(Wn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Ze(Wn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Wn),cu=class{constructor(...e){Ze(this,"defaults",Ws());Ze(this,"options",this.setOptions);Ze(this,"parse",this.parseMarkdown(!0));Ze(this,"parseInline",this.parseMarkdown(!1));Ze(this,"Parser",Ut);Ze(this,"Renderer",Vn);Ze(this,"TextRenderer",Js);Ze(this,"Lexer",Bt);Ze(this,"Tokenizer",Yn);Ze(this,"Hooks",cn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Vn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Yn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new cn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],c=s[a];cn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&cn.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await i.call(s,u);return c.call(s,m)})();let f=i.call(s,u);return c.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await i.apply(s,u);return m===!1&&(m=await c.apply(s,u)),m})();let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Bt.lex(e,t??this.defaults)}parser(e,t){return Ut.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Bt.lex:Bt.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Ut.parse:Ut.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Bt.lex:Bt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?Ut.parse:Ut.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+er(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ar=new cu;function Ge(e,t){return Ar.parse(e,t)}Ge.options=Ge.setOptions=function(e){return Ar.setOptions(e),Ge.defaults=Ar.defaults,di(Ge.defaults),Ge};Ge.getDefaults=Ws;Ge.defaults=Tr;Ge.use=function(...e){return Ar.use(...e),Ge.defaults=Ar.defaults,di(Ge.defaults),Ge};Ge.walkTokens=function(e,t){return Ar.walkTokens(e,t)};Ge.parseInline=Ar.parseInline;Ge.Parser=Ut;Ge.parser=Ut.parse;Ge.Renderer=Vn;Ge.TextRenderer=Js;Ge.Lexer=Bt;Ge.lexer=Bt.lex;Ge.Tokenizer=Yn;Ge.Hooks=cn;Ge.parse=Ge;var z_=Ge.options,H_=Ge.setOptions,W_=Ge.use,G_=Ge.walkTokens,Y_=Ge.parseInline;var V_=Ut.parse,K_=Bt.lex;function pr(e){let t=Ge.parse(e),r=ei.sanitize(t);return ni(r)}function tr(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Fr(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Xn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var du={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},uu=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,pu=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function fr(e){return!!e&&typeof e=="object"}function eo(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function wi(e,t){let r=eo(e),n=eo(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function fu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>fr(s)&&typeof s.text=="string"?s.text:"").join(""):fr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function _u(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:du[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=eo(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=wi(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let c=wi(fr(i)?i.old_string:"",fr(i)?i.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function ki(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function $i(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=uu.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:pu.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function mu(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(fr(o)){if(o.type==="text"&&typeof o.text=="string")s.push($i(o.text));else if(o.type==="thinking"){let a=ki(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=_u(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(fr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=fu(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function gu(e){if(e.type==="item.completed"&&fr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[$i(t.text)];if(t.type==="reasoning"){let r=ki(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function hu(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function xi(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!fr(o))continue;let a=hu(o)?gu(o):mu(o,r);for(let i of a)t.push(i)}return t}var bu=5,yu=10,vu=/Task\s+#(\d+)/,wu=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,ku=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Qn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function $u(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function xu(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Su(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=vu.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Au(e){if(e.tool==="Bash"){let t=e.command||"";return wu.test(t)?"~ PR/\uAC8C\uC2DC \uC911":ku.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Tu(e){let t=e.filter(s=>s.kind==="tool").slice(-yu),r=new Map;t.forEach((s,o)=>{let a=Au(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Eu(e){let t=xu(e);if(t)return{text:t,guess:!1};let r=Su(e);if(r)return{text:r,guess:!1};let n=Tu(e);return n?{text:n,guess:!0}:null}function Cu(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Ct(e,t)}function Jn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},i=!0,c=new Set,u=new Set,f=null,m=null,h=!1,E=!1,T=!1,R=null,U=null;function $(){h=!1,E=!1,T=!1,R=null,U=null}async function G(B){if(r){E=!0,T=!1,Ae();try{let M=await Promise.resolve(r("get-attempt-prompt",{attempt_id:B}));if(o!==B)return;!M||typeof M!="object"||Array.isArray(M)?T=!0:(R=M,U=B)}catch{o===B&&(T=!0)}finally{o===B&&(E=!1,Ae())}}}function X(){if(h=!h,h&&o&&U!==o){G(o);return}Ae()}function j(){if(!h)return"";let B=Fr({loading:E,error:T});if(B)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${B}
      </div>`;if(!R)return"";if(R.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let M=Xn(R.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${M?l`<div class="prompt-block__meta">${M} 발송</div>`:""}
      ${typeof R.task_prompt=="string"?tr("\uACFC\uC5C5 (user)",R.task_prompt):""}
      ${typeof R.system_prompt=="string"?tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",R.system_prompt):""}
    </div>`}function D(){if(!o||!n)return[];let B=n.get(o);return xi(B?B.lines:[])}function x(){if(!o||!n)return null;let B=n.get(o),M=B?B.last_event_at:null;return typeof M=="number"?M:null}function N(){return a.status==="running"}function I(){if(N()&&o){m||(m=setInterval(()=>Ae(),1e3));return}de()}function de(){m&&(clearInterval(m),m=null)}function ye(B){let M=[],te=0;for(;te<B.length;){let Pe=B[te];if(Pe.kind==="tool"){let Te=te;for(;Te<B.length&&B[Te].kind==="tool"&&B[Te].tool===Pe.tool;)Te+=1;if(Te-te>=bu&&!u.has(te)){M.push({kind:"group",idx:te,tool:Pe.tool||"",lines:B.slice(te,Te).map((Be,Ee)=>({idx:te+Ee,line:Be}))}),te=Te;continue}}M.push({kind:"line",idx:te,line:Pe}),te+=1}return M}function se(B){for(let M=B.length-1;M>=0;M-=1){let te=B[M];if(te.kind==="result"||te.kind==="error")return null;if(te.kind==="tool"&&!Object.hasOwn(te,"result"))return te}return null}function he(B){for(let M=B.length-1;M>=0;M-=1)if(B[M].kind==="thinking")return B[M];return null}function Me(B,M){if(M.kind==="gate")return l`<div class="sv__gate">${M.text}</div>`;if(M.kind==="phase")return l`<div class="sv__phase">${M.text}</div>`;if(M.kind==="result")return l`<div
        class="sv__result${M.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${M.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${pr(M.text||(M.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(M.kind==="thinking"){let te=c.has(B);return l`<div
        class="sv__think${te?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ve(B)}
      >
        <span class="sv__think-line">💭 ${Qn(M.text)}</span>
        ${te?l`<pre class="sv__think-expand">${M.text}</pre>`:""}
      </div>`}if(M.kind==="error")return l`<div class="sv__error">⛔ ${M.text}</div>`;if(M.kind==="blocker")return l`<div class="sv__error">⛔ ${M.text}</div>`;if(M.kind==="tool"){let te=c.has(B),Pe=M.tool==="Bash"?$u(M.command):0,Te=M.tool==="Bash"?Pe>1?Qn(M.command):M.command:M.path||M.command||"";return l`<div
        class="sv__tool${te?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ve(B)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${M.icon}</span>
          <span class="sv__tool-name">${M.tool}</span>
          ${Te?l`<span class="sv__tool-detail">${Te}</span>`:""}
          ${Pe>1?l`<span class="sv__tool-more">⋯ ${Pe}줄</span>`:""}
          ${typeof M.added=="number"?l`<span class="sv__diff-add">+${M.added}</span>`:""}
          ${typeof M.removed=="number"?l`<span class="sv__diff-del">−${M.removed}</span>`:""}
          ${M.result?l`<span class="sv__tool-ok">→ ${M.result}</span>`:""}
        </span>
        ${te?l`<pre class="sv__tool-expand">${Je(M)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${pr(M.text||"")}</div>`}function Je(B){let M=[];if(B.tool==="Bash"&&typeof B.command=="string"&&B.command.length>0)M.push(B.command);else if(B.input!==void 0)try{M.push(`input: ${JSON.stringify(B.input,null,2)}`)}catch{}return typeof B.output=="string"&&B.output.length>0&&M.push(`output:
${B.output}`),M.join(`

`)}function et(){if(!o)return l``;let B=D(),M=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),te=a.session_id||"",Pe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${i?"ON":"OFF"}`,Te=N(),Be=Te?Cu(x(),Date.now()):"",Ee=Te?se(B):null,Xe=Te?he(B):null,Le=Eu(B);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${Le?l`<span
              class="sv__stage${Le.guess?" sv__stage--guess":""}"
              title=${Le.text}
              >${Le.text}</span
            >`:""}
        ${Te?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Be?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Be}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Be?l`<span class="sv__live-ago">${Be}</span>`:""}</span
            >`:""}
        ${te?l`<button
              type="button"
              class="sv__session"
              title=${te}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${te}`}
              @click=${()=>z(te)}
            >
              ⧉ ${te.slice(0,8)}
            </button>`:""}
        ${M?l`<span class="sv__meta">${M}</span>`:""}
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
          aria-label=${Pe}
          @click=${me}
        >
          <span class="sv__follow-full">⇣ ${Pe}</span>
          <span class="sv__follow-short">⇣ ${i?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>we()}
        >
          ✕
        </button>
      </div>
      ${j()}
      <div class="sv__body">
        ${B.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:ye(B).map(L=>L.kind==="group"?Re(L):Me(L.idx,L.line))}
      </div>
      ${Ee||Xe?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ee?l`<span class="sv__now-icon">${Ee.icon}</span>
                  <span class="sv__now-name">${Ee.tool}</span>
                  <span class="sv__now-detail"
                    >${Ee.tool==="Bash"?Qn(Ee.command):Ee.path||Ee.command||""}</span
                  >`:""}
            ${Xe?l`<span class="sv__now-think"
                  >💭 ${Qn(Xe.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Re(B){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Ke(B.idx)}
    >
      <span class="sv__group-icon">${B.lines[0].line.icon}</span>
      <span class="sv__group-name">${B.tool}</span>
      <span class="sv__group-count">${B.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ke(B){u.add(B),Ae()}function Ae(){Ue(et(),e),I(),i&&pe()}function pe(){let B=e.querySelector(".sv__body");B&&(B.scrollTop=B.scrollHeight)}function ve(B){c.has(B)?c.delete(B):c.add(B),Ae()}function me(){i=!i,Ae()}function z(B){Sr(B).then(M=>{M?K("\uBCF5\uC0AC\uB428","success",1200):K("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function H(B){!o||!B||(a={...a,...B},Ae())}function ge(B){let M=B.target;if(!M||!M.classList||!M.classList.contains("sv__body"))return;!(M.scrollHeight-M.scrollTop-M.clientHeight<=4)&&i&&(i=!1,Ae())}e.addEventListener("scroll",ge,!0);function V(B){let M=B&&B.attempt_id;M&&(o=M,a=B.meta||{},i=!0,c.clear(),u.clear(),$(),!f&&n&&(f=n.subscribe(Ae)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),Ae())}function we(){let B=o;o=null,c.clear(),u.clear(),$(),de(),r&&B&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${B}`})).catch(()=>{}),Ue(l``,e),s&&s()}return{open:V,updateMeta:H,close:we,isOpen(){return o!==null},destroy(){de(),f&&(f(),f=null),e.removeEventListener("scroll",ge,!0),o=null,Ue(l``,e)}}}function pn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Si(t.spec_id),s=Si(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Si(e){return typeof e=="string"?e.trim():""}function Ru(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Iu(e){let t=e&&e.metadata||{},r=pn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Ru(t)?null:"plan_pending"}),n}function Ai(e,t){let r=Iu(e);return l`
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
  `}var Lu="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Ou=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Du=/^\*\*결론\*\* — (.+)$/;function es(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Lu)return null;let r=Ou.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Du.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Ti=20;function Ei(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Mu(e){return e.length>Ti?`${e.slice(0,Ti)}\u2026`:e}function Pu(e,t,r,n){let s=`${t.lane} ${Mu(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Ei(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${pr(t.body)}
        </div>`:""}
  </div>`}function Nu(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Ei(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${pr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ci(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=es(typeof c.text=="string"?c.text:"");return u?Pu(c,u,t,s.has(c.id)):Nu(c)})}
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
  `}var Fu=["codex","opus","fable","self","skip"],qu=["codex","fable","skip"],Bu=["low","medium","high","xhigh"],Uu=["standard","fast_track"],Br=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],ro={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},Ri={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},ju=["self","skip"],zu="opus",no={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function so(e){let t=ro[e]||{title:e};return l`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?l`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function Hu(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:no[e]||"(\uAE30\uBCF8)"}function qr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Er(e){if(!qr(e)||!qr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>qr(r)&&qr(r.models));return t.length>0?t:null}function to(e){return{value:e,label:e}}function oo(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Ii(e,t,r=null){let n=Er(e);if(!n)return t?[{label:null,options:[to(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,i])=>({label:a,options:Object.keys(i.models).map(to)})),o=s.some(a=>a.options.some(i=>i.value===t));return t&&!o?[oo(t),...s]:s}function _r(e,t){let r={label:null,options:e.map(to)};return t&&!e.includes(t)?[oo(t),r]:[r]}function rr(e,t){let r=Er(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function ao(e,t){return qr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Wu(e,t){return qr(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():ao(e,t)}function Gu(e,t){let r=Er(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Wu(n,n.models[t]);return[]}function Yu(e,t){let r=Er(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function io(e,t){let r=Er(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return ao(n,n.models[t]);return[]}function Di(e){let t=Er(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of ao(n,s))r.includes(o)||r.push(o);return r}function Mi(e,t){if(!t)return Di(e);let n=Er(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of io(e,o))s.includes(a)||s.push(a);return s}function rs(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=rr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?io(t,n.impl_model):Mi(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Ur(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||zu,a=r("impl_model"),i=r("impl_runtime"),c=i==="claude"||i==="codex"?i:i==="inherit"?s===void 0?rr(n,o):s:null;return Br.map(u=>{let f=t(u),m,h=!1;return u==="orchestration_model"?m=Ii(n,f):u==="impl_runtime"?m=_r(["inherit","claude","codex"],f):u==="impl_model"?(m=c?Ii(n,f,c):f?[oo(f)]:[],h=i==="inherit"&&c===null):u==="orchestration_effort"?m=_r(Gu(n,o),f):u==="orchestration_speed"?m=Vu(Yu(n,o),f):u==="impl_effort"?(m=_r(a?io(n,a):c?Mi(n,c):Di(n),f),h=i==="inherit"&&c===null):u==="plan_review_model"?m=_r(qu,f):Object.hasOwn(Ri,u)?(m=_r(Bu,f),h=ju.includes(r(Ri[u]))):m=_r(Fu,f),{key:u,groups:m,selected:f,disabled:h,runner:u==="orchestration_model"?rr(n,o):null}})}function ts(e,t,r){return l`
    ${typeof r=="string"?l`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Li(s,t)):l`<optgroup label=${n.label}>
            ${n.options.map(s=>Li(s,t))}
          </optgroup>`)}
  `}function Vu(e,t){return _r(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function Li(e,t){return l`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Oi(e,t,r,n,s,o,a){return l`
    <div class="detail-kv">
      <span class="detail-kv__k">${so(e)}</span>
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
  `}function Pi(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},i=m=>typeof o[m]=="string"?o[m]:"",u=Ur({selectedOf:i,effectiveOf:m=>{let h=i(m);return h||(typeof a[m]=="string"?a[m]:"")},runner_catalog:n}),f=o.workflow_mode==="fast_track"?"fast_track":"standard";return l`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${u.map(m=>Oi(m.key,ts(m.groups,m.selected,Hu(m.key,a,s)),m.selected,!1,m.disabled,m.runner,t))}
    ${Oi("workflow_mode",ts(_r(Uu,f),f),f,o.workflow_mode==="fast_track",!1,null,t)}
  `}function Ku(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Ni(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function c(T){T.key==="Escape"&&s&&(T.preventDefault(),h())}document.addEventListener("keydown",c);function u(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ku(s)}</span
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
    `:l``}function f(){Ue(u(),e)}async function m(T,R={}){s=T,o="loading",a="",i="",f();let U=r?r():"";if(!U){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let $="/api/doc?workspace="+encodeURIComponent(U)+"&path="+encodeURIComponent(T);try{let G=await n($),X=await G.json().catch(()=>({}));if(!G.ok||!X||X.ok!==!0){if(X?.error==="not_found"&&R.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(X&&X.error||G.status)+")",f();return}a=String(X.content||""),o="ready",f()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function h(){s=null,Ue(l``,e)}function E(){document.removeEventListener("keydown",c),h()}return{open:m,close:h,destroy:E}}var Zu=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Bi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Xu(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Qu(e){let t=gt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Pr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${Bi}
          >부분 집계</span
        >`:""}`}function Fi(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function qi(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ui(t):""}function Ju(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=gt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
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
        ${qi(s.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
              >${qi(s.completed_at)}</span
            >`:""}
        ${a?l`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function ep(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Zu,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${n.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Xu(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${Bi}</span>`:""}
  </div>`}var tp={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ui(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function rp(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function ji(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let m=typeof u.session_id=="string"&&u.session_id.length>0,h=o.has(u.attempt_id),E=m&&!h,T=m?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!E}
      title=${T}
      @click=${R=>{R.stopPropagation(),E&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let m=u.cause_detail,h=m&&typeof m.reason=="string"&&m.reason.length>0?typeof m.command=="string"&&m.command.length>0?`${m.reason} \xB7 ${m.command}`:m.reason:u.cause;return l`<div class="detail-session__cause" title=${h}>
      ${u.cause}
    </div>`},c=u=>{let f=Fi(Ls(u));if(gt(f).length===0&&!Pr(u.usage))return"";let m=s.has(u.attempt_id);return l`<button
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
      세션 이력${Qu(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=Ls(u),m=Fi(f),h=gt(m);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${tp[u.status||""]||"\xB7"}</span
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
                    >`):Pr(u.usage)?l`<span class="detail-session__usage"
                    >${Pr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ui(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${i(u)} ${rp(u)}
          ${s.has(u.attempt_id)&&u.usage?ep(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Ju(f)}
        </div>`})}
    </div>
  `}function zi(e,t={}){return l`
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
          ${np(e)}
        </div>`:""}
  `}function np(e){let t=Fr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?tr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Xn(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?tr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var sp=["open","in_progress","deferred","resolved","closed"],op=[0,1,2,3,4];function Hi(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,f=null,m={},h="",E=!1,T=!1,R=!1,U="",$="",G="";function X(){T=!1,R=!1,U="",$="",G=""}let j=[],D=null,x=null,N=!1,I="",de=!1,ye=0,se=new Set;function he(){j=[],D=null,x=null,N=!1,I="",de=!1,ye+=1,se.clear()}async function Me(d){if(!s)return;let w=++ye;try{let y=await Promise.resolve(s("get-comments",{id:d}));if(w!==ye||d!==u)return;j=Array.isArray(y)?y:[],N=!1}catch{if(w!==ye||d!==u)return;N=!0}_()}function Je(){if(!s||!u)return;let d=f&&typeof f.comment_count=="number"?f.comment_count:null;if(D!==u){D=u,x=d,Me(u);return}d!==null&&d!==x&&(x=d,Me(u))}function et(d){se.has(d)?se.delete(d):se.add(d),_()}function Re(d){let w=I.trim().length===0;I=d,w!==(d.trim().length===0)&&_()}async function Ke(){let d=I.trim();if(!s||!u||d.length===0||de)return;let w=u;de=!0,_();let y=!1;try{let O=await Promise.resolve(s("add-comment",{id:w,text:d}));Array.isArray(O)&&O.length>0&&(y=!0,w===u&&(j=O,N=!1,I="",x=O.length))}catch{y=!1}y||K("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),w===u&&(de=!1),_()}let Ae={onToggle:et,onDraftInput:Re,onSubmit:Ke},pe=document.createElement("div");pe.className="md-viewer-root",document.body.appendChild(pe);let ve=Ni(pe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),me=document.createElement("div");me.className="session-log-root",document.body.appendChild(me);let z=Jn(me,{transport:s?(d,w)=>Promise.resolve(s(d,w)):void 0,sessionLogStore:c}),H=!1,ge=!1,V=!1,we=null,B=null,M=0;function te(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function Pe(){H=!1,ge=!1,V=!1,we=null,B=null,M+=1}async function Te(d){if(!s)return;let w=++M;ge=!0,V=!1,_();try{let y=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if(w!==M)return;!y||typeof y!="object"||Array.isArray(y)?V=!0:(we=y,B=te(d))}catch{w===M&&(V=!0)}finally{w===M&&(ge=!1,_())}}function Be(){if(H=!H,H&&u&&B!==te(u)){we=null,Te(u);return}_()}function Ee(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(y=>y&&y.bead_id===u).sort((y,O)=>(O.started_at||0)-(y.started_at||0)).map(y=>({attempt_id:y.attempt_id,bead_id:y.bead_id,status:y.status,started_at:typeof y.started_at=="number"?y.started_at:null,runner:y.runner||null,model:y.model||null,effort:y.effort||null,speed:y.speed||null,session_id:y.session_id||null,resumed_from:y.resumed_from||null,continuation_mode:y.continuation_mode||null,dismissed_at:typeof y.dismissed_at=="number"?y.dismissed_at:null,cause:typeof y.cause=="string"?y.cause:null,cause_detail:y.cause_detail||null,exec_default_preset_id:typeof y.exec_default_preset_id=="string"?y.exec_default_preset_id:null,exec_default_preset_revision:typeof y.exec_default_preset_revision=="number"?y.exec_default_preset_revision:null,exec_values:y.exec_values&&typeof y.exec_values=="object"?y.exec_values:null,usage:y.usage||null,usage_legs:Array.isArray(y.usage_legs)?y.usage_legs:[]}))}function Xe(){if(!a||!u)return null;let d=a.get();return Dt(d&&d.attempts||{},u)}let Le=new Set;function L(d){Le.has(d)?Le.delete(d):Le.add(d),_()}function S(d){let w=a?a.get():null,y=w&&w.attempts?w.attempts[d]:null;z.open({attempt_id:d,meta:y?{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.status||void 0,session_id:y.session_id||void 0}:{}})}async function k(d){if(!s||!d)return;let w=()=>{let $e=a?a.get():null;return $e&&typeof $e.revision=="number"?$e.revision:0},y=async($e={})=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:w(),...$e}),O=$e=>{$e?.queue&&a?.set&&a.set($e.queue)},J=await y();if(O(J),J&&J.conflict){let $e=J.queue&&typeof J.queue.revision=="number"?J.queue.revision:w();J=await s("worker-attempt-resume",{attempt_id:d,expected_revision:$e}),O(J)}J=await Gt(J,($e,mt)=>y({continuation:$e,decision_token:mt}),{onResult:O,refresh:()=>y()}),J&&J.resumed===!1&&!J.conflict&&J.reason&&K(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${J.reason}`,"error",2400)}let A={onOpen:S,onResume:k,onToggleUsage:L};function P(){let d=a?a.get():null,w=d&&d.default_exec_preset_id,y=typeof w=="string"?Oe()?.presets.find(O=>O.id===w):null;return y&&y.compatible!==!1&&y.settings?y.settings:{}}function ee(){let d=a?a.get():null,w=d&&d.default_exec_preset_id,y=typeof w=="string"?Oe()?.presets.find(O=>O.id===w):null;return y&&y.compatible!==!1&&typeof y.name=="string"?y.name:""}function Z(){let d=a?a.get():null;return d&&d.runner_catalog||null}function ue(){let d=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},y=(Object.hasOwn(m,"orchestration_model")?m.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof P().orchestration_model=="string"?P().orchestration_model:"")||"opus";return rr(Z(),y)}function Oe(){let d=i?i.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function tt(d){let w=d&&d.settings&&typeof d.settings=="object"?d.settings:{},y=O=>typeof w[O]=="string"?w[O]:O==="impl_runtime"&&typeof w.impl_model=="string"&&rr(Z(),w.impl_model)||"";return Ur({selectedOf:y,effectiveOf:y,runner_catalog:Z()}).some(O=>O.groups.some(J=>J.options.some($e=>$e.value===O.selected&&$e.label.endsWith("(\uBE44\uD638\uD658)"))))}function ot(d){i&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&i.set({revision:d.revision,presets:d.presets})}async function Ye(){let d=Oe(),w=d?.presets.find(y=>y.id===h);if(!(!s||!u||!d||!w||tt(w)||E)){E=!0,_();try{let y=await Promise.resolve(s("apply-exec-preset",{id:u,preset_id:w.id,expected_revision:d.revision}));if(y&&y.conflict){ot(y),K("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let O=y&&Array.isArray(y.issue)?y.issue[0]:y?.issue;if(y&&y.applied&&O&&typeof O=="object"){f=O;for(let J of Br)delete m[J];K("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}y&&y.error==="bd_readback_failed"?K("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):K("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(y){y&&typeof y=="object"&&y.code==="bd_readback_failed"?K("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):K("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{E=!1,_()}}}function bt(){let d=Oe();if(d&&d.presets.length===0)return l`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let w=d?d.presets:[],y=w.find(J=>J.id===h),O=y?tt(y):!1;return l`<section class="detail-exec-presets">
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
          ${w.map(J=>{let $e=tt(J);return l`<option
              value=${J.id}
              ?selected=${J.id===h}
            >
              ${J.name}${$e?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${d===null||!y||O||E}
          @click=${()=>{Ye()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let ut=null;r&&r.subscribe&&(ut=r.subscribe(()=>rt()));let lt=null;a&&typeof a.subscribe=="function"&&(lt=a.subscribe(()=>{u&&_()}));let yt=null;i&&typeof i.subscribe=="function"&&(yt=i.subscribe(()=>{u&&_()}));function It(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",It);function rt(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];f=d.find(y=>y&&y.id===u)||d[0]||f}Je(),_()}}function at(d){Sr(d).then(w=>{w?K("\uBCF5\uC0AC\uB428","success",1200):K("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function nt(d){d.preventDefault(),d.stopPropagation(),u&&at(u)}function ct(d,w){d.preventDefault(),d.stopPropagation(),at(w)}function De(d,w,y){d.preventDefault(),d.stopPropagation(),ve.open(w,{missing_state:y})}function F(d,w){m[d]=w,_(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",{id:u,key:d,value:w})).catch(()=>{K("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Y(d,w){let y=f||{},O=y.metadata&&typeof y.metadata=="object"?y.metadata:{},J={};for(let qe of["impl_runtime","impl_model","impl_effort"])J[qe]=Object.hasOwn(m,qe)?m[qe]:typeof O[qe]=="string"?O[qe]:"";J[d]=w;let $e=rs(J,Z(),ue()),mt={};for(let qe of["impl_runtime","impl_model","impl_effort"])mt[qe]=m[qe],m[qe]=$e[qe]||"";_(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...$e,orchestration_runtime:ue()})).then(qe=>{let or=Array.isArray(qe)?qe[0]:qe;if(!or||typeof or!="object"||!or.id)throw new Error("implementation target readback failed");f=or;for(let is of["impl_runtime","impl_model","impl_effort"])delete m[is];_()}).catch(()=>{for(let qe of["impl_runtime","impl_model","impl_effort"])mt[qe]===void 0?delete m[qe]:m[qe]=mt[qe];_(),K("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function oe(d,w,y){if(!s||!u)return!1;try{let O=await Promise.resolve(s(d,w)),J=Array.isArray(O)?O[0]:O;return J&&typeof J=="object"&&J.id?(f=J,!0):(K(y,"error"),!1)}catch{return K(y,"error"),!1}}function fe(d){setTimeout(()=>{try{let w=e.querySelector(d);w&&typeof w.focus=="function"&&w.focus()}catch{}},0)}function ke(){T=!0,U=f&&f.title||"",_(),fe('.detail-edit__input[data-edit="title"]')}function Ce(d){U=d.target.value}function ze(){T=!1,U="",_()}function Qe(){oe("edit-text",{id:u,field:"title",value:U},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(w=>{w&&(T=!1,U=""),_()})}function Se(){R=!0,$=f&&f.description||"",_(),fe('.detail-edit__textarea[data-edit="description"]')}function We(d){$=d.target.value}function xe(){R=!1,$="",_()}function pt(){oe("edit-text",{id:u,field:"description",value:$},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(w=>{w&&(R=!1,$=""),_()})}function ht(d,w,y,O){if(d.key==="Escape"){d.stopPropagation(),y();return}d.key==="Enter"&&(!O||d.ctrlKey||d.metaKey)&&(d.preventDefault(),w())}function sr(d){let w=d.target.value;oe("update-status",{id:u,status:w},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>_())}function jt(d){let w=Number(d.target.value);oe("update-priority",{id:u,priority:w},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>_())}function p(d){G=d.target.value}function v(){let d=G.trim();d.length!==0&&oe("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(w=>{w&&(G=""),_()})}function C(d){if(d.key==="Escape"){d.stopPropagation(),G="",_();return}d.key==="Enter"&&(d.preventDefault(),v())}function Q(d){oe("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>_())}let _e={onCopyPath:ct,onOpenDoc:De},be={onChange:F,onImplTargetChange:Y};function ie(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function le(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ie(d){let y=(Array.isArray(d.dependencies)?d.dependencies:[]).map(O=>({id:ie(O),icon:le(O)})).filter(O=>O.id.length>0);return l`
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
    `}function it(d){let w=d.metadata||{},y=d.workflow||{},O=y.stages||{},J=O.spec&&O.spec.stale,$e=O.impl&&O.impl.stale,mt=O.plan||null,qe=y.route_source==="derived",or=y.route||w.route||"\u2014";return l`
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
              >${w.impl_review||"\uC5C6\uC74C"}${$e?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${w.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${w.pr_url}</span>
          </div>`:""}
    `}let ft={route:["quick_fix","spec_backed","full_plan"]};async function St(d,w){let y=w.target.value;if(d==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&y!=="full_plan"&&!window.confirm(`full_plan \u2192 ${y||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){_();return}await oe("update-workflow-meta",{id:u,key:d,value:y},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),_()}function vt(d){let w=d.metadata||{};return l` ${((O,J)=>{let $e=ft[O],mt=typeof w[O]=="string"?w[O]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${O}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${O}
          data-edit=${`wfmeta-${O}`}
          @change=${qe=>St(O,qe)}
        >
          <option value="" ?selected=${!$e.includes(mt)}>
            ${J}
          </option>
          ${$e.map(qe=>l`<option value=${qe} ?selected=${mt===qe}>${qe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function ce(d,w){return T?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${U}
            @input=${Ce}
            @keydown=${y=>ht(y,Qe,ze,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Qe}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${ze}
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
          @click=${ke}
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
    `}function W(d,w){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${sr}
        >
          ${sp.map(y=>l`<option value=${y} ?selected=${y===d}>${y}</option>`)}
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
          ${op.map(y=>l`<option value=${String(y)} ?selected=${y===w}>
                P${y}
              </option>`)}
        </select>
      </div>
    `}function re(d){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${R?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Se}
            >
              ✎
            </button>`}
      </div>
      ${R?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${$}
              @input=${We}
              @keydown=${w=>ht(w,pt,xe,!0)}
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
                @click=${xe}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${d||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Fe(d){let w=typeof d.notes=="string"?d.notes:"";return w.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${w}</div>
    `}function Ve(d){let w=Array.isArray(d.labels)?d.labels:[];return l`
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
            .value=${G}
            @input=${p}
            @keydown=${C}
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
    `}function ae(){if(!u)return l``;let d=f||{},w=String(d.id||u),y=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",O=Xe(),J=d.status||"open",$e=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",mt=d.description||"",qe={...d,metadata:{...d.metadata||{},...m}};return l`
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
          ${ce(y,O)}
          ${W(J,$e)} ${b(d)}
          ${re(mt)}
          ${Ci(j,Ae,{expanded:se,draft:I,sending:de,error:N})}
          ${Fe(d)} ${Ve(d)} ${Ie(d)}
          ${it(d)} ${vt(d)}
          ${Ai(d,_e)}
          ${bt()}
          ${Pi(qe,be,P(),Z(),ee())}
          ${zi({expanded:H,loading:ge,error:V,data:we},{onToggle:Be})}
          ${ji(Ee(),A,{total:O,expanded:Le})}
        </div>
      </div>
    `}function _(){Ue(ae(),e)}return{load(d){d!==u&&(m={},h="",X(),he(),Pe()),u=d,f=null,rt()},clear(){u=null,f=null,m={},h="",E=!1,X(),he(),Pe(),ve.close(),z.close(),Ue(l``,e)},destroy(){ut&&(ut(),ut=null),lt&&(lt(),lt=null),yt&&(yt(),yt=null),document.removeEventListener("keydown",It),ve.destroy(),pe.parentNode&&pe.parentNode.removeChild(pe),z.destroy(),me.parentNode&&me.parentNode.removeChild(me),u=null,f=null,h="",E=!1,he(),Pe(),Ue(l``,e)}}}var ap=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Wi(e,t){return Cs(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function ip(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function Gi(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function i(x){let N=r.get();if(N)try{let I=await n("display-policy-set",{expected_revision:N.revision,policy:x(N)});c(I),I&&I.conflict&&I.policy&&(I=await n("display-policy-set",{expected_revision:I.policy.revision,policy:x(I.policy)}),c(I)),I&&I.conflict&&K("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{K("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function c(x){x&&x.policy&&typeof x.policy=="object"&&r.set(x.policy)}function u(x){let N=r.get();if(!N)return;let I=Wi(x,N)!=="shown";i(de=>ip(x,de,I))}function f(){let x=a.trim();x.length!==0&&(a="",i(N=>N.hidden_prefixes.includes(x)?{hidden_prefixes:N.hidden_prefixes}:{hidden_prefixes:[...N.hidden_prefixes,x]}),U())}function m(x){i(N=>({hidden_prefixes:N.hidden_prefixes.filter(I=>I!==x)}))}function h(x){let N=r.get();if(!N)return;let I=N.chips[x]===!1;i(()=>({chips:{[x]:I}}))}function E(x){let N=s();return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${N.length===0?l`<div class="display-settings__empty">라벨 없음</div>`:l`<div class="display-settings__pills">
              ${N.map(I=>{let de=Wi(I,x);return l`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${de}`}
                  data-label=${I}
                  data-state=${de}
                  @click=${()=>u(I)}
                >
                  ${I}
                </button>`})}
            </div>`}
      </section>
    `}function T(x){return l`
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
    `}function R(x){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${ap.map(([N,I])=>l`<label class="display-settings__toggle">
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
    `}function U(){let x=r.get();Ue(l`
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
            ${x?l`${E(x)} ${T(x)}
                ${R(x)}`:l`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let $=!1,G=()=>{$=!1};o.addEventListener("close",G),o.addEventListener("cancel",G);let X=null;r.subscribe&&(X=r.subscribe(()=>{$&&U()}));function j(){$||(a="",$=!0,U(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function D(){$&&($=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:j,close:D,destroy(){$=!1,o.removeEventListener("close",G),o.removeEventListener("cancel",G),X&&(X(),X=null),o.remove()}}}function Yi(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,f,m="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let h=typeof m=="string"?m.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function Vi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Ki(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}function ns(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let i=null,c=!1;function u(){return r&&r.get()||{revision:0,exec_defaults:{}}}function f(){let L=u();return typeof L.revision=="number"?L.revision:0}function m(){let L=n?n.get():null;return!L||typeof L.revision!="number"?null:{revision:L.revision,presets:Array.isArray(L.presets)?L.presets:[]}}function h(L){n&&L&&typeof L.revision=="number"&&Array.isArray(L.presets)&&n.set({revision:L.revision,presets:L.presets})}function E(L){L&&L.queue&&r&&r.set(L.queue)}function T(){return u().runner_catalog??null}let R=null;function U(){if(R!==null)return R;let L=u().default_exec_preset_id;return typeof L=="string"&&L.length>0?L:null}async function $(L){if(!s)return;let S=m();if(!S)return;R=L||"";let k=D(L);if(M(),!k.viable){K(k.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3);return}try{let A=await s("worker-queue-set-default-exec-preset",{preset_id:L||null,expected_queue_revision:f(),expected_preset_revision:S.revision});if(E(A),A&&A.presets&&n&&n.set(A.presets),A&&A.conflict){K("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3);return}if(A&&A.applied){R=null,M();return}K("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{K("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function G(L){i={id:L.id,name:L.name,settings:{...L.settings||{}}},N(),c=!1,M()}function X(){i={id:null,name:"",settings:{}},c=!1,M()}function j(L){let S=L&&L.settings&&typeof L.settings=="object"?L.settings:{},k=A=>typeof S[A]=="string"?S[A]:A==="impl_runtime"&&typeof S.impl_model=="string"&&rr(T(),S.impl_model)||"";return Ur({selectedOf:k,effectiveOf:k,runner_catalog:T()}).some(A=>A.groups.some(P=>P.options.some(ee=>ee.value===A.selected&&ee.label.endsWith("(\uBE44\uD638\uD658)"))))}function D(L){if(!L)return{viable:!0,missing:!1,incompatible:!1,preset:null};let k=m()?.presets.find(P=>P.id===L);if(!k||k.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let A=k.compatible===!1||j(k);return{viable:!A,missing:!1,incompatible:A,preset:k}}function x(){let L=i?.settings.orchestration_model;return typeof L!="string"?null:rr(T(),L)}function N(){if(!i)return;let L=rs({impl_runtime:i.settings.impl_runtime||"",impl_model:i.settings.impl_model||"",impl_effort:i.settings.impl_effort||""},T(),x());for(let S of["impl_runtime","impl_model","impl_effort"])L[S]?i.settings[S]=L[S]:delete i.settings[S]}function I(L){let S=L&&L.settings&&typeof L.settings=="object"?L.settings:{},k=Br.filter(P=>typeof S[P]=="string").length,A=Br.filter(P=>typeof S[P]=="string").map(P=>`${ro[P]?.title||P}: ${S[P]}`);return{count:`${k}/12 \uC9C0\uC815`,choices:A.length>0?A.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function de(L){if(!s||!window.confirm(`\u201C${L.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let S=m();if(S)try{let k=await s("exec-preset-delete",{expected_revision:S.revision,id:L.id});h(k),k&&k.conflict&&K("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{K("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function ye(L=!1){if(!s||!i)return;let S=m();if(!S)return;let k=L||i.id===null,A={expected_revision:S.revision,...k?{}:{id:i.id},name:i.name,settings:{...i.settings}};try{let P=await s(k?"exec-preset-create":"exec-preset-update",A);if(h(P),P&&P.conflict){c=!0,M();return}if(P&&P.applied){i=null,c=!1,M();return}K("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{K("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function se(L){return l`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${so(L.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${L.key}
        ?disabled=${L.disabled}
        @change=${S=>{if(!i)return;let k=S.target.value;k?i.settings[L.key]=k:delete i.settings[L.key],(L.key==="impl_runtime"||L.key==="impl_model"||L.key==="impl_effort"||L.key==="orchestration_model")&&N(),c=!1,M()}}
      >
        ${ts(L.groups,L.selected,no[L.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function he(){if(!i)return"";let L=P=>typeof i?.settings[P]=="string"?i.settings[P]:"",S=Ur({selectedOf:L,effectiveOf:L,runner_catalog:T(),controller_runtime:x()}),k=m(),A=i.id!==null&&k!==null&&!k.presets.some(P=>P.id===i?.id);return l`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${i.name}
          data-preset-name
          @input=${P=>{i&&(i.name=P.target.value,c=!1)}}
        />
      </label>
      ${c?l`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${A?l`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      ${S.map(se)}
      <div class="exec-preset-editor__actions">
        ${A?l`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{ye(!0)}}
            >
              새 프리셋으로 저장
            </button>`:l`<button
              type="button"
              data-preset-save
              @click=${()=>{ye(!1)}}
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
    </div>`}function Me(){let L=m(),S=L?L.presets.filter(k=>k?.migration_pending!==!0):[];return l`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${X}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${L===null?l`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:S.length===0?l`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:S.map(k=>{let A=I(k),P=typeof k.reference_count=="number",ee=P?k.reference_count:null,Z=Array.isArray(k.reference_summary)?k.reference_summary.map(ue=>ue?.display_name||ue?.workspace_key).filter(Boolean).join(", "):"";return l`<article
                class="exec-preset-card"
                data-preset-id=${k.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${k.name}</strong>
                  <span>${A.count}</span>
                  <span data-preset-references=${k.id}
                    >${P?`\uCC38\uC870 ${ee}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${j(k)?l`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${A.choices}</small>
                  ${Z?l`<small data-preset-impact=${k.id}
                        >업데이트 영향: ${Z}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  <button
                    type="button"
                    data-preset-edit=${k.id}
                    @click=${()=>G(k)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${k.id}
                    ?disabled=${ee===null||ee>0||k.reference_scan_complete===!1}
                    title=${ee===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ee>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":k.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{de(k)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${he()}
    </section>`}function Je(){let L=m(),S=L?L.presets.filter(Z=>Z?.migration_pending!==!0):[],k=U()||"",A=D(k),P=A.preset,ee=P?I(P):null;return l`<section class="exec-defaults__workspace" data-workspace-preset>
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
        ?disabled=${L===null}
        @change=${Z=>{$(Z.target.value)}}
      >
        <option value="" ?selected=${k===""}>
          없음 — harness 기본값
        </option>
        ${k&&A.missing?l`<option value=${k} ?selected=${!0}>
              ${k} (선택한 프리셋 없음)
            </option>`:""}
        ${S.map(Z=>l`<option
              value=${Z.id}
              ?selected=${Z.id===k}
              ?disabled=${Z.compatible===!1}
            >
              ${Z.name}${Z.compatible===!1?" (\uBE44\uD638\uD658)":""}
            </option>`)}
      </select>
      ${P?l`<p data-workspace-preset-summary>
            ${ee?.count} · ${ee?.choices}
            ${A.incompatible?" \xB7 \uBE44\uD638\uD658":""}
          </p>`:""}
      ${A.missing?l`<p data-workspace-preset-missing>
            선택한 프리셋을 찾을 수 없습니다. 실행이 차단됩니다.
          </p>`:A.incompatible?l`<p data-workspace-preset-incompatible>
              선택한 프리셋이 비호환입니다. 실행이 차단됩니다.
            </p>`:""}
    </section>`}function et(){let L=u().workspace_info;return L&&typeof L=="object"?L:{}}function Re(L,S){return l`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${L}"
      >${S}</span
    >`}function Ke(L){let S=L?Ki(L.cmd):"",k=L?Vi(L.timeout_ms):"",A=o&&o()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${S?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${S}</span>
            ${Re("config","config")}
            ${k?l`<span class="exec-defaults__vd-meta"
                  >timeout ${k}</span
                >`:""}
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${A}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function Ae(L){let S=L?Ki(L.cmd):"",k=L?Vi(L.timeout_ms):"",A=k?`timeout ${k} \xB7 external deployer \uC2E4\uD589`:"external deployer \uC2E4\uD589";return l`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${S?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${S}</span>
            ${Re("deployer","external")}
            <span class="exec-defaults__vd-meta">${A}</span>
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >docs/agents/repo-ops.toml [deploy]</span
            >
            선언으로 정의
          </div>`}
    </div>`}let pe=!1,ve=!1,me=!1,z=null;async function H(){if(s){ve=!0,me=!1,M();try{let L=await Promise.resolve(s("get-worker-system-prompt",{}));!L||typeof L!="object"||Array.isArray(L)?me=!0:z=L}catch{me=!0}finally{ve=!1,M()}}}function ge(){if(pe=!pe,pe&&!z){H();return}M()}function V(){return l`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${pe?"true":"false"}
          @click=${ge}
        >
          ${pe?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${pe?we():""}
    </section>`}function we(){let L=Fr({loading:ve,error:me});if(L)return L;if(!z)return"";let S=Array.isArray(z.variants)?z.variants:[];return l`<div class="exec-defaults__sp-body">
      ${z.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${z.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${S.map(k=>l`<div class="exec-defaults__sp-variant" data-variant=${k.key}>
            <div class="exec-defaults__sp-cond">${k.condition}</div>
            ${tr(k.label,k.system_prompt)}
          </div>`)}
    </div>`}function B(L){return l`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — repo 선언/config에서 정의</span
        >
      </p>
      ${Ke(L.verify_cmd)} ${Ae(L.deploy_cmd)}
    </section>`}function M(){if(Ue(l`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${Le}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${Me()} ${Je()}
            ${B(et())}
            ${V()}
          </div>
        </div>
      `,a),R!==null){let L=a.querySelector("[data-workspace-preset-select]");L&&(L.value=R)}}let te=!1,Pe=()=>{te=!1},Te=L=>{L.target===L.currentTarget&&Le()};a.addEventListener("close",Pe),a.addEventListener("cancel",Pe),a.addEventListener("click",Te);let Be=null;r&&r.subscribe&&(Be=r.subscribe(()=>{te&&M()}));let Ee=null;n&&n.subscribe&&(Ee=n.subscribe(()=>{te&&M()}));function Xe(){te||(te=!0,M(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function Le(){te&&(te=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Xe,close:Le,destroy(){te=!1,a.removeEventListener("close",Pe),a.removeEventListener("cancel",Pe),a.removeEventListener("click",Te),Be&&(Be(),Be=null),Ee&&(Ee(),Ee=null),a.remove()}}}function lp(e){return{deployment_requested:"\uBC30\uD3EC \uC694\uCCAD",provider_attempt:"\uC678\uBD80 \uBC30\uD3EC \uD655\uC778",automatic_retry:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4",recovery_prepared:"\uBCF5\uAD6C \uC900\uBE44",recovery_session:"\uBCF5\uAD6C \uC138\uC158",confirmation_required:"\uC2B9\uC778 \uB300\uAE30",deployment_succeeded:"\uC131\uACF5 \uAD00\uCE21"}[e]||"\uBC30\uD3EC \uAC31\uC2E0"}function Zi(e){if(!e||typeof e!="object"||typeof e.state!="string"||typeof e.repo!="string"||typeof e.desired_sha!="string")return"";let t=Array.isArray(e.timeline)?e.timeline.slice(0,5):[],r=e.recovery&&typeof e.recovery=="object"?e.recovery:null,n=Array.isArray(e.actions)?e.actions:[],s=n.find(a=>a?.kind==="view_session"&&typeof a.attempt_id=="string"),o=n.find(a=>a?.kind==="continue_recovery"&&typeof a.attempt_id=="string");return l`<details
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
                  ${lp(String(a?.kind||""))}
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
  </div>`}function cp(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function fn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ss(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Yt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,m)=>(f.requested_at||0)-(m.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?cp(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:u}}function nr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return l`<div
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
  </div>`}function lo(e){let t=e.draggable&&!e.done,r=t&&e.lane==="queue",n=Array.isArray(e.badges)?e.badges:[],s=gt(e.usage),o=Ft(e.usage),a=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action,c=e.lane==="done"&&!i,u=c?Ct(e.done_at):"",f=e.selectable?l`<input
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
      >`:"",T=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,R=l`<span class="worker-mini__title">${e.title}</span>`,U=e.pr_url&&e.pr_number?l`<a
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
        >`:"",G=n.map(he=>he===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${he}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${he===e.completion_badge&&e.completion_title||""}
          >${he}</span
        >`),X=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",j=s.length>0?s.map(he=>l`<span class="worker-usage" title=${he.tooltip}
              >${he.label}</span
            >`):o?l`<span class="worker-usage" title=${Nr(e.usage)}
            >${o}</span
          >`:"",D=a?l`<span class="merge-step"
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
      </button>`:"",I=e.discard,de=I?.action||e.discard_action?l`<button
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
        </button>`:"",ye=e.revise_action?l`<button
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
    ${c?l`<div class="worker-mini__row1">${E}${T}${R}</div>
          <div class="worker-mini__row2">
            ${j}${u?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Tt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${G}${D}
            <span class="worker-mini__actions"
              >${x}${N}${de}</span
            >
            ${jr(e)}
          </div>`:i?l`<div class="worker-mini__head">
              ${f}${m}${E}${T}${U}${$}${G}${h}${X}
            </div>
            <div class="worker-mini__body">${R}</div>
            ${se?l`<div class="worker-mini__foot">
                  ${j}${D}
                  <span class="worker-mini__actions"
                    >${x}${N}${de}${ye}</span
                  >
                  ${nr(e)}
                </div>`:""}
            ${jr(e)}`:l`<div class="worker-mini__line">
              ${f}${m}${E}${T}${R}${U}${$}${G}${h}${X}${j}${D}${x}${N}${de}
            </div>
            ${nr(e)} ${jr(e)}`}
  </div>`}function dp(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return l`<div
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
    ${r?Pn(r,e.status):""}
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?dp(n):lo(n))}
          </div>`}
  </section>`}var Xi=160;function Qi(e){return e.length>Xi?`${e.slice(0,Xi)}\u2026`:e}function up(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${Qi(e.command)}</code>`:""}
  </div>`}function pp(e){return e?l`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function fp(e){return e?l`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function co(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Ji(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return l`<div class="worker-banners">
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
          ${up(e.failure.cause_detail)}
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
                <code>${Qi(r.detail)}</code>
              </div>`:""}
          ${fp(r.log_path)} ${pp(r.output_tail)}
        </div>`)}
  </div>`}function _p(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?co(t-e.started_at):"\u2014",a=Wt(e),i=dr(e),c=gt(e.usage),u=Ft(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,h=e.attempt_id&&e.attempt_id===r,E=e.discard?.action?l`<button
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
          ${c.length>0?c.map(T=>l`<span class="worker-usage" title=${T.tooltip}
                    >${T.label}</span
                  >`):u?l`<span
                  class="worker-usage"
                  title=${Nr(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${jr(e)} ${nr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function uo(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>_p(s,t,r))}
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
  </svg>`}function po(){return mr(Zt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function fo(){return mr(Zt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function el(){return mr(Zt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function tl(){return mr(Zt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function rl(){return mr(Zt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function nl(){return mr(Zt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function sl(){return mr(Zt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function ol(){return mr(Zt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var _n=1,mp=6e4,gp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},hp=new Set(["auto_merge","merged","merge","done"]),al={running:3,paused:2,failed:1};function bp(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function yp(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),h=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let m=al[u.run_state],h=al[i];if(m>h||m===h&&(u.started_at??0)>(c??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Dt(e,a.bead_id),can_pause:i==="running"&&f,can_resume:i!=="running"&&f&&!n.has(a.attempt_id)})}return o}function il(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Rt(e){return e&&typeof e=="object"?e:{}}function _o(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let $ of s)$&&typeof $.root_dir=="string"&&a.set($.root_dir,$);let i=[],c=[],u=[],f=[],m=[],h=new Map;for(let $ of n){if(!$||typeof $.root_dir!="string")continue;let G=$.root_dir,X=$.name||G,j=a.get(G),D=j&&typeof j.revision=="number"?j.revision:typeof $.revision=="number"?$.revision:0,x=Rt($.attempts),N=Rt($.bead_titles),I=Rt($.pr_observations),de=Rt($.admission),ye=Rt($.revise_parked),se=Rt($.merge_queue_state),he=Rt($.cleanup_failed),Me=Rt($.discard_operations),Je=Array.isArray($.merge_queue)?$.merge_queue:[],et=new Set(Je.filter(z=>z&&typeof z.bead_id=="string").map(z=>z.bead_id)),Re=new Map(Je.filter(z=>z&&typeof z.bead_id=="string").map(z=>[z.bead_id,z])),Ke=Array.isArray($.queue)?$.queue:[],Ae=Array.isArray($.done)?$.done:[],pe=new Map;for(let z of Ae)z&&typeof z.bead_id=="string"&&typeof z.added_at=="number"&&pe.set(z.bead_id,z.added_at);let ve=z=>({id:z,title:N[z]||z,root_dir:G,workspace_name:X,expected_revision:D,draggable:!1}),me=new Set;for(let[z,H]of yp(x,pe))me.add(z),c.push({...ve(z),lane:"running",attempt_id:H.attempt_id,run_state:H.run_state,can_pause:H.can_pause,can_resume:H.can_resume,started_at:H.started_at,last_event_at:H.last_event_at,runner:H.runner,model:H.model,effort:H.effort,speed:H.speed,resumed_from:H.resumed_from,continuation_mode:H.continuation_mode,usage:H.usage,discard:Yt(Me,z,{attempt_id:H.attempt_id}),badges:H.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:H.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:H.run_state==="failed"});for(let z of Array.isArray($.pr_wait)?$.pr_wait:[]){let H=z&&z.bead_id;if(typeof H!="string"||me.has(H))continue;me.add(H);let ge=Rt(I[H]),V=Rt(ge.pr),we=ge.gate?Rt(ge.gate):null,B=et.has(H),M=Re.get(H)?.continuation_action||null,te=!!M&&M.continuation===null,Pe=se.active===H,Te=z.external===!0,Be=he[H]||null,Ee=!!we&&we.base_badge==="\uCDA9\uB3CC",Xe=!!Be&&["child_sweep","branch_cleanup","parent_close"].includes(Be.step)&&!!we&&we.tier==="merged",Le=Te&&!!we&&we.tier==="merged",L=!!we&&["closed_unmerged","review","undecidable"].includes(we.tier),S=Yt(Me,H,{external:Te,merge_active:Pe,merge_queued:B,merged:!!Be||we?.tier==="merged"}),k=!!S.operation;u.push({...ve(H),lane:"pr_wait",pr_number:typeof V.number=="number"?V.number:null,pr_url:typeof V.url=="string"?V.url:void 0,external:Te,usage:Dt(x,H),badges:te?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Be?["\uC815\uB9AC \uC2E4\uD328"]:typeof we?.gate_badge=="string"&&we.gate_badge.length>0?[we.gate_badge]:[],alert:!!Be||L,reason:Be?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!B||te,merge_enabled:!k&&(te||we?.enabled===!0||Ee||Xe||Le),merge_label:te?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Le||Xe?"\uC815\uB9AC":Ee&&!Xe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:te?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":k?S.error?`\uD3D0\uAE30 \uC2E4\uD328: ${S.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${S.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Le?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":Xe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ee?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":we?.enabled===!0?`\uBA38\uC9C0 (${we.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${we?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:B&&!te,cancel_enabled:!Pe,continuation_mismatch:M?.mismatch||null,discard:S,discard_action:S.action,discard_enabled:S.enabled,discard_title:S.title})}for(let z=0;z<Ke.length;z++){let H=Ke[z],ge=H&&H.bead_id;if(typeof ge!="string"||me.has(ge))continue;me.add(ge);let V=ye[ge],we=Yt(Me,ge),B=we.operation?we:null,M={...ve(ge),lane:"queue",draggable:!B,discard:B||void 0,reason:il(de,ge),queue_position:z+1,queue_index:z,queue_length:Ke.length,badges:V?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!V,revise_action:!!V,revise_enabled:!!V&&!B,revise_title:V?V.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${V.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(M);let te=h.get(G);te?te.push(M):h.set(G,[M])}for(let z of Array.isArray($.runnable)?$.runnable:[]){let H=z&&z.bead_id;typeof H!="string"||me.has(H)||(me.add(H),i.push({...ve(H),title:z.title||N[H]||H,lane:"runnable",draggable:!0,reason:il(de,H),created_at:z.created_at??void 0,updated_at:z.updated_at??void 0,labels:Array.isArray(z.labels)?z.labels:[],spec_reviewer:typeof z.spec_reviewer=="string"?z.spec_reviewer:void 0,plan_state:z.plan_state==="approved"||z.plan_state==="authored"?z.plan_state:"none",workflow:z.route?{route:z.route,chips:{route:z.route}}:null,place_index:Ke.length}))}for(let z of Ae){let H=z&&z.bead_id;if(typeof H!="string"||me.has(H)||(me.add(H),o!==void 0&&typeof z.added_at=="number"&&z.added_at<o))continue;let ge=bp(x,H);m.push({...ve(H),lane:"done",done:!0,usage:Dt(x,H),done_at:typeof z.added_at=="number"?z.added_at:void 0,done_kind:ge&&typeof ge.done_kind=="string"?ge.done_kind:null})}}let E=new Map;s.forEach(($,G)=>{$&&typeof $.root_dir=="string"&&E.set($.root_dir,G)});let T=r&&r.running_sort==="repo"?"repo":"started";c.sort(($,G)=>{if(T==="repo"){let D=E.get($.root_dir)??Number.MAX_SAFE_INTEGER,x=E.get(G.root_dir)??Number.MAX_SAFE_INTEGER;if(D!==x)return D-x}let X=typeof $.started_at=="number"&&Number.isFinite($.started_at)?$.started_at:null,j=typeof G.started_at=="number"&&Number.isFinite(G.started_at)?G.started_at:null;return X!==null&&j!==null&&X!==j?X-j:X===null&&j!==null?1:X!==null&&j===null?-1:$.id.localeCompare(G.id)}),m.sort(($,G)=>(G.done_at??0)-($.done_at??0));let R=s.length>0?s:n.map($=>({root_dir:$&&$.root_dir,name:$&&$.name,auto_advance:$&&$.auto_advance,auto_merge:$&&$.auto_merge,slots:$&&$.slots,revision:$&&$.revision,exec_defaults:$&&$.exec_defaults,default_exec_preset_id:$&&$.default_exec_preset_id,runner_catalog:$&&$.runner_catalog})),U=[];for(let $ of R)!$||typeof $.root_dir!="string"||U.push({root_dir:$.root_dir,name:$.name||$.root_dir,auto_advance:$.auto_advance===!0,auto_merge:$.auto_merge===!0,slots:typeof $.slots=="number"&&$.slots>=_n?$.slots:_n,revision:typeof $.revision=="number"?$.revision:0,exec_defaults:Rt($.exec_defaults),default_exec_preset_id:typeof $.default_exec_preset_id=="string"?$.default_exec_preset_id:null,runner_catalog:Rt($.runner_catalog),items:h.get($.root_dir)||[]});return{runnable:i,queue:f,queue_groups:U,running:c,pr_wait:u,done:m,automation:{total:U.length,both_on:U.filter($=>$.auto_advance&&$.auto_merge).length}}}function vp(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<mp;return l`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Tt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":l`<span class="mon-beat__age"
          >${Ct(e,t)}</span
        >`}</span
  >`}function mn(e){return l`<div class="mon-c__title">${e.title}</div>`}function gn(e){return l`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function os(e){return e.workspace_name?l`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function mo(e){let t=gt(e.usage),r=Ft(e.usage);return t.length>0?t.map(n=>l`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?l`<span class="mon-c__usage" title=${Nr(e.usage)}
        >${r}</span
      >`:""}function go(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>l`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function wp(e){return l`<span class="mon-c__ops">
    ${e.run_state==="running"?l`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${fo()}
        </button>`:l`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${po()}
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
          ${tl()}
        </button>`:""}
  </span>`}function kp(e,t){let r=typeof e.started_at=="number"?co(t-e.started_at):"";return l`${mn(e)}
    <div class="mon-c__meta">
      ${go(e)}${vp(e.last_event_at,t)}${gn(e)}${os(e)}
      ${Wt(e)?l`<span class="mon-c__model">${Wt(e)}</span>`:""}
      ${dr(e)?l`<span
            class="rtile__resumed"
            title=${dr(e)}
            >↻</span
          >`:""}
      ${r?l`<span class="mon-live__elapsed">${r}</span>`:""}
      ${mo(e)}${wp(e)}${nr(e)}
    </div>`}function $p(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Ct(e.updated_at);return l`${mn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${gn(e)}
      ${n?l`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?l`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?l`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Mn(e.labels,null).map(c=>l`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${os(e)}
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
    </div>`}function xp(e){let t=!!e.discard?.operation;return l`${mn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${gn(e)}
      ${go(e)}
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
        </div>`:""}`}function Sp(e){let t=!!(Ft(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return l`${mn(e)}
    <div class="mon-c__meta">
      ${gn(e)}${os(e)}
      ${e.pr_url&&e.pr_number?l`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${go(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?l`<div class="mon-c__tail">
          ${mo(e)}
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
        </div>`:""}`}function Ap(e,t){let r=e.done_kind||"",n=r?gp[r]||r:"",s=Ct(e.done_at,t);return l`${mn(e)}
    <div class="mon-c__meta">
      ${gn(e)}${os(e)}
      ${n?l`<span
            class="mon-live__kind${hp.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${mo(e)}
      ${s?l`<span title=${`\uC644\uB8CC ${Tt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function ll(e,t){return e.lane==="running"?kp(e,t):e.lane==="runnable"?$p(e):e.lane==="queue"?xp(e):e.lane==="pr_wait"?Sp(e):Ap(e,t)}function cl(e){let t=String(e.revision);return l`<header
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
        ${e.auto_advance?fo():po()}
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
        ${rl()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${nl()}
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
        ${sl()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function dl(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Ht.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return l`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?el():ol()}
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
  </div>`}function ul(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function pl(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return gt(qn(t));let r={};for(let i of Qt)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let f of Qt){let m=c[f];typeof m=="number"&&Number.isFinite(m)&&(r[f]+=m,n=!0,u=!0)}if(u){o+=1;let f=c.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Ft(r):null}var _l="bdui.monitor.done-range",ml="bdui.monitor.running_sort";function Tp(){try{let e=window.localStorage.getItem(_l);return Ot(e)?e:Et}catch{return Et}}function Ep(e){try{window.localStorage.setItem(_l,e)}catch{}}function Cp(){try{return window.localStorage.getItem(ml)==="repo"?"repo":"started"}catch{return"started"}}function Rp(e){try{window.localStorage.setItem(ml,e)}catch{}}var gl="tab:monitor:pipeline",Ip=1e3,Lp=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function fl(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return l`<div
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
    ${ll(e,t)}
  </div>`}function hl(e,t){let r=st("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,i=t.getWorkspacePath,c=t.switchWorkspace,u=t.now||(()=>Date.now()),f=t.confirm||(S=>typeof globalThis.confirm!="function"||globalThis.confirm(S)),m=Tp(),h=Cp();function E(){let S=Ht.find(k=>k.value===m);return S?S.label:""}let T=document.createElement("div");T.className="mon",e.appendChild(T);let R=_o(null,null),U=null,$=new Map,G=new Set;function X(S){return R.queue_groups.find(k=>k.root_dir===S)||null}let D=ns(e,{queueStore:{get(){if(!U)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let S=$.get(U);if(S)return S;let k=X(U),A=s&&s.get?s.get():null,P=(Array.isArray(A)?A:[]).find(ee=>ee&&ee.root_dir===U);return{revision:k?k.revision:0,exec_defaults:k?k.exec_defaults:{},default_exec_preset_id:k?k.default_exec_preset_id:null,runner_catalog:k?k.runner_catalog:null,workspace_info:P?P.workspace_info:void 0}},set(S){U&&$.set(U,S);for(let k of Array.from(G))k()},subscribe(S){return G.add(S),()=>G.delete(S)}},presetStore:a,transport:o?(S,k)=>o(S,S==="worker-queue-set-default-exec-preset"||S==="get-worker-system-prompt"?{...k||{},root_dir:U}:k):void 0,getWorkspacePath:()=>U||void 0}),x=null,N=null;async function I(S,k,A,P,ee=!0){if(!o||!A)return null;let Z=await o(S,{...k,root_dir:A,expected_revision:P});if(Z&&Z.conflict&&ee){Z.queue&&$.set(A,Z.queue);let ue=Z.queue&&typeof Z.queue.revision=="number"?Z.queue.revision:P;Z=await o(S,{...k,root_dir:A,expected_revision:ue})}return Z&&Z.queue&&A&&$.set(A,Z.queue),Z}function de(S,k){let A=$.get(S),P=s&&s.get?s.get():null,ee=(Array.isArray(P)?P:[]).find(ue=>ue?.root_dir===S);return(A||ee)?.merge_queue?.find(ue=>ue.bead_id===k)?.continuation_action}async function ye(S,k,A,P){let ee=await I(S,k,A,P),Z=$.get(A)?.revision??ee?.queue?.revision??P;return Gt(ee,(ue,Oe)=>I(S,{...k,continuation:ue,decision_token:Oe},A,Z,!1),{refresh:ue=>I(S,k,A,ue?.queue?.revision??$.get(A)?.revision??Z,!1)})}async function se(S,k,A,P){let ee=await Gt({continuation_mismatch:P},(ue,Oe)=>I("worker-merge-queue-add",{bead_id:k,continuation:ue,decision_token:Oe},S,A,!1)),Z=ee?.queue?.merge_queue?.find(ue=>ue.bead_id===k)?.continuation_action;ee?.applied!==!0&&Z?.continuation===null&&Z.mismatch&&await se(S,k,ee.queue.revision,Z.mismatch)}async function he(S,k,A){let P=await I("worker-discard",S,k,A);if(P&&P.discarded===!0){K(ss(P),"success",5e3);return}if(P&&P.reason){K(`\uD3D0\uAE30 \uC2E4\uD328: ${P.reason}`,"error");return}if(P&&P.accepted&&P.pending==="merged_revert"){K("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(P&&P.accepted){K(`\uD3D0\uAE30 \uC9C4\uD589: ${P.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}P&&!P.conflict&&K("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Me(S,k,A){return!o||!A?null:await o(S,{...k,root_dir:A})}async function Je(S){if(!o||!S&&!f("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let k=await o("monitor-auto-toggle",{on:S}),A=k&&Array.isArray(k.failed)?k.failed:[];A.length>0&&K(`\uC790\uB3D9\uD654 ${S?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${A.map(P=>P.root_dir).join(", ")}`,"error",3200)}async function et(){let S=new Map;for(let k of R.pr_wait)S.has(k.root_dir)||S.set(k.root_dir,k.expected_revision);for(let[k,A]of S)await I("worker-merge-queue-add-all",{},k,A)}let Re=null,Ke=!1,Ae=null;function pe(){Ae!==null&&clearTimeout(Ae),Ae=setTimeout(()=>{Ae=null,Ke=!1},0)}function ve(S){let k=S.target;return typeof k?.closest=="function"?k.closest(".mon-group"):null}function me(S){let k=ve(S);return!k||!Re?null:(k.getAttribute("data-root-dir")||"")===Re.root_dir?k:null}function z(){for(let S of Array.from(T.querySelectorAll(".mon-group--drag-over")))S.classList.remove("mon-group--drag-over")}function H(S){let k=S.target,A=typeof k?.closest=="function"?k.closest('.mon-card[draggable="true"]'):null;if(A){Re={bead_id:A.getAttribute("data-issue-id")||"",lane:A.getAttribute("data-lane")||"",root_dir:A.getAttribute("data-root-dir")||"",revision:Number(A.getAttribute("data-revision")||0)||0,queue_index:Number(A.getAttribute("data-queue-index")),queue_length:Number(A.getAttribute("data-queue-length")),place_index:Number(A.getAttribute("data-place-index"))},Ke=!0;try{S.dataTransfer?.setData("text/plain",Re.bead_id),S.dataTransfer&&(S.dataTransfer.effectAllowed="move")}catch{}}}function ge(S){let k=me(S);k&&(S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect="move"),k.classList.add("mon-group--drag-over"))}function V(S){ve(S)?.classList.remove("mon-group--drag-over")}function we(){Re=null,z(),pe()}function B(S){let k=me(S),A=Re;if(Re=null,z(),!k||!A||!A.bead_id)return;S.preventDefault();let P=S.target,ee=typeof P?.closest=="function"?P.closest('.mon-card[data-lane="queue"]'):null,Z=ee&&k.contains(ee)?Number(ee.getAttribute("data-queue-index")):NaN;if(A.lane==="runnable"){let tt=Number.isFinite(Z)?Z:A.place_index;if(!Number.isFinite(tt))return;I("worker-queue-place",{bead_id:A.bead_id,index:tt},A.root_dir,A.revision);return}if(A.lane!=="queue"||ee&&ee.getAttribute("data-issue-id")===A.bead_id)return;let ue=A.queue_index,Oe=Number.isFinite(Z)?ue>Z?Z:Z-1:A.queue_length-1;!Number.isFinite(Oe)||Oe<0||Oe===ue||I("worker-queue-reorder",{bead_id:A.bead_id,to_index:Oe},A.root_dir,A.revision)}function M(S){let k={runnable:R.runnable,queue:R.queue,running:R.running,pr_wait:R.pr_wait,done:R.done};return l`${dl({automation:R.automation,counts:{running:R.running.length,queue:R.queue.length,pr_wait:R.pr_wait.length},running_sort:h,done_range:m,token_total:pl(R.done),token_tooltip:ul(E())})}
      <div class="worker-lanes mon-lanes">
        ${Lp.map(A=>{let P=k[A.lane],ee=A.lane==="queue"?R.queue_groups.length>0?l`${R.queue_groups.map(Z=>l`<div
                        class="mon-group"
                        data-root-dir=${Z.root_dir}
                      >
                        ${cl(Z)}
                        <div class="mon-group__list">
                          ${Z.items.map(ue=>fl(ue,S))}
                        </div>
                      </div>`)}`:void 0:P.length>0?l`${P.map(Z=>fl(Z,S))}`:void 0;return Vt({id:`monitor-${A.lane}`,lane:A.pane,title:A.lane==="done"?`\uC644\uB8CC\xB7${E()}`:A.title,items:P,empty:A.empty,body:ee,live:A.lane==="running"&&P.length>0,header_control:A.lane==="pr_wait"&&P.length>0?l`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function te(){let S=s&&s.get?s.get():null,k=s&&s.getWorkspacesState?s.getWorkspacesState():[],A=u();R=_o(S,k,{done_since:kr(m,A),running_sort:h}),Ue(M(A),T)}function Pe(S,k){let A=i?i():void 0;if(!k||!A||k===A||!c){n(S);return}c(k).then(()=>{n(S)}).catch(P=>{r("workspace switch for %s failed: %o",k,P)})}function Te(S){return{root_dir:S.getAttribute("data-root-dir")||"",revision:Number(S.getAttribute("data-revision")||0)||0}}function Be(S,k){let{root_dir:A,revision:P}=Te(S),ee=S.getAttribute("data-issue-id")||"",Z=k.dataset.attemptId||S.getAttribute("data-attempt-id")||"",ue=k.classList;if(ue.contains("worker-card__place")){I("worker-queue-place",{bead_id:ee,index:Number(S.getAttribute("data-place-index")||0)||0},A,P);return}if(ue.contains("mon-op--up")||ue.contains("mon-op--down")){let Oe=Number(S.getAttribute("data-queue-index")||0)||0,tt=ue.contains("mon-op--up")?Oe-1:Oe+1;if(tt<0)return;I("worker-queue-reorder",{bead_id:ee,to_index:tt},A,P);return}if(ue.contains("mon-op--remove")){I("worker-queue-remove",{bead_id:ee},A,P);return}if(ue.contains("mon-op--pause")){Me("worker-attempt-pause",{attempt_id:Z},A);return}if(ue.contains("mon-op--discard")){if(!f(fn(ee,"unmerged")))return;he({bead_id:ee,...Z?{attempt_id:Z}:{},...k.dataset.operationId?{operation_id:k.dataset.operationId}:{}},A,P);return}if(ue.contains("mon-op--resume")){ye("worker-attempt-resume",{attempt_id:Z},A,P);return}if(ue.contains("mon-op--dismiss")){I("worker-attempt-dismiss",{attempt_id:Z},A,P);return}if(ue.contains("worker-mini__merge")){let Oe=de(A,ee);Oe?.mismatch&&Oe.continuation===null?se(A,ee,P,Oe.mismatch):I("worker-merge-queue-add",{bead_id:ee},A,P);return}if(ue.contains("worker-mini__merge-cancel")){I("worker-merge-queue-remove",{bead_id:ee},A,P);return}if(ue.contains("worker-mini__discard")){let Oe=k.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(fn(ee,Oe)))return;he({bead_id:ee,...Z?{attempt_id:Z}:{},...k.dataset.operationId?{operation_id:k.dataset.operationId}:{}},A,P);return}if(ue.contains("worker-mini__revise-fix")){ye("worker-revise-fix",{bead_id:ee},A,P);return}ue.contains("worker-mini__revise-approve")&&I("worker-revise-approve",{bead_id:ee},A,P)}function Ee(S){let k=Ke;Ke=!1;let A=S.target;if(!A||typeof A.closest!="function"||A.closest("dialog")||A.closest("a"))return;let P=A.closest(".mon-running-sort");if(P){S.preventDefault(),h=P.getAttribute("data-sort")==="repo"?"repo":"started",Rp(h),te();return}let ee=A.closest(".mon-auto-all");if(ee){S.preventDefault(),Je(ee.getAttribute("data-on")==="true");return}if(A.closest(".mon-merge-all")){S.preventDefault(),et();return}let ue=A.closest(".mon-ctl--advance");if(ue){S.preventDefault();let{root_dir:ut,revision:lt}=Te(ue);I("worker-automation-toggle",{on:ue.getAttribute("data-on")==="true"},ut,lt);return}let Oe=A.closest(".mon-ctl--merge-auto");if(Oe){S.preventDefault();let{root_dir:ut,revision:lt}=Te(Oe);I("worker-merge-auto-toggle",{on:Oe.getAttribute("data-on")==="true"},ut,lt);return}let tt=A.closest(".mon-ctl--exec");if(tt){S.preventDefault(),U=tt.getAttribute("data-root-dir")||null,$.delete(U||""),D.open();return}let ot=A.closest(".mon-card");if(!ot)return;let Ye=A.closest("button");if(Ye){S.preventDefault(),Be(ot,Ye);return}let bt=ot.getAttribute("data-issue-id");bt&&!k&&(S.preventDefault(),Pe(bt,ot.getAttribute("data-root-dir")||""))}function Xe(S){let k=S.target;if(!k||typeof k.closest!="function")return;let A=k.closest(".mon-done-range");if(A){m=Ot(A.value)?A.value:Et,Ep(m),te();return}let P=k.closest(".mon-slots__input");if(!P)return;let{root_dir:ee,revision:Z}=Te(P),ue=Number(P.value);if(!Number.isFinite(ue))return;let Oe=Math.max(_n,Math.floor(ue));I("worker-queue-set-slots",{slots:Oe},ee,Z)}e.addEventListener("click",Ee),e.addEventListener("change",Xe),e.addEventListener("dragstart",H),e.addEventListener("dragover",ge),e.addEventListener("dragleave",V),e.addEventListener("drop",B),e.addEventListener("dragend",we),s&&typeof s.subscribe=="function"&&(x=s.subscribe(()=>{try{$.clear(),te();for(let S of Array.from(G))S()}catch{}}));function Le(){N!==null&&(clearInterval(N),N=null)}function L(){Ae!==null&&(clearTimeout(Ae),Ae=null)}return{load(){r("load"),te(),N===null&&(N=setInterval(()=>{try{te()}catch{}},Ip))},pause(){Le()},clear(){Le(),L(),x&&(x(),x=null),e.removeEventListener("click",Ee),e.removeEventListener("change",Xe),e.removeEventListener("dragstart",H),e.removeEventListener("dragover",ge),e.removeEventListener("dragleave",V),e.removeEventListener("drop",B),e.removeEventListener("dragend",we),D.destroy(),G.clear(),e.replaceChildren()}}}function bl(e,t,r){let n=st("views:nav"),s=null;function o(c){return u=>{u.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),u=c.view==="worker"||c.view==="monitor"?c.view:"board";return l`
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
    `}function i(){Ue(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Ue(l``,e)}}}var yl=["bug","feature","task","epic","chore"];function vl(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var wl=["Critical","High","Medium","Low","Backlog"];function kl(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function E(){o.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",o.appendChild(D);for(let x of yl){let N=document.createElement("option");N.value=x,N.textContent=vl(x),o.appendChild(N)}a.replaceChildren();for(let x=0;x<=4;x+=1){let N=document.createElement("option");N.value=String(x);let I=wl[x]||"Medium";N.textContent=`${x} \u2013 ${I}`,a.appendChild(N)}}E();function T(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function R(D){s.disabled=D,o.disabled=D,a.disabled=D,i.disabled=D,c.disabled=D,f.disabled=D,m.disabled=D,m.textContent=D?"Creating\u2026":"Create"}function U(){u.textContent=""}function $(D){u.textContent=D}function G(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?o.value=D:o.value="";let x=window.localStorage.getItem("beads-ui.new.priority");x&&/^\d$/.test(x)?a.value=x:a.value="2"}catch{o.value="",a.value="2"}}function X(){let D=o.value||"",x=a.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),x.length>0&&window.localStorage.setItem("beads-ui.new.priority",x)}async function j(){U();let D=String(s.value||"").trim();if(D.length===0){$("Title is required"),s.focus();return}let x=Number(a.value||"2");if(!(x>=0&&x<=4)){$("Priority must be 0..4"),a.focus();return}let N=String(o.value||""),I=String(c.value||""),de={title:D};N.length>0&&(de.type=N),String(x).length>0&&(de.priority=x),I.length>0&&(de.description=I),R(!0);try{await t("create-issue",de)}catch{R(!1),$("Failed to create issue");return}X(),R(!1),T()}return r.addEventListener("cancel",D=>{D.preventDefault(),T()}),h.addEventListener("click",()=>T()),f.addEventListener("click",()=>T()),r.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),j())}),n.addEventListener("submit",D=>{D.preventDefault(),j()}),{open(){n.reset(),U(),G();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){T()}}}var Op=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function $l(e){return String(e).padStart(2,"0")}function Dp(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Mp(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${$l(n.getHours())}:${$l(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Op[n.getMonth()]} ${n.getDate()} ${o}`;return`${Dp(r,t)} \xB7 ${i}`}function Pp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var xl=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Sl(e){let t=!1,r=null,n=new Map;function s(){Ue(l``,e),e.hidden=!0}function o(){let c=xl.filter(f=>n.has(f.key));if(c.length===0){s();return}let u=Date.now();Ue(l`<div class="usage-meter" aria-label="Usage">
        ${c.map(f=>{let m=n.get(f.key),h=typeof m.ageSeconds=="number"&&m.ageSeconds>600,E=h?`${Math.floor(m.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return l`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${m.windows.map(T=>{let R=typeof T.pct=="number"&&Number.isFinite(T.pct)?T.pct:0,U=Math.min(100,Math.max(0,R)),G=`resets ${Mp(T.resetsAt,u)}${h?` \xB7 ${E}`:""}`;return l`<span
                class="usage-meter__window ${Pp(U)}"
                style=${`--progress: ${U}%`}
                title=${G}
              >
                <span class="usage-meter__label">${T.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${U}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let u=await fetch(c.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function i(){let c=await Promise.all(xl.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of c)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var Np="worker-ineligible";function ho(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Al(e){return ho(e).includes(Np)}var bo="worker-serial";function hn(e){return ho(e).includes(bo)}var Fp="tab:worker:ready",qp="tab:worker:blocked",Bp="tab:worker:in-progress",Up="tab:worker:closed",bn=1,jp=new Set(["done","failed","orphaned","stopped","discarded"]);function Tl(e){return pn(e).path.length>0}var Rl="beads-ui.worker.candidate-filter",yo={show_blocked:!1,spec:"all"};function zp(){try{let e=window.localStorage.getItem(Rl);if(!e)return{...yo};let t=JSON.parse(e);if(!t||typeof t!="object")return{...yo};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...yo}}}function Hp(e){try{window.localStorage.setItem(Rl,JSON.stringify(e))}catch{}}function Wp(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=r(i),u=n(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Gp=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Il="bdui.worker.candidate_sort",Yp=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],as="spec";function Vp(){try{let e=window.localStorage.getItem(Il);return e==="board"||e==="created"||e==="spec"?e:as}catch{return as}}function Kp(e){try{window.localStorage.setItem(Il,e)}catch{}}var Ll="bdui.worker.done-range";function Zp(){try{let e=window.localStorage.getItem(Ll);return Ot(e)?e:Et}catch{return Et}}function Xp(e){try{window.localStorage.setItem(Ll,e)}catch{}}var Qp="(max-width: 640px)",Ol="beads-ui.worker.lane-collapsed",yn={queue:!0,done:!0};function Jp(){try{let e=window.localStorage.getItem(Ol);if(!e)return{...yn};let t=JSON.parse(e);return!t||typeof t!="object"?{...yn}:{queue:typeof t.queue=="boolean"?t.queue:yn.queue,done:typeof t.done=="boolean"?t.done:yn.done}}catch{return{...yn}}}function ef(e){try{window.localStorage.setItem(Ol,JSON.stringify(e))}catch{}}function El(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function tf(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(xr):(n.sort(Cn(r)),t==="board"?n:[...n.filter(Tl),...n.filter(s=>!Tl(s))])}function rf(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function nf(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function sf(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var of=["closed_unmerged","review","undecidable"],af=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uAC80\uC99D \uC911"}];function lf(e,t){for(let r of af)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var cf=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}];function df(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=cf.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function Cl(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function uf(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function vo(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function pf(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function ff(e,t,r,n,s=null,o=null,a=null,i=!1,c=null,u=!0,f=null,m=null,h=null,E={},T=!1,R=null,U=null){let $=!!c&&c.position>0,G=!!c?.continuation_action&&c.continuation_action.continuation===null,X=!!c&&c.active===!0,j=c&&c.failure||null,D=r[e]||null,x=D&&D.gate?D.gate:null,N=D&&D.pr?D.pr:null,I=pf(h),de=uf(c?c.resolution:null),ye=[];i&&ye.push("\uC138\uC158");let se=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":de?de.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,he=lf(i&&x&&x.tier==="closed_unmerged"?"\uB2EB\uD798":x&&x.gate_badge||"",se?null:o&&o.activity||null);se&&ye.push(se),he.label&&ye.push(he.label),x&&x.base_badge&&x.base_badge!==x.gate_badge&&ye.push(x.base_badge),m&&ye.push(m),n&&ye.push("\uC815\uB9AC \uC2E4\uD328"),I&&ye.push(I.badge),$&&!X&&ye.push(`\uBA38\uC9C0 \uB300\uAE30 #${c.position}`),j&&ye.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Cl(j)}`),G&&ye.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),f&&ye.push(`\uC790\uB3D9 \uC81C\uC678: ${Cl(f)}`);let Me=!!x&&x.base_badge==="\uCDA9\uB3CC",Je=!!x&&x.enabled===!0,et=df(o&&o.merge_progress?o.merge_progress.step:null),Re=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!x&&x.tier==="merged",Ke=i&&!!x&&x.tier==="merged",Ae=i&&Me&&u===!1,pe=Yt(E,e,{external:i,merge_active:X||!!et,merge_queued:$,conflict_active:!!a,cleanup_active:!1,merged:!!n||x?.tier==="merged"}),ve=!!pe.operation,me=R==="pending"||R==="failed"?"\uBA38\uC9C0\uB428 \xB7 \uBC30\uD3EC \uB300\uAE30":R==="running"&&typeof U=="string"?`\uBA38\uC9C0\uB428 \xB7 ${U.slice(0,8)} \uBC30\uD3EC\uC5D0 \uD3EC\uD568\uB428`:R==="succeeded"?"\uBA38\uC9C0\uB428 \xB7 \uBC30\uD3EC \uC644\uB8CC":null,z=!!n&&["repo_operations","deployment_request","deploy"].includes(n.step),H=!Re&&(me!==null||z);return{id:e,title:t,reason:Re?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":me||(n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30"),draggable:!1,done:!0,lane:"pr_wait",worker_serial:T,external:i,pr_number:N&&typeof N.number=="number"?N.number:null,pr_url:N&&typeof N.url=="string"?N.url:"",completion_badge:I?I.badge:null,completion_title:I?I.title:"",completion_repair_pr_url:I?I.repair_pr_url:"",completion_repair_pr_number:I?I.repair_pr_number:null,badges:ye,live_badge:a==="paused"?null:de?.live||a==="running"?se:he.live?he.label:null,usage:s,alert:!!x&&of.includes(x.tier)||!!n||!!j||!!(I&&I.alert),merge_action:H?!1:!$||G,cancel_action:$&&!G,cancel_enabled:!X&&!(I&&I.lock_actions),cancel_title:I&&I.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":X?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:pe,discard_action:pe.action,merge_step:et,discard_enabled:pe.enabled,discard_title:pe.title,merge_enabled:!et&&!a&&!ve&&!(I&&I.lock_actions)&&!Ae&&!H&&(Je||Me||Re||Ke),merge_label:G?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Re||Ke?"\uC815\uB9AC":Me&&!et&&!Re?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ve?pe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${pe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${pe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:G?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":et?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${et.label}`:Ke?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":Ae?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Re?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Me?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Je?`\uBA38\uC9C0 (${x.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:x&&x.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${x&&x.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function wo(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,doneRange:f,onDoneRangeChange:m}=t,h=n?In(n,i):null,E=On({transport:r,uiOrderStore:i}),T=null,R=[],U=zp(),$=Vp(),G=Ot(f)?f:Zp(),X=new Map;function j(){let p=Ht.find(v=>v.value===G);return p?p.label:"\uC624\uB298"}let D=Jp(),x=!1,N=new Set,I=new Set,de=new Set,ye="ordinary",se=!1,he=new Map,Me=[],Je=document.createElement("div");Je.className="worker-console";let et=document.createElement("div");et.className="worker-top";let Re=document.createElement("div");Re.className="worker-drawer-overlay",Re.hidden=!0;let Ke=document.createElement("div");Ke.className="worker-drawer-overlay__backdrop";let Ae=document.createElement("div");Ae.className="worker-drawer-host",Re.append(Ke,Ae);let pe=document.createElement("div");pe.className="worker-lanes-host",Je.append(et,Re,pe),e.appendChild(Je);let ve=null,me=Jn(Ae,{transport:r,sessionLogStore:a,onClose:()=>{ve=null,Re.hidden=!0,De()}}),z=ns(Je,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:u});function H(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:bn,queue:[],pr_wait:[],done:[]}}function ge(){let p=H();return typeof p.revision=="number"?p.revision:0}function V(p){p&&p.queue&&s&&s.set(p.queue)}function we(){let p=H().queue;return Array.isArray(p)?p.length:0}async function B(p,v){if(!r)return;let C=await r("worker-queue-place",{bead_id:p,index:v,expected_revision:ge()});V(C),C&&C.conflict&&await r("worker-queue-place",{bead_id:p,index:v,expected_revision:ge()}).then(V)}async function M(p,v){if(!r)return;let C=await r("worker-queue-reorder",{bead_id:p,to_index:v,expected_revision:ge()});V(C),C&&C.conflict&&await r("worker-queue-reorder",{bead_id:p,to_index:v,expected_revision:ge()}).then(V)}async function te(p){if(!r)return;let v=await r("worker-queue-remove",{bead_id:p,expected_revision:ge()});V(v),v&&v.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:ge()}).then(V)}async function Pe(){if(!r||se)return;let v=(Array.isArray(H().queue)?H().queue:[]).map(ie=>ie.bead_id).filter(ie=>de.has(ie));if(v.length===0)return;if(v.some(ie=>{let le=he.get(ie);return le!==!0&&le!==!1})){K("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let C=ye==="serial",Q=v.filter(ie=>he.get(ie)!==C);if(Q.length===0){de.clear(),De(),K("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}se=!0,De();let _e=[],be=0;try{for(let ie of Q){let le=await Promise.resolve(r(C?"label-add":"label-remove",{id:ie,label:bo})).catch(()=>[]),Ie=Array.isArray(le)?le[0]:le,it=Ie&&typeof Ie=="object"?Ie.labels:null;Ie&&typeof Ie=="object"&&Ie.id===ie&&Array.isArray(it)&&hn(it)===C?be+=1:_e.push(ie)}if(_e.length===0){de.clear(),K(`${be}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}de.clear();for(let ie of _e)de.add(ie);K(`${Q.length}\uAC1C \uC911 ${be}\uAC1C \uBCC0\uACBD \xB7 ${_e.length}\uAC1C \uC2E4\uD328 (${_e.join(", ")})`,"error")}finally{se=!1,De()}}async function Te(p){if(!r||!p)return;let v=await r("worker-attempt-pause",{attempt_id:p});v&&v.paused===!1&&v.reason&&K(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Be(p){if(!r||!p)return;let v=async(Q={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:ge(),...Q}),C=await v();V(C),C&&C.conflict&&(C=await r("worker-attempt-resume",{attempt_id:p,expected_revision:ge()}),V(C)),C=await Gt(C,(Q,_e)=>v({continuation:Q,decision_token:_e}),{onResult:V,refresh:()=>v()}),C&&C.resumed===!1&&!C.conflict&&C.reason&&K(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${C.reason}`,"error",2400)}async function Ee(p){if(!r||!p)return;let v=async(Q={})=>await r("worker-deployment-recovery-continue",{attempt_id:p,expected_revision:ge(),...Q}),C=await v();V(C),C&&C.conflict&&(C=await v(),V(C)),C=await Gt(C,(Q,_e)=>v({continuation:Q,decision_token:_e}),{onResult:V,refresh:()=>v()}),C&&C.resumed===!1&&!C.conflict&&C.reason&&K(`\uBCF5\uAD6C \uC774\uC5B4\uAC00\uAE30 \uAC70\uBD80: ${C.reason}`,"error",2400)}async function Xe(p){if(!r||!p)return;let v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:ge()});V(v),v&&v.conflict&&(v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:ge()}),V(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&K(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Le(p,v,C=!0){if(!r)return null;let Q=r,_e=await Q(p,{...v,expected_revision:ge()});return V(_e),_e&&_e.conflict&&C&&(_e=await Q(p,{...v,expected_revision:ge()}),V(_e)),_e}async function L(p){if(!r||!p)return;let v=H().merge_queue?.find(Q=>Q.bead_id===p)?.continuation_action;if(v?.mismatch&&v.continuation===null){await S(p,v.mismatch);return}N.add(p),De();let C;try{C=await Le("worker-merge-queue-add",{bead_id:p})}finally{N.delete(p),De()}!C||C.conflict||C.applied||K("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function S(p,v){let C=await Gt({continuation_mismatch:v},(_e,be)=>Le("worker-merge-queue-add",{bead_id:p,continuation:_e,decision_token:be},!1)),Q=C?.queue?.merge_queue?.find(_e=>_e.bead_id===p)?.continuation_action;if(C?.applied!==!0&&Q?.continuation===null&&Q.mismatch){await S(p,Q.mismatch);return}C&&C.applied===!1&&!C.conflict&&K("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function k(p){if(!r)return;let v=await Le("worker-merge-auto-toggle",{on:p});!v||v.conflict||K(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function A(p){if(!r||!p)return;let v=await Le("worker-merge-queue-remove",{bead_id:p});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&K("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function P(){await Le("worker-merge-queue-remove",{all:!0})}async function ee(p,v=null,C="unmerged",Q=null){if(!r||!p)return;let _e=fn(p,C);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(_e)))return;let ie=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...Q?{operation_id:Q}:{},expected_revision:ge()});if(V(ie),ie&&ie.conflict&&(ie=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...Q?{operation_id:Q}:{},expected_revision:ge()}),V(ie)),ie&&ie.discarded===!0){K(ss(ie),"success",5e3);return}if(ie&&ie.reason){K(`\uD3D0\uAE30 \uC2E4\uD328: ${ie.reason}`,"error",2800);return}if(ie&&ie.accepted&&ie.pending==="merged_revert"){K("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ie&&ie.accepted&&!ie.discarded){K(`\uD3D0\uAE30 \uC9C4\uD589: ${ie.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ie&&!ie.conflict&&K("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Z(p,v){if(!r||!v||I.has(v))return;I.add(v),De();let C;try{let Q=async(_e={})=>await r(p,{bead_id:v,expected_revision:ge(),..._e});C=await Q(),V(C),C&&C.conflict&&(C=await r(p,{bead_id:v,expected_revision:ge()}),V(C)),p==="worker-revise-fix"&&(C=await Gt(C,(_e,be)=>Q({continuation:_e,decision_token:be}),{onResult:V,refresh:()=>Q()}))}finally{I.delete(v),De()}if(!(!C||C.conflict)){if(C.ok){K(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}K(`\uCC98\uBD84 \uAC70\uBD80: ${C.reason||""}`,"error",3e3)}}async function ue(p){if(!r)return;let v=await r("worker-automation-toggle",{on:p,expected_revision:ge()});V(v),v&&v.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:ge()}).then(V)}async function Oe(p){if(!r||!Number.isFinite(p))return;let v=Math.max(bn,Math.floor(p)),C=await r("worker-queue-set-slots",{slots:v,expected_revision:ge()});V(C),C&&C.conflict&&await r("worker-queue-set-slots",{slots:v,expected_revision:ge()}).then(V)}async function tt(p){if(!r)return;let v=await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:ge()});V(v),v&&v.conflict&&await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:ge()}).then(V)}function ot(){let p=H(),v=h?h.selectBoardColumn(Fp,"ready"):[],C=h?h.selectBoardColumn(qp,"blocked"):[],Q=h?h.selectBoardColumn(Up,"closed"):[],_e=h?h.selectBoardColumn(Bp,"in_progress"):[],be=new Map;for(let g of _e){let q=nf(g);if(!q)continue;let ne=be.get(q);ne?ne.push(g):be.set(q,[g])}let ie=g=>{let q=Ln(be.get(g)||[]);return q?q.title||q.id:null},le=p.bead_titles||{},Ie=new Map;for(let[g,q]of Object.entries(le))typeof q=="string"&&q.length>0&&Ie.set(g,q);for(let g of[...v,...C])Ie.set(g.id,g.title||g.id);he.clear();let it=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},ft=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{};for(let[g,q]of Object.entries(ft))Array.isArray(q)&&he.set(g,hn(q));for(let g of[...v,...C]){let q=g.labels;if(!Array.isArray(q))continue;if(!he.has(g.id)){he.set(g.id,hn(q));continue}let ne=it[g.id],He=Xt(ne&&typeof ne=="object"?ne.updated_at:null),zt=Xt(g.updated_at);zt!==null&&He!==null&&zt>He&&he.set(g.id,hn(q))}let St=new Map;for(let[g,q]of Object.entries(it))q&&typeof q=="object"&&St.set(g,q);for(let g of[...v,...C])St.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let vt=g=>St.get(g)||{},ce=p.pr_wait||[],b=p.pr_observations||{},W=p.pr_activity||{},re=p.cleanup_failed||{},Fe=Object.entries(re).map(([g,q])=>({bead_id:g,step:q&&q.step?q.step:"",reason:q&&q.reason?q.reason:"",detail:q&&typeof q.detail=="string"?q.detail:null,output_tail:q&&typeof q.output_tail=="string"&&q.output_tail?q.output_tail:void 0,log_path:q&&typeof q.log_path=="string"&&q.log_path?q.log_path:void 0,retry_count:q&&typeof q.retry_count=="number"&&Number.isInteger(q.retry_count)&&q.retry_count>0?q.retry_count:0})),Ve=p.queue||[],ae=new Set(Ve.map(g=>g.bead_id));for(let g of de)ae.has(g)||de.delete(g);let _=new Set([...Ve.map(g=>g.bead_id),...ce.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),d=new Set(C.map(g=>g.id)),w=i?i.get()?.order||{}:{},y=new Set,O=[];for(let g of[...v,...C])_.has(g.id)||y.has(g.id)||rf(g)||Al(g.labels)||(y.add(g.id),O.push(g));R=tf(O,$,w);let J=p.admission||{},$e=g=>{let q=J[g];if(!q)return"";if(q.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ne=typeof q.reason=="string"?q.reason:"",He=ne.indexOf(":");return He>0&&He<ne.length-1?`\u26D4 ${ne.slice(0,He)} (${ne.slice(He+1)})`:`\u26D4 ${ne}`},mt=R.map(g=>{let q=pn(g),ne=q.path.length>0,He=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",zt=!He&&ne&&!q.conflict,ar=d.has(g.id),Lt=[];ar&&Lt.push(sf(g)),He?Lt.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):q.conflict?Lt.push("spec_id_conflict"):ne||Lt.push("spec \uC5C6\uC74C");let Sn=$e(g.id);return Sn&&Lt.push(Sn),{id:g.id,title:g.title||g.id,reason:Lt.join(" \xB7 "),draggable:zt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:He,status:g.status,blocked:ar,has_spec:ne}}),qe=Wp(mt,U),or=qe.visible,is=p.revise_parked||{},zr=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},So=(g,q)=>g.map(ne=>{let He=q==="queue"?is[ne.bead_id]:null,zt=q==="queue"?Yt(zr,ne.bead_id):null,ar=zt?.operation?zt:null,Lt=q==="queue"?he.has(ne.bead_id)?he.get(ne.bead_id)||!1:null:!1,Sn=Lt===!0&&(Object.values(p.attempts||{}).some(Kt=>Kt&&Kt.bead_id!==ne.bead_id&&!jp.has(Kt.status))||ce.some(Kt=>Kt.bead_id!==ne.bead_id)||Object.values(zr).some(Kt=>Kt&&Kt.bead_id!==ne.bead_id&&Kt.phase!=="done")),Ho=q==="done"?[]:[$e(ne.bead_id)];return Sn&&Ho.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:ne.bead_id,title:Ie.get(ne.bead_id)||ne.bead_id,reason:Ho.filter(Boolean).join(" \xB7 "),draggable:q!=="done"&&!ar,done:q==="done",lane:q,selectable:q==="queue",selected:q==="queue"&&de.has(ne.bead_id),worker_serial:Lt,discard:ar,badges:He?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!He,revise_action:!!He,revise_enabled:!!He&&!ar&&!I.has(ne.bead_id),revise_title:He?He.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${He.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:q==="done"?Dt(p.attempts||{},ne.bead_id):null,done_at:q==="done"&&typeof ne.added_at=="number"?ne.added_at:void 0,...vt(ne.bead_id)}}),Ao=new Map;for(let g of p.done)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&Ao.set(g.bead_id,g.added_at);let Hr=p.attempts?Object.values(p.attempts):[],ls=new Set;for(let g of Hr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&ls.add(g.resumed_from);let cs=new Map;for(let g of Hr)cs.set(g.bead_id,g.attempt_id);let ds=new Map;for(let g of Hr)ds.set(g.attempt_id,g);function us(g){let q=new Set,ne=g;for(;ne&&!q.has(ne.attempt_id);){if(ne.conflict_resolution===!0)return!0;q.add(ne.attempt_id),ne=typeof ne.resumed_from=="string"&&ne.resumed_from.length>0&&ds.get(ne.resumed_from)||null}return!1}let vn=typeof p.declared_base=="string"?p.declared_base:null;function Wl(g){let q=null;for(let ne of Hr)!ne||ne.bead_id!==g||us(ne)||(q===null||(typeof ne.started_at=="number"?ne.started_at:0)>=(typeof q.started_at=="number"?q.started_at:0))&&(q=ne);return q&&typeof q.target_base=="string"?q.target_base:null}let To=[],Eo=[],Gl=g=>{let q=cs.get(g.bead_id)!==g.attempt_id,ne=Ao.get(g.bead_id),He=typeof ne=="number"&&ne>0&&typeof g.finished_at=="number"&&ne>=g.finished_at;return!q&&!He&&typeof g.dismissed_at!="number"},Co=g=>{let q=typeof g.session_id=="string"&&g.session_id.length>0,ne=ls.has(g.attempt_id);return{eligible:q&&!ne,reason:q?ne?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Pt=null;for(let g of Hr){let q=g.status==="paused"&&!ls.has(g.attempt_id);if(g.status==="running"||q)Eo.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Ie.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:q,conflict_resolution:us(g),base_exception:vo(vn,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:Yt(zr,g.bead_id,{attempt_id:g.attempt_id}),usage:Dt(p.attempts||{},g.bead_id),current_child:ie(g.bead_id),...vt(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&Gl(g)){let ne=Co(g);To.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Ie.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Yt(zr,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:ne.eligible,resume_reason:ne.reason,conflict_resolution:us(g),base_exception:vo(vn,g.target_base),usage:Dt(p.attempts||{},g.bead_id),current_child:ie(g.bead_id),...vt(g.bead_id)}),Pt=g}}let wn=[...To,...Eo],Ro=null;if(Pt){let g=Co(Pt),q=Pt.cause_detail;Ro={bead_id:Pt.bead_id,repo:Pt.repo||"",reason:Pt.cause||Pt.status,cause_detail:q&&typeof q.reason=="string"?{reason:q.reason,command:typeof q.command=="string"?q.command:null}:null,resume_attempt_id:Pt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:Yt(zr,Pt.bead_id,{attempt_id:Pt.attempt_id})}}let Yl=new Set(wn.map(g=>g.bead_id)),ps=Array.isArray(p.merge_queue)?p.merge_queue:[],Io=new Map,Lo=new Map,Oo=new Map;ps.forEach((g,q)=>{g&&typeof g.bead_id=="string"&&(Io.set(g.bead_id,q+1),Lo.set(g.bead_id,g.resolution),Oo.set(g.bead_id,g.continuation_action||null))});let Do=p.merge_queue_state||{active:null,failures:{}},Vl=Do.failures||{},Kl=p.deployment_coverage&&typeof p.deployment_coverage=="object"&&!Array.isArray(p.deployment_coverage)?p.deployment_coverage:{},Zl=p.deployment&&typeof p.deployment.desired_sha=="string"?p.deployment.desired_sha:null,Xl=p.auto_merge_skips||{},Mo=g=>{let q=Xl[g];if(!q)return null;let ne=b[g],He=ne&&ne.pr?ne.pr.head_sha:null;return He&&He===q.head_sha?q.reason||"":null},kn=new Map;for(let g of wn)g.failed!==!0&&g.conflict_resolution&&(g.paused?kn.has(g.bead_id)||kn.set(g.bead_id,"paused"):kn.set(g.bead_id,"running"));let Po=wn.filter(g=>!g.paused&&g.failed!==!0).length,No=(p.workspace_info||{}).slots,Ql=typeof No=="number"?No:typeof p.slots=="number"?p.slots:bn,Fo=p.pr_wait_holds_slot===!0?bn:Ql,Jl=Po>Fo,$n=kr(G),ec=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>$n===void 0||typeof g.added_at!="number"||g.added_at>=$n).sort((g,q)=>(q.added_at||0)-(g.added_at||0)),Wr=So(ec,"done"),tc=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),qo=[],rc=u?.()||"";for(let g of Q){let q=Xt(g.closed_at);if(typeof g.id!="string"||tc.has(g.id)||q===null||$n!==void 0&&q<$n||typeof g.comment_count!="number"||g.comment_count<=0)continue;let ne=`${rc}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,He=X.get(ne);He===void 0&&r&&(X.set(ne,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(zt=>{let ar=Array.isArray(zt)&&zt.some(Lt=>es(typeof Lt?.text=="string"?Lt.text:"")?.lane==="session");X.set(ne,ar?"session":"not-session"),De()}).catch(()=>{X.set(ne,"failed"),De()})),He==="session"&&qo.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:q,created_at:g.created_at,updated_at:g.updated_at})}Wr.push(...qo),Wr.sort((g,q)=>(q.done_at||0)-(g.done_at||0));let xn={};for(let g of Qt)xn[g]=0;let Bo=!1,Uo=0,fs=0,jo=0;for(let g of Wr){let q=g.usage;if(q&&typeof q=="object"){let ne=!1;for(let He of Qt)Number.isFinite(q[He])&&(xn[He]+=q[He],Bo=!0,ne=!0);ne&&(fs+=1,Number.isFinite(q.total_cost_usd)&&(Uo+=q.total_cost_usd,jo+=1))}}fs>0&&jo===fs&&(xn.total_cost_usd=Uo);let zo=Wr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),nc=zo.length>0?gt(qn(zo)):Bo?Ft(xn):null;return{queue:p,idToTitle:Ie,candidates:or,candidate_hidden:{blocked:qe.hidden_blocked,spec:qe.hidden_spec},running:wn,live_count:Po,slots:Fo,over_cap:Jl,failure:Ro,waiting:So(Ve.filter(g=>!Yl.has(g.bead_id)),"queue"),pr_wait:ce.map(g=>ff(g.bead_id,Ie.get(g.bead_id)||g.bead_id,b,re[g.bead_id]||null,Dt(p.attempts||{},g.bead_id),W[g.bead_id]||(N.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),kn.get(g.bead_id)||null,g.external===!0,{position:Io.get(g.bead_id)||0,active:Do.active===g.bead_id,failure:Vl[g.bead_id]||null,resolution:Lo.get(g.bead_id),continuation_action:Oo.get(g.bead_id)},g.wt_present!==!1,p.auto_merge===!0?Mo(g.bead_id):null,vo(vn,Wl(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},ds.get(cs.get(g.bead_id)||"")?.worker_serial===!0,Kl[g.bead_id]||null,Zl)).map(g=>({...g,...vt(g.id)})),merge_queue_length:ps.length,merge_queue_running:ps.length>0,auto_excluded:ce.map(g=>g.bead_id).filter(g=>Mo(g)!==null),verify_cmd_present:!!(p.workspace_info||{}).verify_cmd,declared_base:vn,done:Wr,token_total:nc,cleanup_failures:Fe,deployment:p.deployment||null}}function Ye(p){let v=p.waiting.length>0?p.waiting[0].id:"\u2014",C=l`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Q=at(p),_e=p.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",be=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${j()} 완료 <b>${p.done.length}</b></span
      >`,ie=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,le=l`<label class="worker-tgl worker-slots"
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
      </button>`,Ie=Ji({failure:p.failure,cleanupFailures:p.cleanup_failures}),it=Zi(p.deployment);return x?l`<div class="worker-ribbon">
          ${C} ${Q}
          <div class="worker-kpi worker-kpi--ribbon">${_e}${be}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${le}</div>
          <div class="worker-kpi">${ie}</div>
        </div>
        ${it}${Ie}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${C}${Q}${le}</div>
        <div class="worker-kpi">
          ${_e}${be}${ie}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${j()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(ft=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${ft.tooltip}
                >${j()} 완료 · 누적 ${ft.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${it}${Ie}`}function bt(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let v=p.running.some(C=>!C.paused&&C.failed!==!0);return l`<section
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
      ${p.running.length>0?uo(p.running,Date.now(),ve):""}
      ${p.pr_wait.map(C=>lo(C))}
    </section>`}function ut(p){let v=p.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${U.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Gp.map(C=>l`<button
              type="button"
              class="worker-filter__chip${U.spec===C.value?" is-active":""}"
              data-spec=${C.value}
              aria-pressed=${U.spec===C.value?"true":"false"}
            >
              ${C.label}
            </button>`)}
        ${v.spec>0?l`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function lt(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${Yp.map(p=>l`<option value=${p.value} ?selected=${$===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function yt(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${G}
      >
        ${Ht.map(p=>l`<option value=${p.value} ?selected=${G===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function It(){if(de.size===0)return"";let p=Array.from(de),v=p.some(C=>{let Q=he.get(C);return Q!==!0&&Q!==!1});return l`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${p.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${ye}
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
    </div>`}function rt(p){let v=(p.queue.pr_wait||[]).filter(be=>be&&be.external!==!0&&typeof be.bead_id=="string"),C=new Set(p.running.filter(be=>!be.paused&&be.failed!==!0).map(be=>be.bead_id));for(let be of v)C.add(be.bead_id);let Q=!(p.queue.pr_wait_holds_slot!==!0||p.queue.auto_advance!==!0||p.queue.auto_merge===!0||v.length===0||p.waiting.length===0||C.size<p.slots),_e=p.pr_wait.some(be=>be.worker_serial===!0);if(!(!Q&&!(_e&&p.queue.auto_merge!==!0)))return l`${Q?l`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${_e&&p.queue.auto_merge!==!0?l`<div
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
      </button>`;let C=new Set(p.auto_excluded),Q=p.pr_wait.filter(_e=>_e.merge_action&&_e.merge_enabled&&!C.has(_e.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title=${p.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 verify \uC120\uC5B8\uC774 \uC5C6\uC5B4 \uCD94\uAC00 \uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${Q>0?` ${Q}`:""}
    </button>`}function nt(p){let v=Vt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:lt(),controls:ut(p)});return x?l`<div class="worker-lanes worker-lanes--mobile">
        ${bt(p)}
        ${Vt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:l`${It()}${rt(p)}`,collapsible:!0,collapsed:D.queue,preview:El(p.waiting)})}
        ${v}
        ${Vt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${j()} \uC644\uB8CC \uC5C6\uC74C`,controls:yt(),collapsible:!0,collapsed:D.done,preview:Array.isArray(p.token_total)?p.token_total.map(C=>C.label).join(" \xB7 "):p.token_total||El(p.done)})}
      </div>`:l`<div class="worker-lanes">
      ${v}
      ${Vt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:l`${It()}${rt(p)}`})}
      ${Vt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(C=>!C.paused&&C.failed!==!0),body:uo(p.running,Date.now(),ve)})}
      ${Vt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Vt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${j()} ${p.done.length}`,items:p.done,empty:`${j()} \uC644\uB8CC \uC5C6\uC74C`,controls:yt()})}
    </div>`}function ct(p){D={...D,[p]:!D[p]},ef(D),De()}function De(){let p=ot();Ue(Ye(p),et),Ue(nt(p),pe)}function F(){let p=document.querySelector(".app-header");if(!p)return;let v=()=>{let C=Math.round(p.getBoundingClientRect().height);Je.style.setProperty("--worker-ribbon-top",`${C}px`)};if(v(),typeof ResizeObserver=="function"){let C=new ResizeObserver(v);C.observe(p),Me.push(()=>C.disconnect())}else window.addEventListener("resize",v),Me.push(()=>window.removeEventListener("resize",v))}function Y(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(Qp);x=!!p.matches;let v=C=>{let Q=!!(C&&typeof C.matches=="boolean"?C.matches:p.matches);Q!==x&&(x=Q,De())};typeof p.addEventListener=="function"?(p.addEventListener("change",v),Me.push(()=>p.removeEventListener("change",v))):typeof p.addListener=="function"&&(p.addListener(v),Me.push(()=>p.removeListener(v)))}function oe(p){let v=p.target,C=v?.closest?.(".worker-mini__grip"),Q=C?C.closest('.worker-mini[data-lane="queue"]'):v?.closest?.('.worker-card[draggable="true"]');if(!Q)return;let _e=Q.dataset.beadId||"",be=Q.dataset.lane||"";T={bead_id:_e,from_lane:be};try{p.dataTransfer?.setData("text/plain",_e),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function fe(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;let C=v.dataset.lane||"";C!=="candidate"&&C!=="queue"||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function ke(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ce(p,v){let C=R.find(ie=>ie.id===p);if(!C)return;let Q=R.filter(ie=>ie.id!==p),_e=Q.length;if(v){let ie=v.dataset.beadId;if(ie===p)return;let le=Q.findIndex(Ie=>Ie.id===ie);le>=0&&(_e=le)}let be=Q.slice();be.splice(_e,0,C),E.applyReorder(p,be,_e)}function ze(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;p.preventDefault(),v.classList.remove("worker-pane--drag-over");let C=v.dataset.lane||"",Q=T?.bead_id||p.dataTransfer?.getData("text/plain")||"",_e=T?.from_lane||"";if(T=null,!Q)return;let be=p.target?.closest?.(".worker-mini, .worker-card"),ie=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),le=ie.length;if(be){let Ie=ie.indexOf(be);Ie>=0&&(le=Ie)}if(v.classList.contains("worker-pane--collapsed")&&(le=we()),C==="candidate"){if(_e==="candidate"){Ce(Q,be);return}_e==="queue"&&te(Q);return}C==="queue"&&(_e==="queue"?M(Q,le):B(Q,le))}function Qe(p){U=p,Hp(p),De()}function Se(p){$=p==="board"||p==="created"||p==="spec"?p:as,Kp($),De()}function We(p){G=Ot(p)?p:Et,Xp(G),m?.(G),De()}function xe(p){let v=p.target?.closest?.(".worker-mini__select");if(v){let it=v.dataset.beadId||"";it&&(v.checked?de.add(it):de.delete(it),De());return}let C=p.target?.closest?.(".worker-bulk__mode");if(C){ye=C.value==="serial"?"serial":"ordinary";return}let Q=p.target?.closest?.(".worker-filter__blocked");if(Q){Qe({...U,show_blocked:Q.checked});return}let _e=p.target?.closest?.(".worker-done-range");if(_e){We(_e.value);return}let be=p.target?.closest?.(".worker-sort");if(be){Se(be.value||as);return}let ie=p.target?.closest?.(".worker-pr-wait-hold");if(ie){tt(ie.checked);return}let le=p.target?.closest?.(".worker-slots__input");if(!le)return;let Ie=Number.parseInt(le.value,10);if(!Number.isFinite(Ie)){De();return}Oe(Ie).then(De)}function pt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function ht(p){let v=H(),C=v.attempts?v.attempts[p]:null;ve=p,Re.hidden=!1,me.open({attempt_id:p,meta:pt(C)}),De()}function sr(){if(!ve)return;let p=H(),v=p.attempts?p.attempts[ve]:null;if(v){me.updateMeta(pt(v));return}me.close()}function jt(p){let v=p.target,C=v?.closest?.(".worker-bulk__apply");if(C){C.disabled||Pe();return}if(v?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip")||v?.closest?.("#worker-exec-defaults-dialog"))return;if(v?.closest?.(".worker-exec-defaults-btn")){z.open();return}if(v?.closest?.(".worker-deployment-retry")){r&&Promise.resolve(r("worker-deployment-retry",{})).then(V);return}let Q=v?.closest?.(".worker-deployment-session");if(Q){let ae=Q.dataset.attemptId;ae&&ht(ae);return}let _e=v?.closest?.(".worker-deployment-continue");if(_e){let ae=_e.dataset.attemptId;ae&&Ee(ae);return}let be=v?.closest?.(".worker-banner__resume");if(be){let ae=be.dataset.attemptId;ae&&Be(ae);return}let ie=v?.closest?.(".worker-banner__discard");if(ie){let ae=ie.dataset.confirmation==="merged"?"merged":"unmerged";ee(ie.dataset.beadId||"",ie.dataset.attemptId||null,ae,ie.dataset.operationId||null);return}let le=v?.closest?.(".worker-banner__dismiss");if(le){let ae=le.dataset.attemptId;ae&&Xe(ae);return}if(v?.closest?.(".worker-play")){ue(!H().auto_advance);return}let Ie=v?.closest?.(".worker-merge-all");if(Ie){Ie.classList.contains("worker-merge-all--stop")?H().auto_merge===!0?k(!1):P():k(!0);return}let it=v?.closest?.(".worker-pane__hd--toggle");if(it){let ae=it.dataset.lane;(ae==="queue"||ae==="done")&&ct(ae);return}let ft=v?.closest?.(".worker-card__place");if(ft){let ae=ft.dataset.beadId;ae&&!ft.disabled&&B(ae,we());return}let St=v?.closest?.(".worker-filter__chip");if(St){let ae=St.dataset.spec;(ae==="all"||ae==="with"||ae==="without")&&Qe({...U,spec:ae});return}let vt=v?.closest?.(".worker-mini__merge");if(vt){L(vt.dataset.beadId||"");return}let ce=v?.closest?.(".worker-mini__merge-cancel");if(ce){A(ce.dataset.beadId||"");return}let b=v?.closest?.(".worker-mini__discard");if(b){ee(b.dataset.beadId||"",b.dataset.attemptId||null,b.dataset.discardMode==="merged"?"merged":"unmerged",b.dataset.operationId||null);return}let W=v?.closest?.(".worker-mini__revise-fix");if(W){Z("worker-revise-fix",W.dataset.beadId||"");return}let re=v?.closest?.(".worker-mini__revise-approve");if(re){Z("worker-revise-approve",re.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let ae=v?.closest?.(".rtile"),_=ae?.dataset?.beadId,d=ae?.dataset?.attemptId;_&&ee(_,d||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let _=v?.closest?.(".rtile")?.dataset?.attemptId;_&&Xe(_);return}if(v?.closest?.(".rtile__pause")){let _=v?.closest?.(".rtile")?.dataset?.attemptId;_&&Te(_);return}if(v?.closest?.(".rtile__resume")){let _=v?.closest?.(".rtile")?.dataset?.attemptId;_&&Be(_);return}if(v?.closest?.(".rtile__session")){let _=v?.closest?.(".rtile")?.dataset?.attemptId;_&&ht(_);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){me.close();return}if(v?.closest?.(".worker-drawer-host"))return;let Fe=v?.closest?.(".rtile");if(Fe){if(v?.closest?.(".rtile__id")){let _=Fe.dataset.beadId;_&&Sr(_).then(d=>{d?K("\uBCF5\uC0AC\uB428","success",1200):K("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ae=Fe.dataset.beadId;ae&&c&&c(ae);return}let Ve=v?.closest?.(".worker-mini, .worker-card");if(Ve){let ae=Ve.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){ae&&Sr(ae).then(_=>{_?K("\uBCF5\uC0AC\uB428","success",1200):K("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ae&&c&&c(ae)}}return e.addEventListener("dragstart",oe),e.addEventListener("dragover",fe),e.addEventListener("dragleave",ke),e.addEventListener("drop",ze),e.addEventListener("click",jt),e.addEventListener("change",xe),Y(),F(),h&&Me.push(h.subscribe(()=>{for(let[p,v]of X)v==="failed"&&X.delete(p);De()})),s&&Me.push(s.subscribe(()=>{De(),sr()})),De(),{load(){De()},openExecDefaults(){z.open()},destroy(){for(let p of Me.splice(0))try{p()}catch{}e.removeEventListener("dragstart",oe),e.removeEventListener("dragover",fe),e.removeEventListener("dragleave",ke),e.removeEventListener("drop",ze),e.removeEventListener("click",jt),e.removeEventListener("change",xe);try{me.destroy()}catch{}Re.hidden=!0;try{z.destroy()}catch{}Ue(l``,e)}}}function ko(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Dl(e,t,r,n=async()=>{},s=async()=>{}){let o=st("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function f(x){let I=x.target.value,ye=t.getState().workspace?.current?.path||"";if(I&&I!==ye){o("switching workspace to %s",I),i=!0,D();try{await r(I)}catch(se){o("workspace switch failed: %o",se)}finally{i=!1,D()}}}async function m(){let x=t.getState(),N=x.workspace?.current?.path||x.workspace?.available?.[0]?.path||"";if(!(!N||c)){o("git-pulling workspace %s",N),c=!0,D();try{await n(N)}catch(I){o("workspace git pull failed: %o",I)}finally{c=!1,D()}}}function h(x){let N=x.target;N&&e.contains(N)||R()}function E(x){x.key==="Escape"&&R()}function T(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",E),D())}function R(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",E),D())}function U(){u?R():T()}async function $(x){let N=x.target,I=N.value,de=N.checked;o("toggling visibility %s \u2192 %s",I,String(de));try{await s(I,de)}catch(ye){o("workspace visibility toggle failed: %o",ye)}}function G(x){return x?l`
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
                        >${ko(I.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function j(){let x=t.getState(),N=x.workspace?.current,I=x.workspace?.available||[],de=new Set(x.workspace?.hidden||[]),ye=N?.path||I[0]?.path||"";if(I.length===0)return l``;let se=I.filter(he=>!de.has(he.path)||he.path===ye);if(se.length<=1){let he=se[0]||I[0],Me=ko(he.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${he.path}"
            >${Me}</span
          >
          ${X(I,de)}
          ${G(ye)}
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
          ${se.map(he=>l`
              <option
                value="${he.path}"
                ?selected=${he.path===ye}
                title="${he.path}"
              >
                ${ko(he.path)}
              </option>
            `)}
        </select>
        ${X(I,de)}
        ${G(ye)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){Ue(j(),e)}return D(),a=t.subscribe(()=>D()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",E),Ue(l``,e)}}}var Ml=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-queue-set-slots","worker-deployment-retry","worker-deployment-recovery-continue","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function $o(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Pl(e,t,r=$o()){return{id:r,type:e,payload:t}}function Nl(e={}){let t=st("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,f=[],m=new Map,h=new Set;function E(j){for(let D of Array.from(h))try{D(j)}catch{}}function T(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),E(o);let j=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),D=(r.jitterRatio||0)*j,x=Math.max(0,Math.round(j+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",x,a+1),i=setTimeout(()=>{i=null,X()},x)}function R(j){try{s?.send(JSON.stringify(j))}catch(D){t("ws send failed",D)}}function U(){for(o="open",t("ws open"),E(o),a=0;f.length;){let j=f.shift();j&&R(j)}}function $(j){let D;try{D=JSON.parse(String(j.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(u.has(D.id)){let N=u.get(D.id);u.delete(D.id),D.ok?N?.resolve(D.payload):N?.reject(D.error||new Error("ws error"));return}let x=m.get(D.type);if(x&&x.size>0)for(let N of Array.from(x))try{N(D.payload)}catch(I){t("ws event handler error",I)}else t("ws received unhandled message type: %s",D.type)}function G(){o="closed",t("ws closed"),E(o);for(let[j,D]of u.entries())D.reject(new Error("ws disconnected")),u.delete(j);a+=1,T()}function X(){if(!c)return;let j=n();try{s=new WebSocket(j),t("ws connecting %s",j),o="connecting",E(o),s.addEventListener("open",U),s.addEventListener("message",$),s.addEventListener("error",()=>{}),s.addEventListener("close",G)}catch(D){t("ws connect failed %o",D),T()}}return X(),{send(j,D){if(!Ml.includes(j))return Promise.reject(new Error(`unknown message type: ${j}`));let x=$o(),N=Pl(j,D,x);return t("send %s id=%s",j,x),new Promise((I,de)=>{u.set(x,{resolve:I,reject:de,type:j}),s&&s.readyState===s.OPEN?R(N):(t("queue %s id=%s (state=%s)",j,x,o),f.push(N))})},on(j,D){m.has(j)||m.set(j,new Set);let x=m.get(j);return x?.add(D),()=>{x?.delete(D)}},onConnection(j){return h.add(j),()=>{h.delete(j)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,X()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function _f(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function mf(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var xo=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Fl=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],gr="tab:worker:closed",gf="bdui.worker.done-range",ql=gl,Bl="worker:queue",Ul="ui:order",jl="ui:display-policy",zl="exec:presets",hr="tab:board:closed",Hl="beads-ui.board.closed-range";function hf(e){let t=st("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ue(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&Sl(s),o&&a&&i&&c){let Ae=function(_,d){let w="Request failed",y="";if(_&&typeof _=="object"){let J=_;if(typeof J.message=="string"&&J.message.length>0&&(w=J.message),typeof J.details=="string")y=J.details;else if(J.details&&typeof J.details=="object")try{y=JSON.stringify(J.details,null,2)}catch{y=""}}else typeof _=="string"&&_.length>0&&(w=_);let O=d&&d.length>0?`Failed to load ${d}`:"Request failed";Ke.open(O,w,y)},S=function(_){return`${le.getState().workspace.current?.path||""}\0${_}`},k=function(){te&&(te().catch(()=>{}),te=null),Pe=null,Te=null},P=function(_){Be=_;let d=()=>{Be!==_||le.getState().selected_id!==_||(Be=null,A(_))};if(!Le){Xe.then(d);return}d()},Oe=function(_,d,w,y,O){return w!==ue[d]?(O().catch(()=>{}),!1):(_.set(y,O),!0)},tt=function(){let _=le.getState();lt(_.view==="board"),ct(_.view==="worker"),fe(_.view==="monitor"),F(_.view==="board"||_.view==="worker"||!!_.selected_id)},bt=function(){let _=kr(ot);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},ut=function(){let _=kr(Ye);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},lt=function(_){if(_)for(let[d,w]of xo){if(ee.has(d)||Z.has(d))continue;let y=d===hr?bt():{type:w};try{z.register(d,y)}catch($e){t("register %s store failed: %o",d,$e)}Z.add(d);let O=ue.board,J=!1;me.subscribeList(d,y).then($e=>{J=!Oe(ee,"board",O,d,$e)}).catch($e=>{t("subscribe %s failed: %o",d,$e),Ae($e,"board")}).finally(()=>{Z.delete(d),J&&tt()})}else rt()},rt=function(){ue.board+=1;for(let[_]of xo){let d=ee.get(_);d&&(d().catch(()=>{}),ee.delete(_));try{z.unregister(_)}catch(w){t("unregister %s failed: %o",_,w)}}},ct=function(_){if(!_){De();return}for(let[d,w]of Fl){if(at.has(d)||Z.has(d))continue;let y=d===gr?ut():{type:w};try{z.register(d,y)}catch($e){t("register %s store failed: %o",d,$e)}Z.add(d);let O=ue.worker,J=!1;me.subscribeList(d,y).then($e=>{J=!Oe(at,"worker",O,d,$e)}).catch($e=>{t("subscribe %s failed: %o",d,$e),Ae($e,"worker")}).finally(()=>{Z.delete(d),J&&tt()})}},De=function(){ue.worker+=1;for(let[_]of Fl){let d=at.get(_);d&&(d().catch(()=>{}),at.delete(_));try{z.unregister(_)}catch(w){t("unregister %s failed: %o",_,w)}}},F=function(_){if(!_){Y();return}nt||(ve("subscribe-worker-queue",{id:Bl}).catch(d=>{t("subscribe-worker-queue failed: %o",d)}),nt=()=>ve("unsubscribe-worker-queue",{id:Bl}))},Y=function(){nt&&(nt().catch(()=>{}),nt=null)},fe=function(_){if(!_){ke();return}oe||(ve("subscribe-monitor-pipeline",{id:ql}).catch(d=>{t("subscribe-monitor-pipeline failed: %o",d)}),oe=()=>ve("unsubscribe-monitor-pipeline",{id:ql}))},ke=function(){oe&&(oe().catch(()=>{}),oe=null)},ze=function(){Ce||(ve("subscribe-ui-order",{id:Ul}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),Ce=()=>ve("unsubscribe-ui-order",{id:Ul}))},Qe=function(){Ce&&(Ce().catch(()=>{}),Ce=null),V.clear()},We=function(){Se||(ve("subscribe-display-policy",{id:jl}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),Se=()=>ve("unsubscribe-display-policy",{id:jl}))},xe=function(){Se&&(Se().catch(()=>{}),Se=null),we.clear()},ht=function(){pt||(ve("subscribe-exec-presets",{id:zl}).catch(_=>{t("subscribe-exec-presets failed: %o",_)}),pt=()=>ve("unsubscribe-exec-presets",{id:zl}))},Q=function(_){if(!_)return"Unknown";let d=_.split("/").filter(Boolean);return d.length>0?d[d.length-1]:"Unknown"};var u=Ae,f=S,m=k,h=P,E=Oe,T=tt,R=bt,U=ut,$=lt,G=rt,X=ct,j=De,D=F,x=Y,N=fe,I=ke,de=ze,ye=Qe,se=We,he=xe,Me=ht,Je=Q;let et=document.getElementById("header-loading"),Re=Sa(et),Ke=Yi(e),pe=Nl(),ve=Re.wrapSend((_,d)=>pe.send(_,d)),me=ba(ve),z=ya(),H=wa(),ge=na(),V=va(),we=ta(),B=ra(),M=sa();pe.on("exec-presets-snapshot",_=>{let d=_;d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&B.set({revision:d.revision,presets:d.presets})}),pe.on("monitor-pipeline-snapshot",_=>{let d=_;if(!(!d||!Array.isArray(d.workspaces)))try{ge.set(d.workspaces,d.workspaces_state)}catch{}}),pe.on("ui-order-snapshot",_=>{let d=_;if(d&&typeof d.revision=="number")try{V.set({revision:d.revision,order:d.order&&typeof d.order=="object"?d.order:{}})}catch{}}),pe.on("display-policy-snapshot",_=>{let d=_;if(d&&d.policy&&typeof d.policy=="object")try{we.set(d.policy)}catch{}}),pe.on("session-log-snapshot",_=>{let d=_;if(d&&typeof d.attempt_id=="string")try{M.set(d.attempt_id,Array.isArray(d.lines)?d.lines:[],typeof d.last_event_at=="number"?d.last_event_at:null)}catch{}}),pe.on("session-log-append",_=>{let d=_;if(d&&typeof d.attempt_id=="string")try{M.append(d.attempt_id,d.event)}catch{}}),pe.on("snapshot",_=>{let d=_,w=d&&typeof d.id=="string"?d.id:"",y=w?z.getStore(w):null;if(y&&d&&d.type==="snapshot")try{y.applyPush(d)}catch{}}),pe.on("upsert",_=>{let d=_,w=d&&typeof d.id=="string"?d.id:"",y=w?z.getStore(w):null;if(y&&d&&d.type==="upsert")try{y.applyPush(d)}catch{}}),pe.on("delete",_=>{let d=_,w=d&&typeof d.id=="string"?d.id:"",y=w?z.getStore(w):null;if(y&&d&&d.type==="delete")try{y.applyPush(d)}catch{}});let te=null,Pe=null,Te=null,Be=null,Ee=()=>{},Xe=new Promise(_=>{Ee=()=>_(void 0)}),Le=!1,L=!1;async function A(_){let d=S(_);if(d===Pe||d===Te)return;Te=d;let w=`detail:${_}`,y={type:"issue-detail",params:{id:_}};try{z.register(w,y)}catch(O){t("register detail store failed: %o",O)}try{let O=await me.subscribeList(w,y);if(le.getState().selected_id!==_||S(_)!==d){await O().catch(()=>{});return}te&&await te().catch(()=>{}),te=O,Pe=d}catch(O){t("detail subscribe failed: %o",O),Ae(O,"issue details")}finally{Te===d&&(Te=null)}}let ee=new Map,Z=new Set,ue={board:0,worker:0},ot=Et;try{let _=window.localStorage.getItem(Hl);Ot(_)&&(ot=_)}catch{}let Ye=Et;try{let _=window.localStorage.getItem(gf);Ot(_)&&(Ye=_)}catch{}async function yt(_){if(!Ot(_)||_===ot)return;ot=_;try{window.localStorage.setItem(Hl,_)}catch{}let d=ee.get(hr);if(!d)return;ee.delete(hr),await d().catch(()=>{});let w=bt();try{z.register(hr,w)}catch(y){t("register %s store failed: %o",hr,y)}try{let y=await me.subscribeList(hr,w);ee.set(hr,y)}catch(y){t("re-subscribe %s failed: %o",hr,y),Ae(y,"board")}}async function It(_){if(!Ot(_)||_===Ye)return;Ye=_;let d=at.get(gr);if(!d)return;at.delete(gr),await d().catch(()=>{});let w=ut();try{z.register(gr,w)}catch(y){t("register %s store failed: %o",gr,y)}try{let y=await me.subscribeList(gr,w);at.set(gr,y)}catch(y){t("re-subscribe %s failed: %o",gr,y),Ae(y,"worker")}}let at=new Map,nt=null,oe=null,Ce=null,Se=null,pt=null;async function sr(){Se=null,we.clear(),pt=null,B.clear(),nt=null,oe=null,ee.clear(),at.clear(),ue.board+=1,ue.worker+=1,ht();let _=le.getState().workspace.current?.path;if(_)try{await pe.send("set-workspace",{path:_})}catch(w){t("workspace restore after reconnect failed: %o",w);return}We();let d=le.getState();lt(d.view==="board"),ct(d.view==="worker"),fe(d.view==="monitor"),F(d.view==="board"||d.view==="worker"||!!d.selected_id)}async function jt(){t("clearing all subscriptions for workspace switch"),rt(),De(),Y(),H.clear(),Qe(),ze(),xe(),We(),k();let _=le.getState();if(_.selected_id)try{z.unregister(`detail:${_.selected_id}`)}catch{}let d=le.getState();lt(d.view==="board"),ct(d.view==="worker"),fe(d.view==="monitor"),F(d.view==="board"||d.view==="worker"||!!d.selected_id),d.selected_id&&P(d.selected_id)}async function p(_){t("requesting workspace switch to %s",_),L=!0;try{let d=await pe.send("set-workspace",{path:_});t("workspace switch result: %o",d),d&&d.workspace&&(le.setState({workspace:{current:{path:d.workspace.root_dir,database:d.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),d.changed&&(await jt(),K("Switched to "+Q(_),"success",2e3)))}catch(d){throw t("workspace switch failed: %o",d),K("Failed to switch workspace","error",3e3),d}finally{L=!1}}async function v(_){t("requesting workspace git pull for %s",_);try{let d=await pe.send("git-pull-workspace",{});t("workspace git pull result: %o",d);let w=d?.status;if(w==="up_to_date"){K("Already up to date","success",2e3);return}if(w==="stash_pop_conflict"){K("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}K("Git pulled "+Q(_),"success",2e3)}catch(d){t("workspace git pull failed: %o",d);let w=d?.code,y=d?.message;if(w==="rebase_conflict"){K("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(w==="rebase_conflict_abort_failed"){K("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(w==="busy"){K("Git pull skipped: another operation is running","warning",3e3);return}let O=y?`: ${y}`:"";throw K(`Git pull failed${O}`,"error",3e3),d}}async function C(_,d){t("setting workspace visibility %s \u2192 %s",_,String(d));try{await pe.send("set-workspace-visibility",{path:_,visible:d}),await _e()}catch(w){t("workspace visibility update failed: %o",w),K("Failed to update project visibility","error",3e3)}}async function _e(){try{let _=await pe.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let d=_.workspaces.map(J=>({path:J.path,database:J.database,pid:J.pid,version:J.version})),w=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,y=Array.isArray(_.hidden)?_.hidden.filter(J=>typeof J=="string"):[];le.setState({workspace:{current:w,available:d,hidden:y}});let O=window.localStorage.getItem("beads-ui.workspace");O&&(!d.some($e=>$e.path===O)||y.includes(O)?window.localStorage.removeItem("beads-ui.workspace"):w&&O!==w.path&&(t("restoring saved workspace preference: %s",O),await p(O)))}}catch(_){t("failed to load workspaces: %o",_)}}pe.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(le.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),_e(),jt())});let be=!1;if(typeof pe.onConnection=="function"){let _=d=>{t("ws state %s",d),d==="reconnecting"||d==="closed"?(be=!0,K("Connection lost. Reconnecting\u2026","error",4e3)):d==="open"&&be&&(be=!1,K("Reconnected","success",2200),mf(le,(w,y)=>{t(`${w}: %o`,y)}),sr())};pe.onConnection(_)}let ie="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(ie=_)}catch(_){t("view parse error: %o",_)}let le=xa({config:_f(),view:ie});pe.on("worker-queue-snapshot",_=>{let d=_;if(!d||!d.queue)return;let w=le.getState().workspace.current?.path;if(typeof w=="string"&&w.length>0&&d.root_dir!==w){t("dropping worker-queue snapshot for %s",String(d.root_dir));return}try{let y=d.queue?.deployment?.notifications;if(Array.isArray(y))for(let O of y)O&&typeof O.key=="string"&&typeof O.text=="string"&&(O.variant==="success"||O.variant==="warning"||O.variant==="info")&&Aa(O.key,O.text,O.variant);H.set(d.queue)}catch{}});let Ie=ka(le);Ie.start();let it=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),ft=async(_,d)=>{try{return await ve(_,d)}catch(w){if(it.has(_))throw w;return[]}};n&&bl(n,le,Ie);let St=document.getElementById("workspace-picker");St&&Dl(St,le,p,v,C);let vt=kl(e,(_,d)=>ve(_,d));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>vt.open())}catch{}let ce=Gi(e,{policyStore:we,transport:(_,d)=>ve(_,d),labelOptions:()=>{let _=new Set;for(let[d]of xo)for(let w of z.snapshotFor(d)||[]){let y=w.labels;if(Array.isArray(y))for(let O of y)typeof O=="string"&&O.length>0&&_.add(O)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>ce.open())}catch{}let b=Ma(o,{gotoIssue:_=>Ie.gotoIssue(_),issueStores:z,transport:ft,workerQueueStore:H,uiOrderStore:V,displayPolicyStore:we,closedRange:ot,onClosedRangeChange:_=>{yt(_)},onNewIssue:()=>vt.open()}),W=wo(a,{transport:ft,issueStores:z,queueStore:H,execPresetStore:B,sessionLogStore:M,uiOrderStore:V,gotoIssue:_=>le.setState({selected_id:_}),getWorkspacePath:()=>le.getState().workspace.current?.path,doneRange:Ye,onDoneRangeChange:_=>{It(_)}}),re=hl(i,{transport:ft,pipelineStore:ge,execPresetStore:B,gotoIssue:_=>Ie.gotoIssue(_),getWorkspacePath:()=>le.getState().workspace.current?.path,switchWorkspace:_=>p(_)}),Fe=Hi(c,{issueStores:z,transport:ft,queueStore:H,execPresetStore:B,sessionLogStore:M,getWorkspacePath:()=>le.getState().workspace.current?.path,onNavigate:_=>{le.getState().view==="worker"?le.setState({selected_id:_}):Ie.gotoIssue(_)},onClose:()=>{let _=le.getState();le.setState({selected_id:null});try{Ie.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{le.setState({selected_id:null}),Ie.gotoView("worker"),W.openExecDefaults()}}),Ve=le.getState().selected_id;Ve&&(c.hidden=!1,Fe.load(Ve),P(Ve)),le.subscribe(_=>{let d=_.selected_id;d?(c.hidden=!1,Fe.load(d),L||P(d)):(Fe.clear(),c.hidden=!0,k())});let ae=_=>{o.hidden=_.view!=="board",a.hidden=_.view!=="worker",i.hidden=_.view!=="monitor",lt(_.view==="board"),ct(_.view==="worker"),fe(_.view==="monitor"),F(_.view==="board"||_.view==="worker"||!!_.selected_id),!_.selected_id&&_.view==="board"&&b.load(),_.view==="worker"&&W.load(),_.view==="monitor"?re.load():re.pause(),window.localStorage.setItem("beads-ui.view",_.view)};le.subscribe(ae),ae(le.getState()),ze(),We(),ht(),_e().finally(()=>{Le=!0,Ee()}),window.addEventListener("keydown",_=>{let d=_.ctrlKey||_.metaKey,w=String(_.key||"").toLowerCase(),y=_.target,O=y&&y.tagName?String(y.tagName).toLowerCase():"",J=O==="input"||O==="textarea"||O==="select"||y&&typeof y.isContentEditable=="boolean"&&y.isContentEditable;d&&w==="n"&&(J||(_.preventDefault(),vt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&hf(t)});export{hf as bootstrap,_f as readBootstrapConfig,mf as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
