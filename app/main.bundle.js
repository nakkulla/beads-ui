var cu=Object.create;var po=Object.defineProperty;var du=Object.getOwnPropertyDescriptor;var uu=Object.getOwnPropertyNames;var pu=Object.getPrototypeOf,fu=Object.prototype.hasOwnProperty;var _u=(e,t,r)=>t in e?po(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var fo=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var mu=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of uu(t))!fu.call(e,s)&&s!==r&&po(e,s,{get:()=>t[s],enumerable:!(n=du(t,s))||n.enumerable});return e};var gu=(e,t,r)=>(r=e!=null?cu(pu(e)):{},mu(t||!e||!e.__esModule?po(r,"default",{value:e,enumerable:!0}):r,e));var dt=(e,t,r)=>_u(e,typeof t!="symbol"?t+"":t,r);var wi=fo((vg,vi)=>{var Yr=1e3,Zr=Yr*60,Xr=Zr*60,qr=Xr*24,yu=qr*7,vu=qr*365.25;vi.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return wu(e);if(r==="number"&&isFinite(e))return t.long?$u(e):ku(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function wu(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*vu;case"weeks":case"week":case"w":return r*yu;case"days":case"day":case"d":return r*qr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Xr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Zr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Yr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function ku(e){var t=Math.abs(e);return t>=qr?Math.round(e/qr)+"d":t>=Xr?Math.round(e/Xr)+"h":t>=Zr?Math.round(e/Zr)+"m":t>=Yr?Math.round(e/Yr)+"s":e+"ms"}function $u(e){var t=Math.abs(e);return t>=qr?ss(e,t,qr,"day"):t>=Xr?ss(e,t,Xr,"hour"):t>=Zr?ss(e,t,Zr,"minute"):t>=Yr?ss(e,t,Yr,"second"):e+" ms"}function ss(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var $i=fo((wg,ki)=>{function xu(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=i,r.humanize=wi(),r.destroy=d,Object.keys(e).forEach(u=>{r[u]=e[u]}),r.names=[],r.skips=[],r.formatters={};function t(u){let p=0;for(let b=0;b<u.length;b++)p=(p<<5)-p+u.charCodeAt(b),p|=0;return r.colors[Math.abs(p)%r.colors.length]}r.selectColor=t;function r(u){let p,b=null,R,T;function P(...B){if(!P.enabled)return;let ee=P,Z=Number(new Date),z=Z-(p||Z);ee.diff=z,ee.prev=p,ee.curr=Z,p=Z,B[0]=r.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let L=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(q,k)=>{if(q==="%%")return"%";L++;let W=r.formatters[k];if(typeof W=="function"){let oe=B[L];q=W.call(ee,oe),B.splice(L,1),L--}return q}),r.formatArgs.call(ee,B),(ee.log||r.log).apply(ee,B)}return P.namespace=u,P.useColors=r.useColors(),P.color=r.selectColor(u),P.extend=n,P.destroy=r.destroy,Object.defineProperty(P,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(R!==r.namespaces&&(R=r.namespaces,T=r.enabled(u)),T),set:B=>{b=B}}),typeof r.init=="function"&&r.init(P),P}function n(u,p){let b=r(this.namespace+(typeof p>"u"?":":p)+u);return b.log=this.log,b}function s(u){r.save(u),r.namespaces=u,r.names=[],r.skips=[];let p=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of p)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(u,p){let b=0,R=0,T=-1,P=0;for(;b<u.length;)if(R<p.length&&(p[R]===u[b]||p[R]==="*"))p[R]==="*"?(T=R,P=b,R++):(b++,R++);else if(T!==-1)R=T+1,P++,b=P;else return!1;for(;R<p.length&&p[R]==="*";)R++;return R===p.length}function a(){let u=[...r.names,...r.skips.map(p=>"-"+p)].join(",");return r.enable(""),u}function i(u){for(let p of r.skips)if(o(u,p))return!1;for(let p of r.names)if(o(u,p))return!0;return!1}function l(u){return u instanceof Error?u.stack||u.message:u}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}ki.exports=xu});var xi=fo((Dt,os)=>{Dt.formatArgs=Su;Dt.save=Eu;Dt.load=Tu;Dt.useColors=Au;Dt.storage=Cu();Dt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Dt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Au(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Su(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+os.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Dt.log=console.debug||console.log||(()=>{});function Eu(e){try{e?Dt.storage.setItem("debug",e):Dt.storage.removeItem("debug")}catch{}}function Tu(){let e;try{e=Dt.storage.getItem("debug")||Dt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Cu(){try{return localStorage}catch{}}os.exports=$i()(Dt);var{formatters:Ru}=os.exports;Ru.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var pn=globalThis,Qn=pn.trustedTypes,oi=Qn?Qn.createPolicy("lit-html",{createHTML:e=>e}):void 0,mo="$lit$",_r=`lit$${Math.random().toFixed(9).slice(2)}$`,go="?"+_r,bu=`<${go}>`,Mr=document,fn=()=>Mr.createComment(""),_n=e=>e===null||typeof e!="object"&&typeof e!="function",bo=Array.isArray,ui=e=>bo(e)||typeof e?.[Symbol.iterator]=="function",_o=`[ 	
\f\r]`,un=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ai=/-->/g,ii=/>/g,Lr=RegExp(`>|${_o}(?:([^\\s"'>=/]+)(${_o}*=${_o}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),li=/'/g,ci=/"/g,pi=/^(?:script|style|textarea|title)$/i,ho=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=ho(1),$r=ho(2),fg=ho(3),Wt=Symbol.for("lit-noChange"),mt=Symbol.for("lit-nothing"),di=new WeakMap,Or=Mr.createTreeWalker(Mr,129);function fi(e,t){if(!bo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return oi!==void 0?oi.createHTML(t):t}var _i=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=un;for(let i=0;i<r;i++){let l=e[i],d,u,p=-1,b=0;for(;b<l.length&&(a.lastIndex=b,u=a.exec(l),u!==null);)b=a.lastIndex,a===un?u[1]==="!--"?a=ai:u[1]!==void 0?a=ii:u[2]!==void 0?(pi.test(u[2])&&(s=RegExp("</"+u[2],"g")),a=Lr):u[3]!==void 0&&(a=Lr):a===Lr?u[0]===">"?(a=s??un,p=-1):u[1]===void 0?p=-2:(p=a.lastIndex-u[2].length,d=u[1],a=u[3]===void 0?Lr:u[3]==='"'?ci:li):a===ci||a===li?a=Lr:a===ai||a===ii?a=un:(a=Lr,s=void 0);let R=a===Lr&&e[i+1].startsWith("/>")?" ":"";o+=a===un?l+bu:p>=0?(n.push(d),l.slice(0,p)+mo+l.slice(p)+_r+R):l+_r+(p===-2?i:R)}return[fi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},mn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[d,u]=_i(t,r);if(this.el=e.createElement(d,n),Or.currentNode=this.el.content,r===2||r===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=Or.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(mo)){let b=u[a++],R=s.getAttribute(p).split(_r),T=/([.?@])?(.*)/.exec(b);l.push({type:1,index:o,name:T[2],strings:R,ctor:T[1]==="."?es:T[1]==="?"?ts:T[1]==="@"?rs:Dr}),s.removeAttribute(p)}else p.startsWith(_r)&&(l.push({type:6,index:o}),s.removeAttribute(p));if(pi.test(s.tagName)){let p=s.textContent.split(_r),b=p.length-1;if(b>0){s.textContent=Qn?Qn.emptyScript:"";for(let R=0;R<b;R++)s.append(p[R],fn()),Or.nextNode(),l.push({type:2,index:++o});s.append(p[b],fn())}}}else if(s.nodeType===8)if(s.data===go)l.push({type:2,index:o});else{let p=-1;for(;(p=s.data.indexOf(_r,p+1))!==-1;)l.push({type:7,index:o}),p+=_r.length-1}o++}}static createElement(t,r){let n=Mr.createElement("template");return n.innerHTML=t,n}};function Pr(e,t,r=e,n){if(t===Wt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=_n(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Pr(e,s._$AS(e,t.values),s,n)),t}var Jn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Mr).importNode(r,!0);Or.currentNode=s;let o=Or.nextNode(),a=0,i=0,l=n[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new Kr(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new ns(o,this,t)),this._$AV.push(d),l=n[++i]}a!==l?.index&&(o=Or.nextNode(),a++)}return Or.currentNode=Mr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Kr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=mt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Pr(this,t,r),_n(t)?t===mt||t==null||t===""?(this._$AH!==mt&&this._$AR(),this._$AH=mt):t!==this._$AH&&t!==Wt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ui(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==mt&&_n(this._$AH)?this._$AA.nextSibling.data=t:this.T(Mr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=mn.createElement(fi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Jn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=di.get(t.strings);return r===void 0&&di.set(t.strings,r=new mn(t)),r}k(t){bo(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(fn()),this.O(fn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Dr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=mt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=mt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Pr(this,t,r,0),a=!_n(t)||t!==this._$AH&&t!==Wt,a&&(this._$AH=t);else{let i=t,l,d;for(t=o[0],l=0;l<o.length-1;l++)d=Pr(this,i[n+l],r,l),d===Wt&&(d=this._$AH[l]),a||(a=!_n(d)||d!==this._$AH[l]),d===mt?t=mt:t!==mt&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}a&&!s&&this.j(t)}j(t){t===mt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},es=class extends Dr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===mt?void 0:t}},ts=class extends Dr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==mt)}},rs=class extends Dr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Pr(this,t,r,0)??mt)===Wt)return;let n=this._$AH,s=t===mt&&n!==mt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==mt&&(n===mt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ns=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Pr(this,t)}},mi={M:mo,P:_r,A:go,C:1,L:_i,R:Jn,D:ui,V:Pr,I:Kr,H:Dr,N:ts,U:rs,B:es,F:ns},hu=pn.litHtmlPolyfillSupport;hu?.(mn,Kr),(pn.litHtmlVersions??(pn.litHtmlVersions=[])).push("3.3.1");var Ze=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Kr(t.insertBefore(fn(),o),o,void 0,r??{})}return s._$AI(e),s};var Ft="today",or=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function zt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Nr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function gi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function bi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function hi(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function yi(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Ai=gu(xi(),1);function _t(e){return(0,Ai.default)(`beads-ui:${e}`)}function Zt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Fr(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ti(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ci(e,t){let r=Zt(e.updated_at),n=Zt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ri(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Zt(e.created_at),o=Zt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ii(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Iu=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Si(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ei(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Iu.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Li(e,t){let r=Si(e),n=Si(t);if(r!==n)return r<n?-1:1;let s=Ei(e),o=Ei(t);if(s!==o)return s<o?-1:1;let a=Zt(e&&e.created_at),i=Zt(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,d=t&&t.id;return l===d?0:String(l)<String(d)?-1:1}var yo=2**20;function Qr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Zt(e&&e.created_at)}function as(e){return(t,r)=>{let n=Qr(t,e),s=Qr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function vo(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Qr(i,r)-yo};if(!i)return{rank:Qr(a,r)+yo};let l=Qr(a,r),d=Qr(i,r),u=(l+d)/2;return l<u&&u<d?{rank:u}:{renormalize:n.map((p,b)=>({bead_id:p.id,rank:b*yo}))}}function wo(e,t={}){let r=_t(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||Fr;function d(){for(let b of Array.from(a))try{b()}catch{}}function u(){s=Array.from(n.values()).sort(l)}function p(b){if(i||!b||b.id!==e)return;let R=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,R),!(R<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(R<=o)return;n.clear();let T=Array.isArray(b.issues)?b.issues:[];for(let P of T)P&&typeof P.id=="string"&&P.id.length>0&&n.set(P.id,P);u(),o=R,d();return}if(b.type==="upsert"){let T=b.issue;if(T&&typeof T.id=="string"&&T.id.length>0){let P=n.get(T.id);if(!P)n.set(T.id,T);else{let B=Number.isFinite(P.updated_at)?P.updated_at:0,ee=Number.isFinite(T.updated_at)?T.updated_at:0;if(B<=ee){for(let Z of Object.keys(P))Z in T||delete P[Z];for(let[Z,z]of Object.entries(T))P[Z]=z}}u()}o=R,d()}else if(b.type==="delete"){let T=String(b.issue_id||"");T&&(n.delete(T),u()),o=R,d()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:p,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function is(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Oi(e){let t=_t("subs"),r=new Map,n=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let d=n.get(i);if(!d||d.size===0)return;let u=Array.isArray(l.added)?l.added:[],p=Array.isArray(l.updated)?l.updated:[],b=Array.isArray(l.removed)?l.removed:[];for(let R of Array.from(d)){let T=r.get(R);if(!T)continue;let P=T.itemsById;for(let B of u)typeof B=="string"&&B.length>0&&P.set(B,!0);for(let B of p)typeof B=="string"&&B.length>0&&P.set(B,!0);for(let B of b)typeof B=="string"&&B.length>0&&P.delete(B)}}async function o(i,l){let d=is(l);if(t("subscribe %s key=%s",i,d),!r.has(i))r.set(i,{key:d,itemsById:new Map});else{let p=r.get(i);if(p&&p.key!==d){let b=n.get(p.key);b&&(b.delete(i),b.size===0&&n.delete(p.key)),r.set(i,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let u=n.get(d);u&&u.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(p){let b=r.get(i)||null;if(b){let R=n.get(b.key);R&&(R.delete(i),R.size===0&&n.delete(b.key))}throw r.delete(i),p}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let p=r.get(i)||null;if(p){let b=n.get(p.key);b&&(b.delete(i),b.size===0&&n.delete(p.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:is,selectors:{getIds(i){let l=r.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let d=r.get(i);return d?d.itemsById.has(l):!1},count(i){let l=r.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=r.get(i),d={};if(!l)return d;for(let u of l.itemsById.keys())d[u]=!0;return d}}}}function Mi(){let e=_t("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,d,u){let p=d?is(d):"",b=r.get(l)||"",R=t.has(l);if(e("register %s key=%s (prev=%s)",l,p,b),R&&b&&p&&b!==p){let T=t.get(l);if(T)try{T.dispose()}catch{}let P=s.get(l);if(P){try{P()}catch{}s.delete(l)}let B=wo(l,u);t.set(l,B);let ee=B.subscribe(()=>o());s.set(l,ee)}else if(!R){let T=wo(l,u);t.set(l,T);let P=T.subscribe(()=>o());s.set(l,P)}return r.set(l,p),()=>i(l)}function i(l){e("unregister %s",l),r.delete(l);let d=t.get(l);d&&(d.dispose(),t.delete(l));let u=s.get(l);if(u){try{u()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let d=t.get(l);return d?d.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function Pi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Di(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ni(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ko(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Lu(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Ou(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function qi(e){let t=_t("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Lu(n),a=Ou(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=ko(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?ko(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Mu=Object.freeze({workspace_config:{default_workspace:null}});function Fi(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Mu.workspace_config.default_workspace}}}function ji(e={}){let t=_t("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Fi(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Fi(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,u)=>d!==r.workspace.hidden[u]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,u)=>d===r.worker.show_closed_children[u])&&!i&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Bi(e){let t=_t("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function l(d){return async(p,b)=>{let R=s++,T=Date.now();n.set(R,{type:p,start_ts:T}),t("request start id=%d type=%s count=%d",R,p,r+1),a();let P=!1,B=()=>{P||(P=!0,n.delete(R),i())},ee=setTimeout(()=>{P||(t("request TIMEOUT id=%d type=%s elapsed=%dms",R,p,Date.now()-T),B())},3e4);try{let Z=await d(p,b),z=Date.now()-T;return t("request done id=%d type=%s elapsed=%dms",R,p,z),Z}catch(Z){let z=Date.now()-T;throw t("request error id=%d type=%s elapsed=%dms err=%o",R,p,z,Z),Z}finally{clearTimeout(ee),B()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([u,p])=>({id:u,type:p.type,elapsed_ms:d-p.start_ts}))}}}function ae(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function ls(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Ii),l;switch(i){case"created_desc":return l.sort(Fr),l;case"created_asc":return l.sort(Ti),l;case"updated_desc":return l.sort(Ci),l;case"priority":return l.sort(Ri),l;case"manual":default:{let d=r();return d?l.sort(as(d)):l.sort(Fr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function jr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function kt(e){let t=jr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function jt(e,t){let r=jr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function cs(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=jr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function ds(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let d of i)l[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},u=n(vo(i,l,d.order),a);s(d,u);let p=await t("ui-order-set",{expected_revision:d.revision,entries:u});if(p&&p.conflict){let b={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};r.set(b);let R=n(vo(i,l,b.order),a);s(b,R);let T=await t("ui-order-set",{expected_revision:b.revision,entries:R});T&&T.applied&&r.set({revision:typeof T.revision=="number"?T.revision:0,order:T.order||{}})}else p&&p.applied&&r.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:o}}function us(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function $o(e,t){return!t||typeof e!="string"||e.length===0||us(t.visible_labels).includes(e)?!0:us(t.hidden_labels).includes(e)?!1:!us(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function ps(e,t){return us(e).filter(r=>$o(r,t))}function xr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Pu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Wi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ui={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Du={review:"\u2713",skip:"\u2298"},Ar={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Nu(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function zi(e){let t=e&&e.fill||"none";return t==="none"?Ar.none:e&&e.stale===!0?Ar.stale:t==="dim"?Ar.dim:e&&e.glyph==="review"?Ar.review:e&&e.glyph==="skip"?Ar.skip:Ar.done}function qu(e){if(!e||e.fill==="none"||!e.approval_state)return zi(e);let t=[];return e.glyph==="review"?t.push(Ar.review):e.glyph==="skip"&&t.push(Ar.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Fu(e,t,r){let n=Pu[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Du[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${i} style=${d}>${a}</div>
      <div class=${l}>
        ${Wi[e]||e}
      </div>
    </div>
  `}function fs(e,t){if(!e||!e.stages)return"";let r=Ui[e.route]||Ui.spec_backed,n=e.stages,s=Nu(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Wi[a]||a} ${a==="plan"?qu(n[a]||{}):zi(n[a]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Fu(a,n[a]||{},a===s))}
    </div>
  `}function ju(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Hi=2;function Bu(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Hi).join(", "),s=r.length-Hi,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function xo(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function _s(e,t){if(!e)return null;let r=xo(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=xo(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${t.kind}:${t.actor}@${t.sha}`:"";return{kind:e.kind,label:i,title:`${l}${d}`}}function Gi(e,t){let r=_s(e,t);return r?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function Uu(e){if(!e)return null;let t=xo(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${e.kind}:${e.actor}@${e.sha}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Wu(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&xr(r,"route")){let i=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&xr(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&xr(r,"pr")){let i=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Gi(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let i=n.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${i.kind}:${i.actor}@${i.sha}`}
        >${`exec ${i.kind==="delegated"?i.actor:`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let i=n.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of ps(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&xr(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),xr(r,"blocked")&&s.push(...Bu(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&xr(r,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function zu(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Hu(e){let t=jt(e.created_at),r=jt(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${kt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${kt(e.updated_at)}`}
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
                  ${_s(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?c`<span class="board-card__roll-child-chips">
                        ${Gi(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${Uu(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function ms(e,t){let r=ju(e.priority);return c`
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
      ${e.workflow&&xr(t.policy||null,"stepper")?fs(e.workflow,e.status):""}
      ${Gu(e,t)}
    </article>
  `}function Jr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
        ${e.items.map(o=>ms(o,t))}
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>ms(n,t))}
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
  `}var Xu=200,Qu={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Ju=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Yi="beads-ui.board.sort",Zi=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ep(){try{let e=window.localStorage.getItem(Yi);if(e&&Zi.has(e))return e}catch{}return"created_desc"}function Xi(e,t){let r=_t("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,d=t.onClosedRangeChange,u=t.onNewIssue,p=t.closedRange||Ft,b=s?ls(s,a):null,R=ds({transport:o,uiOrderStore:a}),T=[],P=[],B=[],ee=[],Z=[],z=[],L=!1,S=0,q=ep(),k=new Map,W=new Map,oe=new Map,ue=new Set,Q={search:"",priority:"",type:"",labels:[]},se=!1,Le=null;function ze(U){return String(U.status||"open")==="open"}function Xe(U){let X=String(U.status||"open");return X==="open"||X==="blocked"}function at(U){let X=Q.search.trim().toLowerCase(),v=Q.priority,C=Q.type,N=Q.labels;return U.filter(F=>{if(X){let me=String(F.id||"").toLowerCase(),$e=String(F.title||"").toLowerCase();if(!me.includes(X)&&!$e.includes(X))return!1}if(v!==""&&String(F.priority)!==v||C!==""&&String(F.issue_type||"")!==C)return!1;if(N.length>0){let me=Array.isArray(F.labels)?F.labels:[];if(!N.some($e=>me.includes($e)))return!1}return!0})}function rt(){let U=new Set;for(let X of[T,P,B,ee,Z,z])for(let v of X){let C=Array.isArray(v.labels)?v.labels:[];for(let N of C)typeof N=="string"&&N.length>0&&U.add(N)}return Array.from(U).sort()}function nt(){return Q.search.trim()!==""||Q.priority!==""||Q.type!==""||Q.labels.length>0}function _e(){try{if(b){let U=b.selectBoardColumn("tab:board:in-progress","in_progress",q),X=b.selectBoardColumn("tab:board:blocked","blocked",q).filter(Xe),v=new Set(U.map(Se=>Se.id)),C=b.selectBoardColumn("tab:board:ready","ready",q).filter(Se=>ze(Se)&&!v.has(Se.id)),N=b.selectBoardColumn("tab:board:resolved","resolved",q),F=b.selectBoardColumn("tab:board:deferred","deferred",q),me=b.selectBoardColumn("tab:board:closed","closed").slice(0,Xu),$e=[...X,...C,...U,...N,...me];qe($e);let ce=new Set;for(let Se of $e)Se&&Se.id&&!Ao(Se)&&ce.add(Se.id);let ot=!nt();T=ot?gn(X,ce):X,P=ot?gn(C,ce):C,B=ot?gn(U,ce):U,ee=ot?gn(N,ce):N,Z=F,S=F.length,z=ot?gn(me,ce):me,k=new Map;for(let Se of T)k.set(Se.id,"open");for(let Se of P)k.set(Se.id,"open");for(let Se of B)k.set(Se.id,"in_progress");for(let Se of ee)k.set(Se.id,"resolved");for(let Se of Z)k.set(Se.id,"deferred");for(let Se of z)k.set(Se.id,"closed");W=new Map;for(let Se of T)W.set(Se.id,"blocked-col");for(let Se of P)W.set(Se.id,"ready-col");for(let Se of B)W.set(Se.id,"in-progress-col");for(let Se of ee)W.set(Se.id,"resolved-col");for(let Se of z)W.set(Se.id,"closed-col")}D()}catch{T=[],P=[],B=[],ee=[],Z=[],z=[],oe=new Map,D()}}function qe(U){let X=new Map;for(let C of U)C&&C.id&&!X.has(C.id)&&X.set(C.id,C);let v=new Map;for(let C of X.values()){let N=Ao(C);if(!N)continue;let F=v.get(N);F||(F=[],v.set(N,F)),F.push({id:C.id,title:C.title,status:C.status,metadata:C.metadata,workflow:C.workflow,created_at:C.created_at,updated_at:C.updated_at})}oe=v}function fe(U){let X=oe.get(U)||[],v=0;for(let N of X)(N.status==="resolved"||N.status==="closed")&&(v+=1);let C=cs(X);return{total:X.length,count:v,current:C,children:X}}function xe(U){return!ue.has(U)}function Ee(U,X){U.preventDefault(),U.stopPropagation(),ue.has(X)?ue.delete(X):ue.add(X),D()}function Fe(U,X){U.preventDefault(),U.stopPropagation(),n(X)}function ve(U,X){U.preventDefault(),U.stopPropagation(),n(X)}function je(U,X){Le||n(X)}function Oe(U,X){U.preventDefault(),U.stopPropagation(),tp(X).then(v=>{v&&ae("\uBCF5\uC0AC\uB428","success",1200)})}function ge(U,X){Le=X,U.dataTransfer&&(U.dataTransfer.setData("text/plain",X),U.dataTransfer.effectAllowed="move"),U.target.classList.add("board-card--dragging")}function he(U){U.target.classList.remove("board-card--dragging"),be(),setTimeout(()=>{Le=null},0)}function G(U){let X=String(U.target.value||"");!X||X===p||(p=X,d&&d(X),D())}function V(){return i?i.get():null}function ye(U){let X=l?l.get():null,v=X?X.cleanup_failed:null;if(!v||typeof v!="object"||Array.isArray(v))return null;let C=v[U];return!C||typeof C!="object"||Array.isArray(C)?null:C}let Te={onCardClick:je,onCopyId:Oe,onDragStart:ge,onDragEnd:he,onClosedRangeChange:G,rollupFor:fe,isExpanded:xe,onRollupToggle:Ee,onChildClick:Fe,onFromChipClick:ve,cleanupFailureFor:ye,get policy(){return V()}};function Ue(U,X){Le||(pe(),n(X))}function He(U,X){U.preventDefault(),U.stopPropagation(),pe(),n(X)}let Ae={...Te,onCardClick:Ue,onChildClick:He,onFromChipClick:He,get policy(){return V()}};function st(U){let X=U.target,v=e.querySelector(".board-filter__labels");X&&v&&v.contains(X)||re()}function Qe(U){U.key==="Escape"&&re()}function H(){se||(se=!0,document.addEventListener("mousedown",st),document.addEventListener("keydown",Qe),D())}function re(){se&&(se=!1,document.removeEventListener("mousedown",st),document.removeEventListener("keydown",Qe),D())}function Ce(U){U.key==="Escape"&&pe()}function We(){L||(L=!0,document.addEventListener("keydown",Ce),D())}function pe(){L&&(L=!1,document.removeEventListener("keydown",Ce),D())}let m={onClose:pe,onOverlayClick(U){U.target===U.currentTarget&&pe()}},$={onSearchInput(U){Q.search=String(U.target.value||""),_e()},onPriorityChange(U){Q.priority=String(U.target.value||""),_e()},onTypeChange(U){Q.type=String(U.target.value||""),_e()},onSortChange(U){let X=String(U.target.value||"");if(!(!Zi.has(X)||X===q)){q=X;try{window.localStorage.setItem(Yi,X)}catch{}_e()}},onDeferredToggle(){L?pe():We()},onLabelMenuToggle(){se?re():H()},onLabelToggle(U){let X=Q.labels.indexOf(U);X===-1?Q.labels.push(U):Q.labels.splice(X,1),_e()},onLabelClear(){Q.labels.length!==0&&(Q.labels=[],_e())},onNewIssue(){u&&u()}};function x(){return c`
      <div class="board-view">
        ${Ki(Q,$,{sort_mode:q,deferred_popup_open:L,deferred_count:S,label_options:rt(),label_menu_open:se})}
        <div class="board-root">
          ${Jr({title:"Blocked",id:"blocked-col",items:at(T)},Te)}
          ${Jr({title:"Ready",id:"ready-col",items:at(P)},Te)}
          ${Jr({title:"In progress",id:"in-progress-col",items:at(B)},Te)}
          ${Jr({title:"Resolved",id:"resolved-col",items:at(ee)},Te)}
          ${Jr({title:"Closed",id:"closed-col",items:at(z),is_closed:!0,closed_range:p},Te)}
        </div>
        ${L?Vi({items:at(Z),count:S},Ae,m):""}
      </div>
    `}function D(){Ze(x(),e),K()}function K(){try{let U=e.querySelector("#deferred-popup");U&&!U.open&&(typeof U.showModal=="function"?U.showModal():U.setAttribute("open",""));let X=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let v of X)Array.from(v.querySelectorAll(".board-card")).forEach((N,F)=>{N.tabIndex=F===0?0:-1})}catch{}}async function Y(U,X){if(!o){ae("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:U,status:X}),ae("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(v){r("update-status failed: %o",v),ae("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ne(U){switch(U){case"blocked-col":return T;case"ready-col":return P;case"in-progress-col":return B;case"resolved-col":return ee;default:return[]}}function le(U,X,v){if(!o||!a)return;let C=ne(U),N=C.find(ot=>ot.id===X);if(!N)return;let F=C.filter(ot=>ot.id!==X),me=v.closest?v.closest(".board-card"):null,$e=F.length;if(me){let ot=me.getAttribute("data-issue-id");if(ot===X)return;let Se=F.findIndex(gt=>gt.id===ot);Se>=0&&($e=Se)}let ce=F.slice();ce.splice($e,0,N),R.applyReorder(X,ce,$e)}function be(){for(let U of Array.from(e.querySelectorAll(".board-column--drag-over")))U.classList.remove("board-column--drag-over")}let we=null;e.addEventListener("dragover",U=>{U.preventDefault(),U.dataTransfer&&(U.dataTransfer.dropEffect="move");let v=U.target.closest(".board-column");v&&v!==we&&(we&&we.classList.remove("board-column--drag-over"),v.classList.add("board-column--drag-over"),we=v)}),e.addEventListener("dragleave",U=>{let X=U.relatedTarget;(!X||!e.contains(X))&&we&&(we.classList.remove("board-column--drag-over"),we=null)}),e.addEventListener("drop",U=>{U.preventDefault(),we&&(we.classList.remove("board-column--drag-over"),we=null);let X=U.target,v=X.closest(".board-column");if(!v)return;let C=U.dataTransfer?.getData("text/plain")||"";if(!C)return;let N=v.id,F=W.get(C);if(F&&F===N){if(Ju.has(N)){if(q!=="manual"){ae("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}le(N,C,X)}return}let me=Qu[N];if(!me){ae("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}k.get(C)!==me&&Y(C,me)}),e.addEventListener("keydown",U=>{let X=U.target;if(!(X instanceof HTMLElement))return;let v=String(X.tagName||"").toLowerCase();if(v==="input"||v==="textarea"||v==="select"||v==="button"||v==="a"||X.isContentEditable===!0)return;let C=X.closest(".board-card");if(!C)return;let N=String(U.key||"");if(N==="Enter"||N===" "){U.preventDefault();let ce=C.getAttribute("data-issue-id");ce&&n(ce);return}if(N!=="ArrowUp"&&N!=="ArrowDown"&&N!=="ArrowLeft"&&N!=="ArrowRight")return;U.preventDefault();let F=C.closest(".board-column");if(!F)return;let me=Array.from(F.querySelectorAll(".board-card")),$e=me.indexOf(C);if(N==="ArrowDown"&&$e<me.length-1){Me(C,me[$e+1]);return}if(N==="ArrowUp"&&$e>0){Me(C,me[$e-1]);return}if(N==="ArrowLeft"||N==="ArrowRight"){let ce=Array.from(e.querySelectorAll(".board-column")),ot=ce.indexOf(F),Se=N==="ArrowRight"?1:-1,gt=ot+Se;for(;gt>=0&&gt<ce.length;){let Ke=ce[gt].querySelector(".board-card");if(Ke){Me(C,Ke);return}gt+=Se}}});function Me(U,X){try{U.tabIndex=-1,X.tabIndex=0,X.focus()}catch{}}let Pe=null;b&&b.subscribe&&(Pe=b.subscribe(()=>{try{_e()}catch{}}));let ke=null;i&&i.subscribe&&(ke=i.subscribe(()=>{try{_e()}catch{}}));let Ve=null;return l&&l.subscribe&&(Ve=l.subscribe(()=>{D()})),{async load(){r("load"),_e()},clear(){re(),pe(),Pe&&(Pe(),Pe=null),ke&&(ke(),ke=null),Ve&&(Ve(),Ve=null),e.replaceChildren(),T=[],P=[],B=[],ee=[],Z=[],z=[],k=new Map,W=new Map}}}function Ao(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function gn(e,t){return e.filter(r=>{let n=Ao(r);return!(n&&t.has(n))})}async function tp(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Xt(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function ar(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Sr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function rp(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${ar(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ar(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(l=>{let d=u=>{typeof r.close=="function"&&r.close(),r.remove(),l(u)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",u=>{u.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function mr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await rp(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var np=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","orchestration_model","orchestration_effort","orchestration_speed"],Qi={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},sp=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Rt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function St(e){return typeof e=="string"&&e.length>0?e:null}function gs(e){return e.startsWith("gpt-")?e.slice(4):e}function yt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function rl(e,t,r){let n=St(t[e]);if(n!==null)return{value:n,source:"pin"};let s=St(r[e]);return s===null?null:{value:s,source:"global"}}function bn(e,t,r,n){return rl(e,t,r)||{value:n,source:"base"}}function Ji(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&Rt(s?.[t])){let a=St(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Rt(s)){for(let a of Object.values(s))if(Rt(a)){let i=St(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return St(n?.runners?.[o]?.models?.[e]?.id)||e}function op(e,t){return St(t?.review?.reviewers?.[e]?.model)||e}function hn(e,t,r=!1){if(e==="default")return yt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?gs(e):e;return yt(e,t,n,e,"explicit")}function ap(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];Rt(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(Rt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function el(e){return yt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function tl(e,t,r){let n=rl(e,t,r);return n?hn(n.value,n.source):yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function en(e){let t=Rt(e.pin)?e.pin:{},r=Rt(e.global)?e.global:{},n=Rt(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&Rt(n.session)?n.session:null,o=n?.supported===!0&&Rt(n.orchestration)?n.orchestration:null,a=Rt(e.runner_catalog)?e.runner_catalog:null,i={};if(s){let l=bn("workflow_mode",t,r,St(s.workflow_mode_default));i.workflow_mode=l.source==="base"?yt(l.value,"base",l.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",l.value,"default"):hn(l.value,l.source);for(let u of["spec_review","plan_review","impl_review"]){let p=`${u}_model`,b=St(u==="plan_review"?l.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),R=bn(p,t,r,b);if(R.value===null)i[p]=yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(R.value!=="self"&&R.value!=="skip"&&!Rt(s.review?.reviewers?.[R.value]))i[p]=el(yt(R.value,R.source,"",null,"explicit"));else{let T=op(R.value,s);i[p]=yt(R.value,R.source,gs(T),T,R.source==="base"?"default":"explicit")}}for(let[u,p]of Object.entries(Qi)){let b=i[p].value;if(b==="self"||b==="skip"){i[u]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let R=St(s.review?.reviewers?.[b||""]?.effort),T=bn(u,t,r,R);i[u]=T.value===null?yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):yt(T.value,T.source,T.value,T.value,T.source==="base"?"default":"explicit")}let d=Rt(s.implementation?.default)?s.implementation.default:{};for(let u of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let p=bn(u,t,r,St(d[u.replace("impl_","")]));i[u]=p.value===null?yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):yt(p.value,p.source,p.value,p.value,p.source==="base"?"default":"explicit")}if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let u of["impl_runtime","impl_model","impl_effort","impl_speed"])i[u]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_model.value!==null){let u=i.impl_runtime.value==="inherit"?St(e.controller_runtime):i.impl_runtime.value,p=u?ap(u,s,a):[];if(i.impl_model.value!=="auto"&&p.length>0&&!p.includes(i.impl_model.value))i.impl_model=el(i.impl_model);else{let b=Ji(i.impl_model.value,u,s,a);i.impl_model.display=gs(b),i.impl_model.full_value=b}}if(i.impl_effort.value==="auto"){let u=St(e.transport)||(i.impl_runtime.value==="codex"?"codex-native-spawn":i.impl_runtime.value==="claude"?"implement-claude":null),p=u?St(s.implementation?.effort_by_transport?.[u]?.auto):null;p&&!sp.has(p)?(i.impl_effort.display=`${p} (\uBE44\uD638\uD658)`,i.impl_effort.full_value=p,i.impl_effort.resolution="incompatible"):(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}i.impl_speed.value==="default"&&(i.impl_speed=i.impl_speed.source==="base"?yt("default","base","default (\uC77C\uBC18)","default","default"):hn("default",i.impl_speed.source))}}else for(let l of np.filter(d=>!d.startsWith("orchestration_")))i[l]=tl(l,t,r);if(!s){for(let[l,d]of Object.entries(Qi))(i[d].value==="self"||i[d].value==="skip")&&(i[l]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let l of["impl_runtime","impl_model","impl_effort","impl_speed"])i[l]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_effort.value==="auto"&&(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}for(let l of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){i[l]=tl(l,t,r);continue}let d=l.replace("orchestration_",""),u=St(o[d]),p=bn(l,t,r,u);if(l==="orchestration_effort"&&p.source==="base"){i[l]=yt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(p.value===null){i[l]=yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(l==="orchestration_model"){let b=p.source==="base"?St(o.model_id)||p.value:Ji(p.value,null,s,a);i[l]=yt(p.value,p.source,gs(b),b,p.source==="base"?"default":"explicit");continue}if(p.value==="default"){i[l]=p.source==="base"?yt("default","base","default (\uC77C\uBC18)","default","default"):hn("default",p.source);continue}i[l]=hn(p.value,p.source)}return i}function ip(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function bs(e){let t=Rt(e.pin)?e.pin:{},r=Rt(e.global)?e.global:{},n=u=>en({pin:e.layer==="pin"?u:t,global:e.layer==="pin"?r:u,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,controller_runtime:e.controller_runtime}),s=e.layer==="pin"?t:r,o={...s};delete o[e.key];let a=n(o)[e.key],i=n(s)[e.key],l=St(s[e.key]),d=[...e.choices];return l!==null&&!d.includes(l)&&d.unshift(l),{unset_label:ip(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:i?.resolution==="not_applicable",options:d.map(u=>{let p=n({...s,[e.key]:u})[e.key];return{value:u,label:p.display,full_value:p.full_value}})}}function tn(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(i=>{let l=!1,d=p=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(p))},u=()=>d(n.value.trim());o.addEventListener("click",u),a.addEventListener("click",()=>d(null)),n.addEventListener("keydown",p=>{p.key==="Enter"&&(p.ctrlKey||p.metaKey)&&(p.preventDefault(),u())}),t.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var il="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function $t(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var gr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],yn=[...gr,"reasoning_output_tokens"],lp=["implementation","review-consult"];function So(e){let t=0;for(let r of gr)t+=$t(e?.[r]);return t}function cp(e){return!e||typeof e!="object"?!1:gr.some(t=>Number.isFinite(e[t]))}function nl(e){return!e||typeof e!="object"?!1:yn.some(t=>Number.isFinite(e[t]))}function dp(e){let t={};for(let r of yn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function sl(e){let t={};for(let r of yn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ol(e,t){return e==="codex"?$t(t.input_tokens)+$t(t.output_tokens):So(t)}function up(e){return e==="claude"?"Claude":"Codex"}function pp(e){return`\u03C4 ${ll(e)}`}function fp(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${$t(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${$t(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${$t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${$t(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${$t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${$t(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${$t(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(il),o.join(`
`)}function xt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${up(r)} ${pp(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:fp(r,n)})}return t}function ys(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let l of yn)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=$t(i.breakdown[l])+$t(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Eo(e){return!e||typeof e!="object"?null:Ht({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function _p(e){return e==="codex"?"codex":"claude"}function Er(){return{subtotal:0,breakdown:dp(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function hs(e,t,r){e.subtotal+=t.subtotal;for(let n of yn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=$t(e.breakdown[n])+$t(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function al(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function ll(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function rn(e){return cp(e)?`\u03C4 ${ll(So(e))}`:null}function Qt(e){let t=rn(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function nn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${$t(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${$t(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${$t(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${$t(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${So(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(il),r.join(`
`)}function Ht(e,t){let r={claude:Er(),codex:Er()},n={orchestrator:{claude:Er(),codex:Er()},implementation:{claude:Er(),codex:Er()},"review-consult":{claude:Er(),codex:Er()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(nl(l)){let u=_p(i.runner),p=sl(l),b={provider:u,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:p,subtotal:ol(u,p)};p.replayed===!0&&(b.replayed=!0),typeof i.model=="string"&&(b.model=i.model),typeof i.session_id=="string"&&(b.session_id=i.session_id),hs(r[u],b,!0),hs(n.orchestrator[u],b,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let u of d){if(!u||u.provider!=="codex"||!lp.includes(u.role)||!nl(u.usage))continue;let p=typeof u.receipt_id=="string"&&u.receipt_id.length>0?u.receipt_id:null;if(!p||s.has(p))continue;s.add(p);let b=sl(u.usage),R={provider:"codex",role:u.role,attempt_id:String(i.attempt_id||""),usage:b,subtotal:ol("codex",b)};R.receipt_id=p,typeof u.model=="string"&&(R.model=u.model),typeof u.effort=="string"&&u.effort.trim().length>0&&(R.effort=u.effort),typeof u.session_id=="string"?R.session_id=u.session_id:typeof u.thread_id=="string"&&(R.session_id=u.thread_id),typeof u.turn_id=="string"&&(R.turn_id=u.turn_id),typeof u.completed_at=="string"&&(R.completed_at=u.completed_at),b.replayed===!0&&(R.replayed=!0),hs(r.codex,R,!1),hs(n[R.role].codex,R,!1)}}let o={};for(let i of["claude","codex"]){let l=r[i];if(l.legs.length===0)continue;let d=al(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(d.total_cost_usd=l.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let l={};for(let d of["claude","codex"]){let u=n[i][d];u.legs.length>0&&(l[d]={...al(u,!0),legs:u.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:bl,setPrototypeOf:cl,isFrozen:mp,getPrototypeOf:gp,getOwnPropertyDescriptor:bp}=Object,{freeze:Lt,seal:Gt,create:Mo}=Object,{apply:Po,construct:Do}=typeof Reflect<"u"&&Reflect;Lt||(Lt=function(t){return t});Gt||(Gt=function(t){return t});Po||(Po=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Do||(Do=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var vs=Ot(Array.prototype.forEach),hp=Ot(Array.prototype.lastIndexOf),dl=Ot(Array.prototype.pop),vn=Ot(Array.prototype.push),yp=Ot(Array.prototype.splice),ks=Ot(String.prototype.toLowerCase),To=Ot(String.prototype.toString),Co=Ot(String.prototype.match),wn=Ot(String.prototype.replace),vp=Ot(String.prototype.indexOf),wp=Ot(String.prototype.trim),Jt=Ot(Object.prototype.hasOwnProperty),It=Ot(RegExp.prototype.test),kn=kp(TypeError);function Ot(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Po(e,t,n)}}function kp(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Do(e,r)}}function et(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ks;cl&&cl(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(mp(t)||(t[n]=o),s=o)}e[s]=!0}return e}function $p(e){for(let t=0;t<e.length;t++)Jt(e,t)||(e[t]=null);return e}function br(e){let t=Mo(null);for(let[r,n]of bl(e))Jt(e,r)&&(Array.isArray(n)?t[r]=$p(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=br(n):t[r]=n);return t}function $n(e,t){for(;e!==null;){let n=bp(e,t);if(n){if(n.get)return Ot(n.get);if(typeof n.value=="function")return Ot(n.value)}e=gp(e)}function r(){return null}return r}var ul=Lt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ro=Lt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Io=Lt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),xp=Lt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Lo=Lt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ap=Lt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),pl=Lt(["#text"]),fl=Lt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Oo=Lt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),_l=Lt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ws=Lt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Sp=Gt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ep=Gt(/<%[\w\W]*|[\w\W]*%>/gm),Tp=Gt(/\$\{[\w\W]*/gm),Cp=Gt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Rp=Gt(/^aria-[\-\w]+$/),hl=Gt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ip=Gt(/^(?:\w+script|data):/i),Lp=Gt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),yl=Gt(/^html$/i),Op=Gt(/^[a-z][.\w]*(-[.\w]+)+$/i),ml=Object.freeze({__proto__:null,ARIA_ATTR:Rp,ATTR_WHITESPACE:Lp,CUSTOM_ELEMENT:Op,DATA_ATTR:Cp,DOCTYPE_NAME:yl,ERB_EXPR:Ep,IS_ALLOWED_URI:hl,IS_SCRIPT_OR_DATA:Ip,MUSTACHE_EXPR:Sp,TMPLIT_EXPR:Tp}),xn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Mp=function(){return typeof window>"u"?null:window},Pp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},gl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function vl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Mp(),t=I=>vl(I);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==xn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:d,NamedNodeMap:u=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:b,trustedTypes:R}=e,T=l.prototype,P=$n(T,"cloneNode"),B=$n(T,"remove"),ee=$n(T,"nextSibling"),Z=$n(T,"childNodes"),z=$n(T,"parentNode");if(typeof a=="function"){let I=r.createElement("template");I.content&&I.content.ownerDocument&&(r=I.content.ownerDocument)}let L,S="",{implementation:q,createNodeIterator:k,createDocumentFragment:W,getElementsByTagName:oe}=r,{importNode:ue}=n,Q=gl();t.isSupported=typeof bl=="function"&&typeof z=="function"&&q&&q.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:se,ERB_EXPR:Le,TMPLIT_EXPR:ze,DATA_ATTR:Xe,ARIA_ATTR:at,IS_SCRIPT_OR_DATA:rt,ATTR_WHITESPACE:nt,CUSTOM_ELEMENT:_e}=ml,{IS_ALLOWED_URI:qe}=ml,fe=null,xe=et({},[...ul,...Ro,...Io,...Lo,...pl]),Ee=null,Fe=et({},[...fl,...Oo,..._l,...ws]),ve=Object.seal(Mo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),je=null,Oe=null,ge=Object.seal(Mo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),he=!0,G=!0,V=!1,ye=!0,Te=!1,Ue=!0,He=!1,Ae=!1,st=!1,Qe=!1,H=!1,re=!1,Ce=!0,We=!1,pe="user-content-",m=!0,$=!1,x={},D=null,K=et({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Y=null,ne=et({},["audio","video","img","source","image","track"]),le=null,be=et({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),we="http://www.w3.org/1998/Math/MathML",Me="http://www.w3.org/2000/svg",Pe="http://www.w3.org/1999/xhtml",ke=Pe,Ve=!1,U=null,X=et({},[we,Me,Pe],To),v=et({},["mi","mo","mn","ms","mtext"]),C=et({},["annotation-xml"]),N=et({},["title","style","font","a","script"]),F=null,me=["application/xhtml+xml","text/html"],$e="text/html",ce=null,ot=null,Se=r.createElement("form"),gt=function(_){return _ instanceof RegExp||_ instanceof Function},Ke=function(){let _=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ot&&ot===_)){if((!_||typeof _!="object")&&(_={}),_=br(_),F=me.indexOf(_.PARSER_MEDIA_TYPE)===-1?$e:_.PARSER_MEDIA_TYPE,ce=F==="application/xhtml+xml"?To:ks,fe=Jt(_,"ALLOWED_TAGS")?et({},_.ALLOWED_TAGS,ce):xe,Ee=Jt(_,"ALLOWED_ATTR")?et({},_.ALLOWED_ATTR,ce):Fe,U=Jt(_,"ALLOWED_NAMESPACES")?et({},_.ALLOWED_NAMESPACES,To):X,le=Jt(_,"ADD_URI_SAFE_ATTR")?et(br(be),_.ADD_URI_SAFE_ATTR,ce):be,Y=Jt(_,"ADD_DATA_URI_TAGS")?et(br(ne),_.ADD_DATA_URI_TAGS,ce):ne,D=Jt(_,"FORBID_CONTENTS")?et({},_.FORBID_CONTENTS,ce):K,je=Jt(_,"FORBID_TAGS")?et({},_.FORBID_TAGS,ce):br({}),Oe=Jt(_,"FORBID_ATTR")?et({},_.FORBID_ATTR,ce):br({}),x=Jt(_,"USE_PROFILES")?_.USE_PROFILES:!1,he=_.ALLOW_ARIA_ATTR!==!1,G=_.ALLOW_DATA_ATTR!==!1,V=_.ALLOW_UNKNOWN_PROTOCOLS||!1,ye=_.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Te=_.SAFE_FOR_TEMPLATES||!1,Ue=_.SAFE_FOR_XML!==!1,He=_.WHOLE_DOCUMENT||!1,Qe=_.RETURN_DOM||!1,H=_.RETURN_DOM_FRAGMENT||!1,re=_.RETURN_TRUSTED_TYPE||!1,st=_.FORCE_BODY||!1,Ce=_.SANITIZE_DOM!==!1,We=_.SANITIZE_NAMED_PROPS||!1,m=_.KEEP_CONTENT!==!1,$=_.IN_PLACE||!1,qe=_.ALLOWED_URI_REGEXP||hl,ke=_.NAMESPACE||Pe,v=_.MATHML_TEXT_INTEGRATION_POINTS||v,C=_.HTML_INTEGRATION_POINTS||C,ve=_.CUSTOM_ELEMENT_HANDLING||{},_.CUSTOM_ELEMENT_HANDLING&&gt(_.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ve.tagNameCheck=_.CUSTOM_ELEMENT_HANDLING.tagNameCheck),_.CUSTOM_ELEMENT_HANDLING&&gt(_.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ve.attributeNameCheck=_.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),_.CUSTOM_ELEMENT_HANDLING&&typeof _.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ve.allowCustomizedBuiltInElements=_.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Te&&(G=!1),H&&(Qe=!0),x&&(fe=et({},pl),Ee=[],x.html===!0&&(et(fe,ul),et(Ee,fl)),x.svg===!0&&(et(fe,Ro),et(Ee,Oo),et(Ee,ws)),x.svgFilters===!0&&(et(fe,Io),et(Ee,Oo),et(Ee,ws)),x.mathMl===!0&&(et(fe,Lo),et(Ee,_l),et(Ee,ws))),_.ADD_TAGS&&(typeof _.ADD_TAGS=="function"?ge.tagCheck=_.ADD_TAGS:(fe===xe&&(fe=br(fe)),et(fe,_.ADD_TAGS,ce))),_.ADD_ATTR&&(typeof _.ADD_ATTR=="function"?ge.attributeCheck=_.ADD_ATTR:(Ee===Fe&&(Ee=br(Ee)),et(Ee,_.ADD_ATTR,ce))),_.ADD_URI_SAFE_ATTR&&et(le,_.ADD_URI_SAFE_ATTR,ce),_.FORBID_CONTENTS&&(D===K&&(D=br(D)),et(D,_.FORBID_CONTENTS,ce)),m&&(fe["#text"]=!0),He&&et(fe,["html","head","body"]),fe.table&&(et(fe,["tbody"]),delete je.tbody),_.TRUSTED_TYPES_POLICY){if(typeof _.TRUSTED_TYPES_POLICY.createHTML!="function")throw kn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof _.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw kn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');L=_.TRUSTED_TYPES_POLICY,S=L.createHTML("")}else L===void 0&&(L=Pp(R,s)),L!==null&&typeof S=="string"&&(S=L.createHTML(""));Lt&&Lt(_),ot=_}},Et=et({},[...Ro,...Io,...xp]),Ut=et({},[...Lo,...Ap]),dr=function(_){let M=z(_);(!M||!M.tagName)&&(M={namespaceURI:ke,tagName:"template"});let te=ks(_.tagName),de=ks(M.tagName);return U[_.namespaceURI]?_.namespaceURI===Me?M.namespaceURI===Pe?te==="svg":M.namespaceURI===we?te==="svg"&&(de==="annotation-xml"||v[de]):!!Et[te]:_.namespaceURI===we?M.namespaceURI===Pe?te==="math":M.namespaceURI===Me?te==="math"&&C[de]:!!Ut[te]:_.namespaceURI===Pe?M.namespaceURI===Me&&!C[de]||M.namespaceURI===we&&!v[de]?!1:!Ut[te]&&(N[te]||!Et[te]):!!(F==="application/xhtml+xml"&&U[_.namespaceURI]):!1},vt=function(_){vn(t.removed,{element:_});try{z(_).removeChild(_)}catch{B(_)}},Ct=function(_,M){try{vn(t.removed,{attribute:M.getAttributeNode(_),from:M})}catch{vn(t.removed,{attribute:null,from:M})}if(M.removeAttribute(_),_==="is")if(Qe||H)try{vt(M)}catch{}else try{M.setAttribute(_,"")}catch{}},ur=function(_){let M=null,te=null;if(st)_="<remove></remove>"+_;else{let Re=Co(_,/^[\r\n\t ]+/);te=Re&&Re[0]}F==="application/xhtml+xml"&&ke===Pe&&(_='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+_+"</body></html>");let de=L?L.createHTML(_):_;if(ke===Pe)try{M=new b().parseFromString(de,F)}catch{}if(!M||!M.documentElement){M=q.createDocument(ke,"template",null);try{M.documentElement.innerHTML=Ve?S:de}catch{}}let Ne=M.body||M.documentElement;return _&&te&&Ne.insertBefore(r.createTextNode(te),Ne.childNodes[0]||null),ke===Pe?oe.call(M,He?"html":"body")[0]:He?M.documentElement:Ne},pr=function(_){return k.call(_.ownerDocument||_,_,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},qt=function(_){return _ instanceof p&&(typeof _.nodeName!="string"||typeof _.textContent!="string"||typeof _.removeChild!="function"||!(_.attributes instanceof u)||typeof _.removeAttribute!="function"||typeof _.setAttribute!="function"||typeof _.namespaceURI!="string"||typeof _.insertBefore!="function"||typeof _.hasChildNodes!="function")},nr=function(_){return typeof i=="function"&&_ instanceof i};function wt(I,_,M){vs(I,te=>{te.call(t,_,M,ot)})}let fr=function(_){let M=null;if(wt(Q.beforeSanitizeElements,_,null),qt(_))return vt(_),!0;let te=ce(_.nodeName);if(wt(Q.uponSanitizeElement,_,{tagName:te,allowedTags:fe}),Ue&&_.hasChildNodes()&&!nr(_.firstElementChild)&&It(/<[/\w!]/g,_.innerHTML)&&It(/<[/\w!]/g,_.textContent)||_.nodeType===xn.progressingInstruction||Ue&&_.nodeType===xn.comment&&It(/<[/\w]/g,_.data))return vt(_),!0;if(!(ge.tagCheck instanceof Function&&ge.tagCheck(te))&&(!fe[te]||je[te])){if(!je[te]&&Pt(te)&&(ve.tagNameCheck instanceof RegExp&&It(ve.tagNameCheck,te)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(te)))return!1;if(m&&!D[te]){let de=z(_)||_.parentNode,Ne=Z(_)||_.childNodes;if(Ne&&de){let Re=Ne.length;for(let ct=Re-1;ct>=0;--ct){let ut=P(Ne[ct],!0);ut.__removalCount=(_.__removalCount||0)+1,de.insertBefore(ut,ee(_))}}}return vt(_),!0}return _ instanceof l&&!dr(_)||(te==="noscript"||te==="noembed"||te==="noframes")&&It(/<\/no(script|embed|frames)/i,_.innerHTML)?(vt(_),!0):(Te&&_.nodeType===xn.text&&(M=_.textContent,vs([se,Le,ze],de=>{M=wn(M,de," ")}),_.textContent!==M&&(vn(t.removed,{element:_.cloneNode()}),_.textContent=M)),wt(Q.afterSanitizeElements,_,null),!1)},Je=function(_,M,te){if(Ce&&(M==="id"||M==="name")&&(te in r||te in Se))return!1;if(!(G&&!Oe[M]&&It(Xe,M))){if(!(he&&It(at,M))){if(!(ge.attributeCheck instanceof Function&&ge.attributeCheck(M,_))){if(!Ee[M]||Oe[M]){if(!(Pt(_)&&(ve.tagNameCheck instanceof RegExp&&It(ve.tagNameCheck,_)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(_))&&(ve.attributeNameCheck instanceof RegExp&&It(ve.attributeNameCheck,M)||ve.attributeNameCheck instanceof Function&&ve.attributeNameCheck(M,_))||M==="is"&&ve.allowCustomizedBuiltInElements&&(ve.tagNameCheck instanceof RegExp&&It(ve.tagNameCheck,te)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(te))))return!1}else if(!le[M]){if(!It(qe,wn(te,nt,""))){if(!((M==="src"||M==="xlink:href"||M==="href")&&_!=="script"&&vp(te,"data:")===0&&Y[_])){if(!(V&&!It(rt,wn(te,nt,"")))){if(te)return!1}}}}}}}return!0},Pt=function(_){return _!=="annotation-xml"&&Co(_,_e)},f=function(_){wt(Q.beforeSanitizeAttributes,_,null);let{attributes:M}=_;if(!M||qt(_))return;let te={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ee,forceKeepAttr:void 0},de=M.length;for(;de--;){let Ne=M[de],{name:Re,namespaceURI:ct,value:ut}=Ne,w=ce(Re),y=ut,g=Re==="value"?y:wp(y);if(te.attrName=w,te.attrValue=g,te.keepAttr=!0,te.forceKeepAttr=void 0,wt(Q.uponSanitizeAttribute,_,te),g=te.attrValue,We&&(w==="id"||w==="name")&&(Ct(Re,_),g=pe+g),Ue&&It(/((--!?|])>)|<\/(style|title|textarea)/i,g)){Ct(Re,_);continue}if(w==="attributename"&&Co(g,"href")){Ct(Re,_);continue}if(te.forceKeepAttr)continue;if(!te.keepAttr){Ct(Re,_);continue}if(!ye&&It(/\/>/i,g)){Ct(Re,_);continue}Te&&vs([se,Le,ze],E=>{g=wn(g,E," ")});let O=ce(_.nodeName);if(!Je(O,w,g)){Ct(Re,_);continue}if(L&&typeof R=="object"&&typeof R.getAttributeType=="function"&&!ct)switch(R.getAttributeType(O,w)){case"TrustedHTML":{g=L.createHTML(g);break}case"TrustedScriptURL":{g=L.createScriptURL(g);break}}if(g!==y)try{ct?_.setAttributeNS(ct,Re,g):_.setAttribute(Re,g),qt(_)?vt(_):dl(t.removed)}catch{Ct(Re,_)}}wt(Q.afterSanitizeAttributes,_,null)},A=function I(_){let M=null,te=pr(_);for(wt(Q.beforeSanitizeShadowDOM,_,null);M=te.nextNode();)wt(Q.uponSanitizeShadowNode,M,null),fr(M),f(M),M.content instanceof o&&I(M.content);wt(Q.afterSanitizeShadowDOM,_,null)};return t.sanitize=function(I){let _=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},M=null,te=null,de=null,Ne=null;if(Ve=!I,Ve&&(I="<!-->"),typeof I!="string"&&!nr(I))if(typeof I.toString=="function"){if(I=I.toString(),typeof I!="string")throw kn("dirty is not a string, aborting")}else throw kn("toString is not a function");if(!t.isSupported)return I;if(Ae||Ke(_),t.removed=[],typeof I=="string"&&($=!1),$){if(I.nodeName){let ut=ce(I.nodeName);if(!fe[ut]||je[ut])throw kn("root node is forbidden and cannot be sanitized in-place")}}else if(I instanceof i)M=ur("<!---->"),te=M.ownerDocument.importNode(I,!0),te.nodeType===xn.element&&te.nodeName==="BODY"||te.nodeName==="HTML"?M=te:M.appendChild(te);else{if(!Qe&&!Te&&!He&&I.indexOf("<")===-1)return L&&re?L.createHTML(I):I;if(M=ur(I),!M)return Qe?null:re?S:""}M&&st&&vt(M.firstChild);let Re=pr($?I:M);for(;de=Re.nextNode();)fr(de),f(de),de.content instanceof o&&A(de.content);if($)return I;if(Qe){if(H)for(Ne=W.call(M.ownerDocument);M.firstChild;)Ne.appendChild(M.firstChild);else Ne=M;return(Ee.shadowroot||Ee.shadowrootmode)&&(Ne=ue.call(n,Ne,!0)),Ne}let ct=He?M.outerHTML:M.innerHTML;return He&&fe["!doctype"]&&M.ownerDocument&&M.ownerDocument.doctype&&M.ownerDocument.doctype.name&&It(yl,M.ownerDocument.doctype.name)&&(ct="<!DOCTYPE "+M.ownerDocument.doctype.name+`>
`+ct),Te&&vs([se,Le,ze],ut=>{ct=wn(ct,ut," ")}),L&&re?L.createHTML(ct):ct},t.setConfig=function(){let I=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ke(I),Ae=!0},t.clearConfig=function(){ot=null,Ae=!1},t.isValidAttribute=function(I,_,M){ot||Ke({});let te=ce(I),de=ce(_);return Je(te,de,M)},t.addHook=function(I,_){typeof _=="function"&&vn(Q[I],_)},t.removeHook=function(I,_){if(_!==void 0){let M=hp(Q[I],_);return M===-1?void 0:yp(Q[I],M,1)[0]}return dl(Q[I])},t.removeHooks=function(I){Q[I]=[]},t.removeAllHooks=function(){Q=gl()},t}var wl=vl();var hr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},$s=e=>(...t)=>({_$litDirective$:e,values:t}),sn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var An=class extends sn{constructor(t){if(super(t),this.it=mt,t.type!==hr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===mt||t==null)return this._t=void 0,this.it=t;if(t===Wt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};An.directiveName="unsafeHTML",An.resultType=1;var kl=$s(An);function jo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ur=jo();function Cl(e){Ur=e}var Cn={exec:()=>null};function it(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Mt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Dp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Mt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Np=/^(?:[ \t]*(?:\n|$))+/,qp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Fp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Rn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,jp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Bo=/(?:[*+-]|\d{1,9}[.)])/,Rl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Il=it(Rl).replace(/bull/g,Bo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Bp=it(Rl).replace(/bull/g,Bo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Uo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Up=/^[^\n]+/,Wo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Wp=it(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Wo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),zp=it(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Bo).getRegex(),Cs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",zo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Hp=it("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",zo).replace("tag",Cs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ll=it(Uo).replace("hr",Rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Cs).getRegex(),Gp=it(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ll).getRegex(),Ho={blockquote:Gp,code:qp,def:Wp,fences:Fp,heading:jp,hr:Rn,html:Hp,lheading:Il,list:zp,newline:Np,paragraph:Ll,table:Cn,text:Up},$l=it("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Cs).getRegex(),Vp={...Ho,lheading:Bp,table:$l,paragraph:it(Uo).replace("hr",Rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",$l).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Cs).getRegex()},Kp={...Ho,html:it(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",zo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Cn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:it(Uo).replace("hr",Rn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Il).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Yp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Zp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ol=/^( {2,}|\\)\n(?!\s*$)/,Xp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Rs=/[\p{P}\p{S}]/u,Go=/[\s\p{P}\p{S}]/u,Ml=/[^\s\p{P}\p{S}]/u,Qp=it(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Go).getRegex(),Pl=/(?!~)[\p{P}\p{S}]/u,Jp=/(?!~)[\s\p{P}\p{S}]/u,ef=/(?:[^\s\p{P}\p{S}]|~)/u,tf=it(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Dp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Dl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,rf=it(Dl,"u").replace(/punct/g,Rs).getRegex(),nf=it(Dl,"u").replace(/punct/g,Pl).getRegex(),Nl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",sf=it(Nl,"gu").replace(/notPunctSpace/g,Ml).replace(/punctSpace/g,Go).replace(/punct/g,Rs).getRegex(),of=it(Nl,"gu").replace(/notPunctSpace/g,ef).replace(/punctSpace/g,Jp).replace(/punct/g,Pl).getRegex(),af=it("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ml).replace(/punctSpace/g,Go).replace(/punct/g,Rs).getRegex(),lf=it(/\\(punct)/,"gu").replace(/punct/g,Rs).getRegex(),cf=it(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),df=it(zo).replace("(?:-->|$)","-->").getRegex(),uf=it("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",df).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ss=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,pf=it(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ss).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ql=it(/^!?\[(label)\]\[(ref)\]/).replace("label",Ss).replace("ref",Wo).getRegex(),Fl=it(/^!?\[(ref)\](?:\[\])?/).replace("ref",Wo).getRegex(),ff=it("reflink|nolink(?!\\()","g").replace("reflink",ql).replace("nolink",Fl).getRegex(),xl=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Vo={_backpedal:Cn,anyPunctuation:lf,autolink:cf,blockSkip:tf,br:Ol,code:Zp,del:Cn,emStrongLDelim:rf,emStrongRDelimAst:sf,emStrongRDelimUnd:af,escape:Yp,link:pf,nolink:Fl,punctuation:Qp,reflink:ql,reflinkSearch:ff,tag:uf,text:Xp,url:Cn},_f={...Vo,link:it(/^!?\[(label)\]\((.*?)\)/).replace("label",Ss).getRegex(),reflink:it(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ss).getRegex()},No={...Vo,emStrongRDelimAst:of,emStrongLDelim:nf,url:it(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",xl).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:it(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",xl).getRegex()},mf={...No,br:it(Ol).replace("{2,}","*").getRegex(),text:it(No.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},xs={normal:Ho,gfm:Vp,pedantic:Kp},Sn={normal:Vo,gfm:No,breaks:mf,pedantic:_f},gf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Al=e=>gf[e];function yr(e,t){if(t){if(Mt.escapeTest.test(e))return e.replace(Mt.escapeReplace,Al)}else if(Mt.escapeTestNoEncode.test(e))return e.replace(Mt.escapeReplaceNoEncode,Al);return e}function Sl(e){try{e=encodeURI(e).replace(Mt.percentDecode,"%")}catch{return null}return e}function El(e,t){let r=e.replace(Mt.findPipe,(o,a,i)=>{let l=!1,d=a;for(;--d>=0&&i[d]==="\\";)l=!l;return l?"|":" |"}),n=r.split(Mt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Mt.slashPipe,"|");return n}function En(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function bf(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Tl(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,l}function hf(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Es=class{constructor(e){dt(this,"options");dt(this,"rules");dt(this,"lexer");this.options=e||Ur}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:En(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=hf(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=En(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:En(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=En(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))i.push(r[l]),a=!0;else if(!a)i.push(r[l]);else break;r=r.slice(l);let d=i.join(`
`),u=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${u}`:u;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=p,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let R=b,T=R.raw+`
`+r.join(`
`),P=this.blockquote(T);o[o.length-1]=P,n=n.substring(0,n.length-R.raw.length)+P.raw,s=s.substring(0,s.length-R.text.length)+P.text;break}else if(b?.type==="list"){let R=b,T=R.raw+`
`+r.join(`
`),P=this.list(T);o[o.length-1]=P,n=n.substring(0,n.length-b.raw.length)+P.raw,s=s.substring(0,s.length-R.raw.length)+P.raw,r=T.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,d="",u="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,P=>" ".repeat(3*P.length)),b=e.split(`
`,1)[0],R=!p.trim(),T=0;if(this.options.pedantic?(T=2,u=p.trimStart()):R?T=t[1].length+1:(T=t[2].search(this.rules.other.nonSpaceChar),T=T>4?1:T,u=p.slice(T),T+=t[1].length),R&&this.rules.other.blankLine.test(b)&&(d+=b+`
`,e=e.substring(b.length+1),l=!0),!l){let P=this.rules.other.nextBulletRegex(T),B=this.rules.other.hrRegex(T),ee=this.rules.other.fencesBeginRegex(T),Z=this.rules.other.headingBeginRegex(T),z=this.rules.other.htmlBeginRegex(T);for(;e;){let L=e.split(`
`,1)[0],S;if(b=L,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),S=b):S=b.replace(this.rules.other.tabCharGlobal,"    "),ee.test(b)||Z.test(b)||z.test(b)||P.test(b)||B.test(b))break;if(S.search(this.rules.other.nonSpaceChar)>=T||!b.trim())u+=`
`+S.slice(T);else{if(R||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||ee.test(p)||Z.test(p)||B.test(p))break;u+=`
`+b}!R&&!b.trim()&&(R=!0),d+=L+`
`,e=e.substring(L.length+1),p=S.slice(T)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(l.raw);if(d){let u={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};l.checked=u.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=u.raw+l.tokens[0].raw,l.tokens[0].text=u.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(u)):l.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):l.tokens.unshift(u)}}if(!s.loose){let d=l.tokens.filter(p=>p.type==="space"),u=d.length>0&&d.some(p=>this.rules.other.anyLine.test(p.raw));s.loose=u}}if(s.loose)for(let l of s.items){l.loose=!0;for(let d of l.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=El(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(El(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=En(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=bf(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Tl(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Tl(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,l=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let u=[...n[0]][0].length,p=e.slice(0,s+n.index+u+a);if(Math.min(s,a)%2){let R=p.slice(1,-1);return{type:"em",raw:p,text:R,tokens:this.lexer.inlineTokens(R)}}let b=p.slice(2,-2);return{type:"strong",raw:p,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},er=class qo{constructor(t){dt(this,"tokens");dt(this,"options");dt(this,"state");dt(this,"inlineQueue");dt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ur,this.options.tokenizer=this.options.tokenizer||new Es,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Mt,block:xs.normal,inline:Sn.normal};this.options.pedantic?(r.block=xs.pedantic,r.inline=Sn.pedantic):this.options.gfm&&(r.block=xs.gfm,this.options.breaks?r.inline=Sn.breaks:r.inline=Sn.gfm),this.tokenizer.rules=r}static get rules(){return{block:xs,inline:Sn}}static lex(t,r){return new qo(r).lex(t)}static lexInline(t,r){return new qo(r).inlineTokens(t)}lex(t){t=t.replace(Mt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Mt.tabCharGlobal,"    ").replace(Mt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(u=>(l=u.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let u=r.at(-1);l.type==="text"&&u?.type==="text"?(u.raw+=l.raw,u.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,i)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let d=t;if(this.options.extensions?.startInline){let u=1/0,p=t.slice(1),b;this.options.extensions.startInline.forEach(R=>{b=R.call({lexer:this},p),typeof b=="number"&&b>=0&&(u=Math.min(u,b))}),u<1/0&&u>=0&&(d=t.substring(0,u+1))}if(l=this.tokenizer.inlineText(d)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let u=r.at(-1);u?.type==="text"?(u.raw+=l.raw,u.text+=l.text):r.push(l);continue}if(t){let u="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return r}},Ts=class{constructor(e){dt(this,"options");dt(this,"parser");this.options=e||Ur}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Mt.notSpaceStart)?.[0],s=e.replace(Mt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+yr(n)+'">'+(r?s:yr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:yr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${yr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Sl(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+yr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Sl(e);if(s===null)return yr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${yr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:yr(e.text)}},Ko=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},tr=class Fo{constructor(t){dt(this,"options");dt(this,"renderer");dt(this,"textRenderer");this.options=t||Ur,this.options.renderer=this.options.renderer||new Ts,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ko}static parse(t,r){return new Fo(r).parse(t)}static parseInline(t,r){return new Fo(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},As,Tn=(As=class{constructor(e){dt(this,"options");dt(this,"block");this.options=e||Ur}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?er.lex:er.lexInline}provideParser(){return this.block?tr.parse:tr.parseInline}},dt(As,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),dt(As,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),As),yf=class{constructor(...e){dt(this,"defaults",jo());dt(this,"options",this.setOptions);dt(this,"parse",this.parseMarkdown(!0));dt(this,"parseInline",this.parseMarkdown(!1));dt(this,"Parser",tr);dt(this,"Renderer",Ts);dt(this,"TextRenderer",Ko);dt(this,"Lexer",er);dt(this,"Tokenizer",Es);dt(this,"Hooks",Tn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Ts(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],l=s[a];s[a]=(...d)=>{let u=i.apply(s,d);return u===!1&&(u=l.apply(s,d)),u||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Es(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],l=s[a];s[a]=(...d)=>{let u=i.apply(s,d);return u===!1&&(u=l.apply(s,d)),u}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Tn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],l=s[a];Tn.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Tn.passThroughHooksRespectAsync.has(o))return(async()=>{let p=await i.call(s,d);return l.call(s,p)})();let u=i.call(s,d);return l.call(s,u)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let p=await i.apply(s,d);return p===!1&&(p=await l.apply(s,d)),p})();let u=i.apply(s,d);return u===!1&&(u=l.apply(s,d)),u}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return er.lex(e,t??this.defaults)}parser(e,t){return tr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?er.lex:er.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?tr.parse:tr.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?er.lex:er.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?tr.parse:tr.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+yr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Br=new yf;function lt(e,t){return Br.parse(e,t)}lt.options=lt.setOptions=function(e){return Br.setOptions(e),lt.defaults=Br.defaults,Cl(lt.defaults),lt};lt.getDefaults=jo;lt.defaults=Ur;lt.use=function(...e){return Br.use(...e),lt.defaults=Br.defaults,Cl(lt.defaults),lt};lt.walkTokens=function(e,t){return Br.walkTokens(e,t)};lt.parseInline=Br.parseInline;lt.Parser=tr;lt.parser=tr.parse;lt.Renderer=Ts;lt.TextRenderer=Ko;lt.Lexer=er;lt.lexer=er.lex;lt.Tokenizer=Es;lt.Hooks=Tn;lt.parse=lt;var Fb=lt.options,jb=lt.setOptions,Bb=lt.use,Ub=lt.walkTokens,Wb=lt.parseInline;var zb=tr.parse,Hb=er.lex;function Tr(e){let t=lt.parse(e),r=wl.sanitize(t);return kl(r)}function vr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function on(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Is(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var vf={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},wf={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},kf=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,$f=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ir(e){return!!e&&typeof e=="object"}function Yo(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function jl(e,t){let r=Yo(e),n=Yo(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function xf(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>ir(s)&&typeof s.text=="string"?s.text:"").join(""):ir(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Af(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:vf[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Yo(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=jl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let l=jl(ir(i)?i.old_string:"",ir(i)?i.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Zo(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Xo(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=kf.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:$f.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Sf(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ir(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Xo(o.text));else if(o.type==="thinking"){let a=Zo(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Af(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ir(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=xf(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Ef(e){if(e.type==="item.completed"&&ir(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Xo(t.text)];if(t.type==="reasoning"){let r=Zo(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Tf(e){if(e.schema!=="codex-delegation-monitor-v1"||!ir(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&ir(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[Xo(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let i=Zo(r.text);return i?[i]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=wf[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Cf(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Bl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!ir(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?Tf(o):Cf(o)?Ef(o):Sf(o,r);for(let i of a)t.push(i)}return t}var Rf=5,If=10,Lf=/Task\s+#(\d+)/,Of=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Mf=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Ls(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Pf(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Df(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Nf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=Lf.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!l||d.length===0)continue;t.set(l[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function qf(e){if(e.tool==="Bash"){let t=e.command||"";return Of.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Mf.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Ff(e){let t=e.filter(s=>s.kind==="tool").slice(-If),r=new Map;t.forEach((s,o)=>{let a=qf(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function jf(e){let t=Df(e);if(t)return{text:t,guess:!1};let r=Nf(e);if(r)return{text:r,guess:!1};let n=Ff(e);return n?{text:n,guess:!0}:null}function Bf(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:jt(e,t)}function Os(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,i=null,l=!1,d={},u=!0,p=new Set,b=new Set,R=null,T=null,P=!1,B=!1,ee=!1,Z=null,z=null;function L(){P=!1,B=!1,ee=!1,Z=null,z=null}async function S(G){if(r){B=!0,ee=!1,fe();try{let V=await Promise.resolve(r("get-attempt-prompt",{attempt_id:G}));if(o!==G)return;!V||typeof V!="object"||Array.isArray(V)?ee=!0:(Z=V,z=G)}catch{o===G&&(ee=!0)}finally{o===G&&(B=!1,fe())}}}function q(){if(P=!P,P&&o&&z!==o){S(o);return}fe()}function k(){if(!P)return"";let G=on({loading:B,error:ee});if(G)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${G}
      </div>`;if(!Z)return"";if(Z.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let V=Is(Z.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${V?c`<div class="prompt-block__meta">${V} 발송</div>`:""}
      ${typeof Z.task_prompt=="string"?vr("\uACFC\uC5C5 (user)",Z.task_prompt):""}
      ${typeof Z.system_prompt=="string"?vr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",Z.system_prompt):""}
    </div>`}function W(){if(!i||!n)return[];let G=n.get(i);return Bl(G?G.lines:[])}function oe(){if(!i||!n)return null;let G=n.get(i),V=G?G.last_event_at:null;return typeof V=="number"?V:null}function ue(){return d.status==="running"}function Q(){if(ue()&&o){T||(T=setInterval(()=>fe(),1e3));return}se()}function se(){T&&(clearInterval(T),T=null)}function Le(G){let V=[],ye=0;for(;ye<G.length;){let Te=G[ye];if(Te.kind==="tool"){let Ue=ye;for(;Ue<G.length&&G[Ue].kind==="tool"&&G[Ue].tool===Te.tool;)Ue+=1;if(Ue-ye>=Rf&&!b.has(ye)){V.push({kind:"group",idx:ye,tool:Te.tool||"",lines:G.slice(ye,Ue).map((He,Ae)=>({idx:ye+Ae,line:He}))}),ye=Ue;continue}}V.push({kind:"line",idx:ye,line:Te}),ye+=1}return V}function ze(G){for(let V=G.length-1;V>=0;V-=1){let ye=G[V];if(ye.kind==="result"||ye.kind==="error")return null;if(ye.kind==="tool"&&!Object.hasOwn(ye,"result"))return ye}return null}function Xe(G){for(let V=G.length-1;V>=0;V-=1)if(G[V].kind==="thinking")return G[V];return null}function at(G,V){if(V.kind==="gate")return c`<div class="sv__gate">${V.text}</div>`;if(V.kind==="phase")return c`<div class="sv__phase">${V.text}</div>`;if(V.kind==="result")return c`<div
        class="sv__result${V.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${V.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Tr(V.text||(V.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(V.kind==="thinking"){let ye=p.has(G);return c`<div
        class="sv__think${ye?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ee(G)}
      >
        <span class="sv__think-line">💭 ${Ls(V.text)}</span>
        ${ye?c`<pre class="sv__think-expand">${V.text}</pre>`:""}
      </div>`}if(V.kind==="error")return c`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="blocker")return c`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="tool"){let ye=p.has(G),Te=V.tool==="Bash"?Pf(V.command):0,Ue=V.tool==="Bash"?Te>1?Ls(V.command):V.command:V.path||V.command||"";return c`<div
        class="sv__tool${ye?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ee(G)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${V.icon}</span>
          <span class="sv__tool-name">${V.tool}</span>
          ${Ue?c`<span class="sv__tool-detail">${Ue}</span>`:""}
          ${Te>1?c`<span class="sv__tool-more">⋯ ${Te}줄</span>`:""}
          ${typeof V.added=="number"?c`<span class="sv__diff-add">+${V.added}</span>`:""}
          ${typeof V.removed=="number"?c`<span class="sv__diff-del">−${V.removed}</span>`:""}
          ${V.result?c`<span class="sv__tool-ok">→ ${V.result}</span>`:""}
        </span>
        ${ye?c`<pre class="sv__tool-expand">${rt(V)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${Tr(V.text||"")}</div>`}function rt(G){let V=[];if(G.tool==="Bash"&&typeof G.command=="string"&&G.command.length>0)V.push(G.command);else if(G.input!==void 0)try{V.push(`input: ${JSON.stringify(G.input,null,2)}`)}catch{}return typeof G.output=="string"&&G.output.length>0&&V.push(`output:
${G.output}`),V.join(`

`)}function nt(){if(!o)return c``;let G=W(),V=(a?[d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),ye=d.session_id||"",Te=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${u?"ON":"OFF"}`,Ue=ue(),He=Ue?Bf(oe(),Date.now()):"",Ae=Ue?ze(G):null,st=Ue?Xe(G):null,Qe=jf(G);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${Qe?c`<span
              class="sv__stage${Qe.guess?" sv__stage--guess":""}"
              title=${Qe.text}
              >${Qe.text}</span
            >`:""}
        ${Ue?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${He?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${He}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${He?c`<span class="sv__live-ago">${He}</span>`:""}</span
            >`:""}
        ${ye?c`<button
              type="button"
              class="sv__session"
              title=${ye}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ye}`}
              @click=${()=>ve(ye)}
            >
              ⧉ ${ye.slice(0,8)}
            </button>`:""}
        ${V?c`<span class="sv__meta">${V}</span>`:""}
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
              @click=${q}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${u?" sv__follow--on":""}"
          aria-pressed=${u?"true":"false"}
          aria-label=${Te}
          @click=${Fe}
        >
          <span class="sv__follow-full">⇣ ${Te}</span>
          <span class="sv__follow-short">⇣ ${u?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>he()}
        >
          ✕
        </button>
      </div>
      ${a||l?"":k()}
      <div class="sv__body">
        ${G.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:Le(G).map(H=>H.kind==="group"?_e(H):at(H.idx,H.line))}
      </div>
      ${Ae||st?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ae?c`<span class="sv__now-icon">${Ae.icon}</span>
                  <span class="sv__now-name">${Ae.tool}</span>
                  <span class="sv__now-detail"
                    >${Ae.tool==="Bash"?Ls(Ae.command):Ae.path||Ae.command||""}</span
                  >`:""}
            ${st?c`<span class="sv__now-think"
                  >💭 ${Ls(st.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function _e(G){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>qe(G.idx)}
    >
      <span class="sv__group-icon">${G.lines[0].line.icon}</span>
      <span class="sv__group-name">${G.tool}</span>
      <span class="sv__group-count">${G.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function qe(G){b.add(G),fe()}function fe(){Ze(nt(),e),Q(),u&&xe()}function xe(){let G=e.querySelector(".sv__body");G&&(G.scrollTop=G.scrollHeight)}function Ee(G){p.has(G)?p.delete(G):p.add(G),fe()}function Fe(){u=!u,fe()}function ve(G){Xt(G).then(V=>{V?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function je(G){!o||!G||(d={...d,...G},fe())}function Oe(G){let V=G.target;if(!V||!V.classList||!V.classList.contains("sv__body"))return;!(V.scrollHeight-V.scrollTop-V.clientHeight<=4)&&u&&(u=!1,fe())}e.addEventListener("scroll",Oe,!0);function ge(G){let V=G&&G.attempt_id;if(!V)return;let ye=i;o=V,a=typeof G.launch_id=="string"&&G.launch_id.length>0?G.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&ye&&ye!==i&&Promise.resolve(r("unsubscribe-session-log",{id:ye})).catch(()=>{}),d=G.meta||{},l=G.hide_prompt===!0,u=!0,p.clear(),b.clear(),L(),!R&&n&&(R=n.subscribe(fe)),r&&Promise.resolve(r("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),fe()}function he(){let G=i;o=null,a=null,i=null,l=!1,p.clear(),b.clear(),L(),se(),r&&G&&Promise.resolve(r("unsubscribe-session-log",{id:G})).catch(()=>{}),Ze(c``,e),s&&s()}return{open:ge,updateMeta:je,close:he,isOpen(){return o!==null},destroy(){se(),R&&(R(),R=null),e.removeEventListener("scroll",Oe,!0),o=null,a=null,i=null,l=!1,Ze(c``,e)}}}function In(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Ul(t.spec_id),s=Ul(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ul(e){return typeof e=="string"?e.trim():""}function Uf(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Wf(e){let t=e&&e.metadata||{},r=In(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Uf(t)?null:"plan_pending"}),n}function Wl(e,t){let r=Wf(e);return c`
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
  `}var zf="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Hf=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Gf=/^\*\*결론\*\* — (.+)$/;function Ms(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==zf)return null;let r=Hf.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Gf.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(d).join(`
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
          ${Tr(t.body)}
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
      ${Tr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Gl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((l,d)=>String(d.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let d=Ms(typeof l.text=="string"?l.text:"");return d?Kf(l,d,t,s.has(l.id)):Yf(l)})}
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
  `}var{I:xh}=mi;var Vl=e=>e.strings===void 0;var Zf={},Kl=(e,t=Zf)=>e._$AH=t;var Wr=$s(class extends sn{constructor(e){if(super(e),e.type!==hr.PROPERTY&&e.type!==hr.ATTRIBUTE&&e.type!==hr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Vl(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Wt||t===mt)return t;let r=e.element,n=e.name;if(e.type===hr.PROPERTY){if(t===r[n])return Wt}else if(e.type===hr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Wt}else if(e.type===hr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Wt;return Kl(e),t}});var Ps=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Cr=["orchestration_model","orchestration_effort","orchestration_speed"],Yl=[...Ps,...Cr],Ds=["delegated","main"],Ns=["inherit","claude","codex"],Ln=["default","fast"],On=["standard","fast_track"],Mn=["codex","opus","fable","self","skip"],qs=["codex","fable","skip"],Fs=["low","medium","high","xhigh"],lr="auto";function wr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Zl(e){if(!wr(e)||!wr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))wr(n)&&wr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Xl(e){return e?.impl_dispatch==="main"}function js(e,t){let r=Zl(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[lr,...n.flatMap(([,s])=>s)]}function an(e,t,r){if(!wr(e)||!wr(e.runners))return[lr];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!wr(o)||!wr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,i]of Object.entries(o.models)){if(r&&r!==lr&&a!==r)continue;let l=wr(i)?i.efforts:null;if(Array.isArray(l))for(let d of l)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[lr,...n]}function Bs(e,t){let r=Zl(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Qo(e,t,r,n,s){return bs({key:e,choices:t,layer:"global",global:r,execution_defaults:n,runner_catalog:s})}function Ql(e,t){let r={};for(let n of Ps){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function Jl(e,t){let r={};for(let n of Cr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Jo=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Cr]}],ea={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ec={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ta(e,t,r,n,s,o=null){let a=en({pin:t,global:r,execution_defaults:n,runner_catalog:s,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function tc(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let i of ta(e,t,r,n,s,o))a[i.source]+=1;return a}function rc(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function nc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var Ph=[...Ps,...Cr];var Xf=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],Qf={pin:"pin",global:"global",base:"base"};function Jf(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Qf[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function e_(e,t,r){switch(e){case"workflow_mode":return On;case"spec_review_model":case"impl_review_model":return Mn;case"plan_review_model":return qs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Fs;case"impl_dispatch":return Ds;case"impl_runtime":return Ns;case"impl_model":return js(r,t.impl_runtime);case"impl_effort":return an(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Ln;case"orchestration_model":return Bs(r,null);case"orchestration_effort":return an(r,void 0,t.orchestration_model||lr).filter(n=>n!==lr);default:return[]}}function t_(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
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
              ${n.filter(d=>l.keys.includes(d.key)).map(d=>{let u=bs({key:d.key,choices:e_(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,controller_runtime:e.controller_runtime||null});return t_(d,{expanded:e.expanded,options:u.options,default_label:u.unset_label,default_full_value:u.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Wr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${l=>t.onPresetSelect(String(l.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
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
              >세션 키 12개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function r_(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function oc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=_s(r.planned_execution,r.exec_receipt);return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${Xf.map(l=>{let d=l.receipt&&typeof t[l.receipt]=="string"?String(t[l.receipt]):"",u=n[l.id],p=d.length>0||u?.fill==="full",b=!p&&u?.fill==="dim",R=u?.stale===!0;return c`<span
          class=${`detail-summary__gate${p?" detail-summary__gate--on":""}${b?" detail-summary__gate--current":""}${R?" detail-summary__gate--stale":""}`}
          data-gate=${l.id}
        >
          <span class="detail-summary__gate-pill">${l.label}</span>
          ${d?c`<span class="detail-summary__gate-sha"
                >${d.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var ac=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Pn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Us(e){if(!Pn(e)||!Pn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Pn(r)&&Pn(r.models));return t.length>0?t:null}function ra(e,t){let r=Us(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function ic(e,t){return Pn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function lc(e,t){let r=Us(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return ic(n,n.models[t]);return[]}function n_(e){let t=Us(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of ic(n,s))r.includes(o)||r.push(o);return r}function s_(e,t){if(!t)return n_(e);let n=Us(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of lc(e,o))s.includes(a)||s.push(a);return s}function cc(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=ra(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?lc(t,n.impl_model):s_(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function o_(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function dc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function l(T){T.key==="Escape"&&s&&(T.preventDefault(),b())}document.addEventListener("keydown",l);function d(){return s?c`
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
                    </div>`:Tr(a)}
          </div>
        </div>
      </div>
    `:c``}function u(){Ze(d(),e)}async function p(T,P={}){s=T,o="loading",a="",i="",u();let B=r?r():"";if(!B){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",u();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",u();return}let ee="/api/doc?workspace="+encodeURIComponent(B)+"&path="+encodeURIComponent(T);try{let Z=await n(ee),z=await Z.json().catch(()=>({}));if(!Z.ok||!z||z.ok!==!0){if(z?.error==="not_found"&&P.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",u();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(z&&z.error||Z.status)+")",u();return}a=String(z.content||""),o="ready",u()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",u()}}function b(){s=null,Ze(c``,e)}function R(){document.removeEventListener("keydown",l),b()}return{open:p,close:b,destroy:R}}var a_=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],pc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ws=["implementation","review-consult"],i_=["running","done","failed","interrupted"],l_={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function c_(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function d_(e){let t=xt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=rn(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${pc}
          >부분 집계</span
        >`:""}`}function uc(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function na(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?sa(t):""}function u_(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!Ws.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!i_.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function p_(e,t){let n=xt({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[t.provider,t.model,t.effort].filter(Boolean).join(" \xB7 ")}</span
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
  </div>`}function f_(e,t,r,n){let s=e.status==="running"?null:t,a=(s?xt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?sa(e.last_event_at):s?na(s.completed_at):"";return c`<button
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
      >${["codex",e.model,e.effort].filter(Boolean).join(" \xB7 ")}</span
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
  </button>`}function __(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function m_(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let u of o){let p=u_(u);!p||s.has(p.launch_id)||(s.add(p.launch_id),n.push(p))}n.sort((u,p)=>u.started_at-p.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let u of Ws){let p=t.roles[u]?.codex;a[u]=p?[...p.legs]:[]}let i=Ws.flatMap(u=>a[u]),l=new Set,d=[];for(let u of Ws){for(let p of n.filter(b=>b.role===u)){let b=i.find(R=>R.receipt_id===p.launch_id)||null;b&&!__(p,b)||(b&&l.add(b.receipt_id),d.push(f_(p,b,e.attempt_id,r)))}for(let p of a[u])l.has(p.receipt_id)||d.push(p_(u,p))}return d}function g_(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...a_,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
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
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let p=typeof d.session_id=="string"&&d.session_id.length>0,b=o.has(d.attempt_id),R=p&&!b,T=p?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!R}
      title=${T}
      @click=${P=>{P.stopPropagation(),R&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let p=d.cause_detail,b=p&&typeof p.reason=="string"&&p.reason.length>0?typeof p.command=="string"&&p.command.length>0?`${p.reason} \xB7 ${p.command}`:p.reason:d.cause;return c`<div class="detail-session__cause" title=${b}>
      ${d.cause}
    </div>`},l=d=>{let u=uc(Eo(d));if(xt(u).length===0&&!rn(d.usage))return"";let p=s.has(d.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${p?"true":"false"}
      title=${p?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${b=>{b.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${d_(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let u=Eo(d),p=uc(u),b=xt(p);return c`<div class="detail-session-row">
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
            ${Sr(d)?c`<span
                  class="detail-session__resumed"
                  title=${Sr(d)}
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
                    >`):rn(d.usage)?c`<span class="detail-session__usage"
                    >${rn(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${sa(d.started_at)}</span>
          </button>
          ${l(d)} ${a(d)} ${i(d)} ${h_(d)}
          ${s.has(d.attempt_id)&&d.usage?g_(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${m_(d,u,t)}
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
  `}function y_(e){let t=on(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?vr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Is(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?vr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?vr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var v_=["open","in_progress","deferred","resolved","closed"],w_=[0,1,2,3,4];function mc(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,d=null,u=null,p={},b="",R=!1,T=[],P=!1,B={},ee=!1,Z=!1,z="",L="",S="";function q(){ee=!1,Z=!1,z="",L="",S=""}let k=[],W=null,oe=null,ue=!1,Q="",se=!1,Le=0,ze=new Set;function Xe(){k=[],W=null,oe=null,ue=!1,Q="",se=!1,Le+=1,ze.clear()}async function at(g){if(!s)return;let O=++Le;try{let E=await Promise.resolve(s("get-comments",{id:g}));if(O!==Le||g!==d)return;k=Array.isArray(E)?E:[],ue=!1}catch{if(O!==Le||g!==d)return;ue=!0}y()}function rt(){if(!s||!d)return;let g=u&&typeof u.comment_count=="number"?u.comment_count:null;if(W!==d){W=d,oe=g,at(d);return}g!==null&&g!==oe&&(oe=g,at(d))}function nt(g){ze.has(g)?ze.delete(g):ze.add(g),y()}function _e(g){let O=Q.trim().length===0;Q=g,O!==(g.trim().length===0)&&y()}async function qe(){let g=Q.trim();if(!s||!d||g.length===0||se)return;let O=d;se=!0,y();let E=!1;try{let J=await Promise.resolve(s("add-comment",{id:O,text:g}));Array.isArray(J)&&J.length>0&&(E=!0,O===d&&(k=J,ue=!1,Q="",oe=J.length))}catch{E=!1}E||ae("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),O===d&&(se=!1),y()}let fe={onToggle:nt,onDraftInput:_e,onSubmit:qe},xe=document.createElement("div");xe.className="md-viewer-root",document.body.appendChild(xe);let Ee=dc(xe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Fe=document.createElement("div");Fe.className="session-log-root",document.body.appendChild(Fe);let ve=Os(Fe,{transport:s?(g,O)=>Promise.resolve(s(g,O)):void 0,sessionLogStore:l}),je=!1,Oe=!1,ge=!1,he=null,G=null,V=0;function ye(g){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${g}`}function Te(){je=!1,Oe=!1,ge=!1,he=null,G=null,V+=1}async function Ue(g){if(!s)return;let O=++V;Oe=!0,ge=!1,y();try{let E=await Promise.resolve(s("get-bead-prompt",{bead_id:g}));if(O!==V)return;!E||typeof E!="object"||Array.isArray(E)?ge=!0:(he=E,G=ye(g))}catch{O===V&&(ge=!0)}finally{O===V&&(Oe=!1,y())}}function He(){if(je=!je,je&&d&&G!==ye(d)){he=null,Ue(d);return}y()}function Ae(){if(!a||!d)return[];let g=a.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(E=>E&&E.bead_id===d).sort((E,J)=>(J.started_at||0)-(E.started_at||0)).map(E=>({attempt_id:E.attempt_id,bead_id:E.bead_id,status:E.status,started_at:typeof E.started_at=="number"?E.started_at:null,runner:E.runner||null,model:E.model||null,effort:E.effort||E.observed_effort||null,speed:E.speed||null,session_id:E.session_id||null,resumed_from:E.resumed_from||null,continuation_mode:E.continuation_mode||null,dismissed_at:typeof E.dismissed_at=="number"?E.dismissed_at:null,cause:typeof E.cause=="string"?E.cause:null,cause_detail:E.cause_detail||null,exec_default_preset_id:typeof E.exec_default_preset_id=="string"?E.exec_default_preset_id:null,exec_default_preset_revision:typeof E.exec_default_preset_revision=="number"?E.exec_default_preset_revision:null,exec_values:E.exec_values&&typeof E.exec_values=="object"?E.exec_values:null,usage:E.usage||null,usage_legs:Array.isArray(E.usage_legs)?E.usage_legs:[],delegation_sessions:Array.isArray(E.delegation_sessions)?E.delegation_sessions:[]}))}function st(){if(!a||!d)return null;let g=a.get();return Ht(g&&g.attempts||{},d)}let Qe=new Set;function H(g){Qe.has(g)?Qe.delete(g):Qe.add(g),y()}function re(g){let O=a?a.get():null,E=O&&O.attempts?O.attempts[g]:null;ve.open({attempt_id:g,meta:E?{runner:E.runner||void 0,model:E.model||void 0,effort:E.effort||void 0,status:E.status||void 0,session_id:E.session_id||void 0}:{}})}function Ce(g,O){let E=a?a.get():null,J=E&&E.attempts?E.attempts[g]:null,Ye=(J&&Array.isArray(J.delegation_sessions)?J.delegation_sessions:[]).find(tt=>tt&&typeof tt=="object"&&tt.launch_id===O);Ye&&ve.open({attempt_id:g,launch_id:O,meta:{runner:"codex",role:Ye.role,model:Ye.model,effort:Ye.effort,session_id:Ye.session_id,status:Ye.status}})}async function We(g){if(!s||!g)return;let O=await tn();if(O===null)return;let E=()=>{let tt=a?a.get():null;return tt&&typeof tt.revision=="number"?tt.revision:0},J=async(tt={},Be=E())=>await s("worker-attempt-resume",{attempt_id:g,expected_revision:Be,...O!==""?{instructions:O}:{},...tt}),Ie=tt=>{tt?.queue&&a?.set&&a.set(tt.queue)},Ye=await J();if(Ie(Ye),Ye&&Ye.conflict){let tt=Ye.queue&&typeof Ye.queue.revision=="number"?Ye.queue.revision:E();Ye=await J({},tt),Ie(Ye)}Ye=await mr(Ye,(tt,Be)=>J({continuation:tt,decision_token:Be}),{onResult:Ie,refresh:()=>J()}),Ye&&Ye.resumed===!1&&!Ye.conflict&&Ye.reason&&ae(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ye.reason}`,"error",2400)}let pe={onOpen:re,onOpenDelegation:Ce,onResume:We,onToggleUsage:H};function m(){let g=a?a.get():null,O={...B};for(let E of["orchestration_model","orchestration_effort","orchestration_speed"]){let J=g&&g[E];typeof J=="string"&&(O[E]=J)}return O}async function $(){if(s){try{let g=await Promise.resolve(s("get-session-defaults",{}));B=g&&g.values&&typeof g.values=="object"?g.values:{}}catch{B={}}y()}}function x(){let g=a?a.get():null;return g&&g.runner_catalog||null}function D(){let g=a?a.get():null;return g&&typeof g.execution_defaults=="object"?g.execution_defaults:null}function K(){let g=u?.metadata&&typeof u.metadata=="object"?u.metadata:{},E=en({pin:{...g,...p},global:m(),execution_defaults:D(),runner_catalog:x()}).orchestration_model.value||"";return ra(x(),E)}function Y(){let g=i?i.get():null;return!g||typeof g.revision!="number"?null:{revision:g.revision,presets:Array.isArray(g.presets)?g.presets:[]}}function ne(g){return g?.compatible===!1}function le(g){i&&g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&i.set({revision:g.revision,presets:g.presets})}async function be(){let g=Y(),O=g?.presets.find(E=>E.id===b);if(!(!s||!d||!g||!O||ne(O)||R)){R=!0,T=[],y();try{let E=await Promise.resolve(s("apply-impl-preset",nc(d,O.id,g.revision)));if(E&&E.conflict){le(E),ae("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let J=E&&Array.isArray(E.issue)?E.issue[0]:E?.issue;if(E&&E.applied&&J&&typeof J=="object"){u=J,T=Array.isArray(E.skipped_orchestration_keys)?E.skipped_orchestration_keys.filter(Ie=>typeof Ie=="string"):[];for(let Ie of ac)delete p[Ie];ae(T.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}E&&E.error==="bd_readback_failed"?ae("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ae("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(E){E&&typeof E=="object"&&E.code==="bd_readback_failed"?ae("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ae("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{R=!1,y()}}}let we=null;r&&r.subscribe&&(we=r.subscribe(()=>Ve()));let Me=null;a&&typeof a.subscribe=="function"&&(Me=a.subscribe(()=>{d&&y()}));let Pe=null;i&&typeof i.subscribe=="function"&&(Pe=i.subscribe(()=>{d&&y()}));function ke(g){g.key==="Escape"&&d&&(g.preventDefault(),n())}document.addEventListener("keydown",ke);function Ve(){if(d){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+d)||[];u=g.find(E=>E&&E.id===d)||g[0]||u}rt(),y()}}function U(g){Xt(g).then(O=>{O?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function X(g){g.preventDefault(),g.stopPropagation(),d&&U(d)}function v(g,O){g.preventDefault(),g.stopPropagation(),U(O)}function C(g,O,E){g.preventDefault(),g.stopPropagation(),Ee.open(O,{missing_state:E})}function N(g,O){p[g]=O,y(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",rc(d,g,O.length===0?null:O))).catch(()=>{ae("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function F(g,O){let E=u||{},J=E.metadata&&typeof E.metadata=="object"?E.metadata:{},Ie={};for(let Be of["impl_runtime","impl_model","impl_effort"])Ie[Be]=Object.hasOwn(p,Be)?p[Be]:typeof J[Be]=="string"?J[Be]:"";Ie[g]=O;let Ye=cc(Ie,x(),K()),tt={};for(let Be of["impl_runtime","impl_model","impl_effort"])tt[Be]=p[Be],p[Be]=Ye[Be]||"";y(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...Ye,orchestration_runtime:K()})).then(Be=>{let bt=Array.isArray(Be)?Be[0]:Be;if(!bt||typeof bt!="object"||!bt.id)throw new Error("implementation target readback failed");u=bt;for(let sr of["impl_runtime","impl_model","impl_effort"])delete p[sr];y()}).catch(()=>{for(let Be of["impl_runtime","impl_model","impl_effort"])tt[Be]===void 0?delete p[Be]:p[Be]=tt[Be];y(),ae("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function me(g,O,E){if(!s||!d)return!1;try{let J=await Promise.resolve(s(g,O)),Ie=Array.isArray(J)?J[0]:J;return Ie&&typeof Ie=="object"&&Ie.id?(u=Ie,!0):(ae(E,"error"),!1)}catch{return ae(E,"error"),!1}}function $e(g){setTimeout(()=>{try{let O=e.querySelector(g);O&&typeof O.focus=="function"&&O.focus()}catch{}},0)}function ce(){ee=!0,z=u&&u.title||"",y(),$e('.detail-edit__input[data-edit="title"]')}function ot(g){z=g.target.value}function Se(){ee=!1,z="",y()}function gt(){me("edit-text",{id:d,field:"title",value:z},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(O=>{O&&(ee=!1,z=""),y()})}function Ke(){Z=!0,L=u&&u.description||"",y(),$e('.detail-edit__textarea[data-edit="description"]')}function Et(g){L=g.target.value}function Ut(){Z=!1,L="",y()}function dr(){me("edit-text",{id:d,field:"description",value:L},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(O=>{O&&(Z=!1,L=""),y()})}function vt(g,O,E,J){if(g.key==="Escape"){g.stopPropagation(),E();return}g.key==="Enter"&&(!J||g.ctrlKey||g.metaKey)&&(g.preventDefault(),O())}function Ct(g){let O=g.target.value;me("update-status",{id:d,status:O},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function ur(g){let O=Number(g.target.value);me("update-priority",{id:d,priority:O},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function pr(g){S=g.target.value}function qt(){let g=S.trim();g.length!==0&&me("label-add",{id:d,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(O=>{O&&(S=""),y()})}function nr(g){if(g.key==="Escape"){g.stopPropagation(),S="",y();return}g.key==="Enter"&&(g.preventDefault(),qt())}function wt(g){me("label-remove",{id:d,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>y())}let fr={onCopyPath:v,onOpenDoc:C};function Je(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function Pt(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function f(g){let E=(Array.isArray(g.dependencies)?g.dependencies:[]).map(J=>({id:Je(J),icon:Pt(J)})).filter(J=>J.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${E.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${E.map(J=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(J.id)}
                  >
                    ${J.icon?`${J.icon} `:""}${J.id}
                  </button>`:c`<span class="detail-dep"
                    >${J.icon?`${J.icon} `:""}${J.id}</span
                  >`)}
          </div>`}
    `}function A(g){let O=g.metadata||{},E=g.workflow||{},J=E.stages||{},Ie=J.spec&&J.spec.stale,Ye=J.impl&&J.impl.stale,tt=J.plan||null,Be=E.route_source==="derived",bt=E.route||O.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Be?" detail-kv__v--derived":""}"
          title=${Be?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Be?"unset":bt}</span
        >
      </div>
      ${E.route!=="quick_fix"||Object.hasOwn(O,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${O.spec_review||"\uC5C6\uC74C"}${Ie?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${E.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${tt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${tt?.approval_receipt||"\uC5C6\uC74C"}${tt?.approval_state==="stale"?" \xB7 stale":tt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${E.route!=="quick_fix"||Object.hasOwn(O,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${O.impl_review||"\uC5C6\uC74C"}${Ye?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${E.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${E.planned_execution.kind}</span>
            </div>
            ${E.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${E.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${E.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${E.exec_receipt.kind}:${E.exec_receipt.actor}@${E.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${E.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${E.impl_entry.actor}@${E.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${O.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${O.pr_url}</span>
          </div>`:""}
    `}let I={route:["quick_fix","spec_backed","full_plan"]};async function _(g,O){let E=O.target.value;if(g==="route"&&u&&u.metadata&&u.metadata.route==="full_plan"&&E!=="full_plan"&&!window.confirm(`full_plan \u2192 ${E||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){y();return}await me("update-workflow-meta",{id:d,key:g,value:E},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),y()}function M(g){let O=g.metadata||{};return c` ${((J,Ie)=>{let Ye=I[J],tt=typeof O[J]=="string"?O[J]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${J}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${J}
          data-edit=${`wfmeta-${J}`}
          @change=${Be=>_(J,Be)}
        >
          <option value="" ?selected=${!Ye.includes(tt)}>
            ${Ie}
          </option>
          ${Ye.map(Be=>c`<option value=${Be} ?selected=${tt===Be}>${Be}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function te(g,O){return ee?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${z}
            @input=${ot}
            @keydown=${E=>vt(E,gt,Se,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${gt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Se}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${g}</h2>
        ${xt(O).map(E=>c`<span class="detail-usage-total" title=${E.tooltip}
              >${E.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ce}
        >
          ✎
        </button>
      </div>
    `}function de(g){let O=kt(g.created_at),E=kt(g.updated_at);return!O&&!E?c``:c`
      ${O?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${O}</span>
          </div>`:""}
      ${E?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${E}</span>
          </div>`:""}
    `}function Ne(g,O){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ct}
        >
          ${v_.map(E=>c`<option value=${E} ?selected=${E===g}>${E}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ur}
        >
          ${w_.map(E=>c`<option value=${String(E)} ?selected=${E===O}>
                P${E}
              </option>`)}
        </select>
      </div>
    `}function Re(g){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${Z?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ke}
            >
              ✎
            </button>`}
      </div>
      ${Z?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${L}
              @input=${Et}
              @keydown=${O=>vt(O,dr,Ut,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${dr}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ut}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ct(g){let O=typeof g.notes=="string"?g.notes:"";return O.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${O}</div>
    `}function ut(g){let O=Array.isArray(g.labels)?g.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${O.map(E=>c`<span class="detail-label-chip"
              >${E}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${E}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+E}
                @click=${()=>wt(E)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${S}
            @input=${pr}
            @keydown=${nr}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${qt}
          >
            추가
          </button>
        </span>
      </div>
    `}function w(){if(!d)return c``;let g=u||{},O=String(g.id||d),E=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",J=st(),Ie=g.status||"open",Ye=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",tt=g.description||"",Be={...g,metadata:{...g.metadata||{},...p}};return c`
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
            @click=${X}
          >
            ${O}
          </button>
          ${te(E,J)}
          ${oc(Be)}
          ${sc({metadata:Be.metadata,workspace_values:m(),catalog:x(),execution_defaults:D(),expanded:P,presets:Y()?.presets||[],preset_id:b,preset_busy:R,skipped_orchestration_keys:T},{onToggle:bt=>{P=bt,y()},onEdit:(bt,sr)=>{if(bt==="impl_runtime"||bt==="impl_model"||bt==="impl_effort"){F(bt,sr??"");return}N(bt,sr??"")},onPresetSelect:bt=>{b=bt,T=[],y()},onPresetApply:()=>{be()}})}
          ${Ne(Ie,Ye)} ${de(g)}
          ${Re(tt)}
          ${Gl(k,fe,{expanded:ze,draft:Q,sending:se,error:ue})}
          ${ct(g)} ${ut(g)} ${f(g)}
          ${A(g)} ${M(g)}
          ${Wl(g,fr)}
          ${_c({expanded:je,loading:Oe,error:ge,data:he},{onToggle:He})}
          ${fc(Ae(),pe,{total:J,expanded:Qe})}
        </div>
      </div>
    `}function y(){Ze(w(),e)}return{load(g){g!==d&&(p={},b="",T=[],P=!1,q(),Xe(),Te()),d=g,u=null,Ve(),$()},clear(){d=null,u=null,p={},b="",R=!1,T=[],P=!1,q(),Xe(),Te(),Ee.close(),ve.close(),Ze(c``,e)},destroy(){we&&(we(),we=null),Me&&(Me(),Me=null),Pe&&(Pe(),Pe=null),document.removeEventListener("keydown",ke),Ee.destroy(),xe.parentNode&&xe.parentNode.removeChild(xe),ve.destroy(),Fe.parentNode&&Fe.parentNode.removeChild(Fe),d=null,u=null,b="",R=!1,T=[],Xe(),Te(),Ze(c``,e)}}}function gc(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(d,u,p="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=u||"An unrecoverable error occurred.");let b=typeof p=="string"?p.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function zs(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Hs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function bc(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(r+=i-a,n=!0)}return n?r:null}function Gs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function k_(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:zs(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function hc(e,t){let r=k_(e,t);return r?c`<button
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
            title=${r.deploy.at?kt(r.deploy.at):""}
            >${Gs(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Hs(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function ln(e){let t=jt(e.created_at),r=jt(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${kt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${kt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function $_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Dn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Vs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function cr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,b)=>(p.requested_at||0)-(b.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?$_(s.phase):null,d=s?.kind==="stale_work_backup_fresh",u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:u}}function kr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return c`<div
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
  </div>`}var x_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function yc(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let l=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:x_[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function oa(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=xt(e.usage),s=Qt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,l=i?jt(e.done_at):"",d=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",u=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",p=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",R=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,T=c`<span class="worker-mini__title">${e.title}</span>`,P=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",B=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",ee=r.map(Xe=>Xe===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Xe}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Xe===e.completion_badge&&e.completion_title||""}
          >${Xe}</span
        >`),Z=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",z=n.length>0?n.map(Xe=>c`<span class="worker-usage" title=${Xe.tooltip}
              >${Xe.label}</span
            >`):s?c`<span class="worker-usage" title=${nn(e.usage)}
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
      </button>`:"",q=e.cancel_action?c`<button
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
      </button>`:"",W=e.discard,oe=W?.action||e.discard_action?c`<button
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
        </button>`:"",ue=e.stale_work||null,Q=ue?c`${ue.can_resume||ue.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ue.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ue.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            다시 확인
          </button>`:""}`:"",se=ue?c`<div class="worker-mini__stale">
        <strong>${ue.title}</strong>
        <span>${ue.summary}</span>
        <span>${ue.cause}</span>
        ${ue.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Le=e.revise_action?c`<button
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
        </button>`:"",ze=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||W?.operation||e.revise_action||ue);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">${b}${R}${T}</div>
          <div class="worker-mini__row2">
            ${z}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${kt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Hs(e.work_ms)}</span
                >`:""}${ee}${L}
            <span class="worker-mini__actions"
              >${S}${q}${k}${oe}</span
            >
            ${ln(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${d}${u}${b}${R}${P}${B}${ee}${p}${Z}
            </div>
            <div class="worker-mini__body">${T}${se}</div>
            ${ze?c`<div class="worker-mini__foot">
                  ${z}${L}
                  <span class="worker-mini__actions"
                    >${S}${q}${k}${oe}${Le}${Q}</span
                  >
                  ${kr(e)}
                </div>`:""}
            ${ln(e)}`:c`<div class="worker-mini__line">
              ${d}${u}${b}${R}${T}${P}${B}${ee}${p}${Z}${z}${L}${S}${q}${k}${oe}
            </div>
            ${kr(e)} ${ln(e)}`}
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
    ${r?fs(r,e.status):""}
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
    ${ln(e)}
  </div>`}function rr(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
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
  </section>`}function aa(e,t){return`${e}\0${t}`}function ia(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function S_(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function E_(e,t){return e==="internal"&&t===void 0}function vc(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function wc(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${vc(s)})`,scope:null,same_lane_ahead:!1,missing_internal:!1};let a=S_(e,n);return{id:e,label:`\u{1F512} ${e} (${a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"})`,scope:a,same_lane_ahead:!1,missing_internal:E_(a,s)}}function kc(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=aa(i.root_dir,l.id);r.set(d,{root_dir:i.root_dir,workspace_name:i.name,lane:l.id}),s.set(d,[]);for(let u of Array.isArray(l.items)?l.items:[])n.set(u.id,d)}for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=aa(i.root_dir,l.id),u=Array.isArray(l.items)?l.items[0]:null,b=!!u&&u.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(u.blocked_by)?u.blocked_by:[],R=s.get(d);if(R)for(let T of b){let P=n.get(T);P&&P!==d&&!R.includes(P)&&R.push(P)}}let o=(i,l)=>{let d=new Set,u=[i];for(;u.length>0;){let p=u.pop();if(p===l)return!0;!p||d.has(p)||(d.add(p),u.push(...s.get(p)||[]))}return!1},a=new Map;for(let[i,l]of s){let d=[];for(let u of l){let p=r.get(u);o(u,i)&&p&&d.push(p)}d.length>0&&a.set(i,d)}return a}function $c(e){let t=ia(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=vc(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function xc(e,t){return aa(e,t)}var Ac=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Nn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ks(e,t){let r=Ac.find(s=>s.step===e);if(!r)return null;let n=Ac.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Sc(e){let t=Nn.findIndex(r=>r.step===e);return Nn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function zr(e){let t=Nn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function T_(e){let t=Nn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:Nn.length}}function Ys(e){let t=T_(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ca=new Set(["queued","running","retry_pending","repairing"]),Ec=new Set(["failed","succeeded"]),C_={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},qn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},R_={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:qn.base_containment,child_sweep:qn.child_sweep,branch_cleanup:qn.branch_cleanup,parent_close:qn.parent_close};function I_(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function L_(e,t,r){return!["verify","deploy"].includes(e.kind)||![...ca,...Ec].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function O_(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function la(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=C_[s];if(!o)return null;let a=Ks(r,`${n} ${o}`);return a?{...a,active:ca.has(s),failed:s==="failed"}:null}function M_(e){return!e||typeof e!="object"?null:R_[e.step]||null}function Fn(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=M_(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),i=I_(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(T=>T&&typeof T=="object"&&L_(T,t,i)).sort(O_):[],d=a?l:[],u=d.find(T=>ca.has(T.state));if(u)return la(u);if(s)return s.step==="repo_operations"&&l[0]?la(l[0],!0):null;let p=d.find(T=>Ec.has(T.state)?T.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return la(p);if(n){let T=Ks(n.step,n.label);return T?{...T,active:!0,failed:!1}:null}let b=typeof e.cleanup_cursor=="string"?qn[e.cleanup_cursor]:null;if(!b)return null;let R=Ks(b.step,b.label);return R?{...R,active:!0,failed:!1}:null}function Zs(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Tc={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Cc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Rc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function da(e){for(let t of Rc(e))if(Object.hasOwn(Tc,t))return Tc[t];return null}function ua(e){let t=null;for(let r of Rc(e))Object.hasOwn(Cc,r)&&(t=Cc[r]);return t}function Xs(e){let t=da(e),r=ua(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Ic(e,t){let r=da(e)??da(t),n=ua(t)??ua(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var Lc=160;function P_(e){return e.length>Lc?`${e.slice(0,Lc)}\u2026`:e}function D_(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
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
  </details>`:""}function pa(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Oc(e){let t=e.failure?Xs(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${kr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function q_(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?pa(t-e.started_at):"\u2014",a=ar(e),i=Sr(e),l=xt(e.usage),d=Qt(e.usage),u=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,p=e.base_exception||null,b=e.landing,R=e.attempt_id&&e.attempt_id===r,T=e.discard?.action?c`<button
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
            ${T}
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
            ${T}`}
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
    ${a||l.length>0||d||u||p?c`<div class="rtile__meta">
          ${u?c`<span class="worker-mini__badge">${u}</span>`:""}
          ${p?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${p}</span
              >`:""}
          ${a?c`<span class="rtile__runner">${a}</span>`:""}
          ${l.length>0?l.map(P=>c`<span class="worker-usage" title=${P.tooltip}
                    >${P.label}</span
                  >`):d?c`<span
                  class="worker-usage"
                  title=${nn(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${ln(e)} ${kr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function fa(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>q_(s,t,r))}
  </div>`}function Hr(e){return c`<svg
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
  </svg>`}function _a(){return Hr($r`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ma(){return Hr($r`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Mc(){return Hr($r`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Pc(){return Hr($r`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Dc(){return Hr($r`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Nc(){return Hr($r`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function qc(){return Hr($r`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var jn=1,F_=6e4,j_={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},B_=new Set(["auto_merge","merged","merge","done"]),Fc={running:3,paused:2,failed:1};function U_(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function W_(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let p=t.get(a.bead_id),b=typeof p=="number"&&p>0&&typeof a.finished_at=="number"&&p>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let p=Fc[d.run_state],b=Fc[i];if(p>b||p===b&&(d.started_at??0)>(l??0))continue}let u=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Ht(e,a.bead_id),can_pause:i==="running"&&u,can_resume:i!=="running"&&u&&!n.has(a.attempt_id)})}return o}function jc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function At(e){return e&&typeof e=="object"?e:{}}function ga(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let k of s)k&&typeof k.root_dir=="string"&&a.set(k.root_dir,k);let i=[],l=[],d=[],u=[],p=[],b=[],R=new Map,T=new Map,P=new Map;for(let k of n){if(!k||typeof k.root_dir!="string")continue;let W=k.root_dir,oe=k.name||W,ue=a.get(W),Q=ue&&typeof ue.revision=="number"?ue.revision:typeof k.revision=="number"?k.revision:0,se=At(k.attempts),Le=At(k.bead_titles),ze=At(k.pr_observations),Xe=At(k.admission),at=At(k.revise_parked),rt=At(k.merge_queue_state),nt=At(k.cleanup_failed),_e=At(k.discard_operations),qe=At(k.bead_blocked_by),fe=At(k.pr_activity),xe=Array.isArray(k.repo_operations)?k.repo_operations:[],Ee=Array.isArray(k.merge_queue)?k.merge_queue:[],Fe=new Set(Ee.filter(H=>H&&typeof H.bead_id=="string").map(H=>H.bead_id)),ve=new Map(Ee.filter(H=>H&&typeof H.bead_id=="string").map(H=>[H.bead_id,H])),je=Array.isArray(k.queue)?k.queue:[],Oe=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).filter(H=>H&&/^s[1-5]$/.test(H.id)&&Array.isArray(H.entries)),ge=At(k.lane_states),he=typeof k.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(k.serial_lane_count))):Math.min(5,Oe.length);P.set(W,he);let G=new Map(Oe.map(H=>[H.id,H])),V=new Map;for(let H of Oe)for(let re of H.entries)re&&typeof re.bead_id=="string"&&V.set(re.bead_id,H.id);let ye=Array.isArray(k.done)?k.done:[];for(let H of ye)H&&typeof H.bead_id=="string"&&b.push({id:H.bead_id,root_dir:W,workspace_name:oe});let Te=new Map;for(let H of ye)H&&typeof H.bead_id=="string"&&typeof H.added_at=="number"&&Te.set(H.bead_id,H.added_at);let Ue=H=>({id:H,title:Le[H]||H,root_dir:W,workspace_name:oe,expected_revision:Q,draggable:!1}),He=new Set;for(let[H,re]of W_(se,Te))He.add(H),l.push({...Ue(H),lane:"running",...V.has(H)?{serial_lane_id:V.get(H)}:{},attempt_id:re.attempt_id,run_state:re.run_state,can_pause:re.can_pause,can_resume:re.can_resume,started_at:re.started_at,last_event_at:re.last_event_at,runner:re.runner,model:re.model,effort:re.effort,speed:re.speed,resumed_from:re.resumed_from,continuation_mode:re.continuation_mode,usage:re.usage,discard:cr(_e,H,{attempt_id:re.attempt_id}),badges:re.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:re.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:re.run_state==="failed"});for(let H of Array.isArray(k.pr_wait)?k.pr_wait:[]){let re=H&&H.bead_id;if(typeof re!="string"||He.has(re))continue;He.add(re);let Ce=At(ze[re]),We=At(Ce.pr),pe=Ce.gate?At(Ce.gate):null,m=Fe.has(re),$=ve.get(re)?.continuation_action||null,x=!!$&&$.continuation===null,D=rt.active===re,K=H.external===!0,Y=nt[re]||null,ne=At(fe[re]),le=Fn({bead_id:re,merge_sha:H.merge_sha,cleanup_cursor:H.cleanup_cursor,merge_progress:ne.merge_progress||null,cleanup_failed:Y,repo_operations:xe}),be=Zs(le),we=!!pe&&pe.base_badge==="\uCDA9\uB3CC",Me=!!Y&&["child_sweep","branch_cleanup","parent_close"].includes(Y.step)&&!!pe&&pe.tier==="merged",Pe=K&&!!Y&&!!pe&&pe.tier==="merged",ke=!!pe&&["closed_unmerged","review","undecidable"].includes(pe.tier),Ve=cr(_e,re,{external:K,merge_active:D||le?.step==="merge",merge_queued:m,cleanup_active:be,merged:!!Y||pe?.tier==="merged"}),U=!!Ve.operation;d.push({...Ue(re),lane:"pr_wait",pr_number:typeof We.number=="number"?We.number:null,pr_url:typeof We.url=="string"?We.url:void 0,external:K,usage:Ht(se,re),merge_step:le,badges:x?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:le?[pe?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Y?[zr(Y.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${zr(Y.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof pe?.gate_badge=="string"&&pe.gate_badge.length>0?[pe.gate_badge]:[],alert:le?le.failed===!0:!!Y||ke,reason:Y&&le?.active!==!0?Ys(Y.step):"PR \uB300\uAE30",merge_action:pe?.tier==="merged"&&!Me&&!Pe?!1:!m||x,merge_enabled:!U&&(x||pe?.enabled===!0||we||Me||Pe),merge_label:x?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Pe||Me?"\uC815\uB9AC \uC7AC\uAC1C":we&&!Me?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:x?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":U?Ve.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ve.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ve.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Pe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Me?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":we?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":pe?.enabled===!0?`\uBA38\uC9C0 (${pe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${pe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:m&&!x,cancel_enabled:!D,continuation_mismatch:$?.mismatch||null,discard:Ve,discard_action:Ve.action,discard_enabled:Ve.enabled,discard_title:Ve.title})}let Ae=(H,re,Ce,We)=>{let pe=H&&H.bead_id;if(typeof pe!="string"||He.has(pe))return null;He.add(pe);let m=at[pe],$=cr(_e,pe),x=$.operation?$:null,D={...Ue(pe),lane:re,draggable:!x,discard:x||void 0,reason:jc(Xe,pe),queue_position:Ce+1,queue_index:Ce,queue_length:We,badges:m?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!m,revise_action:!!m,revise_enabled:!!m&&!x,revise_title:m?m.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${m.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(qe,pe)&&(D.blocked_by=Array.isArray(qe[pe])?qe[pe].filter(K=>typeof K=="string"&&K.length>0):[]),D};for(let H=0;H<je.length;H++){let re=Ae(je[H],"queue",H,je.length);if(!re)continue;u.push(re);let Ce=R.get(W);Ce?Ce.push(re):R.set(W,[re])}let st=[];for(let H=0;H<Oe.length;H++){let re=Oe[H],Ce=[];for(let pe=0;pe<re.entries.length;pe++){let m=Ae(re.entries[pe],re.id,pe,re.entries.length);m&&(Ce.push(m),u.push(m))}if(Ce.length===0)continue;let We=At(ge[re.id]);st.push({id:re.id,index:H,items:Ce,occupied_by:Array.isArray(We.occupied_by)?We.occupied_by.filter(pe=>typeof pe=="string"):[],corrections:Array.isArray(We.corrections)?We.corrections.length:0,cycle:We.cycle===!0})}T.set(W,st);let Qe=Array.from({length:he},(H,re)=>{let Ce=`s${re+1}`,We=G.get(Ce),pe=We&&Array.isArray(We.entries)?We.entries:[],m=At(ge[Ce]);return{id:Ce,index:pe.length,length:pe.length,occupied_by:Array.isArray(m.occupied_by)?m.occupied_by.filter($=>typeof $=="string"):[]}});for(let H of Array.isArray(k.runnable)?k.runnable:[]){let re=H&&H.bead_id;typeof re!="string"||He.has(re)||(He.add(re),i.push({...Ue(re),title:H.title||Le[re]||re,lane:"runnable",draggable:!0,reason:jc(Xe,re),created_at:H.created_at??void 0,updated_at:H.updated_at??void 0,labels:Array.isArray(H.labels)?H.labels:[],spec_reviewer:typeof H.spec_reviewer=="string"?H.spec_reviewer:void 0,plan_state:H.plan_state==="approved"||H.plan_state==="authored"?H.plan_state:"none",workflow:H.route?{route:H.route,chips:{route:H.route}}:null,blocked:H.blocked===!0,...Array.isArray(H.blocked_by)?{blocked_by:H.blocked_by.filter(Ce=>typeof Ce=="string"&&Ce.length>0)}:{},place_index:je.length,place_lanes:Qe}))}for(let H of ye){let re=H&&H.bead_id;if(typeof re!="string"||He.has(re)||(He.add(re),o!==void 0&&typeof H.added_at=="number"&&H.added_at<o))continue;let Ce=U_(se,re);p.push({...Ue(re),lane:"done",done:!0,usage:Ht(se,re),done_at:typeof H.added_at=="number"?H.added_at:void 0,done_kind:Ce&&typeof Ce.done_kind=="string"?Ce.done_kind:null})}}let B=new Map;s.forEach((k,W)=>{k&&typeof k.root_dir=="string"&&B.set(k.root_dir,W)});let ee=r&&r.running_sort==="repo"?"repo":"started";l.sort((k,W)=>{if(ee==="repo"){let Q=B.get(k.root_dir)??Number.MAX_SAFE_INTEGER,se=B.get(W.root_dir)??Number.MAX_SAFE_INTEGER;if(Q!==se)return Q-se}let oe=typeof k.started_at=="number"&&Number.isFinite(k.started_at)?k.started_at:null,ue=typeof W.started_at=="number"&&Number.isFinite(W.started_at)?W.started_at:null;return oe!==null&&ue!==null&&oe!==ue?oe-ue:oe===null&&ue!==null?1:oe!==null&&ue===null?-1:k.id.localeCompare(W.id)}),p.sort((k,W)=>(W.done_at??0)-(k.done_at??0));let Z=s.length>0?s:n.map(k=>({root_dir:k&&k.root_dir,name:k&&k.name,auto_advance:k&&k.auto_advance,auto_merge:k&&k.auto_merge,slots:k&&k.slots,revision:k&&k.revision,runner_catalog:k&&k.runner_catalog})),z=[];for(let k of Z){if(!k||typeof k.root_dir!="string")continue;let W=R.get(k.root_dir)||[],oe=T.get(k.root_dir)||[];z.push({root_dir:k.root_dir,name:k.name||k.root_dir,auto_advance:k.auto_advance===!0,auto_merge:k.auto_merge===!0,slots:typeof k.slots=="number"&&k.slots>=jn?k.slots:jn,revision:typeof k.revision=="number"?k.revision:0,runner_catalog:At(k.runner_catalog),items:W,sublanes:{parallel:W,serial:oe},serial_lane_count:P.get(k.root_dir)||0})}let L={runnable:i,queue:u,queue_groups:z,running:l,pr_wait:d,done:p,automation:{total:z.length,both_on:z.filter(k=>k.auto_advance&&k.auto_merge).length}},S=ia(L);for(let k of b)S.has(k.id)||S.set(k.id,{root_dir:k.root_dir,workspace_name:k.workspace_name,lane:"done",state:"done"});for(let k of[...L.queue,...L.runnable]){if(!Object.hasOwn(k,"blocked_by"))continue;let W=S.get(k.id);k.blockers=(k.blocked_by||[]).map(oe=>wc(oe,W,S,s)),k.blocker_warnings=k.blockers.filter(oe=>oe.missing_internal).map(oe=>`\u26A0 \uC120\uD589 ${oe.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),k.blocker_warnings.length>0&&(k.alert=!0)}let q=kc(L.queue_groups);for(let k of L.queue_groups)for(let W of k.sublanes.serial){let oe=q.get(xc(k.root_dir,W.id));oe&&(W.cross_wait_peers=oe)}return L}function z_(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<F_;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${kt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${jt(e,t)}</span
        >`}</span
  >`}function Bn(e){return c`<div class="mon-c__title">${e.title}</div>`}function Un(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Qs(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function ba(e){let t=xt(e.usage),r=Qt(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${nn(e.usage)}
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
  </span>`}function G_(e,t){let r=typeof e.started_at=="number"?pa(t-e.started_at):"";return c`${Bn(e)}
    <div class="mon-c__meta">
      ${ha(e)}${z_(e.last_event_at,t)}${Un(e)}${Qs(e)}
      ${ar(e)?c`<span class="mon-c__model">${ar(e)}</span>`:""}
      ${Sr(e)?c`<span
            class="rtile__resumed"
            title=${Sr(e)}
            >↻</span
          >`:""}
      ${e.serial_lane_id?c`<span class="mon-c__lane">${e.serial_lane_id}</span>`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${ba(e)}${H_(e)}${kr(e)}
    </div>`}function V_(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=jt(e.updated_at);return c`${Bn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Un(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?c`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?c`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${ps(e.labels,null).map(l=>c`<span class="ctl-chip ctl-chip--label">${l}</span>`)}
      ${Qs(e)}
      ${i?c`<span title=${`\uC218\uC815 ${kt(e.updated_at)}`}
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
    ${Uc(e)}`}function K_(e){let t=!!e.discard?.operation;return c`${Bn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Un(e)}
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
    ${Uc(e)} ${kr(e)}
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
        </div>`:""}`}function Y_(e){let t=e.merge_step||null,r=!!(Qt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return c`${Bn(e)}
    <div class="mon-c__meta">
      ${Un(e)}${Qs(e)}
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
          ${kr(e)}
        </div>`:""}`}function Z_(e,t){let r=e.done_kind||"",n=r?j_[r]||r:"",s=jt(e.done_at,t);return c`${Bn(e)}
    <div class="mon-c__meta">
      ${Un(e)}${Qs(e)}
      ${n?c`<span
            class="mon-live__kind${B_.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${ba(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${kt(e.done_at)}`}
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
          min=${jn}
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
  </div>`}function Vc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Kc(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return xt(ys(t));let r={};for(let i of gr)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let d=!1;for(let u of gr){let p=l[u];typeof p=="number"&&Number.isFinite(p)&&(r[u]+=p,n=!0,d=!0)}if(d){o+=1;let u=l.total_cost_usd;typeof u=="number"&&Number.isFinite(u)&&(s+=u,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Qt(r):null}var Yc="bdui.monitor.done-range",Zc="bdui.monitor.running_sort",Xc="beads-ui.monitor.candidate-filter",ya={show_blocked:!1};function X_(){try{let e=window.localStorage.getItem(Xc);if(!e)return{...ya};let t=JSON.parse(e);return!t||typeof t!="object"?{...ya}:{show_blocked:t.show_blocked===!0}}catch{return{...ya}}}function Q_(e){try{window.localStorage.setItem(Xc,JSON.stringify({show_blocked:e.show_blocked}))}catch{}}function J_(e,t){if(t.show_blocked)return{visible:e,hidden_blocked:0};let r=e.filter(n=>n.blocked!==!0);return{visible:r,hidden_blocked:e.length-r.length}}function em(){try{let e=window.localStorage.getItem(Yc);return zt(e)?e:Ft}catch{return Ft}}function tm(e){try{window.localStorage.setItem(Yc,e)}catch{}}function rm(){try{return window.localStorage.getItem(Zc)==="repo"?"repo":"started"}catch{return"started"}}function nm(e){try{window.localStorage.setItem(Zc,e)}catch{}}var Qc="tab:monitor:pipeline",sm=1e3,om=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Js(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return c`<div
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
          ${e.sublanes.parallel.map(s=>Js(s,t))}
        </div>
      </section>`:c`<div class="mon-group__list">
        ${e.items.map(s=>Js(s,t))}
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
                ${s.items.map(o=>Js(o,t))}
              </div>
            </section>`):""}
  </div>`}function Jc(e,t){let r=_t("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,l=t.now||(()=>Date.now()),d=t.confirm||(m=>typeof globalThis.confirm!="function"||globalThis.confirm(m)),u=em(),p=rm(),b=X_();function R(){let m=or.find($=>$.value===u);return m?m.label:""}let T=document.createElement("div");T.className="mon",e.appendChild(T);let P=ga(null,null),B=new Map,ee=null,Z=null;async function z(m,$,x,D,K=!0){if(!o||!x)return null;let Y=await o(m,{...$,root_dir:x,expected_revision:D});if(Y&&Y.conflict&&K){Y.queue&&B.set(x,Y.queue);let ne=Y.queue&&typeof Y.queue.revision=="number"?Y.queue.revision:D;Y=await o(m,{...$,root_dir:x,expected_revision:ne})}return Y&&Y.queue&&x&&B.set(x,Y.queue),Y}function L(m,$){let x=B.get(m),D=s&&s.get?s.get():null,K=(Array.isArray(D)?D:[]).find(ne=>ne?.root_dir===m);return(x||K)?.merge_queue?.find(ne=>ne.bead_id===$)?.continuation_action}async function S(m,$,x,D){let K=await z(m,$,x,D),Y=B.get(x)?.revision??K?.queue?.revision??D;return mr(K,(ne,le)=>z(m,{...$,continuation:ne,decision_token:le},x,Y,!1),{refresh:ne=>z(m,$,x,ne?.queue?.revision??B.get(x)?.revision??Y,!1)})}async function q(m,$,x,D){let K=await mr({continuation_mismatch:D},(ne,le)=>z("worker-merge-queue-add",{bead_id:$,continuation:ne,decision_token:le},m,x,!1)),Y=K?.queue?.merge_queue?.find(ne=>ne.bead_id===$)?.continuation_action;K?.applied!==!0&&Y?.continuation===null&&Y.mismatch&&await q(m,$,K.queue.revision,Y.mismatch)}async function k(m,$,x){let D=await z("worker-discard",m,$,x);if(D&&D.discarded===!0){ae(Vs(D),"success",5e3);return}if(D&&D.reason){ae(`\uD3D0\uAE30 \uC2E4\uD328: ${D.reason}`,"error");return}if(D&&D.accepted&&D.pending==="merged_revert"){ae("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(D&&D.accepted){ae(`\uD3D0\uAE30 \uC9C4\uD589: ${D.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}D&&!D.conflict&&ae("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function W(m,$,x){return!o||!x?null:await o(m,{...$,root_dir:x})}async function oe(m){if(!o||!m&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let $=await o("monitor-auto-toggle",{on:m}),x=$&&Array.isArray($.failed)?$.failed:[];x.length>0&&ae(`\uC790\uB3D9\uD654 ${m?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${x.map(D=>D.root_dir).join(", ")}`,"error",3200)}async function ue(){let m=new Map;for(let $ of P.pr_wait)m.has($.root_dir)||m.set($.root_dir,$.expected_revision);for(let[$,x]of m)await z("worker-merge-queue-add-all",{},$,x)}let Q=null,se=!1,Le=null;function ze(){Le!==null&&clearTimeout(Le),Le=setTimeout(()=>{Le=null,se=!1},0)}function Xe(m){let $=m.target;return typeof $?.closest=="function"?$.closest(".mon-group"):null}function at(m){let $=Xe(m);return!$||!Q?null:($.getAttribute("data-root-dir")||"")===Q.root_dir?$:null}function rt(){for(let m of Array.from(T.querySelectorAll(".mon-group--drag-over")))m.classList.remove("mon-group--drag-over")}function nt(m){let $=m.target,x=typeof $?.closest=="function"?$.closest('.mon-card[draggable="true"]'):null;if(x){Q={bead_id:x.getAttribute("data-issue-id")||"",lane:x.getAttribute("data-lane")||"",root_dir:x.getAttribute("data-root-dir")||"",revision:Number(x.getAttribute("data-revision")||0)||0,queue_index:Number(x.getAttribute("data-queue-index")),queue_length:Number(x.getAttribute("data-queue-length")),place_index:Number(x.getAttribute("data-place-index"))},se=!0;try{m.dataTransfer?.setData("text/plain",Q.bead_id),m.dataTransfer&&(m.dataTransfer.effectAllowed="move")}catch{}}}function _e(m){let $=at(m);$&&(m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect="move"),$.classList.add("mon-group--drag-over"))}function qe(m){Xe(m)?.classList.remove("mon-group--drag-over")}function fe(){Q=null,rt(),ze()}function xe(m){let $=at(m),x=Q;if(Q=null,rt(),!$||!x||!x.bead_id)return;m.preventDefault();let D=m.target,K=typeof D?.closest=="function"?D.closest('.mon-card[data-lane="queue"]'):null,Y=K&&$.contains(K)?Number(K.getAttribute("data-queue-index")):NaN;if(x.lane==="runnable"){let be=Number.isFinite(Y)?Y:x.place_index;if(!Number.isFinite(be))return;z("worker-queue-place",{bead_id:x.bead_id,index:be},x.root_dir,x.revision);return}if(x.lane!=="queue"||K&&K.getAttribute("data-issue-id")===x.bead_id)return;let ne=x.queue_index,le=Number.isFinite(Y)?ne>Y?Y:Y-1:x.queue_length-1;!Number.isFinite(le)||le<0||le===ne||z("worker-queue-reorder",{bead_id:x.bead_id,to_index:le},x.root_dir,x.revision)}function Ee(m){let $=J_(P.runnable,b),x={runnable:$.visible,queue:P.queue,running:P.running,pr_wait:P.pr_wait,done:P.done};return c`${Gc({automation:P.automation,counts:{running:P.running.length,queue:P.queue.length,pr_wait:P.pr_wait.length},running_sort:p,done_range:u,token_total:Kc(P.done),token_tooltip:Vc(R())})}
      <div class="worker-lanes mon-lanes">
        ${om.map(D=>{let K=x[D.lane],Y=D.lane==="queue"?P.queue_groups.length>0?c`${P.queue_groups.map(ne=>am(ne,m))}`:void 0:K.length>0?c`${K.map(ne=>Js(ne,m))}`:void 0;return rr({id:`monitor-${D.lane}`,lane:D.pane,title:D.lane==="done"?`\uC644\uB8CC\xB7${R()}`:D.title,items:K,empty:D.empty,body:Y,live:D.lane==="running"&&K.length>0,header_control:D.lane==="runnable"?c`<span class="mon-candidate-filter">
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
                    ${$.hidden_blocked>0?c`<span class="worker-filter__hidden"
                          >숨김 ${$.hidden_blocked}건</span
                        >`:""}
                  </span>`:D.lane==="pr_wait"&&K.length>0?c`<button
                      type="button"
                      class="mon-lane-op mon-merge-all"
                      title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                    >
                      일괄 머지
                    </button>`:""})})}
      </div>`}function Fe(){let m=s&&s.get?s.get():null,$=s&&s.getWorkspacesState?s.getWorkspacesState():[],x=l();P=ga(m,$,{done_since:Nr(u,x),running_sort:p}),Ze(Ee(x),T)}function ve(m,$){let x=a?a():void 0;if(!$||!x||$===x||!i){n(m);return}i($).then(()=>{n(m)}).catch(D=>{r("workspace switch for %s failed: %o",$,D)})}function je(m){return{root_dir:m.getAttribute("data-root-dir")||"",revision:Number(m.getAttribute("data-revision")||0)||0}}function Oe(m){if(typeof m=="string"&&m.length>0)return m;if(m&&typeof m=="object"){let $=m;if(typeof $.message=="string"&&$.message.length>0)return $.message;if(typeof $.error=="string"&&$.error.length>0)return $.error;if($.error&&typeof $.error=="object"&&typeof $.error.message=="string")return $.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function ge(m,$){let x=m.querySelector(".mon-link__trigger"),D=m.querySelector(".mon-link__popover"),K=m.querySelector(".mon-link__error");!x||!D||!K||(Te(),D.hidden=!1,x.setAttribute("aria-expanded","true"),K.textContent=$,K.hidden=!1)}async function he(m,$,x){let D=$.getAttribute("data-root-dir")||"",K=$.getAttribute("data-issue-id")||"";if(!(!K||!x||x===K))try{await W(m,{a:K,b:x},D),Te()}catch(Y){ge($,Oe(Y))}}function G(m,$){let{root_dir:x,revision:D}=je(m),K=m.getAttribute("data-issue-id")||"",Y=$.dataset.attemptId||m.getAttribute("data-attempt-id")||"",ne=$.classList;if(ne.contains("mon-link__trigger")){He($);return}if(ne.contains("mon-link__candidate")||ne.contains("mon-link__direct")){let le=$.dataset.targetId||"";he("dep-add",m,le);return}if(ne.contains("mon-blocker__remove")){let le=$.dataset.blockerId||"";he("dep-remove",m,le);return}if(ne.contains("mon-place__choice")){let le=$.dataset.lane||"parallel",be=Number($.dataset.placeIndex||0)||0;Te(),z("worker-queue-place",{bead_id:K,...le==="parallel"?{}:{lane:le},index:be},x,D);return}if(ne.contains("worker-card__place")){Ue($);return}if(ne.contains("mon-op--up")||ne.contains("mon-op--down")){let le=Number(m.getAttribute("data-queue-index")||0)||0,be=ne.contains("mon-op--up")?le-1:le+1;if(be<0)return;z("worker-queue-reorder",{bead_id:K,.../^s[1-5]$/.test(m.dataset.lane||"")?{lane:m.dataset.lane}:{},to_index:be},x,D);return}if(ne.contains("mon-op--remove")){z("worker-queue-remove",{bead_id:K},x,D);return}if(ne.contains("mon-op--pause")){W("worker-attempt-pause",{attempt_id:Y},x);return}if(ne.contains("mon-op--discard")){if(!d(Dn(K,"unmerged")))return;k({bead_id:K,...Y?{attempt_id:Y}:{},...$.dataset.operationId?{operation_id:$.dataset.operationId}:{}},x,D);return}if(ne.contains("mon-op--resume")){tn().then(le=>{if(le!==null)return S("worker-attempt-resume",{attempt_id:Y,...le!==""?{instructions:le}:{}},x,D)});return}if(ne.contains("mon-op--dismiss")){z("worker-attempt-dismiss",{attempt_id:Y},x,D);return}if(ne.contains("worker-mini__merge")){let le=L(x,K);le?.mismatch&&le.continuation===null?q(x,K,D,le.mismatch):z("worker-merge-queue-add",{bead_id:K},x,D);return}if(ne.contains("worker-mini__merge-cancel")){z("worker-merge-queue-remove",{bead_id:K},x,D);return}if(ne.contains("worker-mini__discard")){let le=$.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(Dn(K,le)))return;k({bead_id:K,...Y?{attempt_id:Y}:{},...$.dataset.operationId?{operation_id:$.dataset.operationId}:{}},x,D);return}if(ne.contains("worker-mini__revise-fix")){S("worker-revise-fix",{bead_id:K},x,D);return}ne.contains("worker-mini__revise-approve")&&z("worker-revise-approve",{bead_id:K},x,D)}function V(m){m.querySelector(".mon-link__list")?.replaceChildren();let x=m.querySelector(".mon-link__search");x&&(x.value="");let D=m.querySelector(".mon-link__direct");D&&(D.hidden=!0,D.dataset.targetId="",D.textContent="");let K=m.querySelector(".mon-link__empty");K&&(K.hidden=!0);let Y=m.querySelector(".mon-link__error");Y&&(Y.hidden=!0,Y.textContent="")}function ye(m,$){let x=m.querySelector(".mon-link__list");if(!x)return;let D=document.createDocumentFragment(),K=$c(P).filter(Y=>Y.id!==$);for(let Y of K){let ne=document.createElement("button");ne.type="button",ne.className="mon-link__candidate",ne.dataset.targetId=Y.id,ne.dataset.search=`${Y.id} ${Y.title} ${Y.location}`.toLocaleLowerCase();let le=document.createElement("strong");le.textContent=Y.id;let be=document.createElement("span");be.textContent=Y.title;let we=document.createElement("small");we.textContent=Y.location,ne.append(le,be,we),D.append(ne)}x.replaceChildren(D)}function Te(){for(let m of Array.from(T.querySelectorAll(".mon-card-popover"))){let $=m;$.hidden=!0,$.classList.contains("mon-link__popover")&&V($)}for(let m of Array.from(T.querySelectorAll('[aria-expanded="true"]')))m.setAttribute("aria-expanded","false")}function Ue(m){let x=m.closest(".mon-place")?.querySelector(".mon-place__popover")||null;if(!x)return;let D=x.hidden;Te(),D&&(x.hidden=!1,m.setAttribute("aria-expanded","true"))}function He(m){let x=m.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!x)return;let D=x.hidden;if(Te(),D){let K=m.closest(".mon-card");ye(x,K?.getAttribute("data-issue-id")||""),x.hidden=!1,m.setAttribute("aria-expanded","true");let Y=x.querySelector(".mon-link__search");Y&&(Ae(Y),Y.focus())}}function Ae(m){let $=m.closest(".mon-link__popover"),x=m.closest(".mon-card");if(!$||!x)return;let D=m.value.trim(),K=D.toLocaleLowerCase(),Y=0,ne=!1;for(let Pe of Array.from($.querySelectorAll(".mon-link__candidate"))){let ke=Pe,Ve=ke.dataset.targetId||"",U=K.length===0||(ke.dataset.search||"").includes(K);ke.hidden=!U,U&&(Y+=1),Ve.toLocaleLowerCase()===K&&(ne=!0)}let le=$.querySelector(".mon-link__direct"),be=x.getAttribute("data-issue-id")||"";if(le){let Pe=D.length>0&&!ne&&K!==be.toLocaleLowerCase();le.hidden=!Pe,le.dataset.targetId=Pe?D:"",le.textContent=Pe?`\uC9C1\uC811 \uC785\uB825 \xB7 ${D}`:"",Pe&&(Y+=1)}let we=$.querySelector(".mon-link__empty");we&&(we.hidden=Y>0);let Me=$.querySelector(".mon-link__error");Me&&(Me.hidden=!0,Me.textContent="")}function st(m){let $=m.target;$&&T.contains($)&&typeof $.closest=="function"&&$.closest(".mon-popover-owner")||Te()}function Qe(m){if(m.key!=="Escape")return;let $=T.querySelector('[aria-expanded="true"]');Te(),$?.focus()}function H(m){let $=se;se=!1;let x=m.target;if(!x||typeof x.closest!="function"||x.closest("dialog")||x.closest("a"))return;let D=x.closest(".mon-running-sort");if(D){m.preventDefault(),p=D.getAttribute("data-sort")==="repo"?"repo":"started",nm(p),Fe();return}let K=x.closest(".mon-auto-all");if(K){m.preventDefault(),oe(K.getAttribute("data-on")==="true");return}if(x.closest(".mon-merge-all")){m.preventDefault(),ue();return}let ne=x.closest(".mon-ctl--advance");if(ne){m.preventDefault();let{root_dir:Pe,revision:ke}=je(ne);z("worker-automation-toggle",{on:ne.getAttribute("data-on")==="true"},Pe,ke);return}let le=x.closest(".mon-ctl--merge-auto");if(le){m.preventDefault();let{root_dir:Pe,revision:ke}=je(le);z("worker-merge-auto-toggle",{on:le.getAttribute("data-on")==="true"},Pe,ke);return}let be=x.closest(".mon-card");if(!be)return;let we=x.closest("button");if(we){m.preventDefault(),G(be,we);return}let Me=be.getAttribute("data-issue-id");Me&&!$&&(m.preventDefault(),ve(Me,be.getAttribute("data-root-dir")||""))}function re(m){let $=m.target;if(!$||typeof $.closest!="function")return;let x=$.closest(".mon-filter__blocked");if(x){b={show_blocked:x.checked},Q_(b),Fe();return}let D=$.closest(".mon-done-range");if(D){u=zt(D.value)?D.value:Ft,tm(u),Fe();return}let K=$.closest(".mon-slots__input");if(!K)return;let{root_dir:Y,revision:ne}=je(K),le=Number(K.value);if(!Number.isFinite(le))return;let be=Math.max(jn,Math.floor(le));z("worker-queue-set-slots",{slots:be},Y,ne)}function Ce(m){let $=m.target;$?.classList.contains("mon-link__search")&&Ae($)}e.addEventListener("click",H),e.addEventListener("change",re),e.addEventListener("input",Ce),e.addEventListener("dragstart",nt),e.addEventListener("dragover",_e),e.addEventListener("dragleave",qe),e.addEventListener("drop",xe),e.addEventListener("dragend",fe),document.addEventListener("click",st),document.addEventListener("keydown",Qe),s&&typeof s.subscribe=="function"&&(ee=s.subscribe(()=>{try{B.clear(),Fe()}catch{}}));function We(){Z!==null&&(clearInterval(Z),Z=null)}function pe(){Le!==null&&(clearTimeout(Le),Le=null)}return{load(){r("load"),Fe(),Z===null&&(Z=setInterval(()=>{try{if(T.querySelector(".mon-card-popover:not([hidden])"))return;Fe()}catch{}},sm))},pause(){We()},clear(){We(),pe(),ee&&(ee(),ee=null),e.removeEventListener("click",H),e.removeEventListener("change",re),e.removeEventListener("input",Ce),e.removeEventListener("dragstart",nt),e.removeEventListener("dragover",_e),e.removeEventListener("dragleave",qe),e.removeEventListener("drop",xe),e.removeEventListener("dragend",fe),document.removeEventListener("click",st),document.removeEventListener("keydown",Qe),e.replaceChildren()}}}function ed(e,t,r){let n=_t("views:nav"),s=null;function o(l){return d=>{d.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),d=l.view==="worker"||l.view==="monitor"?l.view:"board";return c`
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
    `}function i(){Ze(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Ze(c``,e)}}}var td=["bug","feature","task","epic","chore"];function rd(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var nd=["Critical","High","Medium","Low","Backlog"];function sd(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),u=r.querySelector("#btn-cancel"),p=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function R(){o.replaceChildren();let S=document.createElement("option");S.value="",S.textContent="\u2014 Select \u2014",o.appendChild(S);for(let q of td){let k=document.createElement("option");k.value=q,k.textContent=rd(q),o.appendChild(k)}a.replaceChildren();for(let q=0;q<=4;q+=1){let k=document.createElement("option");k.value=String(q);let W=nd[q]||"Medium";k.textContent=`${q} \u2013 ${W}`,a.appendChild(k)}}R();function T(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function P(S){s.disabled=S,o.disabled=S,a.disabled=S,i.disabled=S,l.disabled=S,u.disabled=S,p.disabled=S,p.textContent=S?"Creating\u2026":"Create"}function B(){d.textContent=""}function ee(S){d.textContent=S}function Z(){try{let S=window.localStorage.getItem("beads-ui.new.type");S?o.value=S:o.value="";let q=window.localStorage.getItem("beads-ui.new.priority");q&&/^\d$/.test(q)?a.value=q:a.value="2"}catch{o.value="",a.value="2"}}function z(){let S=o.value||"",q=a.value||"";S.length>0&&window.localStorage.setItem("beads-ui.new.type",S),q.length>0&&window.localStorage.setItem("beads-ui.new.priority",q)}async function L(){B();let S=String(s.value||"").trim();if(S.length===0){ee("Title is required"),s.focus();return}let q=Number(a.value||"2");if(!(q>=0&&q<=4)){ee("Priority must be 0..4"),a.focus();return}let k=String(o.value||""),W=String(l.value||""),oe={title:S};k.length>0&&(oe.type=k),String(q).length>0&&(oe.priority=q),W.length>0&&(oe.description=W),P(!0);try{await t("create-issue",oe)}catch{P(!1),ee("Failed to create issue");return}z(),P(!1),T()}return r.addEventListener("cancel",S=>{S.preventDefault(),T()}),b.addEventListener("click",()=>T()),u.addEventListener("click",()=>T()),r.addEventListener("keydown",S=>{S.key==="Enter"&&(S.ctrlKey||S.metaKey)&&(S.preventDefault(),L())}),n.addEventListener("submit",S=>{S.preventDefault(),L()}),{open(){n.reset(),B(),Z();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){T()}}}var im=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function lm(e,t){return $o(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function od(e,t,r){return c`
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
  `}var cm=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Bt="";function Nt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ld(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(m=>ae(m,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",l=!1,d="",u={},p={},b=[],R=!1,T=null,P={},B="",ee="",Z=!1,z=!1,L=!1,S=null;function q(){let m=t.queueStore?.get();return Nt(m)?m.runner_catalog:null}function k(){let m=t.queueStore?.get();return Nt(m)&&Nt(m.execution_defaults)?m.execution_defaults:null}function W(){let m=t.implPresetStore?.get();return Nt(m)&&Array.isArray(m.presets)?m:null}async function oe(){R=!0,Ae();try{let m=await r("get-session-defaults",{});u=Nt(m?.values)?{...m.values}:{},p={...u},b=Array.isArray(m?.warnings)?m.warnings:[]}catch(m){b=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${m instanceof Error?m.message:String(m)}`)}finally{R=!1,Ae()}}async function ue(){let m=Ql(u,p);if(Object.keys(m).length!==0){try{let $=await r("set-session-defaults",{values:m});u=Nt($?.values)?{...$.values}:{},p={...u},b=Array.isArray($?.warnings)?$.warnings:[]}catch($){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}Ae()}}function Q(m,$){$===Bt?delete p[m]:p[m]=$,Ae(),ue()}async function se(){let m=t.queueStore?.get();if(!Nt(m))return;let $={orchestration_model:m.orchestration_model??null,orchestration_effort:m.orchestration_effort??null,orchestration_speed:m.orchestration_speed??null},x=Jl($,{...$,...P});if(Object.keys(x).length!==0){try{let D=await r("worker-queue-set-orchestration-defaults",{expected_revision:m.revision,values:x});if(D&&D.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}P={}}catch(D){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${D instanceof Error?D.message:String(D)}`)}Ae()}}function Le(m,$){P[m]=$===Bt?null:$,Ae(),se()}async function ze(m){let $=t.queueStore?.get();if(!(!Nt($)||m<1)){try{await r("worker-queue-set-slots",{expected_revision:$.revision,slots:m})}catch(x){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}Ae()}}function Xe(){let m={},$=t.queueStore?.get();for(let x of Yl){let D=Cr.includes(x)?Nt($)?$[x]:void 0:p[x];typeof D=="string"&&D.length>0&&(m[x]=D)}return m}async function at(){let m=W();if(!m)return;let $=Xe();if(Object.keys($).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let x=(m.presets||[]).find(K=>K.id===B),D=ee.trim()||(x?x.name:"");if(!D){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let K=x?await r("impl-preset-update",{expected_revision:m.revision,id:x.id,name:D,settings:$}):await r("impl-preset-create",{expected_revision:m.revision,name:D,settings:$});if(K&&K.applied){if(ee="",!x&&Array.isArray(K.presets)){let Y=K.presets.find(ne=>ne.name===D);B=Y?Y.id:B}Ae()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ae()}catch(K){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}}async function rt(){let m=W();if(!(!m||B.length===0))try{let $=await r("impl-preset-delete",{expected_revision:m.revision,id:B});$&&$.applied?(B="",Ae()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ae())}catch($){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}}async function nt(){let m=W(),$=t.queueStore?.get();if(!(!m||!Nt($)||B.length===0)){try{let x=await r("apply-impl-preset-global",{preset_id:B,expected_revision:m.revision,expected_queue_revision:$.revision});x&&x.applied?(u=Nt(x.values)?{...x.values}:{},p={...u},b=Array.isArray(x.warnings)?x.warnings:[],Nt(x.queue)&&(t.queueStore?.set?.(x.queue),P={}),x.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694")):x&&x.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(x){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}Ae()}}async function _e(){z=!0,L=!1,Ae();try{let m=await r("get-worker-system-prompt",{});!m||typeof m!="object"||Array.isArray(m)?L=!0:S=m}catch{L=!0}finally{z=!1,Ae()}}function qe(){if(Z=!Z,Z&&!S){_e();return}Ae()}function fe(){let m=on({loading:z,error:L});if(m)return m;if(!S)return"";let $=Array.isArray(S.variants)?S.variants:[];return c`<div class="settings-dialog__sp-body">
      ${S.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${S.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${$.map(x=>c`<div class="settings-dialog__sp-variant" data-variant=${x.key}>
            <div class="settings-dialog__sp-cond">${x.condition}</div>
            ${vr(x.label,x.system_prompt)}
          </div>`)}
    </div>`}function xe(){return c`<section
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
        @click=${qe}
      >
        ${Z?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${Z?fe():""}
    </section>`}function Ee(m,$,x,D,K,Y){let ne=K[m]??Bt,le=Qo(m,x,K,k(),q()),be=le.options.find(Me=>Me.value===ne),we=ne===Bt?le.full_value:be?.full_value;return c`<select
        class=${ne===Bt?"settings-dialog__unset":""}
        data-key=${m}
        aria-label=${$}
        title=${we||""}
        ?disabled=${Y===!0||le.disabled}
        .value=${Wr(String(ne))}
        @change=${Me=>D(m,String(Me.target.value))}
      >
        <option value=${Bt} ?selected=${ne===Bt}>
          ${le.unset_label}
        </option>
        ${le.options.map(Me=>c`<option
              value=${Me.value}
              title=${Me.full_value||""}
              ?selected=${Me.value===ne}
            >
              ${Me.label}
            </option>`)}
      </select>
      ${ne===Bt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Fe(m,$,x,D,K,Y=!1){return c`<div
      class=${`settings-dialog__row${Y?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${$}</span>
      <span class="settings-dialog__controls">
        ${Ee(m,$,x,D,K,Y)}
      </span>
    </div>`}function ve(m,$,x,D,K){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${$}-on)`}
        ></i>
        ${m}
      </span>
      <span class="settings-dialog__controls">
        ${Ee(x,`${m} \uBAA8\uB378`,D,Q,p,!1)}
        ${Ee(K,`${m} effort`,Fs,Q,p,!1)}
      </span>
    </div>`}function je(){let m=t.queueStore?.get(),$={};for(let x of Cr)$[x]=Object.prototype.hasOwnProperty.call(P,x)?P[x]:Nt(m)&&typeof m[x]=="string"?m[x]:null;return $}function Oe(){let m=q(),$=Xl(p),x=p.impl_runtime,D=p.impl_model,K=W(),Y=t.queueStore?.get(),ne=je(),le=Bs(m,T),be=an(m,T||void 0,ne.orchestration_model||lr).filter(ke=>ke!==lr),we=Nt(Y)&&typeof Y.slots=="number"?Y.slots:2,Me=k()?.supported===!0,Pe=Qo("workflow_mode",On,p,k(),m);return c`
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
        ${b.length>0?c`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${b.join(", ")}
            </div>`:""}
        ${Me?"":c`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${R?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="실행 프리셋"
                  .value=${Wr(B)}
                  @change=${ke=>{B=String(ke.target.value),Ae()}}
                >
                  <option value="" ?selected=${B===""}>
                    실행 프리셋…
                  </option>
                  ${(K?.presets||[]).map(ke=>c`<option
                        value=${ke.id}
                        ?selected=${ke.id===B}
                      >
                        ${ke.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  data-preset-apply-global
                  ?disabled=${B.length===0}
                  @click=${nt}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${B?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Wr(ee)}
                  @input=${ke=>{ee=String(ke.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${at}
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
                      .value=${Wr(T||Bt)}
                      @change=${ke=>{let Ve=String(ke.target.value);T=Ve===Bt?null:Ve,Ae()}}
                    >
                      <option
                        value=${Bt}
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
                ${Fe("orchestration_model","\uBAA8\uB378",le,Le,ne)}
                ${Fe("orchestration_effort","effort",be,Le,ne)}
                ${Fe("orchestration_speed","\uC18D\uB3C4",Ln,Le,ne)}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Bt}
                        aria-pressed=${String(!p.workflow_mode)}
                        @click=${()=>Q("workflow_mode",Bt)}
                      >
                        ${Pe.unset_label}
                      </button>
                      ${p.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${On.map(ke=>c`<button
                            type="button"
                            data-mode=${ke}
                            aria-pressed=${String(p.workflow_mode===ke)}
                            @click=${()=>Q("workflow_mode",ke)}
                          >
                            ${ke}
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
                ${ve("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Mn,"spec_review_effort")}
                ${ve("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",qs,"plan_review_effort")}
                ${ve("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Mn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${Fe("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",Ds,Q,p)}
                ${Fe("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ns,Q,p,$)}
                ${Fe("impl_model","\uBAA8\uB378",js(m,x),Q,p,$)}
                ${Fe("impl_effort","effort",an(m,x,D),Q,p,$)}
                ${Fe("impl_speed","\uC18D\uB3C4",Ln,Q,p,$)}
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
                        @click=${()=>ze(we-1)}
                      >
                        −
                      </button>
                      <span class="settings-dialog__stepper-value"
                        >${we}</span
                      >
                      <button
                        type="button"
                        aria-label="slots 증가"
                        @click=${()=>ze(we+1)}
                      >
                        +
                      </button>
                    </span>
                  </span>
                </div>
              </div>
              ${xe()}
            `}
      </section>
    `}function ge(){let m=n.get();return c`
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
              ${od(m,s(),ye)}
              ${ad(m,d,{onDraft:$=>{d=$},onAdd:Te,onRemove:Ue})}
              ${id(m,He)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function he(m){let $=n.get();if($)try{let x=await r("display-policy-set",{expected_revision:$.revision,policy:m($)});G(x),x&&x.conflict&&x.policy&&(x=await r("display-policy-set",{expected_revision:x.policy.revision,policy:m(x.policy)}),G(x)),x&&x.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function G(m){m&&m.policy&&typeof m.policy=="object"&&n.set(m.policy)}function V(m){he(m)}function ye(m){let $=n.get();if(!$)return;let x=!dm(m,$);V(D=>um(m,D,x))}function Te(){let m=d.trim();m.length!==0&&(d="",V($=>$.hidden_prefixes.includes(m)?{hidden_prefixes:$.hidden_prefixes}:{hidden_prefixes:[...$.hidden_prefixes,m]}),Ae())}function Ue(m){V($=>({hidden_prefixes:$.hidden_prefixes.filter(x=>x!==m)}))}function He(m){let $=n.get();if(!$)return;let x=$.chips[m]===!1;V(()=>({chips:{[m]:x}}))}function Ae(){Ze(c`
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
                  @click=${()=>st(m.id)}
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
            ${Oe()} ${ge()}
          </div>
        </div>
      `,a)}function st(m){i=m,Ae()}let Qe=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",Qe),a.addEventListener("cancel",Qe);let H=m=>{m.target===a&&pe()};a.addEventListener("click",H);let re=null;n.subscribe&&(re=n.subscribe(()=>{l&&Ae()}));let Ce=null;t.implPresetStore?.subscribe&&(Ce=t.implPresetStore.subscribe(()=>{l&&Ae()}));function We(m="execution"){l||(l=!0,t.onOpenChange?.(!0),i=m,d="",P={},Ae(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),oe())}function pe(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:We,close:pe,sessionDraft:()=>({...p}),destroy(){l=!1,a.removeEventListener("close",Qe),a.removeEventListener("cancel",Qe),a.removeEventListener("click",H),re&&(re(),re=null),Ce&&(Ce(),Ce=null),a.remove()}}}function dm(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function um(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var pm=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function cd(e){return String(e).padStart(2,"0")}function fm(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function _m(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${cd(n.getHours())}:${cd(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${pm[n.getMonth()]} ${n.getDate()} ${o}`;return`${fm(r,t)} \xB7 ${i}`}function mm(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var dd=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function ud(e){let t=!1,r=null,n=new Map;function s(){Ze(c``,e),e.hidden=!0}function o(){let l=dd.filter(u=>n.has(u.key));if(l.length===0){s();return}let d=Date.now();Ze(c`<div class="usage-meter" aria-label="Usage">
        ${l.map(u=>{let p=n.get(u.key),b=typeof p.ageSeconds=="number"&&p.ageSeconds>600,R=b?`${Math.floor(p.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${b?" usage-meter__group--stale":""}"
            aria-label=${`${u.label} usage`}
          >
            <span class="usage-meter__provider">${u.label}</span>
            ${p.windows.map(T=>{let P=typeof T.pct=="number"&&Number.isFinite(T.pct)?T.pct:0,B=Math.min(100,Math.max(0,P)),Z=`resets ${_m(T.resetsAt,d)}${b?` \xB7 ${R}`:""}`;return c`<span
                class="usage-meter__window ${mm(B)}"
                style=${`--progress: ${B}%`}
                title=${Z}
              >
                <span class="usage-meter__label">${T.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${B}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let d=await fetch(l.endpoint);if(!d.ok)return null;let u=await d.json();return!u||u.available!==!0||!Array.isArray(u.windows)?null:u}catch{return null}}async function i(){let l=await Promise.all(dd.map(async d=>({provider:d,payload:await a(d)})));if(!t){for(let d of l)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}function pd(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var gm="worker-ineligible";function va(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function wa(e){return va(e).includes(gm)}var bm="worker-serial";function ka(e){return va(e).includes(bm)}function $a(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var hm=new Set(["done","failed","orphaned","stopped","discarded"]),ym={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},vm={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},wm={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function xa(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:wm[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function fd(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,d=new Map,u=!1,p=null,b=null,R=null,T=new Set,P=!1,B=0,ee=null,Z=new Set;function z(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function L(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function S(){return o&&o()||""}async function q(){if(!s)return;let v=++B;P=!0,R=null,T.clear(),be();try{let C=await s("worker-parallel-analysis-targets",{root_dir:S()});if(v!==B||!we)return;let N=Array.isArray(C?.qualified)?C.qualified:[],F=Array.isArray(C?.excluded)?C.excluded:[];R={qualified:N,excluded:F};for(let me of N)me&&typeof me.id=="string"&&T.add(me.id)}catch{v===B&&we&&(R={qualified:[],excluded:[]},ae("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{v===B&&(P=!1,we&&be())}}function k(v){return Array.isArray(v.runs)?v.runs:[]}function W(){let v=z(),C=new Set;for(let N of Object.values(v.attempts||{})){let F=N;F&&typeof F.bead_id=="string"&&!hm.has(F.status)&&C.add(F.bead_id)}for(let N of Array.isArray(v.pr_wait)?v.pr_wait:[])N&&typeof N.bead_id=="string"&&C.add(N.bead_id);for(let N of Object.values(v.discard_operations||{})){let F=N;F&&F.phase!=="done"&&typeof F.bead_id=="string"&&C.add(F.bead_id)}return C}function oe(v){return v.filter(C=>ue(C)===null)}function ue(v){let C=z();for(let N of Array.isArray(C.serial_lanes)?C.serial_lanes:[])if(Array.isArray(N?.entries)&&N.entries.some(F=>F.bead_id===v))return N.id;return(Array.isArray(C.queue)?C.queue:[]).some(N=>N.bead_id===v)?"parallel":null}function Q(v,C){let N=l.get(v);return N||[...C.order]}function se(v){if(v.length<2)return!1;let C=ue(v[0]);if(!C||C==="parallel")return!1;let N=z(),F=(Array.isArray(N.serial_lanes)?N.serial_lanes:[]).find($e=>$e.id===C)?.entries.map($e=>$e.bead_id);if(!Array.isArray(F))return!1;let me=v.map($e=>F.indexOf($e));return me.every($e=>$e>=0)&&me.every(($e,ce)=>ce===0||$e>me[ce-1])}function Le(){let v=z(),C=Array.isArray(v.serial_lanes)?v.serial_lanes:[],N=C.find(F=>Array.isArray(F.entries)&&F.entries.length===0);return N?N.id:C[0]?.id||"s1"}function ze(v){let C=z().bead_titles||{};return typeof C[v]=="string"?C[v]:v}async function Xe(v,C){if(!s||u)return null;u=!0,be();try{return await s(v,C)}finally{u=!1,be()}}async function at(v){n?.setPending?.(!0);try{let C=await Xe("worker-parallel-analysis-start",{force:v,target_ids:Array.from(T)});C&&C.applied===!1&&C.reason&&(C.reason==="target_not_qualified"&&Array.isArray(C.detail)?ae(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${C.detail.join(", ")}`,"error",3200):ae(`\uBD84\uC11D \uC2E4\uD328: ${C.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function rt(){let v=L().job;!s||!v||await s("worker-parallel-analysis-cancel",{job_id:v.job_id})}async function nt(v){if(!(!s||Z.has(v))){Z.add(v),be();try{let C=await s("worker-parallel-analysis-prompt",{root_dir:S(),run_id:v});if(!we)return;if(C?.ok===!0&&typeof C.prompt=="string"){ee={run_id:v,prompt:C.prompt};return}ae(C?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{Z.delete(v),be()}}}function _e(){ee=null,be()}async function qe(){if(!ee)return;let v=await Xt(ee.prompt);ae(v?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",v?"success":"error",1400)}function fe(v,C){a&&a(v,xa(C))}function xe(){return z().runner_catalog}function Ee(v){return Object.keys(xe()?.runners?.[v]?.models||{})}function Fe(v){let C=Ee(v),N=xe()?.runners?.[v]?.default_model;return typeof N=="string"&&C.includes(N)?N:C[0]||""}function ve(){let v=L().settings,C=p||v.runner||"claude",N=Ee(C),F=p?Fe(C):v.model||N[0]||"",me=$a(xe(),C,F),$e=v.effort||"",ce=me.includes($e)?$e:me[0]||"";return{runner:C,model:F,effort:ce,models:N,efforts:me}}async function je(v){let C=L().settings,N=await Xe("worker-parallel-analysis-settings-update",{expected_revision:C.revision,runner:v.runner,model:v.model,effort:v.effort});(!N||N.applied!==!0)&&(p=null,be(),N&&N.reason&&ae(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${N.reason}`,"error",2800))}function Oe(v){p=v,be();let C=ve();je({runner:v,model:C.model,effort:C.effort})}function ge(v){let C=ve(),N=$a(xe(),C.runner,v);je({runner:C.runner,model:v,effort:N.includes(C.effort)?C.effort:N[0]||""})}function he(v){let C=ve();je({runner:C.runner,model:C.model,effort:v})}async function G(v,C){if(!s||u)return;let N=Q(v,C),F=L();if(N.length<2||!F.last_good){ae("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let me=d.get(v)||Le(),$e=()=>({snapshot_digest:F.last_good.identity_digest,group_index:v,lane:me,ordered_bead_ids:N,expected_revision:z().revision});u=!0,be();try{let ce=await s("worker-parallel-analysis-submit",$e());ce&&ce.queue&&r&&r.set(ce.queue),ce&&ce.applied!==!0&&ce.conflict===!0&&(ce=await s("worker-parallel-analysis-submit",$e()),ce&&ce.queue&&r&&r.set(ce.queue)),ce&&ce.applied===!0?(l.delete(v),ae(`\uC9C1\uB82C \uB808\uC778 ${me}\uC5D0 ${N.length}\uAC1C \uBC30\uCE58`,"success")):ae(`\uC81C\uCD9C \uAC70\uBD80: ${ce?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{u=!1,be()}}function V(v,C,N){l.set(v,Q(v,C).filter(F=>F!==N)),be()}function ye(v){l.delete(v),be()}function Te(v,C,N,F){let me=[...Q(v,C)],$e=me.indexOf(N),ce=$e+F;$e<0||ce<0||ce>=me.length||(me.splice(ce,0,...me.splice($e,1)),l.set(v,me),be())}function Ue(){let v=L().settings,C=Object.keys(xe()?.runners||{}),N=ve();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${F=>Oe(F.target.value)}
        >
          ${C.map(F=>c`<option
                value=${F}
                ?selected=${N.runner===F}
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
          @change=${F=>ge(F.target.value)}
        >
          ${N.models.map(F=>c`<option
                value=${F}
                ?selected=${N.model===F}
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
          @change=${F=>he(F.target.value)}
        >
          ${N.efforts.map(F=>c`<option
                value=${F}
                ?selected=${N.effort===F}
              >
                ${F}
              </option>`)}
        </select>
      </label>
      ${He(v)}
    </div>`}function He(v){return!st(v)||Ae(v)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:v.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${v.runner}/${v.model} · effort
        ${v.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:v.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function Ae(v){return v.is_default===!0&&v.compatible===!1}function st(v){return!!(v.runner&&v.model&&v.effort)}function Qe(v){return st(v)&&v.compatible!==!1}function H(v){let C=Math.max(0,Math.floor(v/1e3)),N=Math.floor(C/60),F=C%60;return`${N}:${String(F).padStart(2,"0")}`}function re(v){let C=v.job;if(C){let N=typeof C.started_at=="number"?C.started_at:0,F=`${C.runner||"?"}/${C.model||"?"}`,me=N?` \xB7 \uACBD\uACFC ${H(Date.now()-N)}`:"",$e=typeof C.session_id=="string"?C.session_id:"",ce=k(v).find(ot=>ot.run_id===C.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${F} · effort ${C.effort||"?"}${me}</span
        >
        ${$e?c`<code class="pa-session-id" title=${$e}
              >${$e.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>fe(C.job_id,ce||C)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${ce?.prompt_saved!==!0||Z.has(C.job_id)}
          @click=${()=>{nt(C.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Ce()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Ce(){return n?.isPending?.()===!0}function We(v){let C=!!v.job,N=Qe(v.settings),F=R!==null&&T.size===0,me=C||u||Ce()||P;return c`<div class="pa-meta">
      ${v.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(v.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${re(v)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!N||me||F}
        @click=${()=>{at(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!N||me||F}
        @click=${()=>{at(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!C}
        @click=${()=>{rt()}}
      >
        취소
      </button>
    </div>`}function pe(v){return typeof v=="string"&&v.length>0?v:"\uBBF8\uBC30\uCE58"}function m(v,C){C?T.add(v):T.delete(v),be()}function $(){let v=R?.qualified||[],C=R?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${P?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${v.length} \xB7 \uC81C\uC678 ${C.length}`}</span
        >
      </header>
      ${R&&v.length>0?c`<ul class="pa-targets__list">
            ${v.map(N=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${N.id}
                      .checked=${T.has(N.id)}
                      @change=${F=>m(N.id,F.target.checked)}
                    />
                    <span class="pa-target__title">${N.title}</span>
                  </label>
                  <span class="pa-target__route">${N.route}</span>
                  <span class="pa-target__lane">${pe(N.lane)}</span>
                </li>`)}
          </ul>`:R&&v.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${R&&C.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${C.length}</summary>
            <ul class="pa-targets__list">
              ${C.map(N=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${N.title}</span>
                    </label>
                    <span class="pa-target__reason"
                      >${ym[N.reason]||N.reason}</span
                    >
                    <span class="pa-target__lane"
                      >${pe(N.lane)}</span
                    >
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function x(v){let C=typeof v.session_id=="string"&&v.session_id.length>0,N=C?v.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${v.outcome}"
        >${vm[v.outcome]||v.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(v.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${v.runner||"?"} / ${v.model||"?"} / ${v.effort||"?"}</span
      >
      ${C?c`<code class="pa-session-id" title=${N}
            >${N.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${v.outcome==="failure"&&v.reason?c`<span class="pa-run-row__reason">${v.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>fe(v.run_id,v)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${v.prompt_saved!==!0||Z.has(v.run_id)}
          @click=${()=>{nt(v.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function D(v){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${v.length>0?c`<ul class="pa-runs__list">
            ${v.map(C=>x(C))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function K(){return ee?c`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${_e}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${ee.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{qe()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${_e}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${ee.prompt}</pre
        >
      </section>
    </div>`:""}function Y(v,C){let N=Q(v,C),F=W(),me=N.filter(Ke=>F.has(Ke)),$e=oe(N),ce=se(N),ot=Array.isArray(z().serial_lanes)?z().serial_lanes:[],Se=d.get(v)||Le(),gt=C.eligible!==!0||N.length<2||me.length>0||$e.length>0||ce||u;return c`<section class="pa-group" data-group-index=${String(v)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${C.confidence}</span>
        ${C.categories.map(Ke=>c`<span class="pa-group__category">${Ke}</span>`)}
        ${ce?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${C.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${$e.length>0?c`<span class="pa-group__stale"
              >stale — ${$e.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${C.reason}</p>
      <ol class="pa-group__members">
        ${N.map((Ke,Et)=>c`<li class="pa-member" data-bead-id=${Ke}>
              <span class="pa-member__seq">${Et+1}</span>
              <span class="pa-member__title">${ze(Ke)}</span>
              ${F.has(Ke)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ke}
                ?disabled=${Et===0}
                aria-label=${`${Ke} \uC704\uB85C`}
                @click=${()=>Te(v,C,Ke,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ke}
                ?disabled=${Et===N.length-1}
                aria-label=${`${Ke} \uC544\uB798\uB85C`}
                @click=${()=>Te(v,C,Ke,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ke}
                aria-label=${`${Ke} \uC81C\uC678`}
                @click=${()=>V(v,C,Ke)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${C.evidence.map(Ke=>c`<li class="pa-evidence">
              <code>${Ke.path}</code>
              <span class="pa-evidence__locator">${Ke.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>ye(v)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ke=>{d.set(v,Ke.target.value),be()}}
          >
            ${ot.map((Ke,Et)=>c`<option
                  value=${Ke.id}
                  ?selected=${Se===Ke.id}
                >
                  직렬 ${Et+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${gt}
          @click=${()=>{G(v,C)}}
        >
          제출
        </button>
      </footer>
    </section>`}function ne(v){let C=Array.isArray(v.issues)?v.issues:[],N=C.filter(me=>me.verdict==="parallel_ok").length,F=C.filter(me=>me.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${N}</span>
      <span>uncertain ${F}</span>
    </div>`}function le(){let v=we&&!!L().job;if(v&&b===null){b=setInterval(()=>be(),1e3);return}!v&&b!==null&&(clearInterval(b),b=null)}function be(){let v=L();p&&v.settings.runner===p&&(p=null);let C=v.last_good?.result;le(),Ze(c`
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
            ${Ue()} ${We(v)} ${$()}
            ${C?c`${C.groups.map((N,F)=>Y(F,N))}
                ${C.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${ne(C)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${D(k(v))}
          </div>
        </div>
        ${K()}
      `,i)}let we=!1,Me=()=>{we=!1,ee=null,B+=1,le()},Pe=v=>{v.target===v.currentTarget&&X()};i.addEventListener("close",Me),i.addEventListener("cancel",Me),i.addEventListener("click",Pe);let ke=null;r&&r.subscribe&&(ke=r.subscribe(()=>{we&&be()}));let Ve=null;n&&n.subscribe&&(Ve=n.subscribe(()=>{we&&be()}));function U(){we||(we=!0,be(),q(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function X(){we&&(we=!1,ee=null,B+=1,le(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:U,close:X,destroy(){we=!1,b!==null&&(clearInterval(b),b=null),i.removeEventListener("close",Me),i.removeEventListener("cancel",Me),i.removeEventListener("click",Pe),ke&&(ke(),ke=null),Ve&&(Ve(),Ve=null),i.remove()}}}var _d=new Set(["sh","bash","zsh","dash","ksh"]),md=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function gd(e){let t=e.split("/");return t[t.length-1]||""}function km(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=gd(r[0]);if(n!=="env")return _d.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&_d.has(gd(s))}function $m(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function xm(e){let t=[],r=0;md.lastIndex=0;for(let n of e.matchAll(md)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:$m(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Am(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function bd(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",i="",l=0,d=null,u=!1;function p(S,q){return q?xm(S).map(k=>k.kind==="plain"?k.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${k.kind}"
            >${k.text}</span
          >`):S}function b(){if(!s)return c``;let S=o==="ready"&&km(a),q=o==="ready"?a.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>z()}
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
              @click=${()=>z()}
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
                  ${q.map((k,W)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${W+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(k,S)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function R(){Ze(b(),n)}async function T(){if(o!=="ready")return;let S=await Xt(a);ae(S?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",S?"success":"error")}function P(S){S.key==="Escape"&&s&&(S.preventDefault(),z())}function B(){u||(document.addEventListener("keydown",P),u=!0)}function ee(){u&&(document.removeEventListener("keydown",P),u=!1)}async function Z(S,q=null){let k=++l;B(),s={...S},d=q||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",R(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let oe=t?t():"";if(!oe){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",R();return}if(!r){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",R();return}let ue="/api/repo-ops-script?workspace="+encodeURIComponent(oe)+"&lane="+encodeURIComponent(S.lane)+"&base_sha="+encodeURIComponent(S.base_sha);try{let Q=await r(ue),se=await Q.json().catch(()=>({}));if(k!==l)return;if((t?t():"")!==oe){z();return}if(!Q.ok||!se||se.ok!==!0){o="error",i=Am(se&&typeof se.error=="string"?se.error:""),R();return}s={lane:se.lane,base_sha:se.base_sha,path:se.path,base_ref:se.base_ref},a=String(se.content),o="ready",R()}catch{if(k!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",R()}}function z(){l+=1,ee(),s=null,a="",R();let S=d;d=null,S?.isConnected&&S.focus()}function L(){z(),n.remove()}return{open:Z,close:z,destroy:L}}function hd(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let L=o();return typeof L.revision=="number"?L.revision:0}function i(L){t&&L&&L.queue&&typeof L.queue=="object"&&t.set(L.queue)}function l(){let L=o().workspace_info;return L&&typeof L=="object"?L:{}}function d(L,S){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${L}"
      >${S}</span
    >`}function u(L){if(typeof L!="number"||!Number.isFinite(L))return"";let S=L/6e4;return Number.isInteger(S)?`timeout ${S}\uBD84`:`timeout ${Math.round(L/1e3)}\uCD08`}function p(L){let S=u(L);return S?d("config",S):""}function b(L,S,q){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${q.script}
      @click=${k=>{s&&s({lane:L,base_sha:S.base_sha,path:q.script,base_ref:S.base_ref},k.currentTarget)}}
    ></button>`}function R(L){let S=typeof L.base_sha=="string"?L.base_sha:"",q=`${L.source_path||"repo-ops/config.toml"} @ ${L.base_ref||"?"}${S?`@${S.slice(0,7)}`:""}`;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${q}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${L.verify?c`${b("verify",L,L.verify)}
              ${p(L.verify.timeout_ms)}`:c`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${L.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${L.deploy?c`${b("deploy",L,L.deploy)}
              ${p(L.deploy.timeout_ms)}`:c`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${L.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function T(L){let S=L.repo_ops&&typeof L.repo_ops=="object"?L.repo_ops:null;return S&&(S.status==="resolved"||S.status==="absent")?R(S):S&&(S.status==="pending"||S.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function P(L){if(!r)return;let S=await r("worker-auto-repair-toggle",{on:L,expected_revision:a()});if(i(S),S&&S.conflict){let q=await r("worker-auto-repair-toggle",{on:L,expected_revision:a()});i(q)}n()}let B={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function ee(L,S,q){return c`<div class="worker-repo-ops__policy-group" data-policy=${q}>
      <div class="worker-repo-ops__policy-label">${L}</div>
      <ul class="worker-repo-ops__policy-list">
        ${S.map(k=>c`<li data-token=${k}>
              ${B[k]||k}
            </li>`)}
      </ul>
    </div>`}function Z(L){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${L.map(S=>{let q=[B[S.trigger]||S.trigger];return Number.isInteger(S.attempts_per_operation_attempt)?q.push(`operation\uB2F9 ${S.attempts_per_operation_attempt}\uD68C`):Number.isInteger(S.attempts)?q.push(`${B[S.budget]||S.budget} ${S.attempts}\uD68C`):Number.isInteger(S.sessions_per_user_action)&&q.push(`${S.sessions_per_user_action}\uD68C`,B[S.user_actions]||S.user_actions),S.applies_when&&q.push(B[S.applies_when]||S.applies_when),c`<li data-token=${S.id}>
            <strong>${B[S.id]||S.id}</strong>
            <span>${q.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function z(){let L=o(),S=L.auto_repair!==!1,q=L.repo_operation_policy&&typeof L.repo_operation_policy=="object"?L.repo_operation_policy:null,k=Array.isArray(L.repo_operations)?L.repo_operations:[],W=k.find(se=>se.state==="repairing"),oe=k.filter(se=>se.state==="failed"||se.state==="repairing"),ue=oe.length?Math.min(...oe.map(se=>typeof se.repair?.remaining=="number"?se.repair.remaining:0)):q?.auto_repair?.resolution_ladder?.find(se=>se.id==="auto_repair_session")?.attempts??1,Q=Array.isArray(q?.auto_repair?.resolution_ladder)?q.auto_repair.resolution_ladder:[];return c`<section
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
          >남은 자동 해결 ${ue}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${W?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${W.repair?.owner_bead||W.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${q?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(q.worker_automatic||[]).length} · 해결 사다리
                ${Q.length} · 금지
                ${(q.never_automatic||[]).length}</span
              >
            </summary>
            ${ee("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",q.worker_automatic||[],"worker-automatic")}
            ${q.supported===!1||q.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${q.schema_version})`}
                </div>`:Z(Q)}
            ${ee("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",q.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${T(l())} ${z()}
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
      title=${e.at?kt(e.at):""}
      >${Gs(e.at)||"\u2014"}</span
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
          >${t.target_base}@${zs(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Hs(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${wd(e)}"
          >${Tm(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?$d(Ic(t.failure_kind,n)):""}
      ${Cm(t)}
      ${kd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${zs(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Im(e){let t=e.cleanup,r=zr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?kt(e.at):""}
      >${Gs(e.at)||"\u2014"}</span
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
      ${$d(Xs(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
  </section>`}function xd(e,t={}){let r=null;function n(){Ze(r?Lm(r):c``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:Em(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var Om="tab:worker:ready",Mm="tab:worker:blocked",Pm="tab:worker:in-progress",Dm="tab:worker:closed",eo=1,Ad=5;function Sd(e){return In(e).path.length>0}var Cd="beads-ui.worker.candidate-filter",Aa={show_blocked:!1,spec:"all"};function Nm(){try{let e=window.localStorage.getItem(Cd);if(!e)return{...Aa};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Aa};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Aa}}}function qm(e){try{window.localStorage.setItem(Cd,JSON.stringify(e))}catch{}}function Fm(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=r(i),d=n(i);l&&d?s.push(i):!l&&d?o+=1:l&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var jm=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Rd="bdui.worker.candidate_sort",Bm=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],to="spec";function Um(){try{let e=window.localStorage.getItem(Rd);return e==="board"||e==="created"||e==="spec"?e:to}catch{return to}}function Wm(e){try{window.localStorage.setItem(Rd,e)}catch{}}var Id="bdui.worker.done-range";function zm(){try{let e=window.localStorage.getItem(Id);return zt(e)?e:Ft}catch{return Ft}}function Hm(e){try{window.localStorage.setItem(Id,e)}catch{}}var Gm="(max-width: 640px)",Ld="beads-ui.worker.lane-collapsed",Wn={queue:!0,done:!0};function Vm(){try{let e=window.localStorage.getItem(Ld);if(!e)return{...Wn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Wn}:{queue:typeof t.queue=="boolean"?t.queue:Wn.queue,done:typeof t.done=="boolean"?t.done:Wn.done}}catch{return{...Wn}}}function Km(e){try{window.localStorage.setItem(Ld,JSON.stringify(e))}catch{}}function Ed(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Ym(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Fr):(n.sort(as(r)),t==="board"?n:[...n.filter(Sd),...n.filter(s=>!Sd(s))])}function Zm(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Xm(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Qm(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Td(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Jm(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function eg(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);return t.length===0?null:t==="needs_human"?"\uC644\uB8CC \uC758\uB3C4 \uB300\uAE30 \u2014 \uC0AC\uB78C \uD655\uC778 \uD544\uC694":`\uC644\uB8CC \uC758\uB3C4 \uB300\uAE30 \u2014 ${t}`}function tg(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function rg(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Sa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function ng(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[o,`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function sg(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r("\uC790\uB3D9\uBCF5\uAD6C \uC911",{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Td(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Td(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function og(e,t,r,n,s=null,o=null,a=null,i=!1,l=null,d=!0,u=null,p=null,b=null,R={},T=!1,P=!1,B={}){let ee=!!l&&l.position>0,Z=!!l?.continuation_action&&l.continuation_action.continuation===null,z=!!l&&l.active===!0,L=l&&l.failure||null,S=eg(l?l.waiting:null),q=r[e]||null,k=q&&q.gate?q.gate:null,W=q&&q.pr?q.pr:null,oe=ng(b),ue=tg(l?l.resolution:null),Q=rg(l?l.head_review:null),se=l&&l.head_review||null,Le=l&&l.authority||null,ze=!!se&&["pending","reviewing","revising"].includes(se.state),Xe=ee&&!z&&(se?.state==="failed"||!Le||Le.source==="automatic"&&!P),at=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ue?ue.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":S,rt=!!k&&k.base_badge==="\uCDA9\uB3CC",nt=!!k&&k.enabled===!0,_e=Fn({bead_id:e,merge_sha:B.merge_sha,cleanup_cursor:B.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:B.repo_operations}),qe=Zs(_e),fe=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!k&&k.tier==="merged",xe=i&&!!n&&!!k&&k.tier==="merged",Ee=Xe&&(nt||rt||k?.reason==="base_behind"||k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"||fe||xe),Fe=i&&rt&&d===!1,ve=cr(R,e,{external:i,merge_active:z||_e?.step==="merge",merge_queued:ee,conflict_active:!!a,cleanup_active:qe,merged:!!n||k?.tier==="merged"}),je=!!ve.operation,Oe=!fe&&!!n&&n.step==="repo_operations",ge=sg({continuation_required:Z,merge_step:_e,conflict_badge:at,conflict_live:ue?.live===!0||a==="running",head_review:se&&Q?{...Q,state:se.state,failure_reason:se.failure_reason}:null,recovery:oe,cleanup_failed:n,cleanup_label:n?zr(n.step):null,base_exception:p,conflicting:rt,gate:k,queue_failure:L,auto_skip:u,queued:ee,queue_active:z,queue_position:l?l.position:0,activity:at?null:o&&o.activity||null}),he=ge?.live===!0&&ge.title?c`<span title=${ge.title}>${ge.label}</span>`:ge?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:n&&_e?.active!==!0?Ys(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:T,external:i,pr_number:W&&typeof W.number=="number"?W.number:null,pr_url:W&&typeof W.url=="string"?W.url:"",completion_badge:ge?.live!==!0&&ge?.title?ge.label:null,completion_title:ge?.title||"",completion_repair_pr_url:oe?oe.repair_pr_url:"",completion_repair_pr_number:oe?oe.repair_pr_number:null,badges:he?[he]:[],live_badge:ge?.live===!0?he:null,usage:s,alert:ge?.alert===!0,merge_action:k?.tier==="merged"&&!fe&&!xe||Oe?!1:!ee||Z||Xe,timeline_action:Oe,cancel_action:ee&&!Z,cancel_enabled:(!z||ze)&&!(oe&&oe.lock_actions),cancel_title:oe&&oe.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":z&&!ze?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ze?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ve,discard_action:ve.action,merge_step:_e,discard_enabled:ve.enabled,discard_title:ve.title,merge_enabled:!_e&&!a&&!je&&!p&&!(oe&&oe.lock_actions)&&!Fe&&!Oe&&(nt||rt||k?.reason==="base_behind"||k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"||fe||xe||Ee),merge_label:Z?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":fe||xe?"\uC815\uB9AC \uC7AC\uAC1C":rt&&!_e&&!fe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":k?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Xe?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:je?ve.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ve.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ve.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Z?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":_e?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${_e.label}`:xe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Fe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":fe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":rt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":nt?`\uBA38\uC9C0 (${k.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:k&&k.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${k&&k.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ea(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:d,doneRange:u,onDoneRangeChange:p}=t,b=n?ls(n,i):null,R=ds({transport:r,uiOrderStore:i}),T=null,P=[],B=Nm(),ee=Um(),Z=zt(u)?u:zm(),z=new Map;function L(){let f=or.find(A=>A.value===Z);return f?f.label:"\uC624\uB298"}let S=Vm(),q=!1,k=new Set,W=new Set,oe=new Set,ue=new Set,Q=[],se=document.createElement("div");se.className="worker-console";let Le=document.createElement("div");Le.className="worker-top";let ze=document.createElement("div");ze.className="worker-drawer-overlay",ze.hidden=!0;let Xe=document.createElement("div");Xe.className="worker-drawer-overlay__backdrop";let at=document.createElement("div");at.className="worker-drawer-host";let rt=document.createElement("div");rt.className="worker-drawer-host",rt.hidden=!0,ze.append(Xe,at,rt);let nt=document.createElement("div");nt.className="worker-lanes-host",se.append(Le,ze,nt),e.appendChild(se);let _e=null,qe=null,fe=Os(at,{transport:r,sessionLogStore:a,onClose:()=>{_e=null,qe=null,ze.hidden=!0,F()}}),xe=xd(rt,{onClose:()=>{rt.hidden=!0,ze.hidden=!0,F()}}),Ee=bd({getWorkspacePath:d||(()=>"")}),Fe=d&&d()||"",ve=hd({queueStore:s,transport:r,onChanged:()=>F(),onOpenScript:(f,A)=>{Ee.open(f,A)}}),je=o?fd(se,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:d,onOpenTranscript:(f,A)=>fr(f,A)}):null;function Oe(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:eo,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ge(){let f=Oe();return typeof f.revision=="number"?f.revision:0}function he(f){f&&f.queue&&s&&s.set(f.queue)}function G(){let f=Oe().queue;return Array.isArray(f)?f.length:0}async function V(f,A,I){if(!r)return;let _=()=>({bead_id:f,...A==="parallel"?{}:{lane:A},index:I,expected_revision:ge()}),M=await r("worker-queue-place",_());he(M),M&&M.conflict&&await r("worker-queue-place",_()).then(he)}async function ye(f,A,I){if(!r)return;let _=()=>({bead_id:f,...A==="parallel"?{}:{lane:A},to_index:I,expected_revision:ge()}),M=await r("worker-queue-reorder",_());he(M),M&&M.conflict&&await r("worker-queue-reorder",_()).then(he)}async function Te(f){if(!r)return;let A=await r("worker-queue-remove",{bead_id:f,expected_revision:ge()});he(A),A&&A.conflict&&await r("worker-queue-remove",{bead_id:f,expected_revision:ge()}).then(he)}async function Ue(f){if(!r||!f)return;let A=await r("worker-attempt-pause",{attempt_id:f});A&&A.paused===!1&&A.reason&&ae(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${A.reason}`,"error",2400)}async function He(f){if(!r||!f)return;let A=await tn();if(A===null)return;let I=async(M={})=>await r("worker-attempt-resume",{attempt_id:f,expected_revision:ge(),...A!==""?{instructions:A}:{},...M}),_=await I();he(_),_&&_.conflict&&(_=await I(),he(_)),_=await mr(_,(M,te)=>I({continuation:M,decision_token:te}),{onResult:he,refresh:()=>I()}),_&&_.resumed===!1&&!_.conflict&&_.reason&&ae(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function Ae(f){if(!r||!f)return;let A=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:ge()});he(A),A&&A.conflict&&(A=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:ge()}),he(A)),A&&A.dismissed===!1&&!A.conflict&&A.reason&&ae(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${A.reason}`,"error",2400)}async function st(f,A,I=!0){if(!r)return null;let _=r,M=await _(f,{...A,expected_revision:ge()});return he(M),M&&M.conflict&&I&&(M=await _(f,{...A,expected_revision:ge()}),he(M)),M}async function Qe(f){if(!r||!f)return;let A=Oe().merge_queue?.find(_=>_.bead_id===f)?.continuation_action;if(A?.mismatch&&A.continuation===null){await re(f,A.mismatch);return}k.add(f),F();let I;try{I=await st("worker-merge-queue-add",{bead_id:f})}finally{k.delete(f),F()}!I||I.conflict||I.applied||ae(Jm(I.reason),"error",2400)}async function H(f){if(!(!r||!f||W.has(f))){W.add(f),F();try{let A=await r("worker-cleanup-retry",{bead_id:f,expected_revision:ge()});he(A),A&&!A.retried&&!A.conflict&&A.reason&&ae(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${A.reason}`,"error",2400)}finally{W.delete(f),F()}}}async function re(f,A){let I=await mr({continuation_mismatch:A},(M,te)=>st("worker-merge-queue-add",{bead_id:f,continuation:M,decision_token:te},!1)),_=I?.queue?.merge_queue?.find(M=>M.bead_id===f)?.continuation_action;if(I?.applied!==!0&&_?.continuation===null&&_.mismatch){await re(f,_.mismatch);return}I&&I.applied===!1&&!I.conflict&&ae("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ce(f){if(!r)return;let A=await st("worker-merge-auto-toggle",{on:f});!A||A.conflict||ae(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function We(f){if(!r||!f)return;let A=await st("worker-merge-queue-remove",{bead_id:f});A&&!A.conflict&&!A.applied&&A.reason==="merge_active"&&ae("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function pe(){await st("worker-merge-queue-remove",{all:!0})}async function m(f,A=null,I="unmerged",_=null){if(!r||!f)return;let M=Dn(f,I);if(!(!!_||typeof globalThis.confirm!="function"||globalThis.confirm(M)))return;let de=await r("worker-discard",{bead_id:f,...A?{attempt_id:A}:{},..._?{operation_id:_}:{},expected_revision:ge()});if(he(de),de&&de.conflict&&(de=await r("worker-discard",{bead_id:f,...A?{attempt_id:A}:{},..._?{operation_id:_}:{},expected_revision:ge()}),he(de)),de&&de.discarded===!0){ae(Vs(de),"success",5e3);return}if(de&&de.reason){ae(`\uD3D0\uAE30 \uC2E4\uD328: ${de.reason}`,"error",2800);return}if(de&&de.accepted&&de.pending==="merged_revert"){ae("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(de&&de.accepted&&!de.discarded){ae(`\uD3D0\uAE30 \uC9C4\uD589: ${de.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}de&&!de.conflict&&ae("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function $(f,A,I){if(!(!r||!A||!I||ue.has(A))){ue.add(A),F();try{let _=await r(f,{bead_id:A,action_id:I,expected_revision:ge()});he(_),_?.conflict?ae("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!_?.ok&&_?.reason&&ae(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(_.reason)}`,"error",2800)}finally{ue.delete(A),F()}}}async function x(f,A){if(!r||!A||oe.has(A))return;oe.add(A),F();let I;try{let _=async(M={})=>await r(f,{bead_id:A,expected_revision:ge(),...M});I=await _(),he(I),I&&I.conflict&&(I=await r(f,{bead_id:A,expected_revision:ge()}),he(I)),f==="worker-revise-fix"&&(I=await mr(I,(M,te)=>_({continuation:M,decision_token:te}),{onResult:he,refresh:()=>_()}))}finally{oe.delete(A),F()}if(!(!I||I.conflict)){if(I.ok){ae(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ae(`\uCC98\uBD84 \uAC70\uBD80: ${I.reason||""}`,"error",3e3)}}async function D(f){if(!r)return;let A=await r("worker-automation-toggle",{on:f,expected_revision:ge()});he(A),A&&A.conflict&&await r("worker-automation-toggle",{on:f,expected_revision:ge()}).then(he)}async function K(f){if(!r||!f)return;let A=await r("worker-repo-operation-repair",{operation_id:f});if(he(A),A&&A.ok===!1){ae(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${A.reason||""}`,"error",3e3);return}A&&A.ok===!0&&ae("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function Y(f){if(!r||!f)return;let A=await r("worker-repo-operation-dismiss",{operation_id:f});he(A),A&&A.ok===!1&&ae(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${A.reason||""}`,"error",3e3)}async function ne(f){if(!r||!Number.isFinite(f))return;let A=Math.max(eo,Math.floor(f)),I=await r("worker-queue-set-slots",{slots:A,expected_revision:ge()});he(I),I&&I.conflict&&await r("worker-queue-set-slots",{slots:A,expected_revision:ge()}).then(he)}async function le(f){if(!r||!Number.isInteger(f)||f<1||f>Ad)return;let A=Oe(),I=(Array.isArray(A.serial_lanes)?A.serial_lanes:[]).slice(f).reduce((te,de)=>te+(Array.isArray(de?.entries)?de.entries.length:0),0),_=()=>({count:f,expected_revision:ge()}),M=await r("worker-queue-set-serial-lane-count",_());he(M),M&&M.conflict&&(M=await r("worker-queue-set-serial-lane-count",_()),he(M)),M&&M.applied&&I>0&&ae(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${I}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function be(){let f=Oe(),A=b?b.selectBoardColumn(Om,"ready"):[],I=b?b.selectBoardColumn(Mm,"blocked"):[],_=b?b.selectBoardColumn(Dm,"closed"):[],M=b?b.selectBoardColumn(Pm,"in_progress"):[],te=new Map;for(let h of M){let j=Xm(h);if(!j)continue;let ie=te.get(j);ie?ie.push(h):te.set(j,[h])}let de=h=>{let j=cs(te.get(h)||[]);return j?j.title||j.id:null},Ne=f.bead_titles||{},Re=new Map;for(let[h,j]of Object.entries(Ne))typeof j=="string"&&j.length>0&&Re.set(h,j);for(let h of[...A,...I])Re.set(h.id,h.title||h.id);let ct=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},ut=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{},w=new Map;for(let[h,j]of Object.entries(ut))Array.isArray(j)&&w.set(h,ka(j));for(let h of[...A,...I]){let j=h.labels;Array.isArray(j)&&!w.has(h.id)&&w.set(h.id,ka(j))}let y=new Map,g=o?.get()?.last_good?.result?.groups;for(let h of Array.isArray(g)?g:[]){if(h?.eligible!==!0||!Array.isArray(h.members))continue;let j=h.members.map(Ge=>{let ft=(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).find(Kt=>Kt.entries.some(Tt=>Tt.bead_id===Ge));return ft?ft.id:null});if(!(j.every(Ge=>Ge!==null)&&new Set(j).size===1))for(let Ge of h.members)y.set(Ge,h.members.filter(ft=>ft!==Ge))}let O=f.bead_blocked_by&&typeof f.bead_blocked_by=="object"&&!Array.isArray(f.bead_blocked_by)?f.bead_blocked_by:{},E=new Map;for(let[h,j]of Object.entries(ct))j&&typeof j=="object"&&E.set(h,j);for(let h of[...A,...I])E.set(h.id,{created_at:h.created_at,updated_at:h.updated_at});let J=h=>E.get(h)||{},Ie=f.pr_wait||[],Ye=f.pr_observations||{},tt=f.pr_activity||{},Be=f.cleanup_failed||{},bt=Object.entries(Be).map(([h,j])=>({bead_id:h,step:j&&j.step?j.step:"",reason:j&&j.reason?j.reason:"",at:j&&typeof j.at=="number"?j.at:null,detail:j&&typeof j.detail=="string"?j.detail:null,output_tail:j&&typeof j.output_tail=="string"&&j.output_tail?j.output_tail:void 0,log_path:j&&typeof j.log_path=="string"&&j.log_path?j.log_path:void 0,retry_count:j&&typeof j.retry_count=="number"&&Number.isInteger(j.retry_count)&&j.retry_count>0?j.retry_count:0,failure_code:j&&typeof j.failure_code=="string"?j.failure_code:void 0,subject_id:j&&typeof j.subject_id=="string"?j.subject_id:void 0,repair_eligible:!!(j&&j.repair_eligible),repair:j&&j.repair?j.repair:void 0})),sr=f.queue||[],De=new Set([...sr.map(h=>h.bead_id),...(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).flatMap(h=>(Array.isArray(h?.entries)?h.entries:[]).map(j=>j.bead_id)),...Ie.map(h=>h.bead_id),...f.done.map(h=>h.bead_id)]),ht=new Set(I.map(h=>h.id)),cn=i?i.get()?.order||{}:{},Ia=new Set,La=[];for(let h of[...A,...I])De.has(h.id)||Ia.has(h.id)||Zm(h)||Object.hasOwn(h,"labels")&&wa(h.labels)||(Ia.add(h.id),La.push(h));P=Ym(La,ee,cn);let Hd=f.admission||{},Oa=h=>{let j=Hd[h];if(!j)return"";if(j.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ie=typeof j.reason=="string"?j.reason:"",Ge=ie.indexOf(":");return Ge>0&&Ge<ie.length-1?`\u26D4 ${ie.slice(0,Ge)} (${ie.slice(Ge+1)})`:`\u26D4 ${ie}`},Gd=P.map(h=>{let j=In(h),ie=j.path.length>0,Ge=h.workflow?.route==="quick_fix"||h.metadata&&h.metadata.route==="quick_fix",ft=!Object.hasOwn(h,"description")||typeof h.description=="string"&&h.description.trim().length>0,Tt=!(Object.hasOwn(h,"labels")&&wa(h.labels))&&(Ge?ft:ie&&!j.conflict),pt=ht.has(h.id),Yt=[];pt&&Yt.push(Qm(h)),Ge&&!ft?Yt.push("missing_description"):!Ge&&j.conflict?Yt.push("spec_id_conflict"):!Ge&&!ie&&Yt.push("spec \uC5C6\uC74C");let Xn=Oa(h.id);return Xn&&Yt.push(Xn),{id:h.id,title:h.title||h.id,reason:Yt.join(" \xB7 "),draggable:Tt,lane:"candidate",created_at:h.created_at,updated_at:h.updated_at,workflow:h.workflow,is_quick_fix:Ge,status:h.status,blocked:pt,has_spec:ie}}),ro=Fm(Gd,B),Vd=ro.visible,Kd=f.revise_parked||{},zn=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},no=(h,j)=>h.map((ie,Ge)=>{let ft=j!=="done",Kt=j!=="done"&&j!=="queue",Tt=ft?Kd[ie.bead_id]:null,pt=ft?cr(zn,ie.bead_id):null,Yt=pt?.operation?pt:null,Xn=ft&&w.get(ie.bead_id)===!0,ni=O[ie.bead_id]||[],lo=f.admission&&typeof f.admission=="object"?f.admission[ie.bead_id]:null,co=ft?yc(lo,!!Yt||ue.has(ie.bead_id)):null,iu=ft&&!co?Oa(ie.bead_id):null,lu=ft?[iu]:[],si=ft&&ni.length>0&&typeof lo?.reason=="string"&&lo.reason.startsWith("not_ready")?[`\u23F8 ${ni.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],uo=ft?y.get(ie.bead_id):void 0;return uo&&uo.length>0&&si.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${uo.join(", ")}\uC640`),{id:ie.bead_id,title:Re.get(ie.bead_id)||ie.bead_id,reason:lu.filter(Boolean).join(" \xB7 "),draggable:ft&&!Yt&&!co,done:j==="done",lane:j,seq:Kt?Ge+1:void 0,worker_serial:Xn,discard:Yt,stale_work:co,badges:[...si,...Tt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Tt,revise_action:!!Tt,revise_enabled:!!Tt&&!Yt&&!oe.has(ie.bead_id),revise_title:Tt?Tt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Tt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:j==="done"?Ht(f.attempts||{},ie.bead_id):null,work_ms:j==="done"?bc(f.attempts||{},ie.bead_id):null,done_at:j==="done"&&typeof ie.added_at=="number"?ie.added_at:void 0,...J(ie.bead_id)}}),Gr=f.attempts?Object.values(f.attempts):[],so=new Set;for(let h of Gr)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&so.add(h.resumed_from);let Ma=new Map;for(let h of Gr)Ma.set(h.bead_id,h.attempt_id);let Hn=new Map;for(let h of Gr)Hn.set(h.attempt_id,h);function oo(h){let j=new Set,ie=h;for(;ie&&!j.has(ie.attempt_id);){if(ie.conflict_resolution===!0)return!0;j.add(ie.attempt_id),ie=typeof ie.resumed_from=="string"&&ie.resumed_from.length>0&&Hn.get(ie.resumed_from)||null}return!1}let Gn=typeof f.declared_base=="string"?f.declared_base:null;function Yd(h){let j=null;for(let ie of Gr)!ie||ie.bead_id!==h||oo(ie)||(j===null||(typeof ie.started_at=="number"?ie.started_at:0)>=(typeof j.started_at=="number"?j.started_at:0))&&(j=ie);return j&&typeof j.target_base=="string"?j.target_base:null}let Pa=[],Da=[],Zd=pd(f),Na=h=>{let j=typeof h.session_id=="string"&&h.session_id.length>0,ie=so.has(h.attempt_id);return{eligible:j&&!ie,reason:j?ie?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Vt=null;for(let h of Gr){let j=h.status==="paused"&&!so.has(h.attempt_id);if(h.status==="running"||j)Da.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:Re.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,paused:j,conflict_resolution:oo(h),base_exception:Sa(Gn,h.target_base),can_pause:typeof h.session_id=="string"&&h.session_id.length>0,discard:cr(zn,h.bead_id,{attempt_id:h.attempt_id}),usage:Ht(f.attempts||{},h.bead_id),current_child:de(h.bead_id),...J(h.bead_id)});else if((h.status==="failed"||h.status==="orphaned")&&Zd(h)){let ie=Na(h);Pa.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:Re.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,failed:!0,status:h.status,status_label:h.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:cr(zn,h.bead_id,{attempt_id:h.attempt_id}),resume_eligible:ie.eligible,resume_reason:ie.reason,conflict_resolution:oo(h),base_exception:Sa(Gn,h.target_base),usage:Ht(f.attempts||{},h.bead_id),current_child:de(h.bead_id),...J(h.bead_id)}),Vt=h}}let Vn=[...Pa,...Da].map(h=>{let j=Hn.get(h.attempt_id),ie=j?.quickfix_landing;if(j?.quickfix_lane!==!0||!ie||typeof ie!="object")return h;let Ge=typeof ie.reason=="string"&&ie.reason.length>0?ie.reason:null,ft=Fn({bead_id:j.bead_id,merge_sha:ie.head_sha,cleanup_cursor:ie.cursor,cleanup_failed:Ge?{step:ie.cursor,reason:Ge}:null,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]});return ft?{...h,landing:ft}:h}),qa=null;if(Vt){let h=Na(Vt),j=Vt.cause_detail;qa={bead_id:Vt.bead_id,repo:Vt.repo||"",reason:Vt.cause||Vt.status,cause_detail:j&&typeof j.reason=="string"?{reason:j.reason,command:typeof j.command=="string"?j.command:null}:null,resume_attempt_id:Vt.attempt_id,resume_eligible:h.eligible,resume_reason:h.reason,discard:cr(zn,Vt.bead_id,{attempt_id:Vt.attempt_id})}}let Fa=new Set(Vn.map(h=>h.bead_id)),ao=Array.isArray(f.merge_queue)?f.merge_queue:[],ja=new Map,Ba=new Map,Ua=new Map,Wa=new Map,za=new Map;ao.forEach((h,j)=>{h&&typeof h.bead_id=="string"&&(ja.set(h.bead_id,j+1),Ba.set(h.bead_id,h.resolution),Ua.set(h.bead_id,h.continuation_action||null),Wa.set(h.bead_id,h.head_review||null),za.set(h.bead_id,h.authority||null))});let Vr=f.merge_queue_state||{active:null,failures:{}},Xd=Vr.failures||{},Ha=Vr.waiting&&typeof Vr.waiting.bead_id=="string"&&typeof Vr.waiting.reason=="string"?Vr.waiting:null,Qd=f.auto_merge_skips||{},Ga=h=>{let j=Qd[h];if(!j)return null;let ie=Ye[h],Ge=ie&&ie.pr?ie.pr.head_sha:null;return Ge&&Ge===j.head_sha?j.reason||"":null},Kn=new Map;for(let h of Vn)h.failed!==!0&&h.conflict_resolution&&(h.paused?Kn.has(h.bead_id)||Kn.set(h.bead_id,"paused"):Kn.set(h.bead_id,"running"));let Va=Vn.filter(h=>!h.paused&&h.failed!==!0).length,Ka=(f.workspace_info||{}).slots,Ya=typeof Ka=="number"?Ka:typeof f.slots=="number"?f.slots:eo,Jd=Va>Ya,Yn=Nr(Z),eu=(Array.isArray(f.done)?f.done.slice():[]).filter(h=>Yn===void 0||typeof h.added_at!="number"||h.added_at>=Yn).sort((h,j)=>(j.added_at||0)-(h.added_at||0)),dn=no(eu,"done"),tu=new Set((Array.isArray(f.done)?f.done:[]).map(h=>h?.bead_id).filter(h=>typeof h=="string")),Za=[],ru=d?.()||"";for(let h of _){let j=jr(h.closed_at);if(typeof h.id!="string"||tu.has(h.id)||j===null||Yn!==void 0&&j<Yn||typeof h.comment_count!="number"||h.comment_count<=0)continue;let ie=`${ru}\0${h.id}\0${String(h.updated_at)}\0${h.comment_count}`,Ge=z.get(ie);Ge===void 0&&r&&(z.set(ie,"pending"),Promise.resolve(r("get-comments",{id:h.id})).then(ft=>{let Kt=Array.isArray(ft)&&ft.some(Tt=>Ms(typeof Tt?.text=="string"?Tt.text:"")?.lane==="session");z.set(ie,Kt?"session":"not-session"),F()}).catch(()=>{z.set(ie,"failed"),F()})),Ge==="session"&&Za.push({id:h.id,title:h.title||h.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:j,created_at:h.created_at,updated_at:h.updated_at})}dn.push(...Za),dn.sort((h,j)=>(j.done_at||0)-(h.done_at||0));let Zn={};for(let h of gr)Zn[h]=0;let Xa=!1,Qa=0,io=0,Ja=0;for(let h of dn){let j=h.usage;if(j&&typeof j=="object"){let ie=!1;for(let Ge of gr)Number.isFinite(j[Ge])&&(Zn[Ge]+=j[Ge],Xa=!0,ie=!0);ie&&(io+=1,Number.isFinite(j.total_cost_usd)&&(Qa+=j.total_cost_usd,Ja+=1))}}io>0&&Ja===io&&(Zn.total_cost_usd=Qa);let ei=dn.map(h=>h.usage).filter(h=>h&&typeof h=="object"&&h.providers),nu=ei.length>0?xt(ys(ei)):Xa?Qt(Zn):null,su=f.lane_states&&typeof f.lane_states=="object"&&!Array.isArray(f.lane_states)?f.lane_states:{},ou=Array.isArray(f.serial_lanes)?f.serial_lanes:[],ti=h=>{if(Ie.some(Ge=>Ge.bead_id===h))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let j=Gr.filter(Ge=>Ge&&Ge.bead_id===h),ie=j.length>0?j[j.length-1].status:null;return ie==="failed"||ie==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ie==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ri=ou.filter(h=>h&&typeof h.id=="string"&&Array.isArray(h.entries)).map((h,j)=>{let ie=su[h.id]||{},Ge=new Map((Array.isArray(ie.corrections)?ie.corrections:[]).filter(pt=>pt&&typeof pt.bead_id=="string"&&typeof pt.after=="string").map(pt=>[pt.bead_id,pt.after])),ft=no(h.entries.filter(pt=>!Fa.has(pt.bead_id)),h.id).map(pt=>Ge.has(pt.id)?{...pt,badges:[`\u{1F517} ${Ge.get(pt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...pt.badges]}:pt),Kt=Array.isArray(ie.occupied_by)?ie.occupied_by.filter(pt=>typeof pt=="string"):[],Tt=Kt.map(pt=>({id:pt,title:Re.get(pt)||pt,draggable:!1,lane:h.id,ghost:!0,badges:[ti(pt)]}));return{id:h.id,index:j+1,rows:[...Tt,...ft],occupied:Kt.length>0,badge:Kt.length>0?ti(Kt[0]):"\uB300\uAE30",cycle:ie.cycle===!0}}),au=typeof f.serial_lane_count=="number"?f.serial_lane_count:ri.length;return{queue:f,idToTitle:Re,candidates:Vd,candidate_hidden:{blocked:ro.hidden_blocked,spec:ro.hidden_spec},running:Vn,live_count:Va,slots:Ya,over_cap:Jd,failure:qa,waiting:no(sr.filter(h=>!Fa.has(h.bead_id)),"queue"),serial_lanes:ri,serial_lane_count:au,pr_wait:Ie.map(h=>og(h.bead_id,Re.get(h.bead_id)||h.bead_id,Ye,Be[h.bead_id]||null,Ht(f.attempts||{},h.bead_id),tt[h.bead_id]||(k.has(h.bead_id)||W.has(h.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Kn.get(h.bead_id)||null,h.external===!0,{position:ja.get(h.bead_id)||0,active:Vr.active===h.bead_id,failure:Xd[h.bead_id]||null,waiting:Ha?.bead_id===h.bead_id?Ha.reason:null,resolution:Ba.get(h.bead_id),continuation_action:Ua.get(h.bead_id),head_review:Wa.get(h.bead_id)||null,authority:za.get(h.bead_id)||null},h.wt_present!==!1,f.auto_merge===!0?Ga(h.bead_id):null,Sa(Gn,Yd(h.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[h.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},Hn.get(Ma.get(h.bead_id)||"")?.worker_serial===!0,f.auto_merge===!0,{merge_sha:h.merge_sha,cleanup_cursor:h.cleanup_cursor,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]})).map(h=>({...h,...J(h.id)})),merge_queue_length:ao.length,merge_queue_running:ao.length>0,auto_excluded:Ie.map(h=>h.bead_id).filter(h=>Ga(h)!==null),declared_base:Gn,done:dn,token_total:nu,cleanup_failures:bt,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function we(){let A=!!o?.get()?.job,I=!A&&o?.isPending?.()===!0,_=A?"\uBD84\uC11D \uC911":I?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${_?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${_?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${_?c`<span class="worker-analysis-btn__badge">${_}</span>`:""}
    </button>`}function Me(f){let A=f.waiting.length>0?f.waiting[0].id:"\u2014",I=c`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,_=v(f),M=f.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",te=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${L()} 완료 <b>${f.done.length}</b></span
      >`,de=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${f.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${f.declared_base||"?"}</span
    >`,Ne=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${eo}
          step="1"
          .value=${String(f.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Ad},(ut,w)=>w+1).map(ut=>c`<option
                value=${String(ut)}
                ?selected=${f.serial_lane_count===ut}
              >
                ${ut}
              </option>`)}
        </select>
      </label>
      ${o?we():""} `,Re=Oc({failure:f.failure}),ct=hc(f.repo_operations,f.cleanup_failures);return q?c`<div class="worker-ribbon">
          ${I} ${_}
          <div class="worker-kpi worker-kpi--ribbon">${M}${te}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ne}</div>
          <div class="worker-kpi">${de}</div>
        </div>
        ${ct}${ve.template()}${Re}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${I}${_}${Ne}</div>
        <div class="worker-kpi">
          ${M}${te}${de}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${L()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(ut=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${ut.tooltip}
                >${L()} 완료 · 누적 ${ut.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${A}</b></span
          >
        </div>
      </div>
      ${ct}${ve.template()}${Re}`}function Pe(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let A=f.running.some(I=>!I.paused&&I.failed!==!0);return c`<section
      class="worker-now${A?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${f.running.length+f.pr_wait.length}</span
        >
      </header>
      ${f.running.length>0?fa(f.running,Date.now(),_e):""}
      ${f.pr_wait.map(I=>oa(I))}
    </section>`}function ke(f){let A=f.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${B.show_blocked}
        />
        🔒 blocked${A.blocked>0?` ${A.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${jm.map(I=>c`<button
              type="button"
              class="worker-filter__chip${B.spec===I.value?" is-active":""}"
              data-spec=${I.value}
              aria-pressed=${B.spec===I.value?"true":"false"}
            >
              ${I.label}
            </button>`)}
        ${A.spec>0?c`<span class="worker-filter__hidden">숨김 ${A.spec}</span>`:""}
      </div>
    </div>`}function Ve(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${ee}
    >
      ${Bm.map(f=>c`<option value=${f.value} ?selected=${ee===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function U(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${Z}
      >
        ${or.map(f=>c`<option value=${f.value} ?selected=${Z===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function X(f){let A=c`<span
      class="worker-lane__badge${f.occupied?" worker-lane__badge--held":""}"
      >${f.badge}</span
    >`,I=f.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return rr({id:`worker-pane-lane-${f.id}`,lane:f.id,title:`\uC9C1\uB82C ${f.index}`,items:f.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:A,controls:I})}function v(f){let A=f.queue.auto_merge===!0;if(f.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${A?" is-active":""}"
        title=${A?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${A?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${f.merge_queue_length}
      </button>`;if(A)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let I=new Set(f.auto_excluded),_=f.pr_wait.filter(M=>M.merge_action&&M.merge_enabled&&!I.has(M.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${_>0?` ${_}`:""}
    </button>`}function C(f){let A=rr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ve(),controls:ke(f)});return q?c`<div class="worker-lanes worker-lanes--mobile">
        ${Pe(f)}
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:S.queue,preview:Ed(f.waiting)})}
        ${f.serial_lanes.map(I=>X(I))}
        ${A}
        ${rr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:U(),collapsible:!0,collapsed:S.done,preview:Array.isArray(f.token_total)?f.token_total.map(I=>I.label).join(" \xB7 "):f.token_total||Ed(f.done)})}
      </div>`:c`<div class="worker-lanes">
      ${A}
      <div class="worker-wait">
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${f.serial_lanes.map(I=>X(I))}
      </div>
      ${rr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(I=>!I.paused&&I.failed!==!0),body:fa(f.running,Date.now(),_e)})}
      ${rr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${rr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${L()} ${f.done.length}`,items:f.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:U()})}
    </div>`}function N(f){S={...S,[f]:!S[f]},Km(S),F()}function F(){let f=be();Ze(Me(f),Le),Ze(C(f),nt)}function me(){let f=document.querySelector(".app-header");if(!f)return;let A=()=>{let I=Math.round(f.getBoundingClientRect().height);se.style.setProperty("--worker-ribbon-top",`${I}px`)};if(A(),typeof ResizeObserver=="function"){let I=new ResizeObserver(A);I.observe(f),Q.push(()=>I.disconnect())}else window.addEventListener("resize",A),Q.push(()=>window.removeEventListener("resize",A))}function $e(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(Gm);q=!!f.matches;let A=I=>{let _=!!(I&&typeof I.matches=="boolean"?I.matches:f.matches);_!==q&&(q=_,F())};typeof f.addEventListener=="function"?(f.addEventListener("change",A),Q.push(()=>f.removeEventListener("change",A))):typeof f.addListener=="function"&&(f.addListener(A),Q.push(()=>f.removeListener(A)))}let ce=null;function ot(f){ce=f.target instanceof Element?f.target:null}function Se(f){let I=f.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!I)return;if(ce&&I.contains(ce)&&ce.closest("input, button, a")){f.preventDefault();return}let _=I.dataset.beadId||"",M=I.dataset.lane||"";T={bead_id:_,from_lane:M};try{f.dataTransfer?.setData("text/plain",_),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function gt(f){let A=f.target?.closest?.(".worker-pane");if(!A)return;let I=A.dataset.lane||"";I!=="candidate"&&I!=="queue"&&!/^s[1-5]$/.test(I)||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),A.classList.add("worker-pane--drag-over"))}function Ke(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Et(f,A){let I=P.find(de=>de.id===f);if(!I)return;let _=P.filter(de=>de.id!==f),M=_.length;if(A){let de=A.dataset.beadId;if(de===f)return;let Ne=_.findIndex(Re=>Re.id===de);Ne>=0&&(M=Ne)}let te=_.slice();te.splice(M,0,I),R.applyReorder(f,te,M)}function Ut(f){let A=f.target?.closest?.(".worker-pane");if(!A)return;f.preventDefault(),A.classList.remove("worker-pane--drag-over");let I=A.dataset.lane||"",_=T?.bead_id||f.dataTransfer?.getData("text/plain")||"",M=T?.from_lane||"";if(T=null,!_)return;let te=f.target?.closest?.(".worker-mini, .worker-card"),de=Array.from(A.querySelectorAll(".worker-mini, .worker-card")),Ne=de.length;if(te){let Re=de.indexOf(te);Re>=0&&(Ne=Re)}if(Ne=Math.max(0,Ne-A.querySelectorAll(".worker-mini--ghost").length),A.classList.contains("worker-pane--collapsed")&&(Ne=G()),I==="candidate"){if(M==="candidate"){Et(_,te);return}(M==="queue"||/^s[1-5]$/.test(M))&&Te(_);return}if(I==="queue"||/^s[1-5]$/.test(I)){let Re=I==="queue"?"parallel":I;M===I?ye(_,Re,Ne):V(_,Re,Ne)}}function dr(f){B=f,qm(f),F()}function vt(f){ee=f==="board"||f==="created"||f==="spec"?f:to,Wm(ee),F()}function Ct(f){Z=zt(f)?f:Ft,Hm(Z),p?.(Z),F()}function ur(f){let A=f.target?.closest?.(".worker-serial-lane-count");if(A){let Ne=Number.parseInt(A.value,10);Number.isFinite(Ne)&&le(Ne).then(F);return}let I=f.target?.closest?.(".worker-filter__blocked");if(I){dr({...B,show_blocked:I.checked});return}let _=f.target?.closest?.(".worker-done-range");if(_){Ct(_.value);return}let M=f.target?.closest?.(".worker-sort");if(M){vt(M.value||to);return}let te=f.target?.closest?.(".worker-slots__input");if(!te)return;let de=Number.parseInt(te.value,10);if(!Number.isFinite(de)){F();return}ne(de).then(F)}function pr(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function qt(){let f=be();return{operations:f.repo_operations,cleanup_failures:f.cleanup_failures,repo:d&&d()||""}}function nr(){_e&&fe.close(),rt.hidden=!1,ze.hidden=!1,xe.open(qt()),F()}function wt(f){let A=Oe(),I=A.attempts?A.attempts[f]:null;_e=f,qe=null,xe.close(),rt.hidden=!0,ze.hidden=!1,fe.open({attempt_id:f,meta:pr(I)}),F()}function fr(f,A){_e=null,qe=f,xe.close(),rt.hidden=!0,ze.hidden=!1,fe.open({attempt_id:f,meta:A,hide_prompt:!0}),F()}function Je(){if(xe.isOpen()&&xe.refresh(qt()),qe){let I=(o?.get()?.runs||[]).find(_=>_.run_id===qe);I?fe.updateMeta(xa(I)):fe.close();return}if(!_e)return;let f=Oe(),A=f.attempts?f.attempts[_e]:null;if(A){fe.updateMeta(pr(A));return}fe.close()}function Pt(f){let A=f.target;if(A?.closest?.(".worker-mini__serial, .worker-mini__grip")||A?.closest?.("#worker-parallel-analysis-dialog"))return;if(A?.closest?.(".worker-analysis-btn")){je?.open();return}if(A?.closest?.(".worker-repo-strip")||A?.closest?.(".worker-mini__timeline")){nr();return}let I=A?.closest?.(".worker-repo-op__session");if(I){let De=I.dataset.attemptId;De&&wt(De);return}let _=A?.closest?.(".worker-repo-op__resolve");if(_){K(_.dataset.operationId||"");return}let M=A?.closest?.(".worker-repo-op__dismiss");if(M){Y(M.dataset.operationId||"");return}let te=A?.closest?.(".worker-cleanup__resume");if(te){let De=te.dataset.beadId;De&&H(De);return}let de=A?.closest?.(".worker-banner__resume");if(de){let De=de.dataset.attemptId;De&&He(De);return}let Ne=A?.closest?.(".worker-banner__discard");if(Ne){let De=Ne.dataset.confirmation==="merged"?"merged":"unmerged";m(Ne.dataset.beadId||"",Ne.dataset.attemptId||null,De,Ne.dataset.operationId||null);return}let Re=A?.closest?.(".worker-banner__dismiss");if(Re){let De=Re.dataset.attemptId;De&&Ae(De);return}if(A?.closest?.(".worker-play")){D(!Oe().auto_advance);return}let ct=A?.closest?.(".worker-merge-all");if(ct){ct.classList.contains("worker-merge-all--stop")?Oe().auto_merge===!0?Ce(!1):pe():Ce(!0);return}let ut=A?.closest?.(".worker-pane__hd--toggle");if(ut){let De=ut.dataset.lane;(De==="queue"||De==="done")&&N(De);return}let w=A?.closest?.(".worker-card__place");if(w){let De=w.dataset.beadId;De&&!w.disabled&&V(De,"parallel",G());return}let y=A?.closest?.(".worker-filter__chip");if(y){let De=y.dataset.spec;(De==="all"||De==="with"||De==="without")&&dr({...B,spec:De});return}let g=A?.closest?.(".worker-mini__merge");if(g){let De=g.dataset.beadId||"";Oe().cleanup_failed?.[De]?H(De):Qe(De);return}let O=A?.closest?.(".worker-mini__merge-cancel");if(O){We(O.dataset.beadId||"");return}let E=A?.closest?.(".worker-mini__discard");if(E){m(E.dataset.beadId||"",E.dataset.attemptId||null,E.dataset.discardMode==="merged"?"merged":"unmerged",E.dataset.operationId||null);return}let J=A?.closest?.(".worker-mini__stale-continue");if(J){$("worker-stale-work-continue",J.dataset.beadId||"",J.dataset.actionId||"");return}let Ie=A?.closest?.(".worker-mini__stale-backup");if(Ie){$("worker-stale-work-backup-fresh",Ie.dataset.beadId||"",Ie.dataset.actionId||"");return}let Ye=A?.closest?.(".worker-mini__stale-recheck");if(Ye){$("worker-stale-work-recheck",Ye.dataset.beadId||"",Ye.dataset.actionId||"");return}let tt=A?.closest?.(".worker-mini__revise-fix");if(tt){x("worker-revise-fix",tt.dataset.beadId||"");return}let Be=A?.closest?.(".worker-mini__revise-approve");if(Be){x("worker-revise-approve",Be.dataset.beadId||"");return}if(A?.closest?.(".worker-mini__pr"))return;if(A?.closest?.(".rtile__discard")){let De=A?.closest?.(".rtile"),ht=De?.dataset?.beadId,cn=De?.dataset?.attemptId;ht&&m(ht,cn||null,"unmerged",A?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(A?.closest?.(".rtile__dismiss")){let ht=A?.closest?.(".rtile")?.dataset?.attemptId;ht&&Ae(ht);return}if(A?.closest?.(".rtile__pause")){let ht=A?.closest?.(".rtile")?.dataset?.attemptId;ht&&Ue(ht);return}if(A?.closest?.(".rtile__resume")){let ht=A?.closest?.(".rtile")?.dataset?.attemptId;ht&&He(ht);return}if(A?.closest?.(".rtile__session")){let ht=A?.closest?.(".rtile")?.dataset?.attemptId;ht&&wt(ht);return}if(A?.closest?.(".worker-drawer-overlay__backdrop")){xe.close(),fe.close();return}if(A?.closest?.(".worker-drawer-host"))return;let bt=A?.closest?.(".rtile");if(bt){if(A?.closest?.(".rtile__id")){let ht=bt.dataset.beadId;ht&&Xt(ht).then(cn=>{cn?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let De=bt.dataset.beadId;De&&l&&l(De);return}let sr=A?.closest?.(".worker-mini, .worker-card");if(sr){let De=sr.dataset.beadId;if(A?.closest?.(".worker-mini__id, .worker-card__id")){De&&Xt(De).then(ht=>{ht?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}De&&l&&l(De)}}return e.addEventListener("pointerdown",ot),e.addEventListener("dragstart",Se),e.addEventListener("dragover",gt),e.addEventListener("dragleave",Ke),e.addEventListener("drop",Ut),e.addEventListener("click",Pt),e.addEventListener("change",ur),$e(),me(),b&&Q.push(b.subscribe(()=>{for(let[f,A]of z)A==="failed"&&z.delete(f);F()})),s&&Q.push(s.subscribe(()=>{let f=d&&d()||"";f!==Fe&&(Fe=f,Ee.close()),F(),Je()})),o&&typeof o.subscribe=="function"&&Q.push(o.subscribe(()=>{Je(),F()})),F(),{load(){F()},destroy(){for(let f of Q.splice(0))try{f()}catch{}e.removeEventListener("pointerdown",ot),e.removeEventListener("dragstart",Se),e.removeEventListener("dragover",gt),e.removeEventListener("dragleave",Ke),e.removeEventListener("drop",Ut),e.removeEventListener("click",Pt),e.removeEventListener("change",ur);try{fe.destroy()}catch{}ze.hidden=!0;try{je?.destroy()}catch{}try{Ee.destroy()}catch{}Ze(c``,e)}}}function Ta(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Od(e,t,r,n=async()=>{},s=async()=>{}){let o=_t("views:workspace-picker"),a=null,i=!1,l=!1,d=!1;async function u(q){let W=q.target.value,ue=t.getState().workspace?.current?.path||"";if(W&&W!==ue){o("switching workspace to %s",W),i=!0,S();try{await r(W)}catch(Q){o("workspace switch failed: %o",Q)}finally{i=!1,S()}}}async function p(){let q=t.getState(),k=q.workspace?.current?.path||q.workspace?.available?.[0]?.path||"";if(!(!k||l)){o("git-pulling workspace %s",k),l=!0,S();try{await n(k)}catch(W){o("workspace git pull failed: %o",W)}finally{l=!1,S()}}}function b(q){let k=q.target;k&&e.contains(k)||P()}function R(q){q.key==="Escape"&&P()}function T(){d||(d=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",R),S())}function P(){d&&(d=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",R),S())}function B(){d?P():T()}async function ee(q){let k=q.target,W=k.value,oe=k.checked;o("toggling visibility %s \u2192 %s",W,String(oe));try{await s(W,oe)}catch(ue){o("workspace visibility toggle failed: %o",ue)}}function Z(q){return q?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${p}
        ?disabled=${i||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function z(q,k){return c`
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
        ${d?c`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${q.map(W=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${W.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${W.path}"
                        .checked=${!k.has(W.path)}
                        @change=${ee}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Ta(W.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function L(){let q=t.getState(),k=q.workspace?.current,W=q.workspace?.available||[],oe=new Set(q.workspace?.hidden||[]),ue=k?.path||W[0]?.path||"";if(W.length===0)return c``;let Q=W.filter(se=>!oe.has(se.path)||se.path===ue);if(Q.length<=1){let se=Q[0]||W[0],Le=Ta(se.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${se.path}"
            >${Le}</span
          >
          ${z(W,oe)}
          ${Z(ue)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${u}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${Q.map(se=>c`
              <option
                value="${se.path}"
                ?selected=${se.path===ue}
                title="${se.path}"
              >
                ${Ta(se.path)}
              </option>
            `)}
        </select>
        ${z(W,oe)}
        ${Z(ue)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function S(){Ze(L(),e)}return S(),a=t.subscribe(()=>S()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",R),Ze(c``,e)}}}var Md=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Ca(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Pd(e,t,r=Ca()){return{id:r,type:e,payload:t}}function Dd(e={}){let t=_t("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,d=new Map,u=[],p=new Map,b=new Set;function R(L){for(let S of Array.from(b))try{S(L)}catch{}}function T(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),R(o);let L=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),S=(r.jitterRatio||0)*L,q=Math.max(0,Math.round(L+(Math.random()*2-1)*S));t("ws retry in %d ms (attempt %d)",q,a+1),i=setTimeout(()=>{i=null,z()},q)}function P(L){try{s?.send(JSON.stringify(L))}catch(S){t("ws send failed",S)}}function B(){for(o="open",t("ws open"),R(o),a=0;u.length;){let L=u.shift();L&&P(L)}}function ee(L){let S;try{S=JSON.parse(String(L.data))}catch{t("ws received non-JSON message");return}if(!S||typeof S.id!="string"||typeof S.type!="string"){t("ws received invalid envelope");return}if(d.has(S.id)){let k=d.get(S.id);d.delete(S.id),S.ok?k?.resolve(S.payload):k?.reject(S.error||new Error("ws error"));return}let q=p.get(S.type);if(q&&q.size>0)for(let k of Array.from(q))try{k(S.payload)}catch(W){t("ws event handler error",W)}else t("ws received unhandled message type: %s",S.type)}function Z(){o="closed",t("ws closed"),R(o);for(let[L,S]of d.entries())S.reject(new Error("ws disconnected")),d.delete(L);a+=1,T()}function z(){if(!l)return;let L=n();try{s=new WebSocket(L),t("ws connecting %s",L),o="connecting",R(o),s.addEventListener("open",B),s.addEventListener("message",ee),s.addEventListener("error",()=>{}),s.addEventListener("close",Z)}catch(S){t("ws connect failed %o",S),T()}}return z(),{send(L,S){if(!Md.includes(L))return Promise.reject(new Error(`unknown message type: ${L}`));let q=Ca(),k=Pd(L,S,q);return t("send %s id=%s",L,q),new Promise((W,oe)=>{d.set(q,{resolve:W,reject:oe,type:L}),s&&s.readyState===s.OPEN?P(k):(t("queue %s id=%s (state=%s)",L,q,o),u.push(k))})},on(L,S){p.has(L)||p.set(L,new Set);let q=p.get(L);return q?.add(S),()=>{q?.delete(S)}},onConnection(L){return b.add(L),()=>{b.delete(L)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,z()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function ag(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function ig(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Ra=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Nd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],Rr="tab:worker:closed",lg="bdui.worker.done-range",qd=Qc,Fd="worker:queue",jd="worker:parallel-analysis",Bd="ui:order",Ud="ui:display-policy",Wd="exec:presets",Ir="tab:board:closed",zd="beads-ui.board.closed-range";function cg(e){let t=_t("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ze(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&ud(s),o&&a&&i&&l){let nt=function(w,y){let g="Request failed",O="";if(w&&typeof w=="object"){let J=w;if(typeof J.message=="string"&&J.message.length>0&&(g=J.message),typeof J.details=="string")O=J.details;else if(J.details&&typeof J.details=="object")try{O=JSON.stringify(J.details,null,2)}catch{O=""}}else typeof w=="string"&&w.length>0&&(g=w);let E=y&&y.length>0?`Failed to load ${y}`:"Request failed";rt.open(E,g,O)},Qe=function(w){return`${Je.getState().workspace.current?.path||""}\0${w}`},H=function(){G&&(G().catch(()=>{}),G=null),V=null,ye=null},Ce=function(w){Te=w;let y=()=>{Te!==w||Je.getState().selected_id!==w||(Te=null,re(w))};if(!Ae){He.then(y);return}y()},$=function(w,y,g,O,E){return g!==m[y]?(E().catch(()=>{}),!1):(w.set(O,E),!0)},D=function(){let w=Je.getState();be(w.view==="board"),U(w.view==="worker"),F(w.view==="monitor"),v(w.view==="board"||w.view==="worker"||x||!!w.selected_id)},ne=function(){let w=Nr(K);return w===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:w}}},le=function(){let w=Nr(Y);return w===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:w}}},be=function(w){if(w)for(let[y,g]of Ra){if(We.has(y)||pe.has(y))continue;let O=y===Ir?ne():{type:g};try{xe.register(y,O)}catch(Ie){t("register %s store failed: %o",y,Ie)}pe.add(y);let E=m.board,J=!1;fe.subscribeList(y,O).then(Ie=>{J=!$(We,"board",E,y,Ie)}).catch(Ie=>{t("subscribe %s failed: %o",y,Ie),nt(Ie,"board")}).finally(()=>{pe.delete(y),J&&D()})}else Pe()},Pe=function(){m.board+=1;for(let[w]of Ra){let y=We.get(w);y&&(y().catch(()=>{}),We.delete(w));try{xe.unregister(w)}catch(g){t("unregister %s failed: %o",w,g)}}},U=function(w){if(!w){X();return}for(let[y,g]of Nd){if(ke.has(y)||pe.has(y))continue;let O=y===Rr?le():{type:g};try{xe.register(y,O)}catch(Ie){t("register %s store failed: %o",y,Ie)}pe.add(y);let E=m.worker,J=!1;fe.subscribeList(y,O).then(Ie=>{J=!$(ke,"worker",E,y,Ie)}).catch(Ie=>{t("subscribe %s failed: %o",y,Ie),nt(Ie,"worker")}).finally(()=>{pe.delete(y),J&&D()})}},X=function(){m.worker+=1;for(let[w]of Nd){let y=ke.get(w);y&&(y().catch(()=>{}),ke.delete(w));try{xe.unregister(w)}catch(g){t("unregister %s failed: %o",w,g)}}},v=function(w){if(!w){C();return}Ve||(qe("subscribe-worker-queue",{id:Fd}).catch(y=>{t("subscribe-worker-queue failed: %o",y)}),qe("subscribe-worker-parallel-analysis",{id:jd}).catch(y=>{t("subscribe-worker-parallel-analysis failed: %o",y)}),Ve=()=>(qe("unsubscribe-worker-parallel-analysis",{id:jd}),qe("unsubscribe-worker-queue",{id:Fd})))},C=function(){Ve&&(Ve().catch(()=>{}),Ve=null),Fe.clear()},F=function(w){if(!w){me();return}N||(qe("subscribe-monitor-pipeline",{id:qd}).catch(y=>{t("subscribe-monitor-pipeline failed: %o",y)}),N=()=>qe("unsubscribe-monitor-pipeline",{id:qd}))},me=function(){N&&(N().catch(()=>{}),N=null)},ce=function(){$e||(qe("subscribe-ui-order",{id:Bd}).catch(w=>{t("subscribe-ui-order failed: %o",w)}),$e=()=>qe("unsubscribe-ui-order",{id:Bd}))},ot=function(){$e&&($e().catch(()=>{}),$e=null),je.clear()},gt=function(){Se||(qe("subscribe-display-policy",{id:Ud}).catch(w=>{t("subscribe-display-policy failed: %o",w)}),Se=()=>qe("unsubscribe-display-policy",{id:Ud}))},Ke=function(){Se&&(Se().catch(()=>{}),Se=null),Oe.clear()},Ut=function(){Et||(qe("subscribe-impl-presets",{id:Wd}).catch(w=>{t("subscribe-impl-presets failed: %o",w)}),Et=()=>qe("unsubscribe-impl-presets",{id:Wd}))},qt=function(w){if(!w)return"Unknown";let y=w.split("/").filter(Boolean);return y.length>0?y[y.length-1]:"Unknown"};var d=nt,u=Qe,p=H,b=Ce,R=$,T=D,P=ne,B=le,ee=be,Z=Pe,z=U,L=X,S=v,q=C,k=F,W=me,oe=ce,ue=ot,Q=gt,se=Ke,Le=Ut,ze=qt;let Xe=document.getElementById("header-loading"),at=Bi(Xe),rt=gc(e),_e=Dd(),qe=at.wrapSend((w,y)=>_e.send(w,y)),fe=Oi(qe),xe=Mi(),Ee=Ni(),Fe=Di(),ve=hi(),je=Pi(),Oe=gi(),ge=bi(),he=yi();_e.on("impl-presets-snapshot",w=>{let y=w;y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&ge.set({revision:y.revision,presets:y.presets})}),_e.on("monitor-pipeline-snapshot",w=>{let y=w;if(!(!y||!Array.isArray(y.workspaces)))try{ve.set(y.workspaces,y.workspaces_state)}catch{}}),_e.on("ui-order-snapshot",w=>{let y=w;if(y&&typeof y.revision=="number")try{je.set({revision:y.revision,order:y.order&&typeof y.order=="object"?y.order:{}})}catch{}}),_e.on("display-policy-snapshot",w=>{let y=w;if(y&&y.policy&&typeof y.policy=="object")try{Oe.set(y.policy)}catch{}}),_e.on("session-log-snapshot",w=>{let y=w;if(y&&typeof y.id=="string")try{he.set(y.id,Array.isArray(y.lines)?y.lines:[],typeof y.last_event_at=="number"?y.last_event_at:null)}catch{}}),_e.on("session-log-append",w=>{let y=w;if(y&&typeof y.id=="string")try{he.append(y.id,y.event)}catch{}}),_e.on("snapshot",w=>{let y=w,g=y&&typeof y.id=="string"?y.id:"",O=g?xe.getStore(g):null;if(O&&y&&y.type==="snapshot")try{O.applyPush(y)}catch{}}),_e.on("upsert",w=>{let y=w,g=y&&typeof y.id=="string"?y.id:"",O=g?xe.getStore(g):null;if(O&&y&&y.type==="upsert")try{O.applyPush(y)}catch{}}),_e.on("delete",w=>{let y=w,g=y&&typeof y.id=="string"?y.id:"",O=g?xe.getStore(g):null;if(O&&y&&y.type==="delete")try{O.applyPush(y)}catch{}});let G=null,V=null,ye=null,Te=null,Ue=()=>{},He=new Promise(w=>{Ue=()=>w(void 0)}),Ae=!1,st=!1;async function re(w){let y=Qe(w);if(y===V||y===ye)return;ye=y;let g=`detail:${w}`,O={type:"issue-detail",params:{id:w}};try{xe.register(g,O)}catch(E){t("register detail store failed: %o",E)}try{let E=await fe.subscribeList(g,O);if(Je.getState().selected_id!==w||Qe(w)!==y){await E().catch(()=>{});return}G&&await G().catch(()=>{}),G=E,V=y}catch(E){t("detail subscribe failed: %o",E),nt(E,"issue details")}finally{ye===y&&(ye=null)}}let We=new Map,pe=new Set,m={board:0,worker:0},x=!1,K=Ft;try{let w=window.localStorage.getItem(zd);zt(w)&&(K=w)}catch{}let Y=Ft;try{let w=window.localStorage.getItem(lg);zt(w)&&(Y=w)}catch{}async function we(w){if(!zt(w)||w===K)return;K=w;try{window.localStorage.setItem(zd,w)}catch{}let y=We.get(Ir);if(!y)return;We.delete(Ir),await y().catch(()=>{});let g=ne();try{xe.register(Ir,g)}catch(O){t("register %s store failed: %o",Ir,O)}try{let O=await fe.subscribeList(Ir,g);We.set(Ir,O)}catch(O){t("re-subscribe %s failed: %o",Ir,O),nt(O,"board")}}async function Me(w){if(!zt(w)||w===Y)return;Y=w;let y=ke.get(Rr);if(!y)return;ke.delete(Rr),await y().catch(()=>{});let g=le();try{xe.register(Rr,g)}catch(O){t("register %s store failed: %o",Rr,O)}try{let O=await fe.subscribeList(Rr,g);ke.set(Rr,O)}catch(O){t("re-subscribe %s failed: %o",Rr,O),nt(O,"worker")}}let ke=new Map,Ve=null,N=null,$e=null,Se=null,Et=null;async function dr(){Se=null,Oe.clear(),Et=null,ge.clear(),Ve=null,N=null,We.clear(),ke.clear(),m.board+=1,m.worker+=1,Ut();let w=Je.getState().workspace.current?.path;if(w)try{await _e.send("set-workspace",{path:w})}catch(g){t("workspace restore after reconnect failed: %o",g);return}gt();let y=Je.getState();be(y.view==="board"),U(y.view==="worker"),F(y.view==="monitor"),v(y.view==="board"||y.view==="worker"||!!y.selected_id)}async function vt(){t("clearing all subscriptions for workspace switch"),Pe(),X(),C(),Ee.clear(),ot(),ce(),Ke(),gt(),H();let w=Je.getState();if(w.selected_id)try{xe.unregister(`detail:${w.selected_id}`)}catch{}let y=Je.getState();be(y.view==="board"),U(y.view==="worker"),F(y.view==="monitor"),v(y.view==="board"||y.view==="worker"||!!y.selected_id),y.selected_id&&Ce(y.selected_id)}async function Ct(w){t("requesting workspace switch to %s",w),st=!0;try{let y=await _e.send("set-workspace",{path:w});t("workspace switch result: %o",y),y&&y.workspace&&(Je.setState({workspace:{current:{path:y.workspace.root_dir,database:y.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",w),y.changed&&(await vt(),ae("Switched to "+qt(w),"success",2e3)))}catch(y){throw t("workspace switch failed: %o",y),ae("Failed to switch workspace","error",3e3),y}finally{st=!1}}async function ur(w){t("requesting workspace git pull for %s",w);try{let y=await _e.send("git-pull-workspace",{});t("workspace git pull result: %o",y);let g=y?.status;if(g==="up_to_date"){ae("Already up to date","success",2e3);return}if(g==="stash_pop_conflict"){ae("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ae("Git pulled "+qt(w),"success",2e3)}catch(y){t("workspace git pull failed: %o",y);let g=y?.code,O=y?.message;if(g==="rebase_conflict"){ae("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(g==="rebase_conflict_abort_failed"){ae("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(g==="busy"){ae("Git pull skipped: another operation is running","warning",3e3);return}let E=O?`: ${O}`:"";throw ae(`Git pull failed${E}`,"error",3e3),y}}async function pr(w,y){t("setting workspace visibility %s \u2192 %s",w,String(y));try{await _e.send("set-workspace-visibility",{path:w,visible:y}),await nr()}catch(g){t("workspace visibility update failed: %o",g),ae("Failed to update project visibility","error",3e3)}}async function nr(){try{let w=await _e.send("list-workspaces",{});if(t("workspaces loaded: %o",w),w&&Array.isArray(w.workspaces)){let y=w.workspaces.map(J=>({path:J.path,database:J.database,pid:J.pid,version:J.version})),g=w.current?{path:w.current.root_dir,database:w.current.db_path}:null,O=Array.isArray(w.hidden)?w.hidden.filter(J=>typeof J=="string"):[];Je.setState({workspace:{current:g,available:y,hidden:O}});let E=window.localStorage.getItem("beads-ui.workspace");E&&(!y.some(Ie=>Ie.path===E)||O.includes(E)?window.localStorage.removeItem("beads-ui.workspace"):g&&E!==g.path&&(t("restoring saved workspace preference: %s",E),await Ct(E)))}}catch(w){t("failed to load workspaces: %o",w)}}_e.on("workspace-changed",w=>{t("workspace-changed event: %o",w),w&&w.root_dir&&(Je.setState({workspace:{current:{path:w.root_dir,database:w.db_path}}}),nr(),vt())});let wt=!1;if(typeof _e.onConnection=="function"){let w=y=>{t("ws state %s",y),y==="reconnecting"||y==="closed"?(wt=!0,ae("Connection lost. Reconnecting\u2026","error",4e3)):y==="open"&&wt&&(wt=!1,ae("Reconnected","success",2200),ig(Je,(g,O)=>{t(`${g}: %o`,O)}),dr())};_e.onConnection(w)}let fr="board";try{let w=window.localStorage.getItem("beads-ui.view");(w==="board"||w==="worker"||w==="monitor")&&(fr=w)}catch(w){t("view parse error: %o",w)}let Je=ji({config:ag(),view:fr});_e.on("worker-queue-snapshot",w=>{let y=w;if(!y||!y.queue)return;let g=Je.getState().workspace.current?.path;if(typeof g=="string"&&g.length>0&&y.root_dir!==g){t("dropping worker-queue snapshot for %s",String(y.root_dir));return}try{Ee.set(y.queue)}catch{}}),_e.on("worker-parallel-analysis-snapshot",w=>{let y=w;if(!y)return;let g=Je.getState().workspace.current?.path;if(!(typeof g=="string"&&g.length>0&&typeof y.root_dir=="string"&&y.root_dir!==g))try{Fe.set({settings:y.settings,job:y.job??null,runs:Array.isArray(y.runs)?y.runs:[],last_good:y.last_good??null})}catch{}});let Pt=qi(Je);Pt.start();let f=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),A=async(w,y)=>{try{return await qe(w,y)}catch(g){if(f.has(w))throw g;return[]}};n&&ed(n,Je,Pt);let I=document.getElementById("workspace-picker");I&&Od(I,Je,Ct,ur,pr);let _=sd(e,(w,y)=>qe(w,y));try{let w=document.getElementById("new-issue-btn");w&&w.addEventListener("click",()=>_.open())}catch{}let M=ld(e,{policyStore:Oe,queueStore:Ee,implPresetStore:ge,transport:(w,y)=>qe(w,y),onOpenChange:w=>{x=w,D()},labelOptions:()=>{let w=new Set;for(let[y]of Ra)for(let g of xe.snapshotFor(y)||[]){let O=g.labels;if(Array.isArray(O))for(let E of O)typeof E=="string"&&E.length>0&&w.add(E)}return Array.from(w).sort()}});try{let w=document.getElementById("display-settings-btn");w&&(w.setAttribute("aria-label","\uC124\uC815"),w.setAttribute("title","\uC124\uC815"),w.addEventListener("click",()=>M.open()))}catch{}let te=Xi(o,{gotoIssue:w=>Pt.gotoIssue(w),issueStores:xe,transport:A,workerQueueStore:Ee,uiOrderStore:je,displayPolicyStore:Oe,closedRange:K,onClosedRangeChange:w=>{we(w)},onNewIssue:()=>_.open()}),de=Ea(a,{transport:A,issueStores:xe,queueStore:Ee,analysisStore:Fe,sessionLogStore:he,uiOrderStore:je,gotoIssue:w=>Je.setState({selected_id:w}),getWorkspacePath:()=>Je.getState().workspace.current?.path,doneRange:Y,onDoneRangeChange:w=>{Me(w)}}),Ne=Jc(i,{transport:A,pipelineStore:ve,execPresetStore:ge,gotoIssue:w=>Pt.gotoIssue(w),getWorkspacePath:()=>Je.getState().workspace.current?.path,switchWorkspace:w=>Ct(w)}),Re=mc(l,{issueStores:xe,transport:A,queueStore:Ee,execPresetStore:ge,sessionLogStore:he,getWorkspacePath:()=>Je.getState().workspace.current?.path,onNavigate:w=>{Je.getState().view==="worker"?Je.setState({selected_id:w}):Pt.gotoIssue(w)},onClose:()=>{let w=Je.getState();Je.setState({selected_id:null});try{Pt.gotoView(w.view==="worker"||w.view==="monitor"?w.view:"board")}catch{}},onOpenExecPresets:()=>{M.open("execution")}}),ct=Je.getState().selected_id;ct&&(l.hidden=!1,Re.load(ct),Ce(ct)),Je.subscribe(w=>{let y=w.selected_id;y?(l.hidden=!1,Re.load(y),st||Ce(y)):(Re.clear(),l.hidden=!0,H())});let ut=w=>{o.hidden=w.view!=="board",a.hidden=w.view!=="worker",i.hidden=w.view!=="monitor",be(w.view==="board"),U(w.view==="worker"),F(w.view==="monitor"),v(w.view==="board"||w.view==="worker"||x||!!w.selected_id),!w.selected_id&&w.view==="board"&&te.load(),w.view==="worker"&&de.load(),w.view==="monitor"?Ne.load():Ne.pause(),window.localStorage.setItem("beads-ui.view",w.view)};Je.subscribe(ut),ut(Je.getState()),ce(),gt(),Ut(),nr().finally(()=>{Ae=!0,Ue()}),window.addEventListener("keydown",w=>{let y=w.ctrlKey||w.metaKey,g=String(w.key||"").toLowerCase(),O=w.target,E=O&&O.tagName?String(O.tagName).toLowerCase():"",J=E==="input"||E==="textarea"||E==="select"||O&&typeof O.isContentEditable=="boolean"&&O.isContentEditable;y&&g==="n"&&(J||(w.preventDefault(),_.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&cg(t)});export{cg as bootstrap,ag as readBootstrapConfig,ig as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
