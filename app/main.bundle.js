var kd=Object.create;var bo=Object.defineProperty;var $d=Object.getOwnPropertyDescriptor;var xd=Object.getOwnPropertyNames;var Ad=Object.getPrototypeOf,Sd=Object.prototype.hasOwnProperty;var Ed=(e,t,r)=>t in e?bo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var ho=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Td=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of xd(t))!Sd.call(e,s)&&s!==r&&bo(e,s,{get:()=>t[s],enumerable:!(n=$d(t,s))||n.enumerable});return e};var Cd=(e,t,r)=>(r=e!=null?kd(Ad(e)):{},Td(t||!e||!e.__esModule?bo(r,"default",{value:e,enumerable:!0}):r,e));var ct=(e,t,r)=>Ed(e,typeof t!="symbol"?t+"":t,r);var Si=ho((jg,Ai)=>{var Qr=1e3,Jr=Qr*60,en=Jr*60,qr=en*24,Ld=qr*7,Od=qr*365.25;Ai.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Md(e);if(r==="number"&&isFinite(e))return t.long?Dd(e):Pd(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Md(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Od;case"weeks":case"week":case"w":return r*Ld;case"days":case"day":case"d":return r*qr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*en;case"minutes":case"minute":case"mins":case"min":case"m":return r*Jr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Qr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Pd(e){var t=Math.abs(e);return t>=qr?Math.round(e/qr)+"d":t>=en?Math.round(e/en)+"h":t>=Jr?Math.round(e/Jr)+"m":t>=Qr?Math.round(e/Qr)+"s":e+"ms"}function Dd(e){var t=Math.abs(e);return t>=qr?ds(e,t,qr,"day"):t>=en?ds(e,t,en,"hour"):t>=Jr?ds(e,t,Jr,"minute"):t>=Qr?ds(e,t,Qr,"second"):e+" ms"}function ds(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Ti=ho((Bg,Ei)=>{function Nd(e){r.debug=r,r.default=r,r.coerce=u,r.disable=a,r.enable=s,r.enabled=c,r.humanize=Si(),r.destroy=d,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let f=0;for(let b=0;b<p.length;b++)f=(f<<5)-f+p.charCodeAt(b),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=t;function r(p){let f,b=null,E,T;function M(...B){if(!M.enabled)return;let J=M,X=Number(new Date),q=X-(f||X);J.diff=q,J.prev=f,J.curr=X,f=X,B[0]=r.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let S=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(O,w)=>{if(O==="%%")return"%";S++;let W=r.formatters[w];if(typeof W=="function"){let ne=B[S];O=W.call(J,ne),B.splice(S,1),S--}return O}),r.formatArgs.call(J,B),(J.log||r.log).apply(J,B)}return M.namespace=p,M.useColors=r.useColors(),M.color=r.selectColor(p),M.extend=n,M.destroy=r.destroy,Object.defineProperty(M,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(E!==r.namespaces&&(E=r.namespaces,T=r.enabled(p)),T),set:B=>{b=B}}),typeof r.init=="function"&&r.init(M),M}function n(p,f){let b=r(this.namespace+(typeof f>"u"?":":f)+p);return b.log=this.log,b}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of f)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(p,f){let b=0,E=0,T=-1,M=0;for(;b<p.length;)if(E<f.length&&(f[E]===p[b]||f[E]==="*"))f[E]==="*"?(T=E,M=b,E++):(b++,E++);else if(T!==-1)E=T+1,M++,b=M;else return!1;for(;E<f.length&&f[E]==="*";)E++;return E===f.length}function a(){let p=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),p}function c(p){for(let f of r.skips)if(o(p,f))return!1;for(let f of r.names)if(o(p,f))return!0;return!1}function u(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ei.exports=Nd});var Ci=ho((Pt,ps)=>{Pt.formatArgs=Fd;Pt.save=jd;Pt.load=Bd;Pt.useColors=qd;Pt.storage=Ud();Pt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Pt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function qd(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Fd(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ps.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Pt.log=console.debug||console.log||(()=>{});function jd(e){try{e?Pt.storage.setItem("debug",e):Pt.storage.removeItem("debug")}catch{}}function Bd(){let e;try{e=Pt.storage.getItem("debug")||Pt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Ud(){try{return localStorage}catch{}}ps.exports=Ti()(Pt);var{formatters:Wd}=ps.exports;Wd.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var hn=globalThis,os=hn.trustedTypes,ui=os?os.createPolicy("lit-html",{createHTML:e=>e}):void 0,vo="$lit$",pr=`lit$${Math.random().toFixed(9).slice(2)}$`,wo="?"+pr,Rd=`<${wo}>`,Mr=document,yn=()=>Mr.createComment(""),vn=e=>e===null||typeof e!="object"&&typeof e!="function",ko=Array.isArray,gi=e=>ko(e)||typeof e?.[Symbol.iterator]=="function",yo=`[ 	
\f\r]`,bn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,di=/-->/g,pi=/>/g,Lr=RegExp(`>|${yo}(?:([^\\s"'>=/]+)(${yo}*=${yo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fi=/'/g,_i=/"/g,bi=/^(?:script|style|textarea|title)$/i,$o=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=$o(1),$r=$o(2),Og=$o(3),Ut=Symbol.for("lit-noChange"),ht=Symbol.for("lit-nothing"),mi=new WeakMap,Or=Mr.createTreeWalker(Mr,129);function hi(e,t){if(!ko(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ui!==void 0?ui.createHTML(t):t}var yi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=bn;for(let c=0;c<r;c++){let u=e[c],d,p,f=-1,b=0;for(;b<u.length&&(a.lastIndex=b,p=a.exec(u),p!==null);)b=a.lastIndex,a===bn?p[1]==="!--"?a=di:p[1]!==void 0?a=pi:p[2]!==void 0?(bi.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=Lr):p[3]!==void 0&&(a=Lr):a===Lr?p[0]===">"?(a=s??bn,f=-1):p[1]===void 0?f=-2:(f=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?Lr:p[3]==='"'?_i:fi):a===_i||a===fi?a=Lr:a===di||a===pi?a=bn:(a=Lr,s=void 0);let E=a===Lr&&e[c+1].startsWith("/>")?" ":"";o+=a===bn?u+Rd:f>=0?(n.push(d),u.slice(0,f)+vo+u.slice(f)+pr+E):u+pr+(f===-2?c:E)}return[hi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},wn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,c=t.length-1,u=this.parts,[d,p]=yi(t,r);if(this.el=e.createElement(d,n),Or.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=Or.nextNode())!==null&&u.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(vo)){let b=p[a++],E=s.getAttribute(f).split(pr),T=/([.?@])?(.*)/.exec(b);u.push({type:1,index:o,name:T[2],strings:E,ctor:T[1]==="."?is:T[1]==="?"?ls:T[1]==="@"?cs:Dr}),s.removeAttribute(f)}else f.startsWith(pr)&&(u.push({type:6,index:o}),s.removeAttribute(f));if(bi.test(s.tagName)){let f=s.textContent.split(pr),b=f.length-1;if(b>0){s.textContent=os?os.emptyScript:"";for(let E=0;E<b;E++)s.append(f[E],yn()),Or.nextNode(),u.push({type:2,index:++o});s.append(f[b],yn())}}}else if(s.nodeType===8)if(s.data===wo)u.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(pr,f+1))!==-1;)u.push({type:7,index:o}),f+=pr.length-1}o++}}static createElement(t,r){let n=Mr.createElement("template");return n.innerHTML=t,n}};function Pr(e,t,r=e,n){if(t===Ut)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=vn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Pr(e,s._$AS(e,t.values),s,n)),t}var as=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Mr).importNode(r,!0);Or.currentNode=s;let o=Or.nextNode(),a=0,c=0,u=n[0];for(;u!==void 0;){if(a===u.index){let d;u.type===2?d=new Xr(o,o.nextSibling,this,t):u.type===1?d=new u.ctor(o,u.name,u.strings,this,t):u.type===6&&(d=new us(o,this,t)),this._$AV.push(d),u=n[++c]}a!==u?.index&&(o=Or.nextNode(),a++)}return Or.currentNode=Mr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Xr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=ht,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Pr(this,t,r),vn(t)?t===ht||t==null||t===""?(this._$AH!==ht&&this._$AR(),this._$AH=ht):t!==this._$AH&&t!==Ut&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):gi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ht&&vn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Mr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=wn.createElement(hi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new as(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=mi.get(t.strings);return r===void 0&&mi.set(t.strings,r=new wn(t)),r}k(t){ko(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(yn()),this.O(yn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Dr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=ht,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ht}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Pr(this,t,r,0),a=!vn(t)||t!==this._$AH&&t!==Ut,a&&(this._$AH=t);else{let c=t,u,d;for(t=o[0],u=0;u<o.length-1;u++)d=Pr(this,c[n+u],r,u),d===Ut&&(d=this._$AH[u]),a||(a=!vn(d)||d!==this._$AH[u]),d===ht?t=ht:t!==ht&&(t+=(d??"")+o[u+1]),this._$AH[u]=d}a&&!s&&this.j(t)}j(t){t===ht?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},is=class extends Dr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ht?void 0:t}},ls=class extends Dr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ht)}},cs=class extends Dr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Pr(this,t,r,0)??ht)===Ut)return;let n=this._$AH,s=t===ht&&n!==ht||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==ht&&(n===ht||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},us=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Pr(this,t)}},vi={M:vo,P:pr,A:wo,C:1,L:yi,R:as,D:gi,V:Pr,I:Xr,H:Dr,N:ls,U:cs,B:is,F:us},Id=hn.litHtmlPolyfillSupport;Id?.(wn,Xr),(hn.litHtmlVersions??(hn.litHtmlVersions=[])).push("3.3.1");var Je=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Xr(t.insertBefore(yn(),o),o,void 0,r??{})}return s._$AI(e),s};var Nt="today",ar=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Wt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Nr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function wi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ki(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function $i(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function xi(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),c=e.get(a)||{lines:[],last_event_at:null};c.lines=[...c.lines,o],c.last_event_at=Date.now(),e.set(a,c),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Ri=Cd(Ci(),1);function gt(e){return(0,Ri.default)(`beads-ui:${e}`)}function Zt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Fr(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Oi(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Mi(e,t){let r=Zt(e.updated_at),n=Zt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Pi(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Zt(e.created_at),o=Zt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Di(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var zd=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ii(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Li(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=zd.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ni(e,t){let r=Ii(e),n=Ii(t);if(r!==n)return r<n?-1:1;let s=Li(e),o=Li(t);if(s!==o)return s<o?-1:1;let a=Zt(e&&e.created_at),c=Zt(t&&t.created_at);if(a!==c)return a<c?-1:1;let u=e&&e.id,d=t&&t.id;return u===d?0:String(u)<String(d)?-1:1}var xo=2**20;function tn(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Zt(e&&e.created_at)}function fs(e){return(t,r)=>{let n=tn(t,e),s=tn(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Ao(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!a&&!c)return{rank:0};if(!a)return{rank:tn(c,r)-xo};if(!c)return{rank:tn(a,r)+xo};let u=tn(a,r),d=tn(c,r),p=(u+d)/2;return u<p&&p<d?{rank:p}:{renormalize:n.map((f,b)=>({bead_id:f.id,rank:b*xo}))}}function So(e,t={}){let r=gt(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,c=!1,u=t.sort||Fr;function d(){for(let b of Array.from(a))try{b()}catch{}}function p(){s=Array.from(n.values()).sort(u)}function f(b){if(c||!b||b.id!==e)return;let E=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,E),!(E<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(E<=o)return;n.clear();let T=Array.isArray(b.issues)?b.issues:[];for(let M of T)M&&typeof M.id=="string"&&M.id.length>0&&n.set(M.id,M);p(),o=E,d();return}if(b.type==="upsert"){let T=b.issue;if(T&&typeof T.id=="string"&&T.id.length>0){let M=n.get(T.id);if(!M)n.set(T.id,T);else{let B=Number.isFinite(M.updated_at)?M.updated_at:0,J=Number.isFinite(T.updated_at)?T.updated_at:0;if(B<=J){for(let X of Object.keys(M))X in T||delete M[X];for(let[X,q]of Object.entries(T))M[X]=q}}p()}o=E,d()}else if(b.type==="delete"){let T=String(b.issue_id||"");T&&(n.delete(T),p()),o=E,d()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){c=!0,n.clear(),s=[],a.clear(),o=0}}}function _s(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function qi(e){let t=gt("subs"),r=new Map,n=new Map;function s(c,u){t("applyDelta %s +%d ~%d -%d",c,(u.added||[]).length,(u.updated||[]).length,(u.removed||[]).length);let d=n.get(c);if(!d||d.size===0)return;let p=Array.isArray(u.added)?u.added:[],f=Array.isArray(u.updated)?u.updated:[],b=Array.isArray(u.removed)?u.removed:[];for(let E of Array.from(d)){let T=r.get(E);if(!T)continue;let M=T.itemsById;for(let B of p)typeof B=="string"&&B.length>0&&M.set(B,!0);for(let B of f)typeof B=="string"&&B.length>0&&M.set(B,!0);for(let B of b)typeof B=="string"&&B.length>0&&M.delete(B)}}async function o(c,u){let d=_s(u);if(t("subscribe %s key=%s",c,d),!r.has(c))r.set(c,{key:d,itemsById:new Map});else{let f=r.get(c);if(f&&f.key!==d){let b=n.get(f.key);b&&(b.delete(c),b.size===0&&n.delete(f.key)),r.set(c,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let p=n.get(d);p&&p.add(c);try{await e("subscribe-list",{id:c,type:u.type,params:u.params})}catch(f){let b=r.get(c)||null;if(b){let E=n.get(b.key);E&&(E.delete(c),E.size===0&&n.delete(b.key))}throw r.delete(c),f}return async()=>{t("unsubscribe %s key=%s",c,d);try{await e("unsubscribe-list",{id:c})}catch{}let f=r.get(c)||null;if(f){let b=n.get(f.key);b&&(b.delete(c),b.size===0&&n.delete(f.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:_s,selectors:{getIds(c){let u=r.get(c);return u?Array.from(u.itemsById.keys()):[]},has(c,u){let d=r.get(c);return d?d.itemsById.has(u):!1},count(c){let u=r.get(c);return u?u.itemsById.size:0},getItemsById(c){let u=r.get(c),d={};if(!u)return d;for(let p of u.itemsById.keys())d[p]=!0;return d}}}}function Fi(){let e=gt("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let u of Array.from(n))try{u()}catch{}}function a(u,d,p){let f=d?_s(d):"",b=r.get(u)||"",E=t.has(u);if(e("register %s key=%s (prev=%s)",u,f,b),E&&b&&f&&b!==f){let T=t.get(u);if(T)try{T.dispose()}catch{}let M=s.get(u);if(M){try{M()}catch{}s.delete(u)}let B=So(u,p);t.set(u,B);let J=B.subscribe(()=>o());s.set(u,J)}else if(!E){let T=So(u,p);t.set(u,T);let M=T.subscribe(()=>o());s.set(u,M)}return r.set(u,f),()=>c(u)}function c(u){e("unregister %s",u),r.delete(u);let d=t.get(u);d&&(d.dispose(),t.delete(u));let p=s.get(u);if(p){try{p()}catch{}s.delete(u)}}return{register:a,unregister:c,getStore(u){return t.get(u)||null},snapshotFor(u){let d=t.get(u);return d?d.snapshot().slice():[]},subscribe(u){return n.add(u),()=>n.delete(u)}}}function ji(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Bi(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ui(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Eo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Hd(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Gd(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Wi(e){let t=gt("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Hd(n),a=Gd(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let u=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==u&&(window.location.hash=u)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Eo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Eo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Vd=Object.freeze({workspace_config:{default_workspace:null}});function zi(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Vd.workspace_config.default_workspace}}}function Hi(e={}){let t=gt("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:zi(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?zi(o.config):r.config},c=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==r.workspace.hidden[p]),u=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===r.worker.show_closed_children[p])&&!c&&!u||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Gi(e){let t=gt("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function c(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function u(d){return async(f,b)=>{let E=s++,T=Date.now();n.set(E,{type:f,start_ts:T}),t("request start id=%d type=%s count=%d",E,f,r+1),a();let M=!1,B=()=>{M||(M=!0,n.delete(E),c())},J=setTimeout(()=>{M||(t("request TIMEOUT id=%d type=%s elapsed=%dms",E,f,Date.now()-T),B())},3e4);try{let X=await d(f,b),q=Date.now()-T;return t("request done id=%d type=%s elapsed=%dms",E,f,q),X}catch(X){let q=Date.now()-T;throw t("request error id=%d type=%s elapsed=%dms err=%o",E,f,q,X),X}finally{clearTimeout(J),B()}}}return o(),{wrapSend:u,start:a,done:c,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:d-f.start_ts}))}}}function ae(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function ms(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,c){let u=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return u.sort(Di),u;switch(c){case"created_desc":return u.sort(Fr),u;case"created_asc":return u.sort(Oi),u;case"updated_desc":return u.sort(Mi),u;case"priority":return u.sort(Pi),u;case"manual":default:{let d=r();return d?u.sort(fs(d)):u.sort(Fr),u}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let c of a)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function jr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function $t(e){let t=jr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function qt(e,t){let r=jr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let u=Math.floor(c/7);if(c<30)return`${u}\uC8FC \uC804`;let d=Math.floor(c/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}function gs(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=jr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function bs(e){let t=e.transport,r=e.uiOrderStore;function n(a,c){return"renormalize"in a?a.renormalize:[{bead_id:c,rank:a.rank}]}function s(a,c){let u={...a.order};for(let d of c)u[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:u})}async function o(a,c,u){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},p=n(Ao(c,u,d.order),a);s(d,p);let f=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(f&&f.conflict){let b={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(b);let E=n(Ao(c,u,b.order),a);s(b,E);let T=await t("ui-order-set",{expected_revision:b.revision,entries:E});T&&T.applied&&r.set({revision:typeof T.revision=="number"?T.revision:0,order:T.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function hs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function To(e,t){return!t||typeof e!="string"||e.length===0||hs(t.visible_labels).includes(e)?!0:hs(t.hidden_labels).includes(e)?!1:!hs(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function ys(e,t){return hs(e).filter(r=>To(r,t))}function xr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Kd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ki={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Vi={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Yd={review:"\u2713",skip:"\u2298"},Ar={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Zd(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Yi(e){let t=e&&e.fill||"none";return t==="none"?Ar.none:e&&e.stale===!0?Ar.stale:t==="dim"?Ar.dim:e&&e.glyph==="review"?Ar.review:e&&e.glyph==="skip"?Ar.skip:Ar.done}function Xd(e){if(!e||e.fill==="none"||!e.approval_state)return Yi(e);let t=[];return e.glyph==="review"?t.push(Ar.review):e.glyph==="skip"&&t.push(Ar.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Qd(e,t,r){let n=Kd[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Yd[t&&t.glyph||""]||"",c="bar";s==="dim"?c+=` b-${n} dim`:s==="full"&&(c+=` b-${n} full`),o&&(c+=" stale"),r&&(c+=" cur");let u=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${c} style=${d}>${a}</div>
      <div class=${u}>
        ${Ki[e]||e}
      </div>
    </div>
  `}function vs(e,t){if(!e||!e.stages)return"";let r=Vi[e.route]||Vi.spec_backed,n=e.stages,s=Zd(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Ki[a]||a} ${a==="plan"?Xd(n[a]||{}):Yi(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Qd(a,n[a]||{},a===s))}
    </div>
  `}function Jd(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Zi=2;function ep(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Zi).join(", "),s=r.length-Zi,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Co(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Xi(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Br(e){return`${e.kind}:${Xi(e)}@${e.sha}`}function ws(e,t){if(!e)return null;let r=Co(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=Co(t?.kind),a=o!==null&&t?.kind!==e.kind,c=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,u=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${Br(t)}`:"";return{kind:e.kind,label:c,title:`${u}${d}`}}function Qi(e,t){let r=ws(e,t);return r?i`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function tp(e){if(!e)return null;let t=Co(e.kind);return t?i`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Br(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function rp(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&xr(r,"route")){let c=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${c?" is-derived":""}"
        title=${c?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${c?"unset":n.route}</span
      >`)}if(n.fast_track&&xr(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&xr(r,"pr")){let c=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${c!=null?` #${c}`:""}`}</span
      >`)}let o=Qi(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let c=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Br(c)}`}
        >${`exec ${c.kind==="delegated"?Xi(c):`main:${c.actor}`} \xB7 ${c.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let c=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${c.actor}@${c.sha}`}
        >${`impl ${c.actor} \xB7 ${c.sha.slice(0,7)}`}</span
      >`)}for(let c of ys(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${c}</span>`);return e.from_id&&xr(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${c=>{c.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(c,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),xr(r,"blocked")&&s.push(...ep(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&xr(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function np(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function sp(e){let t=qt(e.created_at),r=qt(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${$t(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${$t(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function op(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Ni):r.children;return i`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?i`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:i`<span class="board-card__roll-none">children 없음</span>`}
        ${sp(e)}
      </div>
      ${n>0&&r.current?i`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?i`<div class="board-card__roll-list">
            ${o.map((a,c)=>i`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${u=>t.onChildClick&&t.onChildClick(u,a.id)}
                >
                  <span class=${np(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${c+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${ws(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?i`<span class="board-card__roll-child-chips">
                        ${Qi(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${tp(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function ks(e,t){let r=Jd(e.priority);return i`
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
        ${r?i`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${rp(e,t)}
      ${e.workflow&&xr(t.policy||null,"stepper")?vs(e.workflow,e.status):""}
      ${op(e,t)}
    </article>
  `}function rn(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
        ${n?i`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${ar.map(o=>i`<option
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
        ${e.items.map(o=>ks(o,t))}
      </div>
    </section>
  `}function Ji(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>ks(n,t))}
        </div>
      </div>
    </dialog>
  `}var ap=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],ip=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],lp=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function cp(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
      ${r.label_menu_open?i`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?i`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>i`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?i`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function el(e,t,r){return i`
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
        ${ap.map(n=>i`<option
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
        ${ip.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${cp(e,t,r)}
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
        ${lp.map(n=>i`<option
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
  `}var up=200,dp={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},pp=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),tl="beads-ui.board.sort",rl=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function fp(){try{let e=window.localStorage.getItem(tl);if(e&&rl.has(e))return e}catch{}return"created_desc"}function nl(e,t){let r=gt("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,c=t.displayPolicyStore,u=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,f=t.closedRange||Nt,b=s?ms(s,a):null,E=bs({transport:o,uiOrderStore:a}),T=[],M=[],B=[],J=[],X=[],q=[],S=!1,A=0,O=fp(),w=new Map,W=new Map,ne=new Map,ce=new Set,N={search:"",priority:"",type:"",labels:[]},P=!1,de=null;function ve(z){return String(z.status||"open")==="open"}function we(z){let te=String(z.status||"open");return te==="open"||te==="blocked"}function Fe(z){let te=N.search.trim().toLowerCase(),me=N.priority,k=N.type,I=N.labels;return z.filter(F=>{if(te){let Q=String(F.id||"").toLowerCase(),ke=String(F.title||"").toLowerCase();if(!Q.includes(te)&&!ke.includes(te))return!1}if(me!==""&&String(F.priority)!==me||k!==""&&String(F.issue_type||"")!==k)return!1;if(I.length>0){let Q=Array.isArray(F.labels)?F.labels:[];if(!I.some(ke=>Q.includes(ke)))return!1}return!0})}function rt(){let z=new Set;for(let te of[T,M,B,J,X,q])for(let me of te){let k=Array.isArray(me.labels)?me.labels:[];for(let I of k)typeof I=="string"&&I.length>0&&z.add(I)}return Array.from(z).sort()}function Ue(){return N.search.trim()!==""||N.priority!==""||N.type!==""||N.labels.length>0}function fe(){try{if(b){let z=b.selectBoardColumn("tab:board:in-progress","in_progress",O),te=b.selectBoardColumn("tab:board:blocked","blocked",O).filter(we),me=new Set(z.map(Ce=>Ce.id)),k=b.selectBoardColumn("tab:board:ready","ready",O).filter(Ce=>ve(Ce)&&!me.has(Ce.id)),I=b.selectBoardColumn("tab:board:resolved","resolved",O),F=b.selectBoardColumn("tab:board:deferred","deferred",O),Q=b.selectBoardColumn("tab:board:closed","closed").slice(0,up),ke=[...te,...k,...z,...I,...Q];Le(ke);let Z=new Set;for(let Ce of ke)Ce&&Ce.id&&!Ro(Ce)&&Z.add(Ce.id);let Ee=!Ue();T=Ee?kn(te,Z):te,M=Ee?kn(k,Z):k,B=Ee?kn(z,Z):z,J=Ee?kn(I,Z):I,X=F,A=F.length,q=Ee?kn(Q,Z):Q,w=new Map;for(let Ce of T)w.set(Ce.id,"open");for(let Ce of M)w.set(Ce.id,"open");for(let Ce of B)w.set(Ce.id,"in_progress");for(let Ce of J)w.set(Ce.id,"resolved");for(let Ce of X)w.set(Ce.id,"deferred");for(let Ce of q)w.set(Ce.id,"closed");W=new Map;for(let Ce of T)W.set(Ce.id,"blocked-col");for(let Ce of M)W.set(Ce.id,"ready-col");for(let Ce of B)W.set(Ce.id,"in-progress-col");for(let Ce of J)W.set(Ce.id,"resolved-col");for(let Ce of q)W.set(Ce.id,"closed-col")}D()}catch{T=[],M=[],B=[],J=[],X=[],q=[],ne=new Map,D()}}function Le(z){let te=new Map;for(let k of z)k&&k.id&&!te.has(k.id)&&te.set(k.id,k);let me=new Map;for(let k of te.values()){let I=Ro(k);if(!I)continue;let F=me.get(I);F||(F=[],me.set(I,F)),F.push({id:k.id,title:k.title,status:k.status,metadata:k.metadata,workflow:k.workflow,created_at:k.created_at,updated_at:k.updated_at})}ne=me}function ge(z){let te=ne.get(z)||[],me=0;for(let I of te)(I.status==="resolved"||I.status==="closed")&&(me+=1);let k=gs(te);return{total:te.length,count:me,current:k,children:te}}function $e(z){return!ce.has(z)}function Re(z,te){z.preventDefault(),z.stopPropagation(),ce.has(te)?ce.delete(te):ce.add(te),D()}function je(z,te){z.preventDefault(),z.stopPropagation(),n(te)}function xe(z,te){z.preventDefault(),z.stopPropagation(),n(te)}function We(z,te){de||n(te)}function Ze(z,te){z.preventDefault(),z.stopPropagation(),_p(te).then(me=>{me&&ae("\uBCF5\uC0AC\uB428","success",1200)})}function Te(z,te){de=te,z.dataTransfer&&(z.dataTransfer.setData("text/plain",te),z.dataTransfer.effectAllowed="move"),z.target.classList.add("board-card--dragging")}function ot(z){z.target.classList.remove("board-card--dragging"),De(),setTimeout(()=>{de=null},0)}function K(z){let te=String(z.target.value||"");!te||te===f||(f=te,d&&d(te),D())}function U(){return c?c.get():null}function se(z){let te=u?u.get():null,me=te?te.cleanup_failed:null;if(!me||typeof me!="object"||Array.isArray(me))return null;let k=me[z];return!k||typeof k!="object"||Array.isArray(k)?null:k}let Oe={onCardClick:We,onCopyId:Ze,onDragStart:Te,onDragEnd:ot,onClosedRangeChange:K,rollupFor:ge,isExpanded:$e,onRollupToggle:Re,onChildClick:je,onFromChipClick:xe,cleanupFailureFor:se,get policy(){return U()}};function ze(z,te){de||(pe(),n(te))}function Ve(z,te){z.preventDefault(),z.stopPropagation(),pe(),n(te)}let Ie={...Oe,onCardClick:ze,onChildClick:Ve,onFromChipClick:Ve,get policy(){return U()}};function lt(z){let te=z.target,me=e.querySelector(".board-filter__labels");te&&me&&me.contains(te)||ee()}function Xe(z){z.key==="Escape"&&ee()}function G(){P||(P=!0,document.addEventListener("mousedown",lt),document.addEventListener("keydown",Xe),D())}function ee(){P&&(P=!1,document.removeEventListener("mousedown",lt),document.removeEventListener("keydown",Xe),D())}function Me(z){z.key==="Escape"&&pe()}function He(){S||(S=!0,document.addEventListener("keydown",Me),D())}function pe(){S&&(S=!1,document.removeEventListener("keydown",Me),D())}let g={onClose:pe,onOverlayClick(z){z.target===z.currentTarget&&pe()}},x={onSearchInput(z){N.search=String(z.target.value||""),fe()},onPriorityChange(z){N.priority=String(z.target.value||""),fe()},onTypeChange(z){N.type=String(z.target.value||""),fe()},onSortChange(z){let te=String(z.target.value||"");if(!(!rl.has(te)||te===O)){O=te;try{window.localStorage.setItem(tl,te)}catch{}fe()}},onDeferredToggle(){S?pe():He()},onLabelMenuToggle(){P?ee():G()},onLabelToggle(z){let te=N.labels.indexOf(z);te===-1?N.labels.push(z):N.labels.splice(te,1),fe()},onLabelClear(){N.labels.length!==0&&(N.labels=[],fe())},onNewIssue(){p&&p()}};function $(){return i`
      <div class="board-view">
        ${el(N,x,{sort_mode:O,deferred_popup_open:S,deferred_count:A,label_options:rt(),label_menu_open:P})}
        <div class="board-root">
          ${rn({title:"Blocked",id:"blocked-col",items:Fe(T)},Oe)}
          ${rn({title:"Ready",id:"ready-col",items:Fe(M)},Oe)}
          ${rn({title:"In progress",id:"in-progress-col",items:Fe(B)},Oe)}
          ${rn({title:"Resolved",id:"resolved-col",items:Fe(J)},Oe)}
          ${rn({title:"Closed",id:"closed-col",items:Fe(q),is_closed:!0,closed_range:f},Oe)}
        </div>
        ${S?Ji({items:Fe(X),count:A},Ie,g):""}
      </div>
    `}function D(){Je($(),e),V()}function V(){try{let z=e.querySelector("#deferred-popup");z&&!z.open&&(typeof z.showModal=="function"?z.showModal():z.setAttribute("open",""));let te=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let me of te)Array.from(me.querySelectorAll(".board-card")).forEach((I,F)=>{I.tabIndex=F===0?0:-1})}catch{}}async function Y(z,te){if(!o){ae("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:z,status:te}),ae("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(me){r("update-status failed: %o",me),ae("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function le(z){switch(z){case"blocked-col":return T;case"ready-col":return M;case"in-progress-col":return B;case"resolved-col":return J;default:return[]}}function ue(z,te,me){if(!o||!a)return;let k=le(z),I=k.find(Ee=>Ee.id===te);if(!I)return;let F=k.filter(Ee=>Ee.id!==te),Q=me.closest?me.closest(".board-card"):null,ke=F.length;if(Q){let Ee=Q.getAttribute("data-issue-id");if(Ee===te)return;let Ce=F.findIndex(mt=>mt.id===Ee);Ce>=0&&(ke=Ce)}let Z=F.slice();Z.splice(ke,0,I),E.applyReorder(te,Z,ke)}function De(){for(let z of Array.from(e.querySelectorAll(".board-column--drag-over")))z.classList.remove("board-column--drag-over")}let be=null;e.addEventListener("dragover",z=>{z.preventDefault(),z.dataTransfer&&(z.dataTransfer.dropEffect="move");let me=z.target.closest(".board-column");me&&me!==be&&(be&&be.classList.remove("board-column--drag-over"),me.classList.add("board-column--drag-over"),be=me)}),e.addEventListener("dragleave",z=>{let te=z.relatedTarget;(!te||!e.contains(te))&&be&&(be.classList.remove("board-column--drag-over"),be=null)}),e.addEventListener("drop",z=>{z.preventDefault(),be&&(be.classList.remove("board-column--drag-over"),be=null);let te=z.target,me=te.closest(".board-column");if(!me)return;let k=z.dataTransfer?.getData("text/plain")||"";if(!k)return;let I=me.id,F=W.get(k);if(F&&F===I){if(pp.has(I)){if(O!=="manual"){ae("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ue(I,k,te)}return}let Q=dp[I];if(!Q){ae("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}w.get(k)!==Q&&Y(k,Q)}),e.addEventListener("keydown",z=>{let te=z.target;if(!(te instanceof HTMLElement))return;let me=String(te.tagName||"").toLowerCase();if(me==="input"||me==="textarea"||me==="select"||me==="button"||me==="a"||te.isContentEditable===!0)return;let k=te.closest(".board-card");if(!k)return;let I=String(z.key||"");if(I==="Enter"||I===" "){z.preventDefault();let Z=k.getAttribute("data-issue-id");Z&&n(Z);return}if(I!=="ArrowUp"&&I!=="ArrowDown"&&I!=="ArrowLeft"&&I!=="ArrowRight")return;z.preventDefault();let F=k.closest(".board-column");if(!F)return;let Q=Array.from(F.querySelectorAll(".board-card")),ke=Q.indexOf(k);if(I==="ArrowDown"&&ke<Q.length-1){Ne(k,Q[ke+1]);return}if(I==="ArrowUp"&&ke>0){Ne(k,Q[ke-1]);return}if(I==="ArrowLeft"||I==="ArrowRight"){let Z=Array.from(e.querySelectorAll(".board-column")),Ee=Z.indexOf(F),Ce=I==="ArrowRight"?1:-1,mt=Ee+Ce;for(;mt>=0&&mt<Z.length;){let Et=Z[mt].querySelector(".board-card");if(Et){Ne(k,Et);return}mt+=Ce}}});function Ne(z,te){try{z.tabIndex=-1,te.tabIndex=0,te.focus()}catch{}}let Ae=null;b&&b.subscribe&&(Ae=b.subscribe(()=>{try{fe()}catch{}}));let Se=null;c&&c.subscribe&&(Se=c.subscribe(()=>{try{fe()}catch{}}));let Ke=null;return u&&u.subscribe&&(Ke=u.subscribe(()=>{D()})),{async load(){r("load"),fe()},clear(){ee(),pe(),Ae&&(Ae(),Ae=null),Se&&(Se(),Se=null),Ke&&(Ke(),Ke=null),e.replaceChildren(),T=[],M=[],B=[],J=[],X=[],q=[],w=new Map,W=new Map}}}function Ro(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function kn(e,t){return e.filter(r=>{let n=Ro(r);return!(n&&t.has(n))})}async function _p(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Xt(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function ir(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Sr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function mp(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),c=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",c.textContent=`${ir(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ir(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,c,n,s,o),t.body.append(r),new Promise(u=>{let d=p=>{typeof r.close=="function"&&r.close(),r.remove(),u(p)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function fr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await mp(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var gp=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],sl={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},bp=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function yt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function _t(e){return typeof e=="string"&&e.length>0?e:null}function nn(e){return e.startsWith("gpt-")?e.slice(4):e}function dt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function al(e,t,r){let n=_t(t[e]);if(n!==null)return{value:n,source:"pin"};let s=_t(r[e]);return s===null?null:{value:s,source:"global"}}function $n(e,t,r,n){return al(e,t,r)||{value:n,source:"base"}}function Io(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&yt(s?.[t])){let a=_t(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&yt(s)){for(let a of Object.values(s))if(yt(a)){let c=_t(a[e]);if(c!==null)return c}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return _t(n?.runners?.[o]?.models?.[e]?.id)||e}function hp(e,t){return _t(t?.review?.reviewers?.[e]?.model)||e}function sn(e,t,r=!1){if(e==="default")return dt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?nn(e):e;return dt(e,t,n,e,"explicit")}function il(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];yt(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(yt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function yp(e,t){let r=[],n=e?.implementation?.model_catalog;yt(n)&&r.push(...Object.keys(n));let s=t?.runners;if(yt(s))for(let o of Object.keys(s))r.includes(o)||r.push(o);return r}function vp(e,t,r){if(e===null)return{runtime:null,offered:!1};let n=!1;for(let s of yp(t,r)){let o=il(s,t,r);if(o.length>0&&(n=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:n}}function Lo(e){return dt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function ol(e,t,r){let n=al(e,t,r);return n?sn(n.value,n.source):dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function on(e){let t=yt(e.pin)?e.pin:{},r=yt(e.global)?e.global:{},n=yt(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&yt(n.session)?n.session:null,o=n?.supported===!0&&yt(n.orchestration)?n.orchestration:null,a=yt(e.runner_catalog)?e.runner_catalog:null,c=_t(r.quick_fix_impl_model),u=vp(c,s,a),d={};if(s){let p=$n("workflow_mode",t,r,_t(s.workflow_mode_default));d.workflow_mode=p.source==="base"?dt(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):sn(p.value,p.source);for(let q of["spec_review","plan_review","impl_review"]){let S=`${q}_model`,A=_t(q==="plan_review"?p.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),O=$n(S,t,r,A);if(O.value===null)d[S]=dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(O.value!=="self"&&O.value!=="skip"&&!yt(s.review?.reviewers?.[O.value]))d[S]=Lo(dt(O.value,O.source,"",null,"explicit"));else{let w=hp(O.value,s);d[S]=dt(O.value,O.source,nn(w),w,O.source==="base"?"default":"explicit")}}for(let[q,S]of Object.entries(sl)){let A=d[S].value;if(A==="self"||A==="skip"){d[q]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let O=_t(s.review?.reviewers?.[A||""]?.effort),w=$n(q,t,r,O);d[q]=w.value===null?dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):dt(w.value,w.source,w.value,w.value,w.source==="base"?"default":"explicit")}let f=yt(s.implementation?.default)?s.implementation.default:{},b=_t(e.route),E=b!==null&&["quick_fix","spec_backed","full_plan"].includes(b),T=yt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},M=E&&yt(T[b])?T[b]:{};for(let q of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let S=$n(q,t,r,q==="impl_dispatch"?_t(M.dispatch)||_t(f.dispatch):_t(f[q.replace("impl_","")]));d[q]=S.value===null?dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):dt(S.value,S.source,S.value,S.value,S.source==="base"?"default":"explicit")}let B=_t(t.impl_runtime),J=B==="inherit"?_t(e.controller_runtime):B,X=b==="quick_fix"&&_t(t.impl_dispatch)===null&&u.runtime!==null&&(B===null||J===u.runtime);if(X){let q=u.runtime,S=c;d.impl_dispatch=dt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),B===null&&(d.impl_runtime=dt(q,"global",`${q} (\uC720\uB3C4)`,q,"explicit")),_t(t.impl_model)===null&&(d.impl_model=dt(S,"global",S,S,"explicit"))}if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let q of["impl_runtime","impl_model","impl_effort","impl_speed"])d[q]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(d.impl_dispatch.value==="delegated"&&!X&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_model.value!==null){let q=d.impl_runtime.value==="inherit"?_t(e.controller_runtime):d.impl_runtime.value,S=q?il(q,s,a):[];if(d.impl_model.value!=="auto"&&S.length>0&&!S.includes(d.impl_model.value))d.impl_model=Lo(d.impl_model);else{let A=Io(d.impl_model.value,q,s,a);d.impl_model.display=nn(A),d.impl_model.full_value=A}}if(d.impl_effort.value==="auto"){let q=_t(e.transport)||(d.impl_runtime.value==="codex"?"codex-native-spawn":d.impl_runtime.value==="claude"?"implement-claude":null),S=q?_t(s.implementation?.effort_by_transport?.[q]?.auto):null;S&&!bp.has(S)?(d.impl_effort.display=`${S} (\uBE44\uD638\uD658)`,d.impl_effort.full_value=S,d.impl_effort.resolution="incompatible"):(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}d.impl_speed.value==="default"&&(d.impl_speed=d.impl_speed.source==="base"?dt("default","base","default (\uC77C\uBC18)","default","default"):sn("default",d.impl_speed.source))}}else for(let p of gp.filter(f=>!f.startsWith("orchestration_")))d[p]=ol(p,t,r);if(!s){for(let[p,f]of Object.entries(sl))(d[f].value==="self"||d[f].value==="skip")&&(d[p]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])d[p]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else d.impl_dispatch.value==="delegated"&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_effort.value==="auto"&&(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){d[p]=ol(p,t,r);continue}let f=p.replace("orchestration_",""),b=_t(o[f]),E=$n(p,t,r,b);if(p==="orchestration_effort"&&E.source==="base"){d[p]=dt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(E.value===null){d[p]=dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let T=E.source==="base"?_t(o.model_id)||E.value:Io(E.value,null,s,a);d[p]=dt(E.value,E.source,nn(T),T,E.source==="base"?"default":"explicit");continue}if(E.value==="default"){d[p]=E.source==="base"?dt("default","base","default (\uC77C\uBC18)","default","default"):sn("default",E.source);continue}d[p]=sn(E.value,E.source)}if(s)if(c===null){let p=d.orchestration_model.full_value;d.quick_fix_impl_model=dt(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${nn(p)})`,null,"default")}else if(u.runtime!==null){let p=Io(c,u.runtime,s,a);d.quick_fix_impl_model=dt(c,"global",nn(p),p,"explicit")}else u.offered?d.quick_fix_impl_model=Lo(dt(c,"global","",null,"explicit")):d.quick_fix_impl_model=sn(c,"global");return d}function wp(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function $s(e){let t=yt(e.pin)?e.pin:{},r=yt(e.global)?e.global:{},n=yt(e.resolution_global)?{...e.resolution_global}:{};delete n[e.key];let s=f=>{let b={...n,...f};return on({pin:e.layer==="pin"?b:t,global:e.layer==="pin"?r:b,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:r,a={...o};delete a[e.key];let c=s(a)[e.key],u=s(o)[e.key],d=_t(o[e.key]),p=[...e.choices];return d!==null&&!p.includes(d)&&p.unshift(d),{unset_label:wp(c,e.layer==="pin"),full_value:c.full_value,unavailable:c.resolution==="unavailable",disabled:u?.resolution==="not_applicable",options:p.map(f=>{let b=s({...o,[e.key]:f})[e.key];return{value:f,label:b.display,full_value:b.full_value}})}}function an(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(c=>{let u=!1,d=f=>{u||(u=!0,typeof t.close=="function"&&t.close(),t.remove(),c(f))},p=()=>d(n.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>d(null)),n.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),p())}),t.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var pl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function xt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var _r=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],xn=[..._r,"reasoning_output_tokens"],kp=["implementation","review-consult"];function Oo(e){let t=0;for(let r of _r)t+=xt(e?.[r]);return t}function $p(e){return!e||typeof e!="object"?!1:_r.some(t=>Number.isFinite(e[t]))}function ll(e){return!e||typeof e!="object"?!1:xn.some(t=>Number.isFinite(e[t]))}function xp(e){let t={};for(let r of xn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function cl(e){let t={};for(let r of xn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ul(e,t){return e==="codex"?xt(t.input_tokens)+xt(t.output_tokens):Oo(t)}function Ap(e){return e==="claude"?"Claude":"Codex"}function Sp(e){return`\u03C4 ${fl(e)}`}function Ep(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${xt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${xt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${xt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${xt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${xt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${xt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${xt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(pl),o.join(`
`)}function At(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Ap(r)} ${Sp(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Ep(r,n)})}return t}function As(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let c=t[o];c||(c={subtotal:0,breakdown:{}},t[o]=c),c.subtotal+=a.subtotal;for(let u of xn)Number.isFinite(a.breakdown[u])&&(c.breakdown[u]=xt(c.breakdown[u])+xt(a.breakdown[u]));a.replayed&&(c.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Mo(e){return!e||typeof e!="object"?null:zt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Tp(e){return e==="codex"?"codex":"claude"}function Er(){return{subtotal:0,breakdown:xp(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function xs(e,t,r){e.subtotal+=t.subtotal;for(let n of xn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=xt(e.breakdown[n])+xt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function dl(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function fl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function ln(e){return $p(e)?`\u03C4 ${fl(Oo(e))}`:null}function Qt(e){let t=ln(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function cn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${xt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${xt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${xt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${xt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Oo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(pl),r.join(`
`)}function zt(e,t){let r={claude:Er(),codex:Er()},n={orchestrator:{claude:Er(),codex:Er()},implementation:{claude:Er(),codex:Er()},"review-consult":{claude:Er(),codex:Er()}},s=new Set;for(let c of Object.values(e||{})){if(!c||c.bead_id!==t)continue;let u=c.usage;if(ll(u)){let p=Tp(c.runner),f=cl(u),b={provider:p,role:"orchestrator",attempt_id:String(c.attempt_id||""),usage:f,subtotal:ul(p,f)};f.replayed===!0&&(b.replayed=!0),typeof c.model=="string"&&(b.model=c.model),typeof c.session_id=="string"&&(b.session_id=c.session_id),xs(r[p],b,!0),xs(n.orchestrator[p],b,!0)}let d=Array.isArray(c.usage_legs)?c.usage_legs:[];for(let p of d){if(!p||p.provider!=="codex"||!kp.includes(p.role)||!ll(p.usage))continue;let f=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!f||s.has(f))continue;s.add(f);let b=cl(p.usage),E={provider:"codex",role:p.role,attempt_id:String(c.attempt_id||""),usage:b,subtotal:ul("codex",b)};E.receipt_id=f,typeof p.model=="string"&&(E.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(E.effort=p.effort),typeof p.session_id=="string"?E.session_id=p.session_id:typeof p.thread_id=="string"&&(E.session_id=p.thread_id),typeof p.turn_id=="string"&&(E.turn_id=p.turn_id),typeof p.completed_at=="string"&&(E.completed_at=p.completed_at),b.replayed===!0&&(E.replayed=!0),xs(r.codex,E,!1),xs(n[E.role].codex,E,!1)}}let o={};for(let c of["claude","codex"]){let u=r[c];if(u.legs.length===0)continue;let d=dl(u,!1);c==="claude"&&u.outer_count>0&&u.outer_cost_count===u.outer_count&&(d.total_cost_usd=u.outer_cost),o[c]=d}if(Object.keys(o).length===0)return null;let a={};for(let c of["orchestrator","implementation","review-consult"]){let u={};for(let d of["claude","codex"]){let p=n[c][d];p.legs.length>0&&(u[d]={...dl(p,!0),legs:p.legs})}Object.keys(u).length>0&&(a[c]=u)}return{providers:o,roles:a}}var{entries:kl,setPrototypeOf:_l,isFrozen:Cp,getPrototypeOf:Rp,getOwnPropertyDescriptor:Ip}=Object,{freeze:It,seal:Ht,create:Bo}=Object,{apply:Uo,construct:Wo}=typeof Reflect<"u"&&Reflect;It||(It=function(t){return t});Ht||(Ht=function(t){return t});Uo||(Uo=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Wo||(Wo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Ss=Lt(Array.prototype.forEach),Lp=Lt(Array.prototype.lastIndexOf),ml=Lt(Array.prototype.pop),An=Lt(Array.prototype.push),Op=Lt(Array.prototype.splice),Ts=Lt(String.prototype.toLowerCase),Po=Lt(String.prototype.toString),Do=Lt(String.prototype.match),Sn=Lt(String.prototype.replace),Mp=Lt(String.prototype.indexOf),Pp=Lt(String.prototype.trim),Jt=Lt(Object.prototype.hasOwnProperty),Rt=Lt(RegExp.prototype.test),En=Dp(TypeError);function Lt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Uo(e,t,n)}}function Dp(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Wo(e,r)}}function tt(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ts;_l&&_l(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Cp(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Np(e){for(let t=0;t<e.length;t++)Jt(e,t)||(e[t]=null);return e}function mr(e){let t=Bo(null);for(let[r,n]of kl(e))Jt(e,r)&&(Array.isArray(n)?t[r]=Np(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=mr(n):t[r]=n);return t}function Tn(e,t){for(;e!==null;){let n=Ip(e,t);if(n){if(n.get)return Lt(n.get);if(typeof n.value=="function")return Lt(n.value)}e=Rp(e)}function r(){return null}return r}var gl=It(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),No=It(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),qo=It(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),qp=It(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Fo=It(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Fp=It(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),bl=It(["#text"]),hl=It(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),jo=It(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),yl=It(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Es=It(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),jp=Ht(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Bp=Ht(/<%[\w\W]*|[\w\W]*%>/gm),Up=Ht(/\$\{[\w\W]*/gm),Wp=Ht(/^data-[\-\w.\u00B7-\uFFFF]+$/),zp=Ht(/^aria-[\-\w]+$/),$l=Ht(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Hp=Ht(/^(?:\w+script|data):/i),Gp=Ht(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),xl=Ht(/^html$/i),Vp=Ht(/^[a-z][.\w]*(-[.\w]+)+$/i),vl=Object.freeze({__proto__:null,ARIA_ATTR:zp,ATTR_WHITESPACE:Gp,CUSTOM_ELEMENT:Vp,DATA_ATTR:Wp,DOCTYPE_NAME:xl,ERB_EXPR:Bp,IS_ALLOWED_URI:$l,IS_SCRIPT_OR_DATA:Hp,MUSTACHE_EXPR:jp,TMPLIT_EXPR:Up}),Cn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Kp=function(){return typeof window>"u"?null:window},Yp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},wl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Al(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Kp(),t=he=>Al(he);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Cn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:c,Element:u,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:b,trustedTypes:E}=e,T=u.prototype,M=Tn(T,"cloneNode"),B=Tn(T,"remove"),J=Tn(T,"nextSibling"),X=Tn(T,"childNodes"),q=Tn(T,"parentNode");if(typeof a=="function"){let he=r.createElement("template");he.content&&he.content.ownerDocument&&(r=he.content.ownerDocument)}let S,A="",{implementation:O,createNodeIterator:w,createDocumentFragment:W,getElementsByTagName:ne}=r,{importNode:ce}=n,N=wl();t.isSupported=typeof kl=="function"&&typeof q=="function"&&O&&O.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:P,ERB_EXPR:de,TMPLIT_EXPR:ve,DATA_ATTR:we,ARIA_ATTR:Fe,IS_SCRIPT_OR_DATA:rt,ATTR_WHITESPACE:Ue,CUSTOM_ELEMENT:fe}=vl,{IS_ALLOWED_URI:Le}=vl,ge=null,$e=tt({},[...gl,...No,...qo,...Fo,...bl]),Re=null,je=tt({},[...hl,...jo,...yl,...Es]),xe=Object.seal(Bo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),We=null,Ze=null,Te=Object.seal(Bo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ot=!0,K=!0,U=!1,se=!0,Oe=!1,ze=!0,Ve=!1,Ie=!1,lt=!1,Xe=!1,G=!1,ee=!1,Me=!0,He=!1,pe="user-content-",g=!0,x=!1,$={},D=null,V=tt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Y=null,le=tt({},["audio","video","img","source","image","track"]),ue=null,De=tt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),be="http://www.w3.org/1998/Math/MathML",Ne="http://www.w3.org/2000/svg",Ae="http://www.w3.org/1999/xhtml",Se=Ae,Ke=!1,z=null,te=tt({},[be,Ne,Ae],Po),me=tt({},["mi","mo","mn","ms","mtext"]),k=tt({},["annotation-xml"]),I=tt({},["title","style","font","a","script"]),F=null,Q=["application/xhtml+xml","text/html"],ke="text/html",Z=null,Ee=null,Ce=r.createElement("form"),mt=function(l){return l instanceof RegExp||l instanceof Function},Et=function(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ee&&Ee===l)){if((!l||typeof l!="object")&&(l={}),l=mr(l),F=Q.indexOf(l.PARSER_MEDIA_TYPE)===-1?ke:l.PARSER_MEDIA_TYPE,Z=F==="application/xhtml+xml"?Po:Ts,ge=Jt(l,"ALLOWED_TAGS")?tt({},l.ALLOWED_TAGS,Z):$e,Re=Jt(l,"ALLOWED_ATTR")?tt({},l.ALLOWED_ATTR,Z):je,z=Jt(l,"ALLOWED_NAMESPACES")?tt({},l.ALLOWED_NAMESPACES,Po):te,ue=Jt(l,"ADD_URI_SAFE_ATTR")?tt(mr(De),l.ADD_URI_SAFE_ATTR,Z):De,Y=Jt(l,"ADD_DATA_URI_TAGS")?tt(mr(le),l.ADD_DATA_URI_TAGS,Z):le,D=Jt(l,"FORBID_CONTENTS")?tt({},l.FORBID_CONTENTS,Z):V,We=Jt(l,"FORBID_TAGS")?tt({},l.FORBID_TAGS,Z):mr({}),Ze=Jt(l,"FORBID_ATTR")?tt({},l.FORBID_ATTR,Z):mr({}),$=Jt(l,"USE_PROFILES")?l.USE_PROFILES:!1,ot=l.ALLOW_ARIA_ATTR!==!1,K=l.ALLOW_DATA_ATTR!==!1,U=l.ALLOW_UNKNOWN_PROTOCOLS||!1,se=l.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Oe=l.SAFE_FOR_TEMPLATES||!1,ze=l.SAFE_FOR_XML!==!1,Ve=l.WHOLE_DOCUMENT||!1,Xe=l.RETURN_DOM||!1,G=l.RETURN_DOM_FRAGMENT||!1,ee=l.RETURN_TRUSTED_TYPE||!1,lt=l.FORCE_BODY||!1,Me=l.SANITIZE_DOM!==!1,He=l.SANITIZE_NAMED_PROPS||!1,g=l.KEEP_CONTENT!==!1,x=l.IN_PLACE||!1,Le=l.ALLOWED_URI_REGEXP||$l,Se=l.NAMESPACE||Ae,me=l.MATHML_TEXT_INTEGRATION_POINTS||me,k=l.HTML_INTEGRATION_POINTS||k,xe=l.CUSTOM_ELEMENT_HANDLING||{},l.CUSTOM_ELEMENT_HANDLING&&mt(l.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(xe.tagNameCheck=l.CUSTOM_ELEMENT_HANDLING.tagNameCheck),l.CUSTOM_ELEMENT_HANDLING&&mt(l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(xe.attributeNameCheck=l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),l.CUSTOM_ELEMENT_HANDLING&&typeof l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(xe.allowCustomizedBuiltInElements=l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Oe&&(K=!1),G&&(Xe=!0),$&&(ge=tt({},bl),Re=[],$.html===!0&&(tt(ge,gl),tt(Re,hl)),$.svg===!0&&(tt(ge,No),tt(Re,jo),tt(Re,Es)),$.svgFilters===!0&&(tt(ge,qo),tt(Re,jo),tt(Re,Es)),$.mathMl===!0&&(tt(ge,Fo),tt(Re,yl),tt(Re,Es))),l.ADD_TAGS&&(typeof l.ADD_TAGS=="function"?Te.tagCheck=l.ADD_TAGS:(ge===$e&&(ge=mr(ge)),tt(ge,l.ADD_TAGS,Z))),l.ADD_ATTR&&(typeof l.ADD_ATTR=="function"?Te.attributeCheck=l.ADD_ATTR:(Re===je&&(Re=mr(Re)),tt(Re,l.ADD_ATTR,Z))),l.ADD_URI_SAFE_ATTR&&tt(ue,l.ADD_URI_SAFE_ATTR,Z),l.FORBID_CONTENTS&&(D===V&&(D=mr(D)),tt(D,l.FORBID_CONTENTS,Z)),g&&(ge["#text"]=!0),Ve&&tt(ge,["html","head","body"]),ge.table&&(tt(ge,["tbody"]),delete We.tbody),l.TRUSTED_TYPES_POLICY){if(typeof l.TRUSTED_TYPES_POLICY.createHTML!="function")throw En('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof l.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw En('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');S=l.TRUSTED_TYPES_POLICY,A=S.createHTML("")}else S===void 0&&(S=Yp(E,s)),S!==null&&typeof A=="string"&&(A=S.createHTML(""));It&&It(l),Ee=l}},nt=tt({},[...No,...qo,...qp]),vt=tt({},[...Fo,...Fp]),ur=function(l){let _=q(l);(!_||!_.tagName)&&(_={namespaceURI:Se,tagName:"template"});let C=Ts(l.tagName),H=Ts(_.tagName);return z[l.namespaceURI]?l.namespaceURI===Ne?_.namespaceURI===Ae?C==="svg":_.namespaceURI===be?C==="svg"&&(H==="annotation-xml"||me[H]):!!nt[C]:l.namespaceURI===be?_.namespaceURI===Ae?C==="math":_.namespaceURI===Ne?C==="math"&&k[H]:!!vt[C]:l.namespaceURI===Ae?_.namespaceURI===Ne&&!k[H]||_.namespaceURI===be&&!me[H]?!1:!vt[C]&&(I[C]||!nt[C]):!!(F==="application/xhtml+xml"&&z[l.namespaceURI]):!1},wt=function(l){An(t.removed,{element:l});try{q(l).removeChild(l)}catch{B(l)}},Tt=function(l,_){try{An(t.removed,{attribute:_.getAttributeNode(l),from:_})}catch{An(t.removed,{attribute:null,from:_})}if(_.removeAttribute(l),l==="is")if(Xe||G)try{wt(_)}catch{}else try{_.setAttribute(l,"")}catch{}},dr=function(l){let _=null,C=null;if(lt)l="<remove></remove>"+l;else{let ye=Do(l,/^[\r\n\t ]+/);C=ye&&ye[0]}F==="application/xhtml+xml"&&Se===Ae&&(l='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+l+"</body></html>");let H=S?S.createHTML(l):l;if(Se===Ae)try{_=new b().parseFromString(H,F)}catch{}if(!_||!_.documentElement){_=O.createDocument(Se,"template",null);try{_.documentElement.innerHTML=Ke?A:H}catch{}}let oe=_.body||_.documentElement;return l&&C&&oe.insertBefore(r.createTextNode(C),oe.childNodes[0]||null),Se===Ae?ne.call(_,Ve?"html":"body")[0]:Ve?_.documentElement:oe},wr=function(l){return w.call(l.ownerDocument||l,l,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Bt=function(l){return l instanceof f&&(typeof l.nodeName!="string"||typeof l.textContent!="string"||typeof l.removeChild!="function"||!(l.attributes instanceof p)||typeof l.removeAttribute!="function"||typeof l.setAttribute!="function"||typeof l.namespaceURI!="string"||typeof l.insertBefore!="function"||typeof l.hasChildNodes!="function")},Gt=function(l){return typeof c=="function"&&l instanceof c};function kt(he,l,_){Ss(he,C=>{C.call(t,l,_,Ee)})}let sr=function(l){let _=null;if(kt(N.beforeSanitizeElements,l,null),Bt(l))return wt(l),!0;let C=Z(l.nodeName);if(kt(N.uponSanitizeElement,l,{tagName:C,allowedTags:ge}),ze&&l.hasChildNodes()&&!Gt(l.firstElementChild)&&Rt(/<[/\w!]/g,l.innerHTML)&&Rt(/<[/\w!]/g,l.textContent)||l.nodeType===Cn.progressingInstruction||ze&&l.nodeType===Cn.comment&&Rt(/<[/\w]/g,l.data))return wt(l),!0;if(!(Te.tagCheck instanceof Function&&Te.tagCheck(C))&&(!ge[C]||We[C])){if(!We[C]&&Mt(C)&&(xe.tagNameCheck instanceof RegExp&&Rt(xe.tagNameCheck,C)||xe.tagNameCheck instanceof Function&&xe.tagNameCheck(C)))return!1;if(g&&!D[C]){let H=q(l)||l.parentNode,oe=X(l)||l.childNodes;if(oe&&H){let ye=oe.length;for(let _e=ye-1;_e>=0;--_e){let et=M(oe[_e],!0);et.__removalCount=(l.__removalCount||0)+1,H.insertBefore(et,J(l))}}}return wt(l),!0}return l instanceof u&&!ur(l)||(C==="noscript"||C==="noembed"||C==="noframes")&&Rt(/<\/no(script|embed|frames)/i,l.innerHTML)?(wt(l),!0):(Oe&&l.nodeType===Cn.text&&(_=l.textContent,Ss([P,de,ve],H=>{_=Sn(_,H," ")}),l.textContent!==_&&(An(t.removed,{element:l.cloneNode()}),l.textContent=_)),kt(N.afterSanitizeElements,l,null),!1)},st=function(l,_,C){if(Me&&(_==="id"||_==="name")&&(C in r||C in Ce))return!1;if(!(K&&!Ze[_]&&Rt(we,_))){if(!(ot&&Rt(Fe,_))){if(!(Te.attributeCheck instanceof Function&&Te.attributeCheck(_,l))){if(!Re[_]||Ze[_]){if(!(Mt(l)&&(xe.tagNameCheck instanceof RegExp&&Rt(xe.tagNameCheck,l)||xe.tagNameCheck instanceof Function&&xe.tagNameCheck(l))&&(xe.attributeNameCheck instanceof RegExp&&Rt(xe.attributeNameCheck,_)||xe.attributeNameCheck instanceof Function&&xe.attributeNameCheck(_,l))||_==="is"&&xe.allowCustomizedBuiltInElements&&(xe.tagNameCheck instanceof RegExp&&Rt(xe.tagNameCheck,C)||xe.tagNameCheck instanceof Function&&xe.tagNameCheck(C))))return!1}else if(!ue[_]){if(!Rt(Le,Sn(C,Ue,""))){if(!((_==="src"||_==="xlink:href"||_==="href")&&l!=="script"&&Mp(C,"data:")===0&&Y[l])){if(!(U&&!Rt(rt,Sn(C,Ue,"")))){if(C)return!1}}}}}}}return!0},Mt=function(l){return l!=="annotation-xml"&&Do(l,fe)},kr=function(l){kt(N.beforeSanitizeAttributes,l,null);let{attributes:_}=l;if(!_||Bt(l))return;let C={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Re,forceKeepAttr:void 0},H=_.length;for(;H--;){let oe=_[H],{name:ye,namespaceURI:_e,value:et}=oe,y=Z(ye),v=et,m=ye==="value"?v:Pp(v);if(C.attrName=y,C.attrValue=m,C.keepAttr=!0,C.forceKeepAttr=void 0,kt(N.uponSanitizeAttribute,l,C),m=C.attrValue,He&&(y==="id"||y==="name")&&(Tt(ye,l),m=pe+m),ze&&Rt(/((--!?|])>)|<\/(style|title|textarea)/i,m)){Tt(ye,l);continue}if(y==="attributename"&&Do(m,"href")){Tt(ye,l);continue}if(C.forceKeepAttr)continue;if(!C.keepAttr){Tt(ye,l);continue}if(!se&&Rt(/\/>/i,m)){Tt(ye,l);continue}Oe&&Ss([P,de,ve],R=>{m=Sn(m,R," ")});let L=Z(l.nodeName);if(!st(L,y,m)){Tt(ye,l);continue}if(S&&typeof E=="object"&&typeof E.getAttributeType=="function"&&!_e)switch(E.getAttributeType(L,y)){case"TrustedHTML":{m=S.createHTML(m);break}case"TrustedScriptURL":{m=S.createScriptURL(m);break}}if(m!==v)try{_e?l.setAttributeNS(_e,ye,m):l.setAttribute(ye,m),Bt(l)?wt(l):ml(t.removed)}catch{Tt(ye,l)}}kt(N.afterSanitizeAttributes,l,null)},Vt=function he(l){let _=null,C=wr(l);for(kt(N.beforeSanitizeShadowDOM,l,null);_=C.nextNode();)kt(N.uponSanitizeShadowNode,_,null),sr(_),kr(_),_.content instanceof o&&he(_.content);kt(N.afterSanitizeShadowDOM,l,null)};return t.sanitize=function(he){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},_=null,C=null,H=null,oe=null;if(Ke=!he,Ke&&(he="<!-->"),typeof he!="string"&&!Gt(he))if(typeof he.toString=="function"){if(he=he.toString(),typeof he!="string")throw En("dirty is not a string, aborting")}else throw En("toString is not a function");if(!t.isSupported)return he;if(Ie||Et(l),t.removed=[],typeof he=="string"&&(x=!1),x){if(he.nodeName){let et=Z(he.nodeName);if(!ge[et]||We[et])throw En("root node is forbidden and cannot be sanitized in-place")}}else if(he instanceof c)_=dr("<!---->"),C=_.ownerDocument.importNode(he,!0),C.nodeType===Cn.element&&C.nodeName==="BODY"||C.nodeName==="HTML"?_=C:_.appendChild(C);else{if(!Xe&&!Oe&&!Ve&&he.indexOf("<")===-1)return S&&ee?S.createHTML(he):he;if(_=dr(he),!_)return Xe?null:ee?A:""}_&&lt&&wt(_.firstChild);let ye=wr(x?he:_);for(;H=ye.nextNode();)sr(H),kr(H),H.content instanceof o&&Vt(H.content);if(x)return he;if(Xe){if(G)for(oe=W.call(_.ownerDocument);_.firstChild;)oe.appendChild(_.firstChild);else oe=_;return(Re.shadowroot||Re.shadowrootmode)&&(oe=ce.call(n,oe,!0)),oe}let _e=Ve?_.outerHTML:_.innerHTML;return Ve&&ge["!doctype"]&&_.ownerDocument&&_.ownerDocument.doctype&&_.ownerDocument.doctype.name&&Rt(xl,_.ownerDocument.doctype.name)&&(_e="<!DOCTYPE "+_.ownerDocument.doctype.name+`>
`+_e),Oe&&Ss([P,de,ve],et=>{_e=Sn(_e,et," ")}),S&&ee?S.createHTML(_e):_e},t.setConfig=function(){let he=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Et(he),Ie=!0},t.clearConfig=function(){Ee=null,Ie=!1},t.isValidAttribute=function(he,l,_){Ee||Et({});let C=Z(he),H=Z(l);return st(C,H,_)},t.addHook=function(he,l){typeof l=="function"&&An(N[he],l)},t.removeHook=function(he,l){if(l!==void 0){let _=Lp(N[he],l);return _===-1?void 0:Op(N[he],_,1)[0]}return ml(N[he])},t.removeHooks=function(he){N[he]=[]},t.removeAllHooks=function(){N=wl()},t}var Sl=Al();var gr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Cs=e=>(...t)=>({_$litDirective$:e,values:t}),un=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Rn=class extends un{constructor(t){if(super(t),this.it=ht,t.type!==gr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ht||t==null)return this._t=void 0,this.it=t;if(t===Ut)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Rn.directiveName="unsafeHTML",Rn.resultType=1;var El=Cs(Rn);function Vo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Wr=Vo();function Ml(e){Wr=e}var Mn={exec:()=>null};function at(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Ot.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Zp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ot={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Xp=/^(?:[ \t]*(?:\n|$))+/,Qp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Jp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Pn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ef=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ko=/(?:[*+-]|\d{1,9}[.)])/,Pl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Dl=at(Pl).replace(/bull/g,Ko).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),tf=at(Pl).replace(/bull/g,Ko).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Yo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,rf=/^[^\n]+/,Zo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,nf=at(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Zo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),sf=at(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ko).getRegex(),Ps="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Xo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,of=at("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Xo).replace("tag",Ps).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Nl=at(Yo).replace("hr",Pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ps).getRegex(),af=at(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Nl).getRegex(),Qo={blockquote:af,code:Qp,def:nf,fences:Jp,heading:ef,hr:Pn,html:of,lheading:Dl,list:sf,newline:Xp,paragraph:Nl,table:Mn,text:rf},Tl=at("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ps).getRegex(),lf={...Qo,lheading:tf,table:Tl,paragraph:at(Yo).replace("hr",Pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Tl).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ps).getRegex()},cf={...Qo,html:at(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Xo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Mn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:at(Yo).replace("hr",Pn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Dl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},uf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,df=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ql=/^( {2,}|\\)\n(?!\s*$)/,pf=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ds=/[\p{P}\p{S}]/u,Jo=/[\s\p{P}\p{S}]/u,Fl=/[^\s\p{P}\p{S}]/u,ff=at(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Jo).getRegex(),jl=/(?!~)[\p{P}\p{S}]/u,_f=/(?!~)[\s\p{P}\p{S}]/u,mf=/(?:[^\s\p{P}\p{S}]|~)/u,gf=at(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Zp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Bl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,bf=at(Bl,"u").replace(/punct/g,Ds).getRegex(),hf=at(Bl,"u").replace(/punct/g,jl).getRegex(),Ul="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",yf=at(Ul,"gu").replace(/notPunctSpace/g,Fl).replace(/punctSpace/g,Jo).replace(/punct/g,Ds).getRegex(),vf=at(Ul,"gu").replace(/notPunctSpace/g,mf).replace(/punctSpace/g,_f).replace(/punct/g,jl).getRegex(),wf=at("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Fl).replace(/punctSpace/g,Jo).replace(/punct/g,Ds).getRegex(),kf=at(/\\(punct)/,"gu").replace(/punct/g,Ds).getRegex(),$f=at(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),xf=at(Xo).replace("(?:-->|$)","-->").getRegex(),Af=at("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",xf).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ls=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Sf=at(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ls).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Wl=at(/^!?\[(label)\]\[(ref)\]/).replace("label",Ls).replace("ref",Zo).getRegex(),zl=at(/^!?\[(ref)\](?:\[\])?/).replace("ref",Zo).getRegex(),Ef=at("reflink|nolink(?!\\()","g").replace("reflink",Wl).replace("nolink",zl).getRegex(),Cl=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ea={_backpedal:Mn,anyPunctuation:kf,autolink:$f,blockSkip:gf,br:ql,code:df,del:Mn,emStrongLDelim:bf,emStrongRDelimAst:yf,emStrongRDelimUnd:wf,escape:uf,link:Sf,nolink:zl,punctuation:ff,reflink:Wl,reflinkSearch:Ef,tag:Af,text:pf,url:Mn},Tf={...ea,link:at(/^!?\[(label)\]\((.*?)\)/).replace("label",Ls).getRegex(),reflink:at(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ls).getRegex()},zo={...ea,emStrongRDelimAst:vf,emStrongLDelim:hf,url:at(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Cl).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:at(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Cl).getRegex()},Cf={...zo,br:at(ql).replace("{2,}","*").getRegex(),text:at(zo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Rs={normal:Qo,gfm:lf,pedantic:cf},In={normal:ea,gfm:zo,breaks:Cf,pedantic:Tf},Rf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Rl=e=>Rf[e];function br(e,t){if(t){if(Ot.escapeTest.test(e))return e.replace(Ot.escapeReplace,Rl)}else if(Ot.escapeTestNoEncode.test(e))return e.replace(Ot.escapeReplaceNoEncode,Rl);return e}function Il(e){try{e=encodeURI(e).replace(Ot.percentDecode,"%")}catch{return null}return e}function Ll(e,t){let r=e.replace(Ot.findPipe,(o,a,c)=>{let u=!1,d=a;for(;--d>=0&&c[d]==="\\";)u=!u;return u?"|":" |"}),n=r.split(Ot.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ot.slashPipe,"|");return n}function Ln(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function If(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ol(e,t,r,n,s){let o=t.href,a=t.title||null,c=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let u={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,u}function Lf(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[c]=a;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var Os=class{constructor(e){ct(this,"options");ct(this,"rules");ct(this,"lexer");this.options=e||Wr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Ln(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Lf(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Ln(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ln(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Ln(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,c=[],u;for(u=0;u<r.length;u++)if(this.rules.other.blockquoteStart.test(r[u]))c.push(r[u]),a=!0;else if(!a)c.push(r[u]);else break;r=r.slice(u);let d=c.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let E=b,T=E.raw+`
`+r.join(`
`),M=this.blockquote(T);o[o.length-1]=M,n=n.substring(0,n.length-E.raw.length)+M.raw,s=s.substring(0,s.length-E.text.length)+M.text;break}else if(b?.type==="list"){let E=b,T=E.raw+`
`+r.join(`
`),M=this.list(T);o[o.length-1]=M,n=n.substring(0,n.length-b.raw.length)+M.raw,s=s.substring(0,s.length-E.raw.length)+M.raw,r=T.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let u=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,M=>" ".repeat(3*M.length)),b=e.split(`
`,1)[0],E=!f.trim(),T=0;if(this.options.pedantic?(T=2,p=f.trimStart()):E?T=t[1].length+1:(T=t[2].search(this.rules.other.nonSpaceChar),T=T>4?1:T,p=f.slice(T),T+=t[1].length),E&&this.rules.other.blankLine.test(b)&&(d+=b+`
`,e=e.substring(b.length+1),u=!0),!u){let M=this.rules.other.nextBulletRegex(T),B=this.rules.other.hrRegex(T),J=this.rules.other.fencesBeginRegex(T),X=this.rules.other.headingBeginRegex(T),q=this.rules.other.htmlBeginRegex(T);for(;e;){let S=e.split(`
`,1)[0],A;if(b=S,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),A=b):A=b.replace(this.rules.other.tabCharGlobal,"    "),J.test(b)||X.test(b)||q.test(b)||M.test(b)||B.test(b))break;if(A.search(this.rules.other.nonSpaceChar)>=T||!b.trim())p+=`
`+A.slice(T);else{if(E||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||J.test(f)||X.test(f)||B.test(f))break;p+=`
`+b}!E&&!b.trim()&&(E=!0),d+=S+`
`,e=e.substring(S.length+1),f=A.slice(T)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let u of s.items){if(this.lexer.state.top=!1,u.tokens=this.lexer.blockTokens(u.text,[]),u.task){if(u.text=u.text.replace(this.rules.other.listReplaceTask,""),u.tokens[0]?.type==="text"||u.tokens[0]?.type==="paragraph"){u.tokens[0].raw=u.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),u.tokens[0].text=u.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(u.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};u.checked=p.checked,s.loose?u.tokens[0]&&["paragraph","text"].includes(u.tokens[0].type)&&"tokens"in u.tokens[0]&&u.tokens[0].tokens?(u.tokens[0].raw=p.raw+u.tokens[0].raw,u.tokens[0].text=p.raw+u.tokens[0].text,u.tokens[0].tokens.unshift(p)):u.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):u.tokens.unshift(p)}}if(!s.loose){let d=u.tokens.filter(f=>f.type==="space"),p=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let u of s.items){u.loose=!0;for(let d of u.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Ll(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Ll(a,o.header.length).map((c,u)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[u]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Ln(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=If(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ol(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ol(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,c=s,u=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){c+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){u+=a;continue}if(c-=a,c>0)continue;a=Math.min(a,a+c+u);let p=[...n[0]][0].length,f=e.slice(0,s+n.index+p+a);if(Math.min(s,a)%2){let E=f.slice(1,-1);return{type:"em",raw:f,text:E,tokens:this.lexer.inlineTokens(E)}}let b=f.slice(2,-2);return{type:"strong",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},er=class Ho{constructor(t){ct(this,"tokens");ct(this,"options");ct(this,"state");ct(this,"inlineQueue");ct(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Wr,this.options.tokenizer=this.options.tokenizer||new Os,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ot,block:Rs.normal,inline:In.normal};this.options.pedantic?(r.block=Rs.pedantic,r.inline=In.pedantic):this.options.gfm&&(r.block=Rs.gfm,this.options.breaks?r.inline=In.breaks:r.inline=In.gfm),this.tokenizer.rules=r}static get rules(){return{block:Rs,inline:In}}static lex(t,r){return new Ho(r).lex(t)}static lexInline(t,r){return new Ho(r).inlineTokens(t)}lex(t){t=t.replace(Ot.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Ot.tabCharGlobal,"    ").replace(Ot.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,c=t.slice(1),u;this.options.extensions.startBlock.forEach(d=>{u=d.call({lexer:this},c),typeof u=="number"&&u>=0&&(a=Math.min(a,u))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let u=Object.keys(this.tokens.links);if(u.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)u.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,c="";for(;t;){a||(c=""),a=!1;let u;if(this.options.extensions?.inline?.some(p=>(u=p.call({lexer:this},t,r))?(t=t.substring(u.raw.length),r.push(u),!0):!1))continue;if(u=this.tokenizer.escape(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.tag(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.link(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(u.raw.length);let p=r.at(-1);u.type==="text"&&p?.type==="text"?(p.raw+=u.raw,p.text+=u.text):r.push(u);continue}if(u=this.tokenizer.emStrong(t,n,c)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.codespan(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.br(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.del(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.autolink(t)){t=t.substring(u.raw.length),r.push(u);continue}if(!this.state.inLink&&(u=this.tokenizer.url(t))){t=t.substring(u.raw.length),r.push(u);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),b;this.options.extensions.startInline.forEach(E=>{b=E.call({lexer:this},f),typeof b=="number"&&b>=0&&(p=Math.min(p,b))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(u=this.tokenizer.inlineText(d)){t=t.substring(u.raw.length),u.raw.slice(-1)!=="_"&&(c=u.raw.slice(-1)),a=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=u.raw,p.text+=u.text):r.push(u);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Ms=class{constructor(e){ct(this,"options");ct(this,"parser");this.options=e||Wr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Ot.notSpaceStart)?.[0],s=e.replace(Ot.endingNewline,"")+`
`;return n?'<pre><code class="language-'+br(n)+'">'+(r?s:br(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:br(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let c=e.items[a];n+=this.listitem(c)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${br(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Il(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+br(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Il(e);if(s===null)return br(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${br(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:br(e.text)}},ta=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},tr=class Go{constructor(t){ct(this,"options");ct(this,"renderer");ct(this,"textRenderer");this.options=t||Wr,this.options.renderer=this.options.renderer||new Ms,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ta}static parse(t,r){return new Go(r).parse(t)}static parseInline(t,r){return new Go(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let c='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},Is,On=(Is=class{constructor(e){ct(this,"options");ct(this,"block");this.options=e||Wr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?er.lex:er.lexInline}provideParser(){return this.block?tr.parse:tr.parseInline}},ct(Is,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ct(Is,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Is),Of=class{constructor(...e){ct(this,"defaults",Vo());ct(this,"options",this.setOptions);ct(this,"parse",this.parseMarkdown(!0));ct(this,"parseInline",this.parseMarkdown(!1));ct(this,"Parser",tr);ct(this,"Renderer",Ms);ct(this,"TextRenderer",ta);ct(this,"Lexer",er);ct(this,"Tokenizer",Os);ct(this,"Hooks",On);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let c=s.renderer.apply(this,a);return c===!1&&(c=o.apply(this,a)),c}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Ms(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,c=r.renderer[a],u=s[a];s[a]=(...d)=>{let p=c.apply(s,d);return p===!1&&(p=u.apply(s,d)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Os(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,c=r.tokenizer[a],u=s[a];s[a]=(...d)=>{let p=c.apply(s,d);return p===!1&&(p=u.apply(s,d)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new On;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,c=r.hooks[a],u=s[a];On.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&On.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await c.call(s,d);return u.call(s,f)})();let p=c.call(s,d);return u.call(s,p)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await c.apply(s,d);return f===!1&&(f=await u.apply(s,d)),f})();let p=c.apply(s,d);return p===!1&&(p=u.apply(s,d)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let c=[];return c.push(o.call(this,a)),s&&(c=c.concat(s.call(this,a))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return er.lex(e,t??this.defaults)}parser(e,t){return tr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,c=await(s.hooks?await s.hooks.provideLexer():e?er.lex:er.lexInline)(a,s),u=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(u,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?tr.parse:tr.parseInline)(u,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?er.lex:er.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():e?tr.parse:tr.parseInline)(a,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+br(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ur=new Of;function it(e,t){return Ur.parse(e,t)}it.options=it.setOptions=function(e){return Ur.setOptions(e),it.defaults=Ur.defaults,Ml(it.defaults),it};it.getDefaults=Vo;it.defaults=Wr;it.use=function(...e){return Ur.use(...e),it.defaults=Ur.defaults,Ml(it.defaults),it};it.walkTokens=function(e,t){return Ur.walkTokens(e,t)};it.parseInline=Ur.parseInline;it.Parser=tr;it.parser=tr.parse;it.Renderer=Ms;it.TextRenderer=ta;it.Lexer=er;it.lexer=er.lex;it.Tokenizer=Os;it.Hooks=On;it.parse=it;var oh=it.options,ah=it.setOptions,ih=it.use,lh=it.walkTokens,ch=it.parseInline;var uh=tr.parse,dh=er.lex;function Tr(e){let t=it.parse(e),r=Sl.sanitize(t);return El(r)}function hr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function dn(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ns(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Mf={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Pf={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Df=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Nf=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function lr(e){return!!e&&typeof e=="object"}function ra(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Hl(e,t){let r=ra(e),n=ra(t),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let u=s.get(c)||0;u>0?s.set(c,u-1):o+=1}let a=0;for(let c of s.values())a+=c;return{added:o,removed:a}}function qf(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>lr(s)&&typeof s.text=="string"?s.text:"").join(""):lr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Ff(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Mf[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=ra(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Hl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let c of a){let u=Hl(lr(c)?c.old_string:"",lr(c)?c.new_string:"");s+=u.added,o+=u.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function na(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function sa(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Df.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Nf.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function jf(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(lr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(sa(o.text));else if(o.type==="thinking"){let a=na(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Ff(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(lr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=qf(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Bf(e){if(e.type==="item.completed"&&lr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[sa(t.text)];if(t.type==="reasoning"){let r=na(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Uf(e){if(e.schema!=="codex-delegation-monitor-v1"||!lr(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&lr(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[sa(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let c=na(r.text);return c?[c]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=Pf[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Wf(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Gl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!lr(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?Uf(o):Wf(o)?Bf(o):jf(o,r);for(let c of a)t.push(c)}return t}var zf=5,Hf=10,Gf=/Task\s+#(\d+)/,Vf=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Kf=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function qs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Yf(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Zf(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Xf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let u=Gf.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!u||d.length===0)continue;t.set(u[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let c=o.activeForm||o.subject;typeof c=="string"&&c.trim().length>0&&(a.label=c.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Qf(e){if(e.tool==="Bash"){let t=e.command||"";return Vf.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Kf.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Jf(e){let t=e.filter(s=>s.kind==="tool").slice(-Hf),r=new Map;t.forEach((s,o)=>{let a=Qf(s);if(!a)return;let c=r.get(a)||{count:0,last:-1};c.count+=1,c.last=o,r.set(a,c)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function e_(e){let t=Zf(e);if(t)return{text:t,guess:!1};let r=Xf(e);if(r)return{text:r,guess:!1};let n=Jf(e);return n?{text:n,guess:!0}:null}function t_(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:qt(e,t)}function Fs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,c=null,u=!1,d={},p=!0,f=new Set,b=new Set,E=null,T=null,M=!1,B=!1,J=!1,X=null,q=null;function S(){M=!1,B=!1,J=!1,X=null,q=null}async function A(K){if(r){B=!0,J=!1,ge();try{let U=await Promise.resolve(r("get-attempt-prompt",{attempt_id:K}));if(o!==K)return;!U||typeof U!="object"||Array.isArray(U)?J=!0:(X=U,q=K)}catch{o===K&&(J=!0)}finally{o===K&&(B=!1,ge())}}}function O(){if(M=!M,M&&o&&q!==o){A(o);return}ge()}function w(){if(!M)return"";let K=dn({loading:B,error:J});if(K)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${K}
      </div>`;if(!X)return"";if(X.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let U=Ns(X.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${U?i`<div class="prompt-block__meta">${U} 발송</div>`:""}
      ${typeof X.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",X.task_prompt):""}
      ${typeof X.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",X.system_prompt):""}
    </div>`}function W(){if(!c||!n)return[];let K=n.get(c);return Gl(K?K.lines:[])}function ne(){if(!c||!n)return null;let K=n.get(c),U=K?K.last_event_at:null;return typeof U=="number"?U:null}function ce(){return d.status==="running"}function N(){if(ce()&&o){T||(T=setInterval(()=>ge(),1e3));return}P()}function P(){T&&(clearInterval(T),T=null)}function de(K){let U=[],se=0;for(;se<K.length;){let Oe=K[se];if(Oe.kind==="tool"){let ze=se;for(;ze<K.length&&K[ze].kind==="tool"&&K[ze].tool===Oe.tool;)ze+=1;if(ze-se>=zf&&!b.has(se)){U.push({kind:"group",idx:se,tool:Oe.tool||"",lines:K.slice(se,ze).map((Ve,Ie)=>({idx:se+Ie,line:Ve}))}),se=ze;continue}}U.push({kind:"line",idx:se,line:Oe}),se+=1}return U}function ve(K){for(let U=K.length-1;U>=0;U-=1){let se=K[U];if(se.kind==="result"||se.kind==="error")return null;if(se.kind==="tool"&&!Object.hasOwn(se,"result"))return se}return null}function we(K){for(let U=K.length-1;U>=0;U-=1)if(K[U].kind==="thinking")return K[U];return null}function Fe(K,U){if(U.kind==="gate")return i`<div class="sv__gate">${U.text}</div>`;if(U.kind==="phase")return i`<div class="sv__phase">${U.text}</div>`;if(U.kind==="result")return i`<div
        class="sv__result${U.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${U.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Tr(U.text||(U.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(U.kind==="thinking"){let se=f.has(K);return i`<div
        class="sv__think${se?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Re(K)}
      >
        <span class="sv__think-line">💭 ${qs(U.text)}</span>
        ${se?i`<pre class="sv__think-expand">${U.text}</pre>`:""}
      </div>`}if(U.kind==="error")return i`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="blocker")return i`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="tool"){let se=f.has(K),Oe=U.tool==="Bash"?Yf(U.command):0,ze=U.tool==="Bash"?Oe>1?qs(U.command):U.command:U.path||U.command||"";return i`<div
        class="sv__tool${se?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Re(K)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${U.icon}</span>
          <span class="sv__tool-name">${U.tool}</span>
          ${ze?i`<span class="sv__tool-detail">${ze}</span>`:""}
          ${Oe>1?i`<span class="sv__tool-more">⋯ ${Oe}줄</span>`:""}
          ${typeof U.added=="number"?i`<span class="sv__diff-add">+${U.added}</span>`:""}
          ${typeof U.removed=="number"?i`<span class="sv__diff-del">−${U.removed}</span>`:""}
          ${U.result?i`<span class="sv__tool-ok">→ ${U.result}</span>`:""}
        </span>
        ${se?i`<pre class="sv__tool-expand">${rt(U)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${Tr(U.text||"")}</div>`}function rt(K){let U=[];if(K.tool==="Bash"&&typeof K.command=="string"&&K.command.length>0)U.push(K.command);else if(K.input!==void 0)try{U.push(`input: ${JSON.stringify(K.input,null,2)}`)}catch{}return typeof K.output=="string"&&K.output.length>0&&U.push(`output:
${K.output}`),U.join(`

`)}function Ue(){if(!o)return i``;let K=W(),U=(a?[d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),se=d.session_id||"",Oe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${p?"ON":"OFF"}`,ze=ce(),Ve=ze?t_(ne(),Date.now()):"",Ie=ze?ve(K):null,lt=ze?we(K):null,Xe=e_(K);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${Xe?i`<span
              class="sv__stage${Xe.guess?" sv__stage--guess":""}"
              title=${Xe.text}
              >${Xe.text}</span
            >`:""}
        ${ze?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ve?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ve}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ve?i`<span class="sv__live-ago">${Ve}</span>`:""}</span
            >`:""}
        ${se?i`<button
              type="button"
              class="sv__session"
              title=${se}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${se}`}
              @click=${()=>xe(se)}
            >
              ⧉ ${se.slice(0,8)}
            </button>`:""}
        ${U?i`<span class="sv__meta">${U}</span>`:""}
        ${d.worktree?i`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||u?"":i`<button
              type="button"
              class="sv__prompt-toggle${M?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${M?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${O}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${p?" sv__follow--on":""}"
          aria-pressed=${p?"true":"false"}
          aria-label=${Oe}
          @click=${je}
        >
          <span class="sv__follow-full">⇣ ${Oe}</span>
          <span class="sv__follow-short">⇣ ${p?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ot()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":w()}
      <div class="sv__body">
        ${K.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:de(K).map(G=>G.kind==="group"?fe(G):Fe(G.idx,G.line))}
      </div>
      ${Ie||lt?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ie?i`<span class="sv__now-icon">${Ie.icon}</span>
                  <span class="sv__now-name">${Ie.tool}</span>
                  <span class="sv__now-detail"
                    >${Ie.tool==="Bash"?qs(Ie.command):Ie.path||Ie.command||""}</span
                  >`:""}
            ${lt?i`<span class="sv__now-think"
                  >💭 ${qs(lt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function fe(K){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Le(K.idx)}
    >
      <span class="sv__group-icon">${K.lines[0].line.icon}</span>
      <span class="sv__group-name">${K.tool}</span>
      <span class="sv__group-count">${K.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Le(K){b.add(K),ge()}function ge(){Je(Ue(),e),N(),p&&$e()}function $e(){let K=e.querySelector(".sv__body");K&&(K.scrollTop=K.scrollHeight)}function Re(K){f.has(K)?f.delete(K):f.add(K),ge()}function je(){p=!p,ge()}function xe(K){Xt(K).then(U=>{U?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function We(K){!o||!K||(d={...d,...K},ge())}function Ze(K){let U=K.target;if(!U||!U.classList||!U.classList.contains("sv__body"))return;!(U.scrollHeight-U.scrollTop-U.clientHeight<=4)&&p&&(p=!1,ge())}e.addEventListener("scroll",Ze,!0);function Te(K){let U=K&&K.attempt_id;if(!U)return;let se=c;o=U,a=typeof K.launch_id=="string"&&K.launch_id.length>0?K.launch_id:null,c=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&se&&se!==c&&Promise.resolve(r("unsubscribe-session-log",{id:se})).catch(()=>{}),d=K.meta||{},u=K.hide_prompt===!0,p=!0,f.clear(),b.clear(),S(),!E&&n&&(E=n.subscribe(ge)),r&&Promise.resolve(r("subscribe-session-log",{id:c,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),ge()}function ot(){let K=c;o=null,a=null,c=null,u=!1,f.clear(),b.clear(),S(),P(),r&&K&&Promise.resolve(r("unsubscribe-session-log",{id:K})).catch(()=>{}),Je(i``,e),s&&s()}return{open:Te,updateMeta:We,close:ot,isOpen(){return o!==null},destroy(){P(),E&&(E(),E=null),e.removeEventListener("scroll",Ze,!0),o=null,a=null,c=null,u=!1,Je(i``,e)}}}function js(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=oa(t.spec_id),s=oa(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function oa(e){return typeof e=="string"?e.trim():""}function Vl(e){let t=js(e);if(t.path)return t;let r=oa(r_(e).spec_path);return r?{path:r,source:"draft",conflict:!1}:t}function r_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function n_(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function s_(e){let t=e&&e.metadata||{},r=Vl(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:r.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:n_(t)?null:"plan_pending"}),n}function Kl(e,t){let r=s_(e);return i`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?i`<div class="detail-empty">산출물 없음</div>`:i`
          ${r.map(n=>i`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${n.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,n.path)}
                >
                  ${n.path}
                </button>
                ${n.missing_state==="spec_draft"?i`<span class="detail-art__badge">draft</span>`:null}
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
  `}var o_="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",a_=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,i_=/^\*\*결론\*\* — (.+)$/;function Bs(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==o_)return null;let r=a_.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let c=a<t.length?i_.exec(t[a]):null,u=c?c[1].replace(/\s+/g," ").trim():"",d=c?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:u,body:t.slice(d).join(`
`).trim()}}var Yl=20;function Zl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function l_(e){return e.length>Yl?`${e.slice(0,Yl)}\u2026`:e}function c_(e,t,r,n){let s=`${t.lane} ${l_(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${Zl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${Tr(t.body)}
        </div>`:""}
  </div>`}function u_(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Zl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Tr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Xl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,c=n.slice().sort((u,d)=>String(d.created_at||"").localeCompare(String(u.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:c.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${c.map(u=>{let d=Bs(typeof u.text=="string"?u.text:"");return d?c_(u,d,t,s.has(u.id)):u_(u)})}
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
  `}var{I:zh}=vi;var Ql=e=>e.strings===void 0;var d_={},Jl=(e,t=d_)=>e._$AH=t;var zr=Cs(class extends un{constructor(e){if(super(e),e.type!==gr.PROPERTY&&e.type!==gr.ATTRIBUTE&&e.type!==gr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ql(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Ut||t===ht)return t;let r=e.element,n=e.name;if(e.type===gr.PROPERTY){if(t===r[n])return Ut}else if(e.type===gr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Ut}else if(e.type===gr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Ut;return Jl(e),t}});var Us=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],p_=[...Us.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Cr=["orchestration_model","orchestration_effort","orchestration_speed"],ec=[...Us,...Cr],tc=["delegated","main"],Ws=["inherit","claude","codex"],Dn=["default","fast"],Nn=["standard","fast_track"],qn=["codex","opus","fable","self","skip"],zs=["codex","fable","skip"],Hs=["low","medium","high","xhigh"],rr="auto";function yr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function rc(e){if(!yr(e)||!yr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))yr(n)&&yr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Fn(e,t){let r=rc(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[rr,...n.flatMap(([,s])=>s)]}function pn(e,t,r){if(!yr(e)||!yr(e.runners))return[rr];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!yr(o)||!yr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,c]of Object.entries(o.models)){if(r&&r!==rr&&a!==r)continue;let u=yr(c)?c.efforts:null;if(Array.isArray(u))for(let d of u)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[rr,...n]}function Gs(e,t){let r=rc(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function aa(e,t,r,n,s,o){return $s({key:e,choices:t,layer:"global",global:r,resolution_global:o,execution_defaults:n,runner_catalog:s})}function nc(e,t){let r={};for(let n of p_){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function sc(e,t){let r={};for(let n of Cr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var ia=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Cr]}],la={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},oc={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ca(e,t,r,n,s,o=null){let a=on({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(c=>({key:c,...a[c]}))}function ac(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let c of ca(e,t,r,n,s,o))a[c.source]+=1;return a}function ic(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function lc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var ty=[...Us,...Cr];var f_=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],__={pin:"pin",global:"global",base:"base"};function m_(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${__[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function g_(e,t,r){switch(e){case"workflow_mode":return Nn;case"spec_review_model":case"impl_review_model":return qn;case"plan_review_model":return zs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Hs;case"impl_dispatch":return tc;case"impl_runtime":return Ws;case"impl_model":return Fn(r,t.impl_runtime);case"impl_effort":return pn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Dn;case"orchestration_model":return Gs(r,null);case"orchestration_effort":return pn(r,void 0,t.orchestration_model||rr).filter(n=>n!==rr);default:return[]}}function b_(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${m_(e.source)}
    <span class="detail-effective__k"
      >${la[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${oc[e.source]}</span
    >
    ${t.expanded?i`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${la[e.key]||e.key} \uD3B8\uC9D1`}
          ?disabled=${e.resolution==="not_applicable"}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option
            value=""
            title=${t.default_full_value||""}
            ?selected=${e.source!=="pin"}
          >
            ${t.default_label}
          </option>
          ${t.options.map(r=>i`<option
                value=${r.value}
                title=${r.full_value||""}
                ?selected=${e.source==="pin"&&e.value===r.value}
              >
                ${r.label}
              </option>`)}
        </select>`:""}
  </div>`}function cc(e,t){let r=ia.flatMap(u=>u.keys),n=ca(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=ac(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(u=>[u.key,u])),a=Object.fromEntries(n.filter(u=>u.value!==null).map(u=>[u.key,u.value])),c=n.filter(u=>u.full_value&&u.display!==u.full_value).map(u=>u.full_value).join(" \xB7 ");return i`<details
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
      <span class="detail-effective__summary" title=${c}
        >${h_(o)}</span
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
    ${e.expanded?i`<div class="detail-effective__body">
          ${ia.map(u=>i`
              <div class="detail-effective__subhead">${u.label}</div>
              ${n.filter(d=>u.keys.includes(d.key)).map(d=>{let p=$s({key:d.key,choices:g_(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return b_(d,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${zr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${u=>t.onPresetSelect(String(u.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(u=>i`<option
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
            ${(e.skipped_orchestration_keys||[]).length>0?i`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function h_(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function y_(e){if(!e||typeof e!="object")return null;let{kind:t,actor:r,effort:n,sha:s}=e;return typeof t!="string"||typeof r!="string"||typeof s!="string"?null:{kind:t,actor:r,effort:typeof n=="string"?n:null,sha:s}}function uc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",c=y_(r.exec_receipt),u=c?Br(c):a,d=c?`${c.kind}:${c.actor}`:a.split("@")[0],p=ws(r.planned_execution,r.exec_receipt);return i`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?i`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?i`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?i`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${p?i`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
          >`:""}
      ${u?i`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${u}
            >${d}${c?.effort?i`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${c.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${f_.map(f=>{let b=f.receipt&&typeof t[f.receipt]=="string"?String(t[f.receipt]):"",E=n[f.id],T=b.length>0||E?.fill==="full",M=!T&&E?.fill==="dim",B=E?.stale===!0;return i`<span
          class=${`detail-summary__gate${T?" detail-summary__gate--on":""}${M?" detail-summary__gate--current":""}${B?" detail-summary__gate--stale":""}`}
          data-gate=${f.id}
        >
          <span class="detail-summary__gate-pill">${f.label}</span>
          ${b?i`<span class="detail-summary__gate-sha"
                >${b.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var dc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function jn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Vs(e){if(!jn(e)||!jn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>jn(r)&&jn(r.models));return t.length>0?t:null}function ua(e,t){let r=Vs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function pc(e,t){return jn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function fc(e,t){let r=Vs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return pc(n,n.models[t]);return[]}function v_(e){let t=Vs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of pc(n,s))r.includes(o)||r.push(o);return r}function w_(e,t){if(!t)return v_(e);let n=Vs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of fc(e,o))s.includes(a)||s.push(a);return s}function _c(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=ua(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?fc(t,n.impl_model):w_(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function k_(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function mc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",c="";function u(T){T.key==="Escape"&&s&&(T.preventDefault(),b())}document.addEventListener("keydown",u);function d(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${k_(s)}</span
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
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${c}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Tr(a)}
          </div>
        </div>
      </div>
    `:i``}function p(){Je(d(),e)}async function f(T,M={}){s=T,o="loading",a="",c="",p();let B=r?r():"";if(!B){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let J="/api/doc?workspace="+encodeURIComponent(B)+"&path="+encodeURIComponent(T);try{let X=await n(J),q=await X.json().catch(()=>({}));if(!X.ok||!q||q.ok!==!0){if(q?.error==="not_found"&&M.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||X.status)+")",p();return}a=String(q.content||""),o="ready",p()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function b(){s=null,Je(i``,e)}function E(){document.removeEventListener("keydown",u),b()}return{open:f,close:b,destroy:E}}var $_=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],bc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ks=["implementation","review-consult"],x_=["running","done","failed","interrupted"],A_={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function S_(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function E_(e){let t=At(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=ln(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${bc}
          >부분 집계</span
        >`:""}`}function gc(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function da(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?pa(t):""}function T_(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!Ks.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!x_.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function C_(e,t){let n=At({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[t.provider,t.model,t.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${t.session_id?i`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${t.session_id}
          >${t.session_id.slice(0,8)}</span
        >`:""}
    ${da(t.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
          >${da(t.completed_at)}</span
        >`:""}
    ${n?i`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function R_(e,t,r,n){let s=e.status==="running"?null:t,a=(s?At({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],c=e.status==="running"?pa(e.last_event_at):s?da(s.completed_at):"";return i`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${A_[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${["codex",e.model,e.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${e.session_id}
      >${e.session_id.slice(0,8)}</span
    >
    ${c?i`<span class="detail-session__leg-time detail-session__time"
          >${c}</span
        >`:""}
    ${a?i`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function I_(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function L_(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let f=T_(p);!f||s.has(f.launch_id)||(s.add(f.launch_id),n.push(f))}n.sort((p,f)=>p.started_at-f.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let p of Ks){let f=t.roles[p]?.codex;a[p]=f?[...f.legs]:[]}let c=Ks.flatMap(p=>a[p]),u=new Set,d=[];for(let p of Ks){for(let f of n.filter(b=>b.role===p)){let b=c.find(E=>E.receipt_id===f.launch_id)||null;b&&!I_(f,b)||(b&&u.add(b.receipt_id),d.push(R_(f,b,e.attempt_id,r)))}for(let f of a[p])u.has(f.receipt_id)||d.push(C_(p,f))}return d}function O_(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...$_,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${S_(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${bc}</span>`:""}
  </div>`}var M_={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function pa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function P_(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function hc(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let f=typeof d.session_id=="string"&&d.session_id.length>0,b=o.has(d.attempt_id),E=f&&!b,T=f?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!E}
      title=${T}
      @click=${M=>{M.stopPropagation(),E&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},c=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let f=d.cause_detail,b=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:d.cause;return i`<div class="detail-session__cause" title=${b}>
      ${d.cause}
    </div>`},u=d=>{let p=gc(Mo(d));if(At(p).length===0&&!ln(d.usage))return"";let f=s.has(d.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${b=>{b.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${E_(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let p=Mo(d),f=gc(p),b=At(f);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${M_[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${Sr(d)?i`<span
                  class="detail-session__resumed"
                  title=${Sr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${ir(d)}</span>
            ${b.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?i`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${b.length>0?b.map(E=>i`<span
                      class="detail-session__usage"
                      title=${E.tooltip}
                      >${E.label}</span
                    >`):ln(d.usage)?i`<span class="detail-session__usage"
                    >${ln(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${pa(d.started_at)}</span>
          </button>
          ${u(d)} ${a(d)} ${c(d)} ${P_(d)}
          ${s.has(d.attempt_id)&&d.usage?O_(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${L_(d,p,t)}
        </div>`})}
    </div>
  `}function yc(e,t={}){return i`
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
    ${e.expanded?i`<div class="detail-prompt" data-seam="task-prompt">
          ${D_(e)}
        </div>`:""}
  `}function D_(e){let t=dn(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?hr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Ns(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var N_=["open","in_progress","deferred","resolved","closed"],q_=[0,1,2,3,4];function vc(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,c=t.execPresetStore,u=t.sessionLogStore,d=null,p=null,f={},b="",E=!1,T=[],M=!1,B={},J=!1,X=!1,q="",S="",A="";function O(){J=!1,X=!1,q="",S="",A=""}let w=[],W=null,ne=null,ce=!1,N="",P=!1,de=0,ve=new Set;function we(){w=[],W=null,ne=null,ce=!1,N="",P=!1,de+=1,ve.clear()}async function Fe(m){if(!s)return;let L=++de;try{let R=await Promise.resolve(s("get-comments",{id:m}));if(L!==de||m!==d)return;w=Array.isArray(R)?R:[],ce=!1}catch{if(L!==de||m!==d)return;ce=!0}v()}function rt(){if(!s||!d)return;let m=p&&typeof p.comment_count=="number"?p.comment_count:null;if(W!==d){W=d,ne=m,Fe(d);return}m!==null&&m!==ne&&(ne=m,Fe(d))}function Ue(m){ve.has(m)?ve.delete(m):ve.add(m),v()}function fe(m){let L=N.trim().length===0;N=m,L!==(m.trim().length===0)&&v()}async function Le(){let m=N.trim();if(!s||!d||m.length===0||P)return;let L=d;P=!0,v();let R=!1;try{let re=await Promise.resolve(s("add-comment",{id:L,text:m}));Array.isArray(re)&&re.length>0&&(R=!0,L===d&&(w=re,ce=!1,N="",ne=re.length))}catch{R=!1}R||ae("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),L===d&&(P=!1),v()}let ge={onToggle:Ue,onDraftInput:fe,onSubmit:Le},$e=document.createElement("div");$e.className="md-viewer-root",document.body.appendChild($e);let Re=mc($e,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),je=document.createElement("div");je.className="session-log-root",document.body.appendChild(je);let xe=Fs(je,{transport:s?(m,L)=>Promise.resolve(s(m,L)):void 0,sessionLogStore:u}),We=!1,Ze=!1,Te=!1,ot=null,K=null,U=0;function se(m){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${m}`}function Oe(){We=!1,Ze=!1,Te=!1,ot=null,K=null,U+=1}async function ze(m){if(!s)return;let L=++U;Ze=!0,Te=!1,v();try{let R=await Promise.resolve(s("get-bead-prompt",{bead_id:m}));if(L!==U)return;!R||typeof R!="object"||Array.isArray(R)?Te=!0:(ot=R,K=se(m))}catch{L===U&&(Te=!0)}finally{L===U&&(Ze=!1,v())}}function Ve(){if(We=!We,We&&d&&K!==se(d)){ot=null,ze(d);return}v()}function Ie(){if(!a||!d)return[];let m=a.get();return(m&&m.attempts?Object.values(m.attempts):[]).filter(R=>R&&R.bead_id===d).sort((R,re)=>(re.started_at||0)-(R.started_at||0)).map(R=>({attempt_id:R.attempt_id,bead_id:R.bead_id,status:R.status,started_at:typeof R.started_at=="number"?R.started_at:null,runner:R.runner||null,model:R.model||null,effort:R.effort||R.observed_effort||null,speed:R.speed||null,session_id:R.session_id||null,resumed_from:R.resumed_from||null,continuation_mode:R.continuation_mode||null,dismissed_at:typeof R.dismissed_at=="number"?R.dismissed_at:null,cause:typeof R.cause=="string"?R.cause:null,cause_detail:R.cause_detail||null,exec_default_preset_id:typeof R.exec_default_preset_id=="string"?R.exec_default_preset_id:null,exec_default_preset_revision:typeof R.exec_default_preset_revision=="number"?R.exec_default_preset_revision:null,exec_values:R.exec_values&&typeof R.exec_values=="object"?R.exec_values:null,usage:R.usage||null,usage_legs:Array.isArray(R.usage_legs)?R.usage_legs:[],delegation_sessions:Array.isArray(R.delegation_sessions)?R.delegation_sessions:[]}))}function lt(){if(!a||!d)return null;let m=a.get();return zt(m&&m.attempts||{},d)}let Xe=new Set;function G(m){Xe.has(m)?Xe.delete(m):Xe.add(m),v()}function ee(m){let L=a?a.get():null,R=L&&L.attempts?L.attempts[m]:null;xe.open({attempt_id:m,meta:R?{runner:R.runner||void 0,model:R.model||void 0,effort:R.effort||void 0,status:R.status||void 0,session_id:R.session_id||void 0}:{}})}function Me(m,L){let R=a?a.get():null,re=R&&R.attempts?R.attempts[m]:null,Ye=(re&&Array.isArray(re.delegation_sessions)?re.delegation_sessions:[]).find(Qe=>Qe&&typeof Qe=="object"&&Qe.launch_id===L);Ye&&xe.open({attempt_id:m,launch_id:L,meta:{runner:"codex",role:Ye.role,model:Ye.model,effort:Ye.effort,session_id:Ye.session_id,status:Ye.status}})}async function He(m){if(!s||!m)return;let L=await an();if(L===null)return;let R=()=>{let Qe=a?a.get():null;return Qe&&typeof Qe.revision=="number"?Qe.revision:0},re=async(Qe={},qe=R())=>await s("worker-attempt-resume",{attempt_id:m,expected_revision:qe,...L!==""?{instructions:L}:{},...Qe}),Be=Qe=>{Qe?.queue&&a?.set&&a.set(Qe.queue)},Ye=await re();if(Be(Ye),Ye&&Ye.conflict){let Qe=Ye.queue&&typeof Ye.queue.revision=="number"?Ye.queue.revision:R();Ye=await re({},Qe),Be(Ye)}Ye=await fr(Ye,(Qe,qe)=>re({continuation:Qe,decision_token:qe}),{onResult:Be,refresh:()=>re()}),Ye&&Ye.resumed===!1&&!Ye.conflict&&Ye.reason&&ae(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ye.reason}`,"error",2400)}let pe={onOpen:ee,onOpenDelegation:Me,onResume:He,onToggleUsage:G};function g(){let m=a?a.get():null,L={...B};for(let R of["orchestration_model","orchestration_effort","orchestration_speed"]){let re=m&&m[R];typeof re=="string"&&(L[R]=re)}return L}async function x(){if(s){try{let m=await Promise.resolve(s("get-session-defaults",{}));B=m&&m.values&&typeof m.values=="object"?m.values:{}}catch{B={}}v()}}function $(){let m=a?a.get():null;return m&&m.runner_catalog||null}function D(){let m=a?a.get():null;return m&&typeof m.execution_defaults=="object"?m.execution_defaults:null}function V(){let m=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},R=on({pin:{...m,...f},global:g(),execution_defaults:D(),runner_catalog:$(),route:typeof m.route=="string"?m.route:null}).orchestration_model.value||"";return ua($(),R)}function Y(){let m=c?c.get():null;return!m||typeof m.revision!="number"?null:{revision:m.revision,presets:Array.isArray(m.presets)?m.presets:[]}}function le(m){return m?.compatible===!1}function ue(m){c&&m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&c.set({revision:m.revision,presets:m.presets})}async function De(){let m=Y(),L=m?.presets.find(R=>R.id===b);if(!(!s||!d||!m||!L||le(L)||E)){E=!0,T=[],v();try{let R=await Promise.resolve(s("apply-impl-preset",lc(d,L.id,m.revision)));if(R&&R.conflict){ue(R),ae("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let re=R&&Array.isArray(R.issue)?R.issue[0]:R?.issue;if(R&&R.applied&&re&&typeof re=="object"){p=re,T=Array.isArray(R.skipped_orchestration_keys)?R.skipped_orchestration_keys.filter(Be=>typeof Be=="string"):[];for(let Be of dc)delete f[Be];ae(T.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}R&&R.error==="bd_readback_failed"?ae("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ae("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(R){R&&typeof R=="object"&&R.code==="bd_readback_failed"?ae("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ae("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{E=!1,v()}}}let be=null;r&&r.subscribe&&(be=r.subscribe(()=>Ke()));let Ne=null;a&&typeof a.subscribe=="function"&&(Ne=a.subscribe(()=>{d&&v()}));let Ae=null;c&&typeof c.subscribe=="function"&&(Ae=c.subscribe(()=>{d&&v()}));function Se(m){m.key==="Escape"&&d&&(m.preventDefault(),n())}document.addEventListener("keydown",Se);function Ke(){if(d){if(r&&typeof r.snapshotFor=="function"){let m=r.snapshotFor("detail:"+d)||[];p=m.find(R=>R&&R.id===d)||m[0]||p}rt(),v()}}function z(m){Xt(m).then(L=>{L?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function te(m){m.preventDefault(),m.stopPropagation(),d&&z(d)}function me(m,L){m.preventDefault(),m.stopPropagation(),z(L)}function k(m,L,R){m.preventDefault(),m.stopPropagation(),Re.open(L,{missing_state:R})}function I(m,L){f[m]=L,v(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",ic(d,m,L.length===0?null:L))).catch(()=>{ae("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function F(m,L){let R=p||{},re=R.metadata&&typeof R.metadata=="object"?R.metadata:{},Be={};for(let qe of["impl_runtime","impl_model","impl_effort"])Be[qe]=Object.hasOwn(f,qe)?f[qe]:typeof re[qe]=="string"?re[qe]:"";Be[m]=L;let Ye=_c(Be,$(),V()),Qe={};for(let qe of["impl_runtime","impl_model","impl_effort"])Qe[qe]=f[qe],f[qe]=Ye[qe]||"";v(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...Ye,orchestration_runtime:V()})).then(qe=>{let bt=Array.isArray(qe)?qe[0]:qe;if(!bt||typeof bt!="object"||!bt.id)throw new Error("implementation target readback failed");p=bt;for(let or of["impl_runtime","impl_model","impl_effort"])delete f[or];v()}).catch(()=>{for(let qe of["impl_runtime","impl_model","impl_effort"])Qe[qe]===void 0?delete f[qe]:f[qe]=Qe[qe];v(),ae("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Q(m,L,R){if(!s||!d)return!1;try{let re=await Promise.resolve(s(m,L)),Be=Array.isArray(re)?re[0]:re;return Be&&typeof Be=="object"&&Be.id?(p=Be,!0):(ae(R,"error"),!1)}catch{return ae(R,"error"),!1}}function ke(m){setTimeout(()=>{try{let L=e.querySelector(m);L&&typeof L.focus=="function"&&L.focus()}catch{}},0)}function Z(){J=!0,q=p&&p.title||"",v(),ke('.detail-edit__input[data-edit="title"]')}function Ee(m){q=m.target.value}function Ce(){J=!1,q="",v()}function mt(){Q("edit-text",{id:d,field:"title",value:q},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(L=>{L&&(J=!1,q=""),v()})}function Et(){X=!0,S=p&&p.description||"",v(),ke('.detail-edit__textarea[data-edit="description"]')}function nt(m){S=m.target.value}function vt(){X=!1,S="",v()}function ur(){Q("edit-text",{id:d,field:"description",value:S},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(L=>{L&&(X=!1,S=""),v()})}function wt(m,L,R,re){if(m.key==="Escape"){m.stopPropagation(),R();return}m.key==="Enter"&&(!re||m.ctrlKey||m.metaKey)&&(m.preventDefault(),L())}function Tt(m){let L=m.target.value;Q("update-status",{id:d,status:L},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>v())}function dr(m){let L=Number(m.target.value);Q("update-priority",{id:d,priority:L},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>v())}function wr(m){A=m.target.value}function Bt(){let m=A.trim();m.length!==0&&Q("label-add",{id:d,label:m},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(L=>{L&&(A=""),v()})}function Gt(m){if(m.key==="Escape"){m.stopPropagation(),A="",v();return}m.key==="Enter"&&(m.preventDefault(),Bt())}function kt(m){Q("label-remove",{id:d,label:m},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>v())}let sr={onCopyPath:me,onOpenDoc:k};function st(m){return typeof m=="string"?m:m&&typeof m=="object"?String(m.id||m.to||m.issue_id||m.depends_on||""):""}function Mt(m){switch(m&&typeof m=="object"?String(m.dependency_type||m.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function kr(m){let R=(Array.isArray(m.dependencies)?m.dependencies:[]).map(re=>({id:st(re),icon:Mt(re)})).filter(re=>re.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${R.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${R.map(re=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(re.id)}
                  >
                    ${re.icon?`${re.icon} `:""}${re.id}
                  </button>`:i`<span class="detail-dep"
                    >${re.icon?`${re.icon} `:""}${re.id}</span
                  >`)}
          </div>`}
    `}function Vt(m){let L=m.metadata||{},R=m.workflow||{},re=R.stages||{},Be=re.spec&&re.spec.stale,Ye=re.impl&&re.impl.stale,Qe=re.plan||null,qe=R.route_source==="derived",bt=R.route||L.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${qe?" detail-kv__v--derived":""}"
          title=${qe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${qe?"unset":bt}</span
        >
      </div>
      ${R.route!=="quick_fix"||Object.hasOwn(L,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${L.spec_review||"\uC5C6\uC74C"}${Be?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${R.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Qe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Qe?.approval_receipt||"\uC5C6\uC74C"}${Qe?.approval_state==="stale"?" \xB7 stale":Qe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${R.route!=="quick_fix"||Object.hasOwn(L,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${L.impl_review||"\uC5C6\uC74C"}${Ye?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${R.planned_execution?i`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${R.planned_execution.kind}</span>
            </div>
            ${R.planned_execution.kind==="main"?i`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${R.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${R.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Br(R.exec_receipt)}</span
            >
          </div>`:""}
      ${R.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${R.impl_entry.actor}@${R.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${L.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${L.pr_url}</span>
          </div>`:""}
    `}let he={route:["quick_fix","spec_backed","full_plan"]};async function l(m,L){let R=L.target.value;if(m==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&R!=="full_plan"&&!window.confirm(`full_plan \u2192 ${R||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){v();return}await Q("update-workflow-meta",{id:d,key:m,value:R},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),v()}function _(m){let L=m.metadata||{};return i` ${((re,Be)=>{let Ye=he[re],Qe=typeof L[re]=="string"?L[re]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${re}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${re}
          data-edit=${`wfmeta-${re}`}
          @change=${qe=>l(re,qe)}
        >
          <option value="" ?selected=${!Ye.includes(Qe)}>
            ${Be}
          </option>
          ${Ye.map(qe=>i`<option value=${qe} ?selected=${Qe===qe}>${qe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function C(m,L){return J?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${q}
            @input=${Ee}
            @keydown=${R=>wt(R,mt,Ce,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${mt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ce}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${m}</h2>
        ${At(L).map(R=>i`<span class="detail-usage-total" title=${R.tooltip}
              >${R.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Z}
        >
          ✎
        </button>
      </div>
    `}function H(m){let L=$t(m.created_at),R=$t(m.updated_at);return!L&&!R?i``:i`
      ${L?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${L}</span>
          </div>`:""}
      ${R?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${R}</span>
          </div>`:""}
    `}function oe(m,L){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Tt}
        >
          ${N_.map(R=>i`<option value=${R} ?selected=${R===m}>${R}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${dr}
        >
          ${q_.map(R=>i`<option value=${String(R)} ?selected=${R===L}>
                P${R}
              </option>`)}
        </select>
      </div>
    `}function ye(m){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${X?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Et}
            >
              ✎
            </button>`}
      </div>
      ${X?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${S}
              @input=${nt}
              @keydown=${L=>wt(L,ur,vt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ur}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${vt}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${m||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function _e(m){let L=typeof m.notes=="string"?m.notes:"";return L.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${L}</div>
    `}function et(m){let L=Array.isArray(m.labels)?m.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${L.map(R=>i`<span class="detail-label-chip"
              >${R}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${R}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+R}
                @click=${()=>kt(R)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${A}
            @input=${wr}
            @keydown=${Gt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Bt}
          >
            추가
          </button>
        </span>
      </div>
    `}function y(){if(!d)return i``;let m=p||{},L=String(m.id||d),R=m.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",re=lt(),Be=m.status||"open",Ye=typeof m.priority=="number"?Math.max(0,Math.min(4,m.priority)):"",Qe=m.description||"",qe={...m,metadata:{...m.metadata||{},...f}};return i`
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
            @click=${te}
          >
            ${L}
          </button>
          ${C(R,re)}
          ${uc(qe)}
          ${cc({metadata:qe.metadata,workspace_values:g(),catalog:$(),execution_defaults:D(),expanded:M,presets:Y()?.presets||[],preset_id:b,preset_busy:E,skipped_orchestration_keys:T},{onToggle:bt=>{M=bt,v()},onEdit:(bt,or)=>{if(bt==="impl_runtime"||bt==="impl_model"||bt==="impl_effort"){F(bt,or??"");return}I(bt,or??"")},onPresetSelect:bt=>{b=bt,T=[],v()},onPresetApply:()=>{De()}})}
          ${oe(Be,Ye)} ${H(m)}
          ${ye(Qe)}
          ${Xl(w,ge,{expanded:ve,draft:N,sending:P,error:ce})}
          ${_e(m)} ${et(m)} ${kr(m)}
          ${Vt(m)} ${_(m)}
          ${Kl(m,sr)}
          ${yc({expanded:We,loading:Ze,error:Te,data:ot},{onToggle:Ve})}
          ${hc(Ie(),pe,{total:re,expanded:Xe})}
        </div>
      </div>
    `}function v(){Je(y(),e)}return{load(m){m!==d&&(f={},b="",T=[],M=!1,O(),we(),Oe()),d=m,p=null,Ke(),x()},clear(){d=null,p=null,f={},b="",E=!1,T=[],M=!1,O(),we(),Oe(),Re.close(),xe.close(),Je(i``,e)},destroy(){be&&(be(),be=null),Ne&&(Ne(),Ne=null),Ae&&(Ae(),Ae=null),document.removeEventListener("keydown",Se),Re.destroy(),$e.parentNode&&$e.parentNode.removeChild($e),xe.destroy(),je.parentNode&&je.parentNode.removeChild(je),d=null,p=null,b="",E=!1,T=[],we(),Oe(),Je(i``,e)}}}function wc(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),c=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},u=(d,p,f="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let b=typeof f=="string"?f.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>c()),t.addEventListener("cancel",d=>{d.preventDefault(),c()}),{open:u,close:c,getElement(){return t}}}function Ys(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Zs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function kc(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,c=o.finished_at;typeof a!="number"||typeof c!="number"||!Number.isFinite(a)||!Number.isFinite(c)||c<a||(r+=c-a,n=!0)}return n?r:null}function Xs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function F_(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let c of r)c.kind!=="deploy"||c.state!=="succeeded"||typeof c.target_sha!="string"||(!s||(typeof c.finished_at=="number"?c.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=c);let o=r.filter(c=>c.state==="failed"&&!c.dismissed&&!c.superseded_by).length+n.length,a=r.some(c=>c.state==="repairing");return{deploy:s?{sha:Ys(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function $c(e,t){let r=F_(e,t);return r?i`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?i`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?$t(r.deploy.at):""}
            >${Xs(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Zs(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function fn(e){let t=qt(e.created_at),r=qt(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${$t(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${$t(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function j_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Bn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Qs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function cr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,b)=>(f.requested_at||0)-(b.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,c=typeof s?.last_error=="string"?s.last_error:null,u=s?j_(s.phase):null,d=s?.kind==="stale_work_backup_fresh",p=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!c),label:d?c?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":c?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(c?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${c} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${c} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${u||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:u,error:c,confirmation:p}}function vr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?i`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?i`<code>백업: ${n}</code>`:t.error?i`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?i`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?i`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var B_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function xc(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function c(d){return Number.isInteger(a[d])?Number(a[d]):0}let u=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:B_[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${c("branch_ahead")}`:[`staged ${c("staged_count")}`,`unstaged ${c("unstaged_count")}`,`untracked ${c("untracked_count")}`,`branch ahead ${c("branch_ahead")}`,`HEAD ahead ${c("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function fa(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=At(e.usage),s=Qt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,c=e.lane==="done"&&!a,u=c?qt(e.done_at):"",d=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",f=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",E=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,T=i`<span class="worker-mini__title">${e.title}</span>`,M=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",B=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",J=r.map(we=>we===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${we}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${we===e.completion_badge&&e.completion_title||""}
          >${we}</span
        >`),X=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",q=n.length>0?n.map(we=>i`<span class="worker-usage" title=${we.tooltip}
              >${we.label}</span
            >`):s?i`<span class="worker-usage" title=${cn(e.usage)}
            >${s}</span
          >`:"",S=o?i`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?i`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",A=e.merge_action?i`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",O=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",w=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",W=e.discard,ne=W?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${W?.attempt_id||""}
          data-operation-id=${W?.operation?.operation_id||""}
          data-discard-mode=${W?.confirmation||"unmerged"}
          ?disabled=${W?!W.enabled:e.discard_enabled===!1}
          title=${W?W.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${W?.label||"\uD3D0\uAE30"}
        </button>`:"",ce=e.stale_work||null,N=ce?i`${ce.can_resume||ce.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ce.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ce.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            다시 확인
          </button>`:""}`:"",P=ce?i`<div class="worker-mini__stale">
        <strong>${ce.title}</strong>
        <span>${ce.summary}</span>
        <span>${ce.cause}</span>
        ${ce.can_backup_fresh?i`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",de=e.revise_action?i`<button
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
        </button>`:"",ve=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||W?.operation||e.revise_action||ce);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${c?i`<div class="worker-mini__row1">${b}${E}${T}</div>
          <div class="worker-mini__row2">
            ${q}${u?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${$t(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?i`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Zs(e.work_ms)}</span
                >`:""}${J}${S}
            <span class="worker-mini__actions"
              >${A}${O}${w}${ne}</span
            >
            ${fn(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${d}${p}${b}${E}${M}${B}${J}${f}${X}
            </div>
            <div class="worker-mini__body">${T}${P}</div>
            ${ve?i`<div class="worker-mini__foot">
                  ${q}${S}
                  <span class="worker-mini__actions"
                    >${A}${O}${w}${ne}${de}${N}</span
                  >
                  ${vr(e)}
                </div>`:""}
            ${fn(e)}`:i`<div class="worker-mini__line">
              ${d}${p}${b}${E}${T}${M}${B}${J}${f}${X}${q}${S}${A}${O}${w}${ne}
            </div>
            ${vr(e)} ${fn(e)}`}
  </div>`}function U_(e,t=null){let r=e.worker_ineligible===!0,n=e.draggable&&!e.done&&!r,s=n&&t&&t.bead_id===e.id,o=e.workflow,a=o&&o.chips||{},c=a.route||o&&o.route,u=a.route_source==="derived"||!!(o&&o.route_source==="derived"),d=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),p=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
    class="worker-card${n?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${n?i`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?i`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r?i`<span
            class="ctl-chip worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >⛔ worker-ineligible</span
          >`:""}
      ${o&&c?i`<span
            class="ctl-chip ctl-chip--route${u?" is-derived":""}"
            title=${u?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${u?"unset":c}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${o?vs(o,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${s?i`<div class="worker-card__place-menu">
            ${t.lanes.map(f=>i`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${f.id}
                  title="${f.label} 대기 맨 뒤에 추가"
                >
                  <span>${f.label}</span>
                  <span class="worker-card__place-count">${f.count}</span>
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
          </div>`:i`${e.reason?i`<span
                  class="worker-card__reason${p?" worker-card__reason--danger":""}"
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
              ?disabled=${!n}
              title=${n?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":d?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${fn(e)}
  </div>`}function nr(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?i`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return i`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?i`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:i`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":i`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?i`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?U_(n,e.place_menu):fa(n))}
          </div>`}
  </section>`}function _a(e,t){return`${e}\0${t}`}function ma(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function W_(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function z_(e,t){return e==="internal"&&t===void 0}function Ac(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Sc(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Ac(s)})`,scope:null,same_lane_ahead:!1,missing_internal:!1};let a=W_(e,n);return{id:e,label:`\u{1F512} ${e} (${a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"})`,scope:a,same_lane_ahead:!1,missing_internal:z_(a,s)}}function Ec(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let c of t)for(let u of Array.isArray(c.sublanes?.serial)?c.sublanes.serial:[]){let d=_a(c.root_dir,u.id);r.set(d,{root_dir:c.root_dir,workspace_name:c.name,lane:u.id}),s.set(d,[]);for(let p of Array.isArray(u.items)?u.items:[])n.set(p.id,d)}for(let c of t)for(let u of Array.isArray(c.sublanes?.serial)?c.sublanes.serial:[]){let d=_a(c.root_dir,u.id),p=Array.isArray(u.items)?u.items[0]:null,b=!!p&&p.queue_index===0&&(!Array.isArray(u.occupied_by)||u.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],E=s.get(d);if(E)for(let T of b){let M=n.get(T);M&&M!==d&&!E.includes(M)&&E.push(M)}}let o=(c,u)=>{let d=new Set,p=[c];for(;p.length>0;){let f=p.pop();if(f===u)return!0;!f||d.has(f)||(d.add(f),p.push(...s.get(f)||[]))}return!1},a=new Map;for(let[c,u]of s){let d=[];for(let p of u){let f=r.get(p);o(p,c)&&f&&d.push(f)}d.length>0&&a.set(c,d)}return a}function Tc(e){let t=ma(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=Ac(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function Cc(e,t){return _a(e,t)}var Rc=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Un=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Js(e,t){let r=Rc.find(s=>s.step===e);if(!r)return null;let n=Rc.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Ic(e){let t=Un.findIndex(r=>r.step===e);return Un.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Hr(e){let t=Un.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function H_(e){let t=Un.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:Un.length}}function eo(e){let t=H_(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ba=new Set(["queued","running","retry_pending","repairing"]),Lc=new Set(["failed","succeeded"]),G_={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Wn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},V_={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Wn.base_containment,child_sweep:Wn.child_sweep,branch_cleanup:Wn.branch_cleanup,parent_close:Wn.parent_close};function K_(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Y_(e,t,r){return!["verify","deploy"].includes(e.kind)||![...ba,...Lc].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function Z_(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let c=typeof e.operation_id=="string"?e.operation_id:"",u=typeof t.operation_id=="string"?t.operation_id:"";return c.localeCompare(u)}function ga(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=G_[s];if(!o)return null;let a=Js(r,`${n} ${o}`);return a?{...a,active:ba.has(s),failed:s==="failed"}:null}function X_(e){return!e||typeof e!="object"?null:V_[e.step]||null}function zn(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=X_(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),c=K_(e.merge_sha)?e.merge_sha:null,u=!o&&c&&Array.isArray(e.repo_operations)?e.repo_operations.filter(T=>T&&typeof T=="object"&&Y_(T,t,c)).sort(Z_):[],d=a?u:[],p=d.find(T=>ba.has(T.state));if(p)return ga(p);if(s)return s.step==="repo_operations"&&u[0]?ga(u[0],!0):null;let f=d.find(T=>Lc.has(T.state)?T.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return ga(f);if(n){let T=Js(n.step,n.label);return T?{...T,active:!0,failed:!1}:null}let b=typeof e.cleanup_cursor=="string"?Wn[e.cleanup_cursor]:null;if(!b)return null;let E=Js(b.step,b.label);return E?{...E,active:!0,failed:!1}:null}function to(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Oc={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Mc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Pc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ha(e){for(let t of Pc(e))if(Object.hasOwn(Oc,t))return Oc[t];return null}function ya(e){let t=null;for(let r of Pc(e))Object.hasOwn(Mc,r)&&(t=Mc[r]);return t}function ro(e){let t=ha(e),r=ya(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Dc(e,t){let r=ha(e)??ha(t),n=ya(t)??ya(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var Nc=160;function Q_(e){return e.length>Nc?`${e.slice(0,Nc)}\u2026`:e}function J_(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${Q_(e.command)}</code>`:""}
  </div>`}function em(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function va(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function qc(e){let t=e.failure?ro(e.failure.reason):"";return i`<div class="worker-banners">
    ${e.failure?i`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?i`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?i`<button
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
          ${e.failure.resume_attempt_id?i`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${J_(e.failure.cause_detail)}
          ${em(e.failure.reason)}
          ${vr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function tm(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?va(t-e.started_at):"\u2014",a=ir(e),c=Sr(e),u=At(e.usage),d=Qt(e.usage),p=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,f=e.base_exception||null,b=e.landing,E=e.attempt_id&&e.attempt_id===r,T=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${E?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${c?i`<span class="rtile__resumed" title=${c}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?i`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${T}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 알림 닫기 — 레인에는 남습니다"
              aria-label="실패 기록 닫기"
            >
              ✕
            </button>`:i`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${s?i`<button
                  type="button"
                  class="rtile__resume"
                  title="같은 세션으로 이어서 재개"
                  aria-label="재개"
                >
                  ▶
                </button>`:i`<button
                  type="button"
                  class="rtile__pause"
                  ?disabled=${e.can_pause===!1}
                  title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                  aria-label="일시정지"
                >
                  ⏸
                </button>`}
            ${T}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?i`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${b?i`<div class="rtile__landing">
          <span
            class="merge-step${b.failed?" merge-step--failed":""}"
            style=${`--progress: ${b.percent}%`}
            >${b.label}${b.index>0?i`<span class="merge-step__n"
                  >${b.index}/${b.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||u.length>0||d||p||f?i`<div class="rtile__meta">
          ${p?i`<span class="worker-mini__badge">${p}</span>`:""}
          ${f?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${f}</span
              >`:""}
          ${a?i`<span class="rtile__runner">${a}</span>`:""}
          ${u.length>0?u.map(M=>i`<span class="worker-usage" title=${M.tooltip}
                    >${M.label}</span
                  >`):d?i`<span
                  class="worker-usage"
                  title=${cn(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${fn(e)} ${vr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function wa(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>tm(s,t,r))}
  </div>`}function Gr(e){return i`<svg
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
  </svg>`}function ka(){return Gr($r`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function $a(){return Gr($r`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Fc(){return Gr($r`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function jc(){return Gr($r`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Bc(){return Gr($r`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Uc(){return Gr($r`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Wc(){return Gr($r`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Hn=1,rm=6e4,nm={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},sm=new Set(["auto_merge","merged","merge","done"]),zc={running:3,paused:2,failed:1};function om(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function am(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let c=null;if(a.status==="running")c="running";else if(a.status==="paused"&&!n.has(a.attempt_id))c="paused";else if(a.status==="failed"||a.status==="orphaned"){let f=t.get(a.bead_id),b=typeof f=="number"&&f>0&&typeof a.finished_at=="number"&&f>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(c="failed")}if(!c)continue;let u=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let f=zc[d.run_state],b=zc[c];if(f>b||f===b&&(d.started_at??0)>(u??0))continue}let p=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:u,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:zt(e,a.bead_id),can_pause:c==="running"&&p,can_resume:c!=="running"&&p&&!n.has(a.attempt_id)})}return o}function Hc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function St(e){return e&&typeof e=="object"?e:{}}function xa(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let w of s)w&&typeof w.root_dir=="string"&&a.set(w.root_dir,w);let c=[],u=[],d=[],p=[],f=[],b=[],E=new Map,T=new Map,M=new Map;for(let w of n){if(!w||typeof w.root_dir!="string")continue;let W=w.root_dir,ne=w.name||W,ce=a.get(W),N=ce&&typeof ce.revision=="number"?ce.revision:typeof w.revision=="number"?w.revision:0,P=St(w.attempts),de=St(w.bead_titles),ve=St(w.pr_observations),we=St(w.admission),Fe=St(w.revise_parked),rt=St(w.merge_queue_state),Ue=St(w.cleanup_failed),fe=St(w.discard_operations),Le=St(w.bead_blocked_by),ge=St(w.pr_activity),$e=Array.isArray(w.repo_operations)?w.repo_operations:[],Re=Array.isArray(w.merge_queue)?w.merge_queue:[],je=new Set(Re.filter(G=>G&&typeof G.bead_id=="string").map(G=>G.bead_id)),xe=new Map(Re.filter(G=>G&&typeof G.bead_id=="string").map(G=>[G.bead_id,G])),We=Array.isArray(w.queue)?w.queue:[],Ze=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).filter(G=>G&&/^s[1-5]$/.test(G.id)&&Array.isArray(G.entries)),Te=St(w.lane_states),ot=typeof w.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(w.serial_lane_count))):Math.min(5,Ze.length);M.set(W,ot);let K=new Map(Ze.map(G=>[G.id,G])),U=new Map;for(let G of Ze)for(let ee of G.entries)ee&&typeof ee.bead_id=="string"&&U.set(ee.bead_id,G.id);let se=Array.isArray(w.done)?w.done:[];for(let G of se)G&&typeof G.bead_id=="string"&&b.push({id:G.bead_id,root_dir:W,workspace_name:ne});let Oe=new Map;for(let G of se)G&&typeof G.bead_id=="string"&&typeof G.added_at=="number"&&Oe.set(G.bead_id,G.added_at);let ze=G=>({id:G,title:de[G]||G,root_dir:W,workspace_name:ne,expected_revision:N,draggable:!1}),Ve=new Set;for(let[G,ee]of am(P,Oe))Ve.add(G),u.push({...ze(G),lane:"running",...U.has(G)?{serial_lane_id:U.get(G)}:{},attempt_id:ee.attempt_id,run_state:ee.run_state,can_pause:ee.can_pause,can_resume:ee.can_resume,started_at:ee.started_at,last_event_at:ee.last_event_at,runner:ee.runner,model:ee.model,effort:ee.effort,speed:ee.speed,resumed_from:ee.resumed_from,continuation_mode:ee.continuation_mode,usage:ee.usage,discard:cr(fe,G,{attempt_id:ee.attempt_id}),badges:ee.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:ee.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:ee.run_state==="failed"});for(let G of Array.isArray(w.pr_wait)?w.pr_wait:[]){let ee=G&&G.bead_id;if(typeof ee!="string"||Ve.has(ee))continue;Ve.add(ee);let Me=St(ve[ee]),He=St(Me.pr),pe=Me.gate?St(Me.gate):null,g=je.has(ee),x=xe.get(ee)?.continuation_action||null,$=!!x&&x.continuation===null,D=rt.active===ee,V=G.external===!0,Y=Ue[ee]||null,le=St(ge[ee]),ue=zn({bead_id:ee,merge_sha:G.merge_sha,cleanup_cursor:G.cleanup_cursor,merge_progress:le.merge_progress||null,cleanup_failed:Y,repo_operations:$e}),De=to(ue),be=!!pe&&pe.base_badge==="\uCDA9\uB3CC",Ne=!!Y&&["child_sweep","branch_cleanup","parent_close"].includes(Y.step)&&!!pe&&pe.tier==="merged",Ae=V&&!!Y&&!!pe&&pe.tier==="merged",Se=!!pe&&["closed_unmerged","review","undecidable"].includes(pe.tier),Ke=cr(fe,ee,{external:V,merge_active:D||ue?.step==="merge",merge_queued:g,cleanup_active:De,merged:!!Y||pe?.tier==="merged"}),z=!!Ke.operation;d.push({...ze(ee),lane:"pr_wait",pr_number:typeof He.number=="number"?He.number:null,pr_url:typeof He.url=="string"?He.url:void 0,external:V,usage:zt(P,ee),merge_step:ue,badges:$?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ue?[pe?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Y?[Hr(Y.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Hr(Y.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof pe?.gate_badge=="string"&&pe.gate_badge.length>0?[pe.gate_badge]:[],alert:ue?ue.failed===!0:!!Y||Se,reason:Y&&ue?.active!==!0?eo(Y.step):"PR \uB300\uAE30",merge_action:pe?.tier==="merged"&&!Ne&&!Ae?!1:!g||$,merge_enabled:!z&&($||pe?.enabled===!0||be||Ne||Ae),merge_label:$?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ae||Ne?"\uC815\uB9AC \uC7AC\uAC1C":be&&!Ne?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:$?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":z?Ke.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ke.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ke.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ne?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":be?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":pe?.enabled===!0?`\uBA38\uC9C0 (${pe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${pe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:g&&!$,cancel_enabled:!D,continuation_mismatch:x?.mismatch||null,discard:Ke,discard_action:Ke.action,discard_enabled:Ke.enabled,discard_title:Ke.title})}let Ie=(G,ee,Me,He)=>{let pe=G&&G.bead_id;if(typeof pe!="string"||Ve.has(pe))return null;Ve.add(pe);let g=Fe[pe],x=cr(fe,pe),$=x.operation?x:null,D={...ze(pe),lane:ee,draggable:!$,discard:$||void 0,reason:Hc(we,pe),queue_position:Me+1,queue_index:Me,queue_length:He,badges:g?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!g,revise_action:!!g,revise_enabled:!!g&&!$,revise_title:g?g.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${g.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Le,pe)&&(D.blocked_by=Array.isArray(Le[pe])?Le[pe].filter(V=>typeof V=="string"&&V.length>0):[]),D};for(let G=0;G<We.length;G++){let ee=Ie(We[G],"queue",G,We.length);if(!ee)continue;p.push(ee);let Me=E.get(W);Me?Me.push(ee):E.set(W,[ee])}let lt=[];for(let G=0;G<Ze.length;G++){let ee=Ze[G],Me=[];for(let pe=0;pe<ee.entries.length;pe++){let g=Ie(ee.entries[pe],ee.id,pe,ee.entries.length);g&&(Me.push(g),p.push(g))}if(Me.length===0)continue;let He=St(Te[ee.id]);lt.push({id:ee.id,index:G,items:Me,occupied_by:Array.isArray(He.occupied_by)?He.occupied_by.filter(pe=>typeof pe=="string"):[],corrections:Array.isArray(He.corrections)?He.corrections.length:0,cycle:He.cycle===!0})}T.set(W,lt);let Xe=Array.from({length:ot},(G,ee)=>{let Me=`s${ee+1}`,He=K.get(Me),pe=He&&Array.isArray(He.entries)?He.entries:[],g=St(Te[Me]);return{id:Me,index:pe.length,length:pe.length,occupied_by:Array.isArray(g.occupied_by)?g.occupied_by.filter(x=>typeof x=="string"):[]}});for(let G of Array.isArray(w.runnable)?w.runnable:[]){let ee=G&&G.bead_id;typeof ee!="string"||Ve.has(ee)||(Ve.add(ee),c.push({...ze(ee),title:G.title||de[ee]||ee,lane:"runnable",draggable:!0,reason:Hc(we,ee),created_at:G.created_at??void 0,updated_at:G.updated_at??void 0,labels:Array.isArray(G.labels)?G.labels:[],spec_reviewer:typeof G.spec_reviewer=="string"?G.spec_reviewer:void 0,plan_state:G.plan_state==="approved"||G.plan_state==="authored"?G.plan_state:"none",workflow:G.route?{route:G.route,chips:{route:G.route}}:null,blocked:G.blocked===!0,...Array.isArray(G.blocked_by)?{blocked_by:G.blocked_by.filter(Me=>typeof Me=="string"&&Me.length>0)}:{},place_index:We.length,place_lanes:Xe}))}for(let G of se){let ee=G&&G.bead_id;if(typeof ee!="string"||Ve.has(ee)||(Ve.add(ee),o!==void 0&&typeof G.added_at=="number"&&G.added_at<o))continue;let Me=om(P,ee);f.push({...ze(ee),lane:"done",done:!0,usage:zt(P,ee),done_at:typeof G.added_at=="number"?G.added_at:void 0,done_kind:Me&&typeof Me.done_kind=="string"?Me.done_kind:null})}}let B=new Map;s.forEach((w,W)=>{w&&typeof w.root_dir=="string"&&B.set(w.root_dir,W)});let J=r&&r.running_sort==="repo"?"repo":"started";u.sort((w,W)=>{if(J==="repo"){let N=B.get(w.root_dir)??Number.MAX_SAFE_INTEGER,P=B.get(W.root_dir)??Number.MAX_SAFE_INTEGER;if(N!==P)return N-P}let ne=typeof w.started_at=="number"&&Number.isFinite(w.started_at)?w.started_at:null,ce=typeof W.started_at=="number"&&Number.isFinite(W.started_at)?W.started_at:null;return ne!==null&&ce!==null&&ne!==ce?ne-ce:ne===null&&ce!==null?1:ne!==null&&ce===null?-1:w.id.localeCompare(W.id)}),f.sort((w,W)=>(W.done_at??0)-(w.done_at??0));let X=s.length>0?s:n.map(w=>({root_dir:w&&w.root_dir,name:w&&w.name,auto_advance:w&&w.auto_advance,auto_merge:w&&w.auto_merge,slots:w&&w.slots,revision:w&&w.revision,runner_catalog:w&&w.runner_catalog})),q=[];for(let w of X){if(!w||typeof w.root_dir!="string")continue;let W=E.get(w.root_dir)||[],ne=T.get(w.root_dir)||[];q.push({root_dir:w.root_dir,name:w.name||w.root_dir,auto_advance:w.auto_advance===!0,auto_merge:w.auto_merge===!0,slots:typeof w.slots=="number"&&w.slots>=Hn?w.slots:Hn,revision:typeof w.revision=="number"?w.revision:0,runner_catalog:St(w.runner_catalog),items:W,sublanes:{parallel:W,serial:ne},serial_lane_count:M.get(w.root_dir)||0})}let S={runnable:c,queue:p,queue_groups:q,running:u,pr_wait:d,done:f,automation:{total:q.length,both_on:q.filter(w=>w.auto_advance&&w.auto_merge).length}},A=ma(S);for(let w of b)A.has(w.id)||A.set(w.id,{root_dir:w.root_dir,workspace_name:w.workspace_name,lane:"done",state:"done"});for(let w of[...S.queue,...S.runnable]){if(!Object.hasOwn(w,"blocked_by"))continue;let W=A.get(w.id);w.blockers=(w.blocked_by||[]).map(ne=>Sc(ne,W,A,s)),w.blocker_warnings=w.blockers.filter(ne=>ne.missing_internal).map(ne=>`\u26A0 \uC120\uD589 ${ne.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),w.blocker_warnings.length>0&&(w.alert=!0)}let O=Ec(S.queue_groups);for(let w of S.queue_groups)for(let W of w.sublanes.serial){let ne=O.get(Cc(w.root_dir,W.id));ne&&(W.cross_wait_peers=ne)}return S}function im(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<rm;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${$t(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${qt(e,t)}</span
        >`}</span
  >`}function Gn(e){return i`<div class="mon-c__title">${e.title}</div>`}function Vn(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function no(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Aa(e){let t=At(e.usage),r=Qt(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${cn(e.usage)}
        >${r}</span
      >`:""}function Sa(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function lm(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${$a()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${ka()}
        </button>`}
    ${e.discard?.action?i`<button
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
    ${e.run_state==="failed"?i`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${jc()}
        </button>`:""}
  </span>`}function Gc(e){if(!Object.hasOwn(e,"blocked_by"))return"";let t=Array.isArray(e.blockers)?e.blockers:[];return t.length===0?e.blocked?i`<span class="mon-blocker">🔒 blocked</span>`:"":t.map(r=>i`<span
        class="mon-blocker${r.same_lane_ahead?" mon-blocker--normal":""}"
      >
        <span>${r.label}</span>
        <button
          type="button"
          class="mon-blocker__remove"
          data-blocker-id=${r.id}
          aria-label=${`\uC120\uD589 ${r.id} \uC5F0\uACB0 \uD574\uC81C`}
          title="직렬 연결 해제"
        >
          ✕
        </button>
      </span>`)}function Vc(e){let t=Array.isArray(e.blocker_warnings)?e.blocker_warnings:[];return t.length>0?i`<div class="mon-blocker-warnings">
        ${t.map(r=>i`<div class="mon-blocker-warning">${r}</div>`)}
      </div>`:""}function Kc(){return i`<span class="mon-link mon-popover-owner">
    <button
      type="button"
      class="mon-link__trigger"
      aria-haspopup="dialog"
      aria-expanded="false"
      title="직렬로 연결"
    >
      🔗
    </button>
    <span class="mon-link__popover mon-card-popover" role="dialog" hidden>
      <input
        type="search"
        class="mon-link__search"
        placeholder="id·제목·위치 검색"
        aria-label="직렬로 연결할 버드 검색"
        autocomplete="off"
      />
      <span class="mon-link__list"></span>
      <button type="button" class="mon-link__direct" hidden></button>
      <span class="mon-link__empty" hidden>검색 결과 없음</span>
      <span class="mon-link__error" role="alert" hidden></span>
    </span>
  </span>`}function cm(e,t){let r=typeof e.started_at=="number"?va(t-e.started_at):"";return i`${Gn(e)}
    <div class="mon-c__meta">
      ${Sa(e)}${im(e.last_event_at,t)}${Vn(e)}${no(e)}
      ${ir(e)?i`<span class="mon-c__model">${ir(e)}</span>`:""}
      ${Sr(e)?i`<span
            class="rtile__resumed"
            title=${Sr(e)}
            >↻</span
          >`:""}
      ${e.serial_lane_id?i`<span class="mon-c__lane">${e.serial_lane_id}</span>`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Aa(e)}${lm(e)}${vr(e)}
    </div>`}function um(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),c=qt(e.updated_at);return i`${Gn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Vn(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${ys(e.labels,null).map(u=>i`<span class="ctl-chip ctl-chip--label">${u}</span>`)}
      ${no(e)}
      ${c?i`<span title=${`\uC218\uC815 ${$t(e.updated_at)}`}
            >수정 ${c}</span
          >`:""}
      ${e.reason?i`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      ${Gc(e)}
      <span class="mon-c__ops">
        ${Kc()}
        <span class="mon-place mon-popover-owner">
          <button
            type="button"
            class="worker-card__place"
            data-bead-id=${e.id}
            aria-haspopup="menu"
            aria-expanded="false"
            title="적재할 대기 레인 선택"
          >
            대기로 ↴
          </button>
          <span class="mon-place__popover mon-card-popover" role="menu" hidden>
            <button
              type="button"
              class="mon-place__choice"
              data-lane="parallel"
              data-place-index=${String(e.place_index??0)}
              role="menuitem"
              aria-label=${`\uBCD1\uB82C \xB7 \uB300\uAE30 ${e.place_index??0}`}
            >
              <strong>병렬</strong><span>대기 ${e.place_index??0}</span>
            </button>
            ${(e.place_lanes||[]).map(u=>i`<button
                  type="button"
                  class="mon-place__choice"
                  data-lane=${u.id}
                  data-place-index=${String(u.index)}
                  role="menuitem"
                  aria-label=${`${u.id} \xB7 ${u.occupied_by.length>0?`\uC810\uC720 ${u.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"} \xB7 \uB300\uAE30 ${u.length}`}
                >
                  <strong>${u.id}</strong
                  ><span
                    >${u.occupied_by.length>0?`\uC810\uC720 ${u.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"}
                    · 대기 ${u.length}</span
                  >
                </button>`)}
          </span>
        </span>
      </span>
    </div>
    ${Vc(e)}`}function dm(e){let t=!!e.discard?.operation;return i`${Gn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Vn(e)}
      ${Sa(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
      ${Gc(e)}
      <span class="mon-c__ops">
        ${Kc()}
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
        ${t?i`<button
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
    ${Vc(e)} ${vr(e)}
    ${e.revise_action?i`<div class="mon-c__tail">
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
        </div>`:""}`}function pm(e){let t=e.merge_step||null,r=!!(Qt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return i`${Gn(e)}
    <div class="mon-c__meta">
      ${Vn(e)}${no(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Sa(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?i`<div class="mon-c__tail">
          ${Aa(e)}${t?i`<span
                class="merge-step${t.failed?" merge-step--failed":""}"
                style=${`--progress: ${t.percent}%`}
                >${t.label}${t.index>0?i`<span class="merge-step__n"
                      >${t.index}/${t.total}</span
                    >`:""}</span
              >`:""}
          ${e.merge_action?i`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?i`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?i`<button
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
          ${vr(e)}
        </div>`:""}`}function fm(e,t){let r=e.done_kind||"",n=r?nm[r]||r:"",s=qt(e.done_at,t);return i`${Gn(e)}
    <div class="mon-c__meta">
      ${Vn(e)}${no(e)}
      ${n?i`<span
            class="mon-live__kind${sm.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Aa(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${$t(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Yc(e,t){return e.lane==="running"?cm(e,t):e.lane==="runnable"?um(e):e.lane==="queue"||/^s[1-5]$/.test(e.lane)?dm(e):e.lane==="pr_wait"?pm(e):fm(e,t)}function Zc(e){let t=String(e.revision),r=e.sublanes?e.sublanes.parallel.length+e.sublanes.serial.reduce((n,s)=>n+s.items.length,0):e.items.length;return i`<header
    class="mon-group__hd${r===0?" is-empty":""}"
    data-root-dir=${e.root_dir}
    data-revision=${t}
  >
    <span class="mon-group__name" title=${e.root_dir}>${e.name}</span>
    <span class="mon-group__count">${r}</span>
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
        ${e.auto_advance?$a():ka()}
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
        ${Bc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Uc()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Hn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function Xc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=ar.find(c=>c.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Fc():Wc()}
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
        ${ar.map(c=>i`<option
              value=${c.value}
              ?selected=${e.done_range===c.value}
            >
              ${c.label}
            </option>`)}
      </select>
      ${a.map(c=>i`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${c.tooltip}
            >${o} 완료 · 누적 ${c.label}</span
          >`)}
    </div>
  </div>`}function Qc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Jc(e){let t=(Array.isArray(e)?e:[]).map(c=>c&&c.usage).filter(c=>c&&typeof c=="object"&&"providers"in c);if(t.length>0)return At(As(t));let r={};for(let c of _r)r[c]=0;let n=!1,s=0,o=0,a=0;for(let c of Array.isArray(e)?e:[]){let u=c&&c.usage;if(u&&typeof u=="object"){let d=!1;for(let p of _r){let f=u[p];typeof f=="number"&&Number.isFinite(f)&&(r[p]+=f,n=!0,d=!0)}if(d){o+=1;let p=u.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Qt(r):null}var eu="bdui.monitor.done-range",tu="bdui.monitor.running_sort",ru="beads-ui.monitor.candidate-filter",Ea={show_blocked:!1};function _m(){try{let e=window.localStorage.getItem(ru);if(!e)return{...Ea};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ea}:{show_blocked:t.show_blocked===!0}}catch{return{...Ea}}}function mm(e){try{window.localStorage.setItem(ru,JSON.stringify({show_blocked:e.show_blocked}))}catch{}}function gm(e,t){if(t.show_blocked)return{visible:e,hidden_blocked:0};let r=e.filter(n=>n.blocked!==!0);return{visible:r,hidden_blocked:e.length-r.length}}function bm(){try{let e=window.localStorage.getItem(eu);return Wt(e)?e:Nt}catch{return Nt}}function hm(e){try{window.localStorage.setItem(eu,e)}catch{}}function ym(){try{return window.localStorage.getItem(tu)==="repo"?"repo":"started"}catch{return"started"}}function vm(e){try{window.localStorage.setItem(tu,e)}catch{}}var nu="tab:monitor:pipeline",wm=1e3,km=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function so(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
    class="mon-card mon-card--${e.lane}${e.alert?" mon-card--alert":""}${e.blocked?" mon-card--blocked":""}"
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
    ${Yc(e,t)}
  </div>`}function $m(e,t){let r=e.serial_lane_count>0||e.sublanes.serial.length>0,n=r?i`<section class="mon-sublane mon-sublane--parallel">
        <header class="mon-sublane__hd">
          <span class="mon-sublane__name">병렬</span>
          <span class="mon-sublane__count"
            >대기 ${e.sublanes.parallel.length}</span
          >
        </header>
        <div class="mon-group__list">
          ${e.sublanes.parallel.map(s=>so(s,t))}
        </div>
      </section>`:i`<div class="mon-group__list">
        ${e.items.map(s=>so(s,t))}
      </div>`;return i`<div class="mon-group" data-root-dir=${e.root_dir}>
    ${Zc(e)} ${n}
    ${r?e.sublanes.serial.map(s=>i`<section
              class="mon-sublane mon-sublane--serial"
              data-serial-lane=${s.id}
            >
              <header class="mon-sublane__hd">
                <span class="mon-sublane__name">${s.id}</span>
                <span class="mon-sublane__count"
                  >대기 ${s.items.length}</span
                >
                ${s.occupied_by.length>0?i`<span class="mon-sublane__held"
                      >${`\u25CF \uC810\uC720 \uC911 \xB7 ${s.occupied_by.join(", ")} (\uBA38\uC9C0\uAE4C\uC9C0 \uC720\uC9C0)`}</span
                    >`:""}
                ${s.corrections>0?i`<span class="mon-sublane__corrections"
                      >순서 자동 교정 ${s.corrections}건</span
                    >`:""}
                ${s.cross_wait_peers?.map(o=>i`<span class="mon-sublane__cross-wait"
                      >⚠ 상호 정지 — ${o.workspace_name}·${o.lane}과 교차
                      대기</span
                    >`)}
              </header>
              ${s.cycle?i`<div class="mon-sublane__cycle">
                    ⛔ 의존 사이클 — 자동 교정 불가
                  </div>`:""}
              <div class="mon-group__list">
                ${s.items.map(o=>so(o,t))}
              </div>
            </section>`):""}
  </div>`}function su(e,t){let r=gt("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,c=t.switchWorkspace,u=t.now||(()=>Date.now()),d=t.confirm||(g=>typeof globalThis.confirm!="function"||globalThis.confirm(g)),p=bm(),f=ym(),b=_m();function E(){let g=ar.find(x=>x.value===p);return g?g.label:""}let T=document.createElement("div");T.className="mon",e.appendChild(T);let M=xa(null,null),B=new Map,J=null,X=null;async function q(g,x,$,D,V=!0){if(!o||!$)return null;let Y=await o(g,{...x,root_dir:$,expected_revision:D});if(Y&&Y.conflict&&V){Y.queue&&B.set($,Y.queue);let le=Y.queue&&typeof Y.queue.revision=="number"?Y.queue.revision:D;Y=await o(g,{...x,root_dir:$,expected_revision:le})}return Y&&Y.queue&&$&&B.set($,Y.queue),Y}function S(g,x){let $=B.get(g),D=s&&s.get?s.get():null,V=(Array.isArray(D)?D:[]).find(le=>le?.root_dir===g);return($||V)?.merge_queue?.find(le=>le.bead_id===x)?.continuation_action}async function A(g,x,$,D){let V=await q(g,x,$,D),Y=B.get($)?.revision??V?.queue?.revision??D;return fr(V,(le,ue)=>q(g,{...x,continuation:le,decision_token:ue},$,Y,!1),{refresh:le=>q(g,x,$,le?.queue?.revision??B.get($)?.revision??Y,!1)})}async function O(g,x,$,D){let V=await fr({continuation_mismatch:D},(le,ue)=>q("worker-merge-queue-add",{bead_id:x,continuation:le,decision_token:ue},g,$,!1)),Y=V?.queue?.merge_queue?.find(le=>le.bead_id===x)?.continuation_action;V?.applied!==!0&&Y?.continuation===null&&Y.mismatch&&await O(g,x,V.queue.revision,Y.mismatch)}async function w(g,x,$){let D=await q("worker-discard",g,x,$);if(D&&D.discarded===!0){ae(Qs(D),"success",5e3);return}if(D&&D.reason){ae(`\uD3D0\uAE30 \uC2E4\uD328: ${D.reason}`,"error");return}if(D&&D.accepted&&D.pending==="merged_revert"){ae("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(D&&D.accepted){ae(`\uD3D0\uAE30 \uC9C4\uD589: ${D.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}D&&!D.conflict&&ae("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function W(g,x,$){return!o||!$?null:await o(g,{...x,root_dir:$})}async function ne(g){if(!o||!g&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let x=await o("monitor-auto-toggle",{on:g}),$=x&&Array.isArray(x.failed)?x.failed:[];$.length>0&&ae(`\uC790\uB3D9\uD654 ${g?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${$.map(D=>D.root_dir).join(", ")}`,"error",3200)}async function ce(){let g=new Map;for(let x of M.pr_wait)g.has(x.root_dir)||g.set(x.root_dir,x.expected_revision);for(let[x,$]of g)await q("worker-merge-queue-add-all",{},x,$)}let N=null,P=!1,de=null;function ve(){de!==null&&clearTimeout(de),de=setTimeout(()=>{de=null,P=!1},0)}function we(g){let x=g.target;return typeof x?.closest=="function"?x.closest(".mon-group"):null}function Fe(g){let x=we(g);return!x||!N?null:(x.getAttribute("data-root-dir")||"")===N.root_dir?x:null}function rt(){for(let g of Array.from(T.querySelectorAll(".mon-group--drag-over")))g.classList.remove("mon-group--drag-over")}function Ue(g){let x=g.target,$=typeof x?.closest=="function"?x.closest('.mon-card[draggable="true"]'):null;if($){N={bead_id:$.getAttribute("data-issue-id")||"",lane:$.getAttribute("data-lane")||"",root_dir:$.getAttribute("data-root-dir")||"",revision:Number($.getAttribute("data-revision")||0)||0,queue_index:Number($.getAttribute("data-queue-index")),queue_length:Number($.getAttribute("data-queue-length")),place_index:Number($.getAttribute("data-place-index"))},P=!0;try{g.dataTransfer?.setData("text/plain",N.bead_id),g.dataTransfer&&(g.dataTransfer.effectAllowed="move")}catch{}}}function fe(g){let x=Fe(g);x&&(g.preventDefault(),g.dataTransfer&&(g.dataTransfer.dropEffect="move"),x.classList.add("mon-group--drag-over"))}function Le(g){we(g)?.classList.remove("mon-group--drag-over")}function ge(){N=null,rt(),ve()}function $e(g){let x=Fe(g),$=N;if(N=null,rt(),!x||!$||!$.bead_id)return;g.preventDefault();let D=g.target,V=typeof D?.closest=="function"?D.closest('.mon-card[data-lane="queue"]'):null,Y=V&&x.contains(V)?Number(V.getAttribute("data-queue-index")):NaN;if($.lane==="runnable"){let De=Number.isFinite(Y)?Y:$.place_index;if(!Number.isFinite(De))return;q("worker-queue-place",{bead_id:$.bead_id,index:De},$.root_dir,$.revision);return}if($.lane!=="queue"||V&&V.getAttribute("data-issue-id")===$.bead_id)return;let le=$.queue_index,ue=Number.isFinite(Y)?le>Y?Y:Y-1:$.queue_length-1;!Number.isFinite(ue)||ue<0||ue===le||q("worker-queue-reorder",{bead_id:$.bead_id,to_index:ue},$.root_dir,$.revision)}function Re(g){let x=gm(M.runnable,b),$={runnable:x.visible,queue:M.queue,running:M.running,pr_wait:M.pr_wait,done:M.done};return i`${Xc({automation:M.automation,counts:{running:M.running.length,queue:M.queue.length,pr_wait:M.pr_wait.length},running_sort:f,done_range:p,token_total:Jc(M.done),token_tooltip:Qc(E())})}
      <div class="worker-lanes mon-lanes">
        ${km.map(D=>{let V=$[D.lane],Y=D.lane==="queue"?M.queue_groups.length>0?i`${M.queue_groups.map(le=>$m(le,g))}`:void 0:V.length>0?i`${V.map(le=>so(le,g))}`:void 0;return nr({id:`monitor-${D.lane}`,lane:D.pane,title:D.lane==="done"?`\uC644\uB8CC\xB7${E()}`:D.title,items:V,empty:D.empty,body:Y,live:D.lane==="running"&&V.length>0,header_control:D.lane==="runnable"?i`<span class="mon-candidate-filter">
                    <label
                      class="worker-filter__tgl"
                      title="blocked 이슈 표시 (기본 숨김)"
                    >
                      <input
                        type="checkbox"
                        class="mon-filter__blocked"
                        .checked=${b.show_blocked}
                      />
                      🔒 blocked
                    </label>
                    ${x.hidden_blocked>0?i`<span class="worker-filter__hidden"
                          >숨김 ${x.hidden_blocked}건</span
                        >`:""}
                  </span>`:D.lane==="pr_wait"&&V.length>0?i`<button
                      type="button"
                      class="mon-lane-op mon-merge-all"
                      title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                    >
                      일괄 머지
                    </button>`:""})})}
      </div>`}function je(){let g=s&&s.get?s.get():null,x=s&&s.getWorkspacesState?s.getWorkspacesState():[],$=u();M=xa(g,x,{done_since:Nr(p,$),running_sort:f}),Je(Re($),T)}function xe(g,x){let $=a?a():void 0;if(!x||!$||x===$||!c){n(g);return}c(x).then(()=>{n(g)}).catch(D=>{r("workspace switch for %s failed: %o",x,D)})}function We(g){return{root_dir:g.getAttribute("data-root-dir")||"",revision:Number(g.getAttribute("data-revision")||0)||0}}function Ze(g){if(typeof g=="string"&&g.length>0)return g;if(g&&typeof g=="object"){let x=g;if(typeof x.message=="string"&&x.message.length>0)return x.message;if(typeof x.error=="string"&&x.error.length>0)return x.error;if(x.error&&typeof x.error=="object"&&typeof x.error.message=="string")return x.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Te(g,x){let $=g.querySelector(".mon-link__trigger"),D=g.querySelector(".mon-link__popover"),V=g.querySelector(".mon-link__error");!$||!D||!V||(Oe(),D.hidden=!1,$.setAttribute("aria-expanded","true"),V.textContent=x,V.hidden=!1)}async function ot(g,x,$){let D=x.getAttribute("data-root-dir")||"",V=x.getAttribute("data-issue-id")||"";if(!(!V||!$||$===V))try{await W(g,{a:V,b:$},D),Oe()}catch(Y){Te(x,Ze(Y))}}function K(g,x){let{root_dir:$,revision:D}=We(g),V=g.getAttribute("data-issue-id")||"",Y=x.dataset.attemptId||g.getAttribute("data-attempt-id")||"",le=x.classList;if(le.contains("mon-link__trigger")){Ve(x);return}if(le.contains("mon-link__candidate")||le.contains("mon-link__direct")){let ue=x.dataset.targetId||"";ot("dep-add",g,ue);return}if(le.contains("mon-blocker__remove")){let ue=x.dataset.blockerId||"";ot("dep-remove",g,ue);return}if(le.contains("mon-place__choice")){let ue=x.dataset.lane||"parallel",De=Number(x.dataset.placeIndex||0)||0;Oe(),q("worker-queue-place",{bead_id:V,...ue==="parallel"?{}:{lane:ue},index:De},$,D);return}if(le.contains("worker-card__place")){ze(x);return}if(le.contains("mon-op--up")||le.contains("mon-op--down")){let ue=Number(g.getAttribute("data-queue-index")||0)||0,De=le.contains("mon-op--up")?ue-1:ue+1;if(De<0)return;q("worker-queue-reorder",{bead_id:V,.../^s[1-5]$/.test(g.dataset.lane||"")?{lane:g.dataset.lane}:{},to_index:De},$,D);return}if(le.contains("mon-op--remove")){q("worker-queue-remove",{bead_id:V},$,D);return}if(le.contains("mon-op--pause")){W("worker-attempt-pause",{attempt_id:Y},$);return}if(le.contains("mon-op--discard")){if(!d(Bn(V,"unmerged")))return;w({bead_id:V,...Y?{attempt_id:Y}:{},...x.dataset.operationId?{operation_id:x.dataset.operationId}:{}},$,D);return}if(le.contains("mon-op--resume")){an().then(ue=>{if(ue!==null)return A("worker-attempt-resume",{attempt_id:Y,...ue!==""?{instructions:ue}:{}},$,D)});return}if(le.contains("mon-op--dismiss")){q("worker-attempt-dismiss",{attempt_id:Y},$,D);return}if(le.contains("worker-mini__merge")){let ue=S($,V);ue?.mismatch&&ue.continuation===null?O($,V,D,ue.mismatch):q("worker-merge-queue-add",{bead_id:V},$,D);return}if(le.contains("worker-mini__merge-cancel")){q("worker-merge-queue-remove",{bead_id:V},$,D);return}if(le.contains("worker-mini__discard")){let ue=x.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(Bn(V,ue)))return;w({bead_id:V,...Y?{attempt_id:Y}:{},...x.dataset.operationId?{operation_id:x.dataset.operationId}:{}},$,D);return}if(le.contains("worker-mini__revise-fix")){A("worker-revise-fix",{bead_id:V},$,D);return}le.contains("worker-mini__revise-approve")&&q("worker-revise-approve",{bead_id:V},$,D)}function U(g){g.querySelector(".mon-link__list")?.replaceChildren();let $=g.querySelector(".mon-link__search");$&&($.value="");let D=g.querySelector(".mon-link__direct");D&&(D.hidden=!0,D.dataset.targetId="",D.textContent="");let V=g.querySelector(".mon-link__empty");V&&(V.hidden=!0);let Y=g.querySelector(".mon-link__error");Y&&(Y.hidden=!0,Y.textContent="")}function se(g,x){let $=g.querySelector(".mon-link__list");if(!$)return;let D=document.createDocumentFragment(),V=Tc(M).filter(Y=>Y.id!==x);for(let Y of V){let le=document.createElement("button");le.type="button",le.className="mon-link__candidate",le.dataset.targetId=Y.id,le.dataset.search=`${Y.id} ${Y.title} ${Y.location}`.toLocaleLowerCase();let ue=document.createElement("strong");ue.textContent=Y.id;let De=document.createElement("span");De.textContent=Y.title;let be=document.createElement("small");be.textContent=Y.location,le.append(ue,De,be),D.append(le)}$.replaceChildren(D)}function Oe(){for(let g of Array.from(T.querySelectorAll(".mon-card-popover"))){let x=g;x.hidden=!0,x.classList.contains("mon-link__popover")&&U(x)}for(let g of Array.from(T.querySelectorAll('[aria-expanded="true"]')))g.setAttribute("aria-expanded","false")}function ze(g){let $=g.closest(".mon-place")?.querySelector(".mon-place__popover")||null;if(!$)return;let D=$.hidden;Oe(),D&&($.hidden=!1,g.setAttribute("aria-expanded","true"))}function Ve(g){let $=g.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!$)return;let D=$.hidden;if(Oe(),D){let V=g.closest(".mon-card");se($,V?.getAttribute("data-issue-id")||""),$.hidden=!1,g.setAttribute("aria-expanded","true");let Y=$.querySelector(".mon-link__search");Y&&(Ie(Y),Y.focus())}}function Ie(g){let x=g.closest(".mon-link__popover"),$=g.closest(".mon-card");if(!x||!$)return;let D=g.value.trim(),V=D.toLocaleLowerCase(),Y=0,le=!1;for(let Ae of Array.from(x.querySelectorAll(".mon-link__candidate"))){let Se=Ae,Ke=Se.dataset.targetId||"",z=V.length===0||(Se.dataset.search||"").includes(V);Se.hidden=!z,z&&(Y+=1),Ke.toLocaleLowerCase()===V&&(le=!0)}let ue=x.querySelector(".mon-link__direct"),De=$.getAttribute("data-issue-id")||"";if(ue){let Ae=D.length>0&&!le&&V!==De.toLocaleLowerCase();ue.hidden=!Ae,ue.dataset.targetId=Ae?D:"",ue.textContent=Ae?`\uC9C1\uC811 \uC785\uB825 \xB7 ${D}`:"",Ae&&(Y+=1)}let be=x.querySelector(".mon-link__empty");be&&(be.hidden=Y>0);let Ne=x.querySelector(".mon-link__error");Ne&&(Ne.hidden=!0,Ne.textContent="")}function lt(g){let x=g.target;x&&T.contains(x)&&typeof x.closest=="function"&&x.closest(".mon-popover-owner")||Oe()}function Xe(g){if(g.key!=="Escape")return;let x=T.querySelector('[aria-expanded="true"]');Oe(),x?.focus()}function G(g){let x=P;P=!1;let $=g.target;if(!$||typeof $.closest!="function"||$.closest("dialog")||$.closest("a"))return;let D=$.closest(".mon-running-sort");if(D){g.preventDefault(),f=D.getAttribute("data-sort")==="repo"?"repo":"started",vm(f),je();return}let V=$.closest(".mon-auto-all");if(V){g.preventDefault(),ne(V.getAttribute("data-on")==="true");return}if($.closest(".mon-merge-all")){g.preventDefault(),ce();return}let le=$.closest(".mon-ctl--advance");if(le){g.preventDefault();let{root_dir:Ae,revision:Se}=We(le);q("worker-automation-toggle",{on:le.getAttribute("data-on")==="true"},Ae,Se);return}let ue=$.closest(".mon-ctl--merge-auto");if(ue){g.preventDefault();let{root_dir:Ae,revision:Se}=We(ue);q("worker-merge-auto-toggle",{on:ue.getAttribute("data-on")==="true"},Ae,Se);return}let De=$.closest(".mon-card");if(!De)return;let be=$.closest("button");if(be){g.preventDefault(),K(De,be);return}let Ne=De.getAttribute("data-issue-id");Ne&&!x&&(g.preventDefault(),xe(Ne,De.getAttribute("data-root-dir")||""))}function ee(g){let x=g.target;if(!x||typeof x.closest!="function")return;let $=x.closest(".mon-filter__blocked");if($){b={show_blocked:$.checked},mm(b),je();return}let D=x.closest(".mon-done-range");if(D){p=Wt(D.value)?D.value:Nt,hm(p),je();return}let V=x.closest(".mon-slots__input");if(!V)return;let{root_dir:Y,revision:le}=We(V),ue=Number(V.value);if(!Number.isFinite(ue))return;let De=Math.max(Hn,Math.floor(ue));q("worker-queue-set-slots",{slots:De},Y,le)}function Me(g){let x=g.target;x?.classList.contains("mon-link__search")&&Ie(x)}e.addEventListener("click",G),e.addEventListener("change",ee),e.addEventListener("input",Me),e.addEventListener("dragstart",Ue),e.addEventListener("dragover",fe),e.addEventListener("dragleave",Le),e.addEventListener("drop",$e),e.addEventListener("dragend",ge),document.addEventListener("click",lt),document.addEventListener("keydown",Xe),s&&typeof s.subscribe=="function"&&(J=s.subscribe(()=>{try{B.clear(),je()}catch{}}));function He(){X!==null&&(clearInterval(X),X=null)}function pe(){de!==null&&(clearTimeout(de),de=null)}return{load(){r("load"),je(),X===null&&(X=setInterval(()=>{try{if(T.querySelector(".mon-card-popover:not([hidden])"))return;je()}catch{}},wm))},pause(){He()},clear(){He(),pe(),J&&(J(),J=null),e.removeEventListener("click",G),e.removeEventListener("change",ee),e.removeEventListener("input",Me),e.removeEventListener("dragstart",Ue),e.removeEventListener("dragover",fe),e.removeEventListener("dragleave",Le),e.removeEventListener("drop",$e),e.removeEventListener("dragend",ge),document.removeEventListener("click",lt),document.removeEventListener("keydown",Xe),e.replaceChildren()}}}function ou(e,t,r){let n=gt("views:nav"),s=null;function o(u){return d=>{d.preventDefault(),n("click tab %s",u),r.gotoView(u)}}function a(){let u=t.getState(),d=u.view==="worker"||u.view==="monitor"?u.view:"board";return i`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${d==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${d==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
        <a
          href="#/monitor"
          class="ctl-tab ${d==="monitor"?"is-active":""}"
          @click=${o("monitor")}
          >Monitor</a
        >
      </div>
    `}function c(){Je(a(),e)}return c(),s=t.subscribe(()=>c()),{destroy(){s&&(s(),s=null),Je(i``,e)}}}var au=["bug","feature","task","epic","chore"];function iu(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var lu=["Critical","High","Medium","Low","Backlog"];function cu(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),u=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function E(){o.replaceChildren();let A=document.createElement("option");A.value="",A.textContent="\u2014 Select \u2014",o.appendChild(A);for(let O of au){let w=document.createElement("option");w.value=O,w.textContent=iu(O),o.appendChild(w)}a.replaceChildren();for(let O=0;O<=4;O+=1){let w=document.createElement("option");w.value=String(O);let W=lu[O]||"Medium";w.textContent=`${O} \u2013 ${W}`,a.appendChild(w)}}E();function T(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function M(A){s.disabled=A,o.disabled=A,a.disabled=A,c.disabled=A,u.disabled=A,p.disabled=A,f.disabled=A,f.textContent=A?"Creating\u2026":"Create"}function B(){d.textContent=""}function J(A){d.textContent=A}function X(){try{let A=window.localStorage.getItem("beads-ui.new.type");A?o.value=A:o.value="";let O=window.localStorage.getItem("beads-ui.new.priority");O&&/^\d$/.test(O)?a.value=O:a.value="2"}catch{o.value="",a.value="2"}}function q(){let A=o.value||"",O=a.value||"";A.length>0&&window.localStorage.setItem("beads-ui.new.type",A),O.length>0&&window.localStorage.setItem("beads-ui.new.priority",O)}async function S(){B();let A=String(s.value||"").trim();if(A.length===0){J("Title is required"),s.focus();return}let O=Number(a.value||"2");if(!(O>=0&&O<=4)){J("Priority must be 0..4"),a.focus();return}let w=String(o.value||""),W=String(u.value||""),ne={title:A};w.length>0&&(ne.type=w),String(O).length>0&&(ne.priority=O),W.length>0&&(ne.description=W),M(!0);try{await t("create-issue",ne)}catch{M(!1),J("Failed to create issue");return}q(),M(!1),T()}return r.addEventListener("cancel",A=>{A.preventDefault(),T()}),b.addEventListener("click",()=>T()),p.addEventListener("click",()=>T()),r.addEventListener("keydown",A=>{A.key==="Enter"&&(A.ctrlKey||A.metaKey)&&(A.preventDefault(),S())}),n.addEventListener("submit",A=>{A.preventDefault(),S()}),{open(){n.reset(),B(),X();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){T()}}}var xm=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Am(e,t){return To(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function uu(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=Am(n,e);return i`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${s}`}
                data-label=${n}
                data-state=${s}
                @click=${()=>r(n)}
              >
                ${n}
              </button>`})}
          </div>`}
    </section>
  `}function du(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(n=>i`<span class="settings-dialog__prefix">
              ${n}
              <button
                type="button"
                class="settings-dialog__prefix-remove"
                aria-label=${`${n} \uADDC\uCE59 \uC81C\uAC70`}
                @click=${()=>r.onRemove(n)}
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
          @input=${n=>r.onDraft(String(n.target.value||""))}
        />
        <button
          type="button"
          class="settings-dialog__btn"
          @click=${r.onAdd}
        >
          추가
        </button>
      </div>
    </section>
  `}function pu(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${xm.map(([r,n])=>i`<label class="settings-dialog__toggle">
              <input
                type="checkbox"
                data-chip=${r}
                .checked=${e.chips[r]!==!1}
                @change=${()=>t(r)}
              />
              <span>${n}</span>
            </label>`)}
      </div>
    </section>
  `}var Sm=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Ft="";function jt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function fu(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(g=>ae(g,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let c="execution",u=!1,d="",p={},f={},b=[],E=!1,T=null,M={},B="",J="",X=!1,q=!1,S=!1,A=null;function O(){let g=t.queueStore?.get();return jt(g)?g.runner_catalog:null}function w(){let g=t.queueStore?.get();return jt(g)&&jt(g.execution_defaults)?g.execution_defaults:null}function W(){let g=t.implPresetStore?.get();return jt(g)&&Array.isArray(g.presets)?g:null}async function ne(){E=!0,Ie();try{let g=await r("get-session-defaults",{});p=jt(g?.values)?{...g.values}:{},f={...p},b=Array.isArray(g?.warnings)?g.warnings:[]}catch(g){b=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${g instanceof Error?g.message:String(g)}`)}finally{E=!1,Ie()}}async function ce(){let g=nc(p,f);if(Object.keys(g).length!==0){try{let x=await r("set-session-defaults",{values:g});p=jt(x?.values)?{...x.values}:{},f={...p},b=Array.isArray(x?.warnings)?x.warnings:[]}catch(x){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}Ie()}}function N(g,x){x===Ft?delete f[g]:f[g]=x,Ie(),ce()}async function P(){let g=t.queueStore?.get();if(!jt(g))return;let x={orchestration_model:g.orchestration_model??null,orchestration_effort:g.orchestration_effort??null,orchestration_speed:g.orchestration_speed??null},$=sc(x,{...x,...M});if(Object.keys($).length!==0){try{let D=await r("worker-queue-set-orchestration-defaults",{expected_revision:g.revision,values:$});if(D&&D.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}M={}}catch(D){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${D instanceof Error?D.message:String(D)}`)}Ie()}}function de(g,x){M[g]=x===Ft?null:x,Ie(),P()}async function ve(g){let x=t.queueStore?.get();if(!(!jt(x)||g<1)){try{await r("worker-queue-set-slots",{expected_revision:x.revision,slots:g})}catch($){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}Ie()}}function we(){let g={},x=We();for(let $ of ec){let D=Cr.includes($)?x[$]:f[$];typeof D=="string"&&D.length>0&&(g[$]=D)}return g}async function Fe(){let g=W();if(!g)return;let x=we();if(Object.keys(x).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let $=(g.presets||[]).find(V=>V.id===B),D=J.trim()||($?$.name:"");if(!D){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let V=$?await r("impl-preset-update",{expected_revision:g.revision,id:$.id,name:D,settings:x}):await r("impl-preset-create",{expected_revision:g.revision,name:D,settings:x});if(V&&V.applied){if(J="",!$&&Array.isArray(V.presets)){let Y=V.presets.find(le=>le.name===D);B=Y?Y.id:B}Ie()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ie()}catch(V){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}}async function rt(){let g=W();if(!(!g||B.length===0))try{let x=await r("impl-preset-delete",{expected_revision:g.revision,id:B});x&&x.applied?(B="",Ie()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ie())}catch(x){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}}async function Ue(){let g=W(),x=t.queueStore?.get();if(!(!g||!jt(x)||B.length===0)){try{let $=await r("apply-impl-preset-global",{preset_id:B,expected_revision:g.revision,expected_queue_revision:x.revision});$&&$.applied?(p=jt($.values)?{...$.values}:{},f={...p},b=Array.isArray($.warnings)?$.warnings:[],jt($.queue)&&(t.queueStore?.set?.($.queue),M={}),$.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694")):$&&$.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch($){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}Ie()}}async function fe(){q=!0,S=!1,Ie();try{let g=await r("get-worker-system-prompt",{});!g||typeof g!="object"||Array.isArray(g)?S=!0:A=g}catch{S=!0}finally{q=!1,Ie()}}function Le(){if(X=!X,X&&!A){fe();return}Ie()}function ge(){let g=dn({loading:q,error:S});if(g)return g;if(!A)return"";let x=Array.isArray(A.variants)?A.variants:[];return i`<div class="settings-dialog__sp-body">
      ${A.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${A.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${x.map($=>i`<div class="settings-dialog__sp-variant" data-variant=${$.key}>
            <div class="settings-dialog__sp-cond">${$.condition}</div>
            ${hr($.label,$.system_prompt)}
          </div>`)}
    </div>`}function $e(){return i`<section
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
        aria-expanded=${X?"true":"false"}
        @click=${Le}
      >
        ${X?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${X?ge():""}
    </section>`}function Re(g,x,$,D,V,Y,le){let ue=V[g]??Ft,De=aa(g,$,V,w(),O(),le),be=De.options.find(Ae=>Ae.value===ue),Ne=ue===Ft?De.full_value:be?.full_value;return i`<select
        class=${ue===Ft?"settings-dialog__unset":""}
        data-key=${g}
        aria-label=${x}
        title=${Ne||""}
        ?disabled=${Y===!0||De.disabled}
        .value=${zr(String(ue))}
        @change=${Ae=>D(g,String(Ae.target.value))}
      >
        <option value=${Ft} ?selected=${ue===Ft}>
          ${De.unset_label}
        </option>
        ${De.options.map(Ae=>i`<option
              value=${Ae.value}
              title=${Ae.full_value||""}
              ?selected=${Ae.value===ue}
            >
              ${Ae.label}
            </option>`)}
      </select>
      ${ue===Ft?i`<span class="settings-dialog__source-badge">기본</span>`:""}`}function je(g,x,$,D,V,Y=!1,le){return i`<div
      class=${`settings-dialog__row${Y?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${x}</span>
      <span class="settings-dialog__controls">
        ${Re(g,x,$,D,V,Y,le)}
      </span>
    </div>`}function xe(g,x,$,D,V){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${x}-on)`}
        ></i>
        ${g}
      </span>
      <span class="settings-dialog__controls">
        ${Re($,`${g} \uBAA8\uB378`,D,N,f,!1)}
        ${Re(V,`${g} effort`,Hs,N,f,!1)}
      </span>
    </div>`}function We(){let g=t.queueStore?.get(),x={};for(let $ of Cr)x[$]=Object.prototype.hasOwnProperty.call(M,$)?M[$]:jt(g)&&typeof g[$]=="string"?g[$]:null;return x}function Ze(){let g=O(),x=f.impl_runtime,$=f.impl_model,D=W(),V=t.queueStore?.get(),Y=We(),le=Gs(g,T),ue=Fn(g,void 0).filter(Se=>Se!==rr),De=pn(g,T||void 0,Y.orchestration_model||rr).filter(Se=>Se!==rr),be=jt(V)&&typeof V.slots=="number"?V.slots:2,Ne=w()?.supported===!0,Ae=aa("workflow_mode",Nn,f,w(),g);return i`
      <section
        class=${`settings-dialog__pane${c==="execution"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-execution"
        aria-label="실행 설정"
      >
        <header class="settings-dialog__pane-head"><h2>실행 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          세션 기본값과 Worker 오케스트레이션을 한곳에서 편집합니다. 저장소와
          저장 경로는 설정 그룹별로 유지됩니다.
        </p>
        ${b.length>0?i`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${b.join(", ")}
            </div>`:""}
        ${Ne?"":i`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${E?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="실행 프리셋"
                  .value=${zr(B)}
                  @change=${Se=>{B=String(Se.target.value),Ie()}}
                >
                  <option value="" ?selected=${B===""}>
                    실행 프리셋…
                  </option>
                  ${(D?.presets||[]).map(Se=>i`<option
                        value=${Se.id}
                        ?selected=${Se.id===B}
                      >
                        ${Se.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  data-preset-apply-global
                  ?disabled=${B.length===0}
                  @click=${Ue}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${B?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${zr(J)}
                  @input=${Se=>{J=String(Se.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${Fe}
                >
                  ${B?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${B.length===0}
                  @click=${rt}
                >
                  삭제
                </button>
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">오케스트레이션</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">런타임</span>
                  <span class="settings-dialog__controls">
                    <select
                      aria-label="런타임"
                      data-key="orchestration_runtime_filter"
                      .value=${zr(T||Ft)}
                      @change=${Se=>{let Ke=String(Se.target.value);T=Ke===Ft?null:Ke,Ie()}}
                    >
                      <option
                        value=${Ft}
                        ?selected=${!T}
                      >
                        전체
                      </option>
                      <option
                        value="claude"
                        ?selected=${T==="claude"}
                      >
                        claude
                      </option>
                      <option
                        value="codex"
                        ?selected=${T==="codex"}
                      >
                        codex
                      </option>
                    </select>
                    <span class="settings-dialog__hint"
                      >모델 목록을 좁힙니다</span
                    >
                  </span>
                </div>
                ${je("orchestration_model","\uBAA8\uB378",le,de,Y)}
                ${je("orchestration_effort","effort",De,de,Y)}
                ${je("orchestration_speed","\uC18D\uB3C4",Dn,de,Y)}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Ft}
                        aria-pressed=${String(!f.workflow_mode)}
                        @click=${()=>N("workflow_mode",Ft)}
                      >
                        ${Ae.unset_label}
                      </button>
                      ${f.workflow_mode?"":i`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${Nn.map(Se=>i`<button
                            type="button"
                            data-mode=${Se}
                            aria-pressed=${String(f.workflow_mode===Se)}
                            @click=${()=>N("workflow_mode",Se)}
                          >
                            ${Se}
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
                ${xe("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",qn,"spec_review_effort")}
                ${xe("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",zs,"plan_review_effort")}
                ${xe("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",qn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${je("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ws,N,f)}
                ${je("impl_model","\uBAA8\uB378",Fn(g,x),N,f)}
                ${je("impl_effort","effort",pn(g,x,$),N,f)}
                ${je("impl_speed","\uC18D\uB3C4",Dn,N,f)}
                ${je("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",ue,N,f,!1,{...f,...Y})}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">동시 실행</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">slots</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__stepper">
                      <button
                        type="button"
                        aria-label="slots 감소"
                        @click=${()=>ve(be-1)}
                      >
                        −
                      </button>
                      <span class="settings-dialog__stepper-value"
                        >${be}</span
                      >
                      <button
                        type="button"
                        aria-label="slots 증가"
                        @click=${()=>ve(be+1)}
                      >
                        +
                      </button>
                    </span>
                  </span>
                </div>
              </div>
              ${$e()}
            `}
      </section>
    `}function Te(){let g=n.get();return i`
      <section
        class=${`settings-dialog__pane${c==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${g?i`
              ${uu(g,s(),se)}
              ${du(g,d,{onDraft:x=>{d=x},onAdd:Oe,onRemove:ze})}
              ${pu(g,Ve)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function ot(g){let x=n.get();if(x)try{let $=await r("display-policy-set",{expected_revision:x.revision,policy:g(x)});K($),$&&$.conflict&&$.policy&&($=await r("display-policy-set",{expected_revision:$.policy.revision,policy:g($.policy)}),K($)),$&&$.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function K(g){g&&g.policy&&typeof g.policy=="object"&&n.set(g.policy)}function U(g){ot(g)}function se(g){let x=n.get();if(!x)return;let $=!Em(g,x);U(D=>Tm(g,D,$))}function Oe(){let g=d.trim();g.length!==0&&(d="",U(x=>x.hidden_prefixes.includes(g)?{hidden_prefixes:x.hidden_prefixes}:{hidden_prefixes:[...x.hidden_prefixes,g]}),Ie())}function ze(g){U(x=>({hidden_prefixes:x.hidden_prefixes.filter($=>$!==g)}))}function Ve(g){let x=n.get();if(!x)return;let $=x.chips[g]===!1;U(()=>({chips:{[g]:$}}))}function Ie(){Je(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Sm.map(g=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${g.id}
                  aria-selected=${String(c===g.id)}
                  aria-controls=${`settings-pane-${g.id}`}
                  @click=${()=>lt(g.id)}
                >
                  <span class="settings-dialog__glyph">${g.glyph}</span>
                  ${g.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${pe}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${Ze()} ${Te()}
          </div>
        </div>
      `,a)}function lt(g){c=g,Ie()}let Xe=()=>{u=!1,t.onOpenChange?.(!1)};a.addEventListener("close",Xe),a.addEventListener("cancel",Xe);let G=g=>{g.target===a&&pe()};a.addEventListener("click",G);let ee=null;n.subscribe&&(ee=n.subscribe(()=>{u&&Ie()}));let Me=null;t.implPresetStore?.subscribe&&(Me=t.implPresetStore.subscribe(()=>{u&&Ie()}));function He(g="execution"){u||(u=!0,t.onOpenChange?.(!0),c=g,d="",M={},Ie(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),ne())}function pe(){u&&(u=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:He,close:pe,sessionDraft:()=>({...f}),destroy(){u=!1,a.removeEventListener("close",Xe),a.removeEventListener("cancel",Xe),a.removeEventListener("click",G),ee&&(ee(),ee=null),Me&&(Me(),Me=null),a.remove()}}}function Em(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function Tm(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Cm=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],_u="usage-meter-card",mu=600,Rm=["token_expired","relogin_required"];function gu(e){return String(e).padStart(2,"0")}function Im(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Lm(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${gu(n.getHours())}:${gu(n.getMinutes())}`,c=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Cm[n.getMonth()]} ${n.getDate()} ${o}`;return`${Im(r,t)} \xB7 ${c}`}function Om(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function bu(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function hu(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var yu=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function wu(e){let t=[];for(let r of e){if(!r||typeof r!="object")continue;let n=r;typeof n.key!="string"||n.key.length===0||typeof n.pct!="number"||!Number.isFinite(n.pct)||t.push({key:n.key,pct:n.pct,resetsAt:typeof n.resetsAt=="string"?n.resetsAt:""})}return t}function Mm(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:wu(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Pm(e){if(!e||typeof e!="object")return null;let t=e,r=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=Mm(s);o&&r.push(o)}let n=t.available===!0&&Array.isArray(t.windows);return!n&&r.length===0?null:{available:n,windows:n?wu(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:r}}function vu(e,t){return`${e}:${t}`}function ku(e){let t=!1,r=null,n=new Map,s=null,o=new Map,a=new Map,c=0;function u(){Je(i``,e),e.hidden=!0}function d(N){r!==N&&(r===null&&(document.addEventListener("mousedown",f),document.addEventListener("keydown",b)),r=N)}function p(){r!==null&&(r=null,document.removeEventListener("mousedown",f),document.removeEventListener("keydown",b))}function f(N){let P=N.target;P&&e.contains(P)||(p(),W())}function b(N){N.key==="Escape"&&(p(),W())}function E(N){r===N?p():d(N),W()}function T(){p(),W()}async function M(N,P){if(n.has(N.key))return;let de=vu(N.key,P);n.set(N.key,P),a.delete(de),W();let ve=null;try{ve=await(await fetch(N.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:P})})).json()}catch{ve=null}if(t)return;if(n.delete(N.key),!ve||ve.ok!==!0){let Fe=ve&&typeof ve.error=="string"&&ve.error.length>0?ve.error:"network_error";a.set(de,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${Fe}`}),W();return}let we=Array.isArray(ve.warnings)?ve.warnings.filter(Fe=>typeof Fe=="string"&&Fe.length>0):[];we.length>0&&a.set(de,{kind:"warn",text:we.join(" \xB7 ")}),W(),await ce()}function B(N,P,de,ve){let we=hu(N.pct),rt=`resets ${Lm(N.resetsAt,ve)}${P?` \xB7 ${de}`:""}`;return i`<span
      class="usage-meter__window ${bu(we)}"
      style=${`--progress: ${we}%`}
      title=${rt}
    >
      <span class="usage-meter__label">${N.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${we}%</span>
    </span>`}function J(N,P,de){let ve=P.available&&typeof P.ageSeconds=="number"&&P.ageSeconds>mu,we=ve&&typeof P.ageSeconds=="number"?`${Math.floor(P.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",Fe=P.accounts.filter(Le=>!Le.active).length,rt=`usage-meter__group${ve?" usage-meter__group--stale":""}`,Ue=i`<span class="usage-meter__provider"
        >${N.label}</span
      >
      ${P.available?P.windows.map(Le=>B(Le,ve,we,de)):i`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Fe>0?i`<span class="usage-meter__badge">+${Fe}</span>`:""}`;if(P.accounts.length===0)return i`<span
        class=${rt}
        aria-label=${`${N.label} usage`}
        >${Ue}</span
      >`;let fe=r===N.key;return i`<button
      type="button"
      class=${`usage-meter__toggle ${rt}`}
      aria-label=${`${N.label} usage`}
      aria-expanded=${fe?"true":"false"}
      aria-controls=${_u}
      @click=${()=>E(N.key)}
    >
      ${Ue}
    </button>`}function X(N,P){return i`<span class="usage-meter" aria-label="Usage">
      ${N.map(de=>J(de.provider,de.snapshot,P))}
    </span>`}function q(N){let P=hu(N.pct);return i`<span
      class="usage-meter__account-window ${bu(P)}"
      style=${`--progress: ${P}%`}
    >
      <span class="usage-meter__account-key">${N.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${P}%</span>
    </span>`}function S(N,P){return Rm.includes(P)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${N.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function A(N,P){let de=P.status==="ok",ve=typeof P.ageSeconds=="number"&&P.ageSeconds>mu,we=a.get(vu(N.key,P.number)),Fe=n.get(N.key),rt=Fe!==void 0,Ue=Fe===P.number,fe=["usage-meter__account"];return P.active&&fe.push("usage-meter__account--active"),de||fe.push("usage-meter__account--unavailable"),ve&&fe.push("usage-meter__account--stale"),i`<div class=${fe.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${P.email}
          >${P.alias===null?P.email:P.alias}</span
        >
        ${P.plan===null?"":i`<span class="usage-meter__account-tag">${P.plan}</span>`}
        ${P.active?i`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${P.ageSeconds===null?"":i`<span class="usage-meter__account-age"
              >${Om(P.ageSeconds)}</span
            >`}
        ${P.active?"":i`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${rt}
              @click=${()=>{M(N,P.number)}}
            >
              ${Ue?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${de?i`<div class="usage-meter__account-windows">
            ${P.windows.map(Le=>q(Le))}
          </div>`:i`<div class="usage-meter__account-status">
            ${S(N,P.status)}
          </div>`}
      ${we===void 0?"":i`<div
            class="usage-meter__account-message usage-meter__account-message--${we.kind}"
          >
            ${we.text}
          </div>`}
    </div>`}function O(N,P){let de=P.accounts.filter(ve=>ve.active).length;return i`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${N.label} · 활성 ${de} / 전체
        ${P.accounts.length}
      </h2>
      ${P.accounts.map(ve=>A(N,ve))}
    </section>`}function w(N){return i`<div
      class="usage-meter__card"
      id=${_u}
      role="dialog"
      aria-label=${`${N.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${O(N.provider,N.snapshot)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function W(){let N=[];for(let ve of yu){let we=o.get(ve.key);we&&N.push({provider:ve,snapshot:we})}if(N.length===0){p(),u();return}let P=N.find(ve=>ve.provider.key===r&&ve.snapshot.accounts.length>0);P||p();let de=Date.now();Je(i`${X(N,de)}
      ${P?i`<div
              class="usage-meter__scrim"
              aria-hidden="true"
              @mousedown=${T}
            ></div>
            ${w(P)}`:""}`,e),e.hidden=!1}async function ne(N){try{let P=await fetch(N.endpoint);return P.ok?Pm(await P.json()):null}catch{return null}}async function ce(){c+=1;let N=c,P=await Promise.all(yu.map(async de=>({provider:de,snapshot:await ne(de)})));if(!(t||N!==c)){for(let de of P)de.snapshot?o.set(de.provider.key,de.snapshot):o.delete(de.provider.key);W()}}return u(),ce(),s=setInterval(()=>{ce()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),p(),u()}}}function $u(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),c=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!c&&typeof s.dismissed_at!="number"}}var Dm="worker-ineligible";function Ta(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function xu(e){return Ta(e).includes(Dm)}var Nm="worker-serial";function Ca(e){return Ta(e).includes(Nm)}function Ra(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var qm=new Set(["done","failed","orphaned","stopped","discarded"]),Fm={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},jm={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Bm={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Ia(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Bm[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Au(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,c=document.createElement("dialog");c.id="worker-parallel-analysis-dialog",c.className="pa",c.setAttribute("role","dialog"),c.setAttribute("aria-modal","true"),e.appendChild(c);let u=new Map,d=new Map,p=!1,f=null,b=null,E=null,T=new Set,M=!1,B=0,J=null,X=new Set;function q(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function S(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function A(){return o&&o()||""}async function O(){if(!s)return;let k=++B;M=!0,E=null,T.clear(),be();try{let I=await s("worker-parallel-analysis-targets",{root_dir:A()});if(k!==B||!Ne)return;let F=Array.isArray(I?.qualified)?I.qualified:[],Q=Array.isArray(I?.excluded)?I.excluded:[];E={qualified:F,excluded:Q};for(let ke of F)ke&&typeof ke.id=="string"&&T.add(ke.id)}catch{k===B&&Ne&&(E={qualified:[],excluded:[]},ae("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{k===B&&(M=!1,Ne&&be())}}function w(k){return Array.isArray(k.runs)?k.runs:[]}function W(){let k=q(),I=new Set;for(let F of Object.values(k.attempts||{})){let Q=F;Q&&typeof Q.bead_id=="string"&&!qm.has(Q.status)&&I.add(Q.bead_id)}for(let F of Array.isArray(k.pr_wait)?k.pr_wait:[])F&&typeof F.bead_id=="string"&&I.add(F.bead_id);for(let F of Object.values(k.discard_operations||{})){let Q=F;Q&&Q.phase!=="done"&&typeof Q.bead_id=="string"&&I.add(Q.bead_id)}return I}function ne(k){return k.filter(I=>ce(I)===null)}function ce(k){let I=q();for(let F of Array.isArray(I.serial_lanes)?I.serial_lanes:[])if(Array.isArray(F?.entries)&&F.entries.some(Q=>Q.bead_id===k))return F.id;return(Array.isArray(I.queue)?I.queue:[]).some(F=>F.bead_id===k)?"parallel":null}function N(k,I){let F=u.get(k);return F||[...I.order]}function P(k){if(k.length<2)return!1;let I=ce(k[0]);if(!I||I==="parallel")return!1;let F=q(),Q=(Array.isArray(F.serial_lanes)?F.serial_lanes:[]).find(Z=>Z.id===I)?.entries.map(Z=>Z.bead_id);if(!Array.isArray(Q))return!1;let ke=k.map(Z=>Q.indexOf(Z));return ke.every(Z=>Z>=0)&&ke.every((Z,Ee)=>Ee===0||Z>ke[Ee-1])}function de(){let k=q(),I=Array.isArray(k.serial_lanes)?k.serial_lanes:[],F=I.find(Q=>Array.isArray(Q.entries)&&Q.entries.length===0);return F?F.id:I[0]?.id||"s1"}function ve(k){let I=q().bead_titles||{};return typeof I[k]=="string"?I[k]:k}async function we(k,I){if(!s||p)return null;p=!0,be();try{return await s(k,I)}finally{p=!1,be()}}async function Fe(k){n?.setPending?.(!0);try{let I=await we("worker-parallel-analysis-start",{force:k,target_ids:Array.from(T)});I&&I.applied===!1&&I.reason&&(I.reason==="target_not_qualified"&&Array.isArray(I.detail)?ae(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${I.detail.join(", ")}`,"error",3200):ae(`\uBD84\uC11D \uC2E4\uD328: ${I.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function rt(){let k=S().job;!s||!k||await s("worker-parallel-analysis-cancel",{job_id:k.job_id})}async function Ue(k){if(!(!s||X.has(k))){X.add(k),be();try{let I=await s("worker-parallel-analysis-prompt",{root_dir:A(),run_id:k});if(!Ne)return;if(I?.ok===!0&&typeof I.prompt=="string"){J={run_id:k,prompt:I.prompt};return}ae(I?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{X.delete(k),be()}}}function fe(){J=null,be()}async function Le(){if(!J)return;let k=await Xt(J.prompt);ae(k?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",k?"success":"error",1400)}function ge(k,I){a&&a(k,Ia(I))}function $e(){return q().runner_catalog}function Re(k){return Object.keys($e()?.runners?.[k]?.models||{})}function je(k){let I=Re(k),F=$e()?.runners?.[k]?.default_model;return typeof F=="string"&&I.includes(F)?F:I[0]||""}function xe(){let k=S().settings,I=f||k.runner||"claude",F=Re(I),Q=f?je(I):k.model||F[0]||"",ke=Ra($e(),I,Q),Z=k.effort||"",Ee=ke.includes(Z)?Z:ke[0]||"";return{runner:I,model:Q,effort:Ee,models:F,efforts:ke}}async function We(k){let I=S().settings,F=await we("worker-parallel-analysis-settings-update",{expected_revision:I.revision,runner:k.runner,model:k.model,effort:k.effort});(!F||F.applied!==!0)&&(f=null,be(),F&&F.reason&&ae(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${F.reason}`,"error",2800))}function Ze(k){f=k,be();let I=xe();We({runner:k,model:I.model,effort:I.effort})}function Te(k){let I=xe(),F=Ra($e(),I.runner,k);We({runner:I.runner,model:k,effort:F.includes(I.effort)?I.effort:F[0]||""})}function ot(k){let I=xe();We({runner:I.runner,model:I.model,effort:k})}async function K(k,I){if(!s||p)return;let F=N(k,I),Q=S();if(F.length<2||!Q.last_good){ae("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let ke=d.get(k)||de(),Z=()=>({snapshot_digest:Q.last_good.identity_digest,group_index:k,lane:ke,ordered_bead_ids:F,expected_revision:q().revision});p=!0,be();try{let Ee=await s("worker-parallel-analysis-submit",Z());Ee&&Ee.queue&&r&&r.set(Ee.queue),Ee&&Ee.applied!==!0&&Ee.conflict===!0&&(Ee=await s("worker-parallel-analysis-submit",Z()),Ee&&Ee.queue&&r&&r.set(Ee.queue)),Ee&&Ee.applied===!0?(u.delete(k),ae(`\uC9C1\uB82C \uB808\uC778 ${ke}\uC5D0 ${F.length}\uAC1C \uBC30\uCE58`,"success")):ae(`\uC81C\uCD9C \uAC70\uBD80: ${Ee?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,be()}}function U(k,I,F){u.set(k,N(k,I).filter(Q=>Q!==F)),be()}function se(k){u.delete(k),be()}function Oe(k,I,F,Q){let ke=[...N(k,I)],Z=ke.indexOf(F),Ee=Z+Q;Z<0||Ee<0||Ee>=ke.length||(ke.splice(Ee,0,...ke.splice(Z,1)),u.set(k,ke),be())}function ze(){let k=S().settings,I=Object.keys($e()?.runners||{}),F=xe();return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${Q=>Ze(Q.target.value)}
        >
          ${I.map(Q=>i`<option
                value=${Q}
                ?selected=${F.runner===Q}
              >
                ${Q}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${Q=>Te(Q.target.value)}
        >
          ${F.models.map(Q=>i`<option
                value=${Q}
                ?selected=${F.model===Q}
              >
                ${Q}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${Q=>ot(Q.target.value)}
        >
          ${F.efforts.map(Q=>i`<option
                value=${Q}
                ?selected=${F.effort===Q}
              >
                ${Q}
              </option>`)}
        </select>
      </label>
      ${Ve(k)}
    </div>`}function Ve(k){return!lt(k)||Ie(k)?i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:k.compatible===!1?i`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${k.runner}/${k.model} · effort
        ${k.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:k.is_default===!0?i`<span class="pa-settings__default">기본값</span>`:""}function Ie(k){return k.is_default===!0&&k.compatible===!1}function lt(k){return!!(k.runner&&k.model&&k.effort)}function Xe(k){return lt(k)&&k.compatible!==!1}function G(k){let I=Math.max(0,Math.floor(k/1e3)),F=Math.floor(I/60),Q=I%60;return`${F}:${String(Q).padStart(2,"0")}`}function ee(k){let I=k.job;if(I){let F=typeof I.started_at=="number"?I.started_at:0,Q=`${I.runner||"?"}/${I.model||"?"}`,ke=F?` \xB7 \uACBD\uACFC ${G(Date.now()-F)}`:"",Z=typeof I.session_id=="string"?I.session_id:"",Ee=w(k).find(Ce=>Ce.run_id===I.job_id);return i`<span class="pa-meta__progress">
        <span
          >분석 중 — ${Q} · effort ${I.effort||"?"}${ke}</span
        >
        ${Z?i`<code class="pa-session-id" title=${Z}
              >${Z.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>ge(I.job_id,Ee||I)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${Ee?.prompt_saved!==!0||X.has(I.job_id)}
          @click=${()=>{Ue(I.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Me()?i`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Me(){return n?.isPending?.()===!0}function He(k){let I=!!k.job,F=Xe(k.settings),Q=E!==null&&T.size===0,ke=I||p||Me()||M;return i`<div class="pa-meta">
      ${k.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(k.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${ee(k)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!F||ke||Q}
        @click=${()=>{Fe(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!F||ke||Q}
        @click=${()=>{Fe(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!I}
        @click=${()=>{rt()}}
      >
        취소
      </button>
    </div>`}function pe(k){return typeof k=="string"&&k.length>0?k:"\uBBF8\uBC30\uCE58"}function g(k,I){I?T.add(k):T.delete(k),be()}function x(k){let I=Array.isArray(k.scope)?k.scope:[],F=Array.isArray(k.overlaps)?k.overlaps:[];return I.length===0&&F.length===0?i``:i`<span class="pa-target__signals">
      ${I.length>0?i`<details class="pa-target__scope" title=${I.join(`
`)}>
            <summary>scope ${I.length}</summary>
            <ul>
              ${I.map(Q=>i`<li><code>${Q}</code></li>`)}
            </ul>
          </details>`:""}
      ${F.length>0?i`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${F.join(", ")}`}
            >겹침 ${F.join(", ")}</span
          >`:""}
    </span>`}function $(){let k=E?.qualified||[],I=E?.excluded||[];return i`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${M?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${k.length} \xB7 \uC81C\uC678 ${I.length}`}</span
        >
      </header>
      ${E&&k.length>0?i`<ul class="pa-targets__list">
            ${k.map(F=>i`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${F.id}
                      .checked=${T.has(F.id)}
                      @change=${Q=>g(F.id,Q.target.checked)}
                    />
                    <span class="pa-target__title">${F.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${x(F)}
                    <span class="pa-target__route">${F.route}</span>
                    <span class="pa-target__lane"
                      >${pe(F.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:E&&k.length===0?i`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${E&&I.length>0?i`<details class="pa-targets__excluded">
            <summary>제외 대상 ${I.length}</summary>
            <ul class="pa-targets__list">
              ${I.map(F=>i`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${F.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Fm[F.reason]||F.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${pe(F.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function D(k){let I=typeof k.session_id=="string"&&k.session_id.length>0,F=I?k.session_id:"";return i`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${k.outcome}"
        >${jm[k.outcome]||k.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(k.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${k.runner||"?"} / ${k.model||"?"} / ${k.effort||"?"}</span
      >
      ${I?i`<code class="pa-session-id" title=${F}
            >${F.slice(0,8)}</code
          >`:i`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${k.outcome==="failure"&&k.reason?i`<span class="pa-run-row__reason">${k.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>ge(k.run_id,k)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${k.prompt_saved!==!0||X.has(k.run_id)}
          @click=${()=>{Ue(k.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function V(k){return i`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${k.length>0?i`<ul class="pa-runs__list">
            ${k.map(I=>D(I))}
          </ul>`:i`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function Y(){return J?i`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${fe}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${J.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{Le()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${fe}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${J.prompt}</pre
        >
      </section>
    </div>`:""}function le(k,I){let F=N(k,I),Q=W(),ke=F.filter(nt=>Q.has(nt)),Z=ne(F),Ee=P(F),Ce=Array.isArray(q().serial_lanes)?q().serial_lanes:[],mt=d.get(k)||de(),Et=I.eligible!==!0||F.length<2||ke.length>0||Z.length>0||Ee||p;return i`<section class="pa-group" data-group-index=${String(k)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${I.confidence}</span>
        ${I.categories.map(nt=>i`<span class="pa-group__category">${nt}</span>`)}
        ${Ee?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${I.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${Z.length>0?i`<span class="pa-group__stale"
              >stale — ${Z.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${I.reason}</p>
      <ol class="pa-group__members">
        ${F.map((nt,vt)=>i`<li class="pa-member" data-bead-id=${nt}>
              <span class="pa-member__seq">${vt+1}</span>
              <span class="pa-member__title">${ve(nt)}</span>
              ${Q.has(nt)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${nt}
                ?disabled=${vt===0}
                aria-label=${`${nt} \uC704\uB85C`}
                @click=${()=>Oe(k,I,nt,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${nt}
                ?disabled=${vt===F.length-1}
                aria-label=${`${nt} \uC544\uB798\uB85C`}
                @click=${()=>Oe(k,I,nt,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${nt}
                aria-label=${`${nt} \uC81C\uC678`}
                @click=${()=>U(k,I,nt)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${I.evidence.map(nt=>i`<li class="pa-evidence">
              <code>${nt.path}</code>
              <span class="pa-evidence__locator">${nt.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>se(k)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${nt=>{d.set(k,nt.target.value),be()}}
          >
            ${Ce.map((nt,vt)=>i`<option
                  value=${nt.id}
                  ?selected=${mt===nt.id}
                >
                  직렬 ${vt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Et}
          @click=${()=>{K(k,I)}}
        >
          제출
        </button>
      </footer>
    </section>`}function ue(k){let I=Array.isArray(k.issues)?k.issues:[],F=I.filter(ke=>ke.verdict==="parallel_ok").length,Q=I.filter(ke=>ke.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${F}</span>
      <span>uncertain ${Q}</span>
    </div>`}function De(){let k=Ne&&!!S().job;if(k&&b===null){b=setInterval(()=>be(),1e3);return}!k&&b!==null&&(clearInterval(b),b=null)}function be(){let k=S();f&&k.settings.runner===f&&(f=null);let I=k.last_good?.result;De(),Je(i`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${me}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${ze()} ${He(k)} ${$()}
            ${I?i`${I.groups.map((F,Q)=>le(Q,F))}
                ${I.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${ue(I)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${V(w(k))}
          </div>
        </div>
        ${Y()}
      `,c)}let Ne=!1,Ae=()=>{Ne=!1,J=null,B+=1,De()},Se=k=>{k.target===k.currentTarget&&me()};c.addEventListener("close",Ae),c.addEventListener("cancel",Ae),c.addEventListener("click",Se);let Ke=null;r&&r.subscribe&&(Ke=r.subscribe(()=>{Ne&&be()}));let z=null;n&&n.subscribe&&(z=n.subscribe(()=>{Ne&&be()}));function te(){Ne||(Ne=!0,be(),O(),typeof c.showModal=="function"?c.showModal():c.setAttribute("open",""))}function me(){Ne&&(Ne=!1,J=null,B+=1,De(),typeof c.close=="function"?c.close():c.removeAttribute("open"))}return{open:te,close:me,destroy(){Ne=!1,b!==null&&(clearInterval(b),b=null),c.removeEventListener("close",Ae),c.removeEventListener("cancel",Ae),c.removeEventListener("click",Se),Ke&&(Ke(),Ke=null),z&&(z(),z=null),c.remove()}}}var Su=new Set(["sh","bash","zsh","dash","ksh"]),Eu=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Tu(e){let t=e.split("/");return t[t.length-1]||""}function Um(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=Tu(r[0]);if(n!=="env")return Su.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Su.has(Tu(s))}function Wm(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function zm(e){let t=[],r=0;Eu.lastIndex=0;for(let n of e.matchAll(Eu)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:Wm(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Hm(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Cu(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",c="",u=0,d=null,p=!1;function f(A,O){return O?zm(A).map(w=>w.kind==="plain"?w.text:i`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${w.kind}"
            >${w.text}</span
          >`):A}function b(){if(!s)return i``;let A=o==="ready"&&Um(a),O=o==="ready"?a.split(`
`):[];return i`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>q()}
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
              @click=${()=>{T()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>q()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?i`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?i`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${c}
                </div>`:i`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${O.map((w,W)=>i`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${W+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(w,A)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function E(){Je(b(),n)}async function T(){if(o!=="ready")return;let A=await Xt(a);ae(A?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",A?"success":"error")}function M(A){A.key==="Escape"&&s&&(A.preventDefault(),q())}function B(){p||(document.addEventListener("keydown",M),p=!0)}function J(){p&&(document.removeEventListener("keydown",M),p=!1)}async function X(A,O=null){let w=++u;B(),s={...A},d=O||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",c="",E(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let ne=t?t():"";if(!ne){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",E();return}if(!r){o="error",c="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",E();return}let ce="/api/repo-ops-script?workspace="+encodeURIComponent(ne)+"&lane="+encodeURIComponent(A.lane)+"&base_sha="+encodeURIComponent(A.base_sha);try{let N=await r(ce),P=await N.json().catch(()=>({}));if(w!==u)return;if((t?t():"")!==ne){q();return}if(!N.ok||!P||P.ok!==!0){o="error",c=Hm(P&&typeof P.error=="string"?P.error:""),E();return}s={lane:P.lane,base_sha:P.base_sha,path:P.path,base_ref:P.base_ref},a=String(P.content),o="ready",E()}catch{if(w!==u)return;o="error",c="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",E()}}function q(){u+=1,J(),s=null,a="",E();let A=d;d=null,A?.isConnected&&A.focus()}function S(){q(),n.remove()}return{open:X,close:q,destroy:S}}function Ru(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let S=o();return typeof S.revision=="number"?S.revision:0}function c(S){t&&S&&S.queue&&typeof S.queue=="object"&&t.set(S.queue)}function u(){let S=o().workspace_info;return S&&typeof S=="object"?S:{}}function d(S,A){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${S}"
      >${A}</span
    >`}function p(S){if(typeof S!="number"||!Number.isFinite(S))return"";let A=S/6e4;return Number.isInteger(A)?`timeout ${A}\uBD84`:`timeout ${Math.round(S/1e3)}\uCD08`}function f(S){let A=p(S);return A?d("config",A):""}function b(S,A,O){return i`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${O.script}
      @click=${w=>{s&&s({lane:S,base_sha:A.base_sha,path:O.script,base_ref:A.base_ref},w.currentTarget)}}
    ></button>`}function E(S){let A=typeof S.base_sha=="string"?S.base_sha:"",O=`${S.source_path||"repo-ops/config.toml"} @ ${S.base_ref||"?"}${A?`@${A.slice(0,7)}`:""}`;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${O}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${S.verify?i`${b("verify",S,S.verify)}
              ${f(S.verify.timeout_ms)}`:i`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${S.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${S.deploy?i`${b("deploy",S,S.deploy)}
              ${f(S.deploy.timeout_ms)}`:i`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${S.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function T(S){let A=S.repo_ops&&typeof S.repo_ops=="object"?S.repo_ops:null;return A&&(A.status==="resolved"||A.status==="absent")?E(A):A&&(A.status==="pending"||A.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${A.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${A.error_code?i` — <code>${A.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function M(S){if(!r)return;let A=await r("worker-auto-repair-toggle",{on:S,expected_revision:a()});if(c(A),A&&A.conflict){let O=await r("worker-auto-repair-toggle",{on:S,expected_revision:a()});c(O)}n()}let B={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function J(S,A,O){return i`<div class="worker-repo-ops__policy-group" data-policy=${O}>
      <div class="worker-repo-ops__policy-label">${S}</div>
      <ul class="worker-repo-ops__policy-list">
        ${A.map(w=>i`<li data-token=${w}>
              ${B[w]||w}
            </li>`)}
      </ul>
    </div>`}function X(S){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${S.map(A=>{let O=[B[A.trigger]||A.trigger];return Number.isInteger(A.attempts_per_operation_attempt)?O.push(`operation\uB2F9 ${A.attempts_per_operation_attempt}\uD68C`):Number.isInteger(A.attempts)?O.push(`${B[A.budget]||A.budget} ${A.attempts}\uD68C`):Number.isInteger(A.sessions_per_user_action)&&O.push(`${A.sessions_per_user_action}\uD68C`,B[A.user_actions]||A.user_actions),A.applies_when&&O.push(B[A.applies_when]||A.applies_when),i`<li data-token=${A.id}>
            <strong>${B[A.id]||A.id}</strong>
            <span>${O.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function q(){let S=o(),A=S.auto_repair!==!1,O=S.repo_operation_policy&&typeof S.repo_operation_policy=="object"?S.repo_operation_policy:null,w=Array.isArray(S.repo_operations)?S.repo_operations:[],W=w.find(P=>P.state==="repairing"),ne=w.filter(P=>P.state==="failed"||P.state==="repairing"),ce=ne.length?Math.min(...ne.map(P=>typeof P.repair?.remaining=="number"?P.repair.remaining:0)):O?.auto_repair?.resolution_ladder?.find(P=>P.id==="auto_repair_session")?.attempts??1,N=Array.isArray(O?.auto_repair?.resolution_ladder)?O.auto_repair.resolution_ladder:[];return i`<section
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
          .checked=${A}
          @change=${P=>{M(P.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${A?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${ce}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${W?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${W.repair?.owner_bead||W.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${O?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(O.worker_automatic||[]).length} · 해결 사다리
                ${N.length} · 금지
                ${(O.never_automatic||[]).length}</span
              >
            </summary>
            ${J("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",O.worker_automatic||[],"worker-automatic")}
            ${O.supported===!1||O.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${O.schema_version})`}
                </div>`:X(N)}
            ${J("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",O.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${T(u())} ${q()}
      </details>`}}}var Gm=20,Iu={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Lu={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Vm(e,t,r=Gm){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Ou(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Km(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Mu(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Pu(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function Ym(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Lu,n)?Lu[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${r}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?i`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":i`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function Zm(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?$t(e.at):""}
      >${Xs(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Ou(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Iu,t.kind)?Iu[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Ys(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Zs(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Ou(e)}"
          >${Km(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Pu(Dc(t.failure_kind,n)):""}
      ${Ym(t)}
      ${Mu([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Ys(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Xm(e){let t=e.cleanup,r=Hr(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?$t(e.at):""}
      >${Xs(e.at)||"\u2014"}</span
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
        ${Ic(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Pu(ro(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?i`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${Mu([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Qm(e){return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?i`<div class="worker-repo-drawer__empty">기록 없음</div>`:i`<ul class="worker-rail">
          ${e.events.map(t=>t.type==="cleanup"?Xm(t):Zm(t))}
        </ul>`}
  </section>`}function Du(e,t={}){let r=null;function n(){Je(r?Qm(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:Vm(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var Jm="tab:worker:ready",eg="tab:worker:blocked",tg="tab:worker:in-progress",rg="tab:worker:closed",oo=1,Nu=5;function qu(e){return js(e).path.length>0}var Uu="beads-ui.worker.candidate-filter",La={show_blocked:!1,spec:"all"};function ng(){try{let e=window.localStorage.getItem(Uu);if(!e)return{...La};let t=JSON.parse(e);if(!t||typeof t!="object")return{...La};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...La}}}function sg(e){try{window.localStorage.setItem(Uu,JSON.stringify(e))}catch{}}function og(e,t){let r=c=>t.show_blocked||!c.blocked,n=c=>t.spec==="all"||(t.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,a=0;for(let c of e){let u=r(c),d=n(c);u&&d?s.push(c):!u&&d?o+=1:u&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var ag=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Wu="bdui.worker.candidate_sort",ig=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],ao="spec";function lg(){try{let e=window.localStorage.getItem(Wu);return e==="board"||e==="created"||e==="spec"?e:ao}catch{return ao}}function cg(e){try{window.localStorage.setItem(Wu,e)}catch{}}var zu="bdui.worker.done-range";function ug(){try{let e=window.localStorage.getItem(zu);return Wt(e)?e:Nt}catch{return Nt}}function dg(e){try{window.localStorage.setItem(zu,e)}catch{}}var pg="(max-width: 640px)",Hu="beads-ui.worker.lane-collapsed",Kn={queue:!0,done:!0};function fg(){try{let e=window.localStorage.getItem(Hu);if(!e)return{...Kn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Kn}:{queue:typeof t.queue=="boolean"?t.queue:Kn.queue,done:typeof t.done=="boolean"?t.done:Kn.done}}catch{return{...Kn}}}function _g(e){try{window.localStorage.setItem(Hu,JSON.stringify(e))}catch{}}function Fu(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function mg(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Fr):(n.sort(fs(r)),t==="board"?n:[...n.filter(qu),...n.filter(s=>!qu(s))])}function gg(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function bg(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function hg(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function ju(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function yg(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function vg(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function wg(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function kg(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Oa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function $g(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Bu(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(r=>typeof r=="string"&&r.length>0):[]}function xg(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):Bu(e.receipt_check).length>0?r("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Bu(e.receipt_check).join(", ")}`,alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${ju(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${ju(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Ag(e,t,r,n,s=null,o=null,a=null,c=!1,u=null,d=!0,p=null,f=null,b=null,E={},T=!1,M=!1,B={}){let J=!!u&&u.position>0,X=!!u?.continuation_action&&u.continuation_action.continuation===null,q=!!u&&u.active===!0,S=u&&u.failure||null,A=vg(u?u.waiting:null,b),O=r[e]||null,w=O&&O.gate?O.gate:null,W=O&&O.pr?O.pr:null,ne=$g(b),ce=wg(u?u.resolution:null),N=kg(u?u.head_review:null),P=u&&u.head_review||null,de=u&&u.authority||null,ve=!!P&&["pending","reviewing","revising"].includes(P.state),we=J&&!q&&(P?.state==="failed"||!de||de.source==="automatic"&&!M),Fe=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ce?ce.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":A,rt=!!w&&w.base_badge==="\uCDA9\uB3CC",Ue=!!w&&w.enabled===!0,fe=zn({bead_id:e,merge_sha:B.merge_sha,cleanup_cursor:B.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:B.repo_operations}),Le=to(fe),ge=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!w&&w.tier==="merged",$e=c&&!!n&&!!w&&w.tier==="merged",Re=we&&(Ue||rt||w?.reason==="base_behind"||w?.reason==="review_receipt_missing"||w?.reason==="review_receipt_stale"||ge||$e),je=c&&rt&&d===!1,xe=cr(E,e,{external:c,merge_active:q||fe?.step==="merge",merge_queued:J,conflict_active:!!a,cleanup_active:Le,merged:!!n||w?.tier==="merged"}),We=!!xe.operation,Ze=!ge&&!!n&&n.step==="repo_operations",Te=xg({continuation_required:X,merge_step:fe,conflict_badge:Fe,conflict_live:ce?.live===!0||a==="running",head_review:P&&N?{...N,state:P.state,failure_reason:P.failure_reason}:null,recovery:ne,cleanup_failed:n,cleanup_label:n?Hr(n.step):null,base_exception:f,conflicting:rt,gate:w,receipt_check:O&&O.receipt_check?O.receipt_check:null,queue_failure:S,auto_skip:p,queued:J,queue_active:q,queue_position:u?u.position:0,activity:Fe?null:o&&o.activity||null}),ot=Te?.live===!0&&Te.title?i`<span title=${Te.title}>${Te.label}</span>`:Te?.label||null;return{id:e,title:c?i`${t}<span class="muted"> · 세션</span>`:t,reason:n&&fe?.active!==!0?eo(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:T,external:c,pr_number:W&&typeof W.number=="number"?W.number:null,pr_url:W&&typeof W.url=="string"?W.url:"",completion_badge:Te?.live!==!0&&Te?.title?Te.label:null,completion_title:Te?.title||"",completion_repair_pr_url:ne?ne.repair_pr_url:"",completion_repair_pr_number:ne?ne.repair_pr_number:null,badges:ot?[ot]:[],live_badge:Te?.live===!0?ot:null,usage:s,alert:Te?.alert===!0,merge_action:w?.tier==="merged"&&!ge&&!$e||Ze?!1:!J||X||we,timeline_action:Ze,cancel_action:J&&!X,cancel_enabled:(!q||ve)&&!(ne&&ne.lock_actions),cancel_title:ne&&ne.lock_actions?`${ne.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:q&&!ve?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ve?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:xe,discard_action:xe.action,merge_step:fe,discard_enabled:xe.enabled,discard_title:xe.title,merge_enabled:!fe&&!a&&!We&&!f&&!(ne&&ne.lock_actions)&&!je&&!Ze&&(Ue||rt||w?.reason==="base_behind"||w?.reason==="review_receipt_missing"||w?.reason==="review_receipt_stale"||ge||$e||Re),merge_label:X?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ge||$e?"\uC815\uB9AC \uC7AC\uAC1C":rt&&!fe&&!ge?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":w?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":w?.reason==="review_receipt_missing"||w?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":we?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:We?xe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${xe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${xe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:X?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":fe?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${fe.label}`:$e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":je?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ge?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":rt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":w?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":w?.reason==="review_receipt_missing"||w?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":w?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ue?`\uBA38\uC9C0 (${w.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:w&&w.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${w&&w.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ma(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:c,gotoIssue:u,getWorkspacePath:d,doneRange:p,onDoneRangeChange:f}=t,b=n?ms(n,c):null,E=bs({transport:r,uiOrderStore:c}),T=null,M=[],B=ng(),J=null,X=lg(),q=Wt(p)?p:ug(),S=new Map;function A(){let l=ar.find(_=>_.value===q);return l?l.label:"\uC624\uB298"}let O=fg(),w=!1,W=new Set,ne=new Set,ce=new Set,N=new Set,P=[],de=document.createElement("div");de.className="worker-console";let ve=document.createElement("div");ve.className="worker-top";let we=document.createElement("div");we.className="worker-drawer-overlay",we.hidden=!0;let Fe=document.createElement("div");Fe.className="worker-drawer-overlay__backdrop";let rt=document.createElement("div");rt.className="worker-drawer-host";let Ue=document.createElement("div");Ue.className="worker-drawer-host",Ue.hidden=!0,we.append(Fe,rt,Ue);let fe=document.createElement("div");fe.className="worker-lanes-host",de.append(ve,we,fe),e.appendChild(de);let Le=null,ge=null,$e=Fs(rt,{transport:r,sessionLogStore:a,onClose:()=>{Le=null,ge=null,we.hidden=!0,Z()}}),Re=Du(Ue,{onClose:()=>{Ue.hidden=!0,we.hidden=!0,Z()}}),je=Cu({getWorkspacePath:d||(()=>"")}),xe=d&&d()||"",We=Ru({queueStore:s,transport:r,onChanged:()=>Z(),onOpenScript:(l,_)=>{je.open(l,_)}}),Ze=o?Au(de,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:d,onOpenTranscript:(l,_)=>kr(l,_)}):null;function Te(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:oo,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ot(){let l=Te(),_=typeof l.serial_lane_count=="number"&&Number.isInteger(l.serial_lane_count)&&l.serial_lane_count>0?Math.min(l.serial_lane_count,5):0,C=Array.isArray(l.serial_lanes)?l.serial_lanes:[],H=[];for(let ye of C){if(H.length>=_)break;!ye||typeof ye.id!="string"||!/^s[1-5]$/.test(ye.id)||!Array.isArray(ye.entries)||H.push({id:ye.id,label:`\uC9C1\uB82C ${ye.id.slice(1)}`,count:ye.entries.length})}return H.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(l.queue)?l.queue:[]).length},...H]}function K(l){if(!J||!l.some(C=>C.id===J))return null;let _=ot();return _?{bead_id:J,lanes:_}:null}function U(){let l=Te();return typeof l.revision=="number"?l.revision:0}function se(l){l&&l.queue&&s&&s.set(l.queue)}function Oe(){let l=Te().queue;return Array.isArray(l)?l.length:0}async function ze(l,_,C){if(!r)return;let H=()=>({bead_id:l,..._==="parallel"?{}:{lane:_},...C===void 0?{}:{index:C},expected_revision:U()}),oe=await r("worker-queue-place",H());se(oe),oe&&oe.conflict&&await r("worker-queue-place",H()).then(se)}async function Ve(l,_,C){if(!r)return;let H=()=>({bead_id:l,..._==="parallel"?{}:{lane:_},to_index:C,expected_revision:U()}),oe=await r("worker-queue-reorder",H());se(oe),oe&&oe.conflict&&await r("worker-queue-reorder",H()).then(se)}async function Ie(l){if(!r)return;let _=await r("worker-queue-remove",{bead_id:l,expected_revision:U()});se(_),_&&_.conflict&&await r("worker-queue-remove",{bead_id:l,expected_revision:U()}).then(se)}async function lt(l){if(!r||!l)return;let _=await r("worker-attempt-pause",{attempt_id:l});_&&_.paused===!1&&_.reason&&ae(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function Xe(l){if(!r||!l)return;let _=await an();if(_===null)return;let C=async(oe={})=>await r("worker-attempt-resume",{attempt_id:l,expected_revision:U(),..._!==""?{instructions:_}:{},...oe}),H=await C();se(H),H&&H.conflict&&(H=await C(),se(H)),H=await fr(H,(oe,ye)=>C({continuation:oe,decision_token:ye}),{onResult:se,refresh:()=>C()}),H&&H.resumed===!1&&!H.conflict&&H.reason&&ae(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${H.reason}`,"error",2400)}async function G(l){if(!r||!l)return;let _=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:U()});se(_),_&&_.conflict&&(_=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:U()}),se(_)),_&&_.dismissed===!1&&!_.conflict&&_.reason&&ae(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function ee(l,_,C=!0){if(!r)return null;let H=r,oe=await H(l,{..._,expected_revision:U()});return se(oe),oe&&oe.conflict&&C&&(oe=await H(l,{..._,expected_revision:U()}),se(oe)),oe}async function Me(l){if(!r||!l)return;let _=Te().merge_queue?.find(H=>H.bead_id===l)?.continuation_action;if(_?.mismatch&&_.continuation===null){await pe(l,_.mismatch);return}W.add(l),Z();let C;try{C=await ee("worker-merge-queue-add",{bead_id:l})}finally{W.delete(l),Z()}!C||C.conflict||C.applied||ae(yg(C.reason),"error",2400)}async function He(l){if(!(!r||!l||ne.has(l))){ne.add(l),Z();try{let _=await r("worker-cleanup-retry",{bead_id:l,expected_revision:U()});se(_),_&&!_.retried&&!_.conflict&&_.reason&&ae(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${_.reason}`,"error",2400)}finally{ne.delete(l),Z()}}}async function pe(l,_){let C=await fr({continuation_mismatch:_},(oe,ye)=>ee("worker-merge-queue-add",{bead_id:l,continuation:oe,decision_token:ye},!1)),H=C?.queue?.merge_queue?.find(oe=>oe.bead_id===l)?.continuation_action;if(C?.applied!==!0&&H?.continuation===null&&H.mismatch){await pe(l,H.mismatch);return}C&&C.applied===!1&&!C.conflict&&ae("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function g(l){if(!r)return;let _=await ee("worker-merge-auto-toggle",{on:l});!_||_.conflict||ae(l?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",l?"success":"info",2400)}async function x(l){if(!r||!l)return;let _=await ee("worker-merge-queue-remove",{bead_id:l});_&&!_.conflict&&!_.applied&&_.reason==="merge_active"&&ae("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function $(){await ee("worker-merge-queue-remove",{all:!0})}async function D(l,_=null,C="unmerged",H=null){if(!r||!l)return;let oe=Bn(l,C);if(!(!!H||typeof globalThis.confirm!="function"||globalThis.confirm(oe)))return;let _e=await r("worker-discard",{bead_id:l,..._?{attempt_id:_}:{},...H?{operation_id:H}:{},expected_revision:U()});if(se(_e),_e&&_e.conflict&&(_e=await r("worker-discard",{bead_id:l,..._?{attempt_id:_}:{},...H?{operation_id:H}:{},expected_revision:U()}),se(_e)),_e&&_e.discarded===!0){ae(Qs(_e),"success",5e3);return}if(_e&&_e.reason){ae(`\uD3D0\uAE30 \uC2E4\uD328: ${_e.reason}`,"error",2800);return}if(_e&&_e.accepted&&_e.pending==="merged_revert"){ae("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(_e&&_e.accepted&&!_e.discarded){ae(`\uD3D0\uAE30 \uC9C4\uD589: ${_e.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}_e&&!_e.conflict&&ae("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function V(l,_,C){if(!(!r||!_||!C||N.has(_))){N.add(_),Z();try{let H=await r(l,{bead_id:_,action_id:C,expected_revision:U()});se(H),H?.conflict?ae("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!H?.ok&&H?.reason&&ae(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(H.reason)}`,"error",2800)}finally{N.delete(_),Z()}}}async function Y(l,_){if(!r||!_||ce.has(_))return;ce.add(_),Z();let C;try{let H=async(oe={})=>await r(l,{bead_id:_,expected_revision:U(),...oe});C=await H(),se(C),C&&C.conflict&&(C=await r(l,{bead_id:_,expected_revision:U()}),se(C)),l==="worker-revise-fix"&&(C=await fr(C,(oe,ye)=>H({continuation:oe,decision_token:ye}),{onResult:se,refresh:()=>H()}))}finally{ce.delete(_),Z()}if(!(!C||C.conflict)){if(C.ok){ae(l==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ae(`\uCC98\uBD84 \uAC70\uBD80: ${C.reason||""}`,"error",3e3)}}async function le(l){if(!r)return;let _=await r("worker-automation-toggle",{on:l,expected_revision:U()});se(_),_&&_.conflict&&await r("worker-automation-toggle",{on:l,expected_revision:U()}).then(se)}async function ue(l){if(!r||!l)return;let _=await r("worker-repo-operation-repair",{operation_id:l});if(se(_),_&&_.ok===!1){ae(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${_.reason||""}`,"error",3e3);return}_&&_.ok===!0&&ae("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function De(l){if(!r||!l)return;let _=await r("worker-repo-operation-dismiss",{operation_id:l});se(_),_&&_.ok===!1&&ae(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${_.reason||""}`,"error",3e3)}async function be(l){if(!r||!Number.isFinite(l))return;let _=Math.max(oo,Math.floor(l)),C=await r("worker-queue-set-slots",{slots:_,expected_revision:U()});se(C),C&&C.conflict&&await r("worker-queue-set-slots",{slots:_,expected_revision:U()}).then(se)}async function Ne(l){if(!r||!Number.isInteger(l)||l<1||l>Nu)return;let _=Te(),C=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).slice(l).reduce((ye,_e)=>ye+(Array.isArray(_e?.entries)?_e.entries.length:0),0),H=()=>({count:l,expected_revision:U()}),oe=await r("worker-queue-set-serial-lane-count",H());se(oe),oe&&oe.conflict&&(oe=await r("worker-queue-set-serial-lane-count",H()),se(oe)),oe&&oe.applied&&C>0&&ae(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${C}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Ae(){let l=Te(),_=b?b.selectBoardColumn(Jm,"ready"):[],C=b?b.selectBoardColumn(eg,"blocked"):[],H=b?b.selectBoardColumn(rg,"closed"):[],oe=b?b.selectBoardColumn(tg,"in_progress"):[],ye=new Map;for(let h of oe){let j=bg(h);if(!j)continue;let ie=ye.get(j);ie?ie.push(h):ye.set(j,[h])}let _e=h=>{let j=gs(ye.get(h)||[]);return j?j.title||j.id:null},et=l.bead_titles||{},y=new Map;for(let[h,j]of Object.entries(et))typeof j=="string"&&j.length>0&&y.set(h,j);for(let h of[..._,...C])y.set(h.id,h.title||h.id);let v=l.bead_times&&typeof l.bead_times=="object"&&!Array.isArray(l.bead_times)?l.bead_times:{},m=l.bead_labels&&typeof l.bead_labels=="object"&&!Array.isArray(l.bead_labels)?l.bead_labels:{},L=new Map;for(let[h,j]of Object.entries(m))Array.isArray(j)&&L.set(h,Ca(j));for(let h of[..._,...C]){let j=h.labels;Array.isArray(j)&&!L.has(h.id)&&L.set(h.id,Ca(j))}let R=new Map,re=o?.get()?.last_good?.result?.groups;for(let h of Array.isArray(re)?re:[]){if(h?.eligible!==!0||!Array.isArray(h.members))continue;let j=h.members.map(Ge=>{let ft=(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).find(Dt=>Dt.entries.some(Ct=>Ct.bead_id===Ge));return ft?ft.id:null});if(!(j.every(Ge=>Ge!==null)&&new Set(j).size===1))for(let Ge of h.members)R.set(Ge,h.members.filter(ft=>ft!==Ge))}let Be=l.bead_blocked_by&&typeof l.bead_blocked_by=="object"&&!Array.isArray(l.bead_blocked_by)?l.bead_blocked_by:{},Ye=new Map;for(let[h,j]of Object.entries(v))j&&typeof j=="object"&&Ye.set(h,j);for(let h of[..._,...C])Ye.set(h.id,{created_at:h.created_at,updated_at:h.updated_at});let Qe=h=>Ye.get(h)||{},qe=l.pr_wait||[],bt=l.pr_observations||{},or=l.pr_activity||{},Vr=l.cleanup_failed||{},Yn=Object.entries(Vr).map(([h,j])=>({bead_id:h,step:j&&j.step?j.step:"",reason:j&&j.reason?j.reason:"",at:j&&typeof j.at=="number"?j.at:null,detail:j&&typeof j.detail=="string"?j.detail:null,output_tail:j&&typeof j.output_tail=="string"&&j.output_tail?j.output_tail:void 0,log_path:j&&typeof j.log_path=="string"&&j.log_path?j.log_path:void 0,retry_count:j&&typeof j.retry_count=="number"&&Number.isInteger(j.retry_count)&&j.retry_count>0?j.retry_count:0,failure_code:j&&typeof j.failure_code=="string"?j.failure_code:void 0,subject_id:j&&typeof j.subject_id=="string"?j.subject_id:void 0,repair_eligible:!!(j&&j.repair_eligible),repair:j&&j.repair?j.repair:void 0})),_n=l.queue||[],mn=new Set([..._n.map(h=>h.bead_id),...(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).flatMap(h=>(Array.isArray(h?.entries)?h.entries:[]).map(j=>j.bead_id)),...qe.map(h=>h.bead_id),...l.done.map(h=>h.bead_id)]),Zn=new Set(C.map(h=>h.id)),Pe=c?c.get()?.order||{}:{},pt=new Set,Kr=[];for(let h of[..._,...C])mn.has(h.id)||pt.has(h.id)||gg(h)||(pt.add(h.id),Kr.push(h));M=mg(Kr,X,Pe);let sd=l.admission||{},qa=h=>{let j=sd[h];if(!j)return"";if(j.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ie=typeof j.reason=="string"?j.reason:"",Ge=ie.indexOf(":");return Ge>0&&Ge<ie.length-1?`\u26D4 ${ie.slice(0,Ge)} (${ie.slice(Ge+1)})`:`\u26D4 ${ie}`},od=M.map(h=>{let j=js(h),ie=j.path.length>0,Ge=h.workflow?.route==="quick_fix"||h.metadata&&h.metadata.route==="quick_fix",ft=!Object.hasOwn(h,"description")||typeof h.description=="string"&&h.description.trim().length>0,Dt=Object.hasOwn(h,"labels")&&xu(h.labels),Ct=!Dt&&(Ge?ft:ie&&!j.conflict),ut=Zn.has(h.id),Yt=[];ut&&Yt.push(hg(h)),Ge&&!ft?Yt.push("missing_description"):!Ge&&j.conflict?Yt.push("spec_id_conflict"):!Ge&&!ie&&Yt.push("spec \uC5C6\uC74C");let ss=qa(h.id);return ss&&Yt.push(ss),{id:h.id,title:h.title||h.id,reason:Yt.join(" \xB7 "),draggable:Ct,lane:"candidate",created_at:h.created_at,updated_at:h.updated_at,workflow:h.workflow,is_quick_fix:Ge,status:h.status,worker_ineligible:Dt,blocked:ut,has_spec:ie}}),io=og(od,B),ad=io.visible,id=l.revise_parked||{},Xn=l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},lo=(h,j)=>h.map((ie,Ge)=>{let ft=j!=="done",Dt=j!=="done"&&j!=="queue",Ct=ft?id[ie.bead_id]:null,ut=ft?cr(Xn,ie.bead_id):null,Yt=ut?.operation?ut:null,ss=ft&&L.get(ie.bead_id)===!0,li=Be[ie.bead_id]||[],_o=l.admission&&typeof l.admission=="object"?l.admission[ie.bead_id]:null,mo=ft?xc(_o,!!Yt||N.has(ie.bead_id)):null,vd=ft&&!mo?qa(ie.bead_id):null,wd=ft?[vd]:[],ci=ft&&li.length>0&&typeof _o?.reason=="string"&&_o.reason.startsWith("not_ready")?[`\u23F8 ${li.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],go=ft?R.get(ie.bead_id):void 0;return go&&go.length>0&&ci.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${go.join(", ")}\uC640`),{id:ie.bead_id,title:y.get(ie.bead_id)||ie.bead_id,reason:wd.filter(Boolean).join(" \xB7 "),draggable:ft&&!Yt&&!mo,done:j==="done",lane:j,seq:Dt?Ge+1:void 0,worker_serial:ss,discard:Yt,stale_work:mo,badges:[...ci,...Ct?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Ct,revise_action:!!Ct,revise_enabled:!!Ct&&!Yt&&!ce.has(ie.bead_id),revise_title:Ct?Ct.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ct.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:j==="done"?zt(l.attempts||{},ie.bead_id):null,work_ms:j==="done"?kc(l.attempts||{},ie.bead_id):null,done_at:j==="done"&&typeof ie.added_at=="number"?ie.added_at:void 0,...Qe(ie.bead_id)}}),Yr=l.attempts?Object.values(l.attempts):[],co=new Set;for(let h of Yr)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&co.add(h.resumed_from);let Fa=new Map;for(let h of Yr)Fa.set(h.bead_id,h.attempt_id);let Qn=new Map;for(let h of Yr)Qn.set(h.attempt_id,h);function uo(h){let j=new Set,ie=h;for(;ie&&!j.has(ie.attempt_id);){if(ie.conflict_resolution===!0)return!0;j.add(ie.attempt_id),ie=typeof ie.resumed_from=="string"&&ie.resumed_from.length>0&&Qn.get(ie.resumed_from)||null}return!1}let Jn=typeof l.declared_base=="string"?l.declared_base:null;function ld(h){let j=null;for(let ie of Yr)!ie||ie.bead_id!==h||uo(ie)||(j===null||(typeof ie.started_at=="number"?ie.started_at:0)>=(typeof j.started_at=="number"?j.started_at:0))&&(j=ie);return j&&typeof j.target_base=="string"?j.target_base:null}let ja=[],Ba=[],cd=$u(l),Ua=h=>{let j=typeof h.session_id=="string"&&h.session_id.length>0,ie=co.has(h.attempt_id);return{eligible:j&&!ie,reason:j?ie?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Kt=null;for(let h of Yr){let j=h.status==="paused"&&!co.has(h.attempt_id);if(h.status==="running"||j)Ba.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:y.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,paused:j,conflict_resolution:uo(h),base_exception:Oa(Jn,h.target_base),can_pause:typeof h.session_id=="string"&&h.session_id.length>0,discard:cr(Xn,h.bead_id,{attempt_id:h.attempt_id}),usage:zt(l.attempts||{},h.bead_id),current_child:_e(h.bead_id),...Qe(h.bead_id)});else if((h.status==="failed"||h.status==="orphaned")&&cd(h)){let ie=Ua(h);ja.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:y.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,failed:!0,status:h.status,status_label:h.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:cr(Xn,h.bead_id,{attempt_id:h.attempt_id}),resume_eligible:ie.eligible,resume_reason:ie.reason,conflict_resolution:uo(h),base_exception:Oa(Jn,h.target_base),usage:zt(l.attempts||{},h.bead_id),current_child:_e(h.bead_id),...Qe(h.bead_id)}),Kt=h}}let es=[...ja,...Ba].map(h=>{let j=Qn.get(h.attempt_id),ie=j?.quickfix_landing;if(j?.quickfix_lane!==!0||!ie||typeof ie!="object")return h;let Ge=typeof ie.reason=="string"&&ie.reason.length>0?ie.reason:null,ft=zn({bead_id:j.bead_id,merge_sha:ie.head_sha,cleanup_cursor:ie.cursor,cleanup_failed:Ge?{step:ie.cursor,reason:Ge}:null,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]});return ft?{...h,landing:ft}:h}),Wa=null;if(Kt){let h=Ua(Kt),j=Kt.cause_detail;Wa={bead_id:Kt.bead_id,repo:Kt.repo||"",reason:Kt.cause||Kt.status,cause_detail:j&&typeof j.reason=="string"?{reason:j.reason,command:typeof j.command=="string"?j.command:null}:null,resume_attempt_id:Kt.attempt_id,resume_eligible:h.eligible,resume_reason:h.reason,discard:cr(Xn,Kt.bead_id,{attempt_id:Kt.attempt_id})}}let za=new Set(es.map(h=>h.bead_id)),po=Array.isArray(l.merge_queue)?l.merge_queue:[],Ha=new Map,Ga=new Map,Va=new Map,Ka=new Map,Ya=new Map;po.forEach((h,j)=>{h&&typeof h.bead_id=="string"&&(Ha.set(h.bead_id,j+1),Ga.set(h.bead_id,h.resolution),Va.set(h.bead_id,h.continuation_action||null),Ka.set(h.bead_id,h.head_review||null),Ya.set(h.bead_id,h.authority||null))});let Zr=l.merge_queue_state||{active:null,failures:{}},ud=Zr.failures||{},Za=Zr.waiting&&typeof Zr.waiting.bead_id=="string"&&typeof Zr.waiting.reason=="string"?Zr.waiting:null,dd=l.auto_merge_skips||{},Xa=h=>{let j=dd[h];if(!j)return null;let ie=bt[h],Ge=ie&&ie.pr?ie.pr.head_sha:null;return Ge&&Ge===j.head_sha?j.reason||"":null},ts=new Map;for(let h of es)h.failed!==!0&&h.conflict_resolution&&(h.paused?ts.has(h.bead_id)||ts.set(h.bead_id,"paused"):ts.set(h.bead_id,"running"));let Qa=es.filter(h=>!h.paused&&h.failed!==!0).length,Ja=(l.workspace_info||{}).slots,ei=typeof Ja=="number"?Ja:typeof l.slots=="number"?l.slots:oo,pd=Qa>ei,rs=Nr(q),fd=(Array.isArray(l.done)?l.done.slice():[]).filter(h=>rs===void 0||typeof h.added_at!="number"||h.added_at>=rs).sort((h,j)=>(j.added_at||0)-(h.added_at||0)),gn=lo(fd,"done"),_d=new Set((Array.isArray(l.done)?l.done:[]).map(h=>h?.bead_id).filter(h=>typeof h=="string")),ti=[],md=d?.()||"";for(let h of H){let j=jr(h.closed_at);if(typeof h.id!="string"||_d.has(h.id)||j===null||rs!==void 0&&j<rs||typeof h.comment_count!="number"||h.comment_count<=0)continue;let ie=`${md}\0${h.id}\0${String(h.updated_at)}\0${h.comment_count}`,Ge=S.get(ie);Ge===void 0&&r&&(S.set(ie,"pending"),Promise.resolve(r("get-comments",{id:h.id})).then(ft=>{let Dt=Array.isArray(ft)&&ft.some(Ct=>Bs(typeof Ct?.text=="string"?Ct.text:"")?.lane==="session");S.set(ie,Dt?"session":"not-session"),Z()}).catch(()=>{S.set(ie,"failed"),Z()})),Ge==="session"&&ti.push({id:h.id,title:h.title||h.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:j,created_at:h.created_at,updated_at:h.updated_at})}gn.push(...ti),gn.sort((h,j)=>(j.done_at||0)-(h.done_at||0));let ns={};for(let h of _r)ns[h]=0;let ri=!1,ni=0,fo=0,si=0;for(let h of gn){let j=h.usage;if(j&&typeof j=="object"){let ie=!1;for(let Ge of _r)Number.isFinite(j[Ge])&&(ns[Ge]+=j[Ge],ri=!0,ie=!0);ie&&(fo+=1,Number.isFinite(j.total_cost_usd)&&(ni+=j.total_cost_usd,si+=1))}}fo>0&&si===fo&&(ns.total_cost_usd=ni);let oi=gn.map(h=>h.usage).filter(h=>h&&typeof h=="object"&&h.providers),gd=oi.length>0?At(As(oi)):ri?Qt(ns):null,bd=l.lane_states&&typeof l.lane_states=="object"&&!Array.isArray(l.lane_states)?l.lane_states:{},hd=Array.isArray(l.serial_lanes)?l.serial_lanes:[],ai=h=>{if(qe.some(Ge=>Ge.bead_id===h))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let j=Yr.filter(Ge=>Ge&&Ge.bead_id===h),ie=j.length>0?j[j.length-1].status:null;return ie==="failed"||ie==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ie==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ii=hd.filter(h=>h&&typeof h.id=="string"&&Array.isArray(h.entries)).map((h,j)=>{let ie=bd[h.id]||{},Ge=new Map((Array.isArray(ie.corrections)?ie.corrections:[]).filter(ut=>ut&&typeof ut.bead_id=="string"&&typeof ut.after=="string").map(ut=>[ut.bead_id,ut.after])),ft=lo(h.entries.filter(ut=>!za.has(ut.bead_id)),h.id).map(ut=>Ge.has(ut.id)?{...ut,badges:[`\u{1F517} ${Ge.get(ut.id)} \uB4A4 (blocks \uC790\uB3D9)`,...ut.badges]}:ut),Dt=Array.isArray(ie.occupied_by)?ie.occupied_by.filter(ut=>typeof ut=="string"):[],Ct=Dt.map(ut=>({id:ut,title:y.get(ut)||ut,draggable:!1,lane:h.id,ghost:!0,badges:[ai(ut)]}));return{id:h.id,index:j+1,rows:[...Ct,...ft],occupied:Dt.length>0,badge:Dt.length>0?ai(Dt[0]):"\uB300\uAE30",cycle:ie.cycle===!0}}),yd=typeof l.serial_lane_count=="number"?l.serial_lane_count:ii.length;return{queue:l,idToTitle:y,candidates:ad,candidate_hidden:{blocked:io.hidden_blocked,spec:io.hidden_spec},running:es,live_count:Qa,slots:ei,over_cap:pd,failure:Wa,waiting:lo(_n.filter(h=>!za.has(h.bead_id)),"queue"),serial_lanes:ii,serial_lane_count:yd,pr_wait:qe.map(h=>Ag(h.bead_id,y.get(h.bead_id)||h.bead_id,bt,Vr[h.bead_id]||null,zt(l.attempts||{},h.bead_id),or[h.bead_id]||(W.has(h.bead_id)||ne.has(h.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),ts.get(h.bead_id)||null,h.external===!0,{position:Ha.get(h.bead_id)||0,active:Zr.active===h.bead_id,failure:ud[h.bead_id]||null,waiting:Za?.bead_id===h.bead_id?Za.reason:null,resolution:Ga.get(h.bead_id),continuation_action:Va.get(h.bead_id),head_review:Ka.get(h.bead_id)||null,authority:Ya.get(h.bead_id)||null},h.wt_present!==!1,l.auto_merge===!0?Xa(h.bead_id):null,Oa(Jn,ld(h.bead_id)),l.completion_status&&typeof l.completion_status=="object"&&!Array.isArray(l.completion_status)&&l.completion_status[h.bead_id]||null,l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},Qn.get(Fa.get(h.bead_id)||"")?.worker_serial===!0,l.auto_merge===!0,{merge_sha:h.merge_sha,cleanup_cursor:h.cleanup_cursor,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]})).map(h=>({...h,...Qe(h.id)})),merge_queue_length:po.length,merge_queue_running:po.length>0,auto_excluded:qe.map(h=>h.bead_id).filter(h=>Xa(h)!==null),declared_base:Jn,done:gn,token_total:gd,cleanup_failures:Yn,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]}}function Se(){let _=!!o?.get()?.job,C=!_&&o?.isPending?.()===!0,H=_?"\uBD84\uC11D \uC911":C?"\uC900\uBE44 \uC911":"";return i`<button
      type="button"
      class=${H?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${H?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${H?i`<span class="worker-analysis-btn__badge">${H}</span>`:""}
    </button>`}function Ke(l){let _=l.waiting.length>0?l.waiting[0].id:"\u2014",C=i`<button
      type="button"
      class="worker-play${l.queue.auto_advance?" is-active":""}"
    >
      ${l.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,H=F(l),oe=l.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ye=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${l.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${l.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${A()} 완료 <b>${l.done.length}</b></span
      >`,_e=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${l.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${l.declared_base||"?"}</span
    >`,et=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${oo}
          step="1"
          .value=${String(l.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Nu},(m,L)=>L+1).map(m=>i`<option
                value=${String(m)}
                ?selected=${l.serial_lane_count===m}
              >
                ${m}
              </option>`)}
        </select>
      </label>
      ${o?Se():""} `,y=qc({failure:l.failure}),v=$c(l.repo_operations,l.cleanup_failures);return w?i`<div class="worker-ribbon">
          ${C} ${H}
          <div class="worker-kpi worker-kpi--ribbon">${oe}${ye}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${et}</div>
          <div class="worker-kpi">${_e}</div>
        </div>
        ${v}${We.template()}${y}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${C}${H}${et}</div>
        <div class="worker-kpi">
          ${oe}${ye}${_e}
          ${(Array.isArray(l.token_total)?l.token_total:l.token_total?[{label:l.token_total,tooltip:`${A()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(m=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${m.tooltip}
                >${A()} 완료 · 누적 ${m.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${_}</b></span
          >
        </div>
      </div>
      ${v}${We.template()}${y}`}function z(l){if(l.running.length===0&&l.pr_wait.length===0)return"";let _=l.running.some(C=>!C.paused&&C.failed!==!0);return i`<section
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
      ${l.running.length>0?wa(l.running,Date.now(),Le):""}
      ${l.pr_wait.map(C=>fa(C))}
    </section>`}function te(l){let _=l.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${B.show_blocked}
        />
        🔒 blocked${_.blocked>0?` ${_.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ag.map(C=>i`<button
              type="button"
              class="worker-filter__chip${B.spec===C.value?" is-active":""}"
              data-spec=${C.value}
              aria-pressed=${B.spec===C.value?"true":"false"}
            >
              ${C.label}
            </button>`)}
        ${_.spec>0?i`<span class="worker-filter__hidden">숨김 ${_.spec}</span>`:""}
      </div>
    </div>`}function me(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${X}
    >
      ${ig.map(l=>i`<option value=${l.value} ?selected=${X===l.value}>
            ${l.label}
          </option>`)}
    </select>`}function k(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${q}
      >
        ${ar.map(l=>i`<option value=${l.value} ?selected=${q===l.value}>
              ${l.label}
            </option>`)}
      </select>
    </div>`}function I(l){let _=i`<span
      class="worker-lane__badge${l.occupied?" worker-lane__badge--held":""}"
      >${l.badge}</span
    >`,C=l.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return nr({id:`worker-pane-lane-${l.id}`,lane:l.id,title:`\uC9C1\uB82C ${l.index}`,items:l.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:_,controls:C})}function F(l){let _=l.queue.auto_merge===!0;if(l.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${_?" is-active":""}"
        title=${_?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${_?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${l.merge_queue_length}
      </button>`;if(_)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let C=new Set(l.auto_excluded),H=l.pr_wait.filter(oe=>oe.merge_action&&oe.merge_enabled&&!C.has(oe.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${H>0?` ${H}`:""}
    </button>`}function Q(l){let _=nr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:l.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:me(),controls:te(l),place_menu:K(l.candidates)});return w?i`<div class="worker-lanes worker-lanes--mobile">
        ${z(l)}
        ${nr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:O.queue,preview:Fu(l.waiting)})}
        ${l.serial_lanes.map(C=>I(C))}
        ${_}
        ${nr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:l.done,empty:`${A()} \uC644\uB8CC \uC5C6\uC74C`,controls:k(),collapsible:!0,collapsed:O.done,preview:Array.isArray(l.token_total)?l.token_total.map(C=>C.label).join(" \xB7 "):l.token_total||Fu(l.done)})}
      </div>`:i`<div class="worker-lanes">
      ${_}
      <div class="worker-wait">
        ${nr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${l.serial_lanes.map(C=>I(C))}
      </div>
      ${nr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${l.slots}`,items:l.running,live:l.running.some(C=>!C.paused&&C.failed!==!0),body:wa(l.running,Date.now(),Le)})}
      ${nr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:l.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${nr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${A()} ${l.done.length}`,items:l.done,empty:`${A()} \uC644\uB8CC \uC5C6\uC74C`,controls:k()})}
    </div>`}function ke(l){O={...O,[l]:!O[l]},_g(O),Z()}function Z(){let l=Ae();Je(Ke(l),ve),Je(Q(l),fe)}function Ee(){let l=document.querySelector(".app-header");if(!l)return;let _=()=>{let C=Math.round(l.getBoundingClientRect().height);de.style.setProperty("--worker-ribbon-top",`${C}px`)};if(_(),typeof ResizeObserver=="function"){let C=new ResizeObserver(_);C.observe(l),P.push(()=>C.disconnect())}else window.addEventListener("resize",_),P.push(()=>window.removeEventListener("resize",_))}function Ce(){if(typeof window.matchMedia!="function")return;let l=window.matchMedia(pg);w=!!l.matches;let _=C=>{let H=!!(C&&typeof C.matches=="boolean"?C.matches:l.matches);H!==w&&(w=H,Z())};typeof l.addEventListener=="function"?(l.addEventListener("change",_),P.push(()=>l.removeEventListener("change",_))):typeof l.addListener=="function"&&(l.addListener(_),P.push(()=>l.removeListener(_)))}let mt=null;function Et(l){mt=l.target instanceof Element?l.target:null}function nt(l){let C=l.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!C)return;if(mt&&C.contains(mt)&&mt.closest("input, button, a")){l.preventDefault();return}let H=C.dataset.beadId||"",oe=C.dataset.lane||"";T={bead_id:H,from_lane:oe};try{l.dataTransfer?.setData("text/plain",H),l.dataTransfer&&(l.dataTransfer.effectAllowed="move")}catch{}}function vt(l){let _=l.target?.closest?.(".worker-pane");if(!_)return;let C=_.dataset.lane||"";C!=="candidate"&&C!=="queue"&&!/^s[1-5]$/.test(C)||(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="move"),_.classList.add("worker-pane--drag-over"))}function ur(l){l.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function wt(l,_){let C=M.find(_e=>_e.id===l);if(!C)return;let H=M.filter(_e=>_e.id!==l),oe=H.length;if(_){let _e=_.dataset.beadId;if(_e===l)return;let et=H.findIndex(y=>y.id===_e);et>=0&&(oe=et)}let ye=H.slice();ye.splice(oe,0,C),E.applyReorder(l,ye,oe)}function Tt(l){let _=l.target?.closest?.(".worker-pane");if(!_)return;l.preventDefault(),_.classList.remove("worker-pane--drag-over");let C=_.dataset.lane||"",H=T?.bead_id||l.dataTransfer?.getData("text/plain")||"",oe=T?.from_lane||"";if(T=null,!H)return;let ye=l.target?.closest?.(".worker-mini, .worker-card"),_e=Array.from(_.querySelectorAll(".worker-mini, .worker-card")),et=_e.length;if(ye){let y=_e.indexOf(ye);y>=0&&(et=y)}if(et=Math.max(0,et-_.querySelectorAll(".worker-mini--ghost").length),_.classList.contains("worker-pane--collapsed")&&(et=Oe()),C==="candidate"){if(oe==="candidate"){wt(H,ye);return}(oe==="queue"||/^s[1-5]$/.test(oe))&&Ie(H);return}if(C==="queue"||/^s[1-5]$/.test(C)){let y=C==="queue"?"parallel":C;oe===C?Ve(H,y,et):ze(H,y)}}function dr(l){B=l,sg(l),Z()}function wr(l){X=l==="board"||l==="created"||l==="spec"?l:ao,cg(X),Z()}function Bt(l){q=Wt(l)?l:Nt,dg(q),f?.(q),Z()}function Gt(l){let _=l.target?.closest?.(".worker-serial-lane-count");if(_){let et=Number.parseInt(_.value,10);Number.isFinite(et)&&Ne(et).then(Z);return}let C=l.target?.closest?.(".worker-filter__blocked");if(C){dr({...B,show_blocked:C.checked});return}let H=l.target?.closest?.(".worker-done-range");if(H){Bt(H.value);return}let oe=l.target?.closest?.(".worker-sort");if(oe){wr(oe.value||ao);return}let ye=l.target?.closest?.(".worker-slots__input");if(!ye)return;let _e=Number.parseInt(ye.value,10);if(!Number.isFinite(_e)){Z();return}be(_e).then(Z)}function kt(l){return l?{runner:l.runner||void 0,model:l.model||void 0,effort:l.effort||void 0,worktree:l.worktree||void 0,status:l.status||void 0,session_id:l.session_id||void 0}:{}}function sr(){let l=Ae();return{operations:l.repo_operations,cleanup_failures:l.cleanup_failures,repo:d&&d()||""}}function st(){Le&&$e.close(),Ue.hidden=!1,we.hidden=!1,Re.open(sr()),Z()}function Mt(l){let _=Te(),C=_.attempts?_.attempts[l]:null;Le=l,ge=null,Re.close(),Ue.hidden=!0,we.hidden=!1,$e.open({attempt_id:l,meta:kt(C)}),Z()}function kr(l,_){Le=null,ge=l,Re.close(),Ue.hidden=!0,we.hidden=!1,$e.open({attempt_id:l,meta:_,hide_prompt:!0}),Z()}function Vt(){if(Re.isOpen()&&Re.refresh(sr()),ge){let C=(o?.get()?.runs||[]).find(H=>H.run_id===ge);C?$e.updateMeta(Ia(C)):$e.close();return}if(!Le)return;let l=Te(),_=l.attempts?l.attempts[Le]:null;if(_){$e.updateMeta(kt(_));return}$e.close()}function he(l){let _=l.target;if(_?.closest?.(".worker-mini__serial, .worker-mini__grip")||_?.closest?.("#worker-parallel-analysis-dialog"))return;if(_?.closest?.(".worker-analysis-btn")){Ze?.open();return}if(_?.closest?.(".worker-repo-strip")||_?.closest?.(".worker-mini__timeline")){st();return}let C=_?.closest?.(".worker-repo-op__session");if(C){let Pe=C.dataset.attemptId;Pe&&Mt(Pe);return}let H=_?.closest?.(".worker-repo-op__resolve");if(H){ue(H.dataset.operationId||"");return}let oe=_?.closest?.(".worker-repo-op__dismiss");if(oe){De(oe.dataset.operationId||"");return}let ye=_?.closest?.(".worker-cleanup__resume");if(ye){let Pe=ye.dataset.beadId;Pe&&He(Pe);return}let _e=_?.closest?.(".worker-banner__resume");if(_e){let Pe=_e.dataset.attemptId;Pe&&Xe(Pe);return}let et=_?.closest?.(".worker-banner__discard");if(et){let Pe=et.dataset.confirmation==="merged"?"merged":"unmerged";D(et.dataset.beadId||"",et.dataset.attemptId||null,Pe,et.dataset.operationId||null);return}let y=_?.closest?.(".worker-banner__dismiss");if(y){let Pe=y.dataset.attemptId;Pe&&G(Pe);return}if(_?.closest?.(".worker-play")){le(!Te().auto_advance);return}let v=_?.closest?.(".worker-merge-all");if(v){v.classList.contains("worker-merge-all--stop")?Te().auto_merge===!0?g(!1):$():g(!0);return}let m=_?.closest?.(".worker-pane__hd--toggle");if(m){let Pe=m.dataset.lane;(Pe==="queue"||Pe==="done")&&ke(Pe);return}let L=_?.closest?.(".worker-card__place-lane");if(L){let Pe=L.dataset.beadId,pt=L.dataset.lane;Pe&&(pt==="parallel"||/^s[1-5]$/.test(pt||""))&&(J=null,Z(),ze(Pe,pt));return}if(_?.closest?.(".worker-card__place-cancel")){J=null,Z();return}let re=_?.closest?.(".worker-card__place");if(re){let Pe=re.dataset.beadId;Pe&&!re.disabled&&(ot()?(J=Pe,Z()):ze(Pe,"parallel"));return}let Be=_?.closest?.(".worker-filter__chip");if(Be){let Pe=Be.dataset.spec;(Pe==="all"||Pe==="with"||Pe==="without")&&dr({...B,spec:Pe});return}let Ye=_?.closest?.(".worker-mini__merge");if(Ye){let Pe=Ye.dataset.beadId||"";Te().cleanup_failed?.[Pe]?He(Pe):Me(Pe);return}let Qe=_?.closest?.(".worker-mini__merge-cancel");if(Qe){x(Qe.dataset.beadId||"");return}let qe=_?.closest?.(".worker-mini__discard");if(qe){D(qe.dataset.beadId||"",qe.dataset.attemptId||null,qe.dataset.discardMode==="merged"?"merged":"unmerged",qe.dataset.operationId||null);return}let bt=_?.closest?.(".worker-mini__stale-continue");if(bt){V("worker-stale-work-continue",bt.dataset.beadId||"",bt.dataset.actionId||"");return}let or=_?.closest?.(".worker-mini__stale-backup");if(or){V("worker-stale-work-backup-fresh",or.dataset.beadId||"",or.dataset.actionId||"");return}let Vr=_?.closest?.(".worker-mini__stale-recheck");if(Vr){V("worker-stale-work-recheck",Vr.dataset.beadId||"",Vr.dataset.actionId||"");return}let Yn=_?.closest?.(".worker-mini__revise-fix");if(Yn){Y("worker-revise-fix",Yn.dataset.beadId||"");return}let _n=_?.closest?.(".worker-mini__revise-approve");if(_n){Y("worker-revise-approve",_n.dataset.beadId||"");return}if(_?.closest?.(".worker-mini__pr"))return;if(_?.closest?.(".rtile__discard")){let Pe=_?.closest?.(".rtile"),pt=Pe?.dataset?.beadId,Kr=Pe?.dataset?.attemptId;pt&&D(pt,Kr||null,"unmerged",_?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(_?.closest?.(".rtile__dismiss")){let pt=_?.closest?.(".rtile")?.dataset?.attemptId;pt&&G(pt);return}if(_?.closest?.(".rtile__pause")){let pt=_?.closest?.(".rtile")?.dataset?.attemptId;pt&&lt(pt);return}if(_?.closest?.(".rtile__resume")){let pt=_?.closest?.(".rtile")?.dataset?.attemptId;pt&&Xe(pt);return}if(_?.closest?.(".rtile__session")){let pt=_?.closest?.(".rtile")?.dataset?.attemptId;pt&&Mt(pt);return}if(_?.closest?.(".worker-drawer-overlay__backdrop")){Re.close(),$e.close();return}if(_?.closest?.(".worker-drawer-host"))return;let mn=_?.closest?.(".rtile");if(mn){if(_?.closest?.(".rtile__id")){let pt=mn.dataset.beadId;pt&&Xt(pt).then(Kr=>{Kr?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Pe=mn.dataset.beadId;Pe&&u&&u(Pe);return}let Zn=_?.closest?.(".worker-mini, .worker-card");if(Zn){let Pe=Zn.dataset.beadId;if(_?.closest?.(".worker-mini__id, .worker-card__id")){Pe&&Xt(Pe).then(pt=>{pt?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Pe&&u&&u(Pe)}}return e.addEventListener("pointerdown",Et),e.addEventListener("dragstart",nt),e.addEventListener("dragover",vt),e.addEventListener("dragleave",ur),e.addEventListener("drop",Tt),e.addEventListener("click",he),e.addEventListener("change",Gt),Ce(),Ee(),b&&P.push(b.subscribe(()=>{for(let[l,_]of S)_==="failed"&&S.delete(l);Z()})),s&&P.push(s.subscribe(()=>{let l=d&&d()||"";l!==xe&&(xe=l,je.close()),Z(),Vt()})),o&&typeof o.subscribe=="function"&&P.push(o.subscribe(()=>{Vt(),Z()})),Z(),{load(){Z()},destroy(){for(let l of P.splice(0))try{l()}catch{}e.removeEventListener("pointerdown",Et),e.removeEventListener("dragstart",nt),e.removeEventListener("dragover",vt),e.removeEventListener("dragleave",ur),e.removeEventListener("drop",Tt),e.removeEventListener("click",he),e.removeEventListener("change",Gt);try{$e.destroy()}catch{}we.hidden=!0;try{Ze?.destroy()}catch{}try{je.destroy()}catch{}Je(i``,e)}}}function Pa(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Gu(e,t,r,n=async()=>{},s=async()=>{}){let o=gt("views:workspace-picker"),a=null,c=!1,u=!1,d=!1;async function p(O){let W=O.target.value,ce=t.getState().workspace?.current?.path||"";if(W&&W!==ce){o("switching workspace to %s",W),c=!0,A();try{await r(W)}catch(N){o("workspace switch failed: %o",N)}finally{c=!1,A()}}}async function f(){let O=t.getState(),w=O.workspace?.current?.path||O.workspace?.available?.[0]?.path||"";if(!(!w||u)){o("git-pulling workspace %s",w),u=!0,A();try{await n(w)}catch(W){o("workspace git pull failed: %o",W)}finally{u=!1,A()}}}function b(O){let w=O.target;w&&e.contains(w)||M()}function E(O){O.key==="Escape"&&M()}function T(){d||(d=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",E),A())}function M(){d&&(d=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",E),A())}function B(){d?M():T()}async function J(O){let w=O.target,W=w.value,ne=w.checked;o("toggling visibility %s \u2192 %s",W,String(ne));try{await s(W,ne)}catch(ce){o("workspace visibility toggle failed: %o",ce)}}function X(O){return O?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${c||u}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function q(O,w){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${B}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?i`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${O.map(W=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${W.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${W.path}"
                        .checked=${!w.has(W.path)}
                        @change=${J}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Pa(W.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function S(){let O=t.getState(),w=O.workspace?.current,W=O.workspace?.available||[],ne=new Set(O.workspace?.hidden||[]),ce=w?.path||W[0]?.path||"";if(W.length===0)return i``;let N=W.filter(P=>!ne.has(P.path)||P.path===ce);if(N.length<=1){let P=N[0]||W[0],de=Pa(P.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${P.path}"
            >${de}</span
          >
          ${q(W,ne)}
          ${X(ce)}
          ${u?i`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return i`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${c||u}
          aria-label="Select project workspace"
        >
          ${N.map(P=>i`
              <option
                value="${P.path}"
                ?selected=${P.path===ce}
                title="${P.path}"
              >
                ${Pa(P.path)}
              </option>
            `)}
        </select>
        ${q(W,ne)}
        ${X(ce)}
        ${c||u?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function A(){Je(S(),e)}return A(),a=t.subscribe(()=>A()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",E),Je(i``,e)}}}var Vu=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Da(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Ku(e,t,r=Da()){return{id:r,type:e,payload:t}}function Yu(e={}){let t=gt("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,c=null,u=!0,d=new Map,p=[],f=new Map,b=new Set;function E(S){for(let A of Array.from(b))try{A(S)}catch{}}function T(){if(!u||c)return;o="reconnecting",t("ws reconnecting\u2026"),E(o);let S=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),A=(r.jitterRatio||0)*S,O=Math.max(0,Math.round(S+(Math.random()*2-1)*A));t("ws retry in %d ms (attempt %d)",O,a+1),c=setTimeout(()=>{c=null,q()},O)}function M(S){try{s?.send(JSON.stringify(S))}catch(A){t("ws send failed",A)}}function B(){for(o="open",t("ws open"),E(o),a=0;p.length;){let S=p.shift();S&&M(S)}}function J(S){let A;try{A=JSON.parse(String(S.data))}catch{t("ws received non-JSON message");return}if(!A||typeof A.id!="string"||typeof A.type!="string"){t("ws received invalid envelope");return}if(d.has(A.id)){let w=d.get(A.id);d.delete(A.id),A.ok?w?.resolve(A.payload):w?.reject(A.error||new Error("ws error"));return}let O=f.get(A.type);if(O&&O.size>0)for(let w of Array.from(O))try{w(A.payload)}catch(W){t("ws event handler error",W)}else t("ws received unhandled message type: %s",A.type)}function X(){o="closed",t("ws closed"),E(o);for(let[S,A]of d.entries())A.reject(new Error("ws disconnected")),d.delete(S);a+=1,T()}function q(){if(!u)return;let S=n();try{s=new WebSocket(S),t("ws connecting %s",S),o="connecting",E(o),s.addEventListener("open",B),s.addEventListener("message",J),s.addEventListener("error",()=>{}),s.addEventListener("close",X)}catch(A){t("ws connect failed %o",A),T()}}return q(),{send(S,A){if(!Vu.includes(S))return Promise.reject(new Error(`unknown message type: ${S}`));let O=Da(),w=Ku(S,A,O);return t("send %s id=%s",S,O),new Promise((W,ne)=>{d.set(O,{resolve:W,reject:ne,type:S}),s&&s.readyState===s.OPEN?M(w):(t("queue %s id=%s (state=%s)",S,O,o),p.push(w))})},on(S,A){f.has(S)||f.set(S,new Set);let O=f.get(S);return O?.add(A),()=>{O?.delete(A)}},onConnection(S){return b.add(S),()=>{b.delete(S)}},reconnect(){u=!0,c&&(clearTimeout(c),c=null),a=0,q()},close(){u=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function Sg(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Eg(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Na=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Zu=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],Rr="tab:worker:closed",Tg="bdui.worker.done-range",Xu=nu,Qu="worker:queue",Ju="worker:parallel-analysis",ed="ui:order",td="ui:display-policy",rd="exec:presets",Ir="tab:board:closed",nd="beads-ui.board.closed-range";function Cg(e){let t=gt("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Je(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),c=document.getElementById("monitor-root"),u=document.getElementById("detail-panel");if(s&&ku(s),o&&a&&c&&u){let Ue=function(y,v){let m="Request failed",L="";if(y&&typeof y=="object"){let re=y;if(typeof re.message=="string"&&re.message.length>0&&(m=re.message),typeof re.details=="string")L=re.details;else if(re.details&&typeof re.details=="object")try{L=JSON.stringify(re.details,null,2)}catch{L=""}}else typeof y=="string"&&y.length>0&&(m=y);let R=v&&v.length>0?`Failed to load ${v}`:"Request failed";rt.open(R,m,L)},Xe=function(y){return`${st.getState().workspace.current?.path||""}\0${y}`},G=function(){K&&(K().catch(()=>{}),K=null),U=null,se=null},Me=function(y){Oe=y;let v=()=>{Oe!==y||st.getState().selected_id!==y||(Oe=null,ee(y))};if(!Ie){Ve.then(v);return}v()},x=function(y,v,m,L,R){return m!==g[v]?(R().catch(()=>{}),!1):(y.set(L,R),!0)},D=function(){let y=st.getState();De(y.view==="board"),z(y.view==="worker"),F(y.view==="monitor"),me(y.view==="board"||y.view==="worker"||$||!!y.selected_id)},le=function(){let y=Nr(V);return y===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:y}}},ue=function(){let y=Nr(Y);return y===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:y}}},De=function(y){if(y)for(let[v,m]of Na){if(He.has(v)||pe.has(v))continue;let L=v===Ir?le():{type:m};try{$e.register(v,L)}catch(Be){t("register %s store failed: %o",v,Be)}pe.add(v);let R=g.board,re=!1;ge.subscribeList(v,L).then(Be=>{re=!x(He,"board",R,v,Be)}).catch(Be=>{t("subscribe %s failed: %o",v,Be),Ue(Be,"board")}).finally(()=>{pe.delete(v),re&&D()})}else Ae()},Ae=function(){g.board+=1;for(let[y]of Na){let v=He.get(y);v&&(v().catch(()=>{}),He.delete(y));try{$e.unregister(y)}catch(m){t("unregister %s failed: %o",y,m)}}},z=function(y){if(!y){te();return}for(let[v,m]of Zu){if(Se.has(v)||pe.has(v))continue;let L=v===Rr?ue():{type:m};try{$e.register(v,L)}catch(Be){t("register %s store failed: %o",v,Be)}pe.add(v);let R=g.worker,re=!1;ge.subscribeList(v,L).then(Be=>{re=!x(Se,"worker",R,v,Be)}).catch(Be=>{t("subscribe %s failed: %o",v,Be),Ue(Be,"worker")}).finally(()=>{pe.delete(v),re&&D()})}},te=function(){g.worker+=1;for(let[y]of Zu){let v=Se.get(y);v&&(v().catch(()=>{}),Se.delete(y));try{$e.unregister(y)}catch(m){t("unregister %s failed: %o",y,m)}}},me=function(y){if(!y){k();return}Ke||(Le("subscribe-worker-queue",{id:Qu}).catch(v=>{t("subscribe-worker-queue failed: %o",v)}),Le("subscribe-worker-parallel-analysis",{id:Ju}).catch(v=>{t("subscribe-worker-parallel-analysis failed: %o",v)}),Ke=()=>(Le("unsubscribe-worker-parallel-analysis",{id:Ju}),Le("unsubscribe-worker-queue",{id:Qu})))},k=function(){Ke&&(Ke().catch(()=>{}),Ke=null),je.clear()},F=function(y){if(!y){Q();return}I||(Le("subscribe-monitor-pipeline",{id:Xu}).catch(v=>{t("subscribe-monitor-pipeline failed: %o",v)}),I=()=>Le("unsubscribe-monitor-pipeline",{id:Xu}))},Q=function(){I&&(I().catch(()=>{}),I=null)},Z=function(){ke||(Le("subscribe-ui-order",{id:ed}).catch(y=>{t("subscribe-ui-order failed: %o",y)}),ke=()=>Le("unsubscribe-ui-order",{id:ed}))},Ee=function(){ke&&(ke().catch(()=>{}),ke=null),We.clear()},mt=function(){Ce||(Le("subscribe-display-policy",{id:td}).catch(y=>{t("subscribe-display-policy failed: %o",y)}),Ce=()=>Le("unsubscribe-display-policy",{id:td}))},Et=function(){Ce&&(Ce().catch(()=>{}),Ce=null),Ze.clear()},vt=function(){nt||(Le("subscribe-impl-presets",{id:rd}).catch(y=>{t("subscribe-impl-presets failed: %o",y)}),nt=()=>Le("unsubscribe-impl-presets",{id:rd}))},Bt=function(y){if(!y)return"Unknown";let v=y.split("/").filter(Boolean);return v.length>0?v[v.length-1]:"Unknown"};var d=Ue,p=Xe,f=G,b=Me,E=x,T=D,M=le,B=ue,J=De,X=Ae,q=z,S=te,A=me,O=k,w=F,W=Q,ne=Z,ce=Ee,N=mt,P=Et,de=vt,ve=Bt;let we=document.getElementById("header-loading"),Fe=Gi(we),rt=wc(e),fe=Yu(),Le=Fe.wrapSend((y,v)=>fe.send(y,v)),ge=qi(Le),$e=Fi(),Re=Ui(),je=Bi(),xe=$i(),We=ji(),Ze=wi(),Te=ki(),ot=xi();fe.on("impl-presets-snapshot",y=>{let v=y;v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&Te.set({revision:v.revision,presets:v.presets})}),fe.on("monitor-pipeline-snapshot",y=>{let v=y;if(!(!v||!Array.isArray(v.workspaces)))try{xe.set(v.workspaces,v.workspaces_state)}catch{}}),fe.on("ui-order-snapshot",y=>{let v=y;if(v&&typeof v.revision=="number")try{We.set({revision:v.revision,order:v.order&&typeof v.order=="object"?v.order:{}})}catch{}}),fe.on("display-policy-snapshot",y=>{let v=y;if(v&&v.policy&&typeof v.policy=="object")try{Ze.set(v.policy)}catch{}}),fe.on("session-log-snapshot",y=>{let v=y;if(v&&typeof v.id=="string")try{ot.set(v.id,Array.isArray(v.lines)?v.lines:[],typeof v.last_event_at=="number"?v.last_event_at:null)}catch{}}),fe.on("session-log-append",y=>{let v=y;if(v&&typeof v.id=="string")try{ot.append(v.id,v.event)}catch{}}),fe.on("snapshot",y=>{let v=y,m=v&&typeof v.id=="string"?v.id:"",L=m?$e.getStore(m):null;if(L&&v&&v.type==="snapshot")try{L.applyPush(v)}catch{}}),fe.on("upsert",y=>{let v=y,m=v&&typeof v.id=="string"?v.id:"",L=m?$e.getStore(m):null;if(L&&v&&v.type==="upsert")try{L.applyPush(v)}catch{}}),fe.on("delete",y=>{let v=y,m=v&&typeof v.id=="string"?v.id:"",L=m?$e.getStore(m):null;if(L&&v&&v.type==="delete")try{L.applyPush(v)}catch{}});let K=null,U=null,se=null,Oe=null,ze=()=>{},Ve=new Promise(y=>{ze=()=>y(void 0)}),Ie=!1,lt=!1;async function ee(y){let v=Xe(y);if(v===U||v===se)return;se=v;let m=`detail:${y}`,L={type:"issue-detail",params:{id:y}};try{$e.register(m,L)}catch(R){t("register detail store failed: %o",R)}try{let R=await ge.subscribeList(m,L);if(st.getState().selected_id!==y||Xe(y)!==v){await R().catch(()=>{});return}K&&await K().catch(()=>{}),K=R,U=v}catch(R){t("detail subscribe failed: %o",R),Ue(R,"issue details")}finally{se===v&&(se=null)}}let He=new Map,pe=new Set,g={board:0,worker:0},$=!1,V=Nt;try{let y=window.localStorage.getItem(nd);Wt(y)&&(V=y)}catch{}let Y=Nt;try{let y=window.localStorage.getItem(Tg);Wt(y)&&(Y=y)}catch{}async function be(y){if(!Wt(y)||y===V)return;V=y;try{window.localStorage.setItem(nd,y)}catch{}let v=He.get(Ir);if(!v)return;He.delete(Ir),await v().catch(()=>{});let m=le();try{$e.register(Ir,m)}catch(L){t("register %s store failed: %o",Ir,L)}try{let L=await ge.subscribeList(Ir,m);He.set(Ir,L)}catch(L){t("re-subscribe %s failed: %o",Ir,L),Ue(L,"board")}}async function Ne(y){if(!Wt(y)||y===Y)return;Y=y;let v=Se.get(Rr);if(!v)return;Se.delete(Rr),await v().catch(()=>{});let m=ue();try{$e.register(Rr,m)}catch(L){t("register %s store failed: %o",Rr,L)}try{let L=await ge.subscribeList(Rr,m);Se.set(Rr,L)}catch(L){t("re-subscribe %s failed: %o",Rr,L),Ue(L,"worker")}}let Se=new Map,Ke=null,I=null,ke=null,Ce=null,nt=null;async function ur(){Ce=null,Ze.clear(),nt=null,Te.clear(),Ke=null,I=null,He.clear(),Se.clear(),g.board+=1,g.worker+=1,vt();let y=st.getState().workspace.current?.path;if(y)try{await fe.send("set-workspace",{path:y})}catch(m){t("workspace restore after reconnect failed: %o",m);return}mt();let v=st.getState();De(v.view==="board"),z(v.view==="worker"),F(v.view==="monitor"),me(v.view==="board"||v.view==="worker"||!!v.selected_id)}async function wt(){t("clearing all subscriptions for workspace switch"),Ae(),te(),k(),Re.clear(),Ee(),Z(),Et(),mt(),G();let y=st.getState();if(y.selected_id)try{$e.unregister(`detail:${y.selected_id}`)}catch{}let v=st.getState();De(v.view==="board"),z(v.view==="worker"),F(v.view==="monitor"),me(v.view==="board"||v.view==="worker"||!!v.selected_id),v.selected_id&&Me(v.selected_id)}async function Tt(y){t("requesting workspace switch to %s",y),lt=!0;try{let v=await fe.send("set-workspace",{path:y});t("workspace switch result: %o",v),v&&v.workspace&&(st.setState({workspace:{current:{path:v.workspace.root_dir,database:v.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",y),v.changed&&(await wt(),ae("Switched to "+Bt(y),"success",2e3)))}catch(v){throw t("workspace switch failed: %o",v),ae("Failed to switch workspace","error",3e3),v}finally{lt=!1}}async function dr(y){t("requesting workspace git pull for %s",y);try{let v=await fe.send("git-pull-workspace",{});t("workspace git pull result: %o",v);let m=v?.status;if(m==="up_to_date"){ae("Already up to date","success",2e3);return}if(m==="stash_pop_conflict"){ae("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ae("Git pulled "+Bt(y),"success",2e3)}catch(v){t("workspace git pull failed: %o",v);let m=v?.code,L=v?.message;if(m==="rebase_conflict"){ae("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(m==="rebase_conflict_abort_failed"){ae("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(m==="busy"){ae("Git pull skipped: another operation is running","warning",3e3);return}let R=L?`: ${L}`:"";throw ae(`Git pull failed${R}`,"error",3e3),v}}async function wr(y,v){t("setting workspace visibility %s \u2192 %s",y,String(v));try{await fe.send("set-workspace-visibility",{path:y,visible:v}),await Gt()}catch(m){t("workspace visibility update failed: %o",m),ae("Failed to update project visibility","error",3e3)}}async function Gt(){try{let y=await fe.send("list-workspaces",{});if(t("workspaces loaded: %o",y),y&&Array.isArray(y.workspaces)){let v=y.workspaces.map(re=>({path:re.path,database:re.database,pid:re.pid,version:re.version})),m=y.current?{path:y.current.root_dir,database:y.current.db_path}:null,L=Array.isArray(y.hidden)?y.hidden.filter(re=>typeof re=="string"):[];st.setState({workspace:{current:m,available:v,hidden:L}});let R=window.localStorage.getItem("beads-ui.workspace");R&&(!v.some(Be=>Be.path===R)||L.includes(R)?window.localStorage.removeItem("beads-ui.workspace"):m&&R!==m.path&&(t("restoring saved workspace preference: %s",R),await Tt(R)))}}catch(y){t("failed to load workspaces: %o",y)}}fe.on("workspace-changed",y=>{t("workspace-changed event: %o",y),y&&y.root_dir&&(st.setState({workspace:{current:{path:y.root_dir,database:y.db_path}}}),Gt(),wt())});let kt=!1;if(typeof fe.onConnection=="function"){let y=v=>{t("ws state %s",v),v==="reconnecting"||v==="closed"?(kt=!0,ae("Connection lost. Reconnecting\u2026","error",4e3)):v==="open"&&kt&&(kt=!1,ae("Reconnected","success",2200),Eg(st,(m,L)=>{t(`${m}: %o`,L)}),ur())};fe.onConnection(y)}let sr="board";try{let y=window.localStorage.getItem("beads-ui.view");(y==="board"||y==="worker"||y==="monitor")&&(sr=y)}catch(y){t("view parse error: %o",y)}let st=Hi({config:Sg(),view:sr});fe.on("worker-queue-snapshot",y=>{let v=y;if(!v||!v.queue)return;let m=st.getState().workspace.current?.path;if(typeof m=="string"&&m.length>0&&v.root_dir!==m){t("dropping worker-queue snapshot for %s",String(v.root_dir));return}try{Re.set(v.queue)}catch{}}),fe.on("worker-parallel-analysis-snapshot",y=>{let v=y;if(!v)return;let m=st.getState().workspace.current?.path;if(!(typeof m=="string"&&m.length>0&&typeof v.root_dir=="string"&&v.root_dir!==m))try{je.set({settings:v.settings,job:v.job??null,runs:Array.isArray(v.runs)?v.runs:[],last_good:v.last_good??null})}catch{}});let Mt=Wi(st);Mt.start();let kr=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),Vt=async(y,v)=>{try{return await Le(y,v)}catch(m){if(kr.has(y))throw m;return[]}};n&&ou(n,st,Mt);let he=document.getElementById("workspace-picker");he&&Gu(he,st,Tt,dr,wr);let l=cu(e,(y,v)=>Le(y,v));try{let y=document.getElementById("new-issue-btn");y&&y.addEventListener("click",()=>l.open())}catch{}let _=fu(e,{policyStore:Ze,queueStore:Re,implPresetStore:Te,transport:(y,v)=>Le(y,v),onOpenChange:y=>{$=y,D()},labelOptions:()=>{let y=new Set;for(let[v]of Na)for(let m of $e.snapshotFor(v)||[]){let L=m.labels;if(Array.isArray(L))for(let R of L)typeof R=="string"&&R.length>0&&y.add(R)}return Array.from(y).sort()}});try{let y=document.getElementById("display-settings-btn");y&&(y.setAttribute("aria-label","\uC124\uC815"),y.setAttribute("title","\uC124\uC815"),y.addEventListener("click",()=>_.open()))}catch{}let C=nl(o,{gotoIssue:y=>Mt.gotoIssue(y),issueStores:$e,transport:Vt,workerQueueStore:Re,uiOrderStore:We,displayPolicyStore:Ze,closedRange:V,onClosedRangeChange:y=>{be(y)},onNewIssue:()=>l.open()}),H=Ma(a,{transport:Vt,issueStores:$e,queueStore:Re,analysisStore:je,sessionLogStore:ot,uiOrderStore:We,gotoIssue:y=>st.setState({selected_id:y}),getWorkspacePath:()=>st.getState().workspace.current?.path,doneRange:Y,onDoneRangeChange:y=>{Ne(y)}}),oe=su(c,{transport:Vt,pipelineStore:xe,execPresetStore:Te,gotoIssue:y=>Mt.gotoIssue(y),getWorkspacePath:()=>st.getState().workspace.current?.path,switchWorkspace:y=>Tt(y)}),ye=vc(u,{issueStores:$e,transport:Vt,queueStore:Re,execPresetStore:Te,sessionLogStore:ot,getWorkspacePath:()=>st.getState().workspace.current?.path,onNavigate:y=>{st.getState().view==="worker"?st.setState({selected_id:y}):Mt.gotoIssue(y)},onClose:()=>{let y=st.getState();st.setState({selected_id:null});try{Mt.gotoView(y.view==="worker"||y.view==="monitor"?y.view:"board")}catch{}},onOpenExecPresets:()=>{_.open("execution")}}),_e=st.getState().selected_id;_e&&(u.hidden=!1,ye.load(_e),Me(_e)),st.subscribe(y=>{let v=y.selected_id;v?(u.hidden=!1,ye.load(v),lt||Me(v)):(ye.clear(),u.hidden=!0,G())});let et=y=>{o.hidden=y.view!=="board",a.hidden=y.view!=="worker",c.hidden=y.view!=="monitor",De(y.view==="board"),z(y.view==="worker"),F(y.view==="monitor"),me(y.view==="board"||y.view==="worker"||$||!!y.selected_id),!y.selected_id&&y.view==="board"&&C.load(),y.view==="worker"&&H.load(),y.view==="monitor"?oe.load():oe.pause(),window.localStorage.setItem("beads-ui.view",y.view)};st.subscribe(et),et(st.getState()),Z(),mt(),vt(),Gt().finally(()=>{Ie=!0,ze()}),window.addEventListener("keydown",y=>{let v=y.ctrlKey||y.metaKey,m=String(y.key||"").toLowerCase(),L=y.target,R=L&&L.tagName?String(L.tagName).toLowerCase():"",re=R==="input"||R==="textarea"||R==="select"||L&&typeof L.isContentEditable=="boolean"&&L.isContentEditable;v&&m==="n"&&(re||(y.preventDefault(),l.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Cg(t)});export{Cg as bootstrap,Sg as readBootstrapConfig,Eg as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
