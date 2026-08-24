var uf=Object.create;var ba=Object.defineProperty;var df=Object.getOwnPropertyDescriptor;var pf=Object.getOwnPropertyNames;var ff=Object.getPrototypeOf,_f=Object.prototype.hasOwnProperty;var mf=(e,t,n)=>t in e?ba(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ya=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var gf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of pf(t))!_f.call(e,s)&&s!==n&&ba(e,s,{get:()=>t[s],enumerable:!(r=df(t,s))||r.enumerable});return e};var hf=(e,t,n)=>(n=e!=null?uf(ff(e)):{},gf(t||!e||!e.__esModule?ba(n,"default",{value:e,enumerable:!0}):n,e));var kt=(e,t,n)=>mf(e,typeof t!="symbol"?t+"":t,n);var Ul=ya((dy,Bl)=>{var Ar=1e3,Sr=Ar*60,Er=Sr*60,lr=Er*24,vf=lr*7,wf=lr*365.25;Bl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return kf(e);if(n==="number"&&isFinite(e))return t.long?xf(e):$f(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function kf(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*wf;case"weeks":case"week":case"w":return n*vf;case"days":case"day":case"d":return n*lr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Er;case"minutes":case"minute":case"mins":case"min":case"m":return n*Sr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Ar;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function $f(e){var t=Math.abs(e);return t>=lr?Math.round(e/lr)+"d":t>=Er?Math.round(e/Er)+"h":t>=Sr?Math.round(e/Sr)+"m":t>=Ar?Math.round(e/Ar)+"s":e+"ms"}function xf(e){var t=Math.abs(e);return t>=lr?Ks(e,t,lr,"day"):t>=Er?Ks(e,t,Er,"hour"):t>=Sr?Ks(e,t,Sr,"minute"):t>=Ar?Ks(e,t,Ar,"second"):e+" ms"}function Ks(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var zl=ya((py,Wl)=>{function Af(e){n.debug=n,n.default=n,n.coerce=u,n.disable=a,n.enable=s,n.enabled=i,n.humanize=Ul(),n.destroy=d,Object.keys(e).forEach(p=>{n[p]=e[p]}),n.names=[],n.skips=[],n.formatters={};function t(p){let f=0;for(let h=0;h<p.length;h++)f=(f<<5)-f+p.charCodeAt(h),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(p){let f,h=null,w,x;function N(...j){if(!N.enabled)return;let Y=N,J=Number(new Date),L=J-(f||J);Y.diff=L,Y.prev=f,Y.curr=J,f=J,j[0]=n.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let I=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(z,A)=>{if(z==="%%")return"%";I++;let U=n.formatters[A];if(typeof U=="function"){let F=j[I];z=U.call(Y,F),j.splice(I,1),I--}return z}),n.formatArgs.call(Y,j),(Y.log||n.log).apply(Y,j)}return N.namespace=p,N.useColors=n.useColors(),N.color=n.selectColor(p),N.extend=r,N.destroy=n.destroy,Object.defineProperty(N,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(w!==n.namespaces&&(w=n.namespaces,x=n.enabled(p)),x),set:j=>{h=j}}),typeof n.init=="function"&&n.init(N),N}function r(p,f){let h=n(this.namespace+(typeof f>"u"?":":f)+p);return h.log=this.log,h}function s(p){n.save(p),n.namespaces=p,n.names=[],n.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of f)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function o(p,f){let h=0,w=0,x=-1,N=0;for(;h<p.length;)if(w<f.length&&(f[w]===p[h]||f[w]==="*"))f[w]==="*"?(x=w,N=h,w++):(h++,w++);else if(x!==-1)w=x+1,N++,h=N;else return!1;for(;w<f.length&&f[w]==="*";)w++;return w===f.length}function a(){let p=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),p}function i(p){for(let f of n.skips)if(o(p,f))return!1;for(let f of n.names)if(o(p,f))return!0;return!1}function u(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Wl.exports=Af});var Hl=ya((Qt,Ys)=>{Qt.formatArgs=Ef;Qt.save=Tf;Qt.load=Cf;Qt.useColors=Sf;Qt.storage=Rf();Qt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Qt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Sf(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Ef(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ys.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}Qt.log=console.debug||console.log||(()=>{});function Tf(e){try{e?Qt.storage.setItem("debug",e):Qt.storage.removeItem("debug")}catch{}}function Cf(){let e;try{e=Qt.storage.getItem("debug")||Qt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Rf(){try{return localStorage}catch{}}Ys.exports=zl()(Qt);var{formatters:Of}=Ys.exports;Of.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Qr=globalThis,Us=Qr.trustedTypes,Sl=Us?Us.createPolicy("lit-html",{createHTML:e=>e}):void 0,wa="$lit$",Tn=`lit$${Math.random().toFixed(9).slice(2)}$`,ka="?"+Tn,bf=`<${ka}>`,sr=document,Xr=()=>sr.createComment(""),Jr=e=>e===null||typeof e!="object"&&typeof e!="function",$a=Array.isArray,Ll=e=>$a(e)||typeof e?.[Symbol.iterator]=="function",va=`[ 	
\f\r]`,Zr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,El=/-->/g,Tl=/>/g,nr=RegExp(`>|${va}(?:([^\\s"'>=/]+)(${va}*=${va}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Cl=/'/g,Rl=/"/g,Il=/^(?:script|style|textarea|title)$/i,xa=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=xa(1),xr=xa(2),sy=xa(3),un=Symbol.for("lit-noChange"),It=Symbol.for("lit-nothing"),Ol=new WeakMap,rr=sr.createTreeWalker(sr,129);function Pl(e,t){if(!$a(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Sl!==void 0?Sl.createHTML(t):t}var Ml=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Zr;for(let i=0;i<n;i++){let u=e[i],d,p,f=-1,h=0;for(;h<u.length&&(a.lastIndex=h,p=a.exec(u),p!==null);)h=a.lastIndex,a===Zr?p[1]==="!--"?a=El:p[1]!==void 0?a=Tl:p[2]!==void 0?(Il.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=nr):p[3]!==void 0&&(a=nr):a===nr?p[0]===">"?(a=s??Zr,f=-1):p[1]===void 0?f=-2:(f=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?nr:p[3]==='"'?Rl:Cl):a===Rl||a===Cl?a=nr:a===El||a===Tl?a=Zr:(a=nr,s=void 0);let w=a===nr&&e[i+1].startsWith("/>")?" ":"";o+=a===Zr?u+bf:f>=0?(r.push(d),u.slice(0,f)+wa+u.slice(f)+Tn+w):u+Tn+(f===-2?i:w)}return[Pl(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},es=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,u=this.parts,[d,p]=Ml(t,n);if(this.el=e.createElement(d,r),rr.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=rr.nextNode())!==null&&u.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(wa)){let h=p[a++],w=s.getAttribute(f).split(Tn),x=/([.?@])?(.*)/.exec(h);u.push({type:1,index:o,name:x[2],strings:w,ctor:x[1]==="."?zs:x[1]==="?"?Hs:x[1]==="@"?Gs:ar}),s.removeAttribute(f)}else f.startsWith(Tn)&&(u.push({type:6,index:o}),s.removeAttribute(f));if(Il.test(s.tagName)){let f=s.textContent.split(Tn),h=f.length-1;if(h>0){s.textContent=Us?Us.emptyScript:"";for(let w=0;w<h;w++)s.append(f[w],Xr()),rr.nextNode(),u.push({type:2,index:++o});s.append(f[h],Xr())}}}else if(s.nodeType===8)if(s.data===ka)u.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(Tn,f+1))!==-1;)u.push({type:7,index:o}),f+=Tn.length-1}o++}}static createElement(t,n){let r=sr.createElement("template");return r.innerHTML=t,r}};function or(e,t,n=e,r){if(t===un)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=Jr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=or(e,s._$AS(e,t.values),s,r)),t}var Ws=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??sr).importNode(n,!0);rr.currentNode=s;let o=rr.nextNode(),a=0,i=0,u=r[0];for(;u!==void 0;){if(a===u.index){let d;u.type===2?d=new $r(o,o.nextSibling,this,t):u.type===1?d=new u.ctor(o,u.name,u.strings,this,t):u.type===6&&(d=new Vs(o,this,t)),this._$AV.push(d),u=r[++i]}a!==u?.index&&(o=rr.nextNode(),a++)}return rr.currentNode=sr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},$r=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=It,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=or(this,t,n),Jr(t)?t===It||t==null||t===""?(this._$AH!==It&&this._$AR(),this._$AH=It):t!==this._$AH&&t!==un&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ll(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==It&&Jr(this._$AH)?this._$AA.nextSibling.data=t:this.T(sr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=es.createElement(Pl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Ws(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Ol.get(t.strings);return n===void 0&&Ol.set(t.strings,n=new es(t)),n}k(t){$a(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(Xr()),this.O(Xr()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ar=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=It,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=It}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=or(this,t,n,0),a=!Jr(t)||t!==this._$AH&&t!==un,a&&(this._$AH=t);else{let i=t,u,d;for(t=o[0],u=0;u<o.length-1;u++)d=or(this,i[r+u],n,u),d===un&&(d=this._$AH[u]),a||(a=!Jr(d)||d!==this._$AH[u]),d===It?t=It:t!==It&&(t+=(d??"")+o[u+1]),this._$AH[u]=d}a&&!s&&this.j(t)}j(t){t===It?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},zs=class extends ar{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===It?void 0:t}},Hs=class extends ar{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==It)}},Gs=class extends ar{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=or(this,t,n,0)??It)===un)return;let r=this._$AH,s=t===It&&r!==It||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==It&&(r===It||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Vs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){or(this,t)}},Dl={M:wa,P:Tn,A:ka,C:1,L:Ml,R:Ws,D:Ll,V:or,I:$r,H:ar,N:Hs,U:Gs,B:zs,F:Vs},yf=Qr.litHtmlPolyfillSupport;yf?.(es,$r),(Qr.litHtmlVersions??(Qr.litHtmlVersions=[])).push("3.3.1");var Ve=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new $r(t.insertBefore(Xr(),o),o,void 0,n??{})}return s._$AI(e),s};var sn="today",Wn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function dn(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function ir(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Nl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ql(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Fl(){let e=null,t=[],n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],r()},clear(){e=null,t=[],r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function jl(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Gl=hf(Hl(),1);function Ct(e){return(0,Gl.default)(`beads-ui:${e}`)}function hn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function cr(e,t){let n=hn(e.created_at),r=hn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Yl(e,t){let n=hn(e.created_at),r=hn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Zl(e,t){let n=hn(e.updated_at),r=hn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ql(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=hn(e.created_at),o=hn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Xl(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Lf=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Vl(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Kl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Lf.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Jl(e,t){let n=Vl(e),r=Vl(t);if(n!==r)return n<r?-1:1;let s=Kl(e),o=Kl(t);if(s!==o)return s<o?-1:1;let a=hn(e&&e.created_at),i=hn(t&&t.created_at);if(a!==i)return a<i?-1:1;let u=e&&e.id,d=t&&t.id;return u===d?0:String(u)<String(d)?-1:1}var Aa=2**20;function Tr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-hn(e&&e.created_at)}function Zs(e){return(t,n)=>{let r=Tr(t,e),s=Tr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Sa(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Tr(i,n)-Aa};if(!i)return{rank:Tr(a,n)+Aa};let u=Tr(a,n),d=Tr(i,n),p=(u+d)/2;return u<p&&p<d?{rank:p}:{renormalize:r.map((f,h)=>({bead_id:f.id,rank:h*Aa}))}}function Ea(e,t={}){let n=Ct(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,u=t.sort||cr;function d(){for(let h of Array.from(a))try{h()}catch{}}function p(){s=Array.from(r.values()).sort(u)}function f(h){if(i||!h||h.id!==e)return;let w=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,w),!(w<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(w<=o)return;r.clear();let x=Array.isArray(h.issues)?h.issues:[];for(let N of x)N&&typeof N.id=="string"&&N.id.length>0&&r.set(N.id,N);p(),o=w,d();return}if(h.type==="upsert"){let x=h.issue;if(x&&typeof x.id=="string"&&x.id.length>0){let N=r.get(x.id);if(!N)r.set(x.id,x);else{let j=Number.isFinite(N.updated_at)?N.updated_at:0,Y=Number.isFinite(x.updated_at)?x.updated_at:0;if(j<=Y){for(let J of Object.keys(N))J in x||delete N[J];for(let[J,L]of Object.entries(x))N[J]=L}}p()}o=w,d()}else if(h.type==="delete"){let x=String(h.issue_id||"");x&&(r.delete(x),p()),o=w,d()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:f,snapshot(){return s},size(){return r.size},getById(h){return r.get(h)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function Qs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function ec(e){let t=Ct("subs"),n=new Map,r=new Map;function s(i,u){t("applyDelta %s +%d ~%d -%d",i,(u.added||[]).length,(u.updated||[]).length,(u.removed||[]).length);let d=r.get(i);if(!d||d.size===0)return;let p=Array.isArray(u.added)?u.added:[],f=Array.isArray(u.updated)?u.updated:[],h=Array.isArray(u.removed)?u.removed:[];for(let w of Array.from(d)){let x=n.get(w);if(!x)continue;let N=x.itemsById;for(let j of p)typeof j=="string"&&j.length>0&&N.set(j,!0);for(let j of f)typeof j=="string"&&j.length>0&&N.set(j,!0);for(let j of h)typeof j=="string"&&j.length>0&&N.delete(j)}}async function o(i,u){let d=Qs(u);if(t("subscribe %s key=%s",i,d),!n.has(i))n.set(i,{key:d,itemsById:new Map});else{let f=n.get(i);if(f&&f.key!==d){let h=r.get(f.key);h&&(h.delete(i),h.size===0&&r.delete(f.key)),n.set(i,{key:d,itemsById:new Map})}}r.has(d)||r.set(d,new Set);let p=r.get(d);p&&p.add(i);try{await e("subscribe-list",{id:i,type:u.type,params:u.params})}catch(f){let h=n.get(i)||null;if(h){let w=r.get(h.key);w&&(w.delete(i),w.size===0&&r.delete(h.key))}throw n.delete(i),f}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let f=n.get(i)||null;if(f){let h=r.get(f.key);h&&(h.delete(i),h.size===0&&r.delete(f.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Qs,selectors:{getIds(i){let u=n.get(i);return u?Array.from(u.itemsById.keys()):[]},has(i,u){let d=n.get(i);return d?d.itemsById.has(u):!1},count(i){let u=n.get(i);return u?u.itemsById.size:0},getItemsById(i){let u=n.get(i),d={};if(!u)return d;for(let p of u.itemsById.keys())d[p]=!0;return d}}}}function tc(){let e=Ct("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let u of Array.from(r))try{u()}catch{}}function a(u,d,p){let f=d?Qs(d):"",h=n.get(u)||"",w=t.has(u);if(e("register %s key=%s (prev=%s)",u,f,h),w&&h&&f&&h!==f){let x=t.get(u);if(x)try{x.dispose()}catch{}let N=s.get(u);if(N){try{N()}catch{}s.delete(u)}let j=Ea(u,p);t.set(u,j);let Y=j.subscribe(()=>o());s.set(u,Y)}else if(!w){let x=Ea(u,p);t.set(u,x);let N=x.subscribe(()=>o());s.set(u,N)}return n.set(u,f),()=>i(u)}function i(u){e("unregister %s",u),n.delete(u);let d=t.get(u);d&&(d.dispose(),t.delete(u));let p=s.get(u);if(p){try{p()}catch{}s.delete(u)}}return{register:a,unregister:i,getStore(u){return t.get(u)||null},snapshotFor(u){let d=t.get(u);return d?d.snapshot().slice():[]},subscribe(u){return r.add(u),()=>r.delete(u)}}}function nc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function rc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function sc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ta(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function If(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Pf(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function oc(e){let t=Ct("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):If(r),a=Pf(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let u=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==u&&(window.location.hash=u)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ta(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ta(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var Mf=Object.freeze({workspace_config:{default_workspace:null}});function ac(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Mf.workspace_config.default_workspace}}}function ic(e={}){let t=Ct("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:ac(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?ac(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==n.workspace.hidden[p]),u=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===n.worker.show_closed_children[p])&&!i&&!u||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function lc(e){let t=Ct("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let d=n>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let d=n;n=Math.max(0,n-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,n),o()}function u(d){return async(f,h)=>{let w=s++,x=Date.now();r.set(w,{type:f,start_ts:x}),t("request start id=%d type=%s count=%d",w,f,n+1),a();let N=!1,j=()=>{N||(N=!0,r.delete(w),i())},Y=setTimeout(()=>{N||(t("request TIMEOUT id=%d type=%s elapsed=%dms",w,f,Date.now()-x),j())},3e4);try{let J=await d(f,h),L=Date.now()-x;return t("request done id=%d type=%s elapsed=%dms",w,f,L),J}catch(J){let L=Date.now()-x;throw t("request error id=%d type=%s elapsed=%dms err=%o",w,f,L,J),J}finally{clearTimeout(Y),j()}}}return o(),{wrapSend:u,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let d=Date.now();return Array.from(r.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:d-f.start_ts}))}}}function de(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Xs(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let u=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return u.sort(Xl),u;switch(i){case"created_desc":return u.sort(cr),u;case"created_asc":return u.sort(Yl),u;case"updated_desc":return u.sort(Zl),u;case"priority":return u.sort(Ql),u;case"manual":default:{let d=n();return d?u.sort(Zs(d)):u.sort(cr),u}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function xn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Ht(e){let t=xn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function on(e,t){let n=xn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let u=Math.floor(i/7);if(i<30)return`${u}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function cc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=xn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Js(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function eo(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=Js(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function to(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=cc(n);return{total:n.length,count:r,current:s,children:n}}function no(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let u={...a.order};for(let d of i)u[d.bead_id]=d.rank;n&&n.set({revision:a.revision,order:u})}async function o(a,i,u){if(!t||!n)return;let d=n.get()||{revision:0,order:{}},p=r(Sa(i,u,d.order),a);s(d,p);let f=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(f&&f.conflict){let h={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(h);let w=r(Sa(i,u,h.order),a);s(h,w);let x=await t("ui-order-set",{expected_revision:h.revision,entries:w});x&&x.applied&&n.set({revision:typeof x.revision=="number"?x.revision:0,order:x.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function ro(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ca(e,t){return!t||typeof e!="string"||e.length===0||ro(t.visible_labels).includes(e)?!0:ro(t.hidden_labels).includes(e)?!1:!ro(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function uc(e,t){return ro(e).filter(n=>Ca(n,t))}function zn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function Df(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Nf(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function qf(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${Df(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function so(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(Jl):a;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?Nf(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${i.map((u,d)=>qf(u,d+1,t.childChips?t.childChips(u):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Ff={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},pc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},dc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},jf={review:"\u2713",skip:"\u2298"},Hn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Bf(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function fc(e){let t=e&&e.fill||"none";return t==="none"?Hn.none:e&&e.stale===!0?Hn.stale:t==="dim"?Hn.dim:e&&e.glyph==="review"?Hn.review:e&&e.glyph==="skip"?Hn.skip:Hn.done}function Uf(e){if(!e||e.fill==="none"||!e.approval_state)return fc(e);let t=[];return e.glyph==="review"?t.push(Hn.review):e.glyph==="skip"&&t.push(Hn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Wf(e,t,n,r){let s=Ff[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=jf[t&&t.glyph||""]||"",u="bar";o==="dim"?u+=` b-${s} dim`:o==="full"&&(u+=` b-${s} full`),a&&(u+=" stale"),n&&(u+=" cur");let d=o==="none"?"lbl":`lbl l-${s} on`,p=n?`color: var(--stage-${s}-on)`:"",f=pc[e]||e,h=r?_c(t):null;if(!h)return c`
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
  `}function _c(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function oo(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=dc[e.route]||dc.spec_backed,o=e.stages,a=Bf(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(d=>`${pc[d]||d} ${d==="plan"?Uf(o[d]||{}):fc(o[d]||{})}`).join(" \xB7 ")}`,u=!!r&&s.some(d=>_c(o[d]||{})!==null);return c`
    <div
      class="stp"
      role=${u?"group":"img"}
      aria-label=${i}
    >
      ${s.map(d=>Wf(d,o[d]||{},d===a,r))}
    </div>
  `}function zf(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var mc=2;function Hf(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,mc).join(", "),s=n.length-mc,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Ra(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function ao(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Cn(e){return`${e.kind}:${ao(e)}@${e.sha}`}function io(e,t){if(!e)return null;let n=Ra(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=Ra(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,u=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,d=t?` \xB7 exec_receipt ${Cn(t)}`:"";return{kind:e.kind,label:i,title:`${u}${d}`}}function gc(e,t){let n=io(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Gf(e){if(!e)return null;let t=Ra(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Cn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Vf(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&zn(n,"route")){let i=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&zn(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&zn(n,"pr")){let i=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=gc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Cn(i)}`}
        >${`exec ${i.kind==="delegated"?ao(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of uc(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&zn(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),zn(n,"blocked")&&s.push(...Hf(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&zn(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function Kf(e){let t=on(e.created_at),n=on(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
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
  </span>`}function Yf(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return so(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Kf(e),empty_label:"children \uC5C6\uC74C",childChips:Oa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function Oa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return io(t,n)?c`<span class="board-card__roll-child-chips">
    ${gc(t,n)}
    ${Gf(n)}
  </span>`:null}function lo(e,t){let n=zf(e.priority);return c`
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
      ${Vf(e,t)}
      ${e.workflow&&zn(t.policy||null,"stepper")?oo(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Yf(e,t)}
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
              ${Wn.map(o=>c`<option
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
  `}function hc(e,t,n){return c`
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
  `}var Zf=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Qf=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Xf=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Jf(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function bc(e,t,n){return c`
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
        ${Zf.map(r=>c`<option
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
        ${Qf.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Jf(e,t,n)}
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
        ${Xf.map(r=>c`<option
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
  `}var e_=200,t_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},n_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),yc="beads-ui.board.sort",vc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function r_(){try{let e=window.localStorage.getItem(yc);if(e&&vc.has(e))return e}catch{}return"created_desc"}function wc(e,t){let n=Ct("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,u=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,f=t.openDoc,h=t.closedRange||sn,w=s?Xs(s,a):null,x=no({transport:o,uiOrderStore:a}),N=[],j=[],Y=[],J=[],L=[],I=[],D=!1,z=0,A=r_(),U=new Map,F=new Map,ke=new Map,ve=new Set,ie={search:"",priority:"",type:"",labels:[]},G=!1,xe=null;function Oe(Z){return String(Z.status||"open")==="open"}function re(Z){let le=String(Z.status||"open");return le==="open"||le==="blocked"}function se(Z){let le=ie.search.trim().toLowerCase(),Ne=ie.priority,E=ie.type,b=ie.labels;return Z.filter(S=>{if(le){let H=String(S.id||"").toLowerCase(),ae=String(S.title||"").toLowerCase();if(!H.includes(le)&&!ae.includes(le))return!1}if(Ne!==""&&String(S.priority)!==Ne||E!==""&&String(S.issue_type||"")!==E)return!1;if(b.length>0){let H=Array.isArray(S.labels)?S.labels:[];if(!b.some(ae=>H.includes(ae)))return!1}return!0})}function Ae(){let Z=new Set;for(let le of[N,j,Y,J,L,I])for(let Ne of le){let E=Array.isArray(Ne.labels)?Ne.labels:[];for(let b of E)typeof b=="string"&&b.length>0&&Z.add(b)}return Array.from(Z).sort()}function B(){return ie.search.trim()!==""||ie.priority!==""||ie.type!==""||ie.labels.length>0}function ee(){try{if(w){let Z=w.selectBoardColumn("tab:board:in-progress","in_progress",A),le=w.selectBoardColumn("tab:board:blocked","blocked",A).filter(re),Ne=new Set(Z.map(Se=>Se.id)),E=w.selectBoardColumn("tab:board:ready","ready",A).filter(Se=>Oe(Se)&&!Ne.has(Se.id)),b=w.selectBoardColumn("tab:board:resolved","resolved",A),S=w.selectBoardColumn("tab:board:deferred","deferred",A),H=w.selectBoardColumn("tab:board:closed","closed").slice(0,e_),ae=[...le,...E,...Z,...b,...H];fe(ae);let oe=new Set;for(let Se of ae)Se&&Se.id&&!Js(Se)&&oe.add(Se.id);let ye=!B();N=ye?ts(le,oe):le,j=ye?ts(E,oe):E,Y=ye?ts(Z,oe):Z,J=ye?ts(b,oe):b,L=S,z=S.length,I=ye?ts(H,oe):H,U=new Map;for(let Se of N)U.set(Se.id,"open");for(let Se of j)U.set(Se.id,"open");for(let Se of Y)U.set(Se.id,"in_progress");for(let Se of J)U.set(Se.id,"resolved");for(let Se of L)U.set(Se.id,"deferred");for(let Se of I)U.set(Se.id,"closed");F=new Map;for(let Se of N)F.set(Se.id,"blocked-col");for(let Se of j)F.set(Se.id,"ready-col");for(let Se of Y)F.set(Se.id,"in-progress-col");for(let Se of J)F.set(Se.id,"resolved-col");for(let Se of I)F.set(Se.id,"closed-col")}ct()}catch{N=[],j=[],Y=[],J=[],L=[],I=[],ke=new Map,ct()}}function fe(Z){ke=eo(Z)}function $e(Z){return to(ke,Z)}function we(Z){return!ve.has(Z)}function Ue(Z,le){Z.preventDefault(),Z.stopPropagation(),ve.has(le)?ve.delete(le):ve.add(le),ct()}function me(Z,le){Z.preventDefault(),Z.stopPropagation(),r(le)}function Ze(Z,le){Z.preventDefault(),Z.stopPropagation(),r(le)}function gt(Z,le){xe||r(le)}function R(Z,le){Z.preventDefault(),Z.stopPropagation(),s_(le).then(Ne=>{Ne&&de("\uBCF5\uC0AC\uB428","success",1200)})}function ue(Z,le){xe=le,Z.dataTransfer&&(Z.dataTransfer.setData("text/plain",le),Z.dataTransfer.effectAllowed="move"),Z.target.classList.add("board-card--dragging")}function Ce(Z){Z.target.classList.remove("board-card--dragging"),wt(),setTimeout(()=>{xe=null},0)}function Re(Z){let le=String(Z.target.value||"");!le||le===h||(h=le,d&&d(le),ct())}function je(){return i?i.get():null}function qe(Z){let le=u?u.get():null,Ne=le?le.cleanup_failed:null;if(!Ne||typeof Ne!="object"||Array.isArray(Ne))return null;let E=Ne[Z];return!E||typeof E!="object"||Array.isArray(E)?null:E}let W={onCardClick:gt,onCopyId:R,onDragStart:ue,onDragEnd:Ce,onClosedRangeChange:Re,rollupFor:$e,isExpanded:we,onRollupToggle:Ue,onChildClick:me,onFromChipClick:Ze,onOpenDoc:f?(Z,le)=>f(le):void 0,cleanupFailureFor:qe,get policy(){return je()}};function V(Z,le){xe||(De(),r(le))}function Me(Z,le){Z.preventDefault(),Z.stopPropagation(),De(),r(le)}let Ke={...W,onCardClick:V,onChildClick:Me,onFromChipClick:Me,onOpenDoc:f?(Z,le)=>{De(),f(le)}:void 0,get policy(){return je()}};function Ge(Z){let le=Z.target,Ne=e.querySelector(".board-filter__labels");le&&Ne&&Ne.contains(le)||X()}function be(Z){Z.key==="Escape"&&X()}function P(){G||(G=!0,document.addEventListener("mousedown",Ge),document.addEventListener("keydown",be),ct())}function X(){G&&(G=!1,document.removeEventListener("mousedown",Ge),document.removeEventListener("keydown",be),ct())}function te(Z){Z.key==="Escape"&&De()}function K(){D||(D=!0,document.addEventListener("keydown",te),ct())}function De(){D&&(D=!1,document.removeEventListener("keydown",te),ct())}let Qe={onClose:De,onOverlayClick(Z){Z.target===Z.currentTarget&&De()}},lt={onSearchInput(Z){ie.search=String(Z.target.value||""),ee()},onPriorityChange(Z){ie.priority=String(Z.target.value||""),ee()},onTypeChange(Z){ie.type=String(Z.target.value||""),ee()},onSortChange(Z){let le=String(Z.target.value||"");if(!(!vc.has(le)||le===A)){A=le;try{window.localStorage.setItem(yc,le)}catch{}ee()}},onDeferredToggle(){D?De():K()},onLabelMenuToggle(){G?X():P()},onLabelToggle(Z){let le=ie.labels.indexOf(Z);le===-1?ie.labels.push(Z):ie.labels.splice(le,1),ee()},onLabelClear(){ie.labels.length!==0&&(ie.labels=[],ee())},onNewIssue(){p&&p()}};function ot(){return c`
      <div class="board-view">
        ${bc(ie,lt,{sort_mode:A,deferred_popup_open:D,deferred_count:z,label_options:Ae(),label_menu_open:G})}
        <div class="board-root">
          ${Cr({title:"Blocked",id:"blocked-col",items:se(N)},W)}
          ${Cr({title:"Ready",id:"ready-col",items:se(j)},W)}
          ${Cr({title:"In progress",id:"in-progress-col",items:se(Y)},W)}
          ${Cr({title:"Resolved",id:"resolved-col",items:se(J)},W)}
          ${Cr({title:"Closed",id:"closed-col",items:se(I),is_closed:!0,closed_range:h},W)}
        </div>
        ${D?hc({items:se(L),count:z},Ke,Qe):""}
      </div>
    `}function ct(){Ve(ot(),e),ht()}function ht(){try{let Z=e.querySelector("#deferred-popup");Z&&!Z.open&&(typeof Z.showModal=="function"?Z.showModal():Z.setAttribute("open",""));let le=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ne of le)Array.from(Ne.querySelectorAll(".board-card")).forEach((b,S)=>{b.tabIndex=S===0?0:-1})}catch{}}async function bt(Z,le){if(!o){de("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:Z,status:le}),de("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ne){n("update-status failed: %o",Ne),de("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function tt(Z){switch(Z){case"blocked-col":return N;case"ready-col":return j;case"in-progress-col":return Y;case"resolved-col":return J;default:return[]}}function Tt(Z,le,Ne){if(!o||!a)return;let E=tt(Z),b=E.find(ye=>ye.id===le);if(!b)return;let S=E.filter(ye=>ye.id!==le),H=Ne.closest?Ne.closest(".board-card"):null,ae=S.length;if(H){let ye=H.getAttribute("data-issue-id");if(ye===le)return;let Se=S.findIndex(Je=>Je.id===ye);Se>=0&&(ae=Se)}let oe=S.slice();oe.splice(ae,0,b),x.applyReorder(le,oe,ae)}function wt(){for(let Z of Array.from(e.querySelectorAll(".board-column--drag-over")))Z.classList.remove("board-column--drag-over")}let He=null;e.addEventListener("dragover",Z=>{Z.preventDefault(),Z.dataTransfer&&(Z.dataTransfer.dropEffect="move");let Ne=Z.target.closest(".board-column");Ne&&Ne!==He&&(He&&He.classList.remove("board-column--drag-over"),Ne.classList.add("board-column--drag-over"),He=Ne)}),e.addEventListener("dragleave",Z=>{let le=Z.relatedTarget;(!le||!e.contains(le))&&He&&(He.classList.remove("board-column--drag-over"),He=null)}),e.addEventListener("drop",Z=>{Z.preventDefault(),He&&(He.classList.remove("board-column--drag-over"),He=null);let le=Z.target,Ne=le.closest(".board-column");if(!Ne)return;let E=Z.dataTransfer?.getData("text/plain")||"";if(!E)return;let b=Ne.id,S=F.get(E);if(S&&S===b){if(n_.has(b)){if(A!=="manual"){de("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Tt(b,E,le)}return}let H=t_[b];if(!H){de("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}U.get(E)!==H&&bt(E,H)}),e.addEventListener("keydown",Z=>{let le=Z.target;if(!(le instanceof HTMLElement))return;let Ne=String(le.tagName||"").toLowerCase();if(Ne==="input"||Ne==="textarea"||Ne==="select"||Ne==="button"||Ne==="a"||le.isContentEditable===!0)return;let E=le.closest(".board-card");if(!E)return;let b=String(Z.key||"");if(b==="Enter"||b===" "){Z.preventDefault();let oe=E.getAttribute("data-issue-id");oe&&r(oe);return}if(b!=="ArrowUp"&&b!=="ArrowDown"&&b!=="ArrowLeft"&&b!=="ArrowRight")return;Z.preventDefault();let S=E.closest(".board-column");if(!S)return;let H=Array.from(S.querySelectorAll(".board-card")),ae=H.indexOf(E);if(b==="ArrowDown"&&ae<H.length-1){he(E,H[ae+1]);return}if(b==="ArrowUp"&&ae>0){he(E,H[ae-1]);return}if(b==="ArrowLeft"||b==="ArrowRight"){let oe=Array.from(e.querySelectorAll(".board-column")),ye=oe.indexOf(S),Se=b==="ArrowRight"?1:-1,Je=ye+Se;for(;Je>=0&&Je<oe.length;){let rt=oe[Je].querySelector(".board-card");if(rt){he(E,rt);return}Je+=Se}}});function he(Z,le){try{Z.tabIndex=-1,le.tabIndex=0,le.focus()}catch{}}let mt=null;w&&w.subscribe&&(mt=w.subscribe(()=>{try{ee()}catch{}}));let $t=null;i&&i.subscribe&&($t=i.subscribe(()=>{try{ee()}catch{}}));let nt=null;return u&&u.subscribe&&(nt=u.subscribe(()=>{ct()})),{async load(){n("load"),ee()},clear(){X(),De(),mt&&(mt(),mt=null),$t&&($t(),$t=null),nt&&(nt(),nt=null),e.replaceChildren(),N=[],j=[],Y=[],J=[],L=[],I=[],U=new Map,F=new Map}}}function ts(e,t){return e.filter(n=>{let r=Js(n);return!(r&&t.has(r))})}async function s_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function an(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function ur(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ns(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function o_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${ur(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ur(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(u=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),u(p)};r.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Rn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await o_(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var a_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],kc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},i_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Nt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ot(e){return typeof e=="string"&&e.length>0?e:null}function Rr(e){return e.startsWith("gpt-")?e.slice(4):e}function St(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function xc(e,t,n){let r=Ot(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Ot(n[e]);return s===null?null:{value:s,source:"global"}}function rs(e,t,n,r){return xc(e,t,n)||{value:r,source:"base"}}function La(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&Nt(s?.[t])){let a=Ot(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Nt(s)){for(let a of Object.values(s))if(Nt(a)){let i=Ot(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Ot(r?.runners?.[o]?.models?.[e]?.id)||e}function l_(e,t){return Ot(t?.review?.reviewers?.[e]?.model)||e}function Or(e,t,n=!1){if(e==="default")return St(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Rr(e):e;return St(e,t,r,e,"explicit")}function Ac(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];Nt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(Nt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function c_(e,t){let n=[],r=e?.implementation?.model_catalog;Nt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(Nt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function u_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of c_(t,n)){let o=Ac(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function Ia(e){return St(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function $c(e,t,n){let r=xc(e,t,n);return r?Or(r.value,r.source):St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Xt(e){let t=Nt(e.pin)?e.pin:{},n=Nt(e.global)?e.global:{},r=Nt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&Nt(r.session)?r.session:null,o=r?.supported===!0&&Nt(r.orchestration)?r.orchestration:null,a=Nt(e.runner_catalog)?e.runner_catalog:null,i=Ot(n.quick_fix_impl_model),u=u_(i,s,a),d={};if(s){let p=rs("workflow_mode",t,n,Ot(s.workflow_mode_default));d.workflow_mode=p.source==="base"?St(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):Or(p.value,p.source);for(let L of["spec_review","plan_review","impl_review"]){let I=`${L}_model`,D=Ot(L==="plan_review"?p.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),z=rs(I,t,n,D);if(z.value===null)d[I]=St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(z.value!=="self"&&z.value!=="skip"&&!Nt(s.review?.reviewers?.[z.value]))d[I]=Ia(St(z.value,z.source,"",null,"explicit"));else{let A=l_(z.value,s);d[I]=St(z.value,z.source,Rr(A),A,z.source==="base"?"default":"explicit")}}for(let[L,I]of Object.entries(kc)){let D=d[I].value;if(D==="self"||D==="skip"){d[L]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let z=Ot(s.review?.reviewers?.[D||""]?.effort),A=rs(L,t,n,z);d[L]=A.value===null?St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):St(A.value,A.source,A.value,A.value,A.source==="base"?"default":"explicit")}let f=Nt(s.implementation?.default)?s.implementation.default:{},h=Ot(e.route),w=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),x=Nt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},N=w&&Nt(x[h])?x[h]:{};for(let L of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let I=rs(L,t,n,L==="impl_dispatch"?Ot(N.dispatch)||Ot(f.dispatch):Ot(f[L.replace("impl_","")]));d[L]=I.value===null?St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):St(I.value,I.source,I.value,I.value,I.source==="base"?"default":"explicit")}let j=Ot(t.impl_runtime),Y=j==="inherit"?Ot(e.controller_runtime):j,J=h==="quick_fix"&&Ot(t.impl_dispatch)===null&&u.runtime!==null&&(j===null||Y===u.runtime);if(J){let L=u.runtime,I=i;d.impl_dispatch=St("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),j===null&&(d.impl_runtime=St(L,"global",`${L} (\uC720\uB3C4)`,L,"explicit")),Ot(t.impl_model)===null&&(d.impl_model=St(I,"global",I,I,"explicit"))}if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let L of["impl_runtime","impl_model","impl_effort","impl_speed"])d[L]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(d.impl_dispatch.value==="delegated"&&!J&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_model.value!==null){let L=d.impl_runtime.value==="inherit"?Ot(e.controller_runtime):d.impl_runtime.value,I=L?Ac(L,s,a):[];if(d.impl_model.value!=="auto"&&I.length>0&&!I.includes(d.impl_model.value))d.impl_model=Ia(d.impl_model);else{let D=La(d.impl_model.value,L,s,a);d.impl_model.display=Rr(D),d.impl_model.full_value=D}}if(d.impl_effort.value==="auto"){let L=Ot(e.transport)||(d.impl_runtime.value==="codex"?"codex-native-spawn":d.impl_runtime.value==="claude"?"implement-claude":null),I=L?Ot(s.implementation?.effort_by_transport?.[L]?.auto):null;I&&!i_.has(I)?(d.impl_effort.display=`${I} (\uBE44\uD638\uD658)`,d.impl_effort.full_value=I,d.impl_effort.resolution="incompatible"):(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}d.impl_speed.value==="default"&&(d.impl_speed=d.impl_speed.source==="base"?St("default","base","default (\uC77C\uBC18)","default","default"):Or("default",d.impl_speed.source))}}else for(let p of a_.filter(f=>!f.startsWith("orchestration_")))d[p]=$c(p,t,n);if(!s){for(let[p,f]of Object.entries(kc))(d[f].value==="self"||d[f].value==="skip")&&(d[p]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])d[p]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else d.impl_dispatch.value==="delegated"&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_effort.value==="auto"&&(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){d[p]=$c(p,t,n);continue}let f=p.replace("orchestration_",""),h=Ot(o[f]),w=rs(p,t,n,h);if(p==="orchestration_effort"&&w.source==="base"){d[p]=St(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(w.value===null){d[p]=St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let x=w.source==="base"?Ot(o.model_id)||w.value:La(w.value,null,s,a);d[p]=St(w.value,w.source,Rr(x),x,w.source==="base"?"default":"explicit");continue}if(w.value==="default"){d[p]=w.source==="base"?St("default","base","default (\uC77C\uBC18)","default","default"):Or("default",w.source);continue}d[p]=Or(w.value,w.source)}if(s)if(i===null){let p=d.orchestration_model.full_value;d.quick_fix_impl_model=St(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Rr(p)})`,null,"default")}else if(u.runtime!==null){let p=La(i,u.runtime,s,a);d.quick_fix_impl_model=St(i,"global",Rr(p),p,"explicit")}else u.offered?d.quick_fix_impl_model=Ia(St(i,"global","",null,"explicit")):d.quick_fix_impl_model=Or(i,"global");return d}function d_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function co(e){let t=Nt(e.pin)?e.pin:{},n=Nt(e.global)?e.global:{},r=Nt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=f=>{let h={...r,...f};return Xt({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],u=s(o)[e.key],d=Ot(o[e.key]),p=[...e.choices];return d!==null&&!p.includes(d)&&p.unshift(d),{unset_label:d_(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:u?.resolution==="not_applicable",options:p.map(f=>{let h=s({...o,[e.key]:f})[e.key];return{value:f,label:h.display,full_value:h.full_value}})}}function Lr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let u=!1,d=f=>{u||(u=!0,typeof t.close=="function"&&t.close(),t.remove(),i(f))},p=()=>d(r.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>d(null)),r.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),p())}),t.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}var Rc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var On=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],ss=[...On,"reasoning_output_tokens"],p_={codex:["implementation","review-consult"],claude:["subagent"]};function Pa(e){let t=0;for(let n of On)t+=Ft(e?.[n]);return t}function f_(e){return!e||typeof e!="object"?!1:On.some(t=>Number.isFinite(e[t]))}function Sc(e){return!e||typeof e!="object"?!1:ss.some(t=>Number.isFinite(e[t]))}function __(e){let t={};for(let n of ss)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Ec(e){let t={};for(let n of ss)Number.isFinite(e[n])&&(t[n]=e[n]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Tc(e,t){return e==="codex"?Ft(t.input_tokens)+Ft(t.output_tokens):Pa(t)}function m_(e){return e==="claude"?"Claude":"Codex"}function g_(e){return`\u03C4 ${Oc(e)}`}function h_(e,t){let n=t.breakdown||{},r=[`\uC785\uB825 ${Ft(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&r.push(`\uCD94\uB860\uCD9C\uB825 ${Ft(n.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,r.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Rc),o.join(`
`)}function Wt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${m_(n)} ${g_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:h_(n,r)})}return t}function po(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let u of ss)Number.isFinite(a.breakdown[u])&&(i.breakdown[u]=Ft(i.breakdown[u])+Ft(a.breakdown[u]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ma(e){return!e||typeof e!="object"?null:pn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function b_(e){return e==="codex"?"codex":"claude"}function An(){return{subtotal:0,breakdown:__(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function uo(e,t,n){e.subtotal+=t.subtotal;for(let r of ss)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Ft(e.breakdown[r])+Ft(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Cc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Oc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Ir(e){return f_(e)?`\u03C4 ${Oc(Pa(e))}`:null}function Ln(e){let t=Ir(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function os(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Pa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Rc),n.join(`
`)}function pn(e,t){let n={claude:An(),codex:An()},r={orchestrator:{claude:An(),codex:An()},implementation:{claude:An(),codex:An()},"review-consult":{claude:An(),codex:An()},subagent:{claude:An(),codex:An()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let u=i.usage;if(Sc(u)){let p=b_(i.runner),f=Ec(u),h={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:f,subtotal:Tc(p,f)};f.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),uo(n[p],h,!0),uo(r.orchestrator[p],h,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of d){let f=p&&p.provider==="claude"?"claude":"codex";if(!p||p.provider!=="codex"&&p.provider!=="claude"||!p_[f].includes(p.role)||!Sc(p.usage))continue;let h=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!h||s.has(h))continue;s.add(h);let w=Ec(p.usage),x={provider:f,role:p.role,attempt_id:String(i.attempt_id||""),usage:w,subtotal:Tc(f,w)};x.receipt_id=h,typeof p.agent_type=="string"&&(x.agent_type=p.agent_type),typeof p.agent_id=="string"&&(x.agent_id=p.agent_id),typeof p.model=="string"&&(x.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(x.effort=p.effort),typeof p.session_id=="string"?x.session_id=p.session_id:typeof p.thread_id=="string"&&(x.session_id=p.thread_id),typeof p.turn_id=="string"&&(x.turn_id=p.turn_id),(typeof p.completed_at=="string"||typeof p.completed_at=="number"&&Number.isFinite(p.completed_at))&&(x.completed_at=p.completed_at),w.replayed===!0&&(x.replayed=!0),uo(n[f],x,!1),uo(r[x.role][f],x,!1)}}let o={};for(let i of["claude","codex"]){let u=n[i];if(u.legs.length===0)continue;let d=Cc(u,!1);i==="claude"&&u.outer_count>0&&u.outer_cost_count===u.outer_count&&(d.total_cost_usd=u.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let u={};for(let d of["claude","codex"]){let p=r[i][d];p.legs.length>0&&(u[d]={...Cc(p,!0),legs:p.legs})}Object.keys(u).length>0&&(a[i]=u)}return{providers:o,roles:a}}var{entries:jc,setPrototypeOf:Lc,isFrozen:y_,getPrototypeOf:v_,getOwnPropertyDescriptor:w_}=Object,{freeze:Vt,seal:fn,create:Ua}=Object,{apply:Wa,construct:za}=typeof Reflect<"u"&&Reflect;Vt||(Vt=function(t){return t});fn||(fn=function(t){return t});Wa||(Wa=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});za||(za=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var fo=Kt(Array.prototype.forEach),k_=Kt(Array.prototype.lastIndexOf),Ic=Kt(Array.prototype.pop),as=Kt(Array.prototype.push),$_=Kt(Array.prototype.splice),mo=Kt(String.prototype.toLowerCase),Da=Kt(String.prototype.toString),Na=Kt(String.prototype.match),is=Kt(String.prototype.replace),x_=Kt(String.prototype.indexOf),A_=Kt(String.prototype.trim),bn=Kt(Object.prototype.hasOwnProperty),Gt=Kt(RegExp.prototype.test),ls=S_(TypeError);function Kt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Wa(e,t,r)}}function S_(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return za(e,n)}}function st(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:mo;Lc&&Lc(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(y_(t)||(t[r]=o),s=o)}e[s]=!0}return e}function E_(e){for(let t=0;t<e.length;t++)bn(e,t)||(e[t]=null);return e}function In(e){let t=Ua(null);for(let[n,r]of jc(e))bn(e,n)&&(Array.isArray(r)?t[n]=E_(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=In(r):t[n]=r);return t}function cs(e,t){for(;e!==null;){let r=w_(e,t);if(r){if(r.get)return Kt(r.get);if(typeof r.value=="function")return Kt(r.value)}e=v_(e)}function n(){return null}return n}var Pc=Vt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),qa=Vt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Fa=Vt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),T_=Vt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ja=Vt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),C_=Vt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Mc=Vt(["#text"]),Dc=Vt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ba=Vt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Nc=Vt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),_o=Vt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),R_=fn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),O_=fn(/<%[\w\W]*|[\w\W]*%>/gm),L_=fn(/\$\{[\w\W]*/gm),I_=fn(/^data-[\-\w.\u00B7-\uFFFF]+$/),P_=fn(/^aria-[\-\w]+$/),Bc=fn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),M_=fn(/^(?:\w+script|data):/i),D_=fn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Uc=fn(/^html$/i),N_=fn(/^[a-z][.\w]*(-[.\w]+)+$/i),qc=Object.freeze({__proto__:null,ARIA_ATTR:P_,ATTR_WHITESPACE:D_,CUSTOM_ELEMENT:N_,DATA_ATTR:I_,DOCTYPE_NAME:Uc,ERB_EXPR:O_,IS_ALLOWED_URI:Bc,IS_SCRIPT_OR_DATA:M_,MUSTACHE_EXPR:R_,TMPLIT_EXPR:L_}),us={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},q_=function(){return typeof window>"u"?null:window},F_=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Fc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Wc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:q_(),t=Pe=>Wc(Pe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==us.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:u,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:h,trustedTypes:w}=e,x=u.prototype,N=cs(x,"cloneNode"),j=cs(x,"remove"),Y=cs(x,"nextSibling"),J=cs(x,"childNodes"),L=cs(x,"parentNode");if(typeof a=="function"){let Pe=n.createElement("template");Pe.content&&Pe.content.ownerDocument&&(n=Pe.content.ownerDocument)}let I,D="",{implementation:z,createNodeIterator:A,createDocumentFragment:U,getElementsByTagName:F}=n,{importNode:ke}=r,ve=Fc();t.isSupported=typeof jc=="function"&&typeof L=="function"&&z&&z.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ie,ERB_EXPR:G,TMPLIT_EXPR:xe,DATA_ATTR:Oe,ARIA_ATTR:re,IS_SCRIPT_OR_DATA:se,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:B}=qc,{IS_ALLOWED_URI:ee}=qc,fe=null,$e=st({},[...Pc,...qa,...Fa,...ja,...Mc]),we=null,Ue=st({},[...Dc,...Ba,...Nc,..._o]),me=Object.seal(Ua(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ze=null,gt=null,R=Object.seal(Ua(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ue=!0,Ce=!0,Re=!1,je=!0,qe=!1,W=!0,V=!1,Me=!1,Ke=!1,Ge=!1,be=!1,P=!1,X=!0,te=!1,K="user-content-",De=!0,Qe=!1,lt={},ot=null,ct=st({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ht=null,bt=st({},["audio","video","img","source","image","track"]),tt=null,Tt=st({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),wt="http://www.w3.org/1998/Math/MathML",He="http://www.w3.org/2000/svg",he="http://www.w3.org/1999/xhtml",mt=he,$t=!1,nt=null,Z=st({},[wt,He,he],Da),le=st({},["mi","mo","mn","ms","mtext"]),Ne=st({},["annotation-xml"]),E=st({},["title","style","font","a","script"]),b=null,S=["application/xhtml+xml","text/html"],H="text/html",ae=null,oe=null,ye=n.createElement("form"),Se=function(C){return C instanceof RegExp||C instanceof Function},Je=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(oe&&oe===C)){if((!C||typeof C!="object")&&(C={}),C=In(C),b=S.indexOf(C.PARSER_MEDIA_TYPE)===-1?H:C.PARSER_MEDIA_TYPE,ae=b==="application/xhtml+xml"?Da:mo,fe=bn(C,"ALLOWED_TAGS")?st({},C.ALLOWED_TAGS,ae):$e,we=bn(C,"ALLOWED_ATTR")?st({},C.ALLOWED_ATTR,ae):Ue,nt=bn(C,"ALLOWED_NAMESPACES")?st({},C.ALLOWED_NAMESPACES,Da):Z,tt=bn(C,"ADD_URI_SAFE_ATTR")?st(In(Tt),C.ADD_URI_SAFE_ATTR,ae):Tt,ht=bn(C,"ADD_DATA_URI_TAGS")?st(In(bt),C.ADD_DATA_URI_TAGS,ae):bt,ot=bn(C,"FORBID_CONTENTS")?st({},C.FORBID_CONTENTS,ae):ct,Ze=bn(C,"FORBID_TAGS")?st({},C.FORBID_TAGS,ae):In({}),gt=bn(C,"FORBID_ATTR")?st({},C.FORBID_ATTR,ae):In({}),lt=bn(C,"USE_PROFILES")?C.USE_PROFILES:!1,ue=C.ALLOW_ARIA_ATTR!==!1,Ce=C.ALLOW_DATA_ATTR!==!1,Re=C.ALLOW_UNKNOWN_PROTOCOLS||!1,je=C.ALLOW_SELF_CLOSE_IN_ATTR!==!1,qe=C.SAFE_FOR_TEMPLATES||!1,W=C.SAFE_FOR_XML!==!1,V=C.WHOLE_DOCUMENT||!1,Ge=C.RETURN_DOM||!1,be=C.RETURN_DOM_FRAGMENT||!1,P=C.RETURN_TRUSTED_TYPE||!1,Ke=C.FORCE_BODY||!1,X=C.SANITIZE_DOM!==!1,te=C.SANITIZE_NAMED_PROPS||!1,De=C.KEEP_CONTENT!==!1,Qe=C.IN_PLACE||!1,ee=C.ALLOWED_URI_REGEXP||Bc,mt=C.NAMESPACE||he,le=C.MATHML_TEXT_INTEGRATION_POINTS||le,Ne=C.HTML_INTEGRATION_POINTS||Ne,me=C.CUSTOM_ELEMENT_HANDLING||{},C.CUSTOM_ELEMENT_HANDLING&&Se(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(me.tagNameCheck=C.CUSTOM_ELEMENT_HANDLING.tagNameCheck),C.CUSTOM_ELEMENT_HANDLING&&Se(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(me.attributeNameCheck=C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),C.CUSTOM_ELEMENT_HANDLING&&typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(me.allowCustomizedBuiltInElements=C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),qe&&(Ce=!1),be&&(Ge=!0),lt&&(fe=st({},Mc),we=[],lt.html===!0&&(st(fe,Pc),st(we,Dc)),lt.svg===!0&&(st(fe,qa),st(we,Ba),st(we,_o)),lt.svgFilters===!0&&(st(fe,Fa),st(we,Ba),st(we,_o)),lt.mathMl===!0&&(st(fe,ja),st(we,Nc),st(we,_o))),C.ADD_TAGS&&(typeof C.ADD_TAGS=="function"?R.tagCheck=C.ADD_TAGS:(fe===$e&&(fe=In(fe)),st(fe,C.ADD_TAGS,ae))),C.ADD_ATTR&&(typeof C.ADD_ATTR=="function"?R.attributeCheck=C.ADD_ATTR:(we===Ue&&(we=In(we)),st(we,C.ADD_ATTR,ae))),C.ADD_URI_SAFE_ATTR&&st(tt,C.ADD_URI_SAFE_ATTR,ae),C.FORBID_CONTENTS&&(ot===ct&&(ot=In(ot)),st(ot,C.FORBID_CONTENTS,ae)),De&&(fe["#text"]=!0),V&&st(fe,["html","head","body"]),fe.table&&(st(fe,["tbody"]),delete Ze.tbody),C.TRUSTED_TYPES_POLICY){if(typeof C.TRUSTED_TYPES_POLICY.createHTML!="function")throw ls('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof C.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ls('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=C.TRUSTED_TYPES_POLICY,D=I.createHTML("")}else I===void 0&&(I=F_(w,s)),I!==null&&typeof D=="string"&&(D=I.createHTML(""));Vt&&Vt(C),oe=C}},rt=st({},[...qa,...Fa,...T_]),Ye=st({},[...ja,...C_]),dt=function(C){let pe=L(C);(!pe||!pe.tagName)&&(pe={namespaceURI:mt,tagName:"template"});let Le=mo(C.tagName),at=mo(pe.tagName);return nt[C.namespaceURI]?C.namespaceURI===He?pe.namespaceURI===he?Le==="svg":pe.namespaceURI===wt?Le==="svg"&&(at==="annotation-xml"||le[at]):!!rt[Le]:C.namespaceURI===wt?pe.namespaceURI===he?Le==="math":pe.namespaceURI===He?Le==="math"&&Ne[at]:!!Ye[Le]:C.namespaceURI===he?pe.namespaceURI===He&&!Ne[at]||pe.namespaceURI===wt&&!le[at]?!1:!Ye[Le]&&(E[Le]||!rt[Le]):!!(b==="application/xhtml+xml"&&nt[C.namespaceURI]):!1},Rt=function(C){as(t.removed,{element:C});try{L(C).removeChild(C)}catch{j(C)}},ft=function(C,pe){try{as(t.removed,{attribute:pe.getAttributeNode(C),from:pe})}catch{as(t.removed,{attribute:null,from:pe})}if(pe.removeAttribute(C),C==="is")if(Ge||be)try{Rt(pe)}catch{}else try{pe.setAttribute(C,"")}catch{}},en=function(C){let pe=null,Le=null;if(Ke)C="<remove></remove>"+C;else{let yt=Na(C,/^[\r\n\t ]+/);Le=yt&&yt[0]}b==="application/xhtml+xml"&&mt===he&&(C='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+C+"</body></html>");let at=I?I.createHTML(C):C;if(mt===he)try{pe=new h().parseFromString(at,b)}catch{}if(!pe||!pe.documentElement){pe=z.createDocument(mt,"template",null);try{pe.documentElement.innerHTML=$t?D:at}catch{}}let xt=pe.body||pe.documentElement;return C&&Le&&xt.insertBefore(n.createTextNode(Le),xt.childNodes[0]||null),mt===he?F.call(pe,V?"html":"body")[0]:V?pe.documentElement:xt},jt=function(C){return A.call(C.ownerDocument||C,C,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Pt=function(C){return C instanceof f&&(typeof C.nodeName!="string"||typeof C.textContent!="string"||typeof C.removeChild!="function"||!(C.attributes instanceof p)||typeof C.removeAttribute!="function"||typeof C.setAttribute!="function"||typeof C.namespaceURI!="string"||typeof C.insertBefore!="function"||typeof C.hasChildNodes!="function")},Bt=function(C){return typeof i=="function"&&C instanceof i};function Mt(Pe,C,pe){fo(Pe,Le=>{Le.call(t,C,pe,oe)})}let Lt=function(C){let pe=null;if(Mt(ve.beforeSanitizeElements,C,null),Pt(C))return Rt(C),!0;let Le=ae(C.nodeName);if(Mt(ve.uponSanitizeElement,C,{tagName:Le,allowedTags:fe}),W&&C.hasChildNodes()&&!Bt(C.firstElementChild)&&Gt(/<[/\w!]/g,C.innerHTML)&&Gt(/<[/\w!]/g,C.textContent)||C.nodeType===us.progressingInstruction||W&&C.nodeType===us.comment&&Gt(/<[/\w]/g,C.data))return Rt(C),!0;if(!(R.tagCheck instanceof Function&&R.tagCheck(Le))&&(!fe[Le]||Ze[Le])){if(!Ze[Le]&&tn(Le)&&(me.tagNameCheck instanceof RegExp&&Gt(me.tagNameCheck,Le)||me.tagNameCheck instanceof Function&&me.tagNameCheck(Le)))return!1;if(De&&!ot[Le]){let at=L(C)||C.parentNode,xt=J(C)||C.childNodes;if(xt&&at){let yt=xt.length;for(let v=yt-1;v>=0;--v){let y=N(xt[v],!0);y.__removalCount=(C.__removalCount||0)+1,at.insertBefore(y,Y(C))}}}return Rt(C),!0}return C instanceof u&&!dt(C)||(Le==="noscript"||Le==="noembed"||Le==="noframes")&&Gt(/<\/no(script|embed|frames)/i,C.innerHTML)?(Rt(C),!0):(qe&&C.nodeType===us.text&&(pe=C.textContent,fo([ie,G,xe],at=>{pe=is(pe,at," ")}),C.textContent!==pe&&(as(t.removed,{element:C.cloneNode()}),C.textContent=pe)),Mt(ve.afterSanitizeElements,C,null),!1)},ze=function(C,pe,Le){if(X&&(pe==="id"||pe==="name")&&(Le in n||Le in ye))return!1;if(!(Ce&&!gt[pe]&&Gt(Oe,pe))){if(!(ue&&Gt(re,pe))){if(!(R.attributeCheck instanceof Function&&R.attributeCheck(pe,C))){if(!we[pe]||gt[pe]){if(!(tn(C)&&(me.tagNameCheck instanceof RegExp&&Gt(me.tagNameCheck,C)||me.tagNameCheck instanceof Function&&me.tagNameCheck(C))&&(me.attributeNameCheck instanceof RegExp&&Gt(me.attributeNameCheck,pe)||me.attributeNameCheck instanceof Function&&me.attributeNameCheck(pe,C))||pe==="is"&&me.allowCustomizedBuiltInElements&&(me.tagNameCheck instanceof RegExp&&Gt(me.tagNameCheck,Le)||me.tagNameCheck instanceof Function&&me.tagNameCheck(Le))))return!1}else if(!tt[pe]){if(!Gt(ee,is(Le,Ae,""))){if(!((pe==="src"||pe==="xlink:href"||pe==="href")&&C!=="script"&&x_(Le,"data:")===0&&ht[C])){if(!(Re&&!Gt(se,is(Le,Ae,"")))){if(Le)return!1}}}}}}}return!0},tn=function(C){return C!=="annotation-xml"&&Na(C,B)},zt=function(C){Mt(ve.beforeSanitizeAttributes,C,null);let{attributes:pe}=C;if(!pe||Pt(C))return;let Le={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:we,forceKeepAttr:void 0},at=pe.length;for(;at--;){let xt=pe[at],{name:yt,namespaceURI:v,value:y}=xt,k=ae(yt),M=y,Q=yt==="value"?M:A_(M);if(Le.attrName=k,Le.attrValue=Q,Le.keepAttr=!0,Le.forceKeepAttr=void 0,Mt(ve.uponSanitizeAttribute,C,Le),Q=Le.attrValue,te&&(k==="id"||k==="name")&&(ft(yt,C),Q=K+Q),W&&Gt(/((--!?|])>)|<\/(style|title|textarea)/i,Q)){ft(yt,C);continue}if(k==="attributename"&&Na(Q,"href")){ft(yt,C);continue}if(Le.forceKeepAttr)continue;if(!Le.keepAttr){ft(yt,C);continue}if(!je&&Gt(/\/>/i,Q)){ft(yt,C);continue}qe&&fo([ie,G,xe],Ie=>{Q=is(Q,Ie," ")});let ge=ae(C.nodeName);if(!ze(ge,k,Q)){ft(yt,C);continue}if(I&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!v)switch(w.getAttributeType(ge,k)){case"TrustedHTML":{Q=I.createHTML(Q);break}case"TrustedScriptURL":{Q=I.createScriptURL(Q);break}}if(Q!==M)try{v?C.setAttributeNS(v,yt,Q):C.setAttribute(yt,Q),Pt(C)?Rt(C):Ic(t.removed)}catch{ft(yt,C)}}Mt(ve.afterSanitizeAttributes,C,null)},et=function Pe(C){let pe=null,Le=jt(C);for(Mt(ve.beforeSanitizeShadowDOM,C,null);pe=Le.nextNode();)Mt(ve.uponSanitizeShadowNode,pe,null),Lt(pe),zt(pe),pe.content instanceof o&&Pe(pe.content);Mt(ve.afterSanitizeShadowDOM,C,null)};return t.sanitize=function(Pe){let C=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},pe=null,Le=null,at=null,xt=null;if($t=!Pe,$t&&(Pe="<!-->"),typeof Pe!="string"&&!Bt(Pe))if(typeof Pe.toString=="function"){if(Pe=Pe.toString(),typeof Pe!="string")throw ls("dirty is not a string, aborting")}else throw ls("toString is not a function");if(!t.isSupported)return Pe;if(Me||Je(C),t.removed=[],typeof Pe=="string"&&(Qe=!1),Qe){if(Pe.nodeName){let y=ae(Pe.nodeName);if(!fe[y]||Ze[y])throw ls("root node is forbidden and cannot be sanitized in-place")}}else if(Pe instanceof i)pe=en("<!---->"),Le=pe.ownerDocument.importNode(Pe,!0),Le.nodeType===us.element&&Le.nodeName==="BODY"||Le.nodeName==="HTML"?pe=Le:pe.appendChild(Le);else{if(!Ge&&!qe&&!V&&Pe.indexOf("<")===-1)return I&&P?I.createHTML(Pe):Pe;if(pe=en(Pe),!pe)return Ge?null:P?D:""}pe&&Ke&&Rt(pe.firstChild);let yt=jt(Qe?Pe:pe);for(;at=yt.nextNode();)Lt(at),zt(at),at.content instanceof o&&et(at.content);if(Qe)return Pe;if(Ge){if(be)for(xt=U.call(pe.ownerDocument);pe.firstChild;)xt.appendChild(pe.firstChild);else xt=pe;return(we.shadowroot||we.shadowrootmode)&&(xt=ke.call(r,xt,!0)),xt}let v=V?pe.outerHTML:pe.innerHTML;return V&&fe["!doctype"]&&pe.ownerDocument&&pe.ownerDocument.doctype&&pe.ownerDocument.doctype.name&&Gt(Uc,pe.ownerDocument.doctype.name)&&(v="<!DOCTYPE "+pe.ownerDocument.doctype.name+`>
`+v),qe&&fo([ie,G,xe],y=>{v=is(v,y," ")}),I&&P?I.createHTML(v):v},t.setConfig=function(){let Pe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Je(Pe),Me=!0},t.clearConfig=function(){oe=null,Me=!1},t.isValidAttribute=function(Pe,C,pe){oe||Je({});let Le=ae(Pe),at=ae(C);return ze(Le,at,pe)},t.addHook=function(Pe,C){typeof C=="function"&&as(ve[Pe],C)},t.removeHook=function(Pe,C){if(C!==void 0){let pe=k_(ve[Pe],C);return pe===-1?void 0:$_(ve[Pe],pe,1)[0]}return Ic(ve[Pe])},t.removeHooks=function(Pe){ve[Pe]=[]},t.removeAllHooks=function(){ve=Fc()},t}var zc=Wc();var Pn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},go=e=>(...t)=>({_$litDirective$:e,values:t}),Pr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var ds=class extends Pr{constructor(t){if(super(t),this.it=It,t.type!==Pn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===It||t==null)return this._t=void 0,this.it=t;if(t===un)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};ds.directiveName="unsafeHTML",ds.resultType=1;var Hc=go(ds);function Ka(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var pr=Ka();function Xc(e){pr=e}var ms={exec:()=>null};function _t(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Yt.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var j_=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Yt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},B_=/^(?:[ \t]*(?:\n|$))+/,U_=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,W_=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,gs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,z_=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ya=/(?:[*+-]|\d{1,9}[.)])/,Jc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,eu=_t(Jc).replace(/bull/g,Ya).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),H_=_t(Jc).replace(/bull/g,Ya).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Za=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,G_=/^[^\n]+/,Qa=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,V_=_t(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Qa).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),K_=_t(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ya).getRegex(),ko="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Xa=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Y_=_t("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Xa).replace("tag",ko).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),tu=_t(Za).replace("hr",gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ko).getRegex(),Z_=_t(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",tu).getRegex(),Ja={blockquote:Z_,code:U_,def:V_,fences:W_,heading:z_,hr:gs,html:Y_,lheading:eu,list:K_,newline:B_,paragraph:tu,table:ms,text:G_},Gc=_t("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ko).getRegex(),Q_={...Ja,lheading:H_,table:Gc,paragraph:_t(Za).replace("hr",gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Gc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ko).getRegex()},X_={...Ja,html:_t(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Xa).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ms,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:_t(Za).replace("hr",gs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",eu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},J_=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,em=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,nu=/^( {2,}|\\)\n(?!\s*$)/,tm=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,$o=/[\p{P}\p{S}]/u,ei=/[\s\p{P}\p{S}]/u,ru=/[^\s\p{P}\p{S}]/u,nm=_t(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ei).getRegex(),su=/(?!~)[\p{P}\p{S}]/u,rm=/(?!~)[\s\p{P}\p{S}]/u,sm=/(?:[^\s\p{P}\p{S}]|~)/u,om=_t(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",j_?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ou=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,am=_t(ou,"u").replace(/punct/g,$o).getRegex(),im=_t(ou,"u").replace(/punct/g,su).getRegex(),au="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",lm=_t(au,"gu").replace(/notPunctSpace/g,ru).replace(/punctSpace/g,ei).replace(/punct/g,$o).getRegex(),cm=_t(au,"gu").replace(/notPunctSpace/g,sm).replace(/punctSpace/g,rm).replace(/punct/g,su).getRegex(),um=_t("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ru).replace(/punctSpace/g,ei).replace(/punct/g,$o).getRegex(),dm=_t(/\\(punct)/,"gu").replace(/punct/g,$o).getRegex(),pm=_t(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),fm=_t(Xa).replace("(?:-->|$)","-->").getRegex(),_m=_t("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",fm).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),yo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,mm=_t(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",yo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),iu=_t(/^!?\[(label)\]\[(ref)\]/).replace("label",yo).replace("ref",Qa).getRegex(),lu=_t(/^!?\[(ref)\](?:\[\])?/).replace("ref",Qa).getRegex(),gm=_t("reflink|nolink(?!\\()","g").replace("reflink",iu).replace("nolink",lu).getRegex(),Vc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ti={_backpedal:ms,anyPunctuation:dm,autolink:pm,blockSkip:om,br:nu,code:em,del:ms,emStrongLDelim:am,emStrongRDelimAst:lm,emStrongRDelimUnd:um,escape:J_,link:mm,nolink:lu,punctuation:nm,reflink:iu,reflinkSearch:gm,tag:_m,text:tm,url:ms},hm={...ti,link:_t(/^!?\[(label)\]\((.*?)\)/).replace("label",yo).getRegex(),reflink:_t(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",yo).getRegex()},Ha={...ti,emStrongRDelimAst:cm,emStrongLDelim:im,url:_t(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Vc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:_t(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Vc).getRegex()},bm={...Ha,br:_t(nu).replace("{2,}","*").getRegex(),text:_t(Ha.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ho={normal:Ja,gfm:Q_,pedantic:X_},ps={normal:ti,gfm:Ha,breaks:bm,pedantic:hm},ym={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Kc=e=>ym[e];function Mn(e,t){if(t){if(Yt.escapeTest.test(e))return e.replace(Yt.escapeReplace,Kc)}else if(Yt.escapeTestNoEncode.test(e))return e.replace(Yt.escapeReplaceNoEncode,Kc);return e}function Yc(e){try{e=encodeURI(e).replace(Yt.percentDecode,"%")}catch{return null}return e}function Zc(e,t){let n=e.replace(Yt.findPipe,(o,a,i)=>{let u=!1,d=a;for(;--d>=0&&i[d]==="\\";)u=!u;return u?"|":" |"}),r=n.split(Yt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(Yt.slashPipe,"|");return r}function fs(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function vm(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Qc(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let u={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,u}function wm(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var vo=class{constructor(e){kt(this,"options");kt(this,"rules");kt(this,"lexer");this.options=e||pr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:fs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=wm(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=fs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:fs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=fs(t[0],`
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
`,e=e.substring(h.length+1),u=!0),!u){let N=this.rules.other.nextBulletRegex(x),j=this.rules.other.hrRegex(x),Y=this.rules.other.fencesBeginRegex(x),J=this.rules.other.headingBeginRegex(x),L=this.rules.other.htmlBeginRegex(x);for(;e;){let I=e.split(`
`,1)[0],D;if(h=I,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),D=h):D=h.replace(this.rules.other.tabCharGlobal,"    "),Y.test(h)||J.test(h)||L.test(h)||N.test(h)||j.test(h))break;if(D.search(this.rules.other.nonSpaceChar)>=x||!h.trim())p+=`
`+D.slice(x);else{if(w||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(f)||J.test(f)||j.test(f))break;p+=`
`+h}!w&&!h.trim()&&(w=!0),d+=I+`
`,e=e.substring(I.length+1),f=D.slice(x)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let u of s.items){if(this.lexer.state.top=!1,u.tokens=this.lexer.blockTokens(u.text,[]),u.task){if(u.text=u.text.replace(this.rules.other.listReplaceTask,""),u.tokens[0]?.type==="text"||u.tokens[0]?.type==="paragraph"){u.tokens[0].raw=u.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),u.tokens[0].text=u.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(u.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};u.checked=p.checked,s.loose?u.tokens[0]&&["paragraph","text"].includes(u.tokens[0].type)&&"tokens"in u.tokens[0]&&u.tokens[0].tokens?(u.tokens[0].raw=p.raw+u.tokens[0].raw,u.tokens[0].text=p.raw+u.tokens[0].text,u.tokens[0].tokens.unshift(p)):u.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):u.tokens.unshift(p)}}if(!s.loose){let d=u.tokens.filter(f=>f.type==="space"),p=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let u of s.items){u.loose=!0;for(let d of u.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Zc(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Zc(a,o.header.length).map((i,u)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[u]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=fs(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=vm(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Qc(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Qc(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,u=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(r=d.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){u+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+u);let p=[...r[0]][0].length,f=e.slice(0,s+r.index+p+a);if(Math.min(s,a)%2){let w=f.slice(1,-1);return{type:"em",raw:f,text:w,tokens:this.lexer.inlineTokens(w)}}let h=f.slice(2,-2);return{type:"strong",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},yn=class Ga{constructor(t){kt(this,"tokens");kt(this,"options");kt(this,"state");kt(this,"inlineQueue");kt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||pr,this.options.tokenizer=this.options.tokenizer||new vo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Yt,block:ho.normal,inline:ps.normal};this.options.pedantic?(n.block=ho.pedantic,n.inline=ps.pedantic):this.options.gfm&&(n.block=ho.gfm,this.options.breaks?n.inline=ps.breaks:n.inline=ps.gfm),this.tokenizer.rules=n}static get rules(){return{block:ho,inline:ps}}static lex(t,n){return new Ga(n).lex(t)}static lexInline(t,n){return new Ga(n).inlineTokens(t)}lex(t){t=t.replace(Yt.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let u=Object.keys(this.tokens.links);if(u.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)u.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let u;if(this.options.extensions?.inline?.some(p=>(u=p.call({lexer:this},t,n))?(t=t.substring(u.raw.length),n.push(u),!0):!1))continue;if(u=this.tokenizer.escape(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.tag(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.link(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(u.raw.length);let p=n.at(-1);u.type==="text"&&p?.type==="text"?(p.raw+=u.raw,p.text+=u.text):n.push(u);continue}if(u=this.tokenizer.emStrong(t,r,i)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.codespan(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.br(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.del(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.autolink(t)){t=t.substring(u.raw.length),n.push(u);continue}if(!this.state.inLink&&(u=this.tokenizer.url(t))){t=t.substring(u.raw.length),n.push(u);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),h;this.options.extensions.startInline.forEach(w=>{h=w.call({lexer:this},f),typeof h=="number"&&h>=0&&(p=Math.min(p,h))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(u=this.tokenizer.inlineText(d)){t=t.substring(u.raw.length),u.raw.slice(-1)!=="_"&&(i=u.raw.slice(-1)),a=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=u.raw,p.text+=u.text):n.push(u);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},wo=class{constructor(e){kt(this,"options");kt(this,"parser");this.options=e||pr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(Yt.notSpaceStart)?.[0],s=e.replace(Yt.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Mn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Yc(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Mn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Yc(e);if(s===null)return Mn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Mn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Mn(e.text)}},ni=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},vn=class Va{constructor(t){kt(this,"options");kt(this,"renderer");kt(this,"textRenderer");this.options=t||pr,this.options.renderer=this.options.renderer||new wo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ni}static parse(t,n){return new Va(n).parse(t)}static parseInline(t,n){return new Va(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},bo,_s=(bo=class{constructor(e){kt(this,"options");kt(this,"block");this.options=e||pr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?yn.lex:yn.lexInline}provideParser(){return this.block?vn.parse:vn.parseInline}},kt(bo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),kt(bo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),bo),km=class{constructor(...e){kt(this,"defaults",Ka());kt(this,"options",this.setOptions);kt(this,"parse",this.parseMarkdown(!0));kt(this,"parseInline",this.parseMarkdown(!1));kt(this,"Parser",vn);kt(this,"Renderer",wo);kt(this,"TextRenderer",ni);kt(this,"Lexer",yn);kt(this,"Tokenizer",vo);kt(this,"Hooks",_s);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new wo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],u=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=u.apply(s,d)),p||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new vo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],u=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=u.apply(s,d)),p}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new _s;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],u=s[a];_s.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&_s.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await i.call(s,d);return u.call(s,f)})();let p=i.call(s,d);return u.call(s,p)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await i.apply(s,d);return f===!1&&(f=await u.apply(s,d)),f})();let p=i.apply(s,d);return p===!1&&(p=u.apply(s,d)),p}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return yn.lex(e,t??this.defaults)}parser(e,t){return vn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?yn.lex:yn.lexInline)(a,s),u=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(u,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?vn.parse:vn.parseInline)(u,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?yn.lex:yn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?vn.parse:vn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Mn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},dr=new km;function vt(e,t){return dr.parse(e,t)}vt.options=vt.setOptions=function(e){return dr.setOptions(e),vt.defaults=dr.defaults,Xc(vt.defaults),vt};vt.getDefaults=Ka;vt.defaults=pr;vt.use=function(...e){return dr.use(...e),vt.defaults=dr.defaults,Xc(vt.defaults),vt};vt.walkTokens=function(e,t){return dr.walkTokens(e,t)};vt.parseInline=dr.parseInline;vt.Parser=vn;vt.parser=vn.parse;vt.Renderer=wo;vt.TextRenderer=ni;vt.Lexer=yn;vt.lexer=yn.lex;vt.Tokenizer=vo;vt.Hooks=_s;vt.parse=vt;var Mv=vt.options,Dv=vt.setOptions,Nv=vt.use,qv=vt.walkTokens,Fv=vt.parseInline;var jv=vn.parse,Bv=yn.lex;function Gn(e){let t=vt.parse(e),n=zc.sanitize(t);return Hc(n)}function Dn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Mr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function xo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var uu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},$m={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},xm=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Am=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Sn(e){return!!e&&typeof e=="object"}function ri(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function si(e,t){let n=ri(e),r=ri(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let u=s.get(i)||0;u>0?s.set(i,u-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function du(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Sn(s)&&typeof s.text=="string"?s.text:"").join(""):Sn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Sm(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:uu[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=ri(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=si(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let u=si(Sn(i)?i.old_string:"",Sn(i)?i.new_string:"");s+=u.added,o+=u.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function oi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ai(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=xm.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Am.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Em(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Tm(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(Sn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(ai(a.text));else if(a.type==="thinking"){let i=oi(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=Sm(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?cu(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(Sn(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=du(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?cu([s],n):[s]}return[]}function cu(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Cm(e){let t=typeof e.command=="string"?e.command:"",n=du(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:uu.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Rm(e){if(e.type==="item.completed"&&Sn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ai(t.text)];if(t.type==="reasoning"){let n=oi(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Cm(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Om(e){if(e.schema!=="codex-delegation-monitor-v1"||!Sn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Sn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[ai(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=oi(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=$m[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Lm(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Im(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Sn(t)?t:null}function pu(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Im(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Em(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Om(o):Lm(o)?Rm(o):Tm(o,n);return a.length>0&&(r.progress=null),a}}}function ii(e){let t=[],n=pu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Pm=5,Mm=10,Dm=/Task\s+#(\d+)/,Nm=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,qm=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Ao(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Fm(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function jm(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Bm(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let u=Dm.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!u||d.length===0)continue;t.set(u[1],{label:d,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Um(e){if(e.tool==="Bash"){let t=e.command||"";return Nm.test(t)?"~ PR/\uAC8C\uC2DC \uC911":qm.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Wm(e){let t=e.filter(s=>s.kind==="tool").slice(-Mm),n=new Map;t.forEach((s,o)=>{let a=Um(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function zm(e){let t=jm(e);if(t)return{text:t,guess:!1};let n=Bm(e);if(n)return{text:n,guess:!1};let r=Wm(e);return r?{text:r,guess:!0}:null}function Hm(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:on(e,t)}function Dr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,u=null,d=!1,p={},f=!0,h=new Set,w=new Set,x=null,N=null,j=!1,Y=!1,J=!1,L=null,I=null;function D(){j=!1,Y=!1,J=!1,L=null,I=null}async function z(W){if(n){Y=!0,J=!1,me();try{let V=await Promise.resolve(n("get-attempt-prompt",{attempt_id:W,...u?{root_dir:u}:{}}));if(o!==W)return;!V||typeof V!="object"||Array.isArray(V)?J=!0:(L=V,I=W)}catch{o===W&&(J=!0)}finally{o===W&&(Y=!1,me())}}}function A(){if(j=!j,j&&o&&I!==o){z(o);return}me()}function U(){if(!j)return"";let W=Mr({loading:Y,error:J});if(W)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${W}
      </div>`;if(!L)return"";if(L.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let V=xo(L.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${V?c`<div class="prompt-block__meta">${V} 발송</div>`:""}
      ${typeof L.task_prompt=="string"?Dn("\uACFC\uC5C5 (user)",L.task_prompt):""}
      ${typeof L.system_prompt=="string"?Dn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",L.system_prompt):""}
    </div>`}function F(){if(!i||!r)return[];let W=r.get(i);return ii(W?W.lines:[])}function ke(){if(!i||!r)return null;let W=r.get(i),V=W?W.last_event_at:null;return typeof V=="number"?V:null}function ve(){return p.status==="running"}function ie(){if(ve()&&o){N||(N=setInterval(()=>me(),1e3));return}G()}function G(){N&&(clearInterval(N),N=null)}function xe(W){let V=[],Me=0;for(;Me<W.length;){let{idx:Ke,line:Ge}=W[Me];if(Ge.kind==="tool"){let be=Me;for(;be<W.length&&W[be].line.kind==="tool"&&W[be].line.tool===Ge.tool;)be+=1;if(be-Me>=Pm&&!w.has(Ke)){V.push({kind:"group",idx:Ke,tool:Ge.tool||"",lines:W.slice(Me,be)}),Me=be;continue}}V.push({kind:"line",idx:Ke,line:Ge}),Me+=1}return V}function Oe(W){let V=[],Me=new Map;for(let be=0;be<W.length;be+=1){let P=W[be],X=P.parent_tool_use_id;if(typeof X=="string"&&X.length>0){let te=Me.get(X);te||(te={kind:"subagent",idx:be,launch_id:X,agent_type:null,header:null,lines:[]},Me.set(X,te),V.push(te)),te.lines.push({idx:be,line:P});continue}if(P.kind==="tool"&&P.tool==="Agent"&&typeof P.launch_id=="string"&&P.launch_id.length>0){let te=re(P),K=Me.get(P.launch_id);if(K){K.header={idx:be,line:P},K.agent_type=te;continue}let De={kind:"subagent",idx:be,launch_id:P.launch_id,agent_type:te,header:{idx:be,line:P},lines:[]};Me.set(P.launch_id,De),V.push(De);continue}V.push({kind:"entry",idx:be,line:P})}let Ke=[],Ge=0;for(;Ge<V.length;){if(V[Ge].kind!=="entry"){Ke.push(V[Ge]),Ge+=1;continue}let be=Ge;for(;be<V.length&&V[be].kind==="entry";)be+=1;Ke.push(...xe(V.slice(Ge,be))),Ge=be}return Ke}function re(W){let V=W.input;return V&&typeof V.subagent_type=="string"?V.subagent_type:null}function se(W){for(let V=W.length-1;V>=0;V-=1){let Me=W[V];if(Me.kind==="result"||Me.kind==="error")return null;if(Me.kind==="tool"&&!Object.hasOwn(Me,"result"))return Me}return null}function Ae(W){for(let V=W.length-1;V>=0;V-=1)if(W[V].kind==="thinking")return W[V];return null}function B(W,V){if(V.kind==="gate")return c`<div class="sv__gate">${V.text}</div>`;if(V.kind==="phase")return c`<div class="sv__phase">${V.text}</div>`;if(V.kind==="result")return c`<div
        class="sv__result${V.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${V.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Gn(V.text||(V.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(V.kind==="thinking"){let Me=h.has(W);return c`<div
        class="sv__think${Me?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>gt(W)}
      >
        <span class="sv__think-line">💭 ${Ao(V.text)}</span>
        ${Me?c`<pre class="sv__think-expand">${V.text}</pre>`:""}
      </div>`}if(V.kind==="error")return c`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="blocker")return c`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="tool"){let Me=h.has(W),Ke=V.tool==="Bash"?Fm(V.command):0,Ge=V.tool==="Bash"?Ke>1?Ao(V.command):V.command:V.path||V.command||"";return c`<div
        class="sv__tool${Me?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>gt(W)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${V.icon}</span>
          <span class="sv__tool-name">${V.tool}</span>
          ${Ge?c`<span class="sv__tool-detail">${Ge}</span>`:""}
          ${Ke>1?c`<span class="sv__tool-more">⋯ ${Ke}줄</span>`:""}
          ${typeof V.added=="number"?c`<span class="sv__diff-add">+${V.added}</span>`:""}
          ${typeof V.removed=="number"?c`<span class="sv__diff-del">−${V.removed}</span>`:""}
          ${V.result?c`<span class="sv__tool-ok">→ ${V.result}</span>`:""}
        </span>
        ${Me?c`<pre class="sv__tool-expand">${ee(V)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${Gn(V.text||"")}</div>`}function ee(W){let V=[];if(W.tool==="Bash"&&typeof W.command=="string"&&W.command.length>0)V.push(W.command);else if(W.input!==void 0)try{V.push(`input: ${JSON.stringify(W.input,null,2)}`)}catch{}return typeof W.output=="string"&&W.output.length>0&&V.push(`output:
${W.output}`),V.join(`

`)}function fe(){if(!o)return c``;let W=F(),V=(a?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),Me=p.session_id||"",Ke=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${f?"ON":"OFF"}`,Ge=ve(),be=Ge?Hm(ke(),Date.now()):"",P=Ge?se(W):null,X=Ge?Ae(W):null,te=zm(W);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?p.role||"":o}</span>
        ${te?c`<span
              class="sv__stage${te.guess?" sv__stage--guess":""}"
              title=${te.text}
              >${te.text}</span
            >`:""}
        ${Ge?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${be?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${be}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${be?c`<span class="sv__live-ago">${be}</span>`:""}</span
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
        ${V?c`<span class="sv__meta">${V}</span>`:""}
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
        ${W.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:Oe(W).map(K=>K.kind==="subagent"?we(K):K.kind==="group"?$e(K):B(K.idx,K.line))}
      </div>
      ${P||X?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${P?c`<span class="sv__now-icon">${P.icon}</span>
                  <span class="sv__now-name">${P.tool}</span>
                  <span class="sv__now-detail"
                    >${P.tool==="Bash"?Ao(P.command):P.path||P.command||""}</span
                  >`:""}
            ${X?c`<span class="sv__now-think"
                  >💭 ${Ao(X.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function $e(W){return c`<div
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
    </div>`}function we(W){let V=w.has(W.idx),Me=W.header?W.header.line:null,Ke=Me?Me.is_error===!0?"\u2717":typeof Me.result=="string"?"\u2713":"\u27F3":"",Ge=Me&&Me.command?Me.command:"";return c`<div class="sv__sub${V?" sv__sub--open":""}">
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
        ${V?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${V?c`<div class="sv__sub-body">
            ${xe(W.lines).map(be=>be.kind==="group"?$e(be):B(be.idx,be.line))}
          </div>`:""}
    </div>`}function Ue(W){w.add(W),me()}function me(){Ve(fe(),e),ie(),f&&Ze()}function Ze(){let W=e.querySelector(".sv__body");W&&(W.scrollTop=W.scrollHeight)}function gt(W){h.has(W)?h.delete(W):h.add(W),me()}function R(){f=!f,me()}function ue(W){an(W).then(V=>{V?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ce(W){!o||!W||(p={...p,...W},me())}function Re(W){let V=W.target;if(!V||!V.classList||!V.classList.contains("sv__body"))return;!(V.scrollHeight-V.scrollTop-V.clientHeight<=4)&&f&&(f=!1,me())}e.addEventListener("scroll",Re,!0);function je(W){let V=W&&W.attempt_id;if(!V)return;let Me=i;o=V,a=typeof W.launch_id=="string"&&W.launch_id.length>0?W.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&Me&&Me!==i&&Promise.resolve(n("unsubscribe-session-log",{id:Me})).catch(()=>{}),u=typeof W.root_dir=="string"&&W.root_dir.length>0?W.root_dir:null,p=W.meta||{},d=W.hide_prompt===!0,f=!0,h.clear(),w.clear(),D(),!x&&r&&(x=r.subscribe(me)),n&&Promise.resolve(n("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...u?{root_dir:u}:{}})).catch(()=>{}),me()}function qe(){let W=i;o=null,a=null,i=null,u=null,d=!1,h.clear(),w.clear(),D(),G(),n&&W&&Promise.resolve(n("unsubscribe-session-log",{id:W})).catch(()=>{}),Ve(c``,e),s&&s()}return{open:je,updateMeta:Ce,close:qe,isOpen(){return o!==null},destroy(){G(),x&&(x(),x=null),e.removeEventListener("scroll",Re,!0),o=null,a=null,i=null,u=null,d=!1,Ve(c``,e)}}}function So(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=li(t.spec_id),s=li(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function li(e){return typeof e=="string"?e.trim():""}function fu(e){let t=So(e);if(t.path)return t;let n=li(Gm(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Gm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function Vm(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Km(e){let t=e&&e.metadata||{},n=fu(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Vm(t)?null:"plan_pending"}),r}function _u(e,t){let n=Km(e);return c`
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
  `}var Ym="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Zm=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Qm=/^\*\*결론\*\* — (.+)$/;function Eo(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Ym)return null;let n=Zm.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Qm.exec(t[a]):null,u=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:u,body:t.slice(d).join(`
`).trim()}}var mu=20;function gu(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Xm(e){return e.length>mu?`${e.slice(0,mu)}\u2026`:e}function Jm(e,t,n,r){let s=`${t.lane} ${Xm(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${gu(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${Gn(t.body)}
        </div>`:""}
  </div>`}function eg(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${gu(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Gn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function hu(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((u,d)=>String(d.created_at||"").localeCompare(String(u.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(u=>{let d=Eo(typeof u.text=="string"?u.text:"");return d?Jm(u,d,t,s.has(u.id)):eg(u)})}
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
  `}var{I:kw}=Dl;var bu=e=>e.strings===void 0;var tg={},yu=(e,t=tg)=>e._$AH=t;var fr=go(class extends Pr{constructor(e){if(super(e),e.type!==Pn.PROPERTY&&e.type!==Pn.ATTRIBUTE&&e.type!==Pn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!bu(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===un||t===It)return t;let n=e.element,r=e.name;if(e.type===Pn.PROPERTY){if(t===n[r])return un}else if(e.type===Pn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return un}else if(e.type===Pn.ATTRIBUTE&&n.getAttribute(r)===t+"")return un;return yu(e),t}});var To=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ui=[...To.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Nn=["orchestration_model","orchestration_effort","orchestration_speed"],Co=[...To,...Nn],ng=ui.filter(e=>Co.includes(e)),vu=["delegated","main"],Ro=["inherit","claude","codex"],hs=["default","fast"],bs=["standard","fast_track"],ys=["codex","opus","fable","self","skip"],Oo=["codex","fable","skip"],Lo=["low","medium","high","xhigh"],cn="auto";function ln(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function wu(e){if(!ln(e)||!ln(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))ln(r)&&ln(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Nr(e,t){let n=wu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[cn,...r.flatMap(([,s])=>s)]}function ku(e,t,n,r){if(!ln(e)||!ln(e.runners))return[cn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!ln(a)||!ln(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,u]of Object.entries(a.models)){if(n&&n!==cn&&i!==n)continue;let d=r(a,u);if(Array.isArray(d))for(let p of d)typeof p=="string"&&!s.includes(p)&&s.push(p)}return[cn,...s]}function qr(e,t,n){return ku(e,t,n,(r,s)=>ln(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function di(e,t,n){return ku(e,t,n,(r,s)=>ln(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:ln(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function vs(e,t){let n=wu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function $u(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Nr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!qr(t,s,r.impl_model||cn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var rg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},ci=[...ng,...Nn],sg=[...Co,...ui].filter((e,t,n)=>n.indexOf(e)===t&&!ci.includes(e));function xu(e,t){let n=ln(e)?e:{},r=ln(t)?t:{},s=[];for(let a of ci){let i=n[a]??null,u=r[a]??null;i!==u&&s.push({key:a,label:rg[a]||a,before:i,after:u,kind:i===null?"added":u===null?"removed":"changed"})}let o=[];for(let a of[...sg,...Object.keys(r)])!ci.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function pi(e,t,n,r,s,o){return co({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function Au(e,t){let n={};for(let r of ui){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function Su(e,t){let n={};for(let r of Nn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var fi=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Nn]}],Vn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Io={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function _i(e,t,n,r,s,o=null){let a=Xt({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Eu(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of _i(e,t,n,r,s,o))a[i.source]+=1;return a}function Tu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Cu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Iw=[...To,...Nn];var og=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],ag={pin:"pin",global:"global",base:"base"};function ig(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${ag[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function lg(e,t,n){switch(e){case"workflow_mode":return bs;case"spec_review_model":case"impl_review_model":return ys;case"plan_review_model":return Oo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Lo;case"impl_dispatch":return vu;case"impl_runtime":return Ro;case"impl_model":return Nr(n,t.impl_runtime);case"impl_effort":return qr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return hs;case"orchestration_model":return vs(n,null);case"orchestration_effort":return qr(n,void 0,t.orchestration_model||cn).filter(r=>r!==cn);default:return[]}}function cg(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${ig(e.source)}
    <span class="detail-effective__k"
      >${Vn[e.key]||e.key}</span
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
          aria-label=${`${Vn[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function Ru(e,t){let n=fi.flatMap(u=>u.keys),r=_i(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Eu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(u=>[u.key,u])),a=Object.fromEntries(r.filter(u=>u.value!==null).map(u=>[u.key,u.value])),i=r.filter(u=>u.full_value&&u.display!==u.full_value).map(u=>u.full_value).join(" \xB7 ");return c`<details
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
        >${ug(o)}</span
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
          ${fi.map(u=>c`
              <div class="detail-effective__subhead">${u.label}</div>
              ${r.filter(d=>u.keys.includes(d.key)).map(d=>{let p=co({key:d.key,choices:lg(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return cg(d,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${fr(e.preset_id)}
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
  </details>`}function ug(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function dg(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Ou(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=dg(n.exec_receipt),u=i?Cn(i):a,d=i?`${i.kind}:${i.actor}`:a.split("@")[0],p=io(n.planned_execution,n.exec_receipt);return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${og.map(f=>{let h=f.receipt&&typeof t[f.receipt]=="string"?String(t[f.receipt]):"",w=r[f.id],x=h.length>0||w?.fill==="full",N=!x&&w?.fill==="dim",j=w?.stale===!0;return c`<span
          class=${`detail-summary__gate${x?" detail-summary__gate--on":""}${N?" detail-summary__gate--current":""}${j?" detail-summary__gate--stale":""}`}
          data-gate=${f.id}
        >
          <span class="detail-summary__gate-pill">${f.label}</span>
          ${h?c`<span class="detail-summary__gate-sha"
                >${h.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function Mu(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Lu(e){return Mu(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Iu(e,t){let n=e&&e[t];if(!Mu(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Lu),s=Lu(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function Du(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function pg(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Du(e)}${t}`}function Nu(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Du(e)}`}function fg(e,t){return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Nu({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Pu(e){let t=e.provider_key==="claude"?pg:Nu,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${fg(e.provider_key,e.provider)}
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
  </div>`}function qu({md:e,catalog:t,handlers:n}){let r=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Pu({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Iu(t,"claude"),selected:r,handlers:n,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Pu({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Iu(t,"codex"),selected:s,handlers:n})}
    </div>
  </section>`}var Fu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function ws(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Po(e){if(!ws(e)||!ws(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>ws(n)&&ws(n.models));return t.length>0?t:null}function wn(e,t){let n=Po(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function ju(e,t){return ws(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Bu(e,t){let n=Po(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return ju(r,r.models[t]);return[]}function _g(e){let t=Po(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of ju(r,s))n.includes(o)||n.push(o);return n}function mg(e,t){if(!t)return _g(e);let r=Po(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of Bu(e,o))s.includes(a)||s.push(a);return s}function Uu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=wn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?Bu(t,r.impl_model):mg(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function gg(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function hg(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Mo(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,u="";function d(N){N.key==="Escape"&&s&&(N.preventDefault(),w())}document.addEventListener("keydown",d);function p(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>w()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${gg(s)}</span
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
                        >`}${Gn(a)}`}
          </div>
        </div>
      </div>
    `:c``}function f(){Ve(p(),e)}async function h(N,j={}){s=N,o="loading",a="",i=null,u="",f();let Y=j.workspace||(n?n():"");if(!Y){o="error",u="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){o="error",u="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let J="/api/doc?workspace="+encodeURIComponent(Y)+"&path="+encodeURIComponent(N);try{let L=await r(J),I=await L.json().catch(()=>({}));if(!L.ok||!I||I.ok!==!0){if(I?.error==="not_found"&&j.missing_state==="plan_pending"){o="pending",u="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",u="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(I&&I.error||L.status)+")",f();return}let D=hg(String(I.content||""));i=D.front,a=D.body,o="ready",f()}catch{o="error",u="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function w(){s=null,Ve(c``,e)}function x(){document.removeEventListener("keydown",d),w()}return{open:h,close:w,destroy:x}}var bg=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Hu="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Do=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],yg=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Wu(e){return typeof e=="string"&&yg.has(e)}var vg=["running","done","failed","interrupted"],wg={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function kg(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function $g(e){let t=Wt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Ir(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Hu}
          >부분 집계</span
        >`:""}`}function zu(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function hi(e){if(typeof e=="number")return No(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?No(t):""}function xg(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Ag(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function mi(e){return e===null||typeof e=="string"&&e.trim().length>0}function gi(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Sg(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Do.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?mi(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||mi(t.effort))||!(!("agent_type"in t)||mi(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!vg.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!gi(t.started_at)||!gi(t.last_event_at)||!gi(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Eg(e,t,n){let s=Wt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${hi(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${hi(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Tg(e,t,n,r){let s=e.status==="running"?null:t,a=(s?Wt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?No(e.last_event_at):s?hi(s.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,xg(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=Ag(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${wg[e.status]}</span
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
  </button>`}function Cg(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Rg(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let f=Sg(p);!f||s.has(f.launch_id)||Wu(f.agent_type)||(s.add(f.launch_id),r.push(f))}r.sort((p,f)=>(p.started_at||0)-(f.started_at||0));let a={};for(let{role:p,provider:f}of Do){let h=t?t.roles[p]?.[f]:null;a[p]=h?[...h.legs]:[]}let i=Do.flatMap(({role:p})=>a[p]),u=new Set,d=[];for(let{role:p,provider:f}of Do){for(let h of r.filter(w=>w.role===p&&w.provider===f)){let w=i.find(x=>x.receipt_id===h.launch_id)||null;w&&!Cg(h,w)||(w&&u.add(w.receipt_id),d.push(Tg(h,w,e.attempt_id,n)))}for(let h of a[p])!u.has(h.receipt_id)&&!Wu(h.agent_type)&&d.push(Eg(p,f,h))}return d}function Og(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...bg,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${kg(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Hu}</span>`:""}
  </div>`}var Lg={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function No(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Ig(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Gu(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return c`
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
    </div>`},u=d=>{let p=zu(Ma(d));if(Wt(p).length===0&&!Ir(d.usage))return"";let f=s.has(d.attempt_id);return c`<button
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
      세션 이력${$g(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(d=>{let p=Ma(d),f=zu(p),h=Wt(f);return c`<div class="detail-session-row">
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
            ${ns(d)?c`<span
                  class="detail-session__resumed"
                  title=${ns(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${ur(d)}</span>
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
          ${u(d)} ${a(d)} ${i(d)} ${Ig(d)}
          ${s.has(d.attempt_id)&&d.usage?Og(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${Rg(d,p,t)}
        </div>`})}
    </div>
  `}function Vu(e,t={}){return c`
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
          ${Pg(e)}
        </div>`:""}
  `}function Pg(e){let t=Mr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Dn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=xo(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Dn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Dn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Mg=["open","in_progress","deferred","resolved","closed"],Dg=[0,1,2,3,4];function Ku(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,u=t.sessionLogStore,d=null,p=null,f={},h="",w=!1,x=[],N=!1,j={},Y={claude:null,codex:null},J=null,L=0,I=!1,D=!1,z="",A="",U="";function F(){I=!1,D=!1,z="",A="",U=""}function ke(){Y={claude:null,codex:null},J=null,L+=1}async function ve(l){try{let _=await fetch(l);if(!_.ok)return null;let g=await _.json();if(!g||typeof g!="object"||!Array.isArray(g.accounts))return null;let O=g.accounts.filter(_e=>_e!==null&&typeof _e=="object"&&!Array.isArray(_e));return{accounts:O,active:O.find(_e=>_e.active===!0)||null}}catch{return null}}async function ie(l){J=l;let _=++L,[g,O]=await Promise.all([ve("/api/claude-usage"),ve("/api/codex-usage")]);_!==L||l!==d||(Y={claude:g,codex:O},ce())}let G=[],xe=null,Oe=null,re=!1,se="",Ae=!1,B=0,ee=new Set;function fe(){G=[],xe=null,Oe=null,re=!1,se="",Ae=!1,B+=1,ee.clear()}async function $e(l){if(!s)return;let _=++B;try{let g=await Promise.resolve(s("get-comments",{id:l}));if(_!==B||l!==d)return;G=Array.isArray(g)?g:[],re=!1}catch{if(_!==B||l!==d)return;re=!0}ce()}function we(){if(!s||!d)return;let l=p&&typeof p.comment_count=="number"?p.comment_count:null;if(xe!==d){xe=d,Oe=l,$e(d);return}l!==null&&l!==Oe&&(Oe=l,$e(d))}function Ue(l){ee.has(l)?ee.delete(l):ee.add(l),ce()}function me(l){let _=se.trim().length===0;se=l,_!==(l.trim().length===0)&&ce()}async function Ze(){let l=se.trim();if(!s||!d||l.length===0||Ae)return;let _=d;Ae=!0,ce();let g=!1;try{let O=await Promise.resolve(s("add-comment",{id:_,text:l}));Array.isArray(O)&&O.length>0&&(g=!0,_===d&&(G=O,re=!1,se="",Oe=O.length))}catch{g=!1}g||de("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),_===d&&(Ae=!1),ce()}let gt={onToggle:Ue,onDraftInput:me,onSubmit:Ze},R=t.mdViewer||null,ue=null;R||(ue=document.createElement("div"),ue.className="md-viewer-root",document.body.appendChild(ue));let Ce=R||Mo(ue,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Re=document.createElement("div");Re.className="session-log-root",document.body.appendChild(Re);let je=Dr(Re,{transport:s?(l,_)=>Promise.resolve(s(l,_)):void 0,sessionLogStore:u}),qe=!1,W=!1,V=!1,Me=null,Ke=null,Ge=0;function be(l){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${l}`}function P(){qe=!1,W=!1,V=!1,Me=null,Ke=null,Ge+=1}async function X(l){if(!s)return;let _=++Ge;W=!0,V=!1,ce();try{let g=await Promise.resolve(s("get-bead-prompt",{bead_id:l}));if(_!==Ge)return;!g||typeof g!="object"||Array.isArray(g)?V=!0:(Me=g,Ke=be(l))}catch{_===Ge&&(V=!0)}finally{_===Ge&&(W=!1,ce())}}function te(){if(qe=!qe,qe&&d&&Ke!==be(d)){Me=null,X(d);return}ce()}function K(){if(!a||!d)return[];let l=a.get();return(l&&l.attempts?Object.values(l.attempts):[]).filter(g=>g&&g.bead_id===d).sort((g,O)=>(O.started_at||0)-(g.started_at||0)).map(g=>({attempt_id:g.attempt_id,bead_id:g.bead_id,status:g.status,started_at:typeof g.started_at=="number"?g.started_at:null,runner:g.runner||null,model:g.model||null,effort:g.effort||g.observed_effort||null,speed:g.speed||null,session_id:g.session_id||null,resumed_from:g.resumed_from||null,continuation_mode:g.continuation_mode||null,dismissed_at:typeof g.dismissed_at=="number"?g.dismissed_at:null,cause:typeof g.cause=="string"?g.cause:null,cause_detail:g.cause_detail||null,exec_default_preset_id:typeof g.exec_default_preset_id=="string"?g.exec_default_preset_id:null,exec_default_preset_revision:typeof g.exec_default_preset_revision=="number"?g.exec_default_preset_revision:null,exec_values:g.exec_values&&typeof g.exec_values=="object"?g.exec_values:null,usage:g.usage||null,usage_legs:Array.isArray(g.usage_legs)?g.usage_legs:[],delegation_sessions:Array.isArray(g.delegation_sessions)?g.delegation_sessions:[]}))}function De(){if(!a||!d)return null;let l=a.get();return pn(l&&l.attempts||{},d)}let Qe=new Set;function lt(l){Qe.has(l)?Qe.delete(l):Qe.add(l),ce()}function ot(l){let _=a?a.get():null,g=_&&_.attempts?_.attempts[l]:null;je.open({attempt_id:l,meta:g?{runner:g.runner||void 0,model:g.model||void 0,effort:g.effort||void 0,status:g.status||void 0,session_id:g.session_id||void 0}:{}})}function ct(l,_){let g=a?a.get():null,O=g&&g.attempts?g.attempts[l]:null,Ee=(O&&Array.isArray(O.delegation_sessions)?O.delegation_sessions:[]).find(Te=>Te&&typeof Te=="object"&&Te.launch_id===_);Ee&&je.open({attempt_id:l,launch_id:_,meta:{runner:Ee.provider==="claude"?"claude":"codex",role:Ee.role,...typeof Ee.agent_type=="string"?{agent_type:Ee.agent_type}:{},model:Ee.model,effort:Ee.effort,session_id:Ee.session_id,status:Ee.status}})}async function ht(l){if(!s||!l)return;let _=await Lr();if(_===null)return;let g=()=>{let Te=a?a.get():null;return Te&&typeof Te.revision=="number"?Te.revision:0},O=async(Te={},Be=g())=>await s("worker-attempt-resume",{attempt_id:l,expected_revision:Be,..._!==""?{instructions:_}:{},...Te}),_e=Te=>{Te?.queue&&a?.set&&a.set(Te.queue)},Ee=await O();if(_e(Ee),Ee&&Ee.conflict){let Te=Ee.queue&&typeof Ee.queue.revision=="number"?Ee.queue.revision:g();Ee=await O({},Te),_e(Ee)}Ee=await Rn(Ee,(Te,Be)=>O({continuation:Te,decision_token:Be}),{onResult:_e,refresh:()=>O()}),Ee&&Ee.resumed===!1&&!Ee.conflict&&Ee.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ee.reason}`,"error",2400)}let bt={onOpen:ot,onOpenDelegation:ct,onResume:ht,onToggleUsage:lt};function tt(){let l=a?a.get():null,_={...j};for(let g of["orchestration_model","orchestration_effort","orchestration_speed"]){let O=l&&l[g];typeof O=="string"&&(_[g]=O)}return _}async function Tt(){if(s){try{let l=await Promise.resolve(s("get-session-defaults",{}));j=l&&l.values&&typeof l.values=="object"?l.values:{}}catch{j={}}ce()}}function wt(){let l=a?a.get():null;return l&&l.runner_catalog||null}function He(){let l=a?a.get():null;return l&&typeof l.execution_defaults=="object"?l.execution_defaults:null}function he(){let l=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},g=Xt({pin:{...l,...f},global:tt(),execution_defaults:He(),runner_catalog:wt(),route:typeof l.route=="string"?l.route:null}).orchestration_model.value||"";return wn(wt(),g)}function mt(){let l=i?i.get():null;return!l||typeof l.revision!="number"?null:{revision:l.revision,presets:Array.isArray(l.presets)?l.presets:[]}}function $t(l){return l?.compatible===!1}function nt(l){i&&l&&typeof l.revision=="number"&&Array.isArray(l.presets)&&i.set({revision:l.revision,presets:l.presets})}async function Z(){let l=mt(),_=l?.presets.find(g=>g.id===h);if(!(!s||!d||!l||!_||$t(_)||w)){w=!0,x=[],ce();try{let g=await Promise.resolve(s("apply-impl-preset",Cu(d,_.id,l.revision)));if(g&&g.conflict){nt(g),de("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let O=g&&Array.isArray(g.issue)?g.issue[0]:g?.issue;if(g&&g.applied&&O&&typeof O=="object"){p=O,x=Array.isArray(g.skipped_orchestration_keys)?g.skipped_orchestration_keys.filter(_e=>typeof _e=="string"):[];for(let _e of Fu)delete f[_e];de(x.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}g&&g.error==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(g){g&&typeof g=="object"&&g.code==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{w=!1,ce()}}}let le=null;n&&n.subscribe&&(le=n.subscribe(()=>S()));let Ne=null;a&&typeof a.subscribe=="function"&&(Ne=a.subscribe(()=>{d&&ce()}));let E=null;i&&typeof i.subscribe=="function"&&(E=i.subscribe(()=>{d&&ce()}));function b(l){l.key==="Escape"&&d&&(l.preventDefault(),r())}document.addEventListener("keydown",b);function S(){if(d){if(n&&typeof n.snapshotFor=="function"){let l=n.snapshotFor("detail:"+d)||[];p=l.find(g=>g&&g.id===d)||l[0]||p}we(),ce()}}function H(l){an(l).then(_=>{_?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ae(l){l.preventDefault(),l.stopPropagation(),d&&H(d)}function oe(l,_){l.preventDefault(),l.stopPropagation(),H(_)}function ye(l,_,g){l.preventDefault(),l.stopPropagation(),Ce.open(_,{missing_state:g})}function Se(l,_){f[l]=_,ce(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",Tu(d,l,_.length===0?null:_))).catch(()=>{de("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Je(l,_){let g=p||{},O=g.metadata&&typeof g.metadata=="object"?g.metadata:{},_e={};for(let Be of["impl_runtime","impl_model","impl_effort"])_e[Be]=Object.hasOwn(f,Be)?f[Be]:typeof O[Be]=="string"?O[Be]:"";_e[l]=_;let Ee=Uu(_e,wt(),he()),Te={};for(let Be of["impl_runtime","impl_model","impl_effort"])Te[Be]=f[Be],f[Be]=Ee[Be]||"";ce(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...Ee,orchestration_runtime:he()})).then(Be=>{let pt=Array.isArray(Be)?Be[0]:Be;if(!pt||typeof pt!="object"||!pt.id)throw new Error("implementation target readback failed");p=pt;for(let Ut of["impl_runtime","impl_model","impl_effort"])delete f[Ut];ce()}).catch(()=>{for(let Be of["impl_runtime","impl_model","impl_effort"])Te[Be]===void 0?delete f[Be]:f[Be]=Te[Be];ce(),de("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function rt(l,_,g){if(!s||!d)return!1;try{let O=await Promise.resolve(s(l,_)),_e=Array.isArray(O)?O[0]:O;return _e&&typeof _e=="object"&&_e.id?(p=_e,!0):(de(g,"error"),!1)}catch{return de(g,"error"),!1}}function Ye(l){setTimeout(()=>{try{let _=e.querySelector(l);_&&typeof _.focus=="function"&&_.focus()}catch{}},0)}function dt(){I=!0,z=p&&p.title||"",ce(),Ye('.detail-edit__input[data-edit="title"]')}function Rt(l){z=l.target.value}function ft(){I=!1,z="",ce()}function en(){rt("edit-text",{id:d,field:"title",value:z},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(_=>{_&&(I=!1,z=""),ce()})}function jt(){D=!0,A=p&&p.description||"",ce(),Ye('.detail-edit__textarea[data-edit="description"]')}function Pt(l){A=l.target.value}function Bt(){D=!1,A="",ce()}function Mt(){rt("edit-text",{id:d,field:"description",value:A},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(_=>{_&&(D=!1,A=""),ce()})}function Lt(l,_,g,O){if(l.key==="Escape"){l.stopPropagation(),g();return}l.key==="Enter"&&(!O||l.ctrlKey||l.metaKey)&&(l.preventDefault(),_())}function ze(l){let _=l.target.value;rt("update-status",{id:d,status:_},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ce())}function tn(l){let _=Number(l.target.value);rt("update-priority",{id:d,priority:_},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ce())}function zt(l){U=l.target.value}function et(){let l=U.trim();l.length!==0&&rt("label-add",{id:d,label:l},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(_=>{_&&(U=""),ce()})}function Pe(l){if(l.key==="Escape"){l.stopPropagation(),U="",ce();return}l.key==="Enter"&&(l.preventDefault(),et())}function C(l){rt("label-remove",{id:d,label:l},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ce())}let pe={onCopyPath:oe,onOpenDoc:ye};function Le(l){return typeof l=="string"?l:l&&typeof l=="object"?String(l.id||l.to||l.issue_id||l.depends_on||""):""}function at(l){switch(l&&typeof l=="object"?String(l.dependency_type||l.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function xt(l){let g=(Array.isArray(l.dependencies)?l.dependencies:[]).map(O=>({id:Le(O),icon:at(O)})).filter(O=>O.id.length>0);return c`
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
    `}function yt(l){let _=l.metadata||{},g=l.workflow||{},O=g.stages||{},_e=O.spec&&O.spec.stale,Ee=O.impl&&O.impl.stale,Te=O.plan||null,Be=g.route_source==="derived",pt=g.route||_.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Be?" detail-kv__v--derived":""}"
          title=${Be?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Be?"unset":pt}</span
        >
      </div>
      ${g.route!=="quick_fix"||Object.hasOwn(_,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${_.spec_review||"\uC5C6\uC74C"}${_e?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${g.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Te?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Te?.approval_receipt||"\uC5C6\uC74C"}${Te?.approval_state==="stale"?" \xB7 stale":Te?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${g.route!=="quick_fix"||Object.hasOwn(_,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${_.impl_review||"\uC5C6\uC74C"}${Ee?" \xB7 stale":""}</span
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
    `}let v={route:["quick_fix","spec_backed","full_plan"]};async function y(l,_){let g=_.target.value;if(l==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&g!=="full_plan"&&!window.confirm(`full_plan \u2192 ${g||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ce();return}await rt("update-workflow-meta",{id:d,key:l,value:g},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ce()}function k(l){let _=l.metadata||{};return c` ${((O,_e)=>{let Ee=v[O],Te=typeof _[O]=="string"?_[O]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${O}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${O}
          data-edit=${`wfmeta-${O}`}
          @change=${Be=>y(O,Be)}
        >
          <option value="" ?selected=${!Ee.includes(Te)}>
            ${_e}
          </option>
          ${Ee.map(Be=>c`<option value=${Be} ?selected=${Te===Be}>${Be}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function M(l,_){return I?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${z}
            @input=${Rt}
            @keydown=${g=>Lt(g,en,ft,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${en}
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
          @click=${dt}
        >
          ✎
        </button>
      </div>
    `}function Q(l){let _=Ht(l.created_at),g=Ht(l.updated_at);return!_&&!g?c``:c`
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
          ${Mg.map(g=>c`<option value=${g} ?selected=${g===l}>${g}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${tn}
        >
          ${Dg.map(g=>c`<option value=${String(g)} ?selected=${g===_}>
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
    `}function T(){if(!d)return c``;let l=p||{},_=String(l.id||d),g=l.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",O=De(),_e=l.status||"open",Ee=typeof l.priority=="number"?Math.max(0,Math.min(4,l.priority)):"",Te=l.description||"",Be={...l,metadata:{...l.metadata||{},...f}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${ae}
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
          ${Ou(Be)}
          ${Ru({metadata:Be.metadata,workspace_values:tt(),catalog:wt(),execution_defaults:He(),expanded:N,presets:mt()?.presets||[],preset_id:h,preset_busy:w,skipped_orchestration_keys:x},{onToggle:pt=>{N=pt,ce()},onEdit:(pt,Ut)=>{if(pt==="impl_runtime"||pt==="impl_model"||pt==="impl_effort"){Je(pt,Ut??"");return}Se(pt,Ut??"")},onPresetSelect:pt=>{h=pt,x=[],ce()},onPresetApply:()=>{Z()}})}
          ${qu({md:Be.metadata,catalog:Y,handlers:{onExecChange:Se}})}
          ${ge(_e,Ee)} ${Q(l)}
          ${Ie(Te)}
          ${hu(G,gt,{expanded:ee,draft:se,sending:Ae,error:re})}
          ${Xe(l)} ${$(l)} ${xt(l)}
          ${yt(l)} ${k(l)}
          ${_u(l,pe)}
          ${Vu({expanded:qe,loading:W,error:V,data:Me},{onToggle:te})}
          ${Gu(K(),bt,{total:O,expanded:Qe})}
        </div>
      </div>
    `}function ce(){Ve(T(),e)}return{load(l){l!==d&&(f={},h="",x=[],N=!1,F(),fe(),P(),ke()),d=l,p=null,S(),Tt(),J!==l&&ie(l)},clear(){d=null,p=null,f={},h="",w=!1,x=[],N=!1,F(),fe(),P(),ke(),Ce.close(),je.close(),Ve(c``,e)},destroy(){le&&(le(),le=null),Ne&&(Ne(),Ne=null),E&&(E(),E=null),document.removeEventListener("keydown",b),R||(Ce.destroy(),ue&&ue.parentNode&&ue.parentNode.removeChild(ue)),je.destroy(),Re.parentNode&&Re.parentNode.removeChild(Re),d=null,p=null,ke(),h="",w=!1,x=[],fe(),P(),Ve(c``,e)}}}function Yu(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},u=(d,p,f="")=>{n&&(n.textContent=d||"Unexpected Error"),r&&(r.textContent=p||"An unrecoverable error occurred.");let h=typeof f=="string"?f.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:u,close:i,getElement(){return t}}}function Fo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function $s(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function jo(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function Bo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Ng(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:Fo(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Zu(e,t){let n=Ng(e,t);return n?c`<button
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
            >${Bo(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${$s(n.deploy.elapsed_ms)}`:""}</span
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
  </div>`}function qg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function xs(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Uo(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function En(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,h)=>(f.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,u=s?qg(s.phase):null,d=s?.kind==="stale_work_backup_fresh",p=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${u||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:u,error:i,confirmation:p}}function ks(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
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
  </div>`}var Fg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Qu(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let u=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Fg[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Wo(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}var qo=3;function jg(e){return c`<div
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
        >`)}${s.map(p=>c`<span class="worker-dep worker-dep--warn">${p}</span>`)}${i?jg(i):""}
  </div>`}function Br(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Xu(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function zo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Bg(e){let t=Array.isArray(e.badges)?e.badges:[],n=Wt(e.usage),r=Ln(e.usage),s=on(e.done_at);return c`<div
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
              >`):r?c`<span class="worker-usage" title=${os(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${$s(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Kn(e){if(e.lane==="done"&&e.done_layout==="three_line")return Bg(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=Wt(e.usage),s=Ln(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,u=i?on(e.done_at):"",d=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",f=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",w=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,x=e.lane==="done"?"":Br(e.workflow),N=Xu(e.from_id),j=zo(e.priority),Y=c`<span class="worker-mini__title">${e.title}</span>`,J=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",L=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",I=n.map(fe=>fe===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${fe}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${fe===e.completion_badge&&e.completion_title||""}
          >${fe}</span
        >`),D=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",z=r.length>0?r.map(fe=>c`<span class="worker-usage" title=${fe.tooltip}
              >${fe.label}</span
            >`):s?c`<span class="worker-usage" title=${os(e.usage)}
            >${s}</span
          >`:"",A=o?c`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?c`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",U=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",F=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",ke=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ve=e.discard,ie=ve?.action||e.discard_action?c`<button
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
        </button>`:"",G=e.stale_work||null,xe=G?c`${G.can_resume||G.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${G.action_id}
            ?disabled=${G.locked}
          >
            기존 작업 이어가기
          </button>`:""}${G.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${G.action_id}
            ?disabled=${G.locked}
          >
            백업 후 새로 시작
          </button>`:""}${G.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${G.action_id}
            ?disabled=${G.locked}
          >
            다시 확인
          </button>`:""}`:"",Oe=G?c`<div class="worker-mini__stale">
        <strong>${G.title}</strong>
        <span>${G.summary}</span>
        <span>${G.cause}</span>
        ${G.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",re=e.revise_action?c`<button
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
        </button>`:"",se=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?c`<div class="worker-mini__exec">
          ${Wo(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",Ae=jr(e.dependency_chips,{lane:e.lane}),B=ks(e),ee=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ve?.operation||e.revise_action||G);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">
            ${h}${w}${j}${N}${Y}
          </div>
          <div class="worker-mini__row2">
            ${z}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${$s(e.work_ms)}</span
                >`:""}${I}${A}
            <span class="worker-mini__actions"
              >${U}${F}${ke}${ie}</span
            >
            ${Fr(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${d}${p}${h}${w}${j}${x}${N}${J}${L}${I}${f}${D}
            </div>
            <div class="worker-mini__body">${Y}${Oe}</div>
            ${Ae}${se}${ee?c`<div class="worker-mini__foot">
                  ${z}${A}
                  <span class="worker-mini__actions"
                    >${U}${F}${ke}${ie}${re}${xe}</span
                  >
                  ${ks(e)}
                </div>`:""}
            ${Fr(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${h}${w}${j}${x}${N}${Y}${J}${L}${I}${f}${D}${z}${A}${U}${F}${ke}${ie}
            </div>
            ${Ae}${se}${B} ${Fr(e)}`}
  </div>`}function bi(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),u=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),d=jr(e.dependency_chips,{lane:e.lane});return c`<div
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
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${zo(e.priority)}
      ${Br(a)}${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:""}${Xu(e.from_id)}
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?bi(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):Kn(r))}
          </div>`}
  </section>`}var Ju={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},ed={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function td(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function yi(e){for(let t of td(e))if(Object.hasOwn(Ju,t))return Ju[t];return null}function vi(e){let t=null;for(let n of td(e))Object.hasOwn(ed,n)&&(t=ed[n]);return t}function Ho(e){let t=yi(e),n=vi(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function nd(e,t){let n=yi(e)??yi(t),r=vi(t)??vi(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var rd=160;function Ug(e){return e.length>rd?`${e.slice(0,rd)}\u2026`:e}function Wg(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${Ug(e.command)}</code>`:""}
  </div>`}function zg(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Hg(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function sd(e){let t=e.failure?Ho(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${Wg(e.failure.cause_detail)}
          ${zg(e.failure.reason)}
          ${ks({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Gg(e){return e?c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}var Vg=new Set(["codex-runner"]);function Kg(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(h=>h&&!(typeof h.agent_type=="string"&&Vg.has(h.agent_type))),u=i.filter(h=>h&&h.state==="live"),d=i.filter(h=>h&&h.state!=="live"),p=jr(e.dependency_chips,{lane:"running"}),f=r?on(r.updated_at,t):"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
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
      </div>`:""}${p}`}function wi(e,t,n=null,r={}){let s=e.kind==="session",o=e.failed===!0,a=!!e.paused,i=o?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Hg(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=ns(e),p=Wt(e.usage),f=Ln(e.usage),h=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,w=e.base_exception||null,x=e.landing,N=e.attempt_id&&e.attempt_id===n,j=r.monitor||null,Y=Gg(j),J=Kg(j,t,a,s?{updated_at:e.updated_at??null}:null),L=s&&e.workflow?.chips?.exec_receipt||null,I=L?c`<div class="rtile__meta">
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
      ${zo(e.priority)}${Br(e.workflow)}${Y}${d?c`<span class="rtile__resumed" title=${d}>↻</span>`:""}
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
    ${J}${e.rollup?so(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Oa}):""}
    ${x?c`<div class="rtile__landing">
          <span
            class="merge-step${x.failed?" merge-step--failed":""}"
            style=${`--progress: ${x.percent}%`}
            >${x.label}${x.index>0?c`<span class="merge-step__n"
                  >${x.index}/${x.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${s?I:u||p.length>0||f||h||w?c`<div class="rtile__meta">
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
                    title=${os(e.usage)}
                    >${f}</span
                  >`:""}
          </div>`:""}
    ${D} ${ks(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${o||a?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function ki(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>wi(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var $i=new Set(["unavailable","not_applicable"]);function Yn(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function od(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Zn(e,t){return t===null?null:`${Vn[e]}: ${t.display} (${Io[t.source]})`}function xi(e){return e.filter(t=>t!==null).join(`
`)}function Go(e){if(typeof e!="object"||e===null)return null;let t=ur(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:xi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Vn.orchestration_model,e.model),n(Vn.orchestration_effort,e.effort),n(Vn.orchestration_speed,e.speed)])}}function _r(e,t){let n=Yn(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Yn(e,"orchestration_effort"),s=Yn(e,"orchestration_speed"),o=od([wn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:xi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Zn("orchestration_model",n),Zn("orchestration_effort",r),Zn("orchestration_speed",s)])}}function Yg(e,t){return e===null||e.value===null||$i.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Zg(e){return e===null||$i.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Qg(e){return e===null?null:e.value==="auto"?"auto":$i.has(e.resolution)?null:e.display}function Qn(e,t){if(typeof e!="object"||e===null)return null;let n=Yn(e,"impl_dispatch"),r=Yn(e,"impl_runtime"),s=Yn(e,"impl_model"),o=Yn(e,"impl_effort"),a=Yn(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":od([Yg(r,t??null),Zg(s),Qg(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:xi(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Zn("impl_dispatch",n),Zn("impl_runtime",r),Zn("impl_model",s),Zn("impl_effort",o),Zn("impl_speed",a)])}}var Jt="",Xg=["impl_runtime","impl_model","impl_effort"],Jg=5,Vo=1;function qn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ko(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(P=>de(P,"error",4e3)),o={},a={},i=[],u=!1,d=null,p={},f="",h="",w=!1,x=!1,N=!1,j=null,Y=!1;function J(){let P=t.queue?t.queue():null;return qn(P)?P:null}function L(){let P=J();return P?P.runner_catalog:null}function I(){let P=J();return P&&qn(P.execution_defaults)?P.execution_defaults:null}function D(){let P=t.implPresetStore?.get();return qn(P)&&Array.isArray(P.presets)?P:null}function z(){return r===null?{}:{root_dir:r}}async function A(P,X){return Y||!n?null:await n(P,X)}function U(P){P&&qn(P.queue)&&t.onQueueAdopt?.(P.queue)}async function F(P,X){let te=J();if(!te||Y)return null;let K=await A(P,{...X,...z(),expected_revision:te.revision});if(U(K),r!==null&&K&&K.conflict){let De=K.queue&&typeof K.queue.revision=="number"?K.queue.revision:J()?.revision??te.revision;K=await A(P,{...X,...z(),expected_revision:De}),U(K)}return K}async function ke(){u=!0,be();try{let P=await A("get-session-defaults",{...z()});o=qn(P?.values)?{...P.values}:{},a={...o},i=Array.isArray(P?.warnings)?P.warnings:[]}catch(P){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}finally{u=!1,be()}}async function ve(){let P=Au(o,a);if(Object.keys(P).length!==0){try{let X=await A("set-session-defaults",{values:P,...z()});o=qn(X?.values)?{...X.values}:{},a={...o},i=Array.isArray(X?.warnings)?X.warnings:[]}catch(X){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}be()}}function ie(P,X){if(Xg.includes(P)){Oe(P,X);return}X===Jt?delete a[P]:a[P]=X,be(),ve()}function G(){let P=Ke().orchestration_model,X=Xt({global:{orchestration_model:P??void 0},execution_defaults:I(),runner_catalog:L()}).orchestration_model.value;return X?wn(L(),X):null}function xe(P,X){typeof X=="string"&&X.length>0?a[P]=X:delete a[P]}function Oe(P,X){let te=X===Jt?void 0:X,K=$u({impl_runtime:P==="impl_runtime"?te:a.impl_runtime,impl_model:P==="impl_model"?te:a.impl_model,impl_effort:P==="impl_effort"?te:a.impl_effort},L(),G());xe("impl_runtime",K.impl_runtime),xe("impl_model",K.impl_model),xe("impl_effort",K.impl_effort),be(),ve()}async function re(){let P=J();if(!P)return;let X={orchestration_model:P.orchestration_model??null,orchestration_effort:P.orchestration_effort??null,orchestration_speed:P.orchestration_speed??null},te=Su(X,{...X,...p});if(Object.keys(te).length!==0){try{let K=await F("worker-queue-set-orchestration-defaults",{values:te});if(K&&K.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}p={}}catch(K){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}be()}}function se(P,X){p[P]=X===Jt?null:X,be(),re()}function Ae(P){if(d=P,!P){be();return}let X=L(),te=Ke(),K=te.orchestration_model;K&&!vs(X,P).includes(K)&&(p.orchestration_model=null,K=null);let De=te.orchestration_effort;De&&!di(X,P,K||cn).includes(De)&&(p.orchestration_effort=null),be(),re()}async function B(P){if(!(!J()||P<Vo)){try{await F("worker-queue-set-slots",{slots:P})}catch(X){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}be()}}async function ee(P){if(!(!J()||P<Vo||P>Jg)){try{await F("worker-queue-set-serial-lane-count",{count:P})}catch(X){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}be()}}async function fe(P,X){let te=P==="auto_advance"?"worker-automation-toggle":P==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await F(te,{on:X})}catch(K){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}be()}function $e(){let P={},X=Ke();for(let te of Co){let K=Nn.includes(te)?X[te]:a[te];typeof K=="string"&&K.length>0&&(P[te]=K)}return P}async function we(){let P=D();if(!P)return;let X=$e();if(Object.keys(X).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let te=(P.presets||[]).find(De=>De.id===f),K=h.trim()||(te?te.name:"");if(!K){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let De=te?await A("impl-preset-update",{expected_revision:P.revision,id:te.id,name:K,settings:X}):await A("impl-preset-create",{expected_revision:P.revision,name:K,settings:X});if(De&&De.applied){if(h="",!te&&Array.isArray(De.presets)){let Qe=De.presets.find(lt=>lt.name===K);f=Qe?Qe.id:f}be()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),be()}catch(De){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${De instanceof Error?De.message:String(De)}`)}}async function Ue(){let P=D();if(!(!P||f.length===0))try{let X=await A("impl-preset-delete",{expected_revision:P.revision,id:f});X&&X.applied?(f="",be()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),be())}catch(X){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}}function me(P){o=qn(P.values)?{...P.values}:{},a={...o},i=Array.isArray(P.warnings)?P.warnings:[],qn(P.queue)&&(t.onQueueAdopt?.(P.queue),p={})}async function Ze(){let P=D(),X=J();if(!P||!X||f.length===0)return;let te=K=>({preset_id:f,expected_revision:P.revision,expected_queue_revision:K,...z()});try{let K=await A("apply-impl-preset-global",te(X.revision));if(K&&K.applied&&me(K),r!==null&&K&&K.queue_applied===!1){let De=K.queue&&typeof K.queue.revision=="number"?K.queue.revision:J()?.revision??X.revision;K=await A("apply-impl-preset-global",te(De)),K&&K.applied&&me(K)}K&&K.applied?K.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):K&&K.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(K){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}be()}async function gt(){x=!0,N=!1,be();try{let P=await A("get-worker-system-prompt",{});!P||typeof P!="object"||Array.isArray(P)?N=!0:j=P}catch{N=!0}finally{x=!1,be()}}function R(){if(w=!w,w&&!j){gt();return}be()}function ue(){let P=Mr({loading:x,error:N});if(P)return P;if(!j)return"";let X=Array.isArray(j.variants)?j.variants:[];return c`<div class="settings-dialog__sp-body">
      ${j.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${j.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${X.map(te=>c`<div class="settings-dialog__sp-variant" data-variant=${te.key}>
            <div class="settings-dialog__sp-cond">${te.condition}</div>
            ${Dn(te.label,te.system_prompt)}
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
    </section>`}function Re(P,X,te,K,De,Qe,lt){let ot=De[P]??Jt,ct=pi(P,te,De,I(),L(),lt),ht=ct.options.find(tt=>tt.value===ot),bt=ot===Jt?ct.full_value:ht?.full_value;return c`<select
        class=${ot===Jt?"settings-dialog__unset":""}
        data-key=${P}
        aria-label=${X}
        title=${bt||""}
        ?disabled=${Qe===!0||ct.disabled}
        .value=${fr(String(ot))}
        @change=${tt=>K(P,String(tt.target.value))}
      >
        <option value=${Jt} ?selected=${ot===Jt}>
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
      ${ot===Jt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function je(P,X,te,K,De,Qe=!1,lt){return c`<div
      class=${`settings-dialog__row${Qe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        ${Re(P,X,te,K,De,Qe,lt)}
      </span>
    </div>`}function qe(P,X,te,K,De){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${X}-on)`}
        ></i>
        ${P}
      </span>
      <span class="settings-dialog__controls">
        ${Re(te,`${P} \uBAA8\uB378`,K,ie,a,!1)}
        ${Re(De,`${P} effort`,Lo,ie,a,!1)}
      </span>
    </div>`}function W(P,X,te,K){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${K?" is-on":""}`}
          data-automation=${P}
          aria-pressed=${K?"true":"false"}
          aria-label=${X}
          @click=${()=>fe(P,!K)}
        >
          ${K?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${te}</span>
      </span>
    </div>`}function V(P,X,te,K){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${P}>
          <button
            type="button"
            aria-label=${`${X} \uAC10\uC18C`}
            @click=${()=>K(te-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${te}</span>
          <button
            type="button"
            aria-label=${`${X} \uC99D\uAC00`}
            @click=${()=>K(te+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Me(P){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${P.rows.length>0?`\uBCC0\uACBD ${P.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${P.rows.map(X=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${X.kind}
          >
            <span class="settings-dialog__preset-diff-label">${X.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${X.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${X.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${P.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${P.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Ke(){let P=J(),X={};for(let te of Nn)X[te]=Object.prototype.hasOwnProperty.call(p,te)?p[te]:P&&typeof P[te]=="string"?P[te]:null;return X}function Ge(){let P=L(),X=a.impl_runtime,te=a.impl_model,K=D(),De=J(),Qe=Ke(),lt=vs(P,d),ot=Nr(P,void 0).filter(he=>he!==cn),ct=di(P,d,Qe.orchestration_model||cn).filter(he=>he!==cn),ht=f?(K?.presets||[]).find(he=>he.id===f):null,bt=ht?xu($e(),qn(ht.settings)?ht.settings:{}):null,tt=De&&typeof De.slots=="number"?De.slots:Vo+1,Tt=De&&typeof De.serial_lane_count=="number"?De.serial_lane_count:Vo,wt=I()?.supported===!0,He=pi("workflow_mode",bs,a,I(),P);return c`
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
                .value=${fr(f)}
                @change=${he=>{f=String(he.target.value),be()}}
              >
                <option value="" ?selected=${f===""}>
                  실행 프리셋…
                </option>
                ${(K?.presets||[]).map(he=>c`<option
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
                .value=${fr(h)}
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
                    .value=${fr(d||Jt)}
                    @change=${he=>{let mt=String(he.target.value);Ae(mt===Jt?null:mt)}}
                  >
                    <option value=${Jt} ?selected=${!d}>
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
              ${je("orchestration_model","\uBAA8\uB378",lt,se,Qe)}
              ${je("orchestration_effort","effort",ct,se,Qe)}
              ${je("orchestration_speed","\uC18D\uB3C4",hs,se,Qe)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Jt}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>ie("workflow_mode",Jt)}
                    >
                      ${He.unset_label}
                    </button>
                    ${a.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${bs.map(he=>c`<button
                          type="button"
                          data-mode=${he}
                          aria-pressed=${String(a.workflow_mode===he)}
                          @click=${()=>ie("workflow_mode",he)}
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
              ${qe("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",ys,"spec_review_effort")}
              ${qe("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Oo,"plan_review_effort")}
              ${qe("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",ys,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${je("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ro,ie,a)}
              ${je("impl_model","\uBAA8\uB378",Nr(P,X),ie,a)}
              ${je("impl_effort","effort",qr(P,X,te),ie,a)}
              ${je("impl_speed","\uC18D\uB3C4",hs,ie,a)}
              ${je("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",ot,ie,a,!1,{...a,...Qe})}
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
              ${V("slots","\uB3D9\uC2DC \uC2E4\uD589",tt,he=>B(he))}
              ${V("serial-lane-count","\uC9C1\uB82C \uB808\uC778",Tt,he=>ee(he))}
            </div>
            ${Ce()}
          `}
    `}function be(){Y||Ve(Ge(),e)}return{load(){return p={},ke()},render:be,sessionDraft:()=>({...a}),destroy(){Y=!0,Ve(c``,e)}}}function As(e){return c`<svg
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
  </svg>`}function ad(){return As(xr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function id(){return As(xr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function ld(){return As(xr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function cd(){return As(xr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function ud(){return As(xr`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function dd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function pd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Wt(po(t));let n={};for(let i of On)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let u=i&&i.usage;if(u&&typeof u=="object"){let d=!1;for(let p of On){let f=u[p];typeof f=="number"&&Number.isFinite(f)&&(n[p]+=f,r=!0,d=!0)}if(d){o+=1;let p=u.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Ln(n):null}function kn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ur(e,t){let n=kn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function eh(e,t){if(!kn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function th(e){if(!kn(e)||!kn(e.execution_defaults)||!kn(e.runner_catalog)||!kn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=Xt({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=wn(e.runner_catalog,n.orchestration_model.value??""),s=_r(n,e.runner_catalog),o=Qn(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function fd(e,t){let n=t.notify||(B=>de(B,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let u=document.createElement("div");u.className="mon2-deck__panel-body",s.append(o,u),e.appendChild(s);let d=null,p=null,f=null,h=new Map;function w(){let B=t.workspacesState?t.workspacesState():[];return Array.isArray(B)?B.filter(ee=>kn(ee)):[]}function x(B){return w().find(ee=>ee.root_dir===B)||null}function N(B){return eh(x(B),h.get(B))}function j(){for(let B of w()){let ee=h.get(B.root_dir);ee&&typeof ee.revision=="number"&&typeof B.revision=="number"&&B.revision>=ee.revision&&h.delete(B.root_dir)}}async function Y(B,ee,fe){let $e=t.transport,we=N(ee);if(!(!$e||!kn(we))){try{let Ue=await $e(B,{...fe,root_dir:ee,expected_revision:we.revision});if(kn(Ue?.queue)&&h.set(ee,Ue.queue),Ue&&Ue.conflict){let me=kn(Ue.queue)&&typeof Ue.queue.revision=="number"?Ue.queue.revision:N(ee)?.revision;Ue=await $e(B,{...fe,root_dir:ee,expected_revision:me}),kn(Ue?.queue)&&h.set(ee,Ue.queue)}}catch(Ue){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ue instanceof Error?Ue.message:String(Ue)}`)}re()}}function J(B){d!==B&&(d=B,t.onFocusChange?.(d),re())}function L(B){J(d===B?null:B)}function I(B){if(p===B){z();return}D(),p=B;let ee=x(B);a.textContent=`${ee?.name||B} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,f=Ko(u,{root_dir:B,queue:()=>N(B),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:fe=>{h.set(B,fe),re()}}),f.load(),re()}function D(){f?.destroy(),f=null}function z(B){D(),p=null,s.hidden=!0,a.textContent="",B!==!0&&re()}let A=()=>z();i.addEventListener("click",A);function U(B){B.key==="Escape"&&d!==null&&J(null)}document.addEventListener("keydown",U);function F(B,ee){let fe=Math.max(ee,B,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ee}\uAC1C \uC911 ${B}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:fe},($e,we)=>we<B?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function ke(B){let ee=B.auto_advance===!0,fe=B.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ee?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ee?"true":"false"}
        aria-label=${`${B.name} \uC790\uB3D9\uD654`}
        title=${ee?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ee?id():ad()}
        <span class="mon2-deck__op-label">자동화</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${fe?" is-on":""}`}
        data-act="merge"
        aria-pressed=${fe?"true":"false"}
        aria-label=${`${B.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${fe?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${ld()}
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
        ${ud()}
      </button>`}function ve(B){let ee=th(B);return ee?c`<div class="mon2-deck__chips">
      ${ee.orchestration?c`<span class="mon2-deck__chip" title=${ee.orchestration.title}
            >오케 ${ee.orchestration.text}</span
          >`:""}
      ${ee.worker?c`<span class="mon2-deck__chip" title=${ee.worker.title}
            >워커 ${ee.worker.text}</span
          >`:""}
    </div>`:""}function ie(B){let ee=Ur(B,"running"),fe=typeof B.slots=="number"?B.slots:1;return c`<div
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
        ${cd()} ${F(ee,fe)}
        <span class="mon2-deck__counts"
          >${ee}/${fe} 실행 · 대기 ${Ur(B,"queue")} · PR
          ${Ur(B,"pr_wait")}${Ur(B,"session_active")>0?` \xB7 \uC138\uC158 ${Ur(B,"session_active")}`:""}</span
        >
      </div>
      <div class="mon2-deck__ops">${ke(B)}</div>
      ${ve(B)}
    </div>`}function G(B){let ee=t.doneItems?t.doneItems():[],fe=t.rangeLabel?t.rangeLabel():"",$e=pd(Array.isArray(ee)?ee:[]),we=Ue=>B.reduce((me,Ze)=>me+Ur(Ze,Ue),0);return c`<div
      class="mon2-deck__total"
      title=${`visible \uB808\uD3EC ${B.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${fe}`}
    >
      <div class="mon2-deck__total-counts">
        실행 ${we("running")} · 대기 ${we("queue")} · PR
        ${we("pr_wait")}${we("session_active")>0?` \xB7 \uC138\uC158 ${we("session_active")}`:""}
        · ${fe} 완료
        ${Array.isArray(ee)?ee.length:0}
      </div>
      ${$e===null?"":c`<div class="mon2-deck__total-tokens">
            ${typeof $e=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${dd(fe)}
                  >τ ${$e}</span
                >`:$e.map(Ue=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${Ue.provider}
                      title=${Ue.tooltip}
                      >τ ${Ue.label}</span
                    >`)}
          </div>`}
    </div>`}function xe(){let B=w();return B.length===0?"":c`<div class="mon2-deck__row">
      ${G(B)}
      <div class="mon2-deck__strip">
        ${B.map(ee=>ie(ee))}
      </div>
    </div>`}function Oe(){d!==null&&!x(d)&&(d=null,t.onFocusChange?.(null))}function re(){j(),Oe(),p!==null&&!x(p)&&z(!0),Ve(xe(),r),f?.render()}function se(B){let ee=B.target;if(!ee||typeof ee.closest!="function")return;let fe=ee.closest("[data-root-dir]");if(!fe)return;let $e=fe.getAttribute("data-root-dir")||"",we=ee.closest("[data-act]")?.getAttribute("data-act");if(we==="worker"){t.gotoWorkerTab?.($e);return}if(we==="auto"){Y("worker-automation-toggle",$e,{on:N($e)?.auto_advance!==!0});return}if(we==="merge"){Y("worker-merge-auto-toggle",$e,{on:N($e)?.auto_merge!==!0});return}if(we==="gear"){I($e);return}L($e)}function Ae(B){if(B.key!=="Enter"&&B.key!==" ")return;let ee=B.target;if(!ee||typeof ee.closest!="function")return;let fe=ee.closest('[data-root-dir][role="button"]');!fe||fe!==ee||(B.preventDefault(),L(fe.getAttribute("data-root-dir")||""))}return r.addEventListener("click",se),r.addEventListener("keydown",Ae),{render:re,focusRoot:()=>d,panelRoot:()=>p,destroy(){document.removeEventListener("keydown",U),r.removeEventListener("click",se),r.removeEventListener("keydown",Ae),i.removeEventListener("click",A),D(),Ve(c``,r),e.replaceChildren()}}}var nh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",rh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694";function Ai(e,t){return`${e}\0${t}`}function sh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function oh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function ah(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function ih(e,t){let n=new Set(t),r=new Map,s=new Map;for(let i of n){let u=Array.from(new Set((e.get(i)||[]).filter(d=>d!==i&&n.has(d))));r.set(i,u.length);for(let d of u){let p=s.get(d);p?p.push(i):s.set(d,[i])}}let o=[],a=Array.from(n).filter(i=>r.get(i)===0).sort();for(;a.length>0;){let i=a.shift();o.push(i);for(let u of(s.get(i)||[]).slice().sort()){let d=(r.get(u)||0)-1;r.set(u,d),d===0&&a.push(u)}}for(let i of t)o.includes(i)||o.push(i);return o}function lh(e,t){let n=new Set;for(let[a,i]of t)for(let u of i)n.add(Ai(a,u));let r=new Map,s=new Map;for(let a of e){let i=Ai(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Ai(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function ch(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function uh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Si(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function _d(e,t,n){let r=oh(n.blocked_by_map),s=[],o=null,a=w=>{let x=n.owner_of.get(w);return typeof x!="string"||x.length===0?(o=sh(w),null):x},i=(w,x)=>{if(o!==null||w===x)return;let N=r.get(w)||[];if(!N.includes(x))return;let j=a(w);j!==null&&(r.set(w,N.filter(Y=>Y!==x)),s.push({type:"dep-remove",a:w,b:x,root_dir:j}))},u=(w,x)=>{if(o!==null||w===x)return;let N=r.get(w)||[];if(N.includes(x))return;let j=a(w);if(j!==null){if(ah(r,x,w)){o=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${w}\uAC00 \uC774\uBBF8 ${x}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}r.set(w,[...N,x]),s.push({type:"dep-add",a:w,b:x,root_dir:j})}},d=()=>{let w=n.lane_order.get(e.lane_id||"")||[],x=new Set(w),N=(r.get(e.bead_id)||[]).filter(Y=>x.has(Y)),j=w.filter(Y=>(r.get(Y)||[]).includes(e.bead_id));for(let Y of N)i(e.bead_id,Y);for(let Y of j)i(Y,e.bead_id);for(let Y of N)for(let J of j)u(J,Y);return w.filter(Y=>Y!==e.bead_id)},p=(w,x)=>{let N=n.lane_order.get(w)||[],j=N.indexOf(e.bead_id),Y=ih(r,N.filter(D=>D!==e.bead_id)),J=w.startsWith("pending:")?Y.length:Math.max(0,Math.min(Y.length,j>=0&&x>j?x-1:x)),L=J>0?Y[J-1]:null,I=J<Y.length?Y[J]:null;if(L===null){I!==null&&u(I,e.bead_id);return}u(e.bead_id,L),I!==null&&(r.get(I)||[]).includes(L)&&(i(I,L),u(I,e.bead_id))},f=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:nh};if(t.kind==="chain"&&e.kind==="repo-serial")return{refused:rh};if(e.kind==="chain"&&d(),t.kind==="chain"&&p(t.lane_id,t.marker_index),o!==null)return{refused:o};let h=[];if(t.kind==="candidate")e.kind!=="candidate"&&h.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=ch(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")h.push(Si(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let x=n.parallel_rows,N=x[Math.max(0,Math.min(x.length,t.marker_index))];if(!(!!N&&N.bead_id===e.bead_id)&&uh(n,e.root_dir)&&f!==void 0){let Y=f>w?w:w-1;Y>=0&&Y!==f&&h.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:Y},root_dir:e.root_dir})}}}else if(t.kind==="chain")e.kind==="candidate"&&h.push(Si(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0));else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(f!==void 0&&t.index!==f){let w=f>t.index?t.index:t.index-1;w>=0&&w!==f&&h.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else h.push(Si(e.bead_id,e.root_dir,t.index,t.lane_id));return{ops:[...lh(s,n.blocked_by_map),...h]}}var md={running:3,paused:2,failed:1};function gd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let p=t.get(a.bead_id),f=typeof p=="number"&&p>0&&typeof a.finished_at=="number"&&p>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!f&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let u=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let p=md[d.run_state],f=md[i];if(p>f||p===f&&(d.started_at??0)>(u??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:u})}return{winners:o,resumed_from_ids:r}}function Yo(e){return e.replace(/\/+$/,"")}function dh(e,t){let n=Yo(e),r=Yo(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Zo(e,t){let n=new Set;for(let r of e)for(let s of t){if(!dh(r,s))continue;let o=Yo(r),a=Yo(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}var hd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Ss=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Qo(e,t){let n=hd.find(s=>s.step===e);if(!n)return null;let r=hd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function bd(e){let t=Ss.findIndex(n=>n.step===e);return Ss.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function mr(e){let t=Ss.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function ph(e){let t=Ss.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Ss.length}}function Xo(e){let t=ph(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ti=new Set(["queued","running","retry_pending","repairing"]),yd=new Set(["failed","succeeded"]),fh={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Es={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},_h={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Es.base_containment,child_sweep:Es.child_sweep,branch_cleanup:Es.branch_cleanup,parent_close:Es.parent_close};function mh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function gh(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ti,...yd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function hh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=d=>d.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",u=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(u)}function Ei(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=fh[s];if(!o)return null;let a=Qo(n,`${r} ${o}`);return a?{...a,active:Ti.has(s),failed:s==="failed"}:null}function bh(e){return!e||typeof e!="object"?null:_h[e.step]||null}function Ts(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=bh(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=mh(e.merge_sha)?e.merge_sha:null,u=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(x=>x&&typeof x=="object"&&gh(x,t,i)).sort(hh):[],d=a?u:[],p=d.find(x=>Ti.has(x.state));if(p)return Ei(p);if(s)return s.step==="repo_operations"&&u[0]?Ei(u[0],!0):null;let f=d.find(x=>yd.has(x.state)?x.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return Ei(f);if(r){let x=Qo(r.step,r.label);return x?{...x,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Es[e.cleanup_cursor]:null;if(!h)return null;let w=Qo(h.step,h.label);return w?{...w,active:!0,failed:!1}:null}function Jo(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function Ci(e,t){return`${e}\0${t}`}function vd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Ri(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function yh(e,t){return e==="internal"&&t===void 0}function Wr(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function wd(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Wr(s)})`,location_label:Wr(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Ri(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:yh(a,s)}}function kd(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let u of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=Ci(i.root_dir,u.id);n.set(d,{root_dir:i.root_dir,workspace_name:i.name,lane:u.id}),s.set(d,[]);for(let p of Array.isArray(u.items)?u.items:[])r.set(p.id,d)}for(let i of t)for(let u of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=Ci(i.root_dir,u.id),p=Array.isArray(u.items)?u.items[0]:null,h=!!p&&p.queue_index===0&&(!Array.isArray(u.occupied_by)||u.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],w=s.get(d);if(w)for(let x of h){let N=r.get(x);N&&N!==d&&!w.includes(N)&&w.push(N)}}let o=(i,u)=>{let d=new Set,p=[i];for(;p.length>0;){let f=p.pop();if(f===u)return!0;!f||d.has(f)||(d.add(f),p.push(...s.get(f)||[]))}return!1},a=new Map;for(let[i,u]of s){let d=[];for(let p of u){let f=n.get(p);o(p,i)&&f&&d.push(f)}d.length>0&&a.set(i,d)}return a}function $d(e,t){return Ci(e,t)}var xd=1,Cs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Li=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],zr={show_blocked:!0,spec:"all"},Ad={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function vh(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function wh(e,t){let{winners:n,resumed_from_ids:r}=gd(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,u=a.run_state,d=a.started_at,p=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:u,started_at:d,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:pn(e,i.bead_id),can_pause:u==="running"&&p,can_resume:u!=="running"&&p&&!r.has(i.attempt_id)})}return s}function Sd(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Et(e){return e&&typeof e=="object"?e:{}}function kh(e,t,n){let r=Et(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=h=>Xt({pin:h,global:a,execution_defaults:s,runner_catalog:o,route:n}),u,d;try{u=i(r),d=i(null)}catch{return null}let p=Ed(_r(u,o),_r(d,o)),f=Ed(Qn(u,null),Qn(d,null));return p||f?{orchestration:p,worker:f}:null}function Ed(e,t){return!e||t&&t.text===e.text?null:e}function $h(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function xh(e,t){let n=t.get(e);return n?{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${Wr(n)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`}:null}function Ah(e,t,n){let r=new Map;for(let u of e)r.set(u,Array.from(n.get(u)||[]).filter(d=>e.includes(d)).length);let s=[],o=new Map,a=e.filter(u=>(r.get(u)||0)===0).sort();for(let u of a)o.set(u,0);let i=[...a];for(;i.length>0;){let u=i.shift();s.push(u);let d=Array.from(t.get(u)||[]).filter(f=>e.includes(f)).sort(),p=(o.get(u)||0)+(d.length>1?1:0);for(let f of d){let h=(r.get(f)||0)-1;r.set(f,h);let w=o.get(f);o.set(f,w===void 0?p:Math.min(w,p)),h===0&&i.push(f)}}return{order:s,indent:o,cycle:s.length!==e.length}}function Sh(e,t,n){let r=new Map,s=new Map,o=new Set,a=(p,f,h)=>{let w=p.get(f);w?w.add(h):p.set(f,new Set([h]))},i=p=>t.get(p)?.lane==="done";for(let[p,f]of e)if(!i(p))for(let h of f)h===p||i(h)||(o.add(h),o.add(p),a(r,h,p),a(s,p,h));let u=new Set,d=[];for(let p of Array.from(o).sort()){if(u.has(p))continue;let f=[],h=[p];for(u.add(p);h.length>0;){let L=h.pop();f.push(L);for(let I of[...r.get(L)||[],...s.get(L)||[]])u.has(I)||(u.add(I),h.push(I))}if(f.length<2)continue;let w=f.map(L=>t.get(L));if(w.every(L=>!!L&&/^s[1-5]$/.test(L.lane||""))&&w.every(L=>L&&w[0]&&L.root_dir===w[0].root_dir&&L.lane===w[0].lane))continue;let{order:N,indent:j,cycle:Y}=Ah(f.slice().sort(),r,s),J=Y?f.slice().sort():N;d.push({key:f.slice().sort().join("\0"),cycle:Y,nodes:J.map(L=>{let I=t.get(L);return{id:L,workspace_name:I?I.workspace_name:"",root_dir:I?I.root_dir:"",location_label:I?Wr(I):Td(L,n),indent:Y?0:j.get(L)||0}})})}return d}function Td(e,t){let n=Ri(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Cd(e,t,n){let r=t.get(e);if(!r)return Td(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Wr(r)}function Eh(e,t,n){let r=[];for(let s of n.get(e)||[])s!==e&&t.has(s)&&!r.includes(s)&&r.push(s);return r}function Th(e,t,n,r,s,o,a){let i=(f,h,w,x,N=!1)=>{let j=r.get(f),Y=j&&j.lane==="parallel"&&typeof j.position=="number"?j.position-1:null;return{id:f,title:o.get(f)||f,workflow:a.get(f)||null,root_dir:j?j.root_dir:"",workspace_name:j?j.workspace_name:"",seq:h,indent:w,predecessors:x,location_label:Cd(f,r,s),draggable:!N&&Y!==null,...Y!==null?{queue_index:Y}:{}}},u=[];for(let f of e.slice().sort((h,w)=>h.key<w.key?-1:1)){let h=new Set(f.nodes.map(w=>w.id));u.push({lane_id:`chain:${f.key}`,label:"",pending:!1,cycle:f.cycle,rows:f.nodes.map((w,x)=>i(w.id,x+1,f.cycle?0:w.indent,f.cycle?[]:Eh(w.id,h,n),f.cycle))})}let d=new Set;for(let f of u)for(let h of f.rows)d.add(h.id);let p=[];return t.forEach((f,h)=>{let w=f&&typeof f.seed=="string"&&f.seed.length>0?f.seed:null;w!==null&&d.has(w)||(p.push(h),u.push({lane_id:`pending:${h}`,label:"",pending:!0,cycle:!1,rows:w===null?[]:[i(w,1,0,[])]}))}),u.forEach((f,h)=>{f.label=`\uC5F0\uACB0 ${h+1} \xB7 \uB808\uD3EC \uAC04`}),{chain_lanes:u,pending_lanes_kept:p}}function Ch(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Rh(e,t,n,r,s){let o=new Map;for(let i of[...e.running,...e.queue,...e.runnable]){if(!t.has(i.root_dir))continue;let{scope:u,state:d}=Ch(i,t,n);if(d!==void 0&&(i.scope_state=d),u.length===0)continue;let p=o.get(i.root_dir);p?p.push({item:i,scope:u}):o.set(i.root_dir,[{item:i,scope:u}])}let a=(i,u,d)=>{let p={id:u.id,title:u.title,location_label:Cd(u.id,r,s),prefixes:d};i.overlap_chips?i.overlap_chips.push(p):i.overlap_chips=[p]};for(let i of o.values())for(let u=0;u<i.length;u+=1)for(let d=u+1;d<i.length;d+=1){let p=Zo(i[u].scope,i[d].scope);p.length!==0&&(a(i[u].item,i[d].item,p),a(i[d].item,i[u].item,p))}}function Oi(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ea(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ii(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...zr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Cs.some(R=>R.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let R of s)R&&typeof R.root_dir=="string"&&u.set(R.root_dir,R);let d=[],p=[],f=[],h=[],w=[],x=[],N=new Map,j=new Map,Y=new Map,J=new Map,L=new Map,I=new Map,D=new Map,z=new Map,A=new Map;for(let R of r){if(!R||typeof R.root_dir!="string")continue;let ue=R.root_dir,Ce=R.name||ue,Re=u.get(ue),je=Re&&typeof Re.revision=="number"?Re.revision:typeof R.revision=="number"?R.revision:0,qe=Et(R.attempts),W=Et(R.bead_titles);for(let[b,S]of Object.entries(W))typeof S=="string"&&S.length>0&&z.set(b,S);let V=Et(R.bead_times),Me=Et(R.pr_observations),Ke=Et(R.admission),Ge=Et(R.revise_parked),be=Et(R.merge_queue_state),P=Et(R.cleanup_failed),X=Et(R.discard_operations),te=Et(R.bead_blocked_by);Object.hasOwn(R,"bead_scope")&&I.set(ue,Et(R.bead_scope));let K=Et(R.bead_workflow);for(let[b,S]of Object.entries(K))S&&typeof S=="object"&&A.set(b,S);let De=Et(R.pr_activity),Qe=Array.isArray(R.repo_operations)?R.repo_operations:[],lt=Array.isArray(R.merge_queue)?R.merge_queue:[],ot=new Set(lt.filter(b=>b&&typeof b.bead_id=="string").map(b=>b.bead_id)),ct=new Map(lt.filter(b=>b&&typeof b.bead_id=="string").map(b=>[b.bead_id,b])),ht=Array.isArray(R.queue)?R.queue:[],bt=(Array.isArray(R.serial_lanes)?R.serial_lanes:[]).filter(b=>b&&/^s[1-5]$/.test(b.id)&&Array.isArray(b.entries)),tt=Et(R.lane_states),Tt=typeof R.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(R.serial_lane_count))):Math.min(5,bt.length);Y.set(ue,Tt),J.set(ue,ht.length);let wt=new Map(bt.map(b=>[b.id,b])),He=new Map;for(let b of bt)for(let S of b.entries)S&&typeof S.bead_id=="string"&&He.set(S.bead_id,b.id);for(let[b,S]of Object.entries(te))Array.isArray(S)&&L.set(b,S.filter(H=>typeof H=="string"&&H.length>0));let he=Array.isArray(R.done)?R.done:[];for(let b of he)b&&typeof b.bead_id=="string"&&x.push({id:b.bead_id,root_dir:ue,workspace_name:Ce});let mt=new Map;for(let b of he)b&&typeof b.bead_id=="string"&&typeof b.added_at=="number"&&mt.set(b.bead_id,b.added_at);let $t=b=>({id:b,title:W[b]||b,root_dir:ue,workspace_name:Ce,expected_revision:je,draggable:!1,...Et(V[b]).created_at?{created_at:Et(V[b]).created_at}:{},...Et(V[b]).updated_at?{updated_at:Et(V[b]).updated_at}:{}}),nt=new Set;for(let[b,S]of wh(qe,mt))nt.add(b),p.push({...$t(b),lane:"running",...He.has(b)?{serial_lane_id:He.get(b)}:{},attempt_id:S.attempt_id,run_state:S.run_state,status:S.status||void 0,workflow:K[b]||null,can_pause:S.can_pause,can_resume:S.can_resume,started_at:S.started_at,last_event_at:S.last_event_at,last_activity:S.last_activity,legs:S.legs,runner:S.runner,model:S.model,effort:S.effort,speed:S.speed,resumed_from:S.resumed_from,continuation_mode:S.continuation_mode,usage:S.usage,exec_chips:{orchestration:Go(S),worker:null},discard:En(X,b,{attempt_id:S.attempt_id}),badges:S.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:S.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:S.run_state==="failed"});for(let b of Array.isArray(R.session_active)?R.session_active:[]){let S=b&&b.bead_id;typeof S!="string"||nt.has(S)||(nt.add(S),Array.isArray(b.blocked_by)&&b.blocked_by.length>0&&L.set(S,b.blocked_by.filter(H=>typeof H=="string"&&H.length>0)),typeof b.title=="string"&&b.title.length>0&&z.set(S,b.title),b.workflow&&typeof b.workflow=="object"&&A.set(S,b.workflow),p.push({...$t(S),title:b.title||W[S]||S,lane:"running",kind:"session",status:"in_progress",started_at:Oi(b.started_at)??Oi(b.updated_at)??void 0,updated_at:Oi(b.updated_at)??void 0,workflow:b.workflow||null,labels:Array.isArray(b.labels)?b.labels:[],spec_id:typeof b.spec_id=="string"?b.spec_id:"",blocked:b.blocked===!0,...Array.isArray(b.blocked_by)?{blocked_by:b.blocked_by.filter(H=>typeof H=="string"&&H.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,badges:[],alert:!1}))}for(let b of Array.isArray(R.pr_wait)?R.pr_wait:[]){let S=b&&b.bead_id;if(typeof S!="string"||nt.has(S))continue;nt.add(S);let H=Et(Me[S]),ae=Et(H.pr),oe=H.gate?Et(H.gate):null,ye=ot.has(S),Se=ct.get(S)?.continuation_action||null,Je=!!Se&&Se.continuation===null,rt=be.active===S,Ye=b.external===!0,dt=P[S]||null,Rt=Et(De[S]),ft=Ts({bead_id:S,merge_sha:b.merge_sha,cleanup_cursor:b.cleanup_cursor,merge_progress:Rt.merge_progress||null,cleanup_failed:dt,repo_operations:Qe}),en=Jo(ft),jt=!!oe&&oe.base_badge==="\uCDA9\uB3CC",Pt=!!dt&&["child_sweep","branch_cleanup","parent_close"].includes(dt.step)&&!!oe&&oe.tier==="merged",Bt=Ye&&!!dt&&!!oe&&oe.tier==="merged",Mt=!!oe&&["closed_unmerged","review","undecidable"].includes(oe.tier),Lt=En(X,S,{external:Ye,merge_active:rt||ft?.step==="merge",merge_queued:ye,cleanup_active:en,merged:!!dt||oe?.tier==="merged"}),ze=!!Lt.operation;f.push({...$t(S),lane:"pr_wait",workflow:K[S]||null,pr_number:typeof ae.number=="number"?ae.number:null,pr_url:typeof ae.url=="string"?ae.url:void 0,external:Ye,usage:pn(qe,S),merge_step:ft,badges:Je?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ft?[oe?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:dt?[mr(dt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${mr(dt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof oe?.gate_badge=="string"&&oe.gate_badge.length>0?[oe.gate_badge]:[],alert:ft?ft.failed===!0:!!dt||Mt,reason:dt&&ft?.active!==!0?Xo(dt.step):"PR \uB300\uAE30",merge_action:oe?.tier==="merged"&&!Pt&&!Bt?!1:!ye||Je,merge_enabled:!ze&&(Je||oe?.enabled===!0||jt||Pt||Bt),merge_label:Je?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Bt||Pt?"\uC815\uB9AC \uC7AC\uAC1C":jt&&!Pt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Je?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ze?Lt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Lt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Lt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Bt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Pt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":jt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":oe?.enabled===!0?`\uBA38\uC9C0 (${oe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${oe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ye&&!Je,cancel_enabled:!rt,continuation_mismatch:Se?.mismatch||null,discard:Lt,discard_action:Lt.action,discard_enabled:Lt.enabled,discard_title:Lt.title})}let Z=(b,S,H,ae)=>{let oe=b&&b.bead_id;if(typeof oe!="string"||nt.has(oe))return null;nt.add(oe);let ye=Ge[oe],Se=En(X,oe),Je=Se.operation?Se:null,rt={...$t(oe),lane:S,workflow:K[oe]||null,draggable:!Je,discard:Je||void 0,reason:Sd(Ke,oe),seq:H+1,queue_position:H+1,queue_index:H,queue_length:ae,badges:ye?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ye,revise_action:!!ye,revise_enabled:!!ye&&!Je,revise_title:ye?ye.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ye.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(te,oe)&&(rt.blocked_by=Array.isArray(te[oe])?te[oe].filter(Ye=>typeof Ye=="string"&&Ye.length>0):[]),rt};for(let b=0;b<ht.length;b++){let S=Z(ht[b],"queue",b,ht.length);if(!S)continue;h.push(S);let H=N.get(ue);H?H.push(S):N.set(ue,[S])}let le=b=>{let S=f.find(oe=>oe.id===b&&oe.root_dir===ue);if(S)return{id:b,title:S.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let H=p.find(oe=>oe.id===b&&oe.root_dir===ue),ae=H&&H.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":H&&H.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:b,title:H?H.title:$t(b).title,badge:ae}},Ne=[];for(let b=0;b<Math.max(Tt,bt.length);b++){let S=`s${b+1}`,H=wt.get(S),ae=H&&Array.isArray(H.entries)?H.entries:[],oe=[];for(let Je=0;Je<ae.length;Je++){let rt=Z(ae[Je],S,Je,ae.length);rt&&(oe.push(rt),h.push(rt))}let ye=Et(tt[S]),Se=Array.isArray(ye.occupied_by)?ye.occupied_by.filter(Je=>typeof Je=="string"):[];oe.length===0&&Se.length===0&&(Tt<=1||b>=Tt)||Ne.push({id:S,index:b,items:oe,raw_length:ae.length,occupied_by:Se,occupants:Se.map(Je=>le(Je)),corrections:Array.isArray(ye.corrections)?ye.corrections.length:0,cycle:ye.cycle===!0,...oe.length===0&&Se.length===0?{empty:!0}:{}})}j.set(ue,Ne);let E=Array.from({length:Tt},(b,S)=>{let H=`s${S+1}`,ae=wt.get(H),oe=ae&&Array.isArray(ae.entries)?ae.entries:[],ye=Et(tt[H]);return{id:H,index:oe.length,length:oe.length,occupied_by:Array.isArray(ye.occupied_by)?ye.occupied_by.filter(Se=>typeof Se=="string"):[]}});for(let b of Array.isArray(R.runnable)?R.runnable:[]){let S=b&&b.bead_id;if(typeof S!="string"||nt.has(S))continue;nt.add(S);let H=b.workflow&&typeof b.workflow=="object"?b.workflow:null,ae=H&&typeof H.route=="string"&&H.route||(typeof b.route=="string"?b.route:null),oe=kh(Et(Re),b.exec_pins,ae);Array.isArray(b.blocked_by)&&b.blocked_by.length>0&&L.set(S,b.blocked_by.filter(ye=>typeof ye=="string"&&ye.length>0)),typeof b.title=="string"&&b.title.length>0&&z.set(S,b.title),H&&A.set(S,H),Array.isArray(b.scope)&&D.set(S,b.scope.filter(ye=>typeof ye=="string"&&ye.length>0)),d.push({...$t(S),title:b.title||W[S]||S,lane:"runnable",draggable:!0,reason:Sd(Ke,S),created_at:b.created_at??void 0,updated_at:b.updated_at??void 0,status:typeof b.status=="string"?b.status:void 0,labels:Array.isArray(b.labels)?b.labels:[],spec_id:typeof b.spec_id=="string"?b.spec_id:"",workflow:H||(ae?{route:ae,chips:{route:ae}}:null),...oe?{exec_chips:oe}:{},blocked:b.blocked===!0,...Array.isArray(b.blocked_by)?{blocked_by:b.blocked_by.filter(ye=>typeof ye=="string"&&ye.length>0)}:{},place_index:ht.length,place_lanes:E})}for(let b of he){let S=b&&b.bead_id;if(typeof S!="string"||nt.has(S)||(nt.add(S),o!==void 0&&typeof b.added_at=="number"&&b.added_at<o))continue;let H=vh(qe,S),ae=H&&typeof H.done_kind=="string"?H.done_kind:null;w.push({...$t(S),lane:"done",done:!0,done_layout:"three_line",usage:pn(qe,S),work_ms:jo(qe,S),done_at:typeof b.added_at=="number"?b.added_at:void 0,done_kind:ae,badges:ae&&Ad[ae]?[Ad[ae]]:[]})}}let U=new Map;s.forEach((R,ue)=>{R&&typeof R.root_dir=="string"&&U.set(R.root_dir,ue)});let F=n&&n.running_sort==="repo"?"repo":"started";p.sort((R,ue)=>{let Ce=R.kind==="session",Re=ue.kind==="session";if(Ce!==Re)return Ce?1:-1;if(Ce&&Re){let W=ea(ue.updated_at)-ea(R.updated_at);return W!==0?W:R.id.localeCompare(ue.id)}if(F==="repo"){let W=U.get(R.root_dir)??Number.MAX_SAFE_INTEGER,V=U.get(ue.root_dir)??Number.MAX_SAFE_INTEGER;if(W!==V)return W-V}let je=typeof R.started_at=="number"&&Number.isFinite(R.started_at)?R.started_at:null,qe=typeof ue.started_at=="number"&&Number.isFinite(ue.started_at)?ue.started_at:null;return je!==null&&qe!==null&&je!==qe?je-qe:je===null&&qe!==null?1:je!==null&&qe===null?-1:R.id.localeCompare(ue.id)}),w.sort((R,ue)=>(ue.done_at??0)-(R.done_at??0));let ke=s.length>0?s:r.map(R=>({root_dir:R&&R.root_dir,name:R&&R.name,auto_advance:R&&R.auto_advance,auto_merge:R&&R.auto_merge,slots:R&&R.slots,revision:R&&R.revision,runner_catalog:R&&R.runner_catalog})),ve=new Set(d.map(R=>R.root_dir)),ie=[];for(let R of ke){if(!R||typeof R.root_dir!="string")continue;let ue=N.get(R.root_dir)||[],Ce=j.get(R.root_dir)||[];!(ue.length>0||Ce.some(je=>je.items.length>0||je.occupied_by.length>0))&&!ve.has(R.root_dir)||ie.push({root_dir:R.root_dir,name:R.name||R.root_dir,auto_advance:R.auto_advance===!0,auto_merge:R.auto_merge===!0,slots:typeof R.slots=="number"&&R.slots>=xd?R.slots:xd,revision:typeof R.revision=="number"?R.revision:0,runner_catalog:Et(R.runner_catalog),items:ue,sublanes:{parallel:ue,serial:Ce},serial_lane_count:Y.get(R.root_dir)||0,raw_queue_length:J.get(R.root_dir)||0})}let G={runnable:d,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:i==="updated_flat",queue:h,queue_groups:ie,running:p,pr_wait:f,done:w,chains:[],parallel_rows:[],chain_lanes:[],parallel_raw_length:Object.fromEntries(J),owner_of:{},pending_lanes_kept:[]},xe=vd(G);for(let R of x)xe.has(R.id)||xe.set(R.id,{root_dir:R.root_dir,workspace_name:R.workspace_name,lane:"done",state:"done"});let Oe=new Map;for(let[R,ue]of L)for(let Ce of ue){let Re=Oe.get(Ce);Re?Re.includes(R)||Re.push(R):Oe.set(Ce,[R])}for(let R of[...G.queue,...G.runnable]){if(!Object.hasOwn(R,"blocked_by"))continue;let ue=xe.get(R.id);R.blockers=(R.blocked_by||[]).map(Ce=>wd(Ce,ue,xe,s)),R.blocker_warnings=R.blockers.filter(Ce=>Ce.missing_internal).map(Ce=>`\u26A0 \uC120\uD589 ${Ce.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),R.blocker_warnings.length>0&&(R.alert=!0)}for(let R of[...G.queue,...G.runnable,...G.running,...G.pr_wait]){let ue=R.lane==="running"||R.lane==="pr_wait"?[]:(R.blockers||[]).map($h),Ce=[];for(let qe of Oe.get(R.id)||[]){let W=xh(qe,xe);W&&Ce.push(W)}let Re=R.lane==="running"||R.lane==="pr_wait"?[]:R.blocker_warnings||[];if(ue.length===0&&Ce.length===0&&Re.length===0)continue;let je={predecessors:ue,successors:Ce,warnings:Re};R.dependency_chips=je}Rh(G,I,D,xe,s),G.chains=Sh(L,xe,s);let re=kd(G.queue_groups);for(let R of G.queue_groups)for(let ue of R.sublanes.serial){let Ce=re.get($d(R.root_dir,ue.id));Ce&&(ue.cross_wait_peers=Ce)}let se=Th(G.chains,Array.isArray(n?.pending_lanes)?n.pending_lanes:[],L,xe,s,z,A);G.chain_lanes=se.chain_lanes,G.pending_lanes_kept=se.pending_lanes_kept;let Ae=new Map;for(let R of[...G.running,...G.queue,...G.runnable])Ae.has(R.id)||Ae.set(R.id,R);let B=new Set;for(let R of G.chain_lanes)for(let ue of R.rows){B.add(ue.id);let Ce=Ae.get(ue.id);Ce&&(Ce.overlap_chips&&(ue.overlap_chips=Ce.overlap_chips),Ce.scope_state&&(ue.scope_state=Ce.scope_state))}let ee=[];for(let R of N.values())for(let ue of R)B.has(ue.id)||ee.push(ue);ee.sort((R,ue)=>{let Ce=R.workspace_name.localeCompare(ue.workspace_name);return Ce!==0?Ce:(R.queue_index??0)-(ue.queue_index??0)}),G.parallel_rows=ee;let fe={};for(let[R,ue]of xe)typeof ue.root_dir=="string"&&ue.root_dir.length>0&&(fe[R]=ue.root_dir);G.owner_of=fe;let $e=G.runnable.length,we=G.runnable;a.show_blocked||(we=we.filter(R=>R.blocked!==!0));let Ue=we.length;a.spec==="with"?we=we.filter(R=>!!R.spec_id):a.spec==="without"&&(we=we.filter(R=>!R.spec_id)),G.runnable_hidden={blocked:$e-Ue,spec:Ue-we.length};let me=(R,ue)=>{let Ce=ea(ue.updated_at)-ea(R.updated_at);return Ce!==0?Ce:R.id.localeCompare(ue.id)},gt=i==="repo_spec"?(R,ue)=>{let Ce=R.spec_id?0:1,Re=ue.spec_id?0:1;return Ce!==Re?Ce-Re:me(R,ue)}:me;if(i==="updated_flat")G.runnable=we.slice().sort(me),G.runnable_sections=[];else{let R=new Map;for(let Re of we){let je=R.get(Re.root_dir);je?je.push(Re):R.set(Re.root_dir,[Re])}let ue=[],Ce=[];for(let Re of ke){if(!Re||typeof Re.root_dir!="string")continue;let je=(R.get(Re.root_dir)||[]).slice().sort(gt);R.delete(Re.root_dir),je.length!==0&&(ue.push({root_dir:Re.root_dir,name:Re.name||Re.root_dir,items:je.map(qe=>({...qe,workspace_name:""}))}),Ce.push(...je))}for(let[Re,je]of R){let qe=je.slice().sort(gt);ue.push({root_dir:Re,name:qe[0]?.workspace_name||Re,items:qe.map(W=>({...W,workspace_name:""}))}),Ce.push(...qe)}G.runnable=Ce,G.runnable_sections=ue}return G}var Rd="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Od(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Ld(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Dd="bdui.monitor.done-range",Nd="bdui.monitor.running_sort",qd="bdui.monitor.candidate_sort",Fd="beads-ui.monitor.candidate-filter",jd="beads-ui.monitor.sections";function Oh(){try{let e=window.localStorage.getItem(Fd);if(!e)return{...zr};let t=JSON.parse(e);return!t||typeof t!="object"?{...zr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:zr.show_blocked,spec:Li.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...zr}}}function Id(e){try{window.localStorage.setItem(Fd,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Lh(){try{let e=window.localStorage.getItem(qd);return Cs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Ih(e){try{window.localStorage.setItem(qd,e)}catch{}}function Ph(){try{let e=window.localStorage.getItem(jd);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Pd(e){try{window.localStorage.setItem(jd,JSON.stringify(e))}catch{}}function Mh(){try{let e=window.localStorage.getItem(Dd);return dn(e)?e:sn}catch{return sn}}function Dh(e){try{window.localStorage.setItem(Dd,e)}catch{}}function Nh(){try{return window.localStorage.getItem(Nd)==="repo"?"repo":"started"}catch{return"started"}}function qh(e){try{window.localStorage.setItem(Nd,e)}catch{}}var Bd="tab:monitor:pipeline",Fh=1e3,jh=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Md="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Bh(e){return e>=1&&e<=Md.length?Md[e-1]:`(${e})`}function Ud(e,t){let n=Ct("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,u=t.switchWorkspace,d=t.router,p=t.now||(()=>Date.now()),f=t.confirm||(v=>typeof globalThis.confirm!="function"||globalThis.confirm(v)),h=Mh(),w=Nh(),x=Oh(),N=Lh(),j=Ph(),Y=null,J=null,L=null,I=[],D=null;function z(){let v=Wn.find(y=>y.value===h);return v?v.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let U=document.createElement("div");U.className="mon2-drawer",e.appendChild(U);let F=Ii(null,null),ke=new Map,ve=new Map,ie=null,G=null,xe=null,Oe=Dr(U,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{Y=null,he()}});async function re(v,y,k,M,Q=!0){if(!o||!k)return null;let ge=await o(v,{...y,root_dir:k,expected_revision:M});if(ge&&ge.conflict&&Q){ge.queue&&ve.set(k,ge.queue);let Ie=ge.queue&&typeof ge.queue.revision=="number"?ge.queue.revision:M;ge=await o(v,{...y,root_dir:k,expected_revision:Ie})}return ge&&ge.queue&&k&&ve.set(k,ge.queue),ge}function se(v,y){let k=ve.get(v),M=s&&s.get?s.get():null,Q=(Array.isArray(M)?M:[]).find(Ie=>Ie?.root_dir===v);return(k||Q)?.merge_queue?.find(Ie=>Ie.bead_id===y)?.continuation_action}async function Ae(v,y,k,M){let Q=await re(v,y,k,M),ge=ve.get(k)?.revision??Q?.queue?.revision??M;return Rn(Q,(Ie,Xe)=>re(v,{...y,continuation:Ie,decision_token:Xe},k,ge,!1),{refresh:Ie=>re(v,y,k,Ie?.queue?.revision??ve.get(k)?.revision??ge,!1)})}async function B(v,y,k,M){let Q=await Rn({continuation_mismatch:M},(Ie,Xe)=>re("worker-merge-queue-add",{bead_id:y,continuation:Ie,decision_token:Xe},v,k,!1)),ge=Q?.queue?.merge_queue?.find(Ie=>Ie.bead_id===y)?.continuation_action;Q?.applied!==!0&&ge?.continuation===null&&ge.mismatch&&await B(v,y,Q.queue.revision,ge.mismatch)}async function ee(v,y,k){let M=await re("worker-discard",v,y,k);if(M&&M.discarded===!0){de(Uo(M),"success",5e3);return}if(M&&M.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${M.reason}`,"error");return}if(M&&M.accepted&&M.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(M&&M.accepted){de(`\uD3D0\uAE30 \uC9C4\uD589: ${M.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}M&&!M.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function fe(v,y,k){return!o||!k?null:await o(v,{...y,root_dir:k})}async function $e(){let v=new Map;for(let y of F.pr_wait)v.has(y.root_dir)||v.set(y.root_dir,y.expected_revision);for(let[y,k]of v)await re("worker-merge-queue-add-all",{},y,k)}function we(v){let y=j[v];return!!(y&&y.runnable===!0)}function Ue(v){let y={...j[v]||{}};y.runnable=!y.runnable,j={...j,[v]:y},Pd(j),he()}function me(v){return j[v]===!0}function Ze(v){j={...j,[v]:j[v]!==!0},Pd(j),he()}function gt(v){let y=F.queue_groups.find(k=>k.root_dir===v);if(!y)return null;for(let k=0;k<y.serial_lane_count;k+=1){let M=`s${k+1}`,Q=y.sublanes.serial.find(ge=>ge.id===M);if(!Q||Q.raw_length===0&&Q.occupied_by.length===0)return M}return null}function R(v,y){let k=F.queue_groups.find(Q=>Q.root_dir===v),M=k?k.sublanes.serial.find(Q=>Q.id===y):void 0;return M?M.raw_length:0}function ue(v,y){let k=ke.get(v),M=ke.get(y);if(!k||!M)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let Q=Od(k),ge=Od(M);if(Q!==null&&Q===ge&&k.root_dir===M.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let Ie=Ld(k),Xe=Ld(M);if(Ie&&ge!==null){let $=ge;return{kind:"ops",title:`${$} \uB05D\uC5D0 ${v}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:M.root_dir,ops:[{bead_id:v,lane:$,index:R(M.root_dir,$)}]}}if(Q!==null&&Xe&&ge===null){let $=Q;return{kind:"ops",title:`${$} \uB05D\uC5D0 ${y}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:k.root_dir,ops:[{bead_id:y,lane:$,index:R(k.root_dir,$)}]}}if(Ie&&Q===null&&Xe&&ge===null){let $=gt(k.root_dir);return $===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${$} \uB808\uC778\uC5D0 ${y} \u2192 ${v} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:k.root_dir,ops:[{bead_id:y,lane:$,index:0},{bead_id:v,lane:$,index:1}]}}return!Ie&&!Xe?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:Ie?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function Ce(v,y){let k=ue(v,y.id);return{id:y.id,title:y.title,location_label:y.location_label,prefixes:y.prefixes,action:k.kind==="note"?{kind:"note",text:k.text}:k.kind==="disabled"?{kind:"disabled",label:Rd,title:k.title}:{kind:"place",label:Rd,title:k.title}}}function Re(v,y){if(!L||L.bead_id!==v)return null;let k=L.counterpart_id,M=k===null?y:y.filter(Q=>Q.id===k);return M.length===0?null:{rows:M.map(Q=>Ce(v,Q))}}function je(v){let y=v.dependency_chips||null,k=v.overlap_chips||[],M=v.scope_state==="missing";if(!y&&k.length===0&&!M)return null;let Q=Re(v.id,k);return{...y||{},...k.length>0?{overlaps:k}:{},...M?{scope_missing:!0}:{},...Q?{popover:Q}:{}}}function qe(v){let y=je(v);return y?{...v,dependency_chips:y}:v}async function W(v,y){let k=ue(v,y);if(L=null,k.kind!=="ops"){he();return}let M=oe(k.root_dir,k.ops[0].bead_id);for(let Q of k.ops){let ge=await V(Q,k.root_dir,M);if(ge===null)break;M=ge}he()}async function V(v,y,k){try{let M=await re("worker-queue-place",v,y,k,!1);if(M&&M.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!M||M.applied!==!0)return de(M&&typeof M.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${M.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let Q=M.queue?M.queue.revision:void 0;return typeof Q!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):Q}catch(M){return de(b(M),"error"),null}}function Me(v){let y=we(v.root_dir);return c`<header class="mon2-sec__hd">
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
    </div>`}function Ge(v){if(J!==v.id)return null;let y=F.queue_groups.find(M=>M.root_dir===v.root_dir),k=v.place_lanes||[];return{bead_id:v.id,lanes:[{id:"parallel",label:"\uBCD1\uB82C",count:v.place_index??0},...F.chain_lanes.map((M,Q)=>({id:`lane:${Q}`,label:`\uC5F0\uACB0 ${Q+1} \uB05D\uC5D0`,count:M.rows.length})),{id:"new-lane",label:"\uC0C8 \uC5F0\uACB0 \uB808\uC778",count:0},...k.map(M=>({id:`serial:${M.id}`,label:`${y?y.name:""} \uC9C1\uB82C ${Number(M.id.slice(1))}`,count:M.length}))]}}function be(v){return Ke(v,bi(qe(v),Ge(v),{exec_chips_mode:"pinned_only",onOpenDoc:i?(y,k)=>i(k,v.root_dir):void 0}))}function P(){return F.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${F.runnable.map(v=>be(v))}
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
              ${v.items.map(k=>be(k))}
            </div>`}
      </section>`})}`}function X(v,y){return c`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="parallel"
      data-root-dir=${v.root_dir}
      data-row-index=${y}
      data-queue-index=${String(v.queue_index??0)}
    >
      ${Kn(qe(v))}
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
    </div>`}function te(){let v=me("parallel");return c`<section
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
                </div>`:F.parallel_rows.map((y,k)=>X(y,k))}
          </div>`}
    </section>`}function K(v,y,k){return c`<div
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
            >${Bh(y.seq)}</span
          >`}
      ${y.workspace_name?c`<span class="worker-mini__repo" title=${y.root_dir}
            >${y.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${y.id}</span>
      ${Br(y.workflow)}
      <span class="mon2-crow__title">${y.title}</span>
      ${y.predecessors.map(M=>c`<span class="worker-dep worker-dep--pred"
            ><span class="worker-dep__label">← ${M}</span></span
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
      ${jr(je(y),{lane:ke.get(y.id)?.lane})}
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
            </div>`:v.rows.map((y,k)=>K(v,y,k))}
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
      ${Kn(qe(y))}
    </div>`}function lt(v){if(v.length===0)return"";let y=v.length-1;return`${v[0].id} \uC810\uC720${y>0?` +${y}`:""}`}function ot(v){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${v.id}
    >
      ${Kn({id:v.id,title:v.title,lane:"running",draggable:!1,ghost:!0,badges:[v.badge]})}
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
          ${y.items.length>0?y.items.map((k,M)=>Qe(y,k,M)):y.occupants.length>0?"":c`<div class="worker-pane__empty">
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
            ${F.queue_groups.map(k=>k.sublanes.serial.map(M=>ct(k,M)))}
          </div>`}
    </section>`}function bt(){return c`<div class="mon2-wait">${te()}${ht()}</div>`}function tt(v){return c`<div class="worker-rungrid">
      ${F.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:F.running.map(y=>wi({bead_id:y.id,attempt_id:y.attempt_id||"",title:y.title,runner:y.runner??null,model:y.model??null,effort:y.effort??null,speed:y.speed??null,started_at:y.started_at??null,kind:y.kind,...y.kind==="session"?{updated_at:y.updated_at}:{},workflow:y.workflow||null,resumed_from:y.resumed_from??null,continuation_mode:y.continuation_mode??null,paused:y.run_state==="paused",failed:y.run_state==="failed",status:y.status,status_label:y.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:y.can_resume!==!1,can_pause:y.can_pause!==!1,exec_chips:y.exec_chips||null,usage:y.usage||null,discard:y.discard},v,Y,{monitor:{repo:y.workspace_name,root_dir:y.root_dir,serial_lane_id:y.serial_lane_id,last_activity:y.last_activity||null,legs:y.legs||[],dependency_chips:je(y)}}))}
    </div>`}function Tt(v){let y={runnable:F.runnable,queue:F.queue,running:F.running,pr_wait:F.pr_wait,done:F.done};return c`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${jh.map(k=>{let M=y[k.lane],Q=k.lane==="runnable"?F.runnable_flat?M.length>0?P():void 0:F.runnable_sections.length>0?P():void 0:k.lane==="queue"?F.queue_groups.length>0||F.chain_lanes.length>0||F.parallel_rows.length>0?bt():void 0:k.lane==="running"?tt(v):M.length>0?c`${M.map(ge=>Kn(ge))}`:void 0;return _n({id:`monitor-${k.lane}`,lane:k.pane,title:k.lane==="done"?`\uC644\uB8CC\xB7${z()}`:k.title,items:M,empty:k.empty,body:Q,live:k.lane==="running"&&M.length>0,controls:k.lane==="runnable"?wt():void 0,header_control:He(k.lane,M.length)})})}
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
        ${Li.map(v=>c`<button
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
        ${Cs.map(k=>c`<option
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
        ${Wn.map(k=>c`<option value=${k.value} ?selected=${h===k.value}>
              ${k.label}
            </option>`)}
      </select>`:""}function he(){let v=s&&s.get?s.get():null,y=s&&s.getWorkspacesState?s.getWorkspacesState():[],k=p(),M=()=>Ii(v,y,{done_since:ir(h,k),running_sort:w,candidate_filter:x,candidate_sort:N,pending_lanes:I});F=M(),F.pending_lanes_kept.length!==I.length&&(I=F.pending_lanes_kept.map(Q=>I[Q]),F=M()),ke=new Map;for(let Q of[...F.runnable,...F.queue,...F.running,...F.pr_wait,...F.done])ke.has(Q.id)||ke.set(Q.id,Q);Ve(Tt(k),A),$t()?.render(),mt(),nt()}function mt(){let v=new Map;for(let y of F.queue_groups)v.set(y.root_dir,y.auto_advance);for(let y of Array.from(A.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let k=y.closest(".mon2-item")?.getAttribute("data-root-dir")||"",M=v.get(k);typeof M=="boolean"&&y.setAttribute("title",`${y.textContent||""} \xB7 ${M?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function $t(){if(xe)return xe;let v=A.querySelector(".mon2-deck");return v?(xe=fd(v,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>F.done,rangeLabel:z,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:le,onFocusChange:y=>{D=y,nt()}}),xe):null}function nt(){A.classList.toggle("has-focus",D!==null);for(let v of Array.from(A.querySelectorAll(".mon2-sec[data-root-dir]")))v.classList.toggle("is-focus",D!==null&&v.getAttribute("data-root-dir")===D);for(let v of Array.from(A.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let y=ke.get(v.getAttribute("data-bead-id")||"");v.classList.toggle("is-focus",D!==null&&!!y&&y.root_dir===D)}for(let v of Array.from(A.querySelectorAll(".mon2-crow[data-root-dir]")))v.classList.toggle("is-focus",D!==null&&v.getAttribute("data-root-dir")===D)}function Z(v,y){let k=a?a():void 0;if(!y||!k||y===k||!u){r(v);return}u(y).then(()=>{r(v)}).catch(M=>{n("workspace switch for %s failed: %o",y,M)})}function le(v){if(!v)return;let y=a?a():void 0,k=()=>{try{d?.gotoView("worker")}catch(M){n("gotoView(worker) failed: %o",M)}};if(!u||y&&y===v){k();return}u(v).then(k).catch(M=>{n("workspace switch for %s failed: %o",v,M),de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Ne(v){an(v).then(y=>{de(y?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",y?"success":"error",1400)})}function E(v){let y=ke.get(v)||null;return{item:y,root_dir:y?y.root_dir:"",revision:y?y.expected_revision:0}}function b(v){if(typeof v=="string"&&v.length>0)return v;if(v&&typeof v=="object"){let y=v;if(typeof y.message=="string"&&y.message.length>0)return y.message;if(typeof y.error=="string"&&y.error.length>0)return y.error;if(y.error&&typeof y.error=="object"&&typeof y.error.message=="string")return y.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function S(v,y,k){let{root_dir:M}=E(y);if(!(!y||!k||k===y))try{await fe(v,{a:y,b:k},M)}catch(Q){de(b(Q),"error")}}function H(){let v=new Map,y=s&&s.get?s.get():null,k=M=>Array.isArray(M)?M.filter(Q=>typeof Q=="string"&&Q.length>0):[];for(let M of Array.isArray(y)?y:[]){if(!M||typeof M!="object")continue;let Q=M.bead_blocked_by&&typeof M.bead_blocked_by=="object"?M.bead_blocked_by:{};for(let[ge,Ie]of Object.entries(Q))Array.isArray(Ie)&&v.set(ge,k(Ie));for(let ge of[...Array.isArray(M.runnable)?M.runnable:[],...Array.isArray(M.session_active)?M.session_active:[]])ge&&typeof ge.bead_id=="string"&&Array.isArray(ge.blocked_by)&&ge.blocked_by.length>0&&v.set(ge.bead_id,k(ge.blocked_by))}return v}function ae(){let v=new Map;for(let k of F.chain_lanes)v.set(k.lane_id,k.rows.map(M=>M.id));let y=new Map;for(let k of F.parallel_rows)typeof k.queue_index=="number"&&y.set(k.id,k.queue_index);for(let k of F.queue_groups)for(let M of k.sublanes.serial)for(let Q of M.items)typeof Q.queue_index=="number"&&y.set(Q.id,Q.queue_index);return{blocked_by_map:H(),owner_of:new Map(Object.entries(F.owner_of)),lane_order:v,parallel_rows:F.parallel_rows.map(k=>({bead_id:k.id,root_dir:k.root_dir,queue_index:k.queue_index??0})),parallel_raw_length:new Map(Object.entries(F.parallel_raw_length)),queue_index_of:y}}function oe(v,y){let k=ke.get(y);if(k&&k.root_dir===v)return k.expected_revision;let M=F.queue_groups.find(Q=>Q.root_dir===v);return M?M.revision:0}async function ye(v,y){try{if(v.type==="worker-queue-place"||v.type==="worker-queue-reorder"||v.type==="worker-queue-remove"){let k=await re(v.type,v.payload,v.root_dir,oe(v.root_dir,y));return k&&k.conflict?(de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):k&&k.applied===!1?(de(k.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${k.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0}return(v.type==="dep-add"||v.type==="dep-remove")&&await fe(v.type,{a:v.a,b:v.b},v.root_dir),!0}catch(k){return de(b(k),"error"),!1}}async function Se(v,y){let k=_d(v,y,ae());if("refused"in k){de(k.refused,"error");return}if(y.kind==="chain"){let M=F.chain_lanes.find(ge=>ge.lane_id===y.lane_id),Q=M&&M.pending&&M.rows.length===0?Number(M.lane_id.slice(8)):-1;Q>=0&&I[Q]&&(I=I.map((ge,Ie)=>Ie===Q?{seed:v.bead_id}:ge))}for(let M of k.ops)if(!await ye(M,v.bead_id))break;he()}async function Je(v,y){let k=ke.get(v);if(!k){he();return}let M={kind:"candidate",bead_id:v,root_dir:k.root_dir};if(y==="new-lane"){I.some(ge=>ge.seed===null)||(I=[...I,{seed:null}]),he();let Q=F.chain_lanes.find(ge=>ge.pending&&ge.rows.length===0);if(!Q)return;await Se(M,{kind:"chain",lane_id:Q.lane_id,marker_index:0});return}if(y.startsWith("lane:")){let Q=F.chain_lanes[Number(y.slice(5))];if(!Q){he();return}await Se(M,{kind:"chain",lane_id:Q.lane_id,marker_index:Q.rows.length});return}if(y.startsWith("serial:")){let Q=y.slice(7),ge=(k.place_lanes||[]).find(Ie=>Ie.id===Q);await Se(M,{kind:"repo-serial",root_dir:k.root_dir,lane_id:Q,index:ge?ge.index:0});return}await Se(M,{kind:"parallel",marker_index:F.parallel_rows.length})}async function rt(v,y){let k=F.parallel_rows,M=k.findIndex(T=>T.id===v);if(M<0)return;let Q=k[M].root_dir,ge=[];k.forEach((T,ce)=>{T.root_dir===Q&&ge.push(ce)});let Ie=ge.indexOf(M),Xe=ge[Ie+y];if(typeof Xe!="number")return;let $=y===-1?Xe:ge[Ie+2]??Math.min(k.length,Xe+1);await Se({kind:"parallel",bead_id:v,root_dir:Q,queue_index:k[M].queue_index??0},{kind:"parallel",marker_index:$})}async function Ye(v){for(let y of F.chain_lanes){let k=y.rows.find(M=>M.id===v);if(!(!k||!k.draggable)){await Se({kind:"chain",bead_id:v,root_dir:k.root_dir,lane_id:y.lane_id,...typeof k.queue_index=="number"?{queue_index:k.queue_index}:{}},{kind:"parallel",marker_index:F.parallel_rows.length});return}}}let dt=null,Rt=!1,ft=null;function en(){ft!==null&&clearTimeout(ft),ft=setTimeout(()=>{ft=null,Rt=!1},0)}function jt(v,y){let k=y&&typeof y.closest=="function"?y.closest("[data-row-index]"):null;if(k&&v.contains(k)){let M=Number(k.getAttribute("data-row-index"));return Number.isFinite(M)?M:0}return v.querySelectorAll("[data-row-index]").length}function Pt(v){let y=v.target,k=typeof y?.closest=="function"?y.closest("[data-drop]"):null;if(!k||!dt)return null;let M=k.getAttribute("data-drop");if(M==="candidate")return{zone:k,target:{kind:"candidate"}};if(M==="parallel")return{zone:k,target:{kind:"parallel",marker_index:jt(k,y)}};if(M==="chain")return{zone:k,target:{kind:"chain",lane_id:k.getAttribute("data-lane-id")||"",marker_index:jt(k,y)}};if(M==="repo-serial"){let Q=k.getAttribute("data-root-dir")||"";if(Q!==dt.root_dir)return null;let ge=typeof y?.closest=="function"?y.closest("[data-queue-index]"):null,Ie=ge&&k.contains(ge)?ge.getAttribute("data-queue-index"):k.getAttribute("data-lane-length"),Xe=Number(Ie);return{zone:k,target:{kind:"repo-serial",root_dir:Q,lane_id:k.getAttribute("data-lane-id")||"",index:Number.isFinite(Xe)?Xe:0}}}return null}function Bt(){for(let v of Array.from(A.querySelectorAll(".is-drop-over")))v.classList.remove("is-drop-over")}function Mt(v){let y=v.target,k=typeof y?.closest=="function"?y.closest('[draggable="true"][data-bead-id]'):null,M=k?k.closest("[data-drag-kind]"):null;if(!M)return;let Q=M.getAttribute("data-bead-id")||"",ge=M.getAttribute("data-drag-kind")||"",Ie=M.getAttribute("data-root-dir")||"";if(!Q||!ge||!Ie)return;let Xe=M.getAttribute("data-queue-index")||"",$=Number(Xe),T=M.getAttribute("data-lane-id")||"";dt={kind:ge,bead_id:Q,root_dir:Ie,...Xe!==""&&Number.isFinite($)?{queue_index:$}:{},...T?{lane_id:T}:{}},Rt=!0,J=null,A.classList.add("is-dragging");try{v.dataTransfer?.setData("text/plain",Q),v.dataTransfer&&(v.dataTransfer.effectAllowed="move")}catch{}}function Lt(v){let y=Pt(v);y&&(v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="move"),y.zone.classList.add("is-drop-over"))}function ze(v){let y=v.target;typeof y?.closest=="function"&&y.closest("[data-drop]")?.classList.remove("is-drop-over")}function tn(){dt=null,Bt(),A.classList.remove("is-dragging"),en()}function zt(v){let y=Pt(v),k=dt;dt=null,Bt(),A.classList.remove("is-dragging"),!(!y||!k)&&(v.preventDefault(),Se(k,y.target))}function et(v){return{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.run_state==="running"?"running":v.run_state,worktree:v.root_dir}}function Pe(v,y){let{item:k,root_dir:M,revision:Q}=E(y),ge=k?.attempt_id||"",Ie=v.classList;if(Ie.contains("worker-dep__remove")){S("dep-remove",y,v.dataset.blockerId||"");return}if(Ie.contains("mon2-rowops__up")||Ie.contains("mon2-rowops__down")){rt(y,Ie.contains("mon2-rowops__up")?-1:1);return}if(Ie.contains("mon2-rowops__remove")){re("worker-queue-remove",{bead_id:y},M,Q);return}if(Ie.contains("mon2-crow__detach")){Ye(y);return}if(Ie.contains("mon-overlap__chip")){let Xe=v.getAttribute("data-overlap-all")==="true"?null:v.getAttribute("data-overlap-id")||"";L=!!L&&L.bead_id===y&&L.counterpart_id===Xe?null:{bead_id:y,counterpart_id:Xe},he();return}if(Ie.contains("mon-overlap__place")){W(y,v.getAttribute("data-counterpart-id")||"");return}if(Ie.contains("worker-card__place")){J=J===y?null:y,he();return}if(Ie.contains("worker-card__place-cancel")){J=null,he();return}if(Ie.contains("worker-card__place-lane")){let Xe=v.getAttribute("data-lane")||"parallel";J=null,Je(y,Xe);return}if(Ie.contains("rtile__session")){Y=ge,ge&&k&&Oe.open({attempt_id:ge,root_dir:M,meta:et(k)}),he();return}if(Ie.contains("rtile__pause")){fe("worker-attempt-pause",{attempt_id:ge},M);return}if(Ie.contains("rtile__resume")){Lr().then(Xe=>{if(Xe!==null)return Ae("worker-attempt-resume",{attempt_id:ge,...Xe!==""?{instructions:Xe}:{}},M,Q)});return}if(Ie.contains("rtile__dismiss")){re("worker-attempt-dismiss",{attempt_id:ge},M,Q);return}if(Ie.contains("rtile__discard")){if(!f(xs(y,"unmerged")))return;ee({bead_id:y,...ge?{attempt_id:ge}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},M,Q);return}if(Ie.contains("worker-mini__merge")){let Xe=se(M,y);Xe?.mismatch&&Xe.continuation===null?B(M,y,Q,Xe.mismatch):re("worker-merge-queue-add",{bead_id:y},M,Q);return}if(Ie.contains("worker-mini__merge-cancel")){re("worker-merge-queue-remove",{bead_id:y},M,Q);return}if(Ie.contains("worker-mini__discard")){let Xe=v.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(xs(y,Xe)))return;ee({bead_id:y,...v.dataset.attemptId?{attempt_id:v.dataset.attemptId}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},M,Q);return}if(Ie.contains("worker-mini__revise-fix")){Ae("worker-revise-fix",{bead_id:y},M,Q);return}Ie.contains("worker-mini__revise-approve")&&re("worker-revise-approve",{bead_id:y},M,Q)}function C(v){let y=Rt;Rt=!1;let k=v.target;if(!k||typeof k.closest!="function"||k.closest("dialog")||k.closest(".mon2-drawer")||k.closest("a"))return;let M=k.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(M){v.preventDefault();let _=k.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||M.textContent?.trim()||"";_&&Ne(_);return}let Q=k.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(Q){v.preventDefault();let l=Q.getAttribute("data-root-dir")||ke.get(k.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||Q.getAttribute("title")||"";le(l);return}let ge=k.closest(".mon2-sec__toggle");if(ge){v.preventDefault(),Ue(ge.getAttribute("data-root-dir")||"");return}let Ie=k.closest(".mon2-area__toggle");if(Ie){v.preventDefault(),Ze(Ie.getAttribute("data-area")||"parallel");return}if(k.closest(".mon2-newlane")){v.preventDefault(),I=[...I,{seed:null}],he();return}if(k.closest(".mon-merge-all")){v.preventDefault(),$e();return}let Xe=k.closest(".mon-filter__spec");if(Xe){v.preventDefault(),x={...x,spec:Xe.getAttribute("data-spec")||"all"},Id(x),he();return}let $=k.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!$)return;let T=$.getAttribute("data-bead-id")||"",ce=k.closest("button");if(ce){v.preventDefault(),Pe(ce,T);return}T&&!y&&(v.preventDefault(),Z(T,$.getAttribute("data-root-dir")||E(T).root_dir))}function pe(v){let y=v.target;if(!y||typeof y.closest!="function")return;let k=y.closest(".mon-filter__blocked");if(k){x={...x,show_blocked:k.checked},Id(x),he();return}let M=y.closest(".mon-candidate-sort");if(M){N=Cs.some(Ie=>Ie.value===M.value)?M.value:"repo_spec",Ih(N),he();return}let Q=y.closest(".mon-running-sort");if(Q){w=Q.value==="repo"?"repo":"started",qh(w),he();return}let ge=y.closest(".mon-done-range");ge&&(h=dn(ge.value)?ge.value:sn,Dh(h),he())}function Le(v){if(!L)return;let y=v.target;y&&typeof y.closest=="function"&&y.closest(".mon-overlap__popover, .mon-overlap__chip")||(L=null,he())}function at(v){v.key!=="Escape"||!L||(L=null,he())}e.addEventListener("click",C),e.addEventListener("change",pe),document.addEventListener("click",Le),document.addEventListener("keydown",at),e.addEventListener("dragstart",Mt),e.addEventListener("dragover",Lt),e.addEventListener("dragleave",ze),e.addEventListener("drop",zt),e.addEventListener("dragend",tn),s&&typeof s.subscribe=="function"&&(ie=s.subscribe(()=>{try{ve.clear(),he()}catch{}}));function xt(){G!==null&&(clearInterval(G),G=null)}function yt(){ft!==null&&(clearTimeout(ft),ft=null)}return{load(){n("load"),he(),G===null&&(G=setInterval(()=>{try{he()}catch{}},Fh))},pause(){xt()},clear(){xt(),yt(),ie&&(ie(),ie=null),Oe.destroy(),xe?.destroy(),xe=null,e.removeEventListener("click",C),e.removeEventListener("change",pe),document.removeEventListener("click",Le),document.removeEventListener("keydown",at),e.removeEventListener("dragstart",Mt),e.removeEventListener("dragover",Lt),e.removeEventListener("dragleave",ze),e.removeEventListener("drop",zt),e.removeEventListener("dragend",tn),e.replaceChildren()}}}function Wd(e,t,n){let r=Ct("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(h){return w=>{w.preventDefault(),r("click tab %s",h),n.gotoView(h)}}function u(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function d(){let h=u();return c`
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
    `}function f(){s&&Ve(d(),s),o&&Ve(p(),o)}return f(),a=t.subscribe(()=>f()),{destroy(){a&&(a(),a=null),s&&Ve(c``,s),o&&Ve(c``,o)}}}var zd=["bug","feature","task","epic","chore"];function Hd(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Gd=["Critical","High","Medium","Low","Backlog"];function Vd(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),u=n.querySelector("#new-description"),d=n.querySelector("#new-issue-error"),p=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function w(){o.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",o.appendChild(D);for(let z of zd){let A=document.createElement("option");A.value=z,A.textContent=Hd(z),o.appendChild(A)}a.replaceChildren();for(let z=0;z<=4;z+=1){let A=document.createElement("option");A.value=String(z);let U=Gd[z]||"Medium";A.textContent=`${z} \u2013 ${U}`,a.appendChild(A)}}w();function x(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function N(D){s.disabled=D,o.disabled=D,a.disabled=D,i.disabled=D,u.disabled=D,p.disabled=D,f.disabled=D,f.textContent=D?"Creating\u2026":"Create"}function j(){d.textContent=""}function Y(D){d.textContent=D}function J(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?o.value=D:o.value="";let z=window.localStorage.getItem("beads-ui.new.priority");z&&/^\d$/.test(z)?a.value=z:a.value="2"}catch{o.value="",a.value="2"}}function L(){let D=o.value||"",z=a.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),z.length>0&&window.localStorage.setItem("beads-ui.new.priority",z)}async function I(){j();let D=String(s.value||"").trim();if(D.length===0){Y("Title is required"),s.focus();return}let z=Number(a.value||"2");if(!(z>=0&&z<=4)){Y("Priority must be 0..4"),a.focus();return}let A=String(o.value||""),U=String(u.value||""),F={title:D};A.length>0&&(F.type=A),String(z).length>0&&(F.priority=z),U.length>0&&(F.description=U),N(!0);try{await t("create-issue",F)}catch{N(!1),Y("Failed to create issue");return}L(),N(!1),x()}return n.addEventListener("cancel",D=>{D.preventDefault(),x()}),h.addEventListener("click",()=>x()),p.addEventListener("click",()=>x()),n.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),I())}),r.addEventListener("submit",D=>{D.preventDefault(),I()}),{open(){r.reset(),j(),J();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){x()}}}var Uh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Wh(e,t){return Ca(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Kd(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=Wh(r,e);return c`<button
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
  `}function Yd(e,t,n){return c`
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
  `}function Zd(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Uh.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var zh=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Qd(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(G=>de(G,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",u=!1,d="",p=null;function f(){if(p)return p;let G=a.querySelector('[data-pane="execution"]');return G?(p=Ko(G,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:xe=>t.queueStore?.set?.(xe)}),p):null}function h(){return c`
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
    `}function w(){let G=r.get();return c`
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
        ${G?c`
              ${Kd(G,s(),Y)}
              ${Yd(G,d,{onDraft:xe=>{d=xe},onAdd:J,onRemove:L})}
              ${Zd(G,I)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function x(G){let xe=r.get();if(xe)try{let Oe=await n("display-policy-set",{expected_revision:xe.revision,policy:G(xe)});N(Oe),Oe&&Oe.conflict&&Oe.policy&&(Oe=await n("display-policy-set",{expected_revision:Oe.policy.revision,policy:G(Oe.policy)}),N(Oe)),Oe&&Oe.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function N(G){G&&G.policy&&typeof G.policy=="object"&&r.set(G.policy)}function j(G){x(G)}function Y(G){let xe=r.get();if(!xe)return;let Oe=!Hh(G,xe);j(re=>Gh(G,re,Oe))}function J(){let G=d.trim();G.length!==0&&(d="",j(xe=>xe.hidden_prefixes.includes(G)?{hidden_prefixes:xe.hidden_prefixes}:{hidden_prefixes:[...xe.hidden_prefixes,G]}),D())}function L(G){j(xe=>({hidden_prefixes:xe.hidden_prefixes.filter(Oe=>Oe!==G)}))}function I(G){let xe=r.get();if(!xe)return;let Oe=xe.chips[G]===!1;j(()=>({chips:{[G]:Oe}}))}function D(){Ve(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${zh.map(G=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${G.id}
                  aria-selected=${String(i===G.id)}
                  aria-controls=${`settings-pane-${G.id}`}
                  @click=${()=>z(G.id)}
                >
                  <span class="settings-dialog__glyph">${G.glyph}</span>
                  ${G.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${ie}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${w()}
          </div>
        </div>
      `,a),f()}function z(G){i=G,D()}let A=()=>{u=!1,t.onOpenChange?.(!1)};a.addEventListener("close",A),a.addEventListener("cancel",A);let U=G=>{G.target===a&&ie()};a.addEventListener("click",U);let F=null;r.subscribe&&(F=r.subscribe(()=>{u&&D()}));let ke=null;t.implPresetStore?.subscribe&&(ke=t.implPresetStore.subscribe(()=>{u&&p?.render()}));function ve(G="execution"){u||(u=!0,t.onOpenChange?.(!0),i=G,d="",D(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),f()?.load())}function ie(){u&&(u=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:ve,close:ie,sessionDraft:()=>p?.sessionDraft()??{},destroy(){u=!1,a.removeEventListener("close",A),a.removeEventListener("cancel",A),a.removeEventListener("click",U),F&&(F(),F=null),ke&&(ke(),ke=null),p?.destroy(),p=null,a.remove()}}}function Hh(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Gh(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Vh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Xd="usage-meter-card",Kh="usage-meter-layer",Jd=600,Yh=["token_expired","relogin_required"];function ep(e){return String(e).padStart(2,"0")}function Zh(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function tp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${ep(r.getHours())}:${ep(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${Vh[r.getMonth()]} ${r.getDate()} ${o}`;return`${Zh(n,t)} \xB7 ${i}`}function Qh(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function np(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function rp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var sp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function ap(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Xh(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:ap(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Jh(e){if(!e||typeof e!="object")return null;let t=e,n=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=Xh(s);o&&n.push(o)}let r=t.available===!0&&Array.isArray(t.windows);return!r&&n.length===0?null:{available:r,windows:r?ap(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:n}}function op(e,t){return`${e}:${t}`}function ip(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,u=null;function d(){Ve(c``,e),e.hidden=!0,f()}function p(){if(u===null){let re=e.ownerDocument;u=re.createElement("div"),u.id=Kh,u.className="usage-meter__layer",re.body.appendChild(u)}return u}function f(){u!==null&&(Ve(c``,u),u.remove(),u=null)}function h(re){n!==re&&(n===null&&(document.addEventListener("mousedown",x),document.addEventListener("keydown",j),window.addEventListener("resize",N)),n=re)}function w(){n!==null&&(n=null,document.removeEventListener("mousedown",x),document.removeEventListener("keydown",j),window.removeEventListener("resize",N))}function x(re){let se=re.target;se&&(e.contains(se)||u!==null&&u.contains(se))||(w(),ie())}function N(){ie()}function j(re){re.key==="Escape"&&(w(),ie())}function Y(re){n===re?w():h(re),ie()}function J(){w(),ie()}async function L(re,se){if(r.has(re.key))return;let Ae=op(re.key,se);r.set(re.key,se),a.delete(Ae),ie();let B=null;try{B=await(await fetch(re.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:se})})).json()}catch{B=null}if(t)return;if(r.delete(re.key),!B||B.ok!==!0){let fe=B&&typeof B.error=="string"&&B.error.length>0?B.error:"network_error";a.set(Ae,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${fe}`}),ie();return}let ee=Array.isArray(B.warnings)?B.warnings.filter(fe=>typeof fe=="string"&&fe.length>0):[];ee.length>0&&a.set(Ae,{kind:"warn",text:ee.join(" \xB7 ")}),ie(),await Oe()}function I(re,se,Ae,B){let ee=rp(re.pct),$e=`resets ${tp(re.resetsAt,B)}${se?` \xB7 ${Ae}`:""}`;return c`<span
      class="usage-meter__window ${np(ee)}"
      style=${`--progress: ${ee}%`}
      title=${$e}
    >
      <span class="usage-meter__label">${re.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${ee}%</span>
    </span>`}function D(re,se,Ae){let B=se.available&&typeof se.ageSeconds=="number"&&se.ageSeconds>Jd,ee=B&&typeof se.ageSeconds=="number"?`${Math.floor(se.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",fe=se.accounts.filter(me=>!me.active).length,$e=`usage-meter__group${B?" usage-meter__group--stale":""}`,we=c`<span class="usage-meter__provider"
        >${re.label}</span
      >
      ${se.available?se.windows.map(me=>I(me,B,ee,Ae)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${fe>0?c`<span class="usage-meter__badge">+${fe}</span>`:""}`;if(se.accounts.length===0)return c`<span
        class=${$e}
        aria-label=${`${re.label} usage`}
        >${we}</span
      >`;let Ue=n===re.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${$e}`}
      aria-label=${`${re.label} usage`}
      aria-expanded=${Ue?"true":"false"}
      aria-controls=${Xd}
      @click=${()=>Y(re.key)}
    >
      ${we}
    </button>`}function z(re,se){return c`<span class="usage-meter" aria-label="Usage">
      ${re.map(Ae=>D(Ae.provider,Ae.snapshot,se))}
    </span>`}function A(re,se){let Ae=rp(re.pct),B=tp(re.resetsAt,se);return c`<span
      class="usage-meter__account-window ${np(Ae)}"
      style=${`--progress: ${Ae}%`}
    >
      <span class="usage-meter__account-key">${re.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Ae}%</span>
      <span class="usage-meter__account-reset"
        >${B.length>0?`\u21BB ${B}`:""}</span
      >
    </span>`}function U(re,se){return Yh.includes(se)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${re.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function F(re,se,Ae){let B=se.status==="ok",ee=typeof se.ageSeconds=="number"&&se.ageSeconds>Jd,fe=a.get(op(re.key,se.number)),$e=r.get(re.key),we=$e!==void 0,Ue=$e===se.number,me=["usage-meter__account"];return se.active&&me.push("usage-meter__account--active"),B||me.push("usage-meter__account--unavailable"),ee&&me.push("usage-meter__account--stale"),c`<div class=${me.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${se.email}
          >${se.alias===null?se.email:se.alias}</span
        >
        ${se.plan===null?"":c`<span class="usage-meter__account-tag">${se.plan}</span>`}
        ${se.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${se.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${Qh(se.ageSeconds)}</span
            >`}
        ${se.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${we}
              @click=${()=>{L(re,se.number)}}
            >
              ${Ue?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${B?c`<div class="usage-meter__account-windows">
            ${se.windows.map(Ze=>A(Ze,Ae))}
          </div>`:c`<div class="usage-meter__account-status">
            ${U(re,se.status)}
          </div>`}
      ${fe===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${fe.kind}"
          >
            ${fe.text}
          </div>`}
    </div>`}function ke(re,se,Ae){let B=se.accounts.filter(ee=>ee.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${re.label} · 활성 ${B} / 전체
        ${se.accounts.length}
      </h2>
      ${se.accounts.map(ee=>F(re,ee,Ae))}
    </section>`}function ve(re,se){return c`<div
      class="usage-meter__card"
      id=${Xd}
      role="dialog"
      aria-label=${`${re.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${ke(re.provider,re.snapshot,se)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function ie(){let re=[];for(let B of sp){let ee=o.get(B.key);ee&&re.push({provider:B,snapshot:ee})}if(re.length===0){w(),d();return}let se=re.find(B=>B.provider.key===n&&B.snapshot.accounts.length>0);se||w();let Ae=Date.now();Ve(z(re,Ae),e),e.hidden=!1,se?G(se,Ae):f()}function G(re,se){let Ae=p(),B=e.getBoundingClientRect(),ee=e.ownerDocument.documentElement.clientWidth;Ae.style.setProperty("--usage-meter-anchor-top",`${B.bottom}px`),Ae.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,ee-B.right)}px`),Ve(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${J}
        ></div>
        ${ve(re,se)}`,Ae)}async function xe(re){try{let se=await fetch(re.endpoint);return se.ok?Jh(await se.json()):null}catch{return null}}async function Oe(){i+=1;let re=i,se=await Promise.all(sp.map(async Ae=>({provider:Ae,snapshot:await xe(Ae)})));if(!(t||re!==i)){for(let Ae of se)Ae.snapshot?o.set(Ae.provider.key,Ae.snapshot):o.delete(Ae.provider.key);ie()}}return d(),Oe(),s=setInterval(()=>{Oe()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),w(),d()}}}function lp(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var eb="worker-ineligible";function Pi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function cp(e){return Pi(e).includes(eb)}var tb="worker-serial";function Mi(e){return Pi(e).includes(tb)}function Di(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var nb=new Set(["done","failed","orphaned","stopped","discarded"]),rb={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},sb={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},ob={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Ni(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:ob[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function up(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let u=new Map,d=new Map,p=!1,f=null,h=null,w=null,x=new Set,N=!1,j=0,Y=null,J=new Set;function L(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function I(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function D(){return o&&o()||""}async function z(){if(!s)return;let E=++j;N=!0,w=null,x.clear(),He();try{let b=await s("worker-parallel-analysis-targets",{root_dir:D()});if(E!==j||!he)return;let S=Array.isArray(b?.qualified)?b.qualified:[],H=Array.isArray(b?.excluded)?b.excluded:[];w={qualified:S,excluded:H};for(let ae of S)ae&&typeof ae.id=="string"&&x.add(ae.id)}catch{E===j&&he&&(w={qualified:[],excluded:[]},de("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{E===j&&(N=!1,he&&He())}}function A(E){return Array.isArray(E.runs)?E.runs:[]}function U(){let E=L(),b=new Set;for(let S of Object.values(E.attempts||{})){let H=S;H&&typeof H.bead_id=="string"&&!nb.has(H.status)&&b.add(H.bead_id)}for(let S of Array.isArray(E.pr_wait)?E.pr_wait:[])S&&typeof S.bead_id=="string"&&b.add(S.bead_id);for(let S of Object.values(E.discard_operations||{})){let H=S;H&&H.phase!=="done"&&typeof H.bead_id=="string"&&b.add(H.bead_id)}return b}function F(E){return E.filter(b=>ke(b)===null)}function ke(E){let b=L();for(let S of Array.isArray(b.serial_lanes)?b.serial_lanes:[])if(Array.isArray(S?.entries)&&S.entries.some(H=>H.bead_id===E))return S.id;return(Array.isArray(b.queue)?b.queue:[]).some(S=>S.bead_id===E)?"parallel":null}function ve(E,b){let S=u.get(E);return S||[...b.order]}function ie(E){if(E.length<2)return!1;let b=ke(E[0]);if(!b||b==="parallel")return!1;let S=L(),H=(Array.isArray(S.serial_lanes)?S.serial_lanes:[]).find(oe=>oe.id===b)?.entries.map(oe=>oe.bead_id);if(!Array.isArray(H))return!1;let ae=E.map(oe=>H.indexOf(oe));return ae.every(oe=>oe>=0)&&ae.every((oe,ye)=>ye===0||oe>ae[ye-1])}function G(){let E=L(),b=Array.isArray(E.serial_lanes)?E.serial_lanes:[],S=b.find(H=>Array.isArray(H.entries)&&H.entries.length===0);return S?S.id:b[0]?.id||"s1"}function xe(E){let b=L().bead_titles||{};return typeof b[E]=="string"?b[E]:E}async function Oe(E,b){if(!s||p)return null;p=!0,He();try{return await s(E,b)}finally{p=!1,He()}}async function re(E){r?.setPending?.(!0);try{let b=await Oe("worker-parallel-analysis-start",{force:E,target_ids:Array.from(x)});b&&b.applied===!1&&b.reason&&(b.reason==="target_not_qualified"&&Array.isArray(b.detail)?de(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${b.detail.join(", ")}`,"error",3200):de(`\uBD84\uC11D \uC2E4\uD328: ${b.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function se(){let E=I().job;!s||!E||await s("worker-parallel-analysis-cancel",{job_id:E.job_id})}async function Ae(E){if(!(!s||J.has(E))){J.add(E),He();try{let b=await s("worker-parallel-analysis-prompt",{root_dir:D(),run_id:E});if(!he)return;if(b?.ok===!0&&typeof b.prompt=="string"){Y={run_id:E,prompt:b.prompt};return}de(b?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{J.delete(E),He()}}}function B(){Y=null,He()}async function ee(){if(!Y)return;let E=await an(Y.prompt);de(E?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",E?"success":"error",1400)}function fe(E,b){a&&a(E,Ni(b))}function $e(){return L().runner_catalog}function we(E){return Object.keys($e()?.runners?.[E]?.models||{})}function Ue(E){let b=we(E),S=$e()?.runners?.[E]?.default_model;return typeof S=="string"&&b.includes(S)?S:b[0]||""}function me(){let E=I().settings,b=f||E.runner||"claude",S=we(b),H=f?Ue(b):E.model||S[0]||"",ae=Di($e(),b,H),oe=E.effort||"",ye=ae.includes(oe)?oe:ae[0]||"";return{runner:b,model:H,effort:ye,models:S,efforts:ae}}async function Ze(E){let b=I().settings,S=await Oe("worker-parallel-analysis-settings-update",{expected_revision:b.revision,runner:E.runner,model:E.model,effort:E.effort});(!S||S.applied!==!0)&&(f=null,He(),S&&S.reason&&de(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${S.reason}`,"error",2800))}function gt(E){f=E,He();let b=me();Ze({runner:E,model:b.model,effort:b.effort})}function R(E){let b=me(),S=Di($e(),b.runner,E);Ze({runner:b.runner,model:E,effort:S.includes(b.effort)?b.effort:S[0]||""})}function ue(E){let b=me();Ze({runner:b.runner,model:b.model,effort:E})}async function Ce(E,b){if(!s||p)return;let S=ve(E,b),H=I();if(S.length<2||!H.last_good){de("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let ae=d.get(E)||G(),oe=()=>({snapshot_digest:H.last_good.identity_digest,group_index:E,lane:ae,ordered_bead_ids:S,expected_revision:L().revision});p=!0,He();try{let ye=await s("worker-parallel-analysis-submit",oe());ye&&ye.queue&&n&&n.set(ye.queue),ye&&ye.applied!==!0&&ye.conflict===!0&&(ye=await s("worker-parallel-analysis-submit",oe()),ye&&ye.queue&&n&&n.set(ye.queue)),ye&&ye.applied===!0?(u.delete(E),de(`\uC9C1\uB82C \uB808\uC778 ${ae}\uC5D0 ${S.length}\uAC1C \uBC30\uCE58`,"success")):de(`\uC81C\uCD9C \uAC70\uBD80: ${ye?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,He()}}function Re(E,b,S){u.set(E,ve(E,b).filter(H=>H!==S)),He()}function je(E){u.delete(E),He()}function qe(E,b,S,H){let ae=[...ve(E,b)],oe=ae.indexOf(S),ye=oe+H;oe<0||ye<0||ye>=ae.length||(ae.splice(ye,0,...ae.splice(oe,1)),u.set(E,ae),He())}function W(){let E=I().settings,b=Object.keys($e()?.runners||{}),S=me();return c`<div class="pa-settings">
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
      ${V(E)}
    </div>`}function V(E){return!Ke(E)||Me(E)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:E.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${E.runner}/${E.model} · effort
        ${E.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:E.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function Me(E){return E.is_default===!0&&E.compatible===!1}function Ke(E){return!!(E.runner&&E.model&&E.effort)}function Ge(E){return Ke(E)&&E.compatible!==!1}function be(E){let b=Math.max(0,Math.floor(E/1e3)),S=Math.floor(b/60),H=b%60;return`${S}:${String(H).padStart(2,"0")}`}function P(E){let b=E.job;if(b){let S=typeof b.started_at=="number"?b.started_at:0,H=`${b.runner||"?"}/${b.model||"?"}`,ae=S?` \xB7 \uACBD\uACFC ${be(Date.now()-S)}`:"",oe=typeof b.session_id=="string"?b.session_id:"",ye=A(E).find(Se=>Se.run_id===b.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${H} · effort ${b.effort||"?"}${ae}</span
        >
        ${oe?c`<code class="pa-session-id" title=${oe}
              >${oe.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>fe(b.job_id,ye||b)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${ye?.prompt_saved!==!0||J.has(b.job_id)}
          @click=${()=>{Ae(b.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return te()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function X(E){let b=P(E);return b===""?"":c`<div class="pa__strip">${b}</div>`}function te(){return r?.isPending?.()===!0}function K(E){let b=!!E.job,S=Ge(E.settings),H=w!==null&&x.size===0,ae=b||p||te()||N;return c`<div class="pa-meta">
      ${E.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(E.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!S||ae||H}
        @click=${()=>{re(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!S||ae||H}
        @click=${()=>{re(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!b}
        @click=${()=>{se()}}
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
                        >${rb[S.reason]||S.reason}</span
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
        >${sb[E.outcome]||E.outcome}</span
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
          @click=${()=>fe(E.run_id,E)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${E.prompt_saved!==!0||J.has(E.run_id)}
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
    </section>`}function bt(){return Y?c`<div
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
            <code>${Y.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{ee()}}>
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
${Y.prompt}</pre
        >
      </section>
    </div>`:""}function tt(E,b){let S=ve(E,b),H=U(),ae=S.filter(Ye=>H.has(Ye)),oe=F(S),ye=ie(S),Se=Array.isArray(L().serial_lanes)?L().serial_lanes:[],Je=d.get(E)||G(),rt=b.eligible!==!0||S.length<2||ae.length>0||oe.length>0||ye||p;return c`<section class="pa-group" data-group-index=${String(E)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${b.confidence}</span>
        ${b.categories.map(Ye=>c`<span class="pa-group__category">${Ye}</span>`)}
        ${ye?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${b.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${oe.length>0?c`<span class="pa-group__stale"
              >stale — ${oe.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${b.reason}</p>
      <ol class="pa-group__members">
        ${S.map((Ye,dt)=>c`<li class="pa-member" data-bead-id=${Ye}>
              <span class="pa-member__seq">${dt+1}</span>
              <span class="pa-member__title">${xe(Ye)}</span>
              ${H.has(Ye)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ye}
                ?disabled=${dt===0}
                aria-label=${`${Ye} \uC704\uB85C`}
                @click=${()=>qe(E,b,Ye,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ye}
                ?disabled=${dt===S.length-1}
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
            ${Se.map((Ye,dt)=>c`<option
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
          @click=${()=>{Ce(E,b)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Tt(E){let b=Array.isArray(E.issues)?E.issues:[],S=b.filter(ae=>ae.verdict==="parallel_ok").length,H=b.filter(ae=>ae.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${S}</span>
      <span>uncertain ${H}</span>
    </div>`}function wt(){let E=he&&!!I().job;if(E&&h===null){h=setInterval(()=>He(),1e3);return}!E&&h!==null&&(clearInterval(h),h=null)}function He(){let E=I();f&&E.settings.runner===f&&(f=null);let b=E.last_good?.result;wt(),Ve(c`
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
          ${X(E)}
          <div class="pa__body">
            ${W()} ${K(E)} ${ot()}
            ${b?c`${b.groups.map((S,H)=>tt(H,S))}
                ${b.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Tt(b)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${ht(A(E))}
          </div>
        </div>
        ${bt()}
      `,i)}let he=!1,mt=()=>{he=!1,Y=null,j+=1,wt()},$t=E=>{E.target===E.currentTarget&&Ne()};i.addEventListener("close",mt),i.addEventListener("cancel",mt),i.addEventListener("click",$t);let nt=null;n&&n.subscribe&&(nt=n.subscribe(()=>{he&&He()}));let Z=null;r&&r.subscribe&&(Z=r.subscribe(()=>{he&&He()}));function le(){he||(he=!0,He(),z(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function Ne(){he&&(he=!1,Y=null,j+=1,wt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:le,close:Ne,destroy(){he=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",mt),i.removeEventListener("cancel",mt),i.removeEventListener("click",$t),nt&&(nt(),nt=null),Z&&(Z(),Z=null),i.remove()}}}function dp(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let u=i.scope.filter(d=>typeof d=="string"&&d.length>0);if(u.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:u})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let u=Zo(s[a].scope,s[i].scope);if(u.length===0)continue;let d=s[a].member,p=s[i].member;n.get(d.id)?.overlaps.push({id:p.id,title:p.title,location_label:p.location_label,prefixes:u}),n.get(p.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:u})}return n}function qi(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=r.kind!=="running",u=s.kind!=="running";if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&u&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&u&&a===null){let d=ab(n);return d===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${d} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:d,index:0},{bead_id:e,lane:d,index:1}]}}return!i&&!u?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function ab(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var pp=new Set(["sh","bash","zsh","dash","ksh"]),fp=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function _p(e){let t=e.split("/");return t[t.length-1]||""}function ib(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=_p(n[0]);if(r!=="env")return pp.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&pp.has(_p(s))}function lb(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function cb(e){let t=[],n=0;fp.lastIndex=0;for(let r of e.matchAll(fp)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:lb(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function ub(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function mp(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",u=0,d=null,p=!1;function f(D,z){return z?cb(D).map(A=>A.kind==="plain"?A.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${A.kind}"
            >${A.text}</span
          >`):D}function h(){if(!s)return c``;let D=o==="ready"&&ib(a),z=o==="ready"?a.split(`
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
    </div>`}function w(){Ve(h(),r)}async function x(){if(o!=="ready")return;let D=await an(a);de(D?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",D?"success":"error")}function N(D){D.key==="Escape"&&s&&(D.preventDefault(),L())}function j(){p||(document.addEventListener("keydown",N),p=!0)}function Y(){p&&(document.removeEventListener("keydown",N),p=!1)}async function J(D,z=null){let A=++u;j(),s={...D},d=z||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",w(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let F=t?t():"";if(!F){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",w();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",w();return}let ke="/api/repo-ops-script?workspace="+encodeURIComponent(F)+"&lane="+encodeURIComponent(D.lane)+"&base_sha="+encodeURIComponent(D.base_sha);try{let ve=await n(ke),ie=await ve.json().catch(()=>({}));if(A!==u)return;if((t?t():"")!==F){L();return}if(!ve.ok||!ie||ie.ok!==!0){o="error",i=ub(ie&&typeof ie.error=="string"?ie.error:""),w();return}s={lane:ie.lane,base_sha:ie.base_sha,path:ie.path,base_ref:ie.base_ref},a=String(ie.content),o="ready",w()}catch{if(A!==u)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",w()}}function L(){u+=1,Y(),s=null,a="",w();let D=d;d=null,D?.isConnected&&D.focus()}function I(){L(),r.remove()}return{open:J,close:L,destroy:I}}function gp(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let A=o();return typeof A.revision=="number"?A.revision:0}function i(A){t&&A&&A.queue&&typeof A.queue=="object"&&t.set(A.queue)}function u(){let A=o().workspace_info;return A&&typeof A=="object"?A:{}}function d(A,U){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${A}"
      >${U}</span
    >`}function p(A){if(typeof A!="number"||!Number.isFinite(A))return"";let U=A/6e4;return Number.isInteger(U)?`timeout ${U}\uBD84`:`timeout ${Math.round(A/1e3)}\uCD08`}function f(A){let U=p(A);return U?d("config",U):""}function h(A,U,F){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${F.script}
      @click=${ke=>{s&&s({lane:A,base_sha:U.base_sha,path:F.script,base_ref:U.base_ref},ke.currentTarget)}}
    ></button>`}function w(){let A=o().repo_ops_opt_out;return{verify:A?.verify===!0,deploy:A?.deploy===!0}}function x(A,U){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!U}
        @change=${F=>{J(A,!F.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function N(A){let U=typeof A.base_sha=="string"?A.base_sha:"",F=`${A.source_path||"repo-ops/config.toml"} @ ${A.base_ref||"?"}${U?`@${U.slice(0,7)}`:""}`,ke=w(),ve=!!A.verify&&ke.verify,ie=!!A.deploy&&ke.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${F}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ve?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${A.verify?c`${h("verify",A,A.verify)}
              ${f(A.verify.timeout_ms)}
              ${ve?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ve?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":A.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${A.verify?x("verify",ke.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${ie?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${A.deploy?c`${h("deploy",A,A.deploy)}
              ${f(A.deploy.timeout_ms)}
              ${ie?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ie?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":A.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${A.deploy?x("deploy",ke.deploy):""}
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
    </section>`}async function Y(A){if(!n)return;let U=await n("worker-auto-repair-toggle",{on:A,expected_revision:a()});if(i(U),U&&U.conflict){let F=await n("worker-auto-repair-toggle",{on:A,expected_revision:a()});i(F)}r()}async function J(A,U){if(!n)return;let F=await n("worker-repo-ops-opt-out-toggle",{kind:A,opted_out:U,expected_revision:a()});if(i(F),F&&F.conflict){let ke=await n("worker-repo-ops-opt-out-toggle",{kind:A,opted_out:U,expected_revision:a()});i(ke)}r()}let L={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function I(A,U,F){return c`<div class="worker-repo-ops__policy-group" data-policy=${F}>
      <div class="worker-repo-ops__policy-label">${A}</div>
      <ul class="worker-repo-ops__policy-list">
        ${U.map(ke=>c`<li data-token=${ke}>
              ${L[ke]||ke}
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
    </div>`}function z(){let A=o(),U=A.auto_repair!==!1,F=A.repo_operation_policy&&typeof A.repo_operation_policy=="object"?A.repo_operation_policy:null,ke=Array.isArray(A.repo_operations)?A.repo_operations:[],ve=ke.find(Oe=>Oe.state==="repairing"),ie=ke.filter(Oe=>Oe.state==="failed"||Oe.state==="repairing"),G=ie.length?Math.min(...ie.map(Oe=>typeof Oe.repair?.remaining=="number"?Oe.repair.remaining:0)):F?.auto_repair?.resolution_ladder?.find(Oe=>Oe.id==="auto_repair_session")?.attempts??1,xe=Array.isArray(F?.auto_repair?.resolution_ladder)?F.auto_repair.resolution_ladder:[];return c`<section
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
          @change=${Oe=>{Y(Oe.target.checked)}}
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
          >남은 자동 해결 ${G}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${ve?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${ve.repair?.owner_bead||ve.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
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
            ${I("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",F.worker_automatic||[],"worker-automatic")}
            ${F.supported===!1||F.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${F.schema_version})`}
                </div>`:D(xe)}
            ${I("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",F.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${j(u())} ${z()}
      </details>`}}}var vp=20,db=5,pb=new Set(["failed","repairing","running","queued","retry_pending"]),hp={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},bp={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function fb(e,t,n=vp){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function _b(e){if(e.type==="cleanup")return!0;let t=e.operation;return pb.has(t.state)&&!t.dismissed&&!t.superseded_by}function mb(e,t,n={}){let r=fb(e,t,1/0),s=n.expanded===!0?vp:db,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||_b(i));return{visible:a,hidden:r.length-a.length}}function yp(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function gb(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function wp(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function kp(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function hb(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(bp,r)?bp[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function bb(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return c`<li
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
      ><span class="worker-ev__dot worker-ev__dot--${yp(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(hp,t.kind)?hp[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Fo(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${$s(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${yp(e)}"
          >${gb(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?kp(nd(t.failure_kind,r)):""}
      ${hb(t)}
      ${wp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Fo(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function yb(e){let t=e.cleanup,n=mr(t.step);return c`<li
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
        ${bd(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${kp(Ho(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${wp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function vb(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?yb(r):bb(r))}
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
  </section>`}function $p(e,t={}){let n=null;function r(){if(n===null){Ve(c``,e);return}let a=mb(n.operations,n.cleanup_failures,{expanded:n.expanded});Ve(vb({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var wb=Ct("views:worker"),kb="tab:worker:ready",$b="tab:worker:blocked",xb="tab:worker:in-progress",Ab="tab:worker:resolved",Sb="tab:worker:closed",ta=1,xp=5;function Ap(e){return So(e).path.length>0}var Eb=new Set(["quick_fix","spec_backed","full_plan"]);function Sp(e){return typeof e=="string"&&Eb.has(e)}var Rp="beads-ui.worker.candidate-filter",Fi={show_blocked:!1,spec:"all"};function Tb(){try{let e=window.localStorage.getItem(Rp);if(!e)return{...Fi};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Fi};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Fi}}}function Cb(e){try{window.localStorage.setItem(Rp,JSON.stringify(e))}catch{}}function Rb(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let u=n(i),d=r(i);u&&d?s.push(i):!u&&d?o+=1:u&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Ob=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Op="bdui.worker.candidate_sort",Lb=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],na="spec";function Ib(){try{let e=window.localStorage.getItem(Op);return e==="board"||e==="created"||e==="spec"?e:na}catch{return na}}function Pb(e){try{window.localStorage.setItem(Op,e)}catch{}}var Lp="bdui.worker.done-range";function Mb(){try{let e=window.localStorage.getItem(Lp);return dn(e)?e:sn}catch{return sn}}function Db(e){try{window.localStorage.setItem(Lp,e)}catch{}}var Nb="(max-width: 640px)",Ip="beads-ui.worker.lane-collapsed",Rs={queue:!0,done:!0};function qb(){try{let e=window.localStorage.getItem(Ip);if(!e)return{...Rs};let t=JSON.parse(e);return!t||typeof t!="object"?{...Rs}:{queue:typeof t.queue=="boolean"?t.queue:Rs.queue,done:typeof t.done=="boolean"?t.done:Rs.done}}catch{return{...Rs}}}function Fb(e){try{window.localStorage.setItem(Ip,JSON.stringify(e))}catch{}}function Ep(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function jb(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(cr):(r.sort(Zs(n)),t==="board"?r:[...r.filter(Ap),...r.filter(s=>!Ap(s))])}function Bb(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Ub(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function Tp(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Wb(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function zb(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Hb(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Gb(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Vb(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function ji(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Kb(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,n=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,r=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=r&&typeof r.pr_number=="number"?r.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${n}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),r&&typeof r.bead_id=="string"&&a.push(`repair ${r.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:r&&typeof r.pr_url=="string"?r.pr_url:"",repair_pr_number:s}}function Cp(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Yb(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.head_review&&e.head_review.state!=="failed")return n("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Cp(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Cp(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=Wb(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Tp(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Tp(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Zb(e,t,n,r,s=null,o=null,a=null,i=!1,u=null,d=!0,p=null,f=null,h=null,w={},x=!1,N=!1,j={}){let Y=!!u&&u.position>0,J=!!u?.continuation_action&&u.continuation_action.continuation===null,L=!!u&&u.active===!0,I=u&&u.failure||null,D=Hb(u?u.waiting:null,h),z=n[e]||null,A=z&&z.gate?z.gate:null,U=z&&z.pr?z.pr:null,F=Kb(h),ke=Gb(u?u.resolution:null),ve=Vb(u?u.head_review:null),ie=u&&u.head_review||null,G=u&&u.authority||null,xe=!!ie&&["pending","reviewing","revising"].includes(ie.state),Oe=Y&&!L&&(ie?.state==="failed"||!G||G.source==="automatic"&&!N),re=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ke?ke.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":D,se=!!A&&A.base_badge==="\uCDA9\uB3CC",Ae=!!A&&A.enabled===!0,B=Ts({bead_id:e,merge_sha:j.merge_sha,cleanup_cursor:j.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:j.repo_operations}),ee=Jo(B),fe=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!A&&A.tier==="merged",$e=i&&!!r&&!!A&&A.tier==="merged",we=Oe&&(Ae||se||A?.reason==="base_behind"||A?.reason==="review_receipt_missing"||A?.reason==="review_receipt_stale"||fe||$e),Ue=i&&se&&d===!1,me=En(w,e,{external:i,merge_active:L||B?.step==="merge",merge_queued:Y,conflict_active:!!a,cleanup_active:ee,merged:!!r||A?.tier==="merged"}),Ze=!!me.operation,gt=!fe&&!!r&&r.step==="repo_operations",R=Yb({continuation_required:J,merge_step:B,conflict_badge:re,conflict_live:ke?.live===!0||a==="running",head_review:ie&&ve?{...ve,state:ie.state,failure_reason:ie.failure_reason}:null,recovery:F,cleanup_failed:r,cleanup_label:r?mr(r.step):null,base_exception:f,conflicting:se,gate:A,receipt_check:z&&z.receipt_check?z.receipt_check:null,queue_failure:I,auto_skip:p,queued:Y,queue_active:L,queue_position:u?u.position:0,activity:re?null:o&&o.activity||null}),ue=R?.live===!0&&R.title?c`<span title=${R.title}>${R.label}</span>`:R?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&B?.active!==!0?Xo(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:x,external:i,pr_number:U&&typeof U.number=="number"?U.number:null,pr_url:U&&typeof U.url=="string"?U.url:"",completion_badge:R?.live!==!0&&R?.title?R.label:null,completion_title:R?.title||"",completion_repair_pr_url:F?F.repair_pr_url:"",completion_repair_pr_number:F?F.repair_pr_number:null,badges:ue?[ue]:[],live_badge:R?.live===!0?ue:null,usage:s,alert:R?.alert===!0,merge_action:A?.tier==="merged"&&!fe&&!$e||gt?!1:!Y||J||Oe,timeline_action:gt,cancel_action:Y&&!J,cancel_enabled:(!L||xe)&&!(F&&F.lock_actions),cancel_title:F&&F.lock_actions?`${F.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:L&&!xe?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":xe?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:me,discard_action:me.action,merge_step:B,discard_enabled:me.enabled,discard_title:me.title,merge_enabled:!B&&!a&&!Ze&&!f&&!(F&&F.lock_actions)&&!Ue&&!gt&&(Ae||se||A?.reason==="base_behind"||A?.reason==="review_receipt_missing"||A?.reason==="review_receipt_stale"||fe||$e||we),merge_label:J?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":fe||$e?"\uC815\uB9AC \uC7AC\uAC1C":se&&!B&&!fe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":A?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":A?.reason==="review_receipt_missing"||A?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Oe?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Ze?me.error?`\uD3D0\uAE30 \uC2E4\uD328: ${me.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${me.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:J?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":B?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${B.label}`:$e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ue?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":fe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":se?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ae?`\uBA38\uC9C0 (${A.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:A&&A.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${A&&A.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Bi(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:u,getWorkspacePath:d,openDoc:p,doneRange:f,onDoneRangeChange:h}=t,w=r?Xs(r,i):null,x=no({transport:n,uiOrderStore:i}),N=null,j=[],Y=Tb(),J=null,L=null,I={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},D=Ib(),z=dn(f)?f:Mb(),A=new Map;function U(){let l=Wn.find(_=>_.value===z);return l?l.label:"\uC624\uB298"}let F=qb(),ke=!1,ve=new Set,ie=new Set,G=new Set,xe=new Set,Oe=new Set,re={},se=null,Ae=0,B=null,ee=[];function fe(l){return se===l?re:{}}async function $e(){if(!n)return;let l=d?.()||"";if(se===l||B&&B.key===l&&B.generation===Ae)return;let _=++Ae;B={key:l,generation:_};let g=null;try{g=await Promise.resolve(n("get-session-defaults",{}))}catch(O){if(_!==Ae)return;B=null,wb("get-session-defaults failed: %o",O),ze();return}_===Ae&&(re=g&&typeof g.values=="object"&&g.values!==null?{...g.values}:{},se=l,B=null,ze())}function we(){se=null,Ae+=1,$e()}let Ue=document.createElement("div");Ue.className="worker-console";let me=document.createElement("div");me.className="worker-top";let Ze=document.createElement("div");Ze.className="worker-drawer-overlay",Ze.hidden=!0;let gt=document.createElement("div");gt.className="worker-drawer-overlay__backdrop";let R=document.createElement("div");R.className="worker-drawer-host";let ue=document.createElement("div");ue.className="worker-drawer-host",ue.hidden=!0,Ze.append(gt,R,ue);let Ce=document.createElement("div");Ce.className="worker-lanes-host",Ue.append(me,Ze,Ce),e.appendChild(Ue);let Re=null,je=null,qe=Dr(R,{transport:n,sessionLogStore:a,onClose:()=>{Re=null,je=null,Ze.hidden=!0,ze()}}),W=$p(ue,{onClose:()=>{ue.hidden=!0,Ze.hidden=!0,ze()}}),V=mp({getWorkspacePath:d||(()=>"")}),Me=d&&d()||"",Ke=gp({queueStore:s,transport:n,onChanged:()=>ze(),onOpenScript:(l,_)=>{V.open(l,_)}}),Ge=o?up(Ue,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:d,onOpenTranscript:(l,_)=>Ie(l,_)}):null;function be(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:ta,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function P(){let l=be(),_=typeof l.serial_lane_count=="number"&&Number.isInteger(l.serial_lane_count)&&l.serial_lane_count>0?Math.min(l.serial_lane_count,5):0,g=Array.isArray(l.serial_lanes)?l.serial_lanes:[],O=[];for(let Ee of g){if(O.length>=_)break;!Ee||typeof Ee.id!="string"||!/^s[1-5]$/.test(Ee.id)||!Array.isArray(Ee.entries)||O.push({id:Ee.id,label:`\uC9C1\uB82C ${Ee.id.slice(1)}`,count:Ee.entries.length})}return O.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(l.queue)?l.queue:[]).length},...O]}function X(l){if(!J||!l.some(g=>g.id===J))return null;let _=P();return _?{bead_id:J,lanes:_}:null}function te(){let l=be();return typeof l.revision=="number"?l.revision:0}function K(l){l&&l.queue&&s&&s.set(l.queue)}function De(){let l=be().queue;return Array.isArray(l)?l.length:0}async function Qe(l,_,g){if(!n)return;let O=()=>({bead_id:l,..._==="parallel"?{}:{lane:_},...g===void 0?{}:{index:g},expected_revision:te()}),_e=await n("worker-queue-place",O());K(_e),_e&&_e.conflict&&await n("worker-queue-place",O()).then(K)}async function lt(l,_,g){if(!n)return;let O=()=>({bead_id:l,..._==="parallel"?{}:{lane:_},to_index:g,expected_revision:te()}),_e=await n("worker-queue-reorder",O());K(_e),_e&&_e.conflict&&await n("worker-queue-reorder",O()).then(K)}async function ot(l){if(!n)return;let _=await n("worker-queue-remove",{bead_id:l,expected_revision:te()});K(_),_&&_.conflict&&await n("worker-queue-remove",{bead_id:l,expected_revision:te()}).then(K)}async function ct(l){if(!n||!l)return;let _=await n("worker-attempt-pause",{attempt_id:l});_&&_.paused===!1&&_.reason&&de(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function ht(l){if(!n||!l)return;let _=await Lr();if(_===null)return;let g=async(_e={})=>await n("worker-attempt-resume",{attempt_id:l,expected_revision:te(),..._!==""?{instructions:_}:{},..._e}),O=await g();K(O),O&&O.conflict&&(O=await g(),K(O)),O=await Rn(O,(_e,Ee)=>g({continuation:_e,decision_token:Ee}),{onResult:K,refresh:()=>g()}),O&&O.resumed===!1&&!O.conflict&&O.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${O.reason}`,"error",2400)}async function bt(l){if(!n||!l)return;let _=await n("worker-attempt-dismiss",{attempt_id:l,expected_revision:te()});K(_),_&&_.conflict&&(_=await n("worker-attempt-dismiss",{attempt_id:l,expected_revision:te()}),K(_)),_&&_.dismissed===!1&&!_.conflict&&_.reason&&de(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function tt(l,_,g=!0){if(!n)return null;let O=n,_e=await O(l,{..._,expected_revision:te()});return K(_e),_e&&_e.conflict&&g&&(_e=await O(l,{..._,expected_revision:te()}),K(_e)),_e}async function Tt(l){if(!n||!l)return;let _=be().merge_queue?.find(O=>O.bead_id===l)?.continuation_action;if(_?.mismatch&&_.continuation===null){await He(l,_.mismatch);return}ve.add(l),ze();let g;try{g=await tt("worker-merge-queue-add",{bead_id:l})}catch{de("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ve.delete(l),ze()}if(!(!g||g.applied)){if(g.conflict){de("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}de(zb(g.reason),"error",2400)}}async function wt(l){if(!(!n||!l||ie.has(l))){ie.add(l),ze();try{let _=await n("worker-cleanup-retry",{bead_id:l,expected_revision:te()});K(_),_&&!_.retried&&!_.conflict&&_.reason&&de(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${_.reason}`,"error",2400)}finally{ie.delete(l),ze()}}}async function He(l,_){let g=await Rn({continuation_mismatch:_},(_e,Ee)=>tt("worker-merge-queue-add",{bead_id:l,continuation:_e,decision_token:Ee},!1)),O=g?.queue?.merge_queue?.find(_e=>_e.bead_id===l)?.continuation_action;if(g?.applied!==!0&&O?.continuation===null&&O.mismatch){await He(l,O.mismatch);return}g&&g.applied===!1&&!g.conflict&&de("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function he(l){if(!n)return;let _=await tt("worker-merge-auto-toggle",{on:l});!_||_.conflict||de(l?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",l?"success":"info",2400)}async function mt(l){if(!n||!l)return;let _=await tt("worker-merge-queue-remove",{bead_id:l});_&&!_.conflict&&!_.applied&&_.reason==="merge_active"&&de("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function $t(){await tt("worker-merge-queue-remove",{all:!0})}async function nt(l,_=null,g="unmerged",O=null){if(!n||!l)return;let _e=xs(l,g);if(!(!!O||typeof globalThis.confirm!="function"||globalThis.confirm(_e)))return;let Te=await n("worker-discard",{bead_id:l,..._?{attempt_id:_}:{},...O?{operation_id:O}:{},expected_revision:te()});if(K(Te),Te&&Te.conflict&&(Te=await n("worker-discard",{bead_id:l,..._?{attempt_id:_}:{},...O?{operation_id:O}:{},expected_revision:te()}),K(Te)),Te&&Te.discarded===!0){de(Uo(Te),"success",5e3);return}if(Te&&Te.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${Te.reason}`,"error",2800);return}if(Te&&Te.accepted&&Te.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Te&&Te.accepted&&!Te.discarded){de(`\uD3D0\uAE30 \uC9C4\uD589: ${Te.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Te&&!Te.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Z(l,_,g){if(!(!n||!_||!g||xe.has(_))){xe.add(_),ze();try{let O=await n(l,{bead_id:_,action_id:g,expected_revision:te()});K(O),O?.conflict?de("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!O?.ok&&O?.reason&&de(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(O.reason)}`,"error",2800)}finally{xe.delete(_),ze()}}}async function le(l,_){if(!n||!_||G.has(_))return;G.add(_),ze();let g;try{let O=async(_e={})=>await n(l,{bead_id:_,expected_revision:te(),..._e});g=await O(),K(g),g&&g.conflict&&(g=await n(l,{bead_id:_,expected_revision:te()}),K(g)),l==="worker-revise-fix"&&(g=await Rn(g,(_e,Ee)=>O({continuation:_e,decision_token:Ee}),{onResult:K,refresh:()=>O()}))}finally{G.delete(_),ze()}if(!(!g||g.conflict)){if(g.ok){de(l==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}de(`\uCC98\uBD84 \uAC70\uBD80: ${g.reason||""}`,"error",3e3)}}async function Ne(l){if(!n)return;let _=await n("worker-automation-toggle",{on:l,expected_revision:te()});K(_),_&&_.conflict&&await n("worker-automation-toggle",{on:l,expected_revision:te()}).then(K)}async function E(l){if(!n||!l)return;let _=await n("worker-repo-operation-repair",{operation_id:l});if(K(_),_&&_.ok===!1){de(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${_.reason||""}`,"error",3e3);return}_&&_.ok===!0&&de("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function b(l){if(!n||!l)return;let _=await n("worker-repo-operation-dismiss",{operation_id:l});K(_),_&&_.ok===!1&&de(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${_.reason||""}`,"error",3e3)}async function S(l){if(!n||!Number.isFinite(l))return;let _=Math.max(ta,Math.floor(l)),g=await n("worker-queue-set-slots",{slots:_,expected_revision:te()});K(g),g&&g.conflict&&await n("worker-queue-set-slots",{slots:_,expected_revision:te()}).then(K)}async function H(l){if(!n||!Number.isInteger(l)||l<1||l>xp)return;let _=be(),g=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).slice(l).reduce((Ee,Te)=>Ee+(Array.isArray(Te?.entries)?Te.entries.length:0),0),O=()=>({count:l,expected_revision:te()}),_e=await n("worker-queue-set-serial-lane-count",O());K(_e),_e&&_e.conflict&&(_e=await n("worker-queue-set-serial-lane-count",O()),K(_e)),_e&&_e.applied&&g>0&&de(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${g}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let ae="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function oe(l,_){let g=qi(l,_.id,I);return{id:_.id,title:_.title,location_label:_.location_label,prefixes:_.prefixes,action:g.kind==="note"?{kind:"note",text:g.text}:g.kind==="disabled"?{kind:"disabled",label:ae,title:g.title}:{kind:"place",label:ae,title:g.title}}}function ye(l,_){if(!L||L.bead_id!==l)return null;let g=L.counterpart_id,O=g===null?_:_.filter(_e=>_e.id===g);return O.length===0?null:{rows:O.map(_e=>oe(l,_e))}}async function Se(l,_){let g=qi(l,_,I);if(L=null,g.kind!=="ops"){ze();return}let O=te();for(let _e of g.ops){let Ee=await Je(_e,O);if(Ee===null)break;O=Ee}ze()}async function Je(l,_){if(!n)return null;try{let g=await n("worker-queue-place",{bead_id:l.bead_id,lane:l.lane,index:l.index,expected_revision:_});if(K(g),g&&g.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!g||g.applied!==!0)return de(g&&typeof g.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${g.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let O=g.queue?g.queue.revision:void 0;return typeof O!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):O}catch(g){return de(g instanceof Error&&g.message?g.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function rt(){let l=be(),_=w?w.selectBoardColumn(kb,"ready"):[],g=w?w.selectBoardColumn($b,"blocked"):[],O=w?w.selectBoardColumn(Sb,"closed"):[],_e=w?w.selectBoardColumn(xb,"in_progress"):[],Ee=w?w.selectBoardColumn(Ab,"resolved"):[],Te=eo([..._,...g,..._e,...Ee,...O]),Be=new Map;for(let m of[..._,...g,..._e])m&&m.id&&!Be.has(m.id)&&Be.set(m.id,m);let pt={...fe(d?.()||"")};for(let m of["orchestration_model","orchestration_effort","orchestration_speed"]){let q=l[m];typeof q=="string"&&(pt[m]=q)}function Ut(m,q){let ne=Be.get(m);if(!ne)return null;let We=ne.metadata&&typeof ne.metadata=="object"?ne.metadata:{},it=ne.workflow?.route,qt=We.route,Dt=Sp(it)?it:Sp(qt)?qt:null;return Xt({pin:We,global:pt,execution_defaults:l.execution_defaults??null,runner_catalog:l.runner_catalog??null,route:Dt,controller_runtime:q})}function nn(m){let q=m.runner||null,ne=Ut(m.bead_id,q),We=Go(m),it=ne?Qn(ne,q):null;return We||it?{orchestration:We,worker:it}:null}let Fn=new Map;function Hr(m){if(Fn.has(m))return Fn.get(m)??null;let q=Ut(m,null),ne=null;if(q){let We=wn(l.runner_catalog??null,q.orchestration_model.value??""),it=We===null?q:Ut(m,We),qt=_r(it,l.runner_catalog??null),Dt=Qn(it,We);ne=qt||Dt?{orchestration:qt,worker:Dt}:null}return Fn.set(m,ne),ne}function gr(m){let q=to(Te,m);return q.total===0?null:q}let Hi=l.bead_titles||{},Zt=new Map;for(let[m,q]of Object.entries(Hi))typeof q=="string"&&q.length>0&&Zt.set(m,q);for(let m of[..._,...g])Zt.set(m.id,m.title||m.id);let Gr=new Map;for(let m of[..._,...g,..._e,...Ee,...O])m&&m.id&&typeof m.from_id=="string"&&Gr.set(m.id,m.from_id);let $n=new Map;for(let m of[..._,...g,..._e,...Ee,...O])m&&m.id&&typeof m.priority=="number"&&$n.set(m.id,m.priority);let Os=l.bead_times&&typeof l.bead_times=="object"&&!Array.isArray(l.bead_times)?l.bead_times:{},er=l.bead_labels&&typeof l.bead_labels=="object"&&!Array.isArray(l.bead_labels)?l.bead_labels:{},jn=l.bead_workflow&&typeof l.bead_workflow=="object"&&!Array.isArray(l.bead_workflow)?l.bead_workflow:{},Bn=new Map;for(let[m,q]of Object.entries(er))Array.isArray(q)&&Bn.set(m,Mi(q));for(let m of[..._,...g]){let q=m.labels;Array.isArray(q)&&!Bn.has(m.id)&&Bn.set(m.id,Mi(q))}let hr=new Map,Vr=o?.get()?.last_good?.result?.groups;for(let m of Array.isArray(Vr)?Vr:[]){if(m?.eligible!==!0||!Array.isArray(m.members))continue;let q=m.members.map(We=>{let it=(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).find(qt=>qt.entries.some(Dt=>Dt.bead_id===We));return it?it.id:null});if(!(q.every(We=>We!==null)&&new Set(q).size===1))for(let We of m.members)hr.set(We,m.members.filter(it=>it!==We))}let Ls=l.bead_blocked_by&&typeof l.bead_blocked_by=="object"&&!Array.isArray(l.bead_blocked_by)?l.bead_blocked_by:{},br=new Map;for(let[m,q]of Object.entries(Os))q&&typeof q=="object"&&br.set(m,q);for(let m of[..._,...g])br.set(m.id,{created_at:m.created_at,updated_at:m.updated_at});let tr=m=>br.get(m)||{},Un=l.pr_wait||[],Kr=l.pr_observations||{},Fe=l.pr_activity||{},ut=l.cleanup_failed||{},rn=Object.entries(ut).map(([m,q])=>({bead_id:m,step:q&&q.step?q.step:"",reason:q&&q.reason?q.reason:"",at:q&&typeof q.at=="number"?q.at:null,detail:q&&typeof q.detail=="string"?q.detail:null,output_tail:q&&typeof q.output_tail=="string"&&q.output_tail?q.output_tail:void 0,log_path:q&&typeof q.log_path=="string"&&q.log_path?q.log_path:void 0,retry_count:q&&typeof q.retry_count=="number"&&Number.isInteger(q.retry_count)&&q.retry_count>0?q.retry_count:0,failure_code:q&&typeof q.failure_code=="string"?q.failure_code:void 0,subject_id:q&&typeof q.subject_id=="string"?q.subject_id:void 0,repair_eligible:!!(q&&q.repair_eligible),repair:q&&q.repair?q.repair:void 0})),ra=l.queue||[],Gp=new Set([...ra.map(m=>m.bead_id),...(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).flatMap(m=>(Array.isArray(m?.entries)?m.entries:[]).map(q=>q.bead_id)),...Un.map(m=>m.bead_id),...l.done.map(m=>m.bead_id)]),Vp=new Set(g.map(m=>m.id)),Kp=i?i.get()?.order||{}:{},Gi=new Set,Vi=[];for(let m of[..._,...g])Gp.has(m.id)||Gi.has(m.id)||Bb(m)||(Gi.add(m.id),Vi.push(m));j=jb(Vi,D,Kp);let Yp=l.admission||{},Ki=m=>{let q=Yp[m];if(!q)return"";if(q.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ne=typeof q.reason=="string"?q.reason:"",We=ne.indexOf(":");return We>0&&We<ne.length-1?`\u26D4 ${ne.slice(0,We)} (${ne.slice(We+1)})`:`\u26D4 ${ne}`},Zp=j.map(m=>{let q=So(m),ne=q.path.length>0,We=m.workflow?.route==="quick_fix"||m.metadata&&m.metadata.route==="quick_fix",it=!Object.hasOwn(m,"description")||typeof m.description=="string"&&m.description.trim().length>0,qt=Object.hasOwn(m,"labels")&&cp(m.labels),Dt=!qt&&(We?it:ne&&!q.conflict),At=Vp.has(m.id),gn=[];At&&gn.push(Ub(m)),We&&!it?gn.push("missing_description"):!We&&q.conflict?gn.push("spec_id_conflict"):!We&&!ne&&gn.push("spec \uC5C6\uC74C");let Bs=Ki(m.id);return Bs&&gn.push(Bs),{id:m.id,title:m.title||m.id,reason:gn.join(" \xB7 "),draggable:Dt,lane:"candidate",created_at:m.created_at,updated_at:m.updated_at,workflow:m.workflow,is_quick_fix:We,status:m.status,worker_ineligible:qt,blocked:At,has_spec:ne,exec_chips:Hr(m.id),from_id:m.from_id||void 0,priority:$n.get(m.id)}}),sa=Rb(Zp,Y),oa=sa.visible,Qp=l.revise_parked||{},Is=l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},aa=(m,q)=>m.map((ne,We)=>{let it=q!=="done",qt=q!=="done"&&q!=="queue",Dt=it?Qp[ne.bead_id]:null,At=it?En(Is,ne.bead_id):null,gn=At?.operation?At:null,Bs=it&&Bn.get(ne.bead_id)===!0,xl=Ls[ne.bead_id]||[],ma=l.admission&&typeof l.admission=="object"?l.admission[ne.bead_id]:null,ga=it?Qu(ma,!!gn||xe.has(ne.bead_id)):null,lf=it&&!ga?Ki(ne.bead_id):null,cf=it?[lf]:[],Al=it&&xl.length>0&&typeof ma?.reason=="string"&&ma.reason.startsWith("not_ready")?[`\u23F8 ${xl.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],ha=it?hr.get(ne.bead_id):void 0;return ha&&ha.length>0&&Al.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${ha.join(", ")}\uC640`),{id:ne.bead_id,title:Zt.get(ne.bead_id)||ne.bead_id,reason:cf.filter(Boolean).join(" \xB7 "),draggable:it&&!gn&&!ga,done:q==="done",lane:q,seq:qt?We+1:void 0,worker_serial:Bs,discard:gn,stale_work:ga,badges:[...Al,...Dt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Dt,revise_action:!!Dt,revise_enabled:!!Dt&&!gn&&!G.has(ne.bead_id),revise_title:Dt?Dt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Dt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:q==="done"?pn(l.attempts||{},ne.bead_id):null,work_ms:q==="done"?jo(l.attempts||{},ne.bead_id):null,done_at:q==="done"&&typeof ne.added_at=="number"?ne.added_at:void 0,exec_chips:it?Hr(ne.bead_id):null,workflow:it&&jn[ne.bead_id]||null,from_id:Gr.get(ne.bead_id)||void 0,priority:$n.get(ne.bead_id),...tr(ne.bead_id)}}),yr=l.attempts?Object.values(l.attempts):[],ia=new Set;for(let m of yr)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&ia.add(m.resumed_from);let Yi=new Map;for(let m of yr)Yi.set(m.bead_id,m.attempt_id);let Ps=new Map;for(let m of yr)Ps.set(m.attempt_id,m);function la(m){let q=new Set,ne=m;for(;ne&&!q.has(ne.attempt_id);){if(ne.conflict_resolution===!0)return!0;q.add(ne.attempt_id),ne=typeof ne.resumed_from=="string"&&ne.resumed_from.length>0&&Ps.get(ne.resumed_from)||null}return!1}let Ms=typeof l.declared_base=="string"?l.declared_base:null;function Xp(m){let q=null;for(let ne of yr)!ne||ne.bead_id!==m||la(ne)||(q===null||(typeof ne.started_at=="number"?ne.started_at:0)>=(typeof q.started_at=="number"?q.started_at:0))&&(q=ne);return q&&typeof q.target_base=="string"?q.target_base:null}let ca=[],Ds=[],Jp=lp(l),Zi=m=>{let q=typeof m.session_id=="string"&&m.session_id.length>0,ne=ia.has(m.attempt_id);return{eligible:q&&!ne,reason:q?ne?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},mn=null;for(let m of yr){let q=m.status==="paused"&&!ia.has(m.attempt_id);if(m.status==="running"||q)Ds.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Zt.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,paused:q,conflict_resolution:la(m),base_exception:ji(Ms,m.target_base),can_pause:typeof m.session_id=="string"&&m.session_id.length>0,discard:En(Is,m.bead_id,{attempt_id:m.attempt_id}),workflow:jn[m.bead_id]||null,priority:$n.get(m.bead_id),usage:pn(l.attempts||{},m.bead_id),rollup:gr(m.bead_id),rollup_expanded:Oe.has(m.bead_id),exec_chips:nn(m),...tr(m.bead_id)});else if((m.status==="failed"||m.status==="orphaned")&&Jp(m)){let ne=Zi(m);ca.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Zt.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,failed:!0,status:m.status,status_label:m.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:En(Is,m.bead_id,{attempt_id:m.attempt_id}),resume_eligible:ne.eligible,resume_reason:ne.reason,conflict_resolution:la(m),base_exception:ji(Ms,m.target_base),workflow:jn[m.bead_id]||null,priority:$n.get(m.bead_id),usage:pn(l.attempts||{},m.bead_id),rollup:gr(m.bead_id),rollup_expanded:Oe.has(m.bead_id),exec_chips:nn(m),...tr(m.bead_id)}),mn=m}}let Qi=new Set([...ca,...Ds].map(m=>m.bead_id));for(let m of Array.isArray(l.session_active)?l.session_active:[]){let q=m&&m.bead_id;typeof q!="string"||q.length===0||Qi.has(q)||(Qi.add(q),Ds.push({bead_id:q,attempt_id:null,kind:"session",title:m.title||Zt.get(q)||q,status:"in_progress",started_at:xn(m.started_at)??xn(m.updated_at),updated_at:xn(m.updated_at),workflow:m.workflow||null,priority:$n.get(q),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1}))}let vr=[...ca,...Ds].map(m=>{let q=Ps.get(m.attempt_id),ne=q?.quickfix_landing;if(q?.quickfix_lane!==!0||!ne||typeof ne!="object")return m;let We=typeof ne.reason=="string"&&ne.reason.length>0?ne.reason:null,it=Ts({bead_id:q.bead_id,merge_sha:ne.head_sha,cleanup_cursor:ne.cursor,cleanup_failed:We?{step:ne.cursor,reason:We}:null,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]});return it?{...m,landing:it}:m}),Xi=null;if(mn){let m=Zi(mn),q=mn.cause_detail;Xi={bead_id:mn.bead_id,repo:mn.repo||"",reason:mn.cause||mn.status,cause_detail:q&&typeof q.reason=="string"?{reason:q.reason,command:typeof q.command=="string"?q.command:null}:null,resume_attempt_id:mn.attempt_id,resume_eligible:m.eligible,resume_reason:m.reason,discard:En(Is,mn.bead_id,{attempt_id:mn.attempt_id})}}let Ji=new Set(vr.map(m=>m.bead_id)),ua=Array.isArray(l.merge_queue)?l.merge_queue:[],el=new Map,tl=new Map,nl=new Map,rl=new Map,sl=new Map;ua.forEach((m,q)=>{m&&typeof m.bead_id=="string"&&(el.set(m.bead_id,q+1),tl.set(m.bead_id,m.resolution),nl.set(m.bead_id,m.continuation_action||null),rl.set(m.bead_id,m.head_review||null),sl.set(m.bead_id,m.authority||null))});let wr=l.merge_queue_state||{active:null,failures:{}},ef=wr.failures||{},ol=wr.waiting&&typeof wr.waiting.bead_id=="string"&&typeof wr.waiting.reason=="string"?wr.waiting:null,tf=l.auto_merge_skips||{},al=m=>{let q=tf[m];if(!q)return null;let ne=Kr[m],We=ne&&ne.pr?ne.pr.head_sha:null;return We&&We===q.head_sha?q.reason||"":null},Ns=new Map;for(let m of vr)m.failed!==!0&&m.conflict_resolution&&(m.paused?Ns.has(m.bead_id)||Ns.set(m.bead_id,"paused"):Ns.set(m.bead_id,"running"));let il=vr.filter(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0).length,ll=(l.workspace_info||{}).slots,cl=typeof ll=="number"?ll:typeof l.slots=="number"?l.slots:ta,nf=il>cl,qs=ir(z),rf=(Array.isArray(l.done)?l.done.slice():[]).filter(m=>qs===void 0||typeof m.added_at!="number"||m.added_at>=qs).sort((m,q)=>(q.added_at||0)-(m.added_at||0)),Yr=aa(rf,"done"),sf=new Set((Array.isArray(l.done)?l.done:[]).map(m=>m?.bead_id).filter(m=>typeof m=="string")),ul=[],of=d?.()||"";for(let m of O){let q=xn(m.closed_at);if(typeof m.id!="string"||sf.has(m.id)||q===null||qs!==void 0&&q<qs||typeof m.comment_count!="number"||m.comment_count<=0)continue;let ne=`${of}\0${m.id}\0${String(m.updated_at)}\0${m.comment_count}`,We=A.get(ne);We===void 0&&n&&(A.set(ne,"pending"),Promise.resolve(n("get-comments",{id:m.id})).then(it=>{let qt=Array.isArray(it)&&it.some(Dt=>Eo(typeof Dt?.text=="string"?Dt.text:"")?.lane==="session");A.set(ne,qt?"session":"not-session"),ze()}).catch(()=>{A.set(ne,"failed"),ze()})),We==="session"&&ul.push({id:m.id,title:m.title||m.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:q,created_at:m.created_at,updated_at:m.updated_at})}Yr.push(...ul),Yr.sort((m,q)=>(q.done_at||0)-(m.done_at||0));let Fs={};for(let m of On)Fs[m]=0;let dl=!1,pl=0,da=0,fl=0;for(let m of Yr){let q=m.usage;if(q&&typeof q=="object"){let ne=!1;for(let We of On)Number.isFinite(q[We])&&(Fs[We]+=q[We],dl=!0,ne=!0);ne&&(da+=1,Number.isFinite(q.total_cost_usd)&&(pl+=q.total_cost_usd,fl+=1))}}da>0&&fl===da&&(Fs.total_cost_usd=pl);let _l=Yr.map(m=>m.usage).filter(m=>m&&typeof m=="object"&&m.providers),af=_l.length>0?Wt(po(_l)):dl?Ln(Fs):null,ml=l.lane_states&&typeof l.lane_states=="object"&&!Array.isArray(l.lane_states)?l.lane_states:{},gl=Array.isArray(l.serial_lanes)?l.serial_lanes:[],hl=m=>{if(Un.some(We=>We.bead_id===m))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let q=yr.filter(We=>We&&We.bead_id===m),ne=q.length>0?q[q.length-1].status:null;return ne==="failed"||ne==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ne==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},js=gl.filter(m=>m&&typeof m.id=="string"&&Array.isArray(m.entries)).map((m,q)=>{let ne=ml[m.id]||{},We=new Map((Array.isArray(ne.corrections)?ne.corrections:[]).filter(At=>At&&typeof At.bead_id=="string"&&typeof At.after=="string").map(At=>[At.bead_id,At.after])),it=aa(m.entries.filter(At=>!Ji.has(At.bead_id)),m.id).map(At=>We.has(At.id)?{...At,badges:[`\u{1F517} ${We.get(At.id)} \uB4A4 (blocks \uC790\uB3D9)`,...At.badges]}:At),qt=Array.isArray(ne.occupied_by)?ne.occupied_by.filter(At=>typeof At=="string"):[],Dt=qt.map(At=>({id:At,title:Zt.get(At)||At,draggable:!1,lane:m.id,ghost:!0,badges:[hl(At)]}));return{id:m.id,index:q+1,rows:[...Dt,...it],occupied:qt.length>0,badge:qt.length>0?hl(qt[0]):"\uB300\uAE30",cycle:ne.cycle===!0}}),bl=typeof l.serial_lane_count=="number"?l.serial_lane_count:js.length,pa=aa(ra.filter(m=>!Ji.has(m.bead_id)),"queue"),yl=new Map,vl=new Set;for(let[m,q]of Object.entries(ml)){if(!/^s[1-5]$/.test(m))continue;let ne=q&&Array.isArray(q.occupied_by)?q.occupied_by:[];for(let We of ne)typeof We=="string"&&yl.set(We,m);ne.length>0&&vl.add(m)}let kr=[];for(let m of vr)typeof m.bead_id=="string"&&kr.push({id:m.bead_id,title:Zt.get(m.bead_id)||m.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:yl.get(m.bead_id)??null});for(let m of js)for(let q of m.rows)q.ghost!==!0&&kr.push({id:q.id,title:q.title,location_label:`${m.id} #${q.seq??""}`.trim(),kind:"serial",lane_id:m.id});pa.forEach((m,q)=>{kr.push({id:m.id,title:m.title,location_label:`#${q+1}`,kind:"parallel",lane_id:null})});for(let m of oa)kr.push({id:m.id,title:m.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let wl={};for(let m of gl)m&&typeof m.id=="string"&&Array.isArray(m.entries)&&(wl[m.id]=m.entries.length);let fa=new Map;for(let m of kr)fa.has(m.id)||fa.set(m.id,m);I={members_by_id:fa,serial_raw_lengths:wl,serial_lane_count:bl,occupied_lanes:vl};let kl=dp(l.bead_scope,kr),_a=(m,q)=>{let ne=kl.get(m.id);if(!ne||ne.overlaps.length===0&&!ne.scope_missing)return m;let We=ye(m.id,ne.overlaps);return m.dependency_chips={...m.dependency_chips||{},...ne.overlaps.length>0?{overlaps:ne.overlaps}:{},...ne.scope_missing&&q!=="running"?{scope_missing:!0}:{},...We?{popover:We}:{}},m};for(let m of pa)_a(m,"queue");for(let m of js)for(let q of m.rows)q.ghost!==!0&&_a(q,m.id);for(let m of oa)_a(m,"candidate");let $l=new Map;for(let m of vr){let q=typeof m.bead_id=="string"?kl.get(m.bead_id):void 0;if(!q||q.overlaps.length===0)continue;let ne=ye(m.bead_id,q.overlaps);$l.set(m.bead_id,{dependency_chips:{overlaps:q.overlaps,...ne?{popover:ne}:{}}})}return{queue:l,idToTitle:Zt,candidates:oa,candidate_hidden:{blocked:sa.hidden_blocked,spec:sa.hidden_spec},running:vr,live_count:il,slots:cl,over_cap:nf,failure:Xi,waiting:pa,serial_lanes:js,serial_lane_count:bl,running_overlays:$l,pr_wait:Un.map(m=>Zb(m.bead_id,Zt.get(m.bead_id)||m.bead_id,Kr,ut[m.bead_id]||null,pn(l.attempts||{},m.bead_id),Fe[m.bead_id]||(ve.has(m.bead_id)||ie.has(m.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Ns.get(m.bead_id)||null,m.external===!0,{position:el.get(m.bead_id)||0,active:wr.active===m.bead_id,failure:ef[m.bead_id]||null,waiting:ol?.bead_id===m.bead_id?ol.reason:null,resolution:tl.get(m.bead_id),continuation_action:nl.get(m.bead_id),head_review:rl.get(m.bead_id)||null,authority:sl.get(m.bead_id)||null},m.wt_present!==!1,l.auto_merge===!0?al(m.bead_id):null,ji(Ms,Xp(m.bead_id)),l.completion_status&&typeof l.completion_status=="object"&&!Array.isArray(l.completion_status)&&l.completion_status[m.bead_id]||null,l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},Ps.get(Yi.get(m.bead_id)||"")?.worker_serial===!0,l.auto_merge===!0,{merge_sha:m.merge_sha,cleanup_cursor:m.cleanup_cursor,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]})).map(m=>({...m,workflow:jn[m.id]||null,priority:$n.get(m.id),...tr(m.id)})),merge_queue_length:ua.length,merge_queue_running:ua.length>0,auto_excluded:Un.map(m=>m.bead_id).filter(m=>al(m)!==null),declared_base:Ms,done:Yr,token_total:af,cleanup_failures:rn,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]}}function Ye(){let _=!!o?.get()?.job,g=!_&&o?.isPending?.()===!0,O=_?"\uBD84\uC11D \uC911":g?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${O?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${O?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${O?c`<span class="worker-analysis-btn__badge">${O}</span>`:""}
    </button>`}function dt(l){let _=l.waiting.length>0?l.waiting[0].id:"\u2014",g=c`<button
      type="button"
      class="worker-play${l.queue.auto_advance?" is-active":""}"
    >
      ${l.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,O=Bt(l),_e=l.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ee=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${l.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${l.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${U()} 완료 <b>${l.done.length}</b></span
      >`,Te=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${l.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${l.declared_base||"?"}</span
    >`,Be=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${ta}
          step="1"
          .value=${String(l.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:xp},(nn,Fn)=>Fn+1).map(nn=>c`<option
                value=${String(nn)}
                ?selected=${l.serial_lane_count===nn}
              >
                ${nn}
              </option>`)}
        </select>
      </label>
      ${o?Ye():""} `,pt=sd({failure:l.failure}),Ut=Zu(l.repo_operations,l.cleanup_failures);return ke?c`<div class="worker-ribbon">
          ${g} ${O}
          <div class="worker-kpi worker-kpi--ribbon">${_e}${Ee}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Be}</div>
          <div class="worker-kpi">${Te}</div>
        </div>
        ${Ut}${Ke.template()}${pt}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${g}${O}${Be}</div>
        <div class="worker-kpi">
          ${_e}${Ee}${Te}
          ${(Array.isArray(l.token_total)?l.token_total:l.token_total?[{label:l.token_total,tooltip:`${U()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(nn=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${nn.tooltip}
                >${U()} 완료 · 누적 ${nn.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${_}</b></span
          >
        </div>
      </div>
      ${Ut}${Ke.template()}${pt}`}function Rt(l){if(l.running.length===0&&l.pr_wait.length===0)return"";let _=l.running.some(g=>g.kind!=="session"&&!g.paused&&g.failed!==!0);return c`<section
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
      ${l.running.length>0?ki(l.running,Date.now(),Re,l.running_overlays):""}
      ${l.pr_wait.map(g=>Kn(g))}
    </section>`}function ft(l){let _=l.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${Y.show_blocked}
        />
        🔒 blocked${_.blocked>0?` ${_.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ob.map(g=>c`<button
              type="button"
              class="worker-filter__chip${Y.spec===g.value?" is-active":""}"
              data-spec=${g.value}
              aria-pressed=${Y.spec===g.value?"true":"false"}
            >
              ${g.label}
            </button>`)}
        ${_.spec>0?c`<span class="worker-filter__hidden">숨김 ${_.spec}</span>`:""}
      </div>
    </div>`}function en(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${D}
    >
      ${Lb.map(l=>c`<option value=${l.value} ?selected=${D===l.value}>
            ${l.label}
          </option>`)}
    </select>`}function jt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${z}
      >
        ${Wn.map(l=>c`<option value=${l.value} ?selected=${z===l.value}>
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
      </button>`;let g=new Set(l.auto_excluded),O=l.pr_wait.filter(_e=>_e.merge_action&&_e.merge_enabled&&!g.has(_e.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${O>0?` ${O}`:""}
    </button>`}function Mt(l){let _=_n({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:l.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:en(),controls:ft(l),place_menu:X(l.candidates),onOpenDoc:p?(g,O)=>p(O):void 0});return ke?c`<div class="worker-lanes worker-lanes--mobile">
        ${Rt(l)}
        ${_n({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:F.queue,preview:Ep(l.waiting)})}
        ${l.serial_lanes.map(g=>Pt(g))}
        ${_}
        ${_n({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:l.done,empty:`${U()} \uC644\uB8CC \uC5C6\uC74C`,controls:jt(),collapsible:!0,collapsed:F.done,preview:Array.isArray(l.token_total)?l.token_total.map(g=>g.label).join(" \xB7 "):l.token_total||Ep(l.done)})}
      </div>`:c`<div class="worker-lanes">
      ${_}
      <div class="worker-wait">
        ${_n({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${l.serial_lanes.map(g=>Pt(g))}
      </div>
      ${_n({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${l.slots}`,items:l.running,live:l.running.some(g=>g.kind!=="session"&&!g.paused&&g.failed!==!0),body:ki(l.running,Date.now(),Re,l.running_overlays)})}
      ${_n({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:l.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${_n({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${U()} ${l.done.length}`,items:l.done,empty:`${U()} \uC644\uB8CC \uC5C6\uC74C`,controls:jt()})}
    </div>`}function Lt(l){F={...F,[l]:!F[l]},Fb(F),ze()}function ze(){let l=rt();Ve(dt(l),me),Ve(Mt(l),Ce)}function tn(){if(typeof window.matchMedia!="function")return;let l=window.matchMedia(Nb);ke=!!l.matches;let _=g=>{let O=!!(g&&typeof g.matches=="boolean"?g.matches:l.matches);O!==ke&&(ke=O,ze())};typeof l.addEventListener=="function"?(l.addEventListener("change",_),ee.push(()=>l.removeEventListener("change",_))):typeof l.addListener=="function"&&(l.addListener(_),ee.push(()=>l.removeListener(_)))}let zt=null;function et(l){zt=l.target instanceof Element?l.target:null}function Pe(l){let g=l.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!g)return;if(zt&&g.contains(zt)&&zt.closest("input, button, a")){l.preventDefault();return}let O=g.dataset.beadId||"",_e=g.dataset.lane||"";N={bead_id:O,from_lane:_e};try{l.dataTransfer?.setData("text/plain",O),l.dataTransfer&&(l.dataTransfer.effectAllowed="move")}catch{}}function C(l){let _=l.target?.closest?.(".worker-pane");if(!_)return;let g=_.dataset.lane||"";g!=="candidate"&&g!=="queue"&&!/^s[1-5]$/.test(g)||(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="move"),_.classList.add("worker-pane--drag-over"))}function pe(l){l.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Le(l,_){let g=j.find(Te=>Te.id===l);if(!g)return;let O=j.filter(Te=>Te.id!==l),_e=O.length;if(_){let Te=_.dataset.beadId;if(Te===l)return;let Be=O.findIndex(pt=>pt.id===Te);Be>=0&&(_e=Be)}let Ee=O.slice();Ee.splice(_e,0,g),x.applyReorder(l,Ee,_e)}function at(l){let _=l.target?.closest?.(".worker-pane");if(!_)return;l.preventDefault(),_.classList.remove("worker-pane--drag-over");let g=_.dataset.lane||"",O=N?.bead_id||l.dataTransfer?.getData("text/plain")||"",_e=N?.from_lane||"";if(N=null,!O)return;let Ee=l.target?.closest?.(".worker-mini, .worker-card"),Te=Array.from(_.querySelectorAll(".worker-mini, .worker-card")),Be=Te.length;if(Ee){let pt=Te.indexOf(Ee);pt>=0&&(Be=pt)}if(Be=Math.max(0,Be-_.querySelectorAll(".worker-mini--ghost").length),_.classList.contains("worker-pane--collapsed")&&(Be=De()),g==="candidate"){if(_e==="candidate"){Le(O,Ee);return}(_e==="queue"||/^s[1-5]$/.test(_e))&&ot(O);return}if(g==="queue"||/^s[1-5]$/.test(g)){let pt=g==="queue"?"parallel":g;_e===g?lt(O,pt,Be):Qe(O,pt)}}function xt(l){Y=l,Cb(l),ze()}function yt(l){D=l==="board"||l==="created"||l==="spec"?l:na,Pb(D),ze()}function v(l){z=dn(l)?l:sn,Db(z),h?.(z),ze()}function y(l){let _=l.target?.closest?.(".worker-serial-lane-count");if(_){let Be=Number.parseInt(_.value,10);Number.isFinite(Be)&&H(Be).then(ze);return}let g=l.target?.closest?.(".worker-filter__blocked");if(g){xt({...Y,show_blocked:g.checked});return}let O=l.target?.closest?.(".worker-done-range");if(O){v(O.value);return}let _e=l.target?.closest?.(".worker-sort");if(_e){yt(_e.value||na);return}let Ee=l.target?.closest?.(".worker-slots__input");if(!Ee)return;let Te=Number.parseInt(Ee.value,10);if(!Number.isFinite(Te)){ze();return}S(Te).then(ze)}function k(l){return l?{runner:l.runner||void 0,model:l.model||void 0,effort:l.effort||void 0,worktree:l.worktree||void 0,status:l.status||void 0,session_id:l.session_id||void 0}:{}}function M(){let l=rt();return{operations:l.repo_operations,cleanup_failures:l.cleanup_failures,repo:d&&d()||""}}function Q(){Re&&qe.close(),ue.hidden=!1,Ze.hidden=!1,W.open(M()),ze()}function ge(l){let _=be(),g=_.attempts?_.attempts[l]:null;Re=l,je=null,W.close(),ue.hidden=!0,Ze.hidden=!1,qe.open({attempt_id:l,meta:k(g)}),ze()}function Ie(l,_){Re=null,je=l,W.close(),ue.hidden=!0,Ze.hidden=!1,qe.open({attempt_id:l,meta:_,hide_prompt:!0}),ze()}function Xe(){if(W.isOpen()&&W.refresh(M()),je){let g=(o?.get()?.runs||[]).find(O=>O.run_id===je);g?qe.updateMeta(Ni(g)):qe.close();return}if(!Re)return;let l=be(),_=l.attempts?l.attempts[Re]:null;if(_){qe.updateMeta(k(_));return}qe.close()}function $(l){let _=l.target;if(_?.closest?.(".worker-mini__serial, .worker-mini__grip")||_?.closest?.("#worker-parallel-analysis-dialog"))return;let g=_?.closest?.(".mon-overlap__chip");if(g){let Fe=g.closest("[data-bead-id]"),ut=Fe&&Fe.getAttribute("data-bead-id")||"";if(ut){let rn=g.getAttribute("data-overlap-all")==="true"?null:g.getAttribute("data-overlap-id")||"";L=!!L&&L.bead_id===ut&&L.counterpart_id===rn?null:{bead_id:ut,counterpart_id:rn},ze()}return}let O=_?.closest?.(".mon-overlap__place");if(O){let Fe=O.closest("[data-bead-id]"),ut=Fe&&Fe.getAttribute("data-bead-id")||"";ut&&Se(ut,O.getAttribute("data-counterpart-id")||"");return}if(_?.closest?.(".mon-overlap__popover"))return;if(_?.closest?.(".worker-analysis-btn")){Ge?.open();return}if(_?.closest?.(".worker-repo-strip")||_?.closest?.(".worker-mini__timeline")){Q();return}let _e=_?.closest?.(".worker-repo-op__session");if(_e){let Fe=_e.dataset.attemptId;Fe&&ge(Fe);return}let Ee=_?.closest?.(".worker-repo-op__resolve");if(Ee){E(Ee.dataset.operationId||"");return}let Te=_?.closest?.(".worker-repo-op__dismiss");if(Te){b(Te.dataset.operationId||"");return}let Be=_?.closest?.(".worker-cleanup__resume");if(Be){let Fe=Be.dataset.beadId;Fe&&wt(Fe);return}let pt=_?.closest?.(".worker-banner__resume");if(pt){let Fe=pt.dataset.attemptId;Fe&&ht(Fe);return}let Ut=_?.closest?.(".worker-banner__discard");if(Ut){let Fe=Ut.dataset.confirmation==="merged"?"merged":"unmerged";nt(Ut.dataset.beadId||"",Ut.dataset.attemptId||null,Fe,Ut.dataset.operationId||null);return}let nn=_?.closest?.(".worker-banner__dismiss");if(nn){let Fe=nn.dataset.attemptId;Fe&&bt(Fe);return}if(_?.closest?.(".worker-play")){Ne(!be().auto_advance);return}let Fn=_?.closest?.(".worker-merge-all");if(Fn){Fn.classList.contains("worker-merge-all--stop")?be().auto_merge===!0?he(!1):$t():he(!0);return}let Hr=_?.closest?.(".worker-pane__hd--toggle");if(Hr){let Fe=Hr.dataset.lane;(Fe==="queue"||Fe==="done")&&Lt(Fe);return}let gr=_?.closest?.(".worker-card__place-lane");if(gr){let Fe=gr.dataset.beadId,ut=gr.dataset.lane;Fe&&(ut==="parallel"||/^s[1-5]$/.test(ut||""))&&(J=null,ze(),Qe(Fe,ut));return}if(_?.closest?.(".worker-card__place-cancel")){J=null,ze();return}let Zt=_?.closest?.(".worker-card__place");if(Zt){let Fe=Zt.dataset.beadId;Fe&&!Zt.disabled&&(P()?(J=Fe,ze()):Qe(Fe,"parallel"));return}let Gr=_?.closest?.(".worker-filter__chip");if(Gr){let Fe=Gr.dataset.spec;(Fe==="all"||Fe==="with"||Fe==="without")&&xt({...Y,spec:Fe});return}let $n=_?.closest?.(".worker-mini__merge");if($n){let Fe=$n.dataset.beadId||"";be().cleanup_failed?.[Fe]?wt(Fe):Tt(Fe);return}let Os=_?.closest?.(".worker-mini__merge-cancel");if(Os){mt(Os.dataset.beadId||"");return}let er=_?.closest?.(".worker-mini__discard");if(er){nt(er.dataset.beadId||"",er.dataset.attemptId||null,er.dataset.discardMode==="merged"?"merged":"unmerged",er.dataset.operationId||null);return}let jn=_?.closest?.(".worker-mini__stale-continue");if(jn){Z("worker-stale-work-continue",jn.dataset.beadId||"",jn.dataset.actionId||"");return}let Bn=_?.closest?.(".worker-mini__stale-backup");if(Bn){Z("worker-stale-work-backup-fresh",Bn.dataset.beadId||"",Bn.dataset.actionId||"");return}let hr=_?.closest?.(".worker-mini__stale-recheck");if(hr){Z("worker-stale-work-recheck",hr.dataset.beadId||"",hr.dataset.actionId||"");return}let Vr=_?.closest?.(".worker-mini__revise-fix");if(Vr){le("worker-revise-fix",Vr.dataset.beadId||"");return}let Ls=_?.closest?.(".worker-mini__revise-approve");if(Ls){le("worker-revise-approve",Ls.dataset.beadId||"");return}if(_?.closest?.(".worker-mini__pr"))return;if(_?.closest?.(".rtile__discard")){let Fe=_?.closest?.(".rtile"),ut=Fe?.dataset?.beadId,rn=Fe?.dataset?.attemptId;ut&&nt(ut,rn||null,"unmerged",_?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(_?.closest?.(".rtile__dismiss")){let ut=_?.closest?.(".rtile")?.dataset?.attemptId;ut&&bt(ut);return}if(_?.closest?.(".rtile__pause")){let ut=_?.closest?.(".rtile")?.dataset?.attemptId;ut&&ct(ut);return}if(_?.closest?.(".rtile__resume")){let ut=_?.closest?.(".rtile")?.dataset?.attemptId;ut&&ht(ut);return}if(_?.closest?.(".rtile__session")){let ut=_?.closest?.(".rtile")?.dataset?.attemptId;ut&&ge(ut);return}if(_?.closest?.(".worker-drawer-overlay__backdrop")){W.close(),qe.close();return}if(_?.closest?.(".worker-drawer-host"))return;let br=_?.closest?.(".rtile .board-card__roll-toggle");if(br){let Fe=br.dataset.rollParent;Fe&&(Oe.has(Fe)?Oe.delete(Fe):Oe.add(Fe),ze());return}let tr=_?.closest?.(".rtile .board-card__roll-child");if(tr){let Fe=tr.dataset.childId;Fe&&u&&u(Fe);return}let Un=_?.closest?.(".rtile");if(Un){if(_?.closest?.(".rtile__id")){let ut=Un.dataset.beadId;ut&&an(ut).then(rn=>{rn?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Fe=Un.dataset.beadId;Fe&&u&&u(Fe);return}let Kr=_?.closest?.(".worker-mini, .worker-card");if(Kr){let Fe=Kr.dataset.beadId;if(_?.closest?.(".worker-mini__id, .worker-card__id")){Fe&&an(Fe).then(rn=>{rn?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ut=_?.closest?.(".ctl-chip--from");if(ut){let rn=ut.dataset.fromId;rn&&u&&u(rn);return}Fe&&u&&u(Fe)}}e.addEventListener("pointerdown",et),e.addEventListener("dragstart",Pe),e.addEventListener("dragover",C),e.addEventListener("dragleave",pe),e.addEventListener("drop",at),e.addEventListener("click",$),e.addEventListener("change",y);function T(l){if(!L)return;let _=l.target;_&&typeof _.closest=="function"&&_.closest(".mon-overlap__popover, .mon-overlap__chip")||(L=null,ze())}function ce(l){l.key!=="Escape"||!L||(L=null,ze())}return document.addEventListener("click",T),document.addEventListener("keydown",ce),ee.push(()=>{document.removeEventListener("click",T),document.removeEventListener("keydown",ce)}),tn(),w&&ee.push(w.subscribe(()=>{for(let[l,_]of A)_==="failed"&&A.delete(l);ze()})),s&&ee.push(s.subscribe(()=>{let l=d&&d()||"";l!==Me&&(Me=l,V.close()),ze(),Xe()})),o&&typeof o.subscribe=="function"&&ee.push(o.subscribe(()=>{Xe(),ze()})),ze(),{load(){$e(),ze()},refreshSessionDefaults:we,destroy(){for(let l of ee.splice(0))try{l()}catch{}e.removeEventListener("pointerdown",et),e.removeEventListener("dragstart",Pe),e.removeEventListener("dragover",C),e.removeEventListener("dragleave",pe),e.removeEventListener("drop",at),e.removeEventListener("click",$),e.removeEventListener("change",y);try{qe.destroy()}catch{}Ze.hidden=!0;try{Ge?.destroy()}catch{}try{V.destroy()}catch{}Ve(c``,e)}}}function Ui(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Pp(e,t,n,r=async()=>{},s=async()=>{}){let o=Ct("views:workspace-picker"),a=null,i=!1,u=!1,d=!1;async function p(z){let U=z.target.value,ke=t.getState().workspace?.current?.path||"";if(U&&U!==ke){o("switching workspace to %s",U),i=!0,D();try{await n(U)}catch(ve){o("workspace switch failed: %o",ve)}finally{i=!1,D()}}}async function f(){let z=t.getState(),A=z.workspace?.current?.path||z.workspace?.available?.[0]?.path||"";if(!(!A||u)){o("git-pulling workspace %s",A),u=!0,D();try{await r(A)}catch(U){o("workspace git pull failed: %o",U)}finally{u=!1,D()}}}function h(z){let A=z.target;A&&e.contains(A)||N()}function w(z){z.key==="Escape"&&N()}function x(){d||(d=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",w),D())}function N(){d&&(d=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",w),D())}function j(){d?N():x()}async function Y(z){let A=z.target,U=A.value,F=A.checked;o("toggling visibility %s \u2192 %s",U,String(F));try{await s(U,F)}catch(ke){o("workspace visibility toggle failed: %o",ke)}}function J(z){return z?c`
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
                        @change=${Y}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Ui(U.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function I(){let z=t.getState(),A=z.workspace?.current,U=z.workspace?.available||[],F=new Set(z.workspace?.hidden||[]),ke=A?.path||U[0]?.path||"";if(U.length===0)return c``;let ve=U.filter(ie=>!F.has(ie.path)||ie.path===ke);if(ve.length<=1){let ie=ve[0]||U[0],G=Ui(ie.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ie.path}"
            >${G}</span
          >
          ${L(U,F)}
          ${J(ke)}
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
          ${ve.map(ie=>c`
              <option
                value="${ie.path}"
                ?selected=${ie.path===ke}
                title="${ie.path}"
              >
                ${Ui(ie.path)}
              </option>
            `)}
        </select>
        ${L(U,F)}
        ${J(ke)}
        ${i||u?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){Ve(I(),e)}return D(),a=t.subscribe(()=>D()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",w),Ve(c``,e)}}}var Mp=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Wi(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Dp(e,t,n=Wi()){return{id:n,type:e,payload:t}}function Np(e={}){let t=Ct("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,u=!0,d=new Map,p=[],f=new Map,h=new Set;function w(I){for(let D of Array.from(h))try{D(I)}catch{}}function x(){if(!u||i)return;o="reconnecting",t("ws reconnecting\u2026"),w(o);let I=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),D=(n.jitterRatio||0)*I,z=Math.max(0,Math.round(I+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",z,a+1),i=setTimeout(()=>{i=null,L()},z)}function N(I){try{s?.send(JSON.stringify(I))}catch(D){t("ws send failed",D)}}function j(){for(o="open",t("ws open"),w(o),a=0;p.length;){let I=p.shift();I&&N(I)}}function Y(I){let D;try{D=JSON.parse(String(I.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(d.has(D.id)){let A=d.get(D.id);d.delete(D.id),D.ok?A?.resolve(D.payload):A?.reject(D.error||new Error("ws error"));return}let z=f.get(D.type);if(z&&z.size>0)for(let A of Array.from(z))try{A(D.payload)}catch(U){t("ws event handler error",U)}else t("ws received unhandled message type: %s",D.type)}function J(){o="closed",t("ws closed"),w(o);for(let[I,D]of d.entries())D.reject(new Error("ws disconnected")),d.delete(I);a+=1,x()}function L(){if(!u)return;let I=r();try{s=new WebSocket(I),t("ws connecting %s",I),o="connecting",w(o),s.addEventListener("open",j),s.addEventListener("message",Y),s.addEventListener("error",()=>{}),s.addEventListener("close",J)}catch(D){t("ws connect failed %o",D),x()}}return L(),{send(I,D){if(!Mp.includes(I))return Promise.reject(new Error(`unknown message type: ${I}`));let z=Wi(),A=Dp(I,D,z);return t("send %s id=%s",I,z),new Promise((U,F)=>{d.set(z,{resolve:U,reject:F,type:I}),s&&s.readyState===s.OPEN?N(A):(t("queue %s id=%s (state=%s)",I,z,o),p.push(A))})},on(I,D){f.has(I)||f.set(I,new Set);let z=f.get(I);return z?.add(D),()=>{z?.delete(D)}},onConnection(I){return h.add(I),()=>{h.delete(I)}},reconnect(){u=!0,i&&(clearTimeout(i),i=null),a=0,L()},close(){u=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Qb(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Xb(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var zi=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],qp=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Xn="tab:worker:closed",Jb="bdui.worker.done-range",Fp=Bd,jp="worker:queue",Bp="worker:parallel-analysis",Up="ui:order",Wp="ui:display-policy",zp="exec:presets",Jn="tab:board:closed",Hp="beads-ui.board.closed-range";function ey(e){let t=Ct("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ve(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),u=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),p=document.getElementById("detail-panel");if(a&&ip(a),i&&u&&d&&p){let fe=function($,T){let ce="Request failed",l="";if($&&typeof $=="object"){let g=$;if(typeof g.message=="string"&&g.message.length>0&&(ce=g.message),typeof g.details=="string")l=g.details;else if(g.details&&typeof g.details=="object")try{l=JSON.stringify(g.details,null,2)}catch{l=""}}else typeof $=="string"&&$.length>0&&(ce=$);let _=T&&T.length>0?`Failed to load ${T}`:"Request failed";ee.open(_,ce,l)},X=function($){return`${et.getState().workspace.current?.path||""}\0${$}`},te=function(){qe&&(qe().catch(()=>{}),qe=null),W=null,V=null},De=function($){Me=$;let T=()=>{Me!==$||et.getState().selected_id!==$||(Me=null,K($))};if(!be){Ge.then(T);return}T()},ct=function($,T,ce,l,_){return ce!==ot[T]?(_().catch(()=>{}),!1):($.set(l,_),!0)},bt=function(){let $=et.getState();he($.view==="board"),Ne($.view==="worker"),ae($.view==="monitor"),b($.view==="board"||$.view==="worker"||ht||!!$.selected_id)},wt=function(){let $=ir(tt);return $===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:$}}},He=function(){let $=ir(Tt);return $===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:$}}},he=function($){if($)for(let[T,ce]of zi){if(Qe.has(T)||lt.has(T))continue;let l=T===Jn?wt():{type:ce};try{me.register(T,l)}catch(O){t("register %s store failed: %o",T,O)}lt.add(T);let _=ot.board,g=!1;Ue.subscribeList(T,l).then(O=>{g=!ct(Qe,"board",_,T,O)}).catch(O=>{t("subscribe %s failed: %o",T,O),fe(O,"board")}).finally(()=>{lt.delete(T),g&&bt()})}else nt()},nt=function(){ot.board+=1;for(let[$]of zi){let T=Qe.get($);T&&(T().catch(()=>{}),Qe.delete($));try{me.unregister($)}catch(ce){t("unregister %s failed: %o",$,ce)}}},Ne=function($){if(!$){E();return}for(let[T,ce]of qp){if(Z.has(T)||lt.has(T))continue;let l=T===Xn?He():{type:ce};try{me.register(T,l)}catch(O){t("register %s store failed: %o",T,O)}lt.add(T);let _=ot.worker,g=!1;Ue.subscribeList(T,l).then(O=>{g=!ct(Z,"worker",_,T,O)}).catch(O=>{t("subscribe %s failed: %o",T,O),fe(O,"worker")}).finally(()=>{lt.delete(T),g&&bt()})}},E=function(){ot.worker+=1;for(let[$]of qp){let T=Z.get($);T&&(T().catch(()=>{}),Z.delete($));try{me.unregister($)}catch(ce){t("unregister %s failed: %o",$,ce)}}},b=function($){if(!$){S();return}le||(we("subscribe-worker-queue",{id:jp}).catch(T=>{t("subscribe-worker-queue failed: %o",T)}),we("subscribe-worker-parallel-analysis",{id:Bp}).catch(T=>{t("subscribe-worker-parallel-analysis failed: %o",T)}),le=()=>(we("unsubscribe-worker-parallel-analysis",{id:Bp}),we("unsubscribe-worker-queue",{id:jp})))},S=function(){le&&(le().catch(()=>{}),le=null),gt.clear()},ae=function($){if(!$){oe();return}H||(we("subscribe-monitor-pipeline",{id:Fp}).catch(T=>{t("subscribe-monitor-pipeline failed: %o",T)}),H=()=>we("unsubscribe-monitor-pipeline",{id:Fp}))},oe=function(){H&&(H().catch(()=>{}),H=null)},Se=function(){ye||(we("subscribe-ui-order",{id:Up}).catch($=>{t("subscribe-ui-order failed: %o",$)}),ye=()=>we("unsubscribe-ui-order",{id:Up}))},Je=function(){ye&&(ye().catch(()=>{}),ye=null),ue.clear()},Ye=function(){rt||(we("subscribe-display-policy",{id:Wp}).catch($=>{t("subscribe-display-policy failed: %o",$)}),rt=()=>we("unsubscribe-display-policy",{id:Wp}))},dt=function(){rt&&(rt().catch(()=>{}),rt=null),Ce.clear()},ft=function(){Rt||(we("subscribe-impl-presets",{id:zp}).catch($=>{t("subscribe-impl-presets failed: %o",$)}),Rt=()=>we("unsubscribe-impl-presets",{id:zp}))},Lt=function($){if(!$)return"Unknown";let T=$.split("/").filter(Boolean);return T.length>0?T[T.length-1]:"Unknown"},y=function($,T){v.open($.path,{missing_state:$.missing_state,...T?{workspace:T}:{}})};var f=fe,h=X,w=te,x=De,N=ct,j=bt,Y=wt,J=He,L=he,I=nt,D=Ne,z=E,A=b,U=S,F=ae,ke=oe,ve=Se,ie=Je,G=Ye,xe=dt,Oe=ft,re=Lt,se=y;let Ae=document.getElementById("header-loading"),B=lc(Ae),ee=Yu(e),$e=Np(),we=B.wrapSend(($,T)=>$e.send($,T)),Ue=ec(we),me=tc(),Ze=sc(),gt=rc(),R=Fl(),ue=nc(),Ce=Nl(),Re=ql(),je=jl();$e.on("impl-presets-snapshot",$=>{let T=$;T&&typeof T.revision=="number"&&Array.isArray(T.presets)&&Re.set({revision:T.revision,presets:T.presets})}),$e.on("monitor-pipeline-snapshot",$=>{let T=$;if(!(!T||!Array.isArray(T.workspaces)))try{R.set(T.workspaces,T.workspaces_state)}catch{}}),$e.on("ui-order-snapshot",$=>{let T=$;if(T&&typeof T.revision=="number")try{ue.set({revision:T.revision,order:T.order&&typeof T.order=="object"?T.order:{}})}catch{}}),$e.on("display-policy-snapshot",$=>{let T=$;if(T&&T.policy&&typeof T.policy=="object")try{Ce.set(T.policy)}catch{}}),$e.on("session-log-snapshot",$=>{let T=$;if(T&&typeof T.id=="string")try{je.set(T.id,Array.isArray(T.lines)?T.lines:[],typeof T.last_event_at=="number"?T.last_event_at:null)}catch{}}),$e.on("session-log-append",$=>{let T=$;if(T&&typeof T.id=="string")try{je.append(T.id,T.event)}catch{}}),$e.on("snapshot",$=>{let T=$,ce=T&&typeof T.id=="string"?T.id:"",l=ce?me.getStore(ce):null;if(l&&T&&T.type==="snapshot")try{l.applyPush(T)}catch{}}),$e.on("upsert",$=>{let T=$,ce=T&&typeof T.id=="string"?T.id:"",l=ce?me.getStore(ce):null;if(l&&T&&T.type==="upsert")try{l.applyPush(T)}catch{}}),$e.on("delete",$=>{let T=$,ce=T&&typeof T.id=="string"?T.id:"",l=ce?me.getStore(ce):null;if(l&&T&&T.type==="delete")try{l.applyPush(T)}catch{}});let qe=null,W=null,V=null,Me=null,Ke=()=>{},Ge=new Promise($=>{Ke=()=>$(void 0)}),be=!1,P=!1;async function K($){let T=X($);if(T===W||T===V)return;V=T;let ce=`detail:${$}`,l={type:"issue-detail",params:{id:$}};try{me.register(ce,l)}catch(_){t("register detail store failed: %o",_)}try{let _=await Ue.subscribeList(ce,l);if(et.getState().selected_id!==$||X($)!==T){await _().catch(()=>{});return}qe&&await qe().catch(()=>{}),qe=_,W=T}catch(_){t("detail subscribe failed: %o",_),fe(_,"issue details")}finally{V===T&&(V=null)}}let Qe=new Map,lt=new Set,ot={board:0,worker:0},ht=!1,tt=sn;try{let $=window.localStorage.getItem(Hp);dn($)&&(tt=$)}catch{}let Tt=sn;try{let $=window.localStorage.getItem(Jb);dn($)&&(Tt=$)}catch{}async function mt($){if(!dn($)||$===tt)return;tt=$;try{window.localStorage.setItem(Hp,$)}catch{}let T=Qe.get(Jn);if(!T)return;Qe.delete(Jn),await T().catch(()=>{});let ce=wt();try{me.register(Jn,ce)}catch(l){t("register %s store failed: %o",Jn,l)}try{let l=await Ue.subscribeList(Jn,ce);Qe.set(Jn,l)}catch(l){t("re-subscribe %s failed: %o",Jn,l),fe(l,"board")}}async function $t($){if(!dn($)||$===Tt)return;Tt=$;let T=Z.get(Xn);if(!T)return;Z.delete(Xn),await T().catch(()=>{});let ce=He();try{me.register(Xn,ce)}catch(l){t("register %s store failed: %o",Xn,l)}try{let l=await Ue.subscribeList(Xn,ce);Z.set(Xn,l)}catch(l){t("re-subscribe %s failed: %o",Xn,l),fe(l,"worker")}}let Z=new Map,le=null,H=null,ye=null,rt=null,Rt=null;async function en(){rt=null,Ce.clear(),Rt=null,Re.clear(),le=null,H=null,Qe.clear(),Z.clear(),ot.board+=1,ot.worker+=1,ft();let $=et.getState().workspace.current?.path;if($)try{await $e.send("set-workspace",{path:$})}catch(ce){t("workspace restore after reconnect failed: %o",ce);return}Ye();let T=et.getState();he(T.view==="board"),Ne(T.view==="worker"),ae(T.view==="monitor"),b(T.view==="board"||T.view==="worker"||!!T.selected_id)}async function jt(){t("clearing all subscriptions for workspace switch"),nt(),E(),S(),Ze.clear(),Je(),Se(),dt(),Ye(),te();let $=et.getState();if($.selected_id)try{me.unregister(`detail:${$.selected_id}`)}catch{}let T=et.getState();he(T.view==="board"),Ne(T.view==="worker"),ae(T.view==="monitor"),b(T.view==="board"||T.view==="worker"||!!T.selected_id),T.selected_id&&De(T.selected_id)}async function Pt($){t("requesting workspace switch to %s",$),P=!0;try{let T=await $e.send("set-workspace",{path:$});t("workspace switch result: %o",T),T&&T.workspace&&(et.setState({workspace:{current:{path:T.workspace.root_dir,database:T.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",$),T.changed&&(await jt(),de("Switched to "+Lt($),"success",2e3)))}catch(T){throw t("workspace switch failed: %o",T),de("Failed to switch workspace","error",3e3),T}finally{P=!1}}async function Bt($){t("requesting workspace git pull for %s",$);try{let T=await $e.send("git-pull-workspace",{});t("workspace git pull result: %o",T);let ce=T?.status;if(ce==="up_to_date"){de("Already up to date","success",2e3);return}if(ce==="stash_pop_conflict"){de("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}de("Git pulled "+Lt($),"success",2e3)}catch(T){t("workspace git pull failed: %o",T);let ce=T?.code,l=T?.message;if(ce==="rebase_conflict"){de("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(ce==="rebase_conflict_abort_failed"){de("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(ce==="busy"){de("Git pull skipped: another operation is running","warning",3e3);return}let _=l?`: ${l}`:"";throw de(`Git pull failed${_}`,"error",3e3),T}}async function Mt($,T){t("setting workspace visibility %s \u2192 %s",$,String(T));try{await $e.send("set-workspace-visibility",{path:$,visible:T}),await ze()}catch(ce){t("workspace visibility update failed: %o",ce),de("Failed to update project visibility","error",3e3)}}async function ze(){try{let $=await $e.send("list-workspaces",{});if(t("workspaces loaded: %o",$),$&&Array.isArray($.workspaces)){let T=$.workspaces.map(g=>({path:g.path,database:g.database,pid:g.pid,version:g.version})),ce=$.current?{path:$.current.root_dir,database:$.current.db_path}:null,l=Array.isArray($.hidden)?$.hidden.filter(g=>typeof g=="string"):[];et.setState({workspace:{current:ce,available:T,hidden:l}});let _=window.localStorage.getItem("beads-ui.workspace");_&&(!T.some(O=>O.path===_)||l.includes(_)?window.localStorage.removeItem("beads-ui.workspace"):ce&&_!==ce.path&&(t("restoring saved workspace preference: %s",_),await Pt(_)))}}catch($){t("failed to load workspaces: %o",$)}}$e.on("workspace-changed",$=>{t("workspace-changed event: %o",$),$&&$.root_dir&&(et.setState({workspace:{current:{path:$.root_dir,database:$.db_path}}}),ze(),jt())});let tn=!1;if(typeof $e.onConnection=="function"){let $=T=>{t("ws state %s",T),T==="reconnecting"||T==="closed"?(tn=!0,de("Connection lost. Reconnecting\u2026","error",4e3)):T==="open"&&tn&&(tn=!1,de("Reconnected","success",2200),Xb(et,(ce,l)=>{t(`${ce}: %o`,l)}),en())};$e.onConnection($)}let zt="board";try{let $=window.localStorage.getItem("beads-ui.view");($==="board"||$==="worker"||$==="monitor")&&(zt=$)}catch($){t("view parse error: %o",$)}let et=ic({config:Qb(),view:zt});$e.on("worker-queue-snapshot",$=>{let T=$;if(!T||!T.queue)return;let ce=et.getState().workspace.current?.path;if(typeof ce=="string"&&ce.length>0&&T.root_dir!==ce){t("dropping worker-queue snapshot for %s",String(T.root_dir));return}try{Ze.set(T.queue)}catch{}}),$e.on("worker-parallel-analysis-snapshot",$=>{let T=$;if(!T)return;let ce=et.getState().workspace.current?.path;if(!(typeof ce=="string"&&ce.length>0&&typeof T.root_dir=="string"&&T.root_dir!==ce))try{gt.set({settings:T.settings,job:T.job??null,runs:Array.isArray(T.runs)?T.runs:[],last_good:T.last_good??null})}catch{}});let Pe=oc(et);Pe.start();let C=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),pe=async($,T)=>{try{return await we($,T)}catch(ce){if(C.has($))throw ce;return[]}};Wd({global_element:r,repo_element:s},et,Pe);let Le=document.getElementById("workspace-picker");Le&&Pp(Le,et,Pt,Bt,Mt);let at=Vd(e,($,T)=>we($,T));try{let $=document.getElementById("new-issue-btn");$&&$.addEventListener("click",()=>at.open())}catch{}let xt=Qd(e,{policyStore:Ce,queueStore:Ze,implPresetStore:Re,transport:($,T)=>we($,T),onOpenChange:$=>{let T=ht;ht=$,bt(),T&&$===!1&&M.refreshSessionDefaults()},labelOptions:()=>{let $=new Set;for(let[T]of zi)for(let ce of me.snapshotFor(T)||[]){let l=ce.labels;if(Array.isArray(l))for(let _ of l)typeof _=="string"&&_.length>0&&$.add(_)}return Array.from($).sort()}});try{let $=document.getElementById("display-settings-btn");$&&($.setAttribute("aria-label","\uC124\uC815"),$.setAttribute("title","\uC124\uC815"),$.addEventListener("click",()=>xt.open()))}catch{}let yt=document.createElement("div");yt.className="md-viewer-root",document.body.appendChild(yt);let v=Mo(yt,{getWorkspacePath:()=>et.getState().workspace.current?.path}),k=wc(i,{gotoIssue:$=>Pe.gotoIssue($),issueStores:me,transport:pe,workerQueueStore:Ze,uiOrderStore:ue,displayPolicyStore:Ce,closedRange:tt,onClosedRangeChange:$=>{mt($)},onNewIssue:()=>at.open(),openDoc:y}),M=Bi(u,{transport:pe,issueStores:me,queueStore:Ze,analysisStore:gt,sessionLogStore:je,uiOrderStore:ue,gotoIssue:$=>et.setState({selected_id:$}),getWorkspacePath:()=>et.getState().workspace.current?.path,openDoc:y,doneRange:Tt,onDoneRangeChange:$=>{$t($)}}),Q=Ud(d,{transport:pe,pipelineStore:R,execPresetStore:Re,sessionLogStore:je,router:Pe,gotoIssue:$=>Pe.gotoIssue($),getWorkspacePath:()=>et.getState().workspace.current?.path,switchWorkspace:$=>Pt($),openDoc:y}),ge=Ku(p,{issueStores:me,transport:pe,queueStore:Ze,execPresetStore:Re,sessionLogStore:je,getWorkspacePath:()=>et.getState().workspace.current?.path,mdViewer:v,onNavigate:$=>{et.getState().view==="worker"?et.setState({selected_id:$}):Pe.gotoIssue($)},onClose:()=>{let $=et.getState();et.setState({selected_id:null});try{Pe.gotoView($.view==="worker"||$.view==="monitor"?$.view:"board")}catch{}},onOpenExecPresets:()=>{xt.open("execution")}}),Ie=et.getState().selected_id;Ie&&(p.hidden=!1,ge.load(Ie),De(Ie)),et.subscribe($=>{let T=$.selected_id;T?(p.hidden=!1,ge.load(T),P||De(T)):(ge.clear(),p.hidden=!0,te())});let Xe=$=>{i.hidden=$.view!=="board",u.hidden=$.view!=="worker",d.hidden=$.view!=="monitor",o&&o.classList.toggle("is-quiet",$.view==="monitor"),he($.view==="board"),Ne($.view==="worker"),ae($.view==="monitor"),b($.view==="board"||$.view==="worker"||ht||!!$.selected_id),!$.selected_id&&$.view==="board"&&k.load(),$.view==="worker"&&M.load(),$.view==="monitor"?Q.load():Q.pause(),window.localStorage.setItem("beads-ui.view",$.view)};et.subscribe(Xe),Xe(et.getState()),Se(),Ye(),ft(),ze().finally(()=>{be=!0,Ke()}),window.addEventListener("keydown",$=>{let T=$.ctrlKey||$.metaKey,ce=String($.key||"").toLowerCase(),l=$.target,_=l&&l.tagName?String(l.tagName).toLowerCase():"",g=_==="input"||_==="textarea"||_==="select"||l&&typeof l.isContentEditable=="boolean"&&l.isContentEditable;T&&ce==="n"&&(g||($.preventDefault(),at.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&ey(t)});export{ey as bootstrap,Qb as readBootstrapConfig,Xb as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
