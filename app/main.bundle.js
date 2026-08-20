var cu=Object.create;var uo=Object.defineProperty;var du=Object.getOwnPropertyDescriptor;var uu=Object.getOwnPropertyNames;var pu=Object.getPrototypeOf,fu=Object.prototype.hasOwnProperty;var _u=(e,t,r)=>t in e?uo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var po=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var mu=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of uu(t))!fu.call(e,s)&&s!==r&&uo(e,s,{get:()=>t[s],enumerable:!(n=du(t,s))||n.enumerable});return e};var gu=(e,t,r)=>(r=e!=null?cu(pu(e)):{},mu(t||!e||!e.__esModule?uo(r,"default",{value:e,enumerable:!0}):r,e));var ct=(e,t,r)=>_u(e,typeof t!="symbol"?t+"":t,r);var wi=po((vg,vi)=>{var Vr=1e3,Kr=Vr*60,Yr=Kr*60,Dr=Yr*24,yu=Dr*7,vu=Dr*365.25;vi.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return wu(e);if(r==="number"&&isFinite(e))return t.long?$u(e):ku(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function wu(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*vu;case"weeks":case"week":case"w":return r*yu;case"days":case"day":case"d":return r*Dr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Yr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Kr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Vr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function ku(e){var t=Math.abs(e);return t>=Dr?Math.round(e/Dr)+"d":t>=Yr?Math.round(e/Yr)+"h":t>=Kr?Math.round(e/Kr)+"m":t>=Vr?Math.round(e/Vr)+"s":e+"ms"}function $u(e){var t=Math.abs(e);return t>=Dr?ns(e,t,Dr,"day"):t>=Yr?ns(e,t,Yr,"hour"):t>=Kr?ns(e,t,Kr,"minute"):t>=Vr?ns(e,t,Vr,"second"):e+" ms"}function ns(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var $i=po((wg,ki)=>{function xu(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=i,r.humanize=wi(),r.destroy=d,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let f=0;for(let b=0;b<p.length;b++)f=(f<<5)-f+p.charCodeAt(b),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=t;function r(p){let f,b=null,R,E;function P(...j){if(!P.enabled)return;let J=P,Z=Number(new Date),W=Z-(f||Z);J.diff=W,J.prev=f,J.curr=Z,f=Z,j[0]=r.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let L=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(N,k)=>{if(N==="%%")return"%";L++;let U=r.formatters[k];if(typeof U=="function"){let oe=j[L];N=U.call(J,oe),j.splice(L,1),L--}return N}),r.formatArgs.call(J,j),(J.log||r.log).apply(J,j)}return P.namespace=p,P.useColors=r.useColors(),P.color=r.selectColor(p),P.extend=n,P.destroy=r.destroy,Object.defineProperty(P,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(R!==r.namespaces&&(R=r.namespaces,E=r.enabled(p)),E),set:j=>{b=j}}),typeof r.init=="function"&&r.init(P),P}function n(p,f){let b=r(this.namespace+(typeof f>"u"?":":f)+p);return b.log=this.log,b}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of f)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(p,f){let b=0,R=0,E=-1,P=0;for(;b<p.length;)if(R<f.length&&(f[R]===p[b]||f[R]==="*"))f[R]==="*"?(E=R,P=b,R++):(b++,R++);else if(E!==-1)R=E+1,P++,b=P;else return!1;for(;R<f.length&&f[R]==="*";)R++;return R===f.length}function a(){let p=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),p}function i(p){for(let f of r.skips)if(o(p,f))return!1;for(let f of r.names)if(o(p,f))return!0;return!1}function l(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}ki.exports=xu});var xi=po((Pt,ss)=>{Pt.formatArgs=Su;Pt.save=Eu;Pt.load=Tu;Pt.useColors=Au;Pt.storage=Cu();Pt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Pt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Au(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Su(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ss.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Pt.log=console.debug||console.log||(()=>{});function Eu(e){try{e?Pt.storage.setItem("debug",e):Pt.storage.removeItem("debug")}catch{}}function Tu(){let e;try{e=Pt.storage.getItem("debug")||Pt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Cu(){try{return localStorage}catch{}}ss.exports=$i()(Pt);var{formatters:Ru}=ss.exports;Ru.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var un=globalThis,Xn=un.trustedTypes,oi=Xn?Xn.createPolicy("lit-html",{createHTML:e=>e}):void 0,_o="$lit$",fr=`lit$${Math.random().toFixed(9).slice(2)}$`,mo="?"+fr,bu=`<${mo}>`,Lr=document,pn=()=>Lr.createComment(""),fn=e=>e===null||typeof e!="object"&&typeof e!="function",go=Array.isArray,ui=e=>go(e)||typeof e?.[Symbol.iterator]=="function",fo=`[ 	
\f\r]`,dn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ai=/-->/g,ii=/>/g,Rr=RegExp(`>|${fo}(?:([^\\s"'>=/]+)(${fo}*=${fo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),li=/'/g,ci=/"/g,pi=/^(?:script|style|textarea|title)$/i,bo=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=bo(1),kr=bo(2),fg=bo(3),Ut=Symbol.for("lit-noChange"),_t=Symbol.for("lit-nothing"),di=new WeakMap,Ir=Lr.createTreeWalker(Lr,129);function fi(e,t){if(!go(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return oi!==void 0?oi.createHTML(t):t}var _i=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=dn;for(let i=0;i<r;i++){let l=e[i],d,p,f=-1,b=0;for(;b<l.length&&(a.lastIndex=b,p=a.exec(l),p!==null);)b=a.lastIndex,a===dn?p[1]==="!--"?a=ai:p[1]!==void 0?a=ii:p[2]!==void 0?(pi.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=Rr):p[3]!==void 0&&(a=Rr):a===Rr?p[0]===">"?(a=s??dn,f=-1):p[1]===void 0?f=-2:(f=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?Rr:p[3]==='"'?ci:li):a===ci||a===li?a=Rr:a===ai||a===ii?a=dn:(a=Rr,s=void 0);let R=a===Rr&&e[i+1].startsWith("/>")?" ":"";o+=a===dn?l+bu:f>=0?(n.push(d),l.slice(0,f)+_o+l.slice(f)+fr+R):l+fr+(f===-2?i:R)}return[fi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},_n=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[d,p]=_i(t,r);if(this.el=e.createElement(d,n),Ir.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=Ir.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(_o)){let b=p[a++],R=s.getAttribute(f).split(fr),E=/([.?@])?(.*)/.exec(b);l.push({type:1,index:o,name:E[2],strings:R,ctor:E[1]==="."?Jn:E[1]==="?"?es:E[1]==="@"?ts:Mr}),s.removeAttribute(f)}else f.startsWith(fr)&&(l.push({type:6,index:o}),s.removeAttribute(f));if(pi.test(s.tagName)){let f=s.textContent.split(fr),b=f.length-1;if(b>0){s.textContent=Xn?Xn.emptyScript:"";for(let R=0;R<b;R++)s.append(f[R],pn()),Ir.nextNode(),l.push({type:2,index:++o});s.append(f[b],pn())}}}else if(s.nodeType===8)if(s.data===mo)l.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(fr,f+1))!==-1;)l.push({type:7,index:o}),f+=fr.length-1}o++}}static createElement(t,r){let n=Lr.createElement("template");return n.innerHTML=t,n}};function Or(e,t,r=e,n){if(t===Ut)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=fn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Or(e,s._$AS(e,t.values),s,n)),t}var Qn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Lr).importNode(r,!0);Ir.currentNode=s;let o=Ir.nextNode(),a=0,i=0,l=n[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new Gr(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new rs(o,this,t)),this._$AV.push(d),l=n[++i]}a!==l?.index&&(o=Ir.nextNode(),a++)}return Ir.currentNode=Lr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Gr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=_t,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Or(this,t,r),fn(t)?t===_t||t==null||t===""?(this._$AH!==_t&&this._$AR(),this._$AH=_t):t!==this._$AH&&t!==Ut&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ui(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==_t&&fn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Lr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=_n.createElement(fi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Qn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=di.get(t.strings);return r===void 0&&di.set(t.strings,r=new _n(t)),r}k(t){go(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(pn()),this.O(pn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Mr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=_t,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=_t}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Or(this,t,r,0),a=!fn(t)||t!==this._$AH&&t!==Ut,a&&(this._$AH=t);else{let i=t,l,d;for(t=o[0],l=0;l<o.length-1;l++)d=Or(this,i[n+l],r,l),d===Ut&&(d=this._$AH[l]),a||(a=!fn(d)||d!==this._$AH[l]),d===_t?t=_t:t!==_t&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}a&&!s&&this.j(t)}j(t){t===_t?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Jn=class extends Mr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===_t?void 0:t}},es=class extends Mr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==_t)}},ts=class extends Mr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Or(this,t,r,0)??_t)===Ut)return;let n=this._$AH,s=t===_t&&n!==_t||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==_t&&(n===_t||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rs=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Or(this,t)}},mi={M:_o,P:fr,A:mo,C:1,L:_i,R:Qn,D:ui,V:Or,I:Gr,H:Mr,N:es,U:ts,B:Jn,F:rs},hu=un.litHtmlPolyfillSupport;hu?.(_n,Gr),(un.litHtmlVersions??(un.litHtmlVersions=[])).push("3.3.1");var Ke=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Gr(t.insertBefore(pn(),o),o,void 0,r??{})}return s._$AI(e),s};var Dt="today",or=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Wt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Pr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function gi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function bi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function hi(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function yi(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Ai=gu(xi(),1);function ft(e){return(0,Ai.default)(`beads-ui:${e}`)}function Yt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Nr(e,t){let r=Yt(e.created_at),n=Yt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ti(e,t){let r=Yt(e.created_at),n=Yt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ci(e,t){let r=Yt(e.updated_at),n=Yt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ri(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Yt(e.created_at),o=Yt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ii(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Iu=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Si(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ei(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Iu.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Li(e,t){let r=Si(e),n=Si(t);if(r!==n)return r<n?-1:1;let s=Ei(e),o=Ei(t);if(s!==o)return s<o?-1:1;let a=Yt(e&&e.created_at),i=Yt(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,d=t&&t.id;return l===d?0:String(l)<String(d)?-1:1}var ho=2**20;function Zr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Yt(e&&e.created_at)}function os(e){return(t,r)=>{let n=Zr(t,e),s=Zr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function yo(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Zr(i,r)-ho};if(!i)return{rank:Zr(a,r)+ho};let l=Zr(a,r),d=Zr(i,r),p=(l+d)/2;return l<p&&p<d?{rank:p}:{renormalize:n.map((f,b)=>({bead_id:f.id,rank:b*ho}))}}function vo(e,t={}){let r=ft(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||Nr;function d(){for(let b of Array.from(a))try{b()}catch{}}function p(){s=Array.from(n.values()).sort(l)}function f(b){if(i||!b||b.id!==e)return;let R=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,R),!(R<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(R<=o)return;n.clear();let E=Array.isArray(b.issues)?b.issues:[];for(let P of E)P&&typeof P.id=="string"&&P.id.length>0&&n.set(P.id,P);p(),o=R,d();return}if(b.type==="upsert"){let E=b.issue;if(E&&typeof E.id=="string"&&E.id.length>0){let P=n.get(E.id);if(!P)n.set(E.id,E);else{let j=Number.isFinite(P.updated_at)?P.updated_at:0,J=Number.isFinite(E.updated_at)?E.updated_at:0;if(j<=J){for(let Z of Object.keys(P))Z in E||delete P[Z];for(let[Z,W]of Object.entries(E))P[Z]=W}}p()}o=R,d()}else if(b.type==="delete"){let E=String(b.issue_id||"");E&&(n.delete(E),p()),o=R,d()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function as(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Oi(e){let t=ft("subs"),r=new Map,n=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let d=n.get(i);if(!d||d.size===0)return;let p=Array.isArray(l.added)?l.added:[],f=Array.isArray(l.updated)?l.updated:[],b=Array.isArray(l.removed)?l.removed:[];for(let R of Array.from(d)){let E=r.get(R);if(!E)continue;let P=E.itemsById;for(let j of p)typeof j=="string"&&j.length>0&&P.set(j,!0);for(let j of f)typeof j=="string"&&j.length>0&&P.set(j,!0);for(let j of b)typeof j=="string"&&j.length>0&&P.delete(j)}}async function o(i,l){let d=as(l);if(t("subscribe %s key=%s",i,d),!r.has(i))r.set(i,{key:d,itemsById:new Map});else{let f=r.get(i);if(f&&f.key!==d){let b=n.get(f.key);b&&(b.delete(i),b.size===0&&n.delete(f.key)),r.set(i,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let p=n.get(d);p&&p.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(f){let b=r.get(i)||null;if(b){let R=n.get(b.key);R&&(R.delete(i),R.size===0&&n.delete(b.key))}throw r.delete(i),f}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let f=r.get(i)||null;if(f){let b=n.get(f.key);b&&(b.delete(i),b.size===0&&n.delete(f.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:as,selectors:{getIds(i){let l=r.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let d=r.get(i);return d?d.itemsById.has(l):!1},count(i){let l=r.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=r.get(i),d={};if(!l)return d;for(let p of l.itemsById.keys())d[p]=!0;return d}}}}function Mi(){let e=ft("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,d,p){let f=d?as(d):"",b=r.get(l)||"",R=t.has(l);if(e("register %s key=%s (prev=%s)",l,f,b),R&&b&&f&&b!==f){let E=t.get(l);if(E)try{E.dispose()}catch{}let P=s.get(l);if(P){try{P()}catch{}s.delete(l)}let j=vo(l,p);t.set(l,j);let J=j.subscribe(()=>o());s.set(l,J)}else if(!R){let E=vo(l,p);t.set(l,E);let P=E.subscribe(()=>o());s.set(l,P)}return r.set(l,f),()=>i(l)}function i(l){e("unregister %s",l),r.delete(l);let d=t.get(l);d&&(d.dispose(),t.delete(l));let p=s.get(l);if(p){try{p()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let d=t.get(l);return d?d.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function Pi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Di(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ni(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function wo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Lu(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Ou(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function qi(e){let t=ft("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Lu(n),a=Ou(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=wo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?wo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Mu=Object.freeze({workspace_config:{default_workspace:null}});function Fi(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Mu.workspace_config.default_workspace}}}function ji(e={}){let t=ft("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Fi(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Fi(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==r.workspace.hidden[p]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===r.worker.show_closed_children[p])&&!i&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Bi(e){let t=ft("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function l(d){return async(f,b)=>{let R=s++,E=Date.now();n.set(R,{type:f,start_ts:E}),t("request start id=%d type=%s count=%d",R,f,r+1),a();let P=!1,j=()=>{P||(P=!0,n.delete(R),i())},J=setTimeout(()=>{P||(t("request TIMEOUT id=%d type=%s elapsed=%dms",R,f,Date.now()-E),j())},3e4);try{let Z=await d(f,b),W=Date.now()-E;return t("request done id=%d type=%s elapsed=%dms",R,f,W),Z}catch(Z){let W=Date.now()-E;throw t("request error id=%d type=%s elapsed=%dms err=%o",R,f,W,Z),Z}finally{clearTimeout(J),j()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:d-f.start_ts}))}}}function ae(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function is(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Ii),l;switch(i){case"created_desc":return l.sort(Nr),l;case"created_asc":return l.sort(Ti),l;case"updated_desc":return l.sort(Ci),l;case"priority":return l.sort(Ri),l;case"manual":default:{let d=r();return d?l.sort(os(d)):l.sort(Nr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function qr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function vt(e){let t=qr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Nt(e,t){let r=qr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function ls(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=qr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function cs(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let d of i)l[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},p=n(yo(i,l,d.order),a);s(d,p);let f=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(f&&f.conflict){let b={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(b);let R=n(yo(i,l,b.order),a);s(b,R);let E=await t("ui-order-set",{expected_revision:b.revision,entries:R});E&&E.applied&&r.set({revision:typeof E.revision=="number"?E.revision:0,order:E.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function ds(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ko(e,t){return!t||typeof e!="string"||e.length===0||ds(t.visible_labels).includes(e)?!0:ds(t.hidden_labels).includes(e)?!1:!ds(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function us(e,t){return ds(e).filter(r=>ko(r,t))}function $r(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Pu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Wi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ui={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Du={review:"\u2713",skip:"\u2298"},xr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Nu(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function zi(e){let t=e&&e.fill||"none";return t==="none"?xr.none:e&&e.stale===!0?xr.stale:t==="dim"?xr.dim:e&&e.glyph==="review"?xr.review:e&&e.glyph==="skip"?xr.skip:xr.done}function qu(e){if(!e||e.fill==="none"||!e.approval_state)return zi(e);let t=[];return e.glyph==="review"?t.push(xr.review):e.glyph==="skip"&&t.push(xr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Fu(e,t,r){let n=Pu[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Du[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${i} style=${d}>${a}</div>
      <div class=${l}>
        ${Wi[e]||e}
      </div>
    </div>
  `}function ps(e,t){if(!e||!e.stages)return"";let r=Ui[e.route]||Ui.spec_backed,n=e.stages,s=Nu(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Wi[a]||a} ${a==="plan"?qu(n[a]||{}):zi(n[a]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Fu(a,n[a]||{},a===s))}
    </div>
  `}function ju(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Hi=2;function Bu(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Hi).join(", "),s=r.length-Hi,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function $o(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function fs(e,t){if(!e)return null;let r=$o(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=$o(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${t.kind}:${t.actor}@${t.sha}`:"";return{kind:e.kind,label:i,title:`${l}${d}`}}function Gi(e,t){let r=fs(e,t);return r?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function Uu(e){if(!e)return null;let t=$o(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${e.kind}:${e.actor}@${e.sha}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Wu(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&$r(r,"route")){let i=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&$r(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&$r(r,"pr")){let i=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Gi(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let i=n.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${i.kind}:${i.actor}@${i.sha}`}
        >${`exec ${i.kind==="delegated"?i.actor:`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let i=n.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of us(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&$r(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),$r(r,"blocked")&&s.push(...Bu(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&$r(r,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function zu(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Hu(e){let t=Nt(e.created_at),r=Nt(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${vt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${vt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Gu(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Li):r.children;return c`
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
        ${Hu(e)}
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
                  <span class=${zu(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${fs(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?c`<span class="board-card__roll-child-chips">
                        ${Gi(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${Uu(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function _s(e,t){let r=ju(e.priority);return c`
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
      ${Wu(e,t)}
      ${e.workflow&&$r(t.policy||null,"stepper")?ps(e.workflow,e.status):""}
      ${Gu(e,t)}
    </article>
  `}function Xr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
              ${or.map(o=>c`<option
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
        ${e.items.map(o=>_s(o,t))}
      </div>
    </section>
  `}function Vi(e,t,r){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>_s(n,t))}
        </div>
      </div>
    </dialog>
  `}var Vu=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Ku=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Yu=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Zu(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
  `}function Ki(e,t,r){return c`
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
        ${Vu.map(n=>c`<option
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
        ${Ku.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Zu(e,t,r)}
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
        ${Yu.map(n=>c`<option
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
  `}var Xu=200,Qu={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Ju=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Yi="beads-ui.board.sort",Zi=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ep(){try{let e=window.localStorage.getItem(Yi);if(e&&Zi.has(e))return e}catch{}return"created_desc"}function Xi(e,t){let r=ft("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,f=t.closedRange||Dt,b=s?is(s,a):null,R=cs({transport:o,uiOrderStore:a}),E=[],P=[],j=[],J=[],Z=[],W=[],L=!1,S=0,N=ep(),k=new Map,U=new Map,oe=new Map,ce=new Set,Q={search:"",priority:"",type:"",labels:[]},se=!1,Ie=null;function Ve(B){return String(B.status||"open")==="open"}function Qe(B){let X=String(B.status||"open");return X==="open"||X==="blocked"}function at(B){let X=Q.search.trim().toLowerCase(),w=Q.priority,T=Q.type,D=Q.labels;return B.filter(q=>{if(X){let be=String(q.id||"").toLowerCase(),ve=String(q.title||"").toLowerCase();if(!be.includes(X)&&!ve.includes(X))return!1}if(w!==""&&String(q.priority)!==w||T!==""&&String(q.issue_type||"")!==T)return!1;if(D.length>0){let be=Array.isArray(q.labels)?q.labels:[];if(!D.some(ve=>be.includes(ve)))return!1}return!0})}function tt(){let B=new Set;for(let X of[E,P,j,J,Z,W])for(let w of X){let T=Array.isArray(w.labels)?w.labels:[];for(let D of T)typeof D=="string"&&D.length>0&&B.add(D)}return Array.from(B).sort()}function st(){return Q.search.trim()!==""||Q.priority!==""||Q.type!==""||Q.labels.length>0}function fe(){try{if(b){let B=b.selectBoardColumn("tab:board:in-progress","in_progress",N),X=b.selectBoardColumn("tab:board:blocked","blocked",N).filter(Qe),w=new Set(B.map(Ae=>Ae.id)),T=b.selectBoardColumn("tab:board:ready","ready",N).filter(Ae=>Ve(Ae)&&!w.has(Ae.id)),D=b.selectBoardColumn("tab:board:resolved","resolved",N),q=b.selectBoardColumn("tab:board:deferred","deferred",N),be=b.selectBoardColumn("tab:board:closed","closed").slice(0,Xu),ve=[...X,...T,...B,...D,...be];Pe(ve);let le=new Set;for(let Ae of ve)Ae&&Ae.id&&!xo(Ae)&&le.add(Ae.id);let nt=!st();E=nt?mn(X,le):X,P=nt?mn(T,le):T,j=nt?mn(B,le):B,J=nt?mn(D,le):D,Z=q,S=q.length,W=nt?mn(be,le):be,k=new Map;for(let Ae of E)k.set(Ae.id,"open");for(let Ae of P)k.set(Ae.id,"open");for(let Ae of j)k.set(Ae.id,"in_progress");for(let Ae of J)k.set(Ae.id,"resolved");for(let Ae of Z)k.set(Ae.id,"deferred");for(let Ae of W)k.set(Ae.id,"closed");U=new Map;for(let Ae of E)U.set(Ae.id,"blocked-col");for(let Ae of P)U.set(Ae.id,"ready-col");for(let Ae of j)U.set(Ae.id,"in-progress-col");for(let Ae of J)U.set(Ae.id,"resolved-col");for(let Ae of W)U.set(Ae.id,"closed-col")}M()}catch{E=[],P=[],j=[],J=[],Z=[],W=[],oe=new Map,M()}}function Pe(B){let X=new Map;for(let T of B)T&&T.id&&!X.has(T.id)&&X.set(T.id,T);let w=new Map;for(let T of X.values()){let D=xo(T);if(!D)continue;let q=w.get(D);q||(q=[],w.set(D,q)),q.push({id:T.id,title:T.title,status:T.status,metadata:T.metadata,workflow:T.workflow,created_at:T.created_at,updated_at:T.updated_at})}oe=w}function ue(B){let X=oe.get(B)||[],w=0;for(let D of X)(D.status==="resolved"||D.status==="closed")&&(w+=1);let T=ls(X);return{total:X.length,count:w,current:T,children:X}}function Ee(B){return!ce.has(B)}function xe(B,X){B.preventDefault(),B.stopPropagation(),ce.has(X)?ce.delete(X):ce.add(X),M()}function qe(B,X){B.preventDefault(),B.stopPropagation(),n(X)}function he(B,X){B.preventDefault(),B.stopPropagation(),n(X)}function Fe(B,X){Ie||n(X)}function Le(B,X){B.preventDefault(),B.stopPropagation(),tp(X).then(w=>{w&&ae("\uBCF5\uC0AC\uB428","success",1200)})}function _e(B,X){Ie=X,B.dataTransfer&&(B.dataTransfer.setData("text/plain",X),B.dataTransfer.effectAllowed="move"),B.target.classList.add("board-card--dragging")}function ye(B){B.target.classList.remove("board-card--dragging"),me(),setTimeout(()=>{Ie=null},0)}function H(B){let X=String(B.target.value||"");!X||X===f||(f=X,d&&d(X),M())}function K(){return i?i.get():null}function ge(B){let X=l?l.get():null,w=X?X.cleanup_failed:null;if(!w||typeof w!="object"||Array.isArray(w))return null;let T=w[B];return!T||typeof T!="object"||Array.isArray(T)?null:T}let Ce={onCardClick:Fe,onCopyId:Le,onDragStart:_e,onDragEnd:ye,onClosedRangeChange:H,rollupFor:ue,isExpanded:Ee,onRollupToggle:xe,onChildClick:qe,onFromChipClick:he,cleanupFailureFor:ge,get policy(){return K()}};function je(B,X){Ie||(pe(),n(X))}function We(B,X){B.preventDefault(),B.stopPropagation(),pe(),n(X)}let $e={...Ce,onCardClick:je,onChildClick:We,onFromChipClick:We,get policy(){return K()}};function Je(B){let X=B.target,w=e.querySelector(".board-filter__labels");X&&w&&w.contains(X)||te()}function rt(B){B.key==="Escape"&&te()}function z(){se||(se=!0,document.addEventListener("mousedown",Je),document.addEventListener("keydown",rt),M())}function te(){se&&(se=!1,document.removeEventListener("mousedown",Je),document.removeEventListener("keydown",rt),M())}function Te(B){B.key==="Escape"&&pe()}function Be(){L||(L=!0,document.addEventListener("keydown",Te),M())}function pe(){L&&(L=!1,document.removeEventListener("keydown",Te),M())}let m={onClose:pe,onOverlayClick(B){B.target===B.currentTarget&&pe()}},v={onSearchInput(B){Q.search=String(B.target.value||""),fe()},onPriorityChange(B){Q.priority=String(B.target.value||""),fe()},onTypeChange(B){Q.type=String(B.target.value||""),fe()},onSortChange(B){let X=String(B.target.value||"");if(!(!Zi.has(X)||X===N)){N=X;try{window.localStorage.setItem(Yi,X)}catch{}fe()}},onDeferredToggle(){L?pe():Be()},onLabelMenuToggle(){se?te():z()},onLabelToggle(B){let X=Q.labels.indexOf(B);X===-1?Q.labels.push(B):Q.labels.splice(X,1),fe()},onLabelClear(){Q.labels.length!==0&&(Q.labels=[],fe())},onNewIssue(){p&&p()}};function A(){return c`
      <div class="board-view">
        ${Ki(Q,v,{sort_mode:N,deferred_popup_open:L,deferred_count:S,label_options:tt(),label_menu_open:se})}
        <div class="board-root">
          ${Xr({title:"Blocked",id:"blocked-col",items:at(E)},Ce)}
          ${Xr({title:"Ready",id:"ready-col",items:at(P)},Ce)}
          ${Xr({title:"In progress",id:"in-progress-col",items:at(j)},Ce)}
          ${Xr({title:"Resolved",id:"resolved-col",items:at(J)},Ce)}
          ${Xr({title:"Closed",id:"closed-col",items:at(W),is_closed:!0,closed_range:f},Ce)}
        </div>
        ${L?Vi({items:at(Z),count:S},$e,m):""}
      </div>
    `}function M(){Ke(A(),e),G()}function G(){try{let B=e.querySelector("#deferred-popup");B&&!B.open&&(typeof B.showModal=="function"?B.showModal():B.setAttribute("open",""));let X=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let w of X)Array.from(w.querySelectorAll(".board-card")).forEach((D,q)=>{D.tabIndex=q===0?0:-1})}catch{}}async function Y(B,X){if(!o){ae("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:B,status:X}),ae("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(w){r("update-status failed: %o",w),ae("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ne(B){switch(B){case"blocked-col":return E;case"ready-col":return P;case"in-progress-col":return j;case"resolved-col":return J;default:return[]}}function re(B,X,w){if(!o||!a)return;let T=ne(B),D=T.find(nt=>nt.id===X);if(!D)return;let q=T.filter(nt=>nt.id!==X),be=w.closest?w.closest(".board-card"):null,ve=q.length;if(be){let nt=be.getAttribute("data-issue-id");if(nt===X)return;let Ae=q.findIndex(gt=>gt.id===nt);Ae>=0&&(ve=Ae)}let le=q.slice();le.splice(ve,0,D),R.applyReorder(X,le,ve)}function me(){for(let B of Array.from(e.querySelectorAll(".board-column--drag-over")))B.classList.remove("board-column--drag-over")}let Se=null;e.addEventListener("dragover",B=>{B.preventDefault(),B.dataTransfer&&(B.dataTransfer.dropEffect="move");let w=B.target.closest(".board-column");w&&w!==Se&&(Se&&Se.classList.remove("board-column--drag-over"),w.classList.add("board-column--drag-over"),Se=w)}),e.addEventListener("dragleave",B=>{let X=B.relatedTarget;(!X||!e.contains(X))&&Se&&(Se.classList.remove("board-column--drag-over"),Se=null)}),e.addEventListener("drop",B=>{B.preventDefault(),Se&&(Se.classList.remove("board-column--drag-over"),Se=null);let X=B.target,w=X.closest(".board-column");if(!w)return;let T=B.dataTransfer?.getData("text/plain")||"";if(!T)return;let D=w.id,q=U.get(T);if(q&&q===D){if(Ju.has(D)){if(N!=="manual"){ae("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}re(D,T,X)}return}let be=Qu[D];if(!be){ae("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}k.get(T)!==be&&Y(T,be)}),e.addEventListener("keydown",B=>{let X=B.target;if(!(X instanceof HTMLElement))return;let w=String(X.tagName||"").toLowerCase();if(w==="input"||w==="textarea"||w==="select"||w==="button"||w==="a"||X.isContentEditable===!0)return;let T=X.closest(".board-card");if(!T)return;let D=String(B.key||"");if(D==="Enter"||D===" "){B.preventDefault();let le=T.getAttribute("data-issue-id");le&&n(le);return}if(D!=="ArrowUp"&&D!=="ArrowDown"&&D!=="ArrowLeft"&&D!=="ArrowRight")return;B.preventDefault();let q=T.closest(".board-column");if(!q)return;let be=Array.from(q.querySelectorAll(".board-card")),ve=be.indexOf(T);if(D==="ArrowDown"&&ve<be.length-1){De(T,be[ve+1]);return}if(D==="ArrowUp"&&ve>0){De(T,be[ve-1]);return}if(D==="ArrowLeft"||D==="ArrowRight"){let le=Array.from(e.querySelectorAll(".board-column")),nt=le.indexOf(q),Ae=D==="ArrowRight"?1:-1,gt=nt+Ae;for(;gt>=0&&gt<le.length;){let Ge=le[gt].querySelector(".board-card");if(Ge){De(T,Ge);return}gt+=Ae}}});function De(B,X){try{B.tabIndex=-1,X.tabIndex=0,X.focus()}catch{}}let Ne=null;b&&b.subscribe&&(Ne=b.subscribe(()=>{try{fe()}catch{}}));let ze=null;i&&i.subscribe&&(ze=i.subscribe(()=>{try{fe()}catch{}}));let et=null;return l&&l.subscribe&&(et=l.subscribe(()=>{M()})),{async load(){r("load"),fe()},clear(){te(),pe(),Ne&&(Ne(),Ne=null),ze&&(ze(),ze=null),et&&(et(),et=null),e.replaceChildren(),E=[],P=[],j=[],J=[],Z=[],W=[],k=new Map,U=new Map}}}function xo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function mn(e,t){return e.filter(r=>{let n=xo(r);return!(n&&t.has(n))})}async function tp(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Zt(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function ar(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Ar(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function rp(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${ar(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ar(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(l=>{let d=p=>{typeof r.close=="function"&&r.close(),r.remove(),l(p)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function _r(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await rp(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var np=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","orchestration_model","orchestration_effort","orchestration_speed"],Qi={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},sp=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Ct(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function St(e){return typeof e=="string"&&e.length>0?e:null}function ms(e){return e.startsWith("gpt-")?e.slice(4):e}function ht(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function rl(e,t,r){let n=St(t[e]);if(n!==null)return{value:n,source:"pin"};let s=St(r[e]);return s===null?null:{value:s,source:"global"}}function gn(e,t,r,n){return rl(e,t,r)||{value:n,source:"base"}}function Ji(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&Ct(s?.[t])){let a=St(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Ct(s)){for(let a of Object.values(s))if(Ct(a)){let i=St(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return St(n?.runners?.[o]?.models?.[e]?.id)||e}function op(e,t){return St(t?.review?.reviewers?.[e]?.model)||e}function bn(e,t,r=!1){if(e==="default")return ht(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?ms(e):e;return ht(e,t,n,e,"explicit")}function ap(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];Ct(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(Ct(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function el(e){return ht(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function tl(e,t,r){let n=rl(e,t,r);return n?bn(n.value,n.source):ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Qr(e){let t=Ct(e.pin)?e.pin:{},r=Ct(e.global)?e.global:{},n=Ct(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&Ct(n.session)?n.session:null,o=n?.supported===!0&&Ct(n.orchestration)?n.orchestration:null,a=Ct(e.runner_catalog)?e.runner_catalog:null,i={};if(s){let l=gn("workflow_mode",t,r,St(s.workflow_mode_default));i.workflow_mode=l.source==="base"?ht(l.value,"base",l.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",l.value,"default"):bn(l.value,l.source);for(let p of["spec_review","plan_review","impl_review"]){let f=`${p}_model`,b=St(p==="plan_review"?l.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),R=gn(f,t,r,b);if(R.value===null)i[f]=ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(R.value!=="self"&&R.value!=="skip"&&!Ct(s.review?.reviewers?.[R.value]))i[f]=el(ht(R.value,R.source,"",null,"explicit"));else{let E=op(R.value,s);i[f]=ht(R.value,R.source,ms(E),E,R.source==="base"?"default":"explicit")}}for(let[p,f]of Object.entries(Qi)){let b=i[f].value;if(b==="self"||b==="skip"){i[p]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let R=St(s.review?.reviewers?.[b||""]?.effort),E=gn(p,t,r,R);i[p]=E.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht(E.value,E.source,E.value,E.value,E.source==="base"?"default":"explicit")}let d=Ct(s.implementation?.default)?s.implementation.default:{};for(let p of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let f=gn(p,t,r,St(d[p.replace("impl_","")]));i[p]=f.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht(f.value,f.source,f.value,f.value,f.source==="base"?"default":"explicit")}if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])i[p]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_model.value!==null){let p=i.impl_runtime.value==="inherit"?St(e.controller_runtime):i.impl_runtime.value,f=p?ap(p,s,a):[];if(i.impl_model.value!=="auto"&&f.length>0&&!f.includes(i.impl_model.value))i.impl_model=el(i.impl_model);else{let b=Ji(i.impl_model.value,p,s,a);i.impl_model.display=ms(b),i.impl_model.full_value=b}}if(i.impl_effort.value==="auto"){let p=St(e.transport)||(i.impl_runtime.value==="codex"?"codex-native-spawn":i.impl_runtime.value==="claude"?"implement-claude":null),f=p?St(s.implementation?.effort_by_transport?.[p]?.auto):null;f&&!sp.has(f)?(i.impl_effort.display=`${f} (\uBE44\uD638\uD658)`,i.impl_effort.full_value=f,i.impl_effort.resolution="incompatible"):(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}i.impl_speed.value==="default"&&(i.impl_speed=i.impl_speed.source==="base"?ht("default","base","default (\uC77C\uBC18)","default","default"):bn("default",i.impl_speed.source))}}else for(let l of np.filter(d=>!d.startsWith("orchestration_")))i[l]=tl(l,t,r);if(!s){for(let[l,d]of Object.entries(Qi))(i[d].value==="self"||i[d].value==="skip")&&(i[l]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let l of["impl_runtime","impl_model","impl_effort","impl_speed"])i[l]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_effort.value==="auto"&&(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}for(let l of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){i[l]=tl(l,t,r);continue}let d=l.replace("orchestration_",""),p=St(o[d]),f=gn(l,t,r,p);if(l==="orchestration_effort"&&f.source==="base"){i[l]=ht(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(f.value===null){i[l]=ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(l==="orchestration_model"){let b=f.source==="base"?St(o.model_id)||f.value:Ji(f.value,null,s,a);i[l]=ht(f.value,f.source,ms(b),b,f.source==="base"?"default":"explicit");continue}if(f.value==="default"){i[l]=f.source==="base"?ht("default","base","default (\uC77C\uBC18)","default","default"):bn("default",f.source);continue}i[l]=bn(f.value,f.source)}return i}function ip(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function gs(e){let t=Ct(e.pin)?e.pin:{},r=Ct(e.global)?e.global:{},n=p=>Qr({pin:e.layer==="pin"?p:t,global:e.layer==="pin"?r:p,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,controller_runtime:e.controller_runtime}),s=e.layer==="pin"?t:r,o={...s};delete o[e.key];let a=n(o)[e.key],i=n(s)[e.key],l=St(s[e.key]),d=[...e.choices];return l!==null&&!d.includes(l)&&d.unshift(l),{unset_label:ip(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:i?.resolution==="not_applicable",options:d.map(p=>{let f=n({...s,[e.key]:p})[e.key];return{value:p,label:f.display,full_value:f.full_value}})}}function Jr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(i=>{let l=!1,d=f=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(f))},p=()=>d(n.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>d(null)),n.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),p())}),t.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var il="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function wt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var mr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],hn=[...mr,"reasoning_output_tokens"],lp=["implementation","review-consult"];function Ao(e){let t=0;for(let r of mr)t+=wt(e?.[r]);return t}function cp(e){return!e||typeof e!="object"?!1:mr.some(t=>Number.isFinite(e[t]))}function nl(e){return!e||typeof e!="object"?!1:hn.some(t=>Number.isFinite(e[t]))}function dp(e){let t={};for(let r of hn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function sl(e){let t={};for(let r of hn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ol(e,t){return e==="codex"?wt(t.input_tokens)+wt(t.output_tokens):Ao(t)}function up(e){return e==="claude"?"Claude":"Codex"}function pp(e){return`\u03C4 ${ll(e)}`}function fp(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${wt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${wt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${wt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${wt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${wt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${wt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${wt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(il),o.join(`
`)}function kt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${up(r)} ${pp(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:fp(r,n)})}return t}function hs(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let l of hn)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=wt(i.breakdown[l])+wt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function So(e){return!e||typeof e!="object"?null:zt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function _p(e){return e==="codex"?"codex":"claude"}function Sr(){return{subtotal:0,breakdown:dp(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function bs(e,t,r){e.subtotal+=t.subtotal;for(let n of hn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=wt(e.breakdown[n])+wt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function al(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function ll(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function en(e){return cp(e)?`\u03C4 ${ll(Ao(e))}`:null}function Xt(e){let t=en(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function tn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${wt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${wt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${wt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${wt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Ao(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(il),r.join(`
`)}function zt(e,t){let r={claude:Sr(),codex:Sr()},n={orchestrator:{claude:Sr(),codex:Sr()},implementation:{claude:Sr(),codex:Sr()},"review-consult":{claude:Sr(),codex:Sr()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(nl(l)){let p=_p(i.runner),f=sl(l),b={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:f,subtotal:ol(p,f)};f.replayed===!0&&(b.replayed=!0),typeof i.model=="string"&&(b.model=i.model),typeof i.session_id=="string"&&(b.session_id=i.session_id),bs(r[p],b,!0),bs(n.orchestrator[p],b,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of d){if(!p||p.provider!=="codex"||!lp.includes(p.role)||!nl(p.usage))continue;let f=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!f||s.has(f))continue;s.add(f);let b=sl(p.usage),R={provider:"codex",role:p.role,attempt_id:String(i.attempt_id||""),usage:b,subtotal:ol("codex",b)};R.receipt_id=f,typeof p.model=="string"&&(R.model=p.model),typeof p.session_id=="string"?R.session_id=p.session_id:typeof p.thread_id=="string"&&(R.session_id=p.thread_id),typeof p.turn_id=="string"&&(R.turn_id=p.turn_id),typeof p.completed_at=="string"&&(R.completed_at=p.completed_at),b.replayed===!0&&(R.replayed=!0),bs(r.codex,R,!1),bs(n[R.role].codex,R,!1)}}let o={};for(let i of["claude","codex"]){let l=r[i];if(l.legs.length===0)continue;let d=al(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(d.total_cost_usd=l.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let l={};for(let d of["claude","codex"]){let p=n[i][d];p.legs.length>0&&(l[d]={...al(p,!0),legs:p.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:bl,setPrototypeOf:cl,isFrozen:mp,getPrototypeOf:gp,getOwnPropertyDescriptor:bp}=Object,{freeze:It,seal:Ht,create:Oo}=Object,{apply:Mo,construct:Po}=typeof Reflect<"u"&&Reflect;It||(It=function(t){return t});Ht||(Ht=function(t){return t});Mo||(Mo=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Po||(Po=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var ys=Lt(Array.prototype.forEach),hp=Lt(Array.prototype.lastIndexOf),dl=Lt(Array.prototype.pop),yn=Lt(Array.prototype.push),yp=Lt(Array.prototype.splice),ws=Lt(String.prototype.toLowerCase),Eo=Lt(String.prototype.toString),To=Lt(String.prototype.match),vn=Lt(String.prototype.replace),vp=Lt(String.prototype.indexOf),wp=Lt(String.prototype.trim),Qt=Lt(Object.prototype.hasOwnProperty),Rt=Lt(RegExp.prototype.test),wn=kp(TypeError);function Lt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Mo(e,t,n)}}function kp(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Po(e,r)}}function Xe(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ws;cl&&cl(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(mp(t)||(t[n]=o),s=o)}e[s]=!0}return e}function $p(e){for(let t=0;t<e.length;t++)Qt(e,t)||(e[t]=null);return e}function gr(e){let t=Oo(null);for(let[r,n]of bl(e))Qt(e,r)&&(Array.isArray(n)?t[r]=$p(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=gr(n):t[r]=n);return t}function kn(e,t){for(;e!==null;){let n=bp(e,t);if(n){if(n.get)return Lt(n.get);if(typeof n.value=="function")return Lt(n.value)}e=gp(e)}function r(){return null}return r}var ul=It(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Co=It(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ro=It(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),xp=It(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Io=It(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ap=It(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),pl=It(["#text"]),fl=It(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Lo=It(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),_l=It(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),vs=It(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Sp=Ht(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ep=Ht(/<%[\w\W]*|[\w\W]*%>/gm),Tp=Ht(/\$\{[\w\W]*/gm),Cp=Ht(/^data-[\-\w.\u00B7-\uFFFF]+$/),Rp=Ht(/^aria-[\-\w]+$/),hl=Ht(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ip=Ht(/^(?:\w+script|data):/i),Lp=Ht(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),yl=Ht(/^html$/i),Op=Ht(/^[a-z][.\w]*(-[.\w]+)+$/i),ml=Object.freeze({__proto__:null,ARIA_ATTR:Rp,ATTR_WHITESPACE:Lp,CUSTOM_ELEMENT:Op,DATA_ATTR:Cp,DOCTYPE_NAME:yl,ERB_EXPR:Ep,IS_ALLOWED_URI:hl,IS_SCRIPT_OR_DATA:Ip,MUSTACHE_EXPR:Sp,TMPLIT_EXPR:Tp}),$n={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Mp=function(){return typeof window>"u"?null:window},Pp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},gl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function vl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Mp(),t=I=>vl(I);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==$n.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:b,trustedTypes:R}=e,E=l.prototype,P=kn(E,"cloneNode"),j=kn(E,"remove"),J=kn(E,"nextSibling"),Z=kn(E,"childNodes"),W=kn(E,"parentNode");if(typeof a=="function"){let I=r.createElement("template");I.content&&I.content.ownerDocument&&(r=I.content.ownerDocument)}let L,S="",{implementation:N,createNodeIterator:k,createDocumentFragment:U,getElementsByTagName:oe}=r,{importNode:ce}=n,Q=gl();t.isSupported=typeof bl=="function"&&typeof W=="function"&&N&&N.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:se,ERB_EXPR:Ie,TMPLIT_EXPR:Ve,DATA_ATTR:Qe,ARIA_ATTR:at,IS_SCRIPT_OR_DATA:tt,ATTR_WHITESPACE:st,CUSTOM_ELEMENT:fe}=ml,{IS_ALLOWED_URI:Pe}=ml,ue=null,Ee=Xe({},[...ul,...Co,...Ro,...Io,...pl]),xe=null,qe=Xe({},[...fl,...Lo,..._l,...vs]),he=Object.seal(Oo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Fe=null,Le=null,_e=Object.seal(Oo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ye=!0,H=!0,K=!1,ge=!0,Ce=!1,je=!0,We=!1,$e=!1,Je=!1,rt=!1,z=!1,te=!1,Te=!0,Be=!1,pe="user-content-",m=!0,v=!1,A={},M=null,G=Xe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Y=null,ne=Xe({},["audio","video","img","source","image","track"]),re=null,me=Xe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Se="http://www.w3.org/1998/Math/MathML",De="http://www.w3.org/2000/svg",Ne="http://www.w3.org/1999/xhtml",ze=Ne,et=!1,B=null,X=Xe({},[Se,De,Ne],Eo),w=Xe({},["mi","mo","mn","ms","mtext"]),T=Xe({},["annotation-xml"]),D=Xe({},["title","style","font","a","script"]),q=null,be=["application/xhtml+xml","text/html"],ve="text/html",le=null,nt=null,Ae=r.createElement("form"),gt=function(g){return g instanceof RegExp||g instanceof Function},Ge=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(nt&&nt===g)){if((!g||typeof g!="object")&&(g={}),g=gr(g),q=be.indexOf(g.PARSER_MEDIA_TYPE)===-1?ve:g.PARSER_MEDIA_TYPE,le=q==="application/xhtml+xml"?Eo:ws,ue=Qt(g,"ALLOWED_TAGS")?Xe({},g.ALLOWED_TAGS,le):Ee,xe=Qt(g,"ALLOWED_ATTR")?Xe({},g.ALLOWED_ATTR,le):qe,B=Qt(g,"ALLOWED_NAMESPACES")?Xe({},g.ALLOWED_NAMESPACES,Eo):X,re=Qt(g,"ADD_URI_SAFE_ATTR")?Xe(gr(me),g.ADD_URI_SAFE_ATTR,le):me,Y=Qt(g,"ADD_DATA_URI_TAGS")?Xe(gr(ne),g.ADD_DATA_URI_TAGS,le):ne,M=Qt(g,"FORBID_CONTENTS")?Xe({},g.FORBID_CONTENTS,le):G,Fe=Qt(g,"FORBID_TAGS")?Xe({},g.FORBID_TAGS,le):gr({}),Le=Qt(g,"FORBID_ATTR")?Xe({},g.FORBID_ATTR,le):gr({}),A=Qt(g,"USE_PROFILES")?g.USE_PROFILES:!1,ye=g.ALLOW_ARIA_ATTR!==!1,H=g.ALLOW_DATA_ATTR!==!1,K=g.ALLOW_UNKNOWN_PROTOCOLS||!1,ge=g.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ce=g.SAFE_FOR_TEMPLATES||!1,je=g.SAFE_FOR_XML!==!1,We=g.WHOLE_DOCUMENT||!1,rt=g.RETURN_DOM||!1,z=g.RETURN_DOM_FRAGMENT||!1,te=g.RETURN_TRUSTED_TYPE||!1,Je=g.FORCE_BODY||!1,Te=g.SANITIZE_DOM!==!1,Be=g.SANITIZE_NAMED_PROPS||!1,m=g.KEEP_CONTENT!==!1,v=g.IN_PLACE||!1,Pe=g.ALLOWED_URI_REGEXP||hl,ze=g.NAMESPACE||Ne,w=g.MATHML_TEXT_INTEGRATION_POINTS||w,T=g.HTML_INTEGRATION_POINTS||T,he=g.CUSTOM_ELEMENT_HANDLING||{},g.CUSTOM_ELEMENT_HANDLING&&gt(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(he.tagNameCheck=g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),g.CUSTOM_ELEMENT_HANDLING&&gt(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(he.attributeNameCheck=g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),g.CUSTOM_ELEMENT_HANDLING&&typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(he.allowCustomizedBuiltInElements=g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ce&&(H=!1),z&&(rt=!0),A&&(ue=Xe({},pl),xe=[],A.html===!0&&(Xe(ue,ul),Xe(xe,fl)),A.svg===!0&&(Xe(ue,Co),Xe(xe,Lo),Xe(xe,vs)),A.svgFilters===!0&&(Xe(ue,Ro),Xe(xe,Lo),Xe(xe,vs)),A.mathMl===!0&&(Xe(ue,Io),Xe(xe,_l),Xe(xe,vs))),g.ADD_TAGS&&(typeof g.ADD_TAGS=="function"?_e.tagCheck=g.ADD_TAGS:(ue===Ee&&(ue=gr(ue)),Xe(ue,g.ADD_TAGS,le))),g.ADD_ATTR&&(typeof g.ADD_ATTR=="function"?_e.attributeCheck=g.ADD_ATTR:(xe===qe&&(xe=gr(xe)),Xe(xe,g.ADD_ATTR,le))),g.ADD_URI_SAFE_ATTR&&Xe(re,g.ADD_URI_SAFE_ATTR,le),g.FORBID_CONTENTS&&(M===G&&(M=gr(M)),Xe(M,g.FORBID_CONTENTS,le)),m&&(ue["#text"]=!0),We&&Xe(ue,["html","head","body"]),ue.table&&(Xe(ue,["tbody"]),delete Fe.tbody),g.TRUSTED_TYPES_POLICY){if(typeof g.TRUSTED_TYPES_POLICY.createHTML!="function")throw wn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof g.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw wn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');L=g.TRUSTED_TYPES_POLICY,S=L.createHTML("")}else L===void 0&&(L=Pp(R,s)),L!==null&&typeof S=="string"&&(S=L.createHTML(""));It&&It(g),nt=g}},xt=Xe({},[...Co,...Ro,...xp]),jt=Xe({},[...Io,...Ap]),dr=function(g){let O=W(g);(!O||!O.tagName)&&(O={namespaceURI:ze,tagName:"template"});let ee=ws(g.tagName),de=ws(O.tagName);return B[g.namespaceURI]?g.namespaceURI===De?O.namespaceURI===Ne?ee==="svg":O.namespaceURI===Se?ee==="svg"&&(de==="annotation-xml"||w[de]):!!xt[ee]:g.namespaceURI===Se?O.namespaceURI===Ne?ee==="math":O.namespaceURI===De?ee==="math"&&T[de]:!!jt[ee]:g.namespaceURI===Ne?O.namespaceURI===De&&!T[de]||O.namespaceURI===Se&&!w[de]?!1:!jt[ee]&&(D[ee]||!xt[ee]):!!(q==="application/xhtml+xml"&&B[g.namespaceURI]):!1},At=function(g){yn(t.removed,{element:g});try{W(g).removeChild(g)}catch{j(g)}},Tt=function(g,O){try{yn(t.removed,{attribute:O.getAttributeNode(g),from:O})}catch{yn(t.removed,{attribute:null,from:O})}if(O.removeAttribute(g),g==="is")if(rt||z)try{At(O)}catch{}else try{O.setAttribute(g,"")}catch{}},ur=function(g){let O=null,ee=null;if(Je)g="<remove></remove>"+g;else{let Re=To(g,/^[\r\n\t ]+/);ee=Re&&Re[0]}q==="application/xhtml+xml"&&ze===Ne&&(g='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+g+"</body></html>");let de=L?L.createHTML(g):g;if(ze===Ne)try{O=new b().parseFromString(de,q)}catch{}if(!O||!O.documentElement){O=N.createDocument(ze,"template",null);try{O.documentElement.innerHTML=et?S:de}catch{}}let Me=O.body||O.documentElement;return g&&ee&&Me.insertBefore(r.createTextNode(ee),Me.childNodes[0]||null),ze===Ne?oe.call(O,We?"html":"body")[0]:We?O.documentElement:Me},rr=function(g){return k.call(g.ownerDocument||g,g,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Bt=function(g){return g instanceof f&&(typeof g.nodeName!="string"||typeof g.textContent!="string"||typeof g.removeChild!="function"||!(g.attributes instanceof p)||typeof g.removeAttribute!="function"||typeof g.setAttribute!="function"||typeof g.namespaceURI!="string"||typeof g.insertBefore!="function"||typeof g.hasChildNodes!="function")},nr=function(g){return typeof i=="function"&&g instanceof i};function yt(I,g,O){ys(I,ee=>{ee.call(t,g,O,nt)})}let pr=function(g){let O=null;if(yt(Q.beforeSanitizeElements,g,null),Bt(g))return At(g),!0;let ee=le(g.nodeName);if(yt(Q.uponSanitizeElement,g,{tagName:ee,allowedTags:ue}),je&&g.hasChildNodes()&&!nr(g.firstElementChild)&&Rt(/<[/\w!]/g,g.innerHTML)&&Rt(/<[/\w!]/g,g.textContent)||g.nodeType===$n.progressingInstruction||je&&g.nodeType===$n.comment&&Rt(/<[/\w]/g,g.data))return At(g),!0;if(!(_e.tagCheck instanceof Function&&_e.tagCheck(ee))&&(!ue[ee]||Fe[ee])){if(!Fe[ee]&&Mt(ee)&&(he.tagNameCheck instanceof RegExp&&Rt(he.tagNameCheck,ee)||he.tagNameCheck instanceof Function&&he.tagNameCheck(ee)))return!1;if(m&&!M[ee]){let de=W(g)||g.parentNode,Me=Z(g)||g.childNodes;if(Me&&de){let Re=Me.length;for(let lt=Re-1;lt>=0;--lt){let dt=P(Me[lt],!0);dt.__removalCount=(g.__removalCount||0)+1,de.insertBefore(dt,J(g))}}}return At(g),!0}return g instanceof l&&!dr(g)||(ee==="noscript"||ee==="noembed"||ee==="noframes")&&Rt(/<\/no(script|embed|frames)/i,g.innerHTML)?(At(g),!0):(Ce&&g.nodeType===$n.text&&(O=g.textContent,ys([se,Ie,Ve],de=>{O=vn(O,de," ")}),g.textContent!==O&&(yn(t.removed,{element:g.cloneNode()}),g.textContent=O)),yt(Q.afterSanitizeElements,g,null),!1)},Ye=function(g,O,ee){if(Te&&(O==="id"||O==="name")&&(ee in r||ee in Ae))return!1;if(!(H&&!Le[O]&&Rt(Qe,O))){if(!(ye&&Rt(at,O))){if(!(_e.attributeCheck instanceof Function&&_e.attributeCheck(O,g))){if(!xe[O]||Le[O]){if(!(Mt(g)&&(he.tagNameCheck instanceof RegExp&&Rt(he.tagNameCheck,g)||he.tagNameCheck instanceof Function&&he.tagNameCheck(g))&&(he.attributeNameCheck instanceof RegExp&&Rt(he.attributeNameCheck,O)||he.attributeNameCheck instanceof Function&&he.attributeNameCheck(O,g))||O==="is"&&he.allowCustomizedBuiltInElements&&(he.tagNameCheck instanceof RegExp&&Rt(he.tagNameCheck,ee)||he.tagNameCheck instanceof Function&&he.tagNameCheck(ee))))return!1}else if(!re[O]){if(!Rt(Pe,vn(ee,st,""))){if(!((O==="src"||O==="xlink:href"||O==="href")&&g!=="script"&&vp(ee,"data:")===0&&Y[g])){if(!(K&&!Rt(tt,vn(ee,st,"")))){if(ee)return!1}}}}}}}return!0},Mt=function(g){return g!=="annotation-xml"&&To(g,fe)},_=function(g){yt(Q.beforeSanitizeAttributes,g,null);let{attributes:O}=g;if(!O||Bt(g))return;let ee={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:xe,forceKeepAttr:void 0},de=O.length;for(;de--;){let Me=O[de],{name:Re,namespaceURI:lt,value:dt}=Me,y=le(Re),u=dt,C=Re==="value"?u:wp(u);if(ee.attrName=y,ee.attrValue=C,ee.keepAttr=!0,ee.forceKeepAttr=void 0,yt(Q.uponSanitizeAttribute,g,ee),C=ee.attrValue,Be&&(y==="id"||y==="name")&&(Tt(Re,g),C=pe+C),je&&Rt(/((--!?|])>)|<\/(style|title|textarea)/i,C)){Tt(Re,g);continue}if(y==="attributename"&&To(C,"href")){Tt(Re,g);continue}if(ee.forceKeepAttr)continue;if(!ee.keepAttr){Tt(Re,g);continue}if(!ge&&Rt(/\/>/i,C)){Tt(Re,g);continue}Ce&&ys([se,Ie,Ve],V=>{C=vn(C,V," ")});let x=le(g.nodeName);if(!Ye(x,y,C)){Tt(Re,g);continue}if(L&&typeof R=="object"&&typeof R.getAttributeType=="function"&&!lt)switch(R.getAttributeType(x,y)){case"TrustedHTML":{C=L.createHTML(C);break}case"TrustedScriptURL":{C=L.createScriptURL(C);break}}if(C!==u)try{lt?g.setAttributeNS(lt,Re,C):g.setAttribute(Re,C),Bt(g)?At(g):dl(t.removed)}catch{Tt(Re,g)}}yt(Q.afterSanitizeAttributes,g,null)},$=function I(g){let O=null,ee=rr(g);for(yt(Q.beforeSanitizeShadowDOM,g,null);O=ee.nextNode();)yt(Q.uponSanitizeShadowNode,O,null),pr(O),_(O),O.content instanceof o&&I(O.content);yt(Q.afterSanitizeShadowDOM,g,null)};return t.sanitize=function(I){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},O=null,ee=null,de=null,Me=null;if(et=!I,et&&(I="<!-->"),typeof I!="string"&&!nr(I))if(typeof I.toString=="function"){if(I=I.toString(),typeof I!="string")throw wn("dirty is not a string, aborting")}else throw wn("toString is not a function");if(!t.isSupported)return I;if($e||Ge(g),t.removed=[],typeof I=="string"&&(v=!1),v){if(I.nodeName){let dt=le(I.nodeName);if(!ue[dt]||Fe[dt])throw wn("root node is forbidden and cannot be sanitized in-place")}}else if(I instanceof i)O=ur("<!---->"),ee=O.ownerDocument.importNode(I,!0),ee.nodeType===$n.element&&ee.nodeName==="BODY"||ee.nodeName==="HTML"?O=ee:O.appendChild(ee);else{if(!rt&&!Ce&&!We&&I.indexOf("<")===-1)return L&&te?L.createHTML(I):I;if(O=ur(I),!O)return rt?null:te?S:""}O&&Je&&At(O.firstChild);let Re=rr(v?I:O);for(;de=Re.nextNode();)pr(de),_(de),de.content instanceof o&&$(de.content);if(v)return I;if(rt){if(z)for(Me=U.call(O.ownerDocument);O.firstChild;)Me.appendChild(O.firstChild);else Me=O;return(xe.shadowroot||xe.shadowrootmode)&&(Me=ce.call(n,Me,!0)),Me}let lt=We?O.outerHTML:O.innerHTML;return We&&ue["!doctype"]&&O.ownerDocument&&O.ownerDocument.doctype&&O.ownerDocument.doctype.name&&Rt(yl,O.ownerDocument.doctype.name)&&(lt="<!DOCTYPE "+O.ownerDocument.doctype.name+`>
`+lt),Ce&&ys([se,Ie,Ve],dt=>{lt=vn(lt,dt," ")}),L&&te?L.createHTML(lt):lt},t.setConfig=function(){let I=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ge(I),$e=!0},t.clearConfig=function(){nt=null,$e=!1},t.isValidAttribute=function(I,g,O){nt||Ge({});let ee=le(I),de=le(g);return Ye(ee,de,O)},t.addHook=function(I,g){typeof g=="function"&&yn(Q[I],g)},t.removeHook=function(I,g){if(g!==void 0){let O=hp(Q[I],g);return O===-1?void 0:yp(Q[I],O,1)[0]}return dl(Q[I])},t.removeHooks=function(I){Q[I]=[]},t.removeAllHooks=function(){Q=gl()},t}var wl=vl();var br={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ks=e=>(...t)=>({_$litDirective$:e,values:t}),rn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var xn=class extends rn{constructor(t){if(super(t),this.it=_t,t.type!==br.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===_t||t==null)return this._t=void 0,this.it=t;if(t===Ut)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};xn.directiveName="unsafeHTML",xn.resultType=1;var kl=ks(xn);function Fo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var jr=Fo();function Cl(e){jr=e}var Tn={exec:()=>null};function ot(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Ot.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Dp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ot={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Np=/^(?:[ \t]*(?:\n|$))+/,qp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Fp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Cn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,jp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,jo=/(?:[*+-]|\d{1,9}[.)])/,Rl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Il=ot(Rl).replace(/bull/g,jo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Bp=ot(Rl).replace(/bull/g,jo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Bo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Up=/^[^\n]+/,Uo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Wp=ot(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Uo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),zp=ot(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,jo).getRegex(),Ts="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Wo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Hp=ot("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Wo).replace("tag",Ts).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ll=ot(Bo).replace("hr",Cn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ts).getRegex(),Gp=ot(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ll).getRegex(),zo={blockquote:Gp,code:qp,def:Wp,fences:Fp,heading:jp,hr:Cn,html:Hp,lheading:Il,list:zp,newline:Np,paragraph:Ll,table:Tn,text:Up},$l=ot("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Cn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ts).getRegex(),Vp={...zo,lheading:Bp,table:$l,paragraph:ot(Bo).replace("hr",Cn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",$l).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ts).getRegex()},Kp={...zo,html:ot(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Wo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Tn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ot(Bo).replace("hr",Cn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Il).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Yp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Zp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ol=/^( {2,}|\\)\n(?!\s*$)/,Xp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Cs=/[\p{P}\p{S}]/u,Ho=/[\s\p{P}\p{S}]/u,Ml=/[^\s\p{P}\p{S}]/u,Qp=ot(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ho).getRegex(),Pl=/(?!~)[\p{P}\p{S}]/u,Jp=/(?!~)[\s\p{P}\p{S}]/u,ef=/(?:[^\s\p{P}\p{S}]|~)/u,tf=ot(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Dp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Dl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,rf=ot(Dl,"u").replace(/punct/g,Cs).getRegex(),nf=ot(Dl,"u").replace(/punct/g,Pl).getRegex(),Nl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",sf=ot(Nl,"gu").replace(/notPunctSpace/g,Ml).replace(/punctSpace/g,Ho).replace(/punct/g,Cs).getRegex(),of=ot(Nl,"gu").replace(/notPunctSpace/g,ef).replace(/punctSpace/g,Jp).replace(/punct/g,Pl).getRegex(),af=ot("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ml).replace(/punctSpace/g,Ho).replace(/punct/g,Cs).getRegex(),lf=ot(/\\(punct)/,"gu").replace(/punct/g,Cs).getRegex(),cf=ot(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),df=ot(Wo).replace("(?:-->|$)","-->").getRegex(),uf=ot("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",df).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),As=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,pf=ot(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",As).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ql=ot(/^!?\[(label)\]\[(ref)\]/).replace("label",As).replace("ref",Uo).getRegex(),Fl=ot(/^!?\[(ref)\](?:\[\])?/).replace("ref",Uo).getRegex(),ff=ot("reflink|nolink(?!\\()","g").replace("reflink",ql).replace("nolink",Fl).getRegex(),xl=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Go={_backpedal:Tn,anyPunctuation:lf,autolink:cf,blockSkip:tf,br:Ol,code:Zp,del:Tn,emStrongLDelim:rf,emStrongRDelimAst:sf,emStrongRDelimUnd:af,escape:Yp,link:pf,nolink:Fl,punctuation:Qp,reflink:ql,reflinkSearch:ff,tag:uf,text:Xp,url:Tn},_f={...Go,link:ot(/^!?\[(label)\]\((.*?)\)/).replace("label",As).getRegex(),reflink:ot(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",As).getRegex()},Do={...Go,emStrongRDelimAst:of,emStrongLDelim:nf,url:ot(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",xl).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ot(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",xl).getRegex()},mf={...Do,br:ot(Ol).replace("{2,}","*").getRegex(),text:ot(Do.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},$s={normal:zo,gfm:Vp,pedantic:Kp},An={normal:Go,gfm:Do,breaks:mf,pedantic:_f},gf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Al=e=>gf[e];function hr(e,t){if(t){if(Ot.escapeTest.test(e))return e.replace(Ot.escapeReplace,Al)}else if(Ot.escapeTestNoEncode.test(e))return e.replace(Ot.escapeReplaceNoEncode,Al);return e}function Sl(e){try{e=encodeURI(e).replace(Ot.percentDecode,"%")}catch{return null}return e}function El(e,t){let r=e.replace(Ot.findPipe,(o,a,i)=>{let l=!1,d=a;for(;--d>=0&&i[d]==="\\";)l=!l;return l?"|":" |"}),n=r.split(Ot.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ot.slashPipe,"|");return n}function Sn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function bf(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Tl(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,l}function hf(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Ss=class{constructor(e){ct(this,"options");ct(this,"rules");ct(this,"lexer");this.options=e||jr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Sn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=hf(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Sn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Sn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Sn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))i.push(r[l]),a=!0;else if(!a)i.push(r[l]);else break;r=r.slice(l);let d=i.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let R=b,E=R.raw+`
`+r.join(`
`),P=this.blockquote(E);o[o.length-1]=P,n=n.substring(0,n.length-R.raw.length)+P.raw,s=s.substring(0,s.length-R.text.length)+P.text;break}else if(b?.type==="list"){let R=b,E=R.raw+`
`+r.join(`
`),P=this.list(E);o[o.length-1]=P,n=n.substring(0,n.length-b.raw.length)+P.raw,s=s.substring(0,s.length-R.raw.length)+P.raw,r=E.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,P=>" ".repeat(3*P.length)),b=e.split(`
`,1)[0],R=!f.trim(),E=0;if(this.options.pedantic?(E=2,p=f.trimStart()):R?E=t[1].length+1:(E=t[2].search(this.rules.other.nonSpaceChar),E=E>4?1:E,p=f.slice(E),E+=t[1].length),R&&this.rules.other.blankLine.test(b)&&(d+=b+`
`,e=e.substring(b.length+1),l=!0),!l){let P=this.rules.other.nextBulletRegex(E),j=this.rules.other.hrRegex(E),J=this.rules.other.fencesBeginRegex(E),Z=this.rules.other.headingBeginRegex(E),W=this.rules.other.htmlBeginRegex(E);for(;e;){let L=e.split(`
`,1)[0],S;if(b=L,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),S=b):S=b.replace(this.rules.other.tabCharGlobal,"    "),J.test(b)||Z.test(b)||W.test(b)||P.test(b)||j.test(b))break;if(S.search(this.rules.other.nonSpaceChar)>=E||!b.trim())p+=`
`+S.slice(E);else{if(R||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||J.test(f)||Z.test(f)||j.test(f))break;p+=`
`+b}!R&&!b.trim()&&(R=!0),d+=L+`
`,e=e.substring(L.length+1),f=S.slice(E)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(l.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};l.checked=p.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}if(!s.loose){let d=l.tokens.filter(f=>f.type==="space"),p=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let l of s.items){l.loose=!0;for(let d of l.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=El(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(El(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Sn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=bf(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Tl(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Tl(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,l=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let p=[...n[0]][0].length,f=e.slice(0,s+n.index+p+a);if(Math.min(s,a)%2){let R=f.slice(1,-1);return{type:"em",raw:f,text:R,tokens:this.lexer.inlineTokens(R)}}let b=f.slice(2,-2);return{type:"strong",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Jt=class No{constructor(t){ct(this,"tokens");ct(this,"options");ct(this,"state");ct(this,"inlineQueue");ct(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||jr,this.options.tokenizer=this.options.tokenizer||new Ss,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ot,block:$s.normal,inline:An.normal};this.options.pedantic?(r.block=$s.pedantic,r.inline=An.pedantic):this.options.gfm&&(r.block=$s.gfm,this.options.breaks?r.inline=An.breaks:r.inline=An.gfm),this.tokenizer.rules=r}static get rules(){return{block:$s,inline:An}}static lex(t,r){return new No(r).lex(t)}static lexInline(t,r){return new No(r).inlineTokens(t)}lex(t){t=t.replace(Ot.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Ot.tabCharGlobal,"    ").replace(Ot.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),l;this.options.extensions.startBlock.forEach(d=>{l=d.call({lexer:this},i),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(p=>(l=p.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let p=r.at(-1);l.type==="text"&&p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,i)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),b;this.options.extensions.startInline.forEach(R=>{b=R.call({lexer:this},f),typeof b=="number"&&b>=0&&(p=Math.min(p,b))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(l=this.tokenizer.inlineText(d)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Es=class{constructor(e){ct(this,"options");ct(this,"parser");this.options=e||jr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Ot.notSpaceStart)?.[0],s=e.replace(Ot.endingNewline,"")+`
`;return n?'<pre><code class="language-'+hr(n)+'">'+(r?s:hr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:hr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${hr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Sl(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+hr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Sl(e);if(s===null)return hr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${hr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:hr(e.text)}},Vo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},er=class qo{constructor(t){ct(this,"options");ct(this,"renderer");ct(this,"textRenderer");this.options=t||jr,this.options.renderer=this.options.renderer||new Es,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Vo}static parse(t,r){return new qo(r).parse(t)}static parseInline(t,r){return new qo(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},xs,En=(xs=class{constructor(e){ct(this,"options");ct(this,"block");this.options=e||jr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Jt.lex:Jt.lexInline}provideParser(){return this.block?er.parse:er.parseInline}},ct(xs,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ct(xs,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),xs),yf=class{constructor(...e){ct(this,"defaults",Fo());ct(this,"options",this.setOptions);ct(this,"parse",this.parseMarkdown(!0));ct(this,"parseInline",this.parseMarkdown(!1));ct(this,"Parser",er);ct(this,"Renderer",Es);ct(this,"TextRenderer",Vo);ct(this,"Lexer",Jt);ct(this,"Tokenizer",Ss);ct(this,"Hooks",En);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Es(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],l=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=l.apply(s,d)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Ss(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],l=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=l.apply(s,d)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new En;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],l=s[a];En.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&En.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await i.call(s,d);return l.call(s,f)})();let p=i.call(s,d);return l.call(s,p)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await i.apply(s,d);return f===!1&&(f=await l.apply(s,d)),f})();let p=i.apply(s,d);return p===!1&&(p=l.apply(s,d)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Jt.lex(e,t??this.defaults)}parser(e,t){return er.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Jt.lex:Jt.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?er.parse:er.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Jt.lex:Jt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?er.parse:er.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+hr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Fr=new yf;function it(e,t){return Fr.parse(e,t)}it.options=it.setOptions=function(e){return Fr.setOptions(e),it.defaults=Fr.defaults,Cl(it.defaults),it};it.getDefaults=Fo;it.defaults=jr;it.use=function(...e){return Fr.use(...e),it.defaults=Fr.defaults,Cl(it.defaults),it};it.walkTokens=function(e,t){return Fr.walkTokens(e,t)};it.parseInline=Fr.parseInline;it.Parser=er;it.parser=er.parse;it.Renderer=Es;it.TextRenderer=Vo;it.Lexer=Jt;it.lexer=Jt.lex;it.Tokenizer=Ss;it.Hooks=En;it.parse=it;var Fb=it.options,jb=it.setOptions,Bb=it.use,Ub=it.walkTokens,Wb=it.parseInline;var zb=er.parse,Hb=Jt.lex;function Er(e){let t=it.parse(e),r=wl.sanitize(t);return kl(r)}function yr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function nn(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Rs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var vf={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},wf={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},kf=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,$f=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ir(e){return!!e&&typeof e=="object"}function Ko(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function jl(e,t){let r=Ko(e),n=Ko(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function xf(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>ir(s)&&typeof s.text=="string"?s.text:"").join(""):ir(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Af(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:vf[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Ko(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=jl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let l=jl(ir(i)?i.old_string:"",ir(i)?i.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Yo(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Zo(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=kf.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:$f.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Sf(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ir(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Zo(o.text));else if(o.type==="thinking"){let a=Yo(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Af(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ir(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=xf(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Ef(e){if(e.type==="item.completed"&&ir(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Zo(t.text)];if(t.type==="reasoning"){let r=Yo(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Tf(e){if(e.schema!=="codex-delegation-monitor-v1"||!ir(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&ir(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[Zo(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let i=Yo(r.text);return i?[i]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=wf[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Cf(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Bl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!ir(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?Tf(o):Cf(o)?Ef(o):Sf(o,r);for(let i of a)t.push(i)}return t}var Rf=5,If=10,Lf=/Task\s+#(\d+)/,Of=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Mf=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Is(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Pf(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Df(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Nf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=Lf.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!l||d.length===0)continue;t.set(l[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function qf(e){if(e.tool==="Bash"){let t=e.command||"";return Of.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Mf.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Ff(e){let t=e.filter(s=>s.kind==="tool").slice(-If),r=new Map;t.forEach((s,o)=>{let a=qf(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function jf(e){let t=Df(e);if(t)return{text:t,guess:!1};let r=Nf(e);if(r)return{text:r,guess:!1};let n=Ff(e);return n?{text:n,guess:!0}:null}function Bf(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Nt(e,t)}function Ls(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,i=null,l=!1,d={},p=!0,f=new Set,b=new Set,R=null,E=null,P=!1,j=!1,J=!1,Z=null,W=null;function L(){P=!1,j=!1,J=!1,Z=null,W=null}async function S(H){if(r){j=!0,J=!1,ue();try{let K=await Promise.resolve(r("get-attempt-prompt",{attempt_id:H}));if(o!==H)return;!K||typeof K!="object"||Array.isArray(K)?J=!0:(Z=K,W=H)}catch{o===H&&(J=!0)}finally{o===H&&(j=!1,ue())}}}function N(){if(P=!P,P&&o&&W!==o){S(o);return}ue()}function k(){if(!P)return"";let H=nn({loading:j,error:J});if(H)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${H}
      </div>`;if(!Z)return"";if(Z.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let K=Rs(Z.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${K?c`<div class="prompt-block__meta">${K} 발송</div>`:""}
      ${typeof Z.task_prompt=="string"?yr("\uACFC\uC5C5 (user)",Z.task_prompt):""}
      ${typeof Z.system_prompt=="string"?yr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",Z.system_prompt):""}
    </div>`}function U(){if(!i||!n)return[];let H=n.get(i);return Bl(H?H.lines:[])}function oe(){if(!i||!n)return null;let H=n.get(i),K=H?H.last_event_at:null;return typeof K=="number"?K:null}function ce(){return d.status==="running"}function Q(){if(ce()&&o){E||(E=setInterval(()=>ue(),1e3));return}se()}function se(){E&&(clearInterval(E),E=null)}function Ie(H){let K=[],ge=0;for(;ge<H.length;){let Ce=H[ge];if(Ce.kind==="tool"){let je=ge;for(;je<H.length&&H[je].kind==="tool"&&H[je].tool===Ce.tool;)je+=1;if(je-ge>=Rf&&!b.has(ge)){K.push({kind:"group",idx:ge,tool:Ce.tool||"",lines:H.slice(ge,je).map((We,$e)=>({idx:ge+$e,line:We}))}),ge=je;continue}}K.push({kind:"line",idx:ge,line:Ce}),ge+=1}return K}function Ve(H){for(let K=H.length-1;K>=0;K-=1){let ge=H[K];if(ge.kind==="result"||ge.kind==="error")return null;if(ge.kind==="tool"&&!Object.hasOwn(ge,"result"))return ge}return null}function Qe(H){for(let K=H.length-1;K>=0;K-=1)if(H[K].kind==="thinking")return H[K];return null}function at(H,K){if(K.kind==="gate")return c`<div class="sv__gate">${K.text}</div>`;if(K.kind==="phase")return c`<div class="sv__phase">${K.text}</div>`;if(K.kind==="result")return c`<div
        class="sv__result${K.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${K.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Er(K.text||(K.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(K.kind==="thinking"){let ge=f.has(H);return c`<div
        class="sv__think${ge?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>xe(H)}
      >
        <span class="sv__think-line">💭 ${Is(K.text)}</span>
        ${ge?c`<pre class="sv__think-expand">${K.text}</pre>`:""}
      </div>`}if(K.kind==="error")return c`<div class="sv__error">⛔ ${K.text}</div>`;if(K.kind==="blocker")return c`<div class="sv__error">⛔ ${K.text}</div>`;if(K.kind==="tool"){let ge=f.has(H),Ce=K.tool==="Bash"?Pf(K.command):0,je=K.tool==="Bash"?Ce>1?Is(K.command):K.command:K.path||K.command||"";return c`<div
        class="sv__tool${ge?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>xe(H)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${K.icon}</span>
          <span class="sv__tool-name">${K.tool}</span>
          ${je?c`<span class="sv__tool-detail">${je}</span>`:""}
          ${Ce>1?c`<span class="sv__tool-more">⋯ ${Ce}줄</span>`:""}
          ${typeof K.added=="number"?c`<span class="sv__diff-add">+${K.added}</span>`:""}
          ${typeof K.removed=="number"?c`<span class="sv__diff-del">−${K.removed}</span>`:""}
          ${K.result?c`<span class="sv__tool-ok">→ ${K.result}</span>`:""}
        </span>
        ${ge?c`<pre class="sv__tool-expand">${tt(K)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${Er(K.text||"")}</div>`}function tt(H){let K=[];if(H.tool==="Bash"&&typeof H.command=="string"&&H.command.length>0)K.push(H.command);else if(H.input!==void 0)try{K.push(`input: ${JSON.stringify(H.input,null,2)}`)}catch{}return typeof H.output=="string"&&H.output.length>0&&K.push(`output:
${H.output}`),K.join(`

`)}function st(){if(!o)return c``;let H=U(),K=(a?[d.model]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),ge=d.session_id||"",Ce=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${p?"ON":"OFF"}`,je=ce(),We=je?Bf(oe(),Date.now()):"",$e=je?Ve(H):null,Je=je?Qe(H):null,rt=jf(H);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${rt?c`<span
              class="sv__stage${rt.guess?" sv__stage--guess":""}"
              title=${rt.text}
              >${rt.text}</span
            >`:""}
        ${je?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${We?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${We}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${We?c`<span class="sv__live-ago">${We}</span>`:""}</span
            >`:""}
        ${ge?c`<button
              type="button"
              class="sv__session"
              title=${ge}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ge}`}
              @click=${()=>he(ge)}
            >
              ⧉ ${ge.slice(0,8)}
            </button>`:""}
        ${K?c`<span class="sv__meta">${K}</span>`:""}
        ${d.worktree?c`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||l?"":c`<button
              type="button"
              class="sv__prompt-toggle${P?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${P?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${N}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${p?" sv__follow--on":""}"
          aria-pressed=${p?"true":"false"}
          aria-label=${Ce}
          @click=${qe}
        >
          <span class="sv__follow-full">⇣ ${Ce}</span>
          <span class="sv__follow-short">⇣ ${p?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ye()}
        >
          ✕
        </button>
      </div>
      ${a||l?"":k()}
      <div class="sv__body">
        ${H.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:Ie(H).map(z=>z.kind==="group"?fe(z):at(z.idx,z.line))}
      </div>
      ${$e||Je?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${$e?c`<span class="sv__now-icon">${$e.icon}</span>
                  <span class="sv__now-name">${$e.tool}</span>
                  <span class="sv__now-detail"
                    >${$e.tool==="Bash"?Is($e.command):$e.path||$e.command||""}</span
                  >`:""}
            ${Je?c`<span class="sv__now-think"
                  >💭 ${Is(Je.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function fe(H){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Pe(H.idx)}
    >
      <span class="sv__group-icon">${H.lines[0].line.icon}</span>
      <span class="sv__group-name">${H.tool}</span>
      <span class="sv__group-count">${H.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Pe(H){b.add(H),ue()}function ue(){Ke(st(),e),Q(),p&&Ee()}function Ee(){let H=e.querySelector(".sv__body");H&&(H.scrollTop=H.scrollHeight)}function xe(H){f.has(H)?f.delete(H):f.add(H),ue()}function qe(){p=!p,ue()}function he(H){Zt(H).then(K=>{K?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Fe(H){!o||!H||(d={...d,...H},ue())}function Le(H){let K=H.target;if(!K||!K.classList||!K.classList.contains("sv__body"))return;!(K.scrollHeight-K.scrollTop-K.clientHeight<=4)&&p&&(p=!1,ue())}e.addEventListener("scroll",Le,!0);function _e(H){let K=H&&H.attempt_id;if(!K)return;let ge=i;o=K,a=typeof H.launch_id=="string"&&H.launch_id.length>0?H.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&ge&&ge!==i&&Promise.resolve(r("unsubscribe-session-log",{id:ge})).catch(()=>{}),d=H.meta||{},l=H.hide_prompt===!0,p=!0,f.clear(),b.clear(),L(),!R&&n&&(R=n.subscribe(ue)),r&&Promise.resolve(r("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),ue()}function ye(){let H=i;o=null,a=null,i=null,l=!1,f.clear(),b.clear(),L(),se(),r&&H&&Promise.resolve(r("unsubscribe-session-log",{id:H})).catch(()=>{}),Ke(c``,e),s&&s()}return{open:_e,updateMeta:Fe,close:ye,isOpen(){return o!==null},destroy(){se(),R&&(R(),R=null),e.removeEventListener("scroll",Le,!0),o=null,a=null,i=null,l=!1,Ke(c``,e)}}}function Rn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Ul(t.spec_id),s=Ul(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ul(e){return typeof e=="string"?e.trim():""}function Uf(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Wf(e){let t=e&&e.metadata||{},r=Rn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Uf(t)?null:"plan_pending"}),n}function Wl(e,t){let r=Wf(e);return c`
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
  `}var zf="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Hf=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Gf=/^\*\*결론\*\* — (.+)$/;function Os(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==zf)return null;let r=Hf.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Gf.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(d).join(`
`).trim()}}var zl=20;function Hl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Vf(e){return e.length>zl?`${e.slice(0,zl)}\u2026`:e}function Kf(e,t,r,n){let s=`${t.lane} ${Vf(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Hl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${Er(t.body)}
        </div>`:""}
  </div>`}function Yf(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Hl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Er(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Gl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((l,d)=>String(d.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let d=Os(typeof l.text=="string"?l.text:"");return d?Kf(l,d,t,s.has(l.id)):Yf(l)})}
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
  `}var{I:xh}=mi;var Vl=e=>e.strings===void 0;var Zf={},Kl=(e,t=Zf)=>e._$AH=t;var Br=ks(class extends rn{constructor(e){if(super(e),e.type!==br.PROPERTY&&e.type!==br.ATTRIBUTE&&e.type!==br.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Vl(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Ut||t===_t)return t;let r=e.element,n=e.name;if(e.type===br.PROPERTY){if(t===r[n])return Ut}else if(e.type===br.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Ut}else if(e.type===br.ATTRIBUTE&&r.getAttribute(n)===t+"")return Ut;return Kl(e),t}});var Xo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ms=["orchestration_model","orchestration_effort","orchestration_speed"],Yl=["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ps=["delegated","main"],Ds=["inherit","claude","codex"],In=["default","fast"],Ln=["standard","fast_track"],On=["codex","opus","fable","self","skip"],Ns=["codex","fable","skip"],qs=["low","medium","high","xhigh"],lr="auto";function vr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Zl(e){if(!vr(e)||!vr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))vr(n)&&vr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Xl(e){return e?.impl_dispatch==="main"}function Fs(e,t){let r=Zl(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[lr,...n.flatMap(([,s])=>s)]}function sn(e,t,r){if(!vr(e)||!vr(e.runners))return[lr];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!vr(o)||!vr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,i]of Object.entries(o.models)){if(r&&r!==lr&&a!==r)continue;let l=vr(i)?i.efforts:null;if(Array.isArray(l))for(let d of l)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[lr,...n]}function js(e,t){let r=Zl(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Qo(e,t,r,n,s){return gs({key:e,choices:t,layer:"global",global:r,execution_defaults:n,runner_catalog:s})}function Ql(e,t){let r={};for(let n of Xo){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function Jl(e,t){let r={};for(let n of Ms){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Jo=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Ms]}],ea={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ec={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ta(e,t,r,n,s,o=null){let a=Qr({pin:t,global:r,execution_defaults:n,runner_catalog:s,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function tc(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let i of ta(e,t,r,n,s,o))a[i.source]+=1;return a}function rc(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function nc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var Ph=[...Xo,...Ms];var Xf=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],Qf={pin:"pin",global:"global",base:"base"};function Jf(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Qf[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function e_(e,t,r){switch(e){case"workflow_mode":return Ln;case"spec_review_model":case"impl_review_model":return On;case"plan_review_model":return Ns;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return qs;case"impl_dispatch":return Ps;case"impl_runtime":return Ds;case"impl_model":return Fs(r,t.impl_runtime);case"impl_effort":return sn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return In;case"orchestration_model":return js(r,null);case"orchestration_effort":return sn(r,void 0,t.orchestration_model||lr).filter(n=>n!==lr);default:return[]}}function t_(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Jf(e.source)}
    <span class="detail-effective__k"
      >${ea[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${ec[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${ea[e.key]||e.key} \uD3B8\uC9D1`}
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
          ${t.options.map(r=>c`<option
                value=${r.value}
                title=${r.full_value||""}
                ?selected=${e.source==="pin"&&e.value===r.value}
              >
                ${r.label}
              </option>`)}
        </select>`:""}
  </div>`}function sc(e,t){let r=Jo.flatMap(l=>l.keys),n=ta(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=tc(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(l=>[l.key,l])),a=Object.fromEntries(n.filter(l=>l.value!==null).map(l=>[l.key,l.value])),i=n.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${l=>t.onToggle(l.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${l=>{l.preventDefault();let d=l.currentTarget.parentElement;t.onToggle(!d.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${r_(o)}</span
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
          ${Jo.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${n.filter(d=>l.keys.includes(d.key)).map(d=>{let p=gs({key:d.key,choices:e_(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,controller_runtime:e.controller_runtime||null});return t_(d,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="구현 프리셋"
              .value=${Br(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${l=>t.onPresetSelect(String(l.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                구현 프리셋…
              </option>
              ${e.presets.map(l=>c`<option
                    value=${l.id}
                    ?selected=${l.id===e.preset_id}
                  >
                    ${l.name}${l.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
              >구현 키 5개를 핀으로 기록</span
            >
          </div>
        </div>`:""}
  </details>`}function r_(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function oc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=fs(r.planned_execution,r.exec_receipt);return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${i?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${i.kind}
            title=${i.title}
            >${i.label}</span
          >`:""}
      ${a?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${a}
            >${a.split("@")[0]}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${Xf.map(l=>{let d=l.receipt&&typeof t[l.receipt]=="string"?String(t[l.receipt]):"",p=n[l.id],f=d.length>0||p?.fill==="full",b=!f&&p?.fill==="dim",R=p?.stale===!0;return c`<span
          class=${`detail-summary__gate${f?" detail-summary__gate--on":""}${b?" detail-summary__gate--current":""}${R?" detail-summary__gate--stale":""}`}
          data-gate=${l.id}
        >
          <span class="detail-summary__gate-pill">${l.label}</span>
          ${d?c`<span class="detail-summary__gate-sha"
                >${d.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var ac=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Mn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Bs(e){if(!Mn(e)||!Mn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Mn(r)&&Mn(r.models));return t.length>0?t:null}function ra(e,t){let r=Bs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function ic(e,t){return Mn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function lc(e,t){let r=Bs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return ic(n,n.models[t]);return[]}function n_(e){let t=Bs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of ic(n,s))r.includes(o)||r.push(o);return r}function s_(e,t){if(!t)return n_(e);let n=Bs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of lc(e,o))s.includes(a)||s.push(a);return s}function cc(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=ra(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?lc(t,n.impl_model):s_(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function o_(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function dc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function l(E){E.key==="Escape"&&s&&(E.preventDefault(),b())}document.addEventListener("keydown",l);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${o_(s)}</span
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
                    </div>`:Er(a)}
          </div>
        </div>
      </div>
    `:c``}function p(){Ke(d(),e)}async function f(E,P={}){s=E,o="loading",a="",i="",p();let j=r?r():"";if(!j){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let J="/api/doc?workspace="+encodeURIComponent(j)+"&path="+encodeURIComponent(E);try{let Z=await n(J),W=await Z.json().catch(()=>({}));if(!Z.ok||!W||W.ok!==!0){if(W?.error==="not_found"&&P.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(W&&W.error||Z.status)+")",p();return}a=String(W.content||""),o="ready",p()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function b(){s=null,Ke(c``,e)}function R(){document.removeEventListener("keydown",l),b()}return{open:f,close:b,destroy:R}}var a_=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],pc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Us=["implementation","review-consult"],i_=["running","done","failed","interrupted"],l_={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function c_(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function d_(e){let t=kt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=en(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${pc}
          >부분 집계</span
        >`:""}`}function uc(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function na(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?sa(t):""}function u_(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!Us.includes(t.role)||typeof t.model!="string"||t.model.length===0||typeof t.session_id!="string"||t.session_id.length===0||!i_.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function p_(e,t){let n=kt({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[t.provider,t.model].filter(Boolean).join(" \xB7 ")}</span
    >
    ${t.session_id?c`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${t.session_id}
          >${t.session_id.slice(0,8)}</span
        >`:""}
    ${na(t.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${na(t.completed_at)}</span
        >`:""}
    ${n?c`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function f_(e,t,r,n){let s=e.status==="running"?null:t,a=(s?kt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?sa(e.last_event_at):s?na(s.completed_at):"";return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${l_[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >codex · ${e.model}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${e.session_id}
      >${e.session_id.slice(0,8)}</span
    >
    ${i?c`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?c`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function __(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function m_(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let f=u_(p);!f||s.has(f.launch_id)||(s.add(f.launch_id),n.push(f))}n.sort((p,f)=>p.started_at-f.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let p of Us){let f=t.roles[p]?.codex;a[p]=f?[...f.legs]:[]}let i=Us.flatMap(p=>a[p]),l=new Set,d=[];for(let p of Us){for(let f of n.filter(b=>b.role===p)){let b=i.find(R=>R.receipt_id===f.launch_id)||null;b&&!__(f,b)||(b&&l.add(b.receipt_id),d.push(f_(f,b,e.attempt_id,r)))}for(let f of a[p])l.has(f.receipt_id)||d.push(p_(p,f))}return d}function g_(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...a_,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${n.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${c_(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${pc}</span>`:""}
  </div>`}var b_={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function sa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function h_(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function fc(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let f=typeof d.session_id=="string"&&d.session_id.length>0,b=o.has(d.attempt_id),R=f&&!b,E=f?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!R}
      title=${E}
      @click=${P=>{P.stopPropagation(),R&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let f=d.cause_detail,b=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:d.cause;return c`<div class="detail-session__cause" title=${b}>
      ${d.cause}
    </div>`},l=d=>{let p=uc(So(d));if(kt(p).length===0&&!en(d.usage))return"";let f=s.has(d.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${b=>{b.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${d_(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let p=So(d),f=uc(p),b=kt(f);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${b_[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${Ar(d)?c`<span
                  class="detail-session__resumed"
                  title=${Ar(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${ar(d)}</span>
            ${b.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?c`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${b.length>0?b.map(R=>c`<span
                      class="detail-session__usage"
                      title=${R.tooltip}
                      >${R.label}</span
                    >`):en(d.usage)?c`<span class="detail-session__usage"
                    >${en(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${sa(d.started_at)}</span>
          </button>
          ${l(d)} ${a(d)} ${i(d)} ${h_(d)}
          ${s.has(d.attempt_id)&&d.usage?g_(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${m_(d,p,t)}
        </div>`})}
    </div>
  `}function _c(e,t={}){return c`
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
          ${y_(e)}
        </div>`:""}
  `}function y_(e){let t=nn(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?yr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Rs(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?yr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?yr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var v_=["open","in_progress","deferred","resolved","closed"],w_=[0,1,2,3,4];function mc(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,d=null,p=null,f={},b="",R=!1,E=!1,P={},j=!1,J=!1,Z="",W="",L="";function S(){j=!1,J=!1,Z="",W="",L=""}let N=[],k=null,U=null,oe=!1,ce="",Q=!1,se=0,Ie=new Set;function Ve(){N=[],k=null,U=null,oe=!1,ce="",Q=!1,se+=1,Ie.clear()}async function Qe(u){if(!s)return;let C=++se;try{let x=await Promise.resolve(s("get-comments",{id:u}));if(C!==se||u!==d)return;N=Array.isArray(x)?x:[],oe=!1}catch{if(C!==se||u!==d)return;oe=!0}y()}function at(){if(!s||!d)return;let u=p&&typeof p.comment_count=="number"?p.comment_count:null;if(k!==d){k=d,U=u,Qe(d);return}u!==null&&u!==U&&(U=u,Qe(d))}function tt(u){Ie.has(u)?Ie.delete(u):Ie.add(u),y()}function st(u){let C=ce.trim().length===0;ce=u,C!==(u.trim().length===0)&&y()}async function fe(){let u=ce.trim();if(!s||!d||u.length===0||Q)return;let C=d;Q=!0,y();let x=!1;try{let V=await Promise.resolve(s("add-comment",{id:C,text:u}));Array.isArray(V)&&V.length>0&&(x=!0,C===d&&(N=V,oe=!1,ce="",U=V.length))}catch{x=!1}x||ae("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),C===d&&(Q=!1),y()}let Pe={onToggle:tt,onDraftInput:st,onSubmit:fe},ue=document.createElement("div");ue.className="md-viewer-root",document.body.appendChild(ue);let Ee=dc(ue,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),xe=document.createElement("div");xe.className="session-log-root",document.body.appendChild(xe);let qe=Ls(xe,{transport:s?(u,C)=>Promise.resolve(s(u,C)):void 0,sessionLogStore:l}),he=!1,Fe=!1,Le=!1,_e=null,ye=null,H=0;function K(u){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${u}`}function ge(){he=!1,Fe=!1,Le=!1,_e=null,ye=null,H+=1}async function Ce(u){if(!s)return;let C=++H;Fe=!0,Le=!1,y();try{let x=await Promise.resolve(s("get-bead-prompt",{bead_id:u}));if(C!==H)return;!x||typeof x!="object"||Array.isArray(x)?Le=!0:(_e=x,ye=K(u))}catch{C===H&&(Le=!0)}finally{C===H&&(Fe=!1,y())}}function je(){if(he=!he,he&&d&&ye!==K(d)){_e=null,Ce(d);return}y()}function We(){if(!a||!d)return[];let u=a.get();return(u&&u.attempts?Object.values(u.attempts):[]).filter(x=>x&&x.bead_id===d).sort((x,V)=>(V.started_at||0)-(x.started_at||0)).map(x=>({attempt_id:x.attempt_id,bead_id:x.bead_id,status:x.status,started_at:typeof x.started_at=="number"?x.started_at:null,runner:x.runner||null,model:x.model||null,effort:x.effort||null,speed:x.speed||null,session_id:x.session_id||null,resumed_from:x.resumed_from||null,continuation_mode:x.continuation_mode||null,dismissed_at:typeof x.dismissed_at=="number"?x.dismissed_at:null,cause:typeof x.cause=="string"?x.cause:null,cause_detail:x.cause_detail||null,exec_default_preset_id:typeof x.exec_default_preset_id=="string"?x.exec_default_preset_id:null,exec_default_preset_revision:typeof x.exec_default_preset_revision=="number"?x.exec_default_preset_revision:null,exec_values:x.exec_values&&typeof x.exec_values=="object"?x.exec_values:null,usage:x.usage||null,usage_legs:Array.isArray(x.usage_legs)?x.usage_legs:[],delegation_sessions:Array.isArray(x.delegation_sessions)?x.delegation_sessions:[]}))}function $e(){if(!a||!d)return null;let u=a.get();return zt(u&&u.attempts||{},d)}let Je=new Set;function rt(u){Je.has(u)?Je.delete(u):Je.add(u),y()}function z(u){let C=a?a.get():null,x=C&&C.attempts?C.attempts[u]:null;qe.open({attempt_id:u,meta:x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,status:x.status||void 0,session_id:x.session_id||void 0}:{}})}function te(u,C){let x=a?a.get():null,V=x&&x.attempts?x.attempts[u]:null,ke=(V&&Array.isArray(V.delegation_sessions)?V.delegation_sessions:[]).find(Ze=>Ze&&typeof Ze=="object"&&Ze.launch_id===C);ke&&qe.open({attempt_id:u,launch_id:C,meta:{runner:"codex",role:ke.role,model:ke.model,session_id:ke.session_id,status:ke.status}})}async function Te(u){if(!s||!u)return;let C=await Jr();if(C===null)return;let x=()=>{let Ze=a?a.get():null;return Ze&&typeof Ze.revision=="number"?Ze.revision:0},V=async(Ze={},Ue=x())=>await s("worker-attempt-resume",{attempt_id:u,expected_revision:Ue,...C!==""?{instructions:C}:{},...Ze}),we=Ze=>{Ze?.queue&&a?.set&&a.set(Ze.queue)},ke=await V();if(we(ke),ke&&ke.conflict){let Ze=ke.queue&&typeof ke.queue.revision=="number"?ke.queue.revision:x();ke=await V({},Ze),we(ke)}ke=await _r(ke,(Ze,Ue)=>V({continuation:Ze,decision_token:Ue}),{onResult:we,refresh:()=>V()}),ke&&ke.resumed===!1&&!ke.conflict&&ke.reason&&ae(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ke.reason}`,"error",2400)}let Be={onOpen:z,onOpenDelegation:te,onResume:Te,onToggleUsage:rt};function pe(){let u=a?a.get():null,C={...P};for(let x of["orchestration_model","orchestration_effort","orchestration_speed"]){let V=u&&u[x];typeof V=="string"&&(C[x]=V)}return C}async function m(){if(s){try{let u=await Promise.resolve(s("get-session-defaults",{}));P=u&&u.values&&typeof u.values=="object"?u.values:{}}catch{P={}}y()}}function v(){let u=a?a.get():null;return u&&u.runner_catalog||null}function A(){let u=a?a.get():null;return u&&typeof u.execution_defaults=="object"?u.execution_defaults:null}function M(){let u=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},x=Qr({pin:{...u,...f},global:pe(),execution_defaults:A(),runner_catalog:v()}).orchestration_model.value||"";return ra(v(),x)}function G(){let u=i?i.get():null;return!u||typeof u.revision!="number"?null:{revision:u.revision,presets:Array.isArray(u.presets)?u.presets:[]}}function Y(u){return u?.compatible===!1}function ne(u){i&&u&&typeof u.revision=="number"&&Array.isArray(u.presets)&&i.set({revision:u.revision,presets:u.presets})}async function re(){let u=G(),C=u?.presets.find(x=>x.id===b);if(!(!s||!d||!u||!C||Y(C)||R)){R=!0,y();try{let x=await Promise.resolve(s("apply-impl-preset",nc(d,C.id,u.revision)));if(x&&x.conflict){ne(x),ae("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let V=x&&Array.isArray(x.issue)?x.issue[0]:x?.issue;if(x&&x.applied&&V&&typeof V=="object"){p=V;for(let we of ac)delete f[we];ae("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}x&&x.error==="bd_readback_failed"?ae("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ae("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(x){x&&typeof x=="object"&&x.code==="bd_readback_failed"?ae("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ae("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{R=!1,y()}}}let me=null;r&&r.subscribe&&(me=r.subscribe(()=>ze()));let Se=null;a&&typeof a.subscribe=="function"&&(Se=a.subscribe(()=>{d&&y()}));let De=null;i&&typeof i.subscribe=="function"&&(De=i.subscribe(()=>{d&&y()}));function Ne(u){u.key==="Escape"&&d&&(u.preventDefault(),n())}document.addEventListener("keydown",Ne);function ze(){if(d){if(r&&typeof r.snapshotFor=="function"){let u=r.snapshotFor("detail:"+d)||[];p=u.find(x=>x&&x.id===d)||u[0]||p}at(),y()}}function et(u){Zt(u).then(C=>{C?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function B(u){u.preventDefault(),u.stopPropagation(),d&&et(d)}function X(u,C){u.preventDefault(),u.stopPropagation(),et(C)}function w(u,C,x){u.preventDefault(),u.stopPropagation(),Ee.open(C,{missing_state:x})}function T(u,C){f[u]=C,y(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",rc(d,u,C.length===0?null:C))).catch(()=>{ae("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function D(u,C){let x=p||{},V=x.metadata&&typeof x.metadata=="object"?x.metadata:{},we={};for(let Ue of["impl_runtime","impl_model","impl_effort"])we[Ue]=Object.hasOwn(f,Ue)?f[Ue]:typeof V[Ue]=="string"?V[Ue]:"";we[u]=C;let ke=cc(we,v(),M()),Ze={};for(let Ue of["impl_runtime","impl_model","impl_effort"])Ze[Ue]=f[Ue],f[Ue]=ke[Ue]||"";y(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...ke,orchestration_runtime:M()})).then(Ue=>{let mt=Array.isArray(Ue)?Ue[0]:Ue;if(!mt||typeof mt!="object"||!mt.id)throw new Error("implementation target readback failed");p=mt;for(let sr of["impl_runtime","impl_model","impl_effort"])delete f[sr];y()}).catch(()=>{for(let Ue of["impl_runtime","impl_model","impl_effort"])Ze[Ue]===void 0?delete f[Ue]:f[Ue]=Ze[Ue];y(),ae("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function q(u,C,x){if(!s||!d)return!1;try{let V=await Promise.resolve(s(u,C)),we=Array.isArray(V)?V[0]:V;return we&&typeof we=="object"&&we.id?(p=we,!0):(ae(x,"error"),!1)}catch{return ae(x,"error"),!1}}function be(u){setTimeout(()=>{try{let C=e.querySelector(u);C&&typeof C.focus=="function"&&C.focus()}catch{}},0)}function ve(){j=!0,Z=p&&p.title||"",y(),be('.detail-edit__input[data-edit="title"]')}function le(u){Z=u.target.value}function nt(){j=!1,Z="",y()}function Ae(){q("edit-text",{id:d,field:"title",value:Z},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(C=>{C&&(j=!1,Z=""),y()})}function gt(){J=!0,W=p&&p.description||"",y(),be('.detail-edit__textarea[data-edit="description"]')}function Ge(u){W=u.target.value}function xt(){J=!1,W="",y()}function jt(){q("edit-text",{id:d,field:"description",value:W},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(C=>{C&&(J=!1,W=""),y()})}function dr(u,C,x,V){if(u.key==="Escape"){u.stopPropagation(),x();return}u.key==="Enter"&&(!V||u.ctrlKey||u.metaKey)&&(u.preventDefault(),C())}function At(u){let C=u.target.value;q("update-status",{id:d,status:C},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function Tt(u){let C=Number(u.target.value);q("update-priority",{id:d,priority:C},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function ur(u){L=u.target.value}function rr(){let u=L.trim();u.length!==0&&q("label-add",{id:d,label:u},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(C=>{C&&(L=""),y()})}function Bt(u){if(u.key==="Escape"){u.stopPropagation(),L="",y();return}u.key==="Enter"&&(u.preventDefault(),rr())}function nr(u){q("label-remove",{id:d,label:u},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>y())}let yt={onCopyPath:X,onOpenDoc:w};function pr(u){return typeof u=="string"?u:u&&typeof u=="object"?String(u.id||u.to||u.issue_id||u.depends_on||""):""}function Ye(u){switch(u&&typeof u=="object"?String(u.dependency_type||u.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Mt(u){let x=(Array.isArray(u.dependencies)?u.dependencies:[]).map(V=>({id:pr(V),icon:Ye(V)})).filter(V=>V.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${x.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${x.map(V=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(V.id)}
                  >
                    ${V.icon?`${V.icon} `:""}${V.id}
                  </button>`:c`<span class="detail-dep"
                    >${V.icon?`${V.icon} `:""}${V.id}</span
                  >`)}
          </div>`}
    `}function _(u){let C=u.metadata||{},x=u.workflow||{},V=x.stages||{},we=V.spec&&V.spec.stale,ke=V.impl&&V.impl.stale,Ze=V.plan||null,Ue=x.route_source==="derived",mt=x.route||C.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Ue?" detail-kv__v--derived":""}"
          title=${Ue?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Ue?"unset":mt}</span
        >
      </div>
      ${x.route!=="quick_fix"||Object.hasOwn(C,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${C.spec_review||"\uC5C6\uC74C"}${we?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${x.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ze?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ze?.approval_receipt||"\uC5C6\uC74C"}${Ze?.approval_state==="stale"?" \xB7 stale":Ze?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${x.route!=="quick_fix"||Object.hasOwn(C,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${C.impl_review||"\uC5C6\uC74C"}${ke?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${x.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${x.planned_execution.kind}</span>
            </div>
            ${x.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${x.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${x.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${x.exec_receipt.kind}:${x.exec_receipt.actor}@${x.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${x.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${x.impl_entry.actor}@${x.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${C.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${C.pr_url}</span>
          </div>`:""}
    `}let $={route:["quick_fix","spec_backed","full_plan"]};async function I(u,C){let x=C.target.value;if(u==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&x!=="full_plan"&&!window.confirm(`full_plan \u2192 ${x||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){y();return}await q("update-workflow-meta",{id:d,key:u,value:x},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),y()}function g(u){let C=u.metadata||{};return c` ${((V,we)=>{let ke=$[V],Ze=typeof C[V]=="string"?C[V]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${V}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${V}
          data-edit=${`wfmeta-${V}`}
          @change=${Ue=>I(V,Ue)}
        >
          <option value="" ?selected=${!ke.includes(Ze)}>
            ${we}
          </option>
          ${ke.map(Ue=>c`<option value=${Ue} ?selected=${Ze===Ue}>${Ue}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function O(u,C){return j?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${Z}
            @input=${le}
            @keydown=${x=>dr(x,Ae,nt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ae}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${nt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${u}</h2>
        ${kt(C).map(x=>c`<span class="detail-usage-total" title=${x.tooltip}
              >${x.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ve}
        >
          ✎
        </button>
      </div>
    `}function ee(u){let C=vt(u.created_at),x=vt(u.updated_at);return!C&&!x?c``:c`
      ${C?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${C}</span>
          </div>`:""}
      ${x?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
          </div>`:""}
    `}function de(u,C){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${At}
        >
          ${v_.map(x=>c`<option value=${x} ?selected=${x===u}>${x}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Tt}
        >
          ${w_.map(x=>c`<option value=${String(x)} ?selected=${x===C}>
                P${x}
              </option>`)}
        </select>
      </div>
    `}function Me(u){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${J?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${gt}
            >
              ✎
            </button>`}
      </div>
      ${J?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${W}
              @input=${Ge}
              @keydown=${C=>dr(C,jt,xt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${jt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${xt}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${u||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Re(u){let C=typeof u.notes=="string"?u.notes:"";return C.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${C}</div>
    `}function lt(u){let C=Array.isArray(u.labels)?u.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${C.map(x=>c`<span class="detail-label-chip"
              >${x}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${x}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+x}
                @click=${()=>nr(x)}
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
            @input=${ur}
            @keydown=${Bt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${rr}
          >
            추가
          </button>
        </span>
      </div>
    `}function dt(){if(!d)return c``;let u=p||{},C=String(u.id||d),x=u.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",V=$e(),we=u.status||"open",ke=typeof u.priority=="number"?Math.max(0,Math.min(4,u.priority)):"",Ze=u.description||"",Ue={...u,metadata:{...u.metadata||{},...f}};return c`
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
            @click=${B}
          >
            ${C}
          </button>
          ${O(x,V)}
          ${oc(Ue)}
          ${sc({metadata:Ue.metadata,workspace_values:pe(),catalog:v(),execution_defaults:A(),expanded:E,presets:G()?.presets||[],preset_id:b,preset_busy:R},{onToggle:mt=>{E=mt,y()},onEdit:(mt,sr)=>{if(mt==="impl_runtime"||mt==="impl_model"||mt==="impl_effort"){D(mt,sr??"");return}T(mt,sr??"")},onPresetSelect:mt=>{b=mt,y()},onPresetApply:()=>{re()}})}
          ${de(we,ke)} ${ee(u)}
          ${Me(Ze)}
          ${Gl(N,Pe,{expanded:Ie,draft:ce,sending:Q,error:oe})}
          ${Re(u)} ${lt(u)} ${Mt(u)}
          ${_(u)} ${g(u)}
          ${Wl(u,yt)}
          ${_c({expanded:he,loading:Fe,error:Le,data:_e},{onToggle:je})}
          ${fc(We(),Be,{total:V,expanded:Je})}
        </div>
      </div>
    `}function y(){Ke(dt(),e)}return{load(u){u!==d&&(f={},b="",E=!1,S(),Ve(),ge()),d=u,p=null,ze(),m()},clear(){d=null,p=null,f={},b="",R=!1,E=!1,S(),Ve(),ge(),Ee.close(),qe.close(),Ke(c``,e)},destroy(){me&&(me(),me=null),Se&&(Se(),Se=null),De&&(De(),De=null),document.removeEventListener("keydown",Ne),Ee.destroy(),ue.parentNode&&ue.parentNode.removeChild(ue),qe.destroy(),xe.parentNode&&xe.parentNode.removeChild(xe),d=null,p=null,b="",R=!1,Ve(),ge(),Ke(c``,e)}}}function gc(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(d,p,f="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let b=typeof f=="string"?f.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function Ws(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function zs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function bc(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(r+=i-a,n=!0)}return n?r:null}function Hs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function k_(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:Ws(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function hc(e,t){let r=k_(e,t);return r?c`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?c`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?vt(r.deploy.at):""}
            >${Hs(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${zs(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function on(e){let t=Nt(e.created_at),r=Nt(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${vt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${vt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function $_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Pn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Gs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function cr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,b)=>(f.requested_at||0)-(b.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?$_(s.phase):null,d=s?.kind==="stale_work_backup_fresh",p=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:p}}function wr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return c`<div
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
  </div>`}var x_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function yc(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let l=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:x_[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function oa(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=kt(e.usage),s=Xt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,l=i?Nt(e.done_at):"",d=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",f=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",R=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,E=c`<span class="worker-mini__title">${e.title}</span>`,P=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",j=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",J=r.map(Qe=>Qe===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Qe}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Qe===e.completion_badge&&e.completion_title||""}
          >${Qe}</span
        >`),Z=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",W=n.length>0?n.map(Qe=>c`<span class="worker-usage" title=${Qe.tooltip}
              >${Qe.label}</span
            >`):s?c`<span class="worker-usage" title=${tn(e.usage)}
            >${s}</span
          >`:"",L=o?c`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?c`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",S=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",N=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",k=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",U=e.discard,oe=U?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${U?.attempt_id||""}
          data-operation-id=${U?.operation?.operation_id||""}
          data-discard-mode=${U?.confirmation||"unmerged"}
          ?disabled=${U?!U.enabled:e.discard_enabled===!1}
          title=${U?U.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${U?.label||"\uD3D0\uAE30"}
        </button>`:"",ce=e.stale_work||null,Q=ce?c`${ce.can_resume||ce.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ce.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ce.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            다시 확인
          </button>`:""}`:"",se=ce?c`<div class="worker-mini__stale">
        <strong>${ce.title}</strong>
        <span>${ce.summary}</span>
        <span>${ce.cause}</span>
        ${ce.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Ie=e.revise_action?c`<button
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
        </button>`:"",Ve=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||U?.operation||e.revise_action||ce);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">${b}${R}${E}</div>
          <div class="worker-mini__row2">
            ${W}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${vt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${zs(e.work_ms)}</span
                >`:""}${J}${L}
            <span class="worker-mini__actions"
              >${S}${N}${k}${oe}</span
            >
            ${on(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${d}${p}${b}${R}${P}${j}${J}${f}${Z}
            </div>
            <div class="worker-mini__body">${E}${se}</div>
            ${Ve?c`<div class="worker-mini__foot">
                  ${W}${L}
                  <span class="worker-mini__actions"
                    >${S}${N}${k}${oe}${Ie}${Q}</span
                  >
                  ${wr(e)}
                </div>`:""}
            ${on(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${b}${R}${E}${P}${j}${J}${f}${Z}${W}${L}${S}${N}${k}${oe}
            </div>
            ${wr(e)} ${on(e)}`}
  </div>`}function A_(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
    ${r?ps(r,e.status):""}
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
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":a?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${on(e)}
  </div>`}function tr(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?A_(n):oa(n))}
          </div>`}
  </section>`}function aa(e,t){return`${e}\0${t}`}function ia(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function S_(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function E_(e,t){return e==="internal"&&t===void 0}function vc(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function wc(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${vc(s)})`,scope:null,same_lane_ahead:!1,missing_internal:!1};let a=S_(e,n);return{id:e,label:`\u{1F512} ${e} (${a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"})`,scope:a,same_lane_ahead:!1,missing_internal:E_(a,s)}}function kc(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=aa(i.root_dir,l.id);r.set(d,{root_dir:i.root_dir,workspace_name:i.name,lane:l.id}),s.set(d,[]);for(let p of Array.isArray(l.items)?l.items:[])n.set(p.id,d)}for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=aa(i.root_dir,l.id),p=Array.isArray(l.items)?l.items[0]:null,f=Array.isArray(p?.blocked_by)?p.blocked_by:[],b=s.get(d);if(b)for(let R of f){let E=n.get(R);E&&E!==d&&!b.includes(E)&&b.push(E)}}let o=(i,l)=>{let d=new Set,p=[i];for(;p.length>0;){let f=p.pop();if(f===l)return!0;!f||d.has(f)||(d.add(f),p.push(...s.get(f)||[]))}return!1},a=new Map;for(let[i,l]of s){let d=[];for(let p of l){let f=r.get(p);o(p,i)&&f&&d.push(f)}d.length>0&&a.set(i,d)}return a}function $c(e){let t=ia(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=vc(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function xc(e,t){return aa(e,t)}var Ac=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Dn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Vs(e,t){let r=Ac.find(s=>s.step===e);if(!r)return null;let n=Ac.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Sc(e){let t=Dn.findIndex(r=>r.step===e);return Dn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Ur(e){let t=Dn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function T_(e){let t=Dn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:Dn.length}}function Ks(e){let t=T_(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ca=new Set(["queued","running","retry_pending","repairing"]),Ec=new Set(["failed","succeeded"]),C_={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Nn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},R_={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Nn.base_containment,child_sweep:Nn.child_sweep,branch_cleanup:Nn.branch_cleanup,parent_close:Nn.parent_close};function I_(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function L_(e,t,r){return!["verify","deploy"].includes(e.kind)||![...ca,...Ec].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function O_(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function la(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=C_[s];if(!o)return null;let a=Vs(r,`${n} ${o}`);return a?{...a,active:ca.has(s),failed:s==="failed"}:null}function M_(e){return!e||typeof e!="object"?null:R_[e.step]||null}function qn(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=M_(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),i=I_(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(E=>E&&typeof E=="object"&&L_(E,t,i)).sort(O_):[],d=a?l:[],p=d.find(E=>ca.has(E.state));if(p)return la(p);if(s)return s.step==="repo_operations"&&l[0]?la(l[0],!0):null;let f=d.find(E=>Ec.has(E.state)?E.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return la(f);if(n){let E=Vs(n.step,n.label);return E?{...E,active:!0,failed:!1}:null}let b=typeof e.cleanup_cursor=="string"?Nn[e.cleanup_cursor]:null;if(!b)return null;let R=Vs(b.step,b.label);return R?{...R,active:!0,failed:!1}:null}function Ys(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Tc={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Cc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Rc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function da(e){for(let t of Rc(e))if(Object.hasOwn(Tc,t))return Tc[t];return null}function ua(e){let t=null;for(let r of Rc(e))Object.hasOwn(Cc,r)&&(t=Cc[r]);return t}function Zs(e){let t=da(e),r=ua(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Ic(e,t){let r=da(e)??da(t),n=ua(t)??ua(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var Lc=160;function P_(e){return e.length>Lc?`${e.slice(0,Lc)}\u2026`:e}function D_(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${P_(e.command)}</code>`:""}
  </div>`}function N_(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function pa(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Oc(e){let t=e.failure?Zs(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${D_(e.failure.cause_detail)}
          ${N_(e.failure.reason)}
          ${wr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function q_(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?pa(t-e.started_at):"\u2014",a=ar(e),i=Ar(e),l=kt(e.usage),d=Xt(e.usage),p=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,f=e.base_exception||null,b=e.landing,R=e.attempt_id&&e.attempt_id===r,E=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${R?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
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
    ${b?c`<div class="rtile__landing">
          <span
            class="merge-step${b.failed?" merge-step--failed":""}"
            style=${`--progress: ${b.percent}%`}
            >${b.label}${b.index>0?c`<span class="merge-step__n"
                  >${b.index}/${b.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||l.length>0||d||p||f?c`<div class="rtile__meta">
          ${p?c`<span class="worker-mini__badge">${p}</span>`:""}
          ${f?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${f}</span
              >`:""}
          ${a?c`<span class="rtile__runner">${a}</span>`:""}
          ${l.length>0?l.map(P=>c`<span class="worker-usage" title=${P.tooltip}
                    >${P.label}</span
                  >`):d?c`<span
                  class="worker-usage"
                  title=${tn(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${on(e)} ${wr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function fa(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>q_(s,t,r))}
  </div>`}function Wr(e){return c`<svg
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
  </svg>`}function _a(){return Wr(kr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ma(){return Wr(kr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Mc(){return Wr(kr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Pc(){return Wr(kr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Dc(){return Wr(kr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Nc(){return Wr(kr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function qc(){return Wr(kr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Fn=1,F_=6e4,j_={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},B_=new Set(["auto_merge","merged","merge","done"]),Fc={running:3,paused:2,failed:1};function U_(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function W_(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let f=t.get(a.bead_id),b=typeof f=="number"&&f>0&&typeof a.finished_at=="number"&&f>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let f=Fc[d.run_state],b=Fc[i];if(f>b||f===b&&(d.started_at??0)>(l??0))continue}let p=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:zt(e,a.bead_id),can_pause:i==="running"&&p,can_resume:i!=="running"&&p&&!n.has(a.attempt_id)})}return o}function jc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function $t(e){return e&&typeof e=="object"?e:{}}function ga(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let k of s)k&&typeof k.root_dir=="string"&&a.set(k.root_dir,k);let i=[],l=[],d=[],p=[],f=[],b=[],R=new Map,E=new Map,P=new Map;for(let k of n){if(!k||typeof k.root_dir!="string")continue;let U=k.root_dir,oe=k.name||U,ce=a.get(U),Q=ce&&typeof ce.revision=="number"?ce.revision:typeof k.revision=="number"?k.revision:0,se=$t(k.attempts),Ie=$t(k.bead_titles),Ve=$t(k.pr_observations),Qe=$t(k.admission),at=$t(k.revise_parked),tt=$t(k.merge_queue_state),st=$t(k.cleanup_failed),fe=$t(k.discard_operations),Pe=$t(k.bead_blocked_by),ue=$t(k.pr_activity),Ee=Array.isArray(k.repo_operations)?k.repo_operations:[],xe=Array.isArray(k.merge_queue)?k.merge_queue:[],qe=new Set(xe.filter(z=>z&&typeof z.bead_id=="string").map(z=>z.bead_id)),he=new Map(xe.filter(z=>z&&typeof z.bead_id=="string").map(z=>[z.bead_id,z])),Fe=Array.isArray(k.queue)?k.queue:[],Le=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).filter(z=>z&&/^s[1-5]$/.test(z.id)&&Array.isArray(z.entries)),_e=$t(k.lane_states),ye=typeof k.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(k.serial_lane_count))):Math.min(5,Le.length);P.set(U,ye);let H=new Map(Le.map(z=>[z.id,z])),K=new Map;for(let z of Le)for(let te of z.entries)te&&typeof te.bead_id=="string"&&K.set(te.bead_id,z.id);let ge=Array.isArray(k.done)?k.done:[];for(let z of ge)z&&typeof z.bead_id=="string"&&b.push({id:z.bead_id,root_dir:U,workspace_name:oe});let Ce=new Map;for(let z of ge)z&&typeof z.bead_id=="string"&&typeof z.added_at=="number"&&Ce.set(z.bead_id,z.added_at);let je=z=>({id:z,title:Ie[z]||z,root_dir:U,workspace_name:oe,expected_revision:Q,draggable:!1}),We=new Set;for(let[z,te]of W_(se,Ce))We.add(z),l.push({...je(z),lane:"running",...K.has(z)?{serial_lane_id:K.get(z)}:{},attempt_id:te.attempt_id,run_state:te.run_state,can_pause:te.can_pause,can_resume:te.can_resume,started_at:te.started_at,last_event_at:te.last_event_at,runner:te.runner,model:te.model,effort:te.effort,speed:te.speed,resumed_from:te.resumed_from,continuation_mode:te.continuation_mode,usage:te.usage,discard:cr(fe,z,{attempt_id:te.attempt_id}),badges:te.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:te.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:te.run_state==="failed"});for(let z of Array.isArray(k.pr_wait)?k.pr_wait:[]){let te=z&&z.bead_id;if(typeof te!="string"||We.has(te))continue;We.add(te);let Te=$t(Ve[te]),Be=$t(Te.pr),pe=Te.gate?$t(Te.gate):null,m=qe.has(te),v=he.get(te)?.continuation_action||null,A=!!v&&v.continuation===null,M=tt.active===te,G=z.external===!0,Y=st[te]||null,ne=$t(ue[te]),re=qn({bead_id:te,merge_sha:z.merge_sha,cleanup_cursor:z.cleanup_cursor,merge_progress:ne.merge_progress||null,cleanup_failed:Y,repo_operations:Ee}),me=Ys(re),Se=!!pe&&pe.base_badge==="\uCDA9\uB3CC",De=!!Y&&["child_sweep","branch_cleanup","parent_close"].includes(Y.step)&&!!pe&&pe.tier==="merged",Ne=G&&!!Y&&!!pe&&pe.tier==="merged",ze=!!pe&&["closed_unmerged","review","undecidable"].includes(pe.tier),et=cr(fe,te,{external:G,merge_active:M||re?.step==="merge",merge_queued:m,cleanup_active:me,merged:!!Y||pe?.tier==="merged"}),B=!!et.operation;d.push({...je(te),lane:"pr_wait",pr_number:typeof Be.number=="number"?Be.number:null,pr_url:typeof Be.url=="string"?Be.url:void 0,external:G,usage:zt(se,te),merge_step:re,badges:A?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:re?[pe?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Y?[Ur(Y.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Ur(Y.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof pe?.gate_badge=="string"&&pe.gate_badge.length>0?[pe.gate_badge]:[],alert:re?re.failed===!0:!!Y||ze,reason:Y&&re?.active!==!0?Ks(Y.step):"PR \uB300\uAE30",merge_action:pe?.tier==="merged"&&!De&&!Ne?!1:!m||A,merge_enabled:!B&&(A||pe?.enabled===!0||Se||De||Ne),merge_label:A?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ne||De?"\uC815\uB9AC \uC7AC\uAC1C":Se&&!De?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:A?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":B?et.error?`\uD3D0\uAE30 \uC2E4\uD328: ${et.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${et.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Ne?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":De?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Se?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":pe?.enabled===!0?`\uBA38\uC9C0 (${pe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${pe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:m&&!A,cancel_enabled:!M,continuation_mismatch:v?.mismatch||null,discard:et,discard_action:et.action,discard_enabled:et.enabled,discard_title:et.title})}let $e=(z,te,Te,Be)=>{let pe=z&&z.bead_id;if(typeof pe!="string"||We.has(pe))return null;We.add(pe);let m=at[pe],v=cr(fe,pe),A=v.operation?v:null,M={...je(pe),lane:te,draggable:!A,discard:A||void 0,reason:jc(Qe,pe),queue_position:Te+1,queue_index:Te,queue_length:Be,badges:m?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!m,revise_action:!!m,revise_enabled:!!m&&!A,revise_title:m?m.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${m.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Pe,pe)&&(M.blocked_by=Array.isArray(Pe[pe])?Pe[pe].filter(G=>typeof G=="string"&&G.length>0):[]),M};for(let z=0;z<Fe.length;z++){let te=$e(Fe[z],"queue",z,Fe.length);if(!te)continue;p.push(te);let Te=R.get(U);Te?Te.push(te):R.set(U,[te])}let Je=[];for(let z=0;z<Le.length;z++){let te=Le[z],Te=[];for(let pe=0;pe<te.entries.length;pe++){let m=$e(te.entries[pe],te.id,pe,te.entries.length);m&&(Te.push(m),p.push(m))}if(Te.length===0)continue;let Be=$t(_e[te.id]);Je.push({id:te.id,index:z,items:Te,occupied_by:Array.isArray(Be.occupied_by)?Be.occupied_by.filter(pe=>typeof pe=="string"):[],corrections:Array.isArray(Be.corrections)?Be.corrections.length:0,cycle:Be.cycle===!0})}E.set(U,Je);let rt=Array.from({length:ye},(z,te)=>{let Te=`s${te+1}`,Be=H.get(Te),pe=Be&&Array.isArray(Be.entries)?Be.entries:[],m=$t(_e[Te]);return{id:Te,index:pe.length,length:pe.length,occupied_by:Array.isArray(m.occupied_by)?m.occupied_by.filter(v=>typeof v=="string"):[]}});for(let z of Array.isArray(k.runnable)?k.runnable:[]){let te=z&&z.bead_id;typeof te!="string"||We.has(te)||(We.add(te),i.push({...je(te),title:z.title||Ie[te]||te,lane:"runnable",draggable:!0,reason:jc(Qe,te),created_at:z.created_at??void 0,updated_at:z.updated_at??void 0,labels:Array.isArray(z.labels)?z.labels:[],spec_reviewer:typeof z.spec_reviewer=="string"?z.spec_reviewer:void 0,plan_state:z.plan_state==="approved"||z.plan_state==="authored"?z.plan_state:"none",workflow:z.route?{route:z.route,chips:{route:z.route}}:null,blocked:z.blocked===!0,...Array.isArray(z.blocked_by)?{blocked_by:z.blocked_by.filter(Te=>typeof Te=="string"&&Te.length>0)}:{},place_index:Fe.length,place_lanes:rt}))}for(let z of ge){let te=z&&z.bead_id;if(typeof te!="string"||We.has(te)||(We.add(te),o!==void 0&&typeof z.added_at=="number"&&z.added_at<o))continue;let Te=U_(se,te);f.push({...je(te),lane:"done",done:!0,usage:zt(se,te),done_at:typeof z.added_at=="number"?z.added_at:void 0,done_kind:Te&&typeof Te.done_kind=="string"?Te.done_kind:null})}}let j=new Map;s.forEach((k,U)=>{k&&typeof k.root_dir=="string"&&j.set(k.root_dir,U)});let J=r&&r.running_sort==="repo"?"repo":"started";l.sort((k,U)=>{if(J==="repo"){let Q=j.get(k.root_dir)??Number.MAX_SAFE_INTEGER,se=j.get(U.root_dir)??Number.MAX_SAFE_INTEGER;if(Q!==se)return Q-se}let oe=typeof k.started_at=="number"&&Number.isFinite(k.started_at)?k.started_at:null,ce=typeof U.started_at=="number"&&Number.isFinite(U.started_at)?U.started_at:null;return oe!==null&&ce!==null&&oe!==ce?oe-ce:oe===null&&ce!==null?1:oe!==null&&ce===null?-1:k.id.localeCompare(U.id)}),f.sort((k,U)=>(U.done_at??0)-(k.done_at??0));let Z=s.length>0?s:n.map(k=>({root_dir:k&&k.root_dir,name:k&&k.name,auto_advance:k&&k.auto_advance,auto_merge:k&&k.auto_merge,slots:k&&k.slots,revision:k&&k.revision,runner_catalog:k&&k.runner_catalog})),W=[];for(let k of Z){if(!k||typeof k.root_dir!="string")continue;let U=R.get(k.root_dir)||[],oe=E.get(k.root_dir)||[];W.push({root_dir:k.root_dir,name:k.name||k.root_dir,auto_advance:k.auto_advance===!0,auto_merge:k.auto_merge===!0,slots:typeof k.slots=="number"&&k.slots>=Fn?k.slots:Fn,revision:typeof k.revision=="number"?k.revision:0,runner_catalog:$t(k.runner_catalog),items:U,sublanes:{parallel:U,serial:oe},serial_lane_count:P.get(k.root_dir)||0})}let L={runnable:i,queue:p,queue_groups:W,running:l,pr_wait:d,done:f,automation:{total:W.length,both_on:W.filter(k=>k.auto_advance&&k.auto_merge).length}},S=ia(L);for(let k of b)S.has(k.id)||S.set(k.id,{root_dir:k.root_dir,workspace_name:k.workspace_name,lane:"done",state:"done"});for(let k of[...L.queue,...L.runnable]){if(!Object.hasOwn(k,"blocked_by"))continue;let U=S.get(k.id);k.blockers=(k.blocked_by||[]).map(oe=>wc(oe,U,S,s)),k.blocker_warnings=k.blockers.filter(oe=>oe.missing_internal).map(oe=>`\u26A0 \uC120\uD589 ${oe.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),k.blocker_warnings.length>0&&(k.alert=!0)}let N=kc(L.queue_groups);for(let k of L.queue_groups)for(let U of k.sublanes.serial){let oe=N.get(xc(k.root_dir,U.id));oe&&(U.cross_wait_peers=oe)}return L}function z_(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<F_;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${vt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${Nt(e,t)}</span
        >`}</span
  >`}function jn(e){return c`<div class="mon-c__title">${e.title}</div>`}function Bn(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Xs(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function ba(e){let t=kt(e.usage),r=Xt(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${tn(e.usage)}
        >${r}</span
      >`:""}function ha(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function H_(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${ma()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${_a()}
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
          ${Pc()}
        </button>`:""}
  </span>`}function Bc(e){if(!Object.hasOwn(e,"blocked_by"))return"";let t=Array.isArray(e.blockers)?e.blockers:[];return t.length===0?e.blocked?c`<span class="mon-blocker">🔒 blocked</span>`:"":t.map(r=>c`<span
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
      </span>`)}function Uc(e){let t=Array.isArray(e.blocker_warnings)?e.blocker_warnings:[];return t.length>0?c`<div class="mon-blocker-warnings">
        ${t.map(r=>c`<div class="mon-blocker-warning">${r}</div>`)}
      </div>`:""}function Wc(){return c`<span class="mon-link mon-popover-owner">
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
  </span>`}function G_(e,t){let r=typeof e.started_at=="number"?pa(t-e.started_at):"";return c`${jn(e)}
    <div class="mon-c__meta">
      ${ha(e)}${z_(e.last_event_at,t)}${Bn(e)}${Xs(e)}
      ${ar(e)?c`<span class="mon-c__model">${ar(e)}</span>`:""}
      ${Ar(e)?c`<span
            class="rtile__resumed"
            title=${Ar(e)}
            >↻</span
          >`:""}
      ${e.serial_lane_id?c`<span class="mon-c__lane">${e.serial_lane_id}</span>`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${ba(e)}${H_(e)}${wr(e)}
    </div>`}function V_(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Nt(e.updated_at);return c`${jn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Bn(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?c`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?c`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${us(e.labels,null).map(l=>c`<span class="ctl-chip ctl-chip--label">${l}</span>`)}
      ${Xs(e)}
      ${i?c`<span title=${`\uC218\uC815 ${vt(e.updated_at)}`}
            >수정 ${i}</span
          >`:""}
      ${e.reason?c`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      ${Bc(e)}
      <span class="mon-c__ops">
        ${Wc()}
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
            ${(e.place_lanes||[]).map(l=>c`<button
                  type="button"
                  class="mon-place__choice"
                  data-lane=${l.id}
                  data-place-index=${String(l.index)}
                  role="menuitem"
                  aria-label=${`${l.id} \xB7 ${l.occupied_by.length>0?`\uC810\uC720 ${l.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"} \xB7 \uB300\uAE30 ${l.length}`}
                >
                  <strong>${l.id}</strong
                  ><span
                    >${l.occupied_by.length>0?`\uC810\uC720 ${l.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"}
                    · 대기 ${l.length}</span
                  >
                </button>`)}
          </span>
        </span>
      </span>
    </div>
    ${Uc(e)}`}function K_(e){let t=!!e.discard?.operation;return c`${jn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Bn(e)}
      ${ha(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
      ${Bc(e)}
      <span class="mon-c__ops">
        ${Wc()}
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
    ${Uc(e)} ${wr(e)}
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
        </div>`:""}`}function Y_(e){let t=e.merge_step||null,r=!!(Xt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return c`${jn(e)}
    <div class="mon-c__meta">
      ${Bn(e)}${Xs(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${ha(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?c`<div class="mon-c__tail">
          ${ba(e)}${t?c`<span
                class="merge-step${t.failed?" merge-step--failed":""}"
                style=${`--progress: ${t.percent}%`}
                >${t.label}${t.index>0?c`<span class="merge-step__n"
                      >${t.index}/${t.total}</span
                    >`:""}</span
              >`:""}
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
          ${wr(e)}
        </div>`:""}`}function Z_(e,t){let r=e.done_kind||"",n=r?j_[r]||r:"",s=Nt(e.done_at,t);return c`${jn(e)}
    <div class="mon-c__meta">
      ${Bn(e)}${Xs(e)}
      ${n?c`<span
            class="mon-live__kind${B_.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${ba(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${vt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function zc(e,t){return e.lane==="running"?G_(e,t):e.lane==="runnable"?V_(e):e.lane==="queue"||/^s[1-5]$/.test(e.lane)?K_(e):e.lane==="pr_wait"?Y_(e):Z_(e,t)}function Hc(e){let t=String(e.revision),r=e.sublanes?e.sublanes.parallel.length+e.sublanes.serial.reduce((n,s)=>n+s.items.length,0):e.items.length;return c`<header
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
        ${e.auto_advance?ma():_a()}
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
        ${Dc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Nc()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Fn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function Gc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=or.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Mc():qc()}
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
        ${or.map(i=>c`<option
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
  </div>`}function Vc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Kc(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return kt(hs(t));let r={};for(let i of mr)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let d=!1;for(let p of mr){let f=l[p];typeof f=="number"&&Number.isFinite(f)&&(r[p]+=f,n=!0,d=!0)}if(d){o+=1;let p=l.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Xt(r):null}var Yc="bdui.monitor.done-range",Zc="bdui.monitor.running_sort",Xc="beads-ui.monitor.candidate-filter",ya={show_blocked:!1};function X_(){try{let e=window.localStorage.getItem(Xc);if(!e)return{...ya};let t=JSON.parse(e);return!t||typeof t!="object"?{...ya}:{show_blocked:t.show_blocked===!0}}catch{return{...ya}}}function Q_(e){try{window.localStorage.setItem(Xc,JSON.stringify({show_blocked:e.show_blocked}))}catch{}}function J_(e,t){if(t.show_blocked)return{visible:e,hidden_blocked:0};let r=e.filter(n=>n.blocked!==!0);return{visible:r,hidden_blocked:e.length-r.length}}function em(){try{let e=window.localStorage.getItem(Yc);return Wt(e)?e:Dt}catch{return Dt}}function tm(e){try{window.localStorage.setItem(Yc,e)}catch{}}function rm(){try{return window.localStorage.getItem(Zc)==="repo"?"repo":"started"}catch{return"started"}}function nm(e){try{window.localStorage.setItem(Zc,e)}catch{}}var Qc="tab:monitor:pipeline",sm=1e3,om=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Qs(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return c`<div
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
    ${zc(e,t)}
  </div>`}function am(e,t){let r=e.serial_lane_count>0||e.sublanes.serial.length>0,n=r?c`<section class="mon-sublane mon-sublane--parallel">
        <header class="mon-sublane__hd">
          <span class="mon-sublane__name">병렬</span>
          <span class="mon-sublane__count"
            >대기 ${e.sublanes.parallel.length}</span
          >
        </header>
        <div class="mon-group__list">
          ${e.sublanes.parallel.map(s=>Qs(s,t))}
        </div>
      </section>`:c`<div class="mon-group__list">
        ${e.items.map(s=>Qs(s,t))}
      </div>`;return c`<div class="mon-group" data-root-dir=${e.root_dir}>
    ${Hc(e)} ${n}
    ${r?e.sublanes.serial.map(s=>c`<section
              class="mon-sublane mon-sublane--serial"
              data-serial-lane=${s.id}
            >
              <header class="mon-sublane__hd">
                <span class="mon-sublane__name">${s.id}</span>
                <span class="mon-sublane__count"
                  >대기 ${s.items.length}</span
                >
                ${s.occupied_by.length>0?c`<span class="mon-sublane__held"
                      >${`\u25CF \uC810\uC720 \uC911 \xB7 ${s.occupied_by.join(", ")} (\uBA38\uC9C0\uAE4C\uC9C0 \uC720\uC9C0)`}</span
                    >`:""}
                ${s.corrections>0?c`<span class="mon-sublane__corrections"
                      >순서 자동 교정 ${s.corrections}건</span
                    >`:""}
                ${s.cross_wait_peers?.map(o=>c`<span class="mon-sublane__cross-wait"
                      >⚠ 상호 정지 — ${o.workspace_name}·${o.lane}과 교차
                      대기</span
                    >`)}
              </header>
              ${s.cycle?c`<div class="mon-sublane__cycle">
                    ⛔ 의존 사이클 — 자동 교정 불가
                  </div>`:""}
              <div class="mon-group__list">
                ${s.items.map(o=>Qs(o,t))}
              </div>
            </section>`):""}
  </div>`}function Jc(e,t){let r=ft("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,l=t.now||(()=>Date.now()),d=t.confirm||(m=>typeof globalThis.confirm!="function"||globalThis.confirm(m)),p=em(),f=rm(),b=X_();function R(){let m=or.find(v=>v.value===p);return m?m.label:""}let E=document.createElement("div");E.className="mon",e.appendChild(E);let P=ga(null,null),j=new Map,J=null,Z=null;async function W(m,v,A,M,G=!0){if(!o||!A)return null;let Y=await o(m,{...v,root_dir:A,expected_revision:M});if(Y&&Y.conflict&&G){Y.queue&&j.set(A,Y.queue);let ne=Y.queue&&typeof Y.queue.revision=="number"?Y.queue.revision:M;Y=await o(m,{...v,root_dir:A,expected_revision:ne})}return Y&&Y.queue&&A&&j.set(A,Y.queue),Y}function L(m,v){let A=j.get(m),M=s&&s.get?s.get():null,G=(Array.isArray(M)?M:[]).find(ne=>ne?.root_dir===m);return(A||G)?.merge_queue?.find(ne=>ne.bead_id===v)?.continuation_action}async function S(m,v,A,M){let G=await W(m,v,A,M),Y=j.get(A)?.revision??G?.queue?.revision??M;return _r(G,(ne,re)=>W(m,{...v,continuation:ne,decision_token:re},A,Y,!1),{refresh:ne=>W(m,v,A,ne?.queue?.revision??j.get(A)?.revision??Y,!1)})}async function N(m,v,A,M){let G=await _r({continuation_mismatch:M},(ne,re)=>W("worker-merge-queue-add",{bead_id:v,continuation:ne,decision_token:re},m,A,!1)),Y=G?.queue?.merge_queue?.find(ne=>ne.bead_id===v)?.continuation_action;G?.applied!==!0&&Y?.continuation===null&&Y.mismatch&&await N(m,v,G.queue.revision,Y.mismatch)}async function k(m,v,A){let M=await W("worker-discard",m,v,A);if(M&&M.discarded===!0){ae(Gs(M),"success",5e3);return}if(M&&M.reason){ae(`\uD3D0\uAE30 \uC2E4\uD328: ${M.reason}`,"error");return}if(M&&M.accepted&&M.pending==="merged_revert"){ae("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(M&&M.accepted){ae(`\uD3D0\uAE30 \uC9C4\uD589: ${M.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}M&&!M.conflict&&ae("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function U(m,v,A){return!o||!A?null:await o(m,{...v,root_dir:A})}async function oe(m){if(!o||!m&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let v=await o("monitor-auto-toggle",{on:m}),A=v&&Array.isArray(v.failed)?v.failed:[];A.length>0&&ae(`\uC790\uB3D9\uD654 ${m?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${A.map(M=>M.root_dir).join(", ")}`,"error",3200)}async function ce(){let m=new Map;for(let v of P.pr_wait)m.has(v.root_dir)||m.set(v.root_dir,v.expected_revision);for(let[v,A]of m)await W("worker-merge-queue-add-all",{},v,A)}let Q=null,se=!1,Ie=null;function Ve(){Ie!==null&&clearTimeout(Ie),Ie=setTimeout(()=>{Ie=null,se=!1},0)}function Qe(m){let v=m.target;return typeof v?.closest=="function"?v.closest(".mon-group"):null}function at(m){let v=Qe(m);return!v||!Q?null:(v.getAttribute("data-root-dir")||"")===Q.root_dir?v:null}function tt(){for(let m of Array.from(E.querySelectorAll(".mon-group--drag-over")))m.classList.remove("mon-group--drag-over")}function st(m){let v=m.target,A=typeof v?.closest=="function"?v.closest('.mon-card[draggable="true"]'):null;if(A){Q={bead_id:A.getAttribute("data-issue-id")||"",lane:A.getAttribute("data-lane")||"",root_dir:A.getAttribute("data-root-dir")||"",revision:Number(A.getAttribute("data-revision")||0)||0,queue_index:Number(A.getAttribute("data-queue-index")),queue_length:Number(A.getAttribute("data-queue-length")),place_index:Number(A.getAttribute("data-place-index"))},se=!0;try{m.dataTransfer?.setData("text/plain",Q.bead_id),m.dataTransfer&&(m.dataTransfer.effectAllowed="move")}catch{}}}function fe(m){let v=at(m);v&&(m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect="move"),v.classList.add("mon-group--drag-over"))}function Pe(m){Qe(m)?.classList.remove("mon-group--drag-over")}function ue(){Q=null,tt(),Ve()}function Ee(m){let v=at(m),A=Q;if(Q=null,tt(),!v||!A||!A.bead_id)return;m.preventDefault();let M=m.target,G=typeof M?.closest=="function"?M.closest('.mon-card[data-lane="queue"]'):null,Y=G&&v.contains(G)?Number(G.getAttribute("data-queue-index")):NaN;if(A.lane==="runnable"){let me=Number.isFinite(Y)?Y:A.place_index;if(!Number.isFinite(me))return;W("worker-queue-place",{bead_id:A.bead_id,index:me},A.root_dir,A.revision);return}if(A.lane!=="queue"||G&&G.getAttribute("data-issue-id")===A.bead_id)return;let ne=A.queue_index,re=Number.isFinite(Y)?ne>Y?Y:Y-1:A.queue_length-1;!Number.isFinite(re)||re<0||re===ne||W("worker-queue-reorder",{bead_id:A.bead_id,to_index:re},A.root_dir,A.revision)}function xe(m){let v=J_(P.runnable,b),A={runnable:v.visible,queue:P.queue,running:P.running,pr_wait:P.pr_wait,done:P.done};return c`${Gc({automation:P.automation,counts:{running:P.running.length,queue:P.queue.length,pr_wait:P.pr_wait.length},running_sort:f,done_range:p,token_total:Kc(P.done),token_tooltip:Vc(R())})}
      <div class="worker-lanes mon-lanes">
        ${om.map(M=>{let G=A[M.lane],Y=M.lane==="queue"?P.queue_groups.length>0?c`${P.queue_groups.map(ne=>am(ne,m))}`:void 0:G.length>0?c`${G.map(ne=>Qs(ne,m))}`:void 0;return tr({id:`monitor-${M.lane}`,lane:M.pane,title:M.lane==="done"?`\uC644\uB8CC\xB7${R()}`:M.title,items:G,empty:M.empty,body:Y,live:M.lane==="running"&&G.length>0,header_control:M.lane==="runnable"?c`<span class="mon-candidate-filter">
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
                    ${v.hidden_blocked>0?c`<span class="worker-filter__hidden"
                          >숨김 ${v.hidden_blocked}건</span
                        >`:""}
                  </span>`:M.lane==="pr_wait"&&G.length>0?c`<button
                      type="button"
                      class="mon-lane-op mon-merge-all"
                      title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                    >
                      일괄 머지
                    </button>`:""})})}
      </div>`}function qe(){let m=s&&s.get?s.get():null,v=s&&s.getWorkspacesState?s.getWorkspacesState():[],A=l();P=ga(m,v,{done_since:Pr(p,A),running_sort:f}),Ke(xe(A),E)}function he(m,v){let A=a?a():void 0;if(!v||!A||v===A||!i){n(m);return}i(v).then(()=>{n(m)}).catch(M=>{r("workspace switch for %s failed: %o",v,M)})}function Fe(m){return{root_dir:m.getAttribute("data-root-dir")||"",revision:Number(m.getAttribute("data-revision")||0)||0}}function Le(m){if(typeof m=="string"&&m.length>0)return m;if(m&&typeof m=="object"){let v=m;if(typeof v.message=="string"&&v.message.length>0)return v.message;if(typeof v.error=="string"&&v.error.length>0)return v.error;if(v.error&&typeof v.error=="object"&&typeof v.error.message=="string")return v.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function _e(m,v){let A=m.querySelector(".mon-link__trigger"),M=m.querySelector(".mon-link__popover"),G=m.querySelector(".mon-link__error");!A||!M||!G||(Ce(),M.hidden=!1,A.setAttribute("aria-expanded","true"),G.textContent=v,G.hidden=!1)}async function ye(m,v,A){let M=v.getAttribute("data-root-dir")||"",G=v.getAttribute("data-issue-id")||"";if(!(!G||!A||A===G))try{await U(m,{a:G,b:A},M),Ce()}catch(Y){_e(v,Le(Y))}}function H(m,v){let{root_dir:A,revision:M}=Fe(m),G=m.getAttribute("data-issue-id")||"",Y=v.dataset.attemptId||m.getAttribute("data-attempt-id")||"",ne=v.classList;if(ne.contains("mon-link__trigger")){We(v);return}if(ne.contains("mon-link__candidate")||ne.contains("mon-link__direct")){let re=v.dataset.targetId||"";ye("dep-add",m,re);return}if(ne.contains("mon-blocker__remove")){let re=v.dataset.blockerId||"";ye("dep-remove",m,re);return}if(ne.contains("mon-place__choice")){let re=v.dataset.lane||"parallel",me=Number(v.dataset.placeIndex||0)||0;Ce(),W("worker-queue-place",{bead_id:G,...re==="parallel"?{}:{lane:re},index:me},A,M);return}if(ne.contains("worker-card__place")){je(v);return}if(ne.contains("mon-op--up")||ne.contains("mon-op--down")){let re=Number(m.getAttribute("data-queue-index")||0)||0,me=ne.contains("mon-op--up")?re-1:re+1;if(me<0)return;W("worker-queue-reorder",{bead_id:G,.../^s[1-5]$/.test(m.dataset.lane||"")?{lane:m.dataset.lane}:{},to_index:me},A,M);return}if(ne.contains("mon-op--remove")){W("worker-queue-remove",{bead_id:G},A,M);return}if(ne.contains("mon-op--pause")){U("worker-attempt-pause",{attempt_id:Y},A);return}if(ne.contains("mon-op--discard")){if(!d(Pn(G,"unmerged")))return;k({bead_id:G,...Y?{attempt_id:Y}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},A,M);return}if(ne.contains("mon-op--resume")){Jr().then(re=>{if(re!==null)return S("worker-attempt-resume",{attempt_id:Y,...re!==""?{instructions:re}:{}},A,M)});return}if(ne.contains("mon-op--dismiss")){W("worker-attempt-dismiss",{attempt_id:Y},A,M);return}if(ne.contains("worker-mini__merge")){let re=L(A,G);re?.mismatch&&re.continuation===null?N(A,G,M,re.mismatch):W("worker-merge-queue-add",{bead_id:G},A,M);return}if(ne.contains("worker-mini__merge-cancel")){W("worker-merge-queue-remove",{bead_id:G},A,M);return}if(ne.contains("worker-mini__discard")){let re=v.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(Pn(G,re)))return;k({bead_id:G,...Y?{attempt_id:Y}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},A,M);return}if(ne.contains("worker-mini__revise-fix")){S("worker-revise-fix",{bead_id:G},A,M);return}ne.contains("worker-mini__revise-approve")&&W("worker-revise-approve",{bead_id:G},A,M)}function K(m){m.querySelector(".mon-link__list")?.replaceChildren();let A=m.querySelector(".mon-link__search");A&&(A.value="");let M=m.querySelector(".mon-link__direct");M&&(M.hidden=!0,M.dataset.targetId="",M.textContent="");let G=m.querySelector(".mon-link__empty");G&&(G.hidden=!0);let Y=m.querySelector(".mon-link__error");Y&&(Y.hidden=!0,Y.textContent="")}function ge(m,v){let A=m.querySelector(".mon-link__list");if(!A)return;let M=document.createDocumentFragment(),G=$c(P).filter(Y=>Y.id!==v);for(let Y of G){let ne=document.createElement("button");ne.type="button",ne.className="mon-link__candidate",ne.dataset.targetId=Y.id,ne.dataset.search=`${Y.id} ${Y.title} ${Y.location}`.toLocaleLowerCase();let re=document.createElement("strong");re.textContent=Y.id;let me=document.createElement("span");me.textContent=Y.title;let Se=document.createElement("small");Se.textContent=Y.location,ne.append(re,me,Se),M.append(ne)}A.replaceChildren(M)}function Ce(){for(let m of Array.from(E.querySelectorAll(".mon-card-popover"))){let v=m;v.hidden=!0,v.classList.contains("mon-link__popover")&&K(v)}for(let m of Array.from(E.querySelectorAll('[aria-expanded="true"]')))m.setAttribute("aria-expanded","false")}function je(m){let A=m.closest(".mon-place")?.querySelector(".mon-place__popover")||null;if(!A)return;let M=A.hidden;Ce(),M&&(A.hidden=!1,m.setAttribute("aria-expanded","true"))}function We(m){let A=m.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!A)return;let M=A.hidden;if(Ce(),M){let G=m.closest(".mon-card");ge(A,G?.getAttribute("data-issue-id")||""),A.hidden=!1,m.setAttribute("aria-expanded","true");let Y=A.querySelector(".mon-link__search");Y&&($e(Y),Y.focus())}}function $e(m){let v=m.closest(".mon-link__popover"),A=m.closest(".mon-card");if(!v||!A)return;let M=m.value.trim(),G=M.toLocaleLowerCase(),Y=0,ne=!1;for(let Ne of Array.from(v.querySelectorAll(".mon-link__candidate"))){let ze=Ne,et=ze.dataset.targetId||"",B=G.length===0||(ze.dataset.search||"").includes(G);ze.hidden=!B,B&&(Y+=1),et.toLocaleLowerCase()===G&&(ne=!0)}let re=v.querySelector(".mon-link__direct"),me=A.getAttribute("data-issue-id")||"";if(re){let Ne=M.length>0&&!ne&&G!==me.toLocaleLowerCase();re.hidden=!Ne,re.dataset.targetId=Ne?M:"",re.textContent=Ne?`\uC9C1\uC811 \uC785\uB825 \xB7 ${M}`:"",Ne&&(Y+=1)}let Se=v.querySelector(".mon-link__empty");Se&&(Se.hidden=Y>0);let De=v.querySelector(".mon-link__error");De&&(De.hidden=!0,De.textContent="")}function Je(m){let v=m.target;v&&E.contains(v)&&typeof v.closest=="function"&&v.closest(".mon-popover-owner")||Ce()}function rt(m){if(m.key!=="Escape")return;let v=E.querySelector('[aria-expanded="true"]');Ce(),v?.focus()}function z(m){let v=se;se=!1;let A=m.target;if(!A||typeof A.closest!="function"||A.closest("dialog")||A.closest("a"))return;let M=A.closest(".mon-running-sort");if(M){m.preventDefault(),f=M.getAttribute("data-sort")==="repo"?"repo":"started",nm(f),qe();return}let G=A.closest(".mon-auto-all");if(G){m.preventDefault(),oe(G.getAttribute("data-on")==="true");return}if(A.closest(".mon-merge-all")){m.preventDefault(),ce();return}let ne=A.closest(".mon-ctl--advance");if(ne){m.preventDefault();let{root_dir:Ne,revision:ze}=Fe(ne);W("worker-automation-toggle",{on:ne.getAttribute("data-on")==="true"},Ne,ze);return}let re=A.closest(".mon-ctl--merge-auto");if(re){m.preventDefault();let{root_dir:Ne,revision:ze}=Fe(re);W("worker-merge-auto-toggle",{on:re.getAttribute("data-on")==="true"},Ne,ze);return}let me=A.closest(".mon-card");if(!me)return;let Se=A.closest("button");if(Se){m.preventDefault(),H(me,Se);return}let De=me.getAttribute("data-issue-id");De&&!v&&(m.preventDefault(),he(De,me.getAttribute("data-root-dir")||""))}function te(m){let v=m.target;if(!v||typeof v.closest!="function")return;let A=v.closest(".mon-filter__blocked");if(A){b={show_blocked:A.checked},Q_(b),qe();return}let M=v.closest(".mon-done-range");if(M){p=Wt(M.value)?M.value:Dt,tm(p),qe();return}let G=v.closest(".mon-slots__input");if(!G)return;let{root_dir:Y,revision:ne}=Fe(G),re=Number(G.value);if(!Number.isFinite(re))return;let me=Math.max(Fn,Math.floor(re));W("worker-queue-set-slots",{slots:me},Y,ne)}function Te(m){let v=m.target;v?.classList.contains("mon-link__search")&&$e(v)}e.addEventListener("click",z),e.addEventListener("change",te),e.addEventListener("input",Te),e.addEventListener("dragstart",st),e.addEventListener("dragover",fe),e.addEventListener("dragleave",Pe),e.addEventListener("drop",Ee),e.addEventListener("dragend",ue),document.addEventListener("click",Je),document.addEventListener("keydown",rt),s&&typeof s.subscribe=="function"&&(J=s.subscribe(()=>{try{j.clear(),qe()}catch{}}));function Be(){Z!==null&&(clearInterval(Z),Z=null)}function pe(){Ie!==null&&(clearTimeout(Ie),Ie=null)}return{load(){r("load"),qe(),Z===null&&(Z=setInterval(()=>{try{if(E.querySelector(".mon-card-popover:not([hidden])"))return;qe()}catch{}},sm))},pause(){Be()},clear(){Be(),pe(),J&&(J(),J=null),e.removeEventListener("click",z),e.removeEventListener("change",te),e.removeEventListener("input",Te),e.removeEventListener("dragstart",st),e.removeEventListener("dragover",fe),e.removeEventListener("dragleave",Pe),e.removeEventListener("drop",Ee),e.removeEventListener("dragend",ue),document.removeEventListener("click",Je),document.removeEventListener("keydown",rt),e.replaceChildren()}}}function ed(e,t,r){let n=ft("views:nav"),s=null;function o(l){return d=>{d.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),d=l.view==="worker"||l.view==="monitor"?l.view:"board";return c`
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
    `}function i(){Ke(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Ke(c``,e)}}}var td=["bug","feature","task","epic","chore"];function rd(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var nd=["Critical","High","Medium","Low","Backlog"];function sd(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function R(){o.replaceChildren();let S=document.createElement("option");S.value="",S.textContent="\u2014 Select \u2014",o.appendChild(S);for(let N of td){let k=document.createElement("option");k.value=N,k.textContent=rd(N),o.appendChild(k)}a.replaceChildren();for(let N=0;N<=4;N+=1){let k=document.createElement("option");k.value=String(N);let U=nd[N]||"Medium";k.textContent=`${N} \u2013 ${U}`,a.appendChild(k)}}R();function E(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function P(S){s.disabled=S,o.disabled=S,a.disabled=S,i.disabled=S,l.disabled=S,p.disabled=S,f.disabled=S,f.textContent=S?"Creating\u2026":"Create"}function j(){d.textContent=""}function J(S){d.textContent=S}function Z(){try{let S=window.localStorage.getItem("beads-ui.new.type");S?o.value=S:o.value="";let N=window.localStorage.getItem("beads-ui.new.priority");N&&/^\d$/.test(N)?a.value=N:a.value="2"}catch{o.value="",a.value="2"}}function W(){let S=o.value||"",N=a.value||"";S.length>0&&window.localStorage.setItem("beads-ui.new.type",S),N.length>0&&window.localStorage.setItem("beads-ui.new.priority",N)}async function L(){j();let S=String(s.value||"").trim();if(S.length===0){J("Title is required"),s.focus();return}let N=Number(a.value||"2");if(!(N>=0&&N<=4)){J("Priority must be 0..4"),a.focus();return}let k=String(o.value||""),U=String(l.value||""),oe={title:S};k.length>0&&(oe.type=k),String(N).length>0&&(oe.priority=N),U.length>0&&(oe.description=U),P(!0);try{await t("create-issue",oe)}catch{P(!1),J("Failed to create issue");return}W(),P(!1),E()}return r.addEventListener("cancel",S=>{S.preventDefault(),E()}),b.addEventListener("click",()=>E()),p.addEventListener("click",()=>E()),r.addEventListener("keydown",S=>{S.key==="Enter"&&(S.ctrlKey||S.metaKey)&&(S.preventDefault(),L())}),n.addEventListener("submit",S=>{S.preventDefault(),L()}),{open(){n.reset(),j(),Z();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){E()}}}var im=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function lm(e,t){return ko(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function od(e,t,r){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=lm(n,e);return c`<button
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
  `}function ad(e,t,r){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(n=>c`<span class="settings-dialog__prefix">
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
  `}function id(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${im.map(([r,n])=>c`<label class="settings-dialog__toggle">
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
  `}var cm=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],qt="";function Ft(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ld(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(m=>ae(m,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="session",l=!1,d="",p={},f={},b=[],R=!1,E=null,P={},j="",J="",Z=!1,W=!1,L=!1,S=null;function N(){let m=t.queueStore?.get();return Ft(m)?m.runner_catalog:null}function k(){let m=t.queueStore?.get();return Ft(m)&&Ft(m.execution_defaults)?m.execution_defaults:null}function U(){let m=t.implPresetStore?.get();return Ft(m)&&Array.isArray(m.presets)?m:null}async function oe(){R=!0,$e();try{let m=await r("get-session-defaults",{});p=Ft(m?.values)?{...m.values}:{},f={...p},b=Array.isArray(m?.warnings)?m.warnings:[]}catch(m){b=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${m instanceof Error?m.message:String(m)}`)}finally{R=!1,$e()}}async function ce(){let m=Ql(p,f);if(Object.keys(m).length!==0){try{let v=await r("set-session-defaults",{values:m});p=Ft(v?.values)?{...v.values}:{},f={...p},b=Array.isArray(v?.warnings)?v.warnings:[]}catch(v){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${v instanceof Error?v.message:String(v)}`)}$e()}}function Q(m,v){v===qt?delete f[m]:f[m]=v,$e(),ce()}async function se(){let m=t.queueStore?.get();if(!Ft(m))return;let v={orchestration_model:m.orchestration_model??null,orchestration_effort:m.orchestration_effort??null,orchestration_speed:m.orchestration_speed??null},A=Jl(v,{...v,...P});if(Object.keys(A).length!==0){try{let M=await r("worker-queue-set-orchestration-defaults",{expected_revision:m.revision,values:A});if(M&&M.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}P={}}catch(M){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${M instanceof Error?M.message:String(M)}`)}$e()}}function Ie(m,v){P[m]=v===qt?null:v,$e(),se()}async function Ve(m){let v=t.queueStore?.get();if(!(!Ft(v)||m<1)){try{await r("worker-queue-set-slots",{expected_revision:v.revision,slots:m})}catch(A){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${A instanceof Error?A.message:String(A)}`)}$e()}}function Qe(){let m={};for(let v of Yl){let A=f[v];typeof A=="string"&&A.length>0&&(m[v]=A)}return m}async function at(){let m=U();if(!m)return;let v=Qe();if(Object.keys(v).length===0){o("\uC800\uC7A5\uD560 \uAD6C\uD604 \uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uAD6C\uD604 \uADF8\uB8F9\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let A=(m.presets||[]).find(G=>G.id===j),M=J.trim()||(A?A.name:"");if(!M){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let G=A?await r("impl-preset-update",{expected_revision:m.revision,id:A.id,name:M,settings:v}):await r("impl-preset-create",{expected_revision:m.revision,name:M,settings:v});if(G&&G.applied){if(J="",!A&&Array.isArray(G.presets)){let Y=G.presets.find(ne=>ne.name===M);j=Y?Y.id:j}$e()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),$e()}catch(G){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}}async function tt(){let m=U();if(!(!m||j.length===0))try{let v=await r("impl-preset-delete",{expected_revision:m.revision,id:j});v&&v.applied?(j="",$e()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),$e())}catch(v){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${v instanceof Error?v.message:String(v)}`)}}async function st(){let m=U();if(!(!m||j.length===0)){try{let v=await r("apply-impl-preset-global",{preset_id:j,expected_revision:m.revision});v&&v.applied?(p=Ft(v.values)?{...v.values}:{},f={...p},b=Array.isArray(v.warnings)?v.warnings:[]):v&&v.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(v){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${v instanceof Error?v.message:String(v)}`)}$e()}}async function fe(){W=!0,L=!1,$e();try{let m=await r("get-worker-system-prompt",{});!m||typeof m!="object"||Array.isArray(m)?L=!0:S=m}catch{L=!0}finally{W=!1,$e()}}function Pe(){if(Z=!Z,Z&&!S){fe();return}$e()}function ue(){let m=nn({loading:W,error:L});if(m)return m;if(!S)return"";let v=Array.isArray(S.variants)?S.variants:[];return c`<div class="settings-dialog__sp-body">
      ${S.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${S.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${v.map(A=>c`<div class="settings-dialog__sp-variant" data-variant=${A.key}>
            <div class="settings-dialog__sp-cond">${A.condition}</div>
            ${yr(A.label,A.system_prompt)}
          </div>`)}
    </div>`}function Ee(){return c`<section
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
        aria-expanded=${Z?"true":"false"}
        @click=${Pe}
      >
        ${Z?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${Z?ue():""}
    </section>`}function xe(m,v,A,M,G,Y){let ne=G[m]??qt,re=Qo(m,A,G,k(),N()),me=re.options.find(De=>De.value===ne),Se=ne===qt?re.full_value:me?.full_value;return c`<select
        class=${ne===qt?"settings-dialog__unset":""}
        data-key=${m}
        aria-label=${v}
        title=${Se||""}
        ?disabled=${Y===!0||re.disabled}
        .value=${Br(String(ne))}
        @change=${De=>M(m,String(De.target.value))}
      >
        <option value=${qt} ?selected=${ne===qt}>
          ${re.unset_label}
        </option>
        ${re.options.map(De=>c`<option
              value=${De.value}
              title=${De.full_value||""}
              ?selected=${De.value===ne}
            >
              ${De.label}
            </option>`)}
      </select>
      ${ne===qt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function qe(m,v,A,M,G,Y=!1){return c`<div
      class=${`settings-dialog__row${Y?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${v}</span>
      <span class="settings-dialog__controls">
        ${xe(m,v,A,M,G,Y)}
      </span>
    </div>`}function he(m,v,A,M,G){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${v}-on)`}
        ></i>
        ${m}
      </span>
      <span class="settings-dialog__controls">
        ${xe(A,`${m} \uBAA8\uB378`,M,Q,f,!1)}
        ${xe(G,`${m} effort`,qs,Q,f,!1)}
      </span>
    </div>`}function Fe(){let m=N(),v=Xl(f),A=f.impl_runtime,M=f.impl_model,G=U(),Y=k()?.supported===!0,ne=Qo("workflow_mode",Ln,f,k(),m);return c`
      <section
        class=${`settings-dialog__pane${i==="session"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-session"
        aria-label="세션 기본값"
      >
        <header class="settings-dialog__pane-head"><h2>세션 기본값</h2></header>
        <p class="settings-dialog__pane-sub">
          모든 세션(터미널 대화형 포함)이 따르는 전역 기본값입니다. 이슈에 핀이
          있으면 핀이 우선합니다.
        </p>
        ${b.length>0?c`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${b.join(", ")}
            </div>`:""}
        ${Y?"":c`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${R?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${qt}
                        aria-pressed=${String(!f.workflow_mode)}
                        @click=${()=>Q("workflow_mode",qt)}
                      >
                        ${ne.unset_label}
                      </button>
                      ${f.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${Ln.map(re=>c`<button
                            type="button"
                            data-mode=${re}
                            aria-pressed=${String(f.workflow_mode===re)}
                            @click=${()=>Q("workflow_mode",re)}
                          >
                            ${re}
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
                ${he("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",On,"spec_review_effort")}
                ${he("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ns,"plan_review_effort")}
                ${he("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",On,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${qe("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",Ps,Q,f)}
                ${qe("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ds,Q,f,v)}
                ${qe("impl_model","\uBAA8\uB378",Fs(m,A),Q,f,v)}
                ${qe("impl_effort","effort",sn(m,A,M),Q,f,v)}
                ${qe("impl_speed","\uC18D\uB3C4",In,Q,f,v)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${Br(j)}
                  @change=${re=>{j=String(re.target.value),$e()}}
                >
                  <option value="" ?selected=${j===""}>
                    구현 프리셋…
                  </option>
                  ${(G?.presets||[]).map(re=>c`<option
                        value=${re.id}
                        ?selected=${re.id===j}
                      >
                        ${re.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  ?disabled=${j.length===0}
                  @click=${st}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${j?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Br(J)}
                  @input=${re=>{J=String(re.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${at}
                >
                  ${j?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${j.length===0}
                  @click=${tt}
                >
                  삭제
                </button>
              </div>
            `}
      </section>
    `}function Le(){let m=t.queueStore?.get(),v=N(),A={orchestration_model:P.orchestration_model??(Ft(m)?m.orchestration_model:null),orchestration_effort:P.orchestration_effort??(Ft(m)?m.orchestration_effort:null),orchestration_speed:P.orchestration_speed??(Ft(m)?m.orchestration_speed:null)},M=js(v,E),G=sn(v,E||void 0,A.orchestration_model||lr).filter(ne=>ne!==lr),Y=Ft(m)&&typeof m.slots=="number"?m.slots:2;return c`
      <section
        class=${`settings-dialog__pane${i==="worker"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-worker"
        aria-label="Worker 설정"
      >
        <header class="settings-dialog__pane-head"><h2>Worker 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          Worker가 세션을 띄울 때 쓰는 오케스트레이션 설정과 동시 실행 수입니다.
        </p>
        ${k()?.supported!==!0?c`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`:""}
        <div class="settings-dialog__group">
          <div class="settings-dialog__group-title">오케스트레이션</div>
          <div class="settings-dialog__row">
            <span class="settings-dialog__row-label">런타임</span>
            <span class="settings-dialog__controls">
              <select
                aria-label="런타임"
                data-key="orchestration_runtime_filter"
                .value=${Br(E||qt)}
                @change=${ne=>{let re=String(ne.target.value);E=re===qt?null:re,$e()}}
              >
                <option value=${qt} ?selected=${!E}>
                  전체
                </option>
                <option
                  value="claude"
                  ?selected=${E==="claude"}
                >
                  claude
                </option>
                <option
                  value="codex"
                  ?selected=${E==="codex"}
                >
                  codex
                </option>
              </select>
              <span class="settings-dialog__hint">모델 목록을 좁힙니다</span>
            </span>
          </div>
          ${qe("orchestration_model","\uBAA8\uB378",M,Ie,A)}
          ${qe("orchestration_effort","effort",G,Ie,A)}
          ${qe("orchestration_speed","\uC18D\uB3C4",In,Ie,A)}
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
                  @click=${()=>Ve(Y-1)}
                >
                  −
                </button>
                <span class="settings-dialog__stepper-value">${Y}</span>
                <button
                  type="button"
                  aria-label="slots 증가"
                  @click=${()=>Ve(Y+1)}
                >
                  +
                </button>
              </span>
            </span>
          </div>
        </div>
        ${Ee()}
      </section>
    `}function _e(){let m=n.get();return c`
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
        ${m?c`
              ${od(m,s(),ge)}
              ${ad(m,d,{onDraft:v=>{d=v},onAdd:Ce,onRemove:je})}
              ${id(m,We)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function ye(m){let v=n.get();if(v)try{let A=await r("display-policy-set",{expected_revision:v.revision,policy:m(v)});H(A),A&&A.conflict&&A.policy&&(A=await r("display-policy-set",{expected_revision:A.policy.revision,policy:m(A.policy)}),H(A)),A&&A.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function H(m){m&&m.policy&&typeof m.policy=="object"&&n.set(m.policy)}function K(m){ye(m)}function ge(m){let v=n.get();if(!v)return;let A=!dm(m,v);K(M=>um(m,M,A))}function Ce(){let m=d.trim();m.length!==0&&(d="",K(v=>v.hidden_prefixes.includes(m)?{hidden_prefixes:v.hidden_prefixes}:{hidden_prefixes:[...v.hidden_prefixes,m]}),$e())}function je(m){K(v=>({hidden_prefixes:v.hidden_prefixes.filter(A=>A!==m)}))}function We(m){let v=n.get();if(!v)return;let A=v.chips[m]===!1;K(()=>({chips:{[m]:A}}))}function $e(){Ke(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${cm.map(m=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${m.id}
                  aria-selected=${String(i===m.id)}
                  aria-controls=${`settings-pane-${m.id}`}
                  @click=${()=>Je(m.id)}
                >
                  <span class="settings-dialog__glyph">${m.glyph}</span>
                  ${m.label}
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
            ${Fe()} ${Le()} ${_e()}
          </div>
        </div>
      `,a)}function Je(m){i=m,$e()}let rt=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",rt),a.addEventListener("cancel",rt);let z=m=>{m.target===a&&pe()};a.addEventListener("click",z);let te=null;n.subscribe&&(te=n.subscribe(()=>{l&&$e()}));let Te=null;t.implPresetStore?.subscribe&&(Te=t.implPresetStore.subscribe(()=>{l&&$e()}));function Be(m="session"){l||(l=!0,t.onOpenChange?.(!0),i=m,d="",P={},$e(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),oe())}function pe(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Be,close:pe,sessionDraft:()=>({...f}),destroy(){l=!1,a.removeEventListener("close",rt),a.removeEventListener("cancel",rt),a.removeEventListener("click",z),te&&(te(),te=null),Te&&(Te(),Te=null),a.remove()}}}function dm(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function um(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var pm=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function cd(e){return String(e).padStart(2,"0")}function fm(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function _m(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${cd(n.getHours())}:${cd(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${pm[n.getMonth()]} ${n.getDate()} ${o}`;return`${fm(r,t)} \xB7 ${i}`}function mm(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var dd=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function ud(e){let t=!1,r=null,n=new Map;function s(){Ke(c``,e),e.hidden=!0}function o(){let l=dd.filter(p=>n.has(p.key));if(l.length===0){s();return}let d=Date.now();Ke(c`<div class="usage-meter" aria-label="Usage">
        ${l.map(p=>{let f=n.get(p.key),b=typeof f.ageSeconds=="number"&&f.ageSeconds>600,R=b?`${Math.floor(f.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${b?" usage-meter__group--stale":""}"
            aria-label=${`${p.label} usage`}
          >
            <span class="usage-meter__provider">${p.label}</span>
            ${f.windows.map(E=>{let P=typeof E.pct=="number"&&Number.isFinite(E.pct)?E.pct:0,j=Math.min(100,Math.max(0,P)),Z=`resets ${_m(E.resetsAt,d)}${b?` \xB7 ${R}`:""}`;return c`<span
                class="usage-meter__window ${mm(j)}"
                style=${`--progress: ${j}%`}
                title=${Z}
              >
                <span class="usage-meter__label">${E.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${j}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let d=await fetch(l.endpoint);if(!d.ok)return null;let p=await d.json();return!p||p.available!==!0||!Array.isArray(p.windows)?null:p}catch{return null}}async function i(){let l=await Promise.all(dd.map(async d=>({provider:d,payload:await a(d)})));if(!t){for(let d of l)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}function pd(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var gm="worker-ineligible";function va(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function wa(e){return va(e).includes(gm)}var bm="worker-serial";function ka(e){return va(e).includes(bm)}function $a(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var hm=new Set(["done","failed","orphaned","stopped","discarded"]),ym={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},vm={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},wm={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function xa(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:wm[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function fd(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,d=new Map,p=!1,f=null,b=null,R=null,E=new Set,P=!1,j=0,J=null,Z=new Set;function W(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function L(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function S(){return o&&o()||""}async function N(){if(!s)return;let w=++j;P=!0,R=null,E.clear(),me();try{let T=await s("worker-parallel-analysis-targets",{root_dir:S()});if(w!==j||!Se)return;let D=Array.isArray(T?.qualified)?T.qualified:[],q=Array.isArray(T?.excluded)?T.excluded:[];R={qualified:D,excluded:q};for(let be of D)be&&typeof be.id=="string"&&E.add(be.id)}catch{w===j&&Se&&(R={qualified:[],excluded:[]},ae("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{w===j&&(P=!1,Se&&me())}}function k(w){return Array.isArray(w.runs)?w.runs:[]}function U(){let w=W(),T=new Set;for(let D of Object.values(w.attempts||{})){let q=D;q&&typeof q.bead_id=="string"&&!hm.has(q.status)&&T.add(q.bead_id)}for(let D of Array.isArray(w.pr_wait)?w.pr_wait:[])D&&typeof D.bead_id=="string"&&T.add(D.bead_id);for(let D of Object.values(w.discard_operations||{})){let q=D;q&&q.phase!=="done"&&typeof q.bead_id=="string"&&T.add(q.bead_id)}return T}function oe(w){return w.filter(T=>ce(T)===null)}function ce(w){let T=W();for(let D of Array.isArray(T.serial_lanes)?T.serial_lanes:[])if(Array.isArray(D?.entries)&&D.entries.some(q=>q.bead_id===w))return D.id;return(Array.isArray(T.queue)?T.queue:[]).some(D=>D.bead_id===w)?"parallel":null}function Q(w,T){let D=l.get(w);return D||[...T.order]}function se(w){if(w.length<2)return!1;let T=ce(w[0]);if(!T||T==="parallel")return!1;let D=W(),q=(Array.isArray(D.serial_lanes)?D.serial_lanes:[]).find(ve=>ve.id===T)?.entries.map(ve=>ve.bead_id);if(!Array.isArray(q))return!1;let be=w.map(ve=>q.indexOf(ve));return be.every(ve=>ve>=0)&&be.every((ve,le)=>le===0||ve>be[le-1])}function Ie(){let w=W(),T=Array.isArray(w.serial_lanes)?w.serial_lanes:[],D=T.find(q=>Array.isArray(q.entries)&&q.entries.length===0);return D?D.id:T[0]?.id||"s1"}function Ve(w){let T=W().bead_titles||{};return typeof T[w]=="string"?T[w]:w}async function Qe(w,T){if(!s||p)return null;p=!0,me();try{return await s(w,T)}finally{p=!1,me()}}async function at(w){n?.setPending?.(!0);try{let T=await Qe("worker-parallel-analysis-start",{force:w,target_ids:Array.from(E)});T&&T.applied===!1&&T.reason&&(T.reason==="target_not_qualified"&&Array.isArray(T.detail)?ae(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${T.detail.join(", ")}`,"error",3200):ae(`\uBD84\uC11D \uC2E4\uD328: ${T.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function tt(){let w=L().job;!s||!w||await s("worker-parallel-analysis-cancel",{job_id:w.job_id})}async function st(w){if(!(!s||Z.has(w))){Z.add(w),me();try{let T=await s("worker-parallel-analysis-prompt",{root_dir:S(),run_id:w});if(!Se)return;if(T?.ok===!0&&typeof T.prompt=="string"){J={run_id:w,prompt:T.prompt};return}ae(T?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{Z.delete(w),me()}}}function fe(){J=null,me()}async function Pe(){if(!J)return;let w=await Zt(J.prompt);ae(w?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",w?"success":"error",1400)}function ue(w,T){a&&a(w,xa(T))}function Ee(){return W().runner_catalog}function xe(w){return Object.keys(Ee()?.runners?.[w]?.models||{})}function qe(w){let T=xe(w),D=Ee()?.runners?.[w]?.default_model;return typeof D=="string"&&T.includes(D)?D:T[0]||""}function he(){let w=L().settings,T=f||w.runner||"claude",D=xe(T),q=f?qe(T):w.model||D[0]||"",be=$a(Ee(),T,q),ve=w.effort||"",le=be.includes(ve)?ve:be[0]||"";return{runner:T,model:q,effort:le,models:D,efforts:be}}async function Fe(w){let T=L().settings,D=await Qe("worker-parallel-analysis-settings-update",{expected_revision:T.revision,runner:w.runner,model:w.model,effort:w.effort});(!D||D.applied!==!0)&&(f=null,me(),D&&D.reason&&ae(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${D.reason}`,"error",2800))}function Le(w){f=w,me();let T=he();Fe({runner:w,model:T.model,effort:T.effort})}function _e(w){let T=he(),D=$a(Ee(),T.runner,w);Fe({runner:T.runner,model:w,effort:D.includes(T.effort)?T.effort:D[0]||""})}function ye(w){let T=he();Fe({runner:T.runner,model:T.model,effort:w})}async function H(w,T){if(!s||p)return;let D=Q(w,T),q=L();if(D.length<2||!q.last_good){ae("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let be=d.get(w)||Ie(),ve=()=>({snapshot_digest:q.last_good.identity_digest,group_index:w,lane:be,ordered_bead_ids:D,expected_revision:W().revision});p=!0,me();try{let le=await s("worker-parallel-analysis-submit",ve());le&&le.queue&&r&&r.set(le.queue),le&&le.applied!==!0&&le.conflict===!0&&(le=await s("worker-parallel-analysis-submit",ve()),le&&le.queue&&r&&r.set(le.queue)),le&&le.applied===!0?(l.delete(w),ae(`\uC9C1\uB82C \uB808\uC778 ${be}\uC5D0 ${D.length}\uAC1C \uBC30\uCE58`,"success")):ae(`\uC81C\uCD9C \uAC70\uBD80: ${le?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,me()}}function K(w,T,D){l.set(w,Q(w,T).filter(q=>q!==D)),me()}function ge(w){l.delete(w),me()}function Ce(w,T,D,q){let be=[...Q(w,T)],ve=be.indexOf(D),le=ve+q;ve<0||le<0||le>=be.length||(be.splice(le,0,...be.splice(ve,1)),l.set(w,be),me())}function je(){let w=L().settings,T=Object.keys(Ee()?.runners||{}),D=he();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${q=>Le(q.target.value)}
        >
          ${T.map(q=>c`<option
                value=${q}
                ?selected=${D.runner===q}
              >
                ${q}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${q=>_e(q.target.value)}
        >
          ${D.models.map(q=>c`<option
                value=${q}
                ?selected=${D.model===q}
              >
                ${q}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${q=>ye(q.target.value)}
        >
          ${D.efforts.map(q=>c`<option
                value=${q}
                ?selected=${D.effort===q}
              >
                ${q}
              </option>`)}
        </select>
      </label>
      ${We(w)}
    </div>`}function We(w){return!Je(w)||$e(w)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:w.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${w.runner}/${w.model} · effort
        ${w.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:w.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function $e(w){return w.is_default===!0&&w.compatible===!1}function Je(w){return!!(w.runner&&w.model&&w.effort)}function rt(w){return Je(w)&&w.compatible!==!1}function z(w){let T=Math.max(0,Math.floor(w/1e3)),D=Math.floor(T/60),q=T%60;return`${D}:${String(q).padStart(2,"0")}`}function te(w){let T=w.job;if(T){let D=typeof T.started_at=="number"?T.started_at:0,q=`${T.runner||"?"}/${T.model||"?"}`,be=D?` \xB7 \uACBD\uACFC ${z(Date.now()-D)}`:"",ve=typeof T.session_id=="string"?T.session_id:"",le=k(w).find(nt=>nt.run_id===T.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${q} · effort ${T.effort||"?"}${be}</span
        >
        ${ve?c`<code class="pa-session-id" title=${ve}
              >${ve.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>ue(T.job_id,le||T)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${le?.prompt_saved!==!0||Z.has(T.job_id)}
          @click=${()=>{st(T.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Te()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Te(){return n?.isPending?.()===!0}function Be(w){let T=!!w.job,D=rt(w.settings),q=R!==null&&E.size===0,be=T||p||Te()||P;return c`<div class="pa-meta">
      ${w.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(w.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${te(w)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!D||be||q}
        @click=${()=>{at(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!D||be||q}
        @click=${()=>{at(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!T}
        @click=${()=>{tt()}}
      >
        취소
      </button>
    </div>`}function pe(w){return typeof w=="string"&&w.length>0?w:"\uBBF8\uBC30\uCE58"}function m(w,T){T?E.add(w):E.delete(w),me()}function v(){let w=R?.qualified||[],T=R?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${P?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${w.length} \xB7 \uC81C\uC678 ${T.length}`}</span
        >
      </header>
      ${R&&w.length>0?c`<ul class="pa-targets__list">
            ${w.map(D=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${D.id}
                      .checked=${E.has(D.id)}
                      @change=${q=>m(D.id,q.target.checked)}
                    />
                    <span class="pa-target__title">${D.title}</span>
                  </label>
                  <span class="pa-target__route">${D.route}</span>
                  <span class="pa-target__lane">${pe(D.lane)}</span>
                </li>`)}
          </ul>`:R&&w.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${R&&T.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${T.length}</summary>
            <ul class="pa-targets__list">
              ${T.map(D=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${D.title}</span>
                    </label>
                    <span class="pa-target__reason"
                      >${ym[D.reason]||D.reason}</span
                    >
                    <span class="pa-target__lane"
                      >${pe(D.lane)}</span
                    >
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function A(w){let T=typeof w.session_id=="string"&&w.session_id.length>0,D=T?w.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${w.outcome}"
        >${vm[w.outcome]||w.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(w.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${w.runner||"?"} / ${w.model||"?"} / ${w.effort||"?"}</span
      >
      ${T?c`<code class="pa-session-id" title=${D}
            >${D.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${w.outcome==="failure"&&w.reason?c`<span class="pa-run-row__reason">${w.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>ue(w.run_id,w)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${w.prompt_saved!==!0||Z.has(w.run_id)}
          @click=${()=>{st(w.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function M(w){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${w.length>0?c`<ul class="pa-runs__list">
            ${w.map(T=>A(T))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function G(){return J?c`<div
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
            <button type="button" @click=${()=>{Pe()}}>
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
    </div>`:""}function Y(w,T){let D=Q(w,T),q=U(),be=D.filter(Ge=>q.has(Ge)),ve=oe(D),le=se(D),nt=Array.isArray(W().serial_lanes)?W().serial_lanes:[],Ae=d.get(w)||Ie(),gt=T.eligible!==!0||D.length<2||be.length>0||ve.length>0||le||p;return c`<section class="pa-group" data-group-index=${String(w)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${T.confidence}</span>
        ${T.categories.map(Ge=>c`<span class="pa-group__category">${Ge}</span>`)}
        ${le?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${T.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${ve.length>0?c`<span class="pa-group__stale"
              >stale — ${ve.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${T.reason}</p>
      <ol class="pa-group__members">
        ${D.map((Ge,xt)=>c`<li class="pa-member" data-bead-id=${Ge}>
              <span class="pa-member__seq">${xt+1}</span>
              <span class="pa-member__title">${Ve(Ge)}</span>
              ${q.has(Ge)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ge}
                ?disabled=${xt===0}
                aria-label=${`${Ge} \uC704\uB85C`}
                @click=${()=>Ce(w,T,Ge,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ge}
                ?disabled=${xt===D.length-1}
                aria-label=${`${Ge} \uC544\uB798\uB85C`}
                @click=${()=>Ce(w,T,Ge,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ge}
                aria-label=${`${Ge} \uC81C\uC678`}
                @click=${()=>K(w,T,Ge)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${T.evidence.map(Ge=>c`<li class="pa-evidence">
              <code>${Ge.path}</code>
              <span class="pa-evidence__locator">${Ge.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>ge(w)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ge=>{d.set(w,Ge.target.value),me()}}
          >
            ${nt.map((Ge,xt)=>c`<option
                  value=${Ge.id}
                  ?selected=${Ae===Ge.id}
                >
                  직렬 ${xt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${gt}
          @click=${()=>{H(w,T)}}
        >
          제출
        </button>
      </footer>
    </section>`}function ne(w){let T=Array.isArray(w.issues)?w.issues:[],D=T.filter(be=>be.verdict==="parallel_ok").length,q=T.filter(be=>be.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${D}</span>
      <span>uncertain ${q}</span>
    </div>`}function re(){let w=Se&&!!L().job;if(w&&b===null){b=setInterval(()=>me(),1e3);return}!w&&b!==null&&(clearInterval(b),b=null)}function me(){let w=L();f&&w.settings.runner===f&&(f=null);let T=w.last_good?.result;re(),Ke(c`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${X}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${je()} ${Be(w)} ${v()}
            ${T?c`${T.groups.map((D,q)=>Y(q,D))}
                ${T.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${ne(T)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${M(k(w))}
          </div>
        </div>
        ${G()}
      `,i)}let Se=!1,De=()=>{Se=!1,J=null,j+=1,re()},Ne=w=>{w.target===w.currentTarget&&X()};i.addEventListener("close",De),i.addEventListener("cancel",De),i.addEventListener("click",Ne);let ze=null;r&&r.subscribe&&(ze=r.subscribe(()=>{Se&&me()}));let et=null;n&&n.subscribe&&(et=n.subscribe(()=>{Se&&me()}));function B(){Se||(Se=!0,me(),N(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function X(){Se&&(Se=!1,J=null,j+=1,re(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:B,close:X,destroy(){Se=!1,b!==null&&(clearInterval(b),b=null),i.removeEventListener("close",De),i.removeEventListener("cancel",De),i.removeEventListener("click",Ne),ze&&(ze(),ze=null),et&&(et(),et=null),i.remove()}}}var _d=new Set(["sh","bash","zsh","dash","ksh"]),md=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function gd(e){let t=e.split("/");return t[t.length-1]||""}function km(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=gd(r[0]);if(n!=="env")return _d.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&_d.has(gd(s))}function $m(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function xm(e){let t=[],r=0;md.lastIndex=0;for(let n of e.matchAll(md)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:$m(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Am(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function bd(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",i="",l=0,d=null,p=!1;function f(S,N){return N?xm(S).map(k=>k.kind==="plain"?k.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${k.kind}"
            >${k.text}</span
          >`):S}function b(){if(!s)return c``;let S=o==="ready"&&km(a),N=o==="ready"?a.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>W()}
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
              @click=${()=>{E()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>W()}
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
                  ${N.map((k,U)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${U+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(k,S)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function R(){Ke(b(),n)}async function E(){if(o!=="ready")return;let S=await Zt(a);ae(S?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",S?"success":"error")}function P(S){S.key==="Escape"&&s&&(S.preventDefault(),W())}function j(){p||(document.addEventListener("keydown",P),p=!0)}function J(){p&&(document.removeEventListener("keydown",P),p=!1)}async function Z(S,N=null){let k=++l;j(),s={...S},d=N||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",R(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let oe=t?t():"";if(!oe){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",R();return}if(!r){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",R();return}let ce="/api/repo-ops-script?workspace="+encodeURIComponent(oe)+"&lane="+encodeURIComponent(S.lane)+"&base_sha="+encodeURIComponent(S.base_sha);try{let Q=await r(ce),se=await Q.json().catch(()=>({}));if(k!==l)return;if((t?t():"")!==oe){W();return}if(!Q.ok||!se||se.ok!==!0){o="error",i=Am(se&&typeof se.error=="string"?se.error:""),R();return}s={lane:se.lane,base_sha:se.base_sha,path:se.path,base_ref:se.base_ref},a=String(se.content),o="ready",R()}catch{if(k!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",R()}}function W(){l+=1,J(),s=null,a="",R();let S=d;d=null,S?.isConnected&&S.focus()}function L(){W(),n.remove()}return{open:Z,close:W,destroy:L}}function hd(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let L=o();return typeof L.revision=="number"?L.revision:0}function i(L){t&&L&&L.queue&&typeof L.queue=="object"&&t.set(L.queue)}function l(){let L=o().workspace_info;return L&&typeof L=="object"?L:{}}function d(L,S){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${L}"
      >${S}</span
    >`}function p(L){if(typeof L!="number"||!Number.isFinite(L))return"";let S=L/6e4;return Number.isInteger(S)?`timeout ${S}\uBD84`:`timeout ${Math.round(L/1e3)}\uCD08`}function f(L){let S=p(L);return S?d("config",S):""}function b(L,S,N){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${N.script}
      @click=${k=>{s&&s({lane:L,base_sha:S.base_sha,path:N.script,base_ref:S.base_ref},k.currentTarget)}}
    ></button>`}function R(L){let S=typeof L.base_sha=="string"?L.base_sha:"",N=`${L.source_path||"repo-ops/config.toml"} @ ${L.base_ref||"?"}${S?`@${S.slice(0,7)}`:""}`;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${N}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${L.verify?c`${b("verify",L,L.verify)}
              ${f(L.verify.timeout_ms)}`:c`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${L.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${L.deploy?c`${b("deploy",L,L.deploy)}
              ${f(L.deploy.timeout_ms)}`:c`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${L.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function E(L){let S=L.repo_ops&&typeof L.repo_ops=="object"?L.repo_ops:null;return S&&(S.status==="resolved"||S.status==="absent")?R(S):S&&(S.status==="pending"||S.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${S.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${S.error_code?c` — <code>${S.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function P(L){if(!r)return;let S=await r("worker-auto-repair-toggle",{on:L,expected_revision:a()});if(i(S),S&&S.conflict){let N=await r("worker-auto-repair-toggle",{on:L,expected_revision:a()});i(N)}n()}let j={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function J(L,S,N){return c`<div class="worker-repo-ops__policy-group" data-policy=${N}>
      <div class="worker-repo-ops__policy-label">${L}</div>
      <ul class="worker-repo-ops__policy-list">
        ${S.map(k=>c`<li data-token=${k}>
              ${j[k]||k}
            </li>`)}
      </ul>
    </div>`}function Z(L){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${L.map(S=>{let N=[j[S.trigger]||S.trigger];return Number.isInteger(S.attempts_per_operation_attempt)?N.push(`operation\uB2F9 ${S.attempts_per_operation_attempt}\uD68C`):Number.isInteger(S.attempts)?N.push(`${j[S.budget]||S.budget} ${S.attempts}\uD68C`):Number.isInteger(S.sessions_per_user_action)&&N.push(`${S.sessions_per_user_action}\uD68C`,j[S.user_actions]||S.user_actions),S.applies_when&&N.push(j[S.applies_when]||S.applies_when),c`<li data-token=${S.id}>
            <strong>${j[S.id]||S.id}</strong>
            <span>${N.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function W(){let L=o(),S=L.auto_repair!==!1,N=L.repo_operation_policy&&typeof L.repo_operation_policy=="object"?L.repo_operation_policy:null,k=Array.isArray(L.repo_operations)?L.repo_operations:[],U=k.find(se=>se.state==="repairing"),oe=k.filter(se=>se.state==="failed"||se.state==="repairing"),ce=oe.length?Math.min(...oe.map(se=>typeof se.repair?.remaining=="number"?se.repair.remaining:0)):N?.auto_repair?.resolution_ladder?.find(se=>se.id==="auto_repair_session")?.attempts??1,Q=Array.isArray(N?.auto_repair?.resolution_ladder)?N.auto_repair.resolution_ladder:[];return c`<section
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
          .checked=${S}
          @change=${se=>{P(se.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${S?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${ce}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${U?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${U.repair?.owner_bead||U.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${N?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(N.worker_automatic||[]).length} · 해결 사다리
                ${Q.length} · 금지
                ${(N.never_automatic||[]).length}</span
              >
            </summary>
            ${J("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",N.worker_automatic||[],"worker-automatic")}
            ${N.supported===!1||N.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${N.schema_version})`}
                </div>`:Z(Q)}
            ${J("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",N.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${E(l())} ${W()}
      </details>`}}}var Sm=20,yd={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},vd={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Em(e,t,r=Sm){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function wd(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Tm(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function kd(e){let t=e.filter(r=>r.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>c`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function $d(e,t="",r=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Cm(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(vd,n)?vd[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${r}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
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
  </div>`}function Rm(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?vt(e.at):""}
      >${Hs(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${wd(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(yd,t.kind)?yd[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Ws(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${zs(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${wd(e)}"
          >${Tm(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?$d(Ic(t.failure_kind,n)):""}
      ${Cm(t)}
      ${kd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Ws(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Im(e){let t=e.cleanup,r=Ur(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?vt(e.at):""}
      >${Hs(e.at)||"\u2014"}</span
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
        ${Sc(t.step).map(n=>c`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${$d(Zs(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
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
      ${kd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Lm(e){return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?Im(t):Rm(t))}
        </ul>`}
  </section>`}function xd(e,t={}){let r=null;function n(){Ke(r?Lm(r):c``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:Em(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var Om="tab:worker:ready",Mm="tab:worker:blocked",Pm="tab:worker:in-progress",Dm="tab:worker:closed",Js=1,Ad=5;function Sd(e){return Rn(e).path.length>0}var Cd="beads-ui.worker.candidate-filter",Aa={show_blocked:!1,spec:"all"};function Nm(){try{let e=window.localStorage.getItem(Cd);if(!e)return{...Aa};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Aa};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Aa}}}function qm(e){try{window.localStorage.setItem(Cd,JSON.stringify(e))}catch{}}function Fm(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=r(i),d=n(i);l&&d?s.push(i):!l&&d?o+=1:l&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var jm=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Rd="bdui.worker.candidate_sort",Bm=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],eo="spec";function Um(){try{let e=window.localStorage.getItem(Rd);return e==="board"||e==="created"||e==="spec"?e:eo}catch{return eo}}function Wm(e){try{window.localStorage.setItem(Rd,e)}catch{}}var Id="bdui.worker.done-range";function zm(){try{let e=window.localStorage.getItem(Id);return Wt(e)?e:Dt}catch{return Dt}}function Hm(e){try{window.localStorage.setItem(Id,e)}catch{}}var Gm="(max-width: 640px)",Ld="beads-ui.worker.lane-collapsed",Un={queue:!0,done:!0};function Vm(){try{let e=window.localStorage.getItem(Ld);if(!e)return{...Un};let t=JSON.parse(e);return!t||typeof t!="object"?{...Un}:{queue:typeof t.queue=="boolean"?t.queue:Un.queue,done:typeof t.done=="boolean"?t.done:Un.done}}catch{return{...Un}}}function Km(e){try{window.localStorage.setItem(Ld,JSON.stringify(e))}catch{}}function Ed(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Ym(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Nr):(n.sort(os(r)),t==="board"?n:[...n.filter(Sd),...n.filter(s=>!Sd(s))])}function Zm(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Xm(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Qm(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Td(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Jm(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function eg(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);return t.length===0?null:t==="needs_human"?"\uC644\uB8CC \uC758\uB3C4 \uB300\uAE30 \u2014 \uC0AC\uB78C \uD655\uC778 \uD544\uC694":`\uC644\uB8CC \uC758\uB3C4 \uB300\uAE30 \u2014 ${t}`}function tg(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function rg(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Sa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function ng(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[o,`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function sg(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r("\uC790\uB3D9\uBCF5\uAD6C \uC911",{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Td(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Td(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function og(e,t,r,n,s=null,o=null,a=null,i=!1,l=null,d=!0,p=null,f=null,b=null,R={},E=!1,P=!1,j={}){let J=!!l&&l.position>0,Z=!!l?.continuation_action&&l.continuation_action.continuation===null,W=!!l&&l.active===!0,L=l&&l.failure||null,S=eg(l?l.waiting:null),N=r[e]||null,k=N&&N.gate?N.gate:null,U=N&&N.pr?N.pr:null,oe=ng(b),ce=tg(l?l.resolution:null),Q=rg(l?l.head_review:null),se=l&&l.head_review||null,Ie=l&&l.authority||null,Ve=!!se&&["pending","reviewing","revising"].includes(se.state),Qe=J&&!W&&(se?.state==="failed"||!Ie||Ie.source==="automatic"&&!P),at=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ce?ce.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":S,tt=!!k&&k.base_badge==="\uCDA9\uB3CC",st=!!k&&k.enabled===!0,fe=qn({bead_id:e,merge_sha:j.merge_sha,cleanup_cursor:j.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:j.repo_operations}),Pe=Ys(fe),ue=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!k&&k.tier==="merged",Ee=i&&!!n&&!!k&&k.tier==="merged",xe=Qe&&(st||tt||k?.reason==="base_behind"||k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"||ue||Ee),qe=i&&tt&&d===!1,he=cr(R,e,{external:i,merge_active:W||fe?.step==="merge",merge_queued:J,conflict_active:!!a,cleanup_active:Pe,merged:!!n||k?.tier==="merged"}),Fe=!!he.operation,Le=!ue&&!!n&&n.step==="repo_operations",_e=sg({continuation_required:Z,merge_step:fe,conflict_badge:at,conflict_live:ce?.live===!0||a==="running",head_review:se&&Q?{...Q,state:se.state,failure_reason:se.failure_reason}:null,recovery:oe,cleanup_failed:n,cleanup_label:n?Ur(n.step):null,base_exception:f,conflicting:tt,gate:k,queue_failure:L,auto_skip:p,queued:J,queue_active:W,queue_position:l?l.position:0,activity:at?null:o&&o.activity||null}),ye=_e?.live===!0&&_e.title?c`<span title=${_e.title}>${_e.label}</span>`:_e?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:n&&fe?.active!==!0?Ks(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:E,external:i,pr_number:U&&typeof U.number=="number"?U.number:null,pr_url:U&&typeof U.url=="string"?U.url:"",completion_badge:_e?.live!==!0&&_e?.title?_e.label:null,completion_title:_e?.title||"",completion_repair_pr_url:oe?oe.repair_pr_url:"",completion_repair_pr_number:oe?oe.repair_pr_number:null,badges:ye?[ye]:[],live_badge:_e?.live===!0?ye:null,usage:s,alert:_e?.alert===!0,merge_action:k?.tier==="merged"&&!ue&&!Ee||Le?!1:!J||Z||Qe,timeline_action:Le,cancel_action:J&&!Z,cancel_enabled:(!W||Ve)&&!(oe&&oe.lock_actions),cancel_title:oe&&oe.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":W&&!Ve?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Ve?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:he,discard_action:he.action,merge_step:fe,discard_enabled:he.enabled,discard_title:he.title,merge_enabled:!fe&&!a&&!Fe&&!f&&!(oe&&oe.lock_actions)&&!qe&&!Le&&(st||tt||k?.reason==="base_behind"||k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"||ue||Ee||xe),merge_label:Z?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ue||Ee?"\uC815\uB9AC \uC7AC\uAC1C":tt&&!fe&&!ue?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":k?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Qe?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Fe?he.error?`\uD3D0\uAE30 \uC2E4\uD328: ${he.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${he.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Z?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":fe?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${fe.label}`:Ee?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":qe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ue?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":tt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":st?`\uBA38\uC9C0 (${k.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:k&&k.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${k&&k.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ea(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:d,doneRange:p,onDoneRangeChange:f}=t,b=n?is(n,i):null,R=cs({transport:r,uiOrderStore:i}),E=null,P=[],j=Nm(),J=Um(),Z=Wt(p)?p:zm(),W=new Map;function L(){let _=or.find($=>$.value===Z);return _?_.label:"\uC624\uB298"}let S=Vm(),N=!1,k=new Set,U=new Set,oe=new Set,ce=new Set,Q=[],se=document.createElement("div");se.className="worker-console";let Ie=document.createElement("div");Ie.className="worker-top";let Ve=document.createElement("div");Ve.className="worker-drawer-overlay",Ve.hidden=!0;let Qe=document.createElement("div");Qe.className="worker-drawer-overlay__backdrop";let at=document.createElement("div");at.className="worker-drawer-host";let tt=document.createElement("div");tt.className="worker-drawer-host",tt.hidden=!0,Ve.append(Qe,at,tt);let st=document.createElement("div");st.className="worker-lanes-host",se.append(Ie,Ve,st),e.appendChild(se);let fe=null,Pe=null,ue=Ls(at,{transport:r,sessionLogStore:a,onClose:()=>{fe=null,Pe=null,Ve.hidden=!0,q()}}),Ee=xd(tt,{onClose:()=>{tt.hidden=!0,Ve.hidden=!0,q()}}),xe=bd({getWorkspacePath:d||(()=>"")}),qe=d&&d()||"",he=hd({queueStore:s,transport:r,onChanged:()=>q(),onOpenScript:(_,$)=>{xe.open(_,$)}}),Fe=o?fd(se,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:d,onOpenTranscript:(_,$)=>pr(_,$)}):null;function Le(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Js,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function _e(){let _=Le();return typeof _.revision=="number"?_.revision:0}function ye(_){_&&_.queue&&s&&s.set(_.queue)}function H(){let _=Le().queue;return Array.isArray(_)?_.length:0}async function K(_,$,I){if(!r)return;let g=()=>({bead_id:_,...$==="parallel"?{}:{lane:$},index:I,expected_revision:_e()}),O=await r("worker-queue-place",g());ye(O),O&&O.conflict&&await r("worker-queue-place",g()).then(ye)}async function ge(_,$,I){if(!r)return;let g=()=>({bead_id:_,...$==="parallel"?{}:{lane:$},to_index:I,expected_revision:_e()}),O=await r("worker-queue-reorder",g());ye(O),O&&O.conflict&&await r("worker-queue-reorder",g()).then(ye)}async function Ce(_){if(!r)return;let $=await r("worker-queue-remove",{bead_id:_,expected_revision:_e()});ye($),$&&$.conflict&&await r("worker-queue-remove",{bead_id:_,expected_revision:_e()}).then(ye)}async function je(_){if(!r||!_)return;let $=await r("worker-attempt-pause",{attempt_id:_});$&&$.paused===!1&&$.reason&&ae(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${$.reason}`,"error",2400)}async function We(_){if(!r||!_)return;let $=await Jr();if($===null)return;let I=async(O={})=>await r("worker-attempt-resume",{attempt_id:_,expected_revision:_e(),...$!==""?{instructions:$}:{},...O}),g=await I();ye(g),g&&g.conflict&&(g=await I(),ye(g)),g=await _r(g,(O,ee)=>I({continuation:O,decision_token:ee}),{onResult:ye,refresh:()=>I()}),g&&g.resumed===!1&&!g.conflict&&g.reason&&ae(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${g.reason}`,"error",2400)}async function $e(_){if(!r||!_)return;let $=await r("worker-attempt-dismiss",{attempt_id:_,expected_revision:_e()});ye($),$&&$.conflict&&($=await r("worker-attempt-dismiss",{attempt_id:_,expected_revision:_e()}),ye($)),$&&$.dismissed===!1&&!$.conflict&&$.reason&&ae(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${$.reason}`,"error",2400)}async function Je(_,$,I=!0){if(!r)return null;let g=r,O=await g(_,{...$,expected_revision:_e()});return ye(O),O&&O.conflict&&I&&(O=await g(_,{...$,expected_revision:_e()}),ye(O)),O}async function rt(_){if(!r||!_)return;let $=Le().merge_queue?.find(g=>g.bead_id===_)?.continuation_action;if($?.mismatch&&$.continuation===null){await te(_,$.mismatch);return}k.add(_),q();let I;try{I=await Je("worker-merge-queue-add",{bead_id:_})}finally{k.delete(_),q()}!I||I.conflict||I.applied||ae(Jm(I.reason),"error",2400)}async function z(_){if(!(!r||!_||U.has(_))){U.add(_),q();try{let $=await r("worker-cleanup-retry",{bead_id:_,expected_revision:_e()});ye($),$&&!$.retried&&!$.conflict&&$.reason&&ae(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${$.reason}`,"error",2400)}finally{U.delete(_),q()}}}async function te(_,$){let I=await _r({continuation_mismatch:$},(O,ee)=>Je("worker-merge-queue-add",{bead_id:_,continuation:O,decision_token:ee},!1)),g=I?.queue?.merge_queue?.find(O=>O.bead_id===_)?.continuation_action;if(I?.applied!==!0&&g?.continuation===null&&g.mismatch){await te(_,g.mismatch);return}I&&I.applied===!1&&!I.conflict&&ae("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Te(_){if(!r)return;let $=await Je("worker-merge-auto-toggle",{on:_});!$||$.conflict||ae(_?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",_?"success":"info",2400)}async function Be(_){if(!r||!_)return;let $=await Je("worker-merge-queue-remove",{bead_id:_});$&&!$.conflict&&!$.applied&&$.reason==="merge_active"&&ae("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function pe(){await Je("worker-merge-queue-remove",{all:!0})}async function m(_,$=null,I="unmerged",g=null){if(!r||!_)return;let O=Pn(_,I);if(!(!!g||typeof globalThis.confirm!="function"||globalThis.confirm(O)))return;let de=await r("worker-discard",{bead_id:_,...$?{attempt_id:$}:{},...g?{operation_id:g}:{},expected_revision:_e()});if(ye(de),de&&de.conflict&&(de=await r("worker-discard",{bead_id:_,...$?{attempt_id:$}:{},...g?{operation_id:g}:{},expected_revision:_e()}),ye(de)),de&&de.discarded===!0){ae(Gs(de),"success",5e3);return}if(de&&de.reason){ae(`\uD3D0\uAE30 \uC2E4\uD328: ${de.reason}`,"error",2800);return}if(de&&de.accepted&&de.pending==="merged_revert"){ae("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(de&&de.accepted&&!de.discarded){ae(`\uD3D0\uAE30 \uC9C4\uD589: ${de.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}de&&!de.conflict&&ae("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function v(_,$,I){if(!(!r||!$||!I||ce.has($))){ce.add($),q();try{let g=await r(_,{bead_id:$,action_id:I,expected_revision:_e()});ye(g),g?.conflict?ae("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!g?.ok&&g?.reason&&ae(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(g.reason)}`,"error",2800)}finally{ce.delete($),q()}}}async function A(_,$){if(!r||!$||oe.has($))return;oe.add($),q();let I;try{let g=async(O={})=>await r(_,{bead_id:$,expected_revision:_e(),...O});I=await g(),ye(I),I&&I.conflict&&(I=await r(_,{bead_id:$,expected_revision:_e()}),ye(I)),_==="worker-revise-fix"&&(I=await _r(I,(O,ee)=>g({continuation:O,decision_token:ee}),{onResult:ye,refresh:()=>g()}))}finally{oe.delete($),q()}if(!(!I||I.conflict)){if(I.ok){ae(_==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ae(`\uCC98\uBD84 \uAC70\uBD80: ${I.reason||""}`,"error",3e3)}}async function M(_){if(!r)return;let $=await r("worker-automation-toggle",{on:_,expected_revision:_e()});ye($),$&&$.conflict&&await r("worker-automation-toggle",{on:_,expected_revision:_e()}).then(ye)}async function G(_){if(!r||!_)return;let $=await r("worker-repo-operation-repair",{operation_id:_});if(ye($),$&&$.ok===!1){ae(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${$.reason||""}`,"error",3e3);return}$&&$.ok===!0&&ae("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function Y(_){if(!r||!_)return;let $=await r("worker-repo-operation-dismiss",{operation_id:_});ye($),$&&$.ok===!1&&ae(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${$.reason||""}`,"error",3e3)}async function ne(_){if(!r||!Number.isFinite(_))return;let $=Math.max(Js,Math.floor(_)),I=await r("worker-queue-set-slots",{slots:$,expected_revision:_e()});ye(I),I&&I.conflict&&await r("worker-queue-set-slots",{slots:$,expected_revision:_e()}).then(ye)}async function re(_){if(!r||!Number.isInteger(_)||_<1||_>Ad)return;let $=Le(),I=(Array.isArray($.serial_lanes)?$.serial_lanes:[]).slice(_).reduce((ee,de)=>ee+(Array.isArray(de?.entries)?de.entries.length:0),0),g=()=>({count:_,expected_revision:_e()}),O=await r("worker-queue-set-serial-lane-count",g());ye(O),O&&O.conflict&&(O=await r("worker-queue-set-serial-lane-count",g()),ye(O)),O&&O.applied&&I>0&&ae(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${I}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function me(){let _=Le(),$=b?b.selectBoardColumn(Om,"ready"):[],I=b?b.selectBoardColumn(Mm,"blocked"):[],g=b?b.selectBoardColumn(Dm,"closed"):[],O=b?b.selectBoardColumn(Pm,"in_progress"):[],ee=new Map;for(let h of O){let F=Xm(h);if(!F)continue;let ie=ee.get(F);ie?ie.push(h):ee.set(F,[h])}let de=h=>{let F=ls(ee.get(h)||[]);return F?F.title||F.id:null},Me=_.bead_titles||{},Re=new Map;for(let[h,F]of Object.entries(Me))typeof F=="string"&&F.length>0&&Re.set(h,F);for(let h of[...$,...I])Re.set(h.id,h.title||h.id);let lt=_.bead_times&&typeof _.bead_times=="object"&&!Array.isArray(_.bead_times)?_.bead_times:{},dt=_.bead_labels&&typeof _.bead_labels=="object"&&!Array.isArray(_.bead_labels)?_.bead_labels:{},y=new Map;for(let[h,F]of Object.entries(dt))Array.isArray(F)&&y.set(h,ka(F));for(let h of[...$,...I]){let F=h.labels;Array.isArray(F)&&!y.has(h.id)&&y.set(h.id,ka(F))}let u=new Map,C=o?.get()?.last_good?.result?.groups;for(let h of Array.isArray(C)?C:[]){if(h?.eligible!==!0||!Array.isArray(h.members))continue;let F=h.members.map(He=>{let pt=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).find(Vt=>Vt.entries.some(Et=>Et.bead_id===He));return pt?pt.id:null});if(!(F.every(He=>He!==null)&&new Set(F).size===1))for(let He of h.members)u.set(He,h.members.filter(pt=>pt!==He))}let x=_.bead_blocked_by&&typeof _.bead_blocked_by=="object"&&!Array.isArray(_.bead_blocked_by)?_.bead_blocked_by:{},V=new Map;for(let[h,F]of Object.entries(lt))F&&typeof F=="object"&&V.set(h,F);for(let h of[...$,...I])V.set(h.id,{created_at:h.created_at,updated_at:h.updated_at});let we=h=>V.get(h)||{},ke=_.pr_wait||[],Ze=_.pr_observations||{},Ue=_.pr_activity||{},mt=_.cleanup_failed||{},sr=Object.entries(mt).map(([h,F])=>({bead_id:h,step:F&&F.step?F.step:"",reason:F&&F.reason?F.reason:"",at:F&&typeof F.at=="number"?F.at:null,detail:F&&typeof F.detail=="string"?F.detail:null,output_tail:F&&typeof F.output_tail=="string"&&F.output_tail?F.output_tail:void 0,log_path:F&&typeof F.log_path=="string"&&F.log_path?F.log_path:void 0,retry_count:F&&typeof F.retry_count=="number"&&Number.isInteger(F.retry_count)&&F.retry_count>0?F.retry_count:0,failure_code:F&&typeof F.failure_code=="string"?F.failure_code:void 0,subject_id:F&&typeof F.subject_id=="string"?F.subject_id:void 0,repair_eligible:!!(F&&F.repair_eligible),repair:F&&F.repair?F.repair:void 0})),an=_.queue||[],Oe=new Set([...an.map(h=>h.bead_id),...(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).flatMap(h=>(Array.isArray(h?.entries)?h.entries:[]).map(F=>F.bead_id)),...ke.map(h=>h.bead_id),..._.done.map(h=>h.bead_id)]),bt=new Set(I.map(h=>h.id)),ln=i?i.get()?.order||{}:{},Ia=new Set,La=[];for(let h of[...$,...I])Oe.has(h.id)||Ia.has(h.id)||Zm(h)||Object.hasOwn(h,"labels")&&wa(h.labels)||(Ia.add(h.id),La.push(h));P=Ym(La,J,ln);let Hd=_.admission||{},Oa=h=>{let F=Hd[h];if(!F)return"";if(F.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ie=typeof F.reason=="string"?F.reason:"",He=ie.indexOf(":");return He>0&&He<ie.length-1?`\u26D4 ${ie.slice(0,He)} (${ie.slice(He+1)})`:`\u26D4 ${ie}`},Gd=P.map(h=>{let F=Rn(h),ie=F.path.length>0,He=h.workflow?.route==="quick_fix"||h.metadata&&h.metadata.route==="quick_fix",pt=!Object.hasOwn(h,"description")||typeof h.description=="string"&&h.description.trim().length>0,Et=!(Object.hasOwn(h,"labels")&&wa(h.labels))&&(He?pt:ie&&!F.conflict),ut=bt.has(h.id),Kt=[];ut&&Kt.push(Qm(h)),He&&!pt?Kt.push("missing_description"):!He&&F.conflict?Kt.push("spec_id_conflict"):!He&&!ie&&Kt.push("spec \uC5C6\uC74C");let Zn=Oa(h.id);return Zn&&Kt.push(Zn),{id:h.id,title:h.title||h.id,reason:Kt.join(" \xB7 "),draggable:Et,lane:"candidate",created_at:h.created_at,updated_at:h.updated_at,workflow:h.workflow,is_quick_fix:He,status:h.status,blocked:ut,has_spec:ie}}),to=Fm(Gd,j),Vd=to.visible,Kd=_.revise_parked||{},Wn=_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},ro=(h,F)=>h.map((ie,He)=>{let pt=F!=="done",Vt=F!=="done"&&F!=="queue",Et=pt?Kd[ie.bead_id]:null,ut=pt?cr(Wn,ie.bead_id):null,Kt=ut?.operation?ut:null,Zn=pt&&y.get(ie.bead_id)===!0,ni=x[ie.bead_id]||[],io=_.admission&&typeof _.admission=="object"?_.admission[ie.bead_id]:null,lo=pt?yc(io,!!Kt||ce.has(ie.bead_id)):null,iu=pt&&!lo?Oa(ie.bead_id):null,lu=pt?[iu]:[],si=pt&&ni.length>0&&typeof io?.reason=="string"&&io.reason.startsWith("not_ready")?[`\u23F8 ${ni.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],co=pt?u.get(ie.bead_id):void 0;return co&&co.length>0&&si.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${co.join(", ")}\uC640`),{id:ie.bead_id,title:Re.get(ie.bead_id)||ie.bead_id,reason:lu.filter(Boolean).join(" \xB7 "),draggable:pt&&!Kt&&!lo,done:F==="done",lane:F,seq:Vt?He+1:void 0,worker_serial:Zn,discard:Kt,stale_work:lo,badges:[...si,...Et?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Et,revise_action:!!Et,revise_enabled:!!Et&&!Kt&&!oe.has(ie.bead_id),revise_title:Et?Et.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Et.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:F==="done"?zt(_.attempts||{},ie.bead_id):null,work_ms:F==="done"?bc(_.attempts||{},ie.bead_id):null,done_at:F==="done"&&typeof ie.added_at=="number"?ie.added_at:void 0,...we(ie.bead_id)}}),zr=_.attempts?Object.values(_.attempts):[],no=new Set;for(let h of zr)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&no.add(h.resumed_from);let Ma=new Map;for(let h of zr)Ma.set(h.bead_id,h.attempt_id);let zn=new Map;for(let h of zr)zn.set(h.attempt_id,h);function so(h){let F=new Set,ie=h;for(;ie&&!F.has(ie.attempt_id);){if(ie.conflict_resolution===!0)return!0;F.add(ie.attempt_id),ie=typeof ie.resumed_from=="string"&&ie.resumed_from.length>0&&zn.get(ie.resumed_from)||null}return!1}let Hn=typeof _.declared_base=="string"?_.declared_base:null;function Yd(h){let F=null;for(let ie of zr)!ie||ie.bead_id!==h||so(ie)||(F===null||(typeof ie.started_at=="number"?ie.started_at:0)>=(typeof F.started_at=="number"?F.started_at:0))&&(F=ie);return F&&typeof F.target_base=="string"?F.target_base:null}let Pa=[],Da=[],Zd=pd(_),Na=h=>{let F=typeof h.session_id=="string"&&h.session_id.length>0,ie=no.has(h.attempt_id);return{eligible:F&&!ie,reason:F?ie?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Gt=null;for(let h of zr){let F=h.status==="paused"&&!no.has(h.attempt_id);if(h.status==="running"||F)Da.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:Re.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,paused:F,conflict_resolution:so(h),base_exception:Sa(Hn,h.target_base),can_pause:typeof h.session_id=="string"&&h.session_id.length>0,discard:cr(Wn,h.bead_id,{attempt_id:h.attempt_id}),usage:zt(_.attempts||{},h.bead_id),current_child:de(h.bead_id),...we(h.bead_id)});else if((h.status==="failed"||h.status==="orphaned")&&Zd(h)){let ie=Na(h);Pa.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:Re.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,failed:!0,status:h.status,status_label:h.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:cr(Wn,h.bead_id,{attempt_id:h.attempt_id}),resume_eligible:ie.eligible,resume_reason:ie.reason,conflict_resolution:so(h),base_exception:Sa(Hn,h.target_base),usage:zt(_.attempts||{},h.bead_id),current_child:de(h.bead_id),...we(h.bead_id)}),Gt=h}}let Gn=[...Pa,...Da].map(h=>{let F=zn.get(h.attempt_id),ie=F?.quickfix_landing;if(F?.quickfix_lane!==!0||!ie||typeof ie!="object")return h;let He=typeof ie.reason=="string"&&ie.reason.length>0?ie.reason:null,pt=qn({bead_id:F.bead_id,merge_sha:ie.head_sha,cleanup_cursor:ie.cursor,cleanup_failed:He?{step:ie.cursor,reason:He}:null,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]});return pt?{...h,landing:pt}:h}),qa=null;if(Gt){let h=Na(Gt),F=Gt.cause_detail;qa={bead_id:Gt.bead_id,repo:Gt.repo||"",reason:Gt.cause||Gt.status,cause_detail:F&&typeof F.reason=="string"?{reason:F.reason,command:typeof F.command=="string"?F.command:null}:null,resume_attempt_id:Gt.attempt_id,resume_eligible:h.eligible,resume_reason:h.reason,discard:cr(Wn,Gt.bead_id,{attempt_id:Gt.attempt_id})}}let Fa=new Set(Gn.map(h=>h.bead_id)),oo=Array.isArray(_.merge_queue)?_.merge_queue:[],ja=new Map,Ba=new Map,Ua=new Map,Wa=new Map,za=new Map;oo.forEach((h,F)=>{h&&typeof h.bead_id=="string"&&(ja.set(h.bead_id,F+1),Ba.set(h.bead_id,h.resolution),Ua.set(h.bead_id,h.continuation_action||null),Wa.set(h.bead_id,h.head_review||null),za.set(h.bead_id,h.authority||null))});let Hr=_.merge_queue_state||{active:null,failures:{}},Xd=Hr.failures||{},Ha=Hr.waiting&&typeof Hr.waiting.bead_id=="string"&&typeof Hr.waiting.reason=="string"?Hr.waiting:null,Qd=_.auto_merge_skips||{},Ga=h=>{let F=Qd[h];if(!F)return null;let ie=Ze[h],He=ie&&ie.pr?ie.pr.head_sha:null;return He&&He===F.head_sha?F.reason||"":null},Vn=new Map;for(let h of Gn)h.failed!==!0&&h.conflict_resolution&&(h.paused?Vn.has(h.bead_id)||Vn.set(h.bead_id,"paused"):Vn.set(h.bead_id,"running"));let Va=Gn.filter(h=>!h.paused&&h.failed!==!0).length,Ka=(_.workspace_info||{}).slots,Ya=typeof Ka=="number"?Ka:typeof _.slots=="number"?_.slots:Js,Jd=Va>Ya,Kn=Pr(Z),eu=(Array.isArray(_.done)?_.done.slice():[]).filter(h=>Kn===void 0||typeof h.added_at!="number"||h.added_at>=Kn).sort((h,F)=>(F.added_at||0)-(h.added_at||0)),cn=ro(eu,"done"),tu=new Set((Array.isArray(_.done)?_.done:[]).map(h=>h?.bead_id).filter(h=>typeof h=="string")),Za=[],ru=d?.()||"";for(let h of g){let F=qr(h.closed_at);if(typeof h.id!="string"||tu.has(h.id)||F===null||Kn!==void 0&&F<Kn||typeof h.comment_count!="number"||h.comment_count<=0)continue;let ie=`${ru}\0${h.id}\0${String(h.updated_at)}\0${h.comment_count}`,He=W.get(ie);He===void 0&&r&&(W.set(ie,"pending"),Promise.resolve(r("get-comments",{id:h.id})).then(pt=>{let Vt=Array.isArray(pt)&&pt.some(Et=>Os(typeof Et?.text=="string"?Et.text:"")?.lane==="session");W.set(ie,Vt?"session":"not-session"),q()}).catch(()=>{W.set(ie,"failed"),q()})),He==="session"&&Za.push({id:h.id,title:h.title||h.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:F,created_at:h.created_at,updated_at:h.updated_at})}cn.push(...Za),cn.sort((h,F)=>(F.done_at||0)-(h.done_at||0));let Yn={};for(let h of mr)Yn[h]=0;let Xa=!1,Qa=0,ao=0,Ja=0;for(let h of cn){let F=h.usage;if(F&&typeof F=="object"){let ie=!1;for(let He of mr)Number.isFinite(F[He])&&(Yn[He]+=F[He],Xa=!0,ie=!0);ie&&(ao+=1,Number.isFinite(F.total_cost_usd)&&(Qa+=F.total_cost_usd,Ja+=1))}}ao>0&&Ja===ao&&(Yn.total_cost_usd=Qa);let ei=cn.map(h=>h.usage).filter(h=>h&&typeof h=="object"&&h.providers),nu=ei.length>0?kt(hs(ei)):Xa?Xt(Yn):null,su=_.lane_states&&typeof _.lane_states=="object"&&!Array.isArray(_.lane_states)?_.lane_states:{},ou=Array.isArray(_.serial_lanes)?_.serial_lanes:[],ti=h=>{if(ke.some(He=>He.bead_id===h))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let F=zr.filter(He=>He&&He.bead_id===h),ie=F.length>0?F[F.length-1].status:null;return ie==="failed"||ie==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ie==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ri=ou.filter(h=>h&&typeof h.id=="string"&&Array.isArray(h.entries)).map((h,F)=>{let ie=su[h.id]||{},He=new Map((Array.isArray(ie.corrections)?ie.corrections:[]).filter(ut=>ut&&typeof ut.bead_id=="string"&&typeof ut.after=="string").map(ut=>[ut.bead_id,ut.after])),pt=ro(h.entries.filter(ut=>!Fa.has(ut.bead_id)),h.id).map(ut=>He.has(ut.id)?{...ut,badges:[`\u{1F517} ${He.get(ut.id)} \uB4A4 (blocks \uC790\uB3D9)`,...ut.badges]}:ut),Vt=Array.isArray(ie.occupied_by)?ie.occupied_by.filter(ut=>typeof ut=="string"):[],Et=Vt.map(ut=>({id:ut,title:Re.get(ut)||ut,draggable:!1,lane:h.id,ghost:!0,badges:[ti(ut)]}));return{id:h.id,index:F+1,rows:[...Et,...pt],occupied:Vt.length>0,badge:Vt.length>0?ti(Vt[0]):"\uB300\uAE30",cycle:ie.cycle===!0}}),au=typeof _.serial_lane_count=="number"?_.serial_lane_count:ri.length;return{queue:_,idToTitle:Re,candidates:Vd,candidate_hidden:{blocked:to.hidden_blocked,spec:to.hidden_spec},running:Gn,live_count:Va,slots:Ya,over_cap:Jd,failure:qa,waiting:ro(an.filter(h=>!Fa.has(h.bead_id)),"queue"),serial_lanes:ri,serial_lane_count:au,pr_wait:ke.map(h=>og(h.bead_id,Re.get(h.bead_id)||h.bead_id,Ze,mt[h.bead_id]||null,zt(_.attempts||{},h.bead_id),Ue[h.bead_id]||(k.has(h.bead_id)||U.has(h.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Vn.get(h.bead_id)||null,h.external===!0,{position:ja.get(h.bead_id)||0,active:Hr.active===h.bead_id,failure:Xd[h.bead_id]||null,waiting:Ha?.bead_id===h.bead_id?Ha.reason:null,resolution:Ba.get(h.bead_id),continuation_action:Ua.get(h.bead_id),head_review:Wa.get(h.bead_id)||null,authority:za.get(h.bead_id)||null},h.wt_present!==!1,_.auto_merge===!0?Ga(h.bead_id):null,Sa(Hn,Yd(h.bead_id)),_.completion_status&&typeof _.completion_status=="object"&&!Array.isArray(_.completion_status)&&_.completion_status[h.bead_id]||null,_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},zn.get(Ma.get(h.bead_id)||"")?.worker_serial===!0,_.auto_merge===!0,{merge_sha:h.merge_sha,cleanup_cursor:h.cleanup_cursor,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]})).map(h=>({...h,...we(h.id)})),merge_queue_length:oo.length,merge_queue_running:oo.length>0,auto_excluded:ke.map(h=>h.bead_id).filter(h=>Ga(h)!==null),declared_base:Hn,done:cn,token_total:nu,cleanup_failures:sr,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]}}function Se(){let $=!!o?.get()?.job,I=!$&&o?.isPending?.()===!0,g=$?"\uBD84\uC11D \uC911":I?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${g?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${g?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${g?c`<span class="worker-analysis-btn__badge">${g}</span>`:""}
    </button>`}function De(_){let $=_.waiting.length>0?_.waiting[0].id:"\u2014",I=c`<button
      type="button"
      class="worker-play${_.queue.auto_advance?" is-active":""}"
    >
      ${_.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,g=w(_),O=_.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ee=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${_.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${_.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${L()} 완료 <b>${_.done.length}</b></span
      >`,de=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${_.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${_.declared_base||"?"}</span
    >`,Me=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Js}
          step="1"
          .value=${String(_.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Ad},(dt,y)=>y+1).map(dt=>c`<option
                value=${String(dt)}
                ?selected=${_.serial_lane_count===dt}
              >
                ${dt}
              </option>`)}
        </select>
      </label>
      ${o?Se():""} `,Re=Oc({failure:_.failure}),lt=hc(_.repo_operations,_.cleanup_failures);return N?c`<div class="worker-ribbon">
          ${I} ${g}
          <div class="worker-kpi worker-kpi--ribbon">${O}${ee}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Me}</div>
          <div class="worker-kpi">${de}</div>
        </div>
        ${lt}${he.template()}${Re}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${I}${g}${Me}</div>
        <div class="worker-kpi">
          ${O}${ee}${de}
          ${(Array.isArray(_.token_total)?_.token_total:_.token_total?[{label:_.token_total,tooltip:`${L()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(dt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${dt.tooltip}
                >${L()} 완료 · 누적 ${dt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${$}</b></span
          >
        </div>
      </div>
      ${lt}${he.template()}${Re}`}function Ne(_){if(_.running.length===0&&_.pr_wait.length===0)return"";let $=_.running.some(I=>!I.paused&&I.failed!==!0);return c`<section
      class="worker-now${$?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${_.running.length+_.pr_wait.length}</span
        >
      </header>
      ${_.running.length>0?fa(_.running,Date.now(),fe):""}
      ${_.pr_wait.map(I=>oa(I))}
    </section>`}function ze(_){let $=_.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${j.show_blocked}
        />
        🔒 blocked${$.blocked>0?` ${$.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${jm.map(I=>c`<button
              type="button"
              class="worker-filter__chip${j.spec===I.value?" is-active":""}"
              data-spec=${I.value}
              aria-pressed=${j.spec===I.value?"true":"false"}
            >
              ${I.label}
            </button>`)}
        ${$.spec>0?c`<span class="worker-filter__hidden">숨김 ${$.spec}</span>`:""}
      </div>
    </div>`}function et(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${J}
    >
      ${Bm.map(_=>c`<option value=${_.value} ?selected=${J===_.value}>
            ${_.label}
          </option>`)}
    </select>`}function B(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${Z}
      >
        ${or.map(_=>c`<option value=${_.value} ?selected=${Z===_.value}>
              ${_.label}
            </option>`)}
      </select>
    </div>`}function X(_){let $=c`<span
      class="worker-lane__badge${_.occupied?" worker-lane__badge--held":""}"
      >${_.badge}</span
    >`,I=_.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return tr({id:`worker-pane-lane-${_.id}`,lane:_.id,title:`\uC9C1\uB82C ${_.index}`,items:_.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:$,controls:I})}function w(_){let $=_.queue.auto_merge===!0;if(_.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${$?" is-active":""}"
        title=${$?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${$?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${_.merge_queue_length}
      </button>`;if($)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let I=new Set(_.auto_excluded),g=_.pr_wait.filter(O=>O.merge_action&&O.merge_enabled&&!I.has(O.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${g>0?` ${g}`:""}
    </button>`}function T(_){let $=tr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:_.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:et(),controls:ze(_)});return N?c`<div class="worker-lanes worker-lanes--mobile">
        ${Ne(_)}
        ${tr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:_.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:S.queue,preview:Ed(_.waiting)})}
        ${_.serial_lanes.map(I=>X(I))}
        ${$}
        ${tr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:_.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:B(),collapsible:!0,collapsed:S.done,preview:Array.isArray(_.token_total)?_.token_total.map(I=>I.label).join(" \xB7 "):_.token_total||Ed(_.done)})}
      </div>`:c`<div class="worker-lanes">
      ${$}
      <div class="worker-wait">
        ${tr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:_.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${_.serial_lanes.map(I=>X(I))}
      </div>
      ${tr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${_.slots}`,items:_.running,live:_.running.some(I=>!I.paused&&I.failed!==!0),body:fa(_.running,Date.now(),fe)})}
      ${tr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:_.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${tr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${L()} ${_.done.length}`,items:_.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:B()})}
    </div>`}function D(_){S={...S,[_]:!S[_]},Km(S),q()}function q(){let _=me();Ke(De(_),Ie),Ke(T(_),st)}function be(){let _=document.querySelector(".app-header");if(!_)return;let $=()=>{let I=Math.round(_.getBoundingClientRect().height);se.style.setProperty("--worker-ribbon-top",`${I}px`)};if($(),typeof ResizeObserver=="function"){let I=new ResizeObserver($);I.observe(_),Q.push(()=>I.disconnect())}else window.addEventListener("resize",$),Q.push(()=>window.removeEventListener("resize",$))}function ve(){if(typeof window.matchMedia!="function")return;let _=window.matchMedia(Gm);N=!!_.matches;let $=I=>{let g=!!(I&&typeof I.matches=="boolean"?I.matches:_.matches);g!==N&&(N=g,q())};typeof _.addEventListener=="function"?(_.addEventListener("change",$),Q.push(()=>_.removeEventListener("change",$))):typeof _.addListener=="function"&&(_.addListener($),Q.push(()=>_.removeListener($)))}let le=null;function nt(_){le=_.target instanceof Element?_.target:null}function Ae(_){let I=_.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!I)return;if(le&&I.contains(le)&&le.closest("input, button, a")){_.preventDefault();return}let g=I.dataset.beadId||"",O=I.dataset.lane||"";E={bead_id:g,from_lane:O};try{_.dataTransfer?.setData("text/plain",g),_.dataTransfer&&(_.dataTransfer.effectAllowed="move")}catch{}}function gt(_){let $=_.target?.closest?.(".worker-pane");if(!$)return;let I=$.dataset.lane||"";I!=="candidate"&&I!=="queue"&&!/^s[1-5]$/.test(I)||(_.preventDefault(),_.dataTransfer&&(_.dataTransfer.dropEffect="move"),$.classList.add("worker-pane--drag-over"))}function Ge(_){_.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function xt(_,$){let I=P.find(de=>de.id===_);if(!I)return;let g=P.filter(de=>de.id!==_),O=g.length;if($){let de=$.dataset.beadId;if(de===_)return;let Me=g.findIndex(Re=>Re.id===de);Me>=0&&(O=Me)}let ee=g.slice();ee.splice(O,0,I),R.applyReorder(_,ee,O)}function jt(_){let $=_.target?.closest?.(".worker-pane");if(!$)return;_.preventDefault(),$.classList.remove("worker-pane--drag-over");let I=$.dataset.lane||"",g=E?.bead_id||_.dataTransfer?.getData("text/plain")||"",O=E?.from_lane||"";if(E=null,!g)return;let ee=_.target?.closest?.(".worker-mini, .worker-card"),de=Array.from($.querySelectorAll(".worker-mini, .worker-card")),Me=de.length;if(ee){let Re=de.indexOf(ee);Re>=0&&(Me=Re)}if(Me=Math.max(0,Me-$.querySelectorAll(".worker-mini--ghost").length),$.classList.contains("worker-pane--collapsed")&&(Me=H()),I==="candidate"){if(O==="candidate"){xt(g,ee);return}(O==="queue"||/^s[1-5]$/.test(O))&&Ce(g);return}if(I==="queue"||/^s[1-5]$/.test(I)){let Re=I==="queue"?"parallel":I;O===I?ge(g,Re,Me):K(g,Re,Me)}}function dr(_){j=_,qm(_),q()}function At(_){J=_==="board"||_==="created"||_==="spec"?_:eo,Wm(J),q()}function Tt(_){Z=Wt(_)?_:Dt,Hm(Z),f?.(Z),q()}function ur(_){let $=_.target?.closest?.(".worker-serial-lane-count");if($){let Me=Number.parseInt($.value,10);Number.isFinite(Me)&&re(Me).then(q);return}let I=_.target?.closest?.(".worker-filter__blocked");if(I){dr({...j,show_blocked:I.checked});return}let g=_.target?.closest?.(".worker-done-range");if(g){Tt(g.value);return}let O=_.target?.closest?.(".worker-sort");if(O){At(O.value||eo);return}let ee=_.target?.closest?.(".worker-slots__input");if(!ee)return;let de=Number.parseInt(ee.value,10);if(!Number.isFinite(de)){q();return}ne(de).then(q)}function rr(_){return _?{runner:_.runner||void 0,model:_.model||void 0,effort:_.effort||void 0,worktree:_.worktree||void 0,status:_.status||void 0,session_id:_.session_id||void 0}:{}}function Bt(){let _=me();return{operations:_.repo_operations,cleanup_failures:_.cleanup_failures,repo:d&&d()||""}}function nr(){fe&&ue.close(),tt.hidden=!1,Ve.hidden=!1,Ee.open(Bt()),q()}function yt(_){let $=Le(),I=$.attempts?$.attempts[_]:null;fe=_,Pe=null,Ee.close(),tt.hidden=!0,Ve.hidden=!1,ue.open({attempt_id:_,meta:rr(I)}),q()}function pr(_,$){fe=null,Pe=_,Ee.close(),tt.hidden=!0,Ve.hidden=!1,ue.open({attempt_id:_,meta:$,hide_prompt:!0}),q()}function Ye(){if(Ee.isOpen()&&Ee.refresh(Bt()),Pe){let I=(o?.get()?.runs||[]).find(g=>g.run_id===Pe);I?ue.updateMeta(xa(I)):ue.close();return}if(!fe)return;let _=Le(),$=_.attempts?_.attempts[fe]:null;if($){ue.updateMeta(rr($));return}ue.close()}function Mt(_){let $=_.target;if($?.closest?.(".worker-mini__serial, .worker-mini__grip")||$?.closest?.("#worker-parallel-analysis-dialog"))return;if($?.closest?.(".worker-analysis-btn")){Fe?.open();return}if($?.closest?.(".worker-repo-strip")||$?.closest?.(".worker-mini__timeline")){nr();return}let I=$?.closest?.(".worker-repo-op__session");if(I){let Oe=I.dataset.attemptId;Oe&&yt(Oe);return}let g=$?.closest?.(".worker-repo-op__resolve");if(g){G(g.dataset.operationId||"");return}let O=$?.closest?.(".worker-repo-op__dismiss");if(O){Y(O.dataset.operationId||"");return}let ee=$?.closest?.(".worker-cleanup__resume");if(ee){let Oe=ee.dataset.beadId;Oe&&z(Oe);return}let de=$?.closest?.(".worker-banner__resume");if(de){let Oe=de.dataset.attemptId;Oe&&We(Oe);return}let Me=$?.closest?.(".worker-banner__discard");if(Me){let Oe=Me.dataset.confirmation==="merged"?"merged":"unmerged";m(Me.dataset.beadId||"",Me.dataset.attemptId||null,Oe,Me.dataset.operationId||null);return}let Re=$?.closest?.(".worker-banner__dismiss");if(Re){let Oe=Re.dataset.attemptId;Oe&&$e(Oe);return}if($?.closest?.(".worker-play")){M(!Le().auto_advance);return}let lt=$?.closest?.(".worker-merge-all");if(lt){lt.classList.contains("worker-merge-all--stop")?Le().auto_merge===!0?Te(!1):pe():Te(!0);return}let dt=$?.closest?.(".worker-pane__hd--toggle");if(dt){let Oe=dt.dataset.lane;(Oe==="queue"||Oe==="done")&&D(Oe);return}let y=$?.closest?.(".worker-card__place");if(y){let Oe=y.dataset.beadId;Oe&&!y.disabled&&K(Oe,"parallel",H());return}let u=$?.closest?.(".worker-filter__chip");if(u){let Oe=u.dataset.spec;(Oe==="all"||Oe==="with"||Oe==="without")&&dr({...j,spec:Oe});return}let C=$?.closest?.(".worker-mini__merge");if(C){let Oe=C.dataset.beadId||"";Le().cleanup_failed?.[Oe]?z(Oe):rt(Oe);return}let x=$?.closest?.(".worker-mini__merge-cancel");if(x){Be(x.dataset.beadId||"");return}let V=$?.closest?.(".worker-mini__discard");if(V){m(V.dataset.beadId||"",V.dataset.attemptId||null,V.dataset.discardMode==="merged"?"merged":"unmerged",V.dataset.operationId||null);return}let we=$?.closest?.(".worker-mini__stale-continue");if(we){v("worker-stale-work-continue",we.dataset.beadId||"",we.dataset.actionId||"");return}let ke=$?.closest?.(".worker-mini__stale-backup");if(ke){v("worker-stale-work-backup-fresh",ke.dataset.beadId||"",ke.dataset.actionId||"");return}let Ze=$?.closest?.(".worker-mini__stale-recheck");if(Ze){v("worker-stale-work-recheck",Ze.dataset.beadId||"",Ze.dataset.actionId||"");return}let Ue=$?.closest?.(".worker-mini__revise-fix");if(Ue){A("worker-revise-fix",Ue.dataset.beadId||"");return}let mt=$?.closest?.(".worker-mini__revise-approve");if(mt){A("worker-revise-approve",mt.dataset.beadId||"");return}if($?.closest?.(".worker-mini__pr"))return;if($?.closest?.(".rtile__discard")){let Oe=$?.closest?.(".rtile"),bt=Oe?.dataset?.beadId,ln=Oe?.dataset?.attemptId;bt&&m(bt,ln||null,"unmerged",$?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if($?.closest?.(".rtile__dismiss")){let bt=$?.closest?.(".rtile")?.dataset?.attemptId;bt&&$e(bt);return}if($?.closest?.(".rtile__pause")){let bt=$?.closest?.(".rtile")?.dataset?.attemptId;bt&&je(bt);return}if($?.closest?.(".rtile__resume")){let bt=$?.closest?.(".rtile")?.dataset?.attemptId;bt&&We(bt);return}if($?.closest?.(".rtile__session")){let bt=$?.closest?.(".rtile")?.dataset?.attemptId;bt&&yt(bt);return}if($?.closest?.(".worker-drawer-overlay__backdrop")){Ee.close(),ue.close();return}if($?.closest?.(".worker-drawer-host"))return;let sr=$?.closest?.(".rtile");if(sr){if($?.closest?.(".rtile__id")){let bt=sr.dataset.beadId;bt&&Zt(bt).then(ln=>{ln?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Oe=sr.dataset.beadId;Oe&&l&&l(Oe);return}let an=$?.closest?.(".worker-mini, .worker-card");if(an){let Oe=an.dataset.beadId;if($?.closest?.(".worker-mini__id, .worker-card__id")){Oe&&Zt(Oe).then(bt=>{bt?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Oe&&l&&l(Oe)}}return e.addEventListener("pointerdown",nt),e.addEventListener("dragstart",Ae),e.addEventListener("dragover",gt),e.addEventListener("dragleave",Ge),e.addEventListener("drop",jt),e.addEventListener("click",Mt),e.addEventListener("change",ur),ve(),be(),b&&Q.push(b.subscribe(()=>{for(let[_,$]of W)$==="failed"&&W.delete(_);q()})),s&&Q.push(s.subscribe(()=>{let _=d&&d()||"";_!==qe&&(qe=_,xe.close()),q(),Ye()})),o&&typeof o.subscribe=="function"&&Q.push(o.subscribe(()=>{Ye(),q()})),q(),{load(){q()},destroy(){for(let _ of Q.splice(0))try{_()}catch{}e.removeEventListener("pointerdown",nt),e.removeEventListener("dragstart",Ae),e.removeEventListener("dragover",gt),e.removeEventListener("dragleave",Ge),e.removeEventListener("drop",jt),e.removeEventListener("click",Mt),e.removeEventListener("change",ur);try{ue.destroy()}catch{}Ve.hidden=!0;try{Fe?.destroy()}catch{}try{xe.destroy()}catch{}Ke(c``,e)}}}function Ta(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Od(e,t,r,n=async()=>{},s=async()=>{}){let o=ft("views:workspace-picker"),a=null,i=!1,l=!1,d=!1;async function p(N){let U=N.target.value,ce=t.getState().workspace?.current?.path||"";if(U&&U!==ce){o("switching workspace to %s",U),i=!0,S();try{await r(U)}catch(Q){o("workspace switch failed: %o",Q)}finally{i=!1,S()}}}async function f(){let N=t.getState(),k=N.workspace?.current?.path||N.workspace?.available?.[0]?.path||"";if(!(!k||l)){o("git-pulling workspace %s",k),l=!0,S();try{await n(k)}catch(U){o("workspace git pull failed: %o",U)}finally{l=!1,S()}}}function b(N){let k=N.target;k&&e.contains(k)||P()}function R(N){N.key==="Escape"&&P()}function E(){d||(d=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",R),S())}function P(){d&&(d=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",R),S())}function j(){d?P():E()}async function J(N){let k=N.target,U=k.value,oe=k.checked;o("toggling visibility %s \u2192 %s",U,String(oe));try{await s(U,oe)}catch(ce){o("workspace visibility toggle failed: %o",ce)}}function Z(N){return N?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${i||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function W(N,k){return c`
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
                ${N.map(U=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${U.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${U.path}"
                        .checked=${!k.has(U.path)}
                        @change=${J}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Ta(U.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function L(){let N=t.getState(),k=N.workspace?.current,U=N.workspace?.available||[],oe=new Set(N.workspace?.hidden||[]),ce=k?.path||U[0]?.path||"";if(U.length===0)return c``;let Q=U.filter(se=>!oe.has(se.path)||se.path===ce);if(Q.length<=1){let se=Q[0]||U[0],Ie=Ta(se.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${se.path}"
            >${Ie}</span
          >
          ${W(U,oe)}
          ${Z(ce)}
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
          ${Q.map(se=>c`
              <option
                value="${se.path}"
                ?selected=${se.path===ce}
                title="${se.path}"
              >
                ${Ta(se.path)}
              </option>
            `)}
        </select>
        ${W(U,oe)}
        ${Z(ce)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function S(){Ke(L(),e)}return S(),a=t.subscribe(()=>S()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",R),Ke(c``,e)}}}var Md=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Ca(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Pd(e,t,r=Ca()){return{id:r,type:e,payload:t}}function Dd(e={}){let t=ft("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,d=new Map,p=[],f=new Map,b=new Set;function R(L){for(let S of Array.from(b))try{S(L)}catch{}}function E(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),R(o);let L=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),S=(r.jitterRatio||0)*L,N=Math.max(0,Math.round(L+(Math.random()*2-1)*S));t("ws retry in %d ms (attempt %d)",N,a+1),i=setTimeout(()=>{i=null,W()},N)}function P(L){try{s?.send(JSON.stringify(L))}catch(S){t("ws send failed",S)}}function j(){for(o="open",t("ws open"),R(o),a=0;p.length;){let L=p.shift();L&&P(L)}}function J(L){let S;try{S=JSON.parse(String(L.data))}catch{t("ws received non-JSON message");return}if(!S||typeof S.id!="string"||typeof S.type!="string"){t("ws received invalid envelope");return}if(d.has(S.id)){let k=d.get(S.id);d.delete(S.id),S.ok?k?.resolve(S.payload):k?.reject(S.error||new Error("ws error"));return}let N=f.get(S.type);if(N&&N.size>0)for(let k of Array.from(N))try{k(S.payload)}catch(U){t("ws event handler error",U)}else t("ws received unhandled message type: %s",S.type)}function Z(){o="closed",t("ws closed"),R(o);for(let[L,S]of d.entries())S.reject(new Error("ws disconnected")),d.delete(L);a+=1,E()}function W(){if(!l)return;let L=n();try{s=new WebSocket(L),t("ws connecting %s",L),o="connecting",R(o),s.addEventListener("open",j),s.addEventListener("message",J),s.addEventListener("error",()=>{}),s.addEventListener("close",Z)}catch(S){t("ws connect failed %o",S),E()}}return W(),{send(L,S){if(!Md.includes(L))return Promise.reject(new Error(`unknown message type: ${L}`));let N=Ca(),k=Pd(L,S,N);return t("send %s id=%s",L,N),new Promise((U,oe)=>{d.set(N,{resolve:U,reject:oe,type:L}),s&&s.readyState===s.OPEN?P(k):(t("queue %s id=%s (state=%s)",L,N,o),p.push(k))})},on(L,S){f.has(L)||f.set(L,new Set);let N=f.get(L);return N?.add(S),()=>{N?.delete(S)}},onConnection(L){return b.add(L),()=>{b.delete(L)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,W()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function ag(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function ig(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Ra=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Nd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],Tr="tab:worker:closed",lg="bdui.worker.done-range",qd=Qc,Fd="worker:queue",jd="worker:parallel-analysis",Bd="ui:order",Ud="ui:display-policy",Wd="exec:presets",Cr="tab:board:closed",zd="beads-ui.board.closed-range";function cg(e){let t=ft("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ke(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&ud(s),o&&a&&i&&l){let st=function(y,u){let C="Request failed",x="";if(y&&typeof y=="object"){let we=y;if(typeof we.message=="string"&&we.message.length>0&&(C=we.message),typeof we.details=="string")x=we.details;else if(we.details&&typeof we.details=="object")try{x=JSON.stringify(we.details,null,2)}catch{x=""}}else typeof y=="string"&&y.length>0&&(C=y);let V=u&&u.length>0?`Failed to load ${u}`:"Request failed";tt.open(V,C,x)},rt=function(y){return`${Ye.getState().workspace.current?.path||""}\0${y}`},z=function(){H&&(H().catch(()=>{}),H=null),K=null,ge=null},Te=function(y){Ce=y;let u=()=>{Ce!==y||Ye.getState().selected_id!==y||(Ce=null,te(y))};if(!$e){We.then(u);return}u()},v=function(y,u,C,x,V){return C!==m[u]?(V().catch(()=>{}),!1):(y.set(x,V),!0)},M=function(){let y=Ye.getState();me(y.view==="board"),B(y.view==="worker"),q(y.view==="monitor"),w(y.view==="board"||y.view==="worker"||A||!!y.selected_id)},ne=function(){let y=Pr(G);return y===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:y}}},re=function(){let y=Pr(Y);return y===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:y}}},me=function(y){if(y)for(let[u,C]of Ra){if(Be.has(u)||pe.has(u))continue;let x=u===Cr?ne():{type:C};try{Ee.register(u,x)}catch(ke){t("register %s store failed: %o",u,ke)}pe.add(u);let V=m.board,we=!1;ue.subscribeList(u,x).then(ke=>{we=!v(Be,"board",V,u,ke)}).catch(ke=>{t("subscribe %s failed: %o",u,ke),st(ke,"board")}).finally(()=>{pe.delete(u),we&&M()})}else Ne()},Ne=function(){m.board+=1;for(let[y]of Ra){let u=Be.get(y);u&&(u().catch(()=>{}),Be.delete(y));try{Ee.unregister(y)}catch(C){t("unregister %s failed: %o",y,C)}}},B=function(y){if(!y){X();return}for(let[u,C]of Nd){if(ze.has(u)||pe.has(u))continue;let x=u===Tr?re():{type:C};try{Ee.register(u,x)}catch(ke){t("register %s store failed: %o",u,ke)}pe.add(u);let V=m.worker,we=!1;ue.subscribeList(u,x).then(ke=>{we=!v(ze,"worker",V,u,ke)}).catch(ke=>{t("subscribe %s failed: %o",u,ke),st(ke,"worker")}).finally(()=>{pe.delete(u),we&&M()})}},X=function(){m.worker+=1;for(let[y]of Nd){let u=ze.get(y);u&&(u().catch(()=>{}),ze.delete(y));try{Ee.unregister(y)}catch(C){t("unregister %s failed: %o",y,C)}}},w=function(y){if(!y){T();return}et||(Pe("subscribe-worker-queue",{id:Fd}).catch(u=>{t("subscribe-worker-queue failed: %o",u)}),Pe("subscribe-worker-parallel-analysis",{id:jd}).catch(u=>{t("subscribe-worker-parallel-analysis failed: %o",u)}),et=()=>(Pe("unsubscribe-worker-parallel-analysis",{id:jd}),Pe("unsubscribe-worker-queue",{id:Fd})))},T=function(){et&&(et().catch(()=>{}),et=null),qe.clear()},q=function(y){if(!y){be();return}D||(Pe("subscribe-monitor-pipeline",{id:qd}).catch(u=>{t("subscribe-monitor-pipeline failed: %o",u)}),D=()=>Pe("unsubscribe-monitor-pipeline",{id:qd}))},be=function(){D&&(D().catch(()=>{}),D=null)},le=function(){ve||(Pe("subscribe-ui-order",{id:Bd}).catch(y=>{t("subscribe-ui-order failed: %o",y)}),ve=()=>Pe("unsubscribe-ui-order",{id:Bd}))},nt=function(){ve&&(ve().catch(()=>{}),ve=null),Fe.clear()},gt=function(){Ae||(Pe("subscribe-display-policy",{id:Ud}).catch(y=>{t("subscribe-display-policy failed: %o",y)}),Ae=()=>Pe("unsubscribe-display-policy",{id:Ud}))},Ge=function(){Ae&&(Ae().catch(()=>{}),Ae=null),Le.clear()},jt=function(){xt||(Pe("subscribe-impl-presets",{id:Wd}).catch(y=>{t("subscribe-impl-presets failed: %o",y)}),xt=()=>Pe("unsubscribe-impl-presets",{id:Wd}))},Bt=function(y){if(!y)return"Unknown";let u=y.split("/").filter(Boolean);return u.length>0?u[u.length-1]:"Unknown"};var d=st,p=rt,f=z,b=Te,R=v,E=M,P=ne,j=re,J=me,Z=Ne,W=B,L=X,S=w,N=T,k=q,U=be,oe=le,ce=nt,Q=gt,se=Ge,Ie=jt,Ve=Bt;let Qe=document.getElementById("header-loading"),at=Bi(Qe),tt=gc(e),fe=Dd(),Pe=at.wrapSend((y,u)=>fe.send(y,u)),ue=Oi(Pe),Ee=Mi(),xe=Ni(),qe=Di(),he=hi(),Fe=Pi(),Le=gi(),_e=bi(),ye=yi();fe.on("impl-presets-snapshot",y=>{let u=y;u&&typeof u.revision=="number"&&Array.isArray(u.presets)&&_e.set({revision:u.revision,presets:u.presets})}),fe.on("monitor-pipeline-snapshot",y=>{let u=y;if(!(!u||!Array.isArray(u.workspaces)))try{he.set(u.workspaces,u.workspaces_state)}catch{}}),fe.on("ui-order-snapshot",y=>{let u=y;if(u&&typeof u.revision=="number")try{Fe.set({revision:u.revision,order:u.order&&typeof u.order=="object"?u.order:{}})}catch{}}),fe.on("display-policy-snapshot",y=>{let u=y;if(u&&u.policy&&typeof u.policy=="object")try{Le.set(u.policy)}catch{}}),fe.on("session-log-snapshot",y=>{let u=y;if(u&&typeof u.id=="string")try{ye.set(u.id,Array.isArray(u.lines)?u.lines:[],typeof u.last_event_at=="number"?u.last_event_at:null)}catch{}}),fe.on("session-log-append",y=>{let u=y;if(u&&typeof u.id=="string")try{ye.append(u.id,u.event)}catch{}}),fe.on("snapshot",y=>{let u=y,C=u&&typeof u.id=="string"?u.id:"",x=C?Ee.getStore(C):null;if(x&&u&&u.type==="snapshot")try{x.applyPush(u)}catch{}}),fe.on("upsert",y=>{let u=y,C=u&&typeof u.id=="string"?u.id:"",x=C?Ee.getStore(C):null;if(x&&u&&u.type==="upsert")try{x.applyPush(u)}catch{}}),fe.on("delete",y=>{let u=y,C=u&&typeof u.id=="string"?u.id:"",x=C?Ee.getStore(C):null;if(x&&u&&u.type==="delete")try{x.applyPush(u)}catch{}});let H=null,K=null,ge=null,Ce=null,je=()=>{},We=new Promise(y=>{je=()=>y(void 0)}),$e=!1,Je=!1;async function te(y){let u=rt(y);if(u===K||u===ge)return;ge=u;let C=`detail:${y}`,x={type:"issue-detail",params:{id:y}};try{Ee.register(C,x)}catch(V){t("register detail store failed: %o",V)}try{let V=await ue.subscribeList(C,x);if(Ye.getState().selected_id!==y||rt(y)!==u){await V().catch(()=>{});return}H&&await H().catch(()=>{}),H=V,K=u}catch(V){t("detail subscribe failed: %o",V),st(V,"issue details")}finally{ge===u&&(ge=null)}}let Be=new Map,pe=new Set,m={board:0,worker:0},A=!1,G=Dt;try{let y=window.localStorage.getItem(zd);Wt(y)&&(G=y)}catch{}let Y=Dt;try{let y=window.localStorage.getItem(lg);Wt(y)&&(Y=y)}catch{}async function Se(y){if(!Wt(y)||y===G)return;G=y;try{window.localStorage.setItem(zd,y)}catch{}let u=Be.get(Cr);if(!u)return;Be.delete(Cr),await u().catch(()=>{});let C=ne();try{Ee.register(Cr,C)}catch(x){t("register %s store failed: %o",Cr,x)}try{let x=await ue.subscribeList(Cr,C);Be.set(Cr,x)}catch(x){t("re-subscribe %s failed: %o",Cr,x),st(x,"board")}}async function De(y){if(!Wt(y)||y===Y)return;Y=y;let u=ze.get(Tr);if(!u)return;ze.delete(Tr),await u().catch(()=>{});let C=re();try{Ee.register(Tr,C)}catch(x){t("register %s store failed: %o",Tr,x)}try{let x=await ue.subscribeList(Tr,C);ze.set(Tr,x)}catch(x){t("re-subscribe %s failed: %o",Tr,x),st(x,"worker")}}let ze=new Map,et=null,D=null,ve=null,Ae=null,xt=null;async function dr(){Ae=null,Le.clear(),xt=null,_e.clear(),et=null,D=null,Be.clear(),ze.clear(),m.board+=1,m.worker+=1,jt();let y=Ye.getState().workspace.current?.path;if(y)try{await fe.send("set-workspace",{path:y})}catch(C){t("workspace restore after reconnect failed: %o",C);return}gt();let u=Ye.getState();me(u.view==="board"),B(u.view==="worker"),q(u.view==="monitor"),w(u.view==="board"||u.view==="worker"||!!u.selected_id)}async function At(){t("clearing all subscriptions for workspace switch"),Ne(),X(),T(),xe.clear(),nt(),le(),Ge(),gt(),z();let y=Ye.getState();if(y.selected_id)try{Ee.unregister(`detail:${y.selected_id}`)}catch{}let u=Ye.getState();me(u.view==="board"),B(u.view==="worker"),q(u.view==="monitor"),w(u.view==="board"||u.view==="worker"||!!u.selected_id),u.selected_id&&Te(u.selected_id)}async function Tt(y){t("requesting workspace switch to %s",y),Je=!0;try{let u=await fe.send("set-workspace",{path:y});t("workspace switch result: %o",u),u&&u.workspace&&(Ye.setState({workspace:{current:{path:u.workspace.root_dir,database:u.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",y),u.changed&&(await At(),ae("Switched to "+Bt(y),"success",2e3)))}catch(u){throw t("workspace switch failed: %o",u),ae("Failed to switch workspace","error",3e3),u}finally{Je=!1}}async function ur(y){t("requesting workspace git pull for %s",y);try{let u=await fe.send("git-pull-workspace",{});t("workspace git pull result: %o",u);let C=u?.status;if(C==="up_to_date"){ae("Already up to date","success",2e3);return}if(C==="stash_pop_conflict"){ae("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ae("Git pulled "+Bt(y),"success",2e3)}catch(u){t("workspace git pull failed: %o",u);let C=u?.code,x=u?.message;if(C==="rebase_conflict"){ae("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(C==="rebase_conflict_abort_failed"){ae("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(C==="busy"){ae("Git pull skipped: another operation is running","warning",3e3);return}let V=x?`: ${x}`:"";throw ae(`Git pull failed${V}`,"error",3e3),u}}async function rr(y,u){t("setting workspace visibility %s \u2192 %s",y,String(u));try{await fe.send("set-workspace-visibility",{path:y,visible:u}),await nr()}catch(C){t("workspace visibility update failed: %o",C),ae("Failed to update project visibility","error",3e3)}}async function nr(){try{let y=await fe.send("list-workspaces",{});if(t("workspaces loaded: %o",y),y&&Array.isArray(y.workspaces)){let u=y.workspaces.map(we=>({path:we.path,database:we.database,pid:we.pid,version:we.version})),C=y.current?{path:y.current.root_dir,database:y.current.db_path}:null,x=Array.isArray(y.hidden)?y.hidden.filter(we=>typeof we=="string"):[];Ye.setState({workspace:{current:C,available:u,hidden:x}});let V=window.localStorage.getItem("beads-ui.workspace");V&&(!u.some(ke=>ke.path===V)||x.includes(V)?window.localStorage.removeItem("beads-ui.workspace"):C&&V!==C.path&&(t("restoring saved workspace preference: %s",V),await Tt(V)))}}catch(y){t("failed to load workspaces: %o",y)}}fe.on("workspace-changed",y=>{t("workspace-changed event: %o",y),y&&y.root_dir&&(Ye.setState({workspace:{current:{path:y.root_dir,database:y.db_path}}}),nr(),At())});let yt=!1;if(typeof fe.onConnection=="function"){let y=u=>{t("ws state %s",u),u==="reconnecting"||u==="closed"?(yt=!0,ae("Connection lost. Reconnecting\u2026","error",4e3)):u==="open"&&yt&&(yt=!1,ae("Reconnected","success",2200),ig(Ye,(C,x)=>{t(`${C}: %o`,x)}),dr())};fe.onConnection(y)}let pr="board";try{let y=window.localStorage.getItem("beads-ui.view");(y==="board"||y==="worker"||y==="monitor")&&(pr=y)}catch(y){t("view parse error: %o",y)}let Ye=ji({config:ag(),view:pr});fe.on("worker-queue-snapshot",y=>{let u=y;if(!u||!u.queue)return;let C=Ye.getState().workspace.current?.path;if(typeof C=="string"&&C.length>0&&u.root_dir!==C){t("dropping worker-queue snapshot for %s",String(u.root_dir));return}try{xe.set(u.queue)}catch{}}),fe.on("worker-parallel-analysis-snapshot",y=>{let u=y;if(!u)return;let C=Ye.getState().workspace.current?.path;if(!(typeof C=="string"&&C.length>0&&typeof u.root_dir=="string"&&u.root_dir!==C))try{qe.set({settings:u.settings,job:u.job??null,runs:Array.isArray(u.runs)?u.runs:[],last_good:u.last_good??null})}catch{}});let Mt=qi(Ye);Mt.start();let _=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),$=async(y,u)=>{try{return await Pe(y,u)}catch(C){if(_.has(y))throw C;return[]}};n&&ed(n,Ye,Mt);let I=document.getElementById("workspace-picker");I&&Od(I,Ye,Tt,ur,rr);let g=sd(e,(y,u)=>Pe(y,u));try{let y=document.getElementById("new-issue-btn");y&&y.addEventListener("click",()=>g.open())}catch{}let O=ld(e,{policyStore:Le,queueStore:xe,implPresetStore:_e,transport:(y,u)=>Pe(y,u),onOpenChange:y=>{A=y,M()},labelOptions:()=>{let y=new Set;for(let[u]of Ra)for(let C of Ee.snapshotFor(u)||[]){let x=C.labels;if(Array.isArray(x))for(let V of x)typeof V=="string"&&V.length>0&&y.add(V)}return Array.from(y).sort()}});try{let y=document.getElementById("display-settings-btn");y&&(y.setAttribute("aria-label","\uC124\uC815"),y.setAttribute("title","\uC124\uC815"),y.addEventListener("click",()=>O.open()))}catch{}let ee=Xi(o,{gotoIssue:y=>Mt.gotoIssue(y),issueStores:Ee,transport:$,workerQueueStore:xe,uiOrderStore:Fe,displayPolicyStore:Le,closedRange:G,onClosedRangeChange:y=>{Se(y)},onNewIssue:()=>g.open()}),de=Ea(a,{transport:$,issueStores:Ee,queueStore:xe,analysisStore:qe,sessionLogStore:ye,uiOrderStore:Fe,gotoIssue:y=>Ye.setState({selected_id:y}),getWorkspacePath:()=>Ye.getState().workspace.current?.path,doneRange:Y,onDoneRangeChange:y=>{De(y)}}),Me=Jc(i,{transport:$,pipelineStore:he,execPresetStore:_e,gotoIssue:y=>Mt.gotoIssue(y),getWorkspacePath:()=>Ye.getState().workspace.current?.path,switchWorkspace:y=>Tt(y)}),Re=mc(l,{issueStores:Ee,transport:$,queueStore:xe,execPresetStore:_e,sessionLogStore:ye,getWorkspacePath:()=>Ye.getState().workspace.current?.path,onNavigate:y=>{Ye.getState().view==="worker"?Ye.setState({selected_id:y}):Mt.gotoIssue(y)},onClose:()=>{let y=Ye.getState();Ye.setState({selected_id:null});try{Mt.gotoView(y.view==="worker"||y.view==="monitor"?y.view:"board")}catch{}},onOpenExecPresets:()=>{O.open("session")}}),lt=Ye.getState().selected_id;lt&&(l.hidden=!1,Re.load(lt),Te(lt)),Ye.subscribe(y=>{let u=y.selected_id;u?(l.hidden=!1,Re.load(u),Je||Te(u)):(Re.clear(),l.hidden=!0,z())});let dt=y=>{o.hidden=y.view!=="board",a.hidden=y.view!=="worker",i.hidden=y.view!=="monitor",me(y.view==="board"),B(y.view==="worker"),q(y.view==="monitor"),w(y.view==="board"||y.view==="worker"||A||!!y.selected_id),!y.selected_id&&y.view==="board"&&ee.load(),y.view==="worker"&&de.load(),y.view==="monitor"?Me.load():Me.pause(),window.localStorage.setItem("beads-ui.view",y.view)};Ye.subscribe(dt),dt(Ye.getState()),le(),gt(),jt(),nr().finally(()=>{$e=!0,je()}),window.addEventListener("keydown",y=>{let u=y.ctrlKey||y.metaKey,C=String(y.key||"").toLowerCase(),x=y.target,V=x&&x.tagName?String(x.tagName).toLowerCase():"",we=V==="input"||V==="textarea"||V==="select"||x&&typeof x.isContentEditable=="boolean"&&x.isContentEditable;u&&C==="n"&&(we||(y.preventDefault(),g.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&cg(t)});export{cg as bootstrap,ag as readBootstrapConfig,ig as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
