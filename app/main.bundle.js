var rf=Object.create;var pa=Object.defineProperty;var sf=Object.getOwnPropertyDescriptor;var of=Object.getOwnPropertyNames;var af=Object.getPrototypeOf,lf=Object.prototype.hasOwnProperty;var cf=(e,t,n)=>t in e?pa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var fa=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var uf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of of(t))!lf.call(e,s)&&s!==n&&pa(e,s,{get:()=>t[s],enumerable:!(r=sf(t,s))||r.enumerable});return e};var df=(e,t,n)=>(n=e!=null?rf(af(e)):{},uf(t||!e||!e.__esModule?pa(n,"default",{value:e,enumerable:!0}):n,e));var kt=(e,t,n)=>cf(e,typeof t!="symbol"?t+"":t,n);var ql=fa((sy,Nl)=>{var kr=1e3,$r=kr*60,xr=$r*60,or=xr*24,_f=or*7,mf=or*365.25;Nl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return gf(e);if(n==="number"&&isFinite(e))return t.long?bf(e):hf(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function gf(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*mf;case"weeks":case"week":case"w":return n*_f;case"days":case"day":case"d":return n*or;case"hours":case"hour":case"hrs":case"hr":case"h":return n*xr;case"minutes":case"minute":case"mins":case"min":case"m":return n*$r;case"seconds":case"second":case"secs":case"sec":case"s":return n*kr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function hf(e){var t=Math.abs(e);return t>=or?Math.round(e/or)+"d":t>=xr?Math.round(e/xr)+"h":t>=$r?Math.round(e/$r)+"m":t>=kr?Math.round(e/kr)+"s":e+"ms"}function bf(e){var t=Math.abs(e);return t>=or?Vs(e,t,or,"day"):t>=xr?Vs(e,t,xr,"hour"):t>=$r?Vs(e,t,$r,"minute"):t>=kr?Vs(e,t,kr,"second"):e+" ms"}function Vs(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var jl=fa((oy,Fl)=>{function yf(e){n.debug=n,n.default=n,n.coerce=u,n.disable=a,n.enable=s,n.enabled=i,n.humanize=ql(),n.destroy=d,Object.keys(e).forEach(p=>{n[p]=e[p]}),n.names=[],n.skips=[],n.formatters={};function t(p){let f=0;for(let g=0;g<p.length;g++)f=(f<<5)-f+p.charCodeAt(g),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(p){let f,g=null,w,A;function D(...W){if(!D.enabled)return;let V=D,Y=Number(new Date),N=Y-(f||Y);V.diff=N,V.prev=f,V.curr=Y,f=Y,W[0]=n.coerce(W[0]),typeof W[0]!="string"&&W.unshift("%O");let M=0;W[0]=W[0].replace(/%([a-zA-Z%])/g,(U,E)=>{if(U==="%%")return"%";M++;let R=n.formatters[E];if(typeof R=="function"){let Z=W[M];U=R.call(V,Z),W.splice(M,1),M--}return U}),n.formatArgs.call(V,W),(V.log||n.log).apply(V,W)}return D.namespace=p,D.useColors=n.useColors(),D.color=n.selectColor(p),D.extend=r,D.destroy=n.destroy,Object.defineProperty(D,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(w!==n.namespaces&&(w=n.namespaces,A=n.enabled(p)),A),set:W=>{g=W}}),typeof n.init=="function"&&n.init(D),D}function r(p,f){let g=n(this.namespace+(typeof f>"u"?":":f)+p);return g.log=this.log,g}function s(p){n.save(p),n.namespaces=p,n.names=[],n.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of f)g[0]==="-"?n.skips.push(g.slice(1)):n.names.push(g)}function o(p,f){let g=0,w=0,A=-1,D=0;for(;g<p.length;)if(w<f.length&&(f[w]===p[g]||f[w]==="*"))f[w]==="*"?(A=w,D=g,w++):(g++,w++);else if(A!==-1)w=A+1,D++,g=D;else return!1;for(;w<f.length&&f[w]==="*";)w++;return w===f.length}function a(){let p=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),p}function i(p){for(let f of n.skips)if(o(p,f))return!1;for(let f of n.names)if(o(p,f))return!0;return!1}function u(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Fl.exports=yf});var Bl=fa((Xt,Ks)=>{Xt.formatArgs=wf;Xt.save=kf;Xt.load=$f;Xt.useColors=vf;Xt.storage=xf();Xt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Xt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function vf(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function wf(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ks.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}Xt.log=console.debug||console.log||(()=>{});function kf(e){try{e?Xt.storage.setItem("debug",e):Xt.storage.removeItem("debug")}catch{}}function $f(){let e;try{e=Xt.storage.getItem("debug")||Xt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function xf(){try{return localStorage}catch{}}Ks.exports=jl()(Xt);var{formatters:Af}=Ks.exports;Af.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Zr=globalThis,Bs=Zr.trustedTypes,kl=Bs?Bs.createPolicy("lit-html",{createHTML:e=>e}):void 0,ma="$lit$",Sn=`lit$${Math.random().toFixed(9).slice(2)}$`,ga="?"+Sn,pf=`<${ga}>`,tr=document,Qr=()=>tr.createComment(""),Xr=e=>e===null||typeof e!="object"&&typeof e!="function",ha=Array.isArray,Tl=e=>ha(e)||typeof e?.[Symbol.iterator]=="function",_a=`[ 	
\f\r]`,Yr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$l=/-->/g,xl=/>/g,Jn=RegExp(`>|${_a}(?:([^\\s"'>=/]+)(${_a}*=${_a}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Al=/'/g,Sl=/"/g,Cl=/^(?:script|style|textarea|title)$/i,ba=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),l=ba(1),wr=ba(2),Qb=ba(3),ln=Symbol.for("lit-noChange"),Ot=Symbol.for("lit-nothing"),El=new WeakMap,er=tr.createTreeWalker(tr,129);function Rl(e,t){if(!ha(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return kl!==void 0?kl.createHTML(t):t}var Ll=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Yr;for(let i=0;i<n;i++){let u=e[i],d,p,f=-1,g=0;for(;g<u.length&&(a.lastIndex=g,p=a.exec(u),p!==null);)g=a.lastIndex,a===Yr?p[1]==="!--"?a=$l:p[1]!==void 0?a=xl:p[2]!==void 0?(Cl.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=Jn):p[3]!==void 0&&(a=Jn):a===Jn?p[0]===">"?(a=s??Yr,f=-1):p[1]===void 0?f=-2:(f=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?Jn:p[3]==='"'?Sl:Al):a===Sl||a===Al?a=Jn:a===$l||a===xl?a=Yr:(a=Jn,s=void 0);let w=a===Jn&&e[i+1].startsWith("/>")?" ":"";o+=a===Yr?u+pf:f>=0?(r.push(d),u.slice(0,f)+ma+u.slice(f)+Sn+w):u+Sn+(f===-2?i:w)}return[Rl(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Jr=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,u=this.parts,[d,p]=Ll(t,n);if(this.el=e.createElement(d,r),er.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=er.nextNode())!==null&&u.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(ma)){let g=p[a++],w=s.getAttribute(f).split(Sn),A=/([.?@])?(.*)/.exec(g);u.push({type:1,index:o,name:A[2],strings:w,ctor:A[1]==="."?Ws:A[1]==="?"?zs:A[1]==="@"?Hs:rr}),s.removeAttribute(f)}else f.startsWith(Sn)&&(u.push({type:6,index:o}),s.removeAttribute(f));if(Cl.test(s.tagName)){let f=s.textContent.split(Sn),g=f.length-1;if(g>0){s.textContent=Bs?Bs.emptyScript:"";for(let w=0;w<g;w++)s.append(f[w],Qr()),er.nextNode(),u.push({type:2,index:++o});s.append(f[g],Qr())}}}else if(s.nodeType===8)if(s.data===ga)u.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(Sn,f+1))!==-1;)u.push({type:7,index:o}),f+=Sn.length-1}o++}}static createElement(t,n){let r=tr.createElement("template");return r.innerHTML=t,r}};function nr(e,t,n=e,r){if(t===ln)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=Xr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=nr(e,s._$AS(e,t.values),s,r)),t}var Us=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??tr).importNode(n,!0);er.currentNode=s;let o=er.nextNode(),a=0,i=0,u=r[0];for(;u!==void 0;){if(a===u.index){let d;u.type===2?d=new vr(o,o.nextSibling,this,t):u.type===1?d=new u.ctor(o,u.name,u.strings,this,t):u.type===6&&(d=new Gs(o,this,t)),this._$AV.push(d),u=r[++i]}a!==u?.index&&(o=er.nextNode(),a++)}return er.currentNode=tr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},vr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Ot,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=nr(this,t,n),Xr(t)?t===Ot||t==null||t===""?(this._$AH!==Ot&&this._$AR(),this._$AH=Ot):t!==this._$AH&&t!==ln&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Tl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ot&&Xr(this._$AH)?this._$AA.nextSibling.data=t:this.T(tr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Jr.createElement(Rl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Us(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=El.get(t.strings);return n===void 0&&El.set(t.strings,n=new Jr(t)),n}k(t){ha(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(Qr()),this.O(Qr()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},rr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Ot,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Ot}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=nr(this,t,n,0),a=!Xr(t)||t!==this._$AH&&t!==ln,a&&(this._$AH=t);else{let i=t,u,d;for(t=o[0],u=0;u<o.length-1;u++)d=nr(this,i[r+u],n,u),d===ln&&(d=this._$AH[u]),a||(a=!Xr(d)||d!==this._$AH[u]),d===Ot?t=Ot:t!==Ot&&(t+=(d??"")+o[u+1]),this._$AH[u]=d}a&&!s&&this.j(t)}j(t){t===Ot?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ws=class extends rr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ot?void 0:t}},zs=class extends rr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ot)}},Hs=class extends rr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=nr(this,t,n,0)??Ot)===ln)return;let r=this._$AH,s=t===Ot&&r!==Ot||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Ot&&(r===Ot||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Gs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){nr(this,t)}},Ol={M:ma,P:Sn,A:ga,C:1,L:Ll,R:Us,D:Tl,V:nr,I:vr,H:rr,N:zs,U:Hs,B:Ws,F:Gs},ff=Zr.litHtmlPolyfillSupport;ff?.(Jr,vr),(Zr.litHtmlVersions??(Zr.litHtmlVersions=[])).push("3.3.1");var Ze=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new vr(t.insertBefore(Qr(),o),o,void 0,n??{})}return s._$AI(e),s};var nn="today",Fn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function cn(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function sr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Il(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Pl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ml(){let e=null,t=[],n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],r()},clear(){e=null,t=[],r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Dl(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Ul=df(Bl(),1);function Et(e){return(0,Ul.default)(`beads-ui:${e}`)}function mn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ar(e,t){let n=mn(e.created_at),r=mn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Hl(e,t){let n=mn(e.created_at),r=mn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Gl(e,t){let n=mn(e.updated_at),r=mn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Vl(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=mn(e.created_at),o=mn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Kl(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Sf=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Wl(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function zl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Sf.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Yl(e,t){let n=Wl(e),r=Wl(t);if(n!==r)return n<r?-1:1;let s=zl(e),o=zl(t);if(s!==o)return s<o?-1:1;let a=mn(e&&e.created_at),i=mn(t&&t.created_at);if(a!==i)return a<i?-1:1;let u=e&&e.id,d=t&&t.id;return u===d?0:String(u)<String(d)?-1:1}var ya=2**20;function Ar(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-mn(e&&e.created_at)}function Ys(e){return(t,n)=>{let r=Ar(t,e),s=Ar(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function va(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Ar(i,n)-ya};if(!i)return{rank:Ar(a,n)+ya};let u=Ar(a,n),d=Ar(i,n),p=(u+d)/2;return u<p&&p<d?{rank:p}:{renormalize:r.map((f,g)=>({bead_id:f.id,rank:g*ya}))}}function wa(e,t={}){let n=Et(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,u=t.sort||ar;function d(){for(let g of Array.from(a))try{g()}catch{}}function p(){s=Array.from(r.values()).sort(u)}function f(g){if(i||!g||g.id!==e)return;let w=Number(g.revision)||0;if(n("apply %s rev=%d",g.type,w),!(w<=o&&g.type!=="snapshot")){if(g.type==="snapshot"){if(w<=o)return;r.clear();let A=Array.isArray(g.issues)?g.issues:[];for(let D of A)D&&typeof D.id=="string"&&D.id.length>0&&r.set(D.id,D);p(),o=w,d();return}if(g.type==="upsert"){let A=g.issue;if(A&&typeof A.id=="string"&&A.id.length>0){let D=r.get(A.id);if(!D)r.set(A.id,A);else{let W=Number.isFinite(D.updated_at)?D.updated_at:0,V=Number.isFinite(A.updated_at)?A.updated_at:0;if(W<=V){for(let Y of Object.keys(D))Y in A||delete D[Y];for(let[Y,N]of Object.entries(A))D[Y]=N}}p()}o=w,d()}else if(g.type==="delete"){let A=String(g.issue_id||"");A&&(r.delete(A),p()),o=w,d()}}}return{id:e,subscribe(g){return a.add(g),()=>{a.delete(g)}},applyPush:f,snapshot(){return s},size(){return r.size},getById(g){return r.get(g)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function Zs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Zl(e){let t=Et("subs"),n=new Map,r=new Map;function s(i,u){t("applyDelta %s +%d ~%d -%d",i,(u.added||[]).length,(u.updated||[]).length,(u.removed||[]).length);let d=r.get(i);if(!d||d.size===0)return;let p=Array.isArray(u.added)?u.added:[],f=Array.isArray(u.updated)?u.updated:[],g=Array.isArray(u.removed)?u.removed:[];for(let w of Array.from(d)){let A=n.get(w);if(!A)continue;let D=A.itemsById;for(let W of p)typeof W=="string"&&W.length>0&&D.set(W,!0);for(let W of f)typeof W=="string"&&W.length>0&&D.set(W,!0);for(let W of g)typeof W=="string"&&W.length>0&&D.delete(W)}}async function o(i,u){let d=Zs(u);if(t("subscribe %s key=%s",i,d),!n.has(i))n.set(i,{key:d,itemsById:new Map});else{let f=n.get(i);if(f&&f.key!==d){let g=r.get(f.key);g&&(g.delete(i),g.size===0&&r.delete(f.key)),n.set(i,{key:d,itemsById:new Map})}}r.has(d)||r.set(d,new Set);let p=r.get(d);p&&p.add(i);try{await e("subscribe-list",{id:i,type:u.type,params:u.params})}catch(f){let g=n.get(i)||null;if(g){let w=r.get(g.key);w&&(w.delete(i),w.size===0&&r.delete(g.key))}throw n.delete(i),f}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let f=n.get(i)||null;if(f){let g=r.get(f.key);g&&(g.delete(i),g.size===0&&r.delete(f.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Zs,selectors:{getIds(i){let u=n.get(i);return u?Array.from(u.itemsById.keys()):[]},has(i,u){let d=n.get(i);return d?d.itemsById.has(u):!1},count(i){let u=n.get(i);return u?u.itemsById.size:0},getItemsById(i){let u=n.get(i),d={};if(!u)return d;for(let p of u.itemsById.keys())d[p]=!0;return d}}}}function Ql(){let e=Et("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let u of Array.from(r))try{u()}catch{}}function a(u,d,p){let f=d?Zs(d):"",g=n.get(u)||"",w=t.has(u);if(e("register %s key=%s (prev=%s)",u,f,g),w&&g&&f&&g!==f){let A=t.get(u);if(A)try{A.dispose()}catch{}let D=s.get(u);if(D){try{D()}catch{}s.delete(u)}let W=wa(u,p);t.set(u,W);let V=W.subscribe(()=>o());s.set(u,V)}else if(!w){let A=wa(u,p);t.set(u,A);let D=A.subscribe(()=>o());s.set(u,D)}return n.set(u,f),()=>i(u)}function i(u){e("unregister %s",u),n.delete(u);let d=t.get(u);d&&(d.dispose(),t.delete(u));let p=s.get(u);if(p){try{p()}catch{}s.delete(u)}}return{register:a,unregister:i,getStore(u){return t.get(u)||null},snapshotFor(u){let d=t.get(u);return d?d.snapshot().slice():[]},subscribe(u){return r.add(u),()=>r.delete(u)}}}function Xl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Jl(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function ec(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ka(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Ef(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Tf(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function tc(e){let t=Et("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Ef(r),a=Tf(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let u=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==u&&(window.location.hash=u)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=ka(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?ka(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var Cf=Object.freeze({workspace_config:{default_workspace:null}});function nc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Cf.workspace_config.default_workspace}}}function rc(e={}){let t=Et("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:nc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?nc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==n.workspace.hidden[p]),u=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===n.worker.show_closed_children[p])&&!i&&!u||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function sc(e){let t=Et("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let d=n>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let d=n;n=Math.max(0,n-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,n),o()}function u(d){return async(f,g)=>{let w=s++,A=Date.now();r.set(w,{type:f,start_ts:A}),t("request start id=%d type=%s count=%d",w,f,n+1),a();let D=!1,W=()=>{D||(D=!0,r.delete(w),i())},V=setTimeout(()=>{D||(t("request TIMEOUT id=%d type=%s elapsed=%dms",w,f,Date.now()-A),W())},3e4);try{let Y=await d(f,g),N=Date.now()-A;return t("request done id=%d type=%s elapsed=%dms",w,f,N),Y}catch(Y){let N=Date.now()-A;throw t("request error id=%d type=%s elapsed=%dms err=%o",w,f,N,Y),Y}finally{clearTimeout(V),W()}}}return o(),{wrapSend:u,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let d=Date.now();return Array.from(r.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:d-f.start_ts}))}}}function ce(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Qs(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let u=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return u.sort(Kl),u;switch(i){case"created_desc":return u.sort(ar),u;case"created_asc":return u.sort(Hl),u;case"updated_desc":return u.sort(Gl),u;case"priority":return u.sort(Vl),u;case"manual":default:{let d=n();return d?u.sort(Ys(d)):u.sort(ar),u}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function kn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Gt(e){let t=kn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function rn(e,t){let n=kn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let u=Math.floor(i/7);if(i<30)return`${u}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function oc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=kn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Xs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Js(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=Xs(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function eo(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=oc(n);return{total:n.length,count:r,current:s,children:n}}function to(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let u={...a.order};for(let d of i)u[d.bead_id]=d.rank;n&&n.set({revision:a.revision,order:u})}async function o(a,i,u){if(!t||!n)return;let d=n.get()||{revision:0,order:{}},p=r(va(i,u,d.order),a);s(d,p);let f=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(f&&f.conflict){let g={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(g);let w=r(va(i,u,g.order),a);s(g,w);let A=await t("ui-order-set",{expected_revision:g.revision,entries:w});A&&A.applied&&n.set({revision:typeof A.revision=="number"?A.revision:0,order:A.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function no(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function $a(e,t){return!t||typeof e!="string"||e.length===0||no(t.visible_labels).includes(e)?!0:no(t.hidden_labels).includes(e)?!1:!no(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function ac(e,t){return no(e).filter(n=>$a(n,t))}function jn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function Rf(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Lf(e,t,n,r,s){return l`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function Of(e,t,n,r){return l`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${Rf(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function ro(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(Yl):a;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?Lf(t.parent_id,e.count,n,r,t.onToggle):l`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?l`<div class="board-card__roll-list">
            ${i.map((u,d)=>Of(u,d+1,t.childChips?t.childChips(u):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var If={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},lc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},ic={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Pf={review:"\u2713",skip:"\u2298"},Bn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Mf(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function cc(e){let t=e&&e.fill||"none";return t==="none"?Bn.none:e&&e.stale===!0?Bn.stale:t==="dim"?Bn.dim:e&&e.glyph==="review"?Bn.review:e&&e.glyph==="skip"?Bn.skip:Bn.done}function Df(e){if(!e||e.fill==="none"||!e.approval_state)return cc(e);let t=[];return e.glyph==="review"?t.push(Bn.review):e.glyph==="skip"&&t.push(Bn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Nf(e,t,n){let r=If[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Pf[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${r} dim`:s==="full"&&(i+=` b-${r} full`),o&&(i+=" stale"),n&&(i+=" cur");let u=s==="none"?"lbl":`lbl l-${r} on`,d=n?`color: var(--stage-${r}-on)`:"";return l`
    <div class="seg">
      <div class=${i} style=${d}>${a}</div>
      <div class=${u}>
        ${lc[e]||e}
      </div>
    </div>
  `}function so(e,t){if(!e||!e.stages)return"";let n=ic[e.route]||ic.spec_backed,r=e.stages,s=Mf(n,r,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(a=>`${lc[a]||a} ${a==="plan"?Df(r[a]||{}):cc(r[a]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${o}>
      ${n.map(a=>Nf(a,r[a]||{},a===s))}
    </div>
  `}function qf(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var uc=2;function Ff(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,uc).join(", "),s=n.length-uc,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function xa(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function oo(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function En(e){return`${e.kind}:${oo(e)}@${e.sha}`}function ao(e,t){if(!e)return null;let n=xa(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=xa(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,u=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,d=t?` \xB7 exec_receipt ${En(t)}`:"";return{kind:e.kind,label:i,title:`${u}${d}`}}function dc(e,t){let n=ao(e,t);return n?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function jf(e){if(!e)return null;let t=xa(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${En(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Bf(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&jn(n,"route")){let i=r.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&jn(n,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&jn(n,"pr")){let i=r.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=dc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${En(i)}`}
        >${`exec ${i.kind==="delegated"?oo(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of ac(e.labels,n))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&jn(n,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),jn(n,"blocked")&&s.push(...Ff(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&jn(n,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function Uf(e){let t=rn(e.created_at),n=rn(e.updated_at);return!t&&!n?"":l`<span class="board-card__times">
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
  </span>`}function Wf(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return ro(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Uf(e),empty_label:"children \uC5C6\uC74C",childChips:Aa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function Aa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return ao(t,n)?l`<span class="board-card__roll-child-chips">
    ${dc(t,n)}
    ${jf(n)}
  </span>`:null}function io(e,t){let n=qf(e.priority);return l`
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
      ${Bf(e,t)}
      ${e.workflow&&jn(t.policy||null,"stepper")?so(e.workflow,e.status):""}
      ${Wf(e,t)}
    </article>
  `}function Sr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return l`
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
              ${Fn.map(o=>l`<option
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
  `}function pc(e,t,n){return l`
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
  `}var zf=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Hf=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Gf=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Vf(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return l`
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
  `}function fc(e,t,n){return l`
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
        ${zf.map(r=>l`<option
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
        ${Hf.map(r=>l`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Vf(e,t,n)}
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
        ${Gf.map(r=>l`<option
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
  `}var Kf=200,Yf={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Zf=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),_c="beads-ui.board.sort",mc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Qf(){try{let e=window.localStorage.getItem(_c);if(e&&mc.has(e))return e}catch{}return"created_desc"}function gc(e,t){let n=Et("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,u=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,f=t.closedRange||nn,g=s?Qs(s,a):null,w=to({transport:o,uiOrderStore:a}),A=[],D=[],W=[],V=[],Y=[],N=[],M=!1,q=0,U=Qf(),E=new Map,R=new Map,Z=new Map,$e=new Set,ue={search:"",priority:"",type:"",labels:[]},me=!1,Q=null;function Re(G){return String(G.status||"open")==="open"}function we(G){let pe=String(G.status||"open");return pe==="open"||pe==="blocked"}function oe(G){let pe=ue.search.trim().toLowerCase(),qe=ue.priority,S=ue.type,I=ue.labels;return G.filter(k=>{if(pe){let L=String(k.id||"").toLowerCase(),re=String(k.title||"").toLowerCase();if(!L.includes(pe)&&!re.includes(pe))return!1}if(qe!==""&&String(k.priority)!==qe||S!==""&&String(k.issue_type||"")!==S)return!1;if(I.length>0){let L=Array.isArray(k.labels)?k.labels:[];if(!I.some(re=>L.includes(re)))return!1}return!0})}function ae(){let G=new Set;for(let pe of[A,D,W,V,Y,N])for(let qe of pe){let S=Array.isArray(qe.labels)?qe.labels:[];for(let I of S)typeof I=="string"&&I.length>0&&G.add(I)}return Array.from(G).sort()}function xe(){return ue.search.trim()!==""||ue.priority!==""||ue.type!==""||ue.labels.length>0}function F(){try{if(g){let G=g.selectBoardColumn("tab:board:in-progress","in_progress",U),pe=g.selectBoardColumn("tab:board:blocked","blocked",U).filter(we),qe=new Set(G.map(be=>be.id)),S=g.selectBoardColumn("tab:board:ready","ready",U).filter(be=>Re(be)&&!qe.has(be.id)),I=g.selectBoardColumn("tab:board:resolved","resolved",U),k=g.selectBoardColumn("tab:board:deferred","deferred",U),L=g.selectBoardColumn("tab:board:closed","closed").slice(0,Kf),re=[...pe,...S,...G,...I,...L];se(re);let de=new Set;for(let be of re)be&&be.id&&!Xs(be)&&de.add(be.id);let te=!xe();A=te?es(pe,de):pe,D=te?es(S,de):S,W=te?es(G,de):G,V=te?es(I,de):I,Y=k,q=k.length,N=te?es(L,de):L,E=new Map;for(let be of A)E.set(be.id,"open");for(let be of D)E.set(be.id,"open");for(let be of W)E.set(be.id,"in_progress");for(let be of V)E.set(be.id,"resolved");for(let be of Y)E.set(be.id,"deferred");for(let be of N)E.set(be.id,"closed");R=new Map;for(let be of A)R.set(be.id,"blocked-col");for(let be of D)R.set(be.id,"ready-col");for(let be of W)R.set(be.id,"in-progress-col");for(let be of V)R.set(be.id,"resolved-col");for(let be of N)R.set(be.id,"closed-col")}Je()}catch{A=[],D=[],W=[],V=[],Y=[],N=[],Z=new Map,Je()}}function se(G){Z=Js(G)}function ie(G){return eo(Z,G)}function Ae(G){return!$e.has(G)}function Se(G,pe){G.preventDefault(),G.stopPropagation(),$e.has(pe)?$e.delete(pe):$e.add(pe),Je()}function Ie(G,pe){G.preventDefault(),G.stopPropagation(),r(pe)}function he(G,pe){G.preventDefault(),G.stopPropagation(),r(pe)}function it(G,pe){Q||r(pe)}function _t(G,pe){G.preventDefault(),G.stopPropagation(),Xf(pe).then(qe=>{qe&&ce("\uBCF5\uC0AC\uB428","success",1200)})}function C(G,pe){Q=pe,G.dataTransfer&&(G.dataTransfer.setData("text/plain",pe),G.dataTransfer.effectAllowed="move"),G.target.classList.add("board-card--dragging")}function ge(G){G.target.classList.remove("board-card--dragging"),gt(),setTimeout(()=>{Q=null},0)}function ke(G){let pe=String(G.target.value||"");!pe||pe===f||(f=pe,d&&d(pe),Je())}function Le(){return i?i.get():null}function Me(G){let pe=u?u.get():null,qe=pe?pe.cleanup_failed:null;if(!qe||typeof qe!="object"||Array.isArray(qe))return null;let S=qe[G];return!S||typeof S!="object"||Array.isArray(S)?null:S}let Be={onCardClick:it,onCopyId:_t,onDragStart:C,onDragEnd:ge,onClosedRangeChange:ke,rollupFor:ie,isExpanded:Ae,onRollupToggle:Se,onChildClick:Ie,onFromChipClick:he,cleanupFailureFor:Me,get policy(){return Le()}};function z(G,pe){Q||(X(),r(pe))}function K(G,pe){G.preventDefault(),G.stopPropagation(),X(),r(pe)}let De={...Be,onCardClick:z,onChildClick:K,onFromChipClick:K,get policy(){return Le()}};function Qe(G){let pe=G.target,qe=e.querySelector(".board-filter__labels");pe&&qe&&qe.contains(pe)||P()}function We(G){G.key==="Escape"&&P()}function ve(){me||(me=!0,document.addEventListener("mousedown",Qe),document.addEventListener("keydown",We),Je())}function P(){me&&(me=!1,document.removeEventListener("mousedown",Qe),document.removeEventListener("keydown",We),Je())}function H(G){G.key==="Escape"&&X()}function J(){M||(M=!0,document.addEventListener("keydown",H),Je())}function X(){M&&(M=!1,document.removeEventListener("keydown",H),Je())}let Pe={onClose:X,onOverlayClick(G){G.target===G.currentTarget&&X()}},tt={onSearchInput(G){ue.search=String(G.target.value||""),F()},onPriorityChange(G){ue.priority=String(G.target.value||""),F()},onTypeChange(G){ue.type=String(G.target.value||""),F()},onSortChange(G){let pe=String(G.target.value||"");if(!(!mc.has(pe)||pe===U)){U=pe;try{window.localStorage.setItem(_c,pe)}catch{}F()}},onDeferredToggle(){M?X():J()},onLabelMenuToggle(){me?P():ve()},onLabelToggle(G){let pe=ue.labels.indexOf(G);pe===-1?ue.labels.push(G):ue.labels.splice(pe,1),F()},onLabelClear(){ue.labels.length!==0&&(ue.labels=[],F())},onNewIssue(){p&&p()}};function st(){return l`
      <div class="board-view">
        ${fc(ue,tt,{sort_mode:U,deferred_popup_open:M,deferred_count:q,label_options:ae(),label_menu_open:me})}
        <div class="board-root">
          ${Sr({title:"Blocked",id:"blocked-col",items:oe(A)},Be)}
          ${Sr({title:"Ready",id:"ready-col",items:oe(D)},Be)}
          ${Sr({title:"In progress",id:"in-progress-col",items:oe(W)},Be)}
          ${Sr({title:"Resolved",id:"resolved-col",items:oe(V)},Be)}
          ${Sr({title:"Closed",id:"closed-col",items:oe(N),is_closed:!0,closed_range:f},Be)}
        </div>
        ${M?pc({items:oe(Y),count:q},De,Pe):""}
      </div>
    `}function Je(){Ze(st(),e),vt()}function vt(){try{let G=e.querySelector("#deferred-popup");G&&!G.open&&(typeof G.showModal=="function"?G.showModal():G.setAttribute("open",""));let pe=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let qe of pe)Array.from(qe.querySelectorAll(".board-card")).forEach((I,k)=>{I.tabIndex=k===0?0:-1})}catch{}}async function mt(G,pe){if(!o){ce("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:G,status:pe}),ce("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(qe){n("update-status failed: %o",qe),ce("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ot(G){switch(G){case"blocked-col":return A;case"ready-col":return D;case"in-progress-col":return W;case"resolved-col":return V;default:return[]}}function ut(G,pe,qe){if(!o||!a)return;let S=ot(G),I=S.find(te=>te.id===pe);if(!I)return;let k=S.filter(te=>te.id!==pe),L=qe.closest?qe.closest(".board-card"):null,re=k.length;if(L){let te=L.getAttribute("data-issue-id");if(te===pe)return;let be=k.findIndex(ct=>ct.id===te);be>=0&&(re=be)}let de=k.slice();de.splice(re,0,I),w.applyReorder(pe,de,re)}function gt(){for(let G of Array.from(e.querySelectorAll(".board-column--drag-over")))G.classList.remove("board-column--drag-over")}let Ve=null;e.addEventListener("dragover",G=>{G.preventDefault(),G.dataTransfer&&(G.dataTransfer.dropEffect="move");let qe=G.target.closest(".board-column");qe&&qe!==Ve&&(Ve&&Ve.classList.remove("board-column--drag-over"),qe.classList.add("board-column--drag-over"),Ve=qe)}),e.addEventListener("dragleave",G=>{let pe=G.relatedTarget;(!pe||!e.contains(pe))&&Ve&&(Ve.classList.remove("board-column--drag-over"),Ve=null)}),e.addEventListener("drop",G=>{G.preventDefault(),Ve&&(Ve.classList.remove("board-column--drag-over"),Ve=null);let pe=G.target,qe=pe.closest(".board-column");if(!qe)return;let S=G.dataTransfer?.getData("text/plain")||"";if(!S)return;let I=qe.id,k=R.get(S);if(k&&k===I){if(Zf.has(I)){if(U!=="manual"){ce("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ut(I,S,pe)}return}let L=Yf[I];if(!L){ce("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}E.get(S)!==L&&mt(S,L)}),e.addEventListener("keydown",G=>{let pe=G.target;if(!(pe instanceof HTMLElement))return;let qe=String(pe.tagName||"").toLowerCase();if(qe==="input"||qe==="textarea"||qe==="select"||qe==="button"||qe==="a"||pe.isContentEditable===!0)return;let S=pe.closest(".board-card");if(!S)return;let I=String(G.key||"");if(I==="Enter"||I===" "){G.preventDefault();let de=S.getAttribute("data-issue-id");de&&r(de);return}if(I!=="ArrowUp"&&I!=="ArrowDown"&&I!=="ArrowLeft"&&I!=="ArrowRight")return;G.preventDefault();let k=S.closest(".board-column");if(!k)return;let L=Array.from(k.querySelectorAll(".board-card")),re=L.indexOf(S);if(I==="ArrowDown"&&re<L.length-1){Ne(S,L[re+1]);return}if(I==="ArrowUp"&&re>0){Ne(S,L[re-1]);return}if(I==="ArrowLeft"||I==="ArrowRight"){let de=Array.from(e.querySelectorAll(".board-column")),te=de.indexOf(k),be=I==="ArrowRight"?1:-1,ct=te+be;for(;ct>=0&&ct<de.length;){let Xe=de[ct].querySelector(".board-card");if(Xe){Ne(S,Xe);return}ct+=be}}});function Ne(G,pe){try{G.tabIndex=-1,pe.tabIndex=0,pe.focus()}catch{}}let He=null;g&&g.subscribe&&(He=g.subscribe(()=>{try{F()}catch{}}));let wt=null;i&&i.subscribe&&(wt=i.subscribe(()=>{try{F()}catch{}}));let lt=null;return u&&u.subscribe&&(lt=u.subscribe(()=>{Je()})),{async load(){n("load"),F()},clear(){P(),X(),He&&(He(),He=null),wt&&(wt(),wt=null),lt&&(lt(),lt=null),e.replaceChildren(),A=[],D=[],W=[],V=[],Y=[],N=[],E=new Map,R=new Map}}}function es(e,t){return e.filter(n=>{let r=Xs(n);return!(r&&t.has(r))})}async function Xf(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function sn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function ir(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ts(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Jf(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${ir(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ir(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(u=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),u(p)};r.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Tn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await Jf(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var e_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],hc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},t_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Pt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Tt(e){return typeof e=="string"&&e.length>0?e:null}function Er(e){return e.startsWith("gpt-")?e.slice(4):e}function xt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function yc(e,t,n){let r=Tt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Tt(n[e]);return s===null?null:{value:s,source:"global"}}function ns(e,t,n,r){return yc(e,t,n)||{value:r,source:"base"}}function Sa(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&Pt(s?.[t])){let a=Tt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Pt(s)){for(let a of Object.values(s))if(Pt(a)){let i=Tt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Tt(r?.runners?.[o]?.models?.[e]?.id)||e}function n_(e,t){return Tt(t?.review?.reviewers?.[e]?.model)||e}function Tr(e,t,n=!1){if(e==="default")return xt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Er(e):e;return xt(e,t,r,e,"explicit")}function vc(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];Pt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(Pt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function r_(e,t){let n=[],r=e?.implementation?.model_catalog;Pt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(Pt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function s_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of r_(t,n)){let o=vc(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function Ea(e){return xt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function bc(e,t,n){let r=yc(e,t,n);return r?Tr(r.value,r.source):xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Jt(e){let t=Pt(e.pin)?e.pin:{},n=Pt(e.global)?e.global:{},r=Pt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&Pt(r.session)?r.session:null,o=r?.supported===!0&&Pt(r.orchestration)?r.orchestration:null,a=Pt(e.runner_catalog)?e.runner_catalog:null,i=Tt(n.quick_fix_impl_model),u=s_(i,s,a),d={};if(s){let p=ns("workflow_mode",t,n,Tt(s.workflow_mode_default));d.workflow_mode=p.source==="base"?xt(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):Tr(p.value,p.source);for(let N of["spec_review","plan_review","impl_review"]){let M=`${N}_model`,q=Tt(N==="plan_review"?p.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),U=ns(M,t,n,q);if(U.value===null)d[M]=xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(U.value!=="self"&&U.value!=="skip"&&!Pt(s.review?.reviewers?.[U.value]))d[M]=Ea(xt(U.value,U.source,"",null,"explicit"));else{let E=n_(U.value,s);d[M]=xt(U.value,U.source,Er(E),E,U.source==="base"?"default":"explicit")}}for(let[N,M]of Object.entries(hc)){let q=d[M].value;if(q==="self"||q==="skip"){d[N]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let U=Tt(s.review?.reviewers?.[q||""]?.effort),E=ns(N,t,n,U);d[N]=E.value===null?xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):xt(E.value,E.source,E.value,E.value,E.source==="base"?"default":"explicit")}let f=Pt(s.implementation?.default)?s.implementation.default:{},g=Tt(e.route),w=g!==null&&["quick_fix","spec_backed","full_plan"].includes(g),A=Pt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},D=w&&Pt(A[g])?A[g]:{};for(let N of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let M=ns(N,t,n,N==="impl_dispatch"?Tt(D.dispatch)||Tt(f.dispatch):Tt(f[N.replace("impl_","")]));d[N]=M.value===null?xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):xt(M.value,M.source,M.value,M.value,M.source==="base"?"default":"explicit")}let W=Tt(t.impl_runtime),V=W==="inherit"?Tt(e.controller_runtime):W,Y=g==="quick_fix"&&Tt(t.impl_dispatch)===null&&u.runtime!==null&&(W===null||V===u.runtime);if(Y){let N=u.runtime,M=i;d.impl_dispatch=xt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),W===null&&(d.impl_runtime=xt(N,"global",`${N} (\uC720\uB3C4)`,N,"explicit")),Tt(t.impl_model)===null&&(d.impl_model=xt(M,"global",M,M,"explicit"))}if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let N of["impl_runtime","impl_model","impl_effort","impl_speed"])d[N]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(d.impl_dispatch.value==="delegated"&&!Y&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_model.value!==null){let N=d.impl_runtime.value==="inherit"?Tt(e.controller_runtime):d.impl_runtime.value,M=N?vc(N,s,a):[];if(d.impl_model.value!=="auto"&&M.length>0&&!M.includes(d.impl_model.value))d.impl_model=Ea(d.impl_model);else{let q=Sa(d.impl_model.value,N,s,a);d.impl_model.display=Er(q),d.impl_model.full_value=q}}if(d.impl_effort.value==="auto"){let N=Tt(e.transport)||(d.impl_runtime.value==="codex"?"codex-native-spawn":d.impl_runtime.value==="claude"?"implement-claude":null),M=N?Tt(s.implementation?.effort_by_transport?.[N]?.auto):null;M&&!t_.has(M)?(d.impl_effort.display=`${M} (\uBE44\uD638\uD658)`,d.impl_effort.full_value=M,d.impl_effort.resolution="incompatible"):(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}d.impl_speed.value==="default"&&(d.impl_speed=d.impl_speed.source==="base"?xt("default","base","default (\uC77C\uBC18)","default","default"):Tr("default",d.impl_speed.source))}}else for(let p of e_.filter(f=>!f.startsWith("orchestration_")))d[p]=bc(p,t,n);if(!s){for(let[p,f]of Object.entries(hc))(d[f].value==="self"||d[f].value==="skip")&&(d[p]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])d[p]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else d.impl_dispatch.value==="delegated"&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_effort.value==="auto"&&(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){d[p]=bc(p,t,n);continue}let f=p.replace("orchestration_",""),g=Tt(o[f]),w=ns(p,t,n,g);if(p==="orchestration_effort"&&w.source==="base"){d[p]=xt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(w.value===null){d[p]=xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let A=w.source==="base"?Tt(o.model_id)||w.value:Sa(w.value,null,s,a);d[p]=xt(w.value,w.source,Er(A),A,w.source==="base"?"default":"explicit");continue}if(w.value==="default"){d[p]=w.source==="base"?xt("default","base","default (\uC77C\uBC18)","default","default"):Tr("default",w.source);continue}d[p]=Tr(w.value,w.source)}if(s)if(i===null){let p=d.orchestration_model.full_value;d.quick_fix_impl_model=xt(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Er(p)})`,null,"default")}else if(u.runtime!==null){let p=Sa(i,u.runtime,s,a);d.quick_fix_impl_model=xt(i,"global",Er(p),p,"explicit")}else u.offered?d.quick_fix_impl_model=Ea(xt(i,"global","",null,"explicit")):d.quick_fix_impl_model=Tr(i,"global");return d}function o_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function lo(e){let t=Pt(e.pin)?e.pin:{},n=Pt(e.global)?e.global:{},r=Pt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=f=>{let g={...r,...f};return Jt({pin:e.layer==="pin"?g:t,global:e.layer==="pin"?n:g,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],u=s(o)[e.key],d=Tt(o[e.key]),p=[...e.choices];return d!==null&&!p.includes(d)&&p.unshift(d),{unset_label:o_(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:u?.resolution==="not_applicable",options:p.map(f=>{let g=s({...o,[e.key]:f})[e.key];return{value:f,label:g.display,full_value:g.full_value}})}}function Cr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let u=!1,d=f=>{u||(u=!0,typeof t.close=="function"&&t.close(),t.remove(),i(f))},p=()=>d(r.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>d(null)),r.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),p())}),t.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}var Ac="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function qt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Cn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],rs=[...Cn,"reasoning_output_tokens"],a_={codex:["implementation","review-consult"],claude:["subagent"]};function Ta(e){let t=0;for(let n of Cn)t+=qt(e?.[n]);return t}function i_(e){return!e||typeof e!="object"?!1:Cn.some(t=>Number.isFinite(e[t]))}function wc(e){return!e||typeof e!="object"?!1:rs.some(t=>Number.isFinite(e[t]))}function l_(e){let t={};for(let n of rs)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function kc(e){let t={};for(let n of rs)Number.isFinite(e[n])&&(t[n]=e[n]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function $c(e,t){return e==="codex"?qt(t.input_tokens)+qt(t.output_tokens):Ta(t)}function c_(e){return e==="claude"?"Claude":"Codex"}function u_(e){return`\u03C4 ${Sc(e)}`}function d_(e,t){let n=t.breakdown||{},r=[`\uC785\uB825 ${qt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${qt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?r.push(`\uCE90\uC2DC\uC77D\uAE30 ${qt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${qt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(r.push(`\uCE90\uC2DC\uC77D\uAE30 ${qt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${qt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&r.push(`\uCD94\uB860\uCD9C\uB825 ${qt(n.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,r.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Ac),o.join(`
`)}function Bt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${c_(n)} ${u_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:d_(n,r)})}return t}function uo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let u of rs)Number.isFinite(a.breakdown[u])&&(i.breakdown[u]=qt(i.breakdown[u])+qt(a.breakdown[u]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ca(e){return!e||typeof e!="object"?null:un({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function p_(e){return e==="codex"?"codex":"claude"}function $n(){return{subtotal:0,breakdown:l_(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function co(e,t,n){e.subtotal+=t.subtotal;for(let r of rs)Number.isFinite(t.usage[r])&&(e.breakdown[r]=qt(e.breakdown[r])+qt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function xc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Sc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Rr(e){return i_(e)?`\u03C4 ${Sc(Ta(e))}`:null}function Rn(e){let t=Rr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ss(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${qt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${qt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${qt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${qt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Ta(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Ac),n.join(`
`)}function un(e,t){let n={claude:$n(),codex:$n()},r={orchestrator:{claude:$n(),codex:$n()},implementation:{claude:$n(),codex:$n()},"review-consult":{claude:$n(),codex:$n()},subagent:{claude:$n(),codex:$n()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let u=i.usage;if(wc(u)){let p=p_(i.runner),f=kc(u),g={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:f,subtotal:$c(p,f)};f.replayed===!0&&(g.replayed=!0),typeof i.model=="string"&&(g.model=i.model),typeof i.session_id=="string"&&(g.session_id=i.session_id),co(n[p],g,!0),co(r.orchestrator[p],g,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of d){let f=p&&p.provider==="claude"?"claude":"codex";if(!p||p.provider!=="codex"&&p.provider!=="claude"||!a_[f].includes(p.role)||!wc(p.usage))continue;let g=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!g||s.has(g))continue;s.add(g);let w=kc(p.usage),A={provider:f,role:p.role,attempt_id:String(i.attempt_id||""),usage:w,subtotal:$c(f,w)};A.receipt_id=g,typeof p.agent_type=="string"&&(A.agent_type=p.agent_type),typeof p.agent_id=="string"&&(A.agent_id=p.agent_id),typeof p.model=="string"&&(A.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(A.effort=p.effort),typeof p.session_id=="string"?A.session_id=p.session_id:typeof p.thread_id=="string"&&(A.session_id=p.thread_id),typeof p.turn_id=="string"&&(A.turn_id=p.turn_id),(typeof p.completed_at=="string"||typeof p.completed_at=="number"&&Number.isFinite(p.completed_at))&&(A.completed_at=p.completed_at),w.replayed===!0&&(A.replayed=!0),co(n[f],A,!1),co(r[A.role][f],A,!1)}}let o={};for(let i of["claude","codex"]){let u=n[i];if(u.legs.length===0)continue;let d=xc(u,!1);i==="claude"&&u.outer_count>0&&u.outer_cost_count===u.outer_count&&(d.total_cost_usd=u.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let u={};for(let d of["claude","codex"]){let p=r[i][d];p.legs.length>0&&(u[d]={...xc(p,!0),legs:p.legs})}Object.keys(u).length>0&&(a[i]=u)}return{providers:o,roles:a}}var{entries:Mc,setPrototypeOf:Ec,isFrozen:f_,getPrototypeOf:__,getOwnPropertyDescriptor:m_}=Object,{freeze:Kt,seal:dn,create:Da}=Object,{apply:Na,construct:qa}=typeof Reflect<"u"&&Reflect;Kt||(Kt=function(t){return t});dn||(dn=function(t){return t});Na||(Na=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});qa||(qa=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var po=Yt(Array.prototype.forEach),g_=Yt(Array.prototype.lastIndexOf),Tc=Yt(Array.prototype.pop),os=Yt(Array.prototype.push),h_=Yt(Array.prototype.splice),_o=Yt(String.prototype.toLowerCase),Ra=Yt(String.prototype.toString),La=Yt(String.prototype.match),as=Yt(String.prototype.replace),b_=Yt(String.prototype.indexOf),y_=Yt(String.prototype.trim),gn=Yt(Object.prototype.hasOwnProperty),Vt=Yt(RegExp.prototype.test),is=v_(TypeError);function Yt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Na(e,t,r)}}function v_(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return qa(e,n)}}function nt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:_o;Ec&&Ec(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(f_(t)||(t[r]=o),s=o)}e[s]=!0}return e}function w_(e){for(let t=0;t<e.length;t++)gn(e,t)||(e[t]=null);return e}function Ln(e){let t=Da(null);for(let[n,r]of Mc(e))gn(e,n)&&(Array.isArray(r)?t[n]=w_(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Ln(r):t[n]=r);return t}function ls(e,t){for(;e!==null;){let r=m_(e,t);if(r){if(r.get)return Yt(r.get);if(typeof r.value=="function")return Yt(r.value)}e=__(e)}function n(){return null}return n}var Cc=Kt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Oa=Kt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ia=Kt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),k_=Kt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Pa=Kt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),$_=Kt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Rc=Kt(["#text"]),Lc=Kt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ma=Kt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Oc=Kt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),fo=Kt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),x_=dn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),A_=dn(/<%[\w\W]*|[\w\W]*%>/gm),S_=dn(/\$\{[\w\W]*/gm),E_=dn(/^data-[\-\w.\u00B7-\uFFFF]+$/),T_=dn(/^aria-[\-\w]+$/),Dc=dn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),C_=dn(/^(?:\w+script|data):/i),R_=dn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Nc=dn(/^html$/i),L_=dn(/^[a-z][.\w]*(-[.\w]+)+$/i),Ic=Object.freeze({__proto__:null,ARIA_ATTR:T_,ATTR_WHITESPACE:R_,CUSTOM_ELEMENT:L_,DATA_ATTR:E_,DOCTYPE_NAME:Nc,ERB_EXPR:A_,IS_ALLOWED_URI:Dc,IS_SCRIPT_OR_DATA:C_,MUSTACHE_EXPR:x_,TMPLIT_EXPR:S_}),cs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},O_=function(){return typeof window>"u"?null:window},I_=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Pc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function qc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:O_(),t=Fe=>qc(Fe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==cs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:u,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:w}=e,A=u.prototype,D=ls(A,"cloneNode"),W=ls(A,"remove"),V=ls(A,"nextSibling"),Y=ls(A,"childNodes"),N=ls(A,"parentNode");if(typeof a=="function"){let Fe=n.createElement("template");Fe.content&&Fe.content.ownerDocument&&(n=Fe.content.ownerDocument)}let M,q="",{implementation:U,createNodeIterator:E,createDocumentFragment:R,getElementsByTagName:Z}=n,{importNode:$e}=r,ue=Pc();t.isSupported=typeof Mc=="function"&&typeof N=="function"&&U&&U.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:me,ERB_EXPR:Q,TMPLIT_EXPR:Re,DATA_ATTR:we,ARIA_ATTR:oe,IS_SCRIPT_OR_DATA:ae,ATTR_WHITESPACE:xe,CUSTOM_ELEMENT:F}=Ic,{IS_ALLOWED_URI:se}=Ic,ie=null,Ae=nt({},[...Cc,...Oa,...Ia,...Pa,...Rc]),Se=null,Ie=nt({},[...Lc,...Ma,...Oc,...fo]),he=Object.seal(Da(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),it=null,_t=null,C=Object.seal(Da(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ge=!0,ke=!0,Le=!1,Me=!0,Be=!1,z=!0,K=!1,De=!1,Qe=!1,We=!1,ve=!1,P=!1,H=!0,J=!1,X="user-content-",Pe=!0,tt=!1,st={},Je=null,vt=nt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),mt=null,ot=nt({},["audio","video","img","source","image","track"]),ut=null,gt=nt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ve="http://www.w3.org/1998/Math/MathML",Ne="http://www.w3.org/2000/svg",He="http://www.w3.org/1999/xhtml",wt=He,lt=!1,G=null,pe=nt({},[Ve,Ne,He],Ra),qe=nt({},["mi","mo","mn","ms","mtext"]),S=nt({},["annotation-xml"]),I=nt({},["title","style","font","a","script"]),k=null,L=["application/xhtml+xml","text/html"],re="text/html",de=null,te=null,be=n.createElement("form"),ct=function(T){return T instanceof RegExp||T instanceof Function},Xe=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(te&&te===T)){if((!T||typeof T!="object")&&(T={}),T=Ln(T),k=L.indexOf(T.PARSER_MEDIA_TYPE)===-1?re:T.PARSER_MEDIA_TYPE,de=k==="application/xhtml+xml"?Ra:_o,ie=gn(T,"ALLOWED_TAGS")?nt({},T.ALLOWED_TAGS,de):Ae,Se=gn(T,"ALLOWED_ATTR")?nt({},T.ALLOWED_ATTR,de):Ie,G=gn(T,"ALLOWED_NAMESPACES")?nt({},T.ALLOWED_NAMESPACES,Ra):pe,ut=gn(T,"ADD_URI_SAFE_ATTR")?nt(Ln(gt),T.ADD_URI_SAFE_ATTR,de):gt,mt=gn(T,"ADD_DATA_URI_TAGS")?nt(Ln(ot),T.ADD_DATA_URI_TAGS,de):ot,Je=gn(T,"FORBID_CONTENTS")?nt({},T.FORBID_CONTENTS,de):vt,it=gn(T,"FORBID_TAGS")?nt({},T.FORBID_TAGS,de):Ln({}),_t=gn(T,"FORBID_ATTR")?nt({},T.FORBID_ATTR,de):Ln({}),st=gn(T,"USE_PROFILES")?T.USE_PROFILES:!1,ge=T.ALLOW_ARIA_ATTR!==!1,ke=T.ALLOW_DATA_ATTR!==!1,Le=T.ALLOW_UNKNOWN_PROTOCOLS||!1,Me=T.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Be=T.SAFE_FOR_TEMPLATES||!1,z=T.SAFE_FOR_XML!==!1,K=T.WHOLE_DOCUMENT||!1,We=T.RETURN_DOM||!1,ve=T.RETURN_DOM_FRAGMENT||!1,P=T.RETURN_TRUSTED_TYPE||!1,Qe=T.FORCE_BODY||!1,H=T.SANITIZE_DOM!==!1,J=T.SANITIZE_NAMED_PROPS||!1,Pe=T.KEEP_CONTENT!==!1,tt=T.IN_PLACE||!1,se=T.ALLOWED_URI_REGEXP||Dc,wt=T.NAMESPACE||He,qe=T.MATHML_TEXT_INTEGRATION_POINTS||qe,S=T.HTML_INTEGRATION_POINTS||S,he=T.CUSTOM_ELEMENT_HANDLING||{},T.CUSTOM_ELEMENT_HANDLING&&ct(T.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(he.tagNameCheck=T.CUSTOM_ELEMENT_HANDLING.tagNameCheck),T.CUSTOM_ELEMENT_HANDLING&&ct(T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(he.attributeNameCheck=T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),T.CUSTOM_ELEMENT_HANDLING&&typeof T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(he.allowCustomizedBuiltInElements=T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Be&&(ke=!1),ve&&(We=!0),st&&(ie=nt({},Rc),Se=[],st.html===!0&&(nt(ie,Cc),nt(Se,Lc)),st.svg===!0&&(nt(ie,Oa),nt(Se,Ma),nt(Se,fo)),st.svgFilters===!0&&(nt(ie,Ia),nt(Se,Ma),nt(Se,fo)),st.mathMl===!0&&(nt(ie,Pa),nt(Se,Oc),nt(Se,fo))),T.ADD_TAGS&&(typeof T.ADD_TAGS=="function"?C.tagCheck=T.ADD_TAGS:(ie===Ae&&(ie=Ln(ie)),nt(ie,T.ADD_TAGS,de))),T.ADD_ATTR&&(typeof T.ADD_ATTR=="function"?C.attributeCheck=T.ADD_ATTR:(Se===Ie&&(Se=Ln(Se)),nt(Se,T.ADD_ATTR,de))),T.ADD_URI_SAFE_ATTR&&nt(ut,T.ADD_URI_SAFE_ATTR,de),T.FORBID_CONTENTS&&(Je===vt&&(Je=Ln(Je)),nt(Je,T.FORBID_CONTENTS,de)),Pe&&(ie["#text"]=!0),K&&nt(ie,["html","head","body"]),ie.table&&(nt(ie,["tbody"]),delete it.tbody),T.TRUSTED_TYPES_POLICY){if(typeof T.TRUSTED_TYPES_POLICY.createHTML!="function")throw is('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof T.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw is('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=T.TRUSTED_TYPES_POLICY,q=M.createHTML("")}else M===void 0&&(M=I_(w,s)),M!==null&&typeof q=="string"&&(q=M.createHTML(""));Kt&&Kt(T),te=T}},Ye=nt({},[...Oa,...Ia,...k_]),bt=nt({},[...Pa,...$_]),St=function(T){let fe=N(T);(!fe||!fe.tagName)&&(fe={namespaceURI:wt,tagName:"template"});let Te=_o(T.tagName),at=_o(fe.tagName);return G[T.namespaceURI]?T.namespaceURI===Ne?fe.namespaceURI===He?Te==="svg":fe.namespaceURI===Ve?Te==="svg"&&(at==="annotation-xml"||qe[at]):!!Ye[Te]:T.namespaceURI===Ve?fe.namespaceURI===He?Te==="math":fe.namespaceURI===Ne?Te==="math"&&S[at]:!!bt[Te]:T.namespaceURI===He?fe.namespaceURI===Ne&&!S[at]||fe.namespaceURI===Ve&&!qe[at]?!1:!bt[Te]&&(I[Te]||!Ye[Te]):!!(k==="application/xhtml+xml"&&G[T.namespaceURI]):!1},yt=function(T){os(t.removed,{element:T});try{N(T).removeChild(T)}catch{W(T)}},Ct=function(T,fe){try{os(t.removed,{attribute:fe.getAttributeNode(T),from:fe})}catch{os(t.removed,{attribute:null,from:fe})}if(fe.removeAttribute(T),T==="is")if(We||ve)try{yt(fe)}catch{}else try{fe.setAttribute(T,"")}catch{}},zt=function(T){let fe=null,Te=null;if(Qe)T="<remove></remove>"+T;else{let b=La(T,/^[\r\n\t ]+/);Te=b&&b[0]}k==="application/xhtml+xml"&&wt===He&&(T='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+T+"</body></html>");let at=M?M.createHTML(T):T;if(wt===He)try{fe=new g().parseFromString(at,k)}catch{}if(!fe||!fe.documentElement){fe=U.createDocument(wt,"template",null);try{fe.documentElement.innerHTML=lt?q:at}catch{}}let Rt=fe.body||fe.documentElement;return T&&Te&&Rt.insertBefore(n.createTextNode(Te),Rt.childNodes[0]||null),wt===He?Z.call(fe,K?"html":"body")[0]:K?fe.documentElement:Rt},Nt=function(T){return E.call(T.ownerDocument||T,T,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Mt=function(T){return T instanceof f&&(typeof T.nodeName!="string"||typeof T.textContent!="string"||typeof T.removeChild!="function"||!(T.attributes instanceof p)||typeof T.removeAttribute!="function"||typeof T.setAttribute!="function"||typeof T.namespaceURI!="string"||typeof T.insertBefore!="function"||typeof T.hasChildNodes!="function")},Ft=function(T){return typeof i=="function"&&T instanceof i};function Lt(Fe,T,fe){po(Fe,Te=>{Te.call(t,T,fe,te)})}let Ue=function(T){let fe=null;if(Lt(ue.beforeSanitizeElements,T,null),Mt(T))return yt(T),!0;let Te=de(T.nodeName);if(Lt(ue.uponSanitizeElement,T,{tagName:Te,allowedTags:ie}),z&&T.hasChildNodes()&&!Ft(T.firstElementChild)&&Vt(/<[/\w!]/g,T.innerHTML)&&Vt(/<[/\w!]/g,T.textContent)||T.nodeType===cs.progressingInstruction||z&&T.nodeType===cs.comment&&Vt(/<[/\w]/g,T.data))return yt(T),!0;if(!(C.tagCheck instanceof Function&&C.tagCheck(Te))&&(!ie[Te]||it[Te])){if(!it[Te]&&Ht(Te)&&(he.tagNameCheck instanceof RegExp&&Vt(he.tagNameCheck,Te)||he.tagNameCheck instanceof Function&&he.tagNameCheck(Te)))return!1;if(Pe&&!Je[Te]){let at=N(T)||T.parentNode,Rt=Y(T)||T.childNodes;if(Rt&&at){let b=Rt.length;for(let h=b-1;h>=0;--h){let x=D(Rt[h],!0);x.__removalCount=(T.__removalCount||0)+1,at.insertBefore(x,V(T))}}}return yt(T),!0}return T instanceof u&&!St(T)||(Te==="noscript"||Te==="noembed"||Te==="noframes")&&Vt(/<\/no(script|embed|frames)/i,T.innerHTML)?(yt(T),!0):(Be&&T.nodeType===cs.text&&(fe=T.textContent,po([me,Q,Re],at=>{fe=as(fe,at," ")}),T.textContent!==fe&&(os(t.removed,{element:T.cloneNode()}),T.textContent=fe)),Lt(ue.afterSanitizeElements,T,null),!1)},Ut=function(T,fe,Te){if(H&&(fe==="id"||fe==="name")&&(Te in n||Te in be))return!1;if(!(ke&&!_t[fe]&&Vt(we,fe))){if(!(ge&&Vt(oe,fe))){if(!(C.attributeCheck instanceof Function&&C.attributeCheck(fe,T))){if(!Se[fe]||_t[fe]){if(!(Ht(T)&&(he.tagNameCheck instanceof RegExp&&Vt(he.tagNameCheck,T)||he.tagNameCheck instanceof Function&&he.tagNameCheck(T))&&(he.attributeNameCheck instanceof RegExp&&Vt(he.attributeNameCheck,fe)||he.attributeNameCheck instanceof Function&&he.attributeNameCheck(fe,T))||fe==="is"&&he.allowCustomizedBuiltInElements&&(he.tagNameCheck instanceof RegExp&&Vt(he.tagNameCheck,Te)||he.tagNameCheck instanceof Function&&he.tagNameCheck(Te))))return!1}else if(!ut[fe]){if(!Vt(se,as(Te,xe,""))){if(!((fe==="src"||fe==="xlink:href"||fe==="href")&&T!=="script"&&b_(Te,"data:")===0&&mt[T])){if(!(Le&&!Vt(ae,as(Te,xe,"")))){if(Te)return!1}}}}}}}return!0},Ht=function(T){return T!=="annotation-xml"&&La(T,F)},et=function(T){Lt(ue.beforeSanitizeAttributes,T,null);let{attributes:fe}=T;if(!fe||Mt(T))return;let Te={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Se,forceKeepAttr:void 0},at=fe.length;for(;at--;){let Rt=fe[at],{name:b,namespaceURI:h,value:x}=Rt,O=de(b),ee=x,y=b==="value"?ee:y_(ee);if(Te.attrName=O,Te.attrValue=y,Te.keepAttr=!0,Te.forceKeepAttr=void 0,Lt(ue.uponSanitizeAttribute,T,Te),y=Te.attrValue,J&&(O==="id"||O==="name")&&(Ct(b,T),y=X+y),z&&Vt(/((--!?|])>)|<\/(style|title|textarea)/i,y)){Ct(b,T);continue}if(O==="attributename"&&La(y,"href")){Ct(b,T);continue}if(Te.forceKeepAttr)continue;if(!Te.keepAttr){Ct(b,T);continue}if(!Me&&Vt(/\/>/i,y)){Ct(b,T);continue}Be&&po([me,Q,Re],le=>{y=as(y,le," ")});let $=de(T.nodeName);if(!Ut($,O,y)){Ct(b,T);continue}if(M&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!h)switch(w.getAttributeType($,O)){case"TrustedHTML":{y=M.createHTML(y);break}case"TrustedScriptURL":{y=M.createScriptURL(y);break}}if(y!==ee)try{h?T.setAttributeNS(h,b,y):T.setAttribute(b,y),Mt(T)?yt(T):Tc(t.removed)}catch{Ct(b,T)}}Lt(ue.afterSanitizeAttributes,T,null)},Wt=function Fe(T){let fe=null,Te=Nt(T);for(Lt(ue.beforeSanitizeShadowDOM,T,null);fe=Te.nextNode();)Lt(ue.uponSanitizeShadowNode,fe,null),Ue(fe),et(fe),fe.content instanceof o&&Fe(fe.content);Lt(ue.afterSanitizeShadowDOM,T,null)};return t.sanitize=function(Fe){let T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},fe=null,Te=null,at=null,Rt=null;if(lt=!Fe,lt&&(Fe="<!-->"),typeof Fe!="string"&&!Ft(Fe))if(typeof Fe.toString=="function"){if(Fe=Fe.toString(),typeof Fe!="string")throw is("dirty is not a string, aborting")}else throw is("toString is not a function");if(!t.isSupported)return Fe;if(De||Xe(T),t.removed=[],typeof Fe=="string"&&(tt=!1),tt){if(Fe.nodeName){let x=de(Fe.nodeName);if(!ie[x]||it[x])throw is("root node is forbidden and cannot be sanitized in-place")}}else if(Fe instanceof i)fe=zt("<!---->"),Te=fe.ownerDocument.importNode(Fe,!0),Te.nodeType===cs.element&&Te.nodeName==="BODY"||Te.nodeName==="HTML"?fe=Te:fe.appendChild(Te);else{if(!We&&!Be&&!K&&Fe.indexOf("<")===-1)return M&&P?M.createHTML(Fe):Fe;if(fe=zt(Fe),!fe)return We?null:P?q:""}fe&&Qe&&yt(fe.firstChild);let b=Nt(tt?Fe:fe);for(;at=b.nextNode();)Ue(at),et(at),at.content instanceof o&&Wt(at.content);if(tt)return Fe;if(We){if(ve)for(Rt=R.call(fe.ownerDocument);fe.firstChild;)Rt.appendChild(fe.firstChild);else Rt=fe;return(Se.shadowroot||Se.shadowrootmode)&&(Rt=$e.call(r,Rt,!0)),Rt}let h=K?fe.outerHTML:fe.innerHTML;return K&&ie["!doctype"]&&fe.ownerDocument&&fe.ownerDocument.doctype&&fe.ownerDocument.doctype.name&&Vt(Nc,fe.ownerDocument.doctype.name)&&(h="<!DOCTYPE "+fe.ownerDocument.doctype.name+`>
`+h),Be&&po([me,Q,Re],x=>{h=as(h,x," ")}),M&&P?M.createHTML(h):h},t.setConfig=function(){let Fe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Xe(Fe),De=!0},t.clearConfig=function(){te=null,De=!1},t.isValidAttribute=function(Fe,T,fe){te||Xe({});let Te=de(Fe),at=de(T);return Ut(Te,at,fe)},t.addHook=function(Fe,T){typeof T=="function"&&os(ue[Fe],T)},t.removeHook=function(Fe,T){if(T!==void 0){let fe=g_(ue[Fe],T);return fe===-1?void 0:h_(ue[Fe],fe,1)[0]}return Tc(ue[Fe])},t.removeHooks=function(Fe){ue[Fe]=[]},t.removeAllHooks=function(){ue=Pc()},t}var Fc=qc();var On={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},mo=e=>(...t)=>({_$litDirective$:e,values:t}),Lr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var us=class extends Lr{constructor(t){if(super(t),this.it=Ot,t.type!==On.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ot||t==null)return this._t=void 0,this.it=t;if(t===ln)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};us.directiveName="unsafeHTML",us.resultType=1;var jc=mo(us);function Ua(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var cr=Ua();function Vc(e){cr=e}var _s={exec:()=>null};function ft(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Zt.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var P_=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Zt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},M_=/^(?:[ \t]*(?:\n|$))+/,D_=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,N_=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ms=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,q_=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Wa=/(?:[*+-]|\d{1,9}[.)])/,Kc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Yc=ft(Kc).replace(/bull/g,Wa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),F_=ft(Kc).replace(/bull/g,Wa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),za=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,j_=/^[^\n]+/,Ha=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,B_=ft(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ha).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),U_=ft(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Wa).getRegex(),wo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ga=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,W_=ft("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ga).replace("tag",wo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Zc=ft(za).replace("hr",ms).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wo).getRegex(),z_=ft(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Zc).getRegex(),Va={blockquote:z_,code:D_,def:B_,fences:N_,heading:q_,hr:ms,html:W_,lheading:Yc,list:U_,newline:M_,paragraph:Zc,table:_s,text:j_},Bc=ft("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ms).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wo).getRegex(),H_={...Va,lheading:F_,table:Bc,paragraph:ft(za).replace("hr",ms).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Bc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wo).getRegex()},G_={...Va,html:ft(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ga).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:_s,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ft(za).replace("hr",ms).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Yc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},V_=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,K_=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Qc=/^( {2,}|\\)\n(?!\s*$)/,Y_=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ko=/[\p{P}\p{S}]/u,Ka=/[\s\p{P}\p{S}]/u,Xc=/[^\s\p{P}\p{S}]/u,Z_=ft(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ka).getRegex(),Jc=/(?!~)[\p{P}\p{S}]/u,Q_=/(?!~)[\s\p{P}\p{S}]/u,X_=/(?:[^\s\p{P}\p{S}]|~)/u,J_=ft(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",P_?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),eu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,em=ft(eu,"u").replace(/punct/g,ko).getRegex(),tm=ft(eu,"u").replace(/punct/g,Jc).getRegex(),tu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",nm=ft(tu,"gu").replace(/notPunctSpace/g,Xc).replace(/punctSpace/g,Ka).replace(/punct/g,ko).getRegex(),rm=ft(tu,"gu").replace(/notPunctSpace/g,X_).replace(/punctSpace/g,Q_).replace(/punct/g,Jc).getRegex(),sm=ft("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Xc).replace(/punctSpace/g,Ka).replace(/punct/g,ko).getRegex(),om=ft(/\\(punct)/,"gu").replace(/punct/g,ko).getRegex(),am=ft(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),im=ft(Ga).replace("(?:-->|$)","-->").getRegex(),lm=ft("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",im).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),bo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,cm=ft(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",bo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),nu=ft(/^!?\[(label)\]\[(ref)\]/).replace("label",bo).replace("ref",Ha).getRegex(),ru=ft(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ha).getRegex(),um=ft("reflink|nolink(?!\\()","g").replace("reflink",nu).replace("nolink",ru).getRegex(),Uc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ya={_backpedal:_s,anyPunctuation:om,autolink:am,blockSkip:J_,br:Qc,code:K_,del:_s,emStrongLDelim:em,emStrongRDelimAst:nm,emStrongRDelimUnd:sm,escape:V_,link:cm,nolink:ru,punctuation:Z_,reflink:nu,reflinkSearch:um,tag:lm,text:Y_,url:_s},dm={...Ya,link:ft(/^!?\[(label)\]\((.*?)\)/).replace("label",bo).getRegex(),reflink:ft(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",bo).getRegex()},Fa={...Ya,emStrongRDelimAst:rm,emStrongLDelim:tm,url:ft(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Uc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ft(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Uc).getRegex()},pm={...Fa,br:ft(Qc).replace("{2,}","*").getRegex(),text:ft(Fa.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},go={normal:Va,gfm:H_,pedantic:G_},ds={normal:Ya,gfm:Fa,breaks:pm,pedantic:dm},fm={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Wc=e=>fm[e];function In(e,t){if(t){if(Zt.escapeTest.test(e))return e.replace(Zt.escapeReplace,Wc)}else if(Zt.escapeTestNoEncode.test(e))return e.replace(Zt.escapeReplaceNoEncode,Wc);return e}function zc(e){try{e=encodeURI(e).replace(Zt.percentDecode,"%")}catch{return null}return e}function Hc(e,t){let n=e.replace(Zt.findPipe,(o,a,i)=>{let u=!1,d=a;for(;--d>=0&&i[d]==="\\";)u=!u;return u?"|":" |"}),r=n.split(Zt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(Zt.slashPipe,"|");return r}function ps(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function _m(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Gc(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let u={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,u}function mm(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var yo=class{constructor(e){kt(this,"options");kt(this,"rules");kt(this,"lexer");this.options=e||cr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ps(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=mm(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=ps(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ps(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=ps(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],u;for(u=0;u<n.length;u++)if(this.rules.other.blockquoteStart.test(n[u]))i.push(n[u]),a=!0;else if(!a)i.push(n[u]);else break;n=n.slice(u);let d=i.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${d}`:d,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,n.length===0)break;let g=o.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let w=g,A=w.raw+`
`+n.join(`
`),D=this.blockquote(A);o[o.length-1]=D,r=r.substring(0,r.length-w.raw.length)+D.raw,s=s.substring(0,s.length-w.text.length)+D.text;break}else if(g?.type==="list"){let w=g,A=w.raw+`
`+n.join(`
`),D=this.list(A);o[o.length-1]=D,r=r.substring(0,r.length-g.raw.length)+D.raw,s=s.substring(0,s.length-w.raw.length)+D.raw,n=A.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let u=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,D=>" ".repeat(3*D.length)),g=e.split(`
`,1)[0],w=!f.trim(),A=0;if(this.options.pedantic?(A=2,p=f.trimStart()):w?A=t[1].length+1:(A=t[2].search(this.rules.other.nonSpaceChar),A=A>4?1:A,p=f.slice(A),A+=t[1].length),w&&this.rules.other.blankLine.test(g)&&(d+=g+`
`,e=e.substring(g.length+1),u=!0),!u){let D=this.rules.other.nextBulletRegex(A),W=this.rules.other.hrRegex(A),V=this.rules.other.fencesBeginRegex(A),Y=this.rules.other.headingBeginRegex(A),N=this.rules.other.htmlBeginRegex(A);for(;e;){let M=e.split(`
`,1)[0],q;if(g=M,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),q=g):q=g.replace(this.rules.other.tabCharGlobal,"    "),V.test(g)||Y.test(g)||N.test(g)||D.test(g)||W.test(g))break;if(q.search(this.rules.other.nonSpaceChar)>=A||!g.trim())p+=`
`+q.slice(A);else{if(w||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(f)||Y.test(f)||W.test(f))break;p+=`
`+g}!w&&!g.trim()&&(w=!0),d+=M+`
`,e=e.substring(M.length+1),f=q.slice(A)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let u of s.items){if(this.lexer.state.top=!1,u.tokens=this.lexer.blockTokens(u.text,[]),u.task){if(u.text=u.text.replace(this.rules.other.listReplaceTask,""),u.tokens[0]?.type==="text"||u.tokens[0]?.type==="paragraph"){u.tokens[0].raw=u.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),u.tokens[0].text=u.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(u.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};u.checked=p.checked,s.loose?u.tokens[0]&&["paragraph","text"].includes(u.tokens[0].type)&&"tokens"in u.tokens[0]&&u.tokens[0].tokens?(u.tokens[0].raw=p.raw+u.tokens[0].raw,u.tokens[0].text=p.raw+u.tokens[0].text,u.tokens[0].tokens.unshift(p)):u.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):u.tokens.unshift(p)}}if(!s.loose){let d=u.tokens.filter(f=>f.type==="space"),p=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let u of s.items){u.loose=!0;for(let d of u.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Hc(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Hc(a,o.header.length).map((i,u)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[u]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=ps(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=_m(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Gc(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Gc(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,u=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(r=d.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){u+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+u);let p=[...r[0]][0].length,f=e.slice(0,s+r.index+p+a);if(Math.min(s,a)%2){let w=f.slice(1,-1);return{type:"em",raw:f,text:w,tokens:this.lexer.inlineTokens(w)}}let g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},hn=class ja{constructor(t){kt(this,"tokens");kt(this,"options");kt(this,"state");kt(this,"inlineQueue");kt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||cr,this.options.tokenizer=this.options.tokenizer||new yo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Zt,block:go.normal,inline:ds.normal};this.options.pedantic?(n.block=go.pedantic,n.inline=ds.pedantic):this.options.gfm&&(n.block=go.gfm,this.options.breaks?n.inline=ds.breaks:n.inline=ds.gfm),this.tokenizer.rules=n}static get rules(){return{block:go,inline:ds}}static lex(t,n){return new ja(n).lex(t)}static lexInline(t,n){return new ja(n).inlineTokens(t)}lex(t){t=t.replace(Zt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(Zt.tabCharGlobal,"    ").replace(Zt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),u;this.options.extensions.startBlock.forEach(d=>{u=d.call({lexer:this},i),typeof u=="number"&&u>=0&&(a=Math.min(a,u))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=n.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let u=Object.keys(this.tokens.links);if(u.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)u.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let u;if(this.options.extensions?.inline?.some(p=>(u=p.call({lexer:this},t,n))?(t=t.substring(u.raw.length),n.push(u),!0):!1))continue;if(u=this.tokenizer.escape(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.tag(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.link(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(u.raw.length);let p=n.at(-1);u.type==="text"&&p?.type==="text"?(p.raw+=u.raw,p.text+=u.text):n.push(u);continue}if(u=this.tokenizer.emStrong(t,r,i)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.codespan(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.br(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.del(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.autolink(t)){t=t.substring(u.raw.length),n.push(u);continue}if(!this.state.inLink&&(u=this.tokenizer.url(t))){t=t.substring(u.raw.length),n.push(u);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),g;this.options.extensions.startInline.forEach(w=>{g=w.call({lexer:this},f),typeof g=="number"&&g>=0&&(p=Math.min(p,g))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(u=this.tokenizer.inlineText(d)){t=t.substring(u.raw.length),u.raw.slice(-1)!=="_"&&(i=u.raw.slice(-1)),a=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=u.raw,p.text+=u.text):n.push(u);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},vo=class{constructor(e){kt(this,"options");kt(this,"parser");this.options=e||cr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(Zt.notSpaceStart)?.[0],s=e.replace(Zt.endingNewline,"")+`
`;return r?'<pre><code class="language-'+In(r)+'">'+(n?s:In(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:In(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${In(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=zc(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+In(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=zc(e);if(s===null)return In(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${In(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:In(e.text)}},Za=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},bn=class Ba{constructor(t){kt(this,"options");kt(this,"renderer");kt(this,"textRenderer");this.options=t||cr,this.options.renderer=this.options.renderer||new vo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Za}static parse(t,n){return new Ba(n).parse(t)}static parseInline(t,n){return new Ba(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},ho,fs=(ho=class{constructor(e){kt(this,"options");kt(this,"block");this.options=e||cr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?hn.lex:hn.lexInline}provideParser(){return this.block?bn.parse:bn.parseInline}},kt(ho,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),kt(ho,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ho),gm=class{constructor(...e){kt(this,"defaults",Ua());kt(this,"options",this.setOptions);kt(this,"parse",this.parseMarkdown(!0));kt(this,"parseInline",this.parseMarkdown(!1));kt(this,"Parser",bn);kt(this,"Renderer",vo);kt(this,"TextRenderer",Za);kt(this,"Lexer",hn);kt(this,"Tokenizer",yo);kt(this,"Hooks",fs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new vo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],u=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=u.apply(s,d)),p||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new yo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],u=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=u.apply(s,d)),p}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new fs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],u=s[a];fs.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&fs.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await i.call(s,d);return u.call(s,f)})();let p=i.call(s,d);return u.call(s,p)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await i.apply(s,d);return f===!1&&(f=await u.apply(s,d)),f})();let p=i.apply(s,d);return p===!1&&(p=u.apply(s,d)),p}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return hn.lex(e,t??this.defaults)}parser(e,t){return bn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?hn.lex:hn.lexInline)(a,s),u=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(u,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?bn.parse:bn.parseInline)(u,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?hn.lex:hn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?bn.parse:bn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+In(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},lr=new gm;function ht(e,t){return lr.parse(e,t)}ht.options=ht.setOptions=function(e){return lr.setOptions(e),ht.defaults=lr.defaults,Vc(ht.defaults),ht};ht.getDefaults=Ua;ht.defaults=cr;ht.use=function(...e){return lr.use(...e),ht.defaults=lr.defaults,Vc(ht.defaults),ht};ht.walkTokens=function(e,t){return lr.walkTokens(e,t)};ht.parseInline=lr.parseInline;ht.Parser=bn;ht.parser=bn.parse;ht.Renderer=vo;ht.TextRenderer=Za;ht.Lexer=hn;ht.lexer=hn.lex;ht.Tokenizer=yo;ht.Hooks=fs;ht.parse=ht;var Tv=ht.options,Cv=ht.setOptions,Rv=ht.use,Lv=ht.walkTokens,Ov=ht.parseInline;var Iv=bn.parse,Pv=hn.lex;function Un(e){let t=ht.parse(e),n=Fc.sanitize(t);return jc(n)}function Pn(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Or(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function $o(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var ou={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},hm={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},bm=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,ym=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function xn(e){return!!e&&typeof e=="object"}function Qa(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Xa(e,t){let n=Qa(e),r=Qa(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let u=s.get(i)||0;u>0?s.set(i,u-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function au(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>xn(s)&&typeof s.text=="string"?s.text:"").join(""):xn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function vm(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:ou[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Qa(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=Xa(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let u=Xa(xn(i)?i.old_string:"",xn(i)?i.new_string:"");s+=u.added,o+=u.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Ja(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ei(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=bm.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:ym.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function wm(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(xn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(ei(a.text));else if(a.type==="thinking"){let i=Ja(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=vm(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?su(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(xn(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=au(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?su([s],n):[s]}return[]}function su(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function km(e){let t=typeof e.command=="string"?e.command:"",n=au(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:ou.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function $m(e){if(e.type==="item.completed"&&xn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ei(t.text)];if(t.type==="reasoning"){let n=Ja(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[km(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function xm(e){if(e.schema!=="codex-delegation-monitor-v1"||!xn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&xn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[ei(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=Ja(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=hm[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Am(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Sm(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return xn(t)?t:null}function iu(e={}){let t=e.skip_delegated===!0,n=new Map;return{push(r){let s=Sm(r);return s?t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0?[]:s.schema==="codex-delegation-monitor-v1"?xm(s):Am(s)?$m(s):wm(s,n):[]}}}function ti(e){let t=[],n=iu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Em=5,Tm=10,Cm=/Task\s+#(\d+)/,Rm=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Lm=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function xo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Om(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Im(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Pm(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let u=Cm.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!u||d.length===0)continue;t.set(u[1],{label:d,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Mm(e){if(e.tool==="Bash"){let t=e.command||"";return Rm.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Lm.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Dm(e){let t=e.filter(s=>s.kind==="tool").slice(-Tm),n=new Map;t.forEach((s,o)=>{let a=Mm(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Nm(e){let t=Im(e);if(t)return{text:t,guess:!1};let n=Pm(e);if(n)return{text:n,guess:!1};let r=Dm(e);return r?{text:r,guess:!0}:null}function qm(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:rn(e,t)}function Ir(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,u=null,d=!1,p={},f=!0,g=new Set,w=new Set,A=null,D=null,W=!1,V=!1,Y=!1,N=null,M=null;function q(){W=!1,V=!1,Y=!1,N=null,M=null}async function U(z){if(n){V=!0,Y=!1,he();try{let K=await Promise.resolve(n("get-attempt-prompt",{attempt_id:z,...u?{root_dir:u}:{}}));if(o!==z)return;!K||typeof K!="object"||Array.isArray(K)?Y=!0:(N=K,M=z)}catch{o===z&&(Y=!0)}finally{o===z&&(V=!1,he())}}}function E(){if(W=!W,W&&o&&M!==o){U(o);return}he()}function R(){if(!W)return"";let z=Or({loading:V,error:Y});if(z)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${z}
      </div>`;if(!N)return"";if(N.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let K=$o(N.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${K?l`<div class="prompt-block__meta">${K} 발송</div>`:""}
      ${typeof N.task_prompt=="string"?Pn("\uACFC\uC5C5 (user)",N.task_prompt):""}
      ${typeof N.system_prompt=="string"?Pn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",N.system_prompt):""}
    </div>`}function Z(){if(!i||!r)return[];let z=r.get(i);return ti(z?z.lines:[])}function $e(){if(!i||!r)return null;let z=r.get(i),K=z?z.last_event_at:null;return typeof K=="number"?K:null}function ue(){return p.status==="running"}function me(){if(ue()&&o){D||(D=setInterval(()=>he(),1e3));return}Q()}function Q(){D&&(clearInterval(D),D=null)}function Re(z){let K=[],De=0;for(;De<z.length;){let{idx:Qe,line:We}=z[De];if(We.kind==="tool"){let ve=De;for(;ve<z.length&&z[ve].line.kind==="tool"&&z[ve].line.tool===We.tool;)ve+=1;if(ve-De>=Em&&!w.has(Qe)){K.push({kind:"group",idx:Qe,tool:We.tool||"",lines:z.slice(De,ve)}),De=ve;continue}}K.push({kind:"line",idx:Qe,line:We}),De+=1}return K}function we(z){let K=[],De=new Map;for(let ve=0;ve<z.length;ve+=1){let P=z[ve],H=P.parent_tool_use_id;if(typeof H=="string"&&H.length>0){let J=De.get(H);J||(J={kind:"subagent",idx:ve,launch_id:H,agent_type:null,header:null,lines:[]},De.set(H,J),K.push(J)),J.lines.push({idx:ve,line:P});continue}if(P.kind==="tool"&&P.tool==="Agent"&&typeof P.launch_id=="string"&&P.launch_id.length>0){let J=oe(P),X=De.get(P.launch_id);if(X){X.header={idx:ve,line:P},X.agent_type=J;continue}let Pe={kind:"subagent",idx:ve,launch_id:P.launch_id,agent_type:J,header:{idx:ve,line:P},lines:[]};De.set(P.launch_id,Pe),K.push(Pe);continue}K.push({kind:"entry",idx:ve,line:P})}let Qe=[],We=0;for(;We<K.length;){if(K[We].kind!=="entry"){Qe.push(K[We]),We+=1;continue}let ve=We;for(;ve<K.length&&K[ve].kind==="entry";)ve+=1;Qe.push(...Re(K.slice(We,ve))),We=ve}return Qe}function oe(z){let K=z.input;return K&&typeof K.subagent_type=="string"?K.subagent_type:null}function ae(z){for(let K=z.length-1;K>=0;K-=1){let De=z[K];if(De.kind==="result"||De.kind==="error")return null;if(De.kind==="tool"&&!Object.hasOwn(De,"result"))return De}return null}function xe(z){for(let K=z.length-1;K>=0;K-=1)if(z[K].kind==="thinking")return z[K];return null}function F(z,K){if(K.kind==="gate")return l`<div class="sv__gate">${K.text}</div>`;if(K.kind==="phase")return l`<div class="sv__phase">${K.text}</div>`;if(K.kind==="result")return l`<div
        class="sv__result${K.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${K.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Un(K.text||(K.success?"DONE":"\uC2E4\uD328"))}</span
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
      </div>`}if(K.kind==="error")return l`<div class="sv__error">⛔ ${K.text}</div>`;if(K.kind==="blocker")return l`<div class="sv__error">⛔ ${K.text}</div>`;if(K.kind==="tool"){let De=g.has(z),Qe=K.tool==="Bash"?Om(K.command):0,We=K.tool==="Bash"?Qe>1?xo(K.command):K.command:K.path||K.command||"";return l`<div
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
        ${De?l`<pre class="sv__tool-expand">${se(K)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Un(K.text||"")}</div>`}function se(z){let K=[];if(z.tool==="Bash"&&typeof z.command=="string"&&z.command.length>0)K.push(z.command);else if(z.input!==void 0)try{K.push(`input: ${JSON.stringify(z.input,null,2)}`)}catch{}return typeof z.output=="string"&&z.output.length>0&&K.push(`output:
${z.output}`),K.join(`

`)}function ie(){if(!o)return l``;let z=Z(),K=(a?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),De=p.session_id||"",Qe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${f?"ON":"OFF"}`,We=ue(),ve=We?qm($e(),Date.now()):"",P=We?ae(z):null,H=We?xe(z):null,J=Nm(z);return l`<div class="sv" data-attempt-id=${o}>
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
              @click=${()=>ge(De)}
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
        ${z.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:we(z).map(X=>X.kind==="subagent"?Se(X):X.kind==="group"?Ae(X):F(X.idx,X.line))}
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
      @click=${()=>Ie(z.idx)}
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
        @click=${()=>Ie(z.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${z.agent_type||"subagent"}</span>
        ${We?l`<span class="sv__sub-detail">${We}</span>`:""}
        <span class="sv__sub-count">${z.lines.length}줄</span>
        ${Qe?l`<span class="sv__sub-state">${Qe}</span>`:""}
        ${K?"":l`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${K?l`<div class="sv__sub-body">
            ${Re(z.lines).map(ve=>ve.kind==="group"?Ae(ve):F(ve.idx,ve.line))}
          </div>`:""}
    </div>`}function Ie(z){w.add(z),he()}function he(){Ze(ie(),e),me(),f&&it()}function it(){let z=e.querySelector(".sv__body");z&&(z.scrollTop=z.scrollHeight)}function _t(z){g.has(z)?g.delete(z):g.add(z),he()}function C(){f=!f,he()}function ge(z){sn(z).then(K=>{K?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ke(z){!o||!z||(p={...p,...z},he())}function Le(z){let K=z.target;if(!K||!K.classList||!K.classList.contains("sv__body"))return;!(K.scrollHeight-K.scrollTop-K.clientHeight<=4)&&f&&(f=!1,he())}e.addEventListener("scroll",Le,!0);function Me(z){let K=z&&z.attempt_id;if(!K)return;let De=i;o=K,a=typeof z.launch_id=="string"&&z.launch_id.length>0?z.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&De&&De!==i&&Promise.resolve(n("unsubscribe-session-log",{id:De})).catch(()=>{}),u=typeof z.root_dir=="string"&&z.root_dir.length>0?z.root_dir:null,p=z.meta||{},d=z.hide_prompt===!0,f=!0,g.clear(),w.clear(),q(),!A&&r&&(A=r.subscribe(he)),n&&Promise.resolve(n("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...u?{root_dir:u}:{}})).catch(()=>{}),he()}function Be(){let z=i;o=null,a=null,i=null,u=null,d=!1,g.clear(),w.clear(),q(),Q(),n&&z&&Promise.resolve(n("unsubscribe-session-log",{id:z})).catch(()=>{}),Ze(l``,e),s&&s()}return{open:Me,updateMeta:ke,close:Be,isOpen(){return o!==null},destroy(){Q(),A&&(A(),A=null),e.removeEventListener("scroll",Le,!0),o=null,a=null,i=null,u=null,d=!1,Ze(l``,e)}}}function Ao(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=ni(t.spec_id),s=ni(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function ni(e){return typeof e=="string"?e.trim():""}function lu(e){let t=Ao(e);if(t.path)return t;let n=ni(Fm(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Fm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function jm(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Bm(e){let t=e&&e.metadata||{},n=lu(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:jm(t)?null:"plan_pending"}),r}function cu(e,t){let n=Bm(e);return l`
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
  `}var Um="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Wm=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,zm=/^\*\*결론\*\* — (.+)$/;function So(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Um)return null;let n=Wm.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?zm.exec(t[a]):null,u=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:u,body:t.slice(d).join(`
`).trim()}}var uu=20;function du(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Hm(e){return e.length>uu?`${e.slice(0,uu)}\u2026`:e}function Gm(e,t,n,r){let s=`${t.lane} ${Hm(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${du(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?l`<div class="detail-report__body">
          ${Un(t.body)}
        </div>`:""}
  </div>`}function Vm(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${du(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Un(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function pu(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((u,d)=>String(d.created_at||"").localeCompare(String(u.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(u=>{let d=So(typeof u.text=="string"?u.text:"");return d?Gm(u,d,t,s.has(u.id)):Vm(u)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${u=>t.onDraftInput&&t.onDraftInput(u.target.value)}
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
  `}var{I:mw}=Ol;var fu=e=>e.strings===void 0;var Km={},_u=(e,t=Km)=>e._$AH=t;var ur=mo(class extends Lr{constructor(e){if(super(e),e.type!==On.PROPERTY&&e.type!==On.ATTRIBUTE&&e.type!==On.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!fu(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===ln||t===Ot)return t;let n=e.element,r=e.name;if(e.type===On.PROPERTY){if(t===n[r])return ln}else if(e.type===On.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return ln}else if(e.type===On.ATTRIBUTE&&n.getAttribute(r)===t+"")return ln;return _u(e),t}});var Eo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],si=[...Eo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Mn=["orchestration_model","orchestration_effort","orchestration_speed"],To=[...Eo,...Mn],Ym=si.filter(e=>To.includes(e)),mu=["delegated","main"],Co=["inherit","claude","codex"],gs=["default","fast"],hs=["standard","fast_track"],bs=["codex","opus","fable","self","skip"],Ro=["codex","fable","skip"],Lo=["low","medium","high","xhigh"],an="auto";function on(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function gu(e){if(!on(e)||!on(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))on(r)&&on(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Pr(e,t){let n=gu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[an,...r.flatMap(([,s])=>s)]}function hu(e,t,n,r){if(!on(e)||!on(e.runners))return[an];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!on(a)||!on(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,u]of Object.entries(a.models)){if(n&&n!==an&&i!==n)continue;let d=r(a,u);if(Array.isArray(d))for(let p of d)typeof p=="string"&&!s.includes(p)&&s.push(p)}return[an,...s]}function Mr(e,t,n){return hu(e,t,n,(r,s)=>on(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function oi(e,t,n){return hu(e,t,n,(r,s)=>on(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:on(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function ys(e,t){let n=gu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function bu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Pr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Mr(t,s,r.impl_model||an).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Zm={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},ri=[...Ym,...Mn],Qm=[...To,...si].filter((e,t,n)=>n.indexOf(e)===t&&!ri.includes(e));function yu(e,t){let n=on(e)?e:{},r=on(t)?t:{},s=[];for(let a of ri){let i=n[a]??null,u=r[a]??null;i!==u&&s.push({key:a,label:Zm[a]||a,before:i,after:u,kind:i===null?"added":u===null?"removed":"changed"})}let o=[];for(let a of[...Qm,...Object.keys(r)])!ri.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function ai(e,t,n,r,s,o){return lo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function vu(e,t){let n={};for(let r of si){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function wu(e,t){let n={};for(let r of Mn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var ii=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Mn]}],Wn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Oo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function li(e,t,n,r,s,o=null){let a=Jt({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function ku(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of li(e,t,n,r,s,o))a[i.source]+=1;return a}function $u(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function xu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Sw=[...Eo,...Mn];var Xm=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],Jm={pin:"pin",global:"global",base:"base"};function eg(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${Jm[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function tg(e,t,n){switch(e){case"workflow_mode":return hs;case"spec_review_model":case"impl_review_model":return bs;case"plan_review_model":return Ro;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Lo;case"impl_dispatch":return mu;case"impl_runtime":return Co;case"impl_model":return Pr(n,t.impl_runtime);case"impl_effort":return Mr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return gs;case"orchestration_model":return ys(n,null);case"orchestration_effort":return Mr(n,void 0,t.orchestration_model||an).filter(r=>r!==an);default:return[]}}function ng(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${eg(e.source)}
    <span class="detail-effective__k"
      >${Wn[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Oo[e.source]}</span
    >
    ${t.expanded?l`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Wn[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function Au(e,t){let n=ii.flatMap(u=>u.keys),r=li(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=ku(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(u=>[u.key,u])),a=Object.fromEntries(r.filter(u=>u.value!==null).map(u=>[u.key,u.value])),i=r.filter(u=>u.full_value&&u.display!==u.full_value).map(u=>u.full_value).join(" \xB7 ");return l`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${u=>t.onToggle(u.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${u=>{u.preventDefault();let d=u.currentTarget.parentElement;t.onToggle(!d.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${rg(o)}</span
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
          ${ii.map(u=>l`
              <div class="detail-effective__subhead">${u.label}</div>
              ${r.filter(d=>u.keys.includes(d.key)).map(d=>{let p=lo({key:d.key,choices:tg(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return ng(d,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${ur(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${u=>t.onPresetSelect(String(u.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(u=>l`<option
                    value=${u.id}
                    ?selected=${u.id===e.preset_id}
                  >
                    ${u.name}${u.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
  </details>`}function rg(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function sg(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Su(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=sg(n.exec_receipt),u=i?En(i):a,d=i?`${i.kind}:${i.actor}`:a.split("@")[0],p=ao(n.planned_execution,n.exec_receipt);return l`<section class="detail-summary" data-seam="detail-summary">
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
      ${u?l`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${u}
            >${d}${i?.effort?l`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${i.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${Xm.map(f=>{let g=f.receipt&&typeof t[f.receipt]=="string"?String(t[f.receipt]):"",w=r[f.id],A=g.length>0||w?.fill==="full",D=!A&&w?.fill==="dim",W=w?.stale===!0;return l`<span
          class=${`detail-summary__gate${A?" detail-summary__gate--on":""}${D?" detail-summary__gate--current":""}${W?" detail-summary__gate--stale":""}`}
          data-gate=${f.id}
        >
          <span class="detail-summary__gate-pill">${f.label}</span>
          ${g?l`<span class="detail-summary__gate-sha"
                >${g.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function Ru(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Eu(e){return Ru(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Tu(e,t){let n=e&&e[t];if(!Ru(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Eu),s=Eu(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function Lu(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function og(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Lu(e)}${t}`}function Ou(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Lu(e)}`}function ag(e,t){return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Ou({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Cu(e){let t=e.provider_key==="claude"?og:Ou,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return l`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${ag(e.provider_key,e.provider)}
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
  </div>`}function Iu({md:e,catalog:t,handlers:n}){let r=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return l`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Cu({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Tu(t,"claude"),selected:r,handlers:n,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Cu({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Tu(t,"codex"),selected:s,handlers:n})}
    </div>
  </section>`}var Pu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function vs(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Io(e){if(!vs(e)||!vs(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>vs(n)&&vs(n.models));return t.length>0?t:null}function yn(e,t){let n=Io(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Mu(e,t){return vs(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Du(e,t){let n=Io(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Mu(r,r.models[t]);return[]}function ig(e){let t=Io(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Mu(r,s))n.includes(o)||n.push(o);return n}function lg(e,t){if(!t)return ig(e);let r=Io(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of Du(e,o))s.includes(a)||s.push(a);return s}function Nu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=yn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?Du(t,r.impl_model):lg(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function cg(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function ug(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function qu(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,u="";function d(D){D.key==="Escape"&&s&&(D.preventDefault(),w())}document.addEventListener("keydown",d);function p(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>w()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${cg(s)}</span
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
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="pending"?l`<div class="mv__status">${u}</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                      ${u||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:l`${i===null?null:l`<pre class="mv__front">
${i}</pre
                        >`}${Un(a)}`}
          </div>
        </div>
      </div>
    `:l``}function f(){Ze(p(),e)}async function g(D,W={}){s=D,o="loading",a="",i=null,u="",f();let V=n?n():"";if(!V){o="error",u="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){o="error",u="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let Y="/api/doc?workspace="+encodeURIComponent(V)+"&path="+encodeURIComponent(D);try{let N=await r(Y),M=await N.json().catch(()=>({}));if(!N.ok||!M||M.ok!==!0){if(M?.error==="not_found"&&W.missing_state==="plan_pending"){o="pending",u="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",u="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(M&&M.error||N.status)+")",f();return}let q=ug(String(M.content||""));i=q.front,a=q.body,o="ready",f()}catch{o="error",u="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function w(){s=null,Ze(l``,e)}function A(){document.removeEventListener("keydown",d),w()}return{open:g,close:w,destroy:A}}var dg=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Bu="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Po=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],pg=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Fu(e){return typeof e=="string"&&pg.has(e)}var fg=["running","done","failed","interrupted"],_g={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function mg(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function gg(e){let t=Bt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Rr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${Bu}
          >부분 집계</span
        >`:""}`}function ju(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function di(e){if(typeof e=="number")return Mo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Mo(t):""}function hg(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function bg(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function ci(e){return e===null||typeof e=="string"&&e.trim().length>0}function ui(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function yg(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Po.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?ci(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||ci(t.effort))||!(!("agent_type"in t)||ci(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!fg.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!ui(t.started_at)||!ui(t.last_event_at)||!ui(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function vg(e,t,n){let s=Bt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
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
    ${di(n.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
          >${di(n.completed_at)}</span
        >`:""}
    ${s?l`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function wg(e,t,n,r){let s=e.status==="running"?null:t,a=(s?Bt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Mo(e.last_event_at):s?di(s.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,hg(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=bg(e,s);return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${_g[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${u}</span
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
  </button>`}function kg(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function $g(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let f=yg(p);!f||s.has(f.launch_id)||Fu(f.agent_type)||(s.add(f.launch_id),r.push(f))}r.sort((p,f)=>(p.started_at||0)-(f.started_at||0));let a={};for(let{role:p,provider:f}of Po){let g=t?t.roles[p]?.[f]:null;a[p]=g?[...g.legs]:[]}let i=Po.flatMap(({role:p})=>a[p]),u=new Set,d=[];for(let{role:p,provider:f}of Po){for(let g of r.filter(w=>w.role===p&&w.provider===f)){let w=i.find(A=>A.receipt_id===g.launch_id)||null;w&&!kg(g,w)||(w&&u.add(w.receipt_id),d.push(wg(g,w,e.attempt_id,n)))}for(let g of a[p])!u.has(g.receipt_id)&&!Fu(g.agent_type)&&d.push(vg(p,f,g))}return d}function xg(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...dg,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${r.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${mg(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${Bu}</span>`:""}
  </div>`}var Ag={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Mo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Sg(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Uu(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return l`
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
    </div>`},u=d=>{let p=ju(Ca(d));if(Bt(p).length===0&&!Rr(d.usage))return"";let f=s.has(d.attempt_id);return l`<button
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
      세션 이력${gg(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(d=>{let p=Ca(d),f=ju(p),g=Bt(f);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Ag[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${ts(d)?l`<span
                  class="detail-session__resumed"
                  title=${ts(d)}
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
                    >`):Rr(d.usage)?l`<span class="detail-session__usage"
                    >${Rr(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Mo(d.started_at)}</span>
          </button>
          ${u(d)} ${a(d)} ${i(d)} ${Sg(d)}
          ${s.has(d.attempt_id)&&d.usage?xg(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${$g(d,p,t)}
        </div>`})}
    </div>
  `}function Wu(e,t={}){return l`
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
          ${Eg(e)}
        </div>`:""}
  `}function Eg(e){let t=Or(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Pn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=$o(n.recorded_at);return l`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Pn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Pn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Tg=["open","in_progress","deferred","resolved","closed"],Cg=[0,1,2,3,4];function zu(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,u=t.sessionLogStore,d=null,p=null,f={},g="",w=!1,A=[],D=!1,W={},V={claude:null,codex:null},Y=null,N=0,M=!1,q=!1,U="",E="",R="";function Z(){M=!1,q=!1,U="",E="",R=""}function $e(){V={claude:null,codex:null},Y=null,N+=1}async function ue(c){try{let _=await fetch(c);if(!_.ok)return null;let v=await _.json();if(!v||typeof v!="object"||!Array.isArray(v.accounts))return null;let B=v.accounts.filter(_e=>_e!==null&&typeof _e=="object"&&!Array.isArray(_e));return{accounts:B,active:B.find(_e=>_e.active===!0)||null}}catch{return null}}async function me(c){Y=c;let _=++N,[v,B]=await Promise.all([ue("/api/claude-usage"),ue("/api/codex-usage")]);_!==N||c!==d||(V={claude:v,codex:B},Oe())}let Q=[],Re=null,we=null,oe=!1,ae="",xe=!1,F=0,se=new Set;function ie(){Q=[],Re=null,we=null,oe=!1,ae="",xe=!1,F+=1,se.clear()}async function Ae(c){if(!s)return;let _=++F;try{let v=await Promise.resolve(s("get-comments",{id:c}));if(_!==F||c!==d)return;Q=Array.isArray(v)?v:[],oe=!1}catch{if(_!==F||c!==d)return;oe=!0}Oe()}function Se(){if(!s||!d)return;let c=p&&typeof p.comment_count=="number"?p.comment_count:null;if(Re!==d){Re=d,we=c,Ae(d);return}c!==null&&c!==we&&(we=c,Ae(d))}function Ie(c){se.has(c)?se.delete(c):se.add(c),Oe()}function he(c){let _=ae.trim().length===0;ae=c,_!==(c.trim().length===0)&&Oe()}async function it(){let c=ae.trim();if(!s||!d||c.length===0||xe)return;let _=d;xe=!0,Oe();let v=!1;try{let B=await Promise.resolve(s("add-comment",{id:_,text:c}));Array.isArray(B)&&B.length>0&&(v=!0,_===d&&(Q=B,oe=!1,ae="",we=B.length))}catch{v=!1}v||ce("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),_===d&&(xe=!1),Oe()}let _t={onToggle:Ie,onDraftInput:he,onSubmit:it},C=document.createElement("div");C.className="md-viewer-root",document.body.appendChild(C);let ge=qu(C,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),ke=document.createElement("div");ke.className="session-log-root",document.body.appendChild(ke);let Le=Ir(ke,{transport:s?(c,_)=>Promise.resolve(s(c,_)):void 0,sessionLogStore:u}),Me=!1,Be=!1,z=!1,K=null,De=null,Qe=0;function We(c){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${c}`}function ve(){Me=!1,Be=!1,z=!1,K=null,De=null,Qe+=1}async function P(c){if(!s)return;let _=++Qe;Be=!0,z=!1,Oe();try{let v=await Promise.resolve(s("get-bead-prompt",{bead_id:c}));if(_!==Qe)return;!v||typeof v!="object"||Array.isArray(v)?z=!0:(K=v,De=We(c))}catch{_===Qe&&(z=!0)}finally{_===Qe&&(Be=!1,Oe())}}function H(){if(Me=!Me,Me&&d&&De!==We(d)){K=null,P(d);return}Oe()}function J(){if(!a||!d)return[];let c=a.get();return(c&&c.attempts?Object.values(c.attempts):[]).filter(v=>v&&v.bead_id===d).sort((v,B)=>(B.started_at||0)-(v.started_at||0)).map(v=>({attempt_id:v.attempt_id,bead_id:v.bead_id,status:v.status,started_at:typeof v.started_at=="number"?v.started_at:null,runner:v.runner||null,model:v.model||null,effort:v.effort||v.observed_effort||null,speed:v.speed||null,session_id:v.session_id||null,resumed_from:v.resumed_from||null,continuation_mode:v.continuation_mode||null,dismissed_at:typeof v.dismissed_at=="number"?v.dismissed_at:null,cause:typeof v.cause=="string"?v.cause:null,cause_detail:v.cause_detail||null,exec_default_preset_id:typeof v.exec_default_preset_id=="string"?v.exec_default_preset_id:null,exec_default_preset_revision:typeof v.exec_default_preset_revision=="number"?v.exec_default_preset_revision:null,exec_values:v.exec_values&&typeof v.exec_values=="object"?v.exec_values:null,usage:v.usage||null,usage_legs:Array.isArray(v.usage_legs)?v.usage_legs:[],delegation_sessions:Array.isArray(v.delegation_sessions)?v.delegation_sessions:[]}))}function X(){if(!a||!d)return null;let c=a.get();return un(c&&c.attempts||{},d)}let Pe=new Set;function tt(c){Pe.has(c)?Pe.delete(c):Pe.add(c),Oe()}function st(c){let _=a?a.get():null,v=_&&_.attempts?_.attempts[c]:null;Le.open({attempt_id:c,meta:v?{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.status||void 0,session_id:v.session_id||void 0}:{}})}function Je(c,_){let v=a?a.get():null,B=v&&v.attempts?v.attempts[c]:null,Ce=(B&&Array.isArray(B.delegation_sessions)?B.delegation_sessions:[]).find(Ee=>Ee&&typeof Ee=="object"&&Ee.launch_id===_);Ce&&Le.open({attempt_id:c,launch_id:_,meta:{runner:Ce.provider==="claude"?"claude":"codex",role:Ce.role,...typeof Ce.agent_type=="string"?{agent_type:Ce.agent_type}:{},model:Ce.model,effort:Ce.effort,session_id:Ce.session_id,status:Ce.status}})}async function vt(c){if(!s||!c)return;let _=await Cr();if(_===null)return;let v=()=>{let Ee=a?a.get():null;return Ee&&typeof Ee.revision=="number"?Ee.revision:0},B=async(Ee={},ze=v())=>await s("worker-attempt-resume",{attempt_id:c,expected_revision:ze,..._!==""?{instructions:_}:{},...Ee}),_e=Ee=>{Ee?.queue&&a?.set&&a.set(Ee.queue)},Ce=await B();if(_e(Ce),Ce&&Ce.conflict){let Ee=Ce.queue&&typeof Ce.queue.revision=="number"?Ce.queue.revision:v();Ce=await B({},Ee),_e(Ce)}Ce=await Tn(Ce,(Ee,ze)=>B({continuation:Ee,decision_token:ze}),{onResult:_e,refresh:()=>B()}),Ce&&Ce.resumed===!1&&!Ce.conflict&&Ce.reason&&ce(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ce.reason}`,"error",2400)}let mt={onOpen:st,onOpenDelegation:Je,onResume:vt,onToggleUsage:tt};function ot(){let c=a?a.get():null,_={...W};for(let v of["orchestration_model","orchestration_effort","orchestration_speed"]){let B=c&&c[v];typeof B=="string"&&(_[v]=B)}return _}async function ut(){if(s){try{let c=await Promise.resolve(s("get-session-defaults",{}));W=c&&c.values&&typeof c.values=="object"?c.values:{}}catch{W={}}Oe()}}function gt(){let c=a?a.get():null;return c&&c.runner_catalog||null}function Ve(){let c=a?a.get():null;return c&&typeof c.execution_defaults=="object"?c.execution_defaults:null}function Ne(){let c=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},v=Jt({pin:{...c,...f},global:ot(),execution_defaults:Ve(),runner_catalog:gt(),route:typeof c.route=="string"?c.route:null}).orchestration_model.value||"";return yn(gt(),v)}function He(){let c=i?i.get():null;return!c||typeof c.revision!="number"?null:{revision:c.revision,presets:Array.isArray(c.presets)?c.presets:[]}}function wt(c){return c?.compatible===!1}function lt(c){i&&c&&typeof c.revision=="number"&&Array.isArray(c.presets)&&i.set({revision:c.revision,presets:c.presets})}async function G(){let c=He(),_=c?.presets.find(v=>v.id===g);if(!(!s||!d||!c||!_||wt(_)||w)){w=!0,A=[],Oe();try{let v=await Promise.resolve(s("apply-impl-preset",xu(d,_.id,c.revision)));if(v&&v.conflict){lt(v),ce("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let B=v&&Array.isArray(v.issue)?v.issue[0]:v?.issue;if(v&&v.applied&&B&&typeof B=="object"){p=B,A=Array.isArray(v.skipped_orchestration_keys)?v.skipped_orchestration_keys.filter(_e=>typeof _e=="string"):[];for(let _e of Pu)delete f[_e];ce(A.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}v&&v.error==="bd_readback_failed"?ce("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ce("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(v){v&&typeof v=="object"&&v.code==="bd_readback_failed"?ce("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ce("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{w=!1,Oe()}}}let pe=null;n&&n.subscribe&&(pe=n.subscribe(()=>k()));let qe=null;a&&typeof a.subscribe=="function"&&(qe=a.subscribe(()=>{d&&Oe()}));let S=null;i&&typeof i.subscribe=="function"&&(S=i.subscribe(()=>{d&&Oe()}));function I(c){c.key==="Escape"&&d&&(c.preventDefault(),r())}document.addEventListener("keydown",I);function k(){if(d){if(n&&typeof n.snapshotFor=="function"){let c=n.snapshotFor("detail:"+d)||[];p=c.find(v=>v&&v.id===d)||c[0]||p}Se(),Oe()}}function L(c){sn(c).then(_=>{_?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function re(c){c.preventDefault(),c.stopPropagation(),d&&L(d)}function de(c,_){c.preventDefault(),c.stopPropagation(),L(_)}function te(c,_,v){c.preventDefault(),c.stopPropagation(),ge.open(_,{missing_state:v})}function be(c,_){f[c]=_,Oe(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",$u(d,c,_.length===0?null:_))).catch(()=>{ce("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function ct(c,_){let v=p||{},B=v.metadata&&typeof v.metadata=="object"?v.metadata:{},_e={};for(let ze of["impl_runtime","impl_model","impl_effort"])_e[ze]=Object.hasOwn(f,ze)?f[ze]:typeof B[ze]=="string"?B[ze]:"";_e[c]=_;let Ce=Nu(_e,gt(),Ne()),Ee={};for(let ze of["impl_runtime","impl_model","impl_effort"])Ee[ze]=f[ze],f[ze]=Ce[ze]||"";Oe(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...Ce,orchestration_runtime:Ne()})).then(ze=>{let dt=Array.isArray(ze)?ze[0]:ze;if(!dt||typeof dt!="object"||!dt.id)throw new Error("implementation target readback failed");p=dt;for(let jt of["impl_runtime","impl_model","impl_effort"])delete f[jt];Oe()}).catch(()=>{for(let ze of["impl_runtime","impl_model","impl_effort"])Ee[ze]===void 0?delete f[ze]:f[ze]=Ee[ze];Oe(),ce("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Xe(c,_,v){if(!s||!d)return!1;try{let B=await Promise.resolve(s(c,_)),_e=Array.isArray(B)?B[0]:B;return _e&&typeof _e=="object"&&_e.id?(p=_e,!0):(ce(v,"error"),!1)}catch{return ce(v,"error"),!1}}function Ye(c){setTimeout(()=>{try{let _=e.querySelector(c);_&&typeof _.focus=="function"&&_.focus()}catch{}},0)}function bt(){M=!0,U=p&&p.title||"",Oe(),Ye('.detail-edit__input[data-edit="title"]')}function St(c){U=c.target.value}function yt(){M=!1,U="",Oe()}function Ct(){Xe("edit-text",{id:d,field:"title",value:U},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(_=>{_&&(M=!1,U=""),Oe()})}function zt(){q=!0,E=p&&p.description||"",Oe(),Ye('.detail-edit__textarea[data-edit="description"]')}function Nt(c){E=c.target.value}function Mt(){q=!1,E="",Oe()}function Ft(){Xe("edit-text",{id:d,field:"description",value:E},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(_=>{_&&(q=!1,E=""),Oe()})}function Lt(c,_,v,B){if(c.key==="Escape"){c.stopPropagation(),v();return}c.key==="Enter"&&(!B||c.ctrlKey||c.metaKey)&&(c.preventDefault(),_())}function Ue(c){let _=c.target.value;Xe("update-status",{id:d,status:_},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Oe())}function Ut(c){let _=Number(c.target.value);Xe("update-priority",{id:d,priority:_},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Oe())}function Ht(c){R=c.target.value}function et(){let c=R.trim();c.length!==0&&Xe("label-add",{id:d,label:c},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(_=>{_&&(R=""),Oe()})}function Wt(c){if(c.key==="Escape"){c.stopPropagation(),R="",Oe();return}c.key==="Enter"&&(c.preventDefault(),et())}function Fe(c){Xe("label-remove",{id:d,label:c},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Oe())}let T={onCopyPath:de,onOpenDoc:te};function fe(c){return typeof c=="string"?c:c&&typeof c=="object"?String(c.id||c.to||c.issue_id||c.depends_on||""):""}function Te(c){switch(c&&typeof c=="object"?String(c.dependency_type||c.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function at(c){let v=(Array.isArray(c.dependencies)?c.dependencies:[]).map(B=>({id:fe(B),icon:Te(B)})).filter(B=>B.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${v.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${v.map(B=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(B.id)}
                  >
                    ${B.icon?`${B.icon} `:""}${B.id}
                  </button>`:l`<span class="detail-dep"
                    >${B.icon?`${B.icon} `:""}${B.id}</span
                  >`)}
          </div>`}
    `}function Rt(c){let _=c.metadata||{},v=c.workflow||{},B=v.stages||{},_e=B.spec&&B.spec.stale,Ce=B.impl&&B.impl.stale,Ee=B.plan||null,ze=v.route_source==="derived",dt=v.route||_.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ze?" detail-kv__v--derived":""}"
          title=${ze?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ze?"unset":dt}</span
        >
      </div>
      ${v.route!=="quick_fix"||Object.hasOwn(_,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${_.spec_review||"\uC5C6\uC74C"}${_e?" \xB7 stale":""}</span
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
      ${v.route!=="quick_fix"||Object.hasOwn(_,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${_.impl_review||"\uC5C6\uC74C"}${Ce?" \xB7 stale":""}</span
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
              >${En(v.exec_receipt)}</span
            >
          </div>`:""}
      ${v.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${v.impl_entry.actor}@${v.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${_.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${_.pr_url}</span>
          </div>`:""}
    `}let b={route:["quick_fix","spec_backed","full_plan"]};async function h(c,_){let v=_.target.value;if(c==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&v!=="full_plan"&&!window.confirm(`full_plan \u2192 ${v||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Oe();return}await Xe("update-workflow-meta",{id:d,key:c,value:v},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Oe()}function x(c){let _=c.metadata||{};return l` ${((B,_e)=>{let Ce=b[B],Ee=typeof _[B]=="string"?_[B]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${B}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${B}
          data-edit=${`wfmeta-${B}`}
          @change=${ze=>h(B,ze)}
        >
          <option value="" ?selected=${!Ce.includes(Ee)}>
            ${_e}
          </option>
          ${Ce.map(ze=>l`<option value=${ze} ?selected=${Ee===ze}>${ze}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function O(c,_){return M?l`
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
        <h2 class="detail-overlay__title">${c}</h2>
        ${Bt(_).map(v=>l`<span class="detail-usage-total" title=${v.tooltip}
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
    `}function ee(c){let _=Gt(c.created_at),v=Gt(c.updated_at);return!_&&!v?l``:l`
      ${_?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${_}</span>
          </div>`:""}
      ${v?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${v}</span>
          </div>`:""}
    `}function y(c,_){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ue}
        >
          ${Tg.map(v=>l`<option value=${v} ?selected=${v===c}>${v}</option>`)}
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
          ${Cg.map(v=>l`<option value=${String(v)} ?selected=${v===_}>
                P${v}
              </option>`)}
        </select>
      </div>
    `}function $(c){return l`
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
              @keydown=${_=>Lt(_,Ft,Mt,!0)}
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
            ${c||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function le(c){let _=typeof c.notes=="string"?c.notes:"";return _.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${_}</div>
    `}function ye(c){let _=Array.isArray(c.labels)?c.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${_.map(v=>l`<span class="detail-label-chip"
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
    `}function Ke(){if(!d)return l``;let c=p||{},_=String(c.id||d),v=c.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",B=X(),_e=c.status||"open",Ce=typeof c.priority=="number"?Math.max(0,Math.min(4,c.priority)):"",Ee=c.description||"",ze={...c,metadata:{...c.metadata||{},...f}};return l`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${re}
            >
              ${_}
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
          ${O(v,B)}
          ${Su(ze)}
          ${Au({metadata:ze.metadata,workspace_values:ot(),catalog:gt(),execution_defaults:Ve(),expanded:D,presets:He()?.presets||[],preset_id:g,preset_busy:w,skipped_orchestration_keys:A},{onToggle:dt=>{D=dt,Oe()},onEdit:(dt,jt)=>{if(dt==="impl_runtime"||dt==="impl_model"||dt==="impl_effort"){ct(dt,jt??"");return}be(dt,jt??"")},onPresetSelect:dt=>{g=dt,A=[],Oe()},onPresetApply:()=>{G()}})}
          ${Iu({md:ze.metadata,catalog:V,handlers:{onExecChange:be}})}
          ${y(_e,Ce)} ${ee(c)}
          ${$(Ee)}
          ${pu(Q,_t,{expanded:se,draft:ae,sending:xe,error:oe})}
          ${le(c)} ${ye(c)} ${at(c)}
          ${Rt(c)} ${x(c)}
          ${cu(c,T)}
          ${Wu({expanded:Me,loading:Be,error:z,data:K},{onToggle:H})}
          ${Uu(J(),mt,{total:B,expanded:Pe})}
        </div>
      </div>
    `}function Oe(){Ze(Ke(),e)}return{load(c){c!==d&&(f={},g="",A=[],D=!1,Z(),ie(),ve(),$e()),d=c,p=null,k(),ut(),Y!==c&&me(c)},clear(){d=null,p=null,f={},g="",w=!1,A=[],D=!1,Z(),ie(),ve(),$e(),ge.close(),Le.close(),Ze(l``,e)},destroy(){pe&&(pe(),pe=null),qe&&(qe(),qe=null),S&&(S(),S=null),document.removeEventListener("keydown",I),ge.destroy(),C.parentNode&&C.parentNode.removeChild(C),Le.destroy(),ke.parentNode&&ke.parentNode.removeChild(ke),d=null,p=null,$e(),g="",w=!1,A=[],ie(),ve(),Ze(l``,e)}}}function Hu(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},u=(d,p,f="")=>{n&&(n.textContent=d||"Unexpected Error"),r&&(r.textContent=p||"An unrecoverable error occurred.");let g=typeof f=="string"?f.trim():"";if(s&&(g.length>0?(s.textContent=g,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:u,close:i,getElement(){return t}}}function No(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ks(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function qo(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function Fo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Rg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:No(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Gu(e,t){let n=Rg(e,t);return n?l`<button
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
            >${Fo(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${ks(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Dr(e){let t=rn(e.created_at),n=rn(e.updated_at);return!t&&!n?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${Gt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?l`<span>·</span>`:""}${n?l`<span title=${`\uC218\uC815 ${Gt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Lg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function $s(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function jo(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function An(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,g)=>(f.requested_at||0)-(g.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,u=s?Lg(s.phase):null,d=s?.kind==="stale_work_backup_fresh",p=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${u||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:u,error:i,confirmation:p}}function ws(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return l`<div
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
  </div>`}var Og={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Vu(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let u=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Og[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Bo(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}var Do=3;function Ig(e){return l`<div
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
  </div>`}function Nr(e,t={}){if(!e)return"";let n=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.successors)?e.successors:[],s=Array.isArray(e.warnings)?e.warnings:[],o=Array.isArray(e.overlaps)?e.overlaps:[],a=e.scope_missing===!0&&t.lane!=="running",i=e.popover||null;if(n.length===0&&r.length===0&&s.length===0&&o.length===0&&!a)return"";let u=o.length>Do,d=u?o.slice(0,Do):o;return l`<div class="worker-deps">
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
        </button>`)}${u?l`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip mon-overlap__chip--more"
          data-overlap-all="true"
          title=${o.slice(Do).map(p=>`${p.id} (${p.location_label})`).join(`
`)}
        >
          +${o.length-Do}
        </button>`:""}${a?l`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 스펙에 scope 선언 필요"
          >scope 없음</span
        >`:""}${r.map(p=>l`<span class="worker-dep worker-dep--succ" title=${p.title||""}
          >${p.label}</span
        >`)}${s.map(p=>l`<span class="worker-dep worker-dep--warn">${p}</span>`)}${i?Ig(i):""}
  </div>`}function qr(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?l`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Pg(e){let t=Array.isArray(e.badges)?e.badges:[],n=Bt(e.usage),r=Rn(e.usage),s=rn(e.done_at);return l`<div
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
              >`):r?l`<span class="worker-usage" title=${ss(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?l`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${ks(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function zn(e){if(e.lane==="done"&&e.done_layout==="three_line")return Pg(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=Bt(e.usage),s=Rn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,u=i?rn(e.done_at):"",d=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",f=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",g=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",w=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,A=e.lane==="done"?"":qr(e.workflow),D=l`<span class="worker-mini__title">${e.title}</span>`,W=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",V=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",Y=n.map(F=>F===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${F}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${F===e.completion_badge&&e.completion_title||""}
          >${F}</span
        >`),N=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",M=r.length>0?r.map(F=>l`<span class="worker-usage" title=${F.tooltip}
              >${F.label}</span
            >`):s?l`<span class="worker-usage" title=${ss(e.usage)}
            >${s}</span
          >`:"",q=o?l`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?l`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",U=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",E=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",R=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",Z=e.discard,$e=Z?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${Z?.attempt_id||""}
          data-operation-id=${Z?.operation?.operation_id||""}
          data-discard-mode=${Z?.confirmation||"unmerged"}
          ?disabled=${Z?!Z.enabled:e.discard_enabled===!1}
          title=${Z?Z.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${Z?.label||"\uD3D0\uAE30"}
        </button>`:"",ue=e.stale_work||null,me=ue?l`${ue.can_resume||ue.can_continue?l`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ue.can_backup_fresh?l`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ue.can_recheck?l`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            다시 확인
          </button>`:""}`:"",Q=ue?l`<div class="worker-mini__stale">
        <strong>${ue.title}</strong>
        <span>${ue.summary}</span>
        <span>${ue.cause}</span>
        ${ue.can_backup_fresh?l`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Re=e.revise_action?l`<button
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
        </button>`:"",we=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${Bo(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",oe=Nr(e.dependency_chips,{lane:e.lane}),ae=ws(e),xe=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||Z?.operation||e.revise_action||ue);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">${g}${w}${D}</div>
          <div class="worker-mini__row2">
            ${M}${u?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Gt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${ks(e.work_ms)}</span
                >`:""}${Y}${q}
            <span class="worker-mini__actions"
              >${U}${E}${R}${$e}</span
            >
            ${Dr(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${d}${p}${g}${w}${A}${W}${V}${Y}${f}${N}
            </div>
            <div class="worker-mini__body">${D}${Q}</div>
            ${oe}${we}${xe?l`<div class="worker-mini__foot">
                  ${M}${q}
                  <span class="worker-mini__actions"
                    >${U}${E}${R}${$e}${Re}${me}</span
                  >
                  ${ws(e)}
                </div>`:""}
            ${Dr(e)}`:l`<div class="worker-mini__line">
              ${d}${p}${g}${w}${A}${D}${W}${V}${Y}${f}${N}${M}${q}${U}${E}${R}${$e}
            </div>
            ${oe}${we}${ae} ${Dr(e)}`}
  </div>`}function pi(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),u=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),d=Nr(e.dependency_chips,{lane:e.lane});return l`<div
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
      ${qr(a)}
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
                  class="worker-card__reason${u?" worker-card__reason--danger":""}"
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
    ${Dr(e)}
  </div>`}function pn(e){let t=!!e.collapsible&&!!e.collapsed,n=l`<span
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?pi(r,e.place_menu):zn(r))}
          </div>`}
  </section>`}var Ku={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Yu={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Zu(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function fi(e){for(let t of Zu(e))if(Object.hasOwn(Ku,t))return Ku[t];return null}function _i(e){let t=null;for(let n of Zu(e))Object.hasOwn(Yu,n)&&(t=Yu[n]);return t}function Uo(e){let t=fi(e),n=_i(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Qu(e,t){let n=fi(e)??fi(t),r=_i(t)??_i(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Xu=160;function Mg(e){return e.length>Xu?`${e.slice(0,Xu)}\u2026`:e}function Dg(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${Mg(e.command)}</code>`:""}
  </div>`}function Ng(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function qg(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Ju(e){let t=e.failure?Uo(e.failure.reason):"";return l`<div class="worker-banners">
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
          ${Dg(e.failure.cause_detail)}
          ${Ng(e.failure.reason)}
          ${ws({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Fg(e){return e?l`${e.repo?l`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?l`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}var jg=new Set(["codex-runner"]);function Bg(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(g=>g&&!(typeof g.agent_type=="string"&&jg.has(g.agent_type))),u=i.filter(g=>g&&g.state==="live"),d=i.filter(g=>g&&g.state!=="live"),p=Nr(e.dependency_chips,{lane:"running"}),f=r?rn(r.updated_at,t):"";return l`${o?l`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?l`<span class="rtile__activity-age"
              >${rn(a,t)}</span
            >`:""}
      </div>`:f?l`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">갱신 ${f}</span>
        </div>`:""}${u.length>0||d.length>0?l`<div class="rtile__legs">
        ${u.map(g=>l`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${g.label}</span
            >`)}${d.length>0?l`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${d.map(g=>g.label).join(", ")}`}
              >위임 완료 ${d.length}</span
            >`:""}
      </div>`:""}${p}`}function mi(e,t,n=null,r={}){let s=e.kind==="session",o=e.failed===!0,a=!!e.paused,i=o?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?qg(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=ts(e),p=Bt(e.usage),f=Rn(e.usage),g=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,w=e.base_exception||null,A=e.landing,D=e.attempt_id&&e.attempt_id===n,W=r.monitor||null,V=Fg(W),Y=Bg(W,t,a,s?{updated_at:e.updated_at??null}:null),N=s&&e.workflow?.chips?.exec_receipt||null,M=N?l`<div class="rtile__meta">
        <span
          class="ctl-chip ctl-chip--exec-receipt"
          title=${`exec_receipt ${En(N)}`}
          >${`${N.kind}:${oo(N)}`}</span
        >
      </div>`:"",q=s?"":Dr(e),U=e.discard?.action?l`<button
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
      ${qr(e.workflow)}${V}${d?l`<span class="rtile__resumed" title=${d}>↻</span>`:""}
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
    ${Y}${e.rollup?ro(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Aa}):""}
    ${A?l`<div class="rtile__landing">
          <span
            class="merge-step${A.failed?" merge-step--failed":""}"
            style=${`--progress: ${A.percent}%`}
            >${A.label}${A.index>0?l`<span class="merge-step__n"
                  >${A.index}/${A.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${s?M:u||p.length>0||f||g||w?l`<div class="rtile__meta">
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
                    title=${ss(e.usage)}
                    >${f}</span
                  >`:""}
          </div>`:""}
    ${q} ${ws(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${o||a?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function gi(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>mi(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var hi=new Set(["unavailable","not_applicable"]);function Hn(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function ed(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Gn(e,t){return t===null?null:`${Wn[e]}: ${t.display} (${Oo[t.source]})`}function bi(e){return e.filter(t=>t!==null).join(`
`)}function Wo(e){if(typeof e!="object"||e===null)return null;let t=ir(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:bi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Wn.orchestration_model,e.model),n(Wn.orchestration_effort,e.effort),n(Wn.orchestration_speed,e.speed)])}}function dr(e,t){let n=Hn(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Hn(e,"orchestration_effort"),s=Hn(e,"orchestration_speed"),o=ed([yn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:bi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Gn("orchestration_model",n),Gn("orchestration_effort",r),Gn("orchestration_speed",s)])}}function Ug(e,t){return e===null||e.value===null||hi.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Wg(e){return e===null||hi.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function zg(e){return e===null?null:e.value==="auto"?"auto":hi.has(e.resolution)?null:e.display}function Vn(e,t){if(typeof e!="object"||e===null)return null;let n=Hn(e,"impl_dispatch"),r=Hn(e,"impl_runtime"),s=Hn(e,"impl_model"),o=Hn(e,"impl_effort"),a=Hn(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":ed([Ug(r,t??null),Wg(s),zg(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:bi(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Gn("impl_dispatch",n),Gn("impl_runtime",r),Gn("impl_model",s),Gn("impl_effort",o),Gn("impl_speed",a)])}}var en="",Hg=["impl_runtime","impl_model","impl_effort"],Gg=5,zo=1;function Dn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ho(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(P=>ce(P,"error",4e3)),o={},a={},i=[],u=!1,d=null,p={},f="",g="",w=!1,A=!1,D=!1,W=null,V=!1;function Y(){let P=t.queue?t.queue():null;return Dn(P)?P:null}function N(){let P=Y();return P?P.runner_catalog:null}function M(){let P=Y();return P&&Dn(P.execution_defaults)?P.execution_defaults:null}function q(){let P=t.implPresetStore?.get();return Dn(P)&&Array.isArray(P.presets)?P:null}function U(){return r===null?{}:{root_dir:r}}async function E(P,H){return V||!n?null:await n(P,H)}function R(P){P&&Dn(P.queue)&&t.onQueueAdopt?.(P.queue)}async function Z(P,H){let J=Y();if(!J||V)return null;let X=await E(P,{...H,...U(),expected_revision:J.revision});if(R(X),r!==null&&X&&X.conflict){let Pe=X.queue&&typeof X.queue.revision=="number"?X.queue.revision:Y()?.revision??J.revision;X=await E(P,{...H,...U(),expected_revision:Pe}),R(X)}return X}async function $e(){u=!0,ve();try{let P=await E("get-session-defaults",{...U()});o=Dn(P?.values)?{...P.values}:{},a={...o},i=Array.isArray(P?.warnings)?P.warnings:[]}catch(P){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}finally{u=!1,ve()}}async function ue(){let P=vu(o,a);if(Object.keys(P).length!==0){try{let H=await E("set-session-defaults",{values:P,...U()});o=Dn(H?.values)?{...H.values}:{},a={...o},i=Array.isArray(H?.warnings)?H.warnings:[]}catch(H){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}ve()}}function me(P,H){if(Hg.includes(P)){we(P,H);return}H===en?delete a[P]:a[P]=H,ve(),ue()}function Q(){let P=Qe().orchestration_model,H=Jt({global:{orchestration_model:P??void 0},execution_defaults:M(),runner_catalog:N()}).orchestration_model.value;return H?yn(N(),H):null}function Re(P,H){typeof H=="string"&&H.length>0?a[P]=H:delete a[P]}function we(P,H){let J=H===en?void 0:H,X=bu({impl_runtime:P==="impl_runtime"?J:a.impl_runtime,impl_model:P==="impl_model"?J:a.impl_model,impl_effort:P==="impl_effort"?J:a.impl_effort},N(),Q());Re("impl_runtime",X.impl_runtime),Re("impl_model",X.impl_model),Re("impl_effort",X.impl_effort),ve(),ue()}async function oe(){let P=Y();if(!P)return;let H={orchestration_model:P.orchestration_model??null,orchestration_effort:P.orchestration_effort??null,orchestration_speed:P.orchestration_speed??null},J=wu(H,{...H,...p});if(Object.keys(J).length!==0){try{let X=await Z("worker-queue-set-orchestration-defaults",{values:J});if(X&&X.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}p={}}catch(X){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}ve()}}function ae(P,H){p[P]=H===en?null:H,ve(),oe()}function xe(P){if(d=P,!P){ve();return}let H=N(),J=Qe(),X=J.orchestration_model;X&&!ys(H,P).includes(X)&&(p.orchestration_model=null,X=null);let Pe=J.orchestration_effort;Pe&&!oi(H,P,X||an).includes(Pe)&&(p.orchestration_effort=null),ve(),oe()}async function F(P){if(!(!Y()||P<zo)){try{await Z("worker-queue-set-slots",{slots:P})}catch(H){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}ve()}}async function se(P){if(!(!Y()||P<zo||P>Gg)){try{await Z("worker-queue-set-serial-lane-count",{count:P})}catch(H){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}ve()}}async function ie(P,H){let J=P==="auto_advance"?"worker-automation-toggle":P==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await Z(J,{on:H})}catch(X){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}ve()}function Ae(){let P={},H=Qe();for(let J of To){let X=Mn.includes(J)?H[J]:a[J];typeof X=="string"&&X.length>0&&(P[J]=X)}return P}async function Se(){let P=q();if(!P)return;let H=Ae();if(Object.keys(H).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let J=(P.presets||[]).find(Pe=>Pe.id===f),X=g.trim()||(J?J.name:"");if(!X){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Pe=J?await E("impl-preset-update",{expected_revision:P.revision,id:J.id,name:X,settings:H}):await E("impl-preset-create",{expected_revision:P.revision,name:X,settings:H});if(Pe&&Pe.applied){if(g="",!J&&Array.isArray(Pe.presets)){let tt=Pe.presets.find(st=>st.name===X);f=tt?tt.id:f}ve()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ve()}catch(Pe){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Pe instanceof Error?Pe.message:String(Pe)}`)}}async function Ie(){let P=q();if(!(!P||f.length===0))try{let H=await E("impl-preset-delete",{expected_revision:P.revision,id:f});H&&H.applied?(f="",ve()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ve())}catch(H){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}}function he(P){o=Dn(P.values)?{...P.values}:{},a={...o},i=Array.isArray(P.warnings)?P.warnings:[],Dn(P.queue)&&(t.onQueueAdopt?.(P.queue),p={})}async function it(){let P=q(),H=Y();if(!P||!H||f.length===0)return;let J=X=>({preset_id:f,expected_revision:P.revision,expected_queue_revision:X,...U()});try{let X=await E("apply-impl-preset-global",J(H.revision));if(X&&X.applied&&he(X),r!==null&&X&&X.queue_applied===!1){let Pe=X.queue&&typeof X.queue.revision=="number"?X.queue.revision:Y()?.revision??H.revision;X=await E("apply-impl-preset-global",J(Pe)),X&&X.applied&&he(X)}X&&X.applied?X.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):X&&X.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(X){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}ve()}async function _t(){A=!0,D=!1,ve();try{let P=await E("get-worker-system-prompt",{});!P||typeof P!="object"||Array.isArray(P)?D=!0:W=P}catch{D=!0}finally{A=!1,ve()}}function C(){if(w=!w,w&&!W){_t();return}ve()}function ge(){let P=Or({loading:A,error:D});if(P)return P;if(!W)return"";let H=Array.isArray(W.variants)?W.variants:[];return l`<div class="settings-dialog__sp-body">
      ${W.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${W.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${H.map(J=>l`<div class="settings-dialog__sp-variant" data-variant=${J.key}>
            <div class="settings-dialog__sp-cond">${J.condition}</div>
            ${Pn(J.label,J.system_prompt)}
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
      ${w?ge():""}
    </section>`}function Le(P,H,J,X,Pe,tt,st){let Je=Pe[P]??en,vt=ai(P,J,Pe,M(),N(),st),mt=vt.options.find(ut=>ut.value===Je),ot=Je===en?vt.full_value:mt?.full_value;return l`<select
        class=${Je===en?"settings-dialog__unset":""}
        data-key=${P}
        aria-label=${H}
        title=${ot||""}
        ?disabled=${tt===!0||vt.disabled}
        .value=${ur(String(Je))}
        @change=${ut=>X(P,String(ut.target.value))}
      >
        <option value=${en} ?selected=${Je===en}>
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
      ${Je===en?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Me(P,H,J,X,Pe,tt=!1,st){return l`<div
      class=${`settings-dialog__row${tt?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${H}</span>
      <span class="settings-dialog__controls">
        ${Le(P,H,J,X,Pe,tt,st)}
      </span>
    </div>`}function Be(P,H,J,X,Pe){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${H}-on)`}
        ></i>
        ${P}
      </span>
      <span class="settings-dialog__controls">
        ${Le(J,`${P} \uBAA8\uB378`,X,me,a,!1)}
        ${Le(Pe,`${P} effort`,Lo,me,a,!1)}
      </span>
    </div>`}function z(P,H,J,X){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${H}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${X?" is-on":""}`}
          data-automation=${P}
          aria-pressed=${X?"true":"false"}
          aria-label=${H}
          @click=${()=>ie(P,!X)}
        >
          ${X?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${J}</span>
      </span>
    </div>`}function K(P,H,J,X){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${H}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${P}>
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
    </div>`}function Qe(){let P=Y(),H={};for(let J of Mn)H[J]=Object.prototype.hasOwnProperty.call(p,J)?p[J]:P&&typeof P[J]=="string"?P[J]:null;return H}function We(){let P=N(),H=a.impl_runtime,J=a.impl_model,X=q(),Pe=Y(),tt=Qe(),st=ys(P,d),Je=Pr(P,void 0).filter(He=>He!==an),vt=oi(P,d,tt.orchestration_model||an).filter(He=>He!==an),mt=f?(X?.presets||[]).find(He=>He.id===f):null,ot=mt?yu(Ae(),Dn(mt.settings)?mt.settings:{}):null,ut=Pe&&typeof Pe.slots=="number"?Pe.slots:zo+1,gt=Pe&&typeof Pe.serial_lane_count=="number"?Pe.serial_lane_count:zo,Ve=M()?.supported===!0,Ne=ai("workflow_mode",hs,a,M(),P);return l`
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
      ${u?l`<div class="settings-dialog__empty">불러오는 중…</div>`:l`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${ur(f)}
                @change=${He=>{f=String(He.target.value),ve()}}
              >
                <option value="" ?selected=${f===""}>
                  실행 프리셋…
                </option>
                ${(X?.presets||[]).map(He=>l`<option
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
                @click=${Ie}
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
                    .value=${ur(d||en)}
                    @change=${He=>{let wt=String(He.target.value);xe(wt===en?null:wt)}}
                  >
                    <option value=${en} ?selected=${!d}>
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
              ${Me("orchestration_speed","\uC18D\uB3C4",gs,ae,tt)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${en}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>me("workflow_mode",en)}
                    >
                      ${Ne.unset_label}
                    </button>
                    ${a.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${hs.map(He=>l`<button
                          type="button"
                          data-mode=${He}
                          aria-pressed=${String(a.workflow_mode===He)}
                          @click=${()=>me("workflow_mode",He)}
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
              ${Be("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",bs,"spec_review_effort")}
              ${Be("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ro,"plan_review_effort")}
              ${Be("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",bs,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Me("impl_runtime","\uC704\uC784 \uB300\uC0C1",Co,me,a)}
              ${Me("impl_model","\uBAA8\uB378",Pr(P,H),me,a)}
              ${Me("impl_effort","effort",Mr(P,H,J),me,a)}
              ${Me("impl_speed","\uC18D\uB3C4",gs,me,a)}
              ${Me("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Je,me,a,!1,{...a,...tt})}
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
              ${K("slots","\uB3D9\uC2DC \uC2E4\uD589",ut,He=>F(He))}
              ${K("serial-lane-count","\uC9C1\uB82C \uB808\uC778",gt,He=>se(He))}
            </div>
            ${ke()}
          `}
    `}function ve(){V||Ze(We(),e)}return{load(){return p={},$e()},render:ve,sessionDraft:()=>({...a}),destroy(){V=!0,Ze(l``,e)}}}function xs(e){return l`<svg
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
  </svg>`}function td(){return xs(wr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function nd(){return xs(wr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function rd(){return xs(wr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function sd(){return xs(wr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function od(){return xs(wr`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function ad(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function id(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Bt(uo(t));let n={};for(let i of Cn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let u=i&&i.usage;if(u&&typeof u=="object"){let d=!1;for(let p of Cn){let f=u[p];typeof f=="number"&&Number.isFinite(f)&&(n[p]+=f,r=!0,d=!0)}if(d){o+=1;let p=u.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Rn(n):null}function vn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Fr(e,t){let n=vn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Vg(e,t){if(!vn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function Kg(e){if(!vn(e)||!vn(e.execution_defaults)||!vn(e.runner_catalog)||!vn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=Jt({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=yn(e.runner_catalog,n.orchestration_model.value??""),s=dr(n,e.runner_catalog),o=Vn(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function ld(e,t){let n=t.notify||(F=>ce(F,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let u=document.createElement("div");u.className="mon2-deck__panel-body",s.append(o,u),e.appendChild(s);let d=null,p=null,f=null,g=new Map;function w(){let F=t.workspacesState?t.workspacesState():[];return Array.isArray(F)?F.filter(se=>vn(se)):[]}function A(F){return w().find(se=>se.root_dir===F)||null}function D(F){return Vg(A(F),g.get(F))}function W(){for(let F of w()){let se=g.get(F.root_dir);se&&typeof se.revision=="number"&&typeof F.revision=="number"&&F.revision>=se.revision&&g.delete(F.root_dir)}}async function V(F,se,ie){let Ae=t.transport,Se=D(se);if(!(!Ae||!vn(Se))){try{let Ie=await Ae(F,{...ie,root_dir:se,expected_revision:Se.revision});if(vn(Ie?.queue)&&g.set(se,Ie.queue),Ie&&Ie.conflict){let he=vn(Ie.queue)&&typeof Ie.queue.revision=="number"?Ie.queue.revision:D(se)?.revision;Ie=await Ae(F,{...ie,root_dir:se,expected_revision:he}),vn(Ie?.queue)&&g.set(se,Ie.queue)}}catch(Ie){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ie instanceof Error?Ie.message:String(Ie)}`)}oe()}}function Y(F){d!==F&&(d=F,t.onFocusChange?.(d),oe())}function N(F){Y(d===F?null:F)}function M(F){if(p===F){U();return}q(),p=F;let se=A(F);a.textContent=`${se?.name||F} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,f=Ho(u,{root_dir:F,queue:()=>D(F),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ie=>{g.set(F,ie),oe()}}),f.load(),oe()}function q(){f?.destroy(),f=null}function U(F){q(),p=null,s.hidden=!0,a.textContent="",F!==!0&&oe()}let E=()=>U();i.addEventListener("click",E);function R(F){F.key==="Escape"&&d!==null&&Y(null)}document.addEventListener("keydown",R);function Z(F,se){let ie=Math.max(se,F,1);return l`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${se}\uAC1C \uC911 ${F}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ie},(Ae,Se)=>Se<F?l`<i class="mon2-deck__slot is-run"></i>`:l`<i class="mon2-deck__slot"></i>`)}
    </span>`}function $e(F){let se=F.auto_advance===!0,ie=F.auto_merge===!0;return l`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${se?" is-on":""}`}
        data-act="auto"
        aria-pressed=${se?"true":"false"}
        aria-label=${`${F.name} \uC790\uB3D9\uD654`}
        title=${se?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${se?nd():td()}
        <span class="mon2-deck__op-label">자동화</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ie?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ie?"true":"false"}
        aria-label=${`${F.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ie?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${rd()}
        <span class="mon2-deck__op-label">머지</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${p===F.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${p===F.root_dir?"true":"false"}
        aria-label=${`${F.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${od()}
      </button>`}function ue(F){let se=Kg(F);return se?l`<div class="mon2-deck__chips">
      ${se.orchestration?l`<span class="mon2-deck__chip" title=${se.orchestration.title}
            >오케 ${se.orchestration.text}</span
          >`:""}
      ${se.worker?l`<span class="mon2-deck__chip" title=${se.worker.title}
            >워커 ${se.worker.text}</span
          >`:""}
    </div>`:""}function me(F){let se=Fr(F,"running"),ie=typeof F.slots=="number"?F.slots:1;return l`<div
      class=${`mon2-deck__tile${d===F.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${F.root_dir}
      aria-pressed=${d===F.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${F.root_dir}>${F.name}</span>
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
        ${sd()} ${Z(se,ie)}
        <span class="mon2-deck__counts"
          >${se}/${ie} 실행 · 대기 ${Fr(F,"queue")} · PR
          ${Fr(F,"pr_wait")}${Fr(F,"session_active")>0?` \xB7 \uC138\uC158 ${Fr(F,"session_active")}`:""}</span
        >
      </div>
      <div class="mon2-deck__ops">${$e(F)}</div>
      ${ue(F)}
    </div>`}function Q(F){let se=t.doneItems?t.doneItems():[],ie=t.rangeLabel?t.rangeLabel():"",Ae=id(Array.isArray(se)?se:[]),Se=Ie=>F.reduce((he,it)=>he+Fr(it,Ie),0);return l`<div
      class="mon2-deck__total"
      title=${`visible \uB808\uD3EC ${F.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ie}`}
    >
      <div class="mon2-deck__total-counts">
        실행 ${Se("running")} · 대기 ${Se("queue")} · PR
        ${Se("pr_wait")}${Se("session_active")>0?` \xB7 \uC138\uC158 ${Se("session_active")}`:""}
        · ${ie} 완료
        ${Array.isArray(se)?se.length:0}
      </div>
      ${Ae===null?"":l`<div class="mon2-deck__total-tokens">
            ${typeof Ae=="string"?l`<span
                  class="mon2-deck__tok"
                  title=${ad(ie)}
                  >τ ${Ae}</span
                >`:Ae.map(Ie=>l`<span
                      class="mon2-deck__tok"
                      data-provider=${Ie.provider}
                      title=${Ie.tooltip}
                      >τ ${Ie.label}</span
                    >`)}
          </div>`}
    </div>`}function Re(){let F=w();return F.length===0?"":l`<div class="mon2-deck__row">
      ${Q(F)}
      <div class="mon2-deck__strip">
        ${F.map(se=>me(se))}
      </div>
    </div>`}function we(){d!==null&&!A(d)&&(d=null,t.onFocusChange?.(null))}function oe(){W(),we(),p!==null&&!A(p)&&U(!0),Ze(Re(),r),f?.render()}function ae(F){let se=F.target;if(!se||typeof se.closest!="function")return;let ie=se.closest("[data-root-dir]");if(!ie)return;let Ae=ie.getAttribute("data-root-dir")||"",Se=se.closest("[data-act]")?.getAttribute("data-act");if(Se==="worker"){t.gotoWorkerTab?.(Ae);return}if(Se==="auto"){V("worker-automation-toggle",Ae,{on:D(Ae)?.auto_advance!==!0});return}if(Se==="merge"){V("worker-merge-auto-toggle",Ae,{on:D(Ae)?.auto_merge!==!0});return}if(Se==="gear"){M(Ae);return}N(Ae)}function xe(F){if(F.key!=="Enter"&&F.key!==" ")return;let se=F.target;if(!se||typeof se.closest!="function")return;let ie=se.closest('[data-root-dir][role="button"]');!ie||ie!==se||(F.preventDefault(),N(ie.getAttribute("data-root-dir")||""))}return r.addEventListener("click",ae),r.addEventListener("keydown",xe),{render:oe,focusRoot:()=>d,panelRoot:()=>p,destroy(){document.removeEventListener("keydown",R),r.removeEventListener("click",ae),r.removeEventListener("keydown",xe),i.removeEventListener("click",E),q(),Ze(l``,r),e.replaceChildren()}}}var Yg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Zg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694";function yi(e,t){return`${e}\0${t}`}function Qg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Xg(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Jg(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function eh(e,t){let n=new Set(t),r=new Map,s=new Map;for(let i of n){let u=Array.from(new Set((e.get(i)||[]).filter(d=>d!==i&&n.has(d))));r.set(i,u.length);for(let d of u){let p=s.get(d);p?p.push(i):s.set(d,[i])}}let o=[],a=Array.from(n).filter(i=>r.get(i)===0).sort();for(;a.length>0;){let i=a.shift();o.push(i);for(let u of(s.get(i)||[]).slice().sort()){let d=(r.get(u)||0)-1;r.set(u,d),d===0&&a.push(u)}}for(let i of t)o.includes(i)||o.push(i);return o}function th(e,t){let n=new Set;for(let[a,i]of t)for(let u of i)n.add(yi(a,u));let r=new Map,s=new Map;for(let a of e){let i=yi(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=yi(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function nh(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function rh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function vi(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function cd(e,t,n){let r=Xg(n.blocked_by_map),s=[],o=null,a=w=>{let A=n.owner_of.get(w);return typeof A!="string"||A.length===0?(o=Qg(w),null):A},i=(w,A)=>{if(o!==null||w===A)return;let D=r.get(w)||[];if(!D.includes(A))return;let W=a(w);W!==null&&(r.set(w,D.filter(V=>V!==A)),s.push({type:"dep-remove",a:w,b:A,root_dir:W}))},u=(w,A)=>{if(o!==null||w===A)return;let D=r.get(w)||[];if(D.includes(A))return;let W=a(w);if(W!==null){if(Jg(r,A,w)){o=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${w}\uAC00 \uC774\uBBF8 ${A}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}r.set(w,[...D,A]),s.push({type:"dep-add",a:w,b:A,root_dir:W})}},d=()=>{let w=n.lane_order.get(e.lane_id||"")||[],A=new Set(w),D=(r.get(e.bead_id)||[]).filter(V=>A.has(V)),W=w.filter(V=>(r.get(V)||[]).includes(e.bead_id));for(let V of D)i(e.bead_id,V);for(let V of W)i(V,e.bead_id);for(let V of D)for(let Y of W)u(Y,V);return w.filter(V=>V!==e.bead_id)},p=(w,A)=>{let D=n.lane_order.get(w)||[],W=D.indexOf(e.bead_id),V=eh(r,D.filter(q=>q!==e.bead_id)),Y=w.startsWith("pending:")?V.length:Math.max(0,Math.min(V.length,W>=0&&A>W?A-1:A)),N=Y>0?V[Y-1]:null,M=Y<V.length?V[Y]:null;if(N===null){M!==null&&u(M,e.bead_id);return}u(e.bead_id,N),M!==null&&(r.get(M)||[]).includes(N)&&(i(M,N),u(M,e.bead_id))},f=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Yg};if(t.kind==="chain"&&e.kind==="repo-serial")return{refused:Zg};if(e.kind==="chain"&&d(),t.kind==="chain"&&p(t.lane_id,t.marker_index),o!==null)return{refused:o};let g=[];if(t.kind==="candidate")e.kind!=="candidate"&&g.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=nh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")g.push(vi(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let A=n.parallel_rows,D=A[Math.max(0,Math.min(A.length,t.marker_index))];if(!(!!D&&D.bead_id===e.bead_id)&&rh(n,e.root_dir)&&f!==void 0){let V=f>w?w:w-1;V>=0&&V!==f&&g.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:V},root_dir:e.root_dir})}}}else if(t.kind==="chain")e.kind==="candidate"&&g.push(vi(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0));else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(f!==void 0&&t.index!==f){let w=f>t.index?t.index:t.index-1;w>=0&&w!==f&&g.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else g.push(vi(e.bead_id,e.root_dir,t.index,t.lane_id));return{ops:[...th(s,n.blocked_by_map),...g]}}var ud={running:3,paused:2,failed:1};function dd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let p=t.get(a.bead_id),f=typeof p=="number"&&p>0&&typeof a.finished_at=="number"&&p>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!f&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let u=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let p=ud[d.run_state],f=ud[i];if(p>f||p===f&&(d.started_at??0)>(u??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:u})}return{winners:o,resumed_from_ids:r}}function Go(e){return e.replace(/\/+$/,"")}function sh(e,t){let n=Go(e),r=Go(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Vo(e,t){let n=new Set;for(let r of e)for(let s of t){if(!sh(r,s))continue;let o=Go(r),a=Go(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}var pd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],As=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ko(e,t){let n=pd.find(s=>s.step===e);if(!n)return null;let r=pd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function fd(e){let t=As.findIndex(n=>n.step===e);return As.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function pr(e){let t=As.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function oh(e){let t=As.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:As.length}}function Yo(e){let t=oh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ki=new Set(["queued","running","retry_pending","repairing"]),_d=new Set(["failed","succeeded"]),ah={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Ss={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},ih={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Ss.base_containment,child_sweep:Ss.child_sweep,branch_cleanup:Ss.branch_cleanup,parent_close:Ss.parent_close};function lh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function ch(e,t,n){return!["verify","deploy"].includes(e.kind)||![...ki,..._d].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function uh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=d=>d.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",u=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(u)}function wi(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=ah[s];if(!o)return null;let a=Ko(n,`${r} ${o}`);return a?{...a,active:ki.has(s),failed:s==="failed"}:null}function dh(e){return!e||typeof e!="object"?null:ih[e.step]||null}function Es(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=dh(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=lh(e.merge_sha)?e.merge_sha:null,u=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(A=>A&&typeof A=="object"&&ch(A,t,i)).sort(uh):[],d=a?u:[],p=d.find(A=>ki.has(A.state));if(p)return wi(p);if(s)return s.step==="repo_operations"&&u[0]?wi(u[0],!0):null;let f=d.find(A=>_d.has(A.state)?A.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return wi(f);if(r){let A=Ko(r.step,r.label);return A?{...A,active:!0,failed:!1}:null}let g=typeof e.cleanup_cursor=="string"?Ss[e.cleanup_cursor]:null;if(!g)return null;let w=Ko(g.step,g.label);return w?{...w,active:!0,failed:!1}:null}function Zo(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function $i(e,t){return`${e}\0${t}`}function md(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function xi(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function ph(e,t){return e==="internal"&&t===void 0}function jr(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function gd(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${jr(s)})`,location_label:jr(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=xi(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:ph(a,s)}}function hd(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let u of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=$i(i.root_dir,u.id);n.set(d,{root_dir:i.root_dir,workspace_name:i.name,lane:u.id}),s.set(d,[]);for(let p of Array.isArray(u.items)?u.items:[])r.set(p.id,d)}for(let i of t)for(let u of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=$i(i.root_dir,u.id),p=Array.isArray(u.items)?u.items[0]:null,g=!!p&&p.queue_index===0&&(!Array.isArray(u.occupied_by)||u.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],w=s.get(d);if(w)for(let A of g){let D=r.get(A);D&&D!==d&&!w.includes(D)&&w.push(D)}}let o=(i,u)=>{let d=new Set,p=[i];for(;p.length>0;){let f=p.pop();if(f===u)return!0;!f||d.has(f)||(d.add(f),p.push(...s.get(f)||[]))}return!1},a=new Map;for(let[i,u]of s){let d=[];for(let p of u){let f=n.get(p);o(p,i)&&f&&d.push(f)}d.length>0&&a.set(i,d)}return a}function bd(e,t){return $i(e,t)}var yd=1,Ts=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Si=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Br={show_blocked:!0,spec:"all"},vd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function fh(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function _h(e,t){let{winners:n,resumed_from_ids:r}=dd(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,u=a.run_state,d=a.started_at,p=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:u,started_at:d,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:un(e,i.bead_id),can_pause:u==="running"&&p,can_resume:u!=="running"&&p&&!r.has(i.attempt_id)})}return s}function wd(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function At(e){return e&&typeof e=="object"?e:{}}function mh(e,t,n){let r=At(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=g=>Jt({pin:g,global:a,execution_defaults:s,runner_catalog:o,route:n}),u,d;try{u=i(r),d=i(null)}catch{return null}let p=kd(dr(u,o),dr(d,o)),f=kd(Vn(u,null),Vn(d,null));return p||f?{orchestration:p,worker:f}:null}function kd(e,t){return!e||t&&t.text===e.text?null:e}function gh(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function hh(e,t){let n=t.get(e);return n?{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${jr(n)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`}:null}function bh(e,t,n){let r=new Map;for(let u of e)r.set(u,Array.from(n.get(u)||[]).filter(d=>e.includes(d)).length);let s=[],o=new Map,a=e.filter(u=>(r.get(u)||0)===0).sort();for(let u of a)o.set(u,0);let i=[...a];for(;i.length>0;){let u=i.shift();s.push(u);let d=Array.from(t.get(u)||[]).filter(f=>e.includes(f)).sort(),p=(o.get(u)||0)+(d.length>1?1:0);for(let f of d){let g=(r.get(f)||0)-1;r.set(f,g);let w=o.get(f);o.set(f,w===void 0?p:Math.min(w,p)),g===0&&i.push(f)}}return{order:s,indent:o,cycle:s.length!==e.length}}function yh(e,t,n){let r=new Map,s=new Map,o=new Set,a=(p,f,g)=>{let w=p.get(f);w?w.add(g):p.set(f,new Set([g]))},i=p=>t.get(p)?.lane==="done";for(let[p,f]of e)if(!i(p))for(let g of f)g===p||i(g)||(o.add(g),o.add(p),a(r,g,p),a(s,p,g));let u=new Set,d=[];for(let p of Array.from(o).sort()){if(u.has(p))continue;let f=[],g=[p];for(u.add(p);g.length>0;){let N=g.pop();f.push(N);for(let M of[...r.get(N)||[],...s.get(N)||[]])u.has(M)||(u.add(M),g.push(M))}if(f.length<2)continue;let w=f.map(N=>t.get(N));if(w.every(N=>!!N&&/^s[1-5]$/.test(N.lane||""))&&w.every(N=>N&&w[0]&&N.root_dir===w[0].root_dir&&N.lane===w[0].lane))continue;let{order:D,indent:W,cycle:V}=bh(f.slice().sort(),r,s),Y=V?f.slice().sort():D;d.push({key:f.slice().sort().join("\0"),cycle:V,nodes:Y.map(N=>{let M=t.get(N);return{id:N,workspace_name:M?M.workspace_name:"",root_dir:M?M.root_dir:"",location_label:M?jr(M):$d(N,n),indent:V?0:W.get(N)||0}})})}return d}function $d(e,t){let n=xi(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function xd(e,t,n){let r=t.get(e);if(!r)return $d(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return jr(r)}function vh(e,t,n){let r=[];for(let s of n.get(e)||[])s!==e&&t.has(s)&&!r.includes(s)&&r.push(s);return r}function wh(e,t,n,r,s,o,a){let i=(f,g,w,A,D=!1)=>{let W=r.get(f),V=W&&W.lane==="parallel"&&typeof W.position=="number"?W.position-1:null;return{id:f,title:o.get(f)||f,workflow:a.get(f)||null,root_dir:W?W.root_dir:"",workspace_name:W?W.workspace_name:"",seq:g,indent:w,predecessors:A,location_label:xd(f,r,s),draggable:!D&&V!==null,...V!==null?{queue_index:V}:{}}},u=[];for(let f of e.slice().sort((g,w)=>g.key<w.key?-1:1)){let g=new Set(f.nodes.map(w=>w.id));u.push({lane_id:`chain:${f.key}`,label:"",pending:!1,cycle:f.cycle,rows:f.nodes.map((w,A)=>i(w.id,A+1,f.cycle?0:w.indent,f.cycle?[]:vh(w.id,g,n),f.cycle))})}let d=new Set;for(let f of u)for(let g of f.rows)d.add(g.id);let p=[];return t.forEach((f,g)=>{let w=f&&typeof f.seed=="string"&&f.seed.length>0?f.seed:null;w!==null&&d.has(w)||(p.push(g),u.push({lane_id:`pending:${g}`,label:"",pending:!0,cycle:!1,rows:w===null?[]:[i(w,1,0,[])]}))}),u.forEach((f,g)=>{f.label=`\uC5F0\uACB0 ${g+1} \xB7 \uB808\uD3EC \uAC04`}),{chain_lanes:u,pending_lanes_kept:p}}function kh(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:e.spec_id?"missing":void 0}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function $h(e,t,n,r,s){let o=new Map;for(let i of[...e.running,...e.queue,...e.runnable]){if(!t.has(i.root_dir))continue;let{scope:u,state:d}=kh(i,t,n);if(d!==void 0&&(i.scope_state=d),u.length===0)continue;let p=o.get(i.root_dir);p?p.push({item:i,scope:u}):o.set(i.root_dir,[{item:i,scope:u}])}let a=(i,u,d)=>{let p={id:u.id,title:u.title,location_label:xd(u.id,r,s),prefixes:d};i.overlap_chips?i.overlap_chips.push(p):i.overlap_chips=[p]};for(let i of o.values())for(let u=0;u<i.length;u+=1)for(let d=u+1;d<i.length;d+=1){let p=Vo(i[u].scope,i[d].scope);p.length!==0&&(a(i[u].item,i[d].item,p),a(i[d].item,i[u].item,p))}}function Ai(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Qo(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ei(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...Br,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Ts.some(C=>C.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let C of s)C&&typeof C.root_dir=="string"&&u.set(C.root_dir,C);let d=[],p=[],f=[],g=[],w=[],A=[],D=new Map,W=new Map,V=new Map,Y=new Map,N=new Map,M=new Map,q=new Map,U=new Map,E=new Map;for(let C of r){if(!C||typeof C.root_dir!="string")continue;let ge=C.root_dir,ke=C.name||ge,Le=u.get(ge),Me=Le&&typeof Le.revision=="number"?Le.revision:typeof C.revision=="number"?C.revision:0,Be=At(C.attempts),z=At(C.bead_titles);for(let[k,L]of Object.entries(z))typeof L=="string"&&L.length>0&&U.set(k,L);let K=At(C.bead_times),De=At(C.pr_observations),Qe=At(C.admission),We=At(C.revise_parked),ve=At(C.merge_queue_state),P=At(C.cleanup_failed),H=At(C.discard_operations),J=At(C.bead_blocked_by);Object.hasOwn(C,"bead_scope")&&M.set(ge,At(C.bead_scope));let X=At(C.bead_workflow);for(let[k,L]of Object.entries(X))L&&typeof L=="object"&&E.set(k,L);let Pe=At(C.pr_activity),tt=Array.isArray(C.repo_operations)?C.repo_operations:[],st=Array.isArray(C.merge_queue)?C.merge_queue:[],Je=new Set(st.filter(k=>k&&typeof k.bead_id=="string").map(k=>k.bead_id)),vt=new Map(st.filter(k=>k&&typeof k.bead_id=="string").map(k=>[k.bead_id,k])),mt=Array.isArray(C.queue)?C.queue:[],ot=(Array.isArray(C.serial_lanes)?C.serial_lanes:[]).filter(k=>k&&/^s[1-5]$/.test(k.id)&&Array.isArray(k.entries)),ut=At(C.lane_states),gt=typeof C.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(C.serial_lane_count))):Math.min(5,ot.length);V.set(ge,gt),Y.set(ge,mt.length);let Ve=new Map(ot.map(k=>[k.id,k])),Ne=new Map;for(let k of ot)for(let L of k.entries)L&&typeof L.bead_id=="string"&&Ne.set(L.bead_id,k.id);for(let[k,L]of Object.entries(J))Array.isArray(L)&&N.set(k,L.filter(re=>typeof re=="string"&&re.length>0));let He=Array.isArray(C.done)?C.done:[];for(let k of He)k&&typeof k.bead_id=="string"&&A.push({id:k.bead_id,root_dir:ge,workspace_name:ke});let wt=new Map;for(let k of He)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&wt.set(k.bead_id,k.added_at);let lt=k=>({id:k,title:z[k]||k,root_dir:ge,workspace_name:ke,expected_revision:Me,draggable:!1,...At(K[k]).created_at?{created_at:At(K[k]).created_at}:{},...At(K[k]).updated_at?{updated_at:At(K[k]).updated_at}:{}}),G=new Set;for(let[k,L]of _h(Be,wt))G.add(k),p.push({...lt(k),lane:"running",...Ne.has(k)?{serial_lane_id:Ne.get(k)}:{},attempt_id:L.attempt_id,run_state:L.run_state,status:L.status||void 0,workflow:X[k]||null,can_pause:L.can_pause,can_resume:L.can_resume,started_at:L.started_at,last_event_at:L.last_event_at,last_activity:L.last_activity,legs:L.legs,runner:L.runner,model:L.model,effort:L.effort,speed:L.speed,resumed_from:L.resumed_from,continuation_mode:L.continuation_mode,usage:L.usage,exec_chips:{orchestration:Wo(L),worker:null},discard:An(H,k,{attempt_id:L.attempt_id}),badges:L.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:L.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:L.run_state==="failed"});for(let k of Array.isArray(C.session_active)?C.session_active:[]){let L=k&&k.bead_id;typeof L!="string"||G.has(L)||(G.add(L),Array.isArray(k.blocked_by)&&k.blocked_by.length>0&&N.set(L,k.blocked_by.filter(re=>typeof re=="string"&&re.length>0)),typeof k.title=="string"&&k.title.length>0&&U.set(L,k.title),k.workflow&&typeof k.workflow=="object"&&E.set(L,k.workflow),p.push({...lt(L),title:k.title||z[L]||L,lane:"running",kind:"session",status:"in_progress",started_at:Ai(k.started_at)??Ai(k.updated_at)??void 0,updated_at:Ai(k.updated_at)??void 0,workflow:k.workflow||null,labels:Array.isArray(k.labels)?k.labels:[],spec_id:typeof k.spec_id=="string"?k.spec_id:"",blocked:k.blocked===!0,...Array.isArray(k.blocked_by)?{blocked_by:k.blocked_by.filter(re=>typeof re=="string"&&re.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,badges:[],alert:!1}))}for(let k of Array.isArray(C.pr_wait)?C.pr_wait:[]){let L=k&&k.bead_id;if(typeof L!="string"||G.has(L))continue;G.add(L);let re=At(De[L]),de=At(re.pr),te=re.gate?At(re.gate):null,be=Je.has(L),ct=vt.get(L)?.continuation_action||null,Xe=!!ct&&ct.continuation===null,Ye=ve.active===L,bt=k.external===!0,St=P[L]||null,yt=At(Pe[L]),Ct=Es({bead_id:L,merge_sha:k.merge_sha,cleanup_cursor:k.cleanup_cursor,merge_progress:yt.merge_progress||null,cleanup_failed:St,repo_operations:tt}),zt=Zo(Ct),Nt=!!te&&te.base_badge==="\uCDA9\uB3CC",Mt=!!St&&["child_sweep","branch_cleanup","parent_close"].includes(St.step)&&!!te&&te.tier==="merged",Ft=bt&&!!St&&!!te&&te.tier==="merged",Lt=!!te&&["closed_unmerged","review","undecidable"].includes(te.tier),Ue=An(H,L,{external:bt,merge_active:Ye||Ct?.step==="merge",merge_queued:be,cleanup_active:zt,merged:!!St||te?.tier==="merged"}),Ut=!!Ue.operation;f.push({...lt(L),lane:"pr_wait",workflow:X[L]||null,pr_number:typeof de.number=="number"?de.number:null,pr_url:typeof de.url=="string"?de.url:void 0,external:bt,usage:un(Be,L),merge_step:Ct,badges:Xe?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ct?[te?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:St?[pr(St.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${pr(St.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof te?.gate_badge=="string"&&te.gate_badge.length>0?[te.gate_badge]:[],alert:Ct?Ct.failed===!0:!!St||Lt,reason:St&&Ct?.active!==!0?Yo(St.step):"PR \uB300\uAE30",merge_action:te?.tier==="merged"&&!Mt&&!Ft?!1:!be||Xe,merge_enabled:!Ut&&(Xe||te?.enabled===!0||Nt||Mt||Ft),merge_label:Xe?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ft||Mt?"\uC815\uB9AC \uC7AC\uAC1C":Nt&&!Mt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Xe?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ut?Ue.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ue.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ue.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Ft?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Mt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Nt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":te?.enabled===!0?`\uBA38\uC9C0 (${te.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${te?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:be&&!Xe,cancel_enabled:!Ye,continuation_mismatch:ct?.mismatch||null,discard:Ue,discard_action:Ue.action,discard_enabled:Ue.enabled,discard_title:Ue.title})}let pe=(k,L,re,de)=>{let te=k&&k.bead_id;if(typeof te!="string"||G.has(te))return null;G.add(te);let be=We[te],ct=An(H,te),Xe=ct.operation?ct:null,Ye={...lt(te),lane:L,workflow:X[te]||null,draggable:!Xe,discard:Xe||void 0,reason:wd(Qe,te),seq:re+1,queue_position:re+1,queue_index:re,queue_length:de,badges:be?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!be,revise_action:!!be,revise_enabled:!!be&&!Xe,revise_title:be?be.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${be.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(J,te)&&(Ye.blocked_by=Array.isArray(J[te])?J[te].filter(bt=>typeof bt=="string"&&bt.length>0):[]),Ye};for(let k=0;k<mt.length;k++){let L=pe(mt[k],"queue",k,mt.length);if(!L)continue;g.push(L);let re=D.get(ge);re?re.push(L):D.set(ge,[L])}let qe=k=>{let L=f.find(te=>te.id===k&&te.root_dir===ge);if(L)return{id:k,title:L.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let re=p.find(te=>te.id===k&&te.root_dir===ge),de=re&&re.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":re&&re.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:k,title:re?re.title:lt(k).title,badge:de}},S=[];for(let k=0;k<Math.max(gt,ot.length);k++){let L=`s${k+1}`,re=Ve.get(L),de=re&&Array.isArray(re.entries)?re.entries:[],te=[];for(let Xe=0;Xe<de.length;Xe++){let Ye=pe(de[Xe],L,Xe,de.length);Ye&&(te.push(Ye),g.push(Ye))}let be=At(ut[L]),ct=Array.isArray(be.occupied_by)?be.occupied_by.filter(Xe=>typeof Xe=="string"):[];te.length===0&&ct.length===0&&(gt<=1||k>=gt)||S.push({id:L,index:k,items:te,raw_length:de.length,occupied_by:ct,occupants:ct.map(Xe=>qe(Xe)),corrections:Array.isArray(be.corrections)?be.corrections.length:0,cycle:be.cycle===!0,...te.length===0&&ct.length===0?{empty:!0}:{}})}W.set(ge,S);let I=Array.from({length:gt},(k,L)=>{let re=`s${L+1}`,de=Ve.get(re),te=de&&Array.isArray(de.entries)?de.entries:[],be=At(ut[re]);return{id:re,index:te.length,length:te.length,occupied_by:Array.isArray(be.occupied_by)?be.occupied_by.filter(ct=>typeof ct=="string"):[]}});for(let k of Array.isArray(C.runnable)?C.runnable:[]){let L=k&&k.bead_id;if(typeof L!="string"||G.has(L))continue;G.add(L);let re=k.workflow&&typeof k.workflow=="object"?k.workflow:null,de=re&&typeof re.route=="string"&&re.route||(typeof k.route=="string"?k.route:null),te=mh(At(Le),k.exec_pins,de);Array.isArray(k.blocked_by)&&k.blocked_by.length>0&&N.set(L,k.blocked_by.filter(be=>typeof be=="string"&&be.length>0)),typeof k.title=="string"&&k.title.length>0&&U.set(L,k.title),re&&E.set(L,re),Array.isArray(k.scope)&&q.set(L,k.scope.filter(be=>typeof be=="string"&&be.length>0)),d.push({...lt(L),title:k.title||z[L]||L,lane:"runnable",draggable:!0,reason:wd(Qe,L),created_at:k.created_at??void 0,updated_at:k.updated_at??void 0,status:typeof k.status=="string"?k.status:void 0,labels:Array.isArray(k.labels)?k.labels:[],spec_id:typeof k.spec_id=="string"?k.spec_id:"",workflow:re||(de?{route:de,chips:{route:de}}:null),...te?{exec_chips:te}:{},blocked:k.blocked===!0,...Array.isArray(k.blocked_by)?{blocked_by:k.blocked_by.filter(be=>typeof be=="string"&&be.length>0)}:{},place_index:mt.length,place_lanes:I})}for(let k of He){let L=k&&k.bead_id;if(typeof L!="string"||G.has(L)||(G.add(L),o!==void 0&&typeof k.added_at=="number"&&k.added_at<o))continue;let re=fh(Be,L),de=re&&typeof re.done_kind=="string"?re.done_kind:null;w.push({...lt(L),lane:"done",done:!0,done_layout:"three_line",usage:un(Be,L),work_ms:qo(Be,L),done_at:typeof k.added_at=="number"?k.added_at:void 0,done_kind:de,badges:de&&vd[de]?[vd[de]]:[]})}}let R=new Map;s.forEach((C,ge)=>{C&&typeof C.root_dir=="string"&&R.set(C.root_dir,ge)});let Z=n&&n.running_sort==="repo"?"repo":"started";p.sort((C,ge)=>{let ke=C.kind==="session",Le=ge.kind==="session";if(ke!==Le)return ke?1:-1;if(ke&&Le){let z=Qo(ge.updated_at)-Qo(C.updated_at);return z!==0?z:C.id.localeCompare(ge.id)}if(Z==="repo"){let z=R.get(C.root_dir)??Number.MAX_SAFE_INTEGER,K=R.get(ge.root_dir)??Number.MAX_SAFE_INTEGER;if(z!==K)return z-K}let Me=typeof C.started_at=="number"&&Number.isFinite(C.started_at)?C.started_at:null,Be=typeof ge.started_at=="number"&&Number.isFinite(ge.started_at)?ge.started_at:null;return Me!==null&&Be!==null&&Me!==Be?Me-Be:Me===null&&Be!==null?1:Me!==null&&Be===null?-1:C.id.localeCompare(ge.id)}),w.sort((C,ge)=>(ge.done_at??0)-(C.done_at??0));let $e=s.length>0?s:r.map(C=>({root_dir:C&&C.root_dir,name:C&&C.name,auto_advance:C&&C.auto_advance,auto_merge:C&&C.auto_merge,slots:C&&C.slots,revision:C&&C.revision,runner_catalog:C&&C.runner_catalog})),ue=new Set(d.map(C=>C.root_dir)),me=[];for(let C of $e){if(!C||typeof C.root_dir!="string")continue;let ge=D.get(C.root_dir)||[],ke=W.get(C.root_dir)||[];!(ge.length>0||ke.some(Me=>Me.items.length>0||Me.occupied_by.length>0))&&!ue.has(C.root_dir)||me.push({root_dir:C.root_dir,name:C.name||C.root_dir,auto_advance:C.auto_advance===!0,auto_merge:C.auto_merge===!0,slots:typeof C.slots=="number"&&C.slots>=yd?C.slots:yd,revision:typeof C.revision=="number"?C.revision:0,runner_catalog:At(C.runner_catalog),items:ge,sublanes:{parallel:ge,serial:ke},serial_lane_count:V.get(C.root_dir)||0,raw_queue_length:Y.get(C.root_dir)||0})}let Q={runnable:d,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:i==="updated_flat",queue:g,queue_groups:me,running:p,pr_wait:f,done:w,chains:[],parallel_rows:[],chain_lanes:[],parallel_raw_length:Object.fromEntries(Y),owner_of:{},pending_lanes_kept:[]},Re=md(Q);for(let C of A)Re.has(C.id)||Re.set(C.id,{root_dir:C.root_dir,workspace_name:C.workspace_name,lane:"done",state:"done"});let we=new Map;for(let[C,ge]of N)for(let ke of ge){let Le=we.get(ke);Le?Le.includes(C)||Le.push(C):we.set(ke,[C])}for(let C of[...Q.queue,...Q.runnable]){if(!Object.hasOwn(C,"blocked_by"))continue;let ge=Re.get(C.id);C.blockers=(C.blocked_by||[]).map(ke=>gd(ke,ge,Re,s)),C.blocker_warnings=C.blockers.filter(ke=>ke.missing_internal).map(ke=>`\u26A0 \uC120\uD589 ${ke.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),C.blocker_warnings.length>0&&(C.alert=!0)}for(let C of[...Q.queue,...Q.runnable,...Q.running,...Q.pr_wait]){let ge=C.lane==="running"||C.lane==="pr_wait"?[]:(C.blockers||[]).map(gh),ke=[];for(let Be of we.get(C.id)||[]){let z=hh(Be,Re);z&&ke.push(z)}let Le=C.lane==="running"||C.lane==="pr_wait"?[]:C.blocker_warnings||[];if(ge.length===0&&ke.length===0&&Le.length===0)continue;let Me={predecessors:ge,successors:ke,warnings:Le};C.dependency_chips=Me}$h(Q,M,q,Re,s),Q.chains=yh(N,Re,s);let oe=hd(Q.queue_groups);for(let C of Q.queue_groups)for(let ge of C.sublanes.serial){let ke=oe.get(bd(C.root_dir,ge.id));ke&&(ge.cross_wait_peers=ke)}let ae=wh(Q.chains,Array.isArray(n?.pending_lanes)?n.pending_lanes:[],N,Re,s,U,E);Q.chain_lanes=ae.chain_lanes,Q.pending_lanes_kept=ae.pending_lanes_kept;let xe=new Map;for(let C of[...Q.running,...Q.queue,...Q.runnable])xe.has(C.id)||xe.set(C.id,C);let F=new Set;for(let C of Q.chain_lanes)for(let ge of C.rows){F.add(ge.id);let ke=xe.get(ge.id);ke&&(ke.overlap_chips&&(ge.overlap_chips=ke.overlap_chips),ke.scope_state&&(ge.scope_state=ke.scope_state))}let se=[];for(let C of D.values())for(let ge of C)F.has(ge.id)||se.push(ge);se.sort((C,ge)=>{let ke=C.workspace_name.localeCompare(ge.workspace_name);return ke!==0?ke:(C.queue_index??0)-(ge.queue_index??0)}),Q.parallel_rows=se;let ie={};for(let[C,ge]of Re)typeof ge.root_dir=="string"&&ge.root_dir.length>0&&(ie[C]=ge.root_dir);Q.owner_of=ie;let Ae=Q.runnable.length,Se=Q.runnable;a.show_blocked||(Se=Se.filter(C=>C.blocked!==!0));let Ie=Se.length;a.spec==="with"?Se=Se.filter(C=>!!C.spec_id):a.spec==="without"&&(Se=Se.filter(C=>!C.spec_id)),Q.runnable_hidden={blocked:Ae-Ie,spec:Ie-Se.length};let he=(C,ge)=>{let ke=Qo(ge.updated_at)-Qo(C.updated_at);return ke!==0?ke:C.id.localeCompare(ge.id)},_t=i==="repo_spec"?(C,ge)=>{let ke=C.spec_id?0:1,Le=ge.spec_id?0:1;return ke!==Le?ke-Le:he(C,ge)}:he;if(i==="updated_flat")Q.runnable=Se.slice().sort(he),Q.runnable_sections=[];else{let C=new Map;for(let Le of Se){let Me=C.get(Le.root_dir);Me?Me.push(Le):C.set(Le.root_dir,[Le])}let ge=[],ke=[];for(let Le of $e){if(!Le||typeof Le.root_dir!="string")continue;let Me=(C.get(Le.root_dir)||[]).slice().sort(_t);C.delete(Le.root_dir),Me.length!==0&&(ge.push({root_dir:Le.root_dir,name:Le.name||Le.root_dir,items:Me.map(Be=>({...Be,workspace_name:""}))}),ke.push(...Me))}for(let[Le,Me]of C){let Be=Me.slice().sort(_t);ge.push({root_dir:Le,name:Be[0]?.workspace_name||Le,items:Be.map(z=>({...z,workspace_name:""}))}),ke.push(...Be)}Q.runnable=ke,Q.runnable_sections=ge}return Q}var Ad="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Sd(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Ed(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Ld="bdui.monitor.done-range",Od="bdui.monitor.running_sort",Id="bdui.monitor.candidate_sort",Pd="beads-ui.monitor.candidate-filter",Md="beads-ui.monitor.sections";function xh(){try{let e=window.localStorage.getItem(Pd);if(!e)return{...Br};let t=JSON.parse(e);return!t||typeof t!="object"?{...Br}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Br.show_blocked,spec:Si.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Br}}}function Td(e){try{window.localStorage.setItem(Pd,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Ah(){try{let e=window.localStorage.getItem(Id);return Ts.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Sh(e){try{window.localStorage.setItem(Id,e)}catch{}}function Eh(){try{let e=window.localStorage.getItem(Md);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Cd(e){try{window.localStorage.setItem(Md,JSON.stringify(e))}catch{}}function Th(){try{let e=window.localStorage.getItem(Ld);return cn(e)?e:nn}catch{return nn}}function Ch(e){try{window.localStorage.setItem(Ld,e)}catch{}}function Rh(){try{return window.localStorage.getItem(Od)==="repo"?"repo":"started"}catch{return"started"}}function Lh(e){try{window.localStorage.setItem(Od,e)}catch{}}var Dd="tab:monitor:pipeline",Oh=1e3,Ih=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Rd="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Ph(e){return e>=1&&e<=Rd.length?Rd[e-1]:`(${e})`}function Nd(e,t){let n=Et("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),p=t.confirm||(b=>typeof globalThis.confirm!="function"||globalThis.confirm(b)),f=Th(),g=Rh(),w=xh(),A=Ah(),D=Eh(),W=null,V=null,Y=null,N=[],M=null;function q(){let b=Fn.find(h=>h.value===f);return b?b.label:""}let U=document.createElement("div");U.className="mon",e.appendChild(U);let E=document.createElement("div");E.className="mon2-drawer",e.appendChild(E);let R=Ei(null,null),Z=new Map,$e=new Map,ue=null,me=null,Q=null,Re=Ir(E,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{W=null,Ne()}});async function we(b,h,x,O,ee=!0){if(!o||!x)return null;let y=await o(b,{...h,root_dir:x,expected_revision:O});if(y&&y.conflict&&ee){y.queue&&$e.set(x,y.queue);let $=y.queue&&typeof y.queue.revision=="number"?y.queue.revision:O;y=await o(b,{...h,root_dir:x,expected_revision:$})}return y&&y.queue&&x&&$e.set(x,y.queue),y}function oe(b,h){let x=$e.get(b),O=s&&s.get?s.get():null,ee=(Array.isArray(O)?O:[]).find($=>$?.root_dir===b);return(x||ee)?.merge_queue?.find($=>$.bead_id===h)?.continuation_action}async function ae(b,h,x,O){let ee=await we(b,h,x,O),y=$e.get(x)?.revision??ee?.queue?.revision??O;return Tn(ee,($,le)=>we(b,{...h,continuation:$,decision_token:le},x,y,!1),{refresh:$=>we(b,h,x,$?.queue?.revision??$e.get(x)?.revision??y,!1)})}async function xe(b,h,x,O){let ee=await Tn({continuation_mismatch:O},($,le)=>we("worker-merge-queue-add",{bead_id:h,continuation:$,decision_token:le},b,x,!1)),y=ee?.queue?.merge_queue?.find($=>$.bead_id===h)?.continuation_action;ee?.applied!==!0&&y?.continuation===null&&y.mismatch&&await xe(b,h,ee.queue.revision,y.mismatch)}async function F(b,h,x){let O=await we("worker-discard",b,h,x);if(O&&O.discarded===!0){ce(jo(O),"success",5e3);return}if(O&&O.reason){ce(`\uD3D0\uAE30 \uC2E4\uD328: ${O.reason}`,"error");return}if(O&&O.accepted&&O.pending==="merged_revert"){ce("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(O&&O.accepted){ce(`\uD3D0\uAE30 \uC9C4\uD589: ${O.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}O&&!O.conflict&&ce("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function se(b,h,x){return!o||!x?null:await o(b,{...h,root_dir:x})}async function ie(){let b=new Map;for(let h of R.pr_wait)b.has(h.root_dir)||b.set(h.root_dir,h.expected_revision);for(let[h,x]of b)await we("worker-merge-queue-add-all",{},h,x)}function Ae(b){let h=D[b];return!!(h&&h.runnable===!0)}function Se(b){let h={...D[b]||{}};h.runnable=!h.runnable,D={...D,[b]:h},Cd(D),Ne()}function Ie(b){return D[b]===!0}function he(b){D={...D,[b]:D[b]!==!0},Cd(D),Ne()}function it(b){let h=R.queue_groups.find(x=>x.root_dir===b);if(!h)return null;for(let x=0;x<h.serial_lane_count;x+=1){let O=`s${x+1}`,ee=h.sublanes.serial.find(y=>y.id===O);if(!ee||ee.raw_length===0&&ee.occupied_by.length===0)return O}return null}function _t(b,h){let x=R.queue_groups.find(ee=>ee.root_dir===b),O=x?x.sublanes.serial.find(ee=>ee.id===h):void 0;return O?O.raw_length:0}function C(b,h){let x=Z.get(b),O=Z.get(h);if(!x||!O)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let ee=Sd(x),y=Sd(O);if(ee!==null&&ee===y&&x.root_dir===O.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let $=Ed(x),le=Ed(O);if($&&y!==null){let ye=y;return{kind:"ops",title:`${ye} \uB05D\uC5D0 ${b}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:O.root_dir,ops:[{bead_id:b,lane:ye,index:_t(O.root_dir,ye)}]}}if(ee!==null&&le&&y===null){let ye=ee;return{kind:"ops",title:`${ye} \uB05D\uC5D0 ${h}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:x.root_dir,ops:[{bead_id:h,lane:ye,index:_t(x.root_dir,ye)}]}}if($&&ee===null&&le&&y===null){let ye=it(x.root_dir);return ye===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${ye} \uB808\uC778\uC5D0 ${h} \u2192 ${b} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:x.root_dir,ops:[{bead_id:h,lane:ye,index:0},{bead_id:b,lane:ye,index:1}]}}return!$&&!le?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:$?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function ge(b,h){let x=C(b,h.id);return{id:h.id,title:h.title,location_label:h.location_label,prefixes:h.prefixes,action:x.kind==="note"?{kind:"note",text:x.text}:x.kind==="disabled"?{kind:"disabled",label:Ad,title:x.title}:{kind:"place",label:Ad,title:x.title}}}function ke(b,h){if(!Y||Y.bead_id!==b)return null;let x=Y.counterpart_id,O=x===null?h:h.filter(ee=>ee.id===x);return O.length===0?null:{rows:O.map(ee=>ge(b,ee))}}function Le(b){let h=b.dependency_chips||null,x=b.overlap_chips||[],O=b.scope_state==="missing";if(!h&&x.length===0&&!O)return null;let ee=ke(b.id,x);return{...h||{},...x.length>0?{overlaps:x}:{},...O?{scope_missing:!0}:{},...ee?{popover:ee}:{}}}function Me(b){let h=Le(b);return h?{...b,dependency_chips:h}:b}async function Be(b,h){let x=C(b,h);if(Y=null,x.kind!=="ops"){Ne();return}let O=de(x.root_dir,x.ops[0].bead_id);for(let ee of x.ops){let y=await z(ee,x.root_dir,O);if(y===null)break;O=y}Ne()}async function z(b,h,x){try{let O=await we("worker-queue-place",b,h,x,!1);if(O&&O.conflict)return ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!O||O.applied!==!0)return ce(O&&typeof O.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${O.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let ee=O.queue?O.queue.revision:void 0;return typeof ee!="number"?(ce("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):ee}catch(O){return ce(I(O),"error"),null}}function K(b){let h=Ae(b.root_dir);return l`<header class="mon2-sec__hd">
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
    </div>`}function Qe(b){if(V!==b.id)return null;let h=R.queue_groups.find(O=>O.root_dir===b.root_dir),x=b.place_lanes||[];return{bead_id:b.id,lanes:[{id:"parallel",label:"\uBCD1\uB82C",count:b.place_index??0},...R.chain_lanes.map((O,ee)=>({id:`lane:${ee}`,label:`\uC5F0\uACB0 ${ee+1} \uB05D\uC5D0`,count:O.rows.length})),{id:"new-lane",label:"\uC0C8 \uC5F0\uACB0 \uB808\uC778",count:0},...x.map(O=>({id:`serial:${O.id}`,label:`${h?h.name:""} \uC9C1\uB82C ${Number(O.id.slice(1))}`,count:O.length}))]}}function We(b){return De(b,pi(Me(b),Qe(b),{exec_chips_mode:"pinned_only"}))}function ve(){return R.runnable_flat?l`<div class="mon2-flat" data-drop="candidate">
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
      ${zn(Me(b))}
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
    </div>`}function H(){let b=Ie("parallel");return l`<section
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
            >${Ph(h.seq)}</span
          >`}
      ${h.workspace_name?l`<span class="worker-mini__repo" title=${h.root_dir}
            >${h.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${h.id}</span>
      ${qr(h.workflow)}
      <span class="mon2-crow__title">${h.title}</span>
      ${h.predecessors.map(O=>l`<span class="worker-dep worker-dep--pred"
            ><span class="worker-dep__label">← ${O}</span></span
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
      ${Nr(Le(h),{lane:Z.get(h.id)?.lane})}
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
    </div>`}function Pe(b,h,x){return l`<div
      class="mon2-item"
      data-bead-id=${h.id}
      data-drag-kind="repo-serial"
      data-root-dir=${h.root_dir}
      data-lane-id=${b.id}
      data-row-index=${x}
      data-queue-index=${String(h.queue_index??0)}
    >
      ${zn(Me(h))}
    </div>`}function tt(b){if(b.length===0)return"";let h=b.length-1;return`${b[0].id} \uC810\uC720${h>0?` +${h}`:""}`}function st(b){return l`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${b.id}
    >
      ${zn({id:b.id,title:b.title,lane:"running",draggable:!1,ghost:!0,badges:[b.badge]})}
    </div>`}function Je(b,h){return l`<div
      class="mon2-lane${h.empty?" mon2-lane--empty":""}"
      data-root-dir=${b.root_dir}
      data-lane-length=${String(h.raw_length)}
    >
      ${pn({id:"",lane:h.id,title:`${b.name} \xB7 \uC9C1\uB82C ${h.index+1}`,items:h.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:l`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${b.root_dir}
          data-lane-id=${h.id}
          data-lane-length=${String(h.raw_length)}
        >
          ${h.occupants.map(x=>st(x))}
          ${h.items.length>0?h.items.map((x,O)=>Pe(h,x,O)):h.occupants.length>0?"":l`<div class="worker-pane__empty">
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
    </div>`}function vt(){let b=Ie("serial"),h=R.chain_lanes.some(x=>x.pending&&x.rows.length===0);return l`<section
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
            ${R.chain_lanes.map(x=>X(x))}
            ${R.queue_groups.map(x=>x.sublanes.serial.map(O=>Je(x,O)))}
          </div>`}
    </section>`}function mt(){return l`<div class="mon2-wait">${H()}${vt()}</div>`}function ot(b){return l`<div class="worker-rungrid">
      ${R.running.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:R.running.map(h=>mi({bead_id:h.id,attempt_id:h.attempt_id||"",title:h.title,runner:h.runner??null,model:h.model??null,effort:h.effort??null,speed:h.speed??null,started_at:h.started_at??null,kind:h.kind,...h.kind==="session"?{updated_at:h.updated_at}:{},workflow:h.workflow||null,resumed_from:h.resumed_from??null,continuation_mode:h.continuation_mode??null,paused:h.run_state==="paused",failed:h.run_state==="failed",status:h.status,status_label:h.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:h.can_resume!==!1,can_pause:h.can_pause!==!1,exec_chips:h.exec_chips||null,usage:h.usage||null,discard:h.discard},b,W,{monitor:{repo:h.workspace_name,root_dir:h.root_dir,serial_lane_id:h.serial_lane_id,last_activity:h.last_activity||null,legs:h.legs||[],dependency_chips:Le(h)}}))}
    </div>`}function ut(b){let h={runnable:R.runnable,queue:R.queue,running:R.running,pr_wait:R.pr_wait,done:R.done};return l`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${Ih.map(x=>{let O=h[x.lane],ee=x.lane==="runnable"?R.runnable_flat?O.length>0?ve():void 0:R.runnable_sections.length>0?ve():void 0:x.lane==="queue"?R.queue_groups.length>0||R.chain_lanes.length>0||R.parallel_rows.length>0?mt():void 0:x.lane==="running"?ot(b):O.length>0?l`${O.map(y=>zn(y))}`:void 0;return pn({id:`monitor-${x.lane}`,lane:x.pane,title:x.lane==="done"?`\uC644\uB8CC\xB7${q()}`:x.title,items:O,empty:x.empty,body:ee,live:x.lane==="running"&&O.length>0,controls:x.lane==="runnable"?gt():void 0,header_control:Ve(x.lane,O.length)})})}
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
        ${Si.map(b=>l`<button
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
        ${Ts.map(x=>l`<option
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
        ${Fn.map(x=>l`<option value=${x.value} ?selected=${f===x.value}>
              ${x.label}
            </option>`)}
      </select>`:""}function Ne(){let b=s&&s.get?s.get():null,h=s&&s.getWorkspacesState?s.getWorkspacesState():[],x=d(),O=()=>Ei(b,h,{done_since:sr(f,x),running_sort:g,candidate_filter:w,candidate_sort:A,pending_lanes:N});R=O(),R.pending_lanes_kept.length!==N.length&&(N=R.pending_lanes_kept.map(ee=>N[ee]),R=O()),Z=new Map;for(let ee of[...R.runnable,...R.queue,...R.running,...R.pr_wait,...R.done])Z.has(ee.id)||Z.set(ee.id,ee);Ze(ut(x),U),wt()?.render(),He(),lt()}function He(){let b=new Map;for(let h of R.queue_groups)b.set(h.root_dir,h.auto_advance);for(let h of Array.from(U.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let x=h.closest(".mon2-item")?.getAttribute("data-root-dir")||"",O=b.get(x);typeof O=="boolean"&&h.setAttribute("title",`${h.textContent||""} \xB7 ${O?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function wt(){if(Q)return Q;let b=U.querySelector(".mon2-deck");return b?(Q=ld(b,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>R.done,rangeLabel:q,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:pe,onFocusChange:h=>{M=h,lt()}}),Q):null}function lt(){U.classList.toggle("has-focus",M!==null);for(let b of Array.from(U.querySelectorAll(".mon2-sec[data-root-dir]")))b.classList.toggle("is-focus",M!==null&&b.getAttribute("data-root-dir")===M);for(let b of Array.from(U.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let h=Z.get(b.getAttribute("data-bead-id")||"");b.classList.toggle("is-focus",M!==null&&!!h&&h.root_dir===M)}for(let b of Array.from(U.querySelectorAll(".mon2-crow[data-root-dir]")))b.classList.toggle("is-focus",M!==null&&b.getAttribute("data-root-dir")===M)}function G(b,h){let x=a?a():void 0;if(!h||!x||h===x||!i){r(b);return}i(h).then(()=>{r(b)}).catch(O=>{n("workspace switch for %s failed: %o",h,O)})}function pe(b){if(!b)return;let h=a?a():void 0,x=()=>{try{u?.gotoView("worker")}catch(O){n("gotoView(worker) failed: %o",O)}};if(!i||h&&h===b){x();return}i(b).then(x).catch(O=>{n("workspace switch for %s failed: %o",b,O),ce("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function qe(b){sn(b).then(h=>{ce(h?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",h?"success":"error",1400)})}function S(b){let h=Z.get(b)||null;return{item:h,root_dir:h?h.root_dir:"",revision:h?h.expected_revision:0}}function I(b){if(typeof b=="string"&&b.length>0)return b;if(b&&typeof b=="object"){let h=b;if(typeof h.message=="string"&&h.message.length>0)return h.message;if(typeof h.error=="string"&&h.error.length>0)return h.error;if(h.error&&typeof h.error=="object"&&typeof h.error.message=="string")return h.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function k(b,h,x){let{root_dir:O}=S(h);if(!(!h||!x||x===h))try{await se(b,{a:h,b:x},O)}catch(ee){ce(I(ee),"error")}}function L(){let b=new Map,h=s&&s.get?s.get():null,x=O=>Array.isArray(O)?O.filter(ee=>typeof ee=="string"&&ee.length>0):[];for(let O of Array.isArray(h)?h:[]){if(!O||typeof O!="object")continue;let ee=O.bead_blocked_by&&typeof O.bead_blocked_by=="object"?O.bead_blocked_by:{};for(let[y,$]of Object.entries(ee))Array.isArray($)&&b.set(y,x($));for(let y of[...Array.isArray(O.runnable)?O.runnable:[],...Array.isArray(O.session_active)?O.session_active:[]])y&&typeof y.bead_id=="string"&&Array.isArray(y.blocked_by)&&y.blocked_by.length>0&&b.set(y.bead_id,x(y.blocked_by))}return b}function re(){let b=new Map;for(let x of R.chain_lanes)b.set(x.lane_id,x.rows.map(O=>O.id));let h=new Map;for(let x of R.parallel_rows)typeof x.queue_index=="number"&&h.set(x.id,x.queue_index);for(let x of R.queue_groups)for(let O of x.sublanes.serial)for(let ee of O.items)typeof ee.queue_index=="number"&&h.set(ee.id,ee.queue_index);return{blocked_by_map:L(),owner_of:new Map(Object.entries(R.owner_of)),lane_order:b,parallel_rows:R.parallel_rows.map(x=>({bead_id:x.id,root_dir:x.root_dir,queue_index:x.queue_index??0})),parallel_raw_length:new Map(Object.entries(R.parallel_raw_length)),queue_index_of:h}}function de(b,h){let x=Z.get(h);if(x&&x.root_dir===b)return x.expected_revision;let O=R.queue_groups.find(ee=>ee.root_dir===b);return O?O.revision:0}async function te(b,h){try{if(b.type==="worker-queue-place"||b.type==="worker-queue-reorder"||b.type==="worker-queue-remove"){let x=await we(b.type,b.payload,b.root_dir,de(b.root_dir,h));return x&&x.conflict?(ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):x&&x.applied===!1?(ce(x.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${x.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0}return(b.type==="dep-add"||b.type==="dep-remove")&&await se(b.type,{a:b.a,b:b.b},b.root_dir),!0}catch(x){return ce(I(x),"error"),!1}}async function be(b,h){let x=cd(b,h,re());if("refused"in x){ce(x.refused,"error");return}if(h.kind==="chain"){let O=R.chain_lanes.find(y=>y.lane_id===h.lane_id),ee=O&&O.pending&&O.rows.length===0?Number(O.lane_id.slice(8)):-1;ee>=0&&N[ee]&&(N=N.map((y,$)=>$===ee?{seed:b.bead_id}:y))}for(let O of x.ops)if(!await te(O,b.bead_id))break;Ne()}async function ct(b,h){let x=Z.get(b);if(!x){Ne();return}let O={kind:"candidate",bead_id:b,root_dir:x.root_dir};if(h==="new-lane"){N.some(y=>y.seed===null)||(N=[...N,{seed:null}]),Ne();let ee=R.chain_lanes.find(y=>y.pending&&y.rows.length===0);if(!ee)return;await be(O,{kind:"chain",lane_id:ee.lane_id,marker_index:0});return}if(h.startsWith("lane:")){let ee=R.chain_lanes[Number(h.slice(5))];if(!ee){Ne();return}await be(O,{kind:"chain",lane_id:ee.lane_id,marker_index:ee.rows.length});return}if(h.startsWith("serial:")){let ee=h.slice(7),y=(x.place_lanes||[]).find($=>$.id===ee);await be(O,{kind:"repo-serial",root_dir:x.root_dir,lane_id:ee,index:y?y.index:0});return}await be(O,{kind:"parallel",marker_index:R.parallel_rows.length})}async function Xe(b,h){let x=R.parallel_rows,O=x.findIndex(Ke=>Ke.id===b);if(O<0)return;let ee=x[O].root_dir,y=[];x.forEach((Ke,Oe)=>{Ke.root_dir===ee&&y.push(Oe)});let $=y.indexOf(O),le=y[$+h];if(typeof le!="number")return;let ye=h===-1?le:y[$+2]??Math.min(x.length,le+1);await be({kind:"parallel",bead_id:b,root_dir:ee,queue_index:x[O].queue_index??0},{kind:"parallel",marker_index:ye})}async function Ye(b){for(let h of R.chain_lanes){let x=h.rows.find(O=>O.id===b);if(!(!x||!x.draggable)){await be({kind:"chain",bead_id:b,root_dir:x.root_dir,lane_id:h.lane_id,...typeof x.queue_index=="number"?{queue_index:x.queue_index}:{}},{kind:"parallel",marker_index:R.parallel_rows.length});return}}}let bt=null,St=!1,yt=null;function Ct(){yt!==null&&clearTimeout(yt),yt=setTimeout(()=>{yt=null,St=!1},0)}function zt(b,h){let x=h&&typeof h.closest=="function"?h.closest("[data-row-index]"):null;if(x&&b.contains(x)){let O=Number(x.getAttribute("data-row-index"));return Number.isFinite(O)?O:0}return b.querySelectorAll("[data-row-index]").length}function Nt(b){let h=b.target,x=typeof h?.closest=="function"?h.closest("[data-drop]"):null;if(!x||!bt)return null;let O=x.getAttribute("data-drop");if(O==="candidate")return{zone:x,target:{kind:"candidate"}};if(O==="parallel")return{zone:x,target:{kind:"parallel",marker_index:zt(x,h)}};if(O==="chain")return{zone:x,target:{kind:"chain",lane_id:x.getAttribute("data-lane-id")||"",marker_index:zt(x,h)}};if(O==="repo-serial"){let ee=x.getAttribute("data-root-dir")||"";if(ee!==bt.root_dir)return null;let y=typeof h?.closest=="function"?h.closest("[data-queue-index]"):null,$=y&&x.contains(y)?y.getAttribute("data-queue-index"):x.getAttribute("data-lane-length"),le=Number($);return{zone:x,target:{kind:"repo-serial",root_dir:ee,lane_id:x.getAttribute("data-lane-id")||"",index:Number.isFinite(le)?le:0}}}return null}function Mt(){for(let b of Array.from(U.querySelectorAll(".is-drop-over")))b.classList.remove("is-drop-over")}function Ft(b){let h=b.target,x=typeof h?.closest=="function"?h.closest('[draggable="true"][data-bead-id]'):null,O=x?x.closest("[data-drag-kind]"):null;if(!O)return;let ee=O.getAttribute("data-bead-id")||"",y=O.getAttribute("data-drag-kind")||"",$=O.getAttribute("data-root-dir")||"";if(!ee||!y||!$)return;let le=O.getAttribute("data-queue-index")||"",ye=Number(le),Ke=O.getAttribute("data-lane-id")||"";bt={kind:y,bead_id:ee,root_dir:$,...le!==""&&Number.isFinite(ye)?{queue_index:ye}:{},...Ke?{lane_id:Ke}:{}},St=!0,V=null,U.classList.add("is-dragging");try{b.dataTransfer?.setData("text/plain",ee),b.dataTransfer&&(b.dataTransfer.effectAllowed="move")}catch{}}function Lt(b){let h=Nt(b);h&&(b.preventDefault(),b.dataTransfer&&(b.dataTransfer.dropEffect="move"),h.zone.classList.add("is-drop-over"))}function Ue(b){let h=b.target;typeof h?.closest=="function"&&h.closest("[data-drop]")?.classList.remove("is-drop-over")}function Ut(){bt=null,Mt(),U.classList.remove("is-dragging"),Ct()}function Ht(b){let h=Nt(b),x=bt;bt=null,Mt(),U.classList.remove("is-dragging"),!(!h||!x)&&(b.preventDefault(),be(x,h.target))}function et(b){return{runner:b.runner||void 0,model:b.model||void 0,effort:b.effort||void 0,status:b.run_state==="running"?"running":b.run_state,worktree:b.root_dir}}function Wt(b,h){let{item:x,root_dir:O,revision:ee}=S(h),y=x?.attempt_id||"",$=b.classList;if($.contains("worker-dep__remove")){k("dep-remove",h,b.dataset.blockerId||"");return}if($.contains("mon2-rowops__up")||$.contains("mon2-rowops__down")){Xe(h,$.contains("mon2-rowops__up")?-1:1);return}if($.contains("mon2-rowops__remove")){we("worker-queue-remove",{bead_id:h},O,ee);return}if($.contains("mon2-crow__detach")){Ye(h);return}if($.contains("mon-overlap__chip")){let le=b.getAttribute("data-overlap-all")==="true"?null:b.getAttribute("data-overlap-id")||"";Y=!!Y&&Y.bead_id===h&&Y.counterpart_id===le?null:{bead_id:h,counterpart_id:le},Ne();return}if($.contains("mon-overlap__place")){Be(h,b.getAttribute("data-counterpart-id")||"");return}if($.contains("worker-card__place")){V=V===h?null:h,Ne();return}if($.contains("worker-card__place-cancel")){V=null,Ne();return}if($.contains("worker-card__place-lane")){let le=b.getAttribute("data-lane")||"parallel";V=null,ct(h,le);return}if($.contains("rtile__session")){W=y,y&&x&&Re.open({attempt_id:y,root_dir:O,meta:et(x)}),Ne();return}if($.contains("rtile__pause")){se("worker-attempt-pause",{attempt_id:y},O);return}if($.contains("rtile__resume")){Cr().then(le=>{if(le!==null)return ae("worker-attempt-resume",{attempt_id:y,...le!==""?{instructions:le}:{}},O,ee)});return}if($.contains("rtile__dismiss")){we("worker-attempt-dismiss",{attempt_id:y},O,ee);return}if($.contains("rtile__discard")){if(!p($s(h,"unmerged")))return;F({bead_id:h,...y?{attempt_id:y}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},O,ee);return}if($.contains("worker-mini__merge")){let le=oe(O,h);le?.mismatch&&le.continuation===null?xe(O,h,ee,le.mismatch):we("worker-merge-queue-add",{bead_id:h},O,ee);return}if($.contains("worker-mini__merge-cancel")){we("worker-merge-queue-remove",{bead_id:h},O,ee);return}if($.contains("worker-mini__discard")){let le=b.dataset.discardMode==="merged"?"merged":"unmerged";if(!p($s(h,le)))return;F({bead_id:h,...b.dataset.attemptId?{attempt_id:b.dataset.attemptId}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},O,ee);return}if($.contains("worker-mini__revise-fix")){ae("worker-revise-fix",{bead_id:h},O,ee);return}$.contains("worker-mini__revise-approve")&&we("worker-revise-approve",{bead_id:h},O,ee)}function Fe(b){let h=St;St=!1;let x=b.target;if(!x||typeof x.closest!="function"||x.closest("dialog")||x.closest(".mon2-drawer")||x.closest("a"))return;let O=x.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(O){b.preventDefault();let _=x.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||O.textContent?.trim()||"";_&&qe(_);return}let ee=x.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(ee){b.preventDefault();let c=ee.getAttribute("data-root-dir")||Z.get(x.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||ee.getAttribute("title")||"";pe(c);return}let y=x.closest(".mon2-sec__toggle");if(y){b.preventDefault(),Se(y.getAttribute("data-root-dir")||"");return}let $=x.closest(".mon2-area__toggle");if($){b.preventDefault(),he($.getAttribute("data-area")||"parallel");return}if(x.closest(".mon2-newlane")){b.preventDefault(),N=[...N,{seed:null}],Ne();return}if(x.closest(".mon-merge-all")){b.preventDefault(),ie();return}let le=x.closest(".mon-filter__spec");if(le){b.preventDefault(),w={...w,spec:le.getAttribute("data-spec")||"all"},Td(w),Ne();return}let ye=x.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!ye)return;let Ke=ye.getAttribute("data-bead-id")||"",Oe=x.closest("button");if(Oe){b.preventDefault(),Wt(Oe,Ke);return}Ke&&!h&&(b.preventDefault(),G(Ke,ye.getAttribute("data-root-dir")||S(Ke).root_dir))}function T(b){let h=b.target;if(!h||typeof h.closest!="function")return;let x=h.closest(".mon-filter__blocked");if(x){w={...w,show_blocked:x.checked},Td(w),Ne();return}let O=h.closest(".mon-candidate-sort");if(O){A=Ts.some($=>$.value===O.value)?O.value:"repo_spec",Sh(A),Ne();return}let ee=h.closest(".mon-running-sort");if(ee){g=ee.value==="repo"?"repo":"started",Lh(g),Ne();return}let y=h.closest(".mon-done-range");y&&(f=cn(y.value)?y.value:nn,Ch(f),Ne())}function fe(b){if(!Y)return;let h=b.target;h&&typeof h.closest=="function"&&h.closest(".mon-overlap__popover, .mon-overlap__chip")||(Y=null,Ne())}function Te(b){b.key!=="Escape"||!Y||(Y=null,Ne())}e.addEventListener("click",Fe),e.addEventListener("change",T),document.addEventListener("click",fe),document.addEventListener("keydown",Te),e.addEventListener("dragstart",Ft),e.addEventListener("dragover",Lt),e.addEventListener("dragleave",Ue),e.addEventListener("drop",Ht),e.addEventListener("dragend",Ut),s&&typeof s.subscribe=="function"&&(ue=s.subscribe(()=>{try{$e.clear(),Ne()}catch{}}));function at(){me!==null&&(clearInterval(me),me=null)}function Rt(){yt!==null&&(clearTimeout(yt),yt=null)}return{load(){n("load"),Ne(),me===null&&(me=setInterval(()=>{try{Ne()}catch{}},Oh))},pause(){at()},clear(){at(),Rt(),ue&&(ue(),ue=null),Re.destroy(),Q?.destroy(),Q=null,e.removeEventListener("click",Fe),e.removeEventListener("change",T),document.removeEventListener("click",fe),document.removeEventListener("keydown",Te),e.removeEventListener("dragstart",Ft),e.removeEventListener("dragover",Lt),e.removeEventListener("dragleave",Ue),e.removeEventListener("drop",Ht),e.removeEventListener("dragend",Ut),e.replaceChildren()}}}function qd(e,t,n){let r=Et("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(g){return w=>{w.preventDefault(),r("click tab %s",g),n.gotoView(g)}}function u(){let g=t.getState();return g.view==="worker"||g.view==="monitor"?g.view:"board"}function d(){let g=u();return l`
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
    `}function p(){let g=u();return l`
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
    `}function f(){s&&Ze(d(),s),o&&Ze(p(),o)}return f(),a=t.subscribe(()=>f()),{destroy(){a&&(a(),a=null),s&&Ze(l``,s),o&&Ze(l``,o)}}}var Fd=["bug","feature","task","epic","chore"];function jd(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Bd=["Critical","High","Medium","Low","Backlog"];function Ud(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),u=n.querySelector("#new-description"),d=n.querySelector("#new-issue-error"),p=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),g=n.querySelector(".new-issue__close");function w(){o.replaceChildren();let q=document.createElement("option");q.value="",q.textContent="\u2014 Select \u2014",o.appendChild(q);for(let U of Fd){let E=document.createElement("option");E.value=U,E.textContent=jd(U),o.appendChild(E)}a.replaceChildren();for(let U=0;U<=4;U+=1){let E=document.createElement("option");E.value=String(U);let R=Bd[U]||"Medium";E.textContent=`${U} \u2013 ${R}`,a.appendChild(E)}}w();function A(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function D(q){s.disabled=q,o.disabled=q,a.disabled=q,i.disabled=q,u.disabled=q,p.disabled=q,f.disabled=q,f.textContent=q?"Creating\u2026":"Create"}function W(){d.textContent=""}function V(q){d.textContent=q}function Y(){try{let q=window.localStorage.getItem("beads-ui.new.type");q?o.value=q:o.value="";let U=window.localStorage.getItem("beads-ui.new.priority");U&&/^\d$/.test(U)?a.value=U:a.value="2"}catch{o.value="",a.value="2"}}function N(){let q=o.value||"",U=a.value||"";q.length>0&&window.localStorage.setItem("beads-ui.new.type",q),U.length>0&&window.localStorage.setItem("beads-ui.new.priority",U)}async function M(){W();let q=String(s.value||"").trim();if(q.length===0){V("Title is required"),s.focus();return}let U=Number(a.value||"2");if(!(U>=0&&U<=4)){V("Priority must be 0..4"),a.focus();return}let E=String(o.value||""),R=String(u.value||""),Z={title:q};E.length>0&&(Z.type=E),String(U).length>0&&(Z.priority=U),R.length>0&&(Z.description=R),D(!0);try{await t("create-issue",Z)}catch{D(!1),V("Failed to create issue");return}N(),D(!1),A()}return n.addEventListener("cancel",q=>{q.preventDefault(),A()}),g.addEventListener("click",()=>A()),p.addEventListener("click",()=>A()),n.addEventListener("keydown",q=>{q.key==="Enter"&&(q.ctrlKey||q.metaKey)&&(q.preventDefault(),M())}),r.addEventListener("submit",q=>{q.preventDefault(),M()}),{open(){r.reset(),W(),Y();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){A()}}}var Mh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Dh(e,t){return $a(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Wd(e,t,n){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=Dh(r,e);return l`<button
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
  `}function zd(e,t,n){return l`
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
  `}function Hd(e,t){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Mh.map(([n,r])=>l`<label class="settings-dialog__toggle">
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
  `}var Nh=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Gd(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(Q=>ce(Q,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",u=!1,d="",p=null;function f(){if(p)return p;let Q=a.querySelector('[data-pane="execution"]');return Q?(p=Ho(Q,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Re=>t.queueStore?.set?.(Re)}),p):null}function g(){return l`
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
    `}function w(){let Q=r.get();return l`
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
        ${Q?l`
              ${Wd(Q,s(),V)}
              ${zd(Q,d,{onDraft:Re=>{d=Re},onAdd:Y,onRemove:N})}
              ${Hd(Q,M)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function A(Q){let Re=r.get();if(Re)try{let we=await n("display-policy-set",{expected_revision:Re.revision,policy:Q(Re)});D(we),we&&we.conflict&&we.policy&&(we=await n("display-policy-set",{expected_revision:we.policy.revision,policy:Q(we.policy)}),D(we)),we&&we.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function D(Q){Q&&Q.policy&&typeof Q.policy=="object"&&r.set(Q.policy)}function W(Q){A(Q)}function V(Q){let Re=r.get();if(!Re)return;let we=!qh(Q,Re);W(oe=>Fh(Q,oe,we))}function Y(){let Q=d.trim();Q.length!==0&&(d="",W(Re=>Re.hidden_prefixes.includes(Q)?{hidden_prefixes:Re.hidden_prefixes}:{hidden_prefixes:[...Re.hidden_prefixes,Q]}),q())}function N(Q){W(Re=>({hidden_prefixes:Re.hidden_prefixes.filter(we=>we!==Q)}))}function M(Q){let Re=r.get();if(!Re)return;let we=Re.chips[Q]===!1;W(()=>({chips:{[Q]:we}}))}function q(){Ze(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Nh.map(Q=>l`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${Q.id}
                  aria-selected=${String(i===Q.id)}
                  aria-controls=${`settings-pane-${Q.id}`}
                  @click=${()=>U(Q.id)}
                >
                  <span class="settings-dialog__glyph">${Q.glyph}</span>
                  ${Q.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${me}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${g()} ${w()}
          </div>
        </div>
      `,a),f()}function U(Q){i=Q,q()}let E=()=>{u=!1,t.onOpenChange?.(!1)};a.addEventListener("close",E),a.addEventListener("cancel",E);let R=Q=>{Q.target===a&&me()};a.addEventListener("click",R);let Z=null;r.subscribe&&(Z=r.subscribe(()=>{u&&q()}));let $e=null;t.implPresetStore?.subscribe&&($e=t.implPresetStore.subscribe(()=>{u&&p?.render()}));function ue(Q="execution"){u||(u=!0,t.onOpenChange?.(!0),i=Q,d="",q(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),f()?.load())}function me(){u&&(u=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:ue,close:me,sessionDraft:()=>p?.sessionDraft()??{},destroy(){u=!1,a.removeEventListener("close",E),a.removeEventListener("cancel",E),a.removeEventListener("click",R),Z&&(Z(),Z=null),$e&&($e(),$e=null),p?.destroy(),p=null,a.remove()}}}function qh(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Fh(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var jh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Vd="usage-meter-card",Bh="usage-meter-layer",Kd=600,Uh=["token_expired","relogin_required"];function Yd(e){return String(e).padStart(2,"0")}function Wh(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Zd(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Yd(r.getHours())}:${Yd(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${jh[r.getMonth()]} ${r.getDate()} ${o}`;return`${Wh(n,t)} \xB7 ${i}`}function zh(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Qd(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Xd(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Jd=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function tp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Hh(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:tp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Gh(e){if(!e||typeof e!="object")return null;let t=e,n=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=Hh(s);o&&n.push(o)}let r=t.available===!0&&Array.isArray(t.windows);return!r&&n.length===0?null:{available:r,windows:r?tp(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:n}}function ep(e,t){return`${e}:${t}`}function np(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,u=null;function d(){Ze(l``,e),e.hidden=!0,f()}function p(){if(u===null){let oe=e.ownerDocument;u=oe.createElement("div"),u.id=Bh,u.className="usage-meter__layer",oe.body.appendChild(u)}return u}function f(){u!==null&&(Ze(l``,u),u.remove(),u=null)}function g(oe){n!==oe&&(n===null&&(document.addEventListener("mousedown",A),document.addEventListener("keydown",W),window.addEventListener("resize",D)),n=oe)}function w(){n!==null&&(n=null,document.removeEventListener("mousedown",A),document.removeEventListener("keydown",W),window.removeEventListener("resize",D))}function A(oe){let ae=oe.target;ae&&(e.contains(ae)||u!==null&&u.contains(ae))||(w(),me())}function D(){me()}function W(oe){oe.key==="Escape"&&(w(),me())}function V(oe){n===oe?w():g(oe),me()}function Y(){w(),me()}async function N(oe,ae){if(r.has(oe.key))return;let xe=ep(oe.key,ae);r.set(oe.key,ae),a.delete(xe),me();let F=null;try{F=await(await fetch(oe.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ae})})).json()}catch{F=null}if(t)return;if(r.delete(oe.key),!F||F.ok!==!0){let ie=F&&typeof F.error=="string"&&F.error.length>0?F.error:"network_error";a.set(xe,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ie}`}),me();return}let se=Array.isArray(F.warnings)?F.warnings.filter(ie=>typeof ie=="string"&&ie.length>0):[];se.length>0&&a.set(xe,{kind:"warn",text:se.join(" \xB7 ")}),me(),await we()}function M(oe,ae,xe,F){let se=Xd(oe.pct),Ae=`resets ${Zd(oe.resetsAt,F)}${ae?` \xB7 ${xe}`:""}`;return l`<span
      class="usage-meter__window ${Qd(se)}"
      style=${`--progress: ${se}%`}
      title=${Ae}
    >
      <span class="usage-meter__label">${oe.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${se}%</span>
    </span>`}function q(oe,ae,xe){let F=ae.available&&typeof ae.ageSeconds=="number"&&ae.ageSeconds>Kd,se=F&&typeof ae.ageSeconds=="number"?`${Math.floor(ae.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",ie=ae.accounts.filter(he=>!he.active).length,Ae=`usage-meter__group${F?" usage-meter__group--stale":""}`,Se=l`<span class="usage-meter__provider"
        >${oe.label}</span
      >
      ${ae.available?ae.windows.map(he=>M(he,F,se,xe)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ie>0?l`<span class="usage-meter__badge">+${ie}</span>`:""}`;if(ae.accounts.length===0)return l`<span
        class=${Ae}
        aria-label=${`${oe.label} usage`}
        >${Se}</span
      >`;let Ie=n===oe.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${Ae}`}
      aria-label=${`${oe.label} usage`}
      aria-expanded=${Ie?"true":"false"}
      aria-controls=${Vd}
      @click=${()=>V(oe.key)}
    >
      ${Se}
    </button>`}function U(oe,ae){return l`<span class="usage-meter" aria-label="Usage">
      ${oe.map(xe=>q(xe.provider,xe.snapshot,ae))}
    </span>`}function E(oe,ae){let xe=Xd(oe.pct),F=Zd(oe.resetsAt,ae);return l`<span
      class="usage-meter__account-window ${Qd(xe)}"
      style=${`--progress: ${xe}%`}
    >
      <span class="usage-meter__account-key">${oe.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${xe}%</span>
      <span class="usage-meter__account-reset"
        >${F.length>0?`\u21BB ${F}`:""}</span
      >
    </span>`}function R(oe,ae){return Uh.includes(ae)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${oe.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function Z(oe,ae,xe){let F=ae.status==="ok",se=typeof ae.ageSeconds=="number"&&ae.ageSeconds>Kd,ie=a.get(ep(oe.key,ae.number)),Ae=r.get(oe.key),Se=Ae!==void 0,Ie=Ae===ae.number,he=["usage-meter__account"];return ae.active&&he.push("usage-meter__account--active"),F||he.push("usage-meter__account--unavailable"),se&&he.push("usage-meter__account--stale"),l`<div class=${he.join(" ")}>
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
              >${zh(ae.ageSeconds)}</span
            >`}
        ${ae.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Se}
              @click=${()=>{N(oe,ae.number)}}
            >
              ${Ie?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${F?l`<div class="usage-meter__account-windows">
            ${ae.windows.map(it=>E(it,xe))}
          </div>`:l`<div class="usage-meter__account-status">
            ${R(oe,ae.status)}
          </div>`}
      ${ie===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${ie.kind}"
          >
            ${ie.text}
          </div>`}
    </div>`}function $e(oe,ae,xe){let F=ae.accounts.filter(se=>se.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${oe.label} · 활성 ${F} / 전체
        ${ae.accounts.length}
      </h2>
      ${ae.accounts.map(se=>Z(oe,se,xe))}
    </section>`}function ue(oe,ae){return l`<div
      class="usage-meter__card"
      id=${Vd}
      role="dialog"
      aria-label=${`${oe.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${$e(oe.provider,oe.snapshot,ae)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function me(){let oe=[];for(let F of Jd){let se=o.get(F.key);se&&oe.push({provider:F,snapshot:se})}if(oe.length===0){w(),d();return}let ae=oe.find(F=>F.provider.key===n&&F.snapshot.accounts.length>0);ae||w();let xe=Date.now();Ze(U(oe,xe),e),e.hidden=!1,ae?Q(ae,xe):f()}function Q(oe,ae){let xe=p(),F=e.getBoundingClientRect(),se=e.ownerDocument.documentElement.clientWidth;xe.style.setProperty("--usage-meter-anchor-top",`${F.bottom}px`),xe.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,se-F.right)}px`),Ze(l`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${Y}
        ></div>
        ${ue(oe,ae)}`,xe)}async function Re(oe){try{let ae=await fetch(oe.endpoint);return ae.ok?Gh(await ae.json()):null}catch{return null}}async function we(){i+=1;let oe=i,ae=await Promise.all(Jd.map(async xe=>({provider:xe,snapshot:await Re(xe)})));if(!(t||oe!==i)){for(let xe of ae)xe.snapshot?o.set(xe.provider.key,xe.snapshot):o.delete(xe.provider.key);me()}}return d(),we(),s=setInterval(()=>{we()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),w(),d()}}}function rp(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Vh="worker-ineligible";function Ti(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function sp(e){return Ti(e).includes(Vh)}var Kh="worker-serial";function Ci(e){return Ti(e).includes(Kh)}function Ri(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Yh=new Set(["done","failed","orphaned","stopped","discarded"]),Zh={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Qh={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Xh={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Li(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Xh[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function op(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let u=new Map,d=new Map,p=!1,f=null,g=null,w=null,A=new Set,D=!1,W=0,V=null,Y=new Set;function N(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function M(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function q(){return o&&o()||""}async function U(){if(!s)return;let S=++W;D=!0,w=null,A.clear(),Ve();try{let I=await s("worker-parallel-analysis-targets",{root_dir:q()});if(S!==W||!Ne)return;let k=Array.isArray(I?.qualified)?I.qualified:[],L=Array.isArray(I?.excluded)?I.excluded:[];w={qualified:k,excluded:L};for(let re of k)re&&typeof re.id=="string"&&A.add(re.id)}catch{S===W&&Ne&&(w={qualified:[],excluded:[]},ce("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{S===W&&(D=!1,Ne&&Ve())}}function E(S){return Array.isArray(S.runs)?S.runs:[]}function R(){let S=N(),I=new Set;for(let k of Object.values(S.attempts||{})){let L=k;L&&typeof L.bead_id=="string"&&!Yh.has(L.status)&&I.add(L.bead_id)}for(let k of Array.isArray(S.pr_wait)?S.pr_wait:[])k&&typeof k.bead_id=="string"&&I.add(k.bead_id);for(let k of Object.values(S.discard_operations||{})){let L=k;L&&L.phase!=="done"&&typeof L.bead_id=="string"&&I.add(L.bead_id)}return I}function Z(S){return S.filter(I=>$e(I)===null)}function $e(S){let I=N();for(let k of Array.isArray(I.serial_lanes)?I.serial_lanes:[])if(Array.isArray(k?.entries)&&k.entries.some(L=>L.bead_id===S))return k.id;return(Array.isArray(I.queue)?I.queue:[]).some(k=>k.bead_id===S)?"parallel":null}function ue(S,I){let k=u.get(S);return k||[...I.order]}function me(S){if(S.length<2)return!1;let I=$e(S[0]);if(!I||I==="parallel")return!1;let k=N(),L=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).find(de=>de.id===I)?.entries.map(de=>de.bead_id);if(!Array.isArray(L))return!1;let re=S.map(de=>L.indexOf(de));return re.every(de=>de>=0)&&re.every((de,te)=>te===0||de>re[te-1])}function Q(){let S=N(),I=Array.isArray(S.serial_lanes)?S.serial_lanes:[],k=I.find(L=>Array.isArray(L.entries)&&L.entries.length===0);return k?k.id:I[0]?.id||"s1"}function Re(S){let I=N().bead_titles||{};return typeof I[S]=="string"?I[S]:S}async function we(S,I){if(!s||p)return null;p=!0,Ve();try{return await s(S,I)}finally{p=!1,Ve()}}async function oe(S){r?.setPending?.(!0);try{let I=await we("worker-parallel-analysis-start",{force:S,target_ids:Array.from(A)});I&&I.applied===!1&&I.reason&&(I.reason==="target_not_qualified"&&Array.isArray(I.detail)?ce(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${I.detail.join(", ")}`,"error",3200):ce(`\uBD84\uC11D \uC2E4\uD328: ${I.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function ae(){let S=M().job;!s||!S||await s("worker-parallel-analysis-cancel",{job_id:S.job_id})}async function xe(S){if(!(!s||Y.has(S))){Y.add(S),Ve();try{let I=await s("worker-parallel-analysis-prompt",{root_dir:q(),run_id:S});if(!Ne)return;if(I?.ok===!0&&typeof I.prompt=="string"){V={run_id:S,prompt:I.prompt};return}ce(I?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{Y.delete(S),Ve()}}}function F(){V=null,Ve()}async function se(){if(!V)return;let S=await sn(V.prompt);ce(S?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",S?"success":"error",1400)}function ie(S,I){a&&a(S,Li(I))}function Ae(){return N().runner_catalog}function Se(S){return Object.keys(Ae()?.runners?.[S]?.models||{})}function Ie(S){let I=Se(S),k=Ae()?.runners?.[S]?.default_model;return typeof k=="string"&&I.includes(k)?k:I[0]||""}function he(){let S=M().settings,I=f||S.runner||"claude",k=Se(I),L=f?Ie(I):S.model||k[0]||"",re=Ri(Ae(),I,L),de=S.effort||"",te=re.includes(de)?de:re[0]||"";return{runner:I,model:L,effort:te,models:k,efforts:re}}async function it(S){let I=M().settings,k=await we("worker-parallel-analysis-settings-update",{expected_revision:I.revision,runner:S.runner,model:S.model,effort:S.effort});(!k||k.applied!==!0)&&(f=null,Ve(),k&&k.reason&&ce(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${k.reason}`,"error",2800))}function _t(S){f=S,Ve();let I=he();it({runner:S,model:I.model,effort:I.effort})}function C(S){let I=he(),k=Ri(Ae(),I.runner,S);it({runner:I.runner,model:S,effort:k.includes(I.effort)?I.effort:k[0]||""})}function ge(S){let I=he();it({runner:I.runner,model:I.model,effort:S})}async function ke(S,I){if(!s||p)return;let k=ue(S,I),L=M();if(k.length<2||!L.last_good){ce("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let re=d.get(S)||Q(),de=()=>({snapshot_digest:L.last_good.identity_digest,group_index:S,lane:re,ordered_bead_ids:k,expected_revision:N().revision});p=!0,Ve();try{let te=await s("worker-parallel-analysis-submit",de());te&&te.queue&&n&&n.set(te.queue),te&&te.applied!==!0&&te.conflict===!0&&(te=await s("worker-parallel-analysis-submit",de()),te&&te.queue&&n&&n.set(te.queue)),te&&te.applied===!0?(u.delete(S),ce(`\uC9C1\uB82C \uB808\uC778 ${re}\uC5D0 ${k.length}\uAC1C \uBC30\uCE58`,"success")):ce(`\uC81C\uCD9C \uAC70\uBD80: ${te?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,Ve()}}function Le(S,I,k){u.set(S,ue(S,I).filter(L=>L!==k)),Ve()}function Me(S){u.delete(S),Ve()}function Be(S,I,k,L){let re=[...ue(S,I)],de=re.indexOf(k),te=de+L;de<0||te<0||te>=re.length||(re.splice(te,0,...re.splice(de,1)),u.set(S,re),Ve())}function z(){let S=M().settings,I=Object.keys(Ae()?.runners||{}),k=he();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${L=>_t(L.target.value)}
        >
          ${I.map(L=>l`<option
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
          @change=${L=>ge(L.target.value)}
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
      >`:S.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function De(S){return S.is_default===!0&&S.compatible===!1}function Qe(S){return!!(S.runner&&S.model&&S.effort)}function We(S){return Qe(S)&&S.compatible!==!1}function ve(S){let I=Math.max(0,Math.floor(S/1e3)),k=Math.floor(I/60),L=I%60;return`${k}:${String(L).padStart(2,"0")}`}function P(S){let I=S.job;if(I){let k=typeof I.started_at=="number"?I.started_at:0,L=`${I.runner||"?"}/${I.model||"?"}`,re=k?` \xB7 \uACBD\uACFC ${ve(Date.now()-k)}`:"",de=typeof I.session_id=="string"?I.session_id:"",te=E(S).find(be=>be.run_id===I.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${L} · effort ${I.effort||"?"}${re}</span
        >
        ${de?l`<code class="pa-session-id" title=${de}
              >${de.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>ie(I.job_id,te||I)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${te?.prompt_saved!==!0||Y.has(I.job_id)}
          @click=${()=>{xe(I.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return H()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function H(){return r?.isPending?.()===!0}function J(S){let I=!!S.job,k=We(S.settings),L=w!==null&&A.size===0,re=I||p||H()||D;return l`<div class="pa-meta">
      ${S.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(S.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${P(S)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!k||re||L}
        @click=${()=>{oe(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!k||re||L}
        @click=${()=>{oe(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!I}
        @click=${()=>{ae()}}
      >
        취소
      </button>
    </div>`}function X(S){return typeof S=="string"&&S.length>0?S:"\uBBF8\uBC30\uCE58"}function Pe(S,I){I?A.add(S):A.delete(S),Ve()}function tt(S){let I=Array.isArray(S.scope)?S.scope:[],k=Array.isArray(S.overlaps)?S.overlaps:[];return I.length===0&&k.length===0?l``:l`<span class="pa-target__signals">
      ${I.length>0?l`<details class="pa-target__scope" title=${I.join(`
`)}>
            <summary>scope ${I.length}</summary>
            <ul>
              ${I.map(L=>l`<li><code>${L}</code></li>`)}
            </ul>
          </details>`:""}
      ${k.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${k.join(", ")}`}
            >겹침 ${k.join(", ")}</span
          >`:""}
    </span>`}function st(){let S=w?.qualified||[],I=w?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${D?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${S.length} \xB7 \uC81C\uC678 ${I.length}`}</span
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
                      >${X(k.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:w&&S.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${w&&I.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${I.length}</summary>
            <ul class="pa-targets__list">
              ${I.map(k=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${k.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Zh[k.reason]||k.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${X(k.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function Je(S){let I=typeof S.session_id=="string"&&S.session_id.length>0,k=I?S.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${S.outcome}"
        >${Qh[S.outcome]||S.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(S.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${S.runner||"?"} / ${S.model||"?"} / ${S.effort||"?"}</span
      >
      ${I?l`<code class="pa-session-id" title=${k}
            >${k.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${S.outcome==="failure"&&S.reason?l`<span class="pa-run-row__reason">${S.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>ie(S.run_id,S)}
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
            ${S.map(I=>Je(I))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function mt(){return V?l`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${F}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${V.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{se()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${F}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${V.prompt}</pre
        >
      </section>
    </div>`:""}function ot(S,I){let k=ue(S,I),L=R(),re=k.filter(Ye=>L.has(Ye)),de=Z(k),te=me(k),be=Array.isArray(N().serial_lanes)?N().serial_lanes:[],ct=d.get(S)||Q(),Xe=I.eligible!==!0||k.length<2||re.length>0||de.length>0||te||p;return l`<section class="pa-group" data-group-index=${String(S)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${I.confidence}</span>
        ${I.categories.map(Ye=>l`<span class="pa-group__category">${Ye}</span>`)}
        ${te?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${I.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${de.length>0?l`<span class="pa-group__stale"
              >stale — ${de.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${I.reason}</p>
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
                @click=${()=>Be(S,I,Ye,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ye}
                ?disabled=${bt===k.length-1}
                aria-label=${`${Ye} \uC544\uB798\uB85C`}
                @click=${()=>Be(S,I,Ye,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ye}
                aria-label=${`${Ye} \uC81C\uC678`}
                @click=${()=>Le(S,I,Ye)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${I.evidence.map(Ye=>l`<li class="pa-evidence">
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
          @click=${()=>{ke(S,I)}}
        >
          제출
        </button>
      </footer>
    </section>`}function ut(S){let I=Array.isArray(S.issues)?S.issues:[],k=I.filter(re=>re.verdict==="parallel_ok").length,L=I.filter(re=>re.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${k}</span>
      <span>uncertain ${L}</span>
    </div>`}function gt(){let S=Ne&&!!M().job;if(S&&g===null){g=setInterval(()=>Ve(),1e3);return}!S&&g!==null&&(clearInterval(g),g=null)}function Ve(){let S=M();f&&S.settings.runner===f&&(f=null);let I=S.last_good?.result;gt(),Ze(l`
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
            ${z()} ${J(S)} ${st()}
            ${I?l`${I.groups.map((k,L)=>ot(L,k))}
                ${I.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${ut(I)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${vt(E(S))}
          </div>
        </div>
        ${mt()}
      `,i)}let Ne=!1,He=()=>{Ne=!1,V=null,W+=1,gt()},wt=S=>{S.target===S.currentTarget&&qe()};i.addEventListener("close",He),i.addEventListener("cancel",He),i.addEventListener("click",wt);let lt=null;n&&n.subscribe&&(lt=n.subscribe(()=>{Ne&&Ve()}));let G=null;r&&r.subscribe&&(G=r.subscribe(()=>{Ne&&Ve()}));function pe(){Ne||(Ne=!0,Ve(),U(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function qe(){Ne&&(Ne=!1,V=null,W+=1,gt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:pe,close:qe,destroy(){Ne=!1,g!==null&&(clearInterval(g),g=null),i.removeEventListener("close",He),i.removeEventListener("cancel",He),i.removeEventListener("click",wt),lt&&(lt(),lt=null),G&&(G(),G=null),i.remove()}}}function ap(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let u=i.scope.filter(d=>typeof d=="string"&&d.length>0);if(u.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:u})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let u=Vo(s[a].scope,s[i].scope);if(u.length===0)continue;let d=s[a].member,p=s[i].member;n.get(d.id)?.overlaps.push({id:p.id,title:p.title,location_label:p.location_label,prefixes:u}),n.get(p.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:u})}return n}function Oi(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=r.kind!=="running",u=s.kind!=="running";if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&u&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&u&&a===null){let d=Jh(n);return d===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${d} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:d,index:0},{bead_id:e,lane:d,index:1}]}}return!i&&!u?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function Jh(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var ip=new Set(["sh","bash","zsh","dash","ksh"]),lp=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function cp(e){let t=e.split("/");return t[t.length-1]||""}function eb(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=cp(n[0]);if(r!=="env")return ip.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&ip.has(cp(s))}function tb(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function nb(e){let t=[],n=0;lp.lastIndex=0;for(let r of e.matchAll(lp)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:tb(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function rb(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function up(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",u=0,d=null,p=!1;function f(q,U){return U?nb(q).map(E=>E.kind==="plain"?E.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${E.kind}"
            >${E.text}</span
          >`):q}function g(){if(!s)return l``;let q=o==="ready"&&eb(a),U=o==="ready"?a.split(`
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
    </div>`}function w(){Ze(g(),r)}async function A(){if(o!=="ready")return;let q=await sn(a);ce(q?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",q?"success":"error")}function D(q){q.key==="Escape"&&s&&(q.preventDefault(),N())}function W(){p||(document.addEventListener("keydown",D),p=!0)}function V(){p&&(document.removeEventListener("keydown",D),p=!1)}async function Y(q,U=null){let E=++u;W(),s={...q},d=U||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",w(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let Z=t?t():"";if(!Z){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",w();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",w();return}let $e="/api/repo-ops-script?workspace="+encodeURIComponent(Z)+"&lane="+encodeURIComponent(q.lane)+"&base_sha="+encodeURIComponent(q.base_sha);try{let ue=await n($e),me=await ue.json().catch(()=>({}));if(E!==u)return;if((t?t():"")!==Z){N();return}if(!ue.ok||!me||me.ok!==!0){o="error",i=rb(me&&typeof me.error=="string"?me.error:""),w();return}s={lane:me.lane,base_sha:me.base_sha,path:me.path,base_ref:me.base_ref},a=String(me.content),o="ready",w()}catch{if(E!==u)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",w()}}function N(){u+=1,V(),s=null,a="",w();let q=d;d=null,q?.isConnected&&q.focus()}function M(){N(),r.remove()}return{open:Y,close:N,destroy:M}}function dp(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let E=o();return typeof E.revision=="number"?E.revision:0}function i(E){t&&E&&E.queue&&typeof E.queue=="object"&&t.set(E.queue)}function u(){let E=o().workspace_info;return E&&typeof E=="object"?E:{}}function d(E,R){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${E}"
      >${R}</span
    >`}function p(E){if(typeof E!="number"||!Number.isFinite(E))return"";let R=E/6e4;return Number.isInteger(R)?`timeout ${R}\uBD84`:`timeout ${Math.round(E/1e3)}\uCD08`}function f(E){let R=p(E);return R?d("config",R):""}function g(E,R,Z){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${Z.script}
      @click=${$e=>{s&&s({lane:E,base_sha:R.base_sha,path:Z.script,base_ref:R.base_ref},$e.currentTarget)}}
    ></button>`}function w(){let E=o().repo_ops_opt_out;return{verify:E?.verify===!0,deploy:E?.deploy===!0}}function A(E,R){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!R}
        @change=${Z=>{Y(E,!Z.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function D(E){let R=typeof E.base_sha=="string"?E.base_sha:"",Z=`${E.source_path||"repo-ops/config.toml"} @ ${E.base_ref||"?"}${R?`@${R.slice(0,7)}`:""}`,$e=w(),ue=!!E.verify&&$e.verify,me=!!E.deploy&&$e.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${Z}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ue?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${E.verify?l`${g("verify",E,E.verify)}
              ${f(E.verify.timeout_ms)}
              ${ue?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ue?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":E.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${E.verify?A("verify",$e.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${me?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${E.deploy?l`${g("deploy",E,E.deploy)}
              ${f(E.deploy.timeout_ms)}
              ${me?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${me?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":E.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${E.deploy?A("deploy",$e.deploy):""}
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
    </section>`}async function V(E){if(!n)return;let R=await n("worker-auto-repair-toggle",{on:E,expected_revision:a()});if(i(R),R&&R.conflict){let Z=await n("worker-auto-repair-toggle",{on:E,expected_revision:a()});i(Z)}r()}async function Y(E,R){if(!n)return;let Z=await n("worker-repo-ops-opt-out-toggle",{kind:E,opted_out:R,expected_revision:a()});if(i(Z),Z&&Z.conflict){let $e=await n("worker-repo-ops-opt-out-toggle",{kind:E,opted_out:R,expected_revision:a()});i($e)}r()}let N={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function M(E,R,Z){return l`<div class="worker-repo-ops__policy-group" data-policy=${Z}>
      <div class="worker-repo-ops__policy-label">${E}</div>
      <ul class="worker-repo-ops__policy-list">
        ${R.map($e=>l`<li data-token=${$e}>
              ${N[$e]||$e}
            </li>`)}
      </ul>
    </div>`}function q(E){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${E.map(R=>{let Z=[N[R.trigger]||R.trigger];return Number.isInteger(R.attempts_per_operation_attempt)?Z.push(`operation\uB2F9 ${R.attempts_per_operation_attempt}\uD68C`):Number.isInteger(R.attempts)?Z.push(`${N[R.budget]||R.budget} ${R.attempts}\uD68C`):Number.isInteger(R.sessions_per_user_action)&&Z.push(`${R.sessions_per_user_action}\uD68C`,N[R.user_actions]||R.user_actions),R.applies_when&&Z.push(N[R.applies_when]||R.applies_when),l`<li data-token=${R.id}>
            <strong>${N[R.id]||R.id}</strong>
            <span>${Z.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function U(){let E=o(),R=E.auto_repair!==!1,Z=E.repo_operation_policy&&typeof E.repo_operation_policy=="object"?E.repo_operation_policy:null,$e=Array.isArray(E.repo_operations)?E.repo_operations:[],ue=$e.find(we=>we.state==="repairing"),me=$e.filter(we=>we.state==="failed"||we.state==="repairing"),Q=me.length?Math.min(...me.map(we=>typeof we.repair?.remaining=="number"?we.repair.remaining:0)):Z?.auto_repair?.resolution_ladder?.find(we=>we.id==="auto_repair_session")?.attempts??1,Re=Array.isArray(Z?.auto_repair?.resolution_ladder)?Z.auto_repair.resolution_ladder:[];return l`<section
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
          @change=${we=>{V(we.target.checked)}}
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
          >남은 자동 해결 ${Q}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${ue?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${ue.repair?.owner_bead||ue.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${Z?l`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(Z.worker_automatic||[]).length} · 해결 사다리
                ${Re.length} · 금지
                ${(Z.never_automatic||[]).length}</span
              >
            </summary>
            ${M("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",Z.worker_automatic||[],"worker-automatic")}
            ${Z.supported===!1||Z.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${Z.schema_version})`}
                </div>`:q(Re)}
            ${M("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",Z.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${W(u())} ${U()}
      </details>`}}}var mp=20,sb=5,ob=new Set(["failed","repairing","running","queued","retry_pending"]),pp={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},fp={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function ab(e,t,n=mp){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function ib(e){if(e.type==="cleanup")return!0;let t=e.operation;return ob.has(t.state)&&!t.dismissed&&!t.superseded_by}function lb(e,t,n={}){let r=ab(e,t,1/0),s=n.expanded===!0?mp:sb,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||ib(i));return{visible:a,hidden:r.length-a.length}}function _p(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function cb(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function gp(e){let t=e.filter(n=>n.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>l`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function hp(e,t="",n=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function ub(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(fp,r)?fp[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function db(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return l`<li
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
      ><span class="worker-ev__dot worker-ev__dot--${_p(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(pp,t.kind)?pp[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${No(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${ks(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${_p(e)}"
          >${cb(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?hp(Qu(t.failure_kind,r)):""}
      ${ub(t)}
      ${gp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${No(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function pb(e){let t=e.cleanup,n=pr(t.step);return l`<li
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
        ${fd(t.step).map(r=>l`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${hp(Uo(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${gp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function fb(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?pb(r):db(r))}
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
  </section>`}function bp(e,t={}){let n=null;function r(){if(n===null){Ze(l``,e);return}let a=lb(n.operations,n.cleanup_failures,{expanded:n.expanded});Ze(fb({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var _b=Et("views:worker"),mb="tab:worker:ready",gb="tab:worker:blocked",hb="tab:worker:in-progress",bb="tab:worker:resolved",yb="tab:worker:closed",Xo=1,yp=5;function vp(e){return Ao(e).path.length>0}var vb=new Set(["quick_fix","spec_backed","full_plan"]);function wp(e){return typeof e=="string"&&vb.has(e)}var Ap="beads-ui.worker.candidate-filter",Ii={show_blocked:!1,spec:"all"};function wb(){try{let e=window.localStorage.getItem(Ap);if(!e)return{...Ii};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Ii};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Ii}}}function kb(e){try{window.localStorage.setItem(Ap,JSON.stringify(e))}catch{}}function $b(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let u=n(i),d=r(i);u&&d?s.push(i):!u&&d?o+=1:u&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var xb=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Sp="bdui.worker.candidate_sort",Ab=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Jo="spec";function Sb(){try{let e=window.localStorage.getItem(Sp);return e==="board"||e==="created"||e==="spec"?e:Jo}catch{return Jo}}function Eb(e){try{window.localStorage.setItem(Sp,e)}catch{}}var Ep="bdui.worker.done-range";function Tb(){try{let e=window.localStorage.getItem(Ep);return cn(e)?e:nn}catch{return nn}}function Cb(e){try{window.localStorage.setItem(Ep,e)}catch{}}var Rb="(max-width: 640px)",Tp="beads-ui.worker.lane-collapsed",Cs={queue:!0,done:!0};function Lb(){try{let e=window.localStorage.getItem(Tp);if(!e)return{...Cs};let t=JSON.parse(e);return!t||typeof t!="object"?{...Cs}:{queue:typeof t.queue=="boolean"?t.queue:Cs.queue,done:typeof t.done=="boolean"?t.done:Cs.done}}catch{return{...Cs}}}function Ob(e){try{window.localStorage.setItem(Tp,JSON.stringify(e))}catch{}}function kp(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Ib(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(ar):(r.sort(Ys(n)),t==="board"?r:[...r.filter(vp),...r.filter(s=>!vp(s))])}function Pb(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Mb(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function $p(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Db(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function Nb(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function qb(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Fb(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function jb(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Pi(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Bb(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,n=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,r=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=r&&typeof r.pr_number=="number"?r.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${n}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),r&&typeof r.bead_id=="string"&&a.push(`repair ${r.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:r&&typeof r.pr_url=="string"?r.pr_url:"",repair_pr_number:s}}function xp(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Ub(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.head_review&&e.head_review.state!=="failed")return n("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(xp(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${xp(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=Db(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${$p(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${$p(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Wb(e,t,n,r,s=null,o=null,a=null,i=!1,u=null,d=!0,p=null,f=null,g=null,w={},A=!1,D=!1,W={}){let V=!!u&&u.position>0,Y=!!u?.continuation_action&&u.continuation_action.continuation===null,N=!!u&&u.active===!0,M=u&&u.failure||null,q=qb(u?u.waiting:null,g),U=n[e]||null,E=U&&U.gate?U.gate:null,R=U&&U.pr?U.pr:null,Z=Bb(g),$e=Fb(u?u.resolution:null),ue=jb(u?u.head_review:null),me=u&&u.head_review||null,Q=u&&u.authority||null,Re=!!me&&["pending","reviewing","revising"].includes(me.state),we=V&&!N&&(me?.state==="failed"||!Q||Q.source==="automatic"&&!D),oe=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":$e?$e.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":q,ae=!!E&&E.base_badge==="\uCDA9\uB3CC",xe=!!E&&E.enabled===!0,F=Es({bead_id:e,merge_sha:W.merge_sha,cleanup_cursor:W.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:W.repo_operations}),se=Zo(F),ie=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!E&&E.tier==="merged",Ae=i&&!!r&&!!E&&E.tier==="merged",Se=we&&(xe||ae||E?.reason==="base_behind"||E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"||ie||Ae),Ie=i&&ae&&d===!1,he=An(w,e,{external:i,merge_active:N||F?.step==="merge",merge_queued:V,conflict_active:!!a,cleanup_active:se,merged:!!r||E?.tier==="merged"}),it=!!he.operation,_t=!ie&&!!r&&r.step==="repo_operations",C=Ub({continuation_required:Y,merge_step:F,conflict_badge:oe,conflict_live:$e?.live===!0||a==="running",head_review:me&&ue?{...ue,state:me.state,failure_reason:me.failure_reason}:null,recovery:Z,cleanup_failed:r,cleanup_label:r?pr(r.step):null,base_exception:f,conflicting:ae,gate:E,receipt_check:U&&U.receipt_check?U.receipt_check:null,queue_failure:M,auto_skip:p,queued:V,queue_active:N,queue_position:u?u.position:0,activity:oe?null:o&&o.activity||null}),ge=C?.live===!0&&C.title?l`<span title=${C.title}>${C.label}</span>`:C?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:r&&F?.active!==!0?Yo(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:A,external:i,pr_number:R&&typeof R.number=="number"?R.number:null,pr_url:R&&typeof R.url=="string"?R.url:"",completion_badge:C?.live!==!0&&C?.title?C.label:null,completion_title:C?.title||"",completion_repair_pr_url:Z?Z.repair_pr_url:"",completion_repair_pr_number:Z?Z.repair_pr_number:null,badges:ge?[ge]:[],live_badge:C?.live===!0?ge:null,usage:s,alert:C?.alert===!0,merge_action:E?.tier==="merged"&&!ie&&!Ae||_t?!1:!V||Y||we,timeline_action:_t,cancel_action:V&&!Y,cancel_enabled:(!N||Re)&&!(Z&&Z.lock_actions),cancel_title:Z&&Z.lock_actions?`${Z.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:N&&!Re?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Re?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:he,discard_action:he.action,merge_step:F,discard_enabled:he.enabled,discard_title:he.title,merge_enabled:!F&&!a&&!it&&!f&&!(Z&&Z.lock_actions)&&!Ie&&!_t&&(xe||ae||E?.reason==="base_behind"||E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"||ie||Ae||Se),merge_label:Y?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ie||Ae?"\uC815\uB9AC \uC7AC\uAC1C":ae&&!F&&!ie?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":E?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":we?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:it?he.error?`\uD3D0\uAE30 \uC2E4\uD328: ${he.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${he.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Y?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":F?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${F.label}`:Ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ie?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ie?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ae?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":xe?`\uBA38\uC9C0 (${E.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:E&&E.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${E&&E.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Mi(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:u,getWorkspacePath:d,doneRange:p,onDoneRangeChange:f}=t,g=r?Qs(r,i):null,w=to({transport:n,uiOrderStore:i}),A=null,D=[],W=wb(),V=null,Y=null,N={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},M=Sb(),q=cn(p)?p:Tb(),U=new Map;function E(){let c=Fn.find(_=>_.value===q);return c?c.label:"\uC624\uB298"}let R=Lb(),Z=!1,$e=new Set,ue=new Set,me=new Set,Q=new Set,Re=new Set,we={},oe=null,ae=0,xe=null,F=[];function se(c){return oe===c?we:{}}async function ie(){if(!n)return;let c=d?.()||"";if(oe===c||xe&&xe.key===c&&xe.generation===ae)return;let _=++ae;xe={key:c,generation:_};let v=null;try{v=await Promise.resolve(n("get-session-defaults",{}))}catch(B){if(_!==ae)return;xe=null,_b("get-session-defaults failed: %o",B),Ue();return}_===ae&&(we=v&&typeof v.values=="object"&&v.values!==null?{...v.values}:{},oe=c,xe=null,Ue())}function Ae(){oe=null,ae+=1,ie()}let Se=document.createElement("div");Se.className="worker-console";let Ie=document.createElement("div");Ie.className="worker-top";let he=document.createElement("div");he.className="worker-drawer-overlay",he.hidden=!0;let it=document.createElement("div");it.className="worker-drawer-overlay__backdrop";let _t=document.createElement("div");_t.className="worker-drawer-host";let C=document.createElement("div");C.className="worker-drawer-host",C.hidden=!0,he.append(it,_t,C);let ge=document.createElement("div");ge.className="worker-lanes-host",Se.append(Ie,he,ge),e.appendChild(Se);let ke=null,Le=null,Me=Ir(_t,{transport:n,sessionLogStore:a,onClose:()=>{ke=null,Le=null,he.hidden=!0,Ue()}}),Be=bp(C,{onClose:()=>{C.hidden=!0,he.hidden=!0,Ue()}}),z=up({getWorkspacePath:d||(()=>"")}),K=d&&d()||"",De=dp({queueStore:s,transport:n,onChanged:()=>Ue(),onOpenScript:(c,_)=>{z.open(c,_)}}),Qe=o?op(Se,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:d,onOpenTranscript:(c,_)=>$(c,_)}):null;function We(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Xo,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ve(){let c=We(),_=typeof c.serial_lane_count=="number"&&Number.isInteger(c.serial_lane_count)&&c.serial_lane_count>0?Math.min(c.serial_lane_count,5):0,v=Array.isArray(c.serial_lanes)?c.serial_lanes:[],B=[];for(let Ce of v){if(B.length>=_)break;!Ce||typeof Ce.id!="string"||!/^s[1-5]$/.test(Ce.id)||!Array.isArray(Ce.entries)||B.push({id:Ce.id,label:`\uC9C1\uB82C ${Ce.id.slice(1)}`,count:Ce.entries.length})}return B.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(c.queue)?c.queue:[]).length},...B]}function P(c){if(!V||!c.some(v=>v.id===V))return null;let _=ve();return _?{bead_id:V,lanes:_}:null}function H(){let c=We();return typeof c.revision=="number"?c.revision:0}function J(c){c&&c.queue&&s&&s.set(c.queue)}function X(){let c=We().queue;return Array.isArray(c)?c.length:0}async function Pe(c,_,v){if(!n)return;let B=()=>({bead_id:c,..._==="parallel"?{}:{lane:_},...v===void 0?{}:{index:v},expected_revision:H()}),_e=await n("worker-queue-place",B());J(_e),_e&&_e.conflict&&await n("worker-queue-place",B()).then(J)}async function tt(c,_,v){if(!n)return;let B=()=>({bead_id:c,..._==="parallel"?{}:{lane:_},to_index:v,expected_revision:H()}),_e=await n("worker-queue-reorder",B());J(_e),_e&&_e.conflict&&await n("worker-queue-reorder",B()).then(J)}async function st(c){if(!n)return;let _=await n("worker-queue-remove",{bead_id:c,expected_revision:H()});J(_),_&&_.conflict&&await n("worker-queue-remove",{bead_id:c,expected_revision:H()}).then(J)}async function Je(c){if(!n||!c)return;let _=await n("worker-attempt-pause",{attempt_id:c});_&&_.paused===!1&&_.reason&&ce(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function vt(c){if(!n||!c)return;let _=await Cr();if(_===null)return;let v=async(_e={})=>await n("worker-attempt-resume",{attempt_id:c,expected_revision:H(),..._!==""?{instructions:_}:{},..._e}),B=await v();J(B),B&&B.conflict&&(B=await v(),J(B)),B=await Tn(B,(_e,Ce)=>v({continuation:_e,decision_token:Ce}),{onResult:J,refresh:()=>v()}),B&&B.resumed===!1&&!B.conflict&&B.reason&&ce(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${B.reason}`,"error",2400)}async function mt(c){if(!n||!c)return;let _=await n("worker-attempt-dismiss",{attempt_id:c,expected_revision:H()});J(_),_&&_.conflict&&(_=await n("worker-attempt-dismiss",{attempt_id:c,expected_revision:H()}),J(_)),_&&_.dismissed===!1&&!_.conflict&&_.reason&&ce(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function ot(c,_,v=!0){if(!n)return null;let B=n,_e=await B(c,{..._,expected_revision:H()});return J(_e),_e&&_e.conflict&&v&&(_e=await B(c,{..._,expected_revision:H()}),J(_e)),_e}async function ut(c){if(!n||!c)return;let _=We().merge_queue?.find(B=>B.bead_id===c)?.continuation_action;if(_?.mismatch&&_.continuation===null){await Ve(c,_.mismatch);return}$e.add(c),Ue();let v;try{v=await ot("worker-merge-queue-add",{bead_id:c})}catch{ce("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{$e.delete(c),Ue()}if(!(!v||v.applied)){if(v.conflict){ce("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ce(Nb(v.reason),"error",2400)}}async function gt(c){if(!(!n||!c||ue.has(c))){ue.add(c),Ue();try{let _=await n("worker-cleanup-retry",{bead_id:c,expected_revision:H()});J(_),_&&!_.retried&&!_.conflict&&_.reason&&ce(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${_.reason}`,"error",2400)}finally{ue.delete(c),Ue()}}}async function Ve(c,_){let v=await Tn({continuation_mismatch:_},(_e,Ce)=>ot("worker-merge-queue-add",{bead_id:c,continuation:_e,decision_token:Ce},!1)),B=v?.queue?.merge_queue?.find(_e=>_e.bead_id===c)?.continuation_action;if(v?.applied!==!0&&B?.continuation===null&&B.mismatch){await Ve(c,B.mismatch);return}v&&v.applied===!1&&!v.conflict&&ce("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ne(c){if(!n)return;let _=await ot("worker-merge-auto-toggle",{on:c});!_||_.conflict||ce(c?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",c?"success":"info",2400)}async function He(c){if(!n||!c)return;let _=await ot("worker-merge-queue-remove",{bead_id:c});_&&!_.conflict&&!_.applied&&_.reason==="merge_active"&&ce("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function wt(){await ot("worker-merge-queue-remove",{all:!0})}async function lt(c,_=null,v="unmerged",B=null){if(!n||!c)return;let _e=$s(c,v);if(!(!!B||typeof globalThis.confirm!="function"||globalThis.confirm(_e)))return;let Ee=await n("worker-discard",{bead_id:c,..._?{attempt_id:_}:{},...B?{operation_id:B}:{},expected_revision:H()});if(J(Ee),Ee&&Ee.conflict&&(Ee=await n("worker-discard",{bead_id:c,..._?{attempt_id:_}:{},...B?{operation_id:B}:{},expected_revision:H()}),J(Ee)),Ee&&Ee.discarded===!0){ce(jo(Ee),"success",5e3);return}if(Ee&&Ee.reason){ce(`\uD3D0\uAE30 \uC2E4\uD328: ${Ee.reason}`,"error",2800);return}if(Ee&&Ee.accepted&&Ee.pending==="merged_revert"){ce("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ee&&Ee.accepted&&!Ee.discarded){ce(`\uD3D0\uAE30 \uC9C4\uD589: ${Ee.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ee&&!Ee.conflict&&ce("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function G(c,_,v){if(!(!n||!_||!v||Q.has(_))){Q.add(_),Ue();try{let B=await n(c,{bead_id:_,action_id:v,expected_revision:H()});J(B),B?.conflict?ce("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!B?.ok&&B?.reason&&ce(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(B.reason)}`,"error",2800)}finally{Q.delete(_),Ue()}}}async function pe(c,_){if(!n||!_||me.has(_))return;me.add(_),Ue();let v;try{let B=async(_e={})=>await n(c,{bead_id:_,expected_revision:H(),..._e});v=await B(),J(v),v&&v.conflict&&(v=await n(c,{bead_id:_,expected_revision:H()}),J(v)),c==="worker-revise-fix"&&(v=await Tn(v,(_e,Ce)=>B({continuation:_e,decision_token:Ce}),{onResult:J,refresh:()=>B()}))}finally{me.delete(_),Ue()}if(!(!v||v.conflict)){if(v.ok){ce(c==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ce(`\uCC98\uBD84 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}}async function qe(c){if(!n)return;let _=await n("worker-automation-toggle",{on:c,expected_revision:H()});J(_),_&&_.conflict&&await n("worker-automation-toggle",{on:c,expected_revision:H()}).then(J)}async function S(c){if(!n||!c)return;let _=await n("worker-repo-operation-repair",{operation_id:c});if(J(_),_&&_.ok===!1){ce(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${_.reason||""}`,"error",3e3);return}_&&_.ok===!0&&ce("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function I(c){if(!n||!c)return;let _=await n("worker-repo-operation-dismiss",{operation_id:c});J(_),_&&_.ok===!1&&ce(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${_.reason||""}`,"error",3e3)}async function k(c){if(!n||!Number.isFinite(c))return;let _=Math.max(Xo,Math.floor(c)),v=await n("worker-queue-set-slots",{slots:_,expected_revision:H()});J(v),v&&v.conflict&&await n("worker-queue-set-slots",{slots:_,expected_revision:H()}).then(J)}async function L(c){if(!n||!Number.isInteger(c)||c<1||c>yp)return;let _=We(),v=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).slice(c).reduce((Ce,Ee)=>Ce+(Array.isArray(Ee?.entries)?Ee.entries.length:0),0),B=()=>({count:c,expected_revision:H()}),_e=await n("worker-queue-set-serial-lane-count",B());J(_e),_e&&_e.conflict&&(_e=await n("worker-queue-set-serial-lane-count",B()),J(_e)),_e&&_e.applied&&v>0&&ce(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${v}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let re="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function de(c,_){let v=Oi(c,_.id,N);return{id:_.id,title:_.title,location_label:_.location_label,prefixes:_.prefixes,action:v.kind==="note"?{kind:"note",text:v.text}:v.kind==="disabled"?{kind:"disabled",label:re,title:v.title}:{kind:"place",label:re,title:v.title}}}function te(c,_){if(!Y||Y.bead_id!==c)return null;let v=Y.counterpart_id,B=v===null?_:_.filter(_e=>_e.id===v);return B.length===0?null:{rows:B.map(_e=>de(c,_e))}}async function be(c,_){let v=Oi(c,_,N);if(Y=null,v.kind!=="ops"){Ue();return}let B=H();for(let _e of v.ops){let Ce=await ct(_e,B);if(Ce===null)break;B=Ce}Ue()}async function ct(c,_){if(!n)return null;try{let v=await n("worker-queue-place",{bead_id:c.bead_id,lane:c.lane,index:c.index,expected_revision:_});if(J(v),v&&v.conflict)return ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!v||v.applied!==!0)return ce(v&&typeof v.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${v.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let B=v.queue?v.queue.revision:void 0;return typeof B!="number"?(ce("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):B}catch(v){return ce(v instanceof Error&&v.message?v.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function Xe(){let c=We(),_=g?g.selectBoardColumn(mb,"ready"):[],v=g?g.selectBoardColumn(gb,"blocked"):[],B=g?g.selectBoardColumn(yb,"closed"):[],_e=g?g.selectBoardColumn(hb,"in_progress"):[],Ce=g?g.selectBoardColumn(bb,"resolved"):[],Ee=Js([..._,...v,..._e,...Ce,...B]),ze=new Map;for(let m of[..._,...v,..._e])m&&m.id&&!ze.has(m.id)&&ze.set(m.id,m);let dt={...se(d?.()||"")};for(let m of["orchestration_model","orchestration_effort","orchestration_speed"]){let j=c[m];typeof j=="string"&&(dt[m]=j)}function jt(m,j){let ne=ze.get(m);if(!ne)return null;let Ge=ne.metadata&&typeof ne.metadata=="object"?ne.metadata:{},rt=ne.workflow?.route,Dt=Ge.route,It=wp(rt)?rt:wp(Dt)?Dt:null;return Jt({pin:Ge,global:dt,execution_defaults:c.execution_defaults??null,runner_catalog:c.runner_catalog??null,route:It,controller_runtime:j})}function tn(m){let j=m.runner||null,ne=jt(m.bead_id,j),Ge=Wo(m),rt=ne?Vn(ne,j):null;return Ge||rt?{orchestration:Ge,worker:rt}:null}let Nn=new Map;function Ur(m){if(Nn.has(m))return Nn.get(m)??null;let j=jt(m,null),ne=null;if(j){let Ge=yn(c.runner_catalog??null,j.orchestration_model.value??""),rt=Ge===null?j:jt(m,Ge),Dt=dr(rt,c.runner_catalog??null),It=Vn(rt,Ge);ne=Dt||It?{orchestration:Dt,worker:It}:null}return Nn.set(m,ne),ne}function fr(m){let j=eo(Ee,m);return j.total===0?null:j}let Fi=c.bead_titles||{},Qt=new Map;for(let[m,j]of Object.entries(Fi))typeof j=="string"&&j.length>0&&Qt.set(m,j);for(let m of[..._,...v])Qt.set(m.id,m.title||m.id);let Rs=c.bead_times&&typeof c.bead_times=="object"&&!Array.isArray(c.bead_times)?c.bead_times:{},Ls=c.bead_labels&&typeof c.bead_labels=="object"&&!Array.isArray(c.bead_labels)?c.bead_labels:{},Zn=c.bead_workflow&&typeof c.bead_workflow=="object"&&!Array.isArray(c.bead_workflow)?c.bead_workflow:{},wn=new Map;for(let[m,j]of Object.entries(Ls))Array.isArray(j)&&wn.set(m,Ci(j));for(let m of[..._,...v]){let j=m.labels;Array.isArray(j)&&!wn.has(m.id)&&wn.set(m.id,Ci(j))}let _r=new Map,mr=o?.get()?.last_good?.result?.groups;for(let m of Array.isArray(mr)?mr:[]){if(m?.eligible!==!0||!Array.isArray(m.members))continue;let j=m.members.map(Ge=>{let rt=(Array.isArray(c.serial_lanes)?c.serial_lanes:[]).find(Dt=>Dt.entries.some(It=>It.bead_id===Ge));return rt?rt.id:null});if(!(j.every(Ge=>Ge!==null)&&new Set(j).size===1))for(let Ge of m.members)_r.set(Ge,m.members.filter(rt=>rt!==Ge))}let Wr=c.bead_blocked_by&&typeof c.bead_blocked_by=="object"&&!Array.isArray(c.bead_blocked_by)?c.bead_blocked_by:{},gr=new Map;for(let[m,j]of Object.entries(Rs))j&&typeof j=="object"&&gr.set(m,j);for(let m of[..._,...v])gr.set(m.id,{created_at:m.created_at,updated_at:m.updated_at});let Qn=m=>gr.get(m)||{},Xn=c.pr_wait||[],zr=c.pr_observations||{},Hr=c.pr_activity||{},Gr=c.cleanup_failed||{},je=Object.entries(Gr).map(([m,j])=>({bead_id:m,step:j&&j.step?j.step:"",reason:j&&j.reason?j.reason:"",at:j&&typeof j.at=="number"?j.at:null,detail:j&&typeof j.detail=="string"?j.detail:null,output_tail:j&&typeof j.output_tail=="string"&&j.output_tail?j.output_tail:void 0,log_path:j&&typeof j.log_path=="string"&&j.log_path?j.log_path:void 0,retry_count:j&&typeof j.retry_count=="number"&&Number.isInteger(j.retry_count)&&j.retry_count>0?j.retry_count:0,failure_code:j&&typeof j.failure_code=="string"?j.failure_code:void 0,subject_id:j&&typeof j.subject_id=="string"?j.subject_id:void 0,repair_eligible:!!(j&&j.repair_eligible),repair:j&&j.repair?j.repair:void 0})),pt=c.queue||[],qn=new Set([...pt.map(m=>m.bead_id),...(Array.isArray(c.serial_lanes)?c.serial_lanes:[]).flatMap(m=>(Array.isArray(m?.entries)?m.entries:[]).map(j=>j.bead_id)),...Xn.map(m=>m.bead_id),...c.done.map(m=>m.bead_id)]),ji=new Set(v.map(m=>m.id)),Bp=i?i.get()?.order||{}:{},Bi=new Set,Ui=[];for(let m of[..._,...v])qn.has(m.id)||Bi.has(m.id)||Pb(m)||(Bi.add(m.id),Ui.push(m));D=Ib(Ui,M,Bp);let Up=c.admission||{},Wi=m=>{let j=Up[m];if(!j)return"";if(j.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ne=typeof j.reason=="string"?j.reason:"",Ge=ne.indexOf(":");return Ge>0&&Ge<ne.length-1?`\u26D4 ${ne.slice(0,Ge)} (${ne.slice(Ge+1)})`:`\u26D4 ${ne}`},Wp=D.map(m=>{let j=Ao(m),ne=j.path.length>0,Ge=m.workflow?.route==="quick_fix"||m.metadata&&m.metadata.route==="quick_fix",rt=!Object.hasOwn(m,"description")||typeof m.description=="string"&&m.description.trim().length>0,Dt=Object.hasOwn(m,"labels")&&sp(m.labels),It=!Dt&&(Ge?rt:ne&&!j.conflict),$t=ji.has(m.id),_n=[];$t&&_n.push(Mb(m)),Ge&&!rt?_n.push("missing_description"):!Ge&&j.conflict?_n.push("spec_id_conflict"):!Ge&&!ne&&_n.push("spec \uC5C6\uC74C");let js=Wi(m.id);return js&&_n.push(js),{id:m.id,title:m.title||m.id,reason:_n.join(" \xB7 "),draggable:It,lane:"candidate",created_at:m.created_at,updated_at:m.updated_at,workflow:m.workflow,is_quick_fix:Ge,status:m.status,worker_ineligible:Dt,blocked:$t,has_spec:ne,exec_chips:Ur(m.id)}}),ea=$b(Wp,W),zp=ea.visible,Hp=c.revise_parked||{},Os=c.discard_operations&&typeof c.discard_operations=="object"&&!Array.isArray(c.discard_operations)?c.discard_operations:{},ta=(m,j)=>m.map((ne,Ge)=>{let rt=j!=="done",Dt=j!=="done"&&j!=="queue",It=rt?Hp[ne.bead_id]:null,$t=rt?An(Os,ne.bead_id):null,_n=$t?.operation?$t:null,js=rt&&wn.get(ne.bead_id)===!0,vl=Wr[ne.bead_id]||[],ca=c.admission&&typeof c.admission=="object"?c.admission[ne.bead_id]:null,ua=rt?Vu(ca,!!_n||Q.has(ne.bead_id)):null,tf=rt&&!ua?Wi(ne.bead_id):null,nf=rt?[tf]:[],wl=rt&&vl.length>0&&typeof ca?.reason=="string"&&ca.reason.startsWith("not_ready")?[`\u23F8 ${vl.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],da=rt?_r.get(ne.bead_id):void 0;return da&&da.length>0&&wl.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${da.join(", ")}\uC640`),{id:ne.bead_id,title:Qt.get(ne.bead_id)||ne.bead_id,reason:nf.filter(Boolean).join(" \xB7 "),draggable:rt&&!_n&&!ua,done:j==="done",lane:j,seq:Dt?Ge+1:void 0,worker_serial:js,discard:_n,stale_work:ua,badges:[...wl,...It?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!It,revise_action:!!It,revise_enabled:!!It&&!_n&&!me.has(ne.bead_id),revise_title:It?It.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${It.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:j==="done"?un(c.attempts||{},ne.bead_id):null,work_ms:j==="done"?qo(c.attempts||{},ne.bead_id):null,done_at:j==="done"&&typeof ne.added_at=="number"?ne.added_at:void 0,exec_chips:rt?Ur(ne.bead_id):null,workflow:rt&&Zn[ne.bead_id]||null,...Qn(ne.bead_id)}}),hr=c.attempts?Object.values(c.attempts):[],na=new Set;for(let m of hr)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&na.add(m.resumed_from);let zi=new Map;for(let m of hr)zi.set(m.bead_id,m.attempt_id);let Is=new Map;for(let m of hr)Is.set(m.attempt_id,m);function ra(m){let j=new Set,ne=m;for(;ne&&!j.has(ne.attempt_id);){if(ne.conflict_resolution===!0)return!0;j.add(ne.attempt_id),ne=typeof ne.resumed_from=="string"&&ne.resumed_from.length>0&&Is.get(ne.resumed_from)||null}return!1}let Ps=typeof c.declared_base=="string"?c.declared_base:null;function Gp(m){let j=null;for(let ne of hr)!ne||ne.bead_id!==m||ra(ne)||(j===null||(typeof ne.started_at=="number"?ne.started_at:0)>=(typeof j.started_at=="number"?j.started_at:0))&&(j=ne);return j&&typeof j.target_base=="string"?j.target_base:null}let sa=[],Ms=[],Vp=rp(c),Hi=m=>{let j=typeof m.session_id=="string"&&m.session_id.length>0,ne=na.has(m.attempt_id);return{eligible:j&&!ne,reason:j?ne?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},fn=null;for(let m of hr){let j=m.status==="paused"&&!na.has(m.attempt_id);if(m.status==="running"||j)Ms.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Qt.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,paused:j,conflict_resolution:ra(m),base_exception:Pi(Ps,m.target_base),can_pause:typeof m.session_id=="string"&&m.session_id.length>0,discard:An(Os,m.bead_id,{attempt_id:m.attempt_id}),workflow:Zn[m.bead_id]||null,usage:un(c.attempts||{},m.bead_id),rollup:fr(m.bead_id),rollup_expanded:Re.has(m.bead_id),exec_chips:tn(m),...Qn(m.bead_id)});else if((m.status==="failed"||m.status==="orphaned")&&Vp(m)){let ne=Hi(m);sa.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Qt.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,failed:!0,status:m.status,status_label:m.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:An(Os,m.bead_id,{attempt_id:m.attempt_id}),resume_eligible:ne.eligible,resume_reason:ne.reason,conflict_resolution:ra(m),base_exception:Pi(Ps,m.target_base),workflow:Zn[m.bead_id]||null,usage:un(c.attempts||{},m.bead_id),rollup:fr(m.bead_id),rollup_expanded:Re.has(m.bead_id),exec_chips:tn(m),...Qn(m.bead_id)}),fn=m}}let Gi=new Set([...sa,...Ms].map(m=>m.bead_id));for(let m of Array.isArray(c.session_active)?c.session_active:[]){let j=m&&m.bead_id;typeof j!="string"||j.length===0||Gi.has(j)||(Gi.add(j),Ms.push({bead_id:j,attempt_id:null,kind:"session",title:m.title||Qt.get(j)||j,status:"in_progress",started_at:kn(m.started_at)??kn(m.updated_at),updated_at:kn(m.updated_at),workflow:m.workflow||null,runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1}))}let br=[...sa,...Ms].map(m=>{let j=Is.get(m.attempt_id),ne=j?.quickfix_landing;if(j?.quickfix_lane!==!0||!ne||typeof ne!="object")return m;let Ge=typeof ne.reason=="string"&&ne.reason.length>0?ne.reason:null,rt=Es({bead_id:j.bead_id,merge_sha:ne.head_sha,cleanup_cursor:ne.cursor,cleanup_failed:Ge?{step:ne.cursor,reason:Ge}:null,repo_operations:Array.isArray(c.repo_operations)?c.repo_operations:[]});return rt?{...m,landing:rt}:m}),Vi=null;if(fn){let m=Hi(fn),j=fn.cause_detail;Vi={bead_id:fn.bead_id,repo:fn.repo||"",reason:fn.cause||fn.status,cause_detail:j&&typeof j.reason=="string"?{reason:j.reason,command:typeof j.command=="string"?j.command:null}:null,resume_attempt_id:fn.attempt_id,resume_eligible:m.eligible,resume_reason:m.reason,discard:An(Os,fn.bead_id,{attempt_id:fn.attempt_id})}}let Ki=new Set(br.map(m=>m.bead_id)),oa=Array.isArray(c.merge_queue)?c.merge_queue:[],Yi=new Map,Zi=new Map,Qi=new Map,Xi=new Map,Ji=new Map;oa.forEach((m,j)=>{m&&typeof m.bead_id=="string"&&(Yi.set(m.bead_id,j+1),Zi.set(m.bead_id,m.resolution),Qi.set(m.bead_id,m.continuation_action||null),Xi.set(m.bead_id,m.head_review||null),Ji.set(m.bead_id,m.authority||null))});let yr=c.merge_queue_state||{active:null,failures:{}},Kp=yr.failures||{},el=yr.waiting&&typeof yr.waiting.bead_id=="string"&&typeof yr.waiting.reason=="string"?yr.waiting:null,Yp=c.auto_merge_skips||{},tl=m=>{let j=Yp[m];if(!j)return null;let ne=zr[m],Ge=ne&&ne.pr?ne.pr.head_sha:null;return Ge&&Ge===j.head_sha?j.reason||"":null},Ds=new Map;for(let m of br)m.failed!==!0&&m.conflict_resolution&&(m.paused?Ds.has(m.bead_id)||Ds.set(m.bead_id,"paused"):Ds.set(m.bead_id,"running"));let nl=br.filter(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0).length,rl=(c.workspace_info||{}).slots,sl=typeof rl=="number"?rl:typeof c.slots=="number"?c.slots:Xo,Zp=nl>sl,Ns=sr(q),Qp=(Array.isArray(c.done)?c.done.slice():[]).filter(m=>Ns===void 0||typeof m.added_at!="number"||m.added_at>=Ns).sort((m,j)=>(j.added_at||0)-(m.added_at||0)),Vr=ta(Qp,"done"),Xp=new Set((Array.isArray(c.done)?c.done:[]).map(m=>m?.bead_id).filter(m=>typeof m=="string")),ol=[],Jp=d?.()||"";for(let m of B){let j=kn(m.closed_at);if(typeof m.id!="string"||Xp.has(m.id)||j===null||Ns!==void 0&&j<Ns||typeof m.comment_count!="number"||m.comment_count<=0)continue;let ne=`${Jp}\0${m.id}\0${String(m.updated_at)}\0${m.comment_count}`,Ge=U.get(ne);Ge===void 0&&n&&(U.set(ne,"pending"),Promise.resolve(n("get-comments",{id:m.id})).then(rt=>{let Dt=Array.isArray(rt)&&rt.some(It=>So(typeof It?.text=="string"?It.text:"")?.lane==="session");U.set(ne,Dt?"session":"not-session"),Ue()}).catch(()=>{U.set(ne,"failed"),Ue()})),Ge==="session"&&ol.push({id:m.id,title:m.title||m.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:j,created_at:m.created_at,updated_at:m.updated_at})}Vr.push(...ol),Vr.sort((m,j)=>(j.done_at||0)-(m.done_at||0));let qs={};for(let m of Cn)qs[m]=0;let al=!1,il=0,aa=0,ll=0;for(let m of Vr){let j=m.usage;if(j&&typeof j=="object"){let ne=!1;for(let Ge of Cn)Number.isFinite(j[Ge])&&(qs[Ge]+=j[Ge],al=!0,ne=!0);ne&&(aa+=1,Number.isFinite(j.total_cost_usd)&&(il+=j.total_cost_usd,ll+=1))}}aa>0&&ll===aa&&(qs.total_cost_usd=il);let cl=Vr.map(m=>m.usage).filter(m=>m&&typeof m=="object"&&m.providers),ef=cl.length>0?Bt(uo(cl)):al?Rn(qs):null,ul=c.lane_states&&typeof c.lane_states=="object"&&!Array.isArray(c.lane_states)?c.lane_states:{},dl=Array.isArray(c.serial_lanes)?c.serial_lanes:[],pl=m=>{if(Xn.some(Ge=>Ge.bead_id===m))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let j=hr.filter(Ge=>Ge&&Ge.bead_id===m),ne=j.length>0?j[j.length-1].status:null;return ne==="failed"||ne==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ne==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Fs=dl.filter(m=>m&&typeof m.id=="string"&&Array.isArray(m.entries)).map((m,j)=>{let ne=ul[m.id]||{},Ge=new Map((Array.isArray(ne.corrections)?ne.corrections:[]).filter($t=>$t&&typeof $t.bead_id=="string"&&typeof $t.after=="string").map($t=>[$t.bead_id,$t.after])),rt=ta(m.entries.filter($t=>!Ki.has($t.bead_id)),m.id).map($t=>Ge.has($t.id)?{...$t,badges:[`\u{1F517} ${Ge.get($t.id)} \uB4A4 (blocks \uC790\uB3D9)`,...$t.badges]}:$t),Dt=Array.isArray(ne.occupied_by)?ne.occupied_by.filter($t=>typeof $t=="string"):[],It=Dt.map($t=>({id:$t,title:Qt.get($t)||$t,draggable:!1,lane:m.id,ghost:!0,badges:[pl($t)]}));return{id:m.id,index:j+1,rows:[...It,...rt],occupied:Dt.length>0,badge:Dt.length>0?pl(Dt[0]):"\uB300\uAE30",cycle:ne.cycle===!0}}),fl=typeof c.serial_lane_count=="number"?c.serial_lane_count:Fs.length,ia=ta(pt.filter(m=>!Ki.has(m.bead_id)),"queue"),_l=new Map,ml=new Set;for(let[m,j]of Object.entries(ul)){if(!/^s[1-5]$/.test(m))continue;let ne=j&&Array.isArray(j.occupied_by)?j.occupied_by:[];for(let Ge of ne)typeof Ge=="string"&&_l.set(Ge,m);ne.length>0&&ml.add(m)}let Kr=[];for(let m of br)typeof m.bead_id=="string"&&Kr.push({id:m.bead_id,title:Qt.get(m.bead_id)||m.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:_l.get(m.bead_id)??null});for(let m of Fs)for(let j of m.rows)j.ghost!==!0&&Kr.push({id:j.id,title:j.title,location_label:`${m.id} #${j.seq??""}`.trim(),kind:"serial",lane_id:m.id});ia.forEach((m,j)=>{Kr.push({id:m.id,title:m.title,location_label:`#${j+1}`,kind:"parallel",lane_id:null})});let gl={};for(let m of dl)m&&typeof m.id=="string"&&Array.isArray(m.entries)&&(gl[m.id]=m.entries.length);let la=new Map;for(let m of Kr)la.has(m.id)||la.set(m.id,m);N={members_by_id:la,serial_raw_lengths:gl,serial_lane_count:fl,occupied_lanes:ml};let hl=ap(c.bead_scope,Kr),bl=(m,j)=>{let ne=hl.get(m.id);if(!ne||ne.overlaps.length===0&&!ne.scope_missing)return m;let Ge=te(m.id,ne.overlaps);return m.dependency_chips={...m.dependency_chips||{},...ne.overlaps.length>0?{overlaps:ne.overlaps}:{},...ne.scope_missing&&j!=="running"?{scope_missing:!0}:{},...Ge?{popover:Ge}:{}},m};for(let m of ia)bl(m,"queue");for(let m of Fs)for(let j of m.rows)j.ghost!==!0&&bl(j,m.id);let yl=new Map;for(let m of br){let j=typeof m.bead_id=="string"?hl.get(m.bead_id):void 0;if(!j||j.overlaps.length===0)continue;let ne=te(m.bead_id,j.overlaps);yl.set(m.bead_id,{dependency_chips:{overlaps:j.overlaps,...ne?{popover:ne}:{}}})}return{queue:c,idToTitle:Qt,candidates:zp,candidate_hidden:{blocked:ea.hidden_blocked,spec:ea.hidden_spec},running:br,live_count:nl,slots:sl,over_cap:Zp,failure:Vi,waiting:ia,serial_lanes:Fs,serial_lane_count:fl,running_overlays:yl,pr_wait:Xn.map(m=>Wb(m.bead_id,Qt.get(m.bead_id)||m.bead_id,zr,Gr[m.bead_id]||null,un(c.attempts||{},m.bead_id),Hr[m.bead_id]||($e.has(m.bead_id)||ue.has(m.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Ds.get(m.bead_id)||null,m.external===!0,{position:Yi.get(m.bead_id)||0,active:yr.active===m.bead_id,failure:Kp[m.bead_id]||null,waiting:el?.bead_id===m.bead_id?el.reason:null,resolution:Zi.get(m.bead_id),continuation_action:Qi.get(m.bead_id),head_review:Xi.get(m.bead_id)||null,authority:Ji.get(m.bead_id)||null},m.wt_present!==!1,c.auto_merge===!0?tl(m.bead_id):null,Pi(Ps,Gp(m.bead_id)),c.completion_status&&typeof c.completion_status=="object"&&!Array.isArray(c.completion_status)&&c.completion_status[m.bead_id]||null,c.discard_operations&&typeof c.discard_operations=="object"&&!Array.isArray(c.discard_operations)?c.discard_operations:{},Is.get(zi.get(m.bead_id)||"")?.worker_serial===!0,c.auto_merge===!0,{merge_sha:m.merge_sha,cleanup_cursor:m.cleanup_cursor,repo_operations:Array.isArray(c.repo_operations)?c.repo_operations:[]})).map(m=>({...m,workflow:Zn[m.id]||null,...Qn(m.id)})),merge_queue_length:oa.length,merge_queue_running:oa.length>0,auto_excluded:Xn.map(m=>m.bead_id).filter(m=>tl(m)!==null),declared_base:Ps,done:Vr,token_total:ef,cleanup_failures:je,repo_operations:Array.isArray(c.repo_operations)?c.repo_operations:[]}}function Ye(){let _=!!o?.get()?.job,v=!_&&o?.isPending?.()===!0,B=_?"\uBD84\uC11D \uC911":v?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${B?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${B?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${B?l`<span class="worker-analysis-btn__badge">${B}</span>`:""}
    </button>`}function bt(c){let _=c.waiting.length>0?c.waiting[0].id:"\u2014",v=l`<button
      type="button"
      class="worker-play${c.queue.auto_advance?" is-active":""}"
    >
      ${c.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,B=Mt(c),_e=c.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ce=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${c.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${c.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${E()} 완료 <b>${c.done.length}</b></span
      >`,Ee=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${c.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${c.declared_base||"?"}</span
    >`,ze=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Xo}
          step="1"
          .value=${String(c.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:yp},(tn,Nn)=>Nn+1).map(tn=>l`<option
                value=${String(tn)}
                ?selected=${c.serial_lane_count===tn}
              >
                ${tn}
              </option>`)}
        </select>
      </label>
      ${o?Ye():""} `,dt=Ju({failure:c.failure}),jt=Gu(c.repo_operations,c.cleanup_failures);return Z?l`<div class="worker-ribbon">
          ${v} ${B}
          <div class="worker-kpi worker-kpi--ribbon">${_e}${Ce}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${ze}</div>
          <div class="worker-kpi">${Ee}</div>
        </div>
        ${jt}${De.template()}${dt}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${v}${B}${ze}</div>
        <div class="worker-kpi">
          ${_e}${Ce}${Ee}
          ${(Array.isArray(c.token_total)?c.token_total:c.token_total?[{label:c.token_total,tooltip:`${E()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(tn=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${tn.tooltip}
                >${E()} 완료 · 누적 ${tn.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${_}</b></span
          >
        </div>
      </div>
      ${jt}${De.template()}${dt}`}function St(c){if(c.running.length===0&&c.pr_wait.length===0)return"";let _=c.running.some(v=>v.kind!=="session"&&!v.paused&&v.failed!==!0);return l`<section
      class="worker-now${_?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${c.running.length+c.pr_wait.length}</span
        >
      </header>
      ${c.running.length>0?gi(c.running,Date.now(),ke,c.running_overlays):""}
      ${c.pr_wait.map(v=>zn(v))}
    </section>`}function yt(c){let _=c.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${W.show_blocked}
        />
        🔒 blocked${_.blocked>0?` ${_.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${xb.map(v=>l`<button
              type="button"
              class="worker-filter__chip${W.spec===v.value?" is-active":""}"
              data-spec=${v.value}
              aria-pressed=${W.spec===v.value?"true":"false"}
            >
              ${v.label}
            </button>`)}
        ${_.spec>0?l`<span class="worker-filter__hidden">숨김 ${_.spec}</span>`:""}
      </div>
    </div>`}function Ct(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${M}
    >
      ${Ab.map(c=>l`<option value=${c.value} ?selected=${M===c.value}>
            ${c.label}
          </option>`)}
    </select>`}function zt(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${q}
      >
        ${Fn.map(c=>l`<option value=${c.value} ?selected=${q===c.value}>
              ${c.label}
            </option>`)}
      </select>
    </div>`}function Nt(c){let _=l`<span
      class="worker-lane__badge${c.occupied?" worker-lane__badge--held":""}"
      >${c.badge}</span
    >`,v=c.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return pn({id:`worker-pane-lane-${c.id}`,lane:c.id,title:`\uC9C1\uB82C ${c.index}`,items:c.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:_,controls:v})}function Mt(c){let _=c.queue.auto_merge===!0;if(c.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${_?" is-active":""}"
        title=${_?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${_?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${c.merge_queue_length}
      </button>`;if(_)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let v=new Set(c.auto_excluded),B=c.pr_wait.filter(_e=>_e.merge_action&&_e.merge_enabled&&!v.has(_e.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${B>0?` ${B}`:""}
    </button>`}function Ft(c){let _=pn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:c.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ct(),controls:yt(c),place_menu:P(c.candidates)});return Z?l`<div class="worker-lanes worker-lanes--mobile">
        ${St(c)}
        ${pn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:c.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:R.queue,preview:kp(c.waiting)})}
        ${c.serial_lanes.map(v=>Nt(v))}
        ${_}
        ${pn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:c.done,empty:`${E()} \uC644\uB8CC \uC5C6\uC74C`,controls:zt(),collapsible:!0,collapsed:R.done,preview:Array.isArray(c.token_total)?c.token_total.map(v=>v.label).join(" \xB7 "):c.token_total||kp(c.done)})}
      </div>`:l`<div class="worker-lanes">
      ${_}
      <div class="worker-wait">
        ${pn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:c.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${c.serial_lanes.map(v=>Nt(v))}
      </div>
      ${pn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${c.slots}`,items:c.running,live:c.running.some(v=>v.kind!=="session"&&!v.paused&&v.failed!==!0),body:gi(c.running,Date.now(),ke,c.running_overlays)})}
      ${pn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:c.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${pn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${E()} ${c.done.length}`,items:c.done,empty:`${E()} \uC644\uB8CC \uC5C6\uC74C`,controls:zt()})}
    </div>`}function Lt(c){R={...R,[c]:!R[c]},Ob(R),Ue()}function Ue(){let c=Xe();Ze(bt(c),Ie),Ze(Ft(c),ge)}function Ut(){if(typeof window.matchMedia!="function")return;let c=window.matchMedia(Rb);Z=!!c.matches;let _=v=>{let B=!!(v&&typeof v.matches=="boolean"?v.matches:c.matches);B!==Z&&(Z=B,Ue())};typeof c.addEventListener=="function"?(c.addEventListener("change",_),F.push(()=>c.removeEventListener("change",_))):typeof c.addListener=="function"&&(c.addListener(_),F.push(()=>c.removeListener(_)))}let Ht=null;function et(c){Ht=c.target instanceof Element?c.target:null}function Wt(c){let v=c.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!v)return;if(Ht&&v.contains(Ht)&&Ht.closest("input, button, a")){c.preventDefault();return}let B=v.dataset.beadId||"",_e=v.dataset.lane||"";A={bead_id:B,from_lane:_e};try{c.dataTransfer?.setData("text/plain",B),c.dataTransfer&&(c.dataTransfer.effectAllowed="move")}catch{}}function Fe(c){let _=c.target?.closest?.(".worker-pane");if(!_)return;let v=_.dataset.lane||"";v!=="candidate"&&v!=="queue"&&!/^s[1-5]$/.test(v)||(c.preventDefault(),c.dataTransfer&&(c.dataTransfer.dropEffect="move"),_.classList.add("worker-pane--drag-over"))}function T(c){c.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function fe(c,_){let v=D.find(Ee=>Ee.id===c);if(!v)return;let B=D.filter(Ee=>Ee.id!==c),_e=B.length;if(_){let Ee=_.dataset.beadId;if(Ee===c)return;let ze=B.findIndex(dt=>dt.id===Ee);ze>=0&&(_e=ze)}let Ce=B.slice();Ce.splice(_e,0,v),w.applyReorder(c,Ce,_e)}function Te(c){let _=c.target?.closest?.(".worker-pane");if(!_)return;c.preventDefault(),_.classList.remove("worker-pane--drag-over");let v=_.dataset.lane||"",B=A?.bead_id||c.dataTransfer?.getData("text/plain")||"",_e=A?.from_lane||"";if(A=null,!B)return;let Ce=c.target?.closest?.(".worker-mini, .worker-card"),Ee=Array.from(_.querySelectorAll(".worker-mini, .worker-card")),ze=Ee.length;if(Ce){let dt=Ee.indexOf(Ce);dt>=0&&(ze=dt)}if(ze=Math.max(0,ze-_.querySelectorAll(".worker-mini--ghost").length),_.classList.contains("worker-pane--collapsed")&&(ze=X()),v==="candidate"){if(_e==="candidate"){fe(B,Ce);return}(_e==="queue"||/^s[1-5]$/.test(_e))&&st(B);return}if(v==="queue"||/^s[1-5]$/.test(v)){let dt=v==="queue"?"parallel":v;_e===v?tt(B,dt,ze):Pe(B,dt)}}function at(c){W=c,kb(c),Ue()}function Rt(c){M=c==="board"||c==="created"||c==="spec"?c:Jo,Eb(M),Ue()}function b(c){q=cn(c)?c:nn,Cb(q),f?.(q),Ue()}function h(c){let _=c.target?.closest?.(".worker-serial-lane-count");if(_){let ze=Number.parseInt(_.value,10);Number.isFinite(ze)&&L(ze).then(Ue);return}let v=c.target?.closest?.(".worker-filter__blocked");if(v){at({...W,show_blocked:v.checked});return}let B=c.target?.closest?.(".worker-done-range");if(B){b(B.value);return}let _e=c.target?.closest?.(".worker-sort");if(_e){Rt(_e.value||Jo);return}let Ce=c.target?.closest?.(".worker-slots__input");if(!Ce)return;let Ee=Number.parseInt(Ce.value,10);if(!Number.isFinite(Ee)){Ue();return}k(Ee).then(Ue)}function x(c){return c?{runner:c.runner||void 0,model:c.model||void 0,effort:c.effort||void 0,worktree:c.worktree||void 0,status:c.status||void 0,session_id:c.session_id||void 0}:{}}function O(){let c=Xe();return{operations:c.repo_operations,cleanup_failures:c.cleanup_failures,repo:d&&d()||""}}function ee(){ke&&Me.close(),C.hidden=!1,he.hidden=!1,Be.open(O()),Ue()}function y(c){let _=We(),v=_.attempts?_.attempts[c]:null;ke=c,Le=null,Be.close(),C.hidden=!0,he.hidden=!1,Me.open({attempt_id:c,meta:x(v)}),Ue()}function $(c,_){ke=null,Le=c,Be.close(),C.hidden=!0,he.hidden=!1,Me.open({attempt_id:c,meta:_,hide_prompt:!0}),Ue()}function le(){if(Be.isOpen()&&Be.refresh(O()),Le){let v=(o?.get()?.runs||[]).find(B=>B.run_id===Le);v?Me.updateMeta(Li(v)):Me.close();return}if(!ke)return;let c=We(),_=c.attempts?c.attempts[ke]:null;if(_){Me.updateMeta(x(_));return}Me.close()}function ye(c){let _=c.target;if(_?.closest?.(".worker-mini__serial, .worker-mini__grip")||_?.closest?.("#worker-parallel-analysis-dialog"))return;let v=_?.closest?.(".mon-overlap__chip");if(v){let je=v.closest("[data-bead-id]"),pt=je&&je.getAttribute("data-bead-id")||"";if(pt){let qn=v.getAttribute("data-overlap-all")==="true"?null:v.getAttribute("data-overlap-id")||"";Y=!!Y&&Y.bead_id===pt&&Y.counterpart_id===qn?null:{bead_id:pt,counterpart_id:qn},Ue()}return}let B=_?.closest?.(".mon-overlap__place");if(B){let je=B.closest("[data-bead-id]"),pt=je&&je.getAttribute("data-bead-id")||"";pt&&be(pt,B.getAttribute("data-counterpart-id")||"");return}if(_?.closest?.(".mon-overlap__popover"))return;if(_?.closest?.(".worker-analysis-btn")){Qe?.open();return}if(_?.closest?.(".worker-repo-strip")||_?.closest?.(".worker-mini__timeline")){ee();return}let _e=_?.closest?.(".worker-repo-op__session");if(_e){let je=_e.dataset.attemptId;je&&y(je);return}let Ce=_?.closest?.(".worker-repo-op__resolve");if(Ce){S(Ce.dataset.operationId||"");return}let Ee=_?.closest?.(".worker-repo-op__dismiss");if(Ee){I(Ee.dataset.operationId||"");return}let ze=_?.closest?.(".worker-cleanup__resume");if(ze){let je=ze.dataset.beadId;je&&gt(je);return}let dt=_?.closest?.(".worker-banner__resume");if(dt){let je=dt.dataset.attemptId;je&&vt(je);return}let jt=_?.closest?.(".worker-banner__discard");if(jt){let je=jt.dataset.confirmation==="merged"?"merged":"unmerged";lt(jt.dataset.beadId||"",jt.dataset.attemptId||null,je,jt.dataset.operationId||null);return}let tn=_?.closest?.(".worker-banner__dismiss");if(tn){let je=tn.dataset.attemptId;je&&mt(je);return}if(_?.closest?.(".worker-play")){qe(!We().auto_advance);return}let Nn=_?.closest?.(".worker-merge-all");if(Nn){Nn.classList.contains("worker-merge-all--stop")?We().auto_merge===!0?Ne(!1):wt():Ne(!0);return}let Ur=_?.closest?.(".worker-pane__hd--toggle");if(Ur){let je=Ur.dataset.lane;(je==="queue"||je==="done")&&Lt(je);return}let fr=_?.closest?.(".worker-card__place-lane");if(fr){let je=fr.dataset.beadId,pt=fr.dataset.lane;je&&(pt==="parallel"||/^s[1-5]$/.test(pt||""))&&(V=null,Ue(),Pe(je,pt));return}if(_?.closest?.(".worker-card__place-cancel")){V=null,Ue();return}let Qt=_?.closest?.(".worker-card__place");if(Qt){let je=Qt.dataset.beadId;je&&!Qt.disabled&&(ve()?(V=je,Ue()):Pe(je,"parallel"));return}let Rs=_?.closest?.(".worker-filter__chip");if(Rs){let je=Rs.dataset.spec;(je==="all"||je==="with"||je==="without")&&at({...W,spec:je});return}let Ls=_?.closest?.(".worker-mini__merge");if(Ls){let je=Ls.dataset.beadId||"";We().cleanup_failed?.[je]?gt(je):ut(je);return}let Zn=_?.closest?.(".worker-mini__merge-cancel");if(Zn){He(Zn.dataset.beadId||"");return}let wn=_?.closest?.(".worker-mini__discard");if(wn){lt(wn.dataset.beadId||"",wn.dataset.attemptId||null,wn.dataset.discardMode==="merged"?"merged":"unmerged",wn.dataset.operationId||null);return}let _r=_?.closest?.(".worker-mini__stale-continue");if(_r){G("worker-stale-work-continue",_r.dataset.beadId||"",_r.dataset.actionId||"");return}let mr=_?.closest?.(".worker-mini__stale-backup");if(mr){G("worker-stale-work-backup-fresh",mr.dataset.beadId||"",mr.dataset.actionId||"");return}let Wr=_?.closest?.(".worker-mini__stale-recheck");if(Wr){G("worker-stale-work-recheck",Wr.dataset.beadId||"",Wr.dataset.actionId||"");return}let gr=_?.closest?.(".worker-mini__revise-fix");if(gr){pe("worker-revise-fix",gr.dataset.beadId||"");return}let Qn=_?.closest?.(".worker-mini__revise-approve");if(Qn){pe("worker-revise-approve",Qn.dataset.beadId||"");return}if(_?.closest?.(".worker-mini__pr"))return;if(_?.closest?.(".rtile__discard")){let je=_?.closest?.(".rtile"),pt=je?.dataset?.beadId,qn=je?.dataset?.attemptId;pt&&lt(pt,qn||null,"unmerged",_?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(_?.closest?.(".rtile__dismiss")){let pt=_?.closest?.(".rtile")?.dataset?.attemptId;pt&&mt(pt);return}if(_?.closest?.(".rtile__pause")){let pt=_?.closest?.(".rtile")?.dataset?.attemptId;pt&&Je(pt);return}if(_?.closest?.(".rtile__resume")){let pt=_?.closest?.(".rtile")?.dataset?.attemptId;pt&&vt(pt);return}if(_?.closest?.(".rtile__session")){let pt=_?.closest?.(".rtile")?.dataset?.attemptId;pt&&y(pt);return}if(_?.closest?.(".worker-drawer-overlay__backdrop")){Be.close(),Me.close();return}if(_?.closest?.(".worker-drawer-host"))return;let Xn=_?.closest?.(".rtile .board-card__roll-toggle");if(Xn){let je=Xn.dataset.rollParent;je&&(Re.has(je)?Re.delete(je):Re.add(je),Ue());return}let zr=_?.closest?.(".rtile .board-card__roll-child");if(zr){let je=zr.dataset.childId;je&&u&&u(je);return}let Hr=_?.closest?.(".rtile");if(Hr){if(_?.closest?.(".rtile__id")){let pt=Hr.dataset.beadId;pt&&sn(pt).then(qn=>{qn?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let je=Hr.dataset.beadId;je&&u&&u(je);return}let Gr=_?.closest?.(".worker-mini, .worker-card");if(Gr){let je=Gr.dataset.beadId;if(_?.closest?.(".worker-mini__id, .worker-card__id")){je&&sn(je).then(pt=>{pt?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}je&&u&&u(je)}}e.addEventListener("pointerdown",et),e.addEventListener("dragstart",Wt),e.addEventListener("dragover",Fe),e.addEventListener("dragleave",T),e.addEventListener("drop",Te),e.addEventListener("click",ye),e.addEventListener("change",h);function Ke(c){if(!Y)return;let _=c.target;_&&typeof _.closest=="function"&&_.closest(".mon-overlap__popover, .mon-overlap__chip")||(Y=null,Ue())}function Oe(c){c.key!=="Escape"||!Y||(Y=null,Ue())}return document.addEventListener("click",Ke),document.addEventListener("keydown",Oe),F.push(()=>{document.removeEventListener("click",Ke),document.removeEventListener("keydown",Oe)}),Ut(),g&&F.push(g.subscribe(()=>{for(let[c,_]of U)_==="failed"&&U.delete(c);Ue()})),s&&F.push(s.subscribe(()=>{let c=d&&d()||"";c!==K&&(K=c,z.close()),Ue(),le()})),o&&typeof o.subscribe=="function"&&F.push(o.subscribe(()=>{le(),Ue()})),Ue(),{load(){ie(),Ue()},refreshSessionDefaults:Ae,destroy(){for(let c of F.splice(0))try{c()}catch{}e.removeEventListener("pointerdown",et),e.removeEventListener("dragstart",Wt),e.removeEventListener("dragover",Fe),e.removeEventListener("dragleave",T),e.removeEventListener("drop",Te),e.removeEventListener("click",ye),e.removeEventListener("change",h);try{Me.destroy()}catch{}he.hidden=!0;try{Qe?.destroy()}catch{}try{z.destroy()}catch{}Ze(l``,e)}}}function Di(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Cp(e,t,n,r=async()=>{},s=async()=>{}){let o=Et("views:workspace-picker"),a=null,i=!1,u=!1,d=!1;async function p(U){let R=U.target.value,$e=t.getState().workspace?.current?.path||"";if(R&&R!==$e){o("switching workspace to %s",R),i=!0,q();try{await n(R)}catch(ue){o("workspace switch failed: %o",ue)}finally{i=!1,q()}}}async function f(){let U=t.getState(),E=U.workspace?.current?.path||U.workspace?.available?.[0]?.path||"";if(!(!E||u)){o("git-pulling workspace %s",E),u=!0,q();try{await r(E)}catch(R){o("workspace git pull failed: %o",R)}finally{u=!1,q()}}}function g(U){let E=U.target;E&&e.contains(E)||D()}function w(U){U.key==="Escape"&&D()}function A(){d||(d=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",w),q())}function D(){d&&(d=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",w),q())}function W(){d?D():A()}async function V(U){let E=U.target,R=E.value,Z=E.checked;o("toggling visibility %s \u2192 %s",R,String(Z));try{await s(R,Z)}catch($e){o("workspace visibility toggle failed: %o",$e)}}function Y(U){return U?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${i||u}
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
                        >${Di(R.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function M(){let U=t.getState(),E=U.workspace?.current,R=U.workspace?.available||[],Z=new Set(U.workspace?.hidden||[]),$e=E?.path||R[0]?.path||"";if(R.length===0)return l``;let ue=R.filter(me=>!Z.has(me.path)||me.path===$e);if(ue.length<=1){let me=ue[0]||R[0],Q=Di(me.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${me.path}"
            >${Q}</span
          >
          ${N(R,Z)}
          ${Y($e)}
          ${u?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${i||u}
          aria-label="Select project workspace"
        >
          ${ue.map(me=>l`
              <option
                value="${me.path}"
                ?selected=${me.path===$e}
                title="${me.path}"
              >
                ${Di(me.path)}
              </option>
            `)}
        </select>
        ${N(R,Z)}
        ${Y($e)}
        ${i||u?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function q(){Ze(M(),e)}return q(),a=t.subscribe(()=>q()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",w),Ze(l``,e)}}}var Rp=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Ni(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Lp(e,t,n=Ni()){return{id:n,type:e,payload:t}}function Op(e={}){let t=Et("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,u=!0,d=new Map,p=[],f=new Map,g=new Set;function w(M){for(let q of Array.from(g))try{q(M)}catch{}}function A(){if(!u||i)return;o="reconnecting",t("ws reconnecting\u2026"),w(o);let M=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),q=(n.jitterRatio||0)*M,U=Math.max(0,Math.round(M+(Math.random()*2-1)*q));t("ws retry in %d ms (attempt %d)",U,a+1),i=setTimeout(()=>{i=null,N()},U)}function D(M){try{s?.send(JSON.stringify(M))}catch(q){t("ws send failed",q)}}function W(){for(o="open",t("ws open"),w(o),a=0;p.length;){let M=p.shift();M&&D(M)}}function V(M){let q;try{q=JSON.parse(String(M.data))}catch{t("ws received non-JSON message");return}if(!q||typeof q.id!="string"||typeof q.type!="string"){t("ws received invalid envelope");return}if(d.has(q.id)){let E=d.get(q.id);d.delete(q.id),q.ok?E?.resolve(q.payload):E?.reject(q.error||new Error("ws error"));return}let U=f.get(q.type);if(U&&U.size>0)for(let E of Array.from(U))try{E(q.payload)}catch(R){t("ws event handler error",R)}else t("ws received unhandled message type: %s",q.type)}function Y(){o="closed",t("ws closed"),w(o);for(let[M,q]of d.entries())q.reject(new Error("ws disconnected")),d.delete(M);a+=1,A()}function N(){if(!u)return;let M=r();try{s=new WebSocket(M),t("ws connecting %s",M),o="connecting",w(o),s.addEventListener("open",W),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",Y)}catch(q){t("ws connect failed %o",q),A()}}return N(),{send(M,q){if(!Rp.includes(M))return Promise.reject(new Error(`unknown message type: ${M}`));let U=Ni(),E=Lp(M,q,U);return t("send %s id=%s",M,U),new Promise((R,Z)=>{d.set(U,{resolve:R,reject:Z,type:M}),s&&s.readyState===s.OPEN?D(E):(t("queue %s id=%s (state=%s)",M,U,o),p.push(E))})},on(M,q){f.has(M)||f.set(M,new Set);let U=f.get(M);return U?.add(q),()=>{U?.delete(q)}},onConnection(M){return g.add(M),()=>{g.delete(M)}},reconnect(){u=!0,i&&(clearTimeout(i),i=null),a=0,N()},close(){u=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function zb(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Hb(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var qi=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Ip=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Kn="tab:worker:closed",Gb="bdui.worker.done-range",Pp=Dd,Mp="worker:queue",Dp="worker:parallel-analysis",Np="ui:order",qp="ui:display-policy",Fp="exec:presets",Yn="tab:board:closed",jp="beads-ui.board.closed-range";function Vb(e){let t=Et("main");t("bootstrap start");let n=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ze(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),u=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),p=document.getElementById("detail-panel");if(a&&np(a),i&&u&&d&&p){let se=function(y,$){let le="Request failed",ye="";if(y&&typeof y=="object"){let Oe=y;if(typeof Oe.message=="string"&&Oe.message.length>0&&(le=Oe.message),typeof Oe.details=="string")ye=Oe.details;else if(Oe.details&&typeof Oe.details=="object")try{ye=JSON.stringify(Oe.details,null,2)}catch{ye=""}}else typeof y=="string"&&y.length>0&&(le=y);let Ke=$&&$.length>0?`Failed to load ${$}`:"Request failed";F.open(Ke,le,ye)},P=function(y){return`${et.getState().workspace.current?.path||""}\0${y}`},H=function(){Me&&(Me().catch(()=>{}),Me=null),Be=null,z=null},X=function(y){K=y;let $=()=>{K!==y||et.getState().selected_id!==y||(K=null,J(y))};if(!We){Qe.then($);return}$()},Je=function(y,$,le,ye,Ke){return le!==st[$]?(Ke().catch(()=>{}),!1):(y.set(ye,Ke),!0)},mt=function(){let y=et.getState();Ne(y.view==="board"),qe(y.view==="worker"),re(y.view==="monitor"),I(y.view==="board"||y.view==="worker"||vt||!!y.selected_id)},gt=function(){let y=sr(ot);return y===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:y}}},Ve=function(){let y=sr(ut);return y===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:y}}},Ne=function(y){if(y)for(let[$,le]of qi){if(Pe.has($)||tt.has($))continue;let ye=$===Yn?gt():{type:le};try{Ie.register($,ye)}catch(c){t("register %s store failed: %o",$,c)}tt.add($);let Ke=st.board,Oe=!1;Se.subscribeList($,ye).then(c=>{Oe=!Je(Pe,"board",Ke,$,c)}).catch(c=>{t("subscribe %s failed: %o",$,c),se(c,"board")}).finally(()=>{tt.delete($),Oe&&mt()})}else lt()},lt=function(){st.board+=1;for(let[y]of qi){let $=Pe.get(y);$&&($().catch(()=>{}),Pe.delete(y));try{Ie.unregister(y)}catch(le){t("unregister %s failed: %o",y,le)}}},qe=function(y){if(!y){S();return}for(let[$,le]of Ip){if(G.has($)||tt.has($))continue;let ye=$===Kn?Ve():{type:le};try{Ie.register($,ye)}catch(c){t("register %s store failed: %o",$,c)}tt.add($);let Ke=st.worker,Oe=!1;Se.subscribeList($,ye).then(c=>{Oe=!Je(G,"worker",Ke,$,c)}).catch(c=>{t("subscribe %s failed: %o",$,c),se(c,"worker")}).finally(()=>{tt.delete($),Oe&&mt()})}},S=function(){st.worker+=1;for(let[y]of Ip){let $=G.get(y);$&&($().catch(()=>{}),G.delete(y));try{Ie.unregister(y)}catch(le){t("unregister %s failed: %o",y,le)}}},I=function(y){if(!y){k();return}pe||(Ae("subscribe-worker-queue",{id:Mp}).catch($=>{t("subscribe-worker-queue failed: %o",$)}),Ae("subscribe-worker-parallel-analysis",{id:Dp}).catch($=>{t("subscribe-worker-parallel-analysis failed: %o",$)}),pe=()=>(Ae("unsubscribe-worker-parallel-analysis",{id:Dp}),Ae("unsubscribe-worker-queue",{id:Mp})))},k=function(){pe&&(pe().catch(()=>{}),pe=null),it.clear()},re=function(y){if(!y){de();return}L||(Ae("subscribe-monitor-pipeline",{id:Pp}).catch($=>{t("subscribe-monitor-pipeline failed: %o",$)}),L=()=>Ae("unsubscribe-monitor-pipeline",{id:Pp}))},de=function(){L&&(L().catch(()=>{}),L=null)},be=function(){te||(Ae("subscribe-ui-order",{id:Np}).catch(y=>{t("subscribe-ui-order failed: %o",y)}),te=()=>Ae("unsubscribe-ui-order",{id:Np}))},ct=function(){te&&(te().catch(()=>{}),te=null),C.clear()},Ye=function(){Xe||(Ae("subscribe-display-policy",{id:qp}).catch(y=>{t("subscribe-display-policy failed: %o",y)}),Xe=()=>Ae("unsubscribe-display-policy",{id:qp}))},bt=function(){Xe&&(Xe().catch(()=>{}),Xe=null),ge.clear()},yt=function(){St||(Ae("subscribe-impl-presets",{id:Fp}).catch(y=>{t("subscribe-impl-presets failed: %o",y)}),St=()=>Ae("unsubscribe-impl-presets",{id:Fp}))},Lt=function(y){if(!y)return"Unknown";let $=y.split("/").filter(Boolean);return $.length>0?$[$.length-1]:"Unknown"};var f=se,g=P,w=H,A=X,D=Je,W=mt,V=gt,Y=Ve,N=Ne,M=lt,q=qe,U=S,E=I,R=k,Z=re,$e=de,ue=be,me=ct,Q=Ye,Re=bt,we=yt,oe=Lt;let ae=document.getElementById("header-loading"),xe=sc(ae),F=Hu(e),ie=Op(),Ae=xe.wrapSend((y,$)=>ie.send(y,$)),Se=Zl(Ae),Ie=Ql(),he=ec(),it=Jl(),_t=Ml(),C=Xl(),ge=Il(),ke=Pl(),Le=Dl();ie.on("impl-presets-snapshot",y=>{let $=y;$&&typeof $.revision=="number"&&Array.isArray($.presets)&&ke.set({revision:$.revision,presets:$.presets})}),ie.on("monitor-pipeline-snapshot",y=>{let $=y;if(!(!$||!Array.isArray($.workspaces)))try{_t.set($.workspaces,$.workspaces_state)}catch{}}),ie.on("ui-order-snapshot",y=>{let $=y;if($&&typeof $.revision=="number")try{C.set({revision:$.revision,order:$.order&&typeof $.order=="object"?$.order:{}})}catch{}}),ie.on("display-policy-snapshot",y=>{let $=y;if($&&$.policy&&typeof $.policy=="object")try{ge.set($.policy)}catch{}}),ie.on("session-log-snapshot",y=>{let $=y;if($&&typeof $.id=="string")try{Le.set($.id,Array.isArray($.lines)?$.lines:[],typeof $.last_event_at=="number"?$.last_event_at:null)}catch{}}),ie.on("session-log-append",y=>{let $=y;if($&&typeof $.id=="string")try{Le.append($.id,$.event)}catch{}}),ie.on("snapshot",y=>{let $=y,le=$&&typeof $.id=="string"?$.id:"",ye=le?Ie.getStore(le):null;if(ye&&$&&$.type==="snapshot")try{ye.applyPush($)}catch{}}),ie.on("upsert",y=>{let $=y,le=$&&typeof $.id=="string"?$.id:"",ye=le?Ie.getStore(le):null;if(ye&&$&&$.type==="upsert")try{ye.applyPush($)}catch{}}),ie.on("delete",y=>{let $=y,le=$&&typeof $.id=="string"?$.id:"",ye=le?Ie.getStore(le):null;if(ye&&$&&$.type==="delete")try{ye.applyPush($)}catch{}});let Me=null,Be=null,z=null,K=null,De=()=>{},Qe=new Promise(y=>{De=()=>y(void 0)}),We=!1,ve=!1;async function J(y){let $=P(y);if($===Be||$===z)return;z=$;let le=`detail:${y}`,ye={type:"issue-detail",params:{id:y}};try{Ie.register(le,ye)}catch(Ke){t("register detail store failed: %o",Ke)}try{let Ke=await Se.subscribeList(le,ye);if(et.getState().selected_id!==y||P(y)!==$){await Ke().catch(()=>{});return}Me&&await Me().catch(()=>{}),Me=Ke,Be=$}catch(Ke){t("detail subscribe failed: %o",Ke),se(Ke,"issue details")}finally{z===$&&(z=null)}}let Pe=new Map,tt=new Set,st={board:0,worker:0},vt=!1,ot=nn;try{let y=window.localStorage.getItem(jp);cn(y)&&(ot=y)}catch{}let ut=nn;try{let y=window.localStorage.getItem(Gb);cn(y)&&(ut=y)}catch{}async function He(y){if(!cn(y)||y===ot)return;ot=y;try{window.localStorage.setItem(jp,y)}catch{}let $=Pe.get(Yn);if(!$)return;Pe.delete(Yn),await $().catch(()=>{});let le=gt();try{Ie.register(Yn,le)}catch(ye){t("register %s store failed: %o",Yn,ye)}try{let ye=await Se.subscribeList(Yn,le);Pe.set(Yn,ye)}catch(ye){t("re-subscribe %s failed: %o",Yn,ye),se(ye,"board")}}async function wt(y){if(!cn(y)||y===ut)return;ut=y;let $=G.get(Kn);if(!$)return;G.delete(Kn),await $().catch(()=>{});let le=Ve();try{Ie.register(Kn,le)}catch(ye){t("register %s store failed: %o",Kn,ye)}try{let ye=await Se.subscribeList(Kn,le);G.set(Kn,ye)}catch(ye){t("re-subscribe %s failed: %o",Kn,ye),se(ye,"worker")}}let G=new Map,pe=null,L=null,te=null,Xe=null,St=null;async function Ct(){Xe=null,ge.clear(),St=null,ke.clear(),pe=null,L=null,Pe.clear(),G.clear(),st.board+=1,st.worker+=1,yt();let y=et.getState().workspace.current?.path;if(y)try{await ie.send("set-workspace",{path:y})}catch(le){t("workspace restore after reconnect failed: %o",le);return}Ye();let $=et.getState();Ne($.view==="board"),qe($.view==="worker"),re($.view==="monitor"),I($.view==="board"||$.view==="worker"||!!$.selected_id)}async function zt(){t("clearing all subscriptions for workspace switch"),lt(),S(),k(),he.clear(),ct(),be(),bt(),Ye(),H();let y=et.getState();if(y.selected_id)try{Ie.unregister(`detail:${y.selected_id}`)}catch{}let $=et.getState();Ne($.view==="board"),qe($.view==="worker"),re($.view==="monitor"),I($.view==="board"||$.view==="worker"||!!$.selected_id),$.selected_id&&X($.selected_id)}async function Nt(y){t("requesting workspace switch to %s",y),ve=!0;try{let $=await ie.send("set-workspace",{path:y});t("workspace switch result: %o",$),$&&$.workspace&&(et.setState({workspace:{current:{path:$.workspace.root_dir,database:$.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",y),$.changed&&(await zt(),ce("Switched to "+Lt(y),"success",2e3)))}catch($){throw t("workspace switch failed: %o",$),ce("Failed to switch workspace","error",3e3),$}finally{ve=!1}}async function Mt(y){t("requesting workspace git pull for %s",y);try{let $=await ie.send("git-pull-workspace",{});t("workspace git pull result: %o",$);let le=$?.status;if(le==="up_to_date"){ce("Already up to date","success",2e3);return}if(le==="stash_pop_conflict"){ce("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ce("Git pulled "+Lt(y),"success",2e3)}catch($){t("workspace git pull failed: %o",$);let le=$?.code,ye=$?.message;if(le==="rebase_conflict"){ce("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(le==="rebase_conflict_abort_failed"){ce("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(le==="busy"){ce("Git pull skipped: another operation is running","warning",3e3);return}let Ke=ye?`: ${ye}`:"";throw ce(`Git pull failed${Ke}`,"error",3e3),$}}async function Ft(y,$){t("setting workspace visibility %s \u2192 %s",y,String($));try{await ie.send("set-workspace-visibility",{path:y,visible:$}),await Ue()}catch(le){t("workspace visibility update failed: %o",le),ce("Failed to update project visibility","error",3e3)}}async function Ue(){try{let y=await ie.send("list-workspaces",{});if(t("workspaces loaded: %o",y),y&&Array.isArray(y.workspaces)){let $=y.workspaces.map(Oe=>({path:Oe.path,database:Oe.database,pid:Oe.pid,version:Oe.version})),le=y.current?{path:y.current.root_dir,database:y.current.db_path}:null,ye=Array.isArray(y.hidden)?y.hidden.filter(Oe=>typeof Oe=="string"):[];et.setState({workspace:{current:le,available:$,hidden:ye}});let Ke=window.localStorage.getItem("beads-ui.workspace");Ke&&(!$.some(c=>c.path===Ke)||ye.includes(Ke)?window.localStorage.removeItem("beads-ui.workspace"):le&&Ke!==le.path&&(t("restoring saved workspace preference: %s",Ke),await Nt(Ke)))}}catch(y){t("failed to load workspaces: %o",y)}}ie.on("workspace-changed",y=>{t("workspace-changed event: %o",y),y&&y.root_dir&&(et.setState({workspace:{current:{path:y.root_dir,database:y.db_path}}}),Ue(),zt())});let Ut=!1;if(typeof ie.onConnection=="function"){let y=$=>{t("ws state %s",$),$==="reconnecting"||$==="closed"?(Ut=!0,ce("Connection lost. Reconnecting\u2026","error",4e3)):$==="open"&&Ut&&(Ut=!1,ce("Reconnected","success",2200),Hb(et,(le,ye)=>{t(`${le}: %o`,ye)}),Ct())};ie.onConnection(y)}let Ht="board";try{let y=window.localStorage.getItem("beads-ui.view");(y==="board"||y==="worker"||y==="monitor")&&(Ht=y)}catch(y){t("view parse error: %o",y)}let et=rc({config:zb(),view:Ht});ie.on("worker-queue-snapshot",y=>{let $=y;if(!$||!$.queue)return;let le=et.getState().workspace.current?.path;if(typeof le=="string"&&le.length>0&&$.root_dir!==le){t("dropping worker-queue snapshot for %s",String($.root_dir));return}try{he.set($.queue)}catch{}}),ie.on("worker-parallel-analysis-snapshot",y=>{let $=y;if(!$)return;let le=et.getState().workspace.current?.path;if(!(typeof le=="string"&&le.length>0&&typeof $.root_dir=="string"&&$.root_dir!==le))try{it.set({settings:$.settings,job:$.job??null,runs:Array.isArray($.runs)?$.runs:[],last_good:$.last_good??null})}catch{}});let Wt=tc(et);Wt.start();let Fe=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),T=async(y,$)=>{try{return await Ae(y,$)}catch(le){if(Fe.has(y))throw le;return[]}};qd({global_element:r,repo_element:s},et,Wt);let fe=document.getElementById("workspace-picker");fe&&Cp(fe,et,Nt,Mt,Ft);let Te=Ud(e,(y,$)=>Ae(y,$));try{let y=document.getElementById("new-issue-btn");y&&y.addEventListener("click",()=>Te.open())}catch{}let at=Gd(e,{policyStore:ge,queueStore:he,implPresetStore:ke,transport:(y,$)=>Ae(y,$),onOpenChange:y=>{let $=vt;vt=y,mt(),$&&y===!1&&b.refreshSessionDefaults()},labelOptions:()=>{let y=new Set;for(let[$]of qi)for(let le of Ie.snapshotFor($)||[]){let ye=le.labels;if(Array.isArray(ye))for(let Ke of ye)typeof Ke=="string"&&Ke.length>0&&y.add(Ke)}return Array.from(y).sort()}});try{let y=document.getElementById("display-settings-btn");y&&(y.setAttribute("aria-label","\uC124\uC815"),y.setAttribute("title","\uC124\uC815"),y.addEventListener("click",()=>at.open()))}catch{}let Rt=gc(i,{gotoIssue:y=>Wt.gotoIssue(y),issueStores:Ie,transport:T,workerQueueStore:he,uiOrderStore:C,displayPolicyStore:ge,closedRange:ot,onClosedRangeChange:y=>{He(y)},onNewIssue:()=>Te.open()}),b=Mi(u,{transport:T,issueStores:Ie,queueStore:he,analysisStore:it,sessionLogStore:Le,uiOrderStore:C,gotoIssue:y=>et.setState({selected_id:y}),getWorkspacePath:()=>et.getState().workspace.current?.path,doneRange:ut,onDoneRangeChange:y=>{wt(y)}}),h=Nd(d,{transport:T,pipelineStore:_t,execPresetStore:ke,sessionLogStore:Le,router:Wt,gotoIssue:y=>Wt.gotoIssue(y),getWorkspacePath:()=>et.getState().workspace.current?.path,switchWorkspace:y=>Nt(y)}),x=zu(p,{issueStores:Ie,transport:T,queueStore:he,execPresetStore:ke,sessionLogStore:Le,getWorkspacePath:()=>et.getState().workspace.current?.path,onNavigate:y=>{et.getState().view==="worker"?et.setState({selected_id:y}):Wt.gotoIssue(y)},onClose:()=>{let y=et.getState();et.setState({selected_id:null});try{Wt.gotoView(y.view==="worker"||y.view==="monitor"?y.view:"board")}catch{}},onOpenExecPresets:()=>{at.open("execution")}}),O=et.getState().selected_id;O&&(p.hidden=!1,x.load(O),X(O)),et.subscribe(y=>{let $=y.selected_id;$?(p.hidden=!1,x.load($),ve||X($)):(x.clear(),p.hidden=!0,H())});let ee=y=>{i.hidden=y.view!=="board",u.hidden=y.view!=="worker",d.hidden=y.view!=="monitor",o&&o.classList.toggle("is-quiet",y.view==="monitor"),Ne(y.view==="board"),qe(y.view==="worker"),re(y.view==="monitor"),I(y.view==="board"||y.view==="worker"||vt||!!y.selected_id),!y.selected_id&&y.view==="board"&&Rt.load(),y.view==="worker"&&b.load(),y.view==="monitor"?h.load():h.pause(),window.localStorage.setItem("beads-ui.view",y.view)};et.subscribe(ee),ee(et.getState()),be(),Ye(),yt(),Ue().finally(()=>{We=!0,De()}),window.addEventListener("keydown",y=>{let $=y.ctrlKey||y.metaKey,le=String(y.key||"").toLowerCase(),ye=y.target,Ke=ye&&ye.tagName?String(ye.tagName).toLowerCase():"",Oe=Ke==="input"||Ke==="textarea"||Ke==="select"||ye&&typeof ye.isContentEditable=="boolean"&&ye.isContentEditable;$&&le==="n"&&(Oe||(y.preventDefault(),Te.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Vb(t)});export{Vb as bootstrap,zb as readBootstrapConfig,Hb as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
