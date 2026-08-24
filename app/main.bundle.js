var df=Object.create;var ba=Object.defineProperty;var pf=Object.getOwnPropertyDescriptor;var ff=Object.getOwnPropertyNames;var _f=Object.getPrototypeOf,mf=Object.prototype.hasOwnProperty;var gf=(e,t,n)=>t in e?ba(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ya=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var hf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of ff(t))!mf.call(e,s)&&s!==n&&ba(e,s,{get:()=>t[s],enumerable:!(r=pf(t,s))||r.enumerable});return e};var bf=(e,t,n)=>(n=e!=null?df(_f(e)):{},hf(t||!e||!e.__esModule?ba(n,"default",{value:e,enumerable:!0}):n,e));var $t=(e,t,n)=>gf(e,typeof t!="symbol"?t+"":t,n);var Wl=ya((gy,Ul)=>{var Ar=1e3,Sr=Ar*60,Er=Sr*60,ar=Er*24,wf=ar*7,kf=ar*365.25;Ul.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return $f(e);if(n==="number"&&isFinite(e))return t.long?Af(e):xf(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function $f(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*kf;case"weeks":case"week":case"w":return n*wf;case"days":case"day":case"d":return n*ar;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Er;case"minutes":case"minute":case"mins":case"min":case"m":return n*Sr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Ar;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function xf(e){var t=Math.abs(e);return t>=ar?Math.round(e/ar)+"d":t>=Er?Math.round(e/Er)+"h":t>=Sr?Math.round(e/Sr)+"m":t>=Ar?Math.round(e/Ar)+"s":e+"ms"}function Af(e){var t=Math.abs(e);return t>=ar?Zs(e,t,ar,"day"):t>=Er?Zs(e,t,Er,"hour"):t>=Sr?Zs(e,t,Sr,"minute"):t>=Ar?Zs(e,t,Ar,"second"):e+" ms"}function Zs(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Hl=ya((hy,zl)=>{function Sf(e){n.debug=n,n.default=n,n.coerce=c,n.disable=a,n.enable=s,n.enabled=i,n.humanize=Wl(),n.destroy=d,Object.keys(e).forEach(p=>{n[p]=e[p]}),n.names=[],n.skips=[],n.formatters={};function t(p){let f=0;for(let b=0;b<p.length;b++)f=(f<<5)-f+p.charCodeAt(b),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(p){let f,b=null,w,x;function N(...j){if(!N.enabled)return;let K=N,ee=Number(new Date),I=ee-(f||ee);K.diff=I,K.prev=f,K.curr=ee,f=ee,j[0]=n.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let P=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(H,S)=>{if(H==="%%")return"%";P++;let U=n.formatters[S];if(typeof U=="function"){let B=j[P];H=U.call(K,B),j.splice(P,1),P--}return H}),n.formatArgs.call(K,j),(K.log||n.log).apply(K,j)}return N.namespace=p,N.useColors=n.useColors(),N.color=n.selectColor(p),N.extend=r,N.destroy=n.destroy,Object.defineProperty(N,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(w!==n.namespaces&&(w=n.namespaces,x=n.enabled(p)),x),set:j=>{b=j}}),typeof n.init=="function"&&n.init(N),N}function r(p,f){let b=n(this.namespace+(typeof f>"u"?":":f)+p);return b.log=this.log,b}function s(p){n.save(p),n.namespaces=p,n.names=[],n.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of f)b[0]==="-"?n.skips.push(b.slice(1)):n.names.push(b)}function o(p,f){let b=0,w=0,x=-1,N=0;for(;b<p.length;)if(w<f.length&&(f[w]===p[b]||f[w]==="*"))f[w]==="*"?(x=w,N=b,w++):(b++,w++);else if(x!==-1)w=x+1,N++,b=N;else return!1;for(;w<f.length&&f[w]==="*";)w++;return w===f.length}function a(){let p=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),p}function i(p){for(let f of n.skips)if(o(p,f))return!1;for(let f of n.names)if(o(p,f))return!0;return!1}function c(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}zl.exports=Sf});var Gl=ya((Xt,Qs)=>{Xt.formatArgs=Tf;Xt.save=Cf;Xt.load=Rf;Xt.useColors=Ef;Xt.storage=Of();Xt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Xt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Ef(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Tf(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Qs.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}Xt.log=console.debug||console.log||(()=>{});function Cf(e){try{e?Xt.storage.setItem("debug",e):Xt.storage.removeItem("debug")}catch{}}function Rf(){let e;try{e=Xt.storage.getItem("debug")||Xt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Of(){try{return localStorage}catch{}}Qs.exports=Hl()(Xt);var{formatters:If}=Qs.exports;If.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Zr=globalThis,zs=Zr.trustedTypes,El=zs?zs.createPolicy("lit-html",{createHTML:e=>e}):void 0,wa="$lit$",Tn=`lit$${Math.random().toFixed(9).slice(2)}$`,ka="?"+Tn,yf=`<${ka}>`,nr=document,Qr=()=>nr.createComment(""),Xr=e=>e===null||typeof e!="object"&&typeof e!="function",$a=Array.isArray,Ll=e=>$a(e)||typeof e?.[Symbol.iterator]=="function",va=`[ 	
\f\r]`,Yr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Tl=/-->/g,Cl=/>/g,er=RegExp(`>|${va}(?:([^\\s"'>=/]+)(${va}*=${va}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Rl=/'/g,Ol=/"/g,Ml=/^(?:script|style|textarea|title)$/i,xa=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),u=xa(1),xr=xa(2),cy=xa(3),un=Symbol.for("lit-noChange"),Lt=Symbol.for("lit-nothing"),Il=new WeakMap,tr=nr.createTreeWalker(nr,129);function Pl(e,t){if(!$a(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return El!==void 0?El.createHTML(t):t}var Dl=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Yr;for(let i=0;i<n;i++){let c=e[i],d,p,f=-1,b=0;for(;b<c.length&&(a.lastIndex=b,p=a.exec(c),p!==null);)b=a.lastIndex,a===Yr?p[1]==="!--"?a=Tl:p[1]!==void 0?a=Cl:p[2]!==void 0?(Ml.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=er):p[3]!==void 0&&(a=er):a===er?p[0]===">"?(a=s??Yr,f=-1):p[1]===void 0?f=-2:(f=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?er:p[3]==='"'?Ol:Rl):a===Ol||a===Rl?a=er:a===Tl||a===Cl?a=Yr:(a=er,s=void 0);let w=a===er&&e[i+1].startsWith("/>")?" ":"";o+=a===Yr?c+yf:f>=0?(r.push(d),c.slice(0,f)+wa+c.slice(f)+Tn+w):c+Tn+(f===-2?i:w)}return[Pl(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Jr=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[d,p]=Dl(t,n);if(this.el=e.createElement(d,r),tr.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=tr.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(wa)){let b=p[a++],w=s.getAttribute(f).split(Tn),x=/([.?@])?(.*)/.exec(b);c.push({type:1,index:o,name:x[2],strings:w,ctor:x[1]==="."?Gs:x[1]==="?"?Vs:x[1]==="@"?Ks:sr}),s.removeAttribute(f)}else f.startsWith(Tn)&&(c.push({type:6,index:o}),s.removeAttribute(f));if(Ml.test(s.tagName)){let f=s.textContent.split(Tn),b=f.length-1;if(b>0){s.textContent=zs?zs.emptyScript:"";for(let w=0;w<b;w++)s.append(f[w],Qr()),tr.nextNode(),c.push({type:2,index:++o});s.append(f[b],Qr())}}}else if(s.nodeType===8)if(s.data===ka)c.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(Tn,f+1))!==-1;)c.push({type:7,index:o}),f+=Tn.length-1}o++}}static createElement(t,n){let r=nr.createElement("template");return r.innerHTML=t,r}};function rr(e,t,n=e,r){if(t===un)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=Xr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=rr(e,s._$AS(e,t.values),s,r)),t}var Hs=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??nr).importNode(n,!0);tr.currentNode=s;let o=tr.nextNode(),a=0,i=0,c=r[0];for(;c!==void 0;){if(a===c.index){let d;c.type===2?d=new $r(o,o.nextSibling,this,t):c.type===1?d=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(d=new Ys(o,this,t)),this._$AV.push(d),c=r[++i]}a!==c?.index&&(o=tr.nextNode(),a++)}return tr.currentNode=nr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},$r=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Lt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=rr(this,t,n),Xr(t)?t===Lt||t==null||t===""?(this._$AH!==Lt&&this._$AR(),this._$AH=Lt):t!==this._$AH&&t!==un&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ll(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Lt&&Xr(this._$AH)?this._$AA.nextSibling.data=t:this.T(nr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Jr.createElement(Pl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Hs(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Il.get(t.strings);return n===void 0&&Il.set(t.strings,n=new Jr(t)),n}k(t){$a(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(Qr()),this.O(Qr()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},sr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Lt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Lt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=rr(this,t,n,0),a=!Xr(t)||t!==this._$AH&&t!==un,a&&(this._$AH=t);else{let i=t,c,d;for(t=o[0],c=0;c<o.length-1;c++)d=rr(this,i[r+c],n,c),d===un&&(d=this._$AH[c]),a||(a=!Xr(d)||d!==this._$AH[c]),d===Lt?t=Lt:t!==Lt&&(t+=(d??"")+o[c+1]),this._$AH[c]=d}a&&!s&&this.j(t)}j(t){t===Lt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Gs=class extends sr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Lt?void 0:t}},Vs=class extends sr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Lt)}},Ks=class extends sr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=rr(this,t,n,0)??Lt)===un)return;let r=this._$AH,s=t===Lt&&r!==Lt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Lt&&(r===Lt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ys=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){rr(this,t)}},Nl={M:wa,P:Tn,A:ka,C:1,L:Dl,R:Hs,D:Ll,V:rr,I:$r,H:sr,N:Vs,U:Ks,B:Gs,F:Ys},vf=Zr.litHtmlPolyfillSupport;vf?.(Jr,$r),(Zr.litHtmlVersions??(Zr.litHtmlVersions=[])).push("3.3.1");var Ve=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new $r(t.insertBefore(Qr(),o),o,void 0,n??{})}return s._$AI(e),s};var sn="today",Bn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function dn(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function or(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ql(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Fl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function jl(){let e=null,t=[],n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],r()},clear(){e=null,t=[],r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Bl(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Vl=bf(Gl(),1);function Ct(e){return(0,Vl.default)(`beads-ui:${e}`)}function hn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ir(e,t){let n=hn(e.created_at),r=hn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Zl(e,t){let n=hn(e.created_at),r=hn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ql(e,t){let n=hn(e.updated_at),r=hn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Xl(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=hn(e.created_at),o=hn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Jl(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Lf=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Kl(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Yl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Lf.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function ec(e,t){let n=Kl(e),r=Kl(t);if(n!==r)return n<r?-1:1;let s=Yl(e),o=Yl(t);if(s!==o)return s<o?-1:1;let a=hn(e&&e.created_at),i=hn(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,d=t&&t.id;return c===d?0:String(c)<String(d)?-1:1}var Aa=2**20;function Tr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-hn(e&&e.created_at)}function Xs(e){return(t,n)=>{let r=Tr(t,e),s=Tr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Sa(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Tr(i,n)-Aa};if(!i)return{rank:Tr(a,n)+Aa};let c=Tr(a,n),d=Tr(i,n),p=(c+d)/2;return c<p&&p<d?{rank:p}:{renormalize:r.map((f,b)=>({bead_id:f.id,rank:b*Aa}))}}function Ea(e,t={}){let n=Ct(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||ir;function d(){for(let b of Array.from(a))try{b()}catch{}}function p(){s=Array.from(r.values()).sort(c)}function f(b){if(i||!b||b.id!==e)return;let w=Number(b.revision)||0;if(n("apply %s rev=%d",b.type,w),!(w<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(w<=o)return;r.clear();let x=Array.isArray(b.issues)?b.issues:[];for(let N of x)N&&typeof N.id=="string"&&N.id.length>0&&r.set(N.id,N);p(),o=w,d();return}if(b.type==="upsert"){let x=b.issue;if(x&&typeof x.id=="string"&&x.id.length>0){let N=r.get(x.id);if(!N)r.set(x.id,x);else{let j=Number.isFinite(N.updated_at)?N.updated_at:0,K=Number.isFinite(x.updated_at)?x.updated_at:0;if(j<=K){for(let ee of Object.keys(N))ee in x||delete N[ee];for(let[ee,I]of Object.entries(x))N[ee]=I}}p()}o=w,d()}else if(b.type==="delete"){let x=String(b.issue_id||"");x&&(r.delete(x),p()),o=w,d()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:f,snapshot(){return s},size(){return r.size},getById(b){return r.get(b)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function Js(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function tc(e){let t=Ct("subs"),n=new Map,r=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let d=r.get(i);if(!d||d.size===0)return;let p=Array.isArray(c.added)?c.added:[],f=Array.isArray(c.updated)?c.updated:[],b=Array.isArray(c.removed)?c.removed:[];for(let w of Array.from(d)){let x=n.get(w);if(!x)continue;let N=x.itemsById;for(let j of p)typeof j=="string"&&j.length>0&&N.set(j,!0);for(let j of f)typeof j=="string"&&j.length>0&&N.set(j,!0);for(let j of b)typeof j=="string"&&j.length>0&&N.delete(j)}}async function o(i,c){let d=Js(c);if(t("subscribe %s key=%s",i,d),!n.has(i))n.set(i,{key:d,itemsById:new Map});else{let f=n.get(i);if(f&&f.key!==d){let b=r.get(f.key);b&&(b.delete(i),b.size===0&&r.delete(f.key)),n.set(i,{key:d,itemsById:new Map})}}r.has(d)||r.set(d,new Set);let p=r.get(d);p&&p.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(f){let b=n.get(i)||null;if(b){let w=r.get(b.key);w&&(w.delete(i),w.size===0&&r.delete(b.key))}throw n.delete(i),f}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let f=n.get(i)||null;if(f){let b=r.get(f.key);b&&(b.delete(i),b.size===0&&r.delete(f.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Js,selectors:{getIds(i){let c=n.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let d=n.get(i);return d?d.itemsById.has(c):!1},count(i){let c=n.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=n.get(i),d={};if(!c)return d;for(let p of c.itemsById.keys())d[p]=!0;return d}}}}function nc(){let e=Ct("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let c of Array.from(r))try{c()}catch{}}function a(c,d,p){let f=d?Js(d):"",b=n.get(c)||"",w=t.has(c);if(e("register %s key=%s (prev=%s)",c,f,b),w&&b&&f&&b!==f){let x=t.get(c);if(x)try{x.dispose()}catch{}let N=s.get(c);if(N){try{N()}catch{}s.delete(c)}let j=Ea(c,p);t.set(c,j);let K=j.subscribe(()=>o());s.set(c,K)}else if(!w){let x=Ea(c,p);t.set(c,x);let N=x.subscribe(()=>o());s.set(c,N)}return n.set(c,f),()=>i(c)}function i(c){e("unregister %s",c),n.delete(c);let d=t.get(c);d&&(d.dispose(),t.delete(c));let p=s.get(c);if(p){try{p()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let d=t.get(c);return d?d.snapshot().slice():[]},subscribe(c){return r.add(c),()=>r.delete(c)}}}function rc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function sc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function oc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ta(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Mf(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Pf(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function ac(e){let t=Ct("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Mf(r),a=Pf(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ta(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ta(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var Df=Object.freeze({workspace_config:{default_workspace:null}});function ic(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Df.workspace_config.default_workspace}}}function lc(e={}){let t=Ct("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:ic(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?ic(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==n.workspace.hidden[p]),c=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===n.worker.show_closed_children[p])&&!i&&!c||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function cc(e){let t=Ct("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let d=n>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let d=n;n=Math.max(0,n-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,n),o()}function c(d){return async(f,b)=>{let w=s++,x=Date.now();r.set(w,{type:f,start_ts:x}),t("request start id=%d type=%s count=%d",w,f,n+1),a();let N=!1,j=()=>{N||(N=!0,r.delete(w),i())},K=setTimeout(()=>{N||(t("request TIMEOUT id=%d type=%s elapsed=%dms",w,f,Date.now()-x),j())},3e4);try{let ee=await d(f,b),I=Date.now()-x;return t("request done id=%d type=%s elapsed=%dms",w,f,I),ee}catch(ee){let I=Date.now()-x;throw t("request error id=%d type=%s elapsed=%dms err=%o",w,f,I,ee),ee}finally{clearTimeout(K),j()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let d=Date.now();return Array.from(r.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:d-f.start_ts}))}}}function de(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function eo(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(Jl),c;switch(i){case"created_desc":return c.sort(ir),c;case"created_asc":return c.sort(Zl),c;case"updated_desc":return c.sort(Ql),c;case"priority":return c.sort(Xl),c;case"manual":default:{let d=n();return d?c.sort(Xs(d)):c.sort(ir),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function An(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Wt(e){let t=An(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function on(e,t){let n=An(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function uc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=An(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function to(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function no(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=to(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function ro(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=uc(n);return{total:n.length,count:r,current:s,children:n}}function so(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let d of i)c[d.bead_id]=d.rank;n&&n.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!n)return;let d=n.get()||{revision:0,order:{}},p=r(Sa(i,c,d.order),a);s(d,p);let f=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(f&&f.conflict){let b={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(b);let w=r(Sa(i,c,b.order),a);s(b,w);let x=await t("ui-order-set",{expected_revision:b.revision,entries:w});x&&x.applied&&n.set({revision:typeof x.revision=="number"?x.revision:0,order:x.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function oo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ca(e,t){return!t||typeof e!="string"||e.length===0||oo(t.visible_labels).includes(e)?!0:oo(t.hidden_labels).includes(e)?!1:!oo(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function dc(e,t){return oo(e).filter(n=>Ca(n,t))}function Un(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function Nf(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function qf(e,t,n,r,s){return u`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function Ff(e,t,n,r){return u`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${Nf(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function ao(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(ec):a;return u`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?qf(t.parent_id,e.count,n,r,t.onToggle):u`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?u`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?u`<div class="board-card__roll-list">
            ${i.map((c,d)=>Ff(c,d+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var jf={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},fc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},pc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Bf={review:"\u2713",skip:"\u2298"},Wn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Uf(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function _c(e){let t=e&&e.fill||"none";return t==="none"?Wn.none:e&&e.stale===!0?Wn.stale:t==="dim"?Wn.dim:e&&e.glyph==="review"?Wn.review:e&&e.glyph==="skip"?Wn.skip:Wn.done}function Wf(e){if(!e||e.fill==="none"||!e.approval_state)return _c(e);let t=[];return e.glyph==="review"?t.push(Wn.review):e.glyph==="skip"&&t.push(Wn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function zf(e,t,n,r){let s=jf[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=Bf[t&&t.glyph||""]||"",c="bar";o==="dim"?c+=` b-${s} dim`:o==="full"&&(c+=` b-${s} full`),a&&(c+=" stale"),n&&(c+=" cur");let d=o==="none"?"lbl":`lbl l-${s} on`,p=n?`color: var(--stage-${s}-on)`:"",f=fc[e]||e,b=r?mc(t):null;if(!b)return u`
      <div class="seg">
        <div class=${c} style=${p}>${i}</div>
        <div class=${d}>${f}</div>
      </div>
    `;let w=`${f} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${b.path}`;return u`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${w}
      title=${w}
      @click=${x=>{x.preventDefault(),x.stopPropagation(),r(x,b,e)}}
    >
      <div class=${c} style=${p}>${i}</div>
      <div class=${d}>${f}</div>
    </button>
  `}function mc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function io(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=pc[e.route]||pc.spec_backed,o=e.stages,a=Uf(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(d=>`${fc[d]||d} ${d==="plan"?Wf(o[d]||{}):_c(o[d]||{})}`).join(" \xB7 ")}`,c=!!r&&s.some(d=>mc(o[d]||{})!==null);return u`
    <div
      class="stp"
      role=${c?"group":"img"}
      aria-label=${i}
    >
      ${s.map(d=>zf(d,o[d]||{},d===a,r))}
    </div>
  `}function Hf(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var gc=2;function Gf(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(u`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,gc).join(", "),s=n.length-gc,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(u`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Ra(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function lo(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Cn(e){return`${e.kind}:${lo(e)}@${e.sha}`}function co(e,t){if(!e)return null;let n=Ra(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=Ra(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,d=t?` \xB7 exec_receipt ${Cn(t)}`:"";return{kind:e.kind,label:i,title:`${c}${d}`}}function hc(e,t){let n=co(e,t);return n?u`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Vf(e){if(!e)return null;let t=Ra(e.kind);return t?u`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Cn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Kf(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Un(n,"route")){let i=r.route_source==="derived";s.push(u`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&Un(n,"fast_track")&&s.push(u`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Un(n,"pr")){let i=r.pr.number;s.push(u`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=hc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(u`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Cn(i)}`}
        >${`exec ${i.kind==="delegated"?lo(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(u`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of dc(e.labels,n))s.push(u`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Un(n,"from")&&s.push(u`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Un(n,"blocked")&&s.push(...Gf(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Un(n,"blocked")&&s.push(u`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":u`<div class="board-card__chips">${s}</div>`}function Yf(e){let t=on(e.created_at),n=on(e.updated_at);return!t&&!n?"":u`<span class="board-card__times">
    ${t?u`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Wt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?u`<span class="board-card__time-sep">·</span>`:""}
    ${n?u`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Wt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function Zf(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return ao(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Yf(e),empty_label:"children \uC5C6\uC74C",childChips:Oa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function Oa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return co(t,n)?u`<span class="board-card__roll-child-chips">
    ${hc(t,n)}
    ${Vf(n)}
  </span>`:null}function uo(e,t){let n=Hf(e.priority);return u`
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
        ${n?u`<span class="board-card__pri">${n}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Kf(e,t)}
      ${e.workflow&&Un(t.policy||null,"stepper")?io(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Zf(e,t)}
    </article>
  `}function Cr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return u`
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
        ${r?u`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${Bn.map(o=>u`<option
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
        ${e.items.map(o=>uo(o,t))}
      </div>
    </section>
  `}function bc(e,t,n){return u`
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
          ${e.items.length===0?u`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>uo(r,t))}
        </div>
      </div>
    </dialog>
  `}var Qf=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Xf=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Jf=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function e_(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return u`
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
      ${n.label_menu_open?u`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?u`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(o=>u`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${r>0?u`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function yc(e,t,n){return u`
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
        ${Qf.map(r=>u`<option
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
        ${Xf.map(r=>u`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${e_(e,t,n)}
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
        ${Jf.map(r=>u`<option
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
  `}var t_=200,n_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},r_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),vc="beads-ui.board.sort",wc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function s_(){try{let e=window.localStorage.getItem(vc);if(e&&wc.has(e))return e}catch{}return"created_desc"}function kc(e,t){let n=Ct("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,f=t.openDoc,b=t.closedRange||sn,w=s?eo(s,a):null,x=so({transport:o,uiOrderStore:a}),N=[],j=[],K=[],ee=[],I=[],P=[],D=!1,H=0,S=s_(),U=new Map,B=new Map,ye=new Map,$e=new Set,te={search:"",priority:"",type:"",labels:[]},Y=!1,xe=null;function Oe(Q){return String(Q.status||"open")==="open"}function ne(Q){let le=String(Q.status||"open");return le==="open"||le==="blocked"}function ie(Q){let le=te.search.trim().toLowerCase(),qe=te.priority,E=te.type,h=te.labels;return Q.filter(A=>{if(le){let F=String(A.id||"").toLowerCase(),oe=String(A.title||"").toLowerCase();if(!F.includes(le)&&!oe.includes(le))return!1}if(qe!==""&&String(A.priority)!==qe||E!==""&&String(A.issue_type||"")!==E)return!1;if(h.length>0){let F=Array.isArray(A.labels)?A.labels:[];if(!h.some(oe=>F.includes(oe)))return!1}return!0})}function Ce(){let Q=new Set;for(let le of[N,j,K,ee,I,P])for(let qe of le){let E=Array.isArray(qe.labels)?qe.labels:[];for(let h of E)typeof h=="string"&&h.length>0&&Q.add(h)}return Array.from(Q).sort()}function W(){return te.search.trim()!==""||te.priority!==""||te.type!==""||te.labels.length>0}function X(){try{if(w){let Q=w.selectBoardColumn("tab:board:in-progress","in_progress",S),le=w.selectBoardColumn("tab:board:blocked","blocked",S).filter(ne),qe=new Set(Q.map(Ee=>Ee.id)),E=w.selectBoardColumn("tab:board:ready","ready",S).filter(Ee=>Oe(Ee)&&!qe.has(Ee.id)),h=w.selectBoardColumn("tab:board:resolved","resolved",S),A=w.selectBoardColumn("tab:board:deferred","deferred",S),F=w.selectBoardColumn("tab:board:closed","closed").slice(0,t_),oe=[...le,...E,...Q,...h,...F];_e(oe);let ae=new Set;for(let Ee of oe)Ee&&Ee.id&&!to(Ee)&&ae.add(Ee.id);let ve=!W();N=ve?es(le,ae):le,j=ve?es(E,ae):E,K=ve?es(Q,ae):Q,ee=ve?es(h,ae):h,I=A,H=A.length,P=ve?es(F,ae):F,U=new Map;for(let Ee of N)U.set(Ee.id,"open");for(let Ee of j)U.set(Ee.id,"open");for(let Ee of K)U.set(Ee.id,"in_progress");for(let Ee of ee)U.set(Ee.id,"resolved");for(let Ee of I)U.set(Ee.id,"deferred");for(let Ee of P)U.set(Ee.id,"closed");B=new Map;for(let Ee of N)B.set(Ee.id,"blocked-col");for(let Ee of j)B.set(Ee.id,"ready-col");for(let Ee of K)B.set(Ee.id,"in-progress-col");for(let Ee of ee)B.set(Ee.id,"resolved-col");for(let Ee of P)B.set(Ee.id,"closed-col")}ut()}catch{N=[],j=[],K=[],ee=[],I=[],P=[],ye=new Map,ut()}}function _e(Q){ye=no(Q)}function Se(Q){return ro(ye,Q)}function he(Q){return!$e.has(Q)}function Be(Q,le){Q.preventDefault(),Q.stopPropagation(),$e.has(le)?$e.delete(le):$e.add(le),ut()}function we(Q,le){Q.preventDefault(),Q.stopPropagation(),r(le)}function Ze(Q,le){Q.preventDefault(),Q.stopPropagation(),r(le)}function lt(Q,le){xe||r(le)}function R(Q,le){Q.preventDefault(),Q.stopPropagation(),o_(le).then(qe=>{qe&&de("\uBCF5\uC0AC\uB428","success",1200)})}function ue(Q,le){xe=le,Q.dataTransfer&&(Q.dataTransfer.setData("text/plain",le),Q.dataTransfer.effectAllowed="move"),Q.target.classList.add("board-card--dragging")}function ke(Q){Q.target.classList.remove("board-card--dragging"),wt(),setTimeout(()=>{xe=null},0)}function Ae(Q){let le=String(Q.target.value||"");!le||le===b||(b=le,d&&d(le),ut())}function je(){return i?i.get():null}function De(Q){let le=c?c.get():null,qe=le?le.cleanup_failed:null;if(!qe||typeof qe!="object"||Array.isArray(qe))return null;let E=qe[Q];return!E||typeof E!="object"||Array.isArray(E)?null:E}let z={onCardClick:lt,onCopyId:R,onDragStart:ue,onDragEnd:ke,onClosedRangeChange:Ae,rollupFor:Se,isExpanded:he,onRollupToggle:Be,onChildClick:we,onFromChipClick:Ze,onOpenDoc:f?(Q,le)=>f(le):void 0,cleanupFailureFor:De,get policy(){return je()}};function V(Q,le){xe||(Ne(),r(le))}function Pe(Q,le){Q.preventDefault(),Q.stopPropagation(),Ne(),r(le)}let Ke={...z,onCardClick:V,onChildClick:Pe,onFromChipClick:Pe,onOpenDoc:f?(Q,le)=>{Ne(),f(le)}:void 0,get policy(){return je()}};function Ge(Q){let le=Q.target,qe=e.querySelector(".board-filter__labels");le&&qe&&qe.contains(le)||J()}function be(Q){Q.key==="Escape"&&J()}function L(){Y||(Y=!0,document.addEventListener("mousedown",Ge),document.addEventListener("keydown",be),ut())}function J(){Y&&(Y=!1,document.removeEventListener("mousedown",Ge),document.removeEventListener("keydown",be),ut())}function re(Q){Q.key==="Escape"&&Ne()}function G(){D||(D=!0,document.addEventListener("keydown",re),ut())}function Ne(){D&&(D=!1,document.removeEventListener("keydown",re),ut())}let Qe={onClose:Ne,onOverlayClick(Q){Q.target===Q.currentTarget&&Ne()}},ct={onSearchInput(Q){te.search=String(Q.target.value||""),X()},onPriorityChange(Q){te.priority=String(Q.target.value||""),X()},onTypeChange(Q){te.type=String(Q.target.value||""),X()},onSortChange(Q){let le=String(Q.target.value||"");if(!(!wc.has(le)||le===S)){S=le;try{window.localStorage.setItem(vc,le)}catch{}X()}},onDeferredToggle(){D?Ne():G()},onLabelMenuToggle(){Y?J():L()},onLabelToggle(Q){let le=te.labels.indexOf(Q);le===-1?te.labels.push(Q):te.labels.splice(le,1),X()},onLabelClear(){te.labels.length!==0&&(te.labels=[],X())},onNewIssue(){p&&p()}};function ot(){return u`
      <div class="board-view">
        ${yc(te,ct,{sort_mode:S,deferred_popup_open:D,deferred_count:H,label_options:Ce(),label_menu_open:Y})}
        <div class="board-root">
          ${Cr({title:"Blocked",id:"blocked-col",items:ie(N)},z)}
          ${Cr({title:"Ready",id:"ready-col",items:ie(j)},z)}
          ${Cr({title:"In progress",id:"in-progress-col",items:ie(K)},z)}
          ${Cr({title:"Resolved",id:"resolved-col",items:ie(ee)},z)}
          ${Cr({title:"Closed",id:"closed-col",items:ie(P),is_closed:!0,closed_range:b},z)}
        </div>
        ${D?bc({items:ie(I),count:H},Ke,Qe):""}
      </div>
    `}function ut(){Ve(ot(),e),ht()}function ht(){try{let Q=e.querySelector("#deferred-popup");Q&&!Q.open&&(typeof Q.showModal=="function"?Q.showModal():Q.setAttribute("open",""));let le=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let qe of le)Array.from(qe.querySelectorAll(".board-card")).forEach((h,A)=>{h.tabIndex=A===0?0:-1})}catch{}}async function bt(Q,le){if(!o){de("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:Q,status:le}),de("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(qe){n("update-status failed: %o",qe),de("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function tt(Q){switch(Q){case"blocked-col":return N;case"ready-col":return j;case"in-progress-col":return K;case"resolved-col":return ee;default:return[]}}function Tt(Q,le,qe){if(!o||!a)return;let E=tt(Q),h=E.find(ve=>ve.id===le);if(!h)return;let A=E.filter(ve=>ve.id!==le),F=qe.closest?qe.closest(".board-card"):null,oe=A.length;if(F){let ve=F.getAttribute("data-issue-id");if(ve===le)return;let Ee=A.findIndex(Je=>Je.id===ve);Ee>=0&&(oe=Ee)}let ae=A.slice();ae.splice(oe,0,h),x.applyReorder(le,ae,oe)}function wt(){for(let Q of Array.from(e.querySelectorAll(".board-column--drag-over")))Q.classList.remove("board-column--drag-over")}let He=null;e.addEventListener("dragover",Q=>{Q.preventDefault(),Q.dataTransfer&&(Q.dataTransfer.dropEffect="move");let qe=Q.target.closest(".board-column");qe&&qe!==He&&(He&&He.classList.remove("board-column--drag-over"),qe.classList.add("board-column--drag-over"),He=qe)}),e.addEventListener("dragleave",Q=>{let le=Q.relatedTarget;(!le||!e.contains(le))&&He&&(He.classList.remove("board-column--drag-over"),He=null)}),e.addEventListener("drop",Q=>{Q.preventDefault(),He&&(He.classList.remove("board-column--drag-over"),He=null);let le=Q.target,qe=le.closest(".board-column");if(!qe)return;let E=Q.dataTransfer?.getData("text/plain")||"";if(!E)return;let h=qe.id,A=B.get(E);if(A&&A===h){if(r_.has(h)){if(S!=="manual"){de("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Tt(h,E,le)}return}let F=n_[h];if(!F){de("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}U.get(E)!==F&&bt(E,F)}),e.addEventListener("keydown",Q=>{let le=Q.target;if(!(le instanceof HTMLElement))return;let qe=String(le.tagName||"").toLowerCase();if(qe==="input"||qe==="textarea"||qe==="select"||qe==="button"||qe==="a"||le.isContentEditable===!0)return;let E=le.closest(".board-card");if(!E)return;let h=String(Q.key||"");if(h==="Enter"||h===" "){Q.preventDefault();let ae=E.getAttribute("data-issue-id");ae&&r(ae);return}if(h!=="ArrowUp"&&h!=="ArrowDown"&&h!=="ArrowLeft"&&h!=="ArrowRight")return;Q.preventDefault();let A=E.closest(".board-column");if(!A)return;let F=Array.from(A.querySelectorAll(".board-card")),oe=F.indexOf(E);if(h==="ArrowDown"&&oe<F.length-1){ge(E,F[oe+1]);return}if(h==="ArrowUp"&&oe>0){ge(E,F[oe-1]);return}if(h==="ArrowLeft"||h==="ArrowRight"){let ae=Array.from(e.querySelectorAll(".board-column")),ve=ae.indexOf(A),Ee=h==="ArrowRight"?1:-1,Je=ve+Ee;for(;Je>=0&&Je<ae.length;){let rt=ae[Je].querySelector(".board-card");if(rt){ge(E,rt);return}Je+=Ee}}});function ge(Q,le){try{Q.tabIndex=-1,le.tabIndex=0,le.focus()}catch{}}let gt=null;w&&w.subscribe&&(gt=w.subscribe(()=>{try{X()}catch{}}));let kt=null;i&&i.subscribe&&(kt=i.subscribe(()=>{try{X()}catch{}}));let nt=null;return c&&c.subscribe&&(nt=c.subscribe(()=>{ut()})),{async load(){n("load"),X()},clear(){J(),Ne(),gt&&(gt(),gt=null),kt&&(kt(),kt=null),nt&&(nt(),nt=null),e.replaceChildren(),N=[],j=[],K=[],ee=[],I=[],P=[],U=new Map,B=new Map}}}function es(e,t){return e.filter(n=>{let r=to(n);return!(r&&t.has(r))})}async function o_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function an(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function lr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ts(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function a_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${lr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${lr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(c=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),c(p)};r.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Rn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await a_(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var i_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],$c={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},l_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Nt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ot(e){return typeof e=="string"&&e.length>0?e:null}function Rr(e){return e.startsWith("gpt-")?e.slice(4):e}function St(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Ac(e,t,n){let r=Ot(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Ot(n[e]);return s===null?null:{value:s,source:"global"}}function ns(e,t,n,r){return Ac(e,t,n)||{value:r,source:"base"}}function Ia(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&Nt(s?.[t])){let a=Ot(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Nt(s)){for(let a of Object.values(s))if(Nt(a)){let i=Ot(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Ot(r?.runners?.[o]?.models?.[e]?.id)||e}function c_(e,t){return Ot(t?.review?.reviewers?.[e]?.model)||e}function Or(e,t,n=!1){if(e==="default")return St(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Rr(e):e;return St(e,t,r,e,"explicit")}function Sc(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];Nt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(Nt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function u_(e,t){let n=[],r=e?.implementation?.model_catalog;Nt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(Nt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function d_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of u_(t,n)){let o=Sc(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function La(e){return St(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function xc(e,t,n){let r=Ac(e,t,n);return r?Or(r.value,r.source):St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Jt(e){let t=Nt(e.pin)?e.pin:{},n=Nt(e.global)?e.global:{},r=Nt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&Nt(r.session)?r.session:null,o=r?.supported===!0&&Nt(r.orchestration)?r.orchestration:null,a=Nt(e.runner_catalog)?e.runner_catalog:null,i=Ot(n.quick_fix_impl_model),c=d_(i,s,a),d={};if(s){let p=ns("workflow_mode",t,n,Ot(s.workflow_mode_default));d.workflow_mode=p.source==="base"?St(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):Or(p.value,p.source);for(let I of["spec_review","plan_review","impl_review"]){let P=`${I}_model`,D=Ot(I==="plan_review"?p.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),H=ns(P,t,n,D);if(H.value===null)d[P]=St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(H.value!=="self"&&H.value!=="skip"&&!Nt(s.review?.reviewers?.[H.value]))d[P]=La(St(H.value,H.source,"",null,"explicit"));else{let S=c_(H.value,s);d[P]=St(H.value,H.source,Rr(S),S,H.source==="base"?"default":"explicit")}}for(let[I,P]of Object.entries($c)){let D=d[P].value;if(D==="self"||D==="skip"){d[I]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let H=Ot(s.review?.reviewers?.[D||""]?.effort),S=ns(I,t,n,H);d[I]=S.value===null?St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):St(S.value,S.source,S.value,S.value,S.source==="base"?"default":"explicit")}let f=Nt(s.implementation?.default)?s.implementation.default:{},b=Ot(e.route),w=b!==null&&["quick_fix","spec_backed","full_plan"].includes(b),x=Nt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},N=w&&Nt(x[b])?x[b]:{};for(let I of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let P=ns(I,t,n,I==="impl_dispatch"?Ot(N.dispatch)||Ot(f.dispatch):Ot(f[I.replace("impl_","")]));d[I]=P.value===null?St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):St(P.value,P.source,P.value,P.value,P.source==="base"?"default":"explicit")}let j=Ot(t.impl_runtime),K=j==="inherit"?Ot(e.controller_runtime):j,ee=b==="quick_fix"&&Ot(t.impl_dispatch)===null&&c.runtime!==null&&(j===null||K===c.runtime);if(ee){let I=c.runtime,P=i;d.impl_dispatch=St("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),j===null&&(d.impl_runtime=St(I,"global",`${I} (\uC720\uB3C4)`,I,"explicit")),Ot(t.impl_model)===null&&(d.impl_model=St(P,"global",P,P,"explicit"))}if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let I of["impl_runtime","impl_model","impl_effort","impl_speed"])d[I]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(d.impl_dispatch.value==="delegated"&&!ee&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_model.value!==null){let I=d.impl_runtime.value==="inherit"?Ot(e.controller_runtime):d.impl_runtime.value,P=I?Sc(I,s,a):[];if(d.impl_model.value!=="auto"&&P.length>0&&!P.includes(d.impl_model.value))d.impl_model=La(d.impl_model);else{let D=Ia(d.impl_model.value,I,s,a);d.impl_model.display=Rr(D),d.impl_model.full_value=D}}if(d.impl_effort.value==="auto"){let I=Ot(e.transport)||(d.impl_runtime.value==="codex"?"codex-native-spawn":d.impl_runtime.value==="claude"?"implement-claude":null),P=I?Ot(s.implementation?.effort_by_transport?.[I]?.auto):null;P&&!l_.has(P)?(d.impl_effort.display=`${P} (\uBE44\uD638\uD658)`,d.impl_effort.full_value=P,d.impl_effort.resolution="incompatible"):(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}d.impl_speed.value==="default"&&(d.impl_speed=d.impl_speed.source==="base"?St("default","base","default (\uC77C\uBC18)","default","default"):Or("default",d.impl_speed.source))}}else for(let p of i_.filter(f=>!f.startsWith("orchestration_")))d[p]=xc(p,t,n);if(!s){for(let[p,f]of Object.entries($c))(d[f].value==="self"||d[f].value==="skip")&&(d[p]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])d[p]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else d.impl_dispatch.value==="delegated"&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_effort.value==="auto"&&(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){d[p]=xc(p,t,n);continue}let f=p.replace("orchestration_",""),b=Ot(o[f]),w=ns(p,t,n,b);if(p==="orchestration_effort"&&w.source==="base"){d[p]=St(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(w.value===null){d[p]=St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let x=w.source==="base"?Ot(o.model_id)||w.value:Ia(w.value,null,s,a);d[p]=St(w.value,w.source,Rr(x),x,w.source==="base"?"default":"explicit");continue}if(w.value==="default"){d[p]=w.source==="base"?St("default","base","default (\uC77C\uBC18)","default","default"):Or("default",w.source);continue}d[p]=Or(w.value,w.source)}if(s)if(i===null){let p=d.orchestration_model.full_value;d.quick_fix_impl_model=St(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Rr(p)})`,null,"default")}else if(c.runtime!==null){let p=Ia(i,c.runtime,s,a);d.quick_fix_impl_model=St(i,"global",Rr(p),p,"explicit")}else c.offered?d.quick_fix_impl_model=La(St(i,"global","",null,"explicit")):d.quick_fix_impl_model=Or(i,"global");return d}function p_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function po(e){let t=Nt(e.pin)?e.pin:{},n=Nt(e.global)?e.global:{},r=Nt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=f=>{let b={...r,...f};return Jt({pin:e.layer==="pin"?b:t,global:e.layer==="pin"?n:b,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],c=s(o)[e.key],d=Ot(o[e.key]),p=[...e.choices];return d!==null&&!p.includes(d)&&p.unshift(d),{unset_label:p_(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:p.map(f=>{let b=s({...o,[e.key]:f})[e.key];return{value:f,label:b.display,full_value:b.full_value}})}}function Ir(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let c=!1,d=f=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(f))},p=()=>d(r.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>d(null)),r.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),p())}),t.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}var Oc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var On=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],rs=[...On,"reasoning_output_tokens"],f_={codex:["implementation","review-consult"],claude:["subagent"]};function Ma(e){let t=0;for(let n of On)t+=Ft(e?.[n]);return t}function __(e){return!e||typeof e!="object"?!1:On.some(t=>Number.isFinite(e[t]))}function Ec(e){return!e||typeof e!="object"?!1:rs.some(t=>Number.isFinite(e[t]))}function m_(e){let t={};for(let n of rs)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Tc(e){let t={};for(let n of rs)Number.isFinite(e[n])&&(t[n]=e[n]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Cc(e,t){return e==="codex"?Ft(t.input_tokens)+Ft(t.output_tokens):Ma(t)}function g_(e){return e==="claude"?"Claude":"Codex"}function h_(e){return`\u03C4 ${Ic(e)}`}function b_(e,t){let n=t.breakdown||{},r=[`\uC785\uB825 ${Ft(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&r.push(`\uCD94\uB860\uCD9C\uB825 ${Ft(n.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,r.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Oc),o.join(`
`)}function zt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${g_(n)} ${h_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:b_(n,r)})}return t}function _o(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of rs)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=Ft(i.breakdown[c])+Ft(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Pa(e){return!e||typeof e!="object"?null:pn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function y_(e){return e==="codex"?"codex":"claude"}function Sn(){return{subtotal:0,breakdown:m_(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function fo(e,t,n){e.subtotal+=t.subtotal;for(let r of rs)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Ft(e.breakdown[r])+Ft(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Rc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Ic(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Lr(e){return __(e)?`\u03C4 ${Ic(Ma(e))}`:null}function In(e){let t=Lr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ss(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Ma(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Oc),n.join(`
`)}function pn(e,t){let n={claude:Sn(),codex:Sn()},r={orchestrator:{claude:Sn(),codex:Sn()},implementation:{claude:Sn(),codex:Sn()},"review-consult":{claude:Sn(),codex:Sn()},subagent:{claude:Sn(),codex:Sn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(Ec(c)){let p=y_(i.runner),f=Tc(c),b={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:f,subtotal:Cc(p,f)};f.replayed===!0&&(b.replayed=!0),typeof i.model=="string"&&(b.model=i.model),typeof i.session_id=="string"&&(b.session_id=i.session_id),fo(n[p],b,!0),fo(r.orchestrator[p],b,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of d){let f=p&&p.provider==="claude"?"claude":"codex";if(!p||p.provider!=="codex"&&p.provider!=="claude"||!f_[f].includes(p.role)||!Ec(p.usage))continue;let b=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!b||s.has(b))continue;s.add(b);let w=Tc(p.usage),x={provider:f,role:p.role,attempt_id:String(i.attempt_id||""),usage:w,subtotal:Cc(f,w)};x.receipt_id=b,typeof p.agent_type=="string"&&(x.agent_type=p.agent_type),typeof p.agent_id=="string"&&(x.agent_id=p.agent_id),typeof p.model=="string"&&(x.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(x.effort=p.effort),typeof p.session_id=="string"?x.session_id=p.session_id:typeof p.thread_id=="string"&&(x.session_id=p.thread_id),typeof p.turn_id=="string"&&(x.turn_id=p.turn_id),(typeof p.completed_at=="string"||typeof p.completed_at=="number"&&Number.isFinite(p.completed_at))&&(x.completed_at=p.completed_at),w.replayed===!0&&(x.replayed=!0),fo(n[f],x,!1),fo(r[x.role][f],x,!1)}}let o={};for(let i of["claude","codex"]){let c=n[i];if(c.legs.length===0)continue;let d=Rc(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(d.total_cost_usd=c.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let c={};for(let d of["claude","codex"]){let p=r[i][d];p.legs.length>0&&(c[d]={...Rc(p,!0),legs:p.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:Bc,setPrototypeOf:Lc,isFrozen:v_,getPrototypeOf:w_,getOwnPropertyDescriptor:k_}=Object,{freeze:Vt,seal:fn,create:Ua}=Object,{apply:Wa,construct:za}=typeof Reflect<"u"&&Reflect;Vt||(Vt=function(t){return t});fn||(fn=function(t){return t});Wa||(Wa=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});za||(za=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var mo=Kt(Array.prototype.forEach),$_=Kt(Array.prototype.lastIndexOf),Mc=Kt(Array.prototype.pop),os=Kt(Array.prototype.push),x_=Kt(Array.prototype.splice),ho=Kt(String.prototype.toLowerCase),Da=Kt(String.prototype.toString),Na=Kt(String.prototype.match),as=Kt(String.prototype.replace),A_=Kt(String.prototype.indexOf),S_=Kt(String.prototype.trim),bn=Kt(Object.prototype.hasOwnProperty),Gt=Kt(RegExp.prototype.test),is=E_(TypeError);function Kt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Wa(e,t,r)}}function E_(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return za(e,n)}}function st(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ho;Lc&&Lc(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(v_(t)||(t[r]=o),s=o)}e[s]=!0}return e}function T_(e){for(let t=0;t<e.length;t++)bn(e,t)||(e[t]=null);return e}function Ln(e){let t=Ua(null);for(let[n,r]of Bc(e))bn(e,n)&&(Array.isArray(r)?t[n]=T_(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Ln(r):t[n]=r);return t}function ls(e,t){for(;e!==null;){let r=k_(e,t);if(r){if(r.get)return Kt(r.get);if(typeof r.value=="function")return Kt(r.value)}e=w_(e)}function n(){return null}return n}var Pc=Vt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),qa=Vt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Fa=Vt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),C_=Vt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ja=Vt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),R_=Vt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Dc=Vt(["#text"]),Nc=Vt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ba=Vt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),qc=Vt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),go=Vt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),O_=fn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),I_=fn(/<%[\w\W]*|[\w\W]*%>/gm),L_=fn(/\$\{[\w\W]*/gm),M_=fn(/^data-[\-\w.\u00B7-\uFFFF]+$/),P_=fn(/^aria-[\-\w]+$/),Uc=fn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),D_=fn(/^(?:\w+script|data):/i),N_=fn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Wc=fn(/^html$/i),q_=fn(/^[a-z][.\w]*(-[.\w]+)+$/i),Fc=Object.freeze({__proto__:null,ARIA_ATTR:P_,ATTR_WHITESPACE:N_,CUSTOM_ELEMENT:q_,DATA_ATTR:M_,DOCTYPE_NAME:Wc,ERB_EXPR:I_,IS_ALLOWED_URI:Uc,IS_SCRIPT_OR_DATA:D_,MUSTACHE_EXPR:O_,TMPLIT_EXPR:L_}),cs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},F_=function(){return typeof window>"u"?null:window},j_=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},jc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function zc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:F_(),t=Me=>zc(Me);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==cs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:b,trustedTypes:w}=e,x=c.prototype,N=ls(x,"cloneNode"),j=ls(x,"remove"),K=ls(x,"nextSibling"),ee=ls(x,"childNodes"),I=ls(x,"parentNode");if(typeof a=="function"){let Me=n.createElement("template");Me.content&&Me.content.ownerDocument&&(n=Me.content.ownerDocument)}let P,D="",{implementation:H,createNodeIterator:S,createDocumentFragment:U,getElementsByTagName:B}=n,{importNode:ye}=r,$e=jc();t.isSupported=typeof Bc=="function"&&typeof I=="function"&&H&&H.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:te,ERB_EXPR:Y,TMPLIT_EXPR:xe,DATA_ATTR:Oe,ARIA_ATTR:ne,IS_SCRIPT_OR_DATA:ie,ATTR_WHITESPACE:Ce,CUSTOM_ELEMENT:W}=Fc,{IS_ALLOWED_URI:X}=Fc,_e=null,Se=st({},[...Pc,...qa,...Fa,...ja,...Dc]),he=null,Be=st({},[...Nc,...Ba,...qc,...go]),we=Object.seal(Ua(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ze=null,lt=null,R=Object.seal(Ua(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ue=!0,ke=!0,Ae=!1,je=!0,De=!1,z=!0,V=!1,Pe=!1,Ke=!1,Ge=!1,be=!1,L=!1,J=!0,re=!1,G="user-content-",Ne=!0,Qe=!1,ct={},ot=null,ut=st({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ht=null,bt=st({},["audio","video","img","source","image","track"]),tt=null,Tt=st({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),wt="http://www.w3.org/1998/Math/MathML",He="http://www.w3.org/2000/svg",ge="http://www.w3.org/1999/xhtml",gt=ge,kt=!1,nt=null,Q=st({},[wt,He,ge],Da),le=st({},["mi","mo","mn","ms","mtext"]),qe=st({},["annotation-xml"]),E=st({},["title","style","font","a","script"]),h=null,A=["application/xhtml+xml","text/html"],F="text/html",oe=null,ae=null,ve=n.createElement("form"),Ee=function(C){return C instanceof RegExp||C instanceof Function},Je=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ae&&ae===C)){if((!C||typeof C!="object")&&(C={}),C=Ln(C),h=A.indexOf(C.PARSER_MEDIA_TYPE)===-1?F:C.PARSER_MEDIA_TYPE,oe=h==="application/xhtml+xml"?Da:ho,_e=bn(C,"ALLOWED_TAGS")?st({},C.ALLOWED_TAGS,oe):Se,he=bn(C,"ALLOWED_ATTR")?st({},C.ALLOWED_ATTR,oe):Be,nt=bn(C,"ALLOWED_NAMESPACES")?st({},C.ALLOWED_NAMESPACES,Da):Q,tt=bn(C,"ADD_URI_SAFE_ATTR")?st(Ln(Tt),C.ADD_URI_SAFE_ATTR,oe):Tt,ht=bn(C,"ADD_DATA_URI_TAGS")?st(Ln(bt),C.ADD_DATA_URI_TAGS,oe):bt,ot=bn(C,"FORBID_CONTENTS")?st({},C.FORBID_CONTENTS,oe):ut,Ze=bn(C,"FORBID_TAGS")?st({},C.FORBID_TAGS,oe):Ln({}),lt=bn(C,"FORBID_ATTR")?st({},C.FORBID_ATTR,oe):Ln({}),ct=bn(C,"USE_PROFILES")?C.USE_PROFILES:!1,ue=C.ALLOW_ARIA_ATTR!==!1,ke=C.ALLOW_DATA_ATTR!==!1,Ae=C.ALLOW_UNKNOWN_PROTOCOLS||!1,je=C.ALLOW_SELF_CLOSE_IN_ATTR!==!1,De=C.SAFE_FOR_TEMPLATES||!1,z=C.SAFE_FOR_XML!==!1,V=C.WHOLE_DOCUMENT||!1,Ge=C.RETURN_DOM||!1,be=C.RETURN_DOM_FRAGMENT||!1,L=C.RETURN_TRUSTED_TYPE||!1,Ke=C.FORCE_BODY||!1,J=C.SANITIZE_DOM!==!1,re=C.SANITIZE_NAMED_PROPS||!1,Ne=C.KEEP_CONTENT!==!1,Qe=C.IN_PLACE||!1,X=C.ALLOWED_URI_REGEXP||Uc,gt=C.NAMESPACE||ge,le=C.MATHML_TEXT_INTEGRATION_POINTS||le,qe=C.HTML_INTEGRATION_POINTS||qe,we=C.CUSTOM_ELEMENT_HANDLING||{},C.CUSTOM_ELEMENT_HANDLING&&Ee(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(we.tagNameCheck=C.CUSTOM_ELEMENT_HANDLING.tagNameCheck),C.CUSTOM_ELEMENT_HANDLING&&Ee(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(we.attributeNameCheck=C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),C.CUSTOM_ELEMENT_HANDLING&&typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(we.allowCustomizedBuiltInElements=C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),De&&(ke=!1),be&&(Ge=!0),ct&&(_e=st({},Dc),he=[],ct.html===!0&&(st(_e,Pc),st(he,Nc)),ct.svg===!0&&(st(_e,qa),st(he,Ba),st(he,go)),ct.svgFilters===!0&&(st(_e,Fa),st(he,Ba),st(he,go)),ct.mathMl===!0&&(st(_e,ja),st(he,qc),st(he,go))),C.ADD_TAGS&&(typeof C.ADD_TAGS=="function"?R.tagCheck=C.ADD_TAGS:(_e===Se&&(_e=Ln(_e)),st(_e,C.ADD_TAGS,oe))),C.ADD_ATTR&&(typeof C.ADD_ATTR=="function"?R.attributeCheck=C.ADD_ATTR:(he===Be&&(he=Ln(he)),st(he,C.ADD_ATTR,oe))),C.ADD_URI_SAFE_ATTR&&st(tt,C.ADD_URI_SAFE_ATTR,oe),C.FORBID_CONTENTS&&(ot===ut&&(ot=Ln(ot)),st(ot,C.FORBID_CONTENTS,oe)),Ne&&(_e["#text"]=!0),V&&st(_e,["html","head","body"]),_e.table&&(st(_e,["tbody"]),delete Ze.tbody),C.TRUSTED_TYPES_POLICY){if(typeof C.TRUSTED_TYPES_POLICY.createHTML!="function")throw is('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof C.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw is('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');P=C.TRUSTED_TYPES_POLICY,D=P.createHTML("")}else P===void 0&&(P=j_(w,s)),P!==null&&typeof D=="string"&&(D=P.createHTML(""));Vt&&Vt(C),ae=C}},rt=st({},[...qa,...Fa,...C_]),Ye=st({},[...ja,...R_]),dt=function(C){let pe=I(C);(!pe||!pe.tagName)&&(pe={namespaceURI:gt,tagName:"template"});let Ie=ho(C.tagName),at=ho(pe.tagName);return nt[C.namespaceURI]?C.namespaceURI===He?pe.namespaceURI===ge?Ie==="svg":pe.namespaceURI===wt?Ie==="svg"&&(at==="annotation-xml"||le[at]):!!rt[Ie]:C.namespaceURI===wt?pe.namespaceURI===ge?Ie==="math":pe.namespaceURI===He?Ie==="math"&&qe[at]:!!Ye[Ie]:C.namespaceURI===ge?pe.namespaceURI===He&&!qe[at]||pe.namespaceURI===wt&&!le[at]?!1:!Ye[Ie]&&(E[Ie]||!rt[Ie]):!!(h==="application/xhtml+xml"&&nt[C.namespaceURI]):!1},Rt=function(C){os(t.removed,{element:C});try{I(C).removeChild(C)}catch{j(C)}},_t=function(C,pe){try{os(t.removed,{attribute:pe.getAttributeNode(C),from:pe})}catch{os(t.removed,{attribute:null,from:pe})}if(pe.removeAttribute(C),C==="is")if(Ge||be)try{Rt(pe)}catch{}else try{pe.setAttribute(C,"")}catch{}},tn=function(C){let pe=null,Ie=null;if(Ke)C="<remove></remove>"+C;else{let yt=Na(C,/^[\r\n\t ]+/);Ie=yt&&yt[0]}h==="application/xhtml+xml"&&gt===ge&&(C='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+C+"</body></html>");let at=P?P.createHTML(C):C;if(gt===ge)try{pe=new b().parseFromString(at,h)}catch{}if(!pe||!pe.documentElement){pe=H.createDocument(gt,"template",null);try{pe.documentElement.innerHTML=kt?D:at}catch{}}let xt=pe.body||pe.documentElement;return C&&Ie&&xt.insertBefore(n.createTextNode(Ie),xt.childNodes[0]||null),gt===ge?B.call(pe,V?"html":"body")[0]:V?pe.documentElement:xt},jt=function(C){return S.call(C.ownerDocument||C,C,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Mt=function(C){return C instanceof f&&(typeof C.nodeName!="string"||typeof C.textContent!="string"||typeof C.removeChild!="function"||!(C.attributes instanceof p)||typeof C.removeAttribute!="function"||typeof C.setAttribute!="function"||typeof C.namespaceURI!="string"||typeof C.insertBefore!="function"||typeof C.hasChildNodes!="function")},Bt=function(C){return typeof i=="function"&&C instanceof i};function Pt(Me,C,pe){mo(Me,Ie=>{Ie.call(t,C,pe,ae)})}let It=function(C){let pe=null;if(Pt($e.beforeSanitizeElements,C,null),Mt(C))return Rt(C),!0;let Ie=oe(C.nodeName);if(Pt($e.uponSanitizeElement,C,{tagName:Ie,allowedTags:_e}),z&&C.hasChildNodes()&&!Bt(C.firstElementChild)&&Gt(/<[/\w!]/g,C.innerHTML)&&Gt(/<[/\w!]/g,C.textContent)||C.nodeType===cs.progressingInstruction||z&&C.nodeType===cs.comment&&Gt(/<[/\w]/g,C.data))return Rt(C),!0;if(!(R.tagCheck instanceof Function&&R.tagCheck(Ie))&&(!_e[Ie]||Ze[Ie])){if(!Ze[Ie]&&nn(Ie)&&(we.tagNameCheck instanceof RegExp&&Gt(we.tagNameCheck,Ie)||we.tagNameCheck instanceof Function&&we.tagNameCheck(Ie)))return!1;if(Ne&&!ot[Ie]){let at=I(C)||C.parentNode,xt=ee(C)||C.childNodes;if(xt&&at){let yt=xt.length;for(let v=yt-1;v>=0;--v){let y=N(xt[v],!0);y.__removalCount=(C.__removalCount||0)+1,at.insertBefore(y,K(C))}}}return Rt(C),!0}return C instanceof c&&!dt(C)||(Ie==="noscript"||Ie==="noembed"||Ie==="noframes")&&Gt(/<\/no(script|embed|frames)/i,C.innerHTML)?(Rt(C),!0):(De&&C.nodeType===cs.text&&(pe=C.textContent,mo([te,Y,xe],at=>{pe=as(pe,at," ")}),C.textContent!==pe&&(os(t.removed,{element:C.cloneNode()}),C.textContent=pe)),Pt($e.afterSanitizeElements,C,null),!1)},ze=function(C,pe,Ie){if(J&&(pe==="id"||pe==="name")&&(Ie in n||Ie in ve))return!1;if(!(ke&&!lt[pe]&&Gt(Oe,pe))){if(!(ue&&Gt(ne,pe))){if(!(R.attributeCheck instanceof Function&&R.attributeCheck(pe,C))){if(!he[pe]||lt[pe]){if(!(nn(C)&&(we.tagNameCheck instanceof RegExp&&Gt(we.tagNameCheck,C)||we.tagNameCheck instanceof Function&&we.tagNameCheck(C))&&(we.attributeNameCheck instanceof RegExp&&Gt(we.attributeNameCheck,pe)||we.attributeNameCheck instanceof Function&&we.attributeNameCheck(pe,C))||pe==="is"&&we.allowCustomizedBuiltInElements&&(we.tagNameCheck instanceof RegExp&&Gt(we.tagNameCheck,Ie)||we.tagNameCheck instanceof Function&&we.tagNameCheck(Ie))))return!1}else if(!tt[pe]){if(!Gt(X,as(Ie,Ce,""))){if(!((pe==="src"||pe==="xlink:href"||pe==="href")&&C!=="script"&&A_(Ie,"data:")===0&&ht[C])){if(!(Ae&&!Gt(ie,as(Ie,Ce,"")))){if(Ie)return!1}}}}}}}return!0},nn=function(C){return C!=="annotation-xml"&&Na(C,W)},Ht=function(C){Pt($e.beforeSanitizeAttributes,C,null);let{attributes:pe}=C;if(!pe||Mt(C))return;let Ie={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:he,forceKeepAttr:void 0},at=pe.length;for(;at--;){let xt=pe[at],{name:yt,namespaceURI:v,value:y}=xt,k=oe(yt),M=y,Z=yt==="value"?M:S_(M);if(Ie.attrName=k,Ie.attrValue=Z,Ie.keepAttr=!0,Ie.forceKeepAttr=void 0,Pt($e.uponSanitizeAttribute,C,Ie),Z=Ie.attrValue,re&&(k==="id"||k==="name")&&(_t(yt,C),Z=G+Z),z&&Gt(/((--!?|])>)|<\/(style|title|textarea)/i,Z)){_t(yt,C);continue}if(k==="attributename"&&Na(Z,"href")){_t(yt,C);continue}if(Ie.forceKeepAttr)continue;if(!Ie.keepAttr){_t(yt,C);continue}if(!je&&Gt(/\/>/i,Z)){_t(yt,C);continue}De&&mo([te,Y,xe],Le=>{Z=as(Z,Le," ")});let me=oe(C.nodeName);if(!ze(me,k,Z)){_t(yt,C);continue}if(P&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!v)switch(w.getAttributeType(me,k)){case"TrustedHTML":{Z=P.createHTML(Z);break}case"TrustedScriptURL":{Z=P.createScriptURL(Z);break}}if(Z!==M)try{v?C.setAttributeNS(v,yt,Z):C.setAttribute(yt,Z),Mt(C)?Rt(C):Mc(t.removed)}catch{_t(yt,C)}}Pt($e.afterSanitizeAttributes,C,null)},et=function Me(C){let pe=null,Ie=jt(C);for(Pt($e.beforeSanitizeShadowDOM,C,null);pe=Ie.nextNode();)Pt($e.uponSanitizeShadowNode,pe,null),It(pe),Ht(pe),pe.content instanceof o&&Me(pe.content);Pt($e.afterSanitizeShadowDOM,C,null)};return t.sanitize=function(Me){let C=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},pe=null,Ie=null,at=null,xt=null;if(kt=!Me,kt&&(Me="<!-->"),typeof Me!="string"&&!Bt(Me))if(typeof Me.toString=="function"){if(Me=Me.toString(),typeof Me!="string")throw is("dirty is not a string, aborting")}else throw is("toString is not a function");if(!t.isSupported)return Me;if(Pe||Je(C),t.removed=[],typeof Me=="string"&&(Qe=!1),Qe){if(Me.nodeName){let y=oe(Me.nodeName);if(!_e[y]||Ze[y])throw is("root node is forbidden and cannot be sanitized in-place")}}else if(Me instanceof i)pe=tn("<!---->"),Ie=pe.ownerDocument.importNode(Me,!0),Ie.nodeType===cs.element&&Ie.nodeName==="BODY"||Ie.nodeName==="HTML"?pe=Ie:pe.appendChild(Ie);else{if(!Ge&&!De&&!V&&Me.indexOf("<")===-1)return P&&L?P.createHTML(Me):Me;if(pe=tn(Me),!pe)return Ge?null:L?D:""}pe&&Ke&&Rt(pe.firstChild);let yt=jt(Qe?Me:pe);for(;at=yt.nextNode();)It(at),Ht(at),at.content instanceof o&&et(at.content);if(Qe)return Me;if(Ge){if(be)for(xt=U.call(pe.ownerDocument);pe.firstChild;)xt.appendChild(pe.firstChild);else xt=pe;return(he.shadowroot||he.shadowrootmode)&&(xt=ye.call(r,xt,!0)),xt}let v=V?pe.outerHTML:pe.innerHTML;return V&&_e["!doctype"]&&pe.ownerDocument&&pe.ownerDocument.doctype&&pe.ownerDocument.doctype.name&&Gt(Wc,pe.ownerDocument.doctype.name)&&(v="<!DOCTYPE "+pe.ownerDocument.doctype.name+`>
`+v),De&&mo([te,Y,xe],y=>{v=as(v,y," ")}),P&&L?P.createHTML(v):v},t.setConfig=function(){let Me=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Je(Me),Pe=!0},t.clearConfig=function(){ae=null,Pe=!1},t.isValidAttribute=function(Me,C,pe){ae||Je({});let Ie=oe(Me),at=oe(C);return ze(Ie,at,pe)},t.addHook=function(Me,C){typeof C=="function"&&os($e[Me],C)},t.removeHook=function(Me,C){if(C!==void 0){let pe=$_($e[Me],C);return pe===-1?void 0:x_($e[Me],pe,1)[0]}return Mc($e[Me])},t.removeHooks=function(Me){$e[Me]=[]},t.removeAllHooks=function(){$e=jc()},t}var Hc=zc();var Mn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},bo=e=>(...t)=>({_$litDirective$:e,values:t}),Mr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var us=class extends Mr{constructor(t){if(super(t),this.it=Lt,t.type!==Mn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Lt||t==null)return this._t=void 0,this.it=t;if(t===un)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};us.directiveName="unsafeHTML",us.resultType=1;var Gc=bo(us);function Ka(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ur=Ka();function Jc(e){ur=e}var _s={exec:()=>null};function mt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Yt.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var B_=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Yt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},U_=/^(?:[ \t]*(?:\n|$))+/,W_=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,z_=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ms=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,H_=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ya=/(?:[*+-]|\d{1,9}[.)])/,eu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,tu=mt(eu).replace(/bull/g,Ya).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),G_=mt(eu).replace(/bull/g,Ya).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Za=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,V_=/^[^\n]+/,Qa=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,K_=mt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Qa).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Y_=mt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ya).getRegex(),xo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Xa=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Z_=mt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Xa).replace("tag",xo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),nu=mt(Za).replace("hr",ms).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xo).getRegex(),Q_=mt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",nu).getRegex(),Ja={blockquote:Q_,code:W_,def:K_,fences:z_,heading:H_,hr:ms,html:Z_,lheading:tu,list:Y_,newline:U_,paragraph:nu,table:_s,text:V_},Vc=mt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ms).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xo).getRegex(),X_={...Ja,lheading:G_,table:Vc,paragraph:mt(Za).replace("hr",ms).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Vc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xo).getRegex()},J_={...Ja,html:mt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Xa).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:_s,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:mt(Za).replace("hr",ms).replace("heading",` *#{1,6} *[^
]`).replace("lheading",tu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},em=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,tm=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ru=/^( {2,}|\\)\n(?!\s*$)/,nm=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ao=/[\p{P}\p{S}]/u,ei=/[\s\p{P}\p{S}]/u,su=/[^\s\p{P}\p{S}]/u,rm=mt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ei).getRegex(),ou=/(?!~)[\p{P}\p{S}]/u,sm=/(?!~)[\s\p{P}\p{S}]/u,om=/(?:[^\s\p{P}\p{S}]|~)/u,am=mt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",B_?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),au=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,im=mt(au,"u").replace(/punct/g,Ao).getRegex(),lm=mt(au,"u").replace(/punct/g,ou).getRegex(),iu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",cm=mt(iu,"gu").replace(/notPunctSpace/g,su).replace(/punctSpace/g,ei).replace(/punct/g,Ao).getRegex(),um=mt(iu,"gu").replace(/notPunctSpace/g,om).replace(/punctSpace/g,sm).replace(/punct/g,ou).getRegex(),dm=mt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,su).replace(/punctSpace/g,ei).replace(/punct/g,Ao).getRegex(),pm=mt(/\\(punct)/,"gu").replace(/punct/g,Ao).getRegex(),fm=mt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),_m=mt(Xa).replace("(?:-->|$)","-->").getRegex(),mm=mt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",_m).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),wo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,gm=mt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",wo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),lu=mt(/^!?\[(label)\]\[(ref)\]/).replace("label",wo).replace("ref",Qa).getRegex(),cu=mt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Qa).getRegex(),hm=mt("reflink|nolink(?!\\()","g").replace("reflink",lu).replace("nolink",cu).getRegex(),Kc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ti={_backpedal:_s,anyPunctuation:pm,autolink:fm,blockSkip:am,br:ru,code:tm,del:_s,emStrongLDelim:im,emStrongRDelimAst:cm,emStrongRDelimUnd:dm,escape:em,link:gm,nolink:cu,punctuation:rm,reflink:lu,reflinkSearch:hm,tag:mm,text:nm,url:_s},bm={...ti,link:mt(/^!?\[(label)\]\((.*?)\)/).replace("label",wo).getRegex(),reflink:mt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",wo).getRegex()},Ha={...ti,emStrongRDelimAst:um,emStrongLDelim:lm,url:mt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Kc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:mt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Kc).getRegex()},ym={...Ha,br:mt(ru).replace("{2,}","*").getRegex(),text:mt(Ha.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},yo={normal:Ja,gfm:X_,pedantic:J_},ds={normal:ti,gfm:Ha,breaks:ym,pedantic:bm},vm={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Yc=e=>vm[e];function Pn(e,t){if(t){if(Yt.escapeTest.test(e))return e.replace(Yt.escapeReplace,Yc)}else if(Yt.escapeTestNoEncode.test(e))return e.replace(Yt.escapeReplaceNoEncode,Yc);return e}function Zc(e){try{e=encodeURI(e).replace(Yt.percentDecode,"%")}catch{return null}return e}function Qc(e,t){let n=e.replace(Yt.findPipe,(o,a,i)=>{let c=!1,d=a;for(;--d>=0&&i[d]==="\\";)c=!c;return c?"|":" |"}),r=n.split(Yt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(Yt.slashPipe,"|");return r}function ps(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function wm(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Xc(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,c}function km(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var ko=class{constructor(e){$t(this,"options");$t(this,"rules");$t(this,"lexer");this.options=e||ur}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ps(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=km(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=ps(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ps(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=ps(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))i.push(n[c]),a=!0;else if(!a)i.push(n[c]);else break;n=n.slice(c);let d=i.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${d}`:d,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,n.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let w=b,x=w.raw+`
`+n.join(`
`),N=this.blockquote(x);o[o.length-1]=N,r=r.substring(0,r.length-w.raw.length)+N.raw,s=s.substring(0,s.length-w.text.length)+N.text;break}else if(b?.type==="list"){let w=b,x=w.raw+`
`+n.join(`
`),N=this.list(x);o[o.length-1]=N,r=r.substring(0,r.length-b.raw.length)+N.raw,s=s.substring(0,s.length-w.raw.length)+N.raw,n=x.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let c=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,N=>" ".repeat(3*N.length)),b=e.split(`
`,1)[0],w=!f.trim(),x=0;if(this.options.pedantic?(x=2,p=f.trimStart()):w?x=t[1].length+1:(x=t[2].search(this.rules.other.nonSpaceChar),x=x>4?1:x,p=f.slice(x),x+=t[1].length),w&&this.rules.other.blankLine.test(b)&&(d+=b+`
`,e=e.substring(b.length+1),c=!0),!c){let N=this.rules.other.nextBulletRegex(x),j=this.rules.other.hrRegex(x),K=this.rules.other.fencesBeginRegex(x),ee=this.rules.other.headingBeginRegex(x),I=this.rules.other.htmlBeginRegex(x);for(;e;){let P=e.split(`
`,1)[0],D;if(b=P,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),D=b):D=b.replace(this.rules.other.tabCharGlobal,"    "),K.test(b)||ee.test(b)||I.test(b)||N.test(b)||j.test(b))break;if(D.search(this.rules.other.nonSpaceChar)>=x||!b.trim())p+=`
`+D.slice(x);else{if(w||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||K.test(f)||ee.test(f)||j.test(f))break;p+=`
`+b}!w&&!b.trim()&&(w=!0),d+=P+`
`,e=e.substring(P.length+1),f=D.slice(x)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(c.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};c.checked=p.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=p.raw+c.tokens[0].raw,c.tokens[0].text=p.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(p)):c.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):c.tokens.unshift(p)}}if(!s.loose){let d=c.tokens.filter(f=>f.type==="space"),p=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let c of s.items){c.loose=!0;for(let d of c.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Qc(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Qc(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=ps(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=wm(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Xc(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Xc(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,c=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(r=d.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let p=[...r[0]][0].length,f=e.slice(0,s+r.index+p+a);if(Math.min(s,a)%2){let w=f.slice(1,-1);return{type:"em",raw:f,text:w,tokens:this.lexer.inlineTokens(w)}}let b=f.slice(2,-2);return{type:"strong",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},yn=class Ga{constructor(t){$t(this,"tokens");$t(this,"options");$t(this,"state");$t(this,"inlineQueue");$t(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||ur,this.options.tokenizer=this.options.tokenizer||new ko,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Yt,block:yo.normal,inline:ds.normal};this.options.pedantic?(n.block=yo.pedantic,n.inline=ds.pedantic):this.options.gfm&&(n.block=yo.gfm,this.options.breaks?n.inline=ds.breaks:n.inline=ds.gfm),this.tokenizer.rules=n}static get rules(){return{block:yo,inline:ds}}static lex(t,n){return new Ga(n).lex(t)}static lexInline(t,n){return new Ga(n).inlineTokens(t)}lex(t){t=t.replace(Yt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(Yt.tabCharGlobal,"    ").replace(Yt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(p=>(c=p.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let p=n.at(-1);c.type==="text"&&p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,r,i)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),b;this.options.extensions.startInline.forEach(w=>{b=w.call({lexer:this},f),typeof b=="number"&&b>=0&&(p=Math.min(p,b))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(c=this.tokenizer.inlineText(d)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):n.push(c);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},$o=class{constructor(e){$t(this,"options");$t(this,"parser");this.options=e||ur}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(Yt.notSpaceStart)?.[0],s=e.replace(Yt.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Pn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Zc(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Pn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Zc(e);if(s===null)return Pn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Pn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Pn(e.text)}},ni=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},vn=class Va{constructor(t){$t(this,"options");$t(this,"renderer");$t(this,"textRenderer");this.options=t||ur,this.options.renderer=this.options.renderer||new $o,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ni}static parse(t,n){return new Va(n).parse(t)}static parseInline(t,n){return new Va(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},vo,fs=(vo=class{constructor(e){$t(this,"options");$t(this,"block");this.options=e||ur}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?yn.lex:yn.lexInline}provideParser(){return this.block?vn.parse:vn.parseInline}},$t(vo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),$t(vo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),vo),$m=class{constructor(...e){$t(this,"defaults",Ka());$t(this,"options",this.setOptions);$t(this,"parse",this.parseMarkdown(!0));$t(this,"parseInline",this.parseMarkdown(!1));$t(this,"Parser",vn);$t(this,"Renderer",$o);$t(this,"TextRenderer",ni);$t(this,"Lexer",yn);$t(this,"Tokenizer",ko);$t(this,"Hooks",fs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new $o(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],c=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=c.apply(s,d)),p||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new ko(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],c=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=c.apply(s,d)),p}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new fs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],c=s[a];fs.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&fs.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await i.call(s,d);return c.call(s,f)})();let p=i.call(s,d);return c.call(s,p)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await i.apply(s,d);return f===!1&&(f=await c.apply(s,d)),f})();let p=i.apply(s,d);return p===!1&&(p=c.apply(s,d)),p}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return yn.lex(e,t??this.defaults)}parser(e,t){return vn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?yn.lex:yn.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?vn.parse:vn.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?yn.lex:yn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?vn.parse:vn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Pn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},cr=new $m;function vt(e,t){return cr.parse(e,t)}vt.options=vt.setOptions=function(e){return cr.setOptions(e),vt.defaults=cr.defaults,Jc(vt.defaults),vt};vt.getDefaults=Ka;vt.defaults=ur;vt.use=function(...e){return cr.use(...e),vt.defaults=cr.defaults,Jc(vt.defaults),vt};vt.walkTokens=function(e,t){return cr.walkTokens(e,t)};vt.parseInline=cr.parseInline;vt.Parser=vn;vt.parser=vn.parse;vt.Renderer=$o;vt.TextRenderer=ni;vt.Lexer=yn;vt.lexer=yn.lex;vt.Tokenizer=ko;vt.Hooks=fs;vt.parse=vt;var jv=vt.options,Bv=vt.setOptions,Uv=vt.use,Wv=vt.walkTokens,zv=vt.parseInline;var Hv=vn.parse,Gv=yn.lex;function zn(e){let t=vt.parse(e),n=Hc.sanitize(t);return Gc(n)}function Dn(e,t){return u`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Pr(e){return e.loading?u`<div class="prompt-block__status">불러오는 중…</div>`:e.error?u`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function So(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var du={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},xm={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Am=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Sm=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function En(e){return!!e&&typeof e=="object"}function ri(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function si(e,t){let n=ri(e),r=ri(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function pu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>En(s)&&typeof s.text=="string"?s.text:"").join(""):En(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Em(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:du[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=ri(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=si(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let c=si(En(i)?i.old_string:"",En(i)?i.new_string:"");s+=c.added,o+=c.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function oi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ai(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Am.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Sm.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Tm(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Cm(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(En(a)){if(a.type==="text"&&typeof a.text=="string")o.push(ai(a.text));else if(a.type==="thinking"){let i=oi(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=Em(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?uu(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(En(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=pu(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?uu([s],n):[s]}return[]}function uu(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Rm(e){let t=typeof e.command=="string"?e.command:"",n=pu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:du.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Om(e){if(e.type==="item.completed"&&En(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ai(t.text)];if(t.type==="reasoning"){let n=oi(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Rm(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Im(e){if(e.schema!=="codex-delegation-monitor-v1"||!En(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&En(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[ai(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=oi(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=xm[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Lm(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Mm(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return En(t)?t:null}function fu(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Mm(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Tm(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Im(o):Lm(o)?Om(o):Cm(o,n);return a.length>0&&(r.progress=null),a}}}function ii(e){let t=[],n=fu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Pm=5,Dm=10,Nm=/Task\s+#(\d+)/,qm=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Fm=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Eo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function jm(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Bm(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Um(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Nm.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!c||d.length===0)continue;t.set(c[1],{label:d,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Wm(e){if(e.tool==="Bash"){let t=e.command||"";return qm.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Fm.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function zm(e){let t=e.filter(s=>s.kind==="tool").slice(-Dm),n=new Map;t.forEach((s,o)=>{let a=Wm(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Hm(e){let t=Bm(e);if(t)return{text:t,guess:!1};let n=Um(e);if(n)return{text:n,guess:!1};let r=zm(e);return r?{text:r,guess:!0}:null}function Gm(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:on(e,t)}function Dr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,c=null,d=!1,p={},f=!0,b=new Set,w=new Set,x=null,N=null,j=!1,K=!1,ee=!1,I=null,P=null;function D(){j=!1,K=!1,ee=!1,I=null,P=null}async function H(z){if(n){K=!0,ee=!1,we();try{let V=await Promise.resolve(n("get-attempt-prompt",{attempt_id:z,...c?{root_dir:c}:{}}));if(o!==z)return;!V||typeof V!="object"||Array.isArray(V)?ee=!0:(I=V,P=z)}catch{o===z&&(ee=!0)}finally{o===z&&(K=!1,we())}}}function S(){if(j=!j,j&&o&&P!==o){H(o);return}we()}function U(){if(!j)return"";let z=Pr({loading:K,error:ee});if(z)return u`<div class="sv__prompt" data-seam="attempt-prompt">
        ${z}
      </div>`;if(!I)return"";if(I.missing)return u`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let V=So(I.recorded_at);return u`<div class="sv__prompt" data-seam="attempt-prompt">
      ${V?u`<div class="prompt-block__meta">${V} 발송</div>`:""}
      ${typeof I.task_prompt=="string"?Dn("\uACFC\uC5C5 (user)",I.task_prompt):""}
      ${typeof I.system_prompt=="string"?Dn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",I.system_prompt):""}
    </div>`}function B(){if(!i||!r)return[];let z=r.get(i);return ii(z?z.lines:[])}function ye(){if(!i||!r)return null;let z=r.get(i),V=z?z.last_event_at:null;return typeof V=="number"?V:null}function $e(){return p.status==="running"}function te(){if($e()&&o){N||(N=setInterval(()=>we(),1e3));return}Y()}function Y(){N&&(clearInterval(N),N=null)}function xe(z){let V=[],Pe=0;for(;Pe<z.length;){let{idx:Ke,line:Ge}=z[Pe];if(Ge.kind==="tool"){let be=Pe;for(;be<z.length&&z[be].line.kind==="tool"&&z[be].line.tool===Ge.tool;)be+=1;if(be-Pe>=Pm&&!w.has(Ke)){V.push({kind:"group",idx:Ke,tool:Ge.tool||"",lines:z.slice(Pe,be)}),Pe=be;continue}}V.push({kind:"line",idx:Ke,line:Ge}),Pe+=1}return V}function Oe(z){let V=[],Pe=new Map;for(let be=0;be<z.length;be+=1){let L=z[be],J=L.parent_tool_use_id;if(typeof J=="string"&&J.length>0){let re=Pe.get(J);re||(re={kind:"subagent",idx:be,launch_id:J,agent_type:null,header:null,lines:[]},Pe.set(J,re),V.push(re)),re.lines.push({idx:be,line:L});continue}if(L.kind==="tool"&&L.tool==="Agent"&&typeof L.launch_id=="string"&&L.launch_id.length>0){let re=ne(L),G=Pe.get(L.launch_id);if(G){G.header={idx:be,line:L},G.agent_type=re;continue}let Ne={kind:"subagent",idx:be,launch_id:L.launch_id,agent_type:re,header:{idx:be,line:L},lines:[]};Pe.set(L.launch_id,Ne),V.push(Ne);continue}V.push({kind:"entry",idx:be,line:L})}let Ke=[],Ge=0;for(;Ge<V.length;){if(V[Ge].kind!=="entry"){Ke.push(V[Ge]),Ge+=1;continue}let be=Ge;for(;be<V.length&&V[be].kind==="entry";)be+=1;Ke.push(...xe(V.slice(Ge,be))),Ge=be}return Ke}function ne(z){let V=z.input;return V&&typeof V.subagent_type=="string"?V.subagent_type:null}function ie(z){for(let V=z.length-1;V>=0;V-=1){let Pe=z[V];if(Pe.kind==="result"||Pe.kind==="error")return null;if(Pe.kind==="tool"&&!Object.hasOwn(Pe,"result"))return Pe}return null}function Ce(z){for(let V=z.length-1;V>=0;V-=1)if(z[V].kind==="thinking")return z[V];return null}function W(z,V){if(V.kind==="gate")return u`<div class="sv__gate">${V.text}</div>`;if(V.kind==="phase")return u`<div class="sv__phase">${V.text}</div>`;if(V.kind==="result")return u`<div
        class="sv__result${V.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${V.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${zn(V.text||(V.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(V.kind==="thinking"){let Pe=b.has(z);return u`<div
        class="sv__think${Pe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>lt(z)}
      >
        <span class="sv__think-line">💭 ${Eo(V.text)}</span>
        ${Pe?u`<pre class="sv__think-expand">${V.text}</pre>`:""}
      </div>`}if(V.kind==="error")return u`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="blocker")return u`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="tool"){let Pe=b.has(z),Ke=V.tool==="Bash"?jm(V.command):0,Ge=V.tool==="Bash"?Ke>1?Eo(V.command):V.command:V.path||V.command||"";return u`<div
        class="sv__tool${Pe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>lt(z)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${V.icon}</span>
          <span class="sv__tool-name">${V.tool}</span>
          ${Ge?u`<span class="sv__tool-detail">${Ge}</span>`:""}
          ${Ke>1?u`<span class="sv__tool-more">⋯ ${Ke}줄</span>`:""}
          ${typeof V.added=="number"?u`<span class="sv__diff-add">+${V.added}</span>`:""}
          ${typeof V.removed=="number"?u`<span class="sv__diff-del">−${V.removed}</span>`:""}
          ${V.result?u`<span class="sv__tool-ok">→ ${V.result}</span>`:""}
        </span>
        ${Pe?u`<pre class="sv__tool-expand">${X(V)}</pre>`:""}
      </div>`}return u`<div class="sv__as">${zn(V.text||"")}</div>`}function X(z){let V=[];if(z.tool==="Bash"&&typeof z.command=="string"&&z.command.length>0)V.push(z.command);else if(z.input!==void 0)try{V.push(`input: ${JSON.stringify(z.input,null,2)}`)}catch{}return typeof z.output=="string"&&z.output.length>0&&V.push(`output:
${z.output}`),V.join(`

`)}function _e(){if(!o)return u``;let z=B(),V=(a?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),Pe=p.session_id||"",Ke=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${f?"ON":"OFF"}`,Ge=$e(),be=Ge?Gm(ye(),Date.now()):"",L=Ge?ie(z):null,J=Ge?Ce(z):null,re=Hm(z);return u`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?p.role||"":o}</span>
        ${re?u`<span
              class="sv__stage${re.guess?" sv__stage--guess":""}"
              title=${re.text}
              >${re.text}</span
            >`:""}
        ${Ge?u`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${be?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${be}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${be?u`<span class="sv__live-ago">${be}</span>`:""}</span
            >`:""}
        ${Pe?u`<button
              type="button"
              class="sv__session"
              title=${Pe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Pe}`}
              @click=${()=>ue(Pe)}
            >
              ⧉ ${Pe.slice(0,8)}
            </button>`:""}
        ${V?u`<span class="sv__meta">${V}</span>`:""}
        ${p.worktree?u`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${a||d?"":u`<button
              type="button"
              class="sv__prompt-toggle${j?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${j?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${S}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${f?" sv__follow--on":""}"
          aria-pressed=${f?"true":"false"}
          aria-label=${Ke}
          @click=${R}
        >
          <span class="sv__follow-full">⇣ ${Ke}</span>
          <span class="sv__follow-short">⇣ ${f?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>De()}
        >
          ✕
        </button>
      </div>
      ${a||d?"":U()}
      <div class="sv__body">
        ${z.length===0?u`<div class="sv__empty">세션 로그 없음</div>`:Oe(z).map(G=>G.kind==="subagent"?he(G):G.kind==="group"?Se(G):W(G.idx,G.line))}
      </div>
      ${L||J?u`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${L?u`<span class="sv__now-icon">${L.icon}</span>
                  <span class="sv__now-name">${L.tool}</span>
                  <span class="sv__now-detail"
                    >${L.tool==="Bash"?Eo(L.command):L.path||L.command||""}</span
                  >`:""}
            ${J?u`<span class="sv__now-think"
                  >💭 ${Eo(J.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Se(z){return u`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Be(z.idx)}
    >
      <span class="sv__group-icon">${z.lines[0].line.icon}</span>
      <span class="sv__group-name">${z.tool}</span>
      <span class="sv__group-count">${z.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function he(z){let V=w.has(z.idx),Pe=z.header?z.header.line:null,Ke=Pe?Pe.is_error===!0?"\u2717":typeof Pe.result=="string"?"\u2713":"\u27F3":"",Ge=Pe&&Pe.command?Pe.command:"";return u`<div class="sv__sub${V?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Be(z.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${z.agent_type||"subagent"}</span>
        ${Ge?u`<span class="sv__sub-detail">${Ge}</span>`:""}
        <span class="sv__sub-count">${z.lines.length}줄</span>
        ${Ke?u`<span class="sv__sub-state">${Ke}</span>`:""}
        ${V?"":u`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${V?u`<div class="sv__sub-body">
            ${xe(z.lines).map(be=>be.kind==="group"?Se(be):W(be.idx,be.line))}
          </div>`:""}
    </div>`}function Be(z){w.add(z),we()}function we(){Ve(_e(),e),te(),f&&Ze()}function Ze(){let z=e.querySelector(".sv__body");z&&(z.scrollTop=z.scrollHeight)}function lt(z){b.has(z)?b.delete(z):b.add(z),we()}function R(){f=!f,we()}function ue(z){an(z).then(V=>{V?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ke(z){!o||!z||(p={...p,...z},we())}function Ae(z){let V=z.target;if(!V||!V.classList||!V.classList.contains("sv__body"))return;!(V.scrollHeight-V.scrollTop-V.clientHeight<=4)&&f&&(f=!1,we())}e.addEventListener("scroll",Ae,!0);function je(z){let V=z&&z.attempt_id;if(!V)return;let Pe=i;o=V,a=typeof z.launch_id=="string"&&z.launch_id.length>0?z.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&Pe&&Pe!==i&&Promise.resolve(n("unsubscribe-session-log",{id:Pe})).catch(()=>{}),c=typeof z.root_dir=="string"&&z.root_dir.length>0?z.root_dir:null,p=z.meta||{},d=z.hide_prompt===!0,f=!0,b.clear(),w.clear(),D(),!x&&r&&(x=r.subscribe(we)),n&&Promise.resolve(n("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...c?{root_dir:c}:{}})).catch(()=>{}),we()}function De(){let z=i;o=null,a=null,i=null,c=null,d=!1,b.clear(),w.clear(),D(),Y(),n&&z&&Promise.resolve(n("unsubscribe-session-log",{id:z})).catch(()=>{}),Ve(u``,e),s&&s()}return{open:je,updateMeta:ke,close:De,isOpen(){return o!==null},destroy(){Y(),x&&(x(),x=null),e.removeEventListener("scroll",Ae,!0),o=null,a=null,i=null,c=null,d=!1,Ve(u``,e)}}}function To(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=li(t.spec_id),s=li(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function li(e){return typeof e=="string"?e.trim():""}function _u(e){let t=To(e);if(t.path)return t;let n=li(Vm(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Vm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function Km(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Ym(e){let t=e&&e.metadata||{},n=_u(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Km(t)?null:"plan_pending"}),r}function mu(e,t){let n=Ym(e);return u`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?u`<div class="detail-empty">산출물 없음</div>`:u`
          ${n.map(r=>u`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?u`<span class="detail-art__badge">draft</span>`:null}
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
  `}var Zm="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Qm=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Xm=/^\*\*결론\*\* — (.+)$/;function Co(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Zm)return null;let n=Qm.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Xm.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:c,body:t.slice(d).join(`
`).trim()}}var gu=20;function hu(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Jm(e){return e.length>gu?`${e.slice(0,gu)}\u2026`:e}function eg(e,t,n,r){let s=`${t.lane} ${Jm(t.identifier)}`;return u`<div class="detail-report">
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
        <span class="detail-report__time">${hu(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?u`<div class="detail-report__body">
          ${zn(t.body)}
        </div>`:""}
  </div>`}function tg(e){return u`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${hu(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${zn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function bu(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((c,d)=>String(d.created_at||"").localeCompare(String(c.created_at||"")));return u`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?u`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?u`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:u`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let d=Co(typeof c.text=="string"?c.text:"");return d?eg(c,d,t,s.has(c.id)):tg(c)})}
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
  `}var{I:Ew}=Nl;var yu=e=>e.strings===void 0;var ng={},vu=(e,t=ng)=>e._$AH=t;var dr=bo(class extends Mr{constructor(e){if(super(e),e.type!==Mn.PROPERTY&&e.type!==Mn.ATTRIBUTE&&e.type!==Mn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!yu(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===un||t===Lt)return t;let n=e.element,r=e.name;if(e.type===Mn.PROPERTY){if(t===n[r])return un}else if(e.type===Mn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return un}else if(e.type===Mn.ATTRIBUTE&&n.getAttribute(r)===t+"")return un;return vu(e),t}});var Ro=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ui=[...Ro.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Nn=["orchestration_model","orchestration_effort","orchestration_speed"],Oo=[...Ro,...Nn],rg=ui.filter(e=>Oo.includes(e)),wu=["delegated","main"],Io=["inherit","claude","codex"],gs=["default","fast"],hs=["standard","fast_track"],bs=["codex","opus","fable","self","skip"],Lo=["codex","fable","skip"],Mo=["low","medium","high","xhigh"],cn="auto";function ln(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ku(e){if(!ln(e)||!ln(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))ln(r)&&ln(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Nr(e,t){let n=ku(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[cn,...r.flatMap(([,s])=>s)]}function $u(e,t,n,r){if(!ln(e)||!ln(e.runners))return[cn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!ln(a)||!ln(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,c]of Object.entries(a.models)){if(n&&n!==cn&&i!==n)continue;let d=r(a,c);if(Array.isArray(d))for(let p of d)typeof p=="string"&&!s.includes(p)&&s.push(p)}return[cn,...s]}function qr(e,t,n){return $u(e,t,n,(r,s)=>ln(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function di(e,t,n){return $u(e,t,n,(r,s)=>ln(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:ln(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function ys(e,t){let n=ku(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function xu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Nr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!qr(t,s,r.impl_model||cn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var sg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},ci=[...rg,...Nn],og=[...Oo,...ui].filter((e,t,n)=>n.indexOf(e)===t&&!ci.includes(e));function Au(e,t){let n=ln(e)?e:{},r=ln(t)?t:{},s=[];for(let a of ci){let i=n[a]??null,c=r[a]??null;i!==c&&s.push({key:a,label:sg[a]||a,before:i,after:c,kind:i===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...og,...Object.keys(r)])!ci.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function pi(e,t,n,r,s,o){return po({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function Su(e,t){let n={};for(let r of ui){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function Eu(e,t){let n={};for(let r of Nn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var fi=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Nn]}],Hn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Po={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function _i(e,t,n,r,s,o=null){let a=Jt({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Tu(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of _i(e,t,n,r,s,o))a[i.source]+=1;return a}function Cu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Ru(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var qw=[...Ro,...Nn];var ag=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],ig={pin:"pin",global:"global",base:"base"};function lg(e){return u`<span
    class=${`detail-layer-rail detail-layer-rail--${ig[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function cg(e,t,n){switch(e){case"workflow_mode":return hs;case"spec_review_model":case"impl_review_model":return bs;case"plan_review_model":return Lo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Mo;case"impl_dispatch":return wu;case"impl_runtime":return Io;case"impl_model":return Nr(n,t.impl_runtime);case"impl_effort":return qr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return gs;case"orchestration_model":return ys(n,null);case"orchestration_effort":return qr(n,void 0,t.orchestration_model||cn).filter(r=>r!==cn);default:return[]}}function ug(e,t){return u`<div class="detail-effective__row" data-key=${e.key}>
    ${lg(e.source)}
    <span class="detail-effective__k"
      >${Hn[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Po[e.source]}</span
    >
    ${t.expanded?u`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Hn[e.key]||e.key} \uD3B8\uC9D1`}
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
          ${t.options.map(n=>u`<option
                value=${n.value}
                title=${n.full_value||""}
                ?selected=${e.source==="pin"&&e.value===n.value}
              >
                ${n.label}
              </option>`)}
        </select>`:""}
  </div>`}function Ou(e,t){let n=fi.flatMap(c=>c.keys),r=_i(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Tu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(c=>[c.key,c])),a=Object.fromEntries(r.filter(c=>c.value!==null).map(c=>[c.key,c.value])),i=r.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return u`<details
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
        >${dg(o)}</span
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
    ${e.expanded?u`<div class="detail-effective__body">
          ${fi.map(c=>u`
              <div class="detail-effective__subhead">${c.label}</div>
              ${r.filter(d=>c.keys.includes(d.key)).map(d=>{let p=po({key:d.key,choices:cg(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return ug(d,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${dr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${c=>t.onPresetSelect(String(c.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(c=>u`<option
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
            ${(e.skipped_orchestration_keys||[]).length>0?u`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function dg(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function pg(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Iu(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=pg(n.exec_receipt),c=i?Cn(i):a,d=i?`${i.kind}:${i.actor}`:a.split("@")[0],p=co(n.planned_execution,n.exec_receipt);return u`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?u`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?u`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?u`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${p?u`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
          >`:""}
      ${c?u`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${c}
            >${d}${i?.effort?u`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${i.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${ag.map(f=>{let b=f.receipt&&typeof t[f.receipt]=="string"?String(t[f.receipt]):"",w=r[f.id],x=b.length>0||w?.fill==="full",N=!x&&w?.fill==="dim",j=w?.stale===!0;return u`<span
          class=${`detail-summary__gate${x?" detail-summary__gate--on":""}${N?" detail-summary__gate--current":""}${j?" detail-summary__gate--stale":""}`}
          data-gate=${f.id}
        >
          <span class="detail-summary__gate-pill">${f.label}</span>
          ${b?u`<span class="detail-summary__gate-sha"
                >${b.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function Du(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Lu(e){return Du(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Mu(e,t){let n=e&&e[t];if(!Du(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Lu),s=Lu(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function Nu(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function fg(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Nu(e)}${t}`}function qu(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Nu(e)}`}function _g(e,t){return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:qu({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Pu(e){let t=e.provider_key==="claude"?fg:qu,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return u`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${_g(e.provider_key,e.provider)}
        </option>
        ${e.selected&&!n?u`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(r=>u`<option
              value=${r.key}
              ?selected=${r.key===e.selected}
            >
              ${t(r)}
            </option>`)||""}
      </select>
      ${e.hint?u`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":u`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function Fu({md:e,catalog:t,handlers:n}){let r=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return u`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Pu({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Mu(t,"claude"),selected:r,handlers:n,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Pu({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Mu(t,"codex"),selected:s,handlers:n})}
    </div>
  </section>`}var ju=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function vs(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Do(e){if(!vs(e)||!vs(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>vs(n)&&vs(n.models));return t.length>0?t:null}function wn(e,t){let n=Do(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Bu(e,t){return vs(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Uu(e,t){let n=Do(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Bu(r,r.models[t]);return[]}function mg(e){let t=Do(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Bu(r,s))n.includes(o)||n.push(o);return n}function gg(e,t){if(!t)return mg(e);let r=Do(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of Uu(e,o))s.includes(a)||s.push(a);return s}function Wu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=wn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?Uu(t,r.impl_model):gg(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function hg(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function bg(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function No(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,c="";function d(N){N.key==="Escape"&&s&&(N.preventDefault(),w())}document.addEventListener("keydown",d);function p(){return s?u`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>w()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${hg(s)}</span
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
            ${o==="loading"?u`<div class="mv__status">불러오는 중…</div>`:o==="pending"?u`<div class="mv__status">${c}</div>`:o==="error"?u`<div class="mv__status mv__status--error">
                      ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:u`${i===null?null:u`<pre class="mv__front">
${i}</pre
                        >`}${zn(a)}`}
          </div>
        </div>
      </div>
    `:u``}function f(){Ve(p(),e)}async function b(N,j={}){s=N,o="loading",a="",i=null,c="",f();let K=j.workspace||(n?n():"");if(!K){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let ee="/api/doc?workspace="+encodeURIComponent(K)+"&path="+encodeURIComponent(N);try{let I=await r(ee),P=await I.json().catch(()=>({}));if(!I.ok||!P||P.ok!==!0){if(P?.error==="not_found"&&j.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(P&&P.error||I.status)+")",f();return}let D=bg(String(P.content||""));i=D.front,a=D.body,o="ready",f()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function w(){s=null,Ve(u``,e)}function x(){document.removeEventListener("keydown",d),w()}return{open:b,close:w,destroy:x}}var yg=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Gu="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",qo=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],vg=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function zu(e){return typeof e=="string"&&vg.has(e)}var wg=["running","done","failed","interrupted"],kg={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function $g(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function xg(e){let t=zt(e);if(t.length>0)return t.map(s=>u`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Lr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return u`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?u`<span class="detail-usage-partial" title=${Gu}
          >부분 집계</span
        >`:""}`}function Hu(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function hi(e){if(typeof e=="number")return Fo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Fo(t):""}function Ag(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Sg(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function mi(e){return e===null||typeof e=="string"&&e.trim().length>0}function gi(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Eg(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!qo.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?mi(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||mi(t.effort))||!(!("agent_type"in t)||mi(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!wg.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!gi(t.started_at)||!gi(t.last_event_at)||!gi(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Tg(e,t,n){let s=zt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return u`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${n.session_id?u`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${n.session_id}
          >${n.session_id.slice(0,8)}</span
        >`:""}
    ${hi(n.completed_at)?u`<span class="detail-session__leg-time detail-session__time"
          >${hi(n.completed_at)}</span
        >`:""}
    ${s?u`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Cg(e,t,n,r){let s=e.status==="running"?null:t,a=(s?zt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Fo(e.last_event_at):s?hi(s.completed_at):"",c=(e.provider==="claude"?["Claude",e.agent_type,Ag(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=Sg(e,s);return u`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${kg[e.status]}</span
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
    ${i?u`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?u`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function Rg(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Og(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let f=Eg(p);!f||s.has(f.launch_id)||zu(f.agent_type)||(s.add(f.launch_id),r.push(f))}r.sort((p,f)=>(p.started_at||0)-(f.started_at||0));let a={};for(let{role:p,provider:f}of qo){let b=t?t.roles[p]?.[f]:null;a[p]=b?[...b.legs]:[]}let i=qo.flatMap(({role:p})=>a[p]),c=new Set,d=[];for(let{role:p,provider:f}of qo){for(let b of r.filter(w=>w.role===p&&w.provider===f)){let w=i.find(x=>x.receipt_id===b.launch_id)||null;w&&!Rg(b,w)||(w&&c.add(w.receipt_id),d.push(Cg(b,w,e.attempt_id,n)))}for(let b of a[p])!c.has(b.receipt_id)&&!zu(b.agent_type)&&d.push(Tg(p,f,b))}return d}function Ig(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...yg,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return u`<div class="detail-session__usage-detail">
    ${r.map(s=>u`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${$g(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":u`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?u`<span class="detail-session__usage-note">${Gu}</span>`:""}
  </div>`}var Lg={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Fo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Mg(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return u`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?u`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Vu(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return u`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of r)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let f=typeof d.session_id=="string"&&d.session_id.length>0,b=o.has(d.attempt_id),w=f&&!b,x=f?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return u`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!w}
      title=${x}
      @click=${N=>{N.stopPropagation(),w&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let f=d.cause_detail,b=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:d.cause;return u`<div class="detail-session__cause" title=${b}>
      ${d.cause}
    </div>`},c=d=>{let p=Hu(Pa(d));if(zt(p).length===0&&!Lr(d.usage))return"";let f=s.has(d.attempt_id);return u`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${b=>{b.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return u`
    <div class="detail-section-label">
      세션 이력${xg(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(d=>{let p=Pa(d),f=Hu(p),b=zt(f);return u`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Lg[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${ts(d)?u`<span
                  class="detail-session__resumed"
                  title=${ts(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${lr(d)}</span>
            ${b.length>0?u`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?u`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${b.length>0?b.map(w=>u`<span
                      class="detail-session__usage"
                      title=${w.tooltip}
                      >${w.label}</span
                    >`):Lr(d.usage)?u`<span class="detail-session__usage"
                    >${Lr(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Fo(d.started_at)}</span>
          </button>
          ${c(d)} ${a(d)} ${i(d)} ${Mg(d)}
          ${s.has(d.attempt_id)&&d.usage?Ig(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${Og(d,p,t)}
        </div>`})}
    </div>
  `}function Ku(e,t={}){return u`
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
    ${e.expanded?u`<div class="detail-prompt" data-seam="task-prompt">
          ${Pg(e)}
        </div>`:""}
  `}function Pg(e){let t=Pr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return u`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Dn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=So(n.recorded_at);return u`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Dn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Dn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Dg=["open","in_progress","deferred","resolved","closed"],Ng=[0,1,2,3,4];function Yu(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,d=null,p=null,f={},b="",w=!1,x=[],N=!1,j={},K={claude:null,codex:null},ee=null,I=0,P=!1,D=!1,H="",S="",U="";function B(){P=!1,D=!1,H="",S="",U=""}function ye(){K={claude:null,codex:null},ee=null,I+=1}async function $e(l){try{let _=await fetch(l);if(!_.ok)return null;let g=await _.json();if(!g||typeof g!="object"||!Array.isArray(g.accounts))return null;let O=g.accounts.filter(fe=>fe!==null&&typeof fe=="object"&&!Array.isArray(fe));return{accounts:O,active:O.find(fe=>fe.active===!0)||null}}catch{return null}}async function te(l){ee=l;let _=++I,[g,O]=await Promise.all([$e("/api/claude-usage"),$e("/api/codex-usage")]);_!==I||l!==d||(K={claude:g,codex:O},ce())}let Y=[],xe=null,Oe=null,ne=!1,ie="",Ce=!1,W=0,X=new Set;function _e(){Y=[],xe=null,Oe=null,ne=!1,ie="",Ce=!1,W+=1,X.clear()}async function Se(l){if(!s)return;let _=++W;try{let g=await Promise.resolve(s("get-comments",{id:l}));if(_!==W||l!==d)return;Y=Array.isArray(g)?g:[],ne=!1}catch{if(_!==W||l!==d)return;ne=!0}ce()}function he(){if(!s||!d)return;let l=p&&typeof p.comment_count=="number"?p.comment_count:null;if(xe!==d){xe=d,Oe=l,Se(d);return}l!==null&&l!==Oe&&(Oe=l,Se(d))}function Be(l){X.has(l)?X.delete(l):X.add(l),ce()}function we(l){let _=ie.trim().length===0;ie=l,_!==(l.trim().length===0)&&ce()}async function Ze(){let l=ie.trim();if(!s||!d||l.length===0||Ce)return;let _=d;Ce=!0,ce();let g=!1;try{let O=await Promise.resolve(s("add-comment",{id:_,text:l}));Array.isArray(O)&&O.length>0&&(g=!0,_===d&&(Y=O,ne=!1,ie="",Oe=O.length))}catch{g=!1}g||de("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),_===d&&(Ce=!1),ce()}let lt={onToggle:Be,onDraftInput:we,onSubmit:Ze},R=t.mdViewer||null,ue=null;R||(ue=document.createElement("div"),ue.className="md-viewer-root",document.body.appendChild(ue));let ke=R||No(ue,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ae=document.createElement("div");Ae.className="session-log-root",document.body.appendChild(Ae);let je=Dr(Ae,{transport:s?(l,_)=>Promise.resolve(s(l,_)):void 0,sessionLogStore:c}),De=!1,z=!1,V=!1,Pe=null,Ke=null,Ge=0;function be(l){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${l}`}function L(){De=!1,z=!1,V=!1,Pe=null,Ke=null,Ge+=1}async function J(l){if(!s)return;let _=++Ge;z=!0,V=!1,ce();try{let g=await Promise.resolve(s("get-bead-prompt",{bead_id:l}));if(_!==Ge)return;!g||typeof g!="object"||Array.isArray(g)?V=!0:(Pe=g,Ke=be(l))}catch{_===Ge&&(V=!0)}finally{_===Ge&&(z=!1,ce())}}function re(){if(De=!De,De&&d&&Ke!==be(d)){Pe=null,J(d);return}ce()}function G(){if(!a||!d)return[];let l=a.get();return(l&&l.attempts?Object.values(l.attempts):[]).filter(g=>g&&g.bead_id===d).sort((g,O)=>(O.started_at||0)-(g.started_at||0)).map(g=>({attempt_id:g.attempt_id,bead_id:g.bead_id,status:g.status,started_at:typeof g.started_at=="number"?g.started_at:null,runner:g.runner||null,model:g.model||null,effort:g.effort||g.observed_effort||null,speed:g.speed||null,session_id:g.session_id||null,resumed_from:g.resumed_from||null,continuation_mode:g.continuation_mode||null,dismissed_at:typeof g.dismissed_at=="number"?g.dismissed_at:null,cause:typeof g.cause=="string"?g.cause:null,cause_detail:g.cause_detail||null,exec_default_preset_id:typeof g.exec_default_preset_id=="string"?g.exec_default_preset_id:null,exec_default_preset_revision:typeof g.exec_default_preset_revision=="number"?g.exec_default_preset_revision:null,exec_values:g.exec_values&&typeof g.exec_values=="object"?g.exec_values:null,usage:g.usage||null,usage_legs:Array.isArray(g.usage_legs)?g.usage_legs:[],delegation_sessions:Array.isArray(g.delegation_sessions)?g.delegation_sessions:[]}))}function Ne(){if(!a||!d)return null;let l=a.get();return pn(l&&l.attempts||{},d)}let Qe=new Set;function ct(l){Qe.has(l)?Qe.delete(l):Qe.add(l),ce()}function ot(l){let _=a?a.get():null,g=_&&_.attempts?_.attempts[l]:null;je.open({attempt_id:l,meta:g?{runner:g.runner||void 0,model:g.model||void 0,effort:g.effort||void 0,status:g.status||void 0,session_id:g.session_id||void 0}:{}})}function ut(l,_){let g=a?a.get():null,O=g&&g.attempts?g.attempts[l]:null,Re=(O&&Array.isArray(O.delegation_sessions)?O.delegation_sessions:[]).find(Te=>Te&&typeof Te=="object"&&Te.launch_id===_);Re&&je.open({attempt_id:l,launch_id:_,meta:{runner:Re.provider==="claude"?"claude":"codex",role:Re.role,...typeof Re.agent_type=="string"?{agent_type:Re.agent_type}:{},model:Re.model,effort:Re.effort,session_id:Re.session_id,status:Re.status}})}async function ht(l){if(!s||!l)return;let _=await Ir();if(_===null)return;let g=()=>{let Te=a?a.get():null;return Te&&typeof Te.revision=="number"?Te.revision:0},O=async(Te={},Ue=g())=>await s("worker-attempt-resume",{attempt_id:l,expected_revision:Ue,..._!==""?{instructions:_}:{},...Te}),fe=Te=>{Te?.queue&&a?.set&&a.set(Te.queue)},Re=await O();if(fe(Re),Re&&Re.conflict){let Te=Re.queue&&typeof Re.queue.revision=="number"?Re.queue.revision:g();Re=await O({},Te),fe(Re)}Re=await Rn(Re,(Te,Ue)=>O({continuation:Te,decision_token:Ue}),{onResult:fe,refresh:()=>O()}),Re&&Re.resumed===!1&&!Re.conflict&&Re.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Re.reason}`,"error",2400)}let bt={onOpen:ot,onOpenDelegation:ut,onResume:ht,onToggleUsage:ct};function tt(){let l=a?a.get():null,_={...j};for(let g of["orchestration_model","orchestration_effort","orchestration_speed"]){let O=l&&l[g];typeof O=="string"&&(_[g]=O)}return _}async function Tt(){if(s){try{let l=await Promise.resolve(s("get-session-defaults",{}));j=l&&l.values&&typeof l.values=="object"?l.values:{}}catch{j={}}ce()}}function wt(){let l=a?a.get():null;return l&&l.runner_catalog||null}function He(){let l=a?a.get():null;return l&&typeof l.execution_defaults=="object"?l.execution_defaults:null}function ge(){let l=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},g=Jt({pin:{...l,...f},global:tt(),execution_defaults:He(),runner_catalog:wt(),route:typeof l.route=="string"?l.route:null}).orchestration_model.value||"";return wn(wt(),g)}function gt(){let l=i?i.get():null;return!l||typeof l.revision!="number"?null:{revision:l.revision,presets:Array.isArray(l.presets)?l.presets:[]}}function kt(l){return l?.compatible===!1}function nt(l){i&&l&&typeof l.revision=="number"&&Array.isArray(l.presets)&&i.set({revision:l.revision,presets:l.presets})}async function Q(){let l=gt(),_=l?.presets.find(g=>g.id===b);if(!(!s||!d||!l||!_||kt(_)||w)){w=!0,x=[],ce();try{let g=await Promise.resolve(s("apply-impl-preset",Ru(d,_.id,l.revision)));if(g&&g.conflict){nt(g),de("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let O=g&&Array.isArray(g.issue)?g.issue[0]:g?.issue;if(g&&g.applied&&O&&typeof O=="object"){p=O,x=Array.isArray(g.skipped_orchestration_keys)?g.skipped_orchestration_keys.filter(fe=>typeof fe=="string"):[];for(let fe of ju)delete f[fe];de(x.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}g&&g.error==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(g){g&&typeof g=="object"&&g.code==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{w=!1,ce()}}}let le=null;n&&n.subscribe&&(le=n.subscribe(()=>A()));let qe=null;a&&typeof a.subscribe=="function"&&(qe=a.subscribe(()=>{d&&ce()}));let E=null;i&&typeof i.subscribe=="function"&&(E=i.subscribe(()=>{d&&ce()}));function h(l){l.key==="Escape"&&d&&(l.preventDefault(),r())}document.addEventListener("keydown",h);function A(){if(d){if(n&&typeof n.snapshotFor=="function"){let l=n.snapshotFor("detail:"+d)||[];p=l.find(g=>g&&g.id===d)||l[0]||p}he(),ce()}}function F(l){an(l).then(_=>{_?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function oe(l){l.preventDefault(),l.stopPropagation(),d&&F(d)}function ae(l,_){l.preventDefault(),l.stopPropagation(),F(_)}function ve(l,_,g){l.preventDefault(),l.stopPropagation(),ke.open(_,{missing_state:g})}function Ee(l,_){f[l]=_,ce(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",Cu(d,l,_.length===0?null:_))).catch(()=>{de("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Je(l,_){let g=p||{},O=g.metadata&&typeof g.metadata=="object"?g.metadata:{},fe={};for(let Ue of["impl_runtime","impl_model","impl_effort"])fe[Ue]=Object.hasOwn(f,Ue)?f[Ue]:typeof O[Ue]=="string"?O[Ue]:"";fe[l]=_;let Re=Wu(fe,wt(),ge()),Te={};for(let Ue of["impl_runtime","impl_model","impl_effort"])Te[Ue]=f[Ue],f[Ue]=Re[Ue]||"";ce(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...Re,orchestration_runtime:ge()})).then(Ue=>{let pt=Array.isArray(Ue)?Ue[0]:Ue;if(!pt||typeof pt!="object"||!pt.id)throw new Error("implementation target readback failed");p=pt;for(let Ut of["impl_runtime","impl_model","impl_effort"])delete f[Ut];ce()}).catch(()=>{for(let Ue of["impl_runtime","impl_model","impl_effort"])Te[Ue]===void 0?delete f[Ue]:f[Ue]=Te[Ue];ce(),de("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function rt(l,_,g){if(!s||!d)return!1;try{let O=await Promise.resolve(s(l,_)),fe=Array.isArray(O)?O[0]:O;return fe&&typeof fe=="object"&&fe.id?(p=fe,!0):(de(g,"error"),!1)}catch{return de(g,"error"),!1}}function Ye(l){setTimeout(()=>{try{let _=e.querySelector(l);_&&typeof _.focus=="function"&&_.focus()}catch{}},0)}function dt(){P=!0,H=p&&p.title||"",ce(),Ye('.detail-edit__input[data-edit="title"]')}function Rt(l){H=l.target.value}function _t(){P=!1,H="",ce()}function tn(){rt("edit-text",{id:d,field:"title",value:H},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(_=>{_&&(P=!1,H=""),ce()})}function jt(){D=!0,S=p&&p.description||"",ce(),Ye('.detail-edit__textarea[data-edit="description"]')}function Mt(l){S=l.target.value}function Bt(){D=!1,S="",ce()}function Pt(){rt("edit-text",{id:d,field:"description",value:S},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(_=>{_&&(D=!1,S=""),ce()})}function It(l,_,g,O){if(l.key==="Escape"){l.stopPropagation(),g();return}l.key==="Enter"&&(!O||l.ctrlKey||l.metaKey)&&(l.preventDefault(),_())}function ze(l){let _=l.target.value;rt("update-status",{id:d,status:_},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ce())}function nn(l){let _=Number(l.target.value);rt("update-priority",{id:d,priority:_},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ce())}function Ht(l){U=l.target.value}function et(){let l=U.trim();l.length!==0&&rt("label-add",{id:d,label:l},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(_=>{_&&(U=""),ce()})}function Me(l){if(l.key==="Escape"){l.stopPropagation(),U="",ce();return}l.key==="Enter"&&(l.preventDefault(),et())}function C(l){rt("label-remove",{id:d,label:l},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ce())}let pe={onCopyPath:ae,onOpenDoc:ve};function Ie(l){return typeof l=="string"?l:l&&typeof l=="object"?String(l.id||l.to||l.issue_id||l.depends_on||""):""}function at(l){switch(l&&typeof l=="object"?String(l.dependency_type||l.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function xt(l){let g=(Array.isArray(l.dependencies)?l.dependencies:[]).map(O=>({id:Ie(O),icon:at(O)})).filter(O=>O.id.length>0);return u`
      <div class="detail-section-label">의존성</div>
      ${g.length===0?u`<div class="detail-empty">의존성 없음</div>`:u`<div class="detail-deps">
            ${g.map(O=>o?u`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(O.id)}
                  >
                    ${O.icon?`${O.icon} `:""}${O.id}
                  </button>`:u`<span class="detail-dep"
                    >${O.icon?`${O.icon} `:""}${O.id}</span
                  >`)}
          </div>`}
    `}function yt(l){let _=l.metadata||{},g=l.workflow||{},O=g.stages||{},fe=O.spec&&O.spec.stale,Re=O.impl&&O.impl.stale,Te=O.plan||null,Ue=g.route_source==="derived",pt=g.route||_.route||"\u2014";return u`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Ue?" detail-kv__v--derived":""}"
          title=${Ue?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Ue?"unset":pt}</span
        >
      </div>
      ${g.route!=="quick_fix"||Object.hasOwn(_,"spec_review")?u`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${_.spec_review||"\uC5C6\uC74C"}${fe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${g.route==="full_plan"?u`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Te?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Te?.approval_receipt||"\uC5C6\uC74C"}${Te?.approval_state==="stale"?" \xB7 stale":Te?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${g.route!=="quick_fix"||Object.hasOwn(_,"impl_review")?u`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${_.impl_review||"\uC5C6\uC74C"}${Re?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${g.planned_execution?u`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${g.planned_execution.kind}</span>
            </div>
            ${g.planned_execution.kind==="main"?u`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${g.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${g.exec_receipt?u`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Cn(g.exec_receipt)}</span
            >
          </div>`:""}
      ${g.impl_entry?u`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${g.impl_entry.actor}@${g.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${_.pr_url?u`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${_.pr_url}</span>
          </div>`:""}
    `}let v={route:["quick_fix","spec_backed","full_plan"]};async function y(l,_){let g=_.target.value;if(l==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&g!=="full_plan"&&!window.confirm(`full_plan \u2192 ${g||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ce();return}await rt("update-workflow-meta",{id:d,key:l,value:g},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ce()}function k(l){let _=l.metadata||{};return u` ${((O,fe)=>{let Re=v[O],Te=typeof _[O]=="string"?_[O]:"";return u`<div class="detail-kv">
        <span class="detail-kv__k">${O}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${O}
          data-edit=${`wfmeta-${O}`}
          @change=${Ue=>y(O,Ue)}
        >
          <option value="" ?selected=${!Re.includes(Te)}>
            ${fe}
          </option>
          ${Re.map(Ue=>u`<option value=${Ue} ?selected=${Te===Ue}>${Ue}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function M(l,_){return P?u`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${H}
            @input=${Rt}
            @keydown=${g=>It(g,tn,_t,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${tn}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${_t}
            >
              취소
            </button>
          </div>
        </div>
      `:u`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${l}</h2>
        ${zt(_).map(g=>u`<span class="detail-usage-total" title=${g.tooltip}
              >${g.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${dt}
        >
          ✎
        </button>
      </div>
    `}function Z(l){let _=Wt(l.created_at),g=Wt(l.updated_at);return!_&&!g?u``:u`
      ${_?u`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${_}</span>
          </div>`:""}
      ${g?u`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${g}</span>
          </div>`:""}
    `}function me(l,_){return u`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ze}
        >
          ${Dg.map(g=>u`<option value=${g} ?selected=${g===l}>${g}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${nn}
        >
          ${Ng.map(g=>u`<option value=${String(g)} ?selected=${g===_}>
                P${g}
              </option>`)}
        </select>
      </div>
    `}function Le(l){return u`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${D?"":u`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${jt}
            >
              ✎
            </button>`}
      </div>
      ${D?u`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${S}
              @input=${Mt}
              @keydown=${_=>It(_,Pt,Bt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Pt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Bt}
              >
                취소
              </button>
            </div>
          </div>`:u`<div class="detail-overlay__desc">
            ${l||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Xe(l){let _=typeof l.notes=="string"?l.notes:"";return _.trim().length===0?u``:u`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${_}</div>
    `}function $(l){let _=Array.isArray(l.labels)?l.labels:[];return u`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${_.map(g=>u`<span class="detail-label-chip"
              >${g}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${g}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+g}
                @click=${()=>C(g)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${U}
            @input=${Ht}
            @keydown=${Me}
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
    `}function T(){if(!d)return u``;let l=p||{},_=String(l.id||d),g=l.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",O=Ne(),fe=l.status||"open",Re=typeof l.priority=="number"?Math.max(0,Math.min(4,l.priority)):"",Te=l.description||"",Ue={...l,metadata:{...l.metadata||{},...f}};return u`
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
          ${M(g,O)}
          ${Iu(Ue)}
          ${Ou({metadata:Ue.metadata,workspace_values:tt(),catalog:wt(),execution_defaults:He(),expanded:N,presets:gt()?.presets||[],preset_id:b,preset_busy:w,skipped_orchestration_keys:x},{onToggle:pt=>{N=pt,ce()},onEdit:(pt,Ut)=>{if(pt==="impl_runtime"||pt==="impl_model"||pt==="impl_effort"){Je(pt,Ut??"");return}Ee(pt,Ut??"")},onPresetSelect:pt=>{b=pt,x=[],ce()},onPresetApply:()=>{Q()}})}
          ${Fu({md:Ue.metadata,catalog:K,handlers:{onExecChange:Ee}})}
          ${me(fe,Re)} ${Z(l)}
          ${Le(Te)}
          ${bu(Y,lt,{expanded:X,draft:ie,sending:Ce,error:ne})}
          ${Xe(l)} ${$(l)} ${xt(l)}
          ${yt(l)} ${k(l)}
          ${mu(l,pe)}
          ${Ku({expanded:De,loading:z,error:V,data:Pe},{onToggle:re})}
          ${Vu(G(),bt,{total:O,expanded:Qe})}
        </div>
      </div>
    `}function ce(){Ve(T(),e)}return{load(l){l!==d&&(f={},b="",x=[],N=!1,B(),_e(),L(),ye()),d=l,p=null,A(),Tt(),ee!==l&&te(l)},clear(){d=null,p=null,f={},b="",w=!1,x=[],N=!1,B(),_e(),L(),ye(),ke.close(),je.close(),Ve(u``,e)},destroy(){le&&(le(),le=null),qe&&(qe(),qe=null),E&&(E(),E=null),document.removeEventListener("keydown",h),R||(ke.destroy(),ue&&ue.parentNode&&ue.parentNode.removeChild(ue)),je.destroy(),Ae.parentNode&&Ae.parentNode.removeChild(Ae),d=null,p=null,ye(),b="",w=!1,x=[],_e(),L(),Ve(u``,e)}}}function Zu(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(d,p,f="")=>{n&&(n.textContent=d||"Unexpected Error"),r&&(r.textContent=p||"An unrecoverable error occurred.");let b=typeof f=="string"?f.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function Bo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ks(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function Uo(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function Wo(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function zo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function qg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:Bo(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Qu(e,t){let n=qg(e,t);return n?u`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${n.deploy?u`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${n.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${n.deploy.at?Wt(n.deploy.at):""}
            >${zo(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${ks(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Fr(e){let t=on(e.created_at),n=on(e.updated_at);return!t&&!n?"":u`<div class="worker-mini__meta">
    ${t?u`<span title=${`\uC0DD\uC131 ${Wt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?u`<span>·</span>`:""}${n?u`<span title=${`\uC218\uC815 ${Wt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Fg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function $s(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ho(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function kn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,b)=>(f.requested_at||0)-(b.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?Fg(s.phase):null,d=s?.kind==="stale_work_backup_fresh",p=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:p}}function ws(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return u`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?u`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${n.operation_id}</code>
    ${r?u`<code>백업: ${r}</code>`:t.error?u`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?u`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?u`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var jg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Xu(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let c=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:jg[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Go(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
\uC774\uC288 \uD540 \u2014 \uB808\uD3EC \uAE30\uBCF8\uAC12\uACFC \uB2E4\uB984`:"";return u`${e.orchestration?u`<span
        class="exec-chip exec-chip--orch${n}"
        title=${`${e.orchestration.title}${r}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?u`<span
        class="exec-chip exec-chip--worker${n}"
        title=${`${e.worker.title}${r}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}var jo=3;function Bg(e){return u`<div
    class="mon-overlap__popover"
    role="dialog"
    aria-label="scope 겹침"
  >
    ${e.rows.map(t=>u`<div class="mon-overlap__row">
          <div class="mon-overlap__hd">
            <span class="mon-overlap__rid">${t.id}</span>
            <span class="mon-overlap__rtitle">${t.title}</span>
            <span class="mon-overlap__rwhere">${t.location_label}</span>
          </div>
          <ul class="mon-overlap__paths">
            ${t.prefixes.map(n=>u`<li>${n}</li>`)}
          </ul>
          ${t.action.kind==="note"?u`<p class="mon-overlap__note">${t.action.text}</p>`:u`<button
                type="button"
                class="mon-overlap__place"
                data-counterpart-id=${t.id}
                ?disabled=${t.action.kind==="disabled"}
                title=${t.action.title}
              >
                ${t.action.label}
              </button>`}
        </div>`)}
  </div>`}function jr(e,t={}){if(!e)return"";let n=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.successors)?e.successors:[],s=Array.isArray(e.warnings)?e.warnings:[],o=Array.isArray(e.overlaps)?e.overlaps:[],a=e.scope_missing===!0&&t.lane!=="running",i=e.popover||null;if(n.length===0&&r.length===0&&s.length===0&&o.length===0&&!a)return"";let c=o.length>jo,d=c?o.slice(0,jo):o;return u`<div class="worker-deps">
    ${n.map(p=>u`<span class="worker-dep worker-dep--pred" title=${p.title||""}
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
        >`)}${d.map(p=>u`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${p.id}
          title=${p.prefixes.join(`
`)}
        >
          ⧉ 겹침 ${p.id} (${p.location_label})
        </button>`)}${c?u`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip mon-overlap__chip--more"
          data-overlap-all="true"
          title=${o.slice(jo).map(p=>`${p.id} (${p.location_label})`).join(`
`)}
        >
          +${o.length-jo}
        </button>`:""}${a?u`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${r.map(p=>u`<span class="worker-dep worker-dep--succ" title=${p.title||""}
          >${p.label}</span
        >`)}${s.map(p=>u`<span class="worker-dep worker-dep--warn">${p}</span>`)}${i?Bg(i):""}
  </div>`}function Br(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?u`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Ju(e){return e?u`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Ug(e){let t=Array.isArray(e.badges)?e.badges:[],n=zt(e.usage),r=In(e.usage),s=on(e.done_at);return u`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?u`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${s?u`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Wt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
      ${t.map(o=>u`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${o}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${n.length>0?n.map(o=>u`<span class="worker-usage" title=${o.tooltip}
                >${o.label}</span
              >`):r?u`<span class="worker-usage" title=${ss(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?u`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${ks(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Gn(e){if(e.lane==="done"&&e.done_layout==="three_line")return Ug(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=zt(e.usage),s=In(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?on(e.done_at):"",d=t?u`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?u`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",f=e.worker_serial===!0?u`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?u`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",w=u`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,x=e.lane==="done"?"":Br(e.workflow),N=Ju(e.from_id),j=u`<span class="worker-mini__title">${e.title}</span>`,K=e.pr_url&&e.pr_number?u`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",ee=e.completion_repair_pr_url&&e.completion_repair_pr_number?u`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",I=n.map(X=>X===e.live_badge?u`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${X}</span
        >`:u`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${X===e.completion_badge&&e.completion_title||""}
          >${X}</span
        >`),P=e.reason?u`<span class="worker-mini__reason">${e.reason}</span>`:"",D=r.length>0?r.map(X=>u`<span class="worker-usage" title=${X.tooltip}
              >${X.label}</span
            >`):s?u`<span class="worker-usage" title=${ss(e.usage)}
            >${s}</span
          >`:"",H=o?u`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?u`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",S=e.merge_action?u`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",U=e.cancel_action?u`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",B=e.timeline_action?u`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ye=e.discard,$e=ye?.action||e.discard_action?u`<button
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
        </button>`:"",te=e.stale_work||null,Y=te?u`${te.can_resume||te.can_continue?u`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            기존 작업 이어가기
          </button>`:""}${te.can_backup_fresh?u`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            백업 후 새로 시작
          </button>`:""}${te.can_recheck?u`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            다시 확인
          </button>`:""}`:"",xe=te?u`<div class="worker-mini__stale">
        <strong>${te.title}</strong>
        <span>${te.summary}</span>
        <span>${te.cause}</span>
        ${te.can_backup_fresh?u`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Oe=e.revise_action?u`<button
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
        </button>`:"",ne=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?u`<div class="worker-mini__exec">
          ${Go(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",ie=jr(e.dependency_chips,{lane:e.lane}),Ce=ws(e),W=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ye?.operation||e.revise_action||te);return u`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?u`<div class="worker-mini__row1">
            ${b}${w}${N}${j}
          </div>
          <div class="worker-mini__row2">
            ${D}${c?u`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Wt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?u`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${ks(e.work_ms)}</span
                >`:""}${I}${H}
            <span class="worker-mini__actions"
              >${S}${U}${B}${$e}</span
            >
            ${Fr(e)}
          </div>`:a?u`<div class="worker-mini__head">
              ${d}${p}${b}${w}${x}${N}${K}${ee}${I}${f}${P}
            </div>
            <div class="worker-mini__body">${j}${xe}</div>
            ${ie}${ne}${W?u`<div class="worker-mini__foot">
                  ${D}${H}
                  <span class="worker-mini__actions"
                    >${S}${U}${B}${$e}${Oe}${Y}</span
                  >
                  ${ws(e)}
                </div>`:""}
            ${Fr(e)}`:u`<div class="worker-mini__line">
              ${d}${p}${b}${w}${x}${N}${j}${K}${ee}${I}${f}${P}${D}${H}${S}${U}${B}${$e}
            </div>
            ${ie}${ne}${Ce} ${Fr(e)}`}
  </div>`}function bi(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),c=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),d=jr(e.dependency_chips,{lane:e.lane});return u`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?u`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?u`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r?u`<span
            class="ctl-chip worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >⛔ worker-ineligible</span
          >`:""}
      ${Br(a)}${Ju(e.from_id)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${a?io(a,e.status,{onOpenDoc:n.onOpenDoc}):""}${d}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?u`<div class="worker-mini__exec">
          ${Go(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?u`<div class="worker-card__place-menu">
            ${t.lanes.map(p=>u`<button
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
          </div>`:u`${e.reason?u`<span
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
    ${Fr(e)}
  </div>`}function _n(e){let t=!!e.collapsible&&!!e.collapsed,n=u`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?u`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return u`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?u`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${n}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:u`<header class="worker-pane__hd">
          ${n}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":u`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?u`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(r=>e.lane==="candidate"?bi(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):Gn(r))}
          </div>`}
  </section>`}var ed={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},td={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function nd(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function yi(e){for(let t of nd(e))if(Object.hasOwn(ed,t))return ed[t];return null}function vi(e){let t=null;for(let n of nd(e))Object.hasOwn(td,n)&&(t=td[n]);return t}function Vo(e){let t=yi(e),n=vi(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function rd(e,t){let n=yi(e)??yi(t),r=vi(t)??vi(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var sd=160;function Wg(e){return e.length>sd?`${e.slice(0,sd)}\u2026`:e}function zg(e){return!e||!e.reason?"":u`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?u` · <code>${Wg(e.command)}</code>`:""}
  </div>`}function Hg(e){return e?u`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Gg(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function od(e){let t=e.failure?Vo(e.failure.reason):"";return u`<div class="worker-banners">
    ${e.failure?u`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?u`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?u`<button
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
          ${e.failure.resume_attempt_id?u`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${zg(e.failure.cause_detail)}
          ${Hg(e.failure.reason)}
          ${ws({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Vg(e){return e?u`${e.repo?u`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?u`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}var Kg=new Set(["codex-runner"]);function Yg(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&Kg.has(b.agent_type))),c=i.filter(b=>b&&b.state==="live"),d=i.filter(b=>b&&b.state!=="live"),p=jr(e.dependency_chips,{lane:"running"}),f=r?on(r.updated_at,t):"";return u`${o?u`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?u`<span class="rtile__activity-age"
              >${on(a,t)}</span
            >`:""}
      </div>`:f?u`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">갱신 ${f}</span>
        </div>`:""}${c.length>0||d.length>0?u`<div class="rtile__legs">
        ${c.map(b=>u`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${b.label}</span
            >`)}${d.length>0?u`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${d.map(b=>b.label).join(", ")}`}
              >위임 완료 ${d.length}</span
            >`:""}
      </div>`:""}${p}`}function wi(e,t,n=null,r={}){let s=e.kind==="session",o=e.failed===!0,a=!!e.paused,i=o?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Gg(t-e.started_at):"\u2014",c=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=ts(e),p=zt(e.usage),f=In(e.usage),b=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,w=e.base_exception||null,x=e.landing,N=e.attempt_id&&e.attempt_id===n,j=r.monitor||null,K=Vg(j),ee=Yg(j,t,a,s?{updated_at:e.updated_at??null}:null),I=s&&e.workflow?.chips?.exec_receipt||null,P=I?u`<div class="rtile__meta">
        <span
          class="ctl-chip ctl-chip--exec-receipt"
          title=${`exec_receipt ${Cn(I)}`}
          >${`${I.kind}:${lo(I)}`}</span
        >
      </div>`:"",D=s?"":Fr(e),H=e.discard?.action?u`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return u`<div
    class="rtile${N?" rtile--sel":""}${a?" rtile--paused":""}${o?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Br(e.workflow)}${K}${d?u`<span class="rtile__resumed" title=${d}>↻</span>`:""}
      ${s?u`${typeof e.started_at=="number"?u`<span class="rtile__elapsed">${i}</span>`:""}<span
              class="rtile__session-badge"
              title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
              >세션</span
            >`:u`<span class="rtile__elapsed">${i}</span>`}
      ${s?"":o?u`<button
                type="button"
                class="rtile__resume"
                ?disabled=${e.resume_eligible===!1}
                title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                aria-label="이어하기"
              >
                ↻ 이어하기
              </button>
              ${H}
              <button
                type="button"
                class="rtile__dismiss"
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="실패 기록 닫기"
              >
                ✕
              </button>`:u`<button
                type="button"
                class="rtile__session"
                title="라이브 세션 열기"
                aria-label="라이브 세션 열기"
              >
                ▤ 세션
              </button>
              ${a?u`<button
                    type="button"
                    class="rtile__resume"
                    title="같은 세션으로 이어서 재개"
                    aria-label="재개"
                  >
                    ▶
                  </button>`:u`<button
                    type="button"
                    class="rtile__pause"
                    ?disabled=${e.can_pause===!1}
                    title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                    aria-label="일시정지"
                  >
                    ⏸
                  </button>`}
              ${H}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${ee}${e.rollup?ao(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Oa}):""}
    ${x?u`<div class="rtile__landing">
          <span
            class="merge-step${x.failed?" merge-step--failed":""}"
            style=${`--progress: ${x.percent}%`}
            >${x.label}${x.index>0?u`<span class="merge-step__n"
                  >${x.index}/${x.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${s?P:c||p.length>0||f||b||w?u`<div class="rtile__meta">
            ${b?u`<span class="worker-mini__badge">${b}</span>`:""}
            ${w?u`<span
                  class="worker-mini__badge"
                  title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                  >${w}</span
                >`:""}
            ${Go(e.exec_chips)}
            ${p.length>0?p.map(S=>u`<span class="worker-usage" title=${S.tooltip}
                      >${S.label}</span
                    >`):f?u`<span
                    class="worker-usage"
                    title=${ss(e.usage)}
                    >${f}</span
                  >`:""}
          </div>`:""}
    ${D} ${ws(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${o||a?"":u`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function ki(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return u`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?u`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>wi(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var $i=new Set(["unavailable","not_applicable"]);function Vn(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function ad(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Kn(e,t){return t===null?null:`${Hn[e]}: ${t.display} (${Po[t.source]})`}function xi(e){return e.filter(t=>t!==null).join(`
`)}function xs(e){if(typeof e!="object"||e===null)return null;let t=lr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:xi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Hn.orchestration_model,e.model),n(Hn.orchestration_effort,e.effort),n(Hn.orchestration_speed,e.speed)])}}function pr(e,t){let n=Vn(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Vn(e,"orchestration_effort"),s=Vn(e,"orchestration_speed"),o=ad([wn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:xi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Kn("orchestration_model",n),Kn("orchestration_effort",r),Kn("orchestration_speed",s)])}}function Zg(e,t){return e===null||e.value===null||$i.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Qg(e){return e===null||$i.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Xg(e){return e===null?null:e.value==="auto"?"auto":$i.has(e.resolution)?null:e.display}function Yn(e,t){if(typeof e!="object"||e===null)return null;let n=Vn(e,"impl_dispatch"),r=Vn(e,"impl_runtime"),s=Vn(e,"impl_model"),o=Vn(e,"impl_effort"),a=Vn(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":ad([Zg(r,t??null),Qg(s),Xg(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:xi(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Kn("impl_dispatch",n),Kn("impl_runtime",r),Kn("impl_model",s),Kn("impl_effort",o),Kn("impl_speed",a)])}}var en="",Jg=["impl_runtime","impl_model","impl_effort"],eh=5,Ko=1;function qn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Yo(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(L=>de(L,"error",4e3)),o={},a={},i=[],c=!1,d=null,p={},f="",b="",w=!1,x=!1,N=!1,j=null,K=!1;function ee(){let L=t.queue?t.queue():null;return qn(L)?L:null}function I(){let L=ee();return L?L.runner_catalog:null}function P(){let L=ee();return L&&qn(L.execution_defaults)?L.execution_defaults:null}function D(){let L=t.implPresetStore?.get();return qn(L)&&Array.isArray(L.presets)?L:null}function H(){return r===null?{}:{root_dir:r}}async function S(L,J){return K||!n?null:await n(L,J)}function U(L){L&&qn(L.queue)&&t.onQueueAdopt?.(L.queue)}async function B(L,J){let re=ee();if(!re||K)return null;let G=await S(L,{...J,...H(),expected_revision:re.revision});if(U(G),r!==null&&G&&G.conflict){let Ne=G.queue&&typeof G.queue.revision=="number"?G.queue.revision:ee()?.revision??re.revision;G=await S(L,{...J,...H(),expected_revision:Ne}),U(G)}return G}async function ye(){c=!0,be();try{let L=await S("get-session-defaults",{...H()});o=qn(L?.values)?{...L.values}:{},a={...o},i=Array.isArray(L?.warnings)?L.warnings:[]}catch(L){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}finally{c=!1,be()}}async function $e(){let L=Su(o,a);if(Object.keys(L).length!==0){try{let J=await S("set-session-defaults",{values:L,...H()});o=qn(J?.values)?{...J.values}:{},a={...o},i=Array.isArray(J?.warnings)?J.warnings:[]}catch(J){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}be()}}function te(L,J){if(Jg.includes(L)){Oe(L,J);return}J===en?delete a[L]:a[L]=J,be(),$e()}function Y(){let L=Ke().orchestration_model,J=Jt({global:{orchestration_model:L??void 0},execution_defaults:P(),runner_catalog:I()}).orchestration_model.value;return J?wn(I(),J):null}function xe(L,J){typeof J=="string"&&J.length>0?a[L]=J:delete a[L]}function Oe(L,J){let re=J===en?void 0:J,G=xu({impl_runtime:L==="impl_runtime"?re:a.impl_runtime,impl_model:L==="impl_model"?re:a.impl_model,impl_effort:L==="impl_effort"?re:a.impl_effort},I(),Y());xe("impl_runtime",G.impl_runtime),xe("impl_model",G.impl_model),xe("impl_effort",G.impl_effort),be(),$e()}async function ne(){let L=ee();if(!L)return;let J={orchestration_model:L.orchestration_model??null,orchestration_effort:L.orchestration_effort??null,orchestration_speed:L.orchestration_speed??null},re=Eu(J,{...J,...p});if(Object.keys(re).length!==0){try{let G=await B("worker-queue-set-orchestration-defaults",{values:re});if(G&&G.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}p={}}catch(G){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}be()}}function ie(L,J){p[L]=J===en?null:J,be(),ne()}function Ce(L){if(d=L,!L){be();return}let J=I(),re=Ke(),G=re.orchestration_model;G&&!ys(J,L).includes(G)&&(p.orchestration_model=null,G=null);let Ne=re.orchestration_effort;Ne&&!di(J,L,G||cn).includes(Ne)&&(p.orchestration_effort=null),be(),ne()}async function W(L){if(!(!ee()||L<Ko)){try{await B("worker-queue-set-slots",{slots:L})}catch(J){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}be()}}async function X(L){if(!(!ee()||L<Ko||L>eh)){try{await B("worker-queue-set-serial-lane-count",{count:L})}catch(J){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}be()}}async function _e(L,J){let re=L==="auto_advance"?"worker-automation-toggle":L==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await B(re,{on:J})}catch(G){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}be()}function Se(){let L={},J=Ke();for(let re of Oo){let G=Nn.includes(re)?J[re]:a[re];typeof G=="string"&&G.length>0&&(L[re]=G)}return L}async function he(){let L=D();if(!L)return;let J=Se();if(Object.keys(J).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let re=(L.presets||[]).find(Ne=>Ne.id===f),G=b.trim()||(re?re.name:"");if(!G){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Ne=re?await S("impl-preset-update",{expected_revision:L.revision,id:re.id,name:G,settings:J}):await S("impl-preset-create",{expected_revision:L.revision,name:G,settings:J});if(Ne&&Ne.applied){if(b="",!re&&Array.isArray(Ne.presets)){let Qe=Ne.presets.find(ct=>ct.name===G);f=Qe?Qe.id:f}be()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),be()}catch(Ne){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Ne instanceof Error?Ne.message:String(Ne)}`)}}async function Be(){let L=D();if(!(!L||f.length===0))try{let J=await S("impl-preset-delete",{expected_revision:L.revision,id:f});J&&J.applied?(f="",be()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),be())}catch(J){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}}function we(L){o=qn(L.values)?{...L.values}:{},a={...o},i=Array.isArray(L.warnings)?L.warnings:[],qn(L.queue)&&(t.onQueueAdopt?.(L.queue),p={})}async function Ze(){let L=D(),J=ee();if(!L||!J||f.length===0)return;let re=G=>({preset_id:f,expected_revision:L.revision,expected_queue_revision:G,...H()});try{let G=await S("apply-impl-preset-global",re(J.revision));if(G&&G.applied&&we(G),r!==null&&G&&G.queue_applied===!1){let Ne=G.queue&&typeof G.queue.revision=="number"?G.queue.revision:ee()?.revision??J.revision;G=await S("apply-impl-preset-global",re(Ne)),G&&G.applied&&we(G)}G&&G.applied?G.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):G&&G.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(G){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}be()}async function lt(){x=!0,N=!1,be();try{let L=await S("get-worker-system-prompt",{});!L||typeof L!="object"||Array.isArray(L)?N=!0:j=L}catch{N=!0}finally{x=!1,be()}}function R(){if(w=!w,w&&!j){lt();return}be()}function ue(){let L=Pr({loading:x,error:N});if(L)return L;if(!j)return"";let J=Array.isArray(j.variants)?j.variants:[];return u`<div class="settings-dialog__sp-body">
      ${j.target_base_placeholder?u`<div class="prompt-block__meta">
            \`${j.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${J.map(re=>u`<div class="settings-dialog__sp-variant" data-variant=${re.key}>
            <div class="settings-dialog__sp-cond">${re.condition}</div>
            ${Dn(re.label,re.system_prompt)}
          </div>`)}
    </div>`}function ke(){return u`<section
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
        @click=${R}
      >
        ${w?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${w?ue():""}
    </section>`}function Ae(L,J,re,G,Ne,Qe,ct){let ot=Ne[L]??en,ut=pi(L,re,Ne,P(),I(),ct),ht=ut.options.find(tt=>tt.value===ot),bt=ot===en?ut.full_value:ht?.full_value;return u`<select
        class=${ot===en?"settings-dialog__unset":""}
        data-key=${L}
        aria-label=${J}
        title=${bt||""}
        ?disabled=${Qe===!0||ut.disabled}
        .value=${dr(String(ot))}
        @change=${tt=>G(L,String(tt.target.value))}
      >
        <option value=${en} ?selected=${ot===en}>
          ${ut.unset_label}
        </option>
        ${ut.options.map(tt=>u`<option
              value=${tt.value}
              title=${tt.full_value||""}
              ?selected=${tt.value===ot}
            >
              ${tt.label}
            </option>`)}
      </select>
      ${ot===en?u`<span class="settings-dialog__source-badge">기본</span>`:""}`}function je(L,J,re,G,Ne,Qe=!1,ct){return u`<div
      class=${`settings-dialog__row${Qe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        ${Ae(L,J,re,G,Ne,Qe,ct)}
      </span>
    </div>`}function De(L,J,re,G,Ne){return u`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${J}-on)`}
        ></i>
        ${L}
      </span>
      <span class="settings-dialog__controls">
        ${Ae(re,`${L} \uBAA8\uB378`,G,te,a,!1)}
        ${Ae(Ne,`${L} effort`,Mo,te,a,!1)}
      </span>
    </div>`}function z(L,J,re,G){return u`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${G?" is-on":""}`}
          data-automation=${L}
          aria-pressed=${G?"true":"false"}
          aria-label=${J}
          @click=${()=>_e(L,!G)}
        >
          ${G?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${re}</span>
      </span>
    </div>`}function V(L,J,re,G){return u`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${L}>
          <button
            type="button"
            aria-label=${`${J} \uAC10\uC18C`}
            @click=${()=>G(re-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${re}</span>
          <button
            type="button"
            aria-label=${`${J} \uC99D\uAC00`}
            @click=${()=>G(re+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Pe(L){return u`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${L.rows.length>0?`\uBCC0\uACBD ${L.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${L.rows.map(J=>u`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${J.kind}
          >
            <span class="settings-dialog__preset-diff-label">${J.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${J.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${J.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${L.ignored_keys.length>0?u`<div class="settings-dialog__preset-diff-note">
            ${L.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Ke(){let L=ee(),J={};for(let re of Nn)J[re]=Object.prototype.hasOwnProperty.call(p,re)?p[re]:L&&typeof L[re]=="string"?L[re]:null;return J}function Ge(){let L=I(),J=a.impl_runtime,re=a.impl_model,G=D(),Ne=ee(),Qe=Ke(),ct=ys(L,d),ot=Nr(L,void 0).filter(ge=>ge!==cn),ut=di(L,d,Qe.orchestration_model||cn).filter(ge=>ge!==cn),ht=f?(G?.presets||[]).find(ge=>ge.id===f):null,bt=ht?Au(Se(),qn(ht.settings)?ht.settings:{}):null,tt=Ne&&typeof Ne.slots=="number"?Ne.slots:Ko+1,Tt=Ne&&typeof Ne.serial_lane_count=="number"?Ne.serial_lane_count:Ko,wt=P()?.supported===!0,He=pi("workflow_mode",hs,a,P(),L);return u`
      ${i.length>0?u`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${wt?"":u`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${c?u`<div class="settings-dialog__empty">불러오는 중…</div>`:u`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${dr(f)}
                @change=${ge=>{f=String(ge.target.value),be()}}
              >
                <option value="" ?selected=${f===""}>
                  실행 프리셋…
                </option>
                ${(G?.presets||[]).map(ge=>u`<option
                      value=${ge.id}
                      ?selected=${ge.id===f}
                    >
                      ${ge.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!bt||bt.rows.length===0}
                @click=${Ze}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${f?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${dr(b)}
                @input=${ge=>{b=String(ge.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${f?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${he}
              >
                ${f?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${f.length===0}
                @click=${Be}
              >
                삭제
              </button>
            </div>
            ${bt?Pe(bt):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${dr(d||en)}
                    @change=${ge=>{let gt=String(ge.target.value);Ce(gt===en?null:gt)}}
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
              ${je("orchestration_model","\uBAA8\uB378",ct,ie,Qe)}
              ${je("orchestration_effort","effort",ut,ie,Qe)}
              ${je("orchestration_speed","\uC18D\uB3C4",gs,ie,Qe)}
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
                      @click=${()=>te("workflow_mode",en)}
                    >
                      ${He.unset_label}
                    </button>
                    ${a.workflow_mode?"":u`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${hs.map(ge=>u`<button
                          type="button"
                          data-mode=${ge}
                          aria-pressed=${String(a.workflow_mode===ge)}
                          @click=${()=>te("workflow_mode",ge)}
                        >
                          ${ge}
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
              ${De("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",bs,"spec_review_effort")}
              ${De("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Lo,"plan_review_effort")}
              ${De("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",bs,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${je("impl_runtime","\uC704\uC784 \uB300\uC0C1",Io,te,a)}
              ${je("impl_model","\uBAA8\uB378",Nr(L,J),te,a)}
              ${je("impl_effort","effort",qr(L,J,re),te,a)}
              ${je("impl_speed","\uC18D\uB3C4",gs,te,a)}
              ${je("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",ot,te,a,!1,{...a,...Qe})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${z("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",Ne?.auto_advance===!0)}
              ${z("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",Ne?.auto_merge===!0)}
              ${z("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",Ne?.auto_repair===!0)}
              ${V("slots","\uB3D9\uC2DC \uC2E4\uD589",tt,ge=>W(ge))}
              ${V("serial-lane-count","\uC9C1\uB82C \uB808\uC778",Tt,ge=>X(ge))}
            </div>
            ${ke()}
          `}
    `}function be(){K||Ve(Ge(),e)}return{load(){return p={},ye()},render:be,sessionDraft:()=>({...a}),destroy(){K=!0,Ve(u``,e)}}}function As(e){return u`<svg
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
  </svg>`}function id(){return As(xr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ld(){return As(xr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function cd(){return As(xr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function ud(){return As(xr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function dd(){return As(xr`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function pd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function fd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return zt(_o(t));let n={};for(let i of On)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let d=!1;for(let p of On){let f=c[p];typeof f=="number"&&Number.isFinite(f)&&(n[p]+=f,r=!0,d=!0)}if(d){o+=1;let p=c.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?In(n):null}function $n(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ur(e,t){let n=$n(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function th(e,t){if(!$n(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function nh(e){if(!$n(e)||!$n(e.execution_defaults)||!$n(e.runner_catalog)||!$n(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=Jt({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=wn(e.runner_catalog,n.orchestration_model.value??""),s=pr(n,e.runner_catalog),o=Yn(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function _d(e,t){let n=t.notify||(W=>de(W,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let c=document.createElement("div");c.className="mon2-deck__panel-body",s.append(o,c),e.appendChild(s);let d=null,p=null,f=null,b=new Map;function w(){let W=t.workspacesState?t.workspacesState():[];return Array.isArray(W)?W.filter(X=>$n(X)):[]}function x(W){return w().find(X=>X.root_dir===W)||null}function N(W){return th(x(W),b.get(W))}function j(){for(let W of w()){let X=b.get(W.root_dir);X&&typeof X.revision=="number"&&typeof W.revision=="number"&&W.revision>=X.revision&&b.delete(W.root_dir)}}async function K(W,X,_e){let Se=t.transport,he=N(X);if(!(!Se||!$n(he))){try{let Be=await Se(W,{..._e,root_dir:X,expected_revision:he.revision});if($n(Be?.queue)&&b.set(X,Be.queue),Be&&Be.conflict){let we=$n(Be.queue)&&typeof Be.queue.revision=="number"?Be.queue.revision:N(X)?.revision;Be=await Se(W,{..._e,root_dir:X,expected_revision:we}),$n(Be?.queue)&&b.set(X,Be.queue)}}catch(Be){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Be instanceof Error?Be.message:String(Be)}`)}ne()}}function ee(W){d!==W&&(d=W,t.onFocusChange?.(d),ne())}function I(W){ee(d===W?null:W)}function P(W){if(p===W){H();return}D(),p=W;let X=x(W);a.textContent=`${X?.name||W} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,f=Yo(c,{root_dir:W,queue:()=>N(W),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:_e=>{b.set(W,_e),ne()}}),f.load(),ne()}function D(){f?.destroy(),f=null}function H(W){D(),p=null,s.hidden=!0,a.textContent="",W!==!0&&ne()}let S=()=>H();i.addEventListener("click",S);function U(W){W.key==="Escape"&&d!==null&&ee(null)}document.addEventListener("keydown",U);function B(W,X){let _e=Math.max(X,W,1);return u`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${X}\uAC1C \uC911 ${W}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:_e},(Se,he)=>he<W?u`<i class="mon2-deck__slot is-run"></i>`:u`<i class="mon2-deck__slot"></i>`)}
    </span>`}function ye(W){let X=W.auto_advance===!0,_e=W.auto_merge===!0;return u`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${X?" is-on":""}`}
        data-act="auto"
        aria-pressed=${X?"true":"false"}
        aria-label=${`${W.name} \uC790\uB3D9\uD654`}
        title=${X?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${X?ld():id()}
        <span class="mon2-deck__op-label">자동화</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${_e?" is-on":""}`}
        data-act="merge"
        aria-pressed=${_e?"true":"false"}
        aria-label=${`${W.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${_e?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${cd()}
        <span class="mon2-deck__op-label">머지</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${p===W.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${p===W.root_dir?"true":"false"}
        aria-label=${`${W.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${dd()}
      </button>`}function $e(W){let X=nh(W);return X?u`<div class="mon2-deck__chips">
      ${X.orchestration?u`<span class="mon2-deck__chip" title=${X.orchestration.title}
            >오케 ${X.orchestration.text}</span
          >`:""}
      ${X.worker?u`<span class="mon2-deck__chip" title=${X.worker.title}
            >워커 ${X.worker.text}</span
          >`:""}
    </div>`:""}function te(W){let X=Ur(W,"running"),_e=typeof W.slots=="number"?W.slots:1;return u`<div
      class=${`mon2-deck__tile${d===W.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${W.root_dir}
      aria-pressed=${d===W.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${W.root_dir}>${W.name}</span>
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
        ${ud()} ${B(X,_e)}
        <span class="mon2-deck__counts"
          >${X}/${_e} 실행 · 대기 ${Ur(W,"queue")} · PR
          ${Ur(W,"pr_wait")}${Ur(W,"session_active")>0?` \xB7 \uC138\uC158 ${Ur(W,"session_active")}`:""}</span
        >
      </div>
      <div class="mon2-deck__ops">${ye(W)}</div>
      ${$e(W)}
    </div>`}function Y(W){let X=t.doneItems?t.doneItems():[],_e=t.rangeLabel?t.rangeLabel():"",Se=fd(Array.isArray(X)?X:[]),he=Be=>W.reduce((we,Ze)=>we+Ur(Ze,Be),0);return u`<div
      class="mon2-deck__total"
      title=${`visible \uB808\uD3EC ${W.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${_e}`}
    >
      <div class="mon2-deck__total-counts">
        실행 ${he("running")} · 대기 ${he("queue")} · PR
        ${he("pr_wait")}${he("session_active")>0?` \xB7 \uC138\uC158 ${he("session_active")}`:""}
        · ${_e} 완료
        ${Array.isArray(X)?X.length:0}
      </div>
      ${Se===null?"":u`<div class="mon2-deck__total-tokens">
            ${typeof Se=="string"?u`<span
                  class="mon2-deck__tok"
                  title=${pd(_e)}
                  >τ ${Se}</span
                >`:Se.map(Be=>u`<span
                      class="mon2-deck__tok"
                      data-provider=${Be.provider}
                      title=${Be.tooltip}
                      >τ ${Be.label}</span
                    >`)}
          </div>`}
    </div>`}function xe(){let W=w();return W.length===0?"":u`<div class="mon2-deck__row">
      ${Y(W)}
      <div class="mon2-deck__strip">
        ${W.map(X=>te(X))}
      </div>
    </div>`}function Oe(){d!==null&&!x(d)&&(d=null,t.onFocusChange?.(null))}function ne(){j(),Oe(),p!==null&&!x(p)&&H(!0),Ve(xe(),r),f?.render()}function ie(W){let X=W.target;if(!X||typeof X.closest!="function")return;let _e=X.closest("[data-root-dir]");if(!_e)return;let Se=_e.getAttribute("data-root-dir")||"",he=X.closest("[data-act]")?.getAttribute("data-act");if(he==="worker"){t.gotoWorkerTab?.(Se);return}if(he==="auto"){K("worker-automation-toggle",Se,{on:N(Se)?.auto_advance!==!0});return}if(he==="merge"){K("worker-merge-auto-toggle",Se,{on:N(Se)?.auto_merge!==!0});return}if(he==="gear"){P(Se);return}I(Se)}function Ce(W){if(W.key!=="Enter"&&W.key!==" ")return;let X=W.target;if(!X||typeof X.closest!="function")return;let _e=X.closest('[data-root-dir][role="button"]');!_e||_e!==X||(W.preventDefault(),I(_e.getAttribute("data-root-dir")||""))}return r.addEventListener("click",ie),r.addEventListener("keydown",Ce),{render:ne,focusRoot:()=>d,panelRoot:()=>p,destroy(){document.removeEventListener("keydown",U),r.removeEventListener("click",ie),r.removeEventListener("keydown",Ce),i.removeEventListener("click",S),D(),Ve(u``,r),e.replaceChildren()}}}var rh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",sh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694";function Ai(e,t){return`${e}\0${t}`}function oh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function ah(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function ih(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function lh(e,t){let n=new Set(t),r=new Map,s=new Map;for(let i of n){let c=Array.from(new Set((e.get(i)||[]).filter(d=>d!==i&&n.has(d))));r.set(i,c.length);for(let d of c){let p=s.get(d);p?p.push(i):s.set(d,[i])}}let o=[],a=Array.from(n).filter(i=>r.get(i)===0).sort();for(;a.length>0;){let i=a.shift();o.push(i);for(let c of(s.get(i)||[]).slice().sort()){let d=(r.get(c)||0)-1;r.set(c,d),d===0&&a.push(c)}}for(let i of t)o.includes(i)||o.push(i);return o}function ch(e,t){let n=new Set;for(let[a,i]of t)for(let c of i)n.add(Ai(a,c));let r=new Map,s=new Map;for(let a of e){let i=Ai(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Ai(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function uh(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function dh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Si(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function md(e,t,n){let r=ah(n.blocked_by_map),s=[],o=null,a=w=>{let x=n.owner_of.get(w);return typeof x!="string"||x.length===0?(o=oh(w),null):x},i=(w,x)=>{if(o!==null||w===x)return;let N=r.get(w)||[];if(!N.includes(x))return;let j=a(w);j!==null&&(r.set(w,N.filter(K=>K!==x)),s.push({type:"dep-remove",a:w,b:x,root_dir:j}))},c=(w,x)=>{if(o!==null||w===x)return;let N=r.get(w)||[];if(N.includes(x))return;let j=a(w);if(j!==null){if(ih(r,x,w)){o=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${w}\uAC00 \uC774\uBBF8 ${x}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}r.set(w,[...N,x]),s.push({type:"dep-add",a:w,b:x,root_dir:j})}},d=()=>{let w=n.lane_order.get(e.lane_id||"")||[],x=new Set(w),N=(r.get(e.bead_id)||[]).filter(K=>x.has(K)),j=w.filter(K=>(r.get(K)||[]).includes(e.bead_id));for(let K of N)i(e.bead_id,K);for(let K of j)i(K,e.bead_id);for(let K of N)for(let ee of j)c(ee,K);return w.filter(K=>K!==e.bead_id)},p=(w,x)=>{let N=n.lane_order.get(w)||[],j=N.indexOf(e.bead_id),K=lh(r,N.filter(D=>D!==e.bead_id)),ee=w.startsWith("pending:")?K.length:Math.max(0,Math.min(K.length,j>=0&&x>j?x-1:x)),I=ee>0?K[ee-1]:null,P=ee<K.length?K[ee]:null;if(I===null){P!==null&&c(P,e.bead_id);return}c(e.bead_id,I),P!==null&&(r.get(P)||[]).includes(I)&&(i(P,I),c(P,e.bead_id))},f=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:rh};if(t.kind==="chain"&&e.kind==="repo-serial")return{refused:sh};if(e.kind==="chain"&&d(),t.kind==="chain"&&p(t.lane_id,t.marker_index),o!==null)return{refused:o};let b=[];if(t.kind==="candidate")e.kind!=="candidate"&&b.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=uh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")b.push(Si(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let x=n.parallel_rows,N=x[Math.max(0,Math.min(x.length,t.marker_index))];if(!(!!N&&N.bead_id===e.bead_id)&&dh(n,e.root_dir)&&f!==void 0){let K=f>w?w:w-1;K>=0&&K!==f&&b.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:K},root_dir:e.root_dir})}}}else if(t.kind==="chain")e.kind==="candidate"&&b.push(Si(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0));else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(f!==void 0&&t.index!==f){let w=f>t.index?t.index:t.index-1;w>=0&&w!==f&&b.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else b.push(Si(e.bead_id,e.root_dir,t.index,t.lane_id));return{ops:[...ch(s,n.blocked_by_map),...b]}}var gd={running:3,paused:2,failed:1};function Wr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function hd(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function bd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Wr(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Wr(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let p=t.get(a.bead_id),f=typeof p=="number"&&p>0&&typeof a.finished_at=="number"&&p>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!f&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let p=gd[d.run_state],f=gd[i];if(p>f||p===f&&(d.started_at??0)>(c??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:c})}return{winners:o,resumed_from_ids:r}}function Zo(e){return e.replace(/\/+$/,"")}function ph(e,t){let n=Zo(e),r=Zo(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Qo(e,t){let n=new Set;for(let r of e)for(let s of t){if(!ph(r,s))continue;let o=Zo(r),a=Zo(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}var yd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Ss=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Xo(e,t){let n=yd.find(s=>s.step===e);if(!n)return null;let r=yd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function vd(e){let t=Ss.findIndex(n=>n.step===e);return Ss.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function fr(e){let t=Ss.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function fh(e){let t=Ss.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Ss.length}}function Jo(e){let t=fh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ti=new Set(["queued","running","retry_pending","repairing"]),wd=new Set(["failed","succeeded"]),_h={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Es={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},mh={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Es.base_containment,child_sweep:Es.child_sweep,branch_cleanup:Es.branch_cleanup,parent_close:Es.parent_close};function gh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function hh(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ti,...wd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function bh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=d=>d.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function Ei(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=_h[s];if(!o)return null;let a=Xo(n,`${r} ${o}`);return a?{...a,active:Ti.has(s),failed:s==="failed"}:null}function yh(e){return!e||typeof e!="object"?null:mh[e.step]||null}function Ts(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=yh(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=gh(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(x=>x&&typeof x=="object"&&hh(x,t,i)).sort(bh):[],d=a?c:[],p=d.find(x=>Ti.has(x.state));if(p)return Ei(p);if(s)return s.step==="repo_operations"&&c[0]?Ei(c[0],!0):null;let f=d.find(x=>wd.has(x.state)?x.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return Ei(f);if(r){let x=Xo(r.step,r.label);return x?{...x,active:!0,failed:!1}:null}let b=typeof e.cleanup_cursor=="string"?Es[e.cleanup_cursor]:null;if(!b)return null;let w=Xo(b.step,b.label);return w?{...w,active:!0,failed:!1}:null}function ea(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function Ci(e,t){return`${e}\0${t}`}function kd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Ri(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function vh(e,t){return e==="internal"&&t===void 0}function zr(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function $d(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${zr(s)})`,location_label:zr(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Ri(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:vh(a,s)}}function xd(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=Ci(i.root_dir,c.id);n.set(d,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(d,[]);for(let p of Array.isArray(c.items)?c.items:[])r.set(p.id,d)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=Ci(i.root_dir,c.id),p=Array.isArray(c.items)?c.items[0]:null,b=!!p&&p.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],w=s.get(d);if(w)for(let x of b){let N=r.get(x);N&&N!==d&&!w.includes(N)&&w.push(N)}}let o=(i,c)=>{let d=new Set,p=[i];for(;p.length>0;){let f=p.pop();if(f===c)return!0;!f||d.has(f)||(d.add(f),p.push(...s.get(f)||[]))}return!1},a=new Map;for(let[i,c]of s){let d=[];for(let p of c){let f=n.get(p);o(p,i)&&f&&d.push(f)}d.length>0&&a.set(i,d)}return a}function Ad(e,t){return Ci(e,t)}var Sd=1,Cs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Ii=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Hr={show_blocked:!0,spec:"all"},Ed={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function wh(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Wr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function kh(e,t){let{winners:n,resumed_from_ids:r}=bd(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,c=a.run_state,d=a.started_at,p=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:c,started_at:d,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:pn(e,i.bead_id),can_pause:c==="running"&&p,can_resume:c!=="running"&&p&&!r.has(i.attempt_id)})}return s}function Td(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Et(e){return e&&typeof e=="object"?e:{}}function $h(e,t,n){let r=Et(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=b=>Jt({pin:b,global:a,execution_defaults:s,runner_catalog:o,route:n}),c,d;try{c=i(r),d=i(null)}catch{return null}let p=Cd(pr(c,o),pr(d,o)),f=Cd(Yn(c,null),Yn(d,null));return p||f?{orchestration:p,worker:f}:null}function Cd(e,t){return!e||t&&t.text===e.text?null:e}function xh(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function Ah(e,t){let n=t.get(e);return n?{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${zr(n)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`}:null}function Sh(e,t,n){let r=new Map;for(let c of e)r.set(c,Array.from(n.get(c)||[]).filter(d=>e.includes(d)).length);let s=[],o=new Map,a=e.filter(c=>(r.get(c)||0)===0).sort();for(let c of a)o.set(c,0);let i=[...a];for(;i.length>0;){let c=i.shift();s.push(c);let d=Array.from(t.get(c)||[]).filter(f=>e.includes(f)).sort(),p=(o.get(c)||0)+(d.length>1?1:0);for(let f of d){let b=(r.get(f)||0)-1;r.set(f,b);let w=o.get(f);o.set(f,w===void 0?p:Math.min(w,p)),b===0&&i.push(f)}}return{order:s,indent:o,cycle:s.length!==e.length}}function Eh(e,t,n){let r=new Map,s=new Map,o=new Set,a=(p,f,b)=>{let w=p.get(f);w?w.add(b):p.set(f,new Set([b]))},i=p=>t.get(p)?.lane==="done";for(let[p,f]of e)if(!i(p))for(let b of f)b===p||i(b)||(o.add(b),o.add(p),a(r,b,p),a(s,p,b));let c=new Set,d=[];for(let p of Array.from(o).sort()){if(c.has(p))continue;let f=[],b=[p];for(c.add(p);b.length>0;){let I=b.pop();f.push(I);for(let P of[...r.get(I)||[],...s.get(I)||[]])c.has(P)||(c.add(P),b.push(P))}if(f.length<2)continue;let w=f.map(I=>t.get(I));if(w.every(I=>!!I&&/^s[1-5]$/.test(I.lane||""))&&w.every(I=>I&&w[0]&&I.root_dir===w[0].root_dir&&I.lane===w[0].lane))continue;let{order:N,indent:j,cycle:K}=Sh(f.slice().sort(),r,s),ee=K?f.slice().sort():N;d.push({key:f.slice().sort().join("\0"),cycle:K,nodes:ee.map(I=>{let P=t.get(I);return{id:I,workspace_name:P?P.workspace_name:"",root_dir:P?P.root_dir:"",location_label:P?zr(P):Rd(I,n),indent:K?0:j.get(I)||0}})})}return d}function Rd(e,t){let n=Ri(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Od(e,t,n){let r=t.get(e);if(!r)return Rd(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return zr(r)}function Th(e,t,n){let r=[];for(let s of n.get(e)||[])s!==e&&t.has(s)&&!r.includes(s)&&r.push(s);return r}function Ch(e,t,n,r,s,o,a){let i=(f,b,w,x,N=!1)=>{let j=r.get(f),K=j&&j.lane==="parallel"&&typeof j.position=="number"?j.position-1:null;return{id:f,title:o.get(f)||f,workflow:a.get(f)||null,root_dir:j?j.root_dir:"",workspace_name:j?j.workspace_name:"",seq:b,indent:w,predecessors:x,location_label:Od(f,r,s),draggable:!N&&K!==null,...K!==null?{queue_index:K}:{}}},c=[];for(let f of e.slice().sort((b,w)=>b.key<w.key?-1:1)){let b=new Set(f.nodes.map(w=>w.id));c.push({lane_id:`chain:${f.key}`,label:"",pending:!1,cycle:f.cycle,rows:f.nodes.map((w,x)=>i(w.id,x+1,f.cycle?0:w.indent,f.cycle?[]:Th(w.id,b,n),f.cycle))})}let d=new Set;for(let f of c)for(let b of f.rows)d.add(b.id);let p=[];return t.forEach((f,b)=>{let w=f&&typeof f.seed=="string"&&f.seed.length>0?f.seed:null;w!==null&&d.has(w)||(p.push(b),c.push({lane_id:`pending:${b}`,label:"",pending:!0,cycle:!1,rows:w===null?[]:[i(w,1,0,[])]}))}),c.forEach((f,b)=>{f.label=`\uC5F0\uACB0 ${b+1} \xB7 \uB808\uD3EC \uAC04`}),{chain_lanes:c,pending_lanes_kept:p}}function Rh(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Oh(e,t,n,r,s){let o=new Map;for(let i of[...e.running,...e.queue,...e.runnable]){if(!t.has(i.root_dir))continue;let{scope:c,state:d}=Rh(i,t,n);if(d!==void 0&&(i.scope_state=d),c.length===0)continue;let p=o.get(i.root_dir);p?p.push({item:i,scope:c}):o.set(i.root_dir,[{item:i,scope:c}])}let a=(i,c,d)=>{let p={id:c.id,title:c.title,location_label:Od(c.id,r,s),prefixes:d};i.overlap_chips?i.overlap_chips.push(p):i.overlap_chips=[p]};for(let i of o.values())for(let c=0;c<i.length;c+=1)for(let d=c+1;d<i.length;d+=1){let p=Qo(i[c].scope,i[d].scope);p.length!==0&&(a(i[c].item,i[d].item,p),a(i[d].item,i[c].item,p))}}function Oi(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ta(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Li(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...Hr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Cs.some(R=>R.value===n.candidate_sort)?n.candidate_sort:"repo_spec",c=new Map;for(let R of s)R&&typeof R.root_dir=="string"&&c.set(R.root_dir,R);let d=[],p=[],f=[],b=[],w=[],x=[],N=new Map,j=new Map,K=new Map,ee=new Map,I=new Map,P=new Map,D=new Map,H=new Map,S=new Map;for(let R of r){if(!R||typeof R.root_dir!="string")continue;let ue=R.root_dir,ke=R.name||ue,Ae=c.get(ue),je=Ae&&typeof Ae.revision=="number"?Ae.revision:typeof R.revision=="number"?R.revision:0,De=Et(R.attempts),z=Et(R.bead_titles);for(let[h,A]of Object.entries(z))typeof A=="string"&&A.length>0&&H.set(h,A);let V=Et(R.bead_times),Pe=Et(R.pr_observations),Ke=Et(R.admission),Ge=Et(R.revise_parked),be=Et(R.merge_queue_state),L=Et(R.cleanup_failed),J=Et(R.discard_operations),re=Et(R.bead_blocked_by);Object.hasOwn(R,"bead_scope")&&P.set(ue,Et(R.bead_scope));let G=Et(R.bead_workflow);for(let[h,A]of Object.entries(G))A&&typeof A=="object"&&S.set(h,A);let Ne=Et(R.pr_activity),Qe=Array.isArray(R.repo_operations)?R.repo_operations:[],ct=Array.isArray(R.merge_queue)?R.merge_queue:[],ot=new Set(ct.filter(h=>h&&typeof h.bead_id=="string").map(h=>h.bead_id)),ut=new Map(ct.filter(h=>h&&typeof h.bead_id=="string").map(h=>[h.bead_id,h])),ht=Array.isArray(R.queue)?R.queue:[],bt=(Array.isArray(R.serial_lanes)?R.serial_lanes:[]).filter(h=>h&&/^s[1-5]$/.test(h.id)&&Array.isArray(h.entries)),tt=Et(R.lane_states),Tt=typeof R.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(R.serial_lane_count))):Math.min(5,bt.length);K.set(ue,Tt),ee.set(ue,ht.length);let wt=new Map(bt.map(h=>[h.id,h])),He=new Map;for(let h of bt)for(let A of h.entries)A&&typeof A.bead_id=="string"&&He.set(A.bead_id,h.id);for(let[h,A]of Object.entries(re))Array.isArray(A)&&I.set(h,A.filter(F=>typeof F=="string"&&F.length>0));let ge=Array.isArray(R.done)?R.done:[];for(let h of ge)h&&typeof h.bead_id=="string"&&x.push({id:h.bead_id,root_dir:ue,workspace_name:ke});let gt=new Map;for(let h of ge)h&&typeof h.bead_id=="string"&&typeof h.added_at=="number"&&gt.set(h.bead_id,h.added_at);let kt=h=>({id:h,title:z[h]||h,root_dir:ue,workspace_name:ke,expected_revision:je,draggable:!1,...Et(V[h]).created_at?{created_at:Et(V[h]).created_at}:{},...Et(V[h]).updated_at?{updated_at:Et(V[h]).updated_at}:{}}),nt=new Set;for(let[h,A]of kh(De,gt))nt.add(h),p.push({...kt(h),lane:"running",...He.has(h)?{serial_lane_id:He.get(h)}:{},attempt_id:A.attempt_id,run_state:A.run_state,status:A.status||void 0,workflow:G[h]||null,can_pause:A.can_pause,can_resume:A.can_resume,started_at:A.started_at,last_event_at:A.last_event_at,last_activity:A.last_activity,legs:A.legs,runner:A.runner,model:A.model,effort:A.effort,speed:A.speed,resumed_from:A.resumed_from,continuation_mode:A.continuation_mode,usage:A.usage,exec_chips:{orchestration:xs(A),worker:null},discard:kn(J,h,{attempt_id:A.attempt_id}),badges:A.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:A.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:A.run_state==="failed"});for(let[h,A]of hd(De)){if(p.some(ae=>ae.id===h))continue;let F=A.attempt,oe=A.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";p.push({...kt(h),lane:"running",kind:"session",attempt_id:typeof F.attempt_id=="string"?F.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:G[h]||null,can_pause:!1,can_resume:!1,started_at:A.started_at,last_event_at:typeof F.last_event_at=="number"?F.last_event_at:null,last_activity:F.last_activity&&typeof F.last_activity=="object"?F.last_activity:null,legs:Array.isArray(F.legs)?F.legs:[],runner:typeof F.runner=="string"?F.runner:null,model:typeof F.model=="string"?F.model:null,effort:typeof F.effort=="string"?F.effort:null,speed:typeof F.speed=="string"?F.speed:null,resumed_from:null,continuation_mode:null,usage:F.usage&&typeof F.usage=="object"?F.usage:null,exec_chips:{orchestration:xs(F),worker:null},discard:kn(J,h,{merge_queued:!0}),badges:[A.origin==="auto"?`${oe} \xB7 \uC790\uB3D9`:oe],alert:!1})}for(let h of Array.isArray(R.session_active)?R.session_active:[]){let A=h&&h.bead_id;typeof A!="string"||nt.has(A)||(nt.add(A),Array.isArray(h.blocked_by)&&h.blocked_by.length>0&&I.set(A,h.blocked_by.filter(F=>typeof F=="string"&&F.length>0)),typeof h.title=="string"&&h.title.length>0&&H.set(A,h.title),h.workflow&&typeof h.workflow=="object"&&S.set(A,h.workflow),p.push({...kt(A),title:h.title||z[A]||A,lane:"running",kind:"session",status:"in_progress",started_at:Oi(h.started_at)??Oi(h.updated_at)??void 0,updated_at:Oi(h.updated_at)??void 0,workflow:h.workflow||null,labels:Array.isArray(h.labels)?h.labels:[],spec_id:typeof h.spec_id=="string"?h.spec_id:"",blocked:h.blocked===!0,...Array.isArray(h.blocked_by)?{blocked_by:h.blocked_by.filter(F=>typeof F=="string"&&F.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,badges:[],alert:!1}))}for(let h of Array.isArray(R.pr_wait)?R.pr_wait:[]){let A=h&&h.bead_id;if(typeof A!="string"||nt.has(A))continue;nt.add(A);let F=Et(Pe[A]),oe=Et(F.pr),ae=F.gate?Et(F.gate):null,ve=ot.has(A),Ee=ut.get(A)?.continuation_action||null,Je=!!Ee&&Ee.continuation===null,rt=be.active===A,Ye=h.external===!0,dt=L[A]||null,Rt=Et(Ne[A]),_t=Ts({bead_id:A,merge_sha:h.merge_sha,cleanup_cursor:h.cleanup_cursor,merge_progress:Rt.merge_progress||null,cleanup_failed:dt,repo_operations:Qe}),tn=ea(_t),jt=!!ae&&ae.base_badge==="\uCDA9\uB3CC",Mt=!!dt&&["child_sweep","branch_cleanup","parent_close"].includes(dt.step)&&!!ae&&ae.tier==="merged",Bt=Ye&&!!dt&&!!ae&&ae.tier==="merged",Pt=!!ae&&["closed_unmerged","review","undecidable"].includes(ae.tier),It=kn(J,A,{external:Ye,merge_active:rt||_t?.step==="merge",merge_queued:ve,cleanup_active:tn,merged:!!dt||ae?.tier==="merged"}),ze=!!It.operation;f.push({...kt(A),lane:"pr_wait",workflow:G[A]||null,pr_number:typeof oe.number=="number"?oe.number:null,pr_url:typeof oe.url=="string"?oe.url:void 0,external:Ye,usage:pn(De,A),merge_step:_t,badges:Je?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:_t?[ae?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:dt?[fr(dt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${fr(dt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ae?.gate_badge=="string"&&ae.gate_badge.length>0?[ae.gate_badge]:[],alert:_t?_t.failed===!0:!!dt||Pt,reason:dt&&_t?.active!==!0?Jo(dt.step):"PR \uB300\uAE30",merge_action:ae?.tier==="merged"&&!Mt&&!Bt?!1:!ve||Je,merge_enabled:!ze&&(Je||ae?.enabled===!0||jt||Mt||Bt),merge_label:Je?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Bt||Mt?"\uC815\uB9AC \uC7AC\uAC1C":jt&&!Mt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Je?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ze?It.error?`\uD3D0\uAE30 \uC2E4\uD328: ${It.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${It.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Bt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Mt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":jt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ae?.enabled===!0?`\uBA38\uC9C0 (${ae.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ae?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ve&&!Je,cancel_enabled:!rt,continuation_mismatch:Ee?.mismatch||null,discard:It,discard_action:It.action,discard_enabled:It.enabled,discard_title:It.title})}let Q=(h,A,F,oe)=>{let ae=h&&h.bead_id;if(typeof ae!="string"||nt.has(ae))return null;nt.add(ae);let ve=Ge[ae],Ee=kn(J,ae),Je=Ee.operation?Ee:null,rt={...kt(ae),lane:A,workflow:G[ae]||null,draggable:!Je,discard:Je||void 0,reason:Td(Ke,ae),seq:F+1,queue_position:F+1,queue_index:F,queue_length:oe,badges:ve?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ve,revise_action:!!ve,revise_enabled:!!ve&&!Je,revise_title:ve?ve.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ve.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(re,ae)&&(rt.blocked_by=Array.isArray(re[ae])?re[ae].filter(Ye=>typeof Ye=="string"&&Ye.length>0):[]),rt};for(let h=0;h<ht.length;h++){let A=Q(ht[h],"queue",h,ht.length);if(!A)continue;b.push(A);let F=N.get(ue);F?F.push(A):N.set(ue,[A])}let le=h=>{let A=f.find(ae=>ae.id===h&&ae.root_dir===ue);if(A)return{id:h,title:A.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let F=p.find(ae=>ae.id===h&&ae.root_dir===ue),oe=F&&F.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":F&&F.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:h,title:F?F.title:kt(h).title,badge:oe}},qe=[];for(let h=0;h<Math.max(Tt,bt.length);h++){let A=`s${h+1}`,F=wt.get(A),oe=F&&Array.isArray(F.entries)?F.entries:[],ae=[];for(let Je=0;Je<oe.length;Je++){let rt=Q(oe[Je],A,Je,oe.length);rt&&(ae.push(rt),b.push(rt))}let ve=Et(tt[A]),Ee=Array.isArray(ve.occupied_by)?ve.occupied_by.filter(Je=>typeof Je=="string"):[];ae.length===0&&Ee.length===0&&(Tt<=1||h>=Tt)||qe.push({id:A,index:h,items:ae,raw_length:oe.length,occupied_by:Ee,occupants:Ee.map(Je=>le(Je)),corrections:Array.isArray(ve.corrections)?ve.corrections.length:0,cycle:ve.cycle===!0,...ae.length===0&&Ee.length===0?{empty:!0}:{}})}j.set(ue,qe);let E=Array.from({length:Tt},(h,A)=>{let F=`s${A+1}`,oe=wt.get(F),ae=oe&&Array.isArray(oe.entries)?oe.entries:[],ve=Et(tt[F]);return{id:F,index:ae.length,length:ae.length,occupied_by:Array.isArray(ve.occupied_by)?ve.occupied_by.filter(Ee=>typeof Ee=="string"):[]}});for(let h of Array.isArray(R.runnable)?R.runnable:[]){let A=h&&h.bead_id;if(typeof A!="string"||nt.has(A))continue;nt.add(A);let F=h.workflow&&typeof h.workflow=="object"?h.workflow:null,oe=F&&typeof F.route=="string"&&F.route||(typeof h.route=="string"?h.route:null),ae=$h(Et(Ae),h.exec_pins,oe);Array.isArray(h.blocked_by)&&h.blocked_by.length>0&&I.set(A,h.blocked_by.filter(ve=>typeof ve=="string"&&ve.length>0)),typeof h.title=="string"&&h.title.length>0&&H.set(A,h.title),F&&S.set(A,F),Array.isArray(h.scope)&&D.set(A,h.scope.filter(ve=>typeof ve=="string"&&ve.length>0)),d.push({...kt(A),title:h.title||z[A]||A,lane:"runnable",draggable:!0,reason:Td(Ke,A),created_at:h.created_at??void 0,updated_at:h.updated_at??void 0,status:typeof h.status=="string"?h.status:void 0,labels:Array.isArray(h.labels)?h.labels:[],spec_id:typeof h.spec_id=="string"?h.spec_id:"",workflow:F||(oe?{route:oe,chips:{route:oe}}:null),...ae?{exec_chips:ae}:{},blocked:h.blocked===!0,...Array.isArray(h.blocked_by)?{blocked_by:h.blocked_by.filter(ve=>typeof ve=="string"&&ve.length>0)}:{},place_index:ht.length,place_lanes:E})}for(let h of ge){let A=h&&h.bead_id;if(typeof A!="string"||nt.has(A)||(nt.add(A),o!==void 0&&typeof h.added_at=="number"&&h.added_at<o))continue;let F=wh(De,A),oe=F&&typeof F.done_kind=="string"?F.done_kind:null;w.push({...kt(A),lane:"done",done:!0,done_layout:"three_line",usage:pn(De,A),work_ms:Wo(De,A),done_at:typeof h.added_at=="number"?h.added_at:void 0,done_kind:oe,badges:[...oe&&Ed[oe]?[Ed[oe]]:[],...Uo(De,A)]})}}let U=new Map;s.forEach((R,ue)=>{R&&typeof R.root_dir=="string"&&U.set(R.root_dir,ue)});let B=n&&n.running_sort==="repo"?"repo":"started";p.sort((R,ue)=>{let ke=R.kind==="session",Ae=ue.kind==="session";if(ke!==Ae)return ke?1:-1;if(ke&&Ae){let z=ta(ue.updated_at)-ta(R.updated_at);return z!==0?z:R.id.localeCompare(ue.id)}if(B==="repo"){let z=U.get(R.root_dir)??Number.MAX_SAFE_INTEGER,V=U.get(ue.root_dir)??Number.MAX_SAFE_INTEGER;if(z!==V)return z-V}let je=typeof R.started_at=="number"&&Number.isFinite(R.started_at)?R.started_at:null,De=typeof ue.started_at=="number"&&Number.isFinite(ue.started_at)?ue.started_at:null;return je!==null&&De!==null&&je!==De?je-De:je===null&&De!==null?1:je!==null&&De===null?-1:R.id.localeCompare(ue.id)}),w.sort((R,ue)=>(ue.done_at??0)-(R.done_at??0));let ye=s.length>0?s:r.map(R=>({root_dir:R&&R.root_dir,name:R&&R.name,auto_advance:R&&R.auto_advance,auto_merge:R&&R.auto_merge,slots:R&&R.slots,revision:R&&R.revision,runner_catalog:R&&R.runner_catalog})),$e=new Set(d.map(R=>R.root_dir)),te=[];for(let R of ye){if(!R||typeof R.root_dir!="string")continue;let ue=N.get(R.root_dir)||[],ke=j.get(R.root_dir)||[];!(ue.length>0||ke.some(je=>je.items.length>0||je.occupied_by.length>0))&&!$e.has(R.root_dir)||te.push({root_dir:R.root_dir,name:R.name||R.root_dir,auto_advance:R.auto_advance===!0,auto_merge:R.auto_merge===!0,slots:typeof R.slots=="number"&&R.slots>=Sd?R.slots:Sd,revision:typeof R.revision=="number"?R.revision:0,runner_catalog:Et(R.runner_catalog),items:ue,sublanes:{parallel:ue,serial:ke},serial_lane_count:K.get(R.root_dir)||0,raw_queue_length:ee.get(R.root_dir)||0})}let Y={runnable:d,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:i==="updated_flat",queue:b,queue_groups:te,running:p,pr_wait:f,done:w,chains:[],parallel_rows:[],chain_lanes:[],parallel_raw_length:Object.fromEntries(ee),owner_of:{},pending_lanes_kept:[]},xe=kd(Y);for(let R of x)xe.has(R.id)||xe.set(R.id,{root_dir:R.root_dir,workspace_name:R.workspace_name,lane:"done",state:"done"});let Oe=new Map;for(let[R,ue]of I)for(let ke of ue){let Ae=Oe.get(ke);Ae?Ae.includes(R)||Ae.push(R):Oe.set(ke,[R])}for(let R of[...Y.queue,...Y.runnable]){if(!Object.hasOwn(R,"blocked_by"))continue;let ue=xe.get(R.id);R.blockers=(R.blocked_by||[]).map(ke=>$d(ke,ue,xe,s)),R.blocker_warnings=R.blockers.filter(ke=>ke.missing_internal).map(ke=>`\u26A0 \uC120\uD589 ${ke.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),R.blocker_warnings.length>0&&(R.alert=!0)}for(let R of[...Y.queue,...Y.runnable,...Y.running,...Y.pr_wait]){let ue=R.lane==="running"||R.lane==="pr_wait"?[]:(R.blockers||[]).map(xh),ke=[];for(let De of Oe.get(R.id)||[]){let z=Ah(De,xe);z&&ke.push(z)}let Ae=R.lane==="running"||R.lane==="pr_wait"?[]:R.blocker_warnings||[];if(ue.length===0&&ke.length===0&&Ae.length===0)continue;let je={predecessors:ue,successors:ke,warnings:Ae};R.dependency_chips=je}Oh(Y,P,D,xe,s),Y.chains=Eh(I,xe,s);let ne=xd(Y.queue_groups);for(let R of Y.queue_groups)for(let ue of R.sublanes.serial){let ke=ne.get(Ad(R.root_dir,ue.id));ke&&(ue.cross_wait_peers=ke)}let ie=Ch(Y.chains,Array.isArray(n?.pending_lanes)?n.pending_lanes:[],I,xe,s,H,S);Y.chain_lanes=ie.chain_lanes,Y.pending_lanes_kept=ie.pending_lanes_kept;let Ce=new Map;for(let R of[...Y.running,...Y.queue,...Y.runnable])Ce.has(R.id)||Ce.set(R.id,R);let W=new Set;for(let R of Y.chain_lanes)for(let ue of R.rows){W.add(ue.id);let ke=Ce.get(ue.id);ke&&(ke.overlap_chips&&(ue.overlap_chips=ke.overlap_chips),ke.scope_state&&(ue.scope_state=ke.scope_state))}let X=[];for(let R of N.values())for(let ue of R)W.has(ue.id)||X.push(ue);X.sort((R,ue)=>{let ke=R.workspace_name.localeCompare(ue.workspace_name);return ke!==0?ke:(R.queue_index??0)-(ue.queue_index??0)}),Y.parallel_rows=X;let _e={};for(let[R,ue]of xe)typeof ue.root_dir=="string"&&ue.root_dir.length>0&&(_e[R]=ue.root_dir);Y.owner_of=_e;let Se=Y.runnable.length,he=Y.runnable;a.show_blocked||(he=he.filter(R=>R.blocked!==!0));let Be=he.length;a.spec==="with"?he=he.filter(R=>!!R.spec_id):a.spec==="without"&&(he=he.filter(R=>!R.spec_id)),Y.runnable_hidden={blocked:Se-Be,spec:Be-he.length};let we=(R,ue)=>{let ke=ta(ue.updated_at)-ta(R.updated_at);return ke!==0?ke:R.id.localeCompare(ue.id)},lt=i==="repo_spec"?(R,ue)=>{let ke=R.spec_id?0:1,Ae=ue.spec_id?0:1;return ke!==Ae?ke-Ae:we(R,ue)}:we;if(i==="updated_flat")Y.runnable=he.slice().sort(we),Y.runnable_sections=[];else{let R=new Map;for(let Ae of he){let je=R.get(Ae.root_dir);je?je.push(Ae):R.set(Ae.root_dir,[Ae])}let ue=[],ke=[];for(let Ae of ye){if(!Ae||typeof Ae.root_dir!="string")continue;let je=(R.get(Ae.root_dir)||[]).slice().sort(lt);R.delete(Ae.root_dir),je.length!==0&&(ue.push({root_dir:Ae.root_dir,name:Ae.name||Ae.root_dir,items:je.map(De=>({...De,workspace_name:""}))}),ke.push(...je))}for(let[Ae,je]of R){let De=je.slice().sort(lt);ue.push({root_dir:Ae,name:De[0]?.workspace_name||Ae,items:De.map(z=>({...z,workspace_name:""}))}),ke.push(...De)}Y.runnable=ke,Y.runnable_sections=ue}return Y}var Id="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Ld(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Md(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var qd="bdui.monitor.done-range",Fd="bdui.monitor.running_sort",jd="bdui.monitor.candidate_sort",Bd="beads-ui.monitor.candidate-filter",Ud="beads-ui.monitor.sections";function Ih(){try{let e=window.localStorage.getItem(Bd);if(!e)return{...Hr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Hr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Hr.show_blocked,spec:Ii.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Hr}}}function Pd(e){try{window.localStorage.setItem(Bd,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Lh(){try{let e=window.localStorage.getItem(jd);return Cs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Mh(e){try{window.localStorage.setItem(jd,e)}catch{}}function Ph(){try{let e=window.localStorage.getItem(Ud);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Dd(e){try{window.localStorage.setItem(Ud,JSON.stringify(e))}catch{}}function Dh(){try{let e=window.localStorage.getItem(qd);return dn(e)?e:sn}catch{return sn}}function Nh(e){try{window.localStorage.setItem(qd,e)}catch{}}function qh(){try{return window.localStorage.getItem(Fd)==="repo"?"repo":"started"}catch{return"started"}}function Fh(e){try{window.localStorage.setItem(Fd,e)}catch{}}var Wd="tab:monitor:pipeline",jh=1e3,Bh=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Nd="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Uh(e){return e>=1&&e<=Nd.length?Nd[e-1]:`(${e})`}function zd(e,t){let n=Ct("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,c=t.switchWorkspace,d=t.router,p=t.now||(()=>Date.now()),f=t.confirm||(v=>typeof globalThis.confirm!="function"||globalThis.confirm(v)),b=Dh(),w=qh(),x=Ih(),N=Lh(),j=Ph(),K=null,ee=null,I=null,P=[],D=null;function H(){let v=Bn.find(y=>y.value===b);return v?v.label:""}let S=document.createElement("div");S.className="mon",e.appendChild(S);let U=document.createElement("div");U.className="mon2-drawer",e.appendChild(U);let B=Li(null,null),ye=new Map,$e=new Map,te=null,Y=null,xe=null,Oe=Dr(U,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{K=null,ge()}});async function ne(v,y,k,M,Z=!0){if(!o||!k)return null;let me=await o(v,{...y,root_dir:k,expected_revision:M});if(me&&me.conflict&&Z){me.queue&&$e.set(k,me.queue);let Le=me.queue&&typeof me.queue.revision=="number"?me.queue.revision:M;me=await o(v,{...y,root_dir:k,expected_revision:Le})}return me&&me.queue&&k&&$e.set(k,me.queue),me}function ie(v,y){let k=$e.get(v),M=s&&s.get?s.get():null,Z=(Array.isArray(M)?M:[]).find(Le=>Le?.root_dir===v);return(k||Z)?.merge_queue?.find(Le=>Le.bead_id===y)?.continuation_action}async function Ce(v,y,k,M){let Z=await ne(v,y,k,M),me=$e.get(k)?.revision??Z?.queue?.revision??M;return Rn(Z,(Le,Xe)=>ne(v,{...y,continuation:Le,decision_token:Xe},k,me,!1),{refresh:Le=>ne(v,y,k,Le?.queue?.revision??$e.get(k)?.revision??me,!1)})}async function W(v,y,k,M){let Z=await Rn({continuation_mismatch:M},(Le,Xe)=>ne("worker-merge-queue-add",{bead_id:y,continuation:Le,decision_token:Xe},v,k,!1)),me=Z?.queue?.merge_queue?.find(Le=>Le.bead_id===y)?.continuation_action;Z?.applied!==!0&&me?.continuation===null&&me.mismatch&&await W(v,y,Z.queue.revision,me.mismatch)}async function X(v,y,k){let M=await ne("worker-discard",v,y,k);if(M&&M.discarded===!0){de(Ho(M),"success",5e3);return}if(M&&M.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${M.reason}`,"error");return}if(M&&M.accepted&&M.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(M&&M.accepted){de(`\uD3D0\uAE30 \uC9C4\uD589: ${M.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}M&&!M.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function _e(v,y,k){return!o||!k?null:await o(v,{...y,root_dir:k})}async function Se(){let v=new Map;for(let y of B.pr_wait)v.has(y.root_dir)||v.set(y.root_dir,y.expected_revision);for(let[y,k]of v)await ne("worker-merge-queue-add-all",{},y,k)}function he(v){let y=j[v];return!!(y&&y.runnable===!0)}function Be(v){let y={...j[v]||{}};y.runnable=!y.runnable,j={...j,[v]:y},Dd(j),ge()}function we(v){return j[v]===!0}function Ze(v){j={...j,[v]:j[v]!==!0},Dd(j),ge()}function lt(v){let y=B.queue_groups.find(k=>k.root_dir===v);if(!y)return null;for(let k=0;k<y.serial_lane_count;k+=1){let M=`s${k+1}`,Z=y.sublanes.serial.find(me=>me.id===M);if(!Z||Z.raw_length===0&&Z.occupied_by.length===0)return M}return null}function R(v,y){let k=B.queue_groups.find(Z=>Z.root_dir===v),M=k?k.sublanes.serial.find(Z=>Z.id===y):void 0;return M?M.raw_length:0}function ue(v,y){let k=ye.get(v),M=ye.get(y);if(!k||!M)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let Z=Ld(k),me=Ld(M);if(Z!==null&&Z===me&&k.root_dir===M.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let Le=Md(k),Xe=Md(M);if(Le&&me!==null){let $=me;return{kind:"ops",title:`${$} \uB05D\uC5D0 ${v}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:M.root_dir,ops:[{bead_id:v,lane:$,index:R(M.root_dir,$)}]}}if(Z!==null&&Xe&&me===null){let $=Z;return{kind:"ops",title:`${$} \uB05D\uC5D0 ${y}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:k.root_dir,ops:[{bead_id:y,lane:$,index:R(k.root_dir,$)}]}}if(Le&&Z===null&&Xe&&me===null){let $=lt(k.root_dir);return $===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${$} \uB808\uC778\uC5D0 ${y} \u2192 ${v} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:k.root_dir,ops:[{bead_id:y,lane:$,index:0},{bead_id:v,lane:$,index:1}]}}return!Le&&!Xe?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:Le?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function ke(v,y){let k=ue(v,y.id);return{id:y.id,title:y.title,location_label:y.location_label,prefixes:y.prefixes,action:k.kind==="note"?{kind:"note",text:k.text}:k.kind==="disabled"?{kind:"disabled",label:Id,title:k.title}:{kind:"place",label:Id,title:k.title}}}function Ae(v,y){if(!I||I.bead_id!==v)return null;let k=I.counterpart_id,M=k===null?y:y.filter(Z=>Z.id===k);return M.length===0?null:{rows:M.map(Z=>ke(v,Z))}}function je(v){let y=v.dependency_chips||null,k=v.overlap_chips||[],M=v.scope_state==="missing";if(!y&&k.length===0&&!M)return null;let Z=Ae(v.id,k);return{...y||{},...k.length>0?{overlaps:k}:{},...M?{scope_missing:!0}:{},...Z?{popover:Z}:{}}}function De(v){let y=je(v);return y?{...v,dependency_chips:y}:v}async function z(v,y){let k=ue(v,y);if(I=null,k.kind!=="ops"){ge();return}let M=ae(k.root_dir,k.ops[0].bead_id);for(let Z of k.ops){let me=await V(Z,k.root_dir,M);if(me===null)break;M=me}ge()}async function V(v,y,k){try{let M=await ne("worker-queue-place",v,y,k,!1);if(M&&M.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!M||M.applied!==!0)return de(M&&typeof M.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${M.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let Z=M.queue?M.queue.revision:void 0;return typeof Z!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):Z}catch(M){return de(h(M),"error"),null}}function Pe(v){let y=he(v.root_dir);return u`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${v.root_dir}
        data-section="runnable"
        aria-expanded=${y?"false":"true"}
        aria-label=${`${v.name} \uC139\uC158 ${y?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${y?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${v.root_dir}>${v.name}</span>
      <span class="mon2-sec__count">${v.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${v.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function Ke(v,y){return u`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="candidate"
      data-root-dir=${v.root_dir}
    >
      ${y}
    </div>`}function Ge(v){if(ee!==v.id)return null;let y=B.queue_groups.find(M=>M.root_dir===v.root_dir),k=v.place_lanes||[];return{bead_id:v.id,lanes:[{id:"parallel",label:"\uBCD1\uB82C",count:v.place_index??0},...B.chain_lanes.map((M,Z)=>({id:`lane:${Z}`,label:`\uC5F0\uACB0 ${Z+1} \uB05D\uC5D0`,count:M.rows.length})),{id:"new-lane",label:"\uC0C8 \uC5F0\uACB0 \uB808\uC778",count:0},...k.map(M=>({id:`serial:${M.id}`,label:`${y?y.name:""} \uC9C1\uB82C ${Number(M.id.slice(1))}`,count:M.length}))]}}function be(v){return Ke(v,bi(De(v),Ge(v),{exec_chips_mode:"pinned_only",onOpenDoc:i?(y,k)=>i(k,v.root_dir):void 0}))}function L(){return B.runnable_flat?u`<div class="mon2-flat" data-drop="candidate">
        ${B.runnable.map(v=>be(v))}
      </div>`:u`${B.runnable_sections.map(v=>{let y=he(v.root_dir);return u`<section
        class="mon2-sec${y?" is-collapsed":""}"
        data-root-dir=${v.root_dir}
        data-section="runnable"
      >
        ${Pe({root_dir:v.root_dir,name:v.name,count:v.items.length})}
        ${y?"":u`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${v.items.map(k=>be(k))}
            </div>`}
      </section>`})}`}function J(v,y){return u`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="parallel"
      data-root-dir=${v.root_dir}
      data-row-index=${y}
      data-queue-index=${String(v.queue_index??0)}
    >
      ${Gn(De(v))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon2-rowops__up"
          data-bead-id=${v.id}
          title="같은 레포 안에서 한 칸 위로"
          aria-label="한 칸 위로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon2-rowops__down"
          data-bead-id=${v.id}
          title="같은 레포 안에서 한 칸 아래로"
          aria-label="한 칸 아래로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon2-rowops__remove"
          data-bead-id=${v.id}
          title="대기에서 빼기"
          aria-label="대기에서 빼기"
        >
          ✕
        </button>
      </span>
    </div>`}function re(){let v=we("parallel");return u`<section
      class="mon2-area mon2-parallel${v?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="parallel"
          aria-expanded=${v?"false":"true"}
          aria-label=${`\uBCD1\uB82C \uC601\uC5ED ${v?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${v?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">병렬 영역</span>
        <span class="mon2-area__count">${B.parallel_rows.length}</span>
      </header>
      ${v?"":u`<div class="mon2-area__body" data-drop="parallel">
            ${B.parallel_rows.length===0?u`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:B.parallel_rows.map((y,k)=>J(y,k))}
          </div>`}
    </section>`}function G(v,y,k){return u`<div
      class="mon2-crow"
      style=${`--indent: ${y.indent}`}
      draggable=${y.draggable?"true":"false"}
      data-bead-id=${y.id}
      data-drag-kind="chain"
      data-root-dir=${y.root_dir}
      data-lane-id=${v.lane_id}
      data-row-index=${k}
      data-queue-index=${typeof y.queue_index=="number"?String(y.queue_index):""}
    >
      ${v.cycle?"":u`<span class="mon2-crow__seq" aria-hidden="true"
            >${Uh(y.seq)}</span
          >`}
      ${y.workspace_name?u`<span class="worker-mini__repo" title=${y.root_dir}
            >${y.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${y.id}</span>
      ${Br(y.workflow)}
      <span class="mon2-crow__title">${y.title}</span>
      ${y.predecessors.map(M=>u`<span class="worker-dep worker-dep--pred"
            ><span class="worker-dep__label">← ${M}</span></span
          >`)}
      <span class="mon2-crow__where"
        >${y.location_label==="\uC2E4\uD589\uC911"?`\u25CF ${y.location_label}`:y.location_label}</span
      >
      ${y.draggable?u`<button
            type="button"
            class="mon2-crow__detach"
            data-bead-id=${y.id}
            title="연결에서 빼고 앞뒤를 이어 붙입니다"
            aria-label="연결에서 빼기"
          >
            ✕
          </button>`:""}
      ${jr(je(y),{lane:ye.get(y.id)?.lane})}
    </div>`}function Ne(v){return u`<div class="mon2-clane" data-lane-id=${v.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${v.label}</span>
        <span class="mon2-clane__count">${v.rows.length}</span>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${v.lane_id}
      >
        ${v.cycle?u`<div class="mon2-lane__cycle">
              ⛔ 의존 사이클 — 자동 교정 불가
            </div>`:""}
        ${v.rows.length===0?u`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:v.rows.map((y,k)=>G(v,y,k))}
      </div>
    </div>`}function Qe(v,y,k){return u`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="repo-serial"
      data-root-dir=${y.root_dir}
      data-lane-id=${v.id}
      data-row-index=${k}
      data-queue-index=${String(y.queue_index??0)}
    >
      ${Gn(De(y))}
    </div>`}function ct(v){if(v.length===0)return"";let y=v.length-1;return`${v[0].id} \uC810\uC720${y>0?` +${y}`:""}`}function ot(v){return u`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${v.id}
    >
      ${Gn({id:v.id,title:v.title,lane:"running",draggable:!1,ghost:!0,badges:[v.badge]})}
    </div>`}function ut(v,y){return u`<div
      class="mon2-lane${y.empty?" mon2-lane--empty":""}"
      data-root-dir=${v.root_dir}
      data-lane-length=${String(y.raw_length)}
    >
      ${_n({id:"",lane:y.id,title:`${v.name} \xB7 \uC9C1\uB82C ${y.index+1}`,items:y.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:u`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${v.root_dir}
          data-lane-id=${y.id}
          data-lane-length=${String(y.raw_length)}
        >
          ${y.occupants.map(k=>ot(k))}
          ${y.items.length>0?y.items.map((k,M)=>Qe(y,k,M)):y.occupants.length>0?"":u`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:u`<span
            class="mon2-lane__badge${y.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${y.occupants.length>0?y.occupants.map(k=>`${k.id} \u2014 ${k.badge}`).join(`
`):""}
            >${ct(y.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${v.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${y.empty?u`<div class="mon2-lane__hint">
            ${v.name} 직렬 ${y.index+1} 비어 있음
          </div>`:""}
      ${y.cycle?u`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(y.cross_wait_peers||[]).map(k=>u`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${k.workspace_name}·${k.lane}과 교차 대기
          </div>`)}
    </div>`}function ht(){let v=we("serial"),y=B.chain_lanes.some(k=>k.pending&&k.rows.length===0);return u`<section
      class="mon2-area mon2-serial${v?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="serial"
          aria-expanded=${v?"false":"true"}
          aria-label=${`\uC9C1\uB82C \uC601\uC5ED ${v?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${v?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">직렬 영역</span>
        <button
          type="button"
          class="mon2-newlane"
          ?disabled=${y}
          title=${y?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4 \u2014 \uC0C8\uB85C\uACE0\uCE68\uD558\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${v?"":u`<div class="mon2-area__body">
            ${B.chain_lanes.map(k=>Ne(k))}
            ${B.queue_groups.map(k=>k.sublanes.serial.map(M=>ut(k,M)))}
          </div>`}
    </section>`}function bt(){return u`<div class="mon2-wait">${re()}${ht()}</div>`}function tt(v){return u`<div class="worker-rungrid">
      ${B.running.length===0?u`<div class="worker-rungrid__empty">실행 세션 없음</div>`:B.running.map(y=>wi({bead_id:y.id,attempt_id:y.attempt_id||"",title:y.title,runner:y.runner??null,model:y.model??null,effort:y.effort??null,speed:y.speed??null,started_at:y.started_at??null,kind:y.kind,...y.kind==="session"?{updated_at:y.updated_at}:{},workflow:y.workflow||null,resumed_from:y.resumed_from??null,continuation_mode:y.continuation_mode??null,paused:y.run_state==="paused",failed:y.run_state==="failed",status:y.status,status_label:y.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:y.can_resume!==!1,can_pause:y.can_pause!==!1,exec_chips:y.exec_chips||null,usage:y.usage||null,discard:y.discard},v,K,{monitor:{repo:y.workspace_name,root_dir:y.root_dir,serial_lane_id:y.serial_lane_id,last_activity:y.last_activity||null,legs:y.legs||[],dependency_chips:je(y)}}))}
    </div>`}function Tt(v){let y={runnable:B.runnable,queue:B.queue,running:B.running,pr_wait:B.pr_wait,done:B.done};return u`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${Bh.map(k=>{let M=y[k.lane],Z=k.lane==="runnable"?B.runnable_flat?M.length>0?L():void 0:B.runnable_sections.length>0?L():void 0:k.lane==="queue"?B.queue_groups.length>0||B.chain_lanes.length>0||B.parallel_rows.length>0?bt():void 0:k.lane==="running"?tt(v):M.length>0?u`${M.map(me=>Gn(me))}`:void 0;return _n({id:`monitor-${k.lane}`,lane:k.pane,title:k.lane==="done"?`\uC644\uB8CC\xB7${H()}`:k.title,items:M,empty:k.empty,body:Z,live:k.lane==="running"&&M.length>0,controls:k.lane==="runnable"?wt():void 0,header_control:He(k.lane,M.length)})})}
      </div>`}function wt(){return u`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${x.show_blocked}
        />
        🔒
        blocked${B.runnable_hidden.blocked>0?` ${B.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ii.map(v=>u`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${x.spec===v.value?" is-active":""}"
              data-spec=${v.value}
              aria-pressed=${x.spec===v.value?"true":"false"}
            >
              ${v.label}
            </button>`)}
        ${B.runnable_hidden.spec>0?u`<span class="worker-filter__hidden"
              >숨김 ${B.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function He(v,y){return v==="runnable"?u`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${N}
      >
        ${Cs.map(k=>u`<option
              value=${k.value}
              ?selected=${N===k.value}
            >
              ${k.label}
            </option>`)}
      </select>`:v==="running"?u`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${w}
      >
        <option value="started" ?selected=${w==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${w==="repo"}>
          레포순
        </option>
      </select>`:v==="pr_wait"&&y>0?u`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:v==="done"?u`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${b}
      >
        ${Bn.map(k=>u`<option value=${k.value} ?selected=${b===k.value}>
              ${k.label}
            </option>`)}
      </select>`:""}function ge(){let v=s&&s.get?s.get():null,y=s&&s.getWorkspacesState?s.getWorkspacesState():[],k=p(),M=()=>Li(v,y,{done_since:or(b,k),running_sort:w,candidate_filter:x,candidate_sort:N,pending_lanes:P});B=M(),B.pending_lanes_kept.length!==P.length&&(P=B.pending_lanes_kept.map(Z=>P[Z]),B=M()),ye=new Map;for(let Z of[...B.runnable,...B.queue,...B.running,...B.pr_wait,...B.done])!Z.non_occupying&&!ye.has(Z.id)&&ye.set(Z.id,Z);Ve(Tt(k),S),kt()?.render(),gt(),nt()}function gt(){let v=new Map;for(let y of B.queue_groups)v.set(y.root_dir,y.auto_advance);for(let y of Array.from(S.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let k=y.closest(".mon2-item")?.getAttribute("data-root-dir")||"",M=v.get(k);typeof M=="boolean"&&y.setAttribute("title",`${y.textContent||""} \xB7 ${M?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function kt(){if(xe)return xe;let v=S.querySelector(".mon2-deck");return v?(xe=_d(v,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>B.done,rangeLabel:H,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:le,onFocusChange:y=>{D=y,nt()}}),xe):null}function nt(){S.classList.toggle("has-focus",D!==null);for(let v of Array.from(S.querySelectorAll(".mon2-sec[data-root-dir]")))v.classList.toggle("is-focus",D!==null&&v.getAttribute("data-root-dir")===D);for(let v of Array.from(S.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let y=ye.get(v.getAttribute("data-bead-id")||"");v.classList.toggle("is-focus",D!==null&&!!y&&y.root_dir===D)}for(let v of Array.from(S.querySelectorAll(".mon2-crow[data-root-dir]")))v.classList.toggle("is-focus",D!==null&&v.getAttribute("data-root-dir")===D)}function Q(v,y){let k=a?a():void 0;if(!y||!k||y===k||!c){r(v);return}c(y).then(()=>{r(v)}).catch(M=>{n("workspace switch for %s failed: %o",y,M)})}function le(v){if(!v)return;let y=a?a():void 0,k=()=>{try{d?.gotoView("worker")}catch(M){n("gotoView(worker) failed: %o",M)}};if(!c||y&&y===v){k();return}c(v).then(k).catch(M=>{n("workspace switch for %s failed: %o",v,M),de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function qe(v){an(v).then(y=>{de(y?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",y?"success":"error",1400)})}function E(v){let y=ye.get(v)||null;return{item:y,root_dir:y?y.root_dir:"",revision:y?y.expected_revision:0}}function h(v){if(typeof v=="string"&&v.length>0)return v;if(v&&typeof v=="object"){let y=v;if(typeof y.message=="string"&&y.message.length>0)return y.message;if(typeof y.error=="string"&&y.error.length>0)return y.error;if(y.error&&typeof y.error=="object"&&typeof y.error.message=="string")return y.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function A(v,y,k){let{root_dir:M}=E(y);if(!(!y||!k||k===y))try{await _e(v,{a:y,b:k},M)}catch(Z){de(h(Z),"error")}}function F(){let v=new Map,y=s&&s.get?s.get():null,k=M=>Array.isArray(M)?M.filter(Z=>typeof Z=="string"&&Z.length>0):[];for(let M of Array.isArray(y)?y:[]){if(!M||typeof M!="object")continue;let Z=M.bead_blocked_by&&typeof M.bead_blocked_by=="object"?M.bead_blocked_by:{};for(let[me,Le]of Object.entries(Z))Array.isArray(Le)&&v.set(me,k(Le));for(let me of[...Array.isArray(M.runnable)?M.runnable:[],...Array.isArray(M.session_active)?M.session_active:[]])me&&typeof me.bead_id=="string"&&Array.isArray(me.blocked_by)&&me.blocked_by.length>0&&v.set(me.bead_id,k(me.blocked_by))}return v}function oe(){let v=new Map;for(let k of B.chain_lanes)v.set(k.lane_id,k.rows.map(M=>M.id));let y=new Map;for(let k of B.parallel_rows)typeof k.queue_index=="number"&&y.set(k.id,k.queue_index);for(let k of B.queue_groups)for(let M of k.sublanes.serial)for(let Z of M.items)typeof Z.queue_index=="number"&&y.set(Z.id,Z.queue_index);return{blocked_by_map:F(),owner_of:new Map(Object.entries(B.owner_of)),lane_order:v,parallel_rows:B.parallel_rows.map(k=>({bead_id:k.id,root_dir:k.root_dir,queue_index:k.queue_index??0})),parallel_raw_length:new Map(Object.entries(B.parallel_raw_length)),queue_index_of:y}}function ae(v,y){let k=ye.get(y);if(k&&k.root_dir===v)return k.expected_revision;let M=B.queue_groups.find(Z=>Z.root_dir===v);return M?M.revision:0}async function ve(v,y){try{if(v.type==="worker-queue-place"||v.type==="worker-queue-reorder"||v.type==="worker-queue-remove"){let k=await ne(v.type,v.payload,v.root_dir,ae(v.root_dir,y));return k&&k.conflict?(de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):k&&k.applied===!1?(de(k.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${k.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0}return(v.type==="dep-add"||v.type==="dep-remove")&&await _e(v.type,{a:v.a,b:v.b},v.root_dir),!0}catch(k){return de(h(k),"error"),!1}}async function Ee(v,y){let k=md(v,y,oe());if("refused"in k){de(k.refused,"error");return}if(y.kind==="chain"){let M=B.chain_lanes.find(me=>me.lane_id===y.lane_id),Z=M&&M.pending&&M.rows.length===0?Number(M.lane_id.slice(8)):-1;Z>=0&&P[Z]&&(P=P.map((me,Le)=>Le===Z?{seed:v.bead_id}:me))}for(let M of k.ops)if(!await ve(M,v.bead_id))break;ge()}async function Je(v,y){let k=ye.get(v);if(!k){ge();return}let M={kind:"candidate",bead_id:v,root_dir:k.root_dir};if(y==="new-lane"){P.some(me=>me.seed===null)||(P=[...P,{seed:null}]),ge();let Z=B.chain_lanes.find(me=>me.pending&&me.rows.length===0);if(!Z)return;await Ee(M,{kind:"chain",lane_id:Z.lane_id,marker_index:0});return}if(y.startsWith("lane:")){let Z=B.chain_lanes[Number(y.slice(5))];if(!Z){ge();return}await Ee(M,{kind:"chain",lane_id:Z.lane_id,marker_index:Z.rows.length});return}if(y.startsWith("serial:")){let Z=y.slice(7),me=(k.place_lanes||[]).find(Le=>Le.id===Z);await Ee(M,{kind:"repo-serial",root_dir:k.root_dir,lane_id:Z,index:me?me.index:0});return}await Ee(M,{kind:"parallel",marker_index:B.parallel_rows.length})}async function rt(v,y){let k=B.parallel_rows,M=k.findIndex(T=>T.id===v);if(M<0)return;let Z=k[M].root_dir,me=[];k.forEach((T,ce)=>{T.root_dir===Z&&me.push(ce)});let Le=me.indexOf(M),Xe=me[Le+y];if(typeof Xe!="number")return;let $=y===-1?Xe:me[Le+2]??Math.min(k.length,Xe+1);await Ee({kind:"parallel",bead_id:v,root_dir:Z,queue_index:k[M].queue_index??0},{kind:"parallel",marker_index:$})}async function Ye(v){for(let y of B.chain_lanes){let k=y.rows.find(M=>M.id===v);if(!(!k||!k.draggable)){await Ee({kind:"chain",bead_id:v,root_dir:k.root_dir,lane_id:y.lane_id,...typeof k.queue_index=="number"?{queue_index:k.queue_index}:{}},{kind:"parallel",marker_index:B.parallel_rows.length});return}}}let dt=null,Rt=!1,_t=null;function tn(){_t!==null&&clearTimeout(_t),_t=setTimeout(()=>{_t=null,Rt=!1},0)}function jt(v,y){let k=y&&typeof y.closest=="function"?y.closest("[data-row-index]"):null;if(k&&v.contains(k)){let M=Number(k.getAttribute("data-row-index"));return Number.isFinite(M)?M:0}return v.querySelectorAll("[data-row-index]").length}function Mt(v){let y=v.target,k=typeof y?.closest=="function"?y.closest("[data-drop]"):null;if(!k||!dt)return null;let M=k.getAttribute("data-drop");if(M==="candidate")return{zone:k,target:{kind:"candidate"}};if(M==="parallel")return{zone:k,target:{kind:"parallel",marker_index:jt(k,y)}};if(M==="chain")return{zone:k,target:{kind:"chain",lane_id:k.getAttribute("data-lane-id")||"",marker_index:jt(k,y)}};if(M==="repo-serial"){let Z=k.getAttribute("data-root-dir")||"";if(Z!==dt.root_dir)return null;let me=typeof y?.closest=="function"?y.closest("[data-queue-index]"):null,Le=me&&k.contains(me)?me.getAttribute("data-queue-index"):k.getAttribute("data-lane-length"),Xe=Number(Le);return{zone:k,target:{kind:"repo-serial",root_dir:Z,lane_id:k.getAttribute("data-lane-id")||"",index:Number.isFinite(Xe)?Xe:0}}}return null}function Bt(){for(let v of Array.from(S.querySelectorAll(".is-drop-over")))v.classList.remove("is-drop-over")}function Pt(v){let y=v.target,k=typeof y?.closest=="function"?y.closest('[draggable="true"][data-bead-id]'):null,M=k?k.closest("[data-drag-kind]"):null;if(!M)return;let Z=M.getAttribute("data-bead-id")||"",me=M.getAttribute("data-drag-kind")||"",Le=M.getAttribute("data-root-dir")||"";if(!Z||!me||!Le)return;let Xe=M.getAttribute("data-queue-index")||"",$=Number(Xe),T=M.getAttribute("data-lane-id")||"";dt={kind:me,bead_id:Z,root_dir:Le,...Xe!==""&&Number.isFinite($)?{queue_index:$}:{},...T?{lane_id:T}:{}},Rt=!0,ee=null,S.classList.add("is-dragging");try{v.dataTransfer?.setData("text/plain",Z),v.dataTransfer&&(v.dataTransfer.effectAllowed="move")}catch{}}function It(v){let y=Mt(v);y&&(v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="move"),y.zone.classList.add("is-drop-over"))}function ze(v){let y=v.target;typeof y?.closest=="function"&&y.closest("[data-drop]")?.classList.remove("is-drop-over")}function nn(){dt=null,Bt(),S.classList.remove("is-dragging"),tn()}function Ht(v){let y=Mt(v),k=dt;dt=null,Bt(),S.classList.remove("is-dragging"),!(!y||!k)&&(v.preventDefault(),Ee(k,y.target))}function et(v){return{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.run_state==="running"?"running":v.run_state,worktree:v.root_dir}}function Me(v,y){let{item:k,root_dir:M,revision:Z}=E(y),me=k?.attempt_id||"",Le=v.classList;if(Le.contains("worker-dep__remove")){A("dep-remove",y,v.dataset.blockerId||"");return}if(Le.contains("mon2-rowops__up")||Le.contains("mon2-rowops__down")){rt(y,Le.contains("mon2-rowops__up")?-1:1);return}if(Le.contains("mon2-rowops__remove")){ne("worker-queue-remove",{bead_id:y},M,Z);return}if(Le.contains("mon2-crow__detach")){Ye(y);return}if(Le.contains("mon-overlap__chip")){let Xe=v.getAttribute("data-overlap-all")==="true"?null:v.getAttribute("data-overlap-id")||"";I=!!I&&I.bead_id===y&&I.counterpart_id===Xe?null:{bead_id:y,counterpart_id:Xe},ge();return}if(Le.contains("mon-overlap__place")){z(y,v.getAttribute("data-counterpart-id")||"");return}if(Le.contains("worker-card__place")){ee=ee===y?null:y,ge();return}if(Le.contains("worker-card__place-cancel")){ee=null,ge();return}if(Le.contains("worker-card__place-lane")){let Xe=v.getAttribute("data-lane")||"parallel";ee=null,Je(y,Xe);return}if(Le.contains("rtile__session")){K=me,me&&k&&Oe.open({attempt_id:me,root_dir:M,meta:et(k)}),ge();return}if(Le.contains("rtile__pause")){_e("worker-attempt-pause",{attempt_id:me},M);return}if(Le.contains("rtile__resume")){Ir().then(Xe=>{if(Xe!==null)return Ce("worker-attempt-resume",{attempt_id:me,...Xe!==""?{instructions:Xe}:{}},M,Z)});return}if(Le.contains("rtile__dismiss")){ne("worker-attempt-dismiss",{attempt_id:me},M,Z);return}if(Le.contains("rtile__discard")){if(!f($s(y,"unmerged")))return;X({bead_id:y,...me?{attempt_id:me}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},M,Z);return}if(Le.contains("worker-mini__merge")){let Xe=ie(M,y);Xe?.mismatch&&Xe.continuation===null?W(M,y,Z,Xe.mismatch):ne("worker-merge-queue-add",{bead_id:y},M,Z);return}if(Le.contains("worker-mini__merge-cancel")){ne("worker-merge-queue-remove",{bead_id:y},M,Z);return}if(Le.contains("worker-mini__discard")){let Xe=v.dataset.discardMode==="merged"?"merged":"unmerged";if(!f($s(y,Xe)))return;X({bead_id:y,...v.dataset.attemptId?{attempt_id:v.dataset.attemptId}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},M,Z);return}if(Le.contains("worker-mini__revise-fix")){Ce("worker-revise-fix",{bead_id:y},M,Z);return}Le.contains("worker-mini__revise-approve")&&ne("worker-revise-approve",{bead_id:y},M,Z)}function C(v){let y=Rt;Rt=!1;let k=v.target;if(!k||typeof k.closest!="function"||k.closest("dialog")||k.closest(".mon2-drawer")||k.closest("a"))return;let M=k.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(M){v.preventDefault();let _=k.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||M.textContent?.trim()||"";_&&qe(_);return}let Z=k.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(Z){v.preventDefault();let l=Z.getAttribute("data-root-dir")||ye.get(k.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||Z.getAttribute("title")||"";le(l);return}let me=k.closest(".mon2-sec__toggle");if(me){v.preventDefault(),Be(me.getAttribute("data-root-dir")||"");return}let Le=k.closest(".mon2-area__toggle");if(Le){v.preventDefault(),Ze(Le.getAttribute("data-area")||"parallel");return}if(k.closest(".mon2-newlane")){v.preventDefault(),P=[...P,{seed:null}],ge();return}if(k.closest(".mon-merge-all")){v.preventDefault(),Se();return}let Xe=k.closest(".mon-filter__spec");if(Xe){v.preventDefault(),x={...x,spec:Xe.getAttribute("data-spec")||"all"},Pd(x),ge();return}let $=k.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!$)return;let T=$.getAttribute("data-bead-id")||"",ce=k.closest("button");if(ce){v.preventDefault(),Me(ce,T);return}T&&!y&&(v.preventDefault(),Q(T,$.getAttribute("data-root-dir")||E(T).root_dir))}function pe(v){let y=v.target;if(!y||typeof y.closest!="function")return;let k=y.closest(".mon-filter__blocked");if(k){x={...x,show_blocked:k.checked},Pd(x),ge();return}let M=y.closest(".mon-candidate-sort");if(M){N=Cs.some(Le=>Le.value===M.value)?M.value:"repo_spec",Mh(N),ge();return}let Z=y.closest(".mon-running-sort");if(Z){w=Z.value==="repo"?"repo":"started",Fh(w),ge();return}let me=y.closest(".mon-done-range");me&&(b=dn(me.value)?me.value:sn,Nh(b),ge())}function Ie(v){if(!I)return;let y=v.target;y&&typeof y.closest=="function"&&y.closest(".mon-overlap__popover, .mon-overlap__chip")||(I=null,ge())}function at(v){v.key!=="Escape"||!I||(I=null,ge())}e.addEventListener("click",C),e.addEventListener("change",pe),document.addEventListener("click",Ie),document.addEventListener("keydown",at),e.addEventListener("dragstart",Pt),e.addEventListener("dragover",It),e.addEventListener("dragleave",ze),e.addEventListener("drop",Ht),e.addEventListener("dragend",nn),s&&typeof s.subscribe=="function"&&(te=s.subscribe(()=>{try{$e.clear(),ge()}catch{}}));function xt(){Y!==null&&(clearInterval(Y),Y=null)}function yt(){_t!==null&&(clearTimeout(_t),_t=null)}return{load(){n("load"),ge(),Y===null&&(Y=setInterval(()=>{try{ge()}catch{}},jh))},pause(){xt()},clear(){xt(),yt(),te&&(te(),te=null),Oe.destroy(),xe?.destroy(),xe=null,e.removeEventListener("click",C),e.removeEventListener("change",pe),document.removeEventListener("click",Ie),document.removeEventListener("keydown",at),e.removeEventListener("dragstart",Pt),e.removeEventListener("dragover",It),e.removeEventListener("dragleave",ze),e.removeEventListener("drop",Ht),e.removeEventListener("dragend",nn),e.replaceChildren()}}}function Hd(e,t,n){let r=Ct("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(b){return w=>{w.preventDefault(),r("click tab %s",b),n.gotoView(b)}}function c(){let b=t.getState();return b.view==="worker"||b.view==="monitor"?b.view:"board"}function d(){let b=c();return u`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${b==="monitor"?"is-active":""}"
        @click=${i("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function p(){let b=c();return u`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${b==="board"?"is-active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${b==="worker"?"is-active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </div>
    `}function f(){s&&Ve(d(),s),o&&Ve(p(),o)}return f(),a=t.subscribe(()=>f()),{destroy(){a&&(a(),a=null),s&&Ve(u``,s),o&&Ve(u``,o)}}}var Gd=["bug","feature","task","epic","chore"];function Vd(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Kd=["Critical","High","Medium","Low","Backlog"];function Yd(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),c=n.querySelector("#new-description"),d=n.querySelector("#new-issue-error"),p=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),b=n.querySelector(".new-issue__close");function w(){o.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",o.appendChild(D);for(let H of Gd){let S=document.createElement("option");S.value=H,S.textContent=Vd(H),o.appendChild(S)}a.replaceChildren();for(let H=0;H<=4;H+=1){let S=document.createElement("option");S.value=String(H);let U=Kd[H]||"Medium";S.textContent=`${H} \u2013 ${U}`,a.appendChild(S)}}w();function x(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function N(D){s.disabled=D,o.disabled=D,a.disabled=D,i.disabled=D,c.disabled=D,p.disabled=D,f.disabled=D,f.textContent=D?"Creating\u2026":"Create"}function j(){d.textContent=""}function K(D){d.textContent=D}function ee(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?o.value=D:o.value="";let H=window.localStorage.getItem("beads-ui.new.priority");H&&/^\d$/.test(H)?a.value=H:a.value="2"}catch{o.value="",a.value="2"}}function I(){let D=o.value||"",H=a.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),H.length>0&&window.localStorage.setItem("beads-ui.new.priority",H)}async function P(){j();let D=String(s.value||"").trim();if(D.length===0){K("Title is required"),s.focus();return}let H=Number(a.value||"2");if(!(H>=0&&H<=4)){K("Priority must be 0..4"),a.focus();return}let S=String(o.value||""),U=String(c.value||""),B={title:D};S.length>0&&(B.type=S),String(H).length>0&&(B.priority=H),U.length>0&&(B.description=U),N(!0);try{await t("create-issue",B)}catch{N(!1),K("Failed to create issue");return}I(),N(!1),x()}return n.addEventListener("cancel",D=>{D.preventDefault(),x()}),b.addEventListener("click",()=>x()),p.addEventListener("click",()=>x()),n.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),P())}),r.addEventListener("submit",D=>{D.preventDefault(),P()}),{open(){r.reset(),j(),ee();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){x()}}}var Wh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function zh(e,t){return Ca(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Zd(e,t,n){return u`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?u`<div class="settings-dialog__empty">라벨 없음</div>`:u`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=zh(r,e);return u`<button
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
  `}function Qd(e,t,n){return u`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(r=>u`<span class="settings-dialog__prefix">
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
  `}function Xd(e,t){return u`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Wh.map(([n,r])=>u`<label class="settings-dialog__toggle">
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
  `}var Hh=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Jd(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(Y=>de(Y,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",c=!1,d="",p=null;function f(){if(p)return p;let Y=a.querySelector('[data-pane="execution"]');return Y?(p=Yo(Y,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:xe=>t.queueStore?.set?.(xe)}),p):null}function b(){return u`
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
    `}function w(){let Y=r.get();return u`
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
        ${Y?u`
              ${Zd(Y,s(),K)}
              ${Qd(Y,d,{onDraft:xe=>{d=xe},onAdd:ee,onRemove:I})}
              ${Xd(Y,P)}
            `:u`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function x(Y){let xe=r.get();if(xe)try{let Oe=await n("display-policy-set",{expected_revision:xe.revision,policy:Y(xe)});N(Oe),Oe&&Oe.conflict&&Oe.policy&&(Oe=await n("display-policy-set",{expected_revision:Oe.policy.revision,policy:Y(Oe.policy)}),N(Oe)),Oe&&Oe.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function N(Y){Y&&Y.policy&&typeof Y.policy=="object"&&r.set(Y.policy)}function j(Y){x(Y)}function K(Y){let xe=r.get();if(!xe)return;let Oe=!Gh(Y,xe);j(ne=>Vh(Y,ne,Oe))}function ee(){let Y=d.trim();Y.length!==0&&(d="",j(xe=>xe.hidden_prefixes.includes(Y)?{hidden_prefixes:xe.hidden_prefixes}:{hidden_prefixes:[...xe.hidden_prefixes,Y]}),D())}function I(Y){j(xe=>({hidden_prefixes:xe.hidden_prefixes.filter(Oe=>Oe!==Y)}))}function P(Y){let xe=r.get();if(!xe)return;let Oe=xe.chips[Y]===!1;j(()=>({chips:{[Y]:Oe}}))}function D(){Ve(u`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Hh.map(Y=>u`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${Y.id}
                  aria-selected=${String(i===Y.id)}
                  aria-controls=${`settings-pane-${Y.id}`}
                  @click=${()=>H(Y.id)}
                >
                  <span class="settings-dialog__glyph">${Y.glyph}</span>
                  ${Y.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${te}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${b()} ${w()}
          </div>
        </div>
      `,a),f()}function H(Y){i=Y,D()}let S=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",S),a.addEventListener("cancel",S);let U=Y=>{Y.target===a&&te()};a.addEventListener("click",U);let B=null;r.subscribe&&(B=r.subscribe(()=>{c&&D()}));let ye=null;t.implPresetStore?.subscribe&&(ye=t.implPresetStore.subscribe(()=>{c&&p?.render()}));function $e(Y="execution"){c||(c=!0,t.onOpenChange?.(!0),i=Y,d="",D(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),f()?.load())}function te(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:$e,close:te,sessionDraft:()=>p?.sessionDraft()??{},destroy(){c=!1,a.removeEventListener("close",S),a.removeEventListener("cancel",S),a.removeEventListener("click",U),B&&(B(),B=null),ye&&(ye(),ye=null),p?.destroy(),p=null,a.remove()}}}function Gh(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Vh(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Kh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],ep="usage-meter-card",Yh="usage-meter-layer",tp=600,Zh=["token_expired","relogin_required"];function np(e){return String(e).padStart(2,"0")}function Qh(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function rp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${np(r.getHours())}:${np(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${Kh[r.getMonth()]} ${r.getDate()} ${o}`;return`${Qh(n,t)} \xB7 ${i}`}function Xh(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function sp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function op(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var ap=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function lp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Jh(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:lp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function eb(e){if(!e||typeof e!="object")return null;let t=e,n=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=Jh(s);o&&n.push(o)}let r=t.available===!0&&Array.isArray(t.windows);return!r&&n.length===0?null:{available:r,windows:r?lp(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:n}}function ip(e,t){return`${e}:${t}`}function cp(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,c=null;function d(){Ve(u``,e),e.hidden=!0,f()}function p(){if(c===null){let ne=e.ownerDocument;c=ne.createElement("div"),c.id=Yh,c.className="usage-meter__layer",ne.body.appendChild(c)}return c}function f(){c!==null&&(Ve(u``,c),c.remove(),c=null)}function b(ne){n!==ne&&(n===null&&(document.addEventListener("mousedown",x),document.addEventListener("keydown",j),window.addEventListener("resize",N)),n=ne)}function w(){n!==null&&(n=null,document.removeEventListener("mousedown",x),document.removeEventListener("keydown",j),window.removeEventListener("resize",N))}function x(ne){let ie=ne.target;ie&&(e.contains(ie)||c!==null&&c.contains(ie))||(w(),te())}function N(){te()}function j(ne){ne.key==="Escape"&&(w(),te())}function K(ne){n===ne?w():b(ne),te()}function ee(){w(),te()}async function I(ne,ie){if(r.has(ne.key))return;let Ce=ip(ne.key,ie);r.set(ne.key,ie),a.delete(Ce),te();let W=null;try{W=await(await fetch(ne.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ie})})).json()}catch{W=null}if(t)return;if(r.delete(ne.key),!W||W.ok!==!0){let _e=W&&typeof W.error=="string"&&W.error.length>0?W.error:"network_error";a.set(Ce,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${_e}`}),te();return}let X=Array.isArray(W.warnings)?W.warnings.filter(_e=>typeof _e=="string"&&_e.length>0):[];X.length>0&&a.set(Ce,{kind:"warn",text:X.join(" \xB7 ")}),te(),await Oe()}function P(ne,ie,Ce,W){let X=op(ne.pct),Se=`resets ${rp(ne.resetsAt,W)}${ie?` \xB7 ${Ce}`:""}`;return u`<span
      class="usage-meter__window ${sp(X)}"
      style=${`--progress: ${X}%`}
      title=${Se}
    >
      <span class="usage-meter__label">${ne.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${X}%</span>
    </span>`}function D(ne,ie,Ce){let W=ie.available&&typeof ie.ageSeconds=="number"&&ie.ageSeconds>tp,X=W&&typeof ie.ageSeconds=="number"?`${Math.floor(ie.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",_e=ie.accounts.filter(we=>!we.active).length,Se=`usage-meter__group${W?" usage-meter__group--stale":""}`,he=u`<span class="usage-meter__provider"
        >${ne.label}</span
      >
      ${ie.available?ie.windows.map(we=>P(we,W,X,Ce)):u`<span class="usage-meter__empty">사용량 없음</span>`}
      ${_e>0?u`<span class="usage-meter__badge">+${_e}</span>`:""}`;if(ie.accounts.length===0)return u`<span
        class=${Se}
        aria-label=${`${ne.label} usage`}
        >${he}</span
      >`;let Be=n===ne.key;return u`<button
      type="button"
      class=${`usage-meter__toggle ${Se}`}
      aria-label=${`${ne.label} usage`}
      aria-expanded=${Be?"true":"false"}
      aria-controls=${ep}
      @click=${()=>K(ne.key)}
    >
      ${he}
    </button>`}function H(ne,ie){return u`<span class="usage-meter" aria-label="Usage">
      ${ne.map(Ce=>D(Ce.provider,Ce.snapshot,ie))}
    </span>`}function S(ne,ie){let Ce=op(ne.pct),W=rp(ne.resetsAt,ie);return u`<span
      class="usage-meter__account-window ${sp(Ce)}"
      style=${`--progress: ${Ce}%`}
    >
      <span class="usage-meter__account-key">${ne.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Ce}%</span>
      <span class="usage-meter__account-reset"
        >${W.length>0?`\u21BB ${W}`:""}</span
      >
    </span>`}function U(ne,ie){return Zh.includes(ie)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ne.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function B(ne,ie,Ce){let W=ie.status==="ok",X=typeof ie.ageSeconds=="number"&&ie.ageSeconds>tp,_e=a.get(ip(ne.key,ie.number)),Se=r.get(ne.key),he=Se!==void 0,Be=Se===ie.number,we=["usage-meter__account"];return ie.active&&we.push("usage-meter__account--active"),W||we.push("usage-meter__account--unavailable"),X&&we.push("usage-meter__account--stale"),u`<div class=${we.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${ie.email}
          >${ie.alias===null?ie.email:ie.alias}</span
        >
        ${ie.plan===null?"":u`<span class="usage-meter__account-tag">${ie.plan}</span>`}
        ${ie.active?u`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${ie.ageSeconds===null?"":u`<span class="usage-meter__account-age"
              >${Xh(ie.ageSeconds)}</span
            >`}
        ${ie.active?"":u`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${he}
              @click=${()=>{I(ne,ie.number)}}
            >
              ${Be?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${W?u`<div class="usage-meter__account-windows">
            ${ie.windows.map(Ze=>S(Ze,Ce))}
          </div>`:u`<div class="usage-meter__account-status">
            ${U(ne,ie.status)}
          </div>`}
      ${_e===void 0?"":u`<div
            class="usage-meter__account-message usage-meter__account-message--${_e.kind}"
          >
            ${_e.text}
          </div>`}
    </div>`}function ye(ne,ie,Ce){let W=ie.accounts.filter(X=>X.active).length;return u`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ne.label} · 활성 ${W} / 전체
        ${ie.accounts.length}
      </h2>
      ${ie.accounts.map(X=>B(ne,X,Ce))}
    </section>`}function $e(ne,ie){return u`<div
      class="usage-meter__card"
      id=${ep}
      role="dialog"
      aria-label=${`${ne.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${ye(ne.provider,ne.snapshot,ie)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function te(){let ne=[];for(let W of ap){let X=o.get(W.key);X&&ne.push({provider:W,snapshot:X})}if(ne.length===0){w(),d();return}let ie=ne.find(W=>W.provider.key===n&&W.snapshot.accounts.length>0);ie||w();let Ce=Date.now();Ve(H(ne,Ce),e),e.hidden=!1,ie?Y(ie,Ce):f()}function Y(ne,ie){let Ce=p(),W=e.getBoundingClientRect(),X=e.ownerDocument.documentElement.clientWidth;Ce.style.setProperty("--usage-meter-anchor-top",`${W.bottom}px`),Ce.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,X-W.right)}px`),Ve(u`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ee}
        ></div>
        ${$e(ne,ie)}`,Ce)}async function xe(ne){try{let ie=await fetch(ne.endpoint);return ie.ok?eb(await ie.json()):null}catch{return null}}async function Oe(){i+=1;let ne=i,ie=await Promise.all(ap.map(async Ce=>({provider:Ce,snapshot:await xe(Ce)})));if(!(t||ne!==i)){for(let Ce of ie)Ce.snapshot?o.set(Ce.provider.key,Ce.snapshot):o.delete(Ce.provider.key);te()}}return d(),Oe(),s=setInterval(()=>{Oe()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),w(),d()}}}function up(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var tb="worker-ineligible";function Mi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function dp(e){return Mi(e).includes(tb)}var nb="worker-serial";function Pi(e){return Mi(e).includes(nb)}function Di(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var rb=new Set(["done","failed","orphaned","stopped","discarded"]),sb={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},ob={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},ab={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Ni(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:ab[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function pp(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,d=new Map,p=!1,f=null,b=null,w=null,x=new Set,N=!1,j=0,K=null,ee=new Set;function I(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function P(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function D(){return o&&o()||""}async function H(){if(!s)return;let E=++j;N=!0,w=null,x.clear(),He();try{let h=await s("worker-parallel-analysis-targets",{root_dir:D()});if(E!==j||!ge)return;let A=Array.isArray(h?.qualified)?h.qualified:[],F=Array.isArray(h?.excluded)?h.excluded:[];w={qualified:A,excluded:F};for(let oe of A)oe&&typeof oe.id=="string"&&x.add(oe.id)}catch{E===j&&ge&&(w={qualified:[],excluded:[]},de("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{E===j&&(N=!1,ge&&He())}}function S(E){return Array.isArray(E.runs)?E.runs:[]}function U(){let E=I(),h=new Set;for(let A of Object.values(E.attempts||{})){let F=A;F&&typeof F.bead_id=="string"&&!rb.has(F.status)&&h.add(F.bead_id)}for(let A of Array.isArray(E.pr_wait)?E.pr_wait:[])A&&typeof A.bead_id=="string"&&h.add(A.bead_id);for(let A of Object.values(E.discard_operations||{})){let F=A;F&&F.phase!=="done"&&typeof F.bead_id=="string"&&h.add(F.bead_id)}return h}function B(E){return E.filter(h=>ye(h)===null)}function ye(E){let h=I();for(let A of Array.isArray(h.serial_lanes)?h.serial_lanes:[])if(Array.isArray(A?.entries)&&A.entries.some(F=>F.bead_id===E))return A.id;return(Array.isArray(h.queue)?h.queue:[]).some(A=>A.bead_id===E)?"parallel":null}function $e(E,h){let A=c.get(E);return A||[...h.order]}function te(E){if(E.length<2)return!1;let h=ye(E[0]);if(!h||h==="parallel")return!1;let A=I(),F=(Array.isArray(A.serial_lanes)?A.serial_lanes:[]).find(ae=>ae.id===h)?.entries.map(ae=>ae.bead_id);if(!Array.isArray(F))return!1;let oe=E.map(ae=>F.indexOf(ae));return oe.every(ae=>ae>=0)&&oe.every((ae,ve)=>ve===0||ae>oe[ve-1])}function Y(){let E=I(),h=Array.isArray(E.serial_lanes)?E.serial_lanes:[],A=h.find(F=>Array.isArray(F.entries)&&F.entries.length===0);return A?A.id:h[0]?.id||"s1"}function xe(E){let h=I().bead_titles||{};return typeof h[E]=="string"?h[E]:E}async function Oe(E,h){if(!s||p)return null;p=!0,He();try{return await s(E,h)}finally{p=!1,He()}}async function ne(E){r?.setPending?.(!0);try{let h=await Oe("worker-parallel-analysis-start",{force:E,target_ids:Array.from(x)});h&&h.applied===!1&&h.reason&&(h.reason==="target_not_qualified"&&Array.isArray(h.detail)?de(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${h.detail.join(", ")}`,"error",3200):de(`\uBD84\uC11D \uC2E4\uD328: ${h.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function ie(){let E=P().job;!s||!E||await s("worker-parallel-analysis-cancel",{job_id:E.job_id})}async function Ce(E){if(!(!s||ee.has(E))){ee.add(E),He();try{let h=await s("worker-parallel-analysis-prompt",{root_dir:D(),run_id:E});if(!ge)return;if(h?.ok===!0&&typeof h.prompt=="string"){K={run_id:E,prompt:h.prompt};return}de(h?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{ee.delete(E),He()}}}function W(){K=null,He()}async function X(){if(!K)return;let E=await an(K.prompt);de(E?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",E?"success":"error",1400)}function _e(E,h){a&&a(E,Ni(h))}function Se(){return I().runner_catalog}function he(E){return Object.keys(Se()?.runners?.[E]?.models||{})}function Be(E){let h=he(E),A=Se()?.runners?.[E]?.default_model;return typeof A=="string"&&h.includes(A)?A:h[0]||""}function we(){let E=P().settings,h=f||E.runner||"claude",A=he(h),F=f?Be(h):E.model||A[0]||"",oe=Di(Se(),h,F),ae=E.effort||"",ve=oe.includes(ae)?ae:oe[0]||"";return{runner:h,model:F,effort:ve,models:A,efforts:oe}}async function Ze(E){let h=P().settings,A=await Oe("worker-parallel-analysis-settings-update",{expected_revision:h.revision,runner:E.runner,model:E.model,effort:E.effort});(!A||A.applied!==!0)&&(f=null,He(),A&&A.reason&&de(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${A.reason}`,"error",2800))}function lt(E){f=E,He();let h=we();Ze({runner:E,model:h.model,effort:h.effort})}function R(E){let h=we(),A=Di(Se(),h.runner,E);Ze({runner:h.runner,model:E,effort:A.includes(h.effort)?h.effort:A[0]||""})}function ue(E){let h=we();Ze({runner:h.runner,model:h.model,effort:E})}async function ke(E,h){if(!s||p)return;let A=$e(E,h),F=P();if(A.length<2||!F.last_good){de("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let oe=d.get(E)||Y(),ae=()=>({snapshot_digest:F.last_good.identity_digest,group_index:E,lane:oe,ordered_bead_ids:A,expected_revision:I().revision});p=!0,He();try{let ve=await s("worker-parallel-analysis-submit",ae());ve&&ve.queue&&n&&n.set(ve.queue),ve&&ve.applied!==!0&&ve.conflict===!0&&(ve=await s("worker-parallel-analysis-submit",ae()),ve&&ve.queue&&n&&n.set(ve.queue)),ve&&ve.applied===!0?(c.delete(E),de(`\uC9C1\uB82C \uB808\uC778 ${oe}\uC5D0 ${A.length}\uAC1C \uBC30\uCE58`,"success")):de(`\uC81C\uCD9C \uAC70\uBD80: ${ve?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,He()}}function Ae(E,h,A){c.set(E,$e(E,h).filter(F=>F!==A)),He()}function je(E){c.delete(E),He()}function De(E,h,A,F){let oe=[...$e(E,h)],ae=oe.indexOf(A),ve=ae+F;ae<0||ve<0||ve>=oe.length||(oe.splice(ve,0,...oe.splice(ae,1)),c.set(E,oe),He())}function z(){let E=P().settings,h=Object.keys(Se()?.runners||{}),A=we();return u`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${F=>lt(F.target.value)}
        >
          ${h.map(F=>u`<option
                value=${F}
                ?selected=${A.runner===F}
              >
                ${F}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${F=>R(F.target.value)}
        >
          ${A.models.map(F=>u`<option
                value=${F}
                ?selected=${A.model===F}
              >
                ${F}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${F=>ue(F.target.value)}
        >
          ${A.efforts.map(F=>u`<option
                value=${F}
                ?selected=${A.effort===F}
              >
                ${F}
              </option>`)}
        </select>
      </label>
      ${V(E)}
    </div>`}function V(E){return!Ke(E)||Pe(E)?u`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:E.compatible===!1?u`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${E.runner}/${E.model} · effort
        ${E.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:E.is_default===!0?u`<span class="pa-settings__default">기본값</span>`:""}function Pe(E){return E.is_default===!0&&E.compatible===!1}function Ke(E){return!!(E.runner&&E.model&&E.effort)}function Ge(E){return Ke(E)&&E.compatible!==!1}function be(E){let h=Math.max(0,Math.floor(E/1e3)),A=Math.floor(h/60),F=h%60;return`${A}:${String(F).padStart(2,"0")}`}function L(E){let h=E.job;if(h){let A=typeof h.started_at=="number"?h.started_at:0,F=`${h.runner||"?"}/${h.model||"?"}`,oe=A?` \xB7 \uACBD\uACFC ${be(Date.now()-A)}`:"",ae=typeof h.session_id=="string"?h.session_id:"",ve=S(E).find(Ee=>Ee.run_id===h.job_id);return u`<span class="pa-meta__progress">
        <span
          >분석 중 — ${F} · effort ${h.effort||"?"}${oe}</span
        >
        ${ae?u`<code class="pa-session-id" title=${ae}
              >${ae.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>_e(h.job_id,ve||h)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${ve?.prompt_saved!==!0||ee.has(h.job_id)}
          @click=${()=>{Ce(h.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return re()?u`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function J(E){let h=L(E);return h===""?"":u`<div class="pa__strip">${h}</div>`}function re(){return r?.isPending?.()===!0}function G(E){let h=!!E.job,A=Ge(E.settings),F=w!==null&&x.size===0,oe=h||p||re()||N;return u`<div class="pa-meta">
      ${E.last_good?u`<span class="pa-meta__at"
            >분석 ${new Date(E.last_good.at||0).toLocaleString()}</span
          >`:u`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!A||oe||F}
        @click=${()=>{ne(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!A||oe||F}
        @click=${()=>{ne(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!h}
        @click=${()=>{ie()}}
      >
        취소
      </button>
    </div>`}function Ne(E){return typeof E=="string"&&E.length>0?E:"\uBBF8\uBC30\uCE58"}function Qe(E,h){h?x.add(E):x.delete(E),He()}function ct(E){let h=Array.isArray(E.scope)?E.scope:[],A=Array.isArray(E.overlaps)?E.overlaps:[];return h.length===0&&A.length===0?u``:u`<span class="pa-target__signals">
      ${h.length>0?u`<details class="pa-target__scope" title=${h.join(`
`)}>
            <summary>scope ${h.length}</summary>
            <ul>
              ${h.map(F=>u`<li><code>${F}</code></li>`)}
            </ul>
          </details>`:""}
      ${A.length>0?u`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${A.join(", ")}`}
            >겹침 ${A.join(", ")}</span
          >`:""}
    </span>`}function ot(){let E=w?.qualified||[],h=w?.excluded||[];return u`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${N?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${E.length} \xB7 \uC81C\uC678 ${h.length}`}</span
        >
      </header>
      ${w&&E.length>0?u`<ul class="pa-targets__list">
            ${E.map(A=>u`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${A.id}
                      .checked=${x.has(A.id)}
                      @change=${F=>Qe(A.id,F.target.checked)}
                    />
                    <span class="pa-target__title">${A.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${ct(A)}
                    <span class="pa-target__route">${A.route}</span>
                    <span class="pa-target__lane"
                      >${Ne(A.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:w&&E.length===0?u`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${w&&h.length>0?u`<details class="pa-targets__excluded">
            <summary>제외 대상 ${h.length}</summary>
            <ul class="pa-targets__list">
              ${h.map(A=>u`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${A.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${sb[A.reason]||A.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${Ne(A.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function ut(E){let h=typeof E.session_id=="string"&&E.session_id.length>0,A=h?E.session_id:"";return u`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${E.outcome}"
        >${ob[E.outcome]||E.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(E.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${E.runner||"?"} / ${E.model||"?"} / ${E.effort||"?"}</span
      >
      ${h?u`<code class="pa-session-id" title=${A}
            >${A.slice(0,8)}</code
          >`:u`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${E.outcome==="failure"&&E.reason?u`<span class="pa-run-row__reason">${E.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>_e(E.run_id,E)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${E.prompt_saved!==!0||ee.has(E.run_id)}
          @click=${()=>{Ce(E.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function ht(E){return u`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${E.length>0?u`<ul class="pa-runs__list">
            ${E.map(h=>ut(h))}
          </ul>`:u`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function bt(){return K?u`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${W}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${K.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{X()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${W}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${K.prompt}</pre
        >
      </section>
    </div>`:""}function tt(E,h){let A=$e(E,h),F=U(),oe=A.filter(Ye=>F.has(Ye)),ae=B(A),ve=te(A),Ee=Array.isArray(I().serial_lanes)?I().serial_lanes:[],Je=d.get(E)||Y(),rt=h.eligible!==!0||A.length<2||oe.length>0||ae.length>0||ve||p;return u`<section class="pa-group" data-group-index=${String(E)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${h.confidence}</span>
        ${h.categories.map(Ye=>u`<span class="pa-group__category">${Ye}</span>`)}
        ${ve?u`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${h.eligible===!0?"":u`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${ae.length>0?u`<span class="pa-group__stale"
              >stale — ${ae.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${h.reason}</p>
      <ol class="pa-group__members">
        ${A.map((Ye,dt)=>u`<li class="pa-member" data-bead-id=${Ye}>
              <span class="pa-member__seq">${dt+1}</span>
              <span class="pa-member__title">${xe(Ye)}</span>
              ${F.has(Ye)?u`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ye}
                ?disabled=${dt===0}
                aria-label=${`${Ye} \uC704\uB85C`}
                @click=${()=>De(E,h,Ye,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ye}
                ?disabled=${dt===A.length-1}
                aria-label=${`${Ye} \uC544\uB798\uB85C`}
                @click=${()=>De(E,h,Ye,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ye}
                aria-label=${`${Ye} \uC81C\uC678`}
                @click=${()=>Ae(E,h,Ye)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${h.evidence.map(Ye=>u`<li class="pa-evidence">
              <code>${Ye.path}</code>
              <span class="pa-evidence__locator">${Ye.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>je(E)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ye=>{d.set(E,Ye.target.value),He()}}
          >
            ${Ee.map((Ye,dt)=>u`<option
                  value=${Ye.id}
                  ?selected=${Je===Ye.id}
                >
                  직렬 ${dt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${rt}
          @click=${()=>{ke(E,h)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Tt(E){let h=Array.isArray(E.issues)?E.issues:[],A=h.filter(oe=>oe.verdict==="parallel_ok").length,F=h.filter(oe=>oe.verdict==="uncertain").length;return u`<div class="pa-summary">
      <span>parallel_ok ${A}</span>
      <span>uncertain ${F}</span>
    </div>`}function wt(){let E=ge&&!!P().job;if(E&&b===null){b=setInterval(()=>He(),1e3);return}!E&&b!==null&&(clearInterval(b),b=null)}function He(){let E=P();f&&E.settings.runner===f&&(f=null);let h=E.last_good?.result;wt(),Ve(u`
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
          ${J(E)}
          <div class="pa__body">
            ${z()} ${G(E)} ${ot()}
            ${h?u`${h.groups.map((A,F)=>tt(F,A))}
                ${h.groups.length===0?u`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Tt(h)}`:u`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${ht(S(E))}
          </div>
        </div>
        ${bt()}
      `,i)}let ge=!1,gt=()=>{ge=!1,K=null,j+=1,wt()},kt=E=>{E.target===E.currentTarget&&qe()};i.addEventListener("close",gt),i.addEventListener("cancel",gt),i.addEventListener("click",kt);let nt=null;n&&n.subscribe&&(nt=n.subscribe(()=>{ge&&He()}));let Q=null;r&&r.subscribe&&(Q=r.subscribe(()=>{ge&&He()}));function le(){ge||(ge=!0,He(),H(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function qe(){ge&&(ge=!1,K=null,j+=1,wt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:le,close:qe,destroy(){ge=!1,b!==null&&(clearInterval(b),b=null),i.removeEventListener("close",gt),i.removeEventListener("cancel",gt),i.removeEventListener("click",kt),nt&&(nt(),nt=null),Q&&(Q(),Q=null),i.remove()}}}function fp(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let c=i.scope.filter(d=>typeof d=="string"&&d.length>0);if(c.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:c})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let c=Qo(s[a].scope,s[i].scope);if(c.length===0)continue;let d=s[a].member,p=s[i].member;n.get(d.id)?.overlaps.push({id:p.id,title:p.title,location_label:p.location_label,prefixes:c}),n.get(p.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:c})}return n}function qi(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=r.kind!=="running",c=s.kind!=="running";if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&c&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&c&&a===null){let d=ib(n);return d===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${d} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:d,index:0},{bead_id:e,lane:d,index:1}]}}return!i&&!c?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function ib(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var _p=new Set(["sh","bash","zsh","dash","ksh"]),mp=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function gp(e){let t=e.split("/");return t[t.length-1]||""}function lb(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=gp(n[0]);if(r!=="env")return _p.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&_p.has(gp(s))}function cb(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function ub(e){let t=[],n=0;mp.lastIndex=0;for(let r of e.matchAll(mp)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:cb(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function db(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function hp(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",c=0,d=null,p=!1;function f(D,H){return H?ub(D).map(S=>S.kind==="plain"?S.text:u`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${S.kind}"
            >${S.text}</span
          >`):D}function b(){if(!s)return u``;let D=o==="ready"&&lb(a),H=o==="ready"?a.split(`
`):[];return u`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>I()}
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
              @click=${()=>{x()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>I()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?u`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?u`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:u`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${H.map((S,U)=>u`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${U+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(S,D)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function w(){Ve(b(),r)}async function x(){if(o!=="ready")return;let D=await an(a);de(D?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",D?"success":"error")}function N(D){D.key==="Escape"&&s&&(D.preventDefault(),I())}function j(){p||(document.addEventListener("keydown",N),p=!0)}function K(){p&&(document.removeEventListener("keydown",N),p=!1)}async function ee(D,H=null){let S=++c;j(),s={...D},d=H||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",w(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let B=t?t():"";if(!B){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",w();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",w();return}let ye="/api/repo-ops-script?workspace="+encodeURIComponent(B)+"&lane="+encodeURIComponent(D.lane)+"&base_sha="+encodeURIComponent(D.base_sha);try{let $e=await n(ye),te=await $e.json().catch(()=>({}));if(S!==c)return;if((t?t():"")!==B){I();return}if(!$e.ok||!te||te.ok!==!0){o="error",i=db(te&&typeof te.error=="string"?te.error:""),w();return}s={lane:te.lane,base_sha:te.base_sha,path:te.path,base_ref:te.base_ref},a=String(te.content),o="ready",w()}catch{if(S!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",w()}}function I(){c+=1,K(),s=null,a="",w();let D=d;d=null,D?.isConnected&&D.focus()}function P(){I(),r.remove()}return{open:ee,close:I,destroy:P}}function bp(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let S=o();return typeof S.revision=="number"?S.revision:0}function i(S){t&&S&&S.queue&&typeof S.queue=="object"&&t.set(S.queue)}function c(){let S=o().workspace_info;return S&&typeof S=="object"?S:{}}function d(S,U){return u`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${S}"
      >${U}</span
    >`}function p(S){if(typeof S!="number"||!Number.isFinite(S))return"";let U=S/6e4;return Number.isInteger(U)?`timeout ${U}\uBD84`:`timeout ${Math.round(S/1e3)}\uCD08`}function f(S){let U=p(S);return U?d("config",U):""}function b(S,U,B){return u`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${B.script}
      @click=${ye=>{s&&s({lane:S,base_sha:U.base_sha,path:B.script,base_ref:U.base_ref},ye.currentTarget)}}
    ></button>`}function w(){let S=o().repo_ops_opt_out;return{verify:S?.verify===!0,deploy:S?.deploy===!0}}function x(S,U){return u`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!U}
        @change=${B=>{ee(S,!B.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function N(S){let U=typeof S.base_sha=="string"?S.base_sha:"",B=`${S.source_path||"repo-ops/config.toml"} @ ${S.base_ref||"?"}${U?`@${U.slice(0,7)}`:""}`,ye=w(),$e=!!S.verify&&ye.verify,te=!!S.deploy&&ye.deploy;return u`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${B}</span>
      </p>
      <div
        class="worker-repo-ops__lane${$e?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${S.verify?u`${b("verify",S,S.verify)}
              ${f(S.verify.timeout_ms)}
              ${$e?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:u`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${$e?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":S.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${S.verify?x("verify",ye.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${te?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${S.deploy?u`${b("deploy",S,S.deploy)}
              ${f(S.deploy.timeout_ms)}
              ${te?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:u`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${te?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":S.deploy?u`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${S.deploy?x("deploy",ye.deploy):""}
      </div>
    </section>`}function j(S){let U=S.repo_ops&&typeof S.repo_ops=="object"?S.repo_ops:null;return U&&(U.status==="resolved"||U.status==="absent")?N(U):U&&(U.status==="pending"||U.status==="error")?u`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${U.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":u`선언 읽기
              실패${U.error_code?u` — <code>${U.error_code}</code>`:""}`}
        </div>
      </section>`:u`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function K(S){if(!n)return;let U=await n("worker-auto-repair-toggle",{on:S,expected_revision:a()});if(i(U),U&&U.conflict){let B=await n("worker-auto-repair-toggle",{on:S,expected_revision:a()});i(B)}r()}async function ee(S,U){if(!n)return;let B=await n("worker-repo-ops-opt-out-toggle",{kind:S,opted_out:U,expected_revision:a()});if(i(B),B&&B.conflict){let ye=await n("worker-repo-ops-opt-out-toggle",{kind:S,opted_out:U,expected_revision:a()});i(ye)}r()}let I={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function P(S,U,B){return u`<div class="worker-repo-ops__policy-group" data-policy=${B}>
      <div class="worker-repo-ops__policy-label">${S}</div>
      <ul class="worker-repo-ops__policy-list">
        ${U.map(ye=>u`<li data-token=${ye}>
              ${I[ye]||ye}
            </li>`)}
      </ul>
    </div>`}function D(S){return u`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${S.map(U=>{let B=[I[U.trigger]||U.trigger];return Number.isInteger(U.attempts_per_operation_attempt)?B.push(`operation\uB2F9 ${U.attempts_per_operation_attempt}\uD68C`):Number.isInteger(U.attempts)?B.push(`${I[U.budget]||U.budget} ${U.attempts}\uD68C`):Number.isInteger(U.sessions_per_user_action)&&B.push(`${U.sessions_per_user_action}\uD68C`,I[U.user_actions]||U.user_actions),U.applies_when&&B.push(I[U.applies_when]||U.applies_when),u`<li data-token=${U.id}>
            <strong>${I[U.id]||U.id}</strong>
            <span>${B.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function H(){let S=o(),U=S.auto_repair!==!1,B=S.repo_operation_policy&&typeof S.repo_operation_policy=="object"?S.repo_operation_policy:null,ye=Array.isArray(S.repo_operations)?S.repo_operations:[],$e=ye.find(Oe=>Oe.state==="repairing"),te=ye.filter(Oe=>Oe.state==="failed"||Oe.state==="repairing"),Y=te.length?Math.min(...te.map(Oe=>typeof Oe.repair?.remaining=="number"?Oe.repair.remaining:0)):B?.auto_repair?.resolution_ladder?.find(Oe=>Oe.id==="auto_repair_session")?.attempts??1,xe=Array.isArray(B?.auto_repair?.resolution_ladder)?B.auto_repair.resolution_ladder:[];return u`<section
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
          .checked=${U}
          @change=${Oe=>{K(Oe.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${U?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${Y}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${$e?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${$e.repair?.owner_bead||$e.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${B?u`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(B.worker_automatic||[]).length} · 해결 사다리
                ${xe.length} · 금지
                ${(B.never_automatic||[]).length}</span
              >
            </summary>
            ${P("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",B.worker_automatic||[],"worker-automatic")}
            ${B.supported===!1||B.schema_version!==2?u`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${B.schema_version})`}
                </div>`:D(xe)}
            ${P("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",B.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return u`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${j(c())} ${H()}
      </details>`}}}var kp=20,pb=5,fb=new Set(["failed","repairing","running","queued","retry_pending"]),yp={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},vp={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function _b(e,t,n=kp){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function mb(e){if(e.type==="cleanup")return!0;let t=e.operation;return fb.has(t.state)&&!t.dismissed&&!t.superseded_by}function gb(e,t,n={}){let r=_b(e,t,1/0),s=n.expanded===!0?kp:pb,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||mb(i));return{visible:a,hidden:r.length-a.length}}function wp(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function hb(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function $p(e){let t=e.filter(n=>n.value);return t.length===0?"":u`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>u`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function xp(e,t="",n=!1){return!e&&!t?"":u`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?u`<br />${t}`:""}
  </p>`}function bb(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return u`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(vp,r)?vp[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${n}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?u`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":u`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function yb(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return u`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Wt(e.at):""}
      >${zo(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${wp(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(yp,t.kind)?yp[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Bo(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${ks(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${wp(e)}"
          >${hb(e)}</span
        >
        ${t.dismissed?u`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?u`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?xp(rd(t.failure_kind,r)):""}
      ${bb(t)}
      ${$p([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Bo(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function vb(e){let t=e.cleanup,n=fr(t.step);return u`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Wt(e.at):""}
      >${zo(e.at)||"\u2014"}</span
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
        ${vd(t.step).map(r=>u`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${xp(Vo(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?u`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${$p([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function wb(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return u`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?u`<div class="worker-repo-drawer__empty">기록 없음</div>`:u`<ul class="worker-rail">
          ${e.events.map(r=>r.type==="cleanup"?vb(r):yb(r))}
        </ul>`}
    ${t>0||n?u`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${n?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function Ap(e,t={}){let n=null;function r(){if(n===null){Ve(u``,e);return}let a=gb(n.operations,n.cleanup_failures,{expanded:n.expanded});Ve(wb({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var kb=Ct("views:worker"),$b="tab:worker:ready",xb="tab:worker:blocked",Ab="tab:worker:in-progress",Sb="tab:worker:resolved",Eb="tab:worker:closed",na=1,Sp=5;function Ep(e){return To(e).path.length>0}var Tb=new Set(["quick_fix","spec_backed","full_plan"]);function Tp(e){return typeof e=="string"&&Tb.has(e)}var Ip="beads-ui.worker.candidate-filter",Fi={show_blocked:!1,spec:"all"};function Cb(){try{let e=window.localStorage.getItem(Ip);if(!e)return{...Fi};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Fi};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Fi}}}function Rb(e){try{window.localStorage.setItem(Ip,JSON.stringify(e))}catch{}}function Ob(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=n(i),d=r(i);c&&d?s.push(i):!c&&d?o+=1:c&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Ib=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Lp="bdui.worker.candidate_sort",Lb=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],ra="spec";function Mb(){try{let e=window.localStorage.getItem(Lp);return e==="board"||e==="created"||e==="spec"?e:ra}catch{return ra}}function Pb(e){try{window.localStorage.setItem(Lp,e)}catch{}}var Mp="bdui.worker.done-range";function Db(){try{let e=window.localStorage.getItem(Mp);return dn(e)?e:sn}catch{return sn}}function Nb(e){try{window.localStorage.setItem(Mp,e)}catch{}}var qb="(max-width: 640px)",Pp="beads-ui.worker.lane-collapsed",Rs={queue:!0,done:!0};function Fb(){try{let e=window.localStorage.getItem(Pp);if(!e)return{...Rs};let t=JSON.parse(e);return!t||typeof t!="object"?{...Rs}:{queue:typeof t.queue=="boolean"?t.queue:Rs.queue,done:typeof t.done=="boolean"?t.done:Rs.done}}catch{return{...Rs}}}function jb(e){try{window.localStorage.setItem(Pp,JSON.stringify(e))}catch{}}function Cp(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Bb(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(ir):(r.sort(Xs(n)),t==="board"?r:[...r.filter(Ep),...r.filter(s=>!Ep(s))])}function Ub(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Wb(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function Rp(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function zb(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function Hb(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Gb(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Vb(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Kb(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function ji(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Yb=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Zb=new Set(["waiting_metadata","reviewing","retrying"]);function Qb(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?Wt(r.next_at):"",c=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",c?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${c}`:""].filter(Boolean),live:!0}}default:return null}}function Xb(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Jb(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let c=Xb(e.terminal_reason);c&&i.push(`\uC6D0 \uC0AC\uC720: ${c}`);for(let d of t?t.details:[])i.push(d);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!Yb.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function Op(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ey(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Op(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Op(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=zb(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Rp(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Rp(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function ty(e,t,n,r,s=null,o=null,a=null,i=!1,c=null,d=!0,p=null,f=null,b=null,w={},x=!1,N=!1,j={}){let K=!!c&&c.position>0,ee=!!c?.continuation_action&&c.continuation_action.continuation===null,I=!!c&&c.active===!0,P=c&&c.failure||null,D=Gb(c?c.waiting:null,b),H=n[e]||null,S=H&&H.gate?H.gate:null,U=H&&H.pr?H.pr:null,B=Vb(c?c.resolution:null),ye=Kb(c?c.head_review:null),$e=c&&c.head_review||null,te=Qb(b,$e),Y=Jb(b,te),xe=c&&c.authority||null,Oe=!!$e&&["pending","reviewing","revising"].includes($e.state),ne=!!b&&typeof b=="object"&&Zb.has(b.phase),ie=K&&!I&&($e?.state==="failed"||!xe||ne||xe.source==="automatic"&&!N),Ce=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":B?B.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":D,W=!!S&&S.base_badge==="\uCDA9\uB3CC",X=!!S&&S.enabled===!0,_e=Ts({bead_id:e,merge_sha:j.merge_sha,cleanup_cursor:j.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:j.repo_operations}),Se=ea(_e),he=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!S&&S.tier==="merged",Be=i&&!!r&&!!S&&S.tier==="merged",we=ie&&(X||W||S?.reason==="base_behind"||S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"||he||Be),Ze=i&&W&&d===!1,lt=kn(w,e,{external:i,merge_active:I||_e?.step==="merge",merge_queued:K,conflict_active:!!a,cleanup_active:Se,merged:!!r||S?.tier==="merged"}),R=!!lt.operation,ue=!he&&!!r&&r.step==="repo_operations",ke=ey({continuation_required:ee,merge_step:_e,conflict_badge:Ce,conflict_live:B?.live===!0||a==="running",head_review:$e&&ye?{...ye,state:$e.state,failure_reason:$e.failure_reason}:null,auto_resolution:te,recovery:Y,cleanup_failed:r,cleanup_label:r?fr(r.step):null,base_exception:f,conflicting:W,gate:S,receipt_check:H&&H.receipt_check?H.receipt_check:null,queue_failure:P,auto_skip:p,queued:K,queue_active:I,queue_position:c?c.position:0,activity:Ce?null:o&&o.activity||null}),Ae=ke?.live===!0&&ke.title?u`<span title=${ke.title}>${ke.label}</span>`:ke?.label||null;return{id:e,title:i?u`${t}<span class="muted"> · 세션</span>`:t,reason:r&&_e?.active!==!0?Jo(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:x,external:i,pr_number:U&&typeof U.number=="number"?U.number:null,pr_url:U&&typeof U.url=="string"?U.url:"",completion_badge:ke?.live!==!0&&ke?.title?ke.label:null,completion_title:ke?.title||"",completion_repair_pr_url:Y?Y.repair_pr_url:"",completion_repair_pr_number:Y?Y.repair_pr_number:null,badges:Ae?[Ae]:[],live_badge:ke?.live===!0?Ae:null,usage:s,alert:ke?.alert===!0,merge_action:S?.tier==="merged"&&!he&&!Be||ue?!1:!K||ee||ie,timeline_action:ue,cancel_action:K&&!ee,cancel_enabled:(!I||Oe)&&!(Y&&Y.lock_actions),cancel_title:Y&&Y.lock_actions?`${Y.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:I&&!Oe?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Oe?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:lt,discard_action:lt.action,merge_step:_e,discard_enabled:lt.enabled,discard_title:lt.title,merge_enabled:!_e&&!a&&!R&&!f&&!(Y&&Y.lock_actions)&&!Ze&&!ue&&(X||W||S?.reason==="base_behind"||S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"||he||Be||we||ne&&!I),merge_label:ee?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":he||Be?"\uC815\uB9AC \uC7AC\uAC1C":W&&!_e&&!he?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":S?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ie?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:R?lt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${lt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${lt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:ee?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":_e?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${_e.label}`:Be?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ze?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":he?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":W?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":X?`\uBA38\uC9C0 (${S.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:S&&S.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${S&&S.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Bi(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:d,openDoc:p,doneRange:f,onDoneRangeChange:b}=t,w=r?eo(r,i):null,x=so({transport:n,uiOrderStore:i}),N=null,j=[],K=Cb(),ee=null,I=null,P={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},D=Mb(),H=dn(f)?f:Db(),S=new Map;function U(){let l=Bn.find(_=>_.value===H);return l?l.label:"\uC624\uB298"}let B=Fb(),ye=!1,$e=new Set,te=new Set,Y=new Set,xe=new Set,Oe=new Set,ne={},ie=null,Ce=0,W=null,X=[];function _e(l){return ie===l?ne:{}}async function Se(){if(!n)return;let l=d?.()||"";if(ie===l||W&&W.key===l&&W.generation===Ce)return;let _=++Ce;W={key:l,generation:_};let g=null;try{g=await Promise.resolve(n("get-session-defaults",{}))}catch(O){if(_!==Ce)return;W=null,kb("get-session-defaults failed: %o",O),ze();return}_===Ce&&(ne=g&&typeof g.values=="object"&&g.values!==null?{...g.values}:{},ie=l,W=null,ze())}function he(){ie=null,Ce+=1,Se()}let Be=document.createElement("div");Be.className="worker-console";let we=document.createElement("div");we.className="worker-top";let Ze=document.createElement("div");Ze.className="worker-drawer-overlay",Ze.hidden=!0;let lt=document.createElement("div");lt.className="worker-drawer-overlay__backdrop";let R=document.createElement("div");R.className="worker-drawer-host";let ue=document.createElement("div");ue.className="worker-drawer-host",ue.hidden=!0,Ze.append(lt,R,ue);let ke=document.createElement("div");ke.className="worker-lanes-host",Be.append(we,Ze,ke),e.appendChild(Be);let Ae=null,je=null,De=Dr(R,{transport:n,sessionLogStore:a,onClose:()=>{Ae=null,je=null,Ze.hidden=!0,ze()}}),z=Ap(ue,{onClose:()=>{ue.hidden=!0,Ze.hidden=!0,ze()}}),V=hp({getWorkspacePath:d||(()=>"")}),Pe=d&&d()||"",Ke=bp({queueStore:s,transport:n,onChanged:()=>ze(),onOpenScript:(l,_)=>{V.open(l,_)}}),Ge=o?pp(Be,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:d,onOpenTranscript:(l,_)=>Le(l,_)}):null;function be(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:na,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function L(){let l=be(),_=typeof l.serial_lane_count=="number"&&Number.isInteger(l.serial_lane_count)&&l.serial_lane_count>0?Math.min(l.serial_lane_count,5):0,g=Array.isArray(l.serial_lanes)?l.serial_lanes:[],O=[];for(let Re of g){if(O.length>=_)break;!Re||typeof Re.id!="string"||!/^s[1-5]$/.test(Re.id)||!Array.isArray(Re.entries)||O.push({id:Re.id,label:`\uC9C1\uB82C ${Re.id.slice(1)}`,count:Re.entries.length})}return O.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(l.queue)?l.queue:[]).length},...O]}function J(l){if(!ee||!l.some(g=>g.id===ee))return null;let _=L();return _?{bead_id:ee,lanes:_}:null}function re(){let l=be();return typeof l.revision=="number"?l.revision:0}function G(l){l&&l.queue&&s&&s.set(l.queue)}function Ne(){let l=be().queue;return Array.isArray(l)?l.length:0}async function Qe(l,_,g){if(!n)return;let O=()=>({bead_id:l,..._==="parallel"?{}:{lane:_},...g===void 0?{}:{index:g},expected_revision:re()}),fe=await n("worker-queue-place",O());G(fe),fe&&fe.conflict&&await n("worker-queue-place",O()).then(G)}async function ct(l,_,g){if(!n)return;let O=()=>({bead_id:l,..._==="parallel"?{}:{lane:_},to_index:g,expected_revision:re()}),fe=await n("worker-queue-reorder",O());G(fe),fe&&fe.conflict&&await n("worker-queue-reorder",O()).then(G)}async function ot(l){if(!n)return;let _=await n("worker-queue-remove",{bead_id:l,expected_revision:re()});G(_),_&&_.conflict&&await n("worker-queue-remove",{bead_id:l,expected_revision:re()}).then(G)}async function ut(l){if(!n||!l)return;let _=await n("worker-attempt-pause",{attempt_id:l});_&&_.paused===!1&&_.reason&&de(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function ht(l){if(!n||!l)return;let _=await Ir();if(_===null)return;let g=async(fe={})=>await n("worker-attempt-resume",{attempt_id:l,expected_revision:re(),..._!==""?{instructions:_}:{},...fe}),O=await g();G(O),O&&O.conflict&&(O=await g(),G(O)),O=await Rn(O,(fe,Re)=>g({continuation:fe,decision_token:Re}),{onResult:G,refresh:()=>g()}),O&&O.resumed===!1&&!O.conflict&&O.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${O.reason}`,"error",2400)}async function bt(l){if(!n||!l)return;let _=await n("worker-attempt-dismiss",{attempt_id:l,expected_revision:re()});G(_),_&&_.conflict&&(_=await n("worker-attempt-dismiss",{attempt_id:l,expected_revision:re()}),G(_)),_&&_.dismissed===!1&&!_.conflict&&_.reason&&de(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function tt(l,_,g=!0){if(!n)return null;let O=n,fe=await O(l,{..._,expected_revision:re()});return G(fe),fe&&fe.conflict&&g&&(fe=await O(l,{..._,expected_revision:re()}),G(fe)),fe}async function Tt(l){if(!n||!l)return;let _=be().merge_queue?.find(O=>O.bead_id===l)?.continuation_action;if(_?.mismatch&&_.continuation===null){await He(l,_.mismatch);return}$e.add(l),ze();let g;try{g=await tt("worker-merge-queue-add",{bead_id:l})}catch{de("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{$e.delete(l),ze()}if(!(!g||g.applied)){if(g.conflict){de("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}de(Hb(g.reason),"error",2400)}}async function wt(l){if(!(!n||!l||te.has(l))){te.add(l),ze();try{let _=await n("worker-cleanup-retry",{bead_id:l,expected_revision:re()});G(_),_&&!_.retried&&!_.conflict&&_.reason&&de(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${_.reason}`,"error",2400)}finally{te.delete(l),ze()}}}async function He(l,_){let g=await Rn({continuation_mismatch:_},(fe,Re)=>tt("worker-merge-queue-add",{bead_id:l,continuation:fe,decision_token:Re},!1)),O=g?.queue?.merge_queue?.find(fe=>fe.bead_id===l)?.continuation_action;if(g?.applied!==!0&&O?.continuation===null&&O.mismatch){await He(l,O.mismatch);return}g&&g.applied===!1&&!g.conflict&&de("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function ge(l){if(!n)return;let _=await tt("worker-merge-auto-toggle",{on:l});!_||_.conflict||de(l?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",l?"success":"info",2400)}async function gt(l){if(!n||!l)return;let _=await tt("worker-merge-queue-remove",{bead_id:l});_&&!_.conflict&&!_.applied&&_.reason==="merge_active"&&de("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function kt(){await tt("worker-merge-queue-remove",{all:!0})}async function nt(l,_=null,g="unmerged",O=null){if(!n||!l)return;let fe=$s(l,g);if(!(!!O||typeof globalThis.confirm!="function"||globalThis.confirm(fe)))return;let Te=await n("worker-discard",{bead_id:l,..._?{attempt_id:_}:{},...O?{operation_id:O}:{},expected_revision:re()});if(G(Te),Te&&Te.conflict&&(Te=await n("worker-discard",{bead_id:l,..._?{attempt_id:_}:{},...O?{operation_id:O}:{},expected_revision:re()}),G(Te)),Te&&Te.discarded===!0){de(Ho(Te),"success",5e3);return}if(Te&&Te.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${Te.reason}`,"error",2800);return}if(Te&&Te.accepted&&Te.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Te&&Te.accepted&&!Te.discarded){de(`\uD3D0\uAE30 \uC9C4\uD589: ${Te.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Te&&!Te.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Q(l,_,g){if(!(!n||!_||!g||xe.has(_))){xe.add(_),ze();try{let O=await n(l,{bead_id:_,action_id:g,expected_revision:re()});G(O),O?.conflict?de("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!O?.ok&&O?.reason&&de(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(O.reason)}`,"error",2800)}finally{xe.delete(_),ze()}}}async function le(l,_){if(!n||!_||Y.has(_))return;Y.add(_),ze();let g;try{let O=async(fe={})=>await n(l,{bead_id:_,expected_revision:re(),...fe});g=await O(),G(g),g&&g.conflict&&(g=await n(l,{bead_id:_,expected_revision:re()}),G(g)),l==="worker-revise-fix"&&(g=await Rn(g,(fe,Re)=>O({continuation:fe,decision_token:Re}),{onResult:G,refresh:()=>O()}))}finally{Y.delete(_),ze()}if(!(!g||g.conflict)){if(g.ok){de(l==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}de(`\uCC98\uBD84 \uAC70\uBD80: ${g.reason||""}`,"error",3e3)}}async function qe(l){if(!n)return;let _=await n("worker-automation-toggle",{on:l,expected_revision:re()});G(_),_&&_.conflict&&await n("worker-automation-toggle",{on:l,expected_revision:re()}).then(G)}async function E(l){if(!n||!l)return;let _=await n("worker-repo-operation-repair",{operation_id:l});if(G(_),_&&_.ok===!1){de(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${_.reason||""}`,"error",3e3);return}_&&_.ok===!0&&de("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function h(l){if(!n||!l)return;let _=await n("worker-repo-operation-dismiss",{operation_id:l});G(_),_&&_.ok===!1&&de(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${_.reason||""}`,"error",3e3)}async function A(l){if(!n||!Number.isFinite(l))return;let _=Math.max(na,Math.floor(l)),g=await n("worker-queue-set-slots",{slots:_,expected_revision:re()});G(g),g&&g.conflict&&await n("worker-queue-set-slots",{slots:_,expected_revision:re()}).then(G)}async function F(l){if(!n||!Number.isInteger(l)||l<1||l>Sp)return;let _=be(),g=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).slice(l).reduce((Re,Te)=>Re+(Array.isArray(Te?.entries)?Te.entries.length:0),0),O=()=>({count:l,expected_revision:re()}),fe=await n("worker-queue-set-serial-lane-count",O());G(fe),fe&&fe.conflict&&(fe=await n("worker-queue-set-serial-lane-count",O()),G(fe)),fe&&fe.applied&&g>0&&de(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${g}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let oe="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function ae(l,_){let g=qi(l,_.id,P);return{id:_.id,title:_.title,location_label:_.location_label,prefixes:_.prefixes,action:g.kind==="note"?{kind:"note",text:g.text}:g.kind==="disabled"?{kind:"disabled",label:oe,title:g.title}:{kind:"place",label:oe,title:g.title}}}function ve(l,_){if(!I||I.bead_id!==l)return null;let g=I.counterpart_id,O=g===null?_:_.filter(fe=>fe.id===g);return O.length===0?null:{rows:O.map(fe=>ae(l,fe))}}async function Ee(l,_){let g=qi(l,_,P);if(I=null,g.kind!=="ops"){ze();return}let O=re();for(let fe of g.ops){let Re=await Je(fe,O);if(Re===null)break;O=Re}ze()}async function Je(l,_){if(!n)return null;try{let g=await n("worker-queue-place",{bead_id:l.bead_id,lane:l.lane,index:l.index,expected_revision:_});if(G(g),g&&g.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!g||g.applied!==!0)return de(g&&typeof g.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${g.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let O=g.queue?g.queue.revision:void 0;return typeof O!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):O}catch(g){return de(g instanceof Error&&g.message?g.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function rt(){let l=be(),_=w?w.selectBoardColumn($b,"ready"):[],g=w?w.selectBoardColumn(xb,"blocked"):[],O=w?w.selectBoardColumn(Eb,"closed"):[],fe=w?w.selectBoardColumn(Ab,"in_progress"):[],Re=w?w.selectBoardColumn(Sb,"resolved"):[],Te=no([..._,...g,...fe,...Re,...O]),Ue=new Map;for(let m of[..._,...g,...fe])m&&m.id&&!Ue.has(m.id)&&Ue.set(m.id,m);let pt={..._e(d?.()||"")};for(let m of["orchestration_model","orchestration_effort","orchestration_speed"]){let q=l[m];typeof q=="string"&&(pt[m]=q)}function Ut(m,q){let se=Ue.get(m);if(!se)return null;let We=se.metadata&&typeof se.metadata=="object"?se.metadata:{},it=se.workflow?.route,qt=We.route,Dt=Tp(it)?it:Tp(qt)?qt:null;return Jt({pin:We,global:pt,execution_defaults:l.execution_defaults??null,runner_catalog:l.runner_catalog??null,route:Dt,controller_runtime:q})}function rn(m){let q=m.runner||null,se=Ut(m.bead_id,q),We=xs(m),it=se?Yn(se,q):null;return We||it?{orchestration:We,worker:it}:null}let Fn=new Map;function Gr(m){if(Fn.has(m))return Fn.get(m)??null;let q=Ut(m,null),se=null;if(q){let We=wn(l.runner_catalog??null,q.orchestration_model.value??""),it=We===null?q:Ut(m,We),qt=pr(it,l.runner_catalog??null),Dt=Yn(it,We);se=qt||Dt?{orchestration:qt,worker:Dt}:null}return Fn.set(m,se),se}function _r(m){let q=ro(Te,m);return q.total===0?null:q}let Hi=l.bead_titles||{},Zt=new Map;for(let[m,q]of Object.entries(Hi))typeof q=="string"&&q.length>0&&Zt.set(m,q);for(let m of[..._,...g])Zt.set(m.id,m.title||m.id);let Vr=new Map;for(let m of[..._,...g,...fe,...Re,...O])m&&m.id&&typeof m.from_id=="string"&&Vr.set(m.id,m.from_id);let Os=l.bead_times&&typeof l.bead_times=="object"&&!Array.isArray(l.bead_times)?l.bead_times:{},Is=l.bead_labels&&typeof l.bead_labels=="object"&&!Array.isArray(l.bead_labels)?l.bead_labels:{},xn=l.bead_workflow&&typeof l.bead_workflow=="object"&&!Array.isArray(l.bead_workflow)?l.bead_workflow:{},jn=new Map;for(let[m,q]of Object.entries(Is))Array.isArray(q)&&jn.set(m,Pi(q));for(let m of[..._,...g]){let q=m.labels;Array.isArray(q)&&!jn.has(m.id)&&jn.set(m.id,Pi(q))}let mr=new Map,gr=o?.get()?.last_good?.result?.groups;for(let m of Array.isArray(gr)?gr:[]){if(m?.eligible!==!0||!Array.isArray(m.members))continue;let q=m.members.map(We=>{let it=(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).find(qt=>qt.entries.some(Dt=>Dt.bead_id===We));return it?it.id:null});if(!(q.every(We=>We!==null)&&new Set(q).size===1))for(let We of m.members)mr.set(We,m.members.filter(it=>it!==We))}let Ls=l.bead_blocked_by&&typeof l.bead_blocked_by=="object"&&!Array.isArray(l.bead_blocked_by)?l.bead_blocked_by:{},hr=new Map;for(let[m,q]of Object.entries(Os))q&&typeof q=="object"&&hr.set(m,q);for(let m of[..._,...g])hr.set(m.id,{created_at:m.created_at,updated_at:m.updated_at});let Xn=m=>hr.get(m)||{},Jn=l.pr_wait||[],br=l.pr_observations||{},Ms=l.pr_activity||{},Fe=l.cleanup_failed||{},ft=Object.entries(Fe).map(([m,q])=>({bead_id:m,step:q&&q.step?q.step:"",reason:q&&q.reason?q.reason:"",at:q&&typeof q.at=="number"?q.at:null,detail:q&&typeof q.detail=="string"?q.detail:null,output_tail:q&&typeof q.output_tail=="string"&&q.output_tail?q.output_tail:void 0,log_path:q&&typeof q.log_path=="string"&&q.log_path?q.log_path:void 0,retry_count:q&&typeof q.retry_count=="number"&&Number.isInteger(q.retry_count)&&q.retry_count>0?q.retry_count:0,failure_code:q&&typeof q.failure_code=="string"?q.failure_code:void 0,subject_id:q&&typeof q.subject_id=="string"?q.subject_id:void 0,repair_eligible:!!(q&&q.repair_eligible),repair:q&&q.repair?q.repair:void 0})),Qt=l.queue||[],Gi=new Set([...Qt.map(m=>m.bead_id),...(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).flatMap(m=>(Array.isArray(m?.entries)?m.entries:[]).map(q=>q.bead_id)),...Jn.map(m=>m.bead_id),...l.done.map(m=>m.bead_id)]),Kp=new Set(g.map(m=>m.id)),Yp=i?i.get()?.order||{}:{},Vi=new Set,Ki=[];for(let m of[..._,...g])Gi.has(m.id)||Vi.has(m.id)||Ub(m)||(Vi.add(m.id),Ki.push(m));j=Bb(Ki,D,Yp);let Zp=l.admission||{},Yi=m=>{let q=Zp[m];if(!q)return"";if(q.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let se=typeof q.reason=="string"?q.reason:"",We=se.indexOf(":");return We>0&&We<se.length-1?`\u26D4 ${se.slice(0,We)} (${se.slice(We+1)})`:`\u26D4 ${se}`},Qp=j.map(m=>{let q=To(m),se=q.path.length>0,We=m.workflow?.route==="quick_fix"||m.metadata&&m.metadata.route==="quick_fix",it=!Object.hasOwn(m,"description")||typeof m.description=="string"&&m.description.trim().length>0,qt=Object.hasOwn(m,"labels")&&dp(m.labels),Dt=!qt&&(We?it:se&&!q.conflict),At=Kp.has(m.id),gn=[];At&&gn.push(Wb(m)),We&&!it?gn.push("missing_description"):!We&&q.conflict?gn.push("spec_id_conflict"):!We&&!se&&gn.push("spec \uC5C6\uC74C");let Ws=Yi(m.id);return Ws&&gn.push(Ws),{id:m.id,title:m.title||m.id,reason:gn.join(" \xB7 "),draggable:Dt,lane:"candidate",created_at:m.created_at,updated_at:m.updated_at,workflow:m.workflow,is_quick_fix:We,status:m.status,worker_ineligible:qt,blocked:At,has_spec:se,exec_chips:Gr(m.id),from_id:m.from_id||void 0}}),sa=Ob(Qp,K),oa=sa.visible,Xp=l.revise_parked||{},Ps=l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},aa=(m,q)=>m.map((se,We)=>{let it=q!=="done",qt=q!=="done"&&q!=="queue",Dt=it?Xp[se.bead_id]:null,At=it?kn(Ps,se.bead_id):null,gn=At?.operation?At:null,Ws=it&&jn.get(se.bead_id)===!0,Al=Ls[se.bead_id]||[],ma=l.admission&&typeof l.admission=="object"?l.admission[se.bead_id]:null,ga=it?Xu(ma,!!gn||xe.has(se.bead_id)):null,cf=it&&!ga?Yi(se.bead_id):null,uf=it?[cf]:[],Sl=it&&Al.length>0&&typeof ma?.reason=="string"&&ma.reason.startsWith("not_ready")?[`\u23F8 ${Al.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],ha=it?mr.get(se.bead_id):void 0;return ha&&ha.length>0&&Sl.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${ha.join(", ")}\uC640`),{id:se.bead_id,title:Zt.get(se.bead_id)||se.bead_id,reason:uf.filter(Boolean).join(" \xB7 "),draggable:it&&!gn&&!ga,done:q==="done",lane:q,seq:qt?We+1:void 0,worker_serial:Ws,discard:gn,stale_work:ga,badges:[...Sl,...Dt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...q==="done"?Uo(l.attempts||{},se.bead_id):[]],alert:!!Dt,revise_action:!!Dt,revise_enabled:!!Dt&&!gn&&!Y.has(se.bead_id),revise_title:Dt?Dt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Dt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:q==="done"?pn(l.attempts||{},se.bead_id):null,work_ms:q==="done"?Wo(l.attempts||{},se.bead_id):null,done_at:q==="done"&&typeof se.added_at=="number"?se.added_at:void 0,exec_chips:it?Gr(se.bead_id):null,workflow:it&&xn[se.bead_id]||null,from_id:Vr.get(se.bead_id)||void 0,...Xn(se.bead_id)}}),yr=l.attempts?Object.values(l.attempts).filter(Wr):[],ia=new Set;for(let m of yr)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&ia.add(m.resumed_from);let Zi=new Map;for(let m of yr)Zi.set(m.bead_id,m.attempt_id);let Ds=new Map;for(let m of yr)Ds.set(m.attempt_id,m);function la(m){let q=new Set,se=m;for(;se&&!q.has(se.attempt_id);){if(se.conflict_resolution===!0)return!0;q.add(se.attempt_id),se=typeof se.resumed_from=="string"&&se.resumed_from.length>0&&Ds.get(se.resumed_from)||null}return!1}let Ns=typeof l.declared_base=="string"?l.declared_base:null;function Jp(m){let q=null;for(let se of yr)!se||se.bead_id!==m||la(se)||(q===null||(typeof se.started_at=="number"?se.started_at:0)>=(typeof q.started_at=="number"?q.started_at:0))&&(q=se);return q&&typeof q.target_base=="string"?q.target_base:null}let ca=[],qs=[],ef=up(l),Qi=m=>{let q=typeof m.session_id=="string"&&m.session_id.length>0,se=ia.has(m.attempt_id);return{eligible:q&&!se,reason:q?se?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},mn=null;for(let m of yr){let q=m.status==="paused"&&!ia.has(m.attempt_id);if(m.status==="running"||q)qs.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Zt.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,paused:q,conflict_resolution:la(m),base_exception:ji(Ns,m.target_base),can_pause:typeof m.session_id=="string"&&m.session_id.length>0,discard:kn(Ps,m.bead_id,{attempt_id:m.attempt_id}),workflow:xn[m.bead_id]||null,usage:pn(l.attempts||{},m.bead_id),rollup:_r(m.bead_id),rollup_expanded:Oe.has(m.bead_id),exec_chips:rn(m),...Xn(m.bead_id)});else if((m.status==="failed"||m.status==="orphaned")&&ef(m)){let se=Qi(m);ca.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Zt.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,failed:!0,status:m.status,status_label:m.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:kn(Ps,m.bead_id,{attempt_id:m.attempt_id}),resume_eligible:se.eligible,resume_reason:se.reason,conflict_resolution:la(m),base_exception:ji(Ns,m.target_base),workflow:xn[m.bead_id]||null,usage:pn(l.attempts||{},m.bead_id),rollup:_r(m.bead_id),rollup_expanded:Oe.has(m.bead_id),exec_chips:rn(m),...Xn(m.bead_id)}),mn=m}}let Xi=new Set([...ca,...qs].map(m=>m.bead_id));for(let m of Array.isArray(l.session_active)?l.session_active:[]){let q=m&&m.bead_id;typeof q!="string"||q.length===0||Xi.has(q)||(Xi.add(q),qs.push({bead_id:q,attempt_id:null,kind:"session",title:m.title||Zt.get(q)||q,status:"in_progress",started_at:An(m.started_at)??An(m.updated_at),updated_at:An(m.updated_at),workflow:m.workflow||null,runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1}))}let vr=[...ca,...qs].map(m=>{let q=Ds.get(m.attempt_id),se=q?.quickfix_landing;if(q?.quickfix_lane!==!0||!se||typeof se!="object")return m;let We=typeof se.reason=="string"&&se.reason.length>0?se.reason:null,it=Ts({bead_id:q.bead_id,merge_sha:se.head_sha,cleanup_cursor:se.cursor,cleanup_failed:We?{step:se.cursor,reason:We}:null,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]});return it?{...m,landing:it}:m}),Ji=null;if(mn){let m=Qi(mn),q=mn.cause_detail;Ji={bead_id:mn.bead_id,repo:mn.repo||"",reason:mn.cause||mn.status,cause_detail:q&&typeof q.reason=="string"?{reason:q.reason,command:typeof q.command=="string"?q.command:null}:null,resume_attempt_id:mn.attempt_id,resume_eligible:m.eligible,resume_reason:m.reason,discard:kn(Ps,mn.bead_id,{attempt_id:mn.attempt_id})}}let el=new Set(vr.map(m=>m.bead_id)),ua=Array.isArray(l.merge_queue)?l.merge_queue:[],tl=new Map,nl=new Map,rl=new Map,sl=new Map,ol=new Map;ua.forEach((m,q)=>{m&&typeof m.bead_id=="string"&&(tl.set(m.bead_id,q+1),nl.set(m.bead_id,m.resolution),rl.set(m.bead_id,m.continuation_action||null),sl.set(m.bead_id,m.head_review||null),ol.set(m.bead_id,m.authority||null))});let wr=l.merge_queue_state||{active:null,failures:{}},tf=wr.failures||{},al=wr.waiting&&typeof wr.waiting.bead_id=="string"&&typeof wr.waiting.reason=="string"?wr.waiting:null,nf=l.auto_merge_skips||{},il=m=>{let q=nf[m];if(!q)return null;let se=br[m],We=se&&se.pr?se.pr.head_sha:null;return We&&We===q.head_sha?q.reason||"":null},Fs=new Map;for(let m of vr)m.failed!==!0&&m.conflict_resolution&&(m.paused?Fs.has(m.bead_id)||Fs.set(m.bead_id,"paused"):Fs.set(m.bead_id,"running"));let ll=vr.filter(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0).length,cl=(l.workspace_info||{}).slots,ul=typeof cl=="number"?cl:typeof l.slots=="number"?l.slots:na,rf=ll>ul,js=or(H),sf=(Array.isArray(l.done)?l.done.slice():[]).filter(m=>js===void 0||typeof m.added_at!="number"||m.added_at>=js).sort((m,q)=>(q.added_at||0)-(m.added_at||0)),Kr=aa(sf,"done"),of=new Set((Array.isArray(l.done)?l.done:[]).map(m=>m?.bead_id).filter(m=>typeof m=="string")),dl=[],af=d?.()||"";for(let m of O){let q=An(m.closed_at);if(typeof m.id!="string"||of.has(m.id)||q===null||js!==void 0&&q<js||typeof m.comment_count!="number"||m.comment_count<=0)continue;let se=`${af}\0${m.id}\0${String(m.updated_at)}\0${m.comment_count}`,We=S.get(se);We===void 0&&n&&(S.set(se,"pending"),Promise.resolve(n("get-comments",{id:m.id})).then(it=>{let qt=Array.isArray(it)&&it.some(Dt=>Co(typeof Dt?.text=="string"?Dt.text:"")?.lane==="session");S.set(se,qt?"session":"not-session"),ze()}).catch(()=>{S.set(se,"failed"),ze()})),We==="session"&&dl.push({id:m.id,title:m.title||m.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:q,created_at:m.created_at,updated_at:m.updated_at})}Kr.push(...dl),Kr.sort((m,q)=>(q.done_at||0)-(m.done_at||0));let Bs={};for(let m of On)Bs[m]=0;let pl=!1,fl=0,da=0,_l=0;for(let m of Kr){let q=m.usage;if(q&&typeof q=="object"){let se=!1;for(let We of On)Number.isFinite(q[We])&&(Bs[We]+=q[We],pl=!0,se=!0);se&&(da+=1,Number.isFinite(q.total_cost_usd)&&(fl+=q.total_cost_usd,_l+=1))}}da>0&&_l===da&&(Bs.total_cost_usd=fl);let ml=Kr.map(m=>m.usage).filter(m=>m&&typeof m=="object"&&m.providers),lf=ml.length>0?zt(_o(ml)):pl?In(Bs):null,gl=l.lane_states&&typeof l.lane_states=="object"&&!Array.isArray(l.lane_states)?l.lane_states:{},hl=Array.isArray(l.serial_lanes)?l.serial_lanes:[],bl=m=>{if(Jn.some(We=>We.bead_id===m))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let q=yr.filter(We=>We&&We.bead_id===m),se=q.length>0?q[q.length-1].status:null;return se==="failed"||se==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":se==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Us=hl.filter(m=>m&&typeof m.id=="string"&&Array.isArray(m.entries)).map((m,q)=>{let se=gl[m.id]||{},We=new Map((Array.isArray(se.corrections)?se.corrections:[]).filter(At=>At&&typeof At.bead_id=="string"&&typeof At.after=="string").map(At=>[At.bead_id,At.after])),it=aa(m.entries.filter(At=>!el.has(At.bead_id)),m.id).map(At=>We.has(At.id)?{...At,badges:[`\u{1F517} ${We.get(At.id)} \uB4A4 (blocks \uC790\uB3D9)`,...At.badges]}:At),qt=Array.isArray(se.occupied_by)?se.occupied_by.filter(At=>typeof At=="string"):[],Dt=qt.map(At=>({id:At,title:Zt.get(At)||At,draggable:!1,lane:m.id,ghost:!0,badges:[bl(At)]}));return{id:m.id,index:q+1,rows:[...Dt,...it],occupied:qt.length>0,badge:qt.length>0?bl(qt[0]):"\uB300\uAE30",cycle:se.cycle===!0}}),yl=typeof l.serial_lane_count=="number"?l.serial_lane_count:Us.length,pa=aa(Qt.filter(m=>!el.has(m.bead_id)),"queue"),vl=new Map,wl=new Set;for(let[m,q]of Object.entries(gl)){if(!/^s[1-5]$/.test(m))continue;let se=q&&Array.isArray(q.occupied_by)?q.occupied_by:[];for(let We of se)typeof We=="string"&&vl.set(We,m);se.length>0&&wl.add(m)}let kr=[];for(let m of vr)typeof m.bead_id=="string"&&kr.push({id:m.bead_id,title:Zt.get(m.bead_id)||m.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:vl.get(m.bead_id)??null});for(let m of Us)for(let q of m.rows)q.ghost!==!0&&kr.push({id:q.id,title:q.title,location_label:`${m.id} #${q.seq??""}`.trim(),kind:"serial",lane_id:m.id});pa.forEach((m,q)=>{kr.push({id:m.id,title:m.title,location_label:`#${q+1}`,kind:"parallel",lane_id:null})});for(let m of oa)kr.push({id:m.id,title:m.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let kl={};for(let m of hl)m&&typeof m.id=="string"&&Array.isArray(m.entries)&&(kl[m.id]=m.entries.length);let fa=new Map;for(let m of kr)fa.has(m.id)||fa.set(m.id,m);P={members_by_id:fa,serial_raw_lengths:kl,serial_lane_count:yl,occupied_lanes:wl};let $l=fp(l.bead_scope,kr),_a=(m,q)=>{let se=$l.get(m.id);if(!se||se.overlaps.length===0&&!se.scope_missing)return m;let We=ve(m.id,se.overlaps);return m.dependency_chips={...m.dependency_chips||{},...se.overlaps.length>0?{overlaps:se.overlaps}:{},...se.scope_missing&&q!=="running"?{scope_missing:!0}:{},...We?{popover:We}:{}},m};for(let m of pa)_a(m,"queue");for(let m of Us)for(let q of m.rows)q.ghost!==!0&&_a(q,m.id);for(let m of oa)_a(m,"candidate");let xl=new Map;for(let m of vr){let q=typeof m.bead_id=="string"?$l.get(m.bead_id):void 0;if(!q||q.overlaps.length===0)continue;let se=ve(m.bead_id,q.overlaps);xl.set(m.bead_id,{dependency_chips:{overlaps:q.overlaps,...se?{popover:se}:{}}})}return{queue:l,idToTitle:Zt,candidates:oa,candidate_hidden:{blocked:sa.hidden_blocked,spec:sa.hidden_spec},running:vr,live_count:ll,slots:ul,over_cap:rf,failure:Ji,waiting:pa,serial_lanes:Us,serial_lane_count:yl,running_overlays:xl,pr_wait:Jn.map(m=>ty(m.bead_id,Zt.get(m.bead_id)||m.bead_id,br,Fe[m.bead_id]||null,pn(l.attempts||{},m.bead_id),Ms[m.bead_id]||($e.has(m.bead_id)||te.has(m.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Fs.get(m.bead_id)||null,m.external===!0,{position:tl.get(m.bead_id)||0,active:wr.active===m.bead_id,failure:tf[m.bead_id]||null,waiting:al?.bead_id===m.bead_id?al.reason:null,resolution:nl.get(m.bead_id),continuation_action:rl.get(m.bead_id),head_review:sl.get(m.bead_id)||null,authority:ol.get(m.bead_id)||null},m.wt_present!==!1,l.auto_merge===!0?il(m.bead_id):null,ji(Ns,Jp(m.bead_id)),l.completion_status&&typeof l.completion_status=="object"&&!Array.isArray(l.completion_status)&&l.completion_status[m.bead_id]||null,l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},Ds.get(Zi.get(m.bead_id)||"")?.worker_serial===!0,l.auto_merge===!0,{merge_sha:m.merge_sha,cleanup_cursor:m.cleanup_cursor,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]})).map(m=>({...m,workflow:xn[m.id]||null,...Xn(m.id)})),merge_queue_length:ua.length,merge_queue_running:ua.length>0,auto_excluded:Jn.map(m=>m.bead_id).filter(m=>il(m)!==null),declared_base:Ns,done:Kr,token_total:lf,cleanup_failures:ft,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]}}function Ye(){let _=!!o?.get()?.job,g=!_&&o?.isPending?.()===!0,O=_?"\uBD84\uC11D \uC911":g?"\uC900\uBE44 \uC911":"";return u`<button
      type="button"
      class=${O?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${O?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${O?u`<span class="worker-analysis-btn__badge">${O}</span>`:""}
    </button>`}function dt(l){let _=l.waiting.length>0?l.waiting[0].id:"\u2014",g=u`<button
      type="button"
      class="worker-play${l.queue.auto_advance?" is-active":""}"
    >
      ${l.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,O=Bt(l),fe=l.over_cap?u`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Re=u`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${l.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${l.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${U()} 완료 <b>${l.done.length}</b></span
      >`,Te=u`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${l.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${l.declared_base||"?"}</span
    >`,Ue=u`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${na}
          step="1"
          .value=${String(l.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Sp},(rn,Fn)=>Fn+1).map(rn=>u`<option
                value=${String(rn)}
                ?selected=${l.serial_lane_count===rn}
              >
                ${rn}
              </option>`)}
        </select>
      </label>
      ${o?Ye():""} `,pt=od({failure:l.failure}),Ut=Qu(l.repo_operations,l.cleanup_failures);return ye?u`<div class="worker-ribbon">
          ${g} ${O}
          <div class="worker-kpi worker-kpi--ribbon">${fe}${Re}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ue}</div>
          <div class="worker-kpi">${Te}</div>
        </div>
        ${Ut}${Ke.template()}${pt}`:u`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${g}${O}${Ue}</div>
        <div class="worker-kpi">
          ${fe}${Re}${Te}
          ${(Array.isArray(l.token_total)?l.token_total:l.token_total?[{label:l.token_total,tooltip:`${U()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(rn=>u`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${rn.tooltip}
                >${U()} 완료 · 누적 ${rn.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${_}</b></span
          >
        </div>
      </div>
      ${Ut}${Ke.template()}${pt}`}function Rt(l){if(l.running.length===0&&l.pr_wait.length===0)return"";let _=l.running.some(g=>g.kind!=="session"&&!g.paused&&g.failed!==!0);return u`<section
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
          >${l.running.length+l.pr_wait.length}</span
        >
      </header>
      ${l.running.length>0?ki(l.running,Date.now(),Ae,l.running_overlays):""}
      ${l.pr_wait.map(g=>Gn(g))}
    </section>`}function _t(l){let _=l.candidate_hidden;return u`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${K.show_blocked}
        />
        🔒 blocked${_.blocked>0?` ${_.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ib.map(g=>u`<button
              type="button"
              class="worker-filter__chip${K.spec===g.value?" is-active":""}"
              data-spec=${g.value}
              aria-pressed=${K.spec===g.value?"true":"false"}
            >
              ${g.label}
            </button>`)}
        ${_.spec>0?u`<span class="worker-filter__hidden">숨김 ${_.spec}</span>`:""}
      </div>
    </div>`}function tn(){return u`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${D}
    >
      ${Lb.map(l=>u`<option value=${l.value} ?selected=${D===l.value}>
            ${l.label}
          </option>`)}
    </select>`}function jt(){return u`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${H}
      >
        ${Bn.map(l=>u`<option value=${l.value} ?selected=${H===l.value}>
              ${l.label}
            </option>`)}
      </select>
    </div>`}function Mt(l){let _=u`<span
      class="worker-lane__badge${l.occupied?" worker-lane__badge--held":""}"
      >${l.badge}</span
    >`,g=l.cycle?u`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return _n({id:`worker-pane-lane-${l.id}`,lane:l.id,title:`\uC9C1\uB82C ${l.index}`,items:l.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:_,controls:g})}function Bt(l){let _=l.queue.auto_merge===!0;if(l.merge_queue_running)return u`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${_?" is-active":""}"
        title=${_?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${_?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${l.merge_queue_length}
      </button>`;if(_)return u`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let g=new Set(l.auto_excluded),O=l.pr_wait.filter(fe=>fe.merge_action&&fe.merge_enabled&&!g.has(fe.id)).length;return u`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${O>0?` ${O}`:""}
    </button>`}function Pt(l){let _=_n({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:l.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:tn(),controls:_t(l),place_menu:J(l.candidates),onOpenDoc:p?(g,O)=>p(O):void 0});return ye?u`<div class="worker-lanes worker-lanes--mobile">
        ${Rt(l)}
        ${_n({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:B.queue,preview:Cp(l.waiting)})}
        ${l.serial_lanes.map(g=>Mt(g))}
        ${_}
        ${_n({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:l.done,empty:`${U()} \uC644\uB8CC \uC5C6\uC74C`,controls:jt(),collapsible:!0,collapsed:B.done,preview:Array.isArray(l.token_total)?l.token_total.map(g=>g.label).join(" \xB7 "):l.token_total||Cp(l.done)})}
      </div>`:u`<div class="worker-lanes">
      ${_}
      <div class="worker-wait">
        ${_n({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${l.serial_lanes.map(g=>Mt(g))}
      </div>
      ${_n({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${l.slots}`,items:l.running,live:l.running.some(g=>g.kind!=="session"&&!g.paused&&g.failed!==!0),body:ki(l.running,Date.now(),Ae,l.running_overlays)})}
      ${_n({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:l.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${_n({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${U()} ${l.done.length}`,items:l.done,empty:`${U()} \uC644\uB8CC \uC5C6\uC74C`,controls:jt()})}
    </div>`}function It(l){B={...B,[l]:!B[l]},jb(B),ze()}function ze(){let l=rt();Ve(dt(l),we),Ve(Pt(l),ke)}function nn(){if(typeof window.matchMedia!="function")return;let l=window.matchMedia(qb);ye=!!l.matches;let _=g=>{let O=!!(g&&typeof g.matches=="boolean"?g.matches:l.matches);O!==ye&&(ye=O,ze())};typeof l.addEventListener=="function"?(l.addEventListener("change",_),X.push(()=>l.removeEventListener("change",_))):typeof l.addListener=="function"&&(l.addListener(_),X.push(()=>l.removeListener(_)))}let Ht=null;function et(l){Ht=l.target instanceof Element?l.target:null}function Me(l){let g=l.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!g)return;if(Ht&&g.contains(Ht)&&Ht.closest("input, button, a")){l.preventDefault();return}let O=g.dataset.beadId||"",fe=g.dataset.lane||"";N={bead_id:O,from_lane:fe};try{l.dataTransfer?.setData("text/plain",O),l.dataTransfer&&(l.dataTransfer.effectAllowed="move")}catch{}}function C(l){let _=l.target?.closest?.(".worker-pane");if(!_)return;let g=_.dataset.lane||"";g!=="candidate"&&g!=="queue"&&!/^s[1-5]$/.test(g)||(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="move"),_.classList.add("worker-pane--drag-over"))}function pe(l){l.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ie(l,_){let g=j.find(Te=>Te.id===l);if(!g)return;let O=j.filter(Te=>Te.id!==l),fe=O.length;if(_){let Te=_.dataset.beadId;if(Te===l)return;let Ue=O.findIndex(pt=>pt.id===Te);Ue>=0&&(fe=Ue)}let Re=O.slice();Re.splice(fe,0,g),x.applyReorder(l,Re,fe)}function at(l){let _=l.target?.closest?.(".worker-pane");if(!_)return;l.preventDefault(),_.classList.remove("worker-pane--drag-over");let g=_.dataset.lane||"",O=N?.bead_id||l.dataTransfer?.getData("text/plain")||"",fe=N?.from_lane||"";if(N=null,!O)return;let Re=l.target?.closest?.(".worker-mini, .worker-card"),Te=Array.from(_.querySelectorAll(".worker-mini, .worker-card")),Ue=Te.length;if(Re){let pt=Te.indexOf(Re);pt>=0&&(Ue=pt)}if(Ue=Math.max(0,Ue-_.querySelectorAll(".worker-mini--ghost").length),_.classList.contains("worker-pane--collapsed")&&(Ue=Ne()),g==="candidate"){if(fe==="candidate"){Ie(O,Re);return}(fe==="queue"||/^s[1-5]$/.test(fe))&&ot(O);return}if(g==="queue"||/^s[1-5]$/.test(g)){let pt=g==="queue"?"parallel":g;fe===g?ct(O,pt,Ue):Qe(O,pt)}}function xt(l){K=l,Rb(l),ze()}function yt(l){D=l==="board"||l==="created"||l==="spec"?l:ra,Pb(D),ze()}function v(l){H=dn(l)?l:sn,Nb(H),b?.(H),ze()}function y(l){let _=l.target?.closest?.(".worker-serial-lane-count");if(_){let Ue=Number.parseInt(_.value,10);Number.isFinite(Ue)&&F(Ue).then(ze);return}let g=l.target?.closest?.(".worker-filter__blocked");if(g){xt({...K,show_blocked:g.checked});return}let O=l.target?.closest?.(".worker-done-range");if(O){v(O.value);return}let fe=l.target?.closest?.(".worker-sort");if(fe){yt(fe.value||ra);return}let Re=l.target?.closest?.(".worker-slots__input");if(!Re)return;let Te=Number.parseInt(Re.value,10);if(!Number.isFinite(Te)){ze();return}A(Te).then(ze)}function k(l){return l?{runner:l.runner||void 0,model:l.model||void 0,effort:l.effort||void 0,worktree:l.worktree||void 0,status:l.status||void 0,session_id:l.session_id||void 0}:{}}function M(){let l=rt();return{operations:l.repo_operations,cleanup_failures:l.cleanup_failures,repo:d&&d()||""}}function Z(){Ae&&De.close(),ue.hidden=!1,Ze.hidden=!1,z.open(M()),ze()}function me(l){let _=be(),g=_.attempts?_.attempts[l]:null;Ae=l,je=null,z.close(),ue.hidden=!0,Ze.hidden=!1,De.open({attempt_id:l,meta:k(g)}),ze()}function Le(l,_){Ae=null,je=l,z.close(),ue.hidden=!0,Ze.hidden=!1,De.open({attempt_id:l,meta:_,hide_prompt:!0}),ze()}function Xe(){if(z.isOpen()&&z.refresh(M()),je){let g=(o?.get()?.runs||[]).find(O=>O.run_id===je);g?De.updateMeta(Ni(g)):De.close();return}if(!Ae)return;let l=be(),_=l.attempts?l.attempts[Ae]:null;if(_){De.updateMeta(k(_));return}De.close()}function $(l){let _=l.target;if(_?.closest?.(".worker-mini__serial, .worker-mini__grip")||_?.closest?.("#worker-parallel-analysis-dialog"))return;let g=_?.closest?.(".mon-overlap__chip");if(g){let Fe=g.closest("[data-bead-id]"),ft=Fe&&Fe.getAttribute("data-bead-id")||"";if(ft){let Qt=g.getAttribute("data-overlap-all")==="true"?null:g.getAttribute("data-overlap-id")||"";I=!!I&&I.bead_id===ft&&I.counterpart_id===Qt?null:{bead_id:ft,counterpart_id:Qt},ze()}return}let O=_?.closest?.(".mon-overlap__place");if(O){let Fe=O.closest("[data-bead-id]"),ft=Fe&&Fe.getAttribute("data-bead-id")||"";ft&&Ee(ft,O.getAttribute("data-counterpart-id")||"");return}if(_?.closest?.(".mon-overlap__popover"))return;if(_?.closest?.(".worker-analysis-btn")){Ge?.open();return}if(_?.closest?.(".worker-repo-strip")||_?.closest?.(".worker-mini__timeline")){Z();return}let fe=_?.closest?.(".worker-repo-op__session");if(fe){let Fe=fe.dataset.attemptId;Fe&&me(Fe);return}let Re=_?.closest?.(".worker-repo-op__resolve");if(Re){E(Re.dataset.operationId||"");return}let Te=_?.closest?.(".worker-repo-op__dismiss");if(Te){h(Te.dataset.operationId||"");return}let Ue=_?.closest?.(".worker-cleanup__resume");if(Ue){let Fe=Ue.dataset.beadId;Fe&&wt(Fe);return}let pt=_?.closest?.(".worker-banner__resume");if(pt){let Fe=pt.dataset.attemptId;Fe&&ht(Fe);return}let Ut=_?.closest?.(".worker-banner__discard");if(Ut){let Fe=Ut.dataset.confirmation==="merged"?"merged":"unmerged";nt(Ut.dataset.beadId||"",Ut.dataset.attemptId||null,Fe,Ut.dataset.operationId||null);return}let rn=_?.closest?.(".worker-banner__dismiss");if(rn){let Fe=rn.dataset.attemptId;Fe&&bt(Fe);return}if(_?.closest?.(".worker-play")){qe(!be().auto_advance);return}let Fn=_?.closest?.(".worker-merge-all");if(Fn){Fn.classList.contains("worker-merge-all--stop")?be().auto_merge===!0?ge(!1):kt():ge(!0);return}let Gr=_?.closest?.(".worker-pane__hd--toggle");if(Gr){let Fe=Gr.dataset.lane;(Fe==="queue"||Fe==="done")&&It(Fe);return}let _r=_?.closest?.(".worker-card__place-lane");if(_r){let Fe=_r.dataset.beadId,ft=_r.dataset.lane;Fe&&(ft==="parallel"||/^s[1-5]$/.test(ft||""))&&(ee=null,ze(),Qe(Fe,ft));return}if(_?.closest?.(".worker-card__place-cancel")){ee=null,ze();return}let Zt=_?.closest?.(".worker-card__place");if(Zt){let Fe=Zt.dataset.beadId;Fe&&!Zt.disabled&&(L()?(ee=Fe,ze()):Qe(Fe,"parallel"));return}let Vr=_?.closest?.(".worker-filter__chip");if(Vr){let Fe=Vr.dataset.spec;(Fe==="all"||Fe==="with"||Fe==="without")&&xt({...K,spec:Fe});return}let Os=_?.closest?.(".worker-mini__merge");if(Os){let Fe=Os.dataset.beadId||"";be().cleanup_failed?.[Fe]?wt(Fe):Tt(Fe);return}let Is=_?.closest?.(".worker-mini__merge-cancel");if(Is){gt(Is.dataset.beadId||"");return}let xn=_?.closest?.(".worker-mini__discard");if(xn){nt(xn.dataset.beadId||"",xn.dataset.attemptId||null,xn.dataset.discardMode==="merged"?"merged":"unmerged",xn.dataset.operationId||null);return}let jn=_?.closest?.(".worker-mini__stale-continue");if(jn){Q("worker-stale-work-continue",jn.dataset.beadId||"",jn.dataset.actionId||"");return}let mr=_?.closest?.(".worker-mini__stale-backup");if(mr){Q("worker-stale-work-backup-fresh",mr.dataset.beadId||"",mr.dataset.actionId||"");return}let gr=_?.closest?.(".worker-mini__stale-recheck");if(gr){Q("worker-stale-work-recheck",gr.dataset.beadId||"",gr.dataset.actionId||"");return}let Ls=_?.closest?.(".worker-mini__revise-fix");if(Ls){le("worker-revise-fix",Ls.dataset.beadId||"");return}let hr=_?.closest?.(".worker-mini__revise-approve");if(hr){le("worker-revise-approve",hr.dataset.beadId||"");return}if(_?.closest?.(".worker-mini__pr"))return;if(_?.closest?.(".rtile__discard")){let Fe=_?.closest?.(".rtile"),ft=Fe?.dataset?.beadId,Qt=Fe?.dataset?.attemptId;ft&&nt(ft,Qt||null,"unmerged",_?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(_?.closest?.(".rtile__dismiss")){let ft=_?.closest?.(".rtile")?.dataset?.attemptId;ft&&bt(ft);return}if(_?.closest?.(".rtile__pause")){let ft=_?.closest?.(".rtile")?.dataset?.attemptId;ft&&ut(ft);return}if(_?.closest?.(".rtile__resume")){let ft=_?.closest?.(".rtile")?.dataset?.attemptId;ft&&ht(ft);return}if(_?.closest?.(".rtile__session")){let ft=_?.closest?.(".rtile")?.dataset?.attemptId;ft&&me(ft);return}if(_?.closest?.(".worker-drawer-overlay__backdrop")){z.close(),De.close();return}if(_?.closest?.(".worker-drawer-host"))return;let Xn=_?.closest?.(".rtile .board-card__roll-toggle");if(Xn){let Fe=Xn.dataset.rollParent;Fe&&(Oe.has(Fe)?Oe.delete(Fe):Oe.add(Fe),ze());return}let Jn=_?.closest?.(".rtile .board-card__roll-child");if(Jn){let Fe=Jn.dataset.childId;Fe&&c&&c(Fe);return}let br=_?.closest?.(".rtile");if(br){if(_?.closest?.(".rtile__id")){let ft=br.dataset.beadId;ft&&an(ft).then(Qt=>{Qt?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Fe=br.dataset.beadId;Fe&&c&&c(Fe);return}let Ms=_?.closest?.(".worker-mini, .worker-card");if(Ms){let Fe=Ms.dataset.beadId;if(_?.closest?.(".worker-mini__id, .worker-card__id")){Fe&&an(Fe).then(Qt=>{Qt?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ft=_?.closest?.(".ctl-chip--from");if(ft){let Qt=ft.dataset.fromId;Qt&&c&&c(Qt);return}Fe&&c&&c(Fe)}}e.addEventListener("pointerdown",et),e.addEventListener("dragstart",Me),e.addEventListener("dragover",C),e.addEventListener("dragleave",pe),e.addEventListener("drop",at),e.addEventListener("click",$),e.addEventListener("change",y);function T(l){if(!I)return;let _=l.target;_&&typeof _.closest=="function"&&_.closest(".mon-overlap__popover, .mon-overlap__chip")||(I=null,ze())}function ce(l){l.key!=="Escape"||!I||(I=null,ze())}return document.addEventListener("click",T),document.addEventListener("keydown",ce),X.push(()=>{document.removeEventListener("click",T),document.removeEventListener("keydown",ce)}),nn(),w&&X.push(w.subscribe(()=>{for(let[l,_]of S)_==="failed"&&S.delete(l);ze()})),s&&X.push(s.subscribe(()=>{let l=d&&d()||"";l!==Pe&&(Pe=l,V.close()),ze(),Xe()})),o&&typeof o.subscribe=="function"&&X.push(o.subscribe(()=>{Xe(),ze()})),ze(),{load(){Se(),ze()},refreshSessionDefaults:he,destroy(){for(let l of X.splice(0))try{l()}catch{}e.removeEventListener("pointerdown",et),e.removeEventListener("dragstart",Me),e.removeEventListener("dragover",C),e.removeEventListener("dragleave",pe),e.removeEventListener("drop",at),e.removeEventListener("click",$),e.removeEventListener("change",y);try{De.destroy()}catch{}Ze.hidden=!0;try{Ge?.destroy()}catch{}try{V.destroy()}catch{}Ve(u``,e)}}}function Ui(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Dp(e,t,n,r=async()=>{},s=async()=>{}){let o=Ct("views:workspace-picker"),a=null,i=!1,c=!1,d=!1;async function p(H){let U=H.target.value,ye=t.getState().workspace?.current?.path||"";if(U&&U!==ye){o("switching workspace to %s",U),i=!0,D();try{await n(U)}catch($e){o("workspace switch failed: %o",$e)}finally{i=!1,D()}}}async function f(){let H=t.getState(),S=H.workspace?.current?.path||H.workspace?.available?.[0]?.path||"";if(!(!S||c)){o("git-pulling workspace %s",S),c=!0,D();try{await r(S)}catch(U){o("workspace git pull failed: %o",U)}finally{c=!1,D()}}}function b(H){let S=H.target;S&&e.contains(S)||N()}function w(H){H.key==="Escape"&&N()}function x(){d||(d=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",w),D())}function N(){d&&(d=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",w),D())}function j(){d?N():x()}async function K(H){let S=H.target,U=S.value,B=S.checked;o("toggling visibility %s \u2192 %s",U,String(B));try{await s(U,B)}catch(ye){o("workspace visibility toggle failed: %o",ye)}}function ee(H){return H?u`
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
    `:u``}function I(H,S){return u`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${j}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?u`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${H.map(U=>u`
                    <label
                      class="workspace-picker__manage-row"
                      title="${U.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${U.path}"
                        .checked=${!S.has(U.path)}
                        @change=${K}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Ui(U.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function P(){let H=t.getState(),S=H.workspace?.current,U=H.workspace?.available||[],B=new Set(H.workspace?.hidden||[]),ye=S?.path||U[0]?.path||"";if(U.length===0)return u``;let $e=U.filter(te=>!B.has(te.path)||te.path===ye);if($e.length<=1){let te=$e[0]||U[0],Y=Ui(te.path);return u`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${te.path}"
            >${Y}</span
          >
          ${I(U,B)}
          ${ee(ye)}
          ${c?u`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return u`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${i||c}
          aria-label="Select project workspace"
        >
          ${$e.map(te=>u`
              <option
                value="${te.path}"
                ?selected=${te.path===ye}
                title="${te.path}"
              >
                ${Ui(te.path)}
              </option>
            `)}
        </select>
        ${I(U,B)}
        ${ee(ye)}
        ${i||c?u`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){Ve(P(),e)}return D(),a=t.subscribe(()=>D()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",w),Ve(u``,e)}}}var Np=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Wi(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function qp(e,t,n=Wi()){return{id:n,type:e,payload:t}}function Fp(e={}){let t=Ct("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,d=new Map,p=[],f=new Map,b=new Set;function w(P){for(let D of Array.from(b))try{D(P)}catch{}}function x(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),w(o);let P=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),D=(n.jitterRatio||0)*P,H=Math.max(0,Math.round(P+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",H,a+1),i=setTimeout(()=>{i=null,I()},H)}function N(P){try{s?.send(JSON.stringify(P))}catch(D){t("ws send failed",D)}}function j(){for(o="open",t("ws open"),w(o),a=0;p.length;){let P=p.shift();P&&N(P)}}function K(P){let D;try{D=JSON.parse(String(P.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(d.has(D.id)){let S=d.get(D.id);d.delete(D.id),D.ok?S?.resolve(D.payload):S?.reject(D.error||new Error("ws error"));return}let H=f.get(D.type);if(H&&H.size>0)for(let S of Array.from(H))try{S(D.payload)}catch(U){t("ws event handler error",U)}else t("ws received unhandled message type: %s",D.type)}function ee(){o="closed",t("ws closed"),w(o);for(let[P,D]of d.entries())D.reject(new Error("ws disconnected")),d.delete(P);a+=1,x()}function I(){if(!c)return;let P=r();try{s=new WebSocket(P),t("ws connecting %s",P),o="connecting",w(o),s.addEventListener("open",j),s.addEventListener("message",K),s.addEventListener("error",()=>{}),s.addEventListener("close",ee)}catch(D){t("ws connect failed %o",D),x()}}return I(),{send(P,D){if(!Np.includes(P))return Promise.reject(new Error(`unknown message type: ${P}`));let H=Wi(),S=qp(P,D,H);return t("send %s id=%s",P,H),new Promise((U,B)=>{d.set(H,{resolve:U,reject:B,type:P}),s&&s.readyState===s.OPEN?N(S):(t("queue %s id=%s (state=%s)",P,H,o),p.push(S))})},on(P,D){f.has(P)||f.set(P,new Set);let H=f.get(P);return H?.add(D),()=>{H?.delete(D)}},onConnection(P){return b.add(P),()=>{b.delete(P)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,I()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function ny(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function ry(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var zi=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],jp=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Zn="tab:worker:closed",sy="bdui.worker.done-range",Bp=Wd,Up="worker:queue",Wp="worker:parallel-analysis",zp="ui:order",Hp="ui:display-policy",Gp="exec:presets",Qn="tab:board:closed",Vp="beads-ui.board.closed-range";function oy(e){let t=Ct("main");t("bootstrap start");let n=u`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ve(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),c=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),p=document.getElementById("detail-panel");if(a&&cp(a),i&&c&&d&&p){let _e=function($,T){let ce="Request failed",l="";if($&&typeof $=="object"){let g=$;if(typeof g.message=="string"&&g.message.length>0&&(ce=g.message),typeof g.details=="string")l=g.details;else if(g.details&&typeof g.details=="object")try{l=JSON.stringify(g.details,null,2)}catch{l=""}}else typeof $=="string"&&$.length>0&&(ce=$);let _=T&&T.length>0?`Failed to load ${T}`:"Request failed";X.open(_,ce,l)},J=function($){return`${et.getState().workspace.current?.path||""}\0${$}`},re=function(){De&&(De().catch(()=>{}),De=null),z=null,V=null},Ne=function($){Pe=$;let T=()=>{Pe!==$||et.getState().selected_id!==$||(Pe=null,G($))};if(!be){Ge.then(T);return}T()},ut=function($,T,ce,l,_){return ce!==ot[T]?(_().catch(()=>{}),!1):($.set(l,_),!0)},bt=function(){let $=et.getState();ge($.view==="board"),qe($.view==="worker"),oe($.view==="monitor"),h($.view==="board"||$.view==="worker"||ht||!!$.selected_id)},wt=function(){let $=or(tt);return $===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:$}}},He=function(){let $=or(Tt);return $===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:$}}},ge=function($){if($)for(let[T,ce]of zi){if(Qe.has(T)||ct.has(T))continue;let l=T===Qn?wt():{type:ce};try{we.register(T,l)}catch(O){t("register %s store failed: %o",T,O)}ct.add(T);let _=ot.board,g=!1;Be.subscribeList(T,l).then(O=>{g=!ut(Qe,"board",_,T,O)}).catch(O=>{t("subscribe %s failed: %o",T,O),_e(O,"board")}).finally(()=>{ct.delete(T),g&&bt()})}else nt()},nt=function(){ot.board+=1;for(let[$]of zi){let T=Qe.get($);T&&(T().catch(()=>{}),Qe.delete($));try{we.unregister($)}catch(ce){t("unregister %s failed: %o",$,ce)}}},qe=function($){if(!$){E();return}for(let[T,ce]of jp){if(Q.has(T)||ct.has(T))continue;let l=T===Zn?He():{type:ce};try{we.register(T,l)}catch(O){t("register %s store failed: %o",T,O)}ct.add(T);let _=ot.worker,g=!1;Be.subscribeList(T,l).then(O=>{g=!ut(Q,"worker",_,T,O)}).catch(O=>{t("subscribe %s failed: %o",T,O),_e(O,"worker")}).finally(()=>{ct.delete(T),g&&bt()})}},E=function(){ot.worker+=1;for(let[$]of jp){let T=Q.get($);T&&(T().catch(()=>{}),Q.delete($));try{we.unregister($)}catch(ce){t("unregister %s failed: %o",$,ce)}}},h=function($){if(!$){A();return}le||(he("subscribe-worker-queue",{id:Up}).catch(T=>{t("subscribe-worker-queue failed: %o",T)}),he("subscribe-worker-parallel-analysis",{id:Wp}).catch(T=>{t("subscribe-worker-parallel-analysis failed: %o",T)}),le=()=>(he("unsubscribe-worker-parallel-analysis",{id:Wp}),he("unsubscribe-worker-queue",{id:Up})))},A=function(){le&&(le().catch(()=>{}),le=null),lt.clear()},oe=function($){if(!$){ae();return}F||(he("subscribe-monitor-pipeline",{id:Bp}).catch(T=>{t("subscribe-monitor-pipeline failed: %o",T)}),F=()=>he("unsubscribe-monitor-pipeline",{id:Bp}))},ae=function(){F&&(F().catch(()=>{}),F=null)},Ee=function(){ve||(he("subscribe-ui-order",{id:zp}).catch($=>{t("subscribe-ui-order failed: %o",$)}),ve=()=>he("unsubscribe-ui-order",{id:zp}))},Je=function(){ve&&(ve().catch(()=>{}),ve=null),ue.clear()},Ye=function(){rt||(he("subscribe-display-policy",{id:Hp}).catch($=>{t("subscribe-display-policy failed: %o",$)}),rt=()=>he("unsubscribe-display-policy",{id:Hp}))},dt=function(){rt&&(rt().catch(()=>{}),rt=null),ke.clear()},_t=function(){Rt||(he("subscribe-impl-presets",{id:Gp}).catch($=>{t("subscribe-impl-presets failed: %o",$)}),Rt=()=>he("unsubscribe-impl-presets",{id:Gp}))},It=function($){if(!$)return"Unknown";let T=$.split("/").filter(Boolean);return T.length>0?T[T.length-1]:"Unknown"},y=function($,T){v.open($.path,{missing_state:$.missing_state,...T?{workspace:T}:{}})};var f=_e,b=J,w=re,x=Ne,N=ut,j=bt,K=wt,ee=He,I=ge,P=nt,D=qe,H=E,S=h,U=A,B=oe,ye=ae,$e=Ee,te=Je,Y=Ye,xe=dt,Oe=_t,ne=It,ie=y;let Ce=document.getElementById("header-loading"),W=cc(Ce),X=Zu(e),Se=Fp(),he=W.wrapSend(($,T)=>Se.send($,T)),Be=tc(he),we=nc(),Ze=oc(),lt=sc(),R=jl(),ue=rc(),ke=ql(),Ae=Fl(),je=Bl();Se.on("impl-presets-snapshot",$=>{let T=$;T&&typeof T.revision=="number"&&Array.isArray(T.presets)&&Ae.set({revision:T.revision,presets:T.presets})}),Se.on("monitor-pipeline-snapshot",$=>{let T=$;if(!(!T||!Array.isArray(T.workspaces)))try{R.set(T.workspaces,T.workspaces_state)}catch{}}),Se.on("ui-order-snapshot",$=>{let T=$;if(T&&typeof T.revision=="number")try{ue.set({revision:T.revision,order:T.order&&typeof T.order=="object"?T.order:{}})}catch{}}),Se.on("display-policy-snapshot",$=>{let T=$;if(T&&T.policy&&typeof T.policy=="object")try{ke.set(T.policy)}catch{}}),Se.on("session-log-snapshot",$=>{let T=$;if(T&&typeof T.id=="string")try{je.set(T.id,Array.isArray(T.lines)?T.lines:[],typeof T.last_event_at=="number"?T.last_event_at:null)}catch{}}),Se.on("session-log-append",$=>{let T=$;if(T&&typeof T.id=="string")try{je.append(T.id,T.event)}catch{}}),Se.on("snapshot",$=>{let T=$,ce=T&&typeof T.id=="string"?T.id:"",l=ce?we.getStore(ce):null;if(l&&T&&T.type==="snapshot")try{l.applyPush(T)}catch{}}),Se.on("upsert",$=>{let T=$,ce=T&&typeof T.id=="string"?T.id:"",l=ce?we.getStore(ce):null;if(l&&T&&T.type==="upsert")try{l.applyPush(T)}catch{}}),Se.on("delete",$=>{let T=$,ce=T&&typeof T.id=="string"?T.id:"",l=ce?we.getStore(ce):null;if(l&&T&&T.type==="delete")try{l.applyPush(T)}catch{}});let De=null,z=null,V=null,Pe=null,Ke=()=>{},Ge=new Promise($=>{Ke=()=>$(void 0)}),be=!1,L=!1;async function G($){let T=J($);if(T===z||T===V)return;V=T;let ce=`detail:${$}`,l={type:"issue-detail",params:{id:$}};try{we.register(ce,l)}catch(_){t("register detail store failed: %o",_)}try{let _=await Be.subscribeList(ce,l);if(et.getState().selected_id!==$||J($)!==T){await _().catch(()=>{});return}De&&await De().catch(()=>{}),De=_,z=T}catch(_){t("detail subscribe failed: %o",_),_e(_,"issue details")}finally{V===T&&(V=null)}}let Qe=new Map,ct=new Set,ot={board:0,worker:0},ht=!1,tt=sn;try{let $=window.localStorage.getItem(Vp);dn($)&&(tt=$)}catch{}let Tt=sn;try{let $=window.localStorage.getItem(sy);dn($)&&(Tt=$)}catch{}async function gt($){if(!dn($)||$===tt)return;tt=$;try{window.localStorage.setItem(Vp,$)}catch{}let T=Qe.get(Qn);if(!T)return;Qe.delete(Qn),await T().catch(()=>{});let ce=wt();try{we.register(Qn,ce)}catch(l){t("register %s store failed: %o",Qn,l)}try{let l=await Be.subscribeList(Qn,ce);Qe.set(Qn,l)}catch(l){t("re-subscribe %s failed: %o",Qn,l),_e(l,"board")}}async function kt($){if(!dn($)||$===Tt)return;Tt=$;let T=Q.get(Zn);if(!T)return;Q.delete(Zn),await T().catch(()=>{});let ce=He();try{we.register(Zn,ce)}catch(l){t("register %s store failed: %o",Zn,l)}try{let l=await Be.subscribeList(Zn,ce);Q.set(Zn,l)}catch(l){t("re-subscribe %s failed: %o",Zn,l),_e(l,"worker")}}let Q=new Map,le=null,F=null,ve=null,rt=null,Rt=null;async function tn(){rt=null,ke.clear(),Rt=null,Ae.clear(),le=null,F=null,Qe.clear(),Q.clear(),ot.board+=1,ot.worker+=1,_t();let $=et.getState().workspace.current?.path;if($)try{await Se.send("set-workspace",{path:$})}catch(ce){t("workspace restore after reconnect failed: %o",ce);return}Ye();let T=et.getState();ge(T.view==="board"),qe(T.view==="worker"),oe(T.view==="monitor"),h(T.view==="board"||T.view==="worker"||!!T.selected_id)}async function jt(){t("clearing all subscriptions for workspace switch"),nt(),E(),A(),Ze.clear(),Je(),Ee(),dt(),Ye(),re();let $=et.getState();if($.selected_id)try{we.unregister(`detail:${$.selected_id}`)}catch{}let T=et.getState();ge(T.view==="board"),qe(T.view==="worker"),oe(T.view==="monitor"),h(T.view==="board"||T.view==="worker"||!!T.selected_id),T.selected_id&&Ne(T.selected_id)}async function Mt($){t("requesting workspace switch to %s",$),L=!0;try{let T=await Se.send("set-workspace",{path:$});t("workspace switch result: %o",T),T&&T.workspace&&(et.setState({workspace:{current:{path:T.workspace.root_dir,database:T.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",$),T.changed&&(await jt(),de("Switched to "+It($),"success",2e3)))}catch(T){throw t("workspace switch failed: %o",T),de("Failed to switch workspace","error",3e3),T}finally{L=!1}}async function Bt($){t("requesting workspace git pull for %s",$);try{let T=await Se.send("git-pull-workspace",{});t("workspace git pull result: %o",T);let ce=T?.status;if(ce==="up_to_date"){de("Already up to date","success",2e3);return}if(ce==="stash_pop_conflict"){de("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}de("Git pulled "+It($),"success",2e3)}catch(T){t("workspace git pull failed: %o",T);let ce=T?.code,l=T?.message;if(ce==="rebase_conflict"){de("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(ce==="rebase_conflict_abort_failed"){de("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(ce==="busy"){de("Git pull skipped: another operation is running","warning",3e3);return}let _=l?`: ${l}`:"";throw de(`Git pull failed${_}`,"error",3e3),T}}async function Pt($,T){t("setting workspace visibility %s \u2192 %s",$,String(T));try{await Se.send("set-workspace-visibility",{path:$,visible:T}),await ze()}catch(ce){t("workspace visibility update failed: %o",ce),de("Failed to update project visibility","error",3e3)}}async function ze(){try{let $=await Se.send("list-workspaces",{});if(t("workspaces loaded: %o",$),$&&Array.isArray($.workspaces)){let T=$.workspaces.map(g=>({path:g.path,database:g.database,pid:g.pid,version:g.version})),ce=$.current?{path:$.current.root_dir,database:$.current.db_path}:null,l=Array.isArray($.hidden)?$.hidden.filter(g=>typeof g=="string"):[];et.setState({workspace:{current:ce,available:T,hidden:l}});let _=window.localStorage.getItem("beads-ui.workspace");_&&(!T.some(O=>O.path===_)||l.includes(_)?window.localStorage.removeItem("beads-ui.workspace"):ce&&_!==ce.path&&(t("restoring saved workspace preference: %s",_),await Mt(_)))}}catch($){t("failed to load workspaces: %o",$)}}Se.on("workspace-changed",$=>{t("workspace-changed event: %o",$),$&&$.root_dir&&(et.setState({workspace:{current:{path:$.root_dir,database:$.db_path}}}),ze(),jt())});let nn=!1;if(typeof Se.onConnection=="function"){let $=T=>{t("ws state %s",T),T==="reconnecting"||T==="closed"?(nn=!0,de("Connection lost. Reconnecting\u2026","error",4e3)):T==="open"&&nn&&(nn=!1,de("Reconnected","success",2200),ry(et,(ce,l)=>{t(`${ce}: %o`,l)}),tn())};Se.onConnection($)}let Ht="board";try{let $=window.localStorage.getItem("beads-ui.view");($==="board"||$==="worker"||$==="monitor")&&(Ht=$)}catch($){t("view parse error: %o",$)}let et=lc({config:ny(),view:Ht});Se.on("worker-queue-snapshot",$=>{let T=$;if(!T||!T.queue)return;let ce=et.getState().workspace.current?.path;if(typeof ce=="string"&&ce.length>0&&T.root_dir!==ce){t("dropping worker-queue snapshot for %s",String(T.root_dir));return}try{Ze.set(T.queue)}catch{}}),Se.on("worker-parallel-analysis-snapshot",$=>{let T=$;if(!T)return;let ce=et.getState().workspace.current?.path;if(!(typeof ce=="string"&&ce.length>0&&typeof T.root_dir=="string"&&T.root_dir!==ce))try{lt.set({settings:T.settings,job:T.job??null,runs:Array.isArray(T.runs)?T.runs:[],last_good:T.last_good??null})}catch{}});let Me=ac(et);Me.start();let C=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),pe=async($,T)=>{try{return await he($,T)}catch(ce){if(C.has($))throw ce;return[]}};Hd({global_element:r,repo_element:s},et,Me);let Ie=document.getElementById("workspace-picker");Ie&&Dp(Ie,et,Mt,Bt,Pt);let at=Yd(e,($,T)=>he($,T));try{let $=document.getElementById("new-issue-btn");$&&$.addEventListener("click",()=>at.open())}catch{}let xt=Jd(e,{policyStore:ke,queueStore:Ze,implPresetStore:Ae,transport:($,T)=>he($,T),onOpenChange:$=>{let T=ht;ht=$,bt(),T&&$===!1&&M.refreshSessionDefaults()},labelOptions:()=>{let $=new Set;for(let[T]of zi)for(let ce of we.snapshotFor(T)||[]){let l=ce.labels;if(Array.isArray(l))for(let _ of l)typeof _=="string"&&_.length>0&&$.add(_)}return Array.from($).sort()}});try{let $=document.getElementById("display-settings-btn");$&&($.setAttribute("aria-label","\uC124\uC815"),$.setAttribute("title","\uC124\uC815"),$.addEventListener("click",()=>xt.open()))}catch{}let yt=document.createElement("div");yt.className="md-viewer-root",document.body.appendChild(yt);let v=No(yt,{getWorkspacePath:()=>et.getState().workspace.current?.path}),k=kc(i,{gotoIssue:$=>Me.gotoIssue($),issueStores:we,transport:pe,workerQueueStore:Ze,uiOrderStore:ue,displayPolicyStore:ke,closedRange:tt,onClosedRangeChange:$=>{gt($)},onNewIssue:()=>at.open(),openDoc:y}),M=Bi(c,{transport:pe,issueStores:we,queueStore:Ze,analysisStore:lt,sessionLogStore:je,uiOrderStore:ue,gotoIssue:$=>et.setState({selected_id:$}),getWorkspacePath:()=>et.getState().workspace.current?.path,openDoc:y,doneRange:Tt,onDoneRangeChange:$=>{kt($)}}),Z=zd(d,{transport:pe,pipelineStore:R,execPresetStore:Ae,sessionLogStore:je,router:Me,gotoIssue:$=>Me.gotoIssue($),getWorkspacePath:()=>et.getState().workspace.current?.path,switchWorkspace:$=>Mt($),openDoc:y}),me=Yu(p,{issueStores:we,transport:pe,queueStore:Ze,execPresetStore:Ae,sessionLogStore:je,getWorkspacePath:()=>et.getState().workspace.current?.path,mdViewer:v,onNavigate:$=>{et.getState().view==="worker"?et.setState({selected_id:$}):Me.gotoIssue($)},onClose:()=>{let $=et.getState();et.setState({selected_id:null});try{Me.gotoView($.view==="worker"||$.view==="monitor"?$.view:"board")}catch{}},onOpenExecPresets:()=>{xt.open("execution")}}),Le=et.getState().selected_id;Le&&(p.hidden=!1,me.load(Le),Ne(Le)),et.subscribe($=>{let T=$.selected_id;T?(p.hidden=!1,me.load(T),L||Ne(T)):(me.clear(),p.hidden=!0,re())});let Xe=$=>{i.hidden=$.view!=="board",c.hidden=$.view!=="worker",d.hidden=$.view!=="monitor",o&&o.classList.toggle("is-quiet",$.view==="monitor"),ge($.view==="board"),qe($.view==="worker"),oe($.view==="monitor"),h($.view==="board"||$.view==="worker"||ht||!!$.selected_id),!$.selected_id&&$.view==="board"&&k.load(),$.view==="worker"&&M.load(),$.view==="monitor"?Z.load():Z.pause(),window.localStorage.setItem("beads-ui.view",$.view)};et.subscribe(Xe),Xe(et.getState()),Ee(),Ye(),_t(),ze().finally(()=>{be=!0,Ke()}),window.addEventListener("keydown",$=>{let T=$.ctrlKey||$.metaKey,ce=String($.key||"").toLowerCase(),l=$.target,_=l&&l.tagName?String(l.tagName).toLowerCase():"",g=_==="input"||_==="textarea"||_==="select"||l&&typeof l.isContentEditable=="boolean"&&l.isContentEditable;T&&ce==="n"&&(g||($.preventDefault(),at.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&oy(t)});export{oy as bootstrap,ny as readBootstrapConfig,ry as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
