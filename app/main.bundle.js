var o_=Object.create;var Bi=Object.defineProperty;var i_=Object.getOwnPropertyDescriptor;var a_=Object.getOwnPropertyNames;var l_=Object.getPrototypeOf,c_=Object.prototype.hasOwnProperty;var u_=(e,t,n)=>t in e?Bi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ui=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var d_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of a_(t))!c_.call(e,s)&&s!==n&&Bi(e,s,{get:()=>t[s],enumerable:!(r=i_(t,s))||r.enumerable});return e};var p_=(e,t,n)=>(n=e!=null?o_(l_(e)):{},d_(t||!e||!e.__esModule?Bi(n,"default",{value:e,enumerable:!0}):n,e));var Lt=(e,t,n)=>u_(e,typeof t!="symbol"?t+"":t,n);var bc=Ui((Mv,gc)=>{var Mr=1e3,Dr=Mr*60,Nr=Dr*60,hr=Nr*24,m_=hr*7,g_=hr*365.25;gc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return b_(e);if(n==="number"&&isFinite(e))return t.long?y_(e):h_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function b_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*g_;case"weeks":case"week":case"w":return n*m_;case"days":case"day":case"d":return n*hr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Nr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Dr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Mr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function h_(e){var t=Math.abs(e);return t>=hr?Math.round(e/hr)+"d":t>=Nr?Math.round(e/Nr)+"h":t>=Dr?Math.round(e/Dr)+"m":t>=Mr?Math.round(e/Mr)+"s":e+"ms"}function y_(e){var t=Math.abs(e);return t>=hr?mo(e,t,hr,"day"):t>=Nr?mo(e,t,Nr,"hour"):t>=Dr?mo(e,t,Dr,"minute"):t>=Mr?mo(e,t,Mr,"second"):e+" ms"}function mo(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var yc=Ui((Dv,hc)=>{function v_(e){n.debug=n,n.default=n,n.coerce=l,n.disable=i,n.enable=s,n.enabled=a,n.humanize=bc(),n.destroy=u,Object.keys(e).forEach(p=>{n[p]=e[p]}),n.names=[],n.skips=[],n.formatters={};function t(p){let g=0;for(let h=0;h<p.length;h++)g=(g<<5)-g+p.charCodeAt(h),g|=0;return n.colors[Math.abs(g)%n.colors.length]}n.selectColor=t;function n(p){let g,h=null,b,$;function I(...B){if(!I.enabled)return;let Y=I,oe=Number(new Date),K=oe-(g||oe);Y.diff=K,Y.prev=g,Y.curr=oe,g=oe,B[0]=n.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let N=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(R,V)=>{if(R==="%%")return"%";N++;let U=n.formatters[V];if(typeof U=="function"){let pe=B[N];R=U.call(Y,pe),B.splice(N,1),N--}return R}),n.formatArgs.call(Y,B),(Y.log||n.log).apply(Y,B)}return I.namespace=p,I.useColors=n.useColors(),I.color=n.selectColor(p),I.extend=r,I.destroy=n.destroy,Object.defineProperty(I,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(b!==n.namespaces&&(b=n.namespaces,$=n.enabled(p)),$),set:B=>{h=B}}),typeof n.init=="function"&&n.init(I),I}function r(p,g){let h=n(this.namespace+(typeof g>"u"?":":g)+p);return h.log=this.log,h}function s(p){n.save(p),n.namespaces=p,n.names=[],n.skips=[];let g=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of g)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function o(p,g){let h=0,b=0,$=-1,I=0;for(;h<p.length;)if(b<g.length&&(g[b]===p[h]||g[b]==="*"))g[b]==="*"?($=b,I=h,b++):(h++,b++);else if($!==-1)b=$+1,I++,h=I;else return!1;for(;b<g.length&&g[b]==="*";)b++;return b===g.length}function i(){let p=[...n.names,...n.skips.map(g=>"-"+g)].join(",");return n.enable(""),p}function a(p){for(let g of n.skips)if(o(p,g))return!1;for(let g of n.names)if(o(p,g))return!0;return!1}function l(p){return p instanceof Error?p.stack||p.message:p}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}hc.exports=v_});var vc=Ui((mn,go)=>{mn.formatArgs=k_;mn.save=$_;mn.load=x_;mn.useColors=w_;mn.storage=A_();mn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();mn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function w_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function k_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+go.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}mn.log=console.debug||console.log||(()=>{});function $_(e){try{e?mn.storage.setItem("debug",e):mn.storage.removeItem("debug")}catch{}}function x_(){let e;try{e=mn.storage.getItem("debug")||mn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function A_(){try{return localStorage}catch{}}go.exports=yc()(mn);var{formatters:S_}=go.exports;S_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var os=globalThis,ao=os.trustedTypes,ec=ao?ao.createPolicy("lit-html",{createHTML:e=>e}):void 0,zi="$lit$",Hn=`lit$${Math.random().toFixed(9).slice(2)}$`,Hi="?"+Hn,f_=`<${Hi}>`,_r=document,is=()=>_r.createComment(""),as=e=>e===null||typeof e!="object"&&typeof e!="function",Gi=Array.isArray,ic=e=>Gi(e)||typeof e?.[Symbol.iterator]=="function",Wi=`[ 	
\f\r]`,ss=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,tc=/-->/g,nc=/>/g,pr=RegExp(`>|${Wi}(?:([^\\s"'>=/]+)(${Wi}*=${Wi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),rc=/'/g,sc=/"/g,ac=/^(?:script|style|textarea|title)$/i,Ki=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Ki(1),cs=Ki(2),Tv=Ki(3),An=Symbol.for("lit-noChange"),Gt=Symbol.for("lit-nothing"),oc=new WeakMap,fr=_r.createTreeWalker(_r,129);function lc(e,t){if(!Gi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ec!==void 0?ec.createHTML(t):t}var cc=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",i=ss;for(let a=0;a<n;a++){let l=e[a],u,p,g=-1,h=0;for(;h<l.length&&(i.lastIndex=h,p=i.exec(l),p!==null);)h=i.lastIndex,i===ss?p[1]==="!--"?i=tc:p[1]!==void 0?i=nc:p[2]!==void 0?(ac.test(p[2])&&(s=RegExp("</"+p[2],"g")),i=pr):p[3]!==void 0&&(i=pr):i===pr?p[0]===">"?(i=s??ss,g=-1):p[1]===void 0?g=-2:(g=i.lastIndex-p[2].length,u=p[1],i=p[3]===void 0?pr:p[3]==='"'?sc:rc):i===sc||i===rc?i=pr:i===tc||i===nc?i=ss:(i=pr,s=void 0);let b=i===pr&&e[a+1].startsWith("/>")?" ":"";o+=i===ss?l+f_:g>=0?(r.push(u),l.slice(0,g)+zi+l.slice(g)+Hn+b):l+Hn+(g===-2?a:b)}return[lc(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ls=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,i=0,a=t.length-1,l=this.parts,[u,p]=cc(t,n);if(this.el=e.createElement(u,r),fr.currentNode=this.el.content,n===2||n===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=fr.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(zi)){let h=p[i++],b=s.getAttribute(g).split(Hn),$=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:$[2],strings:b,ctor:$[1]==="."?co:$[1]==="?"?uo:$[1]==="@"?po:gr}),s.removeAttribute(g)}else g.startsWith(Hn)&&(l.push({type:6,index:o}),s.removeAttribute(g));if(ac.test(s.tagName)){let g=s.textContent.split(Hn),h=g.length-1;if(h>0){s.textContent=ao?ao.emptyScript:"";for(let b=0;b<h;b++)s.append(g[b],is()),fr.nextNode(),l.push({type:2,index:++o});s.append(g[h],is())}}}else if(s.nodeType===8)if(s.data===Hi)l.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(Hn,g+1))!==-1;)l.push({type:7,index:o}),g+=Hn.length-1}o++}}static createElement(t,n){let r=_r.createElement("template");return r.innerHTML=t,r}};function mr(e,t,n=e,r){if(t===An)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=as(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=mr(e,s._$AS(e,t.values),s,r)),t}var lo=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??_r).importNode(n,!0);fr.currentNode=s;let o=fr.nextNode(),i=0,a=0,l=r[0];for(;l!==void 0;){if(i===l.index){let u;l.type===2?u=new Ir(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new fo(o,this,t)),this._$AV.push(u),l=r[++a]}i!==l?.index&&(o=fr.nextNode(),i++)}return fr.currentNode=_r,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Ir=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Gt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=mr(this,t,n),as(t)?t===Gt||t==null||t===""?(this._$AH!==Gt&&this._$AR(),this._$AH=Gt):t!==this._$AH&&t!==An&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ic(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Gt&&as(this._$AH)?this._$AA.nextSibling.data=t:this.T(_r.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ls.createElement(lc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new lo(s,this),i=o.u(this.options);o.p(n),this.T(i),this._$AH=o}}_$AC(t){let n=oc.get(t.strings);return n===void 0&&oc.set(t.strings,n=new ls(t)),n}k(t){Gi(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(is()),this.O(is()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},gr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Gt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Gt}_$AI(t,n=this,r,s){let o=this.strings,i=!1;if(o===void 0)t=mr(this,t,n,0),i=!as(t)||t!==this._$AH&&t!==An,i&&(this._$AH=t);else{let a=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=mr(this,a[r+l],n,l),u===An&&(u=this._$AH[l]),i||(i=!as(u)||u!==this._$AH[l]),u===Gt?t=Gt:t!==Gt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}i&&!s&&this.j(t)}j(t){t===Gt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},co=class extends gr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Gt?void 0:t}},uo=class extends gr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Gt)}},po=class extends gr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=mr(this,t,n,0)??Gt)===An)return;let r=this._$AH,s=t===Gt&&r!==Gt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Gt&&(r===Gt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},fo=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){mr(this,t)}},uc={M:zi,P:Hn,A:Hi,C:1,L:cc,R:lo,D:ic,V:mr,I:Ir,H:gr,N:uo,U:po,B:co,F:fo},__=os.litHtmlPolyfillSupport;__?.(ls,Ir),(os.litHtmlVersions??(os.litHtmlVersions=[])).push("3.3.1");var Je=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Ir(t.insertBefore(is(),o),o,void 0,n??{})}return s._$AI(e),s};var _o="today",dc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Pr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Bn(e){return e==="today"?"today":"7d"}function Vi(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function br(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function pc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function fc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function _c(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,i,a){e=Array.isArray(o)?o:null,t=Array.isArray(i)?i:[],n=a===void 0?void 0:a!==null&&typeof a=="object"&&typeof a.revision=="number"&&Array.isArray(a.lanes)?{revision:a.revision,lanes:a.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function mc(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,i=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof i=="number"?i:null}),r()},append(s,o){let i=n(s),a=e.get(i)||{lines:[],last_event_at:null};a.lines=[...a.lines,o],a.last_event_at=Date.now(),e.set(i,a),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var wc=p_(vc(),1);function Ft(e){return(0,wc.default)(`beads-ui:${e}`)}function Rn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function yr(e,t){let n=Rn(e.created_at),r=Rn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function xc(e,t){let n=Rn(e.created_at),r=Rn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function bo(e,t){let n=Rn(e.updated_at),r=Rn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ac(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=Rn(e.created_at),o=Rn(t.created_at);if(s!==o)return s<o?1:-1;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function Sc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var E_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function kc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function $c(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=E_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Ec(e,t){let n=kc(e),r=kc(t);if(n!==r)return n<r?-1:1;let s=$c(e),o=$c(t);if(s!==o)return s<o?-1:1;let i=Rn(e&&e.created_at),a=Rn(t&&t.created_at);if(i!==a)return i<a?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var Yi=2**20;function qr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Rn(e&&e.created_at)}function ho(e){return(t,n)=>{let r=qr(t,e),s=qr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,i=n?.id;return o<i?-1:o>i?1:0}}function Zi(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),i=o-1>=0?r[o-1]:null,a=o+1<s?r[o+1]:null;if(!i&&!a)return{rank:0};if(!i)return{rank:qr(a,n)-Yi};if(!a)return{rank:qr(i,n)+Yi};let l=qr(i,n),u=qr(a,n),p=(l+u)/2;return l<p&&p<u?{rank:p}:{renormalize:r.map((g,h)=>({bead_id:g.id,rank:h*Yi}))}}function Qi(e,t={}){let n=Ft(`issue-store:${e}`),r=new Map,s=[],o=0,i=new Set,a=!1,l=t.sort||yr;function u(){for(let h of Array.from(i))try{h()}catch{}}function p(){s=Array.from(r.values()).sort(l)}function g(h){if(a||!h||h.id!==e)return;let b=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,b),!(b<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(b<=o)return;r.clear();let $=Array.isArray(h.issues)?h.issues:[];for(let I of $)I&&typeof I.id=="string"&&I.id.length>0&&r.set(I.id,I);p(),o=b,u();return}if(h.type==="upsert"){let $=h.issue;if($&&typeof $.id=="string"&&$.id.length>0){let I=r.get($.id);if(!I)r.set($.id,$);else{let B=Number.isFinite(I.updated_at)?I.updated_at:0,Y=Number.isFinite($.updated_at)?$.updated_at:0;if(B<=Y){for(let oe of Object.keys(I))oe in $||delete I[oe];for(let[oe,K]of Object.entries($))I[oe]=K}}p()}o=b,u()}else if(h.type==="delete"){let $=String(h.issue_id||"");$&&(r.delete($),p()),o=b,u()}}}return{id:e,subscribe(h){return i.add(h),()=>{i.delete(h)}},applyPush:g,snapshot(){return s},size(){return r.size},getById(h){return r.get(h)},dispose(){a=!0,r.clear(),s=[],i.clear(),o=0}}}function yo(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let i=e.params[o];n[o]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Tc(e){let t=Ft("subs"),n=new Map,r=new Map;function s(a,l){t("applyDelta %s +%d ~%d -%d",a,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(a);if(!u||u.size===0)return;let p=Array.isArray(l.added)?l.added:[],g=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let b of Array.from(u)){let $=n.get(b);if(!$)continue;let I=$.itemsById;for(let B of p)typeof B=="string"&&B.length>0&&I.set(B,!0);for(let B of g)typeof B=="string"&&B.length>0&&I.set(B,!0);for(let B of h)typeof B=="string"&&B.length>0&&I.delete(B)}}async function o(a,l){let u=yo(l);if(t("subscribe %s key=%s",a,u),!n.has(a))n.set(a,{key:u,itemsById:new Map});else{let g=n.get(a);if(g&&g.key!==u){let h=r.get(g.key);h&&(h.delete(a),h.size===0&&r.delete(g.key)),n.set(a,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let p=r.get(u);p&&p.add(a);try{await e("subscribe-list",{id:a,type:l.type,params:l.params})}catch(g){let h=n.get(a)||null;if(h){let b=r.get(h.key);b&&(b.delete(a),b.size===0&&r.delete(h.key))}throw n.delete(a),g}return async()=>{t("unsubscribe %s key=%s",a,u);try{await e("unsubscribe-list",{id:a})}catch{}let g=n.get(a)||null;if(g){let h=r.get(g.key);h&&(h.delete(a),h.size===0&&r.delete(g.key))}n.delete(a)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:yo,selectors:{getIds(a){let l=n.get(a);return l?Array.from(l.itemsById.keys()):[]},has(a,l){let u=n.get(a);return u?u.itemsById.has(l):!1},count(a){let l=n.get(a);return l?l.itemsById.size:0},getItemsById(a){let l=n.get(a),u={};if(!l)return u;for(let p of l.itemsById.keys())u[p]=!0;return u}}}}function Cc(){let e=Ft("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function i(l,u,p){let g=u?yo(u):"",h=n.get(l)||"",b=t.has(l);if(e("register %s key=%s (prev=%s)",l,g,h),b&&h&&g&&h!==g){let $=t.get(l);if($)try{$.dispose()}catch{}let I=s.get(l);if(I){try{I()}catch{}s.delete(l)}let B=Qi(l,p);t.set(l,B);let Y=B.subscribe(()=>o());s.set(l,Y)}else if(!b){let $=Qi(l,p);t.set(l,$);let I=$.subscribe(()=>o());s.set(l,I)}return n.set(l,g),()=>a(l)}function a(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let p=s.get(l);if(p){try{p()}catch{}s.delete(l)}}return{register:i,unregister:a,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function Rc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Oc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Xi(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function T_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let a=new URLSearchParams(s).get("issue");if(a)return decodeURIComponent(a)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function C_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Lc(e){let t=Ft("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):T_(r),i=C_(r);if(t("hash change \u2192 view=%s id=%s",i,o),e.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",i=Xi(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?Xi(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var R_=Object.freeze({workspace_config:{default_workspace:null}});function Ic(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:R_.workspace_config.default_workspace}}}function Pc(e={}){let t=Ft("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Ic(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let i={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?Ic(o.config):n.config},a=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,p)=>u!==n.workspace.hidden[p]),l=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,p)=>u===n.worker.show_closed_children[p])&&!a&&!l||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Mc(e){let t=Ft("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),o()}function a(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function l(u){return async(g,h)=>{let b=s++,$=Date.now();r.set(b,{type:g,start_ts:$}),t("request start id=%d type=%s count=%d",b,g,n+1),i();let I=!1,B=()=>{I||(I=!0,r.delete(b),a())},Y=setTimeout(()=>{I||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,g,Date.now()-$),B())},3e4);try{let oe=await u(g,h),K=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",b,g,K),oe}catch(oe){let K=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,g,K,oe),oe}finally{clearTimeout(Y),B()}}}return o(),{wrapSend:l,start:i,done:a,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([p,g])=>({id:p,type:g.type,elapsed_ms:u-g.start_ts}))}}}function de(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function vo(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,i,a){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(i==="closed")return l.sort(Sc),l;switch(a){case"created_desc":return l.sort(yr),l;case"created_asc":return l.sort(xc),l;case"updated_desc":return l.sort(bo),l;case"priority":return l.sort(Ac),l;case"manual":default:{let u=n();return u?l.sort(ho(u)):l.sort(yr),l}}}function s(o){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),()=>{for(let a of i)try{a()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function On(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function rn(e){let t=On(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function gn(e,t){let n=On(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let a=Math.floor(s/864e5);if(a<7)return`${a}\uC77C \uC804`;let l=Math.floor(a/7);if(a<30)return`${l}\uC8FC \uC804`;let u=Math.floor(a/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(a/365)}\uB144 \uC804`}function Dc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=On(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function wo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function ko(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=wo(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function $o(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=Dc(n);return{total:n.length,count:r,current:s,children:n}}function xo(e){let t=e.transport,n=e.uiOrderStore;function r(i,a){return"renormalize"in i?i.renormalize:[{bead_id:a,rank:i.rank}]}function s(i,a){let l={...i.order};for(let u of a)l[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:l})}async function o(i,a,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},p=r(Zi(a,l,u.order),i);s(u,p);let g=await t("ui-order-set",{expected_revision:u.revision,entries:p});if(g&&g.conflict){let h={revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}};n.set(h);let b=r(Zi(a,l,h.order),i);s(h,b);let $=await t("ui-order-set",{expected_revision:h.revision,entries:b});$&&$.applied&&n.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else g&&g.applied&&n.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}return{applyReorder:o}}function Nc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Ao(e,t){let n=Nc(e),r=Nc(t);return n.length===0||r.length===0?!1:n!==r}function So(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ji(e,t){return!t||typeof e!="string"||e.length===0||So(t.visible_labels).includes(e)?!0:So(t.hidden_labels).includes(e)?!1:!So(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function qc(e,t){return So(e).filter(n=>Ji(n,t))}function nr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function O_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function L_(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function I_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${O_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Eo(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let i=Array.isArray(e.children)?e.children:[],a=n>0?i.slice().sort(Ec):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?L_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${a.map((l,u)=>I_(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var P_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},jc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Fc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},M_={review:"\u2713",skip:"\u2298"},rr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function D_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Bc(e){let t=e&&e.fill||"none";return t==="none"?rr.none:e&&e.stale===!0?rr.stale:t==="dim"?rr.dim:e&&e.glyph==="review"?rr.review:e&&e.glyph==="skip"?rr.skip:rr.done}function N_(e){if(!e||e.fill==="none"||!e.approval_state)return Bc(e);let t=[];return e.glyph==="review"?t.push(rr.review):e.glyph==="skip"&&t.push(rr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function q_(e,t,n,r){let s=P_[e]||e,o=t&&t.fill||"none",i=!!t&&t.stale===!0,a=M_[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),i&&(l+=" stale"),n&&(l+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,p=n?`color: var(--stage-${s}-on)`:"",g=jc[e]||e,h=r?Uc(t):null;if(!h)return c`
      <div class="seg">
        <div class=${l} style=${p}>${a}</div>
        <div class=${u}>${g}</div>
      </div>
    `;let b=`${g} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${b}
      title=${b}
      @click=${$=>{$.preventDefault(),$.stopPropagation(),r($,h,e)}}
    >
      <div class=${l} style=${p}>${a}</div>
      <div class=${u}>${g}</div>
    </button>
  `}function Uc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function To(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=Fc[e.route]||Fc.spec_backed,o=e.stages,i=D_(s,o,String(t||"open")),a=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${jc[u]||u} ${u==="plan"?N_(o[u]||{}):Bc(o[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>Uc(o[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${a}
    >
      ${s.map(u=>q_(u,o[u]||{},u===i,r))}
    </div>
  `}function F_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Wc=2;function zc(e){let t=e.slice(0,Wc).join(", "),n=e.length-Wc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function j_(e,t){if(!t)return[];let n=[];if(t.external){let i=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${i}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let i of r)(Ao(e,i)?o:s).push(i);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${zc(s)}</span
      >`),o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${zc(o)}</span
      >`),n}function ea(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Co(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Gn(e){return`${e.kind}:${Co(e)}@${e.sha}`}function Ro(e,t){if(!e)return null;let n=ea(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=ea(t?.kind),i=o!==null&&t?.kind!==e.kind,a=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Gn(t)}`:"";return{kind:e.kind,label:a,title:`${l}${u}`}}function Hc(e,t){let n=Ro(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function B_(e){if(!e)return null;let t=ea(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Gn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function U_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&nr(n,"route")){let a=r.route_source==="derived";s.push(c`<span
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
      </button>`),nr(n,"blocked")&&s.push(...j_(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&nr(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function W_(e){let t=gn(e.created_at),n=gn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
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
  </span>`}function z_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Eo(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:W_(e),empty_label:"children \uC5C6\uC74C",childChips:ta,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function ta(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Ro(t,n)?c`<span class="board-card__roll-child-chips">
    ${Hc(t,n)}
    ${B_(n)}
  </span>`:null}function Oo(e,t){let n=F_(e.priority);return c`
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
      ${U_(e,t)}
      ${e.workflow&&nr(t.policy||null,"stepper")?To(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${z_(e,t)}
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
  `}var H_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],G_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],K_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function V_(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
        ${H_.map(r=>c`<option
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
        ${G_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${V_(e,t,n)}
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
        ${K_.map(r=>c`<option
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
  `}var Y_=200,Z_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Q_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Vc="beads-ui.board.sort",Yc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function X_(){try{let e=window.localStorage.getItem(Vc);if(e&&Yc.has(e))return e}catch{}return"created_desc"}function Zc(e,t){let n=Ft("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,i=t.uiOrderStore,a=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,p=t.onNewIssue,g=t.openDoc,h=t.closedRange||_o,b=s?vo(s,i):null,$=xo({transport:o,uiOrderStore:i}),I=[],B=[],Y=[],oe=[],K=[],N=[],w=!1,R=0,V=X_(),U=new Map,pe=new Map,Se=new Map,xe=new Set,ce={search:"",priority:"",type:"",labels:[]},se=!1,Ae=null;function De(C){return String(C.status||"open")==="open"}function be(C){let z=String(C.status||"open");return z==="open"||z==="blocked"}function X(C){let z=ce.search.trim().toLowerCase(),Re=ce.priority,qe=ce.type,we=ce.labels;return C.filter(Ze=>{if(z){let ct=String(Ze.id||"").toLowerCase(),We=String(Ze.title||"").toLowerCase();if(!ct.includes(z)&&!We.includes(z))return!1}if(Re!==""&&String(Ze.priority)!==Re||qe!==""&&String(Ze.issue_type||"")!==qe)return!1;if(we.length>0){let ct=Array.isArray(Ze.labels)?Ze.labels:[];if(!we.some(We=>ct.includes(We)))return!1}return!0})}function Z(){let C=new Set;for(let z of[I,B,Y,oe,K,N])for(let Re of z){let qe=Array.isArray(Re.labels)?Re.labels:[];for(let we of qe)typeof we=="string"&&we.length>0&&C.add(we)}return Array.from(C).sort()}function ye(){return ce.search.trim()!==""||ce.priority!==""||ce.type!==""||ce.labels.length>0}function j(){try{if(b){let C=b.selectBoardColumn("tab:board:in-progress","in_progress",V),z=b.selectBoardColumn("tab:board:blocked","blocked",V).filter(be),Re=new Set(C.map(q=>q.id)),qe=b.selectBoardColumn("tab:board:ready","ready",V).filter(q=>De(q)&&!Re.has(q.id)),we=b.selectBoardColumn("tab:board:resolved","resolved",V),Ze=b.selectBoardColumn("tab:board:deferred","deferred",V),ct=b.selectBoardColumn("tab:board:closed","closed").slice(0,Y_),We=[...z,...qe,...C,...we,...ct];te(We);let ke=new Set;for(let q of We)q&&q.id&&!wo(q)&&ke.add(q.id);let L=!ye();I=L?us(z,ke):z,B=L?us(qe,ke):qe,Y=L?us(C,ke):C,oe=L?us(we,ke):we,K=Ze,R=Ze.length,N=L?us(ct,ke):ct,U=new Map;for(let q of I)U.set(q.id,"open");for(let q of B)U.set(q.id,"open");for(let q of Y)U.set(q.id,"in_progress");for(let q of oe)U.set(q.id,"resolved");for(let q of K)U.set(q.id,"deferred");for(let q of N)U.set(q.id,"closed");pe=new Map;for(let q of I)pe.set(q.id,"blocked-col");for(let q of B)pe.set(q.id,"ready-col");for(let q of Y)pe.set(q.id,"in-progress-col");for(let q of oe)pe.set(q.id,"resolved-col");for(let q of N)pe.set(q.id,"closed-col")}lt()}catch{I=[],B=[],Y=[],oe=[],K=[],N=[],Se=new Map,lt()}}function te(C){Se=ko(C)}function fe(C){return $o(Se,C)}function ve(C){return!xe.has(C)}function je(C,z){C.preventDefault(),C.stopPropagation(),xe.has(z)?xe.delete(z):xe.add(z),lt()}function ae(C,z){C.preventDefault(),C.stopPropagation(),r(z)}function Le(C,z){C.preventDefault(),C.stopPropagation(),r(z)}function St(C,z){Ae||r(z)}function ht(C,z){C.preventDefault(),C.stopPropagation(),J_(z).then(Re=>{Re&&de("\uBCF5\uC0AC\uB428","success",1200)})}function ut(C,z){Ae=z,C.dataTransfer&&(C.dataTransfer.setData("text/plain",z),C.dataTransfer.effectAllowed="move"),C.target.classList.add("board-card--dragging")}function mt(C){C.target.classList.remove("board-card--dragging"),It(),setTimeout(()=>{Ae=null},0)}function T(C){let z=String(C.target.value||"");!z||z===h||(h=z,u&&u(z),lt())}function ne(){return a?a.get():null}function Te(C){let z=l?l.get():null,Re=z?z.cleanup_failed:null;if(!Re||typeof Re!="object"||Array.isArray(Re))return null;let qe=Re[C];return!qe||typeof qe!="object"||Array.isArray(qe)?null:qe}let Ie={onCardClick:St,onCopyId:ht,onDragStart:ut,onDragEnd:mt,onClosedRangeChange:T,rollupFor:fe,isExpanded:ve,onRollupToggle:je,onChildClick:ae,onFromChipClick:Le,onOpenDoc:g?(C,z)=>g(z):void 0,cleanupFailureFor:Te,get policy(){return ne()}};function Ye(C,z){Ae||(Ce(),r(z))}function et(C,z){C.preventDefault(),C.stopPropagation(),Ce(),r(z)}let tt={...Ie,onCardClick:Ye,onChildClick:et,onFromChipClick:et,onOpenDoc:g?(C,z)=>{Ce(),g(z)}:void 0,get policy(){return ne()}};function dt(C){let z=C.target,Re=e.querySelector(".board-filter__labels");z&&Re&&Re.contains(z)||ge()}function ee(C){C.key==="Escape"&&ge()}function G(){se||(se=!0,document.addEventListener("mousedown",dt),document.addEventListener("keydown",ee),lt())}function ge(){se&&(se=!1,document.removeEventListener("mousedown",dt),document.removeEventListener("keydown",ee),lt())}function it(C){C.key==="Escape"&&Ce()}function Xe(){w||(w=!0,document.addEventListener("keydown",it),lt())}function Ce(){w&&(w=!1,document.removeEventListener("keydown",it),lt())}let Ne={onClose:Ce,onOverlayClick(C){C.target===C.currentTarget&&Ce()}},at={onSearchInput(C){ce.search=String(C.target.value||""),j()},onPriorityChange(C){ce.priority=String(C.target.value||""),j()},onTypeChange(C){ce.type=String(C.target.value||""),j()},onSortChange(C){let z=String(C.target.value||"");if(!(!Yc.has(z)||z===V)){V=z;try{window.localStorage.setItem(Vc,z)}catch{}j()}},onDeferredToggle(){w?Ce():Xe()},onLabelMenuToggle(){se?ge():G()},onLabelToggle(C){let z=ce.labels.indexOf(C);z===-1?ce.labels.push(C):ce.labels.splice(z,1),j()},onLabelClear(){ce.labels.length!==0&&(ce.labels=[],j())},onNewIssue(){p&&p()}};function pt(){return c`
      <div class="board-view">
        ${Kc(ce,at,{sort_mode:V,deferred_popup_open:w,deferred_count:R,label_options:Z(),label_menu_open:se})}
        <div class="board-root">
          ${Fr({title:"Blocked",id:"blocked-col",items:X(I)},Ie)}
          ${Fr({title:"Ready",id:"ready-col",items:X(B)},Ie)}
          ${Fr({title:"In progress",id:"in-progress-col",items:X(Y)},Ie)}
          ${Fr({title:"Resolved",id:"resolved-col",items:X(oe)},Ie)}
          ${Fr({title:"Closed",id:"closed-col",items:X(N),is_closed:!0,closed_range:h},Ie)}
        </div>
        ${w?Gc({items:X(K),count:R},tt,Ne):""}
      </div>
    `}function lt(){Je(pt(),e),$t()}function $t(){try{let C=e.querySelector("#deferred-popup");C&&!C.open&&(typeof C.showModal=="function"?C.showModal():C.setAttribute("open",""));let z=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Re of z)Array.from(Re.querySelectorAll(".board-card")).forEach((we,Ze)=>{we.tabIndex=Ze===0?0:-1})}catch{}}async function Kt(C,z){if(!o){de("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:C,status:z}),de("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Re){n("update-status failed: %o",Re),de("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Bt(C){switch(C){case"blocked-col":return I;case"ready-col":return B;case"in-progress-col":return Y;case"resolved-col":return oe;default:return[]}}function Ut(C,z,Re){if(!o||!i)return;let qe=Bt(C),we=qe.find(L=>L.id===z);if(!we)return;let Ze=qe.filter(L=>L.id!==z),ct=Re.closest?Re.closest(".board-card"):null,We=Ze.length;if(ct){let L=ct.getAttribute("data-issue-id");if(L===z)return;let q=Ze.findIndex(me=>me.id===L);q>=0&&(We=q)}let ke=Ze.slice();ke.splice(We,0,we),$.applyReorder(z,ke,We)}function It(){for(let C of Array.from(e.querySelectorAll(".board-column--drag-over")))C.classList.remove("board-column--drag-over")}let yt=null;e.addEventListener("dragover",C=>{C.preventDefault(),C.dataTransfer&&(C.dataTransfer.dropEffect="move");let Re=C.target.closest(".board-column");Re&&Re!==yt&&(yt&&yt.classList.remove("board-column--drag-over"),Re.classList.add("board-column--drag-over"),yt=Re)}),e.addEventListener("dragleave",C=>{let z=C.relatedTarget;(!z||!e.contains(z))&&yt&&(yt.classList.remove("board-column--drag-over"),yt=null)}),e.addEventListener("drop",C=>{C.preventDefault(),yt&&(yt.classList.remove("board-column--drag-over"),yt=null);let z=C.target,Re=z.closest(".board-column");if(!Re)return;let qe=C.dataTransfer?.getData("text/plain")||"";if(!qe)return;let we=Re.id,Ze=pe.get(qe);if(Ze&&Ze===we){if(Q_.has(we)){if(V!=="manual"){de("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ut(we,qe,z)}return}let ct=Z_[we];if(!ct){de("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}U.get(qe)!==ct&&Kt(qe,ct)}),e.addEventListener("keydown",C=>{let z=C.target;if(!(z instanceof HTMLElement))return;let Re=String(z.tagName||"").toLowerCase();if(Re==="input"||Re==="textarea"||Re==="select"||Re==="button"||Re==="a"||z.isContentEditable===!0)return;let qe=z.closest(".board-card");if(!qe)return;let we=String(C.key||"");if(we==="Enter"||we===" "){C.preventDefault();let ke=qe.getAttribute("data-issue-id");ke&&r(ke);return}if(we!=="ArrowUp"&&we!=="ArrowDown"&&we!=="ArrowLeft"&&we!=="ArrowRight")return;C.preventDefault();let Ze=qe.closest(".board-column");if(!Ze)return;let ct=Array.from(Ze.querySelectorAll(".board-card")),We=ct.indexOf(qe);if(we==="ArrowDown"&&We<ct.length-1){He(qe,ct[We+1]);return}if(we==="ArrowUp"&&We>0){He(qe,ct[We-1]);return}if(we==="ArrowLeft"||we==="ArrowRight"){let ke=Array.from(e.querySelectorAll(".board-column")),L=ke.indexOf(Ze),q=we==="ArrowRight"?1:-1,me=L+q;for(;me>=0&&me<ke.length;){let ze=ke[me].querySelector(".board-card");if(ze){He(qe,ze);return}me+=q}}});function He(C,z){try{C.tabIndex=-1,z.tabIndex=0,z.focus()}catch{}}let O=null;b&&b.subscribe&&(O=b.subscribe(()=>{try{j()}catch{}}));let Q=null;a&&a.subscribe&&(Q=a.subscribe(()=>{try{j()}catch{}}));let ue=null;return l&&l.subscribe&&(ue=l.subscribe(()=>{lt()})),{async load(){n("load"),j()},clear(){ge(),Ce(),O&&(O(),O=null),Q&&(Q(),Q=null),ue&&(ue(),ue=null),e.replaceChildren(),I=[],B=[],Y=[],oe=[],K=[],N=[],U=new Map,pe=new Map}}}function us(e,t){return e.filter(n=>{let r=wo(n);return!(r&&t.has(r))})}async function J_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function Ln(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function vr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ds(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function em(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),i=t.createElement("h2"),a=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",a.textContent=`${vr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${vr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(i,a,r,s,o),t.body.append(n),new Promise(l=>{let u=p=>{typeof n.close=="function"&&n.close(),n.remove(),l(p)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Kn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await em(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var tm=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Qc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},nm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Jt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function jt(e){return typeof e=="string"&&e.length>0?e:null}function jr(e){return e.startsWith("gpt-")?e.slice(4):e}function Dt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Jc(e,t,n){let r=jt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=jt(n[e]);return s===null?null:{value:s,source:"global"}}function ps(e,t,n,r){return Jc(e,t,n)||{value:r,source:"base"}}function na(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&Jt(s?.[t])){let i=jt(s[t][e]);if(i!==null)return i}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Jt(s)){for(let i of Object.values(s))if(Jt(i)){let a=jt(i[e]);if(a!==null)return a}else if(Array.isArray(i)&&i.includes(e))return e}let o=r?.model_index?.[e];return jt(r?.runners?.[o]?.models?.[e]?.id)||e}function rm(e,t){return jt(t?.review?.reviewers?.[e]?.model)||e}function Br(e,t,n=!1){if(e==="default")return Dt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?jr(e):e;return Dt(e,t,r,e,"explicit")}function eu(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];Jt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(i=>typeof i=="string"));let o=n?.runners?.[e]?.models;if(Jt(o))for(let i of Object.keys(o))s.includes(i)||s.push(i);return s}function sm(e,t){let n=[],r=e?.implementation?.model_catalog;Jt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(Jt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function om(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of sm(t,n)){let o=eu(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function ra(e){return Dt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Xc(e,t,n){let r=Jc(e,t,n);return r?Br(r.value,r.source):Dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function bn(e){let t=Jt(e.pin)?e.pin:{},n=Jt(e.global)?e.global:{},r=Jt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&Jt(r.session)?r.session:null,o=r?.supported===!0&&Jt(r.orchestration)?r.orchestration:null,i=Jt(e.runner_catalog)?e.runner_catalog:null,a=jt(n.quick_fix_impl_model),l=om(a,s,i),u={};if(s){let p=ps("workflow_mode",t,n,jt(s.workflow_mode_default));u.workflow_mode=p.source==="base"?Dt(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):Br(p.value,p.source);for(let K of["spec_review","plan_review","impl_review"]){let N=`${K}_model`,w=jt(K==="plan_review"?p.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),R=ps(N,t,n,w);if(R.value===null)u[N]=Dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(R.value!=="self"&&R.value!=="skip"&&!Jt(s.review?.reviewers?.[R.value]))u[N]=ra(Dt(R.value,R.source,"",null,"explicit"));else{let V=rm(R.value,s);u[N]=Dt(R.value,R.source,jr(V),V,R.source==="base"?"default":"explicit")}}for(let[K,N]of Object.entries(Qc)){let w=u[N].value;if(w==="self"||w==="skip"){u[K]=Dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let R=jt(s.review?.reviewers?.[w||""]?.effort),V=ps(K,t,n,R);u[K]=V.value===null?Dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Dt(V.value,V.source,V.value,V.value,V.source==="base"?"default":"explicit")}let g=Jt(s.implementation?.default)?s.implementation.default:{},h=jt(e.route),b=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),$=Jt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},I=b&&Jt($[h])?$[h]:{};for(let K of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let N=ps(K,t,n,K==="impl_dispatch"?jt(I.dispatch)||jt(g.dispatch):jt(g[K.replace("impl_","")]));u[K]=N.value===null?Dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Dt(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit")}let B=jt(t.impl_runtime),Y=B==="inherit"?jt(e.controller_runtime):B,oe=h==="quick_fix"&&jt(t.impl_dispatch)===null&&l.runtime!==null&&(B===null||Y===l.runtime);if(oe){let K=l.runtime,N=a;u.impl_dispatch=Dt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),B===null&&(u.impl_runtime=Dt(K,"global",`${K} (\uC720\uB3C4)`,K,"explicit")),jt(t.impl_model)===null&&(u.impl_model=Dt(N,"global",N,N,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let K of["impl_runtime","impl_model","impl_effort","impl_speed"])u[K]=Dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!oe&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let K=u.impl_runtime.value==="inherit"?jt(e.controller_runtime):u.impl_runtime.value,N=K?eu(K,s,i):[];if(u.impl_model.value!=="auto"&&N.length>0&&!N.includes(u.impl_model.value))u.impl_model=ra(u.impl_model);else{let w=na(u.impl_model.value,K,s,i);u.impl_model.display=jr(w),u.impl_model.full_value=w}}if(u.impl_effort.value==="auto"){let K=jt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),N=K?jt(s.implementation?.effort_by_transport?.[K]?.auto):null;N&&!nm.has(N)?(u.impl_effort.display=`${N} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=N,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Dt("default","base","default (\uC77C\uBC18)","default","default"):Br("default",u.impl_speed.source))}}else for(let p of tm.filter(g=>!g.startsWith("orchestration_")))u[p]=Xc(p,t,n);if(!s){for(let[p,g]of Object.entries(Qc))(u[g].value==="self"||u[g].value==="skip")&&(u[p]=Dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])u[p]=Dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[p]=Xc(p,t,n);continue}let g=p.replace("orchestration_",""),h=jt(o[g]),b=ps(p,t,n,h);if(p==="orchestration_effort"&&b.source==="base"){u[p]=Dt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){u[p]=Dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let $=b.source==="base"?jt(o.model_id)||b.value:na(b.value,null,s,i);u[p]=Dt(b.value,b.source,jr($),$,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){u[p]=b.source==="base"?Dt("default","base","default (\uC77C\uBC18)","default","default"):Br("default",b.source);continue}u[p]=Br(b.value,b.source)}if(s)if(a===null){let p=u.orchestration_model.full_value;u.quick_fix_impl_model=Dt(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${jr(p)})`,null,"default")}else if(l.runtime!==null){let p=na(a,l.runtime,s,i);u.quick_fix_impl_model=Dt(a,"global",jr(p),p,"explicit")}else l.offered?u.quick_fix_impl_model=ra(Dt(a,"global","",null,"explicit")):u.quick_fix_impl_model=Br(a,"global");return u}function im(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Lo(e){let t=Jt(e.pin)?e.pin:{},n=Jt(e.global)?e.global:{},r=Jt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=g=>{let h={...r,...g};return bn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,i={...o};delete i[e.key];let a=s(i)[e.key],l=s(o)[e.key],u=jt(o[e.key]),p=[...e.choices];return u!==null&&!p.includes(u)&&p.unshift(u),{unset_label:im(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:p.map(g=>{let h=s({...o,[e.key]:g})[e.key];return{value:g,label:h.display,full_value:h.full_value}})}}function Ur(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",s.append(o,i),t.append(n,r,s),e.body.append(t),new Promise(a=>{let l=!1,u=g=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),a(g))},p=()=>u(r.value.trim());o.addEventListener("click",p),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",g=>{g.key==="Enter"&&(g.ctrlKey||g.metaKey)&&(g.preventDefault(),p())}),t.addEventListener("cancel",g=>{g.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function sa(e){return`session:${e.provider}:${e.session_id}`}function fs(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function am(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Wr(e,t,n,r){return{attempt_id:sa(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:fs(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:am(e,n)}}}var oa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",lm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",tu="\uBD84\uD574 \uC5C6\uB294 leg";function Yt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Wn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],zr=[...Wn,"reasoning_output_tokens"],cm={codex:["implementation","review-consult"],claude:["subagent"]};function ia(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Wn.some(t=>Number.isFinite(e[t]))}function um(e){return!e||typeof e!="object"?!1:zr.some(t=>Number.isFinite(e[t]))}function aa(e){let t=0;for(let n of Wn)t+=Yt(e?.[n]);return t}function dm(e){return!e||typeof e!="object"?!1:Wn.some(t=>Number.isFinite(e[t]))}function nu(e){return!e||typeof e!="object"?!1:zr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function pm(e){let t={};for(let n of zr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function ru(e){let t={};for(let n of zr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function su(e,t){return ia(t)?Yt(t.total_tokens):e==="codex"?Yt(t.input_tokens)+Yt(t.output_tokens):aa(t)}function fm(e){return e==="claude"?"Claude":"Codex"}function _m(e){return`\u03C4 ${iu(e)}`}function mm(e,t){let n=t.breakdown||{},r=Yt(t.total_only_subtotal);if(ia(n)||r>0&&!um(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,lm];return t.replayed&&u.push(oa),u.join(`
`)}let s=[`\uC785\uB825 ${Yt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Yt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Yt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Yt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Yt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Yt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${Yt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${tu} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${o} + ${tu}`:o,l=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&l.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&l.push(oa),l.join(`
`)}function sn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${fm(n)} ${_m(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:mm(n,r)})}return t}function Po(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let i=s.providers[o];if(!i)continue;let a=t[o];a||(a={subtotal:0,breakdown:{}},t[o]=a),a.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(a.total_only_subtotal=Yt(a.total_only_subtotal)+Yt(i.total_only_subtotal));for(let l of zr)Number.isFinite(i.breakdown[l])&&(a.breakdown[l]=Yt(a.breakdown[l])+Yt(i.breakdown[l]));i.replayed&&(a.replayed=!0),o==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function la(e){return!e||typeof e!="object"?null:Sn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function gm(e){return e==="codex"?"codex":"claude"}function Un(){return{subtotal:0,breakdown:pm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Io(e,t,n){e.subtotal+=t.subtotal,ia(t.usage)&&(e.total_only+=t.subtotal);for(let r of zr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Yt(e.breakdown[r])+Yt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ou(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function iu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Hr(e){return dm(e)?`\u03C4 ${iu(aa(e))}`:null}function Vn(e){let t=Hr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function _s(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Yt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Yt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Yt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Yt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${aa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(oa),n.join(`
`)}function Sn(e,t){let n={claude:Un(),codex:Un()},r={orchestrator:{claude:Un(),codex:Un()},implementation:{claude:Un(),codex:Un()},"review-consult":{claude:Un(),codex:Un()},subagent:{claude:Un(),codex:Un()}},s=new Set;for(let a of Object.values(e||{})){if(!a||a.bead_id!==t)continue;let l=a.usage;if(nu(l)){let p=gm(a.runner),g=ru(l),h={provider:p,role:"orchestrator",attempt_id:String(a.attempt_id||""),usage:g,subtotal:su(p,g)};g.replayed===!0&&(h.replayed=!0),typeof a.model=="string"&&(h.model=a.model),typeof a.session_id=="string"&&(h.session_id=a.session_id),Io(n[p],h,!0),Io(r.orchestrator[p],h,!0)}let u=Array.isArray(a.usage_legs)?a.usage_legs:[];for(let p of u){let g=p&&p.provider==="claude"?"claude":"codex";if(!p||p.provider!=="codex"&&p.provider!=="claude"||!cm[g].includes(p.role)||!nu(p.usage))continue;let h=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!h||s.has(h))continue;s.add(h);let b=ru(p.usage),$={provider:g,role:p.role,attempt_id:String(a.attempt_id||""),usage:b,subtotal:su(g,b)};$.receipt_id=h,typeof p.agent_type=="string"&&($.agent_type=p.agent_type),typeof p.agent_id=="string"&&($.agent_id=p.agent_id),typeof p.model=="string"&&($.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&($.effort=p.effort),typeof p.session_id=="string"?$.session_id=p.session_id:typeof p.thread_id=="string"&&($.session_id=p.thread_id),typeof p.turn_id=="string"&&($.turn_id=p.turn_id),(typeof p.completed_at=="string"||typeof p.completed_at=="number"&&Number.isFinite(p.completed_at))&&($.completed_at=p.completed_at),b.replayed===!0&&($.replayed=!0),Io(n[g],$,!1),Io(r[$.role][g],$,!1)}}let o={};for(let a of["claude","codex"]){let l=n[a];if(l.legs.length===0)continue;let u=ou(l,!1);a==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[a]=u}if(Object.keys(o).length===0)return null;let i={};for(let a of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let p=r[a][u];p.legs.length>0&&(l[u]={...ou(p,!0),legs:p.legs})}Object.keys(l).length>0&&(i[a]=l)}return{providers:o,roles:i}}var{entries:mu,setPrototypeOf:au,isFrozen:bm,getPrototypeOf:hm,getOwnPropertyDescriptor:ym}=Object,{freeze:cn,seal:En,create:ma}=Object,{apply:ga,construct:ba}=typeof Reflect<"u"&&Reflect;cn||(cn=function(t){return t});En||(En=function(t){return t});ga||(ga=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});ba||(ba=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var Mo=un(Array.prototype.forEach),vm=un(Array.prototype.lastIndexOf),lu=un(Array.prototype.pop),ms=un(Array.prototype.push),wm=un(Array.prototype.splice),No=un(String.prototype.toLowerCase),ca=un(String.prototype.toString),ua=un(String.prototype.match),gs=un(String.prototype.replace),km=un(String.prototype.indexOf),$m=un(String.prototype.trim),In=un(Object.prototype.hasOwnProperty),ln=un(RegExp.prototype.test),bs=xm(TypeError);function un(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return ga(e,t,r)}}function xm(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return ba(e,n)}}function _t(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:No;au&&au(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(bm(t)||(t[r]=o),s=o)}e[s]=!0}return e}function Am(e){for(let t=0;t<e.length;t++)In(e,t)||(e[t]=null);return e}function Yn(e){let t=ma(null);for(let[n,r]of mu(e))In(e,n)&&(Array.isArray(r)?t[n]=Am(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Yn(r):t[n]=r);return t}function hs(e,t){for(;e!==null;){let r=ym(e,t);if(r){if(r.get)return un(r.get);if(typeof r.value=="function")return un(r.value)}e=hm(e)}function n(){return null}return n}var cu=cn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),da=cn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),pa=cn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Sm=cn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),fa=cn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Em=cn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),uu=cn(["#text"]),du=cn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),_a=cn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),pu=cn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Do=cn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Tm=En(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Cm=En(/<%[\w\W]*|[\w\W]*%>/gm),Rm=En(/\$\{[\w\W]*/gm),Om=En(/^data-[\-\w.\u00B7-\uFFFF]+$/),Lm=En(/^aria-[\-\w]+$/),gu=En(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Im=En(/^(?:\w+script|data):/i),Pm=En(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),bu=En(/^html$/i),Mm=En(/^[a-z][.\w]*(-[.\w]+)+$/i),fu=Object.freeze({__proto__:null,ARIA_ATTR:Lm,ATTR_WHITESPACE:Pm,CUSTOM_ELEMENT:Mm,DATA_ATTR:Om,DOCTYPE_NAME:bu,ERB_EXPR:Cm,IS_ALLOWED_URI:gu,IS_SCRIPT_OR_DATA:Im,MUSTACHE_EXPR:Tm,TMPLIT_EXPR:Rm}),ys={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Dm=function(){return typeof window>"u"?null:window},Nm=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},_u=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function hu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Dm(),t=Ee=>hu(Ee);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==ys.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:a,Element:l,NodeFilter:u,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:g,DOMParser:h,trustedTypes:b}=e,$=l.prototype,I=hs($,"cloneNode"),B=hs($,"remove"),Y=hs($,"nextSibling"),oe=hs($,"childNodes"),K=hs($,"parentNode");if(typeof i=="function"){let Ee=n.createElement("template");Ee.content&&Ee.content.ownerDocument&&(n=Ee.content.ownerDocument)}let N,w="",{implementation:R,createNodeIterator:V,createDocumentFragment:U,getElementsByTagName:pe}=n,{importNode:Se}=r,xe=_u();t.isSupported=typeof mu=="function"&&typeof K=="function"&&R&&R.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ce,ERB_EXPR:se,TMPLIT_EXPR:Ae,DATA_ATTR:De,ARIA_ATTR:be,IS_SCRIPT_OR_DATA:X,ATTR_WHITESPACE:Z,CUSTOM_ELEMENT:ye}=fu,{IS_ALLOWED_URI:j}=fu,te=null,fe=_t({},[...cu,...da,...pa,...fa,...uu]),ve=null,je=_t({},[...du,..._a,...pu,...Do]),ae=Object.seal(ma(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Le=null,St=null,ht=Object.seal(ma(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ut=!0,mt=!0,T=!1,ne=!0,Te=!1,Ie=!0,Ye=!1,et=!1,tt=!1,dt=!1,ee=!1,G=!1,ge=!0,it=!1,Xe="user-content-",Ce=!0,Ne=!1,at={},pt=null,lt=_t({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),$t=null,Kt=_t({},["audio","video","img","source","image","track"]),Bt=null,Ut=_t({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),It="http://www.w3.org/1998/Math/MathML",yt="http://www.w3.org/2000/svg",He="http://www.w3.org/1999/xhtml",O=He,Q=!1,ue=null,C=_t({},[It,yt,He],ca),z=_t({},["mi","mo","mn","ms","mtext"]),Re=_t({},["annotation-xml"]),qe=_t({},["title","style","font","a","script"]),we=null,Ze=["application/xhtml+xml","text/html"],ct="text/html",We=null,ke=null,L=n.createElement("form"),q=function(S){return S instanceof RegExp||S instanceof Function},me=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ke&&ke===S)){if((!S||typeof S!="object")&&(S={}),S=Yn(S),we=Ze.indexOf(S.PARSER_MEDIA_TYPE)===-1?ct:S.PARSER_MEDIA_TYPE,We=we==="application/xhtml+xml"?ca:No,te=In(S,"ALLOWED_TAGS")?_t({},S.ALLOWED_TAGS,We):fe,ve=In(S,"ALLOWED_ATTR")?_t({},S.ALLOWED_ATTR,We):je,ue=In(S,"ALLOWED_NAMESPACES")?_t({},S.ALLOWED_NAMESPACES,ca):C,Bt=In(S,"ADD_URI_SAFE_ATTR")?_t(Yn(Ut),S.ADD_URI_SAFE_ATTR,We):Ut,$t=In(S,"ADD_DATA_URI_TAGS")?_t(Yn(Kt),S.ADD_DATA_URI_TAGS,We):Kt,pt=In(S,"FORBID_CONTENTS")?_t({},S.FORBID_CONTENTS,We):lt,Le=In(S,"FORBID_TAGS")?_t({},S.FORBID_TAGS,We):Yn({}),St=In(S,"FORBID_ATTR")?_t({},S.FORBID_ATTR,We):Yn({}),at=In(S,"USE_PROFILES")?S.USE_PROFILES:!1,ut=S.ALLOW_ARIA_ATTR!==!1,mt=S.ALLOW_DATA_ATTR!==!1,T=S.ALLOW_UNKNOWN_PROTOCOLS||!1,ne=S.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Te=S.SAFE_FOR_TEMPLATES||!1,Ie=S.SAFE_FOR_XML!==!1,Ye=S.WHOLE_DOCUMENT||!1,dt=S.RETURN_DOM||!1,ee=S.RETURN_DOM_FRAGMENT||!1,G=S.RETURN_TRUSTED_TYPE||!1,tt=S.FORCE_BODY||!1,ge=S.SANITIZE_DOM!==!1,it=S.SANITIZE_NAMED_PROPS||!1,Ce=S.KEEP_CONTENT!==!1,Ne=S.IN_PLACE||!1,j=S.ALLOWED_URI_REGEXP||gu,O=S.NAMESPACE||He,z=S.MATHML_TEXT_INTEGRATION_POINTS||z,Re=S.HTML_INTEGRATION_POINTS||Re,ae=S.CUSTOM_ELEMENT_HANDLING||{},S.CUSTOM_ELEMENT_HANDLING&&q(S.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ae.tagNameCheck=S.CUSTOM_ELEMENT_HANDLING.tagNameCheck),S.CUSTOM_ELEMENT_HANDLING&&q(S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ae.attributeNameCheck=S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),S.CUSTOM_ELEMENT_HANDLING&&typeof S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ae.allowCustomizedBuiltInElements=S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Te&&(mt=!1),ee&&(dt=!0),at&&(te=_t({},uu),ve=[],at.html===!0&&(_t(te,cu),_t(ve,du)),at.svg===!0&&(_t(te,da),_t(ve,_a),_t(ve,Do)),at.svgFilters===!0&&(_t(te,pa),_t(ve,_a),_t(ve,Do)),at.mathMl===!0&&(_t(te,fa),_t(ve,pu),_t(ve,Do))),S.ADD_TAGS&&(typeof S.ADD_TAGS=="function"?ht.tagCheck=S.ADD_TAGS:(te===fe&&(te=Yn(te)),_t(te,S.ADD_TAGS,We))),S.ADD_ATTR&&(typeof S.ADD_ATTR=="function"?ht.attributeCheck=S.ADD_ATTR:(ve===je&&(ve=Yn(ve)),_t(ve,S.ADD_ATTR,We))),S.ADD_URI_SAFE_ATTR&&_t(Bt,S.ADD_URI_SAFE_ATTR,We),S.FORBID_CONTENTS&&(pt===lt&&(pt=Yn(pt)),_t(pt,S.FORBID_CONTENTS,We)),Ce&&(te["#text"]=!0),Ye&&_t(te,["html","head","body"]),te.table&&(_t(te,["tbody"]),delete Le.tbody),S.TRUSTED_TYPES_POLICY){if(typeof S.TRUSTED_TYPES_POLICY.createHTML!="function")throw bs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof S.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw bs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=S.TRUSTED_TYPES_POLICY,w=N.createHTML("")}else N===void 0&&(N=Nm(b,s)),N!==null&&typeof w=="string"&&(w=N.createHTML(""));cn&&cn(S),ke=S}},ze=_t({},[...da,...pa,...Sm]),he=_t({},[...fa,...Em]),Ge=function(S){let _e=K(S);(!_e||!_e.tagName)&&(_e={namespaceURI:O,tagName:"template"});let Oe=No(S.tagName),wt=No(_e.tagName);return ue[S.namespaceURI]?S.namespaceURI===yt?_e.namespaceURI===He?Oe==="svg":_e.namespaceURI===It?Oe==="svg"&&(wt==="annotation-xml"||z[wt]):!!ze[Oe]:S.namespaceURI===It?_e.namespaceURI===He?Oe==="math":_e.namespaceURI===yt?Oe==="math"&&Re[wt]:!!he[Oe]:S.namespaceURI===He?_e.namespaceURI===yt&&!Re[wt]||_e.namespaceURI===It&&!z[wt]?!1:!he[Oe]&&(qe[Oe]||!ze[Oe]):!!(we==="application/xhtml+xml"&&ue[S.namespaceURI]):!1},vt=function(S){ms(t.removed,{element:S});try{K(S).removeChild(S)}catch{B(S)}},ft=function(S,_e){try{ms(t.removed,{attribute:_e.getAttributeNode(S),from:_e})}catch{ms(t.removed,{attribute:null,from:_e})}if(_e.removeAttribute(S),S==="is")if(dt||ee)try{vt(_e)}catch{}else try{_e.setAttribute(S,"")}catch{}},Et=function(S){let _e=null,Oe=null;if(tt)S="<remove></remove>"+S;else{let gt=ua(S,/^[\r\n\t ]+/);Oe=gt&&gt[0]}we==="application/xhtml+xml"&&O===He&&(S='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+S+"</body></html>");let wt=N?N.createHTML(S):S;if(O===He)try{_e=new h().parseFromString(wt,we)}catch{}if(!_e||!_e.documentElement){_e=R.createDocument(O,"template",null);try{_e.documentElement.innerHTML=Q?w:wt}catch{}}let Ot=_e.body||_e.documentElement;return S&&Oe&&Ot.insertBefore(n.createTextNode(Oe),Ot.childNodes[0]||null),O===He?pe.call(_e,Ye?"html":"body")[0]:Ye?_e.documentElement:Ot},Wt=function(S){return V.call(S.ownerDocument||S,S,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Me=function(S){return S instanceof g&&(typeof S.nodeName!="string"||typeof S.textContent!="string"||typeof S.removeChild!="function"||!(S.attributes instanceof p)||typeof S.removeAttribute!="function"||typeof S.setAttribute!="function"||typeof S.namespaceURI!="string"||typeof S.insertBefore!="function"||typeof S.hasChildNodes!="function")},pn=function(S){return typeof a=="function"&&S instanceof a};function xt(Ee,S,_e){Mo(Ee,Oe=>{Oe.call(t,S,_e,ke)})}let Zt=function(S){let _e=null;if(xt(xe.beforeSanitizeElements,S,null),Me(S))return vt(S),!0;let Oe=We(S.nodeName);if(xt(xe.uponSanitizeElement,S,{tagName:Oe,allowedTags:te}),Ie&&S.hasChildNodes()&&!pn(S.firstElementChild)&&ln(/<[/\w!]/g,S.innerHTML)&&ln(/<[/\w!]/g,S.textContent)||S.nodeType===ys.progressingInstruction||Ie&&S.nodeType===ys.comment&&ln(/<[/\w]/g,S.data))return vt(S),!0;if(!(ht.tagCheck instanceof Function&&ht.tagCheck(Oe))&&(!te[Oe]||Le[Oe])){if(!Le[Oe]&&Qt(Oe)&&(ae.tagNameCheck instanceof RegExp&&ln(ae.tagNameCheck,Oe)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(Oe)))return!1;if(Ce&&!pt[Oe]){let wt=K(S)||S.parentNode,Ot=oe(S)||S.childNodes;if(Ot&&wt){let gt=Ot.length;for(let Tt=gt-1;Tt>=0;--Tt){let tn=I(Ot[Tt],!0);tn.__removalCount=(S.__removalCount||0)+1,wt.insertBefore(tn,Y(S))}}}return vt(S),!0}return S instanceof l&&!Ge(S)||(Oe==="noscript"||Oe==="noembed"||Oe==="noframes")&&ln(/<\/no(script|embed|frames)/i,S.innerHTML)?(vt(S),!0):(Te&&S.nodeType===ys.text&&(_e=S.textContent,Mo([ce,se,Ae],wt=>{_e=gs(_e,wt," ")}),S.textContent!==_e&&(ms(t.removed,{element:S.cloneNode()}),S.textContent=_e)),xt(xe.afterSanitizeElements,S,null),!1)},en=function(S,_e,Oe){if(ge&&(_e==="id"||_e==="name")&&(Oe in n||Oe in L))return!1;if(!(mt&&!St[_e]&&ln(De,_e))){if(!(ut&&ln(be,_e))){if(!(ht.attributeCheck instanceof Function&&ht.attributeCheck(_e,S))){if(!ve[_e]||St[_e]){if(!(Qt(S)&&(ae.tagNameCheck instanceof RegExp&&ln(ae.tagNameCheck,S)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(S))&&(ae.attributeNameCheck instanceof RegExp&&ln(ae.attributeNameCheck,_e)||ae.attributeNameCheck instanceof Function&&ae.attributeNameCheck(_e,S))||_e==="is"&&ae.allowCustomizedBuiltInElements&&(ae.tagNameCheck instanceof RegExp&&ln(ae.tagNameCheck,Oe)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(Oe))))return!1}else if(!Bt[_e]){if(!ln(j,gs(Oe,Z,""))){if(!((_e==="src"||_e==="xlink:href"||_e==="href")&&S!=="script"&&km(Oe,"data:")===0&&$t[S])){if(!(T&&!ln(X,gs(Oe,Z,"")))){if(Oe)return!1}}}}}}}return!0},Qt=function(S){return S!=="annotation-xml"&&ua(S,ye)},rt=function(S){xt(xe.beforeSanitizeAttributes,S,null);let{attributes:_e}=S;if(!_e||Me(S))return;let Oe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ve,forceKeepAttr:void 0},wt=_e.length;for(;wt--;){let Ot=_e[wt],{name:gt,namespaceURI:Tt,value:tn}=Ot,nn=We(gt),$n=tn,Pt=gt==="value"?$n:$m($n);if(Oe.attrName=nn,Oe.attrValue=Pt,Oe.keepAttr=!0,Oe.forceKeepAttr=void 0,xt(xe.uponSanitizeAttribute,S,Oe),Pt=Oe.attrValue,it&&(nn==="id"||nn==="name")&&(ft(gt,S),Pt=Xe+Pt),Ie&&ln(/((--!?|])>)|<\/(style|title|textarea)/i,Pt)){ft(gt,S);continue}if(nn==="attributename"&&ua(Pt,"href")){ft(gt,S);continue}if(Oe.forceKeepAttr)continue;if(!Oe.keepAttr){ft(gt,S);continue}if(!ne&&ln(/\/>/i,Pt)){ft(gt,S);continue}Te&&Mo([ce,se,Ae],xn=>{Pt=gs(Pt,xn," ")});let yn=We(S.nodeName);if(!en(yn,nn,Pt)){ft(gt,S);continue}if(N&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Tt)switch(b.getAttributeType(yn,nn)){case"TrustedHTML":{Pt=N.createHTML(Pt);break}case"TrustedScriptURL":{Pt=N.createScriptURL(Pt);break}}if(Pt!==$n)try{Tt?S.setAttributeNS(Tt,gt,Pt):S.setAttribute(gt,Pt),Me(S)?vt(S):lu(t.removed)}catch{ft(gt,S)}}xt(xe.afterSanitizeAttributes,S,null)},Xt=function Ee(S){let _e=null,Oe=Wt(S);for(xt(xe.beforeSanitizeShadowDOM,S,null);_e=Oe.nextNode();)xt(xe.uponSanitizeShadowNode,_e,null),Zt(_e),rt(_e),_e.content instanceof o&&Ee(_e.content);xt(xe.afterSanitizeShadowDOM,S,null)};return t.sanitize=function(Ee){let S=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},_e=null,Oe=null,wt=null,Ot=null;if(Q=!Ee,Q&&(Ee="<!-->"),typeof Ee!="string"&&!pn(Ee))if(typeof Ee.toString=="function"){if(Ee=Ee.toString(),typeof Ee!="string")throw bs("dirty is not a string, aborting")}else throw bs("toString is not a function");if(!t.isSupported)return Ee;if(et||me(S),t.removed=[],typeof Ee=="string"&&(Ne=!1),Ne){if(Ee.nodeName){let tn=We(Ee.nodeName);if(!te[tn]||Le[tn])throw bs("root node is forbidden and cannot be sanitized in-place")}}else if(Ee instanceof a)_e=Et("<!---->"),Oe=_e.ownerDocument.importNode(Ee,!0),Oe.nodeType===ys.element&&Oe.nodeName==="BODY"||Oe.nodeName==="HTML"?_e=Oe:_e.appendChild(Oe);else{if(!dt&&!Te&&!Ye&&Ee.indexOf("<")===-1)return N&&G?N.createHTML(Ee):Ee;if(_e=Et(Ee),!_e)return dt?null:G?w:""}_e&&tt&&vt(_e.firstChild);let gt=Wt(Ne?Ee:_e);for(;wt=gt.nextNode();)Zt(wt),rt(wt),wt.content instanceof o&&Xt(wt.content);if(Ne)return Ee;if(dt){if(ee)for(Ot=U.call(_e.ownerDocument);_e.firstChild;)Ot.appendChild(_e.firstChild);else Ot=_e;return(ve.shadowroot||ve.shadowrootmode)&&(Ot=Se.call(r,Ot,!0)),Ot}let Tt=Ye?_e.outerHTML:_e.innerHTML;return Ye&&te["!doctype"]&&_e.ownerDocument&&_e.ownerDocument.doctype&&_e.ownerDocument.doctype.name&&ln(bu,_e.ownerDocument.doctype.name)&&(Tt="<!DOCTYPE "+_e.ownerDocument.doctype.name+`>
`+Tt),Te&&Mo([ce,se,Ae],tn=>{Tt=gs(Tt,tn," ")}),N&&G?N.createHTML(Tt):Tt},t.setConfig=function(){let Ee=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};me(Ee),et=!0},t.clearConfig=function(){ke=null,et=!1},t.isValidAttribute=function(Ee,S,_e){ke||me({});let Oe=We(Ee),wt=We(S);return en(Oe,wt,_e)},t.addHook=function(Ee,S){typeof S=="function"&&ms(xe[Ee],S)},t.removeHook=function(Ee,S){if(S!==void 0){let _e=vm(xe[Ee],S);return _e===-1?void 0:wm(xe[Ee],_e,1)[0]}return lu(xe[Ee])},t.removeHooks=function(Ee){xe[Ee]=[]},t.removeAllHooks=function(){xe=_u()},t}var yu=hu();var Zn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},qo=e=>(...t)=>({_$litDirective$:e,values:t}),Gr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var vs=class extends Gr{constructor(t){if(super(t),this.it=Gt,t.type!==Zn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Gt||t==null)return this._t=void 0,this.it=t;if(t===An)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};vs.directiveName="unsafeHTML",vs.resultType=1;var vu=qo(vs);function wa(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var kr=wa();function Eu(e){kr=e}var xs={exec:()=>null};function kt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(dn.caret,"$1"),n=n.replace(s,i),r},getRegex:()=>new RegExp(n,t)};return r}var qm=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),dn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Fm=/^(?:[ \t]*(?:\n|$))+/,jm=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Bm=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,As=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Um=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ka=/(?:[*+-]|\d{1,9}[.)])/,Tu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Cu=kt(Tu).replace(/bull/g,ka).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Wm=kt(Tu).replace(/bull/g,ka).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),$a=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,zm=/^[^\n]+/,xa=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Hm=kt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",xa).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Gm=kt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ka).getRegex(),zo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Aa=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Km=kt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Aa).replace("tag",zo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ru=kt($a).replace("hr",As).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",zo).getRegex(),Vm=kt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ru).getRegex(),Sa={blockquote:Vm,code:jm,def:Hm,fences:Bm,heading:Um,hr:As,html:Km,lheading:Cu,list:Gm,newline:Fm,paragraph:Ru,table:xs,text:zm},wu=kt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",As).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",zo).getRegex(),Ym={...Sa,lheading:Wm,table:wu,paragraph:kt($a).replace("hr",As).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",wu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",zo).getRegex()},Zm={...Sa,html:kt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Aa).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:xs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:kt($a).replace("hr",As).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Cu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Qm=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Xm=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ou=/^( {2,}|\\)\n(?!\s*$)/,Jm=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ho=/[\p{P}\p{S}]/u,Ea=/[\s\p{P}\p{S}]/u,Lu=/[^\s\p{P}\p{S}]/u,eg=kt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ea).getRegex(),Iu=/(?!~)[\p{P}\p{S}]/u,tg=/(?!~)[\s\p{P}\p{S}]/u,ng=/(?:[^\s\p{P}\p{S}]|~)/u,rg=kt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",qm?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Pu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,sg=kt(Pu,"u").replace(/punct/g,Ho).getRegex(),og=kt(Pu,"u").replace(/punct/g,Iu).getRegex(),Mu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ig=kt(Mu,"gu").replace(/notPunctSpace/g,Lu).replace(/punctSpace/g,Ea).replace(/punct/g,Ho).getRegex(),ag=kt(Mu,"gu").replace(/notPunctSpace/g,ng).replace(/punctSpace/g,tg).replace(/punct/g,Iu).getRegex(),lg=kt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Lu).replace(/punctSpace/g,Ea).replace(/punct/g,Ho).getRegex(),cg=kt(/\\(punct)/,"gu").replace(/punct/g,Ho).getRegex(),ug=kt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),dg=kt(Aa).replace("(?:-->|$)","-->").getRegex(),pg=kt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",dg).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Bo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,fg=kt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Bo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Du=kt(/^!?\[(label)\]\[(ref)\]/).replace("label",Bo).replace("ref",xa).getRegex(),Nu=kt(/^!?\[(ref)\](?:\[\])?/).replace("ref",xa).getRegex(),_g=kt("reflink|nolink(?!\\()","g").replace("reflink",Du).replace("nolink",Nu).getRegex(),ku=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ta={_backpedal:xs,anyPunctuation:cg,autolink:ug,blockSkip:rg,br:Ou,code:Xm,del:xs,emStrongLDelim:sg,emStrongRDelimAst:ig,emStrongRDelimUnd:lg,escape:Qm,link:fg,nolink:Nu,punctuation:eg,reflink:Du,reflinkSearch:_g,tag:pg,text:Jm,url:xs},mg={...Ta,link:kt(/^!?\[(label)\]\((.*?)\)/).replace("label",Bo).getRegex(),reflink:kt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Bo).getRegex()},ha={...Ta,emStrongRDelimAst:ag,emStrongLDelim:og,url:kt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ku).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:kt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ku).getRegex()},gg={...ha,br:kt(Ou).replace("{2,}","*").getRegex(),text:kt(ha.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Fo={normal:Sa,gfm:Ym,pedantic:Zm},ws={normal:Ta,gfm:ha,breaks:gg,pedantic:mg},bg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},$u=e=>bg[e];function Qn(e,t){if(t){if(dn.escapeTest.test(e))return e.replace(dn.escapeReplace,$u)}else if(dn.escapeTestNoEncode.test(e))return e.replace(dn.escapeReplaceNoEncode,$u);return e}function xu(e){try{e=encodeURI(e).replace(dn.percentDecode,"%")}catch{return null}return e}function Au(e,t){let n=e.replace(dn.findPipe,(o,i,a)=>{let l=!1,u=i;for(;--u>=0&&a[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(dn.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(dn.slashPipe,"|");return r}function ks(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function hg(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Su(e,t,n,r,s){let o=t.href,i=t.title||null,a=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:i,text:a,tokens:r.inlineTokens(a)};return r.state.inLink=!1,l}function yg(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let i=o.match(n.other.beginningSpace);if(i===null)return o;let[a]=i;return a.length>=s.length?o.slice(s.length):o}).join(`
`)}var Uo=class{constructor(e){Lt(this,"options");Lt(this,"rules");Lt(this,"lexer");this.options=e||kr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ks(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=yg(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=ks(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ks(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=ks(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let i=!1,a=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))a.push(n[l]),i=!0;else if(!i)a.push(n[l]);else break;n=n.slice(l);let u=a.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${p}`:p;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=g,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let b=h,$=b.raw+`
`+n.join(`
`),I=this.blockquote($);o[o.length-1]=I,r=r.substring(0,r.length-b.raw.length)+I.raw,s=s.substring(0,s.length-b.text.length)+I.text;break}else if(h?.type==="list"){let b=h,$=b.raw+`
`+n.join(`
`),I=this.list($);o[o.length-1]=I,r=r.substring(0,r.length-h.raw.length)+I.raw,s=s.substring(0,s.length-b.raw.length)+I.raw,n=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),i=!1;for(;e;){let l=!1,u="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let g=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,I=>" ".repeat(3*I.length)),h=e.split(`
`,1)[0],b=!g.trim(),$=0;if(this.options.pedantic?($=2,p=g.trimStart()):b?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,p=g.slice($),$+=t[1].length),b&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let I=this.rules.other.nextBulletRegex($),B=this.rules.other.hrRegex($),Y=this.rules.other.fencesBeginRegex($),oe=this.rules.other.headingBeginRegex($),K=this.rules.other.htmlBeginRegex($);for(;e;){let N=e.split(`
`,1)[0],w;if(h=N,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),w=h):w=h.replace(this.rules.other.tabCharGlobal,"    "),Y.test(h)||oe.test(h)||K.test(h)||I.test(h)||B.test(h))break;if(w.search(this.rules.other.nonSpaceChar)>=$||!h.trim())p+=`
`+w.slice($);else{if(b||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(g)||oe.test(g)||B.test(g))break;p+=`
`+h}!b&&!h.trim()&&(b=!0),u+=N+`
`,e=e.substring(N.length+1),g=w.slice($)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=u}let a=s.items.at(-1);if(a)a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=p.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}if(!s.loose){let u=l.tokens.filter(g=>g.type==="space"),p=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=p}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Au(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<n.length;i++)o.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Au(i,o.header.length).map((a,l)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=ks(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=hg(t[2],"()");if(o===-2)return;if(o>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Su(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Su(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,i,a=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(i=[...o].length,r[3]||r[4]){a+=i;continue}else if((r[5]||r[6])&&s%3&&!((s+i)%3)){l+=i;continue}if(a-=i,a>0)continue;i=Math.min(i,i+a+l);let p=[...r[0]][0].length,g=e.slice(0,s+r.index+p+i);if(Math.min(s,i)%2){let b=g.slice(1,-1);return{type:"em",raw:g,text:b,tokens:this.lexer.inlineTokens(b)}}let h=g.slice(2,-2);return{type:"strong",raw:g,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Pn=class ya{constructor(t){Lt(this,"tokens");Lt(this,"options");Lt(this,"state");Lt(this,"inlineQueue");Lt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||kr,this.options.tokenizer=this.options.tokenizer||new Uo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:dn,block:Fo.normal,inline:ws.normal};this.options.pedantic?(n.block=Fo.pedantic,n.inline=ws.pedantic):this.options.gfm&&(n.block=Fo.gfm,this.options.breaks?n.inline=ws.breaks:n.inline=ws.gfm),this.tokenizer.rules=n}static get rules(){return{block:Fo,inline:ws}}static lex(t,n){return new ya(n).lex(t)}static lexInline(t,n){return new ya(n).inlineTokens(t)}lex(t){t=t.replace(dn.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(s);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,a="";for(;t;){i||(a=""),i=!1;let l;if(this.options.extensions?.inline?.some(p=>(l=p.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let p=n.at(-1);l.type==="text"&&p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,a)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let p=1/0,g=t.slice(1),h;this.options.extensions.startInline.forEach(b=>{h=b.call({lexer:this},g),typeof h=="number"&&h>=0&&(p=Math.min(p,h))}),p<1/0&&p>=0&&(u=t.substring(0,p+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(a=l.raw.slice(-1)),i=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):n.push(l);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},Wo=class{constructor(e){Lt(this,"options");Lt(this,"parser");this.options=e||kr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(dn.notSpaceStart)?.[0],s=e.replace(dn.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Qn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=xu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Qn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=xu(e);if(s===null)return Qn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Qn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Qn(e.text)}},Ca=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Mn=class va{constructor(t){Lt(this,"options");Lt(this,"renderer");Lt(this,"textRenderer");this.options=t||kr,this.options.renderer=this.options.renderer||new Wo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ca}static parse(t,n){return new va(n).parse(t)}static parseInline(t,n){return new va(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let i=s,a=this.options.extensions.renderers[i.type].call({parser:this},i);if(a!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=a||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let a=this.options.extensions.renderers[o.type].call({parser:this},o);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=a||"";continue}}let i=o;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let a='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}},jo,$s=(jo=class{constructor(e){Lt(this,"options");Lt(this,"block");this.options=e||kr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Pn.lex:Pn.lexInline}provideParser(){return this.block?Mn.parse:Mn.parseInline}},Lt(jo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Lt(jo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),jo),vg=class{constructor(...e){Lt(this,"defaults",wa());Lt(this,"options",this.setOptions);Lt(this,"parse",this.parseMarkdown(!0));Lt(this,"parseInline",this.parseMarkdown(!1));Lt(this,"Parser",Mn);Lt(this,"Renderer",Wo);Lt(this,"TextRenderer",Ca);Lt(this,"Lexer",Pn);Lt(this,"Tokenizer",Uo);Lt(this,"Hooks",$s);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let i of o)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);n=n.concat(this.walkTokens(i,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...i){let a=s.renderer.apply(this,i);return a===!1&&(a=o.apply(this,i)),a}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Wo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,a=n.renderer[i],l=s[i];s[i]=(...u)=>{let p=a.apply(s,u);return p===!1&&(p=l.apply(s,u)),p||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Uo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,a=n.tokenizer[i],l=s[i];s[i]=(...u)=>{let p=a.apply(s,u);return p===!1&&(p=l.apply(s,u)),p}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new $s;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,a=n.hooks[i],l=s[i];$s.passThroughHooks.has(o)?s[i]=u=>{if(this.defaults.async&&$s.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await a.call(s,u);return l.call(s,g)})();let p=a.call(s,u);return l.call(s,p)}:s[i]=(...u)=>{if(this.defaults.async)return(async()=>{let g=await a.apply(s,u);return g===!1&&(g=await l.apply(s,u)),g})();let p=a.apply(s,u);return p===!1&&(p=l.apply(s,u)),p}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(i){let a=[];return a.push(o.call(this,i)),s&&(a=a.concat(s.call(this,i))),a}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Pn.lex(e,t??this.defaults)}parser(e,t){return Mn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(t):t,a=await(s.hooks?await s.hooks.provideLexer():e?Pn.lex:Pn.lexInline)(i,s),l=s.hooks?await s.hooks.processAllTokens(a):a;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Mn.parse:Mn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let i=(s.hooks?s.hooks.provideLexer():e?Pn.lex:Pn.lexInline)(t,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let a=(s.hooks?s.hooks.provideParser():e?Mn.parse:Mn.parseInline)(i,s);return s.hooks&&(a=s.hooks.postprocess(a)),a}catch(i){return o(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Qn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},wr=new vg;function At(e,t){return wr.parse(e,t)}At.options=At.setOptions=function(e){return wr.setOptions(e),At.defaults=wr.defaults,Eu(At.defaults),At};At.getDefaults=wa;At.defaults=kr;At.use=function(...e){return wr.use(...e),At.defaults=wr.defaults,Eu(At.defaults),At};At.walkTokens=function(e,t){return wr.walkTokens(e,t)};At.parseInline=wr.parseInline;At.Parser=Mn;At.parser=Mn.parse;At.Renderer=Wo;At.TextRenderer=Ca;At.Lexer=Pn;At.lexer=Pn.lex;At.Tokenizer=Uo;At.Hooks=$s;At.parse=At;var ak=At.options,lk=At.setOptions,ck=At.use,uk=At.walkTokens,dk=At.parseInline;var pk=Mn.parse,fk=Pn.lex;function sr(e){let t=At.parse(e),n=yu.sanitize(t);return vu(n)}function Xn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Kr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Go(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Fu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},wg={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},kg=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,$g=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Dn(e){return!!e&&typeof e=="object"}function Ra(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Oa(e,t){let n=Ra(e),r=Ra(t),s=new Map;for(let a of n)s.set(a,(s.get(a)||0)+1);let o=0;for(let a of r){let l=s.get(a)||0;l>0?s.set(a,l-1):o+=1}let i=0;for(let a of s.values())i+=a;return{added:o,removed:i}}function ju(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Dn(s)&&typeof s.text=="string"?s.text:"").join(""):Dn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function xg(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Fu[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Ra(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=Oa(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,i=Array.isArray(n.edits)?n.edits:[];for(let a of i){let l=Oa(Dn(a)?a.old_string:"",Dn(a)?a.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function La(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Ag=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Bu(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Dn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Ag,"").trim();return n.length>0?{kind:"user",text:n}:null}function Ia(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=kg.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:$g.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Sg(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Eg(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let i of s)if(Dn(i)){if(i.type==="text"&&typeof i.text=="string")o.push(Ia(i.text));else if(i.type==="thinking"){let a=La(i.thinking);a&&o.push(a)}else if(i.type==="tool_use"){let a=xg(i);typeof i.id=="string"&&t.set(i.id,a),o.push(a)}}return n?qu(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let i of s)if(Dn(i)&&i.type==="tool_result"){let a=t.get(String(i.tool_use_id));if(a){let l=ju(i.content);a.result=l,a.output=typeof i.content=="string"?i.content:l,i.is_error===!0&&(a.is_error=!0)}}let o=Bu(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?qu([s],n):[s]}return[]}function qu(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Tg(e){let t=typeof e.command=="string"?e.command:"",n=ju(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:Fu.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Cg(e){if(e.type==="item.completed"&&Dn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Ia(t.text)];if(t.type==="user_message"){let n=Bu(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=La(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Tg(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Rg(e){if(e.schema!=="codex-delegation-monitor-v1"||!Dn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Dn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Ia(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let a=La(n.text);return a?[a]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=wg[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",i={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${s}`,i.icon=o,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Og(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Lg(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Dn(t)?t:null}function Uu(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Lg(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Sg(o,r);let i=o.schema==="codex-delegation-monitor-v1"?Rg(o):Og(o)?Cg(o):Eg(o,n);return i.length>0&&(r.progress=null),i}}}function Pa(e){let t=[],n=Uu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Ig=5,Pg=10,Mg=/Task\s+#(\d+)/,Dg=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Ng=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Ss(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function qg(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Fg(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function jg(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=Mg.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let i=t.get(String(o.taskId??""));if(!i)continue;let a=o.activeForm||o.subject;typeof a=="string"&&a.trim().length>0&&(i.label=a.trim()),typeof o.status=="string"&&(i.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Bg(e){if(e.tool==="Bash"){let t=e.command||"";return Dg.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Ng.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Ug(e){let t=e.filter(s=>s.kind==="tool").slice(-Pg),n=new Map;t.forEach((s,o)=>{let i=Bg(s);if(!i)return;let a=n.get(i)||{count:0,last:-1};a.count+=1,a.last=o,n.set(i,a)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Wg(e){let t=Fg(e);if(t)return{text:t,guess:!1};let n=jg(e);if(n)return{text:n,guess:!1};let r=Ug(e);return r?{text:r,guess:!0}:null}function zg(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:gn(e,t)}function Vr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,i=null,a=null,l=null,u=null,p=!1,g={},h=!0,b=new Set,$=new Set,I=null,B=null,Y=!1,oe=!1,K=!1,N=null,w=null;function R(){Y=!1,oe=!1,K=!1,N=null,w=null}async function V(ee){if(n){oe=!0,K=!1,Le();try{let G=await Promise.resolve(n("get-attempt-prompt",{attempt_id:ee,...u?{root_dir:u}:{}}));if(o!==ee)return;!G||typeof G!="object"||Array.isArray(G)?K=!0:(N=G,w=ee)}catch{o===ee&&(K=!0)}finally{o===ee&&(oe=!1,Le())}}}function U(){if(Y=!Y,Y&&o&&w!==o){V(o);return}Le()}function pe(){if(!Y)return"";let ee=Kr({loading:oe,error:K});if(ee)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${ee}
      </div>`;if(!N)return"";if(N.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let G=Go(N.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${G?c`<div class="prompt-block__meta">${G} 발송</div>`:""}
      ${typeof N.task_prompt=="string"?Xn("\uACFC\uC5C5 (user)",N.task_prompt):""}
      ${typeof N.system_prompt=="string"?Xn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",N.system_prompt):""}
    </div>`}function Se(){if(!l||!r)return[];let ee=r.get(l);return Pa(ee?ee.lines:[])}function xe(){if(!l||!r)return null;let ee=r.get(l),G=ee?ee.last_event_at:null;return typeof G=="number"?G:null}function ce(){return g.status==="running"}function se(){if(ce()&&o){B||(B=setInterval(()=>Le(),1e3));return}Ae()}function Ae(){B&&(clearInterval(B),B=null)}function De(ee){let G=[],ge=0;for(;ge<ee.length;){let{idx:it,line:Xe}=ee[ge];if(Xe.kind==="tool"){let Ce=ge;for(;Ce<ee.length&&ee[Ce].line.kind==="tool"&&ee[Ce].line.tool===Xe.tool;)Ce+=1;if(Ce-ge>=Ig&&!$.has(it)){G.push({kind:"group",idx:it,tool:Xe.tool||"",lines:ee.slice(ge,Ce)}),ge=Ce;continue}}G.push({kind:"line",idx:it,line:Xe}),ge+=1}return G}function be(ee){let G=[],ge=new Map;for(let Ce=0;Ce<ee.length;Ce+=1){let Ne=ee[Ce],at=Ne.parent_tool_use_id;if(typeof at=="string"&&at.length>0){let pt=ge.get(at);pt||(pt={kind:"subagent",idx:Ce,launch_id:at,agent_type:null,header:null,lines:[]},ge.set(at,pt),G.push(pt)),pt.lines.push({idx:Ce,line:Ne});continue}if(Ne.kind==="tool"&&Ne.tool==="Agent"&&typeof Ne.launch_id=="string"&&Ne.launch_id.length>0){let pt=X(Ne),lt=ge.get(Ne.launch_id);if(lt){lt.header={idx:Ce,line:Ne},lt.agent_type=pt;continue}let $t={kind:"subagent",idx:Ce,launch_id:Ne.launch_id,agent_type:pt,header:{idx:Ce,line:Ne},lines:[]};ge.set(Ne.launch_id,$t),G.push($t);continue}G.push({kind:"entry",idx:Ce,line:Ne})}let it=[],Xe=0;for(;Xe<G.length;){if(G[Xe].kind!=="entry"){it.push(G[Xe]),Xe+=1;continue}let Ce=Xe;for(;Ce<G.length&&G[Ce].kind==="entry";)Ce+=1;it.push(...De(G.slice(Xe,Ce))),Xe=Ce}return it}function X(ee){let G=ee.input;return G&&typeof G.subagent_type=="string"?G.subagent_type:null}function Z(ee){for(let G=ee.length-1;G>=0;G-=1){let ge=ee[G];if(ge.kind==="result"||ge.kind==="error")return null;if(ge.kind==="tool"&&!Object.hasOwn(ge,"result"))return ge}return null}function ye(ee){for(let G=ee.length-1;G>=0;G-=1)if(ee[G].kind==="thinking")return ee[G];return null}function j(ee,G){if(G.kind==="gate")return c`<div class="sv__gate">${G.text}</div>`;if(G.kind==="phase")return c`<div class="sv__phase">${G.text}</div>`;if(G.kind==="result")return c`<div
        class="sv__result${G.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${G.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${sr(G.text||(G.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(G.kind==="thinking"){let ge=b.has(ee);return c`<div
        class="sv__think${ge?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ht(ee)}
      >
        <span class="sv__think-line">💭 ${Ss(G.text)}</span>
        ${ge?c`<pre class="sv__think-expand">${G.text}</pre>`:""}
      </div>`}if(G.kind==="user"){let ge=b.has(ee);return c`<div
        class="sv__line sv__line--user${ge?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ht(ee)}
      >
        <span class="sv__user-line">▷ ${Ss(G.text)}</span>
        ${ge?c`<pre class="sv__user-expand">${G.text}</pre>`:""}
      </div>`}if(G.kind==="error")return c`<div class="sv__error">⛔ ${G.text}</div>`;if(G.kind==="blocker")return c`<div class="sv__error">⛔ ${G.text}</div>`;if(G.kind==="tool"){let ge=b.has(ee),it=G.tool==="Bash"?qg(G.command):0,Xe=G.tool==="Bash"?it>1?Ss(G.command):G.command:G.path||G.command||"";return c`<div
        class="sv__tool${ge?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ht(ee)}
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
        ${ge?c`<pre class="sv__tool-expand">${te(G)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${sr(G.text||"")}</div>`}function te(ee){let G=[];if(ee.tool==="Bash"&&typeof ee.command=="string"&&ee.command.length>0)G.push(ee.command);else if(ee.input!==void 0)try{G.push(`input: ${JSON.stringify(ee.input,null,2)}`)}catch{}return typeof ee.output=="string"&&ee.output.length>0&&G.push(`output:
${ee.output}`),G.join(`

`)}function fe(){if(!o)return c``;let ee=Se(),G=(i?[g.agent_type,g.model,g.effort]:[g.runner,g.model,g.effort]).filter(Boolean).join(" \xB7 "),ge=g.session_id||"",it=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,Xe=ce(),Ce=Xe?zg(xe(),Date.now()):"",Ne=Xe?Z(ee):null,at=Xe?ye(ee):null,pt=Wg(ee);return c`<div class="sv" data-attempt-id=${o}>
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
        ${ge?c`<button
              type="button"
              class="sv__session"
              title=${ge}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ge}`}
              @click=${()=>mt(ge)}
            >
              ⧉ ${ge.slice(0,8)}
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
              @click=${U}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${h?" sv__follow--on":""}"
          aria-pressed=${h?"true":"false"}
          aria-label=${it}
          @click=${ut}
        >
          <span class="sv__follow-full">⇣ ${it}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
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
      ${i||p?"":pe()}
      <div class="sv__body">
        ${ee.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:be(ee).map(lt=>lt.kind==="subagent"?je(lt):lt.kind==="group"?ve(lt):j(lt.idx,lt.line))}
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
    </div>`}function ve(ee){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ae(ee.idx)}
    >
      <span class="sv__group-icon">${ee.lines[0].line.icon}</span>
      <span class="sv__group-name">${ee.tool}</span>
      <span class="sv__group-count">${ee.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function je(ee){let G=$.has(ee.idx),ge=ee.header?ee.header.line:null,it=ge?ge.is_error===!0?"\u2717":typeof ge.result=="string"?"\u2713":"\u27F3":"",Xe=ge&&ge.command?ge.command:"";return c`<div class="sv__sub${G?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ae(ee.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${ee.agent_type||"subagent"}</span>
        ${Xe?c`<span class="sv__sub-detail">${Xe}</span>`:""}
        <span class="sv__sub-count">${ee.lines.length}줄</span>
        ${it?c`<span class="sv__sub-state">${it}</span>`:""}
        ${G?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${G?c`<div class="sv__sub-body">
            ${De(ee.lines).map(Ce=>Ce.kind==="group"?ve(Ce):j(Ce.idx,Ce.line))}
          </div>`:""}
    </div>`}function ae(ee){$.add(ee),Le()}function Le(){Je(fe(),e),se(),h&&St()}function St(){let ee=e.querySelector(".sv__body");ee&&(ee.scrollTop=ee.scrollHeight)}function ht(ee){b.has(ee)?b.delete(ee):b.add(ee),Le()}function ut(){h=!h,Le()}function mt(ee){Ln(ee).then(G=>{G?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function T(ee){!o||!ee||(g={...g,...ee},Le())}function ne(ee){let G=ee.target;if(!G||!G.classList||!G.classList.contains("sv__body"))return;!(G.scrollHeight-G.scrollTop-G.clientHeight<=4)&&h&&(h=!1,Le())}e.addEventListener("scroll",ne,!0);function Te(ee){let G=ee.target;!G||typeof G.closest!="function"||e.contains(G)||G.closest("dialog")||G.closest(".md-viewer-root")||dt()}let Ie=!1;function Ye(){Ie||(document.addEventListener("mousedown",Te),Ie=!0)}function et(){Ie&&(document.removeEventListener("mousedown",Te),Ie=!1)}function tt(ee){let G=ee&&ee.attempt_id;if(!G)return;let ge=typeof ee.launch_id=="string"&&ee.launch_id.length>0?ee.launch_id:null,it=ee.session_ref&&typeof ee.session_ref=="object"?ee.session_ref:null;if(ge&&it)return;let Xe=l;o=G,i=ge,a=it,l=i?`session-log:${o}:${i}`:`session-log:${o}`,n&&Xe&&Xe!==l&&Promise.resolve(n("unsubscribe-session-log",{id:Xe})).catch(()=>{}),u=typeof ee.root_dir=="string"&&ee.root_dir.length>0?ee.root_dir:null,g=ee.meta||{},p=ee.hide_prompt===!0,h=!0,b.clear(),$.clear(),R(),!I&&r&&(I=r.subscribe(Le)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:o,...i?{launch_id:i}:{},...a?{session_ref:a}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Ye(),Le()}function dt(){let ee=l;et(),o=null,i=null,a=null,l=null,u=null,p=!1,b.clear(),$.clear(),R(),Ae(),n&&ee&&Promise.resolve(n("unsubscribe-session-log",{id:ee})).catch(()=>{}),Je(c``,e),s&&s()}return{open:tt,updateMeta:T,close:dt,isOpen(){return o!==null},destroy(){Ae(),et(),I&&(I(),I=null),e.removeEventListener("scroll",ne,!0),o=null,i=null,a=null,l=null,u=null,p=!1,Je(c``,e)}}}function Hg(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Ko(t.spec_id),s=Ko(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ko(e){return typeof e=="string"?e.trim():""}function Gg(e){let t=Hg(e);if(t.path)return t;let n=Ko(Wu(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Wu(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var Kg=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Es(e){let t=Gg(e),n=Ko(Wu(e).spec_review),r=Kg.test(n),s=r&&n.slice(0,n.indexOf("@"))==="skipped";if(t.source==="none")return{...t,evidence:"none",skipped:s};let o=t.source!=="draft"&&r;return{...t,evidence:o?"published":"draft",skipped:s}}function Vg(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Yg(e){let t=e&&e.metadata||{},n=Es(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Vg(t)?null:"plan_pending"}),r}function zu(e,t){let n=Yg(e);return c`
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
  `}var Zg="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Qg=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Xg=/^\*\*결론\*\* — (.+)$/;function Vo(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Zg)return null;let n=Qg.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let a=i<t.length?Xg.exec(t[i]):null,l=a?a[1].replace(/\s+/g," ").trim():"",u=a?i+1:i;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var Hu=20;function Gu(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Jg(e){return e.length>Hu?`${e.slice(0,Hu)}\u2026`:e}function eb(e,t,n,r){let s=`${t.lane} ${Jg(t.identifier)}`;return c`<div class="detail-report">
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
  </div>`}function tb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
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
            ${a.map(l=>{let u=Vo(typeof l.text=="string"?l.text:"");return u?eb(l,u,t,s.has(l.id)):tb(l)})}
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
  `}var{I:Vk}=uc;var Vu=e=>e.strings===void 0;var nb={},Yu=(e,t=nb)=>e._$AH=t;var $r=qo(class extends Gr{constructor(e){if(super(e),e.type!==Zn.PROPERTY&&e.type!==Zn.ATTRIBUTE&&e.type!==Zn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Vu(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===An||t===Gt)return t;let n=e.element,r=e.name;if(e.type===Zn.PROPERTY){if(t===n[r])return An}else if(e.type===Zn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return An}else if(e.type===Zn.ATTRIBUTE&&n.getAttribute(r)===t+"")return An;return Yu(e),t}});var Yo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Da=[...Yo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Jn=["orchestration_model","orchestration_effort","orchestration_speed"],Zo=[...Yo,...Jn],rb=Da.filter(e=>Zo.includes(e)),Zu=["delegated","main"],Qo=["inherit","claude","codex"],Ts=["default","fast"],Cs=["standard","fast_track"],Rs=["codex","opus","fable","self","skip"],Xo=["codex","fable","skip"],Jo=["low","medium","high","xhigh"],kn="auto";function wn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Qu(e){if(!wn(e)||!wn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))wn(r)&&wn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Yr(e,t){let n=Qu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[kn,...r.flatMap(([,s])=>s)]}function Xu(e,t,n,r){if(!wn(e)||!wn(e.runners))return[kn];let s=[];for(let[o,i]of Object.entries(e.runners))if(!(!wn(i)||!wn(i.models))&&!(t&&t!=="inherit"&&o!==t))for(let[a,l]of Object.entries(i.models)){if(n&&n!==kn&&a!==n)continue;let u=r(i,l);if(Array.isArray(u))for(let p of u)typeof p=="string"&&!s.includes(p)&&s.push(p)}return[kn,...s]}function Zr(e,t,n){return Xu(e,t,n,(r,s)=>wn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Na(e,t,n){return Xu(e,t,n,(r,s)=>wn(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:wn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Os(e,t){let n=Qu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Ju(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Yr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Zr(t,s,r.impl_model||kn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var sb={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ma=[...rb,...Jn],ob=[...Zo,...Da].filter((e,t,n)=>n.indexOf(e)===t&&!Ma.includes(e));function ed(e,t){let n=wn(e)?e:{},r=wn(t)?t:{},s=[];for(let i of Ma){let a=n[i]??null,l=r[i]??null;a!==l&&s.push({key:i,label:sb[i]||i,before:a,after:l,kind:a===null?"added":l===null?"removed":"changed"})}let o=[];for(let i of[...ob,...Object.keys(r)])!Ma.includes(i)&&!o.includes(i)&&Object.hasOwn(r,i)&&o.push(i);return{rows:s,ignored_keys:o}}function qa(e,t,n,r,s,o){return Lo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function td(e,t){let n={};for(let r of Da){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function nd(e,t){let n={};for(let r of Jn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Fa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Jn]}],or={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ei={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ja(e,t,n,r,s,o=null){let i=bn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(a=>({key:a,...i[a]}))}function rd(e,t,n,r,s,o=null){let i={pin:0,global:0,base:0};for(let a of ja(e,t,n,r,s,o))i[a.source]+=1;return i}function sd(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function od(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var o$=[...Yo,...Jn];var ib=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Ba={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},id={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},ab={pin:"pin",global:"global",base:"base"};function lb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${ab[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function cb(e,t,n){switch(e){case"workflow_mode":return Cs;case"spec_review_model":case"impl_review_model":return Rs;case"plan_review_model":return Xo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Jo;case"impl_dispatch":return Zu;case"impl_runtime":return Qo;case"impl_model":return Yr(n,t.impl_runtime);case"impl_effort":return Zr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Ts;case"orchestration_model":return Os(n,null);case"orchestration_effort":return Zr(n,void 0,t.orchestration_model||kn).filter(r=>r!==kn);default:return[]}}function ub(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${lb(e.source)}
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
        >${db(o)}</span
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
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let p=Lo({key:u.key,choices:cb(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return ub(u,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
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
  </details>`}function db(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function pb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function ld(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",i=typeof t.exec_receipt=="string"?t.exec_receipt:"",a=pb(n.exec_receipt),l=a?Gn(a):i,u=a?`${a.kind}:${a.actor}`:i.split("@")[0],p=Ro(n.planned_execution,n.exec_receipt),g=n.chips?.pr?.number,h=typeof g=="number"?`PR #${g}`:"PR";return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${h}</a
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
      ${fb(s).map(b=>_b(b,t,r,{label:b.id==="pr"?h:b.label,href:b.id==="pr"?o:""}))}
    </div>
  </section>`}function fb(e){let n=typeof e=="string"&&Object.hasOwn(Ba,e)&&Ba[e]||Ba.spec_backed;return ib.filter(r=>n.includes(r.id))}var ti={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function _b(e,t,n,r){let s=mb(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,i=typeof o?.fill=="string"?o.fill:null,a=i?i==="full":s.length>0,l=!a&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,p=s&&s.split("@")[1]?.slice(0,7)||"",g=u?ti.stale:a?ti.on:l?ti.current:ti.none,h=gb(e,n),b=`${r.label} \xB7 ${g}${h?` \xB7 ${h}`:""}${s?` \xB7 ${s}`:""}`,$=`detail-summary__gate${a?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${p?" detail-summary__gate--receipt":""}`,I=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${p}</span>`;return r.href?c`<a
      class=${$}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${b}
      >${I}</a
    >`:c`<span
    class=${$}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${I}</span
  >`}function mb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function gb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(id,n)?id[n]:""}function ni(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function cd(e){return ni(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function ud(e,t){let n=e&&e[t];if(!ni(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(cd),s=cd(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function fd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function ri(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${fd(e)}${t}`}function Qr(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${fd(e)}`}function bb(e,t,n){if(n!==null){let s=e==="claude"?ri:Qr,o=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Qr({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function dd(e,t){if(!ni(e)||e.state!=="usable"||!ni(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function pd(e){let t=e.provider_key==="claude"?ri:Qr,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${bb(e.provider_key,e.provider,e.workspace_default)}
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
  </section>`}var md=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Ls(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function si(e){if(!Ls(e)||!Ls(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Ls(n)&&Ls(n.models));return t.length>0?t:null}function Nn(e,t){let n=si(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function gd(e,t){return Ls(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function bd(e,t){let n=si(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return gd(r,r.models[t]);return[]}function hb(e){let t=si(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of gd(r,s))n.includes(o)||n.push(o);return n}function yb(e,t){if(!t)return hb(e);let r=si(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let i of bd(e,o))s.includes(i)||s.push(i);return s}function hd(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=Nn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?bd(t,r.impl_model):yb(t,s);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}function vb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function wb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function oi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",a=null,l="";function u(I){I.key==="Escape"&&s&&(I.preventDefault(),b())}document.addEventListener("keydown",u);function p(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${vb(s)}</span
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
    `:c``}function g(){Je(p(),e)}async function h(I,B={}){s=I,o="loading",i="",a=null,l="",g();let Y=B.workspace||(n?n():"");if(!Y){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",g();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",g();return}let oe="/api/doc?workspace="+encodeURIComponent(Y)+"&path="+encodeURIComponent(I);try{let K=await r(oe),N=await K.json().catch(()=>({}));if(!K.ok||!N||N.ok!==!0){if(N?.error==="not_found"&&B.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",g();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(N&&N.error||K.status)+")",g();return}let w=wb(String(N.content||""));a=w.front,i=w.body,o="ready",g()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",g()}}function b(){s=null,Je(c``,e)}function $(){document.removeEventListener("keydown",u),b()}return{open:h,close:b,destroy:$}}var kb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],wd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ii=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],$b=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function yd(e){return typeof e=="string"&&$b.has(e)}var xb=["running","done","failed","interrupted"],Ab={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Sb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Eb(e){let t=sn(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Hr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${wd}
          >부분 집계</span
        >`:""}`}function vd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function za(e){if(typeof e=="number")return Is(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Is(t):""}function Tb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Cb(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Ua(e){return e===null||typeof e=="string"&&e.trim().length>0}function Wa(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Rb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!ii.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Ua(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Ua(t.effort))||!(!("agent_type"in t)||Ua(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!xb.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Wa(t.started_at)||!Wa(t.last_event_at)||!Wa(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Ob(e,t,n){let s=sn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
  </div>`}function Lb(e,t,n,r){let s=e.status==="running"?null:t,i=(s?sn({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?Is(e.last_event_at):s?za(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,Tb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Cb(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Ab[e.status]}</span
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
  </button>`}function Ib(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Pb(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let g=Rb(p);!g||s.has(g.launch_id)||yd(g.agent_type)||(s.add(g.launch_id),r.push(g))}r.sort((p,g)=>(p.started_at||0)-(g.started_at||0));let i={};for(let{role:p,provider:g}of ii){let h=t?t.roles[p]?.[g]:null;i[p]=h?[...h.legs]:[]}let a=ii.flatMap(({role:p})=>i[p]),l=new Set,u=[];for(let{role:p,provider:g}of ii){for(let h of r.filter(b=>b.role===p&&b.provider===g)){let b=a.find($=>$.receipt_id===h.launch_id)||null;b&&!Ib(h,b)||(b&&l.add(b.receipt_id),u.push(Lb(h,b,e.attempt_id,n)))}for(let h of i[p])!l.has(h.receipt_id)&&!yd(h.agent_type)&&u.push(Ob(p,g,h))}return u}function Mb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...kb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Sb(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${wd}</span>`:""}
  </div>`}var Db={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Is(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Nb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var qb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Fb(e,t){let n=qb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
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
  </div>`}function kd(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],i=[...o.filter(b=>b&&b.current===!0),...o.filter(b=>b&&b.current!==!0).sort((b,$)=>$.index-b.index)],a=i.map(b=>Fb(b,t)),l=n.expanded||new Set;if(s.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let b of s)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&u.add(b.resumed_from);let p=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let I=typeof b.session_id=="string"&&b.session_id.length>0,B=u.has(b.attempt_id),Y=I&&!B,oe=I?B?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!Y}
      title=${oe}
      @click=${K=>{K.stopPropagation(),Y&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},g=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let I=b.cause_detail,B=I&&typeof I.reason=="string"&&I.reason.length>0?typeof I.command=="string"&&I.command.length>0?`${I.reason} \xB7 ${I.command}`:I.reason:b.cause;return c`<div class="detail-session__cause" title=${B}>
      ${b.cause}
    </div>`},h=b=>{let $=vd(la(b));if(sn($).length===0&&!Hr(b.usage))return"";let I=l.has(b.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${I?"true":"false"}
      title=${I?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${B=>{B.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Eb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${a}${s.map(b=>{let $=la(b),I=vd($),B=sn(I);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${b.status||"unknown"}"
            data-attempt-id=${b.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(b.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Db[b.status||""]||"\xB7"}</span
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
          ${h(b)} ${p(b)} ${g(b)} ${Nb(b)}
          ${l.has(b.attempt_id)&&b.usage?Mb(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${Pb(b,$,t)}
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
          ${jb(e)}
        </div>`:""}
  `}function jb(e){let t=Kr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Xn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Go(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Xn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Xn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Bb=["open","in_progress","deferred","resolved","closed"],Ub=[0,1,2,3,4];function xd(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,i=t.queueStore,a=t.execPresetStore,l=t.sessionLogStore,u=null,p=null,g={},h="",b=!1,$=[],I=!1,B={},Y={claude:null,codex:null},oe=null,K=null,N=0,w=!1,R=!1,V="",U="",pe="";function Se(){w=!1,R=!1,V="",U="",pe=""}function xe(){Y={claude:null,codex:null},oe=null,K=null,N+=1}async function ce(){if(!s)return null;try{let x=await Promise.resolve(s("get-workspace-accounts",{}));return x&&typeof x.state=="string"?x:null}catch{return null}}async function se(x){try{let re=await fetch(x);if(!re.ok)return null;let M=await re.json();if(!M||typeof M!="object"||!Array.isArray(M.accounts))return null;let $e=M.accounts.filter(st=>st!==null&&typeof st=="object"&&!Array.isArray(st));return{accounts:$e,active:$e.find(st=>st.active===!0)||null}}catch{return null}}async function Ae(x){K=x;let re=++N,[M,$e,st]=await Promise.all([se("/api/claude-usage"),se("/api/codex-usage"),ce()]);re!==N||x!==u||(Y={claude:M,codex:$e},oe=st,Be())}let De=[],be=null,X=null,Z=!1,ye="",j=!1,te=0,fe=new Set;function ve(){De=[],be=null,X=null,Z=!1,ye="",j=!1,te+=1,fe.clear()}async function je(x){if(!s)return;let re=++te;try{let M=await Promise.resolve(s("get-comments",{id:x}));if(re!==te||x!==u)return;De=Array.isArray(M)?M:[],Z=!1}catch{if(re!==te||x!==u)return;Z=!0}Be()}function ae(){if(!s||!u)return;let x=p&&typeof p.comment_count=="number"?p.comment_count:null;if(be!==u){be=u,X=x,je(u);return}x!==null&&x!==X&&(X=x,je(u))}function Le(x){fe.has(x)?fe.delete(x):fe.add(x),Be()}function St(x){let re=ye.trim().length===0;ye=x,re!==(x.trim().length===0)&&Be()}async function ht(){let x=ye.trim();if(!s||!u||x.length===0||j)return;let re=u;j=!0,Be();let M=!1;try{let $e=await Promise.resolve(s("add-comment",{id:re,text:x}));Array.isArray($e)&&$e.length>0&&(M=!0,re===u&&(De=$e,Z=!1,ye="",X=$e.length))}catch{M=!1}M||de("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),re===u&&(j=!1),Be()}let ut={onToggle:Le,onDraftInput:St,onSubmit:ht},mt=t.mdViewer||null,T=null;mt||(T=document.createElement("div"),T.className="md-viewer-root",document.body.appendChild(T));let ne=mt||oi(T,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Te=document.createElement("div");Te.className="session-log-root",document.body.appendChild(Te);let Ie=Vr(Te,{transport:s?(x,re)=>Promise.resolve(s(x,re)):void 0,sessionLogStore:l}),Ye=!1,et=!1,tt=!1,dt=null,ee=null,G=0;function ge(x){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${x}`}function it(){Ye=!1,et=!1,tt=!1,dt=null,ee=null,G+=1}async function Xe(x){if(!s)return;let re=++G;et=!0,tt=!1,Be();try{let M=await Promise.resolve(s("get-bead-prompt",{bead_id:x}));if(re!==G)return;!M||typeof M!="object"||Array.isArray(M)?tt=!0:(dt=M,ee=ge(x))}catch{re===G&&(tt=!0)}finally{re===G&&(et=!1,Be())}}let Ce=[],Ne=null,at=0;function pt(x,re){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${x}::${re}`}function lt(){Ce=[],Ne=null,at+=1}async function $t(x,re){if(!s)return;let M=++at,$e;try{$e=await Promise.resolve(s("get-session-refs",{bead_id:x}))}catch{$e=null}M!==at||re!==Ne||(Ce=$e&&Array.isArray($e.sessions)?$e.sessions:[],Be())}function Kt(){if(!s||!u)return;let x=p&&p.metadata,re=x&&typeof x=="object"&&typeof x.session_ref=="string"?x.session_ref:null;if(re===null){lt();return}let M=pt(u,re);Ne!==M&&(Ce=[],Ne=M,$t(u,M))}function Bt(){if(Ye=!Ye,Ye&&u&&ee!==ge(u)){dt=null,Xe(u);return}Be()}function Ut(){if(!i||!u)return[];let x=i.get();return(x&&x.attempts?Object.values(x.attempts):[]).filter(M=>M&&M.bead_id===u).sort((M,$e)=>($e.started_at||0)-(M.started_at||0)).map(M=>({attempt_id:M.attempt_id,bead_id:M.bead_id,status:M.status,started_at:typeof M.started_at=="number"?M.started_at:null,runner:M.runner||null,model:M.model||null,effort:M.effort||M.observed_effort||null,speed:M.speed||null,session_id:M.session_id||null,resumed_from:M.resumed_from||null,continuation_mode:M.continuation_mode||null,dismissed_at:typeof M.dismissed_at=="number"?M.dismissed_at:null,cause:typeof M.cause=="string"?M.cause:null,cause_detail:M.cause_detail||null,exec_default_preset_id:typeof M.exec_default_preset_id=="string"?M.exec_default_preset_id:null,exec_default_preset_revision:typeof M.exec_default_preset_revision=="number"?M.exec_default_preset_revision:null,exec_values:M.exec_values&&typeof M.exec_values=="object"?M.exec_values:null,usage:M.usage||null,usage_legs:Array.isArray(M.usage_legs)?M.usage_legs:[],delegation_sessions:Array.isArray(M.delegation_sessions)?M.delegation_sessions:[]}))}function It(){if(!i||!u)return null;let x=i.get();return Sn(x&&x.attempts||{},u)}let yt=new Set;function He(x){yt.has(x)?yt.delete(x):yt.add(x),Be()}function O(x){let re=i?i.get():null,M=re&&re.attempts?re.attempts[x]:null;Ie.open({attempt_id:x,meta:M?{runner:M.runner||void 0,model:M.model||void 0,effort:M.effort||void 0,status:M.status||void 0,session_id:M.session_id||void 0}:{}})}function Q(x,re){let M=i?i.get():null,$e=M&&M.attempts?M.attempts[x]:null,nt=($e&&Array.isArray($e.delegation_sessions)?$e.delegation_sessions:[]).find(bt=>bt&&typeof bt=="object"&&bt.launch_id===re);nt&&Ie.open({attempt_id:x,launch_id:re,meta:{runner:nt.provider==="claude"?"claude":"codex",role:nt.role,...typeof nt.agent_type=="string"?{agent_type:nt.agent_type}:{},model:nt.model,effort:nt.effort,session_id:nt.session_id,status:nt.status}})}async function ue(x){if(!s||!x)return;let re=await Ur();if(re===null)return;let M=()=>{let bt=i?i.get():null;return bt&&typeof bt.revision=="number"?bt.revision:0},$e=async(bt={},Ke=M())=>await s("worker-attempt-resume",{attempt_id:x,expected_revision:Ke,...re!==""?{instructions:re}:{},...bt}),st=bt=>{bt?.queue&&i?.set&&i.set(bt.queue)},nt=await $e();if(st(nt),nt&&nt.conflict){let bt=nt.queue&&typeof nt.queue.revision=="number"?nt.queue.revision:M();nt=await $e({},bt),st(nt)}nt=await Kn(nt,(bt,Ke)=>$e({continuation:bt,decision_token:Ke}),{onResult:st,refresh:()=>$e()}),nt&&nt.resumed===!1&&!nt.conflict&&nt.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${nt.reason}`,"error",2400)}function C(x){!x||!u||Ie.open(Wr(x,u,p&&p.status))}let z={onOpen:O,onOpenDelegation:Q,onResume:ue,onToggleUsage:He,onOpenSessionRef:C,onCopyResumeCommand:ft};function Re(){let x=i?i.get():null,re={...B};for(let M of["orchestration_model","orchestration_effort","orchestration_speed"]){let $e=x&&x[M];typeof $e=="string"&&(re[M]=$e)}return re}async function qe(){if(s){try{let x=await Promise.resolve(s("get-session-defaults",{}));B=x&&x.values&&typeof x.values=="object"?x.values:{}}catch{B={}}Be()}}function we(){let x=i?i.get():null;return x&&x.runner_catalog||null}function Ze(){let x=i?i.get():null;return x&&typeof x.execution_defaults=="object"?x.execution_defaults:null}function ct(){let x=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},M=bn({pin:{...x,...g},global:Re(),execution_defaults:Ze(),runner_catalog:we(),route:typeof x.route=="string"?x.route:null}).orchestration_model.value||"";return Nn(we(),M)}function We(){let x=a?a.get():null;return!x||typeof x.revision!="number"?null:{revision:x.revision,presets:Array.isArray(x.presets)?x.presets:[]}}function ke(x){return x?.compatible===!1}function L(x){a&&x&&typeof x.revision=="number"&&Array.isArray(x.presets)&&a.set({revision:x.revision,presets:x.presets})}async function q(){let x=We(),re=x?.presets.find(M=>M.id===h);if(!(!s||!u||!x||!re||ke(re)||b)){b=!0,$=[],Be();try{let M=await Promise.resolve(s("apply-impl-preset",od(u,re.id,x.revision)));if(M&&M.conflict){L(M),de("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let $e=M&&Array.isArray(M.issue)?M.issue[0]:M?.issue;if(M&&M.applied&&$e&&typeof $e=="object"){p=$e,$=Array.isArray(M.skipped_orchestration_keys)?M.skipped_orchestration_keys.filter(st=>typeof st=="string"):[];for(let st of md)delete g[st];de($.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}M&&M.error==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(M){M&&typeof M=="object"&&M.code==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,Be()}}}let me=null;n&&n.subscribe&&(me=n.subscribe(()=>vt()));let ze=null;i&&typeof i.subscribe=="function"&&(ze=i.subscribe(()=>{u&&Be()}));let he=null;a&&typeof a.subscribe=="function"&&(he=a.subscribe(()=>{u&&Be()}));function Ge(x){x.key==="Escape"&&u&&(x.preventDefault(),r())}document.addEventListener("keydown",Ge);function vt(){if(u){if(n&&typeof n.snapshotFor=="function"){let x=n.snapshotFor("detail:"+u)||[];p=x.find(M=>M&&M.id===u)||x[0]||p}ae(),Kt(),Be()}}function ft(x){Ln(x).then(re=>{re?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Et(x){x.preventDefault(),x.stopPropagation(),u&&ft(u)}function Wt(x,re){x.preventDefault(),x.stopPropagation(),ft(re)}function Me(x,re,M){x.preventDefault(),x.stopPropagation(),ne.open(re,{missing_state:M})}function pn(x,re){g[x]=re,Be(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",sd(u,x,re.length===0?null:re))).catch(()=>{de("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function xt(x,re){let M=p||{},$e=M.metadata&&typeof M.metadata=="object"?M.metadata:{},st={};for(let Ke of["impl_runtime","impl_model","impl_effort"])st[Ke]=Object.hasOwn(g,Ke)?g[Ke]:typeof $e[Ke]=="string"?$e[Ke]:"";st[x]=re;let nt=hd(st,we(),ct()),bt={};for(let Ke of["impl_runtime","impl_model","impl_effort"])bt[Ke]=g[Ke],g[Ke]=nt[Ke]||"";Be(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...nt,orchestration_runtime:ct()})).then(Ke=>{let Ct=Array.isArray(Ke)?Ke[0]:Ke;if(!Ct||typeof Ct!="object"||!Ct.id)throw new Error("implementation target readback failed");p=Ct;for(let f of["impl_runtime","impl_model","impl_effort"])delete g[f];Be()}).catch(()=>{for(let Ke of["impl_runtime","impl_model","impl_effort"])bt[Ke]===void 0?delete g[Ke]:g[Ke]=bt[Ke];Be(),de("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Zt(x,re,M){if(!s||!u)return!1;try{let $e=await Promise.resolve(s(x,re)),st=Array.isArray($e)?$e[0]:$e;return st&&typeof st=="object"&&st.id?(p=st,!0):(de(M,"error"),!1)}catch{return de(M,"error"),!1}}function en(x){setTimeout(()=>{try{let re=e.querySelector(x);re&&typeof re.focus=="function"&&re.focus()}catch{}},0)}function Qt(){w=!0,V=p&&p.title||"",Be(),en('.detail-edit__input[data-edit="title"]')}function rt(x){V=x.target.value}function Xt(){w=!1,V="",Be()}function Ee(){Zt("edit-text",{id:u,field:"title",value:V},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(re=>{re&&(w=!1,V=""),Be()})}function S(){R=!0,U=p&&p.description||"",Be(),en('.detail-edit__textarea[data-edit="description"]')}function _e(x){U=x.target.value}function Oe(){R=!1,U="",Be()}function wt(){Zt("edit-text",{id:u,field:"description",value:U},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(re=>{re&&(R=!1,U=""),Be()})}function Ot(x,re,M,$e){if(x.key==="Escape"){x.stopPropagation(),M();return}x.key==="Enter"&&(!$e||x.ctrlKey||x.metaKey)&&(x.preventDefault(),re())}function gt(x){let re=x.target.value;Zt("update-status",{id:u,status:re},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Be())}function Tt(x){let re=Number(x.target.value);Zt("update-priority",{id:u,priority:re},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Be())}function tn(x){pe=x.target.value}function nn(){let x=pe.trim();x.length!==0&&Zt("label-add",{id:u,label:x},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(re=>{re&&(pe=""),Be()})}function $n(x){if(x.key==="Escape"){x.stopPropagation(),pe="",Be();return}x.key==="Enter"&&(x.preventDefault(),nn())}function Pt(x){Zt("label-remove",{id:u,label:x},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Be())}let yn={onCopyPath:Wt,onOpenDoc:Me};function xn(x){return typeof x=="string"?x:x&&typeof x=="object"?String(x.id||x.to||x.issue_id||x.depends_on||""):""}function E(x){switch(x&&typeof x=="object"?String(x.dependency_type||x.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function d(x){let M=(Array.isArray(x.dependencies)?x.dependencies:[]).map($e=>({id:xn($e),icon:E($e)})).filter($e=>$e.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${M.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${M.map($e=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o($e.id)}
                  >
                    ${$e.icon?`${$e.icon} `:""}${$e.id}
                  </button>`:c`<span class="detail-dep"
                    >${$e.icon?`${$e.icon} `:""}${$e.id}</span
                  >`)}
          </div>`}
    `}function y(x){let re=x.metadata||{},M=x.workflow||{},$e=M.stages||{},st=$e.spec&&$e.spec.stale,nt=$e.impl&&$e.impl.stale,bt=M.quick_fix_review?.state==="stale",Ke=$e.plan||null,Ct=M.route_source==="derived",f=M.route||re.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Ct?" detail-kv__v--derived":""}"
          title=${Ct?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Ct?"unset":f}</span
        >
      </div>
      ${M.route!=="quick_fix"||Object.hasOwn(re,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${re.spec_review||"\uC5C6\uC74C"}${st?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${M.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ke?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ke?.approval_receipt||"\uC5C6\uC74C"}${Ke?.approval_state==="stale"?" \xB7 stale":Ke?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${M.route!=="quick_fix"||Object.hasOwn(re,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${re.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${M.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${M.resolver.attempt} \xB7 ${M.resolver.prior_sha} \u2192 ${M.resolver.sha}`}
              >${`${M.resolver.prior_sha.slice(0,7)} \u2192 ${M.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${M.route==="quick_fix"||Object.hasOwn(re,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${re.quick_fix_review||"\uC5C6\uC74C"}${bt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${M.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${M.planned_execution.kind}</span>
            </div>
            ${M.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${M.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${M.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Gn(M.exec_receipt)}</span
            >
          </div>`:""}
      ${M.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${M.impl_entry.actor}@${M.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${re.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${re.pr_url}</span>
          </div>`:""}
    `}let A={route:["quick_fix","spec_backed","full_plan"]};async function H(x,re){let M=re.target.value;if(x==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&M!=="full_plan"&&!window.confirm(`full_plan \u2192 ${M||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Be();return}await Zt("update-workflow-meta",{id:u,key:x,value:M},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Be()}function le(x){let re=x.metadata||{};return c` ${(($e,st)=>{let nt=A[$e],bt=typeof re[$e]=="string"?re[$e]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${$e}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${$e}
          data-edit=${`wfmeta-${$e}`}
          @change=${Ke=>H($e,Ke)}
        >
          <option value="" ?selected=${!nt.includes(bt)}>
            ${st}
          </option>
          ${nt.map(Ke=>c`<option value=${Ke} ?selected=${bt===Ke}>${Ke}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Fe(x,re){return w?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${V}
            @input=${rt}
            @keydown=${M=>Ot(M,Ee,Xt,!1)}
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
        <h2 class="detail-overlay__title">${x}</h2>
        ${sn(re).map(M=>c`<span class="detail-usage-total" title=${M.tooltip}
              >${M.label}</span
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
    `}function Qe(x){let re=rn(x.created_at),M=rn(x.updated_at);return!re&&!M?c``:c`
      ${re?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${re}</span>
          </div>`:""}
      ${M?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${M}</span>
          </div>`:""}
    `}function qt(x,re){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${gt}
        >
          ${Bb.map(M=>c`<option value=${M} ?selected=${M===x}>${M}</option>`)}
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
          ${Ub.map(M=>c`<option value=${String(M)} ?selected=${M===re}>
                P${M}
              </option>`)}
        </select>
      </div>
    `}function zt(x){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${R?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${S}
            >
              ✎
            </button>`}
      </div>
      ${R?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${U}
              @input=${_e}
              @keydown=${re=>Ot(re,wt,Oe,!0)}
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
            ${x||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function fn(x){let re=typeof x.notes=="string"?x.notes:"";return re.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${re}</div>
    `}function vn(x){let re=Array.isArray(x.labels)?x.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${re.map(M=>c`<span class="detail-label-chip"
              >${M}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${M}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+M}
                @click=${()=>Pt(M)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${pe}
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
    `}function _n(){if(!u)return c``;let x=p||{},re=String(x.id||u),M=x.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",$e=It(),st=x.status||"open",nt=typeof x.priority=="number"?Math.max(0,Math.min(4,x.priority)):"",bt=x.description||"",Ke={...x,metadata:{...x.metadata||{},...g}};return c`
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
              ${re}
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
          ${Fe(M,$e)}
          ${ld(Ke)}
          ${ad({metadata:Ke.metadata,workspace_values:Re(),catalog:we(),execution_defaults:Ze(),expanded:I,presets:We()?.presets||[],preset_id:h,preset_busy:b,skipped_orchestration_keys:$},{onToggle:Ct=>{I=Ct,Be()},onEdit:(Ct,f)=>{if(Ct==="impl_runtime"||Ct==="impl_model"||Ct==="impl_effort"){xt(Ct,f??"");return}pn(Ct,f??"")},onPresetSelect:Ct=>{h=Ct,$=[],Be()},onPresetApply:()=>{q()}})}
          ${_d({md:Ke.metadata,catalog:Y,workspace_defaults:oe,handlers:{onExecChange:pn}})}
          ${qt(st,nt)} ${Qe(x)}
          ${zt(bt)}
          ${Ku(De,ut,{expanded:fe,draft:ye,sending:j,error:Z})}
          ${fn(x)} ${vn(x)} ${d(x)}
          ${y(x)} ${le(x)}
          ${zu(x,yn)}
          ${$d({expanded:Ye,loading:et,error:tt,data:dt},{onToggle:Bt})}
          ${kd(Ut(),z,{total:$e,expanded:yt},Ce)}
        </div>
      </div>
    `}function Be(){Je(_n(),e)}return{load(x){x!==u&&(g={},h="",$=[],I=!1,Se(),ve(),it(),lt(),xe()),u=x,p=null,vt(),qe(),K!==x&&Ae(x)},clear(){u=null,p=null,g={},h="",b=!1,$=[],I=!1,Se(),ve(),it(),lt(),xe(),ne.close(),Ie.close(),Je(c``,e)},destroy(){me&&(me(),me=null),ze&&(ze(),ze=null),he&&(he(),he=null),document.removeEventListener("keydown",Ge),mt||(ne.destroy(),T&&T.parentNode&&T.parentNode.removeChild(T)),Ie.destroy(),Te.parentNode&&Te.parentNode.removeChild(Te),u=null,p=null,xe(),h="",b=!1,$=[],ve(),it(),lt(),Je(c``,e)}}}function Ad(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),a=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,p,g="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=p||"An unrecoverable error occurred.");let h=typeof g=="string"?g.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>a()),t.addEventListener("cancel",u=>{u.preventDefault(),a()}),{open:l,close:a,getElement(){return t}}}function ai(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Sd(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function xr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function li(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let i=o.kind;n.set(i,(n.get(i)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let i=n.get(s);i!==void 0&&r.push(i?`${o} \xB7 \uC790\uB3D9`:o)}return r}function ci(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let i=o.started_at,a=o.finished_at;typeof i!="number"||typeof a!="number"||!Number.isFinite(i)||!Number.isFinite(a)||a<i||(n+=a-i,r=!0)}return r?n:null}function ui(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Wb(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:s?{sha:ai(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Ed(e,t){let n=Wb(e,t);return n?c`<button
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
  </div>`}function zb(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ms(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function di(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function qn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(g=>g&&g.bead_id===t&&g.phase!=="done").sort((g,h)=>(g.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,a=typeof s?.last_error=="string"?s.last_error:null,l=s?zb(s.phase):null,u=s?.kind==="stale_work_backup_fresh",p=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!s||!!a),label:u?a?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":a?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(a?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${a} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${a} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:a,confirmation:p}}function Ps(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
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
  </div>`}var Hb={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Td(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function a(u){return Number.isInteger(i[u])?Number(i[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Hb[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${a("branch_ahead")}`:[`staged ${a("staged_count")}`,`unstaged ${a("unstaged_count")}`,`untracked ${a("untracked_count")}`,`branch ahead ${a("branch_ahead")}`,`HEAD ahead ${a("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function pi(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Gb(e){return c`<div
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
        >`:""}${s?Gb(s):""}
  </div>`}function _i(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Kb(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
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
  >`}function Vb(e){let t=Array.isArray(e.badges)?e.badges:[],n=sn(e.usage),r=Vn(e.usage),s=gn(e.done_at);return c`<div
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
  </div>`}function ir(e){if(e.lane==="done"&&e.done_layout==="three_line")return Vb(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=sn(e.usage),s=Vn(e.usage),o=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!i,l=a?gn(e.done_at):"",u=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",g=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,$=e.lane==="done"?"":_i(e.workflow),I=e.lane==="done"?"":Cd(e.from_id),B=mi(e.priority),Y=c`<span class="worker-mini__title">${e.title}</span>`,oe=Rd(e.pr_url,e.pr_number),K=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",N=n.map(fe=>fe===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${fe}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${fe===e.completion_badge&&e.completion_title||""}
          >${fe}</span
        >`),w=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",R=r.length>0?r.map(fe=>c`<span class="worker-usage" title=${fe.tooltip}
              >${fe.label}</span
            >`):s?c`<span class="worker-usage" title=${_s(e.usage)}
            >${s}</span
          >`:"",V=o?c`<span
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
      </button>`:"",pe=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",Se=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",xe=e.discard,ce=xe?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${xe?.attempt_id||""}
          data-operation-id=${xe?.operation?.operation_id||""}
          data-discard-mode=${xe?.confirmation||"unmerged"}
          ?disabled=${xe?!xe.enabled:e.discard_enabled===!1}
          title=${xe?xe.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${xe?.label||"\uD3D0\uAE30"}
        </button>`:"",se=e.stale_work||null,Ae=se?c`${se.can_resume||se.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${se.action_id}
            ?disabled=${se.locked}
          >
            기존 작업 이어가기
          </button>`:""}${se.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${se.action_id}
            ?disabled=${se.locked}
          >
            백업 후 새로 시작
          </button>`:""}${se.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${se.action_id}
            ?disabled=${se.locked}
          >
            다시 확인
          </button>`:""}`:"",De=se?c`<div class="worker-mini__stale">
        <strong>${se.title}</strong>
        <span>${se.summary}</span>
        <span>${se.cause}</span>
        ${se.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",be=e.revise_action?c`<button
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
        </button>`:"",X=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Z=h||$||I||X||R?c`<div class="worker-chips">
          ${h}${$}${I}${X?pi(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${R}
        </div>`:"",ye=fi(e.dependency_chips),j=Ps(e),te=!!(o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||xe?.operation||e.revise_action||se);return c`<div
    class="worker-mini${i?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${h}${b}${B}${I}${oe}${Y}
          </div>
          <div class="worker-mini__row2">
            ${R}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${rn(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${Sd(e.work_kind)}
                  >작업 ${xr(e.work_ms)}</span
                >`:""}${N}${V}
            <span class="worker-mini__actions"
              >${U}${pe}${Se}${ce}</span
            >
            ${Xr(e)}
          </div>`:i?c`<div class="worker-mini__head">
              ${u}${p}${b}${B}${oe}${K}${N}${g}${w}
            </div>
            <div class="worker-mini__body">${Y}${De}</div>
            ${ye}${Z}${te?c`<div class="worker-mini__foot">
                  ${V}
                  <span class="worker-mini__actions"
                    >${U}${pe}${Se}${ce}${be}${Ae}</span
                  >
                  ${Ps(e)}
                </div>`:""}
            ${Xr(e)}`:c`<div class="worker-mini__line">
              ${u}${p}${b}${B}${Y}${oe}${K}${N}${g}${w}${V}${U}${pe}${Se}${ce}
            </div>
            ${ye}${Z}${j} ${Xr(e)}`}
  </div>`}function Yb(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(c`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(c`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var Zb={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50"};function Ha(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,i=e.session_preferred===!0,a=Zb[e.session_preferred_reason||""]||"",l=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),p=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),g=fi(e.dependency_chips),h=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=_i(l),$=Cd(e.from_id),I=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
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
            >`:""}${Kb(l)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${l?To(l,e.status,{onOpenDoc:n.onOpenDoc}):""}${g}
    ${h||b||$||I?c`<div class="worker-chips">
          ${h}${b}${$}${pi(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason||n.dep_action===!0?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${Yb(t.lanes,e.id)}
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
  </section>`}function gi(e){return e.replace(/\/+$/,"")}function Qb(e,t){let n=gi(e),r=gi(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function bi(e,t){let n=new Set;for(let r of e)for(let s of t){if(!Qb(r,s))continue;let o=gi(r),i=gi(s);n.add(o.length>=i.length?o:i)}return[...n].sort()}function Ld(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let i of t){if(o.has(i.id))continue;o.add(i.id);let a=r[i.id];if(!a||!Array.isArray(a.scope))continue;let l=a.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),s.push({member:i,scope:l})}for(let i=0;i<s.length;i+=1)for(let a=i+1;a<s.length;a+=1){let l=bi(s[i].scope,s[a].scope);if(l.length===0)continue;let u=s[i].member,p=s[a].member;n.get(u.id)?.overlaps.push({id:p.id,title:p.title,location_label:p.location_label,prefixes:l}),n.get(p.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}var Od=["parallel","serial","candidate"];function Ds(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function Ga(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,i=s.lane_id;if(o!==null&&o===i)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let a=Od.includes(r.kind),l=Od.includes(s.kind);if(a&&i!==null)return{kind:"ops",title:`${i} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:i,index:n.serial_raw_lengths[i]||0}]};if(o!==null&&l&&i===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(a&&o===null&&l&&i===null){let u=Xb(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!a&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:a?{kind:"note",text:`${Ds(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Ds(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function Xb(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Id={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Pd={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Ya(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ka(e){for(let t of Ya(e))if(Object.hasOwn(Id,t))return Id[t];return null}function Va(e){let t=null;for(let n of Ya(e))Object.hasOwn(Pd,n)&&(t=Pd[n]);return t}function Jr(e){let t=Ka(e),n=Va(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Dd(e,t){let n=Ka(e)??Ka(t),r=Va(t)??Va(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Jb=new Set(["repo_operation_timeout_unresolved"]);function eh(e){for(let t of Ya(e))if(Jb.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function th(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Nd(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||eh(n.code))return"";if(n.code==="timeout"){let s=Number(t);return Number.isFinite(s)&&s>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(s/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(th(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${xr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Md={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function qd(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Md,t.blocked_reason)?Md[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=Jr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=Jr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}var Fd=160;function nh(e){return e.length>Fd?`${e.slice(0,Fd)}\u2026`:e}function rh(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${nh(e.command)}</code>`:""}
  </div>`}function sh(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function oh(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function jd(e){let t=e.failure?Jr(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${rh(e.failure.cause_detail,e.failure.reason)}
          ${sh(e.failure.reason)}
          ${Ps({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function ih(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var ah=new Set(["codex-runner"]);function lh(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",i=s&&typeof s.at=="number"?s.at:null,a=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&ah.has(b.agent_type))),l=a.filter(b=>b&&b.state==="live"),u=a.filter(b=>b&&b.state!=="live"),p=r&&typeof r.last_event_at=="number"?gn(r.last_event_at,t):"",g=r?gn(r.updated_at,t):"",h=p?`\uCD5C\uADFC \uD65C\uB3D9 ${p}`:g?`\uAC31\uC2E0 ${g}`:"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${gn(i,t)}</span
            >`:""}
      </div>`:h?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${h}</span>
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
      </div>`:""}`}var ch={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function uh(e){if(!e)return"";let t=ch[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Za(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(se=>se&&se.current===!0)||null,i=e.failed===!0,a=!!e.paused,l=i?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?oh(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,p=ds(e),g=sn(e.usage),h=Vn(e.usage),b=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,$=e.base_exception||null,I=e.landing,B=e.attempt_id&&e.attempt_id===n,Y=r.monitor||null,oe=ih(Y),K=Y?fi(Y.dependency_chips):"",N=lh(Y,t,a,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),w=s&&e.workflow?.chips?.exec_receipt||null,R=_i(e.workflow),V=w?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Gn(w)}`}
        >${`${w.kind}:${Co(w)}`}</span
      >`:"",U=o?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${fs(o)}</span
      >`:"",pe=oe||R||U||V?c`<div class="rtile__meta">
          ${oe}${R}${U}${V}
        </div>`:"",Se=c`${b?c`<span class="worker-mini__badge">${b}</span>`:""}${$?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${$}</span
      >`:""}`,xe=s?"":Xr(e),ce=e.discard?.action?c`<button
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
      ${mi(e.priority)}${p?c`<span class="rtile__resumed" title=${p}>↻</span>`:""}${Se}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${l}</span>`:""}${uh(o)}<span
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
                ${ce}
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
                ${ce}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${N}${e.rollup?Eo(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ta}):""}
    ${I?c`<div class="rtile__landing">
          <span
            class="merge-step${I.failed?" merge-step--failed":""}"
            style=${`--progress: ${I.percent}%`}
            >${I.label}${I.index>0?c`<span class="merge-step__n"
                  >${I.index}/${I.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${K}
    ${s?pe:oe||R||u||g.length>0||h?c`<div class="rtile__meta">
            ${oe}${R}${pi(e.exec_chips)}
            ${g.length>0?g.map(se=>c`<span class="worker-usage" title=${se.tooltip}
                      >${se.label}</span
                    >`):h?c`<span
                    class="worker-usage"
                    title=${_s(e.usage)}
                    >${h}</span
                  >`:""}
          </div>`:""}
    ${Ps(e)} ${xe}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${i||a?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Qa(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>Za(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var Xa=new Set(["unavailable","not_applicable"]);function ar(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Bd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function lr(e,t){return t===null?null:`${or[e]}: ${t.display} (${ei[t.source]})`}function Ja(e){return e.filter(t=>t!==null).join(`
`)}function Ns(e){if(typeof e!="object"||e===null)return null;let t=vr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Ja(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(or.orchestration_model,e.model),n(or.orchestration_effort,e.effort),n(or.orchestration_speed,e.speed)])}}function Ar(e,t){let n=ar(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=ar(e,"orchestration_effort"),s=ar(e,"orchestration_speed"),o=Bd([Nn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Ja(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",lr("orchestration_model",n),lr("orchestration_effort",r),lr("orchestration_speed",s)])}}function dh(e,t){return e===null||e.value===null||Xa.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function ph(e){return e===null||Xa.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function fh(e){return e===null?null:e.value==="auto"?"auto":Xa.has(e.resolution)?null:e.display}function cr(e,t){if(typeof e!="object"||e===null)return null;let n=ar(e,"impl_dispatch"),r=ar(e,"impl_runtime"),s=ar(e,"impl_model"),o=ar(e,"impl_effort"),i=ar(e,"impl_speed"),a=n!==null&&n.value==="main"?"\uBA54\uC778":Bd([dh(r,t??null),ph(s),fh(o),i!==null&&i.value==="fast"?"Fast":null]);return a===""?null:{text:a,title:Ja(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",lr("impl_dispatch",n),lr("impl_runtime",r),lr("impl_model",s),lr("impl_effort",o),lr("impl_speed",i)])}}var on="",_h=["impl_runtime","impl_model","impl_effort"],mh=["claude_account","codex_account"],gh=5,hi=1;function hn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function yi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(O=>de(O,"error",4e3)),o={},i={},a=[],l=!1,u={state:"absent",values:{},warnings:[]},p={},g={},h=Promise.resolve(),b={claude:null,codex:null},$=!1,I=null,B={},Y="",oe="",K=!1,N=!1,w=!1,R=null,V=!1;function U(){let O=t.queue?t.queue():null;return hn(O)?O:null}function pe(){let O=U();return O?O.runner_catalog:null}function Se(){let O=U();return O&&hn(O.execution_defaults)?O.execution_defaults:null}function xe(){let O=t.implPresetStore?.get();return hn(O)&&Array.isArray(O.presets)?O:null}function ce(){return r===null?{}:{root_dir:r}}async function se(O,Q){return V||!n?null:await n(O,Q)}function Ae(O){O&&hn(O.queue)&&t.onQueueAdopt?.(O.queue)}async function De(O,Q){let ue=U();if(!ue||V)return null;let C=await se(O,{...Q,...ce(),expected_revision:ue.revision});if(Ae(C),r!==null&&C&&C.conflict){let z=C.queue&&typeof C.queue.revision=="number"?C.queue.revision:U()?.revision??ue.revision;C=await se(O,{...Q,...ce(),expected_revision:z}),Ae(C)}return C}async function be(){l=!0,He();try{let O=await se("get-session-defaults",{...ce()});o=hn(O?.values)?{...O.values}:{},i={...o},a=Array.isArray(O?.warnings)?O.warnings:[]}catch(O){a=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${O instanceof Error?O.message:String(O)}`)}finally{l=!1,He()}}async function X(){let O=td(o,i);if(Object.keys(O).length!==0){try{let Q=await se("set-session-defaults",{values:O,...ce()});o=hn(Q?.values)?{...Q.values}:{},i={...o},a=Array.isArray(Q?.warnings)?Q.warnings:[]}catch(Q){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}He()}}function Z(O,Q){if(!hn(O))return;let ue=O.state;u={state:ue==="usable"||ue==="unusable"||ue==="absent"?ue:"absent",values:hn(O.values)?{...O.values}:{},warnings:Array.isArray(O.warnings)?O.warnings:[]},g={...u.values},Q&&(p={...g})}async function ye(){try{Z(await se("get-workspace-accounts",{...ce()}),!0)}catch(O){u={state:"unusable",values:{},warnings:["kv_read_failed"]},g={},p={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${O instanceof Error?O.message:String(O)}`)}He()}async function j(O){try{let Q=await fetch(O);if(!Q.ok)return null;let ue=await Q.json();if(!hn(ue)||!Array.isArray(ue.accounts))return null;let C=ue.accounts.filter(z=>hn(z)&&typeof z.key=="string"&&z.key.length>0&&typeof z.email=="string"&&z.email.length>0);return{accounts:C,active:C.find(z=>z.active===!0)||null}}catch{return null}}async function te(){$=!0;let[O,Q]=await Promise.all([j("/api/claude-usage"),j("/api/codex-usage")]);V||(b={claude:O,codex:Q},He())}function fe(){let O={};for(let Q of mh){let ue=Object.hasOwn(p,Q)?p[Q]:null,C=Object.hasOwn(g,Q)?g[Q]:null;ue!==C&&(O[Q]=ue)}return O}async function ve(){let O=fe();if(Object.keys(O).length!==0){try{Z(await se("set-workspace-accounts",{values:O,...ce()}),!1)}catch(Q){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}He()}}function je(O,Q){Q===on?delete p[O]:p[O]=Q,He(),h=h.then(()=>ve())}function ae(O,Q){if(_h.includes(O)){ht(O,Q);return}Q===on?delete i[O]:i[O]=Q,He(),X()}function Le(){let O=It().orchestration_model,Q=bn({global:{orchestration_model:O??void 0},execution_defaults:Se(),runner_catalog:pe()}).orchestration_model.value;return Q?Nn(pe(),Q):null}function St(O,Q){typeof Q=="string"&&Q.length>0?i[O]=Q:delete i[O]}function ht(O,Q){let ue=Q===on?void 0:Q,C=Ju({impl_runtime:O==="impl_runtime"?ue:i.impl_runtime,impl_model:O==="impl_model"?ue:i.impl_model,impl_effort:O==="impl_effort"?ue:i.impl_effort},pe(),Le());St("impl_runtime",C.impl_runtime),St("impl_model",C.impl_model),St("impl_effort",C.impl_effort),He(),X()}async function ut(){let O=U();if(!O)return;let Q={orchestration_model:O.orchestration_model??null,orchestration_effort:O.orchestration_effort??null,orchestration_speed:O.orchestration_speed??null},ue=nd(Q,{...Q,...B});if(Object.keys(ue).length!==0){try{let C=await De("worker-queue-set-orchestration-defaults",{values:ue});if(C&&C.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}B={}}catch(C){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}He()}}function mt(O,Q){B[O]=Q===on?null:Q,He(),ut()}function T(O){if(I=O,!O){He();return}let Q=pe(),ue=It(),C=ue.orchestration_model;C&&!Os(Q,O).includes(C)&&(B.orchestration_model=null,C=null);let z=ue.orchestration_effort;z&&!Na(Q,O,C||kn).includes(z)&&(B.orchestration_effort=null),He(),ut()}async function ne(O){if(!(!U()||O<hi)){try{await De("worker-queue-set-slots",{slots:O})}catch(Q){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}He()}}async function Te(O){if(!(!U()||O<hi||O>gh)){try{await De("worker-queue-set-serial-lane-count",{count:O})}catch(Q){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}He()}}async function Ie(O,Q){let ue=O==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await De(ue,{on:Q})}catch(C){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}He()}function Ye(){let O={},Q=It();for(let ue of Zo){let C=Jn.includes(ue)?Q[ue]:i[ue];typeof C=="string"&&C.length>0&&(O[ue]=C)}return O}async function et(){let O=xe();if(!O)return;let Q=Ye();if(Object.keys(Q).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ue=(O.presets||[]).find(z=>z.id===Y),C=oe.trim()||(ue?ue.name:"");if(!C){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let z=ue?await se("impl-preset-update",{expected_revision:O.revision,id:ue.id,name:C,settings:Q}):await se("impl-preset-create",{expected_revision:O.revision,name:C,settings:Q});if(z&&z.applied){if(oe="",!ue&&Array.isArray(z.presets)){let Re=z.presets.find(qe=>qe.name===C);Y=Re?Re.id:Y}He()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),He()}catch(z){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${z instanceof Error?z.message:String(z)}`)}}async function tt(){let O=xe();if(!(!O||Y.length===0))try{let Q=await se("impl-preset-delete",{expected_revision:O.revision,id:Y});Q&&Q.applied?(Y="",He()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),He())}catch(Q){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}}function dt(O){o=hn(O.values)?{...O.values}:{},i={...o},a=Array.isArray(O.warnings)?O.warnings:[],hn(O.queue)&&(t.onQueueAdopt?.(O.queue),B={})}async function ee(){let O=xe(),Q=U();if(!O||!Q||Y.length===0)return;let ue=C=>({preset_id:Y,expected_revision:O.revision,expected_queue_revision:C,...ce()});try{let C=await se("apply-impl-preset-global",ue(Q.revision));if(C&&C.applied&&dt(C),r!==null&&C&&C.queue_applied===!1){let z=C.queue&&typeof C.queue.revision=="number"?C.queue.revision:U()?.revision??Q.revision;C=await se("apply-impl-preset-global",ue(z)),C&&C.applied&&dt(C)}C&&C.applied?C.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):C&&C.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(C){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}He()}async function G(){N=!0,w=!1,He();try{let O=await se("get-worker-system-prompt",{});!O||typeof O!="object"||Array.isArray(O)?w=!0:R=O}catch{w=!0}finally{N=!1,He()}}function ge(){if(K=!K,K&&!R){G();return}He()}function it(){let O=Kr({loading:N,error:w});if(O)return O;if(!R)return"";let Q=Array.isArray(R.variants)?R.variants:[];return c`<div class="settings-dialog__sp-body">
      ${R.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${R.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${Q.map(ue=>c`<div class="settings-dialog__sp-variant" data-variant=${ue.key}>
            <div class="settings-dialog__sp-cond">${ue.condition}</div>
            ${Xn(ue.label,ue.system_prompt)}
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
        @click=${ge}
      >
        ${K?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${K?it():""}
    </section>`}function Ce(O,Q,ue,C,z,Re,qe){let we=z[O]??on,Ze=qa(O,ue,z,Se(),pe(),qe),ct=Ze.options.find(ke=>ke.value===we),We=we===on?Ze.full_value:ct?.full_value;return c`<select
        class=${we===on?"settings-dialog__unset":""}
        data-key=${O}
        aria-label=${Q}
        title=${We||""}
        ?disabled=${Re===!0||Ze.disabled}
        .value=${$r(String(we))}
        @change=${ke=>C(O,String(ke.target.value))}
      >
        <option value=${on} ?selected=${we===on}>
          ${Ze.unset_label}
        </option>
        ${Ze.options.map(ke=>c`<option
              value=${ke.value}
              title=${ke.full_value||""}
              ?selected=${ke.value===we}
            >
              ${ke.label}
            </option>`)}
      </select>
      ${we===on?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ne(O,Q,ue,C,z,Re=!1,qe){return c`<div
      class=${`settings-dialog__row${Re?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        ${Ce(O,Q,ue,C,z,Re,qe)}
      </span>
    </div>`}function at(O,Q){let ue=Q?Q.active:null;return hn(ue)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${O==="claude"?ue.email:Qr({...ue,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function pt(O,Q,ue){let C=b[ue],z=Object.hasOwn(p,O)?p[O]:on,Re=ue==="claude"?ri:Qr,qe=!!C?.accounts.some(we=>we.key===z);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${Q}
          data-account-key=${O}
          @change=${we=>je(O,String(we.target.value))}
        >
          <option value=${on} ?selected=${z.length===0}>
            ${at(ue,C)}
          </option>
          ${z.length>0&&!qe?c`<option value=${z} selected>
                ${z} (목록에 없음)
              </option>`:""}
          ${C?.accounts.map(we=>c`<option value=${we.key} ?selected=${we.key===z}>
                ${Re(we)}
              </option>`)||""}
        </select>
        ${C?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function lt(){let O=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${O} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${O}`:null}function $t(O,Q,ue,C,z){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${Q}-on)`}
        ></i>
        ${O}
      </span>
      <span class="settings-dialog__controls">
        ${Ce(ue,`${O} \uBAA8\uB378`,C,ae,i,!1)}
        ${Ce(z,`${O} effort`,Jo,ae,i,!1)}
      </span>
    </div>`}function Kt(O,Q,ue,C){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${C?" is-on":""}`}
          data-automation=${O}
          aria-pressed=${C?"true":"false"}
          aria-label=${Q}
          @click=${()=>Ie(O,!C)}
        >
          ${C?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ue}</span>
      </span>
    </div>`}function Bt(O,Q,ue,C){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${O}>
          <button
            type="button"
            aria-label=${`${Q} \uAC10\uC18C`}
            @click=${()=>C(ue-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ue}</span>
          <button
            type="button"
            aria-label=${`${Q} \uC99D\uAC00`}
            @click=${()=>C(ue+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ut(O){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${O.rows.length>0?`\uBCC0\uACBD ${O.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${O.rows.map(Q=>c`<div
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
      ${O.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${O.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function It(){let O=U(),Q={};for(let ue of Jn)Q[ue]=Object.prototype.hasOwnProperty.call(B,ue)?B[ue]:O&&typeof O[ue]=="string"?O[ue]:null;return Q}function yt(){let O=pe(),Q=i.impl_runtime,ue=i.impl_model,C=xe(),z=U(),Re=It(),qe=Os(O,I),we=Yr(O,void 0).filter(he=>he!==kn),Ze=Na(O,I,Re.orchestration_model||kn).filter(he=>he!==kn),ct=Y?(C?.presets||[]).find(he=>he.id===Y):null,We=ct?ed(Ye(),hn(ct.settings)?ct.settings:{}):null,ke=z&&typeof z.slots=="number"?z.slots:hi+1,L=z&&typeof z.serial_lane_count=="number"?z.serial_lane_count:hi,q=Se()?.supported===!0,me=lt(),ze=qa("workflow_mode",Cs,i,Se(),O);return c`
      ${a.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${a.join(", ")}
          </div>`:""}
      ${me?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${me}
          </div>`:""}
      ${q?"":c`<div
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
                @change=${he=>{Y=String(he.target.value),He()}}
              >
                <option value="" ?selected=${Y===""}>
                  실행 프리셋…
                </option>
                ${(C?.presets||[]).map(he=>c`<option
                      value=${he.id}
                      ?selected=${he.id===Y}
                    >
                      ${he.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!We||We.rows.length===0}
                @click=${ee}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${Y?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${$r(oe)}
                @input=${he=>{oe=String(he.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${Y?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${et}
              >
                ${Y?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${Y.length===0}
                @click=${tt}
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
                    .value=${$r(I||on)}
                    @change=${he=>{let Ge=String(he.target.value);T(Ge===on?null:Ge)}}
                  >
                    <option value=${on} ?selected=${!I}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${I==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${I==="codex"}
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
                      @click=${()=>ae("workflow_mode",on)}
                    >
                      ${ze.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Cs.map(he=>c`<button
                          type="button"
                          data-mode=${he}
                          aria-pressed=${String(i.workflow_mode===he)}
                          @click=${()=>ae("workflow_mode",he)}
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
              ${Ne("impl_runtime","\uC704\uC784 \uB300\uC0C1",Qo,ae,i)}
              ${Ne("impl_model","\uBAA8\uB378",Yr(O,Q),ae,i)}
              ${Ne("impl_effort","effort",Zr(O,Q,ue),ae,i)}
              ${Ne("impl_speed","\uC18D\uB3C4",Ts,ae,i)}
              ${Ne("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",we,ae,i,!1,{...i,...Re})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Kt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",z?.auto_advance===!0)}
              ${Kt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",z?.auto_merge===!0)}
              ${Bt("slots","\uB3D9\uC2DC \uC2E4\uD589",ke,he=>ne(he))}
              ${Bt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",L,he=>Te(he))}
            </div>
            ${Xe()}
          `}
    `}function He(){V||Je(yt(),e)}return{load(){B={};let O=[be(),ye()];return $||O.push(te()),Promise.all(O).then(()=>{})},render:He,sessionDraft:()=>({...i}),destroy(){V=!0,Je(c``,e)}}}function vi(e){return c`<svg
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
    />`)}function Gd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Kd(e){let t=(Array.isArray(e)?e:[]).map(a=>a&&a.usage).filter(a=>a&&typeof a=="object"&&"providers"in a);if(t.length>0)return sn(Po(t));let n={};for(let a of Wn)n[a]=0;let r=!1,s=0,o=0,i=0;for(let a of Array.isArray(e)?e:[]){let l=a&&a.usage;if(l&&typeof l=="object"){let u=!1;for(let p of Wn){let g=l[p];typeof g=="number"&&Number.isFinite(g)&&(n[p]+=g,r=!0,u=!0)}if(u){o+=1;let p=l.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,i+=1)}}}return o>0&&i===o&&(n.total_cost_usd=s),r?Vn(n):null}function Fn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function el(e,t){let n=Fn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function bh(e,t){if(!Fn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function hh(e){if(!Fn(e)||!Fn(e.execution_defaults)||!Fn(e.runner_catalog)||!Fn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=bn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Nn(e.runner_catalog,n.orchestration_model.value??""),s=Ar(n,e.runner_catalog),o=cr(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function Vd(e,t){let n=t.notify||(j=>de(j,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let a=document.createElement("button");a.type="button",a.className="mon2-deck__panel-close",a.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),a.textContent="\u2715",o.append(i,a);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let u=null,p=null,g=null,h=new Map;function b(){let j=t.workspacesState?t.workspacesState():[];return Array.isArray(j)?j.filter(te=>Fn(te)):[]}function $(j){return b().find(te=>te.root_dir===j)||null}function I(j){return bh($(j),h.get(j))}function B(){for(let j of b()){let te=h.get(j.root_dir);te&&typeof te.revision=="number"&&typeof j.revision=="number"&&j.revision>=te.revision&&h.delete(j.root_dir)}}async function Y(j,te,fe){let ve=t.transport,je=I(te);if(!(!ve||!Fn(je))){try{let ae=await ve(j,{...fe,root_dir:te,expected_revision:je.revision});if(Fn(ae?.queue)&&h.set(te,ae.queue),ae&&ae.conflict){let Le=Fn(ae.queue)&&typeof ae.queue.revision=="number"?ae.queue.revision:I(te)?.revision;ae=await ve(j,{...fe,root_dir:te,expected_revision:Le}),Fn(ae?.queue)&&h.set(te,ae.queue)}}catch(ae){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ae instanceof Error?ae.message:String(ae)}`)}X()}}function oe(j){u!==j&&(u=j,t.onFocusChange?.(u),X())}function K(j){oe(u===j?null:j)}function N(j){if(p===j){R();return}w(),p=j;let te=$(j);i.textContent=`${te?.name||j} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,g=yi(l,{root_dir:j,queue:()=>I(j),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:fe=>{h.set(j,fe),X()}}),g.load(),X()}function w(){g?.destroy(),g=null}function R(j){w(),p=null,s.hidden=!0,i.textContent="",j!==!0&&X()}let V=()=>R();a.addEventListener("click",V);function U(j){j.key==="Escape"&&u!==null&&oe(null)}document.addEventListener("keydown",U);function pe(j,te){let fe=Math.max(te,j,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${te}\uAC1C \uC911 ${j}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:fe},(ve,je)=>je<j?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function Se(j){let te=j.auto_advance===!0,fe=j.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${te?" is-on":""}`}
        data-act="auto"
        aria-pressed=${te?"true":"false"}
        aria-label=${`${j.name} \uC790\uB3D9\uD654`}
        title=${te?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${te?Wd():Ud()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${fe?" is-on":""}`}
        data-act="merge"
        aria-pressed=${fe?"true":"false"}
        aria-label=${`${j.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${fe?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
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
      </button>`}function xe(j){let te=hh(j);return te?c`<div class="mon2-deck__chips">
      ${te.orchestration?c`<span class="mon2-deck__chip" title=${te.orchestration.title}
            >오케 ${te.orchestration.text}</span
          >`:""}
      ${te.worker?c`<span class="mon2-deck__chip" title=${te.worker.title}
            >워커 ${te.worker.text}</span
          >`:""}
    </div>`:""}function ce(j){let te=[];for(let[fe,ve]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let je=el(j,fe);je>0&&te.push(`${ve} ${je}`)}return te.join(" \xB7 ")}function se(j){let te=el(j,"running"),fe=typeof j.slots=="number"?j.slots:1;return c`<div
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
          title=${`\uC2AC\uB86F ${fe}\uAC1C \uC911 ${te}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${te}/${fe}</span>
          ${pe(te,fe)}
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
        <div class="mon2-deck__ops">${Se(j)}</div>
        <span class="mon2-deck__counts">${ce(j)}</span>
        ${xe(j)}
      </div>
    </div>`}function Ae(j){let te=t.doneItems?t.doneItems():[],fe=t.rangeLabel?t.rangeLabel():"",ve=Kd(Array.isArray(te)?te:[]),je=ae=>j.reduce((Le,St)=>Le+el(St,ae),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${j.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${fe}`}
        >실행 ${je("running")} · 대기 ${je("queue")} · PR
        ${je("pr_wait")}${je("session_active")>0?` \xB7 \uC138\uC158 ${je("session_active")}`:""}
        · ${fe} 완료
        ${Array.isArray(te)?te.length:0}</span
      >
      ${ve===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof ve=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Gd(fe)}
                  >${ve}</span
                >`:ve.map(ae=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ae.provider}
                      title=${ae.tooltip}
                      >${ae.label}</span
                    >`)}
          </span>`}
    </div>`}function De(){let j=b();return j.length===0?"":c`${Ae(j)}
      <div class="mon2-deck__strip">
        ${j.map(te=>se(te))}
      </div>`}function be(){u!==null&&!$(u)&&(u=null,t.onFocusChange?.(null))}function X(){B(),be(),p!==null&&!$(p)&&R(!0),Je(De(),r),g?.render()}function Z(j){let te=j.target;if(!te||typeof te.closest!="function")return;let fe=te.closest("[data-root-dir]");if(!fe)return;let ve=fe.getAttribute("data-root-dir")||"",je=te.closest("[data-act]")?.getAttribute("data-act");if(je==="worker"){t.gotoWorkerTab?.(ve);return}if(je==="auto"){Y("worker-automation-toggle",ve,{on:I(ve)?.auto_advance!==!0});return}if(je==="merge"){Y("worker-merge-auto-toggle",ve,{on:I(ve)?.auto_merge!==!0});return}if(je==="gear"){N(ve);return}K(ve)}function ye(j){if(j.key!=="Enter"&&j.key!==" ")return;let te=j.target;if(!te||typeof te.closest!="function")return;let fe=te.closest('[data-root-dir][role="button"]');!fe||fe!==te||(j.preventDefault(),K(fe.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Z),r.addEventListener("keydown",ye),{render:X,focusRoot:()=>u,panelRoot:()=>p,destroy(){document.removeEventListener("keydown",U),r.removeEventListener("click",Z),r.removeEventListener("keydown",ye),a.removeEventListener("click",V),w(),Je(c``,r),e.replaceChildren()}}}function Yd(e,t){let n=new Map(e.map((l,u)=>[l,u])),r=new Map(e.map(l=>[l,new Set]));for(let l of t)l.blocker!==l.blockee&&n.has(l.blocker)&&n.has(l.blockee)&&r.get(l.blockee).add(l.blocker);let s=new Set,o=[];for(;o.length<e.length;){let l=e.find(u=>{if(s.has(u))return!1;for(let p of r.get(u))if(!s.has(p))return!1;return!0});if(l===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(l),o.push(l)}let i=[],a=new Map(o.map((l,u)=>[l,u]));for(let l of o){let u=null;for(let p of r.get(l)){let g=Number(n.get(l))<Number(n.get(p)),h=Number(a.get(l))>Number(a.get(p));g&&h&&(u===null||Number(a.get(p))>Number(a.get(u)))&&(u=p)}u!==null&&i.push({bead_id:l,after:u})}return{order:o,corrections:i,cycle:!1}}var yh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ki="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",vh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",wh="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",es="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function qs(e,t){return`${e}\0${t}`}function kh(e,t){let n=new Set(e),r=new Map;for(let s of e){let o=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,i=o instanceof Map?o.get(s):void 0;if(!Array.isArray(i))return null;r.set(s,i.filter(a=>a!==s&&n.has(a)))}return r}function $h(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function Bs(e,t){let n=e.entries,r=n.map(g=>g.bead_id),s=kh(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let o=[];for(let[g,h]of s)for(let b of h)o.push({blocker:b,blockee:g});let i=$h(e,t),a=new Map(r.map((g,h)=>[g,h])),l=r.slice(0,i).filter(g=>s.get(g).some(h=>Number(a.get(h))>Number(a.get(g)))),u=Yd(r.slice(i),o);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:l};let p=new Map(n.map(g=>[g.bead_id,g]));return{entries:[...n.slice(0,i),...u.order.map(g=>p.get(g))],corrections:u.corrections,cycle:!1,held:!1,mismatched:l}}function Zd(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Bs(n,t)}function xh(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Ah(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Sh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function tl(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let i of e.get(o)||[]){if(i===n)return!0;r.has(i)||(r.add(i),s.push(i))}}return!1}function Eh(e,t){let n=new Set;for(let[i,a]of t)for(let l of a)n.add(qs(i,l));let r=new Map,s=new Map;for(let i of e){let a=qs(i.a,i.b);r.set(a,i),s.set(a,i.type==="dep-add")}let o=[];for(let i of e){let a=qs(i.a,i.b);r.get(a)===i&&s.get(a)!==n.has(a)&&o.push(i)}return o}function Th(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let i=s-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=s;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function Ch(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function wi(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function nl(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Us(e){let t=Sh(e.blocked_by_map),n=[],r=new Set,s={refusal:null},o=u=>{let p=e.owner_of.get(u);return typeof p!="string"||p.length===0?(s.refusal=Ah(u),null):p};return{graph:t,dep_ops:n,state:s,ownerOf:o,addDep:(u,p,g)=>{if(s.refusal!==null||u===p)return;let h=t.get(u)||[];if(h.includes(p))return;let b=o(u);if(b!==null){if(tl(t,p,u)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${p}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,p]),g!==void 0&&r.add(qs(u,p)),n.push({type:"dep-add",a:u,b:p,root_dir:b,...g===void 0?{}:{lane_id:g}})}},removeDep:(u,p)=>{if(s.refusal!==null||u===p)return;let g=t.get(u)||[];if(!g.includes(p))return;let h=o(u);h!==null&&(t.set(u,g.filter(b=>b!==p)),n.push({type:"dep-remove",a:u,b:p,root_dir:h}))},laneCreated:(u,p)=>r.has(qs(u,p))}}function Ws(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let o=Eh(e.dep_ops,t.blocked_by_map),i=o.filter(p=>p.type==="dep-remove"),a=o.filter(p=>p.type==="dep-add"),l=s.disarm_ops??[],u=s.lane_id===void 0||s.correction===void 0?void 0:xh(s.lane_id,s.correction);return{lane_ops:n,ops:[...i,...l,...a,...r],lane_op_index:i.length+l.length,...u===void 0?{}:{correction:u}}}function Qd(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Fs(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Xd(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],o=new Map;for(let i of r){let a=e.owner_of.get(i.bead_id)||i.root_dir;typeof a!="string"||a.length===0||o.set(a,[...o.get(a)||[],i.bead_id])}for(let[i,a]of o)s.push({type:"worker-queue-disarm",payload:{bead_ids:a,lane_id:n},root_dir:i});return s}function Jd(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let i=e.ownerOf(o.bead_id);if(i===null)return;let a=s.get(i)??0;r.push(wi(o.bead_id,i,(t.parallel_raw_length.get(i)??0)+a)),s.set(i,a+1)}}function js(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function $i(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function rl(e,t,n){let r=Us(n),s=[],o=[],i=[],a,l=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??l:void 0,p=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:yh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:vh};if(e.kind!=="chain"&&typeof l=="string"&&l!==t.lane_id&&n.cross_lanes.has(l))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${nl(n,l)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:es}}if(e.kind==="chain"&&p===void 0)return{refused:es};let g=()=>{if(p===void 0||p.status!=="confirmed")return;let $=p.entries.findIndex(K=>K.bead_id===e.bead_id);if($<0)return;let I=$>0?p.entries[$-1]:null,B=$+1<p.entries.length?p.entries[$+1]:null,Y=Fs(p,$),oe=B!==null&&Fs(p,$+1);Y&&I!==null&&r.removeDep(e.bead_id,I.bead_id),oe&&B!==null&&r.removeDep(B.bead_id,e.bead_id),(Y||oe)&&I!==null&&B!==null&&r.addDep(B.bead_id,I.bead_id,u)},h=($,I)=>{let B=n.cross_lanes.get($),Y=B.entries.findIndex(Se=>Se.bead_id===e.bead_id),oe=B.entries.filter(Se=>Se.bead_id!==e.bead_id),K=Math.max(0,Math.min(oe.length,Y>=0&&I>Y?I-1:I)),N=-1;if(oe.forEach((Se,xe)=>{n.fixed_members.has(Se.bead_id)&&(N=xe)}),K<=N){r.state.refusal=wh;return}let w=Y>=0?B.entries[Y]:p?.entries.find(Se=>Se.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};a=Bs({status:B.status,entries:[...oe.slice(0,K),w,...oe.slice(K)]},n);let R=a.entries;if($i(R,B.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:$,entries:js(R)}}),B.status!=="confirmed")return;let V=R.findIndex(Se=>Se.bead_id===e.bead_id),U=V>0?R[V-1].bead_id:null,pe=V+1<R.length?R[V+1].bead_id:null;if(U===null){pe!==null&&r.addDep(pe,e.bead_id,$);return}if(r.addDep(e.bead_id,U,$),pe!==null&&(r.graph.get(pe)||[]).includes(U)){let Se=B.entries.findIndex(xe=>xe.bead_id===pe);(r.laneCreated(pe,U)||Se>0&&B.entries[Se-1].bead_id===U&&Fs(B,Se))&&r.removeDep(pe,U),r.addDep(pe,e.bead_id,$)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(g(),p!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...Xd(n,p,u,p.entries.filter($=>$.bead_id===e.bead_id))),s.push({type:"monitor-lane-update",payload:{lane_id:u,entries:js(p.entries.filter($=>$.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let $=Th(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(wi(e.bead_id,e.root_dir,$));else if(e.kind==="parallel"){let I=n.parallel_rows,B=I[Math.max(0,Math.min(I.length,t.marker_index))];if(!(!!B&&B.bead_id===e.bead_id)&&Ch(n,e.root_dir)&&b!==void 0){let oe=b>$?$:$-1;oe>=0&&oe!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:oe},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let $=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&$.status==="confirmed"&&o.push(wi(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let $=b>t.index?t.index:t.index-1;$>=0&&$!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:$},root_dir:e.root_dir})}}else o.push(wi(e.bead_id,e.root_dir,t.index,t.lane_id));return Ws(r,n,s,o,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:a}:{}})}function ep(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:es};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Bs(n,t);if(r.held)return{refused:ki};let s=r.entries,o=Us(t),i=[];Qd(o,s,e),o.state.refusal===null&&Jd(o,t,s,i);let a=$i(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:js(s)}}];return a.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Ws(o,t,a,i,{lane_id:e,correction:r})}function tp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:es};let r=Bs(n,t),s=r.entries,o=Us(t),i=[];Qd(o,s,e),o.state.refusal===null&&Jd(o,t,s,i);let a=$i(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:js(s)}}];return Ws(o,t,a,i,{lane_id:e,correction:r})}function np(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:es};let r=Bs(n,t),s=r.entries;return Ws(Us(t),t,$i(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:js(s)}}],[],{lane_id:e,correction:r})}function rp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:es};let r=Us(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)Fs(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return Ws(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Xd(t,n,e,n.entries)})}function sp(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let i=1;i<n.entries.length;i+=1){let a=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;Fs(n,i)?r.push(a):s.push(`${a} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let o=`\uC5F0\uACB0 ${nl(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${o}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[o,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function op(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function ip(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function sl(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${nl(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Rh="\uC0AC\uC774\uD074";function ap(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||s.includes(i.bead_id))continue;let a=tl(t.blocked_by_map,i.bead_id,e);o.push({...i,disabled:a,...a?{reason:Rh}:{}})}return o.sort((i,a)=>{let l=r!==void 0&&i.root_dir===r,u=r!==void 0&&a.root_dir===r;return l!==u?l?-1:1:i.bead_id.localeCompare(a.bead_id)}),o}function lp(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var cp={running:3,paused:2,failed:1};function Sr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function up(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function dp(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Sr(i)&&s.set(i.bead_id,i.attempt_id));let o=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Sr(i))continue;let a=null;if(i.status==="running")a="running";else if(i.status==="paused"&&!r.has(i.attempt_id))a="paused";else if(i.status==="failed"||i.status==="orphaned"){let p=t.get(i.bead_id),g=typeof p=="number"&&p>0&&typeof i.finished_at=="number"&&p>=i.finished_at;s.get(i.bead_id)===i.attempt_id&&!g&&typeof i.dismissed_at!="number"&&(a="failed")}if(!a)continue;let l=typeof i.started_at=="number"?i.started_at:null,u=o.get(i.bead_id);if(u){let p=cp[u.run_state],g=cp[a];if(p>g||p===g&&(u.started_at??0)>(l??0))continue}o.set(i.bead_id,{attempt:i,run_state:a,started_at:l})}return{winners:o,resumed_from_ids:r}}var pp=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],zs=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function xi(e,t){let n=pp.find(s=>s.step===e);if(!n)return null;let r=pp.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function fp(e){let t=zs.findIndex(n=>n.step===e);return zs.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Er(e){let t=zs.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Oh(e){let t=zs.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:zs.length}}function Ai(e){let t=Oh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var il=new Set(["queued","running","retry_pending"]),_p=new Set(["failed","succeeded"]),Lh={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Hs={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Ih={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Hs.base_containment,child_sweep:Hs.child_sweep,branch_cleanup:Hs.branch_cleanup,parent_close:Hs.parent_close};function Ph(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Mh(e,t,n){return!["verify","deploy"].includes(e.kind)||![...il,..._p].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Dh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(o!==i)return i-o;let a=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return a.localeCompare(l)}function ol(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Lh[s];if(!o)return null;let i=xi(n,`${r} ${o}`);return i?{...i,active:il.has(s),failed:s==="failed"}:null}function Nh(e){return!e||typeof e!="object"?null:Ih[e.step]||null}function Gs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Nh(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),a=Ph(e.merge_sha)?e.merge_sha:null,l=!o&&a&&Array.isArray(e.repo_operations)?e.repo_operations.filter($=>$&&typeof $=="object"&&Mh($,t,a)).sort(Dh):[],u=i?l:[],p=u.find($=>il.has($.state));if(p)return ol(p);if(s)return s.step==="repo_operations"&&l[0]?ol(l[0],!0):null;let g=u.find($=>_p.has($.state)?$.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(g)return ol(g);if(r){let $=xi(r.step,r.label);return $?{...$,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Hs[e.cleanup_cursor]:null;if(!h)return null;let b=xi(h.step,h.label);return b?{...b,active:!0,failed:!1}:null}function Si(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var qh="\uBBF8\uC801\uC7AC";function al(e,t){let n=Ao(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function mp(e,t,n={}){let r=new Map,s=new Map;for(let o of t)s.has(o.id)||s.set(o.id,o.location_label);for(let[o,i]of e){if(typeof o!="string"||o.length===0)continue;let a=[];for(let l of Array.isArray(i)?i:[]){if(typeof l!="string"||l.length===0)continue;let u=al(o,{id:l,location_label:s.get(l)||qh}),p=n[l];u.foreign!==!0?u.openable=!0:typeof p=="string"&&p.length>0&&(u.openable=!0,u.root_dir=p),a.push(u)}a.length>0&&r.set(o,a)}return r}function ll(e,t){return`${e}\0${t}`}function gp(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function cl(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Ks(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function bp(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${Ks(s)})`,location_label:Ks(s),scope:null,same_lane_ahead:!1};let i=cl(e,r),a=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${a})`,location_label:a,scope:i,same_lane_ahead:!1}}function hp(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let a of t)for(let l of Array.isArray(a.sublanes?.serial)?a.sublanes.serial:[]){let u=ll(a.root_dir,l.id);n.set(u,{root_dir:a.root_dir,workspace_name:a.name,lane:l.id}),s.set(u,[]);for(let p of Array.isArray(l.items)?l.items:[])r.set(p.id,u)}for(let a of t)for(let l of Array.isArray(a.sublanes?.serial)?a.sublanes.serial:[]){let u=ll(a.root_dir,l.id),p=Array.isArray(l.items)?l.items[0]:null,h=!!p&&p.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],b=s.get(u);if(b)for(let $ of h){let I=r.get($);I&&I!==u&&!b.includes(I)&&b.push(I)}}let o=(a,l)=>{let u=new Set,p=[a];for(;p.length>0;){let g=p.pop();if(g===l)return!0;!g||u.has(g)||(u.add(g),p.push(...s.get(g)||[]))}return!1},i=new Map;for(let[a,l]of s){let u=[];for(let p of l){let g=n.get(p);o(p,a)&&g&&u.push(g)}u.length>0&&i.set(a,u)}return i}function yp(e,t){return ll(e,t)}var vp=1,Vs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],dl=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ts={show_blocked:!0,spec:"all"},wp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Fh(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Sr(r)||(n=typeof r.status=="string"?r.status:null);return n}function jh(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Sr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Bh(e,t){let{winners:n,resumed_from_ids:r}=dp(e,t),s=new Map;for(let[o,i]of n){let a=i.attempt,l=i.run_state,u=i.started_at,p=typeof a.session_id=="string"&&a.session_id.length>0;s.set(o,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,last_activity:a.last_activity&&typeof a.last_activity=="object"?a.last_activity:null,legs:Array.isArray(a.legs)?a.legs:[],runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,status:typeof a.status=="string"?a.status:null,usage:Sn(e,a.bead_id),can_pause:l==="running"&&p,can_resume:l!=="running"&&p&&!r.has(a.attempt_id)})}return s}function kp(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Nt(e){return e&&typeof e=="object"?e:{}}function Uh(e,t,n){let r=Nt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,i=e.session_defaults;if(!s||!o||!i)return null;let a=h=>bn({pin:h,global:i,execution_defaults:s,runner_catalog:o,route:n}),l,u;try{l=a(r),u=a(null)}catch{return null}let p=$p(Ar(l,o),Ar(u,o)),g=$p(cr(l,null),cr(u,null));return p||g?{orchestration:p,worker:g}:null}function $p(e,t){return!e||t&&t.text===e.text?null:e}function xp(e,t){let n=cl(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Wh(e,t,n){let r=t.get(e);if(!r)return xp(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Ks(r)}function zh(e,t,n,r){let s=t.get(e);if(!s)return{label:xp(e,n),title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let i=r.get(e),a=s.lane==="parallel"?"\uBCD1\uB82C":s.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${a} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Ks(s),title:""}}function Hh(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Gh(e,t,n,r,s,o){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>o.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:o.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>o.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:s.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Kh(e,t,n,r,s,o,i){let a=[];return e.forEach((l,u)=>{let p=typeof l.id=="string"?l.id:"";if(p.length===0)return;let g=l.status==="confirmed"?"confirmed":"draft",h=Array.isArray(l.entries)?l.entries:[],b=[];h.forEach((Y,oe)=>{let K=Y&&typeof Y.bead_id=="string"?Y.bead_id:"";if(K.length===0)return;let N=Y&&typeof Y.root_dir=="string"?Y.root_dir:"",w=n.get(K),R=w?w.state:void 0,V=R==="running"||R==="pr_wait"||R==="done",U=!w||R==="runnable",pe=w&&w.lane==="parallel"&&typeof w.position=="number"?w.position-1:null,Se=zh(K,n,r,t),xe=b.length>0?b[b.length-1].id:null,ce=g==="confirmed"&&xe!==null&&!(t.get(K)||[]).includes(xe);b.push({id:K,title:s.get(K)||K,root_dir:w?w.root_dir:N,workspace_name:w?w.workspace_name:o.get(N)||"",seq:oe+1,location_label:Se.label,location_title:Se.title,draggable:!V,fixed:V,done:R==="done",unplaced:U,mismatch:ce,...pe!==null?{queue_index:pe}:{}})}),b.forEach((Y,oe)=>{Y.seq=oe+1});let $=b.length>0&&b.every(Y=>Y.done),I=b.filter(Y=>!Y.fixed&&i.armed_by_bead.get(Y.id)!==p).map(Y=>Y.id),B=Gh(p,g,b,$,I,i);a.push({lane_id:p,status:g,draft:g==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:$,can_confirm:g==="draft"&&b.length>=2,has_mismatch:g==="confirmed"&&b.some(Y=>Y.mismatch||Y.unplaced),unlaunched:I,...B})}),a}function Vh(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Yh(e,t,n,r,s){let o=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let u=`${l.root_dir}\0${l.id}`,p=o.get(u);if(p){p.cards.push(l);continue}let{scope:g,state:h}=Vh(l,t,n);h!==void 0&&(l.scope_state=h),o.set(u,{cards:[l],scope:g})}let i=new Map;for(let l of o.values()){let u=l.cards[0].scope_state;if(u!==void 0)for(let h of l.cards)h.scope_state=u;if(l.scope.length===0)continue;let p=l.cards[0].root_dir,g=i.get(p);g?g.push(l):i.set(p,[l])}let a=(l,u,p)=>{let g=u.cards[0],h={id:g.id,title:g.title,location_label:Wh(g.id,r,s),prefixes:p};for(let b of l.cards)b.overlap_chips?b.overlap_chips.push(h):b.overlap_chips=[h]};for(let l of i.values())for(let u=0;u<l.length;u+=1)for(let p=u+1;p<l.length;p+=1){let g=bi(l[u].scope,l[p].scope);g.length!==0&&(a(l[u],l[p],g),a(l[p],l[u],g))}}function ul(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ei(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function pl(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...ts,...n&&n.candidate_filter?n.candidate_filter:{}},a=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&Vs.some(T=>T.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let T of s)T&&typeof T.root_dir=="string"&&u.set(T.root_dir,T);let p=new Map;for(let T of s)T&&typeof T.root_dir=="string"&&p.set(T.root_dir,T.name||T.root_dir);for(let T of r)T&&typeof T.root_dir=="string"&&p.set(T.root_dir,T.name||T.root_dir);let g=[],h=[],b=[],$=[],I=[],B=[],Y=new Map,oe=new Map,K=new Map,N=new Map,w=new Map,R=new Map,V=new Map,U=new Set,pe=new Map,Se=new Map,xe=new Map;for(let T of r){if(!T||typeof T.root_dir!="string")continue;let ne=T.root_dir,Te=T.name||ne,Ie=u.get(ne),Ye=Ie&&typeof Ie.revision=="number"?Ie.revision:typeof T.revision=="number"?T.revision:0,et=Nt(T.attempts),tt=Nt(T.bead_titles);for(let[L,q]of Object.entries(tt))typeof q=="string"&&q.length>0&&xe.set(L,q);let dt=Nt(T.bead_times),ee=Nt(T.pr_observations),G=Nt(T.admission),ge=Nt(T.revise_parked),it=Nt(T.merge_queue_state),Xe=Nt(T.cleanup_failed),Ce=Nt(T.discard_operations),Ne=Nt(T.bead_blocked_by);Object.hasOwn(T,"bead_scope")&&pe.set(ne,Nt(T.bead_scope));let at=Nt(T.bead_workflow),pt=Nt(T.pr_activity),lt=Array.isArray(T.repo_operations)?T.repo_operations:[],$t=Array.isArray(T.merge_queue)?T.merge_queue:[],Kt=new Set($t.filter(L=>L&&typeof L.bead_id=="string").map(L=>L.bead_id)),Bt=new Map($t.filter(L=>L&&typeof L.bead_id=="string").map(L=>[L.bead_id,L])),Ut=Array.isArray(T.queue)?T.queue:[];for(let L of[...Ut,...Array.isArray(T.pr_wait)?T.pr_wait:[]])L&&typeof L.bead_id=="string"&&typeof L.armed_by_lane=="string"&&L.armed_by_lane.length>0&&R.set(L.bead_id,L.armed_by_lane);for(let L of Array.isArray(T.disarmed_on_load)?T.disarmed_on_load:[])typeof L=="string"&&L.length>0&&U.add(L);let It=(Array.isArray(T.serial_lanes)?T.serial_lanes:[]).filter(L=>L&&/^s[1-5]$/.test(L.id)&&Array.isArray(L.entries)),yt=Nt(T.lane_states),He=typeof T.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(T.serial_lane_count))):Math.min(5,It.length);K.set(ne,He),N.set(ne,Ut.length);let O=new Map(It.map(L=>[L.id,L])),Q=new Map;for(let L of It)for(let q of L.entries)q&&typeof q.bead_id=="string"&&Q.set(q.bead_id,L.id);for(let[L,q]of Object.entries(Ne))Array.isArray(q)&&w.set(L,q.filter(me=>typeof me=="string"&&me.length>0));let ue=Array.isArray(T.done)?T.done:[];for(let L of ue)L&&typeof L.bead_id=="string"&&B.push({id:L.bead_id,root_dir:ne,workspace_name:Te});let C=new Map;for(let L of ue)L&&typeof L.bead_id=="string"&&typeof L.added_at=="number"&&C.set(L.bead_id,L.added_at);let z=L=>({id:L,title:tt[L]||L,root_dir:ne,workspace_name:Te,expected_revision:Ye,draggable:!1,...Nt(dt[L]).created_at?{created_at:Nt(dt[L]).created_at}:{},...Nt(dt[L]).updated_at?{updated_at:Nt(dt[L]).updated_at}:{}}),Re=L=>{let q=at[L]?.chips?.pr;return q&&typeof q.number=="number"&&typeof q.url=="string"?{pr_number:q.number,pr_url:q.url}:{}},qe=L=>Object.hasOwn(Ne,L)?{blocked_by:Array.isArray(Ne[L])?Ne[L].filter(q=>typeof q=="string"&&q.length>0):[]}:{},we=new Set;for(let[L,q]of Bh(et,C)){we.add(L);let me=q.run_state==="failed"?Hh(et,q.attempt_id):null;me!==null&&V.set(L,me),h.push({...z(L),lane:"running",...qe(L),...Q.has(L)?{serial_lane_id:Q.get(L)}:{},attempt_id:q.attempt_id,run_state:q.run_state,status:q.status||void 0,workflow:at[L]||null,can_pause:q.can_pause,can_resume:q.can_resume,started_at:q.started_at,last_event_at:q.last_event_at,last_activity:q.last_activity,legs:q.legs,runner:q.runner,model:q.model,effort:q.effort,speed:q.speed,resumed_from:q.resumed_from,continuation_mode:q.continuation_mode,usage:q.usage,exec_chips:{orchestration:Ns(q),worker:null},discard:qn(Ce,L,{attempt_id:q.attempt_id}),badges:q.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:q.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:q.run_state==="failed"})}for(let[L,q]of up(et)){if(h.some(he=>he.id===L))continue;let me=q.attempt,ze=q.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";h.push({...z(L),lane:"running",kind:"session",...qe(L),attempt_id:typeof me.attempt_id=="string"?me.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:at[L]||null,can_pause:!1,can_resume:!1,started_at:q.started_at,last_event_at:typeof me.last_event_at=="number"?me.last_event_at:null,last_activity:me.last_activity&&typeof me.last_activity=="object"?me.last_activity:null,legs:Array.isArray(me.legs)?me.legs:[],runner:typeof me.runner=="string"?me.runner:null,model:typeof me.model=="string"?me.model:null,effort:typeof me.effort=="string"?me.effort:null,speed:typeof me.speed=="string"?me.speed:null,resumed_from:null,continuation_mode:null,usage:me.usage&&typeof me.usage=="object"?me.usage:null,exec_chips:{orchestration:Ns(me),worker:null},discard:qn(Ce,L,{merge_queued:!0}),badges:[q.origin==="auto"?`${ze} \xB7 \uC790\uB3D9`:ze],alert:!1})}for(let L of Array.isArray(T.session_active)?T.session_active:[]){let q=L&&L.bead_id;typeof q!="string"||we.has(q)||(we.add(q),Array.isArray(L.blocked_by)&&L.blocked_by.length>0&&w.set(q,L.blocked_by.filter(me=>typeof me=="string"&&me.length>0)),typeof L.title=="string"&&L.title.length>0&&xe.set(q,L.title),h.push({...z(q),title:L.title||tt[q]||q,lane:"running",kind:"session",status:"in_progress",started_at:ul(L.started_at)??ul(L.updated_at)??void 0,updated_at:ul(L.updated_at)??void 0,workflow:L.workflow||null,labels:Array.isArray(L.labels)?L.labels:[],spec_id:typeof L.spec_id=="string"?L.spec_id:"",blocked:L.blocked===!0,...Array.isArray(L.blocked_by)?{blocked_by:L.blocked_by.filter(me=>typeof me=="string"&&me.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(L.session_refs)?L.session_refs:[],badges:[],alert:!1}))}for(let L of Array.isArray(T.pr_wait)?T.pr_wait:[]){let q=L&&L.bead_id;if(typeof q!="string"||we.has(q))continue;we.add(q);let me=Nt(ee[q]),ze=Nt(me.pr),he=me.gate?Nt(me.gate):null,Ge=Kt.has(q),vt=Bt.get(q)?.continuation_action||null,ft=!!vt&&vt.continuation===null,Et=it.active===q,Wt=L.external===!0,Me=Xe[q]||null,pn=Nt(pt[q]),xt=Gs({bead_id:q,merge_sha:L.merge_sha,cleanup_cursor:L.cleanup_cursor,merge_progress:pn.merge_progress||null,cleanup_failed:Me,repo_operations:lt}),Zt=Si(xt),en=!!he&&he.base_badge==="\uCDA9\uB3CC",Qt=!!Me&&["child_sweep","branch_cleanup","parent_close"].includes(Me.step)&&!!he&&he.tier==="merged",rt=Wt&&!!Me&&!!he&&he.tier==="merged",Xt=!!he&&["closed_unmerged","review","undecidable"].includes(he.tier)&&he.reason!=="review_receipt_undetermined",Ee=qn(Ce,q,{external:Wt,merge_active:Et||xt?.step==="merge",merge_queued:Ge,cleanup_active:Zt,merged:!!Me||he?.tier==="merged"}),S=!!Ee.operation;b.push({...z(q),lane:"pr_wait",...qe(q),workflow:at[q]||null,pr_number:typeof ze.number=="number"?ze.number:null,pr_url:typeof ze.url=="string"?ze.url:void 0,external:Wt,usage:Sn(et,q),merge_step:xt,badges:ft?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:xt?[he?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Me?[Er(Me.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Er(Me.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof he?.gate_badge=="string"&&he.gate_badge.length>0?[he.gate_badge]:[],alert:xt?xt.failed===!0:!!Me||Xt,reason:Me&&xt?.active!==!0?Ai(Me.step):"PR \uB300\uAE30",merge_action:he?.tier==="merged"&&!Qt&&!rt?!1:!Ge||ft,merge_enabled:!S&&(ft||he?.enabled===!0||en||Qt||rt),merge_label:ft?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":rt||Qt?"\uC815\uB9AC \uC7AC\uAC1C":en&&!Qt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ft?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":S?Ee.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ee.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ee.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:rt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Qt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":en?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":he?.enabled===!0?`\uBA38\uC9C0 (${he.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${he?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Ge&&!ft,cancel_enabled:!Et,continuation_mismatch:vt?.mismatch||null,discard:Ee,discard_action:Ee.action,discard_enabled:Ee.enabled,discard_title:Ee.title})}let Ze=(L,q,me,ze)=>{let he=L&&L.bead_id;if(typeof he!="string"||we.has(he))return null;we.add(he);let Ge=ge[he],vt=qn(Ce,he),ft=vt.operation?vt:null,Et={...z(he),lane:q,workflow:at[he]||null,draggable:!ft,discard:ft||void 0,reason:kp(G,he),seq:me+1,queue_position:me+1,queue_index:me,queue_length:ze,badges:Ge?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ge,revise_action:!!Ge,revise_enabled:!!Ge&&!ft,revise_title:Ge?Ge.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ge.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Wt=qe(he);return Object.hasOwn(Wt,"blocked_by")&&(Et.blocked_by=Wt.blocked_by),Et};for(let L=0;L<Ut.length;L++){let q=Ze(Ut[L],"queue",L,Ut.length);if(!q)continue;$.push(q);let me=Y.get(ne);me?me.push(q):Y.set(ne,[q])}let ct=L=>{let q=b.find(Ge=>Ge.id===L&&Ge.root_dir===ne);if(q)return{id:L,title:q.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let me=h.find(Ge=>Ge.id===L&&Ge.root_dir===ne),ze=me?me.run_state:Fh(et,L),he=ze==="failed"||ze==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ze==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:L,title:me?me.title:z(L).title,badge:he}},We=[];for(let L=0;L<Math.max(He,It.length);L++){let q=`s${L+1}`,me=O.get(q),ze=me&&Array.isArray(me.entries)?me.entries:[],he=Nt(yt[q]),Ge=Array.isArray(he.occupied_by)?he.occupied_by.filter(Et=>typeof Et=="string"):[],vt=new Set(Ge),ft=[];for(let Et=0;Et<ze.length;Et++){let Wt=ze[Et]&&ze[Et].bead_id;if(typeof Wt=="string"&&vt.has(Wt)){we.add(Wt);continue}let Me=Ze(ze[Et],q,Et,ze.length);Me&&(ft.push(Me),$.push(Me))}ft.length===0&&Ge.length===0&&(He<=1||L>=He)||We.push({id:q,index:L,items:ft,raw_length:ze.length,occupied_by:Ge,occupants:Ge.map(Et=>ct(Et)),corrections:Array.isArray(he.corrections)?he.corrections.length:0,cycle:he.cycle===!0,...ft.length===0&&Ge.length===0?{empty:!0}:{}})}oe.set(ne,We);let ke=Array.from({length:He},(L,q)=>{let me=`s${q+1}`,ze=O.get(me),he=ze&&Array.isArray(ze.entries)?ze.entries:[],Ge=Nt(yt[me]);return{id:me,index:he.length,length:he.length,occupied_by:Array.isArray(Ge.occupied_by)?Ge.occupied_by.filter(vt=>typeof vt=="string"):[]}});for(let L of Array.isArray(T.runnable)?T.runnable:[]){let q=L&&L.bead_id;if(typeof q!="string"||we.has(q))continue;we.add(q);let me=L.workflow&&typeof L.workflow=="object"?L.workflow:null,ze=me&&typeof me.route=="string"&&me.route||(typeof L.route=="string"?L.route:null),he=Uh(Nt(Ie),L.exec_pins,ze);Array.isArray(L.blocked_by)&&L.blocked_by.length>0&&w.set(q,L.blocked_by.filter(Ge=>typeof Ge=="string"&&Ge.length>0)),typeof L.title=="string"&&L.title.length>0&&xe.set(q,L.title),Array.isArray(L.scope)&&Se.set(q,L.scope.filter(Ge=>typeof Ge=="string"&&Ge.length>0)),g.push({...z(q),title:L.title||tt[q]||q,lane:"runnable",draggable:!0,reason:kp(G,q),created_at:L.created_at??void 0,updated_at:L.updated_at??void 0,status:typeof L.status=="string"?L.status:void 0,labels:Array.isArray(L.labels)?L.labels:[],spec_id:typeof L.spec_id=="string"?L.spec_id:"",published:L.published===!0,workflow:me||(ze?{route:ze,chips:{route:ze}}:null),...he?{exec_chips:he}:{},blocked:L.blocked===!0,...Array.isArray(L.blocked_by)?{blocked_by:L.blocked_by.filter(Ge=>typeof Ge=="string"&&Ge.length>0)}:{},place_index:Ut.length,place_lanes:ke})}for(let L of ue){let q=L&&L.bead_id;if(typeof q!="string"||we.has(q)||(we.add(q),o!==void 0&&typeof L.added_at=="number"&&L.added_at<o))continue;let me=jh(et,q),ze=me&&typeof me.done_kind=="string"?me.done_kind:null;I.push({...z(q),lane:"done",done:!0,done_layout:"three_line",usage:Sn(et,q),work_ms:ci(et,q),done_at:typeof L.added_at=="number"?L.added_at:void 0,done_kind:ze,...Re(q),badges:[...ze&&wp[ze]?[wp[ze]]:[],...li(et,q)]})}}let ce=new Map;s.forEach((T,ne)=>{T&&typeof T.root_dir=="string"&&ce.set(T.root_dir,ne)});let se=n&&n.running_sort==="repo"?"repo":"started";h.sort((T,ne)=>{let Te=T.kind==="session",Ie=ne.kind==="session";if(Te!==Ie)return Te?1:-1;if(Te&&Ie){let tt=Ei(ne.updated_at)-Ei(T.updated_at);return tt!==0?tt:T.id.localeCompare(ne.id)}if(se==="repo"){let tt=ce.get(T.root_dir)??Number.MAX_SAFE_INTEGER,dt=ce.get(ne.root_dir)??Number.MAX_SAFE_INTEGER;if(tt!==dt)return tt-dt}let Ye=typeof T.started_at=="number"&&Number.isFinite(T.started_at)?T.started_at:null,et=typeof ne.started_at=="number"&&Number.isFinite(ne.started_at)?ne.started_at:null;return Ye!==null&&et!==null&&Ye!==et?Ye-et:Ye===null&&et!==null?1:Ye!==null&&et===null?-1:T.id.localeCompare(ne.id)}),I.sort((T,ne)=>(ne.done_at??0)-(T.done_at??0));let Ae=s.length>0?s:r.map(T=>({root_dir:T&&T.root_dir,name:T&&T.name,auto_advance:T&&T.auto_advance,auto_merge:T&&T.auto_merge,slots:T&&T.slots,revision:T&&T.revision,runner_catalog:T&&T.runner_catalog})),De=new Set(g.map(T=>T.root_dir)),be=[];for(let T of Ae){if(!T||typeof T.root_dir!="string")continue;let ne=Y.get(T.root_dir)||[],Te=oe.get(T.root_dir)||[];!(ne.length>0||Te.some(Ye=>Ye.items.length>0||Ye.occupied_by.length>0))&&!De.has(T.root_dir)||be.push({root_dir:T.root_dir,name:T.name||T.root_dir,auto_advance:T.auto_advance===!0,auto_merge:T.auto_merge===!0,slots:typeof T.slots=="number"&&T.slots>=vp?T.slots:vp,revision:typeof T.revision=="number"?T.revision:0,runner_catalog:Nt(T.runner_catalog),items:ne,sublanes:{parallel:ne,serial:Te},serial_lane_count:K.get(T.root_dir)||0,raw_queue_length:N.get(T.root_dir)||0})}let X={runnable:g,runnable_all:g,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:$,queue_groups:be,running:h,pr_wait:b,done:I,parallel_rows:[],chain_lanes:[],cross_lanes_revision:a&&typeof a.revision=="number"?a.revision:null,cross_lanes_unreadable:a===null,parallel_raw_length:Object.fromEntries(N),owner_of:{}},Z=gp(X);for(let T of B)Z.has(T.id)||Z.set(T.id,{root_dir:T.root_dir,workspace_name:T.workspace_name,lane:"done",state:"done"});for(let T of[...X.queue,...X.runnable,...X.running,...X.pr_wait]){if(!Object.hasOwn(T,"blocked_by"))continue;let ne=Z.get(T.id);T.blockers=(T.blocked_by||[]).map(Te=>bp(Te,ne,Z,s))}for(let T of[...X.queue,...X.runnable,...X.running,...X.pr_wait]){let ne=(T.blockers||[]).map(Ie=>({...al(T.id,Ie),openable:!0}));if(ne.length===0)continue;let Te={predecessors:ne};T.dependency_chips=Te}Yh(X,pe,Se,Z,s);let ye=hp(X.queue_groups);for(let T of X.queue_groups)for(let ne of T.sublanes.serial){let Te=ye.get(yp(T.root_dir,ne.id));Te&&(ne.cross_wait_peers=Te)}X.chain_lanes=Kh(a&&Array.isArray(a.lanes)?a.lanes:[],w,Z,s,xe,p,{armed_by_bead:R,failed_by_bead:V,disarmed_lanes:U});let j=new Map;for(let T of[...X.queue,...X.runnable])j.has(T.id)||j.set(T.id,T);let te=new Set;for(let T of X.chain_lanes)for(let ne of T.rows){if(T.status==="confirmed"&&!ne.unplaced&&!ne.fixed&&te.add(ne.id),!T.draft&&!ne.unplaced)continue;let Te=j.get(ne.id);Te&&(Te.cross_lane_chip={lane_id:T.lane_id,number:T.number,status:T.status,label:T.draft?`\uC5F0\uACB0 ${T.number} (draft)`:`\uC5F0\uACB0 ${T.number}`})}let fe=new Map(X.chain_lanes.map(T=>[T.lane_id,T.number]));for(let T of[...X.queue,...X.running]){let ne=R.get(T.id);if(typeof ne!="string"||ne.length===0)continue;let Te=fe.get(ne);T.armed_lane_chip=Te===void 0?{lane_id:ne,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:ne,label:`\u25B6 \uC5F0\uACB0 ${Te}`,orphan:!1}}let ve=[];for(let T of Y.values())for(let ne of T)te.has(ne.id)||ve.push(ne);ve.sort((T,ne)=>{let Te=T.workspace_name.localeCompare(ne.workspace_name);return Te!==0?Te:(T.queue_index??0)-(ne.queue_index??0)}),X.parallel_rows=ve;let je={};for(let[T,ne]of Z)typeof ne.root_dir=="string"&&ne.root_dir.length>0&&(je[T]=ne.root_dir);for(let T of X.chain_lanes)for(let ne of T.rows)!Object.hasOwn(je,ne.id)&&ne.root_dir.length>0&&p.has(ne.root_dir)&&(je[ne.id]=ne.root_dir);X.owner_of=je;let ae=X.runnable.length;X.runnable_all=X.runnable.slice();let Le=X.runnable;i.show_blocked||(Le=Le.filter(T=>T.blocked!==!0));let St=Le.length;i.spec==="with"?Le=Le.filter(T=>T.published===!0):i.spec==="without"&&(Le=Le.filter(T=>T.published!==!0)),X.runnable_hidden={blocked:ae-St,spec:St-Le.length};let ht=(T,ne)=>{let Te=Ei(ne.updated_at)-Ei(T.updated_at);return Te!==0?Te:T.id.localeCompare(ne.id)},mt=l==="repo_spec"?(T,ne)=>{let Te=T.published===!0?0:1,Ie=ne.published===!0?0:1;return Te!==Ie?Te-Ie:ht(T,ne)}:ht;if(l==="updated_flat")X.runnable=Le.slice().sort(ht),X.runnable_sections=[];else{let T=new Map;for(let Ie of Le){let Ye=T.get(Ie.root_dir);Ye?Ye.push(Ie):T.set(Ie.root_dir,[Ie])}let ne=[],Te=[];for(let Ie of Ae){if(!Ie||typeof Ie.root_dir!="string")continue;let Ye=(T.get(Ie.root_dir)||[]).slice().sort(mt);T.delete(Ie.root_dir),Ye.length!==0&&(ne.push({root_dir:Ie.root_dir,name:Ie.name||Ie.root_dir,items:Ye.map(et=>({...et,workspace_name:""}))}),Te.push(...Ye))}for(let[Ie,Ye]of T){let et=Ye.slice().sort(mt);ne.push({root_dir:Ie,name:et[0]?.workspace_name||Ie,items:et.map(tt=>({...tt,workspace_name:""}))}),Te.push(...et)}X.runnable=Te,X.runnable_sections=ne}return X}var Ap="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",Zh=1e4;function Sp(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Ep(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Op="bdui.monitor.done-range",Lp="bdui.monitor.running_sort",Ip="bdui.monitor.candidate_sort",Pp="beads-ui.monitor.candidate-filter",Mp="beads-ui.monitor.sections";function Qh(){try{let e=window.localStorage.getItem(Pp);if(!e)return{...ts};let t=JSON.parse(e);return!t||typeof t!="object"?{...ts}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:ts.show_blocked,spec:dl.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...ts}}}function Tp(e){try{window.localStorage.setItem(Pp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Xh(){try{let e=window.localStorage.getItem(Ip);return Vs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Jh(e){try{window.localStorage.setItem(Ip,e)}catch{}}function ey(){try{let e=window.localStorage.getItem(Mp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Cp(e){try{window.localStorage.setItem(Mp,JSON.stringify(e))}catch{}}function ty(){try{let e=window.localStorage.getItem(Op);return e===null?"today":Bn(e)}catch{return"today"}}function ny(e){try{window.localStorage.setItem(Op,e)}catch{}}function ry(){try{return window.localStorage.getItem(Lp)==="repo"?"repo":"started"}catch{return"started"}}function sy(e){try{window.localStorage.setItem(Lp,e)}catch{}}var Dp="tab:monitor:pipeline",oy=1e3,iy=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Rp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function ay(e){return e>=1&&e<=Rp.length?Rp[e-1]:`(${e})`}function Np(e,t){let n=Ft("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,i=t.getWorkspacePath,a=t.openDoc,l=t.switchWorkspace,u=t.router,p=t.now||(()=>Date.now()),g=t.confirm||(f=>typeof globalThis.confirm!="function"||globalThis.confirm(f)),h=ty(),b=ry(),$=Qh(),I=Xh(),B=ey(),Y=null,oe=null,K=null,N=null,w=[],R=null,V=null,U=null,pe=null;function Se(f){return pe===null&&(pe=Qt()),Zd(f,pe)}function xe(f,m){ce(),!(m<=0)&&(V={lane_id:f,corrected:m},U=setTimeout(()=>{U=null,V=null,ke()},Zh))}function ce(){U!==null&&(clearTimeout(U),U=null),V=null}function se(){let f=Pr.find(m=>m.value===h);return f?f.label:""}let Ae=document.createElement("div");Ae.className="mon",e.appendChild(Ae);let De=document.createElement("div");De.className="worker-drawer-overlay",De.hidden=!0;let be=document.createElement("div");be.className="worker-drawer-overlay__backdrop";let X=document.createElement("div");X.className="worker-drawer-host mon2-drawer",De.append(be,X),e.appendChild(De);let Z=pl(null,null),ye=new Map,j=new Map,te=null,fe=null,ve=null,je=Vr(X,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{Y=null,De.hidden=!0,ke()}});async function ae(f,m,v,k,F=!0){if(!o||!v)return null;let W=await o(f,{...m,root_dir:v,expected_revision:k});if(W&&W.conflict&&F){W.queue&&j.set(v,W.queue);let D=W.queue&&typeof W.queue.revision=="number"?W.queue.revision:k;W=await o(f,{...m,root_dir:v,expected_revision:D})}return W&&W.queue&&v&&j.set(v,W.queue),W}function Le(f,m){let v=j.get(f),k=s&&s.get?s.get():null,F=(Array.isArray(k)?k:[]).find(D=>D?.root_dir===f);return(v||F)?.merge_queue?.find(D=>D.bead_id===m)?.continuation_action}async function St(f,m,v,k){let F=await ae(f,m,v,k),W=j.get(v)?.revision??F?.queue?.revision??k;return Kn(F,(D,J)=>ae(f,{...m,continuation:D,decision_token:J},v,W,!1),{refresh:D=>ae(f,m,v,D?.queue?.revision??j.get(v)?.revision??W,!1)})}async function ht(f,m,v,k){let F=await Kn({continuation_mismatch:k},(D,J)=>ae("worker-merge-queue-add",{bead_id:m,continuation:D,decision_token:J},f,v,!1)),W=F?.queue?.merge_queue?.find(D=>D.bead_id===m)?.continuation_action;F?.applied!==!0&&W?.continuation===null&&W.mismatch&&await ht(f,m,F.queue.revision,W.mismatch)}async function ut(f,m,v){let k=await ae("worker-discard",f,m,v);if(k&&k.discarded===!0){de(di(k),"success",5e3);return}if(k&&k.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${k.reason}`,"error");return}if(k&&k.accepted&&k.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(k&&k.accepted){de(`\uD3D0\uAE30 \uC9C4\uD589: ${k.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}k&&!k.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function mt(f,m,v){return!o||!v?null:await o(f,{...m,root_dir:v})}async function T(){let f=new Map;for(let m of Z.pr_wait)f.has(m.root_dir)||f.set(m.root_dir,m.expected_revision);for(let[m,v]of f)await ae("worker-merge-queue-add-all",{},m,v)}function ne(f){let m=B[f];return!!(m&&m.runnable===!0)}function Te(f){let m={...B[f]||{}};m.runnable=!m.runnable,B={...B,[f]:m},Cp(B),ke()}function Ie(f){return B[f]===!0}function Ye(f){B={...B,[f]:B[f]!==!0},Cp(B),ke()}function et(f){let m=Z.queue_groups.find(v=>v.root_dir===f);if(!m)return null;for(let v=0;v<m.serial_lane_count;v+=1){let k=`s${v+1}`,F=m.sublanes.serial.find(W=>W.id===k);if(!F||F.raw_length===0&&F.occupied_by.length===0)return k}return null}function tt(f,m){let v=Z.queue_groups.find(F=>F.root_dir===f),k=v?v.sublanes.serial.find(F=>F.id===m):void 0;return k?k.raw_length:0}function dt(f,m){let v=ye.get(f),k=ye.get(m);if(!v||!k)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let F=Sp(v),W=Sp(k);if(F!==null&&F===W&&v.root_dir===k.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let D=Ep(v),J=Ep(k);if(D&&W!==null){let Pe=W;return{kind:"ops",title:`${Pe} \uB05D\uC5D0 ${f}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:k.root_dir,ops:[{bead_id:f,lane:Pe,index:tt(k.root_dir,Pe)}]}}if(F!==null&&J&&W===null){let Pe=F;return{kind:"ops",title:`${Pe} \uB05D\uC5D0 ${m}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:m,lane:Pe,index:tt(v.root_dir,Pe)}]}}if(D&&F===null&&J&&W===null){let Pe=et(v.root_dir);return Pe===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Pe} \uB808\uC778\uC5D0 ${m} \u2192 ${f} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:m,lane:Pe,index:0},{bead_id:f,lane:Pe,index:1}]}}return!D&&!J?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:D?{kind:"note",text:`${Ds(k.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Ds(v.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function ee(f,m){let v=dt(f,m.id);return{id:m.id,title:m.title,location_label:m.location_label,prefixes:m.prefixes,action:v.kind==="note"?{kind:"note",text:v.text}:v.kind==="disabled"?{kind:"disabled",label:Ap,title:v.title}:{kind:"place",label:Ap,title:v.title}}}function G(f,m){if(!K||K.bead_id!==f)return null;let v=K.counterpart_id,k=m.filter(F=>F.id===v);return k.length===0?null:{rows:k.map(F=>ee(f,F))}}function ge(f){let m=f.dependency_chips||null,v=f.overlap_chips||[],k=f.scope_state==="missing",F=f.cross_lane_chip,W=f.armed_lane_chip;if(!m&&v.length===0&&!k&&!F&&!W)return null;let D=G(f.id,v);return{...m||{},...v.length>0?{overlaps:v}:{},...k?{scope_missing:!0}:{},...F?{cross_lane:{lane_id:F.lane_id,label:F.label}}:{},...W?{armed_lane:W}:{},...D?{popover:D}:{}}}function it(f){let m=ge(f);return m?{...f,dependency_chips:m}:f}async function Xe(f,m){let v=dt(f,m);if(K=null,v.kind!=="ops"){ke();return}let k=Xt(v.root_dir,v.ops[0].bead_id);for(let F of v.ops){let W=await Ce(F,v.root_dir,k);if(W===null)break;k=W}ke()}async function Ce(f,m,v){try{let k=await ae("worker-queue-place",f,m,v,!1);if(k&&k.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!k||k.applied!==!0)return de(k&&typeof k.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${k.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let F=k.queue?k.queue.revision:void 0;return typeof F!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):F}catch(k){return de(ft(k),"error"),null}}function Ne(f){let m=ne(f.root_dir);return c`<header class="mon2-sec__hd">
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
    </div>`}function pt(f){if(oe!==f.id)return null;let m=Z.queue_groups.find(W=>W.root_dir===f.root_dir),v=f.place_lanes||[],k=Z.cross_lanes_revision!==null,F=[{id:"parallel",label:"\uBCD1\uB82C",count:f.place_index??0}];for(let W of Z.chain_lanes)F.push({id:`lane:${W.lane_id}`,label:`\uC5F0\uACB0 ${W.number} (${W.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:W.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!k});F.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!k,title:k?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let W of v)F.push({id:`serial:${W.id}`,label:`\uC9C1\uB82C ${Number(W.id.slice(1))}`,count:W.length,group:`${m?m.name:""} \uC9C1\uB82C`});return{bead_id:f.id,lanes:F}}function lt(){let f=[],m=new Set,v=(k,F)=>{for(let W of k)m.has(W.id)||(m.add(W.id),f.push({bead_id:W.id,root_dir:W.root_dir,workspace_name:W.workspace_name,title:W.title,lane:F}))};return v(Z.running,"running"),v(Z.pr_wait,"pr_wait"),v(Z.queue,"queue"),v(Z.runnable_all,"runnable"),f}function $t(f){if(!N||N.bead_id!==f)return"";let m=xt(),v=lt(),k=new Map;for(let J of v)k.set(J.bead_id,J);let F=(m.get(f)||[]).filter(J=>k.has(J)),W=lp(ap(f,{issues:v,blocked_by_map:m}),N.query),D=Z.owner_of[f];return c`<div
      class="mon-deppanel"
      data-bead-id=${f}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__title">이 이슈를 막는 이슈</div>
      <div class="mon-deppanel__now">
        ${F.length===0?c`<span class="mon-deppanel__empty">막는 이슈 없음</span>`:""}
        ${F.map(J=>c`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">⛓ ${J}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${f}
                data-dep-b=${J}
                aria-label=${`${J} \uC5F0\uACB0 \uD574\uC81C`}
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
        .value=${N.query}
      />
      <div class="mon-deppanel__list">
        ${W.length===0?c`<div class="mon-deppanel__empty">후보 없음</div>`:W.map(J=>c`<button
                  type="button"
                  class="mon-deppanel__cand${J.disabled?" is-disabled":""}"
                  data-dep-cand=${J.bead_id}
                  ?disabled=${J.disabled}
                  title=${J.reason||J.title}
                >
                  <span class="mon-deppanel__cand-repo"
                    >${J.workspace_name}</span
                  ><span class="mon-deppanel__cand-id"
                    >${J.bead_id}</span
                  ><span class="mon-deppanel__cand-title"
                    >${J.title}</span
                  >${J.reason?c`<span class="mon-deppanel__cand-reason"
                        >${J.reason}</span
                      >`:""}
                </button>`)}
      </div>
      ${D===void 0?c`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function Kt(f){return at(f,c`${Ha(it(f),pt(f),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:a?(m,v)=>a(v,f.root_dir):void 0})}${$t(f.id)}`)}function Bt(){return Z.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${Z.runnable.map(f=>Kt(f))}
      </div>`:c`${Z.runnable_sections.map(f=>{let m=ne(f.root_dir);return c`<section
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
    </section>`}function yt(f,m,v,k){return c`<div
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
        >${ay(m.seq)}</span
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
      ${k.includes(m.id)?c`<span
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
    </div>`}function He(f){let m=Z.cross_lanes_revision!==null,v=Se(f.lane_id),k=v?.held===!0,F=v?.cycle===!0,W=v?v.mismatched:[],D=V&&V.lane_id===f.lane_id?V.corrected:0;return c`<div class="mon2-clane" data-lane-id=${f.lane_id}>
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
        ${F?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${k?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${ki}</span
            >`:""}
        ${f.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${f.lane_id}
              ?disabled=${!m||!f.can_confirm||k}
              title=${k?ki:f.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
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
            </div>`:f.rows.map((J,Pe)=>yt(f,J,Pe,W))}
      </div>
    </div>`}function O(f,m,v){return c`<div
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
    </div>`}function Q(f){if(f.length===0)return"";let m=f.length-1;return`${f[0].id} \uC810\uC720${m>0?` +${m}`:""}`}function ue(f){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${f.id}
    >
      ${ir({id:f.id,title:f.title,lane:"running",draggable:!1,ghost:!0,badges:[f.badge]})}
    </div>`}function C(f,m){return c`<div
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
          ${m.occupants.map(v=>ue(v))}
          ${m.items.length>0?m.items.map((v,k)=>O(m,v,k)):m.occupants.length>0?"":c`<div class="worker-pane__empty">
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
    </div>`}function z(){let f=Ie("serial"),m=Z.cross_lanes_revision!==null,v=Z.chain_lanes.some(k=>k.draft&&k.rows.length===0);return c`<section
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
            ${Z.chain_lanes.map(k=>He(k))}
            ${Z.queue_groups.map(k=>k.sublanes.serial.map(F=>C(k,F)))}
          </div>`}
    </section>`}function Re(){return c`<div class="mon2-wait">${It()}${z()}</div>`}function qe(f){return c`<div class="worker-rungrid">
      ${Z.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:Z.running.map(m=>Za({bead_id:m.id,attempt_id:m.attempt_id||"",title:m.title,runner:m.runner??null,model:m.model??null,effort:m.effort??null,speed:m.speed??null,started_at:m.started_at??null,kind:m.kind,...m.kind==="session"?{updated_at:m.updated_at,session_refs:m.session_refs||[]}:{},workflow:m.workflow||null,resumed_from:m.resumed_from??null,continuation_mode:m.continuation_mode??null,paused:m.run_state==="paused",failed:m.run_state==="failed",status:m.status,status_label:m.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:m.can_resume!==!1,can_pause:m.can_pause!==!1,exec_chips:m.exec_chips||null,usage:m.usage||null,discard:m.discard},f,Y,{monitor:{repo:m.workspace_name,root_dir:m.root_dir,serial_lane_id:m.serial_lane_id,last_activity:m.last_activity||null,legs:m.legs||[],dependency_chips:ge(m)}}))}
    </div>`}function we(f){let m={runnable:Z.runnable,queue:Z.queue,running:Z.running,pr_wait:Z.pr_wait,done:Z.done};return c`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${iy.map(v=>{let k=m[v.lane],F=v.lane==="runnable"?Z.runnable_flat?k.length>0?Bt():void 0:Z.runnable_sections.length>0?Bt():void 0:v.lane==="queue"?Z.queue_groups.length>0||Z.chain_lanes.length>0||Z.parallel_rows.length>0?Re():void 0:v.lane==="running"?qe(f):k.length>0?c`${k.map(W=>ir(W))}`:void 0;return Tn({id:`monitor-${v.lane}`,lane:v.pane,title:v.lane==="done"?`\uC644\uB8CC\xB7${se()}`:v.title,items:k,empty:v.empty,body:F,live:v.lane==="running"&&k.length>0,controls:v.lane==="runnable"?Ze():void 0,header_control:ct(v.lane,k.length)})})}
      </div>`}function Ze(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒
        blocked${Z.runnable_hidden.blocked>0?` ${Z.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${dl.map(f=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${$.spec===f.value?" is-active":""}"
              data-spec=${f.value}
              aria-pressed=${$.spec===f.value?"true":"false"}
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
        .value=${I}
      >
        ${Vs.map(v=>c`<option
              value=${v.value}
              ?selected=${I===v.value}
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
        .value=${h}
      >
        ${Pr.map(v=>c`<option value=${v.value} ?selected=${h===v.value}>
              ${v.label}
            </option>`)}
      </select>`:""}function We(f){let m=s&&s.get?s.get():null,v=s&&s.getWorkspacesState?s.getWorkspacesState():[],k=f===void 0?s&&s.crossLanes?s.crossLanes():void 0:f,F={done_since:br(h,p()),running_sort:b,candidate_filter:$,candidate_sort:I};return k!==void 0&&(F.cross_lanes=k),pl(m,v,F)}function ke(){let f=p();Z=We(),pe=null,ye=new Map;for(let m of[...Z.runnable,...Z.queue,...Z.running,...Z.pr_wait,...Z.done])!m.non_occupying&&!ye.has(m.id)&&ye.set(m.id,m);Je(we(f),Ae),q()?.render(),L(),me()}function L(){let f=new Map;for(let m of Z.queue_groups)f.set(m.root_dir,m.auto_advance);for(let m of Array.from(Ae.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let v=m.closest(".mon2-item")?.getAttribute("data-root-dir")||"",k=f.get(v);typeof k=="boolean"&&m.setAttribute("title",`${m.textContent||""} \xB7 ${k?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function q(){if(ve)return ve;let f=Ae.querySelector(".mon2-deck");return f?(ve=Vd(f,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>Z.done,rangeLabel:se,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:he,onFocusChange:m=>{R=m,me()}}),ve):null}function me(){Ae.classList.toggle("has-focus",R!==null);for(let f of Array.from(Ae.querySelectorAll(".mon2-sec[data-root-dir]")))f.classList.toggle("is-focus",R!==null&&f.getAttribute("data-root-dir")===R);for(let f of Array.from(Ae.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let m=ye.get(f.getAttribute("data-bead-id")||"");f.classList.toggle("is-focus",R!==null&&!!m&&m.root_dir===R)}for(let f of Array.from(Ae.querySelectorAll(".mon2-crow[data-root-dir]")))f.classList.toggle("is-focus",R!==null&&f.getAttribute("data-root-dir")===R)}function ze(f,m){let v=i?i():void 0;if(!m||!v||m===v||!l){r(f);return}l(m).then(()=>{r(f)}).catch(k=>{n("workspace switch for %s failed: %o",m,k)})}function he(f){if(!f)return;let m=i?i():void 0,v=()=>{try{u?.gotoView("worker")}catch(k){n("gotoView(worker) failed: %o",k)}};if(!l||m&&m===f){v();return}l(f).then(v).catch(k=>{n("workspace switch for %s failed: %o",f,k),de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Ge(f){Ln(f).then(m=>{de(m?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",m?"success":"error",1400)})}function vt(f){let m=ye.get(f)||null;return{item:m,root_dir:m?m.root_dir:"",revision:m?m.expected_revision:0}}function ft(f){if(typeof f=="string"&&f.length>0)return f;if(f&&typeof f=="object"){let m=f;if(typeof m.message=="string"&&m.message.length>0)return m.message;if(typeof m.error=="string"&&m.error.length>0)return m.error;if(m.error&&typeof m.error=="object"&&typeof m.error.message=="string")return m.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function Et(f,m,v){let k=Z.owner_of[m];if(typeof k!="string"||k.length===0){de(`${m}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await mt(f,{a:m,b:v},k),await Wt(f,m,v)}catch(F){de(ft(F),"error")}ke()}async function Wt(f,m,v){if(f!=="dep-add")return;let k=Z.chain_lanes.find(F=>F.rows.some(W=>W.id===m));!k||!k.rows.some(F=>F.id===v)||await gt(F=>np(k.lane_id,F),"",[{type:f,a:m,b:v}])}function Me(f){return Z.runnable.some(m=>m.id===f)||Z.parallel_rows.some(m=>m.id===f)?!0:Z.queue_groups.some(m=>m.sublanes.serial.some(v=>v.items.some(k=>k.id===f)))}function pn(f){!f||!Me(f)||(N=N&&N.bead_id===f?null:{bead_id:f,query:""},ke())}function xt(){let f=new Map,m=s&&s.get?s.get():null,v=k=>Array.isArray(k)?k.filter(F=>typeof F=="string"&&F.length>0):[];for(let k of Array.isArray(m)?m:[]){if(!k||typeof k!="object")continue;let F=k.bead_blocked_by&&typeof k.bead_blocked_by=="object"?k.bead_blocked_by:{};for(let[W,D]of Object.entries(F))Array.isArray(D)&&f.set(W,v(D));for(let W of[...Array.isArray(k.runnable)?k.runnable:[],...Array.isArray(k.session_active)?k.session_active:[]])W&&typeof W.bead_id=="string"&&Array.isArray(W.blocked_by)&&W.blocked_by.length>0&&f.set(W.bead_id,v(W.blocked_by))}return f}function Zt(){let f=new Map,m=new Map,v=s&&s.get?s.get():null,k=F=>Array.isArray(F)?F.filter(W=>typeof W=="string"&&W.length>0):[];for(let F of Array.isArray(v)?v:[]){if(!F||typeof F!="object")continue;let W=F.bead_blocked_by&&typeof F.bead_blocked_by=="object"?F.bead_blocked_by:{};for(let[D,J]of Object.entries(W))Array.isArray(J)&&f.set(D,k(J));for(let D of Array.isArray(F.runnable)?F.runnable:[])D&&typeof D.bead_id=="string"&&Array.isArray(D.blocked_by)&&m.set(D.bead_id,k(D.blocked_by))}for(let F of w)for(let W of[f,m]){let D=W.get(F.a);D!==void 0&&W.set(F.a,F.type==="dep-remove"?D.filter(J=>J!==F.b):D.includes(F.b)?D:[...D,F.b])}return{snapshot:f,runnable:m}}function en(){let f=xt();for(let m of w){let v=(f.get(m.a)||[]).slice();m.type==="dep-remove"?f.set(m.a,v.filter(k=>k!==m.b)):v.includes(m.b)||f.set(m.a,[...v,m.b])}return f}function Qt(f=Z,m=rt()){let v=new Map;for(let ot of Array.isArray(m?.lanes)?m.lanes:[]){let an=new Map;for(let Ht of Array.isArray(ot?.entries)?ot.entries:[])Ht&&typeof Ht.bead_id=="string"&&an.set(Ht.bead_id,Ht.dep_created_by_lane===!0);v.set(typeof ot?.id=="string"?ot.id:"",an)}let k=new Map,F=new Map,W=new Set,D=new Set;for(let ot of f.chain_lanes){let an=v.get(ot.lane_id);k.set(ot.lane_id,{status:ot.status,entries:ot.rows.map((Ht,er)=>({bead_id:Ht.id,root_dir:Ht.root_dir,...er===0?{}:{dep_created_by_lane:an?.get(Ht.id)===!0}}))});for(let Ht of ot.rows)F.set(Ht.id,ot.lane_id),Ht.fixed&&W.add(Ht.id),Ht.unplaced||D.add(Ht.id)}let J=new Map;for(let ot of f.parallel_rows)typeof ot.queue_index=="number"&&J.set(ot.id,ot.queue_index);for(let ot of f.queue_groups)for(let an of ot.sublanes.serial)for(let Ht of an.items)typeof Ht.queue_index=="number"&&J.set(Ht.id,Ht.queue_index);let Pe=Zt();return{blocked_by_map:en(),snapshot_blocked_by:Pe.snapshot,runnable_blocked_by:Pe.runnable,owner_of:new Map(Object.entries(f.owner_of)),cross_lanes:k,owner_lane_of:F,fixed_members:W,placed_members:D,parallel_rows:f.parallel_rows.map(ot=>({bead_id:ot.id,root_dir:ot.root_dir,queue_index:ot.queue_index??0})),parallel_raw_length:new Map(Object.entries(f.parallel_raw_length)),queue_index_of:J}}function rt(){return(s&&s.crossLanes?s.crossLanes():null)??null}function Xt(f,m){let v=ye.get(m);if(v&&v.root_dir===f)return v.expected_revision;let k=Z.queue_groups.find(F=>F.root_dir===f);return k?k.revision:0}async function Ee(f,m,v){if(f.type==="worker-queue-disarm"){try{let k=await ae(f.type,f.payload,f.root_dir,v.get(f.root_dir)??Xt(f.root_dir,m));k&&k.queue&&typeof k.queue.revision=="number"&&v.set(f.root_dir,k.queue.revision)}catch{}return!0}if(f.type==="worker-queue-place"||f.type==="worker-queue-reorder"||f.type==="worker-queue-remove")return await S(f.type,f.payload,f.root_dir,v,{bead_id:m})!==null;try{return(f.type==="dep-add"||f.type==="dep-remove")&&await mt(f.type,{a:f.a,b:f.b},f.root_dir),!0}catch(k){return de(ft(k),"error"),!1}}async function S(f,m,v,k,F){try{let W=await ae(f,m,v,k.get(v)??Xt(v,F.bead_id));return!W||typeof W.applied!="boolean"?(de("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(W.queue&&typeof W.queue.revision=="number"&&k.set(v,W.queue.revision),W.conflict?(de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):W.applied===!1?(de(W.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${W.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):W.queue&&typeof W.queue.revision=="number"?W.queue.revision:k.get(v)??0)}catch(W){return de(ft(W),"error"),null}}function _e(f){(f.type==="dep-add"||f.type==="dep-remove")&&(w=[...w,{type:f.type,a:f.a,b:f.b}])}async function Oe(f,m){if(!o)return{ok:!1};try{let v=await o(f.type,{...f.payload,expected_revision:m});return!v||typeof v.revision!="number"?(de("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:v.revision}}catch(v){let k=v,F=k&&k.code==="conflict"?k.details?.cross_lanes:null;return F&&typeof F.revision=="number"&&Array.isArray(F.lanes)?{ok:!1,conflict:F}:(de(ft(v),"error"),{ok:!1})}}async function wt(f,m,v){let k=new Map,F=[],W=f.ops.slice(0,f.lane_op_index),D=f.ops.slice(f.lane_op_index);for(let Pe of W){if(!await Ee(Pe,v,k))return{done:!0};_e(Pe)}let J=m;for(let Pe of f.lane_ops){if(J===null)return de("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let ot=await Oe(Pe,J);if(!ot.ok)return ot.conflict?{done:!1,conflict:ot.conflict}:{done:!0};J=ot.revision}for(let Pe of D){if(!await Ee(Pe,v,k))return{done:!0};_e(Pe),Pe.type==="dep-add"&&F.push(Pe)}for(let Pe of op(F))J=await Ot(Pe,J);return{done:!0}}async function Ot(f,m){if(m===null||!o)return m;let v=f.pairs,k=m;for(let F=0;F<2;F+=1){if(v.length===0)return k;try{let W=await o("monitor-lane-provenance",{lane_id:f.lane_id,pairs:v.map(D=>({bead_id:D.bead_id,after:D.after,value:!0})),expected_revision:k});return W&&typeof W.revision=="number"?W.revision:k}catch(W){let D=W,J=D&&D.code==="conflict"?D.details?.cross_lanes:null;if(!J||typeof J.revision!="number"||!Array.isArray(J.lanes))return k;let Pe=J.lanes.find(ot=>ot&&ot.id===f.lane_id);v=ip(Array.isArray(Pe?.entries)?Pe.entries:[],v),k=J.revision}}return k}async function gt(f,m,v=[]){w=v,ce();let k=Z,F=rt();for(let W=0;;W+=1){let D=f(Qt(k,F));if("refused"in D){de(D.refused,"error");break}let J=await wt(D,k.cross_lanes_revision,m);if(J.done){D.correction&&xe(D.correction.lane_id,D.correction.corrected);break}if(W>=1){de("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}k=We(J.conflict),F=J.conflict}w=[],ke()}async function Tt(f,m){await gt(v=>rl(f,m,v),f.bead_id)}async function tn(f,m){if(f==="run"){await $n(m);return}if(f==="stop"){await Pt(m);return}if(f==="create"){await gt(v=>sl(null,v),"");return}if(f==="remove"){let v=sp(m,Qt());if(v!==null&&!g(v))return;await gt(k=>rp(m,k),"");return}await gt(v=>f==="confirm"?ep(m,v):tp(m,v),"")}function nn(f){let m=new Map;for(let v of f.rows){let k=Z.owner_of[v.id]||v.root_dir;typeof k!="string"||k.length===0||m.set(k,[...m.get(k)||[],v.id])}return m}async function $n(f){let m=Z.chain_lanes.find(W=>W.lane_id===f);if(!m||Z.cross_lanes_revision===null){ke();return}ce();let v=new Map,k=new Map,F=nn(m);for(let W of m.rows){if(!W.unplaced)continue;let D=Z.owner_of[W.id]||W.root_dir;if(typeof D!="string"||D.length===0){de(`${W.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),ke();return}let J=k.get(D)??0;if(await S("worker-queue-place",{bead_id:W.id,lane:"parallel",index:(Z.parallel_raw_length[D]??0)+J},D,v,{bead_id:W.id})===null){ke();return}k.set(D,J+1)}for(let[W,D]of F)if(await S("worker-queue-arm",{bead_ids:D,lane_id:f},W,v,{bead_id:D[0]})===null){de("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),ke();return}ke()}async function Pt(f){let m=Z.chain_lanes.find(k=>k.lane_id===f);if(!m||Z.cross_lanes_revision===null){ke();return}ce();let v=new Map;for(let[k,F]of nn(m))if(await S("worker-queue-disarm",{lane_id:f},k,v,{bead_id:F[0]})===null)break;ke()}async function yn(f,m){let{root_dir:v,revision:k}=vt(f);if(v.length===0){ke();return}await S("worker-queue-disarm",{bead_ids:[f],lane_id:m},v,new Map([[v,k]]),{bead_id:f}),ke()}async function xn(f,m){let v=ye.get(f);if(!v){ke();return}let k={kind:"candidate",bead_id:f,root_dir:v.root_dir};if(m==="new-lane"){await gt(F=>sl({bead_id:f,root_dir:v.root_dir},F),f);return}if(m.startsWith("lane:")){let F=m.slice(5);if(!Z.chain_lanes.find(D=>D.lane_id===F)){ke();return}await gt(D=>rl(k,{kind:"chain",lane_id:F,marker_index:(D.cross_lanes.get(F)?.entries??[]).length},D),f);return}if(m.startsWith("serial:")){let F=m.slice(7),W=(v.place_lanes||[]).find(D=>D.id===F);await Tt(k,{kind:"repo-serial",root_dir:v.root_dir,lane_id:F,index:W?W.index:0});return}await Tt(k,{kind:"parallel",marker_index:Z.parallel_rows.length})}async function E(f,m){let v=Z.parallel_rows,k=v.findIndex(ot=>ot.id===f);if(k<0)return;let F=v[k].root_dir,W=[];v.forEach((ot,an)=>{ot.root_dir===F&&W.push(an)});let D=W.indexOf(k),J=W[D+m];if(typeof J!="number")return;let Pe=m===-1?J:W[D+2]??Math.min(v.length,J+1);await Tt({kind:"parallel",bead_id:f,root_dir:F,queue_index:v[k].queue_index??0},{kind:"parallel",marker_index:Pe})}async function d(f){for(let m of Z.chain_lanes){let v=m.rows.find(k=>k.id===f);if(v){await Tt({kind:"chain",bead_id:f,root_dir:v.root_dir,lane_id:m.lane_id,...typeof v.queue_index=="number"?{queue_index:v.queue_index}:{}},{kind:"parallel",marker_index:Z.parallel_rows.length});return}}}let y=null,A=!1,H=null;function le(){H!==null&&clearTimeout(H),H=setTimeout(()=>{H=null,A=!1},0)}function Fe(f,m){let v=m&&typeof m.closest=="function"?m.closest("[data-row-index]"):null;if(v&&f.contains(v)){let k=Number(v.getAttribute("data-row-index"));return Number.isFinite(k)?k:0}return f.querySelectorAll("[data-row-index]").length}function Qe(f){let m=f.target,v=typeof m?.closest=="function"?m.closest("[data-drop]"):null;if(!v||!y)return null;let k=v.getAttribute("data-drop");if(k==="candidate")return{zone:v,target:{kind:"candidate"}};if(k==="parallel")return{zone:v,target:{kind:"parallel",marker_index:Fe(v,m)}};if(k==="chain")return{zone:v,target:{kind:"chain",lane_id:v.getAttribute("data-lane-id")||"",marker_index:Fe(v,m)}};if(k==="repo-serial"){let F=v.getAttribute("data-root-dir")||"";if(F!==y.root_dir)return null;let W=typeof m?.closest=="function"?m.closest("[data-queue-index]"):null,D=W&&v.contains(W)?W.getAttribute("data-queue-index"):v.getAttribute("data-lane-length"),J=Number(D);return{zone:v,target:{kind:"repo-serial",root_dir:F,lane_id:v.getAttribute("data-lane-id")||"",index:Number.isFinite(J)?J:0}}}return null}function qt(){for(let f of Array.from(Ae.querySelectorAll(".is-drop-over")))f.classList.remove("is-drop-over")}function zt(f){let m=f.target,v=typeof m?.closest=="function"?m.closest('[draggable="true"][data-bead-id]'):null,k=v?v.closest("[data-drag-kind]"):null;if(!k)return;let F=k.getAttribute("data-bead-id")||"",W=k.getAttribute("data-drag-kind")||"",D=k.getAttribute("data-root-dir")||"";if(!F||!W||!D)return;let J=k.getAttribute("data-queue-index")||"",Pe=Number(J),ot=k.getAttribute("data-lane-id")||"";y={kind:W,bead_id:F,root_dir:D,...J!==""&&Number.isFinite(Pe)?{queue_index:Pe}:{},...ot?{lane_id:ot}:{}},A=!0,oe=null,Ae.classList.add("is-dragging");try{f.dataTransfer?.setData("text/plain",F),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function fn(f){let m=Qe(f);m&&(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),m.zone.classList.add("is-drop-over"))}function vn(f){let m=f.target;typeof m?.closest=="function"&&m.closest("[data-drop]")?.classList.remove("is-drop-over")}function _n(){y=null,qt(),Ae.classList.remove("is-dragging"),le()}function Be(f){let m=Qe(f),v=y;y=null,qt(),Ae.classList.remove("is-dragging"),!(!m||!v)&&(f.preventDefault(),Tt(v,m.target))}function x(f){return{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,status:f.run_state==="running"?"running":f.run_state,worktree:f.root_dir}}function re(f,m){let{item:v,root_dir:k,revision:F}=vt(m),W=v?.attempt_id||"",D=f.classList;if(D.contains("mon2-rowops__up")||D.contains("mon2-rowops__down")){E(m,D.contains("mon2-rowops__up")?-1:1);return}if(D.contains("mon2-rowops__remove")){ae("worker-queue-remove",{bead_id:m},k,F);return}if(D.contains("mon2-crow__detach")){d(m);return}if(D.contains("mon-dep__btn")){pn(m);return}if(D.contains("worker-dep__open")){pn(m);return}if(D.contains("mon2-arm__release")){yn(m,f.getAttribute("data-lane-id")||"");return}if(D.contains("mon-lane__chip")){let J=f.getAttribute("data-lane-id")||"";Ae.querySelector(`.mon2-clane[data-lane-id="${J}"]`)?.scrollIntoView({block:"nearest"});return}if(D.contains("mon-deppanel__unlink")){let J=f.getAttribute("data-dep-a")||"",Pe=f.getAttribute("data-dep-b")||"";g(`${Pe}\uAC00 ${J}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)&&Et("dep-remove",J,Pe);return}if(D.contains("mon-deppanel__cand")){let J=f.getAttribute("data-dep-cand")||"";N&&J&&Et("dep-add",N.bead_id,J);return}if(D.contains("mon-overlap__chip")){let J=f.getAttribute("data-overlap-id")||"";K=!!K&&K.bead_id===m&&K.counterpart_id===J?null:{bead_id:m,counterpart_id:J},ke();return}if(D.contains("mon-overlap__place")){Xe(m,f.getAttribute("data-counterpart-id")||"");return}if(D.contains("worker-card__place")){oe=oe===m?null:m,ke();return}if(D.contains("worker-card__place-cancel")){oe=null,ke();return}if(D.contains("worker-card__place-lane")){let J=f.getAttribute("data-lane")||"parallel";oe=null,xn(m,J);return}if(D.contains("rtile__session")){if(v&&v.kind==="session"){let J=(v.session_refs||[]).find(Pe=>Pe&&Pe.current===!0);J&&(De.hidden=!1,je.open(Wr(J,m,"in_progress",k)),ke());return}Y=W,W&&v&&(De.hidden=!1,je.open({attempt_id:W,root_dir:k,meta:x(v)})),ke();return}if(D.contains("rtile__pause")){mt("worker-attempt-pause",{attempt_id:W},k);return}if(D.contains("rtile__resume")){Ur().then(J=>{if(J!==null)return St("worker-attempt-resume",{attempt_id:W,...J!==""?{instructions:J}:{}},k,F)});return}if(D.contains("rtile__dismiss")){ae("worker-attempt-dismiss",{attempt_id:W},k,F);return}if(D.contains("rtile__discard")){if(!g(Ms(m,"unmerged")))return;ut({bead_id:m,...W?{attempt_id:W}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},k,F);return}if(D.contains("worker-mini__merge")){let J=Le(k,m);J?.mismatch&&J.continuation===null?ht(k,m,F,J.mismatch):ae("worker-merge-queue-add",{bead_id:m},k,F);return}if(D.contains("worker-mini__merge-cancel")){ae("worker-merge-queue-remove",{bead_id:m},k,F);return}if(D.contains("worker-mini__discard")){let J=f.dataset.discardMode==="merged"?"merged":"unmerged";if(!g(Ms(m,J)))return;ut({bead_id:m,...f.dataset.attemptId?{attempt_id:f.dataset.attemptId}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},k,F);return}if(D.contains("worker-mini__revise-fix")){St("worker-revise-fix",{bead_id:m},k,F);return}D.contains("worker-mini__revise-approve")&&ae("worker-revise-approve",{bead_id:m},k,F)}function M(f){let m=A;A=!1;let v=f.target;if(!v||typeof v.closest!="function"||v.closest("dialog")||v.closest(".worker-drawer-overlay")||v.closest("a"))return;let k=v.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(k){f.preventDefault();let jn=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||k.textContent?.trim()||"";jn&&Ge(jn);return}let F=v.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(F){f.preventDefault();let er=F.getAttribute("data-root-dir")||ye.get(v.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||F.getAttribute("title")||"";he(er);return}let W=v.closest(".mon2-sec__toggle");if(W){f.preventDefault(),Te(W.getAttribute("data-root-dir")||"");return}let D=v.closest(".mon2-area__toggle");if(D){f.preventDefault(),Ye(D.getAttribute("data-area")||"parallel");return}if(v.closest(".mon2-newlane")){f.preventDefault(),tn("create","");return}let J=v.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(J){f.preventDefault();let er=J.getAttribute("data-lane-id")||"",jn=J.classList;tn(jn.contains("mon2-clane__confirm")?"confirm":jn.contains("mon2-clane__reapply")?"reapply":jn.contains("mon2-clane__run")?"run":jn.contains("mon2-clane__stop")?"stop":"remove",er);return}if(v.closest(".mon-merge-all")){f.preventDefault(),T();return}let Pe=v.closest(".mon-filter__spec");if(Pe){f.preventDefault(),$={...$,spec:Pe.getAttribute("data-spec")||"all"},Tp($),ke();return}let ot=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!ot)return;let an=ot.getAttribute("data-bead-id")||"",Ht=v.closest("button");if(Ht){f.preventDefault(),re(Ht,an);return}an&&!m&&(f.preventDefault(),ze(an,ot.getAttribute("data-root-dir")||vt(an).root_dir))}function $e(f){let m=f.target;if(!m||typeof m.closest!="function")return;let v=m.closest(".mon-filter__blocked");if(v){$={...$,show_blocked:v.checked},Tp($),ke();return}let k=m.closest(".mon-candidate-sort");if(k){I=Vs.some(D=>D.value===k.value)?k.value:"repo_spec",Jh(I),ke();return}let F=m.closest(".mon-running-sort");if(F){b=F.value==="repo"?"repo":"started",sy(b),ke();return}let W=m.closest(".mon-done-range");W&&(h=Bn(W.value),ny(h),ke())}function st(f){let m=f.target,v=m&&typeof m.closest=="function"?F=>m.closest(F):()=>null,k=!1;K&&!v(".mon-overlap__popover, .mon-overlap__chip")&&(K=null,k=!0),N&&!v(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(N=null,k=!0),k&&ke()}function nt(f){f.key!=="Escape"||!K&&!N||(K=null,N=null,ke())}function bt(f){let m=f.target;!m||typeof m.closest!="function"||!m.closest(".mon-deppanel__search")||!N||(N={...N,query:m.value},ke())}e.addEventListener("click",M),e.addEventListener("change",$e),e.addEventListener("input",bt),document.addEventListener("click",st),document.addEventListener("keydown",nt),e.addEventListener("dragstart",zt),e.addEventListener("dragover",fn),e.addEventListener("dragleave",vn),e.addEventListener("drop",Be),e.addEventListener("dragend",_n),s&&typeof s.subscribe=="function"&&(te=s.subscribe(()=>{try{j.clear(),ke()}catch{}}));function Ke(){fe!==null&&(clearInterval(fe),fe=null)}function Ct(){H!==null&&(clearTimeout(H),H=null)}return{load(){n("load"),ke(),fe===null&&(fe=setInterval(()=>{try{ke()}catch{}},oy))},pause(){Ke()},clear(){Ke(),Ct(),te&&(te(),te=null),je.destroy(),De.hidden=!0,ve?.destroy(),ve=null,e.removeEventListener("click",M),e.removeEventListener("change",$e),e.removeEventListener("input",bt),document.removeEventListener("click",st),document.removeEventListener("keydown",nt),e.removeEventListener("dragstart",zt),e.removeEventListener("dragover",fn),e.removeEventListener("dragleave",vn),e.removeEventListener("drop",Be),e.removeEventListener("dragend",_n),e.replaceChildren()}}}function qp(e,t,n){let r=Ft("views:nav"),{global_element:s,repo_element:o}=e,i=null;function a(h){return b=>{b.preventDefault();let $=h==="monitor"&&l()==="monitor"?"worker":h;r("click tab %s",$),n.gotoView($)}}function l(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=l();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${h==="monitor"?"is-active":""}"
        @click=${a("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function p(){let h=l();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${h==="board"?"is-active":""}"
          @click=${a("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${h==="worker"?"is-active":""}"
          @click=${a("worker")}
          >Worker</a
        >
      </div>
    `}function g(){s&&Je(u(),s),o&&Je(p(),o)}return g(),i=t.subscribe(()=>g()),{destroy(){i&&(i(),i=null),s&&Je(c``,s),o&&Je(c``,o)}}}var Fp=["bug","feature","task","epic","chore"];function jp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Bp=["Critical","High","Medium","Low","Backlog"];function Up(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),a=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),p=n.querySelector("#btn-cancel"),g=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function b(){o.replaceChildren();let w=document.createElement("option");w.value="",w.textContent="\u2014 Select \u2014",o.appendChild(w);for(let R of Fp){let V=document.createElement("option");V.value=R,V.textContent=jp(R),o.appendChild(V)}i.replaceChildren();for(let R=0;R<=4;R+=1){let V=document.createElement("option");V.value=String(R);let U=Bp[R]||"Medium";V.textContent=`${R} \u2013 ${U}`,i.appendChild(V)}}b();function $(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function I(w){s.disabled=w,o.disabled=w,i.disabled=w,a.disabled=w,l.disabled=w,p.disabled=w,g.disabled=w,g.textContent=w?"Creating\u2026":"Create"}function B(){u.textContent=""}function Y(w){u.textContent=w}function oe(){try{let w=window.localStorage.getItem("beads-ui.new.type");w?o.value=w:o.value="";let R=window.localStorage.getItem("beads-ui.new.priority");R&&/^\d$/.test(R)?i.value=R:i.value="2"}catch{o.value="",i.value="2"}}function K(){let w=o.value||"",R=i.value||"";w.length>0&&window.localStorage.setItem("beads-ui.new.type",w),R.length>0&&window.localStorage.setItem("beads-ui.new.priority",R)}async function N(){B();let w=String(s.value||"").trim();if(w.length===0){Y("Title is required"),s.focus();return}let R=Number(i.value||"2");if(!(R>=0&&R<=4)){Y("Priority must be 0..4"),i.focus();return}let V=String(o.value||""),U=String(l.value||""),pe={title:w};V.length>0&&(pe.type=V),String(R).length>0&&(pe.priority=R),U.length>0&&(pe.description=U),I(!0);try{await t("create-issue",pe)}catch{I(!1),Y("Failed to create issue");return}K(),I(!1),$()}return n.addEventListener("cancel",w=>{w.preventDefault(),$()}),h.addEventListener("click",()=>$()),p.addEventListener("click",()=>$()),n.addEventListener("keydown",w=>{w.key==="Enter"&&(w.ctrlKey||w.metaKey)&&(w.preventDefault(),N())}),r.addEventListener("submit",w=>{w.preventDefault(),N()}),{open(){r.reset(),B(),oe();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var ly=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function cy(e,t){return Ji(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Wp(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=cy(r,e);return c`<button
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
        ${ly.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var uy=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Gp(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(se=>de(se,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let a="execution",l=!1,u="",p=null;function g(){if(p)return p;let se=i.querySelector('[data-pane="execution"]');return se?(p=yi(se,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Ae=>t.queueStore?.set?.(Ae)}),p):null}function h(){return c`
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
    `}function b(){let se=r.get();return c`
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
        ${se?c`
              ${Wp(se,s(),Y)}
              ${zp(se,u,{onDraft:Ae=>{u=Ae},onAdd:oe,onRemove:K})}
              ${Hp(se,N)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function $(se){let Ae=r.get();if(Ae)try{let De=await n("display-policy-set",{expected_revision:Ae.revision,policy:se(Ae)});I(De),De&&De.conflict&&De.policy&&(De=await n("display-policy-set",{expected_revision:De.policy.revision,policy:se(De.policy)}),I(De)),De&&De.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function I(se){se&&se.policy&&typeof se.policy=="object"&&r.set(se.policy)}function B(se){$(se)}function Y(se){let Ae=r.get();if(!Ae)return;let De=!dy(se,Ae);B(be=>py(se,be,De))}function oe(){let se=u.trim();se.length!==0&&(u="",B(Ae=>Ae.hidden_prefixes.includes(se)?{hidden_prefixes:Ae.hidden_prefixes}:{hidden_prefixes:[...Ae.hidden_prefixes,se]}),w())}function K(se){B(Ae=>({hidden_prefixes:Ae.hidden_prefixes.filter(De=>De!==se)}))}function N(se){let Ae=r.get();if(!Ae)return;let De=Ae.chips[se]===!1;B(()=>({chips:{[se]:De}}))}function w(){Je(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${uy.map(se=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${se.id}
                  aria-selected=${String(a===se.id)}
                  aria-controls=${`settings-pane-${se.id}`}
                  @click=${()=>R(se.id)}
                >
                  <span class="settings-dialog__glyph">${se.glyph}</span>
                  ${se.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${ce}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${b()}
          </div>
        </div>
      `,i),g()}function R(se){a=se,w()}let V=()=>{l=!1,t.onOpenChange?.(!1)};i.addEventListener("close",V),i.addEventListener("cancel",V);let U=se=>{se.target===i&&ce()};i.addEventListener("click",U);let pe=null;r.subscribe&&(pe=r.subscribe(()=>{l&&w()}));let Se=null;t.implPresetStore?.subscribe&&(Se=t.implPresetStore.subscribe(()=>{l&&p?.render()}));function xe(se="execution"){l||(l=!0,t.onOpenChange?.(!0),a=se,u="",w(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),g()?.load())}function ce(){l&&(l=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:xe,close:ce,sessionDraft:()=>p?.sessionDraft()??{},destroy(){l=!1,i.removeEventListener("close",V),i.removeEventListener("cancel",V),i.removeEventListener("click",U),pe&&(pe(),pe=null),Se&&(Se(),Se=null),p?.destroy(),p=null,i.remove()}}}function dy(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function py(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var fy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Kp="usage-meter-card",_y="usage-meter-layer",fl=600,my=["token_expired","relogin_required"];function Vp(e){return String(e).padStart(2,"0")}function gy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Yp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Vp(r.getHours())}:${Vp(r.getMinutes())}`,a=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${fy[r.getMonth()]} ${r.getDate()} ${o}`;return`${gy(n,t)} \xB7 ${a}`}function by(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Zp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Qp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Xp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function ef(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function hy(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:ef(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function yy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let i=hy(o);i&&r.push(i)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?ef(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function vy(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=yy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function tf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function wy(e,t){return!e.held||tf(e,t)<=fl?e:{...e,available:!1,windows:[],accounts:[]}}function Jp(e,t){return`${e}:${t}`}function nf(e){let t=!1,n=null,r=new Map,s=null,o=new Map,i=new Map,a=0,l=null;function u(){Je(c``,e),e.hidden=!0,g()}function p(){if(l===null){let be=e.ownerDocument;l=be.createElement("div"),l.id=_y,l.className="usage-meter__layer",be.body.appendChild(l)}return l}function g(){l!==null&&(Je(c``,l),l.remove(),l=null)}function h(be){n!==be&&(n===null&&(document.addEventListener("mousedown",$),document.addEventListener("keydown",B),window.addEventListener("resize",I)),n=be)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",$),document.removeEventListener("keydown",B),window.removeEventListener("resize",I))}function $(be){let X=be.target;X&&(e.contains(X)||l!==null&&l.contains(X))||(b(),ce())}function I(){ce()}function B(be){be.key==="Escape"&&(b(),ce())}function Y(be){n===be?b():h(be),ce()}function oe(){b(),ce()}async function K(be,X){if(r.has(be.key))return;let Z=Jp(be.key,X);r.set(be.key,X),i.delete(Z),ce();let ye=null;try{ye=await(await fetch(be.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:X})})).json()}catch{ye=null}if(t)return;if(r.delete(be.key),!ye||ye.ok!==!0){let te=ye&&typeof ye.error=="string"&&ye.error.length>0?ye.error:"network_error";i.set(Z,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${te}`}),ce();return}let j=Array.isArray(ye.warnings)?ye.warnings.filter(te=>typeof te=="string"&&te.length>0):[];j.length>0&&i.set(Z,{kind:"warn",text:j.join(" \xB7 ")}),ce(),await De()}function N(be,X,Z,ye){let j=Qp(be.pct),fe=`resets ${Yp(be.resetsAt,ye)}${X?` \xB7 ${Z}`:""}`;return c`<span
      class="usage-meter__window ${Zp(j)}"
      style=${`--progress: ${j}%`}
      title=${fe}
    >
      <span class="usage-meter__label">${be.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${j}%</span>
    </span>`}function w(be,X,Z){let ye=tf(X,Z),j=X.available&&(X.held||ye>fl),te=j?`${Math.floor(ye/60)}\uBD84 \uC804 \uCE21\uC815`:"",fe=X.accounts.filter(Le=>!Le.active).length,ve=`usage-meter__group${j?" usage-meter__group--stale":""}`,je=c`<span class="usage-meter__provider"
        >${be.label}</span
      >
      ${X.available?X.windows.map(Le=>N(Le,j,te,Z)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${fe>0?c`<span class="usage-meter__badge">+${fe}</span>`:""}`;if(X.accounts.length===0)return c`<span
        class=${ve}
        aria-label=${`${be.label} usage`}
        >${je}</span
      >`;let ae=n===be.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${ve}`}
      aria-label=${`${be.label} usage`}
      aria-expanded=${ae?"true":"false"}
      aria-controls=${Kp}
      @click=${()=>Y(be.key)}
    >
      ${je}
    </button>`}function R(be,X){return c`<span class="usage-meter" aria-label="Usage">
      ${be.map(Z=>w(Z.provider,Z.snapshot,X))}
    </span>`}function V(be,X){let Z=Qp(be.pct),ye=Yp(be.resetsAt,X);return c`<span
      class="usage-meter__account-window ${Zp(Z)}"
      style=${`--progress: ${Z}%`}
    >
      <span class="usage-meter__account-key">${be.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Z}%</span>
      <span class="usage-meter__account-reset"
        >${ye.length>0?`\u21BB ${ye}`:""}</span
      >
    </span>`}function U(be,X){return my.includes(X)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${be.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function pe(be,X,Z){let ye=X.status==="ok",j=typeof X.ageSeconds=="number"&&X.ageSeconds>fl,te=i.get(Jp(be.key,X.number)),fe=r.get(be.key),ve=fe!==void 0,je=fe===X.number,ae=["usage-meter__account"];return X.active&&ae.push("usage-meter__account--active"),ye||ae.push("usage-meter__account--unavailable"),j&&ae.push("usage-meter__account--stale"),c`<div class=${ae.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${X.email}
          >${X.alias===null?X.email:X.alias}</span
        >
        ${X.plan===null?"":c`<span class="usage-meter__account-tag">${X.plan}</span>`}
        ${X.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${X.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${by(X.ageSeconds)}</span
            >`}
        ${X.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ve}
              @click=${()=>{K(be,X.number)}}
            >
              ${je?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${ye?c`<div class="usage-meter__account-windows">
            ${X.windows.map(Le=>V(Le,Z))}
          </div>`:c`<div class="usage-meter__account-status">
            ${U(be,X.status)}
          </div>`}
      ${te===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${te.kind}"
          >
            ${te.text}
          </div>`}
    </div>`}function Se(be,X,Z){let ye=X.accounts.filter(j=>j.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${be.label} · 활성 ${ye} / 전체
        ${X.accounts.length}
      </h2>
      ${X.accounts.map(j=>pe(be,j,Z))}
    </section>`}function xe(be,X){return c`<div
      class="usage-meter__card"
      id=${Kp}
      role="dialog"
      aria-label=${`${be.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${Se(be.provider,be.snapshot,X)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function ce(){let be=Date.now(),X=[];for(let ye of Xp){let j=o.get(ye.key);j&&X.push({provider:ye,snapshot:wy(j,be)})}if(X.length===0){b(),u();return}let Z=X.find(ye=>ye.provider.key===n&&ye.snapshot.accounts.length>0);Z||b(),Je(R(X,be),e),e.hidden=!1,Z?se(Z,be):g()}function se(be,X){let Z=p(),ye=e.getBoundingClientRect(),j=e.ownerDocument.documentElement.clientWidth;Z.style.setProperty("--usage-meter-anchor-top",`${ye.bottom}px`),Z.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,j-ye.right)}px`),Je(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${oe}
        ></div>
        ${xe(be,X)}`,Z)}async function Ae(be){try{let X=await fetch(be.endpoint);return X.ok?vy(await X.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function De(){a+=1;let be=a,X=await Promise.all(Xp.map(async Z=>({provider:Z,read:await Ae(Z)})));if(!(t||be!==a)){for(let Z of X){let ye=Z.provider.key;if(Z.read.kind==="ok"){o.set(ye,Z.read.snapshot);continue}if(Z.read.kind==="empty"){o.delete(ye);continue}let j=o.get(ye);j!==void 0&&!j.held&&o.set(ye,{...j,held:!0})}ce()}}return u(),De(),s=setInterval(()=>{De()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),b(),u()}}}function rf(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,i=r.get(s.bead_id),a=typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at;return!o&&!a&&typeof s.dismissed_at!="number"}}var ky="worker-ineligible";function Ys(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function sf(e){return Ys(e).includes(ky)}var $y="session-preferred",xy=["exclusive_machine"];function of(e,t){if(!Ys(e).includes($y)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&xy.includes(n)?n:""}var Ay="worker-serial";function _l(e){return Ys(e).includes(Ay)}var af=new Set(["sh","bash","zsh","dash","ksh"]),lf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function cf(e){let t=e.split("/");return t[t.length-1]||""}function Sy(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=cf(n[0]);if(r!=="env")return af.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&af.has(cf(s))}function Ey(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Ty(e){let t=[],n=0;lf.lastIndex=0;for(let r of e.matchAll(lf)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:Ey(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Cy(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function uf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",i="",a="",l=0,u=null,p=!1;function g(w,R){return R?Ty(w).map(V=>V.kind==="plain"?V.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${V.kind}"
            >${V.text}</span
          >`):w}function h(){if(!s)return c``;let w=o==="ready"&&Sy(i),R=o==="ready"?i.split(`
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
              @click=${()=>{$()}}
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
                  ${R.map((V,U)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${U+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${g(V,w)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){Je(h(),r)}async function $(){if(o!=="ready")return;let w=await Ln(i);de(w?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",w?"success":"error")}function I(w){w.key==="Escape"&&s&&(w.preventDefault(),K())}function B(){p||(document.addEventListener("keydown",I),p=!0)}function Y(){p&&(document.removeEventListener("keydown",I),p=!1)}async function oe(w,R=null){let V=++l;B(),s={...w},u=R||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",i="",a="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let pe=t?t():"";if(!pe){o="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){o="error",a="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let Se="/api/repo-ops-script?workspace="+encodeURIComponent(pe)+"&lane="+encodeURIComponent(w.lane)+"&base_sha="+encodeURIComponent(w.base_sha);try{let xe=await n(Se),ce=await xe.json().catch(()=>({}));if(V!==l)return;if((t?t():"")!==pe){K();return}if(!xe.ok||!ce||ce.ok!==!0){o="error",a=Cy(ce&&typeof ce.error=="string"?ce.error:""),b();return}s={lane:ce.lane,base_sha:ce.base_sha,path:ce.path,base_ref:ce.base_ref},i=String(ce.content),o="ready",b()}catch{if(V!==l)return;o="error",a="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function K(){l+=1,Y(),s=null,i="",b();let w=u;u=null,w?.isConnected&&w.focus()}function N(){K(),r.remove()}return{open:oe,close:K,destroy:N}}function df(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function i(){let w=o();return typeof w.revision=="number"?w.revision:0}function a(w){t&&w&&w.queue&&typeof w.queue=="object"&&t.set(w.queue)}function l(){let w=o().workspace_info;return w&&typeof w=="object"?w:{}}function u(w,R){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${w}"
      >${R}</span
    >`}function p(w){if(typeof w!="number"||!Number.isFinite(w))return"";let R=w/6e4;return Number.isInteger(R)?`timeout ${R}\uBD84`:`timeout ${Math.round(w/1e3)}\uCD08`}function g(w){let R=p(w);return R?u("config",R):""}function h(w,R,V){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${V.script}
      @click=${U=>{s&&s({lane:w,base_sha:R.base_sha,path:V.script,base_ref:R.base_ref},U.currentTarget)}}
    ></button>`}function b(){let w=o().repo_ops_opt_out;return{verify:w?.verify===!0,deploy:w?.deploy===!0}}function $(w,R){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!R}
        @change=${V=>{Y(w,!V.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function I(w){let R=typeof w.base_sha=="string"?w.base_sha:"",V=`${w.source_path||"repo-ops/config.toml"} @ ${w.base_ref||"?"}${R?`@${R.slice(0,7)}`:""}`,U=b(),pe=!!w.verify&&U.verify,Se=!!w.deploy&&U.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${V}</span>
      </p>
      <div
        class="worker-repo-ops__lane${pe?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${w.verify?c`${h("verify",w,w.verify)}
              ${g(w.verify.timeout_ms)}
              ${pe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${pe?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":w.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${w.verify?$("verify",U.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Se?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${w.deploy?c`${h("deploy",w,w.deploy)}
              ${g(w.deploy.timeout_ms)}
              ${Se?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Se?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":w.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${w.deploy?$("deploy",U.deploy):""}
      </div>
    </section>`}function B(w){let R=w.repo_ops&&typeof w.repo_ops=="object"?w.repo_ops:null;return R&&(R.status==="resolved"||R.status==="absent")?I(R):R&&(R.status==="pending"||R.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${R.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${R.error_code?c` — <code>${R.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function Y(w,R){if(!n)return;let V=await n("worker-repo-ops-opt-out-toggle",{kind:w,opted_out:R,expected_revision:i()});if(a(V),V&&V.conflict){let U=await n("worker-repo-ops-opt-out-toggle",{kind:w,opted_out:R,expected_revision:i()});a(U)}r()}let oe={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function K(w,R,V){return c`<div class="worker-repo-ops__policy-group" data-policy=${V}>
      <div class="worker-repo-ops__policy-label">${w}</div>
      <ul class="worker-repo-ops__policy-list">
        ${R.map(U=>c`<li data-token=${U}>
              ${oe[U]||U}
            </li>`)}
      </ul>
    </div>`}function N(){let w=o(),R=w.repo_operation_policy&&typeof w.repo_operation_policy=="object"?w.repo_operation_policy:null;return R?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(R.worker_automatic||[]).length} · 금지
            ${(R.never_automatic||[]).length}</span
          >
        </summary>
        ${R.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${R.schema_version})`}
            </div>`:""}
        ${K("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",R.worker_automatic||[],"worker-automatic")}
        ${K("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",R.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${B(l())} ${N()}
      </details>`}}}var _f=20,Ry=5,Oy=new Set(["failed","running","queued","retry_pending"]),pf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function Ly(e,t,n=_f){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function Iy(e){if(e.type==="cleanup")return!0;let t=e.operation;return Oy.has(t.state)&&!t.dismissed&&!t.superseded_by}function Py(e,t,n={}){let r=Ly(e,t,1/0),s=n.expanded===!0?_f:Ry,o=new Set(r.slice(0,s)),i=r.filter(a=>o.has(a)||Iy(a));return{visible:i,hidden:r.length-i.length}}function ff(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function My(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function mf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function gf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Dy(e){let t=Nd(e),n=qd(e);return!t&&!n?"":c`<p class="worker-ev__why">
    ${t?c`<span class="worker-ev__why-line">${t}</span>`:""}${n?c`<span class="worker-ev__why-line">${n}</span>`:""}
  </p>`}function Ny(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function qy(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?rn(e.at):""}
      >${ui(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${ff(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(pf,t.kind)?pf[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${ai(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${xr(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${ff(e)}"
          >${My(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?gf(Dd(t.failure_kind,r)):""}
      ${Dy(t)} ${Ny(t)}
      ${mf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ai(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Fy(e){let t=e.cleanup,n=Er(t.step);return c`<li
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
      ${gf(Jr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${mf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function jy(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Fy(r):qy(r))}
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
  </section>`}function bf(e,t={}){let n=null;function r(){if(n===null){Je(c``,e);return}let i=Py(n.operations,n.cleanup_failures,{expanded:n.expanded});Je(jy({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",i=>{let a=i.target;if(a?.closest?.('[data-seam="repo-ops-close"]')){o();return}a?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",expanded:n.expanded},r())}}}var By=Ft("views:worker"),Uy="tab:worker:ready",Wy="tab:worker:blocked",zy="tab:worker:in-progress",Hy="tab:worker:resolved",Gy="tab:worker:closed",Ti=1,hf=5;function yf(e){return Es(e).evidence==="published"}var Ky=new Set(["quick_fix","spec_backed","full_plan"]);function vf(e){return typeof e=="string"&&Ky.has(e)}var xf="beads-ui.worker.candidate-filter",ml={show_blocked:!1,spec:"all"};function Vy(){try{let e=window.localStorage.getItem(xf);if(!e)return{...ml};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ml};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...ml}}}function Yy(e){try{window.localStorage.setItem(xf,JSON.stringify(e))}catch{}}function Zy(e,t){let n=a=>t.show_blocked||!a.blocked,r=a=>t.spec==="all"||(t.spec==="with"?a.has_spec:!a.has_spec),s=[],o=0,i=0;for(let a of e){let l=n(a),u=r(a);l&&u?s.push(a):!l&&u?o+=1:l&&!u&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Qy=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Af="bdui.worker.candidate_sort",Sf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"},{value:"updated",label:"\uCD5C\uC2E0 \uC218\uC815\uC21C"}],bl="spec";function Ef(e){return Sf.some(t=>t.value===e)?e:bl}function Xy(){try{return Ef(window.localStorage.getItem(Af))}catch{return bl}}function Jy(e){try{window.localStorage.setItem(Af,e)}catch{}}var Tf="bdui.worker.done-range";function ev(){try{let e=window.localStorage.getItem(Tf);return e===null?"today":Bn(e)}catch{return"today"}}function tv(e){try{window.localStorage.setItem(Tf,e)}catch{}}var nv="(max-width: 640px)",Cf="beads-ui.worker.lane-collapsed",Zs={queue:!0,done:!0};function rv(){try{let e=window.localStorage.getItem(Cf);if(!e)return{...Zs};let t=JSON.parse(e);return!t||typeof t!="object"?{...Zs}:{queue:typeof t.queue=="boolean"?t.queue:Zs.queue,done:typeof t.done=="boolean"?t.done:Zs.done}}catch{return{...Zs}}}function sv(e){try{window.localStorage.setItem(Cf,JSON.stringify(e))}catch{}}function wf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function ov(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(yr):t==="updated"?r.sort(bo):(r.sort(ho(n)),t==="board"?r:[...r.filter(yf),...r.filter(s=>!yf(s))])}function iv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function av(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var lv="\u{1F512} blocked";function kf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function cv(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function uv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function dv(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function pv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function fv(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function gl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var _v=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),mv=new Set(["waiting_metadata","reviewing","retrying"]);function gv(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",i=typeof t?.effort=="string"?t.effort:"",a=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${i?` \xB7 effort ${i}`:""}`:"",a?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${a}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,i=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,a=typeof r.next_at=="number"?rn(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,a?`\uB2E4\uC74C \uC2DC\uAC01 ${a}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function bv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function hv(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,i="";switch(e.phase){case"gating":i=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":i="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":i=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":i=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":i="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;i=t.label;break;case"paused":i="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":i="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[i,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=bv(e.terminal_reason);l&&a.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let u of t?t.details:[])a.push(u);return e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&a.push(`repair ${s.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:i,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:!_v.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function $f(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function yv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if($f(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${$f(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=cv(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${kf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${kf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function vv(e,t,n,r,s=null,o=null,i=null,a=!1,l=null,u=!0,p=null,g=null,h=null,b={},$=!1,I=!1,B={},Y=null){let oe=!!l&&l.position>0,K=!!l?.continuation_action&&l.continuation_action.continuation===null,N=!!l&&l.active===!0,w=l&&l.failure||null,R=dv(l?l.waiting:null,h),V=n[e]||null,U=V&&V.gate?V.gate:null,pe=V&&V.pr?V.pr:null,Se=pv(l?l.resolution:null),xe=fv(l?l.head_review:null),ce=l&&l.head_review||null,se=gv(h,ce),Ae=hv(h,se),De=l&&l.authority||null,be=!!ce&&["pending","reviewing","revising"].includes(ce.state),X=!!h&&typeof h=="object"&&mv.has(h.phase),Z=oe&&!N&&(ce?.state==="failed"||!De||X||De.source==="automatic"&&!I),ye=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":Se?Se.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":R,j=!!U&&U.base_badge==="\uCDA9\uB3CC",te=!!U&&U.enabled===!0,fe=Gs({bead_id:e,merge_sha:B.merge_sha,cleanup_cursor:B.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:B.repo_operations}),ve=Si(fe),je=o&&!fe&&(o.queueing??null)?o.queueing:null,ae=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!U&&U.tier==="merged",Le=a&&!!r&&!!U&&U.tier==="merged",St=Z&&(te||j||U?.reason==="base_behind"||U?.reason==="review_receipt_missing"||U?.reason==="review_receipt_stale"||U?.reason==="review_receipt_undetermined"||ae||Le),ht=a&&j&&u===!1,ut=qn(b,e,{external:a,merge_active:N||fe?.step==="merge",merge_queued:oe,conflict_active:!!i,cleanup_active:ve,merged:!!r||U?.tier==="merged"}),mt=!!ut.operation,T=!ae&&!!r&&r.step==="repo_operations",ne=yv({continuation_required:K,queueing:je,merge_step:fe,conflict_badge:ye,conflict_live:Se?.live===!0||i==="running",head_review:ce&&xe?{...xe,state:ce.state,failure_reason:ce.failure_reason}:null,auto_resolution:se,recovery:Ae,cleanup_failed:r,cleanup_label:r?Er(r.step):null,base_exception:g,conflicting:j,gate:U,receipt_check:V&&V.receipt_check?V.receipt_check:null,queue_failure:w,auto_skip:p,queued:oe,queue_active:N,queue_position:l?l.position:0,activity:ye?null:o&&o.activity||null}),Te=ne?.live===!0&&ne.title?c`<span title=${ne.title}>${ne.label}</span>`:ne?.label||null;return{id:e,title:a?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&fe?.active!==!0?Ai(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,...Y?{dependency_chips:Y}:{},external:a,pr_number:pe&&typeof pe.number=="number"?pe.number:null,pr_url:pe&&typeof pe.url=="string"?pe.url:"",completion_badge:ne?.live!==!0&&ne?.title?ne.label:null,completion_title:ne?.title||"",completion_repair_pr_url:Ae?Ae.repair_pr_url:"",completion_repair_pr_number:Ae?Ae.repair_pr_number:null,badges:Te?[Te]:[],live_badge:ne?.live===!0?Te:null,usage:s,alert:ne?.alert===!0,merge_action:U?.tier==="merged"&&!ae&&!Le||T?!1:!oe||K||Z,timeline_action:T,cancel_action:oe&&!K,cancel_enabled:(!N||be)&&!(Ae&&Ae.lock_actions),cancel_title:Ae&&Ae.lock_actions?`${Ae.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:N&&!be?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":be?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ut,discard_action:ut.action,merge_step:fe,discard_enabled:ut.enabled,discard_title:ut.title,merge_enabled:!fe&&!je&&!i&&!mt&&!g&&!(Ae&&Ae.lock_actions)&&!ht&&!T&&(te||j||U?.reason==="base_behind"||U?.reason==="review_receipt_missing"||U?.reason==="review_receipt_stale"||U?.reason==="review_receipt_undetermined"||ae||Le||St||X&&!N),merge_label:K?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ae||Le?"\uC815\uB9AC \uC7AC\uAC1C":j&&!fe&&!ae?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":U?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":U?.reason==="review_receipt_missing"||U?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Z?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:mt?ut.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ut.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ut.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:K?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":je?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":fe?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${fe.label}`:Le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ht?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":j?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":U?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":U?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":U?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":U?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":U?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":te?`\uBA38\uC9C0 (${U.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:U&&U.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${U&&U.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function hl(e,t={}){let{transport:n,issueStores:r,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:a,getWorkspacePath:l,switchWorkspace:u,openDoc:p,doneRange:g,onDoneRangeChange:h}=t,b=r?vo(r,i):null,$=xo({transport:n,uiOrderStore:i}),I=null,B=[],Y=Vy(),oe=null,K=null,N={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},w=Xy(),R=g?Bn(g):ev(),V=new Map;function U(){let d=Pr.find(y=>y.value===R);return d?d.label:"\uC624\uB298"}let pe=rv(),Se=!1,xe=new Set,ce=new Set,se=new Set,Ae=new Set,De=new Set,be={},X=null,Z=0,ye=null,j=[];function te(d){return X===d?be:{}}async function fe(){if(!n)return;let d=l?.()||"";if(X===d||ye&&ye.key===d&&ye.generation===Z)return;let y=++Z;ye={key:d,generation:y};let A=null;try{A=await Promise.resolve(n("get-session-defaults",{}))}catch(H){if(y!==Z)return;ye=null,By("get-session-defaults failed: %o",H),Me();return}y===Z&&(be=A&&typeof A.values=="object"&&A.values!==null?{...A.values}:{},X=d,ye=null,Me())}function ve(){X=null,Z+=1,fe()}let je=document.createElement("div");je.className="worker-console";let ae=document.createElement("div");ae.className="worker-top";let Le=document.createElement("div");Le.className="worker-drawer-overlay",Le.hidden=!0;let St=document.createElement("div");St.className="worker-drawer-overlay__backdrop";let ht=document.createElement("div");ht.className="worker-drawer-host";let ut=document.createElement("div");ut.className="worker-drawer-host",ut.hidden=!0,Le.append(St,ht,ut);let mt=document.createElement("div");mt.className="worker-lanes-host",je.append(ae,Le,mt),e.appendChild(je);let T=null,ne=Vr(ht,{transport:n,sessionLogStore:o,onClose:()=>{T=null,Le.hidden=!0,Me()}}),Te=bf(ut,{onClose:()=>{ut.hidden=!0,Le.hidden=!0,Me()}}),Ie=uf({getWorkspacePath:l||(()=>"")}),Ye=l&&l()||"",et=df({queueStore:s,transport:n,onChanged:()=>Me(),onOpenScript:(d,y)=>{Ie.open(d,y)}});function tt(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ti,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function dt(){let d=tt(),y=typeof d.serial_lane_count=="number"&&Number.isInteger(d.serial_lane_count)&&d.serial_lane_count>0?Math.min(d.serial_lane_count,5):0,A=Array.isArray(d.serial_lanes)?d.serial_lanes:[],H=[];for(let Fe of A){if(H.length>=y)break;!Fe||typeof Fe.id!="string"||!/^s[1-5]$/.test(Fe.id)||!Array.isArray(Fe.entries)||H.push({id:Fe.id,label:`\uC9C1\uB82C ${Fe.id.slice(1)}`,count:Fe.entries.length})}return H.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(d.queue)?d.queue:[]).length},...H]}function ee(d){if(!oe||!d.some(A=>A.id===oe))return null;let y=dt();return y?{bead_id:oe,lanes:y}:null}function G(){let d=tt();return typeof d.revision=="number"?d.revision:0}function ge(d){d&&d.queue&&s&&s.set(d.queue)}function it(){let d=tt().queue;return Array.isArray(d)?d.length:0}async function Xe(d,y,A){if(!n)return;let H=()=>({bead_id:d,...y==="parallel"?{}:{lane:y},...A===void 0?{}:{index:A},expected_revision:G()}),le=await n("worker-queue-place",H());ge(le),le&&le.conflict&&await n("worker-queue-place",H()).then(ge)}async function Ce(d,y,A){if(!n)return;let H=()=>({bead_id:d,...y==="parallel"?{}:{lane:y},to_index:A,expected_revision:G()}),le=await n("worker-queue-reorder",H());ge(le),le&&le.conflict&&await n("worker-queue-reorder",H()).then(ge)}async function Ne(d){if(!n)return;let y=await n("worker-queue-remove",{bead_id:d,expected_revision:G()});ge(y),y&&y.conflict&&await n("worker-queue-remove",{bead_id:d,expected_revision:G()}).then(ge)}async function at(d){if(!n||!d)return;let y=await n("worker-attempt-pause",{attempt_id:d});y&&y.paused===!1&&y.reason&&de(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function pt(d){if(!n||!d)return;let y=await Ur();if(y===null)return;let A=async(le={})=>await n("worker-attempt-resume",{attempt_id:d,expected_revision:G(),...y!==""?{instructions:y}:{},...le}),H=await A();ge(H),H&&H.conflict&&(H=await A(),ge(H)),H=await Kn(H,(le,Fe)=>A({continuation:le,decision_token:Fe}),{onResult:ge,refresh:()=>A()}),H&&H.resumed===!1&&!H.conflict&&H.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${H.reason}`,"error",2400)}async function lt(d){if(!n||!d)return;let y=await n("worker-attempt-dismiss",{attempt_id:d,expected_revision:G()});ge(y),y&&y.conflict&&(y=await n("worker-attempt-dismiss",{attempt_id:d,expected_revision:G()}),ge(y)),y&&y.dismissed===!1&&!y.conflict&&y.reason&&de(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function $t(d,y,A=!0){if(!n)return null;let H=n,le=await H(d,{...y,expected_revision:G()});return ge(le),le&&le.conflict&&A&&(le=await H(d,{...y,expected_revision:G()}),ge(le)),le}async function Kt(d){if(!n||!d)return;let y=tt().merge_queue?.find(H=>H.bead_id===d)?.continuation_action;if(y?.mismatch&&y.continuation===null){await Ut(d,y.mismatch);return}xe.add(d),Me();let A;try{A=await $t("worker-merge-queue-add",{bead_id:d})}catch{de("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{xe.delete(d),Me()}if(!(!A||A.applied)){if(A.conflict){de("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}de(uv(A.reason),"error",2400)}}async function Bt(d){if(!(!n||!d||ce.has(d))){ce.add(d),Me();try{let y=await n("worker-cleanup-retry",{bead_id:d,expected_revision:G()});ge(y),y&&!y.retried&&!y.conflict&&y.reason&&de(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{ce.delete(d),Me()}}}async function Ut(d,y){let A=await Kn({continuation_mismatch:y},(le,Fe)=>$t("worker-merge-queue-add",{bead_id:d,continuation:le,decision_token:Fe},!1)),H=A?.queue?.merge_queue?.find(le=>le.bead_id===d)?.continuation_action;if(A?.applied!==!0&&H?.continuation===null&&H.mismatch){await Ut(d,H.mismatch);return}A&&A.applied===!1&&!A.conflict&&de("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function It(d){if(!n)return;let y=await $t("worker-merge-auto-toggle",{on:d});!y||y.conflict||de(d?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",d?"success":"info",2400)}async function yt(d){if(!n||!d)return;let y=await $t("worker-merge-queue-remove",{bead_id:d});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&de("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function He(){await $t("worker-merge-queue-remove",{all:!0})}async function O(d,y=null,A="unmerged",H=null){if(!n||!d)return;let le=Ms(d,A);if(!(!!H||typeof globalThis.confirm!="function"||globalThis.confirm(le)))return;let Qe=await n("worker-discard",{bead_id:d,...y?{attempt_id:y}:{},...H?{operation_id:H}:{},expected_revision:G()});if(ge(Qe),Qe&&Qe.conflict&&(Qe=await n("worker-discard",{bead_id:d,...y?{attempt_id:y}:{},...H?{operation_id:H}:{},expected_revision:G()}),ge(Qe)),Qe&&Qe.discarded===!0){de(di(Qe),"success",5e3);return}if(Qe&&Qe.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${Qe.reason}`,"error",2800);return}if(Qe&&Qe.accepted&&Qe.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Qe&&Qe.accepted&&!Qe.discarded){de(`\uD3D0\uAE30 \uC9C4\uD589: ${Qe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Qe&&!Qe.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Q(d,y,A){if(!(!n||!y||!A||Ae.has(y))){Ae.add(y),Me();try{let H=await n(d,{bead_id:y,action_id:A,expected_revision:G()});ge(H),H?.conflict?de("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!H?.ok&&H?.reason&&de(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(H.reason)}`,"error",2800)}finally{Ae.delete(y),Me()}}}async function ue(d,y){if(!n||!y||se.has(y))return;se.add(y),Me();let A;try{let H=async(le={})=>await n(d,{bead_id:y,expected_revision:G(),...le});A=await H(),ge(A),A&&A.conflict&&(A=await n(d,{bead_id:y,expected_revision:G()}),ge(A)),d==="worker-revise-fix"&&(A=await Kn(A,(le,Fe)=>H({continuation:le,decision_token:Fe}),{onResult:ge,refresh:()=>H()}))}finally{se.delete(y),Me()}if(!(!A||A.conflict)){if(A.ok){de(d==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}de(`\uCC98\uBD84 \uAC70\uBD80: ${A.reason||""}`,"error",3e3)}}async function C(d){if(!n)return;let y=await n("worker-automation-toggle",{on:d,expected_revision:G()});ge(y),y&&y.conflict&&await n("worker-automation-toggle",{on:d,expected_revision:G()}).then(ge)}async function z(d){if(!n||!d)return;let y=await n("worker-repo-operation-dismiss",{operation_id:d});ge(y),y&&y.ok===!1&&de(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function Re(d){if(!n||!Number.isFinite(d))return;let y=Math.max(Ti,Math.floor(d)),A=await n("worker-queue-set-slots",{slots:y,expected_revision:G()});ge(A),A&&A.conflict&&await n("worker-queue-set-slots",{slots:y,expected_revision:G()}).then(ge)}async function qe(d){if(!n||!Number.isInteger(d)||d<1||d>hf)return;let y=tt(),A=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice(d).reduce((Fe,Qe)=>Fe+(Array.isArray(Qe?.entries)?Qe.entries.length:0),0),H=()=>({count:d,expected_revision:G()}),le=await n("worker-queue-set-serial-lane-count",H());ge(le),le&&le.conflict&&(le=await n("worker-queue-set-serial-lane-count",H()),ge(le)),le&&le.applied&&A>0&&de(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${A}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let we="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Ze(d,y){let A=Ga(d,y.id,N);return{id:y.id,title:y.title,location_label:y.location_label,prefixes:y.prefixes,action:A.kind==="note"?{kind:"note",text:A.text}:A.kind==="disabled"?{kind:"disabled",label:we,title:A.title}:{kind:"place",label:we,title:A.title}}}function ct(d,y){if(!K||K.bead_id!==d)return null;let A=K.counterpart_id,H=y.filter(le=>le.id===A);return H.length===0?null:{rows:H.map(le=>Ze(d,le))}}async function We(d,y){let A=Ga(d,y,N);if(K=null,A.kind!=="ops"){Me();return}let H=G();for(let le of A.ops){let Fe=await ke(le,H);if(Fe===null)break;H=Fe}Me()}async function ke(d,y){if(!n)return null;try{let A=await n("worker-queue-place",{bead_id:d.bead_id,lane:d.lane,index:d.index,expected_revision:y});if(ge(A),A&&A.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!A||A.applied!==!0)return de(A&&typeof A.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${A.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let H=A.queue?A.queue.revision:void 0;return typeof H!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):H}catch(A){return de(A instanceof Error&&A.message?A.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function L(){let d=tt(),y=b?b.selectBoardColumn(Uy,"ready"):[],A=b?b.selectBoardColumn(Wy,"blocked"):[],H=b?b.selectBoardColumn(Gy,"closed"):[],le=b?b.selectBoardColumn(zy,"in_progress"):[],Fe=b?b.selectBoardColumn(Hy,"resolved"):[],Qe=ko([...y,...A,...le,...Fe,...H]),qt=new Map;for(let _ of[...y,...A,...le])_&&_.id&&!qt.has(_.id)&&qt.set(_.id,_);let zt={...te(l?.()||"")};for(let _ of["orchestration_model","orchestration_effort","orchestration_speed"]){let P=d[_];typeof P=="string"&&(zt[_]=P)}function fn(_,P){let ie=qt.get(_);if(!ie)return null;let Ue=ie.metadata&&typeof ie.metadata=="object"?ie.metadata:{},Ve=ie.workflow?.route,Vt=Ue.route,Mt=vf(Ve)?Ve:vf(Vt)?Vt:null;return bn({pin:Ue,global:zt,execution_defaults:d.execution_defaults??null,runner_catalog:d.runner_catalog??null,route:Mt,controller_runtime:P})}function vn(_){let P=_.runner||null,ie=fn(_.bead_id,P),Ue=Ns(_),Ve=ie?cr(ie,P):null;return Ue||Ve?{orchestration:Ue,worker:Ve}:null}let _n=new Map;function Be(_){if(_n.has(_))return _n.get(_)??null;let P=fn(_,null),ie=null;if(P){let Ue=Nn(d.runner_catalog??null,P.orchestration_model.value??""),Ve=Ue===null?P:fn(_,Ue),Vt=Ar(Ve,d.runner_catalog??null),Mt=cr(Ve,Ue);ie=Vt||Mt?{orchestration:Vt,worker:Mt}:null}return _n.set(_,ie),ie}function x(_){let P=$o(Qe,_);return P.total===0?null:P}let re=d.bead_titles||{},M=new Map;for(let[_,P]of Object.entries(re))typeof P=="string"&&P.length>0&&M.set(_,P);for(let _ of[...y,...A])M.set(_.id,_.title||_.id);let $e=new Map;for(let _ of[...y,...A,...le,...Fe,...H])_&&_.id&&typeof _.from_id=="string"&&$e.set(_.id,_.from_id);let st=new Map;for(let _ of[...y,...A,...le,...Fe,...H])_&&_.id&&typeof _.priority=="number"&&st.set(_.id,_.priority);let nt=d.bead_times&&typeof d.bead_times=="object"&&!Array.isArray(d.bead_times)?d.bead_times:{},bt=d.bead_labels&&typeof d.bead_labels=="object"&&!Array.isArray(d.bead_labels)?d.bead_labels:{},Ke=d.bead_workflow&&typeof d.bead_workflow=="object"&&!Array.isArray(d.bead_workflow)?d.bead_workflow:{},Ct=new Map;for(let[_,P]of Object.entries(bt))Array.isArray(P)&&Ct.set(_,_l(P));for(let _ of[...y,...A]){let P=_.labels;Array.isArray(P)&&!Ct.has(_.id)&&Ct.set(_.id,_l(P))}let f=d.bead_blocked_by&&typeof d.bead_blocked_by=="object"&&!Array.isArray(d.bead_blocked_by)?d.bead_blocked_by:{},m=d.blocker_workspaces&&typeof d.blocker_workspaces=="object"&&!Array.isArray(d.blocker_workspaces)?d.blocker_workspaces:{},v=new Map;for(let[_,P]of Object.entries(nt))P&&typeof P=="object"&&v.set(_,P);for(let _ of[...y,...A])v.set(_.id,{created_at:_.created_at,updated_at:_.updated_at});let k=_=>v.get(_)||{},F=d.pr_wait||[],W=d.pr_observations||{},D=d.pr_activity||{},J=d.cleanup_failed||{},Pe=Object.entries(J).map(([_,P])=>({bead_id:_,step:P&&P.step?P.step:"",reason:P&&P.reason?P.reason:"",at:P&&typeof P.at=="number"?P.at:null,detail:P&&typeof P.detail=="string"?P.detail:null,output_tail:P&&typeof P.output_tail=="string"&&P.output_tail?P.output_tail:void 0,log_path:P&&typeof P.log_path=="string"&&P.log_path?P.log_path:void 0,retry_count:P&&typeof P.retry_count=="number"&&Number.isInteger(P.retry_count)&&P.retry_count>0?P.retry_count:0,failure_code:P&&typeof P.failure_code=="string"?P.failure_code:void 0})),ot=d.queue||[],an=new Set([...ot.map(_=>_.bead_id),...(Array.isArray(d.serial_lanes)?d.serial_lanes:[]).flatMap(_=>(Array.isArray(_?.entries)?_.entries:[]).map(P=>P.bead_id)),...F.map(_=>_.bead_id),...d.done.map(_=>_.bead_id)]),Ht=new Set(A.map(_=>_.id)),er=i?i.get()?.order||{}:{},jn=new Set,kl=[];for(let _ of[...y,...A])an.has(_.id)||jn.has(_.id)||iv(_)||(jn.add(_.id),kl.push(_));B=ov(kl,w,er);let Bf=d.admission||{},$l=_=>{let P=Bf[_];if(!P)return"";if(P.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ie=typeof P.reason=="string"?P.reason:"",Ue=ie.indexOf(":");return Ue>0&&Ue<ie.length-1?`\u26D4 ${ie.slice(0,Ue)} (${ie.slice(Ue+1)})`:`\u26D4 ${ie}`},xl=new Map,Uf=B.map(_=>{let P=Es(_),ie=P.evidence==="published",Ue=_.workflow?.route==="quick_fix"||_.metadata&&_.metadata.route==="quick_fix",Ve=!Object.hasOwn(_,"description")||typeof _.description=="string"&&_.description.trim().length>0,Vt=Object.hasOwn(_,"labels")&&sf(_.labels),Mt=Vt||!Object.hasOwn(_,"labels")?"":of(_.labels,_.metadata),Or=Mt.length>0,Rt=!Vt&&(Ue?Ve:ie&&!P.conflict),oo=Ht.has(_.id),zn=[];if(oo){let io=av(_);io.length>0?xl.set(_.id,io):zn.push(lv)}Ue&&!Ve?zn.push("missing_description"):!Ue&&P.conflict?zn.push("spec_id_conflict"):!Ue&&P.evidence==="none"?zn.push("spec \uC5C6\uC74C"):!Ue&&P.evidence==="draft"&&zn.push("spec \uBBF8\uBC1C\uD589(draft)");let Lr=$l(_.id);return Lr&&zn.push(Lr),{id:_.id,title:_.title||_.id,reason:zn.join(" \xB7 "),draggable:Rt,lane:"candidate",created_at:_.created_at,updated_at:_.updated_at,workflow:_.workflow,is_quick_fix:Ue,status:_.status,worker_ineligible:Vt,session_preferred:Or,session_preferred_reason:Mt,blocked:oo,has_spec:ie,exec_chips:Be(_.id),from_id:_.from_id||void 0,priority:st.get(_.id)}}),Ci=Zy(Uf,Y),Ri=Ci.visible,Wf=d.revise_parked||{},Qs=d.discard_operations&&typeof d.discard_operations=="object"&&!Array.isArray(d.discard_operations)?d.discard_operations:{},zf=_=>{let P=Ke[_]?.chips?.pr;return P&&typeof P.number=="number"&&typeof P.url=="string"?{pr_number:P.number,pr_url:P.url}:{}},Oi=(_,P)=>_.map((ie,Ue)=>{let Ve=P!=="done",Vt=P!=="done"&&P!=="queue",Mt=Ve?Wf[ie.bead_id]:null,Or=Ve?qn(Qs,ie.bead_id):null,Rt=Or?.operation?Or:null,oo=Ve&&Ct.get(ie.bead_id)===!0,zn=d.admission&&typeof d.admission=="object"?d.admission[ie.bead_id]:null,Lr=Ve?Td(zn,!!Rt||Ae.has(ie.bead_id)):null,io=Ve&&!Lr?$l(ie.bead_id):null,r_=Ve?[io]:[],s_=[];return{id:ie.bead_id,title:M.get(ie.bead_id)||ie.bead_id,reason:r_.filter(Boolean).join(" \xB7 "),draggable:Ve&&!Rt&&!Lr,done:P==="done",lane:P,seq:Vt?Ue+1:void 0,worker_serial:oo,discard:Rt,stale_work:Lr,badges:[...s_,...Mt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...P==="done"?li(d.attempts||{},ie.bead_id):[]],alert:!!Mt,revise_action:!!Mt,revise_enabled:!!Mt&&!Rt&&!se.has(ie.bead_id),revise_title:Mt?Mt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Mt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:P==="done"?Sn(d.attempts||{},ie.bead_id):null,work_ms:P==="done"?ci(d.attempts||{},ie.bead_id):null,done_at:P==="done"&&typeof ie.added_at=="number"?ie.added_at:void 0,exec_chips:Ve?Be(ie.bead_id):null,workflow:Ve&&Ke[ie.bead_id]||null,...P==="done"?zf(ie.bead_id):{},from_id:$e.get(ie.bead_id)||void 0,priority:st.get(ie.bead_id),...k(ie.bead_id)}}),Tr=d.attempts?Object.values(d.attempts).filter(Sr):[],Li=new Set;for(let _ of Tr)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&Li.add(_.resumed_from);let Al=new Map;for(let _ of Tr)Al.set(_.bead_id,_.attempt_id);let ns=new Map;for(let _ of Tr)ns.set(_.attempt_id,_);function Ii(_){let P=new Set,ie=_;for(;ie&&!P.has(ie.attempt_id);){if(ie.conflict_resolution===!0)return!0;P.add(ie.attempt_id),ie=typeof ie.resumed_from=="string"&&ie.resumed_from.length>0&&ns.get(ie.resumed_from)||null}return!1}let Xs=typeof d.declared_base=="string"?d.declared_base:null;function Hf(_){let P=null;for(let ie of Tr)!ie||ie.bead_id!==_||Ii(ie)||(P===null||(typeof ie.started_at=="number"?ie.started_at:0)>=(typeof P.started_at=="number"?P.started_at:0))&&(P=ie);return P&&typeof P.target_base=="string"?P.target_base:null}let Pi=[],Js=[],Gf=rf(d),Sl=_=>{let P=typeof _.session_id=="string"&&_.session_id.length>0,ie=Li.has(_.attempt_id);return{eligible:P&&!ie,reason:P?ie?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Cn=null;for(let _ of Tr){let P=_.status==="paused"&&!Li.has(_.attempt_id);if(_.status==="running"||P)Js.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:M.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,paused:P,conflict_resolution:Ii(_),base_exception:gl(Xs,_.target_base),can_pause:typeof _.session_id=="string"&&_.session_id.length>0,discard:qn(Qs,_.bead_id,{attempt_id:_.attempt_id}),workflow:Ke[_.bead_id]||null,priority:st.get(_.bead_id),usage:Sn(d.attempts||{},_.bead_id),rollup:x(_.bead_id),rollup_expanded:De.has(_.bead_id),exec_chips:vn(_),...k(_.bead_id)});else if((_.status==="failed"||_.status==="orphaned")&&Gf(_)){let ie=Sl(_);Pi.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:M.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,failed:!0,status:_.status,status_label:_.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:qn(Qs,_.bead_id,{attempt_id:_.attempt_id}),resume_eligible:ie.eligible,resume_reason:ie.reason,conflict_resolution:Ii(_),base_exception:gl(Xs,_.target_base),workflow:Ke[_.bead_id]||null,priority:st.get(_.bead_id),usage:Sn(d.attempts||{},_.bead_id),rollup:x(_.bead_id),rollup_expanded:De.has(_.bead_id),exec_chips:vn(_),...k(_.bead_id)}),Cn=_}}let El=new Set([...Pi,...Js].map(_=>_.bead_id)),Tl=new Map;for(let _ of Array.isArray(d.session_active)?d.session_active:[]){let P=_&&_.bead_id;if(!(typeof P!="string"||P.length===0||El.has(P))){if(El.add(P),Array.isArray(_.blocked_by)){let ie=_.blocked_by.filter(Ue=>typeof Ue=="string"&&Ue.length>0);ie.length>0&&Tl.set(P,ie)}Js.push({bead_id:P,attempt_id:null,kind:"session",title:_.title||M.get(P)||P,status:"in_progress",started_at:On(_.started_at)??On(_.updated_at),updated_at:On(_.updated_at),workflow:_.workflow||null,session_refs:Array.isArray(_.session_refs)?_.session_refs:[],priority:st.get(P),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1})}}let Cr=[...Pi,...Js].map(_=>{let P=ns.get(_.attempt_id),ie=P?.quickfix_landing;if(P?.quickfix_lane!==!0||!ie||typeof ie!="object")return _;let Ue=typeof ie.reason=="string"&&ie.reason.length>0?ie.reason:null,Ve=Gs({bead_id:P.bead_id,merge_sha:ie.head_sha,cleanup_cursor:ie.cursor,cleanup_failed:Ue?{step:ie.cursor,reason:Ue}:null,repo_operations:Array.isArray(d.repo_operations)?d.repo_operations:[]});return Ve?{..._,landing:Ve}:_}),Cl=null;if(Cn){let _=Sl(Cn),P=Cn.cause_detail;Cl={bead_id:Cn.bead_id,repo:Cn.repo||"",reason:Cn.cause||Cn.status,cause_detail:P&&typeof P.reason=="string"?{reason:P.reason,command:typeof P.command=="string"?P.command:null}:null,resume_attempt_id:Cn.attempt_id,resume_eligible:_.eligible,resume_reason:_.reason,discard:qn(Qs,Cn.bead_id,{attempt_id:Cn.attempt_id})}}let Rl=new Set(Cr.map(_=>_.bead_id)),Mi=Array.isArray(d.merge_queue)?d.merge_queue:[],Ol=new Map,Ll=new Map,Il=new Map,Pl=new Map,Ml=new Map;Mi.forEach((_,P)=>{_&&typeof _.bead_id=="string"&&(Ol.set(_.bead_id,P+1),Ll.set(_.bead_id,_.resolution),Il.set(_.bead_id,_.continuation_action||null),Pl.set(_.bead_id,_.head_review||null),Ml.set(_.bead_id,_.authority||null))});let Rr=d.merge_queue_state||{active:null,failures:{}},Kf=Rr.failures||{},Dl=Rr.waiting&&typeof Rr.waiting.bead_id=="string"&&typeof Rr.waiting.reason=="string"?Rr.waiting:null,Vf=d.auto_merge_skips||{},Nl=_=>{let P=Vf[_];if(!P)return null;let ie=W[_],Ue=ie&&ie.pr?ie.pr.head_sha:null;return Ue&&Ue===P.head_sha?P.reason||"":null},eo=new Map;for(let _ of Cr)_.failed!==!0&&_.conflict_resolution&&(_.paused?eo.has(_.bead_id)||eo.set(_.bead_id,"paused"):eo.set(_.bead_id,"running"));let ql=Cr.filter(_=>_.kind!=="session"&&!_.paused&&_.failed!==!0).length,Fl=(d.workspace_info||{}).slots,jl=typeof Fl=="number"?Fl:typeof d.slots=="number"?d.slots:Ti,Yf=ql>jl,to=br(R),Zf=(Array.isArray(d.done)?d.done.slice():[]).filter(_=>to===void 0||typeof _.added_at!="number"||_.added_at>=to).sort((_,P)=>(P.added_at||0)-(_.added_at||0)),rs=Oi(Zf,"done"),Qf=new Set((Array.isArray(d.done)?d.done:[]).map(_=>_?.bead_id).filter(_=>typeof _=="string")),Bl=[],Xf=l?.()||"";for(let _ of H){let P=On(_.closed_at);if(typeof _.id!="string"||Qf.has(_.id)||P===null||to!==void 0&&P<to||typeof _.comment_count!="number"||_.comment_count<=0)continue;let ie=`${Xf}\0${_.id}\0${String(_.updated_at)}\0${_.comment_count}`,Ue=V.get(ie);if(Ue===void 0&&n&&(V.set(ie,"pending"),Promise.resolve(n("get-comments",{id:_.id})).then(Ve=>{let Vt=Array.isArray(Ve)&&Ve.some(Mt=>Vo(typeof Mt?.text=="string"?Mt.text:"")?.lane==="session");V.set(ie,Vt?"session":"not-session"),Me()}).catch(()=>{V.set(ie,"failed"),Me()})),Ue==="session"){let Ve=On(_.started_at);Bl.push({id:_.id,title:_.title||_.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:Ve!==null&&P>=Ve?P-Ve:null,work_kind:"session",done_at:P,created_at:_.created_at,updated_at:_.updated_at})}}rs.push(...Bl),rs.sort((_,P)=>(P.done_at||0)-(_.done_at||0));let no={};for(let _ of Wn)no[_]=0;let Ul=!1,Wl=0,Di=0,zl=0;for(let _ of rs){let P=_.usage;if(P&&typeof P=="object"){let ie=!1;for(let Ue of Wn)Number.isFinite(P[Ue])&&(no[Ue]+=P[Ue],Ul=!0,ie=!0);ie&&(Di+=1,Number.isFinite(P.total_cost_usd)&&(Wl+=P.total_cost_usd,zl+=1))}}Di>0&&zl===Di&&(no.total_cost_usd=Wl);let Hl=rs.map(_=>_.usage).filter(_=>_&&typeof _=="object"&&_.providers),Jf=Hl.length>0?sn(Po(Hl)):Ul?Vn(no):null,Gl=d.lane_states&&typeof d.lane_states=="object"&&!Array.isArray(d.lane_states)?d.lane_states:{},Kl=Array.isArray(d.serial_lanes)?d.serial_lanes:[],Vl=_=>{if(F.some(Ue=>Ue.bead_id===_))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let P=Tr.filter(Ue=>Ue&&Ue.bead_id===_),ie=P.length>0?P[P.length-1].status:null;return ie==="failed"||ie==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ie==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ro=Kl.filter(_=>_&&typeof _.id=="string"&&Array.isArray(_.entries)).map((_,P)=>{let ie=Gl[_.id]||{},Ue=new Map((Array.isArray(ie.corrections)?ie.corrections:[]).filter(Rt=>Rt&&typeof Rt.bead_id=="string"&&typeof Rt.after=="string").map(Rt=>[Rt.bead_id,Rt.after])),Ve=Array.isArray(ie.occupied_by)?ie.occupied_by.filter(Rt=>typeof Rt=="string"):[],Vt=new Set(Ve),Mt=Oi(_.entries.filter(Rt=>!Rl.has(Rt.bead_id)&&!Vt.has(Rt.bead_id)),_.id).map(Rt=>Ue.has(Rt.id)?{...Rt,badges:[`\u{1F517} ${Ue.get(Rt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...Rt.badges]}:Rt),Or=Ve.map(Rt=>({id:Rt,title:M.get(Rt)||Rt,draggable:!1,lane:_.id,ghost:!0,badges:[Vl(Rt)]}));return{id:_.id,index:P+1,rows:[...Or,...Mt],occupied:Ve.length>0,badge:Ve.length>0?Vl(Ve[0]):"\uB300\uAE30",cycle:ie.cycle===!0}}),Yl=typeof d.serial_lane_count=="number"?d.serial_lane_count:ro.length,Ni=Oi(ot.filter(_=>!Rl.has(_.bead_id)),"queue"),Zl=new Map,Ql=new Set;for(let[_,P]of Object.entries(Gl)){if(!/^s[1-5]$/.test(_))continue;let ie=P&&Array.isArray(P.occupied_by)?P.occupied_by:[];for(let Ue of ie)typeof Ue=="string"&&Zl.set(Ue,_);ie.length>0&&Ql.add(_)}let tr=[];for(let _ of Cr)typeof _.bead_id=="string"&&tr.push({id:_.bead_id,title:M.get(_.bead_id)||_.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Zl.get(_.bead_id)??null});for(let _ of F){let P=_&&_.bead_id;typeof P!="string"||P.length===0||tr.push({id:P,title:M.get(P)||P,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let _ of ro)for(let P of _.rows)P.ghost!==!0&&tr.push({id:P.id,title:P.title,location_label:`${_.id} #${P.seq??""}`.trim(),kind:"serial",lane_id:_.id});Ni.forEach((_,P)=>{tr.push({id:_.id,title:_.title,location_label:`#${P+1}`,kind:"parallel",lane_id:null})});for(let _ of Ri)tr.push({id:_.id,title:_.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let Xl={};for(let _ of Kl)_&&typeof _.id=="string"&&Array.isArray(_.entries)&&(Xl[_.id]=_.entries.length);let qi=new Map;for(let _ of tr)qi.has(_.id)||qi.set(_.id,_);N={members_by_id:qi,serial_raw_lengths:Xl,serial_lane_count:Yl,occupied_lanes:Ql};let e_=Ld(d.bead_scope,tr),so=new Map;for(let[_,P]of Tl)so.set(_,P);for(let[_,P]of xl)so.set(_,P);for(let[_,P]of Object.entries(f))Array.isArray(P)&&so.set(_,P.filter(ie=>typeof ie=="string"&&ie.length>0));let t_=mp(so,tr,m),Fi=(_,P=null)=>{let ie=e_.get(_),Ue=t_.get(_)||null,Ve=ie&&ie.overlaps.length>0?ie.overlaps:null,Vt=!!ie&&ie.scope_missing;if(!Ue&&!Ve&&!Vt)return P;let Mt=Ve?ct(_,Ve):null;return{...P||{},...Ue?{predecessors:Ue}:{},...Ve?{overlaps:Ve}:{},...Vt?{scope_missing:!0}:{},...Mt?{popover:Mt}:{}}},ji=_=>{let P=Fi(_.id,_.dependency_chips||null);return P&&(_.dependency_chips=P),_};for(let _ of Ni)ji(_);for(let _ of ro)for(let P of _.rows)P.ghost!==!0&&ji(P);for(let _ of Ri)ji(_);let Jl=new Map;for(let _ of Cr){let P=typeof _.bead_id=="string"?_.bead_id:"";if(P.length===0)continue;let ie=_.kind==="session",Ue=Fi(P),Ve=typeof _.attempt_id=="string"&&_.attempt_id.length>0?ns.get(_.attempt_id):void 0,Vt=Ve&&Ve.last_activity&&typeof Ve.last_activity=="object"?Ve.last_activity:null,Mt=Ve&&Array.isArray(Ve.legs)?Ve.legs:[];!Ue&&!Vt&&Mt.length===0&&!ie||Jl.set(P,{...Vt?{last_activity:Vt}:{},...Mt.length>0?{legs:Mt}:{},...Ue?{dependency_chips:Ue}:{}})}let n_=F.map(_=>vv(_.bead_id,M.get(_.bead_id)||_.bead_id,W,J[_.bead_id]||null,Sn(d.attempts||{},_.bead_id),D[_.bead_id]||(xe.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:ce.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),eo.get(_.bead_id)||null,_.external===!0,{position:Ol.get(_.bead_id)||0,active:Rr.active===_.bead_id,failure:Kf[_.bead_id]||null,waiting:Dl?.bead_id===_.bead_id?Dl.reason:null,resolution:Ll.get(_.bead_id),continuation_action:Il.get(_.bead_id),head_review:Pl.get(_.bead_id)||null,authority:Ml.get(_.bead_id)||null},_.wt_present!==!1,d.auto_merge===!0?Nl(_.bead_id):null,gl(Xs,Hf(_.bead_id)),d.completion_status&&typeof d.completion_status=="object"&&!Array.isArray(d.completion_status)&&d.completion_status[_.bead_id]||null,d.discard_operations&&typeof d.discard_operations=="object"&&!Array.isArray(d.discard_operations)?d.discard_operations:{},ns.get(Al.get(_.bead_id)||"")?.worker_serial===!0,d.auto_merge===!0,{merge_sha:_.merge_sha,cleanup_cursor:_.cleanup_cursor,repo_operations:Array.isArray(d.repo_operations)?d.repo_operations:[]},Fi(_.bead_id))).map(_=>({..._,workflow:Ke[_.id]||null,priority:st.get(_.id),...k(_.id)}));return{queue:d,idToTitle:M,candidates:Ri,candidate_hidden:{blocked:Ci.hidden_blocked,spec:Ci.hidden_spec},running:Cr,live_count:ql,slots:jl,over_cap:Yf,failure:Cl,waiting:Ni,serial_lanes:ro,serial_lane_count:Yl,running_overlays:Jl,pr_wait:n_,merge_queue_length:Mi.length,merge_queue_running:Mi.length>0,auto_excluded:F.map(_=>_.bead_id).filter(_=>Nl(_)!==null),declared_base:Xs,done:rs,token_total:Jf,cleanup_failures:Pe,repo_operations:Array.isArray(d.repo_operations)?d.repo_operations:[]}}function q(d){let y=d.waiting.length>0?d.waiting[0].id:"\u2014",A=c`<button
      type="button"
      class="worker-play${d.queue.auto_advance?" is-active":""}"
    >
      ${d.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,H=ft(d),le=d.over_cap?c`<span
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
        >${U()} 완료 <b>${d.done.length}</b></span
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
          ${Array.from({length:hf},(Be,x)=>x+1).map(Be=>c`<option
                value=${String(Be)}
                ?selected=${d.serial_lane_count===Be}
              >
                ${Be}
              </option>`)}
        </select>
      </label> `,vn=jd({failure:d.failure}),_n=Ed(d.repo_operations,d.cleanup_failures);return Se?c`<div class="worker-ribbon">
          ${A} ${H}
          <div class="worker-kpi worker-kpi--ribbon">
            ${le}${Qe}${qt}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${fn}</div>
          <div class="worker-kpi">${zt}</div>
        </div>
        ${_n}${et.template()}${vn}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${A}${H}${fn}</div>
        <div class="worker-kpi">
          ${le}${Qe}${qt}${zt}
          ${(Array.isArray(d.token_total)?d.token_total:d.token_total?[{label:d.token_total,tooltip:`${U()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Be=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Be.tooltip}
                >${U()} 완료 · 누적 ${Be.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${y}</b></span
          >
        </div>
      </div>
      ${_n}${et.template()}${vn}`}function me(d){if(d.running.length===0&&d.pr_wait.length===0)return"";let y=d.running.some(A=>A.kind!=="session"&&!A.paused&&A.failed!==!0);return c`<section
      class="worker-now${y?" worker-pane--live":""}"
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
      ${d.running.length>0?Qa(d.running,Date.now(),T,d.running_overlays):""}
      ${d.pr_wait.map(A=>ir(A))}
    </section>`}function ze(d){let y=d.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${Y.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Qy.map(A=>c`<button
              type="button"
              class="worker-filter__chip${Y.spec===A.value?" is-active":""}"
              data-spec=${A.value}
              aria-pressed=${Y.spec===A.value?"true":"false"}
            >
              ${A.label}
            </button>`)}
        ${y.spec>0?c`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function he(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${w}
    >
      ${Sf.map(d=>c`<option value=${d.value} ?selected=${w===d.value}>
            ${d.label}
          </option>`)}
    </select>`}function Ge(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${R}
      >
        ${Pr.map(d=>c`<option value=${d.value} ?selected=${R===d.value}>
              ${d.label}
            </option>`)}
      </select>
    </div>`}function vt(d){let y=c`<span
      class="worker-lane__badge${d.occupied?" worker-lane__badge--held":""}"
      >${d.badge}</span
    >`,A=d.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return Tn({id:`worker-pane-lane-${d.id}`,lane:d.id,title:`\uC9C1\uB82C ${d.index}`,items:d.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:y,controls:A})}function ft(d){let y=d.queue.auto_merge===!0;if(d.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${y?" is-active":""}"
        title=${y?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${y?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${d.merge_queue_length}
      </button>`;if(y)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let A=new Set(d.auto_excluded),H=d.pr_wait.filter(le=>le.merge_action&&le.merge_enabled&&!A.has(le.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${H>0?` ${H}`:""}
    </button>`}function Et(d){let y=Tn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:d.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:he(),controls:ze(d),place_menu:ee(d.candidates),onOpenDoc:p?(A,H)=>p(H):void 0});return Se?c`<div class="worker-lanes worker-lanes--mobile">
        ${me(d)}
        ${Tn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:d.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:pe.queue,preview:wf(d.waiting)})}
        ${d.serial_lanes.map(A=>vt(A))}
        ${y}
        ${Tn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:d.done,empty:`${U()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ge(),collapsible:!0,collapsed:pe.done,preview:Array.isArray(d.token_total)?d.token_total.map(A=>A.label).join(" \xB7 "):d.token_total||wf(d.done)})}
      </div>`:c`<div class="worker-lanes">
      ${y}
      <div class="worker-wait">
        ${Tn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:d.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${d.serial_lanes.map(A=>vt(A))}
      </div>
      ${Tn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${d.slots}`,items:d.running,live:d.running.some(A=>A.kind!=="session"&&!A.paused&&A.failed!==!0),body:Qa(d.running,Date.now(),T,d.running_overlays)})}
      ${Tn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:d.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Tn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${U()} ${d.done.length}`,items:d.done,empty:`${U()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ge()})}
    </div>`}function Wt(d){pe={...pe,[d]:!pe[d]},sv(pe),Me()}function Me(){let d=L();Je(q(d),ae),Je(Et(d),mt)}function pn(){if(typeof window.matchMedia!="function")return;let d=window.matchMedia(nv);Se=!!d.matches;let y=A=>{let H=!!(A&&typeof A.matches=="boolean"?A.matches:d.matches);H!==Se&&(Se=H,Me())};typeof d.addEventListener=="function"?(d.addEventListener("change",y),j.push(()=>d.removeEventListener("change",y))):typeof d.addListener=="function"&&(d.addListener(y),j.push(()=>d.removeListener(y)))}let xt=null;function Zt(d){xt=d.target instanceof Element?d.target:null}function en(d){let A=d.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!A)return;if(xt&&A.contains(xt)&&xt.closest("input, button, a")){d.preventDefault();return}let H=A.dataset.beadId||"",le=A.dataset.lane||"";I={bead_id:H,from_lane:le};try{d.dataTransfer?.setData("text/plain",H),d.dataTransfer&&(d.dataTransfer.effectAllowed="move")}catch{}}function Qt(d){let y=d.target?.closest?.(".worker-pane");if(!y)return;let A=y.dataset.lane||"";A!=="candidate"&&A!=="queue"&&!/^s[1-5]$/.test(A)||(d.preventDefault(),d.dataTransfer&&(d.dataTransfer.dropEffect="move"),y.classList.add("worker-pane--drag-over"))}function rt(d){d.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Xt(d,y){let A=B.find(Qe=>Qe.id===d);if(!A)return;let H=B.filter(Qe=>Qe.id!==d),le=H.length;if(y){let Qe=y.dataset.beadId;if(Qe===d)return;let qt=H.findIndex(zt=>zt.id===Qe);qt>=0&&(le=qt)}let Fe=H.slice();Fe.splice(le,0,A),$.applyReorder(d,Fe,le)}function Ee(d){let y=d.target?.closest?.(".worker-pane");if(!y)return;d.preventDefault(),y.classList.remove("worker-pane--drag-over");let A=y.dataset.lane||"",H=I?.bead_id||d.dataTransfer?.getData("text/plain")||"",le=I?.from_lane||"";if(I=null,!H)return;let Fe=d.target?.closest?.(".worker-mini, .worker-card"),Qe=Array.from(y.querySelectorAll(".worker-mini, .worker-card")),qt=Qe.length;if(Fe){let zt=Qe.indexOf(Fe);zt>=0&&(qt=zt)}if(qt=Math.max(0,qt-y.querySelectorAll(".worker-mini--ghost").length),y.classList.contains("worker-pane--collapsed")&&(qt=it()),A==="candidate"){if(le==="candidate"){Xt(H,Fe);return}(le==="queue"||/^s[1-5]$/.test(le))&&Ne(H);return}if(A==="queue"||/^s[1-5]$/.test(A)){let zt=A==="queue"?"parallel":A;le===A?Ce(H,zt,qt):Xe(H,zt)}}function S(d){Y=d,Yy(d),Me()}function _e(d){w=Ef(d),Jy(w),Me()}function Oe(d){R=Bn(d),tv(R),h?.(R),Me()}function wt(d){let y=d.target?.closest?.(".worker-serial-lane-count");if(y){let qt=Number.parseInt(y.value,10);Number.isFinite(qt)&&qe(qt).then(Me);return}let A=d.target?.closest?.(".worker-filter__blocked");if(A){S({...Y,show_blocked:A.checked});return}let H=d.target?.closest?.(".worker-done-range");if(H){Oe(H.value);return}let le=d.target?.closest?.(".worker-sort");if(le){_e(le.value||bl);return}let Fe=d.target?.closest?.(".worker-slots__input");if(!Fe)return;let Qe=Number.parseInt(Fe.value,10);if(!Number.isFinite(Qe)){Me();return}Re(Qe).then(Me)}function Ot(d){return d?{runner:d.runner||void 0,model:d.model||void 0,effort:d.effort||void 0,worktree:d.worktree||void 0,status:d.status||void 0,session_id:d.session_id||void 0}:{}}function gt(){let d=L();return{operations:d.repo_operations,cleanup_failures:d.cleanup_failures,repo:l&&l()||""}}function Tt(){T&&ne.close(),ut.hidden=!1,Le.hidden=!1,Te.open(gt()),Me()}function tn(d){let y=tt(),A=y.attempts?y.attempts[d]:null;T=d,Te.close(),ut.hidden=!0,Le.hidden=!1,ne.open({attempt_id:d,meta:Ot(A)}),Me()}function nn(d){let y=tt(),A=(Array.isArray(y.session_active)?y.session_active:[]).find(le=>le&&le.bead_id===d),H=(A&&Array.isArray(A.session_refs)?A.session_refs:[]).find(le=>le&&le.current===!0);H&&(Te.close(),ut.hidden=!0,Le.hidden=!1,ne.open(Wr(H,d,"in_progress")),Me())}function $n(){if(Te.isOpen()&&Te.refresh(gt()),!T)return;let d=tt(),y=d.attempts?d.attempts[T]:null;if(y){ne.updateMeta(Ot(y));return}ne.close()}function Pt(d,y){if(d.length===0||!a)return;let A=l?l():void 0;if(y.length===0||!A||y===A||!u){a(d);return}Promise.resolve(u(y)).then(()=>{a(d)}).catch(()=>{de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function yn(d){let y=d.target;if(y?.closest?.(".worker-mini__serial, .worker-mini__grip"))return;let A=y?.closest?.(".worker-dep__open");if(A){Pt(A.getAttribute("data-dep-id")||"",A.getAttribute("data-root-dir")||"");return}let H=y?.closest?.(".mon-overlap__chip");if(H){let D=H.closest("[data-bead-id]"),J=D&&D.getAttribute("data-bead-id")||"";if(J){let Pe=H.getAttribute("data-overlap-id")||"";K=!!K&&K.bead_id===J&&K.counterpart_id===Pe?null:{bead_id:J,counterpart_id:Pe},Me()}return}let le=y?.closest?.(".mon-overlap__place");if(le){let D=le.closest("[data-bead-id]"),J=D&&D.getAttribute("data-bead-id")||"";J&&We(J,le.getAttribute("data-counterpart-id")||"");return}if(y?.closest?.(".mon-overlap__popover"))return;if(y?.closest?.(".worker-repo-strip")||y?.closest?.(".worker-mini__timeline")){Tt();return}let Fe=y?.closest?.(".worker-repo-op__dismiss");if(Fe){z(Fe.dataset.operationId||"");return}let Qe=y?.closest?.(".worker-cleanup__resume");if(Qe){let D=Qe.dataset.beadId;D&&Bt(D);return}let qt=y?.closest?.(".worker-banner__resume");if(qt){let D=qt.dataset.attemptId;D&&pt(D);return}let zt=y?.closest?.(".worker-banner__discard");if(zt){let D=zt.dataset.confirmation==="merged"?"merged":"unmerged";O(zt.dataset.beadId||"",zt.dataset.attemptId||null,D,zt.dataset.operationId||null);return}let fn=y?.closest?.(".worker-banner__dismiss");if(fn){let D=fn.dataset.attemptId;D&&lt(D);return}if(y?.closest?.(".worker-play")){C(!tt().auto_advance);return}let vn=y?.closest?.(".worker-merge-all");if(vn){vn.classList.contains("worker-merge-all--stop")?tt().auto_merge===!0?It(!1):He():It(!0);return}let _n=y?.closest?.(".worker-pane__hd--toggle");if(_n){let D=_n.dataset.lane;(D==="queue"||D==="done")&&Wt(D);return}let Be=y?.closest?.(".worker-card__place-lane");if(Be){let D=Be.dataset.beadId,J=Be.dataset.lane;D&&(J==="parallel"||/^s[1-5]$/.test(J||""))&&(oe=null,Me(),Xe(D,J));return}if(y?.closest?.(".worker-card__place-cancel")){oe=null,Me();return}let re=y?.closest?.(".worker-card__place");if(re){let D=re.dataset.beadId;D&&!re.disabled&&(dt()?(oe=D,Me()):Xe(D,"parallel"));return}let M=y?.closest?.(".worker-filter__chip");if(M){let D=M.dataset.spec;(D==="all"||D==="with"||D==="without")&&S({...Y,spec:D});return}let $e=y?.closest?.(".worker-mini__merge");if($e){let D=$e.dataset.beadId||"";tt().cleanup_failed?.[D]?Bt(D):Kt(D);return}let st=y?.closest?.(".worker-mini__merge-cancel");if(st){yt(st.dataset.beadId||"");return}let nt=y?.closest?.(".worker-mini__discard");if(nt){O(nt.dataset.beadId||"",nt.dataset.attemptId||null,nt.dataset.discardMode==="merged"?"merged":"unmerged",nt.dataset.operationId||null);return}let bt=y?.closest?.(".worker-mini__stale-continue");if(bt){Q("worker-stale-work-continue",bt.dataset.beadId||"",bt.dataset.actionId||"");return}let Ke=y?.closest?.(".worker-mini__stale-backup");if(Ke){Q("worker-stale-work-backup-fresh",Ke.dataset.beadId||"",Ke.dataset.actionId||"");return}let Ct=y?.closest?.(".worker-mini__stale-recheck");if(Ct){Q("worker-stale-work-recheck",Ct.dataset.beadId||"",Ct.dataset.actionId||"");return}let f=y?.closest?.(".worker-mini__revise-fix");if(f){ue("worker-revise-fix",f.dataset.beadId||"");return}let m=y?.closest?.(".worker-mini__revise-approve");if(m){ue("worker-revise-approve",m.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;if(y?.closest?.(".rtile__discard")){let D=y?.closest?.(".rtile"),J=D?.dataset?.beadId,Pe=D?.dataset?.attemptId;J&&O(J,Pe||null,"unmerged",y?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(y?.closest?.(".rtile__dismiss")){let J=y?.closest?.(".rtile")?.dataset?.attemptId;J&&lt(J);return}if(y?.closest?.(".rtile__pause")){let J=y?.closest?.(".rtile")?.dataset?.attemptId;J&&at(J);return}if(y?.closest?.(".rtile__resume")){let J=y?.closest?.(".rtile")?.dataset?.attemptId;J&&pt(J);return}if(y?.closest?.(".rtile__session")){let D=y?.closest?.(".rtile"),J=D?.dataset?.attemptId;if(J){tn(J);return}let Pe=D?.dataset?.beadId;Pe&&nn(Pe);return}if(y?.closest?.(".worker-drawer-overlay__backdrop")){Te.close(),ne.close();return}if(y?.closest?.(".worker-drawer-host"))return;let v=y?.closest?.(".rtile .board-card__roll-toggle");if(v){let D=v.dataset.rollParent;D&&(De.has(D)?De.delete(D):De.add(D),Me());return}let k=y?.closest?.(".rtile .board-card__roll-child");if(k){let D=k.dataset.childId;D&&a&&a(D);return}let F=y?.closest?.(".rtile");if(F){if(y?.closest?.(".rtile__id")){let J=F.dataset.beadId;J&&Ln(J).then(Pe=>{Pe?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let D=F.dataset.beadId;D&&a&&a(D);return}let W=y?.closest?.(".worker-mini, .worker-card");if(W){let D=W.dataset.beadId;if(y?.closest?.(".worker-mini__id, .worker-card__id")){D&&Ln(D).then(Pe=>{Pe?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let J=y?.closest?.(".ctl-chip--from");if(J){let Pe=J.dataset.fromId;Pe&&a&&a(Pe);return}D&&a&&a(D)}}e.addEventListener("pointerdown",Zt),e.addEventListener("dragstart",en),e.addEventListener("dragover",Qt),e.addEventListener("dragleave",rt),e.addEventListener("drop",Ee),e.addEventListener("click",yn),e.addEventListener("change",wt);function xn(d){if(!K)return;let y=d.target;y&&typeof y.closest=="function"&&y.closest(".mon-overlap__popover, .mon-overlap__chip")||(K=null,Me())}function E(d){d.key!=="Escape"||!K||(K=null,Me())}return document.addEventListener("click",xn),document.addEventListener("keydown",E),j.push(()=>{document.removeEventListener("click",xn),document.removeEventListener("keydown",E)}),pn(),b&&j.push(b.subscribe(()=>{for(let[d,y]of V)y==="failed"&&V.delete(d);Me()})),s&&j.push(s.subscribe(()=>{let d=l&&l()||"";d!==Ye&&(Ye=d,Ie.close()),Me(),$n()})),Me(),{load(){fe(),Me()},refreshSessionDefaults:ve,destroy(){for(let d of j.splice(0))try{d()}catch{}e.removeEventListener("pointerdown",Zt),e.removeEventListener("dragstart",en),e.removeEventListener("dragover",Qt),e.removeEventListener("dragleave",rt),e.removeEventListener("drop",Ee),e.removeEventListener("click",yn),e.removeEventListener("change",wt);try{ne.destroy()}catch{}Le.hidden=!0;try{Ie.destroy()}catch{}Je(c``,e)}}}function yl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Rf(e,t,n,r=async()=>{},s=async()=>{}){let o=Ft("views:workspace-picker"),i=null,a=!1,l=!1,u=!1;async function p(R){let U=R.target.value,Se=t.getState().workspace?.current?.path||"";if(U&&U!==Se){o("switching workspace to %s",U),a=!0,w();try{await n(U)}catch(xe){o("workspace switch failed: %o",xe)}finally{a=!1,w()}}}async function g(){let R=t.getState(),V=R.workspace?.current?.path||R.workspace?.available?.[0]?.path||"";if(!(!V||l)){o("git-pulling workspace %s",V),l=!0,w();try{await r(V)}catch(U){o("workspace git pull failed: %o",U)}finally{l=!1,w()}}}function h(R){let V=R.target;V&&e.contains(V)||I()}function b(R){R.key==="Escape"&&I()}function $(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",b),w())}function I(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),w())}function B(){u?I():$()}async function Y(R){let V=R.target,U=V.value,pe=V.checked;o("toggling visibility %s \u2192 %s",U,String(pe));try{await s(U,pe)}catch(Se){o("workspace visibility toggle failed: %o",Se)}}function oe(R){return R?c`
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
    `:c``}function K(R,V){return c`
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
                ${R.map(U=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${U.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${U.path}"
                        .checked=${!V.has(U.path)}
                        @change=${Y}
                      />
                      <span class="workspace-picker__manage-name"
                        >${yl(U.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function N(){let R=t.getState(),V=R.workspace?.current,U=R.workspace?.available||[],pe=new Set(R.workspace?.hidden||[]),Se=V?.path||U[0]?.path||"";if(U.length===0)return c``;let xe=U.filter(ce=>!pe.has(ce.path)||ce.path===Se);if(xe.length<=1){let ce=xe[0]||U[0],se=yl(ce.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ce.path}"
            >${se}</span
          >
          ${K(U,pe)}
          ${oe(Se)}
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
          ${xe.map(ce=>c`
              <option
                value="${ce.path}"
                ?selected=${ce.path===Se}
                title="${ce.path}"
              >
                ${yl(ce.path)}
              </option>
            `)}
        </select>
        ${K(U,pe)}
        ${oe(Se)}
        ${a||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function w(){Je(N(),e)}return w(),i=t.subscribe(()=>w()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),Je(c``,e)}}}var Of=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function vl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Lf(e,t,n=vl()){return{id:n,type:e,payload:t}}function If(e={}){let t=Ft("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,a=null,l=!0,u=new Map,p=[],g=new Map,h=new Set;function b(N){for(let w of Array.from(h))try{w(N)}catch{}}function $(){if(!l||a)return;o="reconnecting",t("ws reconnecting\u2026"),b(o);let N=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),w=(n.jitterRatio||0)*N,R=Math.max(0,Math.round(N+(Math.random()*2-1)*w));t("ws retry in %d ms (attempt %d)",R,i+1),a=setTimeout(()=>{a=null,K()},R)}function I(N){try{s?.send(JSON.stringify(N))}catch(w){t("ws send failed",w)}}function B(){for(o="open",t("ws open"),b(o),i=0;p.length;){let N=p.shift();N&&I(N)}}function Y(N){let w;try{w=JSON.parse(String(N.data))}catch{t("ws received non-JSON message");return}if(!w||typeof w.id!="string"||typeof w.type!="string"){t("ws received invalid envelope");return}if(u.has(w.id)){let V=u.get(w.id);u.delete(w.id),w.ok?V?.resolve(w.payload):V?.reject(w.error||new Error("ws error"));return}let R=g.get(w.type);if(R&&R.size>0)for(let V of Array.from(R))try{V(w.payload)}catch(U){t("ws event handler error",U)}else t("ws received unhandled message type: %s",w.type)}function oe(){o="closed",t("ws closed"),b(o);for(let[N,w]of u.entries())w.reject(new Error("ws disconnected")),u.delete(N);i+=1,$()}function K(){if(!l)return;let N=r();try{s=new WebSocket(N),t("ws connecting %s",N),o="connecting",b(o),s.addEventListener("open",B),s.addEventListener("message",Y),s.addEventListener("error",()=>{}),s.addEventListener("close",oe)}catch(w){t("ws connect failed %o",w),$()}}return K(),{send(N,w){if(!Of.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let R=vl(),V=Lf(N,w,R);return t("send %s id=%s",N,R),new Promise((U,pe)=>{u.set(R,{resolve:U,reject:pe,type:N}),s&&s.readyState===s.OPEN?I(V):(t("queue %s id=%s (state=%s)",N,R,o),p.push(V))})},on(N,w){g.has(N)||g.set(N,new Set);let R=g.get(N);return R?.add(w),()=>{R?.delete(w)}},onConnection(N){return h.add(N),()=>{h.delete(N)}},reconnect(){l=!0,a&&(clearTimeout(a),a=null),i=0,K()},close(){l=!1,a&&(clearTimeout(a),a=null);try{s?.close()}catch{}},getState(){return o}}}function wv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function kv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var wl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Pf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],ur="tab:worker:closed",$v="bdui.worker.done-range",Mf=Dp,Df="worker:queue",Nf="ui:order",qf="ui:display-policy",Ff="exec:presets",dr="tab:board:closed",jf="beads-ui.board.closed-range";function xv(e){let t=Ft("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Je(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),a=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),p=document.getElementById("detail-panel");if(i&&nf(i),a&&l&&u&&p){let te=function(E,d){let y="Request failed",A="";if(E&&typeof E=="object"){let le=E;if(typeof le.message=="string"&&le.message.length>0&&(y=le.message),typeof le.details=="string")A=le.details;else if(le.details&&typeof le.details=="object")try{A=JSON.stringify(le.details,null,2)}catch{A=""}}else typeof E=="string"&&E.length>0&&(y=E);let H=d&&d.length>0?`Failed to load ${d}`:"Request failed";j.open(H,y,A)},G=function(E){return`${rt.getState().workspace.current?.path||""}\0${E}`},ge=function(){ne&&(ne().catch(()=>{}),ne=null),Te=null,Ie=null},Xe=function(E){Ye=E;let d=()=>{Ye!==E||rt.getState().selected_id!==E||(Ye=null,it(E))};if(!dt){tt.then(d);return}d()},pt=function(E,d,y,A,H){return y!==at[d]?(H().catch(()=>{}),!1):(E.set(A,H),!0)},$t=function(){let E=rt.getState();yt(E.view==="board"),z(E.view==="worker"),ct(E.view==="monitor"),qe(E.view==="board"||E.view==="worker"||lt||!!E.selected_id)},Ut=function(){let E=br(Kt);return E===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:E}}},It=function(){let E=br(Bt);return E===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:E}}},yt=function(E){if(E)for(let[d,y]of wl){if(Ce.has(d)||Ne.has(d))continue;let A=d===dr?Ut():{type:y};try{ae.register(d,A)}catch(Fe){t("register %s store failed: %o",d,Fe)}Ne.add(d);let H=at.board,le=!1;je.subscribeList(d,A).then(Fe=>{le=!pt(Ce,"board",H,d,Fe)}).catch(Fe=>{t("subscribe %s failed: %o",d,Fe),te(Fe,"board")}).finally(()=>{Ne.delete(d),le&&$t()})}else Q()},Q=function(){at.board+=1;for(let[E]of wl){let d=Ce.get(E);d&&(d().catch(()=>{}),Ce.delete(E));try{ae.unregister(E)}catch(y){t("unregister %s failed: %o",E,y)}}},z=function(E){if(!E){Re();return}for(let[d,y]of Pf){if(ue.has(d)||Ne.has(d))continue;let A=d===ur?It():{type:y};try{ae.register(d,A)}catch(Fe){t("register %s store failed: %o",d,Fe)}Ne.add(d);let H=at.worker,le=!1;je.subscribeList(d,A).then(Fe=>{le=!pt(ue,"worker",H,d,Fe)}).catch(Fe=>{t("subscribe %s failed: %o",d,Fe),te(Fe,"worker")}).finally(()=>{Ne.delete(d),le&&$t()})}},Re=function(){at.worker+=1;for(let[E]of Pf){let d=ue.get(E);d&&(d().catch(()=>{}),ue.delete(E));try{ae.unregister(E)}catch(y){t("unregister %s failed: %o",E,y)}}},qe=function(E){if(!E){we();return}C||(ve("subscribe-worker-queue",{id:Df}).catch(d=>{t("subscribe-worker-queue failed: %o",d)}),C=()=>ve("unsubscribe-worker-queue",{id:Df}))},we=function(){C&&(C().catch(()=>{}),C=null)},ct=function(E){if(!E){We();return}Ze||(ve("subscribe-monitor-pipeline",{id:Mf}).catch(d=>{t("subscribe-monitor-pipeline failed: %o",d)}),Ze=()=>ve("unsubscribe-monitor-pipeline",{id:Mf}))},We=function(){Ze&&(Ze().catch(()=>{}),Ze=null)},L=function(){ke||(ve("subscribe-ui-order",{id:Nf}).catch(E=>{t("subscribe-ui-order failed: %o",E)}),ke=()=>ve("unsubscribe-ui-order",{id:Nf}))},q=function(){ke&&(ke().catch(()=>{}),ke=null),ht.clear()},ze=function(){me||(ve("subscribe-display-policy",{id:qf}).catch(E=>{t("subscribe-display-policy failed: %o",E)}),me=()=>ve("unsubscribe-display-policy",{id:qf}))},he=function(){me&&(me().catch(()=>{}),me=null),ut.clear()},vt=function(){Ge||(ve("subscribe-impl-presets",{id:Ff}).catch(E=>{t("subscribe-impl-presets failed: %o",E)}),Ge=()=>ve("unsubscribe-impl-presets",{id:Ff}))},xt=function(E){if(!E)return"Unknown";let d=E.split("/").filter(Boolean);return d.length>0?d[d.length-1]:"Unknown"},Tt=function(E,d){gt.open(E.path,{missing_state:E.missing_state,...d?{workspace:d}:{}})};var g=te,h=G,b=ge,$=Xe,I=pt,B=$t,Y=Ut,oe=It,K=yt,N=Q,w=z,R=Re,V=qe,U=we,pe=ct,Se=We,xe=L,ce=q,se=ze,Ae=he,De=vt,be=xt,X=Tt;let Z=document.getElementById("header-loading"),ye=Mc(Z),j=Ad(e),fe=If(),ve=ye.wrapSend((E,d)=>fe.send(E,d)),je=Tc(ve),ae=Cc(),Le=Oc(),St=_c(),ht=Rc(),ut=pc(),mt=fc(),T=mc();fe.on("impl-presets-snapshot",E=>{let d=E;d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&mt.set({revision:d.revision,presets:d.presets})}),fe.on("monitor-pipeline-snapshot",E=>{let d=E;if(!(!d||!Array.isArray(d.workspaces)))try{St.set(d.workspaces,d.workspaces_state,d.cross_lanes)}catch{}}),fe.on("ui-order-snapshot",E=>{let d=E;if(d&&typeof d.revision=="number")try{ht.set({revision:d.revision,order:d.order&&typeof d.order=="object"?d.order:{}})}catch{}}),fe.on("display-policy-snapshot",E=>{let d=E;if(d&&d.policy&&typeof d.policy=="object")try{ut.set(d.policy)}catch{}}),fe.on("session-log-snapshot",E=>{let d=E;if(d&&typeof d.id=="string")try{T.set(d.id,Array.isArray(d.lines)?d.lines:[],typeof d.last_event_at=="number"?d.last_event_at:null)}catch{}}),fe.on("session-log-append",E=>{let d=E;if(d&&typeof d.id=="string")try{T.append(d.id,d.event)}catch{}}),fe.on("snapshot",E=>{let d=E,y=d&&typeof d.id=="string"?d.id:"",A=y?ae.getStore(y):null;if(A&&d&&d.type==="snapshot")try{A.applyPush(d)}catch{}}),fe.on("upsert",E=>{let d=E,y=d&&typeof d.id=="string"?d.id:"",A=y?ae.getStore(y):null;if(A&&d&&d.type==="upsert")try{A.applyPush(d)}catch{}}),fe.on("delete",E=>{let d=E,y=d&&typeof d.id=="string"?d.id:"",A=y?ae.getStore(y):null;if(A&&d&&d.type==="delete")try{A.applyPush(d)}catch{}});let ne=null,Te=null,Ie=null,Ye=null,et=()=>{},tt=new Promise(E=>{et=()=>E(void 0)}),dt=!1,ee=!1;async function it(E){let d=G(E);if(d===Te||d===Ie)return;Ie=d;let y=`detail:${E}`,A={type:"issue-detail",params:{id:E}};try{ae.register(y,A)}catch(H){t("register detail store failed: %o",H)}try{let H=await je.subscribeList(y,A);if(rt.getState().selected_id!==E||G(E)!==d){await H().catch(()=>{});return}ne&&await ne().catch(()=>{}),ne=H,Te=d}catch(H){t("detail subscribe failed: %o",H),te(H,"issue details")}finally{Ie===d&&(Ie=null)}}let Ce=new Map,Ne=new Set,at={board:0,worker:0},lt=!1,Kt=_o;try{let E=window.localStorage.getItem(jf);Vi(E)&&(Kt=E)}catch{}let Bt="today";try{let E=window.localStorage.getItem($v);E!==null&&(Bt=Bn(E))}catch{}async function He(E){if(!Vi(E)||E===Kt)return;Kt=E;try{window.localStorage.setItem(jf,E)}catch{}let d=Ce.get(dr);if(!d)return;Ce.delete(dr),await d().catch(()=>{});let y=Ut();try{ae.register(dr,y)}catch(A){t("register %s store failed: %o",dr,A)}try{let A=await je.subscribeList(dr,y);Ce.set(dr,A)}catch(A){t("re-subscribe %s failed: %o",dr,A),te(A,"board")}}async function O(E){let d=Bn(E);if(d===Bt)return;Bt=d;let y=ue.get(ur);if(!y)return;ue.delete(ur),await y().catch(()=>{});let A=It();try{ae.register(ur,A)}catch(H){t("register %s store failed: %o",ur,H)}try{let H=await je.subscribeList(ur,A);ue.set(ur,H)}catch(H){t("re-subscribe %s failed: %o",ur,H),te(H,"worker")}}let ue=new Map,C=null,Ze=null,ke=null,me=null,Ge=null;async function ft(){me=null,ut.clear(),Ge=null,mt.clear(),C=null,Ze=null,Ce.clear(),ue.clear(),at.board+=1,at.worker+=1,vt();let E=rt.getState().workspace.current?.path;if(E)try{await fe.send("set-workspace",{path:E})}catch(y){t("workspace restore after reconnect failed: %o",y);return}ze();let d=rt.getState();yt(d.view==="board"),z(d.view==="worker"),ct(d.view==="monitor"),qe(d.view==="board"||d.view==="worker"||!!d.selected_id)}async function Et(){t("clearing all subscriptions for workspace switch"),Q(),Re(),we(),Le.clear(),q(),L(),he(),ze(),ge();let E=rt.getState();if(E.selected_id)try{ae.unregister(`detail:${E.selected_id}`)}catch{}let d=rt.getState();yt(d.view==="board"),z(d.view==="worker"),ct(d.view==="monitor"),qe(d.view==="board"||d.view==="worker"||!!d.selected_id),d.selected_id&&Xe(d.selected_id)}async function Wt(E){t("requesting workspace switch to %s",E),ee=!0;try{let d=await fe.send("set-workspace",{path:E});t("workspace switch result: %o",d),d&&d.workspace&&(rt.setState({workspace:{current:{path:d.workspace.root_dir,database:d.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",E),d.changed&&(await Et(),de("Switched to "+xt(E),"success",2e3)))}catch(d){throw t("workspace switch failed: %o",d),de("Failed to switch workspace","error",3e3),d}finally{ee=!1}}async function Me(E){t("requesting workspace git pull for %s",E);try{let d=await fe.send("git-pull-workspace",{});t("workspace git pull result: %o",d);let y=d?.status;if(y==="up_to_date"){de("Already up to date","success",2e3);return}if(y==="stash_pop_conflict"){de("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}de("Git pulled "+xt(E),"success",2e3)}catch(d){t("workspace git pull failed: %o",d);let y=d?.code,A=d?.message;if(y==="rebase_conflict"){de("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(y==="rebase_conflict_abort_failed"){de("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(y==="busy"){de("Git pull skipped: another operation is running","warning",3e3);return}let H=A?`: ${A}`:"";throw de(`Git pull failed${H}`,"error",3e3),d}}async function pn(E,d){t("setting workspace visibility %s \u2192 %s",E,String(d));try{await fe.send("set-workspace-visibility",{path:E,visible:d}),await Zt()}catch(y){t("workspace visibility update failed: %o",y),de("Failed to update project visibility","error",3e3)}}async function Zt(){try{let E=await fe.send("list-workspaces",{});if(t("workspaces loaded: %o",E),E&&Array.isArray(E.workspaces)){let d=E.workspaces.map(le=>({path:le.path,database:le.database,pid:le.pid,version:le.version})),y=E.current?{path:E.current.root_dir,database:E.current.db_path}:null,A=Array.isArray(E.hidden)?E.hidden.filter(le=>typeof le=="string"):[];rt.setState({workspace:{current:y,available:d,hidden:A}});let H=window.localStorage.getItem("beads-ui.workspace");H&&(!d.some(Fe=>Fe.path===H)||A.includes(H)?window.localStorage.removeItem("beads-ui.workspace"):y&&H!==y.path&&(t("restoring saved workspace preference: %s",H),await Wt(H)))}}catch(E){t("failed to load workspaces: %o",E)}}fe.on("workspace-changed",E=>{t("workspace-changed event: %o",E),E&&E.root_dir&&(rt.setState({workspace:{current:{path:E.root_dir,database:E.db_path}}}),Zt(),Et())});let en=!1;if(typeof fe.onConnection=="function"){let E=d=>{t("ws state %s",d),d==="reconnecting"||d==="closed"?(en=!0,de("Connection lost. Reconnecting\u2026","error",4e3)):d==="open"&&en&&(en=!1,de("Reconnected","success",2200),kv(rt,(y,A)=>{t(`${y}: %o`,A)}),ft())};fe.onConnection(E)}let Qt="board";try{let E=window.localStorage.getItem("beads-ui.view");(E==="board"||E==="worker"||E==="monitor")&&(Qt=E)}catch(E){t("view parse error: %o",E)}let rt=Pc({config:wv(),view:Qt});fe.on("worker-queue-snapshot",E=>{let d=E;if(!d||!d.queue)return;let y=rt.getState().workspace.current?.path;if(typeof y=="string"&&y.length>0&&d.root_dir!==y){t("dropping worker-queue snapshot for %s",String(d.root_dir));return}try{Le.set(d.queue)}catch{}});let Xt=Lc(rt);Xt.start();let Ee=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),S=async(E,d)=>{try{return await ve(E,d)}catch(y){if(Ee.has(E))throw y;return[]}};qp({global_element:r,repo_element:s},rt,Xt);let _e=document.getElementById("workspace-picker");_e&&Rf(_e,rt,Wt,Me,pn);let Oe=Up(e,(E,d)=>ve(E,d));try{let E=document.getElementById("new-issue-btn");E&&E.addEventListener("click",()=>Oe.open())}catch{}let wt=Gp(e,{policyStore:ut,queueStore:Le,implPresetStore:mt,transport:(E,d)=>ve(E,d),onOpenChange:E=>{let d=lt;lt=E,$t(),d&&E===!1&&nn.refreshSessionDefaults()},labelOptions:()=>{let E=new Set;for(let[d]of wl)for(let y of ae.snapshotFor(d)||[]){let A=y.labels;if(Array.isArray(A))for(let H of A)typeof H=="string"&&H.length>0&&E.add(H)}return Array.from(E).sort()}});try{let E=document.getElementById("display-settings-btn");E&&(E.setAttribute("aria-label","\uC124\uC815"),E.setAttribute("title","\uC124\uC815"),E.addEventListener("click",()=>wt.open()))}catch{}let Ot=document.createElement("div");Ot.className="md-viewer-root",document.body.appendChild(Ot);let gt=oi(Ot,{getWorkspacePath:()=>rt.getState().workspace.current?.path}),tn=Zc(a,{gotoIssue:E=>Xt.gotoIssue(E),issueStores:ae,transport:S,workerQueueStore:Le,uiOrderStore:ht,displayPolicyStore:ut,closedRange:Kt,onClosedRangeChange:E=>{He(E)},onNewIssue:()=>Oe.open(),openDoc:Tt}),nn=hl(l,{transport:S,issueStores:ae,queueStore:Le,sessionLogStore:T,uiOrderStore:ht,gotoIssue:E=>rt.setState({selected_id:E}),getWorkspacePath:()=>rt.getState().workspace.current?.path,switchWorkspace:E=>Wt(E),openDoc:Tt,doneRange:Bt,onDoneRangeChange:E=>{O(E)}}),$n=Np(u,{transport:S,pipelineStore:St,execPresetStore:mt,sessionLogStore:T,router:Xt,gotoIssue:E=>Xt.gotoIssue(E),getWorkspacePath:()=>rt.getState().workspace.current?.path,switchWorkspace:E=>Wt(E),openDoc:Tt}),Pt=xd(p,{issueStores:ae,transport:S,queueStore:Le,execPresetStore:mt,sessionLogStore:T,getWorkspacePath:()=>rt.getState().workspace.current?.path,mdViewer:gt,onNavigate:E=>{rt.getState().view==="worker"?rt.setState({selected_id:E}):Xt.gotoIssue(E)},onClose:()=>{let E=rt.getState();rt.setState({selected_id:null});try{Xt.gotoView(E.view==="worker"||E.view==="monitor"?E.view:"board")}catch{}},onOpenExecPresets:()=>{wt.open("execution")}}),yn=rt.getState().selected_id;yn&&(p.hidden=!1,Pt.load(yn),Xe(yn)),rt.subscribe(E=>{let d=E.selected_id;d?(p.hidden=!1,Pt.load(d),ee||Xe(d)):(Pt.clear(),p.hidden=!0,ge())});let xn=E=>{a.hidden=E.view!=="board",l.hidden=E.view!=="worker",u.hidden=E.view!=="monitor",o&&o.classList.toggle("is-quiet",E.view==="monitor"),yt(E.view==="board"),z(E.view==="worker"),ct(E.view==="monitor"),qe(E.view==="board"||E.view==="worker"||lt||!!E.selected_id),!E.selected_id&&E.view==="board"&&tn.load(),E.view==="worker"&&nn.load(),E.view==="monitor"?$n.load():$n.pause(),window.localStorage.setItem("beads-ui.view",E.view)};rt.subscribe(xn),xn(rt.getState()),L(),ze(),vt(),Zt().finally(()=>{dt=!0,et()}),window.addEventListener("keydown",E=>{let d=E.ctrlKey||E.metaKey,y=String(E.key||"").toLowerCase(),A=E.target,H=A&&A.tagName?String(A.tagName).toLowerCase():"",le=H==="input"||H==="textarea"||H==="select"||A&&typeof A.isContentEditable=="boolean"&&A.isContentEditable;d&&y==="n"&&(le||(E.preventDefault(),Oe.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&xv(t)});export{xv as bootstrap,wv as readBootstrapConfig,kv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
