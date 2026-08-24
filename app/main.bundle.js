var lf=Object.create;var ga=Object.defineProperty;var cf=Object.getOwnPropertyDescriptor;var uf=Object.getOwnPropertyNames;var df=Object.getPrototypeOf,pf=Object.prototype.hasOwnProperty;var ff=(e,t,n)=>t in e?ga(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ha=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var _f=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of uf(t))!pf.call(e,s)&&s!==n&&ga(e,s,{get:()=>t[s],enumerable:!(r=cf(t,s))||r.enumerable});return e};var mf=(e,t,n)=>(n=e!=null?lf(df(e)):{},_f(t||!e||!e.__esModule?ga(n,"default",{value:e,enumerable:!0}):n,e));var kt=(e,t,n)=>ff(e,typeof t!="symbol"?t+"":t,n);var Bl=ha((cy,jl)=>{var Ar=1e3,Sr=Ar*60,Er=Sr*60,ar=Er*24,bf=ar*7,yf=ar*365.25;jl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return vf(e);if(n==="number"&&isFinite(e))return t.long?kf(e):wf(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function vf(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*yf;case"weeks":case"week":case"w":return n*bf;case"days":case"day":case"d":return n*ar;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Er;case"minutes":case"minute":case"mins":case"min":case"m":return n*Sr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Ar;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function wf(e){var t=Math.abs(e);return t>=ar?Math.round(e/ar)+"d":t>=Er?Math.round(e/Er)+"h":t>=Sr?Math.round(e/Sr)+"m":t>=Ar?Math.round(e/Ar)+"s":e+"ms"}function kf(e){var t=Math.abs(e);return t>=ar?Ks(e,t,ar,"day"):t>=Er?Ks(e,t,Er,"hour"):t>=Sr?Ks(e,t,Sr,"minute"):t>=Ar?Ks(e,t,Ar,"second"):e+" ms"}function Ks(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Wl=ha((uy,Ul)=>{function $f(e){n.debug=n,n.default=n,n.coerce=u,n.disable=a,n.enable=s,n.enabled=i,n.humanize=Bl(),n.destroy=d,Object.keys(e).forEach(p=>{n[p]=e[p]}),n.names=[],n.skips=[],n.formatters={};function t(p){let f=0;for(let h=0;h<p.length;h++)f=(f<<5)-f+p.charCodeAt(h),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(p){let f,h=null,w,x;function N(...j){if(!N.enabled)return;let K=N,te=Number(new Date),L=te-(f||te);K.diff=L,K.prev=f,K.curr=te,f=te,j[0]=n.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let M=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(z,A)=>{if(z==="%%")return"%";M++;let U=n.formatters[A];if(typeof U=="function"){let F=j[M];z=U.call(K,F),j.splice(M,1),M--}return z}),n.formatArgs.call(K,j),(K.log||n.log).apply(K,j)}return N.namespace=p,N.useColors=n.useColors(),N.color=n.selectColor(p),N.extend=r,N.destroy=n.destroy,Object.defineProperty(N,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(w!==n.namespaces&&(w=n.namespaces,x=n.enabled(p)),x),set:j=>{h=j}}),typeof n.init=="function"&&n.init(N),N}function r(p,f){let h=n(this.namespace+(typeof f>"u"?":":f)+p);return h.log=this.log,h}function s(p){n.save(p),n.namespaces=p,n.names=[],n.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of f)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function o(p,f){let h=0,w=0,x=-1,N=0;for(;h<p.length;)if(w<f.length&&(f[w]===p[h]||f[w]==="*"))f[w]==="*"?(x=w,N=h,w++):(h++,w++);else if(x!==-1)w=x+1,N++,h=N;else return!1;for(;w<f.length&&f[w]==="*";)w++;return w===f.length}function a(){let p=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),p}function i(p){for(let f of n.skips)if(o(p,f))return!1;for(let f of n.names)if(o(p,f))return!0;return!1}function u(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Ul.exports=$f});var zl=ha((Xt,Ys)=>{Xt.formatArgs=Af;Xt.save=Sf;Xt.load=Ef;Xt.useColors=xf;Xt.storage=Tf();Xt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Xt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function xf(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Af(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ys.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}Xt.log=console.debug||console.log||(()=>{});function Sf(e){try{e?Xt.storage.setItem("debug",e):Xt.storage.removeItem("debug")}catch{}}function Ef(){let e;try{e=Xt.storage.getItem("debug")||Xt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Tf(){try{return localStorage}catch{}}Ys.exports=Wl()(Xt);var{formatters:Cf}=Ys.exports;Cf.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Yr=globalThis,Us=Yr.trustedTypes,Al=Us?Us.createPolicy("lit-html",{createHTML:e=>e}):void 0,ya="$lit$",Tn=`lit$${Math.random().toFixed(9).slice(2)}$`,va="?"+Tn,gf=`<${va}>`,nr=document,Zr=()=>nr.createComment(""),Qr=e=>e===null||typeof e!="object"&&typeof e!="function",wa=Array.isArray,Ol=e=>wa(e)||typeof e?.[Symbol.iterator]=="function",ba=`[ 	
\f\r]`,Kr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Sl=/-->/g,El=/>/g,er=RegExp(`>|${ba}(?:([^\\s"'>=/]+)(${ba}*=${ba}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Tl=/'/g,Cl=/"/g,Ll=/^(?:script|style|textarea|title)$/i,ka=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=ka(1),xr=ka(2),ny=ka(3),un=Symbol.for("lit-noChange"),It=Symbol.for("lit-nothing"),Rl=new WeakMap,tr=nr.createTreeWalker(nr,129);function Il(e,t){if(!wa(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Al!==void 0?Al.createHTML(t):t}var Pl=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Kr;for(let i=0;i<n;i++){let u=e[i],d,p,f=-1,h=0;for(;h<u.length&&(a.lastIndex=h,p=a.exec(u),p!==null);)h=a.lastIndex,a===Kr?p[1]==="!--"?a=Sl:p[1]!==void 0?a=El:p[2]!==void 0?(Ll.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=er):p[3]!==void 0&&(a=er):a===er?p[0]===">"?(a=s??Kr,f=-1):p[1]===void 0?f=-2:(f=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?er:p[3]==='"'?Cl:Tl):a===Cl||a===Tl?a=er:a===Sl||a===El?a=Kr:(a=er,s=void 0);let w=a===er&&e[i+1].startsWith("/>")?" ":"";o+=a===Kr?u+gf:f>=0?(r.push(d),u.slice(0,f)+ya+u.slice(f)+Tn+w):u+Tn+(f===-2?i:w)}return[Il(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Xr=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,u=this.parts,[d,p]=Pl(t,n);if(this.el=e.createElement(d,r),tr.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=tr.nextNode())!==null&&u.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(ya)){let h=p[a++],w=s.getAttribute(f).split(Tn),x=/([.?@])?(.*)/.exec(h);u.push({type:1,index:o,name:x[2],strings:w,ctor:x[1]==="."?zs:x[1]==="?"?Hs:x[1]==="@"?Gs:sr}),s.removeAttribute(f)}else f.startsWith(Tn)&&(u.push({type:6,index:o}),s.removeAttribute(f));if(Ll.test(s.tagName)){let f=s.textContent.split(Tn),h=f.length-1;if(h>0){s.textContent=Us?Us.emptyScript:"";for(let w=0;w<h;w++)s.append(f[w],Zr()),tr.nextNode(),u.push({type:2,index:++o});s.append(f[h],Zr())}}}else if(s.nodeType===8)if(s.data===va)u.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(Tn,f+1))!==-1;)u.push({type:7,index:o}),f+=Tn.length-1}o++}}static createElement(t,n){let r=nr.createElement("template");return r.innerHTML=t,r}};function rr(e,t,n=e,r){if(t===un)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=Qr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=rr(e,s._$AS(e,t.values),s,r)),t}var Ws=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??nr).importNode(n,!0);tr.currentNode=s;let o=tr.nextNode(),a=0,i=0,u=r[0];for(;u!==void 0;){if(a===u.index){let d;u.type===2?d=new $r(o,o.nextSibling,this,t):u.type===1?d=new u.ctor(o,u.name,u.strings,this,t):u.type===6&&(d=new Vs(o,this,t)),this._$AV.push(d),u=r[++i]}a!==u?.index&&(o=tr.nextNode(),a++)}return tr.currentNode=nr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},$r=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=It,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=rr(this,t,n),Qr(t)?t===It||t==null||t===""?(this._$AH!==It&&this._$AR(),this._$AH=It):t!==this._$AH&&t!==un&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ol(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==It&&Qr(this._$AH)?this._$AA.nextSibling.data=t:this.T(nr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Xr.createElement(Il(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Ws(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Rl.get(t.strings);return n===void 0&&Rl.set(t.strings,n=new Xr(t)),n}k(t){wa(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(Zr()),this.O(Zr()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},sr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=It,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=It}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=rr(this,t,n,0),a=!Qr(t)||t!==this._$AH&&t!==un,a&&(this._$AH=t);else{let i=t,u,d;for(t=o[0],u=0;u<o.length-1;u++)d=rr(this,i[r+u],n,u),d===un&&(d=this._$AH[u]),a||(a=!Qr(d)||d!==this._$AH[u]),d===It?t=It:t!==It&&(t+=(d??"")+o[u+1]),this._$AH[u]=d}a&&!s&&this.j(t)}j(t){t===It?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},zs=class extends sr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===It?void 0:t}},Hs=class extends sr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==It)}},Gs=class extends sr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=rr(this,t,n,0)??It)===un)return;let r=this._$AH,s=t===It&&r!==It||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==It&&(r===It||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Vs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){rr(this,t)}},Ml={M:ya,P:Tn,A:va,C:1,L:Pl,R:Ws,D:Ol,V:rr,I:$r,H:sr,N:Hs,U:Gs,B:zs,F:Vs},hf=Yr.litHtmlPolyfillSupport;hf?.(Xr,$r),(Yr.litHtmlVersions??(Yr.litHtmlVersions=[])).push("3.3.1");var Ve=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new $r(t.insertBefore(Zr(),o),o,void 0,n??{})}return s._$AI(e),s};var sn="today",Bn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function dn(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function or(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Dl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Nl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ql(){let e=null,t=[],n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],r()},clear(){e=null,t=[],r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Fl(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Hl=mf(zl(),1);function Ct(e){return(0,Hl.default)(`beads-ui:${e}`)}function hn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ir(e,t){let n=hn(e.created_at),r=hn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Kl(e,t){let n=hn(e.created_at),r=hn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Yl(e,t){let n=hn(e.updated_at),r=hn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Zl(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=hn(e.created_at),o=hn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ql(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Rf=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Gl(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Vl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Rf.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Xl(e,t){let n=Gl(e),r=Gl(t);if(n!==r)return n<r?-1:1;let s=Vl(e),o=Vl(t);if(s!==o)return s<o?-1:1;let a=hn(e&&e.created_at),i=hn(t&&t.created_at);if(a!==i)return a<i?-1:1;let u=e&&e.id,d=t&&t.id;return u===d?0:String(u)<String(d)?-1:1}var $a=2**20;function Tr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-hn(e&&e.created_at)}function Zs(e){return(t,n)=>{let r=Tr(t,e),s=Tr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function xa(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Tr(i,n)-$a};if(!i)return{rank:Tr(a,n)+$a};let u=Tr(a,n),d=Tr(i,n),p=(u+d)/2;return u<p&&p<d?{rank:p}:{renormalize:r.map((f,h)=>({bead_id:f.id,rank:h*$a}))}}function Aa(e,t={}){let n=Ct(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,u=t.sort||ir;function d(){for(let h of Array.from(a))try{h()}catch{}}function p(){s=Array.from(r.values()).sort(u)}function f(h){if(i||!h||h.id!==e)return;let w=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,w),!(w<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(w<=o)return;r.clear();let x=Array.isArray(h.issues)?h.issues:[];for(let N of x)N&&typeof N.id=="string"&&N.id.length>0&&r.set(N.id,N);p(),o=w,d();return}if(h.type==="upsert"){let x=h.issue;if(x&&typeof x.id=="string"&&x.id.length>0){let N=r.get(x.id);if(!N)r.set(x.id,x);else{let j=Number.isFinite(N.updated_at)?N.updated_at:0,K=Number.isFinite(x.updated_at)?x.updated_at:0;if(j<=K){for(let te of Object.keys(N))te in x||delete N[te];for(let[te,L]of Object.entries(x))N[te]=L}}p()}o=w,d()}else if(h.type==="delete"){let x=String(h.issue_id||"");x&&(r.delete(x),p()),o=w,d()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:f,snapshot(){return s},size(){return r.size},getById(h){return r.get(h)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function Qs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Jl(e){let t=Ct("subs"),n=new Map,r=new Map;function s(i,u){t("applyDelta %s +%d ~%d -%d",i,(u.added||[]).length,(u.updated||[]).length,(u.removed||[]).length);let d=r.get(i);if(!d||d.size===0)return;let p=Array.isArray(u.added)?u.added:[],f=Array.isArray(u.updated)?u.updated:[],h=Array.isArray(u.removed)?u.removed:[];for(let w of Array.from(d)){let x=n.get(w);if(!x)continue;let N=x.itemsById;for(let j of p)typeof j=="string"&&j.length>0&&N.set(j,!0);for(let j of f)typeof j=="string"&&j.length>0&&N.set(j,!0);for(let j of h)typeof j=="string"&&j.length>0&&N.delete(j)}}async function o(i,u){let d=Qs(u);if(t("subscribe %s key=%s",i,d),!n.has(i))n.set(i,{key:d,itemsById:new Map});else{let f=n.get(i);if(f&&f.key!==d){let h=r.get(f.key);h&&(h.delete(i),h.size===0&&r.delete(f.key)),n.set(i,{key:d,itemsById:new Map})}}r.has(d)||r.set(d,new Set);let p=r.get(d);p&&p.add(i);try{await e("subscribe-list",{id:i,type:u.type,params:u.params})}catch(f){let h=n.get(i)||null;if(h){let w=r.get(h.key);w&&(w.delete(i),w.size===0&&r.delete(h.key))}throw n.delete(i),f}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let f=n.get(i)||null;if(f){let h=r.get(f.key);h&&(h.delete(i),h.size===0&&r.delete(f.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Qs,selectors:{getIds(i){let u=n.get(i);return u?Array.from(u.itemsById.keys()):[]},has(i,u){let d=n.get(i);return d?d.itemsById.has(u):!1},count(i){let u=n.get(i);return u?u.itemsById.size:0},getItemsById(i){let u=n.get(i),d={};if(!u)return d;for(let p of u.itemsById.keys())d[p]=!0;return d}}}}function ec(){let e=Ct("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let u of Array.from(r))try{u()}catch{}}function a(u,d,p){let f=d?Qs(d):"",h=n.get(u)||"",w=t.has(u);if(e("register %s key=%s (prev=%s)",u,f,h),w&&h&&f&&h!==f){let x=t.get(u);if(x)try{x.dispose()}catch{}let N=s.get(u);if(N){try{N()}catch{}s.delete(u)}let j=Aa(u,p);t.set(u,j);let K=j.subscribe(()=>o());s.set(u,K)}else if(!w){let x=Aa(u,p);t.set(u,x);let N=x.subscribe(()=>o());s.set(u,N)}return n.set(u,f),()=>i(u)}function i(u){e("unregister %s",u),n.delete(u);let d=t.get(u);d&&(d.dispose(),t.delete(u));let p=s.get(u);if(p){try{p()}catch{}s.delete(u)}}return{register:a,unregister:i,getStore(u){return t.get(u)||null},snapshotFor(u){let d=t.get(u);return d?d.snapshot().slice():[]},subscribe(u){return r.add(u),()=>r.delete(u)}}}function tc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function nc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function rc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Sa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Of(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Lf(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function sc(e){let t=Ct("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Of(r),a=Lf(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let u=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==u&&(window.location.hash=u)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Sa(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Sa(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var If=Object.freeze({workspace_config:{default_workspace:null}});function oc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:If.workspace_config.default_workspace}}}function ac(e={}){let t=Ct("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:oc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?oc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==n.workspace.hidden[p]),u=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===n.worker.show_closed_children[p])&&!i&&!u||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function ic(e){let t=Ct("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let d=n>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let d=n;n=Math.max(0,n-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,n),o()}function u(d){return async(f,h)=>{let w=s++,x=Date.now();r.set(w,{type:f,start_ts:x}),t("request start id=%d type=%s count=%d",w,f,n+1),a();let N=!1,j=()=>{N||(N=!0,r.delete(w),i())},K=setTimeout(()=>{N||(t("request TIMEOUT id=%d type=%s elapsed=%dms",w,f,Date.now()-x),j())},3e4);try{let te=await d(f,h),L=Date.now()-x;return t("request done id=%d type=%s elapsed=%dms",w,f,L),te}catch(te){let L=Date.now()-x;throw t("request error id=%d type=%s elapsed=%dms err=%o",w,f,L,te),te}finally{clearTimeout(K),j()}}}return o(),{wrapSend:u,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let d=Date.now();return Array.from(r.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:d-f.start_ts}))}}}function de(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Xs(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let u=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return u.sort(Ql),u;switch(i){case"created_desc":return u.sort(ir),u;case"created_asc":return u.sort(Kl),u;case"updated_desc":return u.sort(Yl),u;case"priority":return u.sort(Zl),u;case"manual":default:{let d=n();return d?u.sort(Zs(d)):u.sort(ir),u}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function xn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Ht(e){let t=xn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function on(e,t){let n=xn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let u=Math.floor(i/7);if(i<30)return`${u}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function lc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=xn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Js(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function eo(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=Js(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function to(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=lc(n);return{total:n.length,count:r,current:s,children:n}}function no(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let u={...a.order};for(let d of i)u[d.bead_id]=d.rank;n&&n.set({revision:a.revision,order:u})}async function o(a,i,u){if(!t||!n)return;let d=n.get()||{revision:0,order:{}},p=r(xa(i,u,d.order),a);s(d,p);let f=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(f&&f.conflict){let h={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(h);let w=r(xa(i,u,h.order),a);s(h,w);let x=await t("ui-order-set",{expected_revision:h.revision,entries:w});x&&x.applied&&n.set({revision:typeof x.revision=="number"?x.revision:0,order:x.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function ro(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ea(e,t){return!t||typeof e!="string"||e.length===0||ro(t.visible_labels).includes(e)?!0:ro(t.hidden_labels).includes(e)?!1:!ro(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function cc(e,t){return ro(e).filter(n=>Ea(n,t))}function Un(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function Pf(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Mf(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function Df(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${Pf(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function so(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(Xl):a;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?Mf(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${i.map((u,d)=>Df(u,d+1,t.childChips?t.childChips(u):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Nf={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},dc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},uc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},qf={review:"\u2713",skip:"\u2298"},Wn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Ff(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function pc(e){let t=e&&e.fill||"none";return t==="none"?Wn.none:e&&e.stale===!0?Wn.stale:t==="dim"?Wn.dim:e&&e.glyph==="review"?Wn.review:e&&e.glyph==="skip"?Wn.skip:Wn.done}function jf(e){if(!e||e.fill==="none"||!e.approval_state)return pc(e);let t=[];return e.glyph==="review"?t.push(Wn.review):e.glyph==="skip"&&t.push(Wn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Bf(e,t,n,r){let s=Nf[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=qf[t&&t.glyph||""]||"",u="bar";o==="dim"?u+=` b-${s} dim`:o==="full"&&(u+=` b-${s} full`),a&&(u+=" stale"),n&&(u+=" cur");let d=o==="none"?"lbl":`lbl l-${s} on`,p=n?`color: var(--stage-${s}-on)`:"",f=dc[e]||e,h=r?fc(t):null;if(!h)return c`
      <div class="seg">
        <div class=${u} style=${p}>${i}</div>
        <div class=${d}>${f}</div>
      </div>
    `;let w=`${f} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${w}
      title=${w}
      @click=${x=>{x.preventDefault(),x.stopPropagation(),r(x,h,e)}}
    >
      <div class=${u} style=${p}>${i}</div>
      <div class=${d}>${f}</div>
    </button>
  `}function fc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function oo(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=uc[e.route]||uc.spec_backed,o=e.stages,a=Ff(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(d=>`${dc[d]||d} ${d==="plan"?jf(o[d]||{}):pc(o[d]||{})}`).join(" \xB7 ")}`,u=!!r&&s.some(d=>fc(o[d]||{})!==null);return c`
    <div
      class="stp"
      role=${u?"group":"img"}
      aria-label=${i}
    >
      ${s.map(d=>Bf(d,o[d]||{},d===a,r))}
    </div>
  `}function Uf(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var _c=2;function Wf(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,_c).join(", "),s=n.length-_c,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Ta(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function ao(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Cn(e){return`${e.kind}:${ao(e)}@${e.sha}`}function io(e,t){if(!e)return null;let n=Ta(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=Ta(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,u=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,d=t?` \xB7 exec_receipt ${Cn(t)}`:"";return{kind:e.kind,label:i,title:`${u}${d}`}}function mc(e,t){let n=io(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function zf(e){if(!e)return null;let t=Ta(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Cn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Hf(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Un(n,"route")){let i=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&Un(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Un(n,"pr")){let i=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=mc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Cn(i)}`}
        >${`exec ${i.kind==="delegated"?ao(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of cc(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Un(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Un(n,"blocked")&&s.push(...Wf(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Un(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function Gf(e){let t=on(e.created_at),n=on(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Ht(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function Vf(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return so(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Gf(e),empty_label:"children \uC5C6\uC74C",childChips:Ca,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function Ca(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return io(t,n)?c`<span class="board-card__roll-child-chips">
    ${mc(t,n)}
    ${zf(n)}
  </span>`:null}function lo(e,t){let n=Uf(e.priority);return c`
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
      ${Hf(e,t)}
      ${e.workflow&&Un(t.policy||null,"stepper")?oo(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Vf(e,t)}
    </article>
  `}function Cr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${Bn.map(o=>c`<option
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
        ${e.items.map(o=>lo(o,t))}
      </div>
    </section>
  `}function gc(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>lo(r,t))}
        </div>
      </div>
    </dialog>
  `}var Kf=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Yf=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Zf=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Qf(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function hc(e,t,n){return c`
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
        ${Kf.map(r=>c`<option
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
        ${Yf.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Qf(e,t,n)}
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
        ${Zf.map(r=>c`<option
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
  `}var Xf=200,Jf={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},e_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),bc="beads-ui.board.sort",yc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function t_(){try{let e=window.localStorage.getItem(bc);if(e&&yc.has(e))return e}catch{}return"created_desc"}function vc(e,t){let n=Ct("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,u=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,f=t.openDoc,h=t.closedRange||sn,w=s?Xs(s,a):null,x=no({transport:o,uiOrderStore:a}),N=[],j=[],K=[],te=[],L=[],M=[],D=!1,z=0,A=t_(),U=new Map,F=new Map,be=new Map,$e=new Set,ee={search:"",priority:"",type:"",labels:[]},Q=!1,xe=null;function Oe(Y){return String(Y.status||"open")==="open"}function ne(Y){let le=String(Y.status||"open");return le==="open"||le==="blocked"}function oe(Y){let le=ee.search.trim().toLowerCase(),Ne=ee.priority,E=ee.type,b=ee.labels;return Y.filter(S=>{if(le){let H=String(S.id||"").toLowerCase(),ie=String(S.title||"").toLowerCase();if(!H.includes(le)&&!ie.includes(le))return!1}if(Ne!==""&&String(S.priority)!==Ne||E!==""&&String(S.issue_type||"")!==E)return!1;if(b.length>0){let H=Array.isArray(S.labels)?S.labels:[];if(!b.some(ie=>H.includes(ie)))return!1}return!0})}function Ae(){let Y=new Set;for(let le of[N,j,K,te,L,M])for(let Ne of le){let E=Array.isArray(Ne.labels)?Ne.labels:[];for(let b of E)typeof b=="string"&&b.length>0&&Y.add(b)}return Array.from(Y).sort()}function B(){return ee.search.trim()!==""||ee.priority!==""||ee.type!==""||ee.labels.length>0}function X(){try{if(w){let Y=w.selectBoardColumn("tab:board:in-progress","in_progress",A),le=w.selectBoardColumn("tab:board:blocked","blocked",A).filter(ne),Ne=new Set(Y.map(Se=>Se.id)),E=w.selectBoardColumn("tab:board:ready","ready",A).filter(Se=>Oe(Se)&&!Ne.has(Se.id)),b=w.selectBoardColumn("tab:board:resolved","resolved",A),S=w.selectBoardColumn("tab:board:deferred","deferred",A),H=w.selectBoardColumn("tab:board:closed","closed").slice(0,Xf),ie=[...le,...E,...Y,...b,...H];_e(ie);let ae=new Set;for(let Se of ie)Se&&Se.id&&!Js(Se)&&ae.add(Se.id);let ve=!B();N=ve?Jr(le,ae):le,j=ve?Jr(E,ae):E,K=ve?Jr(Y,ae):Y,te=ve?Jr(b,ae):b,L=S,z=S.length,M=ve?Jr(H,ae):H,U=new Map;for(let Se of N)U.set(Se.id,"open");for(let Se of j)U.set(Se.id,"open");for(let Se of K)U.set(Se.id,"in_progress");for(let Se of te)U.set(Se.id,"resolved");for(let Se of L)U.set(Se.id,"deferred");for(let Se of M)U.set(Se.id,"closed");F=new Map;for(let Se of N)F.set(Se.id,"blocked-col");for(let Se of j)F.set(Se.id,"ready-col");for(let Se of K)F.set(Se.id,"in-progress-col");for(let Se of te)F.set(Se.id,"resolved-col");for(let Se of M)F.set(Se.id,"closed-col")}ct()}catch{N=[],j=[],K=[],te=[],L=[],M=[],be=new Map,ct()}}function _e(Y){be=eo(Y)}function ke(Y){return to(be,Y)}function we(Y){return!$e.has(Y)}function Ue(Y,le){Y.preventDefault(),Y.stopPropagation(),$e.has(le)?$e.delete(le):$e.add(le),ct()}function me(Y,le){Y.preventDefault(),Y.stopPropagation(),r(le)}function Ze(Y,le){Y.preventDefault(),Y.stopPropagation(),r(le)}function gt(Y,le){xe||r(le)}function R(Y,le){Y.preventDefault(),Y.stopPropagation(),n_(le).then(Ne=>{Ne&&de("\uBCF5\uC0AC\uB428","success",1200)})}function ue(Y,le){xe=le,Y.dataTransfer&&(Y.dataTransfer.setData("text/plain",le),Y.dataTransfer.effectAllowed="move"),Y.target.classList.add("board-card--dragging")}function Ce(Y){Y.target.classList.remove("board-card--dragging"),wt(),setTimeout(()=>{xe=null},0)}function Re(Y){let le=String(Y.target.value||"");!le||le===h||(h=le,d&&d(le),ct())}function je(){return i?i.get():null}function qe(Y){let le=u?u.get():null,Ne=le?le.cleanup_failed:null;if(!Ne||typeof Ne!="object"||Array.isArray(Ne))return null;let E=Ne[Y];return!E||typeof E!="object"||Array.isArray(E)?null:E}let W={onCardClick:gt,onCopyId:R,onDragStart:ue,onDragEnd:Ce,onClosedRangeChange:Re,rollupFor:ke,isExpanded:we,onRollupToggle:Ue,onChildClick:me,onFromChipClick:Ze,onOpenDoc:f?(Y,le)=>f(le):void 0,cleanupFailureFor:qe,get policy(){return je()}};function G(Y,le){xe||(De(),r(le))}function Me(Y,le){Y.preventDefault(),Y.stopPropagation(),De(),r(le)}let Ke={...W,onCardClick:G,onChildClick:Me,onFromChipClick:Me,onOpenDoc:f?(Y,le)=>{De(),f(le)}:void 0,get policy(){return je()}};function Ge(Y){let le=Y.target,Ne=e.querySelector(".board-filter__labels");le&&Ne&&Ne.contains(le)||J()}function ye(Y){Y.key==="Escape"&&J()}function I(){Q||(Q=!0,document.addEventListener("mousedown",Ge),document.addEventListener("keydown",ye),ct())}function J(){Q&&(Q=!1,document.removeEventListener("mousedown",Ge),document.removeEventListener("keydown",ye),ct())}function re(Y){Y.key==="Escape"&&De()}function V(){D||(D=!0,document.addEventListener("keydown",re),ct())}function De(){D&&(D=!1,document.removeEventListener("keydown",re),ct())}let Qe={onClose:De,onOverlayClick(Y){Y.target===Y.currentTarget&&De()}},lt={onSearchInput(Y){ee.search=String(Y.target.value||""),X()},onPriorityChange(Y){ee.priority=String(Y.target.value||""),X()},onTypeChange(Y){ee.type=String(Y.target.value||""),X()},onSortChange(Y){let le=String(Y.target.value||"");if(!(!yc.has(le)||le===A)){A=le;try{window.localStorage.setItem(bc,le)}catch{}X()}},onDeferredToggle(){D?De():V()},onLabelMenuToggle(){Q?J():I()},onLabelToggle(Y){let le=ee.labels.indexOf(Y);le===-1?ee.labels.push(Y):ee.labels.splice(le,1),X()},onLabelClear(){ee.labels.length!==0&&(ee.labels=[],X())},onNewIssue(){p&&p()}};function ot(){return c`
      <div class="board-view">
        ${hc(ee,lt,{sort_mode:A,deferred_popup_open:D,deferred_count:z,label_options:Ae(),label_menu_open:Q})}
        <div class="board-root">
          ${Cr({title:"Blocked",id:"blocked-col",items:oe(N)},W)}
          ${Cr({title:"Ready",id:"ready-col",items:oe(j)},W)}
          ${Cr({title:"In progress",id:"in-progress-col",items:oe(K)},W)}
          ${Cr({title:"Resolved",id:"resolved-col",items:oe(te)},W)}
          ${Cr({title:"Closed",id:"closed-col",items:oe(M),is_closed:!0,closed_range:h},W)}
        </div>
        ${D?gc({items:oe(L),count:z},Ke,Qe):""}
      </div>
    `}function ct(){Ve(ot(),e),ht()}function ht(){try{let Y=e.querySelector("#deferred-popup");Y&&!Y.open&&(typeof Y.showModal=="function"?Y.showModal():Y.setAttribute("open",""));let le=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ne of le)Array.from(Ne.querySelectorAll(".board-card")).forEach((b,S)=>{b.tabIndex=S===0?0:-1})}catch{}}async function bt(Y,le){if(!o){de("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:Y,status:le}),de("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ne){n("update-status failed: %o",Ne),de("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function tt(Y){switch(Y){case"blocked-col":return N;case"ready-col":return j;case"in-progress-col":return K;case"resolved-col":return te;default:return[]}}function Tt(Y,le,Ne){if(!o||!a)return;let E=tt(Y),b=E.find(ve=>ve.id===le);if(!b)return;let S=E.filter(ve=>ve.id!==le),H=Ne.closest?Ne.closest(".board-card"):null,ie=S.length;if(H){let ve=H.getAttribute("data-issue-id");if(ve===le)return;let Se=S.findIndex(Je=>Je.id===ve);Se>=0&&(ie=Se)}let ae=S.slice();ae.splice(ie,0,b),x.applyReorder(le,ae,ie)}function wt(){for(let Y of Array.from(e.querySelectorAll(".board-column--drag-over")))Y.classList.remove("board-column--drag-over")}let He=null;e.addEventListener("dragover",Y=>{Y.preventDefault(),Y.dataTransfer&&(Y.dataTransfer.dropEffect="move");let Ne=Y.target.closest(".board-column");Ne&&Ne!==He&&(He&&He.classList.remove("board-column--drag-over"),Ne.classList.add("board-column--drag-over"),He=Ne)}),e.addEventListener("dragleave",Y=>{let le=Y.relatedTarget;(!le||!e.contains(le))&&He&&(He.classList.remove("board-column--drag-over"),He=null)}),e.addEventListener("drop",Y=>{Y.preventDefault(),He&&(He.classList.remove("board-column--drag-over"),He=null);let le=Y.target,Ne=le.closest(".board-column");if(!Ne)return;let E=Y.dataTransfer?.getData("text/plain")||"";if(!E)return;let b=Ne.id,S=F.get(E);if(S&&S===b){if(e_.has(b)){if(A!=="manual"){de("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Tt(b,E,le)}return}let H=Jf[b];if(!H){de("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}U.get(E)!==H&&bt(E,H)}),e.addEventListener("keydown",Y=>{let le=Y.target;if(!(le instanceof HTMLElement))return;let Ne=String(le.tagName||"").toLowerCase();if(Ne==="input"||Ne==="textarea"||Ne==="select"||Ne==="button"||Ne==="a"||le.isContentEditable===!0)return;let E=le.closest(".board-card");if(!E)return;let b=String(Y.key||"");if(b==="Enter"||b===" "){Y.preventDefault();let ae=E.getAttribute("data-issue-id");ae&&r(ae);return}if(b!=="ArrowUp"&&b!=="ArrowDown"&&b!=="ArrowLeft"&&b!=="ArrowRight")return;Y.preventDefault();let S=E.closest(".board-column");if(!S)return;let H=Array.from(S.querySelectorAll(".board-card")),ie=H.indexOf(E);if(b==="ArrowDown"&&ie<H.length-1){he(E,H[ie+1]);return}if(b==="ArrowUp"&&ie>0){he(E,H[ie-1]);return}if(b==="ArrowLeft"||b==="ArrowRight"){let ae=Array.from(e.querySelectorAll(".board-column")),ve=ae.indexOf(S),Se=b==="ArrowRight"?1:-1,Je=ve+Se;for(;Je>=0&&Je<ae.length;){let rt=ae[Je].querySelector(".board-card");if(rt){he(E,rt);return}Je+=Se}}});function he(Y,le){try{Y.tabIndex=-1,le.tabIndex=0,le.focus()}catch{}}let mt=null;w&&w.subscribe&&(mt=w.subscribe(()=>{try{X()}catch{}}));let $t=null;i&&i.subscribe&&($t=i.subscribe(()=>{try{X()}catch{}}));let nt=null;return u&&u.subscribe&&(nt=u.subscribe(()=>{ct()})),{async load(){n("load"),X()},clear(){J(),De(),mt&&(mt(),mt=null),$t&&($t(),$t=null),nt&&(nt(),nt=null),e.replaceChildren(),N=[],j=[],K=[],te=[],L=[],M=[],U=new Map,F=new Map}}}function Jr(e,t){return e.filter(n=>{let r=Js(n);return!(r&&t.has(r))})}async function n_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function an(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function lr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function es(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function r_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${lr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${lr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(u=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),u(p)};r.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Rn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await r_(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var s_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],wc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},o_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Nt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ot(e){return typeof e=="string"&&e.length>0?e:null}function Rr(e){return e.startsWith("gpt-")?e.slice(4):e}function St(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function $c(e,t,n){let r=Ot(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Ot(n[e]);return s===null?null:{value:s,source:"global"}}function ts(e,t,n,r){return $c(e,t,n)||{value:r,source:"base"}}function Ra(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&Nt(s?.[t])){let a=Ot(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Nt(s)){for(let a of Object.values(s))if(Nt(a)){let i=Ot(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Ot(r?.runners?.[o]?.models?.[e]?.id)||e}function a_(e,t){return Ot(t?.review?.reviewers?.[e]?.model)||e}function Or(e,t,n=!1){if(e==="default")return St(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Rr(e):e;return St(e,t,r,e,"explicit")}function xc(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];Nt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(Nt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function i_(e,t){let n=[],r=e?.implementation?.model_catalog;Nt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(Nt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function l_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of i_(t,n)){let o=xc(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function Oa(e){return St(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function kc(e,t,n){let r=$c(e,t,n);return r?Or(r.value,r.source):St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Jt(e){let t=Nt(e.pin)?e.pin:{},n=Nt(e.global)?e.global:{},r=Nt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&Nt(r.session)?r.session:null,o=r?.supported===!0&&Nt(r.orchestration)?r.orchestration:null,a=Nt(e.runner_catalog)?e.runner_catalog:null,i=Ot(n.quick_fix_impl_model),u=l_(i,s,a),d={};if(s){let p=ts("workflow_mode",t,n,Ot(s.workflow_mode_default));d.workflow_mode=p.source==="base"?St(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):Or(p.value,p.source);for(let L of["spec_review","plan_review","impl_review"]){let M=`${L}_model`,D=Ot(L==="plan_review"?p.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),z=ts(M,t,n,D);if(z.value===null)d[M]=St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(z.value!=="self"&&z.value!=="skip"&&!Nt(s.review?.reviewers?.[z.value]))d[M]=Oa(St(z.value,z.source,"",null,"explicit"));else{let A=a_(z.value,s);d[M]=St(z.value,z.source,Rr(A),A,z.source==="base"?"default":"explicit")}}for(let[L,M]of Object.entries(wc)){let D=d[M].value;if(D==="self"||D==="skip"){d[L]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let z=Ot(s.review?.reviewers?.[D||""]?.effort),A=ts(L,t,n,z);d[L]=A.value===null?St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):St(A.value,A.source,A.value,A.value,A.source==="base"?"default":"explicit")}let f=Nt(s.implementation?.default)?s.implementation.default:{},h=Ot(e.route),w=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),x=Nt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},N=w&&Nt(x[h])?x[h]:{};for(let L of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let M=ts(L,t,n,L==="impl_dispatch"?Ot(N.dispatch)||Ot(f.dispatch):Ot(f[L.replace("impl_","")]));d[L]=M.value===null?St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):St(M.value,M.source,M.value,M.value,M.source==="base"?"default":"explicit")}let j=Ot(t.impl_runtime),K=j==="inherit"?Ot(e.controller_runtime):j,te=h==="quick_fix"&&Ot(t.impl_dispatch)===null&&u.runtime!==null&&(j===null||K===u.runtime);if(te){let L=u.runtime,M=i;d.impl_dispatch=St("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),j===null&&(d.impl_runtime=St(L,"global",`${L} (\uC720\uB3C4)`,L,"explicit")),Ot(t.impl_model)===null&&(d.impl_model=St(M,"global",M,M,"explicit"))}if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let L of["impl_runtime","impl_model","impl_effort","impl_speed"])d[L]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(d.impl_dispatch.value==="delegated"&&!te&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_model.value!==null){let L=d.impl_runtime.value==="inherit"?Ot(e.controller_runtime):d.impl_runtime.value,M=L?xc(L,s,a):[];if(d.impl_model.value!=="auto"&&M.length>0&&!M.includes(d.impl_model.value))d.impl_model=Oa(d.impl_model);else{let D=Ra(d.impl_model.value,L,s,a);d.impl_model.display=Rr(D),d.impl_model.full_value=D}}if(d.impl_effort.value==="auto"){let L=Ot(e.transport)||(d.impl_runtime.value==="codex"?"codex-native-spawn":d.impl_runtime.value==="claude"?"implement-claude":null),M=L?Ot(s.implementation?.effort_by_transport?.[L]?.auto):null;M&&!o_.has(M)?(d.impl_effort.display=`${M} (\uBE44\uD638\uD658)`,d.impl_effort.full_value=M,d.impl_effort.resolution="incompatible"):(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}d.impl_speed.value==="default"&&(d.impl_speed=d.impl_speed.source==="base"?St("default","base","default (\uC77C\uBC18)","default","default"):Or("default",d.impl_speed.source))}}else for(let p of s_.filter(f=>!f.startsWith("orchestration_")))d[p]=kc(p,t,n);if(!s){for(let[p,f]of Object.entries(wc))(d[f].value==="self"||d[f].value==="skip")&&(d[p]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])d[p]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else d.impl_dispatch.value==="delegated"&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_effort.value==="auto"&&(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){d[p]=kc(p,t,n);continue}let f=p.replace("orchestration_",""),h=Ot(o[f]),w=ts(p,t,n,h);if(p==="orchestration_effort"&&w.source==="base"){d[p]=St(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(w.value===null){d[p]=St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let x=w.source==="base"?Ot(o.model_id)||w.value:Ra(w.value,null,s,a);d[p]=St(w.value,w.source,Rr(x),x,w.source==="base"?"default":"explicit");continue}if(w.value==="default"){d[p]=w.source==="base"?St("default","base","default (\uC77C\uBC18)","default","default"):Or("default",w.source);continue}d[p]=Or(w.value,w.source)}if(s)if(i===null){let p=d.orchestration_model.full_value;d.quick_fix_impl_model=St(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Rr(p)})`,null,"default")}else if(u.runtime!==null){let p=Ra(i,u.runtime,s,a);d.quick_fix_impl_model=St(i,"global",Rr(p),p,"explicit")}else u.offered?d.quick_fix_impl_model=Oa(St(i,"global","",null,"explicit")):d.quick_fix_impl_model=Or(i,"global");return d}function c_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function co(e){let t=Nt(e.pin)?e.pin:{},n=Nt(e.global)?e.global:{},r=Nt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=f=>{let h={...r,...f};return Jt({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],u=s(o)[e.key],d=Ot(o[e.key]),p=[...e.choices];return d!==null&&!p.includes(d)&&p.unshift(d),{unset_label:c_(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:u?.resolution==="not_applicable",options:p.map(f=>{let h=s({...o,[e.key]:f})[e.key];return{value:f,label:h.display,full_value:h.full_value}})}}function Lr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let u=!1,d=f=>{u||(u=!0,typeof t.close=="function"&&t.close(),t.remove(),i(f))},p=()=>d(r.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>d(null)),r.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),p())}),t.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}var Cc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var On=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],ns=[...On,"reasoning_output_tokens"],u_={codex:["implementation","review-consult"],claude:["subagent"]};function La(e){let t=0;for(let n of On)t+=Ft(e?.[n]);return t}function d_(e){return!e||typeof e!="object"?!1:On.some(t=>Number.isFinite(e[t]))}function Ac(e){return!e||typeof e!="object"?!1:ns.some(t=>Number.isFinite(e[t]))}function p_(e){let t={};for(let n of ns)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Sc(e){let t={};for(let n of ns)Number.isFinite(e[n])&&(t[n]=e[n]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Ec(e,t){return e==="codex"?Ft(t.input_tokens)+Ft(t.output_tokens):La(t)}function f_(e){return e==="claude"?"Claude":"Codex"}function __(e){return`\u03C4 ${Rc(e)}`}function m_(e,t){let n=t.breakdown||{},r=[`\uC785\uB825 ${Ft(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&r.push(`\uCD94\uB860\uCD9C\uB825 ${Ft(n.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,r.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Cc),o.join(`
`)}function Wt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${f_(n)} ${__(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:m_(n,r)})}return t}function po(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let u of ns)Number.isFinite(a.breakdown[u])&&(i.breakdown[u]=Ft(i.breakdown[u])+Ft(a.breakdown[u]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ia(e){return!e||typeof e!="object"?null:pn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function g_(e){return e==="codex"?"codex":"claude"}function An(){return{subtotal:0,breakdown:p_(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function uo(e,t,n){e.subtotal+=t.subtotal;for(let r of ns)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Ft(e.breakdown[r])+Ft(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Tc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Rc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Ir(e){return d_(e)?`\u03C4 ${Rc(La(e))}`:null}function Ln(e){let t=Ir(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function rs(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${La(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Cc),n.join(`
`)}function pn(e,t){let n={claude:An(),codex:An()},r={orchestrator:{claude:An(),codex:An()},implementation:{claude:An(),codex:An()},"review-consult":{claude:An(),codex:An()},subagent:{claude:An(),codex:An()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let u=i.usage;if(Ac(u)){let p=g_(i.runner),f=Sc(u),h={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:f,subtotal:Ec(p,f)};f.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),uo(n[p],h,!0),uo(r.orchestrator[p],h,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of d){let f=p&&p.provider==="claude"?"claude":"codex";if(!p||p.provider!=="codex"&&p.provider!=="claude"||!u_[f].includes(p.role)||!Ac(p.usage))continue;let h=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!h||s.has(h))continue;s.add(h);let w=Sc(p.usage),x={provider:f,role:p.role,attempt_id:String(i.attempt_id||""),usage:w,subtotal:Ec(f,w)};x.receipt_id=h,typeof p.agent_type=="string"&&(x.agent_type=p.agent_type),typeof p.agent_id=="string"&&(x.agent_id=p.agent_id),typeof p.model=="string"&&(x.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(x.effort=p.effort),typeof p.session_id=="string"?x.session_id=p.session_id:typeof p.thread_id=="string"&&(x.session_id=p.thread_id),typeof p.turn_id=="string"&&(x.turn_id=p.turn_id),(typeof p.completed_at=="string"||typeof p.completed_at=="number"&&Number.isFinite(p.completed_at))&&(x.completed_at=p.completed_at),w.replayed===!0&&(x.replayed=!0),uo(n[f],x,!1),uo(r[x.role][f],x,!1)}}let o={};for(let i of["claude","codex"]){let u=n[i];if(u.legs.length===0)continue;let d=Tc(u,!1);i==="claude"&&u.outer_count>0&&u.outer_cost_count===u.outer_count&&(d.total_cost_usd=u.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let u={};for(let d of["claude","codex"]){let p=r[i][d];p.legs.length>0&&(u[d]={...Tc(p,!0),legs:p.legs})}Object.keys(u).length>0&&(a[i]=u)}return{providers:o,roles:a}}var{entries:Fc,setPrototypeOf:Oc,isFrozen:h_,getPrototypeOf:b_,getOwnPropertyDescriptor:y_}=Object,{freeze:Vt,seal:fn,create:ja}=Object,{apply:Ba,construct:Ua}=typeof Reflect<"u"&&Reflect;Vt||(Vt=function(t){return t});fn||(fn=function(t){return t});Ba||(Ba=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});Ua||(Ua=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var fo=Kt(Array.prototype.forEach),v_=Kt(Array.prototype.lastIndexOf),Lc=Kt(Array.prototype.pop),ss=Kt(Array.prototype.push),w_=Kt(Array.prototype.splice),mo=Kt(String.prototype.toLowerCase),Pa=Kt(String.prototype.toString),Ma=Kt(String.prototype.match),os=Kt(String.prototype.replace),k_=Kt(String.prototype.indexOf),$_=Kt(String.prototype.trim),bn=Kt(Object.prototype.hasOwnProperty),Gt=Kt(RegExp.prototype.test),as=x_(TypeError);function Kt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Ba(e,t,r)}}function x_(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ua(e,n)}}function st(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:mo;Oc&&Oc(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(h_(t)||(t[r]=o),s=o)}e[s]=!0}return e}function A_(e){for(let t=0;t<e.length;t++)bn(e,t)||(e[t]=null);return e}function In(e){let t=ja(null);for(let[n,r]of Fc(e))bn(e,n)&&(Array.isArray(r)?t[n]=A_(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=In(r):t[n]=r);return t}function is(e,t){for(;e!==null;){let r=y_(e,t);if(r){if(r.get)return Kt(r.get);if(typeof r.value=="function")return Kt(r.value)}e=b_(e)}function n(){return null}return n}var Ic=Vt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Da=Vt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Na=Vt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),S_=Vt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),qa=Vt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),E_=Vt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Pc=Vt(["#text"]),Mc=Vt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Fa=Vt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Dc=Vt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),_o=Vt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),T_=fn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),C_=fn(/<%[\w\W]*|[\w\W]*%>/gm),R_=fn(/\$\{[\w\W]*/gm),O_=fn(/^data-[\-\w.\u00B7-\uFFFF]+$/),L_=fn(/^aria-[\-\w]+$/),jc=fn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),I_=fn(/^(?:\w+script|data):/i),P_=fn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Bc=fn(/^html$/i),M_=fn(/^[a-z][.\w]*(-[.\w]+)+$/i),Nc=Object.freeze({__proto__:null,ARIA_ATTR:L_,ATTR_WHITESPACE:P_,CUSTOM_ELEMENT:M_,DATA_ATTR:O_,DOCTYPE_NAME:Bc,ERB_EXPR:C_,IS_ALLOWED_URI:jc,IS_SCRIPT_OR_DATA:I_,MUSTACHE_EXPR:T_,TMPLIT_EXPR:R_}),ls={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},D_=function(){return typeof window>"u"?null:window},N_=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},qc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Uc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:D_(),t=Pe=>Uc(Pe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==ls.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:u,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:h,trustedTypes:w}=e,x=u.prototype,N=is(x,"cloneNode"),j=is(x,"remove"),K=is(x,"nextSibling"),te=is(x,"childNodes"),L=is(x,"parentNode");if(typeof a=="function"){let Pe=n.createElement("template");Pe.content&&Pe.content.ownerDocument&&(n=Pe.content.ownerDocument)}let M,D="",{implementation:z,createNodeIterator:A,createDocumentFragment:U,getElementsByTagName:F}=n,{importNode:be}=r,$e=qc();t.isSupported=typeof Fc=="function"&&typeof L=="function"&&z&&z.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ee,ERB_EXPR:Q,TMPLIT_EXPR:xe,DATA_ATTR:Oe,ARIA_ATTR:ne,IS_SCRIPT_OR_DATA:oe,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:B}=Nc,{IS_ALLOWED_URI:X}=Nc,_e=null,ke=st({},[...Ic,...Da,...Na,...qa,...Pc]),we=null,Ue=st({},[...Mc,...Fa,...Dc,..._o]),me=Object.seal(ja(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ze=null,gt=null,R=Object.seal(ja(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ue=!0,Ce=!0,Re=!1,je=!0,qe=!1,W=!0,G=!1,Me=!1,Ke=!1,Ge=!1,ye=!1,I=!1,J=!0,re=!1,V="user-content-",De=!0,Qe=!1,lt={},ot=null,ct=st({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ht=null,bt=st({},["audio","video","img","source","image","track"]),tt=null,Tt=st({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),wt="http://www.w3.org/1998/Math/MathML",He="http://www.w3.org/2000/svg",he="http://www.w3.org/1999/xhtml",mt=he,$t=!1,nt=null,Y=st({},[wt,He,he],Pa),le=st({},["mi","mo","mn","ms","mtext"]),Ne=st({},["annotation-xml"]),E=st({},["title","style","font","a","script"]),b=null,S=["application/xhtml+xml","text/html"],H="text/html",ie=null,ae=null,ve=n.createElement("form"),Se=function(C){return C instanceof RegExp||C instanceof Function},Je=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ae&&ae===C)){if((!C||typeof C!="object")&&(C={}),C=In(C),b=S.indexOf(C.PARSER_MEDIA_TYPE)===-1?H:C.PARSER_MEDIA_TYPE,ie=b==="application/xhtml+xml"?Pa:mo,_e=bn(C,"ALLOWED_TAGS")?st({},C.ALLOWED_TAGS,ie):ke,we=bn(C,"ALLOWED_ATTR")?st({},C.ALLOWED_ATTR,ie):Ue,nt=bn(C,"ALLOWED_NAMESPACES")?st({},C.ALLOWED_NAMESPACES,Pa):Y,tt=bn(C,"ADD_URI_SAFE_ATTR")?st(In(Tt),C.ADD_URI_SAFE_ATTR,ie):Tt,ht=bn(C,"ADD_DATA_URI_TAGS")?st(In(bt),C.ADD_DATA_URI_TAGS,ie):bt,ot=bn(C,"FORBID_CONTENTS")?st({},C.FORBID_CONTENTS,ie):ct,Ze=bn(C,"FORBID_TAGS")?st({},C.FORBID_TAGS,ie):In({}),gt=bn(C,"FORBID_ATTR")?st({},C.FORBID_ATTR,ie):In({}),lt=bn(C,"USE_PROFILES")?C.USE_PROFILES:!1,ue=C.ALLOW_ARIA_ATTR!==!1,Ce=C.ALLOW_DATA_ATTR!==!1,Re=C.ALLOW_UNKNOWN_PROTOCOLS||!1,je=C.ALLOW_SELF_CLOSE_IN_ATTR!==!1,qe=C.SAFE_FOR_TEMPLATES||!1,W=C.SAFE_FOR_XML!==!1,G=C.WHOLE_DOCUMENT||!1,Ge=C.RETURN_DOM||!1,ye=C.RETURN_DOM_FRAGMENT||!1,I=C.RETURN_TRUSTED_TYPE||!1,Ke=C.FORCE_BODY||!1,J=C.SANITIZE_DOM!==!1,re=C.SANITIZE_NAMED_PROPS||!1,De=C.KEEP_CONTENT!==!1,Qe=C.IN_PLACE||!1,X=C.ALLOWED_URI_REGEXP||jc,mt=C.NAMESPACE||he,le=C.MATHML_TEXT_INTEGRATION_POINTS||le,Ne=C.HTML_INTEGRATION_POINTS||Ne,me=C.CUSTOM_ELEMENT_HANDLING||{},C.CUSTOM_ELEMENT_HANDLING&&Se(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(me.tagNameCheck=C.CUSTOM_ELEMENT_HANDLING.tagNameCheck),C.CUSTOM_ELEMENT_HANDLING&&Se(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(me.attributeNameCheck=C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),C.CUSTOM_ELEMENT_HANDLING&&typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(me.allowCustomizedBuiltInElements=C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),qe&&(Ce=!1),ye&&(Ge=!0),lt&&(_e=st({},Pc),we=[],lt.html===!0&&(st(_e,Ic),st(we,Mc)),lt.svg===!0&&(st(_e,Da),st(we,Fa),st(we,_o)),lt.svgFilters===!0&&(st(_e,Na),st(we,Fa),st(we,_o)),lt.mathMl===!0&&(st(_e,qa),st(we,Dc),st(we,_o))),C.ADD_TAGS&&(typeof C.ADD_TAGS=="function"?R.tagCheck=C.ADD_TAGS:(_e===ke&&(_e=In(_e)),st(_e,C.ADD_TAGS,ie))),C.ADD_ATTR&&(typeof C.ADD_ATTR=="function"?R.attributeCheck=C.ADD_ATTR:(we===Ue&&(we=In(we)),st(we,C.ADD_ATTR,ie))),C.ADD_URI_SAFE_ATTR&&st(tt,C.ADD_URI_SAFE_ATTR,ie),C.FORBID_CONTENTS&&(ot===ct&&(ot=In(ot)),st(ot,C.FORBID_CONTENTS,ie)),De&&(_e["#text"]=!0),G&&st(_e,["html","head","body"]),_e.table&&(st(_e,["tbody"]),delete Ze.tbody),C.TRUSTED_TYPES_POLICY){if(typeof C.TRUSTED_TYPES_POLICY.createHTML!="function")throw as('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof C.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw as('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=C.TRUSTED_TYPES_POLICY,D=M.createHTML("")}else M===void 0&&(M=N_(w,s)),M!==null&&typeof D=="string"&&(D=M.createHTML(""));Vt&&Vt(C),ae=C}},rt=st({},[...Da,...Na,...S_]),Ye=st({},[...qa,...E_]),ut=function(C){let pe=L(C);(!pe||!pe.tagName)&&(pe={namespaceURI:mt,tagName:"template"});let Le=mo(C.tagName),at=mo(pe.tagName);return nt[C.namespaceURI]?C.namespaceURI===He?pe.namespaceURI===he?Le==="svg":pe.namespaceURI===wt?Le==="svg"&&(at==="annotation-xml"||le[at]):!!rt[Le]:C.namespaceURI===wt?pe.namespaceURI===he?Le==="math":pe.namespaceURI===He?Le==="math"&&Ne[at]:!!Ye[Le]:C.namespaceURI===he?pe.namespaceURI===He&&!Ne[at]||pe.namespaceURI===wt&&!le[at]?!1:!Ye[Le]&&(E[Le]||!rt[Le]):!!(b==="application/xhtml+xml"&&nt[C.namespaceURI]):!1},Rt=function(C){ss(t.removed,{element:C});try{L(C).removeChild(C)}catch{j(C)}},ft=function(C,pe){try{ss(t.removed,{attribute:pe.getAttributeNode(C),from:pe})}catch{ss(t.removed,{attribute:null,from:pe})}if(pe.removeAttribute(C),C==="is")if(Ge||ye)try{Rt(pe)}catch{}else try{pe.setAttribute(C,"")}catch{}},tn=function(C){let pe=null,Le=null;if(Ke)C="<remove></remove>"+C;else{let yt=Ma(C,/^[\r\n\t ]+/);Le=yt&&yt[0]}b==="application/xhtml+xml"&&mt===he&&(C='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+C+"</body></html>");let at=M?M.createHTML(C):C;if(mt===he)try{pe=new h().parseFromString(at,b)}catch{}if(!pe||!pe.documentElement){pe=z.createDocument(mt,"template",null);try{pe.documentElement.innerHTML=$t?D:at}catch{}}let xt=pe.body||pe.documentElement;return C&&Le&&xt.insertBefore(n.createTextNode(Le),xt.childNodes[0]||null),mt===he?F.call(pe,G?"html":"body")[0]:G?pe.documentElement:xt},jt=function(C){return A.call(C.ownerDocument||C,C,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Pt=function(C){return C instanceof f&&(typeof C.nodeName!="string"||typeof C.textContent!="string"||typeof C.removeChild!="function"||!(C.attributes instanceof p)||typeof C.removeAttribute!="function"||typeof C.setAttribute!="function"||typeof C.namespaceURI!="string"||typeof C.insertBefore!="function"||typeof C.hasChildNodes!="function")},Bt=function(C){return typeof i=="function"&&C instanceof i};function Mt(Pe,C,pe){fo(Pe,Le=>{Le.call(t,C,pe,ae)})}let Lt=function(C){let pe=null;if(Mt($e.beforeSanitizeElements,C,null),Pt(C))return Rt(C),!0;let Le=ie(C.nodeName);if(Mt($e.uponSanitizeElement,C,{tagName:Le,allowedTags:_e}),W&&C.hasChildNodes()&&!Bt(C.firstElementChild)&&Gt(/<[/\w!]/g,C.innerHTML)&&Gt(/<[/\w!]/g,C.textContent)||C.nodeType===ls.progressingInstruction||W&&C.nodeType===ls.comment&&Gt(/<[/\w]/g,C.data))return Rt(C),!0;if(!(R.tagCheck instanceof Function&&R.tagCheck(Le))&&(!_e[Le]||Ze[Le])){if(!Ze[Le]&&nn(Le)&&(me.tagNameCheck instanceof RegExp&&Gt(me.tagNameCheck,Le)||me.tagNameCheck instanceof Function&&me.tagNameCheck(Le)))return!1;if(De&&!ot[Le]){let at=L(C)||C.parentNode,xt=te(C)||C.childNodes;if(xt&&at){let yt=xt.length;for(let v=yt-1;v>=0;--v){let y=N(xt[v],!0);y.__removalCount=(C.__removalCount||0)+1,at.insertBefore(y,K(C))}}}return Rt(C),!0}return C instanceof u&&!ut(C)||(Le==="noscript"||Le==="noembed"||Le==="noframes")&&Gt(/<\/no(script|embed|frames)/i,C.innerHTML)?(Rt(C),!0):(qe&&C.nodeType===ls.text&&(pe=C.textContent,fo([ee,Q,xe],at=>{pe=os(pe,at," ")}),C.textContent!==pe&&(ss(t.removed,{element:C.cloneNode()}),C.textContent=pe)),Mt($e.afterSanitizeElements,C,null),!1)},ze=function(C,pe,Le){if(J&&(pe==="id"||pe==="name")&&(Le in n||Le in ve))return!1;if(!(Ce&&!gt[pe]&&Gt(Oe,pe))){if(!(ue&&Gt(ne,pe))){if(!(R.attributeCheck instanceof Function&&R.attributeCheck(pe,C))){if(!we[pe]||gt[pe]){if(!(nn(C)&&(me.tagNameCheck instanceof RegExp&&Gt(me.tagNameCheck,C)||me.tagNameCheck instanceof Function&&me.tagNameCheck(C))&&(me.attributeNameCheck instanceof RegExp&&Gt(me.attributeNameCheck,pe)||me.attributeNameCheck instanceof Function&&me.attributeNameCheck(pe,C))||pe==="is"&&me.allowCustomizedBuiltInElements&&(me.tagNameCheck instanceof RegExp&&Gt(me.tagNameCheck,Le)||me.tagNameCheck instanceof Function&&me.tagNameCheck(Le))))return!1}else if(!tt[pe]){if(!Gt(X,os(Le,Ae,""))){if(!((pe==="src"||pe==="xlink:href"||pe==="href")&&C!=="script"&&k_(Le,"data:")===0&&ht[C])){if(!(Re&&!Gt(oe,os(Le,Ae,"")))){if(Le)return!1}}}}}}}return!0},nn=function(C){return C!=="annotation-xml"&&Ma(C,B)},zt=function(C){Mt($e.beforeSanitizeAttributes,C,null);let{attributes:pe}=C;if(!pe||Pt(C))return;let Le={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:we,forceKeepAttr:void 0},at=pe.length;for(;at--;){let xt=pe[at],{name:yt,namespaceURI:v,value:y}=xt,k=ie(yt),P=y,Z=yt==="value"?P:$_(P);if(Le.attrName=k,Le.attrValue=Z,Le.keepAttr=!0,Le.forceKeepAttr=void 0,Mt($e.uponSanitizeAttribute,C,Le),Z=Le.attrValue,re&&(k==="id"||k==="name")&&(ft(yt,C),Z=V+Z),W&&Gt(/((--!?|])>)|<\/(style|title|textarea)/i,Z)){ft(yt,C);continue}if(k==="attributename"&&Ma(Z,"href")){ft(yt,C);continue}if(Le.forceKeepAttr)continue;if(!Le.keepAttr){ft(yt,C);continue}if(!je&&Gt(/\/>/i,Z)){ft(yt,C);continue}qe&&fo([ee,Q,xe],Ie=>{Z=os(Z,Ie," ")});let ge=ie(C.nodeName);if(!ze(ge,k,Z)){ft(yt,C);continue}if(M&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!v)switch(w.getAttributeType(ge,k)){case"TrustedHTML":{Z=M.createHTML(Z);break}case"TrustedScriptURL":{Z=M.createScriptURL(Z);break}}if(Z!==P)try{v?C.setAttributeNS(v,yt,Z):C.setAttribute(yt,Z),Pt(C)?Rt(C):Lc(t.removed)}catch{ft(yt,C)}}Mt($e.afterSanitizeAttributes,C,null)},et=function Pe(C){let pe=null,Le=jt(C);for(Mt($e.beforeSanitizeShadowDOM,C,null);pe=Le.nextNode();)Mt($e.uponSanitizeShadowNode,pe,null),Lt(pe),zt(pe),pe.content instanceof o&&Pe(pe.content);Mt($e.afterSanitizeShadowDOM,C,null)};return t.sanitize=function(Pe){let C=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},pe=null,Le=null,at=null,xt=null;if($t=!Pe,$t&&(Pe="<!-->"),typeof Pe!="string"&&!Bt(Pe))if(typeof Pe.toString=="function"){if(Pe=Pe.toString(),typeof Pe!="string")throw as("dirty is not a string, aborting")}else throw as("toString is not a function");if(!t.isSupported)return Pe;if(Me||Je(C),t.removed=[],typeof Pe=="string"&&(Qe=!1),Qe){if(Pe.nodeName){let y=ie(Pe.nodeName);if(!_e[y]||Ze[y])throw as("root node is forbidden and cannot be sanitized in-place")}}else if(Pe instanceof i)pe=tn("<!---->"),Le=pe.ownerDocument.importNode(Pe,!0),Le.nodeType===ls.element&&Le.nodeName==="BODY"||Le.nodeName==="HTML"?pe=Le:pe.appendChild(Le);else{if(!Ge&&!qe&&!G&&Pe.indexOf("<")===-1)return M&&I?M.createHTML(Pe):Pe;if(pe=tn(Pe),!pe)return Ge?null:I?D:""}pe&&Ke&&Rt(pe.firstChild);let yt=jt(Qe?Pe:pe);for(;at=yt.nextNode();)Lt(at),zt(at),at.content instanceof o&&et(at.content);if(Qe)return Pe;if(Ge){if(ye)for(xt=U.call(pe.ownerDocument);pe.firstChild;)xt.appendChild(pe.firstChild);else xt=pe;return(we.shadowroot||we.shadowrootmode)&&(xt=be.call(r,xt,!0)),xt}let v=G?pe.outerHTML:pe.innerHTML;return G&&_e["!doctype"]&&pe.ownerDocument&&pe.ownerDocument.doctype&&pe.ownerDocument.doctype.name&&Gt(Bc,pe.ownerDocument.doctype.name)&&(v="<!DOCTYPE "+pe.ownerDocument.doctype.name+`>
`+v),qe&&fo([ee,Q,xe],y=>{v=os(v,y," ")}),M&&I?M.createHTML(v):v},t.setConfig=function(){let Pe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Je(Pe),Me=!0},t.clearConfig=function(){ae=null,Me=!1},t.isValidAttribute=function(Pe,C,pe){ae||Je({});let Le=ie(Pe),at=ie(C);return ze(Le,at,pe)},t.addHook=function(Pe,C){typeof C=="function"&&ss($e[Pe],C)},t.removeHook=function(Pe,C){if(C!==void 0){let pe=v_($e[Pe],C);return pe===-1?void 0:w_($e[Pe],pe,1)[0]}return Lc($e[Pe])},t.removeHooks=function(Pe){$e[Pe]=[]},t.removeAllHooks=function(){$e=qc()},t}var Wc=Uc();var Pn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},go=e=>(...t)=>({_$litDirective$:e,values:t}),Pr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var cs=class extends Pr{constructor(t){if(super(t),this.it=It,t.type!==Pn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===It||t==null)return this._t=void 0,this.it=t;if(t===un)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};cs.directiveName="unsafeHTML",cs.resultType=1;var zc=go(cs);function Ga(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ur=Ga();function Qc(e){ur=e}var fs={exec:()=>null};function _t(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Yt.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var q_=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Yt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},F_=/^(?:[ \t]*(?:\n|$))+/,j_=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,B_=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,_s=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,U_=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Va=/(?:[*+-]|\d{1,9}[.)])/,Xc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Jc=_t(Xc).replace(/bull/g,Va).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),W_=_t(Xc).replace(/bull/g,Va).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ka=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,z_=/^[^\n]+/,Ya=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,H_=_t(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ya).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),G_=_t(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Va).getRegex(),ko="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Za=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,V_=_t("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Za).replace("tag",ko).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),eu=_t(Ka).replace("hr",_s).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ko).getRegex(),K_=_t(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",eu).getRegex(),Qa={blockquote:K_,code:j_,def:H_,fences:B_,heading:U_,hr:_s,html:V_,lheading:Jc,list:G_,newline:F_,paragraph:eu,table:fs,text:z_},Hc=_t("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",_s).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ko).getRegex(),Y_={...Qa,lheading:W_,table:Hc,paragraph:_t(Ka).replace("hr",_s).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Hc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ko).getRegex()},Z_={...Qa,html:_t(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Za).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:fs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:_t(Ka).replace("hr",_s).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Jc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Q_=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,X_=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,tu=/^( {2,}|\\)\n(?!\s*$)/,J_=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,$o=/[\p{P}\p{S}]/u,Xa=/[\s\p{P}\p{S}]/u,nu=/[^\s\p{P}\p{S}]/u,em=_t(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Xa).getRegex(),ru=/(?!~)[\p{P}\p{S}]/u,tm=/(?!~)[\s\p{P}\p{S}]/u,nm=/(?:[^\s\p{P}\p{S}]|~)/u,rm=_t(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",q_?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),su=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,sm=_t(su,"u").replace(/punct/g,$o).getRegex(),om=_t(su,"u").replace(/punct/g,ru).getRegex(),ou="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",am=_t(ou,"gu").replace(/notPunctSpace/g,nu).replace(/punctSpace/g,Xa).replace(/punct/g,$o).getRegex(),im=_t(ou,"gu").replace(/notPunctSpace/g,nm).replace(/punctSpace/g,tm).replace(/punct/g,ru).getRegex(),lm=_t("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,nu).replace(/punctSpace/g,Xa).replace(/punct/g,$o).getRegex(),cm=_t(/\\(punct)/,"gu").replace(/punct/g,$o).getRegex(),um=_t(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),dm=_t(Za).replace("(?:-->|$)","-->").getRegex(),pm=_t("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",dm).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),yo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,fm=_t(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",yo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),au=_t(/^!?\[(label)\]\[(ref)\]/).replace("label",yo).replace("ref",Ya).getRegex(),iu=_t(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ya).getRegex(),_m=_t("reflink|nolink(?!\\()","g").replace("reflink",au).replace("nolink",iu).getRegex(),Gc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ja={_backpedal:fs,anyPunctuation:cm,autolink:um,blockSkip:rm,br:tu,code:X_,del:fs,emStrongLDelim:sm,emStrongRDelimAst:am,emStrongRDelimUnd:lm,escape:Q_,link:fm,nolink:iu,punctuation:em,reflink:au,reflinkSearch:_m,tag:pm,text:J_,url:fs},mm={...Ja,link:_t(/^!?\[(label)\]\((.*?)\)/).replace("label",yo).getRegex(),reflink:_t(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",yo).getRegex()},Wa={...Ja,emStrongRDelimAst:im,emStrongLDelim:om,url:_t(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Gc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:_t(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Gc).getRegex()},gm={...Wa,br:_t(tu).replace("{2,}","*").getRegex(),text:_t(Wa.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ho={normal:Qa,gfm:Y_,pedantic:Z_},us={normal:Ja,gfm:Wa,breaks:gm,pedantic:mm},hm={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Vc=e=>hm[e];function Mn(e,t){if(t){if(Yt.escapeTest.test(e))return e.replace(Yt.escapeReplace,Vc)}else if(Yt.escapeTestNoEncode.test(e))return e.replace(Yt.escapeReplaceNoEncode,Vc);return e}function Kc(e){try{e=encodeURI(e).replace(Yt.percentDecode,"%")}catch{return null}return e}function Yc(e,t){let n=e.replace(Yt.findPipe,(o,a,i)=>{let u=!1,d=a;for(;--d>=0&&i[d]==="\\";)u=!u;return u?"|":" |"}),r=n.split(Yt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(Yt.slashPipe,"|");return r}function ds(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function bm(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Zc(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let u={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,u}function ym(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var vo=class{constructor(e){kt(this,"options");kt(this,"rules");kt(this,"lexer");this.options=e||ur}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ds(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=ym(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=ds(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ds(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=ds(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],u;for(u=0;u<n.length;u++)if(this.rules.other.blockquoteStart.test(n[u]))i.push(n[u]),a=!0;else if(!a)i.push(n[u]);else break;n=n.slice(u);let d=i.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${d}`:d,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let w=h,x=w.raw+`
`+n.join(`
`),N=this.blockquote(x);o[o.length-1]=N,r=r.substring(0,r.length-w.raw.length)+N.raw,s=s.substring(0,s.length-w.text.length)+N.text;break}else if(h?.type==="list"){let w=h,x=w.raw+`
`+n.join(`
`),N=this.list(x);o[o.length-1]=N,r=r.substring(0,r.length-h.raw.length)+N.raw,s=s.substring(0,s.length-w.raw.length)+N.raw,n=x.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let u=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,N=>" ".repeat(3*N.length)),h=e.split(`
`,1)[0],w=!f.trim(),x=0;if(this.options.pedantic?(x=2,p=f.trimStart()):w?x=t[1].length+1:(x=t[2].search(this.rules.other.nonSpaceChar),x=x>4?1:x,p=f.slice(x),x+=t[1].length),w&&this.rules.other.blankLine.test(h)&&(d+=h+`
`,e=e.substring(h.length+1),u=!0),!u){let N=this.rules.other.nextBulletRegex(x),j=this.rules.other.hrRegex(x),K=this.rules.other.fencesBeginRegex(x),te=this.rules.other.headingBeginRegex(x),L=this.rules.other.htmlBeginRegex(x);for(;e;){let M=e.split(`
`,1)[0],D;if(h=M,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),D=h):D=h.replace(this.rules.other.tabCharGlobal,"    "),K.test(h)||te.test(h)||L.test(h)||N.test(h)||j.test(h))break;if(D.search(this.rules.other.nonSpaceChar)>=x||!h.trim())p+=`
`+D.slice(x);else{if(w||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||K.test(f)||te.test(f)||j.test(f))break;p+=`
`+h}!w&&!h.trim()&&(w=!0),d+=M+`
`,e=e.substring(M.length+1),f=D.slice(x)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let u of s.items){if(this.lexer.state.top=!1,u.tokens=this.lexer.blockTokens(u.text,[]),u.task){if(u.text=u.text.replace(this.rules.other.listReplaceTask,""),u.tokens[0]?.type==="text"||u.tokens[0]?.type==="paragraph"){u.tokens[0].raw=u.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),u.tokens[0].text=u.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(u.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};u.checked=p.checked,s.loose?u.tokens[0]&&["paragraph","text"].includes(u.tokens[0].type)&&"tokens"in u.tokens[0]&&u.tokens[0].tokens?(u.tokens[0].raw=p.raw+u.tokens[0].raw,u.tokens[0].text=p.raw+u.tokens[0].text,u.tokens[0].tokens.unshift(p)):u.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):u.tokens.unshift(p)}}if(!s.loose){let d=u.tokens.filter(f=>f.type==="space"),p=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let u of s.items){u.loose=!0;for(let d of u.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Yc(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Yc(a,o.header.length).map((i,u)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[u]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=ds(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=bm(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Zc(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Zc(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,u=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(r=d.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){u+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+u);let p=[...r[0]][0].length,f=e.slice(0,s+r.index+p+a);if(Math.min(s,a)%2){let w=f.slice(1,-1);return{type:"em",raw:f,text:w,tokens:this.lexer.inlineTokens(w)}}let h=f.slice(2,-2);return{type:"strong",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},yn=class za{constructor(t){kt(this,"tokens");kt(this,"options");kt(this,"state");kt(this,"inlineQueue");kt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||ur,this.options.tokenizer=this.options.tokenizer||new vo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Yt,block:ho.normal,inline:us.normal};this.options.pedantic?(n.block=ho.pedantic,n.inline=us.pedantic):this.options.gfm&&(n.block=ho.gfm,this.options.breaks?n.inline=us.breaks:n.inline=us.gfm),this.tokenizer.rules=n}static get rules(){return{block:ho,inline:us}}static lex(t,n){return new za(n).lex(t)}static lexInline(t,n){return new za(n).inlineTokens(t)}lex(t){t=t.replace(Yt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(Yt.tabCharGlobal,"    ").replace(Yt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let u=Object.keys(this.tokens.links);if(u.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)u.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let u;if(this.options.extensions?.inline?.some(p=>(u=p.call({lexer:this},t,n))?(t=t.substring(u.raw.length),n.push(u),!0):!1))continue;if(u=this.tokenizer.escape(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.tag(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.link(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(u.raw.length);let p=n.at(-1);u.type==="text"&&p?.type==="text"?(p.raw+=u.raw,p.text+=u.text):n.push(u);continue}if(u=this.tokenizer.emStrong(t,r,i)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.codespan(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.br(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.del(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.autolink(t)){t=t.substring(u.raw.length),n.push(u);continue}if(!this.state.inLink&&(u=this.tokenizer.url(t))){t=t.substring(u.raw.length),n.push(u);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),h;this.options.extensions.startInline.forEach(w=>{h=w.call({lexer:this},f),typeof h=="number"&&h>=0&&(p=Math.min(p,h))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(u=this.tokenizer.inlineText(d)){t=t.substring(u.raw.length),u.raw.slice(-1)!=="_"&&(i=u.raw.slice(-1)),a=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=u.raw,p.text+=u.text):n.push(u);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},wo=class{constructor(e){kt(this,"options");kt(this,"parser");this.options=e||ur}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(Yt.notSpaceStart)?.[0],s=e.replace(Yt.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Mn(r)+'">'+(n?s:Mn(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Mn(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Mn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Kc(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Mn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Kc(e);if(s===null)return Mn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Mn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Mn(e.text)}},ei=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},vn=class Ha{constructor(t){kt(this,"options");kt(this,"renderer");kt(this,"textRenderer");this.options=t||ur,this.options.renderer=this.options.renderer||new wo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ei}static parse(t,n){return new Ha(n).parse(t)}static parseInline(t,n){return new Ha(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},bo,ps=(bo=class{constructor(e){kt(this,"options");kt(this,"block");this.options=e||ur}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?yn.lex:yn.lexInline}provideParser(){return this.block?vn.parse:vn.parseInline}},kt(bo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),kt(bo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),bo),vm=class{constructor(...e){kt(this,"defaults",Ga());kt(this,"options",this.setOptions);kt(this,"parse",this.parseMarkdown(!0));kt(this,"parseInline",this.parseMarkdown(!1));kt(this,"Parser",vn);kt(this,"Renderer",wo);kt(this,"TextRenderer",ei);kt(this,"Lexer",yn);kt(this,"Tokenizer",vo);kt(this,"Hooks",ps);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new wo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],u=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=u.apply(s,d)),p||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new vo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],u=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=u.apply(s,d)),p}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new ps;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],u=s[a];ps.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&ps.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await i.call(s,d);return u.call(s,f)})();let p=i.call(s,d);return u.call(s,p)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await i.apply(s,d);return f===!1&&(f=await u.apply(s,d)),f})();let p=i.apply(s,d);return p===!1&&(p=u.apply(s,d)),p}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return yn.lex(e,t??this.defaults)}parser(e,t){return vn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?yn.lex:yn.lexInline)(a,s),u=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(u,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?vn.parse:vn.parseInline)(u,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?yn.lex:yn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?vn.parse:vn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Mn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},cr=new vm;function vt(e,t){return cr.parse(e,t)}vt.options=vt.setOptions=function(e){return cr.setOptions(e),vt.defaults=cr.defaults,Qc(vt.defaults),vt};vt.getDefaults=Ga;vt.defaults=ur;vt.use=function(...e){return cr.use(...e),vt.defaults=cr.defaults,Qc(vt.defaults),vt};vt.walkTokens=function(e,t){return cr.walkTokens(e,t)};vt.parseInline=cr.parseInline;vt.Parser=vn;vt.parser=vn.parse;vt.Renderer=wo;vt.TextRenderer=ei;vt.Lexer=yn;vt.lexer=yn.lex;vt.Tokenizer=vo;vt.Hooks=ps;vt.parse=vt;var Iv=vt.options,Pv=vt.setOptions,Mv=vt.use,Dv=vt.walkTokens,Nv=vt.parseInline;var qv=vn.parse,Fv=yn.lex;function zn(e){let t=vt.parse(e),n=Wc.sanitize(t);return zc(n)}function Dn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Mr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function xo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var cu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},wm={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},km=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,$m=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Sn(e){return!!e&&typeof e=="object"}function ti(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function ni(e,t){let n=ti(e),r=ti(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let u=s.get(i)||0;u>0?s.set(i,u-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function uu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Sn(s)&&typeof s.text=="string"?s.text:"").join(""):Sn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function xm(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:cu[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=ti(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=ni(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let u=ni(Sn(i)?i.old_string:"",Sn(i)?i.new_string:"");s+=u.added,o+=u.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function ri(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function si(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=km.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:$m.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Am(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Sm(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(Sn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(si(a.text));else if(a.type==="thinking"){let i=ri(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=xm(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?lu(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(Sn(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=uu(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?lu([s],n):[s]}return[]}function lu(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Em(e){let t=typeof e.command=="string"?e.command:"",n=uu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:cu.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Tm(e){if(e.type==="item.completed"&&Sn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[si(t.text)];if(t.type==="reasoning"){let n=ri(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Em(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Cm(e){if(e.schema!=="codex-delegation-monitor-v1"||!Sn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Sn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[si(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=ri(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=wm[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Rm(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Om(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Sn(t)?t:null}function du(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Om(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Am(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Cm(o):Rm(o)?Tm(o):Sm(o,n);return a.length>0&&(r.progress=null),a}}}function oi(e){let t=[],n=du(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Lm=5,Im=10,Pm=/Task\s+#(\d+)/,Mm=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Dm=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Ao(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Nm(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function qm(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Fm(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let u=Pm.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!u||d.length===0)continue;t.set(u[1],{label:d,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function jm(e){if(e.tool==="Bash"){let t=e.command||"";return Mm.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Dm.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Bm(e){let t=e.filter(s=>s.kind==="tool").slice(-Im),n=new Map;t.forEach((s,o)=>{let a=jm(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Um(e){let t=qm(e);if(t)return{text:t,guess:!1};let n=Fm(e);if(n)return{text:n,guess:!1};let r=Bm(e);return r?{text:r,guess:!0}:null}function Wm(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:on(e,t)}function Dr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,u=null,d=!1,p={},f=!0,h=new Set,w=new Set,x=null,N=null,j=!1,K=!1,te=!1,L=null,M=null;function D(){j=!1,K=!1,te=!1,L=null,M=null}async function z(W){if(n){K=!0,te=!1,me();try{let G=await Promise.resolve(n("get-attempt-prompt",{attempt_id:W,...u?{root_dir:u}:{}}));if(o!==W)return;!G||typeof G!="object"||Array.isArray(G)?te=!0:(L=G,M=W)}catch{o===W&&(te=!0)}finally{o===W&&(K=!1,me())}}}function A(){if(j=!j,j&&o&&M!==o){z(o);return}me()}function U(){if(!j)return"";let W=Mr({loading:K,error:te});if(W)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${W}
      </div>`;if(!L)return"";if(L.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let G=xo(L.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${G?c`<div class="prompt-block__meta">${G} 발송</div>`:""}
      ${typeof L.task_prompt=="string"?Dn("\uACFC\uC5C5 (user)",L.task_prompt):""}
      ${typeof L.system_prompt=="string"?Dn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",L.system_prompt):""}
    </div>`}function F(){if(!i||!r)return[];let W=r.get(i);return oi(W?W.lines:[])}function be(){if(!i||!r)return null;let W=r.get(i),G=W?W.last_event_at:null;return typeof G=="number"?G:null}function $e(){return p.status==="running"}function ee(){if($e()&&o){N||(N=setInterval(()=>me(),1e3));return}Q()}function Q(){N&&(clearInterval(N),N=null)}function xe(W){let G=[],Me=0;for(;Me<W.length;){let{idx:Ke,line:Ge}=W[Me];if(Ge.kind==="tool"){let ye=Me;for(;ye<W.length&&W[ye].line.kind==="tool"&&W[ye].line.tool===Ge.tool;)ye+=1;if(ye-Me>=Lm&&!w.has(Ke)){G.push({kind:"group",idx:Ke,tool:Ge.tool||"",lines:W.slice(Me,ye)}),Me=ye;continue}}G.push({kind:"line",idx:Ke,line:Ge}),Me+=1}return G}function Oe(W){let G=[],Me=new Map;for(let ye=0;ye<W.length;ye+=1){let I=W[ye],J=I.parent_tool_use_id;if(typeof J=="string"&&J.length>0){let re=Me.get(J);re||(re={kind:"subagent",idx:ye,launch_id:J,agent_type:null,header:null,lines:[]},Me.set(J,re),G.push(re)),re.lines.push({idx:ye,line:I});continue}if(I.kind==="tool"&&I.tool==="Agent"&&typeof I.launch_id=="string"&&I.launch_id.length>0){let re=ne(I),V=Me.get(I.launch_id);if(V){V.header={idx:ye,line:I},V.agent_type=re;continue}let De={kind:"subagent",idx:ye,launch_id:I.launch_id,agent_type:re,header:{idx:ye,line:I},lines:[]};Me.set(I.launch_id,De),G.push(De);continue}G.push({kind:"entry",idx:ye,line:I})}let Ke=[],Ge=0;for(;Ge<G.length;){if(G[Ge].kind!=="entry"){Ke.push(G[Ge]),Ge+=1;continue}let ye=Ge;for(;ye<G.length&&G[ye].kind==="entry";)ye+=1;Ke.push(...xe(G.slice(Ge,ye))),Ge=ye}return Ke}function ne(W){let G=W.input;return G&&typeof G.subagent_type=="string"?G.subagent_type:null}function oe(W){for(let G=W.length-1;G>=0;G-=1){let Me=W[G];if(Me.kind==="result"||Me.kind==="error")return null;if(Me.kind==="tool"&&!Object.hasOwn(Me,"result"))return Me}return null}function Ae(W){for(let G=W.length-1;G>=0;G-=1)if(W[G].kind==="thinking")return W[G];return null}function B(W,G){if(G.kind==="gate")return c`<div class="sv__gate">${G.text}</div>`;if(G.kind==="phase")return c`<div class="sv__phase">${G.text}</div>`;if(G.kind==="result")return c`<div
        class="sv__result${G.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${G.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${zn(G.text||(G.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(G.kind==="thinking"){let Me=h.has(W);return c`<div
        class="sv__think${Me?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>gt(W)}
      >
        <span class="sv__think-line">💭 ${Ao(G.text)}</span>
        ${Me?c`<pre class="sv__think-expand">${G.text}</pre>`:""}
      </div>`}if(G.kind==="error")return c`<div class="sv__error">⛔ ${G.text}</div>`;if(G.kind==="blocker")return c`<div class="sv__error">⛔ ${G.text}</div>`;if(G.kind==="tool"){let Me=h.has(W),Ke=G.tool==="Bash"?Nm(G.command):0,Ge=G.tool==="Bash"?Ke>1?Ao(G.command):G.command:G.path||G.command||"";return c`<div
        class="sv__tool${Me?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>gt(W)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${G.icon}</span>
          <span class="sv__tool-name">${G.tool}</span>
          ${Ge?c`<span class="sv__tool-detail">${Ge}</span>`:""}
          ${Ke>1?c`<span class="sv__tool-more">⋯ ${Ke}줄</span>`:""}
          ${typeof G.added=="number"?c`<span class="sv__diff-add">+${G.added}</span>`:""}
          ${typeof G.removed=="number"?c`<span class="sv__diff-del">−${G.removed}</span>`:""}
          ${G.result?c`<span class="sv__tool-ok">→ ${G.result}</span>`:""}
        </span>
        ${Me?c`<pre class="sv__tool-expand">${X(G)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${zn(G.text||"")}</div>`}function X(W){let G=[];if(W.tool==="Bash"&&typeof W.command=="string"&&W.command.length>0)G.push(W.command);else if(W.input!==void 0)try{G.push(`input: ${JSON.stringify(W.input,null,2)}`)}catch{}return typeof W.output=="string"&&W.output.length>0&&G.push(`output:
${W.output}`),G.join(`

`)}function _e(){if(!o)return c``;let W=F(),G=(a?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),Me=p.session_id||"",Ke=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${f?"ON":"OFF"}`,Ge=$e(),ye=Ge?Wm(be(),Date.now()):"",I=Ge?oe(W):null,J=Ge?Ae(W):null,re=Um(W);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?p.role||"":o}</span>
        ${re?c`<span
              class="sv__stage${re.guess?" sv__stage--guess":""}"
              title=${re.text}
              >${re.text}</span
            >`:""}
        ${Ge?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ye?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ye}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ye?c`<span class="sv__live-ago">${ye}</span>`:""}</span
            >`:""}
        ${Me?c`<button
              type="button"
              class="sv__session"
              title=${Me}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Me}`}
              @click=${()=>ue(Me)}
            >
              ⧉ ${Me.slice(0,8)}
            </button>`:""}
        ${G?c`<span class="sv__meta">${G}</span>`:""}
        ${p.worktree?c`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${a||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${j?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${j?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${A}
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
          @click=${()=>qe()}
        >
          ✕
        </button>
      </div>
      ${a||d?"":U()}
      <div class="sv__body">
        ${W.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:Oe(W).map(V=>V.kind==="subagent"?we(V):V.kind==="group"?ke(V):B(V.idx,V.line))}
      </div>
      ${I||J?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${I?c`<span class="sv__now-icon">${I.icon}</span>
                  <span class="sv__now-name">${I.tool}</span>
                  <span class="sv__now-detail"
                    >${I.tool==="Bash"?Ao(I.command):I.path||I.command||""}</span
                  >`:""}
            ${J?c`<span class="sv__now-think"
                  >💭 ${Ao(J.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ke(W){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Ue(W.idx)}
    >
      <span class="sv__group-icon">${W.lines[0].line.icon}</span>
      <span class="sv__group-name">${W.tool}</span>
      <span class="sv__group-count">${W.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function we(W){let G=w.has(W.idx),Me=W.header?W.header.line:null,Ke=Me?Me.is_error===!0?"\u2717":typeof Me.result=="string"?"\u2713":"\u27F3":"",Ge=Me&&Me.command?Me.command:"";return c`<div class="sv__sub${G?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ue(W.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${W.agent_type||"subagent"}</span>
        ${Ge?c`<span class="sv__sub-detail">${Ge}</span>`:""}
        <span class="sv__sub-count">${W.lines.length}줄</span>
        ${Ke?c`<span class="sv__sub-state">${Ke}</span>`:""}
        ${G?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${G?c`<div class="sv__sub-body">
            ${xe(W.lines).map(ye=>ye.kind==="group"?ke(ye):B(ye.idx,ye.line))}
          </div>`:""}
    </div>`}function Ue(W){w.add(W),me()}function me(){Ve(_e(),e),ee(),f&&Ze()}function Ze(){let W=e.querySelector(".sv__body");W&&(W.scrollTop=W.scrollHeight)}function gt(W){h.has(W)?h.delete(W):h.add(W),me()}function R(){f=!f,me()}function ue(W){an(W).then(G=>{G?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ce(W){!o||!W||(p={...p,...W},me())}function Re(W){let G=W.target;if(!G||!G.classList||!G.classList.contains("sv__body"))return;!(G.scrollHeight-G.scrollTop-G.clientHeight<=4)&&f&&(f=!1,me())}e.addEventListener("scroll",Re,!0);function je(W){let G=W&&W.attempt_id;if(!G)return;let Me=i;o=G,a=typeof W.launch_id=="string"&&W.launch_id.length>0?W.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&Me&&Me!==i&&Promise.resolve(n("unsubscribe-session-log",{id:Me})).catch(()=>{}),u=typeof W.root_dir=="string"&&W.root_dir.length>0?W.root_dir:null,p=W.meta||{},d=W.hide_prompt===!0,f=!0,h.clear(),w.clear(),D(),!x&&r&&(x=r.subscribe(me)),n&&Promise.resolve(n("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...u?{root_dir:u}:{}})).catch(()=>{}),me()}function qe(){let W=i;o=null,a=null,i=null,u=null,d=!1,h.clear(),w.clear(),D(),Q(),n&&W&&Promise.resolve(n("unsubscribe-session-log",{id:W})).catch(()=>{}),Ve(c``,e),s&&s()}return{open:je,updateMeta:Ce,close:qe,isOpen(){return o!==null},destroy(){Q(),x&&(x(),x=null),e.removeEventListener("scroll",Re,!0),o=null,a=null,i=null,u=null,d=!1,Ve(c``,e)}}}function So(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=ai(t.spec_id),s=ai(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function ai(e){return typeof e=="string"?e.trim():""}function pu(e){let t=So(e);if(t.path)return t;let n=ai(zm(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function zm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function Hm(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Gm(e){let t=e&&e.metadata||{},n=pu(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Hm(t)?null:"plan_pending"}),r}function fu(e,t){let n=Gm(e);return c`
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
  `}var Vm="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Km=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Ym=/^\*\*결론\*\* — (.+)$/;function Eo(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Vm)return null;let n=Km.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Ym.exec(t[a]):null,u=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:u,body:t.slice(d).join(`
`).trim()}}var _u=20;function mu(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Zm(e){return e.length>_u?`${e.slice(0,_u)}\u2026`:e}function Qm(e,t,n,r){let s=`${t.lane} ${Zm(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${mu(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${zn(t.body)}
        </div>`:""}
  </div>`}function Xm(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${mu(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${zn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function gu(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((u,d)=>String(d.created_at||"").localeCompare(String(u.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(u=>{let d=Eo(typeof u.text=="string"?u.text:"");return d?Qm(u,d,t,s.has(u.id)):Xm(u)})}
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
  `}var{I:vw}=Ml;var hu=e=>e.strings===void 0;var Jm={},bu=(e,t=Jm)=>e._$AH=t;var dr=go(class extends Pr{constructor(e){if(super(e),e.type!==Pn.PROPERTY&&e.type!==Pn.ATTRIBUTE&&e.type!==Pn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!hu(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===un||t===It)return t;let n=e.element,r=e.name;if(e.type===Pn.PROPERTY){if(t===n[r])return un}else if(e.type===Pn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return un}else if(e.type===Pn.ATTRIBUTE&&n.getAttribute(r)===t+"")return un;return bu(e),t}});var To=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],li=[...To.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Nn=["orchestration_model","orchestration_effort","orchestration_speed"],Co=[...To,...Nn],eg=li.filter(e=>Co.includes(e)),yu=["delegated","main"],Ro=["inherit","claude","codex"],ms=["default","fast"],gs=["standard","fast_track"],hs=["codex","opus","fable","self","skip"],Oo=["codex","fable","skip"],Lo=["low","medium","high","xhigh"],cn="auto";function ln(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function vu(e){if(!ln(e)||!ln(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))ln(r)&&ln(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Nr(e,t){let n=vu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[cn,...r.flatMap(([,s])=>s)]}function wu(e,t,n,r){if(!ln(e)||!ln(e.runners))return[cn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!ln(a)||!ln(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,u]of Object.entries(a.models)){if(n&&n!==cn&&i!==n)continue;let d=r(a,u);if(Array.isArray(d))for(let p of d)typeof p=="string"&&!s.includes(p)&&s.push(p)}return[cn,...s]}function qr(e,t,n){return wu(e,t,n,(r,s)=>ln(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function ci(e,t,n){return wu(e,t,n,(r,s)=>ln(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:ln(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function bs(e,t){let n=vu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function ku(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Nr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!qr(t,s,r.impl_model||cn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var tg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},ii=[...eg,...Nn],ng=[...Co,...li].filter((e,t,n)=>n.indexOf(e)===t&&!ii.includes(e));function $u(e,t){let n=ln(e)?e:{},r=ln(t)?t:{},s=[];for(let a of ii){let i=n[a]??null,u=r[a]??null;i!==u&&s.push({key:a,label:tg[a]||a,before:i,after:u,kind:i===null?"added":u===null?"removed":"changed"})}let o=[];for(let a of[...ng,...Object.keys(r)])!ii.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function ui(e,t,n,r,s,o){return co({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function xu(e,t){let n={};for(let r of li){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function Au(e,t){let n={};for(let r of Nn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var di=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Nn]}],Hn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Io={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function pi(e,t,n,r,s,o=null){let a=Jt({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Su(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of pi(e,t,n,r,s,o))a[i.source]+=1;return a}function Eu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Tu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Ow=[...To,...Nn];var rg=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],sg={pin:"pin",global:"global",base:"base"};function og(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${sg[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function ag(e,t,n){switch(e){case"workflow_mode":return gs;case"spec_review_model":case"impl_review_model":return hs;case"plan_review_model":return Oo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Lo;case"impl_dispatch":return yu;case"impl_runtime":return Ro;case"impl_model":return Nr(n,t.impl_runtime);case"impl_effort":return qr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return ms;case"orchestration_model":return bs(n,null);case"orchestration_effort":return qr(n,void 0,t.orchestration_model||cn).filter(r=>r!==cn);default:return[]}}function ig(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${og(e.source)}
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
      >${Io[e.source]}</span
    >
    ${t.expanded?c`<select
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
          ${t.options.map(n=>c`<option
                value=${n.value}
                title=${n.full_value||""}
                ?selected=${e.source==="pin"&&e.value===n.value}
              >
                ${n.label}
              </option>`)}
        </select>`:""}
  </div>`}function Cu(e,t){let n=di.flatMap(u=>u.keys),r=pi(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Su(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(u=>[u.key,u])),a=Object.fromEntries(r.filter(u=>u.value!==null).map(u=>[u.key,u.value])),i=r.filter(u=>u.full_value&&u.display!==u.full_value).map(u=>u.full_value).join(" \xB7 ");return c`<details
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
        >${lg(o)}</span
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
          ${di.map(u=>c`
              <div class="detail-effective__subhead">${u.label}</div>
              ${r.filter(d=>u.keys.includes(d.key)).map(d=>{let p=co({key:d.key,choices:ag(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return ig(d,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${dr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${u=>t.onPresetSelect(String(u.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(u=>c`<option
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
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function lg(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function cg(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Ru(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=cg(n.exec_receipt),u=i?Cn(i):a,d=i?`${i.kind}:${i.actor}`:a.split("@")[0],p=io(n.planned_execution,n.exec_receipt);return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${p?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
          >`:""}
      ${u?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${u}
            >${d}${i?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${i.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${rg.map(f=>{let h=f.receipt&&typeof t[f.receipt]=="string"?String(t[f.receipt]):"",w=r[f.id],x=h.length>0||w?.fill==="full",N=!x&&w?.fill==="dim",j=w?.stale===!0;return c`<span
          class=${`detail-summary__gate${x?" detail-summary__gate--on":""}${N?" detail-summary__gate--current":""}${j?" detail-summary__gate--stale":""}`}
          data-gate=${f.id}
        >
          <span class="detail-summary__gate-pill">${f.label}</span>
          ${h?c`<span class="detail-summary__gate-sha"
                >${h.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function Pu(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ou(e){return Pu(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Lu(e,t){let n=e&&e[t];if(!Pu(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Ou),s=Ou(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function Mu(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function ug(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Mu(e)}${t}`}function Du(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Mu(e)}`}function dg(e,t){return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Du({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Iu(e){let t=e.provider_key==="claude"?ug:Du,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${dg(e.provider_key,e.provider)}
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
  </div>`}function Nu({md:e,catalog:t,handlers:n}){let r=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Iu({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Lu(t,"claude"),selected:r,handlers:n,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Iu({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Lu(t,"codex"),selected:s,handlers:n})}
    </div>
  </section>`}var qu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function ys(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Po(e){if(!ys(e)||!ys(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>ys(n)&&ys(n.models));return t.length>0?t:null}function wn(e,t){let n=Po(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Fu(e,t){return ys(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function ju(e,t){let n=Po(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Fu(r,r.models[t]);return[]}function pg(e){let t=Po(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Fu(r,s))n.includes(o)||n.push(o);return n}function fg(e,t){if(!t)return pg(e);let r=Po(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of ju(e,o))s.includes(a)||s.push(a);return s}function Bu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=wn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?ju(t,r.impl_model):fg(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function _g(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function mg(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Mo(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,u="";function d(N){N.key==="Escape"&&s&&(N.preventDefault(),w())}document.addEventListener("keydown",d);function p(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>w()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${_g(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${u}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${u||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${i===null?null:c`<pre class="mv__front">
${i}</pre
                        >`}${zn(a)}`}
          </div>
        </div>
      </div>
    `:c``}function f(){Ve(p(),e)}async function h(N,j={}){s=N,o="loading",a="",i=null,u="",f();let K=j.workspace||(n?n():"");if(!K){o="error",u="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){o="error",u="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let te="/api/doc?workspace="+encodeURIComponent(K)+"&path="+encodeURIComponent(N);try{let L=await r(te),M=await L.json().catch(()=>({}));if(!L.ok||!M||M.ok!==!0){if(M?.error==="not_found"&&j.missing_state==="plan_pending"){o="pending",u="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",u="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(M&&M.error||L.status)+")",f();return}let D=mg(String(M.content||""));i=D.front,a=D.body,o="ready",f()}catch{o="error",u="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function w(){s=null,Ve(c``,e)}function x(){document.removeEventListener("keydown",d),w()}return{open:h,close:w,destroy:x}}var gg=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],zu="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Do=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],hg=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Uu(e){return typeof e=="string"&&hg.has(e)}var bg=["running","done","failed","interrupted"],yg={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function vg(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function wg(e){let t=Wt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Ir(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${zu}
          >부분 집계</span
        >`:""}`}function Wu(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function mi(e){if(typeof e=="number")return No(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?No(t):""}function kg(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function $g(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function fi(e){return e===null||typeof e=="string"&&e.trim().length>0}function _i(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function xg(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Do.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?fi(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||fi(t.effort))||!(!("agent_type"in t)||fi(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!bg.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!_i(t.started_at)||!_i(t.last_event_at)||!_i(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Ag(e,t,n){let s=Wt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${mi(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${mi(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Sg(e,t,n,r){let s=e.status==="running"?null:t,a=(s?Wt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?No(e.last_event_at):s?mi(s.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,kg(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=$g(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${yg[e.status]}</span
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
    ${i?c`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?c`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function Eg(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Tg(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let f=xg(p);!f||s.has(f.launch_id)||Uu(f.agent_type)||(s.add(f.launch_id),r.push(f))}r.sort((p,f)=>(p.started_at||0)-(f.started_at||0));let a={};for(let{role:p,provider:f}of Do){let h=t?t.roles[p]?.[f]:null;a[p]=h?[...h.legs]:[]}let i=Do.flatMap(({role:p})=>a[p]),u=new Set,d=[];for(let{role:p,provider:f}of Do){for(let h of r.filter(w=>w.role===p&&w.provider===f)){let w=i.find(x=>x.receipt_id===h.launch_id)||null;w&&!Eg(h,w)||(w&&u.add(w.receipt_id),d.push(Sg(h,w,e.attempt_id,n)))}for(let h of a[p])!u.has(h.receipt_id)&&!Uu(h.agent_type)&&d.push(Ag(p,f,h))}return d}function Cg(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...gg,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${vg(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${zu}</span>`:""}
  </div>`}var Rg={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function No(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Og(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Hu(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of r)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let f=typeof d.session_id=="string"&&d.session_id.length>0,h=o.has(d.attempt_id),w=f&&!h,x=f?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!w}
      title=${x}
      @click=${N=>{N.stopPropagation(),w&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let f=d.cause_detail,h=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:d.cause;return c`<div class="detail-session__cause" title=${h}>
      ${d.cause}
    </div>`},u=d=>{let p=Wu(Ia(d));if(Wt(p).length===0&&!Ir(d.usage))return"";let f=s.has(d.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${wg(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(d=>{let p=Ia(d),f=Wu(p),h=Wt(f);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Rg[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${es(d)?c`<span
                  class="detail-session__resumed"
                  title=${es(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${lr(d)}</span>
            ${h.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?c`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(w=>c`<span
                      class="detail-session__usage"
                      title=${w.tooltip}
                      >${w.label}</span
                    >`):Ir(d.usage)?c`<span class="detail-session__usage"
                    >${Ir(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${No(d.started_at)}</span>
          </button>
          ${u(d)} ${a(d)} ${i(d)} ${Og(d)}
          ${s.has(d.attempt_id)&&d.usage?Cg(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${Tg(d,p,t)}
        </div>`})}
    </div>
  `}function Gu(e,t={}){return c`
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
          ${Lg(e)}
        </div>`:""}
  `}function Lg(e){let t=Mr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Dn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=xo(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Dn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Dn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Ig=["open","in_progress","deferred","resolved","closed"],Pg=[0,1,2,3,4];function Vu(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,u=t.sessionLogStore,d=null,p=null,f={},h="",w=!1,x=[],N=!1,j={},K={claude:null,codex:null},te=null,L=0,M=!1,D=!1,z="",A="",U="";function F(){M=!1,D=!1,z="",A="",U=""}function be(){K={claude:null,codex:null},te=null,L+=1}async function $e(l){try{let _=await fetch(l);if(!_.ok)return null;let g=await _.json();if(!g||typeof g!="object"||!Array.isArray(g.accounts))return null;let O=g.accounts.filter(fe=>fe!==null&&typeof fe=="object"&&!Array.isArray(fe));return{accounts:O,active:O.find(fe=>fe.active===!0)||null}}catch{return null}}async function ee(l){te=l;let _=++L,[g,O]=await Promise.all([$e("/api/claude-usage"),$e("/api/codex-usage")]);_!==L||l!==d||(K={claude:g,codex:O},ce())}let Q=[],xe=null,Oe=null,ne=!1,oe="",Ae=!1,B=0,X=new Set;function _e(){Q=[],xe=null,Oe=null,ne=!1,oe="",Ae=!1,B+=1,X.clear()}async function ke(l){if(!s)return;let _=++B;try{let g=await Promise.resolve(s("get-comments",{id:l}));if(_!==B||l!==d)return;Q=Array.isArray(g)?g:[],ne=!1}catch{if(_!==B||l!==d)return;ne=!0}ce()}function we(){if(!s||!d)return;let l=p&&typeof p.comment_count=="number"?p.comment_count:null;if(xe!==d){xe=d,Oe=l,ke(d);return}l!==null&&l!==Oe&&(Oe=l,ke(d))}function Ue(l){X.has(l)?X.delete(l):X.add(l),ce()}function me(l){let _=oe.trim().length===0;oe=l,_!==(l.trim().length===0)&&ce()}async function Ze(){let l=oe.trim();if(!s||!d||l.length===0||Ae)return;let _=d;Ae=!0,ce();let g=!1;try{let O=await Promise.resolve(s("add-comment",{id:_,text:l}));Array.isArray(O)&&O.length>0&&(g=!0,_===d&&(Q=O,ne=!1,oe="",Oe=O.length))}catch{g=!1}g||de("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),_===d&&(Ae=!1),ce()}let gt={onToggle:Ue,onDraftInput:me,onSubmit:Ze},R=t.mdViewer||null,ue=null;R||(ue=document.createElement("div"),ue.className="md-viewer-root",document.body.appendChild(ue));let Ce=R||Mo(ue,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Re=document.createElement("div");Re.className="session-log-root",document.body.appendChild(Re);let je=Dr(Re,{transport:s?(l,_)=>Promise.resolve(s(l,_)):void 0,sessionLogStore:u}),qe=!1,W=!1,G=!1,Me=null,Ke=null,Ge=0;function ye(l){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${l}`}function I(){qe=!1,W=!1,G=!1,Me=null,Ke=null,Ge+=1}async function J(l){if(!s)return;let _=++Ge;W=!0,G=!1,ce();try{let g=await Promise.resolve(s("get-bead-prompt",{bead_id:l}));if(_!==Ge)return;!g||typeof g!="object"||Array.isArray(g)?G=!0:(Me=g,Ke=ye(l))}catch{_===Ge&&(G=!0)}finally{_===Ge&&(W=!1,ce())}}function re(){if(qe=!qe,qe&&d&&Ke!==ye(d)){Me=null,J(d);return}ce()}function V(){if(!a||!d)return[];let l=a.get();return(l&&l.attempts?Object.values(l.attempts):[]).filter(g=>g&&g.bead_id===d).sort((g,O)=>(O.started_at||0)-(g.started_at||0)).map(g=>({attempt_id:g.attempt_id,bead_id:g.bead_id,status:g.status,started_at:typeof g.started_at=="number"?g.started_at:null,runner:g.runner||null,model:g.model||null,effort:g.effort||g.observed_effort||null,speed:g.speed||null,session_id:g.session_id||null,resumed_from:g.resumed_from||null,continuation_mode:g.continuation_mode||null,dismissed_at:typeof g.dismissed_at=="number"?g.dismissed_at:null,cause:typeof g.cause=="string"?g.cause:null,cause_detail:g.cause_detail||null,exec_default_preset_id:typeof g.exec_default_preset_id=="string"?g.exec_default_preset_id:null,exec_default_preset_revision:typeof g.exec_default_preset_revision=="number"?g.exec_default_preset_revision:null,exec_values:g.exec_values&&typeof g.exec_values=="object"?g.exec_values:null,usage:g.usage||null,usage_legs:Array.isArray(g.usage_legs)?g.usage_legs:[],delegation_sessions:Array.isArray(g.delegation_sessions)?g.delegation_sessions:[]}))}function De(){if(!a||!d)return null;let l=a.get();return pn(l&&l.attempts||{},d)}let Qe=new Set;function lt(l){Qe.has(l)?Qe.delete(l):Qe.add(l),ce()}function ot(l){let _=a?a.get():null,g=_&&_.attempts?_.attempts[l]:null;je.open({attempt_id:l,meta:g?{runner:g.runner||void 0,model:g.model||void 0,effort:g.effort||void 0,status:g.status||void 0,session_id:g.session_id||void 0}:{}})}function ct(l,_){let g=a?a.get():null,O=g&&g.attempts?g.attempts[l]:null,Te=(O&&Array.isArray(O.delegation_sessions)?O.delegation_sessions:[]).find(Ee=>Ee&&typeof Ee=="object"&&Ee.launch_id===_);Te&&je.open({attempt_id:l,launch_id:_,meta:{runner:Te.provider==="claude"?"claude":"codex",role:Te.role,...typeof Te.agent_type=="string"?{agent_type:Te.agent_type}:{},model:Te.model,effort:Te.effort,session_id:Te.session_id,status:Te.status}})}async function ht(l){if(!s||!l)return;let _=await Lr();if(_===null)return;let g=()=>{let Ee=a?a.get():null;return Ee&&typeof Ee.revision=="number"?Ee.revision:0},O=async(Ee={},Be=g())=>await s("worker-attempt-resume",{attempt_id:l,expected_revision:Be,..._!==""?{instructions:_}:{},...Ee}),fe=Ee=>{Ee?.queue&&a?.set&&a.set(Ee.queue)},Te=await O();if(fe(Te),Te&&Te.conflict){let Ee=Te.queue&&typeof Te.queue.revision=="number"?Te.queue.revision:g();Te=await O({},Ee),fe(Te)}Te=await Rn(Te,(Ee,Be)=>O({continuation:Ee,decision_token:Be}),{onResult:fe,refresh:()=>O()}),Te&&Te.resumed===!1&&!Te.conflict&&Te.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Te.reason}`,"error",2400)}let bt={onOpen:ot,onOpenDelegation:ct,onResume:ht,onToggleUsage:lt};function tt(){let l=a?a.get():null,_={...j};for(let g of["orchestration_model","orchestration_effort","orchestration_speed"]){let O=l&&l[g];typeof O=="string"&&(_[g]=O)}return _}async function Tt(){if(s){try{let l=await Promise.resolve(s("get-session-defaults",{}));j=l&&l.values&&typeof l.values=="object"?l.values:{}}catch{j={}}ce()}}function wt(){let l=a?a.get():null;return l&&l.runner_catalog||null}function He(){let l=a?a.get():null;return l&&typeof l.execution_defaults=="object"?l.execution_defaults:null}function he(){let l=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},g=Jt({pin:{...l,...f},global:tt(),execution_defaults:He(),runner_catalog:wt(),route:typeof l.route=="string"?l.route:null}).orchestration_model.value||"";return wn(wt(),g)}function mt(){let l=i?i.get():null;return!l||typeof l.revision!="number"?null:{revision:l.revision,presets:Array.isArray(l.presets)?l.presets:[]}}function $t(l){return l?.compatible===!1}function nt(l){i&&l&&typeof l.revision=="number"&&Array.isArray(l.presets)&&i.set({revision:l.revision,presets:l.presets})}async function Y(){let l=mt(),_=l?.presets.find(g=>g.id===h);if(!(!s||!d||!l||!_||$t(_)||w)){w=!0,x=[],ce();try{let g=await Promise.resolve(s("apply-impl-preset",Tu(d,_.id,l.revision)));if(g&&g.conflict){nt(g),de("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let O=g&&Array.isArray(g.issue)?g.issue[0]:g?.issue;if(g&&g.applied&&O&&typeof O=="object"){p=O,x=Array.isArray(g.skipped_orchestration_keys)?g.skipped_orchestration_keys.filter(fe=>typeof fe=="string"):[];for(let fe of qu)delete f[fe];de(x.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}g&&g.error==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(g){g&&typeof g=="object"&&g.code==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{w=!1,ce()}}}let le=null;n&&n.subscribe&&(le=n.subscribe(()=>S()));let Ne=null;a&&typeof a.subscribe=="function"&&(Ne=a.subscribe(()=>{d&&ce()}));let E=null;i&&typeof i.subscribe=="function"&&(E=i.subscribe(()=>{d&&ce()}));function b(l){l.key==="Escape"&&d&&(l.preventDefault(),r())}document.addEventListener("keydown",b);function S(){if(d){if(n&&typeof n.snapshotFor=="function"){let l=n.snapshotFor("detail:"+d)||[];p=l.find(g=>g&&g.id===d)||l[0]||p}we(),ce()}}function H(l){an(l).then(_=>{_?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ie(l){l.preventDefault(),l.stopPropagation(),d&&H(d)}function ae(l,_){l.preventDefault(),l.stopPropagation(),H(_)}function ve(l,_,g){l.preventDefault(),l.stopPropagation(),Ce.open(_,{missing_state:g})}function Se(l,_){f[l]=_,ce(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",Eu(d,l,_.length===0?null:_))).catch(()=>{de("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Je(l,_){let g=p||{},O=g.metadata&&typeof g.metadata=="object"?g.metadata:{},fe={};for(let Be of["impl_runtime","impl_model","impl_effort"])fe[Be]=Object.hasOwn(f,Be)?f[Be]:typeof O[Be]=="string"?O[Be]:"";fe[l]=_;let Te=Bu(fe,wt(),he()),Ee={};for(let Be of["impl_runtime","impl_model","impl_effort"])Ee[Be]=f[Be],f[Be]=Te[Be]||"";ce(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...Te,orchestration_runtime:he()})).then(Be=>{let dt=Array.isArray(Be)?Be[0]:Be;if(!dt||typeof dt!="object"||!dt.id)throw new Error("implementation target readback failed");p=dt;for(let Ut of["impl_runtime","impl_model","impl_effort"])delete f[Ut];ce()}).catch(()=>{for(let Be of["impl_runtime","impl_model","impl_effort"])Ee[Be]===void 0?delete f[Be]:f[Be]=Ee[Be];ce(),de("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function rt(l,_,g){if(!s||!d)return!1;try{let O=await Promise.resolve(s(l,_)),fe=Array.isArray(O)?O[0]:O;return fe&&typeof fe=="object"&&fe.id?(p=fe,!0):(de(g,"error"),!1)}catch{return de(g,"error"),!1}}function Ye(l){setTimeout(()=>{try{let _=e.querySelector(l);_&&typeof _.focus=="function"&&_.focus()}catch{}},0)}function ut(){M=!0,z=p&&p.title||"",ce(),Ye('.detail-edit__input[data-edit="title"]')}function Rt(l){z=l.target.value}function ft(){M=!1,z="",ce()}function tn(){rt("edit-text",{id:d,field:"title",value:z},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(_=>{_&&(M=!1,z=""),ce()})}function jt(){D=!0,A=p&&p.description||"",ce(),Ye('.detail-edit__textarea[data-edit="description"]')}function Pt(l){A=l.target.value}function Bt(){D=!1,A="",ce()}function Mt(){rt("edit-text",{id:d,field:"description",value:A},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(_=>{_&&(D=!1,A=""),ce()})}function Lt(l,_,g,O){if(l.key==="Escape"){l.stopPropagation(),g();return}l.key==="Enter"&&(!O||l.ctrlKey||l.metaKey)&&(l.preventDefault(),_())}function ze(l){let _=l.target.value;rt("update-status",{id:d,status:_},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ce())}function nn(l){let _=Number(l.target.value);rt("update-priority",{id:d,priority:_},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ce())}function zt(l){U=l.target.value}function et(){let l=U.trim();l.length!==0&&rt("label-add",{id:d,label:l},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(_=>{_&&(U=""),ce()})}function Pe(l){if(l.key==="Escape"){l.stopPropagation(),U="",ce();return}l.key==="Enter"&&(l.preventDefault(),et())}function C(l){rt("label-remove",{id:d,label:l},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ce())}let pe={onCopyPath:ae,onOpenDoc:ve};function Le(l){return typeof l=="string"?l:l&&typeof l=="object"?String(l.id||l.to||l.issue_id||l.depends_on||""):""}function at(l){switch(l&&typeof l=="object"?String(l.dependency_type||l.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function xt(l){let g=(Array.isArray(l.dependencies)?l.dependencies:[]).map(O=>({id:Le(O),icon:at(O)})).filter(O=>O.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${g.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${g.map(O=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(O.id)}
                  >
                    ${O.icon?`${O.icon} `:""}${O.id}
                  </button>`:c`<span class="detail-dep"
                    >${O.icon?`${O.icon} `:""}${O.id}</span
                  >`)}
          </div>`}
    `}function yt(l){let _=l.metadata||{},g=l.workflow||{},O=g.stages||{},fe=O.spec&&O.spec.stale,Te=O.impl&&O.impl.stale,Ee=O.plan||null,Be=g.route_source==="derived",dt=g.route||_.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Be?" detail-kv__v--derived":""}"
          title=${Be?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Be?"unset":dt}</span
        >
      </div>
      ${g.route!=="quick_fix"||Object.hasOwn(_,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${_.spec_review||"\uC5C6\uC74C"}${fe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${g.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ee?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ee?.approval_receipt||"\uC5C6\uC74C"}${Ee?.approval_state==="stale"?" \xB7 stale":Ee?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${g.route!=="quick_fix"||Object.hasOwn(_,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${_.impl_review||"\uC5C6\uC74C"}${Te?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${g.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${g.planned_execution.kind}</span>
            </div>
            ${g.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${g.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${g.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Cn(g.exec_receipt)}</span
            >
          </div>`:""}
      ${g.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${g.impl_entry.actor}@${g.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${_.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${_.pr_url}</span>
          </div>`:""}
    `}let v={route:["quick_fix","spec_backed","full_plan"]};async function y(l,_){let g=_.target.value;if(l==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&g!=="full_plan"&&!window.confirm(`full_plan \u2192 ${g||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ce();return}await rt("update-workflow-meta",{id:d,key:l,value:g},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ce()}function k(l){let _=l.metadata||{};return c` ${((O,fe)=>{let Te=v[O],Ee=typeof _[O]=="string"?_[O]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${O}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${O}
          data-edit=${`wfmeta-${O}`}
          @change=${Be=>y(O,Be)}
        >
          <option value="" ?selected=${!Te.includes(Ee)}>
            ${fe}
          </option>
          ${Te.map(Be=>c`<option value=${Be} ?selected=${Ee===Be}>${Be}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function P(l,_){return M?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${z}
            @input=${Rt}
            @keydown=${g=>Lt(g,tn,ft,!1)}
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
              @click=${ft}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${l}</h2>
        ${Wt(_).map(g=>c`<span class="detail-usage-total" title=${g.tooltip}
              >${g.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ut}
        >
          ✎
        </button>
      </div>
    `}function Z(l){let _=Ht(l.created_at),g=Ht(l.updated_at);return!_&&!g?c``:c`
      ${_?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${_}</span>
          </div>`:""}
      ${g?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${g}</span>
          </div>`:""}
    `}function ge(l,_){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ze}
        >
          ${Ig.map(g=>c`<option value=${g} ?selected=${g===l}>${g}</option>`)}
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
          ${Pg.map(g=>c`<option value=${String(g)} ?selected=${g===_}>
                P${g}
              </option>`)}
        </select>
      </div>
    `}function Ie(l){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${D?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${jt}
            >
              ✎
            </button>`}
      </div>
      ${D?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${A}
              @input=${Pt}
              @keydown=${_=>Lt(_,Mt,Bt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Mt}
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
          </div>`:c`<div class="detail-overlay__desc">
            ${l||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Xe(l){let _=typeof l.notes=="string"?l.notes:"";return _.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${_}</div>
    `}function $(l){let _=Array.isArray(l.labels)?l.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${_.map(g=>c`<span class="detail-label-chip"
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
            @input=${zt}
            @keydown=${Pe}
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
    `}function T(){if(!d)return c``;let l=p||{},_=String(l.id||d),g=l.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",O=De(),fe=l.status||"open",Te=typeof l.priority=="number"?Math.max(0,Math.min(4,l.priority)):"",Ee=l.description||"",Be={...l,metadata:{...l.metadata||{},...f}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${ie}
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
          ${P(g,O)}
          ${Ru(Be)}
          ${Cu({metadata:Be.metadata,workspace_values:tt(),catalog:wt(),execution_defaults:He(),expanded:N,presets:mt()?.presets||[],preset_id:h,preset_busy:w,skipped_orchestration_keys:x},{onToggle:dt=>{N=dt,ce()},onEdit:(dt,Ut)=>{if(dt==="impl_runtime"||dt==="impl_model"||dt==="impl_effort"){Je(dt,Ut??"");return}Se(dt,Ut??"")},onPresetSelect:dt=>{h=dt,x=[],ce()},onPresetApply:()=>{Y()}})}
          ${Nu({md:Be.metadata,catalog:K,handlers:{onExecChange:Se}})}
          ${ge(fe,Te)} ${Z(l)}
          ${Ie(Ee)}
          ${gu(Q,gt,{expanded:X,draft:oe,sending:Ae,error:ne})}
          ${Xe(l)} ${$(l)} ${xt(l)}
          ${yt(l)} ${k(l)}
          ${fu(l,pe)}
          ${Gu({expanded:qe,loading:W,error:G,data:Me},{onToggle:re})}
          ${Hu(V(),bt,{total:O,expanded:Qe})}
        </div>
      </div>
    `}function ce(){Ve(T(),e)}return{load(l){l!==d&&(f={},h="",x=[],N=!1,F(),_e(),I(),be()),d=l,p=null,S(),Tt(),te!==l&&ee(l)},clear(){d=null,p=null,f={},h="",w=!1,x=[],N=!1,F(),_e(),I(),be(),Ce.close(),je.close(),Ve(c``,e)},destroy(){le&&(le(),le=null),Ne&&(Ne(),Ne=null),E&&(E(),E=null),document.removeEventListener("keydown",b),R||(Ce.destroy(),ue&&ue.parentNode&&ue.parentNode.removeChild(ue)),je.destroy(),Re.parentNode&&Re.parentNode.removeChild(Re),d=null,p=null,be(),h="",w=!1,x=[],_e(),I(),Ve(c``,e)}}}function Ku(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},u=(d,p,f="")=>{n&&(n.textContent=d||"Unexpected Error"),r&&(r.textContent=p||"An unrecoverable error occurred.");let h=typeof f=="string"?f.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:u,close:i,getElement(){return t}}}function Fo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ws(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function jo(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function Bo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Mg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:Fo(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Yu(e,t){let n=Mg(e,t);return n?c`<button
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
            title=${n.deploy.at?Ht(n.deploy.at):""}
            >${Bo(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${ws(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Fr(e){let t=on(e.created_at),n=on(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Ht(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Dg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function ks(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Uo(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function En(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,h)=>(f.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,u=s?Dg(s.phase):null,d=s?.kind==="stale_work_backup_fresh",p=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${u||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:u,error:i,confirmation:p}}function vs(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
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
  </div>`}var Ng={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Zu(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let u=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Ng[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Wo(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}var qo=3;function qg(e){return c`<div
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
  </div>`}function jr(e,t={}){if(!e)return"";let n=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.successors)?e.successors:[],s=Array.isArray(e.warnings)?e.warnings:[],o=Array.isArray(e.overlaps)?e.overlaps:[],a=e.scope_missing===!0&&t.lane!=="running",i=e.popover||null;if(n.length===0&&r.length===0&&s.length===0&&o.length===0&&!a)return"";let u=o.length>qo,d=u?o.slice(0,qo):o;return c`<div class="worker-deps">
    ${n.map(p=>c`<span class="worker-dep worker-dep--pred" title=${p.title||""}
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
        >`)}${d.map(p=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${p.id}
          title=${p.prefixes.join(`
`)}
        >
          ⧉ 겹침 ${p.id} (${p.location_label})
        </button>`)}${u?c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip mon-overlap__chip--more"
          data-overlap-all="true"
          title=${o.slice(qo).map(p=>`${p.id} (${p.location_label})`).join(`
`)}
        >
          +${o.length-qo}
        </button>`:""}${a?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${r.map(p=>c`<span class="worker-dep worker-dep--succ" title=${p.title||""}
          >${p.label}</span
        >`)}${s.map(p=>c`<span class="worker-dep worker-dep--warn">${p}</span>`)}${i?qg(i):""}
  </div>`}function Br(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Qu(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Fg(e){let t=Array.isArray(e.badges)?e.badges:[],n=Wt(e.usage),r=Ln(e.usage),s=on(e.done_at);return c`<div
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
      ${s?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
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
              >`):r?c`<span class="worker-usage" title=${rs(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${ws(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Gn(e){if(e.lane==="done"&&e.done_layout==="three_line")return Fg(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=Wt(e.usage),s=Ln(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,u=i?on(e.done_at):"",d=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",f=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",w=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,x=e.lane==="done"?"":Br(e.workflow),N=Qu(e.from_id),j=c`<span class="worker-mini__title">${e.title}</span>`,K=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",te=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",L=n.map(X=>X===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${X}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${X===e.completion_badge&&e.completion_title||""}
          >${X}</span
        >`),M=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",D=r.length>0?r.map(X=>c`<span class="worker-usage" title=${X.tooltip}
              >${X.label}</span
            >`):s?c`<span class="worker-usage" title=${rs(e.usage)}
            >${s}</span
          >`:"",z=o?c`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?c`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",A=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",U=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",F=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",be=e.discard,$e=be?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${be?.attempt_id||""}
          data-operation-id=${be?.operation?.operation_id||""}
          data-discard-mode=${be?.confirmation||"unmerged"}
          ?disabled=${be?!be.enabled:e.discard_enabled===!1}
          title=${be?be.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${be?.label||"\uD3D0\uAE30"}
        </button>`:"",ee=e.stale_work||null,Q=ee?c`${ee.can_resume||ee.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ee.action_id}
            ?disabled=${ee.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ee.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ee.action_id}
            ?disabled=${ee.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ee.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ee.action_id}
            ?disabled=${ee.locked}
          >
            다시 확인
          </button>`:""}`:"",xe=ee?c`<div class="worker-mini__stale">
        <strong>${ee.title}</strong>
        <span>${ee.summary}</span>
        <span>${ee.cause}</span>
        ${ee.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Oe=e.revise_action?c`<button
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
        </button>`:"",ne=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?c`<div class="worker-mini__exec">
          ${Wo(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",oe=jr(e.dependency_chips,{lane:e.lane}),Ae=vs(e),B=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||be?.operation||e.revise_action||ee);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">
            ${h}${w}${N}${j}
          </div>
          <div class="worker-mini__row2">
            ${D}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${ws(e.work_ms)}</span
                >`:""}${L}${z}
            <span class="worker-mini__actions"
              >${A}${U}${F}${$e}</span
            >
            ${Fr(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${d}${p}${h}${w}${x}${N}${K}${te}${L}${f}${M}
            </div>
            <div class="worker-mini__body">${j}${xe}</div>
            ${oe}${ne}${B?c`<div class="worker-mini__foot">
                  ${D}${z}
                  <span class="worker-mini__actions"
                    >${A}${U}${F}${$e}${Oe}${Q}</span
                  >
                  ${vs(e)}
                </div>`:""}
            ${Fr(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${h}${w}${x}${N}${j}${K}${te}${L}${f}${M}${D}${z}${A}${U}${F}${$e}
            </div>
            ${oe}${ne}${Ae} ${Fr(e)}`}
  </div>`}function gi(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),u=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),d=jr(e.dependency_chips,{lane:e.lane});return c`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r?c`<span
            class="ctl-chip worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >⛔ worker-ineligible</span
          >`:""}
      ${Br(a)}${Qu(e.from_id)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${a?oo(a,e.status,{onOpenDoc:n.onOpenDoc}):""}${d}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?c`<div class="worker-mini__exec">
          ${Wo(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${t.lanes.map(p=>c`<button
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
          </div>`:c`${e.reason?c`<span
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
    ${Fr(e)}
  </div>`}function _n(e){let t=!!e.collapsible&&!!e.collapsed,n=c`<span
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
          ${n}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:c`<header class="worker-pane__hd">
          ${n}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(r=>e.lane==="candidate"?gi(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):Gn(r))}
          </div>`}
  </section>`}var Xu={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Ju={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function ed(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function hi(e){for(let t of ed(e))if(Object.hasOwn(Xu,t))return Xu[t];return null}function bi(e){let t=null;for(let n of ed(e))Object.hasOwn(Ju,n)&&(t=Ju[n]);return t}function zo(e){let t=hi(e),n=bi(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function td(e,t){let n=hi(e)??hi(t),r=bi(t)??bi(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var nd=160;function jg(e){return e.length>nd?`${e.slice(0,nd)}\u2026`:e}function Bg(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${jg(e.command)}</code>`:""}
  </div>`}function Ug(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Wg(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function rd(e){let t=e.failure?zo(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${Bg(e.failure.cause_detail)}
          ${Ug(e.failure.reason)}
          ${vs({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function zg(e){return e?c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}var Hg=new Set(["codex-runner"]);function Gg(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(h=>h&&!(typeof h.agent_type=="string"&&Hg.has(h.agent_type))),u=i.filter(h=>h&&h.state==="live"),d=i.filter(h=>h&&h.state!=="live"),p=jr(e.dependency_chips,{lane:"running"}),f=r?on(r.updated_at,t):"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?c`<span class="rtile__activity-age"
              >${on(a,t)}</span
            >`:""}
      </div>`:f?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">갱신 ${f}</span>
        </div>`:""}${u.length>0||d.length>0?c`<div class="rtile__legs">
        ${u.map(h=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${h.label}</span
            >`)}${d.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${d.map(h=>h.label).join(", ")}`}
              >위임 완료 ${d.length}</span
            >`:""}
      </div>`:""}${p}`}function yi(e,t,n=null,r={}){let s=e.kind==="session",o=e.failed===!0,a=!!e.paused,i=o?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Wg(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=es(e),p=Wt(e.usage),f=Ln(e.usage),h=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,w=e.base_exception||null,x=e.landing,N=e.attempt_id&&e.attempt_id===n,j=r.monitor||null,K=zg(j),te=Gg(j,t,a,s?{updated_at:e.updated_at??null}:null),L=s&&e.workflow?.chips?.exec_receipt||null,M=L?c`<div class="rtile__meta">
        <span
          class="ctl-chip ctl-chip--exec-receipt"
          title=${`exec_receipt ${Cn(L)}`}
          >${`${L.kind}:${ao(L)}`}</span
        >
      </div>`:"",D=s?"":Fr(e),z=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
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
      ${Br(e.workflow)}${K}${d?c`<span class="rtile__resumed" title=${d}>↻</span>`:""}
      ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${i}</span>`:""}<span
              class="rtile__session-badge"
              title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
              >세션</span
            >`:c`<span class="rtile__elapsed">${i}</span>`}
      ${s?"":o?c`<button
                type="button"
                class="rtile__resume"
                ?disabled=${e.resume_eligible===!1}
                title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                aria-label="이어하기"
              >
                ↻ 이어하기
              </button>
              ${z}
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
              ${a?c`<button
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
              ${z}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${te}${e.rollup?so(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Ca}):""}
    ${x?c`<div class="rtile__landing">
          <span
            class="merge-step${x.failed?" merge-step--failed":""}"
            style=${`--progress: ${x.percent}%`}
            >${x.label}${x.index>0?c`<span class="merge-step__n"
                  >${x.index}/${x.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${s?M:u||p.length>0||f||h||w?c`<div class="rtile__meta">
            ${h?c`<span class="worker-mini__badge">${h}</span>`:""}
            ${w?c`<span
                  class="worker-mini__badge"
                  title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                  >${w}</span
                >`:""}
            ${Wo(e.exec_chips)}
            ${p.length>0?p.map(A=>c`<span class="worker-usage" title=${A.tooltip}
                      >${A.label}</span
                    >`):f?c`<span
                    class="worker-usage"
                    title=${rs(e.usage)}
                    >${f}</span
                  >`:""}
          </div>`:""}
    ${D} ${vs(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${o||a?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function vi(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>yi(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var wi=new Set(["unavailable","not_applicable"]);function Vn(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function sd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Kn(e,t){return t===null?null:`${Hn[e]}: ${t.display} (${Io[t.source]})`}function ki(e){return e.filter(t=>t!==null).join(`
`)}function Ho(e){if(typeof e!="object"||e===null)return null;let t=lr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:ki(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Hn.orchestration_model,e.model),n(Hn.orchestration_effort,e.effort),n(Hn.orchestration_speed,e.speed)])}}function pr(e,t){let n=Vn(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Vn(e,"orchestration_effort"),s=Vn(e,"orchestration_speed"),o=sd([wn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:ki(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Kn("orchestration_model",n),Kn("orchestration_effort",r),Kn("orchestration_speed",s)])}}function Vg(e,t){return e===null||e.value===null||wi.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Kg(e){return e===null||wi.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Yg(e){return e===null?null:e.value==="auto"?"auto":wi.has(e.resolution)?null:e.display}function Yn(e,t){if(typeof e!="object"||e===null)return null;let n=Vn(e,"impl_dispatch"),r=Vn(e,"impl_runtime"),s=Vn(e,"impl_model"),o=Vn(e,"impl_effort"),a=Vn(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":sd([Vg(r,t??null),Kg(s),Yg(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:ki(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Kn("impl_dispatch",n),Kn("impl_runtime",r),Kn("impl_model",s),Kn("impl_effort",o),Kn("impl_speed",a)])}}var en="",Zg=["impl_runtime","impl_model","impl_effort"],Qg=5,Go=1;function qn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Vo(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(I=>de(I,"error",4e3)),o={},a={},i=[],u=!1,d=null,p={},f="",h="",w=!1,x=!1,N=!1,j=null,K=!1;function te(){let I=t.queue?t.queue():null;return qn(I)?I:null}function L(){let I=te();return I?I.runner_catalog:null}function M(){let I=te();return I&&qn(I.execution_defaults)?I.execution_defaults:null}function D(){let I=t.implPresetStore?.get();return qn(I)&&Array.isArray(I.presets)?I:null}function z(){return r===null?{}:{root_dir:r}}async function A(I,J){return K||!n?null:await n(I,J)}function U(I){I&&qn(I.queue)&&t.onQueueAdopt?.(I.queue)}async function F(I,J){let re=te();if(!re||K)return null;let V=await A(I,{...J,...z(),expected_revision:re.revision});if(U(V),r!==null&&V&&V.conflict){let De=V.queue&&typeof V.queue.revision=="number"?V.queue.revision:te()?.revision??re.revision;V=await A(I,{...J,...z(),expected_revision:De}),U(V)}return V}async function be(){u=!0,ye();try{let I=await A("get-session-defaults",{...z()});o=qn(I?.values)?{...I.values}:{},a={...o},i=Array.isArray(I?.warnings)?I.warnings:[]}catch(I){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${I instanceof Error?I.message:String(I)}`)}finally{u=!1,ye()}}async function $e(){let I=xu(o,a);if(Object.keys(I).length!==0){try{let J=await A("set-session-defaults",{values:I,...z()});o=qn(J?.values)?{...J.values}:{},a={...o},i=Array.isArray(J?.warnings)?J.warnings:[]}catch(J){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}ye()}}function ee(I,J){if(Zg.includes(I)){Oe(I,J);return}J===en?delete a[I]:a[I]=J,ye(),$e()}function Q(){let I=Ke().orchestration_model,J=Jt({global:{orchestration_model:I??void 0},execution_defaults:M(),runner_catalog:L()}).orchestration_model.value;return J?wn(L(),J):null}function xe(I,J){typeof J=="string"&&J.length>0?a[I]=J:delete a[I]}function Oe(I,J){let re=J===en?void 0:J,V=ku({impl_runtime:I==="impl_runtime"?re:a.impl_runtime,impl_model:I==="impl_model"?re:a.impl_model,impl_effort:I==="impl_effort"?re:a.impl_effort},L(),Q());xe("impl_runtime",V.impl_runtime),xe("impl_model",V.impl_model),xe("impl_effort",V.impl_effort),ye(),$e()}async function ne(){let I=te();if(!I)return;let J={orchestration_model:I.orchestration_model??null,orchestration_effort:I.orchestration_effort??null,orchestration_speed:I.orchestration_speed??null},re=Au(J,{...J,...p});if(Object.keys(re).length!==0){try{let V=await F("worker-queue-set-orchestration-defaults",{values:re});if(V&&V.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}p={}}catch(V){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}ye()}}function oe(I,J){p[I]=J===en?null:J,ye(),ne()}function Ae(I){if(d=I,!I){ye();return}let J=L(),re=Ke(),V=re.orchestration_model;V&&!bs(J,I).includes(V)&&(p.orchestration_model=null,V=null);let De=re.orchestration_effort;De&&!ci(J,I,V||cn).includes(De)&&(p.orchestration_effort=null),ye(),ne()}async function B(I){if(!(!te()||I<Go)){try{await F("worker-queue-set-slots",{slots:I})}catch(J){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}ye()}}async function X(I){if(!(!te()||I<Go||I>Qg)){try{await F("worker-queue-set-serial-lane-count",{count:I})}catch(J){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}ye()}}async function _e(I,J){let re=I==="auto_advance"?"worker-automation-toggle":I==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await F(re,{on:J})}catch(V){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}ye()}function ke(){let I={},J=Ke();for(let re of Co){let V=Nn.includes(re)?J[re]:a[re];typeof V=="string"&&V.length>0&&(I[re]=V)}return I}async function we(){let I=D();if(!I)return;let J=ke();if(Object.keys(J).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let re=(I.presets||[]).find(De=>De.id===f),V=h.trim()||(re?re.name:"");if(!V){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let De=re?await A("impl-preset-update",{expected_revision:I.revision,id:re.id,name:V,settings:J}):await A("impl-preset-create",{expected_revision:I.revision,name:V,settings:J});if(De&&De.applied){if(h="",!re&&Array.isArray(De.presets)){let Qe=De.presets.find(lt=>lt.name===V);f=Qe?Qe.id:f}ye()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ye()}catch(De){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${De instanceof Error?De.message:String(De)}`)}}async function Ue(){let I=D();if(!(!I||f.length===0))try{let J=await A("impl-preset-delete",{expected_revision:I.revision,id:f});J&&J.applied?(f="",ye()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ye())}catch(J){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}}function me(I){o=qn(I.values)?{...I.values}:{},a={...o},i=Array.isArray(I.warnings)?I.warnings:[],qn(I.queue)&&(t.onQueueAdopt?.(I.queue),p={})}async function Ze(){let I=D(),J=te();if(!I||!J||f.length===0)return;let re=V=>({preset_id:f,expected_revision:I.revision,expected_queue_revision:V,...z()});try{let V=await A("apply-impl-preset-global",re(J.revision));if(V&&V.applied&&me(V),r!==null&&V&&V.queue_applied===!1){let De=V.queue&&typeof V.queue.revision=="number"?V.queue.revision:te()?.revision??J.revision;V=await A("apply-impl-preset-global",re(De)),V&&V.applied&&me(V)}V&&V.applied?V.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):V&&V.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(V){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}ye()}async function gt(){x=!0,N=!1,ye();try{let I=await A("get-worker-system-prompt",{});!I||typeof I!="object"||Array.isArray(I)?N=!0:j=I}catch{N=!0}finally{x=!1,ye()}}function R(){if(w=!w,w&&!j){gt();return}ye()}function ue(){let I=Mr({loading:x,error:N});if(I)return I;if(!j)return"";let J=Array.isArray(j.variants)?j.variants:[];return c`<div class="settings-dialog__sp-body">
      ${j.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${j.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${J.map(re=>c`<div class="settings-dialog__sp-variant" data-variant=${re.key}>
            <div class="settings-dialog__sp-cond">${re.condition}</div>
            ${Dn(re.label,re.system_prompt)}
          </div>`)}
    </div>`}function Ce(){return c`<section
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
    </section>`}function Re(I,J,re,V,De,Qe,lt){let ot=De[I]??en,ct=ui(I,re,De,M(),L(),lt),ht=ct.options.find(tt=>tt.value===ot),bt=ot===en?ct.full_value:ht?.full_value;return c`<select
        class=${ot===en?"settings-dialog__unset":""}
        data-key=${I}
        aria-label=${J}
        title=${bt||""}
        ?disabled=${Qe===!0||ct.disabled}
        .value=${dr(String(ot))}
        @change=${tt=>V(I,String(tt.target.value))}
      >
        <option value=${en} ?selected=${ot===en}>
          ${ct.unset_label}
        </option>
        ${ct.options.map(tt=>c`<option
              value=${tt.value}
              title=${tt.full_value||""}
              ?selected=${tt.value===ot}
            >
              ${tt.label}
            </option>`)}
      </select>
      ${ot===en?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function je(I,J,re,V,De,Qe=!1,lt){return c`<div
      class=${`settings-dialog__row${Qe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        ${Re(I,J,re,V,De,Qe,lt)}
      </span>
    </div>`}function qe(I,J,re,V,De){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${J}-on)`}
        ></i>
        ${I}
      </span>
      <span class="settings-dialog__controls">
        ${Re(re,`${I} \uBAA8\uB378`,V,ee,a,!1)}
        ${Re(De,`${I} effort`,Lo,ee,a,!1)}
      </span>
    </div>`}function W(I,J,re,V){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${V?" is-on":""}`}
          data-automation=${I}
          aria-pressed=${V?"true":"false"}
          aria-label=${J}
          @click=${()=>_e(I,!V)}
        >
          ${V?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${re}</span>
      </span>
    </div>`}function G(I,J,re,V){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${I}>
          <button
            type="button"
            aria-label=${`${J} \uAC10\uC18C`}
            @click=${()=>V(re-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${re}</span>
          <button
            type="button"
            aria-label=${`${J} \uC99D\uAC00`}
            @click=${()=>V(re+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Me(I){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${I.rows.length>0?`\uBCC0\uACBD ${I.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${I.rows.map(J=>c`<div
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
      ${I.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${I.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Ke(){let I=te(),J={};for(let re of Nn)J[re]=Object.prototype.hasOwnProperty.call(p,re)?p[re]:I&&typeof I[re]=="string"?I[re]:null;return J}function Ge(){let I=L(),J=a.impl_runtime,re=a.impl_model,V=D(),De=te(),Qe=Ke(),lt=bs(I,d),ot=Nr(I,void 0).filter(he=>he!==cn),ct=ci(I,d,Qe.orchestration_model||cn).filter(he=>he!==cn),ht=f?(V?.presets||[]).find(he=>he.id===f):null,bt=ht?$u(ke(),qn(ht.settings)?ht.settings:{}):null,tt=De&&typeof De.slots=="number"?De.slots:Go+1,Tt=De&&typeof De.serial_lane_count=="number"?De.serial_lane_count:Go,wt=M()?.supported===!0,He=ui("workflow_mode",gs,a,M(),I);return c`
      ${i.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${wt?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${u?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${dr(f)}
                @change=${he=>{f=String(he.target.value),ye()}}
              >
                <option value="" ?selected=${f===""}>
                  실행 프리셋…
                </option>
                ${(V?.presets||[]).map(he=>c`<option
                      value=${he.id}
                      ?selected=${he.id===f}
                    >
                      ${he.name}
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
                .value=${dr(h)}
                @input=${he=>{h=String(he.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${f?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${we}
              >
                ${f?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${f.length===0}
                @click=${Ue}
              >
                삭제
              </button>
            </div>
            ${bt?Me(bt):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${dr(d||en)}
                    @change=${he=>{let mt=String(he.target.value);Ae(mt===en?null:mt)}}
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
              ${je("orchestration_model","\uBAA8\uB378",lt,oe,Qe)}
              ${je("orchestration_effort","effort",ct,oe,Qe)}
              ${je("orchestration_speed","\uC18D\uB3C4",ms,oe,Qe)}
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
                      @click=${()=>ee("workflow_mode",en)}
                    >
                      ${He.unset_label}
                    </button>
                    ${a.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${gs.map(he=>c`<button
                          type="button"
                          data-mode=${he}
                          aria-pressed=${String(a.workflow_mode===he)}
                          @click=${()=>ee("workflow_mode",he)}
                        >
                          ${he}
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
              ${qe("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",hs,"spec_review_effort")}
              ${qe("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Oo,"plan_review_effort")}
              ${qe("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",hs,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${je("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ro,ee,a)}
              ${je("impl_model","\uBAA8\uB378",Nr(I,J),ee,a)}
              ${je("impl_effort","effort",qr(I,J,re),ee,a)}
              ${je("impl_speed","\uC18D\uB3C4",ms,ee,a)}
              ${je("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",ot,ee,a,!1,{...a,...Qe})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${W("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",De?.auto_advance===!0)}
              ${W("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",De?.auto_merge===!0)}
              ${W("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",De?.auto_repair===!0)}
              ${G("slots","\uB3D9\uC2DC \uC2E4\uD589",tt,he=>B(he))}
              ${G("serial-lane-count","\uC9C1\uB82C \uB808\uC778",Tt,he=>X(he))}
            </div>
            ${Ce()}
          `}
    `}function ye(){K||Ve(Ge(),e)}return{load(){return p={},be()},render:ye,sessionDraft:()=>({...a}),destroy(){K=!0,Ve(c``,e)}}}function $s(e){return c`<svg
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
  </svg>`}function od(){return $s(xr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ad(){return $s(xr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function id(){return $s(xr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function ld(){return $s(xr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function cd(){return $s(xr`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function ud(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function dd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Wt(po(t));let n={};for(let i of On)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let u=i&&i.usage;if(u&&typeof u=="object"){let d=!1;for(let p of On){let f=u[p];typeof f=="number"&&Number.isFinite(f)&&(n[p]+=f,r=!0,d=!0)}if(d){o+=1;let p=u.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Ln(n):null}function kn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ur(e,t){let n=kn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Xg(e,t){if(!kn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function Jg(e){if(!kn(e)||!kn(e.execution_defaults)||!kn(e.runner_catalog)||!kn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=Jt({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=wn(e.runner_catalog,n.orchestration_model.value??""),s=pr(n,e.runner_catalog),o=Yn(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function pd(e,t){let n=t.notify||(B=>de(B,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let u=document.createElement("div");u.className="mon2-deck__panel-body",s.append(o,u),e.appendChild(s);let d=null,p=null,f=null,h=new Map;function w(){let B=t.workspacesState?t.workspacesState():[];return Array.isArray(B)?B.filter(X=>kn(X)):[]}function x(B){return w().find(X=>X.root_dir===B)||null}function N(B){return Xg(x(B),h.get(B))}function j(){for(let B of w()){let X=h.get(B.root_dir);X&&typeof X.revision=="number"&&typeof B.revision=="number"&&B.revision>=X.revision&&h.delete(B.root_dir)}}async function K(B,X,_e){let ke=t.transport,we=N(X);if(!(!ke||!kn(we))){try{let Ue=await ke(B,{..._e,root_dir:X,expected_revision:we.revision});if(kn(Ue?.queue)&&h.set(X,Ue.queue),Ue&&Ue.conflict){let me=kn(Ue.queue)&&typeof Ue.queue.revision=="number"?Ue.queue.revision:N(X)?.revision;Ue=await ke(B,{..._e,root_dir:X,expected_revision:me}),kn(Ue?.queue)&&h.set(X,Ue.queue)}}catch(Ue){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ue instanceof Error?Ue.message:String(Ue)}`)}ne()}}function te(B){d!==B&&(d=B,t.onFocusChange?.(d),ne())}function L(B){te(d===B?null:B)}function M(B){if(p===B){z();return}D(),p=B;let X=x(B);a.textContent=`${X?.name||B} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,f=Vo(u,{root_dir:B,queue:()=>N(B),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:_e=>{h.set(B,_e),ne()}}),f.load(),ne()}function D(){f?.destroy(),f=null}function z(B){D(),p=null,s.hidden=!0,a.textContent="",B!==!0&&ne()}let A=()=>z();i.addEventListener("click",A);function U(B){B.key==="Escape"&&d!==null&&te(null)}document.addEventListener("keydown",U);function F(B,X){let _e=Math.max(X,B,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${X}\uAC1C \uC911 ${B}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:_e},(ke,we)=>we<B?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function be(B){let X=B.auto_advance===!0,_e=B.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${X?" is-on":""}`}
        data-act="auto"
        aria-pressed=${X?"true":"false"}
        aria-label=${`${B.name} \uC790\uB3D9\uD654`}
        title=${X?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${X?ad():od()}
        <span class="mon2-deck__op-label">자동화</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${_e?" is-on":""}`}
        data-act="merge"
        aria-pressed=${_e?"true":"false"}
        aria-label=${`${B.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${_e?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${id()}
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
        ${cd()}
      </button>`}function $e(B){let X=Jg(B);return X?c`<div class="mon2-deck__chips">
      ${X.orchestration?c`<span class="mon2-deck__chip" title=${X.orchestration.title}
            >오케 ${X.orchestration.text}</span
          >`:""}
      ${X.worker?c`<span class="mon2-deck__chip" title=${X.worker.title}
            >워커 ${X.worker.text}</span
          >`:""}
    </div>`:""}function ee(B){let X=Ur(B,"running"),_e=typeof B.slots=="number"?B.slots:1;return c`<div
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
        ${ld()} ${F(X,_e)}
        <span class="mon2-deck__counts"
          >${X}/${_e} 실행 · 대기 ${Ur(B,"queue")} · PR
          ${Ur(B,"pr_wait")}${Ur(B,"session_active")>0?` \xB7 \uC138\uC158 ${Ur(B,"session_active")}`:""}</span
        >
      </div>
      <div class="mon2-deck__ops">${be(B)}</div>
      ${$e(B)}
    </div>`}function Q(B){let X=t.doneItems?t.doneItems():[],_e=t.rangeLabel?t.rangeLabel():"",ke=dd(Array.isArray(X)?X:[]),we=Ue=>B.reduce((me,Ze)=>me+Ur(Ze,Ue),0);return c`<div
      class="mon2-deck__total"
      title=${`visible \uB808\uD3EC ${B.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${_e}`}
    >
      <div class="mon2-deck__total-counts">
        실행 ${we("running")} · 대기 ${we("queue")} · PR
        ${we("pr_wait")}${we("session_active")>0?` \xB7 \uC138\uC158 ${we("session_active")}`:""}
        · ${_e} 완료
        ${Array.isArray(X)?X.length:0}
      </div>
      ${ke===null?"":c`<div class="mon2-deck__total-tokens">
            ${typeof ke=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${ud(_e)}
                  >τ ${ke}</span
                >`:ke.map(Ue=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${Ue.provider}
                      title=${Ue.tooltip}
                      >τ ${Ue.label}</span
                    >`)}
          </div>`}
    </div>`}function xe(){let B=w();return B.length===0?"":c`<div class="mon2-deck__row">
      ${Q(B)}
      <div class="mon2-deck__strip">
        ${B.map(X=>ee(X))}
      </div>
    </div>`}function Oe(){d!==null&&!x(d)&&(d=null,t.onFocusChange?.(null))}function ne(){j(),Oe(),p!==null&&!x(p)&&z(!0),Ve(xe(),r),f?.render()}function oe(B){let X=B.target;if(!X||typeof X.closest!="function")return;let _e=X.closest("[data-root-dir]");if(!_e)return;let ke=_e.getAttribute("data-root-dir")||"",we=X.closest("[data-act]")?.getAttribute("data-act");if(we==="worker"){t.gotoWorkerTab?.(ke);return}if(we==="auto"){K("worker-automation-toggle",ke,{on:N(ke)?.auto_advance!==!0});return}if(we==="merge"){K("worker-merge-auto-toggle",ke,{on:N(ke)?.auto_merge!==!0});return}if(we==="gear"){M(ke);return}L(ke)}function Ae(B){if(B.key!=="Enter"&&B.key!==" ")return;let X=B.target;if(!X||typeof X.closest!="function")return;let _e=X.closest('[data-root-dir][role="button"]');!_e||_e!==X||(B.preventDefault(),L(_e.getAttribute("data-root-dir")||""))}return r.addEventListener("click",oe),r.addEventListener("keydown",Ae),{render:ne,focusRoot:()=>d,panelRoot:()=>p,destroy(){document.removeEventListener("keydown",U),r.removeEventListener("click",oe),r.removeEventListener("keydown",Ae),i.removeEventListener("click",A),D(),Ve(c``,r),e.replaceChildren()}}}var eh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",th="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694";function $i(e,t){return`${e}\0${t}`}function nh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function rh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function sh(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function oh(e,t){let n=new Set(t),r=new Map,s=new Map;for(let i of n){let u=Array.from(new Set((e.get(i)||[]).filter(d=>d!==i&&n.has(d))));r.set(i,u.length);for(let d of u){let p=s.get(d);p?p.push(i):s.set(d,[i])}}let o=[],a=Array.from(n).filter(i=>r.get(i)===0).sort();for(;a.length>0;){let i=a.shift();o.push(i);for(let u of(s.get(i)||[]).slice().sort()){let d=(r.get(u)||0)-1;r.set(u,d),d===0&&a.push(u)}}for(let i of t)o.includes(i)||o.push(i);return o}function ah(e,t){let n=new Set;for(let[a,i]of t)for(let u of i)n.add($i(a,u));let r=new Map,s=new Map;for(let a of e){let i=$i(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=$i(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function ih(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function lh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function xi(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function fd(e,t,n){let r=rh(n.blocked_by_map),s=[],o=null,a=w=>{let x=n.owner_of.get(w);return typeof x!="string"||x.length===0?(o=nh(w),null):x},i=(w,x)=>{if(o!==null||w===x)return;let N=r.get(w)||[];if(!N.includes(x))return;let j=a(w);j!==null&&(r.set(w,N.filter(K=>K!==x)),s.push({type:"dep-remove",a:w,b:x,root_dir:j}))},u=(w,x)=>{if(o!==null||w===x)return;let N=r.get(w)||[];if(N.includes(x))return;let j=a(w);if(j!==null){if(sh(r,x,w)){o=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${w}\uAC00 \uC774\uBBF8 ${x}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}r.set(w,[...N,x]),s.push({type:"dep-add",a:w,b:x,root_dir:j})}},d=()=>{let w=n.lane_order.get(e.lane_id||"")||[],x=new Set(w),N=(r.get(e.bead_id)||[]).filter(K=>x.has(K)),j=w.filter(K=>(r.get(K)||[]).includes(e.bead_id));for(let K of N)i(e.bead_id,K);for(let K of j)i(K,e.bead_id);for(let K of N)for(let te of j)u(te,K);return w.filter(K=>K!==e.bead_id)},p=(w,x)=>{let N=n.lane_order.get(w)||[],j=N.indexOf(e.bead_id),K=oh(r,N.filter(D=>D!==e.bead_id)),te=w.startsWith("pending:")?K.length:Math.max(0,Math.min(K.length,j>=0&&x>j?x-1:x)),L=te>0?K[te-1]:null,M=te<K.length?K[te]:null;if(L===null){M!==null&&u(M,e.bead_id);return}u(e.bead_id,L),M!==null&&(r.get(M)||[]).includes(L)&&(i(M,L),u(M,e.bead_id))},f=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:eh};if(t.kind==="chain"&&e.kind==="repo-serial")return{refused:th};if(e.kind==="chain"&&d(),t.kind==="chain"&&p(t.lane_id,t.marker_index),o!==null)return{refused:o};let h=[];if(t.kind==="candidate")e.kind!=="candidate"&&h.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=ih(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")h.push(xi(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let x=n.parallel_rows,N=x[Math.max(0,Math.min(x.length,t.marker_index))];if(!(!!N&&N.bead_id===e.bead_id)&&lh(n,e.root_dir)&&f!==void 0){let K=f>w?w:w-1;K>=0&&K!==f&&h.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:K},root_dir:e.root_dir})}}}else if(t.kind==="chain")e.kind==="candidate"&&h.push(xi(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0));else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(f!==void 0&&t.index!==f){let w=f>t.index?t.index:t.index-1;w>=0&&w!==f&&h.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else h.push(xi(e.bead_id,e.root_dir,t.index,t.lane_id));return{ops:[...ah(s,n.blocked_by_map),...h]}}var _d={running:3,paused:2,failed:1};function md(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let p=t.get(a.bead_id),f=typeof p=="number"&&p>0&&typeof a.finished_at=="number"&&p>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!f&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let u=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let p=_d[d.run_state],f=_d[i];if(p>f||p===f&&(d.started_at??0)>(u??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:u})}return{winners:o,resumed_from_ids:r}}function Ko(e){return e.replace(/\/+$/,"")}function ch(e,t){let n=Ko(e),r=Ko(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Yo(e,t){let n=new Set;for(let r of e)for(let s of t){if(!ch(r,s))continue;let o=Ko(r),a=Ko(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}var gd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],xs=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Zo(e,t){let n=gd.find(s=>s.step===e);if(!n)return null;let r=gd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function hd(e){let t=xs.findIndex(n=>n.step===e);return xs.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function fr(e){let t=xs.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function uh(e){let t=xs.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:xs.length}}function Qo(e){let t=uh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Si=new Set(["queued","running","retry_pending","repairing"]),bd=new Set(["failed","succeeded"]),dh={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},As={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},ph={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:As.base_containment,child_sweep:As.child_sweep,branch_cleanup:As.branch_cleanup,parent_close:As.parent_close};function fh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function _h(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Si,...bd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function mh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=d=>d.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",u=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(u)}function Ai(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=dh[s];if(!o)return null;let a=Zo(n,`${r} ${o}`);return a?{...a,active:Si.has(s),failed:s==="failed"}:null}function gh(e){return!e||typeof e!="object"?null:ph[e.step]||null}function Ss(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=gh(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=fh(e.merge_sha)?e.merge_sha:null,u=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(x=>x&&typeof x=="object"&&_h(x,t,i)).sort(mh):[],d=a?u:[],p=d.find(x=>Si.has(x.state));if(p)return Ai(p);if(s)return s.step==="repo_operations"&&u[0]?Ai(u[0],!0):null;let f=d.find(x=>bd.has(x.state)?x.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return Ai(f);if(r){let x=Zo(r.step,r.label);return x?{...x,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?As[e.cleanup_cursor]:null;if(!h)return null;let w=Zo(h.step,h.label);return w?{...w,active:!0,failed:!1}:null}function Xo(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function Ei(e,t){return`${e}\0${t}`}function yd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Ti(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function hh(e,t){return e==="internal"&&t===void 0}function Wr(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function vd(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Wr(s)})`,location_label:Wr(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Ti(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:hh(a,s)}}function wd(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let u of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=Ei(i.root_dir,u.id);n.set(d,{root_dir:i.root_dir,workspace_name:i.name,lane:u.id}),s.set(d,[]);for(let p of Array.isArray(u.items)?u.items:[])r.set(p.id,d)}for(let i of t)for(let u of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=Ei(i.root_dir,u.id),p=Array.isArray(u.items)?u.items[0]:null,h=!!p&&p.queue_index===0&&(!Array.isArray(u.occupied_by)||u.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],w=s.get(d);if(w)for(let x of h){let N=r.get(x);N&&N!==d&&!w.includes(N)&&w.push(N)}}let o=(i,u)=>{let d=new Set,p=[i];for(;p.length>0;){let f=p.pop();if(f===u)return!0;!f||d.has(f)||(d.add(f),p.push(...s.get(f)||[]))}return!1},a=new Map;for(let[i,u]of s){let d=[];for(let p of u){let f=n.get(p);o(p,i)&&f&&d.push(f)}d.length>0&&a.set(i,d)}return a}function kd(e,t){return Ei(e,t)}var $d=1,Es=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Ri=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],zr={show_blocked:!0,spec:"all"},xd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function bh(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function yh(e,t){let{winners:n,resumed_from_ids:r}=md(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,u=a.run_state,d=a.started_at,p=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:u,started_at:d,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:pn(e,i.bead_id),can_pause:u==="running"&&p,can_resume:u!=="running"&&p&&!r.has(i.attempt_id)})}return s}function Ad(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Et(e){return e&&typeof e=="object"?e:{}}function vh(e,t,n){let r=Et(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=h=>Jt({pin:h,global:a,execution_defaults:s,runner_catalog:o,route:n}),u,d;try{u=i(r),d=i(null)}catch{return null}let p=Sd(pr(u,o),pr(d,o)),f=Sd(Yn(u,null),Yn(d,null));return p||f?{orchestration:p,worker:f}:null}function Sd(e,t){return!e||t&&t.text===e.text?null:e}function wh(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function kh(e,t){let n=t.get(e);return n?{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${Wr(n)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`}:null}function $h(e,t,n){let r=new Map;for(let u of e)r.set(u,Array.from(n.get(u)||[]).filter(d=>e.includes(d)).length);let s=[],o=new Map,a=e.filter(u=>(r.get(u)||0)===0).sort();for(let u of a)o.set(u,0);let i=[...a];for(;i.length>0;){let u=i.shift();s.push(u);let d=Array.from(t.get(u)||[]).filter(f=>e.includes(f)).sort(),p=(o.get(u)||0)+(d.length>1?1:0);for(let f of d){let h=(r.get(f)||0)-1;r.set(f,h);let w=o.get(f);o.set(f,w===void 0?p:Math.min(w,p)),h===0&&i.push(f)}}return{order:s,indent:o,cycle:s.length!==e.length}}function xh(e,t,n){let r=new Map,s=new Map,o=new Set,a=(p,f,h)=>{let w=p.get(f);w?w.add(h):p.set(f,new Set([h]))},i=p=>t.get(p)?.lane==="done";for(let[p,f]of e)if(!i(p))for(let h of f)h===p||i(h)||(o.add(h),o.add(p),a(r,h,p),a(s,p,h));let u=new Set,d=[];for(let p of Array.from(o).sort()){if(u.has(p))continue;let f=[],h=[p];for(u.add(p);h.length>0;){let L=h.pop();f.push(L);for(let M of[...r.get(L)||[],...s.get(L)||[]])u.has(M)||(u.add(M),h.push(M))}if(f.length<2)continue;let w=f.map(L=>t.get(L));if(w.every(L=>!!L&&/^s[1-5]$/.test(L.lane||""))&&w.every(L=>L&&w[0]&&L.root_dir===w[0].root_dir&&L.lane===w[0].lane))continue;let{order:N,indent:j,cycle:K}=$h(f.slice().sort(),r,s),te=K?f.slice().sort():N;d.push({key:f.slice().sort().join("\0"),cycle:K,nodes:te.map(L=>{let M=t.get(L);return{id:L,workspace_name:M?M.workspace_name:"",root_dir:M?M.root_dir:"",location_label:M?Wr(M):Ed(L,n),indent:K?0:j.get(L)||0}})})}return d}function Ed(e,t){let n=Ti(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Td(e,t,n){let r=t.get(e);if(!r)return Ed(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Wr(r)}function Ah(e,t,n){let r=[];for(let s of n.get(e)||[])s!==e&&t.has(s)&&!r.includes(s)&&r.push(s);return r}function Sh(e,t,n,r,s,o,a){let i=(f,h,w,x,N=!1)=>{let j=r.get(f),K=j&&j.lane==="parallel"&&typeof j.position=="number"?j.position-1:null;return{id:f,title:o.get(f)||f,workflow:a.get(f)||null,root_dir:j?j.root_dir:"",workspace_name:j?j.workspace_name:"",seq:h,indent:w,predecessors:x,location_label:Td(f,r,s),draggable:!N&&K!==null,...K!==null?{queue_index:K}:{}}},u=[];for(let f of e.slice().sort((h,w)=>h.key<w.key?-1:1)){let h=new Set(f.nodes.map(w=>w.id));u.push({lane_id:`chain:${f.key}`,label:"",pending:!1,cycle:f.cycle,rows:f.nodes.map((w,x)=>i(w.id,x+1,f.cycle?0:w.indent,f.cycle?[]:Ah(w.id,h,n),f.cycle))})}let d=new Set;for(let f of u)for(let h of f.rows)d.add(h.id);let p=[];return t.forEach((f,h)=>{let w=f&&typeof f.seed=="string"&&f.seed.length>0?f.seed:null;w!==null&&d.has(w)||(p.push(h),u.push({lane_id:`pending:${h}`,label:"",pending:!0,cycle:!1,rows:w===null?[]:[i(w,1,0,[])]}))}),u.forEach((f,h)=>{f.label=`\uC5F0\uACB0 ${h+1} \xB7 \uB808\uD3EC \uAC04`}),{chain_lanes:u,pending_lanes_kept:p}}function Eh(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Th(e,t,n,r,s){let o=new Map;for(let i of[...e.running,...e.queue,...e.runnable]){if(!t.has(i.root_dir))continue;let{scope:u,state:d}=Eh(i,t,n);if(d!==void 0&&(i.scope_state=d),u.length===0)continue;let p=o.get(i.root_dir);p?p.push({item:i,scope:u}):o.set(i.root_dir,[{item:i,scope:u}])}let a=(i,u,d)=>{let p={id:u.id,title:u.title,location_label:Td(u.id,r,s),prefixes:d};i.overlap_chips?i.overlap_chips.push(p):i.overlap_chips=[p]};for(let i of o.values())for(let u=0;u<i.length;u+=1)for(let d=u+1;d<i.length;d+=1){let p=Yo(i[u].scope,i[d].scope);p.length!==0&&(a(i[u].item,i[d].item,p),a(i[d].item,i[u].item,p))}}function Ci(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Jo(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Oi(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...zr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Es.some(R=>R.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let R of s)R&&typeof R.root_dir=="string"&&u.set(R.root_dir,R);let d=[],p=[],f=[],h=[],w=[],x=[],N=new Map,j=new Map,K=new Map,te=new Map,L=new Map,M=new Map,D=new Map,z=new Map,A=new Map;for(let R of r){if(!R||typeof R.root_dir!="string")continue;let ue=R.root_dir,Ce=R.name||ue,Re=u.get(ue),je=Re&&typeof Re.revision=="number"?Re.revision:typeof R.revision=="number"?R.revision:0,qe=Et(R.attempts),W=Et(R.bead_titles);for(let[b,S]of Object.entries(W))typeof S=="string"&&S.length>0&&z.set(b,S);let G=Et(R.bead_times),Me=Et(R.pr_observations),Ke=Et(R.admission),Ge=Et(R.revise_parked),ye=Et(R.merge_queue_state),I=Et(R.cleanup_failed),J=Et(R.discard_operations),re=Et(R.bead_blocked_by);Object.hasOwn(R,"bead_scope")&&M.set(ue,Et(R.bead_scope));let V=Et(R.bead_workflow);for(let[b,S]of Object.entries(V))S&&typeof S=="object"&&A.set(b,S);let De=Et(R.pr_activity),Qe=Array.isArray(R.repo_operations)?R.repo_operations:[],lt=Array.isArray(R.merge_queue)?R.merge_queue:[],ot=new Set(lt.filter(b=>b&&typeof b.bead_id=="string").map(b=>b.bead_id)),ct=new Map(lt.filter(b=>b&&typeof b.bead_id=="string").map(b=>[b.bead_id,b])),ht=Array.isArray(R.queue)?R.queue:[],bt=(Array.isArray(R.serial_lanes)?R.serial_lanes:[]).filter(b=>b&&/^s[1-5]$/.test(b.id)&&Array.isArray(b.entries)),tt=Et(R.lane_states),Tt=typeof R.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(R.serial_lane_count))):Math.min(5,bt.length);K.set(ue,Tt),te.set(ue,ht.length);let wt=new Map(bt.map(b=>[b.id,b])),He=new Map;for(let b of bt)for(let S of b.entries)S&&typeof S.bead_id=="string"&&He.set(S.bead_id,b.id);for(let[b,S]of Object.entries(re))Array.isArray(S)&&L.set(b,S.filter(H=>typeof H=="string"&&H.length>0));let he=Array.isArray(R.done)?R.done:[];for(let b of he)b&&typeof b.bead_id=="string"&&x.push({id:b.bead_id,root_dir:ue,workspace_name:Ce});let mt=new Map;for(let b of he)b&&typeof b.bead_id=="string"&&typeof b.added_at=="number"&&mt.set(b.bead_id,b.added_at);let $t=b=>({id:b,title:W[b]||b,root_dir:ue,workspace_name:Ce,expected_revision:je,draggable:!1,...Et(G[b]).created_at?{created_at:Et(G[b]).created_at}:{},...Et(G[b]).updated_at?{updated_at:Et(G[b]).updated_at}:{}}),nt=new Set;for(let[b,S]of yh(qe,mt))nt.add(b),p.push({...$t(b),lane:"running",...He.has(b)?{serial_lane_id:He.get(b)}:{},attempt_id:S.attempt_id,run_state:S.run_state,status:S.status||void 0,workflow:V[b]||null,can_pause:S.can_pause,can_resume:S.can_resume,started_at:S.started_at,last_event_at:S.last_event_at,last_activity:S.last_activity,legs:S.legs,runner:S.runner,model:S.model,effort:S.effort,speed:S.speed,resumed_from:S.resumed_from,continuation_mode:S.continuation_mode,usage:S.usage,exec_chips:{orchestration:Ho(S),worker:null},discard:En(J,b,{attempt_id:S.attempt_id}),badges:S.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:S.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:S.run_state==="failed"});for(let b of Array.isArray(R.session_active)?R.session_active:[]){let S=b&&b.bead_id;typeof S!="string"||nt.has(S)||(nt.add(S),Array.isArray(b.blocked_by)&&b.blocked_by.length>0&&L.set(S,b.blocked_by.filter(H=>typeof H=="string"&&H.length>0)),typeof b.title=="string"&&b.title.length>0&&z.set(S,b.title),b.workflow&&typeof b.workflow=="object"&&A.set(S,b.workflow),p.push({...$t(S),title:b.title||W[S]||S,lane:"running",kind:"session",status:"in_progress",started_at:Ci(b.started_at)??Ci(b.updated_at)??void 0,updated_at:Ci(b.updated_at)??void 0,workflow:b.workflow||null,labels:Array.isArray(b.labels)?b.labels:[],spec_id:typeof b.spec_id=="string"?b.spec_id:"",blocked:b.blocked===!0,...Array.isArray(b.blocked_by)?{blocked_by:b.blocked_by.filter(H=>typeof H=="string"&&H.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,badges:[],alert:!1}))}for(let b of Array.isArray(R.pr_wait)?R.pr_wait:[]){let S=b&&b.bead_id;if(typeof S!="string"||nt.has(S))continue;nt.add(S);let H=Et(Me[S]),ie=Et(H.pr),ae=H.gate?Et(H.gate):null,ve=ot.has(S),Se=ct.get(S)?.continuation_action||null,Je=!!Se&&Se.continuation===null,rt=ye.active===S,Ye=b.external===!0,ut=I[S]||null,Rt=Et(De[S]),ft=Ss({bead_id:S,merge_sha:b.merge_sha,cleanup_cursor:b.cleanup_cursor,merge_progress:Rt.merge_progress||null,cleanup_failed:ut,repo_operations:Qe}),tn=Xo(ft),jt=!!ae&&ae.base_badge==="\uCDA9\uB3CC",Pt=!!ut&&["child_sweep","branch_cleanup","parent_close"].includes(ut.step)&&!!ae&&ae.tier==="merged",Bt=Ye&&!!ut&&!!ae&&ae.tier==="merged",Mt=!!ae&&["closed_unmerged","review","undecidable"].includes(ae.tier),Lt=En(J,S,{external:Ye,merge_active:rt||ft?.step==="merge",merge_queued:ve,cleanup_active:tn,merged:!!ut||ae?.tier==="merged"}),ze=!!Lt.operation;f.push({...$t(S),lane:"pr_wait",workflow:V[S]||null,pr_number:typeof ie.number=="number"?ie.number:null,pr_url:typeof ie.url=="string"?ie.url:void 0,external:Ye,usage:pn(qe,S),merge_step:ft,badges:Je?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ft?[ae?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:ut?[fr(ut.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${fr(ut.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ae?.gate_badge=="string"&&ae.gate_badge.length>0?[ae.gate_badge]:[],alert:ft?ft.failed===!0:!!ut||Mt,reason:ut&&ft?.active!==!0?Qo(ut.step):"PR \uB300\uAE30",merge_action:ae?.tier==="merged"&&!Pt&&!Bt?!1:!ve||Je,merge_enabled:!ze&&(Je||ae?.enabled===!0||jt||Pt||Bt),merge_label:Je?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Bt||Pt?"\uC815\uB9AC \uC7AC\uAC1C":jt&&!Pt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Je?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ze?Lt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Lt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Lt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Bt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Pt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":jt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ae?.enabled===!0?`\uBA38\uC9C0 (${ae.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ae?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ve&&!Je,cancel_enabled:!rt,continuation_mismatch:Se?.mismatch||null,discard:Lt,discard_action:Lt.action,discard_enabled:Lt.enabled,discard_title:Lt.title})}let Y=(b,S,H,ie)=>{let ae=b&&b.bead_id;if(typeof ae!="string"||nt.has(ae))return null;nt.add(ae);let ve=Ge[ae],Se=En(J,ae),Je=Se.operation?Se:null,rt={...$t(ae),lane:S,workflow:V[ae]||null,draggable:!Je,discard:Je||void 0,reason:Ad(Ke,ae),seq:H+1,queue_position:H+1,queue_index:H,queue_length:ie,badges:ve?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ve,revise_action:!!ve,revise_enabled:!!ve&&!Je,revise_title:ve?ve.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ve.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(re,ae)&&(rt.blocked_by=Array.isArray(re[ae])?re[ae].filter(Ye=>typeof Ye=="string"&&Ye.length>0):[]),rt};for(let b=0;b<ht.length;b++){let S=Y(ht[b],"queue",b,ht.length);if(!S)continue;h.push(S);let H=N.get(ue);H?H.push(S):N.set(ue,[S])}let le=b=>{let S=f.find(ae=>ae.id===b&&ae.root_dir===ue);if(S)return{id:b,title:S.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let H=p.find(ae=>ae.id===b&&ae.root_dir===ue),ie=H&&H.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":H&&H.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:b,title:H?H.title:$t(b).title,badge:ie}},Ne=[];for(let b=0;b<Math.max(Tt,bt.length);b++){let S=`s${b+1}`,H=wt.get(S),ie=H&&Array.isArray(H.entries)?H.entries:[],ae=[];for(let Je=0;Je<ie.length;Je++){let rt=Y(ie[Je],S,Je,ie.length);rt&&(ae.push(rt),h.push(rt))}let ve=Et(tt[S]),Se=Array.isArray(ve.occupied_by)?ve.occupied_by.filter(Je=>typeof Je=="string"):[];ae.length===0&&Se.length===0&&(Tt<=1||b>=Tt)||Ne.push({id:S,index:b,items:ae,raw_length:ie.length,occupied_by:Se,occupants:Se.map(Je=>le(Je)),corrections:Array.isArray(ve.corrections)?ve.corrections.length:0,cycle:ve.cycle===!0,...ae.length===0&&Se.length===0?{empty:!0}:{}})}j.set(ue,Ne);let E=Array.from({length:Tt},(b,S)=>{let H=`s${S+1}`,ie=wt.get(H),ae=ie&&Array.isArray(ie.entries)?ie.entries:[],ve=Et(tt[H]);return{id:H,index:ae.length,length:ae.length,occupied_by:Array.isArray(ve.occupied_by)?ve.occupied_by.filter(Se=>typeof Se=="string"):[]}});for(let b of Array.isArray(R.runnable)?R.runnable:[]){let S=b&&b.bead_id;if(typeof S!="string"||nt.has(S))continue;nt.add(S);let H=b.workflow&&typeof b.workflow=="object"?b.workflow:null,ie=H&&typeof H.route=="string"&&H.route||(typeof b.route=="string"?b.route:null),ae=vh(Et(Re),b.exec_pins,ie);Array.isArray(b.blocked_by)&&b.blocked_by.length>0&&L.set(S,b.blocked_by.filter(ve=>typeof ve=="string"&&ve.length>0)),typeof b.title=="string"&&b.title.length>0&&z.set(S,b.title),H&&A.set(S,H),Array.isArray(b.scope)&&D.set(S,b.scope.filter(ve=>typeof ve=="string"&&ve.length>0)),d.push({...$t(S),title:b.title||W[S]||S,lane:"runnable",draggable:!0,reason:Ad(Ke,S),created_at:b.created_at??void 0,updated_at:b.updated_at??void 0,status:typeof b.status=="string"?b.status:void 0,labels:Array.isArray(b.labels)?b.labels:[],spec_id:typeof b.spec_id=="string"?b.spec_id:"",workflow:H||(ie?{route:ie,chips:{route:ie}}:null),...ae?{exec_chips:ae}:{},blocked:b.blocked===!0,...Array.isArray(b.blocked_by)?{blocked_by:b.blocked_by.filter(ve=>typeof ve=="string"&&ve.length>0)}:{},place_index:ht.length,place_lanes:E})}for(let b of he){let S=b&&b.bead_id;if(typeof S!="string"||nt.has(S)||(nt.add(S),o!==void 0&&typeof b.added_at=="number"&&b.added_at<o))continue;let H=bh(qe,S),ie=H&&typeof H.done_kind=="string"?H.done_kind:null;w.push({...$t(S),lane:"done",done:!0,done_layout:"three_line",usage:pn(qe,S),work_ms:jo(qe,S),done_at:typeof b.added_at=="number"?b.added_at:void 0,done_kind:ie,badges:ie&&xd[ie]?[xd[ie]]:[]})}}let U=new Map;s.forEach((R,ue)=>{R&&typeof R.root_dir=="string"&&U.set(R.root_dir,ue)});let F=n&&n.running_sort==="repo"?"repo":"started";p.sort((R,ue)=>{let Ce=R.kind==="session",Re=ue.kind==="session";if(Ce!==Re)return Ce?1:-1;if(Ce&&Re){let W=Jo(ue.updated_at)-Jo(R.updated_at);return W!==0?W:R.id.localeCompare(ue.id)}if(F==="repo"){let W=U.get(R.root_dir)??Number.MAX_SAFE_INTEGER,G=U.get(ue.root_dir)??Number.MAX_SAFE_INTEGER;if(W!==G)return W-G}let je=typeof R.started_at=="number"&&Number.isFinite(R.started_at)?R.started_at:null,qe=typeof ue.started_at=="number"&&Number.isFinite(ue.started_at)?ue.started_at:null;return je!==null&&qe!==null&&je!==qe?je-qe:je===null&&qe!==null?1:je!==null&&qe===null?-1:R.id.localeCompare(ue.id)}),w.sort((R,ue)=>(ue.done_at??0)-(R.done_at??0));let be=s.length>0?s:r.map(R=>({root_dir:R&&R.root_dir,name:R&&R.name,auto_advance:R&&R.auto_advance,auto_merge:R&&R.auto_merge,slots:R&&R.slots,revision:R&&R.revision,runner_catalog:R&&R.runner_catalog})),$e=new Set(d.map(R=>R.root_dir)),ee=[];for(let R of be){if(!R||typeof R.root_dir!="string")continue;let ue=N.get(R.root_dir)||[],Ce=j.get(R.root_dir)||[];!(ue.length>0||Ce.some(je=>je.items.length>0||je.occupied_by.length>0))&&!$e.has(R.root_dir)||ee.push({root_dir:R.root_dir,name:R.name||R.root_dir,auto_advance:R.auto_advance===!0,auto_merge:R.auto_merge===!0,slots:typeof R.slots=="number"&&R.slots>=$d?R.slots:$d,revision:typeof R.revision=="number"?R.revision:0,runner_catalog:Et(R.runner_catalog),items:ue,sublanes:{parallel:ue,serial:Ce},serial_lane_count:K.get(R.root_dir)||0,raw_queue_length:te.get(R.root_dir)||0})}let Q={runnable:d,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:i==="updated_flat",queue:h,queue_groups:ee,running:p,pr_wait:f,done:w,chains:[],parallel_rows:[],chain_lanes:[],parallel_raw_length:Object.fromEntries(te),owner_of:{},pending_lanes_kept:[]},xe=yd(Q);for(let R of x)xe.has(R.id)||xe.set(R.id,{root_dir:R.root_dir,workspace_name:R.workspace_name,lane:"done",state:"done"});let Oe=new Map;for(let[R,ue]of L)for(let Ce of ue){let Re=Oe.get(Ce);Re?Re.includes(R)||Re.push(R):Oe.set(Ce,[R])}for(let R of[...Q.queue,...Q.runnable]){if(!Object.hasOwn(R,"blocked_by"))continue;let ue=xe.get(R.id);R.blockers=(R.blocked_by||[]).map(Ce=>vd(Ce,ue,xe,s)),R.blocker_warnings=R.blockers.filter(Ce=>Ce.missing_internal).map(Ce=>`\u26A0 \uC120\uD589 ${Ce.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),R.blocker_warnings.length>0&&(R.alert=!0)}for(let R of[...Q.queue,...Q.runnable,...Q.running,...Q.pr_wait]){let ue=R.lane==="running"||R.lane==="pr_wait"?[]:(R.blockers||[]).map(wh),Ce=[];for(let qe of Oe.get(R.id)||[]){let W=kh(qe,xe);W&&Ce.push(W)}let Re=R.lane==="running"||R.lane==="pr_wait"?[]:R.blocker_warnings||[];if(ue.length===0&&Ce.length===0&&Re.length===0)continue;let je={predecessors:ue,successors:Ce,warnings:Re};R.dependency_chips=je}Th(Q,M,D,xe,s),Q.chains=xh(L,xe,s);let ne=wd(Q.queue_groups);for(let R of Q.queue_groups)for(let ue of R.sublanes.serial){let Ce=ne.get(kd(R.root_dir,ue.id));Ce&&(ue.cross_wait_peers=Ce)}let oe=Sh(Q.chains,Array.isArray(n?.pending_lanes)?n.pending_lanes:[],L,xe,s,z,A);Q.chain_lanes=oe.chain_lanes,Q.pending_lanes_kept=oe.pending_lanes_kept;let Ae=new Map;for(let R of[...Q.running,...Q.queue,...Q.runnable])Ae.has(R.id)||Ae.set(R.id,R);let B=new Set;for(let R of Q.chain_lanes)for(let ue of R.rows){B.add(ue.id);let Ce=Ae.get(ue.id);Ce&&(Ce.overlap_chips&&(ue.overlap_chips=Ce.overlap_chips),Ce.scope_state&&(ue.scope_state=Ce.scope_state))}let X=[];for(let R of N.values())for(let ue of R)B.has(ue.id)||X.push(ue);X.sort((R,ue)=>{let Ce=R.workspace_name.localeCompare(ue.workspace_name);return Ce!==0?Ce:(R.queue_index??0)-(ue.queue_index??0)}),Q.parallel_rows=X;let _e={};for(let[R,ue]of xe)typeof ue.root_dir=="string"&&ue.root_dir.length>0&&(_e[R]=ue.root_dir);Q.owner_of=_e;let ke=Q.runnable.length,we=Q.runnable;a.show_blocked||(we=we.filter(R=>R.blocked!==!0));let Ue=we.length;a.spec==="with"?we=we.filter(R=>!!R.spec_id):a.spec==="without"&&(we=we.filter(R=>!R.spec_id)),Q.runnable_hidden={blocked:ke-Ue,spec:Ue-we.length};let me=(R,ue)=>{let Ce=Jo(ue.updated_at)-Jo(R.updated_at);return Ce!==0?Ce:R.id.localeCompare(ue.id)},gt=i==="repo_spec"?(R,ue)=>{let Ce=R.spec_id?0:1,Re=ue.spec_id?0:1;return Ce!==Re?Ce-Re:me(R,ue)}:me;if(i==="updated_flat")Q.runnable=we.slice().sort(me),Q.runnable_sections=[];else{let R=new Map;for(let Re of we){let je=R.get(Re.root_dir);je?je.push(Re):R.set(Re.root_dir,[Re])}let ue=[],Ce=[];for(let Re of be){if(!Re||typeof Re.root_dir!="string")continue;let je=(R.get(Re.root_dir)||[]).slice().sort(gt);R.delete(Re.root_dir),je.length!==0&&(ue.push({root_dir:Re.root_dir,name:Re.name||Re.root_dir,items:je.map(qe=>({...qe,workspace_name:""}))}),Ce.push(...je))}for(let[Re,je]of R){let qe=je.slice().sort(gt);ue.push({root_dir:Re,name:qe[0]?.workspace_name||Re,items:qe.map(W=>({...W,workspace_name:""}))}),Ce.push(...qe)}Q.runnable=Ce,Q.runnable_sections=ue}return Q}var Cd="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Rd(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Od(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Md="bdui.monitor.done-range",Dd="bdui.monitor.running_sort",Nd="bdui.monitor.candidate_sort",qd="beads-ui.monitor.candidate-filter",Fd="beads-ui.monitor.sections";function Ch(){try{let e=window.localStorage.getItem(qd);if(!e)return{...zr};let t=JSON.parse(e);return!t||typeof t!="object"?{...zr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:zr.show_blocked,spec:Ri.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...zr}}}function Ld(e){try{window.localStorage.setItem(qd,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Rh(){try{let e=window.localStorage.getItem(Nd);return Es.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Oh(e){try{window.localStorage.setItem(Nd,e)}catch{}}function Lh(){try{let e=window.localStorage.getItem(Fd);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Id(e){try{window.localStorage.setItem(Fd,JSON.stringify(e))}catch{}}function Ih(){try{let e=window.localStorage.getItem(Md);return dn(e)?e:sn}catch{return sn}}function Ph(e){try{window.localStorage.setItem(Md,e)}catch{}}function Mh(){try{return window.localStorage.getItem(Dd)==="repo"?"repo":"started"}catch{return"started"}}function Dh(e){try{window.localStorage.setItem(Dd,e)}catch{}}var jd="tab:monitor:pipeline",Nh=1e3,qh=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Pd="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Fh(e){return e>=1&&e<=Pd.length?Pd[e-1]:`(${e})`}function Bd(e,t){let n=Ct("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,u=t.switchWorkspace,d=t.router,p=t.now||(()=>Date.now()),f=t.confirm||(v=>typeof globalThis.confirm!="function"||globalThis.confirm(v)),h=Ih(),w=Mh(),x=Ch(),N=Rh(),j=Lh(),K=null,te=null,L=null,M=[],D=null;function z(){let v=Bn.find(y=>y.value===h);return v?v.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let U=document.createElement("div");U.className="mon2-drawer",e.appendChild(U);let F=Oi(null,null),be=new Map,$e=new Map,ee=null,Q=null,xe=null,Oe=Dr(U,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{K=null,he()}});async function ne(v,y,k,P,Z=!0){if(!o||!k)return null;let ge=await o(v,{...y,root_dir:k,expected_revision:P});if(ge&&ge.conflict&&Z){ge.queue&&$e.set(k,ge.queue);let Ie=ge.queue&&typeof ge.queue.revision=="number"?ge.queue.revision:P;ge=await o(v,{...y,root_dir:k,expected_revision:Ie})}return ge&&ge.queue&&k&&$e.set(k,ge.queue),ge}function oe(v,y){let k=$e.get(v),P=s&&s.get?s.get():null,Z=(Array.isArray(P)?P:[]).find(Ie=>Ie?.root_dir===v);return(k||Z)?.merge_queue?.find(Ie=>Ie.bead_id===y)?.continuation_action}async function Ae(v,y,k,P){let Z=await ne(v,y,k,P),ge=$e.get(k)?.revision??Z?.queue?.revision??P;return Rn(Z,(Ie,Xe)=>ne(v,{...y,continuation:Ie,decision_token:Xe},k,ge,!1),{refresh:Ie=>ne(v,y,k,Ie?.queue?.revision??$e.get(k)?.revision??ge,!1)})}async function B(v,y,k,P){let Z=await Rn({continuation_mismatch:P},(Ie,Xe)=>ne("worker-merge-queue-add",{bead_id:y,continuation:Ie,decision_token:Xe},v,k,!1)),ge=Z?.queue?.merge_queue?.find(Ie=>Ie.bead_id===y)?.continuation_action;Z?.applied!==!0&&ge?.continuation===null&&ge.mismatch&&await B(v,y,Z.queue.revision,ge.mismatch)}async function X(v,y,k){let P=await ne("worker-discard",v,y,k);if(P&&P.discarded===!0){de(Uo(P),"success",5e3);return}if(P&&P.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${P.reason}`,"error");return}if(P&&P.accepted&&P.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(P&&P.accepted){de(`\uD3D0\uAE30 \uC9C4\uD589: ${P.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}P&&!P.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function _e(v,y,k){return!o||!k?null:await o(v,{...y,root_dir:k})}async function ke(){let v=new Map;for(let y of F.pr_wait)v.has(y.root_dir)||v.set(y.root_dir,y.expected_revision);for(let[y,k]of v)await ne("worker-merge-queue-add-all",{},y,k)}function we(v){let y=j[v];return!!(y&&y.runnable===!0)}function Ue(v){let y={...j[v]||{}};y.runnable=!y.runnable,j={...j,[v]:y},Id(j),he()}function me(v){return j[v]===!0}function Ze(v){j={...j,[v]:j[v]!==!0},Id(j),he()}function gt(v){let y=F.queue_groups.find(k=>k.root_dir===v);if(!y)return null;for(let k=0;k<y.serial_lane_count;k+=1){let P=`s${k+1}`,Z=y.sublanes.serial.find(ge=>ge.id===P);if(!Z||Z.raw_length===0&&Z.occupied_by.length===0)return P}return null}function R(v,y){let k=F.queue_groups.find(Z=>Z.root_dir===v),P=k?k.sublanes.serial.find(Z=>Z.id===y):void 0;return P?P.raw_length:0}function ue(v,y){let k=be.get(v),P=be.get(y);if(!k||!P)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let Z=Rd(k),ge=Rd(P);if(Z!==null&&Z===ge&&k.root_dir===P.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let Ie=Od(k),Xe=Od(P);if(Ie&&ge!==null){let $=ge;return{kind:"ops",title:`${$} \uB05D\uC5D0 ${v}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:P.root_dir,ops:[{bead_id:v,lane:$,index:R(P.root_dir,$)}]}}if(Z!==null&&Xe&&ge===null){let $=Z;return{kind:"ops",title:`${$} \uB05D\uC5D0 ${y}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:k.root_dir,ops:[{bead_id:y,lane:$,index:R(k.root_dir,$)}]}}if(Ie&&Z===null&&Xe&&ge===null){let $=gt(k.root_dir);return $===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${$} \uB808\uC778\uC5D0 ${y} \u2192 ${v} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:k.root_dir,ops:[{bead_id:y,lane:$,index:0},{bead_id:v,lane:$,index:1}]}}return!Ie&&!Xe?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:Ie?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function Ce(v,y){let k=ue(v,y.id);return{id:y.id,title:y.title,location_label:y.location_label,prefixes:y.prefixes,action:k.kind==="note"?{kind:"note",text:k.text}:k.kind==="disabled"?{kind:"disabled",label:Cd,title:k.title}:{kind:"place",label:Cd,title:k.title}}}function Re(v,y){if(!L||L.bead_id!==v)return null;let k=L.counterpart_id,P=k===null?y:y.filter(Z=>Z.id===k);return P.length===0?null:{rows:P.map(Z=>Ce(v,Z))}}function je(v){let y=v.dependency_chips||null,k=v.overlap_chips||[],P=v.scope_state==="missing";if(!y&&k.length===0&&!P)return null;let Z=Re(v.id,k);return{...y||{},...k.length>0?{overlaps:k}:{},...P?{scope_missing:!0}:{},...Z?{popover:Z}:{}}}function qe(v){let y=je(v);return y?{...v,dependency_chips:y}:v}async function W(v,y){let k=ue(v,y);if(L=null,k.kind!=="ops"){he();return}let P=ae(k.root_dir,k.ops[0].bead_id);for(let Z of k.ops){let ge=await G(Z,k.root_dir,P);if(ge===null)break;P=ge}he()}async function G(v,y,k){try{let P=await ne("worker-queue-place",v,y,k,!1);if(P&&P.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!P||P.applied!==!0)return de(P&&typeof P.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${P.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let Z=P.queue?P.queue.revision:void 0;return typeof Z!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):Z}catch(P){return de(b(P),"error"),null}}function Me(v){let y=we(v.root_dir);return c`<header class="mon2-sec__hd">
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
    </header>`}function Ke(v,y){return c`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="candidate"
      data-root-dir=${v.root_dir}
    >
      ${y}
    </div>`}function Ge(v){if(te!==v.id)return null;let y=F.queue_groups.find(P=>P.root_dir===v.root_dir),k=v.place_lanes||[];return{bead_id:v.id,lanes:[{id:"parallel",label:"\uBCD1\uB82C",count:v.place_index??0},...F.chain_lanes.map((P,Z)=>({id:`lane:${Z}`,label:`\uC5F0\uACB0 ${Z+1} \uB05D\uC5D0`,count:P.rows.length})),{id:"new-lane",label:"\uC0C8 \uC5F0\uACB0 \uB808\uC778",count:0},...k.map(P=>({id:`serial:${P.id}`,label:`${y?y.name:""} \uC9C1\uB82C ${Number(P.id.slice(1))}`,count:P.length}))]}}function ye(v){return Ke(v,gi(qe(v),Ge(v),{exec_chips_mode:"pinned_only",onOpenDoc:i?(y,k)=>i(k,v.root_dir):void 0}))}function I(){return F.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${F.runnable.map(v=>ye(v))}
      </div>`:c`${F.runnable_sections.map(v=>{let y=we(v.root_dir);return c`<section
        class="mon2-sec${y?" is-collapsed":""}"
        data-root-dir=${v.root_dir}
        data-section="runnable"
      >
        ${Me({root_dir:v.root_dir,name:v.name,count:v.items.length})}
        ${y?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${v.items.map(k=>ye(k))}
            </div>`}
      </section>`})}`}function J(v,y){return c`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="parallel"
      data-root-dir=${v.root_dir}
      data-row-index=${y}
      data-queue-index=${String(v.queue_index??0)}
    >
      ${Gn(qe(v))}
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
    </div>`}function re(){let v=me("parallel");return c`<section
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
        <span class="mon2-area__count">${F.parallel_rows.length}</span>
      </header>
      ${v?"":c`<div class="mon2-area__body" data-drop="parallel">
            ${F.parallel_rows.length===0?c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:F.parallel_rows.map((y,k)=>J(y,k))}
          </div>`}
    </section>`}function V(v,y,k){return c`<div
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
      ${v.cycle?"":c`<span class="mon2-crow__seq" aria-hidden="true"
            >${Fh(y.seq)}</span
          >`}
      ${y.workspace_name?c`<span class="worker-mini__repo" title=${y.root_dir}
            >${y.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${y.id}</span>
      ${Br(y.workflow)}
      <span class="mon2-crow__title">${y.title}</span>
      ${y.predecessors.map(P=>c`<span class="worker-dep worker-dep--pred"
            ><span class="worker-dep__label">← ${P}</span></span
          >`)}
      <span class="mon2-crow__where"
        >${y.location_label==="\uC2E4\uD589\uC911"?`\u25CF ${y.location_label}`:y.location_label}</span
      >
      ${y.draggable?c`<button
            type="button"
            class="mon2-crow__detach"
            data-bead-id=${y.id}
            title="연결에서 빼고 앞뒤를 이어 붙입니다"
            aria-label="연결에서 빼기"
          >
            ✕
          </button>`:""}
      ${jr(je(y),{lane:be.get(y.id)?.lane})}
    </div>`}function De(v){return c`<div class="mon2-clane" data-lane-id=${v.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${v.label}</span>
        <span class="mon2-clane__count">${v.rows.length}</span>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${v.lane_id}
      >
        ${v.cycle?c`<div class="mon2-lane__cycle">
              ⛔ 의존 사이클 — 자동 교정 불가
            </div>`:""}
        ${v.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:v.rows.map((y,k)=>V(v,y,k))}
      </div>
    </div>`}function Qe(v,y,k){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="repo-serial"
      data-root-dir=${y.root_dir}
      data-lane-id=${v.id}
      data-row-index=${k}
      data-queue-index=${String(y.queue_index??0)}
    >
      ${Gn(qe(y))}
    </div>`}function lt(v){if(v.length===0)return"";let y=v.length-1;return`${v[0].id} \uC810\uC720${y>0?` +${y}`:""}`}function ot(v){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${v.id}
    >
      ${Gn({id:v.id,title:v.title,lane:"running",draggable:!1,ghost:!0,badges:[v.badge]})}
    </div>`}function ct(v,y){return c`<div
      class="mon2-lane${y.empty?" mon2-lane--empty":""}"
      data-root-dir=${v.root_dir}
      data-lane-length=${String(y.raw_length)}
    >
      ${_n({id:"",lane:y.id,title:`${v.name} \xB7 \uC9C1\uB82C ${y.index+1}`,items:y.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:c`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${v.root_dir}
          data-lane-id=${y.id}
          data-lane-length=${String(y.raw_length)}
        >
          ${y.occupants.map(k=>ot(k))}
          ${y.items.length>0?y.items.map((k,P)=>Qe(y,k,P)):y.occupants.length>0?"":c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:c`<span
            class="mon2-lane__badge${y.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${y.occupants.length>0?y.occupants.map(k=>`${k.id} \u2014 ${k.badge}`).join(`
`):""}
            >${lt(y.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${v.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${y.empty?c`<div class="mon2-lane__hint">
            ${v.name} 직렬 ${y.index+1} 비어 있음
          </div>`:""}
      ${y.cycle?c`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(y.cross_wait_peers||[]).map(k=>c`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${k.workspace_name}·${k.lane}과 교차 대기
          </div>`)}
    </div>`}function ht(){let v=me("serial"),y=F.chain_lanes.some(k=>k.pending&&k.rows.length===0);return c`<section
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
      ${v?"":c`<div class="mon2-area__body">
            ${F.chain_lanes.map(k=>De(k))}
            ${F.queue_groups.map(k=>k.sublanes.serial.map(P=>ct(k,P)))}
          </div>`}
    </section>`}function bt(){return c`<div class="mon2-wait">${re()}${ht()}</div>`}function tt(v){return c`<div class="worker-rungrid">
      ${F.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:F.running.map(y=>yi({bead_id:y.id,attempt_id:y.attempt_id||"",title:y.title,runner:y.runner??null,model:y.model??null,effort:y.effort??null,speed:y.speed??null,started_at:y.started_at??null,kind:y.kind,...y.kind==="session"?{updated_at:y.updated_at}:{},workflow:y.workflow||null,resumed_from:y.resumed_from??null,continuation_mode:y.continuation_mode??null,paused:y.run_state==="paused",failed:y.run_state==="failed",status:y.status,status_label:y.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:y.can_resume!==!1,can_pause:y.can_pause!==!1,exec_chips:y.exec_chips||null,usage:y.usage||null,discard:y.discard},v,K,{monitor:{repo:y.workspace_name,root_dir:y.root_dir,serial_lane_id:y.serial_lane_id,last_activity:y.last_activity||null,legs:y.legs||[],dependency_chips:je(y)}}))}
    </div>`}function Tt(v){let y={runnable:F.runnable,queue:F.queue,running:F.running,pr_wait:F.pr_wait,done:F.done};return c`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${qh.map(k=>{let P=y[k.lane],Z=k.lane==="runnable"?F.runnable_flat?P.length>0?I():void 0:F.runnable_sections.length>0?I():void 0:k.lane==="queue"?F.queue_groups.length>0||F.chain_lanes.length>0||F.parallel_rows.length>0?bt():void 0:k.lane==="running"?tt(v):P.length>0?c`${P.map(ge=>Gn(ge))}`:void 0;return _n({id:`monitor-${k.lane}`,lane:k.pane,title:k.lane==="done"?`\uC644\uB8CC\xB7${z()}`:k.title,items:P,empty:k.empty,body:Z,live:k.lane==="running"&&P.length>0,controls:k.lane==="runnable"?wt():void 0,header_control:He(k.lane,P.length)})})}
      </div>`}function wt(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${x.show_blocked}
        />
        🔒
        blocked${F.runnable_hidden.blocked>0?` ${F.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ri.map(v=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${x.spec===v.value?" is-active":""}"
              data-spec=${v.value}
              aria-pressed=${x.spec===v.value?"true":"false"}
            >
              ${v.label}
            </button>`)}
        ${F.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${F.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function He(v,y){return v==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${N}
      >
        ${Es.map(k=>c`<option
              value=${k.value}
              ?selected=${N===k.value}
            >
              ${k.label}
            </option>`)}
      </select>`:v==="running"?c`<select
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
      </select>`:v==="pr_wait"&&y>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:v==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${h}
      >
        ${Bn.map(k=>c`<option value=${k.value} ?selected=${h===k.value}>
              ${k.label}
            </option>`)}
      </select>`:""}function he(){let v=s&&s.get?s.get():null,y=s&&s.getWorkspacesState?s.getWorkspacesState():[],k=p(),P=()=>Oi(v,y,{done_since:or(h,k),running_sort:w,candidate_filter:x,candidate_sort:N,pending_lanes:M});F=P(),F.pending_lanes_kept.length!==M.length&&(M=F.pending_lanes_kept.map(Z=>M[Z]),F=P()),be=new Map;for(let Z of[...F.runnable,...F.queue,...F.running,...F.pr_wait,...F.done])be.has(Z.id)||be.set(Z.id,Z);Ve(Tt(k),A),$t()?.render(),mt(),nt()}function mt(){let v=new Map;for(let y of F.queue_groups)v.set(y.root_dir,y.auto_advance);for(let y of Array.from(A.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let k=y.closest(".mon2-item")?.getAttribute("data-root-dir")||"",P=v.get(k);typeof P=="boolean"&&y.setAttribute("title",`${y.textContent||""} \xB7 ${P?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function $t(){if(xe)return xe;let v=A.querySelector(".mon2-deck");return v?(xe=pd(v,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>F.done,rangeLabel:z,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:le,onFocusChange:y=>{D=y,nt()}}),xe):null}function nt(){A.classList.toggle("has-focus",D!==null);for(let v of Array.from(A.querySelectorAll(".mon2-sec[data-root-dir]")))v.classList.toggle("is-focus",D!==null&&v.getAttribute("data-root-dir")===D);for(let v of Array.from(A.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let y=be.get(v.getAttribute("data-bead-id")||"");v.classList.toggle("is-focus",D!==null&&!!y&&y.root_dir===D)}for(let v of Array.from(A.querySelectorAll(".mon2-crow[data-root-dir]")))v.classList.toggle("is-focus",D!==null&&v.getAttribute("data-root-dir")===D)}function Y(v,y){let k=a?a():void 0;if(!y||!k||y===k||!u){r(v);return}u(y).then(()=>{r(v)}).catch(P=>{n("workspace switch for %s failed: %o",y,P)})}function le(v){if(!v)return;let y=a?a():void 0,k=()=>{try{d?.gotoView("worker")}catch(P){n("gotoView(worker) failed: %o",P)}};if(!u||y&&y===v){k();return}u(v).then(k).catch(P=>{n("workspace switch for %s failed: %o",v,P),de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Ne(v){an(v).then(y=>{de(y?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",y?"success":"error",1400)})}function E(v){let y=be.get(v)||null;return{item:y,root_dir:y?y.root_dir:"",revision:y?y.expected_revision:0}}function b(v){if(typeof v=="string"&&v.length>0)return v;if(v&&typeof v=="object"){let y=v;if(typeof y.message=="string"&&y.message.length>0)return y.message;if(typeof y.error=="string"&&y.error.length>0)return y.error;if(y.error&&typeof y.error=="object"&&typeof y.error.message=="string")return y.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function S(v,y,k){let{root_dir:P}=E(y);if(!(!y||!k||k===y))try{await _e(v,{a:y,b:k},P)}catch(Z){de(b(Z),"error")}}function H(){let v=new Map,y=s&&s.get?s.get():null,k=P=>Array.isArray(P)?P.filter(Z=>typeof Z=="string"&&Z.length>0):[];for(let P of Array.isArray(y)?y:[]){if(!P||typeof P!="object")continue;let Z=P.bead_blocked_by&&typeof P.bead_blocked_by=="object"?P.bead_blocked_by:{};for(let[ge,Ie]of Object.entries(Z))Array.isArray(Ie)&&v.set(ge,k(Ie));for(let ge of[...Array.isArray(P.runnable)?P.runnable:[],...Array.isArray(P.session_active)?P.session_active:[]])ge&&typeof ge.bead_id=="string"&&Array.isArray(ge.blocked_by)&&ge.blocked_by.length>0&&v.set(ge.bead_id,k(ge.blocked_by))}return v}function ie(){let v=new Map;for(let k of F.chain_lanes)v.set(k.lane_id,k.rows.map(P=>P.id));let y=new Map;for(let k of F.parallel_rows)typeof k.queue_index=="number"&&y.set(k.id,k.queue_index);for(let k of F.queue_groups)for(let P of k.sublanes.serial)for(let Z of P.items)typeof Z.queue_index=="number"&&y.set(Z.id,Z.queue_index);return{blocked_by_map:H(),owner_of:new Map(Object.entries(F.owner_of)),lane_order:v,parallel_rows:F.parallel_rows.map(k=>({bead_id:k.id,root_dir:k.root_dir,queue_index:k.queue_index??0})),parallel_raw_length:new Map(Object.entries(F.parallel_raw_length)),queue_index_of:y}}function ae(v,y){let k=be.get(y);if(k&&k.root_dir===v)return k.expected_revision;let P=F.queue_groups.find(Z=>Z.root_dir===v);return P?P.revision:0}async function ve(v,y){try{if(v.type==="worker-queue-place"||v.type==="worker-queue-reorder"||v.type==="worker-queue-remove"){let k=await ne(v.type,v.payload,v.root_dir,ae(v.root_dir,y));return k&&k.conflict?(de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):k&&k.applied===!1?(de(k.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${k.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0}return(v.type==="dep-add"||v.type==="dep-remove")&&await _e(v.type,{a:v.a,b:v.b},v.root_dir),!0}catch(k){return de(b(k),"error"),!1}}async function Se(v,y){let k=fd(v,y,ie());if("refused"in k){de(k.refused,"error");return}if(y.kind==="chain"){let P=F.chain_lanes.find(ge=>ge.lane_id===y.lane_id),Z=P&&P.pending&&P.rows.length===0?Number(P.lane_id.slice(8)):-1;Z>=0&&M[Z]&&(M=M.map((ge,Ie)=>Ie===Z?{seed:v.bead_id}:ge))}for(let P of k.ops)if(!await ve(P,v.bead_id))break;he()}async function Je(v,y){let k=be.get(v);if(!k){he();return}let P={kind:"candidate",bead_id:v,root_dir:k.root_dir};if(y==="new-lane"){M.some(ge=>ge.seed===null)||(M=[...M,{seed:null}]),he();let Z=F.chain_lanes.find(ge=>ge.pending&&ge.rows.length===0);if(!Z)return;await Se(P,{kind:"chain",lane_id:Z.lane_id,marker_index:0});return}if(y.startsWith("lane:")){let Z=F.chain_lanes[Number(y.slice(5))];if(!Z){he();return}await Se(P,{kind:"chain",lane_id:Z.lane_id,marker_index:Z.rows.length});return}if(y.startsWith("serial:")){let Z=y.slice(7),ge=(k.place_lanes||[]).find(Ie=>Ie.id===Z);await Se(P,{kind:"repo-serial",root_dir:k.root_dir,lane_id:Z,index:ge?ge.index:0});return}await Se(P,{kind:"parallel",marker_index:F.parallel_rows.length})}async function rt(v,y){let k=F.parallel_rows,P=k.findIndex(T=>T.id===v);if(P<0)return;let Z=k[P].root_dir,ge=[];k.forEach((T,ce)=>{T.root_dir===Z&&ge.push(ce)});let Ie=ge.indexOf(P),Xe=ge[Ie+y];if(typeof Xe!="number")return;let $=y===-1?Xe:ge[Ie+2]??Math.min(k.length,Xe+1);await Se({kind:"parallel",bead_id:v,root_dir:Z,queue_index:k[P].queue_index??0},{kind:"parallel",marker_index:$})}async function Ye(v){for(let y of F.chain_lanes){let k=y.rows.find(P=>P.id===v);if(!(!k||!k.draggable)){await Se({kind:"chain",bead_id:v,root_dir:k.root_dir,lane_id:y.lane_id,...typeof k.queue_index=="number"?{queue_index:k.queue_index}:{}},{kind:"parallel",marker_index:F.parallel_rows.length});return}}}let ut=null,Rt=!1,ft=null;function tn(){ft!==null&&clearTimeout(ft),ft=setTimeout(()=>{ft=null,Rt=!1},0)}function jt(v,y){let k=y&&typeof y.closest=="function"?y.closest("[data-row-index]"):null;if(k&&v.contains(k)){let P=Number(k.getAttribute("data-row-index"));return Number.isFinite(P)?P:0}return v.querySelectorAll("[data-row-index]").length}function Pt(v){let y=v.target,k=typeof y?.closest=="function"?y.closest("[data-drop]"):null;if(!k||!ut)return null;let P=k.getAttribute("data-drop");if(P==="candidate")return{zone:k,target:{kind:"candidate"}};if(P==="parallel")return{zone:k,target:{kind:"parallel",marker_index:jt(k,y)}};if(P==="chain")return{zone:k,target:{kind:"chain",lane_id:k.getAttribute("data-lane-id")||"",marker_index:jt(k,y)}};if(P==="repo-serial"){let Z=k.getAttribute("data-root-dir")||"";if(Z!==ut.root_dir)return null;let ge=typeof y?.closest=="function"?y.closest("[data-queue-index]"):null,Ie=ge&&k.contains(ge)?ge.getAttribute("data-queue-index"):k.getAttribute("data-lane-length"),Xe=Number(Ie);return{zone:k,target:{kind:"repo-serial",root_dir:Z,lane_id:k.getAttribute("data-lane-id")||"",index:Number.isFinite(Xe)?Xe:0}}}return null}function Bt(){for(let v of Array.from(A.querySelectorAll(".is-drop-over")))v.classList.remove("is-drop-over")}function Mt(v){let y=v.target,k=typeof y?.closest=="function"?y.closest('[draggable="true"][data-bead-id]'):null,P=k?k.closest("[data-drag-kind]"):null;if(!P)return;let Z=P.getAttribute("data-bead-id")||"",ge=P.getAttribute("data-drag-kind")||"",Ie=P.getAttribute("data-root-dir")||"";if(!Z||!ge||!Ie)return;let Xe=P.getAttribute("data-queue-index")||"",$=Number(Xe),T=P.getAttribute("data-lane-id")||"";ut={kind:ge,bead_id:Z,root_dir:Ie,...Xe!==""&&Number.isFinite($)?{queue_index:$}:{},...T?{lane_id:T}:{}},Rt=!0,te=null,A.classList.add("is-dragging");try{v.dataTransfer?.setData("text/plain",Z),v.dataTransfer&&(v.dataTransfer.effectAllowed="move")}catch{}}function Lt(v){let y=Pt(v);y&&(v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="move"),y.zone.classList.add("is-drop-over"))}function ze(v){let y=v.target;typeof y?.closest=="function"&&y.closest("[data-drop]")?.classList.remove("is-drop-over")}function nn(){ut=null,Bt(),A.classList.remove("is-dragging"),tn()}function zt(v){let y=Pt(v),k=ut;ut=null,Bt(),A.classList.remove("is-dragging"),!(!y||!k)&&(v.preventDefault(),Se(k,y.target))}function et(v){return{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.run_state==="running"?"running":v.run_state,worktree:v.root_dir}}function Pe(v,y){let{item:k,root_dir:P,revision:Z}=E(y),ge=k?.attempt_id||"",Ie=v.classList;if(Ie.contains("worker-dep__remove")){S("dep-remove",y,v.dataset.blockerId||"");return}if(Ie.contains("mon2-rowops__up")||Ie.contains("mon2-rowops__down")){rt(y,Ie.contains("mon2-rowops__up")?-1:1);return}if(Ie.contains("mon2-rowops__remove")){ne("worker-queue-remove",{bead_id:y},P,Z);return}if(Ie.contains("mon2-crow__detach")){Ye(y);return}if(Ie.contains("mon-overlap__chip")){let Xe=v.getAttribute("data-overlap-all")==="true"?null:v.getAttribute("data-overlap-id")||"";L=!!L&&L.bead_id===y&&L.counterpart_id===Xe?null:{bead_id:y,counterpart_id:Xe},he();return}if(Ie.contains("mon-overlap__place")){W(y,v.getAttribute("data-counterpart-id")||"");return}if(Ie.contains("worker-card__place")){te=te===y?null:y,he();return}if(Ie.contains("worker-card__place-cancel")){te=null,he();return}if(Ie.contains("worker-card__place-lane")){let Xe=v.getAttribute("data-lane")||"parallel";te=null,Je(y,Xe);return}if(Ie.contains("rtile__session")){K=ge,ge&&k&&Oe.open({attempt_id:ge,root_dir:P,meta:et(k)}),he();return}if(Ie.contains("rtile__pause")){_e("worker-attempt-pause",{attempt_id:ge},P);return}if(Ie.contains("rtile__resume")){Lr().then(Xe=>{if(Xe!==null)return Ae("worker-attempt-resume",{attempt_id:ge,...Xe!==""?{instructions:Xe}:{}},P,Z)});return}if(Ie.contains("rtile__dismiss")){ne("worker-attempt-dismiss",{attempt_id:ge},P,Z);return}if(Ie.contains("rtile__discard")){if(!f(ks(y,"unmerged")))return;X({bead_id:y,...ge?{attempt_id:ge}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},P,Z);return}if(Ie.contains("worker-mini__merge")){let Xe=oe(P,y);Xe?.mismatch&&Xe.continuation===null?B(P,y,Z,Xe.mismatch):ne("worker-merge-queue-add",{bead_id:y},P,Z);return}if(Ie.contains("worker-mini__merge-cancel")){ne("worker-merge-queue-remove",{bead_id:y},P,Z);return}if(Ie.contains("worker-mini__discard")){let Xe=v.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(ks(y,Xe)))return;X({bead_id:y,...v.dataset.attemptId?{attempt_id:v.dataset.attemptId}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},P,Z);return}if(Ie.contains("worker-mini__revise-fix")){Ae("worker-revise-fix",{bead_id:y},P,Z);return}Ie.contains("worker-mini__revise-approve")&&ne("worker-revise-approve",{bead_id:y},P,Z)}function C(v){let y=Rt;Rt=!1;let k=v.target;if(!k||typeof k.closest!="function"||k.closest("dialog")||k.closest(".mon2-drawer")||k.closest("a"))return;let P=k.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(P){v.preventDefault();let _=k.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||P.textContent?.trim()||"";_&&Ne(_);return}let Z=k.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(Z){v.preventDefault();let l=Z.getAttribute("data-root-dir")||be.get(k.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||Z.getAttribute("title")||"";le(l);return}let ge=k.closest(".mon2-sec__toggle");if(ge){v.preventDefault(),Ue(ge.getAttribute("data-root-dir")||"");return}let Ie=k.closest(".mon2-area__toggle");if(Ie){v.preventDefault(),Ze(Ie.getAttribute("data-area")||"parallel");return}if(k.closest(".mon2-newlane")){v.preventDefault(),M=[...M,{seed:null}],he();return}if(k.closest(".mon-merge-all")){v.preventDefault(),ke();return}let Xe=k.closest(".mon-filter__spec");if(Xe){v.preventDefault(),x={...x,spec:Xe.getAttribute("data-spec")||"all"},Ld(x),he();return}let $=k.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!$)return;let T=$.getAttribute("data-bead-id")||"",ce=k.closest("button");if(ce){v.preventDefault(),Pe(ce,T);return}T&&!y&&(v.preventDefault(),Y(T,$.getAttribute("data-root-dir")||E(T).root_dir))}function pe(v){let y=v.target;if(!y||typeof y.closest!="function")return;let k=y.closest(".mon-filter__blocked");if(k){x={...x,show_blocked:k.checked},Ld(x),he();return}let P=y.closest(".mon-candidate-sort");if(P){N=Es.some(Ie=>Ie.value===P.value)?P.value:"repo_spec",Oh(N),he();return}let Z=y.closest(".mon-running-sort");if(Z){w=Z.value==="repo"?"repo":"started",Dh(w),he();return}let ge=y.closest(".mon-done-range");ge&&(h=dn(ge.value)?ge.value:sn,Ph(h),he())}function Le(v){if(!L)return;let y=v.target;y&&typeof y.closest=="function"&&y.closest(".mon-overlap__popover, .mon-overlap__chip")||(L=null,he())}function at(v){v.key!=="Escape"||!L||(L=null,he())}e.addEventListener("click",C),e.addEventListener("change",pe),document.addEventListener("click",Le),document.addEventListener("keydown",at),e.addEventListener("dragstart",Mt),e.addEventListener("dragover",Lt),e.addEventListener("dragleave",ze),e.addEventListener("drop",zt),e.addEventListener("dragend",nn),s&&typeof s.subscribe=="function"&&(ee=s.subscribe(()=>{try{$e.clear(),he()}catch{}}));function xt(){Q!==null&&(clearInterval(Q),Q=null)}function yt(){ft!==null&&(clearTimeout(ft),ft=null)}return{load(){n("load"),he(),Q===null&&(Q=setInterval(()=>{try{he()}catch{}},Nh))},pause(){xt()},clear(){xt(),yt(),ee&&(ee(),ee=null),Oe.destroy(),xe?.destroy(),xe=null,e.removeEventListener("click",C),e.removeEventListener("change",pe),document.removeEventListener("click",Le),document.removeEventListener("keydown",at),e.removeEventListener("dragstart",Mt),e.removeEventListener("dragover",Lt),e.removeEventListener("dragleave",ze),e.removeEventListener("drop",zt),e.removeEventListener("dragend",nn),e.replaceChildren()}}}function Ud(e,t,n){let r=Ct("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(h){return w=>{w.preventDefault(),r("click tab %s",h),n.gotoView(h)}}function u(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function d(){let h=u();return c`
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
    `}function p(){let h=u();return c`
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
    `}function f(){s&&Ve(d(),s),o&&Ve(p(),o)}return f(),a=t.subscribe(()=>f()),{destroy(){a&&(a(),a=null),s&&Ve(c``,s),o&&Ve(c``,o)}}}var Wd=["bug","feature","task","epic","chore"];function zd(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Hd=["Critical","High","Medium","Low","Backlog"];function Gd(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),u=n.querySelector("#new-description"),d=n.querySelector("#new-issue-error"),p=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function w(){o.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",o.appendChild(D);for(let z of Wd){let A=document.createElement("option");A.value=z,A.textContent=zd(z),o.appendChild(A)}a.replaceChildren();for(let z=0;z<=4;z+=1){let A=document.createElement("option");A.value=String(z);let U=Hd[z]||"Medium";A.textContent=`${z} \u2013 ${U}`,a.appendChild(A)}}w();function x(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function N(D){s.disabled=D,o.disabled=D,a.disabled=D,i.disabled=D,u.disabled=D,p.disabled=D,f.disabled=D,f.textContent=D?"Creating\u2026":"Create"}function j(){d.textContent=""}function K(D){d.textContent=D}function te(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?o.value=D:o.value="";let z=window.localStorage.getItem("beads-ui.new.priority");z&&/^\d$/.test(z)?a.value=z:a.value="2"}catch{o.value="",a.value="2"}}function L(){let D=o.value||"",z=a.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),z.length>0&&window.localStorage.setItem("beads-ui.new.priority",z)}async function M(){j();let D=String(s.value||"").trim();if(D.length===0){K("Title is required"),s.focus();return}let z=Number(a.value||"2");if(!(z>=0&&z<=4)){K("Priority must be 0..4"),a.focus();return}let A=String(o.value||""),U=String(u.value||""),F={title:D};A.length>0&&(F.type=A),String(z).length>0&&(F.priority=z),U.length>0&&(F.description=U),N(!0);try{await t("create-issue",F)}catch{N(!1),K("Failed to create issue");return}L(),N(!1),x()}return n.addEventListener("cancel",D=>{D.preventDefault(),x()}),h.addEventListener("click",()=>x()),p.addEventListener("click",()=>x()),n.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),M())}),r.addEventListener("submit",D=>{D.preventDefault(),M()}),{open(){r.reset(),j(),te();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){x()}}}var jh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Bh(e,t){return Ea(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Vd(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=Bh(r,e);return c`<button
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
  `}function Kd(e,t,n){return c`
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
  `}function Yd(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${jh.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Uh=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Zd(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(Q=>de(Q,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",u=!1,d="",p=null;function f(){if(p)return p;let Q=a.querySelector('[data-pane="execution"]');return Q?(p=Vo(Q,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:xe=>t.queueStore?.set?.(xe)}),p):null}function h(){return c`
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
    `}function w(){let Q=r.get();return c`
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
        ${Q?c`
              ${Vd(Q,s(),K)}
              ${Kd(Q,d,{onDraft:xe=>{d=xe},onAdd:te,onRemove:L})}
              ${Yd(Q,M)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function x(Q){let xe=r.get();if(xe)try{let Oe=await n("display-policy-set",{expected_revision:xe.revision,policy:Q(xe)});N(Oe),Oe&&Oe.conflict&&Oe.policy&&(Oe=await n("display-policy-set",{expected_revision:Oe.policy.revision,policy:Q(Oe.policy)}),N(Oe)),Oe&&Oe.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function N(Q){Q&&Q.policy&&typeof Q.policy=="object"&&r.set(Q.policy)}function j(Q){x(Q)}function K(Q){let xe=r.get();if(!xe)return;let Oe=!Wh(Q,xe);j(ne=>zh(Q,ne,Oe))}function te(){let Q=d.trim();Q.length!==0&&(d="",j(xe=>xe.hidden_prefixes.includes(Q)?{hidden_prefixes:xe.hidden_prefixes}:{hidden_prefixes:[...xe.hidden_prefixes,Q]}),D())}function L(Q){j(xe=>({hidden_prefixes:xe.hidden_prefixes.filter(Oe=>Oe!==Q)}))}function M(Q){let xe=r.get();if(!xe)return;let Oe=xe.chips[Q]===!1;j(()=>({chips:{[Q]:Oe}}))}function D(){Ve(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Uh.map(Q=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${Q.id}
                  aria-selected=${String(i===Q.id)}
                  aria-controls=${`settings-pane-${Q.id}`}
                  @click=${()=>z(Q.id)}
                >
                  <span class="settings-dialog__glyph">${Q.glyph}</span>
                  ${Q.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${ee}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${w()}
          </div>
        </div>
      `,a),f()}function z(Q){i=Q,D()}let A=()=>{u=!1,t.onOpenChange?.(!1)};a.addEventListener("close",A),a.addEventListener("cancel",A);let U=Q=>{Q.target===a&&ee()};a.addEventListener("click",U);let F=null;r.subscribe&&(F=r.subscribe(()=>{u&&D()}));let be=null;t.implPresetStore?.subscribe&&(be=t.implPresetStore.subscribe(()=>{u&&p?.render()}));function $e(Q="execution"){u||(u=!0,t.onOpenChange?.(!0),i=Q,d="",D(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),f()?.load())}function ee(){u&&(u=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:$e,close:ee,sessionDraft:()=>p?.sessionDraft()??{},destroy(){u=!1,a.removeEventListener("close",A),a.removeEventListener("cancel",A),a.removeEventListener("click",U),F&&(F(),F=null),be&&(be(),be=null),p?.destroy(),p=null,a.remove()}}}function Wh(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function zh(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Hh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Qd="usage-meter-card",Gh="usage-meter-layer",Xd=600,Vh=["token_expired","relogin_required"];function Jd(e){return String(e).padStart(2,"0")}function Kh(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function ep(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Jd(r.getHours())}:${Jd(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${Hh[r.getMonth()]} ${r.getDate()} ${o}`;return`${Kh(n,t)} \xB7 ${i}`}function Yh(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function tp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function np(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var rp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function op(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Zh(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:op(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Qh(e){if(!e||typeof e!="object")return null;let t=e,n=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=Zh(s);o&&n.push(o)}let r=t.available===!0&&Array.isArray(t.windows);return!r&&n.length===0?null:{available:r,windows:r?op(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:n}}function sp(e,t){return`${e}:${t}`}function ap(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,u=null;function d(){Ve(c``,e),e.hidden=!0,f()}function p(){if(u===null){let ne=e.ownerDocument;u=ne.createElement("div"),u.id=Gh,u.className="usage-meter__layer",ne.body.appendChild(u)}return u}function f(){u!==null&&(Ve(c``,u),u.remove(),u=null)}function h(ne){n!==ne&&(n===null&&(document.addEventListener("mousedown",x),document.addEventListener("keydown",j),window.addEventListener("resize",N)),n=ne)}function w(){n!==null&&(n=null,document.removeEventListener("mousedown",x),document.removeEventListener("keydown",j),window.removeEventListener("resize",N))}function x(ne){let oe=ne.target;oe&&(e.contains(oe)||u!==null&&u.contains(oe))||(w(),ee())}function N(){ee()}function j(ne){ne.key==="Escape"&&(w(),ee())}function K(ne){n===ne?w():h(ne),ee()}function te(){w(),ee()}async function L(ne,oe){if(r.has(ne.key))return;let Ae=sp(ne.key,oe);r.set(ne.key,oe),a.delete(Ae),ee();let B=null;try{B=await(await fetch(ne.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:oe})})).json()}catch{B=null}if(t)return;if(r.delete(ne.key),!B||B.ok!==!0){let _e=B&&typeof B.error=="string"&&B.error.length>0?B.error:"network_error";a.set(Ae,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${_e}`}),ee();return}let X=Array.isArray(B.warnings)?B.warnings.filter(_e=>typeof _e=="string"&&_e.length>0):[];X.length>0&&a.set(Ae,{kind:"warn",text:X.join(" \xB7 ")}),ee(),await Oe()}function M(ne,oe,Ae,B){let X=np(ne.pct),ke=`resets ${ep(ne.resetsAt,B)}${oe?` \xB7 ${Ae}`:""}`;return c`<span
      class="usage-meter__window ${tp(X)}"
      style=${`--progress: ${X}%`}
      title=${ke}
    >
      <span class="usage-meter__label">${ne.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${X}%</span>
    </span>`}function D(ne,oe,Ae){let B=oe.available&&typeof oe.ageSeconds=="number"&&oe.ageSeconds>Xd,X=B&&typeof oe.ageSeconds=="number"?`${Math.floor(oe.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",_e=oe.accounts.filter(me=>!me.active).length,ke=`usage-meter__group${B?" usage-meter__group--stale":""}`,we=c`<span class="usage-meter__provider"
        >${ne.label}</span
      >
      ${oe.available?oe.windows.map(me=>M(me,B,X,Ae)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${_e>0?c`<span class="usage-meter__badge">+${_e}</span>`:""}`;if(oe.accounts.length===0)return c`<span
        class=${ke}
        aria-label=${`${ne.label} usage`}
        >${we}</span
      >`;let Ue=n===ne.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${ke}`}
      aria-label=${`${ne.label} usage`}
      aria-expanded=${Ue?"true":"false"}
      aria-controls=${Qd}
      @click=${()=>K(ne.key)}
    >
      ${we}
    </button>`}function z(ne,oe){return c`<span class="usage-meter" aria-label="Usage">
      ${ne.map(Ae=>D(Ae.provider,Ae.snapshot,oe))}
    </span>`}function A(ne,oe){let Ae=np(ne.pct),B=ep(ne.resetsAt,oe);return c`<span
      class="usage-meter__account-window ${tp(Ae)}"
      style=${`--progress: ${Ae}%`}
    >
      <span class="usage-meter__account-key">${ne.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Ae}%</span>
      <span class="usage-meter__account-reset"
        >${B.length>0?`\u21BB ${B}`:""}</span
      >
    </span>`}function U(ne,oe){return Vh.includes(oe)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ne.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function F(ne,oe,Ae){let B=oe.status==="ok",X=typeof oe.ageSeconds=="number"&&oe.ageSeconds>Xd,_e=a.get(sp(ne.key,oe.number)),ke=r.get(ne.key),we=ke!==void 0,Ue=ke===oe.number,me=["usage-meter__account"];return oe.active&&me.push("usage-meter__account--active"),B||me.push("usage-meter__account--unavailable"),X&&me.push("usage-meter__account--stale"),c`<div class=${me.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${oe.email}
          >${oe.alias===null?oe.email:oe.alias}</span
        >
        ${oe.plan===null?"":c`<span class="usage-meter__account-tag">${oe.plan}</span>`}
        ${oe.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${oe.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${Yh(oe.ageSeconds)}</span
            >`}
        ${oe.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${we}
              @click=${()=>{L(ne,oe.number)}}
            >
              ${Ue?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${B?c`<div class="usage-meter__account-windows">
            ${oe.windows.map(Ze=>A(Ze,Ae))}
          </div>`:c`<div class="usage-meter__account-status">
            ${U(ne,oe.status)}
          </div>`}
      ${_e===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${_e.kind}"
          >
            ${_e.text}
          </div>`}
    </div>`}function be(ne,oe,Ae){let B=oe.accounts.filter(X=>X.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ne.label} · 활성 ${B} / 전체
        ${oe.accounts.length}
      </h2>
      ${oe.accounts.map(X=>F(ne,X,Ae))}
    </section>`}function $e(ne,oe){return c`<div
      class="usage-meter__card"
      id=${Qd}
      role="dialog"
      aria-label=${`${ne.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${be(ne.provider,ne.snapshot,oe)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function ee(){let ne=[];for(let B of rp){let X=o.get(B.key);X&&ne.push({provider:B,snapshot:X})}if(ne.length===0){w(),d();return}let oe=ne.find(B=>B.provider.key===n&&B.snapshot.accounts.length>0);oe||w();let Ae=Date.now();Ve(z(ne,Ae),e),e.hidden=!1,oe?Q(oe,Ae):f()}function Q(ne,oe){let Ae=p(),B=e.getBoundingClientRect(),X=e.ownerDocument.documentElement.clientWidth;Ae.style.setProperty("--usage-meter-anchor-top",`${B.bottom}px`),Ae.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,X-B.right)}px`),Ve(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${te}
        ></div>
        ${$e(ne,oe)}`,Ae)}async function xe(ne){try{let oe=await fetch(ne.endpoint);return oe.ok?Qh(await oe.json()):null}catch{return null}}async function Oe(){i+=1;let ne=i,oe=await Promise.all(rp.map(async Ae=>({provider:Ae,snapshot:await xe(Ae)})));if(!(t||ne!==i)){for(let Ae of oe)Ae.snapshot?o.set(Ae.provider.key,Ae.snapshot):o.delete(Ae.provider.key);ee()}}return d(),Oe(),s=setInterval(()=>{Oe()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),w(),d()}}}function ip(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Xh="worker-ineligible";function Li(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function lp(e){return Li(e).includes(Xh)}var Jh="worker-serial";function Ii(e){return Li(e).includes(Jh)}function Pi(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var eb=new Set(["done","failed","orphaned","stopped","discarded"]),tb={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},nb={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},rb={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Mi(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:rb[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function cp(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let u=new Map,d=new Map,p=!1,f=null,h=null,w=null,x=new Set,N=!1,j=0,K=null,te=new Set;function L(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function M(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function D(){return o&&o()||""}async function z(){if(!s)return;let E=++j;N=!0,w=null,x.clear(),He();try{let b=await s("worker-parallel-analysis-targets",{root_dir:D()});if(E!==j||!he)return;let S=Array.isArray(b?.qualified)?b.qualified:[],H=Array.isArray(b?.excluded)?b.excluded:[];w={qualified:S,excluded:H};for(let ie of S)ie&&typeof ie.id=="string"&&x.add(ie.id)}catch{E===j&&he&&(w={qualified:[],excluded:[]},de("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{E===j&&(N=!1,he&&He())}}function A(E){return Array.isArray(E.runs)?E.runs:[]}function U(){let E=L(),b=new Set;for(let S of Object.values(E.attempts||{})){let H=S;H&&typeof H.bead_id=="string"&&!eb.has(H.status)&&b.add(H.bead_id)}for(let S of Array.isArray(E.pr_wait)?E.pr_wait:[])S&&typeof S.bead_id=="string"&&b.add(S.bead_id);for(let S of Object.values(E.discard_operations||{})){let H=S;H&&H.phase!=="done"&&typeof H.bead_id=="string"&&b.add(H.bead_id)}return b}function F(E){return E.filter(b=>be(b)===null)}function be(E){let b=L();for(let S of Array.isArray(b.serial_lanes)?b.serial_lanes:[])if(Array.isArray(S?.entries)&&S.entries.some(H=>H.bead_id===E))return S.id;return(Array.isArray(b.queue)?b.queue:[]).some(S=>S.bead_id===E)?"parallel":null}function $e(E,b){let S=u.get(E);return S||[...b.order]}function ee(E){if(E.length<2)return!1;let b=be(E[0]);if(!b||b==="parallel")return!1;let S=L(),H=(Array.isArray(S.serial_lanes)?S.serial_lanes:[]).find(ae=>ae.id===b)?.entries.map(ae=>ae.bead_id);if(!Array.isArray(H))return!1;let ie=E.map(ae=>H.indexOf(ae));return ie.every(ae=>ae>=0)&&ie.every((ae,ve)=>ve===0||ae>ie[ve-1])}function Q(){let E=L(),b=Array.isArray(E.serial_lanes)?E.serial_lanes:[],S=b.find(H=>Array.isArray(H.entries)&&H.entries.length===0);return S?S.id:b[0]?.id||"s1"}function xe(E){let b=L().bead_titles||{};return typeof b[E]=="string"?b[E]:E}async function Oe(E,b){if(!s||p)return null;p=!0,He();try{return await s(E,b)}finally{p=!1,He()}}async function ne(E){r?.setPending?.(!0);try{let b=await Oe("worker-parallel-analysis-start",{force:E,target_ids:Array.from(x)});b&&b.applied===!1&&b.reason&&(b.reason==="target_not_qualified"&&Array.isArray(b.detail)?de(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${b.detail.join(", ")}`,"error",3200):de(`\uBD84\uC11D \uC2E4\uD328: ${b.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function oe(){let E=M().job;!s||!E||await s("worker-parallel-analysis-cancel",{job_id:E.job_id})}async function Ae(E){if(!(!s||te.has(E))){te.add(E),He();try{let b=await s("worker-parallel-analysis-prompt",{root_dir:D(),run_id:E});if(!he)return;if(b?.ok===!0&&typeof b.prompt=="string"){K={run_id:E,prompt:b.prompt};return}de(b?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{te.delete(E),He()}}}function B(){K=null,He()}async function X(){if(!K)return;let E=await an(K.prompt);de(E?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",E?"success":"error",1400)}function _e(E,b){a&&a(E,Mi(b))}function ke(){return L().runner_catalog}function we(E){return Object.keys(ke()?.runners?.[E]?.models||{})}function Ue(E){let b=we(E),S=ke()?.runners?.[E]?.default_model;return typeof S=="string"&&b.includes(S)?S:b[0]||""}function me(){let E=M().settings,b=f||E.runner||"claude",S=we(b),H=f?Ue(b):E.model||S[0]||"",ie=Pi(ke(),b,H),ae=E.effort||"",ve=ie.includes(ae)?ae:ie[0]||"";return{runner:b,model:H,effort:ve,models:S,efforts:ie}}async function Ze(E){let b=M().settings,S=await Oe("worker-parallel-analysis-settings-update",{expected_revision:b.revision,runner:E.runner,model:E.model,effort:E.effort});(!S||S.applied!==!0)&&(f=null,He(),S&&S.reason&&de(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${S.reason}`,"error",2800))}function gt(E){f=E,He();let b=me();Ze({runner:E,model:b.model,effort:b.effort})}function R(E){let b=me(),S=Pi(ke(),b.runner,E);Ze({runner:b.runner,model:E,effort:S.includes(b.effort)?b.effort:S[0]||""})}function ue(E){let b=me();Ze({runner:b.runner,model:b.model,effort:E})}async function Ce(E,b){if(!s||p)return;let S=$e(E,b),H=M();if(S.length<2||!H.last_good){de("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let ie=d.get(E)||Q(),ae=()=>({snapshot_digest:H.last_good.identity_digest,group_index:E,lane:ie,ordered_bead_ids:S,expected_revision:L().revision});p=!0,He();try{let ve=await s("worker-parallel-analysis-submit",ae());ve&&ve.queue&&n&&n.set(ve.queue),ve&&ve.applied!==!0&&ve.conflict===!0&&(ve=await s("worker-parallel-analysis-submit",ae()),ve&&ve.queue&&n&&n.set(ve.queue)),ve&&ve.applied===!0?(u.delete(E),de(`\uC9C1\uB82C \uB808\uC778 ${ie}\uC5D0 ${S.length}\uAC1C \uBC30\uCE58`,"success")):de(`\uC81C\uCD9C \uAC70\uBD80: ${ve?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,He()}}function Re(E,b,S){u.set(E,$e(E,b).filter(H=>H!==S)),He()}function je(E){u.delete(E),He()}function qe(E,b,S,H){let ie=[...$e(E,b)],ae=ie.indexOf(S),ve=ae+H;ae<0||ve<0||ve>=ie.length||(ie.splice(ve,0,...ie.splice(ae,1)),u.set(E,ie),He())}function W(){let E=M().settings,b=Object.keys(ke()?.runners||{}),S=me();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${H=>gt(H.target.value)}
        >
          ${b.map(H=>c`<option
                value=${H}
                ?selected=${S.runner===H}
              >
                ${H}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${H=>R(H.target.value)}
        >
          ${S.models.map(H=>c`<option
                value=${H}
                ?selected=${S.model===H}
              >
                ${H}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${H=>ue(H.target.value)}
        >
          ${S.efforts.map(H=>c`<option
                value=${H}
                ?selected=${S.effort===H}
              >
                ${H}
              </option>`)}
        </select>
      </label>
      ${G(E)}
    </div>`}function G(E){return!Ke(E)||Me(E)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:E.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${E.runner}/${E.model} · effort
        ${E.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:E.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function Me(E){return E.is_default===!0&&E.compatible===!1}function Ke(E){return!!(E.runner&&E.model&&E.effort)}function Ge(E){return Ke(E)&&E.compatible!==!1}function ye(E){let b=Math.max(0,Math.floor(E/1e3)),S=Math.floor(b/60),H=b%60;return`${S}:${String(H).padStart(2,"0")}`}function I(E){let b=E.job;if(b){let S=typeof b.started_at=="number"?b.started_at:0,H=`${b.runner||"?"}/${b.model||"?"}`,ie=S?` \xB7 \uACBD\uACFC ${ye(Date.now()-S)}`:"",ae=typeof b.session_id=="string"?b.session_id:"",ve=A(E).find(Se=>Se.run_id===b.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${H} · effort ${b.effort||"?"}${ie}</span
        >
        ${ae?c`<code class="pa-session-id" title=${ae}
              >${ae.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>_e(b.job_id,ve||b)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${ve?.prompt_saved!==!0||te.has(b.job_id)}
          @click=${()=>{Ae(b.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return re()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function J(E){let b=I(E);return b===""?"":c`<div class="pa__strip">${b}</div>`}function re(){return r?.isPending?.()===!0}function V(E){let b=!!E.job,S=Ge(E.settings),H=w!==null&&x.size===0,ie=b||p||re()||N;return c`<div class="pa-meta">
      ${E.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(E.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!S||ie||H}
        @click=${()=>{ne(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!S||ie||H}
        @click=${()=>{ne(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!b}
        @click=${()=>{oe()}}
      >
        취소
      </button>
    </div>`}function De(E){return typeof E=="string"&&E.length>0?E:"\uBBF8\uBC30\uCE58"}function Qe(E,b){b?x.add(E):x.delete(E),He()}function lt(E){let b=Array.isArray(E.scope)?E.scope:[],S=Array.isArray(E.overlaps)?E.overlaps:[];return b.length===0&&S.length===0?c``:c`<span class="pa-target__signals">
      ${b.length>0?c`<details class="pa-target__scope" title=${b.join(`
`)}>
            <summary>scope ${b.length}</summary>
            <ul>
              ${b.map(H=>c`<li><code>${H}</code></li>`)}
            </ul>
          </details>`:""}
      ${S.length>0?c`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${S.join(", ")}`}
            >겹침 ${S.join(", ")}</span
          >`:""}
    </span>`}function ot(){let E=w?.qualified||[],b=w?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${N?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${E.length} \xB7 \uC81C\uC678 ${b.length}`}</span
        >
      </header>
      ${w&&E.length>0?c`<ul class="pa-targets__list">
            ${E.map(S=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${S.id}
                      .checked=${x.has(S.id)}
                      @change=${H=>Qe(S.id,H.target.checked)}
                    />
                    <span class="pa-target__title">${S.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${lt(S)}
                    <span class="pa-target__route">${S.route}</span>
                    <span class="pa-target__lane"
                      >${De(S.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:w&&E.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${w&&b.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${b.length}</summary>
            <ul class="pa-targets__list">
              ${b.map(S=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${S.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${tb[S.reason]||S.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${De(S.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function ct(E){let b=typeof E.session_id=="string"&&E.session_id.length>0,S=b?E.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${E.outcome}"
        >${nb[E.outcome]||E.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(E.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${E.runner||"?"} / ${E.model||"?"} / ${E.effort||"?"}</span
      >
      ${b?c`<code class="pa-session-id" title=${S}
            >${S.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${E.outcome==="failure"&&E.reason?c`<span class="pa-run-row__reason">${E.reason}</span>`:""}
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
          ?disabled=${E.prompt_saved!==!0||te.has(E.run_id)}
          @click=${()=>{Ae(E.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function ht(E){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${E.length>0?c`<ul class="pa-runs__list">
            ${E.map(b=>ct(b))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function bt(){return K?c`<div
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
              @click=${B}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${K.prompt}</pre
        >
      </section>
    </div>`:""}function tt(E,b){let S=$e(E,b),H=U(),ie=S.filter(Ye=>H.has(Ye)),ae=F(S),ve=ee(S),Se=Array.isArray(L().serial_lanes)?L().serial_lanes:[],Je=d.get(E)||Q(),rt=b.eligible!==!0||S.length<2||ie.length>0||ae.length>0||ve||p;return c`<section class="pa-group" data-group-index=${String(E)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${b.confidence}</span>
        ${b.categories.map(Ye=>c`<span class="pa-group__category">${Ye}</span>`)}
        ${ve?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${b.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${ae.length>0?c`<span class="pa-group__stale"
              >stale — ${ae.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${b.reason}</p>
      <ol class="pa-group__members">
        ${S.map((Ye,ut)=>c`<li class="pa-member" data-bead-id=${Ye}>
              <span class="pa-member__seq">${ut+1}</span>
              <span class="pa-member__title">${xe(Ye)}</span>
              ${H.has(Ye)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ye}
                ?disabled=${ut===0}
                aria-label=${`${Ye} \uC704\uB85C`}
                @click=${()=>qe(E,b,Ye,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ye}
                ?disabled=${ut===S.length-1}
                aria-label=${`${Ye} \uC544\uB798\uB85C`}
                @click=${()=>qe(E,b,Ye,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ye}
                aria-label=${`${Ye} \uC81C\uC678`}
                @click=${()=>Re(E,b,Ye)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${b.evidence.map(Ye=>c`<li class="pa-evidence">
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
            ${Se.map((Ye,ut)=>c`<option
                  value=${Ye.id}
                  ?selected=${Je===Ye.id}
                >
                  직렬 ${ut+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${rt}
          @click=${()=>{Ce(E,b)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Tt(E){let b=Array.isArray(E.issues)?E.issues:[],S=b.filter(ie=>ie.verdict==="parallel_ok").length,H=b.filter(ie=>ie.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${S}</span>
      <span>uncertain ${H}</span>
    </div>`}function wt(){let E=he&&!!M().job;if(E&&h===null){h=setInterval(()=>He(),1e3);return}!E&&h!==null&&(clearInterval(h),h=null)}function He(){let E=M();f&&E.settings.runner===f&&(f=null);let b=E.last_good?.result;wt(),Ve(c`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${Ne}
            >
              ×
            </button>
          </header>
          ${J(E)}
          <div class="pa__body">
            ${W()} ${V(E)} ${ot()}
            ${b?c`${b.groups.map((S,H)=>tt(H,S))}
                ${b.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Tt(b)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${ht(A(E))}
          </div>
        </div>
        ${bt()}
      `,i)}let he=!1,mt=()=>{he=!1,K=null,j+=1,wt()},$t=E=>{E.target===E.currentTarget&&Ne()};i.addEventListener("close",mt),i.addEventListener("cancel",mt),i.addEventListener("click",$t);let nt=null;n&&n.subscribe&&(nt=n.subscribe(()=>{he&&He()}));let Y=null;r&&r.subscribe&&(Y=r.subscribe(()=>{he&&He()}));function le(){he||(he=!0,He(),z(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function Ne(){he&&(he=!1,K=null,j+=1,wt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:le,close:Ne,destroy(){he=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",mt),i.removeEventListener("cancel",mt),i.removeEventListener("click",$t),nt&&(nt(),nt=null),Y&&(Y(),Y=null),i.remove()}}}function up(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let u=i.scope.filter(d=>typeof d=="string"&&d.length>0);if(u.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:u})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let u=Yo(s[a].scope,s[i].scope);if(u.length===0)continue;let d=s[a].member,p=s[i].member;n.get(d.id)?.overlaps.push({id:p.id,title:p.title,location_label:p.location_label,prefixes:u}),n.get(p.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:u})}return n}function Di(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=r.kind!=="running",u=s.kind!=="running";if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&u&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&u&&a===null){let d=sb(n);return d===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${d} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:d,index:0},{bead_id:e,lane:d,index:1}]}}return!i&&!u?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function sb(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var dp=new Set(["sh","bash","zsh","dash","ksh"]),pp=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function fp(e){let t=e.split("/");return t[t.length-1]||""}function ob(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=fp(n[0]);if(r!=="env")return dp.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&dp.has(fp(s))}function ab(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function ib(e){let t=[],n=0;pp.lastIndex=0;for(let r of e.matchAll(pp)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:ab(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function lb(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function _p(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",u=0,d=null,p=!1;function f(D,z){return z?ib(D).map(A=>A.kind==="plain"?A.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${A.kind}"
            >${A.text}</span
          >`):D}function h(){if(!s)return c``;let D=o==="ready"&&ob(a),z=o==="ready"?a.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>L()}
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
              @click=${()=>L()}
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
                  ${z.map((A,U)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${U+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(A,D)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function w(){Ve(h(),r)}async function x(){if(o!=="ready")return;let D=await an(a);de(D?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",D?"success":"error")}function N(D){D.key==="Escape"&&s&&(D.preventDefault(),L())}function j(){p||(document.addEventListener("keydown",N),p=!0)}function K(){p&&(document.removeEventListener("keydown",N),p=!1)}async function te(D,z=null){let A=++u;j(),s={...D},d=z||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",w(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let F=t?t():"";if(!F){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",w();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",w();return}let be="/api/repo-ops-script?workspace="+encodeURIComponent(F)+"&lane="+encodeURIComponent(D.lane)+"&base_sha="+encodeURIComponent(D.base_sha);try{let $e=await n(be),ee=await $e.json().catch(()=>({}));if(A!==u)return;if((t?t():"")!==F){L();return}if(!$e.ok||!ee||ee.ok!==!0){o="error",i=lb(ee&&typeof ee.error=="string"?ee.error:""),w();return}s={lane:ee.lane,base_sha:ee.base_sha,path:ee.path,base_ref:ee.base_ref},a=String(ee.content),o="ready",w()}catch{if(A!==u)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",w()}}function L(){u+=1,K(),s=null,a="",w();let D=d;d=null,D?.isConnected&&D.focus()}function M(){L(),r.remove()}return{open:te,close:L,destroy:M}}function mp(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let A=o();return typeof A.revision=="number"?A.revision:0}function i(A){t&&A&&A.queue&&typeof A.queue=="object"&&t.set(A.queue)}function u(){let A=o().workspace_info;return A&&typeof A=="object"?A:{}}function d(A,U){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${A}"
      >${U}</span
    >`}function p(A){if(typeof A!="number"||!Number.isFinite(A))return"";let U=A/6e4;return Number.isInteger(U)?`timeout ${U}\uBD84`:`timeout ${Math.round(A/1e3)}\uCD08`}function f(A){let U=p(A);return U?d("config",U):""}function h(A,U,F){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${F.script}
      @click=${be=>{s&&s({lane:A,base_sha:U.base_sha,path:F.script,base_ref:U.base_ref},be.currentTarget)}}
    ></button>`}function w(){let A=o().repo_ops_opt_out;return{verify:A?.verify===!0,deploy:A?.deploy===!0}}function x(A,U){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!U}
        @change=${F=>{te(A,!F.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function N(A){let U=typeof A.base_sha=="string"?A.base_sha:"",F=`${A.source_path||"repo-ops/config.toml"} @ ${A.base_ref||"?"}${U?`@${U.slice(0,7)}`:""}`,be=w(),$e=!!A.verify&&be.verify,ee=!!A.deploy&&be.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${F}</span>
      </p>
      <div
        class="worker-repo-ops__lane${$e?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${A.verify?c`${h("verify",A,A.verify)}
              ${f(A.verify.timeout_ms)}
              ${$e?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${$e?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":A.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${A.verify?x("verify",be.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${ee?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${A.deploy?c`${h("deploy",A,A.deploy)}
              ${f(A.deploy.timeout_ms)}
              ${ee?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ee?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":A.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${A.deploy?x("deploy",be.deploy):""}
      </div>
    </section>`}function j(A){let U=A.repo_ops&&typeof A.repo_ops=="object"?A.repo_ops:null;return U&&(U.status==="resolved"||U.status==="absent")?N(U):U&&(U.status==="pending"||U.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${U.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${U.error_code?c` — <code>${U.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function K(A){if(!n)return;let U=await n("worker-auto-repair-toggle",{on:A,expected_revision:a()});if(i(U),U&&U.conflict){let F=await n("worker-auto-repair-toggle",{on:A,expected_revision:a()});i(F)}r()}async function te(A,U){if(!n)return;let F=await n("worker-repo-ops-opt-out-toggle",{kind:A,opted_out:U,expected_revision:a()});if(i(F),F&&F.conflict){let be=await n("worker-repo-ops-opt-out-toggle",{kind:A,opted_out:U,expected_revision:a()});i(be)}r()}let L={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function M(A,U,F){return c`<div class="worker-repo-ops__policy-group" data-policy=${F}>
      <div class="worker-repo-ops__policy-label">${A}</div>
      <ul class="worker-repo-ops__policy-list">
        ${U.map(be=>c`<li data-token=${be}>
              ${L[be]||be}
            </li>`)}
      </ul>
    </div>`}function D(A){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${A.map(U=>{let F=[L[U.trigger]||U.trigger];return Number.isInteger(U.attempts_per_operation_attempt)?F.push(`operation\uB2F9 ${U.attempts_per_operation_attempt}\uD68C`):Number.isInteger(U.attempts)?F.push(`${L[U.budget]||U.budget} ${U.attempts}\uD68C`):Number.isInteger(U.sessions_per_user_action)&&F.push(`${U.sessions_per_user_action}\uD68C`,L[U.user_actions]||U.user_actions),U.applies_when&&F.push(L[U.applies_when]||U.applies_when),c`<li data-token=${U.id}>
            <strong>${L[U.id]||U.id}</strong>
            <span>${F.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function z(){let A=o(),U=A.auto_repair!==!1,F=A.repo_operation_policy&&typeof A.repo_operation_policy=="object"?A.repo_operation_policy:null,be=Array.isArray(A.repo_operations)?A.repo_operations:[],$e=be.find(Oe=>Oe.state==="repairing"),ee=be.filter(Oe=>Oe.state==="failed"||Oe.state==="repairing"),Q=ee.length?Math.min(...ee.map(Oe=>typeof Oe.repair?.remaining=="number"?Oe.repair.remaining:0)):F?.auto_repair?.resolution_ladder?.find(Oe=>Oe.id==="auto_repair_session")?.attempts??1,xe=Array.isArray(F?.auto_repair?.resolution_ladder)?F.auto_repair.resolution_ladder:[];return c`<section
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
          >남은 자동 해결 ${Q}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${$e?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${$e.repair?.owner_bead||$e.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${F?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(F.worker_automatic||[]).length} · 해결 사다리
                ${xe.length} · 금지
                ${(F.never_automatic||[]).length}</span
              >
            </summary>
            ${M("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",F.worker_automatic||[],"worker-automatic")}
            ${F.supported===!1||F.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${F.schema_version})`}
                </div>`:D(xe)}
            ${M("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",F.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${j(u())} ${z()}
      </details>`}}}var yp=20,cb=5,ub=new Set(["failed","repairing","running","queued","retry_pending"]),gp={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},hp={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function db(e,t,n=yp){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function pb(e){if(e.type==="cleanup")return!0;let t=e.operation;return ub.has(t.state)&&!t.dismissed&&!t.superseded_by}function fb(e,t,n={}){let r=db(e,t,1/0),s=n.expanded===!0?yp:cb,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||pb(i));return{visible:a,hidden:r.length-a.length}}function bp(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function _b(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function vp(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function wp(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function mb(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(hp,r)?hp[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function gb(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${Bo(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${bp(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(gp,t.kind)?gp[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Fo(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${ws(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${bp(e)}"
          >${_b(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?wp(td(t.failure_kind,r)):""}
      ${mb(t)}
      ${vp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Fo(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function hb(e){let t=e.cleanup,n=fr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${Bo(e.at)||"\u2014"}</span
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
        ${hd(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${wp(zo(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${vp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function bb(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?hb(r):gb(r))}
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
  </section>`}function kp(e,t={}){let n=null;function r(){if(n===null){Ve(c``,e);return}let a=fb(n.operations,n.cleanup_failures,{expanded:n.expanded});Ve(bb({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var yb=Ct("views:worker"),vb="tab:worker:ready",wb="tab:worker:blocked",kb="tab:worker:in-progress",$b="tab:worker:resolved",xb="tab:worker:closed",ea=1,$p=5;function xp(e){return So(e).path.length>0}var Ab=new Set(["quick_fix","spec_backed","full_plan"]);function Ap(e){return typeof e=="string"&&Ab.has(e)}var Cp="beads-ui.worker.candidate-filter",Ni={show_blocked:!1,spec:"all"};function Sb(){try{let e=window.localStorage.getItem(Cp);if(!e)return{...Ni};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Ni};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Ni}}}function Eb(e){try{window.localStorage.setItem(Cp,JSON.stringify(e))}catch{}}function Tb(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let u=n(i),d=r(i);u&&d?s.push(i):!u&&d?o+=1:u&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Cb=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Rp="bdui.worker.candidate_sort",Rb=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],ta="spec";function Ob(){try{let e=window.localStorage.getItem(Rp);return e==="board"||e==="created"||e==="spec"?e:ta}catch{return ta}}function Lb(e){try{window.localStorage.setItem(Rp,e)}catch{}}var Op="bdui.worker.done-range";function Ib(){try{let e=window.localStorage.getItem(Op);return dn(e)?e:sn}catch{return sn}}function Pb(e){try{window.localStorage.setItem(Op,e)}catch{}}var Mb="(max-width: 640px)",Lp="beads-ui.worker.lane-collapsed",Ts={queue:!0,done:!0};function Db(){try{let e=window.localStorage.getItem(Lp);if(!e)return{...Ts};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ts}:{queue:typeof t.queue=="boolean"?t.queue:Ts.queue,done:typeof t.done=="boolean"?t.done:Ts.done}}catch{return{...Ts}}}function Nb(e){try{window.localStorage.setItem(Lp,JSON.stringify(e))}catch{}}function Sp(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function qb(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(ir):(r.sort(Zs(n)),t==="board"?r:[...r.filter(xp),...r.filter(s=>!xp(s))])}function Fb(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function jb(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function Ep(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Bb(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function Ub(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Wb(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function zb(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Hb(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function qi(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Gb(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,n=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,r=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=r&&typeof r.pr_number=="number"?r.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${n}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),r&&typeof r.bead_id=="string"&&a.push(`repair ${r.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:r&&typeof r.pr_url=="string"?r.pr_url:"",repair_pr_number:s}}function Tp(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Vb(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.head_review&&e.head_review.state!=="failed")return n("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Tp(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Tp(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=Bb(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Ep(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Ep(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Kb(e,t,n,r,s=null,o=null,a=null,i=!1,u=null,d=!0,p=null,f=null,h=null,w={},x=!1,N=!1,j={}){let K=!!u&&u.position>0,te=!!u?.continuation_action&&u.continuation_action.continuation===null,L=!!u&&u.active===!0,M=u&&u.failure||null,D=Wb(u?u.waiting:null,h),z=n[e]||null,A=z&&z.gate?z.gate:null,U=z&&z.pr?z.pr:null,F=Gb(h),be=zb(u?u.resolution:null),$e=Hb(u?u.head_review:null),ee=u&&u.head_review||null,Q=u&&u.authority||null,xe=!!ee&&["pending","reviewing","revising"].includes(ee.state),Oe=K&&!L&&(ee?.state==="failed"||!Q||Q.source==="automatic"&&!N),ne=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":be?be.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":D,oe=!!A&&A.base_badge==="\uCDA9\uB3CC",Ae=!!A&&A.enabled===!0,B=Ss({bead_id:e,merge_sha:j.merge_sha,cleanup_cursor:j.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:j.repo_operations}),X=Xo(B),_e=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!A&&A.tier==="merged",ke=i&&!!r&&!!A&&A.tier==="merged",we=Oe&&(Ae||oe||A?.reason==="base_behind"||A?.reason==="review_receipt_missing"||A?.reason==="review_receipt_stale"||_e||ke),Ue=i&&oe&&d===!1,me=En(w,e,{external:i,merge_active:L||B?.step==="merge",merge_queued:K,conflict_active:!!a,cleanup_active:X,merged:!!r||A?.tier==="merged"}),Ze=!!me.operation,gt=!_e&&!!r&&r.step==="repo_operations",R=Vb({continuation_required:te,merge_step:B,conflict_badge:ne,conflict_live:be?.live===!0||a==="running",head_review:ee&&$e?{...$e,state:ee.state,failure_reason:ee.failure_reason}:null,recovery:F,cleanup_failed:r,cleanup_label:r?fr(r.step):null,base_exception:f,conflicting:oe,gate:A,receipt_check:z&&z.receipt_check?z.receipt_check:null,queue_failure:M,auto_skip:p,queued:K,queue_active:L,queue_position:u?u.position:0,activity:ne?null:o&&o.activity||null}),ue=R?.live===!0&&R.title?c`<span title=${R.title}>${R.label}</span>`:R?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&B?.active!==!0?Qo(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:x,external:i,pr_number:U&&typeof U.number=="number"?U.number:null,pr_url:U&&typeof U.url=="string"?U.url:"",completion_badge:R?.live!==!0&&R?.title?R.label:null,completion_title:R?.title||"",completion_repair_pr_url:F?F.repair_pr_url:"",completion_repair_pr_number:F?F.repair_pr_number:null,badges:ue?[ue]:[],live_badge:R?.live===!0?ue:null,usage:s,alert:R?.alert===!0,merge_action:A?.tier==="merged"&&!_e&&!ke||gt?!1:!K||te||Oe,timeline_action:gt,cancel_action:K&&!te,cancel_enabled:(!L||xe)&&!(F&&F.lock_actions),cancel_title:F&&F.lock_actions?`${F.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:L&&!xe?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":xe?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:me,discard_action:me.action,merge_step:B,discard_enabled:me.enabled,discard_title:me.title,merge_enabled:!B&&!a&&!Ze&&!f&&!(F&&F.lock_actions)&&!Ue&&!gt&&(Ae||oe||A?.reason==="base_behind"||A?.reason==="review_receipt_missing"||A?.reason==="review_receipt_stale"||_e||ke||we),merge_label:te?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":_e||ke?"\uC815\uB9AC \uC7AC\uAC1C":oe&&!B&&!_e?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":A?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":A?.reason==="review_receipt_missing"||A?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Oe?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Ze?me.error?`\uD3D0\uAE30 \uC2E4\uD328: ${me.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${me.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:te?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":B?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${B.label}`:ke?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ue?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":_e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":oe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ae?`\uBA38\uC9C0 (${A.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:A&&A.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${A&&A.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Fi(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:u,getWorkspacePath:d,openDoc:p,doneRange:f,onDoneRangeChange:h}=t,w=r?Xs(r,i):null,x=no({transport:n,uiOrderStore:i}),N=null,j=[],K=Sb(),te=null,L=null,M={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},D=Ob(),z=dn(f)?f:Ib(),A=new Map;function U(){let l=Bn.find(_=>_.value===z);return l?l.label:"\uC624\uB298"}let F=Db(),be=!1,$e=new Set,ee=new Set,Q=new Set,xe=new Set,Oe=new Set,ne={},oe=null,Ae=0,B=null,X=[];function _e(l){return oe===l?ne:{}}async function ke(){if(!n)return;let l=d?.()||"";if(oe===l||B&&B.key===l&&B.generation===Ae)return;let _=++Ae;B={key:l,generation:_};let g=null;try{g=await Promise.resolve(n("get-session-defaults",{}))}catch(O){if(_!==Ae)return;B=null,yb("get-session-defaults failed: %o",O),ze();return}_===Ae&&(ne=g&&typeof g.values=="object"&&g.values!==null?{...g.values}:{},oe=l,B=null,ze())}function we(){oe=null,Ae+=1,ke()}let Ue=document.createElement("div");Ue.className="worker-console";let me=document.createElement("div");me.className="worker-top";let Ze=document.createElement("div");Ze.className="worker-drawer-overlay",Ze.hidden=!0;let gt=document.createElement("div");gt.className="worker-drawer-overlay__backdrop";let R=document.createElement("div");R.className="worker-drawer-host";let ue=document.createElement("div");ue.className="worker-drawer-host",ue.hidden=!0,Ze.append(gt,R,ue);let Ce=document.createElement("div");Ce.className="worker-lanes-host",Ue.append(me,Ze,Ce),e.appendChild(Ue);let Re=null,je=null,qe=Dr(R,{transport:n,sessionLogStore:a,onClose:()=>{Re=null,je=null,Ze.hidden=!0,ze()}}),W=kp(ue,{onClose:()=>{ue.hidden=!0,Ze.hidden=!0,ze()}}),G=_p({getWorkspacePath:d||(()=>"")}),Me=d&&d()||"",Ke=mp({queueStore:s,transport:n,onChanged:()=>ze(),onOpenScript:(l,_)=>{G.open(l,_)}}),Ge=o?cp(Ue,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:d,onOpenTranscript:(l,_)=>Ie(l,_)}):null;function ye(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:ea,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function I(){let l=ye(),_=typeof l.serial_lane_count=="number"&&Number.isInteger(l.serial_lane_count)&&l.serial_lane_count>0?Math.min(l.serial_lane_count,5):0,g=Array.isArray(l.serial_lanes)?l.serial_lanes:[],O=[];for(let Te of g){if(O.length>=_)break;!Te||typeof Te.id!="string"||!/^s[1-5]$/.test(Te.id)||!Array.isArray(Te.entries)||O.push({id:Te.id,label:`\uC9C1\uB82C ${Te.id.slice(1)}`,count:Te.entries.length})}return O.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(l.queue)?l.queue:[]).length},...O]}function J(l){if(!te||!l.some(g=>g.id===te))return null;let _=I();return _?{bead_id:te,lanes:_}:null}function re(){let l=ye();return typeof l.revision=="number"?l.revision:0}function V(l){l&&l.queue&&s&&s.set(l.queue)}function De(){let l=ye().queue;return Array.isArray(l)?l.length:0}async function Qe(l,_,g){if(!n)return;let O=()=>({bead_id:l,..._==="parallel"?{}:{lane:_},...g===void 0?{}:{index:g},expected_revision:re()}),fe=await n("worker-queue-place",O());V(fe),fe&&fe.conflict&&await n("worker-queue-place",O()).then(V)}async function lt(l,_,g){if(!n)return;let O=()=>({bead_id:l,..._==="parallel"?{}:{lane:_},to_index:g,expected_revision:re()}),fe=await n("worker-queue-reorder",O());V(fe),fe&&fe.conflict&&await n("worker-queue-reorder",O()).then(V)}async function ot(l){if(!n)return;let _=await n("worker-queue-remove",{bead_id:l,expected_revision:re()});V(_),_&&_.conflict&&await n("worker-queue-remove",{bead_id:l,expected_revision:re()}).then(V)}async function ct(l){if(!n||!l)return;let _=await n("worker-attempt-pause",{attempt_id:l});_&&_.paused===!1&&_.reason&&de(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function ht(l){if(!n||!l)return;let _=await Lr();if(_===null)return;let g=async(fe={})=>await n("worker-attempt-resume",{attempt_id:l,expected_revision:re(),..._!==""?{instructions:_}:{},...fe}),O=await g();V(O),O&&O.conflict&&(O=await g(),V(O)),O=await Rn(O,(fe,Te)=>g({continuation:fe,decision_token:Te}),{onResult:V,refresh:()=>g()}),O&&O.resumed===!1&&!O.conflict&&O.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${O.reason}`,"error",2400)}async function bt(l){if(!n||!l)return;let _=await n("worker-attempt-dismiss",{attempt_id:l,expected_revision:re()});V(_),_&&_.conflict&&(_=await n("worker-attempt-dismiss",{attempt_id:l,expected_revision:re()}),V(_)),_&&_.dismissed===!1&&!_.conflict&&_.reason&&de(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function tt(l,_,g=!0){if(!n)return null;let O=n,fe=await O(l,{..._,expected_revision:re()});return V(fe),fe&&fe.conflict&&g&&(fe=await O(l,{..._,expected_revision:re()}),V(fe)),fe}async function Tt(l){if(!n||!l)return;let _=ye().merge_queue?.find(O=>O.bead_id===l)?.continuation_action;if(_?.mismatch&&_.continuation===null){await He(l,_.mismatch);return}$e.add(l),ze();let g;try{g=await tt("worker-merge-queue-add",{bead_id:l})}catch{de("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{$e.delete(l),ze()}if(!(!g||g.applied)){if(g.conflict){de("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}de(Ub(g.reason),"error",2400)}}async function wt(l){if(!(!n||!l||ee.has(l))){ee.add(l),ze();try{let _=await n("worker-cleanup-retry",{bead_id:l,expected_revision:re()});V(_),_&&!_.retried&&!_.conflict&&_.reason&&de(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${_.reason}`,"error",2400)}finally{ee.delete(l),ze()}}}async function He(l,_){let g=await Rn({continuation_mismatch:_},(fe,Te)=>tt("worker-merge-queue-add",{bead_id:l,continuation:fe,decision_token:Te},!1)),O=g?.queue?.merge_queue?.find(fe=>fe.bead_id===l)?.continuation_action;if(g?.applied!==!0&&O?.continuation===null&&O.mismatch){await He(l,O.mismatch);return}g&&g.applied===!1&&!g.conflict&&de("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function he(l){if(!n)return;let _=await tt("worker-merge-auto-toggle",{on:l});!_||_.conflict||de(l?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",l?"success":"info",2400)}async function mt(l){if(!n||!l)return;let _=await tt("worker-merge-queue-remove",{bead_id:l});_&&!_.conflict&&!_.applied&&_.reason==="merge_active"&&de("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function $t(){await tt("worker-merge-queue-remove",{all:!0})}async function nt(l,_=null,g="unmerged",O=null){if(!n||!l)return;let fe=ks(l,g);if(!(!!O||typeof globalThis.confirm!="function"||globalThis.confirm(fe)))return;let Ee=await n("worker-discard",{bead_id:l,..._?{attempt_id:_}:{},...O?{operation_id:O}:{},expected_revision:re()});if(V(Ee),Ee&&Ee.conflict&&(Ee=await n("worker-discard",{bead_id:l,..._?{attempt_id:_}:{},...O?{operation_id:O}:{},expected_revision:re()}),V(Ee)),Ee&&Ee.discarded===!0){de(Uo(Ee),"success",5e3);return}if(Ee&&Ee.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${Ee.reason}`,"error",2800);return}if(Ee&&Ee.accepted&&Ee.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ee&&Ee.accepted&&!Ee.discarded){de(`\uD3D0\uAE30 \uC9C4\uD589: ${Ee.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ee&&!Ee.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Y(l,_,g){if(!(!n||!_||!g||xe.has(_))){xe.add(_),ze();try{let O=await n(l,{bead_id:_,action_id:g,expected_revision:re()});V(O),O?.conflict?de("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!O?.ok&&O?.reason&&de(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(O.reason)}`,"error",2800)}finally{xe.delete(_),ze()}}}async function le(l,_){if(!n||!_||Q.has(_))return;Q.add(_),ze();let g;try{let O=async(fe={})=>await n(l,{bead_id:_,expected_revision:re(),...fe});g=await O(),V(g),g&&g.conflict&&(g=await n(l,{bead_id:_,expected_revision:re()}),V(g)),l==="worker-revise-fix"&&(g=await Rn(g,(fe,Te)=>O({continuation:fe,decision_token:Te}),{onResult:V,refresh:()=>O()}))}finally{Q.delete(_),ze()}if(!(!g||g.conflict)){if(g.ok){de(l==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}de(`\uCC98\uBD84 \uAC70\uBD80: ${g.reason||""}`,"error",3e3)}}async function Ne(l){if(!n)return;let _=await n("worker-automation-toggle",{on:l,expected_revision:re()});V(_),_&&_.conflict&&await n("worker-automation-toggle",{on:l,expected_revision:re()}).then(V)}async function E(l){if(!n||!l)return;let _=await n("worker-repo-operation-repair",{operation_id:l});if(V(_),_&&_.ok===!1){de(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${_.reason||""}`,"error",3e3);return}_&&_.ok===!0&&de("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function b(l){if(!n||!l)return;let _=await n("worker-repo-operation-dismiss",{operation_id:l});V(_),_&&_.ok===!1&&de(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${_.reason||""}`,"error",3e3)}async function S(l){if(!n||!Number.isFinite(l))return;let _=Math.max(ea,Math.floor(l)),g=await n("worker-queue-set-slots",{slots:_,expected_revision:re()});V(g),g&&g.conflict&&await n("worker-queue-set-slots",{slots:_,expected_revision:re()}).then(V)}async function H(l){if(!n||!Number.isInteger(l)||l<1||l>$p)return;let _=ye(),g=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).slice(l).reduce((Te,Ee)=>Te+(Array.isArray(Ee?.entries)?Ee.entries.length:0),0),O=()=>({count:l,expected_revision:re()}),fe=await n("worker-queue-set-serial-lane-count",O());V(fe),fe&&fe.conflict&&(fe=await n("worker-queue-set-serial-lane-count",O()),V(fe)),fe&&fe.applied&&g>0&&de(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${g}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let ie="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function ae(l,_){let g=Di(l,_.id,M);return{id:_.id,title:_.title,location_label:_.location_label,prefixes:_.prefixes,action:g.kind==="note"?{kind:"note",text:g.text}:g.kind==="disabled"?{kind:"disabled",label:ie,title:g.title}:{kind:"place",label:ie,title:g.title}}}function ve(l,_){if(!L||L.bead_id!==l)return null;let g=L.counterpart_id,O=g===null?_:_.filter(fe=>fe.id===g);return O.length===0?null:{rows:O.map(fe=>ae(l,fe))}}async function Se(l,_){let g=Di(l,_,M);if(L=null,g.kind!=="ops"){ze();return}let O=re();for(let fe of g.ops){let Te=await Je(fe,O);if(Te===null)break;O=Te}ze()}async function Je(l,_){if(!n)return null;try{let g=await n("worker-queue-place",{bead_id:l.bead_id,lane:l.lane,index:l.index,expected_revision:_});if(V(g),g&&g.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!g||g.applied!==!0)return de(g&&typeof g.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${g.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let O=g.queue?g.queue.revision:void 0;return typeof O!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):O}catch(g){return de(g instanceof Error&&g.message?g.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function rt(){let l=ye(),_=w?w.selectBoardColumn(vb,"ready"):[],g=w?w.selectBoardColumn(wb,"blocked"):[],O=w?w.selectBoardColumn(xb,"closed"):[],fe=w?w.selectBoardColumn(kb,"in_progress"):[],Te=w?w.selectBoardColumn($b,"resolved"):[],Ee=eo([..._,...g,...fe,...Te,...O]),Be=new Map;for(let m of[..._,...g,...fe])m&&m.id&&!Be.has(m.id)&&Be.set(m.id,m);let dt={..._e(d?.()||"")};for(let m of["orchestration_model","orchestration_effort","orchestration_speed"]){let q=l[m];typeof q=="string"&&(dt[m]=q)}function Ut(m,q){let se=Be.get(m);if(!se)return null;let We=se.metadata&&typeof se.metadata=="object"?se.metadata:{},it=se.workflow?.route,qt=We.route,Dt=Ap(it)?it:Ap(qt)?qt:null;return Jt({pin:We,global:dt,execution_defaults:l.execution_defaults??null,runner_catalog:l.runner_catalog??null,route:Dt,controller_runtime:q})}function rn(m){let q=m.runner||null,se=Ut(m.bead_id,q),We=Ho(m),it=se?Yn(se,q):null;return We||it?{orchestration:We,worker:it}:null}let Fn=new Map;function Hr(m){if(Fn.has(m))return Fn.get(m)??null;let q=Ut(m,null),se=null;if(q){let We=wn(l.runner_catalog??null,q.orchestration_model.value??""),it=We===null?q:Ut(m,We),qt=pr(it,l.runner_catalog??null),Dt=Yn(it,We);se=qt||Dt?{orchestration:qt,worker:Dt}:null}return Fn.set(m,se),se}function _r(m){let q=to(Ee,m);return q.total===0?null:q}let Wi=l.bead_titles||{},Zt=new Map;for(let[m,q]of Object.entries(Wi))typeof q=="string"&&q.length>0&&Zt.set(m,q);for(let m of[..._,...g])Zt.set(m.id,m.title||m.id);let Gr=new Map;for(let m of[..._,...g,...fe,...Te,...O])m&&m.id&&typeof m.from_id=="string"&&Gr.set(m.id,m.from_id);let Cs=l.bead_times&&typeof l.bead_times=="object"&&!Array.isArray(l.bead_times)?l.bead_times:{},Rs=l.bead_labels&&typeof l.bead_labels=="object"&&!Array.isArray(l.bead_labels)?l.bead_labels:{},$n=l.bead_workflow&&typeof l.bead_workflow=="object"&&!Array.isArray(l.bead_workflow)?l.bead_workflow:{},jn=new Map;for(let[m,q]of Object.entries(Rs))Array.isArray(q)&&jn.set(m,Ii(q));for(let m of[..._,...g]){let q=m.labels;Array.isArray(q)&&!jn.has(m.id)&&jn.set(m.id,Ii(q))}let mr=new Map,gr=o?.get()?.last_good?.result?.groups;for(let m of Array.isArray(gr)?gr:[]){if(m?.eligible!==!0||!Array.isArray(m.members))continue;let q=m.members.map(We=>{let it=(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).find(qt=>qt.entries.some(Dt=>Dt.bead_id===We));return it?it.id:null});if(!(q.every(We=>We!==null)&&new Set(q).size===1))for(let We of m.members)mr.set(We,m.members.filter(it=>it!==We))}let Os=l.bead_blocked_by&&typeof l.bead_blocked_by=="object"&&!Array.isArray(l.bead_blocked_by)?l.bead_blocked_by:{},hr=new Map;for(let[m,q]of Object.entries(Cs))q&&typeof q=="object"&&hr.set(m,q);for(let m of[..._,...g])hr.set(m.id,{created_at:m.created_at,updated_at:m.updated_at});let Xn=m=>hr.get(m)||{},Jn=l.pr_wait||[],br=l.pr_observations||{},Ls=l.pr_activity||{},Fe=l.cleanup_failed||{},pt=Object.entries(Fe).map(([m,q])=>({bead_id:m,step:q&&q.step?q.step:"",reason:q&&q.reason?q.reason:"",at:q&&typeof q.at=="number"?q.at:null,detail:q&&typeof q.detail=="string"?q.detail:null,output_tail:q&&typeof q.output_tail=="string"&&q.output_tail?q.output_tail:void 0,log_path:q&&typeof q.log_path=="string"&&q.log_path?q.log_path:void 0,retry_count:q&&typeof q.retry_count=="number"&&Number.isInteger(q.retry_count)&&q.retry_count>0?q.retry_count:0,failure_code:q&&typeof q.failure_code=="string"?q.failure_code:void 0,subject_id:q&&typeof q.subject_id=="string"?q.subject_id:void 0,repair_eligible:!!(q&&q.repair_eligible),repair:q&&q.repair?q.repair:void 0})),Qt=l.queue||[],zi=new Set([...Qt.map(m=>m.bead_id),...(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).flatMap(m=>(Array.isArray(m?.entries)?m.entries:[]).map(q=>q.bead_id)),...Jn.map(m=>m.bead_id),...l.done.map(m=>m.bead_id)]),Hp=new Set(g.map(m=>m.id)),Gp=i?i.get()?.order||{}:{},Hi=new Set,Gi=[];for(let m of[..._,...g])zi.has(m.id)||Hi.has(m.id)||Fb(m)||(Hi.add(m.id),Gi.push(m));j=qb(Gi,D,Gp);let Vp=l.admission||{},Vi=m=>{let q=Vp[m];if(!q)return"";if(q.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let se=typeof q.reason=="string"?q.reason:"",We=se.indexOf(":");return We>0&&We<se.length-1?`\u26D4 ${se.slice(0,We)} (${se.slice(We+1)})`:`\u26D4 ${se}`},Kp=j.map(m=>{let q=So(m),se=q.path.length>0,We=m.workflow?.route==="quick_fix"||m.metadata&&m.metadata.route==="quick_fix",it=!Object.hasOwn(m,"description")||typeof m.description=="string"&&m.description.trim().length>0,qt=Object.hasOwn(m,"labels")&&lp(m.labels),Dt=!qt&&(We?it:se&&!q.conflict),At=Hp.has(m.id),gn=[];At&&gn.push(jb(m)),We&&!it?gn.push("missing_description"):!We&&q.conflict?gn.push("spec_id_conflict"):!We&&!se&&gn.push("spec \uC5C6\uC74C");let Bs=Vi(m.id);return Bs&&gn.push(Bs),{id:m.id,title:m.title||m.id,reason:gn.join(" \xB7 "),draggable:Dt,lane:"candidate",created_at:m.created_at,updated_at:m.updated_at,workflow:m.workflow,is_quick_fix:We,status:m.status,worker_ineligible:qt,blocked:At,has_spec:se,exec_chips:Hr(m.id),from_id:m.from_id||void 0}}),na=Tb(Kp,K),ra=na.visible,Yp=l.revise_parked||{},Is=l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},sa=(m,q)=>m.map((se,We)=>{let it=q!=="done",qt=q!=="done"&&q!=="queue",Dt=it?Yp[se.bead_id]:null,At=it?En(Is,se.bead_id):null,gn=At?.operation?At:null,Bs=it&&jn.get(se.bead_id)===!0,$l=Os[se.bead_id]||[],fa=l.admission&&typeof l.admission=="object"?l.admission[se.bead_id]:null,_a=it?Zu(fa,!!gn||xe.has(se.bead_id)):null,of=it&&!_a?Vi(se.bead_id):null,af=it?[of]:[],xl=it&&$l.length>0&&typeof fa?.reason=="string"&&fa.reason.startsWith("not_ready")?[`\u23F8 ${$l.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],ma=it?mr.get(se.bead_id):void 0;return ma&&ma.length>0&&xl.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${ma.join(", ")}\uC640`),{id:se.bead_id,title:Zt.get(se.bead_id)||se.bead_id,reason:af.filter(Boolean).join(" \xB7 "),draggable:it&&!gn&&!_a,done:q==="done",lane:q,seq:qt?We+1:void 0,worker_serial:Bs,discard:gn,stale_work:_a,badges:[...xl,...Dt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Dt,revise_action:!!Dt,revise_enabled:!!Dt&&!gn&&!Q.has(se.bead_id),revise_title:Dt?Dt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Dt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:q==="done"?pn(l.attempts||{},se.bead_id):null,work_ms:q==="done"?jo(l.attempts||{},se.bead_id):null,done_at:q==="done"&&typeof se.added_at=="number"?se.added_at:void 0,exec_chips:it?Hr(se.bead_id):null,workflow:it&&$n[se.bead_id]||null,from_id:Gr.get(se.bead_id)||void 0,...Xn(se.bead_id)}}),yr=l.attempts?Object.values(l.attempts):[],oa=new Set;for(let m of yr)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&oa.add(m.resumed_from);let Ki=new Map;for(let m of yr)Ki.set(m.bead_id,m.attempt_id);let Ps=new Map;for(let m of yr)Ps.set(m.attempt_id,m);function aa(m){let q=new Set,se=m;for(;se&&!q.has(se.attempt_id);){if(se.conflict_resolution===!0)return!0;q.add(se.attempt_id),se=typeof se.resumed_from=="string"&&se.resumed_from.length>0&&Ps.get(se.resumed_from)||null}return!1}let Ms=typeof l.declared_base=="string"?l.declared_base:null;function Zp(m){let q=null;for(let se of yr)!se||se.bead_id!==m||aa(se)||(q===null||(typeof se.started_at=="number"?se.started_at:0)>=(typeof q.started_at=="number"?q.started_at:0))&&(q=se);return q&&typeof q.target_base=="string"?q.target_base:null}let ia=[],Ds=[],Qp=ip(l),Yi=m=>{let q=typeof m.session_id=="string"&&m.session_id.length>0,se=oa.has(m.attempt_id);return{eligible:q&&!se,reason:q?se?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},mn=null;for(let m of yr){let q=m.status==="paused"&&!oa.has(m.attempt_id);if(m.status==="running"||q)Ds.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Zt.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,paused:q,conflict_resolution:aa(m),base_exception:qi(Ms,m.target_base),can_pause:typeof m.session_id=="string"&&m.session_id.length>0,discard:En(Is,m.bead_id,{attempt_id:m.attempt_id}),workflow:$n[m.bead_id]||null,usage:pn(l.attempts||{},m.bead_id),rollup:_r(m.bead_id),rollup_expanded:Oe.has(m.bead_id),exec_chips:rn(m),...Xn(m.bead_id)});else if((m.status==="failed"||m.status==="orphaned")&&Qp(m)){let se=Yi(m);ia.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Zt.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,failed:!0,status:m.status,status_label:m.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:En(Is,m.bead_id,{attempt_id:m.attempt_id}),resume_eligible:se.eligible,resume_reason:se.reason,conflict_resolution:aa(m),base_exception:qi(Ms,m.target_base),workflow:$n[m.bead_id]||null,usage:pn(l.attempts||{},m.bead_id),rollup:_r(m.bead_id),rollup_expanded:Oe.has(m.bead_id),exec_chips:rn(m),...Xn(m.bead_id)}),mn=m}}let Zi=new Set([...ia,...Ds].map(m=>m.bead_id));for(let m of Array.isArray(l.session_active)?l.session_active:[]){let q=m&&m.bead_id;typeof q!="string"||q.length===0||Zi.has(q)||(Zi.add(q),Ds.push({bead_id:q,attempt_id:null,kind:"session",title:m.title||Zt.get(q)||q,status:"in_progress",started_at:xn(m.started_at)??xn(m.updated_at),updated_at:xn(m.updated_at),workflow:m.workflow||null,runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1}))}let vr=[...ia,...Ds].map(m=>{let q=Ps.get(m.attempt_id),se=q?.quickfix_landing;if(q?.quickfix_lane!==!0||!se||typeof se!="object")return m;let We=typeof se.reason=="string"&&se.reason.length>0?se.reason:null,it=Ss({bead_id:q.bead_id,merge_sha:se.head_sha,cleanup_cursor:se.cursor,cleanup_failed:We?{step:se.cursor,reason:We}:null,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]});return it?{...m,landing:it}:m}),Qi=null;if(mn){let m=Yi(mn),q=mn.cause_detail;Qi={bead_id:mn.bead_id,repo:mn.repo||"",reason:mn.cause||mn.status,cause_detail:q&&typeof q.reason=="string"?{reason:q.reason,command:typeof q.command=="string"?q.command:null}:null,resume_attempt_id:mn.attempt_id,resume_eligible:m.eligible,resume_reason:m.reason,discard:En(Is,mn.bead_id,{attempt_id:mn.attempt_id})}}let Xi=new Set(vr.map(m=>m.bead_id)),la=Array.isArray(l.merge_queue)?l.merge_queue:[],Ji=new Map,el=new Map,tl=new Map,nl=new Map,rl=new Map;la.forEach((m,q)=>{m&&typeof m.bead_id=="string"&&(Ji.set(m.bead_id,q+1),el.set(m.bead_id,m.resolution),tl.set(m.bead_id,m.continuation_action||null),nl.set(m.bead_id,m.head_review||null),rl.set(m.bead_id,m.authority||null))});let wr=l.merge_queue_state||{active:null,failures:{}},Xp=wr.failures||{},sl=wr.waiting&&typeof wr.waiting.bead_id=="string"&&typeof wr.waiting.reason=="string"?wr.waiting:null,Jp=l.auto_merge_skips||{},ol=m=>{let q=Jp[m];if(!q)return null;let se=br[m],We=se&&se.pr?se.pr.head_sha:null;return We&&We===q.head_sha?q.reason||"":null},Ns=new Map;for(let m of vr)m.failed!==!0&&m.conflict_resolution&&(m.paused?Ns.has(m.bead_id)||Ns.set(m.bead_id,"paused"):Ns.set(m.bead_id,"running"));let al=vr.filter(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0).length,il=(l.workspace_info||{}).slots,ll=typeof il=="number"?il:typeof l.slots=="number"?l.slots:ea,ef=al>ll,qs=or(z),tf=(Array.isArray(l.done)?l.done.slice():[]).filter(m=>qs===void 0||typeof m.added_at!="number"||m.added_at>=qs).sort((m,q)=>(q.added_at||0)-(m.added_at||0)),Vr=sa(tf,"done"),nf=new Set((Array.isArray(l.done)?l.done:[]).map(m=>m?.bead_id).filter(m=>typeof m=="string")),cl=[],rf=d?.()||"";for(let m of O){let q=xn(m.closed_at);if(typeof m.id!="string"||nf.has(m.id)||q===null||qs!==void 0&&q<qs||typeof m.comment_count!="number"||m.comment_count<=0)continue;let se=`${rf}\0${m.id}\0${String(m.updated_at)}\0${m.comment_count}`,We=A.get(se);We===void 0&&n&&(A.set(se,"pending"),Promise.resolve(n("get-comments",{id:m.id})).then(it=>{let qt=Array.isArray(it)&&it.some(Dt=>Eo(typeof Dt?.text=="string"?Dt.text:"")?.lane==="session");A.set(se,qt?"session":"not-session"),ze()}).catch(()=>{A.set(se,"failed"),ze()})),We==="session"&&cl.push({id:m.id,title:m.title||m.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:q,created_at:m.created_at,updated_at:m.updated_at})}Vr.push(...cl),Vr.sort((m,q)=>(q.done_at||0)-(m.done_at||0));let Fs={};for(let m of On)Fs[m]=0;let ul=!1,dl=0,ca=0,pl=0;for(let m of Vr){let q=m.usage;if(q&&typeof q=="object"){let se=!1;for(let We of On)Number.isFinite(q[We])&&(Fs[We]+=q[We],ul=!0,se=!0);se&&(ca+=1,Number.isFinite(q.total_cost_usd)&&(dl+=q.total_cost_usd,pl+=1))}}ca>0&&pl===ca&&(Fs.total_cost_usd=dl);let fl=Vr.map(m=>m.usage).filter(m=>m&&typeof m=="object"&&m.providers),sf=fl.length>0?Wt(po(fl)):ul?Ln(Fs):null,_l=l.lane_states&&typeof l.lane_states=="object"&&!Array.isArray(l.lane_states)?l.lane_states:{},ml=Array.isArray(l.serial_lanes)?l.serial_lanes:[],gl=m=>{if(Jn.some(We=>We.bead_id===m))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let q=yr.filter(We=>We&&We.bead_id===m),se=q.length>0?q[q.length-1].status:null;return se==="failed"||se==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":se==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},js=ml.filter(m=>m&&typeof m.id=="string"&&Array.isArray(m.entries)).map((m,q)=>{let se=_l[m.id]||{},We=new Map((Array.isArray(se.corrections)?se.corrections:[]).filter(At=>At&&typeof At.bead_id=="string"&&typeof At.after=="string").map(At=>[At.bead_id,At.after])),it=sa(m.entries.filter(At=>!Xi.has(At.bead_id)),m.id).map(At=>We.has(At.id)?{...At,badges:[`\u{1F517} ${We.get(At.id)} \uB4A4 (blocks \uC790\uB3D9)`,...At.badges]}:At),qt=Array.isArray(se.occupied_by)?se.occupied_by.filter(At=>typeof At=="string"):[],Dt=qt.map(At=>({id:At,title:Zt.get(At)||At,draggable:!1,lane:m.id,ghost:!0,badges:[gl(At)]}));return{id:m.id,index:q+1,rows:[...Dt,...it],occupied:qt.length>0,badge:qt.length>0?gl(qt[0]):"\uB300\uAE30",cycle:se.cycle===!0}}),hl=typeof l.serial_lane_count=="number"?l.serial_lane_count:js.length,ua=sa(Qt.filter(m=>!Xi.has(m.bead_id)),"queue"),bl=new Map,yl=new Set;for(let[m,q]of Object.entries(_l)){if(!/^s[1-5]$/.test(m))continue;let se=q&&Array.isArray(q.occupied_by)?q.occupied_by:[];for(let We of se)typeof We=="string"&&bl.set(We,m);se.length>0&&yl.add(m)}let kr=[];for(let m of vr)typeof m.bead_id=="string"&&kr.push({id:m.bead_id,title:Zt.get(m.bead_id)||m.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:bl.get(m.bead_id)??null});for(let m of js)for(let q of m.rows)q.ghost!==!0&&kr.push({id:q.id,title:q.title,location_label:`${m.id} #${q.seq??""}`.trim(),kind:"serial",lane_id:m.id});ua.forEach((m,q)=>{kr.push({id:m.id,title:m.title,location_label:`#${q+1}`,kind:"parallel",lane_id:null})});for(let m of ra)kr.push({id:m.id,title:m.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let vl={};for(let m of ml)m&&typeof m.id=="string"&&Array.isArray(m.entries)&&(vl[m.id]=m.entries.length);let da=new Map;for(let m of kr)da.has(m.id)||da.set(m.id,m);M={members_by_id:da,serial_raw_lengths:vl,serial_lane_count:hl,occupied_lanes:yl};let wl=up(l.bead_scope,kr),pa=(m,q)=>{let se=wl.get(m.id);if(!se||se.overlaps.length===0&&!se.scope_missing)return m;let We=ve(m.id,se.overlaps);return m.dependency_chips={...m.dependency_chips||{},...se.overlaps.length>0?{overlaps:se.overlaps}:{},...se.scope_missing&&q!=="running"?{scope_missing:!0}:{},...We?{popover:We}:{}},m};for(let m of ua)pa(m,"queue");for(let m of js)for(let q of m.rows)q.ghost!==!0&&pa(q,m.id);for(let m of ra)pa(m,"candidate");let kl=new Map;for(let m of vr){let q=typeof m.bead_id=="string"?wl.get(m.bead_id):void 0;if(!q||q.overlaps.length===0)continue;let se=ve(m.bead_id,q.overlaps);kl.set(m.bead_id,{dependency_chips:{overlaps:q.overlaps,...se?{popover:se}:{}}})}return{queue:l,idToTitle:Zt,candidates:ra,candidate_hidden:{blocked:na.hidden_blocked,spec:na.hidden_spec},running:vr,live_count:al,slots:ll,over_cap:ef,failure:Qi,waiting:ua,serial_lanes:js,serial_lane_count:hl,running_overlays:kl,pr_wait:Jn.map(m=>Kb(m.bead_id,Zt.get(m.bead_id)||m.bead_id,br,Fe[m.bead_id]||null,pn(l.attempts||{},m.bead_id),Ls[m.bead_id]||($e.has(m.bead_id)||ee.has(m.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Ns.get(m.bead_id)||null,m.external===!0,{position:Ji.get(m.bead_id)||0,active:wr.active===m.bead_id,failure:Xp[m.bead_id]||null,waiting:sl?.bead_id===m.bead_id?sl.reason:null,resolution:el.get(m.bead_id),continuation_action:tl.get(m.bead_id),head_review:nl.get(m.bead_id)||null,authority:rl.get(m.bead_id)||null},m.wt_present!==!1,l.auto_merge===!0?ol(m.bead_id):null,qi(Ms,Zp(m.bead_id)),l.completion_status&&typeof l.completion_status=="object"&&!Array.isArray(l.completion_status)&&l.completion_status[m.bead_id]||null,l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},Ps.get(Ki.get(m.bead_id)||"")?.worker_serial===!0,l.auto_merge===!0,{merge_sha:m.merge_sha,cleanup_cursor:m.cleanup_cursor,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]})).map(m=>({...m,workflow:$n[m.id]||null,...Xn(m.id)})),merge_queue_length:la.length,merge_queue_running:la.length>0,auto_excluded:Jn.map(m=>m.bead_id).filter(m=>ol(m)!==null),declared_base:Ms,done:Vr,token_total:sf,cleanup_failures:pt,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]}}function Ye(){let _=!!o?.get()?.job,g=!_&&o?.isPending?.()===!0,O=_?"\uBD84\uC11D \uC911":g?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${O?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${O?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${O?c`<span class="worker-analysis-btn__badge">${O}</span>`:""}
    </button>`}function ut(l){let _=l.waiting.length>0?l.waiting[0].id:"\u2014",g=c`<button
      type="button"
      class="worker-play${l.queue.auto_advance?" is-active":""}"
    >
      ${l.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,O=Bt(l),fe=l.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Te=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${l.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${l.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${U()} 완료 <b>${l.done.length}</b></span
      >`,Ee=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${l.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${l.declared_base||"?"}</span
    >`,Be=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${ea}
          step="1"
          .value=${String(l.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:$p},(rn,Fn)=>Fn+1).map(rn=>c`<option
                value=${String(rn)}
                ?selected=${l.serial_lane_count===rn}
              >
                ${rn}
              </option>`)}
        </select>
      </label>
      ${o?Ye():""} `,dt=rd({failure:l.failure}),Ut=Yu(l.repo_operations,l.cleanup_failures);return be?c`<div class="worker-ribbon">
          ${g} ${O}
          <div class="worker-kpi worker-kpi--ribbon">${fe}${Te}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Be}</div>
          <div class="worker-kpi">${Ee}</div>
        </div>
        ${Ut}${Ke.template()}${dt}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${g}${O}${Be}</div>
        <div class="worker-kpi">
          ${fe}${Te}${Ee}
          ${(Array.isArray(l.token_total)?l.token_total:l.token_total?[{label:l.token_total,tooltip:`${U()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(rn=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${rn.tooltip}
                >${U()} 완료 · 누적 ${rn.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${_}</b></span
          >
        </div>
      </div>
      ${Ut}${Ke.template()}${dt}`}function Rt(l){if(l.running.length===0&&l.pr_wait.length===0)return"";let _=l.running.some(g=>g.kind!=="session"&&!g.paused&&g.failed!==!0);return c`<section
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
      ${l.running.length>0?vi(l.running,Date.now(),Re,l.running_overlays):""}
      ${l.pr_wait.map(g=>Gn(g))}
    </section>`}function ft(l){let _=l.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${K.show_blocked}
        />
        🔒 blocked${_.blocked>0?` ${_.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Cb.map(g=>c`<button
              type="button"
              class="worker-filter__chip${K.spec===g.value?" is-active":""}"
              data-spec=${g.value}
              aria-pressed=${K.spec===g.value?"true":"false"}
            >
              ${g.label}
            </button>`)}
        ${_.spec>0?c`<span class="worker-filter__hidden">숨김 ${_.spec}</span>`:""}
      </div>
    </div>`}function tn(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${D}
    >
      ${Rb.map(l=>c`<option value=${l.value} ?selected=${D===l.value}>
            ${l.label}
          </option>`)}
    </select>`}function jt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${z}
      >
        ${Bn.map(l=>c`<option value=${l.value} ?selected=${z===l.value}>
              ${l.label}
            </option>`)}
      </select>
    </div>`}function Pt(l){let _=c`<span
      class="worker-lane__badge${l.occupied?" worker-lane__badge--held":""}"
      >${l.badge}</span
    >`,g=l.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return _n({id:`worker-pane-lane-${l.id}`,lane:l.id,title:`\uC9C1\uB82C ${l.index}`,items:l.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:_,controls:g})}function Bt(l){let _=l.queue.auto_merge===!0;if(l.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${_?" is-active":""}"
        title=${_?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${_?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${l.merge_queue_length}
      </button>`;if(_)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let g=new Set(l.auto_excluded),O=l.pr_wait.filter(fe=>fe.merge_action&&fe.merge_enabled&&!g.has(fe.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${O>0?` ${O}`:""}
    </button>`}function Mt(l){let _=_n({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:l.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:tn(),controls:ft(l),place_menu:J(l.candidates),onOpenDoc:p?(g,O)=>p(O):void 0});return be?c`<div class="worker-lanes worker-lanes--mobile">
        ${Rt(l)}
        ${_n({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:F.queue,preview:Sp(l.waiting)})}
        ${l.serial_lanes.map(g=>Pt(g))}
        ${_}
        ${_n({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:l.done,empty:`${U()} \uC644\uB8CC \uC5C6\uC74C`,controls:jt(),collapsible:!0,collapsed:F.done,preview:Array.isArray(l.token_total)?l.token_total.map(g=>g.label).join(" \xB7 "):l.token_total||Sp(l.done)})}
      </div>`:c`<div class="worker-lanes">
      ${_}
      <div class="worker-wait">
        ${_n({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${l.serial_lanes.map(g=>Pt(g))}
      </div>
      ${_n({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${l.slots}`,items:l.running,live:l.running.some(g=>g.kind!=="session"&&!g.paused&&g.failed!==!0),body:vi(l.running,Date.now(),Re,l.running_overlays)})}
      ${_n({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:l.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${_n({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${U()} ${l.done.length}`,items:l.done,empty:`${U()} \uC644\uB8CC \uC5C6\uC74C`,controls:jt()})}
    </div>`}function Lt(l){F={...F,[l]:!F[l]},Nb(F),ze()}function ze(){let l=rt();Ve(ut(l),me),Ve(Mt(l),Ce)}function nn(){if(typeof window.matchMedia!="function")return;let l=window.matchMedia(Mb);be=!!l.matches;let _=g=>{let O=!!(g&&typeof g.matches=="boolean"?g.matches:l.matches);O!==be&&(be=O,ze())};typeof l.addEventListener=="function"?(l.addEventListener("change",_),X.push(()=>l.removeEventListener("change",_))):typeof l.addListener=="function"&&(l.addListener(_),X.push(()=>l.removeListener(_)))}let zt=null;function et(l){zt=l.target instanceof Element?l.target:null}function Pe(l){let g=l.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!g)return;if(zt&&g.contains(zt)&&zt.closest("input, button, a")){l.preventDefault();return}let O=g.dataset.beadId||"",fe=g.dataset.lane||"";N={bead_id:O,from_lane:fe};try{l.dataTransfer?.setData("text/plain",O),l.dataTransfer&&(l.dataTransfer.effectAllowed="move")}catch{}}function C(l){let _=l.target?.closest?.(".worker-pane");if(!_)return;let g=_.dataset.lane||"";g!=="candidate"&&g!=="queue"&&!/^s[1-5]$/.test(g)||(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="move"),_.classList.add("worker-pane--drag-over"))}function pe(l){l.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Le(l,_){let g=j.find(Ee=>Ee.id===l);if(!g)return;let O=j.filter(Ee=>Ee.id!==l),fe=O.length;if(_){let Ee=_.dataset.beadId;if(Ee===l)return;let Be=O.findIndex(dt=>dt.id===Ee);Be>=0&&(fe=Be)}let Te=O.slice();Te.splice(fe,0,g),x.applyReorder(l,Te,fe)}function at(l){let _=l.target?.closest?.(".worker-pane");if(!_)return;l.preventDefault(),_.classList.remove("worker-pane--drag-over");let g=_.dataset.lane||"",O=N?.bead_id||l.dataTransfer?.getData("text/plain")||"",fe=N?.from_lane||"";if(N=null,!O)return;let Te=l.target?.closest?.(".worker-mini, .worker-card"),Ee=Array.from(_.querySelectorAll(".worker-mini, .worker-card")),Be=Ee.length;if(Te){let dt=Ee.indexOf(Te);dt>=0&&(Be=dt)}if(Be=Math.max(0,Be-_.querySelectorAll(".worker-mini--ghost").length),_.classList.contains("worker-pane--collapsed")&&(Be=De()),g==="candidate"){if(fe==="candidate"){Le(O,Te);return}(fe==="queue"||/^s[1-5]$/.test(fe))&&ot(O);return}if(g==="queue"||/^s[1-5]$/.test(g)){let dt=g==="queue"?"parallel":g;fe===g?lt(O,dt,Be):Qe(O,dt)}}function xt(l){K=l,Eb(l),ze()}function yt(l){D=l==="board"||l==="created"||l==="spec"?l:ta,Lb(D),ze()}function v(l){z=dn(l)?l:sn,Pb(z),h?.(z),ze()}function y(l){let _=l.target?.closest?.(".worker-serial-lane-count");if(_){let Be=Number.parseInt(_.value,10);Number.isFinite(Be)&&H(Be).then(ze);return}let g=l.target?.closest?.(".worker-filter__blocked");if(g){xt({...K,show_blocked:g.checked});return}let O=l.target?.closest?.(".worker-done-range");if(O){v(O.value);return}let fe=l.target?.closest?.(".worker-sort");if(fe){yt(fe.value||ta);return}let Te=l.target?.closest?.(".worker-slots__input");if(!Te)return;let Ee=Number.parseInt(Te.value,10);if(!Number.isFinite(Ee)){ze();return}S(Ee).then(ze)}function k(l){return l?{runner:l.runner||void 0,model:l.model||void 0,effort:l.effort||void 0,worktree:l.worktree||void 0,status:l.status||void 0,session_id:l.session_id||void 0}:{}}function P(){let l=rt();return{operations:l.repo_operations,cleanup_failures:l.cleanup_failures,repo:d&&d()||""}}function Z(){Re&&qe.close(),ue.hidden=!1,Ze.hidden=!1,W.open(P()),ze()}function ge(l){let _=ye(),g=_.attempts?_.attempts[l]:null;Re=l,je=null,W.close(),ue.hidden=!0,Ze.hidden=!1,qe.open({attempt_id:l,meta:k(g)}),ze()}function Ie(l,_){Re=null,je=l,W.close(),ue.hidden=!0,Ze.hidden=!1,qe.open({attempt_id:l,meta:_,hide_prompt:!0}),ze()}function Xe(){if(W.isOpen()&&W.refresh(P()),je){let g=(o?.get()?.runs||[]).find(O=>O.run_id===je);g?qe.updateMeta(Mi(g)):qe.close();return}if(!Re)return;let l=ye(),_=l.attempts?l.attempts[Re]:null;if(_){qe.updateMeta(k(_));return}qe.close()}function $(l){let _=l.target;if(_?.closest?.(".worker-mini__serial, .worker-mini__grip")||_?.closest?.("#worker-parallel-analysis-dialog"))return;let g=_?.closest?.(".mon-overlap__chip");if(g){let Fe=g.closest("[data-bead-id]"),pt=Fe&&Fe.getAttribute("data-bead-id")||"";if(pt){let Qt=g.getAttribute("data-overlap-all")==="true"?null:g.getAttribute("data-overlap-id")||"";L=!!L&&L.bead_id===pt&&L.counterpart_id===Qt?null:{bead_id:pt,counterpart_id:Qt},ze()}return}let O=_?.closest?.(".mon-overlap__place");if(O){let Fe=O.closest("[data-bead-id]"),pt=Fe&&Fe.getAttribute("data-bead-id")||"";pt&&Se(pt,O.getAttribute("data-counterpart-id")||"");return}if(_?.closest?.(".mon-overlap__popover"))return;if(_?.closest?.(".worker-analysis-btn")){Ge?.open();return}if(_?.closest?.(".worker-repo-strip")||_?.closest?.(".worker-mini__timeline")){Z();return}let fe=_?.closest?.(".worker-repo-op__session");if(fe){let Fe=fe.dataset.attemptId;Fe&&ge(Fe);return}let Te=_?.closest?.(".worker-repo-op__resolve");if(Te){E(Te.dataset.operationId||"");return}let Ee=_?.closest?.(".worker-repo-op__dismiss");if(Ee){b(Ee.dataset.operationId||"");return}let Be=_?.closest?.(".worker-cleanup__resume");if(Be){let Fe=Be.dataset.beadId;Fe&&wt(Fe);return}let dt=_?.closest?.(".worker-banner__resume");if(dt){let Fe=dt.dataset.attemptId;Fe&&ht(Fe);return}let Ut=_?.closest?.(".worker-banner__discard");if(Ut){let Fe=Ut.dataset.confirmation==="merged"?"merged":"unmerged";nt(Ut.dataset.beadId||"",Ut.dataset.attemptId||null,Fe,Ut.dataset.operationId||null);return}let rn=_?.closest?.(".worker-banner__dismiss");if(rn){let Fe=rn.dataset.attemptId;Fe&&bt(Fe);return}if(_?.closest?.(".worker-play")){Ne(!ye().auto_advance);return}let Fn=_?.closest?.(".worker-merge-all");if(Fn){Fn.classList.contains("worker-merge-all--stop")?ye().auto_merge===!0?he(!1):$t():he(!0);return}let Hr=_?.closest?.(".worker-pane__hd--toggle");if(Hr){let Fe=Hr.dataset.lane;(Fe==="queue"||Fe==="done")&&Lt(Fe);return}let _r=_?.closest?.(".worker-card__place-lane");if(_r){let Fe=_r.dataset.beadId,pt=_r.dataset.lane;Fe&&(pt==="parallel"||/^s[1-5]$/.test(pt||""))&&(te=null,ze(),Qe(Fe,pt));return}if(_?.closest?.(".worker-card__place-cancel")){te=null,ze();return}let Zt=_?.closest?.(".worker-card__place");if(Zt){let Fe=Zt.dataset.beadId;Fe&&!Zt.disabled&&(I()?(te=Fe,ze()):Qe(Fe,"parallel"));return}let Gr=_?.closest?.(".worker-filter__chip");if(Gr){let Fe=Gr.dataset.spec;(Fe==="all"||Fe==="with"||Fe==="without")&&xt({...K,spec:Fe});return}let Cs=_?.closest?.(".worker-mini__merge");if(Cs){let Fe=Cs.dataset.beadId||"";ye().cleanup_failed?.[Fe]?wt(Fe):Tt(Fe);return}let Rs=_?.closest?.(".worker-mini__merge-cancel");if(Rs){mt(Rs.dataset.beadId||"");return}let $n=_?.closest?.(".worker-mini__discard");if($n){nt($n.dataset.beadId||"",$n.dataset.attemptId||null,$n.dataset.discardMode==="merged"?"merged":"unmerged",$n.dataset.operationId||null);return}let jn=_?.closest?.(".worker-mini__stale-continue");if(jn){Y("worker-stale-work-continue",jn.dataset.beadId||"",jn.dataset.actionId||"");return}let mr=_?.closest?.(".worker-mini__stale-backup");if(mr){Y("worker-stale-work-backup-fresh",mr.dataset.beadId||"",mr.dataset.actionId||"");return}let gr=_?.closest?.(".worker-mini__stale-recheck");if(gr){Y("worker-stale-work-recheck",gr.dataset.beadId||"",gr.dataset.actionId||"");return}let Os=_?.closest?.(".worker-mini__revise-fix");if(Os){le("worker-revise-fix",Os.dataset.beadId||"");return}let hr=_?.closest?.(".worker-mini__revise-approve");if(hr){le("worker-revise-approve",hr.dataset.beadId||"");return}if(_?.closest?.(".worker-mini__pr"))return;if(_?.closest?.(".rtile__discard")){let Fe=_?.closest?.(".rtile"),pt=Fe?.dataset?.beadId,Qt=Fe?.dataset?.attemptId;pt&&nt(pt,Qt||null,"unmerged",_?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(_?.closest?.(".rtile__dismiss")){let pt=_?.closest?.(".rtile")?.dataset?.attemptId;pt&&bt(pt);return}if(_?.closest?.(".rtile__pause")){let pt=_?.closest?.(".rtile")?.dataset?.attemptId;pt&&ct(pt);return}if(_?.closest?.(".rtile__resume")){let pt=_?.closest?.(".rtile")?.dataset?.attemptId;pt&&ht(pt);return}if(_?.closest?.(".rtile__session")){let pt=_?.closest?.(".rtile")?.dataset?.attemptId;pt&&ge(pt);return}if(_?.closest?.(".worker-drawer-overlay__backdrop")){W.close(),qe.close();return}if(_?.closest?.(".worker-drawer-host"))return;let Xn=_?.closest?.(".rtile .board-card__roll-toggle");if(Xn){let Fe=Xn.dataset.rollParent;Fe&&(Oe.has(Fe)?Oe.delete(Fe):Oe.add(Fe),ze());return}let Jn=_?.closest?.(".rtile .board-card__roll-child");if(Jn){let Fe=Jn.dataset.childId;Fe&&u&&u(Fe);return}let br=_?.closest?.(".rtile");if(br){if(_?.closest?.(".rtile__id")){let pt=br.dataset.beadId;pt&&an(pt).then(Qt=>{Qt?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Fe=br.dataset.beadId;Fe&&u&&u(Fe);return}let Ls=_?.closest?.(".worker-mini, .worker-card");if(Ls){let Fe=Ls.dataset.beadId;if(_?.closest?.(".worker-mini__id, .worker-card__id")){Fe&&an(Fe).then(Qt=>{Qt?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let pt=_?.closest?.(".ctl-chip--from");if(pt){let Qt=pt.dataset.fromId;Qt&&u&&u(Qt);return}Fe&&u&&u(Fe)}}e.addEventListener("pointerdown",et),e.addEventListener("dragstart",Pe),e.addEventListener("dragover",C),e.addEventListener("dragleave",pe),e.addEventListener("drop",at),e.addEventListener("click",$),e.addEventListener("change",y);function T(l){if(!L)return;let _=l.target;_&&typeof _.closest=="function"&&_.closest(".mon-overlap__popover, .mon-overlap__chip")||(L=null,ze())}function ce(l){l.key!=="Escape"||!L||(L=null,ze())}return document.addEventListener("click",T),document.addEventListener("keydown",ce),X.push(()=>{document.removeEventListener("click",T),document.removeEventListener("keydown",ce)}),nn(),w&&X.push(w.subscribe(()=>{for(let[l,_]of A)_==="failed"&&A.delete(l);ze()})),s&&X.push(s.subscribe(()=>{let l=d&&d()||"";l!==Me&&(Me=l,G.close()),ze(),Xe()})),o&&typeof o.subscribe=="function"&&X.push(o.subscribe(()=>{Xe(),ze()})),ze(),{load(){ke(),ze()},refreshSessionDefaults:we,destroy(){for(let l of X.splice(0))try{l()}catch{}e.removeEventListener("pointerdown",et),e.removeEventListener("dragstart",Pe),e.removeEventListener("dragover",C),e.removeEventListener("dragleave",pe),e.removeEventListener("drop",at),e.removeEventListener("click",$),e.removeEventListener("change",y);try{qe.destroy()}catch{}Ze.hidden=!0;try{Ge?.destroy()}catch{}try{G.destroy()}catch{}Ve(c``,e)}}}function ji(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Ip(e,t,n,r=async()=>{},s=async()=>{}){let o=Ct("views:workspace-picker"),a=null,i=!1,u=!1,d=!1;async function p(z){let U=z.target.value,be=t.getState().workspace?.current?.path||"";if(U&&U!==be){o("switching workspace to %s",U),i=!0,D();try{await n(U)}catch($e){o("workspace switch failed: %o",$e)}finally{i=!1,D()}}}async function f(){let z=t.getState(),A=z.workspace?.current?.path||z.workspace?.available?.[0]?.path||"";if(!(!A||u)){o("git-pulling workspace %s",A),u=!0,D();try{await r(A)}catch(U){o("workspace git pull failed: %o",U)}finally{u=!1,D()}}}function h(z){let A=z.target;A&&e.contains(A)||N()}function w(z){z.key==="Escape"&&N()}function x(){d||(d=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",w),D())}function N(){d&&(d=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",w),D())}function j(){d?N():x()}async function K(z){let A=z.target,U=A.value,F=A.checked;o("toggling visibility %s \u2192 %s",U,String(F));try{await s(U,F)}catch(be){o("workspace visibility toggle failed: %o",be)}}function te(z){return z?c`
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
    `:c``}function L(z,A){return c`
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
        ${d?c`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${z.map(U=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${U.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${U.path}"
                        .checked=${!A.has(U.path)}
                        @change=${K}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ji(U.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function M(){let z=t.getState(),A=z.workspace?.current,U=z.workspace?.available||[],F=new Set(z.workspace?.hidden||[]),be=A?.path||U[0]?.path||"";if(U.length===0)return c``;let $e=U.filter(ee=>!F.has(ee.path)||ee.path===be);if($e.length<=1){let ee=$e[0]||U[0],Q=ji(ee.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ee.path}"
            >${Q}</span
          >
          ${L(U,F)}
          ${te(be)}
          ${u?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${i||u}
          aria-label="Select project workspace"
        >
          ${$e.map(ee=>c`
              <option
                value="${ee.path}"
                ?selected=${ee.path===be}
                title="${ee.path}"
              >
                ${ji(ee.path)}
              </option>
            `)}
        </select>
        ${L(U,F)}
        ${te(be)}
        ${i||u?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){Ve(M(),e)}return D(),a=t.subscribe(()=>D()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",w),Ve(c``,e)}}}var Pp=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Bi(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Mp(e,t,n=Bi()){return{id:n,type:e,payload:t}}function Dp(e={}){let t=Ct("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,u=!0,d=new Map,p=[],f=new Map,h=new Set;function w(M){for(let D of Array.from(h))try{D(M)}catch{}}function x(){if(!u||i)return;o="reconnecting",t("ws reconnecting\u2026"),w(o);let M=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),D=(n.jitterRatio||0)*M,z=Math.max(0,Math.round(M+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",z,a+1),i=setTimeout(()=>{i=null,L()},z)}function N(M){try{s?.send(JSON.stringify(M))}catch(D){t("ws send failed",D)}}function j(){for(o="open",t("ws open"),w(o),a=0;p.length;){let M=p.shift();M&&N(M)}}function K(M){let D;try{D=JSON.parse(String(M.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(d.has(D.id)){let A=d.get(D.id);d.delete(D.id),D.ok?A?.resolve(D.payload):A?.reject(D.error||new Error("ws error"));return}let z=f.get(D.type);if(z&&z.size>0)for(let A of Array.from(z))try{A(D.payload)}catch(U){t("ws event handler error",U)}else t("ws received unhandled message type: %s",D.type)}function te(){o="closed",t("ws closed"),w(o);for(let[M,D]of d.entries())D.reject(new Error("ws disconnected")),d.delete(M);a+=1,x()}function L(){if(!u)return;let M=r();try{s=new WebSocket(M),t("ws connecting %s",M),o="connecting",w(o),s.addEventListener("open",j),s.addEventListener("message",K),s.addEventListener("error",()=>{}),s.addEventListener("close",te)}catch(D){t("ws connect failed %o",D),x()}}return L(),{send(M,D){if(!Pp.includes(M))return Promise.reject(new Error(`unknown message type: ${M}`));let z=Bi(),A=Mp(M,D,z);return t("send %s id=%s",M,z),new Promise((U,F)=>{d.set(z,{resolve:U,reject:F,type:M}),s&&s.readyState===s.OPEN?N(A):(t("queue %s id=%s (state=%s)",M,z,o),p.push(A))})},on(M,D){f.has(M)||f.set(M,new Set);let z=f.get(M);return z?.add(D),()=>{z?.delete(D)}},onConnection(M){return h.add(M),()=>{h.delete(M)}},reconnect(){u=!0,i&&(clearTimeout(i),i=null),a=0,L()},close(){u=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Yb(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Zb(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Ui=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Np=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Zn="tab:worker:closed",Qb="bdui.worker.done-range",qp=jd,Fp="worker:queue",jp="worker:parallel-analysis",Bp="ui:order",Up="ui:display-policy",Wp="exec:presets",Qn="tab:board:closed",zp="beads-ui.board.closed-range";function Xb(e){let t=Ct("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ve(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),u=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),p=document.getElementById("detail-panel");if(a&&ap(a),i&&u&&d&&p){let _e=function($,T){let ce="Request failed",l="";if($&&typeof $=="object"){let g=$;if(typeof g.message=="string"&&g.message.length>0&&(ce=g.message),typeof g.details=="string")l=g.details;else if(g.details&&typeof g.details=="object")try{l=JSON.stringify(g.details,null,2)}catch{l=""}}else typeof $=="string"&&$.length>0&&(ce=$);let _=T&&T.length>0?`Failed to load ${T}`:"Request failed";X.open(_,ce,l)},J=function($){return`${et.getState().workspace.current?.path||""}\0${$}`},re=function(){qe&&(qe().catch(()=>{}),qe=null),W=null,G=null},De=function($){Me=$;let T=()=>{Me!==$||et.getState().selected_id!==$||(Me=null,V($))};if(!ye){Ge.then(T);return}T()},ct=function($,T,ce,l,_){return ce!==ot[T]?(_().catch(()=>{}),!1):($.set(l,_),!0)},bt=function(){let $=et.getState();he($.view==="board"),Ne($.view==="worker"),ie($.view==="monitor"),b($.view==="board"||$.view==="worker"||ht||!!$.selected_id)},wt=function(){let $=or(tt);return $===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:$}}},He=function(){let $=or(Tt);return $===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:$}}},he=function($){if($)for(let[T,ce]of Ui){if(Qe.has(T)||lt.has(T))continue;let l=T===Qn?wt():{type:ce};try{me.register(T,l)}catch(O){t("register %s store failed: %o",T,O)}lt.add(T);let _=ot.board,g=!1;Ue.subscribeList(T,l).then(O=>{g=!ct(Qe,"board",_,T,O)}).catch(O=>{t("subscribe %s failed: %o",T,O),_e(O,"board")}).finally(()=>{lt.delete(T),g&&bt()})}else nt()},nt=function(){ot.board+=1;for(let[$]of Ui){let T=Qe.get($);T&&(T().catch(()=>{}),Qe.delete($));try{me.unregister($)}catch(ce){t("unregister %s failed: %o",$,ce)}}},Ne=function($){if(!$){E();return}for(let[T,ce]of Np){if(Y.has(T)||lt.has(T))continue;let l=T===Zn?He():{type:ce};try{me.register(T,l)}catch(O){t("register %s store failed: %o",T,O)}lt.add(T);let _=ot.worker,g=!1;Ue.subscribeList(T,l).then(O=>{g=!ct(Y,"worker",_,T,O)}).catch(O=>{t("subscribe %s failed: %o",T,O),_e(O,"worker")}).finally(()=>{lt.delete(T),g&&bt()})}},E=function(){ot.worker+=1;for(let[$]of Np){let T=Y.get($);T&&(T().catch(()=>{}),Y.delete($));try{me.unregister($)}catch(ce){t("unregister %s failed: %o",$,ce)}}},b=function($){if(!$){S();return}le||(we("subscribe-worker-queue",{id:Fp}).catch(T=>{t("subscribe-worker-queue failed: %o",T)}),we("subscribe-worker-parallel-analysis",{id:jp}).catch(T=>{t("subscribe-worker-parallel-analysis failed: %o",T)}),le=()=>(we("unsubscribe-worker-parallel-analysis",{id:jp}),we("unsubscribe-worker-queue",{id:Fp})))},S=function(){le&&(le().catch(()=>{}),le=null),gt.clear()},ie=function($){if(!$){ae();return}H||(we("subscribe-monitor-pipeline",{id:qp}).catch(T=>{t("subscribe-monitor-pipeline failed: %o",T)}),H=()=>we("unsubscribe-monitor-pipeline",{id:qp}))},ae=function(){H&&(H().catch(()=>{}),H=null)},Se=function(){ve||(we("subscribe-ui-order",{id:Bp}).catch($=>{t("subscribe-ui-order failed: %o",$)}),ve=()=>we("unsubscribe-ui-order",{id:Bp}))},Je=function(){ve&&(ve().catch(()=>{}),ve=null),ue.clear()},Ye=function(){rt||(we("subscribe-display-policy",{id:Up}).catch($=>{t("subscribe-display-policy failed: %o",$)}),rt=()=>we("unsubscribe-display-policy",{id:Up}))},ut=function(){rt&&(rt().catch(()=>{}),rt=null),Ce.clear()},ft=function(){Rt||(we("subscribe-impl-presets",{id:Wp}).catch($=>{t("subscribe-impl-presets failed: %o",$)}),Rt=()=>we("unsubscribe-impl-presets",{id:Wp}))},Lt=function($){if(!$)return"Unknown";let T=$.split("/").filter(Boolean);return T.length>0?T[T.length-1]:"Unknown"},y=function($,T){v.open($.path,{missing_state:$.missing_state,...T?{workspace:T}:{}})};var f=_e,h=J,w=re,x=De,N=ct,j=bt,K=wt,te=He,L=he,M=nt,D=Ne,z=E,A=b,U=S,F=ie,be=ae,$e=Se,ee=Je,Q=Ye,xe=ut,Oe=ft,ne=Lt,oe=y;let Ae=document.getElementById("header-loading"),B=ic(Ae),X=Ku(e),ke=Dp(),we=B.wrapSend(($,T)=>ke.send($,T)),Ue=Jl(we),me=ec(),Ze=rc(),gt=nc(),R=ql(),ue=tc(),Ce=Dl(),Re=Nl(),je=Fl();ke.on("impl-presets-snapshot",$=>{let T=$;T&&typeof T.revision=="number"&&Array.isArray(T.presets)&&Re.set({revision:T.revision,presets:T.presets})}),ke.on("monitor-pipeline-snapshot",$=>{let T=$;if(!(!T||!Array.isArray(T.workspaces)))try{R.set(T.workspaces,T.workspaces_state)}catch{}}),ke.on("ui-order-snapshot",$=>{let T=$;if(T&&typeof T.revision=="number")try{ue.set({revision:T.revision,order:T.order&&typeof T.order=="object"?T.order:{}})}catch{}}),ke.on("display-policy-snapshot",$=>{let T=$;if(T&&T.policy&&typeof T.policy=="object")try{Ce.set(T.policy)}catch{}}),ke.on("session-log-snapshot",$=>{let T=$;if(T&&typeof T.id=="string")try{je.set(T.id,Array.isArray(T.lines)?T.lines:[],typeof T.last_event_at=="number"?T.last_event_at:null)}catch{}}),ke.on("session-log-append",$=>{let T=$;if(T&&typeof T.id=="string")try{je.append(T.id,T.event)}catch{}}),ke.on("snapshot",$=>{let T=$,ce=T&&typeof T.id=="string"?T.id:"",l=ce?me.getStore(ce):null;if(l&&T&&T.type==="snapshot")try{l.applyPush(T)}catch{}}),ke.on("upsert",$=>{let T=$,ce=T&&typeof T.id=="string"?T.id:"",l=ce?me.getStore(ce):null;if(l&&T&&T.type==="upsert")try{l.applyPush(T)}catch{}}),ke.on("delete",$=>{let T=$,ce=T&&typeof T.id=="string"?T.id:"",l=ce?me.getStore(ce):null;if(l&&T&&T.type==="delete")try{l.applyPush(T)}catch{}});let qe=null,W=null,G=null,Me=null,Ke=()=>{},Ge=new Promise($=>{Ke=()=>$(void 0)}),ye=!1,I=!1;async function V($){let T=J($);if(T===W||T===G)return;G=T;let ce=`detail:${$}`,l={type:"issue-detail",params:{id:$}};try{me.register(ce,l)}catch(_){t("register detail store failed: %o",_)}try{let _=await Ue.subscribeList(ce,l);if(et.getState().selected_id!==$||J($)!==T){await _().catch(()=>{});return}qe&&await qe().catch(()=>{}),qe=_,W=T}catch(_){t("detail subscribe failed: %o",_),_e(_,"issue details")}finally{G===T&&(G=null)}}let Qe=new Map,lt=new Set,ot={board:0,worker:0},ht=!1,tt=sn;try{let $=window.localStorage.getItem(zp);dn($)&&(tt=$)}catch{}let Tt=sn;try{let $=window.localStorage.getItem(Qb);dn($)&&(Tt=$)}catch{}async function mt($){if(!dn($)||$===tt)return;tt=$;try{window.localStorage.setItem(zp,$)}catch{}let T=Qe.get(Qn);if(!T)return;Qe.delete(Qn),await T().catch(()=>{});let ce=wt();try{me.register(Qn,ce)}catch(l){t("register %s store failed: %o",Qn,l)}try{let l=await Ue.subscribeList(Qn,ce);Qe.set(Qn,l)}catch(l){t("re-subscribe %s failed: %o",Qn,l),_e(l,"board")}}async function $t($){if(!dn($)||$===Tt)return;Tt=$;let T=Y.get(Zn);if(!T)return;Y.delete(Zn),await T().catch(()=>{});let ce=He();try{me.register(Zn,ce)}catch(l){t("register %s store failed: %o",Zn,l)}try{let l=await Ue.subscribeList(Zn,ce);Y.set(Zn,l)}catch(l){t("re-subscribe %s failed: %o",Zn,l),_e(l,"worker")}}let Y=new Map,le=null,H=null,ve=null,rt=null,Rt=null;async function tn(){rt=null,Ce.clear(),Rt=null,Re.clear(),le=null,H=null,Qe.clear(),Y.clear(),ot.board+=1,ot.worker+=1,ft();let $=et.getState().workspace.current?.path;if($)try{await ke.send("set-workspace",{path:$})}catch(ce){t("workspace restore after reconnect failed: %o",ce);return}Ye();let T=et.getState();he(T.view==="board"),Ne(T.view==="worker"),ie(T.view==="monitor"),b(T.view==="board"||T.view==="worker"||!!T.selected_id)}async function jt(){t("clearing all subscriptions for workspace switch"),nt(),E(),S(),Ze.clear(),Je(),Se(),ut(),Ye(),re();let $=et.getState();if($.selected_id)try{me.unregister(`detail:${$.selected_id}`)}catch{}let T=et.getState();he(T.view==="board"),Ne(T.view==="worker"),ie(T.view==="monitor"),b(T.view==="board"||T.view==="worker"||!!T.selected_id),T.selected_id&&De(T.selected_id)}async function Pt($){t("requesting workspace switch to %s",$),I=!0;try{let T=await ke.send("set-workspace",{path:$});t("workspace switch result: %o",T),T&&T.workspace&&(et.setState({workspace:{current:{path:T.workspace.root_dir,database:T.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",$),T.changed&&(await jt(),de("Switched to "+Lt($),"success",2e3)))}catch(T){throw t("workspace switch failed: %o",T),de("Failed to switch workspace","error",3e3),T}finally{I=!1}}async function Bt($){t("requesting workspace git pull for %s",$);try{let T=await ke.send("git-pull-workspace",{});t("workspace git pull result: %o",T);let ce=T?.status;if(ce==="up_to_date"){de("Already up to date","success",2e3);return}if(ce==="stash_pop_conflict"){de("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}de("Git pulled "+Lt($),"success",2e3)}catch(T){t("workspace git pull failed: %o",T);let ce=T?.code,l=T?.message;if(ce==="rebase_conflict"){de("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(ce==="rebase_conflict_abort_failed"){de("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(ce==="busy"){de("Git pull skipped: another operation is running","warning",3e3);return}let _=l?`: ${l}`:"";throw de(`Git pull failed${_}`,"error",3e3),T}}async function Mt($,T){t("setting workspace visibility %s \u2192 %s",$,String(T));try{await ke.send("set-workspace-visibility",{path:$,visible:T}),await ze()}catch(ce){t("workspace visibility update failed: %o",ce),de("Failed to update project visibility","error",3e3)}}async function ze(){try{let $=await ke.send("list-workspaces",{});if(t("workspaces loaded: %o",$),$&&Array.isArray($.workspaces)){let T=$.workspaces.map(g=>({path:g.path,database:g.database,pid:g.pid,version:g.version})),ce=$.current?{path:$.current.root_dir,database:$.current.db_path}:null,l=Array.isArray($.hidden)?$.hidden.filter(g=>typeof g=="string"):[];et.setState({workspace:{current:ce,available:T,hidden:l}});let _=window.localStorage.getItem("beads-ui.workspace");_&&(!T.some(O=>O.path===_)||l.includes(_)?window.localStorage.removeItem("beads-ui.workspace"):ce&&_!==ce.path&&(t("restoring saved workspace preference: %s",_),await Pt(_)))}}catch($){t("failed to load workspaces: %o",$)}}ke.on("workspace-changed",$=>{t("workspace-changed event: %o",$),$&&$.root_dir&&(et.setState({workspace:{current:{path:$.root_dir,database:$.db_path}}}),ze(),jt())});let nn=!1;if(typeof ke.onConnection=="function"){let $=T=>{t("ws state %s",T),T==="reconnecting"||T==="closed"?(nn=!0,de("Connection lost. Reconnecting\u2026","error",4e3)):T==="open"&&nn&&(nn=!1,de("Reconnected","success",2200),Zb(et,(ce,l)=>{t(`${ce}: %o`,l)}),tn())};ke.onConnection($)}let zt="board";try{let $=window.localStorage.getItem("beads-ui.view");($==="board"||$==="worker"||$==="monitor")&&(zt=$)}catch($){t("view parse error: %o",$)}let et=ac({config:Yb(),view:zt});ke.on("worker-queue-snapshot",$=>{let T=$;if(!T||!T.queue)return;let ce=et.getState().workspace.current?.path;if(typeof ce=="string"&&ce.length>0&&T.root_dir!==ce){t("dropping worker-queue snapshot for %s",String(T.root_dir));return}try{Ze.set(T.queue)}catch{}}),ke.on("worker-parallel-analysis-snapshot",$=>{let T=$;if(!T)return;let ce=et.getState().workspace.current?.path;if(!(typeof ce=="string"&&ce.length>0&&typeof T.root_dir=="string"&&T.root_dir!==ce))try{gt.set({settings:T.settings,job:T.job??null,runs:Array.isArray(T.runs)?T.runs:[],last_good:T.last_good??null})}catch{}});let Pe=sc(et);Pe.start();let C=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),pe=async($,T)=>{try{return await we($,T)}catch(ce){if(C.has($))throw ce;return[]}};Ud({global_element:r,repo_element:s},et,Pe);let Le=document.getElementById("workspace-picker");Le&&Ip(Le,et,Pt,Bt,Mt);let at=Gd(e,($,T)=>we($,T));try{let $=document.getElementById("new-issue-btn");$&&$.addEventListener("click",()=>at.open())}catch{}let xt=Zd(e,{policyStore:Ce,queueStore:Ze,implPresetStore:Re,transport:($,T)=>we($,T),onOpenChange:$=>{let T=ht;ht=$,bt(),T&&$===!1&&P.refreshSessionDefaults()},labelOptions:()=>{let $=new Set;for(let[T]of Ui)for(let ce of me.snapshotFor(T)||[]){let l=ce.labels;if(Array.isArray(l))for(let _ of l)typeof _=="string"&&_.length>0&&$.add(_)}return Array.from($).sort()}});try{let $=document.getElementById("display-settings-btn");$&&($.setAttribute("aria-label","\uC124\uC815"),$.setAttribute("title","\uC124\uC815"),$.addEventListener("click",()=>xt.open()))}catch{}let yt=document.createElement("div");yt.className="md-viewer-root",document.body.appendChild(yt);let v=Mo(yt,{getWorkspacePath:()=>et.getState().workspace.current?.path}),k=vc(i,{gotoIssue:$=>Pe.gotoIssue($),issueStores:me,transport:pe,workerQueueStore:Ze,uiOrderStore:ue,displayPolicyStore:Ce,closedRange:tt,onClosedRangeChange:$=>{mt($)},onNewIssue:()=>at.open(),openDoc:y}),P=Fi(u,{transport:pe,issueStores:me,queueStore:Ze,analysisStore:gt,sessionLogStore:je,uiOrderStore:ue,gotoIssue:$=>et.setState({selected_id:$}),getWorkspacePath:()=>et.getState().workspace.current?.path,openDoc:y,doneRange:Tt,onDoneRangeChange:$=>{$t($)}}),Z=Bd(d,{transport:pe,pipelineStore:R,execPresetStore:Re,sessionLogStore:je,router:Pe,gotoIssue:$=>Pe.gotoIssue($),getWorkspacePath:()=>et.getState().workspace.current?.path,switchWorkspace:$=>Pt($),openDoc:y}),ge=Vu(p,{issueStores:me,transport:pe,queueStore:Ze,execPresetStore:Re,sessionLogStore:je,getWorkspacePath:()=>et.getState().workspace.current?.path,mdViewer:v,onNavigate:$=>{et.getState().view==="worker"?et.setState({selected_id:$}):Pe.gotoIssue($)},onClose:()=>{let $=et.getState();et.setState({selected_id:null});try{Pe.gotoView($.view==="worker"||$.view==="monitor"?$.view:"board")}catch{}},onOpenExecPresets:()=>{xt.open("execution")}}),Ie=et.getState().selected_id;Ie&&(p.hidden=!1,ge.load(Ie),De(Ie)),et.subscribe($=>{let T=$.selected_id;T?(p.hidden=!1,ge.load(T),I||De(T)):(ge.clear(),p.hidden=!0,re())});let Xe=$=>{i.hidden=$.view!=="board",u.hidden=$.view!=="worker",d.hidden=$.view!=="monitor",o&&o.classList.toggle("is-quiet",$.view==="monitor"),he($.view==="board"),Ne($.view==="worker"),ie($.view==="monitor"),b($.view==="board"||$.view==="worker"||ht||!!$.selected_id),!$.selected_id&&$.view==="board"&&k.load(),$.view==="worker"&&P.load(),$.view==="monitor"?Z.load():Z.pause(),window.localStorage.setItem("beads-ui.view",$.view)};et.subscribe(Xe),Xe(et.getState()),Se(),Ye(),ft(),ze().finally(()=>{ye=!0,Ke()}),window.addEventListener("keydown",$=>{let T=$.ctrlKey||$.metaKey,ce=String($.key||"").toLowerCase(),l=$.target,_=l&&l.tagName?String(l.tagName).toLowerCase():"",g=_==="input"||_==="textarea"||_==="select"||l&&typeof l.isContentEditable=="boolean"&&l.isContentEditable;T&&ce==="n"&&(g||($.preventDefault(),at.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Xb(t)});export{Xb as bootstrap,Yb as readBootstrapConfig,Zb as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
