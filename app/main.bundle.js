var of=Object.create;var _a=Object.defineProperty;var af=Object.getOwnPropertyDescriptor;var lf=Object.getOwnPropertyNames;var cf=Object.getPrototypeOf,uf=Object.prototype.hasOwnProperty;var df=(e,t,n)=>t in e?_a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ma=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var pf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of lf(t))!uf.call(e,s)&&s!==n&&_a(e,s,{get:()=>t[s],enumerable:!(r=af(t,s))||r.enumerable});return e};var ff=(e,t,n)=>(n=e!=null?of(cf(e)):{},pf(t||!e||!e.__esModule?_a(n,"default",{value:e,enumerable:!0}):n,e));var kt=(e,t,n)=>df(e,typeof t!="symbol"?t+"":t,n);var Fl=ma((ay,ql)=>{var xr=1e3,Ar=xr*60,Sr=Ar*60,or=Sr*24,gf=or*7,hf=or*365.25;ql.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return bf(e);if(n==="number"&&isFinite(e))return t.long?vf(e):yf(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function bf(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*hf;case"weeks":case"week":case"w":return n*gf;case"days":case"day":case"d":return n*or;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Sr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Ar;case"seconds":case"second":case"secs":case"sec":case"s":return n*xr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function yf(e){var t=Math.abs(e);return t>=or?Math.round(e/or)+"d":t>=Sr?Math.round(e/Sr)+"h":t>=Ar?Math.round(e/Ar)+"m":t>=xr?Math.round(e/xr)+"s":e+"ms"}function vf(e){var t=Math.abs(e);return t>=or?Vs(e,t,or,"day"):t>=Sr?Vs(e,t,Sr,"hour"):t>=Ar?Vs(e,t,Ar,"minute"):t>=xr?Vs(e,t,xr,"second"):e+" ms"}function Vs(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Bl=ma((iy,jl)=>{function wf(e){n.debug=n,n.default=n,n.coerce=c,n.disable=a,n.enable=s,n.enabled=i,n.humanize=Fl(),n.destroy=d,Object.keys(e).forEach(p=>{n[p]=e[p]}),n.names=[],n.skips=[],n.formatters={};function t(p){let f=0;for(let g=0;g<p.length;g++)f=(f<<5)-f+p.charCodeAt(g),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(p){let f,g=null,w,A;function D(...W){if(!D.enabled)return;let V=D,Y=Number(new Date),N=Y-(f||Y);V.diff=N,V.prev=f,V.curr=Y,f=Y,W[0]=n.coerce(W[0]),typeof W[0]!="string"&&W.unshift("%O");let M=0;W[0]=W[0].replace(/%([a-zA-Z%])/g,(U,E)=>{if(U==="%%")return"%";M++;let R=n.formatters[E];if(typeof R=="function"){let X=W[M];U=R.call(V,X),W.splice(M,1),M--}return U}),n.formatArgs.call(V,W),(V.log||n.log).apply(V,W)}return D.namespace=p,D.useColors=n.useColors(),D.color=n.selectColor(p),D.extend=r,D.destroy=n.destroy,Object.defineProperty(D,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(w!==n.namespaces&&(w=n.namespaces,A=n.enabled(p)),A),set:W=>{g=W}}),typeof n.init=="function"&&n.init(D),D}function r(p,f){let g=n(this.namespace+(typeof f>"u"?":":f)+p);return g.log=this.log,g}function s(p){n.save(p),n.namespaces=p,n.names=[],n.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of f)g[0]==="-"?n.skips.push(g.slice(1)):n.names.push(g)}function o(p,f){let g=0,w=0,A=-1,D=0;for(;g<p.length;)if(w<f.length&&(f[w]===p[g]||f[w]==="*"))f[w]==="*"?(A=w,D=g,w++):(g++,w++);else if(A!==-1)w=A+1,D++,g=D;else return!1;for(;w<f.length&&f[w]==="*";)w++;return w===f.length}function a(){let p=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),p}function i(p){for(let f of n.skips)if(o(p,f))return!1;for(let f of n.names)if(o(p,f))return!0;return!1}function c(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}jl.exports=wf});var Ul=ma((Jt,Ks)=>{Jt.formatArgs=$f;Jt.save=xf;Jt.load=Af;Jt.useColors=kf;Jt.storage=Sf();Jt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Jt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function kf(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function $f(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ks.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}Jt.log=console.debug||console.log||(()=>{});function xf(e){try{e?Jt.storage.setItem("debug",e):Jt.storage.removeItem("debug")}catch{}}function Af(){let e;try{e=Jt.storage.getItem("debug")||Jt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Sf(){try{return localStorage}catch{}}Ks.exports=Bl()(Jt);var{formatters:Ef}=Ks.exports;Ef.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Kr=globalThis,Bs=Kr.trustedTypes,$l=Bs?Bs.createPolicy("lit-html",{createHTML:e=>e}):void 0,ha="$lit$",En=`lit$${Math.random().toFixed(9).slice(2)}$`,ba="?"+En,_f=`<${ba}>`,tr=document,Yr=()=>tr.createComment(""),Zr=e=>e===null||typeof e!="object"&&typeof e!="function",ya=Array.isArray,Cl=e=>ya(e)||typeof e?.[Symbol.iterator]=="function",ga=`[ 	
\f\r]`,Vr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xl=/-->/g,Al=/>/g,Jn=RegExp(`>|${ga}(?:([^\\s"'>=/]+)(${ga}*=${ga}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Sl=/'/g,El=/"/g,Rl=/^(?:script|style|textarea|title)$/i,va=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),l=va(1),$r=va(2),Jb=va(3),cn=Symbol.for("lit-noChange"),It=Symbol.for("lit-nothing"),Tl=new WeakMap,er=tr.createTreeWalker(tr,129);function Ll(e,t){if(!ya(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return $l!==void 0?$l.createHTML(t):t}var Il=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Vr;for(let i=0;i<n;i++){let c=e[i],d,p,f=-1,g=0;for(;g<c.length&&(a.lastIndex=g,p=a.exec(c),p!==null);)g=a.lastIndex,a===Vr?p[1]==="!--"?a=xl:p[1]!==void 0?a=Al:p[2]!==void 0?(Rl.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=Jn):p[3]!==void 0&&(a=Jn):a===Jn?p[0]===">"?(a=s??Vr,f=-1):p[1]===void 0?f=-2:(f=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?Jn:p[3]==='"'?El:Sl):a===El||a===Sl?a=Jn:a===xl||a===Al?a=Vr:(a=Jn,s=void 0);let w=a===Jn&&e[i+1].startsWith("/>")?" ":"";o+=a===Vr?c+_f:f>=0?(r.push(d),c.slice(0,f)+ha+c.slice(f)+En+w):c+En+(f===-2?i:w)}return[Ll(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Qr=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[d,p]=Il(t,n);if(this.el=e.createElement(d,r),er.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=er.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(ha)){let g=p[a++],w=s.getAttribute(f).split(En),A=/([.?@])?(.*)/.exec(g);c.push({type:1,index:o,name:A[2],strings:w,ctor:A[1]==="."?Ws:A[1]==="?"?zs:A[1]==="@"?Hs:rr}),s.removeAttribute(f)}else f.startsWith(En)&&(c.push({type:6,index:o}),s.removeAttribute(f));if(Rl.test(s.tagName)){let f=s.textContent.split(En),g=f.length-1;if(g>0){s.textContent=Bs?Bs.emptyScript:"";for(let w=0;w<g;w++)s.append(f[w],Yr()),er.nextNode(),c.push({type:2,index:++o});s.append(f[g],Yr())}}}else if(s.nodeType===8)if(s.data===ba)c.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(En,f+1))!==-1;)c.push({type:7,index:o}),f+=En.length-1}o++}}static createElement(t,n){let r=tr.createElement("template");return r.innerHTML=t,r}};function nr(e,t,n=e,r){if(t===cn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=Zr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=nr(e,s._$AS(e,t.values),s,r)),t}var Us=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??tr).importNode(n,!0);er.currentNode=s;let o=er.nextNode(),a=0,i=0,c=r[0];for(;c!==void 0;){if(a===c.index){let d;c.type===2?d=new kr(o,o.nextSibling,this,t):c.type===1?d=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(d=new Gs(o,this,t)),this._$AV.push(d),c=r[++i]}a!==c?.index&&(o=er.nextNode(),a++)}return er.currentNode=tr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},kr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=It,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=nr(this,t,n),Zr(t)?t===It||t==null||t===""?(this._$AH!==It&&this._$AR(),this._$AH=It):t!==this._$AH&&t!==cn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Cl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==It&&Zr(this._$AH)?this._$AA.nextSibling.data=t:this.T(tr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Qr.createElement(Ll(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Us(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Tl.get(t.strings);return n===void 0&&Tl.set(t.strings,n=new Qr(t)),n}k(t){ya(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(Yr()),this.O(Yr()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},rr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=It,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=It}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=nr(this,t,n,0),a=!Zr(t)||t!==this._$AH&&t!==cn,a&&(this._$AH=t);else{let i=t,c,d;for(t=o[0],c=0;c<o.length-1;c++)d=nr(this,i[r+c],n,c),d===cn&&(d=this._$AH[c]),a||(a=!Zr(d)||d!==this._$AH[c]),d===It?t=It:t!==It&&(t+=(d??"")+o[c+1]),this._$AH[c]=d}a&&!s&&this.j(t)}j(t){t===It?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ws=class extends rr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===It?void 0:t}},zs=class extends rr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==It)}},Hs=class extends rr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=nr(this,t,n,0)??It)===cn)return;let r=this._$AH,s=t===It&&r!==It||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==It&&(r===It||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Gs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){nr(this,t)}},Ol={M:ha,P:En,A:ba,C:1,L:Il,R:Us,D:Cl,V:nr,I:kr,H:rr,N:zs,U:Hs,B:Ws,F:Gs},mf=Kr.litHtmlPolyfillSupport;mf?.(Qr,kr),(Kr.litHtmlVersions??(Kr.litHtmlVersions=[])).push("3.3.1");var Ze=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new kr(t.insertBefore(Yr(),o),o,void 0,n??{})}return s._$AI(e),s};var rn="today",jn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function un(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function sr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Pl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ml(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Dl(){let e=null,t=[],n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],r()},clear(){e=null,t=[],r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Nl(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Wl=ff(Ul(),1);function Et(e){return(0,Wl.default)(`beads-ui:${e}`)}function gn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ar(e,t){let n=gn(e.created_at),r=gn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Gl(e,t){let n=gn(e.created_at),r=gn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Vl(e,t){let n=gn(e.updated_at),r=gn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Kl(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=gn(e.created_at),o=gn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Yl(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Tf=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function zl(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Hl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Tf.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Zl(e,t){let n=zl(e),r=zl(t);if(n!==r)return n<r?-1:1;let s=Hl(e),o=Hl(t);if(s!==o)return s<o?-1:1;let a=gn(e&&e.created_at),i=gn(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,d=t&&t.id;return c===d?0:String(c)<String(d)?-1:1}var wa=2**20;function Er(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-gn(e&&e.created_at)}function Ys(e){return(t,n)=>{let r=Er(t,e),s=Er(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function ka(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Er(i,n)-wa};if(!i)return{rank:Er(a,n)+wa};let c=Er(a,n),d=Er(i,n),p=(c+d)/2;return c<p&&p<d?{rank:p}:{renormalize:r.map((f,g)=>({bead_id:f.id,rank:g*wa}))}}function $a(e,t={}){let n=Et(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||ar;function d(){for(let g of Array.from(a))try{g()}catch{}}function p(){s=Array.from(r.values()).sort(c)}function f(g){if(i||!g||g.id!==e)return;let w=Number(g.revision)||0;if(n("apply %s rev=%d",g.type,w),!(w<=o&&g.type!=="snapshot")){if(g.type==="snapshot"){if(w<=o)return;r.clear();let A=Array.isArray(g.issues)?g.issues:[];for(let D of A)D&&typeof D.id=="string"&&D.id.length>0&&r.set(D.id,D);p(),o=w,d();return}if(g.type==="upsert"){let A=g.issue;if(A&&typeof A.id=="string"&&A.id.length>0){let D=r.get(A.id);if(!D)r.set(A.id,A);else{let W=Number.isFinite(D.updated_at)?D.updated_at:0,V=Number.isFinite(A.updated_at)?A.updated_at:0;if(W<=V){for(let Y of Object.keys(D))Y in A||delete D[Y];for(let[Y,N]of Object.entries(A))D[Y]=N}}p()}o=w,d()}else if(g.type==="delete"){let A=String(g.issue_id||"");A&&(r.delete(A),p()),o=w,d()}}}return{id:e,subscribe(g){return a.add(g),()=>{a.delete(g)}},applyPush:f,snapshot(){return s},size(){return r.size},getById(g){return r.get(g)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function Zs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Ql(e){let t=Et("subs"),n=new Map,r=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let d=r.get(i);if(!d||d.size===0)return;let p=Array.isArray(c.added)?c.added:[],f=Array.isArray(c.updated)?c.updated:[],g=Array.isArray(c.removed)?c.removed:[];for(let w of Array.from(d)){let A=n.get(w);if(!A)continue;let D=A.itemsById;for(let W of p)typeof W=="string"&&W.length>0&&D.set(W,!0);for(let W of f)typeof W=="string"&&W.length>0&&D.set(W,!0);for(let W of g)typeof W=="string"&&W.length>0&&D.delete(W)}}async function o(i,c){let d=Zs(c);if(t("subscribe %s key=%s",i,d),!n.has(i))n.set(i,{key:d,itemsById:new Map});else{let f=n.get(i);if(f&&f.key!==d){let g=r.get(f.key);g&&(g.delete(i),g.size===0&&r.delete(f.key)),n.set(i,{key:d,itemsById:new Map})}}r.has(d)||r.set(d,new Set);let p=r.get(d);p&&p.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(f){let g=n.get(i)||null;if(g){let w=r.get(g.key);w&&(w.delete(i),w.size===0&&r.delete(g.key))}throw n.delete(i),f}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let f=n.get(i)||null;if(f){let g=r.get(f.key);g&&(g.delete(i),g.size===0&&r.delete(f.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Zs,selectors:{getIds(i){let c=n.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let d=n.get(i);return d?d.itemsById.has(c):!1},count(i){let c=n.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=n.get(i),d={};if(!c)return d;for(let p of c.itemsById.keys())d[p]=!0;return d}}}}function Xl(){let e=Et("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let c of Array.from(r))try{c()}catch{}}function a(c,d,p){let f=d?Zs(d):"",g=n.get(c)||"",w=t.has(c);if(e("register %s key=%s (prev=%s)",c,f,g),w&&g&&f&&g!==f){let A=t.get(c);if(A)try{A.dispose()}catch{}let D=s.get(c);if(D){try{D()}catch{}s.delete(c)}let W=$a(c,p);t.set(c,W);let V=W.subscribe(()=>o());s.set(c,V)}else if(!w){let A=$a(c,p);t.set(c,A);let D=A.subscribe(()=>o());s.set(c,D)}return n.set(c,f),()=>i(c)}function i(c){e("unregister %s",c),n.delete(c);let d=t.get(c);d&&(d.dispose(),t.delete(c));let p=s.get(c);if(p){try{p()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let d=t.get(c);return d?d.snapshot().slice():[]},subscribe(c){return r.add(c),()=>r.delete(c)}}}function Jl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ec(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function tc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function xa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Cf(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Rf(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function nc(e){let t=Et("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Cf(r),a=Rf(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=xa(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?xa(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var Lf=Object.freeze({workspace_config:{default_workspace:null}});function rc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Lf.workspace_config.default_workspace}}}function sc(e={}){let t=Et("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:rc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?rc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==n.workspace.hidden[p]),c=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===n.worker.show_closed_children[p])&&!i&&!c||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function oc(e){let t=Et("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let d=n>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let d=n;n=Math.max(0,n-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,n),o()}function c(d){return async(f,g)=>{let w=s++,A=Date.now();r.set(w,{type:f,start_ts:A}),t("request start id=%d type=%s count=%d",w,f,n+1),a();let D=!1,W=()=>{D||(D=!0,r.delete(w),i())},V=setTimeout(()=>{D||(t("request TIMEOUT id=%d type=%s elapsed=%dms",w,f,Date.now()-A),W())},3e4);try{let Y=await d(f,g),N=Date.now()-A;return t("request done id=%d type=%s elapsed=%dms",w,f,N),Y}catch(Y){let N=Date.now()-A;throw t("request error id=%d type=%s elapsed=%dms err=%o",w,f,N,Y),Y}finally{clearTimeout(V),W()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let d=Date.now();return Array.from(r.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:d-f.start_ts}))}}}function ue(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Qs(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(Yl),c;switch(i){case"created_desc":return c.sort(ar),c;case"created_asc":return c.sort(Gl),c;case"updated_desc":return c.sort(Vl),c;case"priority":return c.sort(Kl),c;case"manual":default:{let d=n();return d?c.sort(Ys(d)):c.sort(ar),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function $n(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Gt(e){let t=$n(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function sn(e,t){let n=$n(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function ac(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=$n(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Xs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Js(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=Xs(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function eo(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=ac(n);return{total:n.length,count:r,current:s,children:n}}function to(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let d of i)c[d.bead_id]=d.rank;n&&n.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!n)return;let d=n.get()||{revision:0,order:{}},p=r(ka(i,c,d.order),a);s(d,p);let f=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(f&&f.conflict){let g={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(g);let w=r(ka(i,c,g.order),a);s(g,w);let A=await t("ui-order-set",{expected_revision:g.revision,entries:w});A&&A.applied&&n.set({revision:typeof A.revision=="number"?A.revision:0,order:A.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function no(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Aa(e,t){return!t||typeof e!="string"||e.length===0||no(t.visible_labels).includes(e)?!0:no(t.hidden_labels).includes(e)?!1:!no(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function ic(e,t){return no(e).filter(n=>Aa(n,t))}function Bn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function If(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Of(e,t,n,r,s){return l`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function Pf(e,t,n,r){return l`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${If(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function ro(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(Zl):a;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?Of(t.parent_id,e.count,n,r,t.onToggle):l`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?l`<div class="board-card__roll-list">
            ${i.map((c,d)=>Pf(c,d+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Mf={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},cc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},lc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Df={review:"\u2713",skip:"\u2298"},Un={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Nf(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function uc(e){let t=e&&e.fill||"none";return t==="none"?Un.none:e&&e.stale===!0?Un.stale:t==="dim"?Un.dim:e&&e.glyph==="review"?Un.review:e&&e.glyph==="skip"?Un.skip:Un.done}function qf(e){if(!e||e.fill==="none"||!e.approval_state)return uc(e);let t=[];return e.glyph==="review"?t.push(Un.review):e.glyph==="skip"&&t.push(Un.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Ff(e,t,n){let r=Mf[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Df[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${r} dim`:s==="full"&&(i+=` b-${r} full`),o&&(i+=" stale"),n&&(i+=" cur");let c=s==="none"?"lbl":`lbl l-${r} on`,d=n?`color: var(--stage-${r}-on)`:"";return l`
    <div class="seg">
      <div class=${i} style=${d}>${a}</div>
      <div class=${c}>
        ${cc[e]||e}
      </div>
    </div>
  `}function so(e,t){if(!e||!e.stages)return"";let n=lc[e.route]||lc.spec_backed,r=e.stages,s=Nf(n,r,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(a=>`${cc[a]||a} ${a==="plan"?qf(r[a]||{}):uc(r[a]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${o}>
      ${n.map(a=>Ff(a,r[a]||{},a===s))}
    </div>
  `}function jf(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var dc=2;function Bf(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,dc).join(", "),s=n.length-dc,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Sa(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function oo(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Tn(e){return`${e.kind}:${oo(e)}@${e.sha}`}function ao(e,t){if(!e)return null;let n=Sa(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=Sa(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,d=t?` \xB7 exec_receipt ${Tn(t)}`:"";return{kind:e.kind,label:i,title:`${c}${d}`}}function pc(e,t){let n=ao(e,t);return n?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Uf(e){if(!e)return null;let t=Sa(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Tn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Wf(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Bn(n,"route")){let i=r.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&Bn(n,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Bn(n,"pr")){let i=r.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=pc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Tn(i)}`}
        >${`exec ${i.kind==="delegated"?oo(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of ic(e.labels,n))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Bn(n,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Bn(n,"blocked")&&s.push(...Bf(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Bn(n,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function zf(e){let t=sn(e.created_at),n=sn(e.updated_at);return!t&&!n?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Gt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?l`<span class="board-card__time-sep">·</span>`:""}
    ${n?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Gt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function Hf(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return ro(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:zf(e),empty_label:"children \uC5C6\uC74C",childChips:Ea,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function Ea(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return ao(t,n)?l`<span class="board-card__roll-child-chips">
    ${pc(t,n)}
    ${Uf(n)}
  </span>`:null}function io(e,t){let n=jf(e.priority);return l`
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
        ${n?l`<span class="board-card__pri">${n}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Wf(e,t)}
      ${e.workflow&&Bn(t.policy||null,"stepper")?so(e.workflow,e.status):""}
      ${Hf(e,t)}
    </article>
  `}function Tr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return l`
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
        ${r?l`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${jn.map(o=>l`<option
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
        ${e.items.map(o=>io(o,t))}
      </div>
    </section>
  `}function fc(e,t,n){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>io(r,t))}
        </div>
      </div>
    </dialog>
  `}var Gf=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Vf=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Kf=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Yf(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return l`
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
      ${n.label_menu_open?l`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?l`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(o=>l`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${r>0?l`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function _c(e,t,n){return l`
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
        ${Gf.map(r=>l`<option
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
        ${Vf.map(r=>l`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Yf(e,t,n)}
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
        ${Kf.map(r=>l`<option
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
  `}var Zf=200,Qf={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Xf=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),mc="beads-ui.board.sort",gc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Jf(){try{let e=window.localStorage.getItem(mc);if(e&&gc.has(e))return e}catch{}return"created_desc"}function hc(e,t){let n=Et("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,f=t.closedRange||rn,g=s?Qs(s,a):null,w=to({transport:o,uiOrderStore:a}),A=[],D=[],W=[],V=[],Y=[],N=[],M=!1,q=0,U=Jf(),E=new Map,R=new Map,X=new Map,ve=new Set,he={search:"",priority:"",type:"",labels:[]},ne=!1,Z=null;function Re(G){return String(G.status||"open")==="open"}function $e(G){let fe=String(G.status||"open");return fe==="open"||fe==="blocked"}function ie(G){let fe=he.search.trim().toLowerCase(),qe=he.priority,S=he.type,O=he.labels;return G.filter(k=>{if(fe){let L=String(k.id||"").toLowerCase(),oe=String(k.title||"").toLowerCase();if(!L.includes(fe)&&!oe.includes(fe))return!1}if(qe!==""&&String(k.priority)!==qe||S!==""&&String(k.issue_type||"")!==S)return!1;if(O.length>0){let L=Array.isArray(k.labels)?k.labels:[];if(!O.some(oe=>L.includes(oe)))return!1}return!0})}function ae(){let G=new Set;for(let fe of[A,D,W,V,Y,N])for(let qe of fe){let S=Array.isArray(qe.labels)?qe.labels:[];for(let O of S)typeof O=="string"&&O.length>0&&G.add(O)}return Array.from(G).sort()}function xe(){return he.search.trim()!==""||he.priority!==""||he.type!==""||he.labels.length>0}function B(){try{if(g){let G=g.selectBoardColumn("tab:board:in-progress","in_progress",U),fe=g.selectBoardColumn("tab:board:blocked","blocked",U).filter($e),qe=new Set(G.map(be=>be.id)),S=g.selectBoardColumn("tab:board:ready","ready",U).filter(be=>Re(be)&&!qe.has(be.id)),O=g.selectBoardColumn("tab:board:resolved","resolved",U),k=g.selectBoardColumn("tab:board:deferred","deferred",U),L=g.selectBoardColumn("tab:board:closed","closed").slice(0,Zf),oe=[...fe,...S,...G,...O,...L];J(oe);let de=new Set;for(let be of oe)be&&be.id&&!Xs(be)&&de.add(be.id);let re=!xe();A=re?Xr(fe,de):fe,D=re?Xr(S,de):S,W=re?Xr(G,de):G,V=re?Xr(O,de):O,Y=k,q=k.length,N=re?Xr(L,de):L,E=new Map;for(let be of A)E.set(be.id,"open");for(let be of D)E.set(be.id,"open");for(let be of W)E.set(be.id,"in_progress");for(let be of V)E.set(be.id,"resolved");for(let be of Y)E.set(be.id,"deferred");for(let be of N)E.set(be.id,"closed");R=new Map;for(let be of A)R.set(be.id,"blocked-col");for(let be of D)R.set(be.id,"ready-col");for(let be of W)R.set(be.id,"in-progress-col");for(let be of V)R.set(be.id,"resolved-col");for(let be of N)R.set(be.id,"closed-col")}Je()}catch{A=[],D=[],W=[],V=[],Y=[],N=[],X=new Map,Je()}}function J(G){X=Js(G)}function le(G){return eo(X,G)}function Ae(G){return!ve.has(G)}function Se(G,fe){G.preventDefault(),G.stopPropagation(),ve.has(fe)?ve.delete(fe):ve.add(fe),Je()}function Oe(G,fe){G.preventDefault(),G.stopPropagation(),r(fe)}function ge(G,fe){G.preventDefault(),G.stopPropagation(),r(fe)}function it(G,fe){Z||r(fe)}function _t(G,fe){G.preventDefault(),G.stopPropagation(),e_(fe).then(qe=>{qe&&ue("\uBCF5\uC0AC\uB428","success",1200)})}function C(G,fe){Z=fe,G.dataTransfer&&(G.dataTransfer.setData("text/plain",fe),G.dataTransfer.effectAllowed="move"),G.target.classList.add("board-card--dragging")}function me(G){G.target.classList.remove("board-card--dragging"),gt(),setTimeout(()=>{Z=null},0)}function ke(G){let fe=String(G.target.value||"");!fe||fe===f||(f=fe,d&&d(fe),Je())}function Le(){return i?i.get():null}function Me(G){let fe=c?c.get():null,qe=fe?fe.cleanup_failed:null;if(!qe||typeof qe!="object"||Array.isArray(qe))return null;let S=qe[G];return!S||typeof S!="object"||Array.isArray(S)?null:S}let Be={onCardClick:it,onCopyId:_t,onDragStart:C,onDragEnd:me,onClosedRangeChange:ke,rollupFor:le,isExpanded:Ae,onRollupToggle:Se,onChildClick:Oe,onFromChipClick:ge,cleanupFailureFor:Me,get policy(){return Le()}};function z(G,fe){Z||(Q(),r(fe))}function K(G,fe){G.preventDefault(),G.stopPropagation(),Q(),r(fe)}let De={...Be,onCardClick:z,onChildClick:K,onFromChipClick:K,get policy(){return Le()}};function Qe(G){let fe=G.target,qe=e.querySelector(".board-filter__labels");fe&&qe&&qe.contains(fe)||P()}function We(G){G.key==="Escape"&&P()}function we(){ne||(ne=!0,document.addEventListener("mousedown",Qe),document.addEventListener("keydown",We),Je())}function P(){ne&&(ne=!1,document.removeEventListener("mousedown",Qe),document.removeEventListener("keydown",We),Je())}function H(G){G.key==="Escape"&&Q()}function ee(){M||(M=!0,document.addEventListener("keydown",H),Je())}function Q(){M&&(M=!1,document.removeEventListener("keydown",H),Je())}let Pe={onClose:Q,onOverlayClick(G){G.target===G.currentTarget&&Q()}},tt={onSearchInput(G){he.search=String(G.target.value||""),B()},onPriorityChange(G){he.priority=String(G.target.value||""),B()},onTypeChange(G){he.type=String(G.target.value||""),B()},onSortChange(G){let fe=String(G.target.value||"");if(!(!gc.has(fe)||fe===U)){U=fe;try{window.localStorage.setItem(mc,fe)}catch{}B()}},onDeferredToggle(){M?Q():ee()},onLabelMenuToggle(){ne?P():we()},onLabelToggle(G){let fe=he.labels.indexOf(G);fe===-1?he.labels.push(G):he.labels.splice(fe,1),B()},onLabelClear(){he.labels.length!==0&&(he.labels=[],B())},onNewIssue(){p&&p()}};function st(){return l`
      <div class="board-view">
        ${_c(he,tt,{sort_mode:U,deferred_popup_open:M,deferred_count:q,label_options:ae(),label_menu_open:ne})}
        <div class="board-root">
          ${Tr({title:"Blocked",id:"blocked-col",items:ie(A)},Be)}
          ${Tr({title:"Ready",id:"ready-col",items:ie(D)},Be)}
          ${Tr({title:"In progress",id:"in-progress-col",items:ie(W)},Be)}
          ${Tr({title:"Resolved",id:"resolved-col",items:ie(V)},Be)}
          ${Tr({title:"Closed",id:"closed-col",items:ie(N),is_closed:!0,closed_range:f},Be)}
        </div>
        ${M?fc({items:ie(Y),count:q},De,Pe):""}
      </div>
    `}function Je(){Ze(st(),e),vt()}function vt(){try{let G=e.querySelector("#deferred-popup");G&&!G.open&&(typeof G.showModal=="function"?G.showModal():G.setAttribute("open",""));let fe=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let qe of fe)Array.from(qe.querySelectorAll(".board-card")).forEach((O,k)=>{O.tabIndex=k===0?0:-1})}catch{}}async function mt(G,fe){if(!o){ue("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:G,status:fe}),ue("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(qe){n("update-status failed: %o",qe),ue("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ot(G){switch(G){case"blocked-col":return A;case"ready-col":return D;case"in-progress-col":return W;case"resolved-col":return V;default:return[]}}function ut(G,fe,qe){if(!o||!a)return;let S=ot(G),O=S.find(re=>re.id===fe);if(!O)return;let k=S.filter(re=>re.id!==fe),L=qe.closest?qe.closest(".board-card"):null,oe=k.length;if(L){let re=L.getAttribute("data-issue-id");if(re===fe)return;let be=k.findIndex(ct=>ct.id===re);be>=0&&(oe=be)}let de=k.slice();de.splice(oe,0,O),w.applyReorder(fe,de,oe)}function gt(){for(let G of Array.from(e.querySelectorAll(".board-column--drag-over")))G.classList.remove("board-column--drag-over")}let Ve=null;e.addEventListener("dragover",G=>{G.preventDefault(),G.dataTransfer&&(G.dataTransfer.dropEffect="move");let qe=G.target.closest(".board-column");qe&&qe!==Ve&&(Ve&&Ve.classList.remove("board-column--drag-over"),qe.classList.add("board-column--drag-over"),Ve=qe)}),e.addEventListener("dragleave",G=>{let fe=G.relatedTarget;(!fe||!e.contains(fe))&&Ve&&(Ve.classList.remove("board-column--drag-over"),Ve=null)}),e.addEventListener("drop",G=>{G.preventDefault(),Ve&&(Ve.classList.remove("board-column--drag-over"),Ve=null);let fe=G.target,qe=fe.closest(".board-column");if(!qe)return;let S=G.dataTransfer?.getData("text/plain")||"";if(!S)return;let O=qe.id,k=R.get(S);if(k&&k===O){if(Xf.has(O)){if(U!=="manual"){ue("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ut(O,S,fe)}return}let L=Qf[O];if(!L){ue("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}E.get(S)!==L&&mt(S,L)}),e.addEventListener("keydown",G=>{let fe=G.target;if(!(fe instanceof HTMLElement))return;let qe=String(fe.tagName||"").toLowerCase();if(qe==="input"||qe==="textarea"||qe==="select"||qe==="button"||qe==="a"||fe.isContentEditable===!0)return;let S=fe.closest(".board-card");if(!S)return;let O=String(G.key||"");if(O==="Enter"||O===" "){G.preventDefault();let de=S.getAttribute("data-issue-id");de&&r(de);return}if(O!=="ArrowUp"&&O!=="ArrowDown"&&O!=="ArrowLeft"&&O!=="ArrowRight")return;G.preventDefault();let k=S.closest(".board-column");if(!k)return;let L=Array.from(k.querySelectorAll(".board-card")),oe=L.indexOf(S);if(O==="ArrowDown"&&oe<L.length-1){Ne(S,L[oe+1]);return}if(O==="ArrowUp"&&oe>0){Ne(S,L[oe-1]);return}if(O==="ArrowLeft"||O==="ArrowRight"){let de=Array.from(e.querySelectorAll(".board-column")),re=de.indexOf(k),be=O==="ArrowRight"?1:-1,ct=re+be;for(;ct>=0&&ct<de.length;){let Xe=de[ct].querySelector(".board-card");if(Xe){Ne(S,Xe);return}ct+=be}}});function Ne(G,fe){try{G.tabIndex=-1,fe.tabIndex=0,fe.focus()}catch{}}let He=null;g&&g.subscribe&&(He=g.subscribe(()=>{try{B()}catch{}}));let wt=null;i&&i.subscribe&&(wt=i.subscribe(()=>{try{B()}catch{}}));let lt=null;return c&&c.subscribe&&(lt=c.subscribe(()=>{Je()})),{async load(){n("load"),B()},clear(){P(),Q(),He&&(He(),He=null),wt&&(wt(),wt=null),lt&&(lt(),lt=null),e.replaceChildren(),A=[],D=[],W=[],V=[],Y=[],N=[],E=new Map,R=new Map}}}function Xr(e,t){return e.filter(n=>{let r=Xs(n);return!(r&&t.has(r))})}async function e_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function on(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function ir(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Jr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function t_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${ir(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ir(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(c=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),c(p)};r.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Cn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await t_(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var n_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],bc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},r_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Pt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Tt(e){return typeof e=="string"&&e.length>0?e:null}function Cr(e){return e.startsWith("gpt-")?e.slice(4):e}function xt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function vc(e,t,n){let r=Tt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Tt(n[e]);return s===null?null:{value:s,source:"global"}}function es(e,t,n,r){return vc(e,t,n)||{value:r,source:"base"}}function Ta(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&Pt(s?.[t])){let a=Tt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Pt(s)){for(let a of Object.values(s))if(Pt(a)){let i=Tt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Tt(r?.runners?.[o]?.models?.[e]?.id)||e}function s_(e,t){return Tt(t?.review?.reviewers?.[e]?.model)||e}function Rr(e,t,n=!1){if(e==="default")return xt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Cr(e):e;return xt(e,t,r,e,"explicit")}function wc(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];Pt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(Pt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function o_(e,t){let n=[],r=e?.implementation?.model_catalog;Pt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(Pt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function a_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of o_(t,n)){let o=wc(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function Ca(e){return xt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function yc(e,t,n){let r=vc(e,t,n);return r?Rr(r.value,r.source):xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function en(e){let t=Pt(e.pin)?e.pin:{},n=Pt(e.global)?e.global:{},r=Pt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&Pt(r.session)?r.session:null,o=r?.supported===!0&&Pt(r.orchestration)?r.orchestration:null,a=Pt(e.runner_catalog)?e.runner_catalog:null,i=Tt(n.quick_fix_impl_model),c=a_(i,s,a),d={};if(s){let p=es("workflow_mode",t,n,Tt(s.workflow_mode_default));d.workflow_mode=p.source==="base"?xt(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):Rr(p.value,p.source);for(let N of["spec_review","plan_review","impl_review"]){let M=`${N}_model`,q=Tt(N==="plan_review"?p.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),U=es(M,t,n,q);if(U.value===null)d[M]=xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(U.value!=="self"&&U.value!=="skip"&&!Pt(s.review?.reviewers?.[U.value]))d[M]=Ca(xt(U.value,U.source,"",null,"explicit"));else{let E=s_(U.value,s);d[M]=xt(U.value,U.source,Cr(E),E,U.source==="base"?"default":"explicit")}}for(let[N,M]of Object.entries(bc)){let q=d[M].value;if(q==="self"||q==="skip"){d[N]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let U=Tt(s.review?.reviewers?.[q||""]?.effort),E=es(N,t,n,U);d[N]=E.value===null?xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):xt(E.value,E.source,E.value,E.value,E.source==="base"?"default":"explicit")}let f=Pt(s.implementation?.default)?s.implementation.default:{},g=Tt(e.route),w=g!==null&&["quick_fix","spec_backed","full_plan"].includes(g),A=Pt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},D=w&&Pt(A[g])?A[g]:{};for(let N of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let M=es(N,t,n,N==="impl_dispatch"?Tt(D.dispatch)||Tt(f.dispatch):Tt(f[N.replace("impl_","")]));d[N]=M.value===null?xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):xt(M.value,M.source,M.value,M.value,M.source==="base"?"default":"explicit")}let W=Tt(t.impl_runtime),V=W==="inherit"?Tt(e.controller_runtime):W,Y=g==="quick_fix"&&Tt(t.impl_dispatch)===null&&c.runtime!==null&&(W===null||V===c.runtime);if(Y){let N=c.runtime,M=i;d.impl_dispatch=xt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),W===null&&(d.impl_runtime=xt(N,"global",`${N} (\uC720\uB3C4)`,N,"explicit")),Tt(t.impl_model)===null&&(d.impl_model=xt(M,"global",M,M,"explicit"))}if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let N of["impl_runtime","impl_model","impl_effort","impl_speed"])d[N]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(d.impl_dispatch.value==="delegated"&&!Y&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_model.value!==null){let N=d.impl_runtime.value==="inherit"?Tt(e.controller_runtime):d.impl_runtime.value,M=N?wc(N,s,a):[];if(d.impl_model.value!=="auto"&&M.length>0&&!M.includes(d.impl_model.value))d.impl_model=Ca(d.impl_model);else{let q=Ta(d.impl_model.value,N,s,a);d.impl_model.display=Cr(q),d.impl_model.full_value=q}}if(d.impl_effort.value==="auto"){let N=Tt(e.transport)||(d.impl_runtime.value==="codex"?"codex-native-spawn":d.impl_runtime.value==="claude"?"implement-claude":null),M=N?Tt(s.implementation?.effort_by_transport?.[N]?.auto):null;M&&!r_.has(M)?(d.impl_effort.display=`${M} (\uBE44\uD638\uD658)`,d.impl_effort.full_value=M,d.impl_effort.resolution="incompatible"):(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}d.impl_speed.value==="default"&&(d.impl_speed=d.impl_speed.source==="base"?xt("default","base","default (\uC77C\uBC18)","default","default"):Rr("default",d.impl_speed.source))}}else for(let p of n_.filter(f=>!f.startsWith("orchestration_")))d[p]=yc(p,t,n);if(!s){for(let[p,f]of Object.entries(bc))(d[f].value==="self"||d[f].value==="skip")&&(d[p]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])d[p]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else d.impl_dispatch.value==="delegated"&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_effort.value==="auto"&&(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){d[p]=yc(p,t,n);continue}let f=p.replace("orchestration_",""),g=Tt(o[f]),w=es(p,t,n,g);if(p==="orchestration_effort"&&w.source==="base"){d[p]=xt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(w.value===null){d[p]=xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let A=w.source==="base"?Tt(o.model_id)||w.value:Ta(w.value,null,s,a);d[p]=xt(w.value,w.source,Cr(A),A,w.source==="base"?"default":"explicit");continue}if(w.value==="default"){d[p]=w.source==="base"?xt("default","base","default (\uC77C\uBC18)","default","default"):Rr("default",w.source);continue}d[p]=Rr(w.value,w.source)}if(s)if(i===null){let p=d.orchestration_model.full_value;d.quick_fix_impl_model=xt(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Cr(p)})`,null,"default")}else if(c.runtime!==null){let p=Ta(i,c.runtime,s,a);d.quick_fix_impl_model=xt(i,"global",Cr(p),p,"explicit")}else c.offered?d.quick_fix_impl_model=Ca(xt(i,"global","",null,"explicit")):d.quick_fix_impl_model=Rr(i,"global");return d}function i_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function lo(e){let t=Pt(e.pin)?e.pin:{},n=Pt(e.global)?e.global:{},r=Pt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=f=>{let g={...r,...f};return en({pin:e.layer==="pin"?g:t,global:e.layer==="pin"?n:g,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],c=s(o)[e.key],d=Tt(o[e.key]),p=[...e.choices];return d!==null&&!p.includes(d)&&p.unshift(d),{unset_label:i_(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:p.map(f=>{let g=s({...o,[e.key]:f})[e.key];return{value:f,label:g.display,full_value:g.full_value}})}}function Lr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let c=!1,d=f=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(f))},p=()=>d(r.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>d(null)),r.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),p())}),t.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}var Sc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function qt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Rn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],ts=[...Rn,"reasoning_output_tokens"],l_={codex:["implementation","review-consult"],claude:["subagent"]};function Ra(e){let t=0;for(let n of Rn)t+=qt(e?.[n]);return t}function c_(e){return!e||typeof e!="object"?!1:Rn.some(t=>Number.isFinite(e[t]))}function kc(e){return!e||typeof e!="object"?!1:ts.some(t=>Number.isFinite(e[t]))}function u_(e){let t={};for(let n of ts)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function $c(e){let t={};for(let n of ts)Number.isFinite(e[n])&&(t[n]=e[n]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function xc(e,t){return e==="codex"?qt(t.input_tokens)+qt(t.output_tokens):Ra(t)}function d_(e){return e==="claude"?"Claude":"Codex"}function p_(e){return`\u03C4 ${Ec(e)}`}function f_(e,t){let n=t.breakdown||{},r=[`\uC785\uB825 ${qt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${qt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?r.push(`\uCE90\uC2DC\uC77D\uAE30 ${qt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${qt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(r.push(`\uCE90\uC2DC\uC77D\uAE30 ${qt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${qt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&r.push(`\uCD94\uB860\uCD9C\uB825 ${qt(n.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,r.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Sc),o.join(`
`)}function Bt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${d_(n)} ${p_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:f_(n,r)})}return t}function uo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of ts)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=qt(i.breakdown[c])+qt(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function La(e){return!e||typeof e!="object"?null:dn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function __(e){return e==="codex"?"codex":"claude"}function xn(){return{subtotal:0,breakdown:u_(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function co(e,t,n){e.subtotal+=t.subtotal;for(let r of ts)Number.isFinite(t.usage[r])&&(e.breakdown[r]=qt(e.breakdown[r])+qt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Ac(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Ec(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Ir(e){return c_(e)?`\u03C4 ${Ec(Ra(e))}`:null}function Ln(e){let t=Ir(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ns(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${qt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${qt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${qt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${qt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Ra(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Sc),n.join(`
`)}function dn(e,t){let n={claude:xn(),codex:xn()},r={orchestrator:{claude:xn(),codex:xn()},implementation:{claude:xn(),codex:xn()},"review-consult":{claude:xn(),codex:xn()},subagent:{claude:xn(),codex:xn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(kc(c)){let p=__(i.runner),f=$c(c),g={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:f,subtotal:xc(p,f)};f.replayed===!0&&(g.replayed=!0),typeof i.model=="string"&&(g.model=i.model),typeof i.session_id=="string"&&(g.session_id=i.session_id),co(n[p],g,!0),co(r.orchestrator[p],g,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of d){let f=p&&p.provider==="claude"?"claude":"codex";if(!p||p.provider!=="codex"&&p.provider!=="claude"||!l_[f].includes(p.role)||!kc(p.usage))continue;let g=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!g||s.has(g))continue;s.add(g);let w=$c(p.usage),A={provider:f,role:p.role,attempt_id:String(i.attempt_id||""),usage:w,subtotal:xc(f,w)};A.receipt_id=g,typeof p.agent_type=="string"&&(A.agent_type=p.agent_type),typeof p.agent_id=="string"&&(A.agent_id=p.agent_id),typeof p.model=="string"&&(A.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(A.effort=p.effort),typeof p.session_id=="string"?A.session_id=p.session_id:typeof p.thread_id=="string"&&(A.session_id=p.thread_id),typeof p.turn_id=="string"&&(A.turn_id=p.turn_id),(typeof p.completed_at=="string"||typeof p.completed_at=="number"&&Number.isFinite(p.completed_at))&&(A.completed_at=p.completed_at),w.replayed===!0&&(A.replayed=!0),co(n[f],A,!1),co(r[A.role][f],A,!1)}}let o={};for(let i of["claude","codex"]){let c=n[i];if(c.legs.length===0)continue;let d=Ac(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(d.total_cost_usd=c.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let c={};for(let d of["claude","codex"]){let p=r[i][d];p.legs.length>0&&(c[d]={...Ac(p,!0),legs:p.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:Dc,setPrototypeOf:Tc,isFrozen:m_,getPrototypeOf:g_,getOwnPropertyDescriptor:h_}=Object,{freeze:Kt,seal:pn,create:qa}=Object,{apply:Fa,construct:ja}=typeof Reflect<"u"&&Reflect;Kt||(Kt=function(t){return t});pn||(pn=function(t){return t});Fa||(Fa=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});ja||(ja=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var po=Yt(Array.prototype.forEach),b_=Yt(Array.prototype.lastIndexOf),Cc=Yt(Array.prototype.pop),rs=Yt(Array.prototype.push),y_=Yt(Array.prototype.splice),_o=Yt(String.prototype.toLowerCase),Ia=Yt(String.prototype.toString),Oa=Yt(String.prototype.match),ss=Yt(String.prototype.replace),v_=Yt(String.prototype.indexOf),w_=Yt(String.prototype.trim),hn=Yt(Object.prototype.hasOwnProperty),Vt=Yt(RegExp.prototype.test),os=k_(TypeError);function Yt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Fa(e,t,r)}}function k_(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return ja(e,n)}}function nt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:_o;Tc&&Tc(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(m_(t)||(t[r]=o),s=o)}e[s]=!0}return e}function $_(e){for(let t=0;t<e.length;t++)hn(e,t)||(e[t]=null);return e}function In(e){let t=qa(null);for(let[n,r]of Dc(e))hn(e,n)&&(Array.isArray(r)?t[n]=$_(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=In(r):t[n]=r);return t}function as(e,t){for(;e!==null;){let r=h_(e,t);if(r){if(r.get)return Yt(r.get);if(typeof r.value=="function")return Yt(r.value)}e=g_(e)}function n(){return null}return n}var Rc=Kt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Pa=Kt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ma=Kt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),x_=Kt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Da=Kt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),A_=Kt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Lc=Kt(["#text"]),Ic=Kt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Na=Kt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Oc=Kt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),fo=Kt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),S_=pn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),E_=pn(/<%[\w\W]*|[\w\W]*%>/gm),T_=pn(/\$\{[\w\W]*/gm),C_=pn(/^data-[\-\w.\u00B7-\uFFFF]+$/),R_=pn(/^aria-[\-\w]+$/),Nc=pn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),L_=pn(/^(?:\w+script|data):/i),I_=pn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),qc=pn(/^html$/i),O_=pn(/^[a-z][.\w]*(-[.\w]+)+$/i),Pc=Object.freeze({__proto__:null,ARIA_ATTR:R_,ATTR_WHITESPACE:I_,CUSTOM_ELEMENT:O_,DATA_ATTR:C_,DOCTYPE_NAME:qc,ERB_EXPR:E_,IS_ALLOWED_URI:Nc,IS_SCRIPT_OR_DATA:L_,MUSTACHE_EXPR:S_,TMPLIT_EXPR:T_}),is={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},P_=function(){return typeof window>"u"?null:window},M_=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Mc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Fc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:P_(),t=Fe=>Fc(Fe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==is.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:w}=e,A=c.prototype,D=as(A,"cloneNode"),W=as(A,"remove"),V=as(A,"nextSibling"),Y=as(A,"childNodes"),N=as(A,"parentNode");if(typeof a=="function"){let Fe=n.createElement("template");Fe.content&&Fe.content.ownerDocument&&(n=Fe.content.ownerDocument)}let M,q="",{implementation:U,createNodeIterator:E,createDocumentFragment:R,getElementsByTagName:X}=n,{importNode:ve}=r,he=Mc();t.isSupported=typeof Dc=="function"&&typeof N=="function"&&U&&U.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ne,ERB_EXPR:Z,TMPLIT_EXPR:Re,DATA_ATTR:$e,ARIA_ATTR:ie,IS_SCRIPT_OR_DATA:ae,ATTR_WHITESPACE:xe,CUSTOM_ELEMENT:B}=Pc,{IS_ALLOWED_URI:J}=Pc,le=null,Ae=nt({},[...Rc,...Pa,...Ma,...Da,...Lc]),Se=null,Oe=nt({},[...Ic,...Na,...Oc,...fo]),ge=Object.seal(qa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),it=null,_t=null,C=Object.seal(qa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),me=!0,ke=!0,Le=!1,Me=!0,Be=!1,z=!0,K=!1,De=!1,Qe=!1,We=!1,we=!1,P=!1,H=!0,ee=!1,Q="user-content-",Pe=!0,tt=!1,st={},Je=null,vt=nt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),mt=null,ot=nt({},["audio","video","img","source","image","track"]),ut=null,gt=nt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ve="http://www.w3.org/1998/Math/MathML",Ne="http://www.w3.org/2000/svg",He="http://www.w3.org/1999/xhtml",wt=He,lt=!1,G=null,fe=nt({},[Ve,Ne,He],Ia),qe=nt({},["mi","mo","mn","ms","mtext"]),S=nt({},["annotation-xml"]),O=nt({},["title","style","font","a","script"]),k=null,L=["application/xhtml+xml","text/html"],oe="text/html",de=null,re=null,be=n.createElement("form"),ct=function(T){return T instanceof RegExp||T instanceof Function},Xe=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(re&&re===T)){if((!T||typeof T!="object")&&(T={}),T=In(T),k=L.indexOf(T.PARSER_MEDIA_TYPE)===-1?oe:T.PARSER_MEDIA_TYPE,de=k==="application/xhtml+xml"?Ia:_o,le=hn(T,"ALLOWED_TAGS")?nt({},T.ALLOWED_TAGS,de):Ae,Se=hn(T,"ALLOWED_ATTR")?nt({},T.ALLOWED_ATTR,de):Oe,G=hn(T,"ALLOWED_NAMESPACES")?nt({},T.ALLOWED_NAMESPACES,Ia):fe,ut=hn(T,"ADD_URI_SAFE_ATTR")?nt(In(gt),T.ADD_URI_SAFE_ATTR,de):gt,mt=hn(T,"ADD_DATA_URI_TAGS")?nt(In(ot),T.ADD_DATA_URI_TAGS,de):ot,Je=hn(T,"FORBID_CONTENTS")?nt({},T.FORBID_CONTENTS,de):vt,it=hn(T,"FORBID_TAGS")?nt({},T.FORBID_TAGS,de):In({}),_t=hn(T,"FORBID_ATTR")?nt({},T.FORBID_ATTR,de):In({}),st=hn(T,"USE_PROFILES")?T.USE_PROFILES:!1,me=T.ALLOW_ARIA_ATTR!==!1,ke=T.ALLOW_DATA_ATTR!==!1,Le=T.ALLOW_UNKNOWN_PROTOCOLS||!1,Me=T.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Be=T.SAFE_FOR_TEMPLATES||!1,z=T.SAFE_FOR_XML!==!1,K=T.WHOLE_DOCUMENT||!1,We=T.RETURN_DOM||!1,we=T.RETURN_DOM_FRAGMENT||!1,P=T.RETURN_TRUSTED_TYPE||!1,Qe=T.FORCE_BODY||!1,H=T.SANITIZE_DOM!==!1,ee=T.SANITIZE_NAMED_PROPS||!1,Pe=T.KEEP_CONTENT!==!1,tt=T.IN_PLACE||!1,J=T.ALLOWED_URI_REGEXP||Nc,wt=T.NAMESPACE||He,qe=T.MATHML_TEXT_INTEGRATION_POINTS||qe,S=T.HTML_INTEGRATION_POINTS||S,ge=T.CUSTOM_ELEMENT_HANDLING||{},T.CUSTOM_ELEMENT_HANDLING&&ct(T.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ge.tagNameCheck=T.CUSTOM_ELEMENT_HANDLING.tagNameCheck),T.CUSTOM_ELEMENT_HANDLING&&ct(T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ge.attributeNameCheck=T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),T.CUSTOM_ELEMENT_HANDLING&&typeof T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ge.allowCustomizedBuiltInElements=T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Be&&(ke=!1),we&&(We=!0),st&&(le=nt({},Lc),Se=[],st.html===!0&&(nt(le,Rc),nt(Se,Ic)),st.svg===!0&&(nt(le,Pa),nt(Se,Na),nt(Se,fo)),st.svgFilters===!0&&(nt(le,Ma),nt(Se,Na),nt(Se,fo)),st.mathMl===!0&&(nt(le,Da),nt(Se,Oc),nt(Se,fo))),T.ADD_TAGS&&(typeof T.ADD_TAGS=="function"?C.tagCheck=T.ADD_TAGS:(le===Ae&&(le=In(le)),nt(le,T.ADD_TAGS,de))),T.ADD_ATTR&&(typeof T.ADD_ATTR=="function"?C.attributeCheck=T.ADD_ATTR:(Se===Oe&&(Se=In(Se)),nt(Se,T.ADD_ATTR,de))),T.ADD_URI_SAFE_ATTR&&nt(ut,T.ADD_URI_SAFE_ATTR,de),T.FORBID_CONTENTS&&(Je===vt&&(Je=In(Je)),nt(Je,T.FORBID_CONTENTS,de)),Pe&&(le["#text"]=!0),K&&nt(le,["html","head","body"]),le.table&&(nt(le,["tbody"]),delete it.tbody),T.TRUSTED_TYPES_POLICY){if(typeof T.TRUSTED_TYPES_POLICY.createHTML!="function")throw os('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof T.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw os('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=T.TRUSTED_TYPES_POLICY,q=M.createHTML("")}else M===void 0&&(M=M_(w,s)),M!==null&&typeof q=="string"&&(q=M.createHTML(""));Kt&&Kt(T),re=T}},Ye=nt({},[...Pa,...Ma,...x_]),bt=nt({},[...Da,...A_]),St=function(T){let _e=N(T);(!_e||!_e.tagName)&&(_e={namespaceURI:wt,tagName:"template"});let Ce=_o(T.tagName),at=_o(_e.tagName);return G[T.namespaceURI]?T.namespaceURI===Ne?_e.namespaceURI===He?Ce==="svg":_e.namespaceURI===Ve?Ce==="svg"&&(at==="annotation-xml"||qe[at]):!!Ye[Ce]:T.namespaceURI===Ve?_e.namespaceURI===He?Ce==="math":_e.namespaceURI===Ne?Ce==="math"&&S[at]:!!bt[Ce]:T.namespaceURI===He?_e.namespaceURI===Ne&&!S[at]||_e.namespaceURI===Ve&&!qe[at]?!1:!bt[Ce]&&(O[Ce]||!Ye[Ce]):!!(k==="application/xhtml+xml"&&G[T.namespaceURI]):!1},yt=function(T){rs(t.removed,{element:T});try{N(T).removeChild(T)}catch{W(T)}},Ct=function(T,_e){try{rs(t.removed,{attribute:_e.getAttributeNode(T),from:_e})}catch{rs(t.removed,{attribute:null,from:_e})}if(_e.removeAttribute(T),T==="is")if(We||we)try{yt(_e)}catch{}else try{_e.setAttribute(T,"")}catch{}},zt=function(T){let _e=null,Ce=null;if(Qe)T="<remove></remove>"+T;else{let b=Oa(T,/^[\r\n\t ]+/);Ce=b&&b[0]}k==="application/xhtml+xml"&&wt===He&&(T='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+T+"</body></html>");let at=M?M.createHTML(T):T;if(wt===He)try{_e=new g().parseFromString(at,k)}catch{}if(!_e||!_e.documentElement){_e=U.createDocument(wt,"template",null);try{_e.documentElement.innerHTML=lt?q:at}catch{}}let Rt=_e.body||_e.documentElement;return T&&Ce&&Rt.insertBefore(n.createTextNode(Ce),Rt.childNodes[0]||null),wt===He?X.call(_e,K?"html":"body")[0]:K?_e.documentElement:Rt},Nt=function(T){return E.call(T.ownerDocument||T,T,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Mt=function(T){return T instanceof f&&(typeof T.nodeName!="string"||typeof T.textContent!="string"||typeof T.removeChild!="function"||!(T.attributes instanceof p)||typeof T.removeAttribute!="function"||typeof T.setAttribute!="function"||typeof T.namespaceURI!="string"||typeof T.insertBefore!="function"||typeof T.hasChildNodes!="function")},Ft=function(T){return typeof i=="function"&&T instanceof i};function Lt(Fe,T,_e){po(Fe,Ce=>{Ce.call(t,T,_e,re)})}let Ue=function(T){let _e=null;if(Lt(he.beforeSanitizeElements,T,null),Mt(T))return yt(T),!0;let Ce=de(T.nodeName);if(Lt(he.uponSanitizeElement,T,{tagName:Ce,allowedTags:le}),z&&T.hasChildNodes()&&!Ft(T.firstElementChild)&&Vt(/<[/\w!]/g,T.innerHTML)&&Vt(/<[/\w!]/g,T.textContent)||T.nodeType===is.progressingInstruction||z&&T.nodeType===is.comment&&Vt(/<[/\w]/g,T.data))return yt(T),!0;if(!(C.tagCheck instanceof Function&&C.tagCheck(Ce))&&(!le[Ce]||it[Ce])){if(!it[Ce]&&Ht(Ce)&&(ge.tagNameCheck instanceof RegExp&&Vt(ge.tagNameCheck,Ce)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(Ce)))return!1;if(Pe&&!Je[Ce]){let at=N(T)||T.parentNode,Rt=Y(T)||T.childNodes;if(Rt&&at){let b=Rt.length;for(let h=b-1;h>=0;--h){let x=D(Rt[h],!0);x.__removalCount=(T.__removalCount||0)+1,at.insertBefore(x,V(T))}}}return yt(T),!0}return T instanceof c&&!St(T)||(Ce==="noscript"||Ce==="noembed"||Ce==="noframes")&&Vt(/<\/no(script|embed|frames)/i,T.innerHTML)?(yt(T),!0):(Be&&T.nodeType===is.text&&(_e=T.textContent,po([ne,Z,Re],at=>{_e=ss(_e,at," ")}),T.textContent!==_e&&(rs(t.removed,{element:T.cloneNode()}),T.textContent=_e)),Lt(he.afterSanitizeElements,T,null),!1)},Ut=function(T,_e,Ce){if(H&&(_e==="id"||_e==="name")&&(Ce in n||Ce in be))return!1;if(!(ke&&!_t[_e]&&Vt($e,_e))){if(!(me&&Vt(ie,_e))){if(!(C.attributeCheck instanceof Function&&C.attributeCheck(_e,T))){if(!Se[_e]||_t[_e]){if(!(Ht(T)&&(ge.tagNameCheck instanceof RegExp&&Vt(ge.tagNameCheck,T)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(T))&&(ge.attributeNameCheck instanceof RegExp&&Vt(ge.attributeNameCheck,_e)||ge.attributeNameCheck instanceof Function&&ge.attributeNameCheck(_e,T))||_e==="is"&&ge.allowCustomizedBuiltInElements&&(ge.tagNameCheck instanceof RegExp&&Vt(ge.tagNameCheck,Ce)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(Ce))))return!1}else if(!ut[_e]){if(!Vt(J,ss(Ce,xe,""))){if(!((_e==="src"||_e==="xlink:href"||_e==="href")&&T!=="script"&&v_(Ce,"data:")===0&&mt[T])){if(!(Le&&!Vt(ae,ss(Ce,xe,"")))){if(Ce)return!1}}}}}}}return!0},Ht=function(T){return T!=="annotation-xml"&&Oa(T,B)},et=function(T){Lt(he.beforeSanitizeAttributes,T,null);let{attributes:_e}=T;if(!_e||Mt(T))return;let Ce={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Se,forceKeepAttr:void 0},at=_e.length;for(;at--;){let Rt=_e[at],{name:b,namespaceURI:h,value:x}=Rt,I=de(b),te=x,y=b==="value"?te:w_(te);if(Ce.attrName=I,Ce.attrValue=y,Ce.keepAttr=!0,Ce.forceKeepAttr=void 0,Lt(he.uponSanitizeAttribute,T,Ce),y=Ce.attrValue,ee&&(I==="id"||I==="name")&&(Ct(b,T),y=Q+y),z&&Vt(/((--!?|])>)|<\/(style|title|textarea)/i,y)){Ct(b,T);continue}if(I==="attributename"&&Oa(y,"href")){Ct(b,T);continue}if(Ce.forceKeepAttr)continue;if(!Ce.keepAttr){Ct(b,T);continue}if(!Me&&Vt(/\/>/i,y)){Ct(b,T);continue}Be&&po([ne,Z,Re],ce=>{y=ss(y,ce," ")});let $=de(T.nodeName);if(!Ut($,I,y)){Ct(b,T);continue}if(M&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!h)switch(w.getAttributeType($,I)){case"TrustedHTML":{y=M.createHTML(y);break}case"TrustedScriptURL":{y=M.createScriptURL(y);break}}if(y!==te)try{h?T.setAttributeNS(h,b,y):T.setAttribute(b,y),Mt(T)?yt(T):Cc(t.removed)}catch{Ct(b,T)}}Lt(he.afterSanitizeAttributes,T,null)},Wt=function Fe(T){let _e=null,Ce=Nt(T);for(Lt(he.beforeSanitizeShadowDOM,T,null);_e=Ce.nextNode();)Lt(he.uponSanitizeShadowNode,_e,null),Ue(_e),et(_e),_e.content instanceof o&&Fe(_e.content);Lt(he.afterSanitizeShadowDOM,T,null)};return t.sanitize=function(Fe){let T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},_e=null,Ce=null,at=null,Rt=null;if(lt=!Fe,lt&&(Fe="<!-->"),typeof Fe!="string"&&!Ft(Fe))if(typeof Fe.toString=="function"){if(Fe=Fe.toString(),typeof Fe!="string")throw os("dirty is not a string, aborting")}else throw os("toString is not a function");if(!t.isSupported)return Fe;if(De||Xe(T),t.removed=[],typeof Fe=="string"&&(tt=!1),tt){if(Fe.nodeName){let x=de(Fe.nodeName);if(!le[x]||it[x])throw os("root node is forbidden and cannot be sanitized in-place")}}else if(Fe instanceof i)_e=zt("<!---->"),Ce=_e.ownerDocument.importNode(Fe,!0),Ce.nodeType===is.element&&Ce.nodeName==="BODY"||Ce.nodeName==="HTML"?_e=Ce:_e.appendChild(Ce);else{if(!We&&!Be&&!K&&Fe.indexOf("<")===-1)return M&&P?M.createHTML(Fe):Fe;if(_e=zt(Fe),!_e)return We?null:P?q:""}_e&&Qe&&yt(_e.firstChild);let b=Nt(tt?Fe:_e);for(;at=b.nextNode();)Ue(at),et(at),at.content instanceof o&&Wt(at.content);if(tt)return Fe;if(We){if(we)for(Rt=R.call(_e.ownerDocument);_e.firstChild;)Rt.appendChild(_e.firstChild);else Rt=_e;return(Se.shadowroot||Se.shadowrootmode)&&(Rt=ve.call(r,Rt,!0)),Rt}let h=K?_e.outerHTML:_e.innerHTML;return K&&le["!doctype"]&&_e.ownerDocument&&_e.ownerDocument.doctype&&_e.ownerDocument.doctype.name&&Vt(qc,_e.ownerDocument.doctype.name)&&(h="<!DOCTYPE "+_e.ownerDocument.doctype.name+`>
`+h),Be&&po([ne,Z,Re],x=>{h=ss(h,x," ")}),M&&P?M.createHTML(h):h},t.setConfig=function(){let Fe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Xe(Fe),De=!0},t.clearConfig=function(){re=null,De=!1},t.isValidAttribute=function(Fe,T,_e){re||Xe({});let Ce=de(Fe),at=de(T);return Ut(Ce,at,_e)},t.addHook=function(Fe,T){typeof T=="function"&&rs(he[Fe],T)},t.removeHook=function(Fe,T){if(T!==void 0){let _e=b_(he[Fe],T);return _e===-1?void 0:y_(he[Fe],_e,1)[0]}return Cc(he[Fe])},t.removeHooks=function(Fe){he[Fe]=[]},t.removeAllHooks=function(){he=Mc()},t}var jc=Fc();var On={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},mo=e=>(...t)=>({_$litDirective$:e,values:t}),Or=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var ls=class extends Or{constructor(t){if(super(t),this.it=It,t.type!==On.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===It||t==null)return this._t=void 0,this.it=t;if(t===cn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};ls.directiveName="unsafeHTML",ls.resultType=1;var Bc=mo(ls);function za(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var cr=za();function Kc(e){cr=e}var ps={exec:()=>null};function ft(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Zt.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var D_=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Zt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},N_=/^(?:[ \t]*(?:\n|$))+/,q_=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,F_=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,fs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,j_=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ha=/(?:[*+-]|\d{1,9}[.)])/,Yc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Zc=ft(Yc).replace(/bull/g,Ha).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),B_=ft(Yc).replace(/bull/g,Ha).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ga=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,U_=/^[^\n]+/,Va=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,W_=ft(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Va).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),z_=ft(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ha).getRegex(),wo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ka=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,H_=ft("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ka).replace("tag",wo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Qc=ft(Ga).replace("hr",fs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wo).getRegex(),G_=ft(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Qc).getRegex(),Ya={blockquote:G_,code:q_,def:W_,fences:F_,heading:j_,hr:fs,html:H_,lheading:Zc,list:z_,newline:N_,paragraph:Qc,table:ps,text:U_},Uc=ft("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",fs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wo).getRegex(),V_={...Ya,lheading:B_,table:Uc,paragraph:ft(Ga).replace("hr",fs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Uc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wo).getRegex()},K_={...Ya,html:ft(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ka).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ps,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ft(Ga).replace("hr",fs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Zc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Y_=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Z_=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Xc=/^( {2,}|\\)\n(?!\s*$)/,Q_=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ko=/[\p{P}\p{S}]/u,Za=/[\s\p{P}\p{S}]/u,Jc=/[^\s\p{P}\p{S}]/u,X_=ft(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Za).getRegex(),eu=/(?!~)[\p{P}\p{S}]/u,J_=/(?!~)[\s\p{P}\p{S}]/u,em=/(?:[^\s\p{P}\p{S}]|~)/u,tm=ft(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",D_?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),tu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,nm=ft(tu,"u").replace(/punct/g,ko).getRegex(),rm=ft(tu,"u").replace(/punct/g,eu).getRegex(),nu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",sm=ft(nu,"gu").replace(/notPunctSpace/g,Jc).replace(/punctSpace/g,Za).replace(/punct/g,ko).getRegex(),om=ft(nu,"gu").replace(/notPunctSpace/g,em).replace(/punctSpace/g,J_).replace(/punct/g,eu).getRegex(),am=ft("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Jc).replace(/punctSpace/g,Za).replace(/punct/g,ko).getRegex(),im=ft(/\\(punct)/,"gu").replace(/punct/g,ko).getRegex(),lm=ft(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),cm=ft(Ka).replace("(?:-->|$)","-->").getRegex(),um=ft("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",cm).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),bo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,dm=ft(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",bo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ru=ft(/^!?\[(label)\]\[(ref)\]/).replace("label",bo).replace("ref",Va).getRegex(),su=ft(/^!?\[(ref)\](?:\[\])?/).replace("ref",Va).getRegex(),pm=ft("reflink|nolink(?!\\()","g").replace("reflink",ru).replace("nolink",su).getRegex(),Wc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Qa={_backpedal:ps,anyPunctuation:im,autolink:lm,blockSkip:tm,br:Xc,code:Z_,del:ps,emStrongLDelim:nm,emStrongRDelimAst:sm,emStrongRDelimUnd:am,escape:Y_,link:dm,nolink:su,punctuation:X_,reflink:ru,reflinkSearch:pm,tag:um,text:Q_,url:ps},fm={...Qa,link:ft(/^!?\[(label)\]\((.*?)\)/).replace("label",bo).getRegex(),reflink:ft(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",bo).getRegex()},Ba={...Qa,emStrongRDelimAst:om,emStrongLDelim:rm,url:ft(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Wc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ft(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Wc).getRegex()},_m={...Ba,br:ft(Xc).replace("{2,}","*").getRegex(),text:ft(Ba.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},go={normal:Ya,gfm:V_,pedantic:K_},cs={normal:Qa,gfm:Ba,breaks:_m,pedantic:fm},mm={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},zc=e=>mm[e];function Pn(e,t){if(t){if(Zt.escapeTest.test(e))return e.replace(Zt.escapeReplace,zc)}else if(Zt.escapeTestNoEncode.test(e))return e.replace(Zt.escapeReplaceNoEncode,zc);return e}function Hc(e){try{e=encodeURI(e).replace(Zt.percentDecode,"%")}catch{return null}return e}function Gc(e,t){let n=e.replace(Zt.findPipe,(o,a,i)=>{let c=!1,d=a;for(;--d>=0&&i[d]==="\\";)c=!c;return c?"|":" |"}),r=n.split(Zt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(Zt.slashPipe,"|");return r}function us(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function gm(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Vc(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,c}function hm(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var yo=class{constructor(e){kt(this,"options");kt(this,"rules");kt(this,"lexer");this.options=e||cr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:us(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=hm(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=us(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:us(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=us(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))i.push(n[c]),a=!0;else if(!a)i.push(n[c]);else break;n=n.slice(c);let d=i.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${d}`:d,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,n.length===0)break;let g=o.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let w=g,A=w.raw+`
`+n.join(`
`),D=this.blockquote(A);o[o.length-1]=D,r=r.substring(0,r.length-w.raw.length)+D.raw,s=s.substring(0,s.length-w.text.length)+D.text;break}else if(g?.type==="list"){let w=g,A=w.raw+`
`+n.join(`
`),D=this.list(A);o[o.length-1]=D,r=r.substring(0,r.length-g.raw.length)+D.raw,s=s.substring(0,s.length-w.raw.length)+D.raw,n=A.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let c=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,D=>" ".repeat(3*D.length)),g=e.split(`
`,1)[0],w=!f.trim(),A=0;if(this.options.pedantic?(A=2,p=f.trimStart()):w?A=t[1].length+1:(A=t[2].search(this.rules.other.nonSpaceChar),A=A>4?1:A,p=f.slice(A),A+=t[1].length),w&&this.rules.other.blankLine.test(g)&&(d+=g+`
`,e=e.substring(g.length+1),c=!0),!c){let D=this.rules.other.nextBulletRegex(A),W=this.rules.other.hrRegex(A),V=this.rules.other.fencesBeginRegex(A),Y=this.rules.other.headingBeginRegex(A),N=this.rules.other.htmlBeginRegex(A);for(;e;){let M=e.split(`
`,1)[0],q;if(g=M,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),q=g):q=g.replace(this.rules.other.tabCharGlobal,"    "),V.test(g)||Y.test(g)||N.test(g)||D.test(g)||W.test(g))break;if(q.search(this.rules.other.nonSpaceChar)>=A||!g.trim())p+=`
`+q.slice(A);else{if(w||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(f)||Y.test(f)||W.test(f))break;p+=`
`+g}!w&&!g.trim()&&(w=!0),d+=M+`
`,e=e.substring(M.length+1),f=q.slice(A)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(c.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};c.checked=p.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=p.raw+c.tokens[0].raw,c.tokens[0].text=p.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(p)):c.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):c.tokens.unshift(p)}}if(!s.loose){let d=c.tokens.filter(f=>f.type==="space"),p=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let c of s.items){c.loose=!0;for(let d of c.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Gc(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Gc(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=us(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=gm(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Vc(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Vc(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,c=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(r=d.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let p=[...r[0]][0].length,f=e.slice(0,s+r.index+p+a);if(Math.min(s,a)%2){let w=f.slice(1,-1);return{type:"em",raw:f,text:w,tokens:this.lexer.inlineTokens(w)}}let g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},bn=class Ua{constructor(t){kt(this,"tokens");kt(this,"options");kt(this,"state");kt(this,"inlineQueue");kt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||cr,this.options.tokenizer=this.options.tokenizer||new yo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Zt,block:go.normal,inline:cs.normal};this.options.pedantic?(n.block=go.pedantic,n.inline=cs.pedantic):this.options.gfm&&(n.block=go.gfm,this.options.breaks?n.inline=cs.breaks:n.inline=cs.gfm),this.tokenizer.rules=n}static get rules(){return{block:go,inline:cs}}static lex(t,n){return new Ua(n).lex(t)}static lexInline(t,n){return new Ua(n).inlineTokens(t)}lex(t){t=t.replace(Zt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(Zt.tabCharGlobal,"    ").replace(Zt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),c;this.options.extensions.startBlock.forEach(d=>{c=d.call({lexer:this},i),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=n.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(p=>(c=p.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let p=n.at(-1);c.type==="text"&&p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,r,i)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),g;this.options.extensions.startInline.forEach(w=>{g=w.call({lexer:this},f),typeof g=="number"&&g>=0&&(p=Math.min(p,g))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(c=this.tokenizer.inlineText(d)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):n.push(c);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},vo=class{constructor(e){kt(this,"options");kt(this,"parser");this.options=e||cr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(Zt.notSpaceStart)?.[0],s=e.replace(Zt.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Pn(r)+'">'+(n?s:Pn(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Pn(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Pn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Hc(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Pn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Hc(e);if(s===null)return Pn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Pn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Pn(e.text)}},Xa=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},yn=class Wa{constructor(t){kt(this,"options");kt(this,"renderer");kt(this,"textRenderer");this.options=t||cr,this.options.renderer=this.options.renderer||new vo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Xa}static parse(t,n){return new Wa(n).parse(t)}static parseInline(t,n){return new Wa(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},ho,ds=(ho=class{constructor(e){kt(this,"options");kt(this,"block");this.options=e||cr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?bn.lex:bn.lexInline}provideParser(){return this.block?yn.parse:yn.parseInline}},kt(ho,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),kt(ho,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ho),bm=class{constructor(...e){kt(this,"defaults",za());kt(this,"options",this.setOptions);kt(this,"parse",this.parseMarkdown(!0));kt(this,"parseInline",this.parseMarkdown(!1));kt(this,"Parser",yn);kt(this,"Renderer",vo);kt(this,"TextRenderer",Xa);kt(this,"Lexer",bn);kt(this,"Tokenizer",yo);kt(this,"Hooks",ds);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new vo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],c=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=c.apply(s,d)),p||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new yo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],c=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=c.apply(s,d)),p}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new ds;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],c=s[a];ds.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&ds.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await i.call(s,d);return c.call(s,f)})();let p=i.call(s,d);return c.call(s,p)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await i.apply(s,d);return f===!1&&(f=await c.apply(s,d)),f})();let p=i.apply(s,d);return p===!1&&(p=c.apply(s,d)),p}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return bn.lex(e,t??this.defaults)}parser(e,t){return yn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?bn.lex:bn.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?yn.parse:yn.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?bn.lex:bn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?yn.parse:yn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Pn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},lr=new bm;function ht(e,t){return lr.parse(e,t)}ht.options=ht.setOptions=function(e){return lr.setOptions(e),ht.defaults=lr.defaults,Kc(ht.defaults),ht};ht.getDefaults=za;ht.defaults=cr;ht.use=function(...e){return lr.use(...e),ht.defaults=lr.defaults,Kc(ht.defaults),ht};ht.walkTokens=function(e,t){return lr.walkTokens(e,t)};ht.parseInline=lr.parseInline;ht.Parser=yn;ht.parser=yn.parse;ht.Renderer=vo;ht.TextRenderer=Xa;ht.Lexer=bn;ht.lexer=bn.lex;ht.Tokenizer=yo;ht.Hooks=ds;ht.parse=ht;var Rv=ht.options,Lv=ht.setOptions,Iv=ht.use,Ov=ht.walkTokens,Pv=ht.parseInline;var Mv=yn.parse,Dv=bn.lex;function Wn(e){let t=ht.parse(e),n=jc.sanitize(t);return Bc(n)}function Mn(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Pr(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function $o(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var au={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},ym={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},vm=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,wm=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function An(e){return!!e&&typeof e=="object"}function Ja(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function ei(e,t){let n=Ja(e),r=Ja(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function iu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>An(s)&&typeof s.text=="string"?s.text:"").join(""):An(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function km(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:au[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Ja(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=ei(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let c=ei(An(i)?i.old_string:"",An(i)?i.new_string:"");s+=c.added,o+=c.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function ti(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ni(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=vm.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:wm.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function $m(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(An(a)){if(a.type==="text"&&typeof a.text=="string")o.push(ni(a.text));else if(a.type==="thinking"){let i=ti(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=km(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?ou(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(An(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=iu(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?ou([s],n):[s]}return[]}function ou(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function xm(e){let t=typeof e.command=="string"?e.command:"",n=iu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:au.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Am(e){if(e.type==="item.completed"&&An(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ni(t.text)];if(t.type==="reasoning"){let n=ti(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[xm(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Sm(e){if(e.schema!=="codex-delegation-monitor-v1"||!An(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&An(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[ni(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=ti(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=ym[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Em(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Tm(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return An(t)?t:null}function lu(e={}){let t=e.skip_delegated===!0,n=new Map;return{push(r){let s=Tm(r);return s?t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0?[]:s.schema==="codex-delegation-monitor-v1"?Sm(s):Em(s)?Am(s):$m(s,n):[]}}}function ri(e){let t=[],n=lu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Cm=5,Rm=10,Lm=/Task\s+#(\d+)/,Im=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Om=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function xo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Pm(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Mm(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Dm(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Lm.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!c||d.length===0)continue;t.set(c[1],{label:d,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Nm(e){if(e.tool==="Bash"){let t=e.command||"";return Im.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Om.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function qm(e){let t=e.filter(s=>s.kind==="tool").slice(-Rm),n=new Map;t.forEach((s,o)=>{let a=Nm(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Fm(e){let t=Mm(e);if(t)return{text:t,guess:!1};let n=Dm(e);if(n)return{text:n,guess:!1};let r=qm(e);return r?{text:r,guess:!0}:null}function jm(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:sn(e,t)}function Mr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,c=null,d=!1,p={},f=!0,g=new Set,w=new Set,A=null,D=null,W=!1,V=!1,Y=!1,N=null,M=null;function q(){W=!1,V=!1,Y=!1,N=null,M=null}async function U(z){if(n){V=!0,Y=!1,ge();try{let K=await Promise.resolve(n("get-attempt-prompt",{attempt_id:z,...c?{root_dir:c}:{}}));if(o!==z)return;!K||typeof K!="object"||Array.isArray(K)?Y=!0:(N=K,M=z)}catch{o===z&&(Y=!0)}finally{o===z&&(V=!1,ge())}}}function E(){if(W=!W,W&&o&&M!==o){U(o);return}ge()}function R(){if(!W)return"";let z=Pr({loading:V,error:Y});if(z)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${z}
      </div>`;if(!N)return"";if(N.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let K=$o(N.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${K?l`<div class="prompt-block__meta">${K} 발송</div>`:""}
      ${typeof N.task_prompt=="string"?Mn("\uACFC\uC5C5 (user)",N.task_prompt):""}
      ${typeof N.system_prompt=="string"?Mn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",N.system_prompt):""}
    </div>`}function X(){if(!i||!r)return[];let z=r.get(i);return ri(z?z.lines:[])}function ve(){if(!i||!r)return null;let z=r.get(i),K=z?z.last_event_at:null;return typeof K=="number"?K:null}function he(){return p.status==="running"}function ne(){if(he()&&o){D||(D=setInterval(()=>ge(),1e3));return}Z()}function Z(){D&&(clearInterval(D),D=null)}function Re(z){let K=[],De=0;for(;De<z.length;){let{idx:Qe,line:We}=z[De];if(We.kind==="tool"){let we=De;for(;we<z.length&&z[we].line.kind==="tool"&&z[we].line.tool===We.tool;)we+=1;if(we-De>=Cm&&!w.has(Qe)){K.push({kind:"group",idx:Qe,tool:We.tool||"",lines:z.slice(De,we)}),De=we;continue}}K.push({kind:"line",idx:Qe,line:We}),De+=1}return K}function $e(z){let K=[],De=new Map;for(let we=0;we<z.length;we+=1){let P=z[we],H=P.parent_tool_use_id;if(typeof H=="string"&&H.length>0){let ee=De.get(H);ee||(ee={kind:"subagent",idx:we,launch_id:H,agent_type:null,header:null,lines:[]},De.set(H,ee),K.push(ee)),ee.lines.push({idx:we,line:P});continue}if(P.kind==="tool"&&P.tool==="Agent"&&typeof P.launch_id=="string"&&P.launch_id.length>0){let ee=ie(P),Q=De.get(P.launch_id);if(Q){Q.header={idx:we,line:P},Q.agent_type=ee;continue}let Pe={kind:"subagent",idx:we,launch_id:P.launch_id,agent_type:ee,header:{idx:we,line:P},lines:[]};De.set(P.launch_id,Pe),K.push(Pe);continue}K.push({kind:"entry",idx:we,line:P})}let Qe=[],We=0;for(;We<K.length;){if(K[We].kind!=="entry"){Qe.push(K[We]),We+=1;continue}let we=We;for(;we<K.length&&K[we].kind==="entry";)we+=1;Qe.push(...Re(K.slice(We,we))),We=we}return Qe}function ie(z){let K=z.input;return K&&typeof K.subagent_type=="string"?K.subagent_type:null}function ae(z){for(let K=z.length-1;K>=0;K-=1){let De=z[K];if(De.kind==="result"||De.kind==="error")return null;if(De.kind==="tool"&&!Object.hasOwn(De,"result"))return De}return null}function xe(z){for(let K=z.length-1;K>=0;K-=1)if(z[K].kind==="thinking")return z[K];return null}function B(z,K){if(K.kind==="gate")return l`<div class="sv__gate">${K.text}</div>`;if(K.kind==="phase")return l`<div class="sv__phase">${K.text}</div>`;if(K.kind==="result")return l`<div
        class="sv__result${K.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${K.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Wn(K.text||(K.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(K.kind==="thinking"){let De=g.has(z);return l`<div
        class="sv__think${De?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>_t(z)}
      >
        <span class="sv__think-line">💭 ${xo(K.text)}</span>
        ${De?l`<pre class="sv__think-expand">${K.text}</pre>`:""}
      </div>`}if(K.kind==="error")return l`<div class="sv__error">⛔ ${K.text}</div>`;if(K.kind==="blocker")return l`<div class="sv__error">⛔ ${K.text}</div>`;if(K.kind==="tool"){let De=g.has(z),Qe=K.tool==="Bash"?Pm(K.command):0,We=K.tool==="Bash"?Qe>1?xo(K.command):K.command:K.path||K.command||"";return l`<div
        class="sv__tool${De?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>_t(z)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${K.icon}</span>
          <span class="sv__tool-name">${K.tool}</span>
          ${We?l`<span class="sv__tool-detail">${We}</span>`:""}
          ${Qe>1?l`<span class="sv__tool-more">⋯ ${Qe}줄</span>`:""}
          ${typeof K.added=="number"?l`<span class="sv__diff-add">+${K.added}</span>`:""}
          ${typeof K.removed=="number"?l`<span class="sv__diff-del">−${K.removed}</span>`:""}
          ${K.result?l`<span class="sv__tool-ok">→ ${K.result}</span>`:""}
        </span>
        ${De?l`<pre class="sv__tool-expand">${J(K)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Wn(K.text||"")}</div>`}function J(z){let K=[];if(z.tool==="Bash"&&typeof z.command=="string"&&z.command.length>0)K.push(z.command);else if(z.input!==void 0)try{K.push(`input: ${JSON.stringify(z.input,null,2)}`)}catch{}return typeof z.output=="string"&&z.output.length>0&&K.push(`output:
${z.output}`),K.join(`

`)}function le(){if(!o)return l``;let z=X(),K=(a?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),De=p.session_id||"",Qe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${f?"ON":"OFF"}`,We=he(),we=We?jm(ve(),Date.now()):"",P=We?ae(z):null,H=We?xe(z):null,ee=Fm(z);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?p.role||"":o}</span>
        ${ee?l`<span
              class="sv__stage${ee.guess?" sv__stage--guess":""}"
              title=${ee.text}
              >${ee.text}</span
            >`:""}
        ${We?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${we?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${we}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${we?l`<span class="sv__live-ago">${we}</span>`:""}</span
            >`:""}
        ${De?l`<button
              type="button"
              class="sv__session"
              title=${De}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${De}`}
              @click=${()=>me(De)}
            >
              ⧉ ${De.slice(0,8)}
            </button>`:""}
        ${K?l`<span class="sv__meta">${K}</span>`:""}
        ${p.worktree?l`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${a||d?"":l`<button
              type="button"
              class="sv__prompt-toggle${W?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${W?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${E}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${f?" sv__follow--on":""}"
          aria-pressed=${f?"true":"false"}
          aria-label=${Qe}
          @click=${C}
        >
          <span class="sv__follow-full">⇣ ${Qe}</span>
          <span class="sv__follow-short">⇣ ${f?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Be()}
        >
          ✕
        </button>
      </div>
      ${a||d?"":R()}
      <div class="sv__body">
        ${z.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:$e(z).map(Q=>Q.kind==="subagent"?Se(Q):Q.kind==="group"?Ae(Q):B(Q.idx,Q.line))}
      </div>
      ${P||H?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${P?l`<span class="sv__now-icon">${P.icon}</span>
                  <span class="sv__now-name">${P.tool}</span>
                  <span class="sv__now-detail"
                    >${P.tool==="Bash"?xo(P.command):P.path||P.command||""}</span
                  >`:""}
            ${H?l`<span class="sv__now-think"
                  >💭 ${xo(H.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ae(z){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Oe(z.idx)}
    >
      <span class="sv__group-icon">${z.lines[0].line.icon}</span>
      <span class="sv__group-name">${z.tool}</span>
      <span class="sv__group-count">${z.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Se(z){let K=w.has(z.idx),De=z.header?z.header.line:null,Qe=De?De.is_error===!0?"\u2717":typeof De.result=="string"?"\u2713":"\u27F3":"",We=De&&De.command?De.command:"";return l`<div class="sv__sub${K?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Oe(z.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${z.agent_type||"subagent"}</span>
        ${We?l`<span class="sv__sub-detail">${We}</span>`:""}
        <span class="sv__sub-count">${z.lines.length}줄</span>
        ${Qe?l`<span class="sv__sub-state">${Qe}</span>`:""}
        ${K?"":l`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${K?l`<div class="sv__sub-body">
            ${Re(z.lines).map(we=>we.kind==="group"?Ae(we):B(we.idx,we.line))}
          </div>`:""}
    </div>`}function Oe(z){w.add(z),ge()}function ge(){Ze(le(),e),ne(),f&&it()}function it(){let z=e.querySelector(".sv__body");z&&(z.scrollTop=z.scrollHeight)}function _t(z){g.has(z)?g.delete(z):g.add(z),ge()}function C(){f=!f,ge()}function me(z){on(z).then(K=>{K?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ke(z){!o||!z||(p={...p,...z},ge())}function Le(z){let K=z.target;if(!K||!K.classList||!K.classList.contains("sv__body"))return;!(K.scrollHeight-K.scrollTop-K.clientHeight<=4)&&f&&(f=!1,ge())}e.addEventListener("scroll",Le,!0);function Me(z){let K=z&&z.attempt_id;if(!K)return;let De=i;o=K,a=typeof z.launch_id=="string"&&z.launch_id.length>0?z.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&De&&De!==i&&Promise.resolve(n("unsubscribe-session-log",{id:De})).catch(()=>{}),c=typeof z.root_dir=="string"&&z.root_dir.length>0?z.root_dir:null,p=z.meta||{},d=z.hide_prompt===!0,f=!0,g.clear(),w.clear(),q(),!A&&r&&(A=r.subscribe(ge)),n&&Promise.resolve(n("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...c?{root_dir:c}:{}})).catch(()=>{}),ge()}function Be(){let z=i;o=null,a=null,i=null,c=null,d=!1,g.clear(),w.clear(),q(),Z(),n&&z&&Promise.resolve(n("unsubscribe-session-log",{id:z})).catch(()=>{}),Ze(l``,e),s&&s()}return{open:Me,updateMeta:ke,close:Be,isOpen(){return o!==null},destroy(){Z(),A&&(A(),A=null),e.removeEventListener("scroll",Le,!0),o=null,a=null,i=null,c=null,d=!1,Ze(l``,e)}}}function Ao(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=si(t.spec_id),s=si(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function si(e){return typeof e=="string"?e.trim():""}function cu(e){let t=Ao(e);if(t.path)return t;let n=si(Bm(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Bm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function Um(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Wm(e){let t=e&&e.metadata||{},n=cu(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Um(t)?null:"plan_pending"}),r}function uu(e,t){let n=Wm(e);return l`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?l`<div class="detail-empty">산출물 없음</div>`:l`
          ${n.map(r=>l`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?l`<span class="detail-art__badge">draft</span>`:null}
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
  `}var zm="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Hm=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Gm=/^\*\*결론\*\* — (.+)$/;function So(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==zm)return null;let n=Hm.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Gm.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:c,body:t.slice(d).join(`
`).trim()}}var du=20;function pu(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Vm(e){return e.length>du?`${e.slice(0,du)}\u2026`:e}function Km(e,t,n,r){let s=`${t.lane} ${Vm(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${pu(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?l`<div class="detail-report__body">
          ${Wn(t.body)}
        </div>`:""}
  </div>`}function Ym(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${pu(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Wn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function fu(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((c,d)=>String(d.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let d=So(typeof c.text=="string"?c.text:"");return d?Km(c,d,t,s.has(c.id)):Ym(c)})}
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
  `}var{I:hw}=Ol;var _u=e=>e.strings===void 0;var Zm={},mu=(e,t=Zm)=>e._$AH=t;var ur=mo(class extends Or{constructor(e){if(super(e),e.type!==On.PROPERTY&&e.type!==On.ATTRIBUTE&&e.type!==On.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!_u(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===cn||t===It)return t;let n=e.element,r=e.name;if(e.type===On.PROPERTY){if(t===n[r])return cn}else if(e.type===On.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return cn}else if(e.type===On.ATTRIBUTE&&n.getAttribute(r)===t+"")return cn;return mu(e),t}});var Eo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ai=[...Eo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Dn=["orchestration_model","orchestration_effort","orchestration_speed"],To=[...Eo,...Dn],Qm=ai.filter(e=>To.includes(e)),gu=["delegated","main"],Co=["inherit","claude","codex"],_s=["default","fast"],ms=["standard","fast_track"],gs=["codex","opus","fable","self","skip"],Ro=["codex","fable","skip"],Lo=["low","medium","high","xhigh"],ln="auto";function an(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function hu(e){if(!an(e)||!an(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))an(r)&&an(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Dr(e,t){let n=hu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[ln,...r.flatMap(([,s])=>s)]}function bu(e,t,n,r){if(!an(e)||!an(e.runners))return[ln];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!an(a)||!an(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,c]of Object.entries(a.models)){if(n&&n!==ln&&i!==n)continue;let d=r(a,c);if(Array.isArray(d))for(let p of d)typeof p=="string"&&!s.includes(p)&&s.push(p)}return[ln,...s]}function Nr(e,t,n){return bu(e,t,n,(r,s)=>an(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function ii(e,t,n){return bu(e,t,n,(r,s)=>an(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:an(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function hs(e,t){let n=hu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function yu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Dr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Nr(t,s,r.impl_model||ln).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Xm={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},oi=[...Qm,...Dn],Jm=[...To,...ai].filter((e,t,n)=>n.indexOf(e)===t&&!oi.includes(e));function vu(e,t){let n=an(e)?e:{},r=an(t)?t:{},s=[];for(let a of oi){let i=n[a]??null,c=r[a]??null;i!==c&&s.push({key:a,label:Xm[a]||a,before:i,after:c,kind:i===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...Jm,...Object.keys(r)])!oi.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function li(e,t,n,r,s,o){return lo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function wu(e,t){let n={};for(let r of ai){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function ku(e,t){let n={};for(let r of Dn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var ci=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Dn]}],zn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Io={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ui(e,t,n,r,s,o=null){let a=en({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function $u(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of ui(e,t,n,r,s,o))a[i.source]+=1;return a}function xu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Au(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Tw=[...Eo,...Dn];var eg=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],tg={pin:"pin",global:"global",base:"base"};function ng(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${tg[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function rg(e,t,n){switch(e){case"workflow_mode":return ms;case"spec_review_model":case"impl_review_model":return gs;case"plan_review_model":return Ro;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Lo;case"impl_dispatch":return gu;case"impl_runtime":return Co;case"impl_model":return Dr(n,t.impl_runtime);case"impl_effort":return Nr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return _s;case"orchestration_model":return hs(n,null);case"orchestration_effort":return Nr(n,void 0,t.orchestration_model||ln).filter(r=>r!==ln);default:return[]}}function sg(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${ng(e.source)}
    <span class="detail-effective__k"
      >${zn[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Io[e.source]}</span
    >
    ${t.expanded?l`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${zn[e.key]||e.key} \uD3B8\uC9D1`}
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
          ${t.options.map(n=>l`<option
                value=${n.value}
                title=${n.full_value||""}
                ?selected=${e.source==="pin"&&e.value===n.value}
              >
                ${n.label}
              </option>`)}
        </select>`:""}
  </div>`}function Su(e,t){let n=ci.flatMap(c=>c.keys),r=ui(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=$u(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(c=>[c.key,c])),a=Object.fromEntries(r.filter(c=>c.value!==null).map(c=>[c.key,c.value])),i=r.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return l`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${c=>t.onToggle(c.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${c=>{c.preventDefault();let d=c.currentTarget.parentElement;t.onToggle(!d.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${og(o)}</span
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
    ${e.expanded?l`<div class="detail-effective__body">
          ${ci.map(c=>l`
              <div class="detail-effective__subhead">${c.label}</div>
              ${r.filter(d=>c.keys.includes(d.key)).map(d=>{let p=lo({key:d.key,choices:rg(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return sg(d,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${ur(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${c=>t.onPresetSelect(String(c.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(c=>l`<option
                    value=${c.id}
                    ?selected=${c.id===e.preset_id}
                  >
                    ${c.name}${c.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
            ${(e.skipped_orchestration_keys||[]).length>0?l`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function og(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function ag(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Eu(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=ag(n.exec_receipt),c=i?Tn(i):a,d=i?`${i.kind}:${i.actor}`:a.split("@")[0],p=ao(n.planned_execution,n.exec_receipt);return l`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?l`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?l`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?l`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${p?l`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
          >`:""}
      ${c?l`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${c}
            >${d}${i?.effort?l`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${i.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${eg.map(f=>{let g=f.receipt&&typeof t[f.receipt]=="string"?String(t[f.receipt]):"",w=r[f.id],A=g.length>0||w?.fill==="full",D=!A&&w?.fill==="dim",W=w?.stale===!0;return l`<span
          class=${`detail-summary__gate${A?" detail-summary__gate--on":""}${D?" detail-summary__gate--current":""}${W?" detail-summary__gate--stale":""}`}
          data-gate=${f.id}
        >
          <span class="detail-summary__gate-pill">${f.label}</span>
          ${g?l`<span class="detail-summary__gate-sha"
                >${g.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function Lu(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Tu(e){return Lu(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Cu(e,t){let n=e&&e[t];if(!Lu(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Tu),s=Tu(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function Iu(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function ig(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Iu(e)}${t}`}function Ou(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Iu(e)}`}function lg(e,t){return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Ou({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Ru(e){let t=e.provider_key==="claude"?ig:Ou,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return l`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${lg(e.provider_key,e.provider)}
        </option>
        ${e.selected&&!n?l`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(r=>l`<option
              value=${r.key}
              ?selected=${r.key===e.selected}
            >
              ${t(r)}
            </option>`)||""}
      </select>
      ${e.hint?l`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":l`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function Pu({md:e,catalog:t,handlers:n}){let r=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return l`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Ru({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Cu(t,"claude"),selected:r,handlers:n,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Ru({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Cu(t,"codex"),selected:s,handlers:n})}
    </div>
  </section>`}var Mu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function bs(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Oo(e){if(!bs(e)||!bs(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>bs(n)&&bs(n.models));return t.length>0?t:null}function vn(e,t){let n=Oo(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Du(e,t){return bs(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Nu(e,t){let n=Oo(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Du(r,r.models[t]);return[]}function cg(e){let t=Oo(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Du(r,s))n.includes(o)||n.push(o);return n}function ug(e,t){if(!t)return cg(e);let r=Oo(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of Nu(e,o))s.includes(a)||s.push(a);return s}function qu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=vn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?Nu(t,r.impl_model):ug(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function dg(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function pg(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Fu(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,c="";function d(D){D.key==="Escape"&&s&&(D.preventDefault(),w())}document.addEventListener("keydown",d);function p(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>w()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${dg(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>w()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="pending"?l`<div class="mv__status">${c}</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                      ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:l`${i===null?null:l`<pre class="mv__front">
${i}</pre
                        >`}${Wn(a)}`}
          </div>
        </div>
      </div>
    `:l``}function f(){Ze(p(),e)}async function g(D,W={}){s=D,o="loading",a="",i=null,c="",f();let V=n?n():"";if(!V){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let Y="/api/doc?workspace="+encodeURIComponent(V)+"&path="+encodeURIComponent(D);try{let N=await r(Y),M=await N.json().catch(()=>({}));if(!N.ok||!M||M.ok!==!0){if(M?.error==="not_found"&&W.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(M&&M.error||N.status)+")",f();return}let q=pg(String(M.content||""));i=q.front,a=q.body,o="ready",f()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function w(){s=null,Ze(l``,e)}function A(){document.removeEventListener("keydown",d),w()}return{open:g,close:w,destroy:A}}var fg=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Uu="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Po=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],_g=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function ju(e){return typeof e=="string"&&_g.has(e)}var mg=["running","done","failed","interrupted"],gg={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function hg(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function bg(e){let t=Bt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Ir(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${Uu}
          >부분 집계</span
        >`:""}`}function Bu(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function fi(e){if(typeof e=="number")return Mo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Mo(t):""}function yg(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function vg(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function di(e){return e===null||typeof e=="string"&&e.trim().length>0}function pi(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function wg(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Po.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?di(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||di(t.effort))||!(!("agent_type"in t)||di(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!mg.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!pi(t.started_at)||!pi(t.last_event_at)||!pi(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function kg(e,t,n){let s=Bt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${n.session_id?l`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${n.session_id}
          >${n.session_id.slice(0,8)}</span
        >`:""}
    ${fi(n.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
          >${fi(n.completed_at)}</span
        >`:""}
    ${s?l`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function $g(e,t,n,r){let s=e.status==="running"?null:t,a=(s?Bt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Mo(e.last_event_at):s?fi(s.completed_at):"",c=(e.provider==="claude"?["Claude",e.agent_type,yg(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=vg(e,s);return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${gg[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${c}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${d.title}
      >${d.text}</span
    >
    ${i?l`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?l`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function xg(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Ag(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let f=wg(p);!f||s.has(f.launch_id)||ju(f.agent_type)||(s.add(f.launch_id),r.push(f))}r.sort((p,f)=>(p.started_at||0)-(f.started_at||0));let a={};for(let{role:p,provider:f}of Po){let g=t?t.roles[p]?.[f]:null;a[p]=g?[...g.legs]:[]}let i=Po.flatMap(({role:p})=>a[p]),c=new Set,d=[];for(let{role:p,provider:f}of Po){for(let g of r.filter(w=>w.role===p&&w.provider===f)){let w=i.find(A=>A.receipt_id===g.launch_id)||null;w&&!xg(g,w)||(w&&c.add(w.receipt_id),d.push($g(g,w,e.attempt_id,n)))}for(let g of a[p])!c.has(g.receipt_id)&&!ju(g.agent_type)&&d.push(kg(p,f,g))}return d}function Sg(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...fg,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${r.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${hg(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${Uu}</span>`:""}
  </div>`}var Eg={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Mo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Tg(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Wu(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of r)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let f=typeof d.session_id=="string"&&d.session_id.length>0,g=o.has(d.attempt_id),w=f&&!g,A=f?g?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!w}
      title=${A}
      @click=${D=>{D.stopPropagation(),w&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let f=d.cause_detail,g=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:d.cause;return l`<div class="detail-session__cause" title=${g}>
      ${d.cause}
    </div>`},c=d=>{let p=Bu(La(d));if(Bt(p).length===0&&!Ir(d.usage))return"";let f=s.has(d.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${g=>{g.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${bg(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(d=>{let p=La(d),f=Bu(p),g=Bt(f);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Eg[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${Jr(d)?l`<span
                  class="detail-session__resumed"
                  title=${Jr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${ir(d)}</span>
            ${g.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?l`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${g.length>0?g.map(w=>l`<span
                      class="detail-session__usage"
                      title=${w.tooltip}
                      >${w.label}</span
                    >`):Ir(d.usage)?l`<span class="detail-session__usage"
                    >${Ir(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Mo(d.started_at)}</span>
          </button>
          ${c(d)} ${a(d)} ${i(d)} ${Tg(d)}
          ${s.has(d.attempt_id)&&d.usage?Sg(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${Ag(d,p,t)}
        </div>`})}
    </div>
  `}function zu(e,t={}){return l`
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
          ${Cg(e)}
        </div>`:""}
  `}function Cg(e){let t=Pr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Mn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=$o(n.recorded_at);return l`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Mn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Mn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Rg=["open","in_progress","deferred","resolved","closed"],Lg=[0,1,2,3,4];function Hu(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,d=null,p=null,f={},g="",w=!1,A=[],D=!1,W={},V={claude:null,codex:null},Y=null,N=0,M=!1,q=!1,U="",E="",R="";function X(){M=!1,q=!1,U="",E="",R=""}function ve(){V={claude:null,codex:null},Y=null,N+=1}async function he(u){try{let m=await fetch(u);if(!m.ok)return null;let v=await m.json();if(!v||typeof v!="object"||!Array.isArray(v.accounts))return null;let j=v.accounts.filter(pe=>pe!==null&&typeof pe=="object"&&!Array.isArray(pe));return{accounts:j,active:j.find(pe=>pe.active===!0)||null}}catch{return null}}async function ne(u){Y=u;let m=++N,[v,j]=await Promise.all([he("/api/claude-usage"),he("/api/codex-usage")]);m!==N||u!==d||(V={claude:v,codex:j},Ie())}let Z=[],Re=null,$e=null,ie=!1,ae="",xe=!1,B=0,J=new Set;function le(){Z=[],Re=null,$e=null,ie=!1,ae="",xe=!1,B+=1,J.clear()}async function Ae(u){if(!s)return;let m=++B;try{let v=await Promise.resolve(s("get-comments",{id:u}));if(m!==B||u!==d)return;Z=Array.isArray(v)?v:[],ie=!1}catch{if(m!==B||u!==d)return;ie=!0}Ie()}function Se(){if(!s||!d)return;let u=p&&typeof p.comment_count=="number"?p.comment_count:null;if(Re!==d){Re=d,$e=u,Ae(d);return}u!==null&&u!==$e&&($e=u,Ae(d))}function Oe(u){J.has(u)?J.delete(u):J.add(u),Ie()}function ge(u){let m=ae.trim().length===0;ae=u,m!==(u.trim().length===0)&&Ie()}async function it(){let u=ae.trim();if(!s||!d||u.length===0||xe)return;let m=d;xe=!0,Ie();let v=!1;try{let j=await Promise.resolve(s("add-comment",{id:m,text:u}));Array.isArray(j)&&j.length>0&&(v=!0,m===d&&(Z=j,ie=!1,ae="",$e=j.length))}catch{v=!1}v||ue("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),m===d&&(xe=!1),Ie()}let _t={onToggle:Oe,onDraftInput:ge,onSubmit:it},C=document.createElement("div");C.className="md-viewer-root",document.body.appendChild(C);let me=Fu(C,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),ke=document.createElement("div");ke.className="session-log-root",document.body.appendChild(ke);let Le=Mr(ke,{transport:s?(u,m)=>Promise.resolve(s(u,m)):void 0,sessionLogStore:c}),Me=!1,Be=!1,z=!1,K=null,De=null,Qe=0;function We(u){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${u}`}function we(){Me=!1,Be=!1,z=!1,K=null,De=null,Qe+=1}async function P(u){if(!s)return;let m=++Qe;Be=!0,z=!1,Ie();try{let v=await Promise.resolve(s("get-bead-prompt",{bead_id:u}));if(m!==Qe)return;!v||typeof v!="object"||Array.isArray(v)?z=!0:(K=v,De=We(u))}catch{m===Qe&&(z=!0)}finally{m===Qe&&(Be=!1,Ie())}}function H(){if(Me=!Me,Me&&d&&De!==We(d)){K=null,P(d);return}Ie()}function ee(){if(!a||!d)return[];let u=a.get();return(u&&u.attempts?Object.values(u.attempts):[]).filter(v=>v&&v.bead_id===d).sort((v,j)=>(j.started_at||0)-(v.started_at||0)).map(v=>({attempt_id:v.attempt_id,bead_id:v.bead_id,status:v.status,started_at:typeof v.started_at=="number"?v.started_at:null,runner:v.runner||null,model:v.model||null,effort:v.effort||v.observed_effort||null,speed:v.speed||null,session_id:v.session_id||null,resumed_from:v.resumed_from||null,continuation_mode:v.continuation_mode||null,dismissed_at:typeof v.dismissed_at=="number"?v.dismissed_at:null,cause:typeof v.cause=="string"?v.cause:null,cause_detail:v.cause_detail||null,exec_default_preset_id:typeof v.exec_default_preset_id=="string"?v.exec_default_preset_id:null,exec_default_preset_revision:typeof v.exec_default_preset_revision=="number"?v.exec_default_preset_revision:null,exec_values:v.exec_values&&typeof v.exec_values=="object"?v.exec_values:null,usage:v.usage||null,usage_legs:Array.isArray(v.usage_legs)?v.usage_legs:[],delegation_sessions:Array.isArray(v.delegation_sessions)?v.delegation_sessions:[]}))}function Q(){if(!a||!d)return null;let u=a.get();return dn(u&&u.attempts||{},d)}let Pe=new Set;function tt(u){Pe.has(u)?Pe.delete(u):Pe.add(u),Ie()}function st(u){let m=a?a.get():null,v=m&&m.attempts?m.attempts[u]:null;Le.open({attempt_id:u,meta:v?{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.status||void 0,session_id:v.session_id||void 0}:{}})}function Je(u,m){let v=a?a.get():null,j=v&&v.attempts?v.attempts[u]:null,Te=(j&&Array.isArray(j.delegation_sessions)?j.delegation_sessions:[]).find(Ee=>Ee&&typeof Ee=="object"&&Ee.launch_id===m);Te&&Le.open({attempt_id:u,launch_id:m,meta:{runner:Te.provider==="claude"?"claude":"codex",role:Te.role,...typeof Te.agent_type=="string"?{agent_type:Te.agent_type}:{},model:Te.model,effort:Te.effort,session_id:Te.session_id,status:Te.status}})}async function vt(u){if(!s||!u)return;let m=await Lr();if(m===null)return;let v=()=>{let Ee=a?a.get():null;return Ee&&typeof Ee.revision=="number"?Ee.revision:0},j=async(Ee={},ze=v())=>await s("worker-attempt-resume",{attempt_id:u,expected_revision:ze,...m!==""?{instructions:m}:{},...Ee}),pe=Ee=>{Ee?.queue&&a?.set&&a.set(Ee.queue)},Te=await j();if(pe(Te),Te&&Te.conflict){let Ee=Te.queue&&typeof Te.queue.revision=="number"?Te.queue.revision:v();Te=await j({},Ee),pe(Te)}Te=await Cn(Te,(Ee,ze)=>j({continuation:Ee,decision_token:ze}),{onResult:pe,refresh:()=>j()}),Te&&Te.resumed===!1&&!Te.conflict&&Te.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Te.reason}`,"error",2400)}let mt={onOpen:st,onOpenDelegation:Je,onResume:vt,onToggleUsage:tt};function ot(){let u=a?a.get():null,m={...W};for(let v of["orchestration_model","orchestration_effort","orchestration_speed"]){let j=u&&u[v];typeof j=="string"&&(m[v]=j)}return m}async function ut(){if(s){try{let u=await Promise.resolve(s("get-session-defaults",{}));W=u&&u.values&&typeof u.values=="object"?u.values:{}}catch{W={}}Ie()}}function gt(){let u=a?a.get():null;return u&&u.runner_catalog||null}function Ve(){let u=a?a.get():null;return u&&typeof u.execution_defaults=="object"?u.execution_defaults:null}function Ne(){let u=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},v=en({pin:{...u,...f},global:ot(),execution_defaults:Ve(),runner_catalog:gt(),route:typeof u.route=="string"?u.route:null}).orchestration_model.value||"";return vn(gt(),v)}function He(){let u=i?i.get():null;return!u||typeof u.revision!="number"?null:{revision:u.revision,presets:Array.isArray(u.presets)?u.presets:[]}}function wt(u){return u?.compatible===!1}function lt(u){i&&u&&typeof u.revision=="number"&&Array.isArray(u.presets)&&i.set({revision:u.revision,presets:u.presets})}async function G(){let u=He(),m=u?.presets.find(v=>v.id===g);if(!(!s||!d||!u||!m||wt(m)||w)){w=!0,A=[],Ie();try{let v=await Promise.resolve(s("apply-impl-preset",Au(d,m.id,u.revision)));if(v&&v.conflict){lt(v),ue("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let j=v&&Array.isArray(v.issue)?v.issue[0]:v?.issue;if(v&&v.applied&&j&&typeof j=="object"){p=j,A=Array.isArray(v.skipped_orchestration_keys)?v.skipped_orchestration_keys.filter(pe=>typeof pe=="string"):[];for(let pe of Mu)delete f[pe];ue(A.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}v&&v.error==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(v){v&&typeof v=="object"&&v.code==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{w=!1,Ie()}}}let fe=null;n&&n.subscribe&&(fe=n.subscribe(()=>k()));let qe=null;a&&typeof a.subscribe=="function"&&(qe=a.subscribe(()=>{d&&Ie()}));let S=null;i&&typeof i.subscribe=="function"&&(S=i.subscribe(()=>{d&&Ie()}));function O(u){u.key==="Escape"&&d&&(u.preventDefault(),r())}document.addEventListener("keydown",O);function k(){if(d){if(n&&typeof n.snapshotFor=="function"){let u=n.snapshotFor("detail:"+d)||[];p=u.find(v=>v&&v.id===d)||u[0]||p}Se(),Ie()}}function L(u){on(u).then(m=>{m?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function oe(u){u.preventDefault(),u.stopPropagation(),d&&L(d)}function de(u,m){u.preventDefault(),u.stopPropagation(),L(m)}function re(u,m,v){u.preventDefault(),u.stopPropagation(),me.open(m,{missing_state:v})}function be(u,m){f[u]=m,Ie(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",xu(d,u,m.length===0?null:m))).catch(()=>{ue("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function ct(u,m){let v=p||{},j=v.metadata&&typeof v.metadata=="object"?v.metadata:{},pe={};for(let ze of["impl_runtime","impl_model","impl_effort"])pe[ze]=Object.hasOwn(f,ze)?f[ze]:typeof j[ze]=="string"?j[ze]:"";pe[u]=m;let Te=qu(pe,gt(),Ne()),Ee={};for(let ze of["impl_runtime","impl_model","impl_effort"])Ee[ze]=f[ze],f[ze]=Te[ze]||"";Ie(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...Te,orchestration_runtime:Ne()})).then(ze=>{let dt=Array.isArray(ze)?ze[0]:ze;if(!dt||typeof dt!="object"||!dt.id)throw new Error("implementation target readback failed");p=dt;for(let jt of["impl_runtime","impl_model","impl_effort"])delete f[jt];Ie()}).catch(()=>{for(let ze of["impl_runtime","impl_model","impl_effort"])Ee[ze]===void 0?delete f[ze]:f[ze]=Ee[ze];Ie(),ue("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Xe(u,m,v){if(!s||!d)return!1;try{let j=await Promise.resolve(s(u,m)),pe=Array.isArray(j)?j[0]:j;return pe&&typeof pe=="object"&&pe.id?(p=pe,!0):(ue(v,"error"),!1)}catch{return ue(v,"error"),!1}}function Ye(u){setTimeout(()=>{try{let m=e.querySelector(u);m&&typeof m.focus=="function"&&m.focus()}catch{}},0)}function bt(){M=!0,U=p&&p.title||"",Ie(),Ye('.detail-edit__input[data-edit="title"]')}function St(u){U=u.target.value}function yt(){M=!1,U="",Ie()}function Ct(){Xe("edit-text",{id:d,field:"title",value:U},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(m=>{m&&(M=!1,U=""),Ie()})}function zt(){q=!0,E=p&&p.description||"",Ie(),Ye('.detail-edit__textarea[data-edit="description"]')}function Nt(u){E=u.target.value}function Mt(){q=!1,E="",Ie()}function Ft(){Xe("edit-text",{id:d,field:"description",value:E},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(m=>{m&&(q=!1,E=""),Ie()})}function Lt(u,m,v,j){if(u.key==="Escape"){u.stopPropagation(),v();return}u.key==="Enter"&&(!j||u.ctrlKey||u.metaKey)&&(u.preventDefault(),m())}function Ue(u){let m=u.target.value;Xe("update-status",{id:d,status:m},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Ie())}function Ut(u){let m=Number(u.target.value);Xe("update-priority",{id:d,priority:m},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Ie())}function Ht(u){R=u.target.value}function et(){let u=R.trim();u.length!==0&&Xe("label-add",{id:d,label:u},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(m=>{m&&(R=""),Ie()})}function Wt(u){if(u.key==="Escape"){u.stopPropagation(),R="",Ie();return}u.key==="Enter"&&(u.preventDefault(),et())}function Fe(u){Xe("label-remove",{id:d,label:u},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Ie())}let T={onCopyPath:de,onOpenDoc:re};function _e(u){return typeof u=="string"?u:u&&typeof u=="object"?String(u.id||u.to||u.issue_id||u.depends_on||""):""}function Ce(u){switch(u&&typeof u=="object"?String(u.dependency_type||u.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function at(u){let v=(Array.isArray(u.dependencies)?u.dependencies:[]).map(j=>({id:_e(j),icon:Ce(j)})).filter(j=>j.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${v.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${v.map(j=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(j.id)}
                  >
                    ${j.icon?`${j.icon} `:""}${j.id}
                  </button>`:l`<span class="detail-dep"
                    >${j.icon?`${j.icon} `:""}${j.id}</span
                  >`)}
          </div>`}
    `}function Rt(u){let m=u.metadata||{},v=u.workflow||{},j=v.stages||{},pe=j.spec&&j.spec.stale,Te=j.impl&&j.impl.stale,Ee=j.plan||null,ze=v.route_source==="derived",dt=v.route||m.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ze?" detail-kv__v--derived":""}"
          title=${ze?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ze?"unset":dt}</span
        >
      </div>
      ${v.route!=="quick_fix"||Object.hasOwn(m,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${m.spec_review||"\uC5C6\uC74C"}${pe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${v.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ee?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ee?.approval_receipt||"\uC5C6\uC74C"}${Ee?.approval_state==="stale"?" \xB7 stale":Ee?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${v.route!=="quick_fix"||Object.hasOwn(m,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${m.impl_review||"\uC5C6\uC74C"}${Te?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${v.planned_execution?l`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${v.planned_execution.kind}</span>
            </div>
            ${v.planned_execution.kind==="main"?l`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${v.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${v.exec_receipt?l`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Tn(v.exec_receipt)}</span
            >
          </div>`:""}
      ${v.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${v.impl_entry.actor}@${v.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${m.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${m.pr_url}</span>
          </div>`:""}
    `}let b={route:["quick_fix","spec_backed","full_plan"]};async function h(u,m){let v=m.target.value;if(u==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&v!=="full_plan"&&!window.confirm(`full_plan \u2192 ${v||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Ie();return}await Xe("update-workflow-meta",{id:d,key:u,value:v},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Ie()}function x(u){let m=u.metadata||{};return l` ${((j,pe)=>{let Te=b[j],Ee=typeof m[j]=="string"?m[j]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${j}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${j}
          data-edit=${`wfmeta-${j}`}
          @change=${ze=>h(j,ze)}
        >
          <option value="" ?selected=${!Te.includes(Ee)}>
            ${pe}
          </option>
          ${Te.map(ze=>l`<option value=${ze} ?selected=${Ee===ze}>${ze}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function I(u,m){return M?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${U}
            @input=${St}
            @keydown=${v=>Lt(v,Ct,yt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ct}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${yt}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${u}</h2>
        ${Bt(m).map(v=>l`<span class="detail-usage-total" title=${v.tooltip}
              >${v.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${bt}
        >
          ✎
        </button>
      </div>
    `}function te(u){let m=Gt(u.created_at),v=Gt(u.updated_at);return!m&&!v?l``:l`
      ${m?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${m}</span>
          </div>`:""}
      ${v?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${v}</span>
          </div>`:""}
    `}function y(u,m){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ue}
        >
          ${Rg.map(v=>l`<option value=${v} ?selected=${v===u}>${v}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Ut}
        >
          ${Lg.map(v=>l`<option value=${String(v)} ?selected=${v===m}>
                P${v}
              </option>`)}
        </select>
      </div>
    `}function $(u){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${q?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${zt}
            >
              ✎
            </button>`}
      </div>
      ${q?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${E}
              @input=${Nt}
              @keydown=${m=>Lt(m,Ft,Mt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Ft}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Mt}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${u||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ce(u){let m=typeof u.notes=="string"?u.notes:"";return m.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${m}</div>
    `}function ye(u){let m=Array.isArray(u.labels)?u.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${m.map(v=>l`<span class="detail-label-chip"
              >${v}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${v}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+v}
                @click=${()=>Fe(v)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${R}
            @input=${Ht}
            @keydown=${Wt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${et}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ke(){if(!d)return l``;let u=p||{},m=String(u.id||d),v=u.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",j=Q(),pe=u.status||"open",Te=typeof u.priority=="number"?Math.max(0,Math.min(4,u.priority)):"",Ee=u.description||"",ze={...u,metadata:{...u.metadata||{},...f}};return l`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${oe}
            >
              ${m}
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
          ${I(v,j)}
          ${Eu(ze)}
          ${Su({metadata:ze.metadata,workspace_values:ot(),catalog:gt(),execution_defaults:Ve(),expanded:D,presets:He()?.presets||[],preset_id:g,preset_busy:w,skipped_orchestration_keys:A},{onToggle:dt=>{D=dt,Ie()},onEdit:(dt,jt)=>{if(dt==="impl_runtime"||dt==="impl_model"||dt==="impl_effort"){ct(dt,jt??"");return}be(dt,jt??"")},onPresetSelect:dt=>{g=dt,A=[],Ie()},onPresetApply:()=>{G()}})}
          ${Pu({md:ze.metadata,catalog:V,handlers:{onExecChange:be}})}
          ${y(pe,Te)} ${te(u)}
          ${$(Ee)}
          ${fu(Z,_t,{expanded:J,draft:ae,sending:xe,error:ie})}
          ${ce(u)} ${ye(u)} ${at(u)}
          ${Rt(u)} ${x(u)}
          ${uu(u,T)}
          ${zu({expanded:Me,loading:Be,error:z,data:K},{onToggle:H})}
          ${Wu(ee(),mt,{total:j,expanded:Pe})}
        </div>
      </div>
    `}function Ie(){Ze(Ke(),e)}return{load(u){u!==d&&(f={},g="",A=[],D=!1,X(),le(),we(),ve()),d=u,p=null,k(),ut(),Y!==u&&ne(u)},clear(){d=null,p=null,f={},g="",w=!1,A=[],D=!1,X(),le(),we(),ve(),me.close(),Le.close(),Ze(l``,e)},destroy(){fe&&(fe(),fe=null),qe&&(qe(),qe=null),S&&(S(),S=null),document.removeEventListener("keydown",O),me.destroy(),C.parentNode&&C.parentNode.removeChild(C),Le.destroy(),ke.parentNode&&ke.parentNode.removeChild(ke),d=null,p=null,ve(),g="",w=!1,A=[],le(),we(),Ze(l``,e)}}}function Gu(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(d,p,f="")=>{n&&(n.textContent=d||"Unexpected Error"),r&&(r.textContent=p||"An unrecoverable error occurred.");let g=typeof f=="string"?f.trim():"";if(s&&(g.length>0?(s.textContent=g,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function No(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function vs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function qo(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function Fo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Ig(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:No(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Vu(e,t){let n=Ig(e,t);return n?l`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${n.deploy?l`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${n.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${n.deploy.at?Gt(n.deploy.at):""}
            >${Fo(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${vs(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function qr(e){let t=sn(e.created_at),n=sn(e.updated_at);return!t&&!n?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${Gt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?l`<span>·</span>`:""}${n?l`<span title=${`\uC218\uC815 ${Gt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Og(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function ws(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function jo(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Sn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,g)=>(f.requested_at||0)-(g.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?Og(s.phase):null,d=s?.kind==="stale_work_backup_fresh",p=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:p}}function ys(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return l`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?l`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${n.operation_id}</code>
    ${r?l`<code>백업: ${r}</code>`:t.error?l`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?l`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?l`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var Pg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Ku(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let c=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Pg[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Bo(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
\uC774\uC288 \uD540 \u2014 \uB808\uD3EC \uAE30\uBCF8\uAC12\uACFC \uB2E4\uB984`:"";return l`${e.orchestration?l`<span
        class="exec-chip exec-chip--orch${n}"
        title=${`${e.orchestration.title}${r}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?l`<span
        class="exec-chip exec-chip--worker${n}"
        title=${`${e.worker.title}${r}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}var Do=3;function Mg(e){return l`<div
    class="mon-overlap__popover"
    role="dialog"
    aria-label="scope 겹침"
  >
    ${e.rows.map(t=>l`<div class="mon-overlap__row">
          <div class="mon-overlap__hd">
            <span class="mon-overlap__rid">${t.id}</span>
            <span class="mon-overlap__rtitle">${t.title}</span>
            <span class="mon-overlap__rwhere">${t.location_label}</span>
          </div>
          <ul class="mon-overlap__paths">
            ${t.prefixes.map(n=>l`<li>${n}</li>`)}
          </ul>
          ${t.action.kind==="note"?l`<p class="mon-overlap__note">${t.action.text}</p>`:l`<button
                type="button"
                class="mon-overlap__place"
                data-counterpart-id=${t.id}
                ?disabled=${t.action.kind==="disabled"}
                title=${t.action.title}
              >
                ${t.action.label}
              </button>`}
        </div>`)}
  </div>`}function Fr(e,t={}){if(!e)return"";let n=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.successors)?e.successors:[],s=Array.isArray(e.warnings)?e.warnings:[],o=Array.isArray(e.overlaps)?e.overlaps:[],a=e.scope_missing===!0&&t.lane!=="running",i=e.popover||null;if(n.length===0&&r.length===0&&s.length===0&&o.length===0&&!a)return"";let c=o.length>Do,d=c?o.slice(0,Do):o;return l`<div class="worker-deps">
    ${n.map(p=>l`<span class="worker-dep worker-dep--pred" title=${p.title||""}
          ><span class="worker-dep__label">${p.label}</span
          ><button
            type="button"
            class="worker-dep__remove"
            data-blocker-id=${p.id}
            aria-label=${`\uC120\uD589 ${p.id} \uC5F0\uACB0 \uD574\uC81C`}
            title="선행 연결 해제"
          >
            ✕
          </button></span
        >`)}${d.map(p=>l`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${p.id}
          title=${p.prefixes.join(`
`)}
        >
          ⧉ 겹침 ${p.id} (${p.location_label})
        </button>`)}${c?l`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip mon-overlap__chip--more"
          data-overlap-all="true"
          title=${o.slice(Do).map(p=>`${p.id} (${p.location_label})`).join(`
`)}
        >
          +${o.length-Do}
        </button>`:""}${a?l`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${r.map(p=>l`<span class="worker-dep worker-dep--succ" title=${p.title||""}
          >${p.label}</span
        >`)}${s.map(p=>l`<span class="worker-dep worker-dep--warn">${p}</span>`)}${i?Mg(i):""}
  </div>`}function jr(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?l`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Yu(e){return e?l`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Dg(e){let t=Array.isArray(e.badges)?e.badges:[],n=Bt(e.usage),r=Ln(e.usage),s=sn(e.done_at);return l`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${s?l`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Gt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
      ${t.map(o=>l`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${o}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${n.length>0?n.map(o=>l`<span class="worker-usage" title=${o.tooltip}
                >${o.label}</span
              >`):r?l`<span class="worker-usage" title=${ns(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?l`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${vs(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Hn(e){if(e.lane==="done"&&e.done_layout==="three_line")return Dg(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=Bt(e.usage),s=Ln(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?sn(e.done_at):"",d=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",f=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",g=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",w=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,A=e.lane==="done"?"":jr(e.workflow),D=Yu(e.from_id),W=l`<span class="worker-mini__title">${e.title}</span>`,V=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",Y=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",N=n.map(J=>J===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${J}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${J===e.completion_badge&&e.completion_title||""}
          >${J}</span
        >`),M=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",q=r.length>0?r.map(J=>l`<span class="worker-usage" title=${J.tooltip}
              >${J.label}</span
            >`):s?l`<span class="worker-usage" title=${ns(e.usage)}
            >${s}</span
          >`:"",U=o?l`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?l`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",E=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",R=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",X=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ve=e.discard,he=ve?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ve?.attempt_id||""}
          data-operation-id=${ve?.operation?.operation_id||""}
          data-discard-mode=${ve?.confirmation||"unmerged"}
          ?disabled=${ve?!ve.enabled:e.discard_enabled===!1}
          title=${ve?ve.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ve?.label||"\uD3D0\uAE30"}
        </button>`:"",ne=e.stale_work||null,Z=ne?l`${ne.can_resume||ne.can_continue?l`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ne.action_id}
            ?disabled=${ne.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ne.can_backup_fresh?l`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ne.action_id}
            ?disabled=${ne.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ne.can_recheck?l`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ne.action_id}
            ?disabled=${ne.locked}
          >
            다시 확인
          </button>`:""}`:"",Re=ne?l`<div class="worker-mini__stale">
        <strong>${ne.title}</strong>
        <span>${ne.summary}</span>
        <span>${ne.cause}</span>
        ${ne.can_backup_fresh?l`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",$e=e.revise_action?l`<button
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
        </button>`:"",ie=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${Bo(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",ae=Fr(e.dependency_chips,{lane:e.lane}),xe=ys(e),B=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ve?.operation||e.revise_action||ne);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">
            ${g}${w}${D}${W}
          </div>
          <div class="worker-mini__row2">
            ${q}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Gt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${vs(e.work_ms)}</span
                >`:""}${N}${U}
            <span class="worker-mini__actions"
              >${E}${R}${X}${he}</span
            >
            ${qr(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${d}${p}${g}${w}${A}${D}${V}${Y}${N}${f}${M}
            </div>
            <div class="worker-mini__body">${W}${Re}</div>
            ${ae}${ie}${B?l`<div class="worker-mini__foot">
                  ${q}${U}
                  <span class="worker-mini__actions"
                    >${E}${R}${X}${he}${$e}${Z}</span
                  >
                  ${ys(e)}
                </div>`:""}
            ${qr(e)}`:l`<div class="worker-mini__line">
              ${d}${p}${g}${w}${A}${D}${W}${V}${Y}${N}${f}${M}${q}${U}${E}${R}${X}${he}
            </div>
            ${ae}${ie}${xe} ${qr(e)}`}
  </div>`}function _i(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),c=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),d=Fr(e.dependency_chips,{lane:e.lane});return l`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?l`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?l`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r?l`<span
            class="ctl-chip worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >⛔ worker-ineligible</span
          >`:""}
      ${jr(a)}${Yu(e.from_id)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${a?so(a,e.status):""}${d}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${Bo(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?l`<div class="worker-card__place-menu">
            ${t.lanes.map(p=>l`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${p.id}
                  title="${p.label} 대기 맨 뒤에 추가"
                >
                  <span>${p.label}</span>
                  <span class="worker-card__place-count">${p.count}</span>
                </button>`)}
            <button
              type="button"
              class="worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:l`${e.reason?l`<span
                  class="worker-card__reason${c?" worker-card__reason--danger":""}"
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
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":i?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${qr(e)}
  </div>`}function fn(e){let t=!!e.collapsible&&!!e.collapsed,n=l`<span
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
          ${n}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:l`<header class="worker-pane__hd">
          ${n}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":l`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?l`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(r=>e.lane==="candidate"?_i(r,e.place_menu):Hn(r))}
          </div>`}
  </section>`}var Zu={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Qu={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Xu(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function mi(e){for(let t of Xu(e))if(Object.hasOwn(Zu,t))return Zu[t];return null}function gi(e){let t=null;for(let n of Xu(e))Object.hasOwn(Qu,n)&&(t=Qu[n]);return t}function Uo(e){let t=mi(e),n=gi(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Ju(e,t){let n=mi(e)??mi(t),r=gi(t)??gi(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var ed=160;function Ng(e){return e.length>ed?`${e.slice(0,ed)}\u2026`:e}function qg(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${Ng(e.command)}</code>`:""}
  </div>`}function Fg(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function jg(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function td(e){let t=e.failure?Uo(e.failure.reason):"";return l`<div class="worker-banners">
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
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${qg(e.failure.cause_detail)}
          ${Fg(e.failure.reason)}
          ${ys({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Bg(e){return e?l`${e.repo?l`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?l`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}var Ug=new Set(["codex-runner"]);function Wg(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(g=>g&&!(typeof g.agent_type=="string"&&Ug.has(g.agent_type))),c=i.filter(g=>g&&g.state==="live"),d=i.filter(g=>g&&g.state!=="live"),p=Fr(e.dependency_chips,{lane:"running"}),f=r?sn(r.updated_at,t):"";return l`${o?l`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?l`<span class="rtile__activity-age"
              >${sn(a,t)}</span
            >`:""}
      </div>`:f?l`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">갱신 ${f}</span>
        </div>`:""}${c.length>0||d.length>0?l`<div class="rtile__legs">
        ${c.map(g=>l`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${g.label}</span
            >`)}${d.length>0?l`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${d.map(g=>g.label).join(", ")}`}
              >위임 완료 ${d.length}</span
            >`:""}
      </div>`:""}${p}`}function hi(e,t,n=null,r={}){let s=e.kind==="session",o=e.failed===!0,a=!!e.paused,i=o?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?jg(t-e.started_at):"\u2014",c=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=Jr(e),p=Bt(e.usage),f=Ln(e.usage),g=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,w=e.base_exception||null,A=e.landing,D=e.attempt_id&&e.attempt_id===n,W=r.monitor||null,V=Bg(W),Y=Wg(W,t,a,s?{updated_at:e.updated_at??null}:null),N=s&&e.workflow?.chips?.exec_receipt||null,M=N?l`<div class="rtile__meta">
        <span
          class="ctl-chip ctl-chip--exec-receipt"
          title=${`exec_receipt ${Tn(N)}`}
          >${`${N.kind}:${oo(N)}`}</span
        >
      </div>`:"",q=s?"":qr(e),U=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${D?" rtile--sel":""}${a?" rtile--paused":""}${o?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${jr(e.workflow)}${V}${d?l`<span class="rtile__resumed" title=${d}>↻</span>`:""}
      ${s?l`${typeof e.started_at=="number"?l`<span class="rtile__elapsed">${i}</span>`:""}<span
              class="rtile__session-badge"
              title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
              >세션</span
            >`:l`<span class="rtile__elapsed">${i}</span>`}
      ${s?"":o?l`<button
                type="button"
                class="rtile__resume"
                ?disabled=${e.resume_eligible===!1}
                title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                aria-label="이어하기"
              >
                ↻ 이어하기
              </button>
              ${U}
              <button
                type="button"
                class="rtile__dismiss"
                title="실패 알림 닫기 — 레인에는 남습니다"
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
              ${a?l`<button
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
              ${U}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${Y}${e.rollup?ro(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Ea}):""}
    ${A?l`<div class="rtile__landing">
          <span
            class="merge-step${A.failed?" merge-step--failed":""}"
            style=${`--progress: ${A.percent}%`}
            >${A.label}${A.index>0?l`<span class="merge-step__n"
                  >${A.index}/${A.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${s?M:c||p.length>0||f||g||w?l`<div class="rtile__meta">
            ${g?l`<span class="worker-mini__badge">${g}</span>`:""}
            ${w?l`<span
                  class="worker-mini__badge"
                  title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                  >${w}</span
                >`:""}
            ${Bo(e.exec_chips)}
            ${p.length>0?p.map(E=>l`<span class="worker-usage" title=${E.tooltip}
                      >${E.label}</span
                    >`):f?l`<span
                    class="worker-usage"
                    title=${ns(e.usage)}
                    >${f}</span
                  >`:""}
          </div>`:""}
    ${q} ${ys(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${o||a?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function bi(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>hi(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var yi=new Set(["unavailable","not_applicable"]);function Gn(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function nd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Vn(e,t){return t===null?null:`${zn[e]}: ${t.display} (${Io[t.source]})`}function vi(e){return e.filter(t=>t!==null).join(`
`)}function Wo(e){if(typeof e!="object"||e===null)return null;let t=ir(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:vi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(zn.orchestration_model,e.model),n(zn.orchestration_effort,e.effort),n(zn.orchestration_speed,e.speed)])}}function dr(e,t){let n=Gn(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Gn(e,"orchestration_effort"),s=Gn(e,"orchestration_speed"),o=nd([vn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:vi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Vn("orchestration_model",n),Vn("orchestration_effort",r),Vn("orchestration_speed",s)])}}function zg(e,t){return e===null||e.value===null||yi.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Hg(e){return e===null||yi.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Gg(e){return e===null?null:e.value==="auto"?"auto":yi.has(e.resolution)?null:e.display}function Kn(e,t){if(typeof e!="object"||e===null)return null;let n=Gn(e,"impl_dispatch"),r=Gn(e,"impl_runtime"),s=Gn(e,"impl_model"),o=Gn(e,"impl_effort"),a=Gn(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":nd([zg(r,t??null),Hg(s),Gg(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:vi(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Vn("impl_dispatch",n),Vn("impl_runtime",r),Vn("impl_model",s),Vn("impl_effort",o),Vn("impl_speed",a)])}}var tn="",Vg=["impl_runtime","impl_model","impl_effort"],Kg=5,zo=1;function Nn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ho(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(P=>ue(P,"error",4e3)),o={},a={},i=[],c=!1,d=null,p={},f="",g="",w=!1,A=!1,D=!1,W=null,V=!1;function Y(){let P=t.queue?t.queue():null;return Nn(P)?P:null}function N(){let P=Y();return P?P.runner_catalog:null}function M(){let P=Y();return P&&Nn(P.execution_defaults)?P.execution_defaults:null}function q(){let P=t.implPresetStore?.get();return Nn(P)&&Array.isArray(P.presets)?P:null}function U(){return r===null?{}:{root_dir:r}}async function E(P,H){return V||!n?null:await n(P,H)}function R(P){P&&Nn(P.queue)&&t.onQueueAdopt?.(P.queue)}async function X(P,H){let ee=Y();if(!ee||V)return null;let Q=await E(P,{...H,...U(),expected_revision:ee.revision});if(R(Q),r!==null&&Q&&Q.conflict){let Pe=Q.queue&&typeof Q.queue.revision=="number"?Q.queue.revision:Y()?.revision??ee.revision;Q=await E(P,{...H,...U(),expected_revision:Pe}),R(Q)}return Q}async function ve(){c=!0,we();try{let P=await E("get-session-defaults",{...U()});o=Nn(P?.values)?{...P.values}:{},a={...o},i=Array.isArray(P?.warnings)?P.warnings:[]}catch(P){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}finally{c=!1,we()}}async function he(){let P=wu(o,a);if(Object.keys(P).length!==0){try{let H=await E("set-session-defaults",{values:P,...U()});o=Nn(H?.values)?{...H.values}:{},a={...o},i=Array.isArray(H?.warnings)?H.warnings:[]}catch(H){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}we()}}function ne(P,H){if(Vg.includes(P)){$e(P,H);return}H===tn?delete a[P]:a[P]=H,we(),he()}function Z(){let P=Qe().orchestration_model,H=en({global:{orchestration_model:P??void 0},execution_defaults:M(),runner_catalog:N()}).orchestration_model.value;return H?vn(N(),H):null}function Re(P,H){typeof H=="string"&&H.length>0?a[P]=H:delete a[P]}function $e(P,H){let ee=H===tn?void 0:H,Q=yu({impl_runtime:P==="impl_runtime"?ee:a.impl_runtime,impl_model:P==="impl_model"?ee:a.impl_model,impl_effort:P==="impl_effort"?ee:a.impl_effort},N(),Z());Re("impl_runtime",Q.impl_runtime),Re("impl_model",Q.impl_model),Re("impl_effort",Q.impl_effort),we(),he()}async function ie(){let P=Y();if(!P)return;let H={orchestration_model:P.orchestration_model??null,orchestration_effort:P.orchestration_effort??null,orchestration_speed:P.orchestration_speed??null},ee=ku(H,{...H,...p});if(Object.keys(ee).length!==0){try{let Q=await X("worker-queue-set-orchestration-defaults",{values:ee});if(Q&&Q.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}p={}}catch(Q){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}we()}}function ae(P,H){p[P]=H===tn?null:H,we(),ie()}function xe(P){if(d=P,!P){we();return}let H=N(),ee=Qe(),Q=ee.orchestration_model;Q&&!hs(H,P).includes(Q)&&(p.orchestration_model=null,Q=null);let Pe=ee.orchestration_effort;Pe&&!ii(H,P,Q||ln).includes(Pe)&&(p.orchestration_effort=null),we(),ie()}async function B(P){if(!(!Y()||P<zo)){try{await X("worker-queue-set-slots",{slots:P})}catch(H){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}we()}}async function J(P){if(!(!Y()||P<zo||P>Kg)){try{await X("worker-queue-set-serial-lane-count",{count:P})}catch(H){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}we()}}async function le(P,H){let ee=P==="auto_advance"?"worker-automation-toggle":P==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await X(ee,{on:H})}catch(Q){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}we()}function Ae(){let P={},H=Qe();for(let ee of To){let Q=Dn.includes(ee)?H[ee]:a[ee];typeof Q=="string"&&Q.length>0&&(P[ee]=Q)}return P}async function Se(){let P=q();if(!P)return;let H=Ae();if(Object.keys(H).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ee=(P.presets||[]).find(Pe=>Pe.id===f),Q=g.trim()||(ee?ee.name:"");if(!Q){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Pe=ee?await E("impl-preset-update",{expected_revision:P.revision,id:ee.id,name:Q,settings:H}):await E("impl-preset-create",{expected_revision:P.revision,name:Q,settings:H});if(Pe&&Pe.applied){if(g="",!ee&&Array.isArray(Pe.presets)){let tt=Pe.presets.find(st=>st.name===Q);f=tt?tt.id:f}we()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),we()}catch(Pe){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Pe instanceof Error?Pe.message:String(Pe)}`)}}async function Oe(){let P=q();if(!(!P||f.length===0))try{let H=await E("impl-preset-delete",{expected_revision:P.revision,id:f});H&&H.applied?(f="",we()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),we())}catch(H){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}}function ge(P){o=Nn(P.values)?{...P.values}:{},a={...o},i=Array.isArray(P.warnings)?P.warnings:[],Nn(P.queue)&&(t.onQueueAdopt?.(P.queue),p={})}async function it(){let P=q(),H=Y();if(!P||!H||f.length===0)return;let ee=Q=>({preset_id:f,expected_revision:P.revision,expected_queue_revision:Q,...U()});try{let Q=await E("apply-impl-preset-global",ee(H.revision));if(Q&&Q.applied&&ge(Q),r!==null&&Q&&Q.queue_applied===!1){let Pe=Q.queue&&typeof Q.queue.revision=="number"?Q.queue.revision:Y()?.revision??H.revision;Q=await E("apply-impl-preset-global",ee(Pe)),Q&&Q.applied&&ge(Q)}Q&&Q.applied?Q.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):Q&&Q.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(Q){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}we()}async function _t(){A=!0,D=!1,we();try{let P=await E("get-worker-system-prompt",{});!P||typeof P!="object"||Array.isArray(P)?D=!0:W=P}catch{D=!0}finally{A=!1,we()}}function C(){if(w=!w,w&&!W){_t();return}we()}function me(){let P=Pr({loading:A,error:D});if(P)return P;if(!W)return"";let H=Array.isArray(W.variants)?W.variants:[];return l`<div class="settings-dialog__sp-body">
      ${W.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${W.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${H.map(ee=>l`<div class="settings-dialog__sp-variant" data-variant=${ee.key}>
            <div class="settings-dialog__sp-cond">${ee.condition}</div>
            ${Mn(ee.label,ee.system_prompt)}
          </div>`)}
    </div>`}function ke(){return l`<section
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
        aria-expanded=${w?"true":"false"}
        @click=${C}
      >
        ${w?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${w?me():""}
    </section>`}function Le(P,H,ee,Q,Pe,tt,st){let Je=Pe[P]??tn,vt=li(P,ee,Pe,M(),N(),st),mt=vt.options.find(ut=>ut.value===Je),ot=Je===tn?vt.full_value:mt?.full_value;return l`<select
        class=${Je===tn?"settings-dialog__unset":""}
        data-key=${P}
        aria-label=${H}
        title=${ot||""}
        ?disabled=${tt===!0||vt.disabled}
        .value=${ur(String(Je))}
        @change=${ut=>Q(P,String(ut.target.value))}
      >
        <option value=${tn} ?selected=${Je===tn}>
          ${vt.unset_label}
        </option>
        ${vt.options.map(ut=>l`<option
              value=${ut.value}
              title=${ut.full_value||""}
              ?selected=${ut.value===Je}
            >
              ${ut.label}
            </option>`)}
      </select>
      ${Je===tn?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Me(P,H,ee,Q,Pe,tt=!1,st){return l`<div
      class=${`settings-dialog__row${tt?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${H}</span>
      <span class="settings-dialog__controls">
        ${Le(P,H,ee,Q,Pe,tt,st)}
      </span>
    </div>`}function Be(P,H,ee,Q,Pe){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${H}-on)`}
        ></i>
        ${P}
      </span>
      <span class="settings-dialog__controls">
        ${Le(ee,`${P} \uBAA8\uB378`,Q,ne,a,!1)}
        ${Le(Pe,`${P} effort`,Lo,ne,a,!1)}
      </span>
    </div>`}function z(P,H,ee,Q){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${H}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${Q?" is-on":""}`}
          data-automation=${P}
          aria-pressed=${Q?"true":"false"}
          aria-label=${H}
          @click=${()=>le(P,!Q)}
        >
          ${Q?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ee}</span>
      </span>
    </div>`}function K(P,H,ee,Q){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${H}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${P}>
          <button
            type="button"
            aria-label=${`${H} \uAC10\uC18C`}
            @click=${()=>Q(ee-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ee}</span>
          <button
            type="button"
            aria-label=${`${H} \uC99D\uAC00`}
            @click=${()=>Q(ee+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function De(P){return l`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${P.rows.length>0?`\uBCC0\uACBD ${P.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${P.rows.map(H=>l`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${H.kind}
          >
            <span class="settings-dialog__preset-diff-label">${H.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${H.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${H.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${P.ignored_keys.length>0?l`<div class="settings-dialog__preset-diff-note">
            ${P.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Qe(){let P=Y(),H={};for(let ee of Dn)H[ee]=Object.prototype.hasOwnProperty.call(p,ee)?p[ee]:P&&typeof P[ee]=="string"?P[ee]:null;return H}function We(){let P=N(),H=a.impl_runtime,ee=a.impl_model,Q=q(),Pe=Y(),tt=Qe(),st=hs(P,d),Je=Dr(P,void 0).filter(He=>He!==ln),vt=ii(P,d,tt.orchestration_model||ln).filter(He=>He!==ln),mt=f?(Q?.presets||[]).find(He=>He.id===f):null,ot=mt?vu(Ae(),Nn(mt.settings)?mt.settings:{}):null,ut=Pe&&typeof Pe.slots=="number"?Pe.slots:zo+1,gt=Pe&&typeof Pe.serial_lane_count=="number"?Pe.serial_lane_count:zo,Ve=M()?.supported===!0,Ne=li("workflow_mode",ms,a,M(),P);return l`
      ${i.length>0?l`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${Ve?"":l`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${c?l`<div class="settings-dialog__empty">불러오는 중…</div>`:l`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${ur(f)}
                @change=${He=>{f=String(He.target.value),we()}}
              >
                <option value="" ?selected=${f===""}>
                  실행 프리셋…
                </option>
                ${(Q?.presets||[]).map(He=>l`<option
                      value=${He.id}
                      ?selected=${He.id===f}
                    >
                      ${He.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!ot||ot.rows.length===0}
                @click=${it}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${f?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${ur(g)}
                @input=${He=>{g=String(He.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${f?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Se}
              >
                ${f?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${f.length===0}
                @click=${Oe}
              >
                삭제
              </button>
            </div>
            ${ot?De(ot):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${ur(d||tn)}
                    @change=${He=>{let wt=String(He.target.value);xe(wt===tn?null:wt)}}
                  >
                    <option value=${tn} ?selected=${!d}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${d==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${d==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Me("orchestration_model","\uBAA8\uB378",st,ae,tt)}
              ${Me("orchestration_effort","effort",vt,ae,tt)}
              ${Me("orchestration_speed","\uC18D\uB3C4",_s,ae,tt)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${tn}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>ne("workflow_mode",tn)}
                    >
                      ${Ne.unset_label}
                    </button>
                    ${a.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${ms.map(He=>l`<button
                          type="button"
                          data-mode=${He}
                          aria-pressed=${String(a.workflow_mode===He)}
                          @click=${()=>ne("workflow_mode",He)}
                        >
                          ${He}
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
              ${Be("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",gs,"spec_review_effort")}
              ${Be("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ro,"plan_review_effort")}
              ${Be("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",gs,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Me("impl_runtime","\uC704\uC784 \uB300\uC0C1",Co,ne,a)}
              ${Me("impl_model","\uBAA8\uB378",Dr(P,H),ne,a)}
              ${Me("impl_effort","effort",Nr(P,H,ee),ne,a)}
              ${Me("impl_speed","\uC18D\uB3C4",_s,ne,a)}
              ${Me("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Je,ne,a,!1,{...a,...tt})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${z("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",Pe?.auto_advance===!0)}
              ${z("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",Pe?.auto_merge===!0)}
              ${z("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",Pe?.auto_repair===!0)}
              ${K("slots","\uB3D9\uC2DC \uC2E4\uD589",ut,He=>B(He))}
              ${K("serial-lane-count","\uC9C1\uB82C \uB808\uC778",gt,He=>J(He))}
            </div>
            ${ke()}
          `}
    `}function we(){V||Ze(We(),e)}return{load(){return p={},ve()},render:we,sessionDraft:()=>({...a}),destroy(){V=!0,Ze(l``,e)}}}function ks(e){return l`<svg
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
  </svg>`}function rd(){return ks($r`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function sd(){return ks($r`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function od(){return ks($r`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function ad(){return ks($r`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function id(){return ks($r`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function ld(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function cd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Bt(uo(t));let n={};for(let i of Rn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let d=!1;for(let p of Rn){let f=c[p];typeof f=="number"&&Number.isFinite(f)&&(n[p]+=f,r=!0,d=!0)}if(d){o+=1;let p=c.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Ln(n):null}function wn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Br(e,t){let n=wn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Yg(e,t){if(!wn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function Zg(e){if(!wn(e)||!wn(e.execution_defaults)||!wn(e.runner_catalog)||!wn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=en({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=vn(e.runner_catalog,n.orchestration_model.value??""),s=dr(n,e.runner_catalog),o=Kn(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function ud(e,t){let n=t.notify||(B=>ue(B,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let c=document.createElement("div");c.className="mon2-deck__panel-body",s.append(o,c),e.appendChild(s);let d=null,p=null,f=null,g=new Map;function w(){let B=t.workspacesState?t.workspacesState():[];return Array.isArray(B)?B.filter(J=>wn(J)):[]}function A(B){return w().find(J=>J.root_dir===B)||null}function D(B){return Yg(A(B),g.get(B))}function W(){for(let B of w()){let J=g.get(B.root_dir);J&&typeof J.revision=="number"&&typeof B.revision=="number"&&B.revision>=J.revision&&g.delete(B.root_dir)}}async function V(B,J,le){let Ae=t.transport,Se=D(J);if(!(!Ae||!wn(Se))){try{let Oe=await Ae(B,{...le,root_dir:J,expected_revision:Se.revision});if(wn(Oe?.queue)&&g.set(J,Oe.queue),Oe&&Oe.conflict){let ge=wn(Oe.queue)&&typeof Oe.queue.revision=="number"?Oe.queue.revision:D(J)?.revision;Oe=await Ae(B,{...le,root_dir:J,expected_revision:ge}),wn(Oe?.queue)&&g.set(J,Oe.queue)}}catch(Oe){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Oe instanceof Error?Oe.message:String(Oe)}`)}ie()}}function Y(B){d!==B&&(d=B,t.onFocusChange?.(d),ie())}function N(B){Y(d===B?null:B)}function M(B){if(p===B){U();return}q(),p=B;let J=A(B);a.textContent=`${J?.name||B} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,f=Ho(c,{root_dir:B,queue:()=>D(B),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:le=>{g.set(B,le),ie()}}),f.load(),ie()}function q(){f?.destroy(),f=null}function U(B){q(),p=null,s.hidden=!0,a.textContent="",B!==!0&&ie()}let E=()=>U();i.addEventListener("click",E);function R(B){B.key==="Escape"&&d!==null&&Y(null)}document.addEventListener("keydown",R);function X(B,J){let le=Math.max(J,B,1);return l`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${J}\uAC1C \uC911 ${B}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:le},(Ae,Se)=>Se<B?l`<i class="mon2-deck__slot is-run"></i>`:l`<i class="mon2-deck__slot"></i>`)}
    </span>`}function ve(B){let J=B.auto_advance===!0,le=B.auto_merge===!0;return l`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${J?" is-on":""}`}
        data-act="auto"
        aria-pressed=${J?"true":"false"}
        aria-label=${`${B.name} \uC790\uB3D9\uD654`}
        title=${J?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${J?sd():rd()}
        <span class="mon2-deck__op-label">자동화</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${le?" is-on":""}`}
        data-act="merge"
        aria-pressed=${le?"true":"false"}
        aria-label=${`${B.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${le?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${od()}
        <span class="mon2-deck__op-label">머지</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${p===B.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${p===B.root_dir?"true":"false"}
        aria-label=${`${B.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${id()}
      </button>`}function he(B){let J=Zg(B);return J?l`<div class="mon2-deck__chips">
      ${J.orchestration?l`<span class="mon2-deck__chip" title=${J.orchestration.title}
            >오케 ${J.orchestration.text}</span
          >`:""}
      ${J.worker?l`<span class="mon2-deck__chip" title=${J.worker.title}
            >워커 ${J.worker.text}</span
          >`:""}
    </div>`:""}function ne(B){let J=Br(B,"running"),le=typeof B.slots=="number"?B.slots:1;return l`<div
      class=${`mon2-deck__tile${d===B.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${B.root_dir}
      aria-pressed=${d===B.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${B.root_dir}>${B.name}</span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          title="이 레포의 Worker 탭으로 이동"
        >
          Worker ↗
        </button>
      </div>
      <div class="mon2-deck__slots">
        ${ad()} ${X(J,le)}
        <span class="mon2-deck__counts"
          >${J}/${le} 실행 · 대기 ${Br(B,"queue")} · PR
          ${Br(B,"pr_wait")}${Br(B,"session_active")>0?` \xB7 \uC138\uC158 ${Br(B,"session_active")}`:""}</span
        >
      </div>
      <div class="mon2-deck__ops">${ve(B)}</div>
      ${he(B)}
    </div>`}function Z(B){let J=t.doneItems?t.doneItems():[],le=t.rangeLabel?t.rangeLabel():"",Ae=cd(Array.isArray(J)?J:[]),Se=Oe=>B.reduce((ge,it)=>ge+Br(it,Oe),0);return l`<div
      class="mon2-deck__total"
      title=${`visible \uB808\uD3EC ${B.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${le}`}
    >
      <div class="mon2-deck__total-counts">
        실행 ${Se("running")} · 대기 ${Se("queue")} · PR
        ${Se("pr_wait")}${Se("session_active")>0?` \xB7 \uC138\uC158 ${Se("session_active")}`:""}
        · ${le} 완료
        ${Array.isArray(J)?J.length:0}
      </div>
      ${Ae===null?"":l`<div class="mon2-deck__total-tokens">
            ${typeof Ae=="string"?l`<span
                  class="mon2-deck__tok"
                  title=${ld(le)}
                  >τ ${Ae}</span
                >`:Ae.map(Oe=>l`<span
                      class="mon2-deck__tok"
                      data-provider=${Oe.provider}
                      title=${Oe.tooltip}
                      >τ ${Oe.label}</span
                    >`)}
          </div>`}
    </div>`}function Re(){let B=w();return B.length===0?"":l`<div class="mon2-deck__row">
      ${Z(B)}
      <div class="mon2-deck__strip">
        ${B.map(J=>ne(J))}
      </div>
    </div>`}function $e(){d!==null&&!A(d)&&(d=null,t.onFocusChange?.(null))}function ie(){W(),$e(),p!==null&&!A(p)&&U(!0),Ze(Re(),r),f?.render()}function ae(B){let J=B.target;if(!J||typeof J.closest!="function")return;let le=J.closest("[data-root-dir]");if(!le)return;let Ae=le.getAttribute("data-root-dir")||"",Se=J.closest("[data-act]")?.getAttribute("data-act");if(Se==="worker"){t.gotoWorkerTab?.(Ae);return}if(Se==="auto"){V("worker-automation-toggle",Ae,{on:D(Ae)?.auto_advance!==!0});return}if(Se==="merge"){V("worker-merge-auto-toggle",Ae,{on:D(Ae)?.auto_merge!==!0});return}if(Se==="gear"){M(Ae);return}N(Ae)}function xe(B){if(B.key!=="Enter"&&B.key!==" ")return;let J=B.target;if(!J||typeof J.closest!="function")return;let le=J.closest('[data-root-dir][role="button"]');!le||le!==J||(B.preventDefault(),N(le.getAttribute("data-root-dir")||""))}return r.addEventListener("click",ae),r.addEventListener("keydown",xe),{render:ie,focusRoot:()=>d,panelRoot:()=>p,destroy(){document.removeEventListener("keydown",R),r.removeEventListener("click",ae),r.removeEventListener("keydown",xe),i.removeEventListener("click",E),q(),Ze(l``,r),e.replaceChildren()}}}var Qg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Xg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694";function wi(e,t){return`${e}\0${t}`}function Jg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function eh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function th(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function nh(e,t){let n=new Set(t),r=new Map,s=new Map;for(let i of n){let c=Array.from(new Set((e.get(i)||[]).filter(d=>d!==i&&n.has(d))));r.set(i,c.length);for(let d of c){let p=s.get(d);p?p.push(i):s.set(d,[i])}}let o=[],a=Array.from(n).filter(i=>r.get(i)===0).sort();for(;a.length>0;){let i=a.shift();o.push(i);for(let c of(s.get(i)||[]).slice().sort()){let d=(r.get(c)||0)-1;r.set(c,d),d===0&&a.push(c)}}for(let i of t)o.includes(i)||o.push(i);return o}function rh(e,t){let n=new Set;for(let[a,i]of t)for(let c of i)n.add(wi(a,c));let r=new Map,s=new Map;for(let a of e){let i=wi(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=wi(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function sh(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function oh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ki(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function dd(e,t,n){let r=eh(n.blocked_by_map),s=[],o=null,a=w=>{let A=n.owner_of.get(w);return typeof A!="string"||A.length===0?(o=Jg(w),null):A},i=(w,A)=>{if(o!==null||w===A)return;let D=r.get(w)||[];if(!D.includes(A))return;let W=a(w);W!==null&&(r.set(w,D.filter(V=>V!==A)),s.push({type:"dep-remove",a:w,b:A,root_dir:W}))},c=(w,A)=>{if(o!==null||w===A)return;let D=r.get(w)||[];if(D.includes(A))return;let W=a(w);if(W!==null){if(th(r,A,w)){o=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${w}\uAC00 \uC774\uBBF8 ${A}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}r.set(w,[...D,A]),s.push({type:"dep-add",a:w,b:A,root_dir:W})}},d=()=>{let w=n.lane_order.get(e.lane_id||"")||[],A=new Set(w),D=(r.get(e.bead_id)||[]).filter(V=>A.has(V)),W=w.filter(V=>(r.get(V)||[]).includes(e.bead_id));for(let V of D)i(e.bead_id,V);for(let V of W)i(V,e.bead_id);for(let V of D)for(let Y of W)c(Y,V);return w.filter(V=>V!==e.bead_id)},p=(w,A)=>{let D=n.lane_order.get(w)||[],W=D.indexOf(e.bead_id),V=nh(r,D.filter(q=>q!==e.bead_id)),Y=w.startsWith("pending:")?V.length:Math.max(0,Math.min(V.length,W>=0&&A>W?A-1:A)),N=Y>0?V[Y-1]:null,M=Y<V.length?V[Y]:null;if(N===null){M!==null&&c(M,e.bead_id);return}c(e.bead_id,N),M!==null&&(r.get(M)||[]).includes(N)&&(i(M,N),c(M,e.bead_id))},f=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Qg};if(t.kind==="chain"&&e.kind==="repo-serial")return{refused:Xg};if(e.kind==="chain"&&d(),t.kind==="chain"&&p(t.lane_id,t.marker_index),o!==null)return{refused:o};let g=[];if(t.kind==="candidate")e.kind!=="candidate"&&g.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=sh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")g.push(ki(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let A=n.parallel_rows,D=A[Math.max(0,Math.min(A.length,t.marker_index))];if(!(!!D&&D.bead_id===e.bead_id)&&oh(n,e.root_dir)&&f!==void 0){let V=f>w?w:w-1;V>=0&&V!==f&&g.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:V},root_dir:e.root_dir})}}}else if(t.kind==="chain")e.kind==="candidate"&&g.push(ki(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0));else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(f!==void 0&&t.index!==f){let w=f>t.index?t.index:t.index-1;w>=0&&w!==f&&g.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else g.push(ki(e.bead_id,e.root_dir,t.index,t.lane_id));return{ops:[...rh(s,n.blocked_by_map),...g]}}var pd={running:3,paused:2,failed:1};function fd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let p=t.get(a.bead_id),f=typeof p=="number"&&p>0&&typeof a.finished_at=="number"&&p>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!f&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let p=pd[d.run_state],f=pd[i];if(p>f||p===f&&(d.started_at??0)>(c??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:c})}return{winners:o,resumed_from_ids:r}}function Go(e){return e.replace(/\/+$/,"")}function ah(e,t){let n=Go(e),r=Go(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Vo(e,t){let n=new Set;for(let r of e)for(let s of t){if(!ah(r,s))continue;let o=Go(r),a=Go(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}var _d=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],$s=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ko(e,t){let n=_d.find(s=>s.step===e);if(!n)return null;let r=_d.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function md(e){let t=$s.findIndex(n=>n.step===e);return $s.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function pr(e){let t=$s.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function ih(e){let t=$s.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:$s.length}}function Yo(e){let t=ih(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var xi=new Set(["queued","running","retry_pending","repairing"]),gd=new Set(["failed","succeeded"]),lh={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},xs={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},ch={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:xs.base_containment,child_sweep:xs.child_sweep,branch_cleanup:xs.branch_cleanup,parent_close:xs.parent_close};function uh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function dh(e,t,n){return!["verify","deploy"].includes(e.kind)||![...xi,...gd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function ph(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=d=>d.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function $i(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=lh[s];if(!o)return null;let a=Ko(n,`${r} ${o}`);return a?{...a,active:xi.has(s),failed:s==="failed"}:null}function fh(e){return!e||typeof e!="object"?null:ch[e.step]||null}function As(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=fh(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=uh(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(A=>A&&typeof A=="object"&&dh(A,t,i)).sort(ph):[],d=a?c:[],p=d.find(A=>xi.has(A.state));if(p)return $i(p);if(s)return s.step==="repo_operations"&&c[0]?$i(c[0],!0):null;let f=d.find(A=>gd.has(A.state)?A.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return $i(f);if(r){let A=Ko(r.step,r.label);return A?{...A,active:!0,failed:!1}:null}let g=typeof e.cleanup_cursor=="string"?xs[e.cleanup_cursor]:null;if(!g)return null;let w=Ko(g.step,g.label);return w?{...w,active:!0,failed:!1}:null}function Zo(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function Ai(e,t){return`${e}\0${t}`}function hd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Si(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function _h(e,t){return e==="internal"&&t===void 0}function Ur(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function bd(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Ur(s)})`,location_label:Ur(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Si(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:_h(a,s)}}function yd(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=Ai(i.root_dir,c.id);n.set(d,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(d,[]);for(let p of Array.isArray(c.items)?c.items:[])r.set(p.id,d)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=Ai(i.root_dir,c.id),p=Array.isArray(c.items)?c.items[0]:null,g=!!p&&p.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],w=s.get(d);if(w)for(let A of g){let D=r.get(A);D&&D!==d&&!w.includes(D)&&w.push(D)}}let o=(i,c)=>{let d=new Set,p=[i];for(;p.length>0;){let f=p.pop();if(f===c)return!0;!f||d.has(f)||(d.add(f),p.push(...s.get(f)||[]))}return!1},a=new Map;for(let[i,c]of s){let d=[];for(let p of c){let f=n.get(p);o(p,i)&&f&&d.push(f)}d.length>0&&a.set(i,d)}return a}function vd(e,t){return Ai(e,t)}var wd=1,Ss=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Ti=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Wr={show_blocked:!0,spec:"all"},kd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function mh(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function gh(e,t){let{winners:n,resumed_from_ids:r}=fd(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,c=a.run_state,d=a.started_at,p=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:c,started_at:d,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:dn(e,i.bead_id),can_pause:c==="running"&&p,can_resume:c!=="running"&&p&&!r.has(i.attempt_id)})}return s}function $d(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function At(e){return e&&typeof e=="object"?e:{}}function hh(e,t,n){let r=At(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=g=>en({pin:g,global:a,execution_defaults:s,runner_catalog:o,route:n}),c,d;try{c=i(r),d=i(null)}catch{return null}let p=xd(dr(c,o),dr(d,o)),f=xd(Kn(c,null),Kn(d,null));return p||f?{orchestration:p,worker:f}:null}function xd(e,t){return!e||t&&t.text===e.text?null:e}function bh(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function yh(e,t){let n=t.get(e);return n?{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${Ur(n)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`}:null}function vh(e,t,n){let r=new Map;for(let c of e)r.set(c,Array.from(n.get(c)||[]).filter(d=>e.includes(d)).length);let s=[],o=new Map,a=e.filter(c=>(r.get(c)||0)===0).sort();for(let c of a)o.set(c,0);let i=[...a];for(;i.length>0;){let c=i.shift();s.push(c);let d=Array.from(t.get(c)||[]).filter(f=>e.includes(f)).sort(),p=(o.get(c)||0)+(d.length>1?1:0);for(let f of d){let g=(r.get(f)||0)-1;r.set(f,g);let w=o.get(f);o.set(f,w===void 0?p:Math.min(w,p)),g===0&&i.push(f)}}return{order:s,indent:o,cycle:s.length!==e.length}}function wh(e,t,n){let r=new Map,s=new Map,o=new Set,a=(p,f,g)=>{let w=p.get(f);w?w.add(g):p.set(f,new Set([g]))},i=p=>t.get(p)?.lane==="done";for(let[p,f]of e)if(!i(p))for(let g of f)g===p||i(g)||(o.add(g),o.add(p),a(r,g,p),a(s,p,g));let c=new Set,d=[];for(let p of Array.from(o).sort()){if(c.has(p))continue;let f=[],g=[p];for(c.add(p);g.length>0;){let N=g.pop();f.push(N);for(let M of[...r.get(N)||[],...s.get(N)||[]])c.has(M)||(c.add(M),g.push(M))}if(f.length<2)continue;let w=f.map(N=>t.get(N));if(w.every(N=>!!N&&/^s[1-5]$/.test(N.lane||""))&&w.every(N=>N&&w[0]&&N.root_dir===w[0].root_dir&&N.lane===w[0].lane))continue;let{order:D,indent:W,cycle:V}=vh(f.slice().sort(),r,s),Y=V?f.slice().sort():D;d.push({key:f.slice().sort().join("\0"),cycle:V,nodes:Y.map(N=>{let M=t.get(N);return{id:N,workspace_name:M?M.workspace_name:"",root_dir:M?M.root_dir:"",location_label:M?Ur(M):Ad(N,n),indent:V?0:W.get(N)||0}})})}return d}function Ad(e,t){let n=Si(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Sd(e,t,n){let r=t.get(e);if(!r)return Ad(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Ur(r)}function kh(e,t,n){let r=[];for(let s of n.get(e)||[])s!==e&&t.has(s)&&!r.includes(s)&&r.push(s);return r}function $h(e,t,n,r,s,o,a){let i=(f,g,w,A,D=!1)=>{let W=r.get(f),V=W&&W.lane==="parallel"&&typeof W.position=="number"?W.position-1:null;return{id:f,title:o.get(f)||f,workflow:a.get(f)||null,root_dir:W?W.root_dir:"",workspace_name:W?W.workspace_name:"",seq:g,indent:w,predecessors:A,location_label:Sd(f,r,s),draggable:!D&&V!==null,...V!==null?{queue_index:V}:{}}},c=[];for(let f of e.slice().sort((g,w)=>g.key<w.key?-1:1)){let g=new Set(f.nodes.map(w=>w.id));c.push({lane_id:`chain:${f.key}`,label:"",pending:!1,cycle:f.cycle,rows:f.nodes.map((w,A)=>i(w.id,A+1,f.cycle?0:w.indent,f.cycle?[]:kh(w.id,g,n),f.cycle))})}let d=new Set;for(let f of c)for(let g of f.rows)d.add(g.id);let p=[];return t.forEach((f,g)=>{let w=f&&typeof f.seed=="string"&&f.seed.length>0?f.seed:null;w!==null&&d.has(w)||(p.push(g),c.push({lane_id:`pending:${g}`,label:"",pending:!0,cycle:!1,rows:w===null?[]:[i(w,1,0,[])]}))}),c.forEach((f,g)=>{f.label=`\uC5F0\uACB0 ${g+1} \xB7 \uB808\uD3EC \uAC04`}),{chain_lanes:c,pending_lanes_kept:p}}function xh(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Ah(e,t,n,r,s){let o=new Map;for(let i of[...e.running,...e.queue,...e.runnable]){if(!t.has(i.root_dir))continue;let{scope:c,state:d}=xh(i,t,n);if(d!==void 0&&(i.scope_state=d),c.length===0)continue;let p=o.get(i.root_dir);p?p.push({item:i,scope:c}):o.set(i.root_dir,[{item:i,scope:c}])}let a=(i,c,d)=>{let p={id:c.id,title:c.title,location_label:Sd(c.id,r,s),prefixes:d};i.overlap_chips?i.overlap_chips.push(p):i.overlap_chips=[p]};for(let i of o.values())for(let c=0;c<i.length;c+=1)for(let d=c+1;d<i.length;d+=1){let p=Vo(i[c].scope,i[d].scope);p.length!==0&&(a(i[c].item,i[d].item,p),a(i[d].item,i[c].item,p))}}function Ei(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Qo(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ci(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...Wr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Ss.some(C=>C.value===n.candidate_sort)?n.candidate_sort:"repo_spec",c=new Map;for(let C of s)C&&typeof C.root_dir=="string"&&c.set(C.root_dir,C);let d=[],p=[],f=[],g=[],w=[],A=[],D=new Map,W=new Map,V=new Map,Y=new Map,N=new Map,M=new Map,q=new Map,U=new Map,E=new Map;for(let C of r){if(!C||typeof C.root_dir!="string")continue;let me=C.root_dir,ke=C.name||me,Le=c.get(me),Me=Le&&typeof Le.revision=="number"?Le.revision:typeof C.revision=="number"?C.revision:0,Be=At(C.attempts),z=At(C.bead_titles);for(let[k,L]of Object.entries(z))typeof L=="string"&&L.length>0&&U.set(k,L);let K=At(C.bead_times),De=At(C.pr_observations),Qe=At(C.admission),We=At(C.revise_parked),we=At(C.merge_queue_state),P=At(C.cleanup_failed),H=At(C.discard_operations),ee=At(C.bead_blocked_by);Object.hasOwn(C,"bead_scope")&&M.set(me,At(C.bead_scope));let Q=At(C.bead_workflow);for(let[k,L]of Object.entries(Q))L&&typeof L=="object"&&E.set(k,L);let Pe=At(C.pr_activity),tt=Array.isArray(C.repo_operations)?C.repo_operations:[],st=Array.isArray(C.merge_queue)?C.merge_queue:[],Je=new Set(st.filter(k=>k&&typeof k.bead_id=="string").map(k=>k.bead_id)),vt=new Map(st.filter(k=>k&&typeof k.bead_id=="string").map(k=>[k.bead_id,k])),mt=Array.isArray(C.queue)?C.queue:[],ot=(Array.isArray(C.serial_lanes)?C.serial_lanes:[]).filter(k=>k&&/^s[1-5]$/.test(k.id)&&Array.isArray(k.entries)),ut=At(C.lane_states),gt=typeof C.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(C.serial_lane_count))):Math.min(5,ot.length);V.set(me,gt),Y.set(me,mt.length);let Ve=new Map(ot.map(k=>[k.id,k])),Ne=new Map;for(let k of ot)for(let L of k.entries)L&&typeof L.bead_id=="string"&&Ne.set(L.bead_id,k.id);for(let[k,L]of Object.entries(ee))Array.isArray(L)&&N.set(k,L.filter(oe=>typeof oe=="string"&&oe.length>0));let He=Array.isArray(C.done)?C.done:[];for(let k of He)k&&typeof k.bead_id=="string"&&A.push({id:k.bead_id,root_dir:me,workspace_name:ke});let wt=new Map;for(let k of He)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&wt.set(k.bead_id,k.added_at);let lt=k=>({id:k,title:z[k]||k,root_dir:me,workspace_name:ke,expected_revision:Me,draggable:!1,...At(K[k]).created_at?{created_at:At(K[k]).created_at}:{},...At(K[k]).updated_at?{updated_at:At(K[k]).updated_at}:{}}),G=new Set;for(let[k,L]of gh(Be,wt))G.add(k),p.push({...lt(k),lane:"running",...Ne.has(k)?{serial_lane_id:Ne.get(k)}:{},attempt_id:L.attempt_id,run_state:L.run_state,status:L.status||void 0,workflow:Q[k]||null,can_pause:L.can_pause,can_resume:L.can_resume,started_at:L.started_at,last_event_at:L.last_event_at,last_activity:L.last_activity,legs:L.legs,runner:L.runner,model:L.model,effort:L.effort,speed:L.speed,resumed_from:L.resumed_from,continuation_mode:L.continuation_mode,usage:L.usage,exec_chips:{orchestration:Wo(L),worker:null},discard:Sn(H,k,{attempt_id:L.attempt_id}),badges:L.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:L.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:L.run_state==="failed"});for(let k of Array.isArray(C.session_active)?C.session_active:[]){let L=k&&k.bead_id;typeof L!="string"||G.has(L)||(G.add(L),Array.isArray(k.blocked_by)&&k.blocked_by.length>0&&N.set(L,k.blocked_by.filter(oe=>typeof oe=="string"&&oe.length>0)),typeof k.title=="string"&&k.title.length>0&&U.set(L,k.title),k.workflow&&typeof k.workflow=="object"&&E.set(L,k.workflow),p.push({...lt(L),title:k.title||z[L]||L,lane:"running",kind:"session",status:"in_progress",started_at:Ei(k.started_at)??Ei(k.updated_at)??void 0,updated_at:Ei(k.updated_at)??void 0,workflow:k.workflow||null,labels:Array.isArray(k.labels)?k.labels:[],spec_id:typeof k.spec_id=="string"?k.spec_id:"",blocked:k.blocked===!0,...Array.isArray(k.blocked_by)?{blocked_by:k.blocked_by.filter(oe=>typeof oe=="string"&&oe.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,badges:[],alert:!1}))}for(let k of Array.isArray(C.pr_wait)?C.pr_wait:[]){let L=k&&k.bead_id;if(typeof L!="string"||G.has(L))continue;G.add(L);let oe=At(De[L]),de=At(oe.pr),re=oe.gate?At(oe.gate):null,be=Je.has(L),ct=vt.get(L)?.continuation_action||null,Xe=!!ct&&ct.continuation===null,Ye=we.active===L,bt=k.external===!0,St=P[L]||null,yt=At(Pe[L]),Ct=As({bead_id:L,merge_sha:k.merge_sha,cleanup_cursor:k.cleanup_cursor,merge_progress:yt.merge_progress||null,cleanup_failed:St,repo_operations:tt}),zt=Zo(Ct),Nt=!!re&&re.base_badge==="\uCDA9\uB3CC",Mt=!!St&&["child_sweep","branch_cleanup","parent_close"].includes(St.step)&&!!re&&re.tier==="merged",Ft=bt&&!!St&&!!re&&re.tier==="merged",Lt=!!re&&["closed_unmerged","review","undecidable"].includes(re.tier),Ue=Sn(H,L,{external:bt,merge_active:Ye||Ct?.step==="merge",merge_queued:be,cleanup_active:zt,merged:!!St||re?.tier==="merged"}),Ut=!!Ue.operation;f.push({...lt(L),lane:"pr_wait",workflow:Q[L]||null,pr_number:typeof de.number=="number"?de.number:null,pr_url:typeof de.url=="string"?de.url:void 0,external:bt,usage:dn(Be,L),merge_step:Ct,badges:Xe?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ct?[re?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:St?[pr(St.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${pr(St.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof re?.gate_badge=="string"&&re.gate_badge.length>0?[re.gate_badge]:[],alert:Ct?Ct.failed===!0:!!St||Lt,reason:St&&Ct?.active!==!0?Yo(St.step):"PR \uB300\uAE30",merge_action:re?.tier==="merged"&&!Mt&&!Ft?!1:!be||Xe,merge_enabled:!Ut&&(Xe||re?.enabled===!0||Nt||Mt||Ft),merge_label:Xe?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ft||Mt?"\uC815\uB9AC \uC7AC\uAC1C":Nt&&!Mt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Xe?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ut?Ue.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ue.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ue.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Ft?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Mt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Nt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":re?.enabled===!0?`\uBA38\uC9C0 (${re.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${re?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:be&&!Xe,cancel_enabled:!Ye,continuation_mismatch:ct?.mismatch||null,discard:Ue,discard_action:Ue.action,discard_enabled:Ue.enabled,discard_title:Ue.title})}let fe=(k,L,oe,de)=>{let re=k&&k.bead_id;if(typeof re!="string"||G.has(re))return null;G.add(re);let be=We[re],ct=Sn(H,re),Xe=ct.operation?ct:null,Ye={...lt(re),lane:L,workflow:Q[re]||null,draggable:!Xe,discard:Xe||void 0,reason:$d(Qe,re),seq:oe+1,queue_position:oe+1,queue_index:oe,queue_length:de,badges:be?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!be,revise_action:!!be,revise_enabled:!!be&&!Xe,revise_title:be?be.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${be.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(ee,re)&&(Ye.blocked_by=Array.isArray(ee[re])?ee[re].filter(bt=>typeof bt=="string"&&bt.length>0):[]),Ye};for(let k=0;k<mt.length;k++){let L=fe(mt[k],"queue",k,mt.length);if(!L)continue;g.push(L);let oe=D.get(me);oe?oe.push(L):D.set(me,[L])}let qe=k=>{let L=f.find(re=>re.id===k&&re.root_dir===me);if(L)return{id:k,title:L.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let oe=p.find(re=>re.id===k&&re.root_dir===me),de=oe&&oe.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":oe&&oe.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:k,title:oe?oe.title:lt(k).title,badge:de}},S=[];for(let k=0;k<Math.max(gt,ot.length);k++){let L=`s${k+1}`,oe=Ve.get(L),de=oe&&Array.isArray(oe.entries)?oe.entries:[],re=[];for(let Xe=0;Xe<de.length;Xe++){let Ye=fe(de[Xe],L,Xe,de.length);Ye&&(re.push(Ye),g.push(Ye))}let be=At(ut[L]),ct=Array.isArray(be.occupied_by)?be.occupied_by.filter(Xe=>typeof Xe=="string"):[];re.length===0&&ct.length===0&&(gt<=1||k>=gt)||S.push({id:L,index:k,items:re,raw_length:de.length,occupied_by:ct,occupants:ct.map(Xe=>qe(Xe)),corrections:Array.isArray(be.corrections)?be.corrections.length:0,cycle:be.cycle===!0,...re.length===0&&ct.length===0?{empty:!0}:{}})}W.set(me,S);let O=Array.from({length:gt},(k,L)=>{let oe=`s${L+1}`,de=Ve.get(oe),re=de&&Array.isArray(de.entries)?de.entries:[],be=At(ut[oe]);return{id:oe,index:re.length,length:re.length,occupied_by:Array.isArray(be.occupied_by)?be.occupied_by.filter(ct=>typeof ct=="string"):[]}});for(let k of Array.isArray(C.runnable)?C.runnable:[]){let L=k&&k.bead_id;if(typeof L!="string"||G.has(L))continue;G.add(L);let oe=k.workflow&&typeof k.workflow=="object"?k.workflow:null,de=oe&&typeof oe.route=="string"&&oe.route||(typeof k.route=="string"?k.route:null),re=hh(At(Le),k.exec_pins,de);Array.isArray(k.blocked_by)&&k.blocked_by.length>0&&N.set(L,k.blocked_by.filter(be=>typeof be=="string"&&be.length>0)),typeof k.title=="string"&&k.title.length>0&&U.set(L,k.title),oe&&E.set(L,oe),Array.isArray(k.scope)&&q.set(L,k.scope.filter(be=>typeof be=="string"&&be.length>0)),d.push({...lt(L),title:k.title||z[L]||L,lane:"runnable",draggable:!0,reason:$d(Qe,L),created_at:k.created_at??void 0,updated_at:k.updated_at??void 0,status:typeof k.status=="string"?k.status:void 0,labels:Array.isArray(k.labels)?k.labels:[],spec_id:typeof k.spec_id=="string"?k.spec_id:"",workflow:oe||(de?{route:de,chips:{route:de}}:null),...re?{exec_chips:re}:{},blocked:k.blocked===!0,...Array.isArray(k.blocked_by)?{blocked_by:k.blocked_by.filter(be=>typeof be=="string"&&be.length>0)}:{},place_index:mt.length,place_lanes:O})}for(let k of He){let L=k&&k.bead_id;if(typeof L!="string"||G.has(L)||(G.add(L),o!==void 0&&typeof k.added_at=="number"&&k.added_at<o))continue;let oe=mh(Be,L),de=oe&&typeof oe.done_kind=="string"?oe.done_kind:null;w.push({...lt(L),lane:"done",done:!0,done_layout:"three_line",usage:dn(Be,L),work_ms:qo(Be,L),done_at:typeof k.added_at=="number"?k.added_at:void 0,done_kind:de,badges:de&&kd[de]?[kd[de]]:[]})}}let R=new Map;s.forEach((C,me)=>{C&&typeof C.root_dir=="string"&&R.set(C.root_dir,me)});let X=n&&n.running_sort==="repo"?"repo":"started";p.sort((C,me)=>{let ke=C.kind==="session",Le=me.kind==="session";if(ke!==Le)return ke?1:-1;if(ke&&Le){let z=Qo(me.updated_at)-Qo(C.updated_at);return z!==0?z:C.id.localeCompare(me.id)}if(X==="repo"){let z=R.get(C.root_dir)??Number.MAX_SAFE_INTEGER,K=R.get(me.root_dir)??Number.MAX_SAFE_INTEGER;if(z!==K)return z-K}let Me=typeof C.started_at=="number"&&Number.isFinite(C.started_at)?C.started_at:null,Be=typeof me.started_at=="number"&&Number.isFinite(me.started_at)?me.started_at:null;return Me!==null&&Be!==null&&Me!==Be?Me-Be:Me===null&&Be!==null?1:Me!==null&&Be===null?-1:C.id.localeCompare(me.id)}),w.sort((C,me)=>(me.done_at??0)-(C.done_at??0));let ve=s.length>0?s:r.map(C=>({root_dir:C&&C.root_dir,name:C&&C.name,auto_advance:C&&C.auto_advance,auto_merge:C&&C.auto_merge,slots:C&&C.slots,revision:C&&C.revision,runner_catalog:C&&C.runner_catalog})),he=new Set(d.map(C=>C.root_dir)),ne=[];for(let C of ve){if(!C||typeof C.root_dir!="string")continue;let me=D.get(C.root_dir)||[],ke=W.get(C.root_dir)||[];!(me.length>0||ke.some(Me=>Me.items.length>0||Me.occupied_by.length>0))&&!he.has(C.root_dir)||ne.push({root_dir:C.root_dir,name:C.name||C.root_dir,auto_advance:C.auto_advance===!0,auto_merge:C.auto_merge===!0,slots:typeof C.slots=="number"&&C.slots>=wd?C.slots:wd,revision:typeof C.revision=="number"?C.revision:0,runner_catalog:At(C.runner_catalog),items:me,sublanes:{parallel:me,serial:ke},serial_lane_count:V.get(C.root_dir)||0,raw_queue_length:Y.get(C.root_dir)||0})}let Z={runnable:d,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:i==="updated_flat",queue:g,queue_groups:ne,running:p,pr_wait:f,done:w,chains:[],parallel_rows:[],chain_lanes:[],parallel_raw_length:Object.fromEntries(Y),owner_of:{},pending_lanes_kept:[]},Re=hd(Z);for(let C of A)Re.has(C.id)||Re.set(C.id,{root_dir:C.root_dir,workspace_name:C.workspace_name,lane:"done",state:"done"});let $e=new Map;for(let[C,me]of N)for(let ke of me){let Le=$e.get(ke);Le?Le.includes(C)||Le.push(C):$e.set(ke,[C])}for(let C of[...Z.queue,...Z.runnable]){if(!Object.hasOwn(C,"blocked_by"))continue;let me=Re.get(C.id);C.blockers=(C.blocked_by||[]).map(ke=>bd(ke,me,Re,s)),C.blocker_warnings=C.blockers.filter(ke=>ke.missing_internal).map(ke=>`\u26A0 \uC120\uD589 ${ke.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),C.blocker_warnings.length>0&&(C.alert=!0)}for(let C of[...Z.queue,...Z.runnable,...Z.running,...Z.pr_wait]){let me=C.lane==="running"||C.lane==="pr_wait"?[]:(C.blockers||[]).map(bh),ke=[];for(let Be of $e.get(C.id)||[]){let z=yh(Be,Re);z&&ke.push(z)}let Le=C.lane==="running"||C.lane==="pr_wait"?[]:C.blocker_warnings||[];if(me.length===0&&ke.length===0&&Le.length===0)continue;let Me={predecessors:me,successors:ke,warnings:Le};C.dependency_chips=Me}Ah(Z,M,q,Re,s),Z.chains=wh(N,Re,s);let ie=yd(Z.queue_groups);for(let C of Z.queue_groups)for(let me of C.sublanes.serial){let ke=ie.get(vd(C.root_dir,me.id));ke&&(me.cross_wait_peers=ke)}let ae=$h(Z.chains,Array.isArray(n?.pending_lanes)?n.pending_lanes:[],N,Re,s,U,E);Z.chain_lanes=ae.chain_lanes,Z.pending_lanes_kept=ae.pending_lanes_kept;let xe=new Map;for(let C of[...Z.running,...Z.queue,...Z.runnable])xe.has(C.id)||xe.set(C.id,C);let B=new Set;for(let C of Z.chain_lanes)for(let me of C.rows){B.add(me.id);let ke=xe.get(me.id);ke&&(ke.overlap_chips&&(me.overlap_chips=ke.overlap_chips),ke.scope_state&&(me.scope_state=ke.scope_state))}let J=[];for(let C of D.values())for(let me of C)B.has(me.id)||J.push(me);J.sort((C,me)=>{let ke=C.workspace_name.localeCompare(me.workspace_name);return ke!==0?ke:(C.queue_index??0)-(me.queue_index??0)}),Z.parallel_rows=J;let le={};for(let[C,me]of Re)typeof me.root_dir=="string"&&me.root_dir.length>0&&(le[C]=me.root_dir);Z.owner_of=le;let Ae=Z.runnable.length,Se=Z.runnable;a.show_blocked||(Se=Se.filter(C=>C.blocked!==!0));let Oe=Se.length;a.spec==="with"?Se=Se.filter(C=>!!C.spec_id):a.spec==="without"&&(Se=Se.filter(C=>!C.spec_id)),Z.runnable_hidden={blocked:Ae-Oe,spec:Oe-Se.length};let ge=(C,me)=>{let ke=Qo(me.updated_at)-Qo(C.updated_at);return ke!==0?ke:C.id.localeCompare(me.id)},_t=i==="repo_spec"?(C,me)=>{let ke=C.spec_id?0:1,Le=me.spec_id?0:1;return ke!==Le?ke-Le:ge(C,me)}:ge;if(i==="updated_flat")Z.runnable=Se.slice().sort(ge),Z.runnable_sections=[];else{let C=new Map;for(let Le of Se){let Me=C.get(Le.root_dir);Me?Me.push(Le):C.set(Le.root_dir,[Le])}let me=[],ke=[];for(let Le of ve){if(!Le||typeof Le.root_dir!="string")continue;let Me=(C.get(Le.root_dir)||[]).slice().sort(_t);C.delete(Le.root_dir),Me.length!==0&&(me.push({root_dir:Le.root_dir,name:Le.name||Le.root_dir,items:Me.map(Be=>({...Be,workspace_name:""}))}),ke.push(...Me))}for(let[Le,Me]of C){let Be=Me.slice().sort(_t);me.push({root_dir:Le,name:Be[0]?.workspace_name||Le,items:Be.map(z=>({...z,workspace_name:""}))}),ke.push(...Be)}Z.runnable=ke,Z.runnable_sections=me}return Z}var Ed="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Td(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Cd(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Od="bdui.monitor.done-range",Pd="bdui.monitor.running_sort",Md="bdui.monitor.candidate_sort",Dd="beads-ui.monitor.candidate-filter",Nd="beads-ui.monitor.sections";function Sh(){try{let e=window.localStorage.getItem(Dd);if(!e)return{...Wr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Wr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Wr.show_blocked,spec:Ti.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Wr}}}function Rd(e){try{window.localStorage.setItem(Dd,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Eh(){try{let e=window.localStorage.getItem(Md);return Ss.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Th(e){try{window.localStorage.setItem(Md,e)}catch{}}function Ch(){try{let e=window.localStorage.getItem(Nd);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Ld(e){try{window.localStorage.setItem(Nd,JSON.stringify(e))}catch{}}function Rh(){try{let e=window.localStorage.getItem(Od);return un(e)?e:rn}catch{return rn}}function Lh(e){try{window.localStorage.setItem(Od,e)}catch{}}function Ih(){try{return window.localStorage.getItem(Pd)==="repo"?"repo":"started"}catch{return"started"}}function Oh(e){try{window.localStorage.setItem(Pd,e)}catch{}}var qd="tab:monitor:pipeline",Ph=1e3,Mh=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Id="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Dh(e){return e>=1&&e<=Id.length?Id[e-1]:`(${e})`}function Fd(e,t){let n=Et("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,c=t.router,d=t.now||(()=>Date.now()),p=t.confirm||(b=>typeof globalThis.confirm!="function"||globalThis.confirm(b)),f=Rh(),g=Ih(),w=Sh(),A=Eh(),D=Ch(),W=null,V=null,Y=null,N=[],M=null;function q(){let b=jn.find(h=>h.value===f);return b?b.label:""}let U=document.createElement("div");U.className="mon",e.appendChild(U);let E=document.createElement("div");E.className="mon2-drawer",e.appendChild(E);let R=Ci(null,null),X=new Map,ve=new Map,he=null,ne=null,Z=null,Re=Mr(E,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{W=null,Ne()}});async function $e(b,h,x,I,te=!0){if(!o||!x)return null;let y=await o(b,{...h,root_dir:x,expected_revision:I});if(y&&y.conflict&&te){y.queue&&ve.set(x,y.queue);let $=y.queue&&typeof y.queue.revision=="number"?y.queue.revision:I;y=await o(b,{...h,root_dir:x,expected_revision:$})}return y&&y.queue&&x&&ve.set(x,y.queue),y}function ie(b,h){let x=ve.get(b),I=s&&s.get?s.get():null,te=(Array.isArray(I)?I:[]).find($=>$?.root_dir===b);return(x||te)?.merge_queue?.find($=>$.bead_id===h)?.continuation_action}async function ae(b,h,x,I){let te=await $e(b,h,x,I),y=ve.get(x)?.revision??te?.queue?.revision??I;return Cn(te,($,ce)=>$e(b,{...h,continuation:$,decision_token:ce},x,y,!1),{refresh:$=>$e(b,h,x,$?.queue?.revision??ve.get(x)?.revision??y,!1)})}async function xe(b,h,x,I){let te=await Cn({continuation_mismatch:I},($,ce)=>$e("worker-merge-queue-add",{bead_id:h,continuation:$,decision_token:ce},b,x,!1)),y=te?.queue?.merge_queue?.find($=>$.bead_id===h)?.continuation_action;te?.applied!==!0&&y?.continuation===null&&y.mismatch&&await xe(b,h,te.queue.revision,y.mismatch)}async function B(b,h,x){let I=await $e("worker-discard",b,h,x);if(I&&I.discarded===!0){ue(jo(I),"success",5e3);return}if(I&&I.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${I.reason}`,"error");return}if(I&&I.accepted&&I.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(I&&I.accepted){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${I.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}I&&!I.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function J(b,h,x){return!o||!x?null:await o(b,{...h,root_dir:x})}async function le(){let b=new Map;for(let h of R.pr_wait)b.has(h.root_dir)||b.set(h.root_dir,h.expected_revision);for(let[h,x]of b)await $e("worker-merge-queue-add-all",{},h,x)}function Ae(b){let h=D[b];return!!(h&&h.runnable===!0)}function Se(b){let h={...D[b]||{}};h.runnable=!h.runnable,D={...D,[b]:h},Ld(D),Ne()}function Oe(b){return D[b]===!0}function ge(b){D={...D,[b]:D[b]!==!0},Ld(D),Ne()}function it(b){let h=R.queue_groups.find(x=>x.root_dir===b);if(!h)return null;for(let x=0;x<h.serial_lane_count;x+=1){let I=`s${x+1}`,te=h.sublanes.serial.find(y=>y.id===I);if(!te||te.raw_length===0&&te.occupied_by.length===0)return I}return null}function _t(b,h){let x=R.queue_groups.find(te=>te.root_dir===b),I=x?x.sublanes.serial.find(te=>te.id===h):void 0;return I?I.raw_length:0}function C(b,h){let x=X.get(b),I=X.get(h);if(!x||!I)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let te=Td(x),y=Td(I);if(te!==null&&te===y&&x.root_dir===I.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let $=Cd(x),ce=Cd(I);if($&&y!==null){let ye=y;return{kind:"ops",title:`${ye} \uB05D\uC5D0 ${b}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:I.root_dir,ops:[{bead_id:b,lane:ye,index:_t(I.root_dir,ye)}]}}if(te!==null&&ce&&y===null){let ye=te;return{kind:"ops",title:`${ye} \uB05D\uC5D0 ${h}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:x.root_dir,ops:[{bead_id:h,lane:ye,index:_t(x.root_dir,ye)}]}}if($&&te===null&&ce&&y===null){let ye=it(x.root_dir);return ye===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${ye} \uB808\uC778\uC5D0 ${h} \u2192 ${b} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:x.root_dir,ops:[{bead_id:h,lane:ye,index:0},{bead_id:b,lane:ye,index:1}]}}return!$&&!ce?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:$?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function me(b,h){let x=C(b,h.id);return{id:h.id,title:h.title,location_label:h.location_label,prefixes:h.prefixes,action:x.kind==="note"?{kind:"note",text:x.text}:x.kind==="disabled"?{kind:"disabled",label:Ed,title:x.title}:{kind:"place",label:Ed,title:x.title}}}function ke(b,h){if(!Y||Y.bead_id!==b)return null;let x=Y.counterpart_id,I=x===null?h:h.filter(te=>te.id===x);return I.length===0?null:{rows:I.map(te=>me(b,te))}}function Le(b){let h=b.dependency_chips||null,x=b.overlap_chips||[],I=b.scope_state==="missing";if(!h&&x.length===0&&!I)return null;let te=ke(b.id,x);return{...h||{},...x.length>0?{overlaps:x}:{},...I?{scope_missing:!0}:{},...te?{popover:te}:{}}}function Me(b){let h=Le(b);return h?{...b,dependency_chips:h}:b}async function Be(b,h){let x=C(b,h);if(Y=null,x.kind!=="ops"){Ne();return}let I=de(x.root_dir,x.ops[0].bead_id);for(let te of x.ops){let y=await z(te,x.root_dir,I);if(y===null)break;I=y}Ne()}async function z(b,h,x){try{let I=await $e("worker-queue-place",b,h,x,!1);if(I&&I.conflict)return ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!I||I.applied!==!0)return ue(I&&typeof I.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${I.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let te=I.queue?I.queue.revision:void 0;return typeof te!="number"?(ue("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):te}catch(I){return ue(O(I),"error"),null}}function K(b){let h=Ae(b.root_dir);return l`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${b.root_dir}
        data-section="runnable"
        aria-expanded=${h?"false":"true"}
        aria-label=${`${b.name} \uC139\uC158 ${h?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${h?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${b.root_dir}>${b.name}</span>
      <span class="mon2-sec__count">${b.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${b.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function De(b,h){return l`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="candidate"
      data-root-dir=${b.root_dir}
    >
      ${h}
    </div>`}function Qe(b){if(V!==b.id)return null;let h=R.queue_groups.find(I=>I.root_dir===b.root_dir),x=b.place_lanes||[];return{bead_id:b.id,lanes:[{id:"parallel",label:"\uBCD1\uB82C",count:b.place_index??0},...R.chain_lanes.map((I,te)=>({id:`lane:${te}`,label:`\uC5F0\uACB0 ${te+1} \uB05D\uC5D0`,count:I.rows.length})),{id:"new-lane",label:"\uC0C8 \uC5F0\uACB0 \uB808\uC778",count:0},...x.map(I=>({id:`serial:${I.id}`,label:`${h?h.name:""} \uC9C1\uB82C ${Number(I.id.slice(1))}`,count:I.length}))]}}function We(b){return De(b,_i(Me(b),Qe(b),{exec_chips_mode:"pinned_only"}))}function we(){return R.runnable_flat?l`<div class="mon2-flat" data-drop="candidate">
        ${R.runnable.map(b=>We(b))}
      </div>`:l`${R.runnable_sections.map(b=>{let h=Ae(b.root_dir);return l`<section
        class="mon2-sec${h?" is-collapsed":""}"
        data-root-dir=${b.root_dir}
        data-section="runnable"
      >
        ${K({root_dir:b.root_dir,name:b.name,count:b.items.length})}
        ${h?"":l`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${b.items.map(x=>We(x))}
            </div>`}
      </section>`})}`}function P(b,h){return l`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="parallel"
      data-root-dir=${b.root_dir}
      data-row-index=${h}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${Hn(Me(b))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon2-rowops__up"
          data-bead-id=${b.id}
          title="같은 레포 안에서 한 칸 위로"
          aria-label="한 칸 위로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon2-rowops__down"
          data-bead-id=${b.id}
          title="같은 레포 안에서 한 칸 아래로"
          aria-label="한 칸 아래로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon2-rowops__remove"
          data-bead-id=${b.id}
          title="대기에서 빼기"
          aria-label="대기에서 빼기"
        >
          ✕
        </button>
      </span>
    </div>`}function H(){let b=Oe("parallel");return l`<section
      class="mon2-area mon2-parallel${b?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="parallel"
          aria-expanded=${b?"false":"true"}
          aria-label=${`\uBCD1\uB82C \uC601\uC5ED ${b?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${b?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">병렬 영역</span>
        <span class="mon2-area__count">${R.parallel_rows.length}</span>
      </header>
      ${b?"":l`<div class="mon2-area__body" data-drop="parallel">
            ${R.parallel_rows.length===0?l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:R.parallel_rows.map((h,x)=>P(h,x))}
          </div>`}
    </section>`}function ee(b,h,x){return l`<div
      class="mon2-crow"
      style=${`--indent: ${h.indent}`}
      draggable=${h.draggable?"true":"false"}
      data-bead-id=${h.id}
      data-drag-kind="chain"
      data-root-dir=${h.root_dir}
      data-lane-id=${b.lane_id}
      data-row-index=${x}
      data-queue-index=${typeof h.queue_index=="number"?String(h.queue_index):""}
    >
      ${b.cycle?"":l`<span class="mon2-crow__seq" aria-hidden="true"
            >${Dh(h.seq)}</span
          >`}
      ${h.workspace_name?l`<span class="worker-mini__repo" title=${h.root_dir}
            >${h.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${h.id}</span>
      ${jr(h.workflow)}
      <span class="mon2-crow__title">${h.title}</span>
      ${h.predecessors.map(I=>l`<span class="worker-dep worker-dep--pred"
            ><span class="worker-dep__label">← ${I}</span></span
          >`)}
      <span class="mon2-crow__where"
        >${h.location_label==="\uC2E4\uD589\uC911"?`\u25CF ${h.location_label}`:h.location_label}</span
      >
      ${h.draggable?l`<button
            type="button"
            class="mon2-crow__detach"
            data-bead-id=${h.id}
            title="연결에서 빼고 앞뒤를 이어 붙입니다"
            aria-label="연결에서 빼기"
          >
            ✕
          </button>`:""}
      ${Fr(Le(h),{lane:X.get(h.id)?.lane})}
    </div>`}function Q(b){return l`<div class="mon2-clane" data-lane-id=${b.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${b.label}</span>
        <span class="mon2-clane__count">${b.rows.length}</span>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${b.lane_id}
      >
        ${b.cycle?l`<div class="mon2-lane__cycle">
              ⛔ 의존 사이클 — 자동 교정 불가
            </div>`:""}
        ${b.rows.length===0?l`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:b.rows.map((h,x)=>ee(b,h,x))}
      </div>
    </div>`}function Pe(b,h,x){return l`<div
      class="mon2-item"
      data-bead-id=${h.id}
      data-drag-kind="repo-serial"
      data-root-dir=${h.root_dir}
      data-lane-id=${b.id}
      data-row-index=${x}
      data-queue-index=${String(h.queue_index??0)}
    >
      ${Hn(Me(h))}
    </div>`}function tt(b){if(b.length===0)return"";let h=b.length-1;return`${b[0].id} \uC810\uC720${h>0?` +${h}`:""}`}function st(b){return l`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${b.id}
    >
      ${Hn({id:b.id,title:b.title,lane:"running",draggable:!1,ghost:!0,badges:[b.badge]})}
    </div>`}function Je(b,h){return l`<div
      class="mon2-lane${h.empty?" mon2-lane--empty":""}"
      data-root-dir=${b.root_dir}
      data-lane-length=${String(h.raw_length)}
    >
      ${fn({id:"",lane:h.id,title:`${b.name} \xB7 \uC9C1\uB82C ${h.index+1}`,items:h.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:l`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${b.root_dir}
          data-lane-id=${h.id}
          data-lane-length=${String(h.raw_length)}
        >
          ${h.occupants.map(x=>st(x))}
          ${h.items.length>0?h.items.map((x,I)=>Pe(h,x,I)):h.occupants.length>0?"":l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:l`<span
            class="mon2-lane__badge${h.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${h.occupants.length>0?h.occupants.map(x=>`${x.id} \u2014 ${x.badge}`).join(`
`):""}
            >${tt(h.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${b.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${h.empty?l`<div class="mon2-lane__hint">
            ${b.name} 직렬 ${h.index+1} 비어 있음
          </div>`:""}
      ${h.cycle?l`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(h.cross_wait_peers||[]).map(x=>l`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${x.workspace_name}·${x.lane}과 교차 대기
          </div>`)}
    </div>`}function vt(){let b=Oe("serial"),h=R.chain_lanes.some(x=>x.pending&&x.rows.length===0);return l`<section
      class="mon2-area mon2-serial${b?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="serial"
          aria-expanded=${b?"false":"true"}
          aria-label=${`\uC9C1\uB82C \uC601\uC5ED ${b?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${b?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">직렬 영역</span>
        <button
          type="button"
          class="mon2-newlane"
          ?disabled=${h}
          title=${h?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4 \u2014 \uC0C8\uB85C\uACE0\uCE68\uD558\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${b?"":l`<div class="mon2-area__body">
            ${R.chain_lanes.map(x=>Q(x))}
            ${R.queue_groups.map(x=>x.sublanes.serial.map(I=>Je(x,I)))}
          </div>`}
    </section>`}function mt(){return l`<div class="mon2-wait">${H()}${vt()}</div>`}function ot(b){return l`<div class="worker-rungrid">
      ${R.running.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:R.running.map(h=>hi({bead_id:h.id,attempt_id:h.attempt_id||"",title:h.title,runner:h.runner??null,model:h.model??null,effort:h.effort??null,speed:h.speed??null,started_at:h.started_at??null,kind:h.kind,...h.kind==="session"?{updated_at:h.updated_at}:{},workflow:h.workflow||null,resumed_from:h.resumed_from??null,continuation_mode:h.continuation_mode??null,paused:h.run_state==="paused",failed:h.run_state==="failed",status:h.status,status_label:h.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:h.can_resume!==!1,can_pause:h.can_pause!==!1,exec_chips:h.exec_chips||null,usage:h.usage||null,discard:h.discard},b,W,{monitor:{repo:h.workspace_name,root_dir:h.root_dir,serial_lane_id:h.serial_lane_id,last_activity:h.last_activity||null,legs:h.legs||[],dependency_chips:Le(h)}}))}
    </div>`}function ut(b){let h={runnable:R.runnable,queue:R.queue,running:R.running,pr_wait:R.pr_wait,done:R.done};return l`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${Mh.map(x=>{let I=h[x.lane],te=x.lane==="runnable"?R.runnable_flat?I.length>0?we():void 0:R.runnable_sections.length>0?we():void 0:x.lane==="queue"?R.queue_groups.length>0||R.chain_lanes.length>0||R.parallel_rows.length>0?mt():void 0:x.lane==="running"?ot(b):I.length>0?l`${I.map(y=>Hn(y))}`:void 0;return fn({id:`monitor-${x.lane}`,lane:x.pane,title:x.lane==="done"?`\uC644\uB8CC\xB7${q()}`:x.title,items:I,empty:x.empty,body:te,live:x.lane==="running"&&I.length>0,controls:x.lane==="runnable"?gt():void 0,header_control:Ve(x.lane,I.length)})})}
      </div>`}function gt(){return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${w.show_blocked}
        />
        🔒
        blocked${R.runnable_hidden.blocked>0?` ${R.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ti.map(b=>l`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${w.spec===b.value?" is-active":""}"
              data-spec=${b.value}
              aria-pressed=${w.spec===b.value?"true":"false"}
            >
              ${b.label}
            </button>`)}
        ${R.runnable_hidden.spec>0?l`<span class="worker-filter__hidden"
              >숨김 ${R.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function Ve(b,h){return b==="runnable"?l`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${A}
      >
        ${Ss.map(x=>l`<option
              value=${x.value}
              ?selected=${A===x.value}
            >
              ${x.label}
            </option>`)}
      </select>`:b==="running"?l`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${g}
      >
        <option value="started" ?selected=${g==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${g==="repo"}>
          레포순
        </option>
      </select>`:b==="pr_wait"&&h>0?l`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:b==="done"?l`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${f}
      >
        ${jn.map(x=>l`<option value=${x.value} ?selected=${f===x.value}>
              ${x.label}
            </option>`)}
      </select>`:""}function Ne(){let b=s&&s.get?s.get():null,h=s&&s.getWorkspacesState?s.getWorkspacesState():[],x=d(),I=()=>Ci(b,h,{done_since:sr(f,x),running_sort:g,candidate_filter:w,candidate_sort:A,pending_lanes:N});R=I(),R.pending_lanes_kept.length!==N.length&&(N=R.pending_lanes_kept.map(te=>N[te]),R=I()),X=new Map;for(let te of[...R.runnable,...R.queue,...R.running,...R.pr_wait,...R.done])X.has(te.id)||X.set(te.id,te);Ze(ut(x),U),wt()?.render(),He(),lt()}function He(){let b=new Map;for(let h of R.queue_groups)b.set(h.root_dir,h.auto_advance);for(let h of Array.from(U.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let x=h.closest(".mon2-item")?.getAttribute("data-root-dir")||"",I=b.get(x);typeof I=="boolean"&&h.setAttribute("title",`${h.textContent||""} \xB7 ${I?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function wt(){if(Z)return Z;let b=U.querySelector(".mon2-deck");return b?(Z=ud(b,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>R.done,rangeLabel:q,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:fe,onFocusChange:h=>{M=h,lt()}}),Z):null}function lt(){U.classList.toggle("has-focus",M!==null);for(let b of Array.from(U.querySelectorAll(".mon2-sec[data-root-dir]")))b.classList.toggle("is-focus",M!==null&&b.getAttribute("data-root-dir")===M);for(let b of Array.from(U.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let h=X.get(b.getAttribute("data-bead-id")||"");b.classList.toggle("is-focus",M!==null&&!!h&&h.root_dir===M)}for(let b of Array.from(U.querySelectorAll(".mon2-crow[data-root-dir]")))b.classList.toggle("is-focus",M!==null&&b.getAttribute("data-root-dir")===M)}function G(b,h){let x=a?a():void 0;if(!h||!x||h===x||!i){r(b);return}i(h).then(()=>{r(b)}).catch(I=>{n("workspace switch for %s failed: %o",h,I)})}function fe(b){if(!b)return;let h=a?a():void 0,x=()=>{try{c?.gotoView("worker")}catch(I){n("gotoView(worker) failed: %o",I)}};if(!i||h&&h===b){x();return}i(b).then(x).catch(I=>{n("workspace switch for %s failed: %o",b,I),ue("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function qe(b){on(b).then(h=>{ue(h?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",h?"success":"error",1400)})}function S(b){let h=X.get(b)||null;return{item:h,root_dir:h?h.root_dir:"",revision:h?h.expected_revision:0}}function O(b){if(typeof b=="string"&&b.length>0)return b;if(b&&typeof b=="object"){let h=b;if(typeof h.message=="string"&&h.message.length>0)return h.message;if(typeof h.error=="string"&&h.error.length>0)return h.error;if(h.error&&typeof h.error=="object"&&typeof h.error.message=="string")return h.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function k(b,h,x){let{root_dir:I}=S(h);if(!(!h||!x||x===h))try{await J(b,{a:h,b:x},I)}catch(te){ue(O(te),"error")}}function L(){let b=new Map,h=s&&s.get?s.get():null,x=I=>Array.isArray(I)?I.filter(te=>typeof te=="string"&&te.length>0):[];for(let I of Array.isArray(h)?h:[]){if(!I||typeof I!="object")continue;let te=I.bead_blocked_by&&typeof I.bead_blocked_by=="object"?I.bead_blocked_by:{};for(let[y,$]of Object.entries(te))Array.isArray($)&&b.set(y,x($));for(let y of[...Array.isArray(I.runnable)?I.runnable:[],...Array.isArray(I.session_active)?I.session_active:[]])y&&typeof y.bead_id=="string"&&Array.isArray(y.blocked_by)&&y.blocked_by.length>0&&b.set(y.bead_id,x(y.blocked_by))}return b}function oe(){let b=new Map;for(let x of R.chain_lanes)b.set(x.lane_id,x.rows.map(I=>I.id));let h=new Map;for(let x of R.parallel_rows)typeof x.queue_index=="number"&&h.set(x.id,x.queue_index);for(let x of R.queue_groups)for(let I of x.sublanes.serial)for(let te of I.items)typeof te.queue_index=="number"&&h.set(te.id,te.queue_index);return{blocked_by_map:L(),owner_of:new Map(Object.entries(R.owner_of)),lane_order:b,parallel_rows:R.parallel_rows.map(x=>({bead_id:x.id,root_dir:x.root_dir,queue_index:x.queue_index??0})),parallel_raw_length:new Map(Object.entries(R.parallel_raw_length)),queue_index_of:h}}function de(b,h){let x=X.get(h);if(x&&x.root_dir===b)return x.expected_revision;let I=R.queue_groups.find(te=>te.root_dir===b);return I?I.revision:0}async function re(b,h){try{if(b.type==="worker-queue-place"||b.type==="worker-queue-reorder"||b.type==="worker-queue-remove"){let x=await $e(b.type,b.payload,b.root_dir,de(b.root_dir,h));return x&&x.conflict?(ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):x&&x.applied===!1?(ue(x.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${x.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0}return(b.type==="dep-add"||b.type==="dep-remove")&&await J(b.type,{a:b.a,b:b.b},b.root_dir),!0}catch(x){return ue(O(x),"error"),!1}}async function be(b,h){let x=dd(b,h,oe());if("refused"in x){ue(x.refused,"error");return}if(h.kind==="chain"){let I=R.chain_lanes.find(y=>y.lane_id===h.lane_id),te=I&&I.pending&&I.rows.length===0?Number(I.lane_id.slice(8)):-1;te>=0&&N[te]&&(N=N.map((y,$)=>$===te?{seed:b.bead_id}:y))}for(let I of x.ops)if(!await re(I,b.bead_id))break;Ne()}async function ct(b,h){let x=X.get(b);if(!x){Ne();return}let I={kind:"candidate",bead_id:b,root_dir:x.root_dir};if(h==="new-lane"){N.some(y=>y.seed===null)||(N=[...N,{seed:null}]),Ne();let te=R.chain_lanes.find(y=>y.pending&&y.rows.length===0);if(!te)return;await be(I,{kind:"chain",lane_id:te.lane_id,marker_index:0});return}if(h.startsWith("lane:")){let te=R.chain_lanes[Number(h.slice(5))];if(!te){Ne();return}await be(I,{kind:"chain",lane_id:te.lane_id,marker_index:te.rows.length});return}if(h.startsWith("serial:")){let te=h.slice(7),y=(x.place_lanes||[]).find($=>$.id===te);await be(I,{kind:"repo-serial",root_dir:x.root_dir,lane_id:te,index:y?y.index:0});return}await be(I,{kind:"parallel",marker_index:R.parallel_rows.length})}async function Xe(b,h){let x=R.parallel_rows,I=x.findIndex(Ke=>Ke.id===b);if(I<0)return;let te=x[I].root_dir,y=[];x.forEach((Ke,Ie)=>{Ke.root_dir===te&&y.push(Ie)});let $=y.indexOf(I),ce=y[$+h];if(typeof ce!="number")return;let ye=h===-1?ce:y[$+2]??Math.min(x.length,ce+1);await be({kind:"parallel",bead_id:b,root_dir:te,queue_index:x[I].queue_index??0},{kind:"parallel",marker_index:ye})}async function Ye(b){for(let h of R.chain_lanes){let x=h.rows.find(I=>I.id===b);if(!(!x||!x.draggable)){await be({kind:"chain",bead_id:b,root_dir:x.root_dir,lane_id:h.lane_id,...typeof x.queue_index=="number"?{queue_index:x.queue_index}:{}},{kind:"parallel",marker_index:R.parallel_rows.length});return}}}let bt=null,St=!1,yt=null;function Ct(){yt!==null&&clearTimeout(yt),yt=setTimeout(()=>{yt=null,St=!1},0)}function zt(b,h){let x=h&&typeof h.closest=="function"?h.closest("[data-row-index]"):null;if(x&&b.contains(x)){let I=Number(x.getAttribute("data-row-index"));return Number.isFinite(I)?I:0}return b.querySelectorAll("[data-row-index]").length}function Nt(b){let h=b.target,x=typeof h?.closest=="function"?h.closest("[data-drop]"):null;if(!x||!bt)return null;let I=x.getAttribute("data-drop");if(I==="candidate")return{zone:x,target:{kind:"candidate"}};if(I==="parallel")return{zone:x,target:{kind:"parallel",marker_index:zt(x,h)}};if(I==="chain")return{zone:x,target:{kind:"chain",lane_id:x.getAttribute("data-lane-id")||"",marker_index:zt(x,h)}};if(I==="repo-serial"){let te=x.getAttribute("data-root-dir")||"";if(te!==bt.root_dir)return null;let y=typeof h?.closest=="function"?h.closest("[data-queue-index]"):null,$=y&&x.contains(y)?y.getAttribute("data-queue-index"):x.getAttribute("data-lane-length"),ce=Number($);return{zone:x,target:{kind:"repo-serial",root_dir:te,lane_id:x.getAttribute("data-lane-id")||"",index:Number.isFinite(ce)?ce:0}}}return null}function Mt(){for(let b of Array.from(U.querySelectorAll(".is-drop-over")))b.classList.remove("is-drop-over")}function Ft(b){let h=b.target,x=typeof h?.closest=="function"?h.closest('[draggable="true"][data-bead-id]'):null,I=x?x.closest("[data-drag-kind]"):null;if(!I)return;let te=I.getAttribute("data-bead-id")||"",y=I.getAttribute("data-drag-kind")||"",$=I.getAttribute("data-root-dir")||"";if(!te||!y||!$)return;let ce=I.getAttribute("data-queue-index")||"",ye=Number(ce),Ke=I.getAttribute("data-lane-id")||"";bt={kind:y,bead_id:te,root_dir:$,...ce!==""&&Number.isFinite(ye)?{queue_index:ye}:{},...Ke?{lane_id:Ke}:{}},St=!0,V=null,U.classList.add("is-dragging");try{b.dataTransfer?.setData("text/plain",te),b.dataTransfer&&(b.dataTransfer.effectAllowed="move")}catch{}}function Lt(b){let h=Nt(b);h&&(b.preventDefault(),b.dataTransfer&&(b.dataTransfer.dropEffect="move"),h.zone.classList.add("is-drop-over"))}function Ue(b){let h=b.target;typeof h?.closest=="function"&&h.closest("[data-drop]")?.classList.remove("is-drop-over")}function Ut(){bt=null,Mt(),U.classList.remove("is-dragging"),Ct()}function Ht(b){let h=Nt(b),x=bt;bt=null,Mt(),U.classList.remove("is-dragging"),!(!h||!x)&&(b.preventDefault(),be(x,h.target))}function et(b){return{runner:b.runner||void 0,model:b.model||void 0,effort:b.effort||void 0,status:b.run_state==="running"?"running":b.run_state,worktree:b.root_dir}}function Wt(b,h){let{item:x,root_dir:I,revision:te}=S(h),y=x?.attempt_id||"",$=b.classList;if($.contains("worker-dep__remove")){k("dep-remove",h,b.dataset.blockerId||"");return}if($.contains("mon2-rowops__up")||$.contains("mon2-rowops__down")){Xe(h,$.contains("mon2-rowops__up")?-1:1);return}if($.contains("mon2-rowops__remove")){$e("worker-queue-remove",{bead_id:h},I,te);return}if($.contains("mon2-crow__detach")){Ye(h);return}if($.contains("mon-overlap__chip")){let ce=b.getAttribute("data-overlap-all")==="true"?null:b.getAttribute("data-overlap-id")||"";Y=!!Y&&Y.bead_id===h&&Y.counterpart_id===ce?null:{bead_id:h,counterpart_id:ce},Ne();return}if($.contains("mon-overlap__place")){Be(h,b.getAttribute("data-counterpart-id")||"");return}if($.contains("worker-card__place")){V=V===h?null:h,Ne();return}if($.contains("worker-card__place-cancel")){V=null,Ne();return}if($.contains("worker-card__place-lane")){let ce=b.getAttribute("data-lane")||"parallel";V=null,ct(h,ce);return}if($.contains("rtile__session")){W=y,y&&x&&Re.open({attempt_id:y,root_dir:I,meta:et(x)}),Ne();return}if($.contains("rtile__pause")){J("worker-attempt-pause",{attempt_id:y},I);return}if($.contains("rtile__resume")){Lr().then(ce=>{if(ce!==null)return ae("worker-attempt-resume",{attempt_id:y,...ce!==""?{instructions:ce}:{}},I,te)});return}if($.contains("rtile__dismiss")){$e("worker-attempt-dismiss",{attempt_id:y},I,te);return}if($.contains("rtile__discard")){if(!p(ws(h,"unmerged")))return;B({bead_id:h,...y?{attempt_id:y}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},I,te);return}if($.contains("worker-mini__merge")){let ce=ie(I,h);ce?.mismatch&&ce.continuation===null?xe(I,h,te,ce.mismatch):$e("worker-merge-queue-add",{bead_id:h},I,te);return}if($.contains("worker-mini__merge-cancel")){$e("worker-merge-queue-remove",{bead_id:h},I,te);return}if($.contains("worker-mini__discard")){let ce=b.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(ws(h,ce)))return;B({bead_id:h,...b.dataset.attemptId?{attempt_id:b.dataset.attemptId}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},I,te);return}if($.contains("worker-mini__revise-fix")){ae("worker-revise-fix",{bead_id:h},I,te);return}$.contains("worker-mini__revise-approve")&&$e("worker-revise-approve",{bead_id:h},I,te)}function Fe(b){let h=St;St=!1;let x=b.target;if(!x||typeof x.closest!="function"||x.closest("dialog")||x.closest(".mon2-drawer")||x.closest("a"))return;let I=x.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(I){b.preventDefault();let m=x.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||I.textContent?.trim()||"";m&&qe(m);return}let te=x.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(te){b.preventDefault();let u=te.getAttribute("data-root-dir")||X.get(x.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||te.getAttribute("title")||"";fe(u);return}let y=x.closest(".mon2-sec__toggle");if(y){b.preventDefault(),Se(y.getAttribute("data-root-dir")||"");return}let $=x.closest(".mon2-area__toggle");if($){b.preventDefault(),ge($.getAttribute("data-area")||"parallel");return}if(x.closest(".mon2-newlane")){b.preventDefault(),N=[...N,{seed:null}],Ne();return}if(x.closest(".mon-merge-all")){b.preventDefault(),le();return}let ce=x.closest(".mon-filter__spec");if(ce){b.preventDefault(),w={...w,spec:ce.getAttribute("data-spec")||"all"},Rd(w),Ne();return}let ye=x.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!ye)return;let Ke=ye.getAttribute("data-bead-id")||"",Ie=x.closest("button");if(Ie){b.preventDefault(),Wt(Ie,Ke);return}Ke&&!h&&(b.preventDefault(),G(Ke,ye.getAttribute("data-root-dir")||S(Ke).root_dir))}function T(b){let h=b.target;if(!h||typeof h.closest!="function")return;let x=h.closest(".mon-filter__blocked");if(x){w={...w,show_blocked:x.checked},Rd(w),Ne();return}let I=h.closest(".mon-candidate-sort");if(I){A=Ss.some($=>$.value===I.value)?I.value:"repo_spec",Th(A),Ne();return}let te=h.closest(".mon-running-sort");if(te){g=te.value==="repo"?"repo":"started",Oh(g),Ne();return}let y=h.closest(".mon-done-range");y&&(f=un(y.value)?y.value:rn,Lh(f),Ne())}function _e(b){if(!Y)return;let h=b.target;h&&typeof h.closest=="function"&&h.closest(".mon-overlap__popover, .mon-overlap__chip")||(Y=null,Ne())}function Ce(b){b.key!=="Escape"||!Y||(Y=null,Ne())}e.addEventListener("click",Fe),e.addEventListener("change",T),document.addEventListener("click",_e),document.addEventListener("keydown",Ce),e.addEventListener("dragstart",Ft),e.addEventListener("dragover",Lt),e.addEventListener("dragleave",Ue),e.addEventListener("drop",Ht),e.addEventListener("dragend",Ut),s&&typeof s.subscribe=="function"&&(he=s.subscribe(()=>{try{ve.clear(),Ne()}catch{}}));function at(){ne!==null&&(clearInterval(ne),ne=null)}function Rt(){yt!==null&&(clearTimeout(yt),yt=null)}return{load(){n("load"),Ne(),ne===null&&(ne=setInterval(()=>{try{Ne()}catch{}},Ph))},pause(){at()},clear(){at(),Rt(),he&&(he(),he=null),Re.destroy(),Z?.destroy(),Z=null,e.removeEventListener("click",Fe),e.removeEventListener("change",T),document.removeEventListener("click",_e),document.removeEventListener("keydown",Ce),e.removeEventListener("dragstart",Ft),e.removeEventListener("dragover",Lt),e.removeEventListener("dragleave",Ue),e.removeEventListener("drop",Ht),e.removeEventListener("dragend",Ut),e.replaceChildren()}}}function jd(e,t,n){let r=Et("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(g){return w=>{w.preventDefault(),r("click tab %s",g),n.gotoView(g)}}function c(){let g=t.getState();return g.view==="worker"||g.view==="monitor"?g.view:"board"}function d(){let g=c();return l`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${g==="monitor"?"is-active":""}"
        @click=${i("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function p(){let g=c();return l`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${g==="board"?"is-active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${g==="worker"?"is-active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </div>
    `}function f(){s&&Ze(d(),s),o&&Ze(p(),o)}return f(),a=t.subscribe(()=>f()),{destroy(){a&&(a(),a=null),s&&Ze(l``,s),o&&Ze(l``,o)}}}var Bd=["bug","feature","task","epic","chore"];function Ud(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Wd=["Critical","High","Medium","Low","Backlog"];function zd(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),c=n.querySelector("#new-description"),d=n.querySelector("#new-issue-error"),p=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),g=n.querySelector(".new-issue__close");function w(){o.replaceChildren();let q=document.createElement("option");q.value="",q.textContent="\u2014 Select \u2014",o.appendChild(q);for(let U of Bd){let E=document.createElement("option");E.value=U,E.textContent=Ud(U),o.appendChild(E)}a.replaceChildren();for(let U=0;U<=4;U+=1){let E=document.createElement("option");E.value=String(U);let R=Wd[U]||"Medium";E.textContent=`${U} \u2013 ${R}`,a.appendChild(E)}}w();function A(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function D(q){s.disabled=q,o.disabled=q,a.disabled=q,i.disabled=q,c.disabled=q,p.disabled=q,f.disabled=q,f.textContent=q?"Creating\u2026":"Create"}function W(){d.textContent=""}function V(q){d.textContent=q}function Y(){try{let q=window.localStorage.getItem("beads-ui.new.type");q?o.value=q:o.value="";let U=window.localStorage.getItem("beads-ui.new.priority");U&&/^\d$/.test(U)?a.value=U:a.value="2"}catch{o.value="",a.value="2"}}function N(){let q=o.value||"",U=a.value||"";q.length>0&&window.localStorage.setItem("beads-ui.new.type",q),U.length>0&&window.localStorage.setItem("beads-ui.new.priority",U)}async function M(){W();let q=String(s.value||"").trim();if(q.length===0){V("Title is required"),s.focus();return}let U=Number(a.value||"2");if(!(U>=0&&U<=4)){V("Priority must be 0..4"),a.focus();return}let E=String(o.value||""),R=String(c.value||""),X={title:q};E.length>0&&(X.type=E),String(U).length>0&&(X.priority=U),R.length>0&&(X.description=R),D(!0);try{await t("create-issue",X)}catch{D(!1),V("Failed to create issue");return}N(),D(!1),A()}return n.addEventListener("cancel",q=>{q.preventDefault(),A()}),g.addEventListener("click",()=>A()),p.addEventListener("click",()=>A()),n.addEventListener("keydown",q=>{q.key==="Enter"&&(q.ctrlKey||q.metaKey)&&(q.preventDefault(),M())}),r.addEventListener("submit",q=>{q.preventDefault(),M()}),{open(){r.reset(),W(),Y();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){A()}}}var Nh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function qh(e,t){return Aa(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Hd(e,t,n){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=qh(r,e);return l`<button
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
  `}function Gd(e,t,n){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(r=>l`<span class="settings-dialog__prefix">
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
  `}function Vd(e,t){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Nh.map(([n,r])=>l`<label class="settings-dialog__toggle">
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
  `}var Fh=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Kd(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(Z=>ue(Z,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",c=!1,d="",p=null;function f(){if(p)return p;let Z=a.querySelector('[data-pane="execution"]');return Z?(p=Ho(Z,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Re=>t.queueStore?.set?.(Re)}),p):null}function g(){return l`
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
    `}function w(){let Z=r.get();return l`
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
        ${Z?l`
              ${Hd(Z,s(),V)}
              ${Gd(Z,d,{onDraft:Re=>{d=Re},onAdd:Y,onRemove:N})}
              ${Vd(Z,M)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function A(Z){let Re=r.get();if(Re)try{let $e=await n("display-policy-set",{expected_revision:Re.revision,policy:Z(Re)});D($e),$e&&$e.conflict&&$e.policy&&($e=await n("display-policy-set",{expected_revision:$e.policy.revision,policy:Z($e.policy)}),D($e)),$e&&$e.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function D(Z){Z&&Z.policy&&typeof Z.policy=="object"&&r.set(Z.policy)}function W(Z){A(Z)}function V(Z){let Re=r.get();if(!Re)return;let $e=!jh(Z,Re);W(ie=>Bh(Z,ie,$e))}function Y(){let Z=d.trim();Z.length!==0&&(d="",W(Re=>Re.hidden_prefixes.includes(Z)?{hidden_prefixes:Re.hidden_prefixes}:{hidden_prefixes:[...Re.hidden_prefixes,Z]}),q())}function N(Z){W(Re=>({hidden_prefixes:Re.hidden_prefixes.filter($e=>$e!==Z)}))}function M(Z){let Re=r.get();if(!Re)return;let $e=Re.chips[Z]===!1;W(()=>({chips:{[Z]:$e}}))}function q(){Ze(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Fh.map(Z=>l`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${Z.id}
                  aria-selected=${String(i===Z.id)}
                  aria-controls=${`settings-pane-${Z.id}`}
                  @click=${()=>U(Z.id)}
                >
                  <span class="settings-dialog__glyph">${Z.glyph}</span>
                  ${Z.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${ne}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${g()} ${w()}
          </div>
        </div>
      `,a),f()}function U(Z){i=Z,q()}let E=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",E),a.addEventListener("cancel",E);let R=Z=>{Z.target===a&&ne()};a.addEventListener("click",R);let X=null;r.subscribe&&(X=r.subscribe(()=>{c&&q()}));let ve=null;t.implPresetStore?.subscribe&&(ve=t.implPresetStore.subscribe(()=>{c&&p?.render()}));function he(Z="execution"){c||(c=!0,t.onOpenChange?.(!0),i=Z,d="",q(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),f()?.load())}function ne(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:he,close:ne,sessionDraft:()=>p?.sessionDraft()??{},destroy(){c=!1,a.removeEventListener("close",E),a.removeEventListener("cancel",E),a.removeEventListener("click",R),X&&(X(),X=null),ve&&(ve(),ve=null),p?.destroy(),p=null,a.remove()}}}function jh(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Bh(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Uh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Yd="usage-meter-card",Wh="usage-meter-layer",Zd=600,zh=["token_expired","relogin_required"];function Qd(e){return String(e).padStart(2,"0")}function Hh(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Xd(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Qd(r.getHours())}:${Qd(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${Uh[r.getMonth()]} ${r.getDate()} ${o}`;return`${Hh(n,t)} \xB7 ${i}`}function Gh(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Jd(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function ep(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var tp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function rp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Vh(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:rp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Kh(e){if(!e||typeof e!="object")return null;let t=e,n=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=Vh(s);o&&n.push(o)}let r=t.available===!0&&Array.isArray(t.windows);return!r&&n.length===0?null:{available:r,windows:r?rp(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:n}}function np(e,t){return`${e}:${t}`}function sp(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,c=null;function d(){Ze(l``,e),e.hidden=!0,f()}function p(){if(c===null){let ie=e.ownerDocument;c=ie.createElement("div"),c.id=Wh,c.className="usage-meter__layer",ie.body.appendChild(c)}return c}function f(){c!==null&&(Ze(l``,c),c.remove(),c=null)}function g(ie){n!==ie&&(n===null&&(document.addEventListener("mousedown",A),document.addEventListener("keydown",W),window.addEventListener("resize",D)),n=ie)}function w(){n!==null&&(n=null,document.removeEventListener("mousedown",A),document.removeEventListener("keydown",W),window.removeEventListener("resize",D))}function A(ie){let ae=ie.target;ae&&(e.contains(ae)||c!==null&&c.contains(ae))||(w(),ne())}function D(){ne()}function W(ie){ie.key==="Escape"&&(w(),ne())}function V(ie){n===ie?w():g(ie),ne()}function Y(){w(),ne()}async function N(ie,ae){if(r.has(ie.key))return;let xe=np(ie.key,ae);r.set(ie.key,ae),a.delete(xe),ne();let B=null;try{B=await(await fetch(ie.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ae})})).json()}catch{B=null}if(t)return;if(r.delete(ie.key),!B||B.ok!==!0){let le=B&&typeof B.error=="string"&&B.error.length>0?B.error:"network_error";a.set(xe,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${le}`}),ne();return}let J=Array.isArray(B.warnings)?B.warnings.filter(le=>typeof le=="string"&&le.length>0):[];J.length>0&&a.set(xe,{kind:"warn",text:J.join(" \xB7 ")}),ne(),await $e()}function M(ie,ae,xe,B){let J=ep(ie.pct),Ae=`resets ${Xd(ie.resetsAt,B)}${ae?` \xB7 ${xe}`:""}`;return l`<span
      class="usage-meter__window ${Jd(J)}"
      style=${`--progress: ${J}%`}
      title=${Ae}
    >
      <span class="usage-meter__label">${ie.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${J}%</span>
    </span>`}function q(ie,ae,xe){let B=ae.available&&typeof ae.ageSeconds=="number"&&ae.ageSeconds>Zd,J=B&&typeof ae.ageSeconds=="number"?`${Math.floor(ae.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",le=ae.accounts.filter(ge=>!ge.active).length,Ae=`usage-meter__group${B?" usage-meter__group--stale":""}`,Se=l`<span class="usage-meter__provider"
        >${ie.label}</span
      >
      ${ae.available?ae.windows.map(ge=>M(ge,B,J,xe)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${le>0?l`<span class="usage-meter__badge">+${le}</span>`:""}`;if(ae.accounts.length===0)return l`<span
        class=${Ae}
        aria-label=${`${ie.label} usage`}
        >${Se}</span
      >`;let Oe=n===ie.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${Ae}`}
      aria-label=${`${ie.label} usage`}
      aria-expanded=${Oe?"true":"false"}
      aria-controls=${Yd}
      @click=${()=>V(ie.key)}
    >
      ${Se}
    </button>`}function U(ie,ae){return l`<span class="usage-meter" aria-label="Usage">
      ${ie.map(xe=>q(xe.provider,xe.snapshot,ae))}
    </span>`}function E(ie,ae){let xe=ep(ie.pct),B=Xd(ie.resetsAt,ae);return l`<span
      class="usage-meter__account-window ${Jd(xe)}"
      style=${`--progress: ${xe}%`}
    >
      <span class="usage-meter__account-key">${ie.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${xe}%</span>
      <span class="usage-meter__account-reset"
        >${B.length>0?`\u21BB ${B}`:""}</span
      >
    </span>`}function R(ie,ae){return zh.includes(ae)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ie.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function X(ie,ae,xe){let B=ae.status==="ok",J=typeof ae.ageSeconds=="number"&&ae.ageSeconds>Zd,le=a.get(np(ie.key,ae.number)),Ae=r.get(ie.key),Se=Ae!==void 0,Oe=Ae===ae.number,ge=["usage-meter__account"];return ae.active&&ge.push("usage-meter__account--active"),B||ge.push("usage-meter__account--unavailable"),J&&ge.push("usage-meter__account--stale"),l`<div class=${ge.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${ae.email}
          >${ae.alias===null?ae.email:ae.alias}</span
        >
        ${ae.plan===null?"":l`<span class="usage-meter__account-tag">${ae.plan}</span>`}
        ${ae.active?l`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${ae.ageSeconds===null?"":l`<span class="usage-meter__account-age"
              >${Gh(ae.ageSeconds)}</span
            >`}
        ${ae.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Se}
              @click=${()=>{N(ie,ae.number)}}
            >
              ${Oe?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${B?l`<div class="usage-meter__account-windows">
            ${ae.windows.map(it=>E(it,xe))}
          </div>`:l`<div class="usage-meter__account-status">
            ${R(ie,ae.status)}
          </div>`}
      ${le===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${le.kind}"
          >
            ${le.text}
          </div>`}
    </div>`}function ve(ie,ae,xe){let B=ae.accounts.filter(J=>J.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ie.label} · 활성 ${B} / 전체
        ${ae.accounts.length}
      </h2>
      ${ae.accounts.map(J=>X(ie,J,xe))}
    </section>`}function he(ie,ae){return l`<div
      class="usage-meter__card"
      id=${Yd}
      role="dialog"
      aria-label=${`${ie.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${ve(ie.provider,ie.snapshot,ae)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function ne(){let ie=[];for(let B of tp){let J=o.get(B.key);J&&ie.push({provider:B,snapshot:J})}if(ie.length===0){w(),d();return}let ae=ie.find(B=>B.provider.key===n&&B.snapshot.accounts.length>0);ae||w();let xe=Date.now();Ze(U(ie,xe),e),e.hidden=!1,ae?Z(ae,xe):f()}function Z(ie,ae){let xe=p(),B=e.getBoundingClientRect(),J=e.ownerDocument.documentElement.clientWidth;xe.style.setProperty("--usage-meter-anchor-top",`${B.bottom}px`),xe.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,J-B.right)}px`),Ze(l`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${Y}
        ></div>
        ${he(ie,ae)}`,xe)}async function Re(ie){try{let ae=await fetch(ie.endpoint);return ae.ok?Kh(await ae.json()):null}catch{return null}}async function $e(){i+=1;let ie=i,ae=await Promise.all(tp.map(async xe=>({provider:xe,snapshot:await Re(xe)})));if(!(t||ie!==i)){for(let xe of ae)xe.snapshot?o.set(xe.provider.key,xe.snapshot):o.delete(xe.provider.key);ne()}}return d(),$e(),s=setInterval(()=>{$e()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),w(),d()}}}function op(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Yh="worker-ineligible";function Ri(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ap(e){return Ri(e).includes(Yh)}var Zh="worker-serial";function Li(e){return Ri(e).includes(Zh)}function Ii(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Qh=new Set(["done","failed","orphaned","stopped","discarded"]),Xh={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Jh={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},eb={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Oi(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:eb[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function ip(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,d=new Map,p=!1,f=null,g=null,w=null,A=new Set,D=!1,W=0,V=null,Y=new Set;function N(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function M(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function q(){return o&&o()||""}async function U(){if(!s)return;let S=++W;D=!0,w=null,A.clear(),Ve();try{let O=await s("worker-parallel-analysis-targets",{root_dir:q()});if(S!==W||!Ne)return;let k=Array.isArray(O?.qualified)?O.qualified:[],L=Array.isArray(O?.excluded)?O.excluded:[];w={qualified:k,excluded:L};for(let oe of k)oe&&typeof oe.id=="string"&&A.add(oe.id)}catch{S===W&&Ne&&(w={qualified:[],excluded:[]},ue("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{S===W&&(D=!1,Ne&&Ve())}}function E(S){return Array.isArray(S.runs)?S.runs:[]}function R(){let S=N(),O=new Set;for(let k of Object.values(S.attempts||{})){let L=k;L&&typeof L.bead_id=="string"&&!Qh.has(L.status)&&O.add(L.bead_id)}for(let k of Array.isArray(S.pr_wait)?S.pr_wait:[])k&&typeof k.bead_id=="string"&&O.add(k.bead_id);for(let k of Object.values(S.discard_operations||{})){let L=k;L&&L.phase!=="done"&&typeof L.bead_id=="string"&&O.add(L.bead_id)}return O}function X(S){return S.filter(O=>ve(O)===null)}function ve(S){let O=N();for(let k of Array.isArray(O.serial_lanes)?O.serial_lanes:[])if(Array.isArray(k?.entries)&&k.entries.some(L=>L.bead_id===S))return k.id;return(Array.isArray(O.queue)?O.queue:[]).some(k=>k.bead_id===S)?"parallel":null}function he(S,O){let k=c.get(S);return k||[...O.order]}function ne(S){if(S.length<2)return!1;let O=ve(S[0]);if(!O||O==="parallel")return!1;let k=N(),L=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).find(de=>de.id===O)?.entries.map(de=>de.bead_id);if(!Array.isArray(L))return!1;let oe=S.map(de=>L.indexOf(de));return oe.every(de=>de>=0)&&oe.every((de,re)=>re===0||de>oe[re-1])}function Z(){let S=N(),O=Array.isArray(S.serial_lanes)?S.serial_lanes:[],k=O.find(L=>Array.isArray(L.entries)&&L.entries.length===0);return k?k.id:O[0]?.id||"s1"}function Re(S){let O=N().bead_titles||{};return typeof O[S]=="string"?O[S]:S}async function $e(S,O){if(!s||p)return null;p=!0,Ve();try{return await s(S,O)}finally{p=!1,Ve()}}async function ie(S){r?.setPending?.(!0);try{let O=await $e("worker-parallel-analysis-start",{force:S,target_ids:Array.from(A)});O&&O.applied===!1&&O.reason&&(O.reason==="target_not_qualified"&&Array.isArray(O.detail)?ue(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${O.detail.join(", ")}`,"error",3200):ue(`\uBD84\uC11D \uC2E4\uD328: ${O.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function ae(){let S=M().job;!s||!S||await s("worker-parallel-analysis-cancel",{job_id:S.job_id})}async function xe(S){if(!(!s||Y.has(S))){Y.add(S),Ve();try{let O=await s("worker-parallel-analysis-prompt",{root_dir:q(),run_id:S});if(!Ne)return;if(O?.ok===!0&&typeof O.prompt=="string"){V={run_id:S,prompt:O.prompt};return}ue(O?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{Y.delete(S),Ve()}}}function B(){V=null,Ve()}async function J(){if(!V)return;let S=await on(V.prompt);ue(S?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",S?"success":"error",1400)}function le(S,O){a&&a(S,Oi(O))}function Ae(){return N().runner_catalog}function Se(S){return Object.keys(Ae()?.runners?.[S]?.models||{})}function Oe(S){let O=Se(S),k=Ae()?.runners?.[S]?.default_model;return typeof k=="string"&&O.includes(k)?k:O[0]||""}function ge(){let S=M().settings,O=f||S.runner||"claude",k=Se(O),L=f?Oe(O):S.model||k[0]||"",oe=Ii(Ae(),O,L),de=S.effort||"",re=oe.includes(de)?de:oe[0]||"";return{runner:O,model:L,effort:re,models:k,efforts:oe}}async function it(S){let O=M().settings,k=await $e("worker-parallel-analysis-settings-update",{expected_revision:O.revision,runner:S.runner,model:S.model,effort:S.effort});(!k||k.applied!==!0)&&(f=null,Ve(),k&&k.reason&&ue(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${k.reason}`,"error",2800))}function _t(S){f=S,Ve();let O=ge();it({runner:S,model:O.model,effort:O.effort})}function C(S){let O=ge(),k=Ii(Ae(),O.runner,S);it({runner:O.runner,model:S,effort:k.includes(O.effort)?O.effort:k[0]||""})}function me(S){let O=ge();it({runner:O.runner,model:O.model,effort:S})}async function ke(S,O){if(!s||p)return;let k=he(S,O),L=M();if(k.length<2||!L.last_good){ue("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let oe=d.get(S)||Z(),de=()=>({snapshot_digest:L.last_good.identity_digest,group_index:S,lane:oe,ordered_bead_ids:k,expected_revision:N().revision});p=!0,Ve();try{let re=await s("worker-parallel-analysis-submit",de());re&&re.queue&&n&&n.set(re.queue),re&&re.applied!==!0&&re.conflict===!0&&(re=await s("worker-parallel-analysis-submit",de()),re&&re.queue&&n&&n.set(re.queue)),re&&re.applied===!0?(c.delete(S),ue(`\uC9C1\uB82C \uB808\uC778 ${oe}\uC5D0 ${k.length}\uAC1C \uBC30\uCE58`,"success")):ue(`\uC81C\uCD9C \uAC70\uBD80: ${re?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,Ve()}}function Le(S,O,k){c.set(S,he(S,O).filter(L=>L!==k)),Ve()}function Me(S){c.delete(S),Ve()}function Be(S,O,k,L){let oe=[...he(S,O)],de=oe.indexOf(k),re=de+L;de<0||re<0||re>=oe.length||(oe.splice(re,0,...oe.splice(de,1)),c.set(S,oe),Ve())}function z(){let S=M().settings,O=Object.keys(Ae()?.runners||{}),k=ge();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${L=>_t(L.target.value)}
        >
          ${O.map(L=>l`<option
                value=${L}
                ?selected=${k.runner===L}
              >
                ${L}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${L=>C(L.target.value)}
        >
          ${k.models.map(L=>l`<option
                value=${L}
                ?selected=${k.model===L}
              >
                ${L}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${L=>me(L.target.value)}
        >
          ${k.efforts.map(L=>l`<option
                value=${L}
                ?selected=${k.effort===L}
              >
                ${L}
              </option>`)}
        </select>
      </label>
      ${K(S)}
    </div>`}function K(S){return!Qe(S)||De(S)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:S.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${S.runner}/${S.model} · effort
        ${S.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:S.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function De(S){return S.is_default===!0&&S.compatible===!1}function Qe(S){return!!(S.runner&&S.model&&S.effort)}function We(S){return Qe(S)&&S.compatible!==!1}function we(S){let O=Math.max(0,Math.floor(S/1e3)),k=Math.floor(O/60),L=O%60;return`${k}:${String(L).padStart(2,"0")}`}function P(S){let O=S.job;if(O){let k=typeof O.started_at=="number"?O.started_at:0,L=`${O.runner||"?"}/${O.model||"?"}`,oe=k?` \xB7 \uACBD\uACFC ${we(Date.now()-k)}`:"",de=typeof O.session_id=="string"?O.session_id:"",re=E(S).find(be=>be.run_id===O.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${L} · effort ${O.effort||"?"}${oe}</span
        >
        ${de?l`<code class="pa-session-id" title=${de}
              >${de.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>le(O.job_id,re||O)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${re?.prompt_saved!==!0||Y.has(O.job_id)}
          @click=${()=>{xe(O.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return H()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function H(){return r?.isPending?.()===!0}function ee(S){let O=!!S.job,k=We(S.settings),L=w!==null&&A.size===0,oe=O||p||H()||D;return l`<div class="pa-meta">
      ${S.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(S.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${P(S)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!k||oe||L}
        @click=${()=>{ie(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!k||oe||L}
        @click=${()=>{ie(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!O}
        @click=${()=>{ae()}}
      >
        취소
      </button>
    </div>`}function Q(S){return typeof S=="string"&&S.length>0?S:"\uBBF8\uBC30\uCE58"}function Pe(S,O){O?A.add(S):A.delete(S),Ve()}function tt(S){let O=Array.isArray(S.scope)?S.scope:[],k=Array.isArray(S.overlaps)?S.overlaps:[];return O.length===0&&k.length===0?l``:l`<span class="pa-target__signals">
      ${O.length>0?l`<details class="pa-target__scope" title=${O.join(`
`)}>
            <summary>scope ${O.length}</summary>
            <ul>
              ${O.map(L=>l`<li><code>${L}</code></li>`)}
            </ul>
          </details>`:""}
      ${k.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${k.join(", ")}`}
            >겹침 ${k.join(", ")}</span
          >`:""}
    </span>`}function st(){let S=w?.qualified||[],O=w?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${D?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${S.length} \xB7 \uC81C\uC678 ${O.length}`}</span
        >
      </header>
      ${w&&S.length>0?l`<ul class="pa-targets__list">
            ${S.map(k=>l`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${k.id}
                      .checked=${A.has(k.id)}
                      @change=${L=>Pe(k.id,L.target.checked)}
                    />
                    <span class="pa-target__title">${k.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${tt(k)}
                    <span class="pa-target__route">${k.route}</span>
                    <span class="pa-target__lane"
                      >${Q(k.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:w&&S.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${w&&O.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${O.length}</summary>
            <ul class="pa-targets__list">
              ${O.map(k=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${k.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Xh[k.reason]||k.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${Q(k.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function Je(S){let O=typeof S.session_id=="string"&&S.session_id.length>0,k=O?S.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${S.outcome}"
        >${Jh[S.outcome]||S.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(S.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${S.runner||"?"} / ${S.model||"?"} / ${S.effort||"?"}</span
      >
      ${O?l`<code class="pa-session-id" title=${k}
            >${k.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${S.outcome==="failure"&&S.reason?l`<span class="pa-run-row__reason">${S.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>le(S.run_id,S)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${S.prompt_saved!==!0||Y.has(S.run_id)}
          @click=${()=>{xe(S.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function vt(S){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${S.length>0?l`<ul class="pa-runs__list">
            ${S.map(O=>Je(O))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function mt(){return V?l`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${B}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${V.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{J()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${B}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${V.prompt}</pre
        >
      </section>
    </div>`:""}function ot(S,O){let k=he(S,O),L=R(),oe=k.filter(Ye=>L.has(Ye)),de=X(k),re=ne(k),be=Array.isArray(N().serial_lanes)?N().serial_lanes:[],ct=d.get(S)||Z(),Xe=O.eligible!==!0||k.length<2||oe.length>0||de.length>0||re||p;return l`<section class="pa-group" data-group-index=${String(S)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${O.confidence}</span>
        ${O.categories.map(Ye=>l`<span class="pa-group__category">${Ye}</span>`)}
        ${re?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${O.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${de.length>0?l`<span class="pa-group__stale"
              >stale — ${de.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${O.reason}</p>
      <ol class="pa-group__members">
        ${k.map((Ye,bt)=>l`<li class="pa-member" data-bead-id=${Ye}>
              <span class="pa-member__seq">${bt+1}</span>
              <span class="pa-member__title">${Re(Ye)}</span>
              ${L.has(Ye)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ye}
                ?disabled=${bt===0}
                aria-label=${`${Ye} \uC704\uB85C`}
                @click=${()=>Be(S,O,Ye,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ye}
                ?disabled=${bt===k.length-1}
                aria-label=${`${Ye} \uC544\uB798\uB85C`}
                @click=${()=>Be(S,O,Ye,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ye}
                aria-label=${`${Ye} \uC81C\uC678`}
                @click=${()=>Le(S,O,Ye)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${O.evidence.map(Ye=>l`<li class="pa-evidence">
              <code>${Ye.path}</code>
              <span class="pa-evidence__locator">${Ye.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Me(S)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ye=>{d.set(S,Ye.target.value),Ve()}}
          >
            ${be.map((Ye,bt)=>l`<option
                  value=${Ye.id}
                  ?selected=${ct===Ye.id}
                >
                  직렬 ${bt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Xe}
          @click=${()=>{ke(S,O)}}
        >
          제출
        </button>
      </footer>
    </section>`}function ut(S){let O=Array.isArray(S.issues)?S.issues:[],k=O.filter(oe=>oe.verdict==="parallel_ok").length,L=O.filter(oe=>oe.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${k}</span>
      <span>uncertain ${L}</span>
    </div>`}function gt(){let S=Ne&&!!M().job;if(S&&g===null){g=setInterval(()=>Ve(),1e3);return}!S&&g!==null&&(clearInterval(g),g=null)}function Ve(){let S=M();f&&S.settings.runner===f&&(f=null);let O=S.last_good?.result;gt(),Ze(l`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${qe}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${z()} ${ee(S)} ${st()}
            ${O?l`${O.groups.map((k,L)=>ot(L,k))}
                ${O.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${ut(O)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${vt(E(S))}
          </div>
        </div>
        ${mt()}
      `,i)}let Ne=!1,He=()=>{Ne=!1,V=null,W+=1,gt()},wt=S=>{S.target===S.currentTarget&&qe()};i.addEventListener("close",He),i.addEventListener("cancel",He),i.addEventListener("click",wt);let lt=null;n&&n.subscribe&&(lt=n.subscribe(()=>{Ne&&Ve()}));let G=null;r&&r.subscribe&&(G=r.subscribe(()=>{Ne&&Ve()}));function fe(){Ne||(Ne=!0,Ve(),U(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function qe(){Ne&&(Ne=!1,V=null,W+=1,gt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:fe,close:qe,destroy(){Ne=!1,g!==null&&(clearInterval(g),g=null),i.removeEventListener("close",He),i.removeEventListener("cancel",He),i.removeEventListener("click",wt),lt&&(lt(),lt=null),G&&(G(),G=null),i.remove()}}}function lp(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let c=i.scope.filter(d=>typeof d=="string"&&d.length>0);if(c.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:c})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let c=Vo(s[a].scope,s[i].scope);if(c.length===0)continue;let d=s[a].member,p=s[i].member;n.get(d.id)?.overlaps.push({id:p.id,title:p.title,location_label:p.location_label,prefixes:c}),n.get(p.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:c})}return n}function Pi(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=r.kind!=="running",c=s.kind!=="running";if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&c&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&c&&a===null){let d=tb(n);return d===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${d} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:d,index:0},{bead_id:e,lane:d,index:1}]}}return!i&&!c?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function tb(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var cp=new Set(["sh","bash","zsh","dash","ksh"]),up=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function dp(e){let t=e.split("/");return t[t.length-1]||""}function nb(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=dp(n[0]);if(r!=="env")return cp.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&cp.has(dp(s))}function rb(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function sb(e){let t=[],n=0;up.lastIndex=0;for(let r of e.matchAll(up)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:rb(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function ob(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function pp(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",c=0,d=null,p=!1;function f(q,U){return U?sb(q).map(E=>E.kind==="plain"?E.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${E.kind}"
            >${E.text}</span
          >`):q}function g(){if(!s)return l``;let q=o==="ready"&&nb(a),U=o==="ready"?a.split(`
`):[];return l`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>N()}
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
              @click=${()=>{A()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>N()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?l`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?l`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:l`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${U.map((E,R)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${R+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(E,q)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function w(){Ze(g(),r)}async function A(){if(o!=="ready")return;let q=await on(a);ue(q?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",q?"success":"error")}function D(q){q.key==="Escape"&&s&&(q.preventDefault(),N())}function W(){p||(document.addEventListener("keydown",D),p=!0)}function V(){p&&(document.removeEventListener("keydown",D),p=!1)}async function Y(q,U=null){let E=++c;W(),s={...q},d=U||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",w(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let X=t?t():"";if(!X){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",w();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",w();return}let ve="/api/repo-ops-script?workspace="+encodeURIComponent(X)+"&lane="+encodeURIComponent(q.lane)+"&base_sha="+encodeURIComponent(q.base_sha);try{let he=await n(ve),ne=await he.json().catch(()=>({}));if(E!==c)return;if((t?t():"")!==X){N();return}if(!he.ok||!ne||ne.ok!==!0){o="error",i=ob(ne&&typeof ne.error=="string"?ne.error:""),w();return}s={lane:ne.lane,base_sha:ne.base_sha,path:ne.path,base_ref:ne.base_ref},a=String(ne.content),o="ready",w()}catch{if(E!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",w()}}function N(){c+=1,V(),s=null,a="",w();let q=d;d=null,q?.isConnected&&q.focus()}function M(){N(),r.remove()}return{open:Y,close:N,destroy:M}}function fp(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let E=o();return typeof E.revision=="number"?E.revision:0}function i(E){t&&E&&E.queue&&typeof E.queue=="object"&&t.set(E.queue)}function c(){let E=o().workspace_info;return E&&typeof E=="object"?E:{}}function d(E,R){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${E}"
      >${R}</span
    >`}function p(E){if(typeof E!="number"||!Number.isFinite(E))return"";let R=E/6e4;return Number.isInteger(R)?`timeout ${R}\uBD84`:`timeout ${Math.round(E/1e3)}\uCD08`}function f(E){let R=p(E);return R?d("config",R):""}function g(E,R,X){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${X.script}
      @click=${ve=>{s&&s({lane:E,base_sha:R.base_sha,path:X.script,base_ref:R.base_ref},ve.currentTarget)}}
    ></button>`}function w(){let E=o().repo_ops_opt_out;return{verify:E?.verify===!0,deploy:E?.deploy===!0}}function A(E,R){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!R}
        @change=${X=>{Y(E,!X.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function D(E){let R=typeof E.base_sha=="string"?E.base_sha:"",X=`${E.source_path||"repo-ops/config.toml"} @ ${E.base_ref||"?"}${R?`@${R.slice(0,7)}`:""}`,ve=w(),he=!!E.verify&&ve.verify,ne=!!E.deploy&&ve.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${X}</span>
      </p>
      <div
        class="worker-repo-ops__lane${he?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${E.verify?l`${g("verify",E,E.verify)}
              ${f(E.verify.timeout_ms)}
              ${he?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${he?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":E.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${E.verify?A("verify",ve.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${ne?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${E.deploy?l`${g("deploy",E,E.deploy)}
              ${f(E.deploy.timeout_ms)}
              ${ne?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ne?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":E.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${E.deploy?A("deploy",ve.deploy):""}
      </div>
    </section>`}function W(E){let R=E.repo_ops&&typeof E.repo_ops=="object"?E.repo_ops:null;return R&&(R.status==="resolved"||R.status==="absent")?D(R):R&&(R.status==="pending"||R.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${R.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${R.error_code?l` — <code>${R.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function V(E){if(!n)return;let R=await n("worker-auto-repair-toggle",{on:E,expected_revision:a()});if(i(R),R&&R.conflict){let X=await n("worker-auto-repair-toggle",{on:E,expected_revision:a()});i(X)}r()}async function Y(E,R){if(!n)return;let X=await n("worker-repo-ops-opt-out-toggle",{kind:E,opted_out:R,expected_revision:a()});if(i(X),X&&X.conflict){let ve=await n("worker-repo-ops-opt-out-toggle",{kind:E,opted_out:R,expected_revision:a()});i(ve)}r()}let N={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function M(E,R,X){return l`<div class="worker-repo-ops__policy-group" data-policy=${X}>
      <div class="worker-repo-ops__policy-label">${E}</div>
      <ul class="worker-repo-ops__policy-list">
        ${R.map(ve=>l`<li data-token=${ve}>
              ${N[ve]||ve}
            </li>`)}
      </ul>
    </div>`}function q(E){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${E.map(R=>{let X=[N[R.trigger]||R.trigger];return Number.isInteger(R.attempts_per_operation_attempt)?X.push(`operation\uB2F9 ${R.attempts_per_operation_attempt}\uD68C`):Number.isInteger(R.attempts)?X.push(`${N[R.budget]||R.budget} ${R.attempts}\uD68C`):Number.isInteger(R.sessions_per_user_action)&&X.push(`${R.sessions_per_user_action}\uD68C`,N[R.user_actions]||R.user_actions),R.applies_when&&X.push(N[R.applies_when]||R.applies_when),l`<li data-token=${R.id}>
            <strong>${N[R.id]||R.id}</strong>
            <span>${X.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function U(){let E=o(),R=E.auto_repair!==!1,X=E.repo_operation_policy&&typeof E.repo_operation_policy=="object"?E.repo_operation_policy:null,ve=Array.isArray(E.repo_operations)?E.repo_operations:[],he=ve.find($e=>$e.state==="repairing"),ne=ve.filter($e=>$e.state==="failed"||$e.state==="repairing"),Z=ne.length?Math.min(...ne.map($e=>typeof $e.repair?.remaining=="number"?$e.repair.remaining:0)):X?.auto_repair?.resolution_ladder?.find($e=>$e.id==="auto_repair_session")?.attempts??1,Re=Array.isArray(X?.auto_repair?.resolution_ladder)?X.auto_repair.resolution_ladder:[];return l`<section
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
          .checked=${R}
          @change=${$e=>{V($e.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${R?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${Z}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${he?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${he.repair?.owner_bead||he.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${X?l`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(X.worker_automatic||[]).length} · 해결 사다리
                ${Re.length} · 금지
                ${(X.never_automatic||[]).length}</span
              >
            </summary>
            ${M("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",X.worker_automatic||[],"worker-automatic")}
            ${X.supported===!1||X.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${X.schema_version})`}
                </div>`:q(Re)}
            ${M("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",X.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${W(c())} ${U()}
      </details>`}}}var hp=20,ab=5,ib=new Set(["failed","repairing","running","queued","retry_pending"]),_p={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},mp={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function lb(e,t,n=hp){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function cb(e){if(e.type==="cleanup")return!0;let t=e.operation;return ib.has(t.state)&&!t.dismissed&&!t.superseded_by}function ub(e,t,n={}){let r=lb(e,t,1/0),s=n.expanded===!0?hp:ab,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||cb(i));return{visible:a,hidden:r.length-a.length}}function gp(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function db(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function bp(e){let t=e.filter(n=>n.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>l`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function yp(e,t="",n=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function pb(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(mp,r)?mp[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${n}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?l`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":l`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function fb(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Gt(e.at):""}
      >${Fo(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${gp(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(_p,t.kind)?_p[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${No(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${vs(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${gp(e)}"
          >${db(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?yp(Ju(t.failure_kind,r)):""}
      ${pb(t)}
      ${bp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${No(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function _b(e){let t=e.cleanup,n=pr(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Gt(e.at):""}
      >${Fo(e.at)||"\u2014"}</span
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
        ${md(t.step).map(r=>l`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${yp(Uo(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?l`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${bp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function mb(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?_b(r):fb(r))}
        </ul>`}
    ${t>0||n?l`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${n?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function vp(e,t={}){let n=null;function r(){if(n===null){Ze(l``,e);return}let a=ub(n.operations,n.cleanup_failures,{expanded:n.expanded});Ze(mb({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var gb=Et("views:worker"),hb="tab:worker:ready",bb="tab:worker:blocked",yb="tab:worker:in-progress",vb="tab:worker:resolved",wb="tab:worker:closed",Xo=1,wp=5;function kp(e){return Ao(e).path.length>0}var kb=new Set(["quick_fix","spec_backed","full_plan"]);function $p(e){return typeof e=="string"&&kb.has(e)}var Ep="beads-ui.worker.candidate-filter",Mi={show_blocked:!1,spec:"all"};function $b(){try{let e=window.localStorage.getItem(Ep);if(!e)return{...Mi};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Mi};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Mi}}}function xb(e){try{window.localStorage.setItem(Ep,JSON.stringify(e))}catch{}}function Ab(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=n(i),d=r(i);c&&d?s.push(i):!c&&d?o+=1:c&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Sb=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Tp="bdui.worker.candidate_sort",Eb=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Jo="spec";function Tb(){try{let e=window.localStorage.getItem(Tp);return e==="board"||e==="created"||e==="spec"?e:Jo}catch{return Jo}}function Cb(e){try{window.localStorage.setItem(Tp,e)}catch{}}var Cp="bdui.worker.done-range";function Rb(){try{let e=window.localStorage.getItem(Cp);return un(e)?e:rn}catch{return rn}}function Lb(e){try{window.localStorage.setItem(Cp,e)}catch{}}var Ib="(max-width: 640px)",Rp="beads-ui.worker.lane-collapsed",Es={queue:!0,done:!0};function Ob(){try{let e=window.localStorage.getItem(Rp);if(!e)return{...Es};let t=JSON.parse(e);return!t||typeof t!="object"?{...Es}:{queue:typeof t.queue=="boolean"?t.queue:Es.queue,done:typeof t.done=="boolean"?t.done:Es.done}}catch{return{...Es}}}function Pb(e){try{window.localStorage.setItem(Rp,JSON.stringify(e))}catch{}}function xp(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Mb(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(ar):(r.sort(Ys(n)),t==="board"?r:[...r.filter(kp),...r.filter(s=>!kp(s))])}function Db(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Nb(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function Ap(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function qb(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function Fb(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function jb(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Bb(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Ub(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Di(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Wb(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,n=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,r=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=r&&typeof r.pr_number=="number"?r.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${n}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),r&&typeof r.bead_id=="string"&&a.push(`repair ${r.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:r&&typeof r.pr_url=="string"?r.pr_url:"",repair_pr_number:s}}function Sp(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function zb(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.head_review&&e.head_review.state!=="failed")return n("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Sp(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Sp(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=qb(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Ap(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Ap(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Hb(e,t,n,r,s=null,o=null,a=null,i=!1,c=null,d=!0,p=null,f=null,g=null,w={},A=!1,D=!1,W={}){let V=!!c&&c.position>0,Y=!!c?.continuation_action&&c.continuation_action.continuation===null,N=!!c&&c.active===!0,M=c&&c.failure||null,q=jb(c?c.waiting:null,g),U=n[e]||null,E=U&&U.gate?U.gate:null,R=U&&U.pr?U.pr:null,X=Wb(g),ve=Bb(c?c.resolution:null),he=Ub(c?c.head_review:null),ne=c&&c.head_review||null,Z=c&&c.authority||null,Re=!!ne&&["pending","reviewing","revising"].includes(ne.state),$e=V&&!N&&(ne?.state==="failed"||!Z||Z.source==="automatic"&&!D),ie=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ve?ve.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":q,ae=!!E&&E.base_badge==="\uCDA9\uB3CC",xe=!!E&&E.enabled===!0,B=As({bead_id:e,merge_sha:W.merge_sha,cleanup_cursor:W.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:W.repo_operations}),J=Zo(B),le=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!E&&E.tier==="merged",Ae=i&&!!r&&!!E&&E.tier==="merged",Se=$e&&(xe||ae||E?.reason==="base_behind"||E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"||le||Ae),Oe=i&&ae&&d===!1,ge=Sn(w,e,{external:i,merge_active:N||B?.step==="merge",merge_queued:V,conflict_active:!!a,cleanup_active:J,merged:!!r||E?.tier==="merged"}),it=!!ge.operation,_t=!le&&!!r&&r.step==="repo_operations",C=zb({continuation_required:Y,merge_step:B,conflict_badge:ie,conflict_live:ve?.live===!0||a==="running",head_review:ne&&he?{...he,state:ne.state,failure_reason:ne.failure_reason}:null,recovery:X,cleanup_failed:r,cleanup_label:r?pr(r.step):null,base_exception:f,conflicting:ae,gate:E,receipt_check:U&&U.receipt_check?U.receipt_check:null,queue_failure:M,auto_skip:p,queued:V,queue_active:N,queue_position:c?c.position:0,activity:ie?null:o&&o.activity||null}),me=C?.live===!0&&C.title?l`<span title=${C.title}>${C.label}</span>`:C?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:r&&B?.active!==!0?Yo(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:A,external:i,pr_number:R&&typeof R.number=="number"?R.number:null,pr_url:R&&typeof R.url=="string"?R.url:"",completion_badge:C?.live!==!0&&C?.title?C.label:null,completion_title:C?.title||"",completion_repair_pr_url:X?X.repair_pr_url:"",completion_repair_pr_number:X?X.repair_pr_number:null,badges:me?[me]:[],live_badge:C?.live===!0?me:null,usage:s,alert:C?.alert===!0,merge_action:E?.tier==="merged"&&!le&&!Ae||_t?!1:!V||Y||$e,timeline_action:_t,cancel_action:V&&!Y,cancel_enabled:(!N||Re)&&!(X&&X.lock_actions),cancel_title:X&&X.lock_actions?`${X.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:N&&!Re?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Re?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ge,discard_action:ge.action,merge_step:B,discard_enabled:ge.enabled,discard_title:ge.title,merge_enabled:!B&&!a&&!it&&!f&&!(X&&X.lock_actions)&&!Oe&&!_t&&(xe||ae||E?.reason==="base_behind"||E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"||le||Ae||Se),merge_label:Y?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":le||Ae?"\uC815\uB9AC \uC7AC\uAC1C":ae&&!B&&!le?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":E?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":$e?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:it?ge.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ge.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ge.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Y?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":B?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${B.label}`:Ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Oe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ae?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":xe?`\uBA38\uC9C0 (${E.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:E&&E.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${E&&E.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ni(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:d,doneRange:p,onDoneRangeChange:f}=t,g=r?Qs(r,i):null,w=to({transport:n,uiOrderStore:i}),A=null,D=[],W=$b(),V=null,Y=null,N={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},M=Tb(),q=un(p)?p:Rb(),U=new Map;function E(){let u=jn.find(m=>m.value===q);return u?u.label:"\uC624\uB298"}let R=Ob(),X=!1,ve=new Set,he=new Set,ne=new Set,Z=new Set,Re=new Set,$e={},ie=null,ae=0,xe=null,B=[];function J(u){return ie===u?$e:{}}async function le(){if(!n)return;let u=d?.()||"";if(ie===u||xe&&xe.key===u&&xe.generation===ae)return;let m=++ae;xe={key:u,generation:m};let v=null;try{v=await Promise.resolve(n("get-session-defaults",{}))}catch(j){if(m!==ae)return;xe=null,gb("get-session-defaults failed: %o",j),Ue();return}m===ae&&($e=v&&typeof v.values=="object"&&v.values!==null?{...v.values}:{},ie=u,xe=null,Ue())}function Ae(){ie=null,ae+=1,le()}let Se=document.createElement("div");Se.className="worker-console";let Oe=document.createElement("div");Oe.className="worker-top";let ge=document.createElement("div");ge.className="worker-drawer-overlay",ge.hidden=!0;let it=document.createElement("div");it.className="worker-drawer-overlay__backdrop";let _t=document.createElement("div");_t.className="worker-drawer-host";let C=document.createElement("div");C.className="worker-drawer-host",C.hidden=!0,ge.append(it,_t,C);let me=document.createElement("div");me.className="worker-lanes-host",Se.append(Oe,ge,me),e.appendChild(Se);let ke=null,Le=null,Me=Mr(_t,{transport:n,sessionLogStore:a,onClose:()=>{ke=null,Le=null,ge.hidden=!0,Ue()}}),Be=vp(C,{onClose:()=>{C.hidden=!0,ge.hidden=!0,Ue()}}),z=pp({getWorkspacePath:d||(()=>"")}),K=d&&d()||"",De=fp({queueStore:s,transport:n,onChanged:()=>Ue(),onOpenScript:(u,m)=>{z.open(u,m)}}),Qe=o?ip(Se,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:d,onOpenTranscript:(u,m)=>$(u,m)}):null;function We(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Xo,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function we(){let u=We(),m=typeof u.serial_lane_count=="number"&&Number.isInteger(u.serial_lane_count)&&u.serial_lane_count>0?Math.min(u.serial_lane_count,5):0,v=Array.isArray(u.serial_lanes)?u.serial_lanes:[],j=[];for(let Te of v){if(j.length>=m)break;!Te||typeof Te.id!="string"||!/^s[1-5]$/.test(Te.id)||!Array.isArray(Te.entries)||j.push({id:Te.id,label:`\uC9C1\uB82C ${Te.id.slice(1)}`,count:Te.entries.length})}return j.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(u.queue)?u.queue:[]).length},...j]}function P(u){if(!V||!u.some(v=>v.id===V))return null;let m=we();return m?{bead_id:V,lanes:m}:null}function H(){let u=We();return typeof u.revision=="number"?u.revision:0}function ee(u){u&&u.queue&&s&&s.set(u.queue)}function Q(){let u=We().queue;return Array.isArray(u)?u.length:0}async function Pe(u,m,v){if(!n)return;let j=()=>({bead_id:u,...m==="parallel"?{}:{lane:m},...v===void 0?{}:{index:v},expected_revision:H()}),pe=await n("worker-queue-place",j());ee(pe),pe&&pe.conflict&&await n("worker-queue-place",j()).then(ee)}async function tt(u,m,v){if(!n)return;let j=()=>({bead_id:u,...m==="parallel"?{}:{lane:m},to_index:v,expected_revision:H()}),pe=await n("worker-queue-reorder",j());ee(pe),pe&&pe.conflict&&await n("worker-queue-reorder",j()).then(ee)}async function st(u){if(!n)return;let m=await n("worker-queue-remove",{bead_id:u,expected_revision:H()});ee(m),m&&m.conflict&&await n("worker-queue-remove",{bead_id:u,expected_revision:H()}).then(ee)}async function Je(u){if(!n||!u)return;let m=await n("worker-attempt-pause",{attempt_id:u});m&&m.paused===!1&&m.reason&&ue(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function vt(u){if(!n||!u)return;let m=await Lr();if(m===null)return;let v=async(pe={})=>await n("worker-attempt-resume",{attempt_id:u,expected_revision:H(),...m!==""?{instructions:m}:{},...pe}),j=await v();ee(j),j&&j.conflict&&(j=await v(),ee(j)),j=await Cn(j,(pe,Te)=>v({continuation:pe,decision_token:Te}),{onResult:ee,refresh:()=>v()}),j&&j.resumed===!1&&!j.conflict&&j.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${j.reason}`,"error",2400)}async function mt(u){if(!n||!u)return;let m=await n("worker-attempt-dismiss",{attempt_id:u,expected_revision:H()});ee(m),m&&m.conflict&&(m=await n("worker-attempt-dismiss",{attempt_id:u,expected_revision:H()}),ee(m)),m&&m.dismissed===!1&&!m.conflict&&m.reason&&ue(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function ot(u,m,v=!0){if(!n)return null;let j=n,pe=await j(u,{...m,expected_revision:H()});return ee(pe),pe&&pe.conflict&&v&&(pe=await j(u,{...m,expected_revision:H()}),ee(pe)),pe}async function ut(u){if(!n||!u)return;let m=We().merge_queue?.find(j=>j.bead_id===u)?.continuation_action;if(m?.mismatch&&m.continuation===null){await Ve(u,m.mismatch);return}ve.add(u),Ue();let v;try{v=await ot("worker-merge-queue-add",{bead_id:u})}catch{ue("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ve.delete(u),Ue()}if(!(!v||v.applied)){if(v.conflict){ue("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ue(Fb(v.reason),"error",2400)}}async function gt(u){if(!(!n||!u||he.has(u))){he.add(u),Ue();try{let m=await n("worker-cleanup-retry",{bead_id:u,expected_revision:H()});ee(m),m&&!m.retried&&!m.conflict&&m.reason&&ue(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${m.reason}`,"error",2400)}finally{he.delete(u),Ue()}}}async function Ve(u,m){let v=await Cn({continuation_mismatch:m},(pe,Te)=>ot("worker-merge-queue-add",{bead_id:u,continuation:pe,decision_token:Te},!1)),j=v?.queue?.merge_queue?.find(pe=>pe.bead_id===u)?.continuation_action;if(v?.applied!==!0&&j?.continuation===null&&j.mismatch){await Ve(u,j.mismatch);return}v&&v.applied===!1&&!v.conflict&&ue("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ne(u){if(!n)return;let m=await ot("worker-merge-auto-toggle",{on:u});!m||m.conflict||ue(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function He(u){if(!n||!u)return;let m=await ot("worker-merge-queue-remove",{bead_id:u});m&&!m.conflict&&!m.applied&&m.reason==="merge_active"&&ue("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function wt(){await ot("worker-merge-queue-remove",{all:!0})}async function lt(u,m=null,v="unmerged",j=null){if(!n||!u)return;let pe=ws(u,v);if(!(!!j||typeof globalThis.confirm!="function"||globalThis.confirm(pe)))return;let Ee=await n("worker-discard",{bead_id:u,...m?{attempt_id:m}:{},...j?{operation_id:j}:{},expected_revision:H()});if(ee(Ee),Ee&&Ee.conflict&&(Ee=await n("worker-discard",{bead_id:u,...m?{attempt_id:m}:{},...j?{operation_id:j}:{},expected_revision:H()}),ee(Ee)),Ee&&Ee.discarded===!0){ue(jo(Ee),"success",5e3);return}if(Ee&&Ee.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${Ee.reason}`,"error",2800);return}if(Ee&&Ee.accepted&&Ee.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ee&&Ee.accepted&&!Ee.discarded){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${Ee.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ee&&!Ee.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function G(u,m,v){if(!(!n||!m||!v||Z.has(m))){Z.add(m),Ue();try{let j=await n(u,{bead_id:m,action_id:v,expected_revision:H()});ee(j),j?.conflict?ue("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!j?.ok&&j?.reason&&ue(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(j.reason)}`,"error",2800)}finally{Z.delete(m),Ue()}}}async function fe(u,m){if(!n||!m||ne.has(m))return;ne.add(m),Ue();let v;try{let j=async(pe={})=>await n(u,{bead_id:m,expected_revision:H(),...pe});v=await j(),ee(v),v&&v.conflict&&(v=await n(u,{bead_id:m,expected_revision:H()}),ee(v)),u==="worker-revise-fix"&&(v=await Cn(v,(pe,Te)=>j({continuation:pe,decision_token:Te}),{onResult:ee,refresh:()=>j()}))}finally{ne.delete(m),Ue()}if(!(!v||v.conflict)){if(v.ok){ue(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ue(`\uCC98\uBD84 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}}async function qe(u){if(!n)return;let m=await n("worker-automation-toggle",{on:u,expected_revision:H()});ee(m),m&&m.conflict&&await n("worker-automation-toggle",{on:u,expected_revision:H()}).then(ee)}async function S(u){if(!n||!u)return;let m=await n("worker-repo-operation-repair",{operation_id:u});if(ee(m),m&&m.ok===!1){ue(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${m.reason||""}`,"error",3e3);return}m&&m.ok===!0&&ue("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function O(u){if(!n||!u)return;let m=await n("worker-repo-operation-dismiss",{operation_id:u});ee(m),m&&m.ok===!1&&ue(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${m.reason||""}`,"error",3e3)}async function k(u){if(!n||!Number.isFinite(u))return;let m=Math.max(Xo,Math.floor(u)),v=await n("worker-queue-set-slots",{slots:m,expected_revision:H()});ee(v),v&&v.conflict&&await n("worker-queue-set-slots",{slots:m,expected_revision:H()}).then(ee)}async function L(u){if(!n||!Number.isInteger(u)||u<1||u>wp)return;let m=We(),v=(Array.isArray(m.serial_lanes)?m.serial_lanes:[]).slice(u).reduce((Te,Ee)=>Te+(Array.isArray(Ee?.entries)?Ee.entries.length:0),0),j=()=>({count:u,expected_revision:H()}),pe=await n("worker-queue-set-serial-lane-count",j());ee(pe),pe&&pe.conflict&&(pe=await n("worker-queue-set-serial-lane-count",j()),ee(pe)),pe&&pe.applied&&v>0&&ue(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${v}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let oe="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function de(u,m){let v=Pi(u,m.id,N);return{id:m.id,title:m.title,location_label:m.location_label,prefixes:m.prefixes,action:v.kind==="note"?{kind:"note",text:v.text}:v.kind==="disabled"?{kind:"disabled",label:oe,title:v.title}:{kind:"place",label:oe,title:v.title}}}function re(u,m){if(!Y||Y.bead_id!==u)return null;let v=Y.counterpart_id,j=v===null?m:m.filter(pe=>pe.id===v);return j.length===0?null:{rows:j.map(pe=>de(u,pe))}}async function be(u,m){let v=Pi(u,m,N);if(Y=null,v.kind!=="ops"){Ue();return}let j=H();for(let pe of v.ops){let Te=await ct(pe,j);if(Te===null)break;j=Te}Ue()}async function ct(u,m){if(!n)return null;try{let v=await n("worker-queue-place",{bead_id:u.bead_id,lane:u.lane,index:u.index,expected_revision:m});if(ee(v),v&&v.conflict)return ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!v||v.applied!==!0)return ue(v&&typeof v.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${v.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let j=v.queue?v.queue.revision:void 0;return typeof j!="number"?(ue("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):j}catch(v){return ue(v instanceof Error&&v.message?v.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function Xe(){let u=We(),m=g?g.selectBoardColumn(hb,"ready"):[],v=g?g.selectBoardColumn(bb,"blocked"):[],j=g?g.selectBoardColumn(wb,"closed"):[],pe=g?g.selectBoardColumn(yb,"in_progress"):[],Te=g?g.selectBoardColumn(vb,"resolved"):[],Ee=Js([...m,...v,...pe,...Te,...j]),ze=new Map;for(let _ of[...m,...v,...pe])_&&_.id&&!ze.has(_.id)&&ze.set(_.id,_);let dt={...J(d?.()||"")};for(let _ of["orchestration_model","orchestration_effort","orchestration_speed"]){let F=u[_];typeof F=="string"&&(dt[_]=F)}function jt(_,F){let se=ze.get(_);if(!se)return null;let Ge=se.metadata&&typeof se.metadata=="object"?se.metadata:{},rt=se.workflow?.route,Dt=Ge.route,Ot=$p(rt)?rt:$p(Dt)?Dt:null;return en({pin:Ge,global:dt,execution_defaults:u.execution_defaults??null,runner_catalog:u.runner_catalog??null,route:Ot,controller_runtime:F})}function nn(_){let F=_.runner||null,se=jt(_.bead_id,F),Ge=Wo(_),rt=se?Kn(se,F):null;return Ge||rt?{orchestration:Ge,worker:rt}:null}let qn=new Map;function zr(_){if(qn.has(_))return qn.get(_)??null;let F=jt(_,null),se=null;if(F){let Ge=vn(u.runner_catalog??null,F.orchestration_model.value??""),rt=Ge===null?F:jt(_,Ge),Dt=dr(rt,u.runner_catalog??null),Ot=Kn(rt,Ge);se=Dt||Ot?{orchestration:Dt,worker:Ot}:null}return qn.set(_,se),se}function fr(_){let F=eo(Ee,_);return F.total===0?null:F}let Bi=u.bead_titles||{},Qt=new Map;for(let[_,F]of Object.entries(Bi))typeof F=="string"&&F.length>0&&Qt.set(_,F);for(let _ of[...m,...v])Qt.set(_.id,_.title||_.id);let Hr=new Map;for(let _ of[...m,...v,...pe,...Te,...j])_&&_.id&&typeof _.from_id=="string"&&Hr.set(_.id,_.from_id);let Ts=u.bead_times&&typeof u.bead_times=="object"&&!Array.isArray(u.bead_times)?u.bead_times:{},Cs=u.bead_labels&&typeof u.bead_labels=="object"&&!Array.isArray(u.bead_labels)?u.bead_labels:{},kn=u.bead_workflow&&typeof u.bead_workflow=="object"&&!Array.isArray(u.bead_workflow)?u.bead_workflow:{},Fn=new Map;for(let[_,F]of Object.entries(Cs))Array.isArray(F)&&Fn.set(_,Li(F));for(let _ of[...m,...v]){let F=_.labels;Array.isArray(F)&&!Fn.has(_.id)&&Fn.set(_.id,Li(F))}let _r=new Map,mr=o?.get()?.last_good?.result?.groups;for(let _ of Array.isArray(mr)?mr:[]){if(_?.eligible!==!0||!Array.isArray(_.members))continue;let F=_.members.map(Ge=>{let rt=(Array.isArray(u.serial_lanes)?u.serial_lanes:[]).find(Dt=>Dt.entries.some(Ot=>Ot.bead_id===Ge));return rt?rt.id:null});if(!(F.every(Ge=>Ge!==null)&&new Set(F).size===1))for(let Ge of _.members)_r.set(Ge,_.members.filter(rt=>rt!==Ge))}let Rs=u.bead_blocked_by&&typeof u.bead_blocked_by=="object"&&!Array.isArray(u.bead_blocked_by)?u.bead_blocked_by:{},gr=new Map;for(let[_,F]of Object.entries(Ts))F&&typeof F=="object"&&gr.set(_,F);for(let _ of[...m,...v])gr.set(_.id,{created_at:_.created_at,updated_at:_.updated_at});let Qn=_=>gr.get(_)||{},Xn=u.pr_wait||[],hr=u.pr_observations||{},Ls=u.pr_activity||{},je=u.cleanup_failed||{},pt=Object.entries(je).map(([_,F])=>({bead_id:_,step:F&&F.step?F.step:"",reason:F&&F.reason?F.reason:"",at:F&&typeof F.at=="number"?F.at:null,detail:F&&typeof F.detail=="string"?F.detail:null,output_tail:F&&typeof F.output_tail=="string"&&F.output_tail?F.output_tail:void 0,log_path:F&&typeof F.log_path=="string"&&F.log_path?F.log_path:void 0,retry_count:F&&typeof F.retry_count=="number"&&Number.isInteger(F.retry_count)&&F.retry_count>0?F.retry_count:0,failure_code:F&&typeof F.failure_code=="string"?F.failure_code:void 0,subject_id:F&&typeof F.subject_id=="string"?F.subject_id:void 0,repair_eligible:!!(F&&F.repair_eligible),repair:F&&F.repair?F.repair:void 0})),Xt=u.queue||[],Ui=new Set([...Xt.map(_=>_.bead_id),...(Array.isArray(u.serial_lanes)?u.serial_lanes:[]).flatMap(_=>(Array.isArray(_?.entries)?_.entries:[]).map(F=>F.bead_id)),...Xn.map(_=>_.bead_id),...u.done.map(_=>_.bead_id)]),Wp=new Set(v.map(_=>_.id)),zp=i?i.get()?.order||{}:{},Wi=new Set,zi=[];for(let _ of[...m,...v])Ui.has(_.id)||Wi.has(_.id)||Db(_)||(Wi.add(_.id),zi.push(_));D=Mb(zi,M,zp);let Hp=u.admission||{},Hi=_=>{let F=Hp[_];if(!F)return"";if(F.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let se=typeof F.reason=="string"?F.reason:"",Ge=se.indexOf(":");return Ge>0&&Ge<se.length-1?`\u26D4 ${se.slice(0,Ge)} (${se.slice(Ge+1)})`:`\u26D4 ${se}`},Gp=D.map(_=>{let F=Ao(_),se=F.path.length>0,Ge=_.workflow?.route==="quick_fix"||_.metadata&&_.metadata.route==="quick_fix",rt=!Object.hasOwn(_,"description")||typeof _.description=="string"&&_.description.trim().length>0,Dt=Object.hasOwn(_,"labels")&&ap(_.labels),Ot=!Dt&&(Ge?rt:se&&!F.conflict),$t=Wp.has(_.id),mn=[];$t&&mn.push(Nb(_)),Ge&&!rt?mn.push("missing_description"):!Ge&&F.conflict?mn.push("spec_id_conflict"):!Ge&&!se&&mn.push("spec \uC5C6\uC74C");let js=Hi(_.id);return js&&mn.push(js),{id:_.id,title:_.title||_.id,reason:mn.join(" \xB7 "),draggable:Ot,lane:"candidate",created_at:_.created_at,updated_at:_.updated_at,workflow:_.workflow,is_quick_fix:Ge,status:_.status,worker_ineligible:Dt,blocked:$t,has_spec:se,exec_chips:zr(_.id),from_id:_.from_id||void 0}}),ea=Ab(Gp,W),ta=ea.visible,Vp=u.revise_parked||{},Is=u.discard_operations&&typeof u.discard_operations=="object"&&!Array.isArray(u.discard_operations)?u.discard_operations:{},na=(_,F)=>_.map((se,Ge)=>{let rt=F!=="done",Dt=F!=="done"&&F!=="queue",Ot=rt?Vp[se.bead_id]:null,$t=rt?Sn(Is,se.bead_id):null,mn=$t?.operation?$t:null,js=rt&&Fn.get(se.bead_id)===!0,wl=Rs[se.bead_id]||[],da=u.admission&&typeof u.admission=="object"?u.admission[se.bead_id]:null,pa=rt?Ku(da,!!mn||Z.has(se.bead_id)):null,rf=rt&&!pa?Hi(se.bead_id):null,sf=rt?[rf]:[],kl=rt&&wl.length>0&&typeof da?.reason=="string"&&da.reason.startsWith("not_ready")?[`\u23F8 ${wl.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],fa=rt?_r.get(se.bead_id):void 0;return fa&&fa.length>0&&kl.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${fa.join(", ")}\uC640`),{id:se.bead_id,title:Qt.get(se.bead_id)||se.bead_id,reason:sf.filter(Boolean).join(" \xB7 "),draggable:rt&&!mn&&!pa,done:F==="done",lane:F,seq:Dt?Ge+1:void 0,worker_serial:js,discard:mn,stale_work:pa,badges:[...kl,...Ot?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Ot,revise_action:!!Ot,revise_enabled:!!Ot&&!mn&&!ne.has(se.bead_id),revise_title:Ot?Ot.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ot.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:F==="done"?dn(u.attempts||{},se.bead_id):null,work_ms:F==="done"?qo(u.attempts||{},se.bead_id):null,done_at:F==="done"&&typeof se.added_at=="number"?se.added_at:void 0,exec_chips:rt?zr(se.bead_id):null,workflow:rt&&kn[se.bead_id]||null,from_id:Hr.get(se.bead_id)||void 0,...Qn(se.bead_id)}}),br=u.attempts?Object.values(u.attempts):[],ra=new Set;for(let _ of br)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&ra.add(_.resumed_from);let Gi=new Map;for(let _ of br)Gi.set(_.bead_id,_.attempt_id);let Os=new Map;for(let _ of br)Os.set(_.attempt_id,_);function sa(_){let F=new Set,se=_;for(;se&&!F.has(se.attempt_id);){if(se.conflict_resolution===!0)return!0;F.add(se.attempt_id),se=typeof se.resumed_from=="string"&&se.resumed_from.length>0&&Os.get(se.resumed_from)||null}return!1}let Ps=typeof u.declared_base=="string"?u.declared_base:null;function Kp(_){let F=null;for(let se of br)!se||se.bead_id!==_||sa(se)||(F===null||(typeof se.started_at=="number"?se.started_at:0)>=(typeof F.started_at=="number"?F.started_at:0))&&(F=se);return F&&typeof F.target_base=="string"?F.target_base:null}let oa=[],Ms=[],Yp=op(u),Vi=_=>{let F=typeof _.session_id=="string"&&_.session_id.length>0,se=ra.has(_.attempt_id);return{eligible:F&&!se,reason:F?se?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},_n=null;for(let _ of br){let F=_.status==="paused"&&!ra.has(_.attempt_id);if(_.status==="running"||F)Ms.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:Qt.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,paused:F,conflict_resolution:sa(_),base_exception:Di(Ps,_.target_base),can_pause:typeof _.session_id=="string"&&_.session_id.length>0,discard:Sn(Is,_.bead_id,{attempt_id:_.attempt_id}),workflow:kn[_.bead_id]||null,usage:dn(u.attempts||{},_.bead_id),rollup:fr(_.bead_id),rollup_expanded:Re.has(_.bead_id),exec_chips:nn(_),...Qn(_.bead_id)});else if((_.status==="failed"||_.status==="orphaned")&&Yp(_)){let se=Vi(_);oa.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:Qt.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,failed:!0,status:_.status,status_label:_.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Sn(Is,_.bead_id,{attempt_id:_.attempt_id}),resume_eligible:se.eligible,resume_reason:se.reason,conflict_resolution:sa(_),base_exception:Di(Ps,_.target_base),workflow:kn[_.bead_id]||null,usage:dn(u.attempts||{},_.bead_id),rollup:fr(_.bead_id),rollup_expanded:Re.has(_.bead_id),exec_chips:nn(_),...Qn(_.bead_id)}),_n=_}}let Ki=new Set([...oa,...Ms].map(_=>_.bead_id));for(let _ of Array.isArray(u.session_active)?u.session_active:[]){let F=_&&_.bead_id;typeof F!="string"||F.length===0||Ki.has(F)||(Ki.add(F),Ms.push({bead_id:F,attempt_id:null,kind:"session",title:_.title||Qt.get(F)||F,status:"in_progress",started_at:$n(_.started_at)??$n(_.updated_at),updated_at:$n(_.updated_at),workflow:_.workflow||null,runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1}))}let yr=[...oa,...Ms].map(_=>{let F=Os.get(_.attempt_id),se=F?.quickfix_landing;if(F?.quickfix_lane!==!0||!se||typeof se!="object")return _;let Ge=typeof se.reason=="string"&&se.reason.length>0?se.reason:null,rt=As({bead_id:F.bead_id,merge_sha:se.head_sha,cleanup_cursor:se.cursor,cleanup_failed:Ge?{step:se.cursor,reason:Ge}:null,repo_operations:Array.isArray(u.repo_operations)?u.repo_operations:[]});return rt?{..._,landing:rt}:_}),Yi=null;if(_n){let _=Vi(_n),F=_n.cause_detail;Yi={bead_id:_n.bead_id,repo:_n.repo||"",reason:_n.cause||_n.status,cause_detail:F&&typeof F.reason=="string"?{reason:F.reason,command:typeof F.command=="string"?F.command:null}:null,resume_attempt_id:_n.attempt_id,resume_eligible:_.eligible,resume_reason:_.reason,discard:Sn(Is,_n.bead_id,{attempt_id:_n.attempt_id})}}let Zi=new Set(yr.map(_=>_.bead_id)),aa=Array.isArray(u.merge_queue)?u.merge_queue:[],Qi=new Map,Xi=new Map,Ji=new Map,el=new Map,tl=new Map;aa.forEach((_,F)=>{_&&typeof _.bead_id=="string"&&(Qi.set(_.bead_id,F+1),Xi.set(_.bead_id,_.resolution),Ji.set(_.bead_id,_.continuation_action||null),el.set(_.bead_id,_.head_review||null),tl.set(_.bead_id,_.authority||null))});let vr=u.merge_queue_state||{active:null,failures:{}},Zp=vr.failures||{},nl=vr.waiting&&typeof vr.waiting.bead_id=="string"&&typeof vr.waiting.reason=="string"?vr.waiting:null,Qp=u.auto_merge_skips||{},rl=_=>{let F=Qp[_];if(!F)return null;let se=hr[_],Ge=se&&se.pr?se.pr.head_sha:null;return Ge&&Ge===F.head_sha?F.reason||"":null},Ds=new Map;for(let _ of yr)_.failed!==!0&&_.conflict_resolution&&(_.paused?Ds.has(_.bead_id)||Ds.set(_.bead_id,"paused"):Ds.set(_.bead_id,"running"));let sl=yr.filter(_=>_.kind!=="session"&&!_.paused&&_.failed!==!0).length,ol=(u.workspace_info||{}).slots,al=typeof ol=="number"?ol:typeof u.slots=="number"?u.slots:Xo,Xp=sl>al,Ns=sr(q),Jp=(Array.isArray(u.done)?u.done.slice():[]).filter(_=>Ns===void 0||typeof _.added_at!="number"||_.added_at>=Ns).sort((_,F)=>(F.added_at||0)-(_.added_at||0)),Gr=na(Jp,"done"),ef=new Set((Array.isArray(u.done)?u.done:[]).map(_=>_?.bead_id).filter(_=>typeof _=="string")),il=[],tf=d?.()||"";for(let _ of j){let F=$n(_.closed_at);if(typeof _.id!="string"||ef.has(_.id)||F===null||Ns!==void 0&&F<Ns||typeof _.comment_count!="number"||_.comment_count<=0)continue;let se=`${tf}\0${_.id}\0${String(_.updated_at)}\0${_.comment_count}`,Ge=U.get(se);Ge===void 0&&n&&(U.set(se,"pending"),Promise.resolve(n("get-comments",{id:_.id})).then(rt=>{let Dt=Array.isArray(rt)&&rt.some(Ot=>So(typeof Ot?.text=="string"?Ot.text:"")?.lane==="session");U.set(se,Dt?"session":"not-session"),Ue()}).catch(()=>{U.set(se,"failed"),Ue()})),Ge==="session"&&il.push({id:_.id,title:_.title||_.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:F,created_at:_.created_at,updated_at:_.updated_at})}Gr.push(...il),Gr.sort((_,F)=>(F.done_at||0)-(_.done_at||0));let qs={};for(let _ of Rn)qs[_]=0;let ll=!1,cl=0,ia=0,ul=0;for(let _ of Gr){let F=_.usage;if(F&&typeof F=="object"){let se=!1;for(let Ge of Rn)Number.isFinite(F[Ge])&&(qs[Ge]+=F[Ge],ll=!0,se=!0);se&&(ia+=1,Number.isFinite(F.total_cost_usd)&&(cl+=F.total_cost_usd,ul+=1))}}ia>0&&ul===ia&&(qs.total_cost_usd=cl);let dl=Gr.map(_=>_.usage).filter(_=>_&&typeof _=="object"&&_.providers),nf=dl.length>0?Bt(uo(dl)):ll?Ln(qs):null,pl=u.lane_states&&typeof u.lane_states=="object"&&!Array.isArray(u.lane_states)?u.lane_states:{},fl=Array.isArray(u.serial_lanes)?u.serial_lanes:[],_l=_=>{if(Xn.some(Ge=>Ge.bead_id===_))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let F=br.filter(Ge=>Ge&&Ge.bead_id===_),se=F.length>0?F[F.length-1].status:null;return se==="failed"||se==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":se==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Fs=fl.filter(_=>_&&typeof _.id=="string"&&Array.isArray(_.entries)).map((_,F)=>{let se=pl[_.id]||{},Ge=new Map((Array.isArray(se.corrections)?se.corrections:[]).filter($t=>$t&&typeof $t.bead_id=="string"&&typeof $t.after=="string").map($t=>[$t.bead_id,$t.after])),rt=na(_.entries.filter($t=>!Zi.has($t.bead_id)),_.id).map($t=>Ge.has($t.id)?{...$t,badges:[`\u{1F517} ${Ge.get($t.id)} \uB4A4 (blocks \uC790\uB3D9)`,...$t.badges]}:$t),Dt=Array.isArray(se.occupied_by)?se.occupied_by.filter($t=>typeof $t=="string"):[],Ot=Dt.map($t=>({id:$t,title:Qt.get($t)||$t,draggable:!1,lane:_.id,ghost:!0,badges:[_l($t)]}));return{id:_.id,index:F+1,rows:[...Ot,...rt],occupied:Dt.length>0,badge:Dt.length>0?_l(Dt[0]):"\uB300\uAE30",cycle:se.cycle===!0}}),ml=typeof u.serial_lane_count=="number"?u.serial_lane_count:Fs.length,la=na(Xt.filter(_=>!Zi.has(_.bead_id)),"queue"),gl=new Map,hl=new Set;for(let[_,F]of Object.entries(pl)){if(!/^s[1-5]$/.test(_))continue;let se=F&&Array.isArray(F.occupied_by)?F.occupied_by:[];for(let Ge of se)typeof Ge=="string"&&gl.set(Ge,_);se.length>0&&hl.add(_)}let wr=[];for(let _ of yr)typeof _.bead_id=="string"&&wr.push({id:_.bead_id,title:Qt.get(_.bead_id)||_.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:gl.get(_.bead_id)??null});for(let _ of Fs)for(let F of _.rows)F.ghost!==!0&&wr.push({id:F.id,title:F.title,location_label:`${_.id} #${F.seq??""}`.trim(),kind:"serial",lane_id:_.id});la.forEach((_,F)=>{wr.push({id:_.id,title:_.title,location_label:`#${F+1}`,kind:"parallel",lane_id:null})});for(let _ of ta)wr.push({id:_.id,title:_.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let bl={};for(let _ of fl)_&&typeof _.id=="string"&&Array.isArray(_.entries)&&(bl[_.id]=_.entries.length);let ca=new Map;for(let _ of wr)ca.has(_.id)||ca.set(_.id,_);N={members_by_id:ca,serial_raw_lengths:bl,serial_lane_count:ml,occupied_lanes:hl};let yl=lp(u.bead_scope,wr),ua=(_,F)=>{let se=yl.get(_.id);if(!se||se.overlaps.length===0&&!se.scope_missing)return _;let Ge=re(_.id,se.overlaps);return _.dependency_chips={..._.dependency_chips||{},...se.overlaps.length>0?{overlaps:se.overlaps}:{},...se.scope_missing&&F!=="running"?{scope_missing:!0}:{},...Ge?{popover:Ge}:{}},_};for(let _ of la)ua(_,"queue");for(let _ of Fs)for(let F of _.rows)F.ghost!==!0&&ua(F,_.id);for(let _ of ta)ua(_,"candidate");let vl=new Map;for(let _ of yr){let F=typeof _.bead_id=="string"?yl.get(_.bead_id):void 0;if(!F||F.overlaps.length===0)continue;let se=re(_.bead_id,F.overlaps);vl.set(_.bead_id,{dependency_chips:{overlaps:F.overlaps,...se?{popover:se}:{}}})}return{queue:u,idToTitle:Qt,candidates:ta,candidate_hidden:{blocked:ea.hidden_blocked,spec:ea.hidden_spec},running:yr,live_count:sl,slots:al,over_cap:Xp,failure:Yi,waiting:la,serial_lanes:Fs,serial_lane_count:ml,running_overlays:vl,pr_wait:Xn.map(_=>Hb(_.bead_id,Qt.get(_.bead_id)||_.bead_id,hr,je[_.bead_id]||null,dn(u.attempts||{},_.bead_id),Ls[_.bead_id]||(ve.has(_.bead_id)||he.has(_.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Ds.get(_.bead_id)||null,_.external===!0,{position:Qi.get(_.bead_id)||0,active:vr.active===_.bead_id,failure:Zp[_.bead_id]||null,waiting:nl?.bead_id===_.bead_id?nl.reason:null,resolution:Xi.get(_.bead_id),continuation_action:Ji.get(_.bead_id),head_review:el.get(_.bead_id)||null,authority:tl.get(_.bead_id)||null},_.wt_present!==!1,u.auto_merge===!0?rl(_.bead_id):null,Di(Ps,Kp(_.bead_id)),u.completion_status&&typeof u.completion_status=="object"&&!Array.isArray(u.completion_status)&&u.completion_status[_.bead_id]||null,u.discard_operations&&typeof u.discard_operations=="object"&&!Array.isArray(u.discard_operations)?u.discard_operations:{},Os.get(Gi.get(_.bead_id)||"")?.worker_serial===!0,u.auto_merge===!0,{merge_sha:_.merge_sha,cleanup_cursor:_.cleanup_cursor,repo_operations:Array.isArray(u.repo_operations)?u.repo_operations:[]})).map(_=>({..._,workflow:kn[_.id]||null,...Qn(_.id)})),merge_queue_length:aa.length,merge_queue_running:aa.length>0,auto_excluded:Xn.map(_=>_.bead_id).filter(_=>rl(_)!==null),declared_base:Ps,done:Gr,token_total:nf,cleanup_failures:pt,repo_operations:Array.isArray(u.repo_operations)?u.repo_operations:[]}}function Ye(){let m=!!o?.get()?.job,v=!m&&o?.isPending?.()===!0,j=m?"\uBD84\uC11D \uC911":v?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${j?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${j?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${j?l`<span class="worker-analysis-btn__badge">${j}</span>`:""}
    </button>`}function bt(u){let m=u.waiting.length>0?u.waiting[0].id:"\u2014",v=l`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,j=Mt(u),pe=u.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Te=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${E()} 완료 <b>${u.done.length}</b></span
      >`,Ee=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,ze=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Xo}
          step="1"
          .value=${String(u.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:wp},(nn,qn)=>qn+1).map(nn=>l`<option
                value=${String(nn)}
                ?selected=${u.serial_lane_count===nn}
              >
                ${nn}
              </option>`)}
        </select>
      </label>
      ${o?Ye():""} `,dt=td({failure:u.failure}),jt=Vu(u.repo_operations,u.cleanup_failures);return X?l`<div class="worker-ribbon">
          ${v} ${j}
          <div class="worker-kpi worker-kpi--ribbon">${pe}${Te}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${ze}</div>
          <div class="worker-kpi">${Ee}</div>
        </div>
        ${jt}${De.template()}${dt}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${v}${j}${ze}</div>
        <div class="worker-kpi">
          ${pe}${Te}${Ee}
          ${(Array.isArray(u.token_total)?u.token_total:u.token_total?[{label:u.token_total,tooltip:`${E()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(nn=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${nn.tooltip}
                >${E()} 완료 · 누적 ${nn.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${m}</b></span
          >
        </div>
      </div>
      ${jt}${De.template()}${dt}`}function St(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let m=u.running.some(v=>v.kind!=="session"&&!v.paused&&v.failed!==!0);return l`<section
      class="worker-now${m?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${u.running.length+u.pr_wait.length}</span
        >
      </header>
      ${u.running.length>0?bi(u.running,Date.now(),ke,u.running_overlays):""}
      ${u.pr_wait.map(v=>Hn(v))}
    </section>`}function yt(u){let m=u.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${W.show_blocked}
        />
        🔒 blocked${m.blocked>0?` ${m.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Sb.map(v=>l`<button
              type="button"
              class="worker-filter__chip${W.spec===v.value?" is-active":""}"
              data-spec=${v.value}
              aria-pressed=${W.spec===v.value?"true":"false"}
            >
              ${v.label}
            </button>`)}
        ${m.spec>0?l`<span class="worker-filter__hidden">숨김 ${m.spec}</span>`:""}
      </div>
    </div>`}function Ct(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${M}
    >
      ${Eb.map(u=>l`<option value=${u.value} ?selected=${M===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function zt(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${q}
      >
        ${jn.map(u=>l`<option value=${u.value} ?selected=${q===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function Nt(u){let m=l`<span
      class="worker-lane__badge${u.occupied?" worker-lane__badge--held":""}"
      >${u.badge}</span
    >`,v=u.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return fn({id:`worker-pane-lane-${u.id}`,lane:u.id,title:`\uC9C1\uB82C ${u.index}`,items:u.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:m,controls:v})}function Mt(u){let m=u.queue.auto_merge===!0;if(u.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${m?" is-active":""}"
        title=${m?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${m?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(m)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let v=new Set(u.auto_excluded),j=u.pr_wait.filter(pe=>pe.merge_action&&pe.merge_enabled&&!v.has(pe.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${j>0?` ${j}`:""}
    </button>`}function Ft(u){let m=fn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ct(),controls:yt(u),place_menu:P(u.candidates)});return X?l`<div class="worker-lanes worker-lanes--mobile">
        ${St(u)}
        ${fn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:R.queue,preview:xp(u.waiting)})}
        ${u.serial_lanes.map(v=>Nt(v))}
        ${m}
        ${fn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${E()} \uC644\uB8CC \uC5C6\uC74C`,controls:zt(),collapsible:!0,collapsed:R.done,preview:Array.isArray(u.token_total)?u.token_total.map(v=>v.label).join(" \xB7 "):u.token_total||xp(u.done)})}
      </div>`:l`<div class="worker-lanes">
      ${m}
      <div class="worker-wait">
        ${fn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${u.serial_lanes.map(v=>Nt(v))}
      </div>
      ${fn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(v=>v.kind!=="session"&&!v.paused&&v.failed!==!0),body:bi(u.running,Date.now(),ke,u.running_overlays)})}
      ${fn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${fn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${E()} ${u.done.length}`,items:u.done,empty:`${E()} \uC644\uB8CC \uC5C6\uC74C`,controls:zt()})}
    </div>`}function Lt(u){R={...R,[u]:!R[u]},Pb(R),Ue()}function Ue(){let u=Xe();Ze(bt(u),Oe),Ze(Ft(u),me)}function Ut(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(Ib);X=!!u.matches;let m=v=>{let j=!!(v&&typeof v.matches=="boolean"?v.matches:u.matches);j!==X&&(X=j,Ue())};typeof u.addEventListener=="function"?(u.addEventListener("change",m),B.push(()=>u.removeEventListener("change",m))):typeof u.addListener=="function"&&(u.addListener(m),B.push(()=>u.removeListener(m)))}let Ht=null;function et(u){Ht=u.target instanceof Element?u.target:null}function Wt(u){let v=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!v)return;if(Ht&&v.contains(Ht)&&Ht.closest("input, button, a")){u.preventDefault();return}let j=v.dataset.beadId||"",pe=v.dataset.lane||"";A={bead_id:j,from_lane:pe};try{u.dataTransfer?.setData("text/plain",j),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function Fe(u){let m=u.target?.closest?.(".worker-pane");if(!m)return;let v=m.dataset.lane||"";v!=="candidate"&&v!=="queue"&&!/^s[1-5]$/.test(v)||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),m.classList.add("worker-pane--drag-over"))}function T(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function _e(u,m){let v=D.find(Ee=>Ee.id===u);if(!v)return;let j=D.filter(Ee=>Ee.id!==u),pe=j.length;if(m){let Ee=m.dataset.beadId;if(Ee===u)return;let ze=j.findIndex(dt=>dt.id===Ee);ze>=0&&(pe=ze)}let Te=j.slice();Te.splice(pe,0,v),w.applyReorder(u,Te,pe)}function Ce(u){let m=u.target?.closest?.(".worker-pane");if(!m)return;u.preventDefault(),m.classList.remove("worker-pane--drag-over");let v=m.dataset.lane||"",j=A?.bead_id||u.dataTransfer?.getData("text/plain")||"",pe=A?.from_lane||"";if(A=null,!j)return;let Te=u.target?.closest?.(".worker-mini, .worker-card"),Ee=Array.from(m.querySelectorAll(".worker-mini, .worker-card")),ze=Ee.length;if(Te){let dt=Ee.indexOf(Te);dt>=0&&(ze=dt)}if(ze=Math.max(0,ze-m.querySelectorAll(".worker-mini--ghost").length),m.classList.contains("worker-pane--collapsed")&&(ze=Q()),v==="candidate"){if(pe==="candidate"){_e(j,Te);return}(pe==="queue"||/^s[1-5]$/.test(pe))&&st(j);return}if(v==="queue"||/^s[1-5]$/.test(v)){let dt=v==="queue"?"parallel":v;pe===v?tt(j,dt,ze):Pe(j,dt)}}function at(u){W=u,xb(u),Ue()}function Rt(u){M=u==="board"||u==="created"||u==="spec"?u:Jo,Cb(M),Ue()}function b(u){q=un(u)?u:rn,Lb(q),f?.(q),Ue()}function h(u){let m=u.target?.closest?.(".worker-serial-lane-count");if(m){let ze=Number.parseInt(m.value,10);Number.isFinite(ze)&&L(ze).then(Ue);return}let v=u.target?.closest?.(".worker-filter__blocked");if(v){at({...W,show_blocked:v.checked});return}let j=u.target?.closest?.(".worker-done-range");if(j){b(j.value);return}let pe=u.target?.closest?.(".worker-sort");if(pe){Rt(pe.value||Jo);return}let Te=u.target?.closest?.(".worker-slots__input");if(!Te)return;let Ee=Number.parseInt(Te.value,10);if(!Number.isFinite(Ee)){Ue();return}k(Ee).then(Ue)}function x(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function I(){let u=Xe();return{operations:u.repo_operations,cleanup_failures:u.cleanup_failures,repo:d&&d()||""}}function te(){ke&&Me.close(),C.hidden=!1,ge.hidden=!1,Be.open(I()),Ue()}function y(u){let m=We(),v=m.attempts?m.attempts[u]:null;ke=u,Le=null,Be.close(),C.hidden=!0,ge.hidden=!1,Me.open({attempt_id:u,meta:x(v)}),Ue()}function $(u,m){ke=null,Le=u,Be.close(),C.hidden=!0,ge.hidden=!1,Me.open({attempt_id:u,meta:m,hide_prompt:!0}),Ue()}function ce(){if(Be.isOpen()&&Be.refresh(I()),Le){let v=(o?.get()?.runs||[]).find(j=>j.run_id===Le);v?Me.updateMeta(Oi(v)):Me.close();return}if(!ke)return;let u=We(),m=u.attempts?u.attempts[ke]:null;if(m){Me.updateMeta(x(m));return}Me.close()}function ye(u){let m=u.target;if(m?.closest?.(".worker-mini__serial, .worker-mini__grip")||m?.closest?.("#worker-parallel-analysis-dialog"))return;let v=m?.closest?.(".mon-overlap__chip");if(v){let je=v.closest("[data-bead-id]"),pt=je&&je.getAttribute("data-bead-id")||"";if(pt){let Xt=v.getAttribute("data-overlap-all")==="true"?null:v.getAttribute("data-overlap-id")||"";Y=!!Y&&Y.bead_id===pt&&Y.counterpart_id===Xt?null:{bead_id:pt,counterpart_id:Xt},Ue()}return}let j=m?.closest?.(".mon-overlap__place");if(j){let je=j.closest("[data-bead-id]"),pt=je&&je.getAttribute("data-bead-id")||"";pt&&be(pt,j.getAttribute("data-counterpart-id")||"");return}if(m?.closest?.(".mon-overlap__popover"))return;if(m?.closest?.(".worker-analysis-btn")){Qe?.open();return}if(m?.closest?.(".worker-repo-strip")||m?.closest?.(".worker-mini__timeline")){te();return}let pe=m?.closest?.(".worker-repo-op__session");if(pe){let je=pe.dataset.attemptId;je&&y(je);return}let Te=m?.closest?.(".worker-repo-op__resolve");if(Te){S(Te.dataset.operationId||"");return}let Ee=m?.closest?.(".worker-repo-op__dismiss");if(Ee){O(Ee.dataset.operationId||"");return}let ze=m?.closest?.(".worker-cleanup__resume");if(ze){let je=ze.dataset.beadId;je&&gt(je);return}let dt=m?.closest?.(".worker-banner__resume");if(dt){let je=dt.dataset.attemptId;je&&vt(je);return}let jt=m?.closest?.(".worker-banner__discard");if(jt){let je=jt.dataset.confirmation==="merged"?"merged":"unmerged";lt(jt.dataset.beadId||"",jt.dataset.attemptId||null,je,jt.dataset.operationId||null);return}let nn=m?.closest?.(".worker-banner__dismiss");if(nn){let je=nn.dataset.attemptId;je&&mt(je);return}if(m?.closest?.(".worker-play")){qe(!We().auto_advance);return}let qn=m?.closest?.(".worker-merge-all");if(qn){qn.classList.contains("worker-merge-all--stop")?We().auto_merge===!0?Ne(!1):wt():Ne(!0);return}let zr=m?.closest?.(".worker-pane__hd--toggle");if(zr){let je=zr.dataset.lane;(je==="queue"||je==="done")&&Lt(je);return}let fr=m?.closest?.(".worker-card__place-lane");if(fr){let je=fr.dataset.beadId,pt=fr.dataset.lane;je&&(pt==="parallel"||/^s[1-5]$/.test(pt||""))&&(V=null,Ue(),Pe(je,pt));return}if(m?.closest?.(".worker-card__place-cancel")){V=null,Ue();return}let Qt=m?.closest?.(".worker-card__place");if(Qt){let je=Qt.dataset.beadId;je&&!Qt.disabled&&(we()?(V=je,Ue()):Pe(je,"parallel"));return}let Hr=m?.closest?.(".worker-filter__chip");if(Hr){let je=Hr.dataset.spec;(je==="all"||je==="with"||je==="without")&&at({...W,spec:je});return}let Ts=m?.closest?.(".worker-mini__merge");if(Ts){let je=Ts.dataset.beadId||"";We().cleanup_failed?.[je]?gt(je):ut(je);return}let Cs=m?.closest?.(".worker-mini__merge-cancel");if(Cs){He(Cs.dataset.beadId||"");return}let kn=m?.closest?.(".worker-mini__discard");if(kn){lt(kn.dataset.beadId||"",kn.dataset.attemptId||null,kn.dataset.discardMode==="merged"?"merged":"unmerged",kn.dataset.operationId||null);return}let Fn=m?.closest?.(".worker-mini__stale-continue");if(Fn){G("worker-stale-work-continue",Fn.dataset.beadId||"",Fn.dataset.actionId||"");return}let _r=m?.closest?.(".worker-mini__stale-backup");if(_r){G("worker-stale-work-backup-fresh",_r.dataset.beadId||"",_r.dataset.actionId||"");return}let mr=m?.closest?.(".worker-mini__stale-recheck");if(mr){G("worker-stale-work-recheck",mr.dataset.beadId||"",mr.dataset.actionId||"");return}let Rs=m?.closest?.(".worker-mini__revise-fix");if(Rs){fe("worker-revise-fix",Rs.dataset.beadId||"");return}let gr=m?.closest?.(".worker-mini__revise-approve");if(gr){fe("worker-revise-approve",gr.dataset.beadId||"");return}if(m?.closest?.(".worker-mini__pr"))return;if(m?.closest?.(".rtile__discard")){let je=m?.closest?.(".rtile"),pt=je?.dataset?.beadId,Xt=je?.dataset?.attemptId;pt&&lt(pt,Xt||null,"unmerged",m?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(m?.closest?.(".rtile__dismiss")){let pt=m?.closest?.(".rtile")?.dataset?.attemptId;pt&&mt(pt);return}if(m?.closest?.(".rtile__pause")){let pt=m?.closest?.(".rtile")?.dataset?.attemptId;pt&&Je(pt);return}if(m?.closest?.(".rtile__resume")){let pt=m?.closest?.(".rtile")?.dataset?.attemptId;pt&&vt(pt);return}if(m?.closest?.(".rtile__session")){let pt=m?.closest?.(".rtile")?.dataset?.attemptId;pt&&y(pt);return}if(m?.closest?.(".worker-drawer-overlay__backdrop")){Be.close(),Me.close();return}if(m?.closest?.(".worker-drawer-host"))return;let Qn=m?.closest?.(".rtile .board-card__roll-toggle");if(Qn){let je=Qn.dataset.rollParent;je&&(Re.has(je)?Re.delete(je):Re.add(je),Ue());return}let Xn=m?.closest?.(".rtile .board-card__roll-child");if(Xn){let je=Xn.dataset.childId;je&&c&&c(je);return}let hr=m?.closest?.(".rtile");if(hr){if(m?.closest?.(".rtile__id")){let pt=hr.dataset.beadId;pt&&on(pt).then(Xt=>{Xt?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let je=hr.dataset.beadId;je&&c&&c(je);return}let Ls=m?.closest?.(".worker-mini, .worker-card");if(Ls){let je=Ls.dataset.beadId;if(m?.closest?.(".worker-mini__id, .worker-card__id")){je&&on(je).then(Xt=>{Xt?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let pt=m?.closest?.(".ctl-chip--from");if(pt){let Xt=pt.dataset.fromId;Xt&&c&&c(Xt);return}je&&c&&c(je)}}e.addEventListener("pointerdown",et),e.addEventListener("dragstart",Wt),e.addEventListener("dragover",Fe),e.addEventListener("dragleave",T),e.addEventListener("drop",Ce),e.addEventListener("click",ye),e.addEventListener("change",h);function Ke(u){if(!Y)return;let m=u.target;m&&typeof m.closest=="function"&&m.closest(".mon-overlap__popover, .mon-overlap__chip")||(Y=null,Ue())}function Ie(u){u.key!=="Escape"||!Y||(Y=null,Ue())}return document.addEventListener("click",Ke),document.addEventListener("keydown",Ie),B.push(()=>{document.removeEventListener("click",Ke),document.removeEventListener("keydown",Ie)}),Ut(),g&&B.push(g.subscribe(()=>{for(let[u,m]of U)m==="failed"&&U.delete(u);Ue()})),s&&B.push(s.subscribe(()=>{let u=d&&d()||"";u!==K&&(K=u,z.close()),Ue(),ce()})),o&&typeof o.subscribe=="function"&&B.push(o.subscribe(()=>{ce(),Ue()})),Ue(),{load(){le(),Ue()},refreshSessionDefaults:Ae,destroy(){for(let u of B.splice(0))try{u()}catch{}e.removeEventListener("pointerdown",et),e.removeEventListener("dragstart",Wt),e.removeEventListener("dragover",Fe),e.removeEventListener("dragleave",T),e.removeEventListener("drop",Ce),e.removeEventListener("click",ye),e.removeEventListener("change",h);try{Me.destroy()}catch{}ge.hidden=!0;try{Qe?.destroy()}catch{}try{z.destroy()}catch{}Ze(l``,e)}}}function qi(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Lp(e,t,n,r=async()=>{},s=async()=>{}){let o=Et("views:workspace-picker"),a=null,i=!1,c=!1,d=!1;async function p(U){let R=U.target.value,ve=t.getState().workspace?.current?.path||"";if(R&&R!==ve){o("switching workspace to %s",R),i=!0,q();try{await n(R)}catch(he){o("workspace switch failed: %o",he)}finally{i=!1,q()}}}async function f(){let U=t.getState(),E=U.workspace?.current?.path||U.workspace?.available?.[0]?.path||"";if(!(!E||c)){o("git-pulling workspace %s",E),c=!0,q();try{await r(E)}catch(R){o("workspace git pull failed: %o",R)}finally{c=!1,q()}}}function g(U){let E=U.target;E&&e.contains(E)||D()}function w(U){U.key==="Escape"&&D()}function A(){d||(d=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",w),q())}function D(){d&&(d=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",w),q())}function W(){d?D():A()}async function V(U){let E=U.target,R=E.value,X=E.checked;o("toggling visibility %s \u2192 %s",R,String(X));try{await s(R,X)}catch(ve){o("workspace visibility toggle failed: %o",ve)}}function Y(U){return U?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${i||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function N(U,E){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${W}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?l`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${U.map(R=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${R.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${R.path}"
                        .checked=${!E.has(R.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${qi(R.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function M(){let U=t.getState(),E=U.workspace?.current,R=U.workspace?.available||[],X=new Set(U.workspace?.hidden||[]),ve=E?.path||R[0]?.path||"";if(R.length===0)return l``;let he=R.filter(ne=>!X.has(ne.path)||ne.path===ve);if(he.length<=1){let ne=he[0]||R[0],Z=qi(ne.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ne.path}"
            >${Z}</span
          >
          ${N(R,X)}
          ${Y(ve)}
          ${c?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${i||c}
          aria-label="Select project workspace"
        >
          ${he.map(ne=>l`
              <option
                value="${ne.path}"
                ?selected=${ne.path===ve}
                title="${ne.path}"
              >
                ${qi(ne.path)}
              </option>
            `)}
        </select>
        ${N(R,X)}
        ${Y(ve)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function q(){Ze(M(),e)}return q(),a=t.subscribe(()=>q()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",w),Ze(l``,e)}}}var Ip=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Fi(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Op(e,t,n=Fi()){return{id:n,type:e,payload:t}}function Pp(e={}){let t=Et("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,d=new Map,p=[],f=new Map,g=new Set;function w(M){for(let q of Array.from(g))try{q(M)}catch{}}function A(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),w(o);let M=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),q=(n.jitterRatio||0)*M,U=Math.max(0,Math.round(M+(Math.random()*2-1)*q));t("ws retry in %d ms (attempt %d)",U,a+1),i=setTimeout(()=>{i=null,N()},U)}function D(M){try{s?.send(JSON.stringify(M))}catch(q){t("ws send failed",q)}}function W(){for(o="open",t("ws open"),w(o),a=0;p.length;){let M=p.shift();M&&D(M)}}function V(M){let q;try{q=JSON.parse(String(M.data))}catch{t("ws received non-JSON message");return}if(!q||typeof q.id!="string"||typeof q.type!="string"){t("ws received invalid envelope");return}if(d.has(q.id)){let E=d.get(q.id);d.delete(q.id),q.ok?E?.resolve(q.payload):E?.reject(q.error||new Error("ws error"));return}let U=f.get(q.type);if(U&&U.size>0)for(let E of Array.from(U))try{E(q.payload)}catch(R){t("ws event handler error",R)}else t("ws received unhandled message type: %s",q.type)}function Y(){o="closed",t("ws closed"),w(o);for(let[M,q]of d.entries())q.reject(new Error("ws disconnected")),d.delete(M);a+=1,A()}function N(){if(!c)return;let M=r();try{s=new WebSocket(M),t("ws connecting %s",M),o="connecting",w(o),s.addEventListener("open",W),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",Y)}catch(q){t("ws connect failed %o",q),A()}}return N(),{send(M,q){if(!Ip.includes(M))return Promise.reject(new Error(`unknown message type: ${M}`));let U=Fi(),E=Op(M,q,U);return t("send %s id=%s",M,U),new Promise((R,X)=>{d.set(U,{resolve:R,reject:X,type:M}),s&&s.readyState===s.OPEN?D(E):(t("queue %s id=%s (state=%s)",M,U,o),p.push(E))})},on(M,q){f.has(M)||f.set(M,new Set);let U=f.get(M);return U?.add(q),()=>{U?.delete(q)}},onConnection(M){return g.add(M),()=>{g.delete(M)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,N()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Gb(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Vb(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var ji=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Mp=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Yn="tab:worker:closed",Kb="bdui.worker.done-range",Dp=qd,Np="worker:queue",qp="worker:parallel-analysis",Fp="ui:order",jp="ui:display-policy",Bp="exec:presets",Zn="tab:board:closed",Up="beads-ui.board.closed-range";function Yb(e){let t=Et("main");t("bootstrap start");let n=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ze(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),c=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),p=document.getElementById("detail-panel");if(a&&sp(a),i&&c&&d&&p){let J=function(y,$){let ce="Request failed",ye="";if(y&&typeof y=="object"){let Ie=y;if(typeof Ie.message=="string"&&Ie.message.length>0&&(ce=Ie.message),typeof Ie.details=="string")ye=Ie.details;else if(Ie.details&&typeof Ie.details=="object")try{ye=JSON.stringify(Ie.details,null,2)}catch{ye=""}}else typeof y=="string"&&y.length>0&&(ce=y);let Ke=$&&$.length>0?`Failed to load ${$}`:"Request failed";B.open(Ke,ce,ye)},P=function(y){return`${et.getState().workspace.current?.path||""}\0${y}`},H=function(){Me&&(Me().catch(()=>{}),Me=null),Be=null,z=null},Q=function(y){K=y;let $=()=>{K!==y||et.getState().selected_id!==y||(K=null,ee(y))};if(!We){Qe.then($);return}$()},Je=function(y,$,ce,ye,Ke){return ce!==st[$]?(Ke().catch(()=>{}),!1):(y.set(ye,Ke),!0)},mt=function(){let y=et.getState();Ne(y.view==="board"),qe(y.view==="worker"),oe(y.view==="monitor"),O(y.view==="board"||y.view==="worker"||vt||!!y.selected_id)},gt=function(){let y=sr(ot);return y===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:y}}},Ve=function(){let y=sr(ut);return y===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:y}}},Ne=function(y){if(y)for(let[$,ce]of ji){if(Pe.has($)||tt.has($))continue;let ye=$===Zn?gt():{type:ce};try{Oe.register($,ye)}catch(u){t("register %s store failed: %o",$,u)}tt.add($);let Ke=st.board,Ie=!1;Se.subscribeList($,ye).then(u=>{Ie=!Je(Pe,"board",Ke,$,u)}).catch(u=>{t("subscribe %s failed: %o",$,u),J(u,"board")}).finally(()=>{tt.delete($),Ie&&mt()})}else lt()},lt=function(){st.board+=1;for(let[y]of ji){let $=Pe.get(y);$&&($().catch(()=>{}),Pe.delete(y));try{Oe.unregister(y)}catch(ce){t("unregister %s failed: %o",y,ce)}}},qe=function(y){if(!y){S();return}for(let[$,ce]of Mp){if(G.has($)||tt.has($))continue;let ye=$===Yn?Ve():{type:ce};try{Oe.register($,ye)}catch(u){t("register %s store failed: %o",$,u)}tt.add($);let Ke=st.worker,Ie=!1;Se.subscribeList($,ye).then(u=>{Ie=!Je(G,"worker",Ke,$,u)}).catch(u=>{t("subscribe %s failed: %o",$,u),J(u,"worker")}).finally(()=>{tt.delete($),Ie&&mt()})}},S=function(){st.worker+=1;for(let[y]of Mp){let $=G.get(y);$&&($().catch(()=>{}),G.delete(y));try{Oe.unregister(y)}catch(ce){t("unregister %s failed: %o",y,ce)}}},O=function(y){if(!y){k();return}fe||(Ae("subscribe-worker-queue",{id:Np}).catch($=>{t("subscribe-worker-queue failed: %o",$)}),Ae("subscribe-worker-parallel-analysis",{id:qp}).catch($=>{t("subscribe-worker-parallel-analysis failed: %o",$)}),fe=()=>(Ae("unsubscribe-worker-parallel-analysis",{id:qp}),Ae("unsubscribe-worker-queue",{id:Np})))},k=function(){fe&&(fe().catch(()=>{}),fe=null),it.clear()},oe=function(y){if(!y){de();return}L||(Ae("subscribe-monitor-pipeline",{id:Dp}).catch($=>{t("subscribe-monitor-pipeline failed: %o",$)}),L=()=>Ae("unsubscribe-monitor-pipeline",{id:Dp}))},de=function(){L&&(L().catch(()=>{}),L=null)},be=function(){re||(Ae("subscribe-ui-order",{id:Fp}).catch(y=>{t("subscribe-ui-order failed: %o",y)}),re=()=>Ae("unsubscribe-ui-order",{id:Fp}))},ct=function(){re&&(re().catch(()=>{}),re=null),C.clear()},Ye=function(){Xe||(Ae("subscribe-display-policy",{id:jp}).catch(y=>{t("subscribe-display-policy failed: %o",y)}),Xe=()=>Ae("unsubscribe-display-policy",{id:jp}))},bt=function(){Xe&&(Xe().catch(()=>{}),Xe=null),me.clear()},yt=function(){St||(Ae("subscribe-impl-presets",{id:Bp}).catch(y=>{t("subscribe-impl-presets failed: %o",y)}),St=()=>Ae("unsubscribe-impl-presets",{id:Bp}))},Lt=function(y){if(!y)return"Unknown";let $=y.split("/").filter(Boolean);return $.length>0?$[$.length-1]:"Unknown"};var f=J,g=P,w=H,A=Q,D=Je,W=mt,V=gt,Y=Ve,N=Ne,M=lt,q=qe,U=S,E=O,R=k,X=oe,ve=de,he=be,ne=ct,Z=Ye,Re=bt,$e=yt,ie=Lt;let ae=document.getElementById("header-loading"),xe=oc(ae),B=Gu(e),le=Pp(),Ae=xe.wrapSend((y,$)=>le.send(y,$)),Se=Ql(Ae),Oe=Xl(),ge=tc(),it=ec(),_t=Dl(),C=Jl(),me=Pl(),ke=Ml(),Le=Nl();le.on("impl-presets-snapshot",y=>{let $=y;$&&typeof $.revision=="number"&&Array.isArray($.presets)&&ke.set({revision:$.revision,presets:$.presets})}),le.on("monitor-pipeline-snapshot",y=>{let $=y;if(!(!$||!Array.isArray($.workspaces)))try{_t.set($.workspaces,$.workspaces_state)}catch{}}),le.on("ui-order-snapshot",y=>{let $=y;if($&&typeof $.revision=="number")try{C.set({revision:$.revision,order:$.order&&typeof $.order=="object"?$.order:{}})}catch{}}),le.on("display-policy-snapshot",y=>{let $=y;if($&&$.policy&&typeof $.policy=="object")try{me.set($.policy)}catch{}}),le.on("session-log-snapshot",y=>{let $=y;if($&&typeof $.id=="string")try{Le.set($.id,Array.isArray($.lines)?$.lines:[],typeof $.last_event_at=="number"?$.last_event_at:null)}catch{}}),le.on("session-log-append",y=>{let $=y;if($&&typeof $.id=="string")try{Le.append($.id,$.event)}catch{}}),le.on("snapshot",y=>{let $=y,ce=$&&typeof $.id=="string"?$.id:"",ye=ce?Oe.getStore(ce):null;if(ye&&$&&$.type==="snapshot")try{ye.applyPush($)}catch{}}),le.on("upsert",y=>{let $=y,ce=$&&typeof $.id=="string"?$.id:"",ye=ce?Oe.getStore(ce):null;if(ye&&$&&$.type==="upsert")try{ye.applyPush($)}catch{}}),le.on("delete",y=>{let $=y,ce=$&&typeof $.id=="string"?$.id:"",ye=ce?Oe.getStore(ce):null;if(ye&&$&&$.type==="delete")try{ye.applyPush($)}catch{}});let Me=null,Be=null,z=null,K=null,De=()=>{},Qe=new Promise(y=>{De=()=>y(void 0)}),We=!1,we=!1;async function ee(y){let $=P(y);if($===Be||$===z)return;z=$;let ce=`detail:${y}`,ye={type:"issue-detail",params:{id:y}};try{Oe.register(ce,ye)}catch(Ke){t("register detail store failed: %o",Ke)}try{let Ke=await Se.subscribeList(ce,ye);if(et.getState().selected_id!==y||P(y)!==$){await Ke().catch(()=>{});return}Me&&await Me().catch(()=>{}),Me=Ke,Be=$}catch(Ke){t("detail subscribe failed: %o",Ke),J(Ke,"issue details")}finally{z===$&&(z=null)}}let Pe=new Map,tt=new Set,st={board:0,worker:0},vt=!1,ot=rn;try{let y=window.localStorage.getItem(Up);un(y)&&(ot=y)}catch{}let ut=rn;try{let y=window.localStorage.getItem(Kb);un(y)&&(ut=y)}catch{}async function He(y){if(!un(y)||y===ot)return;ot=y;try{window.localStorage.setItem(Up,y)}catch{}let $=Pe.get(Zn);if(!$)return;Pe.delete(Zn),await $().catch(()=>{});let ce=gt();try{Oe.register(Zn,ce)}catch(ye){t("register %s store failed: %o",Zn,ye)}try{let ye=await Se.subscribeList(Zn,ce);Pe.set(Zn,ye)}catch(ye){t("re-subscribe %s failed: %o",Zn,ye),J(ye,"board")}}async function wt(y){if(!un(y)||y===ut)return;ut=y;let $=G.get(Yn);if(!$)return;G.delete(Yn),await $().catch(()=>{});let ce=Ve();try{Oe.register(Yn,ce)}catch(ye){t("register %s store failed: %o",Yn,ye)}try{let ye=await Se.subscribeList(Yn,ce);G.set(Yn,ye)}catch(ye){t("re-subscribe %s failed: %o",Yn,ye),J(ye,"worker")}}let G=new Map,fe=null,L=null,re=null,Xe=null,St=null;async function Ct(){Xe=null,me.clear(),St=null,ke.clear(),fe=null,L=null,Pe.clear(),G.clear(),st.board+=1,st.worker+=1,yt();let y=et.getState().workspace.current?.path;if(y)try{await le.send("set-workspace",{path:y})}catch(ce){t("workspace restore after reconnect failed: %o",ce);return}Ye();let $=et.getState();Ne($.view==="board"),qe($.view==="worker"),oe($.view==="monitor"),O($.view==="board"||$.view==="worker"||!!$.selected_id)}async function zt(){t("clearing all subscriptions for workspace switch"),lt(),S(),k(),ge.clear(),ct(),be(),bt(),Ye(),H();let y=et.getState();if(y.selected_id)try{Oe.unregister(`detail:${y.selected_id}`)}catch{}let $=et.getState();Ne($.view==="board"),qe($.view==="worker"),oe($.view==="monitor"),O($.view==="board"||$.view==="worker"||!!$.selected_id),$.selected_id&&Q($.selected_id)}async function Nt(y){t("requesting workspace switch to %s",y),we=!0;try{let $=await le.send("set-workspace",{path:y});t("workspace switch result: %o",$),$&&$.workspace&&(et.setState({workspace:{current:{path:$.workspace.root_dir,database:$.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",y),$.changed&&(await zt(),ue("Switched to "+Lt(y),"success",2e3)))}catch($){throw t("workspace switch failed: %o",$),ue("Failed to switch workspace","error",3e3),$}finally{we=!1}}async function Mt(y){t("requesting workspace git pull for %s",y);try{let $=await le.send("git-pull-workspace",{});t("workspace git pull result: %o",$);let ce=$?.status;if(ce==="up_to_date"){ue("Already up to date","success",2e3);return}if(ce==="stash_pop_conflict"){ue("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ue("Git pulled "+Lt(y),"success",2e3)}catch($){t("workspace git pull failed: %o",$);let ce=$?.code,ye=$?.message;if(ce==="rebase_conflict"){ue("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(ce==="rebase_conflict_abort_failed"){ue("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(ce==="busy"){ue("Git pull skipped: another operation is running","warning",3e3);return}let Ke=ye?`: ${ye}`:"";throw ue(`Git pull failed${Ke}`,"error",3e3),$}}async function Ft(y,$){t("setting workspace visibility %s \u2192 %s",y,String($));try{await le.send("set-workspace-visibility",{path:y,visible:$}),await Ue()}catch(ce){t("workspace visibility update failed: %o",ce),ue("Failed to update project visibility","error",3e3)}}async function Ue(){try{let y=await le.send("list-workspaces",{});if(t("workspaces loaded: %o",y),y&&Array.isArray(y.workspaces)){let $=y.workspaces.map(Ie=>({path:Ie.path,database:Ie.database,pid:Ie.pid,version:Ie.version})),ce=y.current?{path:y.current.root_dir,database:y.current.db_path}:null,ye=Array.isArray(y.hidden)?y.hidden.filter(Ie=>typeof Ie=="string"):[];et.setState({workspace:{current:ce,available:$,hidden:ye}});let Ke=window.localStorage.getItem("beads-ui.workspace");Ke&&(!$.some(u=>u.path===Ke)||ye.includes(Ke)?window.localStorage.removeItem("beads-ui.workspace"):ce&&Ke!==ce.path&&(t("restoring saved workspace preference: %s",Ke),await Nt(Ke)))}}catch(y){t("failed to load workspaces: %o",y)}}le.on("workspace-changed",y=>{t("workspace-changed event: %o",y),y&&y.root_dir&&(et.setState({workspace:{current:{path:y.root_dir,database:y.db_path}}}),Ue(),zt())});let Ut=!1;if(typeof le.onConnection=="function"){let y=$=>{t("ws state %s",$),$==="reconnecting"||$==="closed"?(Ut=!0,ue("Connection lost. Reconnecting\u2026","error",4e3)):$==="open"&&Ut&&(Ut=!1,ue("Reconnected","success",2200),Vb(et,(ce,ye)=>{t(`${ce}: %o`,ye)}),Ct())};le.onConnection(y)}let Ht="board";try{let y=window.localStorage.getItem("beads-ui.view");(y==="board"||y==="worker"||y==="monitor")&&(Ht=y)}catch(y){t("view parse error: %o",y)}let et=sc({config:Gb(),view:Ht});le.on("worker-queue-snapshot",y=>{let $=y;if(!$||!$.queue)return;let ce=et.getState().workspace.current?.path;if(typeof ce=="string"&&ce.length>0&&$.root_dir!==ce){t("dropping worker-queue snapshot for %s",String($.root_dir));return}try{ge.set($.queue)}catch{}}),le.on("worker-parallel-analysis-snapshot",y=>{let $=y;if(!$)return;let ce=et.getState().workspace.current?.path;if(!(typeof ce=="string"&&ce.length>0&&typeof $.root_dir=="string"&&$.root_dir!==ce))try{it.set({settings:$.settings,job:$.job??null,runs:Array.isArray($.runs)?$.runs:[],last_good:$.last_good??null})}catch{}});let Wt=nc(et);Wt.start();let Fe=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),T=async(y,$)=>{try{return await Ae(y,$)}catch(ce){if(Fe.has(y))throw ce;return[]}};jd({global_element:r,repo_element:s},et,Wt);let _e=document.getElementById("workspace-picker");_e&&Lp(_e,et,Nt,Mt,Ft);let Ce=zd(e,(y,$)=>Ae(y,$));try{let y=document.getElementById("new-issue-btn");y&&y.addEventListener("click",()=>Ce.open())}catch{}let at=Kd(e,{policyStore:me,queueStore:ge,implPresetStore:ke,transport:(y,$)=>Ae(y,$),onOpenChange:y=>{let $=vt;vt=y,mt(),$&&y===!1&&b.refreshSessionDefaults()},labelOptions:()=>{let y=new Set;for(let[$]of ji)for(let ce of Oe.snapshotFor($)||[]){let ye=ce.labels;if(Array.isArray(ye))for(let Ke of ye)typeof Ke=="string"&&Ke.length>0&&y.add(Ke)}return Array.from(y).sort()}});try{let y=document.getElementById("display-settings-btn");y&&(y.setAttribute("aria-label","\uC124\uC815"),y.setAttribute("title","\uC124\uC815"),y.addEventListener("click",()=>at.open()))}catch{}let Rt=hc(i,{gotoIssue:y=>Wt.gotoIssue(y),issueStores:Oe,transport:T,workerQueueStore:ge,uiOrderStore:C,displayPolicyStore:me,closedRange:ot,onClosedRangeChange:y=>{He(y)},onNewIssue:()=>Ce.open()}),b=Ni(c,{transport:T,issueStores:Oe,queueStore:ge,analysisStore:it,sessionLogStore:Le,uiOrderStore:C,gotoIssue:y=>et.setState({selected_id:y}),getWorkspacePath:()=>et.getState().workspace.current?.path,doneRange:ut,onDoneRangeChange:y=>{wt(y)}}),h=Fd(d,{transport:T,pipelineStore:_t,execPresetStore:ke,sessionLogStore:Le,router:Wt,gotoIssue:y=>Wt.gotoIssue(y),getWorkspacePath:()=>et.getState().workspace.current?.path,switchWorkspace:y=>Nt(y)}),x=Hu(p,{issueStores:Oe,transport:T,queueStore:ge,execPresetStore:ke,sessionLogStore:Le,getWorkspacePath:()=>et.getState().workspace.current?.path,onNavigate:y=>{et.getState().view==="worker"?et.setState({selected_id:y}):Wt.gotoIssue(y)},onClose:()=>{let y=et.getState();et.setState({selected_id:null});try{Wt.gotoView(y.view==="worker"||y.view==="monitor"?y.view:"board")}catch{}},onOpenExecPresets:()=>{at.open("execution")}}),I=et.getState().selected_id;I&&(p.hidden=!1,x.load(I),Q(I)),et.subscribe(y=>{let $=y.selected_id;$?(p.hidden=!1,x.load($),we||Q($)):(x.clear(),p.hidden=!0,H())});let te=y=>{i.hidden=y.view!=="board",c.hidden=y.view!=="worker",d.hidden=y.view!=="monitor",o&&o.classList.toggle("is-quiet",y.view==="monitor"),Ne(y.view==="board"),qe(y.view==="worker"),oe(y.view==="monitor"),O(y.view==="board"||y.view==="worker"||vt||!!y.selected_id),!y.selected_id&&y.view==="board"&&Rt.load(),y.view==="worker"&&b.load(),y.view==="monitor"?h.load():h.pause(),window.localStorage.setItem("beads-ui.view",y.view)};et.subscribe(te),te(et.getState()),be(),Ye(),yt(),Ue().finally(()=>{We=!0,De()}),window.addEventListener("keydown",y=>{let $=y.ctrlKey||y.metaKey,ce=String(y.key||"").toLowerCase(),ye=y.target,Ke=ye&&ye.tagName?String(ye.tagName).toLowerCase():"",Ie=Ke==="input"||Ke==="textarea"||Ke==="select"||ye&&typeof ye.isContentEditable=="boolean"&&ye.isContentEditable;$&&ce==="n"&&(Ie||(y.preventDefault(),Ce.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Yb(t)});export{Yb as bootstrap,Gb as readBootstrapConfig,Vb as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
