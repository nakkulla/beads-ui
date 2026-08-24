var of=Object.create;var _a=Object.defineProperty;var af=Object.getOwnPropertyDescriptor;var lf=Object.getOwnPropertyNames;var cf=Object.getPrototypeOf,uf=Object.prototype.hasOwnProperty;var df=(e,t,n)=>t in e?_a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ma=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var pf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of lf(t))!uf.call(e,s)&&s!==n&&_a(e,s,{get:()=>t[s],enumerable:!(r=af(t,s))||r.enumerable});return e};var ff=(e,t,n)=>(n=e!=null?of(cf(e)):{},pf(t||!e||!e.__esModule?_a(n,"default",{value:e,enumerable:!0}):n,e));var kt=(e,t,n)=>df(e,typeof t!="symbol"?t+"":t,n);var Fl=ma((iy,ql)=>{var xr=1e3,Ar=xr*60,Sr=Ar*60,or=Sr*24,gf=or*7,hf=or*365.25;ql.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return bf(e);if(n==="number"&&isFinite(e))return t.long?vf(e):yf(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function bf(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*hf;case"weeks":case"week":case"w":return n*gf;case"days":case"day":case"d":return n*or;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Sr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Ar;case"seconds":case"second":case"secs":case"sec":case"s":return n*xr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function yf(e){var t=Math.abs(e);return t>=or?Math.round(e/or)+"d":t>=Sr?Math.round(e/Sr)+"h":t>=Ar?Math.round(e/Ar)+"m":t>=xr?Math.round(e/xr)+"s":e+"ms"}function vf(e){var t=Math.abs(e);return t>=or?Vs(e,t,or,"day"):t>=Sr?Vs(e,t,Sr,"hour"):t>=Ar?Vs(e,t,Ar,"minute"):t>=xr?Vs(e,t,xr,"second"):e+" ms"}function Vs(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Bl=ma((ly,jl)=>{function wf(e){n.debug=n,n.default=n,n.coerce=c,n.disable=a,n.enable=s,n.enabled=i,n.humanize=Fl(),n.destroy=d,Object.keys(e).forEach(p=>{n[p]=e[p]}),n.names=[],n.skips=[],n.formatters={};function t(p){let f=0;for(let g=0;g<p.length;g++)f=(f<<5)-f+p.charCodeAt(g),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(p){let f,g=null,k,A;function M(...U){if(!M.enabled)return;let V=M,Y=Number(new Date),D=Y-(f||Y);V.diff=D,V.prev=f,V.curr=Y,f=Y,U[0]=n.coerce(U[0]),typeof U[0]!="string"&&U.unshift("%O");let P=0;U[0]=U[0].replace(/%([a-zA-Z%])/g,(B,T)=>{if(B==="%%")return"%";P++;let L=n.formatters[T];if(typeof L=="function"){let Q=U[P];B=L.call(V,Q),U.splice(P,1),P--}return B}),n.formatArgs.call(V,U),(V.log||n.log).apply(V,U)}return M.namespace=p,M.useColors=n.useColors(),M.color=n.selectColor(p),M.extend=r,M.destroy=n.destroy,Object.defineProperty(M,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(k!==n.namespaces&&(k=n.namespaces,A=n.enabled(p)),A),set:U=>{g=U}}),typeof n.init=="function"&&n.init(M),M}function r(p,f){let g=n(this.namespace+(typeof f>"u"?":":f)+p);return g.log=this.log,g}function s(p){n.save(p),n.namespaces=p,n.names=[],n.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of f)g[0]==="-"?n.skips.push(g.slice(1)):n.names.push(g)}function o(p,f){let g=0,k=0,A=-1,M=0;for(;g<p.length;)if(k<f.length&&(f[k]===p[g]||f[k]==="*"))f[k]==="*"?(A=k,M=g,k++):(g++,k++);else if(A!==-1)k=A+1,M++,g=M;else return!1;for(;k<f.length&&f[k]==="*";)k++;return k===f.length}function a(){let p=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),p}function i(p){for(let f of n.skips)if(o(p,f))return!1;for(let f of n.names)if(o(p,f))return!0;return!1}function c(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}jl.exports=wf});var Ul=ma((Jt,Ks)=>{Jt.formatArgs=$f;Jt.save=xf;Jt.load=Af;Jt.useColors=kf;Jt.storage=Sf();Jt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Jt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function kf(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function $f(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ks.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}Jt.log=console.debug||console.log||(()=>{});function xf(e){try{e?Jt.storage.setItem("debug",e):Jt.storage.removeItem("debug")}catch{}}function Af(){let e;try{e=Jt.storage.getItem("debug")||Jt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Sf(){try{return localStorage}catch{}}Ks.exports=Bl()(Jt);var{formatters:Ef}=Ks.exports;Ef.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Kr=globalThis,Bs=Kr.trustedTypes,$l=Bs?Bs.createPolicy("lit-html",{createHTML:e=>e}):void 0,ha="$lit$",En=`lit$${Math.random().toFixed(9).slice(2)}$`,ba="?"+En,_f=`<${ba}>`,tr=document,Yr=()=>tr.createComment(""),Zr=e=>e===null||typeof e!="object"&&typeof e!="function",ya=Array.isArray,Cl=e=>ya(e)||typeof e?.[Symbol.iterator]=="function",ga=`[ 	
\f\r]`,Vr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xl=/-->/g,Al=/>/g,Jn=RegExp(`>|${ga}(?:([^\\s"'>=/]+)(${ga}*=${ga}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Sl=/'/g,El=/"/g,Rl=/^(?:script|style|textarea|title)$/i,va=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),l=va(1),$r=va(2),ey=va(3),cn=Symbol.for("lit-noChange"),It=Symbol.for("lit-nothing"),Tl=new WeakMap,er=tr.createTreeWalker(tr,129);function Ll(e,t){if(!ya(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return $l!==void 0?$l.createHTML(t):t}var Il=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Vr;for(let i=0;i<n;i++){let c=e[i],d,p,f=-1,g=0;for(;g<c.length&&(a.lastIndex=g,p=a.exec(c),p!==null);)g=a.lastIndex,a===Vr?p[1]==="!--"?a=xl:p[1]!==void 0?a=Al:p[2]!==void 0?(Rl.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=Jn):p[3]!==void 0&&(a=Jn):a===Jn?p[0]===">"?(a=s??Vr,f=-1):p[1]===void 0?f=-2:(f=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?Jn:p[3]==='"'?El:Sl):a===El||a===Sl?a=Jn:a===xl||a===Al?a=Vr:(a=Jn,s=void 0);let k=a===Jn&&e[i+1].startsWith("/>")?" ":"";o+=a===Vr?c+_f:f>=0?(r.push(d),c.slice(0,f)+ha+c.slice(f)+En+k):c+En+(f===-2?i:k)}return[Ll(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Qr=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[d,p]=Il(t,n);if(this.el=e.createElement(d,r),er.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=er.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(ha)){let g=p[a++],k=s.getAttribute(f).split(En),A=/([.?@])?(.*)/.exec(g);c.push({type:1,index:o,name:A[2],strings:k,ctor:A[1]==="."?Ws:A[1]==="?"?zs:A[1]==="@"?Hs:rr}),s.removeAttribute(f)}else f.startsWith(En)&&(c.push({type:6,index:o}),s.removeAttribute(f));if(Rl.test(s.tagName)){let f=s.textContent.split(En),g=f.length-1;if(g>0){s.textContent=Bs?Bs.emptyScript:"";for(let k=0;k<g;k++)s.append(f[k],Yr()),er.nextNode(),c.push({type:2,index:++o});s.append(f[g],Yr())}}}else if(s.nodeType===8)if(s.data===ba)c.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(En,f+1))!==-1;)c.push({type:7,index:o}),f+=En.length-1}o++}}static createElement(t,n){let r=tr.createElement("template");return r.innerHTML=t,r}};function nr(e,t,n=e,r){if(t===cn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=Zr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=nr(e,s._$AS(e,t.values),s,r)),t}var Us=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??tr).importNode(n,!0);er.currentNode=s;let o=er.nextNode(),a=0,i=0,c=r[0];for(;c!==void 0;){if(a===c.index){let d;c.type===2?d=new kr(o,o.nextSibling,this,t):c.type===1?d=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(d=new Gs(o,this,t)),this._$AV.push(d),c=r[++i]}a!==c?.index&&(o=er.nextNode(),a++)}return er.currentNode=tr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},kr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=It,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=nr(this,t,n),Zr(t)?t===It||t==null||t===""?(this._$AH!==It&&this._$AR(),this._$AH=It):t!==this._$AH&&t!==cn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Cl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==It&&Zr(this._$AH)?this._$AA.nextSibling.data=t:this.T(tr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Qr.createElement(Ll(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Us(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Tl.get(t.strings);return n===void 0&&Tl.set(t.strings,n=new Qr(t)),n}k(t){ya(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(Yr()),this.O(Yr()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},rr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=It,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=It}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=nr(this,t,n,0),a=!Zr(t)||t!==this._$AH&&t!==cn,a&&(this._$AH=t);else{let i=t,c,d;for(t=o[0],c=0;c<o.length-1;c++)d=nr(this,i[r+c],n,c),d===cn&&(d=this._$AH[c]),a||(a=!Zr(d)||d!==this._$AH[c]),d===It?t=It:t!==It&&(t+=(d??"")+o[c+1]),this._$AH[c]=d}a&&!s&&this.j(t)}j(t){t===It?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ws=class extends rr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===It?void 0:t}},zs=class extends rr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==It)}},Hs=class extends rr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=nr(this,t,n,0)??It)===cn)return;let r=this._$AH,s=t===It&&r!==It||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==It&&(r===It||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Gs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){nr(this,t)}},Ol={M:ha,P:En,A:ba,C:1,L:Il,R:Us,D:Cl,V:nr,I:kr,H:rr,N:zs,U:Hs,B:Ws,F:Gs},mf=Kr.litHtmlPolyfillSupport;mf?.(Qr,kr),(Kr.litHtmlVersions??(Kr.litHtmlVersions=[])).push("3.3.1");var Ke=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new kr(t.insertBefore(Yr(),o),o,void 0,n??{})}return s._$AI(e),s};var rn="today",jn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function un(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function sr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Pl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ml(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Dl(){let e=null,t=[],n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],r()},clear(){e=null,t=[],r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Nl(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Wl=ff(Ul(),1);function Et(e){return(0,Wl.default)(`beads-ui:${e}`)}function gn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ar(e,t){let n=gn(e.created_at),r=gn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Gl(e,t){let n=gn(e.created_at),r=gn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Vl(e,t){let n=gn(e.updated_at),r=gn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Kl(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=gn(e.created_at),o=gn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Yl(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Tf=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function zl(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Hl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Tf.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Zl(e,t){let n=zl(e),r=zl(t);if(n!==r)return n<r?-1:1;let s=Hl(e),o=Hl(t);if(s!==o)return s<o?-1:1;let a=gn(e&&e.created_at),i=gn(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,d=t&&t.id;return c===d?0:String(c)<String(d)?-1:1}var wa=2**20;function Er(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-gn(e&&e.created_at)}function Ys(e){return(t,n)=>{let r=Er(t,e),s=Er(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function ka(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Er(i,n)-wa};if(!i)return{rank:Er(a,n)+wa};let c=Er(a,n),d=Er(i,n),p=(c+d)/2;return c<p&&p<d?{rank:p}:{renormalize:r.map((f,g)=>({bead_id:f.id,rank:g*wa}))}}function $a(e,t={}){let n=Et(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||ar;function d(){for(let g of Array.from(a))try{g()}catch{}}function p(){s=Array.from(r.values()).sort(c)}function f(g){if(i||!g||g.id!==e)return;let k=Number(g.revision)||0;if(n("apply %s rev=%d",g.type,k),!(k<=o&&g.type!=="snapshot")){if(g.type==="snapshot"){if(k<=o)return;r.clear();let A=Array.isArray(g.issues)?g.issues:[];for(let M of A)M&&typeof M.id=="string"&&M.id.length>0&&r.set(M.id,M);p(),o=k,d();return}if(g.type==="upsert"){let A=g.issue;if(A&&typeof A.id=="string"&&A.id.length>0){let M=r.get(A.id);if(!M)r.set(A.id,A);else{let U=Number.isFinite(M.updated_at)?M.updated_at:0,V=Number.isFinite(A.updated_at)?A.updated_at:0;if(U<=V){for(let Y of Object.keys(M))Y in A||delete M[Y];for(let[Y,D]of Object.entries(A))M[Y]=D}}p()}o=k,d()}else if(g.type==="delete"){let A=String(g.issue_id||"");A&&(r.delete(A),p()),o=k,d()}}}return{id:e,subscribe(g){return a.add(g),()=>{a.delete(g)}},applyPush:f,snapshot(){return s},size(){return r.size},getById(g){return r.get(g)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function Zs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Ql(e){let t=Et("subs"),n=new Map,r=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let d=r.get(i);if(!d||d.size===0)return;let p=Array.isArray(c.added)?c.added:[],f=Array.isArray(c.updated)?c.updated:[],g=Array.isArray(c.removed)?c.removed:[];for(let k of Array.from(d)){let A=n.get(k);if(!A)continue;let M=A.itemsById;for(let U of p)typeof U=="string"&&U.length>0&&M.set(U,!0);for(let U of f)typeof U=="string"&&U.length>0&&M.set(U,!0);for(let U of g)typeof U=="string"&&U.length>0&&M.delete(U)}}async function o(i,c){let d=Zs(c);if(t("subscribe %s key=%s",i,d),!n.has(i))n.set(i,{key:d,itemsById:new Map});else{let f=n.get(i);if(f&&f.key!==d){let g=r.get(f.key);g&&(g.delete(i),g.size===0&&r.delete(f.key)),n.set(i,{key:d,itemsById:new Map})}}r.has(d)||r.set(d,new Set);let p=r.get(d);p&&p.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(f){let g=n.get(i)||null;if(g){let k=r.get(g.key);k&&(k.delete(i),k.size===0&&r.delete(g.key))}throw n.delete(i),f}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let f=n.get(i)||null;if(f){let g=r.get(f.key);g&&(g.delete(i),g.size===0&&r.delete(f.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Zs,selectors:{getIds(i){let c=n.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let d=n.get(i);return d?d.itemsById.has(c):!1},count(i){let c=n.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=n.get(i),d={};if(!c)return d;for(let p of c.itemsById.keys())d[p]=!0;return d}}}}function Xl(){let e=Et("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let c of Array.from(r))try{c()}catch{}}function a(c,d,p){let f=d?Zs(d):"",g=n.get(c)||"",k=t.has(c);if(e("register %s key=%s (prev=%s)",c,f,g),k&&g&&f&&g!==f){let A=t.get(c);if(A)try{A.dispose()}catch{}let M=s.get(c);if(M){try{M()}catch{}s.delete(c)}let U=$a(c,p);t.set(c,U);let V=U.subscribe(()=>o());s.set(c,V)}else if(!k){let A=$a(c,p);t.set(c,A);let M=A.subscribe(()=>o());s.set(c,M)}return n.set(c,f),()=>i(c)}function i(c){e("unregister %s",c),n.delete(c);let d=t.get(c);d&&(d.dispose(),t.delete(c));let p=s.get(c);if(p){try{p()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let d=t.get(c);return d?d.snapshot().slice():[]},subscribe(c){return r.add(c),()=>r.delete(c)}}}function Jl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ec(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function tc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function xa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Cf(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Rf(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function nc(e){let t=Et("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Cf(r),a=Rf(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=xa(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?xa(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var Lf=Object.freeze({workspace_config:{default_workspace:null}});function rc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Lf.workspace_config.default_workspace}}}function sc(e={}){let t=Et("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:rc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?rc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==n.workspace.hidden[p]),c=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===n.worker.show_closed_children[p])&&!i&&!c||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function oc(e){let t=Et("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let d=n>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let d=n;n=Math.max(0,n-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,n),o()}function c(d){return async(f,g)=>{let k=s++,A=Date.now();r.set(k,{type:f,start_ts:A}),t("request start id=%d type=%s count=%d",k,f,n+1),a();let M=!1,U=()=>{M||(M=!0,r.delete(k),i())},V=setTimeout(()=>{M||(t("request TIMEOUT id=%d type=%s elapsed=%dms",k,f,Date.now()-A),U())},3e4);try{let Y=await d(f,g),D=Date.now()-A;return t("request done id=%d type=%s elapsed=%dms",k,f,D),Y}catch(Y){let D=Date.now()-A;throw t("request error id=%d type=%s elapsed=%dms err=%o",k,f,D,Y),Y}finally{clearTimeout(V),U()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let d=Date.now();return Array.from(r.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:d-f.start_ts}))}}}function de(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Qs(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(Yl),c;switch(i){case"created_desc":return c.sort(ar),c;case"created_asc":return c.sort(Gl),c;case"updated_desc":return c.sort(Vl),c;case"priority":return c.sort(Kl),c;case"manual":default:{let d=n();return d?c.sort(Ys(d)):c.sort(ar),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function $n(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Gt(e){let t=$n(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function sn(e,t){let n=$n(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function ac(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=$n(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Xs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Js(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=Xs(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function eo(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=ac(n);return{total:n.length,count:r,current:s,children:n}}function to(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let d of i)c[d.bead_id]=d.rank;n&&n.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!n)return;let d=n.get()||{revision:0,order:{}},p=r(ka(i,c,d.order),a);s(d,p);let f=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(f&&f.conflict){let g={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(g);let k=r(ka(i,c,g.order),a);s(g,k);let A=await t("ui-order-set",{expected_revision:g.revision,entries:k});A&&A.applied&&n.set({revision:typeof A.revision=="number"?A.revision:0,order:A.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function no(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Aa(e,t){return!t||typeof e!="string"||e.length===0||no(t.visible_labels).includes(e)?!0:no(t.hidden_labels).includes(e)?!1:!no(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function ic(e,t){return no(e).filter(n=>Aa(n,t))}function Bn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function If(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Of(e,t,n,r,s){return l`<button
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
  `}var Zf=200,Qf={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Xf=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),mc="beads-ui.board.sort",gc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Jf(){try{let e=window.localStorage.getItem(mc);if(e&&gc.has(e))return e}catch{}return"created_desc"}function hc(e,t){let n=Et("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,f=t.closedRange||rn,g=s?Qs(s,a):null,k=to({transport:o,uiOrderStore:a}),A=[],M=[],U=[],V=[],Y=[],D=[],P=!1,N=0,B=Jf(),T=new Map,L=new Map,Q=new Map,ye=new Set,he={search:"",priority:"",type:"",labels:[]},re=!1,Z=null;function Re(G){return String(G.status||"open")==="open"}function ke(G){let pe=String(G.status||"open");return pe==="open"||pe==="blocked"}function ie(G){let pe=he.search.trim().toLowerCase(),je=he.priority,He=he.type,E=he.labels;return G.filter(w=>{if(pe){let S=String(w.id||"").toLowerCase(),z=String(w.title||"").toLowerCase();if(!S.includes(pe)&&!z.includes(pe))return!1}if(je!==""&&String(w.priority)!==je||He!==""&&String(w.issue_type||"")!==He)return!1;if(E.length>0){let S=Array.isArray(w.labels)?w.labels:[];if(!E.some(z=>S.includes(z)))return!1}return!0})}function ae(){let G=new Set;for(let pe of[A,M,U,V,Y,D])for(let je of pe){let He=Array.isArray(je.labels)?je.labels:[];for(let E of He)typeof E=="string"&&E.length>0&&G.add(E)}return Array.from(G).sort()}function $e(){return he.search.trim()!==""||he.priority!==""||he.type!==""||he.labels.length>0}function j(){try{if(g){let G=g.selectBoardColumn("tab:board:in-progress","in_progress",B),pe=g.selectBoardColumn("tab:board:blocked","blocked",B).filter(ke),je=new Set(G.map(te=>te.id)),He=g.selectBoardColumn("tab:board:ready","ready",B).filter(te=>Re(te)&&!je.has(te.id)),E=g.selectBoardColumn("tab:board:resolved","resolved",B),w=g.selectBoardColumn("tab:board:deferred","deferred",B),S=g.selectBoardColumn("tab:board:closed","closed").slice(0,Zf),z=[...pe,...He,...G,...E,...S];ee(z);let ue=new Set;for(let te of z)te&&te.id&&!Xs(te)&&ue.add(te.id);let oe=!$e();A=oe?Xr(pe,ue):pe,M=oe?Xr(He,ue):He,U=oe?Xr(G,ue):G,V=oe?Xr(E,ue):E,Y=w,N=w.length,D=oe?Xr(S,ue):S,T=new Map;for(let te of A)T.set(te.id,"open");for(let te of M)T.set(te.id,"open");for(let te of U)T.set(te.id,"in_progress");for(let te of V)T.set(te.id,"resolved");for(let te of Y)T.set(te.id,"deferred");for(let te of D)T.set(te.id,"closed");L=new Map;for(let te of A)L.set(te.id,"blocked-col");for(let te of M)L.set(te.id,"ready-col");for(let te of U)L.set(te.id,"in-progress-col");for(let te of V)L.set(te.id,"resolved-col");for(let te of D)L.set(te.id,"closed-col")}Xe()}catch{A=[],M=[],U=[],V=[],Y=[],D=[],Q=new Map,Xe()}}function ee(G){Q=Js(G)}function le(G){return eo(Q,G)}function xe(G){return!ye.has(G)}function Ae(G,pe){G.preventDefault(),G.stopPropagation(),ye.has(pe)?ye.delete(pe):ye.add(pe),Xe()}function Pe(G,pe){G.preventDefault(),G.stopPropagation(),r(pe)}function ge(G,pe){G.preventDefault(),G.stopPropagation(),r(pe)}function lt(G,pe){Z||r(pe)}function mt(G,pe){G.preventDefault(),G.stopPropagation(),e_(pe).then(je=>{je&&de("\uBCF5\uC0AC\uB428","success",1200)})}function R(G,pe){Z=pe,G.dataTransfer&&(G.dataTransfer.setData("text/plain",pe),G.dataTransfer.effectAllowed="move"),G.target.classList.add("board-card--dragging")}function me(G){G.target.classList.remove("board-card--dragging"),wt(),setTimeout(()=>{Z=null},0)}function we(G){let pe=String(G.target.value||"");!pe||pe===f||(f=pe,d&&d(pe),Xe())}function Le(){return i?i.get():null}function Me(G){let pe=c?c.get():null,je=pe?pe.cleanup_failed:null;if(!je||typeof je!="object"||Array.isArray(je))return null;let He=je[G];return!He||typeof He!="object"||Array.isArray(He)?null:He}let Be={onCardClick:lt,onCopyId:mt,onDragStart:R,onDragEnd:me,onClosedRangeChange:we,rollupFor:le,isExpanded:xe,onRollupToggle:Ae,onChildClick:Pe,onFromChipClick:ge,cleanupFailureFor:Me,get policy(){return Le()}};function W(G,pe){Z||(X(),r(pe))}function K(G,pe){G.preventDefault(),G.stopPropagation(),X(),r(pe)}let De={...Be,onCardClick:W,onChildClick:K,onFromChipClick:K,get policy(){return Le()}};function Ye(G){let pe=G.target,je=e.querySelector(".board-filter__labels");pe&&je&&je.contains(pe)||O()}function We(G){G.key==="Escape"&&O()}function ve(){re||(re=!0,document.addEventListener("mousedown",Ye),document.addEventListener("keydown",We),Xe())}function O(){re&&(re=!1,document.removeEventListener("mousedown",Ye),document.removeEventListener("keydown",We),Xe())}function H(G){G.key==="Escape"&&X()}function J(){P||(P=!0,document.addEventListener("keydown",H),Xe())}function X(){P&&(P=!1,document.removeEventListener("keydown",H),Xe())}let Oe={onClose:X,onOverlayClick(G){G.target===G.currentTarget&&X()}},et={onSearchInput(G){he.search=String(G.target.value||""),j()},onPriorityChange(G){he.priority=String(G.target.value||""),j()},onTypeChange(G){he.type=String(G.target.value||""),j()},onSortChange(G){let pe=String(G.target.value||"");if(!(!gc.has(pe)||pe===B)){B=pe;try{window.localStorage.setItem(mc,pe)}catch{}j()}},onDeferredToggle(){P?X():J()},onLabelMenuToggle(){re?O():ve()},onLabelToggle(G){let pe=he.labels.indexOf(G);pe===-1?he.labels.push(G):he.labels.splice(pe,1),j()},onLabelClear(){he.labels.length!==0&&(he.labels=[],j())},onNewIssue(){p&&p()}};function ot(){return l`
      <div class="board-view">
        ${_c(he,et,{sort_mode:B,deferred_popup_open:P,deferred_count:N,label_options:ae(),label_menu_open:re})}
        <div class="board-root">
          ${Tr({title:"Blocked",id:"blocked-col",items:ie(A)},Be)}
          ${Tr({title:"Ready",id:"ready-col",items:ie(M)},Be)}
          ${Tr({title:"In progress",id:"in-progress-col",items:ie(U)},Be)}
          ${Tr({title:"Resolved",id:"resolved-col",items:ie(V)},Be)}
          ${Tr({title:"Closed",id:"closed-col",items:ie(D),is_closed:!0,closed_range:f},Be)}
        </div>
        ${P?fc({items:ie(Y),count:N},De,Oe):""}
      </div>
    `}function Xe(){Ke(ot(),e),vt()}function vt(){try{let G=e.querySelector("#deferred-popup");G&&!G.open&&(typeof G.showModal=="function"?G.showModal():G.setAttribute("open",""));let pe=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let je of pe)Array.from(je.querySelectorAll(".board-card")).forEach((E,w)=>{E.tabIndex=w===0?0:-1})}catch{}}async function gt(G,pe){if(!o){de("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:G,status:pe}),de("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(je){n("update-status failed: %o",je),de("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function at(G){switch(G){case"blocked-col":return A;case"ready-col":return M;case"in-progress-col":return U;case"resolved-col":return V;default:return[]}}function ct(G,pe,je){if(!o||!a)return;let He=at(G),E=He.find(oe=>oe.id===pe);if(!E)return;let w=He.filter(oe=>oe.id!==pe),S=je.closest?je.closest(".board-card"):null,z=w.length;if(S){let oe=S.getAttribute("data-issue-id");if(oe===pe)return;let te=w.findIndex(rt=>rt.id===oe);te>=0&&(z=te)}let ue=w.slice();ue.splice(z,0,E),k.applyReorder(pe,ue,z)}function wt(){for(let G of Array.from(e.querySelectorAll(".board-column--drag-over")))G.classList.remove("board-column--drag-over")}let nt=null;e.addEventListener("dragover",G=>{G.preventDefault(),G.dataTransfer&&(G.dataTransfer.dropEffect="move");let je=G.target.closest(".board-column");je&&je!==nt&&(nt&&nt.classList.remove("board-column--drag-over"),je.classList.add("board-column--drag-over"),nt=je)}),e.addEventListener("dragleave",G=>{let pe=G.relatedTarget;(!pe||!e.contains(pe))&&nt&&(nt.classList.remove("board-column--drag-over"),nt=null)}),e.addEventListener("drop",G=>{G.preventDefault(),nt&&(nt.classList.remove("board-column--drag-over"),nt=null);let pe=G.target,je=pe.closest(".board-column");if(!je)return;let He=G.dataTransfer?.getData("text/plain")||"";if(!He)return;let E=je.id,w=L.get(He);if(w&&w===E){if(Xf.has(E)){if(B!=="manual"){de("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ct(E,He,pe)}return}let S=Qf[E];if(!S){de("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}T.get(He)!==S&&gt(He,S)}),e.addEventListener("keydown",G=>{let pe=G.target;if(!(pe instanceof HTMLElement))return;let je=String(pe.tagName||"").toLowerCase();if(je==="input"||je==="textarea"||je==="select"||je==="button"||je==="a"||pe.isContentEditable===!0)return;let He=pe.closest(".board-card");if(!He)return;let E=String(G.key||"");if(E==="Enter"||E===" "){G.preventDefault();let ue=He.getAttribute("data-issue-id");ue&&r(ue);return}if(E!=="ArrowUp"&&E!=="ArrowDown"&&E!=="ArrowLeft"&&E!=="ArrowRight")return;G.preventDefault();let w=He.closest(".board-column");if(!w)return;let S=Array.from(w.querySelectorAll(".board-card")),z=S.indexOf(He);if(E==="ArrowDown"&&z<S.length-1){Ce(He,S[z+1]);return}if(E==="ArrowUp"&&z>0){Ce(He,S[z-1]);return}if(E==="ArrowLeft"||E==="ArrowRight"){let ue=Array.from(e.querySelectorAll(".board-column")),oe=ue.indexOf(w),te=E==="ArrowRight"?1:-1,rt=oe+te;for(;rt>=0&&rt<ue.length;){let Ze=ue[rt].querySelector(".board-card");if(Ze){Ce(He,Ze);return}rt+=te}}});function Ce(G,pe){try{G.tabIndex=-1,pe.tabIndex=0,pe.focus()}catch{}}let Ne=null;g&&g.subscribe&&(Ne=g.subscribe(()=>{try{j()}catch{}}));let ht=null;i&&i.subscribe&&(ht=i.subscribe(()=>{try{j()}catch{}}));let pt=null;return c&&c.subscribe&&(pt=c.subscribe(()=>{Xe()})),{async load(){n("load"),j()},clear(){O(),X(),Ne&&(Ne(),Ne=null),ht&&(ht(),ht=null),pt&&(pt(),pt=null),e.replaceChildren(),A=[],M=[],U=[],V=[],Y=[],D=[],T=new Map,L=new Map}}}function Xr(e,t){return e.filter(n=>{let r=Xs(n);return!(r&&t.has(r))})}async function e_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function on(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function ir(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Jr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function t_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${ir(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ir(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(c=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),c(p)};r.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Cn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await t_(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var n_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],bc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},r_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Pt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Tt(e){return typeof e=="string"&&e.length>0?e:null}function Cr(e){return e.startsWith("gpt-")?e.slice(4):e}function xt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function vc(e,t,n){let r=Tt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Tt(n[e]);return s===null?null:{value:s,source:"global"}}function es(e,t,n,r){return vc(e,t,n)||{value:r,source:"base"}}function Ta(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&Pt(s?.[t])){let a=Tt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Pt(s)){for(let a of Object.values(s))if(Pt(a)){let i=Tt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Tt(r?.runners?.[o]?.models?.[e]?.id)||e}function s_(e,t){return Tt(t?.review?.reviewers?.[e]?.model)||e}function Rr(e,t,n=!1){if(e==="default")return xt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Cr(e):e;return xt(e,t,r,e,"explicit")}function wc(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];Pt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(Pt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function o_(e,t){let n=[],r=e?.implementation?.model_catalog;Pt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(Pt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function a_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of o_(t,n)){let o=wc(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function Ca(e){return xt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function yc(e,t,n){let r=vc(e,t,n);return r?Rr(r.value,r.source):xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function en(e){let t=Pt(e.pin)?e.pin:{},n=Pt(e.global)?e.global:{},r=Pt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&Pt(r.session)?r.session:null,o=r?.supported===!0&&Pt(r.orchestration)?r.orchestration:null,a=Pt(e.runner_catalog)?e.runner_catalog:null,i=Tt(n.quick_fix_impl_model),c=a_(i,s,a),d={};if(s){let p=es("workflow_mode",t,n,Tt(s.workflow_mode_default));d.workflow_mode=p.source==="base"?xt(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):Rr(p.value,p.source);for(let D of["spec_review","plan_review","impl_review"]){let P=`${D}_model`,N=Tt(D==="plan_review"?p.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),B=es(P,t,n,N);if(B.value===null)d[P]=xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(B.value!=="self"&&B.value!=="skip"&&!Pt(s.review?.reviewers?.[B.value]))d[P]=Ca(xt(B.value,B.source,"",null,"explicit"));else{let T=s_(B.value,s);d[P]=xt(B.value,B.source,Cr(T),T,B.source==="base"?"default":"explicit")}}for(let[D,P]of Object.entries(bc)){let N=d[P].value;if(N==="self"||N==="skip"){d[D]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let B=Tt(s.review?.reviewers?.[N||""]?.effort),T=es(D,t,n,B);d[D]=T.value===null?xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):xt(T.value,T.source,T.value,T.value,T.source==="base"?"default":"explicit")}let f=Pt(s.implementation?.default)?s.implementation.default:{},g=Tt(e.route),k=g!==null&&["quick_fix","spec_backed","full_plan"].includes(g),A=Pt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},M=k&&Pt(A[g])?A[g]:{};for(let D of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let P=es(D,t,n,D==="impl_dispatch"?Tt(M.dispatch)||Tt(f.dispatch):Tt(f[D.replace("impl_","")]));d[D]=P.value===null?xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):xt(P.value,P.source,P.value,P.value,P.source==="base"?"default":"explicit")}let U=Tt(t.impl_runtime),V=U==="inherit"?Tt(e.controller_runtime):U,Y=g==="quick_fix"&&Tt(t.impl_dispatch)===null&&c.runtime!==null&&(U===null||V===c.runtime);if(Y){let D=c.runtime,P=i;d.impl_dispatch=xt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),U===null&&(d.impl_runtime=xt(D,"global",`${D} (\uC720\uB3C4)`,D,"explicit")),Tt(t.impl_model)===null&&(d.impl_model=xt(P,"global",P,P,"explicit"))}if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let D of["impl_runtime","impl_model","impl_effort","impl_speed"])d[D]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(d.impl_dispatch.value==="delegated"&&!Y&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_model.value!==null){let D=d.impl_runtime.value==="inherit"?Tt(e.controller_runtime):d.impl_runtime.value,P=D?wc(D,s,a):[];if(d.impl_model.value!=="auto"&&P.length>0&&!P.includes(d.impl_model.value))d.impl_model=Ca(d.impl_model);else{let N=Ta(d.impl_model.value,D,s,a);d.impl_model.display=Cr(N),d.impl_model.full_value=N}}if(d.impl_effort.value==="auto"){let D=Tt(e.transport)||(d.impl_runtime.value==="codex"?"codex-native-spawn":d.impl_runtime.value==="claude"?"implement-claude":null),P=D?Tt(s.implementation?.effort_by_transport?.[D]?.auto):null;P&&!r_.has(P)?(d.impl_effort.display=`${P} (\uBE44\uD638\uD658)`,d.impl_effort.full_value=P,d.impl_effort.resolution="incompatible"):(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}d.impl_speed.value==="default"&&(d.impl_speed=d.impl_speed.source==="base"?xt("default","base","default (\uC77C\uBC18)","default","default"):Rr("default",d.impl_speed.source))}}else for(let p of n_.filter(f=>!f.startsWith("orchestration_")))d[p]=yc(p,t,n);if(!s){for(let[p,f]of Object.entries(bc))(d[f].value==="self"||d[f].value==="skip")&&(d[p]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])d[p]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else d.impl_dispatch.value==="delegated"&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_effort.value==="auto"&&(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){d[p]=yc(p,t,n);continue}let f=p.replace("orchestration_",""),g=Tt(o[f]),k=es(p,t,n,g);if(p==="orchestration_effort"&&k.source==="base"){d[p]=xt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(k.value===null){d[p]=xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let A=k.source==="base"?Tt(o.model_id)||k.value:Ta(k.value,null,s,a);d[p]=xt(k.value,k.source,Cr(A),A,k.source==="base"?"default":"explicit");continue}if(k.value==="default"){d[p]=k.source==="base"?xt("default","base","default (\uC77C\uBC18)","default","default"):Rr("default",k.source);continue}d[p]=Rr(k.value,k.source)}if(s)if(i===null){let p=d.orchestration_model.full_value;d.quick_fix_impl_model=xt(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Cr(p)})`,null,"default")}else if(c.runtime!==null){let p=Ta(i,c.runtime,s,a);d.quick_fix_impl_model=xt(i,"global",Cr(p),p,"explicit")}else c.offered?d.quick_fix_impl_model=Ca(xt(i,"global","",null,"explicit")):d.quick_fix_impl_model=Rr(i,"global");return d}function i_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function lo(e){let t=Pt(e.pin)?e.pin:{},n=Pt(e.global)?e.global:{},r=Pt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=f=>{let g={...r,...f};return en({pin:e.layer==="pin"?g:t,global:e.layer==="pin"?n:g,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],c=s(o)[e.key],d=Tt(o[e.key]),p=[...e.choices];return d!==null&&!p.includes(d)&&p.unshift(d),{unset_label:i_(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:p.map(f=>{let g=s({...o,[e.key]:f})[e.key];return{value:f,label:g.display,full_value:g.full_value}})}}function Lr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let c=!1,d=f=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(f))},p=()=>d(r.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>d(null)),r.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),p())}),t.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}var Sc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function qt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Rn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],ts=[...Rn,"reasoning_output_tokens"],l_={codex:["implementation","review-consult"],claude:["subagent"]};function Ra(e){let t=0;for(let n of Rn)t+=qt(e?.[n]);return t}function c_(e){return!e||typeof e!="object"?!1:Rn.some(t=>Number.isFinite(e[t]))}function kc(e){return!e||typeof e!="object"?!1:ts.some(t=>Number.isFinite(e[t]))}function u_(e){let t={};for(let n of ts)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function $c(e){let t={};for(let n of ts)Number.isFinite(e[n])&&(t[n]=e[n]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function xc(e,t){return e==="codex"?qt(t.input_tokens)+qt(t.output_tokens):Ra(t)}function d_(e){return e==="claude"?"Claude":"Codex"}function p_(e){return`\u03C4 ${Ec(e)}`}function f_(e,t){let n=t.breakdown||{},r=[`\uC785\uB825 ${qt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${qt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?r.push(`\uCE90\uC2DC\uC77D\uAE30 ${qt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${qt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(r.push(`\uCE90\uC2DC\uC77D\uAE30 ${qt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${qt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&r.push(`\uCD94\uB860\uCD9C\uB825 ${qt(n.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,r.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Sc),o.join(`
`)}function Bt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${d_(n)} ${p_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:f_(n,r)})}return t}function uo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of ts)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=qt(i.breakdown[c])+qt(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function La(e){return!e||typeof e!="object"?null:dn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function __(e){return e==="codex"?"codex":"claude"}function xn(){return{subtotal:0,breakdown:u_(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function co(e,t,n){e.subtotal+=t.subtotal;for(let r of ts)Number.isFinite(t.usage[r])&&(e.breakdown[r]=qt(e.breakdown[r])+qt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Ac(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Ec(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Ir(e){return c_(e)?`\u03C4 ${Ec(Ra(e))}`:null}function Ln(e){let t=Ir(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ns(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${qt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${qt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${qt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${qt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Ra(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Sc),n.join(`
`)}function dn(e,t){let n={claude:xn(),codex:xn()},r={orchestrator:{claude:xn(),codex:xn()},implementation:{claude:xn(),codex:xn()},"review-consult":{claude:xn(),codex:xn()},subagent:{claude:xn(),codex:xn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(kc(c)){let p=__(i.runner),f=$c(c),g={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:f,subtotal:xc(p,f)};f.replayed===!0&&(g.replayed=!0),typeof i.model=="string"&&(g.model=i.model),typeof i.session_id=="string"&&(g.session_id=i.session_id),co(n[p],g,!0),co(r.orchestrator[p],g,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of d){let f=p&&p.provider==="claude"?"claude":"codex";if(!p||p.provider!=="codex"&&p.provider!=="claude"||!l_[f].includes(p.role)||!kc(p.usage))continue;let g=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!g||s.has(g))continue;s.add(g);let k=$c(p.usage),A={provider:f,role:p.role,attempt_id:String(i.attempt_id||""),usage:k,subtotal:xc(f,k)};A.receipt_id=g,typeof p.agent_type=="string"&&(A.agent_type=p.agent_type),typeof p.agent_id=="string"&&(A.agent_id=p.agent_id),typeof p.model=="string"&&(A.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(A.effort=p.effort),typeof p.session_id=="string"?A.session_id=p.session_id:typeof p.thread_id=="string"&&(A.session_id=p.thread_id),typeof p.turn_id=="string"&&(A.turn_id=p.turn_id),(typeof p.completed_at=="string"||typeof p.completed_at=="number"&&Number.isFinite(p.completed_at))&&(A.completed_at=p.completed_at),k.replayed===!0&&(A.replayed=!0),co(n[f],A,!1),co(r[A.role][f],A,!1)}}let o={};for(let i of["claude","codex"]){let c=n[i];if(c.legs.length===0)continue;let d=Ac(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(d.total_cost_usd=c.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let c={};for(let d of["claude","codex"]){let p=r[i][d];p.legs.length>0&&(c[d]={...Ac(p,!0),legs:p.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:Dc,setPrototypeOf:Tc,isFrozen:m_,getPrototypeOf:g_,getOwnPropertyDescriptor:h_}=Object,{freeze:Kt,seal:pn,create:qa}=Object,{apply:Fa,construct:ja}=typeof Reflect<"u"&&Reflect;Kt||(Kt=function(t){return t});pn||(pn=function(t){return t});Fa||(Fa=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});ja||(ja=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var po=Yt(Array.prototype.forEach),b_=Yt(Array.prototype.lastIndexOf),Cc=Yt(Array.prototype.pop),rs=Yt(Array.prototype.push),y_=Yt(Array.prototype.splice),_o=Yt(String.prototype.toLowerCase),Ia=Yt(String.prototype.toString),Oa=Yt(String.prototype.match),ss=Yt(String.prototype.replace),v_=Yt(String.prototype.indexOf),w_=Yt(String.prototype.trim),hn=Yt(Object.prototype.hasOwnProperty),Vt=Yt(RegExp.prototype.test),os=k_(TypeError);function Yt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Fa(e,t,r)}}function k_(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return ja(e,n)}}function tt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:_o;Tc&&Tc(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(m_(t)||(t[r]=o),s=o)}e[s]=!0}return e}function $_(e){for(let t=0;t<e.length;t++)hn(e,t)||(e[t]=null);return e}function In(e){let t=qa(null);for(let[n,r]of Dc(e))hn(e,n)&&(Array.isArray(r)?t[n]=$_(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=In(r):t[n]=r);return t}function as(e,t){for(;e!==null;){let r=h_(e,t);if(r){if(r.get)return Yt(r.get);if(typeof r.value=="function")return Yt(r.value)}e=g_(e)}function n(){return null}return n}var Rc=Kt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Pa=Kt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ma=Kt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),x_=Kt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Da=Kt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),A_=Kt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Lc=Kt(["#text"]),Ic=Kt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Na=Kt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Oc=Kt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),fo=Kt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),S_=pn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),E_=pn(/<%[\w\W]*|[\w\W]*%>/gm),T_=pn(/\$\{[\w\W]*/gm),C_=pn(/^data-[\-\w.\u00B7-\uFFFF]+$/),R_=pn(/^aria-[\-\w]+$/),Nc=pn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),L_=pn(/^(?:\w+script|data):/i),I_=pn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),qc=pn(/^html$/i),O_=pn(/^[a-z][.\w]*(-[.\w]+)+$/i),Pc=Object.freeze({__proto__:null,ARIA_ATTR:R_,ATTR_WHITESPACE:I_,CUSTOM_ELEMENT:O_,DATA_ATTR:C_,DOCTYPE_NAME:qc,ERB_EXPR:E_,IS_ALLOWED_URI:Nc,IS_SCRIPT_OR_DATA:L_,MUSTACHE_EXPR:S_,TMPLIT_EXPR:T_}),is={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},P_=function(){return typeof window>"u"?null:window},M_=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Mc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Fc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:P_(),t=qe=>Fc(qe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==is.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:k}=e,A=c.prototype,M=as(A,"cloneNode"),U=as(A,"remove"),V=as(A,"nextSibling"),Y=as(A,"childNodes"),D=as(A,"parentNode");if(typeof a=="function"){let qe=n.createElement("template");qe.content&&qe.content.ownerDocument&&(n=qe.content.ownerDocument)}let P,N="",{implementation:B,createNodeIterator:T,createDocumentFragment:L,getElementsByTagName:Q}=n,{importNode:ye}=r,he=Mc();t.isSupported=typeof Dc=="function"&&typeof D=="function"&&B&&B.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:re,ERB_EXPR:Z,TMPLIT_EXPR:Re,DATA_ATTR:ke,ARIA_ATTR:ie,IS_SCRIPT_OR_DATA:ae,ATTR_WHITESPACE:$e,CUSTOM_ELEMENT:j}=Pc,{IS_ALLOWED_URI:ee}=Pc,le=null,xe=tt({},[...Rc,...Pa,...Ma,...Da,...Lc]),Ae=null,Pe=tt({},[...Ic,...Na,...Oc,...fo]),ge=Object.seal(qa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),lt=null,mt=null,R=Object.seal(qa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),me=!0,we=!0,Le=!1,Me=!0,Be=!1,W=!0,K=!1,De=!1,Ye=!1,We=!1,ve=!1,O=!1,H=!0,J=!1,X="user-content-",Oe=!0,et=!1,ot={},Xe=null,vt=tt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),gt=null,at=tt({},["audio","video","img","source","image","track"]),ct=null,wt=tt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),nt="http://www.w3.org/1998/Math/MathML",Ce="http://www.w3.org/2000/svg",Ne="http://www.w3.org/1999/xhtml",ht=Ne,pt=!1,G=null,pe=tt({},[nt,Ce,Ne],Ia),je=tt({},["mi","mo","mn","ms","mtext"]),He=tt({},["annotation-xml"]),E=tt({},["title","style","font","a","script"]),w=null,S=["application/xhtml+xml","text/html"],z="text/html",ue=null,oe=null,te=n.createElement("form"),rt=function(C){return C instanceof RegExp||C instanceof Function},Ze=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(oe&&oe===C)){if((!C||typeof C!="object")&&(C={}),C=In(C),w=S.indexOf(C.PARSER_MEDIA_TYPE)===-1?z:C.PARSER_MEDIA_TYPE,ue=w==="application/xhtml+xml"?Ia:_o,le=hn(C,"ALLOWED_TAGS")?tt({},C.ALLOWED_TAGS,ue):xe,Ae=hn(C,"ALLOWED_ATTR")?tt({},C.ALLOWED_ATTR,ue):Pe,G=hn(C,"ALLOWED_NAMESPACES")?tt({},C.ALLOWED_NAMESPACES,Ia):pe,ct=hn(C,"ADD_URI_SAFE_ATTR")?tt(In(wt),C.ADD_URI_SAFE_ATTR,ue):wt,gt=hn(C,"ADD_DATA_URI_TAGS")?tt(In(at),C.ADD_DATA_URI_TAGS,ue):at,Xe=hn(C,"FORBID_CONTENTS")?tt({},C.FORBID_CONTENTS,ue):vt,lt=hn(C,"FORBID_TAGS")?tt({},C.FORBID_TAGS,ue):In({}),mt=hn(C,"FORBID_ATTR")?tt({},C.FORBID_ATTR,ue):In({}),ot=hn(C,"USE_PROFILES")?C.USE_PROFILES:!1,me=C.ALLOW_ARIA_ATTR!==!1,we=C.ALLOW_DATA_ATTR!==!1,Le=C.ALLOW_UNKNOWN_PROTOCOLS||!1,Me=C.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Be=C.SAFE_FOR_TEMPLATES||!1,W=C.SAFE_FOR_XML!==!1,K=C.WHOLE_DOCUMENT||!1,We=C.RETURN_DOM||!1,ve=C.RETURN_DOM_FRAGMENT||!1,O=C.RETURN_TRUSTED_TYPE||!1,Ye=C.FORCE_BODY||!1,H=C.SANITIZE_DOM!==!1,J=C.SANITIZE_NAMED_PROPS||!1,Oe=C.KEEP_CONTENT!==!1,et=C.IN_PLACE||!1,ee=C.ALLOWED_URI_REGEXP||Nc,ht=C.NAMESPACE||Ne,je=C.MATHML_TEXT_INTEGRATION_POINTS||je,He=C.HTML_INTEGRATION_POINTS||He,ge=C.CUSTOM_ELEMENT_HANDLING||{},C.CUSTOM_ELEMENT_HANDLING&&rt(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ge.tagNameCheck=C.CUSTOM_ELEMENT_HANDLING.tagNameCheck),C.CUSTOM_ELEMENT_HANDLING&&rt(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ge.attributeNameCheck=C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),C.CUSTOM_ELEMENT_HANDLING&&typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ge.allowCustomizedBuiltInElements=C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Be&&(we=!1),ve&&(We=!0),ot&&(le=tt({},Lc),Ae=[],ot.html===!0&&(tt(le,Rc),tt(Ae,Ic)),ot.svg===!0&&(tt(le,Pa),tt(Ae,Na),tt(Ae,fo)),ot.svgFilters===!0&&(tt(le,Ma),tt(Ae,Na),tt(Ae,fo)),ot.mathMl===!0&&(tt(le,Da),tt(Ae,Oc),tt(Ae,fo))),C.ADD_TAGS&&(typeof C.ADD_TAGS=="function"?R.tagCheck=C.ADD_TAGS:(le===xe&&(le=In(le)),tt(le,C.ADD_TAGS,ue))),C.ADD_ATTR&&(typeof C.ADD_ATTR=="function"?R.attributeCheck=C.ADD_ATTR:(Ae===Pe&&(Ae=In(Ae)),tt(Ae,C.ADD_ATTR,ue))),C.ADD_URI_SAFE_ATTR&&tt(ct,C.ADD_URI_SAFE_ATTR,ue),C.FORBID_CONTENTS&&(Xe===vt&&(Xe=In(Xe)),tt(Xe,C.FORBID_CONTENTS,ue)),Oe&&(le["#text"]=!0),K&&tt(le,["html","head","body"]),le.table&&(tt(le,["tbody"]),delete lt.tbody),C.TRUSTED_TYPES_POLICY){if(typeof C.TRUSTED_TYPES_POLICY.createHTML!="function")throw os('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof C.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw os('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');P=C.TRUSTED_TYPES_POLICY,N=P.createHTML("")}else P===void 0&&(P=M_(k,s)),P!==null&&typeof N=="string"&&(N=P.createHTML(""));Kt&&Kt(C),oe=C}},St=tt({},[...Pa,...Ma,...x_]),Qe=tt({},[...Da,...A_]),ft=function(C){let _e=D(C);(!_e||!_e.tagName)&&(_e={namespaceURI:ht,tagName:"template"});let Te=_o(C.tagName),it=_o(_e.tagName);return G[C.namespaceURI]?C.namespaceURI===Ce?_e.namespaceURI===Ne?Te==="svg":_e.namespaceURI===nt?Te==="svg"&&(it==="annotation-xml"||je[it]):!!St[Te]:C.namespaceURI===nt?_e.namespaceURI===Ne?Te==="math":_e.namespaceURI===Ce?Te==="math"&&He[it]:!!Qe[Te]:C.namespaceURI===Ne?_e.namespaceURI===Ce&&!He[it]||_e.namespaceURI===nt&&!je[it]?!1:!Qe[Te]&&(E[Te]||!St[Te]):!!(w==="application/xhtml+xml"&&G[C.namespaceURI]):!1},yt=function(C){rs(t.removed,{element:C});try{D(C).removeChild(C)}catch{U(C)}},Ct=function(C,_e){try{rs(t.removed,{attribute:_e.getAttributeNode(C),from:_e})}catch{rs(t.removed,{attribute:null,from:_e})}if(_e.removeAttribute(C),C==="is")if(We||ve)try{yt(_e)}catch{}else try{_e.setAttribute(C,"")}catch{}},zt=function(C){let _e=null,Te=null;if(Ye)C="<remove></remove>"+C;else{let b=Oa(C,/^[\r\n\t ]+/);Te=b&&b[0]}w==="application/xhtml+xml"&&ht===Ne&&(C='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+C+"</body></html>");let it=P?P.createHTML(C):C;if(ht===Ne)try{_e=new g().parseFromString(it,w)}catch{}if(!_e||!_e.documentElement){_e=B.createDocument(ht,"template",null);try{_e.documentElement.innerHTML=pt?N:it}catch{}}let Rt=_e.body||_e.documentElement;return C&&Te&&Rt.insertBefore(n.createTextNode(Te),Rt.childNodes[0]||null),ht===Ne?Q.call(_e,K?"html":"body")[0]:K?_e.documentElement:Rt},Nt=function(C){return T.call(C.ownerDocument||C,C,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Mt=function(C){return C instanceof f&&(typeof C.nodeName!="string"||typeof C.textContent!="string"||typeof C.removeChild!="function"||!(C.attributes instanceof p)||typeof C.removeAttribute!="function"||typeof C.setAttribute!="function"||typeof C.namespaceURI!="string"||typeof C.insertBefore!="function"||typeof C.hasChildNodes!="function")},Ft=function(C){return typeof i=="function"&&C instanceof i};function Lt(qe,C,_e){po(qe,Te=>{Te.call(t,C,_e,oe)})}let Ue=function(C){let _e=null;if(Lt(he.beforeSanitizeElements,C,null),Mt(C))return yt(C),!0;let Te=ue(C.nodeName);if(Lt(he.uponSanitizeElement,C,{tagName:Te,allowedTags:le}),W&&C.hasChildNodes()&&!Ft(C.firstElementChild)&&Vt(/<[/\w!]/g,C.innerHTML)&&Vt(/<[/\w!]/g,C.textContent)||C.nodeType===is.progressingInstruction||W&&C.nodeType===is.comment&&Vt(/<[/\w]/g,C.data))return yt(C),!0;if(!(R.tagCheck instanceof Function&&R.tagCheck(Te))&&(!le[Te]||lt[Te])){if(!lt[Te]&&Ht(Te)&&(ge.tagNameCheck instanceof RegExp&&Vt(ge.tagNameCheck,Te)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(Te)))return!1;if(Oe&&!Xe[Te]){let it=D(C)||C.parentNode,Rt=Y(C)||C.childNodes;if(Rt&&it){let b=Rt.length;for(let h=b-1;h>=0;--h){let x=M(Rt[h],!0);x.__removalCount=(C.__removalCount||0)+1,it.insertBefore(x,V(C))}}}return yt(C),!0}return C instanceof c&&!ft(C)||(Te==="noscript"||Te==="noembed"||Te==="noframes")&&Vt(/<\/no(script|embed|frames)/i,C.innerHTML)?(yt(C),!0):(Be&&C.nodeType===is.text&&(_e=C.textContent,po([re,Z,Re],it=>{_e=ss(_e,it," ")}),C.textContent!==_e&&(rs(t.removed,{element:C.cloneNode()}),C.textContent=_e)),Lt(he.afterSanitizeElements,C,null),!1)},Ut=function(C,_e,Te){if(H&&(_e==="id"||_e==="name")&&(Te in n||Te in te))return!1;if(!(we&&!mt[_e]&&Vt(ke,_e))){if(!(me&&Vt(ie,_e))){if(!(R.attributeCheck instanceof Function&&R.attributeCheck(_e,C))){if(!Ae[_e]||mt[_e]){if(!(Ht(C)&&(ge.tagNameCheck instanceof RegExp&&Vt(ge.tagNameCheck,C)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(C))&&(ge.attributeNameCheck instanceof RegExp&&Vt(ge.attributeNameCheck,_e)||ge.attributeNameCheck instanceof Function&&ge.attributeNameCheck(_e,C))||_e==="is"&&ge.allowCustomizedBuiltInElements&&(ge.tagNameCheck instanceof RegExp&&Vt(ge.tagNameCheck,Te)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(Te))))return!1}else if(!ct[_e]){if(!Vt(ee,ss(Te,$e,""))){if(!((_e==="src"||_e==="xlink:href"||_e==="href")&&C!=="script"&&v_(Te,"data:")===0&&gt[C])){if(!(Le&&!Vt(ae,ss(Te,$e,"")))){if(Te)return!1}}}}}}}return!0},Ht=function(C){return C!=="annotation-xml"&&Oa(C,j)},Je=function(C){Lt(he.beforeSanitizeAttributes,C,null);let{attributes:_e}=C;if(!_e||Mt(C))return;let Te={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ae,forceKeepAttr:void 0},it=_e.length;for(;it--;){let Rt=_e[it],{name:b,namespaceURI:h,value:x}=Rt,I=ue(b),ne=x,y=b==="value"?ne:w_(ne);if(Te.attrName=I,Te.attrValue=y,Te.keepAttr=!0,Te.forceKeepAttr=void 0,Lt(he.uponSanitizeAttribute,C,Te),y=Te.attrValue,J&&(I==="id"||I==="name")&&(Ct(b,C),y=X+y),W&&Vt(/((--!?|])>)|<\/(style|title|textarea)/i,y)){Ct(b,C);continue}if(I==="attributename"&&Oa(y,"href")){Ct(b,C);continue}if(Te.forceKeepAttr)continue;if(!Te.keepAttr){Ct(b,C);continue}if(!Me&&Vt(/\/>/i,y)){Ct(b,C);continue}Be&&po([re,Z,Re],ce=>{y=ss(y,ce," ")});let $=ue(C.nodeName);if(!Ut($,I,y)){Ct(b,C);continue}if(P&&typeof k=="object"&&typeof k.getAttributeType=="function"&&!h)switch(k.getAttributeType($,I)){case"TrustedHTML":{y=P.createHTML(y);break}case"TrustedScriptURL":{y=P.createScriptURL(y);break}}if(y!==ne)try{h?C.setAttributeNS(h,b,y):C.setAttribute(b,y),Mt(C)?yt(C):Cc(t.removed)}catch{Ct(b,C)}}Lt(he.afterSanitizeAttributes,C,null)},Wt=function qe(C){let _e=null,Te=Nt(C);for(Lt(he.beforeSanitizeShadowDOM,C,null);_e=Te.nextNode();)Lt(he.uponSanitizeShadowNode,_e,null),Ue(_e),Je(_e),_e.content instanceof o&&qe(_e.content);Lt(he.afterSanitizeShadowDOM,C,null)};return t.sanitize=function(qe){let C=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},_e=null,Te=null,it=null,Rt=null;if(pt=!qe,pt&&(qe="<!-->"),typeof qe!="string"&&!Ft(qe))if(typeof qe.toString=="function"){if(qe=qe.toString(),typeof qe!="string")throw os("dirty is not a string, aborting")}else throw os("toString is not a function");if(!t.isSupported)return qe;if(De||Ze(C),t.removed=[],typeof qe=="string"&&(et=!1),et){if(qe.nodeName){let x=ue(qe.nodeName);if(!le[x]||lt[x])throw os("root node is forbidden and cannot be sanitized in-place")}}else if(qe instanceof i)_e=zt("<!---->"),Te=_e.ownerDocument.importNode(qe,!0),Te.nodeType===is.element&&Te.nodeName==="BODY"||Te.nodeName==="HTML"?_e=Te:_e.appendChild(Te);else{if(!We&&!Be&&!K&&qe.indexOf("<")===-1)return P&&O?P.createHTML(qe):qe;if(_e=zt(qe),!_e)return We?null:O?N:""}_e&&Ye&&yt(_e.firstChild);let b=Nt(et?qe:_e);for(;it=b.nextNode();)Ue(it),Je(it),it.content instanceof o&&Wt(it.content);if(et)return qe;if(We){if(ve)for(Rt=L.call(_e.ownerDocument);_e.firstChild;)Rt.appendChild(_e.firstChild);else Rt=_e;return(Ae.shadowroot||Ae.shadowrootmode)&&(Rt=ye.call(r,Rt,!0)),Rt}let h=K?_e.outerHTML:_e.innerHTML;return K&&le["!doctype"]&&_e.ownerDocument&&_e.ownerDocument.doctype&&_e.ownerDocument.doctype.name&&Vt(qc,_e.ownerDocument.doctype.name)&&(h="<!DOCTYPE "+_e.ownerDocument.doctype.name+`>
`+h),Be&&po([re,Z,Re],x=>{h=ss(h,x," ")}),P&&O?P.createHTML(h):h},t.setConfig=function(){let qe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ze(qe),De=!0},t.clearConfig=function(){oe=null,De=!1},t.isValidAttribute=function(qe,C,_e){oe||Ze({});let Te=ue(qe),it=ue(C);return Ut(Te,it,_e)},t.addHook=function(qe,C){typeof C=="function"&&rs(he[qe],C)},t.removeHook=function(qe,C){if(C!==void 0){let _e=b_(he[qe],C);return _e===-1?void 0:y_(he[qe],_e,1)[0]}return Cc(he[qe])},t.removeHooks=function(qe){he[qe]=[]},t.removeAllHooks=function(){he=Mc()},t}var jc=Fc();var On={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},mo=e=>(...t)=>({_$litDirective$:e,values:t}),Or=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var ls=class extends Or{constructor(t){if(super(t),this.it=It,t.type!==On.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===It||t==null)return this._t=void 0,this.it=t;if(t===cn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};ls.directiveName="unsafeHTML",ls.resultType=1;var Bc=mo(ls);function za(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var cr=za();function Kc(e){cr=e}var ps={exec:()=>null};function _t(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Zt.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var D_=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Zt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},N_=/^(?:[ \t]*(?:\n|$))+/,q_=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,F_=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,fs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,j_=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ha=/(?:[*+-]|\d{1,9}[.)])/,Yc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Zc=_t(Yc).replace(/bull/g,Ha).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),B_=_t(Yc).replace(/bull/g,Ha).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ga=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,U_=/^[^\n]+/,Va=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,W_=_t(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Va).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),z_=_t(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ha).getRegex(),wo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ka=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,H_=_t("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ka).replace("tag",wo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Qc=_t(Ga).replace("hr",fs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wo).getRegex(),G_=_t(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Qc).getRegex(),Ya={blockquote:G_,code:q_,def:W_,fences:F_,heading:j_,hr:fs,html:H_,lheading:Zc,list:z_,newline:N_,paragraph:Qc,table:ps,text:U_},Uc=_t("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",fs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wo).getRegex(),V_={...Ya,lheading:B_,table:Uc,paragraph:_t(Ga).replace("hr",fs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Uc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wo).getRegex()},K_={...Ya,html:_t(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ka).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ps,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:_t(Ga).replace("hr",fs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Zc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Y_=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Z_=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Xc=/^( {2,}|\\)\n(?!\s*$)/,Q_=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ko=/[\p{P}\p{S}]/u,Za=/[\s\p{P}\p{S}]/u,Jc=/[^\s\p{P}\p{S}]/u,X_=_t(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Za).getRegex(),eu=/(?!~)[\p{P}\p{S}]/u,J_=/(?!~)[\s\p{P}\p{S}]/u,em=/(?:[^\s\p{P}\p{S}]|~)/u,tm=_t(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",D_?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),tu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,nm=_t(tu,"u").replace(/punct/g,ko).getRegex(),rm=_t(tu,"u").replace(/punct/g,eu).getRegex(),nu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",sm=_t(nu,"gu").replace(/notPunctSpace/g,Jc).replace(/punctSpace/g,Za).replace(/punct/g,ko).getRegex(),om=_t(nu,"gu").replace(/notPunctSpace/g,em).replace(/punctSpace/g,J_).replace(/punct/g,eu).getRegex(),am=_t("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Jc).replace(/punctSpace/g,Za).replace(/punct/g,ko).getRegex(),im=_t(/\\(punct)/,"gu").replace(/punct/g,ko).getRegex(),lm=_t(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),cm=_t(Ka).replace("(?:-->|$)","-->").getRegex(),um=_t("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",cm).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),bo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,dm=_t(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",bo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ru=_t(/^!?\[(label)\]\[(ref)\]/).replace("label",bo).replace("ref",Va).getRegex(),su=_t(/^!?\[(ref)\](?:\[\])?/).replace("ref",Va).getRegex(),pm=_t("reflink|nolink(?!\\()","g").replace("reflink",ru).replace("nolink",su).getRegex(),Wc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Qa={_backpedal:ps,anyPunctuation:im,autolink:lm,blockSkip:tm,br:Xc,code:Z_,del:ps,emStrongLDelim:nm,emStrongRDelimAst:sm,emStrongRDelimUnd:am,escape:Y_,link:dm,nolink:su,punctuation:X_,reflink:ru,reflinkSearch:pm,tag:um,text:Q_,url:ps},fm={...Qa,link:_t(/^!?\[(label)\]\((.*?)\)/).replace("label",bo).getRegex(),reflink:_t(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",bo).getRegex()},Ba={...Qa,emStrongRDelimAst:om,emStrongLDelim:rm,url:_t(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Wc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:_t(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Wc).getRegex()},_m={...Ba,br:_t(Xc).replace("{2,}","*").getRegex(),text:_t(Ba.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},go={normal:Ya,gfm:V_,pedantic:K_},cs={normal:Qa,gfm:Ba,breaks:_m,pedantic:fm},mm={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},zc=e=>mm[e];function Pn(e,t){if(t){if(Zt.escapeTest.test(e))return e.replace(Zt.escapeReplace,zc)}else if(Zt.escapeTestNoEncode.test(e))return e.replace(Zt.escapeReplaceNoEncode,zc);return e}function Hc(e){try{e=encodeURI(e).replace(Zt.percentDecode,"%")}catch{return null}return e}function Gc(e,t){let n=e.replace(Zt.findPipe,(o,a,i)=>{let c=!1,d=a;for(;--d>=0&&i[d]==="\\";)c=!c;return c?"|":" |"}),r=n.split(Zt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(Zt.slashPipe,"|");return r}function us(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function gm(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Vc(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,c}function hm(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var yo=class{constructor(e){kt(this,"options");kt(this,"rules");kt(this,"lexer");this.options=e||cr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:us(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=hm(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=us(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:us(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=us(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))i.push(n[c]),a=!0;else if(!a)i.push(n[c]);else break;n=n.slice(c);let d=i.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${d}`:d,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,n.length===0)break;let g=o.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let k=g,A=k.raw+`
`+n.join(`
`),M=this.blockquote(A);o[o.length-1]=M,r=r.substring(0,r.length-k.raw.length)+M.raw,s=s.substring(0,s.length-k.text.length)+M.text;break}else if(g?.type==="list"){let k=g,A=k.raw+`
`+n.join(`
`),M=this.list(A);o[o.length-1]=M,r=r.substring(0,r.length-g.raw.length)+M.raw,s=s.substring(0,s.length-k.raw.length)+M.raw,n=A.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let c=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,M=>" ".repeat(3*M.length)),g=e.split(`
`,1)[0],k=!f.trim(),A=0;if(this.options.pedantic?(A=2,p=f.trimStart()):k?A=t[1].length+1:(A=t[2].search(this.rules.other.nonSpaceChar),A=A>4?1:A,p=f.slice(A),A+=t[1].length),k&&this.rules.other.blankLine.test(g)&&(d+=g+`
`,e=e.substring(g.length+1),c=!0),!c){let M=this.rules.other.nextBulletRegex(A),U=this.rules.other.hrRegex(A),V=this.rules.other.fencesBeginRegex(A),Y=this.rules.other.headingBeginRegex(A),D=this.rules.other.htmlBeginRegex(A);for(;e;){let P=e.split(`
`,1)[0],N;if(g=P,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),N=g):N=g.replace(this.rules.other.tabCharGlobal,"    "),V.test(g)||Y.test(g)||D.test(g)||M.test(g)||U.test(g))break;if(N.search(this.rules.other.nonSpaceChar)>=A||!g.trim())p+=`
`+N.slice(A);else{if(k||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(f)||Y.test(f)||U.test(f))break;p+=`
`+g}!k&&!g.trim()&&(k=!0),d+=P+`
`,e=e.substring(P.length+1),f=N.slice(A)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(c.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};c.checked=p.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=p.raw+c.tokens[0].raw,c.tokens[0].text=p.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(p)):c.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):c.tokens.unshift(p)}}if(!s.loose){let d=c.tokens.filter(f=>f.type==="space"),p=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let c of s.items){c.loose=!0;for(let d of c.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Gc(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Gc(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=us(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=gm(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Vc(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Vc(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,c=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(r=d.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let p=[...r[0]][0].length,f=e.slice(0,s+r.index+p+a);if(Math.min(s,a)%2){let k=f.slice(1,-1);return{type:"em",raw:f,text:k,tokens:this.lexer.inlineTokens(k)}}let g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},bn=class Ua{constructor(t){kt(this,"tokens");kt(this,"options");kt(this,"state");kt(this,"inlineQueue");kt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||cr,this.options.tokenizer=this.options.tokenizer||new yo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Zt,block:go.normal,inline:cs.normal};this.options.pedantic?(n.block=go.pedantic,n.inline=cs.pedantic):this.options.gfm&&(n.block=go.gfm,this.options.breaks?n.inline=cs.breaks:n.inline=cs.gfm),this.tokenizer.rules=n}static get rules(){return{block:go,inline:cs}}static lex(t,n){return new Ua(n).lex(t)}static lexInline(t,n){return new Ua(n).inlineTokens(t)}lex(t){t=t.replace(Zt.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(p=>(c=p.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let p=n.at(-1);c.type==="text"&&p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,r,i)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),g;this.options.extensions.startInline.forEach(k=>{g=k.call({lexer:this},f),typeof g=="number"&&g>=0&&(p=Math.min(p,g))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(c=this.tokenizer.inlineText(d)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):n.push(c);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},vo=class{constructor(e){kt(this,"options");kt(this,"parser");this.options=e||cr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(Zt.notSpaceStart)?.[0],s=e.replace(Zt.endingNewline,"")+`
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
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Pn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},lr=new bm;function bt(e,t){return lr.parse(e,t)}bt.options=bt.setOptions=function(e){return lr.setOptions(e),bt.defaults=lr.defaults,Kc(bt.defaults),bt};bt.getDefaults=za;bt.defaults=cr;bt.use=function(...e){return lr.use(...e),bt.defaults=lr.defaults,Kc(bt.defaults),bt};bt.walkTokens=function(e,t){return lr.walkTokens(e,t)};bt.parseInline=lr.parseInline;bt.Parser=yn;bt.parser=yn.parse;bt.Renderer=vo;bt.TextRenderer=Xa;bt.Lexer=bn;bt.lexer=bn.lex;bt.Tokenizer=yo;bt.Hooks=ds;bt.parse=bt;var Lv=bt.options,Iv=bt.setOptions,Ov=bt.use,Pv=bt.walkTokens,Mv=bt.parseInline;var Dv=yn.parse,Nv=bn.lex;function Wn(e){let t=bt.parse(e),n=jc.sanitize(t);return Bc(n)}function Mn(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Pr(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function $o(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var au={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},ym={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},vm=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,wm=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function An(e){return!!e&&typeof e=="object"}function Ja(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function ei(e,t){let n=Ja(e),r=Ja(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function iu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>An(s)&&typeof s.text=="string"?s.text:"").join(""):An(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function km(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:au[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Ja(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=ei(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let c=ei(An(i)?i.old_string:"",An(i)?i.new_string:"");s+=c.added,o+=c.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function ti(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ni(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=vm.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:wm.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function $m(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function xm(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(An(a)){if(a.type==="text"&&typeof a.text=="string")o.push(ni(a.text));else if(a.type==="thinking"){let i=ti(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=km(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?ou(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(An(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=iu(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?ou([s],n):[s]}return[]}function ou(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Am(e){let t=typeof e.command=="string"?e.command:"",n=iu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:au.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Sm(e){if(e.type==="item.completed"&&An(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ni(t.text)];if(t.type==="reasoning"){let n=ti(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Am(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Em(e){if(e.schema!=="codex-delegation-monitor-v1"||!An(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&An(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[ni(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=ti(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=ym[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Tm(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Cm(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return An(t)?t:null}function lu(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Cm(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return $m(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Em(o):Tm(o)?Sm(o):xm(o,n);return a.length>0&&(r.progress=null),a}}}function ri(e){let t=[],n=lu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Rm=5,Lm=10,Im=/Task\s+#(\d+)/,Om=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Pm=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function xo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Mm(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Dm(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Nm(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Im.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!c||d.length===0)continue;t.set(c[1],{label:d,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function qm(e){if(e.tool==="Bash"){let t=e.command||"";return Om.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Pm.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Fm(e){let t=e.filter(s=>s.kind==="tool").slice(-Lm),n=new Map;t.forEach((s,o)=>{let a=qm(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function jm(e){let t=Dm(e);if(t)return{text:t,guess:!1};let n=Nm(e);if(n)return{text:n,guess:!1};let r=Fm(e);return r?{text:r,guess:!0}:null}function Bm(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:sn(e,t)}function Mr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,c=null,d=!1,p={},f=!0,g=new Set,k=new Set,A=null,M=null,U=!1,V=!1,Y=!1,D=null,P=null;function N(){U=!1,V=!1,Y=!1,D=null,P=null}async function B(W){if(n){V=!0,Y=!1,ge();try{let K=await Promise.resolve(n("get-attempt-prompt",{attempt_id:W,...c?{root_dir:c}:{}}));if(o!==W)return;!K||typeof K!="object"||Array.isArray(K)?Y=!0:(D=K,P=W)}catch{o===W&&(Y=!0)}finally{o===W&&(V=!1,ge())}}}function T(){if(U=!U,U&&o&&P!==o){B(o);return}ge()}function L(){if(!U)return"";let W=Pr({loading:V,error:Y});if(W)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${W}
      </div>`;if(!D)return"";if(D.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let K=$o(D.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${K?l`<div class="prompt-block__meta">${K} 발송</div>`:""}
      ${typeof D.task_prompt=="string"?Mn("\uACFC\uC5C5 (user)",D.task_prompt):""}
      ${typeof D.system_prompt=="string"?Mn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",D.system_prompt):""}
    </div>`}function Q(){if(!i||!r)return[];let W=r.get(i);return ri(W?W.lines:[])}function ye(){if(!i||!r)return null;let W=r.get(i),K=W?W.last_event_at:null;return typeof K=="number"?K:null}function he(){return p.status==="running"}function re(){if(he()&&o){M||(M=setInterval(()=>ge(),1e3));return}Z()}function Z(){M&&(clearInterval(M),M=null)}function Re(W){let K=[],De=0;for(;De<W.length;){let{idx:Ye,line:We}=W[De];if(We.kind==="tool"){let ve=De;for(;ve<W.length&&W[ve].line.kind==="tool"&&W[ve].line.tool===We.tool;)ve+=1;if(ve-De>=Rm&&!k.has(Ye)){K.push({kind:"group",idx:Ye,tool:We.tool||"",lines:W.slice(De,ve)}),De=ve;continue}}K.push({kind:"line",idx:Ye,line:We}),De+=1}return K}function ke(W){let K=[],De=new Map;for(let ve=0;ve<W.length;ve+=1){let O=W[ve],H=O.parent_tool_use_id;if(typeof H=="string"&&H.length>0){let J=De.get(H);J||(J={kind:"subagent",idx:ve,launch_id:H,agent_type:null,header:null,lines:[]},De.set(H,J),K.push(J)),J.lines.push({idx:ve,line:O});continue}if(O.kind==="tool"&&O.tool==="Agent"&&typeof O.launch_id=="string"&&O.launch_id.length>0){let J=ie(O),X=De.get(O.launch_id);if(X){X.header={idx:ve,line:O},X.agent_type=J;continue}let Oe={kind:"subagent",idx:ve,launch_id:O.launch_id,agent_type:J,header:{idx:ve,line:O},lines:[]};De.set(O.launch_id,Oe),K.push(Oe);continue}K.push({kind:"entry",idx:ve,line:O})}let Ye=[],We=0;for(;We<K.length;){if(K[We].kind!=="entry"){Ye.push(K[We]),We+=1;continue}let ve=We;for(;ve<K.length&&K[ve].kind==="entry";)ve+=1;Ye.push(...Re(K.slice(We,ve))),We=ve}return Ye}function ie(W){let K=W.input;return K&&typeof K.subagent_type=="string"?K.subagent_type:null}function ae(W){for(let K=W.length-1;K>=0;K-=1){let De=W[K];if(De.kind==="result"||De.kind==="error")return null;if(De.kind==="tool"&&!Object.hasOwn(De,"result"))return De}return null}function $e(W){for(let K=W.length-1;K>=0;K-=1)if(W[K].kind==="thinking")return W[K];return null}function j(W,K){if(K.kind==="gate")return l`<div class="sv__gate">${K.text}</div>`;if(K.kind==="phase")return l`<div class="sv__phase">${K.text}</div>`;if(K.kind==="result")return l`<div
        class="sv__result${K.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${K.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Wn(K.text||(K.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(K.kind==="thinking"){let De=g.has(W);return l`<div
        class="sv__think${De?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>mt(W)}
      >
        <span class="sv__think-line">💭 ${xo(K.text)}</span>
        ${De?l`<pre class="sv__think-expand">${K.text}</pre>`:""}
      </div>`}if(K.kind==="error")return l`<div class="sv__error">⛔ ${K.text}</div>`;if(K.kind==="blocker")return l`<div class="sv__error">⛔ ${K.text}</div>`;if(K.kind==="tool"){let De=g.has(W),Ye=K.tool==="Bash"?Mm(K.command):0,We=K.tool==="Bash"?Ye>1?xo(K.command):K.command:K.path||K.command||"";return l`<div
        class="sv__tool${De?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>mt(W)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${K.icon}</span>
          <span class="sv__tool-name">${K.tool}</span>
          ${We?l`<span class="sv__tool-detail">${We}</span>`:""}
          ${Ye>1?l`<span class="sv__tool-more">⋯ ${Ye}줄</span>`:""}
          ${typeof K.added=="number"?l`<span class="sv__diff-add">+${K.added}</span>`:""}
          ${typeof K.removed=="number"?l`<span class="sv__diff-del">−${K.removed}</span>`:""}
          ${K.result?l`<span class="sv__tool-ok">→ ${K.result}</span>`:""}
        </span>
        ${De?l`<pre class="sv__tool-expand">${ee(K)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Wn(K.text||"")}</div>`}function ee(W){let K=[];if(W.tool==="Bash"&&typeof W.command=="string"&&W.command.length>0)K.push(W.command);else if(W.input!==void 0)try{K.push(`input: ${JSON.stringify(W.input,null,2)}`)}catch{}return typeof W.output=="string"&&W.output.length>0&&K.push(`output:
${W.output}`),K.join(`

`)}function le(){if(!o)return l``;let W=Q(),K=(a?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),De=p.session_id||"",Ye=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${f?"ON":"OFF"}`,We=he(),ve=We?Bm(ye(),Date.now()):"",O=We?ae(W):null,H=We?$e(W):null,J=jm(W);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?p.role||"":o}</span>
        ${J?l`<span
              class="sv__stage${J.guess?" sv__stage--guess":""}"
              title=${J.text}
              >${J.text}</span
            >`:""}
        ${We?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ve?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ve}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ve?l`<span class="sv__live-ago">${ve}</span>`:""}</span
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
              class="sv__prompt-toggle${U?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${U?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${T}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${f?" sv__follow--on":""}"
          aria-pressed=${f?"true":"false"}
          aria-label=${Ye}
          @click=${R}
        >
          <span class="sv__follow-full">⇣ ${Ye}</span>
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
      ${a||d?"":L()}
      <div class="sv__body">
        ${W.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:ke(W).map(X=>X.kind==="subagent"?Ae(X):X.kind==="group"?xe(X):j(X.idx,X.line))}
      </div>
      ${O||H?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${O?l`<span class="sv__now-icon">${O.icon}</span>
                  <span class="sv__now-name">${O.tool}</span>
                  <span class="sv__now-detail"
                    >${O.tool==="Bash"?xo(O.command):O.path||O.command||""}</span
                  >`:""}
            ${H?l`<span class="sv__now-think"
                  >💭 ${xo(H.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function xe(W){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Pe(W.idx)}
    >
      <span class="sv__group-icon">${W.lines[0].line.icon}</span>
      <span class="sv__group-name">${W.tool}</span>
      <span class="sv__group-count">${W.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ae(W){let K=k.has(W.idx),De=W.header?W.header.line:null,Ye=De?De.is_error===!0?"\u2717":typeof De.result=="string"?"\u2713":"\u27F3":"",We=De&&De.command?De.command:"";return l`<div class="sv__sub${K?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Pe(W.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${W.agent_type||"subagent"}</span>
        ${We?l`<span class="sv__sub-detail">${We}</span>`:""}
        <span class="sv__sub-count">${W.lines.length}줄</span>
        ${Ye?l`<span class="sv__sub-state">${Ye}</span>`:""}
        ${K?"":l`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${K?l`<div class="sv__sub-body">
            ${Re(W.lines).map(ve=>ve.kind==="group"?xe(ve):j(ve.idx,ve.line))}
          </div>`:""}
    </div>`}function Pe(W){k.add(W),ge()}function ge(){Ke(le(),e),re(),f&&lt()}function lt(){let W=e.querySelector(".sv__body");W&&(W.scrollTop=W.scrollHeight)}function mt(W){g.has(W)?g.delete(W):g.add(W),ge()}function R(){f=!f,ge()}function me(W){on(W).then(K=>{K?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function we(W){!o||!W||(p={...p,...W},ge())}function Le(W){let K=W.target;if(!K||!K.classList||!K.classList.contains("sv__body"))return;!(K.scrollHeight-K.scrollTop-K.clientHeight<=4)&&f&&(f=!1,ge())}e.addEventListener("scroll",Le,!0);function Me(W){let K=W&&W.attempt_id;if(!K)return;let De=i;o=K,a=typeof W.launch_id=="string"&&W.launch_id.length>0?W.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&De&&De!==i&&Promise.resolve(n("unsubscribe-session-log",{id:De})).catch(()=>{}),c=typeof W.root_dir=="string"&&W.root_dir.length>0?W.root_dir:null,p=W.meta||{},d=W.hide_prompt===!0,f=!0,g.clear(),k.clear(),N(),!A&&r&&(A=r.subscribe(ge)),n&&Promise.resolve(n("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...c?{root_dir:c}:{}})).catch(()=>{}),ge()}function Be(){let W=i;o=null,a=null,i=null,c=null,d=!1,g.clear(),k.clear(),N(),Z(),n&&W&&Promise.resolve(n("unsubscribe-session-log",{id:W})).catch(()=>{}),Ke(l``,e),s&&s()}return{open:Me,updateMeta:we,close:Be,isOpen(){return o!==null},destroy(){Z(),A&&(A(),A=null),e.removeEventListener("scroll",Le,!0),o=null,a=null,i=null,c=null,d=!1,Ke(l``,e)}}}function Ao(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=si(t.spec_id),s=si(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function si(e){return typeof e=="string"?e.trim():""}function cu(e){let t=Ao(e);if(t.path)return t;let n=si(Um(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Um(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function Wm(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function zm(e){let t=e&&e.metadata||{},n=cu(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Wm(t)?null:"plan_pending"}),r}function uu(e,t){let n=zm(e);return l`
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
  `}var Hm="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Gm=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Vm=/^\*\*결론\*\* — (.+)$/;function So(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Hm)return null;let n=Gm.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Vm.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:c,body:t.slice(d).join(`
`).trim()}}var du=20;function pu(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Km(e){return e.length>du?`${e.slice(0,du)}\u2026`:e}function Ym(e,t,n,r){let s=`${t.lane} ${Km(t.identifier)}`;return l`<div class="detail-report">
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
  </div>`}function Zm(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
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
            ${i.map(c=>{let d=So(typeof c.text=="string"?c.text:"");return d?Ym(c,d,t,s.has(c.id)):Zm(c)})}
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
  `}var{I:bw}=Ol;var _u=e=>e.strings===void 0;var Qm={},mu=(e,t=Qm)=>e._$AH=t;var ur=mo(class extends Or{constructor(e){if(super(e),e.type!==On.PROPERTY&&e.type!==On.ATTRIBUTE&&e.type!==On.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!_u(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===cn||t===It)return t;let n=e.element,r=e.name;if(e.type===On.PROPERTY){if(t===n[r])return cn}else if(e.type===On.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return cn}else if(e.type===On.ATTRIBUTE&&n.getAttribute(r)===t+"")return cn;return mu(e),t}});var Eo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ai=[...Eo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Dn=["orchestration_model","orchestration_effort","orchestration_speed"],To=[...Eo,...Dn],Xm=ai.filter(e=>To.includes(e)),gu=["delegated","main"],Co=["inherit","claude","codex"],_s=["default","fast"],ms=["standard","fast_track"],gs=["codex","opus","fable","self","skip"],Ro=["codex","fable","skip"],Lo=["low","medium","high","xhigh"],ln="auto";function an(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function hu(e){if(!an(e)||!an(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))an(r)&&an(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Dr(e,t){let n=hu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[ln,...r.flatMap(([,s])=>s)]}function bu(e,t,n,r){if(!an(e)||!an(e.runners))return[ln];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!an(a)||!an(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,c]of Object.entries(a.models)){if(n&&n!==ln&&i!==n)continue;let d=r(a,c);if(Array.isArray(d))for(let p of d)typeof p=="string"&&!s.includes(p)&&s.push(p)}return[ln,...s]}function Nr(e,t,n){return bu(e,t,n,(r,s)=>an(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function ii(e,t,n){return bu(e,t,n,(r,s)=>an(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:an(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function hs(e,t){let n=hu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function yu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Dr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Nr(t,s,r.impl_model||ln).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Jm={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},oi=[...Xm,...Dn],eg=[...To,...ai].filter((e,t,n)=>n.indexOf(e)===t&&!oi.includes(e));function vu(e,t){let n=an(e)?e:{},r=an(t)?t:{},s=[];for(let a of oi){let i=n[a]??null,c=r[a]??null;i!==c&&s.push({key:a,label:Jm[a]||a,before:i,after:c,kind:i===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...eg,...Object.keys(r)])!oi.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function li(e,t,n,r,s,o){return lo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function wu(e,t){let n={};for(let r of ai){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function ku(e,t){let n={};for(let r of Dn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var ci=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Dn]}],zn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Io={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ui(e,t,n,r,s,o=null){let a=en({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function $u(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of ui(e,t,n,r,s,o))a[i.source]+=1;return a}function xu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Au(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Cw=[...Eo,...Dn];var tg=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],ng={pin:"pin",global:"global",base:"base"};function rg(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${ng[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function sg(e,t,n){switch(e){case"workflow_mode":return ms;case"spec_review_model":case"impl_review_model":return gs;case"plan_review_model":return Ro;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Lo;case"impl_dispatch":return gu;case"impl_runtime":return Co;case"impl_model":return Dr(n,t.impl_runtime);case"impl_effort":return Nr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return _s;case"orchestration_model":return hs(n,null);case"orchestration_effort":return Nr(n,void 0,t.orchestration_model||ln).filter(r=>r!==ln);default:return[]}}function og(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${rg(e.source)}
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
        >${ag(o)}</span
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
              ${r.filter(d=>c.keys.includes(d.key)).map(d=>{let p=lo({key:d.key,choices:sg(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return og(d,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
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
  </details>`}function ag(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function ig(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Eu(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=ig(n.exec_receipt),c=i?Tn(i):a,d=i?`${i.kind}:${i.actor}`:a.split("@")[0],p=ao(n.planned_execution,n.exec_receipt);return l`<section class="detail-summary" data-seam="detail-summary">
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
      ${tg.map(f=>{let g=f.receipt&&typeof t[f.receipt]=="string"?String(t[f.receipt]):"",k=r[f.id],A=g.length>0||k?.fill==="full",M=!A&&k?.fill==="dim",U=k?.stale===!0;return l`<span
          class=${`detail-summary__gate${A?" detail-summary__gate--on":""}${M?" detail-summary__gate--current":""}${U?" detail-summary__gate--stale":""}`}
          data-gate=${f.id}
        >
          <span class="detail-summary__gate-pill">${f.label}</span>
          ${g?l`<span class="detail-summary__gate-sha"
                >${g.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function Lu(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Tu(e){return Lu(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Cu(e,t){let n=e&&e[t];if(!Lu(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Tu),s=Tu(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function Iu(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function lg(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Iu(e)}${t}`}function Ou(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Iu(e)}`}function cg(e,t){return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Ou({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Ru(e){let t=e.provider_key==="claude"?lg:Ou,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return l`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${cg(e.provider_key,e.provider)}
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
  </section>`}var Mu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function bs(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Oo(e){if(!bs(e)||!bs(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>bs(n)&&bs(n.models));return t.length>0?t:null}function vn(e,t){let n=Oo(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Du(e,t){return bs(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Nu(e,t){let n=Oo(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Du(r,r.models[t]);return[]}function ug(e){let t=Oo(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Du(r,s))n.includes(o)||n.push(o);return n}function dg(e,t){if(!t)return ug(e);let r=Oo(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of Nu(e,o))s.includes(a)||s.push(a);return s}function qu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=vn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?Nu(t,r.impl_model):dg(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function pg(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function fg(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Fu(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,c="";function d(M){M.key==="Escape"&&s&&(M.preventDefault(),k())}document.addEventListener("keydown",d);function p(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>k()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${pg(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>k()}
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
    `:l``}function f(){Ke(p(),e)}async function g(M,U={}){s=M,o="loading",a="",i=null,c="",f();let V=n?n():"";if(!V){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let Y="/api/doc?workspace="+encodeURIComponent(V)+"&path="+encodeURIComponent(M);try{let D=await r(Y),P=await D.json().catch(()=>({}));if(!D.ok||!P||P.ok!==!0){if(P?.error==="not_found"&&U.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(P&&P.error||D.status)+")",f();return}let N=fg(String(P.content||""));i=N.front,a=N.body,o="ready",f()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function k(){s=null,Ke(l``,e)}function A(){document.removeEventListener("keydown",d),k()}return{open:g,close:k,destroy:A}}var _g=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Uu="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Po=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],mg=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function ju(e){return typeof e=="string"&&mg.has(e)}var gg=["running","done","failed","interrupted"],hg={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function bg(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function yg(e){let t=Bt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Ir(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${Uu}
          >부분 집계</span
        >`:""}`}function Bu(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function fi(e){if(typeof e=="number")return Mo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Mo(t):""}function vg(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function wg(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function di(e){return e===null||typeof e=="string"&&e.trim().length>0}function pi(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function kg(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Po.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?di(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||di(t.effort))||!(!("agent_type"in t)||di(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!gg.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!pi(t.started_at)||!pi(t.last_event_at)||!pi(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function $g(e,t,n){let s=Bt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
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
  </div>`}function xg(e,t,n,r){let s=e.status==="running"?null:t,a=(s?Bt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Mo(e.last_event_at):s?fi(s.completed_at):"",c=(e.provider==="claude"?["Claude",e.agent_type,vg(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=wg(e,s);return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${hg[e.status]}</span
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
  </button>`}function Ag(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Sg(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let f=kg(p);!f||s.has(f.launch_id)||ju(f.agent_type)||(s.add(f.launch_id),r.push(f))}r.sort((p,f)=>(p.started_at||0)-(f.started_at||0));let a={};for(let{role:p,provider:f}of Po){let g=t?t.roles[p]?.[f]:null;a[p]=g?[...g.legs]:[]}let i=Po.flatMap(({role:p})=>a[p]),c=new Set,d=[];for(let{role:p,provider:f}of Po){for(let g of r.filter(k=>k.role===p&&k.provider===f)){let k=i.find(A=>A.receipt_id===g.launch_id)||null;k&&!Ag(g,k)||(k&&c.add(k.receipt_id),d.push(xg(g,k,e.attempt_id,n)))}for(let g of a[p])!c.has(g.receipt_id)&&!ju(g.agent_type)&&d.push($g(p,f,g))}return d}function Eg(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[..._g,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${r.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${bg(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${Uu}</span>`:""}
  </div>`}var Tg={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Mo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Cg(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
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
    `;let o=new Set;for(let d of r)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let f=typeof d.session_id=="string"&&d.session_id.length>0,g=o.has(d.attempt_id),k=f&&!g,A=f?g?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!k}
      title=${A}
      @click=${M=>{M.stopPropagation(),k&&t.onResume&&t.onResume(d.attempt_id)}}
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
      세션 이력${yg(n.total)}
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
              >${Tg[d.status||""]||"\xB7"}</span
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
            ${g.length>0?g.map(k=>l`<span
                      class="detail-session__usage"
                      title=${k.tooltip}
                      >${k.label}</span
                    >`):Ir(d.usage)?l`<span class="detail-session__usage"
                    >${Ir(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Mo(d.started_at)}</span>
          </button>
          ${c(d)} ${a(d)} ${i(d)} ${Cg(d)}
          ${s.has(d.attempt_id)&&d.usage?Eg(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${Sg(d,p,t)}
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
          ${Rg(e)}
        </div>`:""}
  `}function Rg(e){let t=Pr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Mn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=$o(n.recorded_at);return l`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Mn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Mn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Lg=["open","in_progress","deferred","resolved","closed"],Ig=[0,1,2,3,4];function Hu(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,d=null,p=null,f={},g="",k=!1,A=[],M=!1,U={},V={claude:null,codex:null},Y=null,D=0,P=!1,N=!1,B="",T="",L="";function Q(){P=!1,N=!1,B="",T="",L=""}function ye(){V={claude:null,codex:null},Y=null,D+=1}async function he(u){try{let m=await fetch(u);if(!m.ok)return null;let v=await m.json();if(!v||typeof v!="object"||!Array.isArray(v.accounts))return null;let F=v.accounts.filter(fe=>fe!==null&&typeof fe=="object"&&!Array.isArray(fe));return{accounts:F,active:F.find(fe=>fe.active===!0)||null}}catch{return null}}async function re(u){Y=u;let m=++D,[v,F]=await Promise.all([he("/api/claude-usage"),he("/api/codex-usage")]);m!==D||u!==d||(V={claude:v,codex:F},Ie())}let Z=[],Re=null,ke=null,ie=!1,ae="",$e=!1,j=0,ee=new Set;function le(){Z=[],Re=null,ke=null,ie=!1,ae="",$e=!1,j+=1,ee.clear()}async function xe(u){if(!s)return;let m=++j;try{let v=await Promise.resolve(s("get-comments",{id:u}));if(m!==j||u!==d)return;Z=Array.isArray(v)?v:[],ie=!1}catch{if(m!==j||u!==d)return;ie=!0}Ie()}function Ae(){if(!s||!d)return;let u=p&&typeof p.comment_count=="number"?p.comment_count:null;if(Re!==d){Re=d,ke=u,xe(d);return}u!==null&&u!==ke&&(ke=u,xe(d))}function Pe(u){ee.has(u)?ee.delete(u):ee.add(u),Ie()}function ge(u){let m=ae.trim().length===0;ae=u,m!==(u.trim().length===0)&&Ie()}async function lt(){let u=ae.trim();if(!s||!d||u.length===0||$e)return;let m=d;$e=!0,Ie();let v=!1;try{let F=await Promise.resolve(s("add-comment",{id:m,text:u}));Array.isArray(F)&&F.length>0&&(v=!0,m===d&&(Z=F,ie=!1,ae="",ke=F.length))}catch{v=!1}v||de("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),m===d&&($e=!1),Ie()}let mt={onToggle:Pe,onDraftInput:ge,onSubmit:lt},R=document.createElement("div");R.className="md-viewer-root",document.body.appendChild(R);let me=Fu(R,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),we=document.createElement("div");we.className="session-log-root",document.body.appendChild(we);let Le=Mr(we,{transport:s?(u,m)=>Promise.resolve(s(u,m)):void 0,sessionLogStore:c}),Me=!1,Be=!1,W=!1,K=null,De=null,Ye=0;function We(u){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${u}`}function ve(){Me=!1,Be=!1,W=!1,K=null,De=null,Ye+=1}async function O(u){if(!s)return;let m=++Ye;Be=!0,W=!1,Ie();try{let v=await Promise.resolve(s("get-bead-prompt",{bead_id:u}));if(m!==Ye)return;!v||typeof v!="object"||Array.isArray(v)?W=!0:(K=v,De=We(u))}catch{m===Ye&&(W=!0)}finally{m===Ye&&(Be=!1,Ie())}}function H(){if(Me=!Me,Me&&d&&De!==We(d)){K=null,O(d);return}Ie()}function J(){if(!a||!d)return[];let u=a.get();return(u&&u.attempts?Object.values(u.attempts):[]).filter(v=>v&&v.bead_id===d).sort((v,F)=>(F.started_at||0)-(v.started_at||0)).map(v=>({attempt_id:v.attempt_id,bead_id:v.bead_id,status:v.status,started_at:typeof v.started_at=="number"?v.started_at:null,runner:v.runner||null,model:v.model||null,effort:v.effort||v.observed_effort||null,speed:v.speed||null,session_id:v.session_id||null,resumed_from:v.resumed_from||null,continuation_mode:v.continuation_mode||null,dismissed_at:typeof v.dismissed_at=="number"?v.dismissed_at:null,cause:typeof v.cause=="string"?v.cause:null,cause_detail:v.cause_detail||null,exec_default_preset_id:typeof v.exec_default_preset_id=="string"?v.exec_default_preset_id:null,exec_default_preset_revision:typeof v.exec_default_preset_revision=="number"?v.exec_default_preset_revision:null,exec_values:v.exec_values&&typeof v.exec_values=="object"?v.exec_values:null,usage:v.usage||null,usage_legs:Array.isArray(v.usage_legs)?v.usage_legs:[],delegation_sessions:Array.isArray(v.delegation_sessions)?v.delegation_sessions:[]}))}function X(){if(!a||!d)return null;let u=a.get();return dn(u&&u.attempts||{},d)}let Oe=new Set;function et(u){Oe.has(u)?Oe.delete(u):Oe.add(u),Ie()}function ot(u){let m=a?a.get():null,v=m&&m.attempts?m.attempts[u]:null;Le.open({attempt_id:u,meta:v?{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.status||void 0,session_id:v.session_id||void 0}:{}})}function Xe(u,m){let v=a?a.get():null,F=v&&v.attempts?v.attempts[u]:null,Ee=(F&&Array.isArray(F.delegation_sessions)?F.delegation_sessions:[]).find(Se=>Se&&typeof Se=="object"&&Se.launch_id===m);Ee&&Le.open({attempt_id:u,launch_id:m,meta:{runner:Ee.provider==="claude"?"claude":"codex",role:Ee.role,...typeof Ee.agent_type=="string"?{agent_type:Ee.agent_type}:{},model:Ee.model,effort:Ee.effort,session_id:Ee.session_id,status:Ee.status}})}async function vt(u){if(!s||!u)return;let m=await Lr();if(m===null)return;let v=()=>{let Se=a?a.get():null;return Se&&typeof Se.revision=="number"?Se.revision:0},F=async(Se={},ze=v())=>await s("worker-attempt-resume",{attempt_id:u,expected_revision:ze,...m!==""?{instructions:m}:{},...Se}),fe=Se=>{Se?.queue&&a?.set&&a.set(Se.queue)},Ee=await F();if(fe(Ee),Ee&&Ee.conflict){let Se=Ee.queue&&typeof Ee.queue.revision=="number"?Ee.queue.revision:v();Ee=await F({},Se),fe(Ee)}Ee=await Cn(Ee,(Se,ze)=>F({continuation:Se,decision_token:ze}),{onResult:fe,refresh:()=>F()}),Ee&&Ee.resumed===!1&&!Ee.conflict&&Ee.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ee.reason}`,"error",2400)}let gt={onOpen:ot,onOpenDelegation:Xe,onResume:vt,onToggleUsage:et};function at(){let u=a?a.get():null,m={...U};for(let v of["orchestration_model","orchestration_effort","orchestration_speed"]){let F=u&&u[v];typeof F=="string"&&(m[v]=F)}return m}async function ct(){if(s){try{let u=await Promise.resolve(s("get-session-defaults",{}));U=u&&u.values&&typeof u.values=="object"?u.values:{}}catch{U={}}Ie()}}function wt(){let u=a?a.get():null;return u&&u.runner_catalog||null}function nt(){let u=a?a.get():null;return u&&typeof u.execution_defaults=="object"?u.execution_defaults:null}function Ce(){let u=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},v=en({pin:{...u,...f},global:at(),execution_defaults:nt(),runner_catalog:wt(),route:typeof u.route=="string"?u.route:null}).orchestration_model.value||"";return vn(wt(),v)}function Ne(){let u=i?i.get():null;return!u||typeof u.revision!="number"?null:{revision:u.revision,presets:Array.isArray(u.presets)?u.presets:[]}}function ht(u){return u?.compatible===!1}function pt(u){i&&u&&typeof u.revision=="number"&&Array.isArray(u.presets)&&i.set({revision:u.revision,presets:u.presets})}async function G(){let u=Ne(),m=u?.presets.find(v=>v.id===g);if(!(!s||!d||!u||!m||ht(m)||k)){k=!0,A=[],Ie();try{let v=await Promise.resolve(s("apply-impl-preset",Au(d,m.id,u.revision)));if(v&&v.conflict){pt(v),de("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let F=v&&Array.isArray(v.issue)?v.issue[0]:v?.issue;if(v&&v.applied&&F&&typeof F=="object"){p=F,A=Array.isArray(v.skipped_orchestration_keys)?v.skipped_orchestration_keys.filter(fe=>typeof fe=="string"):[];for(let fe of Mu)delete f[fe];de(A.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}v&&v.error==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(v){v&&typeof v=="object"&&v.code==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{k=!1,Ie()}}}let pe=null;n&&n.subscribe&&(pe=n.subscribe(()=>w()));let je=null;a&&typeof a.subscribe=="function"&&(je=a.subscribe(()=>{d&&Ie()}));let He=null;i&&typeof i.subscribe=="function"&&(He=i.subscribe(()=>{d&&Ie()}));function E(u){u.key==="Escape"&&d&&(u.preventDefault(),r())}document.addEventListener("keydown",E);function w(){if(d){if(n&&typeof n.snapshotFor=="function"){let u=n.snapshotFor("detail:"+d)||[];p=u.find(v=>v&&v.id===d)||u[0]||p}Ae(),Ie()}}function S(u){on(u).then(m=>{m?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function z(u){u.preventDefault(),u.stopPropagation(),d&&S(d)}function ue(u,m){u.preventDefault(),u.stopPropagation(),S(m)}function oe(u,m,v){u.preventDefault(),u.stopPropagation(),me.open(m,{missing_state:v})}function te(u,m){f[u]=m,Ie(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",xu(d,u,m.length===0?null:m))).catch(()=>{de("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function rt(u,m){let v=p||{},F=v.metadata&&typeof v.metadata=="object"?v.metadata:{},fe={};for(let ze of["impl_runtime","impl_model","impl_effort"])fe[ze]=Object.hasOwn(f,ze)?f[ze]:typeof F[ze]=="string"?F[ze]:"";fe[u]=m;let Ee=qu(fe,wt(),Ce()),Se={};for(let ze of["impl_runtime","impl_model","impl_effort"])Se[ze]=f[ze],f[ze]=Ee[ze]||"";Ie(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...Ee,orchestration_runtime:Ce()})).then(ze=>{let ut=Array.isArray(ze)?ze[0]:ze;if(!ut||typeof ut!="object"||!ut.id)throw new Error("implementation target readback failed");p=ut;for(let jt of["impl_runtime","impl_model","impl_effort"])delete f[jt];Ie()}).catch(()=>{for(let ze of["impl_runtime","impl_model","impl_effort"])Se[ze]===void 0?delete f[ze]:f[ze]=Se[ze];Ie(),de("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Ze(u,m,v){if(!s||!d)return!1;try{let F=await Promise.resolve(s(u,m)),fe=Array.isArray(F)?F[0]:F;return fe&&typeof fe=="object"&&fe.id?(p=fe,!0):(de(v,"error"),!1)}catch{return de(v,"error"),!1}}function St(u){setTimeout(()=>{try{let m=e.querySelector(u);m&&typeof m.focus=="function"&&m.focus()}catch{}},0)}function Qe(){P=!0,B=p&&p.title||"",Ie(),St('.detail-edit__input[data-edit="title"]')}function ft(u){B=u.target.value}function yt(){P=!1,B="",Ie()}function Ct(){Ze("edit-text",{id:d,field:"title",value:B},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(m=>{m&&(P=!1,B=""),Ie()})}function zt(){N=!0,T=p&&p.description||"",Ie(),St('.detail-edit__textarea[data-edit="description"]')}function Nt(u){T=u.target.value}function Mt(){N=!1,T="",Ie()}function Ft(){Ze("edit-text",{id:d,field:"description",value:T},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(m=>{m&&(N=!1,T=""),Ie()})}function Lt(u,m,v,F){if(u.key==="Escape"){u.stopPropagation(),v();return}u.key==="Enter"&&(!F||u.ctrlKey||u.metaKey)&&(u.preventDefault(),m())}function Ue(u){let m=u.target.value;Ze("update-status",{id:d,status:m},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Ie())}function Ut(u){let m=Number(u.target.value);Ze("update-priority",{id:d,priority:m},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Ie())}function Ht(u){L=u.target.value}function Je(){let u=L.trim();u.length!==0&&Ze("label-add",{id:d,label:u},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(m=>{m&&(L=""),Ie()})}function Wt(u){if(u.key==="Escape"){u.stopPropagation(),L="",Ie();return}u.key==="Enter"&&(u.preventDefault(),Je())}function qe(u){Ze("label-remove",{id:d,label:u},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Ie())}let C={onCopyPath:ue,onOpenDoc:oe};function _e(u){return typeof u=="string"?u:u&&typeof u=="object"?String(u.id||u.to||u.issue_id||u.depends_on||""):""}function Te(u){switch(u&&typeof u=="object"?String(u.dependency_type||u.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function it(u){let v=(Array.isArray(u.dependencies)?u.dependencies:[]).map(F=>({id:_e(F),icon:Te(F)})).filter(F=>F.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${v.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${v.map(F=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(F.id)}
                  >
                    ${F.icon?`${F.icon} `:""}${F.id}
                  </button>`:l`<span class="detail-dep"
                    >${F.icon?`${F.icon} `:""}${F.id}</span
                  >`)}
          </div>`}
    `}function Rt(u){let m=u.metadata||{},v=u.workflow||{},F=v.stages||{},fe=F.spec&&F.spec.stale,Ee=F.impl&&F.impl.stale,Se=F.plan||null,ze=v.route_source==="derived",ut=v.route||m.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ze?" detail-kv__v--derived":""}"
          title=${ze?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ze?"unset":ut}</span
        >
      </div>
      ${v.route!=="quick_fix"||Object.hasOwn(m,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${m.spec_review||"\uC5C6\uC74C"}${fe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${v.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Se?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Se?.approval_receipt||"\uC5C6\uC74C"}${Se?.approval_state==="stale"?" \xB7 stale":Se?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${v.route!=="quick_fix"||Object.hasOwn(m,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${m.impl_review||"\uC5C6\uC74C"}${Ee?" \xB7 stale":""}</span
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
    `}let b={route:["quick_fix","spec_backed","full_plan"]};async function h(u,m){let v=m.target.value;if(u==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&v!=="full_plan"&&!window.confirm(`full_plan \u2192 ${v||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Ie();return}await Ze("update-workflow-meta",{id:d,key:u,value:v},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Ie()}function x(u){let m=u.metadata||{};return l` ${((F,fe)=>{let Ee=b[F],Se=typeof m[F]=="string"?m[F]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${F}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${F}
          data-edit=${`wfmeta-${F}`}
          @change=${ze=>h(F,ze)}
        >
          <option value="" ?selected=${!Ee.includes(Se)}>
            ${fe}
          </option>
          ${Ee.map(ze=>l`<option value=${ze} ?selected=${Se===ze}>${ze}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function I(u,m){return P?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${B}
            @input=${ft}
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
          @click=${Qe}
        >
          ✎
        </button>
      </div>
    `}function ne(u){let m=Gt(u.created_at),v=Gt(u.updated_at);return!m&&!v?l``:l`
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
          ${Lg.map(v=>l`<option value=${v} ?selected=${v===u}>${v}</option>`)}
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
          ${Ig.map(v=>l`<option value=${String(v)} ?selected=${v===m}>
                P${v}
              </option>`)}
        </select>
      </div>
    `}function $(u){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${N?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${zt}
            >
              ✎
            </button>`}
      </div>
      ${N?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${T}
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
    `}function be(u){let m=Array.isArray(u.labels)?u.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${m.map(v=>l`<span class="detail-label-chip"
              >${v}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${v}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+v}
                @click=${()=>qe(v)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${L}
            @input=${Ht}
            @keydown=${Wt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Je}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ve(){if(!d)return l``;let u=p||{},m=String(u.id||d),v=u.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",F=X(),fe=u.status||"open",Ee=typeof u.priority=="number"?Math.max(0,Math.min(4,u.priority)):"",Se=u.description||"",ze={...u,metadata:{...u.metadata||{},...f}};return l`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${z}
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
          ${I(v,F)}
          ${Eu(ze)}
          ${Su({metadata:ze.metadata,workspace_values:at(),catalog:wt(),execution_defaults:nt(),expanded:M,presets:Ne()?.presets||[],preset_id:g,preset_busy:k,skipped_orchestration_keys:A},{onToggle:ut=>{M=ut,Ie()},onEdit:(ut,jt)=>{if(ut==="impl_runtime"||ut==="impl_model"||ut==="impl_effort"){rt(ut,jt??"");return}te(ut,jt??"")},onPresetSelect:ut=>{g=ut,A=[],Ie()},onPresetApply:()=>{G()}})}
          ${Pu({md:ze.metadata,catalog:V,handlers:{onExecChange:te}})}
          ${y(fe,Ee)} ${ne(u)}
          ${$(Se)}
          ${fu(Z,mt,{expanded:ee,draft:ae,sending:$e,error:ie})}
          ${ce(u)} ${be(u)} ${it(u)}
          ${Rt(u)} ${x(u)}
          ${uu(u,C)}
          ${zu({expanded:Me,loading:Be,error:W,data:K},{onToggle:H})}
          ${Wu(J(),gt,{total:F,expanded:Oe})}
        </div>
      </div>
    `}function Ie(){Ke(Ve(),e)}return{load(u){u!==d&&(f={},g="",A=[],M=!1,Q(),le(),ve(),ye()),d=u,p=null,w(),ct(),Y!==u&&re(u)},clear(){d=null,p=null,f={},g="",k=!1,A=[],M=!1,Q(),le(),ve(),ye(),me.close(),Le.close(),Ke(l``,e)},destroy(){pe&&(pe(),pe=null),je&&(je(),je=null),He&&(He(),He=null),document.removeEventListener("keydown",E),me.destroy(),R.parentNode&&R.parentNode.removeChild(R),Le.destroy(),we.parentNode&&we.parentNode.removeChild(we),d=null,p=null,ye(),g="",k=!1,A=[],le(),ve(),Ke(l``,e)}}}function Gu(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(d,p,f="")=>{n&&(n.textContent=d||"Unexpected Error"),r&&(r.textContent=p||"An unrecoverable error occurred.");let g=typeof f=="string"?f.trim():"";if(s&&(g.length>0?(s.textContent=g,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function No(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function vs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function qo(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function Fo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Og(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:No(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Vu(e,t){let n=Og(e,t);return n?l`<button
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
  </div>`}function Pg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function ws(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function jo(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Sn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,g)=>(f.requested_at||0)-(g.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?Pg(s.phase):null,d=s?.kind==="stale_work_backup_fresh",p=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:p}}function ys(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return l`<div
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
  </div>`}var Mg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Ku(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let c=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Mg[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Bo(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}var Do=3;function Dg(e){return l`<div
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
        >`)}${s.map(p=>l`<span class="worker-dep worker-dep--warn">${p}</span>`)}${i?Dg(i):""}
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
  </button>`:""}function Ng(e){let t=Array.isArray(e.badges)?e.badges:[],n=Bt(e.usage),r=Ln(e.usage),s=sn(e.done_at);return l`<div
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
  </div>`}function Hn(e){if(e.lane==="done"&&e.done_layout==="three_line")return Ng(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=Bt(e.usage),s=Ln(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?sn(e.done_at):"",d=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",f=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",g=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,A=e.lane==="done"?"":jr(e.workflow),M=Yu(e.from_id),U=l`<span class="worker-mini__title">${e.title}</span>`,V=e.pr_url&&e.pr_number?l`<a
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
        >`:"",D=n.map(ee=>ee===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ee}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ee===e.completion_badge&&e.completion_title||""}
          >${ee}</span
        >`),P=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",N=r.length>0?r.map(ee=>l`<span class="worker-usage" title=${ee.tooltip}
              >${ee.label}</span
            >`):s?l`<span class="worker-usage" title=${ns(e.usage)}
            >${s}</span
          >`:"",B=o?l`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?l`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",T=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",L=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",Q=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ye=e.discard,he=ye?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ye?.attempt_id||""}
          data-operation-id=${ye?.operation?.operation_id||""}
          data-discard-mode=${ye?.confirmation||"unmerged"}
          ?disabled=${ye?!ye.enabled:e.discard_enabled===!1}
          title=${ye?ye.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ye?.label||"\uD3D0\uAE30"}
        </button>`:"",re=e.stale_work||null,Z=re?l`${re.can_resume||re.can_continue?l`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${re.action_id}
            ?disabled=${re.locked}
          >
            기존 작업 이어가기
          </button>`:""}${re.can_backup_fresh?l`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${re.action_id}
            ?disabled=${re.locked}
          >
            백업 후 새로 시작
          </button>`:""}${re.can_recheck?l`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${re.action_id}
            ?disabled=${re.locked}
          >
            다시 확인
          </button>`:""}`:"",Re=re?l`<div class="worker-mini__stale">
        <strong>${re.title}</strong>
        <span>${re.summary}</span>
        <span>${re.cause}</span>
        ${re.can_backup_fresh?l`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",ke=e.revise_action?l`<button
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
        </div>`:"",ae=Fr(e.dependency_chips,{lane:e.lane}),$e=ys(e),j=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ye?.operation||e.revise_action||re);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">
            ${g}${k}${M}${U}
          </div>
          <div class="worker-mini__row2">
            ${N}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Gt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${vs(e.work_ms)}</span
                >`:""}${D}${B}
            <span class="worker-mini__actions"
              >${T}${L}${Q}${he}</span
            >
            ${qr(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${d}${p}${g}${k}${A}${M}${V}${Y}${D}${f}${P}
            </div>
            <div class="worker-mini__body">${U}${Re}</div>
            ${ae}${ie}${j?l`<div class="worker-mini__foot">
                  ${N}${B}
                  <span class="worker-mini__actions"
                    >${T}${L}${Q}${he}${ke}${Z}</span
                  >
                  ${ys(e)}
                </div>`:""}
            ${qr(e)}`:l`<div class="worker-mini__line">
              ${d}${p}${g}${k}${A}${M}${U}${V}${Y}${D}${f}${P}${N}${B}${T}${L}${Q}${he}
            </div>
            ${ae}${ie}${$e} ${qr(e)}`}
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
  </section>`}var Zu={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Qu={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Xu(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function mi(e){for(let t of Xu(e))if(Object.hasOwn(Zu,t))return Zu[t];return null}function gi(e){let t=null;for(let n of Xu(e))Object.hasOwn(Qu,n)&&(t=Qu[n]);return t}function Uo(e){let t=mi(e),n=gi(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Ju(e,t){let n=mi(e)??mi(t),r=gi(t)??gi(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var ed=160;function qg(e){return e.length>ed?`${e.slice(0,ed)}\u2026`:e}function Fg(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${qg(e.command)}</code>`:""}
  </div>`}function jg(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Bg(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function td(e){let t=e.failure?Uo(e.failure.reason):"";return l`<div class="worker-banners">
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
          ${Fg(e.failure.cause_detail)}
          ${jg(e.failure.reason)}
          ${ys({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Ug(e){return e?l`${e.repo?l`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?l`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}var Wg=new Set(["codex-runner"]);function zg(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(g=>g&&!(typeof g.agent_type=="string"&&Wg.has(g.agent_type))),c=i.filter(g=>g&&g.state==="live"),d=i.filter(g=>g&&g.state!=="live"),p=Fr(e.dependency_chips,{lane:"running"}),f=r?sn(r.updated_at,t):"";return l`${o?l`<div class="rtile__activity${n?" is-paused":""}">
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
      </div>`:""}${p}`}function hi(e,t,n=null,r={}){let s=e.kind==="session",o=e.failed===!0,a=!!e.paused,i=o?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Bg(t-e.started_at):"\u2014",c=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=Jr(e),p=Bt(e.usage),f=Ln(e.usage),g=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,k=e.base_exception||null,A=e.landing,M=e.attempt_id&&e.attempt_id===n,U=r.monitor||null,V=Ug(U),Y=zg(U,t,a,s?{updated_at:e.updated_at??null}:null),D=s&&e.workflow?.chips?.exec_receipt||null,P=D?l`<div class="rtile__meta">
        <span
          class="ctl-chip ctl-chip--exec-receipt"
          title=${`exec_receipt ${Tn(D)}`}
          >${`${D.kind}:${oo(D)}`}</span
        >
      </div>`:"",N=s?"":qr(e),B=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${M?" rtile--sel":""}${a?" rtile--paused":""}${o?" rtile--failed":""}${s?" rtile--session":""}"
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
              ${B}
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
              ${B}`}
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
    ${s?P:c||p.length>0||f||g||k?l`<div class="rtile__meta">
            ${g?l`<span class="worker-mini__badge">${g}</span>`:""}
            ${k?l`<span
                  class="worker-mini__badge"
                  title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                  >${k}</span
                >`:""}
            ${Bo(e.exec_chips)}
            ${p.length>0?p.map(T=>l`<span class="worker-usage" title=${T.tooltip}
                      >${T.label}</span
                    >`):f?l`<span
                    class="worker-usage"
                    title=${ns(e.usage)}
                    >${f}</span
                  >`:""}
          </div>`:""}
    ${N} ${ys(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${o||a?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function bi(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>hi(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var yi=new Set(["unavailable","not_applicable"]);function Gn(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function nd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Vn(e,t){return t===null?null:`${zn[e]}: ${t.display} (${Io[t.source]})`}function vi(e){return e.filter(t=>t!==null).join(`
`)}function Wo(e){if(typeof e!="object"||e===null)return null;let t=ir(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:vi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(zn.orchestration_model,e.model),n(zn.orchestration_effort,e.effort),n(zn.orchestration_speed,e.speed)])}}function dr(e,t){let n=Gn(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Gn(e,"orchestration_effort"),s=Gn(e,"orchestration_speed"),o=nd([vn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:vi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Vn("orchestration_model",n),Vn("orchestration_effort",r),Vn("orchestration_speed",s)])}}function Hg(e,t){return e===null||e.value===null||yi.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Gg(e){return e===null||yi.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Vg(e){return e===null?null:e.value==="auto"?"auto":yi.has(e.resolution)?null:e.display}function Kn(e,t){if(typeof e!="object"||e===null)return null;let n=Gn(e,"impl_dispatch"),r=Gn(e,"impl_runtime"),s=Gn(e,"impl_model"),o=Gn(e,"impl_effort"),a=Gn(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":nd([Hg(r,t??null),Gg(s),Vg(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:vi(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Vn("impl_dispatch",n),Vn("impl_runtime",r),Vn("impl_model",s),Vn("impl_effort",o),Vn("impl_speed",a)])}}var tn="",Kg=["impl_runtime","impl_model","impl_effort"],Yg=5,zo=1;function Nn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ho(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(O=>de(O,"error",4e3)),o={},a={},i=[],c=!1,d=null,p={},f="",g="",k=!1,A=!1,M=!1,U=null,V=!1;function Y(){let O=t.queue?t.queue():null;return Nn(O)?O:null}function D(){let O=Y();return O?O.runner_catalog:null}function P(){let O=Y();return O&&Nn(O.execution_defaults)?O.execution_defaults:null}function N(){let O=t.implPresetStore?.get();return Nn(O)&&Array.isArray(O.presets)?O:null}function B(){return r===null?{}:{root_dir:r}}async function T(O,H){return V||!n?null:await n(O,H)}function L(O){O&&Nn(O.queue)&&t.onQueueAdopt?.(O.queue)}async function Q(O,H){let J=Y();if(!J||V)return null;let X=await T(O,{...H,...B(),expected_revision:J.revision});if(L(X),r!==null&&X&&X.conflict){let Oe=X.queue&&typeof X.queue.revision=="number"?X.queue.revision:Y()?.revision??J.revision;X=await T(O,{...H,...B(),expected_revision:Oe}),L(X)}return X}async function ye(){c=!0,ve();try{let O=await T("get-session-defaults",{...B()});o=Nn(O?.values)?{...O.values}:{},a={...o},i=Array.isArray(O?.warnings)?O.warnings:[]}catch(O){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${O instanceof Error?O.message:String(O)}`)}finally{c=!1,ve()}}async function he(){let O=wu(o,a);if(Object.keys(O).length!==0){try{let H=await T("set-session-defaults",{values:O,...B()});o=Nn(H?.values)?{...H.values}:{},a={...o},i=Array.isArray(H?.warnings)?H.warnings:[]}catch(H){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}ve()}}function re(O,H){if(Kg.includes(O)){ke(O,H);return}H===tn?delete a[O]:a[O]=H,ve(),he()}function Z(){let O=Ye().orchestration_model,H=en({global:{orchestration_model:O??void 0},execution_defaults:P(),runner_catalog:D()}).orchestration_model.value;return H?vn(D(),H):null}function Re(O,H){typeof H=="string"&&H.length>0?a[O]=H:delete a[O]}function ke(O,H){let J=H===tn?void 0:H,X=yu({impl_runtime:O==="impl_runtime"?J:a.impl_runtime,impl_model:O==="impl_model"?J:a.impl_model,impl_effort:O==="impl_effort"?J:a.impl_effort},D(),Z());Re("impl_runtime",X.impl_runtime),Re("impl_model",X.impl_model),Re("impl_effort",X.impl_effort),ve(),he()}async function ie(){let O=Y();if(!O)return;let H={orchestration_model:O.orchestration_model??null,orchestration_effort:O.orchestration_effort??null,orchestration_speed:O.orchestration_speed??null},J=ku(H,{...H,...p});if(Object.keys(J).length!==0){try{let X=await Q("worker-queue-set-orchestration-defaults",{values:J});if(X&&X.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}p={}}catch(X){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}ve()}}function ae(O,H){p[O]=H===tn?null:H,ve(),ie()}function $e(O){if(d=O,!O){ve();return}let H=D(),J=Ye(),X=J.orchestration_model;X&&!hs(H,O).includes(X)&&(p.orchestration_model=null,X=null);let Oe=J.orchestration_effort;Oe&&!ii(H,O,X||ln).includes(Oe)&&(p.orchestration_effort=null),ve(),ie()}async function j(O){if(!(!Y()||O<zo)){try{await Q("worker-queue-set-slots",{slots:O})}catch(H){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}ve()}}async function ee(O){if(!(!Y()||O<zo||O>Yg)){try{await Q("worker-queue-set-serial-lane-count",{count:O})}catch(H){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}ve()}}async function le(O,H){let J=O==="auto_advance"?"worker-automation-toggle":O==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await Q(J,{on:H})}catch(X){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}ve()}function xe(){let O={},H=Ye();for(let J of To){let X=Dn.includes(J)?H[J]:a[J];typeof X=="string"&&X.length>0&&(O[J]=X)}return O}async function Ae(){let O=N();if(!O)return;let H=xe();if(Object.keys(H).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let J=(O.presets||[]).find(Oe=>Oe.id===f),X=g.trim()||(J?J.name:"");if(!X){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Oe=J?await T("impl-preset-update",{expected_revision:O.revision,id:J.id,name:X,settings:H}):await T("impl-preset-create",{expected_revision:O.revision,name:X,settings:H});if(Oe&&Oe.applied){if(g="",!J&&Array.isArray(Oe.presets)){let et=Oe.presets.find(ot=>ot.name===X);f=et?et.id:f}ve()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ve()}catch(Oe){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Oe instanceof Error?Oe.message:String(Oe)}`)}}async function Pe(){let O=N();if(!(!O||f.length===0))try{let H=await T("impl-preset-delete",{expected_revision:O.revision,id:f});H&&H.applied?(f="",ve()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ve())}catch(H){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}}function ge(O){o=Nn(O.values)?{...O.values}:{},a={...o},i=Array.isArray(O.warnings)?O.warnings:[],Nn(O.queue)&&(t.onQueueAdopt?.(O.queue),p={})}async function lt(){let O=N(),H=Y();if(!O||!H||f.length===0)return;let J=X=>({preset_id:f,expected_revision:O.revision,expected_queue_revision:X,...B()});try{let X=await T("apply-impl-preset-global",J(H.revision));if(X&&X.applied&&ge(X),r!==null&&X&&X.queue_applied===!1){let Oe=X.queue&&typeof X.queue.revision=="number"?X.queue.revision:Y()?.revision??H.revision;X=await T("apply-impl-preset-global",J(Oe)),X&&X.applied&&ge(X)}X&&X.applied?X.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):X&&X.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(X){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}ve()}async function mt(){A=!0,M=!1,ve();try{let O=await T("get-worker-system-prompt",{});!O||typeof O!="object"||Array.isArray(O)?M=!0:U=O}catch{M=!0}finally{A=!1,ve()}}function R(){if(k=!k,k&&!U){mt();return}ve()}function me(){let O=Pr({loading:A,error:M});if(O)return O;if(!U)return"";let H=Array.isArray(U.variants)?U.variants:[];return l`<div class="settings-dialog__sp-body">
      ${U.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${U.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${H.map(J=>l`<div class="settings-dialog__sp-variant" data-variant=${J.key}>
            <div class="settings-dialog__sp-cond">${J.condition}</div>
            ${Mn(J.label,J.system_prompt)}
          </div>`)}
    </div>`}function we(){return l`<section
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
        aria-expanded=${k?"true":"false"}
        @click=${R}
      >
        ${k?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${k?me():""}
    </section>`}function Le(O,H,J,X,Oe,et,ot){let Xe=Oe[O]??tn,vt=li(O,J,Oe,P(),D(),ot),gt=vt.options.find(ct=>ct.value===Xe),at=Xe===tn?vt.full_value:gt?.full_value;return l`<select
        class=${Xe===tn?"settings-dialog__unset":""}
        data-key=${O}
        aria-label=${H}
        title=${at||""}
        ?disabled=${et===!0||vt.disabled}
        .value=${ur(String(Xe))}
        @change=${ct=>X(O,String(ct.target.value))}
      >
        <option value=${tn} ?selected=${Xe===tn}>
          ${vt.unset_label}
        </option>
        ${vt.options.map(ct=>l`<option
              value=${ct.value}
              title=${ct.full_value||""}
              ?selected=${ct.value===Xe}
            >
              ${ct.label}
            </option>`)}
      </select>
      ${Xe===tn?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Me(O,H,J,X,Oe,et=!1,ot){return l`<div
      class=${`settings-dialog__row${et?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${H}</span>
      <span class="settings-dialog__controls">
        ${Le(O,H,J,X,Oe,et,ot)}
      </span>
    </div>`}function Be(O,H,J,X,Oe){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${H}-on)`}
        ></i>
        ${O}
      </span>
      <span class="settings-dialog__controls">
        ${Le(J,`${O} \uBAA8\uB378`,X,re,a,!1)}
        ${Le(Oe,`${O} effort`,Lo,re,a,!1)}
      </span>
    </div>`}function W(O,H,J,X){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${H}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${X?" is-on":""}`}
          data-automation=${O}
          aria-pressed=${X?"true":"false"}
          aria-label=${H}
          @click=${()=>le(O,!X)}
        >
          ${X?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${J}</span>
      </span>
    </div>`}function K(O,H,J,X){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${H}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${O}>
          <button
            type="button"
            aria-label=${`${H} \uAC10\uC18C`}
            @click=${()=>X(J-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${J}</span>
          <button
            type="button"
            aria-label=${`${H} \uC99D\uAC00`}
            @click=${()=>X(J+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function De(O){return l`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${O.rows.length>0?`\uBCC0\uACBD ${O.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${O.rows.map(H=>l`<div
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
      ${O.ignored_keys.length>0?l`<div class="settings-dialog__preset-diff-note">
            ${O.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Ye(){let O=Y(),H={};for(let J of Dn)H[J]=Object.prototype.hasOwnProperty.call(p,J)?p[J]:O&&typeof O[J]=="string"?O[J]:null;return H}function We(){let O=D(),H=a.impl_runtime,J=a.impl_model,X=N(),Oe=Y(),et=Ye(),ot=hs(O,d),Xe=Dr(O,void 0).filter(Ne=>Ne!==ln),vt=ii(O,d,et.orchestration_model||ln).filter(Ne=>Ne!==ln),gt=f?(X?.presets||[]).find(Ne=>Ne.id===f):null,at=gt?vu(xe(),Nn(gt.settings)?gt.settings:{}):null,ct=Oe&&typeof Oe.slots=="number"?Oe.slots:zo+1,wt=Oe&&typeof Oe.serial_lane_count=="number"?Oe.serial_lane_count:zo,nt=P()?.supported===!0,Ce=li("workflow_mode",ms,a,P(),O);return l`
      ${i.length>0?l`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${nt?"":l`<div
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
                @change=${Ne=>{f=String(Ne.target.value),ve()}}
              >
                <option value="" ?selected=${f===""}>
                  실행 프리셋…
                </option>
                ${(X?.presets||[]).map(Ne=>l`<option
                      value=${Ne.id}
                      ?selected=${Ne.id===f}
                    >
                      ${Ne.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!at||at.rows.length===0}
                @click=${lt}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${f?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${ur(g)}
                @input=${Ne=>{g=String(Ne.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${f?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Ae}
              >
                ${f?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${f.length===0}
                @click=${Pe}
              >
                삭제
              </button>
            </div>
            ${at?De(at):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${ur(d||tn)}
                    @change=${Ne=>{let ht=String(Ne.target.value);$e(ht===tn?null:ht)}}
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
              ${Me("orchestration_model","\uBAA8\uB378",ot,ae,et)}
              ${Me("orchestration_effort","effort",vt,ae,et)}
              ${Me("orchestration_speed","\uC18D\uB3C4",_s,ae,et)}
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
                      @click=${()=>re("workflow_mode",tn)}
                    >
                      ${Ce.unset_label}
                    </button>
                    ${a.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${ms.map(Ne=>l`<button
                          type="button"
                          data-mode=${Ne}
                          aria-pressed=${String(a.workflow_mode===Ne)}
                          @click=${()=>re("workflow_mode",Ne)}
                        >
                          ${Ne}
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
              ${Me("impl_runtime","\uC704\uC784 \uB300\uC0C1",Co,re,a)}
              ${Me("impl_model","\uBAA8\uB378",Dr(O,H),re,a)}
              ${Me("impl_effort","effort",Nr(O,H,J),re,a)}
              ${Me("impl_speed","\uC18D\uB3C4",_s,re,a)}
              ${Me("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Xe,re,a,!1,{...a,...et})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${W("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",Oe?.auto_advance===!0)}
              ${W("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",Oe?.auto_merge===!0)}
              ${W("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",Oe?.auto_repair===!0)}
              ${K("slots","\uB3D9\uC2DC \uC2E4\uD589",ct,Ne=>j(Ne))}
              ${K("serial-lane-count","\uC9C1\uB82C \uB808\uC778",wt,Ne=>ee(Ne))}
            </div>
            ${we()}
          `}
    `}function ve(){V||Ke(We(),e)}return{load(){return p={},ye()},render:ve,sessionDraft:()=>({...a}),destroy(){V=!0,Ke(l``,e)}}}function ks(e){return l`<svg
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
    />`)}function ld(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function cd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Bt(uo(t));let n={};for(let i of Rn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let d=!1;for(let p of Rn){let f=c[p];typeof f=="number"&&Number.isFinite(f)&&(n[p]+=f,r=!0,d=!0)}if(d){o+=1;let p=c.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Ln(n):null}function wn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Br(e,t){let n=wn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Zg(e,t){if(!wn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function Qg(e){if(!wn(e)||!wn(e.execution_defaults)||!wn(e.runner_catalog)||!wn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=en({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=vn(e.runner_catalog,n.orchestration_model.value??""),s=dr(n,e.runner_catalog),o=Kn(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function ud(e,t){let n=t.notify||(j=>de(j,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let c=document.createElement("div");c.className="mon2-deck__panel-body",s.append(o,c),e.appendChild(s);let d=null,p=null,f=null,g=new Map;function k(){let j=t.workspacesState?t.workspacesState():[];return Array.isArray(j)?j.filter(ee=>wn(ee)):[]}function A(j){return k().find(ee=>ee.root_dir===j)||null}function M(j){return Zg(A(j),g.get(j))}function U(){for(let j of k()){let ee=g.get(j.root_dir);ee&&typeof ee.revision=="number"&&typeof j.revision=="number"&&j.revision>=ee.revision&&g.delete(j.root_dir)}}async function V(j,ee,le){let xe=t.transport,Ae=M(ee);if(!(!xe||!wn(Ae))){try{let Pe=await xe(j,{...le,root_dir:ee,expected_revision:Ae.revision});if(wn(Pe?.queue)&&g.set(ee,Pe.queue),Pe&&Pe.conflict){let ge=wn(Pe.queue)&&typeof Pe.queue.revision=="number"?Pe.queue.revision:M(ee)?.revision;Pe=await xe(j,{...le,root_dir:ee,expected_revision:ge}),wn(Pe?.queue)&&g.set(ee,Pe.queue)}}catch(Pe){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Pe instanceof Error?Pe.message:String(Pe)}`)}ie()}}function Y(j){d!==j&&(d=j,t.onFocusChange?.(d),ie())}function D(j){Y(d===j?null:j)}function P(j){if(p===j){B();return}N(),p=j;let ee=A(j);a.textContent=`${ee?.name||j} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,f=Ho(c,{root_dir:j,queue:()=>M(j),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:le=>{g.set(j,le),ie()}}),f.load(),ie()}function N(){f?.destroy(),f=null}function B(j){N(),p=null,s.hidden=!0,a.textContent="",j!==!0&&ie()}let T=()=>B();i.addEventListener("click",T);function L(j){j.key==="Escape"&&d!==null&&Y(null)}document.addEventListener("keydown",L);function Q(j,ee){let le=Math.max(ee,j,1);return l`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ee}\uAC1C \uC911 ${j}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:le},(xe,Ae)=>Ae<j?l`<i class="mon2-deck__slot is-run"></i>`:l`<i class="mon2-deck__slot"></i>`)}
    </span>`}function ye(j){let ee=j.auto_advance===!0,le=j.auto_merge===!0;return l`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ee?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ee?"true":"false"}
        aria-label=${`${j.name} \uC790\uB3D9\uD654`}
        title=${ee?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ee?sd():rd()}
        <span class="mon2-deck__op-label">자동화</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${le?" is-on":""}`}
        data-act="merge"
        aria-pressed=${le?"true":"false"}
        aria-label=${`${j.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${le?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${od()}
        <span class="mon2-deck__op-label">머지</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${p===j.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${p===j.root_dir?"true":"false"}
        aria-label=${`${j.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${id()}
      </button>`}function he(j){let ee=Qg(j);return ee?l`<div class="mon2-deck__chips">
      ${ee.orchestration?l`<span class="mon2-deck__chip" title=${ee.orchestration.title}
            >오케 ${ee.orchestration.text}</span
          >`:""}
      ${ee.worker?l`<span class="mon2-deck__chip" title=${ee.worker.title}
            >워커 ${ee.worker.text}</span
          >`:""}
    </div>`:""}function re(j){let ee=Br(j,"running"),le=typeof j.slots=="number"?j.slots:1;return l`<div
      class=${`mon2-deck__tile${d===j.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${j.root_dir}
      aria-pressed=${d===j.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${j.root_dir}>${j.name}</span>
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
        ${ad()} ${Q(ee,le)}
        <span class="mon2-deck__counts"
          >${ee}/${le} 실행 · 대기 ${Br(j,"queue")} · PR
          ${Br(j,"pr_wait")}${Br(j,"session_active")>0?` \xB7 \uC138\uC158 ${Br(j,"session_active")}`:""}</span
        >
      </div>
      <div class="mon2-deck__ops">${ye(j)}</div>
      ${he(j)}
    </div>`}function Z(j){let ee=t.doneItems?t.doneItems():[],le=t.rangeLabel?t.rangeLabel():"",xe=cd(Array.isArray(ee)?ee:[]),Ae=Pe=>j.reduce((ge,lt)=>ge+Br(lt,Pe),0);return l`<div
      class="mon2-deck__total"
      title=${`visible \uB808\uD3EC ${j.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${le}`}
    >
      <div class="mon2-deck__total-counts">
        실행 ${Ae("running")} · 대기 ${Ae("queue")} · PR
        ${Ae("pr_wait")}${Ae("session_active")>0?` \xB7 \uC138\uC158 ${Ae("session_active")}`:""}
        · ${le} 완료
        ${Array.isArray(ee)?ee.length:0}
      </div>
      ${xe===null?"":l`<div class="mon2-deck__total-tokens">
            ${typeof xe=="string"?l`<span
                  class="mon2-deck__tok"
                  title=${ld(le)}
                  >τ ${xe}</span
                >`:xe.map(Pe=>l`<span
                      class="mon2-deck__tok"
                      data-provider=${Pe.provider}
                      title=${Pe.tooltip}
                      >τ ${Pe.label}</span
                    >`)}
          </div>`}
    </div>`}function Re(){let j=k();return j.length===0?"":l`<div class="mon2-deck__row">
      ${Z(j)}
      <div class="mon2-deck__strip">
        ${j.map(ee=>re(ee))}
      </div>
    </div>`}function ke(){d!==null&&!A(d)&&(d=null,t.onFocusChange?.(null))}function ie(){U(),ke(),p!==null&&!A(p)&&B(!0),Ke(Re(),r),f?.render()}function ae(j){let ee=j.target;if(!ee||typeof ee.closest!="function")return;let le=ee.closest("[data-root-dir]");if(!le)return;let xe=le.getAttribute("data-root-dir")||"",Ae=ee.closest("[data-act]")?.getAttribute("data-act");if(Ae==="worker"){t.gotoWorkerTab?.(xe);return}if(Ae==="auto"){V("worker-automation-toggle",xe,{on:M(xe)?.auto_advance!==!0});return}if(Ae==="merge"){V("worker-merge-auto-toggle",xe,{on:M(xe)?.auto_merge!==!0});return}if(Ae==="gear"){P(xe);return}D(xe)}function $e(j){if(j.key!=="Enter"&&j.key!==" ")return;let ee=j.target;if(!ee||typeof ee.closest!="function")return;let le=ee.closest('[data-root-dir][role="button"]');!le||le!==ee||(j.preventDefault(),D(le.getAttribute("data-root-dir")||""))}return r.addEventListener("click",ae),r.addEventListener("keydown",$e),{render:ie,focusRoot:()=>d,panelRoot:()=>p,destroy(){document.removeEventListener("keydown",L),r.removeEventListener("click",ae),r.removeEventListener("keydown",$e),i.removeEventListener("click",T),N(),Ke(l``,r),e.replaceChildren()}}}var Xg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Jg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694";function wi(e,t){return`${e}\0${t}`}function eh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function th(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function nh(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function rh(e,t){let n=new Set(t),r=new Map,s=new Map;for(let i of n){let c=Array.from(new Set((e.get(i)||[]).filter(d=>d!==i&&n.has(d))));r.set(i,c.length);for(let d of c){let p=s.get(d);p?p.push(i):s.set(d,[i])}}let o=[],a=Array.from(n).filter(i=>r.get(i)===0).sort();for(;a.length>0;){let i=a.shift();o.push(i);for(let c of(s.get(i)||[]).slice().sort()){let d=(r.get(c)||0)-1;r.set(c,d),d===0&&a.push(c)}}for(let i of t)o.includes(i)||o.push(i);return o}function sh(e,t){let n=new Set;for(let[a,i]of t)for(let c of i)n.add(wi(a,c));let r=new Map,s=new Map;for(let a of e){let i=wi(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=wi(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function oh(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function ah(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ki(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function dd(e,t,n){let r=th(n.blocked_by_map),s=[],o=null,a=k=>{let A=n.owner_of.get(k);return typeof A!="string"||A.length===0?(o=eh(k),null):A},i=(k,A)=>{if(o!==null||k===A)return;let M=r.get(k)||[];if(!M.includes(A))return;let U=a(k);U!==null&&(r.set(k,M.filter(V=>V!==A)),s.push({type:"dep-remove",a:k,b:A,root_dir:U}))},c=(k,A)=>{if(o!==null||k===A)return;let M=r.get(k)||[];if(M.includes(A))return;let U=a(k);if(U!==null){if(nh(r,A,k)){o=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${k}\uAC00 \uC774\uBBF8 ${A}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}r.set(k,[...M,A]),s.push({type:"dep-add",a:k,b:A,root_dir:U})}},d=()=>{let k=n.lane_order.get(e.lane_id||"")||[],A=new Set(k),M=(r.get(e.bead_id)||[]).filter(V=>A.has(V)),U=k.filter(V=>(r.get(V)||[]).includes(e.bead_id));for(let V of M)i(e.bead_id,V);for(let V of U)i(V,e.bead_id);for(let V of M)for(let Y of U)c(Y,V);return k.filter(V=>V!==e.bead_id)},p=(k,A)=>{let M=n.lane_order.get(k)||[],U=M.indexOf(e.bead_id),V=rh(r,M.filter(N=>N!==e.bead_id)),Y=k.startsWith("pending:")?V.length:Math.max(0,Math.min(V.length,U>=0&&A>U?A-1:A)),D=Y>0?V[Y-1]:null,P=Y<V.length?V[Y]:null;if(D===null){P!==null&&c(P,e.bead_id);return}c(e.bead_id,D),P!==null&&(r.get(P)||[]).includes(D)&&(i(P,D),c(P,e.bead_id))},f=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Xg};if(t.kind==="chain"&&e.kind==="repo-serial")return{refused:Jg};if(e.kind==="chain"&&d(),t.kind==="chain"&&p(t.lane_id,t.marker_index),o!==null)return{refused:o};let g=[];if(t.kind==="candidate")e.kind!=="candidate"&&g.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=oh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")g.push(ki(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let A=n.parallel_rows,M=A[Math.max(0,Math.min(A.length,t.marker_index))];if(!(!!M&&M.bead_id===e.bead_id)&&ah(n,e.root_dir)&&f!==void 0){let V=f>k?k:k-1;V>=0&&V!==f&&g.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:V},root_dir:e.root_dir})}}}else if(t.kind==="chain")e.kind==="candidate"&&g.push(ki(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0));else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(f!==void 0&&t.index!==f){let k=f>t.index?t.index:t.index-1;k>=0&&k!==f&&g.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else g.push(ki(e.bead_id,e.root_dir,t.index,t.lane_id));return{ops:[...sh(s,n.blocked_by_map),...g]}}var pd={running:3,paused:2,failed:1};function fd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let p=t.get(a.bead_id),f=typeof p=="number"&&p>0&&typeof a.finished_at=="number"&&p>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!f&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let p=pd[d.run_state],f=pd[i];if(p>f||p===f&&(d.started_at??0)>(c??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:c})}return{winners:o,resumed_from_ids:r}}function Go(e){return e.replace(/\/+$/,"")}function ih(e,t){let n=Go(e),r=Go(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Vo(e,t){let n=new Set;for(let r of e)for(let s of t){if(!ih(r,s))continue;let o=Go(r),a=Go(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}var _d=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],$s=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ko(e,t){let n=_d.find(s=>s.step===e);if(!n)return null;let r=_d.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function md(e){let t=$s.findIndex(n=>n.step===e);return $s.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function pr(e){let t=$s.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function lh(e){let t=$s.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:$s.length}}function Yo(e){let t=lh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var xi=new Set(["queued","running","retry_pending","repairing"]),gd=new Set(["failed","succeeded"]),ch={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},xs={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},uh={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:xs.base_containment,child_sweep:xs.child_sweep,branch_cleanup:xs.branch_cleanup,parent_close:xs.parent_close};function dh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function ph(e,t,n){return!["verify","deploy"].includes(e.kind)||![...xi,...gd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function fh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=d=>d.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function $i(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=ch[s];if(!o)return null;let a=Ko(n,`${r} ${o}`);return a?{...a,active:xi.has(s),failed:s==="failed"}:null}function _h(e){return!e||typeof e!="object"?null:uh[e.step]||null}function As(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=_h(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=dh(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(A=>A&&typeof A=="object"&&ph(A,t,i)).sort(fh):[],d=a?c:[],p=d.find(A=>xi.has(A.state));if(p)return $i(p);if(s)return s.step==="repo_operations"&&c[0]?$i(c[0],!0):null;let f=d.find(A=>gd.has(A.state)?A.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return $i(f);if(r){let A=Ko(r.step,r.label);return A?{...A,active:!0,failed:!1}:null}let g=typeof e.cleanup_cursor=="string"?xs[e.cleanup_cursor]:null;if(!g)return null;let k=Ko(g.step,g.label);return k?{...k,active:!0,failed:!1}:null}function Zo(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function Ai(e,t){return`${e}\0${t}`}function hd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Si(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function mh(e,t){return e==="internal"&&t===void 0}function Ur(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function bd(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Ur(s)})`,location_label:Ur(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Si(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:mh(a,s)}}function yd(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=Ai(i.root_dir,c.id);n.set(d,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(d,[]);for(let p of Array.isArray(c.items)?c.items:[])r.set(p.id,d)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=Ai(i.root_dir,c.id),p=Array.isArray(c.items)?c.items[0]:null,g=!!p&&p.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],k=s.get(d);if(k)for(let A of g){let M=r.get(A);M&&M!==d&&!k.includes(M)&&k.push(M)}}let o=(i,c)=>{let d=new Set,p=[i];for(;p.length>0;){let f=p.pop();if(f===c)return!0;!f||d.has(f)||(d.add(f),p.push(...s.get(f)||[]))}return!1},a=new Map;for(let[i,c]of s){let d=[];for(let p of c){let f=n.get(p);o(p,i)&&f&&d.push(f)}d.length>0&&a.set(i,d)}return a}function vd(e,t){return Ai(e,t)}var wd=1,Ss=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Ti=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Wr={show_blocked:!0,spec:"all"},kd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function gh(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function hh(e,t){let{winners:n,resumed_from_ids:r}=fd(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,c=a.run_state,d=a.started_at,p=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:c,started_at:d,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:dn(e,i.bead_id),can_pause:c==="running"&&p,can_resume:c!=="running"&&p&&!r.has(i.attempt_id)})}return s}function $d(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function At(e){return e&&typeof e=="object"?e:{}}function bh(e,t,n){let r=At(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=g=>en({pin:g,global:a,execution_defaults:s,runner_catalog:o,route:n}),c,d;try{c=i(r),d=i(null)}catch{return null}let p=xd(dr(c,o),dr(d,o)),f=xd(Kn(c,null),Kn(d,null));return p||f?{orchestration:p,worker:f}:null}function xd(e,t){return!e||t&&t.text===e.text?null:e}function yh(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function vh(e,t){let n=t.get(e);return n?{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${Ur(n)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`}:null}function wh(e,t,n){let r=new Map;for(let c of e)r.set(c,Array.from(n.get(c)||[]).filter(d=>e.includes(d)).length);let s=[],o=new Map,a=e.filter(c=>(r.get(c)||0)===0).sort();for(let c of a)o.set(c,0);let i=[...a];for(;i.length>0;){let c=i.shift();s.push(c);let d=Array.from(t.get(c)||[]).filter(f=>e.includes(f)).sort(),p=(o.get(c)||0)+(d.length>1?1:0);for(let f of d){let g=(r.get(f)||0)-1;r.set(f,g);let k=o.get(f);o.set(f,k===void 0?p:Math.min(k,p)),g===0&&i.push(f)}}return{order:s,indent:o,cycle:s.length!==e.length}}function kh(e,t,n){let r=new Map,s=new Map,o=new Set,a=(p,f,g)=>{let k=p.get(f);k?k.add(g):p.set(f,new Set([g]))},i=p=>t.get(p)?.lane==="done";for(let[p,f]of e)if(!i(p))for(let g of f)g===p||i(g)||(o.add(g),o.add(p),a(r,g,p),a(s,p,g));let c=new Set,d=[];for(let p of Array.from(o).sort()){if(c.has(p))continue;let f=[],g=[p];for(c.add(p);g.length>0;){let D=g.pop();f.push(D);for(let P of[...r.get(D)||[],...s.get(D)||[]])c.has(P)||(c.add(P),g.push(P))}if(f.length<2)continue;let k=f.map(D=>t.get(D));if(k.every(D=>!!D&&/^s[1-5]$/.test(D.lane||""))&&k.every(D=>D&&k[0]&&D.root_dir===k[0].root_dir&&D.lane===k[0].lane))continue;let{order:M,indent:U,cycle:V}=wh(f.slice().sort(),r,s),Y=V?f.slice().sort():M;d.push({key:f.slice().sort().join("\0"),cycle:V,nodes:Y.map(D=>{let P=t.get(D);return{id:D,workspace_name:P?P.workspace_name:"",root_dir:P?P.root_dir:"",location_label:P?Ur(P):Ad(D,n),indent:V?0:U.get(D)||0}})})}return d}function Ad(e,t){let n=Si(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Sd(e,t,n){let r=t.get(e);if(!r)return Ad(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Ur(r)}function $h(e,t,n){let r=[];for(let s of n.get(e)||[])s!==e&&t.has(s)&&!r.includes(s)&&r.push(s);return r}function xh(e,t,n,r,s,o,a){let i=(f,g,k,A,M=!1)=>{let U=r.get(f),V=U&&U.lane==="parallel"&&typeof U.position=="number"?U.position-1:null;return{id:f,title:o.get(f)||f,workflow:a.get(f)||null,root_dir:U?U.root_dir:"",workspace_name:U?U.workspace_name:"",seq:g,indent:k,predecessors:A,location_label:Sd(f,r,s),draggable:!M&&V!==null,...V!==null?{queue_index:V}:{}}},c=[];for(let f of e.slice().sort((g,k)=>g.key<k.key?-1:1)){let g=new Set(f.nodes.map(k=>k.id));c.push({lane_id:`chain:${f.key}`,label:"",pending:!1,cycle:f.cycle,rows:f.nodes.map((k,A)=>i(k.id,A+1,f.cycle?0:k.indent,f.cycle?[]:$h(k.id,g,n),f.cycle))})}let d=new Set;for(let f of c)for(let g of f.rows)d.add(g.id);let p=[];return t.forEach((f,g)=>{let k=f&&typeof f.seed=="string"&&f.seed.length>0?f.seed:null;k!==null&&d.has(k)||(p.push(g),c.push({lane_id:`pending:${g}`,label:"",pending:!0,cycle:!1,rows:k===null?[]:[i(k,1,0,[])]}))}),c.forEach((f,g)=>{f.label=`\uC5F0\uACB0 ${g+1} \xB7 \uB808\uD3EC \uAC04`}),{chain_lanes:c,pending_lanes_kept:p}}function Ah(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Sh(e,t,n,r,s){let o=new Map;for(let i of[...e.running,...e.queue,...e.runnable]){if(!t.has(i.root_dir))continue;let{scope:c,state:d}=Ah(i,t,n);if(d!==void 0&&(i.scope_state=d),c.length===0)continue;let p=o.get(i.root_dir);p?p.push({item:i,scope:c}):o.set(i.root_dir,[{item:i,scope:c}])}let a=(i,c,d)=>{let p={id:c.id,title:c.title,location_label:Sd(c.id,r,s),prefixes:d};i.overlap_chips?i.overlap_chips.push(p):i.overlap_chips=[p]};for(let i of o.values())for(let c=0;c<i.length;c+=1)for(let d=c+1;d<i.length;d+=1){let p=Vo(i[c].scope,i[d].scope);p.length!==0&&(a(i[c].item,i[d].item,p),a(i[d].item,i[c].item,p))}}function Ei(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Qo(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ci(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...Wr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Ss.some(R=>R.value===n.candidate_sort)?n.candidate_sort:"repo_spec",c=new Map;for(let R of s)R&&typeof R.root_dir=="string"&&c.set(R.root_dir,R);let d=[],p=[],f=[],g=[],k=[],A=[],M=new Map,U=new Map,V=new Map,Y=new Map,D=new Map,P=new Map,N=new Map,B=new Map,T=new Map;for(let R of r){if(!R||typeof R.root_dir!="string")continue;let me=R.root_dir,we=R.name||me,Le=c.get(me),Me=Le&&typeof Le.revision=="number"?Le.revision:typeof R.revision=="number"?R.revision:0,Be=At(R.attempts),W=At(R.bead_titles);for(let[w,S]of Object.entries(W))typeof S=="string"&&S.length>0&&B.set(w,S);let K=At(R.bead_times),De=At(R.pr_observations),Ye=At(R.admission),We=At(R.revise_parked),ve=At(R.merge_queue_state),O=At(R.cleanup_failed),H=At(R.discard_operations),J=At(R.bead_blocked_by);Object.hasOwn(R,"bead_scope")&&P.set(me,At(R.bead_scope));let X=At(R.bead_workflow);for(let[w,S]of Object.entries(X))S&&typeof S=="object"&&T.set(w,S);let Oe=At(R.pr_activity),et=Array.isArray(R.repo_operations)?R.repo_operations:[],ot=Array.isArray(R.merge_queue)?R.merge_queue:[],Xe=new Set(ot.filter(w=>w&&typeof w.bead_id=="string").map(w=>w.bead_id)),vt=new Map(ot.filter(w=>w&&typeof w.bead_id=="string").map(w=>[w.bead_id,w])),gt=Array.isArray(R.queue)?R.queue:[],at=(Array.isArray(R.serial_lanes)?R.serial_lanes:[]).filter(w=>w&&/^s[1-5]$/.test(w.id)&&Array.isArray(w.entries)),ct=At(R.lane_states),wt=typeof R.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(R.serial_lane_count))):Math.min(5,at.length);V.set(me,wt),Y.set(me,gt.length);let nt=new Map(at.map(w=>[w.id,w])),Ce=new Map;for(let w of at)for(let S of w.entries)S&&typeof S.bead_id=="string"&&Ce.set(S.bead_id,w.id);for(let[w,S]of Object.entries(J))Array.isArray(S)&&D.set(w,S.filter(z=>typeof z=="string"&&z.length>0));let Ne=Array.isArray(R.done)?R.done:[];for(let w of Ne)w&&typeof w.bead_id=="string"&&A.push({id:w.bead_id,root_dir:me,workspace_name:we});let ht=new Map;for(let w of Ne)w&&typeof w.bead_id=="string"&&typeof w.added_at=="number"&&ht.set(w.bead_id,w.added_at);let pt=w=>({id:w,title:W[w]||w,root_dir:me,workspace_name:we,expected_revision:Me,draggable:!1,...At(K[w]).created_at?{created_at:At(K[w]).created_at}:{},...At(K[w]).updated_at?{updated_at:At(K[w]).updated_at}:{}}),G=new Set;for(let[w,S]of hh(Be,ht))G.add(w),p.push({...pt(w),lane:"running",...Ce.has(w)?{serial_lane_id:Ce.get(w)}:{},attempt_id:S.attempt_id,run_state:S.run_state,status:S.status||void 0,workflow:X[w]||null,can_pause:S.can_pause,can_resume:S.can_resume,started_at:S.started_at,last_event_at:S.last_event_at,last_activity:S.last_activity,legs:S.legs,runner:S.runner,model:S.model,effort:S.effort,speed:S.speed,resumed_from:S.resumed_from,continuation_mode:S.continuation_mode,usage:S.usage,exec_chips:{orchestration:Wo(S),worker:null},discard:Sn(H,w,{attempt_id:S.attempt_id}),badges:S.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:S.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:S.run_state==="failed"});for(let w of Array.isArray(R.session_active)?R.session_active:[]){let S=w&&w.bead_id;typeof S!="string"||G.has(S)||(G.add(S),Array.isArray(w.blocked_by)&&w.blocked_by.length>0&&D.set(S,w.blocked_by.filter(z=>typeof z=="string"&&z.length>0)),typeof w.title=="string"&&w.title.length>0&&B.set(S,w.title),w.workflow&&typeof w.workflow=="object"&&T.set(S,w.workflow),p.push({...pt(S),title:w.title||W[S]||S,lane:"running",kind:"session",status:"in_progress",started_at:Ei(w.started_at)??Ei(w.updated_at)??void 0,updated_at:Ei(w.updated_at)??void 0,workflow:w.workflow||null,labels:Array.isArray(w.labels)?w.labels:[],spec_id:typeof w.spec_id=="string"?w.spec_id:"",blocked:w.blocked===!0,...Array.isArray(w.blocked_by)?{blocked_by:w.blocked_by.filter(z=>typeof z=="string"&&z.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,badges:[],alert:!1}))}for(let w of Array.isArray(R.pr_wait)?R.pr_wait:[]){let S=w&&w.bead_id;if(typeof S!="string"||G.has(S))continue;G.add(S);let z=At(De[S]),ue=At(z.pr),oe=z.gate?At(z.gate):null,te=Xe.has(S),rt=vt.get(S)?.continuation_action||null,Ze=!!rt&&rt.continuation===null,St=ve.active===S,Qe=w.external===!0,ft=O[S]||null,yt=At(Oe[S]),Ct=As({bead_id:S,merge_sha:w.merge_sha,cleanup_cursor:w.cleanup_cursor,merge_progress:yt.merge_progress||null,cleanup_failed:ft,repo_operations:et}),zt=Zo(Ct),Nt=!!oe&&oe.base_badge==="\uCDA9\uB3CC",Mt=!!ft&&["child_sweep","branch_cleanup","parent_close"].includes(ft.step)&&!!oe&&oe.tier==="merged",Ft=Qe&&!!ft&&!!oe&&oe.tier==="merged",Lt=!!oe&&["closed_unmerged","review","undecidable"].includes(oe.tier),Ue=Sn(H,S,{external:Qe,merge_active:St||Ct?.step==="merge",merge_queued:te,cleanup_active:zt,merged:!!ft||oe?.tier==="merged"}),Ut=!!Ue.operation;f.push({...pt(S),lane:"pr_wait",workflow:X[S]||null,pr_number:typeof ue.number=="number"?ue.number:null,pr_url:typeof ue.url=="string"?ue.url:void 0,external:Qe,usage:dn(Be,S),merge_step:Ct,badges:Ze?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ct?[oe?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:ft?[pr(ft.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${pr(ft.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof oe?.gate_badge=="string"&&oe.gate_badge.length>0?[oe.gate_badge]:[],alert:Ct?Ct.failed===!0:!!ft||Lt,reason:ft&&Ct?.active!==!0?Yo(ft.step):"PR \uB300\uAE30",merge_action:oe?.tier==="merged"&&!Mt&&!Ft?!1:!te||Ze,merge_enabled:!Ut&&(Ze||oe?.enabled===!0||Nt||Mt||Ft),merge_label:Ze?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ft||Mt?"\uC815\uB9AC \uC7AC\uAC1C":Nt&&!Mt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Ze?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ut?Ue.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ue.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ue.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Ft?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Mt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Nt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":oe?.enabled===!0?`\uBA38\uC9C0 (${oe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${oe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:te&&!Ze,cancel_enabled:!St,continuation_mismatch:rt?.mismatch||null,discard:Ue,discard_action:Ue.action,discard_enabled:Ue.enabled,discard_title:Ue.title})}let pe=(w,S,z,ue)=>{let oe=w&&w.bead_id;if(typeof oe!="string"||G.has(oe))return null;G.add(oe);let te=We[oe],rt=Sn(H,oe),Ze=rt.operation?rt:null,St={...pt(oe),lane:S,workflow:X[oe]||null,draggable:!Ze,discard:Ze||void 0,reason:$d(Ye,oe),seq:z+1,queue_position:z+1,queue_index:z,queue_length:ue,badges:te?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!te,revise_action:!!te,revise_enabled:!!te&&!Ze,revise_title:te?te.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${te.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(J,oe)&&(St.blocked_by=Array.isArray(J[oe])?J[oe].filter(Qe=>typeof Qe=="string"&&Qe.length>0):[]),St};for(let w=0;w<gt.length;w++){let S=pe(gt[w],"queue",w,gt.length);if(!S)continue;g.push(S);let z=M.get(me);z?z.push(S):M.set(me,[S])}let je=w=>{let S=f.find(oe=>oe.id===w&&oe.root_dir===me);if(S)return{id:w,title:S.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let z=p.find(oe=>oe.id===w&&oe.root_dir===me),ue=z&&z.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":z&&z.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:w,title:z?z.title:pt(w).title,badge:ue}},He=[];for(let w=0;w<Math.max(wt,at.length);w++){let S=`s${w+1}`,z=nt.get(S),ue=z&&Array.isArray(z.entries)?z.entries:[],oe=[];for(let Ze=0;Ze<ue.length;Ze++){let St=pe(ue[Ze],S,Ze,ue.length);St&&(oe.push(St),g.push(St))}let te=At(ct[S]),rt=Array.isArray(te.occupied_by)?te.occupied_by.filter(Ze=>typeof Ze=="string"):[];oe.length===0&&rt.length===0&&(wt<=1||w>=wt)||He.push({id:S,index:w,items:oe,raw_length:ue.length,occupied_by:rt,occupants:rt.map(Ze=>je(Ze)),corrections:Array.isArray(te.corrections)?te.corrections.length:0,cycle:te.cycle===!0,...oe.length===0&&rt.length===0?{empty:!0}:{}})}U.set(me,He);let E=Array.from({length:wt},(w,S)=>{let z=`s${S+1}`,ue=nt.get(z),oe=ue&&Array.isArray(ue.entries)?ue.entries:[],te=At(ct[z]);return{id:z,index:oe.length,length:oe.length,occupied_by:Array.isArray(te.occupied_by)?te.occupied_by.filter(rt=>typeof rt=="string"):[]}});for(let w of Array.isArray(R.runnable)?R.runnable:[]){let S=w&&w.bead_id;if(typeof S!="string"||G.has(S))continue;G.add(S);let z=w.workflow&&typeof w.workflow=="object"?w.workflow:null,ue=z&&typeof z.route=="string"&&z.route||(typeof w.route=="string"?w.route:null),oe=bh(At(Le),w.exec_pins,ue);Array.isArray(w.blocked_by)&&w.blocked_by.length>0&&D.set(S,w.blocked_by.filter(te=>typeof te=="string"&&te.length>0)),typeof w.title=="string"&&w.title.length>0&&B.set(S,w.title),z&&T.set(S,z),Array.isArray(w.scope)&&N.set(S,w.scope.filter(te=>typeof te=="string"&&te.length>0)),d.push({...pt(S),title:w.title||W[S]||S,lane:"runnable",draggable:!0,reason:$d(Ye,S),created_at:w.created_at??void 0,updated_at:w.updated_at??void 0,status:typeof w.status=="string"?w.status:void 0,labels:Array.isArray(w.labels)?w.labels:[],spec_id:typeof w.spec_id=="string"?w.spec_id:"",workflow:z||(ue?{route:ue,chips:{route:ue}}:null),...oe?{exec_chips:oe}:{},blocked:w.blocked===!0,...Array.isArray(w.blocked_by)?{blocked_by:w.blocked_by.filter(te=>typeof te=="string"&&te.length>0)}:{},place_index:gt.length,place_lanes:E})}for(let w of Ne){let S=w&&w.bead_id;if(typeof S!="string"||G.has(S)||(G.add(S),o!==void 0&&typeof w.added_at=="number"&&w.added_at<o))continue;let z=gh(Be,S),ue=z&&typeof z.done_kind=="string"?z.done_kind:null;k.push({...pt(S),lane:"done",done:!0,done_layout:"three_line",usage:dn(Be,S),work_ms:qo(Be,S),done_at:typeof w.added_at=="number"?w.added_at:void 0,done_kind:ue,badges:ue&&kd[ue]?[kd[ue]]:[]})}}let L=new Map;s.forEach((R,me)=>{R&&typeof R.root_dir=="string"&&L.set(R.root_dir,me)});let Q=n&&n.running_sort==="repo"?"repo":"started";p.sort((R,me)=>{let we=R.kind==="session",Le=me.kind==="session";if(we!==Le)return we?1:-1;if(we&&Le){let W=Qo(me.updated_at)-Qo(R.updated_at);return W!==0?W:R.id.localeCompare(me.id)}if(Q==="repo"){let W=L.get(R.root_dir)??Number.MAX_SAFE_INTEGER,K=L.get(me.root_dir)??Number.MAX_SAFE_INTEGER;if(W!==K)return W-K}let Me=typeof R.started_at=="number"&&Number.isFinite(R.started_at)?R.started_at:null,Be=typeof me.started_at=="number"&&Number.isFinite(me.started_at)?me.started_at:null;return Me!==null&&Be!==null&&Me!==Be?Me-Be:Me===null&&Be!==null?1:Me!==null&&Be===null?-1:R.id.localeCompare(me.id)}),k.sort((R,me)=>(me.done_at??0)-(R.done_at??0));let ye=s.length>0?s:r.map(R=>({root_dir:R&&R.root_dir,name:R&&R.name,auto_advance:R&&R.auto_advance,auto_merge:R&&R.auto_merge,slots:R&&R.slots,revision:R&&R.revision,runner_catalog:R&&R.runner_catalog})),he=new Set(d.map(R=>R.root_dir)),re=[];for(let R of ye){if(!R||typeof R.root_dir!="string")continue;let me=M.get(R.root_dir)||[],we=U.get(R.root_dir)||[];!(me.length>0||we.some(Me=>Me.items.length>0||Me.occupied_by.length>0))&&!he.has(R.root_dir)||re.push({root_dir:R.root_dir,name:R.name||R.root_dir,auto_advance:R.auto_advance===!0,auto_merge:R.auto_merge===!0,slots:typeof R.slots=="number"&&R.slots>=wd?R.slots:wd,revision:typeof R.revision=="number"?R.revision:0,runner_catalog:At(R.runner_catalog),items:me,sublanes:{parallel:me,serial:we},serial_lane_count:V.get(R.root_dir)||0,raw_queue_length:Y.get(R.root_dir)||0})}let Z={runnable:d,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:i==="updated_flat",queue:g,queue_groups:re,running:p,pr_wait:f,done:k,chains:[],parallel_rows:[],chain_lanes:[],parallel_raw_length:Object.fromEntries(Y),owner_of:{},pending_lanes_kept:[]},Re=hd(Z);for(let R of A)Re.has(R.id)||Re.set(R.id,{root_dir:R.root_dir,workspace_name:R.workspace_name,lane:"done",state:"done"});let ke=new Map;for(let[R,me]of D)for(let we of me){let Le=ke.get(we);Le?Le.includes(R)||Le.push(R):ke.set(we,[R])}for(let R of[...Z.queue,...Z.runnable]){if(!Object.hasOwn(R,"blocked_by"))continue;let me=Re.get(R.id);R.blockers=(R.blocked_by||[]).map(we=>bd(we,me,Re,s)),R.blocker_warnings=R.blockers.filter(we=>we.missing_internal).map(we=>`\u26A0 \uC120\uD589 ${we.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),R.blocker_warnings.length>0&&(R.alert=!0)}for(let R of[...Z.queue,...Z.runnable,...Z.running,...Z.pr_wait]){let me=R.lane==="running"||R.lane==="pr_wait"?[]:(R.blockers||[]).map(yh),we=[];for(let Be of ke.get(R.id)||[]){let W=vh(Be,Re);W&&we.push(W)}let Le=R.lane==="running"||R.lane==="pr_wait"?[]:R.blocker_warnings||[];if(me.length===0&&we.length===0&&Le.length===0)continue;let Me={predecessors:me,successors:we,warnings:Le};R.dependency_chips=Me}Sh(Z,P,N,Re,s),Z.chains=kh(D,Re,s);let ie=yd(Z.queue_groups);for(let R of Z.queue_groups)for(let me of R.sublanes.serial){let we=ie.get(vd(R.root_dir,me.id));we&&(me.cross_wait_peers=we)}let ae=xh(Z.chains,Array.isArray(n?.pending_lanes)?n.pending_lanes:[],D,Re,s,B,T);Z.chain_lanes=ae.chain_lanes,Z.pending_lanes_kept=ae.pending_lanes_kept;let $e=new Map;for(let R of[...Z.running,...Z.queue,...Z.runnable])$e.has(R.id)||$e.set(R.id,R);let j=new Set;for(let R of Z.chain_lanes)for(let me of R.rows){j.add(me.id);let we=$e.get(me.id);we&&(we.overlap_chips&&(me.overlap_chips=we.overlap_chips),we.scope_state&&(me.scope_state=we.scope_state))}let ee=[];for(let R of M.values())for(let me of R)j.has(me.id)||ee.push(me);ee.sort((R,me)=>{let we=R.workspace_name.localeCompare(me.workspace_name);return we!==0?we:(R.queue_index??0)-(me.queue_index??0)}),Z.parallel_rows=ee;let le={};for(let[R,me]of Re)typeof me.root_dir=="string"&&me.root_dir.length>0&&(le[R]=me.root_dir);Z.owner_of=le;let xe=Z.runnable.length,Ae=Z.runnable;a.show_blocked||(Ae=Ae.filter(R=>R.blocked!==!0));let Pe=Ae.length;a.spec==="with"?Ae=Ae.filter(R=>!!R.spec_id):a.spec==="without"&&(Ae=Ae.filter(R=>!R.spec_id)),Z.runnable_hidden={blocked:xe-Pe,spec:Pe-Ae.length};let ge=(R,me)=>{let we=Qo(me.updated_at)-Qo(R.updated_at);return we!==0?we:R.id.localeCompare(me.id)},mt=i==="repo_spec"?(R,me)=>{let we=R.spec_id?0:1,Le=me.spec_id?0:1;return we!==Le?we-Le:ge(R,me)}:ge;if(i==="updated_flat")Z.runnable=Ae.slice().sort(ge),Z.runnable_sections=[];else{let R=new Map;for(let Le of Ae){let Me=R.get(Le.root_dir);Me?Me.push(Le):R.set(Le.root_dir,[Le])}let me=[],we=[];for(let Le of ye){if(!Le||typeof Le.root_dir!="string")continue;let Me=(R.get(Le.root_dir)||[]).slice().sort(mt);R.delete(Le.root_dir),Me.length!==0&&(me.push({root_dir:Le.root_dir,name:Le.name||Le.root_dir,items:Me.map(Be=>({...Be,workspace_name:""}))}),we.push(...Me))}for(let[Le,Me]of R){let Be=Me.slice().sort(mt);me.push({root_dir:Le,name:Be[0]?.workspace_name||Le,items:Be.map(W=>({...W,workspace_name:""}))}),we.push(...Be)}Z.runnable=we,Z.runnable_sections=me}return Z}var Ed="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Td(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Cd(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Od="bdui.monitor.done-range",Pd="bdui.monitor.running_sort",Md="bdui.monitor.candidate_sort",Dd="beads-ui.monitor.candidate-filter",Nd="beads-ui.monitor.sections";function Eh(){try{let e=window.localStorage.getItem(Dd);if(!e)return{...Wr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Wr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Wr.show_blocked,spec:Ti.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Wr}}}function Rd(e){try{window.localStorage.setItem(Dd,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Th(){try{let e=window.localStorage.getItem(Md);return Ss.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Ch(e){try{window.localStorage.setItem(Md,e)}catch{}}function Rh(){try{let e=window.localStorage.getItem(Nd);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Ld(e){try{window.localStorage.setItem(Nd,JSON.stringify(e))}catch{}}function Lh(){try{let e=window.localStorage.getItem(Od);return un(e)?e:rn}catch{return rn}}function Ih(e){try{window.localStorage.setItem(Od,e)}catch{}}function Oh(){try{return window.localStorage.getItem(Pd)==="repo"?"repo":"started"}catch{return"started"}}function Ph(e){try{window.localStorage.setItem(Pd,e)}catch{}}var qd="tab:monitor:pipeline",Mh=1e3,Dh=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Id="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Nh(e){return e>=1&&e<=Id.length?Id[e-1]:`(${e})`}function Fd(e,t){let n=Et("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,c=t.router,d=t.now||(()=>Date.now()),p=t.confirm||(b=>typeof globalThis.confirm!="function"||globalThis.confirm(b)),f=Lh(),g=Oh(),k=Eh(),A=Th(),M=Rh(),U=null,V=null,Y=null,D=[],P=null;function N(){let b=jn.find(h=>h.value===f);return b?b.label:""}let B=document.createElement("div");B.className="mon",e.appendChild(B);let T=document.createElement("div");T.className="mon2-drawer",e.appendChild(T);let L=Ci(null,null),Q=new Map,ye=new Map,he=null,re=null,Z=null,Re=Mr(T,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{U=null,Ce()}});async function ke(b,h,x,I,ne=!0){if(!o||!x)return null;let y=await o(b,{...h,root_dir:x,expected_revision:I});if(y&&y.conflict&&ne){y.queue&&ye.set(x,y.queue);let $=y.queue&&typeof y.queue.revision=="number"?y.queue.revision:I;y=await o(b,{...h,root_dir:x,expected_revision:$})}return y&&y.queue&&x&&ye.set(x,y.queue),y}function ie(b,h){let x=ye.get(b),I=s&&s.get?s.get():null,ne=(Array.isArray(I)?I:[]).find($=>$?.root_dir===b);return(x||ne)?.merge_queue?.find($=>$.bead_id===h)?.continuation_action}async function ae(b,h,x,I){let ne=await ke(b,h,x,I),y=ye.get(x)?.revision??ne?.queue?.revision??I;return Cn(ne,($,ce)=>ke(b,{...h,continuation:$,decision_token:ce},x,y,!1),{refresh:$=>ke(b,h,x,$?.queue?.revision??ye.get(x)?.revision??y,!1)})}async function $e(b,h,x,I){let ne=await Cn({continuation_mismatch:I},($,ce)=>ke("worker-merge-queue-add",{bead_id:h,continuation:$,decision_token:ce},b,x,!1)),y=ne?.queue?.merge_queue?.find($=>$.bead_id===h)?.continuation_action;ne?.applied!==!0&&y?.continuation===null&&y.mismatch&&await $e(b,h,ne.queue.revision,y.mismatch)}async function j(b,h,x){let I=await ke("worker-discard",b,h,x);if(I&&I.discarded===!0){de(jo(I),"success",5e3);return}if(I&&I.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${I.reason}`,"error");return}if(I&&I.accepted&&I.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(I&&I.accepted){de(`\uD3D0\uAE30 \uC9C4\uD589: ${I.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}I&&!I.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function ee(b,h,x){return!o||!x?null:await o(b,{...h,root_dir:x})}async function le(){let b=new Map;for(let h of L.pr_wait)b.has(h.root_dir)||b.set(h.root_dir,h.expected_revision);for(let[h,x]of b)await ke("worker-merge-queue-add-all",{},h,x)}function xe(b){let h=M[b];return!!(h&&h.runnable===!0)}function Ae(b){let h={...M[b]||{}};h.runnable=!h.runnable,M={...M,[b]:h},Ld(M),Ce()}function Pe(b){return M[b]===!0}function ge(b){M={...M,[b]:M[b]!==!0},Ld(M),Ce()}function lt(b){let h=L.queue_groups.find(x=>x.root_dir===b);if(!h)return null;for(let x=0;x<h.serial_lane_count;x+=1){let I=`s${x+1}`,ne=h.sublanes.serial.find(y=>y.id===I);if(!ne||ne.raw_length===0&&ne.occupied_by.length===0)return I}return null}function mt(b,h){let x=L.queue_groups.find(ne=>ne.root_dir===b),I=x?x.sublanes.serial.find(ne=>ne.id===h):void 0;return I?I.raw_length:0}function R(b,h){let x=Q.get(b),I=Q.get(h);if(!x||!I)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let ne=Td(x),y=Td(I);if(ne!==null&&ne===y&&x.root_dir===I.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let $=Cd(x),ce=Cd(I);if($&&y!==null){let be=y;return{kind:"ops",title:`${be} \uB05D\uC5D0 ${b}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:I.root_dir,ops:[{bead_id:b,lane:be,index:mt(I.root_dir,be)}]}}if(ne!==null&&ce&&y===null){let be=ne;return{kind:"ops",title:`${be} \uB05D\uC5D0 ${h}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:x.root_dir,ops:[{bead_id:h,lane:be,index:mt(x.root_dir,be)}]}}if($&&ne===null&&ce&&y===null){let be=lt(x.root_dir);return be===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${be} \uB808\uC778\uC5D0 ${h} \u2192 ${b} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:x.root_dir,ops:[{bead_id:h,lane:be,index:0},{bead_id:b,lane:be,index:1}]}}return!$&&!ce?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:$?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function me(b,h){let x=R(b,h.id);return{id:h.id,title:h.title,location_label:h.location_label,prefixes:h.prefixes,action:x.kind==="note"?{kind:"note",text:x.text}:x.kind==="disabled"?{kind:"disabled",label:Ed,title:x.title}:{kind:"place",label:Ed,title:x.title}}}function we(b,h){if(!Y||Y.bead_id!==b)return null;let x=Y.counterpart_id,I=x===null?h:h.filter(ne=>ne.id===x);return I.length===0?null:{rows:I.map(ne=>me(b,ne))}}function Le(b){let h=b.dependency_chips||null,x=b.overlap_chips||[],I=b.scope_state==="missing";if(!h&&x.length===0&&!I)return null;let ne=we(b.id,x);return{...h||{},...x.length>0?{overlaps:x}:{},...I?{scope_missing:!0}:{},...ne?{popover:ne}:{}}}function Me(b){let h=Le(b);return h?{...b,dependency_chips:h}:b}async function Be(b,h){let x=R(b,h);if(Y=null,x.kind!=="ops"){Ce();return}let I=ue(x.root_dir,x.ops[0].bead_id);for(let ne of x.ops){let y=await W(ne,x.root_dir,I);if(y===null)break;I=y}Ce()}async function W(b,h,x){try{let I=await ke("worker-queue-place",b,h,x,!1);if(I&&I.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!I||I.applied!==!0)return de(I&&typeof I.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${I.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let ne=I.queue?I.queue.revision:void 0;return typeof ne!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):ne}catch(I){return de(E(I),"error"),null}}function K(b){let h=xe(b.root_dir);return l`<header class="mon2-sec__hd">
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
    </div>`}function Ye(b){if(V!==b.id)return null;let h=L.queue_groups.find(I=>I.root_dir===b.root_dir),x=b.place_lanes||[];return{bead_id:b.id,lanes:[{id:"parallel",label:"\uBCD1\uB82C",count:b.place_index??0},...L.chain_lanes.map((I,ne)=>({id:`lane:${ne}`,label:`\uC5F0\uACB0 ${ne+1} \uB05D\uC5D0`,count:I.rows.length})),{id:"new-lane",label:"\uC0C8 \uC5F0\uACB0 \uB808\uC778",count:0},...x.map(I=>({id:`serial:${I.id}`,label:`${h?h.name:""} \uC9C1\uB82C ${Number(I.id.slice(1))}`,count:I.length}))]}}function We(b){return De(b,_i(Me(b),Ye(b),{exec_chips_mode:"pinned_only"}))}function ve(){return L.runnable_flat?l`<div class="mon2-flat" data-drop="candidate">
        ${L.runnable.map(b=>We(b))}
      </div>`:l`${L.runnable_sections.map(b=>{let h=xe(b.root_dir);return l`<section
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
      </section>`})}`}function O(b,h){return l`<div
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
    </div>`}function H(){let b=Pe("parallel");return l`<section
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
        <span class="mon2-area__count">${L.parallel_rows.length}</span>
      </header>
      ${b?"":l`<div class="mon2-area__body" data-drop="parallel">
            ${L.parallel_rows.length===0?l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:L.parallel_rows.map((h,x)=>O(h,x))}
          </div>`}
    </section>`}function J(b,h,x){return l`<div
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
            >${Nh(h.seq)}</span
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
      ${Fr(Le(h),{lane:Q.get(h.id)?.lane})}
    </div>`}function X(b){return l`<div class="mon2-clane" data-lane-id=${b.lane_id}>
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
            </div>`:b.rows.map((h,x)=>J(b,h,x))}
      </div>
    </div>`}function Oe(b,h,x){return l`<div
      class="mon2-item"
      data-bead-id=${h.id}
      data-drag-kind="repo-serial"
      data-root-dir=${h.root_dir}
      data-lane-id=${b.id}
      data-row-index=${x}
      data-queue-index=${String(h.queue_index??0)}
    >
      ${Hn(Me(h))}
    </div>`}function et(b){if(b.length===0)return"";let h=b.length-1;return`${b[0].id} \uC810\uC720${h>0?` +${h}`:""}`}function ot(b){return l`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${b.id}
    >
      ${Hn({id:b.id,title:b.title,lane:"running",draggable:!1,ghost:!0,badges:[b.badge]})}
    </div>`}function Xe(b,h){return l`<div
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
          ${h.occupants.map(x=>ot(x))}
          ${h.items.length>0?h.items.map((x,I)=>Oe(h,x,I)):h.occupants.length>0?"":l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:l`<span
            class="mon2-lane__badge${h.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${h.occupants.length>0?h.occupants.map(x=>`${x.id} \u2014 ${x.badge}`).join(`
`):""}
            >${et(h.occupants)}</span
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
    </div>`}function vt(){let b=Pe("serial"),h=L.chain_lanes.some(x=>x.pending&&x.rows.length===0);return l`<section
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
            ${L.chain_lanes.map(x=>X(x))}
            ${L.queue_groups.map(x=>x.sublanes.serial.map(I=>Xe(x,I)))}
          </div>`}
    </section>`}function gt(){return l`<div class="mon2-wait">${H()}${vt()}</div>`}function at(b){return l`<div class="worker-rungrid">
      ${L.running.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:L.running.map(h=>hi({bead_id:h.id,attempt_id:h.attempt_id||"",title:h.title,runner:h.runner??null,model:h.model??null,effort:h.effort??null,speed:h.speed??null,started_at:h.started_at??null,kind:h.kind,...h.kind==="session"?{updated_at:h.updated_at}:{},workflow:h.workflow||null,resumed_from:h.resumed_from??null,continuation_mode:h.continuation_mode??null,paused:h.run_state==="paused",failed:h.run_state==="failed",status:h.status,status_label:h.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:h.can_resume!==!1,can_pause:h.can_pause!==!1,exec_chips:h.exec_chips||null,usage:h.usage||null,discard:h.discard},b,U,{monitor:{repo:h.workspace_name,root_dir:h.root_dir,serial_lane_id:h.serial_lane_id,last_activity:h.last_activity||null,legs:h.legs||[],dependency_chips:Le(h)}}))}
    </div>`}function ct(b){let h={runnable:L.runnable,queue:L.queue,running:L.running,pr_wait:L.pr_wait,done:L.done};return l`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${Dh.map(x=>{let I=h[x.lane],ne=x.lane==="runnable"?L.runnable_flat?I.length>0?ve():void 0:L.runnable_sections.length>0?ve():void 0:x.lane==="queue"?L.queue_groups.length>0||L.chain_lanes.length>0||L.parallel_rows.length>0?gt():void 0:x.lane==="running"?at(b):I.length>0?l`${I.map(y=>Hn(y))}`:void 0;return fn({id:`monitor-${x.lane}`,lane:x.pane,title:x.lane==="done"?`\uC644\uB8CC\xB7${N()}`:x.title,items:I,empty:x.empty,body:ne,live:x.lane==="running"&&I.length>0,controls:x.lane==="runnable"?wt():void 0,header_control:nt(x.lane,I.length)})})}
      </div>`}function wt(){return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${L.runnable_hidden.blocked>0?` ${L.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ti.map(b=>l`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===b.value?" is-active":""}"
              data-spec=${b.value}
              aria-pressed=${k.spec===b.value?"true":"false"}
            >
              ${b.label}
            </button>`)}
        ${L.runnable_hidden.spec>0?l`<span class="worker-filter__hidden"
              >숨김 ${L.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function nt(b,h){return b==="runnable"?l`<select
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
      </select>`:""}function Ce(){let b=s&&s.get?s.get():null,h=s&&s.getWorkspacesState?s.getWorkspacesState():[],x=d(),I=()=>Ci(b,h,{done_since:sr(f,x),running_sort:g,candidate_filter:k,candidate_sort:A,pending_lanes:D});L=I(),L.pending_lanes_kept.length!==D.length&&(D=L.pending_lanes_kept.map(ne=>D[ne]),L=I()),Q=new Map;for(let ne of[...L.runnable,...L.queue,...L.running,...L.pr_wait,...L.done])Q.has(ne.id)||Q.set(ne.id,ne);Ke(ct(x),B),ht()?.render(),Ne(),pt()}function Ne(){let b=new Map;for(let h of L.queue_groups)b.set(h.root_dir,h.auto_advance);for(let h of Array.from(B.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let x=h.closest(".mon2-item")?.getAttribute("data-root-dir")||"",I=b.get(x);typeof I=="boolean"&&h.setAttribute("title",`${h.textContent||""} \xB7 ${I?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function ht(){if(Z)return Z;let b=B.querySelector(".mon2-deck");return b?(Z=ud(b,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>L.done,rangeLabel:N,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:pe,onFocusChange:h=>{P=h,pt()}}),Z):null}function pt(){B.classList.toggle("has-focus",P!==null);for(let b of Array.from(B.querySelectorAll(".mon2-sec[data-root-dir]")))b.classList.toggle("is-focus",P!==null&&b.getAttribute("data-root-dir")===P);for(let b of Array.from(B.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let h=Q.get(b.getAttribute("data-bead-id")||"");b.classList.toggle("is-focus",P!==null&&!!h&&h.root_dir===P)}for(let b of Array.from(B.querySelectorAll(".mon2-crow[data-root-dir]")))b.classList.toggle("is-focus",P!==null&&b.getAttribute("data-root-dir")===P)}function G(b,h){let x=a?a():void 0;if(!h||!x||h===x||!i){r(b);return}i(h).then(()=>{r(b)}).catch(I=>{n("workspace switch for %s failed: %o",h,I)})}function pe(b){if(!b)return;let h=a?a():void 0,x=()=>{try{c?.gotoView("worker")}catch(I){n("gotoView(worker) failed: %o",I)}};if(!i||h&&h===b){x();return}i(b).then(x).catch(I=>{n("workspace switch for %s failed: %o",b,I),de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function je(b){on(b).then(h=>{de(h?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",h?"success":"error",1400)})}function He(b){let h=Q.get(b)||null;return{item:h,root_dir:h?h.root_dir:"",revision:h?h.expected_revision:0}}function E(b){if(typeof b=="string"&&b.length>0)return b;if(b&&typeof b=="object"){let h=b;if(typeof h.message=="string"&&h.message.length>0)return h.message;if(typeof h.error=="string"&&h.error.length>0)return h.error;if(h.error&&typeof h.error=="object"&&typeof h.error.message=="string")return h.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function w(b,h,x){let{root_dir:I}=He(h);if(!(!h||!x||x===h))try{await ee(b,{a:h,b:x},I)}catch(ne){de(E(ne),"error")}}function S(){let b=new Map,h=s&&s.get?s.get():null,x=I=>Array.isArray(I)?I.filter(ne=>typeof ne=="string"&&ne.length>0):[];for(let I of Array.isArray(h)?h:[]){if(!I||typeof I!="object")continue;let ne=I.bead_blocked_by&&typeof I.bead_blocked_by=="object"?I.bead_blocked_by:{};for(let[y,$]of Object.entries(ne))Array.isArray($)&&b.set(y,x($));for(let y of[...Array.isArray(I.runnable)?I.runnable:[],...Array.isArray(I.session_active)?I.session_active:[]])y&&typeof y.bead_id=="string"&&Array.isArray(y.blocked_by)&&y.blocked_by.length>0&&b.set(y.bead_id,x(y.blocked_by))}return b}function z(){let b=new Map;for(let x of L.chain_lanes)b.set(x.lane_id,x.rows.map(I=>I.id));let h=new Map;for(let x of L.parallel_rows)typeof x.queue_index=="number"&&h.set(x.id,x.queue_index);for(let x of L.queue_groups)for(let I of x.sublanes.serial)for(let ne of I.items)typeof ne.queue_index=="number"&&h.set(ne.id,ne.queue_index);return{blocked_by_map:S(),owner_of:new Map(Object.entries(L.owner_of)),lane_order:b,parallel_rows:L.parallel_rows.map(x=>({bead_id:x.id,root_dir:x.root_dir,queue_index:x.queue_index??0})),parallel_raw_length:new Map(Object.entries(L.parallel_raw_length)),queue_index_of:h}}function ue(b,h){let x=Q.get(h);if(x&&x.root_dir===b)return x.expected_revision;let I=L.queue_groups.find(ne=>ne.root_dir===b);return I?I.revision:0}async function oe(b,h){try{if(b.type==="worker-queue-place"||b.type==="worker-queue-reorder"||b.type==="worker-queue-remove"){let x=await ke(b.type,b.payload,b.root_dir,ue(b.root_dir,h));return x&&x.conflict?(de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):x&&x.applied===!1?(de(x.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${x.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0}return(b.type==="dep-add"||b.type==="dep-remove")&&await ee(b.type,{a:b.a,b:b.b},b.root_dir),!0}catch(x){return de(E(x),"error"),!1}}async function te(b,h){let x=dd(b,h,z());if("refused"in x){de(x.refused,"error");return}if(h.kind==="chain"){let I=L.chain_lanes.find(y=>y.lane_id===h.lane_id),ne=I&&I.pending&&I.rows.length===0?Number(I.lane_id.slice(8)):-1;ne>=0&&D[ne]&&(D=D.map((y,$)=>$===ne?{seed:b.bead_id}:y))}for(let I of x.ops)if(!await oe(I,b.bead_id))break;Ce()}async function rt(b,h){let x=Q.get(b);if(!x){Ce();return}let I={kind:"candidate",bead_id:b,root_dir:x.root_dir};if(h==="new-lane"){D.some(y=>y.seed===null)||(D=[...D,{seed:null}]),Ce();let ne=L.chain_lanes.find(y=>y.pending&&y.rows.length===0);if(!ne)return;await te(I,{kind:"chain",lane_id:ne.lane_id,marker_index:0});return}if(h.startsWith("lane:")){let ne=L.chain_lanes[Number(h.slice(5))];if(!ne){Ce();return}await te(I,{kind:"chain",lane_id:ne.lane_id,marker_index:ne.rows.length});return}if(h.startsWith("serial:")){let ne=h.slice(7),y=(x.place_lanes||[]).find($=>$.id===ne);await te(I,{kind:"repo-serial",root_dir:x.root_dir,lane_id:ne,index:y?y.index:0});return}await te(I,{kind:"parallel",marker_index:L.parallel_rows.length})}async function Ze(b,h){let x=L.parallel_rows,I=x.findIndex(Ve=>Ve.id===b);if(I<0)return;let ne=x[I].root_dir,y=[];x.forEach((Ve,Ie)=>{Ve.root_dir===ne&&y.push(Ie)});let $=y.indexOf(I),ce=y[$+h];if(typeof ce!="number")return;let be=h===-1?ce:y[$+2]??Math.min(x.length,ce+1);await te({kind:"parallel",bead_id:b,root_dir:ne,queue_index:x[I].queue_index??0},{kind:"parallel",marker_index:be})}async function St(b){for(let h of L.chain_lanes){let x=h.rows.find(I=>I.id===b);if(!(!x||!x.draggable)){await te({kind:"chain",bead_id:b,root_dir:x.root_dir,lane_id:h.lane_id,...typeof x.queue_index=="number"?{queue_index:x.queue_index}:{}},{kind:"parallel",marker_index:L.parallel_rows.length});return}}}let Qe=null,ft=!1,yt=null;function Ct(){yt!==null&&clearTimeout(yt),yt=setTimeout(()=>{yt=null,ft=!1},0)}function zt(b,h){let x=h&&typeof h.closest=="function"?h.closest("[data-row-index]"):null;if(x&&b.contains(x)){let I=Number(x.getAttribute("data-row-index"));return Number.isFinite(I)?I:0}return b.querySelectorAll("[data-row-index]").length}function Nt(b){let h=b.target,x=typeof h?.closest=="function"?h.closest("[data-drop]"):null;if(!x||!Qe)return null;let I=x.getAttribute("data-drop");if(I==="candidate")return{zone:x,target:{kind:"candidate"}};if(I==="parallel")return{zone:x,target:{kind:"parallel",marker_index:zt(x,h)}};if(I==="chain")return{zone:x,target:{kind:"chain",lane_id:x.getAttribute("data-lane-id")||"",marker_index:zt(x,h)}};if(I==="repo-serial"){let ne=x.getAttribute("data-root-dir")||"";if(ne!==Qe.root_dir)return null;let y=typeof h?.closest=="function"?h.closest("[data-queue-index]"):null,$=y&&x.contains(y)?y.getAttribute("data-queue-index"):x.getAttribute("data-lane-length"),ce=Number($);return{zone:x,target:{kind:"repo-serial",root_dir:ne,lane_id:x.getAttribute("data-lane-id")||"",index:Number.isFinite(ce)?ce:0}}}return null}function Mt(){for(let b of Array.from(B.querySelectorAll(".is-drop-over")))b.classList.remove("is-drop-over")}function Ft(b){let h=b.target,x=typeof h?.closest=="function"?h.closest('[draggable="true"][data-bead-id]'):null,I=x?x.closest("[data-drag-kind]"):null;if(!I)return;let ne=I.getAttribute("data-bead-id")||"",y=I.getAttribute("data-drag-kind")||"",$=I.getAttribute("data-root-dir")||"";if(!ne||!y||!$)return;let ce=I.getAttribute("data-queue-index")||"",be=Number(ce),Ve=I.getAttribute("data-lane-id")||"";Qe={kind:y,bead_id:ne,root_dir:$,...ce!==""&&Number.isFinite(be)?{queue_index:be}:{},...Ve?{lane_id:Ve}:{}},ft=!0,V=null,B.classList.add("is-dragging");try{b.dataTransfer?.setData("text/plain",ne),b.dataTransfer&&(b.dataTransfer.effectAllowed="move")}catch{}}function Lt(b){let h=Nt(b);h&&(b.preventDefault(),b.dataTransfer&&(b.dataTransfer.dropEffect="move"),h.zone.classList.add("is-drop-over"))}function Ue(b){let h=b.target;typeof h?.closest=="function"&&h.closest("[data-drop]")?.classList.remove("is-drop-over")}function Ut(){Qe=null,Mt(),B.classList.remove("is-dragging"),Ct()}function Ht(b){let h=Nt(b),x=Qe;Qe=null,Mt(),B.classList.remove("is-dragging"),!(!h||!x)&&(b.preventDefault(),te(x,h.target))}function Je(b){return{runner:b.runner||void 0,model:b.model||void 0,effort:b.effort||void 0,status:b.run_state==="running"?"running":b.run_state,worktree:b.root_dir}}function Wt(b,h){let{item:x,root_dir:I,revision:ne}=He(h),y=x?.attempt_id||"",$=b.classList;if($.contains("worker-dep__remove")){w("dep-remove",h,b.dataset.blockerId||"");return}if($.contains("mon2-rowops__up")||$.contains("mon2-rowops__down")){Ze(h,$.contains("mon2-rowops__up")?-1:1);return}if($.contains("mon2-rowops__remove")){ke("worker-queue-remove",{bead_id:h},I,ne);return}if($.contains("mon2-crow__detach")){St(h);return}if($.contains("mon-overlap__chip")){let ce=b.getAttribute("data-overlap-all")==="true"?null:b.getAttribute("data-overlap-id")||"";Y=!!Y&&Y.bead_id===h&&Y.counterpart_id===ce?null:{bead_id:h,counterpart_id:ce},Ce();return}if($.contains("mon-overlap__place")){Be(h,b.getAttribute("data-counterpart-id")||"");return}if($.contains("worker-card__place")){V=V===h?null:h,Ce();return}if($.contains("worker-card__place-cancel")){V=null,Ce();return}if($.contains("worker-card__place-lane")){let ce=b.getAttribute("data-lane")||"parallel";V=null,rt(h,ce);return}if($.contains("rtile__session")){U=y,y&&x&&Re.open({attempt_id:y,root_dir:I,meta:Je(x)}),Ce();return}if($.contains("rtile__pause")){ee("worker-attempt-pause",{attempt_id:y},I);return}if($.contains("rtile__resume")){Lr().then(ce=>{if(ce!==null)return ae("worker-attempt-resume",{attempt_id:y,...ce!==""?{instructions:ce}:{}},I,ne)});return}if($.contains("rtile__dismiss")){ke("worker-attempt-dismiss",{attempt_id:y},I,ne);return}if($.contains("rtile__discard")){if(!p(ws(h,"unmerged")))return;j({bead_id:h,...y?{attempt_id:y}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},I,ne);return}if($.contains("worker-mini__merge")){let ce=ie(I,h);ce?.mismatch&&ce.continuation===null?$e(I,h,ne,ce.mismatch):ke("worker-merge-queue-add",{bead_id:h},I,ne);return}if($.contains("worker-mini__merge-cancel")){ke("worker-merge-queue-remove",{bead_id:h},I,ne);return}if($.contains("worker-mini__discard")){let ce=b.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(ws(h,ce)))return;j({bead_id:h,...b.dataset.attemptId?{attempt_id:b.dataset.attemptId}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},I,ne);return}if($.contains("worker-mini__revise-fix")){ae("worker-revise-fix",{bead_id:h},I,ne);return}$.contains("worker-mini__revise-approve")&&ke("worker-revise-approve",{bead_id:h},I,ne)}function qe(b){let h=ft;ft=!1;let x=b.target;if(!x||typeof x.closest!="function"||x.closest("dialog")||x.closest(".mon2-drawer")||x.closest("a"))return;let I=x.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(I){b.preventDefault();let m=x.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||I.textContent?.trim()||"";m&&je(m);return}let ne=x.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(ne){b.preventDefault();let u=ne.getAttribute("data-root-dir")||Q.get(x.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||ne.getAttribute("title")||"";pe(u);return}let y=x.closest(".mon2-sec__toggle");if(y){b.preventDefault(),Ae(y.getAttribute("data-root-dir")||"");return}let $=x.closest(".mon2-area__toggle");if($){b.preventDefault(),ge($.getAttribute("data-area")||"parallel");return}if(x.closest(".mon2-newlane")){b.preventDefault(),D=[...D,{seed:null}],Ce();return}if(x.closest(".mon-merge-all")){b.preventDefault(),le();return}let ce=x.closest(".mon-filter__spec");if(ce){b.preventDefault(),k={...k,spec:ce.getAttribute("data-spec")||"all"},Rd(k),Ce();return}let be=x.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!be)return;let Ve=be.getAttribute("data-bead-id")||"",Ie=x.closest("button");if(Ie){b.preventDefault(),Wt(Ie,Ve);return}Ve&&!h&&(b.preventDefault(),G(Ve,be.getAttribute("data-root-dir")||He(Ve).root_dir))}function C(b){let h=b.target;if(!h||typeof h.closest!="function")return;let x=h.closest(".mon-filter__blocked");if(x){k={...k,show_blocked:x.checked},Rd(k),Ce();return}let I=h.closest(".mon-candidate-sort");if(I){A=Ss.some($=>$.value===I.value)?I.value:"repo_spec",Ch(A),Ce();return}let ne=h.closest(".mon-running-sort");if(ne){g=ne.value==="repo"?"repo":"started",Ph(g),Ce();return}let y=h.closest(".mon-done-range");y&&(f=un(y.value)?y.value:rn,Ih(f),Ce())}function _e(b){if(!Y)return;let h=b.target;h&&typeof h.closest=="function"&&h.closest(".mon-overlap__popover, .mon-overlap__chip")||(Y=null,Ce())}function Te(b){b.key!=="Escape"||!Y||(Y=null,Ce())}e.addEventListener("click",qe),e.addEventListener("change",C),document.addEventListener("click",_e),document.addEventListener("keydown",Te),e.addEventListener("dragstart",Ft),e.addEventListener("dragover",Lt),e.addEventListener("dragleave",Ue),e.addEventListener("drop",Ht),e.addEventListener("dragend",Ut),s&&typeof s.subscribe=="function"&&(he=s.subscribe(()=>{try{ye.clear(),Ce()}catch{}}));function it(){re!==null&&(clearInterval(re),re=null)}function Rt(){yt!==null&&(clearTimeout(yt),yt=null)}return{load(){n("load"),Ce(),re===null&&(re=setInterval(()=>{try{Ce()}catch{}},Mh))},pause(){it()},clear(){it(),Rt(),he&&(he(),he=null),Re.destroy(),Z?.destroy(),Z=null,e.removeEventListener("click",qe),e.removeEventListener("change",C),document.removeEventListener("click",_e),document.removeEventListener("keydown",Te),e.removeEventListener("dragstart",Ft),e.removeEventListener("dragover",Lt),e.removeEventListener("dragleave",Ue),e.removeEventListener("drop",Ht),e.removeEventListener("dragend",Ut),e.replaceChildren()}}}function jd(e,t,n){let r=Et("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(g){return k=>{k.preventDefault(),r("click tab %s",g),n.gotoView(g)}}function c(){let g=t.getState();return g.view==="worker"||g.view==="monitor"?g.view:"board"}function d(){let g=c();return l`
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
    `}function f(){s&&Ke(d(),s),o&&Ke(p(),o)}return f(),a=t.subscribe(()=>f()),{destroy(){a&&(a(),a=null),s&&Ke(l``,s),o&&Ke(l``,o)}}}var Bd=["bug","feature","task","epic","chore"];function Ud(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Wd=["Critical","High","Medium","Low","Backlog"];function zd(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),c=n.querySelector("#new-description"),d=n.querySelector("#new-issue-error"),p=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),g=n.querySelector(".new-issue__close");function k(){o.replaceChildren();let N=document.createElement("option");N.value="",N.textContent="\u2014 Select \u2014",o.appendChild(N);for(let B of Bd){let T=document.createElement("option");T.value=B,T.textContent=Ud(B),o.appendChild(T)}a.replaceChildren();for(let B=0;B<=4;B+=1){let T=document.createElement("option");T.value=String(B);let L=Wd[B]||"Medium";T.textContent=`${B} \u2013 ${L}`,a.appendChild(T)}}k();function A(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function M(N){s.disabled=N,o.disabled=N,a.disabled=N,i.disabled=N,c.disabled=N,p.disabled=N,f.disabled=N,f.textContent=N?"Creating\u2026":"Create"}function U(){d.textContent=""}function V(N){d.textContent=N}function Y(){try{let N=window.localStorage.getItem("beads-ui.new.type");N?o.value=N:o.value="";let B=window.localStorage.getItem("beads-ui.new.priority");B&&/^\d$/.test(B)?a.value=B:a.value="2"}catch{o.value="",a.value="2"}}function D(){let N=o.value||"",B=a.value||"";N.length>0&&window.localStorage.setItem("beads-ui.new.type",N),B.length>0&&window.localStorage.setItem("beads-ui.new.priority",B)}async function P(){U();let N=String(s.value||"").trim();if(N.length===0){V("Title is required"),s.focus();return}let B=Number(a.value||"2");if(!(B>=0&&B<=4)){V("Priority must be 0..4"),a.focus();return}let T=String(o.value||""),L=String(c.value||""),Q={title:N};T.length>0&&(Q.type=T),String(B).length>0&&(Q.priority=B),L.length>0&&(Q.description=L),M(!0);try{await t("create-issue",Q)}catch{M(!1),V("Failed to create issue");return}D(),M(!1),A()}return n.addEventListener("cancel",N=>{N.preventDefault(),A()}),g.addEventListener("click",()=>A()),p.addEventListener("click",()=>A()),n.addEventListener("keydown",N=>{N.key==="Enter"&&(N.ctrlKey||N.metaKey)&&(N.preventDefault(),P())}),r.addEventListener("submit",N=>{N.preventDefault(),P()}),{open(){r.reset(),U(),Y();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){A()}}}var qh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Fh(e,t){return Aa(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Hd(e,t,n){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=Fh(r,e);return l`<button
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
        ${qh.map(([n,r])=>l`<label class="settings-dialog__toggle">
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
  `}var jh=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Kd(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(Z=>de(Z,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",c=!1,d="",p=null;function f(){if(p)return p;let Z=a.querySelector('[data-pane="execution"]');return Z?(p=Ho(Z,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Re=>t.queueStore?.set?.(Re)}),p):null}function g(){return l`
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
    `}function k(){let Z=r.get();return l`
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
              ${Gd(Z,d,{onDraft:Re=>{d=Re},onAdd:Y,onRemove:D})}
              ${Vd(Z,P)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function A(Z){let Re=r.get();if(Re)try{let ke=await n("display-policy-set",{expected_revision:Re.revision,policy:Z(Re)});M(ke),ke&&ke.conflict&&ke.policy&&(ke=await n("display-policy-set",{expected_revision:ke.policy.revision,policy:Z(ke.policy)}),M(ke)),ke&&ke.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function M(Z){Z&&Z.policy&&typeof Z.policy=="object"&&r.set(Z.policy)}function U(Z){A(Z)}function V(Z){let Re=r.get();if(!Re)return;let ke=!Bh(Z,Re);U(ie=>Uh(Z,ie,ke))}function Y(){let Z=d.trim();Z.length!==0&&(d="",U(Re=>Re.hidden_prefixes.includes(Z)?{hidden_prefixes:Re.hidden_prefixes}:{hidden_prefixes:[...Re.hidden_prefixes,Z]}),N())}function D(Z){U(Re=>({hidden_prefixes:Re.hidden_prefixes.filter(ke=>ke!==Z)}))}function P(Z){let Re=r.get();if(!Re)return;let ke=Re.chips[Z]===!1;U(()=>({chips:{[Z]:ke}}))}function N(){Ke(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${jh.map(Z=>l`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${Z.id}
                  aria-selected=${String(i===Z.id)}
                  aria-controls=${`settings-pane-${Z.id}`}
                  @click=${()=>B(Z.id)}
                >
                  <span class="settings-dialog__glyph">${Z.glyph}</span>
                  ${Z.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${re}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${g()} ${k()}
          </div>
        </div>
      `,a),f()}function B(Z){i=Z,N()}let T=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",T),a.addEventListener("cancel",T);let L=Z=>{Z.target===a&&re()};a.addEventListener("click",L);let Q=null;r.subscribe&&(Q=r.subscribe(()=>{c&&N()}));let ye=null;t.implPresetStore?.subscribe&&(ye=t.implPresetStore.subscribe(()=>{c&&p?.render()}));function he(Z="execution"){c||(c=!0,t.onOpenChange?.(!0),i=Z,d="",N(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),f()?.load())}function re(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:he,close:re,sessionDraft:()=>p?.sessionDraft()??{},destroy(){c=!1,a.removeEventListener("close",T),a.removeEventListener("cancel",T),a.removeEventListener("click",L),Q&&(Q(),Q=null),ye&&(ye(),ye=null),p?.destroy(),p=null,a.remove()}}}function Bh(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Uh(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Wh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Yd="usage-meter-card",zh="usage-meter-layer",Zd=600,Hh=["token_expired","relogin_required"];function Qd(e){return String(e).padStart(2,"0")}function Gh(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Xd(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Qd(r.getHours())}:${Qd(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${Wh[r.getMonth()]} ${r.getDate()} ${o}`;return`${Gh(n,t)} \xB7 ${i}`}function Vh(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Jd(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function ep(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var tp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function rp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Kh(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:rp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Yh(e){if(!e||typeof e!="object")return null;let t=e,n=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=Kh(s);o&&n.push(o)}let r=t.available===!0&&Array.isArray(t.windows);return!r&&n.length===0?null:{available:r,windows:r?rp(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:n}}function np(e,t){return`${e}:${t}`}function sp(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,c=null;function d(){Ke(l``,e),e.hidden=!0,f()}function p(){if(c===null){let ie=e.ownerDocument;c=ie.createElement("div"),c.id=zh,c.className="usage-meter__layer",ie.body.appendChild(c)}return c}function f(){c!==null&&(Ke(l``,c),c.remove(),c=null)}function g(ie){n!==ie&&(n===null&&(document.addEventListener("mousedown",A),document.addEventListener("keydown",U),window.addEventListener("resize",M)),n=ie)}function k(){n!==null&&(n=null,document.removeEventListener("mousedown",A),document.removeEventListener("keydown",U),window.removeEventListener("resize",M))}function A(ie){let ae=ie.target;ae&&(e.contains(ae)||c!==null&&c.contains(ae))||(k(),re())}function M(){re()}function U(ie){ie.key==="Escape"&&(k(),re())}function V(ie){n===ie?k():g(ie),re()}function Y(){k(),re()}async function D(ie,ae){if(r.has(ie.key))return;let $e=np(ie.key,ae);r.set(ie.key,ae),a.delete($e),re();let j=null;try{j=await(await fetch(ie.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ae})})).json()}catch{j=null}if(t)return;if(r.delete(ie.key),!j||j.ok!==!0){let le=j&&typeof j.error=="string"&&j.error.length>0?j.error:"network_error";a.set($e,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${le}`}),re();return}let ee=Array.isArray(j.warnings)?j.warnings.filter(le=>typeof le=="string"&&le.length>0):[];ee.length>0&&a.set($e,{kind:"warn",text:ee.join(" \xB7 ")}),re(),await ke()}function P(ie,ae,$e,j){let ee=ep(ie.pct),xe=`resets ${Xd(ie.resetsAt,j)}${ae?` \xB7 ${$e}`:""}`;return l`<span
      class="usage-meter__window ${Jd(ee)}"
      style=${`--progress: ${ee}%`}
      title=${xe}
    >
      <span class="usage-meter__label">${ie.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${ee}%</span>
    </span>`}function N(ie,ae,$e){let j=ae.available&&typeof ae.ageSeconds=="number"&&ae.ageSeconds>Zd,ee=j&&typeof ae.ageSeconds=="number"?`${Math.floor(ae.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",le=ae.accounts.filter(ge=>!ge.active).length,xe=`usage-meter__group${j?" usage-meter__group--stale":""}`,Ae=l`<span class="usage-meter__provider"
        >${ie.label}</span
      >
      ${ae.available?ae.windows.map(ge=>P(ge,j,ee,$e)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${le>0?l`<span class="usage-meter__badge">+${le}</span>`:""}`;if(ae.accounts.length===0)return l`<span
        class=${xe}
        aria-label=${`${ie.label} usage`}
        >${Ae}</span
      >`;let Pe=n===ie.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${xe}`}
      aria-label=${`${ie.label} usage`}
      aria-expanded=${Pe?"true":"false"}
      aria-controls=${Yd}
      @click=${()=>V(ie.key)}
    >
      ${Ae}
    </button>`}function B(ie,ae){return l`<span class="usage-meter" aria-label="Usage">
      ${ie.map($e=>N($e.provider,$e.snapshot,ae))}
    </span>`}function T(ie,ae){let $e=ep(ie.pct),j=Xd(ie.resetsAt,ae);return l`<span
      class="usage-meter__account-window ${Jd($e)}"
      style=${`--progress: ${$e}%`}
    >
      <span class="usage-meter__account-key">${ie.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${$e}%</span>
      <span class="usage-meter__account-reset"
        >${j.length>0?`\u21BB ${j}`:""}</span
      >
    </span>`}function L(ie,ae){return Hh.includes(ae)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ie.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function Q(ie,ae,$e){let j=ae.status==="ok",ee=typeof ae.ageSeconds=="number"&&ae.ageSeconds>Zd,le=a.get(np(ie.key,ae.number)),xe=r.get(ie.key),Ae=xe!==void 0,Pe=xe===ae.number,ge=["usage-meter__account"];return ae.active&&ge.push("usage-meter__account--active"),j||ge.push("usage-meter__account--unavailable"),ee&&ge.push("usage-meter__account--stale"),l`<div class=${ge.join(" ")}>
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
              >${Vh(ae.ageSeconds)}</span
            >`}
        ${ae.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Ae}
              @click=${()=>{D(ie,ae.number)}}
            >
              ${Pe?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${j?l`<div class="usage-meter__account-windows">
            ${ae.windows.map(lt=>T(lt,$e))}
          </div>`:l`<div class="usage-meter__account-status">
            ${L(ie,ae.status)}
          </div>`}
      ${le===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${le.kind}"
          >
            ${le.text}
          </div>`}
    </div>`}function ye(ie,ae,$e){let j=ae.accounts.filter(ee=>ee.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ie.label} · 활성 ${j} / 전체
        ${ae.accounts.length}
      </h2>
      ${ae.accounts.map(ee=>Q(ie,ee,$e))}
    </section>`}function he(ie,ae){return l`<div
      class="usage-meter__card"
      id=${Yd}
      role="dialog"
      aria-label=${`${ie.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${ye(ie.provider,ie.snapshot,ae)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function re(){let ie=[];for(let j of tp){let ee=o.get(j.key);ee&&ie.push({provider:j,snapshot:ee})}if(ie.length===0){k(),d();return}let ae=ie.find(j=>j.provider.key===n&&j.snapshot.accounts.length>0);ae||k();let $e=Date.now();Ke(B(ie,$e),e),e.hidden=!1,ae?Z(ae,$e):f()}function Z(ie,ae){let $e=p(),j=e.getBoundingClientRect(),ee=e.ownerDocument.documentElement.clientWidth;$e.style.setProperty("--usage-meter-anchor-top",`${j.bottom}px`),$e.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,ee-j.right)}px`),Ke(l`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${Y}
        ></div>
        ${he(ie,ae)}`,$e)}async function Re(ie){try{let ae=await fetch(ie.endpoint);return ae.ok?Yh(await ae.json()):null}catch{return null}}async function ke(){i+=1;let ie=i,ae=await Promise.all(tp.map(async $e=>({provider:$e,snapshot:await Re($e)})));if(!(t||ie!==i)){for(let $e of ae)$e.snapshot?o.set($e.provider.key,$e.snapshot):o.delete($e.provider.key);re()}}return d(),ke(),s=setInterval(()=>{ke()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),k(),d()}}}function op(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Zh="worker-ineligible";function Ri(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ap(e){return Ri(e).includes(Zh)}var Qh="worker-serial";function Li(e){return Ri(e).includes(Qh)}function Ii(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Xh=new Set(["done","failed","orphaned","stopped","discarded"]),Jh={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},eb={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},tb={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Oi(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:tb[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function ip(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,d=new Map,p=!1,f=null,g=null,k=null,A=new Set,M=!1,U=0,V=null,Y=new Set;function D(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function P(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function N(){return o&&o()||""}async function B(){if(!s)return;let E=++U;M=!0,k=null,A.clear(),Ce();try{let w=await s("worker-parallel-analysis-targets",{root_dir:N()});if(E!==U||!Ne)return;let S=Array.isArray(w?.qualified)?w.qualified:[],z=Array.isArray(w?.excluded)?w.excluded:[];k={qualified:S,excluded:z};for(let ue of S)ue&&typeof ue.id=="string"&&A.add(ue.id)}catch{E===U&&Ne&&(k={qualified:[],excluded:[]},de("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{E===U&&(M=!1,Ne&&Ce())}}function T(E){return Array.isArray(E.runs)?E.runs:[]}function L(){let E=D(),w=new Set;for(let S of Object.values(E.attempts||{})){let z=S;z&&typeof z.bead_id=="string"&&!Xh.has(z.status)&&w.add(z.bead_id)}for(let S of Array.isArray(E.pr_wait)?E.pr_wait:[])S&&typeof S.bead_id=="string"&&w.add(S.bead_id);for(let S of Object.values(E.discard_operations||{})){let z=S;z&&z.phase!=="done"&&typeof z.bead_id=="string"&&w.add(z.bead_id)}return w}function Q(E){return E.filter(w=>ye(w)===null)}function ye(E){let w=D();for(let S of Array.isArray(w.serial_lanes)?w.serial_lanes:[])if(Array.isArray(S?.entries)&&S.entries.some(z=>z.bead_id===E))return S.id;return(Array.isArray(w.queue)?w.queue:[]).some(S=>S.bead_id===E)?"parallel":null}function he(E,w){let S=c.get(E);return S||[...w.order]}function re(E){if(E.length<2)return!1;let w=ye(E[0]);if(!w||w==="parallel")return!1;let S=D(),z=(Array.isArray(S.serial_lanes)?S.serial_lanes:[]).find(oe=>oe.id===w)?.entries.map(oe=>oe.bead_id);if(!Array.isArray(z))return!1;let ue=E.map(oe=>z.indexOf(oe));return ue.every(oe=>oe>=0)&&ue.every((oe,te)=>te===0||oe>ue[te-1])}function Z(){let E=D(),w=Array.isArray(E.serial_lanes)?E.serial_lanes:[],S=w.find(z=>Array.isArray(z.entries)&&z.entries.length===0);return S?S.id:w[0]?.id||"s1"}function Re(E){let w=D().bead_titles||{};return typeof w[E]=="string"?w[E]:E}async function ke(E,w){if(!s||p)return null;p=!0,Ce();try{return await s(E,w)}finally{p=!1,Ce()}}async function ie(E){r?.setPending?.(!0);try{let w=await ke("worker-parallel-analysis-start",{force:E,target_ids:Array.from(A)});w&&w.applied===!1&&w.reason&&(w.reason==="target_not_qualified"&&Array.isArray(w.detail)?de(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${w.detail.join(", ")}`,"error",3200):de(`\uBD84\uC11D \uC2E4\uD328: ${w.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function ae(){let E=P().job;!s||!E||await s("worker-parallel-analysis-cancel",{job_id:E.job_id})}async function $e(E){if(!(!s||Y.has(E))){Y.add(E),Ce();try{let w=await s("worker-parallel-analysis-prompt",{root_dir:N(),run_id:E});if(!Ne)return;if(w?.ok===!0&&typeof w.prompt=="string"){V={run_id:E,prompt:w.prompt};return}de(w?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{Y.delete(E),Ce()}}}function j(){V=null,Ce()}async function ee(){if(!V)return;let E=await on(V.prompt);de(E?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",E?"success":"error",1400)}function le(E,w){a&&a(E,Oi(w))}function xe(){return D().runner_catalog}function Ae(E){return Object.keys(xe()?.runners?.[E]?.models||{})}function Pe(E){let w=Ae(E),S=xe()?.runners?.[E]?.default_model;return typeof S=="string"&&w.includes(S)?S:w[0]||""}function ge(){let E=P().settings,w=f||E.runner||"claude",S=Ae(w),z=f?Pe(w):E.model||S[0]||"",ue=Ii(xe(),w,z),oe=E.effort||"",te=ue.includes(oe)?oe:ue[0]||"";return{runner:w,model:z,effort:te,models:S,efforts:ue}}async function lt(E){let w=P().settings,S=await ke("worker-parallel-analysis-settings-update",{expected_revision:w.revision,runner:E.runner,model:E.model,effort:E.effort});(!S||S.applied!==!0)&&(f=null,Ce(),S&&S.reason&&de(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${S.reason}`,"error",2800))}function mt(E){f=E,Ce();let w=ge();lt({runner:E,model:w.model,effort:w.effort})}function R(E){let w=ge(),S=Ii(xe(),w.runner,E);lt({runner:w.runner,model:E,effort:S.includes(w.effort)?w.effort:S[0]||""})}function me(E){let w=ge();lt({runner:w.runner,model:w.model,effort:E})}async function we(E,w){if(!s||p)return;let S=he(E,w),z=P();if(S.length<2||!z.last_good){de("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let ue=d.get(E)||Z(),oe=()=>({snapshot_digest:z.last_good.identity_digest,group_index:E,lane:ue,ordered_bead_ids:S,expected_revision:D().revision});p=!0,Ce();try{let te=await s("worker-parallel-analysis-submit",oe());te&&te.queue&&n&&n.set(te.queue),te&&te.applied!==!0&&te.conflict===!0&&(te=await s("worker-parallel-analysis-submit",oe()),te&&te.queue&&n&&n.set(te.queue)),te&&te.applied===!0?(c.delete(E),de(`\uC9C1\uB82C \uB808\uC778 ${ue}\uC5D0 ${S.length}\uAC1C \uBC30\uCE58`,"success")):de(`\uC81C\uCD9C \uAC70\uBD80: ${te?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,Ce()}}function Le(E,w,S){c.set(E,he(E,w).filter(z=>z!==S)),Ce()}function Me(E){c.delete(E),Ce()}function Be(E,w,S,z){let ue=[...he(E,w)],oe=ue.indexOf(S),te=oe+z;oe<0||te<0||te>=ue.length||(ue.splice(te,0,...ue.splice(oe,1)),c.set(E,ue),Ce())}function W(){let E=P().settings,w=Object.keys(xe()?.runners||{}),S=ge();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${z=>mt(z.target.value)}
        >
          ${w.map(z=>l`<option
                value=${z}
                ?selected=${S.runner===z}
              >
                ${z}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${z=>R(z.target.value)}
        >
          ${S.models.map(z=>l`<option
                value=${z}
                ?selected=${S.model===z}
              >
                ${z}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${z=>me(z.target.value)}
        >
          ${S.efforts.map(z=>l`<option
                value=${z}
                ?selected=${S.effort===z}
              >
                ${z}
              </option>`)}
        </select>
      </label>
      ${K(E)}
    </div>`}function K(E){return!Ye(E)||De(E)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:E.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${E.runner}/${E.model} · effort
        ${E.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:E.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function De(E){return E.is_default===!0&&E.compatible===!1}function Ye(E){return!!(E.runner&&E.model&&E.effort)}function We(E){return Ye(E)&&E.compatible!==!1}function ve(E){let w=Math.max(0,Math.floor(E/1e3)),S=Math.floor(w/60),z=w%60;return`${S}:${String(z).padStart(2,"0")}`}function O(E){let w=E.job;if(w){let S=typeof w.started_at=="number"?w.started_at:0,z=`${w.runner||"?"}/${w.model||"?"}`,ue=S?` \xB7 \uACBD\uACFC ${ve(Date.now()-S)}`:"",oe=typeof w.session_id=="string"?w.session_id:"",te=T(E).find(rt=>rt.run_id===w.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${z} · effort ${w.effort||"?"}${ue}</span
        >
        ${oe?l`<code class="pa-session-id" title=${oe}
              >${oe.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>le(w.job_id,te||w)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${te?.prompt_saved!==!0||Y.has(w.job_id)}
          @click=${()=>{$e(w.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return J()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function H(E){let w=O(E);return w===""?"":l`<div class="pa__strip">${w}</div>`}function J(){return r?.isPending?.()===!0}function X(E){let w=!!E.job,S=We(E.settings),z=k!==null&&A.size===0,ue=w||p||J()||M;return l`<div class="pa-meta">
      ${E.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(E.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!S||ue||z}
        @click=${()=>{ie(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!S||ue||z}
        @click=${()=>{ie(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!w}
        @click=${()=>{ae()}}
      >
        취소
      </button>
    </div>`}function Oe(E){return typeof E=="string"&&E.length>0?E:"\uBBF8\uBC30\uCE58"}function et(E,w){w?A.add(E):A.delete(E),Ce()}function ot(E){let w=Array.isArray(E.scope)?E.scope:[],S=Array.isArray(E.overlaps)?E.overlaps:[];return w.length===0&&S.length===0?l``:l`<span class="pa-target__signals">
      ${w.length>0?l`<details class="pa-target__scope" title=${w.join(`
`)}>
            <summary>scope ${w.length}</summary>
            <ul>
              ${w.map(z=>l`<li><code>${z}</code></li>`)}
            </ul>
          </details>`:""}
      ${S.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${S.join(", ")}`}
            >겹침 ${S.join(", ")}</span
          >`:""}
    </span>`}function Xe(){let E=k?.qualified||[],w=k?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${M?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${E.length} \xB7 \uC81C\uC678 ${w.length}`}</span
        >
      </header>
      ${k&&E.length>0?l`<ul class="pa-targets__list">
            ${E.map(S=>l`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${S.id}
                      .checked=${A.has(S.id)}
                      @change=${z=>et(S.id,z.target.checked)}
                    />
                    <span class="pa-target__title">${S.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${ot(S)}
                    <span class="pa-target__route">${S.route}</span>
                    <span class="pa-target__lane"
                      >${Oe(S.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:k&&E.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${k&&w.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${w.length}</summary>
            <ul class="pa-targets__list">
              ${w.map(S=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${S.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Jh[S.reason]||S.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${Oe(S.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function vt(E){let w=typeof E.session_id=="string"&&E.session_id.length>0,S=w?E.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${E.outcome}"
        >${eb[E.outcome]||E.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(E.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${E.runner||"?"} / ${E.model||"?"} / ${E.effort||"?"}</span
      >
      ${w?l`<code class="pa-session-id" title=${S}
            >${S.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${E.outcome==="failure"&&E.reason?l`<span class="pa-run-row__reason">${E.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>le(E.run_id,E)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${E.prompt_saved!==!0||Y.has(E.run_id)}
          @click=${()=>{$e(E.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function gt(E){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${E.length>0?l`<ul class="pa-runs__list">
            ${E.map(w=>vt(w))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function at(){return V?l`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${j}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${V.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{ee()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${j}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${V.prompt}</pre
        >
      </section>
    </div>`:""}function ct(E,w){let S=he(E,w),z=L(),ue=S.filter(Qe=>z.has(Qe)),oe=Q(S),te=re(S),rt=Array.isArray(D().serial_lanes)?D().serial_lanes:[],Ze=d.get(E)||Z(),St=w.eligible!==!0||S.length<2||ue.length>0||oe.length>0||te||p;return l`<section class="pa-group" data-group-index=${String(E)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${w.confidence}</span>
        ${w.categories.map(Qe=>l`<span class="pa-group__category">${Qe}</span>`)}
        ${te?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${w.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${oe.length>0?l`<span class="pa-group__stale"
              >stale — ${oe.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${w.reason}</p>
      <ol class="pa-group__members">
        ${S.map((Qe,ft)=>l`<li class="pa-member" data-bead-id=${Qe}>
              <span class="pa-member__seq">${ft+1}</span>
              <span class="pa-member__title">${Re(Qe)}</span>
              ${z.has(Qe)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Qe}
                ?disabled=${ft===0}
                aria-label=${`${Qe} \uC704\uB85C`}
                @click=${()=>Be(E,w,Qe,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Qe}
                ?disabled=${ft===S.length-1}
                aria-label=${`${Qe} \uC544\uB798\uB85C`}
                @click=${()=>Be(E,w,Qe,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Qe}
                aria-label=${`${Qe} \uC81C\uC678`}
                @click=${()=>Le(E,w,Qe)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${w.evidence.map(Qe=>l`<li class="pa-evidence">
              <code>${Qe.path}</code>
              <span class="pa-evidence__locator">${Qe.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Me(E)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Qe=>{d.set(E,Qe.target.value),Ce()}}
          >
            ${rt.map((Qe,ft)=>l`<option
                  value=${Qe.id}
                  ?selected=${Ze===Qe.id}
                >
                  직렬 ${ft+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${St}
          @click=${()=>{we(E,w)}}
        >
          제출
        </button>
      </footer>
    </section>`}function wt(E){let w=Array.isArray(E.issues)?E.issues:[],S=w.filter(ue=>ue.verdict==="parallel_ok").length,z=w.filter(ue=>ue.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${S}</span>
      <span>uncertain ${z}</span>
    </div>`}function nt(){let E=Ne&&!!P().job;if(E&&g===null){g=setInterval(()=>Ce(),1e3);return}!E&&g!==null&&(clearInterval(g),g=null)}function Ce(){let E=P();f&&E.settings.runner===f&&(f=null);let w=E.last_good?.result;nt(),Ke(l`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${He}
            >
              ×
            </button>
          </header>
          ${H(E)}
          <div class="pa__body">
            ${W()} ${X(E)} ${Xe()}
            ${w?l`${w.groups.map((S,z)=>ct(z,S))}
                ${w.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${wt(w)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${gt(T(E))}
          </div>
        </div>
        ${at()}
      `,i)}let Ne=!1,ht=()=>{Ne=!1,V=null,U+=1,nt()},pt=E=>{E.target===E.currentTarget&&He()};i.addEventListener("close",ht),i.addEventListener("cancel",ht),i.addEventListener("click",pt);let G=null;n&&n.subscribe&&(G=n.subscribe(()=>{Ne&&Ce()}));let pe=null;r&&r.subscribe&&(pe=r.subscribe(()=>{Ne&&Ce()}));function je(){Ne||(Ne=!0,Ce(),B(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function He(){Ne&&(Ne=!1,V=null,U+=1,nt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:je,close:He,destroy(){Ne=!1,g!==null&&(clearInterval(g),g=null),i.removeEventListener("close",ht),i.removeEventListener("cancel",ht),i.removeEventListener("click",pt),G&&(G(),G=null),pe&&(pe(),pe=null),i.remove()}}}function lp(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let c=i.scope.filter(d=>typeof d=="string"&&d.length>0);if(c.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:c})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let c=Vo(s[a].scope,s[i].scope);if(c.length===0)continue;let d=s[a].member,p=s[i].member;n.get(d.id)?.overlaps.push({id:p.id,title:p.title,location_label:p.location_label,prefixes:c}),n.get(p.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:c})}return n}function Pi(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=r.kind!=="running",c=s.kind!=="running";if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&c&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&c&&a===null){let d=nb(n);return d===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${d} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:d,index:0},{bead_id:e,lane:d,index:1}]}}return!i&&!c?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function nb(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var cp=new Set(["sh","bash","zsh","dash","ksh"]),up=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function dp(e){let t=e.split("/");return t[t.length-1]||""}function rb(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=dp(n[0]);if(r!=="env")return cp.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&cp.has(dp(s))}function sb(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function ob(e){let t=[],n=0;up.lastIndex=0;for(let r of e.matchAll(up)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:sb(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function ab(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function pp(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",c=0,d=null,p=!1;function f(N,B){return B?ob(N).map(T=>T.kind==="plain"?T.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${T.kind}"
            >${T.text}</span
          >`):N}function g(){if(!s)return l``;let N=o==="ready"&&rb(a),B=o==="ready"?a.split(`
`):[];return l`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>D()}
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
              @click=${()=>D()}
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
                  ${B.map((T,L)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${L+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(T,N)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function k(){Ke(g(),r)}async function A(){if(o!=="ready")return;let N=await on(a);de(N?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",N?"success":"error")}function M(N){N.key==="Escape"&&s&&(N.preventDefault(),D())}function U(){p||(document.addEventListener("keydown",M),p=!0)}function V(){p&&(document.removeEventListener("keydown",M),p=!1)}async function Y(N,B=null){let T=++c;U(),s={...N},d=B||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",k(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let Q=t?t():"";if(!Q){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",k();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",k();return}let ye="/api/repo-ops-script?workspace="+encodeURIComponent(Q)+"&lane="+encodeURIComponent(N.lane)+"&base_sha="+encodeURIComponent(N.base_sha);try{let he=await n(ye),re=await he.json().catch(()=>({}));if(T!==c)return;if((t?t():"")!==Q){D();return}if(!he.ok||!re||re.ok!==!0){o="error",i=ab(re&&typeof re.error=="string"?re.error:""),k();return}s={lane:re.lane,base_sha:re.base_sha,path:re.path,base_ref:re.base_ref},a=String(re.content),o="ready",k()}catch{if(T!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",k()}}function D(){c+=1,V(),s=null,a="",k();let N=d;d=null,N?.isConnected&&N.focus()}function P(){D(),r.remove()}return{open:Y,close:D,destroy:P}}function fp(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let T=o();return typeof T.revision=="number"?T.revision:0}function i(T){t&&T&&T.queue&&typeof T.queue=="object"&&t.set(T.queue)}function c(){let T=o().workspace_info;return T&&typeof T=="object"?T:{}}function d(T,L){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${T}"
      >${L}</span
    >`}function p(T){if(typeof T!="number"||!Number.isFinite(T))return"";let L=T/6e4;return Number.isInteger(L)?`timeout ${L}\uBD84`:`timeout ${Math.round(T/1e3)}\uCD08`}function f(T){let L=p(T);return L?d("config",L):""}function g(T,L,Q){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${Q.script}
      @click=${ye=>{s&&s({lane:T,base_sha:L.base_sha,path:Q.script,base_ref:L.base_ref},ye.currentTarget)}}
    ></button>`}function k(){let T=o().repo_ops_opt_out;return{verify:T?.verify===!0,deploy:T?.deploy===!0}}function A(T,L){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!L}
        @change=${Q=>{Y(T,!Q.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function M(T){let L=typeof T.base_sha=="string"?T.base_sha:"",Q=`${T.source_path||"repo-ops/config.toml"} @ ${T.base_ref||"?"}${L?`@${L.slice(0,7)}`:""}`,ye=k(),he=!!T.verify&&ye.verify,re=!!T.deploy&&ye.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${Q}</span>
      </p>
      <div
        class="worker-repo-ops__lane${he?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${T.verify?l`${g("verify",T,T.verify)}
              ${f(T.verify.timeout_ms)}
              ${he?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${he?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":T.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${T.verify?A("verify",ye.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${re?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${T.deploy?l`${g("deploy",T,T.deploy)}
              ${f(T.deploy.timeout_ms)}
              ${re?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${re?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":T.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${T.deploy?A("deploy",ye.deploy):""}
      </div>
    </section>`}function U(T){let L=T.repo_ops&&typeof T.repo_ops=="object"?T.repo_ops:null;return L&&(L.status==="resolved"||L.status==="absent")?M(L):L&&(L.status==="pending"||L.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${L.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${L.error_code?l` — <code>${L.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function V(T){if(!n)return;let L=await n("worker-auto-repair-toggle",{on:T,expected_revision:a()});if(i(L),L&&L.conflict){let Q=await n("worker-auto-repair-toggle",{on:T,expected_revision:a()});i(Q)}r()}async function Y(T,L){if(!n)return;let Q=await n("worker-repo-ops-opt-out-toggle",{kind:T,opted_out:L,expected_revision:a()});if(i(Q),Q&&Q.conflict){let ye=await n("worker-repo-ops-opt-out-toggle",{kind:T,opted_out:L,expected_revision:a()});i(ye)}r()}let D={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function P(T,L,Q){return l`<div class="worker-repo-ops__policy-group" data-policy=${Q}>
      <div class="worker-repo-ops__policy-label">${T}</div>
      <ul class="worker-repo-ops__policy-list">
        ${L.map(ye=>l`<li data-token=${ye}>
              ${D[ye]||ye}
            </li>`)}
      </ul>
    </div>`}function N(T){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${T.map(L=>{let Q=[D[L.trigger]||L.trigger];return Number.isInteger(L.attempts_per_operation_attempt)?Q.push(`operation\uB2F9 ${L.attempts_per_operation_attempt}\uD68C`):Number.isInteger(L.attempts)?Q.push(`${D[L.budget]||L.budget} ${L.attempts}\uD68C`):Number.isInteger(L.sessions_per_user_action)&&Q.push(`${L.sessions_per_user_action}\uD68C`,D[L.user_actions]||L.user_actions),L.applies_when&&Q.push(D[L.applies_when]||L.applies_when),l`<li data-token=${L.id}>
            <strong>${D[L.id]||L.id}</strong>
            <span>${Q.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function B(){let T=o(),L=T.auto_repair!==!1,Q=T.repo_operation_policy&&typeof T.repo_operation_policy=="object"?T.repo_operation_policy:null,ye=Array.isArray(T.repo_operations)?T.repo_operations:[],he=ye.find(ke=>ke.state==="repairing"),re=ye.filter(ke=>ke.state==="failed"||ke.state==="repairing"),Z=re.length?Math.min(...re.map(ke=>typeof ke.repair?.remaining=="number"?ke.repair.remaining:0)):Q?.auto_repair?.resolution_ladder?.find(ke=>ke.id==="auto_repair_session")?.attempts??1,Re=Array.isArray(Q?.auto_repair?.resolution_ladder)?Q.auto_repair.resolution_ladder:[];return l`<section
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
          .checked=${L}
          @change=${ke=>{V(ke.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${L?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
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
      ${Q?l`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(Q.worker_automatic||[]).length} · 해결 사다리
                ${Re.length} · 금지
                ${(Q.never_automatic||[]).length}</span
              >
            </summary>
            ${P("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",Q.worker_automatic||[],"worker-automatic")}
            ${Q.supported===!1||Q.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${Q.schema_version})`}
                </div>`:N(Re)}
            ${P("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",Q.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${U(c())} ${B()}
      </details>`}}}var hp=20,ib=5,lb=new Set(["failed","repairing","running","queued","retry_pending"]),_p={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},mp={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function cb(e,t,n=hp){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function ub(e){if(e.type==="cleanup")return!0;let t=e.operation;return lb.has(t.state)&&!t.dismissed&&!t.superseded_by}function db(e,t,n={}){let r=cb(e,t,1/0),s=n.expanded===!0?hp:ib,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||ub(i));return{visible:a,hidden:r.length-a.length}}function gp(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function pb(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function bp(e){let t=e.filter(n=>n.value);return t.length===0?"":l`<details class="worker-ev__details">
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
  </p>`}function fb(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return l`<div class="worker-ev__acts">
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
  </div>`}function _b(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return l`<li
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
          >${pb(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?yp(Ju(t.failure_kind,r)):""}
      ${fb(t)}
      ${bp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${No(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function mb(e){let t=e.cleanup,n=pr(t.step);return l`<li
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
  </li>`}function gb(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?mb(r):_b(r))}
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
  </section>`}function vp(e,t={}){let n=null;function r(){if(n===null){Ke(l``,e);return}let a=db(n.operations,n.cleanup_failures,{expanded:n.expanded});Ke(gb({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var hb=Et("views:worker"),bb="tab:worker:ready",yb="tab:worker:blocked",vb="tab:worker:in-progress",wb="tab:worker:resolved",kb="tab:worker:closed",Xo=1,wp=5;function kp(e){return Ao(e).path.length>0}var $b=new Set(["quick_fix","spec_backed","full_plan"]);function $p(e){return typeof e=="string"&&$b.has(e)}var Ep="beads-ui.worker.candidate-filter",Mi={show_blocked:!1,spec:"all"};function xb(){try{let e=window.localStorage.getItem(Ep);if(!e)return{...Mi};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Mi};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Mi}}}function Ab(e){try{window.localStorage.setItem(Ep,JSON.stringify(e))}catch{}}function Sb(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=n(i),d=r(i);c&&d?s.push(i):!c&&d?o+=1:c&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Eb=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Tp="bdui.worker.candidate_sort",Tb=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Jo="spec";function Cb(){try{let e=window.localStorage.getItem(Tp);return e==="board"||e==="created"||e==="spec"?e:Jo}catch{return Jo}}function Rb(e){try{window.localStorage.setItem(Tp,e)}catch{}}var Cp="bdui.worker.done-range";function Lb(){try{let e=window.localStorage.getItem(Cp);return un(e)?e:rn}catch{return rn}}function Ib(e){try{window.localStorage.setItem(Cp,e)}catch{}}var Ob="(max-width: 640px)",Rp="beads-ui.worker.lane-collapsed",Es={queue:!0,done:!0};function Pb(){try{let e=window.localStorage.getItem(Rp);if(!e)return{...Es};let t=JSON.parse(e);return!t||typeof t!="object"?{...Es}:{queue:typeof t.queue=="boolean"?t.queue:Es.queue,done:typeof t.done=="boolean"?t.done:Es.done}}catch{return{...Es}}}function Mb(e){try{window.localStorage.setItem(Rp,JSON.stringify(e))}catch{}}function xp(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Db(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(ar):(r.sort(Ys(n)),t==="board"?r:[...r.filter(kp),...r.filter(s=>!kp(s))])}function Nb(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function qb(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function Ap(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Fb(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function jb(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Bb(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Ub(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Wb(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Di(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function zb(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,n=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,r=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=r&&typeof r.pr_number=="number"?r.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${n}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),r&&typeof r.bead_id=="string"&&a.push(`repair ${r.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:r&&typeof r.pr_url=="string"?r.pr_url:"",repair_pr_number:s}}function Sp(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Hb(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.head_review&&e.head_review.state!=="failed")return n("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Sp(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Sp(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=Fb(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Ap(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Ap(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Gb(e,t,n,r,s=null,o=null,a=null,i=!1,c=null,d=!0,p=null,f=null,g=null,k={},A=!1,M=!1,U={}){let V=!!c&&c.position>0,Y=!!c?.continuation_action&&c.continuation_action.continuation===null,D=!!c&&c.active===!0,P=c&&c.failure||null,N=Bb(c?c.waiting:null,g),B=n[e]||null,T=B&&B.gate?B.gate:null,L=B&&B.pr?B.pr:null,Q=zb(g),ye=Ub(c?c.resolution:null),he=Wb(c?c.head_review:null),re=c&&c.head_review||null,Z=c&&c.authority||null,Re=!!re&&["pending","reviewing","revising"].includes(re.state),ke=V&&!D&&(re?.state==="failed"||!Z||Z.source==="automatic"&&!M),ie=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ye?ye.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":N,ae=!!T&&T.base_badge==="\uCDA9\uB3CC",$e=!!T&&T.enabled===!0,j=As({bead_id:e,merge_sha:U.merge_sha,cleanup_cursor:U.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:U.repo_operations}),ee=Zo(j),le=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!T&&T.tier==="merged",xe=i&&!!r&&!!T&&T.tier==="merged",Ae=ke&&($e||ae||T?.reason==="base_behind"||T?.reason==="review_receipt_missing"||T?.reason==="review_receipt_stale"||le||xe),Pe=i&&ae&&d===!1,ge=Sn(k,e,{external:i,merge_active:D||j?.step==="merge",merge_queued:V,conflict_active:!!a,cleanup_active:ee,merged:!!r||T?.tier==="merged"}),lt=!!ge.operation,mt=!le&&!!r&&r.step==="repo_operations",R=Hb({continuation_required:Y,merge_step:j,conflict_badge:ie,conflict_live:ye?.live===!0||a==="running",head_review:re&&he?{...he,state:re.state,failure_reason:re.failure_reason}:null,recovery:Q,cleanup_failed:r,cleanup_label:r?pr(r.step):null,base_exception:f,conflicting:ae,gate:T,receipt_check:B&&B.receipt_check?B.receipt_check:null,queue_failure:P,auto_skip:p,queued:V,queue_active:D,queue_position:c?c.position:0,activity:ie?null:o&&o.activity||null}),me=R?.live===!0&&R.title?l`<span title=${R.title}>${R.label}</span>`:R?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:r&&j?.active!==!0?Yo(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:A,external:i,pr_number:L&&typeof L.number=="number"?L.number:null,pr_url:L&&typeof L.url=="string"?L.url:"",completion_badge:R?.live!==!0&&R?.title?R.label:null,completion_title:R?.title||"",completion_repair_pr_url:Q?Q.repair_pr_url:"",completion_repair_pr_number:Q?Q.repair_pr_number:null,badges:me?[me]:[],live_badge:R?.live===!0?me:null,usage:s,alert:R?.alert===!0,merge_action:T?.tier==="merged"&&!le&&!xe||mt?!1:!V||Y||ke,timeline_action:mt,cancel_action:V&&!Y,cancel_enabled:(!D||Re)&&!(Q&&Q.lock_actions),cancel_title:Q&&Q.lock_actions?`${Q.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:D&&!Re?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Re?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ge,discard_action:ge.action,merge_step:j,discard_enabled:ge.enabled,discard_title:ge.title,merge_enabled:!j&&!a&&!lt&&!f&&!(Q&&Q.lock_actions)&&!Pe&&!mt&&($e||ae||T?.reason==="base_behind"||T?.reason==="review_receipt_missing"||T?.reason==="review_receipt_stale"||le||xe||Ae),merge_label:Y?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":le||xe?"\uC815\uB9AC \uC7AC\uAC1C":ae&&!j&&!le?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":T?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":T?.reason==="review_receipt_missing"||T?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ke?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:lt?ge.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ge.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ge.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Y?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":j?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${j.label}`:xe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Pe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ae?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":T?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":T?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":T?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":T?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":$e?`\uBA38\uC9C0 (${T.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:T&&T.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${T&&T.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ni(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:d,doneRange:p,onDoneRangeChange:f}=t,g=r?Qs(r,i):null,k=to({transport:n,uiOrderStore:i}),A=null,M=[],U=xb(),V=null,Y=null,D={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},P=Cb(),N=un(p)?p:Lb(),B=new Map;function T(){let u=jn.find(m=>m.value===N);return u?u.label:"\uC624\uB298"}let L=Pb(),Q=!1,ye=new Set,he=new Set,re=new Set,Z=new Set,Re=new Set,ke={},ie=null,ae=0,$e=null,j=[];function ee(u){return ie===u?ke:{}}async function le(){if(!n)return;let u=d?.()||"";if(ie===u||$e&&$e.key===u&&$e.generation===ae)return;let m=++ae;$e={key:u,generation:m};let v=null;try{v=await Promise.resolve(n("get-session-defaults",{}))}catch(F){if(m!==ae)return;$e=null,hb("get-session-defaults failed: %o",F),Ue();return}m===ae&&(ke=v&&typeof v.values=="object"&&v.values!==null?{...v.values}:{},ie=u,$e=null,Ue())}function xe(){ie=null,ae+=1,le()}let Ae=document.createElement("div");Ae.className="worker-console";let Pe=document.createElement("div");Pe.className="worker-top";let ge=document.createElement("div");ge.className="worker-drawer-overlay",ge.hidden=!0;let lt=document.createElement("div");lt.className="worker-drawer-overlay__backdrop";let mt=document.createElement("div");mt.className="worker-drawer-host";let R=document.createElement("div");R.className="worker-drawer-host",R.hidden=!0,ge.append(lt,mt,R);let me=document.createElement("div");me.className="worker-lanes-host",Ae.append(Pe,ge,me),e.appendChild(Ae);let we=null,Le=null,Me=Mr(mt,{transport:n,sessionLogStore:a,onClose:()=>{we=null,Le=null,ge.hidden=!0,Ue()}}),Be=vp(R,{onClose:()=>{R.hidden=!0,ge.hidden=!0,Ue()}}),W=pp({getWorkspacePath:d||(()=>"")}),K=d&&d()||"",De=fp({queueStore:s,transport:n,onChanged:()=>Ue(),onOpenScript:(u,m)=>{W.open(u,m)}}),Ye=o?ip(Ae,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:d,onOpenTranscript:(u,m)=>$(u,m)}):null;function We(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Xo,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ve(){let u=We(),m=typeof u.serial_lane_count=="number"&&Number.isInteger(u.serial_lane_count)&&u.serial_lane_count>0?Math.min(u.serial_lane_count,5):0,v=Array.isArray(u.serial_lanes)?u.serial_lanes:[],F=[];for(let Ee of v){if(F.length>=m)break;!Ee||typeof Ee.id!="string"||!/^s[1-5]$/.test(Ee.id)||!Array.isArray(Ee.entries)||F.push({id:Ee.id,label:`\uC9C1\uB82C ${Ee.id.slice(1)}`,count:Ee.entries.length})}return F.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(u.queue)?u.queue:[]).length},...F]}function O(u){if(!V||!u.some(v=>v.id===V))return null;let m=ve();return m?{bead_id:V,lanes:m}:null}function H(){let u=We();return typeof u.revision=="number"?u.revision:0}function J(u){u&&u.queue&&s&&s.set(u.queue)}function X(){let u=We().queue;return Array.isArray(u)?u.length:0}async function Oe(u,m,v){if(!n)return;let F=()=>({bead_id:u,...m==="parallel"?{}:{lane:m},...v===void 0?{}:{index:v},expected_revision:H()}),fe=await n("worker-queue-place",F());J(fe),fe&&fe.conflict&&await n("worker-queue-place",F()).then(J)}async function et(u,m,v){if(!n)return;let F=()=>({bead_id:u,...m==="parallel"?{}:{lane:m},to_index:v,expected_revision:H()}),fe=await n("worker-queue-reorder",F());J(fe),fe&&fe.conflict&&await n("worker-queue-reorder",F()).then(J)}async function ot(u){if(!n)return;let m=await n("worker-queue-remove",{bead_id:u,expected_revision:H()});J(m),m&&m.conflict&&await n("worker-queue-remove",{bead_id:u,expected_revision:H()}).then(J)}async function Xe(u){if(!n||!u)return;let m=await n("worker-attempt-pause",{attempt_id:u});m&&m.paused===!1&&m.reason&&de(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function vt(u){if(!n||!u)return;let m=await Lr();if(m===null)return;let v=async(fe={})=>await n("worker-attempt-resume",{attempt_id:u,expected_revision:H(),...m!==""?{instructions:m}:{},...fe}),F=await v();J(F),F&&F.conflict&&(F=await v(),J(F)),F=await Cn(F,(fe,Ee)=>v({continuation:fe,decision_token:Ee}),{onResult:J,refresh:()=>v()}),F&&F.resumed===!1&&!F.conflict&&F.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${F.reason}`,"error",2400)}async function gt(u){if(!n||!u)return;let m=await n("worker-attempt-dismiss",{attempt_id:u,expected_revision:H()});J(m),m&&m.conflict&&(m=await n("worker-attempt-dismiss",{attempt_id:u,expected_revision:H()}),J(m)),m&&m.dismissed===!1&&!m.conflict&&m.reason&&de(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function at(u,m,v=!0){if(!n)return null;let F=n,fe=await F(u,{...m,expected_revision:H()});return J(fe),fe&&fe.conflict&&v&&(fe=await F(u,{...m,expected_revision:H()}),J(fe)),fe}async function ct(u){if(!n||!u)return;let m=We().merge_queue?.find(F=>F.bead_id===u)?.continuation_action;if(m?.mismatch&&m.continuation===null){await nt(u,m.mismatch);return}ye.add(u),Ue();let v;try{v=await at("worker-merge-queue-add",{bead_id:u})}catch{de("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ye.delete(u),Ue()}if(!(!v||v.applied)){if(v.conflict){de("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}de(jb(v.reason),"error",2400)}}async function wt(u){if(!(!n||!u||he.has(u))){he.add(u),Ue();try{let m=await n("worker-cleanup-retry",{bead_id:u,expected_revision:H()});J(m),m&&!m.retried&&!m.conflict&&m.reason&&de(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${m.reason}`,"error",2400)}finally{he.delete(u),Ue()}}}async function nt(u,m){let v=await Cn({continuation_mismatch:m},(fe,Ee)=>at("worker-merge-queue-add",{bead_id:u,continuation:fe,decision_token:Ee},!1)),F=v?.queue?.merge_queue?.find(fe=>fe.bead_id===u)?.continuation_action;if(v?.applied!==!0&&F?.continuation===null&&F.mismatch){await nt(u,F.mismatch);return}v&&v.applied===!1&&!v.conflict&&de("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ce(u){if(!n)return;let m=await at("worker-merge-auto-toggle",{on:u});!m||m.conflict||de(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function Ne(u){if(!n||!u)return;let m=await at("worker-merge-queue-remove",{bead_id:u});m&&!m.conflict&&!m.applied&&m.reason==="merge_active"&&de("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function ht(){await at("worker-merge-queue-remove",{all:!0})}async function pt(u,m=null,v="unmerged",F=null){if(!n||!u)return;let fe=ws(u,v);if(!(!!F||typeof globalThis.confirm!="function"||globalThis.confirm(fe)))return;let Se=await n("worker-discard",{bead_id:u,...m?{attempt_id:m}:{},...F?{operation_id:F}:{},expected_revision:H()});if(J(Se),Se&&Se.conflict&&(Se=await n("worker-discard",{bead_id:u,...m?{attempt_id:m}:{},...F?{operation_id:F}:{},expected_revision:H()}),J(Se)),Se&&Se.discarded===!0){de(jo(Se),"success",5e3);return}if(Se&&Se.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${Se.reason}`,"error",2800);return}if(Se&&Se.accepted&&Se.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Se&&Se.accepted&&!Se.discarded){de(`\uD3D0\uAE30 \uC9C4\uD589: ${Se.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Se&&!Se.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function G(u,m,v){if(!(!n||!m||!v||Z.has(m))){Z.add(m),Ue();try{let F=await n(u,{bead_id:m,action_id:v,expected_revision:H()});J(F),F?.conflict?de("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!F?.ok&&F?.reason&&de(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(F.reason)}`,"error",2800)}finally{Z.delete(m),Ue()}}}async function pe(u,m){if(!n||!m||re.has(m))return;re.add(m),Ue();let v;try{let F=async(fe={})=>await n(u,{bead_id:m,expected_revision:H(),...fe});v=await F(),J(v),v&&v.conflict&&(v=await n(u,{bead_id:m,expected_revision:H()}),J(v)),u==="worker-revise-fix"&&(v=await Cn(v,(fe,Ee)=>F({continuation:fe,decision_token:Ee}),{onResult:J,refresh:()=>F()}))}finally{re.delete(m),Ue()}if(!(!v||v.conflict)){if(v.ok){de(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}de(`\uCC98\uBD84 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}}async function je(u){if(!n)return;let m=await n("worker-automation-toggle",{on:u,expected_revision:H()});J(m),m&&m.conflict&&await n("worker-automation-toggle",{on:u,expected_revision:H()}).then(J)}async function He(u){if(!n||!u)return;let m=await n("worker-repo-operation-repair",{operation_id:u});if(J(m),m&&m.ok===!1){de(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${m.reason||""}`,"error",3e3);return}m&&m.ok===!0&&de("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function E(u){if(!n||!u)return;let m=await n("worker-repo-operation-dismiss",{operation_id:u});J(m),m&&m.ok===!1&&de(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${m.reason||""}`,"error",3e3)}async function w(u){if(!n||!Number.isFinite(u))return;let m=Math.max(Xo,Math.floor(u)),v=await n("worker-queue-set-slots",{slots:m,expected_revision:H()});J(v),v&&v.conflict&&await n("worker-queue-set-slots",{slots:m,expected_revision:H()}).then(J)}async function S(u){if(!n||!Number.isInteger(u)||u<1||u>wp)return;let m=We(),v=(Array.isArray(m.serial_lanes)?m.serial_lanes:[]).slice(u).reduce((Ee,Se)=>Ee+(Array.isArray(Se?.entries)?Se.entries.length:0),0),F=()=>({count:u,expected_revision:H()}),fe=await n("worker-queue-set-serial-lane-count",F());J(fe),fe&&fe.conflict&&(fe=await n("worker-queue-set-serial-lane-count",F()),J(fe)),fe&&fe.applied&&v>0&&de(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${v}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let z="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function ue(u,m){let v=Pi(u,m.id,D);return{id:m.id,title:m.title,location_label:m.location_label,prefixes:m.prefixes,action:v.kind==="note"?{kind:"note",text:v.text}:v.kind==="disabled"?{kind:"disabled",label:z,title:v.title}:{kind:"place",label:z,title:v.title}}}function oe(u,m){if(!Y||Y.bead_id!==u)return null;let v=Y.counterpart_id,F=v===null?m:m.filter(fe=>fe.id===v);return F.length===0?null:{rows:F.map(fe=>ue(u,fe))}}async function te(u,m){let v=Pi(u,m,D);if(Y=null,v.kind!=="ops"){Ue();return}let F=H();for(let fe of v.ops){let Ee=await rt(fe,F);if(Ee===null)break;F=Ee}Ue()}async function rt(u,m){if(!n)return null;try{let v=await n("worker-queue-place",{bead_id:u.bead_id,lane:u.lane,index:u.index,expected_revision:m});if(J(v),v&&v.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!v||v.applied!==!0)return de(v&&typeof v.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${v.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let F=v.queue?v.queue.revision:void 0;return typeof F!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):F}catch(v){return de(v instanceof Error&&v.message?v.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function Ze(){let u=We(),m=g?g.selectBoardColumn(bb,"ready"):[],v=g?g.selectBoardColumn(yb,"blocked"):[],F=g?g.selectBoardColumn(kb,"closed"):[],fe=g?g.selectBoardColumn(vb,"in_progress"):[],Ee=g?g.selectBoardColumn(wb,"resolved"):[],Se=Js([...m,...v,...fe,...Ee,...F]),ze=new Map;for(let _ of[...m,...v,...fe])_&&_.id&&!ze.has(_.id)&&ze.set(_.id,_);let ut={...ee(d?.()||"")};for(let _ of["orchestration_model","orchestration_effort","orchestration_speed"]){let q=u[_];typeof q=="string"&&(ut[_]=q)}function jt(_,q){let se=ze.get(_);if(!se)return null;let Ge=se.metadata&&typeof se.metadata=="object"?se.metadata:{},st=se.workflow?.route,Dt=Ge.route,Ot=$p(st)?st:$p(Dt)?Dt:null;return en({pin:Ge,global:ut,execution_defaults:u.execution_defaults??null,runner_catalog:u.runner_catalog??null,route:Ot,controller_runtime:q})}function nn(_){let q=_.runner||null,se=jt(_.bead_id,q),Ge=Wo(_),st=se?Kn(se,q):null;return Ge||st?{orchestration:Ge,worker:st}:null}let qn=new Map;function zr(_){if(qn.has(_))return qn.get(_)??null;let q=jt(_,null),se=null;if(q){let Ge=vn(u.runner_catalog??null,q.orchestration_model.value??""),st=Ge===null?q:jt(_,Ge),Dt=dr(st,u.runner_catalog??null),Ot=Kn(st,Ge);se=Dt||Ot?{orchestration:Dt,worker:Ot}:null}return qn.set(_,se),se}function fr(_){let q=eo(Se,_);return q.total===0?null:q}let Bi=u.bead_titles||{},Qt=new Map;for(let[_,q]of Object.entries(Bi))typeof q=="string"&&q.length>0&&Qt.set(_,q);for(let _ of[...m,...v])Qt.set(_.id,_.title||_.id);let Hr=new Map;for(let _ of[...m,...v,...fe,...Ee,...F])_&&_.id&&typeof _.from_id=="string"&&Hr.set(_.id,_.from_id);let Ts=u.bead_times&&typeof u.bead_times=="object"&&!Array.isArray(u.bead_times)?u.bead_times:{},Cs=u.bead_labels&&typeof u.bead_labels=="object"&&!Array.isArray(u.bead_labels)?u.bead_labels:{},kn=u.bead_workflow&&typeof u.bead_workflow=="object"&&!Array.isArray(u.bead_workflow)?u.bead_workflow:{},Fn=new Map;for(let[_,q]of Object.entries(Cs))Array.isArray(q)&&Fn.set(_,Li(q));for(let _ of[...m,...v]){let q=_.labels;Array.isArray(q)&&!Fn.has(_.id)&&Fn.set(_.id,Li(q))}let _r=new Map,mr=o?.get()?.last_good?.result?.groups;for(let _ of Array.isArray(mr)?mr:[]){if(_?.eligible!==!0||!Array.isArray(_.members))continue;let q=_.members.map(Ge=>{let st=(Array.isArray(u.serial_lanes)?u.serial_lanes:[]).find(Dt=>Dt.entries.some(Ot=>Ot.bead_id===Ge));return st?st.id:null});if(!(q.every(Ge=>Ge!==null)&&new Set(q).size===1))for(let Ge of _.members)_r.set(Ge,_.members.filter(st=>st!==Ge))}let Rs=u.bead_blocked_by&&typeof u.bead_blocked_by=="object"&&!Array.isArray(u.bead_blocked_by)?u.bead_blocked_by:{},gr=new Map;for(let[_,q]of Object.entries(Ts))q&&typeof q=="object"&&gr.set(_,q);for(let _ of[...m,...v])gr.set(_.id,{created_at:_.created_at,updated_at:_.updated_at});let Qn=_=>gr.get(_)||{},Xn=u.pr_wait||[],hr=u.pr_observations||{},Ls=u.pr_activity||{},Fe=u.cleanup_failed||{},dt=Object.entries(Fe).map(([_,q])=>({bead_id:_,step:q&&q.step?q.step:"",reason:q&&q.reason?q.reason:"",at:q&&typeof q.at=="number"?q.at:null,detail:q&&typeof q.detail=="string"?q.detail:null,output_tail:q&&typeof q.output_tail=="string"&&q.output_tail?q.output_tail:void 0,log_path:q&&typeof q.log_path=="string"&&q.log_path?q.log_path:void 0,retry_count:q&&typeof q.retry_count=="number"&&Number.isInteger(q.retry_count)&&q.retry_count>0?q.retry_count:0,failure_code:q&&typeof q.failure_code=="string"?q.failure_code:void 0,subject_id:q&&typeof q.subject_id=="string"?q.subject_id:void 0,repair_eligible:!!(q&&q.repair_eligible),repair:q&&q.repair?q.repair:void 0})),Xt=u.queue||[],Ui=new Set([...Xt.map(_=>_.bead_id),...(Array.isArray(u.serial_lanes)?u.serial_lanes:[]).flatMap(_=>(Array.isArray(_?.entries)?_.entries:[]).map(q=>q.bead_id)),...Xn.map(_=>_.bead_id),...u.done.map(_=>_.bead_id)]),Wp=new Set(v.map(_=>_.id)),zp=i?i.get()?.order||{}:{},Wi=new Set,zi=[];for(let _ of[...m,...v])Ui.has(_.id)||Wi.has(_.id)||Nb(_)||(Wi.add(_.id),zi.push(_));M=Db(zi,P,zp);let Hp=u.admission||{},Hi=_=>{let q=Hp[_];if(!q)return"";if(q.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let se=typeof q.reason=="string"?q.reason:"",Ge=se.indexOf(":");return Ge>0&&Ge<se.length-1?`\u26D4 ${se.slice(0,Ge)} (${se.slice(Ge+1)})`:`\u26D4 ${se}`},Gp=M.map(_=>{let q=Ao(_),se=q.path.length>0,Ge=_.workflow?.route==="quick_fix"||_.metadata&&_.metadata.route==="quick_fix",st=!Object.hasOwn(_,"description")||typeof _.description=="string"&&_.description.trim().length>0,Dt=Object.hasOwn(_,"labels")&&ap(_.labels),Ot=!Dt&&(Ge?st:se&&!q.conflict),$t=Wp.has(_.id),mn=[];$t&&mn.push(qb(_)),Ge&&!st?mn.push("missing_description"):!Ge&&q.conflict?mn.push("spec_id_conflict"):!Ge&&!se&&mn.push("spec \uC5C6\uC74C");let js=Hi(_.id);return js&&mn.push(js),{id:_.id,title:_.title||_.id,reason:mn.join(" \xB7 "),draggable:Ot,lane:"candidate",created_at:_.created_at,updated_at:_.updated_at,workflow:_.workflow,is_quick_fix:Ge,status:_.status,worker_ineligible:Dt,blocked:$t,has_spec:se,exec_chips:zr(_.id),from_id:_.from_id||void 0}}),ea=Sb(Gp,U),ta=ea.visible,Vp=u.revise_parked||{},Is=u.discard_operations&&typeof u.discard_operations=="object"&&!Array.isArray(u.discard_operations)?u.discard_operations:{},na=(_,q)=>_.map((se,Ge)=>{let st=q!=="done",Dt=q!=="done"&&q!=="queue",Ot=st?Vp[se.bead_id]:null,$t=st?Sn(Is,se.bead_id):null,mn=$t?.operation?$t:null,js=st&&Fn.get(se.bead_id)===!0,wl=Rs[se.bead_id]||[],da=u.admission&&typeof u.admission=="object"?u.admission[se.bead_id]:null,pa=st?Ku(da,!!mn||Z.has(se.bead_id)):null,rf=st&&!pa?Hi(se.bead_id):null,sf=st?[rf]:[],kl=st&&wl.length>0&&typeof da?.reason=="string"&&da.reason.startsWith("not_ready")?[`\u23F8 ${wl.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],fa=st?_r.get(se.bead_id):void 0;return fa&&fa.length>0&&kl.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${fa.join(", ")}\uC640`),{id:se.bead_id,title:Qt.get(se.bead_id)||se.bead_id,reason:sf.filter(Boolean).join(" \xB7 "),draggable:st&&!mn&&!pa,done:q==="done",lane:q,seq:Dt?Ge+1:void 0,worker_serial:js,discard:mn,stale_work:pa,badges:[...kl,...Ot?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Ot,revise_action:!!Ot,revise_enabled:!!Ot&&!mn&&!re.has(se.bead_id),revise_title:Ot?Ot.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ot.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:q==="done"?dn(u.attempts||{},se.bead_id):null,work_ms:q==="done"?qo(u.attempts||{},se.bead_id):null,done_at:q==="done"&&typeof se.added_at=="number"?se.added_at:void 0,exec_chips:st?zr(se.bead_id):null,workflow:st&&kn[se.bead_id]||null,from_id:Hr.get(se.bead_id)||void 0,...Qn(se.bead_id)}}),br=u.attempts?Object.values(u.attempts):[],ra=new Set;for(let _ of br)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&ra.add(_.resumed_from);let Gi=new Map;for(let _ of br)Gi.set(_.bead_id,_.attempt_id);let Os=new Map;for(let _ of br)Os.set(_.attempt_id,_);function sa(_){let q=new Set,se=_;for(;se&&!q.has(se.attempt_id);){if(se.conflict_resolution===!0)return!0;q.add(se.attempt_id),se=typeof se.resumed_from=="string"&&se.resumed_from.length>0&&Os.get(se.resumed_from)||null}return!1}let Ps=typeof u.declared_base=="string"?u.declared_base:null;function Kp(_){let q=null;for(let se of br)!se||se.bead_id!==_||sa(se)||(q===null||(typeof se.started_at=="number"?se.started_at:0)>=(typeof q.started_at=="number"?q.started_at:0))&&(q=se);return q&&typeof q.target_base=="string"?q.target_base:null}let oa=[],Ms=[],Yp=op(u),Vi=_=>{let q=typeof _.session_id=="string"&&_.session_id.length>0,se=ra.has(_.attempt_id);return{eligible:q&&!se,reason:q?se?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},_n=null;for(let _ of br){let q=_.status==="paused"&&!ra.has(_.attempt_id);if(_.status==="running"||q)Ms.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:Qt.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,paused:q,conflict_resolution:sa(_),base_exception:Di(Ps,_.target_base),can_pause:typeof _.session_id=="string"&&_.session_id.length>0,discard:Sn(Is,_.bead_id,{attempt_id:_.attempt_id}),workflow:kn[_.bead_id]||null,usage:dn(u.attempts||{},_.bead_id),rollup:fr(_.bead_id),rollup_expanded:Re.has(_.bead_id),exec_chips:nn(_),...Qn(_.bead_id)});else if((_.status==="failed"||_.status==="orphaned")&&Yp(_)){let se=Vi(_);oa.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:Qt.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,failed:!0,status:_.status,status_label:_.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Sn(Is,_.bead_id,{attempt_id:_.attempt_id}),resume_eligible:se.eligible,resume_reason:se.reason,conflict_resolution:sa(_),base_exception:Di(Ps,_.target_base),workflow:kn[_.bead_id]||null,usage:dn(u.attempts||{},_.bead_id),rollup:fr(_.bead_id),rollup_expanded:Re.has(_.bead_id),exec_chips:nn(_),...Qn(_.bead_id)}),_n=_}}let Ki=new Set([...oa,...Ms].map(_=>_.bead_id));for(let _ of Array.isArray(u.session_active)?u.session_active:[]){let q=_&&_.bead_id;typeof q!="string"||q.length===0||Ki.has(q)||(Ki.add(q),Ms.push({bead_id:q,attempt_id:null,kind:"session",title:_.title||Qt.get(q)||q,status:"in_progress",started_at:$n(_.started_at)??$n(_.updated_at),updated_at:$n(_.updated_at),workflow:_.workflow||null,runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1}))}let yr=[...oa,...Ms].map(_=>{let q=Os.get(_.attempt_id),se=q?.quickfix_landing;if(q?.quickfix_lane!==!0||!se||typeof se!="object")return _;let Ge=typeof se.reason=="string"&&se.reason.length>0?se.reason:null,st=As({bead_id:q.bead_id,merge_sha:se.head_sha,cleanup_cursor:se.cursor,cleanup_failed:Ge?{step:se.cursor,reason:Ge}:null,repo_operations:Array.isArray(u.repo_operations)?u.repo_operations:[]});return st?{..._,landing:st}:_}),Yi=null;if(_n){let _=Vi(_n),q=_n.cause_detail;Yi={bead_id:_n.bead_id,repo:_n.repo||"",reason:_n.cause||_n.status,cause_detail:q&&typeof q.reason=="string"?{reason:q.reason,command:typeof q.command=="string"?q.command:null}:null,resume_attempt_id:_n.attempt_id,resume_eligible:_.eligible,resume_reason:_.reason,discard:Sn(Is,_n.bead_id,{attempt_id:_n.attempt_id})}}let Zi=new Set(yr.map(_=>_.bead_id)),aa=Array.isArray(u.merge_queue)?u.merge_queue:[],Qi=new Map,Xi=new Map,Ji=new Map,el=new Map,tl=new Map;aa.forEach((_,q)=>{_&&typeof _.bead_id=="string"&&(Qi.set(_.bead_id,q+1),Xi.set(_.bead_id,_.resolution),Ji.set(_.bead_id,_.continuation_action||null),el.set(_.bead_id,_.head_review||null),tl.set(_.bead_id,_.authority||null))});let vr=u.merge_queue_state||{active:null,failures:{}},Zp=vr.failures||{},nl=vr.waiting&&typeof vr.waiting.bead_id=="string"&&typeof vr.waiting.reason=="string"?vr.waiting:null,Qp=u.auto_merge_skips||{},rl=_=>{let q=Qp[_];if(!q)return null;let se=hr[_],Ge=se&&se.pr?se.pr.head_sha:null;return Ge&&Ge===q.head_sha?q.reason||"":null},Ds=new Map;for(let _ of yr)_.failed!==!0&&_.conflict_resolution&&(_.paused?Ds.has(_.bead_id)||Ds.set(_.bead_id,"paused"):Ds.set(_.bead_id,"running"));let sl=yr.filter(_=>_.kind!=="session"&&!_.paused&&_.failed!==!0).length,ol=(u.workspace_info||{}).slots,al=typeof ol=="number"?ol:typeof u.slots=="number"?u.slots:Xo,Xp=sl>al,Ns=sr(N),Jp=(Array.isArray(u.done)?u.done.slice():[]).filter(_=>Ns===void 0||typeof _.added_at!="number"||_.added_at>=Ns).sort((_,q)=>(q.added_at||0)-(_.added_at||0)),Gr=na(Jp,"done"),ef=new Set((Array.isArray(u.done)?u.done:[]).map(_=>_?.bead_id).filter(_=>typeof _=="string")),il=[],tf=d?.()||"";for(let _ of F){let q=$n(_.closed_at);if(typeof _.id!="string"||ef.has(_.id)||q===null||Ns!==void 0&&q<Ns||typeof _.comment_count!="number"||_.comment_count<=0)continue;let se=`${tf}\0${_.id}\0${String(_.updated_at)}\0${_.comment_count}`,Ge=B.get(se);Ge===void 0&&n&&(B.set(se,"pending"),Promise.resolve(n("get-comments",{id:_.id})).then(st=>{let Dt=Array.isArray(st)&&st.some(Ot=>So(typeof Ot?.text=="string"?Ot.text:"")?.lane==="session");B.set(se,Dt?"session":"not-session"),Ue()}).catch(()=>{B.set(se,"failed"),Ue()})),Ge==="session"&&il.push({id:_.id,title:_.title||_.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:q,created_at:_.created_at,updated_at:_.updated_at})}Gr.push(...il),Gr.sort((_,q)=>(q.done_at||0)-(_.done_at||0));let qs={};for(let _ of Rn)qs[_]=0;let ll=!1,cl=0,ia=0,ul=0;for(let _ of Gr){let q=_.usage;if(q&&typeof q=="object"){let se=!1;for(let Ge of Rn)Number.isFinite(q[Ge])&&(qs[Ge]+=q[Ge],ll=!0,se=!0);se&&(ia+=1,Number.isFinite(q.total_cost_usd)&&(cl+=q.total_cost_usd,ul+=1))}}ia>0&&ul===ia&&(qs.total_cost_usd=cl);let dl=Gr.map(_=>_.usage).filter(_=>_&&typeof _=="object"&&_.providers),nf=dl.length>0?Bt(uo(dl)):ll?Ln(qs):null,pl=u.lane_states&&typeof u.lane_states=="object"&&!Array.isArray(u.lane_states)?u.lane_states:{},fl=Array.isArray(u.serial_lanes)?u.serial_lanes:[],_l=_=>{if(Xn.some(Ge=>Ge.bead_id===_))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let q=br.filter(Ge=>Ge&&Ge.bead_id===_),se=q.length>0?q[q.length-1].status:null;return se==="failed"||se==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":se==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Fs=fl.filter(_=>_&&typeof _.id=="string"&&Array.isArray(_.entries)).map((_,q)=>{let se=pl[_.id]||{},Ge=new Map((Array.isArray(se.corrections)?se.corrections:[]).filter($t=>$t&&typeof $t.bead_id=="string"&&typeof $t.after=="string").map($t=>[$t.bead_id,$t.after])),st=na(_.entries.filter($t=>!Zi.has($t.bead_id)),_.id).map($t=>Ge.has($t.id)?{...$t,badges:[`\u{1F517} ${Ge.get($t.id)} \uB4A4 (blocks \uC790\uB3D9)`,...$t.badges]}:$t),Dt=Array.isArray(se.occupied_by)?se.occupied_by.filter($t=>typeof $t=="string"):[],Ot=Dt.map($t=>({id:$t,title:Qt.get($t)||$t,draggable:!1,lane:_.id,ghost:!0,badges:[_l($t)]}));return{id:_.id,index:q+1,rows:[...Ot,...st],occupied:Dt.length>0,badge:Dt.length>0?_l(Dt[0]):"\uB300\uAE30",cycle:se.cycle===!0}}),ml=typeof u.serial_lane_count=="number"?u.serial_lane_count:Fs.length,la=na(Xt.filter(_=>!Zi.has(_.bead_id)),"queue"),gl=new Map,hl=new Set;for(let[_,q]of Object.entries(pl)){if(!/^s[1-5]$/.test(_))continue;let se=q&&Array.isArray(q.occupied_by)?q.occupied_by:[];for(let Ge of se)typeof Ge=="string"&&gl.set(Ge,_);se.length>0&&hl.add(_)}let wr=[];for(let _ of yr)typeof _.bead_id=="string"&&wr.push({id:_.bead_id,title:Qt.get(_.bead_id)||_.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:gl.get(_.bead_id)??null});for(let _ of Fs)for(let q of _.rows)q.ghost!==!0&&wr.push({id:q.id,title:q.title,location_label:`${_.id} #${q.seq??""}`.trim(),kind:"serial",lane_id:_.id});la.forEach((_,q)=>{wr.push({id:_.id,title:_.title,location_label:`#${q+1}`,kind:"parallel",lane_id:null})});for(let _ of ta)wr.push({id:_.id,title:_.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let bl={};for(let _ of fl)_&&typeof _.id=="string"&&Array.isArray(_.entries)&&(bl[_.id]=_.entries.length);let ca=new Map;for(let _ of wr)ca.has(_.id)||ca.set(_.id,_);D={members_by_id:ca,serial_raw_lengths:bl,serial_lane_count:ml,occupied_lanes:hl};let yl=lp(u.bead_scope,wr),ua=(_,q)=>{let se=yl.get(_.id);if(!se||se.overlaps.length===0&&!se.scope_missing)return _;let Ge=oe(_.id,se.overlaps);return _.dependency_chips={..._.dependency_chips||{},...se.overlaps.length>0?{overlaps:se.overlaps}:{},...se.scope_missing&&q!=="running"?{scope_missing:!0}:{},...Ge?{popover:Ge}:{}},_};for(let _ of la)ua(_,"queue");for(let _ of Fs)for(let q of _.rows)q.ghost!==!0&&ua(q,_.id);for(let _ of ta)ua(_,"candidate");let vl=new Map;for(let _ of yr){let q=typeof _.bead_id=="string"?yl.get(_.bead_id):void 0;if(!q||q.overlaps.length===0)continue;let se=oe(_.bead_id,q.overlaps);vl.set(_.bead_id,{dependency_chips:{overlaps:q.overlaps,...se?{popover:se}:{}}})}return{queue:u,idToTitle:Qt,candidates:ta,candidate_hidden:{blocked:ea.hidden_blocked,spec:ea.hidden_spec},running:yr,live_count:sl,slots:al,over_cap:Xp,failure:Yi,waiting:la,serial_lanes:Fs,serial_lane_count:ml,running_overlays:vl,pr_wait:Xn.map(_=>Gb(_.bead_id,Qt.get(_.bead_id)||_.bead_id,hr,Fe[_.bead_id]||null,dn(u.attempts||{},_.bead_id),Ls[_.bead_id]||(ye.has(_.bead_id)||he.has(_.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Ds.get(_.bead_id)||null,_.external===!0,{position:Qi.get(_.bead_id)||0,active:vr.active===_.bead_id,failure:Zp[_.bead_id]||null,waiting:nl?.bead_id===_.bead_id?nl.reason:null,resolution:Xi.get(_.bead_id),continuation_action:Ji.get(_.bead_id),head_review:el.get(_.bead_id)||null,authority:tl.get(_.bead_id)||null},_.wt_present!==!1,u.auto_merge===!0?rl(_.bead_id):null,Di(Ps,Kp(_.bead_id)),u.completion_status&&typeof u.completion_status=="object"&&!Array.isArray(u.completion_status)&&u.completion_status[_.bead_id]||null,u.discard_operations&&typeof u.discard_operations=="object"&&!Array.isArray(u.discard_operations)?u.discard_operations:{},Os.get(Gi.get(_.bead_id)||"")?.worker_serial===!0,u.auto_merge===!0,{merge_sha:_.merge_sha,cleanup_cursor:_.cleanup_cursor,repo_operations:Array.isArray(u.repo_operations)?u.repo_operations:[]})).map(_=>({..._,workflow:kn[_.id]||null,...Qn(_.id)})),merge_queue_length:aa.length,merge_queue_running:aa.length>0,auto_excluded:Xn.map(_=>_.bead_id).filter(_=>rl(_)!==null),declared_base:Ps,done:Gr,token_total:nf,cleanup_failures:dt,repo_operations:Array.isArray(u.repo_operations)?u.repo_operations:[]}}function St(){let m=!!o?.get()?.job,v=!m&&o?.isPending?.()===!0,F=m?"\uBD84\uC11D \uC911":v?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${F?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${F?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${F?l`<span class="worker-analysis-btn__badge">${F}</span>`:""}
    </button>`}function Qe(u){let m=u.waiting.length>0?u.waiting[0].id:"\u2014",v=l`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,F=Mt(u),fe=u.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ee=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${T()} 완료 <b>${u.done.length}</b></span
      >`,Se=l`<span
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
      ${o?St():""} `,ut=td({failure:u.failure}),jt=Vu(u.repo_operations,u.cleanup_failures);return Q?l`<div class="worker-ribbon">
          ${v} ${F}
          <div class="worker-kpi worker-kpi--ribbon">${fe}${Ee}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${ze}</div>
          <div class="worker-kpi">${Se}</div>
        </div>
        ${jt}${De.template()}${ut}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${v}${F}${ze}</div>
        <div class="worker-kpi">
          ${fe}${Ee}${Se}
          ${(Array.isArray(u.token_total)?u.token_total:u.token_total?[{label:u.token_total,tooltip:`${T()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(nn=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${nn.tooltip}
                >${T()} 완료 · 누적 ${nn.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${m}</b></span
          >
        </div>
      </div>
      ${jt}${De.template()}${ut}`}function ft(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let m=u.running.some(v=>v.kind!=="session"&&!v.paused&&v.failed!==!0);return l`<section
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
      ${u.running.length>0?bi(u.running,Date.now(),we,u.running_overlays):""}
      ${u.pr_wait.map(v=>Hn(v))}
    </section>`}function yt(u){let m=u.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${U.show_blocked}
        />
        🔒 blocked${m.blocked>0?` ${m.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Eb.map(v=>l`<button
              type="button"
              class="worker-filter__chip${U.spec===v.value?" is-active":""}"
              data-spec=${v.value}
              aria-pressed=${U.spec===v.value?"true":"false"}
            >
              ${v.label}
            </button>`)}
        ${m.spec>0?l`<span class="worker-filter__hidden">숨김 ${m.spec}</span>`:""}
      </div>
    </div>`}function Ct(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${P}
    >
      ${Tb.map(u=>l`<option value=${u.value} ?selected=${P===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function zt(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${N}
      >
        ${jn.map(u=>l`<option value=${u.value} ?selected=${N===u.value}>
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
      </button>`;let v=new Set(u.auto_excluded),F=u.pr_wait.filter(fe=>fe.merge_action&&fe.merge_enabled&&!v.has(fe.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${F>0?` ${F}`:""}
    </button>`}function Ft(u){let m=fn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ct(),controls:yt(u),place_menu:O(u.candidates)});return Q?l`<div class="worker-lanes worker-lanes--mobile">
        ${ft(u)}
        ${fn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:L.queue,preview:xp(u.waiting)})}
        ${u.serial_lanes.map(v=>Nt(v))}
        ${m}
        ${fn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${T()} \uC644\uB8CC \uC5C6\uC74C`,controls:zt(),collapsible:!0,collapsed:L.done,preview:Array.isArray(u.token_total)?u.token_total.map(v=>v.label).join(" \xB7 "):u.token_total||xp(u.done)})}
      </div>`:l`<div class="worker-lanes">
      ${m}
      <div class="worker-wait">
        ${fn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${u.serial_lanes.map(v=>Nt(v))}
      </div>
      ${fn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(v=>v.kind!=="session"&&!v.paused&&v.failed!==!0),body:bi(u.running,Date.now(),we,u.running_overlays)})}
      ${fn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${fn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${T()} ${u.done.length}`,items:u.done,empty:`${T()} \uC644\uB8CC \uC5C6\uC74C`,controls:zt()})}
    </div>`}function Lt(u){L={...L,[u]:!L[u]},Mb(L),Ue()}function Ue(){let u=Ze();Ke(Qe(u),Pe),Ke(Ft(u),me)}function Ut(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(Ob);Q=!!u.matches;let m=v=>{let F=!!(v&&typeof v.matches=="boolean"?v.matches:u.matches);F!==Q&&(Q=F,Ue())};typeof u.addEventListener=="function"?(u.addEventListener("change",m),j.push(()=>u.removeEventListener("change",m))):typeof u.addListener=="function"&&(u.addListener(m),j.push(()=>u.removeListener(m)))}let Ht=null;function Je(u){Ht=u.target instanceof Element?u.target:null}function Wt(u){let v=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!v)return;if(Ht&&v.contains(Ht)&&Ht.closest("input, button, a")){u.preventDefault();return}let F=v.dataset.beadId||"",fe=v.dataset.lane||"";A={bead_id:F,from_lane:fe};try{u.dataTransfer?.setData("text/plain",F),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function qe(u){let m=u.target?.closest?.(".worker-pane");if(!m)return;let v=m.dataset.lane||"";v!=="candidate"&&v!=="queue"&&!/^s[1-5]$/.test(v)||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),m.classList.add("worker-pane--drag-over"))}function C(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function _e(u,m){let v=M.find(Se=>Se.id===u);if(!v)return;let F=M.filter(Se=>Se.id!==u),fe=F.length;if(m){let Se=m.dataset.beadId;if(Se===u)return;let ze=F.findIndex(ut=>ut.id===Se);ze>=0&&(fe=ze)}let Ee=F.slice();Ee.splice(fe,0,v),k.applyReorder(u,Ee,fe)}function Te(u){let m=u.target?.closest?.(".worker-pane");if(!m)return;u.preventDefault(),m.classList.remove("worker-pane--drag-over");let v=m.dataset.lane||"",F=A?.bead_id||u.dataTransfer?.getData("text/plain")||"",fe=A?.from_lane||"";if(A=null,!F)return;let Ee=u.target?.closest?.(".worker-mini, .worker-card"),Se=Array.from(m.querySelectorAll(".worker-mini, .worker-card")),ze=Se.length;if(Ee){let ut=Se.indexOf(Ee);ut>=0&&(ze=ut)}if(ze=Math.max(0,ze-m.querySelectorAll(".worker-mini--ghost").length),m.classList.contains("worker-pane--collapsed")&&(ze=X()),v==="candidate"){if(fe==="candidate"){_e(F,Ee);return}(fe==="queue"||/^s[1-5]$/.test(fe))&&ot(F);return}if(v==="queue"||/^s[1-5]$/.test(v)){let ut=v==="queue"?"parallel":v;fe===v?et(F,ut,ze):Oe(F,ut)}}function it(u){U=u,Ab(u),Ue()}function Rt(u){P=u==="board"||u==="created"||u==="spec"?u:Jo,Rb(P),Ue()}function b(u){N=un(u)?u:rn,Ib(N),f?.(N),Ue()}function h(u){let m=u.target?.closest?.(".worker-serial-lane-count");if(m){let ze=Number.parseInt(m.value,10);Number.isFinite(ze)&&S(ze).then(Ue);return}let v=u.target?.closest?.(".worker-filter__blocked");if(v){it({...U,show_blocked:v.checked});return}let F=u.target?.closest?.(".worker-done-range");if(F){b(F.value);return}let fe=u.target?.closest?.(".worker-sort");if(fe){Rt(fe.value||Jo);return}let Ee=u.target?.closest?.(".worker-slots__input");if(!Ee)return;let Se=Number.parseInt(Ee.value,10);if(!Number.isFinite(Se)){Ue();return}w(Se).then(Ue)}function x(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function I(){let u=Ze();return{operations:u.repo_operations,cleanup_failures:u.cleanup_failures,repo:d&&d()||""}}function ne(){we&&Me.close(),R.hidden=!1,ge.hidden=!1,Be.open(I()),Ue()}function y(u){let m=We(),v=m.attempts?m.attempts[u]:null;we=u,Le=null,Be.close(),R.hidden=!0,ge.hidden=!1,Me.open({attempt_id:u,meta:x(v)}),Ue()}function $(u,m){we=null,Le=u,Be.close(),R.hidden=!0,ge.hidden=!1,Me.open({attempt_id:u,meta:m,hide_prompt:!0}),Ue()}function ce(){if(Be.isOpen()&&Be.refresh(I()),Le){let v=(o?.get()?.runs||[]).find(F=>F.run_id===Le);v?Me.updateMeta(Oi(v)):Me.close();return}if(!we)return;let u=We(),m=u.attempts?u.attempts[we]:null;if(m){Me.updateMeta(x(m));return}Me.close()}function be(u){let m=u.target;if(m?.closest?.(".worker-mini__serial, .worker-mini__grip")||m?.closest?.("#worker-parallel-analysis-dialog"))return;let v=m?.closest?.(".mon-overlap__chip");if(v){let Fe=v.closest("[data-bead-id]"),dt=Fe&&Fe.getAttribute("data-bead-id")||"";if(dt){let Xt=v.getAttribute("data-overlap-all")==="true"?null:v.getAttribute("data-overlap-id")||"";Y=!!Y&&Y.bead_id===dt&&Y.counterpart_id===Xt?null:{bead_id:dt,counterpart_id:Xt},Ue()}return}let F=m?.closest?.(".mon-overlap__place");if(F){let Fe=F.closest("[data-bead-id]"),dt=Fe&&Fe.getAttribute("data-bead-id")||"";dt&&te(dt,F.getAttribute("data-counterpart-id")||"");return}if(m?.closest?.(".mon-overlap__popover"))return;if(m?.closest?.(".worker-analysis-btn")){Ye?.open();return}if(m?.closest?.(".worker-repo-strip")||m?.closest?.(".worker-mini__timeline")){ne();return}let fe=m?.closest?.(".worker-repo-op__session");if(fe){let Fe=fe.dataset.attemptId;Fe&&y(Fe);return}let Ee=m?.closest?.(".worker-repo-op__resolve");if(Ee){He(Ee.dataset.operationId||"");return}let Se=m?.closest?.(".worker-repo-op__dismiss");if(Se){E(Se.dataset.operationId||"");return}let ze=m?.closest?.(".worker-cleanup__resume");if(ze){let Fe=ze.dataset.beadId;Fe&&wt(Fe);return}let ut=m?.closest?.(".worker-banner__resume");if(ut){let Fe=ut.dataset.attemptId;Fe&&vt(Fe);return}let jt=m?.closest?.(".worker-banner__discard");if(jt){let Fe=jt.dataset.confirmation==="merged"?"merged":"unmerged";pt(jt.dataset.beadId||"",jt.dataset.attemptId||null,Fe,jt.dataset.operationId||null);return}let nn=m?.closest?.(".worker-banner__dismiss");if(nn){let Fe=nn.dataset.attemptId;Fe&&gt(Fe);return}if(m?.closest?.(".worker-play")){je(!We().auto_advance);return}let qn=m?.closest?.(".worker-merge-all");if(qn){qn.classList.contains("worker-merge-all--stop")?We().auto_merge===!0?Ce(!1):ht():Ce(!0);return}let zr=m?.closest?.(".worker-pane__hd--toggle");if(zr){let Fe=zr.dataset.lane;(Fe==="queue"||Fe==="done")&&Lt(Fe);return}let fr=m?.closest?.(".worker-card__place-lane");if(fr){let Fe=fr.dataset.beadId,dt=fr.dataset.lane;Fe&&(dt==="parallel"||/^s[1-5]$/.test(dt||""))&&(V=null,Ue(),Oe(Fe,dt));return}if(m?.closest?.(".worker-card__place-cancel")){V=null,Ue();return}let Qt=m?.closest?.(".worker-card__place");if(Qt){let Fe=Qt.dataset.beadId;Fe&&!Qt.disabled&&(ve()?(V=Fe,Ue()):Oe(Fe,"parallel"));return}let Hr=m?.closest?.(".worker-filter__chip");if(Hr){let Fe=Hr.dataset.spec;(Fe==="all"||Fe==="with"||Fe==="without")&&it({...U,spec:Fe});return}let Ts=m?.closest?.(".worker-mini__merge");if(Ts){let Fe=Ts.dataset.beadId||"";We().cleanup_failed?.[Fe]?wt(Fe):ct(Fe);return}let Cs=m?.closest?.(".worker-mini__merge-cancel");if(Cs){Ne(Cs.dataset.beadId||"");return}let kn=m?.closest?.(".worker-mini__discard");if(kn){pt(kn.dataset.beadId||"",kn.dataset.attemptId||null,kn.dataset.discardMode==="merged"?"merged":"unmerged",kn.dataset.operationId||null);return}let Fn=m?.closest?.(".worker-mini__stale-continue");if(Fn){G("worker-stale-work-continue",Fn.dataset.beadId||"",Fn.dataset.actionId||"");return}let _r=m?.closest?.(".worker-mini__stale-backup");if(_r){G("worker-stale-work-backup-fresh",_r.dataset.beadId||"",_r.dataset.actionId||"");return}let mr=m?.closest?.(".worker-mini__stale-recheck");if(mr){G("worker-stale-work-recheck",mr.dataset.beadId||"",mr.dataset.actionId||"");return}let Rs=m?.closest?.(".worker-mini__revise-fix");if(Rs){pe("worker-revise-fix",Rs.dataset.beadId||"");return}let gr=m?.closest?.(".worker-mini__revise-approve");if(gr){pe("worker-revise-approve",gr.dataset.beadId||"");return}if(m?.closest?.(".worker-mini__pr"))return;if(m?.closest?.(".rtile__discard")){let Fe=m?.closest?.(".rtile"),dt=Fe?.dataset?.beadId,Xt=Fe?.dataset?.attemptId;dt&&pt(dt,Xt||null,"unmerged",m?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(m?.closest?.(".rtile__dismiss")){let dt=m?.closest?.(".rtile")?.dataset?.attemptId;dt&&gt(dt);return}if(m?.closest?.(".rtile__pause")){let dt=m?.closest?.(".rtile")?.dataset?.attemptId;dt&&Xe(dt);return}if(m?.closest?.(".rtile__resume")){let dt=m?.closest?.(".rtile")?.dataset?.attemptId;dt&&vt(dt);return}if(m?.closest?.(".rtile__session")){let dt=m?.closest?.(".rtile")?.dataset?.attemptId;dt&&y(dt);return}if(m?.closest?.(".worker-drawer-overlay__backdrop")){Be.close(),Me.close();return}if(m?.closest?.(".worker-drawer-host"))return;let Qn=m?.closest?.(".rtile .board-card__roll-toggle");if(Qn){let Fe=Qn.dataset.rollParent;Fe&&(Re.has(Fe)?Re.delete(Fe):Re.add(Fe),Ue());return}let Xn=m?.closest?.(".rtile .board-card__roll-child");if(Xn){let Fe=Xn.dataset.childId;Fe&&c&&c(Fe);return}let hr=m?.closest?.(".rtile");if(hr){if(m?.closest?.(".rtile__id")){let dt=hr.dataset.beadId;dt&&on(dt).then(Xt=>{Xt?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Fe=hr.dataset.beadId;Fe&&c&&c(Fe);return}let Ls=m?.closest?.(".worker-mini, .worker-card");if(Ls){let Fe=Ls.dataset.beadId;if(m?.closest?.(".worker-mini__id, .worker-card__id")){Fe&&on(Fe).then(Xt=>{Xt?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let dt=m?.closest?.(".ctl-chip--from");if(dt){let Xt=dt.dataset.fromId;Xt&&c&&c(Xt);return}Fe&&c&&c(Fe)}}e.addEventListener("pointerdown",Je),e.addEventListener("dragstart",Wt),e.addEventListener("dragover",qe),e.addEventListener("dragleave",C),e.addEventListener("drop",Te),e.addEventListener("click",be),e.addEventListener("change",h);function Ve(u){if(!Y)return;let m=u.target;m&&typeof m.closest=="function"&&m.closest(".mon-overlap__popover, .mon-overlap__chip")||(Y=null,Ue())}function Ie(u){u.key!=="Escape"||!Y||(Y=null,Ue())}return document.addEventListener("click",Ve),document.addEventListener("keydown",Ie),j.push(()=>{document.removeEventListener("click",Ve),document.removeEventListener("keydown",Ie)}),Ut(),g&&j.push(g.subscribe(()=>{for(let[u,m]of B)m==="failed"&&B.delete(u);Ue()})),s&&j.push(s.subscribe(()=>{let u=d&&d()||"";u!==K&&(K=u,W.close()),Ue(),ce()})),o&&typeof o.subscribe=="function"&&j.push(o.subscribe(()=>{ce(),Ue()})),Ue(),{load(){le(),Ue()},refreshSessionDefaults:xe,destroy(){for(let u of j.splice(0))try{u()}catch{}e.removeEventListener("pointerdown",Je),e.removeEventListener("dragstart",Wt),e.removeEventListener("dragover",qe),e.removeEventListener("dragleave",C),e.removeEventListener("drop",Te),e.removeEventListener("click",be),e.removeEventListener("change",h);try{Me.destroy()}catch{}ge.hidden=!0;try{Ye?.destroy()}catch{}try{W.destroy()}catch{}Ke(l``,e)}}}function qi(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Lp(e,t,n,r=async()=>{},s=async()=>{}){let o=Et("views:workspace-picker"),a=null,i=!1,c=!1,d=!1;async function p(B){let L=B.target.value,ye=t.getState().workspace?.current?.path||"";if(L&&L!==ye){o("switching workspace to %s",L),i=!0,N();try{await n(L)}catch(he){o("workspace switch failed: %o",he)}finally{i=!1,N()}}}async function f(){let B=t.getState(),T=B.workspace?.current?.path||B.workspace?.available?.[0]?.path||"";if(!(!T||c)){o("git-pulling workspace %s",T),c=!0,N();try{await r(T)}catch(L){o("workspace git pull failed: %o",L)}finally{c=!1,N()}}}function g(B){let T=B.target;T&&e.contains(T)||M()}function k(B){B.key==="Escape"&&M()}function A(){d||(d=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",k),N())}function M(){d&&(d=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",k),N())}function U(){d?M():A()}async function V(B){let T=B.target,L=T.value,Q=T.checked;o("toggling visibility %s \u2192 %s",L,String(Q));try{await s(L,Q)}catch(ye){o("workspace visibility toggle failed: %o",ye)}}function Y(B){return B?l`
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
    `:l``}function D(B,T){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${U}
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
                ${B.map(L=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${L.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${L.path}"
                        .checked=${!T.has(L.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${qi(L.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function P(){let B=t.getState(),T=B.workspace?.current,L=B.workspace?.available||[],Q=new Set(B.workspace?.hidden||[]),ye=T?.path||L[0]?.path||"";if(L.length===0)return l``;let he=L.filter(re=>!Q.has(re.path)||re.path===ye);if(he.length<=1){let re=he[0]||L[0],Z=qi(re.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${re.path}"
            >${Z}</span
          >
          ${D(L,Q)}
          ${Y(ye)}
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
          ${he.map(re=>l`
              <option
                value="${re.path}"
                ?selected=${re.path===ye}
                title="${re.path}"
              >
                ${qi(re.path)}
              </option>
            `)}
        </select>
        ${D(L,Q)}
        ${Y(ye)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function N(){Ke(P(),e)}return N(),a=t.subscribe(()=>N()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",k),Ke(l``,e)}}}var Ip=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Fi(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Op(e,t,n=Fi()){return{id:n,type:e,payload:t}}function Pp(e={}){let t=Et("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,d=new Map,p=[],f=new Map,g=new Set;function k(P){for(let N of Array.from(g))try{N(P)}catch{}}function A(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),k(o);let P=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),N=(n.jitterRatio||0)*P,B=Math.max(0,Math.round(P+(Math.random()*2-1)*N));t("ws retry in %d ms (attempt %d)",B,a+1),i=setTimeout(()=>{i=null,D()},B)}function M(P){try{s?.send(JSON.stringify(P))}catch(N){t("ws send failed",N)}}function U(){for(o="open",t("ws open"),k(o),a=0;p.length;){let P=p.shift();P&&M(P)}}function V(P){let N;try{N=JSON.parse(String(P.data))}catch{t("ws received non-JSON message");return}if(!N||typeof N.id!="string"||typeof N.type!="string"){t("ws received invalid envelope");return}if(d.has(N.id)){let T=d.get(N.id);d.delete(N.id),N.ok?T?.resolve(N.payload):T?.reject(N.error||new Error("ws error"));return}let B=f.get(N.type);if(B&&B.size>0)for(let T of Array.from(B))try{T(N.payload)}catch(L){t("ws event handler error",L)}else t("ws received unhandled message type: %s",N.type)}function Y(){o="closed",t("ws closed"),k(o);for(let[P,N]of d.entries())N.reject(new Error("ws disconnected")),d.delete(P);a+=1,A()}function D(){if(!c)return;let P=r();try{s=new WebSocket(P),t("ws connecting %s",P),o="connecting",k(o),s.addEventListener("open",U),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",Y)}catch(N){t("ws connect failed %o",N),A()}}return D(),{send(P,N){if(!Ip.includes(P))return Promise.reject(new Error(`unknown message type: ${P}`));let B=Fi(),T=Op(P,N,B);return t("send %s id=%s",P,B),new Promise((L,Q)=>{d.set(B,{resolve:L,reject:Q,type:P}),s&&s.readyState===s.OPEN?M(T):(t("queue %s id=%s (state=%s)",P,B,o),p.push(T))})},on(P,N){f.has(P)||f.set(P,new Set);let B=f.get(P);return B?.add(N),()=>{B?.delete(N)}},onConnection(P){return g.add(P),()=>{g.delete(P)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,D()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Vb(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Kb(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var ji=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Mp=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Yn="tab:worker:closed",Yb="bdui.worker.done-range",Dp=qd,Np="worker:queue",qp="worker:parallel-analysis",Fp="ui:order",jp="ui:display-policy",Bp="exec:presets",Zn="tab:board:closed",Up="beads-ui.board.closed-range";function Zb(e){let t=Et("main");t("bootstrap start");let n=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ke(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),c=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),p=document.getElementById("detail-panel");if(a&&sp(a),i&&c&&d&&p){let ee=function(y,$){let ce="Request failed",be="";if(y&&typeof y=="object"){let Ie=y;if(typeof Ie.message=="string"&&Ie.message.length>0&&(ce=Ie.message),typeof Ie.details=="string")be=Ie.details;else if(Ie.details&&typeof Ie.details=="object")try{be=JSON.stringify(Ie.details,null,2)}catch{be=""}}else typeof y=="string"&&y.length>0&&(ce=y);let Ve=$&&$.length>0?`Failed to load ${$}`:"Request failed";j.open(Ve,ce,be)},O=function(y){return`${Je.getState().workspace.current?.path||""}\0${y}`},H=function(){Me&&(Me().catch(()=>{}),Me=null),Be=null,W=null},X=function(y){K=y;let $=()=>{K!==y||Je.getState().selected_id!==y||(K=null,J(y))};if(!We){Ye.then($);return}$()},Xe=function(y,$,ce,be,Ve){return ce!==ot[$]?(Ve().catch(()=>{}),!1):(y.set(be,Ve),!0)},gt=function(){let y=Je.getState();Ce(y.view==="board"),je(y.view==="worker"),z(y.view==="monitor"),E(y.view==="board"||y.view==="worker"||vt||!!y.selected_id)},wt=function(){let y=sr(at);return y===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:y}}},nt=function(){let y=sr(ct);return y===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:y}}},Ce=function(y){if(y)for(let[$,ce]of ji){if(Oe.has($)||et.has($))continue;let be=$===Zn?wt():{type:ce};try{Pe.register($,be)}catch(u){t("register %s store failed: %o",$,u)}et.add($);let Ve=ot.board,Ie=!1;Ae.subscribeList($,be).then(u=>{Ie=!Xe(Oe,"board",Ve,$,u)}).catch(u=>{t("subscribe %s failed: %o",$,u),ee(u,"board")}).finally(()=>{et.delete($),Ie&&gt()})}else pt()},pt=function(){ot.board+=1;for(let[y]of ji){let $=Oe.get(y);$&&($().catch(()=>{}),Oe.delete(y));try{Pe.unregister(y)}catch(ce){t("unregister %s failed: %o",y,ce)}}},je=function(y){if(!y){He();return}for(let[$,ce]of Mp){if(G.has($)||et.has($))continue;let be=$===Yn?nt():{type:ce};try{Pe.register($,be)}catch(u){t("register %s store failed: %o",$,u)}et.add($);let Ve=ot.worker,Ie=!1;Ae.subscribeList($,be).then(u=>{Ie=!Xe(G,"worker",Ve,$,u)}).catch(u=>{t("subscribe %s failed: %o",$,u),ee(u,"worker")}).finally(()=>{et.delete($),Ie&&gt()})}},He=function(){ot.worker+=1;for(let[y]of Mp){let $=G.get(y);$&&($().catch(()=>{}),G.delete(y));try{Pe.unregister(y)}catch(ce){t("unregister %s failed: %o",y,ce)}}},E=function(y){if(!y){w();return}pe||(xe("subscribe-worker-queue",{id:Np}).catch($=>{t("subscribe-worker-queue failed: %o",$)}),xe("subscribe-worker-parallel-analysis",{id:qp}).catch($=>{t("subscribe-worker-parallel-analysis failed: %o",$)}),pe=()=>(xe("unsubscribe-worker-parallel-analysis",{id:qp}),xe("unsubscribe-worker-queue",{id:Np})))},w=function(){pe&&(pe().catch(()=>{}),pe=null),lt.clear()},z=function(y){if(!y){ue();return}S||(xe("subscribe-monitor-pipeline",{id:Dp}).catch($=>{t("subscribe-monitor-pipeline failed: %o",$)}),S=()=>xe("unsubscribe-monitor-pipeline",{id:Dp}))},ue=function(){S&&(S().catch(()=>{}),S=null)},te=function(){oe||(xe("subscribe-ui-order",{id:Fp}).catch(y=>{t("subscribe-ui-order failed: %o",y)}),oe=()=>xe("unsubscribe-ui-order",{id:Fp}))},rt=function(){oe&&(oe().catch(()=>{}),oe=null),R.clear()},St=function(){Ze||(xe("subscribe-display-policy",{id:jp}).catch(y=>{t("subscribe-display-policy failed: %o",y)}),Ze=()=>xe("unsubscribe-display-policy",{id:jp}))},Qe=function(){Ze&&(Ze().catch(()=>{}),Ze=null),me.clear()},yt=function(){ft||(xe("subscribe-impl-presets",{id:Bp}).catch(y=>{t("subscribe-impl-presets failed: %o",y)}),ft=()=>xe("unsubscribe-impl-presets",{id:Bp}))},Lt=function(y){if(!y)return"Unknown";let $=y.split("/").filter(Boolean);return $.length>0?$[$.length-1]:"Unknown"};var f=ee,g=O,k=H,A=X,M=Xe,U=gt,V=wt,Y=nt,D=Ce,P=pt,N=je,B=He,T=E,L=w,Q=z,ye=ue,he=te,re=rt,Z=St,Re=Qe,ke=yt,ie=Lt;let ae=document.getElementById("header-loading"),$e=oc(ae),j=Gu(e),le=Pp(),xe=$e.wrapSend((y,$)=>le.send(y,$)),Ae=Ql(xe),Pe=Xl(),ge=tc(),lt=ec(),mt=Dl(),R=Jl(),me=Pl(),we=Ml(),Le=Nl();le.on("impl-presets-snapshot",y=>{let $=y;$&&typeof $.revision=="number"&&Array.isArray($.presets)&&we.set({revision:$.revision,presets:$.presets})}),le.on("monitor-pipeline-snapshot",y=>{let $=y;if(!(!$||!Array.isArray($.workspaces)))try{mt.set($.workspaces,$.workspaces_state)}catch{}}),le.on("ui-order-snapshot",y=>{let $=y;if($&&typeof $.revision=="number")try{R.set({revision:$.revision,order:$.order&&typeof $.order=="object"?$.order:{}})}catch{}}),le.on("display-policy-snapshot",y=>{let $=y;if($&&$.policy&&typeof $.policy=="object")try{me.set($.policy)}catch{}}),le.on("session-log-snapshot",y=>{let $=y;if($&&typeof $.id=="string")try{Le.set($.id,Array.isArray($.lines)?$.lines:[],typeof $.last_event_at=="number"?$.last_event_at:null)}catch{}}),le.on("session-log-append",y=>{let $=y;if($&&typeof $.id=="string")try{Le.append($.id,$.event)}catch{}}),le.on("snapshot",y=>{let $=y,ce=$&&typeof $.id=="string"?$.id:"",be=ce?Pe.getStore(ce):null;if(be&&$&&$.type==="snapshot")try{be.applyPush($)}catch{}}),le.on("upsert",y=>{let $=y,ce=$&&typeof $.id=="string"?$.id:"",be=ce?Pe.getStore(ce):null;if(be&&$&&$.type==="upsert")try{be.applyPush($)}catch{}}),le.on("delete",y=>{let $=y,ce=$&&typeof $.id=="string"?$.id:"",be=ce?Pe.getStore(ce):null;if(be&&$&&$.type==="delete")try{be.applyPush($)}catch{}});let Me=null,Be=null,W=null,K=null,De=()=>{},Ye=new Promise(y=>{De=()=>y(void 0)}),We=!1,ve=!1;async function J(y){let $=O(y);if($===Be||$===W)return;W=$;let ce=`detail:${y}`,be={type:"issue-detail",params:{id:y}};try{Pe.register(ce,be)}catch(Ve){t("register detail store failed: %o",Ve)}try{let Ve=await Ae.subscribeList(ce,be);if(Je.getState().selected_id!==y||O(y)!==$){await Ve().catch(()=>{});return}Me&&await Me().catch(()=>{}),Me=Ve,Be=$}catch(Ve){t("detail subscribe failed: %o",Ve),ee(Ve,"issue details")}finally{W===$&&(W=null)}}let Oe=new Map,et=new Set,ot={board:0,worker:0},vt=!1,at=rn;try{let y=window.localStorage.getItem(Up);un(y)&&(at=y)}catch{}let ct=rn;try{let y=window.localStorage.getItem(Yb);un(y)&&(ct=y)}catch{}async function Ne(y){if(!un(y)||y===at)return;at=y;try{window.localStorage.setItem(Up,y)}catch{}let $=Oe.get(Zn);if(!$)return;Oe.delete(Zn),await $().catch(()=>{});let ce=wt();try{Pe.register(Zn,ce)}catch(be){t("register %s store failed: %o",Zn,be)}try{let be=await Ae.subscribeList(Zn,ce);Oe.set(Zn,be)}catch(be){t("re-subscribe %s failed: %o",Zn,be),ee(be,"board")}}async function ht(y){if(!un(y)||y===ct)return;ct=y;let $=G.get(Yn);if(!$)return;G.delete(Yn),await $().catch(()=>{});let ce=nt();try{Pe.register(Yn,ce)}catch(be){t("register %s store failed: %o",Yn,be)}try{let be=await Ae.subscribeList(Yn,ce);G.set(Yn,be)}catch(be){t("re-subscribe %s failed: %o",Yn,be),ee(be,"worker")}}let G=new Map,pe=null,S=null,oe=null,Ze=null,ft=null;async function Ct(){Ze=null,me.clear(),ft=null,we.clear(),pe=null,S=null,Oe.clear(),G.clear(),ot.board+=1,ot.worker+=1,yt();let y=Je.getState().workspace.current?.path;if(y)try{await le.send("set-workspace",{path:y})}catch(ce){t("workspace restore after reconnect failed: %o",ce);return}St();let $=Je.getState();Ce($.view==="board"),je($.view==="worker"),z($.view==="monitor"),E($.view==="board"||$.view==="worker"||!!$.selected_id)}async function zt(){t("clearing all subscriptions for workspace switch"),pt(),He(),w(),ge.clear(),rt(),te(),Qe(),St(),H();let y=Je.getState();if(y.selected_id)try{Pe.unregister(`detail:${y.selected_id}`)}catch{}let $=Je.getState();Ce($.view==="board"),je($.view==="worker"),z($.view==="monitor"),E($.view==="board"||$.view==="worker"||!!$.selected_id),$.selected_id&&X($.selected_id)}async function Nt(y){t("requesting workspace switch to %s",y),ve=!0;try{let $=await le.send("set-workspace",{path:y});t("workspace switch result: %o",$),$&&$.workspace&&(Je.setState({workspace:{current:{path:$.workspace.root_dir,database:$.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",y),$.changed&&(await zt(),de("Switched to "+Lt(y),"success",2e3)))}catch($){throw t("workspace switch failed: %o",$),de("Failed to switch workspace","error",3e3),$}finally{ve=!1}}async function Mt(y){t("requesting workspace git pull for %s",y);try{let $=await le.send("git-pull-workspace",{});t("workspace git pull result: %o",$);let ce=$?.status;if(ce==="up_to_date"){de("Already up to date","success",2e3);return}if(ce==="stash_pop_conflict"){de("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}de("Git pulled "+Lt(y),"success",2e3)}catch($){t("workspace git pull failed: %o",$);let ce=$?.code,be=$?.message;if(ce==="rebase_conflict"){de("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(ce==="rebase_conflict_abort_failed"){de("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(ce==="busy"){de("Git pull skipped: another operation is running","warning",3e3);return}let Ve=be?`: ${be}`:"";throw de(`Git pull failed${Ve}`,"error",3e3),$}}async function Ft(y,$){t("setting workspace visibility %s \u2192 %s",y,String($));try{await le.send("set-workspace-visibility",{path:y,visible:$}),await Ue()}catch(ce){t("workspace visibility update failed: %o",ce),de("Failed to update project visibility","error",3e3)}}async function Ue(){try{let y=await le.send("list-workspaces",{});if(t("workspaces loaded: %o",y),y&&Array.isArray(y.workspaces)){let $=y.workspaces.map(Ie=>({path:Ie.path,database:Ie.database,pid:Ie.pid,version:Ie.version})),ce=y.current?{path:y.current.root_dir,database:y.current.db_path}:null,be=Array.isArray(y.hidden)?y.hidden.filter(Ie=>typeof Ie=="string"):[];Je.setState({workspace:{current:ce,available:$,hidden:be}});let Ve=window.localStorage.getItem("beads-ui.workspace");Ve&&(!$.some(u=>u.path===Ve)||be.includes(Ve)?window.localStorage.removeItem("beads-ui.workspace"):ce&&Ve!==ce.path&&(t("restoring saved workspace preference: %s",Ve),await Nt(Ve)))}}catch(y){t("failed to load workspaces: %o",y)}}le.on("workspace-changed",y=>{t("workspace-changed event: %o",y),y&&y.root_dir&&(Je.setState({workspace:{current:{path:y.root_dir,database:y.db_path}}}),Ue(),zt())});let Ut=!1;if(typeof le.onConnection=="function"){let y=$=>{t("ws state %s",$),$==="reconnecting"||$==="closed"?(Ut=!0,de("Connection lost. Reconnecting\u2026","error",4e3)):$==="open"&&Ut&&(Ut=!1,de("Reconnected","success",2200),Kb(Je,(ce,be)=>{t(`${ce}: %o`,be)}),Ct())};le.onConnection(y)}let Ht="board";try{let y=window.localStorage.getItem("beads-ui.view");(y==="board"||y==="worker"||y==="monitor")&&(Ht=y)}catch(y){t("view parse error: %o",y)}let Je=sc({config:Vb(),view:Ht});le.on("worker-queue-snapshot",y=>{let $=y;if(!$||!$.queue)return;let ce=Je.getState().workspace.current?.path;if(typeof ce=="string"&&ce.length>0&&$.root_dir!==ce){t("dropping worker-queue snapshot for %s",String($.root_dir));return}try{ge.set($.queue)}catch{}}),le.on("worker-parallel-analysis-snapshot",y=>{let $=y;if(!$)return;let ce=Je.getState().workspace.current?.path;if(!(typeof ce=="string"&&ce.length>0&&typeof $.root_dir=="string"&&$.root_dir!==ce))try{lt.set({settings:$.settings,job:$.job??null,runs:Array.isArray($.runs)?$.runs:[],last_good:$.last_good??null})}catch{}});let Wt=nc(Je);Wt.start();let qe=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),C=async(y,$)=>{try{return await xe(y,$)}catch(ce){if(qe.has(y))throw ce;return[]}};jd({global_element:r,repo_element:s},Je,Wt);let _e=document.getElementById("workspace-picker");_e&&Lp(_e,Je,Nt,Mt,Ft);let Te=zd(e,(y,$)=>xe(y,$));try{let y=document.getElementById("new-issue-btn");y&&y.addEventListener("click",()=>Te.open())}catch{}let it=Kd(e,{policyStore:me,queueStore:ge,implPresetStore:we,transport:(y,$)=>xe(y,$),onOpenChange:y=>{let $=vt;vt=y,gt(),$&&y===!1&&b.refreshSessionDefaults()},labelOptions:()=>{let y=new Set;for(let[$]of ji)for(let ce of Pe.snapshotFor($)||[]){let be=ce.labels;if(Array.isArray(be))for(let Ve of be)typeof Ve=="string"&&Ve.length>0&&y.add(Ve)}return Array.from(y).sort()}});try{let y=document.getElementById("display-settings-btn");y&&(y.setAttribute("aria-label","\uC124\uC815"),y.setAttribute("title","\uC124\uC815"),y.addEventListener("click",()=>it.open()))}catch{}let Rt=hc(i,{gotoIssue:y=>Wt.gotoIssue(y),issueStores:Pe,transport:C,workerQueueStore:ge,uiOrderStore:R,displayPolicyStore:me,closedRange:at,onClosedRangeChange:y=>{Ne(y)},onNewIssue:()=>Te.open()}),b=Ni(c,{transport:C,issueStores:Pe,queueStore:ge,analysisStore:lt,sessionLogStore:Le,uiOrderStore:R,gotoIssue:y=>Je.setState({selected_id:y}),getWorkspacePath:()=>Je.getState().workspace.current?.path,doneRange:ct,onDoneRangeChange:y=>{ht(y)}}),h=Fd(d,{transport:C,pipelineStore:mt,execPresetStore:we,sessionLogStore:Le,router:Wt,gotoIssue:y=>Wt.gotoIssue(y),getWorkspacePath:()=>Je.getState().workspace.current?.path,switchWorkspace:y=>Nt(y)}),x=Hu(p,{issueStores:Pe,transport:C,queueStore:ge,execPresetStore:we,sessionLogStore:Le,getWorkspacePath:()=>Je.getState().workspace.current?.path,onNavigate:y=>{Je.getState().view==="worker"?Je.setState({selected_id:y}):Wt.gotoIssue(y)},onClose:()=>{let y=Je.getState();Je.setState({selected_id:null});try{Wt.gotoView(y.view==="worker"||y.view==="monitor"?y.view:"board")}catch{}},onOpenExecPresets:()=>{it.open("execution")}}),I=Je.getState().selected_id;I&&(p.hidden=!1,x.load(I),X(I)),Je.subscribe(y=>{let $=y.selected_id;$?(p.hidden=!1,x.load($),ve||X($)):(x.clear(),p.hidden=!0,H())});let ne=y=>{i.hidden=y.view!=="board",c.hidden=y.view!=="worker",d.hidden=y.view!=="monitor",o&&o.classList.toggle("is-quiet",y.view==="monitor"),Ce(y.view==="board"),je(y.view==="worker"),z(y.view==="monitor"),E(y.view==="board"||y.view==="worker"||vt||!!y.selected_id),!y.selected_id&&y.view==="board"&&Rt.load(),y.view==="worker"&&b.load(),y.view==="monitor"?h.load():h.pause(),window.localStorage.setItem("beads-ui.view",y.view)};Je.subscribe(ne),ne(Je.getState()),te(),St(),yt(),Ue().finally(()=>{We=!0,De()}),window.addEventListener("keydown",y=>{let $=y.ctrlKey||y.metaKey,ce=String(y.key||"").toLowerCase(),be=y.target,Ve=be&&be.tagName?String(be.tagName).toLowerCase():"",Ie=Ve==="input"||Ve==="textarea"||Ve==="select"||be&&typeof be.isContentEditable=="boolean"&&be.isContentEditable;$&&ce==="n"&&(Ie||(y.preventDefault(),Te.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Zb(t)});export{Zb as bootstrap,Vb as readBootstrapConfig,Kb as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
