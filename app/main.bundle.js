var i_=Object.create;var Bi=Object.defineProperty;var a_=Object.getOwnPropertyDescriptor;var l_=Object.getOwnPropertyNames;var c_=Object.getPrototypeOf,u_=Object.prototype.hasOwnProperty;var d_=(e,t,n)=>t in e?Bi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ui=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var p_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of l_(t))!u_.call(e,s)&&s!==n&&Bi(e,s,{get:()=>t[s],enumerable:!(r=a_(t,s))||r.enumerable});return e};var f_=(e,t,n)=>(n=e!=null?i_(c_(e)):{},p_(t||!e||!e.__esModule?Bi(n,"default",{value:e,enumerable:!0}):n,e));var Lt=(e,t,n)=>d_(e,typeof t!="symbol"?t+"":t,n);var bc=Ui((qv,gc)=>{var Dr=1e3,Mr=Dr*60,Nr=Mr*60,hr=Nr*24,g_=hr*7,b_=hr*365.25;gc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return h_(e);if(n==="number"&&isFinite(e))return t.long?v_(e):y_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function h_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*b_;case"weeks":case"week":case"w":return n*g_;case"days":case"day":case"d":return n*hr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Nr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Mr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Dr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function y_(e){var t=Math.abs(e);return t>=hr?Math.round(e/hr)+"d":t>=Nr?Math.round(e/Nr)+"h":t>=Mr?Math.round(e/Mr)+"m":t>=Dr?Math.round(e/Dr)+"s":e+"ms"}function v_(e){var t=Math.abs(e);return t>=hr?mo(e,t,hr,"day"):t>=Nr?mo(e,t,Nr,"hour"):t>=Mr?mo(e,t,Mr,"minute"):t>=Dr?mo(e,t,Dr,"second"):e+" ms"}function mo(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var yc=Ui((Fv,hc)=>{function w_(e){n.debug=n,n.default=n,n.coerce=l,n.disable=i,n.enable=s,n.enabled=a,n.humanize=bc(),n.destroy=u,Object.keys(e).forEach(p=>{n[p]=e[p]}),n.names=[],n.skips=[],n.formatters={};function t(p){let g=0;for(let y=0;y<p.length;y++)g=(g<<5)-g+p.charCodeAt(y),g|=0;return n.colors[Math.abs(g)%n.colors.length]}n.selectColor=t;function n(p){let g,y=null,b,k;function L(...B){if(!L.enabled)return;let Y=L,le=Number(new Date),K=le-(g||le);Y.diff=K,Y.prev=g,Y.curr=le,g=le,B[0]=n.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let M=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(F,X)=>{if(F==="%%")return"%";M++;let V=n.formatters[X];if(typeof V=="function"){let ge=B[M];F=V.call(Y,ge),B.splice(M,1),M--}return F}),n.formatArgs.call(Y,B),(Y.log||n.log).apply(Y,B)}return L.namespace=p,L.useColors=n.useColors(),L.color=n.selectColor(p),L.extend=r,L.destroy=n.destroy,Object.defineProperty(L,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:(b!==n.namespaces&&(b=n.namespaces,k=n.enabled(p)),k),set:B=>{y=B}}),typeof n.init=="function"&&n.init(L),L}function r(p,g){let y=n(this.namespace+(typeof g>"u"?":":g)+p);return y.log=this.log,y}function s(p){n.save(p),n.namespaces=p,n.names=[],n.skips=[];let g=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of g)y[0]==="-"?n.skips.push(y.slice(1)):n.names.push(y)}function o(p,g){let y=0,b=0,k=-1,L=0;for(;y<p.length;)if(b<g.length&&(g[b]===p[y]||g[b]==="*"))g[b]==="*"?(k=b,L=y,b++):(y++,b++);else if(k!==-1)b=k+1,L++,y=L;else return!1;for(;b<g.length&&g[b]==="*";)b++;return b===g.length}function i(){let p=[...n.names,...n.skips.map(g=>"-"+g)].join(",");return n.enable(""),p}function a(p){for(let g of n.skips)if(o(p,g))return!1;for(let g of n.names)if(o(p,g))return!0;return!1}function l(p){return p instanceof Error?p.stack||p.message:p}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}hc.exports=w_});var vc=Ui((mn,go)=>{mn.formatArgs=$_;mn.save=x_;mn.load=A_;mn.useColors=k_;mn.storage=S_();mn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();mn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function k_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function $_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+go.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}mn.log=console.debug||console.log||(()=>{});function x_(e){try{e?mn.storage.setItem("debug",e):mn.storage.removeItem("debug")}catch{}}function A_(){let e;try{e=mn.storage.getItem("debug")||mn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function S_(){try{return localStorage}catch{}}go.exports=yc()(mn);var{formatters:E_}=go.exports;E_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var os=globalThis,ao=os.trustedTypes,ec=ao?ao.createPolicy("lit-html",{createHTML:e=>e}):void 0,zi="$lit$",Hn=`lit$${Math.random().toFixed(9).slice(2)}$`,Hi="?"+Hn,__=`<${Hi}>`,_r=document,is=()=>_r.createComment(""),as=e=>e===null||typeof e!="object"&&typeof e!="function",Gi=Array.isArray,ic=e=>Gi(e)||typeof e?.[Symbol.iterator]=="function",Wi=`[ 	
\f\r]`,ss=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,tc=/-->/g,nc=/>/g,pr=RegExp(`>|${Wi}(?:([^\\s"'>=/]+)(${Wi}*=${Wi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),rc=/'/g,sc=/"/g,ac=/^(?:script|style|textarea|title)$/i,Ki=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Ki(1),cs=Ki(2),Ov=Ki(3),An=Symbol.for("lit-noChange"),Gt=Symbol.for("lit-nothing"),oc=new WeakMap,fr=_r.createTreeWalker(_r,129);function lc(e,t){if(!Gi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ec!==void 0?ec.createHTML(t):t}var cc=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",i=ss;for(let a=0;a<n;a++){let l=e[a],u,p,g=-1,y=0;for(;y<l.length&&(i.lastIndex=y,p=i.exec(l),p!==null);)y=i.lastIndex,i===ss?p[1]==="!--"?i=tc:p[1]!==void 0?i=nc:p[2]!==void 0?(ac.test(p[2])&&(s=RegExp("</"+p[2],"g")),i=pr):p[3]!==void 0&&(i=pr):i===pr?p[0]===">"?(i=s??ss,g=-1):p[1]===void 0?g=-2:(g=i.lastIndex-p[2].length,u=p[1],i=p[3]===void 0?pr:p[3]==='"'?sc:rc):i===sc||i===rc?i=pr:i===tc||i===nc?i=ss:(i=pr,s=void 0);let b=i===pr&&e[a+1].startsWith("/>")?" ":"";o+=i===ss?l+__:g>=0?(r.push(u),l.slice(0,g)+zi+l.slice(g)+Hn+b):l+Hn+(g===-2?a:b)}return[lc(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ls=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,i=0,a=t.length-1,l=this.parts,[u,p]=cc(t,n);if(this.el=e.createElement(u,r),fr.currentNode=this.el.content,n===2||n===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=fr.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(zi)){let y=p[i++],b=s.getAttribute(g).split(Hn),k=/([.?@])?(.*)/.exec(y);l.push({type:1,index:o,name:k[2],strings:b,ctor:k[1]==="."?co:k[1]==="?"?uo:k[1]==="@"?po:gr}),s.removeAttribute(g)}else g.startsWith(Hn)&&(l.push({type:6,index:o}),s.removeAttribute(g));if(ac.test(s.tagName)){let g=s.textContent.split(Hn),y=g.length-1;if(y>0){s.textContent=ao?ao.emptyScript:"";for(let b=0;b<y;b++)s.append(g[b],is()),fr.nextNode(),l.push({type:2,index:++o});s.append(g[y],is())}}}else if(s.nodeType===8)if(s.data===Hi)l.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(Hn,g+1))!==-1;)l.push({type:7,index:o}),g+=Hn.length-1}o++}}static createElement(t,n){let r=_r.createElement("template");return r.innerHTML=t,r}};function mr(e,t,n=e,r){if(t===An)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=as(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=mr(e,s._$AS(e,t.values),s,r)),t}var lo=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??_r).importNode(n,!0);fr.currentNode=s;let o=fr.nextNode(),i=0,a=0,l=r[0];for(;l!==void 0;){if(i===l.index){let u;l.type===2?u=new Ir(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new fo(o,this,t)),this._$AV.push(u),l=r[++a]}i!==l?.index&&(o=fr.nextNode(),i++)}return fr.currentNode=_r,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Ir=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Gt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=mr(this,t,n),as(t)?t===Gt||t==null||t===""?(this._$AH!==Gt&&this._$AR(),this._$AH=Gt):t!==this._$AH&&t!==An&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ic(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Gt&&as(this._$AH)?this._$AA.nextSibling.data=t:this.T(_r.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ls.createElement(lc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new lo(s,this),i=o.u(this.options);o.p(n),this.T(i),this._$AH=o}}_$AC(t){let n=oc.get(t.strings);return n===void 0&&oc.set(t.strings,n=new ls(t)),n}k(t){Gi(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(is()),this.O(is()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},gr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Gt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Gt}_$AI(t,n=this,r,s){let o=this.strings,i=!1;if(o===void 0)t=mr(this,t,n,0),i=!as(t)||t!==this._$AH&&t!==An,i&&(this._$AH=t);else{let a=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=mr(this,a[r+l],n,l),u===An&&(u=this._$AH[l]),i||(i=!as(u)||u!==this._$AH[l]),u===Gt?t=Gt:t!==Gt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}i&&!s&&this.j(t)}j(t){t===Gt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},co=class extends gr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Gt?void 0:t}},uo=class extends gr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Gt)}},po=class extends gr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=mr(this,t,n,0)??Gt)===An)return;let r=this._$AH,s=t===Gt&&r!==Gt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Gt&&(r===Gt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},fo=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){mr(this,t)}},uc={M:zi,P:Hn,A:Hi,C:1,L:cc,R:lo,D:ic,V:mr,I:Ir,H:gr,N:uo,U:po,B:co,F:fo},m_=os.litHtmlPolyfillSupport;m_?.(ls,Ir),(os.litHtmlVersions??(os.litHtmlVersions=[])).push("3.3.1");var et=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Ir(t.insertBefore(is(),o),o,void 0,n??{})}return s._$AI(e),s};var _o="today",dc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Pr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Bn(e){return e==="today"?"today":"7d"}function Vi(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function br(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function pc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function fc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function _c(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,i,a){e=Array.isArray(o)?o:null,t=Array.isArray(i)?i:[],n=a===void 0?void 0:a!==null&&typeof a=="object"&&typeof a.revision=="number"&&Array.isArray(a.lanes)?{revision:a.revision,lanes:a.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function mc(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,i=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof i=="number"?i:null}),r()},append(s,o){let i=n(s),a=e.get(i)||{lines:[],last_event_at:null};a.lines=[...a.lines,o],a.last_event_at=Date.now(),e.set(i,a),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var wc=f_(vc(),1);function Ft(e){return(0,wc.default)(`beads-ui:${e}`)}function Rn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function yr(e,t){let n=Rn(e.created_at),r=Rn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function xc(e,t){let n=Rn(e.created_at),r=Rn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function bo(e,t){let n=Rn(e.updated_at),r=Rn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ac(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=Rn(e.created_at),o=Rn(t.created_at);if(s!==o)return s<o?1:-1;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function Sc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var T_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function kc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function $c(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=T_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Ec(e,t){let n=kc(e),r=kc(t);if(n!==r)return n<r?-1:1;let s=$c(e),o=$c(t);if(s!==o)return s<o?-1:1;let i=Rn(e&&e.created_at),a=Rn(t&&t.created_at);if(i!==a)return i<a?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var Yi=2**20;function qr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Rn(e&&e.created_at)}function ho(e){return(t,n)=>{let r=qr(t,e),s=qr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,i=n?.id;return o<i?-1:o>i?1:0}}function Zi(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),i=o-1>=0?r[o-1]:null,a=o+1<s?r[o+1]:null;if(!i&&!a)return{rank:0};if(!i)return{rank:qr(a,n)-Yi};if(!a)return{rank:qr(i,n)+Yi};let l=qr(i,n),u=qr(a,n),p=(l+u)/2;return l<p&&p<u?{rank:p}:{renormalize:r.map((g,y)=>({bead_id:g.id,rank:y*Yi}))}}function Qi(e,t={}){let n=Ft(`issue-store:${e}`),r=new Map,s=[],o=0,i=new Set,a=!1,l=t.sort||yr;function u(){for(let y of Array.from(i))try{y()}catch{}}function p(){s=Array.from(r.values()).sort(l)}function g(y){if(a||!y||y.id!==e)return;let b=Number(y.revision)||0;if(n("apply %s rev=%d",y.type,b),!(b<=o&&y.type!=="snapshot")){if(y.type==="snapshot"){if(b<=o)return;r.clear();let k=Array.isArray(y.issues)?y.issues:[];for(let L of k)L&&typeof L.id=="string"&&L.id.length>0&&r.set(L.id,L);p(),o=b,u();return}if(y.type==="upsert"){let k=y.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let L=r.get(k.id);if(!L)r.set(k.id,k);else{let B=Number.isFinite(L.updated_at)?L.updated_at:0,Y=Number.isFinite(k.updated_at)?k.updated_at:0;if(B<=Y){for(let le of Object.keys(L))le in k||delete L[le];for(let[le,K]of Object.entries(k))L[le]=K}}p()}o=b,u()}else if(y.type==="delete"){let k=String(y.issue_id||"");k&&(r.delete(k),p()),o=b,u()}}}return{id:e,subscribe(y){return i.add(y),()=>{i.delete(y)}},applyPush:g,snapshot(){return s},size(){return r.size},getById(y){return r.get(y)},dispose(){a=!0,r.clear(),s=[],i.clear(),o=0}}}function yo(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let i=e.params[o];n[o]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Tc(e){let t=Ft("subs"),n=new Map,r=new Map;function s(a,l){t("applyDelta %s +%d ~%d -%d",a,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(a);if(!u||u.size===0)return;let p=Array.isArray(l.added)?l.added:[],g=Array.isArray(l.updated)?l.updated:[],y=Array.isArray(l.removed)?l.removed:[];for(let b of Array.from(u)){let k=n.get(b);if(!k)continue;let L=k.itemsById;for(let B of p)typeof B=="string"&&B.length>0&&L.set(B,!0);for(let B of g)typeof B=="string"&&B.length>0&&L.set(B,!0);for(let B of y)typeof B=="string"&&B.length>0&&L.delete(B)}}async function o(a,l){let u=yo(l);if(t("subscribe %s key=%s",a,u),!n.has(a))n.set(a,{key:u,itemsById:new Map});else{let g=n.get(a);if(g&&g.key!==u){let y=r.get(g.key);y&&(y.delete(a),y.size===0&&r.delete(g.key)),n.set(a,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let p=r.get(u);p&&p.add(a);try{await e("subscribe-list",{id:a,type:l.type,params:l.params})}catch(g){let y=n.get(a)||null;if(y){let b=r.get(y.key);b&&(b.delete(a),b.size===0&&r.delete(y.key))}throw n.delete(a),g}return async()=>{t("unsubscribe %s key=%s",a,u);try{await e("unsubscribe-list",{id:a})}catch{}let g=n.get(a)||null;if(g){let y=r.get(g.key);y&&(y.delete(a),y.size===0&&r.delete(g.key))}n.delete(a)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:yo,selectors:{getIds(a){let l=n.get(a);return l?Array.from(l.itemsById.keys()):[]},has(a,l){let u=n.get(a);return u?u.itemsById.has(l):!1},count(a){let l=n.get(a);return l?l.itemsById.size:0},getItemsById(a){let l=n.get(a),u={};if(!l)return u;for(let p of l.itemsById.keys())u[p]=!0;return u}}}}function Cc(){let e=Ft("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function i(l,u,p){let g=u?yo(u):"",y=n.get(l)||"",b=t.has(l);if(e("register %s key=%s (prev=%s)",l,g,y),b&&y&&g&&y!==g){let k=t.get(l);if(k)try{k.dispose()}catch{}let L=s.get(l);if(L){try{L()}catch{}s.delete(l)}let B=Qi(l,p);t.set(l,B);let Y=B.subscribe(()=>o());s.set(l,Y)}else if(!b){let k=Qi(l,p);t.set(l,k);let L=k.subscribe(()=>o());s.set(l,L)}return n.set(l,g),()=>a(l)}function a(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let p=s.get(l);if(p){try{p()}catch{}s.delete(l)}}return{register:i,unregister:a,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function Rc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Oc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Xi(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function C_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let a=new URLSearchParams(s).get("issue");if(a)return decodeURIComponent(a)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function R_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Lc(e){let t=Ft("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):C_(r),i=R_(r);if(t("hash change \u2192 view=%s id=%s",i,o),e.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",i=Xi(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?Xi(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var O_=Object.freeze({workspace_config:{default_workspace:null}});function Ic(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:O_.workspace_config.default_workspace}}}function Pc(e={}){let t=Ft("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Ic(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let i={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?Ic(o.config):n.config},a=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,p)=>u!==n.workspace.hidden[p]),l=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,p)=>u===n.worker.show_closed_children[p])&&!a&&!l||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Dc(e){let t=Ft("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),o()}function a(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function l(u){return async(g,y)=>{let b=s++,k=Date.now();r.set(b,{type:g,start_ts:k}),t("request start id=%d type=%s count=%d",b,g,n+1),i();let L=!1,B=()=>{L||(L=!0,r.delete(b),a())},Y=setTimeout(()=>{L||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,g,Date.now()-k),B())},3e4);try{let le=await u(g,y),K=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",b,g,K),le}catch(le){let K=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,g,K,le),le}finally{clearTimeout(Y),B()}}}return o(),{wrapSend:l,start:i,done:a,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([p,g])=>({id:p,type:g.type,elapsed_ms:u-g.start_ts}))}}}function pe(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function vo(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,i,a){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(i==="closed")return l.sort(Sc),l;switch(a){case"created_desc":return l.sort(yr),l;case"created_asc":return l.sort(xc),l;case"updated_desc":return l.sort(bo),l;case"priority":return l.sort(Ac),l;case"manual":default:{let u=n();return u?l.sort(ho(u)):l.sort(yr),l}}}function s(o){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),()=>{for(let a of i)try{a()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function On(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function rn(e){let t=On(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function gn(e,t){let n=On(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let a=Math.floor(s/864e5);if(a<7)return`${a}\uC77C \uC804`;let l=Math.floor(a/7);if(a<30)return`${l}\uC8FC \uC804`;let u=Math.floor(a/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(a/365)}\uB144 \uC804`}function Mc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=On(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function wo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function ko(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=wo(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function $o(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=Mc(n);return{total:n.length,count:r,current:s,children:n}}function xo(e){let t=e.transport,n=e.uiOrderStore;function r(i,a){return"renormalize"in i?i.renormalize:[{bead_id:a,rank:i.rank}]}function s(i,a){let l={...i.order};for(let u of a)l[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:l})}async function o(i,a,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},p=r(Zi(a,l,u.order),i);s(u,p);let g=await t("ui-order-set",{expected_revision:u.revision,entries:p});if(g&&g.conflict){let y={revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}};n.set(y);let b=r(Zi(a,l,y.order),i);s(y,b);let k=await t("ui-order-set",{expected_revision:y.revision,entries:b});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else g&&g.applied&&n.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}return{applyReorder:o}}function Nc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Ao(e,t){let n=Nc(e),r=Nc(t);return n.length===0||r.length===0?!1:n!==r}function So(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ji(e,t){return!t||typeof e!="string"||e.length===0||So(t.visible_labels).includes(e)?!0:So(t.hidden_labels).includes(e)?!1:!So(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function qc(e,t){return So(e).filter(n=>Ji(n,t))}function nr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function L_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function I_(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function P_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${L_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Eo(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let i=Array.isArray(e.children)?e.children:[],a=n>0?i.slice().sort(Ec):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?I_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${a.map((l,u)=>P_(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var D_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},jc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Fc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},M_={review:"\u2713",skip:"\u2298"},rr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function N_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Bc(e){let t=e&&e.fill||"none";return t==="none"?rr.none:e&&e.stale===!0?rr.stale:t==="dim"?rr.dim:e&&e.glyph==="review"?rr.review:e&&e.glyph==="skip"?rr.skip:rr.done}function q_(e){if(!e||e.fill==="none"||!e.approval_state)return Bc(e);let t=[];return e.glyph==="review"?t.push(rr.review):e.glyph==="skip"&&t.push(rr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function F_(e,t,n,r){let s=D_[e]||e,o=t&&t.fill||"none",i=!!t&&t.stale===!0,a=M_[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),i&&(l+=" stale"),n&&(l+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,p=n?`color: var(--stage-${s}-on)`:"",g=jc[e]||e,y=r?Uc(t):null;if(!y)return c`
      <div class="seg">
        <div class=${l} style=${p}>${a}</div>
        <div class=${u}>${g}</div>
      </div>
    `;let b=`${g} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${y.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${b}
      title=${b}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,y,e)}}
    >
      <div class=${l} style=${p}>${a}</div>
      <div class=${u}>${g}</div>
    </button>
  `}function Uc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function To(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=Fc[e.route]||Fc.spec_backed,o=e.stages,i=N_(s,o,String(t||"open")),a=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${jc[u]||u} ${u==="plan"?q_(o[u]||{}):Bc(o[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>Uc(o[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${a}
    >
      ${s.map(u=>F_(u,o[u]||{},u===i,r))}
    </div>
  `}function j_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Wc=2;function zc(e){let t=e.slice(0,Wc).join(", "),n=e.length-Wc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function B_(e,t){if(!t)return[];let n=[];if(t.external){let i=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${i}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let i of r)(Ao(e,i)?o:s).push(i);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${zc(s)}</span
      >`),o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${zc(o)}</span
      >`),n}function ea(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Co(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Gn(e){return`${e.kind}:${Co(e)}@${e.sha}`}function Ro(e,t){if(!e)return null;let n=ea(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=ea(t?.kind),i=o!==null&&t?.kind!==e.kind,a=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Gn(t)}`:"";return{kind:e.kind,label:a,title:`${l}${u}`}}function Hc(e,t){let n=Ro(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function U_(e){if(!e)return null;let t=ea(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Gn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function W_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&nr(n,"route")){let a=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":r.route}</span
      >`)}if(r.fast_track&&nr(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&nr(n,"pr")){let a=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}let o=Hc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let a=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Gn(a)}`}
        >${`exec ${a.kind==="delegated"?Co(a):`main:${a.actor}`} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let a=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${a.actor}@${a.sha}`}
        >${`impl ${a.actor} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}for(let a of qc(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&nr(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),nr(n,"blocked")&&s.push(...B_(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&nr(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function z_(e){let t=gn(e.created_at),n=gn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${rn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${rn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function H_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Eo(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:z_(e),empty_label:"children \uC5C6\uC74C",childChips:ta,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function ta(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Ro(t,n)?c`<span class="board-card__roll-child-chips">
    ${Hc(t,n)}
    ${U_(n)}
  </span>`:null}function Oo(e,t){let n=j_(e.priority);return c`
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
      ${W_(e,t)}
      ${e.workflow&&nr(t.policy||null,"stepper")?To(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${H_(e,t)}
    </article>
  `}function Fr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${dc.map(o=>c`<option
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
        ${e.items.map(o=>Oo(o,t))}
      </div>
    </section>
  `}function Gc(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Oo(r,t))}
        </div>
      </div>
    </dialog>
  `}var G_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],K_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],V_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Y_(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function Kc(e,t,n){return c`
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
        ${G_.map(r=>c`<option
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
        ${K_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Y_(e,t,n)}
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
        ${V_.map(r=>c`<option
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
  `}var Z_=200,Q_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},X_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Vc="beads-ui.board.sort",Yc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function J_(){try{let e=window.localStorage.getItem(Vc);if(e&&Yc.has(e))return e}catch{}return"created_desc"}function Zc(e,t){let n=Ft("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,i=t.uiOrderStore,a=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,p=t.onNewIssue,g=t.openDoc,y=t.closedRange||_o,b=s?vo(s,i):null,k=xo({transport:o,uiOrderStore:i}),L=[],B=[],Y=[],le=[],K=[],M=[],R=!1,F=0,X=J_(),V=new Map,ge=new Map,H=new Map,ee=new Set,oe={search:"",priority:"",type:"",labels:[]},te=!1,we=null;function Pe(T){return String(T.status||"open")==="open"}function ye(T){let W=String(T.status||"open");return W==="open"||W==="blocked"}function J(T){let W=oe.search.trim().toLowerCase(),Re=oe.priority,qe=oe.type,xe=oe.labels;return T.filter(Ze=>{if(W){let ct=String(Ze.id||"").toLowerCase(),We=String(Ze.title||"").toLowerCase();if(!ct.includes(W)&&!We.includes(W))return!1}if(Re!==""&&String(Ze.priority)!==Re||qe!==""&&String(Ze.issue_type||"")!==qe)return!1;if(xe.length>0){let ct=Array.isArray(Ze.labels)?Ze.labels:[];if(!xe.some(We=>ct.includes(We)))return!1}return!0})}function Z(){let T=new Set;for(let W of[L,B,Y,le,K,M])for(let Re of W){let qe=Array.isArray(Re.labels)?Re.labels:[];for(let xe of qe)typeof xe=="string"&&xe.length>0&&T.add(xe)}return Array.from(T).sort()}function ke(){return oe.search.trim()!==""||oe.priority!==""||oe.type!==""||oe.labels.length>0}function j(){try{if(b){let T=b.selectBoardColumn("tab:board:in-progress","in_progress",X),W=b.selectBoardColumn("tab:board:blocked","blocked",X).filter(ye),Re=new Set(T.map(N=>N.id)),qe=b.selectBoardColumn("tab:board:ready","ready",X).filter(N=>Pe(N)&&!Re.has(N.id)),xe=b.selectBoardColumn("tab:board:resolved","resolved",X),Ze=b.selectBoardColumn("tab:board:deferred","deferred",X),ct=b.selectBoardColumn("tab:board:closed","closed").slice(0,Z_),We=[...W,...qe,...T,...xe,...ct];se(We);let Ae=new Set;for(let N of We)N&&N.id&&!wo(N)&&Ae.add(N.id);let O=!ke();L=O?us(W,Ae):W,B=O?us(qe,Ae):qe,Y=O?us(T,Ae):T,le=O?us(xe,Ae):xe,K=Ze,F=Ze.length,M=O?us(ct,Ae):ct,V=new Map;for(let N of L)V.set(N.id,"open");for(let N of B)V.set(N.id,"open");for(let N of Y)V.set(N.id,"in_progress");for(let N of le)V.set(N.id,"resolved");for(let N of K)V.set(N.id,"deferred");for(let N of M)V.set(N.id,"closed");ge=new Map;for(let N of L)ge.set(N.id,"blocked-col");for(let N of B)ge.set(N.id,"ready-col");for(let N of Y)ge.set(N.id,"in-progress-col");for(let N of le)ge.set(N.id,"resolved-col");for(let N of M)ge.set(N.id,"closed-col")}lt()}catch{L=[],B=[],Y=[],le=[],K=[],M=[],H=new Map,lt()}}function se(T){H=ko(T)}function _e(T){return $o(H,T)}function $e(T){return!ee.has(T)}function je(T,W){T.preventDefault(),T.stopPropagation(),ee.has(W)?ee.delete(W):ee.add(W),lt()}function ue(T,W){T.preventDefault(),T.stopPropagation(),r(W)}function Le(T,W){T.preventDefault(),T.stopPropagation(),r(W)}function St(T,W){we||r(W)}function ht(T,W){T.preventDefault(),T.stopPropagation(),em(W).then(Re=>{Re&&pe("\uBCF5\uC0AC\uB428","success",1200)})}function ut(T,W){we=W,T.dataTransfer&&(T.dataTransfer.setData("text/plain",W),T.dataTransfer.effectAllowed="move"),T.target.classList.add("board-card--dragging")}function mt(T){T.target.classList.remove("board-card--dragging"),It(),setTimeout(()=>{we=null},0)}function E(T){let W=String(T.target.value||"");!W||W===y||(y=W,u&&u(W),lt())}function ie(){return a?a.get():null}function Te(T){let W=l?l.get():null,Re=W?W.cleanup_failed:null;if(!Re||typeof Re!="object"||Array.isArray(Re))return null;let qe=Re[T];return!qe||typeof qe!="object"||Array.isArray(qe)?null:qe}let Ie={onCardClick:St,onCopyId:ht,onDragStart:ut,onDragEnd:mt,onClosedRangeChange:E,rollupFor:_e,isExpanded:$e,onRollupToggle:je,onChildClick:ue,onFromChipClick:Le,onOpenDoc:g?(T,W)=>g(W):void 0,cleanupFailureFor:Te,get policy(){return ie()}};function Ye(T,W){we||(Ce(),r(W))}function tt(T,W){T.preventDefault(),T.stopPropagation(),Ce(),r(W)}let Je={...Ie,onCardClick:Ye,onChildClick:tt,onFromChipClick:tt,onOpenDoc:g?(T,W)=>{Ce(),g(W)}:void 0,get policy(){return ie()}};function dt(T){let W=T.target,Re=e.querySelector(".board-filter__labels");W&&Re&&Re.contains(W)||he()}function re(T){T.key==="Escape"&&he()}function G(){te||(te=!0,document.addEventListener("mousedown",dt),document.addEventListener("keydown",re),lt())}function he(){te&&(te=!1,document.removeEventListener("mousedown",dt),document.removeEventListener("keydown",re),lt())}function it(T){T.key==="Escape"&&Ce()}function Xe(){R||(R=!0,document.addEventListener("keydown",it),lt())}function Ce(){R&&(R=!1,document.removeEventListener("keydown",it),lt())}let Ne={onClose:Ce,onOverlayClick(T){T.target===T.currentTarget&&Ce()}},at={onSearchInput(T){oe.search=String(T.target.value||""),j()},onPriorityChange(T){oe.priority=String(T.target.value||""),j()},onTypeChange(T){oe.type=String(T.target.value||""),j()},onSortChange(T){let W=String(T.target.value||"");if(!(!Yc.has(W)||W===X)){X=W;try{window.localStorage.setItem(Vc,W)}catch{}j()}},onDeferredToggle(){R?Ce():Xe()},onLabelMenuToggle(){te?he():G()},onLabelToggle(T){let W=oe.labels.indexOf(T);W===-1?oe.labels.push(T):oe.labels.splice(W,1),j()},onLabelClear(){oe.labels.length!==0&&(oe.labels=[],j())},onNewIssue(){p&&p()}};function pt(){return c`
      <div class="board-view">
        ${Kc(oe,at,{sort_mode:X,deferred_popup_open:R,deferred_count:F,label_options:Z(),label_menu_open:te})}
        <div class="board-root">
          ${Fr({title:"Blocked",id:"blocked-col",items:J(L)},Ie)}
          ${Fr({title:"Ready",id:"ready-col",items:J(B)},Ie)}
          ${Fr({title:"In progress",id:"in-progress-col",items:J(Y)},Ie)}
          ${Fr({title:"Resolved",id:"resolved-col",items:J(le)},Ie)}
          ${Fr({title:"Closed",id:"closed-col",items:J(M),is_closed:!0,closed_range:y},Ie)}
        </div>
        ${R?Gc({items:J(K),count:F},Je,Ne):""}
      </div>
    `}function lt(){et(pt(),e),$t()}function $t(){try{let T=e.querySelector("#deferred-popup");T&&!T.open&&(typeof T.showModal=="function"?T.showModal():T.setAttribute("open",""));let W=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Re of W)Array.from(Re.querySelectorAll(".board-card")).forEach((xe,Ze)=>{xe.tabIndex=Ze===0?0:-1})}catch{}}async function Kt(T,W){if(!o){pe("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:T,status:W}),pe("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Re){n("update-status failed: %o",Re),pe("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Bt(T){switch(T){case"blocked-col":return L;case"ready-col":return B;case"in-progress-col":return Y;case"resolved-col":return le;default:return[]}}function Ut(T,W,Re){if(!o||!i)return;let qe=Bt(T),xe=qe.find(O=>O.id===W);if(!xe)return;let Ze=qe.filter(O=>O.id!==W),ct=Re.closest?Re.closest(".board-card"):null,We=Ze.length;if(ct){let O=ct.getAttribute("data-issue-id");if(O===W)return;let N=Ze.findIndex(be=>be.id===O);N>=0&&(We=N)}let Ae=Ze.slice();Ae.splice(We,0,xe),k.applyReorder(W,Ae,We)}function It(){for(let T of Array.from(e.querySelectorAll(".board-column--drag-over")))T.classList.remove("board-column--drag-over")}let yt=null;e.addEventListener("dragover",T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move");let Re=T.target.closest(".board-column");Re&&Re!==yt&&(yt&&yt.classList.remove("board-column--drag-over"),Re.classList.add("board-column--drag-over"),yt=Re)}),e.addEventListener("dragleave",T=>{let W=T.relatedTarget;(!W||!e.contains(W))&&yt&&(yt.classList.remove("board-column--drag-over"),yt=null)}),e.addEventListener("drop",T=>{T.preventDefault(),yt&&(yt.classList.remove("board-column--drag-over"),yt=null);let W=T.target,Re=W.closest(".board-column");if(!Re)return;let qe=T.dataTransfer?.getData("text/plain")||"";if(!qe)return;let xe=Re.id,Ze=ge.get(qe);if(Ze&&Ze===xe){if(X_.has(xe)){if(X!=="manual"){pe("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ut(xe,qe,W)}return}let ct=Q_[xe];if(!ct){pe("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}V.get(qe)!==ct&&Kt(qe,ct)}),e.addEventListener("keydown",T=>{let W=T.target;if(!(W instanceof HTMLElement))return;let Re=String(W.tagName||"").toLowerCase();if(Re==="input"||Re==="textarea"||Re==="select"||Re==="button"||Re==="a"||W.isContentEditable===!0)return;let qe=W.closest(".board-card");if(!qe)return;let xe=String(T.key||"");if(xe==="Enter"||xe===" "){T.preventDefault();let Ae=qe.getAttribute("data-issue-id");Ae&&r(Ae);return}if(xe!=="ArrowUp"&&xe!=="ArrowDown"&&xe!=="ArrowLeft"&&xe!=="ArrowRight")return;T.preventDefault();let Ze=qe.closest(".board-column");if(!Ze)return;let ct=Array.from(Ze.querySelectorAll(".board-card")),We=ct.indexOf(qe);if(xe==="ArrowDown"&&We<ct.length-1){He(qe,ct[We+1]);return}if(xe==="ArrowUp"&&We>0){He(qe,ct[We-1]);return}if(xe==="ArrowLeft"||xe==="ArrowRight"){let Ae=Array.from(e.querySelectorAll(".board-column")),O=Ae.indexOf(Ze),N=xe==="ArrowRight"?1:-1,be=O+N;for(;be>=0&&be<Ae.length;){let ze=Ae[be].querySelector(".board-card");if(ze){He(qe,ze);return}be+=N}}});function He(T,W){try{T.tabIndex=-1,W.tabIndex=0,W.focus()}catch{}}let C=null;b&&b.subscribe&&(C=b.subscribe(()=>{try{j()}catch{}}));let Q=null;a&&a.subscribe&&(Q=a.subscribe(()=>{try{j()}catch{}}));let fe=null;return l&&l.subscribe&&(fe=l.subscribe(()=>{lt()})),{async load(){n("load"),j()},clear(){he(),Ce(),C&&(C(),C=null),Q&&(Q(),Q=null),fe&&(fe(),fe=null),e.replaceChildren(),L=[],B=[],Y=[],le=[],K=[],M=[],V=new Map,ge=new Map}}}function us(e,t){return e.filter(n=>{let r=wo(n);return!(r&&t.has(r))})}async function em(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function Ln(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function vr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ds(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function tm(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),i=t.createElement("h2"),a=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",a.textContent=`${vr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${vr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(i,a,r,s,o),t.body.append(n),new Promise(l=>{let u=p=>{typeof n.close=="function"&&n.close(),n.remove(),l(p)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Kn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await tm(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var nm=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Qc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},rm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Jt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function jt(e){return typeof e=="string"&&e.length>0?e:null}function jr(e){return e.startsWith("gpt-")?e.slice(4):e}function Mt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Jc(e,t,n){let r=jt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=jt(n[e]);return s===null?null:{value:s,source:"global"}}function ps(e,t,n,r){return Jc(e,t,n)||{value:r,source:"base"}}function na(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&Jt(s?.[t])){let i=jt(s[t][e]);if(i!==null)return i}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Jt(s)){for(let i of Object.values(s))if(Jt(i)){let a=jt(i[e]);if(a!==null)return a}else if(Array.isArray(i)&&i.includes(e))return e}let o=r?.model_index?.[e];return jt(r?.runners?.[o]?.models?.[e]?.id)||e}function sm(e,t){return jt(t?.review?.reviewers?.[e]?.model)||e}function Br(e,t,n=!1){if(e==="default")return Mt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?jr(e):e;return Mt(e,t,r,e,"explicit")}function eu(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];Jt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(i=>typeof i=="string"));let o=n?.runners?.[e]?.models;if(Jt(o))for(let i of Object.keys(o))s.includes(i)||s.push(i);return s}function om(e,t){let n=[],r=e?.implementation?.model_catalog;Jt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(Jt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function im(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of om(t,n)){let o=eu(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function ra(e){return Mt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Xc(e,t,n){let r=Jc(e,t,n);return r?Br(r.value,r.source):Mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function bn(e){let t=Jt(e.pin)?e.pin:{},n=Jt(e.global)?e.global:{},r=Jt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&Jt(r.session)?r.session:null,o=r?.supported===!0&&Jt(r.orchestration)?r.orchestration:null,i=Jt(e.runner_catalog)?e.runner_catalog:null,a=jt(n.quick_fix_impl_model),l=im(a,s,i),u={};if(s){let p=ps("workflow_mode",t,n,jt(s.workflow_mode_default));u.workflow_mode=p.source==="base"?Mt(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):Br(p.value,p.source);for(let K of["spec_review","plan_review","impl_review"]){let M=`${K}_model`,R=jt(K==="plan_review"?p.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),F=ps(M,t,n,R);if(F.value===null)u[M]=Mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(F.value!=="self"&&F.value!=="skip"&&!Jt(s.review?.reviewers?.[F.value]))u[M]=ra(Mt(F.value,F.source,"",null,"explicit"));else{let X=sm(F.value,s);u[M]=Mt(F.value,F.source,jr(X),X,F.source==="base"?"default":"explicit")}}for(let[K,M]of Object.entries(Qc)){let R=u[M].value;if(R==="self"||R==="skip"){u[K]=Mt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let F=jt(s.review?.reviewers?.[R||""]?.effort),X=ps(K,t,n,F);u[K]=X.value===null?Mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Mt(X.value,X.source,X.value,X.value,X.source==="base"?"default":"explicit")}let g=Jt(s.implementation?.default)?s.implementation.default:{},y=jt(e.route),b=y!==null&&["quick_fix","spec_backed","full_plan"].includes(y),k=Jt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},L=b&&Jt(k[y])?k[y]:{};for(let K of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let M=ps(K,t,n,K==="impl_dispatch"?jt(L.dispatch)||jt(g.dispatch):jt(g[K.replace("impl_","")]));u[K]=M.value===null?Mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Mt(M.value,M.source,M.value,M.value,M.source==="base"?"default":"explicit")}let B=jt(t.impl_runtime),Y=B==="inherit"?jt(e.controller_runtime):B,le=y==="quick_fix"&&jt(t.impl_dispatch)===null&&l.runtime!==null&&(B===null||Y===l.runtime);if(le){let K=l.runtime,M=a;u.impl_dispatch=Mt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),B===null&&(u.impl_runtime=Mt(K,"global",`${K} (\uC720\uB3C4)`,K,"explicit")),jt(t.impl_model)===null&&(u.impl_model=Mt(M,"global",M,M,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let K of["impl_runtime","impl_model","impl_effort","impl_speed"])u[K]=Mt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!le&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let K=u.impl_runtime.value==="inherit"?jt(e.controller_runtime):u.impl_runtime.value,M=K?eu(K,s,i):[];if(u.impl_model.value!=="auto"&&M.length>0&&!M.includes(u.impl_model.value))u.impl_model=ra(u.impl_model);else{let R=na(u.impl_model.value,K,s,i);u.impl_model.display=jr(R),u.impl_model.full_value=R}}if(u.impl_effort.value==="auto"){let K=jt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),M=K?jt(s.implementation?.effort_by_transport?.[K]?.auto):null;M&&!rm.has(M)?(u.impl_effort.display=`${M} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=M,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Mt("default","base","default (\uC77C\uBC18)","default","default"):Br("default",u.impl_speed.source))}}else for(let p of nm.filter(g=>!g.startsWith("orchestration_")))u[p]=Xc(p,t,n);if(!s){for(let[p,g]of Object.entries(Qc))(u[g].value==="self"||u[g].value==="skip")&&(u[p]=Mt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])u[p]=Mt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[p]=Xc(p,t,n);continue}let g=p.replace("orchestration_",""),y=jt(o[g]),b=ps(p,t,n,y);if(p==="orchestration_effort"&&b.source==="base"){u[p]=Mt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){u[p]=Mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let k=b.source==="base"?jt(o.model_id)||b.value:na(b.value,null,s,i);u[p]=Mt(b.value,b.source,jr(k),k,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){u[p]=b.source==="base"?Mt("default","base","default (\uC77C\uBC18)","default","default"):Br("default",b.source);continue}u[p]=Br(b.value,b.source)}if(s)if(a===null){let p=u.orchestration_model.full_value;u.quick_fix_impl_model=Mt(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${jr(p)})`,null,"default")}else if(l.runtime!==null){let p=na(a,l.runtime,s,i);u.quick_fix_impl_model=Mt(a,"global",jr(p),p,"explicit")}else l.offered?u.quick_fix_impl_model=ra(Mt(a,"global","",null,"explicit")):u.quick_fix_impl_model=Br(a,"global");return u}function am(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Lo(e){let t=Jt(e.pin)?e.pin:{},n=Jt(e.global)?e.global:{},r=Jt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=g=>{let y={...r,...g};return bn({pin:e.layer==="pin"?y:t,global:e.layer==="pin"?n:y,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,i={...o};delete i[e.key];let a=s(i)[e.key],l=s(o)[e.key],u=jt(o[e.key]),p=[...e.choices];return u!==null&&!p.includes(u)&&p.unshift(u),{unset_label:am(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:p.map(g=>{let y=s({...o,[e.key]:g})[e.key];return{value:g,label:y.display,full_value:y.full_value}})}}function Ur(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",s.append(o,i),t.append(n,r,s),e.body.append(t),new Promise(a=>{let l=!1,u=g=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),a(g))},p=()=>u(r.value.trim());o.addEventListener("click",p),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",g=>{g.key==="Enter"&&(g.ctrlKey||g.metaKey)&&(g.preventDefault(),p())}),t.addEventListener("cancel",g=>{g.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function sa(e){return`session:${e.provider}:${e.session_id}`}function fs(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function lm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Wr(e,t,n,r){return{attempt_id:sa(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:fs(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:lm(e,n)}}}var oa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",cm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",tu="\uBD84\uD574 \uC5C6\uB294 leg";function Yt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Wn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],zr=[...Wn,"reasoning_output_tokens"],um={codex:["implementation","review-consult"],claude:["subagent"]};function ia(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Wn.some(t=>Number.isFinite(e[t]))}function dm(e){return!e||typeof e!="object"?!1:zr.some(t=>Number.isFinite(e[t]))}function aa(e){let t=0;for(let n of Wn)t+=Yt(e?.[n]);return t}function pm(e){return!e||typeof e!="object"?!1:Wn.some(t=>Number.isFinite(e[t]))}function nu(e){return!e||typeof e!="object"?!1:zr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function fm(e){let t={};for(let n of zr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function ru(e){let t={};for(let n of zr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function su(e,t){return ia(t)?Yt(t.total_tokens):e==="codex"?Yt(t.input_tokens)+Yt(t.output_tokens):aa(t)}function _m(e){return e==="claude"?"Claude":"Codex"}function mm(e){return`\u03C4 ${iu(e)}`}function gm(e,t){let n=t.breakdown||{},r=Yt(t.total_only_subtotal);if(ia(n)||r>0&&!dm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,cm];return t.replayed&&u.push(oa),u.join(`
`)}let s=[`\uC785\uB825 ${Yt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Yt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Yt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Yt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Yt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Yt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${Yt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${tu} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${o} + ${tu}`:o,l=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&l.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&l.push(oa),l.join(`
`)}function sn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${_m(n)} ${mm(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:gm(n,r)})}return t}function Po(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let i=s.providers[o];if(!i)continue;let a=t[o];a||(a={subtotal:0,breakdown:{}},t[o]=a),a.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(a.total_only_subtotal=Yt(a.total_only_subtotal)+Yt(i.total_only_subtotal));for(let l of zr)Number.isFinite(i.breakdown[l])&&(a.breakdown[l]=Yt(a.breakdown[l])+Yt(i.breakdown[l]));i.replayed&&(a.replayed=!0),o==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function la(e){return!e||typeof e!="object"?null:Sn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function bm(e){return e==="codex"?"codex":"claude"}function Un(){return{subtotal:0,breakdown:fm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Io(e,t,n){e.subtotal+=t.subtotal,ia(t.usage)&&(e.total_only+=t.subtotal);for(let r of zr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Yt(e.breakdown[r])+Yt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ou(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function iu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Hr(e){return pm(e)?`\u03C4 ${iu(aa(e))}`:null}function Vn(e){let t=Hr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function _s(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Yt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Yt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Yt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Yt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${aa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(oa),n.join(`
`)}function Sn(e,t){let n={claude:Un(),codex:Un()},r={orchestrator:{claude:Un(),codex:Un()},implementation:{claude:Un(),codex:Un()},"review-consult":{claude:Un(),codex:Un()},subagent:{claude:Un(),codex:Un()}},s=new Set;for(let a of Object.values(e||{})){if(!a||a.bead_id!==t)continue;let l=a.usage;if(nu(l)){let p=bm(a.runner),g=ru(l),y={provider:p,role:"orchestrator",attempt_id:String(a.attempt_id||""),usage:g,subtotal:su(p,g)};g.replayed===!0&&(y.replayed=!0),typeof a.model=="string"&&(y.model=a.model),typeof a.session_id=="string"&&(y.session_id=a.session_id),Io(n[p],y,!0),Io(r.orchestrator[p],y,!0)}let u=Array.isArray(a.usage_legs)?a.usage_legs:[];for(let p of u){let g=p&&p.provider==="claude"?"claude":"codex";if(!p||p.provider!=="codex"&&p.provider!=="claude"||!um[g].includes(p.role)||!nu(p.usage))continue;let y=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!y||s.has(y))continue;s.add(y);let b=ru(p.usage),k={provider:g,role:p.role,attempt_id:String(a.attempt_id||""),usage:b,subtotal:su(g,b)};k.receipt_id=y,typeof p.agent_type=="string"&&(k.agent_type=p.agent_type),typeof p.agent_id=="string"&&(k.agent_id=p.agent_id),typeof p.model=="string"&&(k.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(k.effort=p.effort),typeof p.session_id=="string"?k.session_id=p.session_id:typeof p.thread_id=="string"&&(k.session_id=p.thread_id),typeof p.turn_id=="string"&&(k.turn_id=p.turn_id),(typeof p.completed_at=="string"||typeof p.completed_at=="number"&&Number.isFinite(p.completed_at))&&(k.completed_at=p.completed_at),b.replayed===!0&&(k.replayed=!0),Io(n[g],k,!1),Io(r[k.role][g],k,!1)}}let o={};for(let a of["claude","codex"]){let l=n[a];if(l.legs.length===0)continue;let u=ou(l,!1);a==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[a]=u}if(Object.keys(o).length===0)return null;let i={};for(let a of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let p=r[a][u];p.legs.length>0&&(l[u]={...ou(p,!0),legs:p.legs})}Object.keys(l).length>0&&(i[a]=l)}return{providers:o,roles:i}}var{entries:mu,setPrototypeOf:au,isFrozen:hm,getPrototypeOf:ym,getOwnPropertyDescriptor:vm}=Object,{freeze:cn,seal:En,create:ma}=Object,{apply:ga,construct:ba}=typeof Reflect<"u"&&Reflect;cn||(cn=function(t){return t});En||(En=function(t){return t});ga||(ga=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});ba||(ba=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var Do=un(Array.prototype.forEach),wm=un(Array.prototype.lastIndexOf),lu=un(Array.prototype.pop),ms=un(Array.prototype.push),km=un(Array.prototype.splice),No=un(String.prototype.toLowerCase),ca=un(String.prototype.toString),ua=un(String.prototype.match),gs=un(String.prototype.replace),$m=un(String.prototype.indexOf),xm=un(String.prototype.trim),In=un(Object.prototype.hasOwnProperty),ln=un(RegExp.prototype.test),bs=Am(TypeError);function un(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return ga(e,t,r)}}function Am(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return ba(e,n)}}function _t(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:No;au&&au(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(hm(t)||(t[r]=o),s=o)}e[s]=!0}return e}function Sm(e){for(let t=0;t<e.length;t++)In(e,t)||(e[t]=null);return e}function Yn(e){let t=ma(null);for(let[n,r]of mu(e))In(e,n)&&(Array.isArray(r)?t[n]=Sm(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Yn(r):t[n]=r);return t}function hs(e,t){for(;e!==null;){let r=vm(e,t);if(r){if(r.get)return un(r.get);if(typeof r.value=="function")return un(r.value)}e=ym(e)}function n(){return null}return n}var cu=cn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),da=cn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),pa=cn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Em=cn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),fa=cn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Tm=cn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),uu=cn(["#text"]),du=cn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),_a=cn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),pu=cn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Mo=cn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Cm=En(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Rm=En(/<%[\w\W]*|[\w\W]*%>/gm),Om=En(/\$\{[\w\W]*/gm),Lm=En(/^data-[\-\w.\u00B7-\uFFFF]+$/),Im=En(/^aria-[\-\w]+$/),gu=En(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Pm=En(/^(?:\w+script|data):/i),Dm=En(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),bu=En(/^html$/i),Mm=En(/^[a-z][.\w]*(-[.\w]+)+$/i),fu=Object.freeze({__proto__:null,ARIA_ATTR:Im,ATTR_WHITESPACE:Dm,CUSTOM_ELEMENT:Mm,DATA_ATTR:Lm,DOCTYPE_NAME:bu,ERB_EXPR:Rm,IS_ALLOWED_URI:gu,IS_SCRIPT_OR_DATA:Pm,MUSTACHE_EXPR:Cm,TMPLIT_EXPR:Om}),ys={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Nm=function(){return typeof window>"u"?null:window},qm=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},_u=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function hu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Nm(),t=Ee=>hu(Ee);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==ys.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:a,Element:l,NodeFilter:u,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:g,DOMParser:y,trustedTypes:b}=e,k=l.prototype,L=hs(k,"cloneNode"),B=hs(k,"remove"),Y=hs(k,"nextSibling"),le=hs(k,"childNodes"),K=hs(k,"parentNode");if(typeof i=="function"){let Ee=n.createElement("template");Ee.content&&Ee.content.ownerDocument&&(n=Ee.content.ownerDocument)}let M,R="",{implementation:F,createNodeIterator:X,createDocumentFragment:V,getElementsByTagName:ge}=n,{importNode:H}=r,ee=_u();t.isSupported=typeof mu=="function"&&typeof K=="function"&&F&&F.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:oe,ERB_EXPR:te,TMPLIT_EXPR:we,DATA_ATTR:Pe,ARIA_ATTR:ye,IS_SCRIPT_OR_DATA:J,ATTR_WHITESPACE:Z,CUSTOM_ELEMENT:ke}=fu,{IS_ALLOWED_URI:j}=fu,se=null,_e=_t({},[...cu,...da,...pa,...fa,...uu]),$e=null,je=_t({},[...du,..._a,...pu,...Mo]),ue=Object.seal(ma(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Le=null,St=null,ht=Object.seal(ma(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ut=!0,mt=!0,E=!1,ie=!0,Te=!1,Ie=!0,Ye=!1,tt=!1,Je=!1,dt=!1,re=!1,G=!1,he=!0,it=!1,Xe="user-content-",Ce=!0,Ne=!1,at={},pt=null,lt=_t({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),$t=null,Kt=_t({},["audio","video","img","source","image","track"]),Bt=null,Ut=_t({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),It="http://www.w3.org/1998/Math/MathML",yt="http://www.w3.org/2000/svg",He="http://www.w3.org/1999/xhtml",C=He,Q=!1,fe=null,T=_t({},[It,yt,He],ca),W=_t({},["mi","mo","mn","ms","mtext"]),Re=_t({},["annotation-xml"]),qe=_t({},["title","style","font","a","script"]),xe=null,Ze=["application/xhtml+xml","text/html"],ct="text/html",We=null,Ae=null,O=n.createElement("form"),N=function(A){return A instanceof RegExp||A instanceof Function},be=function(){let A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ae&&Ae===A)){if((!A||typeof A!="object")&&(A={}),A=Yn(A),xe=Ze.indexOf(A.PARSER_MEDIA_TYPE)===-1?ct:A.PARSER_MEDIA_TYPE,We=xe==="application/xhtml+xml"?ca:No,se=In(A,"ALLOWED_TAGS")?_t({},A.ALLOWED_TAGS,We):_e,$e=In(A,"ALLOWED_ATTR")?_t({},A.ALLOWED_ATTR,We):je,fe=In(A,"ALLOWED_NAMESPACES")?_t({},A.ALLOWED_NAMESPACES,ca):T,Bt=In(A,"ADD_URI_SAFE_ATTR")?_t(Yn(Ut),A.ADD_URI_SAFE_ATTR,We):Ut,$t=In(A,"ADD_DATA_URI_TAGS")?_t(Yn(Kt),A.ADD_DATA_URI_TAGS,We):Kt,pt=In(A,"FORBID_CONTENTS")?_t({},A.FORBID_CONTENTS,We):lt,Le=In(A,"FORBID_TAGS")?_t({},A.FORBID_TAGS,We):Yn({}),St=In(A,"FORBID_ATTR")?_t({},A.FORBID_ATTR,We):Yn({}),at=In(A,"USE_PROFILES")?A.USE_PROFILES:!1,ut=A.ALLOW_ARIA_ATTR!==!1,mt=A.ALLOW_DATA_ATTR!==!1,E=A.ALLOW_UNKNOWN_PROTOCOLS||!1,ie=A.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Te=A.SAFE_FOR_TEMPLATES||!1,Ie=A.SAFE_FOR_XML!==!1,Ye=A.WHOLE_DOCUMENT||!1,dt=A.RETURN_DOM||!1,re=A.RETURN_DOM_FRAGMENT||!1,G=A.RETURN_TRUSTED_TYPE||!1,Je=A.FORCE_BODY||!1,he=A.SANITIZE_DOM!==!1,it=A.SANITIZE_NAMED_PROPS||!1,Ce=A.KEEP_CONTENT!==!1,Ne=A.IN_PLACE||!1,j=A.ALLOWED_URI_REGEXP||gu,C=A.NAMESPACE||He,W=A.MATHML_TEXT_INTEGRATION_POINTS||W,Re=A.HTML_INTEGRATION_POINTS||Re,ue=A.CUSTOM_ELEMENT_HANDLING||{},A.CUSTOM_ELEMENT_HANDLING&&N(A.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ue.tagNameCheck=A.CUSTOM_ELEMENT_HANDLING.tagNameCheck),A.CUSTOM_ELEMENT_HANDLING&&N(A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ue.attributeNameCheck=A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),A.CUSTOM_ELEMENT_HANDLING&&typeof A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ue.allowCustomizedBuiltInElements=A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Te&&(mt=!1),re&&(dt=!0),at&&(se=_t({},uu),$e=[],at.html===!0&&(_t(se,cu),_t($e,du)),at.svg===!0&&(_t(se,da),_t($e,_a),_t($e,Mo)),at.svgFilters===!0&&(_t(se,pa),_t($e,_a),_t($e,Mo)),at.mathMl===!0&&(_t(se,fa),_t($e,pu),_t($e,Mo))),A.ADD_TAGS&&(typeof A.ADD_TAGS=="function"?ht.tagCheck=A.ADD_TAGS:(se===_e&&(se=Yn(se)),_t(se,A.ADD_TAGS,We))),A.ADD_ATTR&&(typeof A.ADD_ATTR=="function"?ht.attributeCheck=A.ADD_ATTR:($e===je&&($e=Yn($e)),_t($e,A.ADD_ATTR,We))),A.ADD_URI_SAFE_ATTR&&_t(Bt,A.ADD_URI_SAFE_ATTR,We),A.FORBID_CONTENTS&&(pt===lt&&(pt=Yn(pt)),_t(pt,A.FORBID_CONTENTS,We)),Ce&&(se["#text"]=!0),Ye&&_t(se,["html","head","body"]),se.table&&(_t(se,["tbody"]),delete Le.tbody),A.TRUSTED_TYPES_POLICY){if(typeof A.TRUSTED_TYPES_POLICY.createHTML!="function")throw bs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof A.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw bs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=A.TRUSTED_TYPES_POLICY,R=M.createHTML("")}else M===void 0&&(M=qm(b,s)),M!==null&&typeof R=="string"&&(R=M.createHTML(""));cn&&cn(A),Ae=A}},ze=_t({},[...da,...pa,...Em]),ve=_t({},[...fa,...Tm]),Ge=function(A){let me=K(A);(!me||!me.tagName)&&(me={namespaceURI:C,tagName:"template"});let Oe=No(A.tagName),wt=No(me.tagName);return fe[A.namespaceURI]?A.namespaceURI===yt?me.namespaceURI===He?Oe==="svg":me.namespaceURI===It?Oe==="svg"&&(wt==="annotation-xml"||W[wt]):!!ze[Oe]:A.namespaceURI===It?me.namespaceURI===He?Oe==="math":me.namespaceURI===yt?Oe==="math"&&Re[wt]:!!ve[Oe]:A.namespaceURI===He?me.namespaceURI===yt&&!Re[wt]||me.namespaceURI===It&&!W[wt]?!1:!ve[Oe]&&(qe[Oe]||!ze[Oe]):!!(xe==="application/xhtml+xml"&&fe[A.namespaceURI]):!1},vt=function(A){ms(t.removed,{element:A});try{K(A).removeChild(A)}catch{B(A)}},ft=function(A,me){try{ms(t.removed,{attribute:me.getAttributeNode(A),from:me})}catch{ms(t.removed,{attribute:null,from:me})}if(me.removeAttribute(A),A==="is")if(dt||re)try{vt(me)}catch{}else try{me.setAttribute(A,"")}catch{}},Et=function(A){let me=null,Oe=null;if(Je)A="<remove></remove>"+A;else{let gt=ua(A,/^[\r\n\t ]+/);Oe=gt&&gt[0]}xe==="application/xhtml+xml"&&C===He&&(A='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+A+"</body></html>");let wt=M?M.createHTML(A):A;if(C===He)try{me=new y().parseFromString(wt,xe)}catch{}if(!me||!me.documentElement){me=F.createDocument(C,"template",null);try{me.documentElement.innerHTML=Q?R:wt}catch{}}let Ot=me.body||me.documentElement;return A&&Oe&&Ot.insertBefore(n.createTextNode(Oe),Ot.childNodes[0]||null),C===He?ge.call(me,Ye?"html":"body")[0]:Ye?me.documentElement:Ot},Wt=function(A){return X.call(A.ownerDocument||A,A,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Me=function(A){return A instanceof g&&(typeof A.nodeName!="string"||typeof A.textContent!="string"||typeof A.removeChild!="function"||!(A.attributes instanceof p)||typeof A.removeAttribute!="function"||typeof A.setAttribute!="function"||typeof A.namespaceURI!="string"||typeof A.insertBefore!="function"||typeof A.hasChildNodes!="function")},pn=function(A){return typeof a=="function"&&A instanceof a};function xt(Ee,A,me){Do(Ee,Oe=>{Oe.call(t,A,me,Ae)})}let Zt=function(A){let me=null;if(xt(ee.beforeSanitizeElements,A,null),Me(A))return vt(A),!0;let Oe=We(A.nodeName);if(xt(ee.uponSanitizeElement,A,{tagName:Oe,allowedTags:se}),Ie&&A.hasChildNodes()&&!pn(A.firstElementChild)&&ln(/<[/\w!]/g,A.innerHTML)&&ln(/<[/\w!]/g,A.textContent)||A.nodeType===ys.progressingInstruction||Ie&&A.nodeType===ys.comment&&ln(/<[/\w]/g,A.data))return vt(A),!0;if(!(ht.tagCheck instanceof Function&&ht.tagCheck(Oe))&&(!se[Oe]||Le[Oe])){if(!Le[Oe]&&Qt(Oe)&&(ue.tagNameCheck instanceof RegExp&&ln(ue.tagNameCheck,Oe)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(Oe)))return!1;if(Ce&&!pt[Oe]){let wt=K(A)||A.parentNode,Ot=le(A)||A.childNodes;if(Ot&&wt){let gt=Ot.length;for(let Tt=gt-1;Tt>=0;--Tt){let tn=L(Ot[Tt],!0);tn.__removalCount=(A.__removalCount||0)+1,wt.insertBefore(tn,Y(A))}}}return vt(A),!0}return A instanceof l&&!Ge(A)||(Oe==="noscript"||Oe==="noembed"||Oe==="noframes")&&ln(/<\/no(script|embed|frames)/i,A.innerHTML)?(vt(A),!0):(Te&&A.nodeType===ys.text&&(me=A.textContent,Do([oe,te,we],wt=>{me=gs(me,wt," ")}),A.textContent!==me&&(ms(t.removed,{element:A.cloneNode()}),A.textContent=me)),xt(ee.afterSanitizeElements,A,null),!1)},en=function(A,me,Oe){if(he&&(me==="id"||me==="name")&&(Oe in n||Oe in O))return!1;if(!(mt&&!St[me]&&ln(Pe,me))){if(!(ut&&ln(ye,me))){if(!(ht.attributeCheck instanceof Function&&ht.attributeCheck(me,A))){if(!$e[me]||St[me]){if(!(Qt(A)&&(ue.tagNameCheck instanceof RegExp&&ln(ue.tagNameCheck,A)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(A))&&(ue.attributeNameCheck instanceof RegExp&&ln(ue.attributeNameCheck,me)||ue.attributeNameCheck instanceof Function&&ue.attributeNameCheck(me,A))||me==="is"&&ue.allowCustomizedBuiltInElements&&(ue.tagNameCheck instanceof RegExp&&ln(ue.tagNameCheck,Oe)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(Oe))))return!1}else if(!Bt[me]){if(!ln(j,gs(Oe,Z,""))){if(!((me==="src"||me==="xlink:href"||me==="href")&&A!=="script"&&$m(Oe,"data:")===0&&$t[A])){if(!(E&&!ln(J,gs(Oe,Z,"")))){if(Oe)return!1}}}}}}}return!0},Qt=function(A){return A!=="annotation-xml"&&ua(A,ke)},rt=function(A){xt(ee.beforeSanitizeAttributes,A,null);let{attributes:me}=A;if(!me||Me(A))return;let Oe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:$e,forceKeepAttr:void 0},wt=me.length;for(;wt--;){let Ot=me[wt],{name:gt,namespaceURI:Tt,value:tn}=Ot,nn=We(gt),$n=tn,Pt=gt==="value"?$n:xm($n);if(Oe.attrName=nn,Oe.attrValue=Pt,Oe.keepAttr=!0,Oe.forceKeepAttr=void 0,xt(ee.uponSanitizeAttribute,A,Oe),Pt=Oe.attrValue,it&&(nn==="id"||nn==="name")&&(ft(gt,A),Pt=Xe+Pt),Ie&&ln(/((--!?|])>)|<\/(style|title|textarea)/i,Pt)){ft(gt,A);continue}if(nn==="attributename"&&ua(Pt,"href")){ft(gt,A);continue}if(Oe.forceKeepAttr)continue;if(!Oe.keepAttr){ft(gt,A);continue}if(!ie&&ln(/\/>/i,Pt)){ft(gt,A);continue}Te&&Do([oe,te,we],xn=>{Pt=gs(Pt,xn," ")});let yn=We(A.nodeName);if(!en(yn,nn,Pt)){ft(gt,A);continue}if(M&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Tt)switch(b.getAttributeType(yn,nn)){case"TrustedHTML":{Pt=M.createHTML(Pt);break}case"TrustedScriptURL":{Pt=M.createScriptURL(Pt);break}}if(Pt!==$n)try{Tt?A.setAttributeNS(Tt,gt,Pt):A.setAttribute(gt,Pt),Me(A)?vt(A):lu(t.removed)}catch{ft(gt,A)}}xt(ee.afterSanitizeAttributes,A,null)},Xt=function Ee(A){let me=null,Oe=Wt(A);for(xt(ee.beforeSanitizeShadowDOM,A,null);me=Oe.nextNode();)xt(ee.uponSanitizeShadowNode,me,null),Zt(me),rt(me),me.content instanceof o&&Ee(me.content);xt(ee.afterSanitizeShadowDOM,A,null)};return t.sanitize=function(Ee){let A=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},me=null,Oe=null,wt=null,Ot=null;if(Q=!Ee,Q&&(Ee="<!-->"),typeof Ee!="string"&&!pn(Ee))if(typeof Ee.toString=="function"){if(Ee=Ee.toString(),typeof Ee!="string")throw bs("dirty is not a string, aborting")}else throw bs("toString is not a function");if(!t.isSupported)return Ee;if(tt||be(A),t.removed=[],typeof Ee=="string"&&(Ne=!1),Ne){if(Ee.nodeName){let tn=We(Ee.nodeName);if(!se[tn]||Le[tn])throw bs("root node is forbidden and cannot be sanitized in-place")}}else if(Ee instanceof a)me=Et("<!---->"),Oe=me.ownerDocument.importNode(Ee,!0),Oe.nodeType===ys.element&&Oe.nodeName==="BODY"||Oe.nodeName==="HTML"?me=Oe:me.appendChild(Oe);else{if(!dt&&!Te&&!Ye&&Ee.indexOf("<")===-1)return M&&G?M.createHTML(Ee):Ee;if(me=Et(Ee),!me)return dt?null:G?R:""}me&&Je&&vt(me.firstChild);let gt=Wt(Ne?Ee:me);for(;wt=gt.nextNode();)Zt(wt),rt(wt),wt.content instanceof o&&Xt(wt.content);if(Ne)return Ee;if(dt){if(re)for(Ot=V.call(me.ownerDocument);me.firstChild;)Ot.appendChild(me.firstChild);else Ot=me;return($e.shadowroot||$e.shadowrootmode)&&(Ot=H.call(r,Ot,!0)),Ot}let Tt=Ye?me.outerHTML:me.innerHTML;return Ye&&se["!doctype"]&&me.ownerDocument&&me.ownerDocument.doctype&&me.ownerDocument.doctype.name&&ln(bu,me.ownerDocument.doctype.name)&&(Tt="<!DOCTYPE "+me.ownerDocument.doctype.name+`>
`+Tt),Te&&Do([oe,te,we],tn=>{Tt=gs(Tt,tn," ")}),M&&G?M.createHTML(Tt):Tt},t.setConfig=function(){let Ee=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};be(Ee),tt=!0},t.clearConfig=function(){Ae=null,tt=!1},t.isValidAttribute=function(Ee,A,me){Ae||be({});let Oe=We(Ee),wt=We(A);return en(Oe,wt,me)},t.addHook=function(Ee,A){typeof A=="function"&&ms(ee[Ee],A)},t.removeHook=function(Ee,A){if(A!==void 0){let me=wm(ee[Ee],A);return me===-1?void 0:km(ee[Ee],me,1)[0]}return lu(ee[Ee])},t.removeHooks=function(Ee){ee[Ee]=[]},t.removeAllHooks=function(){ee=_u()},t}var yu=hu();var Zn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},qo=e=>(...t)=>({_$litDirective$:e,values:t}),Gr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var vs=class extends Gr{constructor(t){if(super(t),this.it=Gt,t.type!==Zn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Gt||t==null)return this._t=void 0,this.it=t;if(t===An)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};vs.directiveName="unsafeHTML",vs.resultType=1;var vu=qo(vs);function wa(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var kr=wa();function Eu(e){kr=e}var xs={exec:()=>null};function kt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(dn.caret,"$1"),n=n.replace(s,i),r},getRegex:()=>new RegExp(n,t)};return r}var Fm=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),dn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},jm=/^(?:[ \t]*(?:\n|$))+/,Bm=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Um=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,As=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Wm=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ka=/(?:[*+-]|\d{1,9}[.)])/,Tu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Cu=kt(Tu).replace(/bull/g,ka).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),zm=kt(Tu).replace(/bull/g,ka).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),$a=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Hm=/^[^\n]+/,xa=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Gm=kt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",xa).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Km=kt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ka).getRegex(),zo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Aa=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Vm=kt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Aa).replace("tag",zo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ru=kt($a).replace("hr",As).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",zo).getRegex(),Ym=kt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ru).getRegex(),Sa={blockquote:Ym,code:Bm,def:Gm,fences:Um,heading:Wm,hr:As,html:Vm,lheading:Cu,list:Km,newline:jm,paragraph:Ru,table:xs,text:Hm},wu=kt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",As).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",zo).getRegex(),Zm={...Sa,lheading:zm,table:wu,paragraph:kt($a).replace("hr",As).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",wu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",zo).getRegex()},Qm={...Sa,html:kt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Aa).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:xs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:kt($a).replace("hr",As).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Cu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Xm=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Jm=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ou=/^( {2,}|\\)\n(?!\s*$)/,eg=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ho=/[\p{P}\p{S}]/u,Ea=/[\s\p{P}\p{S}]/u,Lu=/[^\s\p{P}\p{S}]/u,tg=kt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ea).getRegex(),Iu=/(?!~)[\p{P}\p{S}]/u,ng=/(?!~)[\s\p{P}\p{S}]/u,rg=/(?:[^\s\p{P}\p{S}]|~)/u,sg=kt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Fm?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Pu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,og=kt(Pu,"u").replace(/punct/g,Ho).getRegex(),ig=kt(Pu,"u").replace(/punct/g,Iu).getRegex(),Du="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ag=kt(Du,"gu").replace(/notPunctSpace/g,Lu).replace(/punctSpace/g,Ea).replace(/punct/g,Ho).getRegex(),lg=kt(Du,"gu").replace(/notPunctSpace/g,rg).replace(/punctSpace/g,ng).replace(/punct/g,Iu).getRegex(),cg=kt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Lu).replace(/punctSpace/g,Ea).replace(/punct/g,Ho).getRegex(),ug=kt(/\\(punct)/,"gu").replace(/punct/g,Ho).getRegex(),dg=kt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),pg=kt(Aa).replace("(?:-->|$)","-->").getRegex(),fg=kt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",pg).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Bo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,_g=kt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Bo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Mu=kt(/^!?\[(label)\]\[(ref)\]/).replace("label",Bo).replace("ref",xa).getRegex(),Nu=kt(/^!?\[(ref)\](?:\[\])?/).replace("ref",xa).getRegex(),mg=kt("reflink|nolink(?!\\()","g").replace("reflink",Mu).replace("nolink",Nu).getRegex(),ku=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ta={_backpedal:xs,anyPunctuation:ug,autolink:dg,blockSkip:sg,br:Ou,code:Jm,del:xs,emStrongLDelim:og,emStrongRDelimAst:ag,emStrongRDelimUnd:cg,escape:Xm,link:_g,nolink:Nu,punctuation:tg,reflink:Mu,reflinkSearch:mg,tag:fg,text:eg,url:xs},gg={...Ta,link:kt(/^!?\[(label)\]\((.*?)\)/).replace("label",Bo).getRegex(),reflink:kt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Bo).getRegex()},ha={...Ta,emStrongRDelimAst:lg,emStrongLDelim:ig,url:kt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ku).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:kt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ku).getRegex()},bg={...ha,br:kt(Ou).replace("{2,}","*").getRegex(),text:kt(ha.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Fo={normal:Sa,gfm:Zm,pedantic:Qm},ws={normal:Ta,gfm:ha,breaks:bg,pedantic:gg},hg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},$u=e=>hg[e];function Qn(e,t){if(t){if(dn.escapeTest.test(e))return e.replace(dn.escapeReplace,$u)}else if(dn.escapeTestNoEncode.test(e))return e.replace(dn.escapeReplaceNoEncode,$u);return e}function xu(e){try{e=encodeURI(e).replace(dn.percentDecode,"%")}catch{return null}return e}function Au(e,t){let n=e.replace(dn.findPipe,(o,i,a)=>{let l=!1,u=i;for(;--u>=0&&a[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(dn.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(dn.slashPipe,"|");return r}function ks(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function yg(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Su(e,t,n,r,s){let o=t.href,i=t.title||null,a=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:i,text:a,tokens:r.inlineTokens(a)};return r.state.inLink=!1,l}function vg(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let i=o.match(n.other.beginningSpace);if(i===null)return o;let[a]=i;return a.length>=s.length?o.slice(s.length):o}).join(`
`)}var Uo=class{constructor(e){Lt(this,"options");Lt(this,"rules");Lt(this,"lexer");this.options=e||kr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ks(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=vg(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=ks(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ks(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=ks(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let i=!1,a=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))a.push(n[l]),i=!0;else if(!i)a.push(n[l]);else break;n=n.slice(l);let u=a.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${p}`:p;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=g,n.length===0)break;let y=o.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let b=y,k=b.raw+`
`+n.join(`
`),L=this.blockquote(k);o[o.length-1]=L,r=r.substring(0,r.length-b.raw.length)+L.raw,s=s.substring(0,s.length-b.text.length)+L.text;break}else if(y?.type==="list"){let b=y,k=b.raw+`
`+n.join(`
`),L=this.list(k);o[o.length-1]=L,r=r.substring(0,r.length-y.raw.length)+L.raw,s=s.substring(0,s.length-b.raw.length)+L.raw,n=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),i=!1;for(;e;){let l=!1,u="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let g=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),y=e.split(`
`,1)[0],b=!g.trim(),k=0;if(this.options.pedantic?(k=2,p=g.trimStart()):b?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,p=g.slice(k),k+=t[1].length),b&&this.rules.other.blankLine.test(y)&&(u+=y+`
`,e=e.substring(y.length+1),l=!0),!l){let L=this.rules.other.nextBulletRegex(k),B=this.rules.other.hrRegex(k),Y=this.rules.other.fencesBeginRegex(k),le=this.rules.other.headingBeginRegex(k),K=this.rules.other.htmlBeginRegex(k);for(;e;){let M=e.split(`
`,1)[0],R;if(y=M,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),R=y):R=y.replace(this.rules.other.tabCharGlobal,"    "),Y.test(y)||le.test(y)||K.test(y)||L.test(y)||B.test(y))break;if(R.search(this.rules.other.nonSpaceChar)>=k||!y.trim())p+=`
`+R.slice(k);else{if(b||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(g)||le.test(g)||B.test(g))break;p+=`
`+y}!b&&!y.trim()&&(b=!0),u+=M+`
`,e=e.substring(M.length+1),g=R.slice(k)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=u}let a=s.items.at(-1);if(a)a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=p.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}if(!s.loose){let u=l.tokens.filter(g=>g.type==="space"),p=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=p}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Au(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<n.length;i++)o.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Au(i,o.header.length).map((a,l)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=ks(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=yg(t[2],"()");if(o===-2)return;if(o>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Su(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Su(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,i,a=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(i=[...o].length,r[3]||r[4]){a+=i;continue}else if((r[5]||r[6])&&s%3&&!((s+i)%3)){l+=i;continue}if(a-=i,a>0)continue;i=Math.min(i,i+a+l);let p=[...r[0]][0].length,g=e.slice(0,s+r.index+p+i);if(Math.min(s,i)%2){let b=g.slice(1,-1);return{type:"em",raw:g,text:b,tokens:this.lexer.inlineTokens(b)}}let y=g.slice(2,-2);return{type:"strong",raw:g,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Pn=class ya{constructor(t){Lt(this,"tokens");Lt(this,"options");Lt(this,"state");Lt(this,"inlineQueue");Lt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||kr,this.options.tokenizer=this.options.tokenizer||new Uo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:dn,block:Fo.normal,inline:ws.normal};this.options.pedantic?(n.block=Fo.pedantic,n.inline=ws.pedantic):this.options.gfm&&(n.block=Fo.gfm,this.options.breaks?n.inline=ws.breaks:n.inline=ws.gfm),this.tokenizer.rules=n}static get rules(){return{block:Fo,inline:ws}}static lex(t,n){return new ya(n).lex(t)}static lexInline(t,n){return new ya(n).inlineTokens(t)}lex(t){t=t.replace(dn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(dn.tabCharGlobal,"    ").replace(dn.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let i=n.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let i=1/0,a=t.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},a),typeof l=="number"&&l>=0&&(i=Math.min(i,l))}),i<1/0&&i>=0&&(o=t.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(s);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,a="";for(;t;){i||(a=""),i=!1;let l;if(this.options.extensions?.inline?.some(p=>(l=p.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let p=n.at(-1);l.type==="text"&&p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,a)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let p=1/0,g=t.slice(1),y;this.options.extensions.startInline.forEach(b=>{y=b.call({lexer:this},g),typeof y=="number"&&y>=0&&(p=Math.min(p,y))}),p<1/0&&p>=0&&(u=t.substring(0,p+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(a=l.raw.slice(-1)),i=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):n.push(l);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},Wo=class{constructor(e){Lt(this,"options");Lt(this,"parser");this.options=e||kr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(dn.notSpaceStart)?.[0],s=e.replace(dn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Qn(r)+'">'+(n?s:Qn(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Qn(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let i=0;i<e.items.length;i++){let a=e.items[i];r+=this.listitem(a)}let s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
`+r+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let r="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];n="";for(let i=0;i<o.length;i++)n+=this.tablecell(o[i]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Qn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=xu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Qn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=xu(e);if(s===null)return Qn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Qn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Qn(e.text)}},Ca=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Dn=class va{constructor(t){Lt(this,"options");Lt(this,"renderer");Lt(this,"textRenderer");this.options=t||kr,this.options.renderer=this.options.renderer||new Wo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ca}static parse(t,n){return new va(n).parse(t)}static parseInline(t,n){return new va(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let i=s,a=this.options.extensions.renderers[i.type].call({parser:this},i);if(a!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=a||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let a=this.options.extensions.renderers[o.type].call({parser:this},o);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=a||"";continue}}let i=o;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let a='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}},jo,$s=(jo=class{constructor(e){Lt(this,"options");Lt(this,"block");this.options=e||kr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Pn.lex:Pn.lexInline}provideParser(){return this.block?Dn.parse:Dn.parseInline}},Lt(jo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Lt(jo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),jo),wg=class{constructor(...e){Lt(this,"defaults",wa());Lt(this,"options",this.setOptions);Lt(this,"parse",this.parseMarkdown(!0));Lt(this,"parseInline",this.parseMarkdown(!1));Lt(this,"Parser",Dn);Lt(this,"Renderer",Wo);Lt(this,"TextRenderer",Ca);Lt(this,"Lexer",Pn);Lt(this,"Tokenizer",Uo);Lt(this,"Hooks",$s);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let i of o)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);n=n.concat(this.walkTokens(i,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...i){let a=s.renderer.apply(this,i);return a===!1&&(a=o.apply(this,i)),a}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Wo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,a=n.renderer[i],l=s[i];s[i]=(...u)=>{let p=a.apply(s,u);return p===!1&&(p=l.apply(s,u)),p||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Uo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,a=n.tokenizer[i],l=s[i];s[i]=(...u)=>{let p=a.apply(s,u);return p===!1&&(p=l.apply(s,u)),p}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new $s;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,a=n.hooks[i],l=s[i];$s.passThroughHooks.has(o)?s[i]=u=>{if(this.defaults.async&&$s.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await a.call(s,u);return l.call(s,g)})();let p=a.call(s,u);return l.call(s,p)}:s[i]=(...u)=>{if(this.defaults.async)return(async()=>{let g=await a.apply(s,u);return g===!1&&(g=await l.apply(s,u)),g})();let p=a.apply(s,u);return p===!1&&(p=l.apply(s,u)),p}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(i){let a=[];return a.push(o.call(this,i)),s&&(a=a.concat(s.call(this,i))),a}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Pn.lex(e,t??this.defaults)}parser(e,t){return Dn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(t):t,a=await(s.hooks?await s.hooks.provideLexer():e?Pn.lex:Pn.lexInline)(i,s),l=s.hooks?await s.hooks.processAllTokens(a):a;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Dn.parse:Dn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let i=(s.hooks?s.hooks.provideLexer():e?Pn.lex:Pn.lexInline)(t,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let a=(s.hooks?s.hooks.provideParser():e?Dn.parse:Dn.parseInline)(i,s);return s.hooks&&(a=s.hooks.postprocess(a)),a}catch(i){return o(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Qn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},wr=new wg;function At(e,t){return wr.parse(e,t)}At.options=At.setOptions=function(e){return wr.setOptions(e),At.defaults=wr.defaults,Eu(At.defaults),At};At.getDefaults=wa;At.defaults=kr;At.use=function(...e){return wr.use(...e),At.defaults=wr.defaults,Eu(At.defaults),At};At.walkTokens=function(e,t){return wr.walkTokens(e,t)};At.parseInline=wr.parseInline;At.Parser=Dn;At.parser=Dn.parse;At.Renderer=Wo;At.TextRenderer=Ca;At.Lexer=Pn;At.lexer=Pn.lex;At.Tokenizer=Uo;At.Hooks=$s;At.parse=At;var uk=At.options,dk=At.setOptions,pk=At.use,fk=At.walkTokens,_k=At.parseInline;var mk=Dn.parse,gk=Pn.lex;function sr(e){let t=At.parse(e),n=yu.sanitize(t);return vu(n)}function Xn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Kr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Go(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Fu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},kg={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},$g=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,xg=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Mn(e){return!!e&&typeof e=="object"}function Ra(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Oa(e,t){let n=Ra(e),r=Ra(t),s=new Map;for(let a of n)s.set(a,(s.get(a)||0)+1);let o=0;for(let a of r){let l=s.get(a)||0;l>0?s.set(a,l-1):o+=1}let i=0;for(let a of s.values())i+=a;return{added:o,removed:i}}function ju(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Mn(s)&&typeof s.text=="string"?s.text:"").join(""):Mn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Ag(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Fu[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Ra(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=Oa(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,i=Array.isArray(n.edits)?n.edits:[];for(let a of i){let l=Oa(Mn(a)?a.old_string:"",Mn(a)?a.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function La(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Sg=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Bu(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Mn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Sg,"").trim();return n.length>0?{kind:"user",text:n}:null}function Ia(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=$g.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:xg.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Eg(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Tg(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let i of s)if(Mn(i)){if(i.type==="text"&&typeof i.text=="string")o.push(Ia(i.text));else if(i.type==="thinking"){let a=La(i.thinking);a&&o.push(a)}else if(i.type==="tool_use"){let a=Ag(i);typeof i.id=="string"&&t.set(i.id,a),o.push(a)}}return n?qu(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let i of s)if(Mn(i)&&i.type==="tool_result"){let a=t.get(String(i.tool_use_id));if(a){let l=ju(i.content);a.result=l,a.output=typeof i.content=="string"?i.content:l,i.is_error===!0&&(a.is_error=!0)}}let o=Bu(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?qu([s],n):[s]}return[]}function qu(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Cg(e){let t=typeof e.command=="string"?e.command:"",n=ju(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:Fu.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Rg(e){if(e.type==="item.completed"&&Mn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Ia(t.text)];if(t.type==="user_message"){let n=Bu(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=La(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Cg(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Og(e){if(e.schema!=="codex-delegation-monitor-v1"||!Mn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Mn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Ia(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let a=La(n.text);return a?[a]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=kg[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",i={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${s}`,i.icon=o,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Lg(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Ig(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Mn(t)?t:null}function Uu(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Ig(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Eg(o,r);let i=o.schema==="codex-delegation-monitor-v1"?Og(o):Lg(o)?Rg(o):Tg(o,n);return i.length>0&&(r.progress=null),i}}}function Pa(e){let t=[],n=Uu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Pg=5,Dg=10,Mg=/Task\s+#(\d+)/,Ng=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,qg=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Ss(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Fg(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function jg(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Bg(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=Mg.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let i=t.get(String(o.taskId??""));if(!i)continue;let a=o.activeForm||o.subject;typeof a=="string"&&a.trim().length>0&&(i.label=a.trim()),typeof o.status=="string"&&(i.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Ug(e){if(e.tool==="Bash"){let t=e.command||"";return Ng.test(t)?"~ PR/\uAC8C\uC2DC \uC911":qg.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Wg(e){let t=e.filter(s=>s.kind==="tool").slice(-Dg),n=new Map;t.forEach((s,o)=>{let i=Ug(s);if(!i)return;let a=n.get(i)||{count:0,last:-1};a.count+=1,a.last=o,n.set(i,a)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function zg(e){let t=jg(e);if(t)return{text:t,guess:!1};let n=Bg(e);if(n)return{text:n,guess:!1};let r=Wg(e);return r?{text:r,guess:!0}:null}function Hg(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:gn(e,t)}function Vr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,i=null,a=null,l=null,u=null,p=!1,g={},y=!0,b=new Set,k=new Set,L=null,B=null,Y=!1,le=!1,K=!1,M=null,R=null;function F(){Y=!1,le=!1,K=!1,M=null,R=null}async function X(re){if(n){le=!0,K=!1,Le();try{let G=await Promise.resolve(n("get-attempt-prompt",{attempt_id:re,...u?{root_dir:u}:{}}));if(o!==re)return;!G||typeof G!="object"||Array.isArray(G)?K=!0:(M=G,R=re)}catch{o===re&&(K=!0)}finally{o===re&&(le=!1,Le())}}}function V(){if(Y=!Y,Y&&o&&R!==o){X(o);return}Le()}function ge(){if(!Y)return"";let re=Kr({loading:le,error:K});if(re)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${re}
      </div>`;if(!M)return"";if(M.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let G=Go(M.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${G?c`<div class="prompt-block__meta">${G} 발송</div>`:""}
      ${typeof M.task_prompt=="string"?Xn("\uACFC\uC5C5 (user)",M.task_prompt):""}
      ${typeof M.system_prompt=="string"?Xn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",M.system_prompt):""}
    </div>`}function H(){if(!l||!r)return[];let re=r.get(l);return Pa(re?re.lines:[])}function ee(){if(!l||!r)return null;let re=r.get(l),G=re?re.last_event_at:null;return typeof G=="number"?G:null}function oe(){return g.status==="running"}function te(){if(oe()&&o){B||(B=setInterval(()=>Le(),1e3));return}we()}function we(){B&&(clearInterval(B),B=null)}function Pe(re){let G=[],he=0;for(;he<re.length;){let{idx:it,line:Xe}=re[he];if(Xe.kind==="tool"){let Ce=he;for(;Ce<re.length&&re[Ce].line.kind==="tool"&&re[Ce].line.tool===Xe.tool;)Ce+=1;if(Ce-he>=Pg&&!k.has(it)){G.push({kind:"group",idx:it,tool:Xe.tool||"",lines:re.slice(he,Ce)}),he=Ce;continue}}G.push({kind:"line",idx:it,line:Xe}),he+=1}return G}function ye(re){let G=[],he=new Map;for(let Ce=0;Ce<re.length;Ce+=1){let Ne=re[Ce],at=Ne.parent_tool_use_id;if(typeof at=="string"&&at.length>0){let pt=he.get(at);pt||(pt={kind:"subagent",idx:Ce,launch_id:at,agent_type:null,header:null,lines:[]},he.set(at,pt),G.push(pt)),pt.lines.push({idx:Ce,line:Ne});continue}if(Ne.kind==="tool"&&Ne.tool==="Agent"&&typeof Ne.launch_id=="string"&&Ne.launch_id.length>0){let pt=J(Ne),lt=he.get(Ne.launch_id);if(lt){lt.header={idx:Ce,line:Ne},lt.agent_type=pt;continue}let $t={kind:"subagent",idx:Ce,launch_id:Ne.launch_id,agent_type:pt,header:{idx:Ce,line:Ne},lines:[]};he.set(Ne.launch_id,$t),G.push($t);continue}G.push({kind:"entry",idx:Ce,line:Ne})}let it=[],Xe=0;for(;Xe<G.length;){if(G[Xe].kind!=="entry"){it.push(G[Xe]),Xe+=1;continue}let Ce=Xe;for(;Ce<G.length&&G[Ce].kind==="entry";)Ce+=1;it.push(...Pe(G.slice(Xe,Ce))),Xe=Ce}return it}function J(re){let G=re.input;return G&&typeof G.subagent_type=="string"?G.subagent_type:null}function Z(re){for(let G=re.length-1;G>=0;G-=1){let he=re[G];if(he.kind==="result"||he.kind==="error")return null;if(he.kind==="tool"&&!Object.hasOwn(he,"result"))return he}return null}function ke(re){for(let G=re.length-1;G>=0;G-=1)if(re[G].kind==="thinking")return re[G];return null}function j(re,G){if(G.kind==="gate")return c`<div class="sv__gate">${G.text}</div>`;if(G.kind==="phase")return c`<div class="sv__phase">${G.text}</div>`;if(G.kind==="result")return c`<div
        class="sv__result${G.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${G.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${sr(G.text||(G.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(G.kind==="thinking"){let he=b.has(re);return c`<div
        class="sv__think${he?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ht(re)}
      >
        <span class="sv__think-line">💭 ${Ss(G.text)}</span>
        ${he?c`<pre class="sv__think-expand">${G.text}</pre>`:""}
      </div>`}if(G.kind==="user"){let he=b.has(re);return c`<div
        class="sv__line sv__line--user${he?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ht(re)}
      >
        <span class="sv__user-line">▷ ${Ss(G.text)}</span>
        ${he?c`<pre class="sv__user-expand">${G.text}</pre>`:""}
      </div>`}if(G.kind==="error")return c`<div class="sv__error">⛔ ${G.text}</div>`;if(G.kind==="blocker")return c`<div class="sv__error">⛔ ${G.text}</div>`;if(G.kind==="tool"){let he=b.has(re),it=G.tool==="Bash"?Fg(G.command):0,Xe=G.tool==="Bash"?it>1?Ss(G.command):G.command:G.path||G.command||"";return c`<div
        class="sv__tool${he?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ht(re)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${G.icon}</span>
          <span class="sv__tool-name">${G.tool}</span>
          ${Xe?c`<span class="sv__tool-detail">${Xe}</span>`:""}
          ${it>1?c`<span class="sv__tool-more">⋯ ${it}줄</span>`:""}
          ${typeof G.added=="number"?c`<span class="sv__diff-add">+${G.added}</span>`:""}
          ${typeof G.removed=="number"?c`<span class="sv__diff-del">−${G.removed}</span>`:""}
          ${G.result?c`<span class="sv__tool-ok">→ ${G.result}</span>`:""}
        </span>
        ${he?c`<pre class="sv__tool-expand">${se(G)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${sr(G.text||"")}</div>`}function se(re){let G=[];if(re.tool==="Bash"&&typeof re.command=="string"&&re.command.length>0)G.push(re.command);else if(re.input!==void 0)try{G.push(`input: ${JSON.stringify(re.input,null,2)}`)}catch{}return typeof re.output=="string"&&re.output.length>0&&G.push(`output:
${re.output}`),G.join(`

`)}function _e(){if(!o)return c``;let re=H(),G=(i?[g.agent_type,g.model,g.effort]:[g.runner,g.model,g.effort]).filter(Boolean).join(" \xB7 "),he=g.session_id||"",it=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${y?"ON":"OFF"}`,Xe=oe(),Ce=Xe?Hg(ee(),Date.now()):"",Ne=Xe?Z(re):null,at=Xe?ke(re):null,pt=zg(re);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${g.label||(i?g.role||"":o)}</span
        >
        ${pt?c`<span
              class="sv__stage${pt.guess?" sv__stage--guess":""}"
              title=${pt.text}
              >${pt.text}</span
            >`:""}
        ${Xe?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ce?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ce}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ce?c`<span class="sv__live-ago">${Ce}</span>`:""}</span
            >`:""}
        ${he?c`<button
              type="button"
              class="sv__session"
              title=${he}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${he}`}
              @click=${()=>mt(he)}
            >
              ⧉ ${he.slice(0,8)}
            </button>`:""}
        ${g.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${g.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${g.resume_command}`}
              @click=${()=>mt(g.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${G?c`<span class="sv__meta">${G}</span>`:""}
        ${g.worktree?c`<span class="sv__wt" title=${g.worktree}
              >${g.worktree}</span
            >`:""}
        ${i||p?"":c`<button
              type="button"
              class="sv__prompt-toggle${Y?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${Y?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${V}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${y?" sv__follow--on":""}"
          aria-pressed=${y?"true":"false"}
          aria-label=${it}
          @click=${ut}
        >
          <span class="sv__follow-full">⇣ ${it}</span>
          <span class="sv__follow-short">⇣ ${y?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>dt()}
        >
          ✕
        </button>
      </div>
      ${i||p?"":ge()}
      <div class="sv__body">
        ${re.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ye(re).map(lt=>lt.kind==="subagent"?je(lt):lt.kind==="group"?$e(lt):j(lt.idx,lt.line))}
      </div>
      ${Ne||at?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ne?c`<span class="sv__now-icon">${Ne.icon}</span>
                  <span class="sv__now-name">${Ne.tool}</span>
                  <span class="sv__now-detail"
                    >${Ne.tool==="Bash"?Ss(Ne.command):Ne.path||Ne.command||""}</span
                  >`:""}
            ${at?c`<span class="sv__now-think"
                  >💭 ${Ss(at.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function $e(re){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ue(re.idx)}
    >
      <span class="sv__group-icon">${re.lines[0].line.icon}</span>
      <span class="sv__group-name">${re.tool}</span>
      <span class="sv__group-count">${re.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function je(re){let G=k.has(re.idx),he=re.header?re.header.line:null,it=he?he.is_error===!0?"\u2717":typeof he.result=="string"?"\u2713":"\u27F3":"",Xe=he&&he.command?he.command:"";return c`<div class="sv__sub${G?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ue(re.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${re.agent_type||"subagent"}</span>
        ${Xe?c`<span class="sv__sub-detail">${Xe}</span>`:""}
        <span class="sv__sub-count">${re.lines.length}줄</span>
        ${it?c`<span class="sv__sub-state">${it}</span>`:""}
        ${G?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${G?c`<div class="sv__sub-body">
            ${Pe(re.lines).map(Ce=>Ce.kind==="group"?$e(Ce):j(Ce.idx,Ce.line))}
          </div>`:""}
    </div>`}function ue(re){k.add(re),Le()}function Le(){et(_e(),e),te(),y&&St()}function St(){let re=e.querySelector(".sv__body");re&&(re.scrollTop=re.scrollHeight)}function ht(re){b.has(re)?b.delete(re):b.add(re),Le()}function ut(){y=!y,Le()}function mt(re){Ln(re).then(G=>{G?pe("\uBCF5\uC0AC\uB428","success",1200):pe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function E(re){!o||!re||(g={...g,...re},Le())}function ie(re){let G=re.target;if(!G||!G.classList||!G.classList.contains("sv__body"))return;!(G.scrollHeight-G.scrollTop-G.clientHeight<=4)&&y&&(y=!1,Le())}e.addEventListener("scroll",ie,!0);function Te(re){let G=re.target;!G||typeof G.closest!="function"||e.contains(G)||G.closest("dialog")||G.closest(".md-viewer-root")||dt()}let Ie=!1;function Ye(){Ie||(document.addEventListener("mousedown",Te),Ie=!0)}function tt(){Ie&&(document.removeEventListener("mousedown",Te),Ie=!1)}function Je(re){let G=re&&re.attempt_id;if(!G)return;let he=typeof re.launch_id=="string"&&re.launch_id.length>0?re.launch_id:null,it=re.session_ref&&typeof re.session_ref=="object"?re.session_ref:null;if(he&&it)return;let Xe=l;o=G,i=he,a=it,l=i?`session-log:${o}:${i}`:`session-log:${o}`,n&&Xe&&Xe!==l&&Promise.resolve(n("unsubscribe-session-log",{id:Xe})).catch(()=>{}),u=typeof re.root_dir=="string"&&re.root_dir.length>0?re.root_dir:null,g=re.meta||{},p=re.hide_prompt===!0,y=!0,b.clear(),k.clear(),F(),!L&&r&&(L=r.subscribe(Le)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:o,...i?{launch_id:i}:{},...a?{session_ref:a}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Ye(),Le()}function dt(){let re=l;tt(),o=null,i=null,a=null,l=null,u=null,p=!1,b.clear(),k.clear(),F(),we(),n&&re&&Promise.resolve(n("unsubscribe-session-log",{id:re})).catch(()=>{}),et(c``,e),s&&s()}return{open:Je,updateMeta:E,close:dt,isOpen(){return o!==null},destroy(){we(),tt(),L&&(L(),L=null),e.removeEventListener("scroll",ie,!0),o=null,i=null,a=null,l=null,u=null,p=!1,et(c``,e)}}}function Gg(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Ko(t.spec_id),s=Ko(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ko(e){return typeof e=="string"?e.trim():""}function Kg(e){let t=Gg(e);if(t.path)return t;let n=Ko(Wu(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Wu(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var Vg=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Es(e){let t=Kg(e),n=Ko(Wu(e).spec_review),r=Vg.test(n),s=r&&n.slice(0,n.indexOf("@"))==="skipped";if(t.source==="none")return{...t,evidence:"none",skipped:s};let o=t.source!=="draft"&&r;return{...t,evidence:o?"published":"draft",skipped:s}}function Yg(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Zg(e){let t=e&&e.metadata||{},n=Es(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Yg(t)?null:"plan_pending"}),r}function zu(e,t){let n=Zg(e);return c`
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
  `}var Qg="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Xg=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Jg=/^\*\*결론\*\* — (.+)$/;function Vo(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Qg)return null;let n=Xg.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let a=i<t.length?Jg.exec(t[i]):null,l=a?a[1].replace(/\s+/g," ").trim():"",u=a?i+1:i;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var Hu=20;function Gu(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function eb(e){return e.length>Hu?`${e.slice(0,Hu)}\u2026`:e}function tb(e,t,n,r){let s=`${t.lane} ${eb(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Gu(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${sr(t.body)}
        </div>`:""}
  </div>`}function nb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Gu(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${sr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ku(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,a=r.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:a.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${a.map(l=>{let u=Vo(typeof l.text=="string"?l.text:"");return u?tb(l,u,t,s.has(l.id)):nb(l)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${i}
        .value=${o}
        @input=${l=>t.onDraftInput&&t.onDraftInput(l.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${i||o.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var{I:Qk}=uc;var Vu=e=>e.strings===void 0;var rb={},Yu=(e,t=rb)=>e._$AH=t;var $r=qo(class extends Gr{constructor(e){if(super(e),e.type!==Zn.PROPERTY&&e.type!==Zn.ATTRIBUTE&&e.type!==Zn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Vu(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===An||t===Gt)return t;let n=e.element,r=e.name;if(e.type===Zn.PROPERTY){if(t===n[r])return An}else if(e.type===Zn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return An}else if(e.type===Zn.ATTRIBUTE&&n.getAttribute(r)===t+"")return An;return Yu(e),t}});var Yo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ma=[...Yo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Jn=["orchestration_model","orchestration_effort","orchestration_speed"],Zo=[...Yo,...Jn],sb=Ma.filter(e=>Zo.includes(e)),Zu=["delegated","main"],Qo=["inherit","claude","codex"],Ts=["default","fast"],Cs=["standard","fast_track"],Rs=["codex","opus","fable","self","skip"],Xo=["codex","fable","skip"],Jo=["low","medium","high","xhigh"],kn="auto";function wn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Qu(e){if(!wn(e)||!wn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))wn(r)&&wn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Yr(e,t){let n=Qu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[kn,...r.flatMap(([,s])=>s)]}function Xu(e,t,n,r){if(!wn(e)||!wn(e.runners))return[kn];let s=[];for(let[o,i]of Object.entries(e.runners))if(!(!wn(i)||!wn(i.models))&&!(t&&t!=="inherit"&&o!==t))for(let[a,l]of Object.entries(i.models)){if(n&&n!==kn&&a!==n)continue;let u=r(i,l);if(Array.isArray(u))for(let p of u)typeof p=="string"&&!s.includes(p)&&s.push(p)}return[kn,...s]}function Zr(e,t,n){return Xu(e,t,n,(r,s)=>wn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Na(e,t,n){return Xu(e,t,n,(r,s)=>wn(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:wn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Os(e,t){let n=Qu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Ju(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Yr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Zr(t,s,r.impl_model||kn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var ob={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Da=[...sb,...Jn],ib=[...Zo,...Ma].filter((e,t,n)=>n.indexOf(e)===t&&!Da.includes(e));function ed(e,t){let n=wn(e)?e:{},r=wn(t)?t:{},s=[];for(let i of Da){let a=n[i]??null,l=r[i]??null;a!==l&&s.push({key:i,label:ob[i]||i,before:a,after:l,kind:a===null?"added":l===null?"removed":"changed"})}let o=[];for(let i of[...ib,...Object.keys(r)])!Da.includes(i)&&!o.includes(i)&&Object.hasOwn(r,i)&&o.push(i);return{rows:s,ignored_keys:o}}function qa(e,t,n,r,s,o){return Lo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function td(e,t){let n={};for(let r of Ma){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function nd(e,t){let n={};for(let r of Jn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Fa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Jn]}],or={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ei={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ja(e,t,n,r,s,o=null){let i=bn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(a=>({key:a,...i[a]}))}function rd(e,t,n,r,s,o=null){let i={pin:0,global:0,base:0};for(let a of ja(e,t,n,r,s,o))i[a.source]+=1;return i}function sd(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function od(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var l$=[...Yo,...Jn];var ab=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Ba={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},id={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},lb={pin:"pin",global:"global",base:"base"};function cb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${lb[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function ub(e,t,n){switch(e){case"workflow_mode":return Cs;case"spec_review_model":case"impl_review_model":return Rs;case"plan_review_model":return Xo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Jo;case"impl_dispatch":return Zu;case"impl_runtime":return Qo;case"impl_model":return Yr(n,t.impl_runtime);case"impl_effort":return Zr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Ts;case"orchestration_model":return Os(n,null);case"orchestration_effort":return Zr(n,void 0,t.orchestration_model||kn).filter(r=>r!==kn);default:return[]}}function db(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${cb(e.source)}
    <span class="detail-effective__k"
      >${or[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${ei[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${or[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function ad(e,t){let n=Fa.flatMap(l=>l.keys),r=ja(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=rd(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(l=>[l.key,l])),i=Object.fromEntries(r.filter(l=>l.value!==null).map(l=>[l.key,l.value])),a=r.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${l=>t.onToggle(l.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${l=>{l.preventDefault();let u=l.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${a}
        >${pb(o)}</span
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
          ${Fa.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let p=Lo({key:u.key,choices:ub(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return db(u,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${$r(e.preset_id)}
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
  </details>`}function pb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function fb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function ld(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",i=typeof t.exec_receipt=="string"?t.exec_receipt:"",a=fb(n.exec_receipt),l=a?Gn(a):i,u=a?`${a.kind}:${a.actor}`:i.split("@")[0],p=Ro(n.planned_execution,n.exec_receipt),g=n.chips?.pr?.number,y=typeof g=="number"?`PR #${g}`:"PR";return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${y}</a
          >`:""}
      ${p?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
          >`:""}
      ${l?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${l}
            >${u}${a?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${a.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${_b(s).map(b=>mb(b,t,r,{label:b.id==="pr"?y:b.label,href:b.id==="pr"?o:""}))}
    </div>
  </section>`}function _b(e){let n=typeof e=="string"&&Object.hasOwn(Ba,e)&&Ba[e]||Ba.spec_backed;return ab.filter(r=>n.includes(r.id))}var ti={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function mb(e,t,n,r){let s=gb(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,i=typeof o?.fill=="string"?o.fill:null,a=i?i==="full":s.length>0,l=!a&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,p=s&&s.split("@")[1]?.slice(0,7)||"",g=u?ti.stale:a?ti.on:l?ti.current:ti.none,y=bb(e,n),b=`${r.label} \xB7 ${g}${y?` \xB7 ${y}`:""}${s?` \xB7 ${s}`:""}`,k=`detail-summary__gate${a?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${p?" detail-summary__gate--receipt":""}`,L=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${p}</span>`;return r.href?c`<a
      class=${k}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${b}
      >${L}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${L}</span
  >`}function gb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function bb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(id,n)?id[n]:""}function ni(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function cd(e){return ni(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function ud(e,t){let n=e&&e[t];if(!ni(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(cd),s=cd(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function fd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function ri(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${fd(e)}${t}`}function Qr(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${fd(e)}`}function hb(e,t,n){if(n!==null){let s=e==="claude"?ri:Qr,o=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Qr({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function dd(e,t){if(!ni(e)||e.state!=="usable"||!ni(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function pd(e){let t=e.provider_key==="claude"?ri:Qr,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${hb(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function _d({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${pd({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:ud(t,"claude"),selected:s,workspace_default:dd(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${pd({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:ud(t,"codex"),selected:o,workspace_default:dd(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var md=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Ls(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function si(e){if(!Ls(e)||!Ls(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Ls(n)&&Ls(n.models));return t.length>0?t:null}function Nn(e,t){let n=si(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function gd(e,t){return Ls(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function bd(e,t){let n=si(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return gd(r,r.models[t]);return[]}function yb(e){let t=si(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of gd(r,s))n.includes(o)||n.push(o);return n}function vb(e,t){if(!t)return yb(e);let r=si(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let i of bd(e,o))s.includes(i)||s.push(i);return s}function hd(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=Nn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?bd(t,r.impl_model):vb(t,s);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}function wb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function kb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function oi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",a=null,l="";function u(L){L.key==="Escape"&&s&&(L.preventDefault(),b())}document.addEventListener("keydown",u);function p(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${wb(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${l}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${a===null?null:c`<pre class="mv__front">
${a}</pre
                        >`}${sr(i)}`}
          </div>
        </div>
      </div>
    `:c``}function g(){et(p(),e)}async function y(L,B={}){s=L,o="loading",i="",a=null,l="",g();let Y=B.workspace||(n?n():"");if(!Y){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",g();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",g();return}let le="/api/doc?workspace="+encodeURIComponent(Y)+"&path="+encodeURIComponent(L);try{let K=await r(le),M=await K.json().catch(()=>({}));if(!K.ok||!M||M.ok!==!0){if(M?.error==="not_found"&&B.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",g();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(M&&M.error||K.status)+")",g();return}let R=kb(String(M.content||""));a=R.front,i=R.body,o="ready",g()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",g()}}function b(){s=null,et(c``,e)}function k(){document.removeEventListener("keydown",u),b()}return{open:y,close:b,destroy:k}}var $b=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],wd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ii=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],xb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function yd(e){return typeof e=="string"&&xb.has(e)}var Ab=["running","done","failed","interrupted"],Sb={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Eb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Tb(e){let t=sn(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Hr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${wd}
          >부분 집계</span
        >`:""}`}function vd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function za(e){if(typeof e=="number")return Is(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Is(t):""}function Cb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Rb(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Ua(e){return e===null||typeof e=="string"&&e.trim().length>0}function Wa(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Ob(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!ii.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Ua(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Ua(t.effort))||!(!("agent_type"in t)||Ua(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Ab.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Wa(t.started_at)||!Wa(t.last_event_at)||!Wa(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Lb(e,t,n){let s=sn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${za(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${za(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Ib(e,t,n,r){let s=e.status==="running"?null:t,i=(s?sn({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?Is(e.last_event_at):s?za(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,Cb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Rb(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Sb[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${l}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${u.title}
      >${u.text}</span
    >
    ${a?c`<span class="detail-session__leg-time detail-session__time"
          >${a}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </button>`}function Pb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Db(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let g=Ob(p);!g||s.has(g.launch_id)||yd(g.agent_type)||(s.add(g.launch_id),r.push(g))}r.sort((p,g)=>(p.started_at||0)-(g.started_at||0));let i={};for(let{role:p,provider:g}of ii){let y=t?t.roles[p]?.[g]:null;i[p]=y?[...y.legs]:[]}let a=ii.flatMap(({role:p})=>i[p]),l=new Set,u=[];for(let{role:p,provider:g}of ii){for(let y of r.filter(b=>b.role===p&&b.provider===g)){let b=a.find(k=>k.receipt_id===y.launch_id)||null;b&&!Pb(y,b)||(b&&l.add(b.receipt_id),u.push(Ib(y,b,e.attempt_id,n)))}for(let y of i[p])!l.has(y.receipt_id)&&!yd(y.agent_type)&&u.push(Lb(p,g,y))}return u}function Mb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...$b,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Eb(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${wd}</span>`:""}
  </div>`}var Nb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Is(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function qb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Fb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function jb(e,t){let n=Fb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${sa(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${fs(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Is(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${s=>{s.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function kd(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],i=[...o.filter(b=>b&&b.current===!0),...o.filter(b=>b&&b.current!==!0).sort((b,k)=>k.index-b.index)],a=i.map(b=>jb(b,t)),l=n.expanded||new Set;if(s.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let b of s)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&u.add(b.resumed_from);let p=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let L=typeof b.session_id=="string"&&b.session_id.length>0,B=u.has(b.attempt_id),Y=L&&!B,le=L?B?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!Y}
      title=${le}
      @click=${K=>{K.stopPropagation(),Y&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},g=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let L=b.cause_detail,B=L&&typeof L.reason=="string"&&L.reason.length>0?typeof L.command=="string"&&L.command.length>0?`${L.reason} \xB7 ${L.command}`:L.reason:b.cause;return c`<div class="detail-session__cause" title=${B}>
      ${b.cause}
    </div>`},y=b=>{let k=vd(la(b));if(sn(k).length===0&&!Hr(b.usage))return"";let L=l.has(b.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${L?"true":"false"}
      title=${L?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${B=>{B.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Tb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${a}${s.map(b=>{let k=la(b),L=vd(k),B=sn(L);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${b.status||"unknown"}"
            data-attempt-id=${b.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(b.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Nb[b.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${b.attempt_id}</span>
            ${ds(b)?c`<span
                  class="detail-session__resumed"
                  title=${ds(b)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${vr(b)}</span>
            ${B.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${b.session_id?c`<span class="detail-session__sid" title=${b.session_id}
                  >${String(b.session_id).slice(0,8)}</span
                >`:""}
            ${B.length>0?B.map(Y=>c`<span
                      class="detail-session__usage"
                      title=${Y.tooltip}
                      >${Y.label}</span
                    >`):Hr(b.usage)?c`<span class="detail-session__usage"
                    >${Hr(b.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Is(b.started_at)}</span>
          </button>
          ${y(b)} ${p(b)} ${g(b)} ${qb(b)}
          ${l.has(b.attempt_id)&&b.usage?Mb(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${Db(b,k,t)}
        </div>`})}
    </div>
  `}function $d(e,t={}){return c`
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
          ${Bb(e)}
        </div>`:""}
  `}function Bb(e){let t=Kr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Xn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Go(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Xn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Xn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Ub=["open","in_progress","deferred","resolved","closed"],Wb=[0,1,2,3,4];function xd(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,i=t.queueStore,a=t.execPresetStore,l=t.sessionLogStore,u=null,p=null,g={},y="",b=!1,k=[],L=!1,B={},Y={claude:null,codex:null},le=null,K=null,M=0,R=!1,F=!1,X="",V="",ge="";function H(){R=!1,F=!1,X="",V="",ge=""}function ee(){Y={claude:null,codex:null},le=null,K=null,M+=1}async function oe(){if(!s)return null;try{let $=await Promise.resolve(s("get-workspace-accounts",{}));return $&&typeof $.state=="string"?$:null}catch{return null}}async function te($){try{let ae=await fetch($);if(!ae.ok)return null;let P=await ae.json();if(!P||typeof P!="object"||!Array.isArray(P.accounts))return null;let Se=P.accounts.filter(st=>st!==null&&typeof st=="object"&&!Array.isArray(st));return{accounts:Se,active:Se.find(st=>st.active===!0)||null}}catch{return null}}async function we($){K=$;let ae=++M,[P,Se,st]=await Promise.all([te("/api/claude-usage"),te("/api/codex-usage"),oe()]);ae!==M||$!==u||(Y={claude:P,codex:Se},le=st,Be())}let Pe=[],ye=null,J=null,Z=!1,ke="",j=!1,se=0,_e=new Set;function $e(){Pe=[],ye=null,J=null,Z=!1,ke="",j=!1,se+=1,_e.clear()}async function je($){if(!s)return;let ae=++se;try{let P=await Promise.resolve(s("get-comments",{id:$}));if(ae!==se||$!==u)return;Pe=Array.isArray(P)?P:[],Z=!1}catch{if(ae!==se||$!==u)return;Z=!0}Be()}function ue(){if(!s||!u)return;let $=p&&typeof p.comment_count=="number"?p.comment_count:null;if(ye!==u){ye=u,J=$,je(u);return}$!==null&&$!==J&&(J=$,je(u))}function Le($){_e.has($)?_e.delete($):_e.add($),Be()}function St($){let ae=ke.trim().length===0;ke=$,ae!==($.trim().length===0)&&Be()}async function ht(){let $=ke.trim();if(!s||!u||$.length===0||j)return;let ae=u;j=!0,Be();let P=!1;try{let Se=await Promise.resolve(s("add-comment",{id:ae,text:$}));Array.isArray(Se)&&Se.length>0&&(P=!0,ae===u&&(Pe=Se,Z=!1,ke="",J=Se.length))}catch{P=!1}P||pe("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),ae===u&&(j=!1),Be()}let ut={onToggle:Le,onDraftInput:St,onSubmit:ht},mt=t.mdViewer||null,E=null;mt||(E=document.createElement("div"),E.className="md-viewer-root",document.body.appendChild(E));let ie=mt||oi(E,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Te=document.createElement("div");Te.className="session-log-root",document.body.appendChild(Te);let Ie=Vr(Te,{transport:s?($,ae)=>Promise.resolve(s($,ae)):void 0,sessionLogStore:l}),Ye=!1,tt=!1,Je=!1,dt=null,re=null,G=0;function he($){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${$}`}function it(){Ye=!1,tt=!1,Je=!1,dt=null,re=null,G+=1}async function Xe($){if(!s)return;let ae=++G;tt=!0,Je=!1,Be();try{let P=await Promise.resolve(s("get-bead-prompt",{bead_id:$}));if(ae!==G)return;!P||typeof P!="object"||Array.isArray(P)?Je=!0:(dt=P,re=he($))}catch{ae===G&&(Je=!0)}finally{ae===G&&(tt=!1,Be())}}let Ce=[],Ne=null,at=0;function pt($,ae){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${$}::${ae}`}function lt(){Ce=[],Ne=null,at+=1}async function $t($,ae){if(!s)return;let P=++at,Se;try{Se=await Promise.resolve(s("get-session-refs",{bead_id:$}))}catch{Se=null}P!==at||ae!==Ne||(Ce=Se&&Array.isArray(Se.sessions)?Se.sessions:[],Be())}function Kt(){if(!s||!u)return;let $=p&&p.metadata,ae=$&&typeof $=="object"&&typeof $.session_ref=="string"?$.session_ref:null;if(ae===null){lt();return}let P=pt(u,ae);Ne!==P&&(Ce=[],Ne=P,$t(u,P))}function Bt(){if(Ye=!Ye,Ye&&u&&re!==he(u)){dt=null,Xe(u);return}Be()}function Ut(){if(!i||!u)return[];let $=i.get();return($&&$.attempts?Object.values($.attempts):[]).filter(P=>P&&P.bead_id===u).sort((P,Se)=>(Se.started_at||0)-(P.started_at||0)).map(P=>({attempt_id:P.attempt_id,bead_id:P.bead_id,status:P.status,started_at:typeof P.started_at=="number"?P.started_at:null,runner:P.runner||null,model:P.model||null,effort:P.effort||P.observed_effort||null,speed:P.speed||null,session_id:P.session_id||null,resumed_from:P.resumed_from||null,continuation_mode:P.continuation_mode||null,dismissed_at:typeof P.dismissed_at=="number"?P.dismissed_at:null,cause:typeof P.cause=="string"?P.cause:null,cause_detail:P.cause_detail||null,exec_default_preset_id:typeof P.exec_default_preset_id=="string"?P.exec_default_preset_id:null,exec_default_preset_revision:typeof P.exec_default_preset_revision=="number"?P.exec_default_preset_revision:null,exec_values:P.exec_values&&typeof P.exec_values=="object"?P.exec_values:null,usage:P.usage||null,usage_legs:Array.isArray(P.usage_legs)?P.usage_legs:[],delegation_sessions:Array.isArray(P.delegation_sessions)?P.delegation_sessions:[]}))}function It(){if(!i||!u)return null;let $=i.get();return Sn($&&$.attempts||{},u)}let yt=new Set;function He($){yt.has($)?yt.delete($):yt.add($),Be()}function C($){let ae=i?i.get():null,P=ae&&ae.attempts?ae.attempts[$]:null;Ie.open({attempt_id:$,meta:P?{runner:P.runner||void 0,model:P.model||void 0,effort:P.effort||void 0,status:P.status||void 0,session_id:P.session_id||void 0}:{}})}function Q($,ae){let P=i?i.get():null,Se=P&&P.attempts?P.attempts[$]:null,nt=(Se&&Array.isArray(Se.delegation_sessions)?Se.delegation_sessions:[]).find(bt=>bt&&typeof bt=="object"&&bt.launch_id===ae);nt&&Ie.open({attempt_id:$,launch_id:ae,meta:{runner:nt.provider==="claude"?"claude":"codex",role:nt.role,...typeof nt.agent_type=="string"?{agent_type:nt.agent_type}:{},model:nt.model,effort:nt.effort,session_id:nt.session_id,status:nt.status}})}async function fe($){if(!s||!$)return;let ae=await Ur();if(ae===null)return;let P=()=>{let bt=i?i.get():null;return bt&&typeof bt.revision=="number"?bt.revision:0},Se=async(bt={},Ke=P())=>await s("worker-attempt-resume",{attempt_id:$,expected_revision:Ke,...ae!==""?{instructions:ae}:{},...bt}),st=bt=>{bt?.queue&&i?.set&&i.set(bt.queue)},nt=await Se();if(st(nt),nt&&nt.conflict){let bt=nt.queue&&typeof nt.queue.revision=="number"?nt.queue.revision:P();nt=await Se({},bt),st(nt)}nt=await Kn(nt,(bt,Ke)=>Se({continuation:bt,decision_token:Ke}),{onResult:st,refresh:()=>Se()}),nt&&nt.resumed===!1&&!nt.conflict&&nt.reason&&pe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${nt.reason}`,"error",2400)}function T($){!$||!u||Ie.open(Wr($,u,p&&p.status))}let W={onOpen:C,onOpenDelegation:Q,onResume:fe,onToggleUsage:He,onOpenSessionRef:T,onCopyResumeCommand:ft};function Re(){let $=i?i.get():null,ae={...B};for(let P of["orchestration_model","orchestration_effort","orchestration_speed"]){let Se=$&&$[P];typeof Se=="string"&&(ae[P]=Se)}return ae}async function qe(){if(s){try{let $=await Promise.resolve(s("get-session-defaults",{}));B=$&&$.values&&typeof $.values=="object"?$.values:{}}catch{B={}}Be()}}function xe(){let $=i?i.get():null;return $&&$.runner_catalog||null}function Ze(){let $=i?i.get():null;return $&&typeof $.execution_defaults=="object"?$.execution_defaults:null}function ct(){let $=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},P=bn({pin:{...$,...g},global:Re(),execution_defaults:Ze(),runner_catalog:xe(),route:typeof $.route=="string"?$.route:null}).orchestration_model.value||"";return Nn(xe(),P)}function We(){let $=a?a.get():null;return!$||typeof $.revision!="number"?null:{revision:$.revision,presets:Array.isArray($.presets)?$.presets:[]}}function Ae($){return $?.compatible===!1}function O($){a&&$&&typeof $.revision=="number"&&Array.isArray($.presets)&&a.set({revision:$.revision,presets:$.presets})}async function N(){let $=We(),ae=$?.presets.find(P=>P.id===y);if(!(!s||!u||!$||!ae||Ae(ae)||b)){b=!0,k=[],Be();try{let P=await Promise.resolve(s("apply-impl-preset",od(u,ae.id,$.revision)));if(P&&P.conflict){O(P),pe("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Se=P&&Array.isArray(P.issue)?P.issue[0]:P?.issue;if(P&&P.applied&&Se&&typeof Se=="object"){p=Se,k=Array.isArray(P.skipped_orchestration_keys)?P.skipped_orchestration_keys.filter(st=>typeof st=="string"):[];for(let st of md)delete g[st];pe(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}P&&P.error==="bd_readback_failed"?pe("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):pe("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(P){P&&typeof P=="object"&&P.code==="bd_readback_failed"?pe("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):pe("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,Be()}}}let be=null;n&&n.subscribe&&(be=n.subscribe(()=>vt()));let ze=null;i&&typeof i.subscribe=="function"&&(ze=i.subscribe(()=>{u&&Be()}));let ve=null;a&&typeof a.subscribe=="function"&&(ve=a.subscribe(()=>{u&&Be()}));function Ge($){$.key==="Escape"&&u&&($.preventDefault(),r())}document.addEventListener("keydown",Ge);function vt(){if(u){if(n&&typeof n.snapshotFor=="function"){let $=n.snapshotFor("detail:"+u)||[];p=$.find(P=>P&&P.id===u)||$[0]||p}ue(),Kt(),Be()}}function ft($){Ln($).then(ae=>{ae?pe("\uBCF5\uC0AC\uB428","success",1200):pe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Et($){$.preventDefault(),$.stopPropagation(),u&&ft(u)}function Wt($,ae){$.preventDefault(),$.stopPropagation(),ft(ae)}function Me($,ae,P){$.preventDefault(),$.stopPropagation(),ie.open(ae,{missing_state:P})}function pn($,ae){g[$]=ae,Be(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",sd(u,$,ae.length===0?null:ae))).catch(()=>{pe("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function xt($,ae){let P=p||{},Se=P.metadata&&typeof P.metadata=="object"?P.metadata:{},st={};for(let Ke of["impl_runtime","impl_model","impl_effort"])st[Ke]=Object.hasOwn(g,Ke)?g[Ke]:typeof Se[Ke]=="string"?Se[Ke]:"";st[$]=ae;let nt=hd(st,xe(),ct()),bt={};for(let Ke of["impl_runtime","impl_model","impl_effort"])bt[Ke]=g[Ke],g[Ke]=nt[Ke]||"";Be(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...nt,orchestration_runtime:ct()})).then(Ke=>{let Ct=Array.isArray(Ke)?Ke[0]:Ke;if(!Ct||typeof Ct!="object"||!Ct.id)throw new Error("implementation target readback failed");p=Ct;for(let f of["impl_runtime","impl_model","impl_effort"])delete g[f];Be()}).catch(()=>{for(let Ke of["impl_runtime","impl_model","impl_effort"])bt[Ke]===void 0?delete g[Ke]:g[Ke]=bt[Ke];Be(),pe("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Zt($,ae,P){if(!s||!u)return!1;try{let Se=await Promise.resolve(s($,ae)),st=Array.isArray(Se)?Se[0]:Se;return st&&typeof st=="object"&&st.id?(p=st,!0):(pe(P,"error"),!1)}catch{return pe(P,"error"),!1}}function en($){setTimeout(()=>{try{let ae=e.querySelector($);ae&&typeof ae.focus=="function"&&ae.focus()}catch{}},0)}function Qt(){R=!0,X=p&&p.title||"",Be(),en('.detail-edit__input[data-edit="title"]')}function rt($){X=$.target.value}function Xt(){R=!1,X="",Be()}function Ee(){Zt("edit-text",{id:u,field:"title",value:X},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(ae=>{ae&&(R=!1,X=""),Be()})}function A(){F=!0,V=p&&p.description||"",Be(),en('.detail-edit__textarea[data-edit="description"]')}function me($){V=$.target.value}function Oe(){F=!1,V="",Be()}function wt(){Zt("edit-text",{id:u,field:"description",value:V},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(ae=>{ae&&(F=!1,V=""),Be()})}function Ot($,ae,P,Se){if($.key==="Escape"){$.stopPropagation(),P();return}$.key==="Enter"&&(!Se||$.ctrlKey||$.metaKey)&&($.preventDefault(),ae())}function gt($){let ae=$.target.value;Zt("update-status",{id:u,status:ae},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Be())}function Tt($){let ae=Number($.target.value);Zt("update-priority",{id:u,priority:ae},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Be())}function tn($){ge=$.target.value}function nn(){let $=ge.trim();$.length!==0&&Zt("label-add",{id:u,label:$},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(ae=>{ae&&(ge=""),Be()})}function $n($){if($.key==="Escape"){$.stopPropagation(),ge="",Be();return}$.key==="Enter"&&($.preventDefault(),nn())}function Pt($){Zt("label-remove",{id:u,label:$},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Be())}let yn={onCopyPath:Wt,onOpenDoc:Me};function xn($){return typeof $=="string"?$:$&&typeof $=="object"?String($.id||$.to||$.issue_id||$.depends_on||""):""}function S($){switch($&&typeof $=="object"?String($.dependency_type||$.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function d($){let P=(Array.isArray($.dependencies)?$.dependencies:[]).map(Se=>({id:xn(Se),icon:S(Se)})).filter(Se=>Se.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${P.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${P.map(Se=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Se.id)}
                  >
                    ${Se.icon?`${Se.icon} `:""}${Se.id}
                  </button>`:c`<span class="detail-dep"
                    >${Se.icon?`${Se.icon} `:""}${Se.id}</span
                  >`)}
          </div>`}
    `}function h($){let ae=$.metadata||{},P=$.workflow||{},Se=P.stages||{},st=Se.spec&&Se.spec.stale,nt=Se.impl&&Se.impl.stale,bt=P.quick_fix_review?.state==="stale",Ke=Se.plan||null,Ct=P.route_source==="derived",f=P.route||ae.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Ct?" detail-kv__v--derived":""}"
          title=${Ct?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Ct?"unset":f}</span
        >
      </div>
      ${P.route!=="quick_fix"||Object.hasOwn(ae,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${ae.spec_review||"\uC5C6\uC74C"}${st?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${P.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ke?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ke?.approval_receipt||"\uC5C6\uC74C"}${Ke?.approval_state==="stale"?" \xB7 stale":Ke?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${P.route!=="quick_fix"||Object.hasOwn(ae,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${ae.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${P.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${P.resolver.attempt} \xB7 ${P.resolver.prior_sha} \u2192 ${P.resolver.sha}`}
              >${`${P.resolver.prior_sha.slice(0,7)} \u2192 ${P.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${P.route==="quick_fix"||Object.hasOwn(ae,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${ae.quick_fix_review||"\uC5C6\uC74C"}${bt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${P.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${P.planned_execution.kind}</span>
            </div>
            ${P.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${P.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${P.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Gn(P.exec_receipt)}</span
            >
          </div>`:""}
      ${P.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${P.impl_entry.actor}@${P.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${ae.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${ae.pr_url}</span>
          </div>`:""}
    `}let x={route:["quick_fix","spec_backed","full_plan"]};async function z($,ae){let P=ae.target.value;if($==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&P!=="full_plan"&&!window.confirm(`full_plan \u2192 ${P||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Be();return}await Zt("update-workflow-meta",{id:u,key:$,value:P},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Be()}function de($){let ae=$.metadata||{};return c` ${((Se,st)=>{let nt=x[Se],bt=typeof ae[Se]=="string"?ae[Se]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${Se}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Se}
          data-edit=${`wfmeta-${Se}`}
          @change=${Ke=>z(Se,Ke)}
        >
          <option value="" ?selected=${!nt.includes(bt)}>
            ${st}
          </option>
          ${nt.map(Ke=>c`<option value=${Ke} ?selected=${bt===Ke}>${Ke}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Fe($,ae){return R?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${X}
            @input=${rt}
            @keydown=${P=>Ot(P,Ee,Xt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ee}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Xt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${$}</h2>
        ${sn(ae).map(P=>c`<span class="detail-usage-total" title=${P.tooltip}
              >${P.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Qt}
        >
          ✎
        </button>
      </div>
    `}function Qe($){let ae=rn($.created_at),P=rn($.updated_at);return!ae&&!P?c``:c`
      ${ae?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${ae}</span>
          </div>`:""}
      ${P?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${P}</span>
          </div>`:""}
    `}function qt($,ae){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${gt}
        >
          ${Ub.map(P=>c`<option value=${P} ?selected=${P===$}>${P}</option>`)}
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
          ${Wb.map(P=>c`<option value=${String(P)} ?selected=${P===ae}>
                P${P}
              </option>`)}
        </select>
      </div>
    `}function zt($){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${F?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${A}
            >
              ✎
            </button>`}
      </div>
      ${F?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${V}
              @input=${me}
              @keydown=${ae=>Ot(ae,wt,Oe,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${wt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Oe}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${$||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function fn($){let ae=typeof $.notes=="string"?$.notes:"";return ae.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${ae}</div>
    `}function vn($){let ae=Array.isArray($.labels)?$.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${ae.map(P=>c`<span class="detail-label-chip"
              >${P}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${P}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+P}
                @click=${()=>Pt(P)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${ge}
            @input=${tn}
            @keydown=${$n}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${nn}
          >
            추가
          </button>
        </span>
      </div>
    `}function _n(){if(!u)return c``;let $=p||{},ae=String($.id||u),P=$.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Se=It(),st=$.status||"open",nt=typeof $.priority=="number"?Math.max(0,Math.min(4,$.priority)):"",bt=$.description||"",Ke={...$,metadata:{...$.metadata||{},...g}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Et}
            >
              ${ae}
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
          ${Fe(P,Se)}
          ${ld(Ke)}
          ${ad({metadata:Ke.metadata,workspace_values:Re(),catalog:xe(),execution_defaults:Ze(),expanded:L,presets:We()?.presets||[],preset_id:y,preset_busy:b,skipped_orchestration_keys:k},{onToggle:Ct=>{L=Ct,Be()},onEdit:(Ct,f)=>{if(Ct==="impl_runtime"||Ct==="impl_model"||Ct==="impl_effort"){xt(Ct,f??"");return}pn(Ct,f??"")},onPresetSelect:Ct=>{y=Ct,k=[],Be()},onPresetApply:()=>{N()}})}
          ${_d({md:Ke.metadata,catalog:Y,workspace_defaults:le,handlers:{onExecChange:pn}})}
          ${qt(st,nt)} ${Qe($)}
          ${zt(bt)}
          ${Ku(Pe,ut,{expanded:_e,draft:ke,sending:j,error:Z})}
          ${fn($)} ${vn($)} ${d($)}
          ${h($)} ${de($)}
          ${zu($,yn)}
          ${$d({expanded:Ye,loading:tt,error:Je,data:dt},{onToggle:Bt})}
          ${kd(Ut(),W,{total:Se,expanded:yt},Ce)}
        </div>
      </div>
    `}function Be(){et(_n(),e)}return{load($){$!==u&&(g={},y="",k=[],L=!1,H(),$e(),it(),lt(),ee()),u=$,p=null,vt(),qe(),K!==$&&we($)},clear(){u=null,p=null,g={},y="",b=!1,k=[],L=!1,H(),$e(),it(),lt(),ee(),ie.close(),Ie.close(),et(c``,e)},destroy(){be&&(be(),be=null),ze&&(ze(),ze=null),ve&&(ve(),ve=null),document.removeEventListener("keydown",Ge),mt||(ie.destroy(),E&&E.parentNode&&E.parentNode.removeChild(E)),Ie.destroy(),Te.parentNode&&Te.parentNode.removeChild(Te),u=null,p=null,ee(),y="",b=!1,k=[],$e(),it(),lt(),et(c``,e)}}}function Ad(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),a=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,p,g="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=p||"An unrecoverable error occurred.");let y=typeof g=="string"?g.trim():"";if(s&&(y.length>0?(s.textContent=y,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>a()),t.addEventListener("cancel",u=>{u.preventDefault(),a()}),{open:l,close:a,getElement(){return t}}}function ai(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Sd(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function xr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function li(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let i=o.kind;n.set(i,(n.get(i)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let i=n.get(s);i!==void 0&&r.push(i?`${o} \xB7 \uC790\uB3D9`:o)}return r}function ci(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let i=o.started_at,a=o.finished_at;typeof i!="number"||typeof a!="number"||!Number.isFinite(i)||!Number.isFinite(a)||a<i||(n+=a-i,r=!0)}return r?n:null}function ui(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function zb(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:s?{sha:ai(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Ed(e,t){let n=zb(e,t);return n?c`<button
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
            title=${n.deploy.at?rn(n.deploy.at):""}
            >${ui(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${xr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Xr(e){let t=gn(e.created_at),n=gn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${rn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${rn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Hb(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ds(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function di(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function qn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(g=>g&&g.bead_id===t&&g.phase!=="done").sort((g,y)=>(g.requested_at||0)-(y.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,a=typeof s?.last_error=="string"?s.last_error:null,l=s?Hb(s.phase):null,u=s?.kind==="stale_work_backup_fresh",p=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!s||!!a),label:u?a?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":a?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(a?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${a} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${a} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:a,confirmation:p}}function Ps(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
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
  </div>`}var Gb={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Td(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function a(u){return Number.isInteger(i[u])?Number(i[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Gb[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${a("branch_ahead")}`:[`staged ${a("staged_count")}`,`unstaged ${a("unstaged_count")}`,`untracked ${a("untracked_count")}`,`branch ahead ${a("branch_ahead")}`,`HEAD ahead ${a("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function pi(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Kb(e){return c`<div
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
  </div>`}function fi(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.overlaps)?e.overlaps:[],r=e.scope_missing===!0,s=e.popover||null,o=e.cross_lane||null,i=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&!o&&!i?"":c`<div class="worker-deps">
    ${o?c`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${o.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${o.label}
        </button>`:""}
    ${i?c`<span
          class=${`worker-dep worker-dep--armed${i.orphan?" worker-dep--armed-orphan":""}`}
          title=${i.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
          >${i.orphan?c`${i.label}<button
                  type="button"
                  class="worker-dep__label mon2-arm__release"
                  data-lane-id=${i.lane_id}
                >
                  해제
                </button>`:i.label}</span
        >`:""}
    ${t.map(a=>c`<span
          class=${`worker-dep worker-dep--pred${a.foreign?" worker-dep--foreign":""}`}
          title=${a.title||""}
          >${a.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${a.id}
                data-root-dir=${a.root_dir||""}
              >
                ${a.label}
              </button>`:a.label}</span
        >`)}${n.map(a=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${a.id}
          aria-label=${`scope \uACB9\uCE68 ${a.id} (${a.location_label})`}
          title=${[`\uACB9\uCE68 ${a.id} (${a.location_label})`,...a.prefixes].join(`
`)}
        >
          ⧉ ${a.id}
        </button>`)}${r?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${s?Kb(s):""}
  </div>`}function _i(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Vb(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function Cd(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Rd(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function mi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Yb(e){let t=Array.isArray(e.badges)?e.badges:[],n=sn(e.usage),r=Vn(e.usage),s=gn(e.done_at);return c`<div
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
      ${Rd(e.pr_url,e.pr_number)}${s?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${rn(e.done_at)}`}
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
              >`):r?c`<span class="worker-usage" title=${_s(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${Sd(e.work_kind)}
            >작업 ${xr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function ir(e){if(e.lane==="done"&&e.done_layout==="three_line")return Yb(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=sn(e.usage),s=Vn(e.usage),o=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!i,l=a?gn(e.done_at):"",u=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",g=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",y=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=e.lane==="done"?"":_i(e.workflow),L=e.lane==="done"?"":Cd(e.from_id),B=mi(e.priority),Y=c`<span class="worker-mini__title">${e.title}</span>`,le=Rd(e.pr_url,e.pr_number),K=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",M=n.map(_e=>_e===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${_e}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${_e===e.completion_badge&&e.completion_title||""}
          >${_e}</span
        >`),R=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",F=r.length>0?r.map(_e=>c`<span class="worker-usage" title=${_e.tooltip}
              >${_e.label}</span
            >`):s?c`<span class="worker-usage" title=${_s(e.usage)}
            >${s}</span
          >`:"",X=o?c`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?c`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",V=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",ge=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",H=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ee=e.discard,oe=ee?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ee?.attempt_id||""}
          data-operation-id=${ee?.operation?.operation_id||""}
          data-discard-mode=${ee?.confirmation||"unmerged"}
          ?disabled=${ee?!ee.enabled:e.discard_enabled===!1}
          title=${ee?ee.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ee?.label||"\uD3D0\uAE30"}
        </button>`:"",te=e.stale_work||null,we=te?c`${te.can_resume||te.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            기존 작업 이어가기
          </button>`:""}${te.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            백업 후 새로 시작
          </button>`:""}${te.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            다시 확인
          </button>`:""}`:"",Pe=te?c`<div class="worker-mini__stale">
        <strong>${te.title}</strong>
        <span>${te.summary}</span>
        <span>${te.cause}</span>
        ${te.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",ye=e.revise_action?c`<button
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
        </button>`:"",J=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Z=y||k||L||J||F?c`<div class="worker-chips">
          ${y}${k}${L}${J?pi(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${F}
        </div>`:"",ke=fi(e.dependency_chips),j=Ps(e),se=!!(o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ee?.operation||e.revise_action||te);return c`<div
    class="worker-mini${i?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${y}${b}${B}${L}${le}${Y}
          </div>
          <div class="worker-mini__row2">
            ${F}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${rn(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${Sd(e.work_kind)}
                  >작업 ${xr(e.work_ms)}</span
                >`:""}${M}${X}
            <span class="worker-mini__actions"
              >${V}${ge}${H}${oe}</span
            >
            ${Xr(e)}
          </div>`:i?c`<div class="worker-mini__head">
              ${u}${p}${b}${B}${le}${K}${M}${g}${R}
            </div>
            <div class="worker-mini__body">${Y}${Pe}</div>
            ${ke}${Z}${se?c`<div class="worker-mini__foot">
                  ${X}
                  <span class="worker-mini__actions"
                    >${V}${ge}${H}${oe}${ye}${we}</span
                  >
                  ${Ps(e)}
                </div>`:""}
            ${Xr(e)}`:c`<div class="worker-mini__line">
              ${u}${p}${b}${B}${Y}${le}${K}${M}${g}${R}${X}${V}${ge}${H}${oe}
            </div>
            ${ke}${Z}${j} ${Xr(e)}`}
  </div>`}function Zb(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(c`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(c`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var Qb={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50"};function Ha(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,i=e.session_preferred===!0,a=Qb[e.session_preferred_reason||""]||"",l=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),p=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),g=fi(e.dependency_chips),y=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=_i(l),k=Cd(e.from_id),L=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${mi(e.priority)}
      ${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:i?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${a}
              >세션 권장</span
            >`:""}${Vb(l)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${l?To(l,e.status,{onOpenDoc:n.onOpenDoc}):""}${g}
    ${y||b||k||L?c`<div class="worker-chips">
          ${y}${b}${k}${pi(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason||n.dep_action===!0?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${Zb(t.lanes,e.id)}
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
              ?disabled=${!s}
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":u?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴</button
            >${n.dep_action===!0?c`<button
                  type="button"
                  class="worker-card__dep mon-dep__btn"
                  data-bead-id=${e.id}
                  title="의존성"
                  aria-label="의존성"
                >
                  ⛓
                </button>`:""}`}
    </div>
    ${Xr(e)}
  </div>`}function Tn(e){let t=!!e.collapsible&&!!e.collapsed,n=c`<span
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?Ha(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):ir(r))}
          </div>`}
  </section>`}function gi(e){return e.replace(/\/+$/,"")}function Xb(e,t){let n=gi(e),r=gi(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function bi(e,t){let n=new Set;for(let r of e)for(let s of t){if(!Xb(r,s))continue;let o=gi(r),i=gi(s);n.add(o.length>=i.length?o:i)}return[...n].sort()}function Ld(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let i of t){if(o.has(i.id))continue;o.add(i.id);let a=r[i.id];if(!a||!Array.isArray(a.scope))continue;let l=a.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),s.push({member:i,scope:l})}for(let i=0;i<s.length;i+=1)for(let a=i+1;a<s.length;a+=1){let l=bi(s[i].scope,s[a].scope);if(l.length===0)continue;let u=s[i].member,p=s[a].member;n.get(u.id)?.overlaps.push({id:p.id,title:p.title,location_label:p.location_label,prefixes:l}),n.get(p.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}var Od=["parallel","serial","candidate"];function Ms(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function Ga(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,i=s.lane_id;if(o!==null&&o===i)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let a=Od.includes(r.kind),l=Od.includes(s.kind);if(a&&i!==null)return{kind:"ops",title:`${i} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:i,index:n.serial_raw_lengths[i]||0}]};if(o!==null&&l&&i===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(a&&o===null&&l&&i===null){let u=Jb(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!a&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:a?{kind:"note",text:`${Ms(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Ms(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function Jb(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Id={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Pd={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Ya(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ka(e){for(let t of Ya(e))if(Object.hasOwn(Id,t))return Id[t];return null}function Va(e){let t=null;for(let n of Ya(e))Object.hasOwn(Pd,n)&&(t=Pd[n]);return t}function Jr(e){let t=Ka(e),n=Va(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Md(e,t){let n=Ka(e)??Ka(t),r=Va(t)??Va(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var eh=new Set(["repo_operation_timeout_unresolved"]);function th(e){for(let t of Ya(e))if(eh.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function nh(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Nd(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||th(n.code))return"";if(n.code==="timeout"){let s=Number(t);return Number.isFinite(s)&&s>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(s/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(nh(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${xr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Dd={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function qd(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Dd,t.blocked_reason)?Dd[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=Jr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=Jr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}var Fd=160;function rh(e){return e.length>Fd?`${e.slice(0,Fd)}\u2026`:e}function sh(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${rh(e.command)}</code>`:""}
  </div>`}function oh(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function ih(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function jd(e){let t=e.failure?Jr(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${sh(e.failure.cause_detail,e.failure.reason)}
          ${oh(e.failure.reason)}
          ${Ps({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function ah(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var lh=new Set(["codex-runner"]);function ch(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",i=s&&typeof s.at=="number"?s.at:null,a=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&lh.has(b.agent_type))),l=a.filter(b=>b&&b.state==="live"),u=a.filter(b=>b&&b.state!=="live"),p=r&&typeof r.last_event_at=="number"?gn(r.last_event_at,t):"",g=r?gn(r.updated_at,t):"",y=p?`\uCD5C\uADFC \uD65C\uB3D9 ${p}`:g?`\uAC31\uC2E0 ${g}`:"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${gn(i,t)}</span
            >`:""}
      </div>`:y?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${y}</span>
        </div>`:""}${l.length>0||u.length>0?c`<div class="rtile__legs">
        ${l.map(b=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${b.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(b=>b.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var uh={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function dh(e){if(!e)return"";let t=uh[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Za(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(te=>te&&te.current===!0)||null,i=e.failed===!0,a=!!e.paused,l=i?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ih(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,p=ds(e),g=sn(e.usage),y=Vn(e.usage),b=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,k=e.base_exception||null,L=e.landing,B=e.attempt_id&&e.attempt_id===n,Y=r.monitor||null,le=ah(Y),K=Y?fi(Y.dependency_chips):"",M=ch(Y,t,a,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),R=s&&e.workflow?.chips?.exec_receipt||null,F=_i(e.workflow),X=R?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Gn(R)}`}
        >${`${R.kind}:${Co(R)}`}</span
      >`:"",V=o?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${fs(o)}</span
      >`:"",ge=le||F||V||X?c`<div class="rtile__meta">
          ${le}${F}${V}${X}
        </div>`:"",H=c`${b?c`<span class="worker-mini__badge">${b}</span>`:""}${k?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${k}</span
      >`:""}`,ee=s?"":Xr(e),oe=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${B?" rtile--sel":""}${a?" rtile--paused":""}${i?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${mi(e.priority)}${p?c`<span class="rtile__resumed" title=${p}>↻</span>`:""}${H}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${l}</span>`:""}${dh(o)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${l}</span>`}
        ${s?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${e.resume_eligible===!1}
                  title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${oe}
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
                ${oe}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${M}${e.rollup?Eo(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ta}):""}
    ${L?c`<div class="rtile__landing">
          <span
            class="merge-step${L.failed?" merge-step--failed":""}"
            style=${`--progress: ${L.percent}%`}
            >${L.label}${L.index>0?c`<span class="merge-step__n"
                  >${L.index}/${L.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${K}
    ${s?ge:le||F||u||g.length>0||y?c`<div class="rtile__meta">
            ${le}${F}${pi(e.exec_chips)}
            ${g.length>0?g.map(te=>c`<span class="worker-usage" title=${te.tooltip}
                      >${te.label}</span
                    >`):y?c`<span
                    class="worker-usage"
                    title=${_s(e.usage)}
                    >${y}</span
                  >`:""}
          </div>`:""}
    ${Ps(e)} ${ee}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${i||a?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Qa(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>Za(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var Xa=new Set(["unavailable","not_applicable"]);function ar(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Bd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function lr(e,t){return t===null?null:`${or[e]}: ${t.display} (${ei[t.source]})`}function Ja(e){return e.filter(t=>t!==null).join(`
`)}function Ns(e){if(typeof e!="object"||e===null)return null;let t=vr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Ja(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(or.orchestration_model,e.model),n(or.orchestration_effort,e.effort),n(or.orchestration_speed,e.speed)])}}function Ar(e,t){let n=ar(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=ar(e,"orchestration_effort"),s=ar(e,"orchestration_speed"),o=Bd([Nn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Ja(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",lr("orchestration_model",n),lr("orchestration_effort",r),lr("orchestration_speed",s)])}}function ph(e,t){return e===null||e.value===null||Xa.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function fh(e){return e===null||Xa.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function _h(e){return e===null?null:e.value==="auto"?"auto":Xa.has(e.resolution)?null:e.display}function cr(e,t){if(typeof e!="object"||e===null)return null;let n=ar(e,"impl_dispatch"),r=ar(e,"impl_runtime"),s=ar(e,"impl_model"),o=ar(e,"impl_effort"),i=ar(e,"impl_speed"),a=n!==null&&n.value==="main"?"\uBA54\uC778":Bd([ph(r,t??null),fh(s),_h(o),i!==null&&i.value==="fast"?"Fast":null]);return a===""?null:{text:a,title:Ja(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",lr("impl_dispatch",n),lr("impl_runtime",r),lr("impl_model",s),lr("impl_effort",o),lr("impl_speed",i)])}}var on="",mh=["impl_runtime","impl_model","impl_effort"],gh=["claude_account","codex_account"],bh=5,hi=1;function hn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function yi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(C=>pe(C,"error",4e3)),o={},i={},a=[],l=!1,u={state:"absent",values:{},warnings:[]},p={},g={},y=Promise.resolve(),b={claude:null,codex:null},k=!1,L=null,B={},Y="",le="",K=!1,M=!1,R=!1,F=null,X=!1;function V(){let C=t.queue?t.queue():null;return hn(C)?C:null}function ge(){let C=V();return C?C.runner_catalog:null}function H(){let C=V();return C&&hn(C.execution_defaults)?C.execution_defaults:null}function ee(){let C=t.implPresetStore?.get();return hn(C)&&Array.isArray(C.presets)?C:null}function oe(){return r===null?{}:{root_dir:r}}async function te(C,Q){return X||!n?null:await n(C,Q)}function we(C){C&&hn(C.queue)&&t.onQueueAdopt?.(C.queue)}async function Pe(C,Q){let fe=V();if(!fe||X)return null;let T=await te(C,{...Q,...oe(),expected_revision:fe.revision});if(we(T),r!==null&&T&&T.conflict){let W=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:V()?.revision??fe.revision;T=await te(C,{...Q,...oe(),expected_revision:W}),we(T)}return T}async function ye(){l=!0,He();try{let C=await te("get-session-defaults",{...oe()});o=hn(C?.values)?{...C.values}:{},i={...o},a=Array.isArray(C?.warnings)?C.warnings:[]}catch(C){a=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${C instanceof Error?C.message:String(C)}`)}finally{l=!1,He()}}async function J(){let C=td(o,i);if(Object.keys(C).length!==0){try{let Q=await te("set-session-defaults",{values:C,...oe()});o=hn(Q?.values)?{...Q.values}:{},i={...o},a=Array.isArray(Q?.warnings)?Q.warnings:[]}catch(Q){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}He()}}function Z(C,Q){if(!hn(C))return;let fe=C.state;u={state:fe==="usable"||fe==="unusable"||fe==="absent"?fe:"absent",values:hn(C.values)?{...C.values}:{},warnings:Array.isArray(C.warnings)?C.warnings:[]},g={...u.values},Q&&(p={...g})}async function ke(){try{Z(await te("get-workspace-accounts",{...oe()}),!0)}catch(C){u={state:"unusable",values:{},warnings:["kv_read_failed"]},g={},p={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${C instanceof Error?C.message:String(C)}`)}He()}async function j(C){try{let Q=await fetch(C);if(!Q.ok)return null;let fe=await Q.json();if(!hn(fe)||!Array.isArray(fe.accounts))return null;let T=fe.accounts.filter(W=>hn(W)&&typeof W.key=="string"&&W.key.length>0&&typeof W.email=="string"&&W.email.length>0);return{accounts:T,active:T.find(W=>W.active===!0)||null}}catch{return null}}async function se(){k=!0;let[C,Q]=await Promise.all([j("/api/claude-usage"),j("/api/codex-usage")]);X||(b={claude:C,codex:Q},He())}function _e(){let C={};for(let Q of gh){let fe=Object.hasOwn(p,Q)?p[Q]:null,T=Object.hasOwn(g,Q)?g[Q]:null;fe!==T&&(C[Q]=fe)}return C}async function $e(){let C=_e();if(Object.keys(C).length!==0){try{Z(await te("set-workspace-accounts",{values:C,...oe()}),!1)}catch(Q){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}He()}}function je(C,Q){Q===on?delete p[C]:p[C]=Q,He(),y=y.then(()=>$e())}function ue(C,Q){if(mh.includes(C)){ht(C,Q);return}Q===on?delete i[C]:i[C]=Q,He(),J()}function Le(){let C=It().orchestration_model,Q=bn({global:{orchestration_model:C??void 0},execution_defaults:H(),runner_catalog:ge()}).orchestration_model.value;return Q?Nn(ge(),Q):null}function St(C,Q){typeof Q=="string"&&Q.length>0?i[C]=Q:delete i[C]}function ht(C,Q){let fe=Q===on?void 0:Q,T=Ju({impl_runtime:C==="impl_runtime"?fe:i.impl_runtime,impl_model:C==="impl_model"?fe:i.impl_model,impl_effort:C==="impl_effort"?fe:i.impl_effort},ge(),Le());St("impl_runtime",T.impl_runtime),St("impl_model",T.impl_model),St("impl_effort",T.impl_effort),He(),J()}async function ut(){let C=V();if(!C)return;let Q={orchestration_model:C.orchestration_model??null,orchestration_effort:C.orchestration_effort??null,orchestration_speed:C.orchestration_speed??null},fe=nd(Q,{...Q,...B});if(Object.keys(fe).length!==0){try{let T=await Pe("worker-queue-set-orchestration-defaults",{values:fe});if(T&&T.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}B={}}catch(T){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}He()}}function mt(C,Q){B[C]=Q===on?null:Q,He(),ut()}function E(C){if(L=C,!C){He();return}let Q=ge(),fe=It(),T=fe.orchestration_model;T&&!Os(Q,C).includes(T)&&(B.orchestration_model=null,T=null);let W=fe.orchestration_effort;W&&!Na(Q,C,T||kn).includes(W)&&(B.orchestration_effort=null),He(),ut()}async function ie(C){if(!(!V()||C<hi)){try{await Pe("worker-queue-set-slots",{slots:C})}catch(Q){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}He()}}async function Te(C){if(!(!V()||C<hi||C>bh)){try{await Pe("worker-queue-set-serial-lane-count",{count:C})}catch(Q){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}He()}}async function Ie(C,Q){let fe=C==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await Pe(fe,{on:Q})}catch(T){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}He()}function Ye(){let C={},Q=It();for(let fe of Zo){let T=Jn.includes(fe)?Q[fe]:i[fe];typeof T=="string"&&T.length>0&&(C[fe]=T)}return C}async function tt(){let C=ee();if(!C)return;let Q=Ye();if(Object.keys(Q).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let fe=(C.presets||[]).find(W=>W.id===Y),T=le.trim()||(fe?fe.name:"");if(!T){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let W=fe?await te("impl-preset-update",{expected_revision:C.revision,id:fe.id,name:T,settings:Q}):await te("impl-preset-create",{expected_revision:C.revision,name:T,settings:Q});if(W&&W.applied){if(le="",!fe&&Array.isArray(W.presets)){let Re=W.presets.find(qe=>qe.name===T);Y=Re?Re.id:Y}He()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),He()}catch(W){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${W instanceof Error?W.message:String(W)}`)}}async function Je(){let C=ee();if(!(!C||Y.length===0))try{let Q=await te("impl-preset-delete",{expected_revision:C.revision,id:Y});Q&&Q.applied?(Y="",He()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),He())}catch(Q){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}}function dt(C){o=hn(C.values)?{...C.values}:{},i={...o},a=Array.isArray(C.warnings)?C.warnings:[],hn(C.queue)&&(t.onQueueAdopt?.(C.queue),B={})}async function re(){let C=ee(),Q=V();if(!C||!Q||Y.length===0)return;let fe=T=>({preset_id:Y,expected_revision:C.revision,expected_queue_revision:T,...oe()});try{let T=await te("apply-impl-preset-global",fe(Q.revision));if(T&&T.applied&&dt(T),r!==null&&T&&T.queue_applied===!1){let W=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:V()?.revision??Q.revision;T=await te("apply-impl-preset-global",fe(W)),T&&T.applied&&dt(T)}T&&T.applied?T.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):T&&T.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(T){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}He()}async function G(){M=!0,R=!1,He();try{let C=await te("get-worker-system-prompt",{});!C||typeof C!="object"||Array.isArray(C)?R=!0:F=C}catch{R=!0}finally{M=!1,He()}}function he(){if(K=!K,K&&!F){G();return}He()}function it(){let C=Kr({loading:M,error:R});if(C)return C;if(!F)return"";let Q=Array.isArray(F.variants)?F.variants:[];return c`<div class="settings-dialog__sp-body">
      ${F.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${F.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${Q.map(fe=>c`<div class="settings-dialog__sp-variant" data-variant=${fe.key}>
            <div class="settings-dialog__sp-cond">${fe.condition}</div>
            ${Xn(fe.label,fe.system_prompt)}
          </div>`)}
    </div>`}function Xe(){return c`<section
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
        aria-expanded=${K?"true":"false"}
        @click=${he}
      >
        ${K?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${K?it():""}
    </section>`}function Ce(C,Q,fe,T,W,Re,qe){let xe=W[C]??on,Ze=qa(C,fe,W,H(),ge(),qe),ct=Ze.options.find(Ae=>Ae.value===xe),We=xe===on?Ze.full_value:ct?.full_value;return c`<select
        class=${xe===on?"settings-dialog__unset":""}
        data-key=${C}
        aria-label=${Q}
        title=${We||""}
        ?disabled=${Re===!0||Ze.disabled}
        .value=${$r(String(xe))}
        @change=${Ae=>T(C,String(Ae.target.value))}
      >
        <option value=${on} ?selected=${xe===on}>
          ${Ze.unset_label}
        </option>
        ${Ze.options.map(Ae=>c`<option
              value=${Ae.value}
              title=${Ae.full_value||""}
              ?selected=${Ae.value===xe}
            >
              ${Ae.label}
            </option>`)}
      </select>
      ${xe===on?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ne(C,Q,fe,T,W,Re=!1,qe){return c`<div
      class=${`settings-dialog__row${Re?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        ${Ce(C,Q,fe,T,W,Re,qe)}
      </span>
    </div>`}function at(C,Q){let fe=Q?Q.active:null;return hn(fe)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${C==="claude"?fe.email:Qr({...fe,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function pt(C,Q,fe){let T=b[fe],W=Object.hasOwn(p,C)?p[C]:on,Re=fe==="claude"?ri:Qr,qe=!!T?.accounts.some(xe=>xe.key===W);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${Q}
          data-account-key=${C}
          @change=${xe=>je(C,String(xe.target.value))}
        >
          <option value=${on} ?selected=${W.length===0}>
            ${at(fe,T)}
          </option>
          ${W.length>0&&!qe?c`<option value=${W} selected>
                ${W} (목록에 없음)
              </option>`:""}
          ${T?.accounts.map(xe=>c`<option value=${xe.key} ?selected=${xe.key===W}>
                ${Re(xe)}
              </option>`)||""}
        </select>
        ${T?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function lt(){let C=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${C} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${C}`:null}function $t(C,Q,fe,T,W){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${Q}-on)`}
        ></i>
        ${C}
      </span>
      <span class="settings-dialog__controls">
        ${Ce(fe,`${C} \uBAA8\uB378`,T,ue,i,!1)}
        ${Ce(W,`${C} effort`,Jo,ue,i,!1)}
      </span>
    </div>`}function Kt(C,Q,fe,T){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${T?" is-on":""}`}
          data-automation=${C}
          aria-pressed=${T?"true":"false"}
          aria-label=${Q}
          @click=${()=>Ie(C,!T)}
        >
          ${T?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${fe}</span>
      </span>
    </div>`}function Bt(C,Q,fe,T){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${C}>
          <button
            type="button"
            aria-label=${`${Q} \uAC10\uC18C`}
            @click=${()=>T(fe-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${fe}</span>
          <button
            type="button"
            aria-label=${`${Q} \uC99D\uAC00`}
            @click=${()=>T(fe+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ut(C){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${C.rows.length>0?`\uBCC0\uACBD ${C.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${C.rows.map(Q=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${Q.kind}
          >
            <span class="settings-dialog__preset-diff-label">${Q.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${Q.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${Q.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${C.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${C.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function It(){let C=V(),Q={};for(let fe of Jn)Q[fe]=Object.prototype.hasOwnProperty.call(B,fe)?B[fe]:C&&typeof C[fe]=="string"?C[fe]:null;return Q}function yt(){let C=ge(),Q=i.impl_runtime,fe=i.impl_model,T=ee(),W=V(),Re=It(),qe=Os(C,L),xe=Yr(C,void 0).filter(ve=>ve!==kn),Ze=Na(C,L,Re.orchestration_model||kn).filter(ve=>ve!==kn),ct=Y?(T?.presets||[]).find(ve=>ve.id===Y):null,We=ct?ed(Ye(),hn(ct.settings)?ct.settings:{}):null,Ae=W&&typeof W.slots=="number"?W.slots:hi+1,O=W&&typeof W.serial_lane_count=="number"?W.serial_lane_count:hi,N=H()?.supported===!0,be=lt(),ze=qa("workflow_mode",Cs,i,H(),C);return c`
      ${a.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${a.join(", ")}
          </div>`:""}
      ${be?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${be}
          </div>`:""}
      ${N?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${l?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${$r(Y)}
                @change=${ve=>{Y=String(ve.target.value),He()}}
              >
                <option value="" ?selected=${Y===""}>
                  실행 프리셋…
                </option>
                ${(T?.presets||[]).map(ve=>c`<option
                      value=${ve.id}
                      ?selected=${ve.id===Y}
                    >
                      ${ve.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!We||We.rows.length===0}
                @click=${re}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${Y?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${$r(le)}
                @input=${ve=>{le=String(ve.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${Y?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${tt}
              >
                ${Y?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${Y.length===0}
                @click=${Je}
              >
                삭제
              </button>
            </div>
            ${We?Ut(We):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${$r(L||on)}
                    @change=${ve=>{let Ge=String(ve.target.value);E(Ge===on?null:Ge)}}
                  >
                    <option value=${on} ?selected=${!L}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${L==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${L==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ne("orchestration_model","\uBAA8\uB378",qe,mt,Re)}
              ${Ne("orchestration_effort","effort",Ze,mt,Re)}
              ${Ne("orchestration_speed","\uC18D\uB3C4",Ts,mt,Re)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${pt("claude_account","Claude","claude")}
              ${pt("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${on}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>ue("workflow_mode",on)}
                    >
                      ${ze.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Cs.map(ve=>c`<button
                          type="button"
                          data-mode=${ve}
                          aria-pressed=${String(i.workflow_mode===ve)}
                          @click=${()=>ue("workflow_mode",ve)}
                        >
                          ${ve}
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
              ${$t("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Rs,"spec_review_effort")}
              ${$t("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Xo,"plan_review_effort")}
              ${$t("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Rs,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ne("impl_runtime","\uC704\uC784 \uB300\uC0C1",Qo,ue,i)}
              ${Ne("impl_model","\uBAA8\uB378",Yr(C,Q),ue,i)}
              ${Ne("impl_effort","effort",Zr(C,Q,fe),ue,i)}
              ${Ne("impl_speed","\uC18D\uB3C4",Ts,ue,i)}
              ${Ne("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",xe,ue,i,!1,{...i,...Re})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Kt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",W?.auto_advance===!0)}
              ${Kt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",W?.auto_merge===!0)}
              ${Bt("slots","\uB3D9\uC2DC \uC2E4\uD589",Ae,ve=>ie(ve))}
              ${Bt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",O,ve=>Te(ve))}
            </div>
            ${Xe()}
          `}
    `}function He(){X||et(yt(),e)}return{load(){B={};let C=[ye(),ke()];return k||C.push(se()),Promise.all(C).then(()=>{})},render:He,sessionDraft:()=>({...i}),destroy(){X=!0,et(c``,e)}}}function vi(e){return c`<svg
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
  </svg>`}function Ud(){return vi(cs`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Wd(){return vi(cs`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function zd(){return vi(cs`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Hd(){return vi(cs`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Gd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Kd(e){let t=(Array.isArray(e)?e:[]).map(a=>a&&a.usage).filter(a=>a&&typeof a=="object"&&"providers"in a);if(t.length>0)return sn(Po(t));let n={};for(let a of Wn)n[a]=0;let r=!1,s=0,o=0,i=0;for(let a of Array.isArray(e)?e:[]){let l=a&&a.usage;if(l&&typeof l=="object"){let u=!1;for(let p of Wn){let g=l[p];typeof g=="number"&&Number.isFinite(g)&&(n[p]+=g,r=!0,u=!0)}if(u){o+=1;let p=l.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,i+=1)}}}return o>0&&i===o&&(n.total_cost_usd=s),r?Vn(n):null}function Fn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function el(e,t){let n=Fn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function hh(e,t){if(!Fn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function yh(e){if(!Fn(e)||!Fn(e.execution_defaults)||!Fn(e.runner_catalog)||!Fn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=bn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Nn(e.runner_catalog,n.orchestration_model.value??""),s=Ar(n,e.runner_catalog),o=cr(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function Vd(e,t){let n=t.notify||(j=>pe(j,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let a=document.createElement("button");a.type="button",a.className="mon2-deck__panel-close",a.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),a.textContent="\u2715",o.append(i,a);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let u=null,p=null,g=null,y=new Map;function b(){let j=t.workspacesState?t.workspacesState():[];return Array.isArray(j)?j.filter(se=>Fn(se)):[]}function k(j){return b().find(se=>se.root_dir===j)||null}function L(j){return hh(k(j),y.get(j))}function B(){for(let j of b()){let se=y.get(j.root_dir);se&&typeof se.revision=="number"&&typeof j.revision=="number"&&j.revision>=se.revision&&y.delete(j.root_dir)}}async function Y(j,se,_e){let $e=t.transport,je=L(se);if(!(!$e||!Fn(je))){try{let ue=await $e(j,{..._e,root_dir:se,expected_revision:je.revision});if(Fn(ue?.queue)&&y.set(se,ue.queue),ue&&ue.conflict){let Le=Fn(ue.queue)&&typeof ue.queue.revision=="number"?ue.queue.revision:L(se)?.revision;ue=await $e(j,{..._e,root_dir:se,expected_revision:Le}),Fn(ue?.queue)&&y.set(se,ue.queue)}}catch(ue){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ue instanceof Error?ue.message:String(ue)}`)}J()}}function le(j){u!==j&&(u=j,t.onFocusChange?.(u),J())}function K(j){le(u===j?null:j)}function M(j){if(p===j){F();return}R(),p=j;let se=k(j);i.textContent=`${se?.name||j} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,g=yi(l,{root_dir:j,queue:()=>L(j),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:_e=>{y.set(j,_e),J()}}),g.load(),J()}function R(){g?.destroy(),g=null}function F(j){R(),p=null,s.hidden=!0,i.textContent="",j!==!0&&J()}let X=()=>F();a.addEventListener("click",X);function V(j){j.key==="Escape"&&u!==null&&le(null)}document.addEventListener("keydown",V);function ge(j,se){let _e=Math.max(se,j,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${se}\uAC1C \uC911 ${j}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:_e},($e,je)=>je<j?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function H(j){let se=j.auto_advance===!0,_e=j.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${se?" is-on":""}`}
        data-act="auto"
        aria-pressed=${se?"true":"false"}
        aria-label=${`${j.name} \uC790\uB3D9\uD654`}
        title=${se?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${se?Wd():Ud()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${_e?" is-on":""}`}
        data-act="merge"
        aria-pressed=${_e?"true":"false"}
        aria-label=${`${j.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${_e?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${zd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${p===j.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${p===j.root_dir?"true":"false"}
        aria-label=${`${j.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Hd()}
      </button>`}function ee(j){let se=yh(j);return se?c`<div class="mon2-deck__chips">
      ${se.orchestration?c`<span class="mon2-deck__chip" title=${se.orchestration.title}
            >오케 ${se.orchestration.text}</span
          >`:""}
      ${se.worker?c`<span class="mon2-deck__chip" title=${se.worker.title}
            >워커 ${se.worker.text}</span
          >`:""}
    </div>`:""}function oe(j){let se=[];for(let[_e,$e]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let je=el(j,_e);je>0&&se.push(`${$e} ${je}`)}return se.join(" \xB7 ")}function te(j){let se=el(j,"running"),_e=typeof j.slots=="number"?j.slots:1;return c`<div
      class=${`mon2-deck__tile${u===j.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${j.root_dir}
      aria-pressed=${u===j.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${j.root_dir}>${j.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${_e}\uAC1C \uC911 ${se}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${se}/${_e}</span>
          ${ge(se,_e)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${j.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${H(j)}</div>
        <span class="mon2-deck__counts">${oe(j)}</span>
        ${ee(j)}
      </div>
    </div>`}function we(j){let se=t.doneItems?t.doneItems():[],_e=t.rangeLabel?t.rangeLabel():"",$e=Kd(Array.isArray(se)?se:[]),je=ue=>j.reduce((Le,St)=>Le+el(St,ue),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${j.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${_e}`}
        >실행 ${je("running")} · 대기 ${je("queue")} · PR
        ${je("pr_wait")}${je("session_active")>0?` \xB7 \uC138\uC158 ${je("session_active")}`:""}
        · ${_e} 완료
        ${Array.isArray(se)?se.length:0}</span
      >
      ${$e===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof $e=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Gd(_e)}
                  >${$e}</span
                >`:$e.map(ue=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ue.provider}
                      title=${ue.tooltip}
                      >${ue.label}</span
                    >`)}
          </span>`}
    </div>`}function Pe(){let j=b();return j.length===0?"":c`${we(j)}
      <div class="mon2-deck__strip">
        ${j.map(se=>te(se))}
      </div>`}function ye(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function J(){B(),ye(),p!==null&&!k(p)&&F(!0),et(Pe(),r),g?.render()}function Z(j){let se=j.target;if(!se||typeof se.closest!="function")return;let _e=se.closest("[data-root-dir]");if(!_e)return;let $e=_e.getAttribute("data-root-dir")||"",je=se.closest("[data-act]")?.getAttribute("data-act");if(je==="worker"){t.gotoWorkerTab?.($e);return}if(je==="auto"){Y("worker-automation-toggle",$e,{on:L($e)?.auto_advance!==!0});return}if(je==="merge"){Y("worker-merge-auto-toggle",$e,{on:L($e)?.auto_merge!==!0});return}if(je==="gear"){M($e);return}K($e)}function ke(j){if(j.key!=="Enter"&&j.key!==" ")return;let se=j.target;if(!se||typeof se.closest!="function")return;let _e=se.closest('[data-root-dir][role="button"]');!_e||_e!==se||(j.preventDefault(),K(_e.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Z),r.addEventListener("keydown",ke),{render:J,focusRoot:()=>u,panelRoot:()=>p,destroy(){document.removeEventListener("keydown",V),r.removeEventListener("click",Z),r.removeEventListener("keydown",ke),a.removeEventListener("click",X),R(),et(c``,r),e.replaceChildren()}}}function Yd(e,t){let n=new Map(e.map((l,u)=>[l,u])),r=new Map(e.map(l=>[l,new Set]));for(let l of t)l.blocker!==l.blockee&&n.has(l.blocker)&&n.has(l.blockee)&&r.get(l.blockee).add(l.blocker);let s=new Set,o=[];for(;o.length<e.length;){let l=e.find(u=>{if(s.has(u))return!1;for(let p of r.get(u))if(!s.has(p))return!1;return!0});if(l===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(l),o.push(l)}let i=[],a=new Map(o.map((l,u)=>[l,u]));for(let l of o){let u=null;for(let p of r.get(l)){let g=Number(n.get(l))<Number(n.get(p)),y=Number(a.get(l))>Number(a.get(p));g&&y&&(u===null||Number(a.get(p))>Number(a.get(u)))&&(u=p)}u!==null&&i.push({bead_id:l,after:u})}return{order:o,corrections:i,cycle:!1}}var vh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ki="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",wh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",kh="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",es="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function qs(e,t){return`${e}\0${t}`}function $h(e,t){let n=new Set(e),r=new Map;for(let s of e){let o=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,i=o instanceof Map?o.get(s):void 0;if(!Array.isArray(i))return null;r.set(s,i.filter(a=>a!==s&&n.has(a)))}return r}function xh(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function Bs(e,t){let n=e.entries,r=n.map(g=>g.bead_id),s=$h(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let o=[];for(let[g,y]of s)for(let b of y)o.push({blocker:b,blockee:g});let i=xh(e,t),a=new Map(r.map((g,y)=>[g,y])),l=r.slice(0,i).filter(g=>s.get(g).some(y=>Number(a.get(y))>Number(a.get(g)))),u=Yd(r.slice(i),o);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:l};let p=new Map(n.map(g=>[g.bead_id,g]));return{entries:[...n.slice(0,i),...u.order.map(g=>p.get(g))],corrections:u.corrections,cycle:!1,held:!1,mismatched:l}}function Zd(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Bs(n,t)}function Ah(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Sh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Eh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function tl(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let i of e.get(o)||[]){if(i===n)return!0;r.has(i)||(r.add(i),s.push(i))}}return!1}function Th(e,t){let n=new Set;for(let[i,a]of t)for(let l of a)n.add(qs(i,l));let r=new Map,s=new Map;for(let i of e){let a=qs(i.a,i.b);r.set(a,i),s.set(a,i.type==="dep-add")}let o=[];for(let i of e){let a=qs(i.a,i.b);r.get(a)===i&&s.get(a)!==n.has(a)&&o.push(i)}return o}function Ch(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let i=s-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=s;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function Rh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function wi(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function nl(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Us(e){let t=Eh(e.blocked_by_map),n=[],r=new Set,s={refusal:null},o=u=>{let p=e.owner_of.get(u);return typeof p!="string"||p.length===0?(s.refusal=Sh(u),null):p};return{graph:t,dep_ops:n,state:s,ownerOf:o,addDep:(u,p,g)=>{if(s.refusal!==null||u===p)return;let y=t.get(u)||[];if(y.includes(p))return;let b=o(u);if(b!==null){if(tl(t,p,u)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${p}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...y,p]),g!==void 0&&r.add(qs(u,p)),n.push({type:"dep-add",a:u,b:p,root_dir:b,...g===void 0?{}:{lane_id:g}})}},removeDep:(u,p)=>{if(s.refusal!==null||u===p)return;let g=t.get(u)||[];if(!g.includes(p))return;let y=o(u);y!==null&&(t.set(u,g.filter(b=>b!==p)),n.push({type:"dep-remove",a:u,b:p,root_dir:y}))},laneCreated:(u,p)=>r.has(qs(u,p))}}function Ws(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let o=Th(e.dep_ops,t.blocked_by_map),i=o.filter(p=>p.type==="dep-remove"),a=o.filter(p=>p.type==="dep-add"),l=s.disarm_ops??[],u=s.lane_id===void 0||s.correction===void 0?void 0:Ah(s.lane_id,s.correction);return{lane_ops:n,ops:[...i,...l,...a,...r],lane_op_index:i.length+l.length,...u===void 0?{}:{correction:u}}}function Qd(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Fs(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Xd(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],o=new Map;for(let i of r){let a=e.owner_of.get(i.bead_id)||i.root_dir;typeof a!="string"||a.length===0||o.set(a,[...o.get(a)||[],i.bead_id])}for(let[i,a]of o)s.push({type:"worker-queue-disarm",payload:{bead_ids:a,lane_id:n},root_dir:i});return s}function Jd(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let i=e.ownerOf(o.bead_id);if(i===null)return;let a=s.get(i)??0;r.push(wi(o.bead_id,i,(t.parallel_raw_length.get(i)??0)+a)),s.set(i,a+1)}}function js(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function $i(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function rl(e,t,n){let r=Us(n),s=[],o=[],i=[],a,l=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??l:void 0,p=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:vh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:wh};if(e.kind!=="chain"&&typeof l=="string"&&l!==t.lane_id&&n.cross_lanes.has(l))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${nl(n,l)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:es}}if(e.kind==="chain"&&p===void 0)return{refused:es};let g=()=>{if(p===void 0||p.status!=="confirmed")return;let k=p.entries.findIndex(K=>K.bead_id===e.bead_id);if(k<0)return;let L=k>0?p.entries[k-1]:null,B=k+1<p.entries.length?p.entries[k+1]:null,Y=Fs(p,k),le=B!==null&&Fs(p,k+1);Y&&L!==null&&r.removeDep(e.bead_id,L.bead_id),le&&B!==null&&r.removeDep(B.bead_id,e.bead_id),(Y||le)&&L!==null&&B!==null&&r.addDep(B.bead_id,L.bead_id,u)},y=(k,L)=>{let B=n.cross_lanes.get(k),Y=B.entries.findIndex(H=>H.bead_id===e.bead_id),le=B.entries.filter(H=>H.bead_id!==e.bead_id),K=Math.max(0,Math.min(le.length,Y>=0&&L>Y?L-1:L)),M=-1;if(le.forEach((H,ee)=>{n.fixed_members.has(H.bead_id)&&(M=ee)}),K<=M){r.state.refusal=kh;return}let R=Y>=0?B.entries[Y]:p?.entries.find(H=>H.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};a=Bs({status:B.status,entries:[...le.slice(0,K),R,...le.slice(K)]},n);let F=a.entries;if($i(F,B.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:k,entries:js(F)}}),B.status!=="confirmed")return;let X=F.findIndex(H=>H.bead_id===e.bead_id),V=X>0?F[X-1].bead_id:null,ge=X+1<F.length?F[X+1].bead_id:null;if(V===null){ge!==null&&r.addDep(ge,e.bead_id,k);return}if(r.addDep(e.bead_id,V,k),ge!==null&&(r.graph.get(ge)||[]).includes(V)){let H=B.entries.findIndex(ee=>ee.bead_id===ge);(r.laneCreated(ge,V)||H>0&&B.entries[H-1].bead_id===V&&Fs(B,H))&&r.removeDep(ge,V),r.addDep(ge,e.bead_id,k)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(g(),p!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...Xd(n,p,u,p.entries.filter(k=>k.bead_id===e.bead_id))),s.push({type:"monitor-lane-update",payload:{lane_id:u,entries:js(p.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&y(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=Ch(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(wi(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let L=n.parallel_rows,B=L[Math.max(0,Math.min(L.length,t.marker_index))];if(!(!!B&&B.bead_id===e.bead_id)&&Rh(n,e.root_dir)&&b!==void 0){let le=b>k?k:k-1;le>=0&&le!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:le},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&o.push(wi(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let k=b>t.index?t.index:t.index-1;k>=0&&k!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else o.push(wi(e.bead_id,e.root_dir,t.index,t.lane_id));return Ws(r,n,s,o,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:a}:{}})}function ep(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:es};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Bs(n,t);if(r.held)return{refused:ki};let s=r.entries,o=Us(t),i=[];Qd(o,s,e),o.state.refusal===null&&Jd(o,t,s,i);let a=$i(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:js(s)}}];return a.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Ws(o,t,a,i,{lane_id:e,correction:r})}function tp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:es};let r=Bs(n,t),s=r.entries,o=Us(t),i=[];Qd(o,s,e),o.state.refusal===null&&Jd(o,t,s,i);let a=$i(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:js(s)}}];return Ws(o,t,a,i,{lane_id:e,correction:r})}function np(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:es};let r=Bs(n,t),s=r.entries;return Ws(Us(t),t,$i(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:js(s)}}],[],{lane_id:e,correction:r})}function rp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:es};let r=Us(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)Fs(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return Ws(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Xd(t,n,e,n.entries)})}function sp(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let i=1;i<n.entries.length;i+=1){let a=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;Fs(n,i)?r.push(a):s.push(`${a} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let o=`\uC5F0\uACB0 ${nl(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${o}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[o,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function op(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function ip(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function sl(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${nl(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Oh="\uC0AC\uC774\uD074";function ap(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||s.includes(i.bead_id))continue;let a=tl(t.blocked_by_map,i.bead_id,e);o.push({...i,disabled:a,...a?{reason:Oh}:{}})}return o.sort((i,a)=>{let l=r!==void 0&&i.root_dir===r,u=r!==void 0&&a.root_dir===r;return l!==u?l?-1:1:i.bead_id.localeCompare(a.bead_id)}),o}function lp(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var cp={running:3,paused:2,failed:1};function Sr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function up(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function dp(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Sr(i)&&s.set(i.bead_id,i.attempt_id));let o=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Sr(i))continue;let a=null;if(i.status==="running")a="running";else if(i.status==="paused"&&!r.has(i.attempt_id))a="paused";else if(i.status==="failed"||i.status==="orphaned"){let p=t.get(i.bead_id),g=typeof p=="number"&&p>0&&typeof i.finished_at=="number"&&p>=i.finished_at;s.get(i.bead_id)===i.attempt_id&&!g&&typeof i.dismissed_at!="number"&&(a="failed")}if(!a)continue;let l=typeof i.started_at=="number"?i.started_at:null,u=o.get(i.bead_id);if(u){let p=cp[u.run_state],g=cp[a];if(p>g||p===g&&(u.started_at??0)>(l??0))continue}o.set(i.bead_id,{attempt:i,run_state:a,started_at:l})}return{winners:o,resumed_from_ids:r}}var pp=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],zs=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function xi(e,t){let n=pp.find(s=>s.step===e);if(!n)return null;let r=pp.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function fp(e){let t=zs.findIndex(n=>n.step===e);return zs.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Er(e){let t=zs.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Lh(e){let t=zs.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:zs.length}}function Ai(e){let t=Lh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var il=new Set(["queued","running","retry_pending"]),_p=new Set(["failed","succeeded"]),Ih={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Hs={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Ph={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Hs.base_containment,child_sweep:Hs.child_sweep,branch_cleanup:Hs.branch_cleanup,parent_close:Hs.parent_close};function Dh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Mh(e,t,n){return!["verify","deploy"].includes(e.kind)||![...il,..._p].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Nh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(o!==i)return i-o;let a=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return a.localeCompare(l)}function ol(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Ih[s];if(!o)return null;let i=xi(n,`${r} ${o}`);return i?{...i,active:il.has(s),failed:s==="failed"}:null}function qh(e){return!e||typeof e!="object"?null:Ph[e.step]||null}function Gs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=qh(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),a=Dh(e.merge_sha)?e.merge_sha:null,l=!o&&a&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&Mh(k,t,a)).sort(Nh):[],u=i?l:[],p=u.find(k=>il.has(k.state));if(p)return ol(p);if(s)return s.step==="repo_operations"&&l[0]?ol(l[0],!0):null;let g=u.find(k=>_p.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(g)return ol(g);if(r){let k=xi(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let y=typeof e.cleanup_cursor=="string"?Hs[e.cleanup_cursor]:null;if(!y)return null;let b=xi(y.step,y.label);return b?{...b,active:!0,failed:!1}:null}function Si(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Fh="\uBBF8\uC801\uC7AC";function al(e,t){let n=Ao(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function mp(e,t,n={}){let r=new Map,s=new Map;for(let o of t)s.has(o.id)||s.set(o.id,o.location_label);for(let[o,i]of e){if(typeof o!="string"||o.length===0)continue;let a=[];for(let l of Array.isArray(i)?i:[]){if(typeof l!="string"||l.length===0)continue;let u=al(o,{id:l,location_label:s.get(l)||Fh}),p=n[l];u.foreign!==!0?u.openable=!0:typeof p=="string"&&p.length>0&&(u.openable=!0,u.root_dir=p),a.push(u)}a.length>0&&r.set(o,a)}return r}function ll(e,t){return`${e}\0${t}`}function gp(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function cl(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Ks(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function bp(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${Ks(s)})`,location_label:Ks(s),scope:null,same_lane_ahead:!1};let i=cl(e,r),a=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${a})`,location_label:a,scope:i,same_lane_ahead:!1}}function hp(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let a of t)for(let l of Array.isArray(a.sublanes?.serial)?a.sublanes.serial:[]){let u=ll(a.root_dir,l.id);n.set(u,{root_dir:a.root_dir,workspace_name:a.name,lane:l.id}),s.set(u,[]);for(let p of Array.isArray(l.items)?l.items:[])r.set(p.id,u)}for(let a of t)for(let l of Array.isArray(a.sublanes?.serial)?a.sublanes.serial:[]){let u=ll(a.root_dir,l.id),p=Array.isArray(l.items)?l.items[0]:null,y=!!p&&p.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],b=s.get(u);if(b)for(let k of y){let L=r.get(k);L&&L!==u&&!b.includes(L)&&b.push(L)}}let o=(a,l)=>{let u=new Set,p=[a];for(;p.length>0;){let g=p.pop();if(g===l)return!0;!g||u.has(g)||(u.add(g),p.push(...s.get(g)||[]))}return!1},i=new Map;for(let[a,l]of s){let u=[];for(let p of l){let g=n.get(p);o(p,a)&&g&&u.push(g)}u.length>0&&i.set(a,u)}return i}function yp(e,t){return ll(e,t)}var vp=1,Vs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],dl=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ts={show_blocked:!0,spec:"all"},wp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function jh(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Sr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Bh(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Sr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Uh(e,t){let{winners:n,resumed_from_ids:r}=dp(e,t),s=new Map;for(let[o,i]of n){let a=i.attempt,l=i.run_state,u=i.started_at,p=typeof a.session_id=="string"&&a.session_id.length>0;s.set(o,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,last_activity:a.last_activity&&typeof a.last_activity=="object"?a.last_activity:null,legs:Array.isArray(a.legs)?a.legs:[],runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,status:typeof a.status=="string"?a.status:null,usage:Sn(e,a.bead_id),can_pause:l==="running"&&p,can_resume:l!=="running"&&p&&!r.has(a.attempt_id)})}return s}function kp(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Nt(e){return e&&typeof e=="object"?e:{}}function Wh(e,t,n){let r=Nt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,i=e.session_defaults;if(!s||!o||!i)return null;let a=y=>bn({pin:y,global:i,execution_defaults:s,runner_catalog:o,route:n}),l,u;try{l=a(r),u=a(null)}catch{return null}let p=$p(Ar(l,o),Ar(u,o)),g=$p(cr(l,null),cr(u,null));return p||g?{orchestration:p,worker:g}:null}function $p(e,t){return!e||t&&t.text===e.text?null:e}function xp(e,t){let n=cl(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function zh(e,t,n){let r=t.get(e);if(!r)return xp(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Ks(r)}function Hh(e,t,n,r){let s=t.get(e);if(!s)return{label:xp(e,n),title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let i=r.get(e),a=s.lane==="parallel"?"\uBCD1\uB82C":s.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${a} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Ks(s),title:""}}function Gh(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Kh(e,t,n,r,s,o){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>o.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:o.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>o.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:s.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Vh(e,t,n,r,s,o,i){let a=[];return e.forEach((l,u)=>{let p=typeof l.id=="string"?l.id:"";if(p.length===0)return;let g=l.status==="confirmed"?"confirmed":"draft",y=Array.isArray(l.entries)?l.entries:[],b=[];y.forEach((Y,le)=>{let K=Y&&typeof Y.bead_id=="string"?Y.bead_id:"";if(K.length===0)return;let M=Y&&typeof Y.root_dir=="string"?Y.root_dir:"",R=n.get(K),F=R?R.state:void 0,X=F==="running"||F==="pr_wait"||F==="done",V=!R||F==="runnable",ge=R&&R.lane==="parallel"&&typeof R.position=="number"?R.position-1:null,H=Hh(K,n,r,t),ee=b.length>0?b[b.length-1].id:null,oe=g==="confirmed"&&ee!==null&&!(t.get(K)||[]).includes(ee);b.push({id:K,title:s.get(K)||K,root_dir:R?R.root_dir:M,workspace_name:R?R.workspace_name:o.get(M)||"",seq:le+1,location_label:H.label,location_title:H.title,draggable:!X,fixed:X,done:F==="done",unplaced:V,mismatch:oe,...ge!==null?{queue_index:ge}:{}})}),b.forEach((Y,le)=>{Y.seq=le+1});let k=b.length>0&&b.every(Y=>Y.done),L=b.filter(Y=>!Y.fixed&&i.armed_by_bead.get(Y.id)!==p).map(Y=>Y.id),B=Kh(p,g,b,k,L,i);a.push({lane_id:p,status:g,draft:g==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:k,can_confirm:g==="draft"&&b.length>=2,has_mismatch:g==="confirmed"&&b.some(Y=>Y.mismatch||Y.unplaced),unlaunched:L,...B})}),a}function Yh(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Zh(e,t,n,r,s){let o=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let u=`${l.root_dir}\0${l.id}`,p=o.get(u);if(p){p.cards.push(l);continue}let{scope:g,state:y}=Yh(l,t,n);y!==void 0&&(l.scope_state=y),o.set(u,{cards:[l],scope:g})}let i=new Map;for(let l of o.values()){let u=l.cards[0].scope_state;if(u!==void 0)for(let y of l.cards)y.scope_state=u;if(l.scope.length===0)continue;let p=l.cards[0].root_dir,g=i.get(p);g?g.push(l):i.set(p,[l])}let a=(l,u,p)=>{let g=u.cards[0],y={id:g.id,title:g.title,location_label:zh(g.id,r,s),prefixes:p};for(let b of l.cards)b.overlap_chips?b.overlap_chips.push(y):b.overlap_chips=[y]};for(let l of i.values())for(let u=0;u<l.length;u+=1)for(let p=u+1;p<l.length;p+=1){let g=bi(l[u].scope,l[p].scope);g.length!==0&&(a(l[u],l[p],g),a(l[p],l[u],g))}}function ul(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ei(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function pl(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...ts,...n&&n.candidate_filter?n.candidate_filter:{}},a=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&Vs.some(E=>E.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let E of s)E&&typeof E.root_dir=="string"&&u.set(E.root_dir,E);let p=new Map;for(let E of s)E&&typeof E.root_dir=="string"&&p.set(E.root_dir,E.name||E.root_dir);for(let E of r)E&&typeof E.root_dir=="string"&&p.set(E.root_dir,E.name||E.root_dir);let g=[],y=[],b=[],k=[],L=[],B=[],Y=new Map,le=new Map,K=new Map,M=new Map,R=new Map,F=new Map,X=new Map,V=new Set,ge=new Map,H=new Map,ee=new Map;for(let E of r){if(!E||typeof E.root_dir!="string")continue;let ie=E.root_dir,Te=E.name||ie,Ie=u.get(ie),Ye=Ie&&typeof Ie.revision=="number"?Ie.revision:typeof E.revision=="number"?E.revision:0,tt=Nt(E.attempts),Je=Nt(E.bead_titles);for(let[O,N]of Object.entries(Je))typeof N=="string"&&N.length>0&&ee.set(O,N);let dt=Nt(E.bead_times),re=Nt(E.pr_observations),G=Nt(E.admission),he=Nt(E.revise_parked),it=Nt(E.merge_queue_state),Xe=Nt(E.cleanup_failed),Ce=Nt(E.discard_operations),Ne=Nt(E.bead_blocked_by);Object.hasOwn(E,"bead_scope")&&ge.set(ie,Nt(E.bead_scope));let at=Nt(E.bead_workflow),pt=Nt(E.pr_activity),lt=Array.isArray(E.repo_operations)?E.repo_operations:[],$t=Array.isArray(E.merge_queue)?E.merge_queue:[],Kt=new Set($t.filter(O=>O&&typeof O.bead_id=="string").map(O=>O.bead_id)),Bt=new Map($t.filter(O=>O&&typeof O.bead_id=="string").map(O=>[O.bead_id,O])),Ut=Array.isArray(E.queue)?E.queue:[];for(let O of[...Ut,...Array.isArray(E.pr_wait)?E.pr_wait:[]])O&&typeof O.bead_id=="string"&&typeof O.armed_by_lane=="string"&&O.armed_by_lane.length>0&&F.set(O.bead_id,O.armed_by_lane);for(let O of Array.isArray(E.disarmed_on_load)?E.disarmed_on_load:[])typeof O=="string"&&O.length>0&&V.add(O);let It=(Array.isArray(E.serial_lanes)?E.serial_lanes:[]).filter(O=>O&&/^s[1-5]$/.test(O.id)&&Array.isArray(O.entries)),yt=Nt(E.lane_states),He=typeof E.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(E.serial_lane_count))):Math.min(5,It.length);K.set(ie,He),M.set(ie,Ut.length);let C=new Map(It.map(O=>[O.id,O])),Q=new Map;for(let O of It)for(let N of O.entries)N&&typeof N.bead_id=="string"&&Q.set(N.bead_id,O.id);for(let[O,N]of Object.entries(Ne))Array.isArray(N)&&R.set(O,N.filter(be=>typeof be=="string"&&be.length>0));let fe=Array.isArray(E.done)?E.done:[];for(let O of fe)O&&typeof O.bead_id=="string"&&B.push({id:O.bead_id,root_dir:ie,workspace_name:Te});let T=new Map;for(let O of fe)O&&typeof O.bead_id=="string"&&typeof O.added_at=="number"&&T.set(O.bead_id,O.added_at);let W=O=>({id:O,title:Je[O]||O,root_dir:ie,workspace_name:Te,expected_revision:Ye,draggable:!1,...Nt(dt[O]).created_at?{created_at:Nt(dt[O]).created_at}:{},...Nt(dt[O]).updated_at?{updated_at:Nt(dt[O]).updated_at}:{}}),Re=O=>{let N=at[O]?.chips?.pr;return N&&typeof N.number=="number"&&typeof N.url=="string"?{pr_number:N.number,pr_url:N.url}:{}},qe=O=>Object.hasOwn(Ne,O)?{blocked_by:Array.isArray(Ne[O])?Ne[O].filter(N=>typeof N=="string"&&N.length>0):[]}:{},xe=new Set;for(let[O,N]of Uh(tt,T)){xe.add(O);let be=N.run_state==="failed"?Gh(tt,N.attempt_id):null;be!==null&&X.set(O,be),y.push({...W(O),lane:"running",...qe(O),...Q.has(O)?{serial_lane_id:Q.get(O)}:{},attempt_id:N.attempt_id,run_state:N.run_state,status:N.status||void 0,workflow:at[O]||null,can_pause:N.can_pause,can_resume:N.can_resume,started_at:N.started_at,last_event_at:N.last_event_at,last_activity:N.last_activity,legs:N.legs,runner:N.runner,model:N.model,effort:N.effort,speed:N.speed,resumed_from:N.resumed_from,continuation_mode:N.continuation_mode,usage:N.usage,exec_chips:{orchestration:Ns(N),worker:null},discard:qn(Ce,O,{attempt_id:N.attempt_id}),badges:N.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:N.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:N.run_state==="failed"})}for(let[O,N]of up(tt)){if(y.some(ve=>ve.id===O))continue;let be=N.attempt,ze=N.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";y.push({...W(O),lane:"running",kind:"session",...qe(O),attempt_id:typeof be.attempt_id=="string"?be.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:at[O]||null,can_pause:!1,can_resume:!1,started_at:N.started_at,last_event_at:typeof be.last_event_at=="number"?be.last_event_at:null,last_activity:be.last_activity&&typeof be.last_activity=="object"?be.last_activity:null,legs:Array.isArray(be.legs)?be.legs:[],runner:typeof be.runner=="string"?be.runner:null,model:typeof be.model=="string"?be.model:null,effort:typeof be.effort=="string"?be.effort:null,speed:typeof be.speed=="string"?be.speed:null,resumed_from:null,continuation_mode:null,usage:be.usage&&typeof be.usage=="object"?be.usage:null,exec_chips:{orchestration:Ns(be),worker:null},discard:qn(Ce,O,{merge_queued:!0}),badges:[N.origin==="auto"?`${ze} \xB7 \uC790\uB3D9`:ze],alert:!1})}for(let O of Array.isArray(E.session_active)?E.session_active:[]){let N=O&&O.bead_id;typeof N!="string"||xe.has(N)||(xe.add(N),Array.isArray(O.blocked_by)&&O.blocked_by.length>0&&R.set(N,O.blocked_by.filter(be=>typeof be=="string"&&be.length>0)),typeof O.title=="string"&&O.title.length>0&&ee.set(N,O.title),y.push({...W(N),title:O.title||Je[N]||N,lane:"running",kind:"session",status:"in_progress",started_at:ul(O.started_at)??ul(O.updated_at)??void 0,updated_at:ul(O.updated_at)??void 0,workflow:O.workflow||null,labels:Array.isArray(O.labels)?O.labels:[],spec_id:typeof O.spec_id=="string"?O.spec_id:"",blocked:O.blocked===!0,...Array.isArray(O.blocked_by)?{blocked_by:O.blocked_by.filter(be=>typeof be=="string"&&be.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(O.session_refs)?O.session_refs:[],badges:[],alert:!1}))}for(let O of Array.isArray(E.pr_wait)?E.pr_wait:[]){let N=O&&O.bead_id;if(typeof N!="string"||xe.has(N))continue;xe.add(N);let be=Nt(re[N]),ze=Nt(be.pr),ve=be.gate?Nt(be.gate):null,Ge=Kt.has(N),vt=Bt.get(N)?.continuation_action||null,ft=!!vt&&vt.continuation===null,Et=it.active===N,Wt=O.external===!0,Me=Xe[N]||null,pn=Nt(pt[N]),xt=Gs({bead_id:N,merge_sha:O.merge_sha,cleanup_cursor:O.cleanup_cursor,merge_progress:pn.merge_progress||null,cleanup_failed:Me,repo_operations:lt}),Zt=Si(xt),en=!!ve&&ve.base_badge==="\uCDA9\uB3CC",Qt=!!Me&&["child_sweep","branch_cleanup","parent_close"].includes(Me.step)&&!!ve&&ve.tier==="merged",rt=Wt&&!!Me&&!!ve&&ve.tier==="merged",Xt=!!ve&&["closed_unmerged","review","undecidable"].includes(ve.tier)&&ve.reason!=="review_receipt_undetermined",Ee=qn(Ce,N,{external:Wt,merge_active:Et||xt?.step==="merge",merge_queued:Ge,cleanup_active:Zt,merged:!!Me||ve?.tier==="merged"}),A=!!Ee.operation;b.push({...W(N),lane:"pr_wait",...qe(N),workflow:at[N]||null,pr_number:typeof ze.number=="number"?ze.number:null,pr_url:typeof ze.url=="string"?ze.url:void 0,external:Wt,usage:Sn(tt,N),merge_step:xt,badges:ft?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:xt?[ve?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Me?[Er(Me.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Er(Me.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ve?.gate_badge=="string"&&ve.gate_badge.length>0?[ve.gate_badge]:[],alert:xt?xt.failed===!0:!!Me||Xt,reason:Me&&xt?.active!==!0?Ai(Me.step):"PR \uB300\uAE30",merge_action:ve?.tier==="merged"&&!Qt&&!rt?!1:!Ge||ft,merge_enabled:!A&&(ft||ve?.enabled===!0||en||Qt||rt),merge_label:ft?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":rt||Qt?"\uC815\uB9AC \uC7AC\uAC1C":en&&!Qt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ft?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":A?Ee.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ee.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ee.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:rt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Qt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":en?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ve?.enabled===!0?`\uBA38\uC9C0 (${ve.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ve?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Ge&&!ft,cancel_enabled:!Et,continuation_mismatch:vt?.mismatch||null,discard:Ee,discard_action:Ee.action,discard_enabled:Ee.enabled,discard_title:Ee.title})}let Ze=(O,N,be,ze)=>{let ve=O&&O.bead_id;if(typeof ve!="string"||xe.has(ve))return null;xe.add(ve);let Ge=he[ve],vt=qn(Ce,ve),ft=vt.operation?vt:null,Et={...W(ve),lane:N,workflow:at[ve]||null,draggable:!ft,discard:ft||void 0,reason:kp(G,ve),seq:be+1,queue_position:be+1,queue_index:be,queue_length:ze,badges:Ge?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ge,revise_action:!!Ge,revise_enabled:!!Ge&&!ft,revise_title:Ge?Ge.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ge.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Wt=qe(ve);return Object.hasOwn(Wt,"blocked_by")&&(Et.blocked_by=Wt.blocked_by),Et};for(let O=0;O<Ut.length;O++){let N=Ze(Ut[O],"queue",O,Ut.length);if(!N)continue;k.push(N);let be=Y.get(ie);be?be.push(N):Y.set(ie,[N])}let ct=O=>{let N=b.find(Ge=>Ge.id===O&&Ge.root_dir===ie);if(N)return{id:O,title:N.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let be=y.find(Ge=>Ge.id===O&&Ge.root_dir===ie),ze=be?be.run_state:jh(tt,O),ve=ze==="failed"||ze==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ze==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:O,title:be?be.title:W(O).title,badge:ve}},We=[];for(let O=0;O<Math.max(He,It.length);O++){let N=`s${O+1}`,be=C.get(N),ze=be&&Array.isArray(be.entries)?be.entries:[],ve=Nt(yt[N]),Ge=Array.isArray(ve.occupied_by)?ve.occupied_by.filter(Et=>typeof Et=="string"):[],vt=new Set(Ge),ft=[];for(let Et=0;Et<ze.length;Et++){let Wt=ze[Et]&&ze[Et].bead_id;if(typeof Wt=="string"&&vt.has(Wt)){xe.add(Wt);continue}let Me=Ze(ze[Et],N,Et,ze.length);Me&&(ft.push(Me),k.push(Me))}ft.length===0&&Ge.length===0&&(He<=1||O>=He)||We.push({id:N,index:O,items:ft,raw_length:ze.length,occupied_by:Ge,occupants:Ge.map(Et=>ct(Et)),corrections:Array.isArray(ve.corrections)?ve.corrections.length:0,cycle:ve.cycle===!0,...ft.length===0&&Ge.length===0?{empty:!0}:{}})}le.set(ie,We);let Ae=Array.from({length:He},(O,N)=>{let be=`s${N+1}`,ze=C.get(be),ve=ze&&Array.isArray(ze.entries)?ze.entries:[],Ge=Nt(yt[be]);return{id:be,index:ve.length,length:ve.length,occupied_by:Array.isArray(Ge.occupied_by)?Ge.occupied_by.filter(vt=>typeof vt=="string"):[]}});for(let O of Array.isArray(E.runnable)?E.runnable:[]){let N=O&&O.bead_id;if(typeof N!="string"||xe.has(N))continue;xe.add(N);let be=O.workflow&&typeof O.workflow=="object"?O.workflow:null,ze=be&&typeof be.route=="string"&&be.route||(typeof O.route=="string"?O.route:null),ve=Wh(Nt(Ie),O.exec_pins,ze);Array.isArray(O.blocked_by)&&O.blocked_by.length>0&&R.set(N,O.blocked_by.filter(Ge=>typeof Ge=="string"&&Ge.length>0)),typeof O.title=="string"&&O.title.length>0&&ee.set(N,O.title),Array.isArray(O.scope)&&H.set(N,O.scope.filter(Ge=>typeof Ge=="string"&&Ge.length>0)),g.push({...W(N),title:O.title||Je[N]||N,lane:"runnable",draggable:!0,reason:kp(G,N),created_at:O.created_at??void 0,updated_at:O.updated_at??void 0,status:typeof O.status=="string"?O.status:void 0,labels:Array.isArray(O.labels)?O.labels:[],spec_id:typeof O.spec_id=="string"?O.spec_id:"",published:O.published===!0,workflow:be||(ze?{route:ze,chips:{route:ze}}:null),...ve?{exec_chips:ve}:{},blocked:O.blocked===!0,...Array.isArray(O.blocked_by)?{blocked_by:O.blocked_by.filter(Ge=>typeof Ge=="string"&&Ge.length>0)}:{},place_index:Ut.length,place_lanes:Ae})}for(let O of fe){let N=O&&O.bead_id;if(typeof N!="string"||xe.has(N)||(xe.add(N),o!==void 0&&typeof O.added_at=="number"&&O.added_at<o))continue;let be=Bh(tt,N),ze=be&&typeof be.done_kind=="string"?be.done_kind:null;L.push({...W(N),lane:"done",done:!0,done_layout:"three_line",usage:Sn(tt,N),work_ms:ci(tt,N),done_at:typeof O.added_at=="number"?O.added_at:void 0,done_kind:ze,...Re(N),badges:[...ze&&wp[ze]?[wp[ze]]:[],...li(tt,N)]})}}let oe=new Map;s.forEach((E,ie)=>{E&&typeof E.root_dir=="string"&&oe.set(E.root_dir,ie)});let te=n&&n.running_sort==="repo"?"repo":"started";y.sort((E,ie)=>{let Te=E.kind==="session",Ie=ie.kind==="session";if(Te!==Ie)return Te?1:-1;if(Te&&Ie){let Je=Ei(ie.updated_at)-Ei(E.updated_at);return Je!==0?Je:E.id.localeCompare(ie.id)}if(te==="repo"){let Je=oe.get(E.root_dir)??Number.MAX_SAFE_INTEGER,dt=oe.get(ie.root_dir)??Number.MAX_SAFE_INTEGER;if(Je!==dt)return Je-dt}let Ye=typeof E.started_at=="number"&&Number.isFinite(E.started_at)?E.started_at:null,tt=typeof ie.started_at=="number"&&Number.isFinite(ie.started_at)?ie.started_at:null;return Ye!==null&&tt!==null&&Ye!==tt?Ye-tt:Ye===null&&tt!==null?1:Ye!==null&&tt===null?-1:E.id.localeCompare(ie.id)}),L.sort((E,ie)=>(ie.done_at??0)-(E.done_at??0));let we=s.length>0?s:r.map(E=>({root_dir:E&&E.root_dir,name:E&&E.name,auto_advance:E&&E.auto_advance,auto_merge:E&&E.auto_merge,slots:E&&E.slots,revision:E&&E.revision,runner_catalog:E&&E.runner_catalog})),Pe=new Set(g.map(E=>E.root_dir)),ye=[];for(let E of we){if(!E||typeof E.root_dir!="string")continue;let ie=Y.get(E.root_dir)||[],Te=le.get(E.root_dir)||[];!(ie.length>0||Te.some(Ye=>Ye.items.length>0||Ye.occupied_by.length>0))&&!Pe.has(E.root_dir)||ye.push({root_dir:E.root_dir,name:E.name||E.root_dir,auto_advance:E.auto_advance===!0,auto_merge:E.auto_merge===!0,slots:typeof E.slots=="number"&&E.slots>=vp?E.slots:vp,revision:typeof E.revision=="number"?E.revision:0,runner_catalog:Nt(E.runner_catalog),items:ie,sublanes:{parallel:ie,serial:Te},serial_lane_count:K.get(E.root_dir)||0,raw_queue_length:M.get(E.root_dir)||0})}let J={runnable:g,runnable_all:g,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:k,queue_groups:ye,running:y,pr_wait:b,done:L,parallel_rows:[],chain_lanes:[],cross_lanes_revision:a&&typeof a.revision=="number"?a.revision:null,cross_lanes_unreadable:a===null,parallel_raw_length:Object.fromEntries(M),owner_of:{}},Z=gp(J);for(let E of B)Z.has(E.id)||Z.set(E.id,{root_dir:E.root_dir,workspace_name:E.workspace_name,lane:"done",state:"done"});for(let E of[...J.queue,...J.runnable,...J.running,...J.pr_wait]){if(!Object.hasOwn(E,"blocked_by"))continue;let ie=Z.get(E.id);E.blockers=(E.blocked_by||[]).map(Te=>bp(Te,ie,Z,s))}for(let E of[...J.queue,...J.runnable,...J.running,...J.pr_wait]){let ie=(E.blockers||[]).map(Ie=>({...al(E.id,Ie),openable:!0}));if(ie.length===0)continue;let Te={predecessors:ie};E.dependency_chips=Te}Zh(J,ge,H,Z,s);let ke=hp(J.queue_groups);for(let E of J.queue_groups)for(let ie of E.sublanes.serial){let Te=ke.get(yp(E.root_dir,ie.id));Te&&(ie.cross_wait_peers=Te)}J.chain_lanes=Vh(a&&Array.isArray(a.lanes)?a.lanes:[],R,Z,s,ee,p,{armed_by_bead:F,failed_by_bead:X,disarmed_lanes:V});let j=new Map;for(let E of[...J.queue,...J.runnable])j.has(E.id)||j.set(E.id,E);let se=new Set;for(let E of J.chain_lanes)for(let ie of E.rows){if(E.status==="confirmed"&&!ie.unplaced&&!ie.fixed&&se.add(ie.id),!E.draft&&!ie.unplaced)continue;let Te=j.get(ie.id);Te&&(Te.cross_lane_chip={lane_id:E.lane_id,number:E.number,status:E.status,label:E.draft?`\uC5F0\uACB0 ${E.number} (draft)`:`\uC5F0\uACB0 ${E.number}`})}let _e=new Map(J.chain_lanes.map(E=>[E.lane_id,E.number]));for(let E of[...J.queue,...J.running]){let ie=F.get(E.id);if(typeof ie!="string"||ie.length===0)continue;let Te=_e.get(ie);E.armed_lane_chip=Te===void 0?{lane_id:ie,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:ie,label:`\u25B6 \uC5F0\uACB0 ${Te}`,orphan:!1}}let $e=[];for(let E of Y.values())for(let ie of E)se.has(ie.id)||$e.push(ie);$e.sort((E,ie)=>{let Te=E.workspace_name.localeCompare(ie.workspace_name);return Te!==0?Te:(E.queue_index??0)-(ie.queue_index??0)}),J.parallel_rows=$e;let je={};for(let[E,ie]of Z)typeof ie.root_dir=="string"&&ie.root_dir.length>0&&(je[E]=ie.root_dir);for(let E of J.chain_lanes)for(let ie of E.rows)!Object.hasOwn(je,ie.id)&&ie.root_dir.length>0&&p.has(ie.root_dir)&&(je[ie.id]=ie.root_dir);J.owner_of=je;let ue=J.runnable.length;J.runnable_all=J.runnable.slice();let Le=J.runnable;i.show_blocked||(Le=Le.filter(E=>E.blocked!==!0));let St=Le.length;i.spec==="with"?Le=Le.filter(E=>E.published===!0):i.spec==="without"&&(Le=Le.filter(E=>E.published!==!0)),J.runnable_hidden={blocked:ue-St,spec:St-Le.length};let ht=(E,ie)=>{let Te=Ei(ie.updated_at)-Ei(E.updated_at);return Te!==0?Te:E.id.localeCompare(ie.id)},mt=l==="repo_spec"?(E,ie)=>{let Te=E.published===!0?0:1,Ie=ie.published===!0?0:1;return Te!==Ie?Te-Ie:ht(E,ie)}:ht;if(l==="updated_flat")J.runnable=Le.slice().sort(ht),J.runnable_sections=[];else{let E=new Map;for(let Ie of Le){let Ye=E.get(Ie.root_dir);Ye?Ye.push(Ie):E.set(Ie.root_dir,[Ie])}let ie=[],Te=[];for(let Ie of we){if(!Ie||typeof Ie.root_dir!="string")continue;let Ye=(E.get(Ie.root_dir)||[]).slice().sort(mt);E.delete(Ie.root_dir),Ye.length!==0&&(ie.push({root_dir:Ie.root_dir,name:Ie.name||Ie.root_dir,items:Ye.map(tt=>({...tt,workspace_name:""}))}),Te.push(...Ye))}for(let[Ie,Ye]of E){let tt=Ye.slice().sort(mt);ie.push({root_dir:Ie,name:tt[0]?.workspace_name||Ie,items:tt.map(Je=>({...Je,workspace_name:""}))}),Te.push(...tt)}J.runnable=Te,J.runnable_sections=ie}return J}var Ap="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",Qh=1e4;function Sp(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Ep(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Op="bdui.monitor.done-range",Lp="bdui.monitor.running_sort",Ip="bdui.monitor.candidate_sort",Pp="beads-ui.monitor.candidate-filter",Dp="beads-ui.monitor.sections";function Xh(){try{let e=window.localStorage.getItem(Pp);if(!e)return{...ts};let t=JSON.parse(e);return!t||typeof t!="object"?{...ts}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:ts.show_blocked,spec:dl.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...ts}}}function Tp(e){try{window.localStorage.setItem(Pp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Jh(){try{let e=window.localStorage.getItem(Ip);return Vs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function ey(e){try{window.localStorage.setItem(Ip,e)}catch{}}function ty(){try{let e=window.localStorage.getItem(Dp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Cp(e){try{window.localStorage.setItem(Dp,JSON.stringify(e))}catch{}}function ny(){try{let e=window.localStorage.getItem(Op);return e===null?"today":Bn(e)}catch{return"today"}}function ry(e){try{window.localStorage.setItem(Op,e)}catch{}}function sy(){try{return window.localStorage.getItem(Lp)==="repo"?"repo":"started"}catch{return"started"}}function oy(e){try{window.localStorage.setItem(Lp,e)}catch{}}var Mp="tab:monitor:pipeline",iy=1e3,ay=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Rp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function ly(e){return e>=1&&e<=Rp.length?Rp[e-1]:`(${e})`}function Np(e,t){let n=Ft("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,i=t.getWorkspacePath,a=t.openDoc,l=t.switchWorkspace,u=t.router,p=t.now||(()=>Date.now()),g=t.confirm||(f=>typeof globalThis.confirm!="function"||globalThis.confirm(f)),y=ny(),b=sy(),k=Xh(),L=Jh(),B=ty(),Y=null,le=null,K=null,M=null,R=[],F=null,X=null,V=null,ge=null;function H(f){return ge===null&&(ge=Qt()),Zd(f,ge)}function ee(f,m){oe(),!(m<=0)&&(X={lane_id:f,corrected:m},V=setTimeout(()=>{V=null,X=null,Ae()},Qh))}function oe(){V!==null&&(clearTimeout(V),V=null),X=null}function te(){let f=Pr.find(m=>m.value===y);return f?f.label:""}let we=document.createElement("div");we.className="mon",e.appendChild(we);let Pe=document.createElement("div");Pe.className="worker-drawer-overlay",Pe.hidden=!0;let ye=document.createElement("div");ye.className="worker-drawer-overlay__backdrop";let J=document.createElement("div");J.className="worker-drawer-host mon2-drawer",Pe.append(ye,J),e.appendChild(Pe);let Z=pl(null,null),ke=new Map,j=new Map,se=null,_e=null,$e=null,je=Vr(J,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{Y=null,Pe.hidden=!0,Ae()}});async function ue(f,m,v,w,q=!0){if(!o||!v)return null;let U=await o(f,{...m,root_dir:v,expected_revision:w});if(U&&U.conflict&&q){U.queue&&j.set(v,U.queue);let D=U.queue&&typeof U.queue.revision=="number"?U.queue.revision:w;U=await o(f,{...m,root_dir:v,expected_revision:D})}return U&&U.queue&&v&&j.set(v,U.queue),U}function Le(f,m){let v=j.get(f),w=s&&s.get?s.get():null,q=(Array.isArray(w)?w:[]).find(D=>D?.root_dir===f);return(v||q)?.merge_queue?.find(D=>D.bead_id===m)?.continuation_action}async function St(f,m,v,w){let q=await ue(f,m,v,w),U=j.get(v)?.revision??q?.queue?.revision??w;return Kn(q,(D,ne)=>ue(f,{...m,continuation:D,decision_token:ne},v,U,!1),{refresh:D=>ue(f,m,v,D?.queue?.revision??j.get(v)?.revision??U,!1)})}async function ht(f,m,v,w){let q=await Kn({continuation_mismatch:w},(D,ne)=>ue("worker-merge-queue-add",{bead_id:m,continuation:D,decision_token:ne},f,v,!1)),U=q?.queue?.merge_queue?.find(D=>D.bead_id===m)?.continuation_action;q?.applied!==!0&&U?.continuation===null&&U.mismatch&&await ht(f,m,q.queue.revision,U.mismatch)}async function ut(f,m,v){let w=await ue("worker-discard",f,m,v);if(w&&w.discarded===!0){pe(di(w),"success",5e3);return}if(w&&w.reason){pe(`\uD3D0\uAE30 \uC2E4\uD328: ${w.reason}`,"error");return}if(w&&w.accepted&&w.pending==="merged_revert"){pe("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(w&&w.accepted){pe(`\uD3D0\uAE30 \uC9C4\uD589: ${w.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}w&&!w.conflict&&pe("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function mt(f,m,v){return!o||!v?null:await o(f,{...m,root_dir:v})}async function E(){let f=new Map;for(let m of Z.pr_wait)f.has(m.root_dir)||f.set(m.root_dir,m.expected_revision);for(let[m,v]of f)await ue("worker-merge-queue-add-all",{},m,v)}function ie(f){let m=B[f];return!!(m&&m.runnable===!0)}function Te(f){let m={...B[f]||{}};m.runnable=!m.runnable,B={...B,[f]:m},Cp(B),Ae()}function Ie(f){return B[f]===!0}function Ye(f){B={...B,[f]:B[f]!==!0},Cp(B),Ae()}function tt(f){let m=Z.queue_groups.find(v=>v.root_dir===f);if(!m)return null;for(let v=0;v<m.serial_lane_count;v+=1){let w=`s${v+1}`,q=m.sublanes.serial.find(U=>U.id===w);if(!q||q.raw_length===0&&q.occupied_by.length===0)return w}return null}function Je(f,m){let v=Z.queue_groups.find(q=>q.root_dir===f),w=v?v.sublanes.serial.find(q=>q.id===m):void 0;return w?w.raw_length:0}function dt(f,m){let v=ke.get(f),w=ke.get(m);if(!v||!w)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let q=Sp(v),U=Sp(w);if(q!==null&&q===U&&v.root_dir===w.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let D=Ep(v),ne=Ep(w);if(D&&U!==null){let De=U;return{kind:"ops",title:`${De} \uB05D\uC5D0 ${f}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:f,lane:De,index:Je(w.root_dir,De)}]}}if(q!==null&&ne&&U===null){let De=q;return{kind:"ops",title:`${De} \uB05D\uC5D0 ${m}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:m,lane:De,index:Je(v.root_dir,De)}]}}if(D&&q===null&&ne&&U===null){let De=tt(v.root_dir);return De===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${De} \uB808\uC778\uC5D0 ${m} \u2192 ${f} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:m,lane:De,index:0},{bead_id:f,lane:De,index:1}]}}return!D&&!ne?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:D?{kind:"note",text:`${Ms(w.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Ms(v.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function re(f,m){let v=dt(f,m.id);return{id:m.id,title:m.title,location_label:m.location_label,prefixes:m.prefixes,action:v.kind==="note"?{kind:"note",text:v.text}:v.kind==="disabled"?{kind:"disabled",label:Ap,title:v.title}:{kind:"place",label:Ap,title:v.title}}}function G(f,m){if(!K||K.bead_id!==f)return null;let v=K.counterpart_id,w=m.filter(q=>q.id===v);return w.length===0?null:{rows:w.map(q=>re(f,q))}}function he(f){let m=f.dependency_chips||null,v=f.overlap_chips||[],w=f.scope_state==="missing",q=f.cross_lane_chip,U=f.armed_lane_chip;if(!m&&v.length===0&&!w&&!q&&!U)return null;let D=G(f.id,v);return{...m||{},...v.length>0?{overlaps:v}:{},...w?{scope_missing:!0}:{},...q?{cross_lane:{lane_id:q.lane_id,label:q.label}}:{},...U?{armed_lane:U}:{},...D?{popover:D}:{}}}function it(f){let m=he(f);return m?{...f,dependency_chips:m}:f}async function Xe(f,m){let v=dt(f,m);if(K=null,v.kind!=="ops"){Ae();return}let w=Xt(v.root_dir,v.ops[0].bead_id);for(let q of v.ops){let U=await Ce(q,v.root_dir,w);if(U===null)break;w=U}Ae()}async function Ce(f,m,v){try{let w=await ue("worker-queue-place",f,m,v,!1);if(w&&w.conflict)return pe("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!w||w.applied!==!0)return pe(w&&typeof w.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${w.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let q=w.queue?w.queue.revision:void 0;return typeof q!="number"?(pe("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):q}catch(w){return pe(ft(w),"error"),null}}function Ne(f){let m=ie(f.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${f.root_dir}
        data-section="runnable"
        aria-expanded=${m?"false":"true"}
        aria-label=${`${f.name} \uC139\uC158 ${m?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${m?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${f.root_dir}>${f.name}</span>
      <span class="mon2-sec__count">${f.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${f.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function at(f,m){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="candidate"
      data-root-dir=${f.root_dir}
    >
      ${m}
    </div>`}function pt(f){if(le!==f.id)return null;let m=Z.queue_groups.find(U=>U.root_dir===f.root_dir),v=f.place_lanes||[],w=Z.cross_lanes_revision!==null,q=[{id:"parallel",label:"\uBCD1\uB82C",count:f.place_index??0}];for(let U of Z.chain_lanes)q.push({id:`lane:${U.lane_id}`,label:`\uC5F0\uACB0 ${U.number} (${U.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:U.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!w});q.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!w,title:w?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let U of v)q.push({id:`serial:${U.id}`,label:`\uC9C1\uB82C ${Number(U.id.slice(1))}`,count:U.length,group:`${m?m.name:""} \uC9C1\uB82C`});return{bead_id:f.id,lanes:q}}function lt(){let f=[],m=new Set,v=(w,q)=>{for(let U of w)m.has(U.id)||(m.add(U.id),f.push({bead_id:U.id,root_dir:U.root_dir,workspace_name:U.workspace_name,title:U.title,lane:q}))};return v(Z.running,"running"),v(Z.pr_wait,"pr_wait"),v(Z.queue,"queue"),v(Z.runnable_all,"runnable"),f}function $t(f){if(!M||M.bead_id!==f)return"";let m=xt(),v=lt(),w=new Map;for(let ne of v)w.set(ne.bead_id,ne);let q=(m.get(f)||[]).filter(ne=>w.has(ne)),U=lp(ap(f,{issues:v,blocked_by_map:m}),M.query),D=Z.owner_of[f];return c`<div
      class="mon-deppanel"
      data-bead-id=${f}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__title">이 이슈를 막는 이슈</div>
      <div class="mon-deppanel__now">
        ${q.length===0?c`<span class="mon-deppanel__empty">막는 이슈 없음</span>`:""}
        ${q.map(ne=>c`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">⛓ ${ne}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${f}
                data-dep-b=${ne}
                aria-label=${`${ne} \uC5F0\uACB0 \uD574\uC81C`}
                title="연결 해제"
              >
                ✕
              </button></span
            >`)}
      </div>
      <input
        type="search"
        class="mon-deppanel__search"
        placeholder="ID·제목 검색"
        aria-label="의존 후보 검색"
        .value=${M.query}
      />
      <div class="mon-deppanel__list">
        ${U.length===0?c`<div class="mon-deppanel__empty">후보 없음</div>`:U.map(ne=>c`<button
                  type="button"
                  class="mon-deppanel__cand${ne.disabled?" is-disabled":""}"
                  data-dep-cand=${ne.bead_id}
                  ?disabled=${ne.disabled}
                  title=${ne.reason||ne.title}
                >
                  <span class="mon-deppanel__cand-repo"
                    >${ne.workspace_name}</span
                  ><span class="mon-deppanel__cand-id"
                    >${ne.bead_id}</span
                  ><span class="mon-deppanel__cand-title"
                    >${ne.title}</span
                  >${ne.reason?c`<span class="mon-deppanel__cand-reason"
                        >${ne.reason}</span
                      >`:""}
                </button>`)}
      </div>
      ${D===void 0?c`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function Kt(f){return at(f,c`${Ha(it(f),pt(f),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:a?(m,v)=>a(v,f.root_dir):void 0})}${$t(f.id)}`)}function Bt(){return Z.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${Z.runnable.map(f=>Kt(f))}
      </div>`:c`${Z.runnable_sections.map(f=>{let m=ie(f.root_dir);return c`<section
        class="mon2-sec${m?" is-collapsed":""}"
        data-root-dir=${f.root_dir}
        data-section="runnable"
      >
        ${Ne({root_dir:f.root_dir,name:f.name,count:f.items.length})}
        ${m?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${f.items.map(v=>Kt(v))}
            </div>`}
      </section>`})}`}function Ut(f,m){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="parallel"
      data-root-dir=${f.root_dir}
      data-row-index=${m}
      data-queue-index=${String(f.queue_index??0)}
    >
      ${ir(it(f))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon-dep__btn"
          data-bead-id=${f.id}
          title="의존성"
          aria-label="의존성"
        >
          ⛓
        </button>
        <button
          type="button"
          class="mon2-rowops__up"
          data-bead-id=${f.id}
          title="같은 레포 안에서 한 칸 위로"
          aria-label="한 칸 위로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon2-rowops__down"
          data-bead-id=${f.id}
          title="같은 레포 안에서 한 칸 아래로"
          aria-label="한 칸 아래로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon2-rowops__remove"
          data-bead-id=${f.id}
          title="대기에서 빼기"
          aria-label="대기에서 빼기"
        >
          ✕
        </button>
      </span>
      ${$t(f.id)}
    </div>`}function It(){let f=Ie("parallel");return c`<section
      class="mon2-area mon2-parallel${f?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="parallel"
          aria-expanded=${f?"false":"true"}
          aria-label=${`\uBCD1\uB82C \uC601\uC5ED ${f?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${f?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">병렬 영역</span>
        <span class="mon2-area__count">${Z.parallel_rows.length}</span>
      </header>
      ${f?"":c`<div class="mon2-area__body" data-drop="parallel">
            ${Z.parallel_rows.length===0?c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:Z.parallel_rows.map((m,v)=>Ut(m,v))}
          </div>`}
    </section>`}function yt(f,m,v,w){return c`<div
      class="mon2-crow${m.fixed?" mon2-crow--fixed":""}"
      draggable=${m.draggable?"true":"false"}
      data-bead-id=${m.id}
      data-drag-kind="chain"
      data-root-dir=${m.root_dir}
      data-lane-id=${f.lane_id}
      data-row-index=${v}
      data-queue-index=${typeof m.queue_index=="number"?String(m.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${ly(m.seq)}</span
      >
      ${m.workspace_name?c`<span class="worker-mini__repo" title=${m.root_dir}
            >${m.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${m.id}</span>
      <span class="mon2-crow__title">${m.title}</span>
      ${m.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${w.includes(m.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${m.location_title}
        >${m.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${m.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function He(f){let m=Z.cross_lanes_revision!==null,v=H(f.lane_id),w=v?.held===!0,q=v?.cycle===!0,U=v?v.mismatched:[],D=X&&X.lane_id===f.lane_id?X.corrected:0;return c`<div class="mon2-clane" data-lane-id=${f.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${f.label}</span>
        <span class="mon2-clane__count">${f.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${f.state}"
          >${f.badge}</span
        >
        ${D>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${D}건 자동 교정</span
            >`:""}
        ${q?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${w?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${ki}</span
            >`:""}
        ${f.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${f.lane_id}
              ?disabled=${!m||!f.can_confirm||w}
              title=${w?ki:f.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${f.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${f.lane_id}
              ?disabled=${!m}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${f.run_label}
            </button>`:""}
        ${f.state==="confirmed"&&f.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${f.lane_id}
              ?disabled=${!m}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${f.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${f.lane_id}
              ?disabled=${!m}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${f.lane_id}
          ?disabled=${!m}
          title=${f.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${f.lane_id}
      >
        ${f.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:f.rows.map((ne,De)=>yt(f,ne,De,U))}
      </div>
    </div>`}function C(f,m,v){return c`<div
      class="mon2-item"
      data-bead-id=${m.id}
      data-drag-kind="repo-serial"
      data-root-dir=${m.root_dir}
      data-lane-id=${f.id}
      data-row-index=${v}
      data-queue-index=${String(m.queue_index??0)}
    >
      ${ir(it(m))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon-dep__btn"
          data-bead-id=${m.id}
          title="의존성"
          aria-label="의존성"
        >
          ⛓
        </button>
      </span>
      ${$t(m.id)}
    </div>`}function Q(f){if(f.length===0)return"";let m=f.length-1;return`${f[0].id} \uC810\uC720${m>0?` +${m}`:""}`}function fe(f){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${f.id}
    >
      ${ir({id:f.id,title:f.title,lane:"running",draggable:!1,ghost:!0,badges:[f.badge]})}
    </div>`}function T(f,m){return c`<div
      class="mon2-lane${m.empty?" mon2-lane--empty":""}"
      data-root-dir=${f.root_dir}
      data-lane-length=${String(m.raw_length)}
    >
      ${Tn({id:"",lane:m.id,title:`${f.name} \xB7 \uC9C1\uB82C ${m.index+1}`,items:m.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:c`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${f.root_dir}
          data-lane-id=${m.id}
          data-lane-length=${String(m.raw_length)}
        >
          ${m.occupants.map(v=>fe(v))}
          ${m.items.length>0?m.items.map((v,w)=>C(m,v,w)):m.occupants.length>0?"":c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:c`<span
            class="mon2-lane__badge${m.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${m.occupants.length>0?m.occupants.map(v=>`${v.id} \u2014 ${v.badge}`).join(`
`):""}
            >${Q(m.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${f.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${m.empty?c`<div class="mon2-lane__hint">
            ${f.name} 직렬 ${m.index+1} 비어 있음
          </div>`:""}
      ${m.cycle?c`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(m.cross_wait_peers||[]).map(v=>c`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${v.workspace_name}·${v.lane}과 교차 대기
          </div>`)}
    </div>`}function W(){let f=Ie("serial"),m=Z.cross_lanes_revision!==null,v=Z.chain_lanes.some(w=>w.draft&&w.rows.length===0);return c`<section
      class="mon2-area mon2-serial${f?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="serial"
          aria-expanded=${f?"false":"true"}
          aria-label=${`\uC9C1\uB82C \uC601\uC5ED ${f?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${f?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">직렬 영역</span>
        <button
          type="button"
          class="mon2-newlane"
          ?disabled=${v||!m}
          title=${m?v?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${f?"":c`<div class="mon2-area__body">
            ${Z.cross_lanes_unreadable?c`<div class="mon2-clane__unreadable">
                  연결 레인 저장소를 읽을 수 없음
                </div>`:""}
            ${Z.chain_lanes.map(w=>He(w))}
            ${Z.queue_groups.map(w=>w.sublanes.serial.map(q=>T(w,q)))}
          </div>`}
    </section>`}function Re(){return c`<div class="mon2-wait">${It()}${W()}</div>`}function qe(f){return c`<div class="worker-rungrid">
      ${Z.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:Z.running.map(m=>Za({bead_id:m.id,attempt_id:m.attempt_id||"",title:m.title,runner:m.runner??null,model:m.model??null,effort:m.effort??null,speed:m.speed??null,started_at:m.started_at??null,kind:m.kind,...m.kind==="session"?{updated_at:m.updated_at,session_refs:m.session_refs||[]}:{},workflow:m.workflow||null,resumed_from:m.resumed_from??null,continuation_mode:m.continuation_mode??null,paused:m.run_state==="paused",failed:m.run_state==="failed",status:m.status,status_label:m.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:m.can_resume!==!1,can_pause:m.can_pause!==!1,exec_chips:m.exec_chips||null,usage:m.usage||null,discard:m.discard},f,Y,{monitor:{repo:m.workspace_name,root_dir:m.root_dir,serial_lane_id:m.serial_lane_id,last_activity:m.last_activity||null,legs:m.legs||[],dependency_chips:he(m)}}))}
    </div>`}function xe(f){let m={runnable:Z.runnable,queue:Z.queue,running:Z.running,pr_wait:Z.pr_wait,done:Z.done};return c`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${ay.map(v=>{let w=m[v.lane],q=v.lane==="runnable"?Z.runnable_flat?w.length>0?Bt():void 0:Z.runnable_sections.length>0?Bt():void 0:v.lane==="queue"?Z.queue_groups.length>0||Z.chain_lanes.length>0||Z.parallel_rows.length>0?Re():void 0:v.lane==="running"?qe(f):w.length>0?c`${w.map(U=>ir(U))}`:void 0;return Tn({id:`monitor-${v.lane}`,lane:v.pane,title:v.lane==="done"?`\uC644\uB8CC\xB7${te()}`:v.title,items:w,empty:v.empty,body:q,live:v.lane==="running"&&w.length>0,controls:v.lane==="runnable"?Ze():void 0,header_control:ct(v.lane,w.length)})})}
      </div>`}function Ze(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${Z.runnable_hidden.blocked>0?` ${Z.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${dl.map(f=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===f.value?" is-active":""}"
              data-spec=${f.value}
              aria-pressed=${k.spec===f.value?"true":"false"}
            >
              ${f.label}
            </button>`)}
        ${Z.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${Z.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function ct(f,m){return f==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${L}
      >
        ${Vs.map(v=>c`<option
              value=${v.value}
              ?selected=${L===v.value}
            >
              ${v.label}
            </option>`)}
      </select>`:f==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${b}
      >
        <option value="started" ?selected=${b==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${b==="repo"}>
          레포순
        </option>
      </select>`:f==="pr_wait"&&m>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:f==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${y}
      >
        ${Pr.map(v=>c`<option value=${v.value} ?selected=${y===v.value}>
              ${v.label}
            </option>`)}
      </select>`:""}function We(f){let m=s&&s.get?s.get():null,v=s&&s.getWorkspacesState?s.getWorkspacesState():[],w=f===void 0?s&&s.crossLanes?s.crossLanes():void 0:f,q={done_since:br(y,p()),running_sort:b,candidate_filter:k,candidate_sort:L};return w!==void 0&&(q.cross_lanes=w),pl(m,v,q)}function Ae(){let f=p();Z=We(),ge=null,ke=new Map;for(let m of[...Z.runnable,...Z.queue,...Z.running,...Z.pr_wait,...Z.done])!m.non_occupying&&!ke.has(m.id)&&ke.set(m.id,m);et(xe(f),we),N()?.render(),O(),be()}function O(){let f=new Map;for(let m of Z.queue_groups)f.set(m.root_dir,m.auto_advance);for(let m of Array.from(we.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let v=m.closest(".mon2-item")?.getAttribute("data-root-dir")||"",w=f.get(v);typeof w=="boolean"&&m.setAttribute("title",`${m.textContent||""} \xB7 ${w?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function N(){if($e)return $e;let f=we.querySelector(".mon2-deck");return f?($e=Vd(f,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>Z.done,rangeLabel:te,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:ve,onFocusChange:m=>{F=m,be()}}),$e):null}function be(){we.classList.toggle("has-focus",F!==null);for(let f of Array.from(we.querySelectorAll(".mon2-sec[data-root-dir]")))f.classList.toggle("is-focus",F!==null&&f.getAttribute("data-root-dir")===F);for(let f of Array.from(we.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let m=ke.get(f.getAttribute("data-bead-id")||"");f.classList.toggle("is-focus",F!==null&&!!m&&m.root_dir===F)}for(let f of Array.from(we.querySelectorAll(".mon2-crow[data-root-dir]")))f.classList.toggle("is-focus",F!==null&&f.getAttribute("data-root-dir")===F)}function ze(f,m){let v=i?i():void 0;if(!m||!v||m===v||!l){r(f);return}l(m).then(()=>{r(f)}).catch(w=>{n("workspace switch for %s failed: %o",m,w)})}function ve(f){if(!f)return;let m=i?i():void 0,v=()=>{try{u?.gotoView("worker")}catch(w){n("gotoView(worker) failed: %o",w)}};if(!l||m&&m===f){v();return}l(f).then(v).catch(w=>{n("workspace switch for %s failed: %o",f,w),pe("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Ge(f){Ln(f).then(m=>{pe(m?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",m?"success":"error",1400)})}function vt(f){let m=ke.get(f)||null;return{item:m,root_dir:m?m.root_dir:"",revision:m?m.expected_revision:0}}function ft(f){if(typeof f=="string"&&f.length>0)return f;if(f&&typeof f=="object"){let m=f;if(typeof m.message=="string"&&m.message.length>0)return m.message;if(typeof m.error=="string"&&m.error.length>0)return m.error;if(m.error&&typeof m.error=="object"&&typeof m.error.message=="string")return m.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function Et(f,m,v){let w=Z.owner_of[m];if(typeof w!="string"||w.length===0){pe(`${m}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await mt(f,{a:m,b:v},w),await Wt(f,m,v)}catch(q){pe(ft(q),"error")}Ae()}async function Wt(f,m,v){if(f!=="dep-add")return;let w=Z.chain_lanes.find(q=>q.rows.some(U=>U.id===m));!w||!w.rows.some(q=>q.id===v)||await gt(q=>np(w.lane_id,q),"",[{type:f,a:m,b:v}])}function Me(f){return Z.runnable.some(m=>m.id===f)||Z.parallel_rows.some(m=>m.id===f)?!0:Z.queue_groups.some(m=>m.sublanes.serial.some(v=>v.items.some(w=>w.id===f)))}function pn(f){!f||!Me(f)||(M=M&&M.bead_id===f?null:{bead_id:f,query:""},Ae())}function xt(){let f=new Map,m=s&&s.get?s.get():null,v=w=>Array.isArray(w)?w.filter(q=>typeof q=="string"&&q.length>0):[];for(let w of Array.isArray(m)?m:[]){if(!w||typeof w!="object")continue;let q=w.bead_blocked_by&&typeof w.bead_blocked_by=="object"?w.bead_blocked_by:{};for(let[U,D]of Object.entries(q))Array.isArray(D)&&f.set(U,v(D));for(let U of[...Array.isArray(w.runnable)?w.runnable:[],...Array.isArray(w.session_active)?w.session_active:[]])U&&typeof U.bead_id=="string"&&Array.isArray(U.blocked_by)&&U.blocked_by.length>0&&f.set(U.bead_id,v(U.blocked_by))}return f}function Zt(){let f=new Map,m=new Map,v=s&&s.get?s.get():null,w=q=>Array.isArray(q)?q.filter(U=>typeof U=="string"&&U.length>0):[];for(let q of Array.isArray(v)?v:[]){if(!q||typeof q!="object")continue;let U=q.bead_blocked_by&&typeof q.bead_blocked_by=="object"?q.bead_blocked_by:{};for(let[D,ne]of Object.entries(U))Array.isArray(ne)&&f.set(D,w(ne));for(let D of Array.isArray(q.runnable)?q.runnable:[])D&&typeof D.bead_id=="string"&&Array.isArray(D.blocked_by)&&m.set(D.bead_id,w(D.blocked_by))}for(let q of R)for(let U of[f,m]){let D=U.get(q.a);D!==void 0&&U.set(q.a,q.type==="dep-remove"?D.filter(ne=>ne!==q.b):D.includes(q.b)?D:[...D,q.b])}return{snapshot:f,runnable:m}}function en(){let f=xt();for(let m of R){let v=(f.get(m.a)||[]).slice();m.type==="dep-remove"?f.set(m.a,v.filter(w=>w!==m.b)):v.includes(m.b)||f.set(m.a,[...v,m.b])}return f}function Qt(f=Z,m=rt()){let v=new Map;for(let ot of Array.isArray(m?.lanes)?m.lanes:[]){let an=new Map;for(let Ht of Array.isArray(ot?.entries)?ot.entries:[])Ht&&typeof Ht.bead_id=="string"&&an.set(Ht.bead_id,Ht.dep_created_by_lane===!0);v.set(typeof ot?.id=="string"?ot.id:"",an)}let w=new Map,q=new Map,U=new Set,D=new Set;for(let ot of f.chain_lanes){let an=v.get(ot.lane_id);w.set(ot.lane_id,{status:ot.status,entries:ot.rows.map((Ht,er)=>({bead_id:Ht.id,root_dir:Ht.root_dir,...er===0?{}:{dep_created_by_lane:an?.get(Ht.id)===!0}}))});for(let Ht of ot.rows)q.set(Ht.id,ot.lane_id),Ht.fixed&&U.add(Ht.id),Ht.unplaced||D.add(Ht.id)}let ne=new Map;for(let ot of f.parallel_rows)typeof ot.queue_index=="number"&&ne.set(ot.id,ot.queue_index);for(let ot of f.queue_groups)for(let an of ot.sublanes.serial)for(let Ht of an.items)typeof Ht.queue_index=="number"&&ne.set(Ht.id,Ht.queue_index);let De=Zt();return{blocked_by_map:en(),snapshot_blocked_by:De.snapshot,runnable_blocked_by:De.runnable,owner_of:new Map(Object.entries(f.owner_of)),cross_lanes:w,owner_lane_of:q,fixed_members:U,placed_members:D,parallel_rows:f.parallel_rows.map(ot=>({bead_id:ot.id,root_dir:ot.root_dir,queue_index:ot.queue_index??0})),parallel_raw_length:new Map(Object.entries(f.parallel_raw_length)),queue_index_of:ne}}function rt(){return(s&&s.crossLanes?s.crossLanes():null)??null}function Xt(f,m){let v=ke.get(m);if(v&&v.root_dir===f)return v.expected_revision;let w=Z.queue_groups.find(q=>q.root_dir===f);return w?w.revision:0}async function Ee(f,m,v){if(f.type==="worker-queue-disarm"){try{let w=await ue(f.type,f.payload,f.root_dir,v.get(f.root_dir)??Xt(f.root_dir,m));w&&w.queue&&typeof w.queue.revision=="number"&&v.set(f.root_dir,w.queue.revision)}catch{}return!0}if(f.type==="worker-queue-place"||f.type==="worker-queue-reorder"||f.type==="worker-queue-remove")return await A(f.type,f.payload,f.root_dir,v,{bead_id:m})!==null;try{return(f.type==="dep-add"||f.type==="dep-remove")&&await mt(f.type,{a:f.a,b:f.b},f.root_dir),!0}catch(w){return pe(ft(w),"error"),!1}}async function A(f,m,v,w,q){try{let U=await ue(f,m,v,w.get(v)??Xt(v,q.bead_id));return!U||typeof U.applied!="boolean"?(pe("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(U.queue&&typeof U.queue.revision=="number"&&w.set(v,U.queue.revision),U.conflict?(pe("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):U.applied===!1?(pe(U.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${U.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):U.queue&&typeof U.queue.revision=="number"?U.queue.revision:w.get(v)??0)}catch(U){return pe(ft(U),"error"),null}}function me(f){(f.type==="dep-add"||f.type==="dep-remove")&&(R=[...R,{type:f.type,a:f.a,b:f.b}])}async function Oe(f,m){if(!o)return{ok:!1};try{let v=await o(f.type,{...f.payload,expected_revision:m});return!v||typeof v.revision!="number"?(pe("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:v.revision}}catch(v){let w=v,q=w&&w.code==="conflict"?w.details?.cross_lanes:null;return q&&typeof q.revision=="number"&&Array.isArray(q.lanes)?{ok:!1,conflict:q}:(pe(ft(v),"error"),{ok:!1})}}async function wt(f,m,v){let w=new Map,q=[],U=f.ops.slice(0,f.lane_op_index),D=f.ops.slice(f.lane_op_index);for(let De of U){if(!await Ee(De,v,w))return{done:!0};me(De)}let ne=m;for(let De of f.lane_ops){if(ne===null)return pe("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let ot=await Oe(De,ne);if(!ot.ok)return ot.conflict?{done:!1,conflict:ot.conflict}:{done:!0};ne=ot.revision}for(let De of D){if(!await Ee(De,v,w))return{done:!0};me(De),De.type==="dep-add"&&q.push(De)}for(let De of op(q))ne=await Ot(De,ne);return{done:!0}}async function Ot(f,m){if(m===null||!o)return m;let v=f.pairs,w=m;for(let q=0;q<2;q+=1){if(v.length===0)return w;try{let U=await o("monitor-lane-provenance",{lane_id:f.lane_id,pairs:v.map(D=>({bead_id:D.bead_id,after:D.after,value:!0})),expected_revision:w});return U&&typeof U.revision=="number"?U.revision:w}catch(U){let D=U,ne=D&&D.code==="conflict"?D.details?.cross_lanes:null;if(!ne||typeof ne.revision!="number"||!Array.isArray(ne.lanes))return w;let De=ne.lanes.find(ot=>ot&&ot.id===f.lane_id);v=ip(Array.isArray(De?.entries)?De.entries:[],v),w=ne.revision}}return w}async function gt(f,m,v=[]){R=v,oe();let w=Z,q=rt();for(let U=0;;U+=1){let D=f(Qt(w,q));if("refused"in D){pe(D.refused,"error");break}let ne=await wt(D,w.cross_lanes_revision,m);if(ne.done){D.correction&&ee(D.correction.lane_id,D.correction.corrected);break}if(U>=1){pe("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}w=We(ne.conflict),q=ne.conflict}R=[],Ae()}async function Tt(f,m){await gt(v=>rl(f,m,v),f.bead_id)}async function tn(f,m){if(f==="run"){await $n(m);return}if(f==="stop"){await Pt(m);return}if(f==="create"){await gt(v=>sl(null,v),"");return}if(f==="remove"){let v=sp(m,Qt());if(v!==null&&!g(v))return;await gt(w=>rp(m,w),"");return}await gt(v=>f==="confirm"?ep(m,v):tp(m,v),"")}function nn(f){let m=new Map;for(let v of f.rows){let w=Z.owner_of[v.id]||v.root_dir;typeof w!="string"||w.length===0||m.set(w,[...m.get(w)||[],v.id])}return m}async function $n(f){let m=Z.chain_lanes.find(U=>U.lane_id===f);if(!m||Z.cross_lanes_revision===null){Ae();return}oe();let v=new Map,w=new Map,q=nn(m);for(let U of m.rows){if(!U.unplaced)continue;let D=Z.owner_of[U.id]||U.root_dir;if(typeof D!="string"||D.length===0){pe(`${U.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),Ae();return}let ne=w.get(D)??0;if(await A("worker-queue-place",{bead_id:U.id,lane:"parallel",index:(Z.parallel_raw_length[D]??0)+ne},D,v,{bead_id:U.id})===null){Ae();return}w.set(D,ne+1)}for(let[U,D]of q)if(await A("worker-queue-arm",{bead_ids:D,lane_id:f},U,v,{bead_id:D[0]})===null){pe("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),Ae();return}Ae()}async function Pt(f){let m=Z.chain_lanes.find(w=>w.lane_id===f);if(!m||Z.cross_lanes_revision===null){Ae();return}oe();let v=new Map;for(let[w,q]of nn(m))if(await A("worker-queue-disarm",{lane_id:f},w,v,{bead_id:q[0]})===null)break;Ae()}async function yn(f,m){let{root_dir:v,revision:w}=vt(f);if(v.length===0){Ae();return}await A("worker-queue-disarm",{bead_ids:[f],lane_id:m},v,new Map([[v,w]]),{bead_id:f}),Ae()}async function xn(f,m){let v=ke.get(f);if(!v){Ae();return}let w={kind:"candidate",bead_id:f,root_dir:v.root_dir};if(m==="new-lane"){await gt(q=>sl({bead_id:f,root_dir:v.root_dir},q),f);return}if(m.startsWith("lane:")){let q=m.slice(5);if(!Z.chain_lanes.find(D=>D.lane_id===q)){Ae();return}await gt(D=>rl(w,{kind:"chain",lane_id:q,marker_index:(D.cross_lanes.get(q)?.entries??[]).length},D),f);return}if(m.startsWith("serial:")){let q=m.slice(7),U=(v.place_lanes||[]).find(D=>D.id===q);await Tt(w,{kind:"repo-serial",root_dir:v.root_dir,lane_id:q,index:U?U.index:0});return}await Tt(w,{kind:"parallel",marker_index:Z.parallel_rows.length})}async function S(f,m){let v=Z.parallel_rows,w=v.findIndex(ot=>ot.id===f);if(w<0)return;let q=v[w].root_dir,U=[];v.forEach((ot,an)=>{ot.root_dir===q&&U.push(an)});let D=U.indexOf(w),ne=U[D+m];if(typeof ne!="number")return;let De=m===-1?ne:U[D+2]??Math.min(v.length,ne+1);await Tt({kind:"parallel",bead_id:f,root_dir:q,queue_index:v[w].queue_index??0},{kind:"parallel",marker_index:De})}async function d(f){for(let m of Z.chain_lanes){let v=m.rows.find(w=>w.id===f);if(v){await Tt({kind:"chain",bead_id:f,root_dir:v.root_dir,lane_id:m.lane_id,...typeof v.queue_index=="number"?{queue_index:v.queue_index}:{}},{kind:"parallel",marker_index:Z.parallel_rows.length});return}}}let h=null,x=!1,z=null;function de(){z!==null&&clearTimeout(z),z=setTimeout(()=>{z=null,x=!1},0)}function Fe(f,m){let v=m&&typeof m.closest=="function"?m.closest("[data-row-index]"):null;if(v&&f.contains(v)){let w=Number(v.getAttribute("data-row-index"));return Number.isFinite(w)?w:0}return f.querySelectorAll("[data-row-index]").length}function Qe(f){let m=f.target,v=typeof m?.closest=="function"?m.closest("[data-drop]"):null;if(!v||!h)return null;let w=v.getAttribute("data-drop");if(w==="candidate")return{zone:v,target:{kind:"candidate"}};if(w==="parallel")return{zone:v,target:{kind:"parallel",marker_index:Fe(v,m)}};if(w==="chain")return{zone:v,target:{kind:"chain",lane_id:v.getAttribute("data-lane-id")||"",marker_index:Fe(v,m)}};if(w==="repo-serial"){let q=v.getAttribute("data-root-dir")||"";if(q!==h.root_dir)return null;let U=typeof m?.closest=="function"?m.closest("[data-queue-index]"):null,D=U&&v.contains(U)?U.getAttribute("data-queue-index"):v.getAttribute("data-lane-length"),ne=Number(D);return{zone:v,target:{kind:"repo-serial",root_dir:q,lane_id:v.getAttribute("data-lane-id")||"",index:Number.isFinite(ne)?ne:0}}}return null}function qt(){for(let f of Array.from(we.querySelectorAll(".is-drop-over")))f.classList.remove("is-drop-over")}function zt(f){let m=f.target,v=typeof m?.closest=="function"?m.closest('[draggable="true"][data-bead-id]'):null,w=v?v.closest("[data-drag-kind]"):null;if(!w)return;let q=w.getAttribute("data-bead-id")||"",U=w.getAttribute("data-drag-kind")||"",D=w.getAttribute("data-root-dir")||"";if(!q||!U||!D)return;let ne=w.getAttribute("data-queue-index")||"",De=Number(ne),ot=w.getAttribute("data-lane-id")||"";h={kind:U,bead_id:q,root_dir:D,...ne!==""&&Number.isFinite(De)?{queue_index:De}:{},...ot?{lane_id:ot}:{}},x=!0,le=null,we.classList.add("is-dragging");try{f.dataTransfer?.setData("text/plain",q),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function fn(f){let m=Qe(f);m&&(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),m.zone.classList.add("is-drop-over"))}function vn(f){let m=f.target;typeof m?.closest=="function"&&m.closest("[data-drop]")?.classList.remove("is-drop-over")}function _n(){h=null,qt(),we.classList.remove("is-dragging"),de()}function Be(f){let m=Qe(f),v=h;h=null,qt(),we.classList.remove("is-dragging"),!(!m||!v)&&(f.preventDefault(),Tt(v,m.target))}function $(f){return{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,status:f.run_state==="running"?"running":f.run_state,worktree:f.root_dir}}function ae(f,m){let{item:v,root_dir:w,revision:q}=vt(m),U=v?.attempt_id||"",D=f.classList;if(D.contains("mon2-rowops__up")||D.contains("mon2-rowops__down")){S(m,D.contains("mon2-rowops__up")?-1:1);return}if(D.contains("mon2-rowops__remove")){ue("worker-queue-remove",{bead_id:m},w,q);return}if(D.contains("mon2-crow__detach")){d(m);return}if(D.contains("mon-dep__btn")){pn(m);return}if(D.contains("worker-dep__open")){pn(m);return}if(D.contains("mon2-arm__release")){yn(m,f.getAttribute("data-lane-id")||"");return}if(D.contains("mon-lane__chip")){let ne=f.getAttribute("data-lane-id")||"";we.querySelector(`.mon2-clane[data-lane-id="${ne}"]`)?.scrollIntoView({block:"nearest"});return}if(D.contains("mon-deppanel__unlink")){let ne=f.getAttribute("data-dep-a")||"",De=f.getAttribute("data-dep-b")||"";g(`${De}\uAC00 ${ne}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)&&Et("dep-remove",ne,De);return}if(D.contains("mon-deppanel__cand")){let ne=f.getAttribute("data-dep-cand")||"";M&&ne&&Et("dep-add",M.bead_id,ne);return}if(D.contains("mon-overlap__chip")){let ne=f.getAttribute("data-overlap-id")||"";K=!!K&&K.bead_id===m&&K.counterpart_id===ne?null:{bead_id:m,counterpart_id:ne},Ae();return}if(D.contains("mon-overlap__place")){Xe(m,f.getAttribute("data-counterpart-id")||"");return}if(D.contains("worker-card__place")){le=le===m?null:m,Ae();return}if(D.contains("worker-card__place-cancel")){le=null,Ae();return}if(D.contains("worker-card__place-lane")){let ne=f.getAttribute("data-lane")||"parallel";le=null,xn(m,ne);return}if(D.contains("rtile__session")){if(v&&v.kind==="session"){let ne=(v.session_refs||[]).find(De=>De&&De.current===!0);ne&&(Pe.hidden=!1,je.open(Wr(ne,m,"in_progress",w)),Ae());return}Y=U,U&&v&&(Pe.hidden=!1,je.open({attempt_id:U,root_dir:w,meta:$(v)})),Ae();return}if(D.contains("rtile__pause")){mt("worker-attempt-pause",{attempt_id:U},w);return}if(D.contains("rtile__resume")){Ur().then(ne=>{if(ne!==null)return St("worker-attempt-resume",{attempt_id:U,...ne!==""?{instructions:ne}:{}},w,q)});return}if(D.contains("rtile__dismiss")){ue("worker-attempt-dismiss",{attempt_id:U},w,q);return}if(D.contains("rtile__discard")){if(!g(Ds(m,"unmerged")))return;ut({bead_id:m,...U?{attempt_id:U}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},w,q);return}if(D.contains("worker-mini__merge")){let ne=Le(w,m);ne?.mismatch&&ne.continuation===null?ht(w,m,q,ne.mismatch):ue("worker-merge-queue-add",{bead_id:m},w,q);return}if(D.contains("worker-mini__merge-cancel")){ue("worker-merge-queue-remove",{bead_id:m},w,q);return}if(D.contains("worker-mini__discard")){let ne=f.dataset.discardMode==="merged"?"merged":"unmerged";if(!g(Ds(m,ne)))return;ut({bead_id:m,...f.dataset.attemptId?{attempt_id:f.dataset.attemptId}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},w,q);return}if(D.contains("worker-mini__revise-fix")){St("worker-revise-fix",{bead_id:m},w,q);return}D.contains("worker-mini__revise-approve")&&ue("worker-revise-approve",{bead_id:m},w,q)}function P(f){let m=x;x=!1;let v=f.target;if(!v||typeof v.closest!="function"||v.closest("dialog")||v.closest(".worker-drawer-overlay")||v.closest("a"))return;let w=v.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(w){f.preventDefault();let jn=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||w.textContent?.trim()||"";jn&&Ge(jn);return}let q=v.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(q){f.preventDefault();let er=q.getAttribute("data-root-dir")||ke.get(v.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||q.getAttribute("title")||"";ve(er);return}let U=v.closest(".mon2-sec__toggle");if(U){f.preventDefault(),Te(U.getAttribute("data-root-dir")||"");return}let D=v.closest(".mon2-area__toggle");if(D){f.preventDefault(),Ye(D.getAttribute("data-area")||"parallel");return}if(v.closest(".mon2-newlane")){f.preventDefault(),tn("create","");return}let ne=v.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(ne){f.preventDefault();let er=ne.getAttribute("data-lane-id")||"",jn=ne.classList;tn(jn.contains("mon2-clane__confirm")?"confirm":jn.contains("mon2-clane__reapply")?"reapply":jn.contains("mon2-clane__run")?"run":jn.contains("mon2-clane__stop")?"stop":"remove",er);return}if(v.closest(".mon-merge-all")){f.preventDefault(),E();return}let De=v.closest(".mon-filter__spec");if(De){f.preventDefault(),k={...k,spec:De.getAttribute("data-spec")||"all"},Tp(k),Ae();return}let ot=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!ot)return;let an=ot.getAttribute("data-bead-id")||"",Ht=v.closest("button");if(Ht){f.preventDefault(),ae(Ht,an);return}an&&!m&&(f.preventDefault(),ze(an,ot.getAttribute("data-root-dir")||vt(an).root_dir))}function Se(f){let m=f.target;if(!m||typeof m.closest!="function")return;let v=m.closest(".mon-filter__blocked");if(v){k={...k,show_blocked:v.checked},Tp(k),Ae();return}let w=m.closest(".mon-candidate-sort");if(w){L=Vs.some(D=>D.value===w.value)?w.value:"repo_spec",ey(L),Ae();return}let q=m.closest(".mon-running-sort");if(q){b=q.value==="repo"?"repo":"started",oy(b),Ae();return}let U=m.closest(".mon-done-range");U&&(y=Bn(U.value),ry(y),Ae())}function st(f){let m=f.target,v=m&&typeof m.closest=="function"?q=>m.closest(q):()=>null,w=!1;K&&!v(".mon-overlap__popover, .mon-overlap__chip")&&(K=null,w=!0),M&&!v(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(M=null,w=!0),w&&Ae()}function nt(f){f.key!=="Escape"||!K&&!M||(K=null,M=null,Ae())}function bt(f){let m=f.target;!m||typeof m.closest!="function"||!m.closest(".mon-deppanel__search")||!M||(M={...M,query:m.value},Ae())}e.addEventListener("click",P),e.addEventListener("change",Se),e.addEventListener("input",bt),document.addEventListener("click",st),document.addEventListener("keydown",nt),e.addEventListener("dragstart",zt),e.addEventListener("dragover",fn),e.addEventListener("dragleave",vn),e.addEventListener("drop",Be),e.addEventListener("dragend",_n),s&&typeof s.subscribe=="function"&&(se=s.subscribe(()=>{try{j.clear(),Ae()}catch{}}));function Ke(){_e!==null&&(clearInterval(_e),_e=null)}function Ct(){z!==null&&(clearTimeout(z),z=null)}return{load(){n("load"),Ae(),_e===null&&(_e=setInterval(()=>{try{Ae()}catch{}},iy))},pause(){Ke()},clear(){Ke(),Ct(),se&&(se(),se=null),je.destroy(),Pe.hidden=!0,$e?.destroy(),$e=null,e.removeEventListener("click",P),e.removeEventListener("change",Se),e.removeEventListener("input",bt),document.removeEventListener("click",st),document.removeEventListener("keydown",nt),e.removeEventListener("dragstart",zt),e.removeEventListener("dragover",fn),e.removeEventListener("dragleave",vn),e.removeEventListener("drop",Be),e.removeEventListener("dragend",_n),e.replaceChildren()}}}function qp(e,t,n){let r=Ft("views:nav"),{global_element:s,repo_element:o}=e,i=null;function a(y){return b=>{b.preventDefault();let k=y==="monitor"&&l()==="monitor"?"worker":y;r("click tab %s",k),n.gotoView(k)}}function l(){let y=t.getState();return y.view==="worker"||y.view==="monitor"?y.view:"board"}function u(){let y=l();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${y==="monitor"?"is-active":""}"
        @click=${a("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function p(){let y=l();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${y==="board"?"is-active":""}"
          @click=${a("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${y==="worker"?"is-active":""}"
          @click=${a("worker")}
          >Worker</a
        >
      </div>
    `}function g(){s&&et(u(),s),o&&et(p(),o)}return g(),i=t.subscribe(()=>g()),{destroy(){i&&(i(),i=null),s&&et(c``,s),o&&et(c``,o)}}}var Fp=["bug","feature","task","epic","chore"];function jp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Bp=["Critical","High","Medium","Low","Backlog"];function Up(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),a=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),p=n.querySelector("#btn-cancel"),g=n.querySelector("#btn-create"),y=n.querySelector(".new-issue__close");function b(){o.replaceChildren();let R=document.createElement("option");R.value="",R.textContent="\u2014 Select \u2014",o.appendChild(R);for(let F of Fp){let X=document.createElement("option");X.value=F,X.textContent=jp(F),o.appendChild(X)}i.replaceChildren();for(let F=0;F<=4;F+=1){let X=document.createElement("option");X.value=String(F);let V=Bp[F]||"Medium";X.textContent=`${F} \u2013 ${V}`,i.appendChild(X)}}b();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function L(R){s.disabled=R,o.disabled=R,i.disabled=R,a.disabled=R,l.disabled=R,p.disabled=R,g.disabled=R,g.textContent=R?"Creating\u2026":"Create"}function B(){u.textContent=""}function Y(R){u.textContent=R}function le(){try{let R=window.localStorage.getItem("beads-ui.new.type");R?o.value=R:o.value="";let F=window.localStorage.getItem("beads-ui.new.priority");F&&/^\d$/.test(F)?i.value=F:i.value="2"}catch{o.value="",i.value="2"}}function K(){let R=o.value||"",F=i.value||"";R.length>0&&window.localStorage.setItem("beads-ui.new.type",R),F.length>0&&window.localStorage.setItem("beads-ui.new.priority",F)}async function M(){B();let R=String(s.value||"").trim();if(R.length===0){Y("Title is required"),s.focus();return}let F=Number(i.value||"2");if(!(F>=0&&F<=4)){Y("Priority must be 0..4"),i.focus();return}let X=String(o.value||""),V=String(l.value||""),ge={title:R};X.length>0&&(ge.type=X),String(F).length>0&&(ge.priority=F),V.length>0&&(ge.description=V),L(!0);try{await t("create-issue",ge)}catch{L(!1),Y("Failed to create issue");return}K(),L(!1),k()}return n.addEventListener("cancel",R=>{R.preventDefault(),k()}),y.addEventListener("click",()=>k()),p.addEventListener("click",()=>k()),n.addEventListener("keydown",R=>{R.key==="Enter"&&(R.ctrlKey||R.metaKey)&&(R.preventDefault(),M())}),r.addEventListener("submit",R=>{R.preventDefault(),M()}),{open(){r.reset(),B(),le();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var cy=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function uy(e,t){return Ji(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Wp(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=uy(r,e);return c`<button
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
  `}function zp(e,t,n){return c`
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
  `}function Hp(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${cy.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var dy=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Gp(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(te=>pe(te,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let a="execution",l=!1,u="",p=null;function g(){if(p)return p;let te=i.querySelector('[data-pane="execution"]');return te?(p=yi(te,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:we=>t.queueStore?.set?.(we)}),p):null}function y(){return c`
      <section
        class=${`settings-dialog__pane${a==="execution"?" settings-dialog__pane--active":""}`}
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
    `}function b(){let te=r.get();return c`
      <section
        class=${`settings-dialog__pane${a==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${te?c`
              ${Wp(te,s(),Y)}
              ${zp(te,u,{onDraft:we=>{u=we},onAdd:le,onRemove:K})}
              ${Hp(te,M)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(te){let we=r.get();if(we)try{let Pe=await n("display-policy-set",{expected_revision:we.revision,policy:te(we)});L(Pe),Pe&&Pe.conflict&&Pe.policy&&(Pe=await n("display-policy-set",{expected_revision:Pe.policy.revision,policy:te(Pe.policy)}),L(Pe)),Pe&&Pe.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function L(te){te&&te.policy&&typeof te.policy=="object"&&r.set(te.policy)}function B(te){k(te)}function Y(te){let we=r.get();if(!we)return;let Pe=!py(te,we);B(ye=>fy(te,ye,Pe))}function le(){let te=u.trim();te.length!==0&&(u="",B(we=>we.hidden_prefixes.includes(te)?{hidden_prefixes:we.hidden_prefixes}:{hidden_prefixes:[...we.hidden_prefixes,te]}),R())}function K(te){B(we=>({hidden_prefixes:we.hidden_prefixes.filter(Pe=>Pe!==te)}))}function M(te){let we=r.get();if(!we)return;let Pe=we.chips[te]===!1;B(()=>({chips:{[te]:Pe}}))}function R(){et(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${dy.map(te=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${te.id}
                  aria-selected=${String(a===te.id)}
                  aria-controls=${`settings-pane-${te.id}`}
                  @click=${()=>F(te.id)}
                >
                  <span class="settings-dialog__glyph">${te.glyph}</span>
                  ${te.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${oe}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${y()} ${b()}
          </div>
        </div>
      `,i),g()}function F(te){a=te,R()}let X=()=>{l=!1,t.onOpenChange?.(!1)};i.addEventListener("close",X),i.addEventListener("cancel",X);let V=te=>{te.target===i&&oe()};i.addEventListener("click",V);let ge=null;r.subscribe&&(ge=r.subscribe(()=>{l&&R()}));let H=null;t.implPresetStore?.subscribe&&(H=t.implPresetStore.subscribe(()=>{l&&p?.render()}));function ee(te="execution"){l||(l=!0,t.onOpenChange?.(!0),a=te,u="",R(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),g()?.load())}function oe(){l&&(l=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:ee,close:oe,sessionDraft:()=>p?.sessionDraft()??{},destroy(){l=!1,i.removeEventListener("close",X),i.removeEventListener("cancel",X),i.removeEventListener("click",V),ge&&(ge(),ge=null),H&&(H(),H=null),p?.destroy(),p=null,i.remove()}}}function py(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function fy(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var _y=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Kp="usage-meter-card",my="usage-meter-layer",fl=600,gy=["token_expired","relogin_required"];function Vp(e){return String(e).padStart(2,"0")}function by(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Yp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Vp(r.getHours())}:${Vp(r.getMinutes())}`,a=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${_y[r.getMonth()]} ${r.getDate()} ${o}`;return`${by(n,t)} \xB7 ${a}`}function hy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Zp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Qp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Xp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function ef(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function yy(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:ef(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function vy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let i=yy(o);i&&r.push(i)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?ef(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function wy(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=vy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function tf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function ky(e,t){return!e.held||tf(e,t)<=fl?e:{...e,available:!1,windows:[],accounts:[]}}function Jp(e,t){return`${e}:${t}`}function nf(e){let t=!1,n=null,r=new Map,s=null,o=new Map,i=new Map,a=0,l=null;function u(){et(c``,e),e.hidden=!0,g()}function p(){if(l===null){let ye=e.ownerDocument;l=ye.createElement("div"),l.id=my,l.className="usage-meter__layer",ye.body.appendChild(l)}return l}function g(){l!==null&&(et(c``,l),l.remove(),l=null)}function y(ye){n!==ye&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",B),window.addEventListener("resize",L)),n=ye)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",B),window.removeEventListener("resize",L))}function k(ye){let J=ye.target;J&&(e.contains(J)||l!==null&&l.contains(J))||(b(),oe())}function L(){oe()}function B(ye){ye.key==="Escape"&&(b(),oe())}function Y(ye){n===ye?b():y(ye),oe()}function le(){b(),oe()}async function K(ye,J){if(r.has(ye.key))return;let Z=Jp(ye.key,J);r.set(ye.key,J),i.delete(Z),oe();let ke=null;try{ke=await(await fetch(ye.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:J})})).json()}catch{ke=null}if(t)return;if(r.delete(ye.key),!ke||ke.ok!==!0){let se=ke&&typeof ke.error=="string"&&ke.error.length>0?ke.error:"network_error";i.set(Z,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${se}`}),oe();return}let j=Array.isArray(ke.warnings)?ke.warnings.filter(se=>typeof se=="string"&&se.length>0):[];j.length>0&&i.set(Z,{kind:"warn",text:j.join(" \xB7 ")}),oe(),await Pe()}function M(ye,J,Z,ke){let j=Qp(ye.pct),_e=`resets ${Yp(ye.resetsAt,ke)}${J?` \xB7 ${Z}`:""}`;return c`<span
      class="usage-meter__window ${Zp(j)}"
      style=${`--progress: ${j}%`}
      title=${_e}
    >
      <span class="usage-meter__label">${ye.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${j}%</span>
    </span>`}function R(ye,J,Z){let ke=tf(J,Z),j=J.available&&(J.held||ke>fl),se=j?`${Math.floor(ke/60)}\uBD84 \uC804 \uCE21\uC815`:"",_e=J.accounts.filter(Le=>!Le.active).length,$e=`usage-meter__group${j?" usage-meter__group--stale":""}`,je=c`<span class="usage-meter__provider"
        >${ye.label}</span
      >
      ${J.available?J.windows.map(Le=>M(Le,j,se,Z)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${_e>0?c`<span class="usage-meter__badge">+${_e}</span>`:""}`;if(J.accounts.length===0)return c`<span
        class=${$e}
        aria-label=${`${ye.label} usage`}
        >${je}</span
      >`;let ue=n===ye.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${$e}`}
      aria-label=${`${ye.label} usage`}
      aria-expanded=${ue?"true":"false"}
      aria-controls=${Kp}
      @click=${()=>Y(ye.key)}
    >
      ${je}
    </button>`}function F(ye,J){return c`<span class="usage-meter" aria-label="Usage">
      ${ye.map(Z=>R(Z.provider,Z.snapshot,J))}
    </span>`}function X(ye,J){let Z=Qp(ye.pct),ke=Yp(ye.resetsAt,J);return c`<span
      class="usage-meter__account-window ${Zp(Z)}"
      style=${`--progress: ${Z}%`}
    >
      <span class="usage-meter__account-key">${ye.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Z}%</span>
      <span class="usage-meter__account-reset"
        >${ke.length>0?`\u21BB ${ke}`:""}</span
      >
    </span>`}function V(ye,J){return gy.includes(J)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ye.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function ge(ye,J,Z){let ke=J.status==="ok",j=typeof J.ageSeconds=="number"&&J.ageSeconds>fl,se=i.get(Jp(ye.key,J.number)),_e=r.get(ye.key),$e=_e!==void 0,je=_e===J.number,ue=["usage-meter__account"];return J.active&&ue.push("usage-meter__account--active"),ke||ue.push("usage-meter__account--unavailable"),j&&ue.push("usage-meter__account--stale"),c`<div class=${ue.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${J.email}
          >${J.alias===null?J.email:J.alias}</span
        >
        ${J.plan===null?"":c`<span class="usage-meter__account-tag">${J.plan}</span>`}
        ${J.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${J.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${hy(J.ageSeconds)}</span
            >`}
        ${J.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${$e}
              @click=${()=>{K(ye,J.number)}}
            >
              ${je?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${ke?c`<div class="usage-meter__account-windows">
            ${J.windows.map(Le=>X(Le,Z))}
          </div>`:c`<div class="usage-meter__account-status">
            ${V(ye,J.status)}
          </div>`}
      ${se===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${se.kind}"
          >
            ${se.text}
          </div>`}
    </div>`}function H(ye,J,Z){let ke=J.accounts.filter(j=>j.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ye.label} · 활성 ${ke} / 전체
        ${J.accounts.length}
      </h2>
      ${J.accounts.map(j=>ge(ye,j,Z))}
    </section>`}function ee(ye,J){return c`<div
      class="usage-meter__card"
      id=${Kp}
      role="dialog"
      aria-label=${`${ye.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${H(ye.provider,ye.snapshot,J)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function oe(){let ye=Date.now(),J=[];for(let ke of Xp){let j=o.get(ke.key);j&&J.push({provider:ke,snapshot:ky(j,ye)})}if(J.length===0){b(),u();return}let Z=J.find(ke=>ke.provider.key===n&&ke.snapshot.accounts.length>0);Z||b(),et(F(J,ye),e),e.hidden=!1,Z?te(Z,ye):g()}function te(ye,J){let Z=p(),ke=e.getBoundingClientRect(),j=e.ownerDocument.documentElement.clientWidth;Z.style.setProperty("--usage-meter-anchor-top",`${ke.bottom}px`),Z.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,j-ke.right)}px`),et(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${le}
        ></div>
        ${ee(ye,J)}`,Z)}async function we(ye){try{let J=await fetch(ye.endpoint);return J.ok?wy(await J.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Pe(){a+=1;let ye=a,J=await Promise.all(Xp.map(async Z=>({provider:Z,read:await we(Z)})));if(!(t||ye!==a)){for(let Z of J){let ke=Z.provider.key;if(Z.read.kind==="ok"){o.set(ke,Z.read.snapshot);continue}if(Z.read.kind==="empty"){o.delete(ke);continue}let j=o.get(ke);j!==void 0&&!j.held&&o.set(ke,{...j,held:!0})}oe()}}return u(),Pe(),s=setInterval(()=>{Pe()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),b(),u()}}}function rf(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,i=r.get(s.bead_id),a=typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at;return!o&&!a&&typeof s.dismissed_at!="number"}}var $y="worker-ineligible";function Ys(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function sf(e){return Ys(e).includes($y)}var xy="session-preferred",Ay=["exclusive_machine"];function of(e,t){if(!Ys(e).includes(xy)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Ay.includes(n)?n:""}var Sy="worker-serial";function _l(e){return Ys(e).includes(Sy)}var af=new Set(["sh","bash","zsh","dash","ksh"]),lf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function cf(e){let t=e.split("/");return t[t.length-1]||""}function Ey(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=cf(n[0]);if(r!=="env")return af.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&af.has(cf(s))}function Ty(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Cy(e){let t=[],n=0;lf.lastIndex=0;for(let r of e.matchAll(lf)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:Ty(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Ry(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function uf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",i="",a="",l=0,u=null,p=!1;function g(R,F){return F?Cy(R).map(X=>X.kind==="plain"?X.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${X.kind}"
            >${X.text}</span
          >`):R}function y(){if(!s)return c``;let R=o==="ready"&&Ey(i),F=o==="ready"?i.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>K()}
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
              @click=${()=>{k()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>K()}
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
                  ${a}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${F.map((X,V)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${V+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${g(X,R)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){et(y(),r)}async function k(){if(o!=="ready")return;let R=await Ln(i);pe(R?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",R?"success":"error")}function L(R){R.key==="Escape"&&s&&(R.preventDefault(),K())}function B(){p||(document.addEventListener("keydown",L),p=!0)}function Y(){p&&(document.removeEventListener("keydown",L),p=!1)}async function le(R,F=null){let X=++l;B(),s={...R},u=F||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",i="",a="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let ge=t?t():"";if(!ge){o="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){o="error",a="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let H="/api/repo-ops-script?workspace="+encodeURIComponent(ge)+"&lane="+encodeURIComponent(R.lane)+"&base_sha="+encodeURIComponent(R.base_sha);try{let ee=await n(H),oe=await ee.json().catch(()=>({}));if(X!==l)return;if((t?t():"")!==ge){K();return}if(!ee.ok||!oe||oe.ok!==!0){o="error",a=Ry(oe&&typeof oe.error=="string"?oe.error:""),b();return}s={lane:oe.lane,base_sha:oe.base_sha,path:oe.path,base_ref:oe.base_ref},i=String(oe.content),o="ready",b()}catch{if(X!==l)return;o="error",a="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function K(){l+=1,Y(),s=null,i="",b();let R=u;u=null,R?.isConnected&&R.focus()}function M(){K(),r.remove()}return{open:le,close:K,destroy:M}}var df={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Oy=new Set(["queued","running","retry_pending"]);function pf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function i(){let H=o();return typeof H.revision=="number"?H.revision:0}function a(H){t&&H&&H.queue&&typeof H.queue=="object"&&t.set(H.queue)}function l(){let H=o().workspace_info;return H&&typeof H=="object"?H:{}}function u(H,ee){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${H}"
      >${ee}</span
    >`}function p(H){if(typeof H!="number"||!Number.isFinite(H))return"";let ee=H/6e4;return Number.isInteger(ee)?`timeout ${ee}\uBD84`:`timeout ${Math.round(H/1e3)}\uCD08`}function g(H){let ee=p(H);return ee?u("config",ee):""}function y(H,ee,oe){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${oe.script}
      @click=${te=>{s&&s({lane:H,base_sha:ee.base_sha,path:oe.script,base_ref:ee.base_ref},te.currentTarget)}}
    ></button>`}function b(){let H=o().repo_operations;return Array.isArray(H)?H:[]}function k(){let H=l().repo_ops,ee=H&&typeof H=="object"?H.repo_id:null;return typeof ee=="string"&&ee?ee:null}function L(){return b().some(H=>H&&H.kind==="deploy"&&Oy.has(H.state))}function B(){let H=L(),ee=k()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${H||ee}
      title=${H?"\uBC30\uD3EC \uC9C4\uD589 \uC911":ee?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{F()}}
    >
      배포 실행
    </button>`}function Y(){let H=o().repo_ops_opt_out;return{verify:H?.verify===!0,deploy:H?.deploy===!0}}function le(H,ee){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!ee}
        @change=${oe=>{R(H,!oe.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function K(H){let ee=typeof H.base_sha=="string"?H.base_sha:"",oe=`${H.source_path||"repo-ops/config.toml"} @ ${H.base_ref||"?"}${ee?`@${ee.slice(0,7)}`:""}`,te=Y(),we=!!H.verify&&te.verify,Pe=!!H.deploy&&te.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${oe}</span>
      </p>
      <div
        class="worker-repo-ops__lane${we?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${H.verify?c`${y("verify",H,H.verify)}
              ${g(H.verify.timeout_ms)}
              ${we?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${we?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":H.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${H.verify?le("verify",te.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Pe?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${H.deploy?c`${y("deploy",H,H.deploy)}
              ${g(H.deploy.timeout_ms)}
              ${Pe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):B()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Pe?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":H.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${H.deploy?le("deploy",te.deploy):""}
      </div>
    </section>`}function M(H){let ee=H.repo_ops&&typeof H.repo_ops=="object"?H.repo_ops:null;return ee&&(ee.status==="resolved"||ee.status==="absent")?K(ee):ee&&(ee.status==="pending"||ee.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${ee.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${ee.error_code?c` — <code>${ee.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function R(H,ee){if(!n)return;let oe=await n("worker-repo-ops-opt-out-toggle",{kind:H,opted_out:ee,expected_revision:i()});if(a(oe),oe&&oe.conflict){let te=await n("worker-repo-ops-opt-out-toggle",{kind:H,opted_out:ee,expected_revision:i()});a(te)}r()}async function F(){let H=k();if(!n||H===null)return;let ee=await n("worker-repo-operation-deploy-run",{repo_id:H});if(a(ee),!ee||ee.ok!==!0){let oe=ee&&typeof ee.reason=="string"?ee.reason:"",te=Object.hasOwn(df,oe)?df[oe]:oe||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";pe(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${te}`,"error")}else pe("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let X={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function V(H,ee,oe){return c`<div class="worker-repo-ops__policy-group" data-policy=${oe}>
      <div class="worker-repo-ops__policy-label">${H}</div>
      <ul class="worker-repo-ops__policy-list">
        ${ee.map(te=>c`<li data-token=${te}>
              ${X[te]||te}
            </li>`)}
      </ul>
    </div>`}function ge(){let H=o(),ee=H.repo_operation_policy&&typeof H.repo_operation_policy=="object"?H.repo_operation_policy:null;return ee?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(ee.worker_automatic||[]).length} · 금지
            ${(ee.never_automatic||[]).length}</span
          >
        </summary>
        ${ee.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${ee.schema_version})`}
            </div>`:""}
        ${V("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",ee.worker_automatic||[],"worker-automatic")}
        ${V("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",ee.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${M(l())} ${ge()}
      </details>`}}}var mf=20,Ly=5,Iy=new Set(["failed","running","queued","retry_pending"]),ff={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function Py(e,t,n=mf){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function Dy(e){if(e.type==="cleanup")return!0;let t=e.operation;return Iy.has(t.state)&&!t.dismissed&&!t.superseded_by}function My(e,t,n={}){let r=Py(e,t,1/0),s=n.expanded===!0?mf:Ly,o=new Set(r.slice(0,s)),i=r.filter(a=>o.has(a)||Dy(a));return{visible:i,hidden:r.length-i.length}}function _f(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Ny(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function gf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function bf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function qy(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],s=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof s=="number"&&Number.isFinite(s)?s:void 0}function Fy(e,t){let n=Nd(e,t),r=qd(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function jy(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function By(e,t){let n=e.operation,r=n.state==="failed",s=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?rn(e.at):""}
      >${ui(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${_f(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(ff,n.kind)?ff[n.kind]:n.kind}</span
        >
        <span class="worker-ev__meta"
          >${n.target_base}@${ai(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${xr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${_f(e)}"
          >${Ny(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?bf(Md(n.failure_kind,s)):""}
      ${Fy(n,qy(t,n))}
      ${jy(n)}
      ${gf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?s:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${ai(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||""},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function Uy(e){let t=e.cleanup,n=Er(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?rn(e.at):""}
      >${ui(e.at)||"\u2014"}</span
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
        ${fp(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${bf(Jr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${gf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Wy(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Uy(r):By(r,e.repo_ops))}
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
  </section>`}function hf(e,t={}){let n=null;function r(){if(n===null){et(c``,e);return}let i=My(n.operations,n.cleanup_failures,{expanded:n.expanded});et(Wy({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let a=i.target;if(a?.closest?.('[data-seam="repo-ops-close"]')){o();return}a?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var zy=Ft("views:worker"),Hy="tab:worker:ready",Gy="tab:worker:blocked",Ky="tab:worker:in-progress",Vy="tab:worker:resolved",Yy="tab:worker:closed",Ti=1,yf=5;function vf(e){return Es(e).evidence==="published"}var Zy=new Set(["quick_fix","spec_backed","full_plan"]);function wf(e){return typeof e=="string"&&Zy.has(e)}var Af="beads-ui.worker.candidate-filter",ml={show_blocked:!1,spec:"all"};function Qy(){try{let e=window.localStorage.getItem(Af);if(!e)return{...ml};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ml};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...ml}}}function Xy(e){try{window.localStorage.setItem(Af,JSON.stringify(e))}catch{}}function Jy(e,t){let n=a=>t.show_blocked||!a.blocked,r=a=>t.spec==="all"||(t.spec==="with"?a.has_spec:!a.has_spec),s=[],o=0,i=0;for(let a of e){let l=n(a),u=r(a);l&&u?s.push(a):!l&&u?o+=1:l&&!u&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var ev=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Sf="bdui.worker.candidate_sort",Ef=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"},{value:"updated",label:"\uCD5C\uC2E0 \uC218\uC815\uC21C"}],bl="spec";function Tf(e){return Ef.some(t=>t.value===e)?e:bl}function tv(){try{return Tf(window.localStorage.getItem(Sf))}catch{return bl}}function nv(e){try{window.localStorage.setItem(Sf,e)}catch{}}var Cf="bdui.worker.done-range";function rv(){try{let e=window.localStorage.getItem(Cf);return e===null?"today":Bn(e)}catch{return"today"}}function sv(e){try{window.localStorage.setItem(Cf,e)}catch{}}var ov="(max-width: 640px)",Rf="beads-ui.worker.lane-collapsed",Zs={queue:!0,done:!0};function iv(){try{let e=window.localStorage.getItem(Rf);if(!e)return{...Zs};let t=JSON.parse(e);return!t||typeof t!="object"?{...Zs}:{queue:typeof t.queue=="boolean"?t.queue:Zs.queue,done:typeof t.done=="boolean"?t.done:Zs.done}}catch{return{...Zs}}}function av(e){try{window.localStorage.setItem(Rf,JSON.stringify(e))}catch{}}function kf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function lv(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(yr):t==="updated"?r.sort(bo):(r.sort(ho(n)),t==="board"?r:[...r.filter(vf),...r.filter(s=>!vf(s))])}function cv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function uv(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var dv="\u{1F512} blocked";function $f(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function pv(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function fv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function _v(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function mv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function gv(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function gl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var bv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),hv=new Set(["waiting_metadata","reviewing","retrying"]);function yv(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",i=typeof t?.effort=="string"?t.effort:"",a=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${i?` \xB7 effort ${i}`:""}`:"",a?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${a}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,i=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,a=typeof r.next_at=="number"?rn(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,a?`\uB2E4\uC74C \uC2DC\uAC01 ${a}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function vv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function wv(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,i="";switch(e.phase){case"gating":i=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":i="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":i=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":i=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":i="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;i=t.label;break;case"paused":i="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":i="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[i,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=vv(e.terminal_reason);l&&a.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let u of t?t.details:[])a.push(u);return e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&a.push(`repair ${s.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:i,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:!bv.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function xf(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function kv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(xf(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${xf(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=pv(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${$f(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${$f(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function $v(e,t,n,r,s=null,o=null,i=null,a=!1,l=null,u=!0,p=null,g=null,y=null,b={},k=!1,L=!1,B={},Y=null){let le=!!l&&l.position>0,K=!!l?.continuation_action&&l.continuation_action.continuation===null,M=!!l&&l.active===!0,R=l&&l.failure||null,F=_v(l?l.waiting:null,y),X=n[e]||null,V=X&&X.gate?X.gate:null,ge=X&&X.pr?X.pr:null,H=mv(l?l.resolution:null),ee=gv(l?l.head_review:null),oe=l&&l.head_review||null,te=yv(y,oe),we=wv(y,te),Pe=l&&l.authority||null,ye=!!oe&&["pending","reviewing","revising"].includes(oe.state),J=!!y&&typeof y=="object"&&hv.has(y.phase),Z=le&&!M&&(oe?.state==="failed"||!Pe||J||Pe.source==="automatic"&&!L),ke=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":H?H.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":F,j=!!V&&V.base_badge==="\uCDA9\uB3CC",se=!!V&&V.enabled===!0,_e=Gs({bead_id:e,merge_sha:B.merge_sha,cleanup_cursor:B.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:B.repo_operations}),$e=Si(_e),je=o&&!_e&&(o.queueing??null)?o.queueing:null,ue=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!V&&V.tier==="merged",Le=a&&!!r&&!!V&&V.tier==="merged",St=Z&&(se||j||V?.reason==="base_behind"||V?.reason==="review_receipt_missing"||V?.reason==="review_receipt_stale"||V?.reason==="review_receipt_undetermined"||ue||Le),ht=a&&j&&u===!1,ut=qn(b,e,{external:a,merge_active:M||_e?.step==="merge",merge_queued:le,conflict_active:!!i,cleanup_active:$e,merged:!!r||V?.tier==="merged"}),mt=!!ut.operation,E=!ue&&!!r&&r.step==="repo_operations",ie=kv({continuation_required:K,queueing:je,merge_step:_e,conflict_badge:ke,conflict_live:H?.live===!0||i==="running",head_review:oe&&ee?{...ee,state:oe.state,failure_reason:oe.failure_reason}:null,auto_resolution:te,recovery:we,cleanup_failed:r,cleanup_label:r?Er(r.step):null,base_exception:g,conflicting:j,gate:V,receipt_check:X&&X.receipt_check?X.receipt_check:null,queue_failure:R,auto_skip:p,queued:le,queue_active:M,queue_position:l?l.position:0,activity:ke?null:o&&o.activity||null}),Te=ie?.live===!0&&ie.title?c`<span title=${ie.title}>${ie.label}</span>`:ie?.label||null;return{id:e,title:a?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&_e?.active!==!0?Ai(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,...Y?{dependency_chips:Y}:{},external:a,pr_number:ge&&typeof ge.number=="number"?ge.number:null,pr_url:ge&&typeof ge.url=="string"?ge.url:"",completion_badge:ie?.live!==!0&&ie?.title?ie.label:null,completion_title:ie?.title||"",completion_repair_pr_url:we?we.repair_pr_url:"",completion_repair_pr_number:we?we.repair_pr_number:null,badges:Te?[Te]:[],live_badge:ie?.live===!0?Te:null,usage:s,alert:ie?.alert===!0,merge_action:V?.tier==="merged"&&!ue&&!Le||E?!1:!le||K||Z,timeline_action:E,cancel_action:le&&!K,cancel_enabled:(!M||ye)&&!(we&&we.lock_actions),cancel_title:we&&we.lock_actions?`${we.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:M&&!ye?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ye?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ut,discard_action:ut.action,merge_step:_e,discard_enabled:ut.enabled,discard_title:ut.title,merge_enabled:!_e&&!je&&!i&&!mt&&!g&&!(we&&we.lock_actions)&&!ht&&!E&&(se||j||V?.reason==="base_behind"||V?.reason==="review_receipt_missing"||V?.reason==="review_receipt_stale"||V?.reason==="review_receipt_undetermined"||ue||Le||St||J&&!M),merge_label:K?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ue||Le?"\uC815\uB9AC \uC7AC\uAC1C":j&&!_e&&!ue?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":V?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":V?.reason==="review_receipt_missing"||V?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Z?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:mt?ut.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ut.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ut.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:K?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":je?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":_e?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${_e.label}`:Le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ht?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ue?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":j?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":V?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":se?`\uBA38\uC9C0 (${V.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:V&&V.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${V&&V.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function hl(e,t={}){let{transport:n,issueStores:r,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:a,getWorkspacePath:l,switchWorkspace:u,openDoc:p,doneRange:g,onDoneRangeChange:y}=t,b=r?vo(r,i):null,k=xo({transport:n,uiOrderStore:i}),L=null,B=[],Y=Qy(),le=null,K=null,M={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},R=tv(),F=g?Bn(g):rv(),X=new Map;function V(){let d=Pr.find(h=>h.value===F);return d?d.label:"\uC624\uB298"}let ge=iv(),H=!1,ee=new Set,oe=new Set,te=new Set,we=new Set,Pe=new Set,ye={},J=null,Z=0,ke=null,j=[];function se(d){return J===d?ye:{}}async function _e(){if(!n)return;let d=l?.()||"";if(J===d||ke&&ke.key===d&&ke.generation===Z)return;let h=++Z;ke={key:d,generation:h};let x=null;try{x=await Promise.resolve(n("get-session-defaults",{}))}catch(z){if(h!==Z)return;ke=null,zy("get-session-defaults failed: %o",z),Me();return}h===Z&&(ye=x&&typeof x.values=="object"&&x.values!==null?{...x.values}:{},J=d,ke=null,Me())}function $e(){J=null,Z+=1,_e()}let je=document.createElement("div");je.className="worker-console";let ue=document.createElement("div");ue.className="worker-top";let Le=document.createElement("div");Le.className="worker-drawer-overlay",Le.hidden=!0;let St=document.createElement("div");St.className="worker-drawer-overlay__backdrop";let ht=document.createElement("div");ht.className="worker-drawer-host";let ut=document.createElement("div");ut.className="worker-drawer-host",ut.hidden=!0,Le.append(St,ht,ut);let mt=document.createElement("div");mt.className="worker-lanes-host",je.append(ue,Le,mt),e.appendChild(je);let E=null,ie=Vr(ht,{transport:n,sessionLogStore:o,onClose:()=>{E=null,Le.hidden=!0,Me()}}),Te=hf(ut,{onClose:()=>{ut.hidden=!0,Le.hidden=!0,Me()}}),Ie=uf({getWorkspacePath:l||(()=>"")}),Ye=l&&l()||"",tt=pf({queueStore:s,transport:n,onChanged:()=>Me(),onOpenScript:(d,h)=>{Ie.open(d,h)}});function Je(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ti,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function dt(){let d=Je(),h=typeof d.serial_lane_count=="number"&&Number.isInteger(d.serial_lane_count)&&d.serial_lane_count>0?Math.min(d.serial_lane_count,5):0,x=Array.isArray(d.serial_lanes)?d.serial_lanes:[],z=[];for(let Fe of x){if(z.length>=h)break;!Fe||typeof Fe.id!="string"||!/^s[1-5]$/.test(Fe.id)||!Array.isArray(Fe.entries)||z.push({id:Fe.id,label:`\uC9C1\uB82C ${Fe.id.slice(1)}`,count:Fe.entries.length})}return z.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(d.queue)?d.queue:[]).length},...z]}function re(d){if(!le||!d.some(x=>x.id===le))return null;let h=dt();return h?{bead_id:le,lanes:h}:null}function G(){let d=Je();return typeof d.revision=="number"?d.revision:0}function he(d){d&&d.queue&&s&&s.set(d.queue)}function it(){let d=Je().queue;return Array.isArray(d)?d.length:0}async function Xe(d,h,x){if(!n)return;let z=()=>({bead_id:d,...h==="parallel"?{}:{lane:h},...x===void 0?{}:{index:x},expected_revision:G()}),de=await n("worker-queue-place",z());he(de),de&&de.conflict&&await n("worker-queue-place",z()).then(he)}async function Ce(d,h,x){if(!n)return;let z=()=>({bead_id:d,...h==="parallel"?{}:{lane:h},to_index:x,expected_revision:G()}),de=await n("worker-queue-reorder",z());he(de),de&&de.conflict&&await n("worker-queue-reorder",z()).then(he)}async function Ne(d){if(!n)return;let h=await n("worker-queue-remove",{bead_id:d,expected_revision:G()});he(h),h&&h.conflict&&await n("worker-queue-remove",{bead_id:d,expected_revision:G()}).then(he)}async function at(d){if(!n||!d)return;let h=await n("worker-attempt-pause",{attempt_id:d});h&&h.paused===!1&&h.reason&&pe(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function pt(d){if(!n||!d)return;let h=await Ur();if(h===null)return;let x=async(de={})=>await n("worker-attempt-resume",{attempt_id:d,expected_revision:G(),...h!==""?{instructions:h}:{},...de}),z=await x();he(z),z&&z.conflict&&(z=await x(),he(z)),z=await Kn(z,(de,Fe)=>x({continuation:de,decision_token:Fe}),{onResult:he,refresh:()=>x()}),z&&z.resumed===!1&&!z.conflict&&z.reason&&pe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${z.reason}`,"error",2400)}async function lt(d){if(!n||!d)return;let h=await n("worker-attempt-dismiss",{attempt_id:d,expected_revision:G()});he(h),h&&h.conflict&&(h=await n("worker-attempt-dismiss",{attempt_id:d,expected_revision:G()}),he(h)),h&&h.dismissed===!1&&!h.conflict&&h.reason&&pe(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function $t(d,h,x=!0){if(!n)return null;let z=n,de=await z(d,{...h,expected_revision:G()});return he(de),de&&de.conflict&&x&&(de=await z(d,{...h,expected_revision:G()}),he(de)),de}async function Kt(d){if(!n||!d)return;let h=Je().merge_queue?.find(z=>z.bead_id===d)?.continuation_action;if(h?.mismatch&&h.continuation===null){await Ut(d,h.mismatch);return}ee.add(d),Me();let x;try{x=await $t("worker-merge-queue-add",{bead_id:d})}catch{pe("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ee.delete(d),Me()}if(!(!x||x.applied)){if(x.conflict){pe("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}pe(fv(x.reason),"error",2400)}}async function Bt(d){if(!(!n||!d||oe.has(d))){oe.add(d),Me();try{let h=await n("worker-cleanup-retry",{bead_id:d,expected_revision:G()});he(h),h&&!h.retried&&!h.conflict&&h.reason&&pe(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${h.reason}`,"error",2400)}finally{oe.delete(d),Me()}}}async function Ut(d,h){let x=await Kn({continuation_mismatch:h},(de,Fe)=>$t("worker-merge-queue-add",{bead_id:d,continuation:de,decision_token:Fe},!1)),z=x?.queue?.merge_queue?.find(de=>de.bead_id===d)?.continuation_action;if(x?.applied!==!0&&z?.continuation===null&&z.mismatch){await Ut(d,z.mismatch);return}x&&x.applied===!1&&!x.conflict&&pe("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function It(d){if(!n)return;let h=await $t("worker-merge-auto-toggle",{on:d});!h||h.conflict||pe(d?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",d?"success":"info",2400)}async function yt(d){if(!n||!d)return;let h=await $t("worker-merge-queue-remove",{bead_id:d});h&&!h.conflict&&!h.applied&&h.reason==="merge_active"&&pe("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function He(){await $t("worker-merge-queue-remove",{all:!0})}async function C(d,h=null,x="unmerged",z=null){if(!n||!d)return;let de=Ds(d,x);if(!(!!z||typeof globalThis.confirm!="function"||globalThis.confirm(de)))return;let Qe=await n("worker-discard",{bead_id:d,...h?{attempt_id:h}:{},...z?{operation_id:z}:{},expected_revision:G()});if(he(Qe),Qe&&Qe.conflict&&(Qe=await n("worker-discard",{bead_id:d,...h?{attempt_id:h}:{},...z?{operation_id:z}:{},expected_revision:G()}),he(Qe)),Qe&&Qe.discarded===!0){pe(di(Qe),"success",5e3);return}if(Qe&&Qe.reason){pe(`\uD3D0\uAE30 \uC2E4\uD328: ${Qe.reason}`,"error",2800);return}if(Qe&&Qe.accepted&&Qe.pending==="merged_revert"){pe("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Qe&&Qe.accepted&&!Qe.discarded){pe(`\uD3D0\uAE30 \uC9C4\uD589: ${Qe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Qe&&!Qe.conflict&&pe("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Q(d,h,x){if(!(!n||!h||!x||we.has(h))){we.add(h),Me();try{let z=await n(d,{bead_id:h,action_id:x,expected_revision:G()});he(z),z?.conflict?pe("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!z?.ok&&z?.reason&&pe(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(z.reason)}`,"error",2800)}finally{we.delete(h),Me()}}}async function fe(d,h){if(!n||!h||te.has(h))return;te.add(h),Me();let x;try{let z=async(de={})=>await n(d,{bead_id:h,expected_revision:G(),...de});x=await z(),he(x),x&&x.conflict&&(x=await n(d,{bead_id:h,expected_revision:G()}),he(x)),d==="worker-revise-fix"&&(x=await Kn(x,(de,Fe)=>z({continuation:de,decision_token:Fe}),{onResult:he,refresh:()=>z()}))}finally{te.delete(h),Me()}if(!(!x||x.conflict)){if(x.ok){pe(d==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}pe(`\uCC98\uBD84 \uAC70\uBD80: ${x.reason||""}`,"error",3e3)}}async function T(d){if(!n)return;let h=await n("worker-automation-toggle",{on:d,expected_revision:G()});he(h),h&&h.conflict&&await n("worker-automation-toggle",{on:d,expected_revision:G()}).then(he)}async function W(d){if(!n||!d)return;let h=await n("worker-repo-operation-dismiss",{operation_id:d});he(h),h&&h.ok===!1&&pe(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${h.reason||""}`,"error",3e3)}async function Re(d){if(!n||!Number.isFinite(d))return;let h=Math.max(Ti,Math.floor(d)),x=await n("worker-queue-set-slots",{slots:h,expected_revision:G()});he(x),x&&x.conflict&&await n("worker-queue-set-slots",{slots:h,expected_revision:G()}).then(he)}async function qe(d){if(!n||!Number.isInteger(d)||d<1||d>yf)return;let h=Je(),x=(Array.isArray(h.serial_lanes)?h.serial_lanes:[]).slice(d).reduce((Fe,Qe)=>Fe+(Array.isArray(Qe?.entries)?Qe.entries.length:0),0),z=()=>({count:d,expected_revision:G()}),de=await n("worker-queue-set-serial-lane-count",z());he(de),de&&de.conflict&&(de=await n("worker-queue-set-serial-lane-count",z()),he(de)),de&&de.applied&&x>0&&pe(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${x}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let xe="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Ze(d,h){let x=Ga(d,h.id,M);return{id:h.id,title:h.title,location_label:h.location_label,prefixes:h.prefixes,action:x.kind==="note"?{kind:"note",text:x.text}:x.kind==="disabled"?{kind:"disabled",label:xe,title:x.title}:{kind:"place",label:xe,title:x.title}}}function ct(d,h){if(!K||K.bead_id!==d)return null;let x=K.counterpart_id,z=h.filter(de=>de.id===x);return z.length===0?null:{rows:z.map(de=>Ze(d,de))}}async function We(d,h){let x=Ga(d,h,M);if(K=null,x.kind!=="ops"){Me();return}let z=G();for(let de of x.ops){let Fe=await Ae(de,z);if(Fe===null)break;z=Fe}Me()}async function Ae(d,h){if(!n)return null;try{let x=await n("worker-queue-place",{bead_id:d.bead_id,lane:d.lane,index:d.index,expected_revision:h});if(he(x),x&&x.conflict)return pe("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!x||x.applied!==!0)return pe(x&&typeof x.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${x.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let z=x.queue?x.queue.revision:void 0;return typeof z!="number"?(pe("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):z}catch(x){return pe(x instanceof Error&&x.message?x.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function O(){let d=Je(),h=b?b.selectBoardColumn(Hy,"ready"):[],x=b?b.selectBoardColumn(Gy,"blocked"):[],z=b?b.selectBoardColumn(Yy,"closed"):[],de=b?b.selectBoardColumn(Ky,"in_progress"):[],Fe=b?b.selectBoardColumn(Vy,"resolved"):[],Qe=ko([...h,...x,...de,...Fe,...z]),qt=new Map;for(let _ of[...h,...x,...de])_&&_.id&&!qt.has(_.id)&&qt.set(_.id,_);let zt={...se(l?.()||"")};for(let _ of["orchestration_model","orchestration_effort","orchestration_speed"]){let I=d[_];typeof I=="string"&&(zt[_]=I)}function fn(_,I){let ce=qt.get(_);if(!ce)return null;let Ue=ce.metadata&&typeof ce.metadata=="object"?ce.metadata:{},Ve=ce.workflow?.route,Vt=Ue.route,Dt=wf(Ve)?Ve:wf(Vt)?Vt:null;return bn({pin:Ue,global:zt,execution_defaults:d.execution_defaults??null,runner_catalog:d.runner_catalog??null,route:Dt,controller_runtime:I})}function vn(_){let I=_.runner||null,ce=fn(_.bead_id,I),Ue=Ns(_),Ve=ce?cr(ce,I):null;return Ue||Ve?{orchestration:Ue,worker:Ve}:null}let _n=new Map;function Be(_){if(_n.has(_))return _n.get(_)??null;let I=fn(_,null),ce=null;if(I){let Ue=Nn(d.runner_catalog??null,I.orchestration_model.value??""),Ve=Ue===null?I:fn(_,Ue),Vt=Ar(Ve,d.runner_catalog??null),Dt=cr(Ve,Ue);ce=Vt||Dt?{orchestration:Vt,worker:Dt}:null}return _n.set(_,ce),ce}function $(_){let I=$o(Qe,_);return I.total===0?null:I}let ae=d.bead_titles||{},P=new Map;for(let[_,I]of Object.entries(ae))typeof I=="string"&&I.length>0&&P.set(_,I);for(let _ of[...h,...x])P.set(_.id,_.title||_.id);let Se=new Map;for(let _ of[...h,...x,...de,...Fe,...z])_&&_.id&&typeof _.from_id=="string"&&Se.set(_.id,_.from_id);let st=new Map;for(let _ of[...h,...x,...de,...Fe,...z])_&&_.id&&typeof _.priority=="number"&&st.set(_.id,_.priority);let nt=d.bead_times&&typeof d.bead_times=="object"&&!Array.isArray(d.bead_times)?d.bead_times:{},bt=d.bead_labels&&typeof d.bead_labels=="object"&&!Array.isArray(d.bead_labels)?d.bead_labels:{},Ke=d.bead_workflow&&typeof d.bead_workflow=="object"&&!Array.isArray(d.bead_workflow)?d.bead_workflow:{},Ct=new Map;for(let[_,I]of Object.entries(bt))Array.isArray(I)&&Ct.set(_,_l(I));for(let _ of[...h,...x]){let I=_.labels;Array.isArray(I)&&!Ct.has(_.id)&&Ct.set(_.id,_l(I))}let f=d.bead_blocked_by&&typeof d.bead_blocked_by=="object"&&!Array.isArray(d.bead_blocked_by)?d.bead_blocked_by:{},m=d.blocker_workspaces&&typeof d.blocker_workspaces=="object"&&!Array.isArray(d.blocker_workspaces)?d.blocker_workspaces:{},v=new Map;for(let[_,I]of Object.entries(nt))I&&typeof I=="object"&&v.set(_,I);for(let _ of[...h,...x])v.set(_.id,{created_at:_.created_at,updated_at:_.updated_at});let w=_=>v.get(_)||{},q=d.pr_wait||[],U=d.pr_observations||{},D=d.pr_activity||{},ne=d.cleanup_failed||{},De=Object.entries(ne).map(([_,I])=>({bead_id:_,step:I&&I.step?I.step:"",reason:I&&I.reason?I.reason:"",at:I&&typeof I.at=="number"?I.at:null,detail:I&&typeof I.detail=="string"?I.detail:null,output_tail:I&&typeof I.output_tail=="string"&&I.output_tail?I.output_tail:void 0,log_path:I&&typeof I.log_path=="string"&&I.log_path?I.log_path:void 0,retry_count:I&&typeof I.retry_count=="number"&&Number.isInteger(I.retry_count)&&I.retry_count>0?I.retry_count:0,failure_code:I&&typeof I.failure_code=="string"?I.failure_code:void 0})),ot=d.queue||[],an=new Set([...ot.map(_=>_.bead_id),...(Array.isArray(d.serial_lanes)?d.serial_lanes:[]).flatMap(_=>(Array.isArray(_?.entries)?_.entries:[]).map(I=>I.bead_id)),...q.map(_=>_.bead_id),...d.done.map(_=>_.bead_id)]),Ht=new Set(x.map(_=>_.id)),er=i?i.get()?.order||{}:{},jn=new Set,kl=[];for(let _ of[...h,...x])an.has(_.id)||jn.has(_.id)||cv(_)||(jn.add(_.id),kl.push(_));B=lv(kl,R,er);let Uf=d.admission||{},$l=_=>{let I=Uf[_];if(!I)return"";if(I.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ce=typeof I.reason=="string"?I.reason:"",Ue=ce.indexOf(":");return Ue>0&&Ue<ce.length-1?`\u26D4 ${ce.slice(0,Ue)} (${ce.slice(Ue+1)})`:`\u26D4 ${ce}`},xl=new Map,Wf=B.map(_=>{let I=Es(_),ce=I.evidence==="published",Ue=_.workflow?.route==="quick_fix"||_.metadata&&_.metadata.route==="quick_fix",Ve=!Object.hasOwn(_,"description")||typeof _.description=="string"&&_.description.trim().length>0,Vt=Object.hasOwn(_,"labels")&&sf(_.labels),Dt=Vt||!Object.hasOwn(_,"labels")?"":of(_.labels,_.metadata),Or=Dt.length>0,Rt=!Vt&&(Ue?Ve:ce&&!I.conflict),oo=Ht.has(_.id),zn=[];if(oo){let io=uv(_);io.length>0?xl.set(_.id,io):zn.push(dv)}Ue&&!Ve?zn.push("missing_description"):!Ue&&I.conflict?zn.push("spec_id_conflict"):!Ue&&I.evidence==="none"?zn.push("spec \uC5C6\uC74C"):!Ue&&I.evidence==="draft"&&zn.push("spec \uBBF8\uBC1C\uD589(draft)");let Lr=$l(_.id);return Lr&&zn.push(Lr),{id:_.id,title:_.title||_.id,reason:zn.join(" \xB7 "),draggable:Rt,lane:"candidate",created_at:_.created_at,updated_at:_.updated_at,workflow:_.workflow,is_quick_fix:Ue,status:_.status,worker_ineligible:Vt,session_preferred:Or,session_preferred_reason:Dt,blocked:oo,has_spec:ce,exec_chips:Be(_.id),from_id:_.from_id||void 0,priority:st.get(_.id)}}),Ci=Jy(Wf,Y),Ri=Ci.visible,zf=d.revise_parked||{},Qs=d.discard_operations&&typeof d.discard_operations=="object"&&!Array.isArray(d.discard_operations)?d.discard_operations:{},Hf=_=>{let I=Ke[_]?.chips?.pr;return I&&typeof I.number=="number"&&typeof I.url=="string"?{pr_number:I.number,pr_url:I.url}:{}},Oi=(_,I)=>_.map((ce,Ue)=>{let Ve=I!=="done",Vt=I!=="done"&&I!=="queue",Dt=Ve?zf[ce.bead_id]:null,Or=Ve?qn(Qs,ce.bead_id):null,Rt=Or?.operation?Or:null,oo=Ve&&Ct.get(ce.bead_id)===!0,zn=d.admission&&typeof d.admission=="object"?d.admission[ce.bead_id]:null,Lr=Ve?Td(zn,!!Rt||we.has(ce.bead_id)):null,io=Ve&&!Lr?$l(ce.bead_id):null,s_=Ve?[io]:[],o_=[];return{id:ce.bead_id,title:P.get(ce.bead_id)||ce.bead_id,reason:s_.filter(Boolean).join(" \xB7 "),draggable:Ve&&!Rt&&!Lr,done:I==="done",lane:I,seq:Vt?Ue+1:void 0,worker_serial:oo,discard:Rt,stale_work:Lr,badges:[...o_,...Dt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...I==="done"?li(d.attempts||{},ce.bead_id):[]],alert:!!Dt,revise_action:!!Dt,revise_enabled:!!Dt&&!Rt&&!te.has(ce.bead_id),revise_title:Dt?Dt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Dt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:I==="done"?Sn(d.attempts||{},ce.bead_id):null,work_ms:I==="done"?ci(d.attempts||{},ce.bead_id):null,done_at:I==="done"&&typeof ce.added_at=="number"?ce.added_at:void 0,exec_chips:Ve?Be(ce.bead_id):null,workflow:Ve&&Ke[ce.bead_id]||null,...I==="done"?Hf(ce.bead_id):{},from_id:Se.get(ce.bead_id)||void 0,priority:st.get(ce.bead_id),...w(ce.bead_id)}}),Tr=d.attempts?Object.values(d.attempts).filter(Sr):[],Li=new Set;for(let _ of Tr)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&Li.add(_.resumed_from);let Al=new Map;for(let _ of Tr)Al.set(_.bead_id,_.attempt_id);let ns=new Map;for(let _ of Tr)ns.set(_.attempt_id,_);function Ii(_){let I=new Set,ce=_;for(;ce&&!I.has(ce.attempt_id);){if(ce.conflict_resolution===!0)return!0;I.add(ce.attempt_id),ce=typeof ce.resumed_from=="string"&&ce.resumed_from.length>0&&ns.get(ce.resumed_from)||null}return!1}let Xs=typeof d.declared_base=="string"?d.declared_base:null;function Gf(_){let I=null;for(let ce of Tr)!ce||ce.bead_id!==_||Ii(ce)||(I===null||(typeof ce.started_at=="number"?ce.started_at:0)>=(typeof I.started_at=="number"?I.started_at:0))&&(I=ce);return I&&typeof I.target_base=="string"?I.target_base:null}let Pi=[],Js=[],Kf=rf(d),Sl=_=>{let I=typeof _.session_id=="string"&&_.session_id.length>0,ce=Li.has(_.attempt_id);return{eligible:I&&!ce,reason:I?ce?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Cn=null;for(let _ of Tr){let I=_.status==="paused"&&!Li.has(_.attempt_id);if(_.status==="running"||I)Js.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:P.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,paused:I,conflict_resolution:Ii(_),base_exception:gl(Xs,_.target_base),can_pause:typeof _.session_id=="string"&&_.session_id.length>0,discard:qn(Qs,_.bead_id,{attempt_id:_.attempt_id}),workflow:Ke[_.bead_id]||null,priority:st.get(_.bead_id),usage:Sn(d.attempts||{},_.bead_id),rollup:$(_.bead_id),rollup_expanded:Pe.has(_.bead_id),exec_chips:vn(_),...w(_.bead_id)});else if((_.status==="failed"||_.status==="orphaned")&&Kf(_)){let ce=Sl(_);Pi.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:P.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,failed:!0,status:_.status,status_label:_.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:qn(Qs,_.bead_id,{attempt_id:_.attempt_id}),resume_eligible:ce.eligible,resume_reason:ce.reason,conflict_resolution:Ii(_),base_exception:gl(Xs,_.target_base),workflow:Ke[_.bead_id]||null,priority:st.get(_.bead_id),usage:Sn(d.attempts||{},_.bead_id),rollup:$(_.bead_id),rollup_expanded:Pe.has(_.bead_id),exec_chips:vn(_),...w(_.bead_id)}),Cn=_}}let El=new Set([...Pi,...Js].map(_=>_.bead_id)),Tl=new Map;for(let _ of Array.isArray(d.session_active)?d.session_active:[]){let I=_&&_.bead_id;if(!(typeof I!="string"||I.length===0||El.has(I))){if(El.add(I),Array.isArray(_.blocked_by)){let ce=_.blocked_by.filter(Ue=>typeof Ue=="string"&&Ue.length>0);ce.length>0&&Tl.set(I,ce)}Js.push({bead_id:I,attempt_id:null,kind:"session",title:_.title||P.get(I)||I,status:"in_progress",started_at:On(_.started_at)??On(_.updated_at),updated_at:On(_.updated_at),workflow:_.workflow||null,session_refs:Array.isArray(_.session_refs)?_.session_refs:[],priority:st.get(I),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1})}}let Cr=[...Pi,...Js].map(_=>{let I=ns.get(_.attempt_id),ce=I?.quickfix_landing;if(I?.quickfix_lane!==!0||!ce||typeof ce!="object")return _;let Ue=typeof ce.reason=="string"&&ce.reason.length>0?ce.reason:null,Ve=Gs({bead_id:I.bead_id,merge_sha:ce.head_sha,cleanup_cursor:ce.cursor,cleanup_failed:Ue?{step:ce.cursor,reason:Ue}:null,repo_operations:Array.isArray(d.repo_operations)?d.repo_operations:[]});return Ve?{..._,landing:Ve}:_}),Cl=null;if(Cn){let _=Sl(Cn),I=Cn.cause_detail;Cl={bead_id:Cn.bead_id,repo:Cn.repo||"",reason:Cn.cause||Cn.status,cause_detail:I&&typeof I.reason=="string"?{reason:I.reason,command:typeof I.command=="string"?I.command:null}:null,resume_attempt_id:Cn.attempt_id,resume_eligible:_.eligible,resume_reason:_.reason,discard:qn(Qs,Cn.bead_id,{attempt_id:Cn.attempt_id})}}let Rl=new Set(Cr.map(_=>_.bead_id)),Di=Array.isArray(d.merge_queue)?d.merge_queue:[],Ol=new Map,Ll=new Map,Il=new Map,Pl=new Map,Dl=new Map;Di.forEach((_,I)=>{_&&typeof _.bead_id=="string"&&(Ol.set(_.bead_id,I+1),Ll.set(_.bead_id,_.resolution),Il.set(_.bead_id,_.continuation_action||null),Pl.set(_.bead_id,_.head_review||null),Dl.set(_.bead_id,_.authority||null))});let Rr=d.merge_queue_state||{active:null,failures:{}},Vf=Rr.failures||{},Ml=Rr.waiting&&typeof Rr.waiting.bead_id=="string"&&typeof Rr.waiting.reason=="string"?Rr.waiting:null,Yf=d.auto_merge_skips||{},Nl=_=>{let I=Yf[_];if(!I)return null;let ce=U[_],Ue=ce&&ce.pr?ce.pr.head_sha:null;return Ue&&Ue===I.head_sha?I.reason||"":null},eo=new Map;for(let _ of Cr)_.failed!==!0&&_.conflict_resolution&&(_.paused?eo.has(_.bead_id)||eo.set(_.bead_id,"paused"):eo.set(_.bead_id,"running"));let ql=Cr.filter(_=>_.kind!=="session"&&!_.paused&&_.failed!==!0).length,Fl=(d.workspace_info||{}).slots,jl=typeof Fl=="number"?Fl:typeof d.slots=="number"?d.slots:Ti,Zf=ql>jl,to=br(F),Qf=(Array.isArray(d.done)?d.done.slice():[]).filter(_=>to===void 0||typeof _.added_at!="number"||_.added_at>=to).sort((_,I)=>(I.added_at||0)-(_.added_at||0)),rs=Oi(Qf,"done"),Xf=new Set((Array.isArray(d.done)?d.done:[]).map(_=>_?.bead_id).filter(_=>typeof _=="string")),Bl=[],Jf=l?.()||"";for(let _ of z){let I=On(_.closed_at);if(typeof _.id!="string"||Xf.has(_.id)||I===null||to!==void 0&&I<to||typeof _.comment_count!="number"||_.comment_count<=0)continue;let ce=`${Jf}\0${_.id}\0${String(_.updated_at)}\0${_.comment_count}`,Ue=X.get(ce);if(Ue===void 0&&n&&(X.set(ce,"pending"),Promise.resolve(n("get-comments",{id:_.id})).then(Ve=>{let Vt=Array.isArray(Ve)&&Ve.some(Dt=>Vo(typeof Dt?.text=="string"?Dt.text:"")?.lane==="session");X.set(ce,Vt?"session":"not-session"),Me()}).catch(()=>{X.set(ce,"failed"),Me()})),Ue==="session"){let Ve=On(_.started_at);Bl.push({id:_.id,title:_.title||_.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:Ve!==null&&I>=Ve?I-Ve:null,work_kind:"session",done_at:I,created_at:_.created_at,updated_at:_.updated_at})}}rs.push(...Bl),rs.sort((_,I)=>(I.done_at||0)-(_.done_at||0));let no={};for(let _ of Wn)no[_]=0;let Ul=!1,Wl=0,Mi=0,zl=0;for(let _ of rs){let I=_.usage;if(I&&typeof I=="object"){let ce=!1;for(let Ue of Wn)Number.isFinite(I[Ue])&&(no[Ue]+=I[Ue],Ul=!0,ce=!0);ce&&(Mi+=1,Number.isFinite(I.total_cost_usd)&&(Wl+=I.total_cost_usd,zl+=1))}}Mi>0&&zl===Mi&&(no.total_cost_usd=Wl);let Hl=rs.map(_=>_.usage).filter(_=>_&&typeof _=="object"&&_.providers),e_=Hl.length>0?sn(Po(Hl)):Ul?Vn(no):null,Gl=d.lane_states&&typeof d.lane_states=="object"&&!Array.isArray(d.lane_states)?d.lane_states:{},Kl=Array.isArray(d.serial_lanes)?d.serial_lanes:[],Vl=_=>{if(q.some(Ue=>Ue.bead_id===_))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let I=Tr.filter(Ue=>Ue&&Ue.bead_id===_),ce=I.length>0?I[I.length-1].status:null;return ce==="failed"||ce==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ce==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ro=Kl.filter(_=>_&&typeof _.id=="string"&&Array.isArray(_.entries)).map((_,I)=>{let ce=Gl[_.id]||{},Ue=new Map((Array.isArray(ce.corrections)?ce.corrections:[]).filter(Rt=>Rt&&typeof Rt.bead_id=="string"&&typeof Rt.after=="string").map(Rt=>[Rt.bead_id,Rt.after])),Ve=Array.isArray(ce.occupied_by)?ce.occupied_by.filter(Rt=>typeof Rt=="string"):[],Vt=new Set(Ve),Dt=Oi(_.entries.filter(Rt=>!Rl.has(Rt.bead_id)&&!Vt.has(Rt.bead_id)),_.id).map(Rt=>Ue.has(Rt.id)?{...Rt,badges:[`\u{1F517} ${Ue.get(Rt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...Rt.badges]}:Rt),Or=Ve.map(Rt=>({id:Rt,title:P.get(Rt)||Rt,draggable:!1,lane:_.id,ghost:!0,badges:[Vl(Rt)]}));return{id:_.id,index:I+1,rows:[...Or,...Dt],occupied:Ve.length>0,badge:Ve.length>0?Vl(Ve[0]):"\uB300\uAE30",cycle:ce.cycle===!0}}),Yl=typeof d.serial_lane_count=="number"?d.serial_lane_count:ro.length,Ni=Oi(ot.filter(_=>!Rl.has(_.bead_id)),"queue"),Zl=new Map,Ql=new Set;for(let[_,I]of Object.entries(Gl)){if(!/^s[1-5]$/.test(_))continue;let ce=I&&Array.isArray(I.occupied_by)?I.occupied_by:[];for(let Ue of ce)typeof Ue=="string"&&Zl.set(Ue,_);ce.length>0&&Ql.add(_)}let tr=[];for(let _ of Cr)typeof _.bead_id=="string"&&tr.push({id:_.bead_id,title:P.get(_.bead_id)||_.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Zl.get(_.bead_id)??null});for(let _ of q){let I=_&&_.bead_id;typeof I!="string"||I.length===0||tr.push({id:I,title:P.get(I)||I,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let _ of ro)for(let I of _.rows)I.ghost!==!0&&tr.push({id:I.id,title:I.title,location_label:`${_.id} #${I.seq??""}`.trim(),kind:"serial",lane_id:_.id});Ni.forEach((_,I)=>{tr.push({id:_.id,title:_.title,location_label:`#${I+1}`,kind:"parallel",lane_id:null})});for(let _ of Ri)tr.push({id:_.id,title:_.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let Xl={};for(let _ of Kl)_&&typeof _.id=="string"&&Array.isArray(_.entries)&&(Xl[_.id]=_.entries.length);let qi=new Map;for(let _ of tr)qi.has(_.id)||qi.set(_.id,_);M={members_by_id:qi,serial_raw_lengths:Xl,serial_lane_count:Yl,occupied_lanes:Ql};let t_=Ld(d.bead_scope,tr),so=new Map;for(let[_,I]of Tl)so.set(_,I);for(let[_,I]of xl)so.set(_,I);for(let[_,I]of Object.entries(f))Array.isArray(I)&&so.set(_,I.filter(ce=>typeof ce=="string"&&ce.length>0));let n_=mp(so,tr,m),Fi=(_,I=null)=>{let ce=t_.get(_),Ue=n_.get(_)||null,Ve=ce&&ce.overlaps.length>0?ce.overlaps:null,Vt=!!ce&&ce.scope_missing;if(!Ue&&!Ve&&!Vt)return I;let Dt=Ve?ct(_,Ve):null;return{...I||{},...Ue?{predecessors:Ue}:{},...Ve?{overlaps:Ve}:{},...Vt?{scope_missing:!0}:{},...Dt?{popover:Dt}:{}}},ji=_=>{let I=Fi(_.id,_.dependency_chips||null);return I&&(_.dependency_chips=I),_};for(let _ of Ni)ji(_);for(let _ of ro)for(let I of _.rows)I.ghost!==!0&&ji(I);for(let _ of Ri)ji(_);let Jl=new Map;for(let _ of Cr){let I=typeof _.bead_id=="string"?_.bead_id:"";if(I.length===0)continue;let ce=_.kind==="session",Ue=Fi(I),Ve=typeof _.attempt_id=="string"&&_.attempt_id.length>0?ns.get(_.attempt_id):void 0,Vt=Ve&&Ve.last_activity&&typeof Ve.last_activity=="object"?Ve.last_activity:null,Dt=Ve&&Array.isArray(Ve.legs)?Ve.legs:[];!Ue&&!Vt&&Dt.length===0&&!ce||Jl.set(I,{...Vt?{last_activity:Vt}:{},...Dt.length>0?{legs:Dt}:{},...Ue?{dependency_chips:Ue}:{}})}let r_=q.map(_=>$v(_.bead_id,P.get(_.bead_id)||_.bead_id,U,ne[_.bead_id]||null,Sn(d.attempts||{},_.bead_id),D[_.bead_id]||(ee.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:oe.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),eo.get(_.bead_id)||null,_.external===!0,{position:Ol.get(_.bead_id)||0,active:Rr.active===_.bead_id,failure:Vf[_.bead_id]||null,waiting:Ml?.bead_id===_.bead_id?Ml.reason:null,resolution:Ll.get(_.bead_id),continuation_action:Il.get(_.bead_id),head_review:Pl.get(_.bead_id)||null,authority:Dl.get(_.bead_id)||null},_.wt_present!==!1,d.auto_merge===!0?Nl(_.bead_id):null,gl(Xs,Gf(_.bead_id)),d.completion_status&&typeof d.completion_status=="object"&&!Array.isArray(d.completion_status)&&d.completion_status[_.bead_id]||null,d.discard_operations&&typeof d.discard_operations=="object"&&!Array.isArray(d.discard_operations)?d.discard_operations:{},ns.get(Al.get(_.bead_id)||"")?.worker_serial===!0,d.auto_merge===!0,{merge_sha:_.merge_sha,cleanup_cursor:_.cleanup_cursor,repo_operations:Array.isArray(d.repo_operations)?d.repo_operations:[]},Fi(_.bead_id))).map(_=>({..._,workflow:Ke[_.id]||null,priority:st.get(_.id),...w(_.id)}));return{queue:d,idToTitle:P,candidates:Ri,candidate_hidden:{blocked:Ci.hidden_blocked,spec:Ci.hidden_spec},running:Cr,live_count:ql,slots:jl,over_cap:Zf,failure:Cl,waiting:Ni,serial_lanes:ro,serial_lane_count:Yl,running_overlays:Jl,pr_wait:r_,merge_queue_length:Di.length,merge_queue_running:Di.length>0,auto_excluded:q.map(_=>_.bead_id).filter(_=>Nl(_)!==null),declared_base:Xs,done:rs,token_total:e_,cleanup_failures:De,repo_operations:Array.isArray(d.repo_operations)?d.repo_operations:[]}}function N(d){let h=d.waiting.length>0?d.waiting[0].id:"\u2014",x=c`<button
      type="button"
      class="worker-play${d.queue.auto_advance?" is-active":""}"
    >
      ${d.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,z=ft(d),de=d.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Fe=d.queue.auto_advance?0:(Array.isArray(d.queue.queue)?d.queue.queue:[]).filter(Be=>Be&&typeof Be.armed_by_lane=="string"&&Be.armed_by_lane.length>0).length,Qe=Fe>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Fe}건 진행 중</span
          >`:"",qt=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${d.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${d.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${V()} 완료 <b>${d.done.length}</b></span
      >`,zt=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${d.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${d.declared_base||"?"}</span
    >`,fn=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ti}
          step="1"
          .value=${String(d.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:yf},(Be,$)=>$+1).map(Be=>c`<option
                value=${String(Be)}
                ?selected=${d.serial_lane_count===Be}
              >
                ${Be}
              </option>`)}
        </select>
      </label> `,vn=jd({failure:d.failure}),_n=Ed(d.repo_operations,d.cleanup_failures);return H?c`<div class="worker-ribbon">
          ${x} ${z}
          <div class="worker-kpi worker-kpi--ribbon">
            ${de}${Qe}${qt}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${fn}</div>
          <div class="worker-kpi">${zt}</div>
        </div>
        ${_n}${tt.template()}${vn}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${x}${z}${fn}</div>
        <div class="worker-kpi">
          ${de}${Qe}${qt}${zt}
          ${(Array.isArray(d.token_total)?d.token_total:d.token_total?[{label:d.token_total,tooltip:`${V()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Be=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Be.tooltip}
                >${V()} 완료 · 누적 ${Be.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${h}</b></span
          >
        </div>
      </div>
      ${_n}${tt.template()}${vn}`}function be(d){if(d.running.length===0&&d.pr_wait.length===0)return"";let h=d.running.some(x=>x.kind!=="session"&&!x.paused&&x.failed!==!0);return c`<section
      class="worker-now${h?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${d.running.length+d.pr_wait.length}</span
        >
      </header>
      ${d.running.length>0?Qa(d.running,Date.now(),E,d.running_overlays):""}
      ${d.pr_wait.map(x=>ir(x))}
    </section>`}function ze(d){let h=d.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${Y.show_blocked}
        />
        🔒 blocked${h.blocked>0?` ${h.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ev.map(x=>c`<button
              type="button"
              class="worker-filter__chip${Y.spec===x.value?" is-active":""}"
              data-spec=${x.value}
              aria-pressed=${Y.spec===x.value?"true":"false"}
            >
              ${x.label}
            </button>`)}
        ${h.spec>0?c`<span class="worker-filter__hidden">숨김 ${h.spec}</span>`:""}
      </div>
    </div>`}function ve(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${R}
    >
      ${Ef.map(d=>c`<option value=${d.value} ?selected=${R===d.value}>
            ${d.label}
          </option>`)}
    </select>`}function Ge(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${F}
      >
        ${Pr.map(d=>c`<option value=${d.value} ?selected=${F===d.value}>
              ${d.label}
            </option>`)}
      </select>
    </div>`}function vt(d){let h=c`<span
      class="worker-lane__badge${d.occupied?" worker-lane__badge--held":""}"
      >${d.badge}</span
    >`,x=d.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return Tn({id:`worker-pane-lane-${d.id}`,lane:d.id,title:`\uC9C1\uB82C ${d.index}`,items:d.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:h,controls:x})}function ft(d){let h=d.queue.auto_merge===!0;if(d.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${h?" is-active":""}"
        title=${h?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${h?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${d.merge_queue_length}
      </button>`;if(h)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let x=new Set(d.auto_excluded),z=d.pr_wait.filter(de=>de.merge_action&&de.merge_enabled&&!x.has(de.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${z>0?` ${z}`:""}
    </button>`}function Et(d){let h=Tn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:d.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:ve(),controls:ze(d),place_menu:re(d.candidates),onOpenDoc:p?(x,z)=>p(z):void 0});return H?c`<div class="worker-lanes worker-lanes--mobile">
        ${be(d)}
        ${Tn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:d.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:ge.queue,preview:kf(d.waiting)})}
        ${d.serial_lanes.map(x=>vt(x))}
        ${h}
        ${Tn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:d.done,empty:`${V()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ge(),collapsible:!0,collapsed:ge.done,preview:Array.isArray(d.token_total)?d.token_total.map(x=>x.label).join(" \xB7 "):d.token_total||kf(d.done)})}
      </div>`:c`<div class="worker-lanes">
      ${h}
      <div class="worker-wait">
        ${Tn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:d.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${d.serial_lanes.map(x=>vt(x))}
      </div>
      ${Tn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${d.slots}`,items:d.running,live:d.running.some(x=>x.kind!=="session"&&!x.paused&&x.failed!==!0),body:Qa(d.running,Date.now(),E,d.running_overlays)})}
      ${Tn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:d.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Tn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${V()} ${d.done.length}`,items:d.done,empty:`${V()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ge()})}
    </div>`}function Wt(d){ge={...ge,[d]:!ge[d]},av(ge),Me()}function Me(){let d=O();et(N(d),ue),et(Et(d),mt)}function pn(){if(typeof window.matchMedia!="function")return;let d=window.matchMedia(ov);H=!!d.matches;let h=x=>{let z=!!(x&&typeof x.matches=="boolean"?x.matches:d.matches);z!==H&&(H=z,Me())};typeof d.addEventListener=="function"?(d.addEventListener("change",h),j.push(()=>d.removeEventListener("change",h))):typeof d.addListener=="function"&&(d.addListener(h),j.push(()=>d.removeListener(h)))}let xt=null;function Zt(d){xt=d.target instanceof Element?d.target:null}function en(d){let x=d.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!x)return;if(xt&&x.contains(xt)&&xt.closest("input, button, a")){d.preventDefault();return}let z=x.dataset.beadId||"",de=x.dataset.lane||"";L={bead_id:z,from_lane:de};try{d.dataTransfer?.setData("text/plain",z),d.dataTransfer&&(d.dataTransfer.effectAllowed="move")}catch{}}function Qt(d){let h=d.target?.closest?.(".worker-pane");if(!h)return;let x=h.dataset.lane||"";x!=="candidate"&&x!=="queue"&&!/^s[1-5]$/.test(x)||(d.preventDefault(),d.dataTransfer&&(d.dataTransfer.dropEffect="move"),h.classList.add("worker-pane--drag-over"))}function rt(d){d.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Xt(d,h){let x=B.find(Qe=>Qe.id===d);if(!x)return;let z=B.filter(Qe=>Qe.id!==d),de=z.length;if(h){let Qe=h.dataset.beadId;if(Qe===d)return;let qt=z.findIndex(zt=>zt.id===Qe);qt>=0&&(de=qt)}let Fe=z.slice();Fe.splice(de,0,x),k.applyReorder(d,Fe,de)}function Ee(d){let h=d.target?.closest?.(".worker-pane");if(!h)return;d.preventDefault(),h.classList.remove("worker-pane--drag-over");let x=h.dataset.lane||"",z=L?.bead_id||d.dataTransfer?.getData("text/plain")||"",de=L?.from_lane||"";if(L=null,!z)return;let Fe=d.target?.closest?.(".worker-mini, .worker-card"),Qe=Array.from(h.querySelectorAll(".worker-mini, .worker-card")),qt=Qe.length;if(Fe){let zt=Qe.indexOf(Fe);zt>=0&&(qt=zt)}if(qt=Math.max(0,qt-h.querySelectorAll(".worker-mini--ghost").length),h.classList.contains("worker-pane--collapsed")&&(qt=it()),x==="candidate"){if(de==="candidate"){Xt(z,Fe);return}(de==="queue"||/^s[1-5]$/.test(de))&&Ne(z);return}if(x==="queue"||/^s[1-5]$/.test(x)){let zt=x==="queue"?"parallel":x;de===x?Ce(z,zt,qt):Xe(z,zt)}}function A(d){Y=d,Xy(d),Me()}function me(d){R=Tf(d),nv(R),Me()}function Oe(d){F=Bn(d),sv(F),y?.(F),Me()}function wt(d){let h=d.target?.closest?.(".worker-serial-lane-count");if(h){let qt=Number.parseInt(h.value,10);Number.isFinite(qt)&&qe(qt).then(Me);return}let x=d.target?.closest?.(".worker-filter__blocked");if(x){A({...Y,show_blocked:x.checked});return}let z=d.target?.closest?.(".worker-done-range");if(z){Oe(z.value);return}let de=d.target?.closest?.(".worker-sort");if(de){me(de.value||bl);return}let Fe=d.target?.closest?.(".worker-slots__input");if(!Fe)return;let Qe=Number.parseInt(Fe.value,10);if(!Number.isFinite(Qe)){Me();return}Re(Qe).then(Me)}function Ot(d){return d?{runner:d.runner||void 0,model:d.model||void 0,effort:d.effort||void 0,worktree:d.worktree||void 0,status:d.status||void 0,session_id:d.session_id||void 0}:{}}function gt(){let d=O(),h=Je().workspace_info,x=h&&typeof h=="object"&&h.repo_ops&&typeof h.repo_ops=="object"?h.repo_ops:null;return{operations:d.repo_operations,cleanup_failures:d.cleanup_failures,repo:l&&l()||"",repo_ops:x}}function Tt(){E&&ie.close(),ut.hidden=!1,Le.hidden=!1,Te.open(gt()),Me()}function tn(d){let h=Je(),x=h.attempts?h.attempts[d]:null;E=d,Te.close(),ut.hidden=!0,Le.hidden=!1,ie.open({attempt_id:d,meta:Ot(x)}),Me()}function nn(d){let h=Je(),x=(Array.isArray(h.session_active)?h.session_active:[]).find(de=>de&&de.bead_id===d),z=(x&&Array.isArray(x.session_refs)?x.session_refs:[]).find(de=>de&&de.current===!0);z&&(Te.close(),ut.hidden=!0,Le.hidden=!1,ie.open(Wr(z,d,"in_progress")),Me())}function $n(){if(Te.isOpen()&&Te.refresh(gt()),!E)return;let d=Je(),h=d.attempts?d.attempts[E]:null;if(h){ie.updateMeta(Ot(h));return}ie.close()}function Pt(d,h){if(d.length===0||!a)return;let x=l?l():void 0;if(h.length===0||!x||h===x||!u){a(d);return}Promise.resolve(u(h)).then(()=>{a(d)}).catch(()=>{pe("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function yn(d){let h=d.target;if(h?.closest?.(".worker-mini__serial, .worker-mini__grip"))return;let x=h?.closest?.(".worker-dep__open");if(x){Pt(x.getAttribute("data-dep-id")||"",x.getAttribute("data-root-dir")||"");return}let z=h?.closest?.(".mon-overlap__chip");if(z){let D=z.closest("[data-bead-id]"),ne=D&&D.getAttribute("data-bead-id")||"";if(ne){let De=z.getAttribute("data-overlap-id")||"";K=!!K&&K.bead_id===ne&&K.counterpart_id===De?null:{bead_id:ne,counterpart_id:De},Me()}return}let de=h?.closest?.(".mon-overlap__place");if(de){let D=de.closest("[data-bead-id]"),ne=D&&D.getAttribute("data-bead-id")||"";ne&&We(ne,de.getAttribute("data-counterpart-id")||"");return}if(h?.closest?.(".mon-overlap__popover"))return;if(h?.closest?.(".worker-repo-strip")||h?.closest?.(".worker-mini__timeline")){Tt();return}let Fe=h?.closest?.(".worker-repo-op__dismiss");if(Fe){W(Fe.dataset.operationId||"");return}let Qe=h?.closest?.(".worker-cleanup__resume");if(Qe){let D=Qe.dataset.beadId;D&&Bt(D);return}let qt=h?.closest?.(".worker-banner__resume");if(qt){let D=qt.dataset.attemptId;D&&pt(D);return}let zt=h?.closest?.(".worker-banner__discard");if(zt){let D=zt.dataset.confirmation==="merged"?"merged":"unmerged";C(zt.dataset.beadId||"",zt.dataset.attemptId||null,D,zt.dataset.operationId||null);return}let fn=h?.closest?.(".worker-banner__dismiss");if(fn){let D=fn.dataset.attemptId;D&&lt(D);return}if(h?.closest?.(".worker-play")){T(!Je().auto_advance);return}let vn=h?.closest?.(".worker-merge-all");if(vn){vn.classList.contains("worker-merge-all--stop")?Je().auto_merge===!0?It(!1):He():It(!0);return}let _n=h?.closest?.(".worker-pane__hd--toggle");if(_n){let D=_n.dataset.lane;(D==="queue"||D==="done")&&Wt(D);return}let Be=h?.closest?.(".worker-card__place-lane");if(Be){let D=Be.dataset.beadId,ne=Be.dataset.lane;D&&(ne==="parallel"||/^s[1-5]$/.test(ne||""))&&(le=null,Me(),Xe(D,ne));return}if(h?.closest?.(".worker-card__place-cancel")){le=null,Me();return}let ae=h?.closest?.(".worker-card__place");if(ae){let D=ae.dataset.beadId;D&&!ae.disabled&&(dt()?(le=D,Me()):Xe(D,"parallel"));return}let P=h?.closest?.(".worker-filter__chip");if(P){let D=P.dataset.spec;(D==="all"||D==="with"||D==="without")&&A({...Y,spec:D});return}let Se=h?.closest?.(".worker-mini__merge");if(Se){let D=Se.dataset.beadId||"";Je().cleanup_failed?.[D]?Bt(D):Kt(D);return}let st=h?.closest?.(".worker-mini__merge-cancel");if(st){yt(st.dataset.beadId||"");return}let nt=h?.closest?.(".worker-mini__discard");if(nt){C(nt.dataset.beadId||"",nt.dataset.attemptId||null,nt.dataset.discardMode==="merged"?"merged":"unmerged",nt.dataset.operationId||null);return}let bt=h?.closest?.(".worker-mini__stale-continue");if(bt){Q("worker-stale-work-continue",bt.dataset.beadId||"",bt.dataset.actionId||"");return}let Ke=h?.closest?.(".worker-mini__stale-backup");if(Ke){Q("worker-stale-work-backup-fresh",Ke.dataset.beadId||"",Ke.dataset.actionId||"");return}let Ct=h?.closest?.(".worker-mini__stale-recheck");if(Ct){Q("worker-stale-work-recheck",Ct.dataset.beadId||"",Ct.dataset.actionId||"");return}let f=h?.closest?.(".worker-mini__revise-fix");if(f){fe("worker-revise-fix",f.dataset.beadId||"");return}let m=h?.closest?.(".worker-mini__revise-approve");if(m){fe("worker-revise-approve",m.dataset.beadId||"");return}if(h?.closest?.(".worker-mini__pr"))return;if(h?.closest?.(".rtile__discard")){let D=h?.closest?.(".rtile"),ne=D?.dataset?.beadId,De=D?.dataset?.attemptId;ne&&C(ne,De||null,"unmerged",h?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(h?.closest?.(".rtile__dismiss")){let ne=h?.closest?.(".rtile")?.dataset?.attemptId;ne&&lt(ne);return}if(h?.closest?.(".rtile__pause")){let ne=h?.closest?.(".rtile")?.dataset?.attemptId;ne&&at(ne);return}if(h?.closest?.(".rtile__resume")){let ne=h?.closest?.(".rtile")?.dataset?.attemptId;ne&&pt(ne);return}if(h?.closest?.(".rtile__session")){let D=h?.closest?.(".rtile"),ne=D?.dataset?.attemptId;if(ne){tn(ne);return}let De=D?.dataset?.beadId;De&&nn(De);return}if(h?.closest?.(".worker-drawer-overlay__backdrop")){Te.close(),ie.close();return}if(h?.closest?.(".worker-drawer-host"))return;let v=h?.closest?.(".rtile .board-card__roll-toggle");if(v){let D=v.dataset.rollParent;D&&(Pe.has(D)?Pe.delete(D):Pe.add(D),Me());return}let w=h?.closest?.(".rtile .board-card__roll-child");if(w){let D=w.dataset.childId;D&&a&&a(D);return}let q=h?.closest?.(".rtile");if(q){if(h?.closest?.(".rtile__id")){let ne=q.dataset.beadId;ne&&Ln(ne).then(De=>{De?pe("\uBCF5\uC0AC\uB428","success",1200):pe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let D=q.dataset.beadId;D&&a&&a(D);return}let U=h?.closest?.(".worker-mini, .worker-card");if(U){let D=U.dataset.beadId;if(h?.closest?.(".worker-mini__id, .worker-card__id")){D&&Ln(D).then(De=>{De?pe("\uBCF5\uC0AC\uB428","success",1200):pe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ne=h?.closest?.(".ctl-chip--from");if(ne){let De=ne.dataset.fromId;De&&a&&a(De);return}D&&a&&a(D)}}e.addEventListener("pointerdown",Zt),e.addEventListener("dragstart",en),e.addEventListener("dragover",Qt),e.addEventListener("dragleave",rt),e.addEventListener("drop",Ee),e.addEventListener("click",yn),e.addEventListener("change",wt);function xn(d){if(!K)return;let h=d.target;h&&typeof h.closest=="function"&&h.closest(".mon-overlap__popover, .mon-overlap__chip")||(K=null,Me())}function S(d){d.key!=="Escape"||!K||(K=null,Me())}return document.addEventListener("click",xn),document.addEventListener("keydown",S),j.push(()=>{document.removeEventListener("click",xn),document.removeEventListener("keydown",S)}),pn(),b&&j.push(b.subscribe(()=>{for(let[d,h]of X)h==="failed"&&X.delete(d);Me()})),s&&j.push(s.subscribe(()=>{let d=l&&l()||"";d!==Ye&&(Ye=d,Ie.close()),Me(),$n()})),Me(),{load(){_e(),Me()},refreshSessionDefaults:$e,destroy(){for(let d of j.splice(0))try{d()}catch{}e.removeEventListener("pointerdown",Zt),e.removeEventListener("dragstart",en),e.removeEventListener("dragover",Qt),e.removeEventListener("dragleave",rt),e.removeEventListener("drop",Ee),e.removeEventListener("click",yn),e.removeEventListener("change",wt);try{ie.destroy()}catch{}Le.hidden=!0;try{Ie.destroy()}catch{}et(c``,e)}}}function yl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Of(e,t,n,r=async()=>{},s=async()=>{}){let o=Ft("views:workspace-picker"),i=null,a=!1,l=!1,u=!1;async function p(F){let V=F.target.value,H=t.getState().workspace?.current?.path||"";if(V&&V!==H){o("switching workspace to %s",V),a=!0,R();try{await n(V)}catch(ee){o("workspace switch failed: %o",ee)}finally{a=!1,R()}}}async function g(){let F=t.getState(),X=F.workspace?.current?.path||F.workspace?.available?.[0]?.path||"";if(!(!X||l)){o("git-pulling workspace %s",X),l=!0,R();try{await r(X)}catch(V){o("workspace git pull failed: %o",V)}finally{l=!1,R()}}}function y(F){let X=F.target;X&&e.contains(X)||L()}function b(F){F.key==="Escape"&&L()}function k(){u||(u=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",b),R())}function L(){u&&(u=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",b),R())}function B(){u?L():k()}async function Y(F){let X=F.target,V=X.value,ge=X.checked;o("toggling visibility %s \u2192 %s",V,String(ge));try{await s(V,ge)}catch(H){o("workspace visibility toggle failed: %o",H)}}function le(F){return F?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${g}
        ?disabled=${a||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function K(F,X){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${B}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?c`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${F.map(V=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${V.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${V.path}"
                        .checked=${!X.has(V.path)}
                        @change=${Y}
                      />
                      <span class="workspace-picker__manage-name"
                        >${yl(V.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function M(){let F=t.getState(),X=F.workspace?.current,V=F.workspace?.available||[],ge=new Set(F.workspace?.hidden||[]),H=X?.path||V[0]?.path||"";if(V.length===0)return c``;let ee=V.filter(oe=>!ge.has(oe.path)||oe.path===H);if(ee.length<=1){let oe=ee[0]||V[0],te=yl(oe.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${oe.path}"
            >${te}</span
          >
          ${K(V,ge)}
          ${le(H)}
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
          ?disabled=${a||l}
          aria-label="Select project workspace"
        >
          ${ee.map(oe=>c`
              <option
                value="${oe.path}"
                ?selected=${oe.path===H}
                title="${oe.path}"
              >
                ${yl(oe.path)}
              </option>
            `)}
        </select>
        ${K(V,ge)}
        ${le(H)}
        ${a||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function R(){et(M(),e)}return R(),i=t.subscribe(()=>R()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",b),et(c``,e)}}}var Lf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function vl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function If(e,t,n=vl()){return{id:n,type:e,payload:t}}function Pf(e={}){let t=Ft("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,a=null,l=!0,u=new Map,p=[],g=new Map,y=new Set;function b(M){for(let R of Array.from(y))try{R(M)}catch{}}function k(){if(!l||a)return;o="reconnecting",t("ws reconnecting\u2026"),b(o);let M=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),R=(n.jitterRatio||0)*M,F=Math.max(0,Math.round(M+(Math.random()*2-1)*R));t("ws retry in %d ms (attempt %d)",F,i+1),a=setTimeout(()=>{a=null,K()},F)}function L(M){try{s?.send(JSON.stringify(M))}catch(R){t("ws send failed",R)}}function B(){for(o="open",t("ws open"),b(o),i=0;p.length;){let M=p.shift();M&&L(M)}}function Y(M){let R;try{R=JSON.parse(String(M.data))}catch{t("ws received non-JSON message");return}if(!R||typeof R.id!="string"||typeof R.type!="string"){t("ws received invalid envelope");return}if(u.has(R.id)){let X=u.get(R.id);u.delete(R.id),R.ok?X?.resolve(R.payload):X?.reject(R.error||new Error("ws error"));return}let F=g.get(R.type);if(F&&F.size>0)for(let X of Array.from(F))try{X(R.payload)}catch(V){t("ws event handler error",V)}else t("ws received unhandled message type: %s",R.type)}function le(){o="closed",t("ws closed"),b(o);for(let[M,R]of u.entries())R.reject(new Error("ws disconnected")),u.delete(M);i+=1,k()}function K(){if(!l)return;let M=r();try{s=new WebSocket(M),t("ws connecting %s",M),o="connecting",b(o),s.addEventListener("open",B),s.addEventListener("message",Y),s.addEventListener("error",()=>{}),s.addEventListener("close",le)}catch(R){t("ws connect failed %o",R),k()}}return K(),{send(M,R){if(!Lf.includes(M))return Promise.reject(new Error(`unknown message type: ${M}`));let F=vl(),X=If(M,R,F);return t("send %s id=%s",M,F),new Promise((V,ge)=>{u.set(F,{resolve:V,reject:ge,type:M}),s&&s.readyState===s.OPEN?L(X):(t("queue %s id=%s (state=%s)",M,F,o),p.push(X))})},on(M,R){g.has(M)||g.set(M,new Set);let F=g.get(M);return F?.add(R),()=>{F?.delete(R)}},onConnection(M){return y.add(M),()=>{y.delete(M)}},reconnect(){l=!0,a&&(clearTimeout(a),a=null),i=0,K()},close(){l=!1,a&&(clearTimeout(a),a=null);try{s?.close()}catch{}},getState(){return o}}}function xv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Av(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var wl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Df=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],ur="tab:worker:closed",Sv="bdui.worker.done-range",Mf=Mp,Nf="worker:queue",qf="ui:order",Ff="ui:display-policy",jf="exec:presets",dr="tab:board:closed",Bf="beads-ui.board.closed-range";function Ev(e){let t=Ft("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;et(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),a=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),p=document.getElementById("detail-panel");if(i&&nf(i),a&&l&&u&&p){let se=function(S,d){let h="Request failed",x="";if(S&&typeof S=="object"){let de=S;if(typeof de.message=="string"&&de.message.length>0&&(h=de.message),typeof de.details=="string")x=de.details;else if(de.details&&typeof de.details=="object")try{x=JSON.stringify(de.details,null,2)}catch{x=""}}else typeof S=="string"&&S.length>0&&(h=S);let z=d&&d.length>0?`Failed to load ${d}`:"Request failed";j.open(z,h,x)},G=function(S){return`${rt.getState().workspace.current?.path||""}\0${S}`},he=function(){ie&&(ie().catch(()=>{}),ie=null),Te=null,Ie=null},Xe=function(S){Ye=S;let d=()=>{Ye!==S||rt.getState().selected_id!==S||(Ye=null,it(S))};if(!dt){Je.then(d);return}d()},pt=function(S,d,h,x,z){return h!==at[d]?(z().catch(()=>{}),!1):(S.set(x,z),!0)},$t=function(){let S=rt.getState();yt(S.view==="board"),W(S.view==="worker"),ct(S.view==="monitor"),qe(S.view==="board"||S.view==="worker"||lt||!!S.selected_id)},Ut=function(){let S=br(Kt);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},It=function(){let S=br(Bt);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},yt=function(S){if(S)for(let[d,h]of wl){if(Ce.has(d)||Ne.has(d))continue;let x=d===dr?Ut():{type:h};try{ue.register(d,x)}catch(Fe){t("register %s store failed: %o",d,Fe)}Ne.add(d);let z=at.board,de=!1;je.subscribeList(d,x).then(Fe=>{de=!pt(Ce,"board",z,d,Fe)}).catch(Fe=>{t("subscribe %s failed: %o",d,Fe),se(Fe,"board")}).finally(()=>{Ne.delete(d),de&&$t()})}else Q()},Q=function(){at.board+=1;for(let[S]of wl){let d=Ce.get(S);d&&(d().catch(()=>{}),Ce.delete(S));try{ue.unregister(S)}catch(h){t("unregister %s failed: %o",S,h)}}},W=function(S){if(!S){Re();return}for(let[d,h]of Df){if(fe.has(d)||Ne.has(d))continue;let x=d===ur?It():{type:h};try{ue.register(d,x)}catch(Fe){t("register %s store failed: %o",d,Fe)}Ne.add(d);let z=at.worker,de=!1;je.subscribeList(d,x).then(Fe=>{de=!pt(fe,"worker",z,d,Fe)}).catch(Fe=>{t("subscribe %s failed: %o",d,Fe),se(Fe,"worker")}).finally(()=>{Ne.delete(d),de&&$t()})}},Re=function(){at.worker+=1;for(let[S]of Df){let d=fe.get(S);d&&(d().catch(()=>{}),fe.delete(S));try{ue.unregister(S)}catch(h){t("unregister %s failed: %o",S,h)}}},qe=function(S){if(!S){xe();return}T||($e("subscribe-worker-queue",{id:Nf}).catch(d=>{t("subscribe-worker-queue failed: %o",d)}),T=()=>$e("unsubscribe-worker-queue",{id:Nf}))},xe=function(){T&&(T().catch(()=>{}),T=null)},ct=function(S){if(!S){We();return}Ze||($e("subscribe-monitor-pipeline",{id:Mf}).catch(d=>{t("subscribe-monitor-pipeline failed: %o",d)}),Ze=()=>$e("unsubscribe-monitor-pipeline",{id:Mf}))},We=function(){Ze&&(Ze().catch(()=>{}),Ze=null)},O=function(){Ae||($e("subscribe-ui-order",{id:qf}).catch(S=>{t("subscribe-ui-order failed: %o",S)}),Ae=()=>$e("unsubscribe-ui-order",{id:qf}))},N=function(){Ae&&(Ae().catch(()=>{}),Ae=null),ht.clear()},ze=function(){be||($e("subscribe-display-policy",{id:Ff}).catch(S=>{t("subscribe-display-policy failed: %o",S)}),be=()=>$e("unsubscribe-display-policy",{id:Ff}))},ve=function(){be&&(be().catch(()=>{}),be=null),ut.clear()},vt=function(){Ge||($e("subscribe-impl-presets",{id:jf}).catch(S=>{t("subscribe-impl-presets failed: %o",S)}),Ge=()=>$e("unsubscribe-impl-presets",{id:jf}))},xt=function(S){if(!S)return"Unknown";let d=S.split("/").filter(Boolean);return d.length>0?d[d.length-1]:"Unknown"},Tt=function(S,d){gt.open(S.path,{missing_state:S.missing_state,...d?{workspace:d}:{}})};var g=se,y=G,b=he,k=Xe,L=pt,B=$t,Y=Ut,le=It,K=yt,M=Q,R=W,F=Re,X=qe,V=xe,ge=ct,H=We,ee=O,oe=N,te=ze,we=ve,Pe=vt,ye=xt,J=Tt;let Z=document.getElementById("header-loading"),ke=Dc(Z),j=Ad(e),_e=Pf(),$e=ke.wrapSend((S,d)=>_e.send(S,d)),je=Tc($e),ue=Cc(),Le=Oc(),St=_c(),ht=Rc(),ut=pc(),mt=fc(),E=mc();_e.on("impl-presets-snapshot",S=>{let d=S;d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&mt.set({revision:d.revision,presets:d.presets})}),_e.on("monitor-pipeline-snapshot",S=>{let d=S;if(!(!d||!Array.isArray(d.workspaces)))try{St.set(d.workspaces,d.workspaces_state,d.cross_lanes)}catch{}}),_e.on("ui-order-snapshot",S=>{let d=S;if(d&&typeof d.revision=="number")try{ht.set({revision:d.revision,order:d.order&&typeof d.order=="object"?d.order:{}})}catch{}}),_e.on("display-policy-snapshot",S=>{let d=S;if(d&&d.policy&&typeof d.policy=="object")try{ut.set(d.policy)}catch{}}),_e.on("session-log-snapshot",S=>{let d=S;if(d&&typeof d.id=="string")try{E.set(d.id,Array.isArray(d.lines)?d.lines:[],typeof d.last_event_at=="number"?d.last_event_at:null)}catch{}}),_e.on("session-log-append",S=>{let d=S;if(d&&typeof d.id=="string")try{E.append(d.id,d.event)}catch{}}),_e.on("snapshot",S=>{let d=S,h=d&&typeof d.id=="string"?d.id:"",x=h?ue.getStore(h):null;if(x&&d&&d.type==="snapshot")try{x.applyPush(d)}catch{}}),_e.on("upsert",S=>{let d=S,h=d&&typeof d.id=="string"?d.id:"",x=h?ue.getStore(h):null;if(x&&d&&d.type==="upsert")try{x.applyPush(d)}catch{}}),_e.on("delete",S=>{let d=S,h=d&&typeof d.id=="string"?d.id:"",x=h?ue.getStore(h):null;if(x&&d&&d.type==="delete")try{x.applyPush(d)}catch{}});let ie=null,Te=null,Ie=null,Ye=null,tt=()=>{},Je=new Promise(S=>{tt=()=>S(void 0)}),dt=!1,re=!1;async function it(S){let d=G(S);if(d===Te||d===Ie)return;Ie=d;let h=`detail:${S}`,x={type:"issue-detail",params:{id:S}};try{ue.register(h,x)}catch(z){t("register detail store failed: %o",z)}try{let z=await je.subscribeList(h,x);if(rt.getState().selected_id!==S||G(S)!==d){await z().catch(()=>{});return}ie&&await ie().catch(()=>{}),ie=z,Te=d}catch(z){t("detail subscribe failed: %o",z),se(z,"issue details")}finally{Ie===d&&(Ie=null)}}let Ce=new Map,Ne=new Set,at={board:0,worker:0},lt=!1,Kt=_o;try{let S=window.localStorage.getItem(Bf);Vi(S)&&(Kt=S)}catch{}let Bt="today";try{let S=window.localStorage.getItem(Sv);S!==null&&(Bt=Bn(S))}catch{}async function He(S){if(!Vi(S)||S===Kt)return;Kt=S;try{window.localStorage.setItem(Bf,S)}catch{}let d=Ce.get(dr);if(!d)return;Ce.delete(dr),await d().catch(()=>{});let h=Ut();try{ue.register(dr,h)}catch(x){t("register %s store failed: %o",dr,x)}try{let x=await je.subscribeList(dr,h);Ce.set(dr,x)}catch(x){t("re-subscribe %s failed: %o",dr,x),se(x,"board")}}async function C(S){let d=Bn(S);if(d===Bt)return;Bt=d;let h=fe.get(ur);if(!h)return;fe.delete(ur),await h().catch(()=>{});let x=It();try{ue.register(ur,x)}catch(z){t("register %s store failed: %o",ur,z)}try{let z=await je.subscribeList(ur,x);fe.set(ur,z)}catch(z){t("re-subscribe %s failed: %o",ur,z),se(z,"worker")}}let fe=new Map,T=null,Ze=null,Ae=null,be=null,Ge=null;async function ft(){be=null,ut.clear(),Ge=null,mt.clear(),T=null,Ze=null,Ce.clear(),fe.clear(),at.board+=1,at.worker+=1,vt();let S=rt.getState().workspace.current?.path;if(S)try{await _e.send("set-workspace",{path:S})}catch(h){t("workspace restore after reconnect failed: %o",h);return}ze();let d=rt.getState();yt(d.view==="board"),W(d.view==="worker"),ct(d.view==="monitor"),qe(d.view==="board"||d.view==="worker"||!!d.selected_id)}async function Et(){t("clearing all subscriptions for workspace switch"),Q(),Re(),xe(),Le.clear(),N(),O(),ve(),ze(),he();let S=rt.getState();if(S.selected_id)try{ue.unregister(`detail:${S.selected_id}`)}catch{}let d=rt.getState();yt(d.view==="board"),W(d.view==="worker"),ct(d.view==="monitor"),qe(d.view==="board"||d.view==="worker"||!!d.selected_id),d.selected_id&&Xe(d.selected_id)}async function Wt(S){t("requesting workspace switch to %s",S),re=!0;try{let d=await _e.send("set-workspace",{path:S});t("workspace switch result: %o",d),d&&d.workspace&&(rt.setState({workspace:{current:{path:d.workspace.root_dir,database:d.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",S),d.changed&&(await Et(),pe("Switched to "+xt(S),"success",2e3)))}catch(d){throw t("workspace switch failed: %o",d),pe("Failed to switch workspace","error",3e3),d}finally{re=!1}}async function Me(S){t("requesting workspace git pull for %s",S);try{let d=await _e.send("git-pull-workspace",{});t("workspace git pull result: %o",d);let h=d?.status;if(h==="up_to_date"){pe("Already up to date","success",2e3);return}if(h==="stash_pop_conflict"){pe("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}pe("Git pulled "+xt(S),"success",2e3)}catch(d){t("workspace git pull failed: %o",d);let h=d?.code,x=d?.message;if(h==="rebase_conflict"){pe("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(h==="rebase_conflict_abort_failed"){pe("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(h==="busy"){pe("Git pull skipped: another operation is running","warning",3e3);return}let z=x?`: ${x}`:"";throw pe(`Git pull failed${z}`,"error",3e3),d}}async function pn(S,d){t("setting workspace visibility %s \u2192 %s",S,String(d));try{await _e.send("set-workspace-visibility",{path:S,visible:d}),await Zt()}catch(h){t("workspace visibility update failed: %o",h),pe("Failed to update project visibility","error",3e3)}}async function Zt(){try{let S=await _e.send("list-workspaces",{});if(t("workspaces loaded: %o",S),S&&Array.isArray(S.workspaces)){let d=S.workspaces.map(de=>({path:de.path,database:de.database,pid:de.pid,version:de.version})),h=S.current?{path:S.current.root_dir,database:S.current.db_path}:null,x=Array.isArray(S.hidden)?S.hidden.filter(de=>typeof de=="string"):[];rt.setState({workspace:{current:h,available:d,hidden:x}});let z=window.localStorage.getItem("beads-ui.workspace");z&&(!d.some(Fe=>Fe.path===z)||x.includes(z)?window.localStorage.removeItem("beads-ui.workspace"):h&&z!==h.path&&(t("restoring saved workspace preference: %s",z),await Wt(z)))}}catch(S){t("failed to load workspaces: %o",S)}}_e.on("workspace-changed",S=>{t("workspace-changed event: %o",S),S&&S.root_dir&&(rt.setState({workspace:{current:{path:S.root_dir,database:S.db_path}}}),Zt(),Et())});let en=!1;if(typeof _e.onConnection=="function"){let S=d=>{t("ws state %s",d),d==="reconnecting"||d==="closed"?(en=!0,pe("Connection lost. Reconnecting\u2026","error",4e3)):d==="open"&&en&&(en=!1,pe("Reconnected","success",2200),Av(rt,(h,x)=>{t(`${h}: %o`,x)}),ft())};_e.onConnection(S)}let Qt="board";try{let S=window.localStorage.getItem("beads-ui.view");(S==="board"||S==="worker"||S==="monitor")&&(Qt=S)}catch(S){t("view parse error: %o",S)}let rt=Pc({config:xv(),view:Qt});_e.on("worker-queue-snapshot",S=>{let d=S;if(!d||!d.queue)return;let h=rt.getState().workspace.current?.path;if(typeof h=="string"&&h.length>0&&d.root_dir!==h){t("dropping worker-queue snapshot for %s",String(d.root_dir));return}try{Le.set(d.queue)}catch{}});let Xt=Lc(rt);Xt.start();let Ee=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),A=async(S,d)=>{try{return await $e(S,d)}catch(h){if(Ee.has(S))throw h;return[]}};qp({global_element:r,repo_element:s},rt,Xt);let me=document.getElementById("workspace-picker");me&&Of(me,rt,Wt,Me,pn);let Oe=Up(e,(S,d)=>$e(S,d));try{let S=document.getElementById("new-issue-btn");S&&S.addEventListener("click",()=>Oe.open())}catch{}let wt=Gp(e,{policyStore:ut,queueStore:Le,implPresetStore:mt,transport:(S,d)=>$e(S,d),onOpenChange:S=>{let d=lt;lt=S,$t(),d&&S===!1&&nn.refreshSessionDefaults()},labelOptions:()=>{let S=new Set;for(let[d]of wl)for(let h of ue.snapshotFor(d)||[]){let x=h.labels;if(Array.isArray(x))for(let z of x)typeof z=="string"&&z.length>0&&S.add(z)}return Array.from(S).sort()}});try{let S=document.getElementById("display-settings-btn");S&&(S.setAttribute("aria-label","\uC124\uC815"),S.setAttribute("title","\uC124\uC815"),S.addEventListener("click",()=>wt.open()))}catch{}let Ot=document.createElement("div");Ot.className="md-viewer-root",document.body.appendChild(Ot);let gt=oi(Ot,{getWorkspacePath:()=>rt.getState().workspace.current?.path}),tn=Zc(a,{gotoIssue:S=>Xt.gotoIssue(S),issueStores:ue,transport:A,workerQueueStore:Le,uiOrderStore:ht,displayPolicyStore:ut,closedRange:Kt,onClosedRangeChange:S=>{He(S)},onNewIssue:()=>Oe.open(),openDoc:Tt}),nn=hl(l,{transport:A,issueStores:ue,queueStore:Le,sessionLogStore:E,uiOrderStore:ht,gotoIssue:S=>rt.setState({selected_id:S}),getWorkspacePath:()=>rt.getState().workspace.current?.path,switchWorkspace:S=>Wt(S),openDoc:Tt,doneRange:Bt,onDoneRangeChange:S=>{C(S)}}),$n=Np(u,{transport:A,pipelineStore:St,execPresetStore:mt,sessionLogStore:E,router:Xt,gotoIssue:S=>Xt.gotoIssue(S),getWorkspacePath:()=>rt.getState().workspace.current?.path,switchWorkspace:S=>Wt(S),openDoc:Tt}),Pt=xd(p,{issueStores:ue,transport:A,queueStore:Le,execPresetStore:mt,sessionLogStore:E,getWorkspacePath:()=>rt.getState().workspace.current?.path,mdViewer:gt,onNavigate:S=>{rt.getState().view==="worker"?rt.setState({selected_id:S}):Xt.gotoIssue(S)},onClose:()=>{let S=rt.getState();rt.setState({selected_id:null});try{Xt.gotoView(S.view==="worker"||S.view==="monitor"?S.view:"board")}catch{}},onOpenExecPresets:()=>{wt.open("execution")}}),yn=rt.getState().selected_id;yn&&(p.hidden=!1,Pt.load(yn),Xe(yn)),rt.subscribe(S=>{let d=S.selected_id;d?(p.hidden=!1,Pt.load(d),re||Xe(d)):(Pt.clear(),p.hidden=!0,he())});let xn=S=>{a.hidden=S.view!=="board",l.hidden=S.view!=="worker",u.hidden=S.view!=="monitor",o&&o.classList.toggle("is-quiet",S.view==="monitor"),yt(S.view==="board"),W(S.view==="worker"),ct(S.view==="monitor"),qe(S.view==="board"||S.view==="worker"||lt||!!S.selected_id),!S.selected_id&&S.view==="board"&&tn.load(),S.view==="worker"&&nn.load(),S.view==="monitor"?$n.load():$n.pause(),window.localStorage.setItem("beads-ui.view",S.view)};rt.subscribe(xn),xn(rt.getState()),O(),ze(),vt(),Zt().finally(()=>{dt=!0,tt()}),window.addEventListener("keydown",S=>{let d=S.ctrlKey||S.metaKey,h=String(S.key||"").toLowerCase(),x=S.target,z=x&&x.tagName?String(x.tagName).toLowerCase():"",de=z==="input"||z==="textarea"||z==="select"||x&&typeof x.isContentEditable=="boolean"&&x.isContentEditable;d&&h==="n"&&(de||(S.preventDefault(),Oe.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Ev(t)});export{Ev as bootstrap,xv as readBootstrapConfig,Av as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
